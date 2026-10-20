var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/signals/dist/signals.js
var require_signals = __commonJS({
  "node_modules/signals/dist/signals.js"(exports, module) {
    (function(global) {
      function SignalBinding(signal, listener, isOnce, listenerContext, priority) {
        this._listener = listener;
        this._isOnce = isOnce;
        this.context = listenerContext;
        this._signal = signal;
        this._priority = priority || 0;
      }
      SignalBinding.prototype = {
        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active: true,
        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params: null,
        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute: function(paramsArr) {
          var handlerReturn, params;
          if (this.active && !!this._listener) {
            params = this.params ? this.params.concat(paramsArr) : paramsArr;
            handlerReturn = this._listener.apply(this.context, params);
            if (this._isOnce) {
              this.detach();
            }
          }
          return handlerReturn;
        },
        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach: function() {
          return this.isBound() ? this._signal.remove(this._listener, this.context) : null;
        },
        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound: function() {
          return !!this._signal && !!this._listener;
        },
        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce: function() {
          return this._isOnce;
        },
        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener: function() {
          return this._listener;
        },
        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal: function() {
          return this._signal;
        },
        /**
         * Delete instance properties
         * @private
         */
        _destroy: function() {
          delete this._signal;
          delete this._listener;
          delete this.context;
        },
        /**
         * @return {string} String representation of the object.
         */
        toString: function() {
          return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]";
        }
      };
      function validateListener(listener, fnName) {
        if (typeof listener !== "function") {
          throw new Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", fnName));
        }
      }
      function Signal2() {
        this._bindings = [];
        this._prevParams = null;
        var self = this;
        this.dispatch = function() {
          Signal2.prototype.dispatch.apply(self, arguments);
        };
      }
      Signal2.prototype = {
        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION: "1.0.0",
        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize: false,
        /**
         * @type boolean
         * @private
         */
        _shouldPropagate: true,
        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active: true,
        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener: function(listener, isOnce, listenerContext, priority) {
          var prevIndex = this._indexOfListener(listener, listenerContext), binding;
          if (prevIndex !== -1) {
            binding = this._bindings[prevIndex];
            if (binding.isOnce() !== isOnce) {
              throw new Error("You cannot add" + (isOnce ? "" : "Once") + "() then add" + (!isOnce ? "" : "Once") + "() the same listener without removing the relationship first.");
            }
          } else {
            binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
            this._addBinding(binding);
          }
          if (this.memorize && this._prevParams) {
            binding.execute(this._prevParams);
          }
          return binding;
        },
        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding: function(binding) {
          var n = this._bindings.length;
          do {
            --n;
          } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
          this._bindings.splice(n + 1, 0, binding);
        },
        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener: function(listener, context) {
          var n = this._bindings.length, cur;
          while (n--) {
            cur = this._bindings[n];
            if (cur._listener === listener && cur.context === context) {
              return n;
            }
          }
          return -1;
        },
        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has: function(listener, context) {
          return this._indexOfListener(listener, context) !== -1;
        },
        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add: function(listener, listenerContext, priority) {
          validateListener(listener, "add");
          return this._registerListener(listener, false, listenerContext, priority);
        },
        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce: function(listener, listenerContext, priority) {
          validateListener(listener, "addOnce");
          return this._registerListener(listener, true, listenerContext, priority);
        },
        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove: function(listener, context) {
          validateListener(listener, "remove");
          var i = this._indexOfListener(listener, context);
          if (i !== -1) {
            this._bindings[i]._destroy();
            this._bindings.splice(i, 1);
          }
          return listener;
        },
        /**
         * Remove all listeners from the Signal.
         */
        removeAll: function() {
          var n = this._bindings.length;
          while (n--) {
            this._bindings[n]._destroy();
          }
          this._bindings.length = 0;
        },
        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners: function() {
          return this._bindings.length;
        },
        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt: function() {
          this._shouldPropagate = false;
        },
        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch: function(params) {
          if (!this.active) {
            return;
          }
          var paramsArr = Array.prototype.slice.call(arguments), n = this._bindings.length, bindings;
          if (this.memorize) {
            this._prevParams = paramsArr;
          }
          if (!n) {
            return;
          }
          bindings = this._bindings.slice();
          this._shouldPropagate = true;
          do {
            n--;
          } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },
        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget: function() {
          this._prevParams = null;
        },
        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose: function() {
          this.removeAll();
          delete this._bindings;
          delete this._prevParams;
        },
        /**
         * @return {string} String representation of the object.
         */
        toString: function() {
          return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]";
        }
      };
      var signals2 = Signal2;
      signals2.Signal = Signal2;
      if (typeof define === "function" && define.amd) {
        define(function() {
          return signals2;
        });
      } else if (typeof module !== "undefined" && module.exports) {
        module.exports = signals2;
      } else {
        global["signals"] = signals2;
      }
    })(exports);
  }
});

// src/context/signals.js
var import_signals = __toESM(require_signals(), 1);

// src/util/log.js
var t0 = typeof performance !== "undefined" ? performance.now() : Date.now();
function stamp() {
  const d = /* @__PURE__ */ new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms2 = String(d.getMilliseconds()).padStart(3, "0");
  const dt = (((typeof performance !== "undefined" ? performance.now() : Date.now()) - t0) / 1e3).toFixed(3);
  return `[${hh}:${mm}:${ss}.${ms2} +${dt}s]`;
}
function createLogger(tag) {
  const prefix = `[${tag}]`;
  return {
    log: (...a) => console.log(stamp(), prefix, ...a),
    warn: (...a) => console.warn(stamp(), prefix, ...a),
    error: (...a) => console.error(stamp(), prefix, ...a)
  };
}

// src/context/signals.js
var { Signal } = import_signals.default;
var log = createLogger("bonsai");
var Signals = {
  // SESSION LIFECYCLE
  // The session exists before both. appReady: ifcopenshell is up too.
  appReady: new Signal(),
  viewerReady: new Signal(),
  // MODEL LIFECYCLE
  modelLoadStarted: new Signal(),
  // { source: 'file'|'url', name? }
  modelLoaded: new Signal(),
  // { sourceId }
  modelCleared: new Signal(),
  // ()
  modelLoadedToGPU: new Signal(),
  // { sourceId, ok }
  modelUnloaded: new Signal(),
  // { sourceId }
  modelNameChanged: new Signal(),
  // { sourceId, name }
  // Fires once the main-thread ifcopenshell has finished opening the
  // live IFC that pairs with a loaded sidecar — the data-side analogue
  // of modelLoaded. tool.Ifc promotes that source from view to edit,
  // so attribute / pset / qto lookups return something richer than the
  // sidecar's four basic fields. { sourceId, name, file }.
  liveIfcReady: new Signal(),
  // SCENE: SELECTION
  objectPicked: new Signal(),
  // ({objectId, guid, modelIndex, sourceId}) — name/type via getSelectedObjects
  selectionChanged: new Signal(),
  // ({ ids: number[] })
  selectionCleared: new Signal(),
  // ()
  // SCENE: VISIBILITY & DISPLAY
  visibilityChanged: new Signal(),
  // ({ action, target? })
  xrayToggled: new Signal(),
  // ({ active })
  viewerToolsChanged: new Signal(),
  // ({ section, fly, ortho, grid, axes, fog, xray, outline })
  measureChanged: new Signal(),
  // ({ mode, points, lines, segments, placement })
  colorsChanged: new Signal(),
  // ({ action, target?, color? })
  backgroundChanged: new Signal(),
  // ({ color })
  fogChanged: new Signal(),
  // ({ enabled, mode, near, far, density })
  geometryChanged: new Signal(),
  // ({ kernel, thread, delivery })
  // CAMERA
  cameraChanged: new Signal(),
  // (cameraState)
  standardViewSet: new Signal(),
  // ({ id })
  // CONTROLS
  navPresetChanged: new Signal(),
  // ({ preset })
  // HISTORY
  historyChanged: new Signal()
  // (cmd | undefined)
};
function addSignal(signal) {
  if (!Signals[signal]) {
    Signals[signal] = new Signal();
  }
  return Signals[signal];
}
function removeSignal(signal) {
  delete Signals[signal];
}
function logSignals(signals2) {
  const timing = /* @__PURE__ */ new Map();
  const slot = (key) => {
    if (!timing.has(key)) timing.set(key, {});
    return timing.get(key);
  };
  let currentKey = null;
  for (const [name, signal] of Object.entries(signals2)) {
    if (typeof signal?.add !== "function") continue;
    signal.add((...args) => {
      const p = args[0];
      if (name === "modelLoadStarted" && p?.phase !== void 0) {
        const pct = Math.round((p.ratio ?? 0) * 100);
        log.log(`convert ${pct}% \u2014 ${p.phase}: ${p.message ?? ""}`);
        const s = slot(currentKey ?? "model");
        if (p.phase === "parsing" && s.convertStart === void 0) s.convertStart = performance.now();
        if (p.phase === "complete") s.convertEnd = performance.now();
        return;
      }
      if (name === "modelLoadStarted") {
        const key = p?.name ?? p?.url ?? "model";
        currentKey = key;
        const s = slot(key);
        if (p?.source === "autoload") s.fetchStart = performance.now();
        if (p?.source === "file") s.streamStart = performance.now();
      }
      if (name === "modelLoaded") {
        const key = currentKey ?? "model";
        const s = slot(key) ?? {};
        const parts = [];
        if (s.fetchStart !== void 0 && s.convertStart !== void 0) {
          parts.push(`fetch=${(s.convertStart - s.fetchStart).toFixed(0)}ms`);
        }
        if (s.convertStart !== void 0 && s.convertEnd !== void 0) {
          parts.push(`convert=${(s.convertEnd - s.convertStart).toFixed(0)}ms`);
        }
        if (s.streamStart !== void 0) {
          parts.push(`stream+firstRender=${(performance.now() - s.streamStart).toFixed(0)}ms`);
        }
        const base = s.fetchStart ?? s.streamStart;
        if (base !== void 0) parts.push(`total=${(performance.now() - base).toFixed(0)}ms`);
        log.log(`modelLoaded ${key} (${parts.join(" ") || "?"})`, p);
        return;
      }
      log.log(`${name}`, ...args);
    });
  }
  globalThis.addEventListener?.("unhandledrejection", (e) => {
    log.error("unhandled rejection:", e.reason);
  });
}

// src/context/store.js
var Store = {
  models: [],
  selection: null
};
function getStore() {
  return Store;
}
function listenStore(signals2) {
  signals2.objectPicked.add((pick) => {
    if (!pick?.objectId && !pick?.guid) {
      Store.selection = null;
      return;
    }
    Store.selection = pick;
  });
  signals2.modelCleared.add(() => {
    Store.selection = null;
  });
}

// src/ops.js
var CANCELLED = Object.freeze({ status: "CANCELLED" });
var Operator = class {
  static operatorName = "";
  static operatorLabel = "";
  static undoable = false;
  constructor(context) {
    this.context = context;
  }
  poll() {
    return true;
  }
  execute() {
  }
  undo() {
  }
};
var Ops = class {
  constructor({ limit = 50 } = {}) {
    this.limit = limit;
    this.registry = /* @__PURE__ */ new Map();
    this.undos = [];
    this.redos = [];
  }
  register(OperatorClass) {
    this.registry.set(OperatorClass.operatorName, OperatorClass);
    return this;
  }
  // An async execute is recorded when it starts, so undo order follows call order.
  execute(name, context, ...args) {
    const OperatorClass = this.registry.get(name);
    if (!OperatorClass) throw new Error(`ops: unknown operator "${name}"`);
    const op = new OperatorClass(context, ...args);
    if (!op.poll()) return CANCELLED;
    const result = op.execute();
    if (op.constructor.undoable && result?.status !== "CANCELLED") {
      this.undos.push(op);
      if (this.undos.length > this.limit) this.undos.shift();
      this.redos.length = 0;
      this._changed(op);
    }
    return result;
  }
  undo() {
    const op = this.undos.at(-1);
    if (!op) return;
    op.undo();
    this.redos.push(this.undos.pop());
    this._changed(op);
    return op;
  }
  redo() {
    const op = this.redos.at(-1);
    if (!op) return;
    op.execute();
    this.undos.push(this.redos.pop());
    this._changed(op);
    return op;
  }
  clear() {
    this.undos.length = 0;
    this.redos.length = 0;
    this._changed();
  }
  _changed(op) {
    Signals.historyChanged.dispatch(op);
  }
};
var ops = new Ops();
function bindKeyboard() {
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || document.activeElement?.isContentEditable) return;
    if (e.ctrlKey && !e.shiftKey && e.key === "z") {
      e.preventDefault();
      ops.undo();
    } else if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      ops.redo();
    }
  });
}
var ops_default = ops;

// src/tool/Ifc.js
var ifcopenshellMod = null;
async function ifcopenshellApi() {
  ifcopenshellMod ??= await import("ifcopenshell");
  return ifcopenshellMod;
}
var STD64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var IFC64 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$";
function newGlobalId() {
  const hex = `0000${crypto.randomUUID().replace(/-/g, "")}`;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  const std = btoa(String.fromCharCode(...bytes)).slice(2);
  let out = "";
  for (const ch of std) {
    const index = STD64.indexOf(ch);
    out += index >= 0 ? IFC64[index] : ch;
  }
  return out;
}
function named(file, ifcClass, name) {
  return file.create(ifcClass, {
    GlobalId: newGlobalId(),
    Name: name
  });
}
async function ensureSchema(schema) {
  const ifcopenshell = await ifcopenshellApi();
  const runtime = await ifcopenshell.init();
  const id = schema.toLowerCase();
  if (!runtime.loadedPlugins().includes(`schema:${id}`)) {
    await runtime.loadPlugin("schema", id);
  }
}
function dispose(file) {
  try {
    file?.dispose?.();
  } catch {
  }
}
function findModel(sourceId, name) {
  if (sourceId != null) {
    const bySource = getStore().models.find((entry) => entry.sourceId === sourceId);
    if (bySource) return bySource;
  }
  if (!name) return void 0;
  return getStore().models.find(
    (entry) => (entry.sourceId == null || entry.sourceId === sourceId) && (entry.name === name || entry.viewName === name)
  );
}
var Ifc = class _Ifc {
  static EDIT = "edit";
  static VIEW = "view";
  // The model record. With no key, the selected element's model, or the
  // most recently opened model when nothing is selected. A key may be a
  // filename (.ifc or .ifcview), a sourceId, or a viewer pick.
  // `bonsai.tool.Ifc.get()` with nothing loaded is null.
  static get(key) {
    if (key === void 0) {
      if (getStore().selection) {
        const selected = _Ifc.get(getStore().selection);
        if (selected) return selected;
      }
      return getStore().models.at(-1) ?? null;
    }
    if (key === null) return null;
    if (typeof key === "object") {
      if (key.sourceId == null) return null;
      return getStore().models.find((entry) => entry.sourceId === key.sourceId) ?? null;
    }
    return getStore().models.find(
      (entry) => entry.sourceId === key || entry.name === key || entry.viewName === key
    ) ?? null;
  }
  // The live ifcopenshell file. Null in view mode and when nothing matches.
  static file(key) {
    const model = _Ifc.get(key);
    if (model?.mode !== _Ifc.EDIT) return null;
    return model.file ?? null;
  }
  // Geometry-only model (.ifcview, no live file). Re-opening the same
  // source refreshes that entry. The same source already in edit mode
  // keeps its file. A new source with the same view name is a separate
  // model — it must not steal the row that is already paired with a
  // live IFC in the scene.
  static setView(sourceId, viewName) {
    const existing = findModel(sourceId, viewName);
    if (existing) {
      const sameSource = existing.sourceId === sourceId;
      existing.sourceId = sourceId;
      existing.viewName = viewName;
      if (sameSource && existing.mode === _Ifc.EDIT) return existing;
      if (existing.file) dispose(existing.file);
      existing.name = viewName;
      existing.mode = _Ifc.VIEW;
      existing.file = null;
      return existing;
    }
    const entry = {
      sourceId,
      name: viewName,
      viewName,
      mode: _Ifc.VIEW,
      file: null
    };
    getStore().models.push(entry);
    return entry;
  }
  // Live .ifc opened beside the .ifcview. Promotes a view entry for the
  // same source. Re-opening replaces the previous file and disposes it.
  static setEdit(sourceId, file, name) {
    const existing = findModel(sourceId, name);
    if (existing) {
      if (existing.file && existing.file !== file) dispose(existing.file);
      existing.sourceId = sourceId;
      existing.name = name;
      existing.mode = _Ifc.EDIT;
      existing.file = file;
      return existing;
    }
    const entry = {
      sourceId,
      name,
      viewName: null,
      mode: _Ifc.EDIT,
      file
    };
    getStore().models.push(entry);
    return entry;
  }
  static clear() {
    for (const entry of getStore().models) dispose(entry.file);
    getStore().models.length = 0;
    getStore().selection = null;
  }
  // GlobalId of the selected element. Pass a pick to read that one
  // instead of the current selection. Works in edit and in view: the
  // viewer pick's guid is the IFC GlobalId either way.
  static globalId(pick) {
    const target = pick === void 0 ? getStore().selection : pick;
    if (!target || typeof target !== "object") return null;
    return target.guid || null;
  }
  // Blank IFC4 file: project → site → building → storey, with metric
  // units and a model context so later geometry has somewhere to live.
  // The caller keeps the file and registers it with setEdit.
  static async createBlank(name = "Project") {
    const ifcopenshell = await ifcopenshellApi();
    await ensureSchema("IFC4");
    const file = new ifcopenshell.File("IFC4");
    const origin = file.create("IfcCartesianPoint", { Coordinates: [0, 0, 0] });
    const placement = file.create("IfcAxis2Placement3D", { Location: origin });
    const context = file.create("IfcGeometricRepresentationContext", {
      ContextType: "Model",
      CoordinateSpaceDimension: 3,
      Precision: 1e-5,
      WorldCoordinateSystem: placement
    });
    const units = file.create("IfcUnitAssignment", {
      Units: [
        file.create("IfcSIUnit", { UnitType: "LENGTHUNIT", Prefix: "MILLI", Name: "METRE" }),
        file.create("IfcSIUnit", { UnitType: "AREAUNIT", Name: "SQUARE_METRE" }),
        file.create("IfcSIUnit", { UnitType: "VOLUMEUNIT", Name: "CUBIC_METRE" })
      ]
    });
    const project = named(file, "IfcProject", name);
    project.set("RepresentationContexts", [context]);
    project.set("UnitsInContext", units);
    const site = named(file, "IfcSite", "Site");
    const building = named(file, "IfcBuilding", "Building");
    const storey = named(file, "IfcBuildingStorey", "Ground Floor");
    const aggregate = (parent, child) => file.create("IfcRelAggregates", {
      GlobalId: newGlobalId(),
      RelatingObject: parent,
      RelatedObjects: [child]
    });
    aggregate(project, site);
    aggregate(site, building);
    aggregate(building, storey);
    return file;
  }
  // Live entity for a pick, or for the current selection when called
  // with no argument. View mode has no entity and returns null.
  static entity(pick) {
    const target = pick === void 0 ? getStore().selection : pick;
    if (!target?.guid) return null;
    const file = _Ifc.file(target);
    if (!file) return null;
    try {
      return file.byGuid(target.guid);
    } catch {
      return null;
    }
  }
};

