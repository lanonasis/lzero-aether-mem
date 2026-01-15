function om(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ds = { exports: {} }, vu = {};
var Oh;
function V0() {
  if (Oh) return vu;
  Oh = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(s, f, v) {
    var m = null;
    if (v !== void 0 && (m = "" + v), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      v = {};
      for (var T in f)
        T !== "key" && (v[T] = f[T]);
    } else v = f;
    return f = v.ref, {
      $$typeof: a,
      type: s,
      key: m,
      ref: f !== void 0 ? f : null,
      props: v
    };
  }
  return vu.Fragment = i, vu.jsx = o, vu.jsxs = o, vu;
}
var hs = { exports: {} }, te = {};
var Nh;
function K0() {
  if (Nh) return te;
  Nh = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), s = /* @__PURE__ */ Symbol.for("react.strict_mode"), f = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), T = /* @__PURE__ */ Symbol.for("react.forward_ref"), x = /* @__PURE__ */ Symbol.for("react.suspense"), g = /* @__PURE__ */ Symbol.for("react.memo"), Z = /* @__PURE__ */ Symbol.for("react.lazy"), U = /* @__PURE__ */ Symbol.for("react.activity"), k = Symbol.iterator;
  function ee(p) {
    return p === null || typeof p != "object" ? null : (p = k && p[k] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var he = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Oe = Object.assign, Ce = {};
  function Se(p, j, R) {
    this.props = p, this.context = j, this.refs = Ce, this.updater = R || he;
  }
  Se.prototype.isReactComponent = {}, Se.prototype.setState = function(p, j) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, j, "setState");
  }, Se.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function mt() {
  }
  mt.prototype = Se.prototype;
  function F(p, j, R) {
    this.props = p, this.context = j, this.refs = Ce, this.updater = R || he;
  }
  var I = F.prototype = new mt();
  I.constructor = F, Oe(I, Se.prototype), I.isPureReactComponent = !0;
  var ke = Array.isArray;
  function qe() {
  }
  var le = { H: null, A: null, T: null, S: null }, Pe = Object.prototype.hasOwnProperty;
  function wt(p, j, R) {
    var w = R.ref;
    return {
      $$typeof: a,
      type: p,
      key: j,
      ref: w !== void 0 ? w : null,
      props: R
    };
  }
  function Wt(p, j) {
    return wt(p.type, j, p.props);
  }
  function Ut(p) {
    return typeof p == "object" && p !== null && p.$$typeof === a;
  }
  function Fe(p) {
    var j = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(R) {
      return j[R];
    });
  }
  var Ft = /\/+/g;
  function Et(p, j) {
    return typeof p == "object" && p !== null && p.key != null ? Fe("" + p.key) : j.toString(36);
  }
  function Qe(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(qe, qe) : (p.status = "pending", p.then(
          function(j) {
            p.status === "pending" && (p.status = "fulfilled", p.value = j);
          },
          function(j) {
            p.status === "pending" && (p.status = "rejected", p.reason = j);
          }
        )), p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
        }
    }
    throw p;
  }
  function O(p, j, R, w, K) {
    var ue = typeof p;
    (ue === "undefined" || ue === "boolean") && (p = null);
    var oe = !1;
    if (p === null) oe = !0;
    else
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          oe = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case a:
            case i:
              oe = !0;
              break;
            case Z:
              return oe = p._init, O(
                oe(p._payload),
                j,
                R,
                w,
                K
              );
          }
      }
    if (oe)
      return K = K(p), oe = w === "" ? "." + Et(p, 0) : w, ke(K) ? (R = "", oe != null && (R = oe.replace(Ft, "$&/") + "/"), O(K, j, R, "", function(It) {
        return It;
      })) : K != null && (Ut(K) && (K = Wt(
        K,
        R + (K.key == null || p && p.key === K.key ? "" : ("" + K.key).replace(
          Ft,
          "$&/"
        ) + "/") + oe
      )), j.push(K)), 1;
    oe = 0;
    var ze = w === "" ? "." : w + ":";
    if (ke(p))
      for (var xe = 0; xe < p.length; xe++)
        w = p[xe], ue = ze + Et(w, xe), oe += O(
          w,
          j,
          R,
          ue,
          K
        );
    else if (xe = ee(p), typeof xe == "function")
      for (p = xe.call(p), xe = 0; !(w = p.next()).done; )
        w = w.value, ue = ze + Et(w, xe++), oe += O(
          w,
          j,
          R,
          ue,
          K
        );
    else if (ue === "object") {
      if (typeof p.then == "function")
        return O(
          Qe(p),
          j,
          R,
          w,
          K
        );
      throw j = String(p), Error(
        "Objects are not valid as a React child (found: " + (j === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : j) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return oe;
  }
  function H(p, j, R) {
    if (p == null) return p;
    var w = [], K = 0;
    return O(p, w, "", "", function(ue) {
      return j.call(R, ue, K++);
    }), w;
  }
  function X(p) {
    if (p._status === -1) {
      var j = p._result;
      j = j(), j.then(
        function(R) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = R);
        },
        function(R) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = R);
        }
      ), p._status === -1 && (p._status = 0, p._result = j);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var ce = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var j = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(j)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  }, P = {
    map: H,
    forEach: function(p, j, R) {
      H(
        p,
        function() {
          j.apply(this, arguments);
        },
        R
      );
    },
    count: function(p) {
      var j = 0;
      return H(p, function() {
        j++;
      }), j;
    },
    toArray: function(p) {
      return H(p, function(j) {
        return j;
      }) || [];
    },
    only: function(p) {
      if (!Ut(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return te.Activity = U, te.Children = P, te.Component = Se, te.Fragment = o, te.Profiler = f, te.PureComponent = F, te.StrictMode = s, te.Suspense = x, te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = le, te.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return le.H.useMemoCache(p);
    }
  }, te.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, te.cacheSignal = function() {
    return null;
  }, te.cloneElement = function(p, j, R) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var w = Oe({}, p.props), K = p.key;
    if (j != null)
      for (ue in j.key !== void 0 && (K = "" + j.key), j)
        !Pe.call(j, ue) || ue === "key" || ue === "__self" || ue === "__source" || ue === "ref" && j.ref === void 0 || (w[ue] = j[ue]);
    var ue = arguments.length - 2;
    if (ue === 1) w.children = R;
    else if (1 < ue) {
      for (var oe = Array(ue), ze = 0; ze < ue; ze++)
        oe[ze] = arguments[ze + 2];
      w.children = oe;
    }
    return wt(p.type, K, w);
  }, te.createContext = function(p) {
    return p = {
      $$typeof: m,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: v,
      _context: p
    }, p;
  }, te.createElement = function(p, j, R) {
    var w, K = {}, ue = null;
    if (j != null)
      for (w in j.key !== void 0 && (ue = "" + j.key), j)
        Pe.call(j, w) && w !== "key" && w !== "__self" && w !== "__source" && (K[w] = j[w]);
    var oe = arguments.length - 2;
    if (oe === 1) K.children = R;
    else if (1 < oe) {
      for (var ze = Array(oe), xe = 0; xe < oe; xe++)
        ze[xe] = arguments[xe + 2];
      K.children = ze;
    }
    if (p && p.defaultProps)
      for (w in oe = p.defaultProps, oe)
        K[w] === void 0 && (K[w] = oe[w]);
    return wt(p, ue, K);
  }, te.createRef = function() {
    return { current: null };
  }, te.forwardRef = function(p) {
    return { $$typeof: T, render: p };
  }, te.isValidElement = Ut, te.lazy = function(p) {
    return {
      $$typeof: Z,
      _payload: { _status: -1, _result: p },
      _init: X
    };
  }, te.memo = function(p, j) {
    return {
      $$typeof: g,
      type: p,
      compare: j === void 0 ? null : j
    };
  }, te.startTransition = function(p) {
    var j = le.T, R = {};
    le.T = R;
    try {
      var w = p(), K = le.S;
      K !== null && K(R, w), typeof w == "object" && w !== null && typeof w.then == "function" && w.then(qe, ce);
    } catch (ue) {
      ce(ue);
    } finally {
      j !== null && R.types !== null && (j.types = R.types), le.T = j;
    }
  }, te.unstable_useCacheRefresh = function() {
    return le.H.useCacheRefresh();
  }, te.use = function(p) {
    return le.H.use(p);
  }, te.useActionState = function(p, j, R) {
    return le.H.useActionState(p, j, R);
  }, te.useCallback = function(p, j) {
    return le.H.useCallback(p, j);
  }, te.useContext = function(p) {
    return le.H.useContext(p);
  }, te.useDebugValue = function() {
  }, te.useDeferredValue = function(p, j) {
    return le.H.useDeferredValue(p, j);
  }, te.useEffect = function(p, j) {
    return le.H.useEffect(p, j);
  }, te.useEffectEvent = function(p) {
    return le.H.useEffectEvent(p);
  }, te.useId = function() {
    return le.H.useId();
  }, te.useImperativeHandle = function(p, j, R) {
    return le.H.useImperativeHandle(p, j, R);
  }, te.useInsertionEffect = function(p, j) {
    return le.H.useInsertionEffect(p, j);
  }, te.useLayoutEffect = function(p, j) {
    return le.H.useLayoutEffect(p, j);
  }, te.useMemo = function(p, j) {
    return le.H.useMemo(p, j);
  }, te.useOptimistic = function(p, j) {
    return le.H.useOptimistic(p, j);
  }, te.useReducer = function(p, j, R) {
    return le.H.useReducer(p, j, R);
  }, te.useRef = function(p) {
    return le.H.useRef(p);
  }, te.useState = function(p) {
    return le.H.useState(p);
  }, te.useSyncExternalStore = function(p, j, R) {
    return le.H.useSyncExternalStore(
      p,
      j,
      R
    );
  }, te.useTransition = function() {
    return le.H.useTransition();
  }, te.version = "19.2.3", te;
}
var Mh;
function Es() {
  return Mh || (Mh = 1, hs.exports = K0()), hs.exports;
}
var jh;
function $0() {
  return jh || (jh = 1, ds.exports = V0()), ds.exports;
}
var h = $0(), Y = Es();
const Ts = /* @__PURE__ */ om(Y);
var ms = { exports: {} }, yu = {}, vs = { exports: {} }, ys = {};
var Ch;
function J0() {
  return Ch || (Ch = 1, (function(a) {
    function i(O, H) {
      var X = O.length;
      O.push(H);
      e: for (; 0 < X; ) {
        var ce = X - 1 >>> 1, P = O[ce];
        if (0 < f(P, H))
          O[ce] = H, O[X] = P, X = ce;
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
        e: for (var ce = 0, P = O.length, p = P >>> 1; ce < p; ) {
          var j = 2 * (ce + 1) - 1, R = O[j], w = j + 1, K = O[w];
          if (0 > f(R, X))
            w < P && 0 > f(K, R) ? (O[ce] = K, O[w] = X, ce = w) : (O[ce] = R, O[j] = X, ce = j);
          else if (w < P && 0 > f(K, X))
            O[ce] = K, O[w] = X, ce = w;
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
      var v = performance;
      a.unstable_now = function() {
        return v.now();
      };
    } else {
      var m = Date, T = m.now();
      a.unstable_now = function() {
        return m.now() - T;
      };
    }
    var x = [], g = [], Z = 1, U = null, k = 3, ee = !1, he = !1, Oe = !1, Ce = !1, Se = typeof setTimeout == "function" ? setTimeout : null, mt = typeof clearTimeout == "function" ? clearTimeout : null, F = typeof setImmediate < "u" ? setImmediate : null;
    function I(O) {
      for (var H = o(g); H !== null; ) {
        if (H.callback === null) s(g);
        else if (H.startTime <= O)
          s(g), H.sortIndex = H.expirationTime, i(x, H);
        else break;
        H = o(g);
      }
    }
    function ke(O) {
      if (Oe = !1, I(O), !he)
        if (o(x) !== null)
          he = !0, qe || (qe = !0, Fe());
        else {
          var H = o(g);
          H !== null && Qe(ke, H.startTime - O);
        }
    }
    var qe = !1, le = -1, Pe = 5, wt = -1;
    function Wt() {
      return Ce ? !0 : !(a.unstable_now() - wt < Pe);
    }
    function Ut() {
      if (Ce = !1, qe) {
        var O = a.unstable_now();
        wt = O;
        var H = !0;
        try {
          e: {
            he = !1, Oe && (Oe = !1, mt(le), le = -1), ee = !0;
            var X = k;
            try {
              t: {
                for (I(O), U = o(x); U !== null && !(U.expirationTime > O && Wt()); ) {
                  var ce = U.callback;
                  if (typeof ce == "function") {
                    U.callback = null, k = U.priorityLevel;
                    var P = ce(
                      U.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof P == "function") {
                      U.callback = P, I(O), H = !0;
                      break t;
                    }
                    U === o(x) && s(x), I(O);
                  } else s(x);
                  U = o(x);
                }
                if (U !== null) H = !0;
                else {
                  var p = o(g);
                  p !== null && Qe(
                    ke,
                    p.startTime - O
                  ), H = !1;
                }
              }
              break e;
            } finally {
              U = null, k = X, ee = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Fe() : qe = !1;
        }
      }
    }
    var Fe;
    if (typeof F == "function")
      Fe = function() {
        F(Ut);
      };
    else if (typeof MessageChannel < "u") {
      var Ft = new MessageChannel(), Et = Ft.port2;
      Ft.port1.onmessage = Ut, Fe = function() {
        Et.postMessage(null);
      };
    } else
      Fe = function() {
        Se(Ut, 0);
      };
    function Qe(O, H) {
      le = Se(function() {
        O(a.unstable_now());
      }, H);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Pe = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return k;
    }, a.unstable_next = function(O) {
      switch (k) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = k;
      }
      var X = k;
      k = H;
      try {
        return O();
      } finally {
        k = X;
      }
    }, a.unstable_requestPaint = function() {
      Ce = !0;
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
      var X = k;
      k = O;
      try {
        return H();
      } finally {
        k = X;
      }
    }, a.unstable_scheduleCallback = function(O, H, X) {
      var ce = a.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? ce + X : ce) : X = ce, O) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = X + P, O = {
        id: Z++,
        callback: H,
        priorityLevel: O,
        startTime: X,
        expirationTime: P,
        sortIndex: -1
      }, X > ce ? (O.sortIndex = X, i(g, O), o(x) === null && O === o(g) && (Oe ? (mt(le), le = -1) : Oe = !0, Qe(ke, X - ce))) : (O.sortIndex = P, i(x, O), he || ee || (he = !0, qe || (qe = !0, Fe()))), O;
    }, a.unstable_shouldYield = Wt, a.unstable_wrapCallback = function(O) {
      var H = k;
      return function() {
        var X = k;
        k = H;
        try {
          return O.apply(this, arguments);
        } finally {
          k = X;
        }
      };
    };
  })(ys)), ys;
}
var Dh;
function W0() {
  return Dh || (Dh = 1, vs.exports = J0()), vs.exports;
}
var gs = { exports: {} }, st = {};
var wh;
function F0() {
  if (wh) return st;
  wh = 1;
  var a = Es();
  function i(x) {
    var g = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Z = 2; Z < arguments.length; Z++)
        g += "&args[]=" + encodeURIComponent(arguments[Z]);
    }
    return "Minified React error #" + x + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function v(x, g, Z) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: U == null ? null : "" + U,
      children: x,
      containerInfo: g,
      implementation: Z
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(x, g) {
    if (x === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, st.createPortal = function(x, g) {
    var Z = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(i(299));
    return v(x, g, null, Z);
  }, st.flushSync = function(x) {
    var g = m.T, Z = s.p;
    try {
      if (m.T = null, s.p = 2, x) return x();
    } finally {
      m.T = g, s.p = Z, s.d.f();
    }
  }, st.preconnect = function(x, g) {
    typeof x == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, s.d.C(x, g));
  }, st.prefetchDNS = function(x) {
    typeof x == "string" && s.d.D(x);
  }, st.preinit = function(x, g) {
    if (typeof x == "string" && g && typeof g.as == "string") {
      var Z = g.as, U = T(Z, g.crossOrigin), k = typeof g.integrity == "string" ? g.integrity : void 0, ee = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      Z === "style" ? s.d.S(
        x,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: U,
          integrity: k,
          fetchPriority: ee
        }
      ) : Z === "script" && s.d.X(x, {
        crossOrigin: U,
        integrity: k,
        fetchPriority: ee,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, st.preinitModule = function(x, g) {
    if (typeof x == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var Z = T(
            g.as,
            g.crossOrigin
          );
          s.d.M(x, {
            crossOrigin: Z,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && s.d.M(x);
  }, st.preload = function(x, g) {
    if (typeof x == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var Z = g.as, U = T(Z, g.crossOrigin);
      s.d.L(x, Z, {
        crossOrigin: U,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, st.preloadModule = function(x, g) {
    if (typeof x == "string")
      if (g) {
        var Z = T(g.as, g.crossOrigin);
        s.d.m(x, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: Z,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else s.d.m(x);
  }, st.requestFormReset = function(x) {
    s.d.r(x);
  }, st.unstable_batchedUpdates = function(x, g) {
    return x(g);
  }, st.useFormState = function(x, g, Z) {
    return m.H.useFormState(x, g, Z);
  }, st.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, st.version = "19.2.3", st;
}
var Uh;
function I0() {
  if (Uh) return gs.exports;
  Uh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), gs.exports = F0(), gs.exports;
}
var Zh;
function P0() {
  if (Zh) return yu;
  Zh = 1;
  var a = W0(), i = Es(), o = I0();
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
  function v(e) {
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
  function m(e) {
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
  function x(e) {
    if (v(e) !== e)
      throw Error(s(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = v(e), t === null) throw Error(s(188));
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
          if (c === n) return x(u), e;
          if (c === l) return x(u), t;
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
  function Z(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = Z(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var U = Object.assign, k = /* @__PURE__ */ Symbol.for("react.element"), ee = /* @__PURE__ */ Symbol.for("react.transitional.element"), he = /* @__PURE__ */ Symbol.for("react.portal"), Oe = /* @__PURE__ */ Symbol.for("react.fragment"), Ce = /* @__PURE__ */ Symbol.for("react.strict_mode"), Se = /* @__PURE__ */ Symbol.for("react.profiler"), mt = /* @__PURE__ */ Symbol.for("react.consumer"), F = /* @__PURE__ */ Symbol.for("react.context"), I = /* @__PURE__ */ Symbol.for("react.forward_ref"), ke = /* @__PURE__ */ Symbol.for("react.suspense"), qe = /* @__PURE__ */ Symbol.for("react.suspense_list"), le = /* @__PURE__ */ Symbol.for("react.memo"), Pe = /* @__PURE__ */ Symbol.for("react.lazy"), wt = /* @__PURE__ */ Symbol.for("react.activity"), Wt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ut = Symbol.iterator;
  function Fe(e) {
    return e === null || typeof e != "object" ? null : (e = Ut && e[Ut] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ft = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Et(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ft ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Oe:
        return "Fragment";
      case Se:
        return "Profiler";
      case Ce:
        return "StrictMode";
      case ke:
        return "Suspense";
      case qe:
        return "SuspenseList";
      case wt:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case he:
          return "Portal";
        case F:
          return e.displayName || "Context";
        case mt:
          return (e._context.displayName || "Context") + ".Consumer";
        case I:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case le:
          return t = e.displayName || null, t !== null ? t : Et(e.type) || "Memo";
        case Pe:
          t = e._payload, e = e._init;
          try {
            return Et(e(t));
          } catch {
          }
      }
    return null;
  }
  var Qe = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ce = [], P = -1;
  function p(e) {
    return { current: e };
  }
  function j(e) {
    0 > P || (e.current = ce[P], ce[P] = null, P--);
  }
  function R(e, t) {
    P++, ce[P] = e.current, e.current = t;
  }
  var w = p(null), K = p(null), ue = p(null), oe = p(null);
  function ze(e, t) {
    switch (R(ue, t), R(K, e), R(w, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Wd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Wd(t), e = Fd(t, e);
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
    j(w), R(w, e);
  }
  function xe() {
    j(w), j(K), j(ue);
  }
  function It(e) {
    e.memoizedState !== null && R(oe, e);
    var t = w.current, n = Fd(t, e.type);
    t !== n && (R(K, e), R(w, n));
  }
  function an(e) {
    K.current === e && (j(w), j(K)), oe.current === e && (j(oe), fu._currentValue = X);
  }
  var ba, _a;
  function Tt(e) {
    if (ba === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ba = t && t[1] || "", _a = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ba + e + _a;
  }
  var En = !1;
  function Sa(e, t) {
    if (!e || En) return "";
    En = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var C = function() {
                throw Error();
              };
              if (Object.defineProperty(C.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(C, []);
                } catch (A) {
                  var E = A;
                }
                Reflect.construct(e, [], C);
              } else {
                try {
                  C.call();
                } catch (A) {
                  E = A;
                }
                e.call(C.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                E = A;
              }
              (C = e()) && typeof C.catch == "function" && C.catch(function() {
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
                  var N = `
` + y[l].replace(" at new ", " at ");
                  return e.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", e.displayName)), N;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      En = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Tt(n) : "";
  }
  function xl(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Tt(e.type);
      case 16:
        return Tt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Tt("Suspense Fallback") : Tt("Suspense");
      case 19:
        return Tt("SuspenseList");
      case 0:
      case 15:
        return Sa(e.type, !1);
      case 11:
        return Sa(e.type.render, !1);
      case 1:
        return Sa(e.type, !0);
      case 31:
        return Tt("Activity");
      default:
        return "";
    }
  }
  function In(e) {
    try {
      var t = "", n = null;
      do
        t += xl(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var El = Object.prototype.hasOwnProperty, vt = a.unstable_scheduleCallback, za = a.unstable_cancelCallback, Ki = a.unstable_shouldYield, xa = a.unstable_requestPaint, nt = a.unstable_now, $i = a.unstable_getCurrentPriorityLevel, bu = a.unstable_ImmediatePriority, Ji = a.unstable_UserBlockingPriority, Pn = a.unstable_NormalPriority, Wi = a.unstable_LowPriority, Ea = a.unstable_IdlePriority, Fi = a.log, Ta = a.unstable_setDisableYieldValue, el = null, ot = null;
  function Vt(e) {
    if (typeof Fi == "function" && Ta(e), ot && typeof ot.setStrictMode == "function")
      try {
        ot.setStrictMode(el, e);
      } catch {
      }
  }
  var ft = Math.clz32 ? Math.clz32 : ec, Ii = Math.log, Pi = Math.LN2;
  function ec(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ii(e) / Pi | 0) | 0;
  }
  var Tl = 256, tl = 262144, nl = 4194304;
  function Pt(e) {
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
  function q(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, c = e.suspendedLanes, r = e.pingedLanes;
    e = e.warmLanes;
    var d = l & 134217727;
    return d !== 0 ? (l = d & ~c, l !== 0 ? u = Pt(l) : (r &= d, r !== 0 ? u = Pt(r) : n || (n = d & ~e, n !== 0 && (u = Pt(n))))) : (d = l & ~c, d !== 0 ? u = Pt(d) : r !== 0 ? u = Pt(r) : n || (n = l & ~e, n !== 0 && (u = Pt(n)))), u === 0 ? 0 : t !== 0 && t !== u && (t & c) === 0 && (c = u & -u, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : u;
  }
  function W(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function G(e, t) {
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
  function ie() {
    var e = nl;
    return nl <<= 1, (nl & 62914560) === 0 && (nl = 4194304), e;
  }
  function $(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ge(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function dt(e, t, n, l, u, c) {
    var r = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var d = e.entanglements, y = e.expirationTimes, z = e.hiddenUpdates;
    for (n = r & ~n; 0 < n; ) {
      var N = 31 - ft(n), C = 1 << N;
      d[N] = 0, y[N] = -1;
      var E = z[N];
      if (E !== null)
        for (z[N] = null, N = 0; N < E.length; N++) {
          var A = E[N];
          A !== null && (A.lane &= -536870913);
        }
      n &= ~C;
    }
    l !== 0 && Al(e, l, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(r & ~t));
  }
  function Al(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - ft(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function _u(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - ft(n), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), n &= ~u;
    }
  }
  function Ol(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : ll(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function ll(e) {
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
  function tc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Us() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : _h(e.type));
  }
  function Zs(e, t) {
    var n = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = n;
    }
  }
  var Tn = Math.random().toString(36).slice(2), lt = "__reactFiber$" + Tn, yt = "__reactProps$" + Tn, Nl = "__reactContainer$" + Tn, nc = "__reactEvents$" + Tn, Zm = "__reactListeners$" + Tn, Rm = "__reactHandles$" + Tn, Rs = "__reactResources$" + Tn, Aa = "__reactMarker$" + Tn;
  function lc(e) {
    delete e[lt], delete e[yt], delete e[nc], delete e[Zm], delete e[Rm];
  }
  function Ml(e) {
    var t = e[lt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Nl] || n[lt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = ah(e); e !== null; ) {
            if (n = e[lt]) return n;
            e = ah(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function jl(e) {
    if (e = e[lt] || e[Nl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Oa(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function Cl(e) {
    var t = e[Rs];
    return t || (t = e[Rs] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function et(e) {
    e[Aa] = !0;
  }
  var Hs = /* @__PURE__ */ new Set(), qs = {};
  function al(e, t) {
    Dl(e, t), Dl(e + "Capture", t);
  }
  function Dl(e, t) {
    for (qs[e] = t, e = 0; e < t.length; e++)
      Hs.add(t[e]);
  }
  var Hm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Bs = {}, Ys = {};
  function qm(e) {
    return El.call(Ys, e) ? !0 : El.call(Bs, e) ? !1 : Hm.test(e) ? Ys[e] = !0 : (Bs[e] = !0, !1);
  }
  function Su(e, t, n) {
    if (qm(t))
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
  function zu(e, t, n) {
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
  function un(e, t, n, l) {
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
  function ks(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Bm(e, t, n) {
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
  function ac(e) {
    if (!e._valueTracker) {
      var t = ks(e) ? "checked" : "value";
      e._valueTracker = Bm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Gs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = ks(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function xu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ym = /[\n"\\]/g;
  function Rt(e) {
    return e.replace(
      Ym,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function uc(e, t, n, l, u, c, r, d) {
    e.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.type = r : e.removeAttribute("type"), t != null ? r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : r !== "submit" && r !== "reset" || e.removeAttribute("value"), t != null ? ic(e, r, Zt(t)) : n != null ? ic(e, r, Zt(n)) : l != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Zt(d) : e.removeAttribute("name");
  }
  function Ls(e, t, n, l, u, c, r, d) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        ac(e);
        return;
      }
      n = n != null ? "" + Zt(n) : "", t = t != null ? "" + Zt(t) : n, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = d ? e.checked : !!l, e.defaultChecked = !!l, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.name = r), ac(e);
  }
  function ic(e, t, n) {
    t === "number" && xu(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function wl(e, t, n, l) {
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
  function Xs(e, t, n) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Zt(n) : "";
  }
  function Qs(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(s(92));
        if (Qe(l)) {
          if (1 < l.length) throw Error(s(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Zt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), ac(e);
  }
  function Ul(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var km = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Vs(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || km.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Ks(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && n[u] !== l && Vs(e, u, l);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Vs(e, c, t[c]);
  }
  function cc(e) {
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
  var Gm = /* @__PURE__ */ new Map([
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
  ]), Lm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Eu(e) {
    return Lm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function cn() {
  }
  var oc = null;
  function sc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Zl = null, Rl = null;
  function $s(e) {
    var t = jl(e);
    if (t && (e = t.stateNode)) {
      var n = e[yt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (uc(
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
              'input[name="' + Rt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var u = l[yt] || null;
                if (!u) throw Error(s(90));
                uc(
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
              l = n[t], l.form === e.form && Gs(l);
          }
          break e;
        case "textarea":
          Xs(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && wl(e, !!n.multiple, t, !1);
      }
    }
  }
  var rc = !1;
  function Js(e, t, n) {
    if (rc) return e(t, n);
    rc = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (rc = !1, (Zl !== null || Rl !== null) && (fi(), Zl && (t = Zl, e = Rl, Rl = Zl = null, $s(t), e)))
        for (t = 0; t < e.length; t++) $s(e[t]);
    }
  }
  function Na(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[yt] || null;
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
  var on = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), fc = !1;
  if (on)
    try {
      var Ma = {};
      Object.defineProperty(Ma, "passive", {
        get: function() {
          fc = !0;
        }
      }), window.addEventListener("test", Ma, Ma), window.removeEventListener("test", Ma, Ma);
    } catch {
      fc = !1;
    }
  var An = null, dc = null, Tu = null;
  function Ws() {
    if (Tu) return Tu;
    var e, t = dc, n = t.length, l, u = "value" in An ? An.value : An.textContent, c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++) ;
    var r = n - e;
    for (l = 1; l <= r && t[n - l] === u[c - l]; l++) ;
    return Tu = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function Au(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Ou() {
    return !0;
  }
  function Fs() {
    return !1;
  }
  function gt(e) {
    function t(n, l, u, c, r) {
      this._reactName = n, this._targetInst = u, this.type = l, this.nativeEvent = c, this.target = r, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (n = e[d], this[d] = n ? n(c) : c[d]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Ou : Fs, this.isPropagationStopped = Fs, this;
    }
    return U(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ou);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ou);
      },
      persist: function() {
      },
      isPersistent: Ou
    }), t;
  }
  var ul = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Nu = gt(ul), ja = U({}, ul, { view: 0, detail: 0 }), Xm = gt(ja), hc, mc, Ca, Mu = U({}, ja, {
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
    getModifierState: yc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ca && (Ca && e.type === "mousemove" ? (hc = e.screenX - Ca.screenX, mc = e.screenY - Ca.screenY) : mc = hc = 0, Ca = e), hc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : mc;
    }
  }), Is = gt(Mu), Qm = U({}, Mu, { dataTransfer: 0 }), Vm = gt(Qm), Km = U({}, ja, { relatedTarget: 0 }), vc = gt(Km), $m = U({}, ul, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jm = gt($m), Wm = U({}, ul, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Fm = gt(Wm), Im = U({}, ul, { data: 0 }), Ps = gt(Im), Pm = {
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
  }, ev = {
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
  }, tv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function nv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = tv[e]) ? !!t[e] : !1;
  }
  function yc() {
    return nv;
  }
  var lv = U({}, ja, {
    key: function(e) {
      if (e.key) {
        var t = Pm[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Au(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? ev[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: yc,
    charCode: function(e) {
      return e.type === "keypress" ? Au(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Au(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), av = gt(lv), uv = U({}, Mu, {
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
  }), er = gt(uv), iv = U({}, ja, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: yc
  }), cv = gt(iv), ov = U({}, ul, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), sv = gt(ov), rv = U({}, Mu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), fv = gt(rv), dv = U({}, ul, {
    newState: 0,
    oldState: 0
  }), hv = gt(dv), mv = [9, 13, 27, 32], gc = on && "CompositionEvent" in window, Da = null;
  on && "documentMode" in document && (Da = document.documentMode);
  var vv = on && "TextEvent" in window && !Da, tr = on && (!gc || Da && 8 < Da && 11 >= Da), nr = " ", lr = !1;
  function ar(e, t) {
    switch (e) {
      case "keyup":
        return mv.indexOf(t.keyCode) !== -1;
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
  function ur(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Hl = !1;
  function yv(e, t) {
    switch (e) {
      case "compositionend":
        return ur(t);
      case "keypress":
        return t.which !== 32 ? null : (lr = !0, nr);
      case "textInput":
        return e = t.data, e === nr && lr ? null : e;
      default:
        return null;
    }
  }
  function gv(e, t) {
    if (Hl)
      return e === "compositionend" || !gc && ar(e, t) ? (e = Ws(), Tu = dc = An = null, Hl = !1, e) : null;
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
        return tr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var pv = {
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
  function ir(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!pv[e.type] : t === "textarea";
  }
  function cr(e, t, n, l) {
    Zl ? Rl ? Rl.push(l) : Rl = [l] : Zl = l, t = pi(t, "onChange"), 0 < t.length && (n = new Nu(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var wa = null, Ua = null;
  function bv(e) {
    Xd(e, 0);
  }
  function ju(e) {
    var t = Oa(e);
    if (Gs(t)) return e;
  }
  function or(e, t) {
    if (e === "change") return t;
  }
  var sr = !1;
  if (on) {
    var pc;
    if (on) {
      var bc = "oninput" in document;
      if (!bc) {
        var rr = document.createElement("div");
        rr.setAttribute("oninput", "return;"), bc = typeof rr.oninput == "function";
      }
      pc = bc;
    } else pc = !1;
    sr = pc && (!document.documentMode || 9 < document.documentMode);
  }
  function fr() {
    wa && (wa.detachEvent("onpropertychange", dr), Ua = wa = null);
  }
  function dr(e) {
    if (e.propertyName === "value" && ju(Ua)) {
      var t = [];
      cr(
        t,
        Ua,
        e,
        sc(e)
      ), Js(bv, t);
    }
  }
  function _v(e, t, n) {
    e === "focusin" ? (fr(), wa = t, Ua = n, wa.attachEvent("onpropertychange", dr)) : e === "focusout" && fr();
  }
  function Sv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ju(Ua);
  }
  function zv(e, t) {
    if (e === "click") return ju(t);
  }
  function xv(e, t) {
    if (e === "input" || e === "change")
      return ju(t);
  }
  function Ev(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var At = typeof Object.is == "function" ? Object.is : Ev;
  function Za(e, t) {
    if (At(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var u = n[l];
      if (!El.call(t, u) || !At(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function hr(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function mr(e, t) {
    var n = hr(e);
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
      n = hr(n);
    }
  }
  function vr(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function yr(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = xu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = xu(e.document);
    }
    return t;
  }
  function _c(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Tv = on && "documentMode" in document && 11 >= document.documentMode, ql = null, Sc = null, Ra = null, zc = !1;
  function gr(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    zc || ql == null || ql !== xu(l) || (l = ql, "selectionStart" in l && _c(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Ra && Za(Ra, l) || (Ra = l, l = pi(Sc, "onSelect"), 0 < l.length && (t = new Nu(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = ql)));
  }
  function il(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Bl = {
    animationend: il("Animation", "AnimationEnd"),
    animationiteration: il("Animation", "AnimationIteration"),
    animationstart: il("Animation", "AnimationStart"),
    transitionrun: il("Transition", "TransitionRun"),
    transitionstart: il("Transition", "TransitionStart"),
    transitioncancel: il("Transition", "TransitionCancel"),
    transitionend: il("Transition", "TransitionEnd")
  }, xc = {}, pr = {};
  on && (pr = document.createElement("div").style, "AnimationEvent" in window || (delete Bl.animationend.animation, delete Bl.animationiteration.animation, delete Bl.animationstart.animation), "TransitionEvent" in window || delete Bl.transitionend.transition);
  function cl(e) {
    if (xc[e]) return xc[e];
    if (!Bl[e]) return e;
    var t = Bl[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in pr)
        return xc[e] = t[n];
    return e;
  }
  var br = cl("animationend"), _r = cl("animationiteration"), Sr = cl("animationstart"), Av = cl("transitionrun"), Ov = cl("transitionstart"), Nv = cl("transitioncancel"), zr = cl("transitionend"), xr = /* @__PURE__ */ new Map(), Ec = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ec.push("scrollEnd");
  function Kt(e, t) {
    xr.set(e, t), al(t, [e]);
  }
  var Cu = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Ht = [], Yl = 0, Tc = 0;
  function Du() {
    for (var e = Yl, t = Tc = Yl = 0; t < e; ) {
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
      c !== 0 && Er(n, u, c);
    }
  }
  function wu(e, t, n, l) {
    Ht[Yl++] = e, Ht[Yl++] = t, Ht[Yl++] = n, Ht[Yl++] = l, Tc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function Ac(e, t, n, l) {
    return wu(e, t, n, l), Uu(e);
  }
  function ol(e, t) {
    return wu(e, null, null, t), Uu(e);
  }
  function Er(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= n, l = c.alternate, l !== null && (l.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - ft(n), e = c.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = n | 536870912), c) : null;
  }
  function Uu(e) {
    if (50 < au)
      throw au = 0, Ro = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var kl = {};
  function Mv(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ot(e, t, n, l) {
    return new Mv(e, t, n, l);
  }
  function Oc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function sn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ot(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Tr(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Zu(e, t, n, l, u, c) {
    var r = 0;
    if (l = e, typeof e == "function") Oc(e) && (r = 1);
    else if (typeof e == "string")
      r = U0(
        e,
        n,
        w.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case wt:
          return e = Ot(31, n, t, u), e.elementType = wt, e.lanes = c, e;
        case Oe:
          return sl(n.children, u, c, t);
        case Ce:
          r = 8, u |= 24;
          break;
        case Se:
          return e = Ot(12, n, t, u | 2), e.elementType = Se, e.lanes = c, e;
        case ke:
          return e = Ot(13, n, t, u), e.elementType = ke, e.lanes = c, e;
        case qe:
          return e = Ot(19, n, t, u), e.elementType = qe, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case F:
                r = 10;
                break e;
              case mt:
                r = 9;
                break e;
              case I:
                r = 11;
                break e;
              case le:
                r = 14;
                break e;
              case Pe:
                r = 16, l = null;
                break e;
            }
          r = 29, n = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = Ot(r, n, t, u), t.elementType = e, t.type = l, t.lanes = c, t;
  }
  function sl(e, t, n, l) {
    return e = Ot(7, e, l, t), e.lanes = n, e;
  }
  function Nc(e, t, n) {
    return e = Ot(6, e, null, t), e.lanes = n, e;
  }
  function Ar(e) {
    var t = Ot(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Mc(e, t, n) {
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
  var Or = /* @__PURE__ */ new WeakMap();
  function qt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Or.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: In(t)
      }, Or.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: In(t)
    };
  }
  var Gl = [], Ll = 0, Ru = null, Ha = 0, Bt = [], Yt = 0, On = null, en = 1, tn = "";
  function rn(e, t) {
    Gl[Ll++] = Ha, Gl[Ll++] = Ru, Ru = e, Ha = t;
  }
  function Nr(e, t, n) {
    Bt[Yt++] = en, Bt[Yt++] = tn, Bt[Yt++] = On, On = e;
    var l = en;
    e = tn;
    var u = 32 - ft(l) - 1;
    l &= ~(1 << u), n += 1;
    var c = 32 - ft(t) + u;
    if (30 < c) {
      var r = u - u % 5;
      c = (l & (1 << r) - 1).toString(32), l >>= r, u -= r, en = 1 << 32 - ft(t) + u | n << u | l, tn = c + e;
    } else
      en = 1 << c | n << u | l, tn = e;
  }
  function jc(e) {
    e.return !== null && (rn(e, 1), Nr(e, 1, 0));
  }
  function Cc(e) {
    for (; e === Ru; )
      Ru = Gl[--Ll], Gl[Ll] = null, Ha = Gl[--Ll], Gl[Ll] = null;
    for (; e === On; )
      On = Bt[--Yt], Bt[Yt] = null, tn = Bt[--Yt], Bt[Yt] = null, en = Bt[--Yt], Bt[Yt] = null;
  }
  function Mr(e, t) {
    Bt[Yt++] = en, Bt[Yt++] = tn, Bt[Yt++] = On, en = t.id, tn = t.overflow, On = e;
  }
  var at = null, De = null, me = !1, Nn = null, kt = !1, Dc = Error(s(519));
  function Mn(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw qa(qt(t, e)), Dc;
  }
  function jr(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[lt] = e, t[yt] = l, n) {
      case "dialog":
        re("cancel", t), re("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        re("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < iu.length; n++)
          re(iu[n], t);
        break;
      case "source":
        re("error", t);
        break;
      case "img":
      case "image":
      case "link":
        re("error", t), re("load", t);
        break;
      case "details":
        re("toggle", t);
        break;
      case "input":
        re("invalid", t), Ls(
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
        re("invalid", t);
        break;
      case "textarea":
        re("invalid", t), Qs(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || $d(t.textContent, n) ? (l.popover != null && (re("beforetoggle", t), re("toggle", t)), l.onScroll != null && re("scroll", t), l.onScrollEnd != null && re("scrollend", t), l.onClick != null && (t.onclick = cn), t = !0) : t = !1, t || Mn(e, !0);
  }
  function Cr(e) {
    for (at = e.return; at; )
      switch (at.tag) {
        case 5:
        case 31:
        case 13:
          kt = !1;
          return;
        case 27:
        case 3:
          kt = !0;
          return;
        default:
          at = at.return;
      }
  }
  function Xl(e) {
    if (e !== at) return !1;
    if (!me) return Cr(e), me = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Fo(e.type, e.memoizedProps)), n = !n), n && De && Mn(e), Cr(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      De = lh(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      De = lh(e);
    } else
      t === 27 ? (t = De, Ln(e.type) ? (e = ns, ns = null, De = e) : De = t) : De = at ? Lt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function rl() {
    De = at = null, me = !1;
  }
  function wc() {
    var e = Nn;
    return e !== null && (St === null ? St = e : St.push.apply(
      St,
      e
    ), Nn = null), e;
  }
  function qa(e) {
    Nn === null ? Nn = [e] : Nn.push(e);
  }
  var Uc = p(null), fl = null, fn = null;
  function jn(e, t, n) {
    R(Uc, t._currentValue), t._currentValue = n;
  }
  function dn(e) {
    e._currentValue = Uc.current, j(Uc);
  }
  function Zc(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Rc(e, t, n, l) {
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
              c.lanes |= n, d = c.alternate, d !== null && (d.lanes |= n), Zc(
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
        r.lanes |= n, c = r.alternate, c !== null && (c.lanes |= n), Zc(r, n, e), r = null;
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
  function Ql(e, t, n, l) {
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
      } else if (u === oe.current) {
        if (r = u.alternate, r === null) throw Error(s(387));
        r.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(fu) : e = [fu]);
      }
      u = u.return;
    }
    e !== null && Rc(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function Hu(e) {
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
  function dl(e) {
    fl = e, fn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ut(e) {
    return Dr(fl, e);
  }
  function qu(e, t) {
    return fl === null && dl(e), Dr(e, t);
  }
  function Dr(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, fn === null) {
      if (e === null) throw Error(s(308));
      fn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else fn = fn.next = t;
    return n;
  }
  var jv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Cv = a.unstable_scheduleCallback, Dv = a.unstable_NormalPriority, Ve = {
    $$typeof: F,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Hc() {
    return {
      controller: new jv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ba(e) {
    e.refCount--, e.refCount === 0 && Cv(Dv, function() {
      e.controller.abort();
    });
  }
  var Ya = null, qc = 0, Vl = 0, Kl = null;
  function wv(e, t) {
    if (Ya === null) {
      var n = Ya = [];
      qc = 0, Vl = Go(), Kl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return qc++, t.then(wr, wr), t;
  }
  function wr() {
    if (--qc === 0 && Ya !== null) {
      Kl !== null && (Kl.status = "fulfilled");
      var e = Ya;
      Ya = null, Vl = 0, Kl = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Uv(e, t) {
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
  var Ur = O.S;
  O.S = function(e, t) {
    pd = nt(), typeof t == "object" && t !== null && typeof t.then == "function" && wv(e, t), Ur !== null && Ur(e, t);
  };
  var hl = p(null);
  function Bc() {
    var e = hl.current;
    return e !== null ? e : Ne.pooledCache;
  }
  function Bu(e, t) {
    t === null ? R(hl, hl.current) : R(hl, t.pool);
  }
  function Zr() {
    var e = Bc();
    return e === null ? null : { parent: Ve._currentValue, pool: e };
  }
  var $l = Error(s(460)), Yc = Error(s(474)), Yu = Error(s(542)), ku = { then: function() {
  } };
  function Rr(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Hr(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(cn, cn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Br(e), e;
      default:
        if (typeof t.status == "string") t.then(cn, cn);
        else {
          if (e = Ne, e !== null && 100 < e.shellSuspendCounter)
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
            throw e = t.reason, Br(e), e;
        }
        throw vl = t, $l;
    }
  }
  function ml(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (vl = n, $l) : n;
    }
  }
  var vl = null;
  function qr() {
    if (vl === null) throw Error(s(459));
    var e = vl;
    return vl = null, e;
  }
  function Br(e) {
    if (e === $l || e === Yu)
      throw Error(s(483));
  }
  var Jl = null, ka = 0;
  function Gu(e) {
    var t = ka;
    return ka += 1, Jl === null && (Jl = []), Hr(Jl, e, t);
  }
  function Ga(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Lu(e, t) {
    throw t.$$typeof === k ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Yr(e) {
    function t(_, b) {
      if (e) {
        var S = _.deletions;
        S === null ? (_.deletions = [b], _.flags |= 16) : S.push(b);
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
      return _ = sn(_, b), _.index = 0, _.sibling = null, _;
    }
    function c(_, b, S) {
      return _.index = S, e ? (S = _.alternate, S !== null ? (S = S.index, S < b ? (_.flags |= 67108866, b) : S) : (_.flags |= 67108866, b)) : (_.flags |= 1048576, b);
    }
    function r(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function d(_, b, S, M) {
      return b === null || b.tag !== 6 ? (b = Nc(S, _.mode, M), b.return = _, b) : (b = u(b, S), b.return = _, b);
    }
    function y(_, b, S, M) {
      var Q = S.type;
      return Q === Oe ? N(
        _,
        b,
        S.props.children,
        M,
        S.key
      ) : b !== null && (b.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Pe && ml(Q) === b.type) ? (b = u(b, S.props), Ga(b, S), b.return = _, b) : (b = Zu(
        S.type,
        S.key,
        S.props,
        null,
        _.mode,
        M
      ), Ga(b, S), b.return = _, b);
    }
    function z(_, b, S, M) {
      return b === null || b.tag !== 4 || b.stateNode.containerInfo !== S.containerInfo || b.stateNode.implementation !== S.implementation ? (b = Mc(S, _.mode, M), b.return = _, b) : (b = u(b, S.children || []), b.return = _, b);
    }
    function N(_, b, S, M, Q) {
      return b === null || b.tag !== 7 ? (b = sl(
        S,
        _.mode,
        M,
        Q
      ), b.return = _, b) : (b = u(b, S), b.return = _, b);
    }
    function C(_, b, S) {
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return b = Nc(
          "" + b,
          _.mode,
          S
        ), b.return = _, b;
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case ee:
            return S = Zu(
              b.type,
              b.key,
              b.props,
              null,
              _.mode,
              S
            ), Ga(S, b), S.return = _, S;
          case he:
            return b = Mc(
              b,
              _.mode,
              S
            ), b.return = _, b;
          case Pe:
            return b = ml(b), C(_, b, S);
        }
        if (Qe(b) || Fe(b))
          return b = sl(
            b,
            _.mode,
            S,
            null
          ), b.return = _, b;
        if (typeof b.then == "function")
          return C(_, Gu(b), S);
        if (b.$$typeof === F)
          return C(
            _,
            qu(_, b),
            S
          );
        Lu(_, b);
      }
      return null;
    }
    function E(_, b, S, M) {
      var Q = b !== null ? b.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return Q !== null ? null : d(_, b, "" + S, M);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case ee:
            return S.key === Q ? y(_, b, S, M) : null;
          case he:
            return S.key === Q ? z(_, b, S, M) : null;
          case Pe:
            return S = ml(S), E(_, b, S, M);
        }
        if (Qe(S) || Fe(S))
          return Q !== null ? null : N(_, b, S, M, null);
        if (typeof S.then == "function")
          return E(
            _,
            b,
            Gu(S),
            M
          );
        if (S.$$typeof === F)
          return E(
            _,
            b,
            qu(_, S),
            M
          );
        Lu(_, S);
      }
      return null;
    }
    function A(_, b, S, M, Q) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return _ = _.get(S) || null, d(b, _, "" + M, Q);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case ee:
            return _ = _.get(
              M.key === null ? S : M.key
            ) || null, y(b, _, M, Q);
          case he:
            return _ = _.get(
              M.key === null ? S : M.key
            ) || null, z(b, _, M, Q);
          case Pe:
            return M = ml(M), A(
              _,
              b,
              S,
              M,
              Q
            );
        }
        if (Qe(M) || Fe(M))
          return _ = _.get(S) || null, N(b, _, M, Q, null);
        if (typeof M.then == "function")
          return A(
            _,
            b,
            S,
            Gu(M),
            Q
          );
        if (M.$$typeof === F)
          return A(
            _,
            b,
            S,
            qu(b, M),
            Q
          );
        Lu(b, M);
      }
      return null;
    }
    function B(_, b, S, M) {
      for (var Q = null, ve = null, L = b, ae = b = 0, de = null; L !== null && ae < S.length; ae++) {
        L.index > ae ? (de = L, L = null) : de = L.sibling;
        var ye = E(
          _,
          L,
          S[ae],
          M
        );
        if (ye === null) {
          L === null && (L = de);
          break;
        }
        e && L && ye.alternate === null && t(_, L), b = c(ye, b, ae), ve === null ? Q = ye : ve.sibling = ye, ve = ye, L = de;
      }
      if (ae === S.length)
        return n(_, L), me && rn(_, ae), Q;
      if (L === null) {
        for (; ae < S.length; ae++)
          L = C(_, S[ae], M), L !== null && (b = c(
            L,
            b,
            ae
          ), ve === null ? Q = L : ve.sibling = L, ve = L);
        return me && rn(_, ae), Q;
      }
      for (L = l(L); ae < S.length; ae++)
        de = A(
          L,
          _,
          ae,
          S[ae],
          M
        ), de !== null && (e && de.alternate !== null && L.delete(
          de.key === null ? ae : de.key
        ), b = c(
          de,
          b,
          ae
        ), ve === null ? Q = de : ve.sibling = de, ve = de);
      return e && L.forEach(function($n) {
        return t(_, $n);
      }), me && rn(_, ae), Q;
    }
    function J(_, b, S, M) {
      if (S == null) throw Error(s(151));
      for (var Q = null, ve = null, L = b, ae = b = 0, de = null, ye = S.next(); L !== null && !ye.done; ae++, ye = S.next()) {
        L.index > ae ? (de = L, L = null) : de = L.sibling;
        var $n = E(_, L, ye.value, M);
        if ($n === null) {
          L === null && (L = de);
          break;
        }
        e && L && $n.alternate === null && t(_, L), b = c($n, b, ae), ve === null ? Q = $n : ve.sibling = $n, ve = $n, L = de;
      }
      if (ye.done)
        return n(_, L), me && rn(_, ae), Q;
      if (L === null) {
        for (; !ye.done; ae++, ye = S.next())
          ye = C(_, ye.value, M), ye !== null && (b = c(ye, b, ae), ve === null ? Q = ye : ve.sibling = ye, ve = ye);
        return me && rn(_, ae), Q;
      }
      for (L = l(L); !ye.done; ae++, ye = S.next())
        ye = A(L, _, ae, ye.value, M), ye !== null && (e && ye.alternate !== null && L.delete(ye.key === null ? ae : ye.key), b = c(ye, b, ae), ve === null ? Q = ye : ve.sibling = ye, ve = ye);
      return e && L.forEach(function(Q0) {
        return t(_, Q0);
      }), me && rn(_, ae), Q;
    }
    function Ae(_, b, S, M) {
      if (typeof S == "object" && S !== null && S.type === Oe && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case ee:
            e: {
              for (var Q = S.key; b !== null; ) {
                if (b.key === Q) {
                  if (Q = S.type, Q === Oe) {
                    if (b.tag === 7) {
                      n(
                        _,
                        b.sibling
                      ), M = u(
                        b,
                        S.props.children
                      ), M.return = _, _ = M;
                      break e;
                    }
                  } else if (b.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Pe && ml(Q) === b.type) {
                    n(
                      _,
                      b.sibling
                    ), M = u(b, S.props), Ga(M, S), M.return = _, _ = M;
                    break e;
                  }
                  n(_, b);
                  break;
                } else t(_, b);
                b = b.sibling;
              }
              S.type === Oe ? (M = sl(
                S.props.children,
                _.mode,
                M,
                S.key
              ), M.return = _, _ = M) : (M = Zu(
                S.type,
                S.key,
                S.props,
                null,
                _.mode,
                M
              ), Ga(M, S), M.return = _, _ = M);
            }
            return r(_);
          case he:
            e: {
              for (Q = S.key; b !== null; ) {
                if (b.key === Q)
                  if (b.tag === 4 && b.stateNode.containerInfo === S.containerInfo && b.stateNode.implementation === S.implementation) {
                    n(
                      _,
                      b.sibling
                    ), M = u(b, S.children || []), M.return = _, _ = M;
                    break e;
                  } else {
                    n(_, b);
                    break;
                  }
                else t(_, b);
                b = b.sibling;
              }
              M = Mc(S, _.mode, M), M.return = _, _ = M;
            }
            return r(_);
          case Pe:
            return S = ml(S), Ae(
              _,
              b,
              S,
              M
            );
        }
        if (Qe(S))
          return B(
            _,
            b,
            S,
            M
          );
        if (Fe(S)) {
          if (Q = Fe(S), typeof Q != "function") throw Error(s(150));
          return S = Q.call(S), J(
            _,
            b,
            S,
            M
          );
        }
        if (typeof S.then == "function")
          return Ae(
            _,
            b,
            Gu(S),
            M
          );
        if (S.$$typeof === F)
          return Ae(
            _,
            b,
            qu(_, S),
            M
          );
        Lu(_, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, b !== null && b.tag === 6 ? (n(_, b.sibling), M = u(b, S), M.return = _, _ = M) : (n(_, b), M = Nc(S, _.mode, M), M.return = _, _ = M), r(_)) : n(_, b);
    }
    return function(_, b, S, M) {
      try {
        ka = 0;
        var Q = Ae(
          _,
          b,
          S,
          M
        );
        return Jl = null, Q;
      } catch (L) {
        if (L === $l || L === Yu) throw L;
        var ve = Ot(29, L, null, _.mode);
        return ve.lanes = M, ve.return = _, ve;
      }
    };
  }
  var yl = Yr(!0), kr = Yr(!1), Cn = !1;
  function kc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Gc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Dn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function wn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (pe & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = Uu(e), Er(e, null, n), t;
    }
    return wu(e, l, t, n), Uu(e);
  }
  function La(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, _u(e, n);
    }
  }
  function Lc(e, t) {
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
  var Xc = !1;
  function Xa() {
    if (Xc) {
      var e = Kl;
      if (e !== null) throw e;
    }
  }
  function Qa(e, t, n, l) {
    Xc = !1;
    var u = e.updateQueue;
    Cn = !1;
    var c = u.firstBaseUpdate, r = u.lastBaseUpdate, d = u.shared.pending;
    if (d !== null) {
      u.shared.pending = null;
      var y = d, z = y.next;
      y.next = null, r === null ? c = z : r.next = z, r = y;
      var N = e.alternate;
      N !== null && (N = N.updateQueue, d = N.lastBaseUpdate, d !== r && (d === null ? N.firstBaseUpdate = z : d.next = z, N.lastBaseUpdate = y));
    }
    if (c !== null) {
      var C = u.baseState;
      r = 0, N = z = y = null, d = c;
      do {
        var E = d.lane & -536870913, A = E !== d.lane;
        if (A ? (fe & E) === E : (l & E) === E) {
          E !== 0 && E === Vl && (Xc = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var B = e, J = d;
            E = t;
            var Ae = n;
            switch (J.tag) {
              case 1:
                if (B = J.payload, typeof B == "function") {
                  C = B.call(Ae, C, E);
                  break e;
                }
                C = B;
                break e;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = J.payload, E = typeof B == "function" ? B.call(Ae, C, E) : B, E == null) break e;
                C = U({}, C, E);
                break e;
              case 2:
                Cn = !0;
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
          }, N === null ? (z = N = A, y = C) : N = N.next = A, r |= E;
        if (d = d.next, d === null) {
          if (d = u.shared.pending, d === null)
            break;
          A = d, d = A.next, A.next = null, u.lastBaseUpdate = A, u.shared.pending = null;
        }
      } while (!0);
      N === null && (y = C), u.baseState = y, u.firstBaseUpdate = z, u.lastBaseUpdate = N, c === null && (u.shared.lanes = 0), qn |= r, e.lanes = r, e.memoizedState = C;
    }
  }
  function Gr(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function Lr(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Gr(n[e], t);
  }
  var Wl = p(null), Xu = p(0);
  function Xr(e, t) {
    e = Sn, R(Xu, e), R(Wl, t), Sn = e | t.baseLanes;
  }
  function Qc() {
    R(Xu, Sn), R(Wl, Wl.current);
  }
  function Vc() {
    Sn = Xu.current, j(Wl), j(Xu);
  }
  var Nt = p(null), Gt = null;
  function Un(e) {
    var t = e.alternate;
    R(Ge, Ge.current & 1), R(Nt, e), Gt === null && (t === null || Wl.current !== null || t.memoizedState !== null) && (Gt = e);
  }
  function Kc(e) {
    R(Ge, Ge.current), R(Nt, e), Gt === null && (Gt = e);
  }
  function Qr(e) {
    e.tag === 22 ? (R(Ge, Ge.current), R(Nt, e), Gt === null && (Gt = e)) : Zn();
  }
  function Zn() {
    R(Ge, Ge.current), R(Nt, Nt.current);
  }
  function Mt(e) {
    j(Nt), Gt === e && (Gt = null), j(Ge);
  }
  var Ge = p(0);
  function Qu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || es(n) || ts(n)))
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
  var hn = 0, ne = null, Ee = null, Ke = null, Vu = !1, Fl = !1, gl = !1, Ku = 0, Va = 0, Il = null, Zv = 0;
  function Be() {
    throw Error(s(321));
  }
  function $c(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!At(e[n], t[n])) return !1;
    return !0;
  }
  function Jc(e, t, n, l, u, c) {
    return hn = c, ne = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Mf : ro, gl = !1, c = n(l, u), gl = !1, Fl && (c = Kr(
      t,
      n,
      l,
      u
    )), Vr(e), c;
  }
  function Vr(e) {
    O.H = Ja;
    var t = Ee !== null && Ee.next !== null;
    if (hn = 0, Ke = Ee = ne = null, Vu = !1, Va = 0, Il = null, t) throw Error(s(300));
    e === null || $e || (e = e.dependencies, e !== null && Hu(e) && ($e = !0));
  }
  function Kr(e, t, n, l) {
    ne = e;
    var u = 0;
    do {
      if (Fl && (Il = null), Va = 0, Fl = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Ke = Ee = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      O.H = jf, c = t(n, l);
    } while (Fl);
    return c;
  }
  function Rv() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ka(t) : t, e = e.useState()[0], (Ee !== null ? Ee.memoizedState : null) !== e && (ne.flags |= 1024), t;
  }
  function Wc() {
    var e = Ku !== 0;
    return Ku = 0, e;
  }
  function Fc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Ic(e) {
    if (Vu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Vu = !1;
    }
    hn = 0, Ke = Ee = ne = null, Fl = !1, Va = Ku = 0, Il = null;
  }
  function ht() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ke === null ? ne.memoizedState = Ke = e : Ke = Ke.next = e, Ke;
  }
  function Le() {
    if (Ee === null) {
      var e = ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ee.next;
    var t = Ke === null ? ne.memoizedState : Ke.next;
    if (t !== null)
      Ke = t, Ee = e;
    else {
      if (e === null)
        throw ne.alternate === null ? Error(s(467)) : Error(s(310));
      Ee = e, e = {
        memoizedState: Ee.memoizedState,
        baseState: Ee.baseState,
        baseQueue: Ee.baseQueue,
        queue: Ee.queue,
        next: null
      }, Ke === null ? ne.memoizedState = Ke = e : Ke = Ke.next = e;
    }
    return Ke;
  }
  function $u() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ka(e) {
    var t = Va;
    return Va += 1, Il === null && (Il = []), e = Hr(Il, e, t), t = ne, (Ke === null ? t.memoizedState : Ke.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Mf : ro), e;
  }
  function Ju(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ka(e);
      if (e.$$typeof === F) return ut(e);
    }
    throw Error(s(438, String(e)));
  }
  function Pc(e) {
    var t = null, n = ne.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = ne.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = $u(), ne.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = Wt;
    return t.index++, n;
  }
  function mn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Wu(e) {
    var t = Le();
    return eo(t, Ee, e);
  }
  function eo(e, t, n) {
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
      var d = r = null, y = null, z = t, N = !1;
      do {
        var C = z.lane & -536870913;
        if (C !== z.lane ? (fe & C) === C : (hn & C) === C) {
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
            }), C === Vl && (N = !0);
          else if ((hn & E) === E) {
            z = z.next, E === Vl && (N = !0);
            continue;
          } else
            C = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, y === null ? (d = y = C, r = c) : y = y.next = C, ne.lanes |= E, qn |= E;
          C = z.action, gl && n(c, C), c = z.hasEagerState ? z.eagerState : n(c, C);
        } else
          E = {
            lane: C,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, y === null ? (d = y = E, r = c) : y = y.next = E, ne.lanes |= C, qn |= C;
        z = z.next;
      } while (z !== null && z !== t);
      if (y === null ? r = c : y.next = d, !At(c, e.memoizedState) && ($e = !0, N && (n = Kl, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = r, e.baseQueue = y, l.lastRenderedState = c;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function to(e) {
    var t = Le(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, u = n.pending, c = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var r = u = u.next;
      do
        c = e(c, r.action), r = r.next;
      while (r !== u);
      At(c, t.memoizedState) || ($e = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, l];
  }
  function $r(e, t, n) {
    var l = ne, u = Le(), c = me;
    if (c) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else n = t();
    var r = !At(
      (Ee || u).memoizedState,
      n
    );
    if (r && (u.memoizedState = n, $e = !0), u = u.queue, ao(Fr.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || r || Ke !== null && Ke.memoizedState.tag & 1) {
      if (l.flags |= 2048, Pl(
        9,
        { destroy: void 0 },
        Wr.bind(
          null,
          l,
          u,
          n,
          t
        ),
        null
      ), Ne === null) throw Error(s(349));
      c || (hn & 127) !== 0 || Jr(l, t, n);
    }
    return n;
  }
  function Jr(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ne.updateQueue, t === null ? (t = $u(), ne.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Wr(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Ir(t) && Pr(e);
  }
  function Fr(e, t, n) {
    return n(function() {
      Ir(t) && Pr(e);
    });
  }
  function Ir(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !At(e, n);
    } catch {
      return !0;
    }
  }
  function Pr(e) {
    var t = ol(e, 2);
    t !== null && zt(t, e, 2);
  }
  function no(e) {
    var t = ht();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), gl) {
        Vt(!0);
        try {
          n();
        } finally {
          Vt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mn,
      lastRenderedState: e
    }, t;
  }
  function ef(e, t, n, l) {
    return e.baseState = n, eo(
      e,
      Ee,
      typeof l == "function" ? l : mn
    );
  }
  function Hv(e, t, n, l, u) {
    if (Pu(e)) throw Error(s(485));
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
      O.T !== null ? n(!0) : c.isTransition = !1, l(c), n = t.pending, n === null ? (c.next = t.pending = c, tf(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function tf(e, t) {
    var n = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var c = O.T, r = {};
      O.T = r;
      try {
        var d = n(u, l), y = O.S;
        y !== null && y(r, d), nf(e, t, d);
      } catch (z) {
        lo(e, t, z);
      } finally {
        c !== null && r.types !== null && (c.types = r.types), O.T = c;
      }
    } else
      try {
        c = n(u, l), nf(e, t, c);
      } catch (z) {
        lo(e, t, z);
      }
  }
  function nf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        lf(e, t, l);
      },
      function(l) {
        return lo(e, t, l);
      }
    ) : lf(e, t, n);
  }
  function lf(e, t, n) {
    t.status = "fulfilled", t.value = n, af(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, tf(e, n)));
  }
  function lo(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, af(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function af(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function uf(e, t) {
    return t;
  }
  function cf(e, t) {
    if (me) {
      var n = Ne.formState;
      if (n !== null) {
        e: {
          var l = ne;
          if (me) {
            if (De) {
              t: {
                for (var u = De, c = kt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (u = Lt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                De = Lt(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            Mn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = ht(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: uf,
      lastRenderedState: t
    }, n.queue = l, n = Af.bind(
      null,
      ne,
      l
    ), l.dispatch = n, l = no(!1), c = so.bind(
      null,
      ne,
      !1,
      l.queue
    ), l = ht(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, n = Hv.bind(
      null,
      ne,
      u,
      c,
      n
    ), u.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function of(e) {
    var t = Le();
    return sf(t, Ee, e);
  }
  function sf(e, t, n) {
    if (t = eo(
      e,
      t,
      uf
    )[0], e = Wu(mn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Ka(t);
      } catch (r) {
        throw r === $l ? Yu : r;
      }
    else l = t;
    t = Le();
    var u = t.queue, c = u.dispatch;
    return n !== t.memoizedState && (ne.flags |= 2048, Pl(
      9,
      { destroy: void 0 },
      qv.bind(null, u, n),
      null
    )), [l, c, e];
  }
  function qv(e, t) {
    e.action = t;
  }
  function rf(e) {
    var t = Le(), n = Ee;
    if (n !== null)
      return sf(t, n, e);
    Le(), t = t.memoizedState, n = Le();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Pl(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = ne.updateQueue, t === null && (t = $u(), ne.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function ff() {
    return Le().memoizedState;
  }
  function Fu(e, t, n, l) {
    var u = ht();
    ne.flags |= e, u.memoizedState = Pl(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Iu(e, t, n, l) {
    var u = Le();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    Ee !== null && l !== null && $c(l, Ee.memoizedState.deps) ? u.memoizedState = Pl(t, c, n, l) : (ne.flags |= e, u.memoizedState = Pl(
      1 | t,
      c,
      n,
      l
    ));
  }
  function df(e, t) {
    Fu(8390656, 8, e, t);
  }
  function ao(e, t) {
    Iu(2048, 8, e, t);
  }
  function Bv(e) {
    ne.flags |= 4;
    var t = ne.updateQueue;
    if (t === null)
      t = $u(), ne.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function hf(e) {
    var t = Le().memoizedState;
    return Bv({ ref: t, nextImpl: e }), function() {
      if ((pe & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function mf(e, t) {
    return Iu(4, 2, e, t);
  }
  function vf(e, t) {
    return Iu(4, 4, e, t);
  }
  function yf(e, t) {
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
  function gf(e, t, n) {
    n = n != null ? n.concat([e]) : null, Iu(4, 4, yf.bind(null, t, e), n);
  }
  function uo() {
  }
  function pf(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && $c(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function bf(e, t) {
    var n = Le();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && $c(t, l[1]))
      return l[0];
    if (l = e(), gl) {
      Vt(!0);
      try {
        e();
      } finally {
        Vt(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function io(e, t, n) {
    return n === void 0 || (hn & 1073741824) !== 0 && (fe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = _d(), ne.lanes |= e, qn |= e, n);
  }
  function _f(e, t, n, l) {
    return At(n, t) ? n : Wl.current !== null ? (e = io(e, n, l), At(e, t) || ($e = !0), e) : (hn & 42) === 0 || (hn & 1073741824) !== 0 && (fe & 261930) === 0 ? ($e = !0, e.memoizedState = n) : (e = _d(), ne.lanes |= e, qn |= e, t);
  }
  function Sf(e, t, n, l, u) {
    var c = H.p;
    H.p = c !== 0 && 8 > c ? c : 8;
    var r = O.T, d = {};
    O.T = d, so(e, !1, t, n);
    try {
      var y = u(), z = O.S;
      if (z !== null && z(d, y), y !== null && typeof y == "object" && typeof y.then == "function") {
        var N = Uv(
          y,
          l
        );
        $a(
          e,
          t,
          N,
          Dt(e)
        );
      } else
        $a(
          e,
          t,
          l,
          Dt(e)
        );
    } catch (C) {
      $a(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: C },
        Dt()
      );
    } finally {
      H.p = c, r !== null && d.types !== null && (r.types = d.types), O.T = r;
    }
  }
  function Yv() {
  }
  function co(e, t, n, l) {
    if (e.tag !== 5) throw Error(s(476));
    var u = zf(e).queue;
    Sf(
      e,
      u,
      t,
      X,
      n === null ? Yv : function() {
        return xf(e), n(l);
      }
    );
  }
  function zf(e) {
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
        lastRenderedReducer: mn,
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
        lastRenderedReducer: mn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function xf(e) {
    var t = zf(e);
    t.next === null && (t = e.alternate.memoizedState), $a(
      e,
      t.next.queue,
      {},
      Dt()
    );
  }
  function oo() {
    return ut(fu);
  }
  function Ef() {
    return Le().memoizedState;
  }
  function Tf() {
    return Le().memoizedState;
  }
  function kv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Dt();
          e = Dn(n);
          var l = wn(t, e, n);
          l !== null && (zt(l, t, n), La(l, t, n)), t = { cache: Hc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Gv(e, t, n) {
    var l = Dt();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Pu(e) ? Of(t, n) : (n = Ac(e, t, n, l), n !== null && (zt(n, e, l), Nf(n, t, l)));
  }
  function Af(e, t, n) {
    var l = Dt();
    $a(e, t, n, l);
  }
  function $a(e, t, n, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Pu(e)) Of(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var r = t.lastRenderedState, d = c(r, n);
          if (u.hasEagerState = !0, u.eagerState = d, At(d, r))
            return wu(e, t, u, 0), Ne === null && Du(), !1;
        } catch {
        }
      if (n = Ac(e, t, u, l), n !== null)
        return zt(n, e, l), Nf(n, t, l), !0;
    }
    return !1;
  }
  function so(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: Go(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Pu(e)) {
      if (t) throw Error(s(479));
    } else
      t = Ac(
        e,
        n,
        l,
        2
      ), t !== null && zt(t, e, 2);
  }
  function Pu(e) {
    var t = e.alternate;
    return e === ne || t !== null && t === ne;
  }
  function Of(e, t) {
    Fl = Vu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Nf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, _u(e, n);
    }
  }
  var Ja = {
    readContext: ut,
    use: Ju,
    useCallback: Be,
    useContext: Be,
    useEffect: Be,
    useImperativeHandle: Be,
    useLayoutEffect: Be,
    useInsertionEffect: Be,
    useMemo: Be,
    useReducer: Be,
    useRef: Be,
    useState: Be,
    useDebugValue: Be,
    useDeferredValue: Be,
    useTransition: Be,
    useSyncExternalStore: Be,
    useId: Be,
    useHostTransitionStatus: Be,
    useFormState: Be,
    useActionState: Be,
    useOptimistic: Be,
    useMemoCache: Be,
    useCacheRefresh: Be
  };
  Ja.useEffectEvent = Be;
  var Mf = {
    readContext: ut,
    use: Ju,
    useCallback: function(e, t) {
      return ht().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: ut,
    useEffect: df,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Fu(
        4194308,
        4,
        yf.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Fu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Fu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = ht();
      t = t === void 0 ? null : t;
      var l = e();
      if (gl) {
        Vt(!0);
        try {
          e();
        } finally {
          Vt(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = ht();
      if (n !== void 0) {
        var u = n(t);
        if (gl) {
          Vt(!0);
          try {
            n(t);
          } finally {
            Vt(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = Gv.bind(
        null,
        ne,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = ht();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = no(e);
      var t = e.queue, n = Af.bind(null, ne, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: uo,
    useDeferredValue: function(e, t) {
      var n = ht();
      return io(n, e, t);
    },
    useTransition: function() {
      var e = no(!1);
      return e = Sf.bind(
        null,
        ne,
        e.queue,
        !0,
        !1
      ), ht().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = ne, u = ht();
      if (me) {
        if (n === void 0)
          throw Error(s(407));
        n = n();
      } else {
        if (n = t(), Ne === null)
          throw Error(s(349));
        (fe & 127) !== 0 || Jr(l, t, n);
      }
      u.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return u.queue = c, df(Fr.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, Pl(
        9,
        { destroy: void 0 },
        Wr.bind(
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
      var e = ht(), t = Ne.identifierPrefix;
      if (me) {
        var n = tn, l = en;
        n = (l & ~(1 << 32 - ft(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ku++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Zv++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: oo,
    useFormState: cf,
    useActionState: cf,
    useOptimistic: function(e) {
      var t = ht();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = so.bind(
        null,
        ne,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Pc,
    useCacheRefresh: function() {
      return ht().memoizedState = kv.bind(
        null,
        ne
      );
    },
    useEffectEvent: function(e) {
      var t = ht(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((pe & 2) !== 0)
          throw Error(s(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, ro = {
    readContext: ut,
    use: Ju,
    useCallback: pf,
    useContext: ut,
    useEffect: ao,
    useImperativeHandle: gf,
    useInsertionEffect: mf,
    useLayoutEffect: vf,
    useMemo: bf,
    useReducer: Wu,
    useRef: ff,
    useState: function() {
      return Wu(mn);
    },
    useDebugValue: uo,
    useDeferredValue: function(e, t) {
      var n = Le();
      return _f(
        n,
        Ee.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Wu(mn)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : Ka(e),
        t
      ];
    },
    useSyncExternalStore: $r,
    useId: Ef,
    useHostTransitionStatus: oo,
    useFormState: of,
    useActionState: of,
    useOptimistic: function(e, t) {
      var n = Le();
      return ef(n, Ee, e, t);
    },
    useMemoCache: Pc,
    useCacheRefresh: Tf
  };
  ro.useEffectEvent = hf;
  var jf = {
    readContext: ut,
    use: Ju,
    useCallback: pf,
    useContext: ut,
    useEffect: ao,
    useImperativeHandle: gf,
    useInsertionEffect: mf,
    useLayoutEffect: vf,
    useMemo: bf,
    useReducer: to,
    useRef: ff,
    useState: function() {
      return to(mn);
    },
    useDebugValue: uo,
    useDeferredValue: function(e, t) {
      var n = Le();
      return Ee === null ? io(n, e, t) : _f(
        n,
        Ee.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = to(mn)[0], t = Le().memoizedState;
      return [
        typeof e == "boolean" ? e : Ka(e),
        t
      ];
    },
    useSyncExternalStore: $r,
    useId: Ef,
    useHostTransitionStatus: oo,
    useFormState: rf,
    useActionState: rf,
    useOptimistic: function(e, t) {
      var n = Le();
      return Ee !== null ? ef(n, Ee, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Pc,
    useCacheRefresh: Tf
  };
  jf.useEffectEvent = hf;
  function fo(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : U({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var ho = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = Dt(), u = Dn(l);
      u.payload = t, n != null && (u.callback = n), t = wn(e, u, l), t !== null && (zt(t, e, l), La(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = Dt(), u = Dn(l);
      u.tag = 1, u.payload = t, n != null && (u.callback = n), t = wn(e, u, l), t !== null && (zt(t, e, l), La(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Dt(), l = Dn(n);
      l.tag = 2, t != null && (l.callback = t), t = wn(e, l, n), t !== null && (zt(t, e, n), La(t, e, n));
    }
  };
  function Cf(e, t, n, l, u, c, r) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, r) : t.prototype && t.prototype.isPureReactComponent ? !Za(n, l) || !Za(u, c) : !0;
  }
  function Df(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && ho.enqueueReplaceState(t, t.state, null);
  }
  function pl(e, t) {
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
  function wf(e) {
    Cu(e);
  }
  function Uf(e) {
    console.error(e);
  }
  function Zf(e) {
    Cu(e);
  }
  function ei(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Rf(e, t, n) {
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
  function mo(e, t, n) {
    return n = Dn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ei(e, t);
    }, n;
  }
  function Hf(e) {
    return e = Dn(e), e.tag = 3, e;
  }
  function qf(e, t, n, l) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        Rf(t, n, l);
      };
    }
    var r = n.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (e.callback = function() {
      Rf(t, n, l), typeof u != "function" && (Bn === null ? Bn = /* @__PURE__ */ new Set([this]) : Bn.add(this));
      var d = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function Lv(e, t, n, l, u) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && Ql(
        t,
        n,
        u,
        !0
      ), n = Nt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Gt === null ? di() : n.alternate === null && Ye === 0 && (Ye = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, l === ku ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), Bo(e, l, u)), !1;
          case 22:
            return n.flags |= 65536, l === ku ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Bo(e, l, u)), !1;
        }
        throw Error(s(435, n.tag));
      }
      return Bo(e, l, u), di(), !1;
    }
    if (me)
      return t = Nt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== Dc && (e = Error(s(422), { cause: l }), qa(qt(e, n)))) : (l !== Dc && (t = Error(s(423), {
        cause: l
      }), qa(
        qt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = qt(l, n), u = mo(
        e.stateNode,
        l,
        u
      ), Lc(e, u), Ye !== 4 && (Ye = 2)), !1;
    var c = Error(s(520), { cause: l });
    if (c = qt(c, n), lu === null ? lu = [c] : lu.push(c), Ye !== 4 && (Ye = 2), t === null) return !0;
    l = qt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = u & -u, n.lanes |= e, e = mo(n.stateNode, l, e), Lc(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Bn === null || !Bn.has(c))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = Hf(u), qf(
              u,
              e,
              n,
              l
            ), Lc(n, u), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var vo = Error(s(461)), $e = !1;
  function it(e, t, n, l) {
    t.child = e === null ? kr(t, null, n, l) : yl(
      t,
      e.child,
      n,
      l
    );
  }
  function Bf(e, t, n, l, u) {
    n = n.render;
    var c = t.ref;
    if ("ref" in l) {
      var r = {};
      for (var d in l)
        d !== "ref" && (r[d] = l[d]);
    } else r = l;
    return dl(t), l = Jc(
      e,
      t,
      n,
      r,
      c,
      u
    ), d = Wc(), e !== null && !$e ? (Fc(e, t, u), vn(e, t, u)) : (me && d && jc(t), t.flags |= 1, it(e, t, l, u), t.child);
  }
  function Yf(e, t, n, l, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !Oc(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, kf(
        e,
        t,
        c,
        l,
        u
      )) : (e = Zu(
        n.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !xo(e, u)) {
      var r = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Za, n(r, l) && e.ref === t.ref)
        return vn(e, t, u);
    }
    return t.flags |= 1, e = sn(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function kf(e, t, n, l, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Za(c, l) && e.ref === t.ref)
        if ($e = !1, t.pendingProps = l = c, xo(e, u))
          (e.flags & 131072) !== 0 && ($e = !0);
        else
          return t.lanes = e.lanes, vn(e, t, u);
    }
    return yo(
      e,
      t,
      n,
      l,
      u
    );
  }
  function Gf(e, t, n, l) {
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
        return Lf(
          e,
          t,
          c,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Bu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Xr(t, c) : Qc(), Qr(t);
      else
        return l = t.lanes = 536870912, Lf(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          l
        );
    } else
      c !== null ? (Bu(t, c.cachePool), Xr(t, c), Zn(), t.memoizedState = null) : (e !== null && Bu(t, null), Qc(), Zn());
    return it(e, t, u, n), t.child;
  }
  function Wa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Lf(e, t, n, l, u) {
    var c = Bc();
    return c = c === null ? null : { parent: Ve._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && Bu(t, null), Qc(), Qr(t), e !== null && Ql(e, t, l, !0), t.childLanes = u, null;
  }
  function ti(e, t) {
    return t = li(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Xf(e, t, n) {
    return yl(t, e.child, null, n), e = ti(t, t.pendingProps), e.flags |= 2, Mt(t), t.memoizedState = null, e;
  }
  function Xv(e, t, n) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (me) {
        if (l.mode === "hidden")
          return e = ti(t, l), t.lanes = 536870912, Wa(null, e);
        if (Kc(t), (e = De) ? (e = nh(
          e,
          kt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: On !== null ? { id: en, overflow: tn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Ar(e), n.return = t, t.child = n, at = t, De = null)) : e = null, e === null) throw Mn(t);
        return t.lanes = 536870912, null;
      }
      return ti(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var r = c.dehydrated;
      if (Kc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Xf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if ($e || Ql(e, t, n, !1), u = (n & e.childLanes) !== 0, $e || u) {
        if (l = Ne, l !== null && (r = Ol(l, n), r !== 0 && r !== c.retryLane))
          throw c.retryLane = r, ol(e, r), zt(l, e, r), vo;
        di(), t = Xf(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, De = Lt(r.nextSibling), at = t, me = !0, Nn = null, kt = !1, e !== null && Mr(t, e), t = ti(t, l), t.flags |= 4096;
      return t;
    }
    return e = sn(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ni(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function yo(e, t, n, l, u) {
    return dl(t), n = Jc(
      e,
      t,
      n,
      l,
      void 0,
      u
    ), l = Wc(), e !== null && !$e ? (Fc(e, t, u), vn(e, t, u)) : (me && l && jc(t), t.flags |= 1, it(e, t, n, u), t.child);
  }
  function Qf(e, t, n, l, u, c) {
    return dl(t), t.updateQueue = null, n = Kr(
      t,
      l,
      n,
      u
    ), Vr(e), l = Wc(), e !== null && !$e ? (Fc(e, t, c), vn(e, t, c)) : (me && l && jc(t), t.flags |= 1, it(e, t, n, c), t.child);
  }
  function Vf(e, t, n, l, u) {
    if (dl(t), t.stateNode === null) {
      var c = kl, r = n.contextType;
      typeof r == "object" && r !== null && (c = ut(r)), c = new n(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = ho, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, kc(t), r = n.contextType, c.context = typeof r == "object" && r !== null ? ut(r) : kl, c.state = t.memoizedState, r = n.getDerivedStateFromProps, typeof r == "function" && (fo(
        t,
        n,
        r,
        l
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && ho.enqueueReplaceState(c, c.state, null), Qa(t, l, c, u), Xa(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var d = t.memoizedProps, y = pl(n, d);
      c.props = y;
      var z = c.context, N = n.contextType;
      r = kl, typeof N == "object" && N !== null && (r = ut(N));
      var C = n.getDerivedStateFromProps;
      N = typeof C == "function" || typeof c.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, N || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (d || z !== r) && Df(
        t,
        c,
        l,
        r
      ), Cn = !1;
      var E = t.memoizedState;
      c.state = E, Qa(t, l, c, u), Xa(), z = t.memoizedState, d || E !== z || Cn ? (typeof C == "function" && (fo(
        t,
        n,
        C,
        l
      ), z = t.memoizedState), (y = Cn || Cf(
        t,
        n,
        y,
        l,
        E,
        z,
        r
      )) ? (N || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = z), c.props = l, c.state = z, c.context = r, l = y) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, Gc(e, t), r = t.memoizedProps, N = pl(n, r), c.props = N, C = t.pendingProps, E = c.context, z = n.contextType, y = kl, typeof z == "object" && z !== null && (y = ut(z)), d = n.getDerivedStateFromProps, (z = typeof d == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (r !== C || E !== y) && Df(
        t,
        c,
        l,
        y
      ), Cn = !1, E = t.memoizedState, c.state = E, Qa(t, l, c, u), Xa();
      var A = t.memoizedState;
      r !== C || E !== A || Cn || e !== null && e.dependencies !== null && Hu(e.dependencies) ? (typeof d == "function" && (fo(
        t,
        n,
        d,
        l
      ), A = t.memoizedState), (N = Cn || Cf(
        t,
        n,
        N,
        l,
        E,
        A,
        y
      ) || e !== null && e.dependencies !== null && Hu(e.dependencies)) ? (z || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, A, y), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        A,
        y
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = A), c.props = l, c.state = A, c.context = y, l = N) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, ni(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = yl(
      t,
      e.child,
      null,
      u
    ), t.child = yl(
      t,
      null,
      n,
      u
    )) : it(e, t, n, u), t.memoizedState = c.state, e = t.child) : e = vn(
      e,
      t,
      u
    ), e;
  }
  function Kf(e, t, n, l) {
    return rl(), t.flags |= 256, it(e, t, n, l), t.child;
  }
  var go = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function po(e) {
    return { baseLanes: e, cachePool: Zr() };
  }
  function bo(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Ct), e;
  }
  function $f(e, t, n) {
    var l = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, r;
    if ((r = c) || (r = e !== null && e.memoizedState === null ? !1 : (Ge.current & 2) !== 0), r && (u = !0, t.flags &= -129), r = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (me) {
        if (u ? Un(t) : Zn(), (e = De) ? (e = nh(
          e,
          kt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: On !== null ? { id: en, overflow: tn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Ar(e), n.return = t, t.child = n, at = t, De = null)) : e = null, e === null) throw Mn(t);
        return ts(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = l.children;
      return l = l.fallback, u ? (Zn(), u = t.mode, d = li(
        { mode: "hidden", children: d },
        u
      ), l = sl(
        l,
        u,
        n,
        null
      ), d.return = t, l.return = t, d.sibling = l, t.child = d, l = t.child, l.memoizedState = po(n), l.childLanes = bo(
        e,
        r,
        n
      ), t.memoizedState = go, Wa(null, l)) : (Un(t), _o(t, d));
    }
    var y = e.memoizedState;
    if (y !== null && (d = y.dehydrated, d !== null)) {
      if (c)
        t.flags & 256 ? (Un(t), t.flags &= -257, t = So(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Zn(), t.child = e.child, t.flags |= 128, t = null) : (Zn(), d = l.fallback, u = t.mode, l = li(
          { mode: "visible", children: l.children },
          u
        ), d = sl(
          d,
          u,
          n,
          null
        ), d.flags |= 2, l.return = t, d.return = t, l.sibling = d, t.child = l, yl(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = po(n), l.childLanes = bo(
          e,
          r,
          n
        ), t.memoizedState = go, t = Wa(null, l));
      else if (Un(t), ts(d)) {
        if (r = d.nextSibling && d.nextSibling.dataset, r) var z = r.dgst;
        r = z, l = Error(s(419)), l.stack = "", l.digest = r, qa({ value: l, source: null, stack: null }), t = So(
          e,
          t,
          n
        );
      } else if ($e || Ql(e, t, n, !1), r = (n & e.childLanes) !== 0, $e || r) {
        if (r = Ne, r !== null && (l = Ol(r, n), l !== 0 && l !== y.retryLane))
          throw y.retryLane = l, ol(e, l), zt(r, e, l), vo;
        es(d) || di(), t = So(
          e,
          t,
          n
        );
      } else
        es(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = y.treeContext, De = Lt(
          d.nextSibling
        ), at = t, me = !0, Nn = null, kt = !1, e !== null && Mr(t, e), t = _o(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Zn(), d = l.fallback, u = t.mode, y = e.child, z = y.sibling, l = sn(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 65011712, z !== null ? d = sn(
      z,
      d
    ) : (d = sl(
      d,
      u,
      n,
      null
    ), d.flags |= 2), d.return = t, l.return = t, l.sibling = d, t.child = l, Wa(null, l), l = t.child, d = e.child.memoizedState, d === null ? d = po(n) : (u = d.cachePool, u !== null ? (y = Ve._currentValue, u = u.parent !== y ? { parent: y, pool: y } : u) : u = Zr(), d = {
      baseLanes: d.baseLanes | n,
      cachePool: u
    }), l.memoizedState = d, l.childLanes = bo(
      e,
      r,
      n
    ), t.memoizedState = go, Wa(e.child, l)) : (Un(t), n = e.child, e = n.sibling, n = sn(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function _o(e, t) {
    return t = li(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function li(e, t) {
    return e = Ot(22, e, null, t), e.lanes = 0, e;
  }
  function So(e, t, n) {
    return yl(t, e.child, null, n), e = _o(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Jf(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), Zc(e.return, t, n);
  }
  function zo(e, t, n, l, u, c) {
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
  function Wf(e, t, n) {
    var l = t.pendingProps, u = l.revealOrder, c = l.tail;
    l = l.children;
    var r = Ge.current, d = (r & 2) !== 0;
    if (d ? (r = r & 1 | 2, t.flags |= 128) : r &= 1, R(Ge, r), it(e, t, l, n), l = me ? Ha : 0, !d && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Jf(e, n, t);
        else if (e.tag === 19)
          Jf(e, n, t);
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
          e = n.alternate, e !== null && Qu(e) === null && (u = n), n = n.sibling;
        n = u, n === null ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null), zo(
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
          if (e = u.alternate, e !== null && Qu(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = n, n = u, u = e;
        }
        zo(
          t,
          !0,
          n,
          null,
          c,
          l
        );
        break;
      case "together":
        zo(
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
  function vn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), qn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ql(
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
      for (e = t.child, n = sn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = sn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function xo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Hu(e)));
  }
  function Qv(e, t, n) {
    switch (t.tag) {
      case 3:
        ze(t, t.stateNode.containerInfo), jn(t, Ve, e.memoizedState.cache), rl();
        break;
      case 27:
      case 5:
        It(t);
        break;
      case 4:
        ze(t, t.stateNode.containerInfo);
        break;
      case 10:
        jn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Kc(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Un(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? $f(e, t, n) : (Un(t), e = vn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Un(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (Ql(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), u) {
          if (l)
            return Wf(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), R(Ge, Ge.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Gf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        jn(t, Ve, e.memoizedState.cache);
    }
    return vn(e, t, n);
  }
  function Ff(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        $e = !0;
      else {
        if (!xo(e, n) && (t.flags & 128) === 0)
          return $e = !1, Qv(
            e,
            t,
            n
          );
        $e = (e.flags & 131072) !== 0;
      }
    else
      $e = !1, me && (t.flags & 1048576) !== 0 && Nr(t, Ha, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = ml(t.elementType), t.type = e, typeof e == "function")
            Oc(e) ? (l = pl(e, l), t.tag = 1, t = Vf(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = yo(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === I) {
                t.tag = 11, t = Bf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (u === le) {
                t.tag = 14, t = Yf(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = Et(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return yo(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, u = pl(
          l,
          t.pendingProps
        ), Vf(
          e,
          t,
          l,
          u,
          n
        );
      case 3:
        e: {
          if (ze(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          l = t.pendingProps;
          var c = t.memoizedState;
          u = c.element, Gc(e, t), Qa(t, l, null, n);
          var r = t.memoizedState;
          if (l = r.cache, jn(t, Ve, l), l !== c.cache && Rc(
            t,
            [Ve],
            n,
            !0
          ), Xa(), l = r.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: r.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Kf(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== u) {
              u = qt(
                Error(s(424)),
                t
              ), qa(u), t = Kf(
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
              for (De = Lt(e.firstChild), at = t, me = !0, Nn = null, kt = !0, n = kr(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (rl(), l === u) {
              t = vn(
                e,
                t,
                n
              );
              break e;
            }
            it(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ni(e, t), e === null ? (n = oh(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : me || (n = t.type, e = t.pendingProps, l = bi(
          ue.current
        ).createElement(n), l[lt] = t, l[yt] = e, ct(l, n, e), et(l), t.stateNode = l) : t.memoizedState = oh(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return It(t), e === null && me && (l = t.stateNode = uh(
          t.type,
          t.pendingProps,
          ue.current
        ), at = t, kt = !0, u = De, Ln(t.type) ? (ns = u, De = Lt(l.firstChild)) : De = u), it(
          e,
          t,
          t.pendingProps.children,
          n
        ), ni(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && me && ((u = l = De) && (l = S0(
          l,
          t.type,
          t.pendingProps,
          kt
        ), l !== null ? (t.stateNode = l, at = t, De = Lt(l.firstChild), kt = !1, u = !0) : u = !1), u || Mn(t)), It(t), u = t.type, c = t.pendingProps, r = e !== null ? e.memoizedProps : null, l = c.children, Fo(u, c) ? l = null : r !== null && Fo(u, r) && (t.flags |= 32), t.memoizedState !== null && (u = Jc(
          e,
          t,
          Rv,
          null,
          null,
          n
        ), fu._currentValue = u), ni(e, t), it(e, t, l, n), t.child;
      case 6:
        return e === null && me && ((e = n = De) && (n = z0(
          n,
          t.pendingProps,
          kt
        ), n !== null ? (t.stateNode = n, at = t, De = null, e = !0) : e = !1), e || Mn(t)), null;
      case 13:
        return $f(e, t, n);
      case 4:
        return ze(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = yl(
          t,
          null,
          l,
          n
        ) : it(e, t, l, n), t.child;
      case 11:
        return Bf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return it(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return it(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return it(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, jn(t, t.type, l.value), it(e, t, l.children, n), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, dl(t), u = ut(u), l = l(u), t.flags |= 1, it(e, t, l, n), t.child;
      case 14:
        return Yf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return kf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Wf(e, t, n);
      case 31:
        return Xv(e, t, n);
      case 22:
        return Gf(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return dl(t), l = ut(Ve), e === null ? (u = Bc(), u === null && (u = Ne, c = Hc(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= n), u = c), t.memoizedState = { parent: l, cache: u }, kc(t), jn(t, Ve, u)) : ((e.lanes & n) !== 0 && (Gc(e, t), Qa(t, null, null, n), Xa()), u = e.memoizedState, c = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), jn(t, Ve, l)) : (l = c.cache, jn(t, Ve, l), l !== u.cache && Rc(
          t,
          [Ve],
          n,
          !0
        ))), it(
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
  function yn(e) {
    e.flags |= 4;
  }
  function Eo(e, t, n, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Ed()) e.flags |= 8192;
        else
          throw vl = ku, Yc;
    } else e.flags &= -16777217;
  }
  function If(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !hh(t))
      if (Ed()) e.flags |= 8192;
      else
        throw vl = ku, Yc;
  }
  function ai(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ie() : 536870912, e.lanes |= t, la |= t);
  }
  function Fa(e, t) {
    if (!me)
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
  function we(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function Vv(e, t, n) {
    var l = t.pendingProps;
    switch (Cc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return we(t), null;
      case 1:
        return we(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), dn(Ve), xe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Xl(t) ? yn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, wc())), we(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (yn(t), c !== null ? (we(t), If(t, c)) : (we(t), Eo(
          t,
          u,
          null,
          l,
          n
        ))) : c ? c !== e.memoizedState ? (yn(t), we(t), If(t, c)) : (we(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && yn(t), we(t), Eo(
          t,
          u,
          e,
          l,
          n
        )), null;
      case 27:
        if (an(t), n = ue.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && yn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return we(t), null;
          }
          e = w.current, Xl(t) ? jr(t) : (e = uh(u, l, n), t.stateNode = e, yn(t));
        }
        return we(t), null;
      case 5:
        if (an(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && yn(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(s(166));
            return we(t), null;
          }
          if (c = w.current, Xl(t))
            jr(t);
          else {
            var r = bi(
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
            c[lt] = t, c[yt] = l;
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
            e: switch (ct(c, u, l), u) {
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
            l && yn(t);
          }
        }
        return we(t), Eo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && yn(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = ue.current, Xl(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, u = at, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || $d(e.nodeValue, n)), e || Mn(t, !0);
          } else
            e = bi(e).createTextNode(
              l
            ), e[lt] = t, t.stateNode = e;
        }
        return we(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Xl(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[lt] = t;
            } else
              rl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), e = !1;
          } else
            n = wc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Mt(t), t) : (Mt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return we(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Xl(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[lt] = t;
            } else
              rl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            we(t), u = !1;
          } else
            u = wc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Mt(t), t) : (Mt(t), null);
        }
        return Mt(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== u && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ai(t, t.updateQueue), we(t), null);
      case 4:
        return xe(), e === null && Vo(t.stateNode.containerInfo), we(t), null;
      case 10:
        return dn(t.type), we(t), null;
      case 19:
        if (j(Ge), l = t.memoizedState, l === null) return we(t), null;
        if (u = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (u) Fa(l, !1);
          else {
            if (Ye !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Qu(e), c !== null) {
                  for (t.flags |= 128, Fa(l, !1), e = c.updateQueue, t.updateQueue = e, ai(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Tr(n, e), n = n.sibling;
                  return R(
                    Ge,
                    Ge.current & 1 | 2
                  ), me && rn(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && nt() > si && (t.flags |= 128, u = !0, Fa(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Qu(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, ai(t, e), Fa(l, !0), l.tail === null && l.tailMode === "hidden" && !c.alternate && !me)
                return we(t), null;
            } else
              2 * nt() - l.renderingStartTime > si && n !== 536870912 && (t.flags |= 128, u = !0, Fa(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = nt(), e.sibling = null, n = Ge.current, R(
          Ge,
          u ? n & 1 | 2 : n & 1
        ), me && rn(t, l.treeForkCount), e) : (we(t), null);
      case 22:
      case 23:
        return Mt(t), Vc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (we(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : we(t), n = t.updateQueue, n !== null && ai(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && j(hl), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), dn(Ve), we(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Kv(e, t) {
    switch (Cc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return dn(Ve), xe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return an(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Mt(t), t.alternate === null)
            throw Error(s(340));
          rl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Mt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          rl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return j(Ge), null;
      case 4:
        return xe(), null;
      case 10:
        return dn(t.type), null;
      case 22:
      case 23:
        return Mt(t), Vc(), e !== null && j(hl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return dn(Ve), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Pf(e, t) {
    switch (Cc(t), t.tag) {
      case 3:
        dn(Ve), xe();
        break;
      case 26:
      case 27:
      case 5:
        an(t);
        break;
      case 4:
        xe();
        break;
      case 31:
        t.memoizedState !== null && Mt(t);
        break;
      case 13:
        Mt(t);
        break;
      case 19:
        j(Ge);
        break;
      case 10:
        dn(t.type);
        break;
      case 22:
      case 23:
        Mt(t), Vc(), e !== null && j(hl);
        break;
      case 24:
        dn(Ve);
    }
  }
  function Ia(e, t) {
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
      _e(t, t.return, d);
    }
  }
  function Rn(e, t, n) {
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
              } catch (N) {
                _e(
                  u,
                  y,
                  N
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (N) {
      _e(t, t.return, N);
    }
  }
  function ed(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Lr(t, n);
      } catch (l) {
        _e(e, e.return, l);
      }
    }
  }
  function td(e, t, n) {
    n.props = pl(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      _e(e, t, l);
    }
  }
  function Pa(e, t) {
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
      _e(e, t, u);
    }
  }
  function nn(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          _e(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          _e(e, t, u);
        }
      else n.current = null;
  }
  function nd(e) {
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
      _e(e, e.return, u);
    }
  }
  function To(e, t, n) {
    try {
      var l = e.stateNode;
      v0(l, e.type, n, t), l[yt] = t;
    } catch (u) {
      _e(e, e.return, u);
    }
  }
  function ld(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ln(e.type) || e.tag === 4;
  }
  function Ao(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || ld(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ln(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Oo(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = cn));
    else if (l !== 4 && (l === 27 && Ln(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Oo(e, t, n), e = e.sibling; e !== null; )
        Oo(e, t, n), e = e.sibling;
  }
  function ui(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && Ln(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (ui(e, t, n), e = e.sibling; e !== null; )
        ui(e, t, n), e = e.sibling;
  }
  function ad(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      ct(t, l, n), t[lt] = e, t[yt] = n;
    } catch (c) {
      _e(e, e.return, c);
    }
  }
  var gn = !1, Je = !1, No = !1, ud = typeof WeakSet == "function" ? WeakSet : Set, tt = null;
  function $v(e, t) {
    if (e = e.containerInfo, Jo = Ai, e = yr(e), _c(e)) {
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
            var r = 0, d = -1, y = -1, z = 0, N = 0, C = e, E = null;
            t: for (; ; ) {
              for (var A; C !== n || u !== 0 && C.nodeType !== 3 || (d = r + u), C !== c || l !== 0 && C.nodeType !== 3 || (y = r + l), C.nodeType === 3 && (r += C.nodeValue.length), (A = C.firstChild) !== null; )
                E = C, C = A;
              for (; ; ) {
                if (C === e) break t;
                if (E === n && ++z === u && (d = r), E === c && ++N === l && (y = r), (A = C.nextSibling) !== null) break;
                C = E, E = C.parentNode;
              }
              C = A;
            }
            n = d === -1 || y === -1 ? null : { start: d, end: y };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Wo = { focusedElem: e, selectionRange: n }, Ai = !1, tt = t; tt !== null; )
      if (t = tt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, tt = e;
      else
        for (; tt !== null; ) {
          switch (t = tt, c = t.alternate, e = t.flags, t.tag) {
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
                  var B = pl(
                    n.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    B,
                    c
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (J) {
                  _e(
                    n,
                    n.return,
                    J
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Po(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Po(e);
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
            e.return = t.return, tt = e;
            break;
          }
          tt = t.return;
        }
  }
  function id(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        bn(e, n), l & 4 && Ia(5, n);
        break;
      case 1:
        if (bn(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (r) {
              _e(n, n.return, r);
            }
          else {
            var u = pl(
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
              _e(
                n,
                n.return,
                r
              );
            }
          }
        l & 64 && ed(n), l & 512 && Pa(n, n.return);
        break;
      case 3:
        if (bn(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            Lr(e, t);
          } catch (r) {
            _e(n, n.return, r);
          }
        }
        break;
      case 27:
        t === null && l & 4 && ad(n);
      case 26:
      case 5:
        bn(e, n), t === null && l & 4 && nd(n), l & 512 && Pa(n, n.return);
        break;
      case 12:
        bn(e, n);
        break;
      case 31:
        bn(e, n), l & 4 && sd(e, n);
        break;
      case 13:
        bn(e, n), l & 4 && rd(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = l0.bind(
          null,
          n
        ), x0(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || gn, !l) {
          t = t !== null && t.memoizedState !== null || Je, u = gn;
          var c = Je;
          gn = l, (Je = t) && !c ? _n(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : bn(e, n), gn = u, Je = c;
        }
        break;
      case 30:
        break;
      default:
        bn(e, n);
    }
  }
  function cd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, cd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && lc(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ue = null, pt = !1;
  function pn(e, t, n) {
    for (n = n.child; n !== null; )
      od(e, t, n), n = n.sibling;
  }
  function od(e, t, n) {
    if (ot && typeof ot.onCommitFiberUnmount == "function")
      try {
        ot.onCommitFiberUnmount(el, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Je || nn(n, t), pn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Je || nn(n, t);
        var l = Ue, u = pt;
        Ln(n.type) && (Ue = n.stateNode, pt = !1), pn(
          e,
          t,
          n
        ), ou(n.stateNode), Ue = l, pt = u;
        break;
      case 5:
        Je || nn(n, t);
      case 6:
        if (l = Ue, u = pt, Ue = null, pn(
          e,
          t,
          n
        ), Ue = l, pt = u, Ue !== null)
          if (pt)
            try {
              (Ue.nodeType === 9 ? Ue.body : Ue.nodeName === "HTML" ? Ue.ownerDocument.body : Ue).removeChild(n.stateNode);
            } catch (c) {
              _e(
                n,
                t,
                c
              );
            }
          else
            try {
              Ue.removeChild(n.stateNode);
            } catch (c) {
              _e(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        Ue !== null && (pt ? (e = Ue, eh(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), fa(e)) : eh(Ue, n.stateNode));
        break;
      case 4:
        l = Ue, u = pt, Ue = n.stateNode.containerInfo, pt = !0, pn(
          e,
          t,
          n
        ), Ue = l, pt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Rn(2, n, t), Je || Rn(4, n, t), pn(
          e,
          t,
          n
        );
        break;
      case 1:
        Je || (nn(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && td(
          n,
          t,
          l
        )), pn(
          e,
          t,
          n
        );
        break;
      case 21:
        pn(
          e,
          t,
          n
        );
        break;
      case 22:
        Je = (l = Je) || n.memoizedState !== null, pn(
          e,
          t,
          n
        ), Je = l;
        break;
      default:
        pn(
          e,
          t,
          n
        );
    }
  }
  function sd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        fa(e);
      } catch (n) {
        _e(t, t.return, n);
      }
    }
  }
  function rd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        fa(e);
      } catch (n) {
        _e(t, t.return, n);
      }
  }
  function Jv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new ud()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ud()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function ii(e, t) {
    var n = Jv(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var u = a0.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function bt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var u = n[l], c = e, r = t, d = r;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (Ln(d.type)) {
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
        od(c, r, u), Ue = null, pt = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        fd(t, e), t = t.sibling;
  }
  var $t = null;
  function fd(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        bt(t, e), _t(e), l & 4 && (Rn(3, e, e.return), Ia(3, e), Rn(5, e, e.return));
        break;
      case 1:
        bt(t, e), _t(e), l & 512 && (Je || n === null || nn(n, n.return)), l & 64 && gn && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var u = $t;
        if (bt(t, e), _t(e), l & 512 && (Je || n === null || nn(n, n.return)), l & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[Aa] || c[lt] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(l), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), ct(c, l, n), c[lt] = e, et(c), l = c;
                      break e;
                    case "link":
                      var r = fh(
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
                      c = u.createElement(l), ct(c, l, n), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (r = fh(
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
                      c = u.createElement(l), ct(c, l, n), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(s(468, l));
                  }
                  c[lt] = e, et(c), l = c;
                }
                e.stateNode = l;
              } else
                dh(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = rh(
                u,
                l,
                e.memoizedProps
              );
          else
            c !== l ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, l === null ? dh(
              u,
              e.type,
              e.stateNode
            ) : rh(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && To(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        bt(t, e), _t(e), l & 512 && (Je || n === null || nn(n, n.return)), n !== null && l & 4 && To(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (bt(t, e), _t(e), l & 512 && (Je || n === null || nn(n, n.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            Ul(u, "");
          } catch (B) {
            _e(e, e.return, B);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, To(
          e,
          u,
          n !== null ? n.memoizedProps : u
        )), l & 1024 && (No = !0);
        break;
      case 6:
        if (bt(t, e), _t(e), l & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (B) {
            _e(e, e.return, B);
          }
        }
        break;
      case 3:
        if (zi = null, u = $t, $t = _i(t.containerInfo), bt(t, e), $t = u, _t(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            fa(t.containerInfo);
          } catch (B) {
            _e(e, e.return, B);
          }
        No && (No = !1, dd(e));
        break;
      case 4:
        l = $t, $t = _i(
          e.stateNode.containerInfo
        ), bt(t, e), _t(e), $t = l;
        break;
      case 12:
        bt(t, e), _t(e);
        break;
      case 31:
        bt(t, e), _t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ii(e, l)));
        break;
      case 13:
        bt(t, e), _t(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (oi = nt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ii(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var y = n !== null && n.memoizedState !== null, z = gn, N = Je;
        if (gn = z || u, Je = N || y, bt(t, e), Je = N, gn = z, _t(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (n === null || y || gn || Je || bl(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                y = n = t;
                try {
                  if (c = y.stateNode, u)
                    r = c.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    d = y.stateNode;
                    var C = y.memoizedProps.style, E = C != null && C.hasOwnProperty("display") ? C.display : null;
                    d.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (B) {
                  _e(y, y.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                y = t;
                try {
                  y.stateNode.nodeValue = u ? "" : y.memoizedProps;
                } catch (B) {
                  _e(y, y.return, B);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                y = t;
                try {
                  var A = y.stateNode;
                  u ? th(A, !0) : th(y.stateNode, !1);
                } catch (B) {
                  _e(y, y.return, B);
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
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, ii(e, n))));
        break;
      case 19:
        bt(t, e), _t(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, ii(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        bt(t, e), _t(e);
    }
  }
  function _t(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (ld(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode, c = Ao(e);
            ui(e, c, u);
            break;
          case 5:
            var r = n.stateNode;
            n.flags & 32 && (Ul(r, ""), n.flags &= -33);
            var d = Ao(e);
            ui(e, d, r);
            break;
          case 3:
          case 4:
            var y = n.stateNode.containerInfo, z = Ao(e);
            Oo(
              e,
              z,
              y
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (N) {
        _e(e, e.return, N);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function dd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        dd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function bn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        id(e, t.alternate, t), t = t.sibling;
  }
  function bl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Rn(4, t, t.return), bl(t);
          break;
        case 1:
          nn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && td(
            t,
            t.return,
            n
          ), bl(t);
          break;
        case 27:
          ou(t.stateNode);
        case 26:
        case 5:
          nn(t, t.return), bl(t);
          break;
        case 22:
          t.memoizedState === null && bl(t);
          break;
        case 30:
          bl(t);
          break;
        default:
          bl(t);
      }
      e = e.sibling;
    }
  }
  function _n(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, c = t, r = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          _n(
            u,
            c,
            n
          ), Ia(4, c);
          break;
        case 1:
          if (_n(
            u,
            c,
            n
          ), l = c, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (z) {
              _e(l, l.return, z);
            }
          if (l = c, u = l.updateQueue, u !== null) {
            var d = l.stateNode;
            try {
              var y = u.shared.hiddenCallbacks;
              if (y !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < y.length; u++)
                  Gr(y[u], d);
            } catch (z) {
              _e(l, l.return, z);
            }
          }
          n && r & 64 && ed(c), Pa(c, c.return);
          break;
        case 27:
          ad(c);
        case 26:
        case 5:
          _n(
            u,
            c,
            n
          ), n && l === null && r & 4 && nd(c), Pa(c, c.return);
          break;
        case 12:
          _n(
            u,
            c,
            n
          );
          break;
        case 31:
          _n(
            u,
            c,
            n
          ), n && r & 4 && sd(u, c);
          break;
        case 13:
          _n(
            u,
            c,
            n
          ), n && r & 4 && rd(u, c);
          break;
        case 22:
          c.memoizedState === null && _n(
            u,
            c,
            n
          ), Pa(c, c.return);
          break;
        case 30:
          break;
        default:
          _n(
            u,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Mo(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ba(n));
  }
  function jo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ba(e));
  }
  function Jt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        hd(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function hd(e, t, n, l) {
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
        ), u & 2048 && Ia(9, t);
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
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ba(e)));
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
            _e(t, t.return, y);
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
        ) : eu(e, t) : c._visibility & 2 ? Jt(
          e,
          t,
          n,
          l
        ) : (c._visibility |= 2, ea(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Mo(r, t);
        break;
      case 24:
        Jt(
          e,
          t,
          n,
          l
        ), u & 2048 && jo(t.alternate, t);
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
  function ea(e, t, n, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, r = t, d = n, y = l, z = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          ea(
            c,
            r,
            d,
            y,
            u
          ), Ia(8, r);
          break;
        case 23:
          break;
        case 22:
          var N = r.stateNode;
          r.memoizedState !== null ? N._visibility & 2 ? ea(
            c,
            r,
            d,
            y,
            u
          ) : eu(
            c,
            r
          ) : (N._visibility |= 2, ea(
            c,
            r,
            d,
            y,
            u
          )), u && z & 2048 && Mo(
            r.alternate,
            r
          );
          break;
        case 24:
          ea(
            c,
            r,
            d,
            y,
            u
          ), u && z & 2048 && jo(r.alternate, r);
          break;
        default:
          ea(
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
  function eu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            eu(n, l), u & 2048 && Mo(
              l.alternate,
              l
            );
            break;
          case 24:
            eu(n, l), u & 2048 && jo(l.alternate, l);
            break;
          default:
            eu(n, l);
        }
        t = t.sibling;
      }
  }
  var tu = 8192;
  function ta(e, t, n) {
    if (e.subtreeFlags & tu)
      for (e = e.child; e !== null; )
        md(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function md(e, t, n) {
    switch (e.tag) {
      case 26:
        ta(
          e,
          t,
          n
        ), e.flags & tu && e.memoizedState !== null && Z0(
          n,
          $t,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        ta(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = $t;
        $t = _i(e.stateNode.containerInfo), ta(
          e,
          t,
          n
        ), $t = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = tu, tu = 16777216, ta(
          e,
          t,
          n
        ), tu = l) : ta(
          e,
          t,
          n
        ));
        break;
      default:
        ta(
          e,
          t,
          n
        );
    }
  }
  function vd(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function nu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          tt = l, gd(
            l,
            e
          );
        }
      vd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        yd(e), e = e.sibling;
  }
  function yd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        nu(e), e.flags & 2048 && Rn(9, e, e.return);
        break;
      case 3:
        nu(e);
        break;
      case 12:
        nu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, ci(e)) : nu(e);
        break;
      default:
        nu(e);
    }
  }
  function ci(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          tt = l, gd(
            l,
            e
          );
        }
      vd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Rn(8, t, t.return), ci(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, ci(t));
          break;
        default:
          ci(t);
      }
      e = e.sibling;
    }
  }
  function gd(e, t) {
    for (; tt !== null; ) {
      var n = tt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Rn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Ba(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, tt = l;
      else
        e: for (n = e; tt !== null; ) {
          l = tt;
          var u = l.sibling, c = l.return;
          if (cd(l), l === n) {
            tt = null;
            break e;
          }
          if (u !== null) {
            u.return = c, tt = u;
            break e;
          }
          tt = c;
        }
    }
  }
  var Wv = {
    getCacheForType: function(e) {
      var t = ut(Ve), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return ut(Ve).controller.signal;
    }
  }, Fv = typeof WeakMap == "function" ? WeakMap : Map, pe = 0, Ne = null, se = null, fe = 0, be = 0, jt = null, Hn = !1, na = !1, Co = !1, Sn = 0, Ye = 0, qn = 0, _l = 0, Do = 0, Ct = 0, la = 0, lu = null, St = null, wo = !1, oi = 0, pd = 0, si = 1 / 0, ri = null, Bn = null, Ie = 0, Yn = null, aa = null, zn = 0, Uo = 0, Zo = null, bd = null, au = 0, Ro = null;
  function Dt() {
    return (pe & 2) !== 0 && fe !== 0 ? fe & -fe : O.T !== null ? Go() : Us();
  }
  function _d() {
    if (Ct === 0)
      if ((fe & 536870912) === 0 || me) {
        var e = tl;
        tl <<= 1, (tl & 3932160) === 0 && (tl = 262144), Ct = e;
      } else Ct = 536870912;
    return e = Nt.current, e !== null && (e.flags |= 32), Ct;
  }
  function zt(e, t, n) {
    (e === Ne && (be === 2 || be === 9) || e.cancelPendingCommit !== null) && (ua(e, 0), kn(
      e,
      fe,
      Ct,
      !1
    )), ge(e, n), ((pe & 2) === 0 || e !== Ne) && (e === Ne && ((pe & 2) === 0 && (_l |= n), Ye === 4 && kn(
      e,
      fe,
      Ct,
      !1
    )), ln(e));
  }
  function Sd(e, t, n) {
    if ((pe & 6) !== 0) throw Error(s(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || W(e, t), u = l ? e0(e, t) : qo(e, t, !0), c = l;
    do {
      if (u === 0) {
        na && !l && kn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !Iv(n)) {
          u = qo(e, t, !1), c = !1;
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
              u = lu;
              var y = d.current.memoizedState.isDehydrated;
              if (y && (ua(d, r).flags |= 256), r = qo(
                d,
                r,
                !1
              ), r !== 2) {
                if (Co && !y) {
                  d.errorRecoveryDisabledLanes |= c, _l |= c, u = 4;
                  break e;
                }
                c = St, St = u, c !== null && (St === null ? St = c : St.push.apply(
                  St,
                  c
                ));
              }
              u = r;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          ua(e, 0), kn(e, t, 0, !0);
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
              kn(
                l,
                t,
                Ct,
                !Hn
              );
              break e;
            case 2:
              St = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = oi + 300 - nt(), 10 < u)) {
            if (kn(
              l,
              t,
              Ct,
              !Hn
            ), q(l, 0, !0) !== 0) break e;
            zn = t, l.timeoutHandle = Id(
              zd.bind(
                null,
                l,
                n,
                St,
                ri,
                wo,
                t,
                Ct,
                _l,
                la,
                Hn,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          zd(
            l,
            n,
            St,
            ri,
            wo,
            t,
            Ct,
            _l,
            la,
            Hn,
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
  function zd(e, t, n, l, u, c, r, d, y, z, N, C, E, A) {
    if (e.timeoutHandle = -1, C = t.subtreeFlags, C & 8192 || (C & 16785408) === 16785408) {
      C = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: cn
      }, md(
        t,
        c,
        C
      );
      var B = (c & 62914560) === c ? oi - nt() : (c & 4194048) === c ? pd - nt() : 0;
      if (B = R0(
        C,
        B
      ), B !== null) {
        zn = c, e.cancelPendingCommit = B(
          jd.bind(
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
            N,
            C,
            null,
            E,
            A
          )
        ), kn(e, c, r, !z);
        return;
      }
    }
    jd(
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
  function Iv(e) {
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
  function kn(e, t, n, l) {
    t &= ~Do, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - ft(u), r = 1 << c;
      l[c] = -1, u &= ~r;
    }
    n !== 0 && Al(e, n, t);
  }
  function fi() {
    return (pe & 6) === 0 ? (uu(0), !1) : !0;
  }
  function Ho() {
    if (se !== null) {
      if (be === 0)
        var e = se.return;
      else
        e = se, fn = fl = null, Ic(e), Jl = null, ka = 0, e = se;
      for (; e !== null; )
        Pf(e.alternate, e), e = e.return;
      se = null;
    }
  }
  function ua(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, p0(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), zn = 0, Ho(), Ne = e, se = n = sn(e.current, null), fe = t, be = 0, jt = null, Hn = !1, na = W(e, t), Co = !1, la = Ct = Do = _l = qn = Ye = 0, St = lu = null, wo = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - ft(l), c = 1 << u;
        t |= e[u], l &= ~c;
      }
    return Sn = t, Du(), n;
  }
  function xd(e, t) {
    ne = null, O.H = Ja, t === $l || t === Yu ? (t = qr(), be = 3) : t === Yc ? (t = qr(), be = 4) : be = t === vo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, jt = t, se === null && (Ye = 1, ei(
      e,
      qt(t, e.current)
    ));
  }
  function Ed() {
    var e = Nt.current;
    return e === null ? !0 : (fe & 4194048) === fe ? Gt === null : (fe & 62914560) === fe || (fe & 536870912) !== 0 ? e === Gt : !1;
  }
  function Td() {
    var e = O.H;
    return O.H = Ja, e === null ? Ja : e;
  }
  function Ad() {
    var e = O.A;
    return O.A = Wv, e;
  }
  function di() {
    Ye = 4, Hn || (fe & 4194048) !== fe && Nt.current !== null || (na = !0), (qn & 134217727) === 0 && (_l & 134217727) === 0 || Ne === null || kn(
      Ne,
      fe,
      Ct,
      !1
    );
  }
  function qo(e, t, n) {
    var l = pe;
    pe |= 2;
    var u = Td(), c = Ad();
    (Ne !== e || fe !== t) && (ri = null, ua(e, t)), t = !1;
    var r = Ye;
    e: do
      try {
        if (be !== 0 && se !== null) {
          var d = se, y = jt;
          switch (be) {
            case 8:
              Ho(), r = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Nt.current === null && (t = !0);
              var z = be;
              if (be = 0, jt = null, ia(e, d, y, z), n && na) {
                r = 0;
                break e;
              }
              break;
            default:
              z = be, be = 0, jt = null, ia(e, d, y, z);
          }
        }
        Pv(), r = Ye;
        break;
      } catch (N) {
        xd(e, N);
      }
    while (!0);
    return t && e.shellSuspendCounter++, fn = fl = null, pe = l, O.H = u, O.A = c, se === null && (Ne = null, fe = 0, Du()), r;
  }
  function Pv() {
    for (; se !== null; ) Od(se);
  }
  function e0(e, t) {
    var n = pe;
    pe |= 2;
    var l = Td(), u = Ad();
    Ne !== e || fe !== t ? (ri = null, si = nt() + 500, ua(e, t)) : na = W(
      e,
      t
    );
    e: do
      try {
        if (be !== 0 && se !== null) {
          t = se;
          var c = jt;
          t: switch (be) {
            case 1:
              be = 0, jt = null, ia(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Rr(c)) {
                be = 0, jt = null, Nd(t);
                break;
              }
              t = function() {
                be !== 2 && be !== 9 || Ne !== e || (be = 7), ln(e);
              }, c.then(t, t);
              break e;
            case 3:
              be = 7;
              break e;
            case 4:
              be = 5;
              break e;
            case 7:
              Rr(c) ? (be = 0, jt = null, Nd(t)) : (be = 0, jt = null, ia(e, t, c, 7));
              break;
            case 5:
              var r = null;
              switch (se.tag) {
                case 26:
                  r = se.memoizedState;
                case 5:
                case 27:
                  var d = se;
                  if (r ? hh(r) : d.stateNode.complete) {
                    be = 0, jt = null;
                    var y = d.sibling;
                    if (y !== null) se = y;
                    else {
                      var z = d.return;
                      z !== null ? (se = z, hi(z)) : se = null;
                    }
                    break t;
                  }
              }
              be = 0, jt = null, ia(e, t, c, 5);
              break;
            case 6:
              be = 0, jt = null, ia(e, t, c, 6);
              break;
            case 8:
              Ho(), Ye = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        t0();
        break;
      } catch (N) {
        xd(e, N);
      }
    while (!0);
    return fn = fl = null, O.H = l, O.A = u, pe = n, se !== null ? 0 : (Ne = null, fe = 0, Du(), Ye);
  }
  function t0() {
    for (; se !== null && !Ki(); )
      Od(se);
  }
  function Od(e) {
    var t = Ff(e.alternate, e, Sn);
    e.memoizedProps = e.pendingProps, t === null ? hi(e) : se = t;
  }
  function Nd(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Qf(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          fe
        );
        break;
      case 11:
        t = Qf(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          fe
        );
        break;
      case 5:
        Ic(t);
      default:
        Pf(n, t), t = se = Tr(t, Sn), t = Ff(n, t, Sn);
    }
    e.memoizedProps = e.pendingProps, t === null ? hi(e) : se = t;
  }
  function ia(e, t, n, l) {
    fn = fl = null, Ic(t), Jl = null, ka = 0;
    var u = t.return;
    try {
      if (Lv(
        e,
        u,
        t,
        n,
        fe
      )) {
        Ye = 1, ei(
          e,
          qt(n, e.current)
        ), se = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw se = u, c;
      Ye = 1, ei(
        e,
        qt(n, e.current)
      ), se = null;
      return;
    }
    t.flags & 32768 ? (me || l === 1 ? e = !0 : na || (fe & 536870912) !== 0 ? e = !1 : (Hn = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Nt.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Md(t, e)) : hi(t);
  }
  function hi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Md(
          t,
          Hn
        );
        return;
      }
      e = t.return;
      var n = Vv(
        t.alternate,
        t,
        Sn
      );
      if (n !== null) {
        se = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        se = t;
        return;
      }
      se = t = e;
    } while (t !== null);
    Ye === 0 && (Ye = 5);
  }
  function Md(e, t) {
    do {
      var n = Kv(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, se = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        se = e;
        return;
      }
      se = e = n;
    } while (e !== null);
    Ye = 6, se = null;
  }
  function jd(e, t, n, l, u, c, r, d, y) {
    e.cancelPendingCommit = null;
    do
      mi();
    while (Ie !== 0);
    if ((pe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (c = t.lanes | t.childLanes, c |= Tc, dt(
        e,
        n,
        c,
        r,
        d,
        y
      ), e === Ne && (se = Ne = null, fe = 0), aa = t, Yn = e, zn = n, Uo = c, Zo = u, bd = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, u0(Pn, function() {
        return Zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = H.p, H.p = 2, r = pe, pe |= 4;
        try {
          $v(e, t, n);
        } finally {
          pe = r, H.p = u, O.T = l;
        }
      }
      Ie = 1, Cd(), Dd(), wd();
    }
  }
  function Cd() {
    if (Ie === 1) {
      Ie = 0;
      var e = Yn, t = aa, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null;
        var l = H.p;
        H.p = 2;
        var u = pe;
        pe |= 4;
        try {
          fd(t, e);
          var c = Wo, r = yr(e.containerInfo), d = c.focusedElem, y = c.selectionRange;
          if (r !== d && d && d.ownerDocument && vr(
            d.ownerDocument.documentElement,
            d
          )) {
            if (y !== null && _c(d)) {
              var z = y.start, N = y.end;
              if (N === void 0 && (N = z), "selectionStart" in d)
                d.selectionStart = z, d.selectionEnd = Math.min(
                  N,
                  d.value.length
                );
              else {
                var C = d.ownerDocument || document, E = C && C.defaultView || window;
                if (E.getSelection) {
                  var A = E.getSelection(), B = d.textContent.length, J = Math.min(y.start, B), Ae = y.end === void 0 ? J : Math.min(y.end, B);
                  !A.extend && J > Ae && (r = Ae, Ae = J, J = r);
                  var _ = mr(
                    d,
                    J
                  ), b = mr(
                    d,
                    Ae
                  );
                  if (_ && b && (A.rangeCount !== 1 || A.anchorNode !== _.node || A.anchorOffset !== _.offset || A.focusNode !== b.node || A.focusOffset !== b.offset)) {
                    var S = C.createRange();
                    S.setStart(_.node, _.offset), A.removeAllRanges(), J > Ae ? (A.addRange(S), A.extend(b.node, b.offset)) : (S.setEnd(b.node, b.offset), A.addRange(S));
                  }
                }
              }
            }
            for (C = [], A = d; A = A.parentNode; )
              A.nodeType === 1 && C.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < C.length; d++) {
              var M = C[d];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          Ai = !!Jo, Wo = Jo = null;
        } finally {
          pe = u, H.p = l, O.T = n;
        }
      }
      e.current = t, Ie = 2;
    }
  }
  function Dd() {
    if (Ie === 2) {
      Ie = 0;
      var e = Yn, t = aa, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = O.T, O.T = null;
        var l = H.p;
        H.p = 2;
        var u = pe;
        pe |= 4;
        try {
          id(e, t.alternate, t);
        } finally {
          pe = u, H.p = l, O.T = n;
        }
      }
      Ie = 3;
    }
  }
  function wd() {
    if (Ie === 4 || Ie === 3) {
      Ie = 0, xa();
      var e = Yn, t = aa, n = zn, l = bd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Ie = 5 : (Ie = 0, aa = Yn = null, Ud(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Bn = null), tc(n), t = t.stateNode, ot && typeof ot.onCommitFiberRoot == "function")
        try {
          ot.onCommitFiberRoot(
            el,
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
      (zn & 3) !== 0 && mi(), ln(e), u = e.pendingLanes, (n & 261930) !== 0 && (u & 42) !== 0 ? e === Ro ? au++ : (au = 0, Ro = e) : au = 0, uu(0);
    }
  }
  function Ud(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ba(t)));
  }
  function mi() {
    return Cd(), Dd(), wd(), Zd();
  }
  function Zd() {
    if (Ie !== 5) return !1;
    var e = Yn, t = Uo;
    Uo = 0;
    var n = tc(zn), l = O.T, u = H.p;
    try {
      H.p = 32 > n ? 32 : n, O.T = null, n = Zo, Zo = null;
      var c = Yn, r = zn;
      if (Ie = 0, aa = Yn = null, zn = 0, (pe & 6) !== 0) throw Error(s(331));
      var d = pe;
      if (pe |= 4, yd(c.current), hd(
        c,
        c.current,
        r,
        n
      ), pe = d, uu(0, !1), ot && typeof ot.onPostCommitFiberRoot == "function")
        try {
          ot.onPostCommitFiberRoot(el, c);
        } catch {
        }
      return !0;
    } finally {
      H.p = u, O.T = l, Ud(e, t);
    }
  }
  function Rd(e, t, n) {
    t = qt(n, t), t = mo(e.stateNode, t, 2), e = wn(e, t, 2), e !== null && (ge(e, 2), ln(e));
  }
  function _e(e, t, n) {
    if (e.tag === 3)
      Rd(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Rd(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Bn === null || !Bn.has(l))) {
            e = qt(n, e), n = Hf(2), l = wn(t, n, 2), l !== null && (qf(
              n,
              l,
              t,
              e
            ), ge(l, 2), ln(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function Bo(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Fv();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(n) || (Co = !0, u.add(n), e = n0.bind(null, e, t, n), t.then(e, e));
  }
  function n0(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ne === e && (fe & n) === n && (Ye === 4 || Ye === 3 && (fe & 62914560) === fe && 300 > nt() - oi ? (pe & 2) === 0 && ua(e, 0) : Do |= n, la === fe && (la = 0)), ln(e);
  }
  function Hd(e, t) {
    t === 0 && (t = ie()), e = ol(e, t), e !== null && (ge(e, t), ln(e));
  }
  function l0(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Hd(e, n);
  }
  function a0(e, t) {
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
    l !== null && l.delete(t), Hd(e, n);
  }
  function u0(e, t) {
    return vt(e, t);
  }
  var vi = null, ca = null, Yo = !1, yi = !1, ko = !1, Gn = 0;
  function ln(e) {
    e !== ca && e.next === null && (ca === null ? vi = ca = e : ca = ca.next = e), yi = !0, Yo || (Yo = !0, c0());
  }
  function uu(e, t) {
    if (!ko && yi) {
      ko = !0;
      do
        for (var n = !1, l = vi; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var r = l.suspendedLanes, d = l.pingedLanes;
              c = (1 << 31 - ft(42 | e) + 1) - 1, c &= u & ~(r & ~d), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, kd(l, c));
          } else
            c = fe, c = q(
              l,
              l === Ne ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || W(l, c) || (n = !0, kd(l, c));
          l = l.next;
        }
      while (n);
      ko = !1;
    }
  }
  function i0() {
    qd();
  }
  function qd() {
    yi = Yo = !1;
    var e = 0;
    Gn !== 0 && g0() && (e = Gn);
    for (var t = nt(), n = null, l = vi; l !== null; ) {
      var u = l.next, c = Bd(l, t);
      c === 0 ? (l.next = null, n === null ? vi = u : n.next = u, u === null && (ca = n)) : (n = l, (e !== 0 || (c & 3) !== 0) && (yi = !0)), l = u;
    }
    Ie !== 0 && Ie !== 5 || uu(e), Gn !== 0 && (Gn = 0);
  }
  function Bd(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var r = 31 - ft(c), d = 1 << r, y = u[r];
      y === -1 ? ((d & n) === 0 || (d & l) !== 0) && (u[r] = G(d, t)) : y <= t && (e.expiredLanes |= d), c &= ~d;
    }
    if (t = Ne, n = fe, n = q(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (be === 2 || be === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && za(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || W(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && za(l), tc(n)) {
        case 2:
        case 8:
          n = Ji;
          break;
        case 32:
          n = Pn;
          break;
        case 268435456:
          n = Ea;
          break;
        default:
          n = Pn;
      }
      return l = Yd.bind(null, e), n = vt(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && za(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Yd(e, t) {
    if (Ie !== 0 && Ie !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (mi() && e.callbackNode !== n)
      return null;
    var l = fe;
    return l = q(
      e,
      e === Ne ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Sd(e, l, t), Bd(e, nt()), e.callbackNode != null && e.callbackNode === n ? Yd.bind(null, e) : null);
  }
  function kd(e, t) {
    if (mi()) return null;
    Sd(e, t, !0);
  }
  function c0() {
    b0(function() {
      (pe & 6) !== 0 ? vt(
        bu,
        i0
      ) : qd();
    });
  }
  function Go() {
    if (Gn === 0) {
      var e = Vl;
      e === 0 && (e = Tl, Tl <<= 1, (Tl & 261888) === 0 && (Tl = 256)), Gn = e;
    }
    return Gn;
  }
  function Gd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Eu("" + e);
  }
  function Ld(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function o0(e, t, n, l, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var c = Gd(
        (u[yt] || null).action
      ), r = l.submitter;
      r && (t = (t = r[yt] || null) ? Gd(t.formAction) : r.getAttribute("formAction"), t !== null && (c = t, r = null));
      var d = new Nu(
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
                if (Gn !== 0) {
                  var y = r ? Ld(u, r) : new FormData(u);
                  co(
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
                typeof c == "function" && (d.preventDefault(), y = r ? Ld(u, r) : new FormData(u), co(
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
  for (var Lo = 0; Lo < Ec.length; Lo++) {
    var Xo = Ec[Lo], s0 = Xo.toLowerCase(), r0 = Xo[0].toUpperCase() + Xo.slice(1);
    Kt(
      s0,
      "on" + r0
    );
  }
  Kt(br, "onAnimationEnd"), Kt(_r, "onAnimationIteration"), Kt(Sr, "onAnimationStart"), Kt("dblclick", "onDoubleClick"), Kt("focusin", "onFocus"), Kt("focusout", "onBlur"), Kt(Av, "onTransitionRun"), Kt(Ov, "onTransitionStart"), Kt(Nv, "onTransitionCancel"), Kt(zr, "onTransitionEnd"), Dl("onMouseEnter", ["mouseout", "mouseover"]), Dl("onMouseLeave", ["mouseout", "mouseover"]), Dl("onPointerEnter", ["pointerout", "pointerover"]), Dl("onPointerLeave", ["pointerout", "pointerover"]), al(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), al(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), al("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), al(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), al(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), al(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var iu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), f0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(iu)
  );
  function Xd(e, t) {
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
            } catch (N) {
              Cu(N);
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
            } catch (N) {
              Cu(N);
            }
            u.currentTarget = null, c = y;
          }
      }
    }
  }
  function re(e, t) {
    var n = t[nc];
    n === void 0 && (n = t[nc] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Qd(t, e, 2, !1), n.add(l));
  }
  function Qo(e, t, n) {
    var l = 0;
    t && (l |= 4), Qd(
      n,
      e,
      l,
      t
    );
  }
  var gi = "_reactListening" + Math.random().toString(36).slice(2);
  function Vo(e) {
    if (!e[gi]) {
      e[gi] = !0, Hs.forEach(function(n) {
        n !== "selectionchange" && (f0.has(n) || Qo(n, !1, e), Qo(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[gi] || (t[gi] = !0, Qo("selectionchange", !1, t));
    }
  }
  function Qd(e, t, n, l) {
    switch (_h(t)) {
      case 2:
        var u = B0;
        break;
      case 8:
        u = Y0;
        break;
      default:
        u = cs;
    }
    n = u.bind(
      null,
      t,
      n,
      e
    ), u = void 0, !fc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, n, !0) : u !== void 0 ? e.addEventListener(t, n, {
      passive: u
    }) : e.addEventListener(t, n, !1);
  }
  function Ko(e, t, n, l, u) {
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
            if (r = Ml(d), r === null) return;
            if (y = r.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              l = c = r;
              continue e;
            }
            d = d.parentNode;
          }
        }
        l = l.return;
      }
    Js(function() {
      var z = c, N = sc(n), C = [];
      e: {
        var E = xr.get(e);
        if (E !== void 0) {
          var A = Nu, B = e;
          switch (e) {
            case "keypress":
              if (Au(n) === 0) break e;
            case "keydown":
            case "keyup":
              A = av;
              break;
            case "focusin":
              B = "focus", A = vc;
              break;
            case "focusout":
              B = "blur", A = vc;
              break;
            case "beforeblur":
            case "afterblur":
              A = vc;
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
              A = Is;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Vm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = cv;
              break;
            case br:
            case _r:
            case Sr:
              A = Jm;
              break;
            case zr:
              A = sv;
              break;
            case "scroll":
            case "scrollend":
              A = Xm;
              break;
            case "wheel":
              A = fv;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Fm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = er;
              break;
            case "toggle":
            case "beforetoggle":
              A = hv;
          }
          var J = (t & 4) !== 0, Ae = !J && (e === "scroll" || e === "scrollend"), _ = J ? E !== null ? E + "Capture" : null : E;
          J = [];
          for (var b = z, S; b !== null; ) {
            var M = b;
            if (S = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || S === null || _ === null || (M = Na(b, _), M != null && J.push(
              cu(b, M, S)
            )), Ae) break;
            b = b.return;
          }
          0 < J.length && (E = new A(
            E,
            B,
            null,
            n,
            N
          ), C.push({ event: E, listeners: J }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (E = e === "mouseover" || e === "pointerover", A = e === "mouseout" || e === "pointerout", E && n !== oc && (B = n.relatedTarget || n.fromElement) && (Ml(B) || B[Nl]))
            break e;
          if ((A || E) && (E = N.window === N ? N : (E = N.ownerDocument) ? E.defaultView || E.parentWindow : window, A ? (B = n.relatedTarget || n.toElement, A = z, B = B ? Ml(B) : null, B !== null && (Ae = v(B), J = B.tag, B !== Ae || J !== 5 && J !== 27 && J !== 6) && (B = null)) : (A = null, B = z), A !== B)) {
            if (J = Is, M = "onMouseLeave", _ = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (J = er, M = "onPointerLeave", _ = "onPointerEnter", b = "pointer"), Ae = A == null ? E : Oa(A), S = B == null ? E : Oa(B), E = new J(
              M,
              b + "leave",
              A,
              n,
              N
            ), E.target = Ae, E.relatedTarget = S, M = null, Ml(N) === z && (J = new J(
              _,
              b + "enter",
              B,
              n,
              N
            ), J.target = S, J.relatedTarget = Ae, M = J), Ae = M, A && B)
              t: {
                for (J = d0, _ = A, b = B, S = 0, M = _; M; M = J(M))
                  S++;
                M = 0;
                for (var Q = b; Q; Q = J(Q))
                  M++;
                for (; 0 < S - M; )
                  _ = J(_), S--;
                for (; 0 < M - S; )
                  b = J(b), M--;
                for (; S--; ) {
                  if (_ === b || b !== null && _ === b.alternate) {
                    J = _;
                    break t;
                  }
                  _ = J(_), b = J(b);
                }
                J = null;
              }
            else J = null;
            A !== null && Vd(
              C,
              E,
              A,
              J,
              !1
            ), B !== null && Ae !== null && Vd(
              C,
              Ae,
              B,
              J,
              !0
            );
          }
        }
        e: {
          if (E = z ? Oa(z) : window, A = E.nodeName && E.nodeName.toLowerCase(), A === "select" || A === "input" && E.type === "file")
            var ve = or;
          else if (ir(E))
            if (sr)
              ve = xv;
            else {
              ve = Sv;
              var L = _v;
            }
          else
            A = E.nodeName, !A || A.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? z && cc(z.elementType) && (ve = or) : ve = zv;
          if (ve && (ve = ve(e, z))) {
            cr(
              C,
              ve,
              n,
              N
            );
            break e;
          }
          L && L(e, E, z), e === "focusout" && z && E.type === "number" && z.memoizedProps.value != null && ic(E, "number", E.value);
        }
        switch (L = z ? Oa(z) : window, e) {
          case "focusin":
            (ir(L) || L.contentEditable === "true") && (ql = L, Sc = z, Ra = null);
            break;
          case "focusout":
            Ra = Sc = ql = null;
            break;
          case "mousedown":
            zc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            zc = !1, gr(C, n, N);
            break;
          case "selectionchange":
            if (Tv) break;
          case "keydown":
          case "keyup":
            gr(C, n, N);
        }
        var ae;
        if (gc)
          e: {
            switch (e) {
              case "compositionstart":
                var de = "onCompositionStart";
                break e;
              case "compositionend":
                de = "onCompositionEnd";
                break e;
              case "compositionupdate":
                de = "onCompositionUpdate";
                break e;
            }
            de = void 0;
          }
        else
          Hl ? ar(e, n) && (de = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (de = "onCompositionStart");
        de && (tr && n.locale !== "ko" && (Hl || de !== "onCompositionStart" ? de === "onCompositionEnd" && Hl && (ae = Ws()) : (An = N, dc = "value" in An ? An.value : An.textContent, Hl = !0)), L = pi(z, de), 0 < L.length && (de = new Ps(
          de,
          e,
          null,
          n,
          N
        ), C.push({ event: de, listeners: L }), ae ? de.data = ae : (ae = ur(n), ae !== null && (de.data = ae)))), (ae = vv ? yv(e, n) : gv(e, n)) && (de = pi(z, "onBeforeInput"), 0 < de.length && (L = new Ps(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          N
        ), C.push({
          event: L,
          listeners: de
        }), L.data = ae)), o0(
          C,
          e,
          z,
          n,
          N
        );
      }
      Xd(C, t);
    });
  }
  function cu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function pi(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = Na(e, n), u != null && l.unshift(
        cu(e, u, c)
      ), u = Na(e, t), u != null && l.push(
        cu(e, u, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function d0(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Vd(e, t, n, l, u) {
    for (var c = t._reactName, r = []; n !== null && n !== l; ) {
      var d = n, y = d.alternate, z = d.stateNode;
      if (d = d.tag, y !== null && y === l) break;
      d !== 5 && d !== 26 && d !== 27 || z === null || (y = z, u ? (z = Na(n, c), z != null && r.unshift(
        cu(n, z, y)
      )) : u || (z = Na(n, c), z != null && r.push(
        cu(n, z, y)
      ))), n = n.return;
    }
    r.length !== 0 && e.push({ event: t, listeners: r });
  }
  var h0 = /\r\n?/g, m0 = /\u0000|\uFFFD/g;
  function Kd(e) {
    return (typeof e == "string" ? e : "" + e).replace(h0, `
`).replace(m0, "");
  }
  function $d(e, t) {
    return t = Kd(t), Kd(e) === t;
  }
  function Te(e, t, n, l, u, c) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || Ul(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && Ul(e, "" + l);
        break;
      case "className":
        zu(e, "class", l);
        break;
      case "tabIndex":
        zu(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        zu(e, n, l);
        break;
      case "style":
        Ks(e, l, c);
        break;
      case "data":
        if (t !== "object") {
          zu(e, "data", l);
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
        l = Eu("" + l), e.setAttribute(n, l);
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
        l = Eu("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = cn);
        break;
      case "onScroll":
        l != null && re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && re("scrollend", e);
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
        n = Eu("" + l), e.setAttributeNS(
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
        re("beforetoggle", e), re("toggle", e), Su(e, "popover", l);
        break;
      case "xlinkActuate":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        un(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        un(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        Su(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Gm.get(n) || n, Su(e, n, l));
    }
  }
  function $o(e, t, n, l, u, c) {
    switch (n) {
      case "style":
        Ks(e, l, c);
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
        typeof l == "string" ? Ul(e, l) : (typeof l == "number" || typeof l == "bigint") && Ul(e, "" + l);
        break;
      case "onScroll":
        l != null && re("scroll", e);
        break;
      case "onScrollEnd":
        l != null && re("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = cn);
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
        if (!qs.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), t = n.slice(2, u ? n.length - 7 : void 0), c = e[yt] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof l == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, u);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : Su(e, n, l);
          }
    }
  }
  function ct(e, t, n) {
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
        re("error", e), re("load", e);
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
        re("invalid", e);
        var d = c = r = u = null, y = null, z = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var N = n[l];
            if (N != null)
              switch (l) {
                case "name":
                  u = N;
                  break;
                case "type":
                  r = N;
                  break;
                case "checked":
                  y = N;
                  break;
                case "defaultChecked":
                  z = N;
                  break;
                case "value":
                  c = N;
                  break;
                case "defaultValue":
                  d = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(s(137, t));
                  break;
                default:
                  Te(e, t, l, N, n, null);
              }
          }
        Ls(
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
        re("invalid", e), l = r = c = null;
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
        t = c, n = r, e.multiple = !!l, t != null ? wl(e, !!l, t, !1) : n != null && wl(e, !!l, n, !0);
        return;
      case "textarea":
        re("invalid", e), c = u = l = null;
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
        Qs(e, l, u, c);
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
        re("beforetoggle", e), re("toggle", e), re("cancel", e), re("close", e);
        break;
      case "iframe":
      case "object":
        re("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < iu.length; l++)
          re(iu[l], e);
        break;
      case "image":
        re("error", e), re("load", e);
        break;
      case "details":
        re("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        re("error", e), re("load", e);
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
        if (cc(t)) {
          for (N in n)
            n.hasOwnProperty(N) && (l = n[N], l !== void 0 && $o(
              e,
              t,
              N,
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
  function v0(e, t, n, l) {
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
        var u = null, c = null, r = null, d = null, y = null, z = null, N = null;
        for (A in n) {
          var C = n[A];
          if (n.hasOwnProperty(A) && C != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = C;
              default:
                l.hasOwnProperty(A) || Te(e, t, A, null, l, C);
            }
        }
        for (var E in l) {
          var A = l[E];
          if (C = n[E], l.hasOwnProperty(E) && (A != null || C != null))
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
                N = A;
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
                A !== C && Te(
                  e,
                  t,
                  E,
                  A,
                  l,
                  C
                );
            }
        }
        uc(
          e,
          r,
          d,
          y,
          z,
          N,
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
        t = d, n = r, l = A, E != null ? wl(e, !!n, E, !1) : !!l != !!n && (t != null ? wl(e, !!n, t, !0) : wl(e, !!n, n ? [] : "", !1));
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
        Xs(e, E, A);
        return;
      case "option":
        for (var B in n)
          if (E = n[B], n.hasOwnProperty(B) && E != null && !l.hasOwnProperty(B))
            switch (B) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Te(
                  e,
                  t,
                  B,
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
        for (var J in n)
          E = n[J], n.hasOwnProperty(J) && E != null && !l.hasOwnProperty(J) && Te(e, t, J, null, l, E);
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
        if (cc(t)) {
          for (var Ae in n)
            E = n[Ae], n.hasOwnProperty(Ae) && E !== void 0 && !l.hasOwnProperty(Ae) && $o(
              e,
              t,
              Ae,
              void 0,
              l,
              E
            );
          for (N in l)
            E = l[N], A = n[N], !l.hasOwnProperty(N) || E === A || E === void 0 && A === void 0 || $o(
              e,
              t,
              N,
              E,
              l,
              A
            );
          return;
        }
    }
    for (var _ in n)
      E = n[_], n.hasOwnProperty(_) && E != null && !l.hasOwnProperty(_) && Te(e, t, _, null, l, E);
    for (C in l)
      E = l[C], A = n[C], !l.hasOwnProperty(C) || E === A || E == null && A == null || Te(e, t, C, E, l, A);
  }
  function Jd(e) {
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
  function y0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var u = n[l], c = u.transferSize, r = u.initiatorType, d = u.duration;
        if (c && d && Jd(r)) {
          for (r = 0, d = u.responseEnd, l += 1; l < n.length; l++) {
            var y = n[l], z = y.startTime;
            if (z > d) break;
            var N = y.transferSize, C = y.initiatorType;
            N && Jd(C) && (y = y.responseEnd, r += N * (y < d ? 1 : (d - z) / (y - z)));
          }
          if (--l, t += 8 * (c + r) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Jo = null, Wo = null;
  function bi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Wd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Fd(e, t) {
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
  function Fo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Io = null;
  function g0() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Io ? !1 : (Io = e, !0) : (Io = null, !1);
  }
  var Id = typeof setTimeout == "function" ? setTimeout : void 0, p0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Pd = typeof Promise == "function" ? Promise : void 0, b0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Pd < "u" ? function(e) {
    return Pd.resolve(null).then(e).catch(_0);
  } : Id;
  function _0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ln(e) {
    return e === "head";
  }
  function eh(e, t) {
    var n = t, l = 0;
    do {
      var u = n.nextSibling;
      if (e.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(u), fa(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          ou(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, ou(n);
          for (var c = n.firstChild; c; ) {
            var r = c.nextSibling, d = c.nodeName;
            c[Aa] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = r;
          }
        } else
          n === "body" && ou(e.ownerDocument.body);
      n = u;
    } while (n);
    fa(t);
  }
  function th(e, t) {
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
  function Po(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Po(n), lc(n);
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
  function S0(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[Aa])
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
      if (e = Lt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function z0(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function nh(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Lt(e.nextSibling), e === null)) return null;
    return e;
  }
  function es(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ts(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function x0(e, t) {
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
  function Lt(e) {
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
  var ns = null;
  function lh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Lt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ah(e) {
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
  function uh(e, t, n) {
    switch (t = bi(n), e) {
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
  function ou(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    lc(e);
  }
  var Xt = /* @__PURE__ */ new Map(), ih = /* @__PURE__ */ new Set();
  function _i(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var xn = H.d;
  H.d = {
    f: E0,
    r: T0,
    D: A0,
    C: O0,
    L: N0,
    m: M0,
    X: C0,
    S: j0,
    M: D0
  };
  function E0() {
    var e = xn.f(), t = fi();
    return e || t;
  }
  function T0(e) {
    var t = jl(e);
    t !== null && t.tag === 5 && t.type === "form" ? xf(t) : xn.r(e);
  }
  var oa = typeof document > "u" ? null : document;
  function ch(e, t, n) {
    var l = oa;
    if (l && typeof t == "string" && t) {
      var u = Rt(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), ih.has(u) || (ih.add(u), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), ct(t, "link", e), et(t), l.head.appendChild(t)));
    }
  }
  function A0(e) {
    xn.D(e), ch("dns-prefetch", e, null);
  }
  function O0(e, t) {
    xn.C(e, t), ch("preconnect", e, t);
  }
  function N0(e, t, n) {
    xn.L(e, t, n);
    var l = oa;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + Rt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + Rt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + Rt(
        n.imageSizes
      ) + '"]')) : u += '[href="' + Rt(e) + '"]';
      var c = u;
      switch (t) {
        case "style":
          c = sa(e);
          break;
        case "script":
          c = ra(e);
      }
      Xt.has(c) || (e = U(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Xt.set(c, e), l.querySelector(u) !== null || t === "style" && l.querySelector(su(c)) || t === "script" && l.querySelector(ru(c)) || (t = l.createElement("link"), ct(t, "link", e), et(t), l.head.appendChild(t)));
    }
  }
  function M0(e, t) {
    xn.m(e, t);
    var n = oa;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Rt(l) + '"][href="' + Rt(e) + '"]', c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = ra(e);
      }
      if (!Xt.has(c) && (e = U({ rel: "modulepreload", href: e }, t), Xt.set(c, e), n.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ru(c)))
              return;
        }
        l = n.createElement("link"), ct(l, "link", e), et(l), n.head.appendChild(l);
      }
    }
  }
  function j0(e, t, n) {
    xn.S(e, t, n);
    var l = oa;
    if (l && e) {
      var u = Cl(l).hoistableStyles, c = sa(e);
      t = t || "default";
      var r = u.get(c);
      if (!r) {
        var d = { loading: 0, preload: null };
        if (r = l.querySelector(
          su(c)
        ))
          d.loading = 5;
        else {
          e = U(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Xt.get(c)) && ls(e, n);
          var y = r = l.createElement("link");
          et(y), ct(y, "link", e), y._p = new Promise(function(z, N) {
            y.onload = z, y.onerror = N;
          }), y.addEventListener("load", function() {
            d.loading |= 1;
          }), y.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, Si(r, t, l);
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
  function C0(e, t) {
    xn.X(e, t);
    var n = oa;
    if (n && e) {
      var l = Cl(n).hoistableScripts, u = ra(e), c = l.get(u);
      c || (c = n.querySelector(ru(u)), c || (e = U({ src: e, async: !0 }, t), (t = Xt.get(u)) && as(e, t), c = n.createElement("script"), et(c), ct(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function D0(e, t) {
    xn.M(e, t);
    var n = oa;
    if (n && e) {
      var l = Cl(n).hoistableScripts, u = ra(e), c = l.get(u);
      c || (c = n.querySelector(ru(u)), c || (e = U({ src: e, async: !0, type: "module" }, t), (t = Xt.get(u)) && as(e, t), c = n.createElement("script"), et(c), ct(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function oh(e, t, n, l) {
    var u = (u = ue.current) ? _i(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = sa(n.href), n = Cl(
          u
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = sa(n.href);
          var c = Cl(
            u
          ).hoistableStyles, r = c.get(e);
          if (r || (u = u.ownerDocument || u, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, r), (c = u.querySelector(
            su(e)
          )) && !c._p && (r.instance = c, r.state.loading = 5), Xt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Xt.set(e, n), c || w0(
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
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = ra(n), n = Cl(
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
  function sa(e) {
    return 'href="' + Rt(e) + '"';
  }
  function su(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function sh(e) {
    return U({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function w0(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), ct(t, "link", n), et(t), e.head.appendChild(t));
  }
  function ra(e) {
    return '[src="' + Rt(e) + '"]';
  }
  function ru(e) {
    return "script[async]" + e;
  }
  function rh(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Rt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, et(l), l;
          var u = U({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), et(l), ct(l, "style", u), Si(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          u = sa(n.href);
          var c = e.querySelector(
            su(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, et(c), c;
          l = sh(n), (u = Xt.get(u)) && ls(l, u), c = (e.ownerDocument || e).createElement("link"), et(c);
          var r = c;
          return r._p = new Promise(function(d, y) {
            r.onload = d, r.onerror = y;
          }), ct(c, "link", l), t.state.loading |= 4, Si(c, n.precedence, e), t.instance = c;
        case "script":
          return c = ra(n.src), (u = e.querySelector(
            ru(c)
          )) ? (t.instance = u, et(u), u) : (l = n, (u = Xt.get(c)) && (l = U({}, n), as(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), et(u), ct(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, Si(l, n.precedence, e));
    return t.instance;
  }
  function Si(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, c = u, r = 0; r < l.length; r++) {
      var d = l[r];
      if (d.dataset.precedence === t) c = d;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function ls(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function as(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var zi = null;
  function fh(e, t, n) {
    if (zi === null) {
      var l = /* @__PURE__ */ new Map(), u = zi = /* @__PURE__ */ new Map();
      u.set(n, l);
    } else
      u = zi, l = u.get(n), l || (l = /* @__PURE__ */ new Map(), u.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), u = 0; u < n.length; u++) {
      var c = n[u];
      if (!(c[Aa] || c[lt] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = c.getAttribute(t) || "";
        r = e + r;
        var d = l.get(r);
        d ? d.push(c) : l.set(r, [c]);
      }
    }
    return l;
  }
  function dh(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function U0(e, t, n) {
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
  function hh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Z0(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = sa(l.href), c = t.querySelector(
          su(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = xi.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, et(c);
          return;
        }
        c = t.ownerDocument || t, l = sh(l), (u = Xt.get(u)) && ls(l, u), c = c.createElement("link"), et(c);
        var r = c;
        r._p = new Promise(function(d, y) {
          r.onload = d, r.onerror = y;
        }), ct(c, "link", l), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = xi.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var us = 0;
  function R0(e, t) {
    return e.stylesheets && e.count === 0 && Ti(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && Ti(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && us === 0 && (us = 62500 * y0());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ti(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > us ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function xi() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ti(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ei = null;
  function Ti(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ei = /* @__PURE__ */ new Map(), t.forEach(H0, e), Ei = null, xi.call(e));
  }
  function H0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Ei.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Ei.set(e, n);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var r = u[c];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (n.set(r.dataset.precedence, r), l = r);
        }
        l && n.set(null, l);
      }
      u = t.instance, r = u.getAttribute("data-precedence"), c = n.get(r) || l, c === l && n.set(null, u), n.set(r, u), this.count++, l = xi.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var fu = {
    $$typeof: F,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0
  };
  function q0(e, t, n, l, u, c, r, d, y) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $(0), this.hiddenUpdates = $(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function mh(e, t, n, l, u, c, r, d, y, z, N, C) {
    return e = new q0(
      e,
      t,
      n,
      r,
      y,
      z,
      N,
      C,
      d
    ), t = 1, c === !0 && (t |= 24), c = Ot(3, null, null, t), e.current = c, c.stateNode = e, t = Hc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, kc(c), e;
  }
  function vh(e) {
    return e ? (e = kl, e) : kl;
  }
  function yh(e, t, n, l, u, c) {
    u = vh(u), l.context === null ? l.context = u : l.pendingContext = u, l = Dn(t), l.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (l.callback = c), n = wn(e, l, t), n !== null && (zt(n, e, t), La(n, e, t));
  }
  function gh(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function is(e, t) {
    gh(e, t), (e = e.alternate) && gh(e, t);
  }
  function ph(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ol(e, 67108864);
      t !== null && zt(t, e, 67108864), is(e, 67108864);
    }
  }
  function bh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Dt();
      t = ll(t);
      var n = ol(e, t);
      n !== null && zt(n, e, t), is(e, t);
    }
  }
  var Ai = !0;
  function B0(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = H.p;
    try {
      H.p = 2, cs(e, t, n, l);
    } finally {
      H.p = c, O.T = u;
    }
  }
  function Y0(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = H.p;
    try {
      H.p = 8, cs(e, t, n, l);
    } finally {
      H.p = c, O.T = u;
    }
  }
  function cs(e, t, n, l) {
    if (Ai) {
      var u = os(l);
      if (u === null)
        Ko(
          e,
          t,
          l,
          Oi,
          n
        ), Sh(e, l);
      else if (G0(
        u,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (Sh(e, l), t & 4 && -1 < k0.indexOf(e)) {
        for (; u !== null; ) {
          var c = jl(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var r = Pt(c.pendingLanes);
                  if (r !== 0) {
                    var d = c;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; r; ) {
                      var y = 1 << 31 - ft(r);
                      d.entanglements[1] |= y, r &= ~y;
                    }
                    ln(c), (pe & 6) === 0 && (si = nt() + 500, uu(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = ol(c, 2), d !== null && zt(d, c, 2), fi(), is(c, 2);
            }
          if (c = os(l), c === null && Ko(
            e,
            t,
            l,
            Oi,
            n
          ), c === u) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else
        Ko(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function os(e) {
    return e = sc(e), ss(e);
  }
  var Oi = null;
  function ss(e) {
    if (Oi = null, e = Ml(e), e !== null) {
      var t = v(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
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
    return Oi = e, null;
  }
  function _h(e) {
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
        switch ($i()) {
          case bu:
            return 2;
          case Ji:
            return 8;
          case Pn:
          case Wi:
            return 32;
          case Ea:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var rs = !1, Xn = null, Qn = null, Vn = null, du = /* @__PURE__ */ new Map(), hu = /* @__PURE__ */ new Map(), Kn = [], k0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Sh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Xn = null;
        break;
      case "dragenter":
      case "dragleave":
        Qn = null;
        break;
      case "mouseover":
      case "mouseout":
        Vn = null;
        break;
      case "pointerover":
      case "pointerout":
        du.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hu.delete(t.pointerId);
    }
  }
  function mu(e, t, n, l, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = jl(t), t !== null && ph(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function G0(e, t, n, l, u) {
    switch (t) {
      case "focusin":
        return Xn = mu(
          Xn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "dragenter":
        return Qn = mu(
          Qn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "mouseover":
        return Vn = mu(
          Vn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return du.set(
          c,
          mu(
            du.get(c) || null,
            e,
            t,
            n,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, hu.set(
          c,
          mu(
            hu.get(c) || null,
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
  function zh(e) {
    var t = Ml(e.target);
    if (t !== null) {
      var n = v(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, Zs(e.priority, function() {
              bh(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = T(n), t !== null) {
            e.blockedOn = t, Zs(e.priority, function() {
              bh(n);
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
  function Ni(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = os(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        oc = l, n.target.dispatchEvent(l), oc = null;
      } else
        return t = jl(n), t !== null && ph(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function xh(e, t, n) {
    Ni(e) && n.delete(t);
  }
  function L0() {
    rs = !1, Xn !== null && Ni(Xn) && (Xn = null), Qn !== null && Ni(Qn) && (Qn = null), Vn !== null && Ni(Vn) && (Vn = null), du.forEach(xh), hu.forEach(xh);
  }
  function Mi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, rs || (rs = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      L0
    )));
  }
  var ji = null;
  function Eh(e) {
    ji !== e && (ji = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ji === e && (ji = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (ss(l || n) === null)
              continue;
            break;
          }
          var c = jl(n);
          c !== null && (e.splice(t, 3), t -= 3, co(
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
  function fa(e) {
    function t(y) {
      return Mi(y, e);
    }
    Xn !== null && Mi(Xn, e), Qn !== null && Mi(Qn, e), Vn !== null && Mi(Vn, e), du.forEach(t), hu.forEach(t);
    for (var n = 0; n < Kn.length; n++) {
      var l = Kn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < Kn.length && (n = Kn[0], n.blockedOn === null); )
      zh(n), n.blockedOn === null && Kn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var u = n[l], c = n[l + 1], r = u[yt] || null;
        if (typeof c == "function")
          r || Eh(n);
        else if (r) {
          var d = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, r = c[yt] || null)
              d = r.formAction;
            else if (ss(u) !== null) continue;
          } else d = r.action;
          typeof d == "function" ? n[l + 1] = d : (n.splice(l, 3), l -= 3), Eh(n);
        }
      }
  }
  function Th() {
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
  function fs(e) {
    this._internalRoot = e;
  }
  Ci.prototype.render = fs.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var n = t.current, l = Dt();
    yh(n, l, e, t, null, null);
  }, Ci.prototype.unmount = fs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      yh(e.current, 2, null, e, null, null), fi(), t[Nl] = null;
    }
  };
  function Ci(e) {
    this._internalRoot = e;
  }
  Ci.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Us();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Kn.length && t !== 0 && t < Kn[n].priority; n++) ;
      Kn.splice(n, 0, e), n === 0 && zh(e);
    }
  };
  var Ah = i.version;
  if (Ah !== "19.2.3")
    throw Error(
      s(
        527,
        Ah,
        "19.2.3"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = g(t), e = e !== null ? Z(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var X0 = {
    bundleType: 0,
    version: "19.2.3",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.3"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Di = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Di.isDisabled && Di.supportsFiber)
      try {
        el = Di.inject(
          X0
        ), ot = Di;
      } catch {
      }
  }
  return yu.createRoot = function(e, t) {
    if (!f(e)) throw Error(s(299));
    var n = !1, l = "", u = wf, c = Uf, r = Zf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = mh(
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
      Th
    ), e[Nl] = t.current, Vo(e), new fs(t);
  }, yu.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(s(299));
    var l = !1, u = "", c = wf, r = Uf, d = Zf, y = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (r = n.onCaughtError), n.onRecoverableError !== void 0 && (d = n.onRecoverableError), n.formState !== void 0 && (y = n.formState)), t = mh(
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
      Th
    ), t.context = vh(null), n = t.current, l = Dt(), l = ll(l), u = Dn(l), u.callback = null, wn(n, u, l), n = l, t.current.lanes = n, ge(t, n), ln(t), e[Nl] = t.current, Vo(e), new Ci(t);
  }, yu.version = "19.2.3", yu;
}
var Rh;
function ey() {
  if (Rh) return ms.exports;
  Rh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), ms.exports = P0(), ms.exports;
}
var ty = ey();
const ny = /* @__PURE__ */ om(ty);
function D(a, i, o) {
  function s(T, x) {
    if (T._zod || Object.defineProperty(T, "_zod", {
      value: {
        def: x,
        constr: m,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), T._zod.traits.has(a))
      return;
    T._zod.traits.add(a), i(T, x);
    const g = m.prototype, Z = Object.keys(g);
    for (let U = 0; U < Z.length; U++) {
      const k = Z[U];
      k in T || (T[k] = g[k].bind(T));
    }
  }
  const f = o?.Parent ?? Object;
  class v extends f {
  }
  Object.defineProperty(v, "name", { value: a });
  function m(T) {
    var x;
    const g = o?.Parent ? new v() : this;
    s(g, T), (x = g._zod).deferred ?? (x.deferred = []);
    for (const Z of g._zod.deferred)
      Z();
    return g;
  }
  return Object.defineProperty(m, "init", { value: s }), Object.defineProperty(m, Symbol.hasInstance, {
    value: (T) => o?.Parent && T instanceof o.Parent ? !0 : T?._zod?.traits?.has(a)
  }), Object.defineProperty(m, "name", { value: a }), m;
}
class va extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class sm extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const rm = {};
function Jn(a) {
  return rm;
}
function ly(a) {
  const i = Object.values(a).filter((s) => typeof s == "number");
  return Object.entries(a).filter(([s, f]) => i.indexOf(+s) === -1).map(([s, f]) => f);
}
function Ss(a, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function As(a) {
  return {
    get value() {
      {
        const i = a();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function Os(a) {
  return a == null;
}
function Ns(a) {
  const i = a.startsWith("^") ? 1 : 0, o = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(i, o);
}
function ay(a, i) {
  const o = (a.toString().split(".")[1] || "").length, s = i.toString();
  let f = (s.split(".")[1] || "").length;
  if (f === 0 && /\d?e-\d?/.test(s)) {
    const x = s.match(/\d?e-(\d?)/);
    x?.[1] && (f = Number.parseInt(x[1]));
  }
  const v = o > f ? o : f, m = Number.parseInt(a.toFixed(v).replace(".", "")), T = Number.parseInt(i.toFixed(v).replace(".", ""));
  return m % T / 10 ** v;
}
const Hh = /* @__PURE__ */ Symbol("evaluating");
function je(a, i, o) {
  let s;
  Object.defineProperty(a, i, {
    get() {
      if (s !== Hh)
        return s === void 0 && (s = Hh, s = o()), s;
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
function Sl(a, i, o) {
  Object.defineProperty(a, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function zl(...a) {
  const i = {};
  for (const o of a) {
    const s = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, s);
  }
  return Object.defineProperties({}, i);
}
function qh(a) {
  return JSON.stringify(a);
}
function uy(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const fm = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function Hi(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const iy = As(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function ya(a) {
  if (Hi(a) === !1)
    return !1;
  const i = a.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !(Hi(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function dm(a) {
  return ya(a) ? { ...a } : Array.isArray(a) ? [...a] : a;
}
const cy = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ki(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Fn(a, i, o) {
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
function oy(a) {
  return Object.keys(a).filter((i) => a[i]._zod.optin === "optional" && a[i]._zod.optout === "optional");
}
const sy = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function ry(a, i) {
  const o = a._zod.def, s = zl(a._zod.def, {
    get shape() {
      const f = {};
      for (const v in i) {
        if (!(v in o.shape))
          throw new Error(`Unrecognized key: "${v}"`);
        i[v] && (f[v] = o.shape[v]);
      }
      return Sl(this, "shape", f), f;
    },
    checks: []
  });
  return Fn(a, s);
}
function fy(a, i) {
  const o = a._zod.def, s = zl(a._zod.def, {
    get shape() {
      const f = { ...a._zod.def.shape };
      for (const v in i) {
        if (!(v in o.shape))
          throw new Error(`Unrecognized key: "${v}"`);
        i[v] && delete f[v];
      }
      return Sl(this, "shape", f), f;
    },
    checks: []
  });
  return Fn(a, s);
}
function dy(a, i) {
  if (!ya(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = a._zod.def.checks;
  if (o && o.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const f = zl(a._zod.def, {
    get shape() {
      const v = { ...a._zod.def.shape, ...i };
      return Sl(this, "shape", v), v;
    },
    checks: []
  });
  return Fn(a, f);
}
function hy(a, i) {
  if (!ya(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = {
    ...a._zod.def,
    get shape() {
      const s = { ...a._zod.def.shape, ...i };
      return Sl(this, "shape", s), s;
    },
    checks: a._zod.def.checks
  };
  return Fn(a, o);
}
function my(a, i) {
  const o = zl(a._zod.def, {
    get shape() {
      const s = { ...a._zod.def.shape, ...i._zod.def.shape };
      return Sl(this, "shape", s), s;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Fn(a, o);
}
function vy(a, i, o) {
  const s = zl(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, v = { ...f };
      if (o)
        for (const m in o) {
          if (!(m in f))
            throw new Error(`Unrecognized key: "${m}"`);
          o[m] && (v[m] = a ? new a({
            type: "optional",
            innerType: f[m]
          }) : f[m]);
        }
      else
        for (const m in f)
          v[m] = a ? new a({
            type: "optional",
            innerType: f[m]
          }) : f[m];
      return Sl(this, "shape", v), v;
    },
    checks: []
  });
  return Fn(i, s);
}
function yy(a, i, o) {
  const s = zl(i._zod.def, {
    get shape() {
      const f = i._zod.def.shape, v = { ...f };
      if (o)
        for (const m in o) {
          if (!(m in v))
            throw new Error(`Unrecognized key: "${m}"`);
          o[m] && (v[m] = new a({
            type: "nonoptional",
            innerType: f[m]
          }));
        }
      else
        for (const m in f)
          v[m] = new a({
            type: "nonoptional",
            innerType: f[m]
          });
      return Sl(this, "shape", v), v;
    },
    checks: []
  });
  return Fn(i, s);
}
function da(a, i = 0) {
  if (a.aborted === !0)
    return !0;
  for (let o = i; o < a.issues.length; o++)
    if (a.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function ha(a, i) {
  return i.map((o) => {
    var s;
    return (s = o).path ?? (s.path = []), o.path.unshift(a), o;
  });
}
function wi(a) {
  return typeof a == "string" ? a : a?.message;
}
function Wn(a, i, o) {
  const s = { ...a, path: a.path ?? [] };
  if (!a.message) {
    const f = wi(a.inst?._zod.def?.error?.(a)) ?? wi(i?.error?.(a)) ?? wi(o.customError?.(a)) ?? wi(o.localeError?.(a)) ?? "Invalid input";
    s.message = f;
  }
  return delete s.inst, delete s.continue, i?.reportInput || delete s.input, s;
}
function Ms(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function gu(...a) {
  const [i, o, s] = a;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: s
  } : { ...i };
}
const hm = (a, i) => {
  a.name = "$ZodError", Object.defineProperty(a, "_zod", {
    value: a._zod,
    enumerable: !1
  }), Object.defineProperty(a, "issues", {
    value: i,
    enumerable: !1
  }), a.message = JSON.stringify(i, Ss, 2), Object.defineProperty(a, "toString", {
    value: () => a.message,
    enumerable: !1
  });
}, mm = D("$ZodError", hm), vm = D("$ZodError", hm, { Parent: Error });
function gy(a, i = (o) => o.message) {
  const o = {}, s = [];
  for (const f of a.issues)
    f.path.length > 0 ? (o[f.path[0]] = o[f.path[0]] || [], o[f.path[0]].push(i(f))) : s.push(i(f));
  return { formErrors: s, fieldErrors: o };
}
function py(a, i = (o) => o.message) {
  const o = { _errors: [] }, s = (f) => {
    for (const v of f.issues)
      if (v.code === "invalid_union" && v.errors.length)
        v.errors.map((m) => s({ issues: m }));
      else if (v.code === "invalid_key")
        s({ issues: v.issues });
      else if (v.code === "invalid_element")
        s({ issues: v.issues });
      else if (v.path.length === 0)
        o._errors.push(i(v));
      else {
        let m = o, T = 0;
        for (; T < v.path.length; ) {
          const x = v.path[T];
          T === v.path.length - 1 ? (m[x] = m[x] || { _errors: [] }, m[x]._errors.push(i(v))) : m[x] = m[x] || { _errors: [] }, m = m[x], T++;
        }
      }
  };
  return s(a), o;
}
const js = (a) => (i, o, s, f) => {
  const v = s ? Object.assign(s, { async: !1 }) : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, v);
  if (m instanceof Promise)
    throw new va();
  if (m.issues.length) {
    const T = new (f?.Err ?? a)(m.issues.map((x) => Wn(x, v, Jn())));
    throw fm(T, f?.callee), T;
  }
  return m.value;
}, Cs = (a) => async (i, o, s, f) => {
  const v = s ? Object.assign(s, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, v);
  if (m instanceof Promise && (m = await m), m.issues.length) {
    const T = new (f?.Err ?? a)(m.issues.map((x) => Wn(x, v, Jn())));
    throw fm(T, f?.callee), T;
  }
  return m.value;
}, Gi = (a) => (i, o, s) => {
  const f = s ? { ...s, async: !1 } : { async: !1 }, v = i._zod.run({ value: o, issues: [] }, f);
  if (v instanceof Promise)
    throw new va();
  return v.issues.length ? {
    success: !1,
    error: new (a ?? mm)(v.issues.map((m) => Wn(m, f, Jn())))
  } : { success: !0, data: v.value };
}, by = /* @__PURE__ */ Gi(vm), Li = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { async: !0 }) : { async: !0 };
  let v = i._zod.run({ value: o, issues: [] }, f);
  return v instanceof Promise && (v = await v), v.issues.length ? {
    success: !1,
    error: new a(v.issues.map((m) => Wn(m, f, Jn())))
  } : { success: !0, data: v.value };
}, _y = /* @__PURE__ */ Li(vm), Sy = (a) => (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return js(a)(i, o, f);
}, zy = (a) => (i, o, s) => js(a)(i, o, s), xy = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Cs(a)(i, o, f);
}, Ey = (a) => async (i, o, s) => Cs(a)(i, o, s), Ty = (a) => (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Gi(a)(i, o, f);
}, Ay = (a) => (i, o, s) => Gi(a)(i, o, s), Oy = (a) => async (i, o, s) => {
  const f = s ? Object.assign(s, { direction: "backward" }) : { direction: "backward" };
  return Li(a)(i, o, f);
}, Ny = (a) => async (i, o, s) => Li(a)(i, o, s), My = /^[cC][^\s-]{8,}$/, jy = /^[0-9a-z]+$/, Cy = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Dy = /^[0-9a-vA-V]{20}$/, wy = /^[A-Za-z0-9]{27}$/, Uy = /^[a-zA-Z0-9_-]{21}$/, Zy = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ry = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Bh = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Hy = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, qy = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function By() {
  return new RegExp(qy, "u");
}
const Yy = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ky = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Gy = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Ly = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Xy = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ym = /^[A-Za-z0-9_-]*$/, Qy = /^\+(?:[0-9]){6,14}[0-9]$/, gm = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Vy = /* @__PURE__ */ new RegExp(`^${gm}$`);
function pm(a) {
  const i = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${i}` : a.precision === 0 ? `${i}:[0-5]\\d` : `${i}:[0-5]\\d\\.\\d{${a.precision}}` : `${i}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Ky(a) {
  return new RegExp(`^${pm(a)}$`);
}
function $y(a) {
  const i = pm({ precision: a.precision }), o = ["Z"];
  a.local && o.push(""), a.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const s = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${gm}T(?:${s})$`);
}
const Jy = (a) => {
  const i = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, Wy = /^-?\d+$/, Fy = /^-?\d+(?:\.\d+)?/, Iy = /^[^A-Z]*$/, Py = /^[^a-z]*$/, xt = /* @__PURE__ */ D("$ZodCheck", (a, i) => {
  var o;
  a._zod ?? (a._zod = {}), a._zod.def = i, (o = a._zod).onattach ?? (o.onattach = []);
}), bm = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, _m = /* @__PURE__ */ D("$ZodCheckLessThan", (a, i) => {
  xt.init(a, i);
  const o = bm[typeof i.value];
  a._zod.onattach.push((s) => {
    const f = s._zod.bag, v = (i.inclusive ? f.maximum : f.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    i.value < v && (i.inclusive ? f.maximum = i.value : f.exclusiveMaximum = i.value);
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
}), Sm = /* @__PURE__ */ D("$ZodCheckGreaterThan", (a, i) => {
  xt.init(a, i);
  const o = bm[typeof i.value];
  a._zod.onattach.push((s) => {
    const f = s._zod.bag, v = (i.inclusive ? f.minimum : f.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    i.value > v && (i.inclusive ? f.minimum = i.value : f.exclusiveMinimum = i.value);
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
}), eg = /* @__PURE__ */ D("$ZodCheckMultipleOf", (a, i) => {
  xt.init(a, i), a._zod.onattach.push((o) => {
    var s;
    (s = o._zod.bag).multipleOf ?? (s.multipleOf = i.value);
  }), a._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : ay(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), tg = /* @__PURE__ */ D("$ZodCheckNumberFormat", (a, i) => {
  xt.init(a, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), s = o ? "int" : "number", [f, v] = sy[i.format];
  a._zod.onattach.push((m) => {
    const T = m._zod.bag;
    T.format = i.format, T.minimum = f, T.maximum = v, o && (T.pattern = Wy);
  }), a._zod.check = (m) => {
    const T = m.value;
    if (o) {
      if (!Number.isInteger(T)) {
        m.issues.push({
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
        T > 0 ? m.issues.push({
          input: T,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: s,
          continue: !i.abort
        }) : m.issues.push({
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
    T < f && m.issues.push({
      origin: "number",
      input: T,
      code: "too_small",
      minimum: f,
      inclusive: !0,
      inst: a,
      continue: !i.abort
    }), T > v && m.issues.push({
      origin: "number",
      input: T,
      code: "too_big",
      maximum: v,
      inst: a
    });
  };
}), ng = /* @__PURE__ */ D("$ZodCheckMaxLength", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Os(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < f && (s._zod.bag.maximum = i.maximum);
  }), a._zod.check = (s) => {
    const f = s.value;
    if (f.length <= i.maximum)
      return;
    const m = Ms(f);
    s.issues.push({
      origin: m,
      code: "too_big",
      maximum: i.maximum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !i.abort
    });
  };
}), lg = /* @__PURE__ */ D("$ZodCheckMinLength", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Os(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > f && (s._zod.bag.minimum = i.minimum);
  }), a._zod.check = (s) => {
    const f = s.value;
    if (f.length >= i.minimum)
      return;
    const m = Ms(f);
    s.issues.push({
      origin: m,
      code: "too_small",
      minimum: i.minimum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !i.abort
    });
  };
}), ag = /* @__PURE__ */ D("$ZodCheckLengthEquals", (a, i) => {
  var o;
  xt.init(a, i), (o = a._zod.def).when ?? (o.when = (s) => {
    const f = s.value;
    return !Os(f) && f.length !== void 0;
  }), a._zod.onattach.push((s) => {
    const f = s._zod.bag;
    f.minimum = i.length, f.maximum = i.length, f.length = i.length;
  }), a._zod.check = (s) => {
    const f = s.value, v = f.length;
    if (v === i.length)
      return;
    const m = Ms(f), T = v > i.length;
    s.issues.push({
      origin: m,
      ...T ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length },
      inclusive: !0,
      exact: !0,
      input: s.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Xi = /* @__PURE__ */ D("$ZodCheckStringFormat", (a, i) => {
  var o, s;
  xt.init(a, i), a._zod.onattach.push((f) => {
    const v = f._zod.bag;
    v.format = i.format, i.pattern && (v.patterns ?? (v.patterns = /* @__PURE__ */ new Set()), v.patterns.add(i.pattern));
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
}), ug = /* @__PURE__ */ D("$ZodCheckRegex", (a, i) => {
  Xi.init(a, i), a._zod.check = (o) => {
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
}), ig = /* @__PURE__ */ D("$ZodCheckLowerCase", (a, i) => {
  i.pattern ?? (i.pattern = Iy), Xi.init(a, i);
}), cg = /* @__PURE__ */ D("$ZodCheckUpperCase", (a, i) => {
  i.pattern ?? (i.pattern = Py), Xi.init(a, i);
}), og = /* @__PURE__ */ D("$ZodCheckIncludes", (a, i) => {
  xt.init(a, i);
  const o = ki(i.includes), s = new RegExp(typeof i.position == "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = s, a._zod.onattach.push((f) => {
    const v = f._zod.bag;
    v.patterns ?? (v.patterns = /* @__PURE__ */ new Set()), v.patterns.add(s);
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
}), sg = /* @__PURE__ */ D("$ZodCheckStartsWith", (a, i) => {
  xt.init(a, i);
  const o = new RegExp(`^${ki(i.prefix)}.*`);
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
}), rg = /* @__PURE__ */ D("$ZodCheckEndsWith", (a, i) => {
  xt.init(a, i);
  const o = new RegExp(`.*${ki(i.suffix)}$`);
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
}), fg = /* @__PURE__ */ D("$ZodCheckOverwrite", (a, i) => {
  xt.init(a, i), a._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
class dg {
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
`).filter((m) => m), f = Math.min(...s.map((m) => m.length - m.trimStart().length)), v = s.map((m) => m.slice(f)).map((m) => " ".repeat(this.indent * 2) + m);
    for (const m of v)
      this.content.push(m);
  }
  compile() {
    const i = Function, o = this?.args, f = [...(this?.content ?? [""]).map((v) => `  ${v}`)];
    return new i(...o, f.join(`
`));
  }
}
const hg = {
  major: 4,
  minor: 1,
  patch: 13
}, Xe = /* @__PURE__ */ D("$ZodType", (a, i) => {
  var o;
  a ?? (a = {}), a._zod.def = i, a._zod.bag = a._zod.bag || {}, a._zod.version = hg;
  const s = [...a._zod.def.checks ?? []];
  a._zod.traits.has("$ZodCheck") && s.unshift(a);
  for (const f of s)
    for (const v of f._zod.onattach)
      v(a);
  if (s.length === 0)
    (o = a._zod).deferred ?? (o.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const f = (m, T, x) => {
      let g = da(m), Z;
      for (const U of T) {
        if (U._zod.def.when) {
          if (!U._zod.def.when(m))
            continue;
        } else if (g)
          continue;
        const k = m.issues.length, ee = U._zod.check(m);
        if (ee instanceof Promise && x?.async === !1)
          throw new va();
        if (Z || ee instanceof Promise)
          Z = (Z ?? Promise.resolve()).then(async () => {
            await ee, m.issues.length !== k && (g || (g = da(m, k)));
          });
        else {
          if (m.issues.length === k)
            continue;
          g || (g = da(m, k));
        }
      }
      return Z ? Z.then(() => m) : m;
    }, v = (m, T, x) => {
      if (da(m))
        return m.aborted = !0, m;
      const g = f(T, s, x);
      if (g instanceof Promise) {
        if (x.async === !1)
          throw new va();
        return g.then((Z) => a._zod.parse(Z, x));
      }
      return a._zod.parse(g, x);
    };
    a._zod.run = (m, T) => {
      if (T.skipChecks)
        return a._zod.parse(m, T);
      if (T.direction === "backward") {
        const g = a._zod.parse({ value: m.value, issues: [] }, { ...T, skipChecks: !0 });
        return g instanceof Promise ? g.then((Z) => v(Z, m, T)) : v(g, m, T);
      }
      const x = a._zod.parse(m, T);
      if (x instanceof Promise) {
        if (T.async === !1)
          throw new va();
        return x.then((g) => f(g, s, T));
      }
      return f(x, s, T);
    };
  }
  a["~standard"] = {
    validate: (f) => {
      try {
        const v = by(a, f);
        return v.success ? { value: v.data } : { issues: v.error?.issues };
      } catch {
        return _y(a, f).then((m) => m.success ? { value: m.data } : { issues: m.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), Ds = /* @__PURE__ */ D("$ZodString", (a, i) => {
  Xe.init(a, i), a._zod.pattern = [...a?._zod.bag?.patterns ?? []].pop() ?? Jy(a._zod.bag), a._zod.parse = (o, s) => {
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
}), Ze = /* @__PURE__ */ D("$ZodStringFormat", (a, i) => {
  Xi.init(a, i), Ds.init(a, i);
}), mg = /* @__PURE__ */ D("$ZodGUID", (a, i) => {
  i.pattern ?? (i.pattern = Ry), Ze.init(a, i);
}), vg = /* @__PURE__ */ D("$ZodUUID", (a, i) => {
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
    i.pattern ?? (i.pattern = Bh(s));
  } else
    i.pattern ?? (i.pattern = Bh());
  Ze.init(a, i);
}), yg = /* @__PURE__ */ D("$ZodEmail", (a, i) => {
  i.pattern ?? (i.pattern = Hy), Ze.init(a, i);
}), gg = /* @__PURE__ */ D("$ZodURL", (a, i) => {
  Ze.init(a, i), a._zod.check = (o) => {
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
}), pg = /* @__PURE__ */ D("$ZodEmoji", (a, i) => {
  i.pattern ?? (i.pattern = By()), Ze.init(a, i);
}), bg = /* @__PURE__ */ D("$ZodNanoID", (a, i) => {
  i.pattern ?? (i.pattern = Uy), Ze.init(a, i);
}), _g = /* @__PURE__ */ D("$ZodCUID", (a, i) => {
  i.pattern ?? (i.pattern = My), Ze.init(a, i);
}), Sg = /* @__PURE__ */ D("$ZodCUID2", (a, i) => {
  i.pattern ?? (i.pattern = jy), Ze.init(a, i);
}), zg = /* @__PURE__ */ D("$ZodULID", (a, i) => {
  i.pattern ?? (i.pattern = Cy), Ze.init(a, i);
}), xg = /* @__PURE__ */ D("$ZodXID", (a, i) => {
  i.pattern ?? (i.pattern = Dy), Ze.init(a, i);
}), Eg = /* @__PURE__ */ D("$ZodKSUID", (a, i) => {
  i.pattern ?? (i.pattern = wy), Ze.init(a, i);
}), Tg = /* @__PURE__ */ D("$ZodISODateTime", (a, i) => {
  i.pattern ?? (i.pattern = $y(i)), Ze.init(a, i);
}), Ag = /* @__PURE__ */ D("$ZodISODate", (a, i) => {
  i.pattern ?? (i.pattern = Vy), Ze.init(a, i);
}), Og = /* @__PURE__ */ D("$ZodISOTime", (a, i) => {
  i.pattern ?? (i.pattern = Ky(i)), Ze.init(a, i);
}), Ng = /* @__PURE__ */ D("$ZodISODuration", (a, i) => {
  i.pattern ?? (i.pattern = Zy), Ze.init(a, i);
}), Mg = /* @__PURE__ */ D("$ZodIPv4", (a, i) => {
  i.pattern ?? (i.pattern = Yy), Ze.init(a, i), a._zod.bag.format = "ipv4";
}), jg = /* @__PURE__ */ D("$ZodIPv6", (a, i) => {
  i.pattern ?? (i.pattern = ky), Ze.init(a, i), a._zod.bag.format = "ipv6", a._zod.check = (o) => {
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
}), Cg = /* @__PURE__ */ D("$ZodCIDRv4", (a, i) => {
  i.pattern ?? (i.pattern = Gy), Ze.init(a, i);
}), Dg = /* @__PURE__ */ D("$ZodCIDRv6", (a, i) => {
  i.pattern ?? (i.pattern = Ly), Ze.init(a, i), a._zod.check = (o) => {
    const s = o.value.split("/");
    try {
      if (s.length !== 2)
        throw new Error();
      const [f, v] = s;
      if (!v)
        throw new Error();
      const m = Number(v);
      if (`${m}` !== v)
        throw new Error();
      if (m < 0 || m > 128)
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
function zm(a) {
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
const wg = /* @__PURE__ */ D("$ZodBase64", (a, i) => {
  i.pattern ?? (i.pattern = Xy), Ze.init(a, i), a._zod.bag.contentEncoding = "base64", a._zod.check = (o) => {
    zm(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
});
function Ug(a) {
  if (!ym.test(a))
    return !1;
  const i = a.replace(/[-_]/g, (s) => s === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return zm(o);
}
const Zg = /* @__PURE__ */ D("$ZodBase64URL", (a, i) => {
  i.pattern ?? (i.pattern = ym), Ze.init(a, i), a._zod.bag.contentEncoding = "base64url", a._zod.check = (o) => {
    Ug(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Rg = /* @__PURE__ */ D("$ZodE164", (a, i) => {
  i.pattern ?? (i.pattern = Qy), Ze.init(a, i);
});
function Hg(a, i = null) {
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
const qg = /* @__PURE__ */ D("$ZodJWT", (a, i) => {
  Ze.init(a, i), a._zod.check = (o) => {
    Hg(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), xm = /* @__PURE__ */ D("$ZodNumber", (a, i) => {
  Xe.init(a, i), a._zod.pattern = a._zod.bag.pattern ?? Fy, a._zod.parse = (o, s) => {
    if (i.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const f = o.value;
    if (typeof f == "number" && !Number.isNaN(f) && Number.isFinite(f))
      return o;
    const v = typeof f == "number" ? Number.isNaN(f) ? "NaN" : Number.isFinite(f) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: f,
      inst: a,
      ...v ? { received: v } : {}
    }), o;
  };
}), Bg = /* @__PURE__ */ D("$ZodNumberFormat", (a, i) => {
  tg.init(a, i), xm.init(a, i);
}), Yg = /* @__PURE__ */ D("$ZodUnknown", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o) => o;
}), kg = /* @__PURE__ */ D("$ZodNever", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o, s) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: a
  }), o);
});
function Yh(a, i, o) {
  a.issues.length && i.issues.push(...ha(o, a.issues)), i.value[o] = a.value;
}
const Gg = /* @__PURE__ */ D("$ZodArray", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value;
    if (!Array.isArray(f))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: f,
        inst: a
      }), o;
    o.value = Array(f.length);
    const v = [];
    for (let m = 0; m < f.length; m++) {
      const T = f[m], x = i.element._zod.run({
        value: T,
        issues: []
      }, s);
      x instanceof Promise ? v.push(x.then((g) => Yh(g, o, m))) : Yh(x, o, m);
    }
    return v.length ? Promise.all(v).then(() => o) : o;
  };
});
function qi(a, i, o, s) {
  a.issues.length && i.issues.push(...ha(o, a.issues)), a.value === void 0 ? o in s && (i.value[o] = void 0) : i.value[o] = a.value;
}
function Em(a) {
  const i = Object.keys(a.shape);
  for (const s of i)
    if (!a.shape?.[s]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${s}": expected a Zod schema`);
  const o = oy(a.shape);
  return {
    ...a,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function Tm(a, i, o, s, f, v) {
  const m = [], T = f.keySet, x = f.catchall._zod, g = x.def.type;
  for (const Z in i) {
    if (T.has(Z))
      continue;
    if (g === "never") {
      m.push(Z);
      continue;
    }
    const U = x.run({ value: i[Z], issues: [] }, s);
    U instanceof Promise ? a.push(U.then((k) => qi(k, o, Z, i))) : qi(U, o, Z, i);
  }
  return m.length && o.issues.push({
    code: "unrecognized_keys",
    keys: m,
    input: i,
    inst: v
  }), a.length ? Promise.all(a).then(() => o) : o;
}
const Lg = /* @__PURE__ */ D("$ZodObject", (a, i) => {
  if (Xe.init(a, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    const T = i.shape;
    Object.defineProperty(i, "shape", {
      get: () => {
        const x = { ...T };
        return Object.defineProperty(i, "shape", {
          value: x
        }), x;
      }
    });
  }
  const s = As(() => Em(i));
  je(a._zod, "propValues", () => {
    const T = i.shape, x = {};
    for (const g in T) {
      const Z = T[g]._zod;
      if (Z.values) {
        x[g] ?? (x[g] = /* @__PURE__ */ new Set());
        for (const U of Z.values)
          x[g].add(U);
      }
    }
    return x;
  });
  const f = Hi, v = i.catchall;
  let m;
  a._zod.parse = (T, x) => {
    m ?? (m = s.value);
    const g = T.value;
    if (!f(g))
      return T.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: a
      }), T;
    T.value = {};
    const Z = [], U = m.shape;
    for (const k of m.keys) {
      const he = U[k]._zod.run({ value: g[k], issues: [] }, x);
      he instanceof Promise ? Z.push(he.then((Oe) => qi(Oe, T, k, g))) : qi(he, T, k, g);
    }
    return v ? Tm(Z, g, T, x, s.value, a) : Z.length ? Promise.all(Z).then(() => T) : T;
  };
}), Xg = /* @__PURE__ */ D("$ZodObjectJIT", (a, i) => {
  Lg.init(a, i);
  const o = a._zod.parse, s = As(() => Em(i)), f = (k) => {
    const ee = new dg(["shape", "payload", "ctx"]), he = s.value, Oe = (F) => {
      const I = qh(F);
      return `shape[${I}]._zod.run({ value: input[${I}], issues: [] }, ctx)`;
    };
    ee.write("const input = payload.value;");
    const Ce = /* @__PURE__ */ Object.create(null);
    let Se = 0;
    for (const F of he.keys)
      Ce[F] = `key_${Se++}`;
    ee.write("const newResult = {};");
    for (const F of he.keys) {
      const I = Ce[F], ke = qh(F);
      ee.write(`const ${I} = ${Oe(F)};`), ee.write(`
        if (${I}.issues.length) {
          payload.issues = payload.issues.concat(${I}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${ke}, ...iss.path] : [${ke}]
          })));
        }
        
        
        if (${I}.value === undefined) {
          if (${ke} in input) {
            newResult[${ke}] = undefined;
          }
        } else {
          newResult[${ke}] = ${I}.value;
        }
        
      `);
    }
    ee.write("payload.value = newResult;"), ee.write("return payload;");
    const mt = ee.compile();
    return (F, I) => mt(k, F, I);
  };
  let v;
  const m = Hi, T = !rm.jitless, g = T && iy.value, Z = i.catchall;
  let U;
  a._zod.parse = (k, ee) => {
    U ?? (U = s.value);
    const he = k.value;
    return m(he) ? T && g && ee?.async === !1 && ee.jitless !== !0 ? (v || (v = f(i.shape)), k = v(k, ee), Z ? Tm([], he, k, ee, U, a) : k) : o(k, ee) : (k.issues.push({
      expected: "object",
      code: "invalid_type",
      input: he,
      inst: a
    }), k);
  };
});
function kh(a, i, o, s) {
  for (const v of a)
    if (v.issues.length === 0)
      return i.value = v.value, i;
  const f = a.filter((v) => !da(v));
  return f.length === 1 ? (i.value = f[0].value, f[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: a.map((v) => v.issues.map((m) => Wn(m, s, Jn())))
  }), i);
}
const Qg = /* @__PURE__ */ D("$ZodUnion", (a, i) => {
  Xe.init(a, i), je(a._zod, "optin", () => i.options.some((f) => f._zod.optin === "optional") ? "optional" : void 0), je(a._zod, "optout", () => i.options.some((f) => f._zod.optout === "optional") ? "optional" : void 0), je(a._zod, "values", () => {
    if (i.options.every((f) => f._zod.values))
      return new Set(i.options.flatMap((f) => Array.from(f._zod.values)));
  }), je(a._zod, "pattern", () => {
    if (i.options.every((f) => f._zod.pattern)) {
      const f = i.options.map((v) => v._zod.pattern);
      return new RegExp(`^(${f.map((v) => Ns(v.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, s = i.options[0]._zod.run;
  a._zod.parse = (f, v) => {
    if (o)
      return s(f, v);
    let m = !1;
    const T = [];
    for (const x of i.options) {
      const g = x._zod.run({
        value: f.value,
        issues: []
      }, v);
      if (g instanceof Promise)
        T.push(g), m = !0;
      else {
        if (g.issues.length === 0)
          return g;
        T.push(g);
      }
    }
    return m ? Promise.all(T).then((x) => kh(x, f, a, v)) : kh(T, f, a, v);
  };
}), Vg = /* @__PURE__ */ D("$ZodIntersection", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value, v = i.left._zod.run({ value: f, issues: [] }, s), m = i.right._zod.run({ value: f, issues: [] }, s);
    return v instanceof Promise || m instanceof Promise ? Promise.all([v, m]).then(([x, g]) => Gh(o, x, g)) : Gh(o, v, m);
  };
});
function zs(a, i) {
  if (a === i)
    return { valid: !0, data: a };
  if (a instanceof Date && i instanceof Date && +a == +i)
    return { valid: !0, data: a };
  if (ya(a) && ya(i)) {
    const o = Object.keys(i), s = Object.keys(a).filter((v) => o.indexOf(v) !== -1), f = { ...a, ...i };
    for (const v of s) {
      const m = zs(a[v], i[v]);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [v, ...m.mergeErrorPath]
        };
      f[v] = m.data;
    }
    return { valid: !0, data: f };
  }
  if (Array.isArray(a) && Array.isArray(i)) {
    if (a.length !== i.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let s = 0; s < a.length; s++) {
      const f = a[s], v = i[s], m = zs(f, v);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...m.mergeErrorPath]
        };
      o.push(m.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Gh(a, i, o) {
  if (i.issues.length && a.issues.push(...i.issues), o.issues.length && a.issues.push(...o.issues), da(a))
    return a;
  const s = zs(i.value, o.value);
  if (!s.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);
  return a.value = s.data, a;
}
const Kg = /* @__PURE__ */ D("$ZodRecord", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o, s) => {
    const f = o.value;
    if (!ya(f))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: f,
        inst: a
      }), o;
    const v = [], m = i.keyType._zod.values;
    if (m) {
      o.value = {};
      const T = /* @__PURE__ */ new Set();
      for (const g of m)
        if (typeof g == "string" || typeof g == "number" || typeof g == "symbol") {
          T.add(typeof g == "number" ? g.toString() : g);
          const Z = i.valueType._zod.run({ value: f[g], issues: [] }, s);
          Z instanceof Promise ? v.push(Z.then((U) => {
            U.issues.length && o.issues.push(...ha(g, U.issues)), o.value[g] = U.value;
          })) : (Z.issues.length && o.issues.push(...ha(g, Z.issues)), o.value[g] = Z.value);
        }
      let x;
      for (const g in f)
        T.has(g) || (x = x ?? [], x.push(g));
      x && x.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: f,
        inst: a,
        keys: x
      });
    } else {
      o.value = {};
      for (const T of Reflect.ownKeys(f)) {
        if (T === "__proto__")
          continue;
        const x = i.keyType._zod.run({ value: T, issues: [] }, s);
        if (x instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (x.issues.length) {
          o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: x.issues.map((Z) => Wn(Z, s, Jn())),
            input: T,
            path: [T],
            inst: a
          }), o.value[x.value] = x.value;
          continue;
        }
        const g = i.valueType._zod.run({ value: f[T], issues: [] }, s);
        g instanceof Promise ? v.push(g.then((Z) => {
          Z.issues.length && o.issues.push(...ha(T, Z.issues)), o.value[x.value] = Z.value;
        })) : (g.issues.length && o.issues.push(...ha(T, g.issues)), o.value[x.value] = g.value);
      }
    }
    return v.length ? Promise.all(v).then(() => o) : o;
  };
}), $g = /* @__PURE__ */ D("$ZodEnum", (a, i) => {
  Xe.init(a, i);
  const o = ly(i.entries), s = new Set(o);
  a._zod.values = s, a._zod.pattern = new RegExp(`^(${o.filter((f) => cy.has(typeof f)).map((f) => typeof f == "string" ? ki(f) : f.toString()).join("|")})$`), a._zod.parse = (f, v) => {
    const m = f.value;
    return s.has(m) || f.issues.push({
      code: "invalid_value",
      values: o,
      input: m,
      inst: a
    }), f;
  };
}), Jg = /* @__PURE__ */ D("$ZodTransform", (a, i) => {
  Xe.init(a, i), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      throw new sm(a.constructor.name);
    const f = i.transform(o.value, o);
    if (s.async)
      return (f instanceof Promise ? f : Promise.resolve(f)).then((m) => (o.value = m, o));
    if (f instanceof Promise)
      throw new va();
    return o.value = f, o;
  };
});
function Lh(a, i) {
  return a.issues.length && i === void 0 ? { issues: [], value: void 0 } : a;
}
const Wg = /* @__PURE__ */ D("$ZodOptional", (a, i) => {
  Xe.init(a, i), a._zod.optin = "optional", a._zod.optout = "optional", je(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), je(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${Ns(o.source)})?$`) : void 0;
  }), a._zod.parse = (o, s) => {
    if (i.innerType._zod.optin === "optional") {
      const f = i.innerType._zod.run(o, s);
      return f instanceof Promise ? f.then((v) => Lh(v, o.value)) : Lh(f, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, s);
  };
}), Fg = /* @__PURE__ */ D("$ZodNullable", (a, i) => {
  Xe.init(a, i), je(a._zod, "optin", () => i.innerType._zod.optin), je(a._zod, "optout", () => i.innerType._zod.optout), je(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${Ns(o.source)}|null)$`) : void 0;
  }), je(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), a._zod.parse = (o, s) => o.value === null ? o : i.innerType._zod.run(o, s);
}), Ig = /* @__PURE__ */ D("$ZodDefault", (a, i) => {
  Xe.init(a, i), a._zod.optin = "optional", je(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((v) => Xh(v, i)) : Xh(f, i);
  };
});
function Xh(a, i) {
  return a.value === void 0 && (a.value = i.defaultValue), a;
}
const Pg = /* @__PURE__ */ D("$ZodPrefault", (a, i) => {
  Xe.init(a, i), a._zod.optin = "optional", je(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => (s.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, s));
}), ep = /* @__PURE__ */ D("$ZodNonOptional", (a, i) => {
  Xe.init(a, i), je(a._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((s) => s !== void 0)) : void 0;
  }), a._zod.parse = (o, s) => {
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((v) => Qh(v, a)) : Qh(f, a);
  };
});
function Qh(a, i) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: i
  }), a;
}
const tp = /* @__PURE__ */ D("$ZodCatch", (a, i) => {
  Xe.init(a, i), je(a._zod, "optin", () => i.innerType._zod.optin), je(a._zod, "optout", () => i.innerType._zod.optout), je(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then((v) => (o.value = v.value, v.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: v.issues.map((m) => Wn(m, s, Jn()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = f.value, f.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: f.issues.map((v) => Wn(v, s, Jn()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), np = /* @__PURE__ */ D("$ZodPipe", (a, i) => {
  Xe.init(a, i), je(a._zod, "values", () => i.in._zod.values), je(a._zod, "optin", () => i.in._zod.optin), je(a._zod, "optout", () => i.out._zod.optout), je(a._zod, "propValues", () => i.in._zod.propValues), a._zod.parse = (o, s) => {
    if (s.direction === "backward") {
      const v = i.out._zod.run(o, s);
      return v instanceof Promise ? v.then((m) => Ui(m, i.in, s)) : Ui(v, i.in, s);
    }
    const f = i.in._zod.run(o, s);
    return f instanceof Promise ? f.then((v) => Ui(v, i.out, s)) : Ui(f, i.out, s);
  };
});
function Ui(a, i, o) {
  return a.issues.length ? (a.aborted = !0, a) : i._zod.run({ value: a.value, issues: a.issues }, o);
}
const lp = /* @__PURE__ */ D("$ZodReadonly", (a, i) => {
  Xe.init(a, i), je(a._zod, "propValues", () => i.innerType._zod.propValues), je(a._zod, "values", () => i.innerType._zod.values), je(a._zod, "optin", () => i.innerType?._zod?.optin), je(a._zod, "optout", () => i.innerType?._zod?.optout), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      return i.innerType._zod.run(o, s);
    const f = i.innerType._zod.run(o, s);
    return f instanceof Promise ? f.then(Vh) : Vh(f);
  };
});
function Vh(a) {
  return a.value = Object.freeze(a.value), a;
}
const ap = /* @__PURE__ */ D("$ZodCustom", (a, i) => {
  xt.init(a, i), Xe.init(a, i), a._zod.parse = (o, s) => o, a._zod.check = (o) => {
    const s = o.value, f = i.fn(s);
    if (f instanceof Promise)
      return f.then((v) => Kh(v, o, s, a));
    Kh(f, o, s, a);
  };
});
function Kh(a, i, o, s) {
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
    s._zod.def.params && (f.params = s._zod.def.params), i.issues.push(gu(f));
  }
}
var $h;
class up {
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
function ip() {
  return new up();
}
($h = globalThis).__zod_globalRegistry ?? ($h.__zod_globalRegistry = ip());
const Zi = globalThis.__zod_globalRegistry;
function cp(a, i) {
  return new a({
    type: "string",
    ...V(i)
  });
}
function op(a, i) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Jh(a, i) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function sp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function rp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...V(i)
  });
}
function fp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...V(i)
  });
}
function dp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...V(i)
  });
}
function hp(a, i) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function mp(a, i) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function vp(a, i) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function yp(a, i) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function gp(a, i) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function pp(a, i) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function bp(a, i) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function _p(a, i) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Sp(a, i) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function zp(a, i) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function xp(a, i) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Ep(a, i) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Tp(a, i) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Ap(a, i) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Op(a, i) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Np(a, i) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...V(i)
  });
}
function Mp(a, i) {
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
function jp(a, i) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...V(i)
  });
}
function Cp(a, i) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...V(i)
  });
}
function Dp(a, i) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...V(i)
  });
}
function wp(a, i) {
  return new a({
    type: "number",
    checks: [],
    ...V(i)
  });
}
function Up(a, i) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...V(i)
  });
}
function Zp(a) {
  return new a({
    type: "unknown"
  });
}
function Rp(a, i) {
  return new a({
    type: "never",
    ...V(i)
  });
}
function Wh(a, i) {
  return new _m({
    check: "less_than",
    ...V(i),
    value: a,
    inclusive: !1
  });
}
function ps(a, i) {
  return new _m({
    check: "less_than",
    ...V(i),
    value: a,
    inclusive: !0
  });
}
function Fh(a, i) {
  return new Sm({
    check: "greater_than",
    ...V(i),
    value: a,
    inclusive: !1
  });
}
function bs(a, i) {
  return new Sm({
    check: "greater_than",
    ...V(i),
    value: a,
    inclusive: !0
  });
}
function Ih(a, i) {
  return new eg({
    check: "multiple_of",
    ...V(i),
    value: a
  });
}
function Am(a, i) {
  return new ng({
    check: "max_length",
    ...V(i),
    maximum: a
  });
}
function Bi(a, i) {
  return new lg({
    check: "min_length",
    ...V(i),
    minimum: a
  });
}
function Om(a, i) {
  return new ag({
    check: "length_equals",
    ...V(i),
    length: a
  });
}
function Hp(a, i) {
  return new ug({
    check: "string_format",
    format: "regex",
    ...V(i),
    pattern: a
  });
}
function qp(a) {
  return new ig({
    check: "string_format",
    format: "lowercase",
    ...V(a)
  });
}
function Bp(a) {
  return new cg({
    check: "string_format",
    format: "uppercase",
    ...V(a)
  });
}
function Yp(a, i) {
  return new og({
    check: "string_format",
    format: "includes",
    ...V(i),
    includes: a
  });
}
function kp(a, i) {
  return new sg({
    check: "string_format",
    format: "starts_with",
    ...V(i),
    prefix: a
  });
}
function Gp(a, i) {
  return new rg({
    check: "string_format",
    format: "ends_with",
    ...V(i),
    suffix: a
  });
}
function pa(a) {
  return new fg({
    check: "overwrite",
    tx: a
  });
}
function Lp(a) {
  return pa((i) => i.normalize(a));
}
function Xp() {
  return pa((a) => a.trim());
}
function Qp() {
  return pa((a) => a.toLowerCase());
}
function Vp() {
  return pa((a) => a.toUpperCase());
}
function Kp() {
  return pa((a) => uy(a));
}
function $p(a, i, o) {
  return new a({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...V(o)
  });
}
function Jp(a, i, o) {
  return new a({
    type: "custom",
    check: "custom",
    fn: i,
    ...V(o)
  });
}
function Wp(a) {
  const i = Fp((o) => (o.addIssue = (s) => {
    if (typeof s == "string")
      o.issues.push(gu(s, o.value, i._zod.def));
    else {
      const f = s;
      f.fatal && (f.continue = !1), f.code ?? (f.code = "custom"), f.input ?? (f.input = o.value), f.inst ?? (f.inst = i), f.continue ?? (f.continue = !i._zod.def.abort), o.issues.push(gu(f));
    }
  }, a(o.value, o)));
  return i;
}
function Fp(a, i) {
  const o = new xt({
    check: "custom",
    ...V(i)
  });
  return o._zod.check = a, o;
}
const Ip = /* @__PURE__ */ D("ZodISODateTime", (a, i) => {
  Tg.init(a, i), He.init(a, i);
});
function Pp(a) {
  return Mp(Ip, a);
}
const e1 = /* @__PURE__ */ D("ZodISODate", (a, i) => {
  Ag.init(a, i), He.init(a, i);
});
function t1(a) {
  return jp(e1, a);
}
const n1 = /* @__PURE__ */ D("ZodISOTime", (a, i) => {
  Og.init(a, i), He.init(a, i);
});
function l1(a) {
  return Cp(n1, a);
}
const a1 = /* @__PURE__ */ D("ZodISODuration", (a, i) => {
  Ng.init(a, i), He.init(a, i);
});
function u1(a) {
  return Dp(a1, a);
}
const i1 = (a, i) => {
  mm.init(a, i), a.name = "ZodError", Object.defineProperties(a, {
    format: {
      value: (o) => py(a, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => gy(a, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        a.issues.push(o), a.message = JSON.stringify(a.issues, Ss, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        a.issues.push(...o), a.message = JSON.stringify(a.issues, Ss, 2);
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
}, Qt = D("ZodError", i1, {
  Parent: Error
}), c1 = /* @__PURE__ */ js(Qt), o1 = /* @__PURE__ */ Cs(Qt), s1 = /* @__PURE__ */ Gi(Qt), r1 = /* @__PURE__ */ Li(Qt), f1 = /* @__PURE__ */ Sy(Qt), d1 = /* @__PURE__ */ zy(Qt), h1 = /* @__PURE__ */ xy(Qt), m1 = /* @__PURE__ */ Ey(Qt), v1 = /* @__PURE__ */ Ty(Qt), y1 = /* @__PURE__ */ Ay(Qt), g1 = /* @__PURE__ */ Oy(Qt), p1 = /* @__PURE__ */ Ny(Qt), We = /* @__PURE__ */ D("ZodType", (a, i) => (Xe.init(a, i), a.def = i, a.type = i.type, Object.defineProperty(a, "_def", { value: i }), a.check = (...o) => a.clone(zl(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((s) => typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s)
  ]
})), a.clone = (o, s) => Fn(a, o, s), a.brand = () => a, a.register = ((o, s) => (o.add(a, s), a)), a.parse = (o, s) => c1(a, o, s, { callee: a.parse }), a.safeParse = (o, s) => s1(a, o, s), a.parseAsync = async (o, s) => o1(a, o, s, { callee: a.parseAsync }), a.safeParseAsync = async (o, s) => r1(a, o, s), a.spa = a.safeParseAsync, a.encode = (o, s) => f1(a, o, s), a.decode = (o, s) => d1(a, o, s), a.encodeAsync = async (o, s) => h1(a, o, s), a.decodeAsync = async (o, s) => m1(a, o, s), a.safeEncode = (o, s) => v1(a, o, s), a.safeDecode = (o, s) => y1(a, o, s), a.safeEncodeAsync = async (o, s) => g1(a, o, s), a.safeDecodeAsync = async (o, s) => p1(a, o, s), a.refine = (o, s) => a.check(o2(o, s)), a.superRefine = (o) => a.check(s2(o)), a.overwrite = (o) => a.check(pa(o)), a.optional = () => nm(a), a.nullable = () => lm(a), a.nullish = () => nm(lm(a)), a.nonoptional = (o) => t2(a, o), a.array = () => pu(a), a.or = (o) => X1([a, o]), a.and = (o) => V1(a, o), a.transform = (o) => am(a, J1(o)), a.default = (o) => I1(a, o), a.prefault = (o) => e2(a, o), a.catch = (o) => l2(a, o), a.pipe = (o) => am(a, o), a.readonly = () => i2(a), a.describe = (o) => {
  const s = a.clone();
  return Zi.add(s, { description: o }), s;
}, Object.defineProperty(a, "description", {
  get() {
    return Zi.get(a)?.description;
  },
  configurable: !0
}), a.meta = (...o) => {
  if (o.length === 0)
    return Zi.get(a);
  const s = a.clone();
  return Zi.add(s, o[0]), s;
}, a.isOptional = () => a.safeParse(void 0).success, a.isNullable = () => a.safeParse(null).success, a)), Nm = /* @__PURE__ */ D("_ZodString", (a, i) => {
  Ds.init(a, i), We.init(a, i);
  const o = a._zod.bag;
  a.format = o.format ?? null, a.minLength = o.minimum ?? null, a.maxLength = o.maximum ?? null, a.regex = (...s) => a.check(Hp(...s)), a.includes = (...s) => a.check(Yp(...s)), a.startsWith = (...s) => a.check(kp(...s)), a.endsWith = (...s) => a.check(Gp(...s)), a.min = (...s) => a.check(Bi(...s)), a.max = (...s) => a.check(Am(...s)), a.length = (...s) => a.check(Om(...s)), a.nonempty = (...s) => a.check(Bi(1, ...s)), a.lowercase = (s) => a.check(qp(s)), a.uppercase = (s) => a.check(Bp(s)), a.trim = () => a.check(Xp()), a.normalize = (...s) => a.check(Lp(...s)), a.toLowerCase = () => a.check(Qp()), a.toUpperCase = () => a.check(Vp()), a.slugify = () => a.check(Kp());
}), b1 = /* @__PURE__ */ D("ZodString", (a, i) => {
  Ds.init(a, i), Nm.init(a, i), a.email = (o) => a.check(op(_1, o)), a.url = (o) => a.check(hp(S1, o)), a.jwt = (o) => a.check(Np(R1, o)), a.emoji = (o) => a.check(mp(z1, o)), a.guid = (o) => a.check(Jh(Ph, o)), a.uuid = (o) => a.check(sp(Ri, o)), a.uuidv4 = (o) => a.check(rp(Ri, o)), a.uuidv6 = (o) => a.check(fp(Ri, o)), a.uuidv7 = (o) => a.check(dp(Ri, o)), a.nanoid = (o) => a.check(vp(x1, o)), a.guid = (o) => a.check(Jh(Ph, o)), a.cuid = (o) => a.check(yp(E1, o)), a.cuid2 = (o) => a.check(gp(T1, o)), a.ulid = (o) => a.check(pp(A1, o)), a.base64 = (o) => a.check(Tp(w1, o)), a.base64url = (o) => a.check(Ap(U1, o)), a.xid = (o) => a.check(bp(O1, o)), a.ksuid = (o) => a.check(_p(N1, o)), a.ipv4 = (o) => a.check(Sp(M1, o)), a.ipv6 = (o) => a.check(zp(j1, o)), a.cidrv4 = (o) => a.check(xp(C1, o)), a.cidrv6 = (o) => a.check(Ep(D1, o)), a.e164 = (o) => a.check(Op(Z1, o)), a.datetime = (o) => a.check(Pp(o)), a.date = (o) => a.check(t1(o)), a.time = (o) => a.check(l1(o)), a.duration = (o) => a.check(u1(o));
});
function Re(a) {
  return cp(b1, a);
}
const He = /* @__PURE__ */ D("ZodStringFormat", (a, i) => {
  Ze.init(a, i), Nm.init(a, i);
}), _1 = /* @__PURE__ */ D("ZodEmail", (a, i) => {
  yg.init(a, i), He.init(a, i);
}), Ph = /* @__PURE__ */ D("ZodGUID", (a, i) => {
  mg.init(a, i), He.init(a, i);
}), Ri = /* @__PURE__ */ D("ZodUUID", (a, i) => {
  vg.init(a, i), He.init(a, i);
}), S1 = /* @__PURE__ */ D("ZodURL", (a, i) => {
  gg.init(a, i), He.init(a, i);
}), z1 = /* @__PURE__ */ D("ZodEmoji", (a, i) => {
  pg.init(a, i), He.init(a, i);
}), x1 = /* @__PURE__ */ D("ZodNanoID", (a, i) => {
  bg.init(a, i), He.init(a, i);
}), E1 = /* @__PURE__ */ D("ZodCUID", (a, i) => {
  _g.init(a, i), He.init(a, i);
}), T1 = /* @__PURE__ */ D("ZodCUID2", (a, i) => {
  Sg.init(a, i), He.init(a, i);
}), A1 = /* @__PURE__ */ D("ZodULID", (a, i) => {
  zg.init(a, i), He.init(a, i);
}), O1 = /* @__PURE__ */ D("ZodXID", (a, i) => {
  xg.init(a, i), He.init(a, i);
}), N1 = /* @__PURE__ */ D("ZodKSUID", (a, i) => {
  Eg.init(a, i), He.init(a, i);
}), M1 = /* @__PURE__ */ D("ZodIPv4", (a, i) => {
  Mg.init(a, i), He.init(a, i);
}), j1 = /* @__PURE__ */ D("ZodIPv6", (a, i) => {
  jg.init(a, i), He.init(a, i);
}), C1 = /* @__PURE__ */ D("ZodCIDRv4", (a, i) => {
  Cg.init(a, i), He.init(a, i);
}), D1 = /* @__PURE__ */ D("ZodCIDRv6", (a, i) => {
  Dg.init(a, i), He.init(a, i);
}), w1 = /* @__PURE__ */ D("ZodBase64", (a, i) => {
  wg.init(a, i), He.init(a, i);
}), U1 = /* @__PURE__ */ D("ZodBase64URL", (a, i) => {
  Zg.init(a, i), He.init(a, i);
}), Z1 = /* @__PURE__ */ D("ZodE164", (a, i) => {
  Rg.init(a, i), He.init(a, i);
}), R1 = /* @__PURE__ */ D("ZodJWT", (a, i) => {
  qg.init(a, i), He.init(a, i);
}), Mm = /* @__PURE__ */ D("ZodNumber", (a, i) => {
  xm.init(a, i), We.init(a, i), a.gt = (s, f) => a.check(Fh(s, f)), a.gte = (s, f) => a.check(bs(s, f)), a.min = (s, f) => a.check(bs(s, f)), a.lt = (s, f) => a.check(Wh(s, f)), a.lte = (s, f) => a.check(ps(s, f)), a.max = (s, f) => a.check(ps(s, f)), a.int = (s) => a.check(tm(s)), a.safe = (s) => a.check(tm(s)), a.positive = (s) => a.check(Fh(0, s)), a.nonnegative = (s) => a.check(bs(0, s)), a.negative = (s) => a.check(Wh(0, s)), a.nonpositive = (s) => a.check(ps(0, s)), a.multipleOf = (s, f) => a.check(Ih(s, f)), a.step = (s, f) => a.check(Ih(s, f)), a.finite = () => a;
  const o = a._zod.bag;
  a.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, a.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, a.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), a.isFinite = !0, a.format = o.format ?? null;
});
function em(a) {
  return wp(Mm, a);
}
const H1 = /* @__PURE__ */ D("ZodNumberFormat", (a, i) => {
  Bg.init(a, i), Mm.init(a, i);
});
function tm(a) {
  return Up(H1, a);
}
const q1 = /* @__PURE__ */ D("ZodUnknown", (a, i) => {
  Yg.init(a, i), We.init(a, i);
});
function Yi() {
  return Zp(q1);
}
const B1 = /* @__PURE__ */ D("ZodNever", (a, i) => {
  kg.init(a, i), We.init(a, i);
});
function Y1(a) {
  return Rp(B1, a);
}
const k1 = /* @__PURE__ */ D("ZodArray", (a, i) => {
  Gg.init(a, i), We.init(a, i), a.element = i.element, a.min = (o, s) => a.check(Bi(o, s)), a.nonempty = (o) => a.check(Bi(1, o)), a.max = (o, s) => a.check(Am(o, s)), a.length = (o, s) => a.check(Om(o, s)), a.unwrap = () => a.element;
});
function pu(a, i) {
  return $p(k1, a, i);
}
const G1 = /* @__PURE__ */ D("ZodObject", (a, i) => {
  Xg.init(a, i), We.init(a, i), je(a, "shape", () => i.shape), a.keyof = () => ga(Object.keys(a._zod.def.shape)), a.catchall = (o) => a.clone({ ...a._zod.def, catchall: o }), a.passthrough = () => a.clone({ ...a._zod.def, catchall: Yi() }), a.loose = () => a.clone({ ...a._zod.def, catchall: Yi() }), a.strict = () => a.clone({ ...a._zod.def, catchall: Y1() }), a.strip = () => a.clone({ ...a._zod.def, catchall: void 0 }), a.extend = (o) => dy(a, o), a.safeExtend = (o) => hy(a, o), a.merge = (o) => my(a, o), a.pick = (o) => ry(a, o), a.omit = (o) => fy(a, o), a.partial = (...o) => vy(Cm, a, o[0]), a.required = (...o) => yy(Dm, a, o[0]);
});
function Qi(a, i) {
  const o = {
    type: "object",
    shape: a ?? {},
    ...V(i)
  };
  return new G1(o);
}
const L1 = /* @__PURE__ */ D("ZodUnion", (a, i) => {
  Qg.init(a, i), We.init(a, i), a.options = i.options;
});
function X1(a, i) {
  return new L1({
    type: "union",
    options: a,
    ...V(i)
  });
}
const Q1 = /* @__PURE__ */ D("ZodIntersection", (a, i) => {
  Vg.init(a, i), We.init(a, i);
});
function V1(a, i) {
  return new Q1({
    type: "intersection",
    left: a,
    right: i
  });
}
const K1 = /* @__PURE__ */ D("ZodRecord", (a, i) => {
  Kg.init(a, i), We.init(a, i), a.keyType = i.keyType, a.valueType = i.valueType;
});
function jm(a, i, o) {
  return new K1({
    type: "record",
    keyType: a,
    valueType: i,
    ...V(o)
  });
}
const xs = /* @__PURE__ */ D("ZodEnum", (a, i) => {
  $g.init(a, i), We.init(a, i), a.enum = i.entries, a.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  a.extract = (s, f) => {
    const v = {};
    for (const m of s)
      if (o.has(m))
        v[m] = i.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new xs({
      ...i,
      checks: [],
      ...V(f),
      entries: v
    });
  }, a.exclude = (s, f) => {
    const v = { ...i.entries };
    for (const m of s)
      if (o.has(m))
        delete v[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new xs({
      ...i,
      checks: [],
      ...V(f),
      entries: v
    });
  };
});
function ga(a, i) {
  const o = Array.isArray(a) ? Object.fromEntries(a.map((s) => [s, s])) : a;
  return new xs({
    type: "enum",
    entries: o,
    ...V(i)
  });
}
const $1 = /* @__PURE__ */ D("ZodTransform", (a, i) => {
  Jg.init(a, i), We.init(a, i), a._zod.parse = (o, s) => {
    if (s.direction === "backward")
      throw new sm(a.constructor.name);
    o.addIssue = (v) => {
      if (typeof v == "string")
        o.issues.push(gu(v, o.value, i));
      else {
        const m = v;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), m.input ?? (m.input = o.value), m.inst ?? (m.inst = a), o.issues.push(gu(m));
      }
    };
    const f = i.transform(o.value, o);
    return f instanceof Promise ? f.then((v) => (o.value = v, o)) : (o.value = f, o);
  };
});
function J1(a) {
  return new $1({
    type: "transform",
    transform: a
  });
}
const Cm = /* @__PURE__ */ D("ZodOptional", (a, i) => {
  Wg.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function nm(a) {
  return new Cm({
    type: "optional",
    innerType: a
  });
}
const W1 = /* @__PURE__ */ D("ZodNullable", (a, i) => {
  Fg.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function lm(a) {
  return new W1({
    type: "nullable",
    innerType: a
  });
}
const F1 = /* @__PURE__ */ D("ZodDefault", (a, i) => {
  Ig.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function I1(a, i) {
  return new F1({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : dm(i);
    }
  });
}
const P1 = /* @__PURE__ */ D("ZodPrefault", (a, i) => {
  Pg.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function e2(a, i) {
  return new P1({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : dm(i);
    }
  });
}
const Dm = /* @__PURE__ */ D("ZodNonOptional", (a, i) => {
  ep.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function t2(a, i) {
  return new Dm({
    type: "nonoptional",
    innerType: a,
    ...V(i)
  });
}
const n2 = /* @__PURE__ */ D("ZodCatch", (a, i) => {
  tp.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function l2(a, i) {
  return new n2({
    type: "catch",
    innerType: a,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const a2 = /* @__PURE__ */ D("ZodPipe", (a, i) => {
  np.init(a, i), We.init(a, i), a.in = i.in, a.out = i.out;
});
function am(a, i) {
  return new a2({
    type: "pipe",
    in: a,
    out: i
    // ...util.normalizeParams(params),
  });
}
const u2 = /* @__PURE__ */ D("ZodReadonly", (a, i) => {
  lp.init(a, i), We.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function i2(a) {
  return new u2({
    type: "readonly",
    innerType: a
  });
}
const c2 = /* @__PURE__ */ D("ZodCustom", (a, i) => {
  ap.init(a, i), We.init(a, i);
});
function o2(a, i = {}) {
  return Jp(c2, a, i);
}
function s2(a) {
  return Wp(a);
}
class r2 {
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
      } catch (m) {
        console.warn("onRequest hook error:", m);
      }
    const v = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${i}`;
    try {
      const m = new AbortController(), T = setTimeout(() => m.abort(), this.config.timeout), x = await fetch(v, {
        headers: { ...this.baseHeaders, ...o.headers },
        signal: m.signal,
        ...o
      });
      clearTimeout(T);
      let g;
      const Z = x.headers.get("content-type");
      if (Z && Z.includes("application/json") ? g = await x.json() : g = await x.text(), !x.ok) {
        const U = {
          message: g?.error || `HTTP ${x.status}: ${x.statusText}`,
          statusCode: x.status,
          code: "API_ERROR"
        };
        if (this.config.onError)
          try {
            this.config.onError(U);
          } catch (k) {
            console.warn("onError hook error:", k);
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
      return { data: g };
    } catch (m) {
      if (m instanceof Error && m.name === "AbortError") {
        const x = {
          message: "Request timeout",
          code: "TIMEOUT_ERROR",
          statusCode: 408
        };
        if (this.config.onError)
          try {
            this.config.onError(x);
          } catch (g) {
            console.warn("onError hook error:", g);
          }
        return { error: "Request timeout" };
      }
      const T = {
        message: m instanceof Error ? m.message : "Network error",
        code: "NETWORK_ERROR"
      };
      if (this.config.onError)
        try {
          this.config.onError(T);
        } catch (x) {
          console.warn("onError hook error:", x);
        }
      return {
        error: m instanceof Error ? m.message : "Network error"
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
    Object.entries(i).forEach(([v, m]) => {
      m != null && (Array.isArray(m) ? o.append(v, m.join(",")) : o.append(v, String(m)));
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
function f2(a) {
  return new r2(a);
}
const ws = ["context", "project", "knowledge", "reference", "personal", "workflow"], wm = ["active", "archived", "draft", "deleted"];
Qi({
  title: Re().min(1).max(500),
  content: Re().min(1).max(5e4),
  summary: Re().max(1e3).optional(),
  memory_type: ga(ws).default("context"),
  topic_id: Re().uuid().optional(),
  project_ref: Re().max(100).optional(),
  tags: pu(Re().min(1).max(50)).max(20).default([]),
  metadata: jm(Re(), Yi()).optional()
});
Qi({
  title: Re().min(1).max(500).optional(),
  content: Re().min(1).max(5e4).optional(),
  summary: Re().max(1e3).optional(),
  memory_type: ga(ws).optional(),
  status: ga(wm).optional(),
  topic_id: Re().uuid().nullable().optional(),
  project_ref: Re().max(100).nullable().optional(),
  tags: pu(Re().min(1).max(50)).max(20).optional(),
  metadata: jm(Re(), Yi()).optional()
});
Qi({
  query: Re().min(1).max(1e3),
  memory_types: pu(ga(ws)).optional(),
  tags: pu(Re()).optional(),
  topic_id: Re().uuid().optional(),
  project_ref: Re().optional(),
  status: ga(wm).default("active"),
  limit: em().int().min(1).max(100).default(20),
  threshold: em().min(0).max(1).default(0.7)
});
Qi({
  name: Re().min(1).max(100),
  description: Re().max(500).optional(),
  color: Re().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: Re().max(50).optional(),
  parent_topic_id: Re().uuid().optional()
});
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const Um = Y.createContext(null);
function d2({ children: a, config: i, apiKey: o, apiUrl: s = "https://api.lanonasis.com", client: f }) {
  const v = Y.useMemo(() => f || f2({
    apiUrl: s,
    apiKey: o,
    ...i
  }), [f, s, o, i]);
  return Y.createElement(Um.Provider, { value: v }, a);
}
function Vi() {
  const a = Y.useContext(Um);
  if (!a)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return a;
}
function h2(a) {
  const i = Vi(), [o, s] = Y.useState([]), [f, v] = Y.useState(!0), [m, T] = Y.useState(null), x = Y.useCallback(async () => {
    v(!0), T(null);
    const g = await i.listMemories(a);
    g.error ? (T({
      message: g.error,
      code: "API_ERROR"
    }), s([])) : g.data && s(g.data.data), v(!1);
  }, [i, JSON.stringify(a)]);
  return Y.useEffect(() => {
    x();
  }, [x]), {
    memories: o,
    loading: f,
    error: m,
    refresh: x
  };
}
function m2() {
  const a = Vi(), [i, o] = Y.useState(!1), [s, f] = Y.useState(null);
  return {
    createMemory: Y.useCallback(async (m) => {
      o(!0), f(null);
      const T = await a.createMemory(m);
      return T.error ? (f({
        message: T.error,
        code: "API_ERROR"
      }), o(!1), null) : (o(!1), T.data || null);
    }, [a]),
    loading: i,
    error: s
  };
}
function v2(a = 300) {
  const i = Vi(), [o, s] = Y.useState([]), [f, v] = Y.useState(!1), [m, T] = Y.useState(null), [x, g] = Y.useState(0), [Z, U] = Y.useState(0), k = Y.useRef(null), ee = Y.useCallback(async (he, Oe) => {
    k.current && clearTimeout(k.current), k.current = setTimeout(async () => {
      v(!0), T(null);
      const Ce = await i.searchMemories({
        query: he,
        ...Oe
      });
      Ce.error ? (T({
        message: Ce.error,
        code: "API_ERROR"
      }), s([]), g(0), U(0)) : Ce.data && (s(Ce.data.results), g(Ce.data.total_results), U(Ce.data.search_time_ms)), v(!1);
    }, a);
  }, [i, a]);
  return Y.useEffect(() => () => {
    k.current && clearTimeout(k.current);
  }, []), {
    results: o,
    loading: f,
    error: m,
    search: ee,
    totalResults: x,
    searchTime: Z
  };
}
const Me = Ts.forwardRef(
  ({
    className: a = "",
    variant: i = "default",
    size: o = "default",
    children: s,
    ...f
  }, v) => {
    const m = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", T = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, x = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ h.jsx(
      "button",
      {
        ref: v,
        className: `${m} ${T[i]} ${x[o]} ${a}`,
        ...f,
        children: s
      }
    );
  }
);
Me.displayName = "Button";
const ma = Ts.forwardRef(
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
ma.displayName = "Input";
const y2 = ({
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
}, g2 = [
  "context",
  "project",
  "knowledge",
  "reference",
  "personal",
  "workflow"
], p2 = (a) => {
  if (!a) return "—";
  try {
    return new Date(a).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}, _s = (a) => {
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
}, um = (a) => a && a.length > 0 ? a.join(", ") : "", b2 = (a) => a.split(",").map((i) => i.trim()).filter(Boolean), _2 = (a, i) => {
  const o = i.toLowerCase();
  return a.title.toLowerCase().includes(o) || a.content.toLowerCase().includes(o) || (a.tags || []).some((s) => s.toLowerCase().includes(o));
}, S2 = ({
  onLoginOAuth: a,
  onLoginApiKey: i,
  isLoading: o = !1,
  error: s = null
}) => {
  const [f, v] = Y.useState(!1), [m, T] = Y.useState(""), x = () => {
    m.trim() && i && i(m.trim());
  };
  return /* @__PURE__ */ h.jsx("div", { className: "space-y-3 select-none", children: /* @__PURE__ */ h.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ h.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Connect to sync memories" }),
    /* @__PURE__ */ h.jsx("p", { className: "text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "You can still work locally, but connecting unlocks sync and full AI search." }),
    s && /* @__PURE__ */ h.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: s }),
    f ? /* @__PURE__ */ h.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ h.jsx(
        ma,
        {
          type: "password",
          placeholder: "Enter your API key (lano_... or lns_...)",
          value: m,
          onChange: (g) => T(g.target.value),
          className: "h-8 text-[13px]",
          autoFocus: !0,
          onKeyDown: (g) => g.key === "Enter" && x()
        }
      ),
      /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ h.jsx(
          Me,
          {
            className: "flex-1",
            onClick: x,
            disabled: !m.trim() || o,
            children: o ? "Connecting..." : "Connect"
          }
        ),
        /* @__PURE__ */ h.jsx(
          Me,
          {
            variant: "secondary",
            onClick: () => {
              v(!1), T("");
            },
            children: "Cancel"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ h.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ h.jsx(
        Me,
        {
          className: "w-full",
          onClick: a,
          disabled: o,
          children: o ? "Connecting..." : "Connect in Browser"
        }
      ),
      /* @__PURE__ */ h.jsx(
        Me,
        {
          className: "w-full",
          variant: "secondary",
          onClick: () => v(!0),
          disabled: o,
          children: "Enter API Key"
        }
      )
    ] })
  ] }) });
}, z2 = ({ memory: a, onClick: i }) => /* @__PURE__ */ h.jsxs(
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
        /* @__PURE__ */ h.jsx("span", { className: "opacity-60", children: p2(a.created_at) }),
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
), im = ({
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
), x2 = ({
  syncStatus: a,
  onSync: i
}) => a.isOnline && a.pendingCount === 0 ? null : /* @__PURE__ */ h.jsxs(
  "div",
  {
    className: `px-3 py-2 text-[11px] flex items-center justify-between ${a.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`,
    children: [
      /* @__PURE__ */ h.jsx("div", { className: "flex items-center gap-2", children: a.isOnline ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
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
      a.pendingCount > 0 && a.isOnline && /* @__PURE__ */ h.jsx(
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
), E2 = ({
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
}, T2 = ({
  initialChatInput: a = "",
  onAttachFromClipboard: i,
  isAuthenticated: o = !1,
  onLoginOAuth: s,
  onLoginApiKey: f,
  onLogout: v,
  authLoading: m = !1,
  authError: T = null,
  userEmail: x = null,
  userName: g = null,
  authMethod: Z = "none"
}) => {
  const { memories: U, loading: k, refresh: ee } = h2({
    limit: 200,
    order: "desc"
  }), { createMemory: he, loading: Oe } = m2(), {
    search: Ce,
    results: Se,
    loading: mt
  } = v2(), F = Vi(), [I, ke] = Y.useState(""), [qe, le] = Y.useState(a), [Pe, wt] = Y.useState(!0), [Wt, Ut] = Y.useState(!0), [Fe, Ft] = Y.useState(!1), [Et, Qe] = Y.useState([]), [O, H] = Y.useState(!1), [X, ce] = Y.useState([]), [P, p] = Y.useState({
    isOnline: !0,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: !1
  }), [j, R] = Y.useState(null), [w, K] = Y.useState(null), [ue, oe] = Y.useState(!1), [ze, xe] = Y.useState({
    title: "",
    content: "",
    memory_type: "knowledge",
    tags: ""
  }), [It, an] = Y.useState(!1), [ba, _a] = Y.useState(!1), [Tt, En] = Y.useState(""), [Sa, xl] = Y.useState(!1), In = Y.useRef(null), El = Y.useRef(null);
  Y.useEffect(() => {
    if (j) {
      const q = setTimeout(() => R(null), 5e3);
      return () => clearTimeout(q);
    }
  }, [j]), Y.useEffect(() => {
    a !== void 0 && le(a);
  }, [a]);
  const vt = o && P.isOnline, za = X.length > 0, Ki = !o || !P.isOnline, xa = o ? Z === "apiKey" ? "API key" : "OAuth" : za ? "Local cache" : "Not connected", nt = g || x || null, $i = !!w && (w.id.startsWith("local_") || w._pending === "create");
  Y.useEffect(() => {
    const q = (W) => {
      const G = W.data;
      if (!(!G || typeof G != "object")) {
        if (G.type === "lanonasis:cache:data" && (ce(G.payload?.memories || []), G.payload?.status && p(G.payload.status)), G.type === "lanonasis:sync:start" && p((ie) => ({ ...ie, isSyncing: !0 })), G.type === "lanonasis:sync:complete" && (ce(G.payload?.memories || []), p(
          (ie) => G.payload?.status || {
            ...ie,
            isSyncing: !1,
            isOnline: !0
          }
        )), G.type === "lanonasis:sync:error") {
          const ie = G.payload?.isNetworkError === !0, $ = G.payload?.error || "Sync failed";
          p((ge) => ({
            ...ge,
            isSyncing: !1,
            isOnline: ie ? !1 : ge.isOnline
          })), R(ie ? "Network error - working offline" : $);
        }
        if (G.type === "lanonasis:auth:result" && !G.payload?.success) {
          const ie = G.payload?.error || "Authentication failed";
          R(ie);
        }
        if (G.type === "lanonasis:ai:search:local") {
          const ie = G.payload?.results || [];
          ie.length > 0 && Qe(($) => {
            const ge = $[$.length - 1];
            return ge?.role === "assistant" ? [...$.slice(0, -1), { ...ge, memories: ie }] : $;
          }), H(!1);
        }
        if (G.type === "lanonasis:ai:search:api") {
          const ie = G.payload?.results || [], $ = G.payload?.query || "";
          H(!1), Qe((ge) => {
            const dt = ge[ge.length - 1];
            if (dt?.role === "assistant") {
              const Al = new Set((dt.memories || []).map((ll) => ll.id)), _u = ie.filter(
                (ll) => !Al.has(ll.id)
              ), Ol = [...dt.memories || [], ..._u].slice(0, 5);
              return [
                ...ge.slice(0, -1),
                {
                  ...dt,
                  content: Ol.length > 0 ? `Found ${Ol.length} relevant memories:` : `No memories found for "${$}"`,
                  memories: Ol
                }
              ];
            }
            return ge;
          });
        }
        if (G.type === "lanonasis:cache:added") {
          const ie = G.payload?.memory;
          ie && (ce(($) => [ie, ...$]), p(($) => ({
            ...$,
            pendingCount: $.pendingCount + 1
          })));
        }
        if (G.type === "lanonasis:cache:updated") {
          const ie = G.payload?.memory;
          ie && (ce(
            ($) => $.map(
              (ge) => ge.id === ie.id || ge._localId === ie._localId ? ie : ge
            )
          ), K(
            ($) => $ && $.id === ie.id ? ie : $
          )), G.payload?.status && p(G.payload.status);
        }
        if (G.type === "lanonasis:cache:deleted") {
          const ie = G.payload?.id;
          ie && (ce(
            ($) => $.filter((ge) => ge.id !== ie)
          ), K(
            ($) => $ && $.id === ie ? null : $
          )), G.payload?.status && p(G.payload.status);
        }
        G.type === "lanonasis:cache:cleared" && (ce([]), K(null), G.payload?.status ? p(G.payload.status) : p((ie) => ({
          ...ie,
          lastSyncAt: null,
          pendingCount: 0,
          isSyncing: !1
        })));
      }
    };
    return window.addEventListener("message", q), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", q);
  }, []), Y.useEffect(() => {
    In.current && (In.current.scrollTop = In.current.scrollHeight);
  }, [Et]), Y.useEffect(() => {
    I.length > 2 && vt && Ce(I);
  }, [I, Ce, vt]);
  const bu = Y.useMemo(() => I.length <= 2 ? [] : X.filter((q) => _2(q, I)), [X, I]), Pn = Ki || P.pendingCount > 0 ? X : U, Wi = vt && Se.length > 0 ? Se : bu, Ea = I.length > 2 ? Wi : Pn.length > 0 ? Pn : X, Fi = async () => {
    const q = qe.trim() || I.trim();
    if (!q) {
      const W = document.querySelector("textarea");
      W && (W.focus(), W.placeholder = "Type content to save as a memory...");
      return;
    }
    try {
      const W = {
        title: q.slice(0, 50) + (q.length > 50 ? "..." : ""),
        content: q,
        memory_type: "knowledge",
        tags: []
      };
      if (vt)
        await he(W), le(""), await ee();
      else
        throw new Error("Local-only mode");
    } catch (W) {
      console.error("Failed to create memory:", W), window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: {
          memory: {
            title: q.slice(0, 50) + (q.length > 50 ? "..." : ""),
            content: q,
            memory_type: "knowledge",
            tags: []
          }
        }
      }), le(""));
    }
  }, Ta = async () => {
    Ft(!0);
    try {
      window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), o && await ee();
    } finally {
      Ft(!1);
    }
  }, el = (q) => {
    const W = q.toLowerCase().trim();
    if (W === "help" || W === "?" || W.includes("how do i"))
      return { action: "help", query: q };
    const G = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i
    ];
    for (const ie of G) {
      const $ = q.match(ie);
      if ($)
        return { action: "create", query: $[1] || q };
    }
    return { action: "search", query: q };
  }, ot = Y.useCallback((q) => {
    K(q), xe({
      title: q.title || "",
      content: q.content || "",
      memory_type: q.memory_type || "knowledge",
      tags: um(q.tags)
    }), oe(!1);
  }, []), Vt = Y.useCallback(() => {
    K(null), oe(!1);
  }, []), ft = Y.useCallback((q) => {
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:clipboard:write",
        payload: { text: q }
      });
      return;
    }
    navigator.clipboard?.writeText && navigator.clipboard.writeText(q);
  }, []), Ii = Y.useCallback(() => {
    w && (xe({
      title: w.title || "",
      content: w.content || "",
      memory_type: w.memory_type || "knowledge",
      tags: um(w.tags)
    }), oe(!0));
  }, [w]), Pi = Y.useCallback(async () => {
    if (!w) return;
    const q = {
      title: ze.title.trim() || w.title,
      content: ze.content.trim() || w.content,
      memory_type: ze.memory_type || w.memory_type,
      tags: b2(ze.tags)
    };
    an(!0);
    try {
      if (vt) {
        const W = await F.updateMemory(w.id, q);
        if (W?.error)
          throw new Error(W.error);
        const G = W?.data || w;
        K(G), ce(
          (ie) => ie.map(($) => $.id === G.id ? G : $)
        ), oe(!1), await ee();
        return;
      }
      window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:update",
        payload: { id: w.id, updates: q }
      }), K(
        (W) => W && {
          ...W,
          ...q,
          tags: q.tags || W.tags,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      )), oe(!1);
    } catch (W) {
      const G = W instanceof Error ? W.message : "Update failed";
      R(G);
    } finally {
      an(!1);
    }
  }, [
    w,
    ze.title,
    ze.content,
    ze.memory_type,
    ze.tags,
    vt,
    F,
    ee
  ]), ec = Y.useCallback(async () => {
    if (!(!w || !window.confirm(
      `Delete "${w.title}"? This cannot be undone.`
    ))) {
      an(!0);
      try {
        if (vt) {
          const W = await F.deleteMemory(w.id);
          if (W?.error)
            throw new Error(W.error);
          await ee();
        } else window.vscode && window.vscode.postMessage({
          type: "lanonasis:cache:delete",
          payload: { id: w.id }
        });
        ce(
          (W) => W.filter((G) => G.id !== w.id)
        ), K(null);
      } catch (W) {
        const G = W instanceof Error ? W.message : "Delete failed";
        R(G);
      } finally {
        an(!1);
      }
    }
  }, [w, vt, F, ee]), Tl = Y.useCallback(() => {
    _a(!0);
  }, []), tl = Y.useCallback(() => {
    _a(!1), xl(!1), En("");
  }, []), nl = Y.useCallback(() => {
    Tt.trim() && (f && f(Tt.trim()), En(""), xl(!1));
  }, [Tt, f]), Pt = async () => {
    const q = qe.trim();
    if (!q) return;
    const W = {
      id: `user_${Date.now()}`,
      role: "user",
      content: q,
      timestamp: Date.now()
    };
    Qe(($) => [...$, W]), le("");
    const G = el(q);
    if (G.action === "help") {
      const $ = {
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
      Qe((ge) => [...ge, $]);
      return;
    }
    if (G.action === "create") {
      const $ = {
        title: G.query.slice(0, 50) + (G.query.length > 50 ? "..." : ""),
        content: G.query,
        memory_type: "knowledge",
        tags: []
      };
      if (vt)
        try {
          await he($);
          const dt = {
            id: `assistant_${Date.now()}`,
            role: "assistant",
            content: `✅ Memory saved: "${G.query.slice(0, 50)}${G.query.length > 50 ? "..." : ""}"`,
            timestamp: Date.now()
          };
          Qe((Al) => [...Al, dt]), await ee();
          return;
        } catch (dt) {
          console.log("Create failed, saving locally:", dt);
        }
      window.vscode && window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: { memory: $ }
      });
      const ge = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `✅ Memory saved locally (will sync when online): "${G.query.slice(0, 50)}${G.query.length > 50 ? "..." : ""}"`,
        timestamp: Date.now()
      };
      Qe((dt) => [...dt, ge]);
      return;
    }
    H(!0);
    const ie = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${G.query}"`,
      memories: [],
      timestamp: Date.now()
    };
    if (Qe(($) => [...$, ie]), window.vscode)
      window.vscode.postMessage({
        type: "lanonasis:ai:search",
        payload: { query: G.query }
      });
    else
      try {
        const $ = await Ce(G.query);
        Qe((ge) => {
          const dt = ge[ge.length - 1];
          return dt?.role === "assistant" ? [
            ...ge.slice(0, -1),
            {
              ...dt,
              content: $ && $.length > 0 ? `Found ${$.length} relevant memories:` : `No memories found for "${G.query}"`,
              memories: $ || []
            }
          ] : ge;
        });
      } catch ($) {
        console.log("Search failed:", $);
      } finally {
        H(!1);
      }
  };
  return /* @__PURE__ */ h.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ h.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    j && /* @__PURE__ */ h.jsxs("div", { className: "absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between", children: [
      /* @__PURE__ */ h.jsx("span", { className: "text-[11px] text-red-200", children: j }),
      /* @__PURE__ */ h.jsx(
        "button",
        {
          onClick: () => R(null),
          className: "text-red-200 hover:text-white text-xs ml-2",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h.jsx(
          y2,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ h.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]", children: [
          /* @__PURE__ */ h.jsx(
            "div",
            {
              className: `h-1.5 w-1.5 rounded-full ${o ? P.isOnline ? "bg-green-500" : "bg-red-500" : "bg-yellow-500"}`,
              title: o ? P.isOnline ? "Online" : "Offline" : "Local"
            }
          ),
          /* @__PURE__ */ h.jsx("span", { children: o ? P.isOnline ? "Online" : "Offline" : "Local" })
        ] }),
        /* @__PURE__ */ h.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80", children: xa }),
        nt && /* @__PURE__ */ h.jsx(
          "span",
          {
            className: "text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[120px] truncate",
            title: nt,
            children: nt
          }
        ),
        /* @__PURE__ */ h.jsx(
          Me,
          {
            variant: "ghost",
            size: "icon",
            title: "Settings",
            onClick: Tl,
            children: rt.settings
          }
        ),
        o && /* @__PURE__ */ h.jsx(
          Me,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: v,
            children: rt.logout
          }
        )
      ] })
    ] }),
    o && /* @__PURE__ */ h.jsx(x2, { syncStatus: P, onSync: Ta }),
    /* @__PURE__ */ h.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ h.jsx(
        im,
        {
          title: "Memory Assistant",
          isOpen: Pe,
          onToggle: () => wt(!Pe)
        }
      ),
      Pe && /* @__PURE__ */ h.jsxs(
        "div",
        {
          ref: In,
          className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3",
          children: [
            Et.length === 0 ? /* @__PURE__ */ h.jsx("div", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] flex flex-col items-center justify-center text-center py-4", children: o ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
              /* @__PURE__ */ h.jsx("div", { className: "text-[var(--vscode-button-background)] mb-2", children: rt.lightbulb }),
              /* @__PURE__ */ h.jsx("p", { className: "italic opacity-80", children: "Ask me to find or save memories" }),
              /* @__PURE__ */ h.jsx("p", { className: "text-[11px] mt-1 opacity-60", children: 'Try: "find my OAuth notes"' })
            ] }) : /* @__PURE__ */ h.jsx("p", { className: "italic opacity-80", children: "Ask to search cached memories or save new ones." }) }) : Et.map((q) => /* @__PURE__ */ h.jsx(
              E2,
              {
                message: q,
                onOpenMemory: ot
              },
              q.id
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
        im,
        {
          title: `Memories${P.pendingCount > 0 ? ` (${P.pendingCount} pending)` : ""}`,
          isOpen: Wt,
          onToggle: () => Ut(!Wt),
          actions: (o || X.length > 0) && /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(
              Me,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => El.current?.focus(),
                children: rt.search
              }
            ),
            /* @__PURE__ */ h.jsx(
              Me,
              {
                variant: "ghost",
                size: "icon",
                onClick: Ta,
                disabled: !o,
                children: /* @__PURE__ */ h.jsx(
                  "span",
                  {
                    className: Fe || P.isSyncing ? "animate-spin" : "",
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
          S2,
          {
            onLoginOAuth: s,
            onLoginApiKey: f,
            isLoading: m,
            error: T
          }
        ) }),
        /* @__PURE__ */ h.jsx(
          ma,
          {
            ref: El,
            placeholder: "Search memories...",
            value: I,
            onChange: (q) => ke(q.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ h.jsxs(
            Me,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: Fi,
              disabled: Oe,
              children: [
                Oe ? /* @__PURE__ */ h.jsxs(
                  "svg",
                  {
                    className: "animate-spin h-3 w-3",
                    viewBox: "0 0 24 24",
                    children: [
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
                    ]
                  }
                ) : rt.plus,
                Oe ? "Creating..." : vt ? "Create" : "Save Local"
              ]
            }
          ),
          /* @__PURE__ */ h.jsxs(
            Me,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: Ta,
              disabled: !o || Fe || P.isSyncing,
              children: [
                /* @__PURE__ */ h.jsx(
                  "span",
                  {
                    className: Fe || P.isSyncing ? "animate-spin" : "",
                    children: rt.refresh
                  }
                ),
                Fe || P.isSyncing ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ h.jsx("div", { className: "space-y-0.5", children: k || mt ? /* @__PURE__ */ h.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : Ea.length === 0 ? /* @__PURE__ */ h.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: I ? "No memories found" : X.length > 0 ? "Loading from cache..." : "No memories yet. Create one!" }) : Ea.map((q) => /* @__PURE__ */ h.jsx(
          z2,
          {
            memory: q,
            onClick: () => ot(q)
          },
          q.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ h.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ h.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ h.jsx(
        "textarea",
        {
          value: qe,
          onChange: (q) => le(q.target.value),
          onKeyDown: (q) => {
            q.key === "Enter" && !q.shiftKey && (q.preventDefault(), Pt());
          },
          placeholder: o ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Search cached memories or save a note",
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
        }
      ) }),
      /* @__PURE__ */ h.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ h.jsx(
        Me,
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
        Me,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !qe.trim() || O,
          onClick: Pt,
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
    w && /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: "absolute inset-0 z-40",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ h.jsx("div", { className: "absolute inset-0", onClick: Vt }),
          /* @__PURE__ */ h.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ h.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Memory Detail" }),
                /* @__PURE__ */ h.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: w.title }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
                  _s(w.updated_at || w.created_at),
                  " • ",
                  w.memory_type,
                  " • ",
                  $i ? "Local" : "Synced",
                  w._pending ? ` (${w._pending})` : ""
                ] })
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ h.jsx(
                  Me,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Copy content",
                    onClick: () => ft(w.content),
                    children: rt.copy
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Me,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Edit memory",
                    onClick: Ii,
                    children: rt.edit
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Me,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Delete memory",
                    onClick: ec,
                    disabled: It,
                    children: rt.trash
                  }
                ),
                /* @__PURE__ */ h.jsx(
                  Me,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Close",
                    onClick: Vt,
                    children: rt.close
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ h.jsx("div", { className: "flex-1 overflow-y-auto mt-3", children: ue ? /* @__PURE__ */ h.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Title" }),
                /* @__PURE__ */ h.jsx(
                  ma,
                  {
                    value: ze.title,
                    onChange: (q) => xe((W) => ({
                      ...W,
                      title: q.target.value
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
                    value: ze.memory_type,
                    onChange: (q) => xe((W) => ({
                      ...W,
                      memory_type: q.target.value
                    })),
                    className: "vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]",
                    children: g2.map((q) => /* @__PURE__ */ h.jsx("option", { value: q, children: q }, q))
                  }
                )
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ h.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Tags (comma separated)" }),
                /* @__PURE__ */ h.jsx(
                  ma,
                  {
                    value: ze.tags,
                    onChange: (q) => xe((W) => ({
                      ...W,
                      tags: q.target.value
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
                    value: ze.content,
                    onChange: (q) => xe((W) => ({
                      ...W,
                      content: q.target.value
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
                  children: w.content
                }
              ),
              w.tags?.length > 0 && /* @__PURE__ */ h.jsx("div", { className: "flex gap-1", style: { flexWrap: "wrap" }, children: w.tags.map((q) => /* @__PURE__ */ h.jsxs(
                "span",
                {
                  className: "px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]",
                  children: [
                    "#",
                    q
                  ]
                },
                q
              )) })
            ] }) }),
            /* @__PURE__ */ h.jsx("div", { className: "pt-3 border-t border-[var(--vscode-panel-border)] mt-3", children: ue ? /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ h.jsx(
                Me,
                {
                  className: "flex-1 h-7",
                  onClick: Pi,
                  disabled: It,
                  children: It ? "Saving..." : "Save Changes"
                }
              ),
              /* @__PURE__ */ h.jsx(
                Me,
                {
                  className: "flex-1 h-7",
                  variant: "secondary",
                  onClick: () => oe(!1),
                  disabled: It,
                  children: "Cancel"
                }
              )
            ] }) : /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ h.jsxs("span", { children: [
                "Updated ",
                _s(w.updated_at)
              ] }),
              w._pending && /* @__PURE__ */ h.jsx("span", { className: "text-yellow-400", children: "Pending sync" })
            ] }) })
          ] }) })
        ]
      }
    ),
    ba && /* @__PURE__ */ h.jsxs(
      "div",
      {
        className: "absolute inset-0 z-50",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ h.jsx("div", { className: "absolute inset-0", onClick: tl }),
          /* @__PURE__ */ h.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ h.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ h.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: "Settings" }),
              /* @__PURE__ */ h.jsx(
                Me,
                {
                  variant: "ghost",
                  size: "icon",
                  title: "Close",
                  onClick: tl,
                  children: rt.close
                }
              )
            ] }),
            /* @__PURE__ */ h.jsxs("div", { className: "flex-1 overflow-y-auto mt-3 space-y-3", children: [
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Connection" }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Status: ",
                  o ? P.isOnline ? "Online" : "Offline" : "Local"
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Auth: ",
                  xa
                ] }),
                (g || x) && /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "User: ",
                  g || x
                ] }),
                g && x && /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Email: ",
                  x
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Last sync: ",
                  P.lastSyncAt ? _s(new Date(P.lastSyncAt).toISOString()) : "—"
                ] }),
                /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Pending changes: ",
                  P.pendingCount
                ] })
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "API Access" }),
                o ? /* @__PURE__ */ h.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Connected via ",
                  xa,
                  "."
                ] }) : /* @__PURE__ */ h.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Connect to sync and search across devices." }),
                Sa ? /* @__PURE__ */ h.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ h.jsx(
                    ma,
                    {
                      type: "password",
                      placeholder: "Enter your API key (lano_... or lns_...)",
                      value: Tt,
                      onChange: (q) => En(q.target.value),
                      className: "h-8 text-[13px]",
                      onKeyDown: (q) => q.key === "Enter" && nl()
                    }
                  ),
                  /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ h.jsx(
                      Me,
                      {
                        className: "flex-1",
                        onClick: nl,
                        disabled: !Tt.trim() || m,
                        children: m ? "Connecting..." : "Save API Key"
                      }
                    ),
                    /* @__PURE__ */ h.jsx(
                      Me,
                      {
                        className: "flex-1",
                        variant: "secondary",
                        onClick: () => {
                          xl(!1), En("");
                        },
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ h.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ h.jsx(
                    Me,
                    {
                      className: "flex-1 h-7",
                      onClick: s,
                      disabled: m,
                      children: m ? "Connecting..." : "Connect in Browser"
                    }
                  ),
                  /* @__PURE__ */ h.jsx(
                    Me,
                    {
                      className: "flex-1 h-7",
                      variant: "secondary",
                      onClick: () => xl(!0),
                      disabled: m,
                      children: "Enter API Key"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ h.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ h.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Cache" }),
                /* @__PURE__ */ h.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Clear cached memories and pending changes stored locally." }),
                /* @__PURE__ */ h.jsx(
                  Me,
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
                  Me,
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
const cm = document.getElementById("root");
function A2() {
  const [a, i] = Y.useState(""), [o, s] = Y.useState(void 0), [f, v] = Y.useState("https://api.lanonasis.com"), [m, T] = Y.useState(!1), [x, g] = Y.useState(null), [Z, U] = Y.useState(null), k = o && (o.startsWith("lano_") || o.startsWith("lns_")) ? "apiKey" : o ? "oauth" : "none";
  Y.useEffect(() => {
    if (!window.vscode || typeof window.vscode.getState != "function") return;
    const Se = window.vscode.getState?.() || {};
    Se.injectedChat && i(Se.injectedChat), Se.authError !== void 0 && g(Se.authError);
  }, []), Y.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const Se = (mt) => {
      const F = mt.data;
      if (!(!F || typeof F != "object")) {
        if (F.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if (F.type === "lanonasis:config:init" || F.type === "lanonasis:config:update") {
          const I = F.payload?.apiUrl, ke = F.payload?.apiKey, qe = F.payload?.user;
          I && v(I), ke !== void 0 && (s(ke || void 0), T(!1), g(null), console.log("[Webview] API key received from host")), qe !== void 0 && U(qe);
          return;
        }
        if (F.type === "lanonasis:auth:result") {
          T(!1), F.payload?.success ? g(null) : g(F.payload?.error || "Authentication failed");
          return;
        }
        if (F.type === "lanonasis:memory:createFromSelection") {
          const I = F.payload?.text ?? "";
          I && (i(I), window.vscode?.setState?.({
            injectedChat: I,
            authError: x
          }));
          return;
        }
        if (F.type === "lanonasis:clipboard:read:result") {
          const I = F.payload?.text ?? "";
          I && (i(I), window.vscode?.setState?.({
            injectedChat: I,
            authError: x
          }));
          return;
        }
      }
    };
    return window.addEventListener("message", Se), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", Se);
    };
  }, []);
  const ee = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, he = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (T(!0), g(null), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, Oe = (Se) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (T(!0), g(null), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: Se }
    }));
  }, Ce = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), s(void 0), g(null), T(!1), window.vscode?.setState?.({
      injectedChat: a,
      authError: null
    }));
  };
  return /* @__PURE__ */ h.jsx(d2, { apiKey: o, apiUrl: f, children: /* @__PURE__ */ h.jsx(
    T2,
    {
      initialChatInput: a,
      onAttachFromClipboard: ee,
      isAuthenticated: !!o,
      authMethod: k,
      onLoginOAuth: he,
      onLoginApiKey: Oe,
      onLogout: Ce,
      authLoading: m,
      authError: x,
      userName: Z?.name || null,
      userEmail: Z?.email || null
    }
  ) });
}
cm && ny.createRoot(cm).render(
  /* @__PURE__ */ h.jsx(Ts.StrictMode, { children: /* @__PURE__ */ h.jsx(A2, {}) })
);
