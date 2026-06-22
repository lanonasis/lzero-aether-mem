var In = typeof In < "u" ? In : {
  env: { NODE_ENV: "production", VSCODE_WEBVIEW: "true" },
  platform: "browser",
  version: "",
  versions: {},
  browser: !0,
  nextTick: function(a) {
    return setTimeout(a, 0);
  }
};
function dm(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var vs = { exports: {} }, _u = {};
var Nh;
function F0() {
  if (Nh) return _u;
  Nh = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(s, f, m) {
    var v = null;
    if (m !== void 0 && (v = "" + m), f.key !== void 0 && (v = "" + f.key), "key" in f) {
      m = {};
      for (var T in f)
        T !== "key" && (m[T] = f[T]);
    } else m = f;
    return f = m.ref, {
      $$typeof: a,
      type: s,
      key: v,
      ref: f !== void 0 ? f : null,
      props: m
    };
  }
  return _u.Fragment = i, _u.jsx = o, _u.jsxs = o, _u;
}
var Mh;
function I0() {
  return Mh || (Mh = 1, vs.exports = F0()), vs.exports;
}
var h = I0(), ys = { exports: {} }, ne = {};
var wh;
function P0() {
  if (wh) return ne;
  wh = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), f = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), v = /* @__PURE__ */ Symbol.for("react.context"), T = /* @__PURE__ */ Symbol.for("react.forward_ref"), S = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), R = /* @__PURE__ */ Symbol.for("react.lazy"), U = /* @__PURE__ */ Symbol.for("react.activity"), L = Symbol.iterator;
  function ee(g) {
    return g === null || typeof g != "object" ? null : (g = L && g[L] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var de = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Oe = Object.assign, we = {};
  function Ve(g, M, q) {
    this.props = g, this.context = M, this.refs = we, this.updater = q || de;
  }
  Ve.prototype.isReactComponent = {}, Ve.prototype.setState = function(g, M) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, M, "setState");
  }, Ve.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function He() {
  }
  He.prototype = Ve.prototype;
  function me(g, M, q) {
    this.props = g, this.context = M, this.refs = we, this.updater = q || de;
  }
  var $ = me.prototype = new He();
  $.constructor = me, Oe($, Ve.prototype), $.isPureReactComponent = !0;
  var be = Array.isArray;
  function Be() {
  }
  var te = { H: null, A: null, T: null, S: null }, Le = Object.prototype.hasOwnProperty;
  function Dt(g, M, q) {
    var D = q.ref;
    return {
      $$typeof: a,
      type: g,
      key: M,
      ref: D !== void 0 ? D : null,
      props: q
    };
  }
  function Wt(g, M) {
    return Dt(g.type, M, g.props);
  }
  function Ut(g) {
    return typeof g == "object" && g !== null && g.$$typeof === a;
  }
  function Ie(g) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function(q) {
      return M[q];
    });
  }
  var Ft = /\/+/g;
  function zt(g, M) {
    return typeof g == "object" && g !== null && g.key != null ? Ie("" + g.key) : M.toString(36);
  }
  function Pe(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(Be, Be) : (g.status = "pending", g.then(
          function(M) {
            g.status === "pending" && (g.status = "fulfilled", g.value = M);
          },
          function(M) {
            g.status === "pending" && (g.status = "rejected", g.reason = M);
          }
        )), g.status) {
          case "fulfilled":
            return g.value;
          case "rejected":
            throw g.reason;
        }
    }
    throw g;
  }
  function O(g, M, q, D, J) {
    var ue = typeof g;
    (ue === "undefined" || ue === "boolean") && (g = null);
    var ce = !1;
    if (g === null) ce = !0;
    else
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          ce = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case a:
            case i:
              ce = !0;
              break;
            case R:
              return ce = g._init, O(
                ce(g._payload),
                M,
                q,
                D,
                J
              );
          }
      }
    if (ce)
      return J = J(g), ce = D === "" ? "." + zt(g, 0) : D, be(J) ? (q = "", ce != null && (q = ce.replace(Ft, "$&/") + "/"), O(J, M, q, "", function(It) {
        return It;
      })) : J != null && (Ut(J) && (J = Wt(
        J,
        q + (J.key == null || g && g.key === J.key ? "" : ("" + J.key).replace(
          Ft,
          "$&/"
        ) + "/") + ce
      )), M.push(J)), 1;
    ce = 0;
    var xe = D === "" ? "." : D + ":";
    if (be(g))
      for (var ze = 0; ze < g.length; ze++)
        D = g[ze], ue = xe + zt(D, ze), ce += O(
          D,
          M,
          q,
          ue,
          J
        );
    else if (ze = ee(g), typeof ze == "function")
      for (g = ze.call(g), ze = 0; !(D = g.next()).done; )
        D = D.value, ue = xe + zt(D, ze++), ce += O(
          D,
          M,
          q,
          ue,
          J
        );
    else if (ue === "object") {
      if (typeof g.then == "function")
        return O(
          Pe(g),
          M,
          q,
          D,
          J
        );
      throw M = String(g), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ce;
  }
  function H(g, M, q) {
    if (g == null) return g;
    var D = [], J = 0;
    return O(g, D, "", "", function(ue) {
      return M.call(q, ue, J++);
    }), D;
  }
  function X(g) {
    if (g._status === -1) {
      var M = g._result;
      M = M(), M.then(
        function(q) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = q);
        },
        function(q) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = q);
        }
      ), g._status === -1 && (g._status = 0, g._result = M);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ie = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof In == "object" && typeof In.emit == "function") {
      In.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  }, F = {
    map: H,
    forEach: function(g, M, q) {
      H(
        g,
        function() {
          M.apply(this, arguments);
        },
        q
      );
    },
    count: function(g) {
      var M = 0;
      return H(g, function() {
        M++;
      }), M;
    },
    toArray: function(g) {
      return H(g, function(M) {
        return M;
      }) || [];
    },
    only: function(g) {
      if (!Ut(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return ne.Activity = U, ne.Children = F, ne.Component = Ve, ne.Fragment = o, ne.Profiler = f, ne.PureComponent = me, ne.StrictMode = s, ne.Suspense = S, ne.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, ne.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return te.H.useMemoCache(g);
    }
  }, ne.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, ne.cacheSignal = function() {
    return null;
  }, ne.cloneElement = function(g, M, q) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var D = Oe({}, g.props), J = g.key;
    if (M != null)
      for (ue in M.key !== void 0 && (J = "" + M.key), M)
        !Le.call(M, ue) || ue === "key" || ue === "__self" || ue === "__source" || ue === "ref" && M.ref === void 0 || (D[ue] = M[ue]);
    var ue = arguments.length - 2;
    if (ue === 1) D.children = q;
    else if (1 < ue) {
      for (var ce = Array(ue), xe = 0; xe < ue; xe++)
        ce[xe] = arguments[xe + 2];
      D.children = ce;
    }
    return Dt(g.type, J, D);
  }, ne.createContext = function(g) {
    return g = {
      $$typeof: v,
      _currentValue: g,
      _currentValue2: g,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, g.Provider = g, g.Consumer = {
      $$typeof: m,
      _context: g
    }, g;
  }, ne.createElement = function(g, M, q) {
    var D, J = {}, ue = null;
    if (M != null)
      for (D in M.key !== void 0 && (ue = "" + M.key), M)
        Le.call(M, D) && D !== "key" && D !== "__self" && D !== "__source" && (J[D] = M[D]);
    var ce = arguments.length - 2;
    if (ce === 1) J.children = q;
    else if (1 < ce) {
      for (var xe = Array(ce), ze = 0; ze < ce; ze++)
        xe[ze] = arguments[ze + 2];
      J.children = xe;
    }
    if (g && g.defaultProps)
      for (D in ce = g.defaultProps, ce)
        J[D] === void 0 && (J[D] = ce[D]);
    return Dt(g, ue, J);
  }, ne.createRef = function() {
    return { current: null };
  }, ne.forwardRef = function(g) {
    return { $$typeof: T, render: g };
  }, ne.isValidElement = Ut, ne.lazy = function(g) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: g },
      _init: X
    };
  }, ne.memo = function(g, M) {
    return {
      $$typeof: p,
      type: g,
      compare: M === void 0 ? null : M
    };
  }, ne.startTransition = function(g) {
    var M = te.T, q = {};
    te.T = q;
    try {
      var D = g(), J = te.S;
      J !== null && J(q, D), typeof D == "object" && D !== null && typeof D.then == "function" && D.then(Be, ie);
    } catch (ue) {
      ie(ue);
    } finally {
      M !== null && q.types !== null && (M.types = q.types), te.T = M;
    }
  }, ne.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, ne.use = function(g) {
    return te.H.use(g);
  }, ne.useActionState = function(g, M, q) {
    return te.H.useActionState(g, M, q);
  }, ne.useCallback = function(g, M) {
    return te.H.useCallback(g, M);
  }, ne.useContext = function(g) {
    return te.H.useContext(g);
  }, ne.useDebugValue = function() {
  }, ne.useDeferredValue = function(g, M) {
    return te.H.useDeferredValue(g, M);
  }, ne.useEffect = function(g, M) {
    return te.H.useEffect(g, M);
  }, ne.useEffectEvent = function(g) {
    return te.H.useEffectEvent(g);
  }, ne.useId = function() {
    return te.H.useId();
  }, ne.useImperativeHandle = function(g, M, q) {
    return te.H.useImperativeHandle(g, M, q);
  }, ne.useInsertionEffect = function(g, M) {
    return te.H.useInsertionEffect(g, M);
  }, ne.useLayoutEffect = function(g, M) {
    return te.H.useLayoutEffect(g, M);
  }, ne.useMemo = function(g, M) {
    return te.H.useMemo(g, M);
  }, ne.useOptimistic = function(g, M) {
    return te.H.useOptimistic(g, M);
  }, ne.useReducer = function(g, M, q) {
    return te.H.useReducer(g, M, q);
  }, ne.useRef = function(g) {
    return te.H.useRef(g);
  }, ne.useState = function(g) {
    return te.H.useState(g);
  }, ne.useSyncExternalStore = function(g, M, q) {
    return te.H.useSyncExternalStore(
      g,
      M,
      q
    );
  }, ne.useTransition = function() {
    return te.H.useTransition();
  }, ne.version = "19.2.4", ne;
}
var Ch;
function Os() {
  return Ch || (Ch = 1, ys.exports = P0()), ys.exports;
}
var Y = Os();
const js = /* @__PURE__ */ dm(Y);
var ps = { exports: {} }, Su = {}, gs = { exports: {} }, bs = {};
var Dh;
function ey() {
  return Dh || (Dh = 1, (function(a) {
    function i(O, H) {
      var X = O.length;
      O.push(H);
      e: for (; 0 < X; ) {
        var ie = X - 1 >>> 1, F = O[ie];
        if (0 < f(F, H))
          O[ie] = H, O[X] = F, X = ie;
        else break e;
      }
    }
    function o(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var H = O[0], X = O.pop();
      if (X !== H) {
        O[0] = X;
        e: for (var ie = 0, F = O.length, g = F >>> 1; ie < g; ) {
          var M = 2 * (ie + 1) - 1, q = O[M], D = M + 1, J = O[D];
          if (0 > f(q, X))
            D < F && 0 > f(J, q) ? (O[ie] = J, O[D] = X, ie = D) : (O[ie] = q, O[M] = X, ie = M);
          else if (D < F && 0 > f(J, X))
            O[ie] = J, O[D] = X, ie = D;
          else break e;
        }
      }
      return H;
    }
    function f(O, H) {
      var X = O.sortIndex - H.sortIndex;
      return X !== 0 ? X : O.id - H.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      a.unstable_now = function() {
        return m.now();
      };
    } else {
      var v = Date, T = v.now();
      a.unstable_now = function() {
        return v.now() - T;
      };
    }
    var S = [], p = [], R = 1, U = null, L = 3, ee = !1, de = !1, Oe = !1, we = !1, Ve = typeof setTimeout == "function" ? setTimeout : null, He = typeof clearTimeout == "function" ? clearTimeout : null, me = typeof setImmediate < "u" ? setImmediate : null;
    function $(O) {
      for (var H = o(p); H !== null; ) {
        if (H.callback === null) s(p);
        else if (H.startTime <= O)
          s(p), H.sortIndex = H.expirationTime, i(S, H);
        else break;
        H = o(p);
      }
    }
    function be(O) {
      if (Oe = !1, $(O), !de)
        if (o(S) !== null)
          de = !0, Be || (Be = !0, Ie());
        else {
          var H = o(p);
          H !== null && Pe(be, H.startTime - O);
        }
    }
    var Be = !1, te = -1, Le = 5, Dt = -1;
    function Wt() {
      return we ? !0 : !(a.unstable_now() - Dt < Le);
    }
    function Ut() {
      if (we = !1, Be) {
        var O = a.unstable_now();
        Dt = O;
        var H = !0;
        try {
          e: {
            de = !1, Oe && (Oe = !1, He(te), te = -1), ee = !0;
            var X = L;
            try {
              t: {
                for ($(O), U = o(S); U !== null && !(U.expirationTime > O && Wt()); ) {
                  var ie = U.callback;
                  if (typeof ie == "function") {
                    U.callback = null, L = U.priorityLevel;
                    var F = ie(
                      U.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof F == "function") {
                      U.callback = F, $(O), H = !0;
                      break t;
                    }
                    U === o(S) && s(S), $(O);
                  } else s(S);
                  U = o(S);
                }
                if (U !== null) H = !0;
                else {
                  var g = o(p);
                  g !== null && Pe(
                    be,
                    g.startTime - O
                  ), H = !1;
                }
              }
              break e;
            } finally {
              U = null, L = X, ee = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Ie() : Be = !1;
        }
      }
    }
    var Ie;
    if (typeof me == "function")
      Ie = function() {
        me(Ut);
      };
    else if (typeof MessageChannel < "u") {
      var Ft = new MessageChannel(), zt = Ft.port2;
      Ft.port1.onmessage = Ut, Ie = function() {
        zt.postMessage(null);
      };
    } else
      Ie = function() {
        Ve(Ut, 0);
      };
    function Pe(O, H) {
      te = Ve(function() {
        O(a.unstable_now());
      }, H);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Le = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return L;
    }, a.unstable_next = function(O) {
      switch (L) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = L;
      }
      var X = L;
      L = H;
      try {
        return O();
      } finally {
        L = X;
      }
    }, a.unstable_requestPaint = function() {
      we = !0;
    }, a.unstable_runWithPriority = function(O, H) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var X = L;
      L = O;
      try {
        return H();
      } finally {
        L = X;
      }
    }, a.unstable_scheduleCallback = function(O, H, X) {
      var ie = a.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? ie + X : ie) : X = ie, O) {
        case 1:
          var F = -1;
          break;
        case 2:
          F = 250;
          break;
        case 5:
          F = 1073741823;
          break;
        case 4:
          F = 1e4;
          break;
        default:
          F = 5e3;
      }
      return F = X + F, O = {
        id: R++,
        callback: H,
        priorityLevel: O,
        startTime: X,
        expirationTime: F,
        sortIndex: -1
      }, X > ie ? (O.sortIndex = X, i(p, O), o(S) === null && O === o(p) && (Oe ? (He(te), te = -1) : Oe = !0, Pe(be, X - ie))) : (O.sortIndex = F, i(S, O), de || ee || (de = !0, Be || (Be = !0, Ie()))), O;
    }, a.unstable_shouldYield = Wt, a.unstable_wrapCallback = function(O) {
      var H = L;
      return function() {
        var X = L;
        L = H;
        try {
          return O.apply(this, arguments);
        } finally {
          L = X;
        }
      };
    };
  })(bs)), bs;
}
var Uh;
function ty() {
  return Uh || (Uh = 1, gs.exports = ey()), gs.exports;
}
var _s = { exports: {} }, ht = {};
var Rh;
function ny() {
  if (Rh) return ht;
  Rh = 1;
  var a = Os();
  function i(S) {
    var p = "https://react.dev/errors/" + S;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        p += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + S + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var s = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, f = /* @__PURE__ */ Symbol.for("react.portal");
  function m(S, p, R) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: U == null ? null : "" + U,
      children: S,
      containerInfo: p,
      implementation: R
    };
  }
  var v = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(S, p) {
    if (S === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return ht.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, ht.createPortal = function(S, p) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return m(S, p, null, R);
  }, ht.flushSync = function(S) {
    var p = v.T, R = s.p;
    try {
      if (v.T = null, s.p = 2, S) return S();
    } finally {
      v.T = p, s.p = R, s.d.f();
    }
  }, ht.preconnect = function(S, p) {
    typeof S == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(S, p));
  }, ht.prefetchDNS = function(S) {
    typeof S == "string" && s.d.D(S);
  }, ht.preinit = function(S, p) {
    if (typeof S == "string" && p && typeof p.as == "string") {
      var R = p.as, U = T(R, p.crossOrigin), L = typeof p.integrity == "string" ? p.integrity : void 0, ee = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      R === "style" ? s.d.S(
        S,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: U,
          integrity: L,
          fetchPriority: ee
        }
      ) : R === "script" && s.d.X(S, {
        crossOrigin: U,
        integrity: L,
        fetchPriority: ee,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, ht.preinitModule = function(S, p) {
    if (typeof S == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var R = T(
            p.as,
            p.crossOrigin
          );
          s.d.M(S, {
            crossOrigin: R,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(S);
  }, ht.preload = function(S, p) {
    if (typeof S == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var R = p.as, U = T(R, p.crossOrigin);
      s.d.L(S, R, {
        crossOrigin: U,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, ht.preloadModule = function(S, p) {
    if (typeof S == "string")
      if (p) {
        var R = T(p.as, p.crossOrigin);
        s.d.m(S, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: R,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(S);
  }, ht.requestFormReset = function(S) {
    s.d.r(S);
  }, ht.unstable_batchedUpdates = function(S, p) {
    return S(p);
  }, ht.useFormState = function(S, p, R) {
    return v.H.useFormState(S, p, R);
  }, ht.useFormStatus = function() {
    return v.H.useHostTransitionStatus();
  }, ht.version = "19.2.4", ht;
}
var Zh;
function ly() {
  if (Zh) return _s.exports;
  Zh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), _s.exports = ny(), _s.exports;
}
var qh;
function ay() {
  if (qh) return Su;
  qh = 1;
  var a = ty(), i = Os(), o = ly();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function m(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function v(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function T(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function S(e) {
    if (m(e) !== e)
      throw Error(s(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, l = t; ; ) {
      var u = n.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (l = u.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === n) return S(u), e;
          if (c === l) return S(u), t;
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== l.return) n = u, l = c;
      else {
        for (var r = !1, d = u.child; d; ) {
          if (d === n) {
            r = !0, n = u, l = c;
            break;
          }
          if (d === l) {
            r = !0, l = u, n = c;
            break;
          }
          d = d.sibling;
        }
        if (!r) {
          for (d = c.child; d; ) {
            if (d === n) {
              r = !0, n = c, l = u;
              break;
            }
            if (d === l) {
              r = !0, l = c, n = u;
              break;
            }
            d = d.sibling;
          }
          if (!r) throw Error(s(189));
        }
      }
      if (n.alternate !== l) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function R(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = R(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var U = Object.assign, L = /* @__PURE__ */ Symbol.for("react.element"), ee = /* @__PURE__ */ Symbol.for("react.transitional.element"), de = /* @__PURE__ */ Symbol.for("react.portal"), Oe = /* @__PURE__ */ Symbol.for("react.fragment"), we = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ve = /* @__PURE__ */ Symbol.for("react.profiler"), He = /* @__PURE__ */ Symbol.for("react.consumer"), me = /* @__PURE__ */ Symbol.for("react.context"), $ = /* @__PURE__ */ Symbol.for("react.forward_ref"), be = /* @__PURE__ */ Symbol.for("react.suspense"), Be = /* @__PURE__ */ Symbol.for("react.suspense_list"), te = /* @__PURE__ */ Symbol.for("react.memo"), Le = /* @__PURE__ */ Symbol.for("react.lazy"), Dt = /* @__PURE__ */ Symbol.for("react.activity"), Wt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ut = Symbol.iterator;
  function Ie(e) {
    return e === null || typeof e != "object" ? null : (e = Ut && e[Ut] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ft = /* @__PURE__ */ Symbol.for("react.client.reference");
  function zt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ft ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Oe:
        return "Fragment";
      case Ve:
        return "Profiler";
      case we:
        return "StrictMode";
      case be:
        return "Suspense";
      case Be:
        return "SuspenseList";
      case Dt:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case de:
          return "Portal";
        case me:
          return e.displayName || "Context";
        case He:
          return (e._context.displayName || "Context") + ".Consumer";
        case $:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return t = e.displayName || null, t !== null ? t : zt(e.type) || "Memo";
        case Le:
          t = e._payload, e = e._init;
          try {
            return zt(e(t));
          } catch {
          }
      }
    return null;
  }
  var Pe = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ie = [], F = -1;
  function g(e) {
    return { current: e };
  }
  function M(e) {
    0 > F || (e.current = ie[F], ie[F] = null, F--);
  }
  function q(e, t) {
    F++, ie[F] = e.current, e.current = t;
  }
  var D = g(null), J = g(null), ue = g(null), ce = g(null);
  function xe(e, t) {
    switch (q(ue, t), q(J, e), q(D, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Id(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Id(t), e = Pd(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    M(D), q(D, e);
  }
  function ze() {
    M(D), M(J), M(ue);
  }
  function It(e) {
    e.memoizedState !== null && q(ce, e);
    var t = D.current, n = Pd(t, e.type);
    t !== n && (q(J, e), q(D, n));
  }
  function an(e) {
    J.current === e && (M(D), M(J)), ce.current === e && (M(ce), yu._currentValue = X);
  }
  var Ea, Ta;
  function Et(e) {
    if (Ea === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ea = t && t[1] || "", Ta = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ea + e + Ta;
  }
  var On = !1;
  function Aa(e, t) {
    if (!e || On) return "";
    On = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var w = function() {
                throw Error();
              };
              if (Object.defineProperty(w.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(w, []);
                } catch (A) {
                  var E = A;
                }
                Reflect.construct(e, [], w);
              } else {
                try {
                  w.call();
                } catch (A) {
                  E = A;
                }
                e.call(w.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                E = A;
              }
              (w = e()) && typeof w.catch == "function" && w.catch(function() {
              });
            }
          } catch (A) {
            if (A && E && typeof A.stack == "string")
              return [A.stack, E.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = l.DetermineComponentFrameRoot(), r = c[0], d = c[1];
      if (r && d) {
        var y = r.split(`
`), z = d.split(`
`);
        for (u = l = 0; l < y.length && !y[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < z.length && !z[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === y.length || u === z.length)
          for (l = y.length - 1, u = z.length - 1; 1 <= l && 0 <= u && y[l] !== z[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (y[l] !== z[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || y[l] !== z[u]) {
                  var j = `
` + y[l].replace(" at new ", " at ");
                  return e.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", e.displayName)), j;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      On = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Et(n) : "";
  }
  function Al(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Et(e.type);
      case 16:
        return Et("Lazy");
      case 13:
        return e.child !== t && t !== null ? Et("Suspense Fallback") : Et("Suspense");
      case 19:
        return Et("SuspenseList");
      case 0:
      case 15:
        return Aa(e.type, !1);
      case 11:
        return Aa(e.type.render, !1);
      case 1:
        return Aa(e.type, !0);
      case 31:
        return Et("Activity");
      default:
        return "";
    }
  }
  function nl(e) {
    try {
      var t = "", n = null;
      do
        t += Al(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Ol = Object.prototype.hasOwnProperty, un = a.unstable_scheduleCallback, ll = a.unstable_cancelCallback, Tt = a.unstable_shouldYield, Eu = a.unstable_requestPaint, ft = a.unstable_now, Oa = a.unstable_getCurrentPriorityLevel, ja = a.unstable_ImmediatePriority, Na = a.unstable_UserBlockingPriority, al = a.unstable_NormalPriority, Tu = a.unstable_LowPriority, Au = a.unstable_IdlePriority, qs = a.log, Ou = a.unstable_setDisableYieldValue, ul = null, dt = null;
  function Pt(e) {
    if (typeof qs == "function" && Ou(e), dt && typeof dt.setStrictMode == "function")
      try {
        dt.setStrictMode(ul, e);
      } catch {
      }
  }
  var lt = Math.clz32 ? Math.clz32 : Nu, ac = Math.log, ju = Math.LN2;
  function Nu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (ac(e) / ju | 0) | 0;
  }
  var jl = 256, Nl = 262144, Ml = 4194304;
  function cn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function il(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, c = e.suspendedLanes, r = e.pingedLanes;
    e = e.warmLanes;
    var d = l & 134217727;
    return d !== 0 ? (l = d & ~c, l !== 0 ? u = cn(l) : (r &= d, r !== 0 ? u = cn(r) : n || (n = d & ~e, n !== 0 && (u = cn(n))))) : (d = l & ~c, d !== 0 ? u = cn(d) : r !== 0 ? u = cn(r) : n || (n = l & ~e, n !== 0 && (u = cn(n)))), u === 0 ? 0 : t !== 0 && t !== u && (t & c) === 0 && (c = u & -u, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : u;
  }
  function jn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Mu(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ma() {
    var e = Ml;
    return Ml <<= 1, (Ml & 62914560) === 0 && (Ml = 4194304), e;
  }
  function Z(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function K(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function B(e, t, n, l, u, c) {
    var r = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var d = e.entanglements, y = e.expirationTimes, z = e.hiddenUpdates;
    for (n = r & ~n; 0 < n; ) {
      var j = 31 - lt(n), w = 1 << j;
      d[j] = 0, y[j] = -1;
      var E = z[j];
      if (E !== null)
        for (z[j] = null, j = 0; j < E.length; j++) {
          var A = E[j];
          A !== null && (A.lane &= -536870913);
        }
      n &= ~w;
    }
    l !== 0 && P(e, l, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(r & ~t));
  }
  function P(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - lt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function I(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - lt(n), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), n &= ~u;
    }
  }
  function ve(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : at(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function at(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function on(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function wu() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : xh(e.type));
  }
  function wl(e, t) {
    var n = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = n;
    }
  }
  var Rt = Math.random().toString(36).slice(2), ut = "__reactFiber$" + Rt, vt = "__reactProps$" + Rt, Cl = "__reactContainer$" + Rt, uc = "__reactEvents$" + Rt, Ym = "__reactListeners$" + Rt, km = "__reactHandles$" + Rt, Hs = "__reactResources$" + Rt, wa = "__reactMarker$" + Rt;
  function ic(e) {
    delete e[ut], delete e[vt], delete e[uc], delete e[Ym], delete e[km];
  }
  function Dl(e) {
    var t = e[ut];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Cl] || n[ut]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = ih(e); e !== null; ) {
            if (n = e[ut]) return n;
            e = ih(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Ul(e) {
    if (e = e[ut] || e[Cl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ca(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Rl(e) {
    var t = e[Hs];
    return t || (t = e[Hs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function tt(e) {
    e[wa] = !0;
  }
  var Bs = /* @__PURE__ */ new Set(), Ys = {};
  function cl(e, t) {
    Zl(e, t), Zl(e + "Capture", t);
  }
  function Zl(e, t) {
    for (Ys[e] = t, e = 0; e < t.length; e++)
      Bs.add(t[e]);
  }
  var Lm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ks = {}, Ls = {};
  function Gm(e) {
    return Ol.call(Ls, e) ? !0 : Ol.call(ks, e) ? !1 : Lm.test(e) ? Ls[e] = !0 : (ks[e] = !0, !1);
  }
  function Cu(e, t, n) {
    if (Gm(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Du(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function sn(e, t, n, l) {
    if (l === null) e.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + l);
    }
  }
  function Zt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Gs(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Xm(e, t, n) {
    var l = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var u = l.get, c = l.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(r) {
          n = "" + r, c.call(this, r);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(r) {
          n = "" + r;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function cc(e) {
    if (!e._valueTracker) {
      var t = Gs(e) ? "checked" : "value";
      e._valueTracker = Xm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Xs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = Gs(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Uu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Qm = /[\n"\\]/g;
  function qt(e) {
    return e.replace(
      Qm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function oc(e, t, n, l, u, c, r, d) {
    e.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.type = r : e.removeAttribute("type"), t != null ? r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : r !== "submit" && r !== "reset" || e.removeAttribute("value"), t != null ? sc(e, r, Zt(t)) : n != null ? sc(e, r, Zt(n)) : l != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Zt(d) : e.removeAttribute("name");
  }
  function Qs(e, t, n, l, u, c, r, d) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        cc(e);
        return;
      }
      n = n != null ? "" + Zt(n) : "", t = t != null ? "" + Zt(t) : n, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = d ? e.checked : !!l, e.defaultChecked = !!l, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.name = r), cc(e);
  }
  function sc(e, t, n) {
    t === "number" && Uu(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function ql(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < n.length; u++)
        t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        u = t.hasOwnProperty("$" + e[n].value), e[n].selected !== u && (e[n].selected = u), u && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Zt(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Vs(e, t, n) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Zt(n) : "";
  }
  function Ks(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(s(92));
        if (Pe(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Zt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), cc(e);
  }
  function Hl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Vm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function $s(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Vm.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Js(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && n[u] !== l && $s(e, u, l);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && $s(e, c, t[c]);
  }
  function rc(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Km = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), $m = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ru(e) {
    return $m.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function rn() {
  }
  var fc = null;
  function dc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Bl = null, Yl = null;
  function Ws(e) {
    var t = Ul(e);
    if (t && (e = t.stateNode)) {
      var n = e[vt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (oc(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + qt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var u = l[vt] || null;
                if (!u) throw Error(s(90));
                oc(
                  l,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              l = n[t], l.form === e.form && Xs(l);
          }
          break e;
        case "textarea":
          Vs(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ql(e, !!n.multiple, t, !1);
      }
    }
  }
  var hc = !1;
  function Fs(e, t, n) {
    if (hc) return e(t, n);
    hc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (hc = !1, (Bl !== null || Yl !== null) && (xi(), Bl && (t = Bl, e = Yl, Yl = Bl = null, Ws(t), e)))
        for (t = 0; t < e.length; t++) Ws(e[t]);
    }
  }
  function Da(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[vt] || null;
    if (l === null) return null;
    n = l[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        s(231, t, typeof n)
      );
    return n;
  }
  var fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), mc = !1;
  if (fn)
    try {
      var Ua = {};
      Object.defineProperty(Ua, "passive", {
        get: function() {
          mc = !0;
        }
      }), window.addEventListener("test", Ua, Ua), window.removeEventListener("test", Ua, Ua);
    } catch {
      mc = !1;
    }
  var Nn = null, vc = null, Zu = null;
  function Is() {
    if (Zu) return Zu;
    var e, t = vc, n = t.length, l, u = "value" in Nn ? Nn.value : Nn.textContent, c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++) ;
    var r = n - e;
    for (l = 1; l <= r && t[n - l] === u[c - l]; l++) ;
    return Zu = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function qu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Hu() {
    return !0;
  }
  function Ps() {
    return !1;
  }
  function yt(e) {
    function t(n, l, u, c, r) {
      this._reactName = n, this._targetInst = u, this.type = l, this.nativeEvent = c, this.target = r, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (n = e[d], this[d] = n ? n(c) : c[d]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Hu : Ps, this.isPropagationStopped = Ps, this;
    }
    return U(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Hu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Hu);
      },
      persist: function() {
      },
      isPersistent: Hu
    }), t;
  }
  var ol = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bu = yt(ol), Ra = U({}, ol, { view: 0, detail: 0 }), Jm = yt(Ra), yc, pc, Za, Yu = U({}, Ra, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Za && (Za && e.type === "mousemove" ? (yc = e.screenX - Za.screenX, pc = e.screenY - Za.screenY) : pc = yc = 0, Za = e), yc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : pc;
    }
  }), er = yt(Yu), Wm = U({}, Yu, { dataTransfer: 0 }), Fm = yt(Wm), Im = U({}, Ra, { relatedTarget: 0 }), gc = yt(Im), Pm = U({}, ol, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ev = yt(Pm), tv = U({}, ol, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), nv = yt(tv), lv = U({}, ol, { data: 0 }), tr = yt(lv), av = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, uv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, iv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function cv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = iv[e]) ? !!t[e] : !1;
  }
  function bc() {
    return cv;
  }
  var ov = U({}, Ra, {
    key: function(e) {
      if (e.key) {
        var t = av[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = qu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? uv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bc,
    charCode: function(e) {
      return e.type === "keypress" ? qu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? qu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), sv = yt(ov), rv = U({}, Yu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), nr = yt(rv), fv = U({}, Ra, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bc
  }), dv = yt(fv), hv = U({}, ol, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), mv = yt(hv), vv = U({}, Yu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), yv = yt(vv), pv = U({}, ol, {
    newState: 0,
    oldState: 0
  }), gv = yt(pv), bv = [9, 13, 27, 32], _c = fn && "CompositionEvent" in window, qa = null;
  fn && "documentMode" in document && (qa = document.documentMode);
  var _v = fn && "TextEvent" in window && !qa, lr = fn && (!_c || qa && 8 < qa && 11 >= qa), ar = " ", ur = !1;
  function ir(e, t) {
    switch (e) {
      case "keyup":
        return bv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cr(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var kl = !1;
  function Sv(e, t) {
    switch (e) {
      case "compositionend":
        return cr(t);
      case "keypress":
        return t.which !== 32 ? null : (ur = !0, ar);
      case "textInput":
        return e = t.data, e === ar && ur ? null : e;
      default:
        return null;
    }
  }
  function xv(e, t) {
    if (kl)
      return e === "compositionend" || !_c && ir(e, t) ? (e = Is(), Zu = vc = Nn = null, kl = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return lr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var zv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function or(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!zv[e.type] : t === "textarea";
  }
  function sr(e, t, n, l) {
    Bl ? Yl ? Yl.push(l) : Yl = [l] : Bl = l, t = Ni(t, "onChange"), 0 < t.length && (n = new Bu(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var Ha = null, Ba = null;
  function Ev(e) {
    Vd(e, 0);
  }
  function ku(e) {
    var t = Ca(e);
    if (Xs(t)) return e;
  }
  function rr(e, t) {
    if (e === "change") return t;
  }
  var fr = !1;
  if (fn) {
    var Sc;
    if (fn) {
      var xc = "oninput" in document;
      if (!xc) {
        var dr = document.createElement("div");
        dr.setAttribute("oninput", "return;"), xc = typeof dr.oninput == "function";
      }
      Sc = xc;
    } else Sc = !1;
    fr = Sc && (!document.documentMode || 9 < document.documentMode);
  }
  function hr() {
    Ha && (Ha.detachEvent("onpropertychange", mr), Ba = Ha = null);
  }
  function mr(e) {
    if (e.propertyName === "value" && ku(Ba)) {
      var t = [];
      sr(
        t,
        Ba,
        e,
        dc(e)
      ), Fs(Ev, t);
    }
  }
  function Tv(e, t, n) {
    e === "focusin" ? (hr(), Ha = t, Ba = n, Ha.attachEvent("onpropertychange", mr)) : e === "focusout" && hr();
  }
  function Av(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ku(Ba);
  }
  function Ov(e, t) {
    if (e === "click") return ku(t);
  }
  function jv(e, t) {
    if (e === "input" || e === "change")
      return ku(t);
  }
  function Nv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var At = typeof Object.is == "function" ? Object.is : Nv;
  function Ya(e, t) {
    if (At(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var u = n[l];
      if (!Ol.call(t, u) || !At(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function vr(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function yr(e, t) {
    var n = vr(e);
    e = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = e + n.textContent.length, e <= t && l >= t)
          return { node: n, offset: t - e };
        e = l;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = vr(n);
    }
  }
  function pr(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? pr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function gr(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Uu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Uu(e.document);
    }
    return t;
  }
  function zc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Mv = fn && "documentMode" in document && 11 >= document.documentMode, Ll = null, Ec = null, ka = null, Tc = !1;
  function br(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Tc || Ll == null || Ll !== Uu(l) || (l = Ll, "selectionStart" in l && zc(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ka && Ya(ka, l) || (ka = l, l = Ni(Ec, "onSelect"), 0 < l.length && (t = new Bu(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = Ll)));
  }
  function sl(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Gl = {
    animationend: sl("Animation", "AnimationEnd"),
    animationiteration: sl("Animation", "AnimationIteration"),
    animationstart: sl("Animation", "AnimationStart"),
    transitionrun: sl("Transition", "TransitionRun"),
    transitionstart: sl("Transition", "TransitionStart"),
    transitioncancel: sl("Transition", "TransitionCancel"),
    transitionend: sl("Transition", "TransitionEnd")
  }, Ac = {}, _r = {};
  fn && (_r = document.createElement("div").style, "AnimationEvent" in window || (delete Gl.animationend.animation, delete Gl.animationiteration.animation, delete Gl.animationstart.animation), "TransitionEvent" in window || delete Gl.transitionend.transition);
  function rl(e) {
    if (Ac[e]) return Ac[e];
    if (!Gl[e]) return e;
    var t = Gl[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in _r)
        return Ac[e] = t[n];
    return e;
  }
  var Sr = rl("animationend"), xr = rl("animationiteration"), zr = rl("animationstart"), wv = rl("transitionrun"), Cv = rl("transitionstart"), Dv = rl("transitioncancel"), Er = rl("transitionend"), Tr = /* @__PURE__ */ new Map(), Oc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Oc.push("scrollEnd");
  function Kt(e, t) {
    Tr.set(e, t), cl(t, [e]);
  }
  var Lu = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof In == "object" && typeof In.emit == "function") {
      In.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Ht = [], Xl = 0, jc = 0;
  function Gu() {
    for (var e = Xl, t = jc = Xl = 0; t < e; ) {
      var n = Ht[t];
      Ht[t++] = null;
      var l = Ht[t];
      Ht[t++] = null;
      var u = Ht[t];
      Ht[t++] = null;
      var c = Ht[t];
      if (Ht[t++] = null, l !== null && u !== null) {
        var r = l.pending;
        r === null ? u.next = u : (u.next = r.next, r.next = u), l.pending = u;
      }
      c !== 0 && Ar(n, u, c);
    }
  }
  function Xu(e, t, n, l) {
    Ht[Xl++] = e, Ht[Xl++] = t, Ht[Xl++] = n, Ht[Xl++] = l, jc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Nc(e, t, n, l) {
    return Xu(e, t, n, l), Qu(e);
  }
  function fl(e, t) {
    return Xu(e, null, null, t), Qu(e);
  }
  function Ar(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= n, l = c.alternate, l !== null && (l.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - lt(n), e = c.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = n | 536870912), c) : null;
  }
  function Qu(e) {
    if (50 < su)
      throw su = 0, Bo = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ql = {};
  function Uv(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ot(e, t, n, l) {
    return new Uv(e, t, n, l);
  }
  function Mc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function dn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ot(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Or(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Vu(e, t, n, l, u, c) {
    var r = 0;
    if (l = e, typeof e == "function") Mc(e) && (r = 1);
    else if (typeof e == "string")
      r = B0(
        e,
        n,
        D.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Dt:
          return e = Ot(31, n, t, u), e.elementType = Dt, e.lanes = c, e;
        case Oe:
          return dl(n.children, u, c, t);
        case we:
          r = 8, u |= 24;
          break;
        case Ve:
          return e = Ot(12, n, t, u | 2), e.elementType = Ve, e.lanes = c, e;
        case be:
          return e = Ot(13, n, t, u), e.elementType = be, e.lanes = c, e;
        case Be:
          return e = Ot(19, n, t, u), e.elementType = Be, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case me:
                r = 10;
                break e;
              case He:
                r = 9;
                break e;
              case $:
                r = 11;
                break e;
              case te:
                r = 14;
                break e;
              case Le:
                r = 16, l = null;
                break e;
            }
          r = 29, n = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Ot(r, n, t, u), t.elementType = e, t.type = l, t.lanes = c, t;
  }
  function dl(e, t, n, l) {
    return e = Ot(7, e, l, t), e.lanes = n, e;
  }
  function wc(e, t, n) {
    return e = Ot(6, e, null, t), e.lanes = n, e;
  }
  function jr(e) {
    var t = Ot(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Cc(e, t, n) {
    return t = Ot(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Nr = /* @__PURE__ */ new WeakMap();
  function Bt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Nr.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: nl(t)
      }, Nr.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: nl(t)
    };
  }
  var Vl = [], Kl = 0, Ku = null, La = 0, Yt = [], kt = 0, Mn = null, en = 1, tn = "";
  function hn(e, t) {
    Vl[Kl++] = La, Vl[Kl++] = Ku, Ku = e, La = t;
  }
  function Mr(e, t, n) {
    Yt[kt++] = en, Yt[kt++] = tn, Yt[kt++] = Mn, Mn = e;
    var l = en;
    e = tn;
    var u = 32 - lt(l) - 1;
    l &= ~(1 << u), n += 1;
    var c = 32 - lt(t) + u;
    if (30 < c) {
      var r = u - u % 5;
      c = (l & (1 << r) - 1).toString(32), l >>= r, u -= r, en = 1 << 32 - lt(t) + u | n << u | l, tn = c + e;
    } else
      en = 1 << c | n << u | l, tn = e;
  }
  function Dc(e) {
    e.return !== null && (hn(e, 1), Mr(e, 1, 0));
  }
  function Uc(e) {
    for (; e === Ku; )
      Ku = Vl[--Kl], Vl[Kl] = null, La = Vl[--Kl], Vl[Kl] = null;
    for (; e === Mn; )
      Mn = Yt[--kt], Yt[kt] = null, tn = Yt[--kt], Yt[kt] = null, en = Yt[--kt], Yt[kt] = null;
  }
  function wr(e, t) {
    Yt[kt++] = en, Yt[kt++] = tn, Yt[kt++] = Mn, en = t.id, tn = t.overflow, Mn = e;
  }
  var it = null, Ce = null, he = !1, wn = null, Lt = !1, Rc = Error(s(519));
  function Cn(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ga(Bt(t, e)), Rc;
  }
  function Cr(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[ut] = e, t[vt] = l, n) {
      case "dialog":
        se("cancel", t), se("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        se("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < fu.length; n++)
          se(fu[n], t);
        break;
      case "source":
        se("error", t);
        break;
      case "img":
      case "image":
      case "link":
        se("error", t), se("load", t);
        break;
      case "details":
        se("toggle", t);
        break;
      case "input":
        se("invalid", t), Qs(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        se("invalid", t);
        break;
      case "textarea":
        se("invalid", t), Ks(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || Wd(t.textContent, n) ? (l.popover != null && (se("beforetoggle", t), se("toggle", t)), l.onScroll != null && se("scroll", t), l.onScrollEnd != null && se("scrollend", t), l.onClick != null && (t.onclick = rn), t = !0) : t = !1, t || Cn(e, !0);
  }
  function Dr(e) {
    for (it = e.return; it; )
      switch (it.tag) {
        case 5:
        case 31:
        case 13:
          Lt = !1;
          return;
        case 27:
        case 3:
          Lt = !0;
          return;
        default:
          it = it.return;
      }
  }
  function $l(e) {
    if (e !== it) return !1;
    if (!he) return Dr(e), he = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || es(e.type, e.memoizedProps)), n = !n), n && Ce && Cn(e), Dr(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      Ce = uh(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      Ce = uh(e);
    } else
      t === 27 ? (t = Ce, Vn(e.type) ? (e = us, us = null, Ce = e) : Ce = t) : Ce = it ? Xt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function hl() {
    Ce = it = null, he = !1;
  }
  function Zc() {
    var e = wn;
    return e !== null && (_t === null ? _t = e : _t.push.apply(
      _t,
      e
    ), wn = null), e;
  }
  function Ga(e) {
    wn === null ? wn = [e] : wn.push(e);
  }
  var qc = g(null), ml = null, mn = null;
  function Dn(e, t, n) {
    q(qc, t._currentValue), t._currentValue = n;
  }
  function vn(e) {
    e._currentValue = qc.current, M(qc);
  }
  function Hc(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Bc(e, t, n, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var r = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var d = c;
          c = u;
          for (var y = 0; y < t.length; y++)
            if (d.context === t[y]) {
              c.lanes |= n, d = c.alternate, d !== null && (d.lanes |= n), Hc(
                c.return,
                n,
                e
              ), l || (r = null);
              break e;
            }
          c = d.next;
        }
      } else if (u.tag === 18) {
        if (r = u.return, r === null) throw Error(s(341));
        r.lanes |= n, c = r.alternate, c !== null && (c.lanes |= n), Hc(r, n, e), r = null;
      } else r = u.child;
      if (r !== null) r.return = u;
      else
        for (r = u; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          if (u = r.sibling, u !== null) {
            u.return = r.return, r = u;
            break;
          }
          r = r.return;
        }
      u = r;
    }
  }
  function Jl(e, t, n, l) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var r = u.alternate;
        if (r === null) throw Error(s(387));
        if (r = r.memoizedProps, r !== null) {
          var d = u.type;
          At(u.pendingProps.value, r.value) || (e !== null ? e.push(d) : e = [d]);
        }
      } else if (u === ce.current) {
        if (r = u.alternate, r === null) throw Error(s(387));
        r.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(yu) : e = [yu]);
      }
      u = u.return;
    }
    e !== null && Bc(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function $u(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!At(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function vl(e) {
    ml = e, mn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ct(e) {
    return Ur(ml, e);
  }
  function Ju(e, t) {
    return ml === null && vl(e), Ur(e, t);
  }
  function Ur(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, mn === null) {
      if (e === null) throw Error(s(308));
      mn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else mn = mn.next = t;
    return n;
  }
  var Rv = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Zv = a.unstable_scheduleCallback, qv = a.unstable_NormalPriority, Ke = {
    $$typeof: me,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Yc() {
    return {
      controller: new Rv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Xa(e) {
    e.refCount--, e.refCount === 0 && Zv(qv, function() {
      e.controller.abort();
    });
  }
  var Qa = null, kc = 0, Wl = 0, Fl = null;
  function Hv(e, t) {
    if (Qa === null) {
      var n = Qa = [];
      kc = 0, Wl = Qo(), Fl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return kc++, t.then(Rr, Rr), t;
  }
  function Rr() {
    if (--kc === 0 && Qa !== null) {
      Fl !== null && (Fl.status = "fulfilled");
      var e = Qa;
      Qa = null, Wl = 0, Fl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Bv(e, t) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var u = 0; u < n.length; u++) (0, n[u])(t);
      },
      function(u) {
        for (l.status = "rejected", l.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), l;
  }
  var Zr = O.S;
  O.S = function(e, t) {
    _d = ft(), typeof t == "object" && t !== null && typeof t.then == "function" && Hv(e, t), Zr !== null && Zr(e, t);
  };
  var yl = g(null);
  function Lc() {
    var e = yl.current;
    return e !== null ? e : je.pooledCache;
  }
  function Wu(e, t) {
    t === null ? q(yl, yl.current) : q(yl, t.pool);
  }
  function qr() {
    var e = Lc();
    return e === null ? null : { parent: Ke._currentValue, pool: e };
  }
  var Il = Error(s(460)), Gc = Error(s(474)), Fu = Error(s(542)), Iu = { then: function() {
  } };
  function Hr(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Br(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(rn, rn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, kr(e), e;
      default:
        if (typeof t.status == "string") t.then(rn, rn);
        else {
          if (e = je, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, kr(e), e;
        }
        throw gl = t, Il;
    }
  }
  function pl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (gl = n, Il) : n;
    }
  }
  var gl = null;
  function Yr() {
    if (gl === null) throw Error(s(459));
    var e = gl;
    return gl = null, e;
  }
  function kr(e) {
    if (e === Il || e === Fu)
      throw Error(s(483));
  }
  var Pl = null, Va = 0;
  function Pu(e) {
    var t = Va;
    return Va += 1, Pl === null && (Pl = []), Br(Pl, e, t);
  }
  function Ka(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ei(e, t) {
    throw t.$$typeof === L ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Lr(e) {
    function t(_, b) {
      if (e) {
        var x = _.deletions;
        x === null ? (_.deletions = [b], _.flags |= 16) : x.push(b);
      }
    }
    function n(_, b) {
      if (!e) return null;
      for (; b !== null; )
        t(_, b), b = b.sibling;
      return null;
    }
    function l(_) {
      for (var b = /* @__PURE__ */ new Map(); _ !== null; )
        _.key !== null ? b.set(_.key, _) : b.set(_.index, _), _ = _.sibling;
      return b;
    }
    function u(_, b) {
      return _ = dn(_, b), _.index = 0, _.sibling = null, _;
    }
    function c(_, b, x) {
      return _.index = x, e ? (x = _.alternate, x !== null ? (x = x.index, x < b ? (_.flags |= 67108866, b) : x) : (_.flags |= 67108866, b)) : (_.flags |= 1048576, b);
    }
    function r(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function d(_, b, x, N) {
      return b === null || b.tag !== 6 ? (b = wc(x, _.mode, N), b.return = _, b) : (b = u(b, x), b.return = _, b);
    }
    function y(_, b, x, N) {
      var Q = x.type;
      return Q === Oe ? j(
        _,
        b,
        x.props.children,
        N,
        x.key
      ) : b !== null && (b.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Le && pl(Q) === b.type) ? (b = u(b, x.props), Ka(b, x), b.return = _, b) : (b = Vu(
        x.type,
        x.key,
        x.props,
        null,
        _.mode,
        N
      ), Ka(b, x), b.return = _, b);
    }
    function z(_, b, x, N) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== x.containerInfo || b.stateNode.implementation !== x.implementation ? (b = Cc(x, _.mode, N), b.return = _, b) : (b = u(b, x.children || []), b.return = _, b);
    }
    function j(_, b, x, N, Q) {
      return b === null || b.tag !== 7 ? (b = dl(
        x,
        _.mode,
        N,
        Q
      ), b.return = _, b) : (b = u(b, x), b.return = _, b);
    }
    function w(_, b, x) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = wc(
          "" + b,
          _.mode,
          x
        ), b.return = _, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case ee:
            return x = Vu(
              b.type,
              b.key,
              b.props,
              null,
              _.mode,
              x
            ), Ka(x, b), x.return = _, x;
          case de:
            return b = Cc(
              b,
              _.mode,
              x
            ), b.return = _, b;
          case Le:
            return b = pl(b), w(_, b, x);
        }
        if (Pe(b) || Ie(b))
          return b = dl(
            b,
            _.mode,
            x,
            null
          ), b.return = _, b;
        if (typeof b.then == "function")
          return w(_, Pu(b), x);
        if (b.$$typeof === me)
          return w(
            _,
            Ju(_, b),
            x
          );
        ei(_, b);
      }
      return null;
    }
    function E(_, b, x, N) {
      var Q = b !== null ? b.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return Q !== null ? null : d(_, b, "" + x, N);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ee:
            return x.key === Q ? y(_, b, x, N) : null;
          case de:
            return x.key === Q ? z(_, b, x, N) : null;
          case Le:
            return x = pl(x), E(_, b, x, N);
        }
        if (Pe(x) || Ie(x))
          return Q !== null ? null : j(_, b, x, N, null);
        if (typeof x.then == "function")
          return E(
            _,
            b,
            Pu(x),
            N
          );
        if (x.$$typeof === me)
          return E(
            _,
            b,
            Ju(_, x),
            N
          );
        ei(_, x);
      }
      return null;
    }
    function A(_, b, x, N, Q) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return _ = _.get(x) || null, d(b, _, "" + N, Q);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case ee:
            return _ = _.get(
              N.key === null ? x : N.key
            ) || null, y(b, _, N, Q);
          case de:
            return _ = _.get(
              N.key === null ? x : N.key
            ) || null, z(b, _, N, Q);
          case Le:
            return N = pl(N), A(
              _,
              b,
              x,
              N,
              Q
            );
        }
        if (Pe(N) || Ie(N))
          return _ = _.get(x) || null, j(b, _, N, Q, null);
        if (typeof N.then == "function")
          return A(
            _,
            b,
            x,
            Pu(N),
            Q
          );
        if (N.$$typeof === me)
          return A(
            _,
            b,
            x,
            Ju(b, N),
            Q
          );
        ei(b, N);
      }
      return null;
    }
    function k(_, b, x, N) {
      for (var Q = null, ye = null, G = b, ae = b = 0, fe = null; G !== null && ae < x.length; ae++) {
        G.index > ae ? (fe = G, G = null) : fe = G.sibling;
        var pe = E(
          _,
          G,
          x[ae],
          N
        );
        if (pe === null) {
          G === null && (G = fe);
          break;
        }
        e && G && pe.alternate === null && t(_, G), b = c(pe, b, ae), ye === null ? Q = pe : ye.sibling = pe, ye = pe, G = fe;
      }
      if (ae === x.length)
        return n(_, G), he && hn(_, ae), Q;
      if (G === null) {
        for (; ae < x.length; ae++)
          G = w(_, x[ae], N), G !== null && (b = c(
            G,
            b,
            ae
          ), ye === null ? Q = G : ye.sibling = G, ye = G);
        return he && hn(_, ae), Q;
      }
      for (G = l(G); ae < x.length; ae++)
        fe = A(
          G,
          _,
          ae,
          x[ae],
          N
        ), fe !== null && (e && fe.alternate !== null && G.delete(
          fe.key === null ? ae : fe.key
        ), b = c(
          fe,
          b,
          ae
        ), ye === null ? Q = fe : ye.sibling = fe, ye = fe);
      return e && G.forEach(function(Fn) {
        return t(_, Fn);
      }), he && hn(_, ae), Q;
    }
    function W(_, b, x, N) {
      if (x == null) throw Error(s(151));
      for (var Q = null, ye = null, G = b, ae = b = 0, fe = null, pe = x.next(); G !== null && !pe.done; ae++, pe = x.next()) {
        G.index > ae ? (fe = G, G = null) : fe = G.sibling;
        var Fn = E(_, G, pe.value, N);
        if (Fn === null) {
          G === null && (G = fe);
          break;
        }
        e && G && Fn.alternate === null && t(_, G), b = c(Fn, b, ae), ye === null ? Q = Fn : ye.sibling = Fn, ye = Fn, G = fe;
      }
      if (pe.done)
        return n(_, G), he && hn(_, ae), Q;
      if (G === null) {
        for (; !pe.done; ae++, pe = x.next())
          pe = w(_, pe.value, N), pe !== null && (b = c(pe, b, ae), ye === null ? Q = pe : ye.sibling = pe, ye = pe);
        return he && hn(_, ae), Q;
      }
      for (G = l(G); !pe.done; ae++, pe = x.next())
        pe = A(G, _, ae, pe.value, N), pe !== null && (e && pe.alternate !== null && G.delete(pe.key === null ? ae : pe.key), b = c(pe, b, ae), ye === null ? Q = pe : ye.sibling = pe, ye = pe);
      return e && G.forEach(function(W0) {
        return t(_, W0);
      }), he && hn(_, ae), Q;
    }
    function Ae(_, b, x, N) {
      if (typeof x == "object" && x !== null && x.type === Oe && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case ee:
            e: {
              for (var Q = x.key; b !== null; ) {
                if (b.key === Q) {
                  if (Q = x.type, Q === Oe) {
                    if (b.tag === 7) {
                      n(
                        _,
                        b.sibling
                      ), N = u(
                        b,
                        x.props.children
                      ), N.return = _, _ = N;
                      break e;
                    }
                  } else if (b.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Le && pl(Q) === b.type) {
                    n(
                      _,
                      b.sibling
                    ), N = u(b, x.props), Ka(N, x), N.return = _, _ = N;
                    break e;
                  }
                  n(_, b);
                  break;
                } else t(_, b);
                b = b.sibling;
              }
              x.type === Oe ? (N = dl(
                x.props.children,
                _.mode,
                N,
                x.key
              ), N.return = _, _ = N) : (N = Vu(
                x.type,
                x.key,
                x.props,
                null,
                _.mode,
                N
              ), Ka(N, x), N.return = _, _ = N);
            }
            return r(_);
          case de:
            e: {
              for (Q = x.key; b !== null; ) {
                if (b.key === Q)
                  if (b.tag === 4 && b.stateNode.containerInfo === x.containerInfo && b.stateNode.implementation === x.implementation) {
                    n(
                      _,
                      b.sibling
                    ), N = u(b, x.children || []), N.return = _, _ = N;
                    break e;
                  } else {
                    n(_, b);
                    break;
                  }
                else t(_, b);
                b = b.sibling;
              }
              N = Cc(x, _.mode, N), N.return = _, _ = N;
            }
            return r(_);
          case Le:
            return x = pl(x), Ae(
              _,
              b,
              x,
              N
            );
        }
        if (Pe(x))
          return k(
            _,
            b,
            x,
            N
          );
        if (Ie(x)) {
          if (Q = Ie(x), typeof Q != "function") throw Error(s(150));
          return x = Q.call(x), W(
            _,
            b,
            x,
            N
          );
        }
        if (typeof x.then == "function")
          return Ae(
            _,
            b,
            Pu(x),
            N
          );
        if (x.$$typeof === me)
          return Ae(
            _,
            b,
            Ju(_, x),
            N
          );
        ei(_, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, b !== null && b.tag === 6 ? (n(_, b.sibling), N = u(b, x), N.return = _, _ = N) : (n(_, b), N = wc(x, _.mode, N), N.return = _, _ = N), r(_)) : n(_, b);
    }
    return function(_, b, x, N) {
      try {
        Va = 0;
        var Q = Ae(
          _,
          b,
          x,
          N
        );
        return Pl = null, Q;
      } catch (G) {
        if (G === Il || G === Fu) throw G;
        var ye = Ot(29, G, null, _.mode);
        return ye.lanes = N, ye.return = _, ye;
      }
    };
  }
  var bl = Lr(!0), Gr = Lr(!1), Un = !1;
  function Xc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Qc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Rn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Zn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ge & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Qu(e), Ar(e, null, n), t;
    }
    return Xu(e, l, t, n), Qu(e);
  }
  function $a(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, I(e, n);
    }
  }
  function Vc(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var u = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var r = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = r : c = c.next = r, n = n.next;
        } while (n !== null);
        c === null ? u = c = t : c = c.next = t;
      } else u = c = t;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Kc = !1;
  function Ja() {
    if (Kc) {
      var e = Fl;
      if (e !== null) throw e;
    }
  }
  function Wa(e, t, n, l) {
    Kc = !1;
    var u = e.updateQueue;
    Un = !1;
    var c = u.firstBaseUpdate, r = u.lastBaseUpdate, d = u.shared.pending;
    if (d !== null) {
      u.shared.pending = null;
      var y = d, z = y.next;
      y.next = null, r === null ? c = z : r.next = z, r = y;
      var j = e.alternate;
      j !== null && (j = j.updateQueue, d = j.lastBaseUpdate, d !== r && (d === null ? j.firstBaseUpdate = z : d.next = z, j.lastBaseUpdate = y));
    }
    if (c !== null) {
      var w = u.baseState;
      r = 0, j = z = y = null, d = c;
      do {
        var E = d.lane & -536870913, A = E !== d.lane;
        if (A ? (re & E) === E : (l & E) === E) {
          E !== 0 && E === Wl && (Kc = !0), j !== null && (j = j.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var k = e, W = d;
            E = t;
            var Ae = n;
            switch (W.tag) {
              case 1:
                if (k = W.payload, typeof k == "function") {
                  w = k.call(Ae, w, E);
                  break e;
                }
                w = k;
                break e;
              case 3:
                k.flags = k.flags & -65537 | 128;
              case 0:
                if (k = W.payload, E = typeof k == "function" ? k.call(Ae, w, E) : k, E == null) break e;
                w = U({}, w, E);
                break e;
              case 2:
                Un = !0;
            }
          }
          E = d.callback, E !== null && (e.flags |= 64, A && (e.flags |= 8192), A = u.callbacks, A === null ? u.callbacks = [E] : A.push(E));
        } else
          A = {
            lane: E,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, j === null ? (z = j = A, y = w) : j = j.next = A, r |= E;
        if (d = d.next, d === null) {
          if (d = u.shared.pending, d === null)
            break;
          A = d, d = A.next, A.next = null, u.lastBaseUpdate = A, u.shared.pending = null;
        }
      } while (!0);
      j === null && (y = w), u.baseState = y, u.firstBaseUpdate = z, u.lastBaseUpdate = j, c === null && (u.shared.lanes = 0), kn |= r, e.lanes = r, e.memoizedState = w;
    }
  }
  function Xr(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Qr(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Xr(n[e], t);
  }
  var ea = g(null), ti = g(0);
  function Vr(e, t) {
    e = En, q(ti, e), q(ea, t), En = e | t.baseLanes;
  }
  function $c() {
    q(ti, En), q(ea, ea.current);
  }
  function Jc() {
    En = ti.current, M(ea), M(ti);
  }
  var jt = g(null), Gt = null;
  function qn(e) {
    var t = e.alternate;
    q(Ge, Ge.current & 1), q(jt, e), Gt === null && (t === null || ea.current !== null || t.memoizedState !== null) && (Gt = e);
  }
  function Wc(e) {
    q(Ge, Ge.current), q(jt, e), Gt === null && (Gt = e);
  }
  function Kr(e) {
    e.tag === 22 ? (q(Ge, Ge.current), q(jt, e), Gt === null && (Gt = e)) : Hn();
  }
  function Hn() {
    q(Ge, Ge.current), q(jt, jt.current);
  }
  function Nt(e) {
    M(jt), Gt === e && (Gt = null), M(Ge);
  }
  var Ge = g(0);
  function ni(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || ls(n) || as(n)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var yn = 0, le = null, Ee = null, $e = null, li = !1, ta = !1, _l = !1, ai = 0, Fa = 0, na = null, Yv = 0;
  function Ye() {
    throw Error(s(321));
  }
  function Fc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!At(e[n], t[n])) return !1;
    return !0;
  }
  function Ic(e, t, n, l, u, c) {
    return yn = c, le = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? wf : mo, _l = !1, c = n(l, u), _l = !1, ta && (c = Jr(
      t,
      n,
      l,
      u
    )), $r(e), c;
  }
  function $r(e) {
    O.H = eu;
    var t = Ee !== null && Ee.next !== null;
    if (yn = 0, $e = Ee = le = null, li = !1, Fa = 0, na = null, t) throw Error(s(300));
    e === null || Je || (e = e.dependencies, e !== null && $u(e) && (Je = !0));
  }
  function Jr(e, t, n, l) {
    le = e;
    var u = 0;
    do {
      if (ta && (na = null), Fa = 0, ta = !1, 25 <= u) throw Error(s(301));
      if (u += 1, $e = Ee = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      O.H = Cf, c = t(n, l);
    } while (ta);
    return c;
  }
  function kv() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ia(t) : t, e = e.useState()[0], (Ee !== null ? Ee.memoizedState : null) !== e && (le.flags |= 1024), t;
  }
  function Pc() {
    var e = ai !== 0;
    return ai = 0, e;
  }
  function eo(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function to(e) {
    if (li) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      li = !1;
    }
    yn = 0, $e = Ee = le = null, ta = !1, Fa = ai = 0, na = null;
  }
  function mt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $e === null ? le.memoizedState = $e = e : $e = $e.next = e, $e;
  }
  function Xe() {
    if (Ee === null) {
      var e = le.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ee.next;
    var t = $e === null ? le.memoizedState : $e.next;
    if (t !== null)
      $e = t, Ee = e;
    else {
      if (e === null)
        throw le.alternate === null ? Error(s(467)) : Error(s(310));
      Ee = e, e = {
        memoizedState: Ee.memoizedState,
        baseState: Ee.baseState,
        baseQueue: Ee.baseQueue,
        queue: Ee.queue,
        next: null
      }, $e === null ? le.memoizedState = $e = e : $e = $e.next = e;
    }
    return $e;
  }
  function ui() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ia(e) {
    var t = Fa;
    return Fa += 1, na === null && (na = []), e = Br(na, e, t), t = le, ($e === null ? t.memoizedState : $e.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? wf : mo), e;
  }
  function ii(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ia(e);
      if (e.$$typeof === me) return ct(e);
    }
    throw Error(s(438, String(e)));
  }
  function no(e) {
    var t = null, n = le.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = le.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = ui(), le.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = Wt;
    return t.index++, n;
  }
  function pn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ci(e) {
    var t = Xe();
    return lo(t, Ee, e);
  }
  function lo(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(s(311));
    l.lastRenderedReducer = n;
    var u = e.baseQueue, c = l.pending;
    if (c !== null) {
      if (u !== null) {
        var r = u.next;
        u.next = c.next, c.next = r;
      }
      t.baseQueue = u = c, l.pending = null;
    }
    if (c = e.baseState, u === null) e.memoizedState = c;
    else {
      t = u.next;
      var d = r = null, y = null, z = t, j = !1;
      do {
        var w = z.lane & -536870913;
        if (w !== z.lane ? (re & w) === w : (yn & w) === w) {
          var E = z.revertLane;
          if (E === 0)
            y !== null && (y = y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }), w === Wl && (j = !0);
          else if ((yn & E) === E) {
            z = z.next, E === Wl && (j = !0);
            continue;
          } else
            w = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, y === null ? (d = y = w, r = c) : y = y.next = w, le.lanes |= E, kn |= E;
          w = z.action, _l && n(c, w), c = z.hasEagerState ? z.eagerState : n(c, w);
        } else
          E = {
            lane: w,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, y === null ? (d = y = E, r = c) : y = y.next = E, le.lanes |= w, kn |= w;
        z = z.next;
      } while (z !== null && z !== t);
      if (y === null ? r = c : y.next = d, !At(c, e.memoizedState) && (Je = !0, j && (n = Fl, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = r, e.baseQueue = y, l.lastRenderedState = c;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function ao(e) {
    var t = Xe(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, u = n.pending, c = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var r = u = u.next;
      do
        c = e(c, r.action), r = r.next;
      while (r !== u);
      At(c, t.memoizedState) || (Je = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, l];
  }
  function Wr(e, t, n) {
    var l = le, u = Xe(), c = he;
    if (c) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else n = t();
    var r = !At(
      (Ee || u).memoizedState,
      n
    );
    if (r && (u.memoizedState = n, Je = !0), u = u.queue, co(Pr.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || r || $e !== null && $e.memoizedState.tag & 1) {
      if (l.flags |= 2048, la(
        9,
        { destroy: void 0 },
        Ir.bind(
          null,
          l,
          u,
          n,
          t
        ),
        null
      ), je === null) throw Error(s(349));
      c || (yn & 127) !== 0 || Fr(l, t, n);
    }
    return n;
  }
  function Fr(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = le.updateQueue, t === null ? (t = ui(), le.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Ir(e, t, n, l) {
    t.value = n, t.getSnapshot = l, ef(t) && tf(e);
  }
  function Pr(e, t, n) {
    return n(function() {
      ef(t) && tf(e);
    });
  }
  function ef(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !At(e, n);
    } catch {
      return !0;
    }
  }
  function tf(e) {
    var t = fl(e, 2);
    t !== null && St(t, e, 2);
  }
  function uo(e) {
    var t = mt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), _l) {
        Pt(!0);
        try {
          n();
        } finally {
          Pt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: pn,
      lastRenderedState: e
    }, t;
  }
  function nf(e, t, n, l) {
    return e.baseState = n, lo(
      e,
      Ee,
      typeof l == "function" ? l : pn
    );
  }
  function Lv(e, t, n, l, u) {
    if (ri(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(r) {
          c.listeners.push(r);
        }
      };
      O.T !== null ? n(!0) : c.isTransition = !1, l(c), n = t.pending, n === null ? (c.next = t.pending = c, lf(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function lf(e, t) {
    var n = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var c = O.T, r = {};
      O.T = r;
      try {
        var d = n(u, l), y = O.S;
        y !== null && y(r, d), af(e, t, d);
      } catch (z) {
        io(e, t, z);
      } finally {
        c !== null && r.types !== null && (c.types = r.types), O.T = c;
      }
    } else
      try {
        c = n(u, l), af(e, t, c);
      } catch (z) {
        io(e, t, z);
      }
  }
  function af(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        uf(e, t, l);
      },
      function(l) {
        return io(e, t, l);
      }
    ) : uf(e, t, n);
  }
  function uf(e, t, n) {
    t.status = "fulfilled", t.value = n, cf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, lf(e, n)));
  }
  function io(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, cf(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function cf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function of(e, t) {
    return t;
  }
  function sf(e, t) {
    if (he) {
      var n = je.formState;
      if (n !== null) {
        e: {
          var l = le;
          if (he) {
            if (Ce) {
              t: {
                for (var u = Ce, c = Lt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (u = Xt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                Ce = Xt(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Cn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = mt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: of,
      lastRenderedState: t
    }, n.queue = l, n = jf.bind(
      null,
      le,
      l
    ), l.dispatch = n, l = uo(!1), c = ho.bind(
      null,
      le,
      !1,
      l.queue
    ), l = mt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, n = Lv.bind(
      null,
      le,
      u,
      c,
      n
    ), u.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function rf(e) {
    var t = Xe();
    return ff(t, Ee, e);
  }
  function ff(e, t, n) {
    if (t = lo(
      e,
      t,
      of
    )[0], e = ci(pn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Ia(t);
      } catch (r) {
        throw r === Il ? Fu : r;
      }
    else l = t;
    t = Xe();
    var u = t.queue, c = u.dispatch;
    return n !== t.memoizedState && (le.flags |= 2048, la(
      9,
      { destroy: void 0 },
      Gv.bind(null, u, n),
      null
    )), [l, c, e];
  }
  function Gv(e, t) {
    e.action = t;
  }
  function df(e) {
    var t = Xe(), n = Ee;
    if (n !== null)
      return ff(t, n, e);
    Xe(), t = t.memoizedState, n = Xe();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function la(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = le.updateQueue, t === null && (t = ui(), le.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function hf() {
    return Xe().memoizedState;
  }
  function oi(e, t, n, l) {
    var u = mt();
    le.flags |= e, u.memoizedState = la(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function si(e, t, n, l) {
    var u = Xe();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    Ee !== null && l !== null && Fc(l, Ee.memoizedState.deps) ? u.memoizedState = la(t, c, n, l) : (le.flags |= e, u.memoizedState = la(
      1 | t,
      c,
      n,
      l
    ));
  }
  function mf(e, t) {
    oi(8390656, 8, e, t);
  }
  function co(e, t) {
    si(2048, 8, e, t);
  }
  function Xv(e) {
    le.flags |= 4;
    var t = le.updateQueue;
    if (t === null)
      t = ui(), le.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function vf(e) {
    var t = Xe().memoizedState;
    return Xv({ ref: t, nextImpl: e }), function() {
      if ((ge & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function yf(e, t) {
    return si(4, 2, e, t);
  }
  function pf(e, t) {
    return si(4, 4, e, t);
  }
  function gf(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function bf(e, t, n) {
    n = n != null ? n.concat([e]) : null, si(4, 4, gf.bind(null, t, e), n);
  }
  function oo() {
  }
  function _f(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && Fc(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function Sf(e, t) {
    var n = Xe();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && Fc(t, l[1]))
      return l[0];
    if (l = e(), _l) {
      Pt(!0);
      try {
        e();
      } finally {
        Pt(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function so(e, t, n) {
    return n === void 0 || (yn & 1073741824) !== 0 && (re & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = xd(), le.lanes |= e, kn |= e, n);
  }
  function xf(e, t, n, l) {
    return At(n, t) ? n : ea.current !== null ? (e = so(e, n, l), At(e, t) || (Je = !0), e) : (yn & 42) === 0 || (yn & 1073741824) !== 0 && (re & 261930) === 0 ? (Je = !0, e.memoizedState = n) : (e = xd(), le.lanes |= e, kn |= e, t);
  }
  function zf(e, t, n, l, u) {
    var c = H.p;
    H.p = c !== 0 && 8 > c ? c : 8;
    var r = O.T, d = {};
    O.T = d, ho(e, !1, t, n);
    try {
      var y = u(), z = O.S;
      if (z !== null && z(d, y), y !== null && typeof y == "object" && typeof y.then == "function") {
        var j = Bv(
          y,
          l
        );
        Pa(
          e,
          t,
          j,
          Ct(e)
        );
      } else
        Pa(
          e,
          t,
          l,
          Ct(e)
        );
    } catch (w) {
      Pa(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: w },
        Ct()
      );
    } finally {
      H.p = c, r !== null && d.types !== null && (r.types = d.types), O.T = r;
    }
  }
  function Qv() {
  }
  function ro(e, t, n, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Ef(e).queue;
    zf(
      e,
      u,
      t,
      X,
      n === null ? Qv : function() {
        return Tf(e), n(l);
      }
    );
  }
  function Ef(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: X,
      baseState: X,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: X
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: pn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Tf(e) {
    var t = Ef(e);
    t.next === null && (t = e.alternate.memoizedState), Pa(
      e,
      t.next.queue,
      {},
      Ct()
    );
  }
  function fo() {
    return ct(yu);
  }
  function Af() {
    return Xe().memoizedState;
  }
  function Of() {
    return Xe().memoizedState;
  }
  function Vv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Ct();
          e = Rn(n);
          var l = Zn(t, e, n);
          l !== null && (St(l, t, n), $a(l, t, n)), t = { cache: Yc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Kv(e, t, n) {
    var l = Ct();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ri(e) ? Nf(t, n) : (n = Nc(e, t, n, l), n !== null && (St(n, e, l), Mf(n, t, l)));
  }
  function jf(e, t, n) {
    var l = Ct();
    Pa(e, t, n, l);
  }
  function Pa(e, t, n, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ri(e)) Nf(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var r = t.lastRenderedState, d = c(r, n);
          if (u.hasEagerState = !0, u.eagerState = d, At(d, r))
            return Xu(e, t, u, 0), je === null && Gu(), !1;
        } catch {
        }
      if (n = Nc(e, t, u, l), n !== null)
        return St(n, e, l), Mf(n, t, l), !0;
    }
    return !1;
  }
  function ho(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Qo(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ri(e)) {
      if (t) throw Error(s(479));
    } else
      t = Nc(
        e,
        n,
        l,
        2
      ), t !== null && St(t, e, 2);
  }
  function ri(e) {
    var t = e.alternate;
    return e === le || t !== null && t === le;
  }
  function Nf(e, t) {
    ta = li = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Mf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, I(e, n);
    }
  }
  var eu = {
    readContext: ct,
    use: ii,
    useCallback: Ye,
    useContext: Ye,
    useEffect: Ye,
    useImperativeHandle: Ye,
    useLayoutEffect: Ye,
    useInsertionEffect: Ye,
    useMemo: Ye,
    useReducer: Ye,
    useRef: Ye,
    useState: Ye,
    useDebugValue: Ye,
    useDeferredValue: Ye,
    useTransition: Ye,
    useSyncExternalStore: Ye,
    useId: Ye,
    useHostTransitionStatus: Ye,
    useFormState: Ye,
    useActionState: Ye,
    useOptimistic: Ye,
    useMemoCache: Ye,
    useCacheRefresh: Ye
  };
  eu.useEffectEvent = Ye;
  var wf = {
    readContext: ct,
    use: ii,
    useCallback: function(e, t) {
      return mt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: ct,
    useEffect: mf,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, oi(
        4194308,
        4,
        gf.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return oi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      oi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = mt();
      t = t === void 0 ? null : t;
      var l = e();
      if (_l) {
        Pt(!0);
        try {
          e();
        } finally {
          Pt(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = mt();
      if (n !== void 0) {
        var u = n(t);
        if (_l) {
          Pt(!0);
          try {
            n(t);
          } finally {
            Pt(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = Kv.bind(
        null,
        le,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = mt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = uo(e);
      var t = e.queue, n = jf.bind(null, le, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: oo,
    useDeferredValue: function(e, t) {
      var n = mt();
      return so(n, e, t);
    },
    useTransition: function() {
      var e = uo(!1);
      return e = zf.bind(
        null,
        le,
        e.queue,
        !0,
        !1
      ), mt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = le, u = mt();
      if (he) {
        if (n === void 0)
          throw Error(s(407));
        n = n();
      } else {
        if (n = t(), je === null)
          throw Error(s(349));
        (re & 127) !== 0 || Fr(l, t, n);
      }
      u.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return u.queue = c, mf(Pr.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, la(
        9,
        { destroy: void 0 },
        Ir.bind(
          null,
          l,
          c,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = mt(), t = je.identifierPrefix;
      if (he) {
        var n = tn, l = en;
        n = (l & ~(1 << 32 - lt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ai++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Yv++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: fo,
    useFormState: sf,
    useActionState: sf,
    useOptimistic: function(e) {
      var t = mt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = ho.bind(
        null,
        le,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: no,
    useCacheRefresh: function() {
      return mt().memoizedState = Vv.bind(
        null,
        le
      );
    },
    useEffectEvent: function(e) {
      var t = mt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((ge & 2) !== 0)
          throw Error(s(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, mo = {
    readContext: ct,
    use: ii,
    useCallback: _f,
    useContext: ct,
    useEffect: co,
    useImperativeHandle: bf,
    useInsertionEffect: yf,
    useLayoutEffect: pf,
    useMemo: Sf,
    useReducer: ci,
    useRef: hf,
    useState: function() {
      return ci(pn);
    },
    useDebugValue: oo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return xf(
        n,
        Ee.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ci(pn)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ia(e),
        t
      ];
    },
    useSyncExternalStore: Wr,
    useId: Af,
    useHostTransitionStatus: fo,
    useFormState: rf,
    useActionState: rf,
    useOptimistic: function(e, t) {
      var n = Xe();
      return nf(n, Ee, e, t);
    },
    useMemoCache: no,
    useCacheRefresh: Of
  };
  mo.useEffectEvent = vf;
  var Cf = {
    readContext: ct,
    use: ii,
    useCallback: _f,
    useContext: ct,
    useEffect: co,
    useImperativeHandle: bf,
    useInsertionEffect: yf,
    useLayoutEffect: pf,
    useMemo: Sf,
    useReducer: ao,
    useRef: hf,
    useState: function() {
      return ao(pn);
    },
    useDebugValue: oo,
    useDeferredValue: function(e, t) {
      var n = Xe();
      return Ee === null ? so(n, e, t) : xf(
        n,
        Ee.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ao(pn)[0], t = Xe().memoizedState;
      return [
        typeof e == "boolean" ? e : Ia(e),
        t
      ];
    },
    useSyncExternalStore: Wr,
    useId: Af,
    useHostTransitionStatus: fo,
    useFormState: df,
    useActionState: df,
    useOptimistic: function(e, t) {
      var n = Xe();
      return Ee !== null ? nf(n, Ee, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: no,
    useCacheRefresh: Of
  };
  Cf.useEffectEvent = vf;
  function vo(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : U({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var yo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = Ct(), u = Rn(l);
      u.payload = t, n != null && (u.callback = n), t = Zn(e, u, l), t !== null && (St(t, e, l), $a(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = Ct(), u = Rn(l);
      u.tag = 1, u.payload = t, n != null && (u.callback = n), t = Zn(e, u, l), t !== null && (St(t, e, l), $a(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Ct(), l = Rn(n);
      l.tag = 2, t != null && (l.callback = t), t = Zn(e, l, n), t !== null && (St(t, e, n), $a(t, e, n));
    }
  };
  function Df(e, t, n, l, u, c, r) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, r) : t.prototype && t.prototype.isPureReactComponent ? !Ya(n, l) || !Ya(u, c) : !0;
  }
  function Uf(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && yo.enqueueReplaceState(t, t.state, null);
  }
  function Sl(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = U({}, n));
      for (var u in e)
        n[u] === void 0 && (n[u] = e[u]);
    }
    return n;
  }
  function Rf(e) {
    Lu(e);
  }
  function Zf(e) {
    console.error(e);
  }
  function qf(e) {
    Lu(e);
  }
  function fi(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Hf(e, t, n) {
    try {
      var l = e.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function po(e, t, n) {
    return n = Rn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      fi(e, t);
    }, n;
  }
  function Bf(e) {
    return e = Rn(e), e.tag = 3, e;
  }
  function Yf(e, t, n, l) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        Hf(t, n, l);
      };
    }
    var r = n.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (e.callback = function() {
      Hf(t, n, l), typeof u != "function" && (Ln === null ? Ln = /* @__PURE__ */ new Set([this]) : Ln.add(this));
      var d = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function $v(e, t, n, l, u) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Jl(
        t,
        n,
        u,
        !0
      ), n = jt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Gt === null ? zi() : n.alternate === null && ke === 0 && (ke = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, l === Iu ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Lo(e, l, u)), !1;
          case 22:
            return n.flags |= 65536, l === Iu ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Lo(e, l, u)), !1;
        }
        throw Error(s(435, n.tag));
      }
      return Lo(e, l, u), zi(), !1;
    }
    if (he)
      return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== Rc && (e = Error(s(422), { cause: l }), Ga(Bt(e, n)))) : (l !== Rc && (t = Error(s(423), {
        cause: l
      }), Ga(
        Bt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Bt(l, n), u = po(
        e.stateNode,
        l,
        u
      ), Vc(e, u), ke !== 4 && (ke = 2)), !1;
    var c = Error(s(520), { cause: l });
    if (c = Bt(c, n), ou === null ? ou = [c] : ou.push(c), ke !== 4 && (ke = 2), t === null) return !0;
    l = Bt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = u & -u, n.lanes |= e, e = po(n.stateNode, l, e), Vc(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Ln === null || !Ln.has(c))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = Bf(u), Yf(
              u,
              e,
              n,
              l
            ), Vc(n, u), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var go = Error(s(461)), Je = !1;
  function ot(e, t, n, l) {
    t.child = e === null ? Gr(t, null, n, l) : bl(
      t,
      e.child,
      n,
      l
    );
  }
  function kf(e, t, n, l, u) {
    n = n.render;
    var c = t.ref;
    if ("ref" in l) {
      var r = {};
      for (var d in l)
        d !== "ref" && (r[d] = l[d]);
    } else r = l;
    return vl(t), l = Ic(
      e,
      t,
      n,
      r,
      c,
      u
    ), d = Pc(), e !== null && !Je ? (eo(e, t, u), gn(e, t, u)) : (he && d && Dc(t), t.flags |= 1, ot(e, t, l, u), t.child);
  }
  function Lf(e, t, n, l, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !Mc(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, Gf(
        e,
        t,
        c,
        l,
        u
      )) : (e = Vu(
        n.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Ao(e, u)) {
      var r = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Ya, n(r, l) && e.ref === t.ref)
        return gn(e, t, u);
    }
    return t.flags |= 1, e = dn(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Gf(e, t, n, l, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ya(c, l) && e.ref === t.ref)
        if (Je = !1, t.pendingProps = l = c, Ao(e, u))
          (e.flags & 131072) !== 0 && (Je = !0);
        else
          return t.lanes = e.lanes, gn(e, t, u);
    }
    return bo(
      e,
      t,
      n,
      l,
      u
    );
  }
  function Xf(e, t, n, l) {
    var u = l.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (l = t.child = e.child, u = 0; l !== null; )
            u = u | l.lanes | l.childLanes, l = l.sibling;
          l = u & ~c;
        } else l = 0, t.child = null;
        return Qf(
          e,
          t,
          c,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Wu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Vr(t, c) : $c(), Kr(t);
      else
        return l = t.lanes = 536870912, Qf(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          l
        );
    } else
      c !== null ? (Wu(t, c.cachePool), Vr(t, c), Hn(), t.memoizedState = null) : (e !== null && Wu(t, null), $c(), Hn());
    return ot(e, t, u, n), t.child;
  }
  function tu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Qf(e, t, n, l, u) {
    var c = Lc();
    return c = c === null ? null : { parent: Ke._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && Wu(t, null), $c(), Kr(t), e !== null && Jl(e, t, l, !0), t.childLanes = u, null;
  }
  function di(e, t) {
    return t = mi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Vf(e, t, n) {
    return bl(t, e.child, null, n), e = di(t, t.pendingProps), e.flags |= 2, Nt(t), t.memoizedState = null, e;
  }
  function Jv(e, t, n) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (he) {
        if (l.mode === "hidden")
          return e = di(t, l), t.lanes = 536870912, tu(null, e);
        if (Wc(t), (e = Ce) ? (e = ah(
          e,
          Lt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Mn !== null ? { id: en, overflow: tn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = jr(e), n.return = t, t.child = n, it = t, Ce = null)) : e = null, e === null) throw Cn(t);
        return t.lanes = 536870912, null;
      }
      return di(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var r = c.dehydrated;
      if (Wc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Vf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Je || Jl(e, t, n, !1), u = (n & e.childLanes) !== 0, Je || u) {
        if (l = je, l !== null && (r = ve(l, n), r !== 0 && r !== c.retryLane))
          throw c.retryLane = r, fl(e, r), St(l, e, r), go;
        zi(), t = Vf(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, Ce = Xt(r.nextSibling), it = t, he = !0, wn = null, Lt = !1, e !== null && wr(t, e), t = di(t, l), t.flags |= 4096;
      return t;
    }
    return e = dn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function hi(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function bo(e, t, n, l, u) {
    return vl(t), n = Ic(
      e,
      t,
      n,
      l,
      void 0,
      u
    ), l = Pc(), e !== null && !Je ? (eo(e, t, u), gn(e, t, u)) : (he && l && Dc(t), t.flags |= 1, ot(e, t, n, u), t.child);
  }
  function Kf(e, t, n, l, u, c) {
    return vl(t), t.updateQueue = null, n = Jr(
      t,
      l,
      n,
      u
    ), $r(e), l = Pc(), e !== null && !Je ? (eo(e, t, c), gn(e, t, c)) : (he && l && Dc(t), t.flags |= 1, ot(e, t, n, c), t.child);
  }
  function $f(e, t, n, l, u) {
    if (vl(t), t.stateNode === null) {
      var c = Ql, r = n.contextType;
      typeof r == "object" && r !== null && (c = ct(r)), c = new n(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = yo, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, Xc(t), r = n.contextType, c.context = typeof r == "object" && r !== null ? ct(r) : Ql, c.state = t.memoizedState, r = n.getDerivedStateFromProps, typeof r == "function" && (vo(
        t,
        n,
        r,
        l
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && yo.enqueueReplaceState(c, c.state, null), Wa(t, l, c, u), Ja(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var d = t.memoizedProps, y = Sl(n, d);
      c.props = y;
      var z = c.context, j = n.contextType;
      r = Ql, typeof j == "object" && j !== null && (r = ct(j));
      var w = n.getDerivedStateFromProps;
      j = typeof w == "function" || typeof c.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, j || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (d || z !== r) && Uf(
        t,
        c,
        l,
        r
      ), Un = !1;
      var E = t.memoizedState;
      c.state = E, Wa(t, l, c, u), Ja(), z = t.memoizedState, d || E !== z || Un ? (typeof w == "function" && (vo(
        t,
        n,
        w,
        l
      ), z = t.memoizedState), (y = Un || Df(
        t,
        n,
        y,
        l,
        E,
        z,
        r
      )) ? (j || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = z), c.props = l, c.state = z, c.context = r, l = y) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, Qc(e, t), r = t.memoizedProps, j = Sl(n, r), c.props = j, w = t.pendingProps, E = c.context, z = n.contextType, y = Ql, typeof z == "object" && z !== null && (y = ct(z)), d = n.getDerivedStateFromProps, (z = typeof d == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (r !== w || E !== y) && Uf(
        t,
        c,
        l,
        y
      ), Un = !1, E = t.memoizedState, c.state = E, Wa(t, l, c, u), Ja();
      var A = t.memoizedState;
      r !== w || E !== A || Un || e !== null && e.dependencies !== null && $u(e.dependencies) ? (typeof d == "function" && (vo(
        t,
        n,
        d,
        l
      ), A = t.memoizedState), (j = Un || Df(
        t,
        n,
        j,
        l,
        E,
        A,
        y
      ) || e !== null && e.dependencies !== null && $u(e.dependencies)) ? (z || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, A, y), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        A,
        y
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = A), c.props = l, c.state = A, c.context = y, l = j) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, hi(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = bl(
      t,
      e.child,
      null,
      u
    ), t.child = bl(
      t,
      null,
      n,
      u
    )) : ot(e, t, n, u), t.memoizedState = c.state, e = t.child) : e = gn(
      e,
      t,
      u
    ), e;
  }
  function Jf(e, t, n, l) {
    return hl(), t.flags |= 256, ot(e, t, n, l), t.child;
  }
  var _o = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function So(e) {
    return { baseLanes: e, cachePool: qr() };
  }
  function xo(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= wt), e;
  }
  function Wf(e, t, n) {
    var l = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, r;
    if ((r = c) || (r = e !== null && e.memoizedState === null ? !1 : (Ge.current & 2) !== 0), r && (u = !0, t.flags &= -129), r = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (he) {
        if (u ? qn(t) : Hn(), (e = Ce) ? (e = ah(
          e,
          Lt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Mn !== null ? { id: en, overflow: tn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = jr(e), n.return = t, t.child = n, it = t, Ce = null)) : e = null, e === null) throw Cn(t);
        return as(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = l.children;
      return l = l.fallback, u ? (Hn(), u = t.mode, d = mi(
        { mode: "hidden", children: d },
        u
      ), l = dl(
        l,
        u,
        n,
        null
      ), d.return = t, l.return = t, d.sibling = l, t.child = d, l = t.child, l.memoizedState = So(n), l.childLanes = xo(
        e,
        r,
        n
      ), t.memoizedState = _o, tu(null, l)) : (qn(t), zo(t, d));
    }
    var y = e.memoizedState;
    if (y !== null && (d = y.dehydrated, d !== null)) {
      if (c)
        t.flags & 256 ? (qn(t), t.flags &= -257, t = Eo(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Hn(), t.child = e.child, t.flags |= 128, t = null) : (Hn(), d = l.fallback, u = t.mode, l = mi(
          { mode: "visible", children: l.children },
          u
        ), d = dl(
          d,
          u,
          n,
          null
        ), d.flags |= 2, l.return = t, d.return = t, l.sibling = d, t.child = l, bl(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = So(n), l.childLanes = xo(
          e,
          r,
          n
        ), t.memoizedState = _o, t = tu(null, l));
      else if (qn(t), as(d)) {
        if (r = d.nextSibling && d.nextSibling.dataset, r) var z = r.dgst;
        r = z, l = Error(s(419)), l.stack = "", l.digest = r, Ga({ value: l, source: null, stack: null }), t = Eo(
          e,
          t,
          n
        );
      } else if (Je || Jl(e, t, n, !1), r = (n & e.childLanes) !== 0, Je || r) {
        if (r = je, r !== null && (l = ve(r, n), l !== 0 && l !== y.retryLane))
          throw y.retryLane = l, fl(e, l), St(r, e, l), go;
        ls(d) || zi(), t = Eo(
          e,
          t,
          n
        );
      } else
        ls(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = y.treeContext, Ce = Xt(
          d.nextSibling
        ), it = t, he = !0, wn = null, Lt = !1, e !== null && wr(t, e), t = zo(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Hn(), d = l.fallback, u = t.mode, y = e.child, z = y.sibling, l = dn(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 65011712, z !== null ? d = dn(
      z,
      d
    ) : (d = dl(
      d,
      u,
      n,
      null
    ), d.flags |= 2), d.return = t, l.return = t, l.sibling = d, t.child = l, tu(null, l), l = t.child, d = e.child.memoizedState, d === null ? d = So(n) : (u = d.cachePool, u !== null ? (y = Ke._currentValue, u = u.parent !== y ? { parent: y, pool: y } : u) : u = qr(), d = {
      baseLanes: d.baseLanes | n,
      cachePool: u
    }), l.memoizedState = d, l.childLanes = xo(
      e,
      r,
      n
    ), t.memoizedState = _o, tu(e.child, l)) : (qn(t), n = e.child, e = n.sibling, n = dn(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function zo(e, t) {
    return t = mi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function mi(e, t) {
    return e = Ot(22, e, null, t), e.lanes = 0, e;
  }
  function Eo(e, t, n) {
    return bl(t, e.child, null, n), e = zo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ff(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Hc(e.return, t, n);
  }
  function To(e, t, n, l, u, c) {
    var r = e.memoizedState;
    r === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: u,
      treeForkCount: c
    } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = l, r.tail = n, r.tailMode = u, r.treeForkCount = c);
  }
  function If(e, t, n) {
    var l = t.pendingProps, u = l.revealOrder, c = l.tail;
    l = l.children;
    var r = Ge.current, d = (r & 2) !== 0;
    if (d ? (r = r & 1 | 2, t.flags |= 128) : r &= 1, q(Ge, r), ot(e, t, l, n), l = he ? La : 0, !d && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ff(e, n, t);
        else if (e.tag === 19)
          Ff(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (u) {
      case "forwards":
        for (n = t.child, u = null; n !== null; )
          e = n.alternate, e !== null && ni(e) === null && (u = n), n = n.sibling;
        n = u, n === null ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null), To(
          t,
          !1,
          u,
          n,
          c,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && ni(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = n, n = u, u = e;
        }
        To(
          t,
          !0,
          n,
          null,
          c,
          l
        );
        break;
      case "together":
        To(
          t,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function gn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), kn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Jl(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = dn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = dn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Ao(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && $u(e)));
  }
  function Wv(e, t, n) {
    switch (t.tag) {
      case 3:
        xe(t, t.stateNode.containerInfo), Dn(t, Ke, e.memoizedState.cache), hl();
        break;
      case 27:
      case 5:
        It(t);
        break;
      case 4:
        xe(t, t.stateNode.containerInfo);
        break;
      case 10:
        Dn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Wc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (qn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Wf(e, t, n) : (qn(t), e = gn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        qn(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (Jl(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), u) {
          if (l)
            return If(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), q(Ge, Ge.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Xf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Dn(t, Ke, e.memoizedState.cache);
    }
    return gn(e, t, n);
  }
  function Pf(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Je = !0;
      else {
        if (!Ao(e, n) && (t.flags & 128) === 0)
          return Je = !1, Wv(
            e,
            t,
            n
          );
        Je = (e.flags & 131072) !== 0;
      }
    else
      Je = !1, he && (t.flags & 1048576) !== 0 && Mr(t, La, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = pl(t.elementType), t.type = e, typeof e == "function")
            Mc(e) ? (l = Sl(e, l), t.tag = 1, t = $f(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = bo(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === $) {
                t.tag = 11, t = kf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (u === te) {
                t.tag = 14, t = Lf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = zt(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return bo(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, u = Sl(
          l,
          t.pendingProps
        ), $f(
          e,
          t,
          l,
          u,
          n
        );
      case 3:
        e: {
          if (xe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var c = t.memoizedState;
          u = c.element, Qc(e, t), Wa(t, l, null, n);
          var r = t.memoizedState;
          if (l = r.cache, Dn(t, Ke, l), l !== c.cache && Bc(
            t,
            [Ke],
            n,
            !0
          ), Ja(), l = r.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: r.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Jf(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== u) {
              u = Bt(
                Error(s(424)),
                t
              ), Ga(u), t = Jf(
                e,
                t,
                l,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Ce = Xt(e.firstChild), it = t, he = !0, wn = null, Lt = !0, n = Gr(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (hl(), l === u) {
              t = gn(
                e,
                t,
                n
              );
              break e;
            }
            ot(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return hi(e, t), e === null ? (n = rh(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : he || (n = t.type, e = t.pendingProps, l = Mi(
          ue.current
        ).createElement(n), l[ut] = t, l[vt] = e, st(l, n, e), tt(l), t.stateNode = l) : t.memoizedState = rh(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return It(t), e === null && he && (l = t.stateNode = ch(
          t.type,
          t.pendingProps,
          ue.current
        ), it = t, Lt = !0, u = Ce, Vn(t.type) ? (us = u, Ce = Xt(l.firstChild)) : Ce = u), ot(
          e,
          t,
          t.pendingProps.children,
          n
        ), hi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && he && ((u = l = Ce) && (l = A0(
          l,
          t.type,
          t.pendingProps,
          Lt
        ), l !== null ? (t.stateNode = l, it = t, Ce = Xt(l.firstChild), Lt = !1, u = !0) : u = !1), u || Cn(t)), It(t), u = t.type, c = t.pendingProps, r = e !== null ? e.memoizedProps : null, l = c.children, es(u, c) ? l = null : r !== null && es(u, r) && (t.flags |= 32), t.memoizedState !== null && (u = Ic(
          e,
          t,
          kv,
          null,
          null,
          n
        ), yu._currentValue = u), hi(e, t), ot(e, t, l, n), t.child;
      case 6:
        return e === null && he && ((e = n = Ce) && (n = O0(
          n,
          t.pendingProps,
          Lt
        ), n !== null ? (t.stateNode = n, it = t, Ce = null, e = !0) : e = !1), e || Cn(t)), null;
      case 13:
        return Wf(e, t, n);
      case 4:
        return xe(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = bl(
          t,
          null,
          l,
          n
        ) : ot(e, t, l, n), t.child;
      case 11:
        return kf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return ot(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return ot(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return ot(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, Dn(t, t.type, l.value), ot(e, t, l.children, n), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, vl(t), u = ct(u), l = l(u), t.flags |= 1, ot(e, t, l, n), t.child;
      case 14:
        return Lf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Gf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return If(e, t, n);
      case 31:
        return Jv(e, t, n);
      case 22:
        return Xf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return vl(t), l = ct(Ke), e === null ? (u = Lc(), u === null && (u = je, c = Yc(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= n), u = c), t.memoizedState = { parent: l, cache: u }, Xc(t), Dn(t, Ke, u)) : ((e.lanes & n) !== 0 && (Qc(e, t), Wa(t, null, null, n), Ja()), u = e.memoizedState, c = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), Dn(t, Ke, l)) : (l = c.cache, Dn(t, Ke, l), l !== u.cache && Bc(
          t,
          [Ke],
          n,
          !0
        ))), ot(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function bn(e) {
    e.flags |= 4;
  }
  function Oo(e, t, n, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ad()) e.flags |= 8192;
        else
          throw gl = Iu, Gc;
    } else e.flags &= -16777217;
  }
  function ed(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !vh(t))
      if (Ad()) e.flags |= 8192;
      else
        throw gl = Iu, Gc;
  }
  function vi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ma() : 536870912, e.lanes |= t, ca |= t);
  }
  function nu(e, t) {
    if (!he)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function De(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function Fv(e, t, n) {
    var l = t.pendingProps;
    switch (Uc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return De(t), null;
      case 1:
        return De(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), vn(Ke), ze(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && ($l(t) ? bn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Zc())), De(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (bn(t), c !== null ? (De(t), ed(t, c)) : (De(t), Oo(
          t,
          u,
          null,
          l,
          n
        ))) : c ? c !== e.memoizedState ? (bn(t), De(t), ed(t, c)) : (De(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && bn(t), De(t), Oo(
          t,
          u,
          e,
          l,
          n
        )), null;
      case 27:
        if (an(t), n = ue.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && bn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return De(t), null;
          }
          e = D.current, $l(t) ? Cr(t) : (e = ch(u, l, n), t.stateNode = e, bn(t));
        }
        return De(t), null;
      case 5:
        if (an(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && bn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return De(t), null;
          }
          if (c = D.current, $l(t))
            Cr(t);
          else {
            var r = Mi(
              ue.current
            );
            switch (c) {
              case 1:
                c = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                c = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    c = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    c = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    c = r.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof l.is == "string" ? r.createElement("select", {
                      is: l.is
                    }) : r.createElement("select"), l.multiple ? c.multiple = !0 : l.size && (c.size = l.size);
                    break;
                  default:
                    c = typeof l.is == "string" ? r.createElement(u, { is: l.is }) : r.createElement(u);
                }
            }
            c[ut] = t, c[vt] = l;
            e: for (r = t.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                c.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === t) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === t)
                  break e;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            t.stateNode = c;
            e: switch (st(c, u, l), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && bn(t);
          }
        }
        return De(t), Oo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && bn(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ue.current, $l(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, u = it, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[ut] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Wd(e.nodeValue, n)), e || Cn(t, !0);
          } else
            e = Mi(e).createTextNode(
              l
            ), e[ut] = t, t.stateNode = e;
        }
        return De(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = $l(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[ut] = t;
            } else
              hl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            De(t), e = !1;
          } else
            n = Zc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return De(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = $l(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ut] = t;
            } else
              hl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            De(t), u = !1;
          } else
            u = Zc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
        }
        return Nt(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== u && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), vi(t, t.updateQueue), De(t), null);
      case 4:
        return ze(), e === null && Jo(t.stateNode.containerInfo), De(t), null;
      case 10:
        return vn(t.type), De(t), null;
      case 19:
        if (M(Ge), l = t.memoizedState, l === null) return De(t), null;
        if (u = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (u) nu(l, !1);
          else {
            if (ke !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = ni(e), c !== null) {
                  for (t.flags |= 128, nu(l, !1), e = c.updateQueue, t.updateQueue = e, vi(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Or(n, e), n = n.sibling;
                  return q(
                    Ge,
                    Ge.current & 1 | 2
                  ), he && hn(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && ft() > _i && (t.flags |= 128, u = !0, nu(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = ni(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, vi(t, e), nu(l, !0), l.tail === null && l.tailMode === "hidden" && !c.alternate && !he)
                return De(t), null;
            } else
              2 * ft() - l.renderingStartTime > _i && n !== 536870912 && (t.flags |= 128, u = !0, nu(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = ft(), e.sibling = null, n = Ge.current, q(
          Ge,
          u ? n & 1 | 2 : n & 1
        ), he && hn(t, l.treeForkCount), e) : (De(t), null);
      case 22:
      case 23:
        return Nt(t), Jc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (De(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : De(t), n = t.updateQueue, n !== null && vi(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && M(yl), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), vn(Ke), De(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Iv(e, t) {
    switch (Uc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return vn(Ke), ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return an(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Nt(t), t.alternate === null)
            throw Error(s(340));
          hl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Nt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          hl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return M(Ge), null;
      case 4:
        return ze(), null;
      case 10:
        return vn(t.type), null;
      case 22:
      case 23:
        return Nt(t), Jc(), e !== null && M(yl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return vn(Ke), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function td(e, t) {
    switch (Uc(t), t.tag) {
      case 3:
        vn(Ke), ze();
        break;
      case 26:
      case 27:
      case 5:
        an(t);
        break;
      case 4:
        ze();
        break;
      case 31:
        t.memoizedState !== null && Nt(t);
        break;
      case 13:
        Nt(t);
        break;
      case 19:
        M(Ge);
        break;
      case 10:
        vn(t.type);
        break;
      case 22:
      case 23:
        Nt(t), Jc(), e !== null && M(yl);
        break;
      case 24:
        vn(Ke);
    }
  }
  function lu(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var c = n.create, r = n.inst;
            l = c(), r.destroy = l;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (d) {
      Se(t, t.return, d);
    }
  }
  function Bn(e, t, n) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        l = c;
        do {
          if ((l.tag & e) === e) {
            var r = l.inst, d = r.destroy;
            if (d !== void 0) {
              r.destroy = void 0, u = t;
              var y = n, z = d;
              try {
                z();
              } catch (j) {
                Se(
                  u,
                  y,
                  j
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (j) {
      Se(t, t.return, j);
    }
  }
  function nd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Qr(t, n);
      } catch (l) {
        Se(e, e.return, l);
      }
    }
  }
  function ld(e, t, n) {
    n.props = Sl(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      Se(e, t, l);
    }
  }
  function au(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(l) : n.current = l;
      }
    } catch (u) {
      Se(e, t, u);
    }
  }
  function nn(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          Se(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Se(e, t, u);
        }
      else n.current = null;
  }
  function ad(e) {
    var t = e.type, n = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break e;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (u) {
      Se(e, e.return, u);
    }
  }
  function jo(e, t, n) {
    try {
      var l = e.stateNode;
      _0(l, e.type, n, t), l[vt] = t;
    } catch (u) {
      Se(e, e.return, u);
    }
  }
  function ud(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Vn(e.type) || e.tag === 4;
  }
  function No(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ud(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Vn(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Mo(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = rn));
    else if (l !== 4 && (l === 27 && Vn(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Mo(e, t, n), e = e.sibling; e !== null; )
        Mo(e, t, n), e = e.sibling;
  }
  function yi(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && Vn(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (yi(e, t, n), e = e.sibling; e !== null; )
        yi(e, t, n), e = e.sibling;
  }
  function id(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      st(t, l, n), t[ut] = e, t[vt] = n;
    } catch (c) {
      Se(e, e.return, c);
    }
  }
  var _n = !1, We = !1, wo = !1, cd = typeof WeakSet == "function" ? WeakSet : Set, nt = null;
  function Pv(e, t) {
    if (e = e.containerInfo, Io = qi, e = gr(e), zc(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var u = l.anchorOffset, c = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break e;
            }
            var r = 0, d = -1, y = -1, z = 0, j = 0, w = e, E = null;
            t: for (; ; ) {
              for (var A; w !== n || u !== 0 && w.nodeType !== 3 || (d = r + u), w !== c || l !== 0 && w.nodeType !== 3 || (y = r + l), w.nodeType === 3 && (r += w.nodeValue.length), (A = w.firstChild) !== null; )
                E = w, w = A;
              for (; ; ) {
                if (w === e) break t;
                if (E === n && ++z === u && (d = r), E === c && ++j === l && (y = r), (A = w.nextSibling) !== null) break;
                w = E, E = w.parentNode;
              }
              w = A;
            }
            n = d === -1 || y === -1 ? null : { start: d, end: y };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Po = { focusedElem: e, selectionRange: n }, qi = !1, nt = t; nt !== null; )
      if (t = nt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, nt = e;
      else
        for (; nt !== null; ) {
          switch (t = nt, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  u = e[n], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, n = t, u = c.memoizedProps, c = c.memoizedState, l = n.stateNode;
                try {
                  var k = Sl(
                    n.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    k,
                    c
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (W) {
                  Se(
                    n,
                    n.return,
                    W
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  ns(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ns(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, nt = e;
            break;
          }
          nt = t.return;
        }
  }
  function od(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xn(e, n), l & 4 && lu(5, n);
        break;
      case 1:
        if (xn(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (r) {
              Se(n, n.return, r);
            }
          else {
            var u = Sl(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (r) {
              Se(
                n,
                n.return,
                r
              );
            }
          }
        l & 64 && nd(n), l & 512 && au(n, n.return);
        break;
      case 3:
        if (xn(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Qr(e, t);
          } catch (r) {
            Se(n, n.return, r);
          }
        }
        break;
      case 27:
        t === null && l & 4 && id(n);
      case 26:
      case 5:
        xn(e, n), t === null && l & 4 && ad(n), l & 512 && au(n, n.return);
        break;
      case 12:
        xn(e, n);
        break;
      case 31:
        xn(e, n), l & 4 && fd(e, n);
        break;
      case 13:
        xn(e, n), l & 4 && dd(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = o0.bind(
          null,
          n
        ), j0(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || _n, !l) {
          t = t !== null && t.memoizedState !== null || We, u = _n;
          var c = We;
          _n = l, (We = t) && !c ? zn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : xn(e, n), _n = u, We = c;
        }
        break;
      case 30:
        break;
      default:
        xn(e, n);
    }
  }
  function sd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, sd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ic(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ue = null, pt = !1;
  function Sn(e, t, n) {
    for (n = n.child; n !== null; )
      rd(e, t, n), n = n.sibling;
  }
  function rd(e, t, n) {
    if (dt && typeof dt.onCommitFiberUnmount == "function")
      try {
        dt.onCommitFiberUnmount(ul, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        We || nn(n, t), Sn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        We || nn(n, t);
        var l = Ue, u = pt;
        Vn(n.type) && (Ue = n.stateNode, pt = !1), Sn(
          e,
          t,
          n
        ), hu(n.stateNode), Ue = l, pt = u;
        break;
      case 5:
        We || nn(n, t);
      case 6:
        if (l = Ue, u = pt, Ue = null, Sn(
          e,
          t,
          n
        ), Ue = l, pt = u, Ue !== null)
          if (pt)
            try {
              (Ue.nodeType === 9 ? Ue.body : Ue.nodeName === "HTML" ? Ue.ownerDocument.body : Ue).removeChild(n.stateNode);
            } catch (c) {
              Se(
                n,
                t,
                c
              );
            }
          else
            try {
              Ue.removeChild(n.stateNode);
            } catch (c) {
              Se(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        Ue !== null && (pt ? (e = Ue, nh(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), va(e)) : nh(Ue, n.stateNode));
        break;
      case 4:
        l = Ue, u = pt, Ue = n.stateNode.containerInfo, pt = !0, Sn(
          e,
          t,
          n
        ), Ue = l, pt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Bn(2, n, t), We || Bn(4, n, t), Sn(
          e,
          t,
          n
        );
        break;
      case 1:
        We || (nn(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && ld(
          n,
          t,
          l
        )), Sn(
          e,
          t,
          n
        );
        break;
      case 21:
        Sn(
          e,
          t,
          n
        );
        break;
      case 22:
        We = (l = We) || n.memoizedState !== null, Sn(
          e,
          t,
          n
        ), We = l;
        break;
      default:
        Sn(
          e,
          t,
          n
        );
    }
  }
  function fd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        va(e);
      } catch (n) {
        Se(t, t.return, n);
      }
    }
  }
  function dd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        va(e);
      } catch (n) {
        Se(t, t.return, n);
      }
  }
  function e0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new cd()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new cd()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function pi(e, t) {
    var n = e0(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var u = s0.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function gt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var u = n[l], c = e, r = t, d = r;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Vn(d.type)) {
                Ue = d.stateNode, pt = !1;
                break e;
              }
              break;
            case 5:
              Ue = d.stateNode, pt = !1;
              break e;
            case 3:
            case 4:
              Ue = d.stateNode.containerInfo, pt = !0;
              break e;
          }
          d = d.return;
        }
        if (Ue === null) throw Error(s(160));
        rd(c, r, u), Ue = null, pt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        hd(t, e), t = t.sibling;
  }
  var $t = null;
  function hd(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        gt(t, e), bt(e), l & 4 && (Bn(3, e, e.return), lu(3, e), Bn(5, e, e.return));
        break;
      case 1:
        gt(t, e), bt(e), l & 512 && (We || n === null || nn(n, n.return)), l & 64 && _n && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var u = $t;
        if (gt(t, e), bt(e), l & 512 && (We || n === null || nn(n, n.return)), l & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[wa] || c[ut] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(l), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), st(c, l, n), c[ut] = e, tt(c), l = c;
                      break e;
                    case "link":
                      var r = hh(
                        "link",
                        "href",
                        u
                      ).get(l + (n.href || ""));
                      if (r) {
                        for (var d = 0; d < r.length; d++)
                          if (c = r[d], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            r.splice(d, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), st(c, l, n), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (r = hh(
                        "meta",
                        "content",
                        u
                      ).get(l + (n.content || ""))) {
                        for (d = 0; d < r.length; d++)
                          if (c = r[d], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            r.splice(d, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), st(c, l, n), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  c[ut] = e, tt(c), l = c;
                }
                e.stateNode = l;
              } else
                mh(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = dh(
                u,
                l,
                e.memoizedProps
              );
          else
            c !== l ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, l === null ? mh(
              u,
              e.type,
              e.stateNode
            ) : dh(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && jo(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        gt(t, e), bt(e), l & 512 && (We || n === null || nn(n, n.return)), n !== null && l & 4 && jo(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (gt(t, e), bt(e), l & 512 && (We || n === null || nn(n, n.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Hl(u, "");
          } catch (k) {
            Se(e, e.return, k);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, jo(
          e,
          u,
          n !== null ? n.memoizedProps : u
        )), l & 1024 && (wo = !0);
        break;
      case 6:
        if (gt(t, e), bt(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (k) {
            Se(e, e.return, k);
          }
        }
        break;
      case 3:
        if (Di = null, u = $t, $t = wi(t.containerInfo), gt(t, e), $t = u, bt(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            va(t.containerInfo);
          } catch (k) {
            Se(e, e.return, k);
          }
        wo && (wo = !1, md(e));
        break;
      case 4:
        l = $t, $t = wi(
          e.stateNode.containerInfo
        ), gt(t, e), bt(e), $t = l;
        break;
      case 12:
        gt(t, e), bt(e);
        break;
      case 31:
        gt(t, e), bt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, pi(e, l)));
        break;
      case 13:
        gt(t, e), bt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (bi = ft()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, pi(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var y = n !== null && n.memoizedState !== null, z = _n, j = We;
        if (_n = z || u, We = j || y, gt(t, e), We = j, _n = z, bt(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (n === null || y || _n || We || xl(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                y = n = t;
                try {
                  if (c = y.stateNode, u)
                    r = c.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    d = y.stateNode;
                    var w = y.memoizedProps.style, E = w != null && w.hasOwnProperty("display") ? w.display : null;
                    d.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (k) {
                  Se(y, y.return, k);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = u ? "" : y.memoizedProps;
                } catch (k) {
                  Se(y, y.return, k);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                y = t;
                try {
                  var A = y.stateNode;
                  u ? lh(A, !0) : lh(y.stateNode, !1);
                } catch (k) {
                  Se(y, y.return, k);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, pi(e, n))));
        break;
      case 19:
        gt(t, e), bt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, pi(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        gt(t, e), bt(e);
    }
  }
  function bt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (ud(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode, c = No(e);
            yi(e, c, u);
            break;
          case 5:
            var r = n.stateNode;
            n.flags & 32 && (Hl(r, ""), n.flags &= -33);
            var d = No(e);
            yi(e, d, r);
            break;
          case 3:
          case 4:
            var y = n.stateNode.containerInfo, z = No(e);
            Mo(
              e,
              z,
              y
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (j) {
        Se(e, e.return, j);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function md(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        md(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function xn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        od(e, t.alternate, t), t = t.sibling;
  }
  function xl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Bn(4, t, t.return), xl(t);
          break;
        case 1:
          nn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && ld(
            t,
            t.return,
            n
          ), xl(t);
          break;
        case 27:
          hu(t.stateNode);
        case 26:
        case 5:
          nn(t, t.return), xl(t);
          break;
        case 22:
          t.memoizedState === null && xl(t);
          break;
        case 30:
          xl(t);
          break;
        default:
          xl(t);
      }
      e = e.sibling;
    }
  }
  function zn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, c = t, r = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          zn(
            u,
            c,
            n
          ), lu(4, c);
          break;
        case 1:
          if (zn(
            u,
            c,
            n
          ), l = c, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (z) {
              Se(l, l.return, z);
            }
          if (l = c, u = l.updateQueue, u !== null) {
            var d = l.stateNode;
            try {
              var y = u.shared.hiddenCallbacks;
              if (y !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < y.length; u++)
                  Xr(y[u], d);
            } catch (z) {
              Se(l, l.return, z);
            }
          }
          n && r & 64 && nd(c), au(c, c.return);
          break;
        case 27:
          id(c);
        case 26:
        case 5:
          zn(
            u,
            c,
            n
          ), n && l === null && r & 4 && ad(c), au(c, c.return);
          break;
        case 12:
          zn(
            u,
            c,
            n
          );
          break;
        case 31:
          zn(
            u,
            c,
            n
          ), n && r & 4 && fd(u, c);
          break;
        case 13:
          zn(
            u,
            c,
            n
          ), n && r & 4 && dd(u, c);
          break;
        case 22:
          c.memoizedState === null && zn(
            u,
            c,
            n
          ), au(c, c.return);
          break;
        case 30:
          break;
        default:
          zn(
            u,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Co(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Xa(n));
  }
  function Do(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Xa(e));
  }
  function Jt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        vd(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function vd(e, t, n, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Jt(
          e,
          t,
          n,
          l
        ), u & 2048 && lu(9, t);
        break;
      case 1:
        Jt(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Jt(
          e,
          t,
          n,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Xa(e)));
        break;
      case 12:
        if (u & 2048) {
          Jt(
            e,
            t,
            n,
            l
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, r = c.id, d = c.onPostCommit;
            typeof d == "function" && d(
              r,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (y) {
            Se(t, t.return, y);
          }
        } else
          Jt(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Jt(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Jt(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, r = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? Jt(
          e,
          t,
          n,
          l
        ) : uu(e, t) : c._visibility & 2 ? Jt(
          e,
          t,
          n,
          l
        ) : (c._visibility |= 2, aa(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Co(r, t);
        break;
      case 24:
        Jt(
          e,
          t,
          n,
          l
        ), u & 2048 && Do(t.alternate, t);
        break;
      default:
        Jt(
          e,
          t,
          n,
          l
        );
    }
  }
  function aa(e, t, n, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, r = t, d = n, y = l, z = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          aa(
            c,
            r,
            d,
            y,
            u
          ), lu(8, r);
          break;
        case 23:
          break;
        case 22:
          var j = r.stateNode;
          r.memoizedState !== null ? j._visibility & 2 ? aa(
            c,
            r,
            d,
            y,
            u
          ) : uu(
            c,
            r
          ) : (j._visibility |= 2, aa(
            c,
            r,
            d,
            y,
            u
          )), u && z & 2048 && Co(
            r.alternate,
            r
          );
          break;
        case 24:
          aa(
            c,
            r,
            d,
            y,
            u
          ), u && z & 2048 && Do(r.alternate, r);
          break;
        default:
          aa(
            c,
            r,
            d,
            y,
            u
          );
      }
      t = t.sibling;
    }
  }
  function uu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            uu(n, l), u & 2048 && Co(
              l.alternate,
              l
            );
            break;
          case 24:
            uu(n, l), u & 2048 && Do(l.alternate, l);
            break;
          default:
            uu(n, l);
        }
        t = t.sibling;
      }
  }
  var iu = 8192;
  function ua(e, t, n) {
    if (e.subtreeFlags & iu)
      for (e = e.child; e !== null; )
        yd(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function yd(e, t, n) {
    switch (e.tag) {
      case 26:
        ua(
          e,
          t,
          n
        ), e.flags & iu && e.memoizedState !== null && Y0(
          n,
          $t,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ua(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = $t;
        $t = wi(e.stateNode.containerInfo), ua(
          e,
          t,
          n
        ), $t = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = iu, iu = 16777216, ua(
          e,
          t,
          n
        ), iu = l) : ua(
          e,
          t,
          n
        ));
        break;
      default:
        ua(
          e,
          t,
          n
        );
    }
  }
  function pd(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function cu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          nt = l, bd(
            l,
            e
          );
        }
      pd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        gd(e), e = e.sibling;
  }
  function gd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        cu(e), e.flags & 2048 && Bn(9, e, e.return);
        break;
      case 3:
        cu(e);
        break;
      case 12:
        cu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, gi(e)) : cu(e);
        break;
      default:
        cu(e);
    }
  }
  function gi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          nt = l, bd(
            l,
            e
          );
        }
      pd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Bn(8, t, t.return), gi(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, gi(t));
          break;
        default:
          gi(t);
      }
      e = e.sibling;
    }
  }
  function bd(e, t) {
    for (; nt !== null; ) {
      var n = nt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Bn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Xa(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, nt = l;
      else
        e: for (n = e; nt !== null; ) {
          l = nt;
          var u = l.sibling, c = l.return;
          if (sd(l), l === n) {
            nt = null;
            break e;
          }
          if (u !== null) {
            u.return = c, nt = u;
            break e;
          }
          nt = c;
        }
    }
  }
  var t0 = {
    getCacheForType: function(e) {
      var t = ct(Ke), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return ct(Ke).controller.signal;
    }
  }, n0 = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, je = null, oe = null, re = 0, _e = 0, Mt = null, Yn = !1, ia = !1, Uo = !1, En = 0, ke = 0, kn = 0, zl = 0, Ro = 0, wt = 0, ca = 0, ou = null, _t = null, Zo = !1, bi = 0, _d = 0, _i = 1 / 0, Si = null, Ln = null, et = 0, Gn = null, oa = null, Tn = 0, qo = 0, Ho = null, Sd = null, su = 0, Bo = null;
  function Ct() {
    return (ge & 2) !== 0 && re !== 0 ? re & -re : O.T !== null ? Qo() : wu();
  }
  function xd() {
    if (wt === 0)
      if ((re & 536870912) === 0 || he) {
        var e = Nl;
        Nl <<= 1, (Nl & 3932160) === 0 && (Nl = 262144), wt = e;
      } else wt = 536870912;
    return e = jt.current, e !== null && (e.flags |= 32), wt;
  }
  function St(e, t, n) {
    (e === je && (_e === 2 || _e === 9) || e.cancelPendingCommit !== null) && (sa(e, 0), Xn(
      e,
      re,
      wt,
      !1
    )), K(e, n), ((ge & 2) === 0 || e !== je) && (e === je && ((ge & 2) === 0 && (zl |= n), ke === 4 && Xn(
      e,
      re,
      wt,
      !1
    )), ln(e));
  }
  function zd(e, t, n) {
    if ((ge & 6) !== 0) throw Error(s(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || jn(e, t), u = l ? u0(e, t) : ko(e, t, !0), c = l;
    do {
      if (u === 0) {
        ia && !l && Xn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !l0(n)) {
          u = ko(e, t, !1), c = !1;
          continue;
        }
        if (u === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var r = 0;
          else
            r = e.pendingLanes & -536870913, r = r !== 0 ? r : r & 536870912 ? 536870912 : 0;
          if (r !== 0) {
            t = r;
            e: {
              var d = e;
              u = ou;
              var y = d.current.memoizedState.isDehydrated;
              if (y && (sa(d, r).flags |= 256), r = ko(
                d,
                r,
                !1
              ), r !== 2) {
                if (Uo && !y) {
                  d.errorRecoveryDisabledLanes |= c, zl |= c, u = 4;
                  break e;
                }
                c = _t, _t = u, c !== null && (_t === null ? _t = c : _t.push.apply(
                  _t,
                  c
                ));
              }
              u = r;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          sa(e, 0), Xn(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, c = u, c) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Xn(
                l,
                t,
                wt,
                !Yn
              );
              break e;
            case 2:
              _t = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = bi + 300 - ft(), 10 < u)) {
            if (Xn(
              l,
              t,
              wt,
              !Yn
            ), il(l, 0, !0) !== 0) break e;
            Tn = t, l.timeoutHandle = eh(
              Ed.bind(
                null,
                l,
                n,
                _t,
                Si,
                Zo,
                t,
                wt,
                zl,
                ca,
                Yn,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Ed(
            l,
            n,
            _t,
            Si,
            Zo,
            t,
            wt,
            zl,
            ca,
            Yn,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ln(e);
  }
  function Ed(e, t, n, l, u, c, r, d, y, z, j, w, E, A) {
    if (e.timeoutHandle = -1, w = t.subtreeFlags, w & 8192 || (w & 16785408) === 16785408) {
      w = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: rn
      }, yd(
        t,
        c,
        w
      );
      var k = (c & 62914560) === c ? bi - ft() : (c & 4194048) === c ? _d - ft() : 0;
      if (k = k0(
        w,
        k
      ), k !== null) {
        Tn = c, e.cancelPendingCommit = k(
          Cd.bind(
            null,
            e,
            t,
            c,
            n,
            l,
            u,
            r,
            d,
            y,
            j,
            w,
            null,
            E,
            A
          )
        ), Xn(e, c, r, !z);
        return;
      }
    }
    Cd(
      e,
      t,
      c,
      n,
      l,
      u,
      r,
      d,
      y
    );
  }
  function l0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var u = n[l], c = u.getSnapshot;
          u = u.value;
          try {
            if (!At(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Xn(e, t, n, l) {
    t &= ~Ro, t &= ~zl, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - lt(u), r = 1 << c;
      l[c] = -1, u &= ~r;
    }
    n !== 0 && P(e, n, t);
  }
  function xi() {
    return (ge & 6) === 0 ? (ru(0), !1) : !0;
  }
  function Yo() {
    if (oe !== null) {
      if (_e === 0)
        var e = oe.return;
      else
        e = oe, mn = ml = null, to(e), Pl = null, Va = 0, e = oe;
      for (; e !== null; )
        td(e.alternate, e), e = e.return;
      oe = null;
    }
  }
  function sa(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, z0(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Tn = 0, Yo(), je = e, oe = n = dn(e.current, null), re = t, _e = 0, Mt = null, Yn = !1, ia = jn(e, t), Uo = !1, ca = wt = Ro = zl = kn = ke = 0, _t = ou = null, Zo = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - lt(l), c = 1 << u;
        t |= e[u], l &= ~c;
      }
    return En = t, Gu(), n;
  }
  function Td(e, t) {
    le = null, O.H = eu, t === Il || t === Fu ? (t = Yr(), _e = 3) : t === Gc ? (t = Yr(), _e = 4) : _e = t === go ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Mt = t, oe === null && (ke = 1, fi(
      e,
      Bt(t, e.current)
    ));
  }
  function Ad() {
    var e = jt.current;
    return e === null ? !0 : (re & 4194048) === re ? Gt === null : (re & 62914560) === re || (re & 536870912) !== 0 ? e === Gt : !1;
  }
  function Od() {
    var e = O.H;
    return O.H = eu, e === null ? eu : e;
  }
  function jd() {
    var e = O.A;
    return O.A = t0, e;
  }
  function zi() {
    ke = 4, Yn || (re & 4194048) !== re && jt.current !== null || (ia = !0), (kn & 134217727) === 0 && (zl & 134217727) === 0 || je === null || Xn(
      je,
      re,
      wt,
      !1
    );
  }
  function ko(e, t, n) {
    var l = ge;
    ge |= 2;
    var u = Od(), c = jd();
    (je !== e || re !== t) && (Si = null, sa(e, t)), t = !1;
    var r = ke;
    e: do
      try {
        if (_e !== 0 && oe !== null) {
          var d = oe, y = Mt;
          switch (_e) {
            case 8:
              Yo(), r = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              jt.current === null && (t = !0);
              var z = _e;
              if (_e = 0, Mt = null, ra(e, d, y, z), n && ia) {
                r = 0;
                break e;
              }
              break;
            default:
              z = _e, _e = 0, Mt = null, ra(e, d, y, z);
          }
        }
        a0(), r = ke;
        break;
      } catch (j) {
        Td(e, j);
      }
    while (!0);
    return t && e.shellSuspendCounter++, mn = ml = null, ge = l, O.H = u, O.A = c, oe === null && (je = null, re = 0, Gu()), r;
  }
  function a0() {
    for (; oe !== null; ) Nd(oe);
  }
  function u0(e, t) {
    var n = ge;
    ge |= 2;
    var l = Od(), u = jd();
    je !== e || re !== t ? (Si = null, _i = ft() + 500, sa(e, t)) : ia = jn(
      e,
      t
    );
    e: do
      try {
        if (_e !== 0 && oe !== null) {
          t = oe;
          var c = Mt;
          t: switch (_e) {
            case 1:
              _e = 0, Mt = null, ra(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Hr(c)) {
                _e = 0, Mt = null, Md(t);
                break;
              }
              t = function() {
                _e !== 2 && _e !== 9 || je !== e || (_e = 7), ln(e);
              }, c.then(t, t);
              break e;
            case 3:
              _e = 7;
              break e;
            case 4:
              _e = 5;
              break e;
            case 7:
              Hr(c) ? (_e = 0, Mt = null, Md(t)) : (_e = 0, Mt = null, ra(e, t, c, 7));
              break;
            case 5:
              var r = null;
              switch (oe.tag) {
                case 26:
                  r = oe.memoizedState;
                case 5:
                case 27:
                  var d = oe;
                  if (r ? vh(r) : d.stateNode.complete) {
                    _e = 0, Mt = null;
                    var y = d.sibling;
                    if (y !== null) oe = y;
                    else {
                      var z = d.return;
                      z !== null ? (oe = z, Ei(z)) : oe = null;
                    }
                    break t;
                  }
              }
              _e = 0, Mt = null, ra(e, t, c, 5);
              break;
            case 6:
              _e = 0, Mt = null, ra(e, t, c, 6);
              break;
            case 8:
              Yo(), ke = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        i0();
        break;
      } catch (j) {
        Td(e, j);
      }
    while (!0);
    return mn = ml = null, O.H = l, O.A = u, ge = n, oe !== null ? 0 : (je = null, re = 0, Gu(), ke);
  }
  function i0() {
    for (; oe !== null && !Tt(); )
      Nd(oe);
  }
  function Nd(e) {
    var t = Pf(e.alternate, e, En);
    e.memoizedProps = e.pendingProps, t === null ? Ei(e) : oe = t;
  }
  function Md(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Kf(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          re
        );
        break;
      case 11:
        t = Kf(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          re
        );
        break;
      case 5:
        to(t);
      default:
        td(n, t), t = oe = Or(t, En), t = Pf(n, t, En);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ei(e) : oe = t;
  }
  function ra(e, t, n, l) {
    mn = ml = null, to(t), Pl = null, Va = 0;
    var u = t.return;
    try {
      if ($v(
        e,
        u,
        t,
        n,
        re
      )) {
        ke = 1, fi(
          e,
          Bt(n, e.current)
        ), oe = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw oe = u, c;
      ke = 1, fi(
        e,
        Bt(n, e.current)
      ), oe = null;
      return;
    }
    t.flags & 32768 ? (he || l === 1 ? e = !0 : ia || (re & 536870912) !== 0 ? e = !1 : (Yn = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = jt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), wd(t, e)) : Ei(t);
  }
  function Ei(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        wd(
          t,
          Yn
        );
        return;
      }
      e = t.return;
      var n = Fv(
        t.alternate,
        t,
        En
      );
      if (n !== null) {
        oe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        oe = t;
        return;
      }
      oe = t = e;
    } while (t !== null);
    ke === 0 && (ke = 5);
  }
  function wd(e, t) {
    do {
      var n = Iv(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, oe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        oe = e;
        return;
      }
      oe = e = n;
    } while (e !== null);
    ke = 6, oe = null;
  }
  function Cd(e, t, n, l, u, c, r, d, y) {
    e.cancelPendingCommit = null;
    do
      Ti();
    while (et !== 0);
    if ((ge & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (c = t.lanes | t.childLanes, c |= jc, B(
        e,
        n,
        c,
        r,
        d,
        y
      ), e === je && (oe = je = null, re = 0), oa = t, Gn = e, Tn = n, qo = c, Ho = u, Sd = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, r0(al, function() {
        return qd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = H.p, H.p = 2, r = ge, ge |= 4;
        try {
          Pv(e, t, n);
        } finally {
          ge = r, H.p = u, O.T = l;
        }
      }
      et = 1, Dd(), Ud(), Rd();
    }
  }
  function Dd() {
    if (et === 1) {
      et = 0;
      var e = Gn, t = oa, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null;
        var l = H.p;
        H.p = 2;
        var u = ge;
        ge |= 4;
        try {
          hd(t, e);
          var c = Po, r = gr(e.containerInfo), d = c.focusedElem, y = c.selectionRange;
          if (r !== d && d && d.ownerDocument && pr(
            d.ownerDocument.documentElement,
            d
          )) {
            if (y !== null && zc(d)) {
              var z = y.start, j = y.end;
              if (j === void 0 && (j = z), "selectionStart" in d)
                d.selectionStart = z, d.selectionEnd = Math.min(
                  j,
                  d.value.length
                );
              else {
                var w = d.ownerDocument || document, E = w && w.defaultView || window;
                if (E.getSelection) {
                  var A = E.getSelection(), k = d.textContent.length, W = Math.min(y.start, k), Ae = y.end === void 0 ? W : Math.min(y.end, k);
                  !A.extend && W > Ae && (r = Ae, Ae = W, W = r);
                  var _ = yr(
                    d,
                    W
                  ), b = yr(
                    d,
                    Ae
                  );
                  if (_ && b && (A.rangeCount !== 1 || A.anchorNode !== _.node || A.anchorOffset !== _.offset || A.focusNode !== b.node || A.focusOffset !== b.offset)) {
                    var x = w.createRange();
                    x.setStart(_.node, _.offset), A.removeAllRanges(), W > Ae ? (A.addRange(x), A.extend(b.node, b.offset)) : (x.setEnd(b.node, b.offset), A.addRange(x));
                  }
                }
              }
            }
            for (w = [], A = d; A = A.parentNode; )
              A.nodeType === 1 && w.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < w.length; d++) {
              var N = w[d];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          qi = !!Io, Po = Io = null;
        } finally {
          ge = u, H.p = l, O.T = n;
        }
      }
      e.current = t, et = 2;
    }
  }
  function Ud() {
    if (et === 2) {
      et = 0;
      var e = Gn, t = oa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = O.T, O.T = null;
        var l = H.p;
        H.p = 2;
        var u = ge;
        ge |= 4;
        try {
          od(e, t.alternate, t);
        } finally {
          ge = u, H.p = l, O.T = n;
        }
      }
      et = 3;
    }
  }
  function Rd() {
    if (et === 4 || et === 3) {
      et = 0, Eu();
      var e = Gn, t = oa, n = Tn, l = Sd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? et = 5 : (et = 0, oa = Gn = null, Zd(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Ln = null), on(n), t = t.stateNode, dt && typeof dt.onCommitFiberRoot == "function")
        try {
          dt.onCommitFiberRoot(
            ul,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, u = H.p, H.p = 2, O.T = null;
        try {
          for (var c = e.onRecoverableError, r = 0; r < l.length; r++) {
            var d = l[r];
            c(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          O.T = t, H.p = u;
        }
      }
      (Tn & 3) !== 0 && Ti(), ln(e), u = e.pendingLanes, (n & 261930) !== 0 && (u & 42) !== 0 ? e === Bo ? su++ : (su = 0, Bo = e) : su = 0, ru(0);
    }
  }
  function Zd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Xa(t)));
  }
  function Ti() {
    return Dd(), Ud(), Rd(), qd();
  }
  function qd() {
    if (et !== 5) return !1;
    var e = Gn, t = qo;
    qo = 0;
    var n = on(Tn), l = O.T, u = H.p;
    try {
      H.p = 32 > n ? 32 : n, O.T = null, n = Ho, Ho = null;
      var c = Gn, r = Tn;
      if (et = 0, oa = Gn = null, Tn = 0, (ge & 6) !== 0) throw Error(s(331));
      var d = ge;
      if (ge |= 4, gd(c.current), vd(
        c,
        c.current,
        r,
        n
      ), ge = d, ru(0, !1), dt && typeof dt.onPostCommitFiberRoot == "function")
        try {
          dt.onPostCommitFiberRoot(ul, c);
        } catch {
        }
      return !0;
    } finally {
      H.p = u, O.T = l, Zd(e, t);
    }
  }
  function Hd(e, t, n) {
    t = Bt(n, t), t = po(e.stateNode, t, 2), e = Zn(e, t, 2), e !== null && (K(e, 2), ln(e));
  }
  function Se(e, t, n) {
    if (e.tag === 3)
      Hd(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Hd(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ln === null || !Ln.has(l))) {
            e = Bt(n, e), n = Bf(2), l = Zn(t, n, 2), l !== null && (Yf(
              n,
              l,
              t,
              e
            ), K(l, 2), ln(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Lo(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new n0();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(n) || (Uo = !0, u.add(n), e = c0.bind(null, e, t, n), t.then(e, e));
  }
  function c0(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, je === e && (re & n) === n && (ke === 4 || ke === 3 && (re & 62914560) === re && 300 > ft() - bi ? (ge & 2) === 0 && sa(e, 0) : Ro |= n, ca === re && (ca = 0)), ln(e);
  }
  function Bd(e, t) {
    t === 0 && (t = Ma()), e = fl(e, t), e !== null && (K(e, t), ln(e));
  }
  function o0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Bd(e, n);
  }
  function s0(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var l = e.stateNode, u = e.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    l !== null && l.delete(t), Bd(e, n);
  }
  function r0(e, t) {
    return un(e, t);
  }
  var Ai = null, fa = null, Go = !1, Oi = !1, Xo = !1, Qn = 0;
  function ln(e) {
    e !== fa && e.next === null && (fa === null ? Ai = fa = e : fa = fa.next = e), Oi = !0, Go || (Go = !0, d0());
  }
  function ru(e, t) {
    if (!Xo && Oi) {
      Xo = !0;
      do
        for (var n = !1, l = Ai; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var r = l.suspendedLanes, d = l.pingedLanes;
              c = (1 << 31 - lt(42 | e) + 1) - 1, c &= u & ~(r & ~d), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Gd(l, c));
          } else
            c = re, c = il(
              l,
              l === je ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || jn(l, c) || (n = !0, Gd(l, c));
          l = l.next;
        }
      while (n);
      Xo = !1;
    }
  }
  function f0() {
    Yd();
  }
  function Yd() {
    Oi = Go = !1;
    var e = 0;
    Qn !== 0 && x0() && (e = Qn);
    for (var t = ft(), n = null, l = Ai; l !== null; ) {
      var u = l.next, c = kd(l, t);
      c === 0 ? (l.next = null, n === null ? Ai = u : n.next = u, u === null && (fa = n)) : (n = l, (e !== 0 || (c & 3) !== 0) && (Oi = !0)), l = u;
    }
    et !== 0 && et !== 5 || ru(e), Qn !== 0 && (Qn = 0);
  }
  function kd(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var r = 31 - lt(c), d = 1 << r, y = u[r];
      y === -1 ? ((d & n) === 0 || (d & l) !== 0) && (u[r] = Mu(d, t)) : y <= t && (e.expiredLanes |= d), c &= ~d;
    }
    if (t = je, n = re, n = il(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (_e === 2 || _e === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ll(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || jn(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ll(l), on(n)) {
        case 2:
        case 8:
          n = Na;
          break;
        case 32:
          n = al;
          break;
        case 268435456:
          n = Au;
          break;
        default:
          n = al;
      }
      return l = Ld.bind(null, e), n = un(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ll(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ld(e, t) {
    if (et !== 0 && et !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Ti() && e.callbackNode !== n)
      return null;
    var l = re;
    return l = il(
      e,
      e === je ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (zd(e, l, t), kd(e, ft()), e.callbackNode != null && e.callbackNode === n ? Ld.bind(null, e) : null);
  }
  function Gd(e, t) {
    if (Ti()) return null;
    zd(e, t, !0);
  }
  function d0() {
    E0(function() {
      (ge & 6) !== 0 ? un(
        ja,
        f0
      ) : Yd();
    });
  }
  function Qo() {
    if (Qn === 0) {
      var e = Wl;
      e === 0 && (e = jl, jl <<= 1, (jl & 261888) === 0 && (jl = 256)), Qn = e;
    }
    return Qn;
  }
  function Xd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ru("" + e);
  }
  function Qd(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function h0(e, t, n, l, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var c = Xd(
        (u[vt] || null).action
      ), r = l.submitter;
      r && (t = (t = r[vt] || null) ? Xd(t.formAction) : r.getAttribute("formAction"), t !== null && (c = t, r = null));
      var d = new Bu(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Qn !== 0) {
                  var y = r ? Qd(u, r) : new FormData(u);
                  ro(
                    n,
                    {
                      pending: !0,
                      data: y,
                      method: u.method,
                      action: c
                    },
                    null,
                    y
                  );
                }
              } else
                typeof c == "function" && (d.preventDefault(), y = r ? Qd(u, r) : new FormData(u), ro(
                  n,
                  {
                    pending: !0,
                    data: y,
                    method: u.method,
                    action: c
                  },
                  c,
                  y
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Vo = 0; Vo < Oc.length; Vo++) {
    var Ko = Oc[Vo], m0 = Ko.toLowerCase(), v0 = Ko[0].toUpperCase() + Ko.slice(1);
    Kt(
      m0,
      "on" + v0
    );
  }
  Kt(Sr, "onAnimationEnd"), Kt(xr, "onAnimationIteration"), Kt(zr, "onAnimationStart"), Kt("dblclick", "onDoubleClick"), Kt("focusin", "onFocus"), Kt("focusout", "onBlur"), Kt(wv, "onTransitionRun"), Kt(Cv, "onTransitionStart"), Kt(Dv, "onTransitionCancel"), Kt(Er, "onTransitionEnd"), Zl("onMouseEnter", ["mouseout", "mouseover"]), Zl("onMouseLeave", ["mouseout", "mouseover"]), Zl("onPointerEnter", ["pointerout", "pointerover"]), Zl("onPointerLeave", ["pointerout", "pointerover"]), cl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), cl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), cl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), cl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), cl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), cl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var fu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), y0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(fu)
  );
  function Vd(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], u = l.event;
      l = l.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var r = l.length - 1; 0 <= r; r--) {
            var d = l[r], y = d.instance, z = d.currentTarget;
            if (d = d.listener, y !== c && u.isPropagationStopped())
              break e;
            c = d, u.currentTarget = z;
            try {
              c(u);
            } catch (j) {
              Lu(j);
            }
            u.currentTarget = null, c = y;
          }
        else
          for (r = 0; r < l.length; r++) {
            if (d = l[r], y = d.instance, z = d.currentTarget, d = d.listener, y !== c && u.isPropagationStopped())
              break e;
            c = d, u.currentTarget = z;
            try {
              c(u);
            } catch (j) {
              Lu(j);
            }
            u.currentTarget = null, c = y;
          }
      }
    }
  }
  function se(e, t) {
    var n = t[uc];
    n === void 0 && (n = t[uc] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Kd(t, e, 2, !1), n.add(l));
  }
  function $o(e, t, n) {
    var l = 0;
    t && (l |= 4), Kd(
      n,
      e,
      l,
      t
    );
  }
  var ji = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[ji]) {
      e[ji] = !0, Bs.forEach(function(n) {
        n !== "selectionchange" && (y0.has(n) || $o(n, !1, e), $o(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ji] || (t[ji] = !0, $o("selectionchange", !1, t));
    }
  }
  function Kd(e, t, n, l) {
    switch (xh(t)) {
      case 2:
        var u = X0;
        break;
      case 8:
        u = Q0;
        break;
      default:
        u = rs;
    }
    n = u.bind(
      null,
      t,
      n,
      e
    ), u = void 0, !mc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, n, !0) : u !== void 0 ? e.addEventListener(t, n, {
      passive: u
    }) : e.addEventListener(t, n, !1);
  }
  function Wo(e, t, n, l, u) {
    var c = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var r = l.tag;
        if (r === 3 || r === 4) {
          var d = l.stateNode.containerInfo;
          if (d === u) break;
          if (r === 4)
            for (r = l.return; r !== null; ) {
              var y = r.tag;
              if ((y === 3 || y === 4) && r.stateNode.containerInfo === u)
                return;
              r = r.return;
            }
          for (; d !== null; ) {
            if (r = Dl(d), r === null) return;
            if (y = r.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              l = c = r;
              continue e;
            }
            d = d.parentNode;
          }
        }
        l = l.return;
      }
    Fs(function() {
      var z = c, j = dc(n), w = [];
      e: {
        var E = Tr.get(e);
        if (E !== void 0) {
          var A = Bu, k = e;
          switch (e) {
            case "keypress":
              if (qu(n) === 0) break e;
            case "keydown":
            case "keyup":
              A = sv;
              break;
            case "focusin":
              k = "focus", A = gc;
              break;
            case "focusout":
              k = "blur", A = gc;
              break;
            case "beforeblur":
            case "afterblur":
              A = gc;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = er;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Fm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = dv;
              break;
            case Sr:
            case xr:
            case zr:
              A = ev;
              break;
            case Er:
              A = mv;
              break;
            case "scroll":
            case "scrollend":
              A = Jm;
              break;
            case "wheel":
              A = yv;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = nv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = nr;
              break;
            case "toggle":
            case "beforetoggle":
              A = gv;
          }
          var W = (t & 4) !== 0, Ae = !W && (e === "scroll" || e === "scrollend"), _ = W ? E !== null ? E + "Capture" : null : E;
          W = [];
          for (var b = z, x; b !== null; ) {
            var N = b;
            if (x = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || x === null || _ === null || (N = Da(b, _), N != null && W.push(
              du(b, N, x)
            )), Ae) break;
            b = b.return;
          }
          0 < W.length && (E = new A(
            E,
            k,
            null,
            n,
            j
          ), w.push({ event: E, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (E = e === "mouseover" || e === "pointerover", A = e === "mouseout" || e === "pointerout", E && n !== fc && (k = n.relatedTarget || n.fromElement) && (Dl(k) || k[Cl]))
            break e;
          if ((A || E) && (E = j.window === j ? j : (E = j.ownerDocument) ? E.defaultView || E.parentWindow : window, A ? (k = n.relatedTarget || n.toElement, A = z, k = k ? Dl(k) : null, k !== null && (Ae = m(k), W = k.tag, k !== Ae || W !== 5 && W !== 27 && W !== 6) && (k = null)) : (A = null, k = z), A !== k)) {
            if (W = er, N = "onMouseLeave", _ = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (W = nr, N = "onPointerLeave", _ = "onPointerEnter", b = "pointer"), Ae = A == null ? E : Ca(A), x = k == null ? E : Ca(k), E = new W(
              N,
              b + "leave",
              A,
              n,
              j
            ), E.target = Ae, E.relatedTarget = x, N = null, Dl(j) === z && (W = new W(
              _,
              b + "enter",
              k,
              n,
              j
            ), W.target = x, W.relatedTarget = Ae, N = W), Ae = N, A && k)
              t: {
                for (W = p0, _ = A, b = k, x = 0, N = _; N; N = W(N))
                  x++;
                N = 0;
                for (var Q = b; Q; Q = W(Q))
                  N++;
                for (; 0 < x - N; )
                  _ = W(_), x--;
                for (; 0 < N - x; )
                  b = W(b), N--;
                for (; x--; ) {
                  if (_ === b || b !== null && _ === b.alternate) {
                    W = _;
                    break t;
                  }
                  _ = W(_), b = W(b);
                }
                W = null;
              }
            else W = null;
            A !== null && $d(
              w,
              E,
              A,
              W,
              !1
            ), k !== null && Ae !== null && $d(
              w,
              Ae,
              k,
              W,
              !0
            );
          }
        }
        e: {
          if (E = z ? Ca(z) : window, A = E.nodeName && E.nodeName.toLowerCase(), A === "select" || A === "input" && E.type === "file")
            var ye = rr;
          else if (or(E))
            if (fr)
              ye = jv;
            else {
              ye = Av;
              var G = Tv;
            }
          else
            A = E.nodeName, !A || A.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? z && rc(z.elementType) && (ye = rr) : ye = Ov;
          if (ye && (ye = ye(e, z))) {
            sr(
              w,
              ye,
              n,
              j
            );
            break e;
          }
          G && G(e, E, z), e === "focusout" && z && E.type === "number" && z.memoizedProps.value != null && sc(E, "number", E.value);
        }
        switch (G = z ? Ca(z) : window, e) {
          case "focusin":
            (or(G) || G.contentEditable === "true") && (Ll = G, Ec = z, ka = null);
            break;
          case "focusout":
            ka = Ec = Ll = null;
            break;
          case "mousedown":
            Tc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Tc = !1, br(w, n, j);
            break;
          case "selectionchange":
            if (Mv) break;
          case "keydown":
          case "keyup":
            br(w, n, j);
        }
        var ae;
        if (_c)
          e: {
            switch (e) {
              case "compositionstart":
                var fe = "onCompositionStart";
                break e;
              case "compositionend":
                fe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                fe = "onCompositionUpdate";
                break e;
            }
            fe = void 0;
          }
        else
          kl ? ir(e, n) && (fe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (fe = "onCompositionStart");
        fe && (lr && n.locale !== "ko" && (kl || fe !== "onCompositionStart" ? fe === "onCompositionEnd" && kl && (ae = Is()) : (Nn = j, vc = "value" in Nn ? Nn.value : Nn.textContent, kl = !0)), G = Ni(z, fe), 0 < G.length && (fe = new tr(
          fe,
          e,
          null,
          n,
          j
        ), w.push({ event: fe, listeners: G }), ae ? fe.data = ae : (ae = cr(n), ae !== null && (fe.data = ae)))), (ae = _v ? Sv(e, n) : xv(e, n)) && (fe = Ni(z, "onBeforeInput"), 0 < fe.length && (G = new tr(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          j
        ), w.push({
          event: G,
          listeners: fe
        }), G.data = ae)), h0(
          w,
          e,
          z,
          n,
          j
        );
      }
      Vd(w, t);
    });
  }
  function du(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Ni(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = Da(e, n), u != null && l.unshift(
        du(e, u, c)
      ), u = Da(e, t), u != null && l.push(
        du(e, u, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function p0(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function $d(e, t, n, l, u) {
    for (var c = t._reactName, r = []; n !== null && n !== l; ) {
      var d = n, y = d.alternate, z = d.stateNode;
      if (d = d.tag, y !== null && y === l) break;
      d !== 5 && d !== 26 && d !== 27 || z === null || (y = z, u ? (z = Da(n, c), z != null && r.unshift(
        du(n, z, y)
      )) : u || (z = Da(n, c), z != null && r.push(
        du(n, z, y)
      ))), n = n.return;
    }
    r.length !== 0 && e.push({ event: t, listeners: r });
  }
  var g0 = /\r\n?/g, b0 = /\u0000|\uFFFD/g;
  function Jd(e) {
    return (typeof e == "string" ? e : "" + e).replace(g0, `
`).replace(b0, "");
  }
  function Wd(e, t) {
    return t = Jd(t), Jd(e) === t;
  }
  function Te(e, t, n, l, u, c) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || Hl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && Hl(e, "" + l);
        break;
      case "className":
        Du(e, "class", l);
        break;
      case "tabIndex":
        Du(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Du(e, n, l);
        break;
      case "style":
        Js(e, l, c);
        break;
      case "data":
        if (t !== "object") {
          Du(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Ru("" + l), e.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (n === "formAction" ? (t !== "input" && Te(e, t, "name", u.name, u, null), Te(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Te(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Te(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Te(e, t, "encType", u.encType, u, null), Te(e, t, "method", u.method, u, null), Te(e, t, "target", u.target, u, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = Ru("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = rn);
        break;
      case "onScroll":
        l != null && se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && se("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Ru("" + l), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
        break;
      case "popover":
        se("beforetoggle", e), se("toggle", e), Cu(e, "popover", l);
        break;
      case "xlinkActuate":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Cu(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Km.get(n) || n, Cu(e, n, l));
    }
  }
  function Fo(e, t, n, l, u, c) {
    switch (n) {
      case "style":
        Js(e, l, c);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(s(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Hl(e, l) : (typeof l == "number" || typeof l == "bigint") && Hl(e, "" + l);
        break;
      case "onScroll":
        l != null && se("scroll", e);
        break;
      case "onScrollEnd":
        l != null && se("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = rn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ys.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), t = n.slice(2, u ? n.length - 7 : void 0), c = e[vt] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof l == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, u);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : Cu(e, n, l);
          }
    }
  }
  function st(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        se("error", e), se("load", e);
        var l = !1, u = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var r = n[c];
            if (r != null)
              switch (c) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  Te(e, t, c, r, n, null);
              }
          }
        u && Te(e, t, "srcSet", n.srcSet, n, null), l && Te(e, t, "src", n.src, n, null);
        return;
      case "input":
        se("invalid", e);
        var d = c = r = u = null, y = null, z = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var j = n[l];
            if (j != null)
              switch (l) {
                case "name":
                  u = j;
                  break;
                case "type":
                  r = j;
                  break;
                case "checked":
                  y = j;
                  break;
                case "defaultChecked":
                  z = j;
                  break;
                case "value":
                  c = j;
                  break;
                case "defaultValue":
                  d = j;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (j != null)
                    throw Error(s(137, t));
                  break;
                default:
                  Te(e, t, l, j, n, null);
              }
          }
        Qs(
          e,
          c,
          d,
          y,
          z,
          r,
          u,
          !1
        );
        return;
      case "select":
        se("invalid", e), l = r = c = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (d = n[u], d != null))
            switch (u) {
              case "value":
                c = d;
                break;
              case "defaultValue":
                r = d;
                break;
              case "multiple":
                l = d;
              default:
                Te(e, t, u, d, n, null);
            }
        t = c, n = r, e.multiple = !!l, t != null ? ql(e, !!l, t, !1) : n != null && ql(e, !!l, n, !0);
        return;
      case "textarea":
        se("invalid", e), c = u = l = null;
        for (r in n)
          if (n.hasOwnProperty(r) && (d = n[r], d != null))
            switch (r) {
              case "value":
                l = d;
                break;
              case "defaultValue":
                u = d;
                break;
              case "children":
                c = d;
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(s(91));
                break;
              default:
                Te(e, t, r, d, n, null);
            }
        Ks(e, l, u, c);
        return;
      case "option":
        for (y in n)
          if (n.hasOwnProperty(y) && (l = n[y], l != null))
            switch (y) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Te(e, t, y, l, n, null);
            }
        return;
      case "dialog":
        se("beforetoggle", e), se("toggle", e), se("cancel", e), se("close", e);
        break;
      case "iframe":
      case "object":
        se("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < fu.length; l++)
          se(fu[l], e);
        break;
      case "image":
        se("error", e), se("load", e);
        break;
      case "details":
        se("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        se("error", e), se("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in n)
          if (n.hasOwnProperty(z) && (l = n[z], l != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Te(e, t, z, l, n, null);
            }
        return;
      default:
        if (rc(t)) {
          for (j in n)
            n.hasOwnProperty(j) && (l = n[j], l !== void 0 && Fo(
              e,
              t,
              j,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (d in n)
      n.hasOwnProperty(d) && (l = n[d], l != null && Te(e, t, d, l, n, null));
  }
  function _0(e, t, n, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, c = null, r = null, d = null, y = null, z = null, j = null;
        for (A in n) {
          var w = n[A];
          if (n.hasOwnProperty(A) && w != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = w;
              default:
                l.hasOwnProperty(A) || Te(e, t, A, null, l, w);
            }
        }
        for (var E in l) {
          var A = l[E];
          if (w = n[E], l.hasOwnProperty(E) && (A != null || w != null))
            switch (E) {
              case "type":
                c = A;
                break;
              case "name":
                u = A;
                break;
              case "checked":
                z = A;
                break;
              case "defaultChecked":
                j = A;
                break;
              case "value":
                r = A;
                break;
              case "defaultValue":
                d = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(s(137, t));
                break;
              default:
                A !== w && Te(
                  e,
                  t,
                  E,
                  A,
                  l,
                  w
                );
            }
        }
        oc(
          e,
          r,
          d,
          y,
          z,
          j,
          c,
          u
        );
        return;
      case "select":
        A = r = d = E = null;
        for (c in n)
          if (y = n[c], n.hasOwnProperty(c) && y != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                A = y;
              default:
                l.hasOwnProperty(c) || Te(
                  e,
                  t,
                  c,
                  null,
                  l,
                  y
                );
            }
        for (u in l)
          if (c = l[u], y = n[u], l.hasOwnProperty(u) && (c != null || y != null))
            switch (u) {
              case "value":
                E = c;
                break;
              case "defaultValue":
                d = c;
                break;
              case "multiple":
                r = c;
              default:
                c !== y && Te(
                  e,
                  t,
                  u,
                  c,
                  l,
                  y
                );
            }
        t = d, n = r, l = A, E != null ? ql(e, !!n, E, !1) : !!l != !!n && (t != null ? ql(e, !!n, t, !0) : ql(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        A = E = null;
        for (d in n)
          if (u = n[d], n.hasOwnProperty(d) && u != null && !l.hasOwnProperty(d))
            switch (d) {
              case "value":
                break;
              case "children":
                break;
              default:
                Te(e, t, d, null, l, u);
            }
        for (r in l)
          if (u = l[r], c = n[r], l.hasOwnProperty(r) && (u != null || c != null))
            switch (r) {
              case "value":
                E = u;
                break;
              case "defaultValue":
                A = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== c && Te(e, t, r, u, l, c);
            }
        Vs(e, E, A);
        return;
      case "option":
        for (var k in n)
          if (E = n[k], n.hasOwnProperty(k) && E != null && !l.hasOwnProperty(k))
            switch (k) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Te(
                  e,
                  t,
                  k,
                  null,
                  l,
                  E
                );
            }
        for (y in l)
          if (E = l[y], A = n[y], l.hasOwnProperty(y) && E !== A && (E != null || A != null))
            switch (y) {
              case "selected":
                e.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                Te(
                  e,
                  t,
                  y,
                  E,
                  l,
                  A
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var W in n)
          E = n[W], n.hasOwnProperty(W) && E != null && !l.hasOwnProperty(W) && Te(e, t, W, null, l, E);
        for (z in l)
          if (E = l[z], A = n[z], l.hasOwnProperty(z) && E !== A && (E != null || A != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(s(137, t));
                break;
              default:
                Te(
                  e,
                  t,
                  z,
                  E,
                  l,
                  A
                );
            }
        return;
      default:
        if (rc(t)) {
          for (var Ae in n)
            E = n[Ae], n.hasOwnProperty(Ae) && E !== void 0 && !l.hasOwnProperty(Ae) && Fo(
              e,
              t,
              Ae,
              void 0,
              l,
              E
            );
          for (j in l)
            E = l[j], A = n[j], !l.hasOwnProperty(j) || E === A || E === void 0 && A === void 0 || Fo(
              e,
              t,
              j,
              E,
              l,
              A
            );
          return;
        }
    }
    for (var _ in n)
      E = n[_], n.hasOwnProperty(_) && E != null && !l.hasOwnProperty(_) && Te(e, t, _, null, l, E);
    for (w in l)
      E = l[w], A = n[w], !l.hasOwnProperty(w) || E === A || E == null && A == null || Te(e, t, w, E, l, A);
  }
  function Fd(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function S0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var u = n[l], c = u.transferSize, r = u.initiatorType, d = u.duration;
        if (c && d && Fd(r)) {
          for (r = 0, d = u.responseEnd, l += 1; l < n.length; l++) {
            var y = n[l], z = y.startTime;
            if (z > d) break;
            var j = y.transferSize, w = y.initiatorType;
            j && Fd(w) && (y = y.responseEnd, r += j * (y < d ? 1 : (d - z) / (y - z)));
          }
          if (--l, t += 8 * (c + r) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Io = null, Po = null;
  function Mi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Id(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Pd(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function es(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ts = null;
  function x0() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ts ? !1 : (ts = e, !0) : (ts = null, !1);
  }
  var eh = typeof setTimeout == "function" ? setTimeout : void 0, z0 = typeof clearTimeout == "function" ? clearTimeout : void 0, th = typeof Promise == "function" ? Promise : void 0, E0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof th < "u" ? function(e) {
    return th.resolve(null).then(e).catch(T0);
  } : eh;
  function T0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Vn(e) {
    return e === "head";
  }
  function nh(e, t) {
    var n = t, l = 0;
    do {
      var u = n.nextSibling;
      if (e.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(u), va(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          hu(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, hu(n);
          for (var c = n.firstChild; c; ) {
            var r = c.nextSibling, d = c.nodeName;
            c[wa] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = r;
          }
        } else
          n === "body" && hu(e.ownerDocument.body);
      n = u;
    } while (n);
    va(t);
  }
  function lh(e, t) {
    var n = e;
    e = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = l;
    } while (n);
  }
  function ns(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ns(n), ic(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function A0(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[wa])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Xt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function O0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Xt(e.nextSibling), e === null)) return null;
    return e;
  }
  function ah(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Xt(e.nextSibling), e === null)) return null;
    return e;
  }
  function ls(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function as(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function j0(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var l = function() {
        t(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Xt(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var us = null;
  function uh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Xt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ih(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function ch(e, t, n) {
    switch (t = Mi(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function hu(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    ic(e);
  }
  var Qt = /* @__PURE__ */ new Map(), oh = /* @__PURE__ */ new Set();
  function wi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var An = H.d;
  H.d = {
    f: N0,
    r: M0,
    D: w0,
    C: C0,
    L: D0,
    m: U0,
    X: Z0,
    S: R0,
    M: q0
  };
  function N0() {
    var e = An.f(), t = xi();
    return e || t;
  }
  function M0(e) {
    var t = Ul(e);
    t !== null && t.tag === 5 && t.type === "form" ? Tf(t) : An.r(e);
  }
  var da = typeof document > "u" ? null : document;
  function sh(e, t, n) {
    var l = da;
    if (l && typeof t == "string" && t) {
      var u = qt(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), oh.has(u) || (oh.add(u), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), st(t, "link", e), tt(t), l.head.appendChild(t)));
    }
  }
  function w0(e) {
    An.D(e), sh("dns-prefetch", e, null);
  }
  function C0(e, t) {
    An.C(e, t), sh("preconnect", e, t);
  }
  function D0(e, t, n) {
    An.L(e, t, n);
    var l = da;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + qt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + qt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + qt(
        n.imageSizes
      ) + '"]')) : u += '[href="' + qt(e) + '"]';
      var c = u;
      switch (t) {
        case "style":
          c = ha(e);
          break;
        case "script":
          c = ma(e);
      }
      Qt.has(c) || (e = U(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Qt.set(c, e), l.querySelector(u) !== null || t === "style" && l.querySelector(mu(c)) || t === "script" && l.querySelector(vu(c)) || (t = l.createElement("link"), st(t, "link", e), tt(t), l.head.appendChild(t)));
    }
  }
  function U0(e, t) {
    An.m(e, t);
    var n = da;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + qt(l) + '"][href="' + qt(e) + '"]', c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = ma(e);
      }
      if (!Qt.has(c) && (e = U({ rel: "modulepreload", href: e }, t), Qt.set(c, e), n.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(vu(c)))
              return;
        }
        l = n.createElement("link"), st(l, "link", e), tt(l), n.head.appendChild(l);
      }
    }
  }
  function R0(e, t, n) {
    An.S(e, t, n);
    var l = da;
    if (l && e) {
      var u = Rl(l).hoistableStyles, c = ha(e);
      t = t || "default";
      var r = u.get(c);
      if (!r) {
        var d = { loading: 0, preload: null };
        if (r = l.querySelector(
          mu(c)
        ))
          d.loading = 5;
        else {
          e = U(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Qt.get(c)) && is(e, n);
          var y = r = l.createElement("link");
          tt(y), st(y, "link", e), y._p = new Promise(function(z, j) {
            y.onload = z, y.onerror = j;
          }), y.addEventListener("load", function() {
            d.loading |= 1;
          }), y.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, Ci(r, t, l);
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: d
        }, u.set(c, r);
      }
    }
  }
  function Z0(e, t) {
    An.X(e, t);
    var n = da;
    if (n && e) {
      var l = Rl(n).hoistableScripts, u = ma(e), c = l.get(u);
      c || (c = n.querySelector(vu(u)), c || (e = U({ src: e, async: !0 }, t), (t = Qt.get(u)) && cs(e, t), c = n.createElement("script"), tt(c), st(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function q0(e, t) {
    An.M(e, t);
    var n = da;
    if (n && e) {
      var l = Rl(n).hoistableScripts, u = ma(e), c = l.get(u);
      c || (c = n.querySelector(vu(u)), c || (e = U({ src: e, async: !0, type: "module" }, t), (t = Qt.get(u)) && cs(e, t), c = n.createElement("script"), tt(c), st(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function rh(e, t, n, l) {
    var u = (u = ue.current) ? wi(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = ha(n.href), n = Rl(
          u
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = ha(n.href);
          var c = Rl(
            u
          ).hoistableStyles, r = c.get(e);
          if (r || (u = u.ownerDocument || u, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, r), (c = u.querySelector(
            mu(e)
          )) && !c._p && (r.instance = c, r.state.loading = 5), Qt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Qt.set(e, n), c || H0(
            u,
            e,
            n,
            r.state
          ))), t && l === null)
            throw Error(s(528, ""));
          return r;
        }
        if (t && l !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ma(n), n = Rl(
          u
        ).hoistableScripts, l = n.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function ha(e) {
    return 'href="' + qt(e) + '"';
  }
  function mu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function fh(e) {
    return U({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function H0(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), st(t, "link", n), tt(t), e.head.appendChild(t));
  }
  function ma(e) {
    return '[src="' + qt(e) + '"]';
  }
  function vu(e) {
    return "script[async]" + e;
  }
  function dh(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + qt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, tt(l), l;
          var u = U({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), tt(l), st(l, "style", u), Ci(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          u = ha(n.href);
          var c = e.querySelector(
            mu(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, tt(c), c;
          l = fh(n), (u = Qt.get(u)) && is(l, u), c = (e.ownerDocument || e).createElement("link"), tt(c);
          var r = c;
          return r._p = new Promise(function(d, y) {
            r.onload = d, r.onerror = y;
          }), st(c, "link", l), t.state.loading |= 4, Ci(c, n.precedence, e), t.instance = c;
        case "script":
          return c = ma(n.src), (u = e.querySelector(
            vu(c)
          )) ? (t.instance = u, tt(u), u) : (l = n, (u = Qt.get(c)) && (l = U({}, n), cs(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), tt(u), st(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Ci(l, n.precedence, e));
    return t.instance;
  }
  function Ci(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, c = u, r = 0; r < l.length; r++) {
      var d = l[r];
      if (d.dataset.precedence === t) c = d;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function is(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function cs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Di = null;
  function hh(e, t, n) {
    if (Di === null) {
      var l = /* @__PURE__ */ new Map(), u = Di = /* @__PURE__ */ new Map();
      u.set(n, l);
    } else
      u = Di, l = u.get(n), l || (l = /* @__PURE__ */ new Map(), u.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), u = 0; u < n.length; u++) {
      var c = n[u];
      if (!(c[wa] || c[ut] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = c.getAttribute(t) || "";
        r = e + r;
        var d = l.get(r);
        d ? d.push(c) : l.set(r, [c]);
      }
    }
    return l;
  }
  function mh(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function B0(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function vh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Y0(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = ha(l.href), c = t.querySelector(
          mu(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Ui.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, tt(c);
          return;
        }
        c = t.ownerDocument || t, l = fh(l), (u = Qt.get(u)) && is(l, u), c = c.createElement("link"), tt(c);
        var r = c;
        r._p = new Promise(function(d, y) {
          r.onload = d, r.onerror = y;
        }), st(c, "link", l), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Ui.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var os = 0;
  function k0(e, t) {
    return e.stylesheets && e.count === 0 && Zi(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && Zi(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && os === 0 && (os = 62500 * S0());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Zi(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > os ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function Ui() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Zi(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ri = null;
  function Zi(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ri = /* @__PURE__ */ new Map(), t.forEach(L0, e), Ri = null, Ui.call(e));
  }
  function L0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Ri.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ri.set(e, n);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var r = u[c];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (n.set(r.dataset.precedence, r), l = r);
        }
        l && n.set(null, l);
      }
      u = t.instance, r = u.getAttribute("data-precedence"), c = n.get(r) || l, c === l && n.set(null, u), n.set(r, u), this.count++, l = Ui.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var yu = {
    $$typeof: me,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0
  };
  function G0(e, t, n, l, u, c, r, d, y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Z(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Z(0), this.hiddenUpdates = Z(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function yh(e, t, n, l, u, c, r, d, y, z, j, w) {
    return e = new G0(
      e,
      t,
      n,
      r,
      y,
      z,
      j,
      w,
      d
    ), t = 1, c === !0 && (t |= 24), c = Ot(3, null, null, t), e.current = c, c.stateNode = e, t = Yc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, Xc(c), e;
  }
  function ph(e) {
    return e ? (e = Ql, e) : Ql;
  }
  function gh(e, t, n, l, u, c) {
    u = ph(u), l.context === null ? l.context = u : l.pendingContext = u, l = Rn(t), l.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (l.callback = c), n = Zn(e, l, t), n !== null && (St(n, e, t), $a(n, e, t));
  }
  function bh(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function ss(e, t) {
    bh(e, t), (e = e.alternate) && bh(e, t);
  }
  function _h(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = fl(e, 67108864);
      t !== null && St(t, e, 67108864), ss(e, 67108864);
    }
  }
  function Sh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ct();
      t = at(t);
      var n = fl(e, t);
      n !== null && St(n, e, t), ss(e, t);
    }
  }
  var qi = !0;
  function X0(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = H.p;
    try {
      H.p = 2, rs(e, t, n, l);
    } finally {
      H.p = c, O.T = u;
    }
  }
  function Q0(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = H.p;
    try {
      H.p = 8, rs(e, t, n, l);
    } finally {
      H.p = c, O.T = u;
    }
  }
  function rs(e, t, n, l) {
    if (qi) {
      var u = fs(l);
      if (u === null)
        Wo(
          e,
          t,
          l,
          Hi,
          n
        ), zh(e, l);
      else if (K0(
        u,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (zh(e, l), t & 4 && -1 < V0.indexOf(e)) {
        for (; u !== null; ) {
          var c = Ul(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var r = cn(c.pendingLanes);
                  if (r !== 0) {
                    var d = c;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; r; ) {
                      var y = 1 << 31 - lt(r);
                      d.entanglements[1] |= y, r &= ~y;
                    }
                    ln(c), (ge & 6) === 0 && (_i = ft() + 500, ru(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = fl(c, 2), d !== null && St(d, c, 2), xi(), ss(c, 2);
            }
          if (c = fs(l), c === null && Wo(
            e,
            t,
            l,
            Hi,
            n
          ), c === u) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else
        Wo(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function fs(e) {
    return e = dc(e), ds(e);
  }
  var Hi = null;
  function ds(e) {
    if (Hi = null, e = Dl(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = v(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = T(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Hi = e, null;
  }
  function xh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Oa()) {
          case ja:
            return 2;
          case Na:
            return 8;
          case al:
          case Tu:
            return 32;
          case Au:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var hs = !1, Kn = null, $n = null, Jn = null, pu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map(), Wn = [], V0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function zh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Kn = null;
        break;
      case "dragenter":
      case "dragleave":
        $n = null;
        break;
      case "mouseover":
      case "mouseout":
        Jn = null;
        break;
      case "pointerover":
      case "pointerout":
        pu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gu.delete(t.pointerId);
    }
  }
  function bu(e, t, n, l, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = Ul(t), t !== null && _h(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function K0(e, t, n, l, u) {
    switch (t) {
      case "focusin":
        return Kn = bu(
          Kn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "dragenter":
        return $n = bu(
          $n,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "mouseover":
        return Jn = bu(
          Jn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return pu.set(
          c,
          bu(
            pu.get(c) || null,
            e,
            t,
            n,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, gu.set(
          c,
          bu(
            gu.get(c) || null,
            e,
            t,
            n,
            l,
            u
          )
        ), !0;
    }
    return !1;
  }
  function Eh(e) {
    var t = Dl(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = v(n), t !== null) {
            e.blockedOn = t, wl(e.priority, function() {
              Sh(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = T(n), t !== null) {
            e.blockedOn = t, wl(e.priority, function() {
              Sh(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Bi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = fs(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        fc = l, n.target.dispatchEvent(l), fc = null;
      } else
        return t = Ul(n), t !== null && _h(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Th(e, t, n) {
    Bi(e) && n.delete(t);
  }
  function $0() {
    hs = !1, Kn !== null && Bi(Kn) && (Kn = null), $n !== null && Bi($n) && ($n = null), Jn !== null && Bi(Jn) && (Jn = null), pu.forEach(Th), gu.forEach(Th);
  }
  function Yi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, hs || (hs = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      $0
    )));
  }
  var ki = null;
  function Ah(e) {
    ki !== e && (ki = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ki === e && (ki = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (ds(l || n) === null)
              continue;
            break;
          }
          var c = Ul(n);
          c !== null && (e.splice(t, 3), t -= 3, ro(
            c,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: l
            },
            l,
            u
          ));
        }
      }
    ));
  }
  function va(e) {
    function t(y) {
      return Yi(y, e);
    }
    Kn !== null && Yi(Kn, e), $n !== null && Yi($n, e), Jn !== null && Yi(Jn, e), pu.forEach(t), gu.forEach(t);
    for (var n = 0; n < Wn.length; n++) {
      var l = Wn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Wn.length && (n = Wn[0], n.blockedOn === null); )
      Eh(n), n.blockedOn === null && Wn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var u = n[l], c = n[l + 1], r = u[vt] || null;
        if (typeof c == "function")
          r || Ah(n);
        else if (r) {
          var d = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, r = c[vt] || null)
              d = r.formAction;
            else if (ds(u) !== null) continue;
          } else d = r.action;
          typeof d == "function" ? n[l + 1] = d : (n.splice(l, 3), l -= 3), Ah(n);
        }
      }
  }
  function Oh() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(r) {
            return u = r;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function ms(e) {
    this._internalRoot = e;
  }
  Li.prototype.render = ms.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var n = t.current, l = Ct();
    gh(n, l, e, t, null, null);
  }, Li.prototype.unmount = ms.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      gh(e.current, 2, null, e, null, null), xi(), t[Cl] = null;
    }
  };
  function Li(e) {
    this._internalRoot = e;
  }
  Li.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = wu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Wn.length && t !== 0 && t < Wn[n].priority; n++) ;
      Wn.splice(n, 0, e), n === 0 && Eh(e);
    }
  };
  var jh = i.version;
  if (jh !== "19.2.4")
    throw Error(
      s(
        527,
        jh,
        "19.2.4"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = p(t), e = e !== null ? R(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var J0 = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Gi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Gi.isDisabled && Gi.supportsFiber)
      try {
        ul = Gi.inject(
          J0
        ), dt = Gi;
      } catch {
      }
  }
  return Su.createRoot = function(e, t) {
    if (!f(e)) throw Error(s(299));
    var n = !1, l = "", u = Rf, c = Zf, r = qf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = yh(
      e,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      u,
      c,
      r,
      Oh
    ), e[Cl] = t.current, Jo(e), new ms(t);
  }, Su.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(s(299));
    var l = !1, u = "", c = Rf, r = Zf, d = qf, y = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (d = n.onRecoverableError), n.formState !== void 0 && (y = n.formState)), t = yh(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      u,
      y,
      c,
      r,
      d,
      Oh
    ), t.context = ph(null), n = t.current, l = Ct(), l = at(l), u = Rn(l), u.callback = null, Zn(n, u, l), n = l, t.current.lanes = n, K(t, n), ln(t), e[Cl] = t.current, Jo(e), new Li(t);
  }, Su.version = "19.2.4", Su;
}
var Hh;
function uy() {
  if (Hh) return ps.exports;
  Hh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), ps.exports = ay(), ps.exports;
}
var iy = uy();
const cy = /* @__PURE__ */ dm(iy);
function C(a, i, o) {
  function s(T, S) {
    if (T._zod || Object.defineProperty(T, "_zod", {
      value: {
        def: S,
        constr: v,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), T._zod.traits.has(a))
      return;
    T._zod.traits.add(a), i(T, S);
    const p = v.prototype, R = Object.keys(p);
    for (let U = 0; U < R.length; U++) {
      const L = R[U];
      L in T || (T[L] = p[L].bind(T));
    }
  }
  const f = o?.Parent ?? Object;
  class m extends f {
  }
  Object.defineProperty(m, "name", { value: a });
  function v(T) {
    var S;
    const p = o?.Parent ? new m() : this;
    s(p, T), (S = p._zod).deferred ?? (S.deferred = []);
    for (const R of p._zod.deferred)
      R();
    return p;
  }
  return Object.defineProperty(v, "init", { value: s }), Object.defineProperty(v, Symbol.hasInstance, {
    value: (T) => o?.Parent && T instanceof o.Parent ? !0 : T?._zod?.traits?.has(a)
  }), Object.defineProperty(v, "name", { value: a }), v;
}
class ba extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class hm extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const mm = {};
function Pn(a) {
  return mm;
}
function oy(a) {
  const i = Object.values(a).filter((s) => typeof s == "number");
  return Object.entries(a).filter(([s, f]) => i.indexOf(+s) === -1).map(([s, f]) => f);
}
function Es(a, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function Ns(a) {
  return {
    get value() {
      {
        const i = a();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function Ms(a) {
  return a == null;
}
function ws(a) {
  const i = a.startsWith("^") ? 1 : 0, o = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(i, o);
}
function sy(a, i) {
  const o = (a.toString().split(".")[1] || "").length, s = i.toString();
  let f = (s.split(".")[1] || "").length;
  if (f === 0 && /\d?e-\d?/.test(s)) {
    const S = s.match(/\d?e-(\d?)/);
    S?.[1] && (f = Number.parseInt(S[1]));
  }
  const m = o > f ? o : f, v = Number.parseInt(a.toFixed(m).replace(".", "")), T = Number.parseInt(i.toFixed(m).replace(".", ""));
  return v % T / 10 ** m;
}
const Bh = /* @__PURE__ */ Symbol("evaluating");
function Me(a, i, o) {
  let s;
  Object.defineProperty(a, i, {
    get() {
      if (s !== Bh)
        return s === void 0 && (s = Bh, s = o()), s;
    },
    set(f) {
      Object.defineProperty(a, i, {
        value: f
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function El(a, i, o) {
  Object.defineProperty(a, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Tl(...a) {
  const i = {};
  for (const o of a) {
    const s = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, s);
  }
  return Object.defineProperties({}, i);
}
function Yh(a) {
  return JSON.stringify(a);
}
function ry(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const vm = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function $i(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const fy = Ns(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function _a(a) {
  if ($i(a) === !1)
    return !1;
  const i = a.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !($i(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function ym(a) {
  return _a(a) ? { ...a } : Array.isArray(a) ? [...a] : a;
}
const dy = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Ii(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function tl(a, i, o) {
  const s = new a._zod.constr(i ?? a._zod.def);
  return (!i || o?.parent) && (s._zod.parent = a), s;
}
function V(a) {
  const i = a;
  if (!i)
    return {};
  if (typeof i == "string")
    return { error: () => i };
  if (i?.message !== void 0) {
    if (i?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    i.error = i.message;
  }
  return delete i.message, typeof i.error == "string" ? { ...i, error: () => i.error } : i;
}
function hy(a) {
  return Object.keys(a).filter((i) => a[i]._zod.optin === "optional" && a[i]._zod.optout === "optional");
}
const my = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function vy(a, i) {
  const o = a._zod.def, s = Tl(a._zod.def, {
    get shape() {
      const f = {};
      for (const m in i) {
        if (!(m in o.shape))
          throw new Error(`Unrecognized key: "${m}"`);
        i[m] && (f[m] = o.shape[m]);
      }
      return El(this, "shape", f), f;
    },
    checks: []
  });
  return tl(a, s);
}
function yy(a, i) {
  const o = a._zod.def, s = Tl(a._zod.def, {
    get shape() {
      const f = { ...a._zod.def.shape };
      for (const m in i) {
        if (!(m in o.shape))
          throw new Error(`Unrecognized key: "${m}"`);
        i[m] && delete f[m];
      }
      return El(this, "shape", f), f;
    },
    checks: []
  });
  return tl(a, s);
}
function py(a, i) {
  if (!_a(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = a._zod.def.checks;
  if (o && o.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const f = Tl(a._zod.def, {
    get shape() {
      const m = { ...a._zod.def.shape, ...i };
      return El(this, "shape", m), m;
    },
    checks: []
  });
  return tl(a, f);
}
function gy(a, i) {
  if (!_a(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = {
    ...a._zod.def,
    get shape() {
      const s = { ...a._zod.def.shape, ...i };
      return El(this, "shape", s), s;
    },
    checks: a._zod.def.checks
  };
  return tl(a, o);
}
function by(a, i) {
  const o = Tl(a._zod.def, {
    get shape() {
      const s = { ...a._zod.def.shape, ...i._zod.def.shape };
      return El(this, "shape", s), s;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return tl(a, o);
}
function _y(a, i, o) {
  const s = Tl(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, m = { ...f };
      if (o)
        for (const v in o) {
          if (!(v in f))
            throw new Error(`Unrecognized key: "${v}"`);
          o[v] && (m[v] = a ? new a({
            type: "optional",
            innerType: f[v]
          }) : f[v]);
        }
      else
        for (const v in f)
          m[v] = a ? new a({
            type: "optional",
            innerType: f[v]
          }) : f[v];
      return El(this, "shape", m), m;
    },
    checks: []
  });
  return tl(i, s);
}
function Sy(a, i, o) {
  const s = Tl(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, m = { ...f };
      if (o)
        for (const v in o) {
          if (!(v in m))
            throw new Error(`Unrecognized key: "${v}"`);
          o[v] && (m[v] = new a({
            type: "nonoptional",
            innerType: f[v]
          }));
        }
      else
        for (const v in f)
          m[v] = new a({
            type: "nonoptional",
            innerType: f[v]
          });
      return El(this, "shape", m), m;
    },
    checks: []
  });
  return tl(i, s);
}
function ya(a, i = 0) {
  if (a.aborted === !0)
    return !0;
  for (let o = i; o < a.issues.length; o++)
    if (a.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function pa(a, i) {
  return i.map((o) => {
    var s;
    return (s = o).path ?? (s.path = []), o.path.unshift(a), o;
  });
}
function Xi(a) {
  return typeof a == "string" ? a : a?.message;
}
function el(a, i, o) {
  const s = { ...a, path: a.path ?? [] };
  if (!a.message) {
    const f = Xi(a.inst?._zod.def?.error?.(a)) ?? Xi(i?.error?.(a)) ?? Xi(o.customError?.(a)) ?? Xi(o.localeError?.(a)) ?? "Invalid input";
    s.message = f;
  }
  return delete s.inst, delete s.continue, i?.reportInput || delete s.input, s;
}
function Cs(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function xu(...a) {
  const [i, o, s] = a;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: s
  } : { ...i };
}
const pm = (a, i) => {
  a.name = "$ZodError", Object.defineProperty(a, "_zod", {
    value: a._zod,
    enumerable: !1
  }), Object.defineProperty(a, "issues", {
    value: i,
    enumerable: !1
  }), a.message = JSON.stringify(i, Es, 2), Object.defineProperty(a, "toString", {
    value: () => a.message,
    enumerable: !1
  });
}, gm = C("$ZodError", pm), bm = C("$ZodError", pm, { Parent: Error });
function xy(a, i = (o) => o.message) {
  const o = {}, s = [];
  for (const f of a.issues)
    f.path.length > 0 ? (o[f.path[0]] = o[f.path[0]] || [], o[f.path[0]].push(i(f))) : s.push(i(f));
  return { formErrors: s, fieldErrors: o };
}
function zy(a, i = (o) => o.message) {
  const o = { _errors: [] }, s = (f) => {
    for (const m of f.issues)
      if (m.code === "invalid_union" && m.errors.length)
        m.errors.map((v) => s({ issues: v }));
      else if (m.code === "invalid_key")
        s({ issues: m.issues });
      else if (m.code === "invalid_element")
        s({ issues: m.issues });
      else if (m.path.length === 0)
        o._errors.push(i(m));
      else {
        let v = o, T = 0;
        for (; T < m.path.length; ) {
          const S = m.path[T];
          T === m.path.length - 1 ? (v[S] = v[S] || { _errors: [] }, v[S]._errors.push(i(m))) : v[S] = v[S] || { _errors: [] }, v = v[S], T++;
        }
      }
  };
  return s(a), o;
}
const Ds = (a) => (i, o, s, f) => {
  const m = s ? Object.assign(s, { async: !1 }) : { async: !1 }, v = i._zod.run({ value: o, issues: [] }, m);
  if (v instanceof Promise)
    throw new ba();
  if (v.issues.length) {
    const T = new (f?.Err ?? a)(v.issues.map((S) => el(S, m, Pn())));
    throw vm(T, f?.callee), T;
  }
  return v.value;
}, Us = (a) => async (i, o, s, f) => {
  const m = s ? Object.assign(s, { async: !0 }) : { async: !0 };
  let v = i._zod.run({ value: o, issues: [] }, m);
  if (v instanceof Promise && (v = await v), v.issues.length) {
    const T = new (f?.Err ?? a)(v.issues.map((S) => el(S, m, Pn())));
    throw vm(T, f?.callee), T;
  }
  return v.value;
}, Pi = (a) => (i, o, s) => {
  const f = s ? { ...s, async: !1 } : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, f);
  if (m instanceof Promise)
    throw new ba();
  return m.issues.length ? {
    success: !1,
    error: new (a ?? gm)(m.issues.map((v) => el(v, f, Pn())))
  } : { success: !0, data: m.value };
}, Ey = /* @__PURE__ */ Pi(bm), ec = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, f);
  return m instanceof Promise && (m = await m), m.issues.length ? {
    success: !1,
    error: new a(m.issues.map((v) => el(v, f, Pn())))
  } : { success: !0, data: m.value };
}, Ty = /* @__PURE__ */ ec(bm), Ay = (a) => (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Ds(a)(i, o, f);
}, Oy = (a) => (i, o, s) => Ds(a)(i, o, s), jy = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Us(a)(i, o, f);
}, Ny = (a) => async (i, o, s) => Us(a)(i, o, s), My = (a) => (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Pi(a)(i, o, f);
}, wy = (a) => (i, o, s) => Pi(a)(i, o, s), Cy = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return ec(a)(i, o, f);
}, Dy = (a) => async (i, o, s) => ec(a)(i, o, s), Uy = /^[cC][^\s-]{8,}$/, Ry = /^[0-9a-z]+$/, Zy = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, qy = /^[0-9a-vA-V]{20}$/, Hy = /^[A-Za-z0-9]{27}$/, By = /^[a-zA-Z0-9_-]{21}$/, Yy = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, ky = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, kh = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Ly = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Gy = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Xy() {
  return new RegExp(Gy, "u");
}
const Qy = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Vy = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Ky = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, $y = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Jy = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, _m = /^[A-Za-z0-9_-]*$/, Wy = /^\+(?:[0-9]){6,14}[0-9]$/, Sm = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Fy = /* @__PURE__ */ new RegExp(`^${Sm}$`);
function xm(a) {
  const i = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${i}` : a.precision === 0 ? `${i}:[0-5]\\d` : `${i}:[0-5]\\d\\.\\d{${a.precision}}` : `${i}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Iy(a) {
  return new RegExp(`^${xm(a)}$`);
}
function Py(a) {
  const i = xm({ precision: a.precision }), o = ["Z"];
  a.local && o.push(""), a.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const s = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${Sm}T(?:${s})$`);
}
const ep = (a) => {
  const i = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, tp = /^-?\d+$/, np = /^-?\d+(?:\.\d+)?/, lp = /^[^A-Z]*$/, ap = /^[^a-z]*$/, xt = /* @__PURE__ */ C("$ZodCheck", (a, i) => {
  var o;
  a._zod ?? (a._zod = {}), a._zod.def = i, (o = a._zod).onattach ?? (o.onattach = []);
}), zm = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Em = /* @__PURE__ */ C("$ZodCheckLessThan", (a, i) => {
  xt.init(a, i);
  const o = zm[typeof i.value];
  a._zod.onattach.push((s) => {
    const f = s._zod.bag, m = (i.inclusive ? f.maximum : f.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    i.value < m && (i.inclusive ? f.maximum = i.value : f.exclusiveMaximum = i.value);
  }), a._zod.check = (s) => {
    (i.inclusive ? s.value <= i.value : s.value < i.value) || s.issues.push({
      origin: o,
      code: "too_big",
      maximum: i.value,
      input: s.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), Tm = /* @__PURE__ */ C("$ZodCheckGreaterThan", (a, i) => {
  xt.init(a, i);
  const o = zm[typeof i.value];
  a._zod.onattach.push((s) => {
    const f = s._zod.bag, m = (i.inclusive ? f.minimum : f.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    i.value > m && (i.inclusive ? f.minimum = i.value : f.exclusiveMinimum = i.value);
  }), a._zod.check = (s) => {
    (i.inclusive ? s.value >= i.value : s.value > i.value) || s.issues.push({
      origin: o,
      code: "too_small",
      minimum: i.value,
      input: s.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), up = /* @__PURE__ */ C("$ZodCheckMultipleOf", (a, i) => {
  xt.init(a, i), a._zod.onattach.push((o) => {
    var s;
    (s = o._zod.bag).multipleOf ?? (s.multipleOf = i.value);
  }), a._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : sy(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), ip = /* @__PURE__ */ C("$ZodCheckNumberFormat", (a, i) => {
  xt.init(a, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), s = o ? "int" : "number", [f, m] = my[i.format];
  a._zod.onattach.push((v) => {
    const T = v._zod.bag;
    T.format = i.format, T.minimum = f, T.maximum = m, o && (T.pattern = tp);
  }), a._zod.check = (v) => {
    const T = v.value;
    if (o) {
      if (!Number.isInteger(T)) {
        v.issues.push({
          expected: s,
          format: i.format,
          code: "invalid_type",
          continue: !1,
          input: T,
          inst: a
        });
        return;
      }
      if (!Number.isSafeInteger(T)) {
        T > 0 ? v.issues.push({
          input: T,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: s,
          continue: !i.abort
        }) : v.issues.push({
          input: T,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: s,
          continue: !i.abort
        });
        return;
      }
    }
    T < f && v.issues.push({
      origin: "number",
      input: T,
      code: "too_small",
      minimum: f,
      inclusive: !0,
      inst: a,
      continue: !i.abort
    }), T > m && v.issues.push({
      origin: "number",
      input: T,
      code: "too_big",
      maximum: m,
      inst: a
    });
  };
}), cp = /* @__PURE__ */ C("$ZodCheckMaxLength", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Ms(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < f && (s._zod.bag.maximum = i.maximum);
  }), a._zod.check = (s) => {
    const f = s.value;
    if (f.length <= i.maximum)
      return;
    const v = Cs(f);
    s.issues.push({
      origin: v,
      code: "too_big",
      maximum: i.maximum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !i.abort
    });
  };
}), op = /* @__PURE__ */ C("$ZodCheckMinLength", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Ms(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > f && (s._zod.bag.minimum = i.minimum);
  }), a._zod.check = (s) => {
    const f = s.value;
    if (f.length >= i.minimum)
      return;
    const v = Cs(f);
    s.issues.push({
      origin: v,
      code: "too_small",
      minimum: i.minimum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !i.abort
    });
  };
}), sp = /* @__PURE__ */ C("$ZodCheckLengthEquals", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Ms(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag;
    f.minimum = i.length, f.maximum = i.length, f.length = i.length;
  }), a._zod.check = (s) => {
    const f = s.value, m = f.length;
    if (m === i.length)
      return;
    const v = Cs(f), T = m > i.length;
    s.issues.push({
      origin: v,
      ...T ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length },
      inclusive: !0,
      exact: !0,
      input: s.value,
      inst: a,
      continue: !i.abort
    });
  };
}), tc = /* @__PURE__ */ C("$ZodCheckStringFormat", (a, i) => {
  var o, s;
  xt.init(a, i), a._zod.onattach.push((f) => {
    const m = f._zod.bag;
    m.format = i.format, i.pattern && (m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(i.pattern));
  }), i.pattern ? (o = a._zod).check ?? (o.check = (f) => {
    i.pattern.lastIndex = 0, !i.pattern.test(f.value) && f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: i.format,
      input: f.value,
      ...i.pattern ? { pattern: i.pattern.toString() } : {},
      inst: a,
      continue: !i.abort
    });
  }) : (s = a._zod).check ?? (s.check = () => {
  });
}), rp = /* @__PURE__ */ C("$ZodCheckRegex", (a, i) => {
  tc.init(a, i), a._zod.check = (o) => {
    i.pattern.lastIndex = 0, !i.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: o.value,
      pattern: i.pattern.toString(),
      inst: a,
      continue: !i.abort
    });
  };
}), fp = /* @__PURE__ */ C("$ZodCheckLowerCase", (a, i) => {
  i.pattern ?? (i.pattern = lp), tc.init(a, i);
}), dp = /* @__PURE__ */ C("$ZodCheckUpperCase", (a, i) => {
  i.pattern ?? (i.pattern = ap), tc.init(a, i);
}), hp = /* @__PURE__ */ C("$ZodCheckIncludes", (a, i) => {
  xt.init(a, i);
  const o = Ii(i.includes), s = new RegExp(typeof i.position == "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = s, a._zod.onattach.push((f) => {
    const m = f._zod.bag;
    m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(s);
  }), a._zod.check = (f) => {
    f.value.includes(i.includes, i.position) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: i.includes,
      input: f.value,
      inst: a,
      continue: !i.abort
    });
  };
}), mp = /* @__PURE__ */ C("$ZodCheckStartsWith", (a, i) => {
  xt.init(a, i);
  const o = new RegExp(`^${Ii(i.prefix)}.*`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((s) => {
    const f = s._zod.bag;
    f.patterns ?? (f.patterns = /* @__PURE__ */ new Set()), f.patterns.add(o);
  }), a._zod.check = (s) => {
    s.value.startsWith(i.prefix) || s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: i.prefix,
      input: s.value,
      inst: a,
      continue: !i.abort
    });
  };
}), vp = /* @__PURE__ */ C("$ZodCheckEndsWith", (a, i) => {
  xt.init(a, i);
  const o = new RegExp(`.*${Ii(i.suffix)}$`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((s) => {
    const f = s._zod.bag;
    f.patterns ?? (f.patterns = /* @__PURE__ */ new Set()), f.patterns.add(o);
  }), a._zod.check = (s) => {
    s.value.endsWith(i.suffix) || s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: i.suffix,
      input: s.value,
      inst: a,
      continue: !i.abort
    });
  };
}), yp = /* @__PURE__ */ C("$ZodCheckOverwrite", (a, i) => {
  xt.init(a, i), a._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
class pp {
  constructor(i = []) {
    this.content = [], this.indent = 0, this && (this.args = i);
  }
  indented(i) {
    this.indent += 1, i(this), this.indent -= 1;
  }
  write(i) {
    if (typeof i == "function") {
      i(this, { execution: "sync" }), i(this, { execution: "async" });
      return;
    }
    const s = i.split(`
`).filter((v) => v), f = Math.min(...s.map((v) => v.length - v.trimStart().length)), m = s.map((v) => v.slice(f)).map((v) => " ".repeat(this.indent * 2) + v);
    for (const v of m)
      this.content.push(v);
  }
  compile() {
    const i = Function, o = this?.args, f = [...(this?.content ?? [""]).map((m) => `  ${m}`)];
    return new i(...o, f.join(`
`));
  }
}
const gp = {
  major: 4,
  minor: 1,
  patch: 13
}, Qe = /* @__PURE__ */ C("$ZodType", (a, i) => {
  var o;
  a ?? (a = {}), a._zod.def = i, a._zod.bag = a._zod.bag || {}, a._zod.version = gp;
  const s = [...a._zod.def.checks ?? []];
  a._zod.traits.has("$ZodCheck") && s.unshift(a);
  for (const f of s)
    for (const m of f._zod.onattach)
      m(a);
  if (s.length === 0)
    (o = a._zod).deferred ?? (o.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const f = (v, T, S) => {
      let p = ya(v), R;
      for (const U of T) {
        if (U._zod.def.when) {
          if (!U._zod.def.when(v))
            continue;
        } else if (p)
          continue;
        const L = v.issues.length, ee = U._zod.check(v);
        if (ee instanceof Promise && S?.async === !1)
          throw new ba();
        if (R || ee instanceof Promise)
          R = (R ?? Promise.resolve()).then(async () => {
            await ee, v.issues.length !== L && (p || (p = ya(v, L)));
          });
        else {
          if (v.issues.length === L)
            continue;
          p || (p = ya(v, L));
        }
      }
      return R ? R.then(() => v) : v;
    }, m = (v, T, S) => {
      if (ya(v))
        return v.aborted = !0, v;
      const p = f(T, s, S);
      if (p instanceof Promise) {
        if (S.async === !1)
          throw new ba();
        return p.then((R) => a._zod.parse(R, S));
      }
      return a._zod.parse(p, S);
    };
    a._zod.run = (v, T) => {
      if (T.skipChecks)
        return a._zod.parse(v, T);
      if (T.direction === "backward") {
        const p = a._zod.parse({ value: v.value, issues: [] }, { ...T, skipChecks: !0 });
        return p instanceof Promise ? p.then((R) => m(R, v, T)) : m(p, v, T);
      }
      const S = a._zod.parse(v, T);
      if (S instanceof Promise) {
        if (T.async === !1)
          throw new ba();
        return S.then((p) => f(p, s, T));
      }
      return f(S, s, T);
    };
  }
  a["~standard"] = {
    validate: (f) => {
      try {
        const m = Ey(a, f);
        return m.success ? { value: m.data } : { issues: m.error?.issues };
      } catch {
        return Ty(a, f).then((v) => v.success ? { value: v.data } : { issues: v.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), Rs = /* @__PURE__ */ C("$ZodString", (a, i) => {
  Qe.init(a, i), a._zod.pattern = [...a?._zod.bag?.patterns ?? []].pop() ?? ep(a._zod.bag), a._zod.parse = (o, s) => {
    if (i.coerce)
      try {
        o.value = String(o.value);
      } catch {
      }
    return typeof o.value == "string" || o.issues.push({
      expected: "string",
      code: "invalid_type",
      input: o.value,
      inst: a
    }), o;
  };
}), Re = /* @__PURE__ */ C("$ZodStringFormat", (a, i) => {
  tc.init(a, i), Rs.init(a, i);
}), bp = /* @__PURE__ */ C("$ZodGUID", (a, i) => {
  i.pattern ?? (i.pattern = ky), Re.init(a, i);
}), _p = /* @__PURE__ */ C("$ZodUUID", (a, i) => {
  if (i.version) {
    const s = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[i.version];
    if (s === void 0)
      throw new Error(`Invalid UUID version: "${i.version}"`);
    i.pattern ?? (i.pattern = kh(s));
  } else
    i.pattern ?? (i.pattern = kh());
  Re.init(a, i);
}), Sp = /* @__PURE__ */ C("$ZodEmail", (a, i) => {
  i.pattern ?? (i.pattern = Ly), Re.init(a, i);
}), xp = /* @__PURE__ */ C("$ZodURL", (a, i) => {
  Re.init(a, i), a._zod.check = (o) => {
    try {
      const s = o.value.trim(), f = new URL(s);
      i.hostname && (i.hostname.lastIndex = 0, i.hostname.test(f.hostname) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: i.hostname.source,
        input: o.value,
        inst: a,
        continue: !i.abort
      })), i.protocol && (i.protocol.lastIndex = 0, i.protocol.test(f.protocol.endsWith(":") ? f.protocol.slice(0, -1) : f.protocol) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: i.protocol.source,
        input: o.value,
        inst: a,
        continue: !i.abort
      })), i.normalize ? o.value = f.href : o.value = s;
      return;
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "url",
        input: o.value,
        inst: a,
        continue: !i.abort
      });
    }
  };
}), zp = /* @__PURE__ */ C("$ZodEmoji", (a, i) => {
  i.pattern ?? (i.pattern = Xy()), Re.init(a, i);
}), Ep = /* @__PURE__ */ C("$ZodNanoID", (a, i) => {
  i.pattern ?? (i.pattern = By), Re.init(a, i);
}), Tp = /* @__PURE__ */ C("$ZodCUID", (a, i) => {
  i.pattern ?? (i.pattern = Uy), Re.init(a, i);
}), Ap = /* @__PURE__ */ C("$ZodCUID2", (a, i) => {
  i.pattern ?? (i.pattern = Ry), Re.init(a, i);
}), Op = /* @__PURE__ */ C("$ZodULID", (a, i) => {
  i.pattern ?? (i.pattern = Zy), Re.init(a, i);
}), jp = /* @__PURE__ */ C("$ZodXID", (a, i) => {
  i.pattern ?? (i.pattern = qy), Re.init(a, i);
}), Np = /* @__PURE__ */ C("$ZodKSUID", (a, i) => {
  i.pattern ?? (i.pattern = Hy), Re.init(a, i);
}), Mp = /* @__PURE__ */ C("$ZodISODateTime", (a, i) => {
  i.pattern ?? (i.pattern = Py(i)), Re.init(a, i);
}), wp = /* @__PURE__ */ C("$ZodISODate", (a, i) => {
  i.pattern ?? (i.pattern = Fy), Re.init(a, i);
}), Cp = /* @__PURE__ */ C("$ZodISOTime", (a, i) => {
  i.pattern ?? (i.pattern = Iy(i)), Re.init(a, i);
}), Dp = /* @__PURE__ */ C("$ZodISODuration", (a, i) => {
  i.pattern ?? (i.pattern = Yy), Re.init(a, i);
}), Up = /* @__PURE__ */ C("$ZodIPv4", (a, i) => {
  i.pattern ?? (i.pattern = Qy), Re.init(a, i), a._zod.bag.format = "ipv4";
}), Rp = /* @__PURE__ */ C("$ZodIPv6", (a, i) => {
  i.pattern ?? (i.pattern = Vy), Re.init(a, i), a._zod.bag.format = "ipv6", a._zod.check = (o) => {
    try {
      new URL(`http://[${o.value}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: o.value,
        inst: a,
        continue: !i.abort
      });
    }
  };
}), Zp = /* @__PURE__ */ C("$ZodCIDRv4", (a, i) => {
  i.pattern ?? (i.pattern = Ky), Re.init(a, i);
}), qp = /* @__PURE__ */ C("$ZodCIDRv6", (a, i) => {
  i.pattern ?? (i.pattern = $y), Re.init(a, i), a._zod.check = (o) => {
    const s = o.value.split("/");
    try {
      if (s.length !== 2)
        throw new Error();
      const [f, m] = s;
      if (!m)
        throw new Error();
      const v = Number(m);
      if (`${v}` !== m)
        throw new Error();
      if (v < 0 || v > 128)
        throw new Error();
      new URL(`http://[${f}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: o.value,
        inst: a,
        continue: !i.abort
      });
    }
  };
});
function Am(a) {
  if (a === "")
    return !0;
  if (a.length % 4 !== 0)
    return !1;
  try {
    return atob(a), !0;
  } catch {
    return !1;
  }
}
const Hp = /* @__PURE__ */ C("$ZodBase64", (a, i) => {
  i.pattern ?? (i.pattern = Jy), Re.init(a, i), a._zod.bag.contentEncoding = "base64", a._zod.check = (o) => {
    Am(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
});
function Bp(a) {
  if (!_m.test(a))
    return !1;
  const i = a.replace(/[-_]/g, (s) => s === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return Am(o);
}
const Yp = /* @__PURE__ */ C("$ZodBase64URL", (a, i) => {
  i.pattern ?? (i.pattern = _m), Re.init(a, i), a._zod.bag.contentEncoding = "base64url", a._zod.check = (o) => {
    Bp(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), kp = /* @__PURE__ */ C("$ZodE164", (a, i) => {
  i.pattern ?? (i.pattern = Wy), Re.init(a, i);
});
function Lp(a, i = null) {
  try {
    const o = a.split(".");
    if (o.length !== 3)
      return !1;
    const [s] = o;
    if (!s)
      return !1;
    const f = JSON.parse(atob(s));
    return !("typ" in f && f?.typ !== "JWT" || !f.alg || i && (!("alg" in f) || f.alg !== i));
  } catch {
    return !1;
  }
}
const Gp = /* @__PURE__ */ C("$ZodJWT", (a, i) => {
  Re.init(a, i), a._zod.check = (o) => {
    Lp(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Om = /* @__PURE__ */ C("$ZodNumber", (a, i) => {
  Qe.init(a, i), a._zod.pattern = a._zod.bag.pattern ?? np, a._zod.parse = (o, s) => {
    if (i.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const f = o.value;
    if (typeof f == "number" && !Number.isNaN(f) && Number.isFinite(f))
      return o;
    const m = typeof f == "number" ? Number.isNaN(f) ? "NaN" : Number.isFinite(f) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: f,
      inst: a,
      ...m ? { received: m } : {}
    }), o;
  };
}), Xp = /* @__PURE__ */ C("$ZodNumberFormat", (a, i) => {
  ip.init(a, i), Om.init(a, i);
}), Qp = /* @__PURE__ */ C("$ZodUnknown", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o) => o;
}), Vp = /* @__PURE__ */ C("$ZodNever", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o, s) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: a
  }), o);
});
function Lh(a, i, o) {
  a.issues.length && i.issues.push(...pa(o, a.issues)), i.value[o] = a.value;
}
const Kp = /* @__PURE__ */ C("$ZodArray", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value;
    if (!Array.isArray(f))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: f,
        inst: a
      }), o;
    o.value = Array(f.length);
    const m = [];
    for (let v = 0; v < f.length; v++) {
      const T = f[v], S = i.element._zod.run({
        value: T,
        issues: []
      }, s);
      S instanceof Promise ? m.push(S.then((p) => Lh(p, o, v))) : Lh(S, o, v);
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
});
function Ji(a, i, o, s) {
  a.issues.length && i.issues.push(...pa(o, a.issues)), a.value === void 0 ? o in s && (i.value[o] = void 0) : i.value[o] = a.value;
}
function jm(a) {
  const i = Object.keys(a.shape);
  for (const s of i)
    if (!a.shape?.[s]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${s}": expected a Zod schema`);
  const o = hy(a.shape);
  return {
    ...a,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function Nm(a, i, o, s, f, m) {
  const v = [], T = f.keySet, S = f.catchall._zod, p = S.def.type;
  for (const R in i) {
    if (T.has(R))
      continue;
    if (p === "never") {
      v.push(R);
      continue;
    }
    const U = S.run({ value: i[R], issues: [] }, s);
    U instanceof Promise ? a.push(U.then((L) => Ji(L, o, R, i))) : Ji(U, o, R, i);
  }
  return v.length && o.issues.push({
    code: "unrecognized_keys",
    keys: v,
    input: i,
    inst: m
  }), a.length ? Promise.all(a).then(() => o) : o;
}
const $p = /* @__PURE__ */ C("$ZodObject", (a, i) => {
  if (Qe.init(a, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    const T = i.shape;
    Object.defineProperty(i, "shape", {
      get: () => {
        const S = { ...T };
        return Object.defineProperty(i, "shape", {
          value: S
        }), S;
      }
    });
  }
  const s = Ns(() => jm(i));
  Me(a._zod, "propValues", () => {
    const T = i.shape, S = {};
    for (const p in T) {
      const R = T[p]._zod;
      if (R.values) {
        S[p] ?? (S[p] = /* @__PURE__ */ new Set());
        for (const U of R.values)
          S[p].add(U);
      }
    }
    return S;
  });
  const f = $i, m = i.catchall;
  let v;
  a._zod.parse = (T, S) => {
    v ?? (v = s.value);
    const p = T.value;
    if (!f(p))
      return T.issues.push({
        expected: "object",
        code: "invalid_type",
        input: p,
        inst: a
      }), T;
    T.value = {};
    const R = [], U = v.shape;
    for (const L of v.keys) {
      const de = U[L]._zod.run({ value: p[L], issues: [] }, S);
      de instanceof Promise ? R.push(de.then((Oe) => Ji(Oe, T, L, p))) : Ji(de, T, L, p);
    }
    return m ? Nm(R, p, T, S, s.value, a) : R.length ? Promise.all(R).then(() => T) : T;
  };
}), Jp = /* @__PURE__ */ C("$ZodObjectJIT", (a, i) => {
  $p.init(a, i);
  const o = a._zod.parse, s = Ns(() => jm(i)), f = (L) => {
    const ee = new pp(["shape", "payload", "ctx"]), de = s.value, Oe = (me) => {
      const $ = Yh(me);
      return `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`;
    };
    ee.write("const input = payload.value;");
    const we = /* @__PURE__ */ Object.create(null);
    let Ve = 0;
    for (const me of de.keys)
      we[me] = `key_${Ve++}`;
    ee.write("const newResult = {};");
    for (const me of de.keys) {
      const $ = we[me], be = Yh(me);
      ee.write(`const ${$} = ${Oe(me)};`), ee.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${be}, ...iss.path] : [${be}]
          })));
        }
        
        
        if (${$}.value === undefined) {
          if (${be} in input) {
            newResult[${be}] = undefined;
          }
        } else {
          newResult[${be}] = ${$}.value;
        }
        
      `);
    }
    ee.write("payload.value = newResult;"), ee.write("return payload;");
    const He = ee.compile();
    return (me, $) => He(L, me, $);
  };
  let m;
  const v = $i, T = !mm.jitless, p = T && fy.value, R = i.catchall;
  let U;
  a._zod.parse = (L, ee) => {
    U ?? (U = s.value);
    const de = L.value;
    return v(de) ? T && p && ee?.async === !1 && ee.jitless !== !0 ? (m || (m = f(i.shape)), L = m(L, ee), R ? Nm([], de, L, ee, U, a) : L) : o(L, ee) : (L.issues.push({
      expected: "object",
      code: "invalid_type",
      input: de,
      inst: a
    }), L);
  };
});
function Gh(a, i, o, s) {
  for (const m of a)
    if (m.issues.length === 0)
      return i.value = m.value, i;
  const f = a.filter((m) => !ya(m));
  return f.length === 1 ? (i.value = f[0].value, f[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: a.map((m) => m.issues.map((v) => el(v, s, Pn())))
  }), i);
}
const Wp = /* @__PURE__ */ C("$ZodUnion", (a, i) => {
  Qe.init(a, i), Me(a._zod, "optin", () => i.options.some((f) => f._zod.optin === "optional") ? "optional" : void 0), Me(a._zod, "optout", () => i.options.some((f) => f._zod.optout === "optional") ? "optional" : void 0), Me(a._zod, "values", () => {
    if (i.options.every((f) => f._zod.values))
      return new Set(i.options.flatMap((f) => Array.from(f._zod.values)));
  }), Me(a._zod, "pattern", () => {
    if (i.options.every((f) => f._zod.pattern)) {
      const f = i.options.map((m) => m._zod.pattern);
      return new RegExp(`^(${f.map((m) => ws(m.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, s = i.options[0]._zod.run;
  a._zod.parse = (f, m) => {
    if (o)
      return s(f, m);
    let v = !1;
    const T = [];
    for (const S of i.options) {
      const p = S._zod.run({
        value: f.value,
        issues: []
      }, m);
      if (p instanceof Promise)
        T.push(p), v = !0;
      else {
        if (p.issues.length === 0)
          return p;
        T.push(p);
      }
    }
    return v ? Promise.all(T).then((S) => Gh(S, f, a, m)) : Gh(T, f, a, m);
  };
}), Fp = /* @__PURE__ */ C("$ZodIntersection", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value, m = i.left._zod.run({ value: f, issues: [] }, s), v = i.right._zod.run({ value: f, issues: [] }, s);
    return m instanceof Promise || v instanceof Promise ? Promise.all([m, v]).then(([S, p]) => Xh(o, S, p)) : Xh(o, m, v);
  };
});
function Ts(a, i) {
  if (a === i)
    return { valid: !0, data: a };
  if (a instanceof Date && i instanceof Date && +a == +i)
    return { valid: !0, data: a };
  if (_a(a) && _a(i)) {
    const o = Object.keys(i), s = Object.keys(a).filter((m) => o.indexOf(m) !== -1), f = { ...a, ...i };
    for (const m of s) {
      const v = Ts(a[m], i[m]);
      if (!v.valid)
        return {
          valid: !1,
          mergeErrorPath: [m, ...v.mergeErrorPath]
        };
      f[m] = v.data;
    }
    return { valid: !0, data: f };
  }
  if (Array.isArray(a) && Array.isArray(i)) {
    if (a.length !== i.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let s = 0; s < a.length; s++) {
      const f = a[s], m = i[s], v = Ts(f, m);
      if (!v.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...v.mergeErrorPath]
        };
      o.push(v.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Xh(a, i, o) {
  if (i.issues.length && a.issues.push(...i.issues), o.issues.length && a.issues.push(...o.issues), ya(a))
    return a;
  const s = Ts(i.value, o.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return a.value = s.data, a;
}
const Ip = /* @__PURE__ */ C("$ZodRecord", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value;
    if (!_a(f))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: f,
        inst: a
      }), o;
    const m = [], v = i.keyType._zod.values;
    if (v) {
      o.value = {};
      const T = /* @__PURE__ */ new Set();
      for (const p of v)
        if (typeof p == "string" || typeof p == "number" || typeof p == "symbol") {
          T.add(typeof p == "number" ? p.toString() : p);
          const R = i.valueType._zod.run({ value: f[p], issues: [] }, s);
          R instanceof Promise ? m.push(R.then((U) => {
            U.issues.length && o.issues.push(...pa(p, U.issues)), o.value[p] = U.value;
          })) : (R.issues.length && o.issues.push(...pa(p, R.issues)), o.value[p] = R.value);
        }
      let S;
      for (const p in f)
        T.has(p) || (S = S ?? [], S.push(p));
      S && S.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: f,
        inst: a,
        keys: S
      });
    } else {
      o.value = {};
      for (const T of Reflect.ownKeys(f)) {
        if (T === "__proto__")
          continue;
        const S = i.keyType._zod.run({ value: T, issues: [] }, s);
        if (S instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (S.issues.length) {
          o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: S.issues.map((R) => el(R, s, Pn())),
            input: T,
            path: [T],
            inst: a
          }), o.value[S.value] = S.value;
          continue;
        }
        const p = i.valueType._zod.run({ value: f[T], issues: [] }, s);
        p instanceof Promise ? m.push(p.then((R) => {
          R.issues.length && o.issues.push(...pa(T, R.issues)), o.value[S.value] = R.value;
        })) : (p.issues.length && o.issues.push(...pa(T, p.issues)), o.value[S.value] = p.value);
      }
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
}), Pp = /* @__PURE__ */ C("$ZodEnum", (a, i) => {
  Qe.init(a, i);
  const o = oy(i.entries), s = new Set(o);
  a._zod.values = s, a._zod.pattern = new RegExp(`^(${o.filter((f) => dy.has(typeof f)).map((f) => typeof f == "string" ? Ii(f) : f.toString()).join("|")})$`), a._zod.parse = (f, m) => {
    const v = f.value;
    return s.has(v) || f.issues.push({
      code: "invalid_value",
      values: o,
      input: v,
      inst: a
    }), f;
  };
}), eg = /* @__PURE__ */ C("$ZodTransform", (a, i) => {
  Qe.init(a, i), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      throw new hm(a.constructor.name);
    const f = i.transform(o.value, o);
    if (s.async)
      return (f instanceof Promise ? f : Promise.resolve(f)).then((v) => (o.value = v, o));
    if (f instanceof Promise)
      throw new ba();
    return o.value = f, o;
  };
});
function Qh(a, i) {
  return a.issues.length && i === void 0 ? { issues: [], value: void 0 } : a;
}
const tg = /* @__PURE__ */ C("$ZodOptional", (a, i) => {
  Qe.init(a, i), a._zod.optin = "optional", a._zod.optout = "optional", Me(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), Me(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ws(o.source)})?$`) : void 0;
  }), a._zod.parse = (o, s) => {
    if (i.innerType._zod.optin === "optional") {
      const f = i.innerType._zod.run(o, s);
      return f instanceof Promise ? f.then((m) => Qh(m, o.value)) : Qh(f, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, s);
  };
}), ng = /* @__PURE__ */ C("$ZodNullable", (a, i) => {
  Qe.init(a, i), Me(a._zod, "optin", () => i.innerType._zod.optin), Me(a._zod, "optout", () => i.innerType._zod.optout), Me(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ws(o.source)}|null)$`) : void 0;
  }), Me(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), a._zod.parse = (o, s) => o.value === null ? o : i.innerType._zod.run(o, s);
}), lg = /* @__PURE__ */ C("$ZodDefault", (a, i) => {
  Qe.init(a, i), a._zod.optin = "optional", Me(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((m) => Vh(m, i)) : Vh(f, i);
  };
});
function Vh(a, i) {
  return a.value === void 0 && (a.value = i.defaultValue), a;
}
const ag = /* @__PURE__ */ C("$ZodPrefault", (a, i) => {
  Qe.init(a, i), a._zod.optin = "optional", Me(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => (s.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, s));
}), ug = /* @__PURE__ */ C("$ZodNonOptional", (a, i) => {
  Qe.init(a, i), Me(a._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((s) => s !== void 0)) : void 0;
  }), a._zod.parse = (o, s) => {
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((m) => Kh(m, a)) : Kh(f, a);
  };
});
function Kh(a, i) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: i
  }), a;
}
const ig = /* @__PURE__ */ C("$ZodCatch", (a, i) => {
  Qe.init(a, i), Me(a._zod, "optin", () => i.innerType._zod.optin), Me(a._zod, "optout", () => i.innerType._zod.optout), Me(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((m) => (o.value = m.value, m.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: m.issues.map((v) => el(v, s, Pn()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = f.value, f.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: f.issues.map((m) => el(m, s, Pn()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), cg = /* @__PURE__ */ C("$ZodPipe", (a, i) => {
  Qe.init(a, i), Me(a._zod, "values", () => i.in._zod.values), Me(a._zod, "optin", () => i.in._zod.optin), Me(a._zod, "optout", () => i.out._zod.optout), Me(a._zod, "propValues", () => i.in._zod.propValues), a._zod.parse = (o, s) => {
    if (s.direction === "backward") {
      const m = i.out._zod.run(o, s);
      return m instanceof Promise ? m.then((v) => Qi(v, i.in, s)) : Qi(m, i.in, s);
    }
    const f = i.in._zod.run(o, s);
    return f instanceof Promise ? f.then((m) => Qi(m, i.out, s)) : Qi(f, i.out, s);
  };
});
function Qi(a, i, o) {
  return a.issues.length ? (a.aborted = !0, a) : i._zod.run({ value: a.value, issues: a.issues }, o);
}
const og = /* @__PURE__ */ C("$ZodReadonly", (a, i) => {
  Qe.init(a, i), Me(a._zod, "propValues", () => i.innerType._zod.propValues), Me(a._zod, "values", () => i.innerType._zod.values), Me(a._zod, "optin", () => i.innerType?._zod?.optin), Me(a._zod, "optout", () => i.innerType?._zod?.optout), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then($h) : $h(f);
  };
});
function $h(a) {
  return a.value = Object.freeze(a.value), a;
}
const sg = /* @__PURE__ */ C("$ZodCustom", (a, i) => {
  xt.init(a, i), Qe.init(a, i), a._zod.parse = (o, s) => o, a._zod.check = (o) => {
    const s = o.value, f = i.fn(s);
    if (f instanceof Promise)
      return f.then((m) => Jh(m, o, s, a));
    Jh(f, o, s, a);
  };
});
function Jh(a, i, o, s) {
  if (!a) {
    const f = {
      code: "custom",
      input: o,
      inst: s,
      // incorporates params.error into issue reporting
      path: [...s._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !s._zod.def.abort
      // params: inst._zod.def.params,
    };
    s._zod.def.params && (f.params = s._zod.def.params), i.issues.push(xu(f));
  }
}
var Wh;
class rg {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(i, ...o) {
    const s = o[0];
    if (this._map.set(i, s), s && typeof s == "object" && "id" in s) {
      if (this._idmap.has(s.id))
        throw new Error(`ID ${s.id} already exists in the registry`);
      this._idmap.set(s.id, i);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(i) {
    const o = this._map.get(i);
    return o && typeof o == "object" && "id" in o && this._idmap.delete(o.id), this._map.delete(i), this;
  }
  get(i) {
    const o = i._zod.parent;
    if (o) {
      const s = { ...this.get(o) ?? {} };
      delete s.id;
      const f = { ...s, ...this._map.get(i) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(i);
  }
  has(i) {
    return this._map.has(i);
  }
}
function fg() {
  return new rg();
}
(Wh = globalThis).__zod_globalRegistry ?? (Wh.__zod_globalRegistry = fg());
const Vi = globalThis.__zod_globalRegistry;
function dg(a, i) {
  return new a({
    type: "string",
    ...V(i)
  });
}
function hg(a, i) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Fh(a, i) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function mg(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function vg(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...V(i)
  });
}
function yg(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...V(i)
  });
}
function pg(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...V(i)
  });
}
function gg(a, i) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function bg(a, i) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function _g(a, i) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Sg(a, i) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function xg(a, i) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function zg(a, i) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Eg(a, i) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Tg(a, i) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Ag(a, i) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Og(a, i) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function jg(a, i) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Ng(a, i) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Mg(a, i) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function wg(a, i) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Cg(a, i) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Dg(a, i) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Ug(a, i) {
  return new a({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...V(i)
  });
}
function Rg(a, i) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...V(i)
  });
}
function Zg(a, i) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...V(i)
  });
}
function qg(a, i) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...V(i)
  });
}
function Hg(a, i) {
  return new a({
    type: "number",
    checks: [],
    ...V(i)
  });
}
function Bg(a, i) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...V(i)
  });
}
function Yg(a) {
  return new a({
    type: "unknown"
  });
}
function kg(a, i) {
  return new a({
    type: "never",
    ...V(i)
  });
}
function Ih(a, i) {
  return new Em({
    check: "less_than",
    ...V(i),
    value: a,
    inclusive: !1
  });
}
function Ss(a, i) {
  return new Em({
    check: "less_than",
    ...V(i),
    value: a,
    inclusive: !0
  });
}
function Ph(a, i) {
  return new Tm({
    check: "greater_than",
    ...V(i),
    value: a,
    inclusive: !1
  });
}
function xs(a, i) {
  return new Tm({
    check: "greater_than",
    ...V(i),
    value: a,
    inclusive: !0
  });
}
function em(a, i) {
  return new up({
    check: "multiple_of",
    ...V(i),
    value: a
  });
}
function Mm(a, i) {
  return new cp({
    check: "max_length",
    ...V(i),
    maximum: a
  });
}
function Wi(a, i) {
  return new op({
    check: "min_length",
    ...V(i),
    minimum: a
  });
}
function wm(a, i) {
  return new sp({
    check: "length_equals",
    ...V(i),
    length: a
  });
}
function Lg(a, i) {
  return new rp({
    check: "string_format",
    format: "regex",
    ...V(i),
    pattern: a
  });
}
function Gg(a) {
  return new fp({
    check: "string_format",
    format: "lowercase",
    ...V(a)
  });
}
function Xg(a) {
  return new dp({
    check: "string_format",
    format: "uppercase",
    ...V(a)
  });
}
function Qg(a, i) {
  return new hp({
    check: "string_format",
    format: "includes",
    ...V(i),
    includes: a
  });
}
function Vg(a, i) {
  return new mp({
    check: "string_format",
    format: "starts_with",
    ...V(i),
    prefix: a
  });
}
function Kg(a, i) {
  return new vp({
    check: "string_format",
    format: "ends_with",
    ...V(i),
    suffix: a
  });
}
function za(a) {
  return new yp({
    check: "overwrite",
    tx: a
  });
}
function $g(a) {
  return za((i) => i.normalize(a));
}
function Jg() {
  return za((a) => a.trim());
}
function Wg() {
  return za((a) => a.toLowerCase());
}
function Fg() {
  return za((a) => a.toUpperCase());
}
function Ig() {
  return za((a) => ry(a));
}
function Pg(a, i, o) {
  return new a({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...V(o)
  });
}
function e1(a, i, o) {
  return new a({
    type: "custom",
    check: "custom",
    fn: i,
    ...V(o)
  });
}
function t1(a) {
  const i = n1((o) => (o.addIssue = (s) => {
    if (typeof s == "string")
      o.issues.push(xu(s, o.value, i._zod.def));
    else {
      const f = s;
      f.fatal && (f.continue = !1), f.code ?? (f.code = "custom"), f.input ?? (f.input = o.value), f.inst ?? (f.inst = i), f.continue ?? (f.continue = !i._zod.def.abort), o.issues.push(xu(f));
    }
  }, a(o.value, o)));
  return i;
}
function n1(a, i) {
  const o = new xt({
    check: "custom",
    ...V(i)
  });
  return o._zod.check = a, o;
}
const l1 = /* @__PURE__ */ C("ZodISODateTime", (a, i) => {
  Mp.init(a, i), qe.init(a, i);
});
function a1(a) {
  return Ug(l1, a);
}
const u1 = /* @__PURE__ */ C("ZodISODate", (a, i) => {
  wp.init(a, i), qe.init(a, i);
});
function i1(a) {
  return Rg(u1, a);
}
const c1 = /* @__PURE__ */ C("ZodISOTime", (a, i) => {
  Cp.init(a, i), qe.init(a, i);
});
function o1(a) {
  return Zg(c1, a);
}
const s1 = /* @__PURE__ */ C("ZodISODuration", (a, i) => {
  Dp.init(a, i), qe.init(a, i);
});
function r1(a) {
  return qg(s1, a);
}
const f1 = (a, i) => {
  gm.init(a, i), a.name = "ZodError", Object.defineProperties(a, {
    format: {
      value: (o) => zy(a, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => xy(a, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        a.issues.push(o), a.message = JSON.stringify(a.issues, Es, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        a.issues.push(...o), a.message = JSON.stringify(a.issues, Es, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return a.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, Vt = C("ZodError", f1, {
  Parent: Error
}), d1 = /* @__PURE__ */ Ds(Vt), h1 = /* @__PURE__ */ Us(Vt), m1 = /* @__PURE__ */ Pi(Vt), v1 = /* @__PURE__ */ ec(Vt), y1 = /* @__PURE__ */ Ay(Vt), p1 = /* @__PURE__ */ Oy(Vt), g1 = /* @__PURE__ */ jy(Vt), b1 = /* @__PURE__ */ Ny(Vt), _1 = /* @__PURE__ */ My(Vt), S1 = /* @__PURE__ */ wy(Vt), x1 = /* @__PURE__ */ Cy(Vt), z1 = /* @__PURE__ */ Dy(Vt), Fe = /* @__PURE__ */ C("ZodType", (a, i) => (Qe.init(a, i), a.def = i, a.type = i.type, Object.defineProperty(a, "_def", { value: i }), a.check = (...o) => a.clone(Tl(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((s) => typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s)
  ]
})), a.clone = (o, s) => tl(a, o, s), a.brand = () => a, a.register = ((o, s) => (o.add(a, s), a)), a.parse = (o, s) => d1(a, o, s, { callee: a.parse }), a.safeParse = (o, s) => m1(a, o, s), a.parseAsync = async (o, s) => h1(a, o, s, { callee: a.parseAsync }), a.safeParseAsync = async (o, s) => v1(a, o, s), a.spa = a.safeParseAsync, a.encode = (o, s) => y1(a, o, s), a.decode = (o, s) => p1(a, o, s), a.encodeAsync = async (o, s) => g1(a, o, s), a.decodeAsync = async (o, s) => b1(a, o, s), a.safeEncode = (o, s) => _1(a, o, s), a.safeDecode = (o, s) => S1(a, o, s), a.safeEncodeAsync = async (o, s) => x1(a, o, s), a.safeDecodeAsync = async (o, s) => z1(a, o, s), a.refine = (o, s) => a.check(h2(o, s)), a.superRefine = (o) => a.check(m2(o)), a.overwrite = (o) => a.check(za(o)), a.optional = () => am(a), a.nullable = () => um(a), a.nullish = () => am(um(a)), a.nonoptional = (o) => i2(a, o), a.array = () => zu(a), a.or = (o) => J1([a, o]), a.and = (o) => F1(a, o), a.transform = (o) => im(a, e2(o)), a.default = (o) => l2(a, o), a.prefault = (o) => u2(a, o), a.catch = (o) => o2(a, o), a.pipe = (o) => im(a, o), a.readonly = () => f2(a), a.describe = (o) => {
  const s = a.clone();
  return Vi.add(s, { description: o }), s;
}, Object.defineProperty(a, "description", {
  get() {
    return Vi.get(a)?.description;
  },
  configurable: !0
}), a.meta = (...o) => {
  if (o.length === 0)
    return Vi.get(a);
  const s = a.clone();
  return Vi.add(s, o[0]), s;
}, a.isOptional = () => a.safeParse(void 0).success, a.isNullable = () => a.safeParse(null).success, a)), Cm = /* @__PURE__ */ C("_ZodString", (a, i) => {
  Rs.init(a, i), Fe.init(a, i);
  const o = a._zod.bag;
  a.format = o.format ?? null, a.minLength = o.minimum ?? null, a.maxLength = o.maximum ?? null, a.regex = (...s) => a.check(Lg(...s)), a.includes = (...s) => a.check(Qg(...s)), a.startsWith = (...s) => a.check(Vg(...s)), a.endsWith = (...s) => a.check(Kg(...s)), a.min = (...s) => a.check(Wi(...s)), a.max = (...s) => a.check(Mm(...s)), a.length = (...s) => a.check(wm(...s)), a.nonempty = (...s) => a.check(Wi(1, ...s)), a.lowercase = (s) => a.check(Gg(s)), a.uppercase = (s) => a.check(Xg(s)), a.trim = () => a.check(Jg()), a.normalize = (...s) => a.check($g(...s)), a.toLowerCase = () => a.check(Wg()), a.toUpperCase = () => a.check(Fg()), a.slugify = () => a.check(Ig());
}), E1 = /* @__PURE__ */ C("ZodString", (a, i) => {
  Rs.init(a, i), Cm.init(a, i), a.email = (o) => a.check(hg(T1, o)), a.url = (o) => a.check(gg(A1, o)), a.jwt = (o) => a.check(Dg(k1, o)), a.emoji = (o) => a.check(bg(O1, o)), a.guid = (o) => a.check(Fh(tm, o)), a.uuid = (o) => a.check(mg(Ki, o)), a.uuidv4 = (o) => a.check(vg(Ki, o)), a.uuidv6 = (o) => a.check(yg(Ki, o)), a.uuidv7 = (o) => a.check(pg(Ki, o)), a.nanoid = (o) => a.check(_g(j1, o)), a.guid = (o) => a.check(Fh(tm, o)), a.cuid = (o) => a.check(Sg(N1, o)), a.cuid2 = (o) => a.check(xg(M1, o)), a.ulid = (o) => a.check(zg(w1, o)), a.base64 = (o) => a.check(Mg(H1, o)), a.base64url = (o) => a.check(wg(B1, o)), a.xid = (o) => a.check(Eg(C1, o)), a.ksuid = (o) => a.check(Tg(D1, o)), a.ipv4 = (o) => a.check(Ag(U1, o)), a.ipv6 = (o) => a.check(Og(R1, o)), a.cidrv4 = (o) => a.check(jg(Z1, o)), a.cidrv6 = (o) => a.check(Ng(q1, o)), a.e164 = (o) => a.check(Cg(Y1, o)), a.datetime = (o) => a.check(a1(o)), a.date = (o) => a.check(i1(o)), a.time = (o) => a.check(o1(o)), a.duration = (o) => a.check(r1(o));
});
function Ze(a) {
  return dg(E1, a);
}
const qe = /* @__PURE__ */ C("ZodStringFormat", (a, i) => {
  Re.init(a, i), Cm.init(a, i);
}), T1 = /* @__PURE__ */ C("ZodEmail", (a, i) => {
  Sp.init(a, i), qe.init(a, i);
}), tm = /* @__PURE__ */ C("ZodGUID", (a, i) => {
  bp.init(a, i), qe.init(a, i);
}), Ki = /* @__PURE__ */ C("ZodUUID", (a, i) => {
  _p.init(a, i), qe.init(a, i);
}), A1 = /* @__PURE__ */ C("ZodURL", (a, i) => {
  xp.init(a, i), qe.init(a, i);
}), O1 = /* @__PURE__ */ C("ZodEmoji", (a, i) => {
  zp.init(a, i), qe.init(a, i);
}), j1 = /* @__PURE__ */ C("ZodNanoID", (a, i) => {
  Ep.init(a, i), qe.init(a, i);
}), N1 = /* @__PURE__ */ C("ZodCUID", (a, i) => {
  Tp.init(a, i), qe.init(a, i);
}), M1 = /* @__PURE__ */ C("ZodCUID2", (a, i) => {
  Ap.init(a, i), qe.init(a, i);
}), w1 = /* @__PURE__ */ C("ZodULID", (a, i) => {
  Op.init(a, i), qe.init(a, i);
}), C1 = /* @__PURE__ */ C("ZodXID", (a, i) => {
  jp.init(a, i), qe.init(a, i);
}), D1 = /* @__PURE__ */ C("ZodKSUID", (a, i) => {
  Np.init(a, i), qe.init(a, i);
}), U1 = /* @__PURE__ */ C("ZodIPv4", (a, i) => {
  Up.init(a, i), qe.init(a, i);
}), R1 = /* @__PURE__ */ C("ZodIPv6", (a, i) => {
  Rp.init(a, i), qe.init(a, i);
}), Z1 = /* @__PURE__ */ C("ZodCIDRv4", (a, i) => {
  Zp.init(a, i), qe.init(a, i);
}), q1 = /* @__PURE__ */ C("ZodCIDRv6", (a, i) => {
  qp.init(a, i), qe.init(a, i);
}), H1 = /* @__PURE__ */ C("ZodBase64", (a, i) => {
  Hp.init(a, i), qe.init(a, i);
}), B1 = /* @__PURE__ */ C("ZodBase64URL", (a, i) => {
  Yp.init(a, i), qe.init(a, i);
}), Y1 = /* @__PURE__ */ C("ZodE164", (a, i) => {
  kp.init(a, i), qe.init(a, i);
}), k1 = /* @__PURE__ */ C("ZodJWT", (a, i) => {
  Gp.init(a, i), qe.init(a, i);
}), Dm = /* @__PURE__ */ C("ZodNumber", (a, i) => {
  Om.init(a, i), Fe.init(a, i), a.gt = (s, f) => a.check(Ph(s, f)), a.gte = (s, f) => a.check(xs(s, f)), a.min = (s, f) => a.check(xs(s, f)), a.lt = (s, f) => a.check(Ih(s, f)), a.lte = (s, f) => a.check(Ss(s, f)), a.max = (s, f) => a.check(Ss(s, f)), a.int = (s) => a.check(lm(s)), a.safe = (s) => a.check(lm(s)), a.positive = (s) => a.check(Ph(0, s)), a.nonnegative = (s) => a.check(xs(0, s)), a.negative = (s) => a.check(Ih(0, s)), a.nonpositive = (s) => a.check(Ss(0, s)), a.multipleOf = (s, f) => a.check(em(s, f)), a.step = (s, f) => a.check(em(s, f)), a.finite = () => a;
  const o = a._zod.bag;
  a.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, a.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, a.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), a.isFinite = !0, a.format = o.format ?? null;
});
function nm(a) {
  return Hg(Dm, a);
}
const L1 = /* @__PURE__ */ C("ZodNumberFormat", (a, i) => {
  Xp.init(a, i), Dm.init(a, i);
});
function lm(a) {
  return Bg(L1, a);
}
const G1 = /* @__PURE__ */ C("ZodUnknown", (a, i) => {
  Qp.init(a, i), Fe.init(a, i);
});
function Fi() {
  return Yg(G1);
}
const X1 = /* @__PURE__ */ C("ZodNever", (a, i) => {
  Vp.init(a, i), Fe.init(a, i);
});
function Q1(a) {
  return kg(X1, a);
}
const V1 = /* @__PURE__ */ C("ZodArray", (a, i) => {
  Kp.init(a, i), Fe.init(a, i), a.element = i.element, a.min = (o, s) => a.check(Wi(o, s)), a.nonempty = (o) => a.check(Wi(1, o)), a.max = (o, s) => a.check(Mm(o, s)), a.length = (o, s) => a.check(wm(o, s)), a.unwrap = () => a.element;
});
function zu(a, i) {
  return Pg(V1, a, i);
}
const K1 = /* @__PURE__ */ C("ZodObject", (a, i) => {
  Jp.init(a, i), Fe.init(a, i), Me(a, "shape", () => i.shape), a.keyof = () => Sa(Object.keys(a._zod.def.shape)), a.catchall = (o) => a.clone({ ...a._zod.def, catchall: o }), a.passthrough = () => a.clone({ ...a._zod.def, catchall: Fi() }), a.loose = () => a.clone({ ...a._zod.def, catchall: Fi() }), a.strict = () => a.clone({ ...a._zod.def, catchall: Q1() }), a.strip = () => a.clone({ ...a._zod.def, catchall: void 0 }), a.extend = (o) => py(a, o), a.safeExtend = (o) => gy(a, o), a.merge = (o) => by(a, o), a.pick = (o) => vy(a, o), a.omit = (o) => yy(a, o), a.partial = (...o) => _y(Rm, a, o[0]), a.required = (...o) => Sy(Zm, a, o[0]);
});
function nc(a, i) {
  const o = {
    type: "object",
    shape: a ?? {},
    ...V(i)
  };
  return new K1(o);
}
const $1 = /* @__PURE__ */ C("ZodUnion", (a, i) => {
  Wp.init(a, i), Fe.init(a, i), a.options = i.options;
});
function J1(a, i) {
  return new $1({
    type: "union",
    options: a,
    ...V(i)
  });
}
const W1 = /* @__PURE__ */ C("ZodIntersection", (a, i) => {
  Fp.init(a, i), Fe.init(a, i);
});
function F1(a, i) {
  return new W1({
    type: "intersection",
    left: a,
    right: i
  });
}
const I1 = /* @__PURE__ */ C("ZodRecord", (a, i) => {
  Ip.init(a, i), Fe.init(a, i), a.keyType = i.keyType, a.valueType = i.valueType;
});
function Um(a, i, o) {
  return new I1({
    type: "record",
    keyType: a,
    valueType: i,
    ...V(o)
  });
}
const As = /* @__PURE__ */ C("ZodEnum", (a, i) => {
  Pp.init(a, i), Fe.init(a, i), a.enum = i.entries, a.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  a.extract = (s, f) => {
    const m = {};
    for (const v of s)
      if (o.has(v))
        m[v] = i.entries[v];
      else
        throw new Error(`Key ${v} not found in enum`);
    return new As({
      ...i,
      checks: [],
      ...V(f),
      entries: m
    });
  }, a.exclude = (s, f) => {
    const m = { ...i.entries };
    for (const v of s)
      if (o.has(v))
        delete m[v];
      else
        throw new Error(`Key ${v} not found in enum`);
    return new As({
      ...i,
      checks: [],
      ...V(f),
      entries: m
    });
  };
});
function Sa(a, i) {
  const o = Array.isArray(a) ? Object.fromEntries(a.map((s) => [s, s])) : a;
  return new As({
    type: "enum",
    entries: o,
    ...V(i)
  });
}
const P1 = /* @__PURE__ */ C("ZodTransform", (a, i) => {
  eg.init(a, i), Fe.init(a, i), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      throw new hm(a.constructor.name);
    o.addIssue = (m) => {
      if (typeof m == "string")
        o.issues.push(xu(m, o.value, i));
      else {
        const v = m;
        v.fatal && (v.continue = !1), v.code ?? (v.code = "custom"), v.input ?? (v.input = o.value), v.inst ?? (v.inst = a), o.issues.push(xu(v));
      }
    };
    const f = i.transform(o.value, o);
    return f instanceof Promise ? f.then((m) => (o.value = m, o)) : (o.value = f, o);
  };
});
function e2(a) {
  return new P1({
    type: "transform",
    transform: a
  });
}
const Rm = /* @__PURE__ */ C("ZodOptional", (a, i) => {
  tg.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function am(a) {
  return new Rm({
    type: "optional",
    innerType: a
  });
}
const t2 = /* @__PURE__ */ C("ZodNullable", (a, i) => {
  ng.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function um(a) {
  return new t2({
    type: "nullable",
    innerType: a
  });
}
const n2 = /* @__PURE__ */ C("ZodDefault", (a, i) => {
  lg.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function l2(a, i) {
  return new n2({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : ym(i);
    }
  });
}
const a2 = /* @__PURE__ */ C("ZodPrefault", (a, i) => {
  ag.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function u2(a, i) {
  return new a2({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : ym(i);
    }
  });
}
const Zm = /* @__PURE__ */ C("ZodNonOptional", (a, i) => {
  ug.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function i2(a, i) {
  return new Zm({
    type: "nonoptional",
    innerType: a,
    ...V(i)
  });
}
const c2 = /* @__PURE__ */ C("ZodCatch", (a, i) => {
  ig.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function o2(a, i) {
  return new c2({
    type: "catch",
    innerType: a,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const s2 = /* @__PURE__ */ C("ZodPipe", (a, i) => {
  cg.init(a, i), Fe.init(a, i), a.in = i.in, a.out = i.out;
});
function im(a, i) {
  return new s2({
    type: "pipe",
    in: a,
    out: i
    // ...util.normalizeParams(params),
  });
}
const r2 = /* @__PURE__ */ C("ZodReadonly", (a, i) => {
  og.init(a, i), Fe.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function f2(a) {
  return new r2({
    type: "readonly",
    innerType: a
  });
}
const d2 = /* @__PURE__ */ C("ZodCustom", (a, i) => {
  sg.init(a, i), Fe.init(a, i);
});
function h2(a, i = {}) {
  return e1(d2, a, i);
}
function m2(a) {
  return t1(a);
}
class v2 {
  constructor(i) {
    this.config = {
      timeout: 3e4,
      ...i
    }, this.baseHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "@lanonasis/memory-client/2.0.0",
      ...i.headers
    }, i.authToken ? this.baseHeaders.Authorization = `Bearer ${i.authToken}` : i.apiKey && (this.baseHeaders["X-API-Key"] = i.apiKey), i.organizationId && (this.baseHeaders["X-Organization-ID"] = i.organizationId);
  }
  /**
   * Enrich request body with organization context if configured
   * This ensures the API has the organization_id even if not in auth token
   */
  enrichWithOrgContext(i) {
    return this.config.organizationId && !i.organization_id ? {
      ...i,
      organization_id: this.config.organizationId
    } : !this.config.organizationId && this.config.userId && !i.organization_id ? {
      ...i,
      organization_id: this.config.userId
    } : i;
  }
  /**
   * Make an HTTP request to the API
   */
  async request(i, o = {}) {
    const s = Date.now();
    if (this.config.onRequest)
      try {
        this.config.onRequest(i);
      } catch (v) {
        console.warn("onRequest hook error:", v);
      }
    const m = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${i}`;
    try {
      const v = new AbortController(), T = setTimeout(() => v.abort(), this.config.timeout), S = await fetch(m, {
        headers: { ...this.baseHeaders, ...o.headers },
        signal: v.signal,
        ...o
      });
      clearTimeout(T);
      let p;
      const R = S.headers.get("content-type");
      if (R && R.includes("application/json") ? p = await S.json() : p = await S.text(), !S.ok) {
        const U = {
          message: p?.error || `HTTP ${S.status}: ${S.statusText}`,
          statusCode: S.status,
          code: "API_ERROR"
        };
        if (this.config.onError)
          try {
            this.config.onError(U);
          } catch (L) {
            console.warn("onError hook error:", L);
          }
        return { error: U.message };
      }
      if (this.config.onResponse)
        try {
          const U = Date.now() - s;
          this.config.onResponse(i, U);
        } catch (U) {
          console.warn("onResponse hook error:", U);
        }
      return { data: p };
    } catch (v) {
      if (v instanceof Error && v.name === "AbortError") {
        const S = {
          message: "Request timeout",
          code: "TIMEOUT_ERROR",
          statusCode: 408
        };
        if (this.config.onError)
          try {
            this.config.onError(S);
          } catch (p) {
            console.warn("onError hook error:", p);
          }
        return { error: "Request timeout" };
      }
      const T = {
        message: v instanceof Error ? v.message : "Network error",
        code: "NETWORK_ERROR"
      };
      if (this.config.onError)
        try {
          this.config.onError(T);
        } catch (S) {
          console.warn("onError hook error:", S);
        }
      return {
        error: v instanceof Error ? v.message : "Network error"
      };
    }
  }
  /**
   * Test the API connection and authentication
   */
  async healthCheck() {
    return this.request("/health");
  }
  // Memory Operations
  /**
   * Create a new memory
   */
  async createMemory(i) {
    const o = this.enrichWithOrgContext(i);
    return this.request("/memory", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  /**
   * Get a memory by ID
   */
  async getMemory(i) {
    return this.request(`/memory/${encodeURIComponent(i)}`);
  }
  /**
   * Update an existing memory
   */
  async updateMemory(i, o) {
    return this.request(`/memory/${encodeURIComponent(i)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a memory
   */
  async deleteMemory(i) {
    return this.request(`/memory/${encodeURIComponent(i)}`, {
      method: "DELETE"
    });
  }
  /**
   * List memories with optional filtering and pagination
   */
  async listMemories(i = {}) {
    const o = new URLSearchParams();
    Object.entries(i).forEach(([m, v]) => {
      v != null && (Array.isArray(v) ? o.append(m, v.join(",")) : o.append(m, String(v)));
    });
    const s = o.toString(), f = s ? `/memory?${s}` : "/memory";
    return this.request(f);
  }
  /**
   * Search memories using semantic search
   */
  async searchMemories(i) {
    const o = this.enrichWithOrgContext(i);
    return this.request("/memory/search", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  /**
   * Bulk delete multiple memories
   */
  async bulkDeleteMemories(i) {
    const o = this.enrichWithOrgContext({ memory_ids: i });
    return this.request("/memory/bulk/delete", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  // Topic Operations
  /**
   * Create a new topic
   */
  async createTopic(i) {
    const o = this.enrichWithOrgContext(i);
    return this.request("/topics", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  /**
   * Get all topics
   */
  async getTopics() {
    return this.request("/topics");
  }
  /**
   * Get a topic by ID
   */
  async getTopic(i) {
    return this.request(`/topics/${encodeURIComponent(i)}`);
  }
  /**
   * Update a topic
   */
  async updateTopic(i, o) {
    return this.request(`/topics/${encodeURIComponent(i)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a topic
   */
  async deleteTopic(i) {
    return this.request(`/topics/${encodeURIComponent(i)}`, {
      method: "DELETE"
    });
  }
  /**
   * Get user memory statistics
   */
  async getMemoryStats() {
    return this.request("/memory/stats");
  }
  // Utility Methods
  /**
   * Update authentication token
   */
  setAuthToken(i) {
    this.baseHeaders.Authorization = `Bearer ${i}`, delete this.baseHeaders["X-API-Key"];
  }
  /**
   * Update API key
   */
  setApiKey(i) {
    this.baseHeaders["X-API-Key"] = i, delete this.baseHeaders.Authorization;
  }
  /**
   * Clear authentication
   */
  clearAuth() {
    delete this.baseHeaders.Authorization, delete this.baseHeaders["X-API-Key"];
  }
  /**
   * Update configuration
   */
  updateConfig(i) {
    this.config = { ...this.config, ...i }, i.headers && (this.baseHeaders = { ...this.baseHeaders, ...i.headers });
  }
  /**
   * Get current configuration (excluding sensitive data)
   */
  getConfig() {
    const { apiKey: i, authToken: o, ...s } = this.config;
    return s;
  }
}
function y2(a) {
  return new v2(a);
}
const Zs = ["context", "project", "knowledge", "reference", "personal", "workflow"], qm = ["active", "archived", "draft", "deleted"];
nc({
  title: Ze().min(1).max(500),
  content: Ze().min(1).max(5e4),
  summary: Ze().max(1e3).optional(),
  memory_type: Sa(Zs).default("context"),
  topic_id: Ze().uuid().optional(),
  project_ref: Ze().max(100).optional(),
  tags: zu(Ze().min(1).max(50)).max(20).default([]),
  metadata: Um(Ze(), Fi()).optional()
});
nc({
  title: Ze().min(1).max(500).optional(),
  content: Ze().min(1).max(5e4).optional(),
  summary: Ze().max(1e3).optional(),
  memory_type: Sa(Zs).optional(),
  status: Sa(qm).optional(),
  topic_id: Ze().uuid().nullable().optional(),
  project_ref: Ze().max(100).nullable().optional(),
  tags: zu(Ze().min(1).max(50)).max(20).optional(),
  metadata: Um(Ze(), Fi()).optional()
});
nc({
  query: Ze().min(1).max(1e3),
  memory_types: zu(Sa(Zs)).optional(),
  tags: zu(Ze()).optional(),
  topic_id: Ze().uuid().optional(),
  project_ref: Ze().optional(),
  status: Sa(qm).default("active"),
  limit: nm().int().min(1).max(100).default(20),
  threshold: nm().min(0).max(1).default(0.7)
});
nc({
  name: Ze().min(1).max(100),
  description: Ze().max(500).optional(),
  color: Ze().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: Ze().max(50).optional(),
  parent_topic_id: Ze().uuid().optional()
});
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const Hm = Y.createContext(null);
function p2({ children: a, config: i, apiKey: o, apiUrl: s = "https://api.lanonasis.com", client: f }) {
  const m = Y.useMemo(() => f || y2({
    apiUrl: s,
    apiKey: o,
    ...i
  }), [f, s, o, i]);
  return Y.createElement(Hm.Provider, { value: m }, a);
}
function lc() {
  const a = Y.useContext(Hm);
  if (!a)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return a;
}
function g2(a) {
  const i = lc(), [o, s] = Y.useState([]), [f, m] = Y.useState(!0), [v, T] = Y.useState(null), S = Y.useCallback(async () => {
    m(!0), T(null);
    const p = await i.listMemories(a);
    p.error ? (T({
      message: p.error,
      code: "API_ERROR"
    }), s([])) : p.data && s(p.data.data), m(!1);
  }, [i, JSON.stringify(a)]);
  return Y.useEffect(() => {
    S();
  }, [S]), {
    memories: o,
    loading: f,
    error: v,
    refresh: S
  };
}
function b2() {
  const a = lc(), [i, o] = Y.useState(!1), [s, f] = Y.useState(null);
  return {
    createMemory: Y.useCallback(async (v) => {
      o(!0), f(null);
      const T = await a.createMemory(v);
      return T.error ? (f({
        message: T.error,
        code: "API_ERROR"
      }), o(!1), null) : (o(!1), T.data || null);
    }, [a]),
    loading: i,
    error: s
  };
}
function _2(a = 300) {
  const i = lc(), [o, s] = Y.useState([]), [f, m] = Y.useState(!1), [v, T] = Y.useState(null), [S, p] = Y.useState(0), [R, U] = Y.useState(0), L = Y.useRef(null), ee = Y.useCallback(async (de, Oe) => {
    L.current && clearTimeout(L.current), L.current = setTimeout(async () => {
      m(!0), T(null);
      const we = await i.searchMemories({
        query: de,
        ...Oe
      });
      we.error ? (T({
        message: we.error,
        code: "API_ERROR"
      }), s([]), p(0), U(0)) : we.data && (s(we.data.results), p(we.data.total_results), U(we.data.search_time_ms)), m(!1);
    }, a);
  }, [i, a]);
  return Y.useEffect(() => () => {
    L.current && clearTimeout(L.current);
  }, []), {
    results: o,
    loading: f,
    error: v,
    search: ee,
    totalResults: S,
    searchTime: R
  };
}
const Ne = js.forwardRef(
  ({
    className: a = "",
    variant: i = "default",
    size: o = "default",
    children: s,
    ...f
  }, m) => {
    const v = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", T = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, S = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ h.jsx(
      "button",
      {
        ref: m,
        className: `${v} ${T[i]} ${S[o]} ${a}`,
        ...f,
        children: s
      }
    );
  }
);
Ne.displayName = "Button";
const ga = js.forwardRef(
  ({ className: a = "", type: i = "text", ...o }, s) => /* @__PURE__ */ h.jsx(
    "input",
    {
      ref: s,
      type: i,
      className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${a}`,
      ...o
    }
  )
);
ga.displayName = "Input";
const S2 = ({
  className: a = "",
  size: i = 24
}) => /* @__PURE__ */ h.jsx(
  "svg",
  {
    width: i,
    height: i,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: a,
    children: /* @__PURE__ */ h.jsx(
      "path",
      {
        d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), rt = {
  search: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ h.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  ),
  plus: /* @__PURE__ */ h.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ h.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  ),
  refresh: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
        /* @__PURE__ */ h.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
      ]
    }
  ),
  settings: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ h.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
      ]
    }
  ),
  logout: /* @__PURE__ */ h.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ h.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
    }
  ),
  chevronRight: /* @__PURE__ */ h.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ h.jsx("polyline", { points: "9,18 15,12 9,6" })
    }
  ),
  globe: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ h.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ h.jsx("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
      ]
    }
  ),
  lightbulb: /* @__PURE__ */ h.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ h.jsx("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
    }
  ),
  file: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
        /* @__PURE__ */ h.jsx("polyline", { points: "14,2 14,8 20,8" })
      ]
    }
  ),
  send: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        /* @__PURE__ */ h.jsx("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })
      ]
    }
  ),
  paperclip: /* @__PURE__ */ h.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ h.jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
    }
  ),
  edit: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("path", { d: "M12 20h9" }),
        /* @__PURE__ */ h.jsx("path", { d: "M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" })
      ]
    }
  ),
  trash: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("polyline", { points: "3 6 5 6 21 6" }),
        /* @__PURE__ */ h.jsx("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }),
        /* @__PURE__ */ h.jsx("path", { d: "M10 11v6M14 11v6" }),
        /* @__PURE__ */ h.jsx("path", { d: "M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" })
      ]
    }
  ),
  copy: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
        /* @__PURE__ */ h.jsx("path", { d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" })
      ]
    }
  ),
  close: /* @__PURE__ */ h.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ h.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ h.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ]
    }
  )
}, x2 = [
  "context",
  "project",
  "knowledge",
  "reference",
  "personal",
  "workflow"
], Bm = (a) => {
  if (!a) return "—";
  try {
    return new Date(a).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}, zs = (a) => {
  if (!a) return "—";
  try {
    return new Date(a).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}, cm = (a) => a && a.length > 0 ? a.join(", ") : "", z2 = (a) => a.split(",").map((i) => i.trim()).filter(Boolean), E2 = (a) => {
  if (!a) return "U";
  const i = a.trim();
  if (!i) return "U";
  const o = i.split(/\s+/).filter(Boolean);
  if (o.length === 1) {
    const s = o[0];
    return (s.includes("@") ? s.split("@")[0] : s).slice(0, 2).toUpperCase();
  }
  return (o[0][0] + o[o.length - 1][0]).toUpperCase();
}, om = (a, i) => {
  const o = i.toLowerCase();
  return a.title.toLowerCase().includes(o) || a.content.toLowerCase().includes(o) || (a.tags || []).some((s) => s.toLowerCase().includes(o));
}, T2 = ({
  onLoginOAuth: a,
  onLoginApiKey: i,
  isLoading: o = !1,
  error: s = null
}) => {
  const [f, m] = Y.useState(!1), [v, T] = Y.useState(""), S = () => {
    v.trim() && i && i(v.trim());
  };
  return /* @__PURE__ */ h.jsx("div", { className: "space-y-3 select-none", children: /* @__PURE__ */ h.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ h.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Connect to sync memories" }),
    /* @__PURE__ */ h.jsx("p", { className: "text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "You can still work locally, but connecting unlocks sync and full AI search." }),
    s && /* @__PURE__ */ h.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: s }),
    f ? /* @__PURE__ */ h.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ h.jsx(
        ga,
        {
          type: "password",
          placeholder: "Enter your API key (lano_... or lns_...)",
          value: v,
          onChange: (p) => T(p.target.value),
          className: "h-8 text-[13px]",
          autoFocus: !0,
          onKeyDown: (p) => p.key === "Enter" && S()
        }
      ),
      /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ h.jsx(
          Ne,
          {
            className: "flex-1",
            onClick: S,
            disabled: !v.trim() || o,
            children: o ? "Connecting..." : "Connect"
          }
        ),
        /* @__PURE__ */ h.jsx(
          Ne,
          {
            variant: "secondary",
            onClick: () => {
              m(!1), T("");
            },
            children: "Cancel"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ h.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ h.jsx(
        Ne,
        {
          className: "w-full",
          onClick: a,
          disabled: o,
          children: o ? "Connecting..." : "Connect in Browser"
        }
      ),
      /* @__PURE__ */ h.jsx(
        Ne,
        {
          className: "w-full",
          variant: "secondary",
          onClick: () => m(!0),
          disabled: o,
          children: "Enter API Key"
        }
      )
    ] })
  ] }) });
}, A2 = ({ memory: a, onClick: i }) => /* @__PURE__ */ h.jsxs(
  "div",
  {
    className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
    onClick: i,
    children: [
      /* @__PURE__ */ h.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h.jsx("span", { className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0", children: rt.file }),
        /* @__PURE__ */ h.jsx("h3", { className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1", children: a.title })
      ] }) }),
      /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5", children: [
        /* @__PURE__ */ h.jsx("span", { className: "opacity-60", children: Bm(a.created_at) }),
        /* @__PURE__ */ h.jsx("span", { className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60", children: a.memory_type }),
        a.tags?.slice(0, 2).map((o) => /* @__PURE__ */ h.jsxs(
          "span",
          {
            className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
            children: [
              "#",
              o
            ]
          },
          o
        ))
      ] }),
      a._pending && /* @__PURE__ */ h.jsxs("div", { className: "text-[10px] text-yellow-400 pl-5", children: [
        "Pending ",
        a._pending
      ] })
    ]
  }
), sm = ({
  title: a,
  isOpen: i,
  onToggle: o,
  actions: s
}) => /* @__PURE__ */ h.jsxs(
  "div",
  {
    className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
    onClick: o,
    children: [
      /* @__PURE__ */ h.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ h.jsx(
          "span",
          {
            className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${i ? "rotate-90" : ""}`,
            children: rt.chevronRight
          }
        ),
        /* @__PURE__ */ h.jsx("span", { className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase", children: a })
      ] }),
      s && /* @__PURE__ */ h.jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: s })
    ]
  }
), O2 = ({
  syncStatus: a,
  onSync: i,
  isAuthenticated: o,
  hasLocalMemories: s,
  onConnect: f
}) => {
  const m = !o;
  return !m && a.isOnline && a.pendingCount === 0 ? null : /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: `px-3 py-2 text-[11px] flex items-center justify-between ${m ? "bg-blue-500/10 text-blue-300 border-b border-blue-500/20" : a.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`,
      children: [
        /* @__PURE__ */ h.jsx("div", { className: "flex items-center gap-2", children: m ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx("span", { className: "opacity-80", children: rt.globe }),
          /* @__PURE__ */ h.jsxs("span", { children: [
            "Local mode",
            s ? "" : " (no cache yet)"
          ] })
        ] }) : a.isOnline ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsxs(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              className: "animate-pulse",
              children: [
                /* @__PURE__ */ h.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
                /* @__PURE__ */ h.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
              ]
            }
          ),
          /* @__PURE__ */ h.jsxs("span", { children: [
            a.pendingCount,
            " pending"
          ] })
        ] }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsxs(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ h.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
                /* @__PURE__ */ h.jsx("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
                /* @__PURE__ */ h.jsx("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
                /* @__PURE__ */ h.jsx("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
                /* @__PURE__ */ h.jsx("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
                /* @__PURE__ */ h.jsx("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
                /* @__PURE__ */ h.jsx("line", { x1: "12", y1: "20", x2: "12.01", y2: "20" })
              ]
            }
          ),
          /* @__PURE__ */ h.jsx("span", { children: "Offline" })
        ] }) }),
        m ? f && /* @__PURE__ */ h.jsx(
          "button",
          {
            onClick: f,
            className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors",
            children: "Connect"
          }
        ) : a.pendingCount > 0 && a.isOnline && /* @__PURE__ */ h.jsx(
          "button",
          {
            onClick: i,
            disabled: a.isSyncing,
            className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
            children: a.isSyncing ? "Syncing..." : "Sync now"
          }
        )
      ]
    }
  );
}, j2 = ({
  message: a,
  onOpenMemory: i
}) => {
  const o = a.role === "user";
  return /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: `flex flex-col gap-1 ${o ? "items-end" : "items-start"}`,
      children: [
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${o ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`,
            children: a.content
          }
        ),
        !o && a.memories && a.memories.length > 0 && /* @__PURE__ */ h.jsxs("div", { className: "w-full mt-2 space-y-1", children: [
          /* @__PURE__ */ h.jsxs("div", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1", children: [
            "Related memories (",
            a.memories.length,
            ")"
          ] }),
          a.memories.slice(0, 3).map((s) => /* @__PURE__ */ h.jsxs(
            "div",
            {
              className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px] cursor-pointer hover:border-[var(--vscode-focusBorder)]",
              onClick: () => i?.(s),
              children: [
                /* @__PURE__ */ h.jsx("div", { className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1", children: s.title }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5", children: [
                  s.content.slice(0, 100),
                  s.content.length > 100 ? "..." : ""
                ] }),
                s._pending && /* @__PURE__ */ h.jsx("div", { className: "text-[10px] text-yellow-400 mt-1", children: "⏳ Pending sync" })
              ]
            },
            s.id
          ))
        ] })
      ]
    }
  );
}, N2 = ({
  initialChatInput: a = "",
  onAttachFromClipboard: i,
  isAuthenticated: o = !1,
  onLoginOAuth: s,
  onLoginApiKey: f,
  onLogout: m,
  authLoading: v = !1,
  authError: T = null,
  userEmail: S = null,
  userName: p = null,
  authMethod: R = "none"
}) => {
  const {
    memories: U,
    loading: L,
    refresh: ee
  } = g2({
    limit: 200,
    order: "desc"
  }), { createMemory: de, loading: Oe } = b2(), {
    search: we,
    results: Ve,
    loading: He
  } = _2(), me = lc(), [$, be] = Y.useState(""), [Be, te] = Y.useState(a), [Le, Dt] = Y.useState(!0), [Wt, Ut] = Y.useState(!0), [Ie, Ft] = Y.useState(!1), [zt, Pe] = Y.useState([]), [O, H] = Y.useState(!1), [X, ie] = Y.useState([]), [F, g] = Y.useState({
    isOnline: !0,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: !1
  }), [M, q] = Y.useState(
    null
  ), [D, J] = Y.useState(
    null
  ), [ue, ce] = Y.useState(!1), [xe, ze] = Y.useState({
    title: "",
    content: "",
    memory_type: "knowledge",
    tags: ""
  }), [It, an] = Y.useState(!1), [Ea, Ta] = Y.useState(!1), [Et, On] = Y.useState(""), [Aa, Al] = Y.useState(!1), nl = Y.useRef(null), Ol = Y.useRef(null), un = Y.useRef(null), ll = (Z, K) => {
    Z && Pe(
      (B) => B.map(
        (P) => P.id === Z && P.role === "assistant" ? K(P) : P
      )
    );
  };
  Y.useEffect(() => {
    if (M) {
      const Z = setTimeout(() => q(null), 5e3);
      return () => clearTimeout(Z);
    }
  }, [M]), Y.useEffect(() => {
    a !== void 0 && te(a);
  }, [a]);
  const Tt = o && F.isOnline, Eu = X.length > 0, ft = !o || !F.isOnline, Oa = o ? R === "apiKey" ? "API key" : "OAuth" : Eu ? "Local cache" : "Not connected", ja = p || S || null, Na = p && S ? S : null, al = ja || S || null, Tu = !!D && (D.id.startsWith("local_") || D._pending === "create");
  Y.useEffect(() => {
    const Z = (K) => {
      const B = K.data;
      if (!(!B || typeof B != "object")) {
        if (B.type === "lanonasis:cache:data" && (ie(B.payload?.memories || []), B.payload?.status && g(B.payload.status)), B.type === "lanonasis:sync:start" && g((P) => ({ ...P, isSyncing: !0 })), B.type === "lanonasis:sync:complete" && (ie(B.payload?.memories || []), g(
          (P) => B.payload?.status || {
            ...P,
            isSyncing: !1,
            isOnline: !0
          }
        )), B.type === "lanonasis:sync:error") {
          const P = B.payload?.isNetworkError === !0, I = B.payload?.error || "Sync failed";
          g((ve) => ({
            ...ve,
            isSyncing: !1,
            isOnline: P ? !1 : ve.isOnline
          })), q(
            P ? "Network error - working offline" : I
          );
        }
        if (B.type === "lanonasis:auth:result" && !B.payload?.success) {
          const P = B.payload?.error || "Authentication failed";
          q(P);
        }
        if (B.type === "lanonasis:ai:search:local") {
          const P = B.payload?.results || [], I = B.payload?.query || "", ve = B.payload?.requestId;
          ll(ve, (at) => ({
            ...at,
            content: P.length > 0 ? `Found ${P.length} local memories:` : `No local matches for "${I}". Try saving more context or connect for full search.`,
            memories: P
          })), ve && ve === un.current && H(!1);
        }
        if (B.type === "lanonasis:ai:search:api") {
          const P = B.payload?.results || [], I = B.payload?.query || "", ve = B.payload?.requestId;
          ll(ve, (at) => {
            const on = new Set(
              (at.memories || []).map((Rt) => Rt.id)
            ), wu = P.filter(
              (Rt) => !on.has(Rt.id)
            ), wl = [
              ...at.memories || [],
              ...wu
            ].slice(0, 5);
            return {
              ...at,
              content: wl.length > 0 ? `Found ${wl.length} relevant memories:` : `No memories found for "${I}"`,
              memories: wl
            };
          }), ve && ve === un.current && (un.current = null, H(!1));
        }
        if (B.type === "lanonasis:cache:added") {
          const P = B.payload?.memory;
          P && (ie((I) => [P, ...I]), g((I) => ({
            ...I,
            pendingCount: I.pendingCount + 1
          })));
        }
        if (B.type === "lanonasis:cache:updated") {
          const P = B.payload?.memory;
          P && (ie(
            (I) => I.map(
              (ve) => ve.id === P.id || ve._localId === P._localId ? P : ve
            )
          ), J(
            (I) => I && (I.id === P.id || I._localId === P._localId) ? P : I
          )), B.payload?.status && g(B.payload.status);
        }
        if (B.type === "lanonasis:cache:deleted") {
          const P = B.payload?.id;
          P && (ie(
            (I) => I.filter((ve) => ve.id !== P)
          ), J(
            (I) => I && I.id === P ? null : I
          )), B.payload?.status && g(B.payload.status);
        }
        B.type === "lanonasis:cache:cleared" && (ie([]), J(null), B.payload?.status ? g(B.payload.status) : g((P) => ({
          ...P,
          lastSyncAt: null,
          pendingCount: 0,
          isSyncing: !1
        })));
      }
    };
    return window.addEventListener("message", Z), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", Z);
  }, []), Y.useEffect(() => {
    nl.current && (nl.current.scrollTop = nl.current.scrollHeight);
  }, [zt]), Y.useEffect(() => {
    $.length > 2 && Tt && we($);
  }, [$, we, Tt]);
  const Au = Y.useMemo(() => $.length <= 2 ? [] : X.filter((Z) => om(Z, $)), [X, $]), Ou = ft || F.pendingCount > 0 ? X : U, ul = Tt && Ve.length > 0 ? Ve : Au, dt = $.length > 2 ? ul : Ou.length > 0 ? Ou : X, Pt = async () => {
    const Z = Be.trim() || $.trim();
    if (!Z) {
      const K = document.querySelector("textarea");
      K && (K.focus(), K.placeholder = "Type content to save as a memory...");
      return;
    }
    try {
      const K = {
        title: Z.slice(0, 50) + (Z.length > 50 ? "..." : ""),
        content: Z,
        memory_type: "knowledge",
        tags: []
      };
      if (Tt)
        await de(K), te(""), await ee();
      else
        throw new Error("Local-only mode");
    } catch (K) {
      console.error("Failed to create memory:", K), window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: {
          memory: {
            title: Z.slice(0, 50) + (Z.length > 50 ? "..." : ""),
            content: Z,
            memory_type: "knowledge",
            tags: []
          }
        }
      }), te(""));
    }
  }, lt = async () => {
    Ft(!0);
    try {
      window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), o && await ee();
    } finally {
      Ft(!1);
    }
  }, ac = (Z) => {
    const K = Z.toLowerCase().trim();
    if (K === "help" || K === "?" || K.includes("how do i"))
      return { action: "help", query: Z };
    const B = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i
    ];
    for (const I of B) {
      const ve = Z.match(I);
      if (ve)
        return { action: "create", query: ve[1] || Z };
    }
    return [
      /^list$/i,
      /^list\s+(?:my\s+)?(?:memories|notes)$/i,
      /^show\s+(?:my\s+)?(?:memories|notes)$/i,
      /^recent\s+(?:memories|notes)$/i
    ].some((I) => I.test(Z)) ? { action: "list", query: "" } : { action: "search", query: Z };
  }, ju = Y.useCallback((Z) => {
    J(Z), ze({
      title: Z.title || "",
      content: Z.content || "",
      memory_type: Z.memory_type || "knowledge",
      tags: cm(Z.tags)
    }), ce(!1);
  }, []), Nu = Y.useCallback(() => {
    J(null), ce(!1);
  }, []), jl = Y.useCallback((Z) => {
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:clipboard:write",
        payload: { text: Z }
      });
      return;
    }
    navigator.clipboard?.writeText && navigator.clipboard.writeText(Z);
  }, []), Nl = Y.useCallback(() => {
    D && (ze({
      title: D.title || "",
      content: D.content || "",
      memory_type: D.memory_type || "knowledge",
      tags: cm(D.tags)
    }), ce(!0));
  }, [D]), Ml = Y.useCallback(async () => {
    if (!D) return;
    const Z = {
      title: xe.title.trim() || D.title,
      content: xe.content.trim() || D.content,
      memory_type: xe.memory_type || D.memory_type,
      tags: z2(xe.tags)
    };
    an(!0);
    try {
      if (Tt) {
        const K = await me.updateMemory(
          D.id,
          Z
        );
        if (K?.error)
          throw new Error(K.error);
        const B = K?.data || D;
        J(B), ie(
          (P) => P.map((I) => I.id === B.id ? B : I)
        ), ce(!1), await ee();
        return;
      }
      window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:update",
        payload: { id: D.id, updates: Z }
      }), J(
        (K) => K && {
          ...K,
          ...Z,
          tags: Z.tags || K.tags,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      )), ce(!1);
    } catch (K) {
      const B = K instanceof Error ? K.message : "Update failed";
      q(B);
    } finally {
      an(!1);
    }
  }, [
    D,
    xe.title,
    xe.content,
    xe.memory_type,
    xe.tags,
    Tt,
    me,
    ee
  ]), cn = Y.useCallback(async () => {
    if (!(!D || !window.confirm(
      `Delete "${D.title}"? This cannot be undone.`
    ))) {
      an(!0);
      try {
        if (Tu)
          window.vscode && window.vscode.postMessage({
            type: "lanonasis:cache:delete",
            payload: { id: D.id }
          });
        else if (Tt) {
          const K = await me.deleteMemory(D.id);
          if (K?.error)
            throw new Error(K.error.message || "Delete failed");
          await ee();
        } else window.vscode && window.vscode.postMessage({
          type: "lanonasis:cache:delete",
          payload: { id: D.id }
        });
        ie(
          (K) => K.filter((B) => B.id !== D.id)
        ), J(null);
      } catch (K) {
        const B = K instanceof Error ? K.message : "Delete failed";
        q(B);
      } finally {
        an(!1);
      }
    }
  }, [D, Tt, me, ee]), il = Y.useCallback(() => {
    Ta(!0);
  }, []), jn = Y.useCallback(() => {
    Ta(!1), Al(!1), On("");
  }, []), Mu = Y.useCallback(() => {
    Et.trim() && (f && f(Et.trim()), On(""), Al(!1));
  }, [Et, f]), Ma = async () => {
    const Z = Be.trim();
    if (!Z) return;
    const K = {
      id: `user_${Date.now()}`,
      role: "user",
      content: Z,
      timestamp: Date.now()
    };
    Pe((I) => [...I, K]), te("");
    const B = ac(Z);
    if (B.action === "help") {
      const I = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `🧠 **L0 Memory Assistant**

I can help you:
• **Search**: "find my OAuth notes" or "what was that regex?"
• **Save**: "save Use PKCE for mobile OAuth"
• **List**: "show my memories"

Try asking me something!`,
        timestamp: Date.now()
      };
      Pe((ve) => [...ve, I]);
      return;
    }
    if (B.action === "create") {
      const I = {
        title: B.query.slice(0, 50) + (B.query.length > 50 ? "..." : ""),
        content: B.query,
        memory_type: "knowledge",
        tags: []
      };
      if (Tt)
        try {
          await de(I);
          const at = {
            id: `assistant_${Date.now()}`,
            role: "assistant",
            content: `✅ Memory saved: "${B.query.slice(0, 50)}${B.query.length > 50 ? "..." : ""}"`,
            timestamp: Date.now()
          };
          Pe((on) => [...on, at]), await ee();
          return;
        } catch (at) {
          console.log("Create failed, saving locally:", at);
        }
      window.vscode && window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: { memory: I }
      });
      const ve = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `✅ Memory saved locally (will sync when online): "${B.query.slice(
          0,
          50
        )}${B.query.length > 50 ? "..." : ""}"`,
        timestamp: Date.now()
      };
      Pe((at) => [...at, ve]);
      return;
    }
    if (B.action === "list") {
      const ve = (Tt && U.length > 0 ? U : X).slice(0, 5), at = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: ve.length > 0 ? "Here are your recent memories:" : "I don't have any memories yet. Try saving one!",
        memories: ve,
        timestamp: Date.now()
      };
      Pe((on) => [...on, at]);
      return;
    }
    H(!0);
    const P = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${B.query}"`,
      memories: [],
      timestamp: Date.now()
    };
    if (un.current = P.id, Pe((I) => [...I, P]), window.vscode)
      window.vscode.postMessage({
        type: "lanonasis:ai:search",
        payload: { query: B.query, requestId: P.id }
      });
    else
      try {
        await we(B.query);
        const I = X.filter(
          (ve) => om(ve, B.query)
        );
        ll(P.id, (ve) => ({
          ...ve,
          content: I && I.length > 0 ? `Found ${I.length} relevant memories:` : `No memories found for "${B.query}"`,
          memories: I || []
        }));
      } catch (I) {
        console.log("Search failed:", I);
      } finally {
        un.current = null, H(!1);
      }
  };
  return /* @__PURE__ */ h.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ h.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    M && /* @__PURE__ */ h.jsxs("div", { className: "absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between", children: [
      /* @__PURE__ */ h.jsx("span", { className: "text-[11px] text-red-200", children: M }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          onClick: () => q(null),
          className: "text-red-200 hover:text-white text-xs ml-2",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ h.jsx("div", { className: "flex items-center gap-2", children: al ? /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h.jsx("div", { className: "h-6 w-6 rounded-full bg-[var(--vscode-badge-background)]/30 text-[10px] font-semibold text-[var(--vscode-editor-foreground)] flex items-center justify-center", children: E2(al) }),
        /* @__PURE__ */ h.jsxs("div", { className: "flex flex-col leading-tight", children: [
          /* @__PURE__ */ h.jsx("span", { className: "text-[11px] font-semibold text-[var(--vscode-sideBarTitle-foreground)] max-w-[150px] truncate", children: ja }),
          Na && /* @__PURE__ */ h.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[150px] truncate", children: Na })
        ] })
      ] }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
        /* @__PURE__ */ h.jsx(
          S2,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ h.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }) }),
      /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]", children: [
          /* @__PURE__ */ h.jsx(
            "div",
            {
              className: `h-1.5 w-1.5 rounded-full ${o ? F.isOnline ? "bg-green-500" : "bg-red-500" : "bg-yellow-500"}`,
              title: o ? F.isOnline ? "Online" : "Offline" : "Local"
            }
          ),
          /* @__PURE__ */ h.jsx("span", { children: o ? F.isOnline ? "Online" : "Offline" : "Local" })
        ] }),
        /* @__PURE__ */ h.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80", children: Oa }),
        ft && /* @__PURE__ */ h.jsx("span", { className: "text-[10px] text-blue-300/90", children: "Local mode" }),
        o && /* @__PURE__ */ h.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80", children: F.isSyncing ? "Syncing..." : F.pendingCount > 0 ? `${F.pendingCount} pending` : F.lastSyncAt ? `Synced ${Bm(
          new Date(F.lastSyncAt).toISOString()
        )}` : "Not synced" }),
        /* @__PURE__ */ h.jsx(
          Ne,
          {
            variant: "ghost",
            size: "icon",
            title: "Settings",
            onClick: il,
            children: rt.settings
          }
        ),
        o && /* @__PURE__ */ h.jsx(
          Ne,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: m,
            children: rt.logout
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ h.jsx(
      O2,
      {
        syncStatus: F,
        onSync: lt,
        isAuthenticated: o,
        hasLocalMemories: Eu,
        onConnect: il
      }
    ),
    /* @__PURE__ */ h.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ h.jsx(
        sm,
        {
          title: "Memory Assistant",
          isOpen: Le,
          onToggle: () => Dt(!Le)
        }
      ),
      Le && /* @__PURE__ */ h.jsxs(
        "div",
        {
          ref: nl,
          className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3 bg-[var(--vscode-sideBar-background)]",
          children: [
            zt.length === 0 ? /* @__PURE__ */ h.jsx("div", { className: "text-[13px] text-[var(--vscode-foreground)] flex flex-col items-center justify-center text-center py-4", children: o ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
              /* @__PURE__ */ h.jsx("div", { className: "text-[var(--vscode-button-background)] mb-2", children: rt.lightbulb }),
              /* @__PURE__ */ h.jsx("p", { className: "italic opacity-90", children: "Ask me to find or save memories" }),
              /* @__PURE__ */ h.jsx("p", { className: "text-[11px] mt-1 opacity-70", children: 'Try: "find my OAuth notes"' })
            ] }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
              /* @__PURE__ */ h.jsx("p", { className: "italic opacity-90", children: "Local mode: search cached memories or save new ones." }),
              /* @__PURE__ */ h.jsx("p", { className: "text-[11px] mt-1 opacity-70", children: "Connect for full AI search and sync." })
            ] }) }) : zt.map((Z) => /* @__PURE__ */ h.jsx(
              j2,
              {
                message: Z,
                onOpenMemory: ju
              },
              Z.id
            )),
            O && /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ h.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ h.jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    fill: "none"
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ] }),
              "Searching..."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ h.jsx(
        sm,
        {
          title: `Memories${F.pendingCount > 0 ? ` (${F.pendingCount} pending)` : ""}`,
          isOpen: Wt,
          onToggle: () => Ut(!Wt),
          actions: (o || X.length > 0) && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(
              Ne,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => Ol.current?.focus(),
                children: rt.search
              }
            ),
            /* @__PURE__ */ h.jsx(
              Ne,
              {
                variant: "ghost",
                size: "icon",
                onClick: lt,
                disabled: !o,
                children: /* @__PURE__ */ h.jsx(
                  "span",
                  {
                    className: Ie || F.isSyncing ? "animate-spin" : "",
                    children: rt.refresh
                  }
                )
              }
            )
          ] })
        }
      ),
      Wt && /* @__PURE__ */ h.jsx("div", { className: "flex-1", children: /* @__PURE__ */ h.jsxs("div", { className: "p-2 space-y-2", children: [
        !o && /* @__PURE__ */ h.jsx("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3", children: /* @__PURE__ */ h.jsx(
          T2,
          {
            onLoginOAuth: s,
            onLoginApiKey: f,
            isLoading: v,
            error: T
          }
        ) }),
        /* @__PURE__ */ h.jsx(
          ga,
          {
            ref: Ol,
            placeholder: "Search memories...",
            value: $,
            onChange: (Z) => be(Z.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ h.jsxs(
            Ne,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: Pt,
              disabled: Oe,
              children: [
                Oe ? /* @__PURE__ */ h.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ h.jsx(
                    "circle",
                    {
                      className: "opacity-25",
                      cx: "12",
                      cy: "12",
                      r: "10",
                      stroke: "currentColor",
                      strokeWidth: "4",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ h.jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }
                  )
                ] }) : rt.plus,
                Oe ? "Creating..." : Tt ? "Create" : "Save Local"
              ]
            }
          ),
          /* @__PURE__ */ h.jsxs(
            Ne,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: lt,
              disabled: !o || Ie || F.isSyncing,
              children: [
                /* @__PURE__ */ h.jsx(
                  "span",
                  {
                    className: Ie || F.isSyncing ? "animate-spin" : "",
                    children: rt.refresh
                  }
                ),
                Ie || F.isSyncing ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ h.jsx("div", { className: "space-y-0.5", children: L || He ? /* @__PURE__ */ h.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : dt.length === 0 ? /* @__PURE__ */ h.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: $ ? "No memories found" : X.length > 0 ? "Loading from cache..." : "No memories yet. Create one!" }) : dt.map((Z) => /* @__PURE__ */ h.jsx(
          A2,
          {
            memory: Z,
            onClick: () => ju(Z)
          },
          Z.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ h.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ h.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ h.jsx(
        "textarea",
        {
          value: Be,
          onChange: (Z) => te(Z.target.value),
          onKeyDown: (Z) => {
            Z.key === "Enter" && !Z.shiftKey && (Z.preventDefault(), Ma());
          },
          placeholder: o ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Search cached memories or save a note",
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
        }
      ) }),
      /* @__PURE__ */ h.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ h.jsx(
        Ne,
        {
          size: "icon",
          variant: "ghost",
          className: "h-6 w-6",
          onClick: i,
          title: "Attach from clipboard",
          children: rt.paperclip
        }
      ) }),
      /* @__PURE__ */ h.jsx("div", { className: "absolute right-2 bottom-1.5", children: /* @__PURE__ */ h.jsx(
        Ne,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !Be.trim() || O,
          onClick: Ma,
          title: "Send (Enter)",
          children: O ? /* @__PURE__ */ h.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ h.jsx(
              "circle",
              {
                className: "opacity-25",
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4",
                fill: "none"
              }
            ),
            /* @__PURE__ */ h.jsx(
              "path",
              {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
            )
          ] }) : rt.send
        }
      ) })
    ] }) }),
    D && /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: "absolute inset-0 z-40",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ h.jsx("div", { className: "absolute inset-0", onClick: Nu }),
          /* @__PURE__ */ h.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ h.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Memory Detail" }),
                /* @__PURE__ */ h.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: D.title }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
                  zs(
                    D.updated_at || D.created_at
                  ),
                  " • ",
                  D.memory_type,
                  " • ",
                  Tu ? "Local" : "Synced",
                  D._pending ? ` (${D._pending})` : ""
                ] })
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Copy content",
                    onClick: () => jl(D.content),
                    children: rt.copy
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Edit memory",
                    onClick: Nl,
                    children: rt.edit
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Delete memory",
                    onClick: cn,
                    disabled: It,
                    children: rt.trash
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Close",
                    onClick: Nu,
                    children: rt.close
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ h.jsx("div", { className: "flex-1 overflow-y-auto mt-3", children: ue ? /* @__PURE__ */ h.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Title" }),
                /* @__PURE__ */ h.jsx(
                  ga,
                  {
                    value: xe.title,
                    onChange: (Z) => ze((K) => ({
                      ...K,
                      title: Z.target.value
                    })),
                    className: "h-8 text-[13px]"
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Type" }),
                /* @__PURE__ */ h.jsx(
                  "select",
                  {
                    value: xe.memory_type,
                    onChange: (Z) => ze((K) => ({
                      ...K,
                      memory_type: Z.target.value
                    })),
                    className: "vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]",
                    children: x2.map((Z) => /* @__PURE__ */ h.jsx("option", { value: Z, children: Z }, Z))
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Tags (comma separated)" }),
                /* @__PURE__ */ h.jsx(
                  ga,
                  {
                    value: xe.tags,
                    onChange: (Z) => ze((K) => ({
                      ...K,
                      tags: Z.target.value
                    })),
                    className: "h-8 text-[13px]"
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Content" }),
                /* @__PURE__ */ h.jsx(
                  "textarea",
                  {
                    value: xe.content,
                    onChange: (Z) => ze((K) => ({
                      ...K,
                      content: Z.target.value
                    })),
                    className: "vscode-input w-full min-h-[140px] rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] p-2 text-[13px] text-[var(--vscode-input-foreground)] resize-none"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ h.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ h.jsx(
                "div",
                {
                  className: "text-[13px] text-[var(--vscode-editor-foreground)]",
                  style: { whiteSpace: "pre-wrap" },
                  children: D.content
                }
              ),
              D.tags?.length > 0 && /* @__PURE__ */ h.jsx(
                "div",
                {
                  className: "flex gap-1",
                  style: { flexWrap: "wrap" },
                  children: D.tags.map((Z, K) => /* @__PURE__ */ h.jsxs(
                    "span",
                    {
                      className: "px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]",
                      children: [
                        "#",
                        Z
                      ]
                    },
                    `${Z}-${K}`
                  ))
                }
              )
            ] }) }),
            /* @__PURE__ */ h.jsx("div", { className: "pt-3 border-t border-[var(--vscode-panel-border)] mt-3", children: ue ? /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ h.jsx(
                Ne,
                {
                  className: "flex-1 h-7",
                  onClick: Ml,
                  disabled: It,
                  children: It ? "Saving..." : "Save Changes"
                }
              ),
              /* @__PURE__ */ h.jsx(
                Ne,
                {
                  className: "flex-1 h-7",
                  variant: "secondary",
                  onClick: () => ce(!1),
                  disabled: It,
                  children: "Cancel"
                }
              )
            ] }) : /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ h.jsxs("span", { children: [
                "Updated ",
                zs(D.updated_at)
              ] }),
              D._pending && /* @__PURE__ */ h.jsx("span", { className: "text-yellow-400", children: "Pending sync" })
            ] }) })
          ] }) })
        ]
      }
    ),
    Ea && /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: "absolute inset-0 z-50",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ h.jsx("div", { className: "absolute inset-0", onClick: jn }),
          /* @__PURE__ */ h.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ h.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ h.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: "Settings" }),
              /* @__PURE__ */ h.jsx(
                Ne,
                {
                  variant: "ghost",
                  size: "icon",
                  title: "Close",
                  onClick: jn,
                  children: rt.close
                }
              )
            ] }),
            /* @__PURE__ */ h.jsxs("div", { className: "flex-1 overflow-y-auto mt-3 space-y-3", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Connection" }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Status:",
                  " ",
                  o ? F.isOnline ? "Online" : "Offline" : "Local"
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Auth: ",
                  Oa
                ] }),
                (p || S) && /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "User: ",
                  p || S
                ] }),
                p && S && /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Email: ",
                  S
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Last sync:",
                  " ",
                  F.lastSyncAt ? zs(
                    new Date(F.lastSyncAt).toISOString()
                  ) : "—"
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Pending changes: ",
                  F.pendingCount
                ] })
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "API Access" }),
                o ? /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Connected via ",
                  Oa,
                  "."
                ] }) : /* @__PURE__ */ h.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Connect to sync and search across devices." }),
                Aa ? /* @__PURE__ */ h.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ h.jsx(
                    ga,
                    {
                      type: "password",
                      placeholder: "Enter your API key (lano_... or lns_...)",
                      value: Et,
                      onChange: (Z) => On(Z.target.value),
                      className: "h-8 text-[13px]",
                      onKeyDown: (Z) => Z.key === "Enter" && Mu()
                    }
                  ),
                  /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ h.jsx(
                      Ne,
                      {
                        className: "flex-1",
                        onClick: Mu,
                        disabled: !Et.trim() || v,
                        children: v ? "Connecting..." : "Save API Key"
                      }
                    ),
                    /* @__PURE__ */ h.jsx(
                      Ne,
                      {
                        className: "flex-1",
                        variant: "secondary",
                        onClick: () => {
                          Al(!1), On("");
                        },
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ h.jsx(
                    Ne,
                    {
                      className: "flex-1 h-7",
                      onClick: s,
                      disabled: v,
                      children: v ? "Connecting..." : "Connect in Browser"
                    }
                  ),
                  /* @__PURE__ */ h.jsx(
                    Ne,
                    {
                      className: "flex-1 h-7",
                      variant: "secondary",
                      onClick: () => Al(!0),
                      disabled: v,
                      children: "Enter API Key"
                    }
                  )
                ] }),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    className: "w-full h-7",
                    variant: "secondary",
                    onClick: () => window.vscode?.postMessage({
                      type: "lanonasis:open-dashboard",
                      payload: { section: "api-keys" }
                    }),
                    children: "Manage API Keys in Dashboard"
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Cache" }),
                /* @__PURE__ */ h.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Clear cached memories and pending changes stored locally." }),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    className: "w-full h-7",
                    variant: "secondary",
                    onClick: () => {
                      window.confirm(
                        "Clear cached memories and pending changes? This cannot be undone."
                      ) && window.vscode?.postMessage({
                        type: "lanonasis:cache:clear"
                      });
                    },
                    children: "Clear Local Cache"
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Extension Settings" }),
                /* @__PURE__ */ h.jsx(
                  Ne,
                  {
                    className: "w-full h-7",
                    variant: "secondary",
                    onClick: () => window.vscode?.postMessage({
                      type: "lanonasis:open-settings"
                    }),
                    children: "Open VS Code Settings"
                  }
                )
              ] })
            ] })
          ] }) })
        ]
      }
    )
  ] }) });
};
typeof window < "u" && typeof window.acquireVsCodeApi == "function" && (window.vscode = window.acquireVsCodeApi());
const rm = document.getElementById("root"), xa = {
  apiUrl: "https://api.lanonasis.com",
  pending: /* @__PURE__ */ new Map()
};
let fm = !1, M2 = 0;
function w2(a) {
  a && (xa.apiUrl = a);
}
function C2(a) {
  return typeof a == "string" ? a : a instanceof URL ? a.toString() : a.url;
}
function D2(a) {
  try {
    const i = new URL(a, window.location.href), o = new URL(xa.apiUrl);
    return i.origin === o.origin && i.pathname.startsWith("/api/");
  } catch {
    return !1;
  }
}
function U2(a) {
  const i = new Headers(a || {}), o = {};
  return i.forEach((s, f) => {
    o[f] = s;
  }), delete o.authorization, delete o.Authorization, delete o["x-api-key"], delete o["X-API-Key"], o;
}
async function R2(a, i, o) {
  const s = o.toUpperCase();
  if (!(s === "GET" || s === "HEAD")) {
    if (typeof i?.body == "string")
      return i.body;
    if (i?.body instanceof URLSearchParams)
      return i.body.toString();
    if (i?.body != null)
      return String(i.body);
    if (a instanceof Request)
      return await a.clone().text() || void 0;
  }
}
function Z2(a) {
  const i = a.data;
  if (!i || i.type !== "lanonasis:api:response")
    return;
  const o = i.payload || {}, s = o.requestId;
  if (!s)
    return;
  const f = xa.pending.get(s);
  if (!f)
    return;
  if (xa.pending.delete(s), window.clearTimeout(f.timeoutId), o.error) {
    f.reject(new Error(o.error));
    return;
  }
  const m = o.status ?? 500, v = o.body && ![204, 205, 304].includes(m) ? o.body : null;
  f.resolve(
    new Response(v, {
      status: m,
      statusText: o.statusText,
      headers: o.headers || []
    })
  );
}
function q2() {
  if (fm || typeof window > "u" || typeof window.fetch != "function")
    return;
  fm = !0;
  const a = window.fetch.bind(window);
  window.addEventListener("message", Z2), window.fetch = async (i, o) => {
    const s = C2(i);
    if (!D2(s) || !window.vscode || typeof window.vscode.postMessage != "function")
      return i instanceof URL ? a(i.toString(), o) : a(i, o);
    const f = o?.method || (i instanceof Request ? i.method : "GET"), m = U2(
      o?.headers || (i instanceof Request ? i.headers : void 0)
    ), v = await R2(i, o, f), T = `api_${Date.now()}_${M2++}`;
    return new Promise((S, p) => {
      const R = window.setTimeout(() => {
        xa.pending.delete(T), p(new Error("API proxy timed out"));
      }, 3e4);
      xa.pending.set(T, {
        resolve: S,
        reject: p,
        timeoutId: R
      }), window.vscode?.postMessage({
        type: "lanonasis:api:request",
        payload: {
          requestId: T,
          url: s,
          init: {
            method: f,
            headers: m,
            body: v
          }
        }
      });
    });
  };
}
q2();
function H2() {
  const [a, i] = Y.useState(""), [o, s] = Y.useState("https://api.lanonasis.com"), [f, m] = Y.useState(!1), [v, T] = Y.useState("none"), [S, p] = Y.useState(!1), [R, U] = Y.useState(null), [L, ee] = Y.useState(null);
  Y.useEffect(() => {
    if (!window.vscode || typeof window.vscode.getState != "function") return;
    const He = window.vscode.getState?.() || {};
    He.injectedChat && i(He.injectedChat), He.authError !== void 0 && U(He.authError);
  }, []), Y.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const He = (me) => {
      const $ = me.data;
      if (!(!$ || typeof $ != "object")) {
        if ($.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if ($.type === "lanonasis:config:init" || $.type === "lanonasis:config:update") {
          const be = $.payload?.apiUrl, Be = $.payload?.isAuthenticated, te = $.payload?.authMethod, Le = $.payload?.user;
          be && (s(be), w2(be)), Be !== void 0 && (m(Be), p(!1), U(null)), te !== void 0 && T(te), Le !== void 0 && ee(Le);
          return;
        }
        if ($.type === "lanonasis:auth:result") {
          p(!1), $.payload?.success ? U(null) : U($.payload?.error || "Authentication failed");
          return;
        }
        if ($.type === "lanonasis:memory:createFromSelection") {
          const be = $.payload?.text ?? "";
          be && (i(be), window.vscode?.setState?.({
            injectedChat: be,
            authError: R
          }));
          return;
        }
        if ($.type === "lanonasis:clipboard:read:result") {
          const be = $.payload?.text ?? "";
          be && (i(be), window.vscode?.setState?.({
            injectedChat: be,
            authError: R
          }));
          return;
        }
      }
    };
    return window.addEventListener("message", He), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", He);
    };
  }, []);
  const de = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, Oe = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (p(!0), U(null), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, we = (He) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (p(!0), U(null), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: He }
    }));
  }, Ve = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), m(!1), T("none"), U(null), p(!1), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }));
  };
  return /* @__PURE__ */ h.jsx(p2, { apiUrl: o, children: /* @__PURE__ */ h.jsx(
    N2,
    {
      initialChatInput: a,
      onAttachFromClipboard: de,
      isAuthenticated: f,
      authMethod: v,
      onLoginOAuth: Oe,
      onLoginApiKey: we,
      onLogout: Ve,
      authLoading: S,
      authError: R,
      userName: L?.name || null,
      userEmail: L?.email || null
    }
  ) });
}
rm && cy.createRoot(rm).render(
  /* @__PURE__ */ h.jsx(js.StrictMode, { children: /* @__PURE__ */ h.jsx(H2, {}) })
);