// src/tool/federation.js
var SCHEMA = "ifcfed/1";
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var doc = blank();
var modelBySource = /* @__PURE__ */ new Map();
var opening = false;
var homePending = 0;
function blank() {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  return {
    schema: SCHEMA,
    name: "project",
    created: now,
    modified: now,
    unit: { name: "METRE", prefix: "" },
    origin: { xyz: [0, 0, 0], rzDeg: 0 },
    groups: [],
    models: [],
    homeView: null,
    manifest: null
  };
}
function vec3(value) {
  if (!Array.isArray(value) || value.length !== 3) return [0, 0, 0];
  return value.map((n) => Number(n) || 0);
}
function sameVec(a, b) {
  return a.length === b.length && a.every((n, i) => n === b[i]);
}
function defaultTransform() {
  return {
    aFrame: "ModelGlobal",
    a: [0, 0, 0],
    b: [0, 0, 0],
    rxyzDeg: [0, 0, 0],
    pivot: [0, 0, 0]
  };
}
function isDefaultTransform(xf) {
  if (!xf) return true;
  const d = defaultTransform();
  return xf.aFrame === d.aFrame && sameVec(xf.a, d.a) && sameVec(xf.b, d.b) && sameVec(xf.rxyzDeg, d.rxyzDeg) && sameVec(xf.pivot, d.pivot);
}
function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function normalizeRelativePath(path) {
  if (typeof path !== "string") return "";
  let name = path.replace(/\\/g, "/").replace(/^\.\//, "");
  while (name.startsWith("/")) name = name.slice(1);
  if (!name || name.endsWith("/")) return "";
  if (name.split("/").some((part) => part === "..")) return "";
  return name;
}
function basename(path) {
  const name = normalizeRelativePath(path);
  const cut = name.lastIndexOf("/");
  return cut === -1 ? name : name.slice(cut + 1);
}
function sidecarPath(path) {
  const name = normalizeRelativePath(path);
  if (!/\.ifc$/i.test(name)) return "";
  return name.replace(/\.ifc$/i, ".ifcview");
}
function ifcPathFor(path) {
  const name = normalizeRelativePath(path);
  if (/\.ifcview$/i.test(name)) return name.replace(/\.ifcview$/i, ".ifc");
  return name;
}
var STEP_MAGIC = "ISO-10303-21";
function isStepBytes(bytes) {
  if (!bytes || bytes.byteLength < STEP_MAGIC.length) return false;
  let head = "";
  for (let i = 0; i < STEP_MAGIC.length; i++) head += String.fromCharCode(bytes[i]);
  return head === STEP_MAGIC;
}
function stripSharedRoot(paths2) {
  const files = paths2.filter((name) => name && !name.endsWith("/"));
  if (!files.length || files.some((name) => !name.includes("/"))) {
    return { root: "", paths: paths2 };
  }
  const root = files[0].split("/")[0];
  if (!root || files.some((name) => !name.startsWith(`${root}/`))) {
    return { root: "", paths: paths2 };
  }
  return {
    root,
    paths: paths2.map((name) => name.startsWith(`${root}/`) ? name.slice(root.length + 1) : name)
  };
}
function isProjectPath(path) {
  const name = String(path).toLowerCase();
  return name.endsWith(".ifcfed") && !name.endsWith(".ifcfed.manifest");
}
function ignoredZipPath(path) {
  const name = String(path).replace(/\\/g, "/");
  return name.includes("__MACOSX/") || name.endsWith(".DS_Store");
}
function lookupFile(files, path) {
  const name = normalizeRelativePath(path);
  if (!name) return null;
  if (files.has(name)) return { path: name, bytes: files.get(name) };
  const lower = name.toLowerCase();
  for (const [key, bytes] of files) {
    if (key.toLowerCase() === lower) return { path: key, bytes };
  }
  return null;
}
function readGroups(value, warnings, label) {
  if (!Array.isArray(value)) return [];
  const groups = [];
  for (let i = 0; i < value.length; i++) {
    const entry = value[i];
    if (!entry || typeof entry !== "object") {
      warnings.push(`${label}[${i}] is not an object; skipping.`);
      continue;
    }
    const group = {
      id: typeof entry.id === "string" && entry.id ? entry.id : newId(),
      displayName: typeof entry.display_name === "string" ? entry.display_name : "",
      visible: entry.visible !== false,
      children: readGroups(entry.groups, warnings, `${label}[${i}].groups`)
    };
    groups.push(group);
  }
  return groups;
}
function indexGroups(groups, into = /* @__PURE__ */ new Map()) {
  for (const group of groups) {
    into.set(group.id, group);
    indexGroups(group.children, into);
  }
  return into;
}
function readTransform(value) {
  if (!value || typeof value !== "object") return null;
  return {
    aFrame: value.a_frame === "ModelLocal" ? "ModelLocal" : "ModelGlobal",
    a: vec3(value.a),
    b: vec3(value.b),
    rxyzDeg: vec3(value.rxyz_deg),
    pivot: vec3(value.pivot)
  };
}
function parseIfcfed(text) {
  const warnings = [];
  let root;
  try {
    root = JSON.parse(text);
  } catch (err) {
    throw new Error(`Parse error in .ifcfed: ${err.message}`, { cause: err });
  }
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    throw new Error("Parse error in .ifcfed: root is not an object");
  }
  if (root.schema !== SCHEMA) {
    warnings.push(`Unknown schema '${root.schema ?? ""}' (expected '${SCHEMA}'); attempting to load anyway.`);
  }
  const unit = root.config?.unit ?? {};
  const origin = root.federated_false_origin ?? {};
  const groups = readGroups(root.groups, warnings, "groups");
  const knownGroups = indexGroups(groups);
  const models = [];
  const listed = Array.isArray(root.models) ? root.models : [];
  for (let i = 0; i < listed.length; i++) {
    const entry = listed[i];
    if (!entry || typeof entry !== "object") {
      warnings.push(`models[${i}] is not an object; skipping.`);
      continue;
    }
    const source = entry.source ?? {};
    const connector = typeof source.connector === "string" && source.connector ? source.connector : "local";
    const model = {
      id: typeof entry.id === "string" && entry.id ? entry.id : newId(),
      displayName: typeof entry.display_name === "string" ? entry.display_name : "",
      connector,
      path: "",
      sourceData: {},
      transform: readTransform(entry.model_transformation),
      visible: entry.visible !== false,
      groupId: typeof entry.group_id === "string" ? entry.group_id : ""
    };
    if (connector === "local") {
      model.path = normalizeRelativePath(source.path);
      if (!model.path) {
        warnings.push(`models[${i}]: missing source.path; skipping.`);
        continue;
      }
      if (isProjectPath(model.path)) {
        warnings.push(`models[${i}]: nested .ifcfed is not a model; skipping.`);
        continue;
      }
      if (!model.displayName) model.displayName = basename(model.path);
    } else {
      const data = { ...source };
      delete data.connector;
      model.sourceData = data;
      if (!model.displayName) model.displayName = model.id;
    }
    if (model.groupId && !knownGroups.has(model.groupId)) {
      warnings.push(`models[${i}]: unknown group_id '${model.groupId}'; moved to root.`);
      model.groupId = "";
    }
    models.push(model);
  }
  let homeView = null;
  if (root.home_view && typeof root.home_view === "object") {
    const target = vec3(root.home_view.target);
    homeView = {
      target,
      distance: Number(root.home_view.distance ?? 50) || 50,
      yaw: Number(root.home_view.yaw ?? 45) || 0,
      pitch: Number(root.home_view.pitch ?? 30) || 0
    };
  }
  return {
    warnings,
    doc: {
      schema: SCHEMA,
      name: typeof root.name === "string" ? root.name : "",
      created: typeof root.created === "string" ? root.created : "",
      modified: typeof root.modified === "string" ? root.modified : "",
      unit: {
        name: typeof unit.name === "string" && unit.name ? unit.name : "METRE",
        prefix: typeof unit.prefix === "string" ? unit.prefix : ""
      },
      origin: {
        xyz: vec3(origin.xyz),
        rzDeg: Number(origin.rz_deg) || 0
      },
      groups,
      models,
      homeView,
      manifest: null
    }
  };
}
function writeGroups(groups) {
  return groups.map((group) => {
    const entry = {
      id: group.id,
      display_name: group.displayName
    };
    if (!group.visible) entry.visible = false;
    if (group.children?.length) entry.groups = writeGroups(group.children);
    return entry;
  });
}
function writeVec(value) {
  return [value[0], value[1], value[2]];
}
function serializeIfcfed(project, now = (/* @__PURE__ */ new Date()).toISOString()) {
  const created = project.created || now;
  const root = {
    schema: SCHEMA,
    created,
    modified: now,
    config: {
      unit: {
        name: project.unit?.name || "METRE",
        prefix: project.unit?.prefix || ""
      }
    },
    federated_false_origin: {
      xyz: writeVec(project.origin?.xyz ?? [0, 0, 0]),
      rz_deg: project.origin?.rzDeg ?? 0
    }
  };
  if (project.name) root.name = project.name;
  if (project.groups?.length) root.groups = writeGroups(project.groups);
  root.models = (project.models ?? []).map((model) => {
    const entry = {
      id: model.id,
      display_name: model.displayName,
      source: { connector: model.connector || "local" }
    };
    if ((model.connector || "local") === "local") {
      entry.source.path = model.path;
    } else {
      Object.assign(entry.source, model.sourceData ?? {});
    }
    if (!isDefaultTransform(model.transform)) {
      const xf = model.transform;
      entry.model_transformation = {
        a_frame: xf.aFrame === "ModelLocal" ? "ModelLocal" : "ModelGlobal",
        a: writeVec(xf.a),
        b: writeVec(xf.b),
        rxyz_deg: writeVec(xf.rxyzDeg),
        pivot: writeVec(xf.pivot)
      };
    }
    if (!model.visible) entry.visible = false;
    if (model.groupId) entry.group_id = model.groupId;
    return entry;
  });
  if (project.homeView) {
    const home = project.homeView;
    root.home_view = {
      target: writeVec(home.target),
      distance: home.distance,
      yaw: home.yaw,
      pitch: home.pitch
    };
  } else {
    root.home_view = null;
  }
  return JSON.stringify(root, null, 2);
}
function chainVisible(groups, groupId) {
  if (!groupId) return true;
  function walk(list, ancestorsOpen) {
    for (const group of list) {
      const open = ancestorsOpen && group.visible !== false;
      if (group.id === groupId) return open;
      const nested = walk(group.children ?? [], open);
      if (nested != null) return nested;
    }
    return null;
  }
  const found = walk(groups, true);
  return found !== false;
}
function viewerTransform(xf) {
  if (!xf || isDefaultTransform(xf)) return null;
  return {
    aFrame: xf.aFrame === "ModelLocal" ? "local" : "global",
    a: xf.a,
    b: xf.b,
    rotationDeg: xf.rxyzDeg,
    pivot: xf.pivot
  };
}
function fromViewerTransform(xf) {
  if (!xf) return null;
  const stored = {
    aFrame: xf.aFrame === "local" ? "ModelLocal" : "ModelGlobal",
    a: vec3(xf.a),
    b: vec3(xf.b),
    rxyzDeg: vec3(xf.rotationDeg),
    pivot: vec3(xf.pivot)
  };
  return isDefaultTransform(stored) ? null : stored;
}
function uniquePath(path, id, used) {
  const name = normalizeRelativePath(path) || "model.ifc";
  if (!used.has(name.toLowerCase())) {
    used.add(name.toLowerCase());
    return name;
  }
  const cut = name.lastIndexOf("/");
  const file = cut === -1 ? name : name.slice(cut + 1);
  const dir2 = cut === -1 ? "" : name.slice(0, cut + 1);
  const next = `${dir2}${id}/${file}`;
  used.add(next.toLowerCase());
  return next;
}
function projectStem(project) {
  const name = (project.name || "project").trim() || "project";
  return basename(name).replace(/\.(ifcfed|zip)$/i, "") || "project";
}
var Federation = class _Federation {
  static get() {
    return doc;
  }
  static isOpening() {
    return opening;
  }
  static beginOpen() {
    opening = true;
  }
  static endOpen() {
    opening = false;
  }
  static reset() {
    doc = blank();
    modelBySource.clear();
    homePending = 0;
  }
  // Count models that will finish loading. The camera is restored when the
  // last of them arrives, after the viewer's own frame.
  static expectModel() {
    if (doc.homeView) homePending += 1;
  }
  static modelArrived(viewer2) {
    if (homePending <= 0) return;
    homePending -= 1;
    if (homePending === 0 && doc.homeView && viewer2?.setCamera) {
      viewer2.setCamera(doc.homeView);
    }
  }
  static adopt(project) {
    doc = project;
    modelBySource.clear();
    homePending = 0;
  }
  static bind(modelId, sourceId) {
    if (sourceId == null) return;
    modelBySource.set(sourceId, modelId);
  }
  static modelForSource(sourceId) {
    const id = modelBySource.get(sourceId);
    return doc.models.find((model) => model.id === id) ?? null;
  }
  static ensureLocal(sourceId, filename) {
    if (opening || sourceId == null) return null;
    const path = normalizeRelativePath(filename) || `model-${sourceId}.ifc`;
    const existing = _Federation.modelForSource(sourceId);
    if (existing) {
      if (/\.ifc$/i.test(path) && /\.ifcview$/i.test(existing.path)) {
        if (existing.displayName === basename(existing.path)) {
          existing.displayName = basename(path);
        }
        existing.path = path;
      }
      return existing;
    }
    const model = {
      id: newId(),
      displayName: basename(path) || path,
      connector: "local",
      path,
      sourceData: {},
      transform: null,
      visible: true,
      groupId: ""
    };
    doc.models.push(model);
    _Federation.bind(model.id, sourceId);
    return model;
  }
  static setUnit(unit) {
    doc.unit = {
      name: unit?.name || "METRE",
      prefix: unit?.prefix || ""
    };
  }
  static setOrigin(origin) {
    doc.origin = {
      xyz: vec3(origin?.xyz),
      rzDeg: Number(origin?.rzDeg ?? origin?.rz_deg) || 0
    };
  }
  static setTransform(sourceId, xf) {
    const model = _Federation.modelForSource(sourceId);
    if (!model) return;
    model.transform = fromViewerTransform(xf);
  }
  static clearTransform(sourceId) {
    const model = _Federation.modelForSource(sourceId);
    if (model) model.transform = null;
  }
  static setVisible(sourceId, visible) {
    const model = _Federation.modelForSource(sourceId);
    if (model) model.visible = Boolean(visible);
  }
  static isEffectivelyVisible(model) {
    if (!model || model.visible === false) return false;
    return chainVisible(doc.groups, model.groupId);
  }
  static captureViewer(viewer2) {
    try {
      const origin = viewer2?.getFalseOrigin?.();
      if (origin?.xyz) _Federation.setOrigin(origin);
    } catch {
    }
    try {
      const camera = viewer2?.getCamera?.();
      if (camera?.target) {
        doc.homeView = {
          target: vec3(camera.target),
          distance: Number(camera.distance) || 50,
          yaw: Number(camera.yaw) || 0,
          pitch: Number(camera.pitch) || 0
        };
      }
    } catch {
    }
  }
  // `payload` is a Map of federation model id → { ifc, view }, each
  // `{ name, data: Uint8Array } | null`. Models with no bytes stay in the
  // JSON and are omitted from the archive.
  static archiveFiles(payload) {
    const warnings = [];
    const used = /* @__PURE__ */ new Set();
    const files = [];
    for (const model of doc.models) {
      if (model.connector !== "local") continue;
      const row = payload.get(model.id);
      const ifc = row?.ifc?.data ? row.ifc : null;
      const view = row?.view?.data ? row.view : null;
      if (!ifc && !view) {
        warnings.push(`${model.displayName || model.path}: no bytes; kept in the project only.`);
        continue;
      }
      let path = model.path;
      if (ifc && (/\.ifcview$/i.test(path) || !/\.ifc$/i.test(path))) {
        path = ifcPathFor(ifc.name || path);
      } else if (!ifc && view) {
        path = sidecarPath(path) || view.name || path;
      }
      path = uniquePath(path, model.id, used);
      if (model.displayName === basename(model.path) && path !== model.path) {
        model.displayName = basename(path);
      }
      model.path = path;
      if (ifc) files.push({ name: path, data: ifc.data });
      if (view) {
        let viewName = ifc ? sidecarPath(path) || view.name : path;
        if (viewName !== path) {
          if (used.has(viewName.toLowerCase())) viewName = uniquePath(viewName, model.id, used);
          else used.add(viewName.toLowerCase());
          files.push({ name: viewName, data: view.data });
        } else if (!ifc) {
          files.push({ name: path, data: view.data });
        }
      }
    }
    const stem = projectStem(doc);
    if (!doc.name) doc.name = stem;
    const jsonName = `${stem}.ifcfed`;
    const json = encoder.encode(serializeIfcfed(doc));
    return {
      filename: `${stem}.zip`,
      warnings,
      files: [{ name: jsonName, data: json }, ...files]
    };
  }
};
function textOf(bytes) {
  return decoder.decode(bytes);
}
function bagFromEntries(entries) {
  const warnings = [];
  const raw = [];
  for (const entry of entries) {
    const name = normalizeRelativePath(entry.path);
    if (!name || ignoredZipPath(entry.path)) continue;
    raw.push({ path: name, bytes: entry.bytes });
  }
  const stripped = stripSharedRoot(raw.map((entry) => entry.path));
  const files = /* @__PURE__ */ new Map();
  raw.forEach((entry, index) => {
    const path = stripped.paths[index];
    if (path) files.set(path, entry.bytes);
  });
  const projects = [...files.keys()].filter((path) => isProjectPath(path));
  return { files, projects, root: stripped.root, warnings };
}

// src/pipeline/zip.js
var SIG_EOCD = 101010256;
var SIG_CENTRAL_HEADER = 33639248;
var SIG_LOCAL_HEADER = 67324752;
var EOCD_MIN_SIZE = 22;
var EOCD_MAX_SIZE = EOCD_MIN_SIZE + 65535;
function findEocdOffset(view) {
  const start2 = Math.max(0, view.byteLength - EOCD_MAX_SIZE);
  for (let i = view.byteLength - EOCD_MIN_SIZE; i >= start2; i--) {
    if (view.getUint32(i, true) === SIG_EOCD) return i;
  }
  throw new Error("ZIP: End of Central Directory signature not found \u2014 not a zip or truncated");
}
function listZipEntries(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const eocd = findEocdOffset(view);
  const totalEntries = view.getUint16(eocd + 10, true);
  const cdSize = view.getUint32(eocd + 12, true);
  const cdOffset = view.getUint32(eocd + 16, true);
  if (cdOffset === 4294967295 || cdSize === 4294967295 || totalEntries === 65535) {
    throw new Error("ZIP64 archives are not supported");
  }
  const entries = [];
  let p = cdOffset;
  const cdEnd = cdOffset + cdSize;
  for (let i = 0; i < totalEntries && p < cdEnd; i++) {
    if (view.getUint32(p, true) !== SIG_CENTRAL_HEADER) {
      throw new Error(`ZIP: bad central header at offset ${p}`);
    }
    const compressionMethod = view.getUint16(p + 10, true);
    const compressedSize = view.getUint32(p + 20, true);
    const uncompressedSize = view.getUint32(p + 24, true);
    const nameLen = view.getUint16(p + 28, true);
    const extraLen = view.getUint16(p + 30, true);
    const commentLen = view.getUint16(p + 32, true);
    const localHeaderOffset = view.getUint32(p + 42, true);
    if (compressedSize === 4294967295 || uncompressedSize === 4294967295 || localHeaderOffset === 4294967295) {
      throw new Error("ZIP64 extended fields are not supported");
    }
    const name = new TextDecoder().decode(
      bytes.subarray(p + 46, p + 46 + nameLen)
    );
    entries.push({
      name,
      compressionMethod,
      compressedSize,
      uncompressedSize,
      localHeaderOffset
    });
    p += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}
async function inflateRaw(deflated) {
  const ds = new DecompressionStream("deflate-raw");
  const stream = new Blob([deflated]).stream().pipeThrough(ds);
  const buf = await new Response(stream).arrayBuffer();
  return new Uint8Array(buf);
}
async function readZipEntry(bytes, entry) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const h = entry.localHeaderOffset;
  if (view.getUint32(h, true) !== SIG_LOCAL_HEADER) {
    throw new Error(`ZIP: bad local header for "${entry.name}" at ${h}`);
  }
  const nameLen = view.getUint16(h + 26, true);
  const extraLen = view.getUint16(h + 28, true);
  const dataStart = h + 30 + nameLen + extraLen;
  const dataEnd = dataStart + entry.compressedSize;
  const data = bytes.subarray(dataStart, dataEnd);
  if (entry.compressionMethod === 0) return data.slice();
  if (entry.compressionMethod === 8) return inflateRaw(data);
  throw new Error(
    `ZIP: unsupported compression method ${entry.compressionMethod} for "${entry.name}" (only STORE and DEFLATE are supported)`
  );
}
async function readZipEntriesByExtension(bytes, extensionsLower) {
  const entries = listZipEntries(bytes);
  const wanted = entries.filter((e) => {
    const name = e.name.toLowerCase();
    return extensionsLower.some((ext) => name.endsWith(ext));
  });
  const results = [];
  for (const entry of wanted) {
    results.push({ entry, bytes: await readZipEntry(bytes, entry) });
  }
  return results;
}
function crc32(data) {
  let crc = 4294967295;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let bit = 0; bit < 8; bit++) {
      crc = crc >>> 1 ^ 3988292384 & -(crc & 1);
    }
  }
  return (crc ^ 4294967295) >>> 0;
}
function writeStoredZip(files) {
  const encoder2 = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;
  for (const file of files) {
    const nameBytes = encoder2.encode(file.name);
    const data = file.data;
    const crc = crc32(data);
    const local = new Uint8Array(30 + nameBytes.byteLength + data.byteLength);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, SIG_LOCAL_HEADER, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(8, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.byteLength, true);
    lv.setUint32(22, data.byteLength, true);
    lv.setUint16(26, nameBytes.byteLength, true);
    local.set(nameBytes, 30);
    local.set(data, 30 + nameBytes.byteLength);
    localParts.push(local);
    const central = new Uint8Array(46 + nameBytes.byteLength);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, SIG_CENTRAL_HEADER, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(10, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.byteLength, true);
    cv.setUint32(24, data.byteLength, true);
    cv.setUint16(28, nameBytes.byteLength, true);
    cv.setUint32(42, localOffset, true);
    central.set(nameBytes, 46);
    centralParts.push(central);
    localOffset += local.byteLength;
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.byteLength, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, SIG_EOCD, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, localOffset, true);
  const out = new Uint8Array(localOffset + centralSize + eocd.byteLength);
  let cursor = 0;
  for (const part of localParts) {
    out.set(part, cursor);
    cursor += part.byteLength;
  }
  for (const part of centralParts) {
    out.set(part, cursor);
    cursor += part.byteLength;
  }
  out.set(eocd, cursor);
  return out;
}

