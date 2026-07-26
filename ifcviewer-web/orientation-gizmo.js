// orientation-gizmo.js — lightweight DOM orientation widget for IfcViewerWeb.
// SVG projected cube: labeled faces, click to snap view, drag to orbit.
(function (global) {
  'use strict';

  var DEG2RAD = Math.PI / 180;
  var CORNER_STYLES = {
    'top-left':     { top: '0', left: '0',  right: 'auto', bottom: 'auto' },
    'top-right':    { top: '0', right: '0', left: 'auto', bottom: 'auto' },
    'bottom-left':  { bottom: '0', left: '0',  right: 'auto', top: 'auto' },
    'bottom-right': { bottom: '0', right: '0', left: 'auto', top: 'auto' },
  };

  var STANDARD_VIEWS = {
    front: 0, back: 1, left: 2, right: 3, top: 4, bottom: 5,
  };

  // Z-up world cube faces (+X red, +Y green, +Z blue tints).
  var FACES = [
    {
      id: 'px', view: 'back', label: 'BACK', normal: [1, 0, 0],
      corners: [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      fill: '#ececec', hover: '#dedede', stroke: '#c8c8c8', text: '#555',
    },
    {
      id: 'nx', view: 'front', label: 'FRONT', normal: [-1, 0, 0],
      corners: [[-1, 1, -1], [-1, -1, -1], [-1, -1, 1], [-1, 1, 1]],
      fill: '#ececec', hover: '#dedede', stroke: '#c8c8c8', text: '#555',
    },
    {
      id: 'py', view: 'left', label: 'LEFT', normal: [0, 1, 0],
      corners: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]],
      fill: '#e8f2e8', hover: '#d6ead6', stroke: '#b8d4b8', text: '#2f6b2f',
    },
    {
      id: 'ny', view: 'right', label: 'RIGHT', normal: [0, -1, 0],
      corners: [[1, -1, -1], [-1, -1, -1], [-1, -1, 1], [1, -1, 1]],
      fill: '#e8f2e8', hover: '#d6ead6', stroke: '#b8d4b8', text: '#2f6b2f',
    },
    {
      id: 'pz', view: 'bottom', label: 'BOTTOM', normal: [0, 0, 1],
      corners: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
      fill: '#e6eef8', hover: '#d4e4f6', stroke: '#b4cae8', text: '#255aa5',
    },
    {
      id: 'nz', view: 'top', label: 'TOP', normal: [0, 0, -1],
      corners: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]],
      fill: '#e6eef8', hover: '#d4e4f6', stroke: '#b4cae8', text: '#255aa5',
    },
  ];

  // Match OrientationGizmoRenderer: lookAtRH(eye_dir * 3, origin, world_up) * orthoGL(±1.4).
  var ORTHO_SCALE = 1 / 1.4;
  var GIZMO_EYE_DIST = 3;

  function lookAtGizmoView(yawDeg, pitchDeg) {
    var yaw = yawDeg * DEG2RAD;
    var pitch = pitchDeg * DEG2RAD;
    var edx = Math.cos(pitch) * Math.cos(yaw);
    var edy = Math.cos(pitch) * Math.sin(yaw);
    var edz = Math.sin(pitch);
    var ex = edx * GIZMO_EYE_DIST;
    var ey = edy * GIZMO_EYE_DIST;
    var ez = edz * GIZMO_EYE_DIST;
    var fx = -edx, fy = -edy, fz = -edz;
    var wux = 0, wuy = 0, wuz = 1;
    if (Math.abs(pitchDeg) >= 89) { wux = 0; wuy = 1; wuz = 0; }
    var sx = fy * wuz - fz * wuy;
    var sy = fz * wux - fx * wuz;
    var sz = fx * wuy - fy * wux;
    var sl = Math.hypot(sx, sy, sz) || 1;
    sx /= sl; sy /= sl; sz /= sl;
    var ux = sy * fz - sz * fy;
    var uy = sz * fx - sx * fz;
    var uz = sx * fy - sy * fx;
    var tdotS = sx * ex + sy * ey + sz * ez;
    var tdotU = ux * ex + uy * ey + uz * ez;
    var tdotF = fx * ex + fy * ey + fz * ez;
    return {
      s: [sx, sy, sz],
      u: [ux, uy, uz],
      f: [fx, fy, fz],
      eyeDir: [edx, edy, edz],
      tdotS: tdotS,
      tdotU: tdotU,
      tdotF: tdotF,
    };
  }

  function projectPoint(view, p, scale) {
    var wx = p[0] * scale;
    var wy = p[1] * scale;
    var wz = p[2] * scale;
    var vx = view.s[0] * wx + view.s[1] * wy + view.s[2] * wz - view.tdotS;
    var vy = view.u[0] * wx + view.u[1] * wy + view.u[2] * wz - view.tdotU;
    var clipX = vx * ORTHO_SCALE;
    var clipY = vy * ORTHO_SCALE;
    return {
      x: -clipX,
      y: clipY,
      depth: view.eyeDir[0] * wx + view.eyeDir[1] * wy + view.eyeDir[2] * wz,
    };
  }

  function faceDepth(view, face, scale) {
    var n = face.normal;
    var facing = view.eyeDir[0] * n[0] + view.eyeDir[1] * n[1] + view.eyeDir[2] * n[2];
    var cx = face.normal[0] * scale;
    var cy = face.normal[1] * scale;
    var cz = face.normal[2] * scale;
    var order = view.eyeDir[0] * cx + view.eyeDir[1] * cy + view.eyeDir[2] * cz;
    return { facing: facing, order: order };
  }

  function setNativeGizmoVisible(viewer, visible) {
    if (viewer.setNativeOrientationGizmoVisible) {
      viewer.setNativeOrientationGizmoVisible(visible);
    }
  }

  function createDomOrientationGizmo(viewer, options) {
    options = options || {};
    var Module = viewer.module;
    var parent = options.parent || Module.canvas && Module.canvas.parentElement;
    if (!parent) throw new Error('orientation gizmo needs a parent element');

    var size = options.size || 150;
    var margin = options.margin != null ? options.margin : 8;
    var corner = options.corner || 'bottom-right';
    var hideNative = options.hideNative === true;
    var autoSync = options.sync !== false;
    var scale = options.scale != null ? options.scale : 0.38;
    var dragging = false;
    var lastX = 0;
    var lastY = 0;
    var destroyed = false;
    var hoveredId = null;
    var svgNodes = {};

    if (hideNative) setNativeGizmoVisible(viewer, false);

    var root = document.createElement('div');
    root.className = 'ifcv-orientation-gizmo';
    Object.assign(root.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      margin: margin + 'px',
      pointerEvents: 'auto',
      zIndex: '100',
      userSelect: 'none',
      touchAction: 'none',
      boxSizing: 'border-box',
    });
    Object.assign(root.style, CORNER_STYLES[corner] || CORNER_STYLES['top-right']);

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-1 -1 2 2');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    svg.style.overflow = 'visible';
    root.appendChild(svg);

    var faceLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(faceLayer);

    FACES.forEach(function (face) {
      var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('data-face', face.id);
      poly.setAttribute('stroke-linejoin', 'round');
      poly.style.cursor = 'pointer';
      poly.addEventListener('pointerenter', function () {
        hoveredId = face.id;
        poly.setAttribute('fill', face.hover);
      });
      poly.addEventListener('pointerleave', function () {
        if (hoveredId === face.id) hoveredId = null;
        poly.setAttribute('fill', face.fill);
      });
      poly.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        setStandardView(face.view);
      });

      var label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('dominant-baseline', 'middle');
      label.setAttribute('font-family', 'system-ui, sans-serif');
      label.setAttribute('font-size', '0.19');
      label.setAttribute('font-weight', '600');
      label.setAttribute('fill', face.text);
      label.setAttribute('pointer-events', 'none');
      label.textContent = face.label;

      faceLayer.appendChild(poly);
      faceLayer.appendChild(label);
      svgNodes[face.id] = { poly: poly, label: label, face: face };
    });

    parent.appendChild(root);

    function setStandardView(name) {
      viewer.standardView(name);
      sync();
    }

    function sync() {
      if (destroyed) return;
      var ori = viewer.cameraOrientation();
      var view = lookAtGizmoView(ori.yaw, ori.pitch);

      var order = FACES.slice().sort(function (a, b) {
        return faceDepth(view, a, scale).order - faceDepth(view, b, scale).order;
      });

      order.forEach(function (face) {
        var node = svgNodes[face.id];
        var pts = [];
        var cx = 0;
        var cy = 0;
        for (var i = 0; i < face.corners.length; i++) {
          var p = projectPoint(view, face.corners[i], scale);
          pts.push(p.x + ',' + p.y);
          cx += p.x;
          cy += p.y;
        }
        cx /= face.corners.length;
        cy /= face.corners.length;

        var depthInfo = faceDepth(view, face, scale);
        var visible = depthInfo.facing < -0.01;
        node.poly.setAttribute('points', pts.join(' '));
        node.poly.setAttribute('fill', hoveredId === face.id ? face.hover : face.fill);
        node.poly.setAttribute('stroke', face.stroke);
        node.poly.setAttribute('stroke-width', '0.025');
        node.poly.style.display = visible ? '' : 'none';
        node.label.setAttribute('x', String(cx));
        node.label.setAttribute('y', String(cy));
        node.label.style.display = visible ? '' : 'none';

        faceLayer.appendChild(node.poly);
        faceLayer.appendChild(node.label);
      });
    }

    function onPointerDown(e) {
      if (destroyed) return;
      if (e.target !== root && e.target !== svg && e.target.tagName !== 'svg') return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      root.setPointerCapture(e.pointerId);
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!dragging || destroyed) return;
      var dx = e.clientX - lastX;
      var dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (Module._orbit_c) Module._orbit_c(dx, dy);
      sync();
      e.preventDefault();
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      try { root.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    root.addEventListener('pointerdown', onPointerDown);
    root.addEventListener('pointermove', onPointerMove);
    root.addEventListener('pointerup', onPointerUp);
    root.addEventListener('pointercancel', onPointerUp);

    sync();

    return {
      element: root,
      autoSync: autoSync,
      sync: sync,
      setVisible: function (visible) {
        root.style.display = visible ? '' : 'none';
      },
      setCorner: function (nextCorner) {
        corner = nextCorner;
        var style = CORNER_STYLES[nextCorner] || CORNER_STYLES['bottom-right'];
        Object.assign(root.style, { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' }, style);
      },
      setStandardView: setStandardView,
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        root.remove();
      },
    };
  }

  global.IfcViewer = global.IfcViewer || {};
  global.IfcViewer.OrientationGizmo = {
    STANDARD_VIEWS: STANDARD_VIEWS,
    create: createDomOrientationGizmo,
  };
})(typeof window !== 'undefined' ? window : globalThis);
