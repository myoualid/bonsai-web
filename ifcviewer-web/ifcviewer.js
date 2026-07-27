// ifcviewer.js — a small JavaScript integration layer over the Emscripten
// module (IfcViewerWeb.js). Load this AFTER IfcViewerWeb.js, which defines the
// global `createIfcViewer` factory.
//
//   <script src="IfcViewerWeb.js"></script>
//   <script src="ifcviewer.js"></script>
//   <script>
//     const viewer = await IfcViewer.create({ canvas: myCanvas });
//     await viewer.ready;                       // GPU app is live
//     viewer.onSelect(({ objectId, guid }) => …);
//     await viewer.addFile(file, { replace: true });
//     viewer.addSidecarBytes(bytes, { replace: true });
//     await viewer.addUrl('/model.ifcview');    // appends (federation)
//     viewer.setGridVisible(false);
//     viewer.setOrientationGizmoCorner('bottom-left');
//     const gizmo = viewer.createOrientationGizmo({ parent: shell, corner: 'bottom-right' });
//     viewer.standardView('top');
//     viewer.toggleWorldAxes();
//     viewer.setBackgroundColor(0.93, 0.93, 0.93);  // sRGB #eeeeec
//   </script>
//
// The canvas element MUST have id="viewer-canvas" — the wasm side hard-codes
// that selector for its WebGPU surface and input handlers.
(function (global) {
  'use strict';

  // Resolve a remote sidecar's total size so the loader can bound its ranged
  // reads: HEAD Content-Length, falling back to a 0-0 Range's Content-Range.
  async function sizeUrl(url) {
    const head = await fetch(url, { method: 'HEAD' });
    const len = head.ok ? parseInt(head.headers.get('Content-Length') || '0', 10) : 0;
    if (len > 0) return len;
    const probe = await fetch(url, { headers: { Range: 'bytes=0-0' } });
    const cr = probe.headers.get('Content-Range'); // "bytes 0-0/12345"
    return cr ? parseInt(cr.split('/')[1] || '0', 10) : 0;
  }

  // Corner orientation widget placement: 0 top-left, 1 top-right, 2 bottom-left, 3 bottom-right.
  var ORIENTATION_GIZMO_CORNERS = {
    'top-left': 0,
    'top-right': 1,
    'bottom-left': 2,
    'bottom-right': 3,
  };
  var ORIENTATION_GIZMO_CORNER_NAMES = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  // id: 0 Front, 1 Back, 2 Left, 3 Right, 4 Top, 5 Bottom (matches standard_view_c).
  var STANDARD_VIEWS = {
    front: 0, back: 1, left: 2, right: 3, top: 4, bottom: 5,
  };

  var GRID_PLANE_IDS = { xy: 0, xz: 1, yz: 2 };
  var GRID_AXIS_COLORS = {
    x: [1.0, 0.2, 0.322],
    y: [0.545, 0.863, 0.0],
    z: [0.157, 0.565, 1.0],
  };
  var GRID_PLANE_AXIS_COLORS = {
    xy: { u: GRID_AXIS_COLORS.x, v: GRID_AXIS_COLORS.y },
    xz: { u: GRID_AXIS_COLORS.x, v: GRID_AXIS_COLORS.z },
    yz: { u: GRID_AXIS_COLORS.y, v: GRID_AXIS_COLORS.z },
  };
  var GRID_DEFAULT_COLOR = -1;
  var GRID_MINOR_OPACITY = 0.18;
  var GRID_MAJOR_OPACITY = 0.55;
  var gridRegistry = Object.create(null);

  function normalizeGridDefinition(definition) {
    var plane = definition.plane || 'xy';
    var defaults = GRID_PLANE_AXIS_COLORS[plane] || GRID_PLANE_AXIS_COLORS.xy;
    var origin = definition.origin || [0, 0, 0];
    return {
      id: definition.id,
      plane: plane,
      origin: [origin[0] || 0, origin[1] || 0, origin[2] || 0],
      spacing: Math.max(0.001, definition.spacing || 10),
      divisions: Math.max(1, definition.divisions | 0 || 10),
      colorU: definition.colorU || defaults.u,
      colorV: definition.colorV || defaults.v,
      opacity: definition.opacity != null ? definition.opacity : GRID_MAJOR_OPACITY,
      visible: definition.visible !== false,
    };
  }

  var GRID_UPSERT_ARG_TYPES = [
    'string', 'number', 'number', 'number', 'number', 'number', 'number',
    'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number',
  ];

  function upsertGridWasm(Module, grid) {
    if (!Module._grid_upsert_c) return;
    var u = grid.colorU || [GRID_DEFAULT_COLOR, GRID_DEFAULT_COLOR, GRID_DEFAULT_COLOR];
    var v = grid.colorV || [GRID_DEFAULT_COLOR, GRID_DEFAULT_COLOR, GRID_DEFAULT_COLOR];
    var args = [
      grid.id,
      grid.origin[0], grid.origin[1], grid.origin[2],
      GRID_PLANE_IDS[grid.plane] || 0,
      grid.spacing,
      grid.divisions,
      u[0], u[1], u[2],
      v[0], v[1], v[2],
      grid.opacity != null ? grid.opacity : GRID_MAJOR_OPACITY,
      grid.visible ? 1 : 0,
    ];
    // Direct wasm exports do not UTF-8 marshal JS strings — ccall is required for ids.
    if (typeof Module.ccall === 'function') {
      Module.ccall('grid_upsert_c', null, GRID_UPSERT_ARG_TYPES, args);
    } else {
      Module._grid_upsert_c.apply(Module, args);
    }
    if (Module._viewer_request_frame) Module._viewer_request_frame();
  }

  function removeGridWasm(Module, id) {
    if (!Module._grid_remove_c) return false;
    if (typeof Module.ccall === 'function') {
      return Module.ccall('grid_remove_c', 'number', ['string'], [id]) !== 0;
    }
    return Module._grid_remove_c(id) !== 0;
  }

  function parseStandardView(value) {
    if (typeof value === 'number') {
      if (value >= 0 && value <= 5) return value;
      throw new Error('standard view index must be 0–5');
    }
    var key = String(value).toLowerCase();
    if (Object.prototype.hasOwnProperty.call(STANDARD_VIEWS, key)) {
      return STANDARD_VIEWS[key];
    }
    throw new Error('standard view must be front, back, left, right, top, or bottom');
  }

  function parseOrientationGizmoCorner(value) {
    if (typeof value === 'number') {
      if (value >= 0 && value <= 3) return value;
      throw new Error('orientationGizmoCorner index must be 0–3');
    }
    var key = String(value).toLowerCase();
    if (Object.prototype.hasOwnProperty.call(ORIENTATION_GIZMO_CORNERS, key)) {
      return ORIENTATION_GIZMO_CORNERS[key];
    }
    throw new Error('orientationGizmoCorner must be top-left, top-right, bottom-left, or bottom-right');
  }

  function setOrientationGizmoCornerModule(Module, corner) {
    if (Module._set_orientation_gizmo_corner_c) {
      Module._set_orientation_gizmo_corner_c(parseOrientationGizmoCorner(corner));
    }
  }

  // Boot a viewer bound to `opts.canvas`. Resolves to the API object once the
  // wasm runtime is initialised; `api.ready` resolves once the GPU app is live.
  async function create(opts) {
    opts = opts || {};
    const factory = opts.moduleFactory || global.createIfcViewer;
    if (typeof factory !== 'function') {
      throw new Error('createIfcViewer not found — load IfcViewerWeb.js first');
    }

    const selectListeners = [];
    const domGizmos = [];
    let api = null;   // built below; the RAF loop only reads it after that
    let live = false;
    let resolveReady;
    const ready = new Promise(function (r) { resolveReady = r; });

    // The per-frame loop: poll for the app pointer (published once the GPU
    // device is ready), then drive the C tick. It is registered from
    // onRuntimeInitialized (a clean callback context) rather than after
    // `await factory(...)` — that Promise.then continuation is exactly the
    // nesting that stalls Dawn-web's device callback and leaves the GPU device
    // half-initialised (every buffer then reports "invalid"). Learned during
    // the original web bring-up; kept here deliberately.
    function startLoop(Module) {
      function tick() {
        if (Module._app_ptr && Module._raf_tick_c) {
          if (!live) {
            live = true;
            resolveReady(api);
            if (opts.onReady) opts.onReady(api);
          }
          Module._raf_tick_c(Module._app_ptr);
          if (live) {
            for (var gi = 0; gi < domGizmos.length; gi++) {
              if (domGizmos[gi].autoSync) domGizmos[gi].sync();
            }
          }
          if (opts.onFrame) opts.onFrame(api);
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const Module = await factory({
      canvas: opts.canvas,
      // Keep the runtime alive after main() returns so Dawn-web's async
      // adapter/device callbacks land (they set Module._app_ptr).
      noExitRuntime: true,
      print:    opts.print    || function (t) { console.log(t); },
      printErr: opts.printErr || function (t) { console.warn(t); },
      onRuntimeInitialized: function () { startLoop(this); },
    });

    if (opts.orientationGizmoCorner != null) {
      setOrientationGizmoCornerModule(Module, opts.orientationGizmoCorner);
    }
    if (opts.orientationGizmo === 'none') {
      if (Module._set_orientation_gizmo_visible_c) Module._set_orientation_gizmo_visible_c(0);
    }

    // Byte-source registry the wasm reads lazily: a picked File (Blob.slice) or
    // a remote URL (HTTP Range). load_sidecar_from_source_c(sid) streams one.
    Module.__ifcvSources = Module.__ifcvSources || [];

    // The wasm calls this on every pick; (0, '', -1) means the selection was
    // cleared. modelIndex is the picked object's model in load order (matches
    // the modelProgress index), or -1.
    Module.__ifcvOnSelect = function (objectId, guid, modelIndex) {
      const detail = {
        objectId: objectId >>> 0,
        guid: guid || null,
        modelIndex: (typeof modelIndex === 'number' && modelIndex >= 0) ? modelIndex : null,
      };
      selectListeners.forEach(function (cb) {
        try { cb(detail); } catch (e) { console.error(e); }
      });
      try {
        document.dispatchEvent(new CustomEvent('ifcviewer:select', { detail: detail }));
      } catch (_) { /* older browsers */ }
    };

    // Some test harnesses / the fullscreen page want the raw module on window.
    if (opts.exposeAsModuleGlobal) global.Module = Module;

    function registerFile(file) {
      const sid = Module.__ifcvSources.length;
      Module.__ifcvSources.push({ file: file, url: null, size: file.size });
      return sid;
    }
    async function registerUrl(url) {
      const size = await sizeUrl(url);
      if (!size) throw new Error('could not size ' + url + ' (need HEAD or Range support)');
      const sid = Module.__ifcvSources.length;
      Module.__ifcvSources.push({ file: null, url: url, size: size });
      return sid;
    }

    api = {
      module: Module,
      ready: ready,
      isLive: function () { return live; },

      // Register a selection listener; returns an unsubscribe function.
      onSelect: function (cb) {
        selectListeners.push(cb);
        return function () {
          const i = selectListeners.indexOf(cb);
          if (i >= 0) selectListeners.splice(i, 1);
        };
      },

      // Scene / camera passthroughs.
      clearScene:     function () { if (Module._clear_scene_c)      Module._clear_scene_c(); },
      viewAll:        function () { if (Module._view_all_c)         Module._view_all_c(); },
      frameSelection: function () { if (Module._frame_selection_c)  Module._frame_selection_c(); },

      // Model bookkeeping (ordered by load). Progress is per-model chunk counts.
      modelCount: function () { return Module._ifcv_model_count_c ? Module._ifcv_model_count_c() : 0; },
      modelProgress: function (i) {
        return {
          resident: Module._ifcv_model_resident_c ? Module._ifcv_model_resident_c(i) : 0,
          total:    Module._ifcv_model_total_c    ? Module._ifcv_model_total_c(i)    : 0,
        };
      },
      bytes: function () {
        return {
          total:  Module._ifcv_bytes_total_c  ? Module._ifcv_bytes_total_c()  : 0,
          needed: Module._ifcv_bytes_needed_c ? Module._ifcv_bytes_needed_c() : 0,
          loaded: Module._ifcv_bytes_loaded_c ? Module._ifcv_bytes_loaded_c() : 0,
        };
      },

      // Ground grid + world-origin RGB axes.
      setGridVisible: function (visible) {
        if (Module._set_grid_visible_c) Module._set_grid_visible_c(visible ? 1 : 0);
      },
      gridVisible: function () {
        return Module._grid_is_visible_c ? Module._grid_is_visible_c() !== 0 : true;
      },
      toggleGrid: function () {
        if (Module._toggle_grid_c) Module._toggle_grid_c();
      },
      upsertGrid: function (definition) {
        var grid = normalizeGridDefinition(definition || {});
        if (!grid.id) throw new Error('Grid definition requires an id.');
        gridRegistry[grid.id] = grid;
        upsertGridWasm(Module, grid);
        return Object.assign({}, grid);
      },
      removeGrid: function (id) {
        if (!id || !gridRegistry[id]) return false;
        delete gridRegistry[id];
        removeGridWasm(Module, id);
        if (Module._viewer_request_frame) Module._viewer_request_frame();
        return true;
      },
      clearGrids: function () {
        gridRegistry = Object.create(null);
        if (Module._grid_clear_c) Module._grid_clear_c();
        if (Module._viewer_request_frame) Module._viewer_request_frame();
      },
      listGrids: function () {
        return Object.keys(gridRegistry).map(function (id) {
          return Object.assign({}, gridRegistry[id]);
        });
      },
      applyGrids: function (definitions) {
        gridRegistry = Object.create(null);
        if (Module._grid_clear_c) Module._grid_clear_c();
        var applied = [];
        for (var i = 0; i < (definitions || []).length; i++) {
          var grid = normalizeGridDefinition(definitions[i] || {});
          if (!grid.id) continue;
          gridRegistry[grid.id] = grid;
          upsertGridWasm(Module, grid);
          applied.push(Object.assign({}, grid));
        }
        if (Module._viewer_request_frame) Module._viewer_request_frame();
        return applied;
      },
      setWorldAxesVisible: function (visible) {
        if (Module._set_world_axes_visible_c) Module._set_world_axes_visible_c(visible ? 1 : 0);
      },
      worldAxesVisible: function () {
        return Module._world_axes_is_visible_c ? Module._world_axes_is_visible_c() !== 0 : true;
      },
      toggleWorldAxes: function () {
        if (Module._toggle_world_axes_c) Module._toggle_world_axes_c();
      },
      // sRGB components in [0..1] (matches ViewportCore::setBackgroundColor).
      setBackgroundColor: function (r, g, b, a) {
        if (Module._set_background_color_c) {
          Module._set_background_color_c(r, g, b, a == null ? 1 : a);
        }
      },
      // Three.js-style scene fog. mode: 'off' | 'on' | 'linear' | 'exp2'.
      setFog: function (options) {
        var opts = options || {};
        var modeName = (opts.mode == null ? 'off' : String(opts.mode)).toLowerCase();
        var mode = modeName === 'linear' || modeName === 'on' ? 1
          : modeName === 'exp2' ? 2
          : 0;
        var color = opts.color;
        var r = 0.125, g = 0.137, b = 0.161;
        if (typeof color === 'string' && color.charAt(0) === '#') {
          var hex = color.slice(1);
          if (hex.length === 6 || hex.length === 8) {
            r = parseInt(hex.slice(0, 2), 16) / 255;
            g = parseInt(hex.slice(2, 4), 16) / 255;
            b = parseInt(hex.slice(4, 6), 16) / 255;
          }
        } else if (Array.isArray(color) && color.length >= 3) {
          r = color[0]; g = color[1]; b = color[2];
        } else if (color && typeof color === 'object') {
          r = color.r; g = color.g; b = color.b;
        }
        if (Module._set_fog_c) {
          Module._set_fog_c(
            mode,
            opts.near == null ? 1 : opts.near,
            opts.far == null ? 1000 : opts.far,
            opts.density == null ? 0.002 : opts.density,
            r, g, b
          );
        }
      },
      fog: function () {
        var mode = Module._fog_mode_c ? Module._fog_mode_c() : 0;
        return {
          mode: mode === 1 ? 'linear' : mode === 2 ? 'exp2' : 'off',
          near: Module._fog_near_c ? Module._fog_near_c() : 1,
          far: Module._fog_far_c ? Module._fog_far_c() : 1000,
          density: Module._fog_density_c ? Module._fog_density_c() : 0.002,
        };
      },
      setOrientationGizmoCorner: function (corner) {
        setOrientationGizmoCornerModule(Module, corner);
      },
      orientationGizmoCorner: function () {
        var id = Module._orientation_gizmo_corner_c ? Module._orientation_gizmo_corner_c() : 1;
        return ORIENTATION_GIZMO_CORNER_NAMES[id] || 'top-right';
      },
      setNativeOrientationGizmoVisible: function (visible) {
        if (Module._set_orientation_gizmo_visible_c) {
          Module._set_orientation_gizmo_visible_c(visible ? 1 : 0);
        }
      },
      nativeOrientationGizmoVisible: function () {
        return Module._orientation_gizmo_visible_c ? Module._orientation_gizmo_visible_c() !== 0 : true;
      },
      domOrientationGizmoVisible: function () {
        for (var gi = 0; gi < domGizmos.length; gi++) {
          if (domGizmos[gi].element.style.display !== 'none') return true;
        }
        return false;
      },
      setOrientationGizmosVisible: function (visible) {
        api.setNativeOrientationGizmoVisible(visible);
        for (var gi = 0; gi < domGizmos.length; gi++) {
          domGizmos[gi].setVisible(visible);
        }
      },
      orientationGizmosVisible: function () {
        return api.nativeOrientationGizmoVisible() || api.domOrientationGizmoVisible();
      },
      toggleOrientationGizmos: function () {
        var next = !api.orientationGizmosVisible();
        api.setOrientationGizmosVisible(next);
        return next;
      },
      cameraOrientation: function () {
        return {
          yaw: Module._camera_yaw_c ? Module._camera_yaw_c() : 45,
          pitch: Module._camera_pitch_c ? Module._camera_pitch_c() : 30,
        };
      },
      orbitBy: function (dx, dy) {
        if (Module._orbit_c) Module._orbit_c(dx, dy);
      },
      standardView: function (view) {
        if (Module._standard_view_c) Module._standard_view_c(parseStandardView(view));
      },
      setNavPreset: function (name) {
        if (typeof Module.ccall === 'function') {
          Module.ccall('set_nav_preset_c', null, ['string'], [String(name || 'bonsai')]);
        }
      },
      createOrientationGizmo: function (options) {
        var factory = opts.orientationGizmoFactory
          || (global.IfcViewer && global.IfcViewer.OrientationGizmo
            ? global.IfcViewer.OrientationGizmo.create
            : null);
        if (!factory) {
          throw new Error('Pass orientationGizmoFactory or load orientation-gizmo.js before createOrientationGizmo()');
        }
        var gizmo = factory(api, options || {});
        domGizmos.push(gizmo);
        var priorDestroy = gizmo.destroy;
        gizmo.destroy = function () {
          priorDestroy();
          var idx = domGizmos.indexOf(gizmo);
          if (idx >= 0) domGizmos.splice(idx, 1);
        };
        return gizmo;
      },

      registerFileSource: registerFile,
      registerUrlSource: registerUrl,

      // Add a model to the scene. `replace: true` drops the current scene first;
      // otherwise it appends (a lightweight federation of streamed models).
      addFile: async function (file, o) {
        if (o && o.replace) this.clearScene();
        Module._load_sidecar_from_source_c(registerFile(file));
      },
      addUrl: async function (url, o) {
        if (o && o.replace) this.clearScene();
        Module._load_sidecar_from_source_c(await registerUrl(url));
      },
      // In-memory sidecar bytes (e.g. pipeline output) without a File handle.
      addSidecarBytes: function (bytes, o) {
        if (o && o.replace) this.clearScene();
        var u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        Module._load_sidecar_from_source_c(registerFile(new Blob([u8])));
      },
    };

    var gizmoOpt = opts.orientationGizmo;
    if (gizmoOpt === 'dom' || gizmoOpt === true) {
      api.createOrientationGizmo(typeof gizmoOpt === 'object' ? gizmoOpt : {});
    } else if (gizmoOpt && typeof gizmoOpt === 'object' && gizmoOpt.mode === 'dom') {
      api.createOrientationGizmo(gizmoOpt);
    }

    return api;
  }

  global.IfcViewer = global.IfcViewer || {};
  global.IfcViewer.create = create;
  global.IfcViewer.sizeUrl = sizeUrl;
  global.IfcViewer.STANDARD_VIEWS = STANDARD_VIEWS;
})(window);