// src/pipeline/thread.js
var THREADS = ["auto", "worker", "main"];
function resolveThread(thread) {
  if (thread === "worker" || thread === "main") return thread;
  if (thread !== "auto") {
    throw new Error(`unknown convert thread "${thread}" (expected ${THREADS.join(" | ")})`);
  }
  return "worker";
}

// app/configuration/imports.js
function dir(path) {
  if (!path) throw new Error("A package directory in configuration.paths is missing");
  return path.endsWith("/") ? path : `${path}/`;
}
function viewerScripts(paths2) {
  const base = dir(paths2.viewer);
  return [`${base}IfcViewerWeb.js`, `${base}ifcviewer.js`];
}
function dependencyUrls(paths2) {
  const zstd = dir(paths2.zstd);
  const fzstd = dir(paths2.fzstd);
  const shim = dir(paths2.shim);
  return {
    zstdModule: `${zstd}index.js`,
    zstdWasm: `${zstd}wasm-zstd.wasm`,
    fzstdModule: `${fzstd}index.mjs`,
    shim: `${shim}es-module-shims.wasm.js`
  };
}

// src/pipeline/worker-host.js
function absoluteImportMap(map, base) {
  const imports = {};
  for (const [key, value] of Object.entries(map?.imports ?? {})) {
    imports[key] = new URL(value, base).href;
  }
  return { imports };
}
function readPageImportMap() {
  const node = document.querySelector('script[type="importmap"]');
  if (!node?.textContent) {
    throw new Error("IfcOpenShell worker needs the page import map");
  }
  return absoluteImportMap(JSON.parse(node.textContent), document.baseURI);
}
function createIfcOpenShellWorker(moduleUrl, { shimUrl, assets } = {}) {
  if (!shimUrl) throw new Error("convert worker needs a shim URL");
  if (!assets?.zstdModule || !assets?.zstdWasm) throw new Error("convert worker needs zstd paths");
  const importMap = readPageImportMap();
  const source = `
		self.bonsaiAssets = ${JSON.stringify(assets)};
		let installed = false;
		const pending = [];
		self.addEventListener( 'message', ( event ) => {
			if ( ! installed ) pending.push( event.data );
		} );
		importScripts( ${JSON.stringify(shimUrl)} );
		importShim.addImportMap( ${JSON.stringify(importMap)} );
		importShim( ${JSON.stringify(moduleUrl)} ).then( ( mod ) => {
			if ( typeof mod.handleMessage !== 'function' ) {
				throw new Error( 'convert worker missing handleMessage' );
			}
			let chain = Promise.resolve();
			const enqueue = ( data ) => {
				chain = chain.then( () => mod.handleMessage( { data } ) );
			};
			self.onmessage = ( event ) => enqueue( event.data );
			installed = true;
			for ( const data of pending ) enqueue( data );
		} ).catch( ( err ) => {
			setTimeout( () => { throw err; }, 0 );
		} );
	`;
  const blob = new Blob([source], { type: "text/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

// src/tool/viewerTools.js
function call(api, method, symbol) {
  if (api && typeof api[method] === "function") return api[method]();
  const fn = api?.module?.[symbol];
  if (typeof fn !== "function") return void 0;
  return fn();
}
function flag(api, method, symbol) {
  const value = call(api, method, symbol);
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  return false;
}
function readViewerTools(api) {
  return {
    section: flag(api, "sectionActive", "_section_is_active_c"),
    fly: flag(api, "flyActive", "_fly_is_active_c"),
    ortho: flag(api, "projectionIsOrtho", "_projection_is_ortho_c"),
    grid: typeof api?.gridVisible === "function" ? !!api.gridVisible() : false,
    axes: typeof api?.originAxesVisible === "function" ? !!api.originAxesVisible() : false,
    fog: typeof api?.fogVisible === "function" ? !!api.fogVisible() : false,
    xray: typeof api?.xrayActive === "function" ? !!api.xrayActive() : false,
    outline: typeof api?.selectionOutlineEnabled === "function" ? !!api.selectionOutlineEnabled() : false
  };
}
function toggleSection(api) {
  call(api, "toggleSection", "_toggle_section_c");
  return flag(api, "sectionActive", "_section_is_active_c");
}
function clearSection(api) {
  call(api, "clearSection", "_clear_section_c");
}
function toggleFly(api) {
  call(api, "toggleFly", "_toggle_fly_c");
  return flag(api, "flyActive", "_fly_is_active_c");
}
function toggleProjection(api) {
  if (typeof api?.toggleProjection === "function" || typeof api?.module?._toggle_projection_c === "function") {
    call(api, "toggleProjection", "_toggle_projection_c");
    return flag(api, "projectionIsOrtho", "_projection_is_ortho_c");
  }
  if (typeof api?.setCamera === "function" && typeof api?.getCamera === "function") {
    const ortho = !api.getCamera().ortho;
    api.setCamera({ ortho });
    return ortho;
  }
  return false;
}
function toggleGrid(api) {
  if (typeof api?.toggleGrid === "function") api.toggleGrid();
  return typeof api?.gridVisible === "function" ? !!api.gridVisible() : false;
}
function toggleAxes(api) {
  if (typeof api?.toggleOriginAxes === "function") api.toggleOriginAxes();
  return typeof api?.originAxesVisible === "function" ? !!api.originAxesVisible() : false;
}
function toggleFog(api) {
  if (typeof api?.toggleFog === "function") api.toggleFog();
  return typeof api?.fogVisible === "function" ? !!api.fogVisible() : false;
}
var last = null;
var listeners = /* @__PURE__ */ new Set();
function same(a, b) {
  if (!a || !b) return false;
  return a.section === b.section && a.fly === b.fly && a.ortho === b.ortho && a.grid === b.grid && a.axes === b.axes && a.fog === b.fog && a.xray === b.xray && a.outline === b.outline;
}
function publishViewerTools(api) {
  const next = readViewerTools(api);
  if (same(last, next)) return last;
  last = next;
  for (const cb of listeners) cb(next);
  return next;
}
function onViewerTools(cb) {
  listeners.add(cb);
  if (last) cb(last);
  return () => listeners.delete(cb);
}

// src/tool/Viewer.js
var SIDECAR_FORMAT_VERSION = 19;
var viewer = null;
var originReadout = null;
var marquee = null;
var unbindOriginReadout = null;
function appendScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}
async function loadViewer(paths2) {
  if (typeof globalThis.createIfcViewer === "function" && globalThis.IfcViewer) return;
  for (const src of viewerScripts(paths2)) await appendScript(src);
}
async function create(container, paths2) {
  const canvas = document.createElement("canvas");
  canvas.id = "viewer-canvas";
  if (getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }
  canvas.style.cssText = "position:absolute;inset:0;display:block;width:100%;height:100%;outline:none;";
  container.appendChild(canvas);
  marquee = document.createElement("div");
  marquee.id = "marquee";
  container.appendChild(marquee);
  await loadViewer(paths2);
  const { IfcViewer } = globalThis;
  const moduleFactory = globalThis.createIfcViewer;
  let x, y;
  viewer = await IfcViewer.create({
    canvas,
    sidecarFormatVersion: SIDECAR_FORMAT_VERSION,
    navPreset: "blender",
    moduleFactory,
    // The viewer redraws after a resize itself. A window move can also
    // discard the bitmap, and the browser fires no event for it, so poll
    // the window position. Do not watch canvas.width/height here: that
    // would draw every resize twice.
    onFrame(api) {
      publishViewerTools(api);
      if (x === screenX && y === screenY) return;
      x = screenX;
      y = screenY;
      api.requestRedraw();
    }
  });
  await viewer.ready;
  viewer.setOriginAxes({ size: 1e3, visible: true });
  originReadout = document.createElement("div");
  originReadout.id = "origin-readout";
  originReadout.hidden = true;
  container.appendChild(originReadout);
  unbindOriginReadout = viewer.bindOriginReadout(originReadout);
  viewer.requestRedraw();
  viewer.canvas ??= canvas;
  return viewer;
}
function destroy() {
  unbindOriginReadout?.();
  unbindOriginReadout = null;
  originReadout?.remove();
  originReadout = null;
  marquee?.remove();
  marquee = null;
  viewer = null;
}
var Viewer = class {
  static get() {
    return viewer;
  }
};

// src/tool/Loader.js
var log2 = createLogger("loader");
var ifcRuntime = null;
var DELIVERIES = ["stream", "end"];
var convertDefaults = { kernel: "opencascade", thread: "worker", delivery: "stream" };
var PACKAGE_ROOT = new URL("../", import.meta.url);
var CONVERT_WORKER = "src/pipeline/worker.js";
var paths = null;
var convertWorker = null;
var convertWorkerSeq = 0;
var convertWorkerPending = /* @__PURE__ */ new Map();
var sidecarCache = /* @__PURE__ */ new Map();
var Loader = class _Loader {
  // ---- Conversion settings ----------------------------------------
  // { kernel, thread, delivery }. The load methods below also read these
  // keys from their options/hooks argument to override them per call.
  // delivery is 'stream' (parts as they finish) or 'end' (open the
  // finished sidecar in one step).
  static usePaths(next) {
    paths = next ?? null;
  }
  static _dependencyUrls() {
    if (!paths) throw new Error("Loader.usePaths() is required before conversion");
    return dependencyUrls(paths);
  }
  static configure(options = {}) {
    const next = { ...convertDefaults, ..._Loader._pickConvertOptions(options) };
    _Loader._validateConvertOptions(next);
    Object.assign(convertDefaults, next);
    return _Loader.convertOptions();
  }
  static convertOptions(overrides = {}) {
    const opts = { ...convertDefaults, ..._Loader._pickConvertOptions(overrides) };
    _Loader._validateConvertOptions(opts);
    return opts;
  }
  static _pickConvertOptions(options) {
    const picked = {};
    for (const key of ["kernel", "thread", "delivery"]) {
      if (options?.[key] != null) picked[key] = options[key];
    }
    return picked;
  }
  static _validateConvertOptions({ thread, delivery }) {
    if (!THREADS.includes(thread)) resolveThread(thread);
    if (!DELIVERIES.includes(delivery)) {
      throw new Error(`unknown geometry delivery "${delivery}" (expected ${DELIVERIES.join(" | ")})`);
    }
  }
  // Pre-load the live-file schemas and spawn the convert worker after
  // appReady, so the first model does not pay those cold starts on the
  // interaction path. One plugin at a time: parallel loads contend.
  static warmRuntimes() {
    const idle = globalThis.requestIdleCallback ?? ((callback) => setTimeout(callback, 1));
    idle(() => {
      void _Loader._warmMainSchema().then(() => _Loader._warmConvertWorker());
    });
  }
  static async _warmMainSchema() {
    try {
      const ifcopenshell = await import("ifcopenshell");
      ifcRuntime ??= await ifcopenshell.init();
      for (const schema of ["ifc4", "ifc2x3"]) {
        if (ifcRuntime.loadedPlugins().includes(`schema:${schema}`)) continue;
        log2.log(`pre-warming main-thread schema:${schema}`);
        await ifcRuntime.loadPlugin("schema", schema);
      }
    } catch (err) {
      log2.warn("main-thread schema warm failed:", err);
    }
  }
  static async _warmConvertWorker() {
    const { kernel } = convertDefaults;
    try {
      const worker = _Loader._getConvertWorker();
      const id = ++convertWorkerSeq;
      await new Promise((resolve, reject) => {
        convertWorkerPending.set(id, { worker, resolve, reject });
        worker.postMessage({ id, type: "warm", kernel });
      });
      log2.log(`convert worker warmed (kernel=${kernel})`);
    } catch (err) {
      log2.warn("convert worker warm failed:", err);
    }
  }
  // ---- Add / remove sources ---------------------------------------
  // Returns the sourceId (valid immediately, before streaming completes).
  // Geometry is additive: the viewer's embedded sample and any already
  // streamed models stay. A live .ifc is opened beside its .ifcview
  // (see _pairLiveIfc). Pass `{ replace: true }` to drop the scene first.
  static async addFile(file, options) {
    const opts = { ...options };
    if (opts.replace || !Ifc.get()) {
      Ifc.clear();
      sidecarCache.clear();
      opts.replace = true;
    }
    const sourceId = await viewer.addFile(file, opts);
    const name = file?.name;
    if (typeof name === "string" && name.toLowerCase().endsWith(".ifcview")) {
      Ifc.setView(sourceId, name);
      _Loader._remember(sourceId, {
        view: { name, bytes: file.size, file }
      });
    }
    _Loader._track(sourceId, name);
    return sourceId;
  }
  static _sidecarName(ifcName) {
    return String(ifcName).replace(/\.ifc$/i, ".ifcview");
  }
  // Source already in the scene for this IFC (matching .ifcview or .ifc).
  static _sourceIdBeside(ifcName) {
    const sidecar = _Loader._sidecarName(ifcName);
    return Ifc.get(sidecar)?.sourceId ?? Ifc.get(ifcName)?.sourceId ?? null;
  }
  // Stream sidecar geometry only when this model is not already in the
  // scene, then attach a live IFC that may already be opening.
  static async _pairLiveIfc(liveBytes, ifcName, sidecarBytes, hooks, liveTask) {
    const file = sidecarBytes instanceof File ? sidecarBytes : new File([sidecarBytes], _Loader._sidecarName(ifcName));
    let sourceId = _Loader._sourceIdBeside(ifcName);
    if (sourceId == null) {
      sourceId = await _Loader.addFile(file, { replace: false });
    }
    if (sourceId != null) {
      _Loader._remember(sourceId, {
        view: { name: file.name, bytes: file.size, file }
      });
    }
    await _Loader._attachLive(sourceId, liveBytes, ifcName, hooks, liveTask);
    return sourceId;
  }
  static canStream() {
    return _Loader._canStream();
  }
  static _canStream() {
    const native = viewer?.module?._ifcv_begin_stream_c && viewer?.module?._ifcv_append_part_c && viewer?.module?._ifcv_end_stream_c;
    return Boolean(native);
  }
  static _startStream(ifcName) {
    if (!Ifc.get()) viewer.clearScene();
    const sidecarName = _Loader._sidecarName(ifcName);
    const sourceId = viewer.beginStream({ name: sidecarName });
    Ifc.setView(sourceId, sidecarName);
    _Loader._track(sourceId, sidecarName);
    return sourceId;
  }
  static async _finishStream(sourceId, ifcName, sidecarBytes) {
    const file = sidecarBytes instanceof File ? sidecarBytes : new File([sidecarBytes], _Loader._sidecarName(ifcName));
    _Loader._remember(sourceId, {
      view: { name: file.name, bytes: file.size, file }
    });
    const stream = viewer._streams?.get?.(sourceId);
    if (!stream?.parts?.length) await viewer.appendPart(sourceId, file);
    viewer.endStream(sourceId);
    return sourceId;
  }
  // Bytes kept so a project row can save the .ifc, the .ifcview, or both.
  // { sourceId, ifc: { name, bytes, data } | null, view: { name, bytes, file } | null }
  static bundle(sourceId) {
    return sidecarCache.get(sourceId) ?? null;
  }
  static _remember(sourceId, patch) {
    const row = sidecarCache.get(sourceId) ?? { sourceId, ifc: null, view: null };
    Object.assign(row, patch);
    sidecarCache.set(sourceId, row);
    return row;
  }
  static async saveFile(file) {
    if (!file) return;
    const ext = file.name.match(/\.[^.]+$/)?.[0]?.toLowerCase() ?? "";
    const kinds = {
      ".ifc": ["IFC", { "application/octet-stream": [".ifc"] }],
      ".ifcview": ["IFC view", { "application/octet-stream": [".ifcview"] }],
      ".zip": ["Zip archive", { "application/zip": [".zip"] }]
    };
    try {
      if (typeof window !== "undefined" && window.showSaveFilePicker) {
        const kind = kinds[ext];
        const handle = await window.showSaveFilePicker({
          suggestedName: file.name,
          types: kind ? [{ description: kind[0], accept: kind[1] }] : void 0
        });
        const writable = await handle.createWritable();
        await writable.write(file);
        await writable.close();
        return;
      }
      const anchor = document.createElement("a");
      const url = URL.createObjectURL(file);
      anchor.href = url;
      anchor.download = file.name;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (err) {
      if (err?.name === "AbortError") return;
      log2.error(`save failed for ${file.name}:`, err);
    }
  }
  static _track(sourceId, name) {
    if (sourceId == null || Federation.isOpening()) return;
    Federation.ensureLocal(sourceId, name);
  }
  static clear() {
    viewer?.clearScene();
    Ifc.clear();
    sidecarCache.clear();
    if (!Federation.isOpening()) Federation.reset();
  }
  // The first addFile of an empty scene calls clearScene, which drops a
  // false origin set beforehand. Re-apply after every model is queued.
  static _applyProjectPlacement() {
    const project = Federation.get();
    if (!viewer?.setFederationUnit) return;
    viewer.setFederationUnit({
      name: project.unit.name,
      prefix: project.unit.prefix
    });
    viewer.setFalseOrigin({
      xyz: project.origin.xyz,
      rzDeg: project.origin.rzDeg
    });
  }
  static _applyProjectModel(sourceId) {
    const model = Federation.modelForSource(sourceId);
    const xf = viewerTransform(model?.transform);
    if (xf) viewer.setModelTransform(sourceId, xf);
  }
  // ---- Local file load (picker and drag & drop share this path) ----
  // .ifc     → if that model is already in the scene, just open the
  //            live IFC beside it; otherwise convert → cache → stream.
  //            The .ifcview stays in sidecarCache until the user saves it.
  // .ifcview → stream directly (no-op if already loaded).
  // .zip     → look for a pre-baked (.ifc, .ifcview) pair inside.
  static async loadLocalFile(file, hooks) {
    if (!file) return null;
    try {
      const lower = file.name.toLowerCase();
      if (lower.endsWith(".ifcview")) {
        const existing2 = Ifc.get(file.name)?.sourceId;
        if (existing2 != null) return existing2;
        return _Loader.addFile(file, { replace: false });
      }
      if (lower.endsWith(".zip")) {
        const zipBytes = new Uint8Array(await file.arrayBuffer());
        const entries = listZipEntries(zipBytes);
        const named2 = [];
        for (const entry of entries) {
          if (!entry.name || entry.name.endsWith("/")) continue;
          named2.push({ path: entry.name, entry });
        }
        const bag = bagFromEntries(named2.map((row) => ({ path: row.path, bytes: null })));
        if (bag.projects.length) {
          const files = [];
          for (const row of named2) {
            files.push({
              path: row.path,
              bytes: await readZipEntry(zipBytes, row.entry)
            });
          }
          return _Loader.openProjectBag(files, hooks, file.name);
        }
        return _Loader._openModelZip(zipBytes, hooks, file.name);
      }
      if (isProjectPath(file.name)) {
        const bytes2 = new Uint8Array(await file.arrayBuffer());
        return _Loader.openProjectBag([{ path: file.name, bytes: bytes2 }], hooks, file.name);
      }
      if (!lower.endsWith(".ifc")) {
        log2.log(`loadLocalFile skipped unsupported type: ${file.name}`);
        return null;
      }
      const bytes = new Uint8Array(await file.arrayBuffer());
      const liveBytes = bytes.slice();
      const existing = _Loader._sourceIdBeside(file.name);
      if (existing != null) {
        await _Loader._openLive(existing, liveBytes, file.name, hooks);
        return existing;
      }
      return _Loader._convertAndPair(bytes, liveBytes, file.name, hooks);
    } catch (err) {
      log2.error(`loadLocalFile failed for ${file.name}:`, err);
      throw err;
    }
  }
  // ---- Drag & drop -------------------------------------------------
  // One file stays a model drop. A folder, or several files that include
  // an `.ifcfed`, is a project bag: `{ entries: [{ path, bytes }], label }`.
  static enableDragDrop(target, onFile) {
    const stop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const win = typeof window !== "undefined" ? window : null;
    if (win) {
      win.addEventListener("dragover", (e) => e.preventDefault());
      win.addEventListener("drop", (e) => e.preventDefault());
    }
    target.addEventListener("dragover", stop);
    target.addEventListener("dragenter", stop);
    target.addEventListener("drop", async (e) => {
      stop(e);
      const payload = await _Loader.collectDrop(e.dataTransfer);
      if (payload) onFile?.(payload);
    });
  }
  static async collectDrop(dataTransfer) {
    if (!dataTransfer) return null;
    const items = [...dataTransfer.items ?? []];
    const walked = [];
    const canWalk = items.some((item) => typeof item.webkitGetAsEntry === "function");
    if (canWalk) {
      for (const item of items) {
        const entry = item.webkitGetAsEntry?.();
        if (!entry) continue;
        await _Loader._walkEntry(entry, "", walked);
      }
    }
    const project = walked.filter((row) => isProjectPath(row.path));
    if (project.length) {
      return {
        entries: walked.map((row) => ({ path: row.path, bytes: row.bytes })),
        label: basename(project[0].path)
      };
    }
    if (walked.length === 1) return { file: walked[0].file };
    if (walked.length > 1) {
      return {
        files: walked.filter((row) => /\.(ifc|ifcview|zip)$/i.test(row.path)).map((row) => row.file)
      };
    }
    const file = dataTransfer.files?.[0];
    return file ? { file } : null;
  }
  static async _walkEntry(entry, prefix, out) {
    if (entry.isFile) {
      const file = await new Promise((resolve, reject) => entry.file(resolve, reject));
      out.push({
        path: `${prefix}${entry.name}`,
        bytes: new Uint8Array(await file.arrayBuffer()),
        file
      });
      return;
    }
    if (!entry.isDirectory) return;
    const reader = entry.createReader();
    const children = await _Loader._readAllEntries(reader);
    for (const child of children) {
      await _Loader._walkEntry(child, `${prefix}${entry.name}/`, out);
    }
  }
  static _readAllEntries(reader) {
    return new Promise((resolve, reject) => {
      const all = [];
      const next = () => {
        reader.readEntries((batch) => {
          if (!batch.length) resolve(all);
          else {
            all.push(...batch);
            next();
          }
        }, reject);
      };
      next();
    });
  }
  // A project bag is an `.ifcfed` plus the relative files it names. `entries`
  // is `{ path, bytes }`. A zip and a dropped folder both end here.
  static async openProjectBag(entries, hooks, label = "project.ifcfed") {
    const bag = bagFromEntries(entries);
    if (bag.projects.length === 0) {
      throw new Error(`${label} has no .ifcfed`);
    }
    if (bag.projects.length > 1) {
      throw new Error(`${label} has more than one .ifcfed: ${bag.projects.join(", ")}`);
    }
    const fedPath = bag.projects[0];
    const parsed = parseIfcfed(textOf(bag.files.get(fedPath)));
    if (!parsed.doc.name) parsed.doc.name = basename(fedPath).replace(/\.ifcfed$/i, "");
    const manifest = lookupFile(bag.files, `${fedPath}.manifest`);
    if (manifest) {
      try {
        parsed.doc.manifest = JSON.parse(textOf(manifest.bytes));
      } catch (err) {
        parsed.warnings.push(`Ignoring malformed manifest ${fedPath}.manifest: ${err.message}`);
      }
    }
    Federation.beginOpen();
    try {
      _Loader.clear();
      Federation.adopt(parsed.doc);
      _Loader._applyProjectPlacement();
      const loaded = [];
      for (const model of parsed.doc.models) {
        if (model.connector !== "local") {
          parsed.warnings.push(`${model.displayName}: connector '${model.connector}' is not loaded in the browser.`);
          continue;
        }
        Federation.expectModel();
        let sourceId = null;
        try {
          sourceId = await _Loader._loadBagModel(bag.files, model, hooks);
        } catch (err) {
          Federation.modelArrived(viewer);
          throw err;
        }
        if (sourceId == null) {
          Federation.modelArrived(viewer);
          parsed.warnings.push(`${model.displayName}: missing ${model.path}.`);
          continue;
        }
        Federation.bind(model.id, sourceId);
        _Loader._applyProjectPlacement();
        _Loader._applyProjectModel(sourceId);
        loaded.push(sourceId);
      }
      if (!loaded.length && parsed.doc.homeView) viewer?.setCamera?.(parsed.doc.homeView);
      if (parsed.warnings.length) log2.warn(parsed.warnings.join("\n"));
      return { sourceIds: loaded, warnings: parsed.warnings, name: parsed.doc.name };
    } finally {
      Federation.endOpen();
    }
  }
  static async _loadBagModel(files, model, hooks) {
    const main = lookupFile(files, model.path);
    if (!main) return null;
    const fileName = basename(model.path);
    const step = isStepBytes(main.bytes);
    if (/\.ifcview$/i.test(model.path) && !step) {
      return _Loader.addFile(new File([main.bytes], fileName), { replace: false });
    }
    const ifcName = step && /\.ifcview$/i.test(fileName) ? fileName.replace(/\.ifcview$/i, ".ifc") : fileName;
    const sideName = sidecarPath(ifcName);
    const side = sideName && sideName.toLowerCase() !== model.path.toLowerCase() ? lookupFile(files, sideName) : null;
    if (side && !isStepBytes(side.bytes)) {
      return _Loader._pairLiveIfc(main.bytes, ifcName, side.bytes, hooks);
    }
    if (step || /\.ifc$/i.test(model.path)) {
      const live = main.bytes.slice();
      return _Loader._convertAndPair(main.bytes, live, ifcName, hooks);
    }
    return null;
  }
  // A zip with no `.ifcfed`: one `.ifc` / `.ifcview` pair, as before.
  static async _openModelZip(zipBytes, hooks, zipName) {
    let found;
    try {
      found = await readZipEntriesByExtension(zipBytes, [".ifcview", ".ifc"]);
    } catch (err) {
      log2.error(`zip read failed for ${zipName}:`, err);
      throw err;
    }
    const ifcview = found.find((f) => f.entry.name.toLowerCase().endsWith(".ifcview"));
    const ifcEntry = found.find((f) => f.entry.name.toLowerCase().endsWith(".ifc"));
    if (!ifcview && !ifcEntry) {
      throw new Error(`zip ${zipName} contains neither .ifcview nor .ifc`);
    }
    if (!ifcview && ifcEntry) {
      const ifcName2 = ifcEntry.entry.name.split("/").pop();
      log2.log(`zip ${zipName} has only ${ifcEntry.entry.name} \u2014 converting via worker`);
      const liveBytes = ifcEntry.bytes.slice();
      const existing2 = _Loader._sourceIdBeside(ifcName2);
      if (existing2 != null) {
        await _Loader._openLive(existing2, liveBytes, ifcName2, hooks);
        return existing2;
      }
      return _Loader._convertAndPair(ifcEntry.bytes, liveBytes, ifcName2, hooks);
    }
    const sidecarName = ifcview.entry.name.split("/").pop();
    const ifcName = ifcEntry?.entry.name.split("/").pop();
    const existing = (ifcName && _Loader._sourceIdBeside(ifcName)) ?? Ifc.get(sidecarName)?.sourceId;
    if (existing != null) {
      if (ifcEntry) await _Loader._openLive(existing, ifcEntry.bytes, ifcName, hooks);
      return existing;
    }
    log2.log(`zip ${zipName} fast path: streaming ${sidecarName} (${ifcview.bytes.byteLength} bytes)`);
    const sourceId = await _Loader.addFile(
      new File([ifcview.bytes], sidecarName),
      { replace: false }
    );
    if (ifcEntry) {
      await _Loader._openLive(sourceId, ifcEntry.bytes, ifcName, hooks);
    } else {
      log2.log(`zip ${zipName} has no .ifc \u2014 properties panel will stay sidecar-only`);
    }
    return sourceId;
  }
  // Fetch an .ifc URL, convert in the worker, stream the result. Used
  // for autoload / tests — no save prompt.
  static async loadIfcUrl(url, options = {}) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`);
    const bytes = new Uint8Array(await res.arrayBuffer());
    log2.log(`fetched ${bytes.byteLength} bytes`);
    const name = options.name ?? url.split("/").pop() ?? "model.ifc";
    if (/\.ifcview$/i.test(name)) {
      const existing2 = Ifc.get(name)?.sourceId;
      if (existing2 != null) return existing2;
      return _Loader.addFile(new File([bytes], name), { replace: false });
    }
    const liveBytes = bytes.slice();
    const existing = _Loader._sourceIdBeside(name);
    if (existing != null) {
      await _Loader._openLive(existing, liveBytes, name, options);
      return existing;
    }
    log2.log("handing off to converter\u2026");
    return _Loader._convertAndPair(bytes, liveBytes, name, options);
  }
  // Open the live IFC on the main thread and promote that source to edit
  // mode, so tool.Ifc / tool.Element can resolve picks to full entities.
  // The sidecar for this source is already registered as view mode.
  //
  // Same sequence as threejs.html: read FILE_SCHEMA from the first 4KB,
  // lowercase it, load that schema plugin, then open. `open` is synchronous
  // and fails if the plugin is not loaded yet.
  static async openIfcFile(sourceId, bytes, name) {
    const file = await _Loader._parseLiveIfc(bytes, name);
    if (!file) return;
    log2.log(`live IFC opened for source ${sourceId} (${name})`);
    Ifc.setEdit(sourceId, file, name);
    const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    _Loader._remember(sourceId, {
      ifc: { name, bytes: data.byteLength, data }
    });
    return file;
  }
  // Open the STEP file without a viewer source yet, so the live parse can
  // run in parallel with conversion. Callers then `_attachLive`.
  static async _parseLiveIfc(bytes, name) {
    try {
      const ifcopenshell = await import("ifcopenshell");
      ifcRuntime ??= await ifcopenshell.init();
      const stream = ifcRuntime.raw.parse.streamFromString(
        new TextDecoder().decode(bytes.slice(0, 4096))
      );
      let header, declaration, schema;
      try {
        header = stream.header();
        declaration = header.fileSchema();
        schema = declaration.schemaIdentifiers()[0].toLowerCase();
      } finally {
        declaration?.destroy();
        header?.destroy();
        stream.destroy();
      }
      if (!ifcRuntime.loadedPlugins().includes(`schema:${schema}`)) {
        log2.log(`loading schema plugin ${schema}`);
        await ifcRuntime.loadPlugin("schema", schema);
      }
      return ifcopenshell.open(bytes, name);
    } catch (err) {
      log2.error(`live IFC open failed for ${name}:`, err);
    }
  }
  static async _attachLive(sourceId, bytes, name, hooks, liveTask) {
    const file = liveTask ? await liveTask : await _Loader.openIfcFile(sourceId, bytes, name);
    if (!file) return null;
    if (liveTask) {
      Ifc.setEdit(sourceId, file, name);
      const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
      _Loader._remember(sourceId, {
        ifc: { name, bytes: data.byteLength, data }
      });
    }
    hooks?.onLiveIfc?.({ sourceId, name, file });
    Federation.ensureLocal(sourceId, name);
    return file;
  }
  static async _openLive(sourceId, bytes, name, hooks) {
    return _Loader._attachLive(sourceId, bytes, name, hooks);
  }
  // Convert, optionally stream parts into a federated source, and attach
  // the live IFC. The live parse starts immediately so it overlaps conversion.
  static async _convertAndPair(bytes, liveBytes, ifcName, hooks) {
    const liveTask = _Loader._parseLiveIfc(liveBytes, ifcName);
    const { delivery } = _Loader.convertOptions(hooks);
    const streaming = delivery === "stream" && _Loader._canStream();
    if (delivery === "stream" && !streaming) {
      log2.warn("streaming requested but the viewer has no stream API; opening geometry when conversion finishes");
    }
    const sourceId = streaming ? _Loader._startStream(ifcName) : null;
    const convertHooks = streaming ? {
      ...hooks,
      onPart: async (partBytes) => {
        await viewer.appendPart(sourceId, partBytes);
      }
    } : hooks;
    let sidecarBytes;
    try {
      sidecarBytes = await _Loader._convert(bytes, ifcName, convertHooks);
      log2.log(`converter returned sidecar (${sidecarBytes.byteLength} bytes)`);
    } catch (err) {
      if (streaming && sourceId != null) {
        try {
          viewer.endStream(sourceId);
        } catch {
        }
      }
      throw err;
    }
    if (streaming) {
      await _Loader._finishStream(sourceId, ifcName, sidecarBytes);
      await _Loader._attachLive(sourceId, liveBytes, ifcName, hooks, liveTask);
      return sourceId;
    }
    return _Loader._pairLiveIfc(liveBytes, ifcName, sidecarBytes, hooks, liveTask);
  }
  // Spawned on first use and reused afterwards.
  static _getConvertWorker() {
    if (convertWorker) return convertWorker;
    const workerUrl = new URL(CONVERT_WORKER, PACKAGE_ROOT);
    log2.log("spawning convert worker:", workerUrl.href);
    const urls = _Loader._dependencyUrls();
    const worker = createIfcOpenShellWorker(workerUrl.href, {
      shimUrl: urls.shim,
      assets: { zstdModule: urls.zstdModule, zstdWasm: urls.zstdWasm }
    });
    convertWorker = worker;
    worker.onmessage = (ev) => {
      const { id, type } = ev.data;
      const pending = convertWorkerPending.get(id);
      if (!pending) return;
      if (type === "progress") {
        pending.onConvertProgress?.(ev.data.progress);
      } else if (type === "part") {
        pending.partChain = (pending.partChain ?? Promise.resolve()).then(() => pending.onPart?.(ev.data.bytes)).catch((err) => log2.error("onPart failed:", err));
      } else if (type === "warmed") {
        convertWorkerPending.delete(id);
        if (ev.data.ok) pending.resolve?.(ev.data);
        else pending.reject?.(new Error(ev.data.error || "Convert worker warm failed"));
      } else if (type === "result") {
        convertWorkerPending.delete(id);
        const finish = () => {
          if (ev.data.ok) {
            pending.resolve(ev.data);
          } else if (ev.data.fatal) {
            const err = new Error(ev.data.error || "Conversion crashed");
            err.fatal = true;
            err.bytes = ev.data.bytes;
            pending.reject(err);
            _Loader._dropConvertWorker(worker, `convert worker crashed: ${err.message}`);
          } else {
            pending.reject(new Error(ev.data.error || "Conversion failed"));
          }
        };
        if (pending.partChain) pending.partChain.then(finish, finish);
        else finish();
      }
    };
    worker.onerror = (ev) => {
      const detail = ev?.error?.stack || ev?.error?.message || ev?.message || "worker failed";
      const msg = `convert worker error: ${detail}`;
      log2.error(msg, ev);
      _Loader._dropConvertWorker(worker, msg);
    };
    worker.onmessageerror = (ev) => {
      log2.error("convert worker messageerror:", ev);
    };
    return worker;
  }
  // A faulted worker will not answer the next postMessage. Reject what it
  // still owes, terminate it, and let the following load spawn a new one.
  static _dropConvertWorker(worker, reason) {
    for (const [id, pending] of convertWorkerPending) {
      if (pending.worker !== worker) continue;
      convertWorkerPending.delete(id);
      pending.reject(new Error(reason));
    }
    if (convertWorker === worker) convertWorker = null;
    worker.terminate();
  }
  // Resolves to .ifcview bytes. `bytes` is transferred to the worker, so
  // callers that still need the IFC must keep their own copy.
  static async _convert(bytes, filename, hooks) {
    const result = await _Loader._convertDetailed(bytes, filename, hooks);
    return result.sidecarBytes;
  }
  // Time one IFC → .ifcview conversion without streaming it. Headless:
  // `await bonsai.tool.Loader.benchmark(file, { kernel: 'manifold' })`.
  // `input` is a File, a URL string, or IFC bytes. The caller's buffer is not transferred.
  static async benchmark(input, options = {}) {
    const { bytes, filename } = await _Loader._benchmarkInput(input, options);
    const wallStart = performance.now();
    const result = await _Loader._convertDetailed(bytes.slice(), filename, options);
    const wallMs = performance.now() - wallStart;
    const report = {
      filename,
      kernel: result.kernel,
      thread: result.thread,
      numThreads: result.numThreads,
      ifcBytes: bytes.byteLength,
      sidecarBytes: result.sidecarBytes?.byteLength ?? 0,
      meshCount: result.meshCount ?? 0,
      productCount: result.productCount ?? 0,
      timings: result.timings ?? null,
      wallMs
    };
    if (options.keepSidecar) report.sidecar = result.sidecarBytes;
    const phases = report.timings ? ` init ${report.timings.initMs.toFixed(0)}ms tessellate ${report.timings.tessellateMs.toFixed(0)}ms serialize ${report.timings.serializeMs.toFixed(0)}ms` : "";
    log2.log(
      `benchmark ${filename} ${report.kernel} ${report.thread} \xD7${report.numThreads ?? 1}: wall ${wallMs.toFixed(0)}ms${phases}, sidecar ${report.sidecarBytes} bytes`
    );
    return report;
  }
  static async _benchmarkInput(input, options) {
    if (typeof input === "string") {
      const res = await fetch(input);
      if (!res.ok) throw new Error(`fetch ${input} failed: ${res.status}`);
      return {
        bytes: new Uint8Array(await res.arrayBuffer()),
        filename: options.filename ?? input.split("/").pop() ?? "model.ifc"
      };
    }
    if (typeof File !== "undefined" && input instanceof File) {
      return {
        bytes: new Uint8Array(await input.arrayBuffer()),
        filename: input.name
      };
    }
    const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
    return { bytes, filename: options.filename ?? "model.ifc" };
  }
  static async _convertDetailed(bytes, filename, hooks) {
    const { kernel, thread: requested } = _Loader.convertOptions(hooks);
    const thread = resolveThread(requested);
    const numThreads = hooks?.numThreads;
    log2.log(`convert ${filename} kernel=${kernel} thread=${thread} (${bytes.byteLength} bytes)`);
    if (thread === "main") {
      const mainThread = await import(new URL("src/pipeline/main-thread.js", PACKAGE_ROOT).href);
      const urls = _Loader._dependencyUrls();
      mainThread.configureAssets({ zstdModule: urls.zstdModule, zstdWasm: urls.zstdWasm });
      const { convertBytes } = mainThread;
      const result = await convertBytes(bytes, filename, {
        kernel,
        numThreads,
        settings: hooks?.settings,
        exclude: hooks?.exclude,
        onProgress: hooks?.onConvertProgress,
        onPart: hooks?.onPart
      });
      return {
        sidecarBytes: result.sidecarBytes,
        meshCount: result.meshCount ?? 0,
        productCount: result.productCount ?? 0,
        timings: result.timings ?? null,
        numThreads: result.numThreads ?? numThreads,
        kernel,
        thread
      };
    }
    let usedKernel = kernel;
    let message;
    try {
      message = await _Loader._convertInWorker(kernel, bytes, filename, numThreads, hooks);
    } catch (err) {
      const fallback = "opencascade";
      if (!err.fatal || !err.bytes || kernel === fallback || hooks?.retryKernel === false) throw err;
      log2.warn(`kernel ${kernel} crashed on ${filename} (${err.message}); retrying with ${fallback}`);
      usedKernel = fallback;
      hooks?.onConvertRetry?.({ kernel: fallback, reason: err.message });
      message = await _Loader._convertInWorker(fallback, err.bytes, filename, numThreads, hooks);
    }
    return {
      sidecarBytes: message.sidecarBytes,
      meshCount: message.meshCount ?? 0,
      productCount: message.productCount ?? 0,
      timings: message.timings ?? null,
      numThreads: message.numThreads ?? numThreads,
      kernel: usedKernel,
      thread
    };
  }
  static _convertInWorker(kernel, bytes, filename, numThreads, hooks) {
    const worker = _Loader._getConvertWorker();
    const id = ++convertWorkerSeq;
    return new Promise((resolve, reject) => {
      convertWorkerPending.set(id, {
        worker,
        resolve,
        reject,
        onConvertProgress: hooks?.onConvertProgress,
        onPart: hooks?.onPart
      });
      const payload = {
        id,
        bytes,
        filename,
        kernel,
        numThreads,
        settings: hooks?.settings,
        exclude: hooks?.exclude,
        streamParts: typeof hooks?.onPart === "function"
      };
      worker.postMessage(payload, [bytes.buffer]);
    });
  }
};

// src/tool/Element.js
function safeGet(entity, name) {
  try {
    const value = entity.get(name);
    return value === void 0 ? null : value;
  } catch {
    return null;
  }
}
function getStringAttribute(entity, name) {
  const value = safeGet(entity, name);
  return typeof value === "string" && value.length ? value : null;
}
var Element = class _Element {
  // Primitive scalar formatted for a single table cell. Entity refs,
  // aggregates and IFC null become null — same as C++ `format_scalar`.
  static formatScalar(value) {
    if (value === null || value === void 0) return null;
    if (typeof value === "string") return value;
    if (typeof value === "boolean") return value ? "True" : "False";
    if (typeof value === "number") return String(value);
    if (typeof value === "bigint") return value.toString();
    return null;
  }
  // Direct EXPRESS attributes with primitive scalar values, in declaration
  // order. Entity refs, aggregates and IFC null are omitted.
  static getAttributes(entity) {
    if (!entity) return [];
    const info = entity.getInfo({ recursive: false, scalarOnly: true, includeIdentifier: false });
    const out = [];
    for (const [key, value] of Object.entries(info)) {
      if (key === "type") continue;
      const formatted = _Element.formatScalar(value);
      if (formatted !== null) out.push([key, formatted]);
    }
    return out;
  }
  // Display name for a relationship target: Name when present, else class.
  static displayName(entity) {
    if (!entity) return "";
    const name = getStringAttribute(entity, "Name");
    if (name) return name;
    return entity.isA();
  }
};

// src/tool/elementQuery.js
function isEntity(value) {
  return !!value && typeof value.isA === "function" && typeof value.get === "function";
}
function safeAttr(entity, name) {
  try {
    const value = entity.get(name);
    return value === void 0 ? void 0 : value;
  } catch {
    return void 0;
  }
}
function forwardAttr(entity, name) {
  try {
    if (typeof entity.getArgumentByName === "function") {
      const value2 = entity.getArgumentByName(name);
      return value2 === void 0 ? void 0 : value2;
    }
    const value = entity[name];
    return value === void 0 ? void 0 : value;
  } catch {
    return void 0;
  }
}
function inverseAttr(entity, name) {
  try {
    if (typeof entity.inverse === "function") return entity.inverse(name);
    return entity[name];
  } catch {
    return void 0;
  }
}
var collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function schemaOf(entity) {
  try {
    const id = entity.file()?.schemaIdentifier?.() ?? "";
    return String(id).replace(/(_ADD|_TC)\d+.*$/, "");
  } catch {
    return "";
  }
}
function unwrap(value) {
  if (!isEntity(value)) return value;
  const wrapped = safeAttr(value, "wrappedValue");
  if (wrapped === void 0 || isEntity(wrapped)) return value;
  return wrapped;
}
function isPsetDefinition(definition) {
  return definition.isA("IfcPropertySet") || definition.isA("IfcPreDefinedPropertySet");
}
function isQtoDefinition(definition) {
  return definition.isA("IfcElementQuantity");
}
function getType(element) {
  if (element.isA("IfcTypeObject")) return element;
  if (!element.isA("IfcObject")) return null;
  if (schemaOf(element) !== "IFC2X3") {
    const isTypedBy = safeAttr(element, "IsTypedBy");
    if (Array.isArray(isTypedBy) && isTypedBy.length > 0) {
      const relatingType = safeAttr(isTypedBy[0], "RelatingType");
      return isEntity(relatingType) ? relatingType : null;
    }
    return null;
  }
  const isDefinedBy = safeAttr(element, "IsDefinedBy");
  if (!Array.isArray(isDefinedBy)) return null;
  for (const rel of isDefinedBy) {
    if (isEntity(rel) && rel.isA("IfcRelDefinesByType")) {
      const relatingType = safeAttr(rel, "RelatingType");
      if (isEntity(relatingType)) return relatingType;
    }
  }
  return null;
}
function getPredefinedType(element) {
  const elementType = getType(element);
  if (elementType) {
    let pt2 = safeAttr(elementType, "PredefinedType");
    if (!pt2 || pt2 === "USERDEFINED") {
      pt2 = safeAttr(elementType, "ElementType") ?? safeAttr(elementType, "ProcessType");
    }
    if (typeof pt2 === "string" && pt2 && pt2 !== "NOTDEFINED") return pt2;
  }
  let pt = safeAttr(element, "PredefinedType");
  if (!pt || pt === "USERDEFINED") pt = safeAttr(element, "ObjectType");
  return typeof pt === "string" && pt ? pt : null;
}
function propertyValue(property) {
  if (property.isA("IfcPropertySingleValue")) {
    const value = safeAttr(property, "NominalValue");
    return value === void 0 ? void 0 : unwrap(value);
  }
  if (property.isA("IfcPropertyEnumeratedValue")) {
    const values = safeAttr(property, "EnumerationValues");
    if (Array.isArray(values) && values.length === 1) return unwrap(values[0]);
  }
  if (property.isA("IfcPropertyListValue")) {
    const values = safeAttr(property, "ListValues");
    if (Array.isArray(values) && values.length === 1) return unwrap(values[0]);
  }
  return void 0;
}
var QUANTITY_ATTRS = ["LengthValue", "AreaValue", "VolumeValue", "CountValue", "WeightValue", "TimeValue"];
function quantityValue(quantity) {
  if (!quantity.isA("IfcPhysicalSimpleQuantity")) return void 0;
  for (const name of QUANTITY_ATTRS) {
    const value = safeAttr(quantity, name);
    if (value !== void 0 && value !== null) return unwrap(value);
  }
  return void 0;
}
function getPropertyDefinition(definition) {
  if (!definition) return null;
  const out = {};
  if (definition.isA("IfcPropertySet")) {
    for (const property of safeAttr(definition, "HasProperties") ?? []) {
      const name = safeAttr(property, "Name");
      if (typeof name !== "string" || !name) continue;
      const value = propertyValue(property);
      if (value !== void 0) out[name] = value;
    }
    return out;
  }
  if (definition.isA("IfcElementQuantity")) {
    for (const quantity of safeAttr(definition, "Quantities") ?? []) {
      const name = safeAttr(quantity, "Name");
      if (typeof name !== "string" || !name) continue;
      const value = quantityValue(quantity);
      if (value !== void 0) out[name] = value;
    }
    return out;
  }
  return null;
}
function mergeDefinition(result, definition, psetsOnly, qtosOnly) {
  if (!isEntity(definition)) return;
  if (psetsOnly && !isPsetDefinition(definition)) return;
  if (qtosOnly && !isQtoDefinition(definition)) return;
  const name = safeAttr(definition, "Name");
  if (typeof name !== "string" || !name) return;
  const values = getPropertyDefinition(definition);
  if (!values) return;
  const existing = result[name] ?? (result[name] = {});
  Object.assign(existing, values);
}
function getPsets(element, options = {}) {
  const psetsOnly = options.psetsOnly ?? false;
  const qtosOnly = options.qtosOnly ?? false;
  const shouldInherit = options.shouldInherit ?? true;
  const result = {};
  if (element.isA("IfcTypeObject")) {
    for (const def of safeAttr(element, "HasPropertySets") ?? []) {
      mergeDefinition(result, def, psetsOnly, qtosOnly);
    }
    return result;
  }
  if (!element.isA("IfcObject")) return result;
  if (shouldInherit) {
    const typeObject = getType(element);
    if (typeObject) {
      const inherited = getPsets(typeObject, { psetsOnly, qtosOnly, shouldInherit: false });
      for (const [setName, props] of Object.entries(inherited)) {
        result[setName] = { ...props };
      }
    }
  }
  const isDefinedBy = safeAttr(element, "IsDefinedBy");
  if (Array.isArray(isDefinedBy)) {
    for (const rel of isDefinedBy) {
      if (!isEntity(rel) || !rel.isA("IfcRelDefinesByProperties")) continue;
      mergeDefinition(result, safeAttr(rel, "RelatingPropertyDefinition"), psetsOnly, qtosOnly);
    }
  }
  return result;
}
function getAggregate(element) {
  const decomposes = safeAttr(element, "Decomposes");
  if (Array.isArray(decomposes)) {
    for (const rel of decomposes) {
      if (isEntity(rel) && rel.isA("IfcRelAggregates")) {
        const parent = safeAttr(rel, "RelatingObject");
        if (isEntity(parent)) return parent;
      }
    }
  }
  return null;
}
function getParent(element) {
  const aggregate = getAggregate(element);
  if (aggregate) return aggregate;
  const nests = safeAttr(element, "Nests");
  if (Array.isArray(nests) && nests.length > 0) {
    const rel = nests[0];
    const parent = safeAttr(rel, "RelatingObject");
    if (isEntity(parent)) return parent;
  }
  return null;
}
var RELATION_LABELS = {
  IsDecomposedBy: "Aggregates",
  Decomposes: "Decomposes",
  ContainsElements: "Contains",
  ContainedInStructure: "Container",
  IsTypedBy: "Type",
  Types: "Types",
  IsNestedBy: "Nests",
  Nests: "Nests",
  Declares: "Declares",
  IsDeclaredBy: "Declared by",
  HasAssociations: "Associates",
  HasAssignments: "Assigned to",
  HasOpenings: "Voids",
  HasFillings: "Fills",
  FillsVoids: "Fills",
  VoidsElements: "Voids",
  ConnectedTo: "Connected to",
  ConnectedFrom: "Connected from"
};
var RELATION_INVERSES = Object.keys(RELATION_LABELS);
function relationLabel(name) {
  if (RELATION_LABELS[name]) return RELATION_LABELS[name];
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function inverseNames(element) {
  try {
    const names = element.inverseAttributes?.();
    if (Array.isArray(names) && names.length) return names;
  } catch {
  }
  return RELATION_INVERSES;
}
function attributeNames(entity) {
  try {
    const names = entity.attributes?.();
    if (Array.isArray(names) && names.length) return names;
  } catch {
  }
  return [];
}
function relationshipTargets(rel, element) {
  const id = element.id();
  const targets = [];
  for (const name of attributeNames(rel)) {
    if (name === "OwnerHistory") continue;
    for (const target of entities(safeAttr(rel, name))) {
      if (target.id() === id) continue;
      if (target.isA("IfcOwnerHistory") || target.isA("IfcRelationship")) continue;
      targets.push(target);
    }
  }
  return targets;
}
function relationshipDisplayName(entity) {
  const name = safeAttr(entity, "Name");
  if (typeof name === "string" && name.trim()) return name.trim();
  try {
    return entity.isA();
  } catch {
    return "Unnamed";
  }
}
function getRelationships(element) {
  const rows = [];
  const seen = /* @__PURE__ */ new Set();
  for (const name of inverseNames(element)) {
    if (name === "IsDefinedBy") continue;
    for (const rel of entities(safeAttr(element, name))) {
      if (!rel.isA("IfcRelationship")) continue;
      if (rel.isA("IfcRelDefinesByProperties")) continue;
      for (const target of relationshipTargets(rel, element)) {
        const key = `${name}:${target.id()}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({ key: relationLabel(name), value: relationshipDisplayName(target) });
      }
    }
  }
  return rows;
}
function getContainer(element, options = {}) {
  const shouldGetDirect = options.shouldGetDirect ?? false;
  const ifcClass = options.ifcClass;
  const contained = safeAttr(element, "ContainedInStructure");
  if (Array.isArray(contained) && contained.length > 0) {
    const rel = contained[0];
    const relating = safeAttr(rel, "RelatingStructure");
    if (!isEntity(relating)) return null;
    if (shouldGetDirect) {
      if (!ifcClass || relating.isA(ifcClass)) return relating;
      return null;
    }
    if (!ifcClass) return relating;
    let container = relating;
    while (container) {
      if (container.isA(ifcClass)) return container;
      container = getAggregate(container);
    }
    return null;
  }
  if (shouldGetDirect) return null;
  const parent = getParent(element);
  if (parent) return getContainer(parent, { ifcClass });
  return null;
}
function entities(value) {
  if (isEntity(value)) return [value];
  return Array.isArray(value) ? value.filter(isEntity) : [];
}
function isSpatialElement(entity) {
  return entity.isA(schemaOf(entity) === "IFC2X3" ? "IfcSpatialStructureElement" : "IfcSpatialElement");
}
function getParts(element) {
  const isIfc2x3 = schemaOf(element) === "IFC2X3";
  const parts = [];
  for (const rel of entities(inverseAttr(element, "IsDecomposedBy"))) {
    if (!isIfc2x3 || rel.isA("IfcRelAggregates")) parts.push(...entities(forwardAttr(rel, "RelatedObjects")));
  }
  return parts;
}
var DECOMPOSITION_RELATIONSHIPS = [
  ["ContainsElements", "RelatedElements"],
  ["IsDecomposedBy", "RelatedObjects"],
  ["HasOpenings", "RelatedOpeningElement"],
  ["HasFillings", "RelatedBuildingElement"],
  ["IsNestedBy", "RelatedObjects"],
  ["HasSurfaceFeatures", "RelatedSurfaceFeatures"]
];
function getDecomposition(element, options = {}) {
  const isRecursive = options.isRecursive ?? true;
  const results = /* @__PURE__ */ new Map();
  const queue = [element];
  while (queue.length > 0) {
    const current = queue.pop();
    for (const [inverse, attribute] of DECOMPOSITION_RELATIONSHIPS) {
      for (const rel of entities(inverseAttr(current, inverse))) {
        for (const related of entities(forwardAttr(rel, attribute))) {
          if (results.has(related.id())) continue;
          results.set(related.id(), related);
          queue.push(related);
        }
      }
    }
    if (!isRecursive) break;
  }
  return [...results.values()];
}
function coordinates(entity, attribute, fallback) {
  const point = safeAttr(entity, attribute);
  const values = isEntity(point) ? safeAttr(point, "Coordinates") ?? safeAttr(point, "DirectionRatios") : null;
  return Array.isArray(values) ? [0, 1, 2].map((i) => values[i] ?? 0) : fallback;
}
function normalize(v) {
  const length = Math.hypot(...v) || 1;
  return v.map((c) => c / length);
}
function axisPlacementMatrix(placement) {
  const o = coordinates(placement, "Location", [0, 0, 0]);
  const z = normalize(coordinates(placement, "Axis", [0, 0, 1]));
  const ref = coordinates(placement, "RefDirection", [1, 0, 0]);
  const dot2 = ref[0] * z[0] + ref[1] * z[1] + ref[2] * z[2];
  const x = normalize(ref.map((c, i) => c - dot2 * z[i]));
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return [0, 1, 2].map((i) => [x[i], y[i], z[i], o[i]]);
}
function multiply(a, b) {
  return a.map((row) => [0, 1, 2, 3].map(
    (j) => row[0] * b[0][j] + row[1] * b[1][j] + row[2] * b[2][j] + (j === 3 ? row[3] : 0)
  ));
}
function getPlacement(objectPlacement) {
  if (!isEntity(objectPlacement) || !objectPlacement.isA("IfcLocalPlacement")) return null;
  const local = axisPlacementMatrix(safeAttr(objectPlacement, "RelativePlacement"));
  const relativeTo = safeAttr(objectPlacement, "PlacementRelTo");
  if (!isEntity(relativeTo)) return local;
  const parent = getPlacement(relativeTo);
  return parent ? multiply(parent, local) : null;
}
function getStoreyElevation(element) {
  const placement = getPlacement(safeAttr(element, "ObjectPlacement"));
  if (placement) return placement[2][3];
  const elevation = safeAttr(element, "Elevation");
  return typeof elevation === "number" ? elevation : 0;
}
function nameOf(entity) {
  const name = forwardAttr(entity, "Name");
  return typeof name === "string" && name.trim() ? name.trim() : "Unnamed";
}
function naturalCompare(a, b) {
  return collator.compare(a, b);
}
function treeNode(entity, isContainer, children) {
  const guid = forwardAttr(entity, "GlobalId");
  return {
    id: entity.id(),
    type: entity.isA(),
    name: nameOf(entity),
    guid: typeof guid === "string" ? guid : "",
    isContainer,
    children
  };
}
function elementNodes(elements) {
  return elements.map((element) => ({ element, key: `${element.isA()}/${nameOf(element)}` })).sort((a, b) => naturalCompare(a.key, b.key)).map(({ element }) => treeNode(element, false, elementNodes(
    getDecomposition(element, { isRecursive: false }).filter((child) => !child.isA("IfcFeatureElement"))
  )));
}
function containerNode(container) {
  const containers = getParts(container).filter(isSpatialElement).map((part) => ({ part, elevation: getStoreyElevation(part), name: nameOf(part) })).sort((a, b) => a.elevation - b.elevation || naturalCompare(a.name, b.name)).map(({ part }) => containerNode(part));
  const node = treeNode(container, true, containers);
  node._lazySource = container;
  return node;
}
function ensureElementChildren(node) {
  if (!node?._lazySource) return node?.children ?? [];
  const source = node._lazySource;
  node._lazySource = null;
  const elements = elementNodes(
    getDecomposition(source, { isRecursive: false }).filter((child) => !isSpatialElement(child))
  );
  node.children = [...node.children ?? [], ...elements];
  return node.children;
}
function getSpatialDecomposition(file) {
  const [project] = file?.byType?.("IfcProject") ?? [];
  return project ? [containerNode(project)] : [];
}

