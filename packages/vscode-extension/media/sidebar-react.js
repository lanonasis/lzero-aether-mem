function y0(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Jf = { exports: {} }, zu = {};
var Zm;
function Cg() {
  if (Zm) return zu;
  Zm = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(f, d, m) {
    var v = null;
    if (m !== void 0 && (v = "" + m), d.key !== void 0 && (v = "" + d.key), "key" in d) {
      m = {};
      for (var A in d)
        A !== "key" && (m[A] = d[A]);
    } else m = d;
    return d = m.ref, {
      $$typeof: a,
      type: f,
      key: v,
      ref: d !== void 0 ? d : null,
      props: m
    };
  }
  return zu.Fragment = c, zu.jsx = o, zu.jsxs = o, zu;
}
var $f = { exports: {} }, F = {};
var Hm;
function Dg() {
  if (Hm) return F;
  Hm = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), c = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), f = /* @__PURE__ */ Symbol.for("react.strict_mode"), d = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), v = /* @__PURE__ */ Symbol.for("react.context"), A = /* @__PURE__ */ Symbol.for("react.forward_ref"), D = /* @__PURE__ */ Symbol.for("react.suspense"), O = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), w = /* @__PURE__ */ Symbol.for("react.activity"), B = /* @__PURE__ */ Symbol.for("react.view_transition"), ee = Symbol.iterator;
  function $(g) {
    return g === null || typeof g != "object" ? null : (g = ee && g[ee] || g["@@iterator"], typeof g == "function" ? g : null);
  }
  var ve = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, le = Object.assign, ze = {};
  function Je(g, M, Y) {
    this.props = g, this.context = M, this.refs = ze, this.updater = Y || ve;
  }
  Je.prototype.isReactComponent = {}, Je.prototype.setState = function(g, M) {
    if (typeof g != "object" && typeof g != "function" && g != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, g, M, "setState");
  }, Je.prototype.forceUpdate = function(g) {
    this.updater.enqueueForceUpdate(this, g, "forceUpdate");
  };
  function je() {
  }
  je.prototype = Je.prototype;
  function ye(g, M, Y) {
    this.props = g, this.context = M, this.refs = ze, this.updater = Y || ve;
  }
  var He = ye.prototype = new je();
  He.constructor = ye, le(He, Je.prototype), He.isPureReactComponent = !0;
  var te = Array.isArray;
  function ot() {
  }
  var ce = { H: null, A: null, T: null, S: null }, at = Object.prototype.hasOwnProperty;
  function ut(g, M, Y) {
    var R = Y.ref;
    return {
      $$typeof: a,
      type: g,
      key: M,
      ref: R !== void 0 ? R : null,
      props: Y
    };
  }
  function wt(g, M) {
    return ut(g.type, M, g.props);
  }
  function Me(g) {
    return typeof g == "object" && g !== null && g.$$typeof === a;
  }
  function $t(g) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + g.replace(/[=:]/g, function(Y) {
      return M[Y];
    });
  }
  var $e = /\/+/g;
  function ht(g, M) {
    return typeof g == "object" && g !== null && g.key != null ? $t("" + g.key) : M.toString(36);
  }
  function Z(g) {
    switch (g.status) {
      case "fulfilled":
        return g.value;
      case "rejected":
        throw g.reason;
      default:
        switch (typeof g.status == "string" ? g.then(ot, ot) : (g.status = "pending", g.then(
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
  function X(g, M, Y, R, J) {
    var j = typeof g;
    (j === "undefined" || j === "boolean") && (g = null);
    var H = !1;
    if (g === null) H = !0;
    else
      switch (j) {
        case "bigint":
        case "string":
        case "number":
          H = !0;
          break;
        case "object":
          switch (g.$$typeof) {
            case a:
            case c:
              H = !0;
              break;
            case N:
              return H = g._init, X(
                H(g._payload),
                M,
                Y,
                R,
                J
              );
          }
      }
    if (H)
      return J = J(g), H = R === "" ? "." + ht(g, 0) : R, te(J) ? (Y = "", H != null && (Y = H.replace($e, "$&/") + "/"), X(J, M, Y, "", function(Rt) {
        return Rt;
      })) : J != null && (Me(J) && (J = wt(
        J,
        Y + (J.key == null || g && g.key === J.key ? "" : ("" + J.key).replace(
          $e,
          "$&/"
        ) + "/") + H
      )), M.push(J)), 1;
    H = 0;
    var be = R === "" ? "." : R + ":";
    if (te(g))
      for (var Ye = 0; Ye < g.length; Ye++)
        R = g[Ye], j = be + ht(R, Ye), H += X(
          R,
          M,
          Y,
          j,
          J
        );
    else if (Ye = $(g), typeof Ye == "function")
      for (g = Ye.call(g), Ye = 0; !(R = g.next()).done; )
        R = R.value, j = be + ht(R, Ye++), H += X(
          R,
          M,
          Y,
          j,
          J
        );
    else if (j === "object") {
      if (typeof g.then == "function")
        return X(
          Z(g),
          M,
          Y,
          R,
          J
        );
      throw M = String(g), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(g).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return H;
  }
  function K(g, M, Y) {
    if (g == null) return g;
    var R = [], J = 0;
    return X(g, R, "", "", function(j) {
      return M.call(Y, j, J++);
    }), R;
  }
  function ne(g) {
    if (g._status === -1) {
      var M = g._result;
      M = M(), M.then(
        function(Y) {
          (g._status === 0 || g._status === -1) && (g._status = 1, g._result = Y);
        },
        function(Y) {
          (g._status === 0 || g._status === -1) && (g._status = 2, g._result = Y);
        }
      ), g._status === -1 && (g._status = 0, g._result = M);
    }
    if (g._status === 1) return g._result.default;
    throw g._result;
  }
  var ge = typeof reportError == "function" ? reportError : function(g) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof g == "object" && g !== null && typeof g.message == "string" ? String(g.message) : String(g),
        error: g
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", g);
      return;
    }
    console.error(g);
  };
  function kt(g) {
    var M = ce.T, Y = {};
    Y.types = M !== null ? M.types : null, ce.T = Y;
    try {
      var R = g(), J = ce.S;
      J !== null && J(Y, R), typeof R == "object" && R !== null && typeof R.then == "function" && R.then(ot, ge);
    } catch (j) {
      ge(j);
    } finally {
      M !== null && Y.types !== null && (M.types = Y.types), ce.T = M;
    }
  }
  function St(g) {
    var M = ce.T;
    if (M !== null) {
      var Y = M.types;
      Y === null ? M.types = [g] : Y.indexOf(g) === -1 && Y.push(g);
    } else kt(St.bind(null, g));
  }
  var Ft = {
    map: K,
    forEach: function(g, M, Y) {
      K(
        g,
        function() {
          M.apply(this, arguments);
        },
        Y
      );
    },
    count: function(g) {
      var M = 0;
      return K(g, function() {
        M++;
      }), M;
    },
    toArray: function(g) {
      return K(g, function(M) {
        return M;
      }) || [];
    },
    only: function(g) {
      if (!Me(g))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return g;
    }
  };
  return F.Activity = w, F.Children = Ft, F.Component = Je, F.Fragment = o, F.Profiler = d, F.PureComponent = ye, F.StrictMode = f, F.Suspense = D, F.ViewTransition = B, F.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ce, F.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(g) {
      return ce.H.useMemoCache(g);
    }
  }, F.addTransitionType = St, F.cache = function(g) {
    return function() {
      return g.apply(null, arguments);
    };
  }, F.cacheSignal = function() {
    return null;
  }, F.cloneElement = function(g, M, Y) {
    if (g == null)
      throw Error(
        "The argument must be a React element, but you passed " + g + "."
      );
    var R = le({}, g.props), J = g.key;
    if (M != null)
      for (j in M.key !== void 0 && (J = "" + M.key), M)
        !at.call(M, j) || j === "key" || j === "__self" || j === "__source" || j === "ref" && M.ref === void 0 || (R[j] = M[j]);
    var j = arguments.length - 2;
    if (j === 1) R.children = Y;
    else if (1 < j) {
      for (var H = Array(j), be = 0; be < j; be++)
        H[be] = arguments[be + 2];
      R.children = H;
    }
    return ut(g.type, J, R);
  }, F.createContext = function(g) {
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
  }, F.createElement = function(g, M, Y) {
    var R, J = {}, j = null;
    if (M != null)
      for (R in M.key !== void 0 && (j = "" + M.key), M)
        at.call(M, R) && R !== "key" && R !== "__self" && R !== "__source" && (J[R] = M[R]);
    var H = arguments.length - 2;
    if (H === 1) J.children = Y;
    else if (1 < H) {
      for (var be = Array(H), Ye = 0; Ye < H; Ye++)
        be[Ye] = arguments[Ye + 2];
      J.children = be;
    }
    if (g && g.defaultProps)
      for (R in H = g.defaultProps, H)
        J[R] === void 0 && (J[R] = H[R]);
    return ut(g, j, J);
  }, F.createRef = function() {
    return { current: null };
  }, F.forwardRef = function(g) {
    return { $$typeof: A, render: g };
  }, F.isValidElement = Me, F.lazy = function(g) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: g },
      _init: ne
    };
  }, F.memo = function(g, M) {
    return {
      $$typeof: O,
      type: g,
      compare: M === void 0 ? null : M
    };
  }, F.startTransition = kt, F.unstable_useCacheRefresh = function() {
    return ce.H.useCacheRefresh();
  }, F.use = function(g) {
    return ce.H.use(g);
  }, F.useActionState = function(g, M, Y) {
    return ce.H.useActionState(g, M, Y);
  }, F.useCallback = function(g, M) {
    return ce.H.useCallback(g, M);
  }, F.useContext = function(g) {
    return ce.H.useContext(g);
  }, F.useDebugValue = function() {
  }, F.useDeferredValue = function(g, M) {
    return ce.H.useDeferredValue(g, M);
  }, F.useEffect = function(g, M) {
    return ce.H.useEffect(g, M);
  }, F.useEffectEvent = function(g) {
    return ce.H.useEffectEvent(g);
  }, F.useId = function() {
    return ce.H.useId();
  }, F.useImperativeHandle = function(g, M, Y) {
    return ce.H.useImperativeHandle(g, M, Y);
  }, F.useInsertionEffect = function(g, M) {
    return ce.H.useInsertionEffect(g, M);
  }, F.useLayoutEffect = function(g, M) {
    return ce.H.useLayoutEffect(g, M);
  }, F.useMemo = function(g, M) {
    return ce.H.useMemo(g, M);
  }, F.useOptimistic = function(g, M) {
    return ce.H.useOptimistic(g, M);
  }, F.useReducer = function(g, M, Y) {
    return ce.H.useReducer(g, M, Y);
  }, F.useRef = function(g) {
    return ce.H.useRef(g);
  }, F.useState = function(g) {
    return ce.H.useState(g);
  }, F.useSyncExternalStore = function(g, M, Y) {
    return ce.H.useSyncExternalStore(
      g,
      M,
      Y
    );
  }, F.useTransition = function() {
    return ce.H.useTransition();
  }, F.version = "19.3.0-canary-378973b3-20251205", F;
}
var qm;
function as() {
  return qm || (qm = 1, $f.exports = Dg()), $f.exports;
}
var Bm;
function Ug() {
  return Bm || (Bm = 1, Jf.exports = Cg()), Jf.exports;
}
var z = Ug(), W = as();
const us = /* @__PURE__ */ y0(W);
var kf = { exports: {} }, Tu = {}, Ff = { exports: {} }, Wf = {};
var Ym;
function jg() {
  return Ym || (Ym = 1, (function(a) {
    function c(Z, X) {
      var K = Z.length;
      Z.push(X);
      e: for (; 0 < K; ) {
        var ne = K - 1 >>> 1, ge = Z[ne];
        if (0 < d(ge, X))
          Z[ne] = X, Z[K] = ge, K = ne;
        else break e;
      }
    }
    function o(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function f(Z) {
      if (Z.length === 0) return null;
      var X = Z[0], K = Z.pop();
      if (K !== X) {
        Z[0] = K;
        e: for (var ne = 0, ge = Z.length, kt = ge >>> 1; ne < kt; ) {
          var St = 2 * (ne + 1) - 1, Ft = Z[St], g = St + 1, M = Z[g];
          if (0 > d(Ft, K))
            g < ge && 0 > d(M, Ft) ? (Z[ne] = M, Z[g] = K, ne = g) : (Z[ne] = Ft, Z[St] = K, ne = St);
          else if (g < ge && 0 > d(M, K))
            Z[ne] = M, Z[g] = K, ne = g;
          else break e;
        }
      }
      return X;
    }
    function d(Z, X) {
      var K = Z.sortIndex - X.sortIndex;
      return K !== 0 ? K : Z.id - X.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      a.unstable_now = function() {
        return m.now();
      };
    } else {
      var v = Date, A = v.now();
      a.unstable_now = function() {
        return v.now() - A;
      };
    }
    var D = [], O = [], N = 1, w = null, B = 3, ee = !1, $ = !1, ve = !1, le = !1, ze = typeof setTimeout == "function" ? setTimeout : null, Je = typeof clearTimeout == "function" ? clearTimeout : null, je = typeof setImmediate < "u" ? setImmediate : null;
    function ye(Z) {
      for (var X = o(O); X !== null; ) {
        if (X.callback === null) f(O);
        else if (X.startTime <= Z)
          f(O), X.sortIndex = X.expirationTime, c(D, X);
        else break;
        X = o(O);
      }
    }
    function He(Z) {
      if (ve = !1, ye(Z), !$)
        if (o(D) !== null)
          $ = !0, te || (te = !0, Me());
        else {
          var X = o(O);
          X !== null && ht(He, X.startTime - Z);
        }
    }
    var te = !1, ot = -1, ce = 5, at = -1;
    function ut() {
      return le ? !0 : !(a.unstable_now() - at < ce);
    }
    function wt() {
      if (le = !1, te) {
        var Z = a.unstable_now();
        at = Z;
        var X = !0;
        try {
          e: {
            $ = !1, ve && (ve = !1, Je(ot), ot = -1), ee = !0;
            var K = B;
            try {
              t: {
                for (ye(Z), w = o(D); w !== null && !(w.expirationTime > Z && ut()); ) {
                  var ne = w.callback;
                  if (typeof ne == "function") {
                    w.callback = null, B = w.priorityLevel;
                    var ge = ne(
                      w.expirationTime <= Z
                    );
                    if (Z = a.unstable_now(), typeof ge == "function") {
                      w.callback = ge, ye(Z), X = !0;
                      break t;
                    }
                    w === o(D) && f(D), ye(Z);
                  } else f(D);
                  w = o(D);
                }
                if (w !== null) X = !0;
                else {
                  var kt = o(O);
                  kt !== null && ht(
                    He,
                    kt.startTime - Z
                  ), X = !1;
                }
              }
              break e;
            } finally {
              w = null, B = K, ee = !1;
            }
            X = void 0;
          }
        } finally {
          X ? Me() : te = !1;
        }
      }
    }
    var Me;
    if (typeof je == "function")
      Me = function() {
        je(wt);
      };
    else if (typeof MessageChannel < "u") {
      var $t = new MessageChannel(), $e = $t.port2;
      $t.port1.onmessage = wt, Me = function() {
        $e.postMessage(null);
      };
    } else
      Me = function() {
        ze(wt, 0);
      };
    function ht(Z, X) {
      ot = ze(function() {
        Z(a.unstable_now());
      }, X);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, a.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ce = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return B;
    }, a.unstable_next = function(Z) {
      switch (B) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = B;
      }
      var K = B;
      B = X;
      try {
        return Z();
      } finally {
        B = K;
      }
    }, a.unstable_requestPaint = function() {
      le = !0;
    }, a.unstable_runWithPriority = function(Z, X) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var K = B;
      B = Z;
      try {
        return X();
      } finally {
        B = K;
      }
    }, a.unstable_scheduleCallback = function(Z, X, K) {
      var ne = a.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ne + K : ne) : K = ne, Z) {
        case 1:
          var ge = -1;
          break;
        case 2:
          ge = 250;
          break;
        case 5:
          ge = 1073741823;
          break;
        case 4:
          ge = 1e4;
          break;
        default:
          ge = 5e3;
      }
      return ge = K + ge, Z = {
        id: N++,
        callback: X,
        priorityLevel: Z,
        startTime: K,
        expirationTime: ge,
        sortIndex: -1
      }, K > ne ? (Z.sortIndex = K, c(O, Z), o(D) === null && Z === o(O) && (ve ? (Je(ot), ot = -1) : ve = !0, ht(He, K - ne))) : (Z.sortIndex = ge, c(D, Z), $ || ee || ($ = !0, te || (te = !0, Me()))), Z;
    }, a.unstable_shouldYield = ut, a.unstable_wrapCallback = function(Z) {
      var X = B;
      return function() {
        var K = B;
        B = X;
        try {
          return Z.apply(this, arguments);
        } finally {
          B = K;
        }
      };
    };
  })(Wf)), Wf;
}
var Gm;
function wg() {
  return Gm || (Gm = 1, Ff.exports = jg()), Ff.exports;
}
var If = { exports: {} }, ct = {};
var Lm;
function Rg() {
  if (Lm) return ct;
  Lm = 1;
  var a = as();
  function c(O) {
    var N = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      N += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        N += "&args[]=" + encodeURIComponent(arguments[w]);
    }
    return "Minified React error #" + O + "; visit " + N + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var f = {
    d: {
      f: o,
      r: function() {
        throw Error(c(522));
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
  }, d = /* @__PURE__ */ Symbol.for("react.portal"), m = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function v(O, N, w) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: B == null ? null : B === m ? m : "" + B,
      children: O,
      containerInfo: N,
      implementation: w
    };
  }
  var A = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(O, N) {
    if (O === "font") return "";
    if (typeof N == "string")
      return N === "use-credentials" ? N : "";
  }
  return ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, ct.createPortal = function(O, N) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!N || N.nodeType !== 1 && N.nodeType !== 9 && N.nodeType !== 11)
      throw Error(c(299));
    return v(O, N, null, w);
  }, ct.flushSync = function(O) {
    var N = A.T, w = f.p;
    try {
      if (A.T = null, f.p = 2, O) return O();
    } finally {
      A.T = N, f.p = w, f.d.f();
    }
  }, ct.preconnect = function(O, N) {
    typeof O == "string" && (N ? (N = N.crossOrigin, N = typeof N == "string" ? N === "use-credentials" ? N : "" : void 0) : N = null, f.d.C(O, N));
  }, ct.prefetchDNS = function(O) {
    typeof O == "string" && f.d.D(O);
  }, ct.preinit = function(O, N) {
    if (typeof O == "string" && N && typeof N.as == "string") {
      var w = N.as, B = D(w, N.crossOrigin), ee = typeof N.integrity == "string" ? N.integrity : void 0, $ = typeof N.fetchPriority == "string" ? N.fetchPriority : void 0;
      w === "style" ? f.d.S(
        O,
        typeof N.precedence == "string" ? N.precedence : void 0,
        {
          crossOrigin: B,
          integrity: ee,
          fetchPriority: $
        }
      ) : w === "script" && f.d.X(O, {
        crossOrigin: B,
        integrity: ee,
        fetchPriority: $,
        nonce: typeof N.nonce == "string" ? N.nonce : void 0
      });
    }
  }, ct.preinitModule = function(O, N) {
    if (typeof O == "string")
      if (typeof N == "object" && N !== null) {
        if (N.as == null || N.as === "script") {
          var w = D(
            N.as,
            N.crossOrigin
          );
          f.d.M(O, {
            crossOrigin: w,
            integrity: typeof N.integrity == "string" ? N.integrity : void 0,
            nonce: typeof N.nonce == "string" ? N.nonce : void 0
          });
        }
      } else N == null && f.d.M(O);
  }, ct.preload = function(O, N) {
    if (typeof O == "string" && typeof N == "object" && N !== null && typeof N.as == "string") {
      var w = N.as, B = D(w, N.crossOrigin);
      f.d.L(O, w, {
        crossOrigin: B,
        integrity: typeof N.integrity == "string" ? N.integrity : void 0,
        nonce: typeof N.nonce == "string" ? N.nonce : void 0,
        type: typeof N.type == "string" ? N.type : void 0,
        fetchPriority: typeof N.fetchPriority == "string" ? N.fetchPriority : void 0,
        referrerPolicy: typeof N.referrerPolicy == "string" ? N.referrerPolicy : void 0,
        imageSrcSet: typeof N.imageSrcSet == "string" ? N.imageSrcSet : void 0,
        imageSizes: typeof N.imageSizes == "string" ? N.imageSizes : void 0,
        media: typeof N.media == "string" ? N.media : void 0
      });
    }
  }, ct.preloadModule = function(O, N) {
    if (typeof O == "string")
      if (N) {
        var w = D(N.as, N.crossOrigin);
        f.d.m(O, {
          as: typeof N.as == "string" && N.as !== "script" ? N.as : void 0,
          crossOrigin: w,
          integrity: typeof N.integrity == "string" ? N.integrity : void 0
        });
      } else f.d.m(O);
  }, ct.requestFormReset = function(O) {
    f.d.r(O);
  }, ct.unstable_batchedUpdates = function(O, N) {
    return O(N);
  }, ct.useFormState = function(O, N, w) {
    return A.H.useFormState(O, N, w);
  }, ct.useFormStatus = function() {
    return A.H.useHostTransitionStatus();
  }, ct.version = "19.3.0-canary-378973b3-20251205", ct;
}
var Xm;
function Zg() {
  if (Xm) return If.exports;
  Xm = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), If.exports = Rg(), If.exports;
}
var Vm;
function Hg() {
  if (Vm) return Tu;
  Vm = 1;
  var a = wg(), c = as(), o = Zg();
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
  function m(e) {
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
  function v(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function A(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function D(e) {
    if (m(e) !== e)
      throw Error(f(188));
  }
  function O(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(f(188));
      return t !== e ? null : e;
    }
    for (var l = e, n = t; ; ) {
      var u = l.return;
      if (u === null) break;
      var i = u.alternate;
      if (i === null) {
        if (n = u.return, n !== null) {
          l = n;
          continue;
        }
        break;
      }
      if (u.child === i.child) {
        for (i = u.child; i; ) {
          if (i === l) return D(u), e;
          if (i === n) return D(u), t;
          i = i.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== n.return) l = u, n = i;
      else {
        for (var s = !1, r = u.child; r; ) {
          if (r === l) {
            s = !0, l = u, n = i;
            break;
          }
          if (r === n) {
            s = !0, n = u, l = i;
            break;
          }
          r = r.sibling;
        }
        if (!s) {
          for (r = i.child; r; ) {
            if (r === l) {
              s = !0, l = i, n = u;
              break;
            }
            if (r === n) {
              s = !0, n = i, l = u;
              break;
            }
            r = r.sibling;
          }
          if (!s) throw Error(f(189));
        }
      }
      if (l.alternate !== n) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? e : t;
  }
  function N(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = N(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function w(e, t, l, n, u, i) {
    for (; e !== null; ) {
      if (e.tag === 5 && l(e, n, u, i) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5) && w(
        e.child,
        t,
        l,
        n,
        u,
        i
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function B(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5) return e;
      e = e.return;
    }
    return null;
  }
  function ee(e, t, l) {
    for (var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : !1; l !== null; ) {
      if (l === t)
        if (n = !0, l.sibling) l = l.sibling;
        else return !0;
      if (l.tag === 5) {
        if (n) return e[1] = l, !0;
        e[0] = l;
      } else if ((l.tag !== 22 || l.memoizedState === null) && ee(e, t, l.child, n))
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function $(e) {
    switch (e.tag) {
      case 5:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(f(559));
    }
  }
  var ve = null, le = null;
  function ze(e) {
    return ve = e, !0;
  }
  function Je(e, t, l) {
    return e === l ? !0 : e === t ? (ve = e, !0) : !1;
  }
  function je(e, t, l) {
    return e === l ? (le = e, !1) : e === t ? (le !== null && (ve = e), !0) : !1;
  }
  function ye(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function He(e, t, l) {
    for (var n = 0, u = e; u; u = l(u)) n++;
    u = 0;
    for (var i = t; i; i = l(i)) u++;
    for (; 0 < n - u; ) e = l(e), n--;
    for (; 0 < u - n; ) t = l(t), u--;
    for (; n--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = l(e), t = l(t);
    }
    return null;
  }
  var te = Object.assign, ot = /* @__PURE__ */ Symbol.for("react.element"), ce = /* @__PURE__ */ Symbol.for("react.transitional.element"), at = /* @__PURE__ */ Symbol.for("react.portal"), ut = /* @__PURE__ */ Symbol.for("react.fragment"), wt = /* @__PURE__ */ Symbol.for("react.strict_mode"), Me = /* @__PURE__ */ Symbol.for("react.profiler"), $t = /* @__PURE__ */ Symbol.for("react.consumer"), $e = /* @__PURE__ */ Symbol.for("react.context"), ht = /* @__PURE__ */ Symbol.for("react.forward_ref"), Z = /* @__PURE__ */ Symbol.for("react.suspense"), X = /* @__PURE__ */ Symbol.for("react.suspense_list"), K = /* @__PURE__ */ Symbol.for("react.memo"), ne = /* @__PURE__ */ Symbol.for("react.lazy"), ge = /* @__PURE__ */ Symbol.for("react.activity"), kt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), St = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Ft = /* @__PURE__ */ Symbol.for("react.view_transition"), g = Symbol.iterator;
  function M(e) {
    return e === null || typeof e != "object" ? null : (e = g && e[g] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = /* @__PURE__ */ Symbol.for("react.client.reference");
  function R(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Y ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ut:
        return "Fragment";
      case Me:
        return "Profiler";
      case wt:
        return "StrictMode";
      case Z:
        return "Suspense";
      case X:
        return "SuspenseList";
      case ge:
        return "Activity";
      case Ft:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case at:
          return "Portal";
        case $e:
          return e.displayName || "Context";
        case $t:
          return (e._context.displayName || "Context") + ".Consumer";
        case ht:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case K:
          return t = e.displayName || null, t !== null ? t : R(e.type) || "Memo";
        case ne:
          t = e._payload, e = e._init;
          try {
            return R(e(t));
          } catch {
          }
      }
    return null;
  }
  var J = Array.isArray, j = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, be = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Ye = [], Rt = -1;
  function tl(e) {
    return { current: e };
  }
  function We(e) {
    0 > Rt || (e.current = Ye[Rt], Ye[Rt] = null, Rt--);
  }
  function Te(e, t) {
    Rt++, Ye[Rt] = e.current, e.current = t;
  }
  var ll = tl(null), xa = tl(null), Cl = tl(null), Nu = tl(null);
  function Au(e, t) {
    switch (Te(Cl, t), Te(xa, e), Te(ll, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? $h(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = $h(t), e = kh(t, e);
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
    We(ll), Te(ll, e);
  }
  function jn() {
    We(ll), We(xa), We(Cl);
  }
  function rc(e) {
    var t = e.memoizedState;
    t !== null && (ba._currentValue = t.memoizedState, Te(Nu, e)), t = ll.current;
    var l = kh(t, e.type);
    t !== l && (Te(xa, e), Te(ll, l));
  }
  function xu(e) {
    xa.current === e && (We(ll), We(xa)), Nu.current === e && (We(Nu), ba._currentValue = be);
  }
  var dc, ys;
  function Dl(e) {
    if (dc === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        dc = t && t[1] || "", ys = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + dc + e + ys;
  }
  var hc = !1;
  function mc(e, t) {
    if (!e || hc) return "";
    hc = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var n = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var x = function() {
                throw Error();
              };
              if (Object.defineProperty(x.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(x, []);
                } catch (S) {
                  var b = S;
                }
                Reflect.construct(e, [], x);
              } else {
                try {
                  x.call();
                } catch (S) {
                  b = S;
                }
                e.call(x.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                b = S;
              }
              (x = e()) && typeof x.catch == "function" && x.catch(function() {
              });
            }
          } catch (S) {
            if (S && b && typeof S.stack == "string")
              return [S.stack, b.stack];
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
      var i = n.DetermineComponentFrameRoot(), s = i[0], r = i[1];
      if (s && r) {
        var h = s.split(`
`), p = r.split(`
`);
        for (u = n = 0; n < h.length && !h[n].includes("DetermineComponentFrameRoot"); )
          n++;
        for (; u < p.length && !p[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (n === h.length || u === p.length)
          for (n = h.length - 1, u = p.length - 1; 1 <= n && 0 <= u && h[n] !== p[u]; )
            u--;
        for (; 1 <= n && 0 <= u; n--, u--)
          if (h[n] !== p[u]) {
            if (n !== 1 || u !== 1)
              do
                if (n--, u--, 0 > u || h[n] !== p[u]) {
                  var E = `
` + h[n].replace(" at new ", " at ");
                  return e.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", e.displayName)), E;
                }
              while (1 <= n && 0 <= u);
            break;
          }
      }
    } finally {
      hc = !1, Error.prepareStackTrace = l;
    }
    return (l = e ? e.displayName || e.name : "") ? Dl(l) : "";
  }
  function V0(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Dl(e.type);
      case 16:
        return Dl("Lazy");
      case 13:
        return e.child !== t && t !== null ? Dl("Suspense Fallback") : Dl("Suspense");
      case 19:
        return Dl("SuspenseList");
      case 0:
      case 15:
        return mc(e.type, !1);
      case 11:
        return mc(e.type.render, !1);
      case 1:
        return mc(e.type, !0);
      case 31:
        return Dl("Activity");
      case 30:
        return Dl("ViewTransition");
      default:
        return "";
    }
  }
  function gs(e) {
    try {
      var t = "", l = null;
      do
        t += V0(e, l), l = e, e = e.return;
      while (e);
      return t;
    } catch (n) {
      return `
Error generating stack: ` + n.message + `
` + n.stack;
    }
  }
  var vc = Object.prototype.hasOwnProperty, yc = a.unstable_scheduleCallback, gc = a.unstable_cancelCallback, Q0 = a.unstable_shouldYield, K0 = a.unstable_requestPaint, zt = a.unstable_now, J0 = a.unstable_getCurrentPriorityLevel, ps = a.unstable_ImmediatePriority, _s = a.unstable_UserBlockingPriority, Mu = a.unstable_NormalPriority, $0 = a.unstable_LowPriority, bs = a.unstable_IdlePriority, k0 = a.log, F0 = a.unstable_setDisableYieldValue, Ma = null, Tt = null;
  function Ul(e) {
    if (typeof k0 == "function" && F0(e), Tt && typeof Tt.setStrictMode == "function")
      try {
        Tt.setStrictMode(Ma, e);
      } catch {
      }
  }
  var Et = Math.clz32 ? Math.clz32 : P0, W0 = Math.log, I0 = Math.LN2;
  function P0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (W0(e) / I0 | 0) | 0;
  }
  var Cu = 256, Du = 262144, Uu = 4194304;
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
  function ju(e, t, l) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var u = 0, i = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var r = n & 134217727;
    return r !== 0 ? (n = r & ~i, n !== 0 ? u = cn(n) : (s &= r, s !== 0 ? u = cn(s) : l || (l = r & ~e, l !== 0 && (u = cn(l))))) : (r = n & ~i, r !== 0 ? u = cn(r) : s !== 0 ? u = cn(s) : l || (l = n & ~e, l !== 0 && (u = cn(l)))), u === 0 ? 0 : t !== 0 && t !== u && (t & i) === 0 && (i = u & -u, l = t & -t, i >= l || i === 32 && (l & 4194048) !== 0) ? t : u;
  }
  function Ca(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function ev(e, t) {
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
  function Ss() {
    var e = Uu;
    return Uu <<= 1, (Uu & 62914560) === 0 && (Uu = 4194304), e;
  }
  function pc(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Da(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function tv(e, t, l, n, u, i) {
    var s = e.pendingLanes;
    e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
    var r = e.entanglements, h = e.expirationTimes, p = e.hiddenUpdates;
    for (l = s & ~l; 0 < l; ) {
      var E = 31 - Et(l), x = 1 << E;
      r[E] = 0, h[E] = -1;
      var b = p[E];
      if (b !== null)
        for (p[E] = null, E = 0; E < b.length; E++) {
          var S = b[E];
          S !== null && (S.lane &= -536870913);
        }
      l &= ~x;
    }
    n !== 0 && zs(e, n, 0), i !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(s & ~t));
  }
  function zs(e, t, l) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var n = 31 - Et(t);
    e.entangledLanes |= t, e.entanglements[n] = e.entanglements[n] | 1073741824 | l & 261930;
  }
  function Ts(e, t) {
    var l = e.entangledLanes |= t;
    for (e = e.entanglements; l; ) {
      var n = 31 - Et(l), u = 1 << n;
      u & t | e[n] & t && (e[n] |= t), l &= ~u;
    }
  }
  function Es(e, t) {
    var l = t & -t;
    return l = (l & 42) !== 0 ? 1 : _c(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
  }
  function _c(e) {
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
  function bc(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Os() {
    var e = H.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Mm(e.type));
  }
  function Ns(e, t) {
    var l = H.p;
    try {
      return H.p = e, t();
    } finally {
      H.p = l;
    }
  }
  var jl = Math.random().toString(36).slice(2), Ie = "__reactFiber$" + jl, mt = "__reactProps$" + jl, wn = "__reactContainer$" + jl, Sc = "__reactEvents$" + jl, lv = "__reactListeners$" + jl, nv = "__reactHandles$" + jl, As = "__reactResources$" + jl, Ua = "__reactMarker$" + jl;
  function zc(e) {
    delete e[Ie], delete e[mt], delete e[Sc], delete e[lv], delete e[nv];
  }
  function on(e) {
    var t;
    if (t = e[Ie]) return t;
    for (var l = e.parentNode; l; ) {
      if (t = l[wn] || l[Ie]) {
        if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
          for (e = fm(e); e !== null; ) {
            if (l = e[Ie]) return l;
            e = fm(e);
          }
        return t;
      }
      e = l, l = e.parentNode;
    }
    return null;
  }
  function Rn(e) {
    if (e = e[Ie] || e[wn]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ja(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(f(33));
  }
  function Zn(e) {
    var t = e[As];
    return t || (t = e[As] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ke(e) {
    e[Ua] = !0;
  }
  var xs = /* @__PURE__ */ new Set(), Ms = {};
  function fn(e, t) {
    Hn(e, t), Hn(e + "Capture", t);
  }
  function Hn(e, t) {
    for (Ms[e] = t, e = 0; e < t.length; e++)
      xs.add(t[e]);
  }
  var av = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Cs = {}, Ds = {};
  function uv(e) {
    return vc.call(Ds, e) ? !0 : vc.call(Cs, e) ? !1 : av.test(e) ? Ds[e] = !0 : (Cs[e] = !0, !1);
  }
  var re = !1;
  function Us() {
    var e = re;
    return re = !1, e;
  }
  function wu(e, t, l) {
    if (uv(t))
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
  function Ru(e, t, l) {
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
  function ml(e, t, l, n) {
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
  function js(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function iv(e, t, l) {
    var n = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var u = n.get, i = n.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(s) {
          l = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Tc(e) {
    if (!e._valueTracker) {
      var t = js(e) ? "checked" : "value";
      e._valueTracker = iv(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function ws(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(), n = "";
    return e && (n = js(e) ? e.checked ? "true" : "false" : e.value), e = n, e !== l ? (t.setValue(e), !0) : !1;
  }
  function Zu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var cv = /[\n"\\]/g;
  function Ht(e) {
    return e.replace(
      cv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ec(e, t, l, n, u, i, s, r) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? Oc(e, s, Zt(t)) : l != null ? Oc(e, s, Zt(l)) : n != null && e.removeAttribute("value"), u == null && i != null && (e.defaultChecked = !!i), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.name = "" + Zt(r) : e.removeAttribute("name");
  }
  function Rs(e, t, l, n, u, i, s, r) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || l != null) {
      if (!(i !== "submit" && i !== "reset" || t != null)) {
        Tc(e);
        return;
      }
      l = l != null ? "" + Zt(l) : "", t = t != null ? "" + Zt(t) : l, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = n ?? u, n = typeof n != "function" && typeof n != "symbol" && !!n, e.checked = r ? e.checked : !!n, e.defaultChecked = !!n, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), Tc(e);
  }
  function Oc(e, t, l) {
    t === "number" && Zu(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
  }
  function qn(e, t, l, n) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < l.length; u++)
        t["$" + l[u]] = !0;
      for (l = 0; l < e.length; l++)
        u = t.hasOwnProperty("$" + e[l].value), e[l].selected !== u && (e[l].selected = u), u && n && (e[l].defaultSelected = !0);
    } else {
      for (l = "" + Zt(l), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === l) {
          e[u].selected = !0, n && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Zs(e, t, l) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), l == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + Zt(l) : "";
  }
  function Hs(e, t, l, n) {
    if (t == null) {
      if (n != null) {
        if (l != null) throw Error(f(92));
        if (J(n)) {
          if (1 < n.length) throw Error(f(93));
          n = n[0];
        }
        l = n;
      }
      l == null && (l = ""), t = l;
    }
    l = Zt(t), e.defaultValue = l, n = e.textContent, n === l && n !== "" && n !== null && (e.value = n), Tc(e);
  }
  function Bn(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var ov = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qs(e, t, l) {
    var n = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === "" ? n ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : n ? e.setProperty(t, l) : typeof l != "number" || l === 0 || ov.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
  }
  function Bs(e, t, l) {
    if (t != null && typeof t != "object")
      throw Error(f(62));
    if (e = e.style, l != null) {
      for (var n in l)
        !l.hasOwnProperty(n) || t != null && t.hasOwnProperty(n) || (n.indexOf("--") === 0 ? e.setProperty(n, "") : n === "float" ? e.cssFloat = "" : e[n] = "", re = !0);
      for (var u in t)
        n = t[u], t.hasOwnProperty(u) && l[u] !== n && (qs(e, u, n), re = !0);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && qs(e, i, t[i]);
  }
  function Nc(e) {
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
  var fv = /* @__PURE__ */ new Map([
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
  ]), sv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hu(e) {
    return sv.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function vl() {
  }
  var Ac = null;
  function xc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Yn = null, Gn = null;
  function Ys(e) {
    var t = Rn(e);
    if (t && (e = t.stateNode)) {
      var l = e[mt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ec(
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
              'input[name="' + Ht(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < l.length; t++) {
              var n = l[t];
              if (n !== e && n.form === e.form) {
                var u = n[mt] || null;
                if (!u) throw Error(f(90));
                Ec(
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
              n = l[t], n.form === e.form && ws(n);
          }
          break e;
        case "textarea":
          Zs(e, l.value, l.defaultValue);
          break e;
        case "select":
          t = l.value, t != null && qn(e, !!l.multiple, t, !1);
      }
    }
  }
  var Mc = !1;
  function Gs(e, t, l) {
    if (Mc) return e(t, l);
    Mc = !0;
    try {
      var n = e(t);
      return n;
    } finally {
      if (Mc = !1, (Yn !== null || Gn !== null) && (Di(), Yn && (t = Yn, e = Gn, Gn = Yn = null, Ys(t), e)))
        for (t = 0; t < e.length; t++) Ys(e[t]);
    }
  }
  function wa(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var n = l[mt] || null;
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
  var yl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Cc = !1;
  if (yl)
    try {
      var Ra = {};
      Object.defineProperty(Ra, "passive", {
        get: function() {
          Cc = !0;
        }
      }), window.addEventListener("test", Ra, Ra), window.removeEventListener("test", Ra, Ra);
    } catch {
      Cc = !1;
    }
  var wl = null, Dc = null, qu = null;
  function Ls() {
    if (qu) return qu;
    var e, t = Dc, l = t.length, n, u = "value" in wl ? wl.value : wl.textContent, i = u.length;
    for (e = 0; e < l && t[e] === u[e]; e++) ;
    var s = l - e;
    for (n = 1; n <= s && t[l - n] === u[i - n]; n++) ;
    return qu = u.slice(e, 1 < n ? 1 - n : void 0);
  }
  function Bu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Yu() {
    return !0;
  }
  function Xs() {
    return !1;
  }
  function vt(e) {
    function t(l, n, u, i, s) {
      this._reactName = l, this._targetInst = u, this.type = n, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var r in e)
        e.hasOwnProperty(r) && (l = e[r], this[r] = l ? l(i) : i[r]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Yu : Xs, this.isPropagationStopped = Xs, this;
    }
    return te(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var l = this.nativeEvent;
        l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Yu);
      },
      stopPropagation: function() {
        var l = this.nativeEvent;
        l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Yu);
      },
      persist: function() {
      },
      isPersistent: Yu
    }), t;
  }
  var sn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Gu = vt(sn), Za = te({}, sn, { view: 0, detail: 0 }), rv = vt(Za), Uc, jc, Ha, Lu = te({}, Za, {
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
    getModifierState: Rc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Ha && (Ha && e.type === "mousemove" ? (Uc = e.screenX - Ha.screenX, jc = e.screenY - Ha.screenY) : jc = Uc = 0, Ha = e), Uc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : jc;
    }
  }), Vs = vt(Lu), dv = te({}, Lu, { dataTransfer: 0 }), hv = vt(dv), mv = te({}, Za, { relatedTarget: 0 }), wc = vt(mv), vv = te({}, sn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yv = vt(vv), gv = te({}, sn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), pv = vt(gv), _v = te({}, sn, { data: 0 }), Qs = vt(_v), bv = {
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
  }, Sv = {
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
  }, zv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Tv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = zv[e]) ? !!t[e] : !1;
  }
  function Rc() {
    return Tv;
  }
  var Ev = te({}, Za, {
    key: function(e) {
      if (e.key) {
        var t = bv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Bu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Rc,
    charCode: function(e) {
      return e.type === "keypress" ? Bu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Bu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ov = vt(Ev), Nv = te({}, Lu, {
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
  }), Ks = vt(Nv), Av = te({}, Za, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Rc
  }), xv = vt(Av), Mv = te({}, sn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Cv = vt(Mv), Dv = te({}, Lu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Uv = vt(Dv), jv = te({}, sn, {
    newState: 0,
    oldState: 0
  }), wv = vt(jv), Rv = [9, 13, 27, 32], Zc = yl && "CompositionEvent" in window, qa = null;
  yl && "documentMode" in document && (qa = document.documentMode);
  var Zv = yl && "TextEvent" in window && !qa, Js = yl && (!Zc || qa && 8 < qa && 11 >= qa), $s = " ", ks = !1;
  function Fs(e, t) {
    switch (e) {
      case "keyup":
        return Rv.indexOf(t.keyCode) !== -1;
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
  function Ws(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ln = !1;
  function Hv(e, t) {
    switch (e) {
      case "compositionend":
        return Ws(t);
      case "keypress":
        return t.which !== 32 ? null : (ks = !0, $s);
      case "textInput":
        return e = t.data, e === $s && ks ? null : e;
      default:
        return null;
    }
  }
  function qv(e, t) {
    if (Ln)
      return e === "compositionend" || !Zc && Fs(e, t) ? (e = Ls(), qu = Dc = wl = null, Ln = !1, e) : null;
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
        return Js && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Bv = {
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
  function Is(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Bv[e.type] : t === "textarea";
  }
  function Ps(e, t, l, n) {
    Yn ? Gn ? Gn.push(n) : Gn = [n] : Yn = n, t = Hi(t, "onChange"), 0 < t.length && (l = new Gu(
      "onChange",
      "change",
      null,
      l,
      n
    ), e.push({ event: l, listeners: t }));
  }
  var Ba = null, Ya = null;
  function Yv(e) {
    Lh(e, 0);
  }
  function Xu(e) {
    var t = ja(e);
    if (ws(t)) return e;
  }
  function er(e, t) {
    if (e === "change") return t;
  }
  var tr = !1;
  if (yl) {
    var Hc;
    if (yl) {
      var qc = "oninput" in document;
      if (!qc) {
        var lr = document.createElement("div");
        lr.setAttribute("oninput", "return;"), qc = typeof lr.oninput == "function";
      }
      Hc = qc;
    } else Hc = !1;
    tr = Hc && (!document.documentMode || 9 < document.documentMode);
  }
  function nr() {
    Ba && (Ba.detachEvent("onpropertychange", ar), Ya = Ba = null);
  }
  function ar(e) {
    if (e.propertyName === "value" && Xu(Ya)) {
      var t = [];
      Ps(
        t,
        Ya,
        e,
        xc(e)
      ), Gs(Yv, t);
    }
  }
  function Gv(e, t, l) {
    e === "focusin" ? (nr(), Ba = t, Ya = l, Ba.attachEvent("onpropertychange", ar)) : e === "focusout" && nr();
  }
  function Lv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Xu(Ya);
  }
  function Xv(e, t) {
    if (e === "click") return Xu(t);
  }
  function Vv(e, t) {
    if (e === "input" || e === "change")
      return Xu(t);
  }
  function Qv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Ot = typeof Object.is == "function" ? Object.is : Qv;
  function Ga(e, t) {
    if (Ot(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var l = Object.keys(e), n = Object.keys(t);
    if (l.length !== n.length) return !1;
    for (n = 0; n < l.length; n++) {
      var u = l[n];
      if (!vc.call(t, u) || !Ot(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function ur(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function ir(e, t) {
    var l = ur(e);
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
      l = ur(l);
    }
  }
  function cr(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? cr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function or(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Zu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = Zu(e.document);
    }
    return t;
  }
  function Bc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Kv = yl && "documentMode" in document && 11 >= document.documentMode, Xn = null, Yc = null, La = null, Gc = !1;
  function fr(e, t, l) {
    var n = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Gc || Xn == null || Xn !== Zu(n) || (n = Xn, "selectionStart" in n && Bc(n) ? n = { start: n.selectionStart, end: n.selectionEnd } : (n = (n.ownerDocument && n.ownerDocument.defaultView || window).getSelection(), n = {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    }), La && Ga(La, n) || (La = n, n = Hi(Yc, "onSelect"), 0 < n.length && (t = new Gu(
      "onSelect",
      "select",
      null,
      t,
      l
    ), e.push({ event: t, listeners: n }), t.target = Xn)));
  }
  function rn(e, t) {
    var l = {};
    return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
  }
  var Vn = {
    animationend: rn("Animation", "AnimationEnd"),
    animationiteration: rn("Animation", "AnimationIteration"),
    animationstart: rn("Animation", "AnimationStart"),
    transitionrun: rn("Transition", "TransitionRun"),
    transitionstart: rn("Transition", "TransitionStart"),
    transitioncancel: rn("Transition", "TransitionCancel"),
    transitionend: rn("Transition", "TransitionEnd")
  }, Lc = {}, sr = {};
  yl && (sr = document.createElement("div").style, "AnimationEvent" in window || (delete Vn.animationend.animation, delete Vn.animationiteration.animation, delete Vn.animationstart.animation), "TransitionEvent" in window || delete Vn.transitionend.transition);
  function dn(e) {
    if (Lc[e]) return Lc[e];
    if (!Vn[e]) return e;
    var t = Vn[e], l;
    for (l in t)
      if (t.hasOwnProperty(l) && l in sr)
        return Lc[e] = t[l];
    return e;
  }
  var rr = dn("animationend"), dr = dn("animationiteration"), hr = dn("animationstart"), Jv = dn("transitionrun"), $v = dn("transitionstart"), kv = dn("transitioncancel"), mr = dn("transitionend"), vr = /* @__PURE__ */ new Map(), Xc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Xc.push("scrollEnd");
  function Wt(e, t) {
    vr.set(e, t), fn(t, [e]);
  }
  var Fv = 0;
  function gl(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = el.identifierPrefix;
    var l = Fv++;
    return e = "_" + e + "t_" + l.toString(32) + "_", t.autoName = e;
  }
  function yr(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, l = ra;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = e[l[n]];
        if (u != null) {
          if (u === "none") return "none";
          t = t == null ? u : t + (" " + u);
        }
      }
    return t ?? e.default;
  }
  function pl(e, t) {
    return e = yr(e), t = yr(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Vu = typeof reportError == "function" ? reportError : function(e) {
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
  }, qt = [], Qn = 0, Vc = 0;
  function Qu() {
    for (var e = Qn, t = Vc = Qn = 0; t < e; ) {
      var l = qt[t];
      qt[t++] = null;
      var n = qt[t];
      qt[t++] = null;
      var u = qt[t];
      qt[t++] = null;
      var i = qt[t];
      if (qt[t++] = null, n !== null && u !== null) {
        var s = n.pending;
        s === null ? u.next = u : (u.next = s.next, s.next = u), n.pending = u;
      }
      i !== 0 && gr(l, u, i);
    }
  }
  function Ku(e, t, l, n) {
    qt[Qn++] = e, qt[Qn++] = t, qt[Qn++] = l, qt[Qn++] = n, Vc |= n, e.lanes |= n, e = e.alternate, e !== null && (e.lanes |= n);
  }
  function Qc(e, t, l, n) {
    return Ku(e, t, l, n), Ju(e);
  }
  function hn(e, t) {
    return Ku(e, null, null, t), Ju(e);
  }
  function gr(e, t, l) {
    e.lanes |= l;
    var n = e.alternate;
    n !== null && (n.lanes |= l);
    for (var u = !1, i = e.return; i !== null; )
      i.childLanes |= l, n = i.alternate, n !== null && (n.childLanes |= l), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (u = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, u && t !== null && (u = 31 - Et(l), e = i.hiddenUpdates, n = e[u], n === null ? e[u] = [t] : n.push(t), t.lane = l | 536870912), i) : null;
  }
  function Ju(e) {
    if (50 < ru)
      throw ru = 0, df = null, Error(f(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Kn = {};
  function Wv(e, t, l, n) {
    this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yt(e, t, l, n) {
    return new Wv(e, t, l, n);
  }
  function Kc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function _l(e, t) {
    var l = e.alternate;
    return l === null ? (l = yt(
      e.tag,
      t,
      e.key,
      e.mode
    ), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 132120576, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
  }
  function pr(e, t) {
    e.flags &= 132120578;
    var l = e.alternate;
    return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function $u(e, t, l, n, u, i) {
    var s = 0;
    if (n = e, typeof e == "function") Kc(e) && (s = 1);
    else if (typeof e == "string")
      s = gg(
        e,
        l,
        ll.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ge:
          return e = yt(31, l, t, u), e.elementType = ge, e.lanes = i, e;
        case ut:
          return mn(l.children, u, i, t);
        case wt:
          s = 8, u |= 24;
          break;
        case Me:
          return e = yt(12, l, t, u | 2), e.elementType = Me, e.lanes = i, e;
        case Z:
          return e = yt(13, l, t, u), e.elementType = Z, e.lanes = i, e;
        case X:
          return e = yt(19, l, t, u), e.elementType = X, e.lanes = i, e;
        case kt:
        case Ft:
          return e = u | 32, e = yt(30, l, t, e), e.elementType = Ft, e.lanes = i, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case $e:
                s = 10;
                break e;
              case $t:
                s = 9;
                break e;
              case ht:
                s = 11;
                break e;
              case K:
                s = 14;
                break e;
              case ne:
                s = 16, n = null;
                break e;
            }
          s = 29, l = Error(
            f(130, e === null ? "null" : typeof e, "")
          ), n = null;
      }
    return t = yt(s, l, t, u), t.elementType = e, t.type = n, t.lanes = i, t;
  }
  function mn(e, t, l, n) {
    return e = yt(7, e, n, t), e.lanes = l, e;
  }
  function Jc(e, t, l) {
    return e = yt(6, e, null, t), e.lanes = l, e;
  }
  function _r(e) {
    var t = yt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function $c(e, t, l) {
    return t = yt(
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
  var br = /* @__PURE__ */ new WeakMap();
  function Bt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = br.get(e);
      return l !== void 0 ? l : (t = {
        value: e,
        source: t,
        stack: gs(t)
      }, br.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: gs(t)
    };
  }
  var Jn = [], $n = 0, ku = null, Xa = 0, Yt = [], Gt = 0, Rl = null, nl = 1, al = "";
  function bl(e, t) {
    Jn[$n++] = Xa, Jn[$n++] = ku, ku = e, Xa = t;
  }
  function Sr(e, t, l) {
    Yt[Gt++] = nl, Yt[Gt++] = al, Yt[Gt++] = Rl, Rl = e;
    var n = nl;
    e = al;
    var u = 32 - Et(n) - 1;
    n &= ~(1 << u), l += 1;
    var i = 32 - Et(t) + u;
    if (30 < i) {
      var s = u - u % 5;
      i = (n & (1 << s) - 1).toString(32), n >>= s, u -= s, nl = 1 << 32 - Et(t) + u | l << u | n, al = i + e;
    } else
      nl = 1 << i | l << u | n, al = e;
  }
  function Fu(e) {
    e.return !== null && (bl(e, 1), Sr(e, 1, 0));
  }
  function kc(e) {
    for (; e === ku; )
      ku = Jn[--$n], Jn[$n] = null, Xa = Jn[--$n], Jn[$n] = null;
    for (; e === Rl; )
      Rl = Yt[--Gt], Yt[Gt] = null, al = Yt[--Gt], Yt[Gt] = null, nl = Yt[--Gt], Yt[Gt] = null;
  }
  function zr(e, t) {
    Yt[Gt++] = nl, Yt[Gt++] = al, Yt[Gt++] = Rl, nl = t.id, al = t.overflow, Rl = e;
  }
  var Pe = null, Ne = null, ae = !1, Zl = null, Lt = !1, Fc = Error(f(519));
  function Hl(e) {
    var t = Error(
      f(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Va(Bt(t, e)), Fc;
  }
  function Tr(e) {
    var t = e.stateNode, l = e.type, n = e.memoizedProps;
    switch (t[Ie] = e, t[mt] = n, l) {
      case "dialog":
        ie("cancel", t), ie("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ie("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < hu.length; l++)
          ie(hu[l], t);
        break;
      case "source":
        ie("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ie("error", t), ie("load", t);
        break;
      case "details":
        ie("toggle", t);
        break;
      case "input":
        ie("invalid", t), Rs(
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
        ie("invalid", t);
        break;
      case "textarea":
        ie("invalid", t), Hs(t, n.value, n.defaultValue, n.children);
    }
    l = n.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || n.suppressHydrationWarning === !0 || Kh(t.textContent, l) ? (n.popover != null && (ie("beforetoggle", t), ie("toggle", t)), n.onScroll != null && ie("scroll", t), n.onScrollEnd != null && ie("scrollend", t), n.onClick != null && (t.onclick = vl), t = !0) : t = !1, t || Hl(e, !0);
  }
  function Er(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
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
          Pe = Pe.return;
      }
  }
  function kn(e) {
    if (e !== Pe) return !1;
    if (!ae) return Er(e), ae = !0, !1;
    var t = e.tag, l;
    if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Df(e.type, e.memoizedProps)), l = !l), l && Ne && Hl(e), Er(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      Ne = om(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      Ne = om(e);
    } else
      t === 27 ? (t = Ne, Wl(e.type) ? (e = qf, qf = null, Ne = e) : Ne = t) : Ne = Pe ? Qt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function vn() {
    Ne = Pe = null, ae = !1;
  }
  function Wc() {
    var e = Zl;
    return e !== null && (pt === null ? pt = e : pt.push.apply(
      pt,
      e
    ), Zl = null), e;
  }
  function Va(e) {
    Zl === null ? Zl = [e] : Zl.push(e);
  }
  var Ic = tl(null), yn = null, Sl = null;
  function ql(e, t, l) {
    Te(Ic, t._currentValue), t._currentValue = l;
  }
  function zl(e) {
    e._currentValue = Ic.current, We(Ic);
  }
  function Pc(e, t, l) {
    for (; e !== null; ) {
      var n = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, n !== null && (n.childLanes |= t)) : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t), e === l) break;
      e = e.return;
    }
  }
  function eo(e, t, l, n) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var i = u.dependencies;
      if (i !== null) {
        var s = u.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var r = i;
          i = u;
          for (var h = 0; h < t.length; h++)
            if (r.context === t[h]) {
              i.lanes |= l, r = i.alternate, r !== null && (r.lanes |= l), Pc(
                i.return,
                l,
                e
              ), n || (s = null);
              break e;
            }
          i = r.next;
        }
      } else if (u.tag === 18) {
        if (s = u.return, s === null) throw Error(f(341));
        s.lanes |= l, i = s.alternate, i !== null && (i.lanes |= l), Pc(s, l, e), s = null;
      } else s = u.child;
      if (s !== null) s.return = u;
      else
        for (s = u; s !== null; ) {
          if (s === e) {
            s = null;
            break;
          }
          if (u = s.sibling, u !== null) {
            u.return = s.return, s = u;
            break;
          }
          s = s.return;
        }
      u = s;
    }
  }
  function Fn(e, t, l, n) {
    e = null;
    for (var u = t, i = !1; u !== null; ) {
      if (!i) {
        if ((u.flags & 524288) !== 0) i = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var s = u.alternate;
        if (s === null) throw Error(f(387));
        if (s = s.memoizedProps, s !== null) {
          var r = u.type;
          Ot(u.pendingProps.value, s.value) || (e !== null ? e.push(r) : e = [r]);
        }
      } else if (u === Nu.current) {
        if (s = u.alternate, s === null) throw Error(f(387));
        s.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(ba) : e = [ba]);
      }
      u = u.return;
    }
    e !== null && eo(
      t,
      e,
      l,
      n
    ), t.flags |= 262144;
  }
  function Wu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ot(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function gn(e) {
    yn = e, Sl = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function et(e) {
    return Or(yn, e);
  }
  function Iu(e, t) {
    return yn === null && gn(e), Or(e, t);
  }
  function Or(e, t) {
    var l = t._currentValue;
    if (t = { context: t, memoizedValue: l, next: null }, Sl === null) {
      if (e === null) throw Error(f(308));
      Sl = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Sl = Sl.next = t;
    return l;
  }
  var Iv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Pv = a.unstable_scheduleCallback, ey = a.unstable_NormalPriority, Ge = {
    $$typeof: $e,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function to() {
    return {
      controller: new Iv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Qa(e) {
    e.refCount--, e.refCount === 0 && Pv(ey, function() {
      e.controller.abort();
    });
  }
  function Nr(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var l = e.transitionTypes;
      for (l === null && (l = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var n = t[e];
        l.indexOf(n) === -1 && l.push(n);
      }
    }
  }
  var Ka = null;
  function ty(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Ja = null, lo = 0, pn = 0, Wn = null;
  function ly(e, t) {
    if (Ja === null) {
      var l = Ja = [];
      lo = 0, pn = zf(), Wn = {
        status: "pending",
        value: void 0,
        then: function(n) {
          l.push(n);
        }
      };
    }
    return lo++, t.then(Ar, Ar), t;
  }
  function Ar() {
    if (--lo === 0 && (Ka = null, Ja !== null)) {
      Wn !== null && (Wn.status = "fulfilled");
      var e = Ja;
      Ja = null, pn = 0, Wn = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ny(e, t) {
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
  var xr = j.S;
  j.S = function(e, t) {
    if (bh = zt(), typeof t == "object" && t !== null && typeof t.then == "function" && ly(e, t), Ka !== null)
      for (var l = va; l !== null; )
        Nr(l, Ka), l = l.next;
    if (l = e.types, l !== null) {
      for (var n = va; n !== null; )
        Nr(n, l), n = n.next;
      if (pn !== 0) {
        n = Ka, n === null && (n = Ka = []);
        for (var u = 0; u < l.length; u++) {
          var i = l[u];
          n.indexOf(i) === -1 && n.push(i);
        }
      }
    }
    xr !== null && xr(e, t);
  };
  var _n = tl(null);
  function no() {
    var e = _n.current;
    return e !== null ? e : Se.pooledCache;
  }
  function Pu(e, t) {
    t === null ? Te(_n, _n.current) : Te(_n, t.pool);
  }
  function Mr() {
    var e = no();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var In = Error(f(460)), ao = Error(f(474)), ei = Error(f(542)), ti = { then: function() {
  } };
  function Cr(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Dr(e, t, l) {
    switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(vl, vl), t = l), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, jr(e), e;
      default:
        if (typeof t.status == "string") t.then(vl, vl);
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
            throw e = t.reason, jr(e), e;
        }
        throw Sn = t, In;
    }
  }
  function bn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Sn = l, In) : l;
    }
  }
  var Sn = null;
  function Ur() {
    if (Sn === null) throw Error(f(459));
    var e = Sn;
    return Sn = null, e;
  }
  function jr(e) {
    if (e === In || e === ei)
      throw Error(f(483));
  }
  var Pn = null, $a = 0;
  function li(e) {
    var t = $a;
    return $a += 1, Pn === null && (Pn = []), Dr(Pn, e, t);
  }
  function Bl(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ni(e, t) {
    throw t.$$typeof === ot ? Error(f(525)) : (e = Object.prototype.toString.call(t), Error(
      f(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function wr(e) {
    function t(_, y) {
      if (e) {
        var T = _.deletions;
        T === null ? (_.deletions = [y], _.flags |= 16) : T.push(y);
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
        _.key === null ? y.set(_.index, _) : y.set(_.key, _), _ = _.sibling;
      return y;
    }
    function u(_, y) {
      return _ = _l(_, y), _.index = 0, _.sibling = null, _;
    }
    function i(_, y, T) {
      return _.index = T, e ? (T = _.alternate, T !== null ? (T = T.index, T < y ? (_.flags |= 134217730, y) : T) : (_.flags |= 134217730, y)) : (_.flags |= 1048576, y);
    }
    function s(_) {
      return e && _.alternate === null && (_.flags |= 134217730), _;
    }
    function r(_, y, T, C) {
      return y === null || y.tag !== 6 ? (y = Jc(T, _.mode, C), y.return = _, y) : (y = u(y, T), y.return = _, y);
    }
    function h(_, y, T, C) {
      var L = T.type;
      return L === ut ? (_ = E(
        _,
        y,
        T.props.children,
        C,
        T.key
      ), Bl(_, T), _) : y !== null && (y.elementType === L || typeof L == "object" && L !== null && L.$$typeof === ne && bn(L) === y.type) ? (y = u(y, T.props), Bl(y, T), y.return = _, y) : (y = $u(
        T.type,
        T.key,
        T.props,
        null,
        _.mode,
        C
      ), Bl(y, T), y.return = _, y);
    }
    function p(_, y, T, C) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== T.containerInfo || y.stateNode.implementation !== T.implementation ? (y = $c(T, _.mode, C), y.return = _, y) : (y = u(y, T.children || []), y.return = _, y);
    }
    function E(_, y, T, C, L) {
      return y === null || y.tag !== 7 ? (y = mn(
        T,
        _.mode,
        C,
        L
      ), y.return = _, y) : (y = u(y, T), y.return = _, y);
    }
    function x(_, y, T) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = Jc(
          "" + y,
          _.mode,
          T
        ), y.return = _, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case ce:
            return T = $u(
              y.type,
              y.key,
              y.props,
              null,
              _.mode,
              T
            ), Bl(T, y), T.return = _, T;
          case at:
            return y = $c(
              y,
              _.mode,
              T
            ), y.return = _, y;
          case ne:
            return y = bn(y), x(_, y, T);
        }
        if (J(y) || M(y))
          return y = mn(
            y,
            _.mode,
            T,
            null
          ), y.return = _, y;
        if (typeof y.then == "function")
          return x(_, li(y), T);
        if (y.$$typeof === $e)
          return x(
            _,
            Iu(_, y),
            T
          );
        ni(_, y);
      }
      return null;
    }
    function b(_, y, T, C) {
      var L = y !== null ? y.key : null;
      if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
        return L !== null ? null : r(_, y, "" + T, C);
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ce:
            return T.key === L ? h(_, y, T, C) : null;
          case at:
            return T.key === L ? p(_, y, T, C) : null;
          case ne:
            return T = bn(T), b(_, y, T, C);
        }
        if (J(T) || M(T))
          return L !== null ? null : E(_, y, T, C, null);
        if (typeof T.then == "function")
          return b(
            _,
            y,
            li(T),
            C
          );
        if (T.$$typeof === $e)
          return b(
            _,
            y,
            Iu(_, T),
            C
          );
        ni(_, T);
      }
      return null;
    }
    function S(_, y, T, C, L) {
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return _ = _.get(T) || null, r(y, _, "" + C, L);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case ce:
            return _ = _.get(
              C.key === null ? T : C.key
            ) || null, h(y, _, C, L);
          case at:
            return _ = _.get(
              C.key === null ? T : C.key
            ) || null, p(y, _, C, L);
          case ne:
            return C = bn(C), S(
              _,
              y,
              T,
              C,
              L
            );
        }
        if (J(C) || M(C))
          return _ = _.get(T) || null, E(y, _, C, L, null);
        if (typeof C.then == "function")
          return S(
            _,
            y,
            T,
            li(C),
            L
          );
        if (C.$$typeof === $e)
          return S(
            _,
            y,
            T,
            Iu(y, C),
            L
          );
        ni(y, C);
      }
      return null;
    }
    function q(_, y, T, C) {
      for (var L = null, fe = null, V = y, k = y = 0, Ve = null; V !== null && k < T.length; k++) {
        V.index > k ? (Ve = V, V = null) : Ve = V.sibling;
        var se = b(
          _,
          V,
          T[k],
          C
        );
        if (se === null) {
          V === null && (V = Ve);
          break;
        }
        e && V && se.alternate === null && t(_, V), y = i(se, y, k), fe === null ? L = se : fe.sibling = se, fe = se, V = Ve;
      }
      if (k === T.length)
        return l(_, V), ae && bl(_, k), L;
      if (V === null) {
        for (; k < T.length; k++)
          V = x(_, T[k], C), V !== null && (y = i(
            V,
            y,
            k
          ), fe === null ? L = V : fe.sibling = V, fe = V);
        return ae && bl(_, k), L;
      }
      for (V = n(V); k < T.length; k++)
        Ve = S(
          V,
          _,
          k,
          T[k],
          C
        ), Ve !== null && (e && (se = Ve.alternate, se !== null && V.delete(se.key === null ? k : se.key)), y = i(
          Ve,
          y,
          k
        ), fe === null ? L = Ve : fe.sibling = Ve, fe = Ve);
      return e && V.forEach(function(ln) {
        return t(_, ln);
      }), ae && bl(_, k), L;
    }
    function G(_, y, T, C) {
      if (T == null) throw Error(f(151));
      for (var L = null, fe = null, V = y, k = y = 0, Ve = null, se = T.next(); V !== null && !se.done; k++, se = T.next()) {
        V.index > k ? (Ve = V, V = null) : Ve = V.sibling;
        var ln = b(_, V, se.value, C);
        if (ln === null) {
          V === null && (V = Ve);
          break;
        }
        e && V && ln.alternate === null && t(_, V), y = i(ln, y, k), fe === null ? L = ln : fe.sibling = ln, fe = ln, V = Ve;
      }
      if (se.done)
        return l(_, V), ae && bl(_, k), L;
      if (V === null) {
        for (; !se.done; k++, se = T.next())
          se = x(_, se.value, C), se !== null && (y = i(se, y, k), fe === null ? L = se : fe.sibling = se, fe = se);
        return ae && bl(_, k), L;
      }
      for (V = n(V); !se.done; k++, se = T.next())
        se = S(V, _, k, se.value, C), se !== null && (e && (Ve = se.alternate, Ve !== null && V.delete(
          Ve.key === null ? k : Ve.key
        )), y = i(se, y, k), fe === null ? L = se : fe.sibling = se, fe = se);
      return e && V.forEach(function(Mg) {
        return t(_, Mg);
      }), ae && bl(_, k), L;
    }
    function P(_, y, T, C) {
      if (typeof T == "object" && T !== null && T.type === ut && T.key === null && T.props.ref === void 0 && (T = T.props.children), typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case ce:
            e: {
              for (var L = T.key; y !== null; ) {
                if (y.key === L) {
                  if (L = T.type, L === ut) {
                    if (y.tag === 7) {
                      l(
                        _,
                        y.sibling
                      ), C = u(
                        y,
                        T.props.children
                      ), Bl(C, T), C.return = _, _ = C;
                      break e;
                    }
                  } else if (y.elementType === L || typeof L == "object" && L !== null && L.$$typeof === ne && bn(L) === y.type) {
                    l(
                      _,
                      y.sibling
                    ), C = u(y, T.props), Bl(C, T), C.return = _, _ = C;
                    break e;
                  }
                  l(_, y);
                  break;
                } else t(_, y);
                y = y.sibling;
              }
              T.type === ut ? (C = mn(
                T.props.children,
                _.mode,
                C,
                T.key
              ), Bl(C, T), C.return = _, _ = C) : (C = $u(
                T.type,
                T.key,
                T.props,
                null,
                _.mode,
                C
              ), Bl(C, T), C.return = _, _ = C);
            }
            return s(_);
          case at:
            e: {
              for (L = T.key; y !== null; ) {
                if (y.key === L)
                  if (y.tag === 4 && y.stateNode.containerInfo === T.containerInfo && y.stateNode.implementation === T.implementation) {
                    l(
                      _,
                      y.sibling
                    ), C = u(y, T.children || []), C.return = _, _ = C;
                    break e;
                  } else {
                    l(_, y);
                    break;
                  }
                else t(_, y);
                y = y.sibling;
              }
              C = $c(T, _.mode, C), C.return = _, _ = C;
            }
            return s(_);
          case ne:
            return T = bn(T), P(
              _,
              y,
              T,
              C
            );
        }
        if (J(T))
          return q(
            _,
            y,
            T,
            C
          );
        if (M(T)) {
          if (L = M(T), typeof L != "function") throw Error(f(150));
          return T = L.call(T), G(
            _,
            y,
            T,
            C
          );
        }
        if (typeof T.then == "function")
          return P(
            _,
            y,
            li(T),
            C
          );
        if (T.$$typeof === $e)
          return P(
            _,
            y,
            Iu(_, T),
            C
          );
        ni(_, T);
      }
      return typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint" ? (T = "" + T, y !== null && y.tag === 6 ? (l(_, y.sibling), C = u(y, T), C.return = _, _ = C) : (l(_, y), C = Jc(T, _.mode, C), C.return = _, _ = C), s(_)) : l(_, y);
    }
    return function(_, y, T, C) {
      try {
        $a = 0;
        var L = P(
          _,
          y,
          T,
          C
        );
        return Pn = null, L;
      } catch (V) {
        if (V === In || V === ei) throw V;
        var fe = yt(29, V, null, _.mode);
        return fe.lanes = C, fe.return = _, fe;
      }
    };
  }
  var zn = wr(!0), Rr = wr(!1), Yl = !1;
  function uo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function io(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Gl(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(e, t, l) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (n = n.shared, (de & 2) !== 0) {
      var u = n.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), n.pending = t, t = Ju(e), gr(e, null, l), t;
    }
    return Ku(e, n, t, l), Ju(e);
  }
  function ka(e, t, l) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, Ts(e, l);
    }
  }
  function co(e, t) {
    var l = e.updateQueue, n = e.alternate;
    if (n !== null && (n = n.updateQueue, l === n)) {
      var u = null, i = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var s = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          i === null ? u = i = s : i = i.next = s, l = l.next;
        } while (l !== null);
        i === null ? u = i = t : i = i.next = t;
      } else u = i = t;
      l = {
        baseState: n.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: i,
        shared: n.shared,
        callbacks: n.callbacks
      }, e.updateQueue = l;
      return;
    }
    e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
  }
  var oo = !1;
  function Fa() {
    if (oo) {
      var e = Wn;
      if (e !== null) throw e;
    }
  }
  function Wa(e, t, l, n) {
    oo = !1;
    var u = e.updateQueue;
    Yl = !1;
    var i = u.firstBaseUpdate, s = u.lastBaseUpdate, r = u.shared.pending;
    if (r !== null) {
      u.shared.pending = null;
      var h = r, p = h.next;
      h.next = null, s === null ? i = p : s.next = p, s = h;
      var E = e.alternate;
      E !== null && (E = E.updateQueue, r = E.lastBaseUpdate, r !== s && (r === null ? E.firstBaseUpdate = p : r.next = p, E.lastBaseUpdate = h));
    }
    if (i !== null) {
      var x = u.baseState;
      s = 0, E = p = h = null, r = i;
      do {
        var b = r.lane & -536870913, S = b !== r.lane;
        if (S ? (oe & b) === b : (n & b) === b) {
          b !== 0 && b === pn && (oo = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          e: {
            var q = e, G = r;
            b = t;
            var P = l;
            switch (G.tag) {
              case 1:
                if (q = G.payload, typeof q == "function") {
                  x = q.call(P, x, b);
                  break e;
                }
                x = q;
                break e;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = G.payload, b = typeof q == "function" ? q.call(P, x, b) : q, b == null) break e;
                x = te({}, x, b);
                break e;
              case 2:
                Yl = !0;
            }
          }
          b = r.callback, b !== null && (e.flags |= 64, S && (e.flags |= 8192), S = u.callbacks, S === null ? u.callbacks = [b] : S.push(b));
        } else
          S = {
            lane: b,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, E === null ? (p = E = S, h = x) : E = E.next = S, s |= b;
        if (r = r.next, r === null) {
          if (r = u.shared.pending, r === null)
            break;
          S = r, r = S.next, S.next = null, u.lastBaseUpdate = S, u.shared.pending = null;
        }
      } while (!0);
      E === null && (h = x), u.baseState = h, u.firstBaseUpdate = p, u.lastBaseUpdate = E, i === null && (u.shared.lanes = 0), Jl |= s, e.lanes = s, e.memoizedState = x;
    }
  }
  function Zr(e, t) {
    if (typeof e != "function")
      throw Error(f(191, e));
    e.call(t);
  }
  function Hr(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++)
        Zr(l[e], t);
  }
  var ea = tl(null), ai = tl(0);
  function qr(e, t) {
    e = xl, Te(ai, e), Te(ea, t), xl = e | t.baseLanes;
  }
  function fo() {
    Te(ai, xl), Te(ea, ea.current);
  }
  function so() {
    xl = ai.current, We(ea), We(ai);
  }
  var tt = tl(null), it = null;
  function Xl(e) {
    var t = e.alternate;
    Te(lt, lt.current & 1), Te(tt, e), it === null && (t === null || ea.current !== null || t.memoizedState !== null) && (it = e);
  }
  function ro(e) {
    Te(lt, lt.current), Te(tt, e), it === null && (it = e);
  }
  function Br(e) {
    e.tag === 22 ? (Te(lt, lt.current), Te(tt, e), it === null && (it = e)) : Vl();
  }
  function Vl() {
    Te(lt, lt.current), Te(tt, tt.current);
  }
  function Nt(e) {
    We(tt), it === e && (it = null), We(lt);
  }
  var lt = tl(0);
  function Ia(e, t) {
    Te(tt, tt.current), Te(lt, t);
  }
  function ho(e) {
    We(lt), We(tt), it === e && (it = null);
  }
  function ui(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Zf(l) || Hf(l)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
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
  var Tl = 0, I = null, pe = null, Le = null, ii = !1, ta = !1, Tn = !1, ci = 0, Pa = 0, la = null, ay = 0;
  function we() {
    throw Error(f(321));
  }
  function mo(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!Ot(e[l], t[l])) return !1;
    return !0;
  }
  function vo(e, t, l, n, u, i) {
    return Tl = i, I = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? zd : Co, Tn = !1, i = l(n, u), Tn = !1, ta && (i = Gr(
      t,
      l,
      n,
      u
    )), Yr(e), i;
  }
  function Yr(e) {
    j.H = lu;
    var t = pe !== null && pe.next !== null;
    if (Tl = 0, Le = pe = I = null, ii = !1, Pa = 0, la = null, t) throw Error(f(300));
    e === null || Xe || (e = e.dependencies, e !== null && Wu(e) && (Xe = !0));
  }
  function Gr(e, t, l, n) {
    I = e;
    var u = 0;
    do {
      if (ta && (la = null), Pa = 0, ta = !1, 25 <= u) throw Error(f(301));
      if (u += 1, Le = pe = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      j.H = Td, i = t(l, n);
    } while (ta);
    return i;
  }
  function uy() {
    var e = j.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? eu(t) : t, e = e.useState()[0], (pe !== null ? pe.memoizedState : null) !== e && (I.flags |= 1024), t;
  }
  function yo() {
    var e = ci !== 0;
    return ci = 0, e;
  }
  function go(e, t, l) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
  }
  function po(e) {
    if (ii) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ii = !1;
    }
    Tl = 0, Le = pe = I = null, ta = !1, Pa = ci = 0, la = null;
  }
  function ft() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Le === null ? I.memoizedState = Le = e : Le = Le.next = e, Le;
  }
  function qe() {
    if (pe === null) {
      var e = I.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = pe.next;
    var t = Le === null ? I.memoizedState : Le.next;
    if (t !== null)
      Le = t, pe = e;
    else {
      if (e === null)
        throw I.alternate === null ? Error(f(467)) : Error(f(310));
      pe = e, e = {
        memoizedState: pe.memoizedState,
        baseState: pe.baseState,
        baseQueue: pe.baseQueue,
        queue: pe.queue,
        next: null
      }, Le === null ? I.memoizedState = Le = e : Le = Le.next = e;
    }
    return Le;
  }
  function oi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function eu(e) {
    var t = Pa;
    return Pa += 1, la === null && (la = []), e = Dr(la, e, t), t = I, (Le === null ? t.memoizedState : Le.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? zd : Co), e;
  }
  function fi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return eu(e);
      if (e.$$typeof === $e) return et(e);
    }
    throw Error(f(438, String(e)));
  }
  function _o(e) {
    var t = null, l = I.updateQueue;
    if (l !== null && (t = l.memoCache), t == null) {
      var n = I.alternate;
      n !== null && (n = n.updateQueue, n !== null && (n = n.memoCache, n != null && (t = {
        data: n.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), l === null && (l = oi(), I.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
      for (l = t.data[t.index] = Array(e), n = 0; n < e; n++)
        l[n] = St;
    return t.index++, l;
  }
  function El(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function si(e) {
    var t = qe();
    return bo(t, pe, e);
  }
  function bo(e, t, l) {
    var n = e.queue;
    if (n === null) throw Error(f(311));
    n.lastRenderedReducer = l;
    var u = e.baseQueue, i = n.pending;
    if (i !== null) {
      if (u !== null) {
        var s = u.next;
        u.next = i.next, i.next = s;
      }
      t.baseQueue = u = i, n.pending = null;
    }
    if (i = e.baseState, u === null) e.memoizedState = i;
    else {
      t = u.next;
      var r = s = null, h = null, p = t, E = !1;
      do {
        var x = p.lane & -536870913;
        if (x !== p.lane ? (oe & x) === x : (Tl & x) === x) {
          var b = p.revertLane;
          if (b === 0)
            h !== null && (h = h.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }), x === pn && (E = !0);
          else if ((Tl & b) === b) {
            p = p.next, b === pn && (E = !0);
            continue;
          } else
            x = {
              lane: 0,
              revertLane: p.revertLane,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null
            }, h === null ? (r = h = x, s = i) : h = h.next = x, I.lanes |= b, Jl |= b;
          x = p.action, Tn && l(i, x), i = p.hasEagerState ? p.eagerState : l(i, x);
        } else
          b = {
            lane: x,
            revertLane: p.revertLane,
            gesture: p.gesture,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null
          }, h === null ? (r = h = b, s = i) : h = h.next = b, I.lanes |= x, Jl |= x;
        p = p.next;
      } while (p !== null && p !== t);
      if (h === null ? s = i : h.next = r, !Ot(i, e.memoizedState) && (Xe = !0, E && (l = Wn, l !== null)))
        throw l;
      e.memoizedState = i, e.baseState = s, e.baseQueue = h, n.lastRenderedState = i;
    }
    return u === null && (n.lanes = 0), [e.memoizedState, n.dispatch];
  }
  function So(e) {
    var t = qe(), l = t.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = e;
    var n = l.dispatch, u = l.pending, i = t.memoizedState;
    if (u !== null) {
      l.pending = null;
      var s = u = u.next;
      do
        i = e(i, s.action), s = s.next;
      while (s !== u);
      Ot(i, t.memoizedState) || (Xe = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), l.lastRenderedState = i;
    }
    return [i, n];
  }
  function Lr(e, t, l) {
    var n = I, u = qe(), i = ae;
    if (i) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else l = t();
    var s = !Ot(
      (pe || u).memoizedState,
      l
    );
    if (s && (u.memoizedState = l, Xe = !0), u = u.queue, Eo(Qr.bind(null, n, u, e), [
      e
    ]), u.getSnapshot !== t || s || Le !== null && Le.memoizedState.tag & 1) {
      if (n.flags |= 2048, na(
        9,
        { destroy: void 0 },
        Vr.bind(
          null,
          n,
          u,
          l,
          t
        ),
        null
      ), Se === null) throw Error(f(349));
      i || (Tl & 127) !== 0 || Xr(n, t, l);
    }
    return l;
  }
  function Xr(e, t, l) {
    e.flags |= 16384, e = { getSnapshot: t, value: l }, t = I.updateQueue, t === null ? (t = oi(), I.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e));
  }
  function Vr(e, t, l, n) {
    t.value = l, t.getSnapshot = n, Kr(t) && Jr(e);
  }
  function Qr(e, t, l) {
    return l(function() {
      Kr(t) && Jr(e);
    });
  }
  function Kr(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !Ot(e, l);
    } catch {
      return !0;
    }
  }
  function Jr(e) {
    var t = hn(e, 2);
    t !== null && _t(t, e, 2);
  }
  function zo(e) {
    var t = ft();
    if (typeof e == "function") {
      var l = e;
      if (e = l(), Tn) {
        Ul(!0);
        try {
          l();
        } finally {
          Ul(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: El,
      lastRenderedState: e
    }, t;
  }
  function $r(e, t, l, n) {
    return e.baseState = l, bo(
      e,
      pe,
      typeof n == "function" ? n : El
    );
  }
  function iy(e, t, l, n, u) {
    if (hi(e)) throw Error(f(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      j.T !== null ? l(!0) : i.isTransition = !1, n(i), l = t.pending, l === null ? (i.next = t.pending = i, kr(t, i)) : (i.next = l.next, t.pending = l.next = i);
    }
  }
  function kr(e, t) {
    var l = t.action, n = t.payload, u = e.state;
    if (t.isTransition) {
      var i = j.T, s = {};
      s.types = i !== null ? i.types : null, j.T = s;
      try {
        var r = l(u, n), h = j.S;
        h !== null && h(s, r), Fr(e, t, r);
      } catch (p) {
        To(e, t, p);
      } finally {
        i !== null && s.types !== null && (i.types = s.types), j.T = i;
      }
    } else
      try {
        i = l(u, n), Fr(e, t, i);
      } catch (p) {
        To(e, t, p);
      }
  }
  function Fr(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(
      function(n) {
        Wr(e, t, n);
      },
      function(n) {
        return To(e, t, n);
      }
    ) : Wr(e, t, l);
  }
  function Wr(e, t, l) {
    t.status = "fulfilled", t.value = l, Ir(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, kr(e, l)));
  }
  function To(e, t, l) {
    var n = e.pending;
    if (e.pending = null, n !== null) {
      n = n.next;
      do
        t.status = "rejected", t.reason = l, Ir(t), t = t.next;
      while (t !== n);
    }
    e.action = null;
  }
  function Ir(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Pr(e, t) {
    return t;
  }
  function ed(e, t) {
    if (ae) {
      var l = Se.formState;
      if (l !== null) {
        e: {
          var n = I;
          if (ae) {
            if (Ne) {
              t: {
                for (var u = Ne, i = Lt; u.nodeType !== 8; ) {
                  if (!i) {
                    u = null;
                    break t;
                  }
                  if (u = Qt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                i = u.data, u = i === "F!" || i === "F" ? u : null;
              }
              if (u) {
                Ne = Qt(
                  u.nextSibling
                ), n = u.data === "F!";
                break e;
              }
            }
            Hl(n);
          }
          n = !1;
        }
        n && (t = l[0]);
      }
    }
    return l = ft(), l.memoizedState = l.baseState = t, n = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pr,
      lastRenderedState: t
    }, l.queue = n, l = _d.bind(
      null,
      I,
      n
    ), n.dispatch = l, n = zo(!1), i = Mo.bind(
      null,
      I,
      !1,
      n.queue
    ), n = ft(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, n.queue = u, l = iy.bind(
      null,
      I,
      u,
      i,
      l
    ), u.dispatch = l, n.memoizedState = e, [t, l, !1];
  }
  function td(e) {
    var t = qe();
    return ld(t, pe, e);
  }
  function ld(e, t, l) {
    if (t = bo(
      e,
      t,
      Pr
    )[0], e = si(El)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var n = eu(t);
      } catch (s) {
        throw s === In ? ei : s;
      }
    else n = t;
    t = qe();
    var u = t.queue, i = u.dispatch;
    return l !== t.memoizedState && (I.flags |= 2048, na(
      9,
      { destroy: void 0 },
      cy.bind(null, u, l),
      null
    )), [n, i, e];
  }
  function cy(e, t) {
    e.action = t;
  }
  function nd(e) {
    var t = qe(), l = pe;
    if (l !== null)
      return ld(t, l, e);
    qe(), t = t.memoizedState, l = qe();
    var n = l.queue.dispatch;
    return l.memoizedState = e, [t, n, !1];
  }
  function na(e, t, l, n) {
    return e = { tag: e, create: l, deps: n, inst: t, next: null }, t = I.updateQueue, t === null && (t = oi(), I.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (n = l.next, l.next = e, e.next = n, t.lastEffect = e), e;
  }
  function ad() {
    return qe().memoizedState;
  }
  function ri(e, t, l, n) {
    var u = ft();
    I.flags |= e, u.memoizedState = na(
      1 | t,
      { destroy: void 0 },
      l,
      n === void 0 ? null : n
    );
  }
  function di(e, t, l, n) {
    var u = qe();
    n = n === void 0 ? null : n;
    var i = u.memoizedState.inst;
    pe !== null && n !== null && mo(n, pe.memoizedState.deps) ? u.memoizedState = na(t, i, l, n) : (I.flags |= e, u.memoizedState = na(
      1 | t,
      i,
      l,
      n
    ));
  }
  function ud(e, t) {
    ri(8390656, 8, e, t);
  }
  function Eo(e, t) {
    di(2048, 8, e, t);
  }
  function oy(e) {
    I.flags |= 4;
    var t = I.updateQueue;
    if (t === null)
      t = oi(), I.updateQueue = t, t.events = [e];
    else {
      var l = t.events;
      l === null ? t.events = [e] : l.push(e);
    }
  }
  function id(e) {
    var t = qe().memoizedState;
    return oy({ ref: t, nextImpl: e }), function() {
      if ((de & 2) !== 0) throw Error(f(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function cd(e, t) {
    return di(4, 2, e, t);
  }
  function od(e, t) {
    return di(4, 4, e, t);
  }
  function fd(e, t) {
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
  function sd(e, t, l) {
    l = l != null ? l.concat([e]) : null, di(4, 4, fd.bind(null, t, e), l);
  }
  function Oo() {
  }
  function rd(e, t) {
    var l = qe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    return t !== null && mo(t, n[1]) ? n[0] : (l.memoizedState = [e, t], e);
  }
  function dd(e, t) {
    var l = qe();
    t = t === void 0 ? null : t;
    var n = l.memoizedState;
    if (t !== null && mo(t, n[1]))
      return n[0];
    if (n = e(), Tn) {
      Ul(!0);
      try {
        e();
      } finally {
        Ul(!1);
      }
    }
    return l.memoizedState = [n, t], n;
  }
  function No(e, t, l) {
    return l === void 0 || (Tl & 1073741824) !== 0 && (oe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = zh(), I.lanes |= e, Jl |= e, l);
  }
  function hd(e, t, l, n) {
    return Ot(l, t) ? l : ea.current !== null ? (e = No(e, l, n), Ot(e, t) || (Xe = !0), e) : (Tl & 42) === 0 || (Tl & 1073741824) !== 0 && (oe & 261930) === 0 ? (Xe = !0, e.memoizedState = l) : (e = zh(), I.lanes |= e, Jl |= e, t);
  }
  function md(e, t, l, n, u) {
    var i = H.p;
    H.p = i !== 0 && 8 > i ? i : 8;
    var s = j.T, r = {};
    r.types = s !== null ? s.types : null, j.T = r, Mo(e, !1, t, l);
    try {
      var h = u(), p = j.S;
      if (p !== null && p(r, h), h !== null && typeof h == "object" && typeof h.then == "function") {
        var E = ny(
          h,
          n
        );
        tu(
          e,
          t,
          E,
          Ct(e)
        );
      } else
        tu(
          e,
          t,
          n,
          Ct(e)
        );
    } catch (x) {
      tu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: x },
        Ct()
      );
    } finally {
      H.p = i, s !== null && r.types !== null && (s.types = r.types), j.T = s;
    }
  }
  function fy() {
  }
  function Ao(e, t, l, n) {
    if (e.tag !== 5) throw Error(f(476));
    var u = vd(e).queue;
    md(
      e,
      u,
      t,
      be,
      l === null ? fy : function() {
        return yd(e), l(n);
      }
    );
  }
  function vd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: be,
      baseState: be,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: El,
        lastRenderedState: be
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
        lastRenderedReducer: El,
        lastRenderedState: l
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function yd(e) {
    var t = vd(e);
    t.next === null && (t = e.alternate.memoizedState), tu(
      e,
      t.next.queue,
      {},
      Ct()
    );
  }
  function xo() {
    return et(ba);
  }
  function gd() {
    return qe().memoizedState;
  }
  function pd() {
    return qe().memoizedState;
  }
  function sy(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = Ct();
          e = Gl(l);
          var n = Ll(t, e, l);
          n !== null && (_t(n, t, l), ka(n, t, l)), t = { cache: to() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ry(e, t, l) {
    var n = Ct();
    l = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hi(e) ? bd(t, l) : (l = Qc(e, t, l, n), l !== null && (_t(l, e, n), Sd(l, t, n)));
  }
  function _d(e, t, l) {
    var n = Ct();
    tu(e, t, l, n);
  }
  function tu(e, t, l, n) {
    var u = {
      lane: n,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (hi(e)) bd(t, u);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var s = t.lastRenderedState, r = i(s, l);
          if (u.hasEagerState = !0, u.eagerState = r, Ot(r, s))
            return Ku(e, t, u, 0), Se === null && Qu(), !1;
        } catch {
        }
      if (l = Qc(e, t, u, n), l !== null)
        return _t(l, e, n), Sd(l, t, n), !0;
    }
    return !1;
  }
  function Mo(e, t, l, n) {
    if (n = {
      lane: 2,
      revertLane: zf(),
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, hi(e)) {
      if (t) throw Error(f(479));
    } else
      t = Qc(
        e,
        l,
        n,
        2
      ), t !== null && _t(t, e, 2);
  }
  function hi(e) {
    var t = e.alternate;
    return e === I || t !== null && t === I;
  }
  function bd(e, t) {
    ta = ii = !0;
    var l = e.pending;
    l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
  }
  function Sd(e, t, l) {
    if ((l & 4194048) !== 0) {
      var n = t.lanes;
      n &= e.pendingLanes, l |= n, t.lanes = l, Ts(e, l);
    }
  }
  var lu = {
    readContext: et,
    use: fi,
    useCallback: we,
    useContext: we,
    useEffect: we,
    useImperativeHandle: we,
    useLayoutEffect: we,
    useInsertionEffect: we,
    useMemo: we,
    useReducer: we,
    useRef: we,
    useState: we,
    useDebugValue: we,
    useDeferredValue: we,
    useTransition: we,
    useSyncExternalStore: we,
    useId: we,
    useHostTransitionStatus: we,
    useFormState: we,
    useActionState: we,
    useOptimistic: we,
    useMemoCache: we,
    useCacheRefresh: we
  };
  lu.useEffectEvent = we;
  var zd = {
    readContext: et,
    use: fi,
    useCallback: function(e, t) {
      return ft().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: et,
    useEffect: ud,
    useImperativeHandle: function(e, t, l) {
      l = l != null ? l.concat([e]) : null, ri(
        4194308,
        4,
        fd.bind(null, t, e),
        l
      );
    },
    useLayoutEffect: function(e, t) {
      return ri(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      ri(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var l = ft();
      t = t === void 0 ? null : t;
      var n = e();
      if (Tn) {
        Ul(!0);
        try {
          e();
        } finally {
          Ul(!1);
        }
      }
      return l.memoizedState = [n, t], n;
    },
    useReducer: function(e, t, l) {
      var n = ft();
      if (l !== void 0) {
        var u = l(t);
        if (Tn) {
          Ul(!0);
          try {
            l(t);
          } finally {
            Ul(!1);
          }
        }
      } else u = t;
      return n.memoizedState = n.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, n.queue = e, e = e.dispatch = ry.bind(
        null,
        I,
        e
      ), [n.memoizedState, e];
    },
    useRef: function(e) {
      var t = ft();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = zo(e);
      var t = e.queue, l = _d.bind(null, I, t);
      return t.dispatch = l, [e.memoizedState, l];
    },
    useDebugValue: Oo,
    useDeferredValue: function(e, t) {
      var l = ft();
      return No(l, e, t);
    },
    useTransition: function() {
      var e = zo(!1);
      return e = md.bind(
        null,
        I,
        e.queue,
        !0,
        !1
      ), ft().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, l) {
      var n = I, u = ft();
      if (ae) {
        if (l === void 0)
          throw Error(f(407));
        l = l();
      } else {
        if (l = t(), Se === null)
          throw Error(f(349));
        (oe & 127) !== 0 || Xr(n, t, l);
      }
      u.memoizedState = l;
      var i = { value: l, getSnapshot: t };
      return u.queue = i, ud(Qr.bind(null, n, i, e), [
        e
      ]), n.flags |= 2048, na(
        9,
        { destroy: void 0 },
        Vr.bind(
          null,
          n,
          i,
          l,
          t
        ),
        null
      ), l;
    },
    useId: function() {
      var e = ft(), t = Se.identifierPrefix;
      if (ae) {
        var l = al, n = nl;
        l = (n & ~(1 << 32 - Et(n) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = ci++, 0 < l && (t += "H" + l.toString(32)), t += "_";
      } else
        l = ay++, t = "_" + t + "r_" + l.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: xo,
    useFormState: ed,
    useActionState: ed,
    useOptimistic: function(e) {
      var t = ft();
      t.memoizedState = t.baseState = e;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = l, t = Mo.bind(
        null,
        I,
        !0,
        l
      ), l.dispatch = t, [e, t];
    },
    useMemoCache: _o,
    useCacheRefresh: function() {
      return ft().memoizedState = sy.bind(
        null,
        I
      );
    },
    useEffectEvent: function(e) {
      var t = ft(), l = { impl: e };
      return t.memoizedState = l, function() {
        if ((de & 2) !== 0)
          throw Error(f(440));
        return l.impl.apply(void 0, arguments);
      };
    }
  }, Co = {
    readContext: et,
    use: fi,
    useCallback: rd,
    useContext: et,
    useEffect: Eo,
    useImperativeHandle: sd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: dd,
    useReducer: si,
    useRef: ad,
    useState: function() {
      return si(El);
    },
    useDebugValue: Oo,
    useDeferredValue: function(e, t) {
      var l = qe();
      return hd(
        l,
        pe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = si(El)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : eu(e),
        t
      ];
    },
    useSyncExternalStore: Lr,
    useId: gd,
    useHostTransitionStatus: xo,
    useFormState: td,
    useActionState: td,
    useOptimistic: function(e, t) {
      var l = qe();
      return $r(l, pe, e, t);
    },
    useMemoCache: _o,
    useCacheRefresh: pd
  };
  Co.useEffectEvent = id;
  var Td = {
    readContext: et,
    use: fi,
    useCallback: rd,
    useContext: et,
    useEffect: Eo,
    useImperativeHandle: sd,
    useInsertionEffect: cd,
    useLayoutEffect: od,
    useMemo: dd,
    useReducer: So,
    useRef: ad,
    useState: function() {
      return So(El);
    },
    useDebugValue: Oo,
    useDeferredValue: function(e, t) {
      var l = qe();
      return pe === null ? No(l, e, t) : hd(
        l,
        pe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = So(El)[0], t = qe().memoizedState;
      return [
        typeof e == "boolean" ? e : eu(e),
        t
      ];
    },
    useSyncExternalStore: Lr,
    useId: gd,
    useHostTransitionStatus: xo,
    useFormState: nd,
    useActionState: nd,
    useOptimistic: function(e, t) {
      var l = qe();
      return pe !== null ? $r(l, pe, e, t) : (l.baseState = e, [e, l.queue.dispatch]);
    },
    useMemoCache: _o,
    useCacheRefresh: pd
  };
  Td.useEffectEvent = id;
  function Do(e, t, l, n) {
    t = e.memoizedState, l = l(n, t), l = l == null ? t : te({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
  }
  var Uo = {
    enqueueSetState: function(e, t, l) {
      e = e._reactInternals;
      var n = Ct(), u = Gl(n);
      u.payload = t, l != null && (u.callback = l), t = Ll(e, u, n), t !== null && (_t(t, e, n), ka(t, e, n));
    },
    enqueueReplaceState: function(e, t, l) {
      e = e._reactInternals;
      var n = Ct(), u = Gl(n);
      u.tag = 1, u.payload = t, l != null && (u.callback = l), t = Ll(e, u, n), t !== null && (_t(t, e, n), ka(t, e, n));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var l = Ct(), n = Gl(l);
      n.tag = 2, t != null && (n.callback = t), t = Ll(e, n, l), t !== null && (_t(t, e, l), ka(t, e, l));
    }
  };
  function Ed(e, t, l, n, u, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(n, i, s) : t.prototype && t.prototype.isPureReactComponent ? !Ga(l, n) || !Ga(u, i) : !0;
  }
  function Od(e, t, l, n) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, n), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, n), t.state !== e && Uo.enqueueReplaceState(t, t.state, null);
  }
  function En(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var n in t)
        n !== "ref" && (l[n] = t[n]);
    }
    if (e = e.defaultProps) {
      l === t && (l = te({}, l));
      for (var u in e)
        l[u] === void 0 && (l[u] = e[u]);
    }
    return l;
  }
  function Nd(e) {
    Vu(e);
  }
  function Ad(e) {
    console.error(e);
  }
  function xd(e) {
    Vu(e);
  }
  function mi(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Md(e, t, l) {
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
  function jo(e, t, l) {
    return l = Gl(l), l.tag = 3, l.payload = { element: null }, l.callback = function() {
      mi(e, t);
    }, l;
  }
  function Cd(e) {
    return e = Gl(e), e.tag = 3, e;
  }
  function Dd(e, t, l, n) {
    var u = l.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var i = n.value;
      e.payload = function() {
        return u(i);
      }, e.callback = function() {
        Md(t, l, n);
      };
    }
    var s = l.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      Md(t, l, n), typeof u != "function" && ($l === null ? $l = /* @__PURE__ */ new Set([this]) : $l.add(this));
      var r = n.stack;
      this.componentDidCatch(n.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function dy(e, t, l, n, u) {
    if (l.flags |= 32768, n !== null && typeof n == "object" && typeof n.then == "function") {
      if (t = l.alternate, t !== null && Fn(
        t,
        l,
        u,
        !0
      ), l = tt.current, l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
          case 19:
            return it === null ? Ui() : l.alternate === null && Ze === 0 && (Ze = 3), l.flags &= -257, l.flags |= 65536, l.lanes = u, n === ti ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = /* @__PURE__ */ new Set([n]) : t.add(n), _f(e, n, u)), !1;
          case 22:
            return l.flags |= 65536, n === ti ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([n])
            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = /* @__PURE__ */ new Set([n]) : l.add(n)), _f(e, n, u)), !1;
        }
        throw Error(f(435, l.tag));
      }
      return _f(e, n, u), Ui(), !1;
    }
    if (ae)
      return t = tt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, n !== Fc && (e = Error(f(422), { cause: n }), Va(Bt(e, l)))) : (n !== Fc && (t = Error(f(423), {
        cause: n
      }), Va(
        Bt(t, l)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, n = Bt(n, l), u = jo(
        e.stateNode,
        n,
        u
      ), co(e, u), Ze !== 4 && (Ze = 2)), !1;
    var i = Error(f(520), { cause: n });
    if (i = Bt(i, l), fu === null ? fu = [i] : fu.push(i), Ze !== 4 && (Ze = 2), t === null) return !0;
    n = Bt(n, l), l = t;
    do {
      switch (l.tag) {
        case 3:
          return l.flags |= 65536, e = u & -u, l.lanes |= e, e = jo(l.stateNode, n, e), co(l, e), !1;
        case 1:
          if (t = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && ($l === null || !$l.has(i))))
            return l.flags |= 65536, u &= -u, l.lanes |= u, u = Cd(u), Dd(
              u,
              e,
              l,
              n
            ), co(l, u), !1;
          break;
        case 22:
          if (l.memoizedState !== null)
            return l.flags |= 65536, !1;
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var wo = Error(f(461)), Xe = !1;
  function Ke(e, t, l, n) {
    t.child = e === null ? Rr(t, null, l, n) : zn(
      t,
      e.child,
      l,
      n
    );
  }
  function Ud(e, t, l, n, u) {
    l = l.render;
    var i = t.ref;
    if ("ref" in n) {
      var s = {};
      for (var r in n)
        r !== "ref" && (s[r] = n[r]);
    } else s = n;
    return gn(t), n = vo(
      e,
      t,
      l,
      s,
      i,
      u
    ), r = yo(), e !== null && !Xe ? (go(e, t, u), Ol(e, t, u)) : (ae && r && Fu(t), t.flags |= 1, Ke(e, t, n, u), t.child);
  }
  function jd(e, t, l, n, u) {
    if (e === null) {
      var i = l.type;
      return typeof i == "function" && !Kc(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = i, wd(
        e,
        t,
        i,
        n,
        u
      )) : (e = $u(
        l.type,
        null,
        n,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Xo(e, u)) {
      var s = i.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ga, l(s, n) && e.ref === t.ref)
        return Ol(e, t, u);
    }
    return t.flags |= 1, e = _l(i, n), e.ref = t.ref, e.return = t, t.child = e;
  }
  function wd(e, t, l, n, u) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Ga(i, n) && e.ref === t.ref)
        if (Xe = !1, t.pendingProps = n = i, Xo(e, u))
          (e.flags & 131072) !== 0 && (Xe = !0);
        else
          return t.lanes = e.lanes, Ol(e, t, u);
    }
    return Ro(
      e,
      t,
      l,
      n,
      u
    );
  }
  function Rd(e, t, l, n) {
    var u = n.children, i = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (i = i !== null ? i.baseLanes | l : l, e !== null) {
          for (n = t.child = e.child, u = 0; n !== null; )
            u = u | n.lanes | n.childLanes, n = n.sibling;
          n = u & ~i;
        } else n = 0, t.child = null;
        return Zd(
          e,
          t,
          i,
          l,
          n
        );
      }
      if ((l & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Pu(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? qr(t, i) : fo(), Br(t);
      else
        return n = t.lanes = 536870912, Zd(
          e,
          t,
          i !== null ? i.baseLanes | l : l,
          l,
          n
        );
    } else
      i !== null ? (Pu(t, i.cachePool), qr(t, i), Vl(), t.memoizedState = null) : (e !== null && Pu(t, null), fo(), Vl());
    return Ke(e, t, u, l), t.child;
  }
  function nu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Zd(e, t, l, n, u) {
    var i = no();
    return i = i === null ? null : { parent: Ge._currentValue, pool: i }, t.memoizedState = {
      baseLanes: l,
      cachePool: i
    }, e !== null && Pu(t, null), fo(), Br(t), e !== null && Fn(e, t, n, !0), t.childLanes = u, null;
  }
  function vi(e, t) {
    return t = yi(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Hd(e, t, l) {
    return zn(t, e.child, null, l), e = vi(t, t.pendingProps), e.flags |= 2, Nt(t), t.memoizedState = null, e;
  }
  function hy(e, t, l) {
    var n = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ae) {
        if (n.mode === "hidden")
          return e = vi(t, n), t.lanes = 536870912, nu(null, e);
        if (ro(t), (e = Ne) ? (e = cm(
          e,
          Lt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Rl !== null ? { id: nl, overflow: al } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = _r(e), l.return = t, t.child = l, Pe = t, Ne = null)) : e = null, e === null) throw Hl(t);
        return t.lanes = 536870912, null;
      }
      return vi(t, n);
    }
    var i = e.memoizedState;
    if (i !== null) {
      var s = i.dehydrated;
      if (ro(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Hd(
            e,
            t,
            l
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(f(558));
      else if (Xe || Fn(e, t, l, !1), u = (l & e.childLanes) !== 0, Xe || u) {
        if (n = Se, n !== null && (s = Es(n, l), s !== 0 && s !== i.retryLane))
          throw i.retryLane = s, hn(e, s), _t(n, e, s), wo;
        Ui(), t = Hd(
          e,
          t,
          l
        );
      } else
        e = i.treeContext, Ne = Qt(s.nextSibling), Pe = t, ae = !0, Zl = null, Lt = !1, e !== null && zr(t, e), t = vi(t, n), t.flags |= 4096;
      return t;
    }
    return e = _l(e.child, {
      mode: n.mode,
      children: n.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function aa(e, t) {
    var l = t.ref;
    if (l === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object")
        throw Error(f(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function Ro(e, t, l, n, u) {
    return gn(t), l = vo(
      e,
      t,
      l,
      n,
      void 0,
      u
    ), n = yo(), e !== null && !Xe ? (go(e, t, u), Ol(e, t, u)) : (ae && n && Fu(t), t.flags |= 1, Ke(e, t, l, u), t.child);
  }
  function qd(e, t, l, n, u, i) {
    return gn(t), t.updateQueue = null, l = Gr(
      t,
      n,
      l,
      u
    ), Yr(e), n = yo(), e !== null && !Xe ? (go(e, t, i), Ol(e, t, i)) : (ae && n && Fu(t), t.flags |= 1, Ke(e, t, l, i), t.child);
  }
  function Bd(e, t, l, n, u) {
    if (gn(t), t.stateNode === null) {
      var i = Kn, s = l.contextType;
      typeof s == "object" && s !== null && (i = et(s)), i = new l(n, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Uo, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = n, i.state = t.memoizedState, i.refs = {}, uo(t), s = l.contextType, i.context = typeof s == "object" && s !== null ? et(s) : Kn, i.state = t.memoizedState, s = l.getDerivedStateFromProps, typeof s == "function" && (Do(
        t,
        l,
        s,
        n
      ), i.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Uo.enqueueReplaceState(i, i.state, null), Wa(t, n, i, u), Fa(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), n = !0;
    } else if (e === null) {
      i = t.stateNode;
      var r = t.memoizedProps, h = En(l, r);
      i.props = h;
      var p = i.context, E = l.contextType;
      s = Kn, typeof E == "object" && E !== null && (s = et(E));
      var x = l.getDerivedStateFromProps;
      E = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function", r = t.pendingProps !== r, E || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (r || p !== s) && Od(
        t,
        i,
        n,
        s
      ), Yl = !1;
      var b = t.memoizedState;
      i.state = b, Wa(t, n, i, u), Fa(), p = t.memoizedState, r || b !== p || Yl ? (typeof x == "function" && (Do(
        t,
        l,
        x,
        n
      ), p = t.memoizedState), (h = Yl || Ed(
        t,
        l,
        h,
        n,
        b,
        p,
        s
      )) ? (E || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = n, t.memoizedState = p), i.props = n, i.state = p, i.context = s, n = h) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), n = !1);
    } else {
      i = t.stateNode, io(e, t), s = t.memoizedProps, E = En(l, s), i.props = E, x = t.pendingProps, b = i.context, p = l.contextType, h = Kn, typeof p == "object" && p !== null && (h = et(p)), r = l.getDerivedStateFromProps, (p = typeof r == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== x || b !== h) && Od(
        t,
        i,
        n,
        h
      ), Yl = !1, b = t.memoizedState, i.state = b, Wa(t, n, i, u), Fa();
      var S = t.memoizedState;
      s !== x || b !== S || Yl || e !== null && e.dependencies !== null && Wu(e.dependencies) ? (typeof r == "function" && (Do(
        t,
        l,
        r,
        n
      ), S = t.memoizedState), (E = Yl || Ed(
        t,
        l,
        E,
        n,
        b,
        S,
        h
      ) || e !== null && e.dependencies !== null && Wu(e.dependencies)) ? (p || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(n, S, h), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        n,
        S,
        h
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && b === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && b === e.memoizedState || (t.flags |= 1024), t.memoizedProps = n, t.memoizedState = S), i.props = n, i.state = S, i.context = h, n = E) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && b === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && b === e.memoizedState || (t.flags |= 1024), n = !1);
    }
    return i = n, aa(e, t), n = (t.flags & 128) !== 0, i || n ? (i = t.stateNode, l = n && typeof l.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && n ? (t.child = zn(
      t,
      e.child,
      null,
      u
    ), t.child = zn(
      t,
      null,
      l,
      u
    )) : Ke(e, t, l, u), t.memoizedState = i.state, e = t.child) : e = Ol(
      e,
      t,
      u
    ), e;
  }
  function Yd(e, t, l, n) {
    return vn(), t.flags |= 256, Ke(e, t, l, n), t.child;
  }
  var Zo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ho(e) {
    return { baseLanes: e, cachePool: Mr() };
  }
  function qo(e, t, l) {
    return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Mt), e;
  }
  function Gd(e, t, l) {
    var n = t.pendingProps, u = !1, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (lt.current & 2) !== 0), s && (u = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ae) {
        if (u ? Xl(t) : Vl(), (e = Ne) ? (e = cm(
          e,
          Lt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Rl !== null ? { id: nl, overflow: al } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, l = _r(e), l.return = t, t.child = l, Pe = t, Ne = null)) : e = null, e === null) throw Hl(t);
        return Hf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var r = n.children;
      return n = n.fallback, u ? (Vl(), u = t.mode, r = yi(
        { mode: "hidden", children: r },
        u
      ), n = mn(
        n,
        u,
        l,
        null
      ), r.return = t, n.return = t, r.sibling = n, t.child = r, n = t.child, n.memoizedState = Ho(l), n.childLanes = qo(
        e,
        s,
        l
      ), t.memoizedState = Zo, nu(null, n)) : (Xl(t), Bo(t, r));
    }
    var h = e.memoizedState;
    if (h !== null && (r = h.dehydrated, r !== null)) {
      if (i)
        t.flags & 256 ? (Xl(t), t.flags &= -257, t = Yo(
          e,
          t,
          l
        )) : t.memoizedState !== null ? (Vl(), t.child = e.child, t.flags |= 128, t = null) : (Vl(), r = n.fallback, u = t.mode, n = yi(
          { mode: "visible", children: n.children },
          u
        ), r = mn(
          r,
          u,
          l,
          null
        ), r.flags |= 2, n.return = t, r.return = t, n.sibling = r, t.child = n, zn(
          t,
          e.child,
          null,
          l
        ), n = t.child, n.memoizedState = Ho(l), n.childLanes = qo(
          e,
          s,
          l
        ), t.memoizedState = Zo, t = nu(null, n));
      else if (Xl(t), Hf(r)) {
        if (s = r.nextSibling && r.nextSibling.dataset, s) var p = s.dgst;
        s = p, n = Error(f(419)), n.stack = "", n.digest = s, Va({ value: n, source: null, stack: null }), t = Yo(
          e,
          t,
          l
        );
      } else if (Xe || Fn(e, t, l, !1), s = (l & e.childLanes) !== 0, Xe || s) {
        if (s = Se, s !== null && (n = Es(s, l), n !== 0 && n !== h.retryLane))
          throw h.retryLane = n, hn(e, n), _t(s, e, n), wo;
        Zf(r) || Ui(), t = Yo(
          e,
          t,
          l
        );
      } else
        Zf(r) ? (t.flags |= 192, t.child = e.child, t = null) : (e = h.treeContext, Ne = Qt(
          r.nextSibling
        ), Pe = t, ae = !0, Zl = null, Lt = !1, e !== null && zr(t, e), t = Bo(
          t,
          n.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Vl(), r = n.fallback, u = t.mode, h = e.child, p = h.sibling, n = _l(h, {
      mode: "hidden",
      children: n.children
    }), n.subtreeFlags = h.subtreeFlags & 132120576, p !== null ? r = _l(
      p,
      r
    ) : (r = mn(
      r,
      u,
      l,
      null
    ), r.flags |= 2), r.return = t, n.return = t, n.sibling = r, t.child = n, nu(null, n), n = t.child, r = e.child.memoizedState, r === null ? r = Ho(l) : (u = r.cachePool, u !== null ? (h = Ge._currentValue, u = u.parent !== h ? { parent: h, pool: h } : u) : u = Mr(), r = {
      baseLanes: r.baseLanes | l,
      cachePool: u
    }), n.memoizedState = r, n.childLanes = qo(
      e,
      s,
      l
    ), t.memoizedState = Zo, nu(e.child, n)) : (Xl(t), l = e.child, e = l.sibling, l = _l(l, {
      mode: "visible",
      children: n.children
    }), l.return = t, l.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = l, t.memoizedState = null, l);
  }
  function Bo(e, t) {
    return t = yi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function yi(e, t) {
    return e = yt(22, e, null, t), e.lanes = 0, e;
  }
  function Yo(e, t, l) {
    return zn(t, e.child, null, l), e = Bo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Ld(e, t, l) {
    e.lanes |= t;
    var n = e.alternate;
    n !== null && (n.lanes |= t), Pc(e.return, t, l);
  }
  function Xd(e) {
    for (var t = null; e !== null; ) {
      var l = e.alternate;
      l !== null && ui(l) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function gi(e, t, l, n, u, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: n,
      tail: l,
      tailMode: u,
      treeForkCount: i
    } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = n, s.tail = l, s.tailMode = u, s.treeForkCount = i);
  }
  function Go(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var l = t.sibling;
      t.sibling = e.child, e.child = t, t = l;
    }
  }
  function Lo(e, t, l) {
    var n = t.pendingProps, u = n.revealOrder, i = n.tail;
    n = n.children;
    var s = lt.current;
    if (t.flags & 128)
      return Ia(t, s), null;
    var r = (s & 2) !== 0;
    if (r ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, Ia(t, s), u === "backwards" && e !== null ? (Go(e), Ke(e, t, n, l), Go(e)) : Ke(e, t, n, l), n = ae ? Xa : 0, !r && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ld(e, l, t);
        else if (e.tag === 19)
          Ld(e, l, t);
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
      case "backwards":
        l = Xd(t.child), l === null ? (u = t.child, t.child = null) : (u = l.sibling, l.sibling = null, Go(t)), gi(
          t,
          !0,
          u,
          null,
          i,
          n
        );
        break;
      case "unstable_legacy-backwards":
        for (l = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && ui(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = l, l = u, u = e;
        }
        gi(
          t,
          !0,
          l,
          null,
          i,
          n
        );
        break;
      case "together":
        gi(
          t,
          !1,
          null,
          null,
          void 0,
          n
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        l = Xd(t.child), l === null ? (u = t.child, t.child = null) : (u = l.sibling, l.sibling = null), gi(
          t,
          !1,
          u,
          l,
          i,
          n
        );
    }
    return t.child;
  }
  function Ol(e, t, l) {
    if (e !== null && (t.dependencies = e.dependencies), Jl |= t.lanes, (l & t.childLanes) === 0)
      if (e !== null) {
        if (Fn(
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
      for (e = t.child, l = _l(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null; )
        e = e.sibling, l = l.sibling = _l(e, e.pendingProps), l.return = t;
      l.sibling = null;
    }
    return t.child;
  }
  function Xo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Wu(e)));
  }
  function my(e, t, l) {
    switch (t.tag) {
      case 3:
        Au(t, t.stateNode.containerInfo), ql(t, Ge, e.memoizedState.cache), vn();
        break;
      case 27:
      case 5:
        rc(t);
        break;
      case 4:
        Au(t, t.stateNode.containerInfo);
        break;
      case 10:
        ql(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, ro(t), null;
        break;
      case 13:
        var n = t.memoizedState;
        if (n !== null)
          return n.dehydrated !== null ? (Xl(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Gd(e, t, l) : (Xl(t), e = Ol(
            e,
            t,
            l
          ), e !== null ? e.sibling : null);
        Xl(t);
        break;
      case 19:
        if (t.flags & 128)
          return Lo(
            e,
            t,
            l
          );
        var u = (e.flags & 128) !== 0;
        if (n = (l & t.childLanes) !== 0, n || (Fn(
          e,
          t,
          l,
          !1
        ), n = (l & t.childLanes) !== 0), u) {
          if (n)
            return Lo(
              e,
              t,
              l
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Ia(t, lt.current), n) break;
        return null;
      case 22:
        return t.lanes = 0, Rd(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        ql(t, Ge, e.memoizedState.cache);
    }
    return Ol(e, t, l);
  }
  function Vd(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Xe = !0;
      else {
        if (!Xo(e, l) && (t.flags & 128) === 0)
          return Xe = !1, my(
            e,
            t,
            l
          );
        Xe = (e.flags & 131072) !== 0;
      }
    else
      Xe = !1, ae && (t.flags & 1048576) !== 0 && Sr(t, Xa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var n = t.pendingProps;
          if (e = bn(t.elementType), t.type = e, typeof e == "function")
            Kc(e) ? (n = En(e, n), t.tag = 1, t = Bd(
              null,
              t,
              e,
              n,
              l
            )) : (t.tag = 0, t = Ro(
              null,
              t,
              e,
              n,
              l
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === ht) {
                t.tag = 11, t = Ud(
                  null,
                  t,
                  e,
                  n,
                  l
                );
                break e;
              } else if (u === K) {
                t.tag = 14, t = jd(
                  null,
                  t,
                  e,
                  n,
                  l
                );
                break e;
              }
            }
            throw t = R(e) || e, Error(f(306, t, ""));
          }
        }
        return t;
      case 0:
        return Ro(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 1:
        return n = t.type, u = En(
          n,
          t.pendingProps
        ), Bd(
          e,
          t,
          n,
          u,
          l
        );
      case 3:
        e: {
          if (Au(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(f(387));
          n = t.pendingProps;
          var i = t.memoizedState;
          u = i.element, io(e, t), Wa(t, n, null, l);
          var s = t.memoizedState;
          if (n = s.cache, ql(t, Ge, n), n !== i.cache && eo(
            t,
            [Ge],
            l,
            !0
          ), Fa(), n = s.element, i.isDehydrated)
            if (i = {
              element: n,
              isDehydrated: !1,
              cache: s.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = Yd(
                e,
                t,
                n,
                l
              );
              break e;
            } else if (n !== u) {
              u = Bt(
                Error(f(424)),
                t
              ), Va(u), t = Yd(
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
              for (Ne = Qt(e.firstChild), Pe = t, ae = !0, Zl = null, Lt = !0, l = Rr(
                t,
                null,
                n,
                l
              ), t.child = l; l; )
                l.flags = l.flags & -3 | 4096, l = l.sibling;
            }
          else {
            if (vn(), n === u) {
              t = Ol(
                e,
                t,
                l
              );
              break e;
            }
            Ke(e, t, n, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return aa(e, t), e === null ? (l = hm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = l : ae || (l = t.type, e = t.pendingProps, n = qi(
          Cl.current
        ).createElement(l), n[Ie] = t, n[mt] = e, nt(n, l, e), ke(n), t.stateNode = n) : t.memoizedState = hm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return rc(t), e === null && ae && (n = t.stateNode = sm(
          t.type,
          t.pendingProps,
          Cl.current
        ), Pe = t, Lt = !0, u = Ne, Wl(t.type) ? (qf = u, Ne = Qt(n.firstChild)) : Ne = u), Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), aa(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ae && ((u = n = Ne) && (n = ng(
          n,
          t.type,
          t.pendingProps,
          Lt
        ), n !== null ? (t.stateNode = n, Pe = t, Ne = Qt(n.firstChild), Lt = !1, u = !0) : u = !1), u || Hl(t)), rc(t), u = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, n = i.children, Df(u, i) ? n = null : s !== null && Df(u, s) && (t.flags |= 32), t.memoizedState !== null && (u = vo(
          e,
          t,
          uy,
          null,
          null,
          l
        ), ba._currentValue = u), aa(e, t), Ke(e, t, n, l), t.child;
      case 6:
        return e === null && ae && ((e = l = Ne) && (l = ag(
          l,
          t.pendingProps,
          Lt
        ), l !== null ? (t.stateNode = l, Pe = t, Ne = null, e = !0) : e = !1), e || Hl(t)), null;
      case 13:
        return Gd(e, t, l);
      case 4:
        return Au(
          t,
          t.stateNode.containerInfo
        ), n = t.pendingProps, e === null ? t.child = zn(
          t,
          null,
          n,
          l
        ) : Ke(e, t, n, l), t.child;
      case 11:
        return Ud(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 7:
        return n = t.pendingProps, aa(e, t), Ke(e, t, n, l), t.child;
      case 8:
        return Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 12:
        return Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 10:
        return n = t.pendingProps, ql(t, t.type, n.value), Ke(e, t, n.children, l), t.child;
      case 9:
        return u = t.type._context, n = t.pendingProps.children, gn(t), u = et(u), n = n(u), t.flags |= 1, Ke(e, t, n, l), t.child;
      case 14:
        return jd(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 15:
        return wd(
          e,
          t,
          t.type,
          t.pendingProps,
          l
        );
      case 19:
        return Lo(e, t, l);
      case 31:
        return hy(e, t, l);
      case 22:
        return Rd(
          e,
          t,
          l,
          t.pendingProps
        );
      case 24:
        return gn(t), n = et(Ge), e === null ? (u = no(), u === null && (u = Se, i = to(), u.pooledCache = i, i.refCount++, i !== null && (u.pooledCacheLanes |= l), u = i), t.memoizedState = { parent: n, cache: u }, uo(t), ql(t, Ge, u)) : ((e.lanes & l) !== 0 && (io(e, t), Wa(t, null, null, l), Fa()), u = e.memoizedState, i = t.memoizedState, u.parent !== n ? (u = { parent: n, cache: n }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ql(t, Ge, n)) : (n = i.cache, ql(t, Ge, n), n !== u.cache && eo(
          t,
          [Ge],
          l,
          !0
        ))), Ke(
          e,
          t,
          t.pendingProps.children,
          l
        ), t.child;
      case 30:
        return n = t.pendingProps, n.name != null && n.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : ae && Fu(t), e !== null && e.memoizedProps.name !== n.name ? t.flags |= 4194816 : aa(e, t), Ke(e, t, n.children, l), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(f(156, t.tag));
  }
  function Nl(e) {
    e.flags |= 4;
  }
  function Vo(e, t, l, n, u) {
    var i;
    if ((i = (e.mode & 32) !== 0) && (i = l === null ? pm(t, n) : pm(t, n) && (n.src !== l.src || n.srcSet !== l.srcSet)), i) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Nh()) e.flags |= 8192;
        else
          throw Sn = ti, ao;
    } else e.flags &= -16777217;
  }
  function Qd(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !_m(t))
      if (Nh()) e.flags |= 8192;
      else
        throw Sn = ti, ao;
  }
  function pi(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ss() : 536870912, e.lanes |= t, fa |= t);
  }
  function au(e, t) {
    if (!ae)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var l = e.tail, n = null; l !== null; )
            l.alternate !== null && (n = l), l = l.sibling;
          n === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : n.sibling = null;
          break;
        default:
          for (t = e.tail, l = null; t !== null; )
            t.alternate !== null && (l = t), t = t.sibling;
          l === null ? e.tail = null : l.sibling = null;
      }
  }
  function Ee(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, l = 0, n = 0;
    if (t)
      for (var u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, n |= u.subtreeFlags & 132120576, n |= u.flags & 132120576, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        l |= u.lanes | u.childLanes, n |= u.subtreeFlags, n |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= n, e.childLanes = l, t;
  }
  function vy(e, t, l) {
    var n = t.pendingProps;
    switch (kc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ee(t), null;
      case 1:
        return Ee(t), null;
      case 3:
        return l = t.stateNode, n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), zl(Ge), jn(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (kn(t) ? Nl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Wc())), Ee(t), null;
      case 26:
        var u = t.type, i = t.memoizedState;
        return e === null ? (Nl(t), i !== null ? (Ee(t), Qd(t, i)) : (Ee(t), Vo(
          t,
          u,
          null,
          n,
          l
        ))) : i ? i !== e.memoizedState ? (Nl(t), Ee(t), Qd(t, i)) : (Ee(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== n && Nl(t), Ee(t), Vo(
          t,
          u,
          e,
          n,
          l
        )), null;
      case 27:
        if (xu(t), l = Cl.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Nl(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ee(t), t.subtreeFlags &= -33554433, null;
          }
          e = ll.current, kn(t) ? Tr(t) : (e = sm(u, n, l), t.stateNode = e, Nl(t));
        }
        return Ee(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (xu(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== n && Nl(t);
        else {
          if (!n) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ee(t), t.subtreeFlags &= -33554433, null;
          }
          if (i = ll.current, kn(t))
            Tr(t);
          else {
            var s = qi(
              Cl.current
            );
            switch (i) {
              case 1:
                i = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                i = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    i = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    i = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    i = s.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(
                      i.firstChild
                    );
                    break;
                  case "select":
                    i = typeof n.is == "string" ? s.createElement("select", {
                      is: n.is
                    }) : s.createElement("select"), n.multiple ? i.multiple = !0 : n.size && (i.size = n.size);
                    break;
                  default:
                    i = typeof n.is == "string" ? s.createElement(u, { is: n.is }) : s.createElement(u);
                }
            }
            i[Ie] = t, i[mt] = n;
            e: for (s = t.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                i.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === t) break e;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === t)
                  break e;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            t.stateNode = i;
            e: switch (nt(i, u, n), u) {
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
            n && Nl(t);
          }
        }
        return Ee(t), t.subtreeFlags &= -33554433, Vo(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          l
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== n && Nl(t);
        else {
          if (typeof n != "string" && t.stateNode === null)
            throw Error(f(166));
          if (e = Cl.current, kn(t)) {
            if (e = t.stateNode, l = t.memoizedProps, n = null, u = Pe, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  n = u.memoizedProps;
              }
            e[Ie] = t, e = !!(e.nodeValue === l || n !== null && n.suppressHydrationWarning === !0 || Kh(e.nodeValue, l)), e || Hl(t, !0);
          } else
            e = qi(e).createTextNode(
              n
            ), e[Ie] = t, t.stateNode = e;
        }
        return Ee(t), null;
      case 31:
        if (l = t.memoizedState, e === null || e.memoizedState !== null) {
          if (n = kn(t), l !== null) {
            if (e === null) {
              if (!n) throw Error(f(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(557));
              e[Ie] = t;
            } else
              vn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ee(t), e = !1;
          } else
            l = Wc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
          if (!e)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(f(558));
        }
        return Ee(t), null;
      case 13:
        if (n = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = kn(t), n !== null && n.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(f(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(f(317));
              u[Ie] = t;
            } else
              vn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ee(t), u = !1;
          } else
            u = Wc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (Nt(t), t) : (Nt(t), null);
        }
        return Nt(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = n !== null, e = e !== null && e.memoizedState !== null, l && (n = t.child, u = null, n.alternate !== null && n.alternate.memoizedState !== null && n.alternate.memoizedState.cachePool !== null && (u = n.alternate.memoizedState.cachePool.pool), i = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (i = n.memoizedState.cachePool.pool), i !== u && (n.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), pi(t, t.updateQueue), Ee(t), null);
      case 4:
        return jn(), e === null && Nf(t.stateNode.containerInfo), t.flags |= 67108864, Ee(t), null;
      case 10:
        return zl(t.type), Ee(t), null;
      case 19:
        if (ho(t), n = t.memoizedState, n === null) return Ee(t), null;
        if (u = (t.flags & 128) !== 0, i = n.rendering, i === null)
          if (u) au(n, !1);
          else {
            if (Ze !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = ui(e), i !== null) {
                  for (t.flags |= 128, au(n, !1), e = i.updateQueue, t.updateQueue = e, pi(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null; )
                    pr(l, e), l = l.sibling;
                  return Ia(
                    t,
                    lt.current & 1 | 2
                  ), ae && bl(t, n.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null && zt() > Mi && (t.flags |= 128, u = !0, au(n, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = ui(i), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, pi(t, e), au(n, !0), n.tail === null && n.tailMode !== "collapsed" && n.tailMode !== "visible" && !i.alternate && !ae)
                return Ee(t), null;
            } else
              2 * zt() - n.renderingStartTime > Mi && l !== 536870912 && (t.flags |= 128, u = !0, au(n, !1), t.lanes = 4194304);
          n.isBackwards ? (i.sibling = t.child, t.child = i) : (e = n.last, e !== null ? e.sibling = i : t.child = i, n.last = i);
        }
        if (n.tail !== null) {
          e = n.tail;
          e: {
            for (l = e; l !== null; ) {
              if (l.alternate !== null) {
                l = !1;
                break e;
              }
              l = l.sibling;
            }
            l = !0;
          }
          return n.rendering = e, n.tail = e.sibling, n.renderingStartTime = zt(), e.sibling = null, i = lt.current, i = u ? i & 1 | 2 : i & 1, n.tailMode === "visible" || n.tailMode === "collapsed" || !l || ae ? Ia(t, i) : (l = i, Te(tt, t), Te(lt, l), it === null && (it = t)), ae && bl(t, n.treeForkCount), e;
        }
        return Ee(t), null;
      case 22:
      case 23:
        return Nt(t), so(), n = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== n && (t.flags |= 8192) : n && (t.flags |= 8192), n ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ee(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ee(t), l = t.updateQueue, l !== null && pi(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), n = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), n !== l && (t.flags |= 2048), e !== null && We(_n), null;
      case 24:
        return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), zl(Ge), Ee(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Ee(t), null;
    }
    throw Error(f(156, t.tag));
  }
  function yy(e, t) {
    switch (kc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return zl(Ge), jn(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return xu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Nt(t), t.alternate === null)
            throw Error(f(340));
          vn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Nt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(f(340));
          vn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return ho(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return jn(), null;
      case 10:
        return zl(t.type), null;
      case 22:
      case 23:
        return Nt(t), so(), e !== null && We(_n), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return zl(Ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kd(e, t) {
    switch (kc(t), t.tag) {
      case 3:
        zl(Ge), jn();
        break;
      case 26:
      case 27:
      case 5:
        xu(t);
        break;
      case 4:
        jn();
        break;
      case 31:
        t.memoizedState !== null && Nt(t);
        break;
      case 13:
        Nt(t);
        break;
      case 19:
        ho(t);
        break;
      case 10:
        zl(t.type);
        break;
      case 22:
      case 23:
        Nt(t), so(), e !== null && We(_n);
        break;
      case 24:
        zl(Ge);
    }
  }
  function uu(e, t) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & e) === e) {
            n = void 0;
            var i = l.create, s = l.inst;
            n = i(), s.destroy = n;
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (r) {
      me(t, t.return, r);
    }
  }
  function Ql(e, t, l) {
    try {
      var n = t.updateQueue, u = n !== null ? n.lastEffect : null;
      if (u !== null) {
        var i = u.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            var s = n.inst, r = s.destroy;
            if (r !== void 0) {
              s.destroy = void 0, u = t;
              var h = l, p = r;
              try {
                p();
              } catch (E) {
                me(
                  u,
                  h,
                  E
                );
              }
            }
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (E) {
      me(t, t.return, E);
    }
  }
  function Jd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Hr(t, l);
      } catch (n) {
        me(e, e.return, n);
      }
    }
  }
  function $d(e, t, l) {
    l.props = En(
      e.type,
      e.memoizedProps
    ), l.state = e.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (n) {
      me(e, t, n);
    }
  }
  function Al(e, t) {
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
            var u = e.stateNode, i = gl(e.memoizedProps, u);
            (u.ref === null || u.ref.name !== i) && (u.ref = lm(i)), n = u.ref;
            break;
          case 7:
            e.stateNode === null && (e.stateNode = new Dt(e)), n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        typeof l == "function" ? e.refCleanup = l(n) : l.current = n;
      }
    } catch (s) {
      me(e, t, s);
    }
  }
  function st(e, t) {
    var l = e.ref, n = e.refCleanup;
    if (l !== null)
      if (typeof n == "function")
        try {
          n();
        } catch (u) {
          me(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (u) {
          me(e, t, u);
        }
      else l.current = null;
  }
  function kd(e) {
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
      me(e, e.return, u);
    }
  }
  function Qo(e, t, l) {
    try {
      var n = e.stateNode;
      Yy(n, e.type, l, t), n[mt] = t;
    } catch (u) {
      me(e, e.return, u);
    }
  }
  function Fd(e, t) {
    if (e.tag === 5 && e.alternate === null && t !== null)
      for (var l = 0; l < t.length; l++)
        im(
          e.stateNode,
          t[l]
        );
  }
  function Wd(e) {
    for (var t = e.return; t !== null; ) {
      if (Ko(t)) {
        var l = e.stateNode, n = t.stateNode._eventListeners;
        if (n !== null)
          for (var u = 0; u < n.length; u++) {
            var i = n[u];
            l.removeEventListener(
              i.type,
              i.listener,
              i.optionsOrUseCapture
            );
          }
      }
      if (_i(t)) break;
      t = t.return;
    }
  }
  function _i(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Wl(e.type) || e.tag === 4;
  }
  function Ko(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Jo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || _i(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Wl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function $o(e, t, l, n) {
    var u = e.tag;
    if (u === 5 || u === 6)
      u = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(u, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(u), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = vl)), Fd(e, n), re = !0;
    else if (u !== 4 && (u === 27 && Wl(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
      for ($o(
        e,
        t,
        l,
        n
      ), e = e.sibling; e !== null; )
        $o(
          e,
          t,
          l,
          n
        ), e = e.sibling;
  }
  function bi(e, t, l, n) {
    var u = e.tag;
    if (u === 5 || u === 6)
      u = e.stateNode, t ? l.insertBefore(u, t) : l.appendChild(u), Fd(e, n), re = !0;
    else if (u !== 4 && (u === 27 && Wl(e.type) && (l = e.stateNode), e = e.child, e !== null))
      for (bi(
        e,
        t,
        l,
        n
      ), e = e.sibling; e !== null; )
        bi(
          e,
          t,
          l,
          n
        ), e = e.sibling;
  }
  function Id(e) {
    var t = e.stateNode, l = e.memoizedProps;
    try {
      for (var n = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      nt(t, n, l), t[Ie] = e, t[mt] = l;
    } catch (i) {
      me(e, e.return, i);
    }
  }
  var Si = !1, At = null;
  function Pd(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Si = !0);
  }
  var ul = null;
  function eh() {
    var e = ul;
    return ul = null, e;
  }
  var Xt = 0;
  function ua(e, t, l, n, u) {
    return Xt = 0, th(
      e.child,
      t,
      l,
      n,
      u
    );
  }
  function th(e, t, l, n, u) {
    for (var i = !1; e !== null; ) {
      if (e.tag === 5) {
        var s = e.stateNode;
        if (n !== null) {
          var r = jf(s);
          n.push(r), r.view && (i = !0);
        } else
          i || jf(s).view && (i = !0);
        Si = !0, em(
          s,
          Xt === 0 ? t : t + "_" + Xt,
          l
        ), Xt++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && u || th(
        e.child,
        t,
        l,
        n,
        u
      ) && (i = !0));
      e = e.sibling;
    }
    return i;
  }
  function il(e, t) {
    for (; e !== null; )
      e.tag === 5 ? tm(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || il(
        e.child,
        t
      )), e = e.sibling;
  }
  function zi(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (zi(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(f(544));
          var l = t.name;
          t = pl(t.default, t.share), t !== "none" && (ua(
            e,
            l,
            t,
            null,
            !1
          ) || il(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function ko(e, t) {
    if (e.tag === 30) {
      var l = e.stateNode, n = e.memoizedProps, u = gl(n, l), i = pl(
        n.default,
        l.paired ? n.share : n.enter
      );
      i !== "none" ? ua(e, u, i, null, !1) ? (zi(e), l.paired || t || da(e, n.onEnter)) : il(e.child, !1) : zi(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        ko(e, t), e = e.sibling;
    else zi(e);
  }
  function Fo(e) {
    if (At !== null && At.size !== 0) {
      var t = At;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var l = e.memoizedProps, n = l.name;
              if (n != null && n !== "auto") {
                var u = t.get(n);
                if (u !== void 0) {
                  var i = pl(
                    l.default,
                    l.share
                  );
                  if (i !== "none" && (ua(
                    e,
                    n,
                    i,
                    null,
                    !1
                  ) ? (i = e.stateNode, u.paired = i, i.paired = u, da(e, l.onShare)) : il(e.child, !1)), t.delete(n), t.size === 0) break;
                }
              }
            }
            Fo(e);
          }
          e = e.sibling;
        }
    }
  }
  function Wo(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, l = gl(t, e.stateNode), n = At !== null ? At.get(l) : void 0, u = pl(
        t.default,
        n !== void 0 ? t.share : t.exit
      );
      u !== "none" && (ua(e, l, u, null, !1) ? n !== void 0 ? (u = e.stateNode, n.paired = u, u.paired = n, At.delete(l), da(e, t.onShare)) : da(e, t.onExit) : il(e.child, !1)), At !== null && Fo(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Wo(e), e = e.sibling;
    else
      At !== null && Fo(e);
  }
  function lh(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, l = gl(t, e.stateNode);
        t = pl(t.default, t.update), e.flags &= -5, t !== "none" && ua(
          e,
          l,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && lh(e);
      e = e.sibling;
    }
  }
  function Io(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, il(e.child, !1));
          }
          Io(e);
        }
        e = e.sibling;
      }
  }
  function Ti(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, il(e.child, !1), Io(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Ti(e), e = e.sibling;
    else Io(e);
  }
  function nh(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? il(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && nh(e), e = e.sibling;
  }
  function Po(e, t, l, n, u, i, s) {
    for (var r = !1; t !== null; ) {
      if (t.tag === 5) {
        var h = t.stateNode;
        if (i !== null && Xt < i.length) {
          var p = i[Xt], E = jf(h);
          (p.view || E.view) && (r = !0);
          var x;
          if (x = (e.flags & 4) === 0)
            if (E.clip) x = !0;
            else {
              x = p.rect;
              var b = E.rect;
              x = x.y !== b.y || x.x !== b.x || x.height !== b.height || x.width !== b.width;
            }
          x && (e.flags |= 4), E.abs ? E = !p.abs : (p = p.rect, E = E.rect, E = p.height !== E.height || p.width !== E.width), E && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && em(
          h,
          Xt === 0 ? l : l + "_" + Xt,
          u
        ), r && (e.flags & 4) !== 0 || (ul === null && (ul = []), ul.push(
          h,
          n,
          t.memoizedProps
        )), Xt++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && s ? e.flags |= t.flags & 32 : Po(
        e,
        t.child,
        l,
        n,
        u,
        i,
        s
      ) && (r = !0));
      t = t.sibling;
    }
    return r;
  }
  function ah(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var l = e.memoizedProps, n = e.stateNode, u = gl(l, n), i = pl(l.default, l.update), s;
        s = e.memoizedState, e.memoizedState = null, n = e;
        var r = e.child;
        Xt = 0, u = Po(
          n,
          r,
          u,
          u,
          i,
          s,
          !1
        ), (e.flags & 4) !== 0 && u && da(e, l.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && ah(e);
      e = e.sibling;
    }
  }
  var cl = !1, Re = !1, ol = !1, ef = !1, uh = typeof WeakSet == "function" ? WeakSet : Set, Fe = null, fl = !1, iu = !1, Ei = !1, tf = !1;
  function gy(e, t, l) {
    if (e = e.containerInfo, Mf = Qi, e = or(e), Bc(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var u = n.getSelection && n.getSelection();
          if (u && u.rangeCount !== 0) {
            n = u.anchorNode;
            var i = u.anchorOffset, s = u.focusNode;
            u = u.focusOffset;
            try {
              n.nodeType, s.nodeType;
            } catch {
              n = null;
              break e;
            }
            var r = 0, h = -1, p = -1, E = 0, x = 0, b = e, S = null;
            t: for (; ; ) {
              for (var q; b !== n || i !== 0 && b.nodeType !== 3 || (h = r + i), b !== s || u !== 0 && b.nodeType !== 3 || (p = r + u), b.nodeType === 3 && (r += b.nodeValue.length), (q = b.firstChild) !== null; )
                S = b, b = q;
              for (; ; ) {
                if (b === e) break t;
                if (S === n && ++E === i && (h = r), S === s && ++x === u && (p = r), (q = b.nextSibling) !== null) break;
                b = S, S = b.parentNode;
              }
              b = q;
            }
            n = h === -1 || p === -1 ? null : { start: h, end: p };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Cf = { focusedElem: e, selectionRange: n }, Qi = !1, l = (l & 335544064) === l, Fe = t, t = l ? 9270 : 1028; Fe !== null; ) {
      if (e = Fe, l && (n = e.deletions, n !== null))
        for (i = 0; i < n.length; i++)
          l && Wo(n[i]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        l && Pd(e), Oi(l);
      else {
        if (e.tag === 22) {
          if (n = e.alternate, e.memoizedState !== null) {
            n !== null && n.memoizedState === null && l && Wo(n), Oi(l);
            continue;
          } else if (n !== null && n.memoizedState !== null) {
            l && Pd(e), Oi(l);
            continue;
          }
        }
        n = e.child, (e.subtreeFlags & t) !== 0 && n !== null ? (n.return = e, Fe = n) : (l && lh(e), Oi(l));
      }
    }
    At = null;
  }
  function Oi(e) {
    for (; Fe !== null; ) {
      var t = Fe, l = e, n = t.alternate, u = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          if ((u & 4) !== 0 && (n = t.updateQueue, n = n !== null ? n.events : null, n !== null))
            for (l = 0; l < n.length; l++)
              u = n[l], u.ref.impl = u.nextImpl;
          break;
        case 1:
          if ((u & 1024) !== 0 && n !== null) {
            l = void 0, u = n.memoizedProps, n = n.memoizedState;
            var i = t.stateNode;
            try {
              var s = En(
                t.type,
                u
              );
              l = i.getSnapshotBeforeUpdate(
                s,
                n
              ), i.__reactInternalSnapshotBeforeUpdate = l;
            } catch (r) {
              me(t, t.return, r);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (n = t.stateNode.containerInfo, l = n.nodeType, l === 9)
              Rf(n);
            else if (l === 1)
              switch (n.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Rf(n);
                  break;
                default:
                  n.textContent = "";
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
        case 30:
          l && n !== null && (l = gl(
            n.memoizedProps,
            n.stateNode
          ), u = t.memoizedProps, u = pl(u.default, u.update), u !== "none" && ua(
            n,
            l,
            u,
            n.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(f(163));
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, Fe = n;
        break;
      }
      Fe = t.return;
    }
  }
  function ih(e, t, l) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        sl(e, l), n & 4 && uu(5, l);
        break;
      case 1:
        if (sl(e, l), n & 4)
          if (e = l.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              me(l, l.return, s);
            }
          else {
            var u = En(
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
            } catch (s) {
              me(
                l,
                l.return,
                s
              );
            }
          }
        n & 64 && Jd(l), n & 512 && Al(l, l.return);
        break;
      case 3:
        if (sl(e, l), n & 64 && (e = l.updateQueue, e !== null)) {
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
            Hr(e, t);
          } catch (s) {
            me(l, l.return, s);
          }
        }
        break;
      case 27:
        t === null && n & 4 && Id(l);
      case 26:
      case 5:
        sl(e, l), t === null && n & 4 && kd(l), n & 512 && Al(l, l.return);
        break;
      case 12:
        sl(e, l);
        break;
      case 31:
        sl(e, l), n & 4 && sh(e, l);
        break;
      case 13:
        sl(e, l), n & 4 && rh(e, l), n & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = xy.bind(
          null,
          l
        ), ug(e, l))));
        break;
      case 22:
        if (n = l.memoizedState !== null || cl, !n) {
          t = t !== null && t.memoizedState !== null || Re, u = cl;
          var i = Re;
          cl = n, (Re = t) && !i ? rl(
            e,
            l,
            (l.subtreeFlags & 8772) !== 0
          ) : sl(e, l), cl = u, Re = i;
        }
        break;
      case 30:
        sl(e, l), n & 512 && Al(l, l.return);
        break;
      case 7:
        n & 512 && Al(l, l.return);
      default:
        sl(e, l);
    }
  }
  function lf(e, t) {
    for (e = e.child; e !== null; )
      ch(e, t), e = e.sibling;
  }
  function ch(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var l = e.stateNode;
          if (t) {
            var n = l.style;
            typeof n.setProperty == "function" ? n.setProperty("display", "none", "important") : n.display = "none";
          } else {
            var u = e.stateNode, i = e.memoizedProps.style, s = i != null && i.hasOwnProperty("display") ? i.display : null;
            u.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
          }
        } catch (h) {
          me(e, e.return, h);
        }
        nf(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, re = !0;
        } catch (h) {
          me(e, e.return, h);
        }
        break;
      case 18:
        try {
          var r = e.stateNode;
          t ? Ph(r, !0) : Ph(e.stateNode, !1);
        } catch (h) {
          me(e, e.return, h);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && lf(e, t);
        break;
      default:
        lf(e, t);
    }
  }
  function nf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var l = e, n = t;
          switch (l.tag) {
            case 4:
              ch(l, n);
              break e;
            case 22:
              l.memoizedState === null && nf(l, n);
              break e;
            default:
              nf(l, n);
          }
        }
        e = e.sibling;
      }
  }
  function oh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, oh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && zc(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ae = null, gt = !1;
  function It(e, t, l) {
    for (l = l.child; l !== null; )
      fh(e, t, l), l = l.sibling;
  }
  function fh(e, t, l) {
    if (Tt && typeof Tt.onCommitFiberUnmount == "function")
      try {
        Tt.onCommitFiberUnmount(Ma, l);
      } catch {
      }
    switch (l.tag) {
      case 26:
        Re || st(l, t), It(
          e,
          t,
          l
        ), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
        break;
      case 27:
        Re || st(l, t);
        var n = Ae, u = gt;
        Wl(l.type) && (Ae = l.stateNode, gt = !1), It(
          e,
          t,
          l
        ), vu(l.stateNode), Ae = n, gt = u;
        break;
      case 5:
        Re || st(l, t), l.tag === 5 && Wd(l);
      case 6:
        if (n = Ae, u = gt, Ae = null, It(
          e,
          t,
          l
        ), Ae = n, gt = u, Ae !== null)
          if (gt)
            try {
              (Ae.nodeType === 9 ? Ae.body : Ae.nodeName === "HTML" ? Ae.ownerDocument.body : Ae).removeChild(l.stateNode), re = !0;
            } catch (i) {
              me(
                l,
                t,
                i
              );
            }
          else
            try {
              Ae.removeChild(l.stateNode), re = !0;
            } catch (i) {
              me(
                l,
                t,
                i
              );
            }
        break;
      case 18:
        Ae !== null && (gt ? (e = Ae, Ih(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          l.stateNode
        ), Sa(e)) : Ih(Ae, l.stateNode));
        break;
      case 4:
        n = Ae, u = gt, Ae = l.stateNode.containerInfo, gt = !0, It(
          e,
          t,
          l
        ), Ae = n, gt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ql(2, l, t), Re || Ql(4, l, t), It(
          e,
          t,
          l
        );
        break;
      case 1:
        Re || (st(l, t), n = l.stateNode, typeof n.componentWillUnmount == "function" && $d(
          l,
          t,
          n
        )), It(
          e,
          t,
          l
        );
        break;
      case 21:
        It(
          e,
          t,
          l
        );
        break;
      case 22:
        Re = (n = Re) || l.memoizedState !== null, It(
          e,
          t,
          l
        ), Re = n;
        break;
      case 30:
        st(l, t), It(
          e,
          t,
          l
        );
        break;
      case 7:
        Re || st(l, t), It(
          e,
          t,
          l
        );
        break;
      default:
        It(
          e,
          t,
          l
        );
    }
  }
  function sh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Sa(e);
      } catch (l) {
        me(t, t.return, l);
      }
    }
  }
  function rh(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Sa(e);
      } catch (l) {
        me(t, t.return, l);
      }
  }
  function py(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new uh()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new uh()), t;
      default:
        throw Error(f(435, e.tag));
    }
  }
  function Ni(e, t) {
    var l = py(e);
    t.forEach(function(n) {
      if (!l.has(n)) {
        l.add(n);
        var u = My.bind(null, e, n);
        n.then(u, u);
      }
    });
  }
  function rt(e, t, l) {
    var n = t.deletions;
    if (n !== null)
      for (var u = 0; u < n.length; u++) {
        var i = n[u], s = e, r = t, h = r;
        e: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Wl(h.type)) {
                Ae = h.stateNode, gt = !1;
                break e;
              }
              break;
            case 5:
              Ae = h.stateNode, gt = !1;
              break e;
            case 3:
            case 4:
              Ae = h.stateNode.containerInfo, gt = !0;
              break e;
          }
          h = h.return;
        }
        if (Ae === null) throw Error(f(160));
        fh(s, r, i), Ae = null, gt = !1, s = i.alternate, s !== null && (s.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        dh(t, e, l), t = t.sibling;
  }
  var Pt = null;
  function dh(e, t, l) {
    var n = e.alternate, u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        rt(t, e, l), dt(e), u & 4 && (Ql(3, e, e.return), uu(3, e), Ql(5, e, e.return));
        break;
      case 1:
        rt(t, e, l), dt(e), u & 512 && (Re || n === null || st(n, n.return)), u & 64 && cl && (e = e.updateQueue, e !== null && (n = e.callbacks, n !== null && (t = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = t === null ? n : t.concat(n))));
        break;
      case 26:
        var i = Pt;
        if (rt(t, e, l), dt(e), u & 512 && (Re || n === null || st(n, n.return)), u & 4)
          if (l = n !== null ? n.memoizedState : null, t = e.memoizedState, n === null)
            if (t === null)
              if (e.stateNode === null) {
                e: {
                  n = e.type, t = e.memoizedProps, l = i.ownerDocument || i;
                  t: switch (n) {
                    case "title":
                      u = l.getElementsByTagName("title")[0], (!u || u[Ua] || u[Ie] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = l.createElement(n), l.head.insertBefore(
                        u,
                        l.querySelector("head > title")
                      )), nt(u, n, t), u[Ie] = e, ke(u), n = u;
                      break e;
                    case "link":
                      if (i = ym(
                        "link",
                        "href",
                        l
                      ).get(n + (t.href || ""))) {
                        for (var s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("href") === (t.href == null || t.href === "" ? null : t.href) && u.getAttribute("rel") === (t.rel == null ? null : t.rel) && u.getAttribute("title") === (t.title == null ? null : t.title) && u.getAttribute("crossorigin") === (t.crossOrigin == null ? null : t.crossOrigin)) {
                            i.splice(s, 1);
                            break t;
                          }
                      }
                      u = l.createElement(n), nt(u, n, t), l.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = ym(
                        "meta",
                        "content",
                        l
                      ).get(n + (t.content || ""))) {
                        for (s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("content") === (t.content == null ? null : "" + t.content) && u.getAttribute("name") === (t.name == null ? null : t.name) && u.getAttribute("property") === (t.property == null ? null : t.property) && u.getAttribute("http-equiv") === (t.httpEquiv == null ? null : t.httpEquiv) && u.getAttribute("charset") === (t.charSet == null ? null : t.charSet)) {
                            i.splice(s, 1);
                            break t;
                          }
                      }
                      u = l.createElement(n), nt(u, n, t), l.head.appendChild(u);
                      break;
                    default:
                      throw Error(f(468, n));
                  }
                  u[Ie] = e, ke(u), n = u;
                }
                e.stateNode = n;
              } else
                gm(
                  i,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = vm(
                i,
                t,
                e.memoizedProps
              );
          else
            l !== t ? (l === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : l.count--, t === null ? gm(
              i,
              e.type,
              e.stateNode
            ) : vm(
              i,
              t,
              e.memoizedProps
            )) : t === null && e.stateNode !== null && Qo(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        break;
      case 27:
        rt(t, e, l), dt(e), u & 512 && (Re || n === null || st(n, n.return)), n !== null && u & 4 && Qo(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (i = ol, ol = !1, rt(t, e, l), ol = i, dt(e), u & 512 && (Re || n === null || st(n, n.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Bn(t, ""), re = !0;
          } catch (E) {
            me(e, e.return, E);
          }
        }
        u & 4 && e.stateNode != null && (t = e.memoizedProps, Qo(
          e,
          t,
          n !== null ? n.memoizedProps : t
        )), u & 1024 && (ef = !0);
        break;
      case 6:
        if (rt(t, e, l), dt(e), u & 4) {
          if (e.stateNode === null)
            throw Error(f(162));
          n = e.memoizedProps, t = e.stateNode;
          try {
            t.nodeValue = n, re = !0;
          } catch (E) {
            me(e, e.return, E);
          }
        }
        break;
      case 3:
        if (re = !1, Gi = null, i = Pt, Pt = Bi(t.containerInfo), rt(t, e, l), Pt = i, dt(e), u & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Sa(t.containerInfo);
          } catch (E) {
            me(e, e.return, E);
          }
        ef && (ef = !1, hh(e)), re = !1;
        break;
      case 4:
        n = ol, ol = cl, u = Us(), i = Pt, Pt = Bi(
          e.stateNode.containerInfo
        ), rt(t, e, l), dt(e), Pt = i, re && iu && (Ei = !0), re = u, ol = n;
        break;
      case 12:
        rt(t, e, l), dt(e);
        break;
      case 31:
        rt(t, e, l), dt(e), u & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Ni(e, n)));
        break;
      case 13:
        rt(t, e, l), dt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (xi = zt()), u & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Ni(e, n)));
        break;
      case 22:
        i = e.memoizedState !== null, s = n !== null && n.memoizedState !== null;
        var r = cl, h = Re, p = ol;
        cl = r || i, ol = p || i, Re = h || s, rt(t, e, l), Re = h, ol = p, cl = r, dt(e), u & 8192 && (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || s || cl || Re || On(e)), !i && ol || lf(e, i)), u & 4 && (n = e.updateQueue, n !== null && (t = n.retryQueue, t !== null && (n.retryQueue = null, Ni(e, t))));
        break;
      case 19:
        rt(t, e, l), dt(e), u & 4 && (n = e.updateQueue, n !== null && (e.updateQueue = null, Ni(e, n)));
        break;
      case 30:
        u & 512 && (Re || n === null || st(n, n.return)), u = Us(), i = iu, s = (l & 335544064) === l, r = e.memoizedProps, iu = s && pl(
          r.default,
          r.update
        ) !== "none", rt(t, e, l), dt(e), s && n !== null && re && (e.flags |= 4), iu = i, re = u;
        break;
      case 21:
        break;
      case 7:
        n && n.stateNode !== null && (n.stateNode._fragmentFiber = e);
      default:
        rt(t, e, l), dt(e);
    }
  }
  function dt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, n = null, u = e.return; u !== null; ) {
          if (Ko(u)) {
            var i = u.stateNode;
            n === null ? n = [i] : n.push(i);
          }
          if (_i(u)) {
            l = u;
            break;
          }
          u = u.return;
        }
        if (l == null) throw Error(f(160));
        switch (l.tag) {
          case 27:
            var s = l.stateNode, r = Jo(e);
            bi(
              e,
              r,
              s,
              n
            );
            break;
          case 5:
            var h = l.stateNode;
            l.flags & 32 && (Bn(h, ""), l.flags &= -33);
            var p = Jo(e);
            bi(
              e,
              p,
              h,
              n
            );
            break;
          case 3:
          case 4:
            var E = l.stateNode.containerInfo, x = Jo(e);
            $o(
              e,
              x,
              E,
              n
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (b) {
        me(e, e.return, b);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function hh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        hh(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function ia(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        mh(t, e), t = t.sibling;
    else ah(t);
  }
  function mh(e, t) {
    var l = e.alternate;
    if (l === null) ko(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (tf = fl = !1, eh(), ia(t, e), !fl && !Ei) {
            if (e = ul, e !== null)
              for (var n = 0; n < e.length; n += 3) {
                l = e[n];
                var u = e[n + 1];
                tm(l, e[n + 2]), l = l.ownerDocument.documentElement, l !== null && l.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), e.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), tf = !0;
          }
          ul = null;
          break;
        case 5:
          ia(t, e);
          break;
        case 4:
          n = fl, fl = !1, ia(t, e), fl && (Ei = !0), fl = n;
          break;
        case 22:
          e.memoizedState === null && (l.memoizedState !== null ? ko(e, !1) : ia(t, e));
          break;
        case 30:
          n = fl, u = eh(), fl = !1, ia(t, e), fl && (e.flags |= 4);
          var i = e.memoizedProps, s = e.stateNode;
          t = gl(i, s), s = gl(l.memoizedProps, s);
          var r = pl(i.default, i.update);
          r === "none" ? t = !1 : (i = l.memoizedState, l.memoizedState = null, l = e.child, Xt = 0, t = Po(
            e,
            l,
            t,
            s,
            r,
            i,
            !0
          ), Xt !== (i === null ? 0 : i.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (da(
            e,
            e.memoizedProps.onUpdate
          ), ul = u) : u !== null && (u.push.apply(u, ul), ul = u), fl = (e.flags & 32) !== 0 ? !0 : n;
          break;
        default:
          ia(t, e);
      }
  }
  function sl(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        ih(e, t.alternate, t), t = t.sibling;
  }
  function On(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ql(4, t, t.return), On(t);
          break;
        case 1:
          st(t, t.return);
          var l = t.stateNode;
          typeof l.componentWillUnmount == "function" && $d(
            t,
            t.return,
            l
          ), On(t);
          break;
        case 27:
          vu(t.stateNode);
        case 26:
        case 5:
          st(t, t.return), t.tag === 5 && Wd(t), On(t);
          break;
        case 22:
          t.memoizedState === null && On(t);
          break;
        case 30:
          st(t, t.return), On(t);
          break;
        case 7:
          st(t, t.return);
        default:
          On(t);
      }
      e = e.sibling;
    }
  }
  function rl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var n = t.alternate, u = e, i = t, s = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          rl(
            u,
            i,
            l
          ), uu(4, i);
          break;
        case 1:
          if (rl(
            u,
            i,
            l
          ), n = i, u = n.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (E) {
              me(n, n.return, E);
            }
          if (n = i, u = n.updateQueue, u !== null) {
            var r = n.stateNode;
            try {
              var h = u.shared.hiddenCallbacks;
              if (h !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < h.length; u++)
                  Zr(h[u], r);
            } catch (E) {
              me(n, n.return, E);
            }
          }
          l && s & 64 && Jd(i), Al(i, i.return);
          break;
        case 27:
          Id(i);
        case 26:
        case 5:
          if (i.tag === 5) {
            r = i;
            for (var p = r.return; p !== null && (Ko(p) && im(
              r.stateNode,
              p.stateNode
            ), !_i(p)); )
              p = p.return;
          }
          rl(
            u,
            i,
            l
          ), l && n === null && s & 4 && kd(i), Al(i, i.return);
          break;
        case 12:
          rl(
            u,
            i,
            l
          );
          break;
        case 31:
          rl(
            u,
            i,
            l
          ), l && s & 4 && sh(u, i);
          break;
        case 13:
          rl(
            u,
            i,
            l
          ), l && s & 4 && rh(u, i);
          break;
        case 22:
          i.memoizedState === null && rl(
            u,
            i,
            l
          ), Al(i, i.return);
          break;
        case 30:
          rl(
            u,
            i,
            l
          ), Al(i, i.return);
          break;
        case 7:
          Al(i, i.return);
        default:
          rl(
            u,
            i,
            l
          );
      }
      t = t.sibling;
    }
  }
  function af(e, t) {
    var l = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Qa(l));
  }
  function uf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Qa(e));
  }
  function Vt(e, t, l, n) {
    var u = (l & 335544064) === l;
    if (t.subtreeFlags & (u ? 10262 : 10256))
      for (t = t.child; t !== null; )
        vh(
          e,
          t,
          l,
          n
        ), t = t.sibling;
    else u && nh(t);
  }
  function vh(e, t, l, n) {
    var u = (l & 335544064) === l;
    u && t.alternate === null && t.return !== null && t.return.alternate !== null && Ti(t);
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Vt(
          e,
          t,
          l,
          n
        ), i & 2048 && uu(9, t);
        break;
      case 1:
        Vt(
          e,
          t,
          l,
          n
        );
        break;
      case 3:
        Vt(
          e,
          t,
          l,
          n
        ), u && tf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), i & 2048 && (i = null, t.alternate !== null && (i = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== i && (t.refCount++, i != null && Qa(i)));
        break;
      case 12:
        if (i & 2048) {
          Vt(
            e,
            t,
            l,
            n
          ), i = t.stateNode;
          try {
            var s = t.memoizedProps, r = s.id, h = s.onPostCommit;
            typeof h == "function" && h(
              r,
              t.alternate === null ? "mount" : "update",
              i.passiveEffectDuration,
              -0
            );
          } catch (p) {
            me(t, t.return, p);
          }
        } else
          Vt(
            e,
            t,
            l,
            n
          );
        break;
      case 31:
        Vt(
          e,
          t,
          l,
          n
        );
        break;
      case 13:
        Vt(
          e,
          t,
          l,
          n
        );
        break;
      case 23:
        break;
      case 22:
        s = t.stateNode, r = t.alternate, t.memoizedState !== null ? (u && r !== null && r.memoizedState === null && Ti(r), s._visibility & 2 ? Vt(
          e,
          t,
          l,
          n
        ) : cu(
          e,
          t
        )) : (u && r !== null && r.memoizedState !== null && Ti(t), s._visibility & 2 ? Vt(
          e,
          t,
          l,
          n
        ) : (s._visibility |= 2, ca(
          e,
          t,
          l,
          n,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), i & 2048 && af(r, t);
        break;
      case 24:
        Vt(
          e,
          t,
          l,
          n
        ), i & 2048 && uf(t.alternate, t);
        break;
      case 30:
        u && (i = t.alternate, i !== null && (il(i.child, !0), il(t.child, !0))), Vt(
          e,
          t,
          l,
          n
        );
        break;
      default:
        Vt(
          e,
          t,
          l,
          n
        );
    }
  }
  function ca(e, t, l, n, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var i = e, s = t, r = l, h = n, p = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ca(
            i,
            s,
            r,
            h,
            u
          ), uu(8, s);
          break;
        case 23:
          break;
        case 22:
          var E = s.stateNode;
          s.memoizedState !== null ? E._visibility & 2 ? ca(
            i,
            s,
            r,
            h,
            u
          ) : cu(
            i,
            s
          ) : (E._visibility |= 2, ca(
            i,
            s,
            r,
            h,
            u
          )), u && p & 2048 && af(
            s.alternate,
            s
          );
          break;
        case 24:
          ca(
            i,
            s,
            r,
            h,
            u
          ), u && p & 2048 && uf(s.alternate, s);
          break;
        default:
          ca(
            i,
            s,
            r,
            h,
            u
          );
      }
      t = t.sibling;
    }
  }
  function cu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e, n = t, u = n.flags;
        switch (n.tag) {
          case 22:
            cu(l, n), u & 2048 && af(
              n.alternate,
              n
            );
            break;
          case 24:
            cu(l, n), u & 2048 && uf(n.alternate, n);
            break;
          default:
            cu(l, n);
        }
        t = t.sibling;
      }
  }
  var Nn = 8192;
  function An(e, t, l) {
    if (e.subtreeFlags & Nn)
      for (e = e.child; e !== null; )
        yh(
          e,
          t,
          l
        ), e = e.sibling;
  }
  function yh(e, t, l) {
    switch (e.tag) {
      case 26:
        An(
          e,
          t,
          l
        ), e.flags & Nn && (e.memoizedState !== null ? pg(
          l,
          Pt,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && Sm(l, e)));
        break;
      case 5:
        An(
          e,
          t,
          l
        ), e.flags & Nn && (e = e.stateNode, (t & 335544128) === t && Sm(l, e));
        break;
      case 3:
      case 4:
        var n = Pt;
        Pt = Bi(e.stateNode.containerInfo), An(
          e,
          t,
          l
        ), Pt = n;
        break;
      case 22:
        e.memoizedState === null && (n = e.alternate, n !== null && n.memoizedState !== null ? (n = Nn, Nn = 16777216, An(
          e,
          t,
          l
        ), Nn = n) : An(
          e,
          t,
          l
        ));
        break;
      case 30:
        if ((e.flags & Nn) !== 0 && (n = e.memoizedProps.name, n != null && n !== "auto")) {
          var u = e.stateNode;
          u.paired = null, At === null && (At = /* @__PURE__ */ new Map()), At.set(n, u);
        }
        An(
          e,
          t,
          l
        );
        break;
      default:
        An(
          e,
          t,
          l
        );
    }
  }
  function gh(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ou(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          Fe = n, _h(
            n,
            e
          );
        }
      gh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ph(e), e = e.sibling;
  }
  function ph(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ou(e), e.flags & 2048 && Ql(9, e, e.return);
        break;
      case 3:
        ou(e);
        break;
      case 12:
        ou(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ai(e)) : ou(e);
        break;
      default:
        ou(e);
    }
  }
  function Ai(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var n = t[l];
          Fe = n, _h(
            n,
            e
          );
        }
      gh(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, t, t.return), Ai(t);
          break;
        case 22:
          l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Ai(t));
          break;
        default:
          Ai(t);
      }
      e = e.sibling;
    }
  }
  function _h(e, t) {
    for (; Fe !== null; ) {
      var l = Fe;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          Ql(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var n = l.memoizedState.cachePool.pool;
            n != null && n.refCount++;
          }
          break;
        case 24:
          Qa(l.memoizedState.cache);
      }
      if (n = l.child, n !== null) n.return = l, Fe = n;
      else
        e: for (l = e; Fe !== null; ) {
          n = Fe;
          var u = n.sibling, i = n.return;
          if (oh(n), n === l) {
            Fe = null;
            break e;
          }
          if (u !== null) {
            u.return = i, Fe = u;
            break e;
          }
          Fe = i;
        }
    }
  }
  var _y = {
    getCacheForType: function(e) {
      var t = et(Ge), l = t.data.get(e);
      return l === void 0 && (l = e(), t.data.set(e, l)), l;
    },
    cacheSignal: function() {
      return et(Ge).controller.signal;
    }
  }, by = typeof WeakMap == "function" ? WeakMap : Map, de = 0, Se = null, ue = null, oe = 0, he = 0, xt = null, Kl = !1, oa = !1, cf = !1, xl = 0, Ze = 0, Jl = 0, xn = 0, of = 0, Mt = 0, fa = 0, fu = null, pt = null, ff = !1, xi = 0, bh = 0, Mi = 1 / 0, Ci = null, $l = null, Ce = 0, el = null, Mn = null, dl = 0, sf = 0, rf = null, Sh = null, su = null, sa = null, ra = null, ru = 0, df = null;
  function Ct() {
    return (de & 2) !== 0 && oe !== 0 ? oe & -oe : j.T !== null ? zf() : Os();
  }
  function zh() {
    if (Mt === 0)
      if ((oe & 536870912) === 0 || ae) {
        var e = Du;
        Du <<= 1, (Du & 3932160) === 0 && (Du = 262144), Mt = e;
      } else Mt = 536870912;
    return e = tt.current, e !== null && (e.flags |= 32), Mt;
  }
  function da(e, t) {
    if (t != null) {
      var l = e.stateNode, n = l.ref;
      n === null && (n = l.ref = lm(
        gl(e.memoizedProps, l)
      )), sa === null && (sa = []), sa.push(t.bind(null, n));
    }
  }
  function _t(e, t, l) {
    (e === Se && (he === 2 || he === 9) || e.cancelPendingCommit !== null) && (ha(e, 0), kl(
      e,
      oe,
      Mt,
      !1
    )), Da(e, l), ((de & 2) === 0 || e !== Se) && (e === Se && ((de & 2) === 0 && (xn |= l), Ze === 4 && kl(
      e,
      oe,
      Mt,
      !1
    )), hl(e));
  }
  function Th(e, t, l) {
    if ((de & 6) !== 0) throw Error(f(327));
    var n = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Ca(e, t), u = n ? Ty(e, t) : mf(e, t, !0), i = n;
    do {
      if (u === 0) {
        oa && !n && kl(e, t, 0, !1);
        break;
      } else {
        if (l = e.current.alternate, i && !Sy(l)) {
          u = mf(e, t, !1), i = !1;
          continue;
        }
        if (u === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var r = e;
              u = fu;
              var h = r.current.memoizedState.isDehydrated;
              if (h && (ha(r, s).flags |= 256), s = mf(
                r,
                s,
                !1
              ), s !== 2) {
                if (cf && !h) {
                  r.errorRecoveryDisabledLanes |= i, xn |= i, u = 4;
                  break e;
                }
                i = pt, pt = u, i !== null && (pt === null ? pt = i : pt.push.apply(
                  pt,
                  i
                ));
              }
              u = s;
            }
            if (i = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          ha(e, 0), kl(e, t, 0, !0);
          break;
        }
        e: {
          switch (n = e, i = u, i) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              kl(
                n,
                t,
                Mt,
                !Kl
              );
              break e;
            case 2:
              pt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((t & 62914560) === t && (u = xi + 300 - zt(), 10 < u)) {
            if (kl(
              n,
              t,
              Mt,
              !Kl
            ), ju(n, 0, !0) !== 0) break e;
            dl = t, n.timeoutHandle = Fh(
              Eh.bind(
                null,
                n,
                l,
                pt,
                Ci,
                ff,
                t,
                Mt,
                xn,
                fa,
                Kl,
                i,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          Eh(
            n,
            l,
            pt,
            Ci,
            ff,
            t,
            Mt,
            xn,
            fa,
            Kl,
            i,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    hl(e);
  }
  function Eh(e, t, l, n, u, i, s, r, h, p, E, x, b, S) {
    e.timeoutHandle = -1;
    var q = t.subtreeFlags, G = (i & 335544064) === i;
    if (x = null, (G || q & 8192 || (q & 16785408) === 16785408) && (x = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: vl
    }, At = null, yh(
      t,
      i,
      x
    ), G && (q = x, G = e.containerInfo, G = (G.nodeType === 9 ? G : G.ownerDocument).__reactViewTransition, G != null && (q.count++, q.waitingForViewTransition = !0, q = pu.bind(q), G.finished.then(q, q))), q = (i & 62914560) === i ? xi - zt() : (i & 4194048) === i ? bh - zt() : 0, q = _g(
      x,
      q
    ), q !== null)) {
      dl = i, e.cancelPendingCommit = q(
        Uh.bind(
          null,
          e,
          t,
          i,
          l,
          n,
          u,
          s,
          r,
          h,
          E,
          x,
          null,
          b,
          S
        )
      ), kl(e, i, s, !p);
      return;
    }
    Uh(
      e,
      t,
      i,
      l,
      n,
      u,
      s,
      r,
      h,
      E,
      x
    );
  }
  function Sy(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
        for (var n = 0; n < l.length; n++) {
          var u = l[n], i = u.getSnapshot;
          u = u.value;
          try {
            if (!Ot(i(), u)) return !1;
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
  function kl(e, t, l, n) {
    t &= ~of, t &= ~xn, e.suspendedLanes |= t, e.pingedLanes &= ~t, n && (e.warmLanes |= t), n = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var i = 31 - Et(u), s = 1 << i;
      n[i] = -1, u &= ~s;
    }
    l !== 0 && zs(e, l, t);
  }
  function Di() {
    return (de & 6) === 0 ? (du(0), !1) : !0;
  }
  function hf() {
    if (ue !== null) {
      if (he === 0)
        var e = ue.return;
      else
        e = ue, Sl = yn = null, po(e), Pn = null, $a = 0, e = ue;
      for (; e !== null; )
        Kd(e.alternate, e), e = e.return;
      ue = null;
    }
  }
  function ha(e, t) {
    var l = e.timeoutHandle;
    l !== -1 && (e.timeoutHandle = -1, Xy(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), dl = 0, hf(), Se = e, ue = l = _l(e.current, null), oe = t, he = 0, xt = null, Kl = !1, oa = Ca(e, t), cf = !1, fa = Mt = of = xn = Jl = Ze = 0, pt = fu = null, ff = !1, (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var u = 31 - Et(n), i = 1 << u;
        t |= e[u], n &= ~i;
      }
    return xl = t, Qu(), l;
  }
  function Oh(e, t) {
    I = null, j.H = lu, t === In || t === ei ? (t = Ur(), he = 3) : t === ao ? (t = Ur(), he = 4) : he = t === wo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, xt = t, ue === null && (Ze = 1, mi(
      e,
      Bt(t, e.current)
    ));
  }
  function Nh() {
    var e = tt.current;
    return e === null ? !0 : (oe & 4194048) === oe ? it === null : (oe & 62914560) === oe || (oe & 536870912) !== 0 ? e === it : !1;
  }
  function Ah() {
    var e = j.H;
    return j.H = lu, e === null ? lu : e;
  }
  function xh() {
    var e = j.A;
    return j.A = _y, e;
  }
  function Ui() {
    Ze = 4, Kl || (oe & 4194048) !== oe && tt.current !== null || (oa = !0), (Jl & 134217727) === 0 && (xn & 134217727) === 0 || Se === null || kl(
      Se,
      oe,
      Mt,
      !1
    );
  }
  function mf(e, t, l) {
    var n = de;
    de |= 2;
    var u = Ah(), i = xh();
    (Se !== e || oe !== t) && (Ci = null, ha(e, t)), t = !1;
    var s = Ze;
    e: do
      try {
        if (he !== 0 && ue !== null) {
          var r = ue, h = xt;
          switch (he) {
            case 8:
              hf(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              tt.current === null && (t = !0);
              var p = he;
              if (he = 0, xt = null, ma(e, r, h, p), l && oa) {
                s = 0;
                break e;
              }
              break;
            default:
              p = he, he = 0, xt = null, ma(e, r, h, p);
          }
        }
        zy(), s = Ze;
        break;
      } catch (E) {
        Oh(e, E);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Sl = yn = null, de = n, j.H = u, j.A = i, ue === null && (Se = null, oe = 0, Qu()), s;
  }
  function zy() {
    for (; ue !== null; ) Mh(ue);
  }
  function Ty(e, t) {
    var l = de;
    de |= 2;
    var n = Ah(), u = xh();
    Se !== e || oe !== t ? (Ci = null, Mi = zt() + 500, ha(e, t)) : oa = Ca(
      e,
      t
    );
    e: do
      try {
        if (he !== 0 && ue !== null) {
          t = ue;
          var i = xt;
          t: switch (he) {
            case 1:
              he = 0, xt = null, ma(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (Cr(i)) {
                he = 0, xt = null, Ch(t);
                break;
              }
              t = function() {
                he !== 2 && he !== 9 || Se !== e || (he = 7), hl(e);
              }, i.then(t, t);
              break e;
            case 3:
              he = 7;
              break e;
            case 4:
              he = 5;
              break e;
            case 7:
              Cr(i) ? (he = 0, xt = null, Ch(t)) : (he = 0, xt = null, ma(e, t, i, 7));
              break;
            case 5:
              var s = null;
              switch (ue.tag) {
                case 26:
                  s = ue.memoizedState;
                case 5:
                case 27:
                  var r = ue;
                  if (s ? _m(s) : r.stateNode.complete) {
                    he = 0, xt = null;
                    var h = r.sibling;
                    if (h !== null) ue = h;
                    else {
                      var p = r.return;
                      p !== null ? (ue = p, ji(p)) : ue = null;
                    }
                    break t;
                  }
              }
              he = 0, xt = null, ma(e, t, i, 5);
              break;
            case 6:
              he = 0, xt = null, ma(e, t, i, 6);
              break;
            case 8:
              hf(), Ze = 6;
              break e;
            default:
              throw Error(f(462));
          }
        }
        Ey();
        break;
      } catch (E) {
        Oh(e, E);
      }
    while (!0);
    return Sl = yn = null, j.H = n, j.A = u, de = l, ue !== null ? 0 : (Se = null, oe = 0, Qu(), Ze);
  }
  function Ey() {
    for (; ue !== null && !Q0(); )
      Mh(ue);
  }
  function Mh(e) {
    var t = Vd(e.alternate, e, xl);
    e.memoizedProps = e.pendingProps, t === null ? ji(e) : ue = t;
  }
  function Ch(e) {
    var t = e, l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qd(
          l,
          t,
          t.pendingProps,
          t.type,
          void 0,
          oe
        );
        break;
      case 11:
        t = qd(
          l,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          oe
        );
        break;
      case 5:
        po(t);
      default:
        Kd(l, t), t = ue = pr(t, xl), t = Vd(l, t, xl);
    }
    e.memoizedProps = e.pendingProps, t === null ? ji(e) : ue = t;
  }
  function ma(e, t, l, n) {
    Sl = yn = null, po(t), Pn = null, $a = 0;
    var u = t.return;
    try {
      if (dy(
        e,
        u,
        t,
        l,
        oe
      )) {
        Ze = 1, mi(
          e,
          Bt(l, e.current)
        ), ue = null;
        return;
      }
    } catch (i) {
      if (u !== null) throw ue = u, i;
      Ze = 1, mi(
        e,
        Bt(l, e.current)
      ), ue = null;
      return;
    }
    t.flags & 32768 ? (ae || n === 1 ? e = !0 : oa || (oe & 536870912) !== 0 ? e = !1 : (Kl = e = !0, (n === 2 || n === 9 || n === 3 || n === 6) && (n = tt.current, n !== null && n.tag === 13 && (n.flags |= 16384))), Dh(t, e)) : ji(t);
  }
  function ji(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Dh(
          t,
          Kl
        );
        return;
      }
      e = t.return;
      var l = vy(
        t.alternate,
        t,
        xl
      );
      if (l !== null) {
        ue = l;
        return;
      }
      if (t = t.sibling, t !== null) {
        ue = t;
        return;
      }
      ue = t = e;
    } while (t !== null);
    Ze === 0 && (Ze = 5);
  }
  function Dh(e, t) {
    do {
      var l = yy(e.alternate, e);
      if (l !== null) {
        l.flags &= 32767, ue = l;
        return;
      }
      if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
        ue = e;
        return;
      }
      ue = e = l;
    } while (e !== null);
    Ze = 6, ue = null;
  }
  function Uh(e, t, l, n, u, i, s, r, h, p, E) {
    e.cancelPendingCommit = null;
    do
      wi();
    while (Ce !== 0);
    if ((de & 6) !== 0) throw Error(f(327));
    if (t !== null) {
      if (t === e.current) throw Error(f(177));
      if (i = t.lanes | t.childLanes, i |= Vc, tv(
        e,
        l,
        i,
        s,
        r,
        h
      ), e === Se && (ue = Se = null, oe = 0), Mn = t, el = e, dl = l, sf = i, rf = u, Sh = n, sa = null, (l & 335544064) === l ? (ra = ty(e), n = 10262) : (ra = null, n = 10256), (t.subtreeFlags & n) !== 0 || (t.flags & n) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Cy(Mu, function() {
        return pf(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), Si = !1, n = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || n) {
        n = j.T, j.T = null, u = H.p, H.p = 2, s = de, de |= 4;
        try {
          gy(e, t, l);
        } finally {
          de = s, H.p = u, j.T = n;
        }
      }
      t = Si, Ce = 1, t ? su = ky(
        E,
        e.containerInfo,
        ra,
        vf,
        yf,
        Ny,
        gf,
        pf,
        Oy
      ) : (vf(), yf(), gf());
    }
  }
  function Oy(e) {
    if (Ce !== 0) {
      var t = el.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function Ny() {
    Ce === 3 && (Ce = 0, mh(Mn, el), Ce = 4);
  }
  function vf() {
    if (Ce === 1) {
      Ce = 0;
      var e = el, t = Mn, l = dl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = j.T, j.T = null;
        var u = H.p;
        H.p = 2;
        var i = de;
        de |= 4;
        try {
          iu = Ei = !1, dh(t, e, l), l = Cf;
          var s = or(e.containerInfo), r = l.focusedElem, h = l.selectionRange;
          if (s !== r && r && r.ownerDocument && cr(
            r.ownerDocument.documentElement,
            r
          )) {
            if (h !== null && Bc(r)) {
              var p = h.start, E = h.end;
              if (E === void 0 && (E = p), "selectionStart" in r)
                r.selectionStart = p, r.selectionEnd = Math.min(
                  E,
                  r.value.length
                );
              else {
                var x = r.ownerDocument || document, b = x && x.defaultView || window;
                if (b.getSelection) {
                  var S = b.getSelection(), q = r.textContent.length, G = Math.min(h.start, q), P = h.end === void 0 ? G : Math.min(h.end, q);
                  !S.extend && G > P && (s = P, P = G, G = s);
                  var _ = ir(
                    r,
                    G
                  ), y = ir(
                    r,
                    P
                  );
                  if (_ && y && (S.rangeCount !== 1 || S.anchorNode !== _.node || S.anchorOffset !== _.offset || S.focusNode !== y.node || S.focusOffset !== y.offset)) {
                    var T = x.createRange();
                    T.setStart(_.node, _.offset), S.removeAllRanges(), G > P ? (S.addRange(T), S.extend(y.node, y.offset)) : (T.setEnd(y.node, y.offset), S.addRange(T));
                  }
                }
              }
            }
            for (x = [], S = r; S = S.parentNode; )
              S.nodeType === 1 && x.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < x.length; r++) {
              var C = x[r];
              C.element.scrollLeft = C.left, C.element.scrollTop = C.top;
            }
          }
          Qi = !!Mf, Cf = Mf = null;
        } finally {
          de = i, H.p = u, j.T = n;
        }
      }
      e.current = t, Ce = 2;
    }
  }
  function yf() {
    if (Ce === 2) {
      Ce = 0;
      var e = el, t = Mn, l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        l = j.T, j.T = null;
        var n = H.p;
        H.p = 2;
        var u = de;
        de |= 4;
        try {
          ih(e, t.alternate, t);
        } finally {
          de = u, H.p = n, j.T = l;
        }
      }
      Ce = 3;
    }
  }
  function gf() {
    if (Ce === 4 || Ce === 3) {
      Ce = 0, su = null, K0();
      var e = el, t = Mn, l = dl, n = Sh, u = (l & 335544064) === l ? 10262 : 10256;
      if ((t.subtreeFlags & u) !== 0 || (t.flags & u) !== 0 ? Ce = 5 : (Ce = 0, Mn = el = null, jh(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && ($l = null), bc(l), t = t.stateNode, Tt && typeof Tt.onCommitFiberRoot == "function")
        try {
          Tt.onCommitFiberRoot(
            Ma,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (n !== null) {
        t = j.T, u = H.p, H.p = 2, j.T = null;
        try {
          for (var i = e.onRecoverableError, s = 0; s < n.length; s++) {
            var r = n[s];
            i(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          j.T = t, H.p = u;
        }
      }
      if (n = sa, i = ra, ra = null, n !== null)
        for (sa = null, i === null && (i = []), r = 0; r < n.length; r++)
          (0, n[r])(i);
      (dl & 3) !== 0 && wi(), hl(e), u = e.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? e === df ? ru++ : (ru = 0, df = e) : ru = 0, du(0);
    }
  }
  function jh(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Qa(t)));
  }
  function wi() {
    return su !== null && (su.skipTransition(), su = null), vf(), yf(), gf(), pf();
  }
  function pf() {
    if (Ce !== 5) return !1;
    var e = el, t = sf;
    sf = 0;
    var l = bc(dl), n = j.T, u = H.p;
    try {
      H.p = 32 > l ? 32 : l, j.T = null, l = rf, rf = null;
      var i = el, s = dl;
      if (Ce = 0, Mn = el = null, dl = 0, (de & 6) !== 0) throw Error(f(331));
      var r = de;
      if (de |= 4, ph(i.current), vh(
        i,
        i.current,
        s,
        l
      ), de = r, du(0, !1), Tt && typeof Tt.onPostCommitFiberRoot == "function")
        try {
          Tt.onPostCommitFiberRoot(Ma, i);
        } catch {
        }
      return !0;
    } finally {
      H.p = u, j.T = n, jh(e, t);
    }
  }
  function wh(e, t, l) {
    t = Bt(l, t), t = jo(e.stateNode, t, 2), e = Ll(e, t, 2), e !== null && (Da(e, 2), hl(e));
  }
  function me(e, t, l) {
    if (e.tag === 3)
      wh(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          wh(
            t,
            e,
            l
          );
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof n.componentDidCatch == "function" && ($l === null || !$l.has(n))) {
            e = Bt(l, e), l = Cd(2), n = Ll(t, l, 2), n !== null && (Dd(
              l,
              n,
              t,
              e
            ), Da(n, 2), hl(n));
            break;
          }
        }
        t = t.return;
      }
  }
  function _f(e, t, l) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new by();
      var u = /* @__PURE__ */ new Set();
      n.set(t, u);
    } else
      u = n.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), n.set(t, u));
    u.has(l) || (cf = !0, u.add(l), e = Ay.bind(null, e, t, l), t.then(e, e));
  }
  function Ay(e, t, l) {
    var n = e.pingCache;
    n !== null && n.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Se === e && (oe & l) === l && (Ze === 4 || Ze === 3 && (oe & 62914560) === oe && 300 > zt() - xi ? (de & 2) === 0 && ha(e, 0) : of |= l, fa === oe && (fa = 0)), hl(e);
  }
  function Rh(e, t) {
    t === 0 && (t = Ss()), e = hn(e, t), e !== null && (Da(e, t), hl(e));
  }
  function xy(e) {
    var t = e.memoizedState, l = 0;
    t !== null && (l = t.retryLane), Rh(e, l);
  }
  function My(e, t) {
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
    n !== null && n.delete(t), Rh(e, l);
  }
  function Cy(e, t) {
    return yc(e, t);
  }
  var va = null, ya = null, bf = !1, Ri = !1, Sf = !1, Fl = 0;
  function hl(e) {
    e !== ya && e.next === null && (ya === null ? va = ya = e : ya = ya.next = e), Ri = !0, bf || (bf = !0, Uy());
  }
  function du(e, t) {
    if (!Sf && Ri) {
      Sf = !0;
      do
        for (var l = !1, n = va; n !== null; ) {
          if (e !== 0) {
            var u = n.pendingLanes;
            if (u === 0) var i = 0;
            else {
              var s = n.suspendedLanes, r = n.pingedLanes;
              i = (1 << 31 - Et(42 | e) + 1) - 1, i &= u & ~(s & ~r), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (l = !0, Bh(n, i));
          } else
            i = oe, i = ju(
              n,
              n === Se ? i : 0,
              n.cancelPendingCommit !== null || n.timeoutHandle !== -1
            ), (i & 3) === 0 || Ca(n, i) || (l = !0, Bh(n, i));
          n = n.next;
        }
      while (l);
      Sf = !1;
    }
  }
  function Dy() {
    Zh();
  }
  function Zh() {
    Ri = bf = !1;
    var e = 0;
    Fl !== 0 && Ly() && (e = Fl);
    for (var t = zt(), l = null, n = va; n !== null; ) {
      var u = n.next, i = Hh(n, t);
      i === 0 ? (n.next = null, l === null ? va = u : l.next = u, u === null && (ya = l)) : (l = n, (e !== 0 || (i & 3) !== 0) && (Ri = !0)), n = u;
    }
    Ce !== 0 && Ce !== 5 || du(e), Fl !== 0 && (Fl = 0);
  }
  function Hh(e, t) {
    for (var l = e.suspendedLanes, n = e.pingedLanes, u = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - Et(i), r = 1 << s, h = u[s];
      h === -1 ? ((r & l) === 0 || (r & n) !== 0) && (u[s] = ev(r, t)) : h <= t && (e.expiredLanes |= r), i &= ~r;
    }
    if (t = Se, l = oe, l = ju(
      e,
      e === t ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n = e.callbackNode, l === 0 || e === t && (he === 2 || he === 9) || e.cancelPendingCommit !== null)
      return n !== null && n !== null && gc(n), e.callbackNode = null, e.callbackPriority = 0;
    if ((l & 3) === 0 || Ca(e, l)) {
      if (t = l & -l, t === e.callbackPriority) return t;
      switch (n !== null && gc(n), bc(l)) {
        case 2:
        case 8:
          l = _s;
          break;
        case 32:
          l = Mu;
          break;
        case 268435456:
          l = bs;
          break;
        default:
          l = Mu;
      }
      return n = qh.bind(null, e), l = yc(l, n), e.callbackPriority = t, e.callbackNode = l, t;
    }
    return n !== null && n !== null && gc(n), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function qh(e, t) {
    if (Ce !== 0 && Ce !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var l = e.callbackNode;
    if (wi() && e.callbackNode !== l)
      return null;
    var n = oe;
    return n = ju(
      e,
      e === Se ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), n === 0 ? null : (Th(e, n, t), Hh(e, zt()), e.callbackNode != null && e.callbackNode === l ? qh.bind(null, e) : null);
  }
  function Bh(e, t) {
    if (wi()) return null;
    Th(e, t, !0);
  }
  function Uy() {
    Vy(function() {
      (de & 6) !== 0 ? yc(
        ps,
        Dy
      ) : Zh();
    });
  }
  function zf() {
    if (Fl === 0) {
      var e = pn;
      e === 0 && (e = Cu, Cu <<= 1, (Cu & 261888) === 0 && (Cu = 256)), Fl = e;
    }
    return Fl;
  }
  function Yh(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Hu("" + e);
  }
  function Gh(e, t) {
    var l = t.ownerDocument.createElement("input");
    return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
  }
  function jy(e, t, l, n, u) {
    if (t === "submit" && l && l.stateNode === u) {
      var i = Yh(
        (u[mt] || null).action
      ), s = n.submitter;
      s && (t = (t = s[mt] || null) ? Yh(t.formAction) : s.getAttribute("formAction"), t !== null && (i = t, s = null));
      var r = new Gu(
        "action",
        "action",
        null,
        n,
        u
      );
      e.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (n.defaultPrevented) {
                if (Fl !== 0) {
                  var h = s ? Gh(u, s) : new FormData(u);
                  Ao(
                    l,
                    {
                      pending: !0,
                      data: h,
                      method: u.method,
                      action: i
                    },
                    null,
                    h
                  );
                }
              } else
                typeof i == "function" && (r.preventDefault(), h = s ? Gh(u, s) : new FormData(u), Ao(
                  l,
                  {
                    pending: !0,
                    data: h,
                    method: u.method,
                    action: i
                  },
                  i,
                  h
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Tf = 0; Tf < Xc.length; Tf++) {
    var Ef = Xc[Tf], wy = Ef.toLowerCase(), Ry = Ef[0].toUpperCase() + Ef.slice(1);
    Wt(
      wy,
      "on" + Ry
    );
  }
  Wt(rr, "onAnimationEnd"), Wt(dr, "onAnimationIteration"), Wt(hr, "onAnimationStart"), Wt("dblclick", "onDoubleClick"), Wt("focusin", "onFocus"), Wt("focusout", "onBlur"), Wt(Jv, "onTransitionRun"), Wt($v, "onTransitionStart"), Wt(kv, "onTransitionCancel"), Wt(mr, "onTransitionEnd"), Hn("onMouseEnter", ["mouseout", "mouseover"]), Hn("onMouseLeave", ["mouseout", "mouseover"]), Hn("onPointerEnter", ["pointerout", "pointerover"]), Hn("onPointerLeave", ["pointerout", "pointerover"]), fn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), fn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), fn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), fn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), fn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var hu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Zy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(hu)
  );
  function Lh(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var n = e[l], u = n.event;
      n = n.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var s = n.length - 1; 0 <= s; s--) {
            var r = n[s], h = r.instance, p = r.currentTarget;
            if (r = r.listener, h !== i && u.isPropagationStopped())
              break e;
            i = r, u.currentTarget = p;
            try {
              i(u);
            } catch (E) {
              Vu(E);
            }
            u.currentTarget = null, i = h;
          }
        else
          for (s = 0; s < n.length; s++) {
            if (r = n[s], h = r.instance, p = r.currentTarget, r = r.listener, h !== i && u.isPropagationStopped())
              break e;
            i = r, u.currentTarget = p;
            try {
              i(u);
            } catch (E) {
              Vu(E);
            }
            u.currentTarget = null, i = h;
          }
      }
    }
  }
  function ie(e, t) {
    var l = t[Sc];
    l === void 0 && (l = t[Sc] = /* @__PURE__ */ new Set());
    var n = e + "__bubble";
    l.has(n) || (Xh(t, e, 2, !1), l.add(n));
  }
  function Of(e, t, l) {
    var n = 0;
    t && (n |= 4), Xh(
      l,
      e,
      n,
      t
    );
  }
  var Zi = "_reactListening" + Math.random().toString(36).slice(2);
  function Nf(e) {
    if (!e[Zi]) {
      e[Zi] = !0, xs.forEach(function(l) {
        l !== "selectionchange" && (Zy.has(l) || Of(l, !1, e), Of(l, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Zi] || (t[Zi] = !0, Of("selectionchange", !1, t));
    }
  }
  function Xh(e, t, l, n) {
    switch (Mm(t)) {
      case 2:
        var u = Tg;
        break;
      case 8:
        u = Eg;
        break;
      default:
        u = Lf;
    }
    l = u.bind(
      null,
      t,
      l,
      e
    ), u = void 0, !Cc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), n ? u !== void 0 ? e.addEventListener(t, l, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, l, !0) : u !== void 0 ? e.addEventListener(t, l, {
      passive: u
    }) : e.addEventListener(t, l, !1);
  }
  function Af(e, t, l, n, u) {
    var i = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (; ; ) {
        if (n === null) return;
        var s = n.tag;
        if (s === 3 || s === 4) {
          var r = n.stateNode.containerInfo;
          if (r === u) break;
          if (s === 4)
            for (s = n.return; s !== null; ) {
              var h = s.tag;
              if ((h === 3 || h === 4) && s.stateNode.containerInfo === u)
                return;
              s = s.return;
            }
          for (; r !== null; ) {
            if (s = on(r), s === null) return;
            if (h = s.tag, h === 5 || h === 6 || h === 26 || h === 27) {
              n = i = s;
              continue e;
            }
            r = r.parentNode;
          }
        }
        n = n.return;
      }
    Gs(function() {
      var p = i, E = xc(l), x = [];
      e: {
        var b = vr.get(e);
        if (b !== void 0) {
          var S = Gu, q = e;
          switch (e) {
            case "keypress":
              if (Bu(l) === 0) break e;
            case "keydown":
            case "keyup":
              S = Ov;
              break;
            case "focusin":
              q = "focus", S = wc;
              break;
            case "focusout":
              q = "blur", S = wc;
              break;
            case "beforeblur":
            case "afterblur":
              S = wc;
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
              S = Vs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = hv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = xv;
              break;
            case rr:
            case dr:
            case hr:
              S = yv;
              break;
            case mr:
              S = Cv;
              break;
            case "scroll":
            case "scrollend":
              S = rv;
              break;
            case "wheel":
              S = Uv;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = pv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Ks;
              break;
            case "toggle":
            case "beforetoggle":
              S = wv;
          }
          var G = (t & 4) !== 0, P = !G && (e === "scroll" || e === "scrollend"), _ = G ? b !== null ? b + "Capture" : null : b;
          G = [];
          for (var y = p, T; y !== null; ) {
            var C = y;
            if (T = C.stateNode, C = C.tag, C !== 5 && C !== 26 && C !== 27 || T === null || _ === null || (C = wa(y, _), C != null && G.push(
              mu(y, C, T)
            )), P) break;
            y = y.return;
          }
          0 < G.length && (b = new S(
            b,
            q,
            null,
            l,
            E
          ), x.push({ event: b, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (S = e === "mouseover" || e === "pointerover", b = e === "mouseout" || e === "pointerout", S && l !== Ac && (q = l.relatedTarget || l.fromElement) && (on(q) || q[wn]))
            break e;
          (b || S) && (q = E.window === E ? E : (S = E.ownerDocument) ? S.defaultView || S.parentWindow : window, b ? (S = l.relatedTarget || l.toElement, b = p, S = S ? on(S) : null, S !== null && (P = m(S), G = S.tag, S !== P || G !== 5 && G !== 27 && G !== 6) && (S = null)) : (b = null, S = p), b !== S && (G = Vs, C = "onMouseLeave", _ = "onMouseEnter", y = "mouse", (e === "pointerout" || e === "pointerover") && (G = Ks, C = "onPointerLeave", _ = "onPointerEnter", y = "pointer"), P = b == null ? q : ja(b), T = S == null ? q : ja(S), q = new G(
            C,
            y + "leave",
            b,
            l,
            E
          ), q.target = P, q.relatedTarget = T, C = null, on(E) === p && (G = new G(
            _,
            y + "enter",
            S,
            l,
            E
          ), G.target = T, G.relatedTarget = P, C = G), P = C, G = b && S ? He(
            b,
            S,
            Hy
          ) : null, b !== null && Vh(
            x,
            q,
            b,
            G,
            !1
          ), S !== null && P !== null && Vh(
            x,
            P,
            S,
            G,
            !0
          )));
        }
        e: {
          if (b = p ? ja(p) : window, S = b.nodeName && b.nodeName.toLowerCase(), S === "select" || S === "input" && b.type === "file")
            var L = er;
          else if (Is(b))
            if (tr)
              L = Vv;
            else {
              L = Lv;
              var fe = Gv;
            }
          else
            S = b.nodeName, !S || S.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? p && Nc(p.elementType) && (L = er) : L = Xv;
          if (L && (L = L(e, p))) {
            Ps(
              x,
              L,
              l,
              E
            );
            break e;
          }
          fe && fe(e, b, p), e === "focusout" && p && b.type === "number" && p.memoizedProps.value != null && Oc(b, "number", b.value);
        }
        switch (fe = p ? ja(p) : window, e) {
          case "focusin":
            (Is(fe) || fe.contentEditable === "true") && (Xn = fe, Yc = p, La = null);
            break;
          case "focusout":
            La = Yc = Xn = null;
            break;
          case "mousedown":
            Gc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Gc = !1, fr(x, l, E);
            break;
          case "selectionchange":
            if (Kv) break;
          case "keydown":
          case "keyup":
            fr(x, l, E);
        }
        var V;
        if (Zc)
          e: {
            switch (e) {
              case "compositionstart":
                var k = "onCompositionStart";
                break e;
              case "compositionend":
                k = "onCompositionEnd";
                break e;
              case "compositionupdate":
                k = "onCompositionUpdate";
                break e;
            }
            k = void 0;
          }
        else
          Ln ? Fs(e, l) && (k = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (k = "onCompositionStart");
        k && (Js && l.locale !== "ko" && (Ln || k !== "onCompositionStart" ? k === "onCompositionEnd" && Ln && (V = Ls()) : (wl = E, Dc = "value" in wl ? wl.value : wl.textContent, Ln = !0)), fe = Hi(p, k), 0 < fe.length && (k = new Qs(
          k,
          e,
          null,
          l,
          E
        ), x.push({ event: k, listeners: fe }), V ? k.data = V : (V = Ws(l), V !== null && (k.data = V)))), (V = Zv ? Hv(e, l) : qv(e, l)) && (k = Hi(p, "onBeforeInput"), 0 < k.length && (fe = new Qs(
          "onBeforeInput",
          "beforeinput",
          null,
          l,
          E
        ), x.push({
          event: fe,
          listeners: k
        }), fe.data = V)), jy(
          x,
          e,
          p,
          l,
          E
        );
      }
      Lh(x, t);
    });
  }
  function mu(e, t, l) {
    return {
      instance: e,
      listener: t,
      currentTarget: l
    };
  }
  function Hi(e, t) {
    for (var l = t + "Capture", n = []; e !== null; ) {
      var u = e, i = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || i === null || (u = wa(e, l), u != null && n.unshift(
        mu(e, u, i)
      ), u = wa(e, t), u != null && n.push(
        mu(e, u, i)
      )), e.tag === 3) return n;
      e = e.return;
    }
    return [];
  }
  function Hy(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Vh(e, t, l, n, u) {
    for (var i = t._reactName, s = []; l !== null && l !== n; ) {
      var r = l, h = r.alternate, p = r.stateNode;
      if (r = r.tag, h !== null && h === n) break;
      r !== 5 && r !== 26 && r !== 27 || p === null || (h = p, u ? (p = wa(l, i), p != null && s.unshift(
        mu(l, p, h)
      )) : u || (p = wa(l, i), p != null && s.push(
        mu(l, p, h)
      ))), l = l.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var qy = /\r\n?/g, By = /\u0000|\uFFFD/g;
  function Qh(e) {
    return (typeof e == "string" ? e : "" + e).replace(qy, `
`).replace(By, "");
  }
  function Kh(e, t) {
    return t = Qh(t), Qh(e) === t;
  }
  function _e(e, t, l, n, u, i) {
    switch (l) {
      case "children":
        if (typeof n == "string")
          t === "body" || t === "textarea" && n === "" || Bn(e, n);
        else if (typeof n == "number" || typeof n == "bigint")
          t !== "body" && Bn(e, "" + n);
        else return;
        break;
      case "className":
        Ru(e, "class", n);
        break;
      case "tabIndex":
        Ru(e, "tabindex", n);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ru(e, l, n);
        break;
      case "style":
        Bs(e, n, i);
        return;
      case "data":
        if (t !== "object") {
          Ru(e, "data", n);
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
        n = Hu("" + n), e.setAttribute(l, n);
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
          typeof i == "function" && (l === "formAction" ? (t !== "input" && _e(e, t, "name", u.name, u, null), _e(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), _e(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), _e(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (_e(e, t, "encType", u.encType, u, null), _e(e, t, "method", u.method, u, null), _e(e, t, "target", u.target, u, null)));
        if (n == null || typeof n == "symbol" || typeof n == "boolean") {
          e.removeAttribute(l);
          break;
        }
        n = Hu("" + n), e.setAttribute(l, n);
        break;
      case "onClick":
        n != null && (e.onclick = vl);
        return;
      case "onScroll":
        n != null && ie("scroll", e);
        return;
      case "onScrollEnd":
        n != null && ie("scrollend", e);
        return;
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
        l = Hu("" + n), e.setAttributeNS(
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
        ie("beforetoggle", e), ie("toggle", e), wu(e, "popover", n);
        break;
      case "xlinkActuate":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          n
        );
        break;
      case "xlinkArcrole":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          n
        );
        break;
      case "xlinkRole":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          n
        );
        break;
      case "xlinkShow":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          n
        );
        break;
      case "xlinkTitle":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          n
        );
        break;
      case "xlinkType":
        ml(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          n
        );
        break;
      case "xmlBase":
        ml(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          n
        );
        break;
      case "xmlLang":
        ml(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          n
        );
        break;
      case "xmlSpace":
        ml(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          n
        );
        break;
      case "is":
        wu(e, "is", n);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N")
          l = fv.get(l) || l, wu(e, l, n);
        else return;
    }
    re = !0;
  }
  function xf(e, t, l, n, u, i) {
    switch (l) {
      case "style":
        Bs(e, n, i);
        return;
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
        if (typeof n == "string") Bn(e, n);
        else if (typeof n == "number" || typeof n == "bigint")
          Bn(e, "" + n);
        else return;
        break;
      case "onScroll":
        n != null && ie("scroll", e);
        return;
      case "onScrollEnd":
        n != null && ie("scrollend", e);
        return;
      case "onClick":
        n != null && (e.onclick = vl);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Ms.hasOwnProperty(l))
          e: {
            if (l[0] === "o" && l[1] === "n" && (u = l.endsWith("Capture"), t = l.slice(2, u ? l.length - 7 : void 0), i = e[mt] || null, i = i != null ? i[l] : null, typeof i == "function" && e.removeEventListener(t, i, u), typeof n == "function")) {
              typeof i != "function" && i !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, n, u);
              break e;
            }
            re = !0, l in e ? e[l] = n : n === !0 ? e.setAttribute(l, "") : wu(e, l, n);
          }
        return;
    }
    re = !0;
  }
  function nt(e, t, l) {
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
        ie("error", e), ie("load", e);
        var n = !1, u = !1, i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var s = l[i];
            if (s != null)
              switch (i) {
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
                  _e(e, t, i, s, l, null);
              }
          }
        u && _e(e, t, "srcSet", l.srcSet, l, null), n && _e(e, t, "src", l.src, l, null);
        return;
      case "input":
        ie("invalid", e);
        var r = i = s = u = null, h = null, p = null;
        for (n in l)
          if (l.hasOwnProperty(n)) {
            var E = l[n];
            if (E != null)
              switch (n) {
                case "name":
                  u = E;
                  break;
                case "type":
                  s = E;
                  break;
                case "checked":
                  h = E;
                  break;
                case "defaultChecked":
                  p = E;
                  break;
                case "value":
                  i = E;
                  break;
                case "defaultValue":
                  r = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(f(137, t));
                  break;
                default:
                  _e(e, t, n, E, l, null);
              }
          }
        Rs(
          e,
          i,
          r,
          h,
          p,
          s,
          u,
          !1
        );
        return;
      case "select":
        ie("invalid", e), n = s = i = null;
        for (u in l)
          if (l.hasOwnProperty(u) && (r = l[u], r != null))
            switch (u) {
              case "value":
                i = r;
                break;
              case "defaultValue":
                s = r;
                break;
              case "multiple":
                n = r;
              default:
                _e(e, t, u, r, l, null);
            }
        t = i, l = s, e.multiple = !!n, t != null ? qn(e, !!n, t, !1) : l != null && qn(e, !!n, l, !0);
        return;
      case "textarea":
        ie("invalid", e), i = u = n = null;
        for (s in l)
          if (l.hasOwnProperty(s) && (r = l[s], r != null))
            switch (s) {
              case "value":
                n = r;
                break;
              case "defaultValue":
                u = r;
                break;
              case "children":
                i = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(f(91));
                break;
              default:
                _e(e, t, s, r, l, null);
            }
        Hs(e, n, u, i);
        return;
      case "option":
        for (h in l)
          if (l.hasOwnProperty(h) && (n = l[h], n != null))
            switch (h) {
              case "selected":
                e.selected = n && typeof n != "function" && typeof n != "symbol";
                break;
              default:
                _e(e, t, h, n, l, null);
            }
        return;
      case "dialog":
        ie("beforetoggle", e), ie("toggle", e), ie("cancel", e), ie("close", e);
        break;
      case "iframe":
      case "object":
        ie("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < hu.length; n++)
          ie(hu[n], e);
        break;
      case "image":
        ie("error", e), ie("load", e);
        break;
      case "details":
        ie("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ie("error", e), ie("load", e);
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
        for (p in l)
          if (l.hasOwnProperty(p) && (n = l[p], n != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, t));
              default:
                _e(e, t, p, n, l, null);
            }
        return;
      default:
        if (Nc(t)) {
          for (E in l)
            l.hasOwnProperty(E) && (n = l[E], n !== void 0 && xf(
              e,
              t,
              E,
              n,
              l,
              void 0
            ));
          return;
        }
    }
    for (r in l)
      l.hasOwnProperty(r) && (n = l[r], n != null && _e(e, t, r, n, l, null));
  }
  function Yy(e, t, l, n) {
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
        var u = null, i = null, s = null, r = null, h = null, p = null, E = null;
        for (S in l) {
          var x = l[S];
          if (l.hasOwnProperty(S) && x != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = x;
              default:
                n.hasOwnProperty(S) || _e(e, t, S, null, n, x);
            }
        }
        for (var b in n) {
          var S = n[b];
          if (x = l[b], n.hasOwnProperty(b) && (S != null || x != null))
            switch (b) {
              case "type":
                S !== x && (re = !0), i = S;
                break;
              case "name":
                S !== x && (re = !0), u = S;
                break;
              case "checked":
                S !== x && (re = !0), p = S;
                break;
              case "defaultChecked":
                S !== x && (re = !0), E = S;
                break;
              case "value":
                S !== x && (re = !0), s = S;
                break;
              case "defaultValue":
                S !== x && (re = !0), r = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(f(137, t));
                break;
              default:
                S !== x && _e(
                  e,
                  t,
                  b,
                  S,
                  n,
                  x
                );
            }
        }
        Ec(
          e,
          s,
          r,
          h,
          p,
          E,
          i,
          u
        );
        return;
      case "select":
        S = s = r = b = null;
        for (i in l)
          if (h = l[i], l.hasOwnProperty(i) && h != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                S = h;
              default:
                n.hasOwnProperty(i) || _e(
                  e,
                  t,
                  i,
                  null,
                  n,
                  h
                );
            }
        for (u in n)
          if (i = n[u], h = l[u], n.hasOwnProperty(u) && (i != null || h != null))
            switch (u) {
              case "value":
                i !== h && (re = !0), b = i;
                break;
              case "defaultValue":
                i !== h && (re = !0), r = i;
                break;
              case "multiple":
                i !== h && (re = !0), s = i;
              default:
                i !== h && _e(
                  e,
                  t,
                  u,
                  i,
                  n,
                  h
                );
            }
        t = r, l = s, n = S, b != null ? qn(e, !!l, b, !1) : !!n != !!l && (t != null ? qn(e, !!l, t, !0) : qn(e, !!l, l ? [] : "", !1));
        return;
      case "textarea":
        S = b = null;
        for (r in l)
          if (u = l[r], l.hasOwnProperty(r) && u != null && !n.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                _e(e, t, r, null, n, u);
            }
        for (s in n)
          if (u = n[s], i = l[s], n.hasOwnProperty(s) && (u != null || i != null))
            switch (s) {
              case "value":
                u !== i && (re = !0), b = u;
                break;
              case "defaultValue":
                u !== i && (re = !0), S = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(f(91));
                break;
              default:
                u !== i && _e(e, t, s, u, n, i);
            }
        Zs(e, b, S);
        return;
      case "option":
        for (var q in l)
          if (b = l[q], l.hasOwnProperty(q) && b != null && !n.hasOwnProperty(q))
            switch (q) {
              case "selected":
                e.selected = !1;
                break;
              default:
                _e(
                  e,
                  t,
                  q,
                  null,
                  n,
                  b
                );
            }
        for (h in n)
          if (b = n[h], S = l[h], n.hasOwnProperty(h) && b !== S && (b != null || S != null))
            switch (h) {
              case "selected":
                b !== S && (re = !0), e.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                _e(
                  e,
                  t,
                  h,
                  b,
                  n,
                  S
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
        for (var G in l)
          b = l[G], l.hasOwnProperty(G) && b != null && !n.hasOwnProperty(G) && _e(e, t, G, null, n, b);
        for (p in n)
          if (b = n[p], S = l[p], n.hasOwnProperty(p) && b !== S && (b != null || S != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(f(137, t));
                break;
              default:
                _e(
                  e,
                  t,
                  p,
                  b,
                  n,
                  S
                );
            }
        return;
      default:
        if (Nc(t)) {
          for (var P in l)
            b = l[P], l.hasOwnProperty(P) && b !== void 0 && !n.hasOwnProperty(P) && xf(
              e,
              t,
              P,
              void 0,
              n,
              b
            );
          for (E in n)
            b = n[E], S = l[E], !n.hasOwnProperty(E) || b === S || b === void 0 && S === void 0 || xf(
              e,
              t,
              E,
              b,
              n,
              S
            );
          return;
        }
    }
    for (var _ in l)
      b = l[_], l.hasOwnProperty(_) && b != null && !n.hasOwnProperty(_) && _e(e, t, _, null, n, b);
    for (x in n)
      b = n[x], S = l[x], !n.hasOwnProperty(x) || b === S || b == null && S == null || _e(e, t, x, b, n, S);
  }
  function Jh(e) {
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
  function Gy() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), n = 0; n < l.length; n++) {
        var u = l[n], i = u.transferSize, s = u.initiatorType, r = u.duration;
        if (i && r && Jh(s)) {
          for (s = 0, r = u.responseEnd, n += 1; n < l.length; n++) {
            var h = l[n], p = h.startTime;
            if (p > r) break;
            var E = h.transferSize, x = h.initiatorType;
            E && Jh(x) && (h = h.responseEnd, s += E * (h < r ? 1 : (r - p) / (h - p)));
          }
          if (--n, t += 8 * (i + s) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Mf = null, Cf = null;
  function qi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function $h(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function kh(e, t) {
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
  function Df(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Uf = null;
  function Ly() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Uf ? !1 : (Uf = e, !0) : (Uf = null, !1);
  }
  var Fh = typeof setTimeout == "function" ? setTimeout : void 0, Xy = typeof clearTimeout == "function" ? clearTimeout : void 0, Wh = typeof Promise == "function" ? Promise : void 0, Vy = typeof queueMicrotask == "function" ? queueMicrotask : typeof Wh < "u" ? function(e) {
    return Wh.resolve(null).then(e).catch(Qy);
  } : Fh;
  function Qy(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Wl(e) {
    return e === "head";
  }
  function Ih(e, t) {
    var l = t, n = 0;
    do {
      var u = l.nextSibling;
      if (e.removeChild(l), u && u.nodeType === 8)
        if (l = u.data, l === "/$" || l === "/&") {
          if (n === 0) {
            e.removeChild(u), Sa(t);
            return;
          }
          n--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&")
          n++;
        else if (l === "html")
          vu(e.ownerDocument.documentElement);
        else if (l === "head") {
          l = e.ownerDocument.head, vu(l);
          for (var i = l.firstChild; i; ) {
            var s = i.nextSibling, r = i.nodeName;
            i[Ua] || r === "SCRIPT" || r === "STYLE" || r === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = s;
          }
        } else
          l === "body" && vu(e.ownerDocument.body);
      l = u;
    } while (l);
    Sa(t);
  }
  function Ph(e, t) {
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
  function em(e, t, l) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, l != null && (e.style.viewTransitionClass = l), l = getComputedStyle(e), l.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var n = 1;
      else
        for (var u = n = 0; u < t.length; u++) {
          var i = t[u];
          0 < i.width && 0 < i.height && n++;
        }
      n === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + l.paddingTop, e.marginBottom = "-" + l.paddingBottom);
    }
  }
  function tm(e, t) {
    e = e.style, t = t.style;
    var l = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), l = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = l == null || typeof l == "boolean" ? "" : ("" + l).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (l = t.display, e.display = l == null || typeof l == "boolean" ? "" : l, l = t.margin, l != null ? e.margin = l : (l = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = l == null || typeof l == "boolean" ? "" : l, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Ky(e, t, l) {
    return l = l.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= l.innerHeight && e.left <= l.innerWidth
    };
  }
  function jf(e) {
    var t = e.getBoundingClientRect(), l = getComputedStyle(e);
    return Ky(t, l, e);
  }
  function Jy(e) {
    return e.documentElement.clientHeight;
  }
  function $y(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function ky(e, t, l, n, u, i, s, r, h) {
    var p = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var E = p.startViewTransition({
        update: function() {
          var x = p.defaultView, b = x.navigation && x.navigation.transition, S = p.fonts.status;
          n();
          var q = [];
          if (S === "loaded" && (Jy(p), p.fonts.status === "loading" && q.push(p.fonts.ready)), S = q.length, e !== null)
            for (var G = e.suspenseyImages, P = 0, _ = 0; _ < G.length; _++) {
              var y = G[_];
              if (!y.complete) {
                var T = y.getBoundingClientRect();
                if (0 < T.bottom && 0 < T.right && T.top < x.innerHeight && T.left < x.innerWidth) {
                  if (P += bm(y), P > Li) {
                    q.length = S;
                    break;
                  }
                  y = new Promise(
                    $y.bind(y)
                  ), q.push(y);
                }
              }
            }
          if (0 < q.length)
            return x = Promise.race([
              Promise.all(q),
              new Promise(function(C) {
                return setTimeout(C, 500);
              })
            ]).then(u, u), (b ? Promise.allSettled([b.finished, x]) : x).then(i, i);
          if (u(), b)
            return b.finished.then(
              i,
              i
            );
          i();
        },
        types: l
      });
      return p.__reactViewTransition = E, E.ready.then(
        function() {
          for (var x = p.documentElement.getAnimations({
            subtree: !0
          }), b = 0; b < x.length; b++) {
            var S = x[b].effect, q = S.pseudoElement;
            if (q != null && q.startsWith("::view-transition")) {
              q = S.getKeyframes();
              for (var G = void 0, P = void 0, _ = !0, y = 0; y < q.length; y++) {
                var T = q[y], C = T.width;
                if (G === void 0) G = C;
                else if (G !== C) {
                  _ = !1;
                  break;
                }
                if (C = T.height, P === void 0) P = C;
                else if (P !== C) {
                  _ = !1;
                  break;
                }
                delete T.width, delete T.height, T.transform === "none" && delete T.transform;
              }
              _ && G !== void 0 && P !== void 0 && (S.setKeyframes(q), _ = getComputedStyle(
                S.target,
                S.pseudoElement
              ), _.width !== G || _.height !== P) && (_ = q[0], _.width = G, _.height = P, _ = q[q.length - 1], _.width = G, _.height = P, S.setKeyframes(q));
            }
          }
          s();
        },
        function(x) {
          p.__reactViewTransition === E && (p.__reactViewTransition = null);
          try {
            if (typeof x == "object" && x !== null)
              switch (x.name) {
                case "InvalidStateError":
                  (x.message === "View transition was skipped because document visibility state is hidden." || x.message === "Skipping view transition because document visibility state has become hidden." || x.message === "Skipping view transition because viewport size changed." || x.message === "Transition was aborted because of invalid state") && (x = null);
              }
            x !== null && h(x);
          } finally {
            n(), u(), s();
          }
        }
      ), E.finished.finally(function() {
        for (var x = p.documentElement, b = x.getAnimations({ subtree: !0 }), S = 0; S < b.length; S++) {
          var q = b[S], G = q.effect, P = G.pseudoElement;
          P != null && P.startsWith("::view-transition") && G.target === x && q.cancel();
        }
        p.__reactViewTransition === E && (p.__reactViewTransition = null), r();
      }), E;
    } catch {
      return n(), u(), s(), null;
    }
  }
  function Cn(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Cn.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : te({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Cn.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, l = e.getAnimations({ subtree: !0 }), n = [], u = 0; u < l.length; u++) {
      var i = l[u].effect;
      i !== null && i.target === e && i.pseudoElement === t && n.push(l[u]);
    }
    return n;
  }, Cn.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function lm(e) {
    return {
      name: e,
      group: new Cn("group", e),
      imagePair: new Cn("image-pair", e),
      old: new Cn("old", e),
      new: new Cn("new", e)
    };
  }
  function Dt(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Dt.prototype.addEventListener = function(e, t, l) {
    this._eventListeners === null && (this._eventListeners = []);
    var n = this._eventListeners;
    am(n, e, t, l) === -1 && (n.push({
      type: e,
      listener: t,
      optionsOrUseCapture: l
    }), w(
      this._fragmentFiber.child,
      !1,
      Fy,
      e,
      t,
      l
    )), this._eventListeners = n;
  };
  function Fy(e, t, l, n) {
    return $(e).addEventListener(
      t,
      l,
      n
    ), !1;
  }
  Dt.prototype.removeEventListener = function(e, t, l) {
    var n = this._eventListeners;
    n !== null && typeof n < "u" && 0 < n.length && (w(
      this._fragmentFiber.child,
      !1,
      Wy,
      e,
      t,
      l
    ), e = am(
      n,
      e,
      t,
      l
    ), this._eventListeners !== null && this._eventListeners.splice(e, 1));
  };
  function Wy(e, t, l, n) {
    return $(e).removeEventListener(
      t,
      l,
      n
    ), !1;
  }
  function nm(e) {
    return e == null ? "0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0") + "&o=" + (e.once ? "1" : "0") + "&p=" + (e.passive ? "1" : "0");
  }
  function am(e, t, l, n) {
    for (var u = 0; u < e.length; u++) {
      var i = e[u];
      if (i.type === t && i.listener === l && nm(i.optionsOrUseCapture) === nm(n))
        return u;
    }
    return -1;
  }
  Dt.prototype.dispatchEvent = function(e) {
    var t = B(this._fragmentFiber);
    if (t === null) return !0;
    t = $(t);
    var l = this._eventListeners;
    if (l !== null && 0 < l.length || !e.bubbles) {
      var n = document.createTextNode("");
      if (l)
        for (var u = 0; u < l.length; u++) {
          var i = l[u];
          n.addEventListener(
            i.type,
            i.listener,
            i.optionsOrUseCapture
          );
        }
      if (t.appendChild(n), e = n.dispatchEvent(e), l)
        for (u = 0; u < l.length; u++)
          i = l[u], n.removeEventListener(
            i.type,
            i.listener,
            i.optionsOrUseCapture
          );
      return t.removeChild(n), e;
    }
    return t.dispatchEvent(e);
  }, Dt.prototype.focus = function(e) {
    w(
      this._fragmentFiber.child,
      !0,
      um,
      e,
      void 0,
      void 0
    );
  };
  function um(e, t) {
    return e = $(e), ig(e, t);
  }
  Dt.prototype.focusLast = function(e) {
    var t = [];
    w(
      this._fragmentFiber.child,
      !0,
      wf,
      t,
      void 0,
      void 0
    );
    for (var l = t.length - 1; 0 <= l && !um(t[l], e); l--) ;
  };
  function wf(e, t) {
    return t.push(e), !1;
  }
  Dt.prototype.blur = function() {
    w(
      this._fragmentFiber.child,
      !1,
      Iy,
      void 0,
      void 0,
      void 0
    );
  };
  function Iy(e) {
    return e = $(e), e === e.ownerDocument.activeElement ? (e.blur(), !0) : !1;
  }
  Dt.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), w(
      this._fragmentFiber.child,
      !1,
      Py,
      e,
      void 0,
      void 0
    );
  };
  function Py(e, t) {
    return e = $(e), t.observe(e), !1;
  }
  Dt.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    t !== null && t.has(e) && (t.delete(e), w(
      this._fragmentFiber.child,
      !1,
      eg,
      e,
      void 0,
      void 0
    ));
  };
  function eg(e, t) {
    return e = $(e), t.unobserve(e), !1;
  }
  Dt.prototype.getClientRects = function() {
    var e = [];
    return w(
      this._fragmentFiber.child,
      !1,
      tg,
      e,
      void 0,
      void 0
    ), e;
  };
  function tg(e, t) {
    return e = $(e), t.push.apply(t, e.getClientRects()), !1;
  }
  Dt.prototype.getRootNode = function(e) {
    var t = B(this._fragmentFiber);
    return t === null ? this : $(t).getRootNode(e);
  }, Dt.prototype.compareDocumentPosition = function(e) {
    var t = B(this._fragmentFiber);
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var l = [];
    w(
      this._fragmentFiber.child,
      !1,
      wf,
      l,
      void 0,
      void 0
    );
    var n = $(t);
    if (l.length === 0) {
      l = this._fragmentFiber;
      var u = n.compareDocumentPosition(e);
      return t = u, n === e ? t = Node.DOCUMENT_POSITION_CONTAINS : u & Node.DOCUMENT_POSITION_CONTAINED_BY && (w(l.sibling, !1, ze), l = ve, ve = null, l === null ? t = Node.DOCUMENT_POSITION_PRECEDING : (e = $(l).compareDocumentPosition(
        e
      ), t = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), t |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = $(l[0]), u = $(l[l.length - 1]);
    for (var i = $(l[0]), s = !1, r = this._fragmentFiber.return; r !== null && (r.tag === 4 && (s = !0), !(r.tag === 3 || r.tag === 5)); )
      r = r.return;
    if (i = s ? i.parentElement : n, i == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    n = i.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, i = i.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = t.compareDocumentPosition(e);
    var h = u.compareDocumentPosition(e);
    return r = s & Node.DOCUMENT_POSITION_CONTAINED_BY || h & Node.DOCUMENT_POSITION_CONTAINED_BY, h = n && i && s & Node.DOCUMENT_POSITION_FOLLOWING && h & Node.DOCUMENT_POSITION_PRECEDING, t = n && t === e || i && u === e || r || h ? Node.DOCUMENT_POSITION_CONTAINED_BY : !n && t === e || !i && u === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || lg(
      t,
      this._fragmentFiber,
      l[0],
      l[l.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function lg(e, t, l, n, u) {
    var i = on(u);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (l = !!i)
        e: {
          for (; i !== null; ) {
            if (i.tag === 7 && (i === t || i.alternate === t)) {
              l = !0;
              break e;
            }
            i = i.return;
          }
          l = !1;
        }
      return l;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (i === null)
        return i = u.ownerDocument, u === i || u === i.body;
      e: {
        for (i = t, t = B(t); i !== null; ) {
          if (!(i.tag !== 5 && i.tag !== 3 || i !== t && i.alternate !== t)) {
            i = !0;
            break e;
          }
          i = i.return;
        }
        i = !1;
      }
      return i;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!i) && !(t = i === l) && (t = He(
      l,
      i,
      ye
    ), t === null ? t = !1 : (w(
      t,
      !0,
      Je,
      i,
      l
    ), i = ve, ve = null, t = i !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!i) && !(t = i === n) && (t = He(
      n,
      i,
      ye
    ), t === null ? t = !1 : (w(
      t,
      !0,
      je,
      i,
      n
    ), i = ve, le = ve = null, t = i !== null)), t) : !1;
  }
  Dt.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(f(566));
    var t = [];
    w(
      this._fragmentFiber.child,
      !1,
      wf,
      t,
      void 0,
      void 0
    );
    var l = e !== !1;
    if (t.length === 0) {
      t = this._fragmentFiber;
      var n = [null, null], u = B(t);
      u !== null && ee(n, t, u.child), l = l ? n[1] || n[0] || B(this._fragmentFiber) : n[0] || n[1], l !== null && $(l).scrollIntoView(e);
    } else
      for (n = l ? t.length - 1 : 0; n !== (l ? -1 : t.length); )
        $(t[n]).scrollIntoView(e), n += l ? -1 : 1;
  };
  function im(e, t) {
    var l = t._eventListeners;
    if (l !== null)
      for (var n = 0; n < l.length; n++) {
        var u = l[n];
        e.addEventListener(
          u.type,
          u.listener,
          u.optionsOrUseCapture
        );
      }
    t._observers !== null && t._observers.forEach(function(i) {
      i.observe(e);
    });
  }
  function Rf(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (t = t.nextSibling, l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Rf(l), zc(l);
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
  function ng(e, t, l, n) {
    for (; e.nodeType === 1; ) {
      var u = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!n && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (n) {
        if (!e[Ua])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (i !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === i)
          return e;
      } else return e;
      if (e = Qt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function ag(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Qt(e.nextSibling), e === null)) return null;
    return e;
  }
  function cm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Qt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Zf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Hf(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function ug(e, t) {
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
  function Qt(e) {
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
  var qf = null;
  function om(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "/$" || l === "/&") {
          if (t === 0)
            return Qt(e.nextSibling);
          t--;
        } else
          l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function fm(e) {
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
  function ig(e, t) {
    function l() {
      n = !0;
    }
    var n = !1;
    try {
      e.addEventListener("focus", l), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.removeEventListener("focus", l);
    }
    return n;
  }
  function sm(e, t, l) {
    switch (t = qi(l), e) {
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
  function vu(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    zc(e);
  }
  var Kt = /* @__PURE__ */ new Map(), rm = /* @__PURE__ */ new Set();
  function Bi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ml = H.d;
  H.d = {
    f: cg,
    r: og,
    D: fg,
    C: sg,
    L: rg,
    m: dg,
    X: mg,
    S: hg,
    M: vg
  };
  function cg() {
    var e = Ml.f(), t = Di();
    return e || t;
  }
  function og(e) {
    var t = Rn(e);
    t !== null && t.tag === 5 && t.type === "form" ? yd(t) : Ml.r(e);
  }
  var ga = typeof document > "u" ? null : document;
  function dm(e, t, l) {
    var n = ga;
    if (n && typeof t == "string" && t) {
      var u = Ht(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof l == "string" && (u += '[crossorigin="' + l + '"]'), rm.has(u) || (rm.add(u), e = { rel: e, crossOrigin: l, href: t }, n.querySelector(u) === null && (t = n.createElement("link"), nt(t, "link", e), ke(t), n.head.appendChild(t)));
    }
  }
  function fg(e) {
    Ml.D(e), dm("dns-prefetch", e, null);
  }
  function sg(e, t) {
    Ml.C(e, t), dm("preconnect", e, t);
  }
  function rg(e, t, l) {
    Ml.L(e, t, l);
    var n = ga;
    if (n && e && t) {
      var u = 'link[rel="preload"][as="' + Ht(t) + '"]';
      t === "image" && l && l.imageSrcSet ? (u += '[imagesrcset="' + Ht(
        l.imageSrcSet
      ) + '"]', typeof l.imageSizes == "string" && (u += '[imagesizes="' + Ht(
        l.imageSizes
      ) + '"]')) : u += '[href="' + Ht(e) + '"]';
      var i = u;
      switch (t) {
        case "style":
          i = pa(e);
          break;
        case "script":
          i = _a(e);
      }
      Kt.has(i) || (e = te(
        {
          rel: "preload",
          href: t === "image" && l && l.imageSrcSet ? void 0 : e,
          as: t
        },
        l
      ), Kt.set(i, e), n.querySelector(u) !== null || t === "style" && n.querySelector(yu(i)) || t === "script" && n.querySelector(gu(i)) || (t = n.createElement("link"), nt(t, "link", e), ke(t), n.head.appendChild(t)));
    }
  }
  function dg(e, t) {
    Ml.m(e, t);
    var l = ga;
    if (l && e) {
      var n = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Ht(n) + '"][href="' + Ht(e) + '"]', i = u;
      switch (n) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = _a(e);
      }
      if (!Kt.has(i) && (e = te({ rel: "modulepreload", href: e }, t), Kt.set(i, e), l.querySelector(u) === null)) {
        switch (n) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(gu(i)))
              return;
        }
        n = l.createElement("link"), nt(n, "link", e), ke(n), l.head.appendChild(n);
      }
    }
  }
  function hg(e, t, l) {
    Ml.S(e, t, l);
    var n = ga;
    if (n && e) {
      var u = Zn(n).hoistableStyles, i = pa(e);
      t = t || "default";
      var s = u.get(i);
      if (!s) {
        var r = { loading: 0, preload: null };
        if (s = n.querySelector(
          yu(i)
        ))
          r.loading = 5;
        else {
          e = te(
            { rel: "stylesheet", href: e, "data-precedence": t },
            l
          ), (l = Kt.get(i)) && Bf(e, l);
          var h = s = n.createElement("link");
          ke(h), nt(h, "link", e), h._p = new Promise(function(p, E) {
            h.onload = p, h.onerror = E;
          }), h.addEventListener("load", function() {
            r.loading |= 1;
          }), h.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, Yi(s, t, n);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: r
        }, u.set(i, s);
      }
    }
  }
  function mg(e, t) {
    Ml.X(e, t);
    var l = ga;
    if (l && e) {
      var n = Zn(l).hoistableScripts, u = _a(e), i = n.get(u);
      i || (i = l.querySelector(gu(u)), i || (e = te({ src: e, async: !0 }, t), (t = Kt.get(u)) && Yf(e, t), i = l.createElement("script"), ke(i), nt(i, "link", e), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(u, i));
    }
  }
  function vg(e, t) {
    Ml.M(e, t);
    var l = ga;
    if (l && e) {
      var n = Zn(l).hoistableScripts, u = _a(e), i = n.get(u);
      i || (i = l.querySelector(gu(u)), i || (e = te({ src: e, async: !0, type: "module" }, t), (t = Kt.get(u)) && Yf(e, t), i = l.createElement("script"), ke(i), nt(i, "link", e), l.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, n.set(u, i));
    }
  }
  function hm(e, t, l, n) {
    var u = (u = Cl.current) ? Bi(u) : null;
    if (!u) throw Error(f(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string" ? (t = pa(l.href), l = Zn(
          u
        ).hoistableStyles, n = l.get(t), n || (n = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, l.set(t, n)), n) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          e = pa(l.href);
          var i = Zn(
            u
          ).hoistableStyles, s = i.get(e);
          if (s || (u = u.ownerDocument || u, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, s), (i = u.querySelector(
            yu(e)
          )) && !i._p && (s.instance = i, s.state.loading = 5), Kt.has(e) || (l = {
            rel: "preload",
            as: "style",
            href: l.href,
            crossOrigin: l.crossOrigin,
            integrity: l.integrity,
            media: l.media,
            hrefLang: l.hrefLang,
            referrerPolicy: l.referrerPolicy
          }, Kt.set(e, l), i || yg(
            u,
            e,
            l,
            s.state
          ))), t && n === null)
            throw Error(f(528, ""));
          return s;
        }
        if (t && n !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = _a(l), l = Zn(
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
  function pa(e) {
    return 'href="' + Ht(e) + '"';
  }
  function yu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function mm(e) {
    return te({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function yg(e, t, l, n) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? n.loading = 1 : (t = e.createElement("link"), n.preload = t, t.addEventListener("load", function() {
      return n.loading |= 1;
    }), t.addEventListener("error", function() {
      return n.loading |= 2;
    }), nt(t, "link", l), ke(t), e.head.appendChild(t));
  }
  function _a(e) {
    return '[src="' + Ht(e) + '"]';
  }
  function gu(e) {
    return "script[async]" + e;
  }
  function vm(e, t, l) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var n = e.querySelector(
            'style[data-href~="' + Ht(l.href) + '"]'
          );
          if (n)
            return t.instance = n, ke(n), n;
          var u = te({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          return n = (e.ownerDocument || e).createElement(
            "style"
          ), ke(n), nt(n, "style", u), Yi(n, l.precedence, e), t.instance = n;
        case "stylesheet":
          u = pa(l.href);
          var i = e.querySelector(
            yu(u)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, ke(i), i;
          n = mm(l), (u = Kt.get(u)) && Bf(n, u), i = (e.ownerDocument || e).createElement("link"), ke(i);
          var s = i;
          return s._p = new Promise(function(r, h) {
            s.onload = r, s.onerror = h;
          }), nt(i, "link", n), t.state.loading |= 4, Yi(i, l.precedence, e), t.instance = i;
        case "script":
          return i = _a(l.src), (u = e.querySelector(
            gu(i)
          )) ? (t.instance = u, ke(u), u) : (n = l, (u = Kt.get(i)) && (n = te({}, l), Yf(n, u)), e = e.ownerDocument || e, u = e.createElement("script"), ke(u), nt(u, "link", n), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(f(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (n = t.instance, t.state.loading |= 4, Yi(n, l.precedence, e));
    return t.instance;
  }
  function Yi(e, t, l) {
    for (var n = l.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = n.length ? n[n.length - 1] : null, i = u, s = 0; s < n.length; s++) {
      var r = n[s];
      if (r.dataset.precedence === t) i = r;
      else if (i !== u) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
  }
  function Bf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Yf(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Gi = null;
  function ym(e, t, l) {
    if (Gi === null) {
      var n = /* @__PURE__ */ new Map(), u = Gi = /* @__PURE__ */ new Map();
      u.set(l, n);
    } else
      u = Gi, n = u.get(l), n || (n = /* @__PURE__ */ new Map(), u.set(l, n));
    if (n.has(e)) return n;
    for (n.set(e, null), l = l.getElementsByTagName(e), u = 0; u < l.length; u++) {
      var i = l[u];
      if (!(i[Ua] || i[Ie] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(t) || "";
        s = e + s;
        var r = n.get(s);
        r ? r.push(i) : n.set(s, [i]);
      }
    }
    return n;
  }
  function gm(e, t, l) {
    e = e.ownerDocument || e, e.head.insertBefore(
      l,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function gg(e, t, l) {
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
  function pm(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function _m(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function bm(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Sm(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += bm(t), e.suspenseyImages.push(t)), e = bg.bind(e), t.decode().then(e, e));
  }
  function pg(e, t, l, n) {
    if (l.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var u = pa(n.href), i = t.querySelector(
          yu(u)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = pu.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = i, ke(i);
          return;
        }
        i = t.ownerDocument || t, n = mm(n), (u = Kt.get(u)) && Bf(n, u), i = i.createElement("link"), ke(i);
        var s = i;
        s._p = new Promise(function(r, h) {
          s.onload = r, s.onerror = h;
        }), nt(i, "link", n), l.instance = i;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = pu.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
    }
  }
  var Li = 0;
  function _g(e, t) {
    return e.stylesheets && e.count === 0 && Vi(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
      var n = setTimeout(function() {
        if (e.stylesheets && Vi(e, e.stylesheets), e.unsuspend) {
          var i = e.unsuspend;
          e.unsuspend = null, i();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Li === 0 && (Li = 62500 * Gy());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Vi(e, e.stylesheets), e.unsuspend)) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        },
        (e.imgBytes > Li ? 50 : 800) + t
      );
      return e.unsuspend = l, function() {
        e.unsuspend = null, clearTimeout(n), clearTimeout(u);
      };
    } : null;
  }
  function zm(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Vi(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function pu() {
    this.count--, zm(this);
  }
  function bg() {
    this.imgCount--, zm(this);
  }
  var Xi = null;
  function Vi(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Xi = /* @__PURE__ */ new Map(), t.forEach(Sg, e), Xi = null, pu.call(e));
  }
  function Sg(e, t) {
    if (!(t.state.loading & 4)) {
      var l = Xi.get(e);
      if (l) var n = l.get(null);
      else {
        l = /* @__PURE__ */ new Map(), Xi.set(e, l);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < u.length; i++) {
          var s = u[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (l.set(s.dataset.precedence, s), n = s);
        }
        n && l.set(null, n);
      }
      u = t.instance, s = u.getAttribute("data-precedence"), i = l.get(s) || n, i === n && l.set(null, u), l.set(s, u), this.count++, n = pu.bind(this), u.addEventListener("load", n), u.addEventListener("error", n), i ? i.parentNode.insertBefore(u, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var ba = {
    $$typeof: $e,
    Provider: null,
    Consumer: null,
    _currentValue: be,
    _currentValue2: be,
    _threadCount: 0
  };
  function zg(e, t, l, n, u, i, s, r, h) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = pc(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = pc(0), this.hiddenUpdates = pc(null), this.identifierPrefix = n, this.onUncaughtError = u, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Tm(e, t, l, n, u, i, s, r, h, p, E, x) {
    return e = new zg(
      e,
      t,
      l,
      s,
      h,
      p,
      E,
      x,
      r
    ), t = 1, i === !0 && (t |= 24), i = yt(3, null, null, t), e.current = i, i.stateNode = e, t = to(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: n,
      isDehydrated: l,
      cache: t
    }, uo(i), e;
  }
  function Em(e) {
    return e ? (e = Kn, e) : Kn;
  }
  function Om(e, t, l, n, u, i) {
    u = Em(u), n.context === null ? n.context = u : n.pendingContext = u, n = Gl(t), n.payload = { element: l }, i = i === void 0 ? null : i, i !== null && (n.callback = i), l = Ll(e, n, t), l !== null && (_t(l, e, t), ka(l, e, t));
  }
  function Nm(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function Gf(e, t) {
    Nm(e, t), (e = e.alternate) && Nm(e, t);
  }
  function Am(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = hn(e, 67108864);
      t !== null && _t(t, e, 67108864), Gf(e, 67108864);
    }
  }
  function xm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ct();
      t = _c(t);
      var l = hn(e, t);
      l !== null && _t(l, e, t), Gf(e, t);
    }
  }
  var Qi = !0;
  function Tg(e, t, l, n) {
    var u = j.T;
    j.T = null;
    var i = H.p;
    try {
      H.p = 2, Lf(e, t, l, n);
    } finally {
      H.p = i, j.T = u;
    }
  }
  function Eg(e, t, l, n) {
    var u = j.T;
    j.T = null;
    var i = H.p;
    try {
      H.p = 8, Lf(e, t, l, n);
    } finally {
      H.p = i, j.T = u;
    }
  }
  function Lf(e, t, l, n) {
    if (Qi) {
      var u = Xf(n);
      if (u === null)
        Af(
          e,
          t,
          n,
          Ki,
          l
        ), Cm(e, n);
      else if (Ng(
        u,
        e,
        t,
        l,
        n
      ))
        n.stopPropagation();
      else if (Cm(e, n), t & 4 && -1 < Og.indexOf(e)) {
        for (; u !== null; ) {
          var i = Rn(u);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = cn(i.pendingLanes);
                  if (s !== 0) {
                    var r = i;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; s; ) {
                      var h = 1 << 31 - Et(s);
                      r.entanglements[1] |= h, s &= ~h;
                    }
                    hl(i), (de & 6) === 0 && (Mi = zt() + 500, du(0));
                  }
                }
                break;
              case 31:
              case 13:
                r = hn(i, 2), r !== null && _t(r, i, 2), Di(), Gf(i, 2);
            }
          if (i = Xf(n), i === null && Af(
            e,
            t,
            n,
            Ki,
            l
          ), i === u) break;
          u = i;
        }
        u !== null && n.stopPropagation();
      } else
        Af(
          e,
          t,
          n,
          null,
          l
        );
    }
  }
  function Xf(e) {
    return e = xc(e), Vf(e);
  }
  var Ki = null;
  function Vf(e) {
    if (Ki = null, e = on(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (e = v(t), e !== null) return e;
          e = null;
        } else if (l === 31) {
          if (e = A(t), e !== null) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Ki = e, null;
  }
  function Mm(e) {
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
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (J0()) {
          case ps:
            return 2;
          case _s:
            return 8;
          case Mu:
          case $0:
            return 32;
          case bs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Qf = !1, Il = null, Pl = null, en = null, _u = /* @__PURE__ */ new Map(), bu = /* @__PURE__ */ new Map(), tn = [], Og = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Cm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Il = null;
        break;
      case "dragenter":
      case "dragleave":
        Pl = null;
        break;
      case "mouseover":
      case "mouseout":
        en = null;
        break;
      case "pointerover":
      case "pointerout":
        _u.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bu.delete(t.pointerId);
    }
  }
  function Su(e, t, l, n, u, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: l,
      eventSystemFlags: n,
      nativeEvent: i,
      targetContainers: [u]
    }, t !== null && (t = Rn(t), t !== null && Am(t)), e) : (e.eventSystemFlags |= n, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Ng(e, t, l, n, u) {
    switch (t) {
      case "focusin":
        return Il = Su(
          Il,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "dragenter":
        return Pl = Su(
          Pl,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "mouseover":
        return en = Su(
          en,
          e,
          t,
          l,
          n,
          u
        ), !0;
      case "pointerover":
        var i = u.pointerId;
        return _u.set(
          i,
          Su(
            _u.get(i) || null,
            e,
            t,
            l,
            n,
            u
          )
        ), !0;
      case "gotpointercapture":
        return i = u.pointerId, bu.set(
          i,
          Su(
            bu.get(i) || null,
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
  function Dm(e) {
    var t = on(e.target);
    if (t !== null) {
      var l = m(t);
      if (l !== null) {
        if (t = l.tag, t === 13) {
          if (t = v(l), t !== null) {
            e.blockedOn = t, Ns(e.priority, function() {
              xm(l);
            });
            return;
          }
        } else if (t === 31) {
          if (t = A(l), t !== null) {
            e.blockedOn = t, Ns(e.priority, function() {
              xm(l);
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
  function Ji(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = Xf(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var n = new l.constructor(
          l.type,
          l
        );
        Ac = n, l.target.dispatchEvent(n), Ac = null;
      } else
        return t = Rn(l), t !== null && Am(t), e.blockedOn = l, !1;
      t.shift();
    }
    return !0;
  }
  function Um(e, t, l) {
    Ji(e) && l.delete(t);
  }
  function Ag() {
    Qf = !1, Il !== null && Ji(Il) && (Il = null), Pl !== null && Ji(Pl) && (Pl = null), en !== null && Ji(en) && (en = null), _u.forEach(Um), bu.forEach(Um);
  }
  function $i(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Qf || (Qf = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Ag
    )));
  }
  var ki = null;
  function jm(e) {
    ki !== e && (ki = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ki === e && (ki = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t], n = e[t + 1], u = e[t + 2];
          if (typeof n != "function") {
            if (Vf(n || l) === null)
              continue;
            break;
          }
          var i = Rn(l);
          i !== null && (e.splice(t, 3), t -= 3, Ao(
            i,
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
  function Sa(e) {
    function t(h) {
      return $i(h, e);
    }
    Il !== null && $i(Il, e), Pl !== null && $i(Pl, e), en !== null && $i(en, e), _u.forEach(t), bu.forEach(t);
    for (var l = 0; l < tn.length; l++) {
      var n = tn[l];
      n.blockedOn === e && (n.blockedOn = null);
    }
    for (; 0 < tn.length && (l = tn[0], l.blockedOn === null); )
      Dm(l), l.blockedOn === null && tn.shift();
    if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
      for (n = 0; n < l.length; n += 3) {
        var u = l[n], i = l[n + 1], s = u[mt] || null;
        if (typeof i == "function")
          s || jm(l);
        else if (s) {
          var r = null;
          if (i && i.hasAttribute("formAction")) {
            if (u = i, s = i[mt] || null)
              r = s.formAction;
            else if (Vf(u) !== null) continue;
          } else r = s.action;
          typeof r == "function" ? l[n + 1] = r : (l.splice(n, 3), n -= 3), jm(l);
        }
      }
  }
  function wm() {
    function e(i) {
      i.canIntercept && i.info === "react-transition" && i.intercept({
        handler: function() {
          return new Promise(function(s) {
            return u = s;
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
        var i = navigation.currentEntry;
        i && i.url != null && navigation.navigate(i.url, {
          state: i.getState(),
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
  function Kf(e) {
    this._internalRoot = e;
  }
  Fi.prototype.render = Kf.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(f(409));
    var l = t.current, n = Ct();
    Om(l, n, e, t, null, null);
  }, Fi.prototype.unmount = Kf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Om(e.current, 2, null, e, null, null), Di(), t[wn] = null;
    }
  };
  function Fi(e) {
    this._internalRoot = e;
  }
  Fi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Os();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < tn.length && t !== 0 && t < tn[l].priority; l++) ;
      tn.splice(l, 0, e), l === 0 && Dm(e);
    }
  };
  var Rm = c.version;
  if (Rm !== "19.3.0-canary-378973b3-20251205")
    throw Error(
      f(
        527,
        Rm,
        "19.3.0-canary-378973b3-20251205"
      )
    );
  H.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
    return e = O(t), e = e !== null ? N(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var xg = {
    bundleType: 0,
    version: "19.3.0-canary-378973b3-20251205",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.3.0-canary-378973b3-20251205"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wi.isDisabled && Wi.supportsFiber)
      try {
        Ma = Wi.inject(
          xg
        ), Tt = Wi;
      } catch {
      }
  }
  return Tu.createRoot = function(e, t) {
    if (!d(e)) throw Error(f(299));
    var l = !1, n = "", u = Nd, i = Ad, s = xd;
    return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (n = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = Tm(
      e,
      1,
      !1,
      null,
      null,
      l,
      n,
      null,
      u,
      i,
      s,
      wm
    ), e[wn] = t.current, Nf(e), new Kf(t);
  }, Tu.hydrateRoot = function(e, t, l) {
    if (!d(e)) throw Error(f(299));
    var n = !1, u = "", i = Nd, s = Ad, r = xd, h = null;
    return l != null && (l.unstable_strictMode === !0 && (n = !0), l.identifierPrefix !== void 0 && (u = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (s = l.onCaughtError), l.onRecoverableError !== void 0 && (r = l.onRecoverableError), l.formState !== void 0 && (h = l.formState)), t = Tm(
      e,
      1,
      !0,
      t,
      l ?? null,
      n,
      u,
      h,
      i,
      s,
      r,
      wm
    ), t.context = Em(null), l = t.current, n = Ct(), n = _c(n), u = Gl(n), u.callback = null, Ll(l, u, n), l = n, t.current.lanes = l, Da(t, l), hl(t), e[wn] = t.current, Nf(e), new Fi(t);
  }, Tu.version = "19.3.0-canary-378973b3-20251205", Tu;
}
var Qm;
function qg() {
  if (Qm) return kf.exports;
  Qm = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (c) {
        console.error(c);
      }
  }
  return a(), kf.exports = Hg(), kf.exports;
}
var Bg = qg();
const Yg = /* @__PURE__ */ y0(Bg);
function U(a, c, o) {
  function f(A, D) {
    if (A._zod || Object.defineProperty(A, "_zod", {
      value: {
        def: D,
        constr: v,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), A._zod.traits.has(a))
      return;
    A._zod.traits.add(a), c(A, D);
    const O = v.prototype, N = Object.keys(O);
    for (let w = 0; w < N.length; w++) {
      const B = N[w];
      B in A || (A[B] = O[B].bind(A));
    }
  }
  const d = o?.Parent ?? Object;
  class m extends d {
  }
  Object.defineProperty(m, "name", { value: a });
  function v(A) {
    var D;
    const O = o?.Parent ? new m() : this;
    f(O, A), (D = O._zod).deferred ?? (D.deferred = []);
    for (const N of O._zod.deferred)
      N();
    return O;
  }
  return Object.defineProperty(v, "init", { value: f }), Object.defineProperty(v, Symbol.hasInstance, {
    value: (A) => o?.Parent && A instanceof o.Parent ? !0 : A?._zod?.traits?.has(a)
  }), Object.defineProperty(v, "name", { value: a }), v;
}
class Ea extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class g0 extends Error {
  constructor(c) {
    super(`Encountered unidirectional transform during encode: ${c}`), this.name = "ZodEncodeError";
  }
}
const p0 = {};
function nn(a) {
  return p0;
}
function Gg(a) {
  const c = Object.values(a).filter((f) => typeof f == "number");
  return Object.entries(a).filter(([f, d]) => c.indexOf(+f) === -1).map(([f, d]) => d);
}
function ts(a, c) {
  return typeof c == "bigint" ? c.toString() : c;
}
function is(a) {
  return {
    get value() {
      {
        const c = a();
        return Object.defineProperty(this, "value", { value: c }), c;
      }
    }
  };
}
function cs(a) {
  return a == null;
}
function os(a) {
  const c = a.startsWith("^") ? 1 : 0, o = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(c, o);
}
function Lg(a, c) {
  const o = (a.toString().split(".")[1] || "").length, f = c.toString();
  let d = (f.split(".")[1] || "").length;
  if (d === 0 && /\d?e-\d?/.test(f)) {
    const D = f.match(/\d?e-(\d?)/);
    D?.[1] && (d = Number.parseInt(D[1]));
  }
  const m = o > d ? o : d, v = Number.parseInt(a.toFixed(m).replace(".", "")), A = Number.parseInt(c.toFixed(m).replace(".", ""));
  return v % A / 10 ** m;
}
const Km = /* @__PURE__ */ Symbol("evaluating");
function Oe(a, c, o) {
  let f;
  Object.defineProperty(a, c, {
    get() {
      if (f !== Km)
        return f === void 0 && (f = Km, f = o()), f;
    },
    set(d) {
      Object.defineProperty(a, c, {
        value: d
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Dn(a, c, o) {
  Object.defineProperty(a, c, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Un(...a) {
  const c = {};
  for (const o of a) {
    const f = Object.getOwnPropertyDescriptors(o);
    Object.assign(c, f);
  }
  return Object.defineProperties({}, c);
}
function Jm(a) {
  return JSON.stringify(a);
}
function Xg(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const _0 = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function lc(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const Vg = is(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function Oa(a) {
  if (lc(a) === !1)
    return !1;
  const c = a.constructor;
  if (c === void 0 || typeof c != "function")
    return !0;
  const o = c.prototype;
  return !(lc(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function b0(a) {
  return Oa(a) ? { ...a } : Array.isArray(a) ? [...a] : a;
}
const Qg = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ic(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function un(a, c, o) {
  const f = new a._zod.constr(c ?? a._zod.def);
  return (!c || o?.parent) && (f._zod.parent = a), f;
}
function Q(a) {
  const c = a;
  if (!c)
    return {};
  if (typeof c == "string")
    return { error: () => c };
  if (c?.message !== void 0) {
    if (c?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    c.error = c.message;
  }
  return delete c.message, typeof c.error == "string" ? { ...c, error: () => c.error } : c;
}
function Kg(a) {
  return Object.keys(a).filter((c) => a[c]._zod.optin === "optional" && a[c]._zod.optout === "optional");
}
const Jg = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function $g(a, c) {
  const o = a._zod.def, f = Un(a._zod.def, {
    get shape() {
      const d = {};
      for (const m in c) {
        if (!(m in o.shape))
          throw new Error(`Unrecognized key: "${m}"`);
        c[m] && (d[m] = o.shape[m]);
      }
      return Dn(this, "shape", d), d;
    },
    checks: []
  });
  return un(a, f);
}
function kg(a, c) {
  const o = a._zod.def, f = Un(a._zod.def, {
    get shape() {
      const d = { ...a._zod.def.shape };
      for (const m in c) {
        if (!(m in o.shape))
          throw new Error(`Unrecognized key: "${m}"`);
        c[m] && delete d[m];
      }
      return Dn(this, "shape", d), d;
    },
    checks: []
  });
  return un(a, f);
}
function Fg(a, c) {
  if (!Oa(c))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = a._zod.def.checks;
  if (o && o.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const d = Un(a._zod.def, {
    get shape() {
      const m = { ...a._zod.def.shape, ...c };
      return Dn(this, "shape", m), m;
    },
    checks: []
  });
  return un(a, d);
}
function Wg(a, c) {
  if (!Oa(c))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = {
    ...a._zod.def,
    get shape() {
      const f = { ...a._zod.def.shape, ...c };
      return Dn(this, "shape", f), f;
    },
    checks: a._zod.def.checks
  };
  return un(a, o);
}
function Ig(a, c) {
  const o = Un(a._zod.def, {
    get shape() {
      const f = { ...a._zod.def.shape, ...c._zod.def.shape };
      return Dn(this, "shape", f), f;
    },
    get catchall() {
      return c._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return un(a, o);
}
function Pg(a, c, o) {
  const f = Un(c._zod.def, {
    get shape() {
      const d = c._zod.def.shape, m = { ...d };
      if (o)
        for (const v in o) {
          if (!(v in d))
            throw new Error(`Unrecognized key: "${v}"`);
          o[v] && (m[v] = a ? new a({
            type: "optional",
            innerType: d[v]
          }) : d[v]);
        }
      else
        for (const v in d)
          m[v] = a ? new a({
            type: "optional",
            innerType: d[v]
          }) : d[v];
      return Dn(this, "shape", m), m;
    },
    checks: []
  });
  return un(c, f);
}
function e1(a, c, o) {
  const f = Un(c._zod.def, {
    get shape() {
      const d = c._zod.def.shape, m = { ...d };
      if (o)
        for (const v in o) {
          if (!(v in m))
            throw new Error(`Unrecognized key: "${v}"`);
          o[v] && (m[v] = new a({
            type: "nonoptional",
            innerType: d[v]
          }));
        }
      else
        for (const v in d)
          m[v] = new a({
            type: "nonoptional",
            innerType: d[v]
          });
      return Dn(this, "shape", m), m;
    },
    checks: []
  });
  return un(c, f);
}
function za(a, c = 0) {
  if (a.aborted === !0)
    return !0;
  for (let o = c; o < a.issues.length; o++)
    if (a.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function Ta(a, c) {
  return c.map((o) => {
    var f;
    return (f = o).path ?? (f.path = []), o.path.unshift(a), o;
  });
}
function Ii(a) {
  return typeof a == "string" ? a : a?.message;
}
function an(a, c, o) {
  const f = { ...a, path: a.path ?? [] };
  if (!a.message) {
    const d = Ii(a.inst?._zod.def?.error?.(a)) ?? Ii(c?.error?.(a)) ?? Ii(o.customError?.(a)) ?? Ii(o.localeError?.(a)) ?? "Invalid input";
    f.message = d;
  }
  return delete f.inst, delete f.continue, c?.reportInput || delete f.input, f;
}
function fs(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function Eu(...a) {
  const [c, o, f] = a;
  return typeof c == "string" ? {
    message: c,
    code: "custom",
    input: o,
    inst: f
  } : { ...c };
}
const S0 = (a, c) => {
  a.name = "$ZodError", Object.defineProperty(a, "_zod", {
    value: a._zod,
    enumerable: !1
  }), Object.defineProperty(a, "issues", {
    value: c,
    enumerable: !1
  }), a.message = JSON.stringify(c, ts, 2), Object.defineProperty(a, "toString", {
    value: () => a.message,
    enumerable: !1
  });
}, z0 = U("$ZodError", S0), T0 = U("$ZodError", S0, { Parent: Error });
function t1(a, c = (o) => o.message) {
  const o = {}, f = [];
  for (const d of a.issues)
    d.path.length > 0 ? (o[d.path[0]] = o[d.path[0]] || [], o[d.path[0]].push(c(d))) : f.push(c(d));
  return { formErrors: f, fieldErrors: o };
}
function l1(a, c = (o) => o.message) {
  const o = { _errors: [] }, f = (d) => {
    for (const m of d.issues)
      if (m.code === "invalid_union" && m.errors.length)
        m.errors.map((v) => f({ issues: v }));
      else if (m.code === "invalid_key")
        f({ issues: m.issues });
      else if (m.code === "invalid_element")
        f({ issues: m.issues });
      else if (m.path.length === 0)
        o._errors.push(c(m));
      else {
        let v = o, A = 0;
        for (; A < m.path.length; ) {
          const D = m.path[A];
          A === m.path.length - 1 ? (v[D] = v[D] || { _errors: [] }, v[D]._errors.push(c(m))) : v[D] = v[D] || { _errors: [] }, v = v[D], A++;
        }
      }
  };
  return f(a), o;
}
const ss = (a) => (c, o, f, d) => {
  const m = f ? Object.assign(f, { async: !1 }) : { async: !1 }, v = c._zod.run({ value: o, issues: [] }, m);
  if (v instanceof Promise)
    throw new Ea();
  if (v.issues.length) {
    const A = new (d?.Err ?? a)(v.issues.map((D) => an(D, m, nn())));
    throw _0(A, d?.callee), A;
  }
  return v.value;
}, rs = (a) => async (c, o, f, d) => {
  const m = f ? Object.assign(f, { async: !0 }) : { async: !0 };
  let v = c._zod.run({ value: o, issues: [] }, m);
  if (v instanceof Promise && (v = await v), v.issues.length) {
    const A = new (d?.Err ?? a)(v.issues.map((D) => an(D, m, nn())));
    throw _0(A, d?.callee), A;
  }
  return v.value;
}, cc = (a) => (c, o, f) => {
  const d = f ? { ...f, async: !1 } : { async: !1 }, m = c._zod.run({ value: o, issues: [] }, d);
  if (m instanceof Promise)
    throw new Ea();
  return m.issues.length ? {
    success: !1,
    error: new (a ?? z0)(m.issues.map((v) => an(v, d, nn())))
  } : { success: !0, data: m.value };
}, n1 = /* @__PURE__ */ cc(T0), oc = (a) => async (c, o, f) => {
  const d = f ? Object.assign(f, { async: !0 }) : { async: !0 };
  let m = c._zod.run({ value: o, issues: [] }, d);
  return m instanceof Promise && (m = await m), m.issues.length ? {
    success: !1,
    error: new a(m.issues.map((v) => an(v, d, nn())))
  } : { success: !0, data: m.value };
}, a1 = /* @__PURE__ */ oc(T0), u1 = (a) => (c, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return ss(a)(c, o, d);
}, i1 = (a) => (c, o, f) => ss(a)(c, o, f), c1 = (a) => async (c, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return rs(a)(c, o, d);
}, o1 = (a) => async (c, o, f) => rs(a)(c, o, f), f1 = (a) => (c, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return cc(a)(c, o, d);
}, s1 = (a) => (c, o, f) => cc(a)(c, o, f), r1 = (a) => async (c, o, f) => {
  const d = f ? Object.assign(f, { direction: "backward" }) : { direction: "backward" };
  return oc(a)(c, o, d);
}, d1 = (a) => async (c, o, f) => oc(a)(c, o, f), h1 = /^[cC][^\s-]{8,}$/, m1 = /^[0-9a-z]+$/, v1 = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, y1 = /^[0-9a-vA-V]{20}$/, g1 = /^[A-Za-z0-9]{27}$/, p1 = /^[a-zA-Z0-9_-]{21}$/, _1 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, b1 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, $m = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, S1 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, z1 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function T1() {
  return new RegExp(z1, "u");
}
const E1 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, O1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, N1 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, A1 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, x1 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, E0 = /^[A-Za-z0-9_-]*$/, M1 = /^\+(?:[0-9]){6,14}[0-9]$/, O0 = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", C1 = /* @__PURE__ */ new RegExp(`^${O0}$`);
function N0(a) {
  const c = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${c}` : a.precision === 0 ? `${c}:[0-5]\\d` : `${c}:[0-5]\\d\\.\\d{${a.precision}}` : `${c}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function D1(a) {
  return new RegExp(`^${N0(a)}$`);
}
function U1(a) {
  const c = N0({ precision: a.precision }), o = ["Z"];
  a.local && o.push(""), a.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const f = `${c}(?:${o.join("|")})`;
  return new RegExp(`^${O0}T(?:${f})$`);
}
const j1 = (a) => {
  const c = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${c}$`);
}, w1 = /^-?\d+$/, R1 = /^-?\d+(?:\.\d+)?/, Z1 = /^[^A-Z]*$/, H1 = /^[^a-z]*$/, bt = /* @__PURE__ */ U("$ZodCheck", (a, c) => {
  var o;
  a._zod ?? (a._zod = {}), a._zod.def = c, (o = a._zod).onattach ?? (o.onattach = []);
}), A0 = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, x0 = /* @__PURE__ */ U("$ZodCheckLessThan", (a, c) => {
  bt.init(a, c);
  const o = A0[typeof c.value];
  a._zod.onattach.push((f) => {
    const d = f._zod.bag, m = (c.inclusive ? d.maximum : d.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    c.value < m && (c.inclusive ? d.maximum = c.value : d.exclusiveMaximum = c.value);
  }), a._zod.check = (f) => {
    (c.inclusive ? f.value <= c.value : f.value < c.value) || f.issues.push({
      origin: o,
      code: "too_big",
      maximum: c.value,
      input: f.value,
      inclusive: c.inclusive,
      inst: a,
      continue: !c.abort
    });
  };
}), M0 = /* @__PURE__ */ U("$ZodCheckGreaterThan", (a, c) => {
  bt.init(a, c);
  const o = A0[typeof c.value];
  a._zod.onattach.push((f) => {
    const d = f._zod.bag, m = (c.inclusive ? d.minimum : d.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    c.value > m && (c.inclusive ? d.minimum = c.value : d.exclusiveMinimum = c.value);
  }), a._zod.check = (f) => {
    (c.inclusive ? f.value >= c.value : f.value > c.value) || f.issues.push({
      origin: o,
      code: "too_small",
      minimum: c.value,
      input: f.value,
      inclusive: c.inclusive,
      inst: a,
      continue: !c.abort
    });
  };
}), q1 = /* @__PURE__ */ U("$ZodCheckMultipleOf", (a, c) => {
  bt.init(a, c), a._zod.onattach.push((o) => {
    var f;
    (f = o._zod.bag).multipleOf ?? (f.multipleOf = c.value);
  }), a._zod.check = (o) => {
    if (typeof o.value != typeof c.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % c.value === BigInt(0) : Lg(o.value, c.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: c.value,
      input: o.value,
      inst: a,
      continue: !c.abort
    });
  };
}), B1 = /* @__PURE__ */ U("$ZodCheckNumberFormat", (a, c) => {
  bt.init(a, c), c.format = c.format || "float64";
  const o = c.format?.includes("int"), f = o ? "int" : "number", [d, m] = Jg[c.format];
  a._zod.onattach.push((v) => {
    const A = v._zod.bag;
    A.format = c.format, A.minimum = d, A.maximum = m, o && (A.pattern = w1);
  }), a._zod.check = (v) => {
    const A = v.value;
    if (o) {
      if (!Number.isInteger(A)) {
        v.issues.push({
          expected: f,
          format: c.format,
          code: "invalid_type",
          continue: !1,
          input: A,
          inst: a
        });
        return;
      }
      if (!Number.isSafeInteger(A)) {
        A > 0 ? v.issues.push({
          input: A,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: f,
          continue: !c.abort
        }) : v.issues.push({
          input: A,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: f,
          continue: !c.abort
        });
        return;
      }
    }
    A < d && v.issues.push({
      origin: "number",
      input: A,
      code: "too_small",
      minimum: d,
      inclusive: !0,
      inst: a,
      continue: !c.abort
    }), A > m && v.issues.push({
      origin: "number",
      input: A,
      code: "too_big",
      maximum: m,
      inst: a
    });
  };
}), Y1 = /* @__PURE__ */ U("$ZodCheckMaxLength", (a, c) => {
  var o;
  bt.init(a, c), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !cs(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    c.maximum < d && (f._zod.bag.maximum = c.maximum);
  }), a._zod.check = (f) => {
    const d = f.value;
    if (d.length <= c.maximum)
      return;
    const v = fs(d);
    f.issues.push({
      origin: v,
      code: "too_big",
      maximum: c.maximum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !c.abort
    });
  };
}), G1 = /* @__PURE__ */ U("$ZodCheckMinLength", (a, c) => {
  var o;
  bt.init(a, c), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !cs(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    c.minimum > d && (f._zod.bag.minimum = c.minimum);
  }), a._zod.check = (f) => {
    const d = f.value;
    if (d.length >= c.minimum)
      return;
    const v = fs(d);
    f.issues.push({
      origin: v,
      code: "too_small",
      minimum: c.minimum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !c.abort
    });
  };
}), L1 = /* @__PURE__ */ U("$ZodCheckLengthEquals", (a, c) => {
  var o;
  bt.init(a, c), (o = a._zod.def).when ?? (o.when = (f) => {
    const d = f.value;
    return !cs(d) && d.length !== void 0;
  }), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.minimum = c.length, d.maximum = c.length, d.length = c.length;
  }), a._zod.check = (f) => {
    const d = f.value, m = d.length;
    if (m === c.length)
      return;
    const v = fs(d), A = m > c.length;
    f.issues.push({
      origin: v,
      ...A ? { code: "too_big", maximum: c.length } : { code: "too_small", minimum: c.length },
      inclusive: !0,
      exact: !0,
      input: f.value,
      inst: a,
      continue: !c.abort
    });
  };
}), fc = /* @__PURE__ */ U("$ZodCheckStringFormat", (a, c) => {
  var o, f;
  bt.init(a, c), a._zod.onattach.push((d) => {
    const m = d._zod.bag;
    m.format = c.format, c.pattern && (m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(c.pattern));
  }), c.pattern ? (o = a._zod).check ?? (o.check = (d) => {
    c.pattern.lastIndex = 0, !c.pattern.test(d.value) && d.issues.push({
      origin: "string",
      code: "invalid_format",
      format: c.format,
      input: d.value,
      ...c.pattern ? { pattern: c.pattern.toString() } : {},
      inst: a,
      continue: !c.abort
    });
  }) : (f = a._zod).check ?? (f.check = () => {
  });
}), X1 = /* @__PURE__ */ U("$ZodCheckRegex", (a, c) => {
  fc.init(a, c), a._zod.check = (o) => {
    c.pattern.lastIndex = 0, !c.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: o.value,
      pattern: c.pattern.toString(),
      inst: a,
      continue: !c.abort
    });
  };
}), V1 = /* @__PURE__ */ U("$ZodCheckLowerCase", (a, c) => {
  c.pattern ?? (c.pattern = Z1), fc.init(a, c);
}), Q1 = /* @__PURE__ */ U("$ZodCheckUpperCase", (a, c) => {
  c.pattern ?? (c.pattern = H1), fc.init(a, c);
}), K1 = /* @__PURE__ */ U("$ZodCheckIncludes", (a, c) => {
  bt.init(a, c);
  const o = ic(c.includes), f = new RegExp(typeof c.position == "number" ? `^.{${c.position}}${o}` : o);
  c.pattern = f, a._zod.onattach.push((d) => {
    const m = d._zod.bag;
    m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(f);
  }), a._zod.check = (d) => {
    d.value.includes(c.includes, c.position) || d.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: c.includes,
      input: d.value,
      inst: a,
      continue: !c.abort
    });
  };
}), J1 = /* @__PURE__ */ U("$ZodCheckStartsWith", (a, c) => {
  bt.init(a, c);
  const o = new RegExp(`^${ic(c.prefix)}.*`);
  c.pattern ?? (c.pattern = o), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (f) => {
    f.value.startsWith(c.prefix) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: c.prefix,
      input: f.value,
      inst: a,
      continue: !c.abort
    });
  };
}), $1 = /* @__PURE__ */ U("$ZodCheckEndsWith", (a, c) => {
  bt.init(a, c);
  const o = new RegExp(`.*${ic(c.suffix)}$`);
  c.pattern ?? (c.pattern = o), a._zod.onattach.push((f) => {
    const d = f._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (f) => {
    f.value.endsWith(c.suffix) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: c.suffix,
      input: f.value,
      inst: a,
      continue: !c.abort
    });
  };
}), k1 = /* @__PURE__ */ U("$ZodCheckOverwrite", (a, c) => {
  bt.init(a, c), a._zod.check = (o) => {
    o.value = c.tx(o.value);
  };
});
class F1 {
  constructor(c = []) {
    this.content = [], this.indent = 0, this && (this.args = c);
  }
  indented(c) {
    this.indent += 1, c(this), this.indent -= 1;
  }
  write(c) {
    if (typeof c == "function") {
      c(this, { execution: "sync" }), c(this, { execution: "async" });
      return;
    }
    const f = c.split(`
`).filter((v) => v), d = Math.min(...f.map((v) => v.length - v.trimStart().length)), m = f.map((v) => v.slice(d)).map((v) => " ".repeat(this.indent * 2) + v);
    for (const v of m)
      this.content.push(v);
  }
  compile() {
    const c = Function, o = this?.args, d = [...(this?.content ?? [""]).map((m) => `  ${m}`)];
    return new c(...o, d.join(`
`));
  }
}
const W1 = {
  major: 4,
  minor: 1,
  patch: 13
}, Be = /* @__PURE__ */ U("$ZodType", (a, c) => {
  var o;
  a ?? (a = {}), a._zod.def = c, a._zod.bag = a._zod.bag || {}, a._zod.version = W1;
  const f = [...a._zod.def.checks ?? []];
  a._zod.traits.has("$ZodCheck") && f.unshift(a);
  for (const d of f)
    for (const m of d._zod.onattach)
      m(a);
  if (f.length === 0)
    (o = a._zod).deferred ?? (o.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const d = (v, A, D) => {
      let O = za(v), N;
      for (const w of A) {
        if (w._zod.def.when) {
          if (!w._zod.def.when(v))
            continue;
        } else if (O)
          continue;
        const B = v.issues.length, ee = w._zod.check(v);
        if (ee instanceof Promise && D?.async === !1)
          throw new Ea();
        if (N || ee instanceof Promise)
          N = (N ?? Promise.resolve()).then(async () => {
            await ee, v.issues.length !== B && (O || (O = za(v, B)));
          });
        else {
          if (v.issues.length === B)
            continue;
          O || (O = za(v, B));
        }
      }
      return N ? N.then(() => v) : v;
    }, m = (v, A, D) => {
      if (za(v))
        return v.aborted = !0, v;
      const O = d(A, f, D);
      if (O instanceof Promise) {
        if (D.async === !1)
          throw new Ea();
        return O.then((N) => a._zod.parse(N, D));
      }
      return a._zod.parse(O, D);
    };
    a._zod.run = (v, A) => {
      if (A.skipChecks)
        return a._zod.parse(v, A);
      if (A.direction === "backward") {
        const O = a._zod.parse({ value: v.value, issues: [] }, { ...A, skipChecks: !0 });
        return O instanceof Promise ? O.then((N) => m(N, v, A)) : m(O, v, A);
      }
      const D = a._zod.parse(v, A);
      if (D instanceof Promise) {
        if (A.async === !1)
          throw new Ea();
        return D.then((O) => d(O, f, A));
      }
      return d(D, f, A);
    };
  }
  a["~standard"] = {
    validate: (d) => {
      try {
        const m = n1(a, d);
        return m.success ? { value: m.data } : { issues: m.error?.issues };
      } catch {
        return a1(a, d).then((v) => v.success ? { value: v.data } : { issues: v.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), ds = /* @__PURE__ */ U("$ZodString", (a, c) => {
  Be.init(a, c), a._zod.pattern = [...a?._zod.bag?.patterns ?? []].pop() ?? j1(a._zod.bag), a._zod.parse = (o, f) => {
    if (c.coerce)
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
}), xe = /* @__PURE__ */ U("$ZodStringFormat", (a, c) => {
  fc.init(a, c), ds.init(a, c);
}), I1 = /* @__PURE__ */ U("$ZodGUID", (a, c) => {
  c.pattern ?? (c.pattern = b1), xe.init(a, c);
}), P1 = /* @__PURE__ */ U("$ZodUUID", (a, c) => {
  if (c.version) {
    const f = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[c.version];
    if (f === void 0)
      throw new Error(`Invalid UUID version: "${c.version}"`);
    c.pattern ?? (c.pattern = $m(f));
  } else
    c.pattern ?? (c.pattern = $m());
  xe.init(a, c);
}), ep = /* @__PURE__ */ U("$ZodEmail", (a, c) => {
  c.pattern ?? (c.pattern = S1), xe.init(a, c);
}), tp = /* @__PURE__ */ U("$ZodURL", (a, c) => {
  xe.init(a, c), a._zod.check = (o) => {
    try {
      const f = o.value.trim(), d = new URL(f);
      c.hostname && (c.hostname.lastIndex = 0, c.hostname.test(d.hostname) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: c.hostname.source,
        input: o.value,
        inst: a,
        continue: !c.abort
      })), c.protocol && (c.protocol.lastIndex = 0, c.protocol.test(d.protocol.endsWith(":") ? d.protocol.slice(0, -1) : d.protocol) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: c.protocol.source,
        input: o.value,
        inst: a,
        continue: !c.abort
      })), c.normalize ? o.value = d.href : o.value = f;
      return;
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "url",
        input: o.value,
        inst: a,
        continue: !c.abort
      });
    }
  };
}), lp = /* @__PURE__ */ U("$ZodEmoji", (a, c) => {
  c.pattern ?? (c.pattern = T1()), xe.init(a, c);
}), np = /* @__PURE__ */ U("$ZodNanoID", (a, c) => {
  c.pattern ?? (c.pattern = p1), xe.init(a, c);
}), ap = /* @__PURE__ */ U("$ZodCUID", (a, c) => {
  c.pattern ?? (c.pattern = h1), xe.init(a, c);
}), up = /* @__PURE__ */ U("$ZodCUID2", (a, c) => {
  c.pattern ?? (c.pattern = m1), xe.init(a, c);
}), ip = /* @__PURE__ */ U("$ZodULID", (a, c) => {
  c.pattern ?? (c.pattern = v1), xe.init(a, c);
}), cp = /* @__PURE__ */ U("$ZodXID", (a, c) => {
  c.pattern ?? (c.pattern = y1), xe.init(a, c);
}), op = /* @__PURE__ */ U("$ZodKSUID", (a, c) => {
  c.pattern ?? (c.pattern = g1), xe.init(a, c);
}), fp = /* @__PURE__ */ U("$ZodISODateTime", (a, c) => {
  c.pattern ?? (c.pattern = U1(c)), xe.init(a, c);
}), sp = /* @__PURE__ */ U("$ZodISODate", (a, c) => {
  c.pattern ?? (c.pattern = C1), xe.init(a, c);
}), rp = /* @__PURE__ */ U("$ZodISOTime", (a, c) => {
  c.pattern ?? (c.pattern = D1(c)), xe.init(a, c);
}), dp = /* @__PURE__ */ U("$ZodISODuration", (a, c) => {
  c.pattern ?? (c.pattern = _1), xe.init(a, c);
}), hp = /* @__PURE__ */ U("$ZodIPv4", (a, c) => {
  c.pattern ?? (c.pattern = E1), xe.init(a, c), a._zod.bag.format = "ipv4";
}), mp = /* @__PURE__ */ U("$ZodIPv6", (a, c) => {
  c.pattern ?? (c.pattern = O1), xe.init(a, c), a._zod.bag.format = "ipv6", a._zod.check = (o) => {
    try {
      new URL(`http://[${o.value}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: o.value,
        inst: a,
        continue: !c.abort
      });
    }
  };
}), vp = /* @__PURE__ */ U("$ZodCIDRv4", (a, c) => {
  c.pattern ?? (c.pattern = N1), xe.init(a, c);
}), yp = /* @__PURE__ */ U("$ZodCIDRv6", (a, c) => {
  c.pattern ?? (c.pattern = A1), xe.init(a, c), a._zod.check = (o) => {
    const f = o.value.split("/");
    try {
      if (f.length !== 2)
        throw new Error();
      const [d, m] = f;
      if (!m)
        throw new Error();
      const v = Number(m);
      if (`${v}` !== m)
        throw new Error();
      if (v < 0 || v > 128)
        throw new Error();
      new URL(`http://[${d}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: o.value,
        inst: a,
        continue: !c.abort
      });
    }
  };
});
function C0(a) {
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
const gp = /* @__PURE__ */ U("$ZodBase64", (a, c) => {
  c.pattern ?? (c.pattern = x1), xe.init(a, c), a._zod.bag.contentEncoding = "base64", a._zod.check = (o) => {
    C0(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: a,
      continue: !c.abort
    });
  };
});
function pp(a) {
  if (!E0.test(a))
    return !1;
  const c = a.replace(/[-_]/g, (f) => f === "-" ? "+" : "/"), o = c.padEnd(Math.ceil(c.length / 4) * 4, "=");
  return C0(o);
}
const _p = /* @__PURE__ */ U("$ZodBase64URL", (a, c) => {
  c.pattern ?? (c.pattern = E0), xe.init(a, c), a._zod.bag.contentEncoding = "base64url", a._zod.check = (o) => {
    pp(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: a,
      continue: !c.abort
    });
  };
}), bp = /* @__PURE__ */ U("$ZodE164", (a, c) => {
  c.pattern ?? (c.pattern = M1), xe.init(a, c);
});
function Sp(a, c = null) {
  try {
    const o = a.split(".");
    if (o.length !== 3)
      return !1;
    const [f] = o;
    if (!f)
      return !1;
    const d = JSON.parse(atob(f));
    return !("typ" in d && d?.typ !== "JWT" || !d.alg || c && (!("alg" in d) || d.alg !== c));
  } catch {
    return !1;
  }
}
const zp = /* @__PURE__ */ U("$ZodJWT", (a, c) => {
  xe.init(a, c), a._zod.check = (o) => {
    Sp(o.value, c.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: a,
      continue: !c.abort
    });
  };
}), D0 = /* @__PURE__ */ U("$ZodNumber", (a, c) => {
  Be.init(a, c), a._zod.pattern = a._zod.bag.pattern ?? R1, a._zod.parse = (o, f) => {
    if (c.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const d = o.value;
    if (typeof d == "number" && !Number.isNaN(d) && Number.isFinite(d))
      return o;
    const m = typeof d == "number" ? Number.isNaN(d) ? "NaN" : Number.isFinite(d) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: d,
      inst: a,
      ...m ? { received: m } : {}
    }), o;
  };
}), Tp = /* @__PURE__ */ U("$ZodNumberFormat", (a, c) => {
  B1.init(a, c), D0.init(a, c);
}), Ep = /* @__PURE__ */ U("$ZodUnknown", (a, c) => {
  Be.init(a, c), a._zod.parse = (o) => o;
}), Op = /* @__PURE__ */ U("$ZodNever", (a, c) => {
  Be.init(a, c), a._zod.parse = (o, f) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: a
  }), o);
});
function km(a, c, o) {
  a.issues.length && c.issues.push(...Ta(o, a.issues)), c.value[o] = a.value;
}
const Np = /* @__PURE__ */ U("$ZodArray", (a, c) => {
  Be.init(a, c), a._zod.parse = (o, f) => {
    const d = o.value;
    if (!Array.isArray(d))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: d,
        inst: a
      }), o;
    o.value = Array(d.length);
    const m = [];
    for (let v = 0; v < d.length; v++) {
      const A = d[v], D = c.element._zod.run({
        value: A,
        issues: []
      }, f);
      D instanceof Promise ? m.push(D.then((O) => km(O, o, v))) : km(D, o, v);
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
});
function nc(a, c, o, f) {
  a.issues.length && c.issues.push(...Ta(o, a.issues)), a.value === void 0 ? o in f && (c.value[o] = void 0) : c.value[o] = a.value;
}
function U0(a) {
  const c = Object.keys(a.shape);
  for (const f of c)
    if (!a.shape?.[f]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${f}": expected a Zod schema`);
  const o = Kg(a.shape);
  return {
    ...a,
    keys: c,
    keySet: new Set(c),
    numKeys: c.length,
    optionalKeys: new Set(o)
  };
}
function j0(a, c, o, f, d, m) {
  const v = [], A = d.keySet, D = d.catchall._zod, O = D.def.type;
  for (const N in c) {
    if (A.has(N))
      continue;
    if (O === "never") {
      v.push(N);
      continue;
    }
    const w = D.run({ value: c[N], issues: [] }, f);
    w instanceof Promise ? a.push(w.then((B) => nc(B, o, N, c))) : nc(w, o, N, c);
  }
  return v.length && o.issues.push({
    code: "unrecognized_keys",
    keys: v,
    input: c,
    inst: m
  }), a.length ? Promise.all(a).then(() => o) : o;
}
const Ap = /* @__PURE__ */ U("$ZodObject", (a, c) => {
  if (Be.init(a, c), !Object.getOwnPropertyDescriptor(c, "shape")?.get) {
    const A = c.shape;
    Object.defineProperty(c, "shape", {
      get: () => {
        const D = { ...A };
        return Object.defineProperty(c, "shape", {
          value: D
        }), D;
      }
    });
  }
  const f = is(() => U0(c));
  Oe(a._zod, "propValues", () => {
    const A = c.shape, D = {};
    for (const O in A) {
      const N = A[O]._zod;
      if (N.values) {
        D[O] ?? (D[O] = /* @__PURE__ */ new Set());
        for (const w of N.values)
          D[O].add(w);
      }
    }
    return D;
  });
  const d = lc, m = c.catchall;
  let v;
  a._zod.parse = (A, D) => {
    v ?? (v = f.value);
    const O = A.value;
    if (!d(O))
      return A.issues.push({
        expected: "object",
        code: "invalid_type",
        input: O,
        inst: a
      }), A;
    A.value = {};
    const N = [], w = v.shape;
    for (const B of v.keys) {
      const $ = w[B]._zod.run({ value: O[B], issues: [] }, D);
      $ instanceof Promise ? N.push($.then((ve) => nc(ve, A, B, O))) : nc($, A, B, O);
    }
    return m ? j0(N, O, A, D, f.value, a) : N.length ? Promise.all(N).then(() => A) : A;
  };
}), xp = /* @__PURE__ */ U("$ZodObjectJIT", (a, c) => {
  Ap.init(a, c);
  const o = a._zod.parse, f = is(() => U0(c)), d = (B) => {
    const ee = new F1(["shape", "payload", "ctx"]), $ = f.value, ve = (je) => {
      const ye = Jm(je);
      return `shape[${ye}]._zod.run({ value: input[${ye}], issues: [] }, ctx)`;
    };
    ee.write("const input = payload.value;");
    const le = /* @__PURE__ */ Object.create(null);
    let ze = 0;
    for (const je of $.keys)
      le[je] = `key_${ze++}`;
    ee.write("const newResult = {};");
    for (const je of $.keys) {
      const ye = le[je], He = Jm(je);
      ee.write(`const ${ye} = ${ve(je)};`), ee.write(`
        if (${ye}.issues.length) {
          payload.issues = payload.issues.concat(${ye}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${He}, ...iss.path] : [${He}]
          })));
        }
        
        
        if (${ye}.value === undefined) {
          if (${He} in input) {
            newResult[${He}] = undefined;
          }
        } else {
          newResult[${He}] = ${ye}.value;
        }
        
      `);
    }
    ee.write("payload.value = newResult;"), ee.write("return payload;");
    const Je = ee.compile();
    return (je, ye) => Je(B, je, ye);
  };
  let m;
  const v = lc, A = !p0.jitless, O = A && Vg.value, N = c.catchall;
  let w;
  a._zod.parse = (B, ee) => {
    w ?? (w = f.value);
    const $ = B.value;
    return v($) ? A && O && ee?.async === !1 && ee.jitless !== !0 ? (m || (m = d(c.shape)), B = m(B, ee), N ? j0([], $, B, ee, w, a) : B) : o(B, ee) : (B.issues.push({
      expected: "object",
      code: "invalid_type",
      input: $,
      inst: a
    }), B);
  };
});
function Fm(a, c, o, f) {
  for (const m of a)
    if (m.issues.length === 0)
      return c.value = m.value, c;
  const d = a.filter((m) => !za(m));
  return d.length === 1 ? (c.value = d[0].value, d[0]) : (c.issues.push({
    code: "invalid_union",
    input: c.value,
    inst: o,
    errors: a.map((m) => m.issues.map((v) => an(v, f, nn())))
  }), c);
}
const Mp = /* @__PURE__ */ U("$ZodUnion", (a, c) => {
  Be.init(a, c), Oe(a._zod, "optin", () => c.options.some((d) => d._zod.optin === "optional") ? "optional" : void 0), Oe(a._zod, "optout", () => c.options.some((d) => d._zod.optout === "optional") ? "optional" : void 0), Oe(a._zod, "values", () => {
    if (c.options.every((d) => d._zod.values))
      return new Set(c.options.flatMap((d) => Array.from(d._zod.values)));
  }), Oe(a._zod, "pattern", () => {
    if (c.options.every((d) => d._zod.pattern)) {
      const d = c.options.map((m) => m._zod.pattern);
      return new RegExp(`^(${d.map((m) => os(m.source)).join("|")})$`);
    }
  });
  const o = c.options.length === 1, f = c.options[0]._zod.run;
  a._zod.parse = (d, m) => {
    if (o)
      return f(d, m);
    let v = !1;
    const A = [];
    for (const D of c.options) {
      const O = D._zod.run({
        value: d.value,
        issues: []
      }, m);
      if (O instanceof Promise)
        A.push(O), v = !0;
      else {
        if (O.issues.length === 0)
          return O;
        A.push(O);
      }
    }
    return v ? Promise.all(A).then((D) => Fm(D, d, a, m)) : Fm(A, d, a, m);
  };
}), Cp = /* @__PURE__ */ U("$ZodIntersection", (a, c) => {
  Be.init(a, c), a._zod.parse = (o, f) => {
    const d = o.value, m = c.left._zod.run({ value: d, issues: [] }, f), v = c.right._zod.run({ value: d, issues: [] }, f);
    return m instanceof Promise || v instanceof Promise ? Promise.all([m, v]).then(([D, O]) => Wm(o, D, O)) : Wm(o, m, v);
  };
});
function ls(a, c) {
  if (a === c)
    return { valid: !0, data: a };
  if (a instanceof Date && c instanceof Date && +a == +c)
    return { valid: !0, data: a };
  if (Oa(a) && Oa(c)) {
    const o = Object.keys(c), f = Object.keys(a).filter((m) => o.indexOf(m) !== -1), d = { ...a, ...c };
    for (const m of f) {
      const v = ls(a[m], c[m]);
      if (!v.valid)
        return {
          valid: !1,
          mergeErrorPath: [m, ...v.mergeErrorPath]
        };
      d[m] = v.data;
    }
    return { valid: !0, data: d };
  }
  if (Array.isArray(a) && Array.isArray(c)) {
    if (a.length !== c.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let f = 0; f < a.length; f++) {
      const d = a[f], m = c[f], v = ls(d, m);
      if (!v.valid)
        return {
          valid: !1,
          mergeErrorPath: [f, ...v.mergeErrorPath]
        };
      o.push(v.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Wm(a, c, o) {
  if (c.issues.length && a.issues.push(...c.issues), o.issues.length && a.issues.push(...o.issues), za(a))
    return a;
  const f = ls(c.value, o.value);
  if (!f.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(f.mergeErrorPath)}`);
  return a.value = f.data, a;
}
const Dp = /* @__PURE__ */ U("$ZodRecord", (a, c) => {
  Be.init(a, c), a._zod.parse = (o, f) => {
    const d = o.value;
    if (!Oa(d))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: d,
        inst: a
      }), o;
    const m = [], v = c.keyType._zod.values;
    if (v) {
      o.value = {};
      const A = /* @__PURE__ */ new Set();
      for (const O of v)
        if (typeof O == "string" || typeof O == "number" || typeof O == "symbol") {
          A.add(typeof O == "number" ? O.toString() : O);
          const N = c.valueType._zod.run({ value: d[O], issues: [] }, f);
          N instanceof Promise ? m.push(N.then((w) => {
            w.issues.length && o.issues.push(...Ta(O, w.issues)), o.value[O] = w.value;
          })) : (N.issues.length && o.issues.push(...Ta(O, N.issues)), o.value[O] = N.value);
        }
      let D;
      for (const O in d)
        A.has(O) || (D = D ?? [], D.push(O));
      D && D.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: d,
        inst: a,
        keys: D
      });
    } else {
      o.value = {};
      for (const A of Reflect.ownKeys(d)) {
        if (A === "__proto__")
          continue;
        const D = c.keyType._zod.run({ value: A, issues: [] }, f);
        if (D instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (D.issues.length) {
          o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: D.issues.map((N) => an(N, f, nn())),
            input: A,
            path: [A],
            inst: a
          }), o.value[D.value] = D.value;
          continue;
        }
        const O = c.valueType._zod.run({ value: d[A], issues: [] }, f);
        O instanceof Promise ? m.push(O.then((N) => {
          N.issues.length && o.issues.push(...Ta(A, N.issues)), o.value[D.value] = N.value;
        })) : (O.issues.length && o.issues.push(...Ta(A, O.issues)), o.value[D.value] = O.value);
      }
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
}), Up = /* @__PURE__ */ U("$ZodEnum", (a, c) => {
  Be.init(a, c);
  const o = Gg(c.entries), f = new Set(o);
  a._zod.values = f, a._zod.pattern = new RegExp(`^(${o.filter((d) => Qg.has(typeof d)).map((d) => typeof d == "string" ? ic(d) : d.toString()).join("|")})$`), a._zod.parse = (d, m) => {
    const v = d.value;
    return f.has(v) || d.issues.push({
      code: "invalid_value",
      values: o,
      input: v,
      inst: a
    }), d;
  };
}), jp = /* @__PURE__ */ U("$ZodTransform", (a, c) => {
  Be.init(a, c), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      throw new g0(a.constructor.name);
    const d = c.transform(o.value, o);
    if (f.async)
      return (d instanceof Promise ? d : Promise.resolve(d)).then((v) => (o.value = v, o));
    if (d instanceof Promise)
      throw new Ea();
    return o.value = d, o;
  };
});
function Im(a, c) {
  return a.issues.length && c === void 0 ? { issues: [], value: void 0 } : a;
}
const wp = /* @__PURE__ */ U("$ZodOptional", (a, c) => {
  Be.init(a, c), a._zod.optin = "optional", a._zod.optout = "optional", Oe(a._zod, "values", () => c.innerType._zod.values ? /* @__PURE__ */ new Set([...c.innerType._zod.values, void 0]) : void 0), Oe(a._zod, "pattern", () => {
    const o = c.innerType._zod.pattern;
    return o ? new RegExp(`^(${os(o.source)})?$`) : void 0;
  }), a._zod.parse = (o, f) => {
    if (c.innerType._zod.optin === "optional") {
      const d = c.innerType._zod.run(o, f);
      return d instanceof Promise ? d.then((m) => Im(m, o.value)) : Im(d, o.value);
    }
    return o.value === void 0 ? o : c.innerType._zod.run(o, f);
  };
}), Rp = /* @__PURE__ */ U("$ZodNullable", (a, c) => {
  Be.init(a, c), Oe(a._zod, "optin", () => c.innerType._zod.optin), Oe(a._zod, "optout", () => c.innerType._zod.optout), Oe(a._zod, "pattern", () => {
    const o = c.innerType._zod.pattern;
    return o ? new RegExp(`^(${os(o.source)}|null)$`) : void 0;
  }), Oe(a._zod, "values", () => c.innerType._zod.values ? /* @__PURE__ */ new Set([...c.innerType._zod.values, null]) : void 0), a._zod.parse = (o, f) => o.value === null ? o : c.innerType._zod.run(o, f);
}), Zp = /* @__PURE__ */ U("$ZodDefault", (a, c) => {
  Be.init(a, c), a._zod.optin = "optional", Oe(a._zod, "values", () => c.innerType._zod.values), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return c.innerType._zod.run(o, f);
    if (o.value === void 0)
      return o.value = c.defaultValue, o;
    const d = c.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((m) => Pm(m, c)) : Pm(d, c);
  };
});
function Pm(a, c) {
  return a.value === void 0 && (a.value = c.defaultValue), a;
}
const Hp = /* @__PURE__ */ U("$ZodPrefault", (a, c) => {
  Be.init(a, c), a._zod.optin = "optional", Oe(a._zod, "values", () => c.innerType._zod.values), a._zod.parse = (o, f) => (f.direction === "backward" || o.value === void 0 && (o.value = c.defaultValue), c.innerType._zod.run(o, f));
}), qp = /* @__PURE__ */ U("$ZodNonOptional", (a, c) => {
  Be.init(a, c), Oe(a._zod, "values", () => {
    const o = c.innerType._zod.values;
    return o ? new Set([...o].filter((f) => f !== void 0)) : void 0;
  }), a._zod.parse = (o, f) => {
    const d = c.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((m) => e0(m, a)) : e0(d, a);
  };
});
function e0(a, c) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: c
  }), a;
}
const Bp = /* @__PURE__ */ U("$ZodCatch", (a, c) => {
  Be.init(a, c), Oe(a._zod, "optin", () => c.innerType._zod.optin), Oe(a._zod, "optout", () => c.innerType._zod.optout), Oe(a._zod, "values", () => c.innerType._zod.values), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return c.innerType._zod.run(o, f);
    const d = c.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then((m) => (o.value = m.value, m.issues.length && (o.value = c.catchValue({
      ...o,
      error: {
        issues: m.issues.map((v) => an(v, f, nn()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = d.value, d.issues.length && (o.value = c.catchValue({
      ...o,
      error: {
        issues: d.issues.map((m) => an(m, f, nn()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), Yp = /* @__PURE__ */ U("$ZodPipe", (a, c) => {
  Be.init(a, c), Oe(a._zod, "values", () => c.in._zod.values), Oe(a._zod, "optin", () => c.in._zod.optin), Oe(a._zod, "optout", () => c.out._zod.optout), Oe(a._zod, "propValues", () => c.in._zod.propValues), a._zod.parse = (o, f) => {
    if (f.direction === "backward") {
      const m = c.out._zod.run(o, f);
      return m instanceof Promise ? m.then((v) => Pi(v, c.in, f)) : Pi(m, c.in, f);
    }
    const d = c.in._zod.run(o, f);
    return d instanceof Promise ? d.then((m) => Pi(m, c.out, f)) : Pi(d, c.out, f);
  };
});
function Pi(a, c, o) {
  return a.issues.length ? (a.aborted = !0, a) : c._zod.run({ value: a.value, issues: a.issues }, o);
}
const Gp = /* @__PURE__ */ U("$ZodReadonly", (a, c) => {
  Be.init(a, c), Oe(a._zod, "propValues", () => c.innerType._zod.propValues), Oe(a._zod, "values", () => c.innerType._zod.values), Oe(a._zod, "optin", () => c.innerType?._zod?.optin), Oe(a._zod, "optout", () => c.innerType?._zod?.optout), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      return c.innerType._zod.run(o, f);
    const d = c.innerType._zod.run(o, f);
    return d instanceof Promise ? d.then(t0) : t0(d);
  };
});
function t0(a) {
  return a.value = Object.freeze(a.value), a;
}
const Lp = /* @__PURE__ */ U("$ZodCustom", (a, c) => {
  bt.init(a, c), Be.init(a, c), a._zod.parse = (o, f) => o, a._zod.check = (o) => {
    const f = o.value, d = c.fn(f);
    if (d instanceof Promise)
      return d.then((m) => l0(m, o, f, a));
    l0(d, o, f, a);
  };
});
function l0(a, c, o, f) {
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
    f._zod.def.params && (d.params = f._zod.def.params), c.issues.push(Eu(d));
  }
}
var n0;
class Xp {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(c, ...o) {
    const f = o[0];
    if (this._map.set(c, f), f && typeof f == "object" && "id" in f) {
      if (this._idmap.has(f.id))
        throw new Error(`ID ${f.id} already exists in the registry`);
      this._idmap.set(f.id, c);
    }
    return this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(c) {
    const o = this._map.get(c);
    return o && typeof o == "object" && "id" in o && this._idmap.delete(o.id), this._map.delete(c), this;
  }
  get(c) {
    const o = c._zod.parent;
    if (o) {
      const f = { ...this.get(o) ?? {} };
      delete f.id;
      const d = { ...f, ...this._map.get(c) };
      return Object.keys(d).length ? d : void 0;
    }
    return this._map.get(c);
  }
  has(c) {
    return this._map.has(c);
  }
}
function Vp() {
  return new Xp();
}
(n0 = globalThis).__zod_globalRegistry ?? (n0.__zod_globalRegistry = Vp());
const ec = globalThis.__zod_globalRegistry;
function Qp(a, c) {
  return new a({
    type: "string",
    ...Q(c)
  });
}
function Kp(a, c) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function a0(a, c) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function Jp(a, c) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function $p(a, c) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...Q(c)
  });
}
function kp(a, c) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...Q(c)
  });
}
function Fp(a, c) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...Q(c)
  });
}
function Wp(a, c) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function Ip(a, c) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function Pp(a, c) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function e2(a, c) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function t2(a, c) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function l2(a, c) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function n2(a, c) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function a2(a, c) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function u2(a, c) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function i2(a, c) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function c2(a, c) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function o2(a, c) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function f2(a, c) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function s2(a, c) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function r2(a, c) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function d2(a, c) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...Q(c)
  });
}
function h2(a, c) {
  return new a({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...Q(c)
  });
}
function m2(a, c) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...Q(c)
  });
}
function v2(a, c) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...Q(c)
  });
}
function y2(a, c) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...Q(c)
  });
}
function g2(a, c) {
  return new a({
    type: "number",
    checks: [],
    ...Q(c)
  });
}
function p2(a, c) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...Q(c)
  });
}
function _2(a) {
  return new a({
    type: "unknown"
  });
}
function b2(a, c) {
  return new a({
    type: "never",
    ...Q(c)
  });
}
function u0(a, c) {
  return new x0({
    check: "less_than",
    ...Q(c),
    value: a,
    inclusive: !1
  });
}
function Pf(a, c) {
  return new x0({
    check: "less_than",
    ...Q(c),
    value: a,
    inclusive: !0
  });
}
function i0(a, c) {
  return new M0({
    check: "greater_than",
    ...Q(c),
    value: a,
    inclusive: !1
  });
}
function es(a, c) {
  return new M0({
    check: "greater_than",
    ...Q(c),
    value: a,
    inclusive: !0
  });
}
function c0(a, c) {
  return new q1({
    check: "multiple_of",
    ...Q(c),
    value: a
  });
}
function w0(a, c) {
  return new Y1({
    check: "max_length",
    ...Q(c),
    maximum: a
  });
}
function ac(a, c) {
  return new G1({
    check: "min_length",
    ...Q(c),
    minimum: a
  });
}
function R0(a, c) {
  return new L1({
    check: "length_equals",
    ...Q(c),
    length: a
  });
}
function S2(a, c) {
  return new X1({
    check: "string_format",
    format: "regex",
    ...Q(c),
    pattern: a
  });
}
function z2(a) {
  return new V1({
    check: "string_format",
    format: "lowercase",
    ...Q(a)
  });
}
function T2(a) {
  return new Q1({
    check: "string_format",
    format: "uppercase",
    ...Q(a)
  });
}
function E2(a, c) {
  return new K1({
    check: "string_format",
    format: "includes",
    ...Q(c),
    includes: a
  });
}
function O2(a, c) {
  return new J1({
    check: "string_format",
    format: "starts_with",
    ...Q(c),
    prefix: a
  });
}
function N2(a, c) {
  return new $1({
    check: "string_format",
    format: "ends_with",
    ...Q(c),
    suffix: a
  });
}
function Aa(a) {
  return new k1({
    check: "overwrite",
    tx: a
  });
}
function A2(a) {
  return Aa((c) => c.normalize(a));
}
function x2() {
  return Aa((a) => a.trim());
}
function M2() {
  return Aa((a) => a.toLowerCase());
}
function C2() {
  return Aa((a) => a.toUpperCase());
}
function D2() {
  return Aa((a) => Xg(a));
}
function U2(a, c, o) {
  return new a({
    type: "array",
    element: c,
    // get element() {
    //   return element;
    // },
    ...Q(o)
  });
}
function j2(a, c, o) {
  return new a({
    type: "custom",
    check: "custom",
    fn: c,
    ...Q(o)
  });
}
function w2(a) {
  const c = R2((o) => (o.addIssue = (f) => {
    if (typeof f == "string")
      o.issues.push(Eu(f, o.value, c._zod.def));
    else {
      const d = f;
      d.fatal && (d.continue = !1), d.code ?? (d.code = "custom"), d.input ?? (d.input = o.value), d.inst ?? (d.inst = c), d.continue ?? (d.continue = !c._zod.def.abort), o.issues.push(Eu(d));
    }
  }, a(o.value, o)));
  return c;
}
function R2(a, c) {
  const o = new bt({
    check: "custom",
    ...Q(c)
  });
  return o._zod.check = a, o;
}
const Z2 = /* @__PURE__ */ U("ZodISODateTime", (a, c) => {
  fp.init(a, c), Ue.init(a, c);
});
function H2(a) {
  return h2(Z2, a);
}
const q2 = /* @__PURE__ */ U("ZodISODate", (a, c) => {
  sp.init(a, c), Ue.init(a, c);
});
function B2(a) {
  return m2(q2, a);
}
const Y2 = /* @__PURE__ */ U("ZodISOTime", (a, c) => {
  rp.init(a, c), Ue.init(a, c);
});
function G2(a) {
  return v2(Y2, a);
}
const L2 = /* @__PURE__ */ U("ZodISODuration", (a, c) => {
  dp.init(a, c), Ue.init(a, c);
});
function X2(a) {
  return y2(L2, a);
}
const V2 = (a, c) => {
  z0.init(a, c), a.name = "ZodError", Object.defineProperties(a, {
    format: {
      value: (o) => l1(a, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => t1(a, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        a.issues.push(o), a.message = JSON.stringify(a.issues, ts, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        a.issues.push(...o), a.message = JSON.stringify(a.issues, ts, 2);
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
}, Jt = U("ZodError", V2, {
  Parent: Error
}), Q2 = /* @__PURE__ */ ss(Jt), K2 = /* @__PURE__ */ rs(Jt), J2 = /* @__PURE__ */ cc(Jt), $2 = /* @__PURE__ */ oc(Jt), k2 = /* @__PURE__ */ u1(Jt), F2 = /* @__PURE__ */ i1(Jt), W2 = /* @__PURE__ */ c1(Jt), I2 = /* @__PURE__ */ o1(Jt), P2 = /* @__PURE__ */ f1(Jt), e_ = /* @__PURE__ */ s1(Jt), t_ = /* @__PURE__ */ r1(Jt), l_ = /* @__PURE__ */ d1(Jt), Qe = /* @__PURE__ */ U("ZodType", (a, c) => (Be.init(a, c), a.def = c, a.type = c.type, Object.defineProperty(a, "_def", { value: c }), a.check = (...o) => a.clone(Un(c, {
  checks: [
    ...c.checks ?? [],
    ...o.map((f) => typeof f == "function" ? { _zod: { check: f, def: { check: "custom" }, onattach: [] } } : f)
  ]
})), a.clone = (o, f) => un(a, o, f), a.brand = () => a, a.register = ((o, f) => (o.add(a, f), a)), a.parse = (o, f) => Q2(a, o, f, { callee: a.parse }), a.safeParse = (o, f) => J2(a, o, f), a.parseAsync = async (o, f) => K2(a, o, f, { callee: a.parseAsync }), a.safeParseAsync = async (o, f) => $2(a, o, f), a.spa = a.safeParseAsync, a.encode = (o, f) => k2(a, o, f), a.decode = (o, f) => F2(a, o, f), a.encodeAsync = async (o, f) => W2(a, o, f), a.decodeAsync = async (o, f) => I2(a, o, f), a.safeEncode = (o, f) => P2(a, o, f), a.safeDecode = (o, f) => e_(a, o, f), a.safeEncodeAsync = async (o, f) => t_(a, o, f), a.safeDecodeAsync = async (o, f) => l_(a, o, f), a.refine = (o, f) => a.check(K_(o, f)), a.superRefine = (o) => a.check(J_(o)), a.overwrite = (o) => a.check(Aa(o)), a.optional = () => r0(a), a.nullable = () => d0(a), a.nullish = () => r0(d0(a)), a.nonoptional = (o) => B_(a, o), a.array = () => Ou(a), a.or = (o) => x_([a, o]), a.and = (o) => C_(a, o), a.transform = (o) => h0(a, j_(o)), a.default = (o) => Z_(a, o), a.prefault = (o) => q_(a, o), a.catch = (o) => G_(a, o), a.pipe = (o) => h0(a, o), a.readonly = () => V_(a), a.describe = (o) => {
  const f = a.clone();
  return ec.add(f, { description: o }), f;
}, Object.defineProperty(a, "description", {
  get() {
    return ec.get(a)?.description;
  },
  configurable: !0
}), a.meta = (...o) => {
  if (o.length === 0)
    return ec.get(a);
  const f = a.clone();
  return ec.add(f, o[0]), f;
}, a.isOptional = () => a.safeParse(void 0).success, a.isNullable = () => a.safeParse(null).success, a)), Z0 = /* @__PURE__ */ U("_ZodString", (a, c) => {
  ds.init(a, c), Qe.init(a, c);
  const o = a._zod.bag;
  a.format = o.format ?? null, a.minLength = o.minimum ?? null, a.maxLength = o.maximum ?? null, a.regex = (...f) => a.check(S2(...f)), a.includes = (...f) => a.check(E2(...f)), a.startsWith = (...f) => a.check(O2(...f)), a.endsWith = (...f) => a.check(N2(...f)), a.min = (...f) => a.check(ac(...f)), a.max = (...f) => a.check(w0(...f)), a.length = (...f) => a.check(R0(...f)), a.nonempty = (...f) => a.check(ac(1, ...f)), a.lowercase = (f) => a.check(z2(f)), a.uppercase = (f) => a.check(T2(f)), a.trim = () => a.check(x2()), a.normalize = (...f) => a.check(A2(...f)), a.toLowerCase = () => a.check(M2()), a.toUpperCase = () => a.check(C2()), a.slugify = () => a.check(D2());
}), n_ = /* @__PURE__ */ U("ZodString", (a, c) => {
  ds.init(a, c), Z0.init(a, c), a.email = (o) => a.check(Kp(a_, o)), a.url = (o) => a.check(Wp(u_, o)), a.jwt = (o) => a.check(d2(b_, o)), a.emoji = (o) => a.check(Ip(i_, o)), a.guid = (o) => a.check(a0(o0, o)), a.uuid = (o) => a.check(Jp(tc, o)), a.uuidv4 = (o) => a.check($p(tc, o)), a.uuidv6 = (o) => a.check(kp(tc, o)), a.uuidv7 = (o) => a.check(Fp(tc, o)), a.nanoid = (o) => a.check(Pp(c_, o)), a.guid = (o) => a.check(a0(o0, o)), a.cuid = (o) => a.check(e2(o_, o)), a.cuid2 = (o) => a.check(t2(f_, o)), a.ulid = (o) => a.check(l2(s_, o)), a.base64 = (o) => a.check(f2(g_, o)), a.base64url = (o) => a.check(s2(p_, o)), a.xid = (o) => a.check(n2(r_, o)), a.ksuid = (o) => a.check(a2(d_, o)), a.ipv4 = (o) => a.check(u2(h_, o)), a.ipv6 = (o) => a.check(i2(m_, o)), a.cidrv4 = (o) => a.check(c2(v_, o)), a.cidrv6 = (o) => a.check(o2(y_, o)), a.e164 = (o) => a.check(r2(__, o)), a.datetime = (o) => a.check(H2(o)), a.date = (o) => a.check(B2(o)), a.time = (o) => a.check(G2(o)), a.duration = (o) => a.check(X2(o));
});
function De(a) {
  return Qp(n_, a);
}
const Ue = /* @__PURE__ */ U("ZodStringFormat", (a, c) => {
  xe.init(a, c), Z0.init(a, c);
}), a_ = /* @__PURE__ */ U("ZodEmail", (a, c) => {
  ep.init(a, c), Ue.init(a, c);
}), o0 = /* @__PURE__ */ U("ZodGUID", (a, c) => {
  I1.init(a, c), Ue.init(a, c);
}), tc = /* @__PURE__ */ U("ZodUUID", (a, c) => {
  P1.init(a, c), Ue.init(a, c);
}), u_ = /* @__PURE__ */ U("ZodURL", (a, c) => {
  tp.init(a, c), Ue.init(a, c);
}), i_ = /* @__PURE__ */ U("ZodEmoji", (a, c) => {
  lp.init(a, c), Ue.init(a, c);
}), c_ = /* @__PURE__ */ U("ZodNanoID", (a, c) => {
  np.init(a, c), Ue.init(a, c);
}), o_ = /* @__PURE__ */ U("ZodCUID", (a, c) => {
  ap.init(a, c), Ue.init(a, c);
}), f_ = /* @__PURE__ */ U("ZodCUID2", (a, c) => {
  up.init(a, c), Ue.init(a, c);
}), s_ = /* @__PURE__ */ U("ZodULID", (a, c) => {
  ip.init(a, c), Ue.init(a, c);
}), r_ = /* @__PURE__ */ U("ZodXID", (a, c) => {
  cp.init(a, c), Ue.init(a, c);
}), d_ = /* @__PURE__ */ U("ZodKSUID", (a, c) => {
  op.init(a, c), Ue.init(a, c);
}), h_ = /* @__PURE__ */ U("ZodIPv4", (a, c) => {
  hp.init(a, c), Ue.init(a, c);
}), m_ = /* @__PURE__ */ U("ZodIPv6", (a, c) => {
  mp.init(a, c), Ue.init(a, c);
}), v_ = /* @__PURE__ */ U("ZodCIDRv4", (a, c) => {
  vp.init(a, c), Ue.init(a, c);
}), y_ = /* @__PURE__ */ U("ZodCIDRv6", (a, c) => {
  yp.init(a, c), Ue.init(a, c);
}), g_ = /* @__PURE__ */ U("ZodBase64", (a, c) => {
  gp.init(a, c), Ue.init(a, c);
}), p_ = /* @__PURE__ */ U("ZodBase64URL", (a, c) => {
  _p.init(a, c), Ue.init(a, c);
}), __ = /* @__PURE__ */ U("ZodE164", (a, c) => {
  bp.init(a, c), Ue.init(a, c);
}), b_ = /* @__PURE__ */ U("ZodJWT", (a, c) => {
  zp.init(a, c), Ue.init(a, c);
}), H0 = /* @__PURE__ */ U("ZodNumber", (a, c) => {
  D0.init(a, c), Qe.init(a, c), a.gt = (f, d) => a.check(i0(f, d)), a.gte = (f, d) => a.check(es(f, d)), a.min = (f, d) => a.check(es(f, d)), a.lt = (f, d) => a.check(u0(f, d)), a.lte = (f, d) => a.check(Pf(f, d)), a.max = (f, d) => a.check(Pf(f, d)), a.int = (f) => a.check(s0(f)), a.safe = (f) => a.check(s0(f)), a.positive = (f) => a.check(i0(0, f)), a.nonnegative = (f) => a.check(es(0, f)), a.negative = (f) => a.check(u0(0, f)), a.nonpositive = (f) => a.check(Pf(0, f)), a.multipleOf = (f, d) => a.check(c0(f, d)), a.step = (f, d) => a.check(c0(f, d)), a.finite = () => a;
  const o = a._zod.bag;
  a.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, a.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, a.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), a.isFinite = !0, a.format = o.format ?? null;
});
function f0(a) {
  return g2(H0, a);
}
const S_ = /* @__PURE__ */ U("ZodNumberFormat", (a, c) => {
  Tp.init(a, c), H0.init(a, c);
});
function s0(a) {
  return p2(S_, a);
}
const z_ = /* @__PURE__ */ U("ZodUnknown", (a, c) => {
  Ep.init(a, c), Qe.init(a, c);
});
function uc() {
  return _2(z_);
}
const T_ = /* @__PURE__ */ U("ZodNever", (a, c) => {
  Op.init(a, c), Qe.init(a, c);
});
function E_(a) {
  return b2(T_, a);
}
const O_ = /* @__PURE__ */ U("ZodArray", (a, c) => {
  Np.init(a, c), Qe.init(a, c), a.element = c.element, a.min = (o, f) => a.check(ac(o, f)), a.nonempty = (o) => a.check(ac(1, o)), a.max = (o, f) => a.check(w0(o, f)), a.length = (o, f) => a.check(R0(o, f)), a.unwrap = () => a.element;
});
function Ou(a, c) {
  return U2(O_, a, c);
}
const N_ = /* @__PURE__ */ U("ZodObject", (a, c) => {
  xp.init(a, c), Qe.init(a, c), Oe(a, "shape", () => c.shape), a.keyof = () => Na(Object.keys(a._zod.def.shape)), a.catchall = (o) => a.clone({ ...a._zod.def, catchall: o }), a.passthrough = () => a.clone({ ...a._zod.def, catchall: uc() }), a.loose = () => a.clone({ ...a._zod.def, catchall: uc() }), a.strict = () => a.clone({ ...a._zod.def, catchall: E_() }), a.strip = () => a.clone({ ...a._zod.def, catchall: void 0 }), a.extend = (o) => Fg(a, o), a.safeExtend = (o) => Wg(a, o), a.merge = (o) => Ig(a, o), a.pick = (o) => $g(a, o), a.omit = (o) => kg(a, o), a.partial = (...o) => Pg(B0, a, o[0]), a.required = (...o) => e1(Y0, a, o[0]);
});
function sc(a, c) {
  const o = {
    type: "object",
    shape: a ?? {},
    ...Q(c)
  };
  return new N_(o);
}
const A_ = /* @__PURE__ */ U("ZodUnion", (a, c) => {
  Mp.init(a, c), Qe.init(a, c), a.options = c.options;
});
function x_(a, c) {
  return new A_({
    type: "union",
    options: a,
    ...Q(c)
  });
}
const M_ = /* @__PURE__ */ U("ZodIntersection", (a, c) => {
  Cp.init(a, c), Qe.init(a, c);
});
function C_(a, c) {
  return new M_({
    type: "intersection",
    left: a,
    right: c
  });
}
const D_ = /* @__PURE__ */ U("ZodRecord", (a, c) => {
  Dp.init(a, c), Qe.init(a, c), a.keyType = c.keyType, a.valueType = c.valueType;
});
function q0(a, c, o) {
  return new D_({
    type: "record",
    keyType: a,
    valueType: c,
    ...Q(o)
  });
}
const ns = /* @__PURE__ */ U("ZodEnum", (a, c) => {
  Up.init(a, c), Qe.init(a, c), a.enum = c.entries, a.options = Object.values(c.entries);
  const o = new Set(Object.keys(c.entries));
  a.extract = (f, d) => {
    const m = {};
    for (const v of f)
      if (o.has(v))
        m[v] = c.entries[v];
      else
        throw new Error(`Key ${v} not found in enum`);
    return new ns({
      ...c,
      checks: [],
      ...Q(d),
      entries: m
    });
  }, a.exclude = (f, d) => {
    const m = { ...c.entries };
    for (const v of f)
      if (o.has(v))
        delete m[v];
      else
        throw new Error(`Key ${v} not found in enum`);
    return new ns({
      ...c,
      checks: [],
      ...Q(d),
      entries: m
    });
  };
});
function Na(a, c) {
  const o = Array.isArray(a) ? Object.fromEntries(a.map((f) => [f, f])) : a;
  return new ns({
    type: "enum",
    entries: o,
    ...Q(c)
  });
}
const U_ = /* @__PURE__ */ U("ZodTransform", (a, c) => {
  jp.init(a, c), Qe.init(a, c), a._zod.parse = (o, f) => {
    if (f.direction === "backward")
      throw new g0(a.constructor.name);
    o.addIssue = (m) => {
      if (typeof m == "string")
        o.issues.push(Eu(m, o.value, c));
      else {
        const v = m;
        v.fatal && (v.continue = !1), v.code ?? (v.code = "custom"), v.input ?? (v.input = o.value), v.inst ?? (v.inst = a), o.issues.push(Eu(v));
      }
    };
    const d = c.transform(o.value, o);
    return d instanceof Promise ? d.then((m) => (o.value = m, o)) : (o.value = d, o);
  };
});
function j_(a) {
  return new U_({
    type: "transform",
    transform: a
  });
}
const B0 = /* @__PURE__ */ U("ZodOptional", (a, c) => {
  wp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType;
});
function r0(a) {
  return new B0({
    type: "optional",
    innerType: a
  });
}
const w_ = /* @__PURE__ */ U("ZodNullable", (a, c) => {
  Rp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType;
});
function d0(a) {
  return new w_({
    type: "nullable",
    innerType: a
  });
}
const R_ = /* @__PURE__ */ U("ZodDefault", (a, c) => {
  Zp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function Z_(a, c) {
  return new R_({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof c == "function" ? c() : b0(c);
    }
  });
}
const H_ = /* @__PURE__ */ U("ZodPrefault", (a, c) => {
  Hp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType;
});
function q_(a, c) {
  return new H_({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof c == "function" ? c() : b0(c);
    }
  });
}
const Y0 = /* @__PURE__ */ U("ZodNonOptional", (a, c) => {
  qp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType;
});
function B_(a, c) {
  return new Y0({
    type: "nonoptional",
    innerType: a,
    ...Q(c)
  });
}
const Y_ = /* @__PURE__ */ U("ZodCatch", (a, c) => {
  Bp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function G_(a, c) {
  return new Y_({
    type: "catch",
    innerType: a,
    catchValue: typeof c == "function" ? c : () => c
  });
}
const L_ = /* @__PURE__ */ U("ZodPipe", (a, c) => {
  Yp.init(a, c), Qe.init(a, c), a.in = c.in, a.out = c.out;
});
function h0(a, c) {
  return new L_({
    type: "pipe",
    in: a,
    out: c
    // ...util.normalizeParams(params),
  });
}
const X_ = /* @__PURE__ */ U("ZodReadonly", (a, c) => {
  Gp.init(a, c), Qe.init(a, c), a.unwrap = () => a._zod.def.innerType;
});
function V_(a) {
  return new X_({
    type: "readonly",
    innerType: a
  });
}
const Q_ = /* @__PURE__ */ U("ZodCustom", (a, c) => {
  Lp.init(a, c), Qe.init(a, c);
});
function K_(a, c = {}) {
  return j2(Q_, a, c);
}
function J_(a) {
  return w2(a);
}
class $_ {
  constructor(c) {
    this.config = {
      timeout: 3e4,
      ...c
    }, this.baseHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "@lanonasis/memory-client/2.0.0",
      ...c.headers
    }, c.authToken ? this.baseHeaders.Authorization = `Bearer ${c.authToken}` : c.apiKey && (this.baseHeaders["X-API-Key"] = c.apiKey), c.organizationId && (this.baseHeaders["X-Organization-ID"] = c.organizationId);
  }
  /**
   * Enrich request body with organization context if configured
   * This ensures the API has the organization_id even if not in auth token
   */
  enrichWithOrgContext(c) {
    return this.config.organizationId && !c.organization_id ? {
      ...c,
      organization_id: this.config.organizationId
    } : !this.config.organizationId && this.config.userId && !c.organization_id ? {
      ...c,
      organization_id: this.config.userId
    } : c;
  }
  /**
   * Make an HTTP request to the API
   */
  async request(c, o = {}) {
    const f = Date.now();
    if (this.config.onRequest)
      try {
        this.config.onRequest(c);
      } catch (v) {
        console.warn("onRequest hook error:", v);
      }
    const m = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${c}`;
    try {
      const v = new AbortController(), A = setTimeout(() => v.abort(), this.config.timeout), D = await fetch(m, {
        headers: { ...this.baseHeaders, ...o.headers },
        signal: v.signal,
        ...o
      });
      clearTimeout(A);
      let O;
      const N = D.headers.get("content-type");
      if (N && N.includes("application/json") ? O = await D.json() : O = await D.text(), !D.ok) {
        const w = {
          message: O?.error || `HTTP ${D.status}: ${D.statusText}`,
          statusCode: D.status,
          code: "API_ERROR"
        };
        if (this.config.onError)
          try {
            this.config.onError(w);
          } catch (B) {
            console.warn("onError hook error:", B);
          }
        return { error: w.message };
      }
      if (this.config.onResponse)
        try {
          const w = Date.now() - f;
          this.config.onResponse(c, w);
        } catch (w) {
          console.warn("onResponse hook error:", w);
        }
      return { data: O };
    } catch (v) {
      if (v instanceof Error && v.name === "AbortError") {
        const D = {
          message: "Request timeout",
          code: "TIMEOUT_ERROR",
          statusCode: 408
        };
        if (this.config.onError)
          try {
            this.config.onError(D);
          } catch (O) {
            console.warn("onError hook error:", O);
          }
        return { error: "Request timeout" };
      }
      const A = {
        message: v instanceof Error ? v.message : "Network error",
        code: "NETWORK_ERROR"
      };
      if (this.config.onError)
        try {
          this.config.onError(A);
        } catch (D) {
          console.warn("onError hook error:", D);
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
  async createMemory(c) {
    const o = this.enrichWithOrgContext(c);
    return this.request("/memory", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  /**
   * Get a memory by ID
   */
  async getMemory(c) {
    return this.request(`/memory/${encodeURIComponent(c)}`);
  }
  /**
   * Update an existing memory
   */
  async updateMemory(c, o) {
    return this.request(`/memory/${encodeURIComponent(c)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a memory
   */
  async deleteMemory(c) {
    return this.request(`/memory/${encodeURIComponent(c)}`, {
      method: "DELETE"
    });
  }
  /**
   * List memories with optional filtering and pagination
   */
  async listMemories(c = {}) {
    const o = new URLSearchParams();
    Object.entries(c).forEach(([m, v]) => {
      v != null && (Array.isArray(v) ? o.append(m, v.join(",")) : o.append(m, String(v)));
    });
    const f = o.toString(), d = f ? `/memory?${f}` : "/memory";
    return this.request(d);
  }
  /**
   * Search memories using semantic search
   */
  async searchMemories(c) {
    const o = this.enrichWithOrgContext(c);
    return this.request("/memory/search", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  /**
   * Bulk delete multiple memories
   */
  async bulkDeleteMemories(c) {
    const o = this.enrichWithOrgContext({ memory_ids: c });
    return this.request("/memory/bulk/delete", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  // Topic Operations
  /**
   * Create a new topic
   */
  async createTopic(c) {
    const o = this.enrichWithOrgContext(c);
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
  async getTopic(c) {
    return this.request(`/topics/${encodeURIComponent(c)}`);
  }
  /**
   * Update a topic
   */
  async updateTopic(c, o) {
    return this.request(`/topics/${encodeURIComponent(c)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a topic
   */
  async deleteTopic(c) {
    return this.request(`/topics/${encodeURIComponent(c)}`, {
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
  setAuthToken(c) {
    this.baseHeaders.Authorization = `Bearer ${c}`, delete this.baseHeaders["X-API-Key"];
  }
  /**
   * Update API key
   */
  setApiKey(c) {
    this.baseHeaders["X-API-Key"] = c, delete this.baseHeaders.Authorization;
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
  updateConfig(c) {
    this.config = { ...this.config, ...c }, c.headers && (this.baseHeaders = { ...this.baseHeaders, ...c.headers });
  }
  /**
   * Get current configuration (excluding sensitive data)
   */
  getConfig() {
    const { apiKey: c, authToken: o, ...f } = this.config;
    return f;
  }
}
function k_(a) {
  return new $_(a);
}
const hs = ["context", "project", "knowledge", "reference", "personal", "workflow"], G0 = ["active", "archived", "draft", "deleted"];
sc({
  title: De().min(1).max(500),
  content: De().min(1).max(5e4),
  summary: De().max(1e3).optional(),
  memory_type: Na(hs).default("context"),
  topic_id: De().uuid().optional(),
  project_ref: De().max(100).optional(),
  tags: Ou(De().min(1).max(50)).max(20).default([]),
  metadata: q0(De(), uc()).optional()
});
sc({
  title: De().min(1).max(500).optional(),
  content: De().min(1).max(5e4).optional(),
  summary: De().max(1e3).optional(),
  memory_type: Na(hs).optional(),
  status: Na(G0).optional(),
  topic_id: De().uuid().nullable().optional(),
  project_ref: De().max(100).nullable().optional(),
  tags: Ou(De().min(1).max(50)).max(20).optional(),
  metadata: q0(De(), uc()).optional()
});
sc({
  query: De().min(1).max(1e3),
  memory_types: Ou(Na(hs)).optional(),
  tags: Ou(De()).optional(),
  topic_id: De().uuid().optional(),
  project_ref: De().optional(),
  status: Na(G0).default("active"),
  limit: f0().int().min(1).max(100).default(20),
  threshold: f0().min(0).max(1).default(0.7)
});
sc({
  name: De().min(1).max(100),
  description: De().max(500).optional(),
  color: De().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: De().max(50).optional(),
  parent_topic_id: De().uuid().optional()
});
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const L0 = W.createContext(null);
function F_({ children: a, config: c, apiKey: o, apiUrl: f = "https://api.lanonasis.com", client: d }) {
  const m = W.useMemo(() => d || k_({
    apiUrl: f,
    apiKey: o,
    ...c
  }), [d, f, o, c]);
  return W.createElement(L0.Provider, { value: m }, a);
}
function ms() {
  const a = W.useContext(L0);
  if (!a)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return a;
}
function W_(a) {
  const c = ms(), [o, f] = W.useState([]), [d, m] = W.useState(!0), [v, A] = W.useState(null), D = W.useCallback(async () => {
    m(!0), A(null);
    const O = await c.listMemories(a);
    O.error ? (A({
      message: O.error,
      code: "API_ERROR"
    }), f([])) : O.data && f(O.data.data), m(!1);
  }, [c, JSON.stringify(a)]);
  return W.useEffect(() => {
    D();
  }, [D]), {
    memories: o,
    loading: d,
    error: v,
    refresh: D
  };
}
function I_() {
  const a = ms(), [c, o] = W.useState(!1), [f, d] = W.useState(null);
  return {
    createMemory: W.useCallback(async (v) => {
      o(!0), d(null);
      const A = await a.createMemory(v);
      return A.error ? (d({
        message: A.error,
        code: "API_ERROR"
      }), o(!1), null) : (o(!1), A.data || null);
    }, [a]),
    loading: c,
    error: f
  };
}
function P_(a = 300) {
  const c = ms(), [o, f] = W.useState([]), [d, m] = W.useState(!1), [v, A] = W.useState(null), [D, O] = W.useState(0), [N, w] = W.useState(0), B = W.useRef(null), ee = W.useCallback(async ($, ve) => {
    B.current && clearTimeout(B.current), B.current = setTimeout(async () => {
      m(!0), A(null);
      const le = await c.searchMemories({
        query: $,
        ...ve
      });
      le.error ? (A({
        message: le.error,
        code: "API_ERROR"
      }), f([]), O(0), w(0)) : le.data && (f(le.data.results), O(le.data.total_results), w(le.data.search_time_ms)), m(!1);
    }, a);
  }, [c, a]);
  return W.useEffect(() => () => {
    B.current && clearTimeout(B.current);
  }, []), {
    results: o,
    loading: d,
    error: v,
    search: ee,
    totalResults: D,
    searchTime: N
  };
}
const jt = us.forwardRef(
  ({
    className: a = "",
    variant: c = "default",
    size: o = "default",
    children: f,
    ...d
  }, m) => {
    const v = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", A = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, D = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ z.jsx(
      "button",
      {
        ref: m,
        className: `${v} ${A[c]} ${D[o]} ${a}`,
        ...d,
        children: f
      }
    );
  }
);
jt.displayName = "Button";
const vs = us.forwardRef(
  ({ className: a = "", type: c = "text", ...o }, f) => /* @__PURE__ */ z.jsx(
    "input",
    {
      ref: f,
      type: c,
      className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${a}`,
      ...o
    }
  )
);
vs.displayName = "Input";
const X0 = ({
  className: a = "",
  size: c = 24
}) => /* @__PURE__ */ z.jsx(
  "svg",
  {
    width: c,
    height: c,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: a,
    children: /* @__PURE__ */ z.jsx(
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
), Ut = {
  search: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ z.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  ),
  plus: /* @__PURE__ */ z.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ z.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  ),
  refresh: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
        /* @__PURE__ */ z.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
      ]
    }
  ),
  settings: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ z.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
      ]
    }
  ),
  logout: /* @__PURE__ */ z.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ z.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
    }
  ),
  chevronRight: /* @__PURE__ */ z.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ z.jsx("polyline", { points: "9,18 15,12 9,6" })
    }
  ),
  globe: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ z.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ z.jsx("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
      ]
    }
  ),
  lightbulb: /* @__PURE__ */ z.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ z.jsx("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
    }
  ),
  file: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
        /* @__PURE__ */ z.jsx("polyline", { points: "14,2 14,8 20,8" })
      ]
    }
  ),
  send: /* @__PURE__ */ z.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ z.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        /* @__PURE__ */ z.jsx("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })
      ]
    }
  ),
  paperclip: /* @__PURE__ */ z.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ z.jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
    }
  )
}, eb = ({
  onLoginOAuth: a,
  onLoginApiKey: c,
  isLoading: o = !1,
  error: f = null
}) => {
  const [d, m] = W.useState(!1), [v, A] = W.useState(""), D = () => {
    v.trim() && c && c(v.trim());
  };
  return /* @__PURE__ */ z.jsxs("div", { className: "p-4 space-y-6 select-none", children: [
    /* @__PURE__ */ z.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ z.jsxs("div", { className: "flex items-center gap-2 text-[var(--vscode-sideBarTitle-foreground)]", children: [
        /* @__PURE__ */ z.jsx(X0, { className: "h-5 w-5", size: 20 }),
        /* @__PURE__ */ z.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ z.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Welcome to L0 Memory" }),
      /* @__PURE__ */ z.jsx("p", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "Authenticate to access synchronized context and intelligent memory." }),
      f && /* @__PURE__ */ z.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: f }),
      d ? /* @__PURE__ */ z.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ z.jsx(
          vs,
          {
            type: "password",
            placeholder: "Enter your API key (lano_... or lns_...)",
            value: v,
            onChange: (O) => A(O.target.value),
            className: "h-8 text-[13px]",
            autoFocus: !0,
            onKeyDown: (O) => O.key === "Enter" && D()
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ z.jsx(
            jt,
            {
              className: "flex-1",
              onClick: D,
              disabled: !v.trim() || o,
              children: o ? "Connecting..." : "Connect"
            }
          ),
          /* @__PURE__ */ z.jsx(
            jt,
            {
              variant: "secondary",
              onClick: () => {
                m(!1), A("");
              },
              children: "Cancel"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ z.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ z.jsx(
          jt,
          {
            className: "w-full",
            onClick: a,
            disabled: o,
            children: o ? "Connecting..." : "Connect in Browser"
          }
        ),
        /* @__PURE__ */ z.jsx(
          jt,
          {
            className: "w-full",
            variant: "secondary",
            onClick: () => m(!0),
            disabled: o,
            children: "Enter API Key"
          }
        ),
        /* @__PURE__ */ z.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] text-center opacity-70", children: 'Or use Command Palette: "LanOnasis: Authenticate"' })
      ] })
    ] }),
    /* @__PURE__ */ z.jsx("div", { className: "h-px bg-[var(--vscode-panel-border)] w-full" }),
    /* @__PURE__ */ z.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ z.jsx("h3", { className: "text-[11px] font-bold text-[var(--vscode-editor-foreground)] uppercase opacity-80", children: "Features" }),
      /* @__PURE__ */ z.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ z.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ z.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: Ut.lightbulb }),
          /* @__PURE__ */ z.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ z.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Intelligent Memory" }),
            /* @__PURE__ */ z.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Vector search and semantic understanding for your codebase." })
          ] })
        ] }),
        /* @__PURE__ */ z.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ z.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: Ut.globe }),
          /* @__PURE__ */ z.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ z.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Real-time Sync" }),
            /* @__PURE__ */ z.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Synchronized context across all your devices." })
          ] })
        ] })
      ] })
    ] })
  ] });
}, tb = ({ memory: a, onClick: c }) => {
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
  return /* @__PURE__ */ z.jsxs(
    "div",
    {
      className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
      onClick: c,
      children: [
        /* @__PURE__ */ z.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ z.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ z.jsx("span", { className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0", children: Ut.file }),
          /* @__PURE__ */ z.jsx("h3", { className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1", children: a.title })
        ] }) }),
        /* @__PURE__ */ z.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5", children: [
          /* @__PURE__ */ z.jsx("span", { className: "opacity-60", children: o(a.created_at) }),
          /* @__PURE__ */ z.jsx("span", { className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60", children: a.memory_type }),
          a.tags?.slice(0, 2).map((f) => /* @__PURE__ */ z.jsxs(
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
}, m0 = ({
  title: a,
  isOpen: c,
  onToggle: o,
  actions: f
}) => /* @__PURE__ */ z.jsxs(
  "div",
  {
    className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
    onClick: o,
    children: [
      /* @__PURE__ */ z.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ z.jsx(
          "span",
          {
            className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${c ? "rotate-90" : ""}`,
            children: Ut.chevronRight
          }
        ),
        /* @__PURE__ */ z.jsx("span", { className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase", children: a })
      ] }),
      f && /* @__PURE__ */ z.jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: f })
    ]
  }
), lb = ({ syncStatus: a, onSync: c }) => a.isOnline && a.pendingCount === 0 ? null : /* @__PURE__ */ z.jsxs("div", { className: `px-3 py-2 text-[11px] flex items-center justify-between ${a.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`, children: [
  /* @__PURE__ */ z.jsx("div", { className: "flex items-center gap-2", children: a.isOnline ? /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
    /* @__PURE__ */ z.jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "animate-pulse", children: [
      /* @__PURE__ */ z.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
      /* @__PURE__ */ z.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
    ] }),
    /* @__PURE__ */ z.jsxs("span", { children: [
      a.pendingCount,
      " pending"
    ] })
  ] }) : /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
    /* @__PURE__ */ z.jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ z.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
      /* @__PURE__ */ z.jsx("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
      /* @__PURE__ */ z.jsx("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
      /* @__PURE__ */ z.jsx("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
      /* @__PURE__ */ z.jsx("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
      /* @__PURE__ */ z.jsx("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
      /* @__PURE__ */ z.jsx("line", { x1: "12", y1: "20", x2: "12.01", y2: "20" })
    ] }),
    /* @__PURE__ */ z.jsx("span", { children: "Offline" })
  ] }) }),
  a.pendingCount > 0 && a.isOnline && /* @__PURE__ */ z.jsx(
    "button",
    {
      onClick: c,
      disabled: a.isSyncing,
      className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
      children: a.isSyncing ? "Syncing..." : "Sync now"
    }
  )
] }), nb = ({ message: a }) => {
  const c = a.role === "user";
  return /* @__PURE__ */ z.jsxs("div", { className: `flex flex-col gap-1 ${c ? "items-end" : "items-start"}`, children: [
    /* @__PURE__ */ z.jsx("div", { className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${c ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`, children: a.content }),
    !c && a.memories && a.memories.length > 0 && /* @__PURE__ */ z.jsxs("div", { className: "w-full mt-2 space-y-1", children: [
      /* @__PURE__ */ z.jsxs("div", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1", children: [
        "Related memories (",
        a.memories.length,
        ")"
      ] }),
      a.memories.slice(0, 3).map((o) => /* @__PURE__ */ z.jsxs(
        "div",
        {
          className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px]",
          children: [
            /* @__PURE__ */ z.jsx("div", { className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1", children: o.title }),
            /* @__PURE__ */ z.jsxs("div", { className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5", children: [
              o.content.slice(0, 100),
              o.content.length > 100 ? "..." : ""
            ] }),
            o._pending && /* @__PURE__ */ z.jsx("div", { className: "text-[10px] text-yellow-400 mt-1", children: "⏳ Pending sync" })
          ]
        },
        o.id
      ))
    ] })
  ] });
}, ab = ({
  initialChatInput: a = "",
  onAttachFromClipboard: c,
  isAuthenticated: o = !1,
  onLoginOAuth: f,
  onLoginApiKey: d,
  onLogout: m,
  authLoading: v = !1,
  authError: A = null,
  userEmail: D = null
}) => {
  const { memories: O, loading: N, refresh: w } = W_(), { createMemory: B, loading: ee } = I_(), {
    search: $,
    results: ve,
    loading: le
  } = P_(), [ze, Je] = W.useState(""), [je, ye] = W.useState(a), [He, te] = W.useState(!0), [ot, ce] = W.useState(!0), [at, ut] = W.useState(!1), [wt, Me] = W.useState([]), [$t, $e] = W.useState(!1), [ht, Z] = W.useState([]), [X, K] = W.useState({
    isOnline: !0,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: !1
  }), ne = W.useRef(null);
  W.useEffect(() => {
    a !== void 0 && ye(a);
  }, [a]), W.useEffect(() => {
    const M = (Y) => {
      const R = Y.data;
      if (!(!R || typeof R != "object")) {
        if (R.type === "lanonasis:cache:data" && (Z(R.payload?.memories || []), R.payload?.status && K(R.payload.status)), R.type === "lanonasis:sync:start" && K((J) => ({ ...J, isSyncing: !0 })), R.type === "lanonasis:sync:complete" && (Z(R.payload?.memories || []), K(R.payload?.status || { ...X, isSyncing: !1 })), R.type === "lanonasis:sync:error" && K((J) => ({ ...J, isSyncing: !1, isOnline: !1 })), R.type === "lanonasis:ai:search:local") {
          const J = R.payload?.results || [];
          J.length > 0 && Me((j) => {
            const H = j[j.length - 1];
            return H?.role === "assistant" ? [...j.slice(0, -1), { ...H, memories: J }] : j;
          });
        }
        if (R.type === "lanonasis:ai:search:api") {
          const J = R.payload?.results || [];
          $e(!1), Me((j) => {
            const H = j[j.length - 1];
            if (H?.role === "assistant") {
              const be = new Set((H.memories || []).map((Rt) => Rt.id)), Ye = J.filter((Rt) => !be.has(Rt.id));
              return [...j.slice(0, -1), {
                ...H,
                memories: [...H.memories || [], ...Ye].slice(0, 5)
              }];
            }
            return j;
          });
        }
        if (R.type === "lanonasis:cache:added") {
          const J = R.payload?.memory;
          J && (Z((j) => [J, ...j]), K((j) => ({ ...j, pendingCount: j.pendingCount + 1 })));
        }
      }
    };
    return window.addEventListener("message", M), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", M);
  }, []), W.useEffect(() => {
    ne.current && (ne.current.scrollTop = ne.current.scrollHeight);
  }, [wt]), W.useEffect(() => {
    ze.length > 2 && $(ze);
  }, [ze, $]);
  const ge = ze.length > 2 ? ve : O.length > 0 ? O : ht, kt = async () => {
    const M = je.trim() || ze.trim();
    if (!M) {
      const Y = document.querySelector("textarea");
      Y && (Y.focus(), Y.placeholder = "Type content to save as a memory...");
      return;
    }
    try {
      const Y = {
        title: M.slice(0, 50) + (M.length > 50 ? "..." : ""),
        content: M,
        memory_type: "knowledge",
        tags: []
      };
      await B(Y), ye(""), await w();
    } catch (Y) {
      console.error("Failed to create memory:", Y), window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: {
          memory: {
            title: M.slice(0, 50) + (M.length > 50 ? "..." : ""),
            content: M,
            memory_type: "knowledge",
            tags: []
          }
        }
      }), ye(""));
    }
  }, St = async () => {
    ut(!0);
    try {
      window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), await w();
    } finally {
      ut(!1);
    }
  }, Ft = (M) => {
    const Y = M.toLowerCase().trim();
    if (Y === "help" || Y === "?" || Y.includes("how do i"))
      return { action: "help", query: M };
    const R = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i
    ];
    for (const J of R) {
      const j = M.match(J);
      if (j)
        return { action: "create", query: j[1] || M };
    }
    return { action: "search", query: M };
  }, g = async () => {
    const M = je.trim();
    if (!M) return;
    const Y = {
      id: `user_${Date.now()}`,
      role: "user",
      content: M,
      timestamp: Date.now()
    };
    Me((j) => [...j, Y]), ye("");
    const R = Ft(M);
    if (R.action === "help") {
      const j = {
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
      Me((H) => [...H, j]);
      return;
    }
    if (R.action === "create") {
      try {
        const j = {
          title: R.query.slice(0, 50) + (R.query.length > 50 ? "..." : ""),
          content: R.query,
          memory_type: "knowledge",
          tags: []
        };
        await B(j);
        const H = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved: "${R.query.slice(0, 50)}${R.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now()
        };
        Me((be) => [...be, H]), await w();
      } catch {
        window.vscode && window.vscode.postMessage({
          type: "lanonasis:cache:add",
          payload: {
            memory: {
              title: R.query.slice(0, 50) + (R.query.length > 50 ? "..." : ""),
              content: R.query,
              memory_type: "knowledge",
              tags: []
            }
          }
        });
        const H = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved locally (will sync when online): "${R.query.slice(0, 50)}${R.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now()
        };
        Me((be) => [...be, H]);
      }
      return;
    }
    $e(!0);
    const J = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${R.query}"`,
      memories: [],
      timestamp: Date.now()
    };
    Me((j) => [...j, J]), window.vscode && window.vscode.postMessage({
      type: "lanonasis:ai:search",
      payload: { query: R.query }
    });
    try {
      const j = await $(R.query);
      j && j.length > 0 && Me((H) => {
        const be = H[H.length - 1];
        return be?.role === "assistant" ? [...H.slice(0, -1), {
          ...be,
          content: j.length > 0 ? `Found ${j.length} relevant memories:` : `No memories found for "${R.query}"`,
          memories: j
        }] : H;
      });
    } catch {
      console.log("API search failed, using local results");
    } finally {
      $e(!1);
    }
  };
  return /* @__PURE__ */ z.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ z.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    /* @__PURE__ */ z.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ z.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ z.jsx(
          X0,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ z.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ z.jsx("div", { className: "flex items-center gap-1", children: o ? /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
        /* @__PURE__ */ z.jsx(
          "div",
          {
            className: `h-1.5 w-1.5 rounded-full mr-1 ${X.isOnline ? "bg-green-500" : "bg-red-500"}`,
            title: X.isOnline ? "Online" : "Offline"
          }
        ),
        D && /* @__PURE__ */ z.jsx(
          "span",
          {
            className: "text-[10px] text-[var(--vscode-descriptionForeground)] mr-2 max-w-[100px] truncate",
            title: D,
            children: D
          }
        ),
        /* @__PURE__ */ z.jsx(jt, { variant: "ghost", size: "icon", title: "Settings", children: Ut.settings }),
        /* @__PURE__ */ z.jsx(
          jt,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: m,
            children: Ut.logout
          }
        )
      ] }) : /* @__PURE__ */ z.jsx(
        "div",
        {
          className: "h-1.5 w-1.5 rounded-full bg-yellow-500",
          title: "Not connected"
        }
      ) })
    ] }),
    o && /* @__PURE__ */ z.jsx(lb, { syncStatus: X, onSync: St }),
    /* @__PURE__ */ z.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ z.jsx(
        m0,
        {
          title: "Memory Assistant",
          isOpen: He,
          onToggle: () => te(!He)
        }
      ),
      He && /* @__PURE__ */ z.jsxs(
        "div",
        {
          ref: ne,
          className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3",
          children: [
            wt.length === 0 ? /* @__PURE__ */ z.jsx("div", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] flex flex-col items-center justify-center text-center py-4", children: o ? /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
              /* @__PURE__ */ z.jsx("div", { className: "text-[var(--vscode-button-background)] mb-2", children: Ut.lightbulb }),
              /* @__PURE__ */ z.jsx("p", { className: "italic opacity-80", children: "Ask me to find or save memories" }),
              /* @__PURE__ */ z.jsx("p", { className: "text-[11px] mt-1 opacity-60", children: 'Try: "find my OAuth notes"' })
            ] }) : /* @__PURE__ */ z.jsx("p", { className: "italic opacity-80", children: "Please connect to enable AI assistance." }) }) : wt.map((M) => /* @__PURE__ */ z.jsx(nb, { message: M }, M.id)),
            $t && /* @__PURE__ */ z.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ z.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ z.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                /* @__PURE__ */ z.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Searching..."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ z.jsx(
        m0,
        {
          title: `Memories${X.pendingCount > 0 ? ` (${X.pendingCount} pending)` : ""}`,
          isOpen: ot,
          onToggle: () => ce(!ot),
          actions: o && /* @__PURE__ */ z.jsxs(z.Fragment, { children: [
            /* @__PURE__ */ z.jsx(jt, { variant: "ghost", size: "icon", children: Ut.search }),
            /* @__PURE__ */ z.jsx(jt, { variant: "ghost", size: "icon", onClick: St, children: /* @__PURE__ */ z.jsx("span", { className: at || X.isSyncing ? "animate-spin" : "", children: Ut.refresh }) })
          ] })
        }
      ),
      ot && /* @__PURE__ */ z.jsx("div", { className: "flex-1", children: o ? /* @__PURE__ */ z.jsxs("div", { className: "p-2 space-y-2", children: [
        /* @__PURE__ */ z.jsx(
          vs,
          {
            placeholder: "Search memories...",
            value: ze,
            onChange: (M) => Je(M.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ z.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ z.jsxs(
            jt,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: kt,
              disabled: ee,
              children: [
                ee ? /* @__PURE__ */ z.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ z.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                  /* @__PURE__ */ z.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                ] }) : Ut.plus,
                ee ? "Creating..." : "Create"
              ]
            }
          ),
          /* @__PURE__ */ z.jsxs(
            jt,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: St,
              disabled: at || X.isSyncing,
              children: [
                /* @__PURE__ */ z.jsx("span", { className: at || X.isSyncing ? "animate-spin" : "", children: Ut.refresh }),
                at || X.isSyncing ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ z.jsx("div", { className: "space-y-0.5", children: N || le ? /* @__PURE__ */ z.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : ge.length === 0 ? /* @__PURE__ */ z.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: ze ? "No memories found" : ht.length > 0 ? "Loading from cache..." : "No memories yet. Create one!" }) : ge.map((M) => /* @__PURE__ */ z.jsx(tb, { memory: M }, M.id)) })
      ] }) : /* @__PURE__ */ z.jsx(
        eb,
        {
          onLoginOAuth: f,
          onLoginApiKey: d,
          isLoading: v,
          error: A
        }
      ) })
    ] }),
    /* @__PURE__ */ z.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ z.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ z.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ z.jsx(
        "textarea",
        {
          value: je,
          onChange: (M) => ye(M.target.value),
          onKeyDown: (M) => {
            M.key === "Enter" && !M.shiftKey && (M.preventDefault(), g());
          },
          placeholder: o ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Connect to chat",
          disabled: !o,
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
        }
      ) }),
      /* @__PURE__ */ z.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ z.jsx(
        jt,
        {
          size: "icon",
          variant: "ghost",
          className: "h-6 w-6",
          disabled: !o,
          onClick: c,
          title: "Attach from clipboard",
          children: Ut.paperclip
        }
      ) }),
      /* @__PURE__ */ z.jsx("div", { className: "absolute right-2 bottom-1.5", children: /* @__PURE__ */ z.jsx(
        jt,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !o || !je.trim() || $t,
          onClick: g,
          title: "Send (Enter)",
          children: $t ? /* @__PURE__ */ z.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ z.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
            /* @__PURE__ */ z.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }) : Ut.send
        }
      ) })
    ] }) })
  ] }) });
};
typeof window < "u" && typeof window.acquireVsCodeApi == "function" && (window.vscode = window.acquireVsCodeApi());
const v0 = document.getElementById("root");
function ub() {
  const [a, c] = W.useState(""), [o, f] = W.useState(void 0), [d, m] = W.useState("https://api.lanonasis.com"), [v, A] = W.useState(!1), [D, O] = W.useState(null);
  W.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const $ = (ve) => {
      const le = ve.data;
      if (!(!le || typeof le != "object")) {
        if (le.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if (le.type === "lanonasis:config:init" || le.type === "lanonasis:config:update") {
          const ze = le.payload?.apiUrl, Je = le.payload?.apiKey;
          ze && m(ze), Je !== void 0 && (f(Je || void 0), A(!1), O(null), console.log("[Webview] API key received from host"));
          return;
        }
        if (le.type === "lanonasis:auth:result") {
          A(!1), le.payload?.success ? O(null) : O(le.payload?.error || "Authentication failed");
          return;
        }
        if (le.type === "lanonasis:memory:createFromSelection") {
          const ze = le.payload?.text ?? "";
          ze && c(ze);
          return;
        }
        if (le.type === "lanonasis:clipboard:read:result") {
          const ze = le.payload?.text ?? "";
          ze && c(ze);
          return;
        }
      }
    };
    return window.addEventListener("message", $), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", $);
    };
  }, []);
  const N = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, w = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (A(!0), O(null), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, B = ($) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (A(!0), O(null), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: $ }
    }));
  }, ee = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), f(void 0), O(null), A(!1));
  };
  return /* @__PURE__ */ z.jsx(F_, { apiKey: o, apiUrl: d, children: /* @__PURE__ */ z.jsx(
    ab,
    {
      initialChatInput: a,
      onAttachFromClipboard: N,
      isAuthenticated: !!o,
      onLoginOAuth: w,
      onLoginApiKey: B,
      onLogout: ee,
      authLoading: v,
      authError: D
    }
  ) });
}
v0 && Yg.createRoot(v0).render(
  /* @__PURE__ */ z.jsx(us.StrictMode, { children: /* @__PURE__ */ z.jsx(ub, {}) })
);
