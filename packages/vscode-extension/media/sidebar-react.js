function Jh(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Qo = { exports: {} }, Qa = {};
var mh;
function V0() {
  if (mh) return Qa;
  mh = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function o(f, d, h) {
    var m = null;
    if (h !== void 0 && (m = "" + h), d.key !== void 0 && (m = "" + d.key), "key" in d) {
      h = {};
      for (var T in d)
        T !== "key" && (h[T] = d[T]);
    } else h = d;
    return d = h.ref, {
      $$typeof: a,
      type: f,
      key: m,
      ref: d !== void 0 ? d : null,
      props: h
    };
  }
  return Qa.Fragment = i, Qa.jsx = o, Qa.jsxs = o, Qa;
}
var Lo = { exports: {} }, V = {};
var vh;
function k0() {
  if (vh) return V;
  vh = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), m = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), B = Symbol.iterator;
  function W(p) {
    return p === null || typeof p != "object" ? null : (p = B && p[B] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var F = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Ee = Object.assign, te = {};
  function oe(p, Z, H) {
    this.props = p, this.context = Z, this.refs = te, this.updater = H || F;
  }
  oe.prototype.isReactComponent = {}, oe.prototype.setState = function(p, Z) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, Z, "setState");
  }, oe.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function et() {
  }
  et.prototype = oe.prototype;
  function fe(p, Z, H) {
    this.props = p, this.context = Z, this.refs = te, this.updater = H || F;
  }
  var me = fe.prototype = new et();
  me.constructor = fe, Ee(me, oe.prototype), me.isPureReactComponent = !0;
  var He = Array.isArray;
  function We() {
  }
  var $ = { H: null, A: null, T: null, S: null }, Fe = Object.prototype.hasOwnProperty;
  function nt(p, Z, H) {
    var q = H.ref;
    return {
      $$typeof: a,
      type: p,
      key: Z,
      ref: q !== void 0 ? q : null,
      props: H
    };
  }
  function Vt(p, Z) {
    return nt(p.type, Z, p.props);
  }
  function dt(p) {
    return typeof p == "object" && p !== null && p.$$typeof === a;
  }
  function Ie(p) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(H) {
      return Z[H];
    });
  }
  var Yt = /\/+/g;
  function Ht(p, Z) {
    return typeof p == "object" && p !== null && p.key != null ? Ie("" + p.key) : Z.toString(36);
  }
  function ve(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(We, We) : (p.status = "pending", p.then(
          function(Z) {
            p.status === "pending" && (p.status = "fulfilled", p.value = Z);
          },
          function(Z) {
            p.status === "pending" && (p.status = "rejected", p.reason = Z);
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
  function O(p, Z, H, q, k) {
    var I = typeof p;
    (I === "undefined" || I === "boolean") && (p = null);
    var se = !1;
    if (p === null) se = !0;
    else
      switch (I) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case a:
            case i:
              se = !0;
              break;
            case R:
              return se = p._init, O(
                se(p._payload),
                Z,
                H,
                q,
                k
              );
          }
      }
    if (se)
      return k = k(p), se = q === "" ? "." + Ht(p, 0) : q, He(k) ? (H = "", se != null && (H = se.replace(Yt, "$&/") + "/"), O(k, Z, H, "", function(Wn) {
        return Wn;
      })) : k != null && (dt(k) && (k = Vt(
        k,
        H + (k.key == null || p && p.key === k.key ? "" : ("" + k.key).replace(
          Yt,
          "$&/"
        ) + "/") + se
      )), Z.push(k)), 1;
    se = 0;
    var tt = q === "" ? "." : q + ":";
    if (He(p))
      for (var Ze = 0; Ze < p.length; Ze++)
        q = p[Ze], I = tt + Ht(q, Ze), se += O(
          q,
          Z,
          H,
          I,
          k
        );
    else if (Ze = W(p), typeof Ze == "function")
      for (p = Ze.call(p), Ze = 0; !(q = p.next()).done; )
        q = q.value, I = tt + Ht(q, Ze++), se += O(
          q,
          Z,
          H,
          I,
          k
        );
    else if (I === "object") {
      if (typeof p.then == "function")
        return O(
          ve(p),
          Z,
          H,
          q,
          k
        );
      throw Z = String(p), Error(
        "Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function C(p, Z, H) {
    if (p == null) return p;
    var q = [], k = 0;
    return O(p, q, "", "", function(I) {
      return Z.call(H, I, k++);
    }), q;
  }
  function L(p) {
    if (p._status === -1) {
      var Z = p._result;
      Z = Z(), Z.then(
        function(H) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = H);
        },
        function(H) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = H);
        }
      ), p._status === -1 && (p._status = 0, p._result = Z);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var ye = typeof reportError == "function" ? reportError : function(p) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Z = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
        error: p
      });
      if (!window.dispatchEvent(Z)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", p);
      return;
    }
    console.error(p);
  }, be = {
    map: C,
    forEach: function(p, Z, H) {
      C(
        p,
        function() {
          Z.apply(this, arguments);
        },
        H
      );
    },
    count: function(p) {
      var Z = 0;
      return C(p, function() {
        Z++;
      }), Z;
    },
    toArray: function(p) {
      return C(p, function(Z) {
        return Z;
      }) || [];
    },
    only: function(p) {
      if (!dt(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return V.Activity = j, V.Children = be, V.Component = oe, V.Fragment = o, V.Profiler = d, V.PureComponent = fe, V.StrictMode = f, V.Suspense = z, V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, V.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return $.H.useMemoCache(p);
    }
  }, V.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, V.cacheSignal = function() {
    return null;
  }, V.cloneElement = function(p, Z, H) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var q = Ee({}, p.props), k = p.key;
    if (Z != null)
      for (I in Z.key !== void 0 && (k = "" + Z.key), Z)
        !Fe.call(Z, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && Z.ref === void 0 || (q[I] = Z[I]);
    var I = arguments.length - 2;
    if (I === 1) q.children = H;
    else if (1 < I) {
      for (var se = Array(I), tt = 0; tt < I; tt++)
        se[tt] = arguments[tt + 2];
      q.children = se;
    }
    return nt(p.type, k, q);
  }, V.createContext = function(p) {
    return p = {
      $$typeof: m,
      _currentValue: p,
      _currentValue2: p,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, p.Provider = p, p.Consumer = {
      $$typeof: h,
      _context: p
    }, p;
  }, V.createElement = function(p, Z, H) {
    var q, k = {}, I = null;
    if (Z != null)
      for (q in Z.key !== void 0 && (I = "" + Z.key), Z)
        Fe.call(Z, q) && q !== "key" && q !== "__self" && q !== "__source" && (k[q] = Z[q]);
    var se = arguments.length - 2;
    if (se === 1) k.children = H;
    else if (1 < se) {
      for (var tt = Array(se), Ze = 0; Ze < se; Ze++)
        tt[Ze] = arguments[Ze + 2];
      k.children = tt;
    }
    if (p && p.defaultProps)
      for (q in se = p.defaultProps, se)
        k[q] === void 0 && (k[q] = se[q]);
    return nt(p, I, k);
  }, V.createRef = function() {
    return { current: null };
  }, V.forwardRef = function(p) {
    return { $$typeof: T, render: p };
  }, V.isValidElement = dt, V.lazy = function(p) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: p },
      _init: L
    };
  }, V.memo = function(p, Z) {
    return {
      $$typeof: g,
      type: p,
      compare: Z === void 0 ? null : Z
    };
  }, V.startTransition = function(p) {
    var Z = $.T, H = {};
    $.T = H;
    try {
      var q = p(), k = $.S;
      k !== null && k(H, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(We, ye);
    } catch (I) {
      ye(I);
    } finally {
      Z !== null && H.types !== null && (Z.types = H.types), $.T = Z;
    }
  }, V.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, V.use = function(p) {
    return $.H.use(p);
  }, V.useActionState = function(p, Z, H) {
    return $.H.useActionState(p, Z, H);
  }, V.useCallback = function(p, Z) {
    return $.H.useCallback(p, Z);
  }, V.useContext = function(p) {
    return $.H.useContext(p);
  }, V.useDebugValue = function() {
  }, V.useDeferredValue = function(p, Z) {
    return $.H.useDeferredValue(p, Z);
  }, V.useEffect = function(p, Z) {
    return $.H.useEffect(p, Z);
  }, V.useEffectEvent = function(p) {
    return $.H.useEffectEvent(p);
  }, V.useId = function() {
    return $.H.useId();
  }, V.useImperativeHandle = function(p, Z, H) {
    return $.H.useImperativeHandle(p, Z, H);
  }, V.useInsertionEffect = function(p, Z) {
    return $.H.useInsertionEffect(p, Z);
  }, V.useLayoutEffect = function(p, Z) {
    return $.H.useLayoutEffect(p, Z);
  }, V.useMemo = function(p, Z) {
    return $.H.useMemo(p, Z);
  }, V.useOptimistic = function(p, Z) {
    return $.H.useOptimistic(p, Z);
  }, V.useReducer = function(p, Z, H) {
    return $.H.useReducer(p, Z, H);
  }, V.useRef = function(p) {
    return $.H.useRef(p);
  }, V.useState = function(p) {
    return $.H.useState(p);
  }, V.useSyncExternalStore = function(p, Z, H) {
    return $.H.useSyncExternalStore(
      p,
      Z,
      H
    );
  }, V.useTransition = function() {
    return $.H.useTransition();
  }, V.version = "19.2.1", V;
}
var yh;
function ef() {
  return yh || (yh = 1, Lo.exports = k0()), Lo.exports;
}
var gh;
function K0() {
  return gh || (gh = 1, Qo.exports = V0()), Qo.exports;
}
var M = K0(), ae = ef();
const tf = /* @__PURE__ */ Jh(ae);
var Vo = { exports: {} }, La = {}, ko = { exports: {} }, Ko = {};
var ph;
function J0() {
  return ph || (ph = 1, (function(a) {
    function i(O, C) {
      var L = O.length;
      O.push(C);
      e: for (; 0 < L; ) {
        var ye = L - 1 >>> 1, be = O[ye];
        if (0 < d(be, C))
          O[ye] = C, O[L] = be, L = ye;
        else break e;
      }
    }
    function o(O) {
      return O.length === 0 ? null : O[0];
    }
    function f(O) {
      if (O.length === 0) return null;
      var C = O[0], L = O.pop();
      if (L !== C) {
        O[0] = L;
        e: for (var ye = 0, be = O.length, p = be >>> 1; ye < p; ) {
          var Z = 2 * (ye + 1) - 1, H = O[Z], q = Z + 1, k = O[q];
          if (0 > d(H, L))
            q < be && 0 > d(k, H) ? (O[ye] = k, O[q] = L, ye = q) : (O[ye] = H, O[Z] = L, ye = Z);
          else if (q < be && 0 > d(k, L))
            O[ye] = k, O[q] = L, ye = q;
          else break e;
        }
      }
      return C;
    }
    function d(O, C) {
      var L = O.sortIndex - C.sortIndex;
      return L !== 0 ? L : O.id - C.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, T = m.now();
      a.unstable_now = function() {
        return m.now() - T;
      };
    }
    var z = [], g = [], R = 1, j = null, B = 3, W = !1, F = !1, Ee = !1, te = !1, oe = typeof setTimeout == "function" ? setTimeout : null, et = typeof clearTimeout == "function" ? clearTimeout : null, fe = typeof setImmediate < "u" ? setImmediate : null;
    function me(O) {
      for (var C = o(g); C !== null; ) {
        if (C.callback === null) f(g);
        else if (C.startTime <= O)
          f(g), C.sortIndex = C.expirationTime, i(z, C);
        else break;
        C = o(g);
      }
    }
    function He(O) {
      if (Ee = !1, me(O), !F)
        if (o(z) !== null)
          F = !0, We || (We = !0, Ie());
        else {
          var C = o(g);
          C !== null && ve(He, C.startTime - O);
        }
    }
    var We = !1, $ = -1, Fe = 5, nt = -1;
    function Vt() {
      return te ? !0 : !(a.unstable_now() - nt < Fe);
    }
    function dt() {
      if (te = !1, We) {
        var O = a.unstable_now();
        nt = O;
        var C = !0;
        try {
          e: {
            F = !1, Ee && (Ee = !1, et($), $ = -1), W = !0;
            var L = B;
            try {
              t: {
                for (me(O), j = o(z); j !== null && !(j.expirationTime > O && Vt()); ) {
                  var ye = j.callback;
                  if (typeof ye == "function") {
                    j.callback = null, B = j.priorityLevel;
                    var be = ye(
                      j.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof be == "function") {
                      j.callback = be, me(O), C = !0;
                      break t;
                    }
                    j === o(z) && f(z), me(O);
                  } else f(z);
                  j = o(z);
                }
                if (j !== null) C = !0;
                else {
                  var p = o(g);
                  p !== null && ve(
                    He,
                    p.startTime - O
                  ), C = !1;
                }
              }
              break e;
            } finally {
              j = null, B = L, W = !1;
            }
            C = void 0;
          }
        } finally {
          C ? Ie() : We = !1;
        }
      }
    }
    var Ie;
    if (typeof fe == "function")
      Ie = function() {
        fe(dt);
      };
    else if (typeof MessageChannel < "u") {
      var Yt = new MessageChannel(), Ht = Yt.port2;
      Yt.port1.onmessage = dt, Ie = function() {
        Ht.postMessage(null);
      };
    } else
      Ie = function() {
        oe(dt, 0);
      };
    function ve(O, C) {
      $ = oe(function() {
        O(a.unstable_now());
      }, C);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Fe = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return B;
    }, a.unstable_next = function(O) {
      switch (B) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = B;
      }
      var L = B;
      B = C;
      try {
        return O();
      } finally {
        B = L;
      }
    }, a.unstable_requestPaint = function() {
      te = !0;
    }, a.unstable_runWithPriority = function(O, C) {
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
      var L = B;
      B = O;
      try {
        return C();
      } finally {
        B = L;
      }
    }, a.unstable_scheduleCallback = function(O, C, L) {
      var ye = a.unstable_now();
      switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? ye + L : ye) : L = ye, O) {
        case 1:
          var be = -1;
          break;
        case 2:
          be = 250;
          break;
        case 5:
          be = 1073741823;
          break;
        case 4:
          be = 1e4;
          break;
        default:
          be = 5e3;
      }
      return be = L + be, O = {
        id: R++,
        callback: C,
        priorityLevel: O,
        startTime: L,
        expirationTime: be,
        sortIndex: -1
      }, L > ye ? (O.sortIndex = L, i(g, O), o(z) === null && O === o(g) && (Ee ? (et($), $ = -1) : Ee = !0, ve(He, L - ye))) : (O.sortIndex = be, i(z, O), F || W || (F = !0, We || (We = !0, Ie()))), O;
    }, a.unstable_shouldYield = Vt, a.unstable_wrapCallback = function(O) {
      var C = B;
      return function() {
        var L = B;
        B = C;
        try {
          return O.apply(this, arguments);
        } finally {
          B = L;
        }
      };
    };
  })(Ko)), Ko;
}
var _h;
function $0() {
  return _h || (_h = 1, ko.exports = J0()), ko.exports;
}
var Jo = { exports: {} }, Pe = {};
var bh;
function W0() {
  if (bh) return Pe;
  bh = 1;
  var a = ef();
  function i(z) {
    var g = "https://react.dev/errors/" + z;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        g += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + z + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var f = {
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
  }, d = Symbol.for("react.portal");
  function h(z, g, R) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: j == null ? null : "" + j,
      children: z,
      containerInfo: g,
      implementation: R
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(z, g) {
    if (z === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, Pe.createPortal = function(z, g) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(i(299));
    return h(z, g, null, R);
  }, Pe.flushSync = function(z) {
    var g = m.T, R = f.p;
    try {
      if (m.T = null, f.p = 2, z) return z();
    } finally {
      m.T = g, f.p = R, f.d.f();
    }
  }, Pe.preconnect = function(z, g) {
    typeof z == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, f.d.C(z, g));
  }, Pe.prefetchDNS = function(z) {
    typeof z == "string" && f.d.D(z);
  }, Pe.preinit = function(z, g) {
    if (typeof z == "string" && g && typeof g.as == "string") {
      var R = g.as, j = T(R, g.crossOrigin), B = typeof g.integrity == "string" ? g.integrity : void 0, W = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      R === "style" ? f.d.S(
        z,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: j,
          integrity: B,
          fetchPriority: W
        }
      ) : R === "script" && f.d.X(z, {
        crossOrigin: j,
        integrity: B,
        fetchPriority: W,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Pe.preinitModule = function(z, g) {
    if (typeof z == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var R = T(
            g.as,
            g.crossOrigin
          );
          f.d.M(z, {
            crossOrigin: R,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && f.d.M(z);
  }, Pe.preload = function(z, g) {
    if (typeof z == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var R = g.as, j = T(R, g.crossOrigin);
      f.d.L(z, R, {
        crossOrigin: j,
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
  }, Pe.preloadModule = function(z, g) {
    if (typeof z == "string")
      if (g) {
        var R = T(g.as, g.crossOrigin);
        f.d.m(z, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: R,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else f.d.m(z);
  }, Pe.requestFormReset = function(z) {
    f.d.r(z);
  }, Pe.unstable_batchedUpdates = function(z, g) {
    return z(g);
  }, Pe.useFormState = function(z, g, R) {
    return m.H.useFormState(z, g, R);
  }, Pe.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Pe.version = "19.2.1", Pe;
}
var Sh;
function F0() {
  if (Sh) return Jo.exports;
  Sh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), Jo.exports = W0(), Jo.exports;
}
var zh;
function I0() {
  if (zh) return La;
  zh = 1;
  var a = $0(), i = ef(), o = F0();
  function f(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
    var t = e, l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? l : null;
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
  function z(e) {
    if (h(e) !== e)
      throw Error(f(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(f(188));
      return t !== e ? null : e;
    }
    for (var l = e, n = t; ; ) {
      var u = l.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (n = u.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c; ) {
          if (c === l) return z(u), e;
          if (c === n) return z(u), t;
          c = c.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== n.return) l = u, n = c;
      else {
        for (var r = !1, s = u.child; s; ) {
          if (s === l) {
            r = !0, l = u, n = c;
            break;
          }
          if (s === n) {
            r = !0, n = u, l = c;
            break;
          }
          s = s.sibling;
        }
        if (!r) {
          for (s = c.child; s; ) {
            if (s === l) {
              r = !0, l = c, n = u;
              break;
            }
            if (s === n) {
              r = !0, n = c, l = u;
              break;
            }
            s = s.sibling;
          }
          if (!r) throw Error(f(189));
        }
      }
      if (l.alternate !== n) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? e : t;
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
  var j = Object.assign, B = Symbol.for("react.element"), W = Symbol.for("react.transitional.element"), F = Symbol.for("react.portal"), Ee = Symbol.for("react.fragment"), te = Symbol.for("react.strict_mode"), oe = Symbol.for("react.profiler"), et = Symbol.for("react.consumer"), fe = Symbol.for("react.context"), me = Symbol.for("react.forward_ref"), He = Symbol.for("react.suspense"), We = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), Fe = Symbol.for("react.lazy"), nt = Symbol.for("react.activity"), Vt = Symbol.for("react.memo_cache_sentinel"), dt = Symbol.iterator;
  function Ie(e) {
    return e === null || typeof e != "object" ? null : (e = dt && e[dt] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Yt = Symbol.for("react.client.reference");
  function Ht(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Yt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ee:
        return "Fragment";
      case oe:
        return "Profiler";
      case te:
        return "StrictMode";
      case He:
        return "Suspense";
      case We:
        return "SuspenseList";
      case nt:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case F:
          return "Portal";
        case fe:
          return e.displayName || "Context";
        case et:
          return (e._context.displayName || "Context") + ".Consumer";
        case me:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return t = e.displayName || null, t !== null ? t : Ht(e.type) || "Memo";
        case Fe:
          t = e._payload, e = e._init;
          try {
            return Ht(e(t));
          } catch {
          }
      }
    return null;
  }
  var ve = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ye = [], be = -1;
  function p(e) {
    return { current: e };
  }
  function Z(e) {
    0 > be || (e.current = ye[be], ye[be] = null, be--);
  }
  function H(e, t) {
    be++, ye[be] = e.current, e.current = t;
  }
  var q = p(null), k = p(null), I = p(null), se = p(null);
  function tt(e, t) {
    switch (H(I, t), H(k, e), H(q, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? wd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = wd(t), e = Bd(t, e);
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
    Z(q), H(q, e);
  }
  function Ze() {
    Z(q), Z(k), Z(I);
  }
  function Wn(e) {
    e.memoizedState !== null && H(se, e);
    var t = q.current, l = Bd(t, e.type);
    t !== l && (H(k, e), H(q, l));
  }
  function Ka(e) {
    k.current === e && (Z(q), Z(k)), se.current === e && (Z(se), qa._currentValue = L);
  }
  var Ti, hf;
  function Bl(e) {
    if (Ti === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        Ti = t && t[1] || "", hf = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ti + e + hf;
  }
  var Ai = !1;
  function Oi(e, t) {
    if (!e || Ai) return "";
    Ai = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var D = function() {
                throw Error();
              };
              if (Object.defineProperty(D.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(D, []);
                } catch (A) {
                  var E = A;
                }
                Reflect.construct(e, [], D);
              } else {
                try {
                  D.call();
                } catch (A) {
                  E = A;
                }
                e.call(D.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                E = A;
              }
              (D = e()) && typeof D.catch == "function" && D.catch(function() {
              });
            }
          } catch (A) {
            if (A && E && typeof A.stack == "string")
              return [A.stack, E.stack];
          }
          return [null, null];
        }
      };
      n.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        n.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        n.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = n.DetermineComponentFrameRoot(), r = c[0], s = c[1];
      if (r && s) {
        var v = r.split(`
`), S = s.split(`
`);
        for (u = n = 0; n < v.length && !v[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; u < S.length && !S[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (n === v.length || u === S.length)
          for (n = v.length - 1, u = S.length - 1; 1 <= n && 0 <= u && v[n] !== S[u]; )
            u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (v[n] !== S[u]) {
            if (n !== 1 || u !== 1)
              do
                if (n--, u--, 0 > u || v[n] !== S[u]) {
                  var x = `
` + v[n].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), x;
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      Ai = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Bl(l) : "";
  }
  function zm(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Bl(e.type);
      case 16:
        return Bl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Bl("Suspense Fallback") : Bl("Suspense");
      case 19:
        return Bl("SuspenseList");
      case 0:
      case 15:
        return Oi(e.type, !1);
      case 11:
        return Oi(e.type.render, !1);
      case 1:
        return Oi(e.type, !0);
      case 31:
        return Bl("Activity");
      default:
        return "";
    }
  }
  function mf(e) {
    try {
      var t = "", l = null;
      do
        t += zm(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var xi = Object.prototype.hasOwnProperty, Mi = a.unstable_scheduleCallback, Ni = a.unstable_cancelCallback, Em = a.unstable_shouldYield, Tm = a.unstable_requestPaint, ht = a.unstable_now, Am = a.unstable_getCurrentPriorityLevel, vf = a.unstable_ImmediatePriority, yf = a.unstable_UserBlockingPriority, Ja = a.unstable_NormalPriority, Om = a.unstable_LowPriority, gf = a.unstable_IdlePriority, xm = a.log, Mm = a.unstable_setDisableYieldValue, Fn = null, mt = null;
  function rl(e) {
    if (typeof xm == "function" && Mm(e), mt && typeof mt.setStrictMode == "function")
      try {
        mt.setStrictMode(Fn, e);
      } catch {
      }
  }
  var vt = Math.clz32 ? Math.clz32 : Um, Nm = Math.log, Dm = Math.LN2;
  function Um(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Nm(e) / Dm | 0) | 0;
  }
  var $a = 256, Wa = 262144, Fa = 4194304;
  function ql(e) {
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
  function Ia(e, t, l) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var u = 0, c = e.suspendedLanes, r = e.pingedLanes;
    e = e.warmLanes;
    var s = n & 134217727;
    return s !== 0 ? (n = s & ~c, n !== 0 ? u = ql(n) : (r &= s, r !== 0 ? u = ql(r) : l || (l = s & ~e, l !== 0 && (u = ql(l))))) : (s = n & ~c, s !== 0 ? u = ql(s) : r !== 0 ? u = ql(r) : l || (l = n & ~e, l !== 0 && (u = ql(l)))), u === 0 ? 0 : t !== 0 && t !== u && (t & c) === 0 && (c = u & -u, l = t & -t, c >= l || c === 32 && (l & 4194048) !== 0) ? t : u;
  }
  function In(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Zm(e, t) {
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
  function pf() {
    var e = Fa;
    return Fa <<= 1, (Fa & 62914560) === 0 && (Fa = 4194304), e;
  }
  function Di(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Pn(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function jm(e, t, l, n, u, c) {
    var r = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var s = e.entanglements, v = e.expirationTimes, S = e.hiddenUpdates;
    for (l = r & ~l; 0 < l; ) {
      var x = 31 - vt(l), D = 1 << x;
      s[x] = 0, v[x] = -1;
      var E = S[x];
      if (E !== null)
        for (S[x] = null, x = 0; x < E.length; x++) {
          var A = E[x];
          A !== null && (A.lane &= -536870913);
        }
      l &= ~D;
    }
    n !== 0 && _f(e, n, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(r & ~t));
  }
  function _f(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var n = 31 - vt(t);
    e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | l & 261930;
  }
  function bf(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var n = 31 - vt(l), u = 1 << n;
      u & t | e[n] & t && (e[n] |= t), l &= ~u;
    }
  }
  function Sf(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : Ui(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function Ui(e) {
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
  function Zi(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function zf() {
    var e = C.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ch(e.type));
  }
  function Ef(e, t) {
    var l = C.p;
    try {
      return C.p = e, t();
    } finally {
      C.p = l;
    }
  }
  var sl = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + sl, at = "__reactProps$" + sl, un = "__reactContainer$" + sl, ji = "__reactEvents$" + sl, Rm = "__reactListeners$" + sl, Cm = "__reactHandles$" + sl, Tf = "__reactResources$" + sl, ea = "__reactMarker$" + sl;
  function Ri(e) {
    delete e[Ve], delete e[at], delete e[ji], delete e[Rm], delete e[Cm];
  }
  function cn(e) {
    var t = e[Ve];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[un] || l[Ve]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = Vd(e); e !== null; ) {
            if (l = e[Ve]) return l;
            e = Vd(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function on(e) {
    if (e = e[Ve] || e[un]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ta(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(f(33));
  }
  function fn(e) {
    var t = e[Tf];
    return t || (t = e[Tf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Qe(e) {
    e[ea] = !0;
  }
  var Af = /* @__PURE__ */ new Set(), Of = {};
  function Yl(e, t) {
    rn(e, t), rn(e + "Capture", t);
  }
  function rn(e, t) {
    for (Of[e] = t, e = 0; e < t.length; e++)
      Af.add(t[e]);
  }
  var Hm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), xf = {}, Mf = {};
  function wm(e) {
    return xi.call(Mf, e) ? !0 : xi.call(xf, e) ? !1 : Hm.test(e) ? Mf[e] = !0 : (xf[e] = !0, !1);
  }
  function Pa(e, t, l) {
    if (wm(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var n = t.toLowerCase().slice(0, 5);
            if (n !== "data-" && n !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function eu(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function kt(e, t, l, n) {
    if (n === null) e.removeAttribute(l);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + n);
    }
  }
  function Tt(e) {
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
  function Nf(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Bm(e, t, l) {
    var n = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var u = n.get, c = n.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(r) {
          l = "" + r, c.call(this, r);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(r) {
          l = "" + r;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ci(e) {
    if (!e._valueTracker) {
      var t = Nf(e) ? "checked" : "value";
      e._valueTracker = Bm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Df(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), n = "";
    return e && (n = Nf(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== l ? (t.setValue(e), !0) : !1;
  }
  function tu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var qm = /[\n"\\]/g;
  function At(e) {
    return e.replace(
      qm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hi(e, t, l, n, u, c, r, s) {
    e.name = "", r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.type = r : e.removeAttribute("type"), t != null ? r === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Tt(t)) : e.value !== "" + Tt(t) && (e.value = "" + Tt(t)) : r !== "submit" && r !== "reset" || e.removeAttribute("value"), t != null ? wi(e, r, Tt(t)) : l != null ? wi(e, r, Tt(l)) : n != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Tt(s) : e.removeAttribute("name");
  }
  function Uf(e, t, l, n, u, c, r, s) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || l != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        Ci(e);
        return;
      }
      l = l != null ? "" + Tt(l) : "", t = t != null ? "" + Tt(t) : l, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = n ?? u, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = s ? e.checked : !!n, e.defaultChecked = !!n, r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.name = r), Ci(e);
  }
  function wi(e, t, l) {
    t === "number" && tu(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function sn(e, t, l, n) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < l.length; u++)
        t["$" + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        u = t.hasOwnProperty("$" + e[l].value), e[l].selected !== u && (e[l].selected = u), u && n && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Tt(l), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === l) {
          e[u].selected = !0, n && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Zf(e, t, l) {
    if (t != null && (t = "" + Tt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Tt(l) : "";
  }
  function jf(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(f(92));
        if (ve(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), t = l;
    }
    l = Tt(t), e.defaultValue = l, n = e.textContent, n === l && n !== "" && n !== null && (e.value = n), Ci(e);
  }
  function dn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ym = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rf(e, t, l) {
    var n = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, l) : typeof l != "number" || l === 0 || Ym.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Cf(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(f(62));
    if (e = e.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "");
      for (var u in t)
        n = t[u], t.hasOwnProperty(u) && l[u] !== n && Rf(e, u, n);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Rf(e, c, t[c]);
  }
  function Bi(e) {
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
  ]), Xm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function lu(e) {
    return Xm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Kt() {
  }
  var qi = null;
  function Yi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var hn = null, mn = null;
  function Hf(e) {
    var t = on(e);
    if (t && (e = t.stateNode)) {
      var l = e[at] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Hi(
            e,
            l.value,
            l.defaultValue,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name
          ), t = l.name, l.type === "radio" && t != null) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (l = l.querySelectorAll(
              'input[name="' + At(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[at] || null;
                if (!u) throw Error(f(90));
                Hi(
                  n,
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
            for (t = 0; t < l.length; t++)
              n = l[t], n.form === e.form && Df(n);
          }
          break e;
        case "textarea":
          Zf(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && sn(e, !!l.multiple, t, !1);
      }
    }
  }
  var Gi = !1;
  function wf(e, t, l) {
    if (Gi) return e(t, l);
    Gi = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (Gi = !1, (hn !== null || mn !== null) && (Qu(), hn && (t = hn, e = mn, mn = hn = null, Hf(t), e)))
        for (t = 0; t < e.length; t++) Hf(e[t]);
    }
  }
  function la(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[at] || null;
    if (n === null) return null;
    l = n[t];
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
        (n = !n.disabled) || (e = e.type, n = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !n;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function")
      throw Error(
        f(231, t, typeof l)
      );
    return l;
  }
  var Jt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Xi = !1;
  if (Jt)
    try {
      var na = {};
      Object.defineProperty(na, "passive", {
        get: function() {
          Xi = !0;
        }
      }), window.addEventListener("test", na, na), window.removeEventListener("test", na, na);
    } catch {
      Xi = !1;
    }
  var dl = null, Qi = null, nu = null;
  function Bf() {
    if (nu) return nu;
    var e, t = Qi, l = t.length, n, u = "value" in dl ? dl.value : dl.textContent, c = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++) ;
    var r = l - e;
    for (n = 1; n <= r && t[l - n] === u[c - n]; n++) ;
    return nu = u.slice(e, 1 < n ? 1 - n : void 0);
  }
  function au(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function uu() {
    return !0;
  }
  function qf() {
    return !1;
  }
  function ut(e) {
    function t(l, n, u, c, r) {
      this._reactName = l, this._targetInst = u, this.type = n, this.nativeEvent = c, this.target = r, this.currentTarget = null;
      for (var s in e)
        e.hasOwnProperty(s) && (l = e[s], this[s] = l ? l(c) : c[s]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? uu : qf, this.isPropagationStopped = qf, this;
    }
    return j(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = uu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = uu);
      },
      persist: function() {
      },
      isPersistent: uu
    }), t;
  }
  var Gl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, iu = ut(Gl), aa = j({}, Gl, { view: 0, detail: 0 }), Qm = ut(aa), Li, Vi, ua, cu = j({}, aa, {
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
    getModifierState: Ki,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ua && (ua && e.type === "mousemove" ? (Li = e.screenX - ua.screenX, Vi = e.screenY - ua.screenY) : Vi = Li = 0, ua = e), Li);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Vi;
    }
  }), Yf = ut(cu), Lm = j({}, cu, { dataTransfer: 0 }), Vm = ut(Lm), km = j({}, aa, { relatedTarget: 0 }), ki = ut(km), Km = j({}, Gl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jm = ut(Km), $m = j({}, Gl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Wm = ut($m), Fm = j({}, Gl, { data: 0 }), Gf = ut(Fm), Im = {
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
  }, Pm = {
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
  }, ev = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function tv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = ev[e]) ? !!t[e] : !1;
  }
  function Ki() {
    return tv;
  }
  var lv = j({}, aa, {
    key: function(e) {
      if (e.key) {
        var t = Im[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = au(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pm[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ki,
    charCode: function(e) {
      return e.type === "keypress" ? au(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? au(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), nv = ut(lv), av = j({}, cu, {
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
  }), Xf = ut(av), uv = j({}, aa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ki
  }), iv = ut(uv), cv = j({}, Gl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), ov = ut(cv), fv = j({}, cu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), rv = ut(fv), sv = j({}, Gl, {
    newState: 0,
    oldState: 0
  }), dv = ut(sv), hv = [9, 13, 27, 32], Ji = Jt && "CompositionEvent" in window, ia = null;
  Jt && "documentMode" in document && (ia = document.documentMode);
  var mv = Jt && "TextEvent" in window && !ia, Qf = Jt && (!Ji || ia && 8 < ia && 11 >= ia), Lf = " ", Vf = !1;
  function kf(e, t) {
    switch (e) {
      case "keyup":
        return hv.indexOf(t.keyCode) !== -1;
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
  function Kf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var vn = !1;
  function vv(e, t) {
    switch (e) {
      case "compositionend":
        return Kf(t);
      case "keypress":
        return t.which !== 32 ? null : (Vf = !0, Lf);
      case "textInput":
        return e = t.data, e === Lf && Vf ? null : e;
      default:
        return null;
    }
  }
  function yv(e, t) {
    if (vn)
      return e === "compositionend" || !Ji && kf(e, t) ? (e = Bf(), nu = Qi = dl = null, vn = !1, e) : null;
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
        return Qf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var gv = {
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
  function Jf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!gv[e.type] : t === "textarea";
  }
  function $f(e, t, l, n) {
    hn ? mn ? mn.push(n) : mn = [n] : hn = n, t = Wu(t, "onChange"), 0 < t.length && (l = new iu(
      "onChange",
      "change",
      null,
      l,
      n
    ), e.push({ event: l, listeners: t }));
  }
  var ca = null, oa = null;
  function pv(e) {
    Ud(e, 0);
  }
  function ou(e) {
    var t = ta(e);
    if (Df(t)) return e;
  }
  function Wf(e, t) {
    if (e === "change") return t;
  }
  var Ff = !1;
  if (Jt) {
    var $i;
    if (Jt) {
      var Wi = "oninput" in document;
      if (!Wi) {
        var If = document.createElement("div");
        If.setAttribute("oninput", "return;"), Wi = typeof If.oninput == "function";
      }
      $i = Wi;
    } else $i = !1;
    Ff = $i && (!document.documentMode || 9 < document.documentMode);
  }
  function Pf() {
    ca && (ca.detachEvent("onpropertychange", er), oa = ca = null);
  }
  function er(e) {
    if (e.propertyName === "value" && ou(oa)) {
      var t = [];
      $f(
        t,
        oa,
        e,
        Yi(e)
      ), wf(pv, t);
    }
  }
  function _v(e, t, l) {
    e === "focusin" ? (Pf(), ca = t, oa = l, ca.attachEvent("onpropertychange", er)) : e === "focusout" && Pf();
  }
  function bv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return ou(oa);
  }
  function Sv(e, t) {
    if (e === "click") return ou(t);
  }
  function zv(e, t) {
    if (e === "input" || e === "change")
      return ou(t);
  }
  function Ev(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var yt = typeof Object.is == "function" ? Object.is : Ev;
  function fa(e, t) {
    if (yt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!xi.call(t, u) || !yt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function tr(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function lr(e, t) {
    var l = tr(e);
    e = 0;
    for (var n; l; ) {
      if (l.nodeType === 3) {
        if (n = e + l.textContent.length, e <= t && n >= t)
          return { node: l, offset: t - e };
        e = n;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = tr(l);
    }
  }
  function nr(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ar(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = tu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = tu(e.document);
    }
    return t;
  }
  function Fi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Tv = Jt && "documentMode" in document && 11 >= document.documentMode, yn = null, Ii = null, ra = null, Pi = !1;
  function ur(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Pi || yn == null || yn !== tu(n) || (n = yn, "selectionStart" in n && Fi(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), ra && fa(ra, n) || (ra = n, n = Wu(Ii, "onSelect"), 0 < n.length && (t = new iu(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: n }), t.target = yn)));
  }
  function Xl(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var gn = {
    animationend: Xl("Animation", "AnimationEnd"),
    animationiteration: Xl("Animation", "AnimationIteration"),
    animationstart: Xl("Animation", "AnimationStart"),
    transitionrun: Xl("Transition", "TransitionRun"),
    transitionstart: Xl("Transition", "TransitionStart"),
    transitioncancel: Xl("Transition", "TransitionCancel"),
    transitionend: Xl("Transition", "TransitionEnd")
  }, ec = {}, ir = {};
  Jt && (ir = document.createElement("div").style, "AnimationEvent" in window || (delete gn.animationend.animation, delete gn.animationiteration.animation, delete gn.animationstart.animation), "TransitionEvent" in window || delete gn.transitionend.transition);
  function Ql(e) {
    if (ec[e]) return ec[e];
    if (!gn[e]) return e;
    var t = gn[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in ir)
        return ec[e] = t[l];
    return e;
  }
  var cr = Ql("animationend"), or = Ql("animationiteration"), fr = Ql("animationstart"), Av = Ql("transitionrun"), Ov = Ql("transitionstart"), xv = Ql("transitioncancel"), rr = Ql("transitionend"), sr = /* @__PURE__ */ new Map(), tc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  tc.push("scrollEnd");
  function wt(e, t) {
    sr.set(e, t), Yl(t, [e]);
  }
  var fu = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ot = [], pn = 0, lc = 0;
  function ru() {
    for (var e = pn, t = lc = pn = 0; t < e; ) {
      var l = Ot[t];
      Ot[t++] = null;
      var n = Ot[t];
      Ot[t++] = null;
      var u = Ot[t];
      Ot[t++] = null;
      var c = Ot[t];
      if (Ot[t++] = null, n !== null && u !== null) {
        var r = n.pending;
        r === null ? u.next = u : (u.next = r.next, r.next = u), n.pending = u;
      }
      c !== 0 && dr(l, u, c);
    }
  }
  function su(e, t, l, n) {
    Ot[pn++] = e, Ot[pn++] = t, Ot[pn++] = l, Ot[pn++] = n, lc |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
  }
  function nc(e, t, l, n) {
    return su(e, t, l, n), du(e);
  }
  function Ll(e, t) {
    return su(e, null, null, t), du(e);
  }
  function dr(e, t, l) {
    e.lanes |= l;
    var n = e.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= l, n = c.alternate, n !== null && (n.childLanes |= l), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - vt(l), e = c.hiddenUpdates, n = e[u], n === null ? e[u] = [t] : n.push(t), t.lane = l | 536870912), c) : null;
  }
  function du(e) {
    if (50 < Za)
      throw Za = 0, ho = null, Error(f(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var _n = {};
  function Mv(e, t, l, n) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gt(e, t, l, n) {
    return new Mv(e, t, l, n);
  }
  function ac(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function $t(e, t) {
    var l = e.alternate;
    return l === null ? (l = gt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function hr(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function hu(e, t, l, n, u, c) {
    var r = 0;
    if (n = e, typeof e == "function") ac(e) && (r = 1);
    else if (typeof e == "string")
      r = j0(
        e,
        l,
        q.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case nt:
          return e = gt(31, l, t, u), e.elementType = nt, e.lanes = c, e;
        case Ee:
          return Vl(l.children, u, c, t);
        case te:
          r = 8, u |= 24;
          break;
        case oe:
          return e = gt(12, l, t, u | 2), e.elementType = oe, e.lanes = c, e;
        case He:
          return e = gt(13, l, t, u), e.elementType = He, e.lanes = c, e;
        case We:
          return e = gt(19, l, t, u), e.elementType = We, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case fe:
                r = 10;
                break e;
              case et:
                r = 9;
                break e;
              case me:
                r = 11;
                break e;
              case $:
                r = 14;
                break e;
              case Fe:
                r = 16, n = null;
                break e;
            }
          r = 29, l = Error(
            f(130, e === null ? "null" : typeof e, "")
          ), n = null;
      }
    return t = gt(r, l, t, u), t.elementType = e, t.type = n, t.lanes = c, t;
  }
  function Vl(e, t, l, n) {
    return e = gt(7, e, n, t), e.lanes = l, e;
  }
  function uc(e, t, l) {
    return e = gt(6, e, null, t), e.lanes = l, e;
  }
  function mr(e) {
    var t = gt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ic(e, t, l) {
    return t = gt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = l, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var vr = /* @__PURE__ */ new WeakMap();
  function xt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = vr.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: mf(t)
      }, vr.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: mf(t)
    };
  }
  var bn = [], Sn = 0, mu = null, sa = 0, Mt = [], Nt = 0, hl = null, Gt = 1, Xt = "";
  function Wt(e, t) {
    bn[Sn++] = sa, bn[Sn++] = mu, mu = e, sa = t;
  }
  function yr(e, t, l) {
    Mt[Nt++] = Gt, Mt[Nt++] = Xt, Mt[Nt++] = hl, hl = e;
    var n = Gt;
    e = Xt;
    var u = 32 - vt(n) - 1;
    n &= ~(1 << u), l += 1;
    var c = 32 - vt(t) + u;
    if (30 < c) {
      var r = u - u % 5;
      c = (n & (1 << r) - 1).toString(32), n >>= r, u -= r, Gt = 1 << 32 - vt(t) + u | l << u | n, Xt = c + e;
    } else
      Gt = 1 << c | l << u | n, Xt = e;
  }
  function cc(e) {
    e.return !== null && (Wt(e, 1), yr(e, 1, 0));
  }
  function oc(e) {
    for (; e === mu; )
      mu = bn[--Sn], bn[Sn] = null, sa = bn[--Sn], bn[Sn] = null;
    for (; e === hl; )
      hl = Mt[--Nt], Mt[Nt] = null, Xt = Mt[--Nt], Mt[Nt] = null, Gt = Mt[--Nt], Mt[Nt] = null;
  }
  function gr(e, t) {
    Mt[Nt++] = Gt, Mt[Nt++] = Xt, Mt[Nt++] = hl, Gt = t.id, Xt = t.overflow, hl = e;
  }
  var ke = null, Te = null, ue = !1, ml = null, Dt = !1, fc = Error(f(519));
  function vl(e) {
    var t = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw da(xt(t, e)), fc;
  }
  function pr(e) {
    var t = e.stateNode, l = e.type, n = e.memoizedProps;
    switch (t[Ve] = e, t[at] = n, l) {
      case "dialog":
        ee("cancel", t), ee("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ee("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ra.length; l++)
          ee(Ra[l], t);
        break;
      case "source":
        ee("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ee("error", t), ee("load", t);
        break;
      case "details":
        ee("toggle", t);
        break;
      case "input":
        ee("invalid", t), Uf(
          t,
          n.value,
          n.defaultValue,
          n.checked,
          n.defaultChecked,
          n.type,
          n.name,
          !0
        );
        break;
      case "select":
        ee("invalid", t);
        break;
      case "textarea":
        ee("invalid", t), jf(t, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || n.suppressHydrationWarning === !0 || Cd(t.textContent, l) ? (n.popover != null && (ee("beforetoggle", t), ee("toggle", t)), n.onScroll != null && ee("scroll", t), n.onScrollEnd != null && ee("scrollend", t), n.onClick != null && (t.onclick = Kt), t = !0) : t = !1, t || vl(e, !0);
  }
  function _r(e) {
    for (ke = e.return; ke; )
      switch (ke.tag) {
        case 5:
        case 31:
        case 13:
          Dt = !1;
          return;
        case 27:
        case 3:
          Dt = !0;
          return;
        default:
          ke = ke.return;
      }
  }
  function zn(e) {
    if (e !== ke) return !1;
    if (!ue) return _r(e), ue = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Mo(e.type, e.memoizedProps)), l = !l), l && Te && vl(e), _r(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      Te = Ld(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      Te = Ld(e);
    } else
      t === 27 ? (t = Te, Nl(e.type) ? (e = jo, jo = null, Te = e) : Te = t) : Te = ke ? Zt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function kl() {
    Te = ke = null, ue = !1;
  }
  function rc() {
    var e = ml;
    return e !== null && (ft === null ? ft = e : ft.push.apply(
      ft,
      e
    ), ml = null), e;
  }
  function da(e) {
    ml === null ? ml = [e] : ml.push(e);
  }
  var sc = p(null), Kl = null, Ft = null;
  function yl(e, t, l) {
    H(sc, t._currentValue), t._currentValue = l;
  }
  function It(e) {
    e._currentValue = sc.current, Z(sc);
  }
  function dc(e, t, l) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function hc(e, t, l, n) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var r = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var s = c;
          c = u;
          for (var v = 0; v < t.length; v++)
            if (s.context === t[v]) {
              c.lanes |= l, s = c.alternate, s !== null && (s.lanes |= l), dc(
                c.return,
                l,
                e
              ), n || (r = null);
              break e;
            }
          c = s.next;
        }
      } else if (u.tag === 18) {
        if (r = u.return, r === null) throw Error(f(341));
        r.lanes |= l, c = r.alternate, c !== null && (c.lanes |= l), dc(r, l, e), r = null;
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
  function En(e, t, l, n) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var r = u.alternate;
        if (r === null) throw Error(f(387));
        if (r = r.memoizedProps, r !== null) {
          var s = u.type;
          yt(u.pendingProps.value, r.value) || (e !== null ? e.push(s) : e = [s]);
        }
      } else if (u === se.current) {
        if (r = u.alternate, r === null) throw Error(f(387));
        r.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(qa) : e = [qa]);
      }
      u = u.return;
    }
    e !== null && hc(
      t,
      e,
      l,
      n
    ), t.flags |= 262144;
  }
  function vu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!yt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Jl(e) {
    Kl = e, Ft = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ke(e) {
    return br(Kl, e);
  }
  function yu(e, t) {
    return Kl === null && Jl(e), br(e, t);
  }
  function br(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Ft === null) {
      if (e === null) throw Error(f(308));
      Ft = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ft = Ft.next = t;
    return l;
  }
  var Nv = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(l, n) {
        e.push(n);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(l) {
        return l();
      });
    };
  }, Dv = a.unstable_scheduleCallback, Uv = a.unstable_NormalPriority, we = {
    $$typeof: fe,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function mc() {
    return {
      controller: new Nv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ha(e) {
    e.refCount--, e.refCount === 0 && Dv(Uv, function() {
      e.controller.abort();
    });
  }
  var ma = null, vc = 0, Tn = 0, An = null;
  function Zv(e, t) {
    if (ma === null) {
      var l = ma = [];
      vc = 0, Tn = _o(), An = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return vc++, t.then(Sr, Sr), t;
  }
  function Sr() {
    if (--vc === 0 && ma !== null) {
      An !== null && (An.status = "fulfilled");
      var e = ma;
      ma = null, Tn = 0, An = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function jv(e, t) {
    var l = [], n = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        l.push(u);
      }
    };
    return e.then(
      function() {
        n.status = "fulfilled", n.value = t;
        for (var u = 0; u < l.length; u++) (0, l[u])(t);
      },
      function(u) {
        for (n.status = "rejected", n.reason = u, u = 0; u < l.length; u++)
          (0, l[u])(void 0);
      }
    ), n;
  }
  var zr = O.S;
  O.S = function(e, t) {
    ud = ht(), typeof t == "object" && t !== null && typeof t.then == "function" && Zv(e, t), zr !== null && zr(e, t);
  };
  var $l = p(null);
  function yc() {
    var e = $l.current;
    return e !== null ? e : Se.pooledCache;
  }
  function gu(e, t) {
    t === null ? H($l, $l.current) : H($l, t.pool);
  }
  function Er() {
    var e = yc();
    return e === null ? null : { parent: we._currentValue, pool: e };
  }
  var On = Error(f(460)), gc = Error(f(474)), pu = Error(f(542)), _u = { then: function() {
  } };
  function Tr(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ar(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Kt, Kt), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, xr(e), e;
      default:
        if (typeof t.status == "string") t.then(Kt, Kt);
        else {
          if (e = Se, e !== null && 100 < e.shellSuspendCounter)
            throw Error(f(482));
          e = t, e.status = "pending", e.then(
            function(n) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = n;
              }
            },
            function(n) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = n;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, xr(e), e;
        }
        throw Fl = t, On;
    }
  }
  function Wl(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Fl = l, On) : l;
    }
  }
  var Fl = null;
  function Or() {
    if (Fl === null) throw Error(f(459));
    var e = Fl;
    return Fl = null, e;
  }
  function xr(e) {
    if (e === On || e === pu)
      throw Error(f(483));
  }
  var xn = null, va = 0;
  function bu(e) {
    var t = va;
    return va += 1, xn === null && (xn = []), Ar(xn, e, t);
  }
  function ya(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Su(e, t) {
    throw t.$$typeof === B ? Error(f(525)) : (e = Object.prototype.toString.call(t), Error(
      f(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Mr(e) {
    function t(_, y) {
      if (e) {
        var b = _.deletions;
        b === null ? (_.deletions = [y], _.flags |= 16) : b.push(y);
      }
    }
    function l(_, y) {
      if (!e) return null;
      for (; y !== null; )
        t(_, y), y = y.sibling;
      return null;
    }
    function n(_) {
      for (var y = /* @__PURE__ */ new Map(); _ !== null; )
        _.key !== null ? y.set(_.key, _) : y.set(_.index, _), _ = _.sibling;
      return y;
    }
    function u(_, y) {
      return _ = $t(_, y), _.index = 0, _.sibling = null, _;
    }
    function c(_, y, b) {
      return _.index = b, e ? (b = _.alternate, b !== null ? (b = b.index, b < y ? (_.flags |= 67108866, y) : b) : (_.flags |= 67108866, y)) : (_.flags |= 1048576, y);
    }
    function r(_) {
      return e && _.alternate === null && (_.flags |= 67108866), _;
    }
    function s(_, y, b, N) {
      return y === null || y.tag !== 6 ? (y = uc(b, _.mode, N), y.return = _, y) : (y = u(y, b), y.return = _, y);
    }
    function v(_, y, b, N) {
      var G = b.type;
      return G === Ee ? x(
        _,
        y,
        b.props.children,
        N,
        b.key
      ) : y !== null && (y.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Fe && Wl(G) === y.type) ? (y = u(y, b.props), ya(y, b), y.return = _, y) : (y = hu(
        b.type,
        b.key,
        b.props,
        null,
        _.mode,
        N
      ), ya(y, b), y.return = _, y);
    }
    function S(_, y, b, N) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== b.containerInfo || y.stateNode.implementation !== b.implementation ? (y = ic(b, _.mode, N), y.return = _, y) : (y = u(y, b.children || []), y.return = _, y);
    }
    function x(_, y, b, N, G) {
      return y === null || y.tag !== 7 ? (y = Vl(
        b,
        _.mode,
        N,
        G
      ), y.return = _, y) : (y = u(y, b), y.return = _, y);
    }
    function D(_, y, b) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = uc(
          "" + y,
          _.mode,
          b
        ), y.return = _, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case W:
            return b = hu(
              y.type,
              y.key,
              y.props,
              null,
              _.mode,
              b
            ), ya(b, y), b.return = _, b;
          case F:
            return y = ic(
              y,
              _.mode,
              b
            ), y.return = _, y;
          case Fe:
            return y = Wl(y), D(_, y, b);
        }
        if (ve(y) || Ie(y))
          return y = Vl(
            y,
            _.mode,
            b,
            null
          ), y.return = _, y;
        if (typeof y.then == "function")
          return D(_, bu(y), b);
        if (y.$$typeof === fe)
          return D(
            _,
            yu(_, y),
            b
          );
        Su(_, y);
      }
      return null;
    }
    function E(_, y, b, N) {
      var G = y !== null ? y.key : null;
      if (typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint")
        return G !== null ? null : s(_, y, "" + b, N);
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case W:
            return b.key === G ? v(_, y, b, N) : null;
          case F:
            return b.key === G ? S(_, y, b, N) : null;
          case Fe:
            return b = Wl(b), E(_, y, b, N);
        }
        if (ve(b) || Ie(b))
          return G !== null ? null : x(_, y, b, N, null);
        if (typeof b.then == "function")
          return E(
            _,
            y,
            bu(b),
            N
          );
        if (b.$$typeof === fe)
          return E(
            _,
            y,
            yu(_, b),
            N
          );
        Su(_, b);
      }
      return null;
    }
    function A(_, y, b, N, G) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return _ = _.get(b) || null, s(y, _, "" + N, G);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case W:
            return _ = _.get(
              N.key === null ? b : N.key
            ) || null, v(y, _, N, G);
          case F:
            return _ = _.get(
              N.key === null ? b : N.key
            ) || null, S(y, _, N, G);
          case Fe:
            return N = Wl(N), A(
              _,
              y,
              b,
              N,
              G
            );
        }
        if (ve(N) || Ie(N))
          return _ = _.get(b) || null, x(y, _, N, G, null);
        if (typeof N.then == "function")
          return A(
            _,
            y,
            b,
            bu(N),
            G
          );
        if (N.$$typeof === fe)
          return A(
            _,
            y,
            b,
            yu(y, N),
            G
          );
        Su(y, N);
      }
      return null;
    }
    function w(_, y, b, N) {
      for (var G = null, ie = null, Y = y, J = y = 0, ne = null; Y !== null && J < b.length; J++) {
        Y.index > J ? (ne = Y, Y = null) : ne = Y.sibling;
        var ce = E(
          _,
          Y,
          b[J],
          N
        );
        if (ce === null) {
          Y === null && (Y = ne);
          break;
        }
        e && Y && ce.alternate === null && t(_, Y), y = c(ce, y, J), ie === null ? G = ce : ie.sibling = ce, ie = ce, Y = ne;
      }
      if (J === b.length)
        return l(_, Y), ue && Wt(_, J), G;
      if (Y === null) {
        for (; J < b.length; J++)
          Y = D(_, b[J], N), Y !== null && (y = c(
            Y,
            y,
            J
          ), ie === null ? G = Y : ie.sibling = Y, ie = Y);
        return ue && Wt(_, J), G;
      }
      for (Y = n(Y); J < b.length; J++)
        ne = A(
          Y,
          _,
          J,
          b[J],
          N
        ), ne !== null && (e && ne.alternate !== null && Y.delete(
          ne.key === null ? J : ne.key
        ), y = c(
          ne,
          y,
          J
        ), ie === null ? G = ne : ie.sibling = ne, ie = ne);
      return e && Y.forEach(function(Rl) {
        return t(_, Rl);
      }), ue && Wt(_, J), G;
    }
    function Q(_, y, b, N) {
      if (b == null) throw Error(f(151));
      for (var G = null, ie = null, Y = y, J = y = 0, ne = null, ce = b.next(); Y !== null && !ce.done; J++, ce = b.next()) {
        Y.index > J ? (ne = Y, Y = null) : ne = Y.sibling;
        var Rl = E(_, Y, ce.value, N);
        if (Rl === null) {
          Y === null && (Y = ne);
          break;
        }
        e && Y && Rl.alternate === null && t(_, Y), y = c(Rl, y, J), ie === null ? G = Rl : ie.sibling = Rl, ie = Rl, Y = ne;
      }
      if (ce.done)
        return l(_, Y), ue && Wt(_, J), G;
      if (Y === null) {
        for (; !ce.done; J++, ce = b.next())
          ce = D(_, ce.value, N), ce !== null && (y = c(ce, y, J), ie === null ? G = ce : ie.sibling = ce, ie = ce);
        return ue && Wt(_, J), G;
      }
      for (Y = n(Y); !ce.done; J++, ce = b.next())
        ce = A(Y, _, J, ce.value, N), ce !== null && (e && ce.alternate !== null && Y.delete(ce.key === null ? J : ce.key), y = c(ce, y, J), ie === null ? G = ce : ie.sibling = ce, ie = ce);
      return e && Y.forEach(function(L0) {
        return t(_, L0);
      }), ue && Wt(_, J), G;
    }
    function _e(_, y, b, N) {
      if (typeof b == "object" && b !== null && b.type === Ee && b.key === null && (b = b.props.children), typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case W:
            e: {
              for (var G = b.key; y !== null; ) {
                if (y.key === G) {
                  if (G = b.type, G === Ee) {
                    if (y.tag === 7) {
                      l(
                        _,
                        y.sibling
                      ), N = u(
                        y,
                        b.props.children
                      ), N.return = _, _ = N;
                      break e;
                    }
                  } else if (y.elementType === G || typeof G == "object" && G !== null && G.$$typeof === Fe && Wl(G) === y.type) {
                    l(
                      _,
                      y.sibling
                    ), N = u(y, b.props), ya(N, b), N.return = _, _ = N;
                    break e;
                  }
                  l(_, y);
                  break;
                } else t(_, y);
                y = y.sibling;
              }
              b.type === Ee ? (N = Vl(
                b.props.children,
                _.mode,
                N,
                b.key
              ), N.return = _, _ = N) : (N = hu(
                b.type,
                b.key,
                b.props,
                null,
                _.mode,
                N
              ), ya(N, b), N.return = _, _ = N);
            }
            return r(_);
          case F:
            e: {
              for (G = b.key; y !== null; ) {
                if (y.key === G)
                  if (y.tag === 4 && y.stateNode.containerInfo === b.containerInfo && y.stateNode.implementation === b.implementation) {
                    l(
                      _,
                      y.sibling
                    ), N = u(y, b.children || []), N.return = _, _ = N;
                    break e;
                  } else {
                    l(_, y);
                    break;
                  }
                else t(_, y);
                y = y.sibling;
              }
              N = ic(b, _.mode, N), N.return = _, _ = N;
            }
            return r(_);
          case Fe:
            return b = Wl(b), _e(
              _,
              y,
              b,
              N
            );
        }
        if (ve(b))
          return w(
            _,
            y,
            b,
            N
          );
        if (Ie(b)) {
          if (G = Ie(b), typeof G != "function") throw Error(f(150));
          return b = G.call(b), Q(
            _,
            y,
            b,
            N
          );
        }
        if (typeof b.then == "function")
          return _e(
            _,
            y,
            bu(b),
            N
          );
        if (b.$$typeof === fe)
          return _e(
            _,
            y,
            yu(_, b),
            N
          );
        Su(_, b);
      }
      return typeof b == "string" && b !== "" || typeof b == "number" || typeof b == "bigint" ? (b = "" + b, y !== null && y.tag === 6 ? (l(_, y.sibling), N = u(y, b), N.return = _, _ = N) : (l(_, y), N = uc(b, _.mode, N), N.return = _, _ = N), r(_)) : l(_, y);
    }
    return function(_, y, b, N) {
      try {
        va = 0;
        var G = _e(
          _,
          y,
          b,
          N
        );
        return xn = null, G;
      } catch (Y) {
        if (Y === On || Y === pu) throw Y;
        var ie = gt(29, Y, null, _.mode);
        return ie.lanes = N, ie.return = _, ie;
      } finally {
      }
    };
  }
  var Il = Mr(!0), Nr = Mr(!1), gl = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function _c(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function pl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function _l(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (re & 2) !== 0) {
      var u = n.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), n.pending = t, t = du(e), dr(e, null, l), t;
    }
    return su(e, n, t, l), du(e);
  }
  function ga(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, bf(e, l);
    }
  }
  function bc(e, t) {
    var l = e.updateQueue, n = e.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var u = null, c = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var r = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = r : c = c.next = r, l = l.next;
        } while (l !== null);
        c === null ? u = c = t : c = c.next = t;
      } else u = c = t;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: n.shared,
        callbacks: n.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var Sc = !1;
  function pa() {
    if (Sc) {
      var e = An;
      if (e !== null) throw e;
    }
  }
  function _a(e, t, l, n) {
    Sc = !1;
    var u = e.updateQueue;
    gl = !1;
    var c = u.firstBaseUpdate, r = u.lastBaseUpdate, s = u.shared.pending;
    if (s !== null) {
      u.shared.pending = null;
      var v = s, S = v.next;
      v.next = null, r === null ? c = S : r.next = S, r = v;
      var x = e.alternate;
      x !== null && (x = x.updateQueue, s = x.lastBaseUpdate, s !== r && (s === null ? x.firstBaseUpdate = S : s.next = S, x.lastBaseUpdate = v));
    }
    if (c !== null) {
      var D = u.baseState;
      r = 0, x = S = v = null, s = c;
      do {
        var E = s.lane & -536870913, A = E !== s.lane;
        if (A ? (le & E) === E : (n & E) === E) {
          E !== 0 && E === Tn && (Sc = !0), x !== null && (x = x.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          e: {
            var w = e, Q = s;
            E = t;
            var _e = l;
            switch (Q.tag) {
              case 1:
                if (w = Q.payload, typeof w == "function") {
                  D = w.call(_e, D, E);
                  break e;
                }
                D = w;
                break e;
              case 3:
                w.flags = w.flags & -65537 | 128;
              case 0:
                if (w = Q.payload, E = typeof w == "function" ? w.call(_e, D, E) : w, E == null) break e;
                D = j({}, D, E);
                break e;
              case 2:
                gl = !0;
            }
          }
          E = s.callback, E !== null && (e.flags |= 64, A && (e.flags |= 8192), A = u.callbacks, A === null ? u.callbacks = [E] : A.push(E));
        } else
          A = {
            lane: E,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, x === null ? (S = x = A, v = D) : x = x.next = A, r |= E;
        if (s = s.next, s === null) {
          if (s = u.shared.pending, s === null)
            break;
          A = s, s = A.next, A.next = null, u.lastBaseUpdate = A, u.shared.pending = null;
        }
      } while (!0);
      x === null && (v = D), u.baseState = v, u.firstBaseUpdate = S, u.lastBaseUpdate = x, c === null && (u.shared.lanes = 0), Tl |= r, e.lanes = r, e.memoizedState = D;
    }
  }
  function Dr(e, t) {
    if (typeof e != "function")
      throw Error(f(191, e));
    e.call(t);
  }
  function Ur(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Dr(l[e], t);
  }
  var Mn = p(null), zu = p(0);
  function Zr(e, t) {
    e = cl, H(zu, e), H(Mn, t), cl = e | t.baseLanes;
  }
  function zc() {
    H(zu, cl), H(Mn, Mn.current);
  }
  function Ec() {
    cl = zu.current, Z(Mn), Z(zu);
  }
  var pt = p(null), Ut = null;
  function bl(e) {
    var t = e.alternate;
    H(je, je.current & 1), H(pt, e), Ut === null && (t === null || Mn.current !== null || t.memoizedState !== null) && (Ut = e);
  }
  function Tc(e) {
    H(je, je.current), H(pt, e), Ut === null && (Ut = e);
  }
  function jr(e) {
    e.tag === 22 ? (H(je, je.current), H(pt, e), Ut === null && (Ut = e)) : Sl();
  }
  function Sl() {
    H(je, je.current), H(pt, pt.current);
  }
  function _t(e) {
    Z(pt), Ut === e && (Ut = null), Z(je);
  }
  var je = p(0);
  function Eu(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Uo(l) || Zo(l)))
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
  var Pt = 0, K = null, ge = null, Be = null, Tu = !1, Nn = !1, Pl = !1, Au = 0, ba = 0, Dn = null, Rv = 0;
  function De() {
    throw Error(f(321));
  }
  function Ac(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!yt(e[l], t[l])) return !1;
    return !0;
  }
  function Oc(e, t, l, n, u, c) {
    return Pt = c, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? ys : Gc, Pl = !1, c = l(n, u), Pl = !1, Nn && (c = Cr(
      t,
      l,
      n,
      u
    )), Rr(e), c;
  }
  function Rr(e) {
    O.H = Ea;
    var t = ge !== null && ge.next !== null;
    if (Pt = 0, Be = ge = K = null, Tu = !1, ba = 0, Dn = null, t) throw Error(f(300));
    e === null || qe || (e = e.dependencies, e !== null && vu(e) && (qe = !0));
  }
  function Cr(e, t, l, n) {
    K = e;
    var u = 0;
    do {
      if (Nn && (Dn = null), ba = 0, Nn = !1, 25 <= u) throw Error(f(301));
      if (u += 1, Be = ge = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      O.H = gs, c = t(l, n);
    } while (Nn);
    return c;
  }
  function Cv() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Sa(t) : t, e = e.useState()[0], (ge !== null ? ge.memoizedState : null) !== e && (K.flags |= 1024), t;
  }
  function xc() {
    var e = Au !== 0;
    return Au = 0, e;
  }
  function Mc(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function Nc(e) {
    if (Tu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tu = !1;
    }
    Pt = 0, Be = ge = K = null, Nn = !1, ba = Au = 0, Dn = null;
  }
  function lt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Be === null ? K.memoizedState = Be = e : Be = Be.next = e, Be;
  }
  function Re() {
    if (ge === null) {
      var e = K.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = ge.next;
    var t = Be === null ? K.memoizedState : Be.next;
    if (t !== null)
      Be = t, ge = e;
    else {
      if (e === null)
        throw K.alternate === null ? Error(f(467)) : Error(f(310));
      ge = e, e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null
      }, Be === null ? K.memoizedState = Be = e : Be = Be.next = e;
    }
    return Be;
  }
  function Ou() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sa(e) {
    var t = ba;
    return ba += 1, Dn === null && (Dn = []), e = Ar(Dn, e, t), t = K, (Be === null ? t.memoizedState : Be.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? ys : Gc), e;
  }
  function xu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Sa(e);
      if (e.$$typeof === fe) return Ke(e);
    }
    throw Error(f(438, String(e)));
  }
  function Dc(e) {
    var t = null, l = K.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var n = K.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
        data: n.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = Ou(), K.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), n = 0; n < e; n++)
        l[n] = Vt;
    return t.index++, l;
  }
  function el(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Mu(e) {
    var t = Re();
    return Uc(t, ge, e);
  }
  function Uc(e, t, l) {
    var n = e.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = l;
    var u = e.baseQueue, c = n.pending;
    if (c !== null) {
      if (u !== null) {
        var r = u.next;
        u.next = c.next, c.next = r;
      }
      t.baseQueue = u = c, n.pending = null;
    }
    if (c = e.baseState, u === null) e.memoizedState = c;
    else {
      t = u.next;
      var s = r = null, v = null, S = t, x = !1;
      do {
        var D = S.lane & -536870913;
        if (D !== S.lane ? (le & D) === D : (Pt & D) === D) {
          var E = S.revertLane;
          if (E === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }), D === Tn && (x = !0);
          else if ((Pt & E) === E) {
            S = S.next, E === Tn && (x = !0);
            continue;
          } else
            D = {
              lane: 0,
              revertLane: S.revertLane,
              gesture: null,
              action: S.action,
              hasEagerState: S.hasEagerState,
              eagerState: S.eagerState,
              next: null
            }, v === null ? (s = v = D, r = c) : v = v.next = D, K.lanes |= E, Tl |= E;
          D = S.action, Pl && l(c, D), c = S.hasEagerState ? S.eagerState : l(c, D);
        } else
          E = {
            lane: D,
            revertLane: S.revertLane,
            gesture: S.gesture,
            action: S.action,
            hasEagerState: S.hasEagerState,
            eagerState: S.eagerState,
            next: null
          }, v === null ? (s = v = E, r = c) : v = v.next = E, K.lanes |= D, Tl |= D;
        S = S.next;
      } while (S !== null && S !== t);
      if (v === null ? r = c : v.next = s, !yt(c, e.memoizedState) && (qe = !0, x && (l = An, l !== null)))
        throw l;
      e.memoizedState = c, e.baseState = r, e.baseQueue = v, n.lastRenderedState = c;
    }
    return u === null && (n.lanes = 0), [e.memoizedState, n.dispatch];
  }
  function Zc(e) {
    var t = Re(), l = t.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = e;
    var n = l.dispatch, u = l.pending, c = t.memoizedState;
    if (u !== null) {
      l.pending = null;
      var r = u = u.next;
      do
        c = e(c, r.action), r = r.next;
      while (r !== u);
      yt(c, t.memoizedState) || (qe = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), l.lastRenderedState = c;
    }
    return [c, n];
  }
  function Hr(e, t, l) {
    var n = K, u = Re(), c = ue;
    if (c) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = t();
    var r = !yt(
      (ge || u).memoizedState,
      l
    );
    if (r && (u.memoizedState = l, qe = !0), u = u.queue, Cc(qr.bind(null, n, u, e), [
      e
    ]), u.getSnapshot !== t || r || Be !== null && Be.memoizedState.tag & 1) {
      if (n.flags |= 2048, Un(
        9,
        { destroy: void 0 },
        Br.bind(
          null,
          n,
          u,
          l,
          t
        ),
        null
      ), Se === null) throw Error(f(349));
      c || (Pt & 127) !== 0 || wr(n, t, l);
    }
    return l;
  }
  function wr(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = K.updateQueue, t === null ? (t = Ou(), K.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Br(e, t, l, n) {
    t.value = l, t.getSnapshot = n, Yr(t) && Gr(e);
  }
  function qr(e, t, l) {
    return l(function() {
      Yr(t) && Gr(e);
    });
  }
  function Yr(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !yt(e, l);
    } catch {
      return !0;
    }
  }
  function Gr(e) {
    var t = Ll(e, 2);
    t !== null && rt(t, e, 2);
  }
  function jc(e) {
    var t = lt();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Pl) {
        rl(!0);
        try {
          l();
        } finally {
          rl(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: el,
      lastRenderedState: e
    }, t;
  }
  function Xr(e, t, l, n) {
    return e.baseState = l, Uc(
      e,
      ge,
      typeof n == "function" ? n : el
    );
  }
  function Hv(e, t, l, n, u) {
    if (Uu(e)) throw Error(f(485));
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
      O.T !== null ? l(!0) : c.isTransition = !1, n(c), l = t.pending, l === null ? (c.next = t.pending = c, Qr(t, c)) : (c.next = l.next, t.pending = l.next = c);
    }
  }
  function Qr(e, t) {
    var l = t.action, n = t.payload, u = e.state;
    if (t.isTransition) {
      var c = O.T, r = {};
      O.T = r;
      try {
        var s = l(u, n), v = O.S;
        v !== null && v(r, s), Lr(e, t, s);
      } catch (S) {
        Rc(e, t, S);
      } finally {
        c !== null && r.types !== null && (c.types = r.types), O.T = c;
      }
    } else
      try {
        c = l(u, n), Lr(e, t, c);
      } catch (S) {
        Rc(e, t, S);
      }
  }
  function Lr(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        Vr(e, t, n);
      },
      function(n) {
        return Rc(e, t, n);
      }
    ) : Vr(e, t, l);
  }
  function Vr(e, t, l) {
    t.status = "fulfilled", t.value = l, kr(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, Qr(e, l)));
  }
  function Rc(e, t, l) {
    var n = e.pending;
    if (e.pending = null, n !== null) {
      n = n.next;
      do
        t.status = "rejected", t.reason = l, kr(t), t = t.next;
      while (t !== n);
    }
    e.action = null;
  }
  function kr(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Kr(e, t) {
    return t;
  }
  function Jr(e, t) {
    if (ue) {
      var l = Se.formState;
      if (l !== null) {
        e: {
          var n = K;
          if (ue) {
            if (Te) {
              t: {
                for (var u = Te, c = Dt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (u = Zt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                Te = Zt(
                  u.nextSibling
                ), n = u.data === "F!";
                break e;
              }
            }
            vl(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return l = lt(), l.memoizedState = l.baseState = t, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Kr,
      lastRenderedState: t
    }, l.queue = n, l = hs.bind(
      null,
      K,
      n
    ), n.dispatch = l, n = jc(!1), c = Yc.bind(
      null,
      K,
      !1,
      n.queue
    ), n = lt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, n.queue = u, l = Hv.bind(
      null,
      K,
      u,
      c,
      l
    ), u.dispatch = l, n.memoizedState = e, [t, l, !1];
  }
  function $r(e) {
    var t = Re();
    return Wr(t, ge, e);
  }
  function Wr(e, t, l) {
    if (t = Uc(
      e,
      t,
      Kr
    )[0], e = Mu(el)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var n = Sa(t);
      } catch (r) {
        throw r === On ? pu : r;
      }
    else n = t;
    t = Re();
    var u = t.queue, c = u.dispatch;
    return l !== t.memoizedState && (K.flags |= 2048, Un(
      9,
      { destroy: void 0 },
      wv.bind(null, u, l),
      null
    )), [n, c, e];
  }
  function wv(e, t) {
    e.action = t;
  }
  function Fr(e) {
    var t = Re(), l = ge;
    if (l !== null)
      return Wr(t, l, e);
    Re(), t = t.memoizedState, l = Re();
    var n = l.queue.dispatch;
    return l.memoizedState = e, [t, n, !1];
  }
  function Un(e, t, l, n) {
    return e = { tag: e, create: l, deps: n, inst: t, next: null }, t = K.updateQueue, t === null && (t = Ou(), K.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (n = l.next, l.next = e, e.next = n, t.lastEffect = e), e;
  }
  function Ir() {
    return Re().memoizedState;
  }
  function Nu(e, t, l, n) {
    var u = lt();
    K.flags |= e, u.memoizedState = Un(
      1 | t,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function Du(e, t, l, n) {
    var u = Re();
    n = n === void 0 ? null : n;
    var c = u.memoizedState.inst;
    ge !== null && n !== null && Ac(n, ge.memoizedState.deps) ? u.memoizedState = Un(t, c, l, n) : (K.flags |= e, u.memoizedState = Un(
      1 | t,
      c,
      l,
      n
    ));
  }
  function Pr(e, t) {
    Nu(8390656, 8, e, t);
  }
  function Cc(e, t) {
    Du(2048, 8, e, t);
  }
  function Bv(e) {
    K.flags |= 4;
    var t = K.updateQueue;
    if (t === null)
      t = Ou(), K.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function es(e) {
    var t = Re().memoizedState;
    return Bv({ ref: t, nextImpl: e }), function() {
      if ((re & 2) !== 0) throw Error(f(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ts(e, t) {
    return Du(4, 2, e, t);
  }
  function ls(e, t) {
    return Du(4, 4, e, t);
  }
  function ns(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function() {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function as(e, t, l) {
    l = l != null ? l.concat([e]) : null, Du(4, 4, ns.bind(null, t, e), l);
  }
  function Hc() {
  }
  function us(e, t) {
    var l = Re();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && Ac(t, n[1]) ? n[0] : (l.memoizedState = [e, t], e);
  }
  function is(e, t) {
    var l = Re();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && Ac(t, n[1]))
      return n[0];
    if (n = e(), Pl) {
      rl(!0);
      try {
        e();
      } finally {
        rl(!1);
      }
    }
    return l.memoizedState = [n, t], n;
  }
  function wc(e, t, l) {
    return l === void 0 || (Pt & 1073741824) !== 0 && (le & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = cd(), K.lanes |= e, Tl |= e, l);
  }
  function cs(e, t, l, n) {
    return yt(l, t) ? l : Mn.current !== null ? (e = wc(e, l, n), yt(e, t) || (qe = !0), e) : (Pt & 42) === 0 || (Pt & 1073741824) !== 0 && (le & 261930) === 0 ? (qe = !0, e.memoizedState = l) : (e = cd(), K.lanes |= e, Tl |= e, t);
  }
  function os(e, t, l, n, u) {
    var c = C.p;
    C.p = c !== 0 && 8 > c ? c : 8;
    var r = O.T, s = {};
    O.T = s, Yc(e, !1, t, l);
    try {
      var v = u(), S = O.S;
      if (S !== null && S(s, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var x = jv(
          v,
          n
        );
        za(
          e,
          t,
          x,
          zt(e)
        );
      } else
        za(
          e,
          t,
          n,
          zt(e)
        );
    } catch (D) {
      za(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: D },
        zt()
      );
    } finally {
      C.p = c, r !== null && s.types !== null && (r.types = s.types), O.T = r;
    }
  }
  function qv() {
  }
  function Bc(e, t, l, n) {
    if (e.tag !== 5) throw Error(f(476));
    var u = fs(e).queue;
    os(
      e,
      u,
      t,
      L,
      l === null ? qv : function() {
        return rs(e), l(n);
      }
    );
  }
  function fs(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: L,
      baseState: L,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: L
      },
      next: null
    };
    var l = {};
    return t.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: el,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function rs(e) {
    var t = fs(e);
    t.next === null && (t = e.alternate.memoizedState), za(
      e,
      t.next.queue,
      {},
      zt()
    );
  }
  function qc() {
    return Ke(qa);
  }
  function ss() {
    return Re().memoizedState;
  }
  function ds() {
    return Re().memoizedState;
  }
  function Yv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = zt();
          e = pl(l);
          var n = _l(t, e, l);
          n !== null && (rt(n, t, l), ga(n, t, l)), t = { cache: mc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Gv(e, t, l) {
    var n = zt();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Uu(e) ? ms(t, l) : (l = nc(e, t, l, n), l !== null && (rt(l, e, n), vs(l, t, n)));
  }
  function hs(e, t, l) {
    var n = zt();
    za(e, t, l, n);
  }
  function za(e, t, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Uu(e)) ms(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var r = t.lastRenderedState, s = c(r, l);
          if (u.hasEagerState = !0, u.eagerState = s, yt(s, r))
            return su(e, t, u, 0), Se === null && ru(), !1;
        } catch {
        } finally {
        }
      if (l = nc(e, t, u, n), l !== null)
        return rt(l, e, n), vs(l, t, n), !0;
    }
    return !1;
  }
  function Yc(e, t, l, n) {
    if (n = {
      lane: 2,
      revertLane: _o(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Uu(e)) {
      if (t) throw Error(f(479));
    } else
      t = nc(
        e,
        l,
        n,
        2
      ), t !== null && rt(t, e, 2);
  }
  function Uu(e) {
    var t = e.alternate;
    return e === K || t !== null && t === K;
  }
  function ms(e, t) {
    Nn = Tu = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function vs(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, bf(e, l);
    }
  }
  var Ea = {
    readContext: Ke,
    use: xu,
    useCallback: De,
    useContext: De,
    useEffect: De,
    useImperativeHandle: De,
    useLayoutEffect: De,
    useInsertionEffect: De,
    useMemo: De,
    useReducer: De,
    useRef: De,
    useState: De,
    useDebugValue: De,
    useDeferredValue: De,
    useTransition: De,
    useSyncExternalStore: De,
    useId: De,
    useHostTransitionStatus: De,
    useFormState: De,
    useActionState: De,
    useOptimistic: De,
    useMemoCache: De,
    useCacheRefresh: De
  };
  Ea.useEffectEvent = De;
  var ys = {
    readContext: Ke,
    use: xu,
    useCallback: function(e, t) {
      return lt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Ke,
    useEffect: Pr,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, Nu(
        4194308,
        4,
        ns.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return Nu(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Nu(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = lt();
      t = t === void 0 ? null : t;
      var n = e();
      if (Pl) {
        rl(!0);
        try {
          e();
        } finally {
          rl(!1);
        }
      }
      return l.memoizedState = [n, t], n;
    },
    useReducer: function(e, t, l) {
      var n = lt();
      if (l !== void 0) {
        var u = l(t);
        if (Pl) {
          rl(!0);
          try {
            l(t);
          } finally {
            rl(!1);
          }
        }
      } else u = t;
      return n.memoizedState = n.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, n.queue = e, e = e.dispatch = Gv.bind(
        null,
        K,
        e
      ), [n.memoizedState, e];
    },
    useRef: function(e) {
      var t = lt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = jc(e);
      var t = e.queue, l = hs.bind(null, K, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var l = lt();
      return wc(l, e, t);
    },
    useTransition: function() {
      var e = jc(!1);
      return e = os.bind(
        null,
        K,
        e.queue,
        !0,
        !1
      ), lt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var n = K, u = lt();
      if (ue) {
        if (l === void 0)
          throw Error(f(407));
        l = l();
      } else {
        if (l = t(), Se === null)
          throw Error(f(349));
        (le & 127) !== 0 || wr(n, t, l);
      }
      u.memoizedState = l;
      var c = { value: l, getSnapshot: t };
      return u.queue = c, Pr(qr.bind(null, n, c, e), [
        e
      ]), n.flags |= 2048, Un(
        9,
        { destroy: void 0 },
        Br.bind(
          null,
          n,
          c,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = lt(), t = Se.identifierPrefix;
      if (ue) {
        var l = Xt, n = Gt;
        l = (n & ~(1 << 32 - vt(n) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Au++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = Rv++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: qc,
    useFormState: Jr,
    useActionState: Jr,
    useOptimistic: function(e) {
      var t = lt();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Yc.bind(
        null,
        K,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: Dc,
    useCacheRefresh: function() {
      return lt().memoizedState = Yv.bind(
        null,
        K
      );
    },
    useEffectEvent: function(e) {
      var t = lt(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((re & 2) !== 0)
          throw Error(f(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Gc = {
    readContext: Ke,
    use: xu,
    useCallback: us,
    useContext: Ke,
    useEffect: Cc,
    useImperativeHandle: as,
    useInsertionEffect: ts,
    useLayoutEffect: ls,
    useMemo: is,
    useReducer: Mu,
    useRef: Ir,
    useState: function() {
      return Mu(el);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var l = Re();
      return cs(
        l,
        ge.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Mu(el)[0], t = Re().memoizedState;
      return [
        typeof e == "boolean" ? e : Sa(e),
        t
      ];
    },
    useSyncExternalStore: Hr,
    useId: ss,
    useHostTransitionStatus: qc,
    useFormState: $r,
    useActionState: $r,
    useOptimistic: function(e, t) {
      var l = Re();
      return Xr(l, ge, e, t);
    },
    useMemoCache: Dc,
    useCacheRefresh: ds
  };
  Gc.useEffectEvent = es;
  var gs = {
    readContext: Ke,
    use: xu,
    useCallback: us,
    useContext: Ke,
    useEffect: Cc,
    useImperativeHandle: as,
    useInsertionEffect: ts,
    useLayoutEffect: ls,
    useMemo: is,
    useReducer: Zc,
    useRef: Ir,
    useState: function() {
      return Zc(el);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var l = Re();
      return ge === null ? wc(l, e, t) : cs(
        l,
        ge.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zc(el)[0], t = Re().memoizedState;
      return [
        typeof e == "boolean" ? e : Sa(e),
        t
      ];
    },
    useSyncExternalStore: Hr,
    useId: ss,
    useHostTransitionStatus: qc,
    useFormState: Fr,
    useActionState: Fr,
    useOptimistic: function(e, t) {
      var l = Re();
      return ge !== null ? Xr(l, ge, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: ds
  };
  gs.useEffectEvent = es;
  function Xc(e, t, l, n) {
    t = e.memoizedState, l = l(n, t), l = l == null ? t : j({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Qc = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var n = zt(), u = pl(n);
      u.payload = t, l != null && (u.callback = l), t = _l(e, u, n), t !== null && (rt(t, e, n), ga(t, e, n));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var n = zt(), u = pl(n);
      u.tag = 1, u.payload = t, l != null && (u.callback = l), t = _l(e, u, n), t !== null && (rt(t, e, n), ga(t, e, n));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = zt(), n = pl(l);
      n.tag = 2, t != null && (n.callback = t), t = _l(e, n, l), t !== null && (rt(t, e, l), ga(t, e, l));
    }
  };
  function ps(e, t, l, n, u, c, r) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, c, r) : t.prototype && t.prototype.isPureReactComponent ? !fa(l, n) || !fa(u, c) : !0;
  }
  function _s(e, t, l, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, n), t.state !== e && Qc.enqueueReplaceState(t, t.state, null);
  }
  function en(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var n in t)
        n !== "ref" && (l[n] = t[n]);
    }
    if (e = e.defaultProps) {
      l === t && (l = j({}, l));
      for (var u in e)
        l[u] === void 0 && (l[u] = e[u]);
    }
    return l;
  }
  function bs(e) {
    fu(e);
  }
  function Ss(e) {
    console.error(e);
  }
  function zs(e) {
    fu(e);
  }
  function Zu(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Es(e, t, l) {
    try {
      var n = e.onCaughtError;
      n(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function Lc(e, t, l) {
    return l = pl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      Zu(e, t);
    }, l;
  }
  function Ts(e) {
    return e = pl(e), e.tag = 3, e;
  }
  function As(e, t, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = n.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        Es(t, l, n);
      };
    }
    var r = l.stateNode;
    r !== null && typeof r.componentDidCatch == "function" && (e.callback = function() {
      Es(t, l, n), typeof u != "function" && (Al === null ? Al = /* @__PURE__ */ new Set([this]) : Al.add(this));
      var s = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function Xv(e, t, l, n, u) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (t = l.alternate, t !== null && En(
        t,
        l,
        u,
        !0
      ), l = pt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            return Ut === null ? Lu() : l.alternate === null && Ue === 0 && (Ue = 3), l.flags &= -257, l.flags |= 65536, l.lanes = u, n === _u ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : t.add(n), yo(e, n, u)), !1;
          case 22:
            return l.flags |= 65536, n === _u ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), yo(e, n, u)), !1;
        }
        throw Error(f(435, l.tag));
      }
      return yo(e, n, u), Lu(), !1;
    }
    if (ue)
      return t = pt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, n !== fc && (e = Error(f(422), { cause: n }), da(xt(e, l)))) : (n !== fc && (t = Error(f(423), {
        cause: n
      }), da(
        xt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, n = xt(n, l), u = Lc(
        e.stateNode,
        n,
        u
      ), bc(e, u), Ue !== 4 && (Ue = 2)), !1;
    var c = Error(f(520), { cause: n });
    if (c = xt(c, l), Ua === null ? Ua = [c] : Ua.push(c), Ue !== 4 && (Ue = 2), t === null) return !0;
    n = xt(n, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = u & -u, l.lanes |= e, e = Lc(l.stateNode, n, e), bc(l, e), !1;
        case 1:
          if (t = l.type, c = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Al === null || !Al.has(c))))
            return l.flags |= 65536, u &= -u, l.lanes |= u, u = Ts(u), As(
              u,
              e,
              l,
              n
            ), bc(l, u), !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Vc = Error(f(461)), qe = !1;
  function Je(e, t, l, n) {
    t.child = e === null ? Nr(t, null, l, n) : Il(
      t,
      e.child,
      l,
      n
    );
  }
  function Os(e, t, l, n, u) {
    l = l.render;
    var c = t.ref;
    if ("ref" in n) {
      var r = {};
      for (var s in n)
        s !== "ref" && (r[s] = n[s]);
    } else r = n;
    return Jl(t), n = Oc(
      e,
      t,
      l,
      r,
      c,
      u
    ), s = xc(), e !== null && !qe ? (Mc(e, t, u), tl(e, t, u)) : (ue && s && cc(t), t.flags |= 1, Je(e, t, n, u), t.child);
  }
  function xs(e, t, l, n, u) {
    if (e === null) {
      var c = l.type;
      return typeof c == "function" && !ac(c) && c.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = c, Ms(
        e,
        t,
        c,
        n,
        u
      )) : (e = hu(
        l.type,
        null,
        n,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Pc(e, u)) {
      var r = c.memoizedProps;
      if (l = l.compare, l = l !== null ? l : fa, l(r, n) && e.ref === t.ref)
        return tl(e, t, u);
    }
    return t.flags |= 1, e = $t(c, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Ms(e, t, l, n, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (fa(c, n) && e.ref === t.ref)
        if (qe = !1, t.pendingProps = n = c, Pc(e, u))
          (e.flags & 131072) !== 0 && (qe = !0);
        else
          return t.lanes = e.lanes, tl(e, t, u);
    }
    return kc(
      e,
      t,
      l,
      n,
      u
    );
  }
  function Ns(e, t, l, n) {
    var u = n.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | l : l, e !== null) {
          for (n = t.child = e.child, u = 0; n !== null; )
            u = u | n.lanes | n.childLanes, n = n.sibling;
          n = u & ~c;
        } else n = 0, t.child = null;
        return Ds(
          e,
          t,
          c,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && gu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Zr(t, c) : zc(), jr(t);
      else
        return n = t.lanes = 536870912, Ds(
          e,
          t,
          c !== null ? c.baseLanes | l : l,
          l,
          n
        );
    } else
      c !== null ? (gu(t, c.cachePool), Zr(t, c), Sl(), t.memoizedState = null) : (e !== null && gu(t, null), zc(), Sl());
    return Je(e, t, u, l), t.child;
  }
  function Ta(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Ds(e, t, l, n, u) {
    var c = yc();
    return c = c === null ? null : { parent: we._currentValue, pool: c }, t.memoizedState = {
      baseLanes: l,
      cachePool: c
    }, e !== null && gu(t, null), zc(), jr(t), e !== null && En(e, t, n, !0), t.childLanes = u, null;
  }
  function ju(e, t) {
    return t = Cu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Us(e, t, l) {
    return Il(t, e.child, null, l), e = ju(t, t.pendingProps), e.flags |= 2, _t(t), t.memoizedState = null, e;
  }
  function Qv(e, t, l) {
    var n = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ue) {
        if (n.mode === "hidden")
          return e = ju(t, n), t.lanes = 536870912, Ta(null, e);
        if (Tc(t), (e = Te) ? (e = Qd(
          e,
          Dt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Gt, overflow: Xt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mr(e), l.return = t, t.child = l, ke = t, Te = null)) : e = null, e === null) throw vl(t);
        return t.lanes = 536870912, null;
      }
      return ju(t, n);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var r = c.dehydrated;
      if (Tc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Us(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(f(558));
      else if (qe || En(e, t, l, !1), u = (l & e.childLanes) !== 0, qe || u) {
        if (n = Se, n !== null && (r = Sf(n, l), r !== 0 && r !== c.retryLane))
          throw c.retryLane = r, Ll(e, r), rt(n, e, r), Vc;
        Lu(), t = Us(
          e,
          t,
          l
        );
      } else
        e = c.treeContext, Te = Zt(r.nextSibling), ke = t, ue = !0, ml = null, Dt = !1, e !== null && gr(t, e), t = ju(t, n), t.flags |= 4096;
      return t;
    }
    return e = $t(e.child, {
      mode: n.mode,
      children: n.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ru(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(f(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function kc(e, t, l, n, u) {
    return Jl(t), l = Oc(
      e,
      t,
      l,
      n,
      void 0,
      u
    ), n = xc(), e !== null && !qe ? (Mc(e, t, u), tl(e, t, u)) : (ue && n && cc(t), t.flags |= 1, Je(e, t, l, u), t.child);
  }
  function Zs(e, t, l, n, u, c) {
    return Jl(t), t.updateQueue = null, l = Cr(
      t,
      n,
      l,
      u
    ), Rr(e), n = xc(), e !== null && !qe ? (Mc(e, t, c), tl(e, t, c)) : (ue && n && cc(t), t.flags |= 1, Je(e, t, l, c), t.child);
  }
  function js(e, t, l, n, u) {
    if (Jl(t), t.stateNode === null) {
      var c = _n, r = l.contextType;
      typeof r == "object" && r !== null && (c = Ke(r)), c = new l(n, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Qc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = n, c.state = t.memoizedState, c.refs = {}, pc(t), r = l.contextType, c.context = typeof r == "object" && r !== null ? Ke(r) : _n, c.state = t.memoizedState, r = l.getDerivedStateFromProps, typeof r == "function" && (Xc(
        t,
        l,
        r,
        n
      ), c.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Qc.enqueueReplaceState(c, c.state, null), _a(t, n, c, u), pa(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), n = !0;
    } else if (e === null) {
      c = t.stateNode;
      var s = t.memoizedProps, v = en(l, s);
      c.props = v;
      var S = c.context, x = l.contextType;
      r = _n, typeof x == "object" && x !== null && (r = Ke(x));
      var D = l.getDerivedStateFromProps;
      x = typeof D == "function" || typeof c.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, x || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (s || S !== r) && _s(
        t,
        c,
        n,
        r
      ), gl = !1;
      var E = t.memoizedState;
      c.state = E, _a(t, n, c, u), pa(), S = t.memoizedState, s || E !== S || gl ? (typeof D == "function" && (Xc(
        t,
        l,
        D,
        n
      ), S = t.memoizedState), (v = gl || ps(
        t,
        l,
        v,
        n,
        E,
        S,
        r
      )) ? (x || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = S), c.props = n, c.state = S, c.context = r, n = v) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), n = !1);
    } else {
      c = t.stateNode, _c(e, t), r = t.memoizedProps, x = en(l, r), c.props = x, D = t.pendingProps, E = c.context, S = l.contextType, v = _n, typeof S == "object" && S !== null && (v = Ke(S)), s = l.getDerivedStateFromProps, (S = typeof s == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (r !== D || E !== v) && _s(
        t,
        c,
        n,
        v
      ), gl = !1, E = t.memoizedState, c.state = E, _a(t, n, c, u), pa();
      var A = t.memoizedState;
      r !== D || E !== A || gl || e !== null && e.dependencies !== null && vu(e.dependencies) ? (typeof s == "function" && (Xc(
        t,
        l,
        s,
        n
      ), A = t.memoizedState), (x = gl || ps(
        t,
        l,
        x,
        n,
        E,
        A,
        v
      ) || e !== null && e.dependencies !== null && vu(e.dependencies)) ? (S || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(n, A, v), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        n,
        A,
        v
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = A), c.props = n, c.state = A, c.context = v, n = x) : (typeof c.componentDidUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || r === e.memoizedProps && E === e.memoizedState || (t.flags |= 1024), n = !1);
    }
    return c = n, Ru(e, t), n = (t.flags & 128) !== 0, c || n ? (c = t.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && n ? (t.child = Il(
      t,
      e.child,
      null,
      u
    ), t.child = Il(
      t,
      null,
      l,
      u
    )) : Je(e, t, l, u), t.memoizedState = c.state, e = t.child) : e = tl(
      e,
      t,
      u
    ), e;
  }
  function Rs(e, t, l, n) {
    return kl(), t.flags |= 256, Je(e, t, l, n), t.child;
  }
  var Kc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Jc(e) {
    return { baseLanes: e, cachePool: Er() };
  }
  function $c(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= St), e;
  }
  function Cs(e, t, l) {
    var n = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, r;
    if ((r = c) || (r = e !== null && e.memoizedState === null ? !1 : (je.current & 2) !== 0), r && (u = !0, t.flags &= -129), r = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ue) {
        if (u ? bl(t) : Sl(), (e = Te) ? (e = Qd(
          e,
          Dt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: hl !== null ? { id: Gt, overflow: Xt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = mr(e), l.return = t, t.child = l, ke = t, Te = null)) : e = null, e === null) throw vl(t);
        return Zo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var s = n.children;
      return n = n.fallback, u ? (Sl(), u = t.mode, s = Cu(
        { mode: "hidden", children: s },
        u
      ), n = Vl(
        n,
        u,
        l,
        null
      ), s.return = t, n.return = t, s.sibling = n, t.child = s, n = t.child, n.memoizedState = Jc(l), n.childLanes = $c(
        e,
        r,
        l
      ), t.memoizedState = Kc, Ta(null, n)) : (bl(t), Wc(t, s));
    }
    var v = e.memoizedState;
    if (v !== null && (s = v.dehydrated, s !== null)) {
      if (c)
        t.flags & 256 ? (bl(t), t.flags &= -257, t = Fc(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (Sl(), t.child = e.child, t.flags |= 128, t = null) : (Sl(), s = n.fallback, u = t.mode, n = Cu(
          { mode: "visible", children: n.children },
          u
        ), s = Vl(
          s,
          u,
          l,
          null
        ), s.flags |= 2, n.return = t, s.return = t, n.sibling = s, t.child = n, Il(
          t,
          e.child,
          null,
          l
        ), n = t.child, n.memoizedState = Jc(l), n.childLanes = $c(
          e,
          r,
          l
        ), t.memoizedState = Kc, t = Ta(null, n));
      else if (bl(t), Zo(s)) {
        if (r = s.nextSibling && s.nextSibling.dataset, r) var S = r.dgst;
        r = S, n = Error(f(419)), n.stack = "", n.digest = r, da({ value: n, source: null, stack: null }), t = Fc(
          e,
          t,
          l
        );
      } else if (qe || En(e, t, l, !1), r = (l & e.childLanes) !== 0, qe || r) {
        if (r = Se, r !== null && (n = Sf(r, l), n !== 0 && n !== v.retryLane))
          throw v.retryLane = n, Ll(e, n), rt(r, e, n), Vc;
        Uo(s) || Lu(), t = Fc(
          e,
          t,
          l
        );
      } else
        Uo(s) ? (t.flags |= 192, t.child = e.child, t = null) : (e = v.treeContext, Te = Zt(
          s.nextSibling
        ), ke = t, ue = !0, ml = null, Dt = !1, e !== null && gr(t, e), t = Wc(
          t,
          n.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Sl(), s = n.fallback, u = t.mode, v = e.child, S = v.sibling, n = $t(v, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = v.subtreeFlags & 65011712, S !== null ? s = $t(
      S,
      s
    ) : (s = Vl(
      s,
      u,
      l,
      null
    ), s.flags |= 2), s.return = t, n.return = t, n.sibling = s, t.child = n, Ta(null, n), n = t.child, s = e.child.memoizedState, s === null ? s = Jc(l) : (u = s.cachePool, u !== null ? (v = we._currentValue, u = u.parent !== v ? { parent: v, pool: v } : u) : u = Er(), s = {
      baseLanes: s.baseLanes | l,
      cachePool: u
    }), n.memoizedState = s, n.childLanes = $c(
      e,
      r,
      l
    ), t.memoizedState = Kc, Ta(e.child, n)) : (bl(t), l = e.child, e = l.sibling, l = $t(l, {
      mode: "visible",
      children: n.children
    }), l.return = t, l.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Wc(e, t) {
    return t = Cu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Cu(e, t) {
    return e = gt(22, e, null, t), e.lanes = 0, e;
  }
  function Fc(e, t, l) {
    return Il(t, e.child, null, l), e = Wc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Hs(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), dc(e.return, t, l);
  }
  function Ic(e, t, l, n, u, c) {
    var r = e.memoizedState;
    r === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: u,
      treeForkCount: c
    } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = n, r.tail = l, r.tailMode = u, r.treeForkCount = c);
  }
  function ws(e, t, l) {
    var n = t.pendingProps, u = n.revealOrder, c = n.tail;
    n = n.children;
    var r = je.current, s = (r & 2) !== 0;
    if (s ? (r = r & 1 | 2, t.flags |= 128) : r &= 1, H(je, r), Je(e, t, n, l), n = ue ? sa : 0, !s && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Hs(e, l, t);
        else if (e.tag === 19)
          Hs(e, l, t);
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
        for (l = t.child, u = null; l !== null; )
          e = l.alternate, e !== null && Eu(e) === null && (u = l), l = l.sibling;
        l = u, l === null ? (u = t.child, t.child = null) : (u = l.sibling, l.sibling = null), Ic(
          t,
          !1,
          u,
          l,
          c,
          n
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (l = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && Eu(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = l, l = u, u = e;
        }
        Ic(
          t,
          !0,
          l,
          null,
          c,
          n
        );
        break;
      case "together":
        Ic(
          t,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function tl(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), Tl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (En(
          e,
          t,
          l,
          !1
        ), (l & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(f(153));
    if (t.child !== null) {
      for (e = t.child, l = $t(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = $t(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Pc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && vu(e)));
  }
  function Lv(e, t, l) {
    switch (t.tag) {
      case 3:
        tt(t, t.stateNode.containerInfo), yl(t, we, e.memoizedState.cache), kl();
        break;
      case 27:
      case 5:
        Wn(t);
        break;
      case 4:
        tt(t, t.stateNode.containerInfo);
        break;
      case 10:
        yl(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Tc(t), null;
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (bl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Cs(e, t, l) : (bl(t), e = tl(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        bl(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (n = (l & t.childLanes) !== 0, n || (En(
          e,
          t,
          l,
          !1
        ), n = (l & t.childLanes) !== 0), u) {
          if (n)
            return ws(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), H(je, je.current), n) break;
        return null;
      case 22:
        return t.lanes = 0, Ns(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        yl(t, we, e.memoizedState.cache);
    }
    return tl(e, t, l);
  }
  function Bs(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        qe = !0;
      else {
        if (!Pc(e, l) && (t.flags & 128) === 0)
          return qe = !1, Lv(
            e,
            t,
            l
          );
        qe = (e.flags & 131072) !== 0;
      }
    else
      qe = !1, ue && (t.flags & 1048576) !== 0 && yr(t, sa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (e = Wl(t.elementType), t.type = e, typeof e == "function")
            ac(e) ? (n = en(e, n), t.tag = 1, t = js(
              null,
              t,
              e,
              n,
              l
            )) : (t.tag = 0, t = kc(
              null,
              t,
              e,
              n,
              l
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === me) {
                t.tag = 11, t = Os(
                  null,
                  t,
                  e,
                  n,
                  l
                );
                break e;
              } else if (u === $) {
                t.tag = 14, t = xs(
                  null,
                  t,
                  e,
                  n,
                  l
                );
                break e;
              }
            }
            throw t = Ht(e) || e, Error(f(306, t, ""));
          }
        }
        return t;
      case 0:
        return kc(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return n = t.type, u = en(
          n,
          t.pendingProps
        ), js(
          e,
          t,
          n,
          u,
          l
        );
      case 3:
        e: {
          if (tt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(f(387));
          n = t.pendingProps;
          var c = t.memoizedState;
          u = c.element, _c(e, t), _a(t, n, null, l);
          var r = t.memoizedState;
          if (n = r.cache, yl(t, we, n), n !== c.cache && hc(
            t,
            [we],
            l,
            !0
          ), pa(), n = r.element, c.isDehydrated)
            if (c = {
              element: n,
              isDehydrated: !1,
              cache: r.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Rs(
                e,
                t,
                n,
                l
              );
              break e;
            } else if (n !== u) {
              u = xt(
                Error(f(424)),
                t
              ), da(u), t = Rs(
                e,
                t,
                n,
                l
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
              for (Te = Zt(e.firstChild), ke = t, ue = !0, ml = null, Dt = !0, l = Nr(
                t,
                null,
                n,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (kl(), n === u) {
              t = tl(
                e,
                t,
                l
              );
              break e;
            }
            Je(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ru(e, t), e === null ? (l = $d(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : ue || (l = t.type, e = t.pendingProps, n = Fu(
          I.current
        ).createElement(l), n[Ve] = t, n[at] = e, $e(n, l, e), Qe(n), t.stateNode = n) : t.memoizedState = $d(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Wn(t), e === null && ue && (n = t.stateNode = kd(
          t.type,
          t.pendingProps,
          I.current
        ), ke = t, Dt = !0, u = Te, Nl(t.type) ? (jo = u, Te = Zt(n.firstChild)) : Te = u), Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), Ru(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ue && ((u = n = Te) && (n = b0(
          n,
          t.type,
          t.pendingProps,
          Dt
        ), n !== null ? (t.stateNode = n, ke = t, Te = Zt(n.firstChild), Dt = !1, u = !0) : u = !1), u || vl(t)), Wn(t), u = t.type, c = t.pendingProps, r = e !== null ? e.memoizedProps : null, n = c.children, Mo(u, c) ? n = null : r !== null && Mo(u, r) && (t.flags |= 32), t.memoizedState !== null && (u = Oc(
          e,
          t,
          Cv,
          null,
          null,
          l
        ), qa._currentValue = u), Ru(e, t), Je(e, t, n, l), t.child;
      case 6:
        return e === null && ue && ((e = l = Te) && (l = S0(
          l,
          t.pendingProps,
          Dt
        ), l !== null ? (t.stateNode = l, ke = t, Te = null, e = !0) : e = !1), e || vl(t)), null;
      case 13:
        return Cs(e, t, l);
      case 4:
        return tt(
          t,
          t.stateNode.containerInfo
        ), n = t.pendingProps, e === null ? t.child = Il(
          t,
          null,
          n,
          l
        ) : Je(e, t, n, l), t.child;
      case 11:
        return Os(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return Je(
          e,
          t,
          t.pendingProps,
          l
        ), t.child;
      case 8:
        return Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return n = t.pendingProps, yl(t, t.type, n.value), Je(e, t, n.children, l), t.child;
      case 9:
        return u = t.type._context, n = t.pendingProps.children, Jl(t), u = Ke(u), n = n(u), t.flags |= 1, Je(e, t, n, l), t.child;
      case 14:
        return xs(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return Ms(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return ws(e, t, l);
      case 31:
        return Qv(e, t, l);
      case 22:
        return Ns(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return Jl(t), n = Ke(we), e === null ? (u = yc(), u === null && (u = Se, c = mc(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= l), u = c), t.memoizedState = { parent: n, cache: u }, pc(t), yl(t, we, u)) : ((e.lanes & l) !== 0 && (_c(e, t), _a(t, null, null, l), pa()), u = e.memoizedState, c = t.memoizedState, u.parent !== n ? (u = { parent: n, cache: n }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), yl(t, we, n)) : (n = c.cache, yl(t, we, n), n !== u.cache && hc(
          t,
          [we],
          l,
          !0
        ))), Je(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(f(156, t.tag));
  }
  function ll(e) {
    e.flags |= 4;
  }
  function eo(e, t, l, n, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (sd()) e.flags |= 8192;
        else
          throw Fl = _u, gc;
    } else e.flags &= -16777217;
  }
  function qs(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !eh(t))
      if (sd()) e.flags |= 8192;
      else
        throw Fl = _u, gc;
  }
  function Hu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? pf() : 536870912, e.lanes |= t, Cn |= t);
  }
  function Aa(e, t) {
    if (!ue)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
          break;
        case "collapsed":
          l = e.tail;
          for (var n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
      }
  }
  function Ae(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, n = 0;
    if (t)
      for (var u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, n |= u.subtreeFlags & 65011712, n |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, n |= u.subtreeFlags, n |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= n, e.childLanes = l, t;
  }
  function Vv(e, t, l) {
    var n = t.pendingProps;
    switch (oc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ae(t), null;
      case 1:
        return Ae(t), null;
      case 3:
        return l = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), It(we), Ze(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (zn(t) ? ll(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rc())), Ae(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (ll(t), c !== null ? (Ae(t), qs(t, c)) : (Ae(t), eo(
          t,
          u,
          null,
          n,
          l
        ))) : c ? c !== e.memoizedState ? (ll(t), Ae(t), qs(t, c)) : (Ae(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && ll(t), Ae(t), eo(
          t,
          u,
          e,
          n,
          l
        )), null;
      case 27:
        if (Ka(t), l = I.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && ll(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ae(t), null;
          }
          e = q.current, zn(t) ? pr(t) : (e = kd(u, n, l), t.stateNode = e, ll(t));
        }
        return Ae(t), null;
      case 5:
        if (Ka(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && ll(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ae(t), null;
          }
          if (c = q.current, zn(t))
            pr(t);
          else {
            var r = Fu(
              I.current
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
                    c = typeof n.is == "string" ? r.createElement("select", {
                      is: n.is
                    }) : r.createElement("select"), n.multiple ? c.multiple = !0 : n.size && (c.size = n.size);
                    break;
                  default:
                    c = typeof n.is == "string" ? r.createElement(u, { is: n.is }) : r.createElement(u);
                }
            }
            c[Ve] = t, c[at] = n;
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
            e: switch ($e(c, u, n), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
            n && ll(t);
          }
        }
        return Ae(t), eo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== n && ll(t);
        else {
          if (typeof n != "string" && t.stateNode === null)
            throw Error(f(166));
          if (e = I.current, zn(t)) {
            if (e = t.stateNode, l = t.memoizedProps, n = null, u = ke, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            e[Ve] = t, e = !!(e.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || Cd(e.nodeValue, l)), e || vl(t, !0);
          } else
            e = Fu(e).createTextNode(
              n
            ), e[Ve] = t, t.stateNode = e;
        }
        return Ae(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (n = zn(t), l !== null) {
            if (e === null) {
              if (!n) throw Error(f(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(557));
              e[Ve] = t;
            } else
              kl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ae(t), e = !1;
          } else
            l = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(f(558));
        }
        return Ae(t), null;
      case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = zn(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(f(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(f(317));
              u[Ve] = t;
            } else
              kl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ae(t), u = !1;
          } else
            u = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (_t(t), t) : (_t(t), null);
        }
        return _t(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = n !== null, e = e !== null && e.memoizedState !== null, l && (n = t.child, u = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (u = n.alternate.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Hu(t, t.updateQueue), Ae(t), null);
      case 4:
        return Ze(), e === null && Eo(t.stateNode.containerInfo), Ae(t), null;
      case 10:
        return It(t.type), Ae(t), null;
      case 19:
        if (Z(je), n = t.memoizedState, n === null) return Ae(t), null;
        if (u = (t.flags & 128) !== 0, c = n.rendering, c === null)
          if (u) Aa(n, !1);
          else {
            if (Ue !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Eu(e), c !== null) {
                  for (t.flags |= 128, Aa(n, !1), e = c.updateQueue, t.updateQueue = e, Hu(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    hr(l, e), l = l.sibling;
                  return H(
                    je,
                    je.current & 1 | 2
                  ), ue && Wt(t, n.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null && ht() > Gu && (t.flags |= 128, u = !0, Aa(n, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Eu(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Hu(t, e), Aa(n, !0), n.tail === null && n.tailMode === "hidden" && !c.alternate && !ue)
                return Ae(t), null;
            } else
              2 * ht() - n.renderingStartTime > Gu && l !== 536870912 && (t.flags |= 128, u = !0, Aa(n, !1), t.lanes = 4194304);
          n.isBackwards ? (c.sibling = t.child, t.child = c) : (e = n.last, e !== null ? e.sibling = c : t.child = c, n.last = c);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = ht(), e.sibling = null, l = je.current, H(
          je,
          u ? l & 1 | 2 : l & 1
        ), ue && Wt(t, n.treeForkCount), e) : (Ae(t), null);
      case 22:
      case 23:
        return _t(t), Ec(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ae(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ae(t), l = t.updateQueue, l !== null && Hu(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== l && (t.flags |= 2048), e !== null && Z($l), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), It(we), Ae(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, t.tag));
  }
  function kv(e, t) {
    switch (oc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return It(we), Ze(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Ka(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (_t(t), t.alternate === null)
            throw Error(f(340));
          kl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (_t(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(f(340));
          kl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Z(je), null;
      case 4:
        return Ze(), null;
      case 10:
        return It(t.type), null;
      case 22:
      case 23:
        return _t(t), Ec(), e !== null && Z($l), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return It(we), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ys(e, t) {
    switch (oc(t), t.tag) {
      case 3:
        It(we), Ze();
        break;
      case 26:
      case 27:
      case 5:
        Ka(t);
        break;
      case 4:
        Ze();
        break;
      case 31:
        t.memoizedState !== null && _t(t);
        break;
      case 13:
        _t(t);
        break;
      case 19:
        Z(je);
        break;
      case 10:
        It(t.type);
        break;
      case 22:
      case 23:
        _t(t), Ec(), e !== null && Z($l);
        break;
      case 24:
        It(we);
    }
  }
  function Oa(e, t) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            n = void 0;
            var c = l.create, r = l.inst;
            n = c(), r.destroy = n;
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (s) {
      he(t, t.return, s);
    }
  }
  function zl(e, t, l) {
    try {
      var n = t.updateQueue, u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        n = c;
        do {
          if ((n.tag & e) === e) {
            var r = n.inst, s = r.destroy;
            if (s !== void 0) {
              r.destroy = void 0, u = t;
              var v = l, S = s;
              try {
                S();
              } catch (x) {
                he(
                  u,
                  v,
                  x
                );
              }
            }
          }
          n = n.next;
        } while (n !== c);
      }
    } catch (x) {
      he(t, t.return, x);
    }
  }
  function Gs(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Ur(t, l);
      } catch (n) {
        he(e, e.return, n);
      }
    }
  }
  function Xs(e, t, l) {
    l.props = en(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      he(e, t, n);
    }
  }
  function xa(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(n) : l.current = n;
      }
    } catch (u) {
      he(e, t, u);
    }
  }
  function Qt(e, t) {
    var l = e.ref, n = e.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (u) {
          he(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          he(e, t, u);
        }
      else l.current = null;
  }
  function Qs(e) {
    var t = e.type, l = e.memoizedProps, n = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && n.focus();
          break e;
        case "img":
          l.src ? n.src = l.src : l.srcSet && (n.srcset = l.srcSet);
      }
    } catch (u) {
      he(e, e.return, u);
    }
  }
  function to(e, t, l) {
    try {
      var n = e.stateNode;
      m0(n, e.type, l, t), n[at] = t;
    } catch (u) {
      he(e, e.return, u);
    }
  }
  function Ls(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Nl(e.type) || e.tag === 4;
  }
  function lo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ls(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Nl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function no(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Kt));
    else if (n !== 4 && (n === 27 && Nl(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for (no(e, t, l), e = e.sibling; e !== null; )
        no(e, t, l), e = e.sibling;
  }
  function wu(e, t, l) {
    var n = e.tag;
    if (n === 5 || n === 6)
      e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
    else if (n !== 4 && (n === 27 && Nl(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (wu(e, t, l), e = e.sibling; e !== null; )
        wu(e, t, l), e = e.sibling;
  }
  function Vs(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var n = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      $e(t, n, l), t[Ve] = e, t[at] = l;
    } catch (c) {
      he(e, e.return, c);
    }
  }
  var nl = !1, Ye = !1, ao = !1, ks = typeof WeakSet == "function" ? WeakSet : Set, Le = null;
  function Kv(e, t) {
    if (e = e.containerInfo, Oo = ai, e = ar(e), Fi(e)) {
      if ("selectionStart" in e)
        var l = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          l = (l = e.ownerDocument) && l.defaultView || window;
          var n = l.getSelection && l.getSelection();
          if (n && n.rangeCount !== 0) {
            l = n.anchorNode;
            var u = n.anchorOffset, c = n.focusNode;
            n = n.focusOffset;
            try {
              l.nodeType, c.nodeType;
            } catch {
              l = null;
              break e;
            }
            var r = 0, s = -1, v = -1, S = 0, x = 0, D = e, E = null;
            t: for (; ; ) {
              for (var A; D !== l || u !== 0 && D.nodeType !== 3 || (s = r + u), D !== c || n !== 0 && D.nodeType !== 3 || (v = r + n), D.nodeType === 3 && (r += D.nodeValue.length), (A = D.firstChild) !== null; )
                E = D, D = A;
              for (; ; ) {
                if (D === e) break t;
                if (E === l && ++S === u && (s = r), E === c && ++x === n && (v = r), (A = D.nextSibling) !== null) break;
                D = E, E = D.parentNode;
              }
              D = A;
            }
            l = s === -1 || v === -1 ? null : { start: s, end: v };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (xo = { focusedElem: e, selectionRange: l }, ai = !1, Le = t; Le !== null; )
      if (t = Le, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, Le = e;
      else
        for (; Le !== null; ) {
          switch (t = Le, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (l = 0; l < e.length; l++)
                  u = e[l], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, l = t, u = c.memoizedProps, c = c.memoizedState, n = l.stateNode;
                try {
                  var w = en(
                    l.type,
                    u
                  );
                  e = n.getSnapshotBeforeUpdate(
                    w,
                    c
                  ), n.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Q) {
                  he(
                    l,
                    l.return,
                    Q
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9)
                  Do(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Do(e);
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
              if ((e & 1024) !== 0) throw Error(f(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Le = e;
            break;
          }
          Le = t.return;
        }
  }
  function Ks(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        ul(e, l), n & 4 && Oa(5, l);
        break;
      case 1:
        if (ul(e, l), n & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (r) {
              he(l, l.return, r);
            }
          else {
            var u = en(
              l.type,
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
              he(
                l,
                l.return,
                r
              );
            }
          }
        n & 64 && Gs(l), n & 512 && xa(l, l.return);
        break;
      case 3:
        if (ul(e, l), n & 64 && (e = l.updateQueue, e !== null)) {
          if (t = null, l.child !== null)
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Ur(e, t);
          } catch (r) {
            he(l, l.return, r);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Vs(l);
      case 26:
      case 5:
        ul(e, l), t === null && n & 4 && Qs(l), n & 512 && xa(l, l.return);
        break;
      case 12:
        ul(e, l);
        break;
      case 31:
        ul(e, l), n & 4 && Ws(e, l);
        break;
      case 13:
        ul(e, l), n & 4 && Fs(e, l), n & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = l0.bind(
          null,
          l
        ), z0(e, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || nl, !n) {
          t = t !== null && t.memoizedState !== null || Ye, u = nl;
          var c = Ye;
          nl = n, (Ye = t) && !c ? il(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : ul(e, l), nl = u, Ye = c;
        }
        break;
      case 30:
        break;
      default:
        ul(e, l);
    }
  }
  function Js(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Js(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ri(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Oe = null, it = !1;
  function al(e, t, l) {
    for (l = l.child; l !== null; )
      $s(e, t, l), l = l.sibling;
  }
  function $s(e, t, l) {
    if (mt && typeof mt.onCommitFiberUnmount == "function")
      try {
        mt.onCommitFiberUnmount(Fn, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Ye || Qt(l, t), al(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Ye || Qt(l, t);
        var n = Oe, u = it;
        Nl(l.type) && (Oe = l.stateNode, it = !1), al(
          e,
          t,
          l
        ), Ha(l.stateNode), Oe = n, it = u;
        break;
      case 5:
        Ye || Qt(l, t);
      case 6:
        if (n = Oe, u = it, Oe = null, al(
          e,
          t,
          l
        ), Oe = n, it = u, Oe !== null)
          if (it)
            try {
              (Oe.nodeType === 9 ? Oe.body : Oe.nodeName === "HTML" ? Oe.ownerDocument.body : Oe).removeChild(l.stateNode);
            } catch (c) {
              he(
                l,
                t,
                c
              );
            }
          else
            try {
              Oe.removeChild(l.stateNode);
            } catch (c) {
              he(
                l,
                t,
                c
              );
            }
        break;
      case 18:
        Oe !== null && (it ? (e = Oe, Gd(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Qn(e)) : Gd(Oe, l.stateNode));
        break;
      case 4:
        n = Oe, u = it, Oe = l.stateNode.containerInfo, it = !0, al(
          e,
          t,
          l
        ), Oe = n, it = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        zl(2, l, t), Ye || zl(4, l, t), al(
          e,
          t,
          l
        );
        break;
      case 1:
        Ye || (Qt(l, t), n = l.stateNode, typeof n.componentWillUnmount == "function" && Xs(
          l,
          t,
          n
        )), al(
          e,
          t,
          l
        );
        break;
      case 21:
        al(
          e,
          t,
          l
        );
        break;
      case 22:
        Ye = (n = Ye) || l.memoizedState !== null, al(
          e,
          t,
          l
        ), Ye = n;
        break;
      default:
        al(
          e,
          t,
          l
        );
    }
  }
  function Ws(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Qn(e);
      } catch (l) {
        he(t, t.return, l);
      }
    }
  }
  function Fs(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Qn(e);
      } catch (l) {
        he(t, t.return, l);
      }
  }
  function Jv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new ks()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ks()), t;
      default:
        throw Error(f(435, e.tag));
    }
  }
  function Bu(e, t) {
    var l = Jv(e);
    t.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var u = n0.bind(null, e, n);
        n.then(u, u);
      }
    });
  }
  function ct(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n], c = e, r = t, s = r;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (Nl(s.type)) {
                Oe = s.stateNode, it = !1;
                break e;
              }
              break;
            case 5:
              Oe = s.stateNode, it = !1;
              break e;
            case 3:
            case 4:
              Oe = s.stateNode.containerInfo, it = !0;
              break e;
          }
          s = s.return;
        }
        if (Oe === null) throw Error(f(160));
        $s(c, r, u), Oe = null, it = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Is(t, e), t = t.sibling;
  }
  var Bt = null;
  function Is(e, t) {
    var l = e.alternate, n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ct(t, e), ot(e), n & 4 && (zl(3, e, e.return), Oa(3, e), zl(5, e, e.return));
        break;
      case 1:
        ct(t, e), ot(e), n & 512 && (Ye || l === null || Qt(l, l.return)), n & 64 && nl && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? n : l.concat(n))));
        break;
      case 26:
        var u = Bt;
        if (ct(t, e), ot(e), n & 512 && (Ye || l === null || Qt(l, l.return)), n & 4) {
          var c = l !== null ? l.memoizedState : null;
          if (n = e.memoizedState, l === null)
            if (n === null)
              if (e.stateNode === null) {
                e: {
                  n = e.type, l = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (n) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[ea] || c[Ve] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(n), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), $e(c, n, l), c[Ve] = e, Qe(c), n = c;
                      break e;
                    case "link":
                      var r = Id(
                        "link",
                        "href",
                        u
                      ).get(n + (l.href || ""));
                      if (r) {
                        for (var s = 0; s < r.length; s++)
                          if (c = r[s], c.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && c.getAttribute("rel") === (l.rel == null ? null : l.rel) && c.getAttribute("title") === (l.title == null ? null : l.title) && c.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            r.splice(s, 1);
                            break t;
                          }
                      }
                      c = u.createElement(n), $e(c, n, l), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (r = Id(
                        "meta",
                        "content",
                        u
                      ).get(n + (l.content || ""))) {
                        for (s = 0; s < r.length; s++)
                          if (c = r[s], c.getAttribute("content") === (l.content == null ? null : "" + l.content) && c.getAttribute("name") === (l.name == null ? null : l.name) && c.getAttribute("property") === (l.property == null ? null : l.property) && c.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && c.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            r.splice(s, 1);
                            break t;
                          }
                      }
                      c = u.createElement(n), $e(c, n, l), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  c[Ve] = e, Qe(c), n = c;
                }
                e.stateNode = n;
              } else
                Pd(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Fd(
                u,
                n,
                e.memoizedProps
              );
          else
            c !== n ? (c === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : c.count--, n === null ? Pd(
              u,
              e.type,
              e.stateNode
            ) : Fd(
              u,
              n,
              e.memoizedProps
            )) : n === null && e.stateNode !== null && to(
              e,
              e.memoizedProps,
              l.memoizedProps
            );
        }
        break;
      case 27:
        ct(t, e), ot(e), n & 512 && (Ye || l === null || Qt(l, l.return)), l !== null && n & 4 && to(
          e,
          e.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (ct(t, e), ot(e), n & 512 && (Ye || l === null || Qt(l, l.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            dn(u, "");
          } catch (w) {
            he(e, e.return, w);
          }
        }
        n & 4 && e.stateNode != null && (u = e.memoizedProps, to(
          e,
          u,
          l !== null ? l.memoizedProps : u
        )), n & 1024 && (ao = !0);
        break;
      case 6:
        if (ct(t, e), ot(e), n & 4) {
          if (e.stateNode === null)
            throw Error(f(162));
          n = e.memoizedProps, l = e.stateNode;
          try {
            l.nodeValue = n;
          } catch (w) {
            he(e, e.return, w);
          }
        }
        break;
      case 3:
        if (ei = null, u = Bt, Bt = Iu(t.containerInfo), ct(t, e), Bt = u, ot(e), n & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Qn(t.containerInfo);
          } catch (w) {
            he(e, e.return, w);
          }
        ao && (ao = !1, Ps(e));
        break;
      case 4:
        n = Bt, Bt = Iu(
          e.stateNode.containerInfo
        ), ct(t, e), ot(e), Bt = n;
        break;
      case 12:
        ct(t, e), ot(e);
        break;
      case 31:
        ct(t, e), ot(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Bu(e, n)));
        break;
      case 13:
        ct(t, e), ot(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (Yu = ht()), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Bu(e, n)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var v = l !== null && l.memoizedState !== null, S = nl, x = Ye;
        if (nl = S || u, Ye = x || v, ct(t, e), Ye = x, nl = S, ot(e), n & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (l === null || v || nl || Ye || tn(e)), l = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                v = l = t;
                try {
                  if (c = v.stateNode, u)
                    r = c.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
                  else {
                    s = v.stateNode;
                    var D = v.memoizedProps.style, E = D != null && D.hasOwnProperty("display") ? D.display : null;
                    s.style.display = E == null || typeof E == "boolean" ? "" : ("" + E).trim();
                  }
                } catch (w) {
                  he(v, v.return, w);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                v = t;
                try {
                  v.stateNode.nodeValue = u ? "" : v.memoizedProps;
                } catch (w) {
                  he(v, v.return, w);
                }
              }
            } else if (t.tag === 18) {
              if (l === null) {
                v = t;
                try {
                  var A = v.stateNode;
                  u ? Xd(A, !0) : Xd(v.stateNode, !1);
                } catch (w) {
                  he(v, v.return, w);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              l === t && (l = null), t = t.return;
            }
            l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
          }
        n & 4 && (n = e.updateQueue, n !== null && (l = n.retryQueue, l !== null && (n.retryQueue = null, Bu(e, l))));
        break;
      case 19:
        ct(t, e), ot(e), n & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Bu(e, n)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ct(t, e), ot(e);
    }
  }
  function ot(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = e.return; n !== null; ) {
          if (Ls(n)) {
            l = n;
            break;
          }
          n = n.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var u = l.stateNode, c = lo(e);
            wu(e, c, u);
            break;
          case 5:
            var r = l.stateNode;
            l.flags & 32 && (dn(r, ""), l.flags &= -33);
            var s = lo(e);
            wu(e, s, r);
            break;
          case 3:
          case 4:
            var v = l.stateNode.containerInfo, S = lo(e);
            no(
              e,
              S,
              v
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (x) {
        he(e, e.return, x);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Ps(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Ps(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function ul(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ks(e, t.alternate, t), t = t.sibling;
  }
  function tn(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          zl(4, t, t.return), tn(t);
          break;
        case 1:
          Qt(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && Xs(
            t,
            t.return,
            l
          ), tn(t);
          break;
        case 27:
          Ha(t.stateNode);
        case 26:
        case 5:
          Qt(t, t.return), tn(t);
          break;
        case 22:
          t.memoizedState === null && tn(t);
          break;
        case 30:
          tn(t);
          break;
        default:
          tn(t);
      }
      e = e.sibling;
    }
  }
  function il(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate, u = e, c = t, r = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          il(
            u,
            c,
            l
          ), Oa(4, c);
          break;
        case 1:
          if (il(
            u,
            c,
            l
          ), n = c, u = n.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (S) {
              he(n, n.return, S);
            }
          if (n = c, u = n.updateQueue, u !== null) {
            var s = n.stateNode;
            try {
              var v = u.shared.hiddenCallbacks;
              if (v !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < v.length; u++)
                  Dr(v[u], s);
            } catch (S) {
              he(n, n.return, S);
            }
          }
          l && r & 64 && Gs(c), xa(c, c.return);
          break;
        case 27:
          Vs(c);
        case 26:
        case 5:
          il(
            u,
            c,
            l
          ), l && n === null && r & 4 && Qs(c), xa(c, c.return);
          break;
        case 12:
          il(
            u,
            c,
            l
          );
          break;
        case 31:
          il(
            u,
            c,
            l
          ), l && r & 4 && Ws(u, c);
          break;
        case 13:
          il(
            u,
            c,
            l
          ), l && r & 4 && Fs(u, c);
          break;
        case 22:
          c.memoizedState === null && il(
            u,
            c,
            l
          ), xa(c, c.return);
          break;
        case 30:
          break;
        default:
          il(
            u,
            c,
            l
          );
      }
      t = t.sibling;
    }
  }
  function uo(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && ha(l));
  }
  function io(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e));
  }
  function qt(e, t, l, n) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ed(
          e,
          t,
          l,
          n
        ), t = t.sibling;
  }
  function ed(e, t, l, n) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        qt(
          e,
          t,
          l,
          n
        ), u & 2048 && Oa(9, t);
        break;
      case 1:
        qt(
          e,
          t,
          l,
          n
        );
        break;
      case 3:
        qt(
          e,
          t,
          l,
          n
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e)));
        break;
      case 12:
        if (u & 2048) {
          qt(
            e,
            t,
            l,
            n
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, r = c.id, s = c.onPostCommit;
            typeof s == "function" && s(
              r,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (v) {
            he(t, t.return, v);
          }
        } else
          qt(
            e,
            t,
            l,
            n
          );
        break;
      case 31:
        qt(
          e,
          t,
          l,
          n
        );
        break;
      case 13:
        qt(
          e,
          t,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, r = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? qt(
          e,
          t,
          l,
          n
        ) : Ma(e, t) : c._visibility & 2 ? qt(
          e,
          t,
          l,
          n
        ) : (c._visibility |= 2, Zn(
          e,
          t,
          l,
          n,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && uo(r, t);
        break;
      case 24:
        qt(
          e,
          t,
          l,
          n
        ), u & 2048 && io(t.alternate, t);
        break;
      default:
        qt(
          e,
          t,
          l,
          n
        );
    }
  }
  function Zn(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, r = t, s = l, v = n, S = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Zn(
            c,
            r,
            s,
            v,
            u
          ), Oa(8, r);
          break;
        case 23:
          break;
        case 22:
          var x = r.stateNode;
          r.memoizedState !== null ? x._visibility & 2 ? Zn(
            c,
            r,
            s,
            v,
            u
          ) : Ma(
            c,
            r
          ) : (x._visibility |= 2, Zn(
            c,
            r,
            s,
            v,
            u
          )), u && S & 2048 && uo(
            r.alternate,
            r
          );
          break;
        case 24:
          Zn(
            c,
            r,
            s,
            v,
            u
          ), u && S & 2048 && io(r.alternate, r);
          break;
        default:
          Zn(
            c,
            r,
            s,
            v,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Ma(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, n = t, u = n.flags;
        switch (n.tag) {
          case 22:
            Ma(l, n), u & 2048 && uo(
              n.alternate,
              n
            );
            break;
          case 24:
            Ma(l, n), u & 2048 && io(n.alternate, n);
            break;
          default:
            Ma(l, n);
        }
        t = t.sibling;
      }
  }
  var Na = 8192;
  function jn(e, t, l) {
    if (e.subtreeFlags & Na)
      for (e = e.child; e !== null; )
        td(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function td(e, t, l) {
    switch (e.tag) {
      case 26:
        jn(
          e,
          t,
          l
        ), e.flags & Na && e.memoizedState !== null && R0(
          l,
          Bt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        jn(
          e,
          t,
          l
        );
        break;
      case 3:
      case 4:
        var n = Bt;
        Bt = Iu(e.stateNode.containerInfo), jn(
          e,
          t,
          l
        ), Bt = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Na, Na = 16777216, jn(
          e,
          t,
          l
        ), Na = n) : jn(
          e,
          t,
          l
        ));
        break;
      default:
        jn(
          e,
          t,
          l
        );
    }
  }
  function ld(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Da(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          Le = n, ad(
            n,
            e
          );
        }
      ld(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        nd(e), e = e.sibling;
  }
  function nd(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Da(e), e.flags & 2048 && zl(9, e, e.return);
        break;
      case 3:
        Da(e);
        break;
      case 12:
        Da(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, qu(e)) : Da(e);
        break;
      default:
        Da(e);
    }
  }
  function qu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          Le = n, ad(
            n,
            e
          );
        }
      ld(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          zl(8, t, t.return), qu(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, qu(t));
          break;
        default:
          qu(t);
      }
      e = e.sibling;
    }
  }
  function ad(e, t) {
    for (; Le !== null; ) {
      var l = Le;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          zl(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          ha(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Le = n;
      else
        e: for (l = e; Le !== null; ) {
          n = Le;
          var u = n.sibling, c = n.return;
          if (Js(n), n === l) {
            Le = null;
            break e;
          }
          if (u !== null) {
            u.return = c, Le = u;
            break e;
          }
          Le = c;
        }
    }
  }
  var $v = {
    getCacheForType: function(e) {
      var t = Ke(we), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return Ke(we).controller.signal;
    }
  }, Wv = typeof WeakMap == "function" ? WeakMap : Map, re = 0, Se = null, P = null, le = 0, de = 0, bt = null, El = !1, Rn = !1, co = !1, cl = 0, Ue = 0, Tl = 0, ln = 0, oo = 0, St = 0, Cn = 0, Ua = null, ft = null, fo = !1, Yu = 0, ud = 0, Gu = 1 / 0, Xu = null, Al = null, Xe = 0, Ol = null, Hn = null, ol = 0, ro = 0, so = null, id = null, Za = 0, ho = null;
  function zt() {
    return (re & 2) !== 0 && le !== 0 ? le & -le : O.T !== null ? _o() : zf();
  }
  function cd() {
    if (St === 0)
      if ((le & 536870912) === 0 || ue) {
        var e = Wa;
        Wa <<= 1, (Wa & 3932160) === 0 && (Wa = 262144), St = e;
      } else St = 536870912;
    return e = pt.current, e !== null && (e.flags |= 32), St;
  }
  function rt(e, t, l) {
    (e === Se && (de === 2 || de === 9) || e.cancelPendingCommit !== null) && (wn(e, 0), xl(
      e,
      le,
      St,
      !1
    )), Pn(e, l), ((re & 2) === 0 || e !== Se) && (e === Se && ((re & 2) === 0 && (ln |= l), Ue === 4 && xl(
      e,
      le,
      St,
      !1
    )), Lt(e));
  }
  function od(e, t, l) {
    if ((re & 6) !== 0) throw Error(f(327));
    var n = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || In(e, t), u = n ? Pv(e, t) : vo(e, t, !0), c = n;
    do {
      if (u === 0) {
        Rn && !n && xl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, c && !Fv(l)) {
          u = vo(e, t, !1), c = !1;
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
              var s = e;
              u = Ua;
              var v = s.current.memoizedState.isDehydrated;
              if (v && (wn(s, r).flags |= 256), r = vo(
                s,
                r,
                !1
              ), r !== 2) {
                if (co && !v) {
                  s.errorRecoveryDisabledLanes |= c, ln |= c, u = 4;
                  break e;
                }
                c = ft, ft = u, c !== null && (ft === null ? ft = c : ft.push.apply(
                  ft,
                  c
                ));
              }
              u = r;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          wn(e, 0), xl(e, t, 0, !0);
          break;
        }
        e: {
          switch (n = e, c = u, c) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              xl(
                n,
                t,
                St,
                !El
              );
              break e;
            case 2:
              ft = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((t & 62914560) === t && (u = Yu + 300 - ht(), 10 < u)) {
            if (xl(
              n,
              t,
              St,
              !El
            ), Ia(n, 0, !0) !== 0) break e;
            ol = t, n.timeoutHandle = qd(
              fd.bind(
                null,
                n,
                l,
                ft,
                Xu,
                fo,
                t,
                St,
                ln,
                Cn,
                El,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          fd(
            n,
            l,
            ft,
            Xu,
            fo,
            t,
            St,
            ln,
            Cn,
            El,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Lt(e);
  }
  function fd(e, t, l, n, u, c, r, s, v, S, x, D, E, A) {
    if (e.timeoutHandle = -1, D = t.subtreeFlags, D & 8192 || (D & 16785408) === 16785408) {
      D = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Kt
      }, td(
        t,
        c,
        D
      );
      var w = (c & 62914560) === c ? Yu - ht() : (c & 4194048) === c ? ud - ht() : 0;
      if (w = C0(
        D,
        w
      ), w !== null) {
        ol = c, e.cancelPendingCommit = w(
          gd.bind(
            null,
            e,
            t,
            c,
            l,
            n,
            u,
            r,
            s,
            v,
            x,
            D,
            null,
            E,
            A
          )
        ), xl(e, c, r, !S);
        return;
      }
    }
    gd(
      e,
      t,
      c,
      l,
      n,
      u,
      r,
      s,
      v
    );
  }
  function Fv(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var u = l[n], c = u.getSnapshot;
          u = u.value;
          try {
            if (!yt(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (l = t.child, t.subtreeFlags & 16384 && l !== null)
        l.return = t, t = l;
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
  function xl(e, t, l, n) {
    t &= ~oo, t &= ~ln, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - vt(u), r = 1 << c;
      n[c] = -1, u &= ~r;
    }
    l !== 0 && _f(e, l, t);
  }
  function Qu() {
    return (re & 6) === 0 ? (ja(0), !1) : !0;
  }
  function mo() {
    if (P !== null) {
      if (de === 0)
        var e = P.return;
      else
        e = P, Ft = Kl = null, Nc(e), xn = null, va = 0, e = P;
      for (; e !== null; )
        Ys(e.alternate, e), e = e.return;
      P = null;
    }
  }
  function wn(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, g0(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ol = 0, mo(), Se = e, P = l = $t(e.current, null), le = t, de = 0, bt = null, El = !1, Rn = In(e, t), co = !1, Cn = St = oo = ln = Tl = Ue = 0, ft = Ua = null, fo = !1, (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - vt(n), c = 1 << u;
        t |= e[u], n &= ~c;
      }
    return cl = t, ru(), l;
  }
  function rd(e, t) {
    K = null, O.H = Ea, t === On || t === pu ? (t = Or(), de = 3) : t === gc ? (t = Or(), de = 4) : de = t === Vc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, bt = t, P === null && (Ue = 1, Zu(
      e,
      xt(t, e.current)
    ));
  }
  function sd() {
    var e = pt.current;
    return e === null ? !0 : (le & 4194048) === le ? Ut === null : (le & 62914560) === le || (le & 536870912) !== 0 ? e === Ut : !1;
  }
  function dd() {
    var e = O.H;
    return O.H = Ea, e === null ? Ea : e;
  }
  function hd() {
    var e = O.A;
    return O.A = $v, e;
  }
  function Lu() {
    Ue = 4, El || (le & 4194048) !== le && pt.current !== null || (Rn = !0), (Tl & 134217727) === 0 && (ln & 134217727) === 0 || Se === null || xl(
      Se,
      le,
      St,
      !1
    );
  }
  function vo(e, t, l) {
    var n = re;
    re |= 2;
    var u = dd(), c = hd();
    (Se !== e || le !== t) && (Xu = null, wn(e, t)), t = !1;
    var r = Ue;
    e: do
      try {
        if (de !== 0 && P !== null) {
          var s = P, v = bt;
          switch (de) {
            case 8:
              mo(), r = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              pt.current === null && (t = !0);
              var S = de;
              if (de = 0, bt = null, Bn(e, s, v, S), l && Rn) {
                r = 0;
                break e;
              }
              break;
            default:
              S = de, de = 0, bt = null, Bn(e, s, v, S);
          }
        }
        Iv(), r = Ue;
        break;
      } catch (x) {
        rd(e, x);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ft = Kl = null, re = n, O.H = u, O.A = c, P === null && (Se = null, le = 0, ru()), r;
  }
  function Iv() {
    for (; P !== null; ) md(P);
  }
  function Pv(e, t) {
    var l = re;
    re |= 2;
    var n = dd(), u = hd();
    Se !== e || le !== t ? (Xu = null, Gu = ht() + 500, wn(e, t)) : Rn = In(
      e,
      t
    );
    e: do
      try {
        if (de !== 0 && P !== null) {
          t = P;
          var c = bt;
          t: switch (de) {
            case 1:
              de = 0, bt = null, Bn(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Tr(c)) {
                de = 0, bt = null, vd(t);
                break;
              }
              t = function() {
                de !== 2 && de !== 9 || Se !== e || (de = 7), Lt(e);
              }, c.then(t, t);
              break e;
            case 3:
              de = 7;
              break e;
            case 4:
              de = 5;
              break e;
            case 7:
              Tr(c) ? (de = 0, bt = null, vd(t)) : (de = 0, bt = null, Bn(e, t, c, 7));
              break;
            case 5:
              var r = null;
              switch (P.tag) {
                case 26:
                  r = P.memoizedState;
                case 5:
                case 27:
                  var s = P;
                  if (r ? eh(r) : s.stateNode.complete) {
                    de = 0, bt = null;
                    var v = s.sibling;
                    if (v !== null) P = v;
                    else {
                      var S = s.return;
                      S !== null ? (P = S, Vu(S)) : P = null;
                    }
                    break t;
                  }
              }
              de = 0, bt = null, Bn(e, t, c, 5);
              break;
            case 6:
              de = 0, bt = null, Bn(e, t, c, 6);
              break;
            case 8:
              mo(), Ue = 6;
              break e;
            default:
              throw Error(f(462));
          }
        }
        e0();
        break;
      } catch (x) {
        rd(e, x);
      }
    while (!0);
    return Ft = Kl = null, O.H = n, O.A = u, re = l, P !== null ? 0 : (Se = null, le = 0, ru(), Ue);
  }
  function e0() {
    for (; P !== null && !Em(); )
      md(P);
  }
  function md(e) {
    var t = Bs(e.alternate, e, cl);
    e.memoizedProps = e.pendingProps, t === null ? Vu(e) : P = t;
  }
  function vd(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Zs(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          le
        );
        break;
      case 11:
        t = Zs(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          le
        );
        break;
      case 5:
        Nc(t);
      default:
        Ys(l, t), t = P = hr(t, cl), t = Bs(l, t, cl);
    }
    e.memoizedProps = e.pendingProps, t === null ? Vu(e) : P = t;
  }
  function Bn(e, t, l, n) {
    Ft = Kl = null, Nc(t), xn = null, va = 0;
    var u = t.return;
    try {
      if (Xv(
        e,
        u,
        t,
        l,
        le
      )) {
        Ue = 1, Zu(
          e,
          xt(l, e.current)
        ), P = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw P = u, c;
      Ue = 1, Zu(
        e,
        xt(l, e.current)
      ), P = null;
      return;
    }
    t.flags & 32768 ? (ue || n === 1 ? e = !0 : Rn || (le & 536870912) !== 0 ? e = !1 : (El = e = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = pt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), yd(t, e)) : Vu(t);
  }
  function Vu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        yd(
          t,
          El
        );
        return;
      }
      e = t.return;
      var l = Vv(
        t.alternate,
        t,
        cl
      );
      if (l !== null) {
        P = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        P = t;
        return;
      }
      P = t = e;
    } while (t !== null);
    Ue === 0 && (Ue = 5);
  }
  function yd(e, t) {
    do {
      var l = kv(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, P = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        P = e;
        return;
      }
      P = e = l;
    } while (e !== null);
    Ue = 6, P = null;
  }
  function gd(e, t, l, n, u, c, r, s, v) {
    e.cancelPendingCommit = null;
    do
      ku();
    while (Xe !== 0);
    if ((re & 6) !== 0) throw Error(f(327));
    if (t !== null) {
      if (t === e.current) throw Error(f(177));
      if (c = t.lanes | t.childLanes, c |= lc, jm(
        e,
        l,
        c,
        r,
        s,
        v
      ), e === Se && (P = Se = null, le = 0), Hn = t, Ol = e, ol = l, ro = c, so = u, id = n, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, a0(Ja, function() {
        return zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null, u = C.p, C.p = 2, r = re, re |= 4;
        try {
          Kv(e, t, l);
        } finally {
          re = r, C.p = u, O.T = n;
        }
      }
      Xe = 1, pd(), _d(), bd();
    }
  }
  function pd() {
    if (Xe === 1) {
      Xe = 0;
      var e = Ol, t = Hn, l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null;
        var n = C.p;
        C.p = 2;
        var u = re;
        re |= 4;
        try {
          Is(t, e);
          var c = xo, r = ar(e.containerInfo), s = c.focusedElem, v = c.selectionRange;
          if (r !== s && s && s.ownerDocument && nr(
            s.ownerDocument.documentElement,
            s
          )) {
            if (v !== null && Fi(s)) {
              var S = v.start, x = v.end;
              if (x === void 0 && (x = S), "selectionStart" in s)
                s.selectionStart = S, s.selectionEnd = Math.min(
                  x,
                  s.value.length
                );
              else {
                var D = s.ownerDocument || document, E = D && D.defaultView || window;
                if (E.getSelection) {
                  var A = E.getSelection(), w = s.textContent.length, Q = Math.min(v.start, w), _e = v.end === void 0 ? Q : Math.min(v.end, w);
                  !A.extend && Q > _e && (r = _e, _e = Q, Q = r);
                  var _ = lr(
                    s,
                    Q
                  ), y = lr(
                    s,
                    _e
                  );
                  if (_ && y && (A.rangeCount !== 1 || A.anchorNode !== _.node || A.anchorOffset !== _.offset || A.focusNode !== y.node || A.focusOffset !== y.offset)) {
                    var b = D.createRange();
                    b.setStart(_.node, _.offset), A.removeAllRanges(), Q > _e ? (A.addRange(b), A.extend(y.node, y.offset)) : (b.setEnd(y.node, y.offset), A.addRange(b));
                  }
                }
              }
            }
            for (D = [], A = s; A = A.parentNode; )
              A.nodeType === 1 && D.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < D.length; s++) {
              var N = D[s];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          ai = !!Oo, xo = Oo = null;
        } finally {
          re = u, C.p = n, O.T = l;
        }
      }
      e.current = t, Xe = 2;
    }
  }
  function _d() {
    if (Xe === 2) {
      Xe = 0;
      var e = Ol, t = Hn, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = O.T, O.T = null;
        var n = C.p;
        C.p = 2;
        var u = re;
        re |= 4;
        try {
          Ks(e, t.alternate, t);
        } finally {
          re = u, C.p = n, O.T = l;
        }
      }
      Xe = 3;
    }
  }
  function bd() {
    if (Xe === 4 || Xe === 3) {
      Xe = 0, Tm();
      var e = Ol, t = Hn, l = ol, n = id;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Xe = 5 : (Xe = 0, Hn = Ol = null, Sd(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Al = null), Zi(l), t = t.stateNode, mt && typeof mt.onCommitFiberRoot == "function")
        try {
          mt.onCommitFiberRoot(
            Fn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        t = O.T, u = C.p, C.p = 2, O.T = null;
        try {
          for (var c = e.onRecoverableError, r = 0; r < n.length; r++) {
            var s = n[r];
            c(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          O.T = t, C.p = u;
        }
      }
      (ol & 3) !== 0 && ku(), Lt(e), u = e.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? e === ho ? Za++ : (Za = 0, ho = e) : Za = 0, ja(0);
    }
  }
  function Sd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ha(t)));
  }
  function ku() {
    return pd(), _d(), bd(), zd();
  }
  function zd() {
    if (Xe !== 5) return !1;
    var e = Ol, t = ro;
    ro = 0;
    var l = Zi(ol), n = O.T, u = C.p;
    try {
      C.p = 32 > l ? 32 : l, O.T = null, l = so, so = null;
      var c = Ol, r = ol;
      if (Xe = 0, Hn = Ol = null, ol = 0, (re & 6) !== 0) throw Error(f(331));
      var s = re;
      if (re |= 4, nd(c.current), ed(
        c,
        c.current,
        r,
        l
      ), re = s, ja(0, !1), mt && typeof mt.onPostCommitFiberRoot == "function")
        try {
          mt.onPostCommitFiberRoot(Fn, c);
        } catch {
        }
      return !0;
    } finally {
      C.p = u, O.T = n, Sd(e, t);
    }
  }
  function Ed(e, t, l) {
    t = xt(l, t), t = Lc(e.stateNode, t, 2), e = _l(e, t, 2), e !== null && (Pn(e, 2), Lt(e));
  }
  function he(e, t, l) {
    if (e.tag === 3)
      Ed(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ed(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && (Al === null || !Al.has(n))) {
            e = xt(l, e), l = Ts(2), n = _l(t, l, 2), n !== null && (As(
              l,
              n,
              t,
              e
            ), Pn(n, 2), Lt(n));
            break;
          }
        }
        t = t.return;
      }
  }
  function yo(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new Wv();
      var u = /* @__PURE__ */ new Set();
      n.set(t, u);
    } else
      u = n.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), n.set(t, u));
    u.has(l) || (co = !0, u.add(l), e = t0.bind(null, e, t, l), t.then(e, e));
  }
  function t0(e, t, l) {
    var n = e.pingCache;
    n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Se === e && (le & l) === l && (Ue === 4 || Ue === 3 && (le & 62914560) === le && 300 > ht() - Yu ? (re & 2) === 0 && wn(e, 0) : oo |= l, Cn === le && (Cn = 0)), Lt(e);
  }
  function Td(e, t) {
    t === 0 && (t = pf()), e = Ll(e, t), e !== null && (Pn(e, t), Lt(e));
  }
  function l0(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Td(e, l);
  }
  function n0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var n = e.stateNode, u = e.memoizedState;
        u !== null && (l = u.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      case 22:
        n = e.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    n !== null && n.delete(t), Td(e, l);
  }
  function a0(e, t) {
    return Mi(e, t);
  }
  var Ku = null, qn = null, go = !1, Ju = !1, po = !1, Ml = 0;
  function Lt(e) {
    e !== qn && e.next === null && (qn === null ? Ku = qn = e : qn = qn.next = e), Ju = !0, go || (go = !0, i0());
  }
  function ja(e, t) {
    if (!po && Ju) {
      po = !0;
      do
        for (var l = !1, n = Ku; n !== null; ) {
          if (e !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var r = n.suspendedLanes, s = n.pingedLanes;
              c = (1 << 31 - vt(42 | e) + 1) - 1, c &= u & ~(r & ~s), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (l = !0, Md(n, c));
          } else
            c = le, c = Ia(
              n,
              n === Se ? c : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (c & 3) === 0 || In(n, c) || (l = !0, Md(n, c));
          n = n.next;
        }
      while (l);
      po = !1;
    }
  }
  function u0() {
    Ad();
  }
  function Ad() {
    Ju = go = !1;
    var e = 0;
    Ml !== 0 && y0() && (e = Ml);
    for (var t = ht(), l = null, n = Ku; n !== null; ) {
      var u = n.next, c = Od(n, t);
      c === 0 ? (n.next = null, l === null ? Ku = u : l.next = u, u === null && (qn = l)) : (l = n, (e !== 0 || (c & 3) !== 0) && (Ju = !0)), n = u;
    }
    Xe !== 0 && Xe !== 5 || ja(e), Ml !== 0 && (Ml = 0);
  }
  function Od(e, t) {
    for (var l = e.suspendedLanes, n = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var r = 31 - vt(c), s = 1 << r, v = u[r];
      v === -1 ? ((s & l) === 0 || (s & n) !== 0) && (u[r] = Zm(s, t)) : v <= t && (e.expiredLanes |= s), c &= ~s;
    }
    if (t = Se, l = le, l = Ia(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n = e.callbackNode, l === 0 || e === t && (de === 2 || de === 9) || e.cancelPendingCommit !== null)
      return n !== null && n !== null && Ni(n), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || In(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (n !== null && Ni(n), Zi(l)) {
        case 2:
        case 8:
          l = yf;
          break;
        case 32:
          l = Ja;
          break;
        case 268435456:
          l = gf;
          break;
        default:
          l = Ja;
      }
      return n = xd.bind(null, e), l = Mi(l, n), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return n !== null && n !== null && Ni(n), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function xd(e, t) {
    if (Xe !== 0 && Xe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (ku() && e.callbackNode !== l)
      return null;
    var n = le;
    return n = Ia(
      e,
      e === Se ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n === 0 ? null : (od(e, n, t), Od(e, ht()), e.callbackNode != null && e.callbackNode === l ? xd.bind(null, e) : null);
  }
  function Md(e, t) {
    if (ku()) return null;
    od(e, t, !0);
  }
  function i0() {
    p0(function() {
      (re & 6) !== 0 ? Mi(
        vf,
        u0
      ) : Ad();
    });
  }
  function _o() {
    if (Ml === 0) {
      var e = Tn;
      e === 0 && (e = $a, $a <<= 1, ($a & 261888) === 0 && ($a = 256)), Ml = e;
    }
    return Ml;
  }
  function Nd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : lu("" + e);
  }
  function Dd(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function c0(e, t, l, n, u) {
    if (t === "submit" && l && l.stateNode === u) {
      var c = Nd(
        (u[at] || null).action
      ), r = n.submitter;
      r && (t = (t = r[at] || null) ? Nd(t.formAction) : r.getAttribute("formAction"), t !== null && (c = t, r = null));
      var s = new iu(
        "action",
        "action",
        null,
        n,
        u
      );
      e.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Ml !== 0) {
                  var v = r ? Dd(u, r) : new FormData(u);
                  Bc(
                    l,
                    {
                      pending: !0,
                      data: v,
                      method: u.method,
                      action: c
                    },
                    null,
                    v
                  );
                }
              } else
                typeof c == "function" && (s.preventDefault(), v = r ? Dd(u, r) : new FormData(u), Bc(
                  l,
                  {
                    pending: !0,
                    data: v,
                    method: u.method,
                    action: c
                  },
                  c,
                  v
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var bo = 0; bo < tc.length; bo++) {
    var So = tc[bo], o0 = So.toLowerCase(), f0 = So[0].toUpperCase() + So.slice(1);
    wt(
      o0,
      "on" + f0
    );
  }
  wt(cr, "onAnimationEnd"), wt(or, "onAnimationIteration"), wt(fr, "onAnimationStart"), wt("dblclick", "onDoubleClick"), wt("focusin", "onFocus"), wt("focusout", "onBlur"), wt(Av, "onTransitionRun"), wt(Ov, "onTransitionStart"), wt(xv, "onTransitionCancel"), wt(rr, "onTransitionEnd"), rn("onMouseEnter", ["mouseout", "mouseover"]), rn("onMouseLeave", ["mouseout", "mouseover"]), rn("onPointerEnter", ["pointerout", "pointerover"]), rn("onPointerLeave", ["pointerout", "pointerover"]), Yl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Yl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Yl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Yl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Yl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Yl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ra = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), r0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ra)
  );
  function Ud(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l], u = n.event;
      n = n.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var r = n.length - 1; 0 <= r; r--) {
            var s = n[r], v = s.instance, S = s.currentTarget;
            if (s = s.listener, v !== c && u.isPropagationStopped())
              break e;
            c = s, u.currentTarget = S;
            try {
              c(u);
            } catch (x) {
              fu(x);
            }
            u.currentTarget = null, c = v;
          }
        else
          for (r = 0; r < n.length; r++) {
            if (s = n[r], v = s.instance, S = s.currentTarget, s = s.listener, v !== c && u.isPropagationStopped())
              break e;
            c = s, u.currentTarget = S;
            try {
              c(u);
            } catch (x) {
              fu(x);
            }
            u.currentTarget = null, c = v;
          }
      }
    }
  }
  function ee(e, t) {
    var l = t[ji];
    l === void 0 && (l = t[ji] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    l.has(n) || (Zd(t, e, 2, !1), l.add(n));
  }
  function zo(e, t, l) {
    var n = 0;
    t && (n |= 4), Zd(
      l,
      e,
      n,
      t
    );
  }
  var $u = "_reactListening" + Math.random().toString(36).slice(2);
  function Eo(e) {
    if (!e[$u]) {
      e[$u] = !0, Af.forEach(function(l) {
        l !== "selectionchange" && (r0.has(l) || zo(l, !1, e), zo(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$u] || (t[$u] = !0, zo("selectionchange", !1, t));
    }
  }
  function Zd(e, t, l, n) {
    switch (ch(t)) {
      case 2:
        var u = B0;
        break;
      case 8:
        u = q0;
        break;
      default:
        u = Bo;
    }
    l = u.bind(
      null,
      t,
      l,
      e
    ), u = void 0, !Xi || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), n ? u !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, l, !0) : u !== void 0 ? e.addEventListener(t, l, {
      passive: u
    }) : e.addEventListener(t, l, !1);
  }
  function To(e, t, l, n, u) {
    var c = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (; ; ) {
        if (n === null) return;
        var r = n.tag;
        if (r === 3 || r === 4) {
          var s = n.stateNode.containerInfo;
          if (s === u) break;
          if (r === 4)
            for (r = n.return; r !== null; ) {
              var v = r.tag;
              if ((v === 3 || v === 4) && r.stateNode.containerInfo === u)
                return;
              r = r.return;
            }
          for (; s !== null; ) {
            if (r = cn(s), r === null) return;
            if (v = r.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              n = c = r;
              continue e;
            }
            s = s.parentNode;
          }
        }
        n = n.return;
      }
    wf(function() {
      var S = c, x = Yi(l), D = [];
      e: {
        var E = sr.get(e);
        if (E !== void 0) {
          var A = iu, w = e;
          switch (e) {
            case "keypress":
              if (au(l) === 0) break e;
            case "keydown":
            case "keyup":
              A = nv;
              break;
            case "focusin":
              w = "focus", A = ki;
              break;
            case "focusout":
              w = "blur", A = ki;
              break;
            case "beforeblur":
            case "afterblur":
              A = ki;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = Yf;
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
              A = iv;
              break;
            case cr:
            case or:
            case fr:
              A = Jm;
              break;
            case rr:
              A = ov;
              break;
            case "scroll":
            case "scrollend":
              A = Qm;
              break;
            case "wheel":
              A = rv;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Wm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = Xf;
              break;
            case "toggle":
            case "beforetoggle":
              A = dv;
          }
          var Q = (t & 4) !== 0, _e = !Q && (e === "scroll" || e === "scrollend"), _ = Q ? E !== null ? E + "Capture" : null : E;
          Q = [];
          for (var y = S, b; y !== null; ) {
            var N = y;
            if (b = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || b === null || _ === null || (N = la(y, _), N != null && Q.push(
              Ca(y, N, b)
            )), _e) break;
            y = y.return;
          }
          0 < Q.length && (E = new A(
            E,
            w,
            null,
            l,
            x
          ), D.push({ event: E, listeners: Q }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (E = e === "mouseover" || e === "pointerover", A = e === "mouseout" || e === "pointerout", E && l !== qi && (w = l.relatedTarget || l.fromElement) && (cn(w) || w[un]))
            break e;
          if ((A || E) && (E = x.window === x ? x : (E = x.ownerDocument) ? E.defaultView || E.parentWindow : window, A ? (w = l.relatedTarget || l.toElement, A = S, w = w ? cn(w) : null, w !== null && (_e = h(w), Q = w.tag, w !== _e || Q !== 5 && Q !== 27 && Q !== 6) && (w = null)) : (A = null, w = S), A !== w)) {
            if (Q = Yf, N = "onMouseLeave", _ = "onMouseEnter", y = "mouse", (e === "pointerout" || e === "pointerover") && (Q = Xf, N = "onPointerLeave", _ = "onPointerEnter", y = "pointer"), _e = A == null ? E : ta(A), b = w == null ? E : ta(w), E = new Q(
              N,
              y + "leave",
              A,
              l,
              x
            ), E.target = _e, E.relatedTarget = b, N = null, cn(x) === S && (Q = new Q(
              _,
              y + "enter",
              w,
              l,
              x
            ), Q.target = b, Q.relatedTarget = _e, N = Q), _e = N, A && w)
              t: {
                for (Q = s0, _ = A, y = w, b = 0, N = _; N; N = Q(N))
                  b++;
                N = 0;
                for (var G = y; G; G = Q(G))
                  N++;
                for (; 0 < b - N; )
                  _ = Q(_), b--;
                for (; 0 < N - b; )
                  y = Q(y), N--;
                for (; b--; ) {
                  if (_ === y || y !== null && _ === y.alternate) {
                    Q = _;
                    break t;
                  }
                  _ = Q(_), y = Q(y);
                }
                Q = null;
              }
            else Q = null;
            A !== null && jd(
              D,
              E,
              A,
              Q,
              !1
            ), w !== null && _e !== null && jd(
              D,
              _e,
              w,
              Q,
              !0
            );
          }
        }
        e: {
          if (E = S ? ta(S) : window, A = E.nodeName && E.nodeName.toLowerCase(), A === "select" || A === "input" && E.type === "file")
            var ie = Wf;
          else if (Jf(E))
            if (Ff)
              ie = zv;
            else {
              ie = bv;
              var Y = _v;
            }
          else
            A = E.nodeName, !A || A.toLowerCase() !== "input" || E.type !== "checkbox" && E.type !== "radio" ? S && Bi(S.elementType) && (ie = Wf) : ie = Sv;
          if (ie && (ie = ie(e, S))) {
            $f(
              D,
              ie,
              l,
              x
            );
            break e;
          }
          Y && Y(e, E, S), e === "focusout" && S && E.type === "number" && S.memoizedProps.value != null && wi(E, "number", E.value);
        }
        switch (Y = S ? ta(S) : window, e) {
          case "focusin":
            (Jf(Y) || Y.contentEditable === "true") && (yn = Y, Ii = S, ra = null);
            break;
          case "focusout":
            ra = Ii = yn = null;
            break;
          case "mousedown":
            Pi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Pi = !1, ur(D, l, x);
            break;
          case "selectionchange":
            if (Tv) break;
          case "keydown":
          case "keyup":
            ur(D, l, x);
        }
        var J;
        if (Ji)
          e: {
            switch (e) {
              case "compositionstart":
                var ne = "onCompositionStart";
                break e;
              case "compositionend":
                ne = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ne = "onCompositionUpdate";
                break e;
            }
            ne = void 0;
          }
        else
          vn ? kf(e, l) && (ne = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (ne = "onCompositionStart");
        ne && (Qf && l.locale !== "ko" && (vn || ne !== "onCompositionStart" ? ne === "onCompositionEnd" && vn && (J = Bf()) : (dl = x, Qi = "value" in dl ? dl.value : dl.textContent, vn = !0)), Y = Wu(S, ne), 0 < Y.length && (ne = new Gf(
          ne,
          e,
          null,
          l,
          x
        ), D.push({ event: ne, listeners: Y }), J ? ne.data = J : (J = Kf(l), J !== null && (ne.data = J)))), (J = mv ? vv(e, l) : yv(e, l)) && (ne = Wu(S, "onBeforeInput"), 0 < ne.length && (Y = new Gf(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          x
        ), D.push({
          event: Y,
          listeners: ne
        }), Y.data = J)), c0(
          D,
          e,
          S,
          l,
          x
        );
      }
      Ud(D, t);
    });
  }
  function Ca(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Wu(e, t) {
    for (var l = t + "Capture", n = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = la(e, l), u != null && n.unshift(
        Ca(e, u, c)
      ), u = la(e, t), u != null && n.push(
        Ca(e, u, c)
      )), e.tag === 3) return n;
      e = e.return;
    }
    return [];
  }
  function s0(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jd(e, t, l, n, u) {
    for (var c = t._reactName, r = []; l !== null && l !== n; ) {
      var s = l, v = s.alternate, S = s.stateNode;
      if (s = s.tag, v !== null && v === n) break;
      s !== 5 && s !== 26 && s !== 27 || S === null || (v = S, u ? (S = la(l, c), S != null && r.unshift(
        Ca(l, S, v)
      )) : u || (S = la(l, c), S != null && r.push(
        Ca(l, S, v)
      ))), l = l.return;
    }
    r.length !== 0 && e.push({ event: t, listeners: r });
  }
  var d0 = /\r\n?/g, h0 = /\u0000|\uFFFD/g;
  function Rd(e) {
    return (typeof e == "string" ? e : "" + e).replace(d0, `
`).replace(h0, "");
  }
  function Cd(e, t) {
    return t = Rd(t), Rd(e) === t;
  }
  function pe(e, t, l, n, u, c) {
    switch (l) {
      case "children":
        typeof n == "string" ? t === "body" || t === "textarea" && n === "" || dn(e, n) : (typeof n == "number" || typeof n == "bigint") && t !== "body" && dn(e, "" + n);
        break;
      case "className":
        eu(e, "class", n);
        break;
      case "tabIndex":
        eu(e, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        eu(e, l, n);
        break;
      case "style":
        Cf(e, n, c);
        break;
      case "data":
        if (t !== "object") {
          eu(e, "data", n);
          break;
        }
      case "src":
      case "href":
        if (n === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (n == null || typeof n == "function" || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(l);
          break;
        }
        n = lu("" + n), e.setAttribute(l, n);
        break;
      case "action":
      case "formAction":
        if (typeof n == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (l === "formAction" ? (t !== "input" && pe(e, t, "name", u.name, u, null), pe(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), pe(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), pe(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (pe(e, t, "encType", u.encType, u, null), pe(e, t, "method", u.method, u, null), pe(e, t, "target", u.target, u, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(l);
          break;
        }
        n = lu("" + n), e.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (e.onclick = Kt);
        break;
      case "onScroll":
        n != null && ee("scroll", e);
        break;
      case "onScrollEnd":
        n != null && ee("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (u.children != null) throw Error(f(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = n && typeof n != "function" && typeof n != "symbol";
        break;
      case "muted":
        e.muted = n && typeof n != "function" && typeof n != "symbol";
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
        if (n == null || typeof n == "function" || typeof n == "boolean" || typeof n == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        l = lu("" + n), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          l
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
        n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, "" + n) : e.removeAttribute(l);
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
        n && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        n === !0 ? e.setAttribute(l, "") : n !== !1 && n != null && typeof n != "function" && typeof n != "symbol" ? e.setAttribute(l, n) : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        n != null && typeof n != "function" && typeof n != "symbol" && !isNaN(n) && 1 <= n ? e.setAttribute(l, n) : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        n == null || typeof n == "function" || typeof n == "symbol" || isNaN(n) ? e.removeAttribute(l) : e.setAttribute(l, n);
        break;
      case "popover":
        ee("beforetoggle", e), ee("toggle", e), Pa(e, "popover", n);
        break;
      case "xlinkActuate":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        kt(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        kt(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        Pa(e, "is", n);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = Gm.get(l) || l, Pa(e, l, n));
    }
  }
  function Ao(e, t, l, n, u, c) {
    switch (l) {
      case "style":
        Cf(e, n, c);
        break;
      case "dangerouslySetInnerHTML":
        if (n != null) {
          if (typeof n != "object" || !("__html" in n))
            throw Error(f(61));
          if (l = n.__html, l != null) {
            if (u.children != null) throw Error(f(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof n == "string" ? dn(e, n) : (typeof n == "number" || typeof n == "bigint") && dn(e, "" + n);
        break;
      case "onScroll":
        n != null && ee("scroll", e);
        break;
      case "onScrollEnd":
        n != null && ee("scrollend", e);
        break;
      case "onClick":
        n != null && (e.onclick = Kt);
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
        if (!Of.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (u = l.endsWith("Capture"), t = l.slice(2, u ? l.length - 7 : void 0), c = e[at] || null, c = c != null ? c[l] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof n == "function")) {
              typeof c != "function" && c !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, n, u);
              break e;
            }
            l in e ? e[l] = n : n === !0 ? e.setAttribute(l, "") : Pa(e, l, n);
          }
    }
  }
  function $e(e, t, l) {
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
        ee("error", e), ee("load", e);
        var n = !1, u = !1, c;
        for (c in l)
          if (l.hasOwnProperty(c)) {
            var r = l[c];
            if (r != null)
              switch (c) {
                case "src":
                  n = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(f(137, t));
                default:
                  pe(e, t, c, r, l, null);
              }
          }
        u && pe(e, t, "srcSet", l.srcSet, l, null), n && pe(e, t, "src", l.src, l, null);
        return;
      case "input":
        ee("invalid", e);
        var s = c = r = u = null, v = null, S = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var x = l[n];
            if (x != null)
              switch (n) {
                case "name":
                  u = x;
                  break;
                case "type":
                  r = x;
                  break;
                case "checked":
                  v = x;
                  break;
                case "defaultChecked":
                  S = x;
                  break;
                case "value":
                  c = x;
                  break;
                case "defaultValue":
                  s = x;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(f(137, t));
                  break;
                default:
                  pe(e, t, n, x, l, null);
              }
          }
        Uf(
          e,
          c,
          s,
          v,
          S,
          r,
          u,
          !1
        );
        return;
      case "select":
        ee("invalid", e), n = r = c = null;
        for (u in l)
          if (l.hasOwnProperty(u) && (s = l[u], s != null))
            switch (u) {
              case "value":
                c = s;
                break;
              case "defaultValue":
                r = s;
                break;
              case "multiple":
                n = s;
              default:
                pe(e, t, u, s, l, null);
            }
        t = c, l = r, e.multiple = !!n, t != null ? sn(e, !!n, t, !1) : l != null && sn(e, !!n, l, !0);
        return;
      case "textarea":
        ee("invalid", e), c = u = n = null;
        for (r in l)
          if (l.hasOwnProperty(r) && (s = l[r], s != null))
            switch (r) {
              case "value":
                n = s;
                break;
              case "defaultValue":
                u = s;
                break;
              case "children":
                c = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(f(91));
                break;
              default:
                pe(e, t, r, s, l, null);
            }
        jf(e, n, u, c);
        return;
      case "option":
        for (v in l)
          if (l.hasOwnProperty(v) && (n = l[v], n != null))
            switch (v) {
              case "selected":
                e.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                pe(e, t, v, n, l, null);
            }
        return;
      case "dialog":
        ee("beforetoggle", e), ee("toggle", e), ee("cancel", e), ee("close", e);
        break;
      case "iframe":
      case "object":
        ee("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ra.length; n++)
          ee(Ra[n], e);
        break;
      case "image":
        ee("error", e), ee("load", e);
        break;
      case "details":
        ee("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ee("error", e), ee("load", e);
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
        for (S in l)
          if (l.hasOwnProperty(S) && (n = l[S], n != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, t));
              default:
                pe(e, t, S, n, l, null);
            }
        return;
      default:
        if (Bi(t)) {
          for (x in l)
            l.hasOwnProperty(x) && (n = l[x], n !== void 0 && Ao(
              e,
              t,
              x,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && (n = l[s], n != null && pe(e, t, s, n, l, null));
  }
  function m0(e, t, l, n) {
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
        var u = null, c = null, r = null, s = null, v = null, S = null, x = null;
        for (A in l) {
          var D = l[A];
          if (l.hasOwnProperty(A) && D != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = D;
              default:
                n.hasOwnProperty(A) || pe(e, t, A, null, n, D);
            }
        }
        for (var E in n) {
          var A = n[E];
          if (D = l[E], n.hasOwnProperty(E) && (A != null || D != null))
            switch (E) {
              case "type":
                c = A;
                break;
              case "name":
                u = A;
                break;
              case "checked":
                S = A;
                break;
              case "defaultChecked":
                x = A;
                break;
              case "value":
                r = A;
                break;
              case "defaultValue":
                s = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(f(137, t));
                break;
              default:
                A !== D && pe(
                  e,
                  t,
                  E,
                  A,
                  n,
                  D
                );
            }
        }
        Hi(
          e,
          r,
          s,
          v,
          S,
          x,
          c,
          u
        );
        return;
      case "select":
        A = r = s = E = null;
        for (c in l)
          if (v = l[c], l.hasOwnProperty(c) && v != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                A = v;
              default:
                n.hasOwnProperty(c) || pe(
                  e,
                  t,
                  c,
                  null,
                  n,
                  v
                );
            }
        for (u in n)
          if (c = n[u], v = l[u], n.hasOwnProperty(u) && (c != null || v != null))
            switch (u) {
              case "value":
                E = c;
                break;
              case "defaultValue":
                s = c;
                break;
              case "multiple":
                r = c;
              default:
                c !== v && pe(
                  e,
                  t,
                  u,
                  c,
                  n,
                  v
                );
            }
        t = s, l = r, n = A, E != null ? sn(e, !!l, E, !1) : !!n != !!l && (t != null ? sn(e, !!l, t, !0) : sn(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        A = E = null;
        for (s in l)
          if (u = l[s], l.hasOwnProperty(s) && u != null && !n.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                pe(e, t, s, null, n, u);
            }
        for (r in n)
          if (u = n[r], c = l[r], n.hasOwnProperty(r) && (u != null || c != null))
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
                if (u != null) throw Error(f(91));
                break;
              default:
                u !== c && pe(e, t, r, u, n, c);
            }
        Zf(e, E, A);
        return;
      case "option":
        for (var w in l)
          if (E = l[w], l.hasOwnProperty(w) && E != null && !n.hasOwnProperty(w))
            switch (w) {
              case "selected":
                e.selected = !1;
                break;
              default:
                pe(
                  e,
                  t,
                  w,
                  null,
                  n,
                  E
                );
            }
        for (v in n)
          if (E = n[v], A = l[v], n.hasOwnProperty(v) && E !== A && (E != null || A != null))
            switch (v) {
              case "selected":
                e.selected = E && typeof E != "function" && typeof E != "symbol";
                break;
              default:
                pe(
                  e,
                  t,
                  v,
                  E,
                  n,
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
        for (var Q in l)
          E = l[Q], l.hasOwnProperty(Q) && E != null && !n.hasOwnProperty(Q) && pe(e, t, Q, null, n, E);
        for (S in n)
          if (E = n[S], A = l[S], n.hasOwnProperty(S) && E !== A && (E != null || A != null))
            switch (S) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (E != null)
                  throw Error(f(137, t));
                break;
              default:
                pe(
                  e,
                  t,
                  S,
                  E,
                  n,
                  A
                );
            }
        return;
      default:
        if (Bi(t)) {
          for (var _e in l)
            E = l[_e], l.hasOwnProperty(_e) && E !== void 0 && !n.hasOwnProperty(_e) && Ao(
              e,
              t,
              _e,
              void 0,
              n,
              E
            );
          for (x in n)
            E = n[x], A = l[x], !n.hasOwnProperty(x) || E === A || E === void 0 && A === void 0 || Ao(
              e,
              t,
              x,
              E,
              n,
              A
            );
          return;
        }
    }
    for (var _ in l)
      E = l[_], l.hasOwnProperty(_) && E != null && !n.hasOwnProperty(_) && pe(e, t, _, null, n, E);
    for (D in n)
      E = n[D], A = l[D], !n.hasOwnProperty(D) || E === A || E == null && A == null || pe(e, t, D, E, n, A);
  }
  function Hd(e) {
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
  function v0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var u = l[n], c = u.transferSize, r = u.initiatorType, s = u.duration;
        if (c && s && Hd(r)) {
          for (r = 0, s = u.responseEnd, n += 1; n < l.length; n++) {
            var v = l[n], S = v.startTime;
            if (S > s) break;
            var x = v.transferSize, D = v.initiatorType;
            x && Hd(D) && (v = v.responseEnd, r += x * (v < s ? 1 : (s - S) / (v - S)));
          }
          if (--n, t += 8 * (c + r) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Oo = null, xo = null;
  function Fu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function wd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Bd(e, t) {
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
  function Mo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var No = null;
  function y0() {
    var e = window.event;
    return e && e.type === "popstate" ? e === No ? !1 : (No = e, !0) : (No = null, !1);
  }
  var qd = typeof setTimeout == "function" ? setTimeout : void 0, g0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Yd = typeof Promise == "function" ? Promise : void 0, p0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yd < "u" ? function(e) {
    return Yd.resolve(null).then(e).catch(_0);
  } : qd;
  function _0(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Nl(e) {
    return e === "head";
  }
  function Gd(e, t) {
    var l = t, n = 0;
    do {
      var u = l.nextSibling;
      if (e.removeChild(l), u && u.nodeType === 8)
        if (l = u.data, l === "/$" || l === "/&") {
          if (n === 0) {
            e.removeChild(u), Qn(t);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          Ha(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, Ha(l);
          for (var c = l.firstChild; c; ) {
            var r = c.nextSibling, s = c.nodeName;
            c[ea] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && c.rel.toLowerCase() === "stylesheet" || l.removeChild(c), c = r;
          }
        } else
          l === "body" && Ha(e.ownerDocument.body);
      l = u;
    } while (l);
    Qn(t);
  }
  function Xd(e, t) {
    var l = e;
    e = 0;
    do {
      var n = l.nextSibling;
      if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), n && n.nodeType === 8)
        if (l = n.data, l === "/$") {
          if (e === 0) break;
          e--;
        } else
          l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
      l = n;
    } while (l);
  }
  function Do(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Do(l), Ri(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function b0(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (n) {
        if (!e[ea])
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
      if (e = Zt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function S0(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Qd(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Zt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Uo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Zo(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function z0(e, t) {
    var l = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || l.readyState !== "loading")
      t();
    else {
      var n = function() {
        t(), l.removeEventListener("DOMContentLoaded", n);
      };
      l.addEventListener("DOMContentLoaded", n), e._reactRetry = n;
    }
  }
  function Zt(e) {
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
  var jo = null;
  function Ld(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Zt(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Vd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (t === 0) return e;
          t--;
        } else l !== "/$" && l !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function kd(e, t, l) {
    switch (t = Fu(l), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(f(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(f(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(f(454));
        return e;
      default:
        throw Error(f(451));
    }
  }
  function Ha(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ri(e);
  }
  var jt = /* @__PURE__ */ new Map(), Kd = /* @__PURE__ */ new Set();
  function Iu(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var fl = C.d;
  C.d = {
    f: E0,
    r: T0,
    D: A0,
    C: O0,
    L: x0,
    m: M0,
    X: D0,
    S: N0,
    M: U0
  };
  function E0() {
    var e = fl.f(), t = Qu();
    return e || t;
  }
  function T0(e) {
    var t = on(e);
    t !== null && t.tag === 5 && t.type === "form" ? rs(t) : fl.r(e);
  }
  var Yn = typeof document > "u" ? null : document;
  function Jd(e, t, l) {
    var n = Yn;
    if (n && typeof t == "string" && t) {
      var u = At(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof l == "string" && (u += '[crossorigin="' + l + '"]'), Kd.has(u) || (Kd.add(u), e = { rel: e, crossOrigin: l, href: t }, n.querySelector(u) === null && (t = n.createElement("link"), $e(t, "link", e), Qe(t), n.head.appendChild(t)));
    }
  }
  function A0(e) {
    fl.D(e), Jd("dns-prefetch", e, null);
  }
  function O0(e, t) {
    fl.C(e, t), Jd("preconnect", e, t);
  }
  function x0(e, t, l) {
    fl.L(e, t, l);
    var n = Yn;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + At(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (u += '[imagesrcset="' + At(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (u += '[imagesizes="' + At(
        l.imageSizes
      ) + '"]')) : u += '[href="' + At(e) + '"]';
      var c = u;
      switch (t) {
        case "style":
          c = Gn(e);
          break;
        case "script":
          c = Xn(e);
      }
      jt.has(c) || (e = j(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), jt.set(c, e), n.querySelector(u) !== null || t === "style" && n.querySelector(wa(c)) || t === "script" && n.querySelector(Ba(c)) || (t = n.createElement("link"), $e(t, "link", e), Qe(t), n.head.appendChild(t)));
    }
  }
  function M0(e, t) {
    fl.m(e, t);
    var l = Yn;
    if (l && e) {
      var n = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + At(n) + '"][href="' + At(e) + '"]', c = u;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Xn(e);
      }
      if (!jt.has(c) && (e = j({ rel: "modulepreload", href: e }, t), jt.set(c, e), l.querySelector(u) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Ba(c)))
              return;
        }
        n = l.createElement("link"), $e(n, "link", e), Qe(n), l.head.appendChild(n);
      }
    }
  }
  function N0(e, t, l) {
    fl.S(e, t, l);
    var n = Yn;
    if (n && e) {
      var u = fn(n).hoistableStyles, c = Gn(e);
      t = t || "default";
      var r = u.get(c);
      if (!r) {
        var s = { loading: 0, preload: null };
        if (r = n.querySelector(
          wa(c)
        ))
          s.loading = 5;
        else {
          e = j(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = jt.get(c)) && Ro(e, l);
          var v = r = n.createElement("link");
          Qe(v), $e(v, "link", e), v._p = new Promise(function(S, x) {
            v.onload = S, v.onerror = x;
          }), v.addEventListener("load", function() {
            s.loading |= 1;
          }), v.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, Pu(r, t, n);
        }
        r = {
          type: "stylesheet",
          instance: r,
          count: 1,
          state: s
        }, u.set(c, r);
      }
    }
  }
  function D0(e, t) {
    fl.X(e, t);
    var l = Yn;
    if (l && e) {
      var n = fn(l).hoistableScripts, u = Xn(e), c = n.get(u);
      c || (c = l.querySelector(Ba(u)), c || (e = j({ src: e, async: !0 }, t), (t = jt.get(u)) && Co(e, t), c = l.createElement("script"), Qe(c), $e(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, n.set(u, c));
    }
  }
  function U0(e, t) {
    fl.M(e, t);
    var l = Yn;
    if (l && e) {
      var n = fn(l).hoistableScripts, u = Xn(e), c = n.get(u);
      c || (c = l.querySelector(Ba(u)), c || (e = j({ src: e, async: !0, type: "module" }, t), (t = jt.get(u)) && Co(e, t), c = l.createElement("script"), Qe(c), $e(c, "link", e), l.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, n.set(u, c));
    }
  }
  function $d(e, t, l, n) {
    var u = (u = I.current) ? Iu(u) : null;
    if (!u) throw Error(f(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Gn(l.href), l = fn(
          u
        ).hoistableStyles, n = l.get(t), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = Gn(l.href);
          var c = fn(
            u
          ).hoistableStyles, r = c.get(e);
          if (r || (u = u.ownerDocument || u, r = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, r), (c = u.querySelector(
            wa(e)
          )) && !c._p && (r.instance = c, r.state.loading = 5), jt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, jt.set(e, l), c || Z0(
            u,
            e,
            l,
            r.state
          ))), t && n === null)
            throw Error(f(528, ""));
          return r;
        }
        if (t && n !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Xn(l), l = fn(
          u
        ).hoistableScripts, n = l.get(t), n || (n = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, e));
    }
  }
  function Gn(e) {
    return 'href="' + At(e) + '"';
  }
  function wa(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Wd(e) {
    return j({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Z0(e, t, l, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
      return n.loading |= 1;
    }), t.addEventListener("error", function() {
      return n.loading |= 2;
    }), $e(t, "link", l), Qe(t), e.head.appendChild(t));
  }
  function Xn(e) {
    return '[src="' + At(e) + '"]';
  }
  function Ba(e) {
    return "script[async]" + e;
  }
  function Fd(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var n = e.querySelector(
            'style[data-href~="' + At(l.href) + '"]'
          );
          if (n)
            return t.instance = n, Qe(n), n;
          var u = j({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement(
            "style"
          ), Qe(n), $e(n, "style", u), Pu(n, l.precedence, e), t.instance = n;
        case "stylesheet":
          u = Gn(l.href);
          var c = e.querySelector(
            wa(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, Qe(c), c;
          n = Wd(l), (u = jt.get(u)) && Ro(n, u), c = (e.ownerDocument || e).createElement("link"), Qe(c);
          var r = c;
          return r._p = new Promise(function(s, v) {
            r.onload = s, r.onerror = v;
          }), $e(c, "link", n), t.state.loading |= 4, Pu(c, l.precedence, e), t.instance = c;
        case "script":
          return c = Xn(l.src), (u = e.querySelector(
            Ba(c)
          )) ? (t.instance = u, Qe(u), u) : (n = l, (u = jt.get(c)) && (n = j({}, l), Co(n, u)), e = e.ownerDocument || e, u = e.createElement("script"), Qe(u), $e(u, "link", n), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(f(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Pu(n, l.precedence, e));
    return t.instance;
  }
  function Pu(e, t, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = n.length ? n[n.length - 1] : null, c = u, r = 0; r < n.length; r++) {
      var s = n[r];
      if (s.dataset.precedence === t) c = s;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Ro(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Co(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ei = null;
  function Id(e, t, l) {
    if (ei === null) {
      var n = /* @__PURE__ */ new Map(), u = ei = /* @__PURE__ */ new Map();
      u.set(l, n);
    } else
      u = ei, n = u.get(l), n || (n = /* @__PURE__ */ new Map(), u.set(l, n));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), u = 0; u < l.length; u++) {
      var c = l[u];
      if (!(c[ea] || c[Ve] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var r = c.getAttribute(t) || "";
        r = e + r;
        var s = n.get(r);
        s ? s.push(c) : n.set(r, [c]);
      }
    }
    return n;
  }
  function Pd(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function j0(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
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
  function eh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function R0(e, t, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var u = Gn(n.href), c = t.querySelector(
          wa(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ti.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = c, Qe(c);
          return;
        }
        c = t.ownerDocument || t, n = Wd(n), (u = jt.get(u)) && Ro(n, u), c = c.createElement("link"), Qe(c);
        var r = c;
        r._p = new Promise(function(s, v) {
          r.onload = s, r.onerror = v;
        }), $e(c, "link", n), l.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = ti.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Ho = 0;
  function C0(e, t) {
    return e.stylesheets && e.count === 0 && ni(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (e.stylesheets && ni(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ho === 0 && (Ho = 62500 * v0());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ni(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Ho ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(n), clearTimeout(u);
      };
    } : null;
  }
  function ti() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ni(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var li = null;
  function ni(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, li = /* @__PURE__ */ new Map(), t.forEach(H0, e), li = null, ti.call(e));
  }
  function H0(e, t) {
    if (!(t.state.loading & 4)) {
      var l = li.get(e);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), li.set(e, l);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var r = u[c];
          (r.nodeName === "LINK" || r.getAttribute("media") !== "not all") && (l.set(r.dataset.precedence, r), n = r);
        }
        n && l.set(null, n);
      }
      u = t.instance, r = u.getAttribute("data-precedence"), c = l.get(r) || n, c === n && l.set(null, u), l.set(r, u), this.count++, n = ti.bind(this), u.addEventListener("load", n), u.addEventListener("error", n), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var qa = {
    $$typeof: fe,
    Provider: null,
    Consumer: null,
    _currentValue: L,
    _currentValue2: L,
    _threadCount: 0
  };
  function w0(e, t, l, n, u, c, r, s, v) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Di(0), this.hiddenUpdates = Di(null), this.identifierPrefix = n, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = r, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function th(e, t, l, n, u, c, r, s, v, S, x, D) {
    return e = new w0(
      e,
      t,
      l,
      r,
      v,
      S,
      x,
      D,
      s
    ), t = 1, c === !0 && (t |= 24), c = gt(3, null, null, t), e.current = c, c.stateNode = e, t = mc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: t
    }, pc(c), e;
  }
  function lh(e) {
    return e ? (e = _n, e) : _n;
  }
  function nh(e, t, l, n, u, c) {
    u = lh(u), n.context === null ? n.context = u : n.pendingContext = u, n = pl(t), n.payload = { element: l }, c = c === void 0 ? null : c, c !== null && (n.callback = c), l = _l(e, n, t), l !== null && (rt(l, e, t), ga(l, e, t));
  }
  function ah(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function wo(e, t) {
    ah(e, t), (e = e.alternate) && ah(e, t);
  }
  function uh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ll(e, 67108864);
      t !== null && rt(t, e, 67108864), wo(e, 67108864);
    }
  }
  function ih(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = zt();
      t = Ui(t);
      var l = Ll(e, t);
      l !== null && rt(l, e, t), wo(e, t);
    }
  }
  var ai = !0;
  function B0(e, t, l, n) {
    var u = O.T;
    O.T = null;
    var c = C.p;
    try {
      C.p = 2, Bo(e, t, l, n);
    } finally {
      C.p = c, O.T = u;
    }
  }
  function q0(e, t, l, n) {
    var u = O.T;
    O.T = null;
    var c = C.p;
    try {
      C.p = 8, Bo(e, t, l, n);
    } finally {
      C.p = c, O.T = u;
    }
  }
  function Bo(e, t, l, n) {
    if (ai) {
      var u = qo(n);
      if (u === null)
        To(
          e,
          t,
          n,
          ui,
          l
        ), oh(e, n);
      else if (G0(
        u,
        e,
        t,
        l,
        n
      ))
        n.stopPropagation();
      else if (oh(e, n), t & 4 && -1 < Y0.indexOf(e)) {
        for (; u !== null; ) {
          var c = on(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var r = ql(c.pendingLanes);
                  if (r !== 0) {
                    var s = c;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; r; ) {
                      var v = 1 << 31 - vt(r);
                      s.entanglements[1] |= v, r &= ~v;
                    }
                    Lt(c), (re & 6) === 0 && (Gu = ht() + 500, ja(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Ll(c, 2), s !== null && rt(s, c, 2), Qu(), wo(c, 2);
            }
          if (c = qo(n), c === null && To(
            e,
            t,
            n,
            ui,
            l
          ), c === u) break;
          u = c;
        }
        u !== null && n.stopPropagation();
      } else
        To(
          e,
          t,
          n,
          null,
          l
        );
    }
  }
  function qo(e) {
    return e = Yi(e), Yo(e);
  }
  var ui = null;
  function Yo(e) {
    if (ui = null, e = cn(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = T(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ui = e, null;
  }
  function ch(e) {
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
        switch (Am()) {
          case vf:
            return 2;
          case yf:
            return 8;
          case Ja:
          case Om:
            return 32;
          case gf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Go = !1, Dl = null, Ul = null, Zl = null, Ya = /* @__PURE__ */ new Map(), Ga = /* @__PURE__ */ new Map(), jl = [], Y0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function oh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Dl = null;
        break;
      case "dragenter":
      case "dragleave":
        Ul = null;
        break;
      case "mouseover":
      case "mouseout":
        Zl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ya.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ga.delete(t.pointerId);
    }
  }
  function Xa(e, t, l, n, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = on(t), t !== null && uh(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function G0(e, t, l, n, u) {
    switch (t) {
      case "focusin":
        return Dl = Xa(
          Dl,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "dragenter":
        return Ul = Xa(
          Ul,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "mouseover":
        return Zl = Xa(
          Zl,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return Ya.set(
          c,
          Xa(
            Ya.get(c) || null,
            e,
            t,
            l,
            n,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, Ga.set(
          c,
          Xa(
            Ga.get(c) || null,
            e,
            t,
            l,
            n,
            u
          )
        ), !0;
    }
    return !1;
  }
  function fh(e) {
    var t = cn(e.target);
    if (t !== null) {
      var l = h(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = m(l), t !== null) {
            e.blockedOn = t, Ef(e.priority, function() {
              ih(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = T(l), t !== null) {
            e.blockedOn = t, Ef(e.priority, function() {
              ih(l);
            });
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function ii(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = qo(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        qi = n, l.target.dispatchEvent(n), qi = null;
      } else
        return t = on(l), t !== null && uh(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function rh(e, t, l) {
    ii(e) && l.delete(t);
  }
  function X0() {
    Go = !1, Dl !== null && ii(Dl) && (Dl = null), Ul !== null && ii(Ul) && (Ul = null), Zl !== null && ii(Zl) && (Zl = null), Ya.forEach(rh), Ga.forEach(rh);
  }
  function ci(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Go || (Go = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      X0
    )));
  }
  var oi = null;
  function sh(e) {
    oi !== e && (oi = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        oi === e && (oi = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], n = e[t + 1], u = e[t + 2];
          if (typeof n != "function") {
            if (Yo(n || l) === null)
              continue;
            break;
          }
          var c = on(l);
          c !== null && (e.splice(t, 3), t -= 3, Bc(
            c,
            {
              pending: !0,
              data: u,
              method: l.method,
              action: n
            },
            n,
            u
          ));
        }
      }
    ));
  }
  function Qn(e) {
    function t(v) {
      return ci(v, e);
    }
    Dl !== null && ci(Dl, e), Ul !== null && ci(Ul, e), Zl !== null && ci(Zl, e), Ya.forEach(t), Ga.forEach(t);
    for (var l = 0; l < jl.length; l++) {
      var n = jl[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < jl.length && (l = jl[0], l.blockedOn === null); )
      fh(l), l.blockedOn === null && jl.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var u = l[n], c = l[n + 1], r = u[at] || null;
        if (typeof c == "function")
          r || sh(l);
        else if (r) {
          var s = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, r = c[at] || null)
              s = r.formAction;
            else if (Yo(u) !== null) continue;
          } else s = r.action;
          typeof s == "function" ? l[n + 1] = s : (l.splice(n, 3), n -= 3), sh(l);
        }
      }
  }
  function dh() {
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
      u !== null && (u(), u = null), n || setTimeout(l, 20);
    }
    function l() {
      if (!n && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var n = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
        n = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function Xo(e) {
    this._internalRoot = e;
  }
  fi.prototype.render = Xo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(f(409));
    var l = t.current, n = zt();
    nh(l, n, e, t, null, null);
  }, fi.prototype.unmount = Xo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      nh(e.current, 2, null, e, null, null), Qu(), t[un] = null;
    }
  };
  function fi(e) {
    this._internalRoot = e;
  }
  fi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = zf();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < jl.length && t !== 0 && t < jl[l].priority; l++) ;
      jl.splice(l, 0, e), l === 0 && fh(e);
    }
  };
  var hh = i.version;
  if (hh !== "19.2.1")
    throw Error(
      f(
        527,
        hh,
        "19.2.1"
      )
    );
  C.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
    return e = g(t), e = e !== null ? R(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Q0 = {
    bundleType: 0,
    version: "19.2.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ri = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ri.isDisabled && ri.supportsFiber)
      try {
        Fn = ri.inject(
          Q0
        ), mt = ri;
      } catch {
      }
  }
  return La.createRoot = function(e, t) {
    if (!d(e)) throw Error(f(299));
    var l = !1, n = "", u = bs, c = Ss, r = zs;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = th(
      e,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      u,
      c,
      r,
      dh
    ), e[un] = t.current, Eo(e), new Xo(t);
  }, La.hydrateRoot = function(e, t, l) {
    if (!d(e)) throw Error(f(299));
    var n = !1, u = "", c = bs, r = Ss, s = zs, v = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (u = l.identifierPrefix), l.onUncaughtError !== void 0 && (c = l.onUncaughtError), l.onCaughtError !== void 0 && (r = l.onCaughtError), l.onRecoverableError !== void 0 && (s = l.onRecoverableError), l.formState !== void 0 && (v = l.formState)), t = th(
      e,
      1,
      !0,
      t,
      l ?? null,
      n,
      u,
      v,
      c,
      r,
      s,
      dh
    ), t.context = lh(null), l = t.current, n = zt(), n = Ui(n), u = pl(n), u.callback = null, _l(l, u, n), l = n, t.current.lanes = l, Pn(t, l), Lt(t), e[un] = t.current, Eo(e), new fi(t);
  }, La.version = "19.2.1", La;
}
var Eh;
function P0() {
  if (Eh) return Vo.exports;
  Eh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), Vo.exports = I0(), Vo.exports;
}
var ey = P0();
const ty = /* @__PURE__ */ Jh(ey);
function U(a, i, o) {
  function f(T, z) {
    if (T._zod || Object.defineProperty(T, "_zod", {
      value: {
        def: z,
        constr: m,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), T._zod.traits.has(a))
      return;
    T._zod.traits.add(a), i(T, z);
    const g = m.prototype, R = Object.keys(g);
    for (let j = 0; j < R.length; j++) {
      const B = R[j];
      B in T || (T[B] = g[B].bind(T));
    }
  }
  const d = o?.Parent ?? Object;
  class h extends d {
  }
  Object.defineProperty(h, "name", { value: a });
  function m(T) {
    var z;
    const g = o?.Parent ? new h() : this;
    f(g, T), (z = g._zod).deferred ?? (z.deferred = []);
    for (const R of g._zod.deferred)
      R();
    return g;
  }
  return Object.defineProperty(m, "init", { value: f }), Object.defineProperty(m, Symbol.hasInstance, {
    value: (T) => o?.Parent && T instanceof o.Parent ? !0 : T?._zod?.traits?.has(a)
  }), Object.defineProperty(m, "name", { value: a }), m;
}
class kn extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class $h extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const Wh = {};
function Cl(a) {
  return Wh;
}
function ly(a) {
  const i = Object.values(a).filter((f) => typeof f == "number");
  return Object.entries(a).filter(([f, d]) => i.indexOf(+f) === -1).map(([f, d]) => d);
}
function Fo(a, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function lf(a) {
  return {
    get value() {
      {
        const i = a();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function nf(a) {
  return a == null;
}
function af(a) {
  const i = a.startsWith("^") ? 1 : 0, o = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(i, o);
}
function ny(a, i) {
  const o = (a.toString().split(".")[1] || "").length, f = i.toString();
  let d = (f.split(".")[1] || "").length;
  if (d === 0 && /\d?e-\d?/.test(f)) {
    const z = f.match(/\d?e-(\d?)/);
    z?.[1] && (d = Number.parseInt(z[1]));
  }
  const h = o > d ? o : d, m = Number.parseInt(a.toFixed(h).replace(".", "")), T = Number.parseInt(i.toFixed(h).replace(".", ""));
  return m % T / 10 ** h;
}
const Th = Symbol("evaluating");
function ze(a, i, o) {
  let f;
  Object.defineProperty(a, i, {
    get() {
      if (f !== Th)
        return f === void 0 && (f = Th, f = o()), f;
    },
    set(d) {
      Object.defineProperty(a, i, {
        value: d
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function nn(a, i, o) {
  Object.defineProperty(a, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function an(...a) {
  const i = {};
  for (const o of a) {
    const f = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, f);
  }
  return Object.defineProperties({}, i);
}
function Ah(a) {
  return JSON.stringify(a);
}
function ay(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Fh = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function vi(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const uy = lf(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function Kn(a) {
  if (vi(a) === !1)
    return !1;
  const i = a.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !(vi(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function Ih(a) {
  return Kn(a) ? { ...a } : Array.isArray(a) ? [...a] : a;
}
const iy = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function _i(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function wl(a, i, o) {
  const f = new a._zod.constr(i ?? a._zod.def);
  return (!i || o?.parent) && (f._zod.parent = a), f;
}
function X(a) {
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
function cy(a) {
  return Object.keys(a).filter((i) => a[i]._zod.optin === "optional" && a[i]._zod.optout === "optional");
}
const oy = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function fy(a, i) {
  const o = a._zod.def, f = an(a._zod.def, {
    get shape() {
      const d = {};
      for (const h in i) {
        if (!(h in o.shape))
          throw new Error(`Unrecognized key: "${h}"`);
        i[h] && (d[h] = o.shape[h]);
      }
      return nn(this, "shape", d), d;
    },
    checks: []
  });
  return wl(a, f);
}
function ry(a, i) {
  const o = a._zod.def, f = an(a._zod.def, {
    get shape() {
      const d = { ...a._zod.def.shape };
      for (const h in i) {
        if (!(h in o.shape))
          throw new Error(`Unrecognized key: "${h}"`);
        i[h] && delete d[h];
      }
      return nn(this, "shape", d), d;
    },
    checks: []
  });
  return wl(a, f);
}
function sy(a, i) {
  if (!Kn(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = a._zod.def.checks;
  if (o && o.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const d = an(a._zod.def, {
    get shape() {
      const h = { ...a._zod.def.shape, ...i };
      return nn(this, "shape", h), h;
    },
    checks: []
  });
  return wl(a, d);
}
function dy(a, i) {
  if (!Kn(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = {
    ...a._zod.def,
    get shape() {
      const f = { ...a._zod.def.shape, ...i };
      return nn(this, "shape", f), f;
    },
    checks: a._zod.def.checks
  };
  return wl(a, o);
}
function hy(a, i) {
  const o = an(a._zod.def, {
    get shape() {
      const f = { ...a._zod.def.shape, ...i._zod.def.shape };
      return nn(this, "shape", f), f;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return wl(a, o);
}
function my(a, i, o) {
  const f = an(i._zod.def, {
    get shape() {
      const d = i._zod.def.shape, h = { ...d };
      if (o)
        for (const m in o) {
          if (!(m in d))
            throw new Error(`Unrecognized key: "${m}"`);
          o[m] && (h[m] = a ? new a({
            type: "optional",
            innerType: d[m]
          }) : d[m]);
        }
      else
        for (const m in d)
          h[m] = a ? new a({
            type: "optional",
            innerType: d[m]
          }) : d[m];
      return nn(this, "shape", h), h;
    },
    checks: []
  });
  return wl(i, f);
}
function vy(a, i, o) {
  const f = an(i._zod.def, {
    get shape() {
      const d = i._zod.def.shape, h = { ...d };
      if (o)
        for (const m in o) {
          if (!(m in h))
            throw new Error(`Unrecognized key: "${m}"`);
          o[m] && (h[m] = new a({
            type: "nonoptional",
            innerType: d[m]
          }));
        }
      else
        for (const m in d)
          h[m] = new a({
            type: "nonoptional",
            innerType: d[m]
          });
      return nn(this, "shape", h), h;
    },
    checks: []
  });
  return wl(i, f);
}
function Ln(a, i = 0) {
  if (a.aborted === !0)
    return !0;
  for (let o = i; o < a.issues.length; o++)
    if (a.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function Vn(a, i) {
  return i.map((o) => {
    var f;
    return (f = o).path ?? (f.path = []), o.path.unshift(a), o;
  });
}
function si(a) {
  return typeof a == "string" ? a : a?.message;
}
function Hl(a, i, o) {
  const f = { ...a, path: a.path ?? [] };
  if (!a.message) {
    const d = si(a.inst?._zod.def?.error?.(a)) ?? si(i?.error?.(a)) ?? si(o.customError?.(a)) ?? si(o.localeError?.(a)) ?? "Invalid input";
    f.message = d;
  }
  return delete f.inst, delete f.continue, i?.reportInput || delete f.input, f;
}
function uf(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function Va(...a) {
  const [i, o, f] = a;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: f
  } : { ...i };
}
const Ph = (a, i) => {
  a.name = "$ZodError", Object.defineProperty(a, "_zod", {
    value: a._zod,
    enumerable: !1
  }), Object.defineProperty(a, "issues", {
    value: i,
    enumerable: !1
  }), a.message = JSON.stringify(i, Fo, 2), Object.defineProperty(a, "toString", {
    value: () => a.message,
    enumerable: !1
  });
}, em = U("$ZodError", Ph), tm = U("$ZodError", Ph, { Parent: Error });
function yy(a, i = (o) => o.message) {
  const o = {}, f = [];
  for (const d of a.issues)
    d.path.length > 0 ? (o[d.path[0]] = o[d.path[0]] || [], o[d.path[0]].push(i(d))) : f.push(i(d));
  return { formErrors: f, fieldErrors: o };
}
function gy(a, i = (o) => o.message) {
  const o = { _errors: [] }, f = (d) => {
    for (const h of d.issues)
      if (h.code === "invalid_union" && h.errors.length)
        h.errors.map((m) => f({ issues: m }));
      else if (h.code === "invalid_key")
        f({ issues: h.issues });
      else if (h.code === "invalid_element")
        f({ issues: h.issues });
      else if (h.path.length === 0)
        o._errors.push(i(h));
      else {
        let m = o, T = 0;
        for (; T < h.path.length; ) {
          const z = h.path[T];
          T === h.path.length - 1 ? (m[z] = m[z] || { _errors: [] }, m[z]._errors.push(i(h))) : m[z] = m[z] || { _errors: [] }, m = m[z], T++;
        }
      }
  };
  return f(a), o;
}
const cf = (a) => (i, o, f, d) => {
  const h = f ? Object.assign(f, { async: !1 }) : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, h);
  if (m instanceof Promise)
    throw new kn();
  if (m.issues.length) {
    const T = new (d?.Err ?? a)(m.issues.map((z) => Hl(z, h, Cl())));
    throw Fh(T, d?.callee), T;
  }
  return m.value;
}, of = (a) => async (i, o, f, d) => {
  const h = f ? Object.assign(f, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, h);
  if (m instanceof Promise && (m = await m), m.issues.length) {
    const T = new (d?.Err ?? a)(m.issues.map((z) => Hl(z, h, Cl())));
    throw Fh(T, d?.callee), T;
  }
  return m.value;
}, bi = (a) => (i, o, f) => {
  const d = f ? { ...f, async: !1 } : { async: !1 }, h = i._zod.run({ value: o, issues: [] }, d);
  if (h instanceof Promise)
    throw new kn();
  return h.issues.length ? {
    success: !1,
    error: new (a ?? em)(h.issues.map((m) => Hl(m, d, Cl())))
  } : { success: !0, data: h.value };
}, py = /* @__PURE__ */ bi(tm), Si = (a) => async (i, o, f) => {
  const d = f ? Object.assign(f, { async: !0 }) : { async: !0 };
  let h = i._zod.run({ value: o, issues: [] }, d);
  return h instanceof Promise && (h = await h), h.issues.length ? {
    success: !1,
    error: new a(h.issues.map((m) => Hl(m, d, Cl())))
  } : { success: !0, data: h.value };
}, _y = /* @__PURE__ */ Si(tm), by = (a) => (i, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return cf(a)(i, o, d);
}, Sy = (a) => (i, o, f) => cf(a)(i, o, f), zy = (a) => async (i, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return of(a)(i, o, d);
}, Ey = (a) => async (i, o, f) => of(a)(i, o, f), Ty = (a) => (i, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return bi(a)(i, o, d);
}, Ay = (a) => (i, o, f) => bi(a)(i, o, f), Oy = (a) => async (i, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return Si(a)(i, o, d);
}, xy = (a) => async (i, o, f) => Si(a)(i, o, f), My = /^[cC][^\s-]{8,}$/, Ny = /^[0-9a-z]+$/, Dy = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Uy = /^[0-9a-vA-V]{20}$/, Zy = /^[A-Za-z0-9]{27}$/, jy = /^[a-zA-Z0-9_-]{21}$/, Ry = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Cy = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Oh = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Hy = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, wy = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function By() {
  return new RegExp(wy, "u");
}
const qy = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yy = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Gy = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xy = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qy = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, lm = /^[A-Za-z0-9_-]*$/, Ly = /^\+(?:[0-9]){6,14}[0-9]$/, nm = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Vy = /* @__PURE__ */ new RegExp(`^${nm}$`);
function am(a) {
  const i = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${i}` : a.precision === 0 ? `${i}:[0-5]\\d` : `${i}:[0-5]\\d\\.\\d{${a.precision}}` : `${i}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ky(a) {
  return new RegExp(`^${am(a)}$`);
}
function Ky(a) {
  const i = am({ precision: a.precision }), o = ["Z"];
  a.local && o.push(""), a.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const f = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${nm}T(?:${f})$`);
}
const Jy = (a) => {
  const i = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, $y = /^-?\d+$/, Wy = /^-?\d+(?:\.\d+)?/, Fy = /^[^A-Z]*$/, Iy = /^[^a-z]*$/, st = /* @__PURE__ */ U("$ZodCheck", (a, i) => {
  var o;
  a._zod ?? (a._zod = {}), a._zod.def = i, (o = a._zod).onattach ?? (o.onattach = []);
}), um = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, im = /* @__PURE__ */ U("$ZodCheckLessThan", (a, i) => {
  st.init(a, i);
  const o = um[typeof i.value];
  a._zod.onattach.push((f) => {
    const d = f._zod.bag, h = (i.inclusive ? d.maximum : d.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    i.value < h && (i.inclusive ? d.maximum = i.value : d.exclusiveMaximum = i.value);
  }), a._zod.check = (f) => {
    (i.inclusive ? f.value <= i.value : f.value < i.value) || f.issues.push({
      origin: o,
      code: "too_big",
      maximum: i.value,
      input: f.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), cm = /* @__PURE__ */ U("$ZodCheckGreaterThan", (a, i) => {
  st.init(a, i);
  const o = um[typeof i.value];
  a._zod.onattach.push((f) => {
    const d = f._zod.bag, h = (i.inclusive ? d.minimum : d.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    i.value > h && (i.inclusive ? d.minimum = i.value : d.exclusiveMinimum = i.value);
  }), a._zod.check = (f) => {
    (i.inclusive ? f.value >= i.value : f.value > i.value) || f.issues.push({
      origin: o,
      code: "too_small",
      minimum: i.value,
      input: f.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), Py = /* @__PURE__ */ U("$ZodCheckMultipleOf", (a, i) => {
  st.init(a, i), a._zod.onattach.push((o) => {
    var f;
    (f = o._zod.bag).multipleOf ?? (f.multipleOf = i.value);
  }), a._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : ny(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), eg = /* @__PURE__ */ U("$ZodCheckNumberFormat", (a, i) => {
  st.init(a, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), f = o ? "int" : "number", [d, h] = oy[i.format];
  a._zod.onattach.push((m) => {
    const T = m._zod.bag;
    T.format = i.format, T.minimum = d, T.maximum = h, o && (T.pattern = $y);
  }), a._zod.check = (m) => {
    const T = m.value;
    if (o) {
      if (!Number.isInteger(T)) {
        m.issues.push({
          expected: f,
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
          origin: f,
          continue: !i.abort
        }) : m.issues.push({
          input: T,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: f,
          continue: !i.abort
        });
        return;
      }
    }
    T < d && m.issues.push({
      origin: "number",
      input: T,
      code: "too_small",
      minimum: d,
      inclusive: !0,
      inst: a,
      continue: !i.abort
    }), T > h && m.issues.push({
      origin: "number",
      input: T,
      code: "too_big",
      maximum: h,
      inst: a
    });
  };
}), tg = /* @__PURE__ */ U("$ZodCheckMaxLength", (a, i) => {
  var o;
  st.init(a, i), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !nf(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < d && (f._zod.bag.maximum = i.maximum);
  }), a._zod.check = (f) => {
    const d = f.value;
    if (d.length <= i.maximum)
      return;
    const m = uf(d);
    f.issues.push({
      origin: m,
      code: "too_big",
      maximum: i.maximum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !i.abort
    });
  };
}), lg = /* @__PURE__ */ U("$ZodCheckMinLength", (a, i) => {
  var o;
  st.init(a, i), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !nf(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > d && (f._zod.bag.minimum = i.minimum);
  }), a._zod.check = (f) => {
    const d = f.value;
    if (d.length >= i.minimum)
      return;
    const m = uf(d);
    f.issues.push({
      origin: m,
      code: "too_small",
      minimum: i.minimum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !i.abort
    });
  };
}), ng = /* @__PURE__ */ U("$ZodCheckLengthEquals", (a, i) => {
  var o;
  st.init(a, i), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !nf(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.minimum = i.length, d.maximum = i.length, d.length = i.length;
  }), a._zod.check = (f) => {
    const d = f.value, h = d.length;
    if (h === i.length)
      return;
    const m = uf(d), T = h > i.length;
    f.issues.push({
      origin: m,
      ...T ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length },
      inclusive: !0,
      exact: !0,
      input: f.value,
      inst: a,
      continue: !i.abort
    });
  };
}), zi = /* @__PURE__ */ U("$ZodCheckStringFormat", (a, i) => {
  var o, f;
  st.init(a, i), a._zod.onattach.push((d) => {
    const h = d._zod.bag;
    h.format = i.format, i.pattern && (h.patterns ?? (h.patterns = /* @__PURE__ */ new Set()), h.patterns.add(i.pattern));
  }), i.pattern ? (o = a._zod).check ?? (o.check = (d) => {
    i.pattern.lastIndex = 0, !i.pattern.test(d.value) && d.issues.push({
      origin: "string",
      code: "invalid_format",
      format: i.format,
      input: d.value,
      ...i.pattern ? { pattern: i.pattern.toString() } : {},
      inst: a,
      continue: !i.abort
    });
  }) : (f = a._zod).check ?? (f.check = () => {
  });
}), ag = /* @__PURE__ */ U("$ZodCheckRegex", (a, i) => {
  zi.init(a, i), a._zod.check = (o) => {
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
}), ug = /* @__PURE__ */ U("$ZodCheckLowerCase", (a, i) => {
  i.pattern ?? (i.pattern = Fy), zi.init(a, i);
}), ig = /* @__PURE__ */ U("$ZodCheckUpperCase", (a, i) => {
  i.pattern ?? (i.pattern = Iy), zi.init(a, i);
}), cg = /* @__PURE__ */ U("$ZodCheckIncludes", (a, i) => {
  st.init(a, i);
  const o = _i(i.includes), f = new RegExp(typeof i.position == "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = f, a._zod.onattach.push((d) => {
    const h = d._zod.bag;
    h.patterns ?? (h.patterns = /* @__PURE__ */ new Set()), h.patterns.add(f);
  }), a._zod.check = (d) => {
    d.value.includes(i.includes, i.position) || d.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: i.includes,
      input: d.value,
      inst: a,
      continue: !i.abort
    });
  };
}), og = /* @__PURE__ */ U("$ZodCheckStartsWith", (a, i) => {
  st.init(a, i);
  const o = new RegExp(`^${_i(i.prefix)}.*`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (f) => {
    f.value.startsWith(i.prefix) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: i.prefix,
      input: f.value,
      inst: a,
      continue: !i.abort
    });
  };
}), fg = /* @__PURE__ */ U("$ZodCheckEndsWith", (a, i) => {
  st.init(a, i);
  const o = new RegExp(`.*${_i(i.suffix)}$`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (f) => {
    f.value.endsWith(i.suffix) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: i.suffix,
      input: f.value,
      inst: a,
      continue: !i.abort
    });
  };
}), rg = /* @__PURE__ */ U("$ZodCheckOverwrite", (a, i) => {
  st.init(a, i), a._zod.check = (o) => {
    o.value = i.tx(o.value);
  };
});
class sg {
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
    const f = i.split(`
`).filter((m) => m), d = Math.min(...f.map((m) => m.length - m.trimStart().length)), h = f.map((m) => m.slice(d)).map((m) => " ".repeat(this.indent * 2) + m);
    for (const m of h)
      this.content.push(m);
  }
  compile() {
    const i = Function, o = this?.args, d = [...(this?.content ?? [""]).map((h) => `  ${h}`)];
    return new i(...o, d.join(`
`));
  }
}
const dg = {
  major: 4,
  minor: 1,
  patch: 13
}, Ce = /* @__PURE__ */ U("$ZodType", (a, i) => {
  var o;
  a ?? (a = {}), a._zod.def = i, a._zod.bag = a._zod.bag || {}, a._zod.version = dg;
  const f = [...a._zod.def.checks ?? []];
  a._zod.traits.has("$ZodCheck") && f.unshift(a);
  for (const d of f)
    for (const h of d._zod.onattach)
      h(a);
  if (f.length === 0)
    (o = a._zod).deferred ?? (o.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const d = (m, T, z) => {
      let g = Ln(m), R;
      for (const j of T) {
        if (j._zod.def.when) {
          if (!j._zod.def.when(m))
            continue;
        } else if (g)
          continue;
        const B = m.issues.length, W = j._zod.check(m);
        if (W instanceof Promise && z?.async === !1)
          throw new kn();
        if (R || W instanceof Promise)
          R = (R ?? Promise.resolve()).then(async () => {
            await W, m.issues.length !== B && (g || (g = Ln(m, B)));
          });
        else {
          if (m.issues.length === B)
            continue;
          g || (g = Ln(m, B));
        }
      }
      return R ? R.then(() => m) : m;
    }, h = (m, T, z) => {
      if (Ln(m))
        return m.aborted = !0, m;
      const g = d(T, f, z);
      if (g instanceof Promise) {
        if (z.async === !1)
          throw new kn();
        return g.then((R) => a._zod.parse(R, z));
      }
      return a._zod.parse(g, z);
    };
    a._zod.run = (m, T) => {
      if (T.skipChecks)
        return a._zod.parse(m, T);
      if (T.direction === "backward") {
        const g = a._zod.parse({ value: m.value, issues: [] }, { ...T, skipChecks: !0 });
        return g instanceof Promise ? g.then((R) => h(R, m, T)) : h(g, m, T);
      }
      const z = a._zod.parse(m, T);
      if (z instanceof Promise) {
        if (T.async === !1)
          throw new kn();
        return z.then((g) => d(g, f, T));
      }
      return d(z, f, T);
    };
  }
  a["~standard"] = {
    validate: (d) => {
      try {
        const h = py(a, d);
        return h.success ? { value: h.data } : { issues: h.error?.issues };
      } catch {
        return _y(a, d).then((m) => m.success ? { value: m.data } : { issues: m.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), ff = /* @__PURE__ */ U("$ZodString", (a, i) => {
  Ce.init(a, i), a._zod.pattern = [...a?._zod.bag?.patterns ?? []].pop() ?? Jy(a._zod.bag), a._zod.parse = (o, f) => {
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
}), xe = /* @__PURE__ */ U("$ZodStringFormat", (a, i) => {
  zi.init(a, i), ff.init(a, i);
}), hg = /* @__PURE__ */ U("$ZodGUID", (a, i) => {
  i.pattern ?? (i.pattern = Cy), xe.init(a, i);
}), mg = /* @__PURE__ */ U("$ZodUUID", (a, i) => {
  if (i.version) {
    const f = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[i.version];
    if (f === void 0)
      throw new Error(`Invalid UUID version: "${i.version}"`);
    i.pattern ?? (i.pattern = Oh(f));
  } else
    i.pattern ?? (i.pattern = Oh());
  xe.init(a, i);
}), vg = /* @__PURE__ */ U("$ZodEmail", (a, i) => {
  i.pattern ?? (i.pattern = Hy), xe.init(a, i);
}), yg = /* @__PURE__ */ U("$ZodURL", (a, i) => {
  xe.init(a, i), a._zod.check = (o) => {
    try {
      const f = o.value.trim(), d = new URL(f);
      i.hostname && (i.hostname.lastIndex = 0, i.hostname.test(d.hostname) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: i.hostname.source,
        input: o.value,
        inst: a,
        continue: !i.abort
      })), i.protocol && (i.protocol.lastIndex = 0, i.protocol.test(d.protocol.endsWith(":") ? d.protocol.slice(0, -1) : d.protocol) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: i.protocol.source,
        input: o.value,
        inst: a,
        continue: !i.abort
      })), i.normalize ? o.value = d.href : o.value = f;
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
}), gg = /* @__PURE__ */ U("$ZodEmoji", (a, i) => {
  i.pattern ?? (i.pattern = By()), xe.init(a, i);
}), pg = /* @__PURE__ */ U("$ZodNanoID", (a, i) => {
  i.pattern ?? (i.pattern = jy), xe.init(a, i);
}), _g = /* @__PURE__ */ U("$ZodCUID", (a, i) => {
  i.pattern ?? (i.pattern = My), xe.init(a, i);
}), bg = /* @__PURE__ */ U("$ZodCUID2", (a, i) => {
  i.pattern ?? (i.pattern = Ny), xe.init(a, i);
}), Sg = /* @__PURE__ */ U("$ZodULID", (a, i) => {
  i.pattern ?? (i.pattern = Dy), xe.init(a, i);
}), zg = /* @__PURE__ */ U("$ZodXID", (a, i) => {
  i.pattern ?? (i.pattern = Uy), xe.init(a, i);
}), Eg = /* @__PURE__ */ U("$ZodKSUID", (a, i) => {
  i.pattern ?? (i.pattern = Zy), xe.init(a, i);
}), Tg = /* @__PURE__ */ U("$ZodISODateTime", (a, i) => {
  i.pattern ?? (i.pattern = Ky(i)), xe.init(a, i);
}), Ag = /* @__PURE__ */ U("$ZodISODate", (a, i) => {
  i.pattern ?? (i.pattern = Vy), xe.init(a, i);
}), Og = /* @__PURE__ */ U("$ZodISOTime", (a, i) => {
  i.pattern ?? (i.pattern = ky(i)), xe.init(a, i);
}), xg = /* @__PURE__ */ U("$ZodISODuration", (a, i) => {
  i.pattern ?? (i.pattern = Ry), xe.init(a, i);
}), Mg = /* @__PURE__ */ U("$ZodIPv4", (a, i) => {
  i.pattern ?? (i.pattern = qy), xe.init(a, i), a._zod.bag.format = "ipv4";
}), Ng = /* @__PURE__ */ U("$ZodIPv6", (a, i) => {
  i.pattern ?? (i.pattern = Yy), xe.init(a, i), a._zod.bag.format = "ipv6", a._zod.check = (o) => {
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
}), Dg = /* @__PURE__ */ U("$ZodCIDRv4", (a, i) => {
  i.pattern ?? (i.pattern = Gy), xe.init(a, i);
}), Ug = /* @__PURE__ */ U("$ZodCIDRv6", (a, i) => {
  i.pattern ?? (i.pattern = Xy), xe.init(a, i), a._zod.check = (o) => {
    const f = o.value.split("/");
    try {
      if (f.length !== 2)
        throw new Error();
      const [d, h] = f;
      if (!h)
        throw new Error();
      const m = Number(h);
      if (`${m}` !== h)
        throw new Error();
      if (m < 0 || m > 128)
        throw new Error();
      new URL(`http://[${d}]`);
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
function om(a) {
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
const Zg = /* @__PURE__ */ U("$ZodBase64", (a, i) => {
  i.pattern ?? (i.pattern = Qy), xe.init(a, i), a._zod.bag.contentEncoding = "base64", a._zod.check = (o) => {
    om(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
});
function jg(a) {
  if (!lm.test(a))
    return !1;
  const i = a.replace(/[-_]/g, (f) => f === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return om(o);
}
const Rg = /* @__PURE__ */ U("$ZodBase64URL", (a, i) => {
  i.pattern ?? (i.pattern = lm), xe.init(a, i), a._zod.bag.contentEncoding = "base64url", a._zod.check = (o) => {
    jg(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Cg = /* @__PURE__ */ U("$ZodE164", (a, i) => {
  i.pattern ?? (i.pattern = Ly), xe.init(a, i);
});
function Hg(a, i = null) {
  try {
    const o = a.split(".");
    if (o.length !== 3)
      return !1;
    const [f] = o;
    if (!f)
      return !1;
    const d = JSON.parse(atob(f));
    return !("typ" in d && d?.typ !== "JWT" || !d.alg || i && (!("alg" in d) || d.alg !== i));
  } catch {
    return !1;
  }
}
const wg = /* @__PURE__ */ U("$ZodJWT", (a, i) => {
  xe.init(a, i), a._zod.check = (o) => {
    Hg(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), fm = /* @__PURE__ */ U("$ZodNumber", (a, i) => {
  Ce.init(a, i), a._zod.pattern = a._zod.bag.pattern ?? Wy, a._zod.parse = (o, f) => {
    if (i.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const d = o.value;
    if (typeof d == "number" && !Number.isNaN(d) && Number.isFinite(d))
      return o;
    const h = typeof d == "number" ? Number.isNaN(d) ? "NaN" : Number.isFinite(d) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: d,
      inst: a,
      ...h ? { received: h } : {}
    }), o;
  };
}), Bg = /* @__PURE__ */ U("$ZodNumberFormat", (a, i) => {
  eg.init(a, i), fm.init(a, i);
}), qg = /* @__PURE__ */ U("$ZodUnknown", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o) => o;
}), Yg = /* @__PURE__ */ U("$ZodNever", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o, f) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: a
  }), o);
});
function xh(a, i, o) {
  a.issues.length && i.issues.push(...Vn(o, a.issues)), i.value[o] = a.value;
}
const Gg = /* @__PURE__ */ U("$ZodArray", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o, f) => {
    const d = o.value;
    if (!Array.isArray(d))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: d,
        inst: a
      }), o;
    o.value = Array(d.length);
    const h = [];
    for (let m = 0; m < d.length; m++) {
      const T = d[m], z = i.element._zod.run({
        value: T,
        issues: []
      }, f);
      z instanceof Promise ? h.push(z.then((g) => xh(g, o, m))) : xh(z, o, m);
    }
    return h.length ? Promise.all(h).then(() => o) : o;
  };
});
function yi(a, i, o, f) {
  a.issues.length && i.issues.push(...Vn(o, a.issues)), a.value === void 0 ? o in f && (i.value[o] = void 0) : i.value[o] = a.value;
}
function rm(a) {
  const i = Object.keys(a.shape);
  for (const f of i)
    if (!a.shape?.[f]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${f}": expected a Zod schema`);
  const o = cy(a.shape);
  return {
    ...a,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function sm(a, i, o, f, d, h) {
  const m = [], T = d.keySet, z = d.catchall._zod, g = z.def.type;
  for (const R in i) {
    if (T.has(R))
      continue;
    if (g === "never") {
      m.push(R);
      continue;
    }
    const j = z.run({ value: i[R], issues: [] }, f);
    j instanceof Promise ? a.push(j.then((B) => yi(B, o, R, i))) : yi(j, o, R, i);
  }
  return m.length && o.issues.push({
    code: "unrecognized_keys",
    keys: m,
    input: i,
    inst: h
  }), a.length ? Promise.all(a).then(() => o) : o;
}
const Xg = /* @__PURE__ */ U("$ZodObject", (a, i) => {
  if (Ce.init(a, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    const T = i.shape;
    Object.defineProperty(i, "shape", {
      get: () => {
        const z = { ...T };
        return Object.defineProperty(i, "shape", {
          value: z
        }), z;
      }
    });
  }
  const f = lf(() => rm(i));
  ze(a._zod, "propValues", () => {
    const T = i.shape, z = {};
    for (const g in T) {
      const R = T[g]._zod;
      if (R.values) {
        z[g] ?? (z[g] = /* @__PURE__ */ new Set());
        for (const j of R.values)
          z[g].add(j);
      }
    }
    return z;
  });
  const d = vi, h = i.catchall;
  let m;
  a._zod.parse = (T, z) => {
    m ?? (m = f.value);
    const g = T.value;
    if (!d(g))
      return T.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: a
      }), T;
    T.value = {};
    const R = [], j = m.shape;
    for (const B of m.keys) {
      const F = j[B]._zod.run({ value: g[B], issues: [] }, z);
      F instanceof Promise ? R.push(F.then((Ee) => yi(Ee, T, B, g))) : yi(F, T, B, g);
    }
    return h ? sm(R, g, T, z, f.value, a) : R.length ? Promise.all(R).then(() => T) : T;
  };
}), Qg = /* @__PURE__ */ U("$ZodObjectJIT", (a, i) => {
  Xg.init(a, i);
  const o = a._zod.parse, f = lf(() => rm(i)), d = (B) => {
    const W = new sg(["shape", "payload", "ctx"]), F = f.value, Ee = (fe) => {
      const me = Ah(fe);
      return `shape[${me}]._zod.run({ value: input[${me}], issues: [] }, ctx)`;
    };
    W.write("const input = payload.value;");
    const te = /* @__PURE__ */ Object.create(null);
    let oe = 0;
    for (const fe of F.keys)
      te[fe] = `key_${oe++}`;
    W.write("const newResult = {};");
    for (const fe of F.keys) {
      const me = te[fe], He = Ah(fe);
      W.write(`const ${me} = ${Ee(fe)};`), W.write(`
        if (${me}.issues.length) {
          payload.issues = payload.issues.concat(${me}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${He}, ...iss.path] : [${He}]
          })));
        }
        
        
        if (${me}.value === undefined) {
          if (${He} in input) {
            newResult[${He}] = undefined;
          }
        } else {
          newResult[${He}] = ${me}.value;
        }
        
      `);
    }
    W.write("payload.value = newResult;"), W.write("return payload;");
    const et = W.compile();
    return (fe, me) => et(B, fe, me);
  };
  let h;
  const m = vi, T = !Wh.jitless, g = T && uy.value, R = i.catchall;
  let j;
  a._zod.parse = (B, W) => {
    j ?? (j = f.value);
    const F = B.value;
    return m(F) ? T && g && W?.async === !1 && W.jitless !== !0 ? (h || (h = d(i.shape)), B = h(B, W), R ? sm([], F, B, W, j, a) : B) : o(B, W) : (B.issues.push({
      expected: "object",
      code: "invalid_type",
      input: F,
      inst: a
    }), B);
  };
});
function Mh(a, i, o, f) {
  for (const h of a)
    if (h.issues.length === 0)
      return i.value = h.value, i;
  const d = a.filter((h) => !Ln(h));
  return d.length === 1 ? (i.value = d[0].value, d[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: a.map((h) => h.issues.map((m) => Hl(m, f, Cl())))
  }), i);
}
const Lg = /* @__PURE__ */ U("$ZodUnion", (a, i) => {
  Ce.init(a, i), ze(a._zod, "optin", () => i.options.some((d) => d._zod.optin === "optional") ? "optional" : void 0), ze(a._zod, "optout", () => i.options.some((d) => d._zod.optout === "optional") ? "optional" : void 0), ze(a._zod, "values", () => {
    if (i.options.every((d) => d._zod.values))
      return new Set(i.options.flatMap((d) => Array.from(d._zod.values)));
  }), ze(a._zod, "pattern", () => {
    if (i.options.every((d) => d._zod.pattern)) {
      const d = i.options.map((h) => h._zod.pattern);
      return new RegExp(`^(${d.map((h) => af(h.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, f = i.options[0]._zod.run;
  a._zod.parse = (d, h) => {
    if (o)
      return f(d, h);
    let m = !1;
    const T = [];
    for (const z of i.options) {
      const g = z._zod.run({
        value: d.value,
        issues: []
      }, h);
      if (g instanceof Promise)
        T.push(g), m = !0;
      else {
        if (g.issues.length === 0)
          return g;
        T.push(g);
      }
    }
    return m ? Promise.all(T).then((z) => Mh(z, d, a, h)) : Mh(T, d, a, h);
  };
}), Vg = /* @__PURE__ */ U("$ZodIntersection", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o, f) => {
    const d = o.value, h = i.left._zod.run({ value: d, issues: [] }, f), m = i.right._zod.run({ value: d, issues: [] }, f);
    return h instanceof Promise || m instanceof Promise ? Promise.all([h, m]).then(([z, g]) => Nh(o, z, g)) : Nh(o, h, m);
  };
});
function Io(a, i) {
  if (a === i)
    return { valid: !0, data: a };
  if (a instanceof Date && i instanceof Date && +a == +i)
    return { valid: !0, data: a };
  if (Kn(a) && Kn(i)) {
    const o = Object.keys(i), f = Object.keys(a).filter((h) => o.indexOf(h) !== -1), d = { ...a, ...i };
    for (const h of f) {
      const m = Io(a[h], i[h]);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [h, ...m.mergeErrorPath]
        };
      d[h] = m.data;
    }
    return { valid: !0, data: d };
  }
  if (Array.isArray(a) && Array.isArray(i)) {
    if (a.length !== i.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let f = 0; f < a.length; f++) {
      const d = a[f], h = i[f], m = Io(d, h);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [f, ...m.mergeErrorPath]
        };
      o.push(m.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Nh(a, i, o) {
  if (i.issues.length && a.issues.push(...i.issues), o.issues.length && a.issues.push(...o.issues), Ln(a))
    return a;
  const f = Io(i.value, o.value);
  if (!f.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
  return a.value = f.data, a;
}
const kg = /* @__PURE__ */ U("$ZodRecord", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o, f) => {
    const d = o.value;
    if (!Kn(d))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: d,
        inst: a
      }), o;
    const h = [], m = i.keyType._zod.values;
    if (m) {
      o.value = {};
      const T = /* @__PURE__ */ new Set();
      for (const g of m)
        if (typeof g == "string" || typeof g == "number" || typeof g == "symbol") {
          T.add(typeof g == "number" ? g.toString() : g);
          const R = i.valueType._zod.run({ value: d[g], issues: [] }, f);
          R instanceof Promise ? h.push(R.then((j) => {
            j.issues.length && o.issues.push(...Vn(g, j.issues)), o.value[g] = j.value;
          })) : (R.issues.length && o.issues.push(...Vn(g, R.issues)), o.value[g] = R.value);
        }
      let z;
      for (const g in d)
        T.has(g) || (z = z ?? [], z.push(g));
      z && z.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: d,
        inst: a,
        keys: z
      });
    } else {
      o.value = {};
      for (const T of Reflect.ownKeys(d)) {
        if (T === "__proto__")
          continue;
        const z = i.keyType._zod.run({ value: T, issues: [] }, f);
        if (z instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (z.issues.length) {
          o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: z.issues.map((R) => Hl(R, f, Cl())),
            input: T,
            path: [T],
            inst: a
          }), o.value[z.value] = z.value;
          continue;
        }
        const g = i.valueType._zod.run({ value: d[T], issues: [] }, f);
        g instanceof Promise ? h.push(g.then((R) => {
          R.issues.length && o.issues.push(...Vn(T, R.issues)), o.value[z.value] = R.value;
        })) : (g.issues.length && o.issues.push(...Vn(T, g.issues)), o.value[z.value] = g.value);
      }
    }
    return h.length ? Promise.all(h).then(() => o) : o;
  };
}), Kg = /* @__PURE__ */ U("$ZodEnum", (a, i) => {
  Ce.init(a, i);
  const o = ly(i.entries), f = new Set(o);
  a._zod.values = f, a._zod.pattern = new RegExp(`^(${o.filter((d) => iy.has(typeof d)).map((d) => typeof d == "string" ? _i(d) : d.toString()).join("|")})$`), a._zod.parse = (d, h) => {
    const m = d.value;
    return f.has(m) || d.issues.push({
      code: "invalid_value",
      values: o,
      input: m,
      inst: a
    }), d;
  };
}), Jg = /* @__PURE__ */ U("$ZodTransform", (a, i) => {
  Ce.init(a, i), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      throw new $h(a.constructor.name);
    const d = i.transform(o.value, o);
    if (f.async)
      return (d instanceof Promise ? d : Promise.resolve(d)).then((m) => (o.value = m, o));
    if (d instanceof Promise)
      throw new kn();
    return o.value = d, o;
  };
});
function Dh(a, i) {
  return a.issues.length && i === void 0 ? { issues: [], value: void 0 } : a;
}
const $g = /* @__PURE__ */ U("$ZodOptional", (a, i) => {
  Ce.init(a, i), a._zod.optin = "optional", a._zod.optout = "optional", ze(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), ze(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${af(o.source)})?$`) : void 0;
  }), a._zod.parse = (o, f) => {
    if (i.innerType._zod.optin === "optional") {
      const d = i.innerType._zod.run(o, f);
      return d instanceof Promise ? d.then((h) => Dh(h, o.value)) : Dh(d, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, f);
  };
}), Wg = /* @__PURE__ */ U("$ZodNullable", (a, i) => {
  Ce.init(a, i), ze(a._zod, "optin", () => i.innerType._zod.optin), ze(a._zod, "optout", () => i.innerType._zod.optout), ze(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${af(o.source)}|null)$`) : void 0;
  }), ze(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), a._zod.parse = (o, f) => o.value === null ? o : i.innerType._zod.run(o, f);
}), Fg = /* @__PURE__ */ U("$ZodDefault", (a, i) => {
  Ce.init(a, i), a._zod.optin = "optional", ze(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return i.innerType._zod.run(o, f);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const d = i.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((h) => Uh(h, i)) : Uh(d, i);
  };
});
function Uh(a, i) {
  return a.value === void 0 && (a.value = i.defaultValue), a;
}
const Ig = /* @__PURE__ */ U("$ZodPrefault", (a, i) => {
  Ce.init(a, i), a._zod.optin = "optional", ze(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, f) => (f.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, f));
}), Pg = /* @__PURE__ */ U("$ZodNonOptional", (a, i) => {
  Ce.init(a, i), ze(a._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((f) => f !== void 0)) : void 0;
  }), a._zod.parse = (o, f) => {
    const d = i.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((h) => Zh(h, a)) : Zh(d, a);
  };
});
function Zh(a, i) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: i
  }), a;
}
const ep = /* @__PURE__ */ U("$ZodCatch", (a, i) => {
  Ce.init(a, i), ze(a._zod, "optin", () => i.innerType._zod.optin), ze(a._zod, "optout", () => i.innerType._zod.optout), ze(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return i.innerType._zod.run(o, f);
    const d = i.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((h) => (o.value = h.value, h.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: h.issues.map((m) => Hl(m, f, Cl()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = d.value, d.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: d.issues.map((h) => Hl(h, f, Cl()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), tp = /* @__PURE__ */ U("$ZodPipe", (a, i) => {
  Ce.init(a, i), ze(a._zod, "values", () => i.in._zod.values), ze(a._zod, "optin", () => i.in._zod.optin), ze(a._zod, "optout", () => i.out._zod.optout), ze(a._zod, "propValues", () => i.in._zod.propValues), a._zod.parse = (o, f) => {
    if (f.direction === "backward") {
      const h = i.out._zod.run(o, f);
      return h instanceof Promise ? h.then((m) => di(m, i.in, f)) : di(h, i.in, f);
    }
    const d = i.in._zod.run(o, f);
    return d instanceof Promise ? d.then((h) => di(h, i.out, f)) : di(d, i.out, f);
  };
});
function di(a, i, o) {
  return a.issues.length ? (a.aborted = !0, a) : i._zod.run({ value: a.value, issues: a.issues }, o);
}
const lp = /* @__PURE__ */ U("$ZodReadonly", (a, i) => {
  Ce.init(a, i), ze(a._zod, "propValues", () => i.innerType._zod.propValues), ze(a._zod, "values", () => i.innerType._zod.values), ze(a._zod, "optin", () => i.innerType?._zod?.optin), ze(a._zod, "optout", () => i.innerType?._zod?.optout), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return i.innerType._zod.run(o, f);
    const d = i.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then(jh) : jh(d);
  };
});
function jh(a) {
  return a.value = Object.freeze(a.value), a;
}
const np = /* @__PURE__ */ U("$ZodCustom", (a, i) => {
  st.init(a, i), Ce.init(a, i), a._zod.parse = (o, f) => o, a._zod.check = (o) => {
    const f = o.value, d = i.fn(f);
    if (d instanceof Promise)
      return d.then((h) => Rh(h, o, f, a));
    Rh(d, o, f, a);
  };
});
function Rh(a, i, o, f) {
  if (!a) {
    const d = {
      code: "custom",
      input: o,
      inst: f,
      // incorporates params.error into issue reporting
      path: [...f._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !f._zod.def.abort
      // params: inst._zod.def.params,
    };
    f._zod.def.params && (d.params = f._zod.def.params), i.issues.push(Va(d));
  }
}
var Ch;
class ap {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(i, ...o) {
    const f = o[0];
    if (this._map.set(i, f), f && typeof f == "object" && "id" in f) {
      if (this._idmap.has(f.id))
        throw new Error(`ID ${f.id} already exists in the registry`);
      this._idmap.set(f.id, i);
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
      const f = { ...this.get(o) ?? {} };
      delete f.id;
      const d = { ...f, ...this._map.get(i) };
      return Object.keys(d).length ? d : void 0;
    }
    return this._map.get(i);
  }
  has(i) {
    return this._map.has(i);
  }
}
function up() {
  return new ap();
}
(Ch = globalThis).__zod_globalRegistry ?? (Ch.__zod_globalRegistry = up());
const hi = globalThis.__zod_globalRegistry;
function ip(a, i) {
  return new a({
    type: "string",
    ...X(i)
  });
}
function cp(a, i) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Hh(a, i) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function op(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function fp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...X(i)
  });
}
function rp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...X(i)
  });
}
function sp(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...X(i)
  });
}
function dp(a, i) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function hp(a, i) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function mp(a, i) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function vp(a, i) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function yp(a, i) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function gp(a, i) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function pp(a, i) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function _p(a, i) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function bp(a, i) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Sp(a, i) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function zp(a, i) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Ep(a, i) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Tp(a, i) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Ap(a, i) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function Op(a, i) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...X(i)
  });
}
function xp(a, i) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...X(i)
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
    ...X(i)
  });
}
function Np(a, i) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...X(i)
  });
}
function Dp(a, i) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...X(i)
  });
}
function Up(a, i) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...X(i)
  });
}
function Zp(a, i) {
  return new a({
    type: "number",
    checks: [],
    ...X(i)
  });
}
function jp(a, i) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...X(i)
  });
}
function Rp(a) {
  return new a({
    type: "unknown"
  });
}
function Cp(a, i) {
  return new a({
    type: "never",
    ...X(i)
  });
}
function wh(a, i) {
  return new im({
    check: "less_than",
    ...X(i),
    value: a,
    inclusive: !1
  });
}
function $o(a, i) {
  return new im({
    check: "less_than",
    ...X(i),
    value: a,
    inclusive: !0
  });
}
function Bh(a, i) {
  return new cm({
    check: "greater_than",
    ...X(i),
    value: a,
    inclusive: !1
  });
}
function Wo(a, i) {
  return new cm({
    check: "greater_than",
    ...X(i),
    value: a,
    inclusive: !0
  });
}
function qh(a, i) {
  return new Py({
    check: "multiple_of",
    ...X(i),
    value: a
  });
}
function dm(a, i) {
  return new tg({
    check: "max_length",
    ...X(i),
    maximum: a
  });
}
function gi(a, i) {
  return new lg({
    check: "min_length",
    ...X(i),
    minimum: a
  });
}
function hm(a, i) {
  return new ng({
    check: "length_equals",
    ...X(i),
    length: a
  });
}
function Hp(a, i) {
  return new ag({
    check: "string_format",
    format: "regex",
    ...X(i),
    pattern: a
  });
}
function wp(a) {
  return new ug({
    check: "string_format",
    format: "lowercase",
    ...X(a)
  });
}
function Bp(a) {
  return new ig({
    check: "string_format",
    format: "uppercase",
    ...X(a)
  });
}
function qp(a, i) {
  return new cg({
    check: "string_format",
    format: "includes",
    ...X(i),
    includes: a
  });
}
function Yp(a, i) {
  return new og({
    check: "string_format",
    format: "starts_with",
    ...X(i),
    prefix: a
  });
}
function Gp(a, i) {
  return new fg({
    check: "string_format",
    format: "ends_with",
    ...X(i),
    suffix: a
  });
}
function $n(a) {
  return new rg({
    check: "overwrite",
    tx: a
  });
}
function Xp(a) {
  return $n((i) => i.normalize(a));
}
function Qp() {
  return $n((a) => a.trim());
}
function Lp() {
  return $n((a) => a.toLowerCase());
}
function Vp() {
  return $n((a) => a.toUpperCase());
}
function kp() {
  return $n((a) => ay(a));
}
function Kp(a, i, o) {
  return new a({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...X(o)
  });
}
function Jp(a, i, o) {
  return new a({
    type: "custom",
    check: "custom",
    fn: i,
    ...X(o)
  });
}
function $p(a) {
  const i = Wp((o) => (o.addIssue = (f) => {
    if (typeof f == "string")
      o.issues.push(Va(f, o.value, i._zod.def));
    else {
      const d = f;
      d.fatal && (d.continue = !1), d.code ?? (d.code = "custom"), d.input ?? (d.input = o.value), d.inst ?? (d.inst = i), d.continue ?? (d.continue = !i._zod.def.abort), o.issues.push(Va(d));
    }
  }, a(o.value, o)));
  return i;
}
function Wp(a, i) {
  const o = new st({
    check: "custom",
    ...X(i)
  });
  return o._zod.check = a, o;
}
const Fp = /* @__PURE__ */ U("ZodISODateTime", (a, i) => {
  Tg.init(a, i), Ne.init(a, i);
});
function Ip(a) {
  return Mp(Fp, a);
}
const Pp = /* @__PURE__ */ U("ZodISODate", (a, i) => {
  Ag.init(a, i), Ne.init(a, i);
});
function e1(a) {
  return Np(Pp, a);
}
const t1 = /* @__PURE__ */ U("ZodISOTime", (a, i) => {
  Og.init(a, i), Ne.init(a, i);
});
function l1(a) {
  return Dp(t1, a);
}
const n1 = /* @__PURE__ */ U("ZodISODuration", (a, i) => {
  xg.init(a, i), Ne.init(a, i);
});
function a1(a) {
  return Up(n1, a);
}
const u1 = (a, i) => {
  em.init(a, i), a.name = "ZodError", Object.defineProperties(a, {
    format: {
      value: (o) => gy(a, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => yy(a, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        a.issues.push(o), a.message = JSON.stringify(a.issues, Fo, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        a.issues.push(...o), a.message = JSON.stringify(a.issues, Fo, 2);
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
}, Ct = U("ZodError", u1, {
  Parent: Error
}), i1 = /* @__PURE__ */ cf(Ct), c1 = /* @__PURE__ */ of(Ct), o1 = /* @__PURE__ */ bi(Ct), f1 = /* @__PURE__ */ Si(Ct), r1 = /* @__PURE__ */ by(Ct), s1 = /* @__PURE__ */ Sy(Ct), d1 = /* @__PURE__ */ zy(Ct), h1 = /* @__PURE__ */ Ey(Ct), m1 = /* @__PURE__ */ Ty(Ct), v1 = /* @__PURE__ */ Ay(Ct), y1 = /* @__PURE__ */ Oy(Ct), g1 = /* @__PURE__ */ xy(Ct), Ge = /* @__PURE__ */ U("ZodType", (a, i) => (Ce.init(a, i), a.def = i, a.type = i.type, Object.defineProperty(a, "_def", { value: i }), a.check = (...o) => a.clone(an(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((f) => typeof f == "function" ? { _zod: { check: f, def: { check: "custom" }, onattach: [] } } : f)
  ]
})), a.clone = (o, f) => wl(a, o, f), a.brand = () => a, a.register = ((o, f) => (o.add(a, f), a)), a.parse = (o, f) => i1(a, o, f, { callee: a.parse }), a.safeParse = (o, f) => o1(a, o, f), a.parseAsync = async (o, f) => c1(a, o, f, { callee: a.parseAsync }), a.safeParseAsync = async (o, f) => f1(a, o, f), a.spa = a.safeParseAsync, a.encode = (o, f) => r1(a, o, f), a.decode = (o, f) => s1(a, o, f), a.encodeAsync = async (o, f) => d1(a, o, f), a.decodeAsync = async (o, f) => h1(a, o, f), a.safeEncode = (o, f) => m1(a, o, f), a.safeDecode = (o, f) => v1(a, o, f), a.safeEncodeAsync = async (o, f) => y1(a, o, f), a.safeDecodeAsync = async (o, f) => g1(a, o, f), a.refine = (o, f) => a.check(c2(o, f)), a.superRefine = (o) => a.check(o2(o)), a.overwrite = (o) => a.check($n(o)), a.optional = () => Qh(a), a.nullable = () => Lh(a), a.nullish = () => Qh(Lh(a)), a.nonoptional = (o) => e2(a, o), a.array = () => ka(a), a.or = (o) => Q1([a, o]), a.and = (o) => V1(a, o), a.transform = (o) => Vh(a, J1(o)), a.default = (o) => F1(a, o), a.prefault = (o) => P1(a, o), a.catch = (o) => l2(a, o), a.pipe = (o) => Vh(a, o), a.readonly = () => u2(a), a.describe = (o) => {
  const f = a.clone();
  return hi.add(f, { description: o }), f;
}, Object.defineProperty(a, "description", {
  get() {
    return hi.get(a)?.description;
  },
  configurable: !0
}), a.meta = (...o) => {
  if (o.length === 0)
    return hi.get(a);
  const f = a.clone();
  return hi.add(f, o[0]), f;
}, a.isOptional = () => a.safeParse(void 0).success, a.isNullable = () => a.safeParse(null).success, a)), mm = /* @__PURE__ */ U("_ZodString", (a, i) => {
  ff.init(a, i), Ge.init(a, i);
  const o = a._zod.bag;
  a.format = o.format ?? null, a.minLength = o.minimum ?? null, a.maxLength = o.maximum ?? null, a.regex = (...f) => a.check(Hp(...f)), a.includes = (...f) => a.check(qp(...f)), a.startsWith = (...f) => a.check(Yp(...f)), a.endsWith = (...f) => a.check(Gp(...f)), a.min = (...f) => a.check(gi(...f)), a.max = (...f) => a.check(dm(...f)), a.length = (...f) => a.check(hm(...f)), a.nonempty = (...f) => a.check(gi(1, ...f)), a.lowercase = (f) => a.check(wp(f)), a.uppercase = (f) => a.check(Bp(f)), a.trim = () => a.check(Qp()), a.normalize = (...f) => a.check(Xp(...f)), a.toLowerCase = () => a.check(Lp()), a.toUpperCase = () => a.check(Vp()), a.slugify = () => a.check(kp());
}), p1 = /* @__PURE__ */ U("ZodString", (a, i) => {
  ff.init(a, i), mm.init(a, i), a.email = (o) => a.check(cp(_1, o)), a.url = (o) => a.check(dp(b1, o)), a.jwt = (o) => a.check(xp(C1, o)), a.emoji = (o) => a.check(hp(S1, o)), a.guid = (o) => a.check(Hh(Yh, o)), a.uuid = (o) => a.check(op(mi, o)), a.uuidv4 = (o) => a.check(fp(mi, o)), a.uuidv6 = (o) => a.check(rp(mi, o)), a.uuidv7 = (o) => a.check(sp(mi, o)), a.nanoid = (o) => a.check(mp(z1, o)), a.guid = (o) => a.check(Hh(Yh, o)), a.cuid = (o) => a.check(vp(E1, o)), a.cuid2 = (o) => a.check(yp(T1, o)), a.ulid = (o) => a.check(gp(A1, o)), a.base64 = (o) => a.check(Tp(Z1, o)), a.base64url = (o) => a.check(Ap(j1, o)), a.xid = (o) => a.check(pp(O1, o)), a.ksuid = (o) => a.check(_p(x1, o)), a.ipv4 = (o) => a.check(bp(M1, o)), a.ipv6 = (o) => a.check(Sp(N1, o)), a.cidrv4 = (o) => a.check(zp(D1, o)), a.cidrv6 = (o) => a.check(Ep(U1, o)), a.e164 = (o) => a.check(Op(R1, o)), a.datetime = (o) => a.check(Ip(o)), a.date = (o) => a.check(e1(o)), a.time = (o) => a.check(l1(o)), a.duration = (o) => a.check(a1(o));
});
function Me(a) {
  return ip(p1, a);
}
const Ne = /* @__PURE__ */ U("ZodStringFormat", (a, i) => {
  xe.init(a, i), mm.init(a, i);
}), _1 = /* @__PURE__ */ U("ZodEmail", (a, i) => {
  vg.init(a, i), Ne.init(a, i);
}), Yh = /* @__PURE__ */ U("ZodGUID", (a, i) => {
  hg.init(a, i), Ne.init(a, i);
}), mi = /* @__PURE__ */ U("ZodUUID", (a, i) => {
  mg.init(a, i), Ne.init(a, i);
}), b1 = /* @__PURE__ */ U("ZodURL", (a, i) => {
  yg.init(a, i), Ne.init(a, i);
}), S1 = /* @__PURE__ */ U("ZodEmoji", (a, i) => {
  gg.init(a, i), Ne.init(a, i);
}), z1 = /* @__PURE__ */ U("ZodNanoID", (a, i) => {
  pg.init(a, i), Ne.init(a, i);
}), E1 = /* @__PURE__ */ U("ZodCUID", (a, i) => {
  _g.init(a, i), Ne.init(a, i);
}), T1 = /* @__PURE__ */ U("ZodCUID2", (a, i) => {
  bg.init(a, i), Ne.init(a, i);
}), A1 = /* @__PURE__ */ U("ZodULID", (a, i) => {
  Sg.init(a, i), Ne.init(a, i);
}), O1 = /* @__PURE__ */ U("ZodXID", (a, i) => {
  zg.init(a, i), Ne.init(a, i);
}), x1 = /* @__PURE__ */ U("ZodKSUID", (a, i) => {
  Eg.init(a, i), Ne.init(a, i);
}), M1 = /* @__PURE__ */ U("ZodIPv4", (a, i) => {
  Mg.init(a, i), Ne.init(a, i);
}), N1 = /* @__PURE__ */ U("ZodIPv6", (a, i) => {
  Ng.init(a, i), Ne.init(a, i);
}), D1 = /* @__PURE__ */ U("ZodCIDRv4", (a, i) => {
  Dg.init(a, i), Ne.init(a, i);
}), U1 = /* @__PURE__ */ U("ZodCIDRv6", (a, i) => {
  Ug.init(a, i), Ne.init(a, i);
}), Z1 = /* @__PURE__ */ U("ZodBase64", (a, i) => {
  Zg.init(a, i), Ne.init(a, i);
}), j1 = /* @__PURE__ */ U("ZodBase64URL", (a, i) => {
  Rg.init(a, i), Ne.init(a, i);
}), R1 = /* @__PURE__ */ U("ZodE164", (a, i) => {
  Cg.init(a, i), Ne.init(a, i);
}), C1 = /* @__PURE__ */ U("ZodJWT", (a, i) => {
  wg.init(a, i), Ne.init(a, i);
}), vm = /* @__PURE__ */ U("ZodNumber", (a, i) => {
  fm.init(a, i), Ge.init(a, i), a.gt = (f, d) => a.check(Bh(f, d)), a.gte = (f, d) => a.check(Wo(f, d)), a.min = (f, d) => a.check(Wo(f, d)), a.lt = (f, d) => a.check(wh(f, d)), a.lte = (f, d) => a.check($o(f, d)), a.max = (f, d) => a.check($o(f, d)), a.int = (f) => a.check(Xh(f)), a.safe = (f) => a.check(Xh(f)), a.positive = (f) => a.check(Bh(0, f)), a.nonnegative = (f) => a.check(Wo(0, f)), a.negative = (f) => a.check(wh(0, f)), a.nonpositive = (f) => a.check($o(0, f)), a.multipleOf = (f, d) => a.check(qh(f, d)), a.step = (f, d) => a.check(qh(f, d)), a.finite = () => a;
  const o = a._zod.bag;
  a.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, a.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, a.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), a.isFinite = !0, a.format = o.format ?? null;
});
function Gh(a) {
  return Zp(vm, a);
}
const H1 = /* @__PURE__ */ U("ZodNumberFormat", (a, i) => {
  Bg.init(a, i), vm.init(a, i);
});
function Xh(a) {
  return jp(H1, a);
}
const w1 = /* @__PURE__ */ U("ZodUnknown", (a, i) => {
  qg.init(a, i), Ge.init(a, i);
});
function pi() {
  return Rp(w1);
}
const B1 = /* @__PURE__ */ U("ZodNever", (a, i) => {
  Yg.init(a, i), Ge.init(a, i);
});
function q1(a) {
  return Cp(B1, a);
}
const Y1 = /* @__PURE__ */ U("ZodArray", (a, i) => {
  Gg.init(a, i), Ge.init(a, i), a.element = i.element, a.min = (o, f) => a.check(gi(o, f)), a.nonempty = (o) => a.check(gi(1, o)), a.max = (o, f) => a.check(dm(o, f)), a.length = (o, f) => a.check(hm(o, f)), a.unwrap = () => a.element;
});
function ka(a, i) {
  return Kp(Y1, a, i);
}
const G1 = /* @__PURE__ */ U("ZodObject", (a, i) => {
  Qg.init(a, i), Ge.init(a, i), ze(a, "shape", () => i.shape), a.keyof = () => Jn(Object.keys(a._zod.def.shape)), a.catchall = (o) => a.clone({ ...a._zod.def, catchall: o }), a.passthrough = () => a.clone({ ...a._zod.def, catchall: pi() }), a.loose = () => a.clone({ ...a._zod.def, catchall: pi() }), a.strict = () => a.clone({ ...a._zod.def, catchall: q1() }), a.strip = () => a.clone({ ...a._zod.def, catchall: void 0 }), a.extend = (o) => sy(a, o), a.safeExtend = (o) => dy(a, o), a.merge = (o) => hy(a, o), a.pick = (o) => fy(a, o), a.omit = (o) => ry(a, o), a.partial = (...o) => my(gm, a, o[0]), a.required = (...o) => vy(pm, a, o[0]);
});
function Ei(a, i) {
  const o = {
    type: "object",
    shape: a ?? {},
    ...X(i)
  };
  return new G1(o);
}
const X1 = /* @__PURE__ */ U("ZodUnion", (a, i) => {
  Lg.init(a, i), Ge.init(a, i), a.options = i.options;
});
function Q1(a, i) {
  return new X1({
    type: "union",
    options: a,
    ...X(i)
  });
}
const L1 = /* @__PURE__ */ U("ZodIntersection", (a, i) => {
  Vg.init(a, i), Ge.init(a, i);
});
function V1(a, i) {
  return new L1({
    type: "intersection",
    left: a,
    right: i
  });
}
const k1 = /* @__PURE__ */ U("ZodRecord", (a, i) => {
  kg.init(a, i), Ge.init(a, i), a.keyType = i.keyType, a.valueType = i.valueType;
});
function ym(a, i, o) {
  return new k1({
    type: "record",
    keyType: a,
    valueType: i,
    ...X(o)
  });
}
const Po = /* @__PURE__ */ U("ZodEnum", (a, i) => {
  Kg.init(a, i), Ge.init(a, i), a.enum = i.entries, a.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  a.extract = (f, d) => {
    const h = {};
    for (const m of f)
      if (o.has(m))
        h[m] = i.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Po({
      ...i,
      checks: [],
      ...X(d),
      entries: h
    });
  }, a.exclude = (f, d) => {
    const h = { ...i.entries };
    for (const m of f)
      if (o.has(m))
        delete h[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Po({
      ...i,
      checks: [],
      ...X(d),
      entries: h
    });
  };
});
function Jn(a, i) {
  const o = Array.isArray(a) ? Object.fromEntries(a.map((f) => [f, f])) : a;
  return new Po({
    type: "enum",
    entries: o,
    ...X(i)
  });
}
const K1 = /* @__PURE__ */ U("ZodTransform", (a, i) => {
  Jg.init(a, i), Ge.init(a, i), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      throw new $h(a.constructor.name);
    o.addIssue = (h) => {
      if (typeof h == "string")
        o.issues.push(Va(h, o.value, i));
      else {
        const m = h;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), m.input ?? (m.input = o.value), m.inst ?? (m.inst = a), o.issues.push(Va(m));
      }
    };
    const d = i.transform(o.value, o);
    return d instanceof Promise ? d.then((h) => (o.value = h, o)) : (o.value = d, o);
  };
});
function J1(a) {
  return new K1({
    type: "transform",
    transform: a
  });
}
const gm = /* @__PURE__ */ U("ZodOptional", (a, i) => {
  $g.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function Qh(a) {
  return new gm({
    type: "optional",
    innerType: a
  });
}
const $1 = /* @__PURE__ */ U("ZodNullable", (a, i) => {
  Wg.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function Lh(a) {
  return new $1({
    type: "nullable",
    innerType: a
  });
}
const W1 = /* @__PURE__ */ U("ZodDefault", (a, i) => {
  Fg.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function F1(a, i) {
  return new W1({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : Ih(i);
    }
  });
}
const I1 = /* @__PURE__ */ U("ZodPrefault", (a, i) => {
  Ig.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function P1(a, i) {
  return new I1({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : Ih(i);
    }
  });
}
const pm = /* @__PURE__ */ U("ZodNonOptional", (a, i) => {
  Pg.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function e2(a, i) {
  return new pm({
    type: "nonoptional",
    innerType: a,
    ...X(i)
  });
}
const t2 = /* @__PURE__ */ U("ZodCatch", (a, i) => {
  ep.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function l2(a, i) {
  return new t2({
    type: "catch",
    innerType: a,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const n2 = /* @__PURE__ */ U("ZodPipe", (a, i) => {
  tp.init(a, i), Ge.init(a, i), a.in = i.in, a.out = i.out;
});
function Vh(a, i) {
  return new n2({
    type: "pipe",
    in: a,
    out: i
    // ...util.normalizeParams(params),
  });
}
const a2 = /* @__PURE__ */ U("ZodReadonly", (a, i) => {
  lp.init(a, i), Ge.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function u2(a) {
  return new a2({
    type: "readonly",
    innerType: a
  });
}
const i2 = /* @__PURE__ */ U("ZodCustom", (a, i) => {
  np.init(a, i), Ge.init(a, i);
});
function c2(a, i = {}) {
  return Jp(i2, a, i);
}
function o2(a) {
  return $p(a);
}
class f2 {
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
    const f = Date.now();
    if (this.config.onRequest)
      try {
        this.config.onRequest(i);
      } catch (m) {
        console.warn("onRequest hook error:", m);
      }
    const h = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${i}`;
    try {
      const m = new AbortController(), T = setTimeout(() => m.abort(), this.config.timeout), z = await fetch(h, {
        headers: { ...this.baseHeaders, ...o.headers },
        signal: m.signal,
        ...o
      });
      clearTimeout(T);
      let g;
      const R = z.headers.get("content-type");
      if (R && R.includes("application/json") ? g = await z.json() : g = await z.text(), !z.ok) {
        const j = {
          message: g?.error || `HTTP ${z.status}: ${z.statusText}`,
          statusCode: z.status,
          code: "API_ERROR"
        };
        if (this.config.onError)
          try {
            this.config.onError(j);
          } catch (B) {
            console.warn("onError hook error:", B);
          }
        return { error: j.message };
      }
      if (this.config.onResponse)
        try {
          const j = Date.now() - f;
          this.config.onResponse(i, j);
        } catch (j) {
          console.warn("onResponse hook error:", j);
        }
      return { data: g };
    } catch (m) {
      if (m instanceof Error && m.name === "AbortError") {
        const z = {
          message: "Request timeout",
          code: "TIMEOUT_ERROR",
          statusCode: 408
        };
        if (this.config.onError)
          try {
            this.config.onError(z);
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
        } catch (z) {
          console.warn("onError hook error:", z);
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
    Object.entries(i).forEach(([h, m]) => {
      m != null && (Array.isArray(m) ? o.append(h, m.join(",")) : o.append(h, String(m)));
    });
    const f = o.toString(), d = f ? `/memory?${f}` : "/memory";
    return this.request(d);
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
    const { apiKey: i, authToken: o, ...f } = this.config;
    return f;
  }
}
function r2(a) {
  return new f2(a);
}
const rf = ["context", "project", "knowledge", "reference", "personal", "workflow"], _m = ["active", "archived", "draft", "deleted"];
Ei({
  title: Me().min(1).max(500),
  content: Me().min(1).max(5e4),
  summary: Me().max(1e3).optional(),
  memory_type: Jn(rf).default("context"),
  topic_id: Me().uuid().optional(),
  project_ref: Me().max(100).optional(),
  tags: ka(Me().min(1).max(50)).max(20).default([]),
  metadata: ym(Me(), pi()).optional()
});
Ei({
  title: Me().min(1).max(500).optional(),
  content: Me().min(1).max(5e4).optional(),
  summary: Me().max(1e3).optional(),
  memory_type: Jn(rf).optional(),
  status: Jn(_m).optional(),
  topic_id: Me().uuid().nullable().optional(),
  project_ref: Me().max(100).nullable().optional(),
  tags: ka(Me().min(1).max(50)).max(20).optional(),
  metadata: ym(Me(), pi()).optional()
});
Ei({
  query: Me().min(1).max(1e3),
  memory_types: ka(Jn(rf)).optional(),
  tags: ka(Me()).optional(),
  topic_id: Me().uuid().optional(),
  project_ref: Me().optional(),
  status: Jn(_m).default("active"),
  limit: Gh().int().min(1).max(100).default(20),
  threshold: Gh().min(0).max(1).default(0.7)
});
Ei({
  name: Me().min(1).max(100),
  description: Me().max(500).optional(),
  color: Me().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: Me().max(50).optional(),
  parent_topic_id: Me().uuid().optional()
});
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const bm = ae.createContext(null);
function s2({ children: a, config: i, apiKey: o, apiUrl: f = "https://api.lanonasis.com", client: d }) {
  const h = ae.useMemo(() => d || r2({
    apiUrl: f,
    apiKey: o,
    ...i
  }), [d, f, o, i]);
  return ae.createElement(bm.Provider, { value: h }, a);
}
function sf() {
  const a = ae.useContext(bm);
  if (!a)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return a;
}
function d2(a) {
  const i = sf(), [o, f] = ae.useState([]), [d, h] = ae.useState(!0), [m, T] = ae.useState(null), z = ae.useCallback(async () => {
    h(!0), T(null);
    const g = await i.listMemories(a);
    g.error ? (T({
      message: g.error,
      code: "API_ERROR"
    }), f([])) : g.data && f(g.data.data), h(!1);
  }, [i, JSON.stringify(a)]);
  return ae.useEffect(() => {
    z();
  }, [z]), {
    memories: o,
    loading: d,
    error: m,
    refresh: z
  };
}
function h2() {
  const a = sf(), [i, o] = ae.useState(!1), [f, d] = ae.useState(null);
  return {
    createMemory: ae.useCallback(async (m) => {
      o(!0), d(null);
      const T = await a.createMemory(m);
      return T.error ? (d({
        message: T.error,
        code: "API_ERROR"
      }), o(!1), null) : (o(!1), T.data || null);
    }, [a]),
    loading: i,
    error: f
  };
}
function m2(a = 300) {
  const i = sf(), [o, f] = ae.useState([]), [d, h] = ae.useState(!1), [m, T] = ae.useState(null), [z, g] = ae.useState(0), [R, j] = ae.useState(0), B = ae.useRef(null), W = ae.useCallback(async (F, Ee) => {
    B.current && clearTimeout(B.current), B.current = setTimeout(async () => {
      h(!0), T(null);
      const te = await i.searchMemories({
        query: F,
        ...Ee
      });
      te.error ? (T({
        message: te.error,
        code: "API_ERROR"
      }), f([]), g(0), j(0)) : te.data && (f(te.data.results), g(te.data.total_results), j(te.data.search_time_ms)), h(!1);
    }, a);
  }, [i, a]);
  return ae.useEffect(() => () => {
    B.current && clearTimeout(B.current);
  }, []), {
    results: o,
    loading: d,
    error: m,
    search: W,
    totalResults: z,
    searchTime: R
  };
}
const Et = tf.forwardRef(
  ({
    className: a = "",
    variant: i = "default",
    size: o = "default",
    children: f,
    ...d
  }, h) => {
    const m = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", T = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, z = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ M.jsx(
      "button",
      {
        ref: h,
        className: `${m} ${T[i]} ${z[o]} ${a}`,
        ...d,
        children: f
      }
    );
  }
);
Et.displayName = "Button";
const df = tf.forwardRef(
  ({ className: a = "", type: i = "text", ...o }, f) => /* @__PURE__ */ M.jsx(
    "input",
    {
      ref: f,
      type: i,
      className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${a}`,
      ...o
    }
  )
);
df.displayName = "Input";
const Sm = ({
  className: a = "",
  size: i = 24
}) => /* @__PURE__ */ M.jsx(
  "svg",
  {
    width: i,
    height: i,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: a,
    children: /* @__PURE__ */ M.jsx(
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
), Rt = {
  search: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ M.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  ),
  plus: /* @__PURE__ */ M.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ M.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  ),
  refresh: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
        /* @__PURE__ */ M.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
      ]
    }
  ),
  settings: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ M.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
      ]
    }
  ),
  logout: /* @__PURE__ */ M.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ M.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
    }
  ),
  chevronRight: /* @__PURE__ */ M.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ M.jsx("polyline", { points: "9,18 15,12 9,6" })
    }
  ),
  globe: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ M.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ M.jsx("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
      ]
    }
  ),
  lightbulb: /* @__PURE__ */ M.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ M.jsx("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
    }
  ),
  file: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
        /* @__PURE__ */ M.jsx("polyline", { points: "14,2 14,8 20,8" })
      ]
    }
  ),
  send: /* @__PURE__ */ M.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ M.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        /* @__PURE__ */ M.jsx("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })
      ]
    }
  ),
  paperclip: /* @__PURE__ */ M.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ M.jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
    }
  )
}, v2 = ({
  onLoginOAuth: a,
  onLoginApiKey: i,
  isLoading: o = !1,
  error: f = null
}) => {
  const [d, h] = ae.useState(!1), [m, T] = ae.useState(""), z = () => {
    m.trim() && i && i(m.trim());
  };
  return /* @__PURE__ */ M.jsxs("div", { className: "p-4 space-y-6 select-none", children: [
    /* @__PURE__ */ M.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ M.jsxs("div", { className: "flex items-center gap-2 text-[var(--vscode-sideBarTitle-foreground)]", children: [
        /* @__PURE__ */ M.jsx(Sm, { className: "h-5 w-5", size: 20 }),
        /* @__PURE__ */ M.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ M.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Welcome to L0 Memory" }),
      /* @__PURE__ */ M.jsx("p", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "Authenticate to access synchronized context and intelligent memory." }),
      f && /* @__PURE__ */ M.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: f }),
      d ? /* @__PURE__ */ M.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ M.jsx(
          df,
          {
            type: "password",
            placeholder: "Enter your API key (lano_... or lns_...)",
            value: m,
            onChange: (g) => T(g.target.value),
            className: "h-8 text-[13px]",
            autoFocus: !0,
            onKeyDown: (g) => g.key === "Enter" && z()
          }
        ),
        /* @__PURE__ */ M.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ M.jsx(
            Et,
            {
              className: "flex-1",
              onClick: z,
              disabled: !m.trim() || o,
              children: o ? "Connecting..." : "Connect"
            }
          ),
          /* @__PURE__ */ M.jsx(
            Et,
            {
              variant: "secondary",
              onClick: () => {
                h(!1), T("");
              },
              children: "Cancel"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ M.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ M.jsx(
          Et,
          {
            className: "w-full",
            onClick: a,
            disabled: o,
            children: o ? "Connecting..." : "Connect in Browser"
          }
        ),
        /* @__PURE__ */ M.jsx(
          Et,
          {
            className: "w-full",
            variant: "secondary",
            onClick: () => h(!0),
            disabled: o,
            children: "Enter API Key"
          }
        ),
        /* @__PURE__ */ M.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] text-center opacity-70", children: 'Or use Command Palette: "LanOnasis: Authenticate"' })
      ] })
    ] }),
    /* @__PURE__ */ M.jsx("div", { className: "h-px bg-[var(--vscode-panel-border)] w-full" }),
    /* @__PURE__ */ M.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ M.jsx("h3", { className: "text-[11px] font-bold text-[var(--vscode-editor-foreground)] uppercase opacity-80", children: "Features" }),
      /* @__PURE__ */ M.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ M.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ M.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: Rt.lightbulb }),
          /* @__PURE__ */ M.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ M.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Intelligent Memory" }),
            /* @__PURE__ */ M.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Vector search and semantic understanding for your codebase." })
          ] })
        ] }),
        /* @__PURE__ */ M.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ M.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: Rt.globe }),
          /* @__PURE__ */ M.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ M.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Real-time Sync" }),
            /* @__PURE__ */ M.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Synchronized context across all your devices." })
          ] })
        ] })
      ] })
    ] })
  ] });
}, y2 = ({ memory: a, onClick: i }) => {
  const o = (f) => {
    if (!f) return "—";
    try {
      return new Date(f).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } catch {
      return "—";
    }
  };
  return /* @__PURE__ */ M.jsxs(
    "div",
    {
      className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
      onClick: i,
      children: [
        /* @__PURE__ */ M.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ M.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ M.jsx("span", { className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0", children: Rt.file }),
          /* @__PURE__ */ M.jsx("h3", { className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1", children: a.title })
        ] }) }),
        /* @__PURE__ */ M.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5", children: [
          /* @__PURE__ */ M.jsx("span", { className: "opacity-60", children: o(a.created_at) }),
          /* @__PURE__ */ M.jsx("span", { className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60", children: a.memory_type }),
          a.tags?.slice(0, 2).map((f) => /* @__PURE__ */ M.jsxs(
            "span",
            {
              className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
              children: [
                "#",
                f
              ]
            },
            f
          ))
        ] })
      ]
    }
  );
}, kh = ({
  title: a,
  isOpen: i,
  onToggle: o,
  actions: f
}) => /* @__PURE__ */ M.jsxs(
  "div",
  {
    className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
    onClick: o,
    children: [
      /* @__PURE__ */ M.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ M.jsx(
          "span",
          {
            className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${i ? "rotate-90" : ""}`,
            children: Rt.chevronRight
          }
        ),
        /* @__PURE__ */ M.jsx("span", { className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase", children: a })
      ] }),
      f && /* @__PURE__ */ M.jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: f })
    ]
  }
), g2 = ({
  initialChatInput: a = "",
  onAttachFromClipboard: i,
  isAuthenticated: o = !1,
  onLoginOAuth: f,
  onLoginApiKey: d,
  onLogout: h,
  authLoading: m = !1,
  authError: T = null,
  userEmail: z = null
}) => {
  const { memories: g, loading: R, refresh: j } = d2(), { createMemory: B, loading: W } = h2(), {
    search: F,
    results: Ee,
    loading: te
  } = m2(), [oe, et] = ae.useState(""), [fe, me] = ae.useState(a), [He, We] = ae.useState(!0), [$, Fe] = ae.useState(!0), [nt, Vt] = ae.useState(!1);
  ae.useEffect(() => {
    a !== void 0 && me(a);
  }, [a]), ae.useEffect(() => {
    oe.length > 2 && F(oe);
  }, [oe, F]);
  const dt = oe.length > 2 ? Ee : g, Ie = async () => {
    const ve = fe.trim();
    if (ve)
      try {
        const O = {
          title: ve.slice(0, 50) + (ve.length > 50 ? "..." : ""),
          content: ve,
          memory_type: "knowledge",
          tags: []
        };
        await B(O), me(""), await j();
      } catch (O) {
        console.error("Failed to create memory:", O);
      }
  }, Yt = async () => {
    Vt(!0);
    try {
      await j();
    } finally {
      Vt(!1);
    }
  }, Ht = async () => {
    const ve = fe.trim();
    if (ve)
      try {
        const O = {
          title: ve.slice(0, 50) + (ve.length > 50 ? "..." : ""),
          content: ve,
          memory_type: "context",
          tags: []
        };
        await B(O), me(""), await j();
      } catch (O) {
        console.error("Failed to create memory from chat:", O);
      }
  };
  return /* @__PURE__ */ M.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ M.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    /* @__PURE__ */ M.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ M.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ M.jsx(
          Sm,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ M.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ M.jsx("div", { className: "flex items-center gap-1", children: o ? /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
        z && /* @__PURE__ */ M.jsx(
          "span",
          {
            className: "text-[10px] text-[var(--vscode-descriptionForeground)] mr-2 max-w-[100px] truncate",
            title: z,
            children: z
          }
        ),
        /* @__PURE__ */ M.jsx(Et, { variant: "ghost", size: "icon", title: "Settings", children: Rt.settings }),
        /* @__PURE__ */ M.jsx(
          Et,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: h,
            children: Rt.logout
          }
        )
      ] }) : /* @__PURE__ */ M.jsx(
        "div",
        {
          className: "h-1.5 w-1.5 rounded-full bg-yellow-500",
          title: "Not connected"
        }
      ) })
    ] }),
    /* @__PURE__ */ M.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ M.jsx(
        kh,
        {
          title: "Memory Assistant",
          isOpen: He,
          onToggle: () => We(!He)
        }
      ),
      He && /* @__PURE__ */ M.jsx("div", { className: "min-h-[80px] p-4 text-[13px] text-[var(--vscode-descriptionForeground)] flex items-center justify-center text-center italic opacity-80", children: o ? "Ready to assist. Ask me to recall context or refine prompts." : "Please connect to enable AI assistance." }),
      /* @__PURE__ */ M.jsx(
        kh,
        {
          title: "Memories",
          isOpen: $,
          onToggle: () => Fe(!$),
          actions: o && /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
            /* @__PURE__ */ M.jsx(Et, { variant: "ghost", size: "icon", children: Rt.search }),
            /* @__PURE__ */ M.jsx(Et, { variant: "ghost", size: "icon", onClick: Yt, children: Rt.refresh })
          ] })
        }
      ),
      $ && /* @__PURE__ */ M.jsx("div", { className: "flex-1", children: o ? /* @__PURE__ */ M.jsxs("div", { className: "p-2 space-y-2", children: [
        /* @__PURE__ */ M.jsx(
          df,
          {
            placeholder: "Search memories...",
            value: oe,
            onChange: (ve) => et(ve.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ M.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ M.jsxs(
            Et,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: Ie,
              disabled: W || R,
              children: [
                Rt.plus,
                "Create"
              ]
            }
          ),
          /* @__PURE__ */ M.jsxs(
            Et,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: Yt,
              disabled: nt || R,
              children: [
                /* @__PURE__ */ M.jsx("span", { className: nt ? "animate-spin" : "", children: Rt.refresh }),
                nt ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ M.jsx("div", { className: "space-y-0.5", children: R || te ? /* @__PURE__ */ M.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : dt.length === 0 ? /* @__PURE__ */ M.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: oe ? "No memories found" : "No memories yet. Create one!" }) : dt.map((ve) => /* @__PURE__ */ M.jsx(y2, { memory: ve }, ve.id)) })
      ] }) : /* @__PURE__ */ M.jsx(
        v2,
        {
          onLoginOAuth: f,
          onLoginApiKey: d,
          isLoading: m,
          error: T
        }
      ) })
    ] }),
    /* @__PURE__ */ M.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ M.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ M.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ M.jsx(
        "textarea",
        {
          value: fe,
          onChange: (ve) => me(ve.target.value),
          placeholder: o ? "Refine context..." : "Connect to chat",
          disabled: !o,
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
        }
      ) }),
      /* @__PURE__ */ M.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ M.jsx(
        Et,
        {
          size: "icon",
          variant: "ghost",
          className: "h-6 w-6",
          disabled: !o,
          onClick: i,
          title: "Attach from clipboard",
          children: Rt.paperclip
        }
      ) }),
      /* @__PURE__ */ M.jsx("div", { className: "absolute right-2 bottom-1.5", children: /* @__PURE__ */ M.jsx(
        Et,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !o || !fe.trim(),
          onClick: Ht,
          title: "Send",
          children: Rt.send
        }
      ) })
    ] }) })
  ] }) });
};
typeof window < "u" && typeof window.acquireVsCodeApi == "function" && (window.vscode = window.acquireVsCodeApi());
const Kh = document.getElementById("root");
function p2() {
  const [a, i] = ae.useState(""), [o, f] = ae.useState(void 0), [d, h] = ae.useState("https://api.lanonasis.com"), [m, T] = ae.useState(!1), [z, g] = ae.useState(null);
  ae.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const F = (Ee) => {
      const te = Ee.data;
      if (!(!te || typeof te != "object")) {
        if (te.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if (te.type === "lanonasis:config:init" || te.type === "lanonasis:config:update") {
          const oe = te.payload?.apiUrl, et = te.payload?.apiKey;
          oe && h(oe), et !== void 0 && (f(et || void 0), T(!1), g(null), console.log("[Webview] API key received from host"));
          return;
        }
        if (te.type === "lanonasis:auth:result") {
          T(!1), te.payload?.success ? g(null) : g(te.payload?.error || "Authentication failed");
          return;
        }
        if (te.type === "lanonasis:memory:createFromSelection") {
          const oe = te.payload?.text ?? "";
          oe && i(oe);
          return;
        }
        if (te.type === "lanonasis:clipboard:read:result") {
          const oe = te.payload?.text ?? "";
          oe && i(oe);
          return;
        }
      }
    };
    return window.addEventListener("message", F), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", F);
    };
  }, []);
  const R = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, j = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (T(!0), g(null), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, B = (F) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (T(!0), g(null), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: F }
    }));
  }, W = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), f(void 0), g(null), T(!1));
  };
  return /* @__PURE__ */ M.jsx(s2, { apiKey: o, apiUrl: d, children: /* @__PURE__ */ M.jsx(
    g2,
    {
      initialChatInput: a,
      onAttachFromClipboard: R,
      isAuthenticated: !!o,
      onLoginOAuth: j,
      onLoginApiKey: B,
      onLogout: W,
      authLoading: m,
      authError: z
    }
  ) });
}
Kh && ty.createRoot(Kh).render(
  /* @__PURE__ */ M.jsx(tf.StrictMode, { children: /* @__PURE__ */ M.jsx(p2, {}) })
);