// src/tool/Pset.js
function formatValues(values) {
  const out = {};
  for (const [key, raw] of Object.entries(values)) {
    const formatted = Element.formatScalar(raw);
    if (formatted !== null) out[key] = formatted;
  }
  return out;
}
var Pset = class {
  // Walk psets/qsets on an entity, with occurrence values overriding type-
  // inherited ones. Options: { psetsOnly, qtosOnly, shouldInherit }.
  // Python: `util.element.get_psets`.
  static getPsets(entity, { psetsOnly = false, qtosOnly = false, shouldInherit = true } = {}) {
    if (!entity) return {};
    const raw = getPsets(entity, { psetsOnly, qtosOnly, shouldInherit });
    const result = {};
    for (const [name, values] of Object.entries(raw)) {
      result[name] = formatValues(values);
    }
    return result;
  }
};

// src/tool/Terminal.js
function newGuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `term-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
var sessions = /* @__PURE__ */ new Map();
var nextIndex = 1;
var Terminal = class {
  static create(name) {
    const session = {
      guid: newGuid(),
      name: name || `Terminal ${nextIndex++}`,
      history: [],
      commandHistory: []
    };
    sessions.set(session.guid, session);
    return session;
  }
  static list() {
    return [...sessions.values()];
  }
  static get(guid) {
    return sessions.get(guid) ?? null;
  }
  static append(guid, command2, output, success) {
    const session = sessions.get(guid);
    if (!session) return;
    session.history.push({ command: command2, output, success });
    if (command2.trim()) session.commandHistory.push(command2);
  }
  static clear(guid) {
    const session = sessions.get(guid);
    if (!session) return;
    session.history = [];
  }
  static detach(guid) {
    const keys = [...sessions.keys()];
    const index = keys.indexOf(guid);
    const session = sessions.get(guid);
    if (!session || index < 0) return null;
    sessions.delete(guid);
    return { session, index };
  }
  static attach(session, index) {
    if (index == null || index >= sessions.size) {
      sessions.set(session.guid, session);
      return session;
    }
    const entries = [...sessions.entries()];
    entries.splice(index, 0, [session.guid, session]);
    sessions.clear();
    for (const [guid, item] of entries) sessions.set(guid, item);
    return session;
  }
};

// src/tool/index.js
var tool_default = { Ifc, Loader, Element, Pset, Terminal };

// src/modules/code.scripting/core.js
var AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
function scriptScope(context) {
  return {
    context,
    tool: tool_default,
    ops: {
      execute: (name, ...args) => ops_default.execute(name, context, ...args),
      undo: () => ops_default.undo()?.constructor.operatorName ?? null,
      redo: () => ops_default.redo()?.constructor.operatorName ?? null,
      list: () => [...ops_default.registry.keys()].sort()
    }
  };
}
function describeIfcFile(value) {
  if (!value || typeof value.schema !== "function" || typeof value.byGuid !== "function") return null;
  try {
    const schema = typeof value.schemaIdentifier === "function" ? value.schemaIdentifier() : value.schema();
    return `IfcFile ${schema}`;
  } catch {
    return "IfcFile";
  }
}
function isIfcEntity(value) {
  return !!value && typeof value === "object" && typeof value.isA === "function" && typeof value.id === "function" && typeof value.get === "function";
}
function entityLabel(entity) {
  try {
    return `#${entity.id()}=${entity.isA()}`;
  } catch {
    return "IfcEntity";
  }
}
function entitySnapshot(entity) {
  const info = {};
  try {
    info.id = entity.id();
    info.type = entity.isA();
  } catch {
    return "IfcEntity";
  }
  let names = [];
  try {
    names = entity.attributes?.() ?? [];
  } catch {
    return info;
  }
  for (const name of names) {
    try {
      info[name] = previewValue(entity.get(name));
    } catch {
      info[name] = null;
    }
  }
  return info;
}
function previewValue(value) {
  if (isIfcEntity(value)) return entityLabel(value);
  if (Array.isArray(value)) return value.map(previewValue);
  if (typeof value === "bigint") return value.toString();
  return value;
}
function describeIfcValue(value) {
  const fileLabel = describeIfcFile(value);
  if (fileLabel) return fileLabel;
  if (typeof value === "bigint") return value.toString();
  if (isIfcEntity(value)) return entitySnapshot(value);
  return value;
}
async function runUserCode(context, code, { asExpression = false } = {}) {
  const bonsai = scriptScope(context);
  const body = asExpression ? `return (${code})` : code;
  try {
    const fn = new AsyncFunction("bonsai", body);
    const value = await fn(bonsai);
    return { success: true, value };
  } catch (err) {
    return { success: false, error: err.message, value: void 0 };
  }
}
function formatRunOutput(result) {
  if (!result.success) return result.error ?? "Error";
  if (result.value === void 0) return "";
  const fileLabel = describeIfcFile(result.value);
  if (fileLabel) return fileLabel;
  try {
    return JSON.stringify(result.value, (_key, value) => describeIfcValue(value), 2);
  } catch {
    return String(result.value);
  }
}

// src/modules/code.terminal/operators.js
var CodeShowTerminal = class extends Operator {
  static operatorName = "code.show_terminal";
  static operatorLabel = "Show Terminal";
  constructor(context) {
    super(context);
  }
  poll() {
    return Boolean(this.context.terminal?.terminalPanel);
  }
  execute() {
    this.context.terminal.terminalPanel.toggle();
    return { status: "FINISHED" };
  }
};
var TerminalNew = class extends Operator {
  static operatorName = "terminal.new";
  static operatorLabel = "New Terminal";
  static undoable = true;
  constructor(context, name) {
    super(context);
    this.name = name;
  }
  poll() {
    return Boolean(this.context.terminal);
  }
  execute() {
    if (this.session) Terminal.attach(this.session, this.index);
    else this.session = Terminal.create(this.name);
    this.context.terminal?.onTerminalCreated?.(this.session.guid);
    return { status: "FINISHED", result: this.session };
  }
  undo() {
    const detached = Terminal.detach(this.session?.guid);
    if (!detached) return;
    this.session = detached.session;
    this.index = detached.index;
    this.context.terminal?.onTerminalClosed?.(this.session.guid);
  }
};
var TerminalExecute = class extends Operator {
  static operatorName = "code.terminal.execute";
  static operatorLabel = "Execute Terminal Command";
  constructor(context, command2, terminalGuid) {
    super(context);
    this.command = command2;
    this.terminalGuid = terminalGuid;
  }
  poll() {
    return Boolean(this.context.terminal && this.command);
  }
  async execute() {
    const guid = this.terminalGuid || this.context.terminal?.activeTerminalGuid;
    if (!Terminal.get(guid)) throw new Error(`No terminal found: ${guid}`);
    const trimmed = String(this.command ?? "").trim();
    if (!trimmed) return { status: "CANCELLED", result: { success: false, output: "" } };
    const result = await runUserCode(this.context, trimmed, { asExpression: true });
    const output = formatRunOutput(result);
    Terminal.append(guid, trimmed, output, result.success);
    this.context.terminal?.onCommandResult?.({
      terminalGuid: guid,
      command: trimmed,
      output,
      success: result.success
    });
    return {
      status: result.success ? "FINISHED" : "ERROR",
      result: { success: result.success, output }
    };
  }
};
var TerminalClear = class extends Operator {
  static operatorName = "code.terminal.clear";
  static operatorLabel = "Clear Terminal";
  static undoable = true;
  constructor(context, terminalGuid) {
    super(context);
    this.terminalGuid = terminalGuid;
  }
  poll() {
    const guid = this.terminalGuid || this.context.terminal?.activeTerminalGuid;
    return Boolean(this.context.terminal && guid && Terminal.get(guid));
  }
  execute() {
    const guid = this.terminalGuid || this.context.terminal?.activeTerminalGuid;
    const session = Terminal.get(guid);
    if (!session) return { status: "CANCELLED" };
    this.terminalGuid = guid;
    if (!this.previousHistory) this.previousHistory = session.history.slice();
    Terminal.clear(guid);
    this.context.terminal?.onTerminalCleared?.(guid);
    return { status: "FINISHED" };
  }
  undo() {
    const session = Terminal.get(this.terminalGuid);
    if (!session || !this.previousHistory) return;
    session.history = this.previousHistory.slice();
    this.context.terminal?.onTerminalCleared?.(this.terminalGuid);
  }
};
var TerminalClose = class extends Operator {
  static operatorName = "code.terminal.close";
  static operatorLabel = "Close Terminal";
  static undoable = true;
  constructor(context, terminalGuid) {
    super(context);
    this.terminalGuid = terminalGuid;
  }
  poll() {
    const guid = this.terminalGuid || this.context.terminal?.activeTerminalGuid;
    return Boolean(this.context.terminal && guid && Terminal.get(guid));
  }
  execute() {
    const guid = this.terminalGuid || this.context.terminal?.activeTerminalGuid;
    const detached = Terminal.detach(guid);
    if (!detached) return { status: "CANCELLED" };
    this.terminalGuid = guid;
    this.session = detached.session;
    this.index = detached.index;
    this.context.terminal?.onTerminalClosed?.(guid);
    return { status: "FINISHED" };
  }
  undo() {
    if (!this.session) return;
    Terminal.attach(this.session, this.index);
    this.context.terminal?.onTerminalCreated?.(this.session.guid);
  }
};
var operators_default = [CodeShowTerminal, TerminalNew, TerminalExecute, TerminalClear, TerminalClose];

// src/modules/georeferencing/operators.js
var GeoreferencingToggle = class extends Operator {
  static operatorName = "georeferencing.toggle";
  static operatorLabel = "Toggle Survey Point";
  poll() {
    return Boolean(this.context.georeferencing?.panel);
  }
  execute() {
    this.context.georeferencing.panel.toggle();
    return { status: "FINISHED" };
  }
};
var operators_default2 = [GeoreferencingToggle];

// src/modules/profiling/operators.js
var ProfilerToggle = class extends Operator {
  static operatorName = "profiler.toggle";
  static operatorLabel = "Toggle Profiler";
  poll() {
    return Boolean(this.context.profiling?.profilerPanel);
  }
  execute() {
    this.context.profiling.profilerPanel.toggle();
    return { status: "FINISHED" };
  }
};
var operators_default3 = [ProfilerToggle];

// src/modules/project/operators.js
var SAMPLE_IFC_URL = new URL("../app/files/ifc/window_wall.ifc", import.meta.url).href;
var nextProjectIndex = 1;
function openModelFilePicker(onFile) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".ifc,.ifcview,.ifcfed,.zip,application/zip";
  input.style.display = "none";
  const cleanup = () => {
    window.removeEventListener("focus", onWindowFocus);
    input.remove();
  };
  const onWindowFocus = () => {
    setTimeout(() => {
      if (input.isConnected) cleanup();
    }, 300);
  };
  window.addEventListener("focus", onWindowFocus);
  input.addEventListener(
    "change",
    () => {
      const file = input.files?.[0] ?? null;
      cleanup();
      if (file) onFile(file);
    },
    { once: true }
  );
  input.addEventListener("cancel", cleanup, { once: true });
  document.body.appendChild(input);
  input.click();
}
function loadOptions(context, options) {
  return {
    ...options,
    onConvertProgress: (progress) => {
      context.signals.modelLoadStarted.dispatch({ source: "convert", ...progress });
    },
    onLiveIfc: (payload) => {
      context.signals.liveIfcReady.dispatch(payload);
      if (context.store.selection) {
        context.signals.objectPicked.dispatch(context.store.selection);
      }
    }
  };
}
var LoadIfc = class extends Operator {
  static operatorName = "load.ifc";
  static operatorLabel = "Load IFC";
  constructor(context, urlOrFile, options = {}) {
    super(context);
    this.file = typeof File !== "undefined" && urlOrFile instanceof File ? urlOrFile : null;
    this.url = this.file ? "" : urlOrFile ?? "";
    this.options = options;
  }
  poll() {
    return Boolean(Viewer.get() && (this.file || this.url));
  }
  // Async; callers that need completion listen to signals.modelLoaded.
  // Not undoable: the viewer cannot drop one model without clearing all.
  execute() {
    this.context.signals.modelLoadStarted.dispatch({
      source: this.file ? "file" : "url",
      name: this.file?.name || this.url
    });
    const options = loadOptions(this.context, this.options);
    const pending = this.file ? Loader.loadLocalFile(this.file, options) : Loader.loadIfcUrl(this.url, options);
    return pending.catch((err) => {
      console.error(err);
    });
  }
};
var LoadSampleIfc = class extends Operator {
  static operatorName = "load.sample.ifc";
  static operatorLabel = "Load Sample IFC";
  constructor(context, options = {}) {
    super(context);
    this.options = options;
  }
  poll() {
    return Boolean(Viewer.get());
  }
  async execute() {
    const url = SAMPLE_IFC_URL;
    this.context.signals.modelLoadStarted.dispatch({ source: "url", name: url });
    return Loader.loadIfcUrl(url, loadOptions(this.context, this.options));
  }
};
function nextEditSourceId(models) {
  let id = -1;
  const used = new Set(models.map((entry) => entry.sourceId));
  while (used.has(id)) id -= 1;
  return id;
}
function takeProjectName(models) {
  const used = /* @__PURE__ */ new Set();
  for (const entry of models) {
    if (entry.name) used.add(entry.name.toLowerCase());
    if (entry.viewName) used.add(entry.viewName.toLowerCase());
  }
  for (; ; ) {
    const index = nextProjectIndex++;
    const stem = index === 1 ? "Project" : `Project ${index}`;
    const filename = `${stem}.ifc`;
    if (used.has(filename.toLowerCase()) || used.has(`${stem.toLowerCase()}.ifcview`)) continue;
    return { stem, filename };
  }
}
var ProjectNew = class extends Operator {
  static operatorName = "project.new";
  static operatorLabel = "New Project";
  async execute() {
    const { stem, filename } = takeProjectName(this.context.store.models);
    try {
      const file = await Ifc.createBlank(stem);
      const sourceId = nextEditSourceId(this.context.store.models);
      Ifc.setEdit(sourceId, file, filename);
      this.context.signals.liveIfcReady.dispatch({ sourceId, name: filename, file });
      return { status: "FINISHED" };
    } catch (err) {
      console.error(err);
      return { status: "CANCELLED" };
    }
  }
};
var ProjectOpenFile = class extends Operator {
  static operatorName = "project.open_file";
  static operatorLabel = "Load IFC";
  // `options` overrides configuration.geometry for this load:
  // { kernel, thread, delivery }.
  constructor(context, options = {}) {
    super(context);
    this.options = options;
  }
  execute() {
    openModelFilePicker((file) => {
      ops_default.execute("load.ifc", this.context, file, this.options);
    });
    return { status: "FINISHED" };
  }
};
var ProjectOpenBag = class extends Operator {
  static operatorName = "project.open_bag";
  static operatorLabel = "Open Project";
  constructor(context, entries, label, options = {}) {
    super(context);
    this.entries = entries;
    this.label = label;
    this.options = options;
  }
  poll() {
    return Boolean(Viewer.get() && this.entries?.length);
  }
  execute() {
    this.context.signals.modelLoadStarted.dispatch({
      source: "project",
      name: this.label || "project.ifcfed"
    });
    return Loader.openProjectBag(this.entries, loadOptions(this.context, this.options), this.label).catch((err) => {
      console.error(err);
      return { status: "CANCELLED" };
    });
  }
};
var ProjectDownload = class extends Operator {
  static operatorName = "project.download";
  static operatorLabel = "Download Project";
  poll() {
    return Boolean(Viewer.get());
  }
  async execute() {
    const encoder2 = new TextEncoder();
    for (const entry of this.context.store.models) {
      Federation.ensureLocal(entry.sourceId, entry.name || entry.viewName || "model.ifc");
    }
    const payload = /* @__PURE__ */ new Map();
    for (const entry of this.context.store.models) {
      const model = Federation.modelForSource(entry.sourceId);
      if (!model) continue;
      const bundle = Loader.bundle(entry.sourceId);
      let ifc = bundle?.ifc?.data ? { name: bundle.ifc.name, data: bundle.ifc.data } : null;
      if (!ifc) {
        const file = Ifc.file(entry.sourceId);
        if (file?.toString) {
          const data2 = encoder2.encode(file.toString());
          ifc = { name: Ifc.get(entry.sourceId)?.name || entry.name || "model.ifc", data: data2 };
        }
      }
      let view = null;
      const viewFile = bundle?.view?.file;
      if (viewFile) {
        view = {
          name: bundle.view.name,
          data: new Uint8Array(await viewFile.arrayBuffer())
        };
      }
      payload.set(model.id, { ifc, view });
    }
    Federation.captureViewer(viewer);
    const archive = Federation.archiveFiles(payload);
    if (archive.warnings.length) console.warn(archive.warnings.join("\n"));
    const data = writeStoredZip(archive.files);
    await Loader.saveFile(new File([data], archive.filename));
    return { status: "FINISHED", warnings: archive.warnings };
  }
};
var ProjectClear = class extends Operator {
  static operatorName = "project.clear";
  static operatorLabel = "Clear Models";
  // Not undoable. Every recorded command refers to objects in the scene
  // being dropped, so the undo stack goes with them.
  execute() {
    Loader.clear();
    ops_default.clear();
    this.context.signals.modelCleared.dispatch();
    return { status: "FINISHED" };
  }
};
var ProjectDownloadView = class extends Operator {
  static operatorName = "project.download_view";
  static operatorLabel = "Download View";
  constructor(context, sourceId) {
    super(context);
    this.sourceId = sourceId;
  }
  poll() {
    const bundle = Loader.bundle(this.sourceId);
    return Boolean(bundle?.ifc || bundle?.view || Ifc.file(this.sourceId));
  }
  execute() {
    const dialog = this.context.viewCacheDialog;
    if (!dialog) return { status: "CANCELLED" };
    dialog.toggle(this.sourceId);
    return { status: "FINISHED" };
  }
};
var ProjectModels = class extends Operator {
  static operatorName = "project.models";
  static operatorLabel = "List Models";
  async execute() {
    let hidden = /* @__PURE__ */ new Set();
    let objects = [];
    try {
      objects = await viewer.getObjects();
      hidden = new Set(viewer.getHidden());
    } catch {
    }
    const bySource = /* @__PURE__ */ new Map();
    for (const object of objects) {
      if (object.objectId <= 0 || object.sourceId == null) continue;
      const ids = bySource.get(object.sourceId) ?? [];
      ids.push(object.objectId);
      bySource.set(object.sourceId, ids);
    }
    const rows = [];
    for (const [sourceId, objectIds] of bySource) {
      rows.push({
        sourceId,
        objectIds,
        checked: objectIds.some((id) => !hidden.has(id))
      });
    }
    return { status: "FINISHED", result: rows };
  }
};
var ProjectModelLoaded = class extends Operator {
  static operatorName = "project.model_loaded";
  static operatorLabel = "Model Loaded";
  constructor(context, detail) {
    super(context);
    this.detail = detail;
  }
  async execute() {
    const sourceId = typeof this.detail === "number" ? this.detail : this.detail?.sourceId;
    const sessionModelId = typeof this.detail === "object" ? this.detail?.sessionModelId : void 0;
    this.context.signals.modelLoaded.dispatch({ sourceId, sessionModelId });
    Federation.modelArrived(viewer);
    const model = Federation.modelForSource(sourceId);
    if (model && !Federation.isEffectivelyVisible(model)) {
      try {
        const objects = await viewer.getObjects();
        const ids = objects.filter((object) => object.sourceId === sourceId && object.objectId > 0).map((object) => object.objectId);
        if (ids.length) {
          viewer.hide(ids);
          this.context.signals.visibilityChanged.dispatch({ action: "hide", target: ids });
        }
      } catch {
      }
    }
    return { status: "FINISHED" };
  }
};
var ProjectBenchmark = class extends Operator {
  static operatorName = "project.benchmark";
  static operatorLabel = "Benchmark IFC";
  // `input` is a File, a URL, or IFC bytes. `options` is { kernel, thread,
  // numThreads, settings, filename, keepSidecar }.
  constructor(context, input, options = {}) {
    super(context);
    this.input = input;
    this.options = options;
  }
  poll() {
    return this.input != null;
  }
  execute() {
    return Loader.benchmark(this.input, this.options).then((report) => ({
      status: "FINISHED",
      report
    }));
  }
};
var operators_default4 = [ProjectOpenFile, ProjectOpenBag, ProjectDownload, ProjectNew, ProjectClear, ProjectDownloadView, ProjectModels, ProjectModelLoaded, LoadIfc, LoadSampleIfc, ProjectBenchmark];

// src/modules/properties/operators.js
function rowsFromSet(sets) {
  const result = [];
  for (const [title, properties] of Object.entries(sets)) {
    const rows = [];
    for (const [key, value] of Object.entries(properties)) {
      if (key === "id") continue;
      rows.push({ key, value });
    }
    if (rows.length) result.push({ title, rows });
  }
  return result;
}
function selectedElement(pick) {
  if (!pick?.objectId) return null;
  try {
    return viewer.getSelectedObjects().find((row) => row.objectId === pick.objectId) ?? null;
  } catch {
    return null;
  }
}
var PropertiesForPick = class extends Operator {
  static operatorName = "properties.for_pick";
  static operatorLabel = "Properties for Selection";
  constructor(context, pick) {
    super(context);
    this.pick = pick;
  }
  execute() {
    const state = {
      entity: { entity_class: "No item selected", predefined_type: "" },
      attributes: [],
      relationships: [],
      property_sets: [],
      quantity_sets: []
    };
    if (!this.pick?.objectId && !this.pick?.guid) return { status: "FINISHED", result: state };
    const selection = Ifc.entity(this.pick);
    const row = this.pick?.objectId ? selectedElement(this.pick) : null;
    if (selection) {
      state.entity.entity_class = selection.isA();
      const predefinedType = getPredefinedType(selection);
      if (predefinedType) state.entity.predefined_type = predefinedType;
      for (const [name, value] of Element.getAttributes(selection)) {
        state.attributes.push({ key: name, value });
      }
      state.relationships = getRelationships(selection);
      const type = getType(selection);
      if (type && !state.relationships.some((row2) => row2.key === "Type")) {
        state.relationships.push({ key: "Type", value: Element.displayName(type) });
      }
      const container = getContainer(selection);
      const containerName = container ? Element.displayName(container) : "";
      if (containerName && !state.relationships.some((row2) => row2.key === "Container" && row2.value === containerName)) {
        state.relationships.push({ key: "Container", value: containerName });
      }
      state.property_sets = rowsFromSet(Pset.getPsets(selection, { psetsOnly: true }));
      state.quantity_sets = rowsFromSet(Pset.getPsets(selection, { qtosOnly: true }));
    } else {
      const ifcClass = row?.type || this.pick.type;
      const name = row?.name || this.pick.name;
      if (ifcClass) state.entity.entity_class = ifcClass;
      state.entity.predefined_type = "N/A";
      if (name) state.attributes.push({ key: "Name", value: name });
    }
    const guid = Ifc.globalId(this.pick) || row?.guid;
    if (guid && !state.attributes.some((row2) => row2.key === "GlobalId")) {
      state.attributes.unshift({ key: "GlobalId", value: guid });
    }
    return { status: "FINISHED", result: state };
  }
};
var operators_default5 = [PropertiesForPick];

// src/modules/settings/operators.js
var GEOMETRY_KEYS = ["kernel", "thread", "delivery"];
var SettingsToggle = class extends Operator {
  static operatorName = "settings.toggle";
  static operatorLabel = "Toggle Settings";
  poll() {
    return Boolean(this.context.settings?.panel);
  }
  execute() {
    this.context.settings.panel.toggle();
    return { status: "FINISHED" };
  }
};
var SettingsSetGeometry = class extends Operator {
  static operatorName = "settings.set_geometry";
  static operatorLabel = "Set Geometry";
  constructor(context, options = {}) {
    super(context);
    this.options = options;
  }
  execute() {
    const next = Loader.convertOptions();
    for (const key of GEOMETRY_KEYS) {
      if (this.options?.[key] != null) next[key] = this.options[key];
    }
    const applied = Loader.configure(next);
    if (this.context.geometry) Object.assign(this.context.geometry, applied);
    this.context.signals.geometryChanged.dispatch(applied);
    return { status: "FINISHED" };
  }
};
var operators_default6 = [SettingsToggle, SettingsSetGeometry];

// src/modules/spatial-hierarchy/operators.js
var SpatialSelect = class extends Operator {
  static operatorName = "spatial.select";
  static operatorLabel = "Select in Hierarchy";
  constructor(context, ids, mode) {
    super(context);
    this.ids = ids ?? [];
    this.mode = mode ?? "replace";
  }
  poll() {
    return this.ids.length > 0;
  }
  execute() {
    if (this.mode === "add") viewer.addToSelection(this.ids);
    else if (this.mode === "remove") viewer.removeFromSelection(this.ids);
    else viewer.setSelection(this.ids);
    return { status: "FINISHED" };
  }
};
var SpatialIsolate = class extends Operator {
  static operatorName = "spatial.isolate";
  static operatorLabel = "Isolate in Hierarchy";
  constructor(context, ids) {
    super(context);
    this.ids = ids ?? [];
  }
  poll() {
    return this.ids.length > 0;
  }
  execute() {
    viewer.setSelection(this.ids);
    viewer.isolateSelected();
    this.context.signals.visibilityChanged.dispatch({ action: "isolate", target: this.ids });
    return { status: "FINISHED" };
  }
};
var SpatialHidden = class extends Operator {
  static operatorName = "spatial.hidden";
  static operatorLabel = "Hidden Objects";
  poll() {
    return Boolean(Viewer.get());
  }
  execute() {
    let hidden = [];
    try {
      hidden = viewer.getHidden();
    } catch {
    }
    return { status: "FINISHED", result: new Set(hidden) };
  }
};
var SpatialObjects = class extends Operator {
  static operatorName = "spatial.objects";
  static operatorLabel = "Spatial Objects";
  poll() {
    return Boolean(Viewer.get());
  }
  async execute() {
    const objects = await viewer.getObjects().catch(() => []);
    return { status: "FINISHED", result: objects };
  }
};
var operators_default7 = [SpatialSelect, SpatialIsolate, SpatialObjects, SpatialHidden];

// src/tool/measure.js
var MODES = Object.freeze(["length", "area", "volume"]);
function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}
function scale(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}
function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function hypot3(a) {
  return Math.hypot(a[0], a[1], a[2]);
}
function normalize2(a) {
  const length = hypot3(a) || 1;
  return [a[0] / length, a[1] / length, a[2] / length];
}
function dist3(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
}
function triArea3(a, b, c) {
  const ba = sub(b, a);
  const ca = sub(c, a);
  const nx = ba[1] * ca[2] - ba[2] * ca[1];
  const ny = ba[2] * ca[0] - ba[0] * ca[2];
  const nz = ba[0] * ca[1] - ba[1] * ca[0];
  return 0.5 * Math.hypot(nx, ny, nz);
}
function jacobiEigen3(m00, m01, m02, m11, m12, m22) {
  const a = [
    [m00, m01, m02],
    [m01, m11, m12],
    [m02, m12, m22]
  ];
  const v = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let iter = 0; iter < 50; iter++) {
    let p = 0;
    let q = 1;
    let off = Math.abs(a[0][1]);
    if (Math.abs(a[0][2]) > off) {
      p = 0;
      q = 2;
      off = Math.abs(a[0][2]);
    }
    if (Math.abs(a[1][2]) > off) {
      p = 1;
      q = 2;
      off = Math.abs(a[1][2]);
    }
    if (off < 1e-12) break;
    const app = a[p][p];
    const aqq = a[q][q];
    const apq = a[p][q];
    const theta = (aqq - app) / (2 * apq);
    const t = theta >= 0 ? 1 / (theta + Math.sqrt(1 + theta * theta)) : 1 / (theta - Math.sqrt(1 + theta * theta));
    const c = 1 / Math.sqrt(1 + t * t);
    const s = t * c;
    a[p][p] = app - t * apq;
    a[q][q] = aqq + t * apq;
    a[p][q] = 0;
    a[q][p] = 0;
    for (let k = 0; k < 3; k++) {
      if (k === p || k === q) continue;
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = a[p][k] = c * akp - s * akq;
      a[k][q] = a[q][k] = s * akp + c * akq;
    }
    for (let k = 0; k < 3; k++) {
      const vkp = v[k][p];
      const vkq = v[k][q];
      v[k][p] = c * vkp - s * vkq;
      v[k][q] = s * vkp + c * vkq;
    }
  }
  return {
    values: [a[0][0], a[1][1], a[2][2]],
    vectors: v
  };
}
function polygonArea(points) {
  const n = points.length;
  if (n < 3) return { area: 0, method: "empty" };
  const centroid = [0, 0, 0];
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const p of points) {
    centroid[0] += p[0];
    centroid[1] += p[1];
    centroid[2] += p[2];
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], p[i]);
      max[i] = Math.max(max[i], p[i]);
    }
  }
  centroid[0] /= n;
  centroid[1] /= n;
  centroid[2] /= n;
  const diag = Math.hypot(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
  let c00 = 0, c01 = 0, c02 = 0, c11 = 0, c12 = 0, c22 = 0;
  for (const p of points) {
    const dx = p[0] - centroid[0];
    const dy = p[1] - centroid[1];
    const dz = p[2] - centroid[2];
    c00 += dx * dx;
    c01 += dx * dy;
    c02 += dx * dz;
    c11 += dy * dy;
    c12 += dy * dz;
    c22 += dz * dz;
  }
  const eigen = jacobiEigen3(c00, c01, c02, c11, c12, c22);
  let axis = 0;
  if (eigen.values[1] < eigen.values[axis]) axis = 1;
  if (eigen.values[2] < eigen.values[axis]) axis = 2;
  const normal = [eigen.vectors[0][axis], eigen.vectors[1][axis], eigen.vectors[2][axis]];
  let sq = 0;
  for (const p of points) {
    const d = (p[0] - centroid[0]) * normal[0] + (p[1] - centroid[1]) * normal[1] + (p[2] - centroid[2]) * normal[2];
    sq += d * d;
  }
  const rms = Math.sqrt(sq / n);
  const planar = diag > 0 && rms / diag < 1e-3;
  if (!planar) {
    let area = 0;
    for (let i = 1; i + 1 < n; i++) area += triArea3(points[0], points[i], points[i + 1]);
    return { area, method: "fan" };
  }
  let u = [normal[1] * 0 - normal[2] * 0, normal[2] * 1 - normal[0] * 0, normal[0] * 0 - normal[1] * 1];
  if (dot(u, u) < 1e-6) {
    u = [normal[1] * 0 - normal[2] * 1, normal[2] * 0 - normal[0] * 0, normal[0] * 1 - normal[1] * 0];
  }
  u = normalize2(u);
  const v = [
    normal[1] * u[2] - normal[2] * u[1],
    normal[2] * u[0] - normal[0] * u[2],
    normal[0] * u[1] - normal[1] * u[0]
  ];
  const uv = points.map((p) => {
    const d = sub(p, centroid);
    return [dot(d, u), dot(d, v)];
  });
  let shoelace = 0;
  for (let i = 0; i < n; i++) {
    const a = uv[i];
    const b = uv[(i + 1) % n];
    shoelace += a[0] * b[1] - b[0] * a[1];
  }
  return { area: 0.5 * Math.abs(shoelace), method: "planar" };
}
function angleAt(a, b, c) {
  const ba = sub(a, b);
  const bc = sub(c, b);
  const la = hypot3(ba);
  const lc = hypot3(bc);
  if (la === 0 || lc === 0) return 0;
  const cos = Math.min(1, Math.max(-1, dot(ba, bc) / (la * lc)));
  return Math.acos(cos) * 180 / Math.PI;
}
function metres(value, digits = 4) {
  return `${value.toFixed(digits)} m`;
}
function segment(a, b, label, color = "#f7fafc", dashed = false) {
  return { a: a.slice(), b: b.slice(), label, color, dashed };
}
function chain(points, close) {
  const segments = [];
  for (let i = 0; i + 1 < points.length; i++) {
    segments.push(segment(points[i], points[i + 1], `${dist3(points[i], points[i + 1]).toFixed(3)} m`));
  }
  if (close && points.length > 2) {
    const a = points[points.length - 1];
    const b = points[0];
    segments.push(segment(a, b, `${dist3(a, b).toFixed(3)} m`));
  }
  return segments;
}
function lengthReadout(points, normals) {
  const n = points.length;
  if (n === 0) return { lines: ["Length: click the first point"], segments: [] };
  if (n === 1) return { lines: ["1 point \u2014 click another"], segments: [] };
  if (n === 2) {
    const a = points[0];
    const b = points[1];
    const dx = Math.abs(b[0] - a[0]);
    const dy = Math.abs(b[1] - a[1]);
    const dz = Math.abs(b[2] - a[2]);
    const segments = [
      segment(a, b, `${dist3(a, b).toFixed(3)} m`)
    ];
    const kx = [b[0], a[1], a[2]];
    const ky = [b[0], b[1], a[2]];
    if (dx > 1e-6) segments.push(segment(a, kx, `\u0394X ${dx.toFixed(3)} m`, "#fc8181"));
    if (dy > 1e-6) segments.push(segment(kx, ky, `\u0394Y ${dy.toFixed(3)} m`, "#68d391"));
    if (dz > 1e-6) segments.push(segment(ky, b, `\u0394Z ${dz.toFixed(3)} m`, "#63b3ed"));
    const na = normals[0];
    const nb = normals[1];
    if (na && nb && Math.abs(dot(na, nb)) > 0.95) {
      const sign = dot(na, nb) >= 0 ? 1 : -1;
      const avg = normalize2([
        0.5 * (na[0] + sign * nb[0]),
        0.5 * (na[1] + sign * nb[1]),
        0.5 * (na[2] + sign * nb[2])
      ]);
      const perp = dot(sub(b, a), avg);
      const abs = Math.abs(perp);
      const redundant = Math.abs(abs - dx) < 1e-3 || Math.abs(abs - dy) < 1e-3 || Math.abs(abs - dz) < 1e-3;
      if (abs > 1e-6 && !redundant) {
        segments.push(segment(a, add(a, scale(avg, perp)), `perp ${abs.toFixed(3)} m`, "#f7fafc", true));
      }
    }
    return {
      lines: [
        `Length: ${metres(dist3(a, b))}`,
        `\u0394X: ${dx.toFixed(4)}  \u0394Y: ${dy.toFixed(4)}  \u0394Z: ${dz.toFixed(4)} m`
      ],
      segments
    };
  }
  if (n === 3) {
    const [a, b, c] = points;
    return {
      lines: [
        `Angle at point 2: ${angleAt(a, b, c).toFixed(2)}\xB0`,
        `Triangle area: ${triArea3(a, b, c).toFixed(4)} m\xB2`,
        `Perimeter: ${metres(dist3(a, b) + dist3(b, c) + dist3(c, a))}`
      ],
      segments: chain(points, false)
    };
  }
  const poly = polygonArea(points);
  let perimeter = 0;
  for (let i = 0; i < n; i++) perimeter += dist3(points[i], points[(i + 1) % n]);
  return {
    lines: [
      `Polygon (${n} points, ${poly.method})`,
      `Area: ${poly.area.toFixed(4)} m\xB2`,
      `Perimeter: ${metres(perimeter)}`
    ],
    segments: chain(points, true)
  };
}
function areaReadout(points, patches) {
  if (patches.length > 0) {
    const total = patches.reduce((sum, patch) => sum + patch.area, 0);
    return {
      lines: [`Area: ${total.toFixed(4)} m\xB2  (${patches.length} ${patches.length === 1 ? "patch" : "patches"})`],
      segments: []
    };
  }
  if (points.length < 3) {
    return {
      lines: [points.length === 0 ? "Area: click points around a region" : "Area: click a third point"],
      segments: chain(points, false)
    };
  }
  const poly = polygonArea(points);
  let perimeter = 0;
  for (let i = 0; i < points.length; i++) perimeter += dist3(points[i], points[(i + 1) % points.length]);
  return {
    lines: [
      `Area: ${poly.area.toFixed(4)} m\xB2`,
      `Perimeter: ${metres(perimeter)}`
    ],
    segments: chain(points, true)
  };
}
function volumeReadout(volumes) {
  const count = volumes?.count ?? 0;
  if (volumes?.source === "viewer" && Number.isFinite(volumes.total)) {
    return { lines: [`Volume: ${volumes.total.toFixed(4)} m\xB3  (${count} ${count === 1 ? "object" : "objects"})`] };
  }
  if (count === 0) return { lines: ["Volume: 0.0000 m\xB3  (0 objects)"] };
  return { lines: [`Volume: select objects with a viewer that exports mesh volume  (${count} selected)`] };
}
function cameraBasis(cam) {
  const eye = cam.eye;
  const target = cam.target;
  let fx = target[0] - eye[0];
  let fy = target[1] - eye[1];
  let fz = target[2] - eye[2];
  const fl = Math.hypot(fx, fy, fz) || 1;
  fx /= fl;
  fy /= fl;
  fz /= fl;
  const up = Math.abs(cam.pitch) >= 89 ? [0, 1, 0] : [0, 0, 1];
  let sx = fy * up[2] - fz * up[1];
  let sy = fz * up[0] - fx * up[2];
  let sz = fx * up[1] - fy * up[0];
  const sl = Math.hypot(sx, sy, sz) || 1;
  sx /= sl;
  sy /= sl;
  sz /= sl;
  return {
    eye,
    forward: [fx, fy, fz],
    right: [sx, sy, sz],
    up: [
      sy * fz - sz * fy,
      sz * fx - sx * fz,
      sx * fy - sy * fx
    ]
  };
}
function canvasSize(canvas) {
  const rect = canvas.getBoundingClientRect?.() ?? { width: canvas.clientWidth, height: canvas.clientHeight };
  return {
    width: rect.width || canvas.clientWidth || 1,
    height: rect.height || canvas.clientHeight || 1
  };
}
function cameraRay(cam, canvas, x, y) {
  if (!cam?.eye || !cam?.target || !canvas) return null;
  const basis = cameraBasis(cam);
  const { width, height } = canvasSize(canvas);
  const ndcX = x / width * 2 - 1;
  const ndcY = 1 - y / height * 2;
  const aspect = width / height;
  const t = Math.tan(45 * Math.PI / 360);
  if (cam.ortho) {
    const halfH = cam.distance * t;
    const halfW = halfH * aspect;
    const vx2 = ndcX * halfW;
    const vy2 = ndcY * halfH;
    return {
      origin: add(basis.eye, add(scale(basis.right, vx2), scale(basis.up, vy2))),
      dir: basis.forward.slice()
    };
  }
  const vx = ndcX * aspect * t;
  const vy = ndcY * t;
  return {
    origin: basis.eye.slice(),
    dir: normalize2(add(add(scale(basis.right, vx), scale(basis.up, vy)), basis.forward))
  };
}
function hitPlane(ray, point, normal) {
  const denom = dot(ray.dir, normal);
  if (Math.abs(denom) < 1e-8) return null;
  const t = dot(sub(point, ray.origin), normal) / denom;
  if (t < 0) return null;
  return add(ray.origin, scale(ray.dir, t));
}
function pickOnWorkPlane(api, x, y, anchor) {
  const canvas = api?.canvas;
  const cam = typeof api?.getCamera === "function" ? api.getCamera() : null;
  const ray = cameraRay(cam, canvas, x, y);
  if (!ray) return null;
  const through = anchor || cam.target;
  let point = hitPlane(ray, through, [0, 0, 1]);
  let normal = [0, 0, 1];
  if (!point) {
    normal = normalize2(sub(cam.target, cam.eye));
    point = hitPlane(ray, through, normal);
  }
  if (!point) return null;
  return { point, normal, placement: "plane" };
}
function pointOf(hit) {
  if (!hit) return null;
  const raw = hit.point || hit.world || hit.worldPos || hit.position;
  if (!raw || raw.length < 3) return null;
  return [Number(raw[0]), Number(raw[1]), Number(raw[2])];
}
async function resolvePick(api, click, points = []) {
  let hit = null;
  if (Array.isArray(click?.point)) {
    hit = {
      point: click.point.slice(0, 3).map(Number),
      normal: click.normal ? click.normal.slice(0, 3).map(Number) : null,
      area: Number.isFinite(click.area) ? click.area : void 0,
      placement: click.placement || "surface"
    };
  } else {
    const x = click?.x;
    const y = click?.y;
    for (const name of ["pickSurface", "pickWorld"]) {
      if (typeof api?.[name] !== "function") continue;
      const picked = await api[name](x, y, { alt: !!click?.alt });
      const point = pointOf(picked);
      if (!point || point.some((value) => Number.isNaN(value))) continue;
      const normal = picked.normal || picked.worldNormal || null;
      const area = Number.isFinite(picked.area) ? picked.area : picked.patchArea;
      hit = {
        point,
        normal: normal ? [normal[0], normal[1], normal[2]] : null,
        area: Number.isFinite(area) ? area : void 0,
        placement: "surface"
      };
      break;
    }
    hit ??= pickOnWorkPlane(api, x, y, points[points.length - 1]);
  }
  return hit;
}
function readVolumes(api, ids) {
  const list = ids ?? (typeof api?.getSelection === "function" ? api.getSelection() : []);
  const count = list?.length ?? 0;
  if (typeof api?.volumesPerObject === "function") {
    const rows = api.volumesPerObject(list) ?? [];
    let total = 0;
    for (const row of rows) total += Number(row.volume ?? row[1]) || 0;
    return { total, count, source: "viewer" };
  }
  if (typeof api?.volumeOf === "function") {
    return { total: Number(api.volumeOf(list)) || 0, count, source: "viewer" };
  }
  return { total: null, count, source: "none" };
}
function copyPoint(point) {
  return point ? [point[0], point[1], point[2]] : null;
}
var Measure = class {
  constructor() {
    this._mode = null;
    this._points = [];
    this._normals = [];
    this._patches = [];
    this._placement = null;
    this._volumes = null;
  }
  mode() {
    return this._mode;
  }
  setMode(mode) {
    const next = MODES.includes(mode) ? mode : null;
    if (next === this._mode) return this.snapshot();
    this._mode = next;
    this._points = [];
    this._normals = [];
    this._patches = [];
    this._placement = null;
    this._volumes = next === "volume" ? { total: null, count: 0, source: "none" } : null;
    return this.snapshot();
  }
  clear() {
    this._points = [];
    this._normals = [];
    this._patches = [];
    this._placement = null;
    return this.snapshot();
  }
  undo() {
    if (this._patches.length > 0) this._patches.pop();
    else {
      this._points.pop();
      this._normals.pop();
    }
    if (this._points.length === 0 && this._patches.length === 0) this._placement = null;
    return this.snapshot();
  }
  add(hit) {
    if (!hit?.point || this._mode !== "length" && this._mode !== "area") return this.snapshot();
    if (this._mode === "area" && Number.isFinite(hit.area)) {
      this._patches.push({ area: hit.area, point: copyPoint(hit.point) });
    } else {
      this._points.push(copyPoint(hit.point));
      this._normals.push(hit.normal ? copyPoint(hit.normal) : null);
    }
    if (hit.placement) this._placement = hit.placement;
    return this.snapshot();
  }
  syncVolume(api, ids) {
    if (this._mode !== "volume") return this.snapshot();
    this._volumes = readVolumes(api, ids);
    return this.snapshot();
  }
  snapshot() {
    const points = this._points.map((point) => point.slice());
    let readout = { lines: [], segments: [] };
    if (this._mode === "length") readout = lengthReadout(points, this._normals);
    else if (this._mode === "area") readout = areaReadout(points, this._patches);
    else if (this._mode === "volume") readout = { ...volumeReadout(this._volumes), segments: [] };
    const dots = this._patches.length > 0 ? this._patches.map((patch) => patch.point.slice()) : points;
    return {
      mode: this._mode,
      points,
      dots,
      placement: this._placement,
      lines: readout.lines,
      segments: readout.segments,
      volumes: this._volumes ? { ...this._volumes } : null
    };
  }
};
var measure = new Measure();
function projectPoint(api, xyz) {
  if (typeof api?.projectWorld === "function") {
    const projected = api.projectWorld(xyz);
    if (projected) return projected;
  }
  const cam = typeof api?.getCamera === "function" ? api.getCamera() : null;
  const canvas = api?.canvas;
  if (!cam || !canvas) return null;
  const basis = cameraBasis(cam);
  const { width, height } = canvasSize(canvas);
  const rel = sub(xyz, basis.eye);
  const vx = dot(basis.right, rel);
  const vy = dot(basis.up, rel);
  const vz = -dot(basis.forward, rel);
  const aspect = width / height;
  const t = Math.tan(45 * Math.PI / 360);
  let cx;
  let cy;
  let cw;
  if (cam.ortho) {
    const halfH = cam.distance * t;
    cx = vx / (halfH * aspect);
    cy = vy / halfH;
    cw = 1;
  } else {
    cx = vx / (aspect * t);
    cy = vy / t;
    cw = -vz;
  }
  if (cw <= 1e-4) return null;
  const ndcX = cx / cw;
  const ndcY = cy / cw;
  return {
    x: (ndcX * 0.5 + 0.5) * width,
    y: (1 - (ndcY * 0.5 + 0.5)) * height
  };
}

// src/modules/viewer/operators.js
var HideSelectionOperator = class extends Operator {
  static operatorName = "hide.selection";
  static operatorLabel = "Hide Selection";
  static undoable = true;
  constructor(context, ids) {
    super(context);
    this.ids = Array.isArray(ids) ? [...ids] : [];
  }
  execute() {
    if (this.ids.length === 0) {
      this.ids = [...viewer.getSelection()];
    }
    viewer.hide(this.ids);
    this.context.signals.visibilityChanged.dispatch({ action: "hide", target: this.ids });
  }
  undo() {
    viewer.show(this.ids);
    this.context.signals.visibilityChanged.dispatch({ action: "show", target: this.ids });
  }
};
var ShowSelectionOperator = class extends Operator {
  static operatorName = "show.selection";
  static operatorLabel = "Show Selection";
  static undoable = true;
  constructor(context, ids) {
    super(context);
    this.ids = Array.isArray(ids) ? [...ids] : [];
  }
  execute() {
    if (this.ids.length === 0) {
      this.ids = [...viewer.getSelection()];
    }
    if (this.ids.length === 0) {
      console.warn("ShowSelectionOperator: No ids provided");
      return { status: "CANCELLED" };
    }
    viewer.show(this.ids);
    this.context.signals.visibilityChanged.dispatch({ action: "show", target: this.ids });
  }
  undo() {
    viewer.hide(this.ids);
    this.context.signals.visibilityChanged.dispatch({ action: "hide", target: this.ids });
  }
};
var ShowAllOperator = class extends Operator {
  static operatorName = "show.all";
  static operatorLabel = "Show All";
  static undoable = true;
  constructor(context) {
    super(context);
    this.ids = [];
  }
  execute() {
    if (this.ids.length === 0) {
      this.ids = [...viewer.getHidden()];
    }
    viewer.showAll();
    this.context.signals.visibilityChanged.dispatch({ action: "showAll" });
  }
  undo() {
    viewer.hide(this.ids);
    this.context.signals.visibilityChanged.dispatch({ action: "hide", target: this.ids });
  }
};
var VIEWS = Object.freeze({
  FRONT: 0,
  BACK: 1,
  LEFT: 2,
  RIGHT: 3,
  TOP: 4,
  BOTTOM: 5
});
var NAV_PRESETS = Object.freeze(["blender", "rhino", "revit", "web"]);
function command(name, label, run, needsArgs = false) {
  class Command extends Operator {
    static operatorName = name;
    static operatorLabel = label;
    constructor(context, ...args) {
      super(context);
      this.args = args;
    }
    poll() {
      if (!Viewer.get()) return false;
      if (needsArgs && this.args.length === 0) return false;
      return true;
    }
    execute() {
      return run(this.context, ...this.args);
    }
  }
  return Command;
}
var ViewerHideAll = command("viewer.hide_all", "Hide All", (context) => {
  viewer.hideAll();
  context.signals.visibilityChanged.dispatch({ action: "hideAll" });
});
var ViewerIsolate = command("viewer.isolate", "Isolate Selection", (context) => {
  viewer.isolateSelected();
  context.signals.visibilityChanged.dispatch({ action: "isolate" });
});
function publishTools(context) {
  const state = publishViewerTools(viewer);
  context.signals.viewerToolsChanged.dispatch(state);
  context.signals.xrayToggled.dispatch({ active: state.xray });
  return state;
}
var MEASURE_MODES = Object.freeze(["length", "area", "volume"]);
function publishMeasure(context) {
  const state = measure.snapshot();
  context.signals.measureChanged.dispatch(state);
  return state;
}
var ViewerMeasure = command("viewer.measure", "Measure", (context, mode) => {
  if (!MEASURE_MODES.includes(mode)) return { status: "CANCELLED" };
  const next = measure.mode() === mode ? null : mode;
  measure.setMode(next);
  if (next === "volume") measure.syncVolume(viewer);
  return publishMeasure(context);
}, true);
var ViewerMeasureClick = command("viewer.measure_click", "Measure Click", async (context, click) => {
  const mode = measure.mode();
  if (mode !== "length" && mode !== "area") return { status: "CANCELLED" };
  const hit = await resolvePick(viewer, click, measure.snapshot().points);
  if (!hit?.point) return { status: "CANCELLED" };
  measure.add(hit);
  return publishMeasure(context);
}, true);
var ViewerMeasureUndo = command("viewer.measure_undo", "Undo Measure Point", (context) => {
  if (!measure.mode()) return { status: "CANCELLED" };
  measure.undo();
  return publishMeasure(context);
});
var ViewerMeasureClear = command("viewer.measure_clear", "Clear Measure", (context) => {
  if (!measure.mode()) return { status: "CANCELLED" };
  measure.clear();
  return publishMeasure(context);
});
var ViewerXray = command("viewer.xray", "Toggle X-ray", (context) => {
  viewer.toggleXray();
  return publishTools(context);
});
var ViewerSection = command("viewer.section", "Toggle Section", (context) => {
  toggleSection(viewer);
  return publishTools(context);
});
var ViewerClearSection = command("viewer.clear_section", "Clear Section Cuts", (context) => {
  clearSection(viewer);
  return publishTools(context);
});
var ViewerFly = command("viewer.fly", "Toggle Fly", (context) => {
  toggleFly(viewer);
  return publishTools(context);
});
var ViewerProjection = command("viewer.projection", "Toggle Orthographic", (context) => {
  toggleProjection(viewer);
  return publishTools(context);
});
function applyToggle(read, toggle, want) {
  if (typeof want === "boolean" && !!read() === want) return want;
  return toggle();
}
var ViewerGrid = command("viewer.grid", "Toggle Grid", (context, on) => {
  applyToggle(
    () => typeof viewer.gridVisible === "function" ? viewer.gridVisible() : false,
    () => toggleGrid(viewer),
    on
  );
  return publishTools(context);
});
var ViewerAxes = command("viewer.axes", "Toggle Axes", (context, on) => {
  applyToggle(
    () => typeof viewer.originAxesVisible === "function" ? viewer.originAxesVisible() : false,
    () => toggleAxes(viewer),
    on
  );
  return publishTools(context);
});
var ViewerFogToggle = command("viewer.fog_toggle", "Toggle Fog", (context, on) => {
  applyToggle(
    () => typeof viewer.fogVisible === "function" ? viewer.fogVisible() : false,
    () => toggleFog(viewer),
    on
  );
  const state = publishTools(context);
  context.signals.fogChanged.dispatch(viewer.fog?.() ?? { enabled: state.fog });
  return state;
});
var ViewerClearColors = command("viewer.clear_colors", "Clear Colors", (context) => {
  viewer.clearColors();
  context.signals.colorsChanged.dispatch({ action: "clear" });
});
var ViewerSelectionOutline = command("viewer.selection_outline", "Toggle Selection Outline", (context, on) => {
  applyToggle(
    () => viewer.selectionOutlineEnabled(),
    () => viewer.setSelectionOutline(!viewer.selectionOutlineEnabled()),
    on
  );
  return publishTools(context);
});
var ViewerClearSelection = command("viewer.clear_selection", "Clear Selection", (context) => {
  viewer.clearSelection();
  context.signals.selectionCleared.dispatch();
});
var ViewerViewAll = command("viewer.view_all", "View All", () => {
  viewer.viewAll();
});
var ViewerFrameSelection = command("viewer.frame_selection", "Frame Selection", () => {
  viewer.frameSelection();
});
var ViewerStandardView = command("viewer.standard_view", "Standard View", (context, view) => {
  const id = typeof view === "number" ? view : VIEWS[view];
  if (id == null) return { status: "CANCELLED" };
  viewer.setStandardView(id);
  context.signals.standardViewSet.dispatch({ id });
}, true);
var ViewerNavPreset = command("viewer.nav_preset", "Navigation Preset", (context, preset) => {
  if (!NAV_PRESETS.includes(preset)) return { status: "CANCELLED" };
  viewer.setNavPreset(preset);
  context.signals.navPresetChanged.dispatch({ preset });
}, true);
var ViewerSetSelection = command("viewer.set_selection", "Set Selection", (_context, ids) => {
  viewer.setSelection(ids);
}, true);
var ViewerSelectGlobalId = command("viewer.select_global_id", "Select GlobalId", async (context, guid) => {
  const id = String(guid ?? "").trim();
  if (!id) return { status: "CANCELLED" };
  try {
    await viewer.getObjects();
    viewer.show(id);
    viewer.setSelection(id);
    viewer.frameSelection();
    context.signals.visibilityChanged.dispatch({ action: "show", target: viewer.getSelection() });
  } catch (error) {
    const message = error?.message || "No element with that GlobalId";
    console.warn("Select GlobalId:", message);
    return { status: "CANCELLED", message };
  }
}, true);
var ViewerAddToSelection = command("viewer.add_to_selection", "Add To Selection", (_context, ids) => {
  viewer.addToSelection(ids);
}, true);
var ViewerRemoveFromSelection = command("viewer.remove_from_selection", "Remove From Selection", (_context, ids) => {
  viewer.removeFromSelection(ids);
}, true);
var ViewerSetVisible = command("viewer.set_visible", "Set Visible", (context, ids, on) => {
  viewer.setVisible(ids, on);
  context.signals.visibilityChanged.dispatch({ action: "setVisible", target: ids });
}, true);
var ViewerShow = command("viewer.show", "Show", (context, ids) => {
  viewer.show(ids);
  context.signals.visibilityChanged.dispatch({ action: "show", target: ids });
}, true);
var ViewerHide = command("viewer.hide", "Hide", (context, ids) => {
  viewer.hide(ids);
  context.signals.visibilityChanged.dispatch({ action: "hide", target: ids });
}, true);
var ViewerSetColor = command("viewer.set_color", "Set Color", (context, ids, color) => {
  viewer.setColor(ids, color);
  context.signals.colorsChanged.dispatch({ action: "set", target: ids, color });
}, true);
var ViewerSetBackground = command("viewer.set_background", "Set Background", (context, color) => {
  viewer.setBackground(color);
  context.signals.backgroundChanged.dispatch({ color });
}, true);
var ViewerSetFog = command("viewer.set_fog", "Set Fog", (context, options) => {
  const fog = viewer.setFog(options);
  context.signals.fogChanged.dispatch(fog);
  return fog;
}, true);
var ViewerSetCamera = command("viewer.set_camera", "Set Camera", (context, state) => {
  viewer.setCamera(state);
  context.signals.cameraChanged.dispatch(state);
}, true);
var ViewerSetFederationUnit = command("viewer.set_federation_unit", "Set Federation Unit", (_context, unit) => {
  viewer.setFederationUnit(unit);
  Federation.setUnit(unit);
}, true);
var ViewerSetFalseOrigin = command("viewer.set_false_origin", "Set False Origin", (_context, origin) => {
  viewer.setFalseOrigin(origin);
  Federation.setOrigin(origin);
}, true);
var ViewerSetModelTransform = command("viewer.set_model_transform", "Set Model Transform", (_context, sourceId, transform) => {
  viewer.setModelTransform(sourceId, transform);
  Federation.setTransform(sourceId, transform);
}, true);
var ViewerClearModelTransform = command("viewer.clear_model_transform", "Clear Model Transform", (_context, sourceId) => {
  viewer.clearModelTransform(sourceId);
  Federation.clearTransform(sourceId);
}, true);
var pickGeneration = 0;
var viewportPickSerial = 0;
var boxGeneration = 0;
function elementTableHas(objectId) {
  try {
    const row = viewer.getSelectedObjects().find((item) => item.objectId === objectId);
    return !!row && ("guid" in row || "name" in row || "type" in row);
  } catch {
    return false;
  }
}
async function publishBoxSelection(context, ids, serial, generation) {
  const stale = () => serial !== viewportPickSerial || generation !== boxGeneration;
  if (!ids?.length) {
    if (stale()) return;
    context.store.selection = null;
    context.signals.objectPicked.dispatch(null);
    return;
  }
  try {
    await viewer.getObjects();
  } catch {
  }
  if (stale()) return;
  const activeId = viewer.getActiveObject() || ids[0];
  const pick = viewer.getSelectedObjects().find((row) => row.objectId === activeId) ?? { objectId: activeId };
  context.store.selection = pick;
  context.signals.objectPicked.dispatch(pick);
}
var ViewerObjectPicked = class extends Operator {
  static operatorName = "viewer.object_picked";
  static operatorLabel = "Object Picked";
  constructor(context, pick) {
    super(context);
    this.pick = pick;
  }
  // The click payload is {objectId, guid, modelIndex, sourceId}. Name and
  // IFC class live on the v19 element table, and getSelectedObjects() only
  // has them after getObjects() — the same order as the scripting example.
  async execute() {
    viewportPickSerial++;
    const generation = ++pickGeneration;
    if (this.pick?.objectId && !elementTableHas(this.pick.objectId)) {
      try {
        await viewer.getObjects();
      } catch {
      }
    }
    if (generation !== pickGeneration) return { status: "FINISHED" };
    this.context.signals.objectPicked.dispatch(this.pick);
    return { status: "FINISHED" };
  }
};
var ViewerSelectionChanged = class extends Operator {
  static operatorName = "viewer.selection_changed";
  static operatorLabel = "Selection Changed";
  constructor(context, ids) {
    super(context);
    this.ids = ids;
  }
  execute() {
    const ids = this.ids ?? viewer.getSelection();
    this.context.signals.selectionChanged.dispatch({ ids });
    if (measure.mode() === "volume") {
      measure.syncVolume(viewer, ids);
      publishMeasure(this.context);
    }
    const serial = viewportPickSerial;
    const generation = ++boxGeneration;
    queueMicrotask(() => {
      if (serial !== viewportPickSerial) return;
      void publishBoxSelection(this.context, ids, serial, generation);
    });
    return { status: "FINISHED" };
  }
};
var operators_default8 = [
  HideSelectionOperator,
  ShowSelectionOperator,
  ShowAllOperator,
  ViewerHideAll,
  ViewerIsolate,
  ViewerXray,
  ViewerSection,
  ViewerClearSection,
  ViewerFly,
  ViewerProjection,
  ViewerGrid,
  ViewerAxes,
  ViewerFogToggle,
  ViewerClearColors,
  ViewerSelectionOutline,
  ViewerClearSelection,
  ViewerViewAll,
  ViewerFrameSelection,
  ViewerStandardView,
  ViewerNavPreset,
  ViewerSetSelection,
  ViewerSelectGlobalId,
  ViewerAddToSelection,
  ViewerRemoveFromSelection,
  ViewerSetVisible,
  ViewerShow,
  ViewerHide,
  ViewerSetColor,
  ViewerSetBackground,
  ViewerSetFog,
  ViewerSetCamera,
  ViewerSetFederationUnit,
  ViewerSetFalseOrigin,
  ViewerSetModelTransform,
  ViewerClearModelTransform,
  ViewerMeasure,
  ViewerMeasureClick,
  ViewerMeasureUndo,
  ViewerMeasureClear,
  ViewerObjectPicked,
  ViewerSelectionChanged
];

// src/modules/operators.js
var operatorModules = /* @__PURE__ */ new Map([
  ["project", operators_default4],
  ["settings", operators_default6],
  ["georeferencing", operators_default2],
  ["spatial-hierarchy", operators_default7],
  ["properties", operators_default5],
  ["viewer", operators_default8],
  ["profiling", operators_default3],
  ["code.terminal", operators_default]
]);
function registerOperators(configs) {
  const list = configs ?? [...operatorModules.keys()].map((id) => ({ id, active: true }));
  for (const item of list) {
    if (item.active === false) continue;
    const operators = operatorModules.get(item.id);
    if (!operators) throw new Error(`bonsai: unknown module "${item.id}"`);
    for (const Op of operators) ops_default.register(Op);
  }
}

// src/index.js
var log3 = createLogger("bonsai");
var ms = (start2) => `${(performance.now() - start2).toFixed(0)}ms`;
var Bonsai = class {
  constructor(container, configuration = {}, viewport) {
    this.context = {
      signals: Signals,
      store: Store,
      dom: { container, viewport }
    };
    this.ops = ops_default;
    this.tool = tool_default;
    this.paths = configuration.paths;
    this.context.geometry = configuration.geometry ?? null;
    this.tool.Loader.usePaths(configuration.paths);
    this.tool.Loader.configure(configuration.geometry);
    listenStore(this.context.signals);
    registerOperators(configuration.app?.CoreModules);
    bindKeyboard();
    logSignals(this.context.signals);
    this.viewer = null;
  }
  async start() {
    const t = performance.now();
    const { context } = this;
    const viewerInstance = await create(context.dom.viewport, this.paths);
    this.viewer = viewerInstance;
    this._resizeObserver = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
    });
    this._resizeObserver.observe(viewerInstance.canvas);
    viewerInstance.onSelect((pick) => {
      ops_default.execute("viewer.object_picked", context, pick);
    });
    viewerInstance.onSelectionChange((ids) => {
      ops_default.execute("viewer.selection_changed", context, ids);
    });
    viewerInstance.onModelLoaded((detail) => {
      ops_default.execute("project.model_loaded", context, detail);
    });
    const viewport = context.dom.viewport;
    if (viewport) {
      tool_default.Loader.enableDragDrop(viewport, (payload) => {
        if (payload?.entries) {
          ops_default.execute("project.open_bag", context, payload.entries, payload.label);
          return;
        }
        if (payload?.files) {
          for (const file2 of payload.files) ops_default.execute("load.ifc", context, file2);
          return;
        }
        const file = payload?.file ?? payload;
        if (file) ops_default.execute("load.ifc", context, file);
      });
    }
    context.signals.viewerReady.dispatch(viewerInstance);
    log3.log(`boot: viewer ready in ${ms(t)}`);
    const ifcopenshell = await import("ifcopenshell");
    await ifcopenshell.init();
    log3.log(`boot: ifcopenshell ready in ${ms(t)}`);
    context.signals.appReady.dispatch(true);
    this.tool.Loader.warmRuntimes();
  }
  addSignal(signal) {
    return addSignal(signal);
  }
  removeSignal(signal) {
    return removeSignal(signal);
  }
  destroy() {
    this._resizeObserver?.disconnect();
    this.terminal?.terminalPanel?.destroy();
    this.context.profiling?.profilerPanel?.destroy();
    destroy();
    this.viewer = null;
  }
};
async function start(container = document.body, configuration = {}) {
  const bonsai = new Bonsai(container, configuration, container);
  await bonsai.start();
  return bonsai;
}

export {
  createLogger,
  ops_default,
  Ifc,
  Federation,
  writeStoredZip,
  onViewerTools,
  viewer,
  Viewer,
  Loader,
  ensureElementChildren,
  getSpatialDecomposition,
  Terminal,
  tool_default,
  scriptScope,
  resolvePick,
  measure,
  projectPoint,
  Bonsai,
  start
};
/*! Bundled license information:

signals/dist/signals.js:
  (** @license
   * JS Signals <http://millermedeiros.github.com/js-signals/>
   * Released under the MIT license
   * Author: Miller Medeiros
   * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
   *)
*/
//# sourceMappingURL=chunk-T54G3JH2.js.map
