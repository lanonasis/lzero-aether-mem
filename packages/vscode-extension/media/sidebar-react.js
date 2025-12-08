function $h(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Qo = { exports: {} }, ka = {};
var mh;
function Vv() {
  if (mh) return ka;
  mh = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function o(r, d, h) {
    var m = null;
    if (h !== void 0 && (m = "" + h), d.key !== void 0 && (m = "" + d.key), "key" in d) {
      h = {};
      for (var A in d)
        A !== "key" && (h[A] = d[A]);
    } else h = d;
    return d = h.ref, {
      $$typeof: a,
      type: r,
      key: m,
      ref: d !== void 0 ? d : null,
      props: h
    };
  }
  return ka.Fragment = i, ka.jsx = o, ka.jsxs = o, ka;
}
var Vo = { exports: {} }, J = {};
var vh;
function kv() {
  if (vh) return J;
  vh = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), h = Symbol.for("react.consumer"), m = Symbol.for("react.context"), A = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), G = Symbol.iterator;
  function P(p) {
    return p === null || typeof p != "object" ? null : (p = G && p[G] || p["@@iterator"], typeof p == "function" ? p : null);
  }
  var ee = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Te = Object.assign, ae = {};
  function re(p, j, H) {
    this.props = p, this.context = j, this.refs = ae, this.updater = H || ee;
  }
  re.prototype.isReactComponent = {}, re.prototype.setState = function(p, j) {
    if (typeof p != "object" && typeof p != "function" && p != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, p, j, "setState");
  }, re.prototype.forceUpdate = function(p) {
    this.updater.enqueueForceUpdate(this, p, "forceUpdate");
  };
  function tt() {
  }
  tt.prototype = re.prototype;
  function de(p, j, H) {
    this.props = p, this.context = j, this.refs = ae, this.updater = H || ee;
  }
  var ye = de.prototype = new tt();
  ye.constructor = de, Te(ye, re.prototype), ye.isPureReactComponent = !0;
  var qe = Array.isArray;
  function Ie() {
  }
  var te = { H: null, A: null, T: null, S: null }, Pe = Object.prototype.hasOwnProperty;
  function nt(p, j, H) {
    var B = H.ref;
    return {
      $$typeof: a,
      type: p,
      key: j,
      ref: B !== void 0 ? B : null,
      props: H
    };
  }
  function Kt(p, j) {
    return nt(p.type, j, p.props);
  }
  function at(p) {
    return typeof p == "object" && p !== null && p.$$typeof === a;
  }
  function je(p) {
    var j = { "=": "=0", ":": "=2" };
    return "$" + p.replace(/[=:]/g, function(H) {
      return j[H];
    });
  }
  var Bt = /\/+/g;
  function mt(p, j) {
    return typeof p == "object" && p !== null && p.key != null ? je("" + p.key) : j.toString(36);
  }
  function ut(p) {
    switch (p.status) {
      case "fulfilled":
        return p.value;
      case "rejected":
        throw p.reason;
      default:
        switch (typeof p.status == "string" ? p.then(Ie, Ie) : (p.status = "pending", p.then(
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
  function O(p, j, H, B, w) {
    var K = typeof p;
    (K === "undefined" || K === "boolean") && (p = null);
    var q = !1;
    if (p === null) q = !0;
    else
      switch (K) {
        case "bigint":
        case "string":
        case "number":
          q = !0;
          break;
        case "object":
          switch (p.$$typeof) {
            case a:
            case i:
              q = !0;
              break;
            case R:
              return q = p._init, O(
                q(p._payload),
                j,
                H,
                B,
                w
              );
          }
      }
    if (q)
      return w = w(p), q = B === "" ? "." + mt(p, 0) : B, qe(w) ? (H = "", q != null && (H = q.replace(Bt, "$&/") + "/"), O(w, j, H, "", function(Oe) {
        return Oe;
      })) : w != null && (at(w) && (w = Kt(
        w,
        H + (w.key == null || p && p.key === w.key ? "" : ("" + w.key).replace(
          Bt,
          "$&/"
        ) + "/") + q
      )), j.push(w)), 1;
    q = 0;
    var he = B === "" ? "." : B + ":";
    if (qe(p))
      for (var L = 0; L < p.length; L++)
        B = p[L], K = he + mt(B, L), q += O(
          B,
          j,
          H,
          K,
          w
        );
    else if (L = P(p), typeof L == "function")
      for (p = L.call(p), L = 0; !(B = p.next()).done; )
        B = B.value, K = he + mt(B, L++), q += O(
          B,
          j,
          H,
          K,
          w
        );
    else if (K === "object") {
      if (typeof p.then == "function")
        return O(
          ut(p),
          j,
          H,
          B,
          w
        );
      throw j = String(p), Error(
        "Objects are not valid as a React child (found: " + (j === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : j) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return q;
  }
  function Z(p, j, H) {
    if (p == null) return p;
    var B = [], w = 0;
    return O(p, B, "", "", function(K) {
      return j.call(H, K, w++);
    }), B;
  }
  function V(p) {
    if (p._status === -1) {
      var j = p._result;
      j = j(), j.then(
        function(H) {
          (p._status === 0 || p._status === -1) && (p._status = 1, p._result = H);
        },
        function(H) {
          (p._status === 0 || p._status === -1) && (p._status = 2, p._result = H);
        }
      ), p._status === -1 && (p._status = 0, p._result = j);
    }
    if (p._status === 1) return p._result.default;
    throw p._result;
  }
  var oe = typeof reportError == "function" ? reportError : function(p) {
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
  }, ve = {
    map: Z,
    forEach: function(p, j, H) {
      Z(
        p,
        function() {
          j.apply(this, arguments);
        },
        H
      );
    },
    count: function(p) {
      var j = 0;
      return Z(p, function() {
        j++;
      }), j;
    },
    toArray: function(p) {
      return Z(p, function(j) {
        return j;
      }) || [];
    },
    only: function(p) {
      if (!at(p))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return p;
    }
  };
  return J.Activity = C, J.Children = ve, J.Component = re, J.Fragment = o, J.Profiler = d, J.PureComponent = de, J.StrictMode = r, J.Suspense = E, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = te, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(p) {
      return te.H.useMemoCache(p);
    }
  }, J.cache = function(p) {
    return function() {
      return p.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(p, j, H) {
    if (p == null)
      throw Error(
        "The argument must be a React element, but you passed " + p + "."
      );
    var B = Te({}, p.props), w = p.key;
    if (j != null)
      for (K in j.key !== void 0 && (w = "" + j.key), j)
        !Pe.call(j, K) || K === "key" || K === "__self" || K === "__source" || K === "ref" && j.ref === void 0 || (B[K] = j[K]);
    var K = arguments.length - 2;
    if (K === 1) B.children = H;
    else if (1 < K) {
      for (var q = Array(K), he = 0; he < K; he++)
        q[he] = arguments[he + 2];
      B.children = q;
    }
    return nt(p.type, w, B);
  }, J.createContext = function(p) {
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
  }, J.createElement = function(p, j, H) {
    var B, w = {}, K = null;
    if (j != null)
      for (B in j.key !== void 0 && (K = "" + j.key), j)
        Pe.call(j, B) && B !== "key" && B !== "__self" && B !== "__source" && (w[B] = j[B]);
    var q = arguments.length - 2;
    if (q === 1) w.children = H;
    else if (1 < q) {
      for (var he = Array(q), L = 0; L < q; L++)
        he[L] = arguments[L + 2];
      w.children = he;
    }
    if (p && p.defaultProps)
      for (B in q = p.defaultProps, q)
        w[B] === void 0 && (w[B] = q[B]);
    return nt(p, K, w);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(p) {
    return { $$typeof: A, render: p };
  }, J.isValidElement = at, J.lazy = function(p) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: p },
      _init: V
    };
  }, J.memo = function(p, j) {
    return {
      $$typeof: g,
      type: p,
      compare: j === void 0 ? null : j
    };
  }, J.startTransition = function(p) {
    var j = te.T, H = {};
    te.T = H;
    try {
      var B = p(), w = te.S;
      w !== null && w(H, B), typeof B == "object" && B !== null && typeof B.then == "function" && B.then(Ie, oe);
    } catch (K) {
      oe(K);
    } finally {
      j !== null && H.types !== null && (j.types = H.types), te.T = j;
    }
  }, J.unstable_useCacheRefresh = function() {
    return te.H.useCacheRefresh();
  }, J.use = function(p) {
    return te.H.use(p);
  }, J.useActionState = function(p, j, H) {
    return te.H.useActionState(p, j, H);
  }, J.useCallback = function(p, j) {
    return te.H.useCallback(p, j);
  }, J.useContext = function(p) {
    return te.H.useContext(p);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(p, j) {
    return te.H.useDeferredValue(p, j);
  }, J.useEffect = function(p, j) {
    return te.H.useEffect(p, j);
  }, J.useEffectEvent = function(p) {
    return te.H.useEffectEvent(p);
  }, J.useId = function() {
    return te.H.useId();
  }, J.useImperativeHandle = function(p, j, H) {
    return te.H.useImperativeHandle(p, j, H);
  }, J.useInsertionEffect = function(p, j) {
    return te.H.useInsertionEffect(p, j);
  }, J.useLayoutEffect = function(p, j) {
    return te.H.useLayoutEffect(p, j);
  }, J.useMemo = function(p, j) {
    return te.H.useMemo(p, j);
  }, J.useOptimistic = function(p, j) {
    return te.H.useOptimistic(p, j);
  }, J.useReducer = function(p, j, H) {
    return te.H.useReducer(p, j, H);
  }, J.useRef = function(p) {
    return te.H.useRef(p);
  }, J.useState = function(p) {
    return te.H.useState(p);
  }, J.useSyncExternalStore = function(p, j, H) {
    return te.H.useSyncExternalStore(
      p,
      j,
      H
    );
  }, J.useTransition = function() {
    return te.H.useTransition();
  }, J.version = "19.2.1", J;
}
var yh;
function tr() {
  return yh || (yh = 1, Vo.exports = kv()), Vo.exports;
}
var gh;
function Kv() {
  return gh || (gh = 1, Qo.exports = Vv()), Qo.exports;
}
var _ = Kv(), W = tr();
const nr = /* @__PURE__ */ $h(W);
var ko = { exports: {} }, Ka = {}, Ko = { exports: {} }, $o = {};
var ph;
function $v() {
  return ph || (ph = 1, (function(a) {
    function i(O, Z) {
      var V = O.length;
      O.push(Z);
      e: for (; 0 < V; ) {
        var oe = V - 1 >>> 1, ve = O[oe];
        if (0 < d(ve, Z))
          O[oe] = Z, O[V] = ve, V = oe;
        else break e;
      }
    }
    function o(O) {
      return O.length === 0 ? null : O[0];
    }
    function r(O) {
      if (O.length === 0) return null;
      var Z = O[0], V = O.pop();
      if (V !== Z) {
        O[0] = V;
        e: for (var oe = 0, ve = O.length, p = ve >>> 1; oe < p; ) {
          var j = 2 * (oe + 1) - 1, H = O[j], B = j + 1, w = O[B];
          if (0 > d(H, V))
            B < ve && 0 > d(w, H) ? (O[oe] = w, O[B] = V, oe = B) : (O[oe] = H, O[j] = V, oe = j);
          else if (B < ve && 0 > d(w, V))
            O[oe] = w, O[B] = V, oe = B;
          else break e;
        }
      }
      return Z;
    }
    function d(O, Z) {
      var V = O.sortIndex - Z.sortIndex;
      return V !== 0 ? V : O.id - Z.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, A = m.now();
      a.unstable_now = function() {
        return m.now() - A;
      };
    }
    var E = [], g = [], R = 1, C = null, G = 3, P = !1, ee = !1, Te = !1, ae = !1, re = typeof setTimeout == "function" ? setTimeout : null, tt = typeof clearTimeout == "function" ? clearTimeout : null, de = typeof setImmediate < "u" ? setImmediate : null;
    function ye(O) {
      for (var Z = o(g); Z !== null; ) {
        if (Z.callback === null) r(g);
        else if (Z.startTime <= O)
          r(g), Z.sortIndex = Z.expirationTime, i(E, Z);
        else break;
        Z = o(g);
      }
    }
    function qe(O) {
      if (Te = !1, ye(O), !ee)
        if (o(E) !== null)
          ee = !0, Ie || (Ie = !0, je());
        else {
          var Z = o(g);
          Z !== null && ut(qe, Z.startTime - O);
        }
    }
    var Ie = !1, te = -1, Pe = 5, nt = -1;
    function Kt() {
      return ae ? !0 : !(a.unstable_now() - nt < Pe);
    }
    function at() {
      if (ae = !1, Ie) {
        var O = a.unstable_now();
        nt = O;
        var Z = !0;
        try {
          e: {
            ee = !1, Te && (Te = !1, tt(te), te = -1), P = !0;
            var V = G;
            try {
              t: {
                for (ye(O), C = o(E); C !== null && !(C.expirationTime > O && Kt()); ) {
                  var oe = C.callback;
                  if (typeof oe == "function") {
                    C.callback = null, G = C.priorityLevel;
                    var ve = oe(
                      C.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof ve == "function") {
                      C.callback = ve, ye(O), Z = !0;
                      break t;
                    }
                    C === o(E) && r(E), ye(O);
                  } else r(E);
                  C = o(E);
                }
                if (C !== null) Z = !0;
                else {
                  var p = o(g);
                  p !== null && ut(
                    qe,
                    p.startTime - O
                  ), Z = !1;
                }
              }
              break e;
            } finally {
              C = null, G = V, P = !1;
            }
            Z = void 0;
          }
        } finally {
          Z ? je() : Ie = !1;
        }
      }
    }
    var je;
    if (typeof de == "function")
      je = function() {
        de(at);
      };
    else if (typeof MessageChannel < "u") {
      var Bt = new MessageChannel(), mt = Bt.port2;
      Bt.port1.onmessage = at, je = function() {
        mt.postMessage(null);
      };
    } else
      je = function() {
        re(at, 0);
      };
    function ut(O, Z) {
      te = re(function() {
        O(a.unstable_now());
      }, Z);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Pe = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return G;
    }, a.unstable_next = function(O) {
      switch (G) {
        case 1:
        case 2:
        case 3:
          var Z = 3;
          break;
        default:
          Z = G;
      }
      var V = G;
      G = Z;
      try {
        return O();
      } finally {
        G = V;
      }
    }, a.unstable_requestPaint = function() {
      ae = !0;
    }, a.unstable_runWithPriority = function(O, Z) {
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
      var V = G;
      G = O;
      try {
        return Z();
      } finally {
        G = V;
      }
    }, a.unstable_scheduleCallback = function(O, Z, V) {
      var oe = a.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? oe + V : oe) : V = oe, O) {
        case 1:
          var ve = -1;
          break;
        case 2:
          ve = 250;
          break;
        case 5:
          ve = 1073741823;
          break;
        case 4:
          ve = 1e4;
          break;
        default:
          ve = 5e3;
      }
      return ve = V + ve, O = {
        id: R++,
        callback: Z,
        priorityLevel: O,
        startTime: V,
        expirationTime: ve,
        sortIndex: -1
      }, V > oe ? (O.sortIndex = V, i(g, O), o(E) === null && O === o(g) && (Te ? (tt(te), te = -1) : Te = !0, ut(qe, V - oe))) : (O.sortIndex = ve, i(E, O), ee || P || (ee = !0, Ie || (Ie = !0, je()))), O;
    }, a.unstable_shouldYield = Kt, a.unstable_wrapCallback = function(O) {
      var Z = G;
      return function() {
        var V = G;
        G = Z;
        try {
          return O.apply(this, arguments);
        } finally {
          G = V;
        }
      };
    };
  })($o)), $o;
}
var bh;
function Jv() {
  return bh || (bh = 1, Ko.exports = $v()), Ko.exports;
}
var Jo = { exports: {} }, et = {};
var _h;
function Wv() {
  if (_h) return et;
  _h = 1;
  var a = tr();
  function i(E) {
    var g = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        g += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + E + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
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
  function h(E, g, R) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: d,
      key: C == null ? null : "" + C,
      children: E,
      containerInfo: g,
      implementation: R
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function A(E, g) {
    if (E === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return et.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, et.createPortal = function(E, g) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(i(299));
    return h(E, g, null, R);
  }, et.flushSync = function(E) {
    var g = m.T, R = r.p;
    try {
      if (m.T = null, r.p = 2, E) return E();
    } finally {
      m.T = g, r.p = R, r.d.f();
    }
  }, et.preconnect = function(E, g) {
    typeof E == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, r.d.C(E, g));
  }, et.prefetchDNS = function(E) {
    typeof E == "string" && r.d.D(E);
  }, et.preinit = function(E, g) {
    if (typeof E == "string" && g && typeof g.as == "string") {
      var R = g.as, C = A(R, g.crossOrigin), G = typeof g.integrity == "string" ? g.integrity : void 0, P = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      R === "style" ? r.d.S(
        E,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: C,
          integrity: G,
          fetchPriority: P
        }
      ) : R === "script" && r.d.X(E, {
        crossOrigin: C,
        integrity: G,
        fetchPriority: P,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, et.preinitModule = function(E, g) {
    if (typeof E == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var R = A(
            g.as,
            g.crossOrigin
          );
          r.d.M(E, {
            crossOrigin: R,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && r.d.M(E);
  }, et.preload = function(E, g) {
    if (typeof E == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var R = g.as, C = A(R, g.crossOrigin);
      r.d.L(E, R, {
        crossOrigin: C,
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
  }, et.preloadModule = function(E, g) {
    if (typeof E == "string")
      if (g) {
        var R = A(g.as, g.crossOrigin);
        r.d.m(E, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: R,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else r.d.m(E);
  }, et.requestFormReset = function(E) {
    r.d.r(E);
  }, et.unstable_batchedUpdates = function(E, g) {
    return E(g);
  }, et.useFormState = function(E, g, R) {
    return m.H.useFormState(E, g, R);
  }, et.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, et.version = "19.2.1", et;
}
var Sh;
function Fv() {
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
  return a(), Jo.exports = Wv(), Jo.exports;
}
var zh;
function Iv() {
  if (zh) return Ka;
  zh = 1;
  var a = Jv(), i = tr(), o = Fv();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
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
  function A(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function E(e) {
    if (h(e) !== e)
      throw Error(r(188));
  }
  function g(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(r(188));
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
          if (c === n) return E(u), e;
          if (c === l) return E(u), t;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== l.return) n = u, l = c;
      else {
        for (var f = !1, s = u.child; s; ) {
          if (s === n) {
            f = !0, n = u, l = c;
            break;
          }
          if (s === l) {
            f = !0, l = u, n = c;
            break;
          }
          s = s.sibling;
        }
        if (!f) {
          for (s = c.child; s; ) {
            if (s === n) {
              f = !0, n = c, l = u;
              break;
            }
            if (s === l) {
              f = !0, l = c, n = u;
              break;
            }
            s = s.sibling;
          }
          if (!f) throw Error(r(189));
        }
      }
      if (n.alternate !== l) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
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
  var C = Object.assign, G = Symbol.for("react.element"), P = Symbol.for("react.transitional.element"), ee = Symbol.for("react.portal"), Te = Symbol.for("react.fragment"), ae = Symbol.for("react.strict_mode"), re = Symbol.for("react.profiler"), tt = Symbol.for("react.consumer"), de = Symbol.for("react.context"), ye = Symbol.for("react.forward_ref"), qe = Symbol.for("react.suspense"), Ie = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), Pe = Symbol.for("react.lazy"), nt = Symbol.for("react.activity"), Kt = Symbol.for("react.memo_cache_sentinel"), at = Symbol.iterator;
  function je(e) {
    return e === null || typeof e != "object" ? null : (e = at && e[at] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Bt = Symbol.for("react.client.reference");
  function mt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Bt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Te:
        return "Fragment";
      case re:
        return "Profiler";
      case ae:
        return "StrictMode";
      case qe:
        return "Suspense";
      case Ie:
        return "SuspenseList";
      case nt:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ee:
          return "Portal";
        case de:
          return e.displayName || "Context";
        case tt:
          return (e._context.displayName || "Context") + ".Consumer";
        case ye:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case te:
          return t = e.displayName || null, t !== null ? t : mt(e.type) || "Memo";
        case Pe:
          t = e._payload, e = e._init;
          try {
            return mt(e(t));
          } catch {
          }
      }
    return null;
  }
  var ut = Array.isArray, O = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, oe = [], ve = -1;
  function p(e) {
    return { current: e };
  }
  function j(e) {
    0 > ve || (e.current = oe[ve], oe[ve] = null, ve--);
  }
  function H(e, t) {
    ve++, oe[ve] = e.current, e.current = t;
  }
  var B = p(null), w = p(null), K = p(null), q = p(null);
  function he(e, t) {
    switch (H(K, t), H(w, e), H(B, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Hd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Hd(t), e = qd(t, e);
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
    j(B), H(B, e);
  }
  function L() {
    j(B), j(w), j(K);
  }
  function Oe(e) {
    e.memoizedState !== null && H(q, e);
    var t = B.current, n = qd(t, e.type);
    t !== n && (H(w, e), H(B, n));
  }
  function vt(e) {
    w.current === e && (j(B), j(w)), q.current === e && (j(q), Xa._currentValue = V);
  }
  var Pl, ol;
  function Gn(e) {
    if (Pl === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Pl = t && t[1] || "", ol = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Pl + e + ol;
  }
  var xi = !1;
  function Oi(e, t) {
    if (!e || xi) return "";
    xi = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
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
                } catch (x) {
                  var T = x;
                }
                Reflect.construct(e, [], D);
              } else {
                try {
                  D.call();
                } catch (x) {
                  T = x;
                }
                e.call(D.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                T = x;
              }
              (D = e()) && typeof D.catch == "function" && D.catch(function() {
              });
            }
          } catch (x) {
            if (x && T && typeof x.stack == "string")
              return [x.stack, T.stack];
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
      var c = l.DetermineComponentFrameRoot(), f = c[0], s = c[1];
      if (f && s) {
        var v = f.split(`
`), z = s.split(`
`);
        for (u = l = 0; l < v.length && !v[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; u < z.length && !z[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (l === v.length || u === z.length)
          for (l = v.length - 1, u = z.length - 1; 1 <= l && 0 <= u && v[l] !== z[u]; )
            u--;
        for (; 1 <= l && 0 <= u; l--, u--)
          if (v[l] !== z[u]) {
            if (l !== 1 || u !== 1)
              do
                if (l--, u--, 0 > u || v[l] !== z[u]) {
                  var M = `
` + v[l].replace(" at new ", " at ");
                  return e.displayName && M.includes("<anonymous>") && (M = M.replace("<anonymous>", e.displayName)), M;
                }
              while (1 <= l && 0 <= u);
            break;
          }
      }
    } finally {
      xi = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Gn(n) : "";
  }
  function zm(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Gn(e.type);
      case 16:
        return Gn("Lazy");
      case 13:
        return e.child !== t && t !== null ? Gn("Suspense Fallback") : Gn("Suspense");
      case 19:
        return Gn("SuspenseList");
      case 0:
      case 15:
        return Oi(e.type, !1);
      case 11:
        return Oi(e.type.render, !1);
      case 1:
        return Oi(e.type, !0);
      case 31:
        return Gn("Activity");
      default:
        return "";
    }
  }
  function hr(e) {
    try {
      var t = "", n = null;
      do
        t += zm(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Mi = Object.prototype.hasOwnProperty, Ni = a.unstable_scheduleCallback, ji = a.unstable_cancelCallback, Em = a.unstable_shouldYield, Tm = a.unstable_requestPaint, yt = a.unstable_now, Am = a.unstable_getCurrentPriorityLevel, mr = a.unstable_ImmediatePriority, vr = a.unstable_UserBlockingPriority, Wa = a.unstable_NormalPriority, xm = a.unstable_LowPriority, yr = a.unstable_IdlePriority, Om = a.log, Mm = a.unstable_setDisableYieldValue, ea = null, gt = null;
  function hn(e) {
    if (typeof Om == "function" && Mm(e), gt && typeof gt.setStrictMode == "function")
      try {
        gt.setStrictMode(ea, e);
      } catch {
      }
  }
  var pt = Math.clz32 ? Math.clz32 : Dm, Nm = Math.log, jm = Math.LN2;
  function Dm(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Nm(e) / jm | 0) | 0;
  }
  var Fa = 256, Ia = 262144, Pa = 4194304;
  function Xn(e) {
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
  function eu(e, t, n) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var u = 0, c = e.suspendedLanes, f = e.pingedLanes;
    e = e.warmLanes;
    var s = l & 134217727;
    return s !== 0 ? (l = s & ~c, l !== 0 ? u = Xn(l) : (f &= s, f !== 0 ? u = Xn(f) : n || (n = s & ~e, n !== 0 && (u = Xn(n))))) : (s = l & ~c, s !== 0 ? u = Xn(s) : f !== 0 ? u = Xn(f) : n || (n = l & ~e, n !== 0 && (u = Xn(n)))), u === 0 ? 0 : t !== 0 && t !== u && (t & c) === 0 && (c = u & -u, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : u;
  }
  function ta(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Um(e, t) {
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
  function gr() {
    var e = Pa;
    return Pa <<= 1, (Pa & 62914560) === 0 && (Pa = 4194304), e;
  }
  function Di(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function na(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Cm(e, t, n, l, u, c) {
    var f = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var s = e.entanglements, v = e.expirationTimes, z = e.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var M = 31 - pt(n), D = 1 << M;
      s[M] = 0, v[M] = -1;
      var T = z[M];
      if (T !== null)
        for (z[M] = null, M = 0; M < T.length; M++) {
          var x = T[M];
          x !== null && (x.lane &= -536870913);
        }
      n &= ~D;
    }
    l !== 0 && pr(e, l, 0), c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t));
  }
  function pr(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - pt(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930;
  }
  function br(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var l = 31 - pt(n), u = 1 << l;
      u & t | e[l] & t && (e[l] |= t), n &= ~u;
    }
  }
  function _r(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Ui(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
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
  function Ci(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Sr() {
    var e = Z.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ch(e.type));
  }
  function zr(e, t) {
    var n = Z.p;
    try {
      return Z.p = e, t();
    } finally {
      Z.p = n;
    }
  }
  var mn = Math.random().toString(36).slice(2), Ke = "__reactFiber$" + mn, it = "__reactProps$" + mn, rl = "__reactContainer$" + mn, Zi = "__reactEvents$" + mn, Zm = "__reactListeners$" + mn, Rm = "__reactHandles$" + mn, Er = "__reactResources$" + mn, la = "__reactMarker$" + mn;
  function Ri(e) {
    delete e[Ke], delete e[it], delete e[Zi], delete e[Zm], delete e[Rm];
  }
  function fl(e) {
    var t = e[Ke];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[rl] || n[Ke]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Vd(e); e !== null; ) {
            if (n = e[Ke]) return n;
            e = Vd(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[Ke] || e[rl]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function aa(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function dl(e) {
    var t = e[Er];
    return t || (t = e[Er] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ve(e) {
    e[la] = !0;
  }
  var Tr = /* @__PURE__ */ new Set(), Ar = {};
  function Ln(e, t) {
    hl(e, t), hl(e + "Capture", t);
  }
  function hl(e, t) {
    for (Ar[e] = t, e = 0; e < t.length; e++)
      Tr.add(t[e]);
  }
  var wm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), xr = {}, Or = {};
  function Hm(e) {
    return Mi.call(Or, e) ? !0 : Mi.call(xr, e) ? !1 : wm.test(e) ? Or[e] = !0 : (xr[e] = !0, !1);
  }
  function tu(e, t, n) {
    if (Hm(t))
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
  function nu(e, t, n) {
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
  function $t(e, t, n, l) {
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
  function Mt(e) {
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
  function Mr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function qm(e, t, n) {
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
        set: function(f) {
          n = "" + f, c.call(this, f);
        }
      }), Object.defineProperty(e, t, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(f) {
          n = "" + f;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function wi(e) {
    if (!e._valueTracker) {
      var t = Mr(e) ? "checked" : "value";
      e._valueTracker = qm(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Nr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), l = "";
    return e && (l = Mr(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== n ? (t.setValue(e), !0) : !1;
  }
  function lu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Bm = /[\n"\\]/g;
  function Nt(e) {
    return e.replace(
      Bm,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hi(e, t, n, l, u, c, f, s) {
    e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Mt(t)) : e.value !== "" + Mt(t) && (e.value = "" + Mt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? qi(e, f, Mt(t)) : n != null ? qi(e, f, Mt(n)) : l != null && e.removeAttribute("value"), u == null && c != null && (e.defaultChecked = !!c), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Mt(s) : e.removeAttribute("name");
  }
  function jr(e, t, n, l, u, c, f, s) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        wi(e);
        return;
      }
      n = n != null ? "" + Mt(n) : "", t = t != null ? "" + Mt(t) : n, s || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = s ? e.checked : !!l, e.defaultChecked = !!l, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), wi(e);
  }
  function qi(e, t, n) {
    t === "number" && lu(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function ml(e, t, n, l) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < n.length; u++)
        t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        u = t.hasOwnProperty("$" + e[n].value), e[n].selected !== u && (e[n].selected = u), u && l && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Mt(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          e[u].selected = !0, l && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Dr(e, t, n) {
    if (t != null && (t = "" + Mt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Mt(n) : "";
  }
  function Ur(e, t, n, l) {
    if (t == null) {
      if (l != null) {
        if (n != null) throw Error(r(92));
        if (ut(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), t = n;
    }
    n = Mt(t), e.defaultValue = n, l = e.textContent, l === n && l !== "" && l !== null && (e.value = l), wi(e);
  }
  function vl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
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
  function Cr(e, t, n) {
    var l = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Ym.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Zr(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (e = e.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var u in t)
        l = t[u], t.hasOwnProperty(u) && n[u] !== l && Cr(e, u, l);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Cr(e, c, t[c]);
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
  function au(e) {
    return Xm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Jt() {
  }
  var Yi = null;
  function Gi(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var yl = null, gl = null;
  function Rr(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var n = e[it] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Hi(
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
              'input[name="' + Nt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var l = n[t];
              if (l !== e && l.form === e.form) {
                var u = l[it] || null;
                if (!u) throw Error(r(90));
                Hi(
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
              l = n[t], l.form === e.form && Nr(l);
          }
          break e;
        case "textarea":
          Dr(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ml(e, !!n.multiple, t, !1);
      }
    }
  }
  var Xi = !1;
  function wr(e, t, n) {
    if (Xi) return e(t, n);
    Xi = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (Xi = !1, (yl !== null || gl !== null) && (Vu(), yl && (t = yl, e = gl, gl = yl = null, Rr(t), e)))
        for (t = 0; t < e.length; t++) Rr(e[t]);
    }
  }
  function ua(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var l = n[it] || null;
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
        r(231, t, typeof n)
      );
    return n;
  }
  var Wt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Li = !1;
  if (Wt)
    try {
      var ia = {};
      Object.defineProperty(ia, "passive", {
        get: function() {
          Li = !0;
        }
      }), window.addEventListener("test", ia, ia), window.removeEventListener("test", ia, ia);
    } catch {
      Li = !1;
    }
  var vn = null, Qi = null, uu = null;
  function Hr() {
    if (uu) return uu;
    var e, t = Qi, n = t.length, l, u = "value" in vn ? vn.value : vn.textContent, c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++) ;
    var f = n - e;
    for (l = 1; l <= f && t[n - l] === u[c - l]; l++) ;
    return uu = u.slice(e, 1 < l ? 1 - l : void 0);
  }
  function iu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function cu() {
    return !0;
  }
  function qr() {
    return !1;
  }
  function ct(e) {
    function t(n, l, u, c, f) {
      this._reactName = n, this._targetInst = u, this.type = l, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var s in e)
        e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(c) : c[s]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? cu : qr, this.isPropagationStopped = qr, this;
    }
    return C(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = cu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = cu);
      },
      persist: function() {
      },
      isPersistent: cu
    }), t;
  }
  var Qn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ou = ct(Qn), ca = C({}, Qn, { view: 0, detail: 0 }), Lm = ct(ca), Vi, ki, oa, ru = C({}, ca, {
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
    getModifierState: $i,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== oa && (oa && e.type === "mousemove" ? (Vi = e.screenX - oa.screenX, ki = e.screenY - oa.screenY) : ki = Vi = 0, oa = e), Vi);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : ki;
    }
  }), Br = ct(ru), Qm = C({}, ru, { dataTransfer: 0 }), Vm = ct(Qm), km = C({}, ca, { relatedTarget: 0 }), Ki = ct(km), Km = C({}, Qn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), $m = ct(Km), Jm = C({}, Qn, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Wm = ct(Jm), Fm = C({}, Qn, { data: 0 }), Yr = ct(Fm), Im = {
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
  }, e0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function t0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = e0[e]) ? !!t[e] : !1;
  }
  function $i() {
    return t0;
  }
  var n0 = C({}, ca, {
    key: function(e) {
      if (e.key) {
        var t = Im[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = iu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pm[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: $i,
    charCode: function(e) {
      return e.type === "keypress" ? iu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? iu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), l0 = ct(n0), a0 = C({}, ru, {
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
  }), Gr = ct(a0), u0 = C({}, ca, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: $i
  }), i0 = ct(u0), c0 = C({}, Qn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), o0 = ct(c0), r0 = C({}, ru, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), f0 = ct(r0), s0 = C({}, Qn, {
    newState: 0,
    oldState: 0
  }), d0 = ct(s0), h0 = [9, 13, 27, 32], Ji = Wt && "CompositionEvent" in window, ra = null;
  Wt && "documentMode" in document && (ra = document.documentMode);
  var m0 = Wt && "TextEvent" in window && !ra, Xr = Wt && (!Ji || ra && 8 < ra && 11 >= ra), Lr = " ", Qr = !1;
  function Vr(e, t) {
    switch (e) {
      case "keyup":
        return h0.indexOf(t.keyCode) !== -1;
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
  function kr(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pl = !1;
  function v0(e, t) {
    switch (e) {
      case "compositionend":
        return kr(t);
      case "keypress":
        return t.which !== 32 ? null : (Qr = !0, Lr);
      case "textInput":
        return e = t.data, e === Lr && Qr ? null : e;
      default:
        return null;
    }
  }
  function y0(e, t) {
    if (pl)
      return e === "compositionend" || !Ji && Vr(e, t) ? (e = Hr(), uu = Qi = vn = null, pl = !1, e) : null;
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
        return Xr && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var g0 = {
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
  function Kr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!g0[e.type] : t === "textarea";
  }
  function $r(e, t, n, l) {
    yl ? gl ? gl.push(l) : gl = [l] : yl = l, t = Iu(t, "onChange"), 0 < t.length && (n = new ou(
      "onChange",
      "change",
      null,
      n,
      l
    ), e.push({ event: n, listeners: t }));
  }
  var fa = null, sa = null;
  function p0(e) {
    Dd(e, 0);
  }
  function fu(e) {
    var t = aa(e);
    if (Nr(t)) return e;
  }
  function Jr(e, t) {
    if (e === "change") return t;
  }
  var Wr = !1;
  if (Wt) {
    var Wi;
    if (Wt) {
      var Fi = "oninput" in document;
      if (!Fi) {
        var Fr = document.createElement("div");
        Fr.setAttribute("oninput", "return;"), Fi = typeof Fr.oninput == "function";
      }
      Wi = Fi;
    } else Wi = !1;
    Wr = Wi && (!document.documentMode || 9 < document.documentMode);
  }
  function Ir() {
    fa && (fa.detachEvent("onpropertychange", Pr), sa = fa = null);
  }
  function Pr(e) {
    if (e.propertyName === "value" && fu(sa)) {
      var t = [];
      $r(
        t,
        sa,
        e,
        Gi(e)
      ), wr(p0, t);
    }
  }
  function b0(e, t, n) {
    e === "focusin" ? (Ir(), fa = t, sa = n, fa.attachEvent("onpropertychange", Pr)) : e === "focusout" && Ir();
  }
  function _0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return fu(sa);
  }
  function S0(e, t) {
    if (e === "click") return fu(t);
  }
  function z0(e, t) {
    if (e === "input" || e === "change")
      return fu(t);
  }
  function E0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var bt = typeof Object.is == "function" ? Object.is : E0;
  function da(e, t) {
    if (bt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), l = Object.keys(t);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var u = n[l];
      if (!Mi.call(t, u) || !bt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function ef(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function tf(e, t) {
    var n = ef(e);
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
      n = ef(n);
    }
  }
  function nf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? nf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function lf(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = lu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = lu(e.document);
    }
    return t;
  }
  function Ii(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var T0 = Wt && "documentMode" in document && 11 >= document.documentMode, bl = null, Pi = null, ha = null, ec = !1;
  function af(e, t, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    ec || bl == null || bl !== lu(l) || (l = bl, "selectionStart" in l && Ii(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), ha && da(ha, l) || (ha = l, l = Iu(Pi, "onSelect"), 0 < l.length && (t = new ou(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: l }), t.target = bl)));
  }
  function Vn(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var _l = {
    animationend: Vn("Animation", "AnimationEnd"),
    animationiteration: Vn("Animation", "AnimationIteration"),
    animationstart: Vn("Animation", "AnimationStart"),
    transitionrun: Vn("Transition", "TransitionRun"),
    transitionstart: Vn("Transition", "TransitionStart"),
    transitioncancel: Vn("Transition", "TransitionCancel"),
    transitionend: Vn("Transition", "TransitionEnd")
  }, tc = {}, uf = {};
  Wt && (uf = document.createElement("div").style, "AnimationEvent" in window || (delete _l.animationend.animation, delete _l.animationiteration.animation, delete _l.animationstart.animation), "TransitionEvent" in window || delete _l.transitionend.transition);
  function kn(e) {
    if (tc[e]) return tc[e];
    if (!_l[e]) return e;
    var t = _l[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in uf)
        return tc[e] = t[n];
    return e;
  }
  var cf = kn("animationend"), of = kn("animationiteration"), rf = kn("animationstart"), A0 = kn("transitionrun"), x0 = kn("transitionstart"), O0 = kn("transitioncancel"), ff = kn("transitionend"), sf = /* @__PURE__ */ new Map(), nc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  nc.push("scrollEnd");
  function Yt(e, t) {
    sf.set(e, t), Ln(t, [e]);
  }
  var su = typeof reportError == "function" ? reportError : function(e) {
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
  }, jt = [], Sl = 0, lc = 0;
  function du() {
    for (var e = Sl, t = lc = Sl = 0; t < e; ) {
      var n = jt[t];
      jt[t++] = null;
      var l = jt[t];
      jt[t++] = null;
      var u = jt[t];
      jt[t++] = null;
      var c = jt[t];
      if (jt[t++] = null, l !== null && u !== null) {
        var f = l.pending;
        f === null ? u.next = u : (u.next = f.next, f.next = u), l.pending = u;
      }
      c !== 0 && df(n, u, c);
    }
  }
  function hu(e, t, n, l) {
    jt[Sl++] = e, jt[Sl++] = t, jt[Sl++] = n, jt[Sl++] = l, lc |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function ac(e, t, n, l) {
    return hu(e, t, n, l), mu(e);
  }
  function Kn(e, t) {
    return hu(e, null, null, t), mu(e);
  }
  function df(e, t, n) {
    e.lanes |= n;
    var l = e.alternate;
    l !== null && (l.lanes |= n);
    for (var u = !1, c = e.return; c !== null; )
      c.childLanes |= n, l = c.alternate, l !== null && (l.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (u = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, u && t !== null && (u = 31 - pt(n), e = c.hiddenUpdates, l = e[u], l === null ? e[u] = [t] : l.push(t), t.lane = n | 536870912), c) : null;
  }
  function mu(e) {
    if (50 < Ra)
      throw Ra = 0, mo = null, Error(r(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var zl = {};
  function M0(e, t, n, l) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _t(e, t, n, l) {
    return new M0(e, t, n, l);
  }
  function uc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ft(e, t) {
    var n = e.alternate;
    return n === null ? (n = _t(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function hf(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function vu(e, t, n, l, u, c) {
    var f = 0;
    if (l = e, typeof e == "function") uc(e) && (f = 1);
    else if (typeof e == "string")
      f = Cv(
        e,
        n,
        B.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case nt:
          return e = _t(31, n, t, u), e.elementType = nt, e.lanes = c, e;
        case Te:
          return $n(n.children, u, c, t);
        case ae:
          f = 8, u |= 24;
          break;
        case re:
          return e = _t(12, n, t, u | 2), e.elementType = re, e.lanes = c, e;
        case qe:
          return e = _t(13, n, t, u), e.elementType = qe, e.lanes = c, e;
        case Ie:
          return e = _t(19, n, t, u), e.elementType = Ie, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case de:
                f = 10;
                break e;
              case tt:
                f = 9;
                break e;
              case ye:
                f = 11;
                break e;
              case te:
                f = 14;
                break e;
              case Pe:
                f = 16, l = null;
                break e;
            }
          f = 29, n = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = _t(f, n, t, u), t.elementType = e, t.type = l, t.lanes = c, t;
  }
  function $n(e, t, n, l) {
    return e = _t(7, e, l, t), e.lanes = n, e;
  }
  function ic(e, t, n) {
    return e = _t(6, e, null, t), e.lanes = n, e;
  }
  function mf(e) {
    var t = _t(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function cc(e, t, n) {
    return t = _t(
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
  var vf = /* @__PURE__ */ new WeakMap();
  function Dt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = vf.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: hr(t)
      }, vf.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: hr(t)
    };
  }
  var El = [], Tl = 0, yu = null, ma = 0, Ut = [], Ct = 0, yn = null, Lt = 1, Qt = "";
  function It(e, t) {
    El[Tl++] = ma, El[Tl++] = yu, yu = e, ma = t;
  }
  function yf(e, t, n) {
    Ut[Ct++] = Lt, Ut[Ct++] = Qt, Ut[Ct++] = yn, yn = e;
    var l = Lt;
    e = Qt;
    var u = 32 - pt(l) - 1;
    l &= ~(1 << u), n += 1;
    var c = 32 - pt(t) + u;
    if (30 < c) {
      var f = u - u % 5;
      c = (l & (1 << f) - 1).toString(32), l >>= f, u -= f, Lt = 1 << 32 - pt(t) + u | n << u | l, Qt = c + e;
    } else
      Lt = 1 << c | n << u | l, Qt = e;
  }
  function oc(e) {
    e.return !== null && (It(e, 1), yf(e, 1, 0));
  }
  function rc(e) {
    for (; e === yu; )
      yu = El[--Tl], El[Tl] = null, ma = El[--Tl], El[Tl] = null;
    for (; e === yn; )
      yn = Ut[--Ct], Ut[Ct] = null, Qt = Ut[--Ct], Ut[Ct] = null, Lt = Ut[--Ct], Ut[Ct] = null;
  }
  function gf(e, t) {
    Ut[Ct++] = Lt, Ut[Ct++] = Qt, Ut[Ct++] = yn, Lt = t.id, Qt = t.overflow, yn = e;
  }
  var $e = null, Ae = null, ce = !1, gn = null, Zt = !1, fc = Error(r(519));
  function pn(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw va(Dt(t, e)), fc;
  }
  function pf(e) {
    var t = e.stateNode, n = e.type, l = e.memoizedProps;
    switch (t[Ke] = e, t[it] = l, n) {
      case "dialog":
        le("cancel", t), le("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        le("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ha.length; n++)
          le(Ha[n], t);
        break;
      case "source":
        le("error", t);
        break;
      case "img":
      case "image":
      case "link":
        le("error", t), le("load", t);
        break;
      case "details":
        le("toggle", t);
        break;
      case "input":
        le("invalid", t), jr(
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
        le("invalid", t);
        break;
      case "textarea":
        le("invalid", t), Ur(t, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || Rd(t.textContent, n) ? (l.popover != null && (le("beforetoggle", t), le("toggle", t)), l.onScroll != null && le("scroll", t), l.onScrollEnd != null && le("scrollend", t), l.onClick != null && (t.onclick = Jt), t = !0) : t = !1, t || pn(e, !0);
  }
  function bf(e) {
    for ($e = e.return; $e; )
      switch ($e.tag) {
        case 5:
        case 31:
        case 13:
          Zt = !1;
          return;
        case 27:
        case 3:
          Zt = !0;
          return;
        default:
          $e = $e.return;
      }
  }
  function Al(e) {
    if (e !== $e) return !1;
    if (!ce) return bf(e), ce = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || No(e.type, e.memoizedProps)), n = !n), n && Ae && pn(e), bf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Ae = Qd(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      Ae = Qd(e);
    } else
      t === 27 ? (t = Ae, Un(e.type) ? (e = Zo, Zo = null, Ae = e) : Ae = t) : Ae = $e ? wt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Jn() {
    Ae = $e = null, ce = !1;
  }
  function sc() {
    var e = gn;
    return e !== null && (st === null ? st = e : st.push.apply(
      st,
      e
    ), gn = null), e;
  }
  function va(e) {
    gn === null ? gn = [e] : gn.push(e);
  }
  var dc = p(null), Wn = null, Pt = null;
  function bn(e, t, n) {
    H(dc, t._currentValue), t._currentValue = n;
  }
  function en(e) {
    e._currentValue = dc.current, j(dc);
  }
  function hc(e, t, n) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function mc(e, t, n, l) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var c = u.dependencies;
      if (c !== null) {
        var f = u.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var s = c;
          c = u;
          for (var v = 0; v < t.length; v++)
            if (s.context === t[v]) {
              c.lanes |= n, s = c.alternate, s !== null && (s.lanes |= n), hc(
                c.return,
                n,
                e
              ), l || (f = null);
              break e;
            }
          c = s.next;
        }
      } else if (u.tag === 18) {
        if (f = u.return, f === null) throw Error(r(341));
        f.lanes |= n, c = f.alternate, c !== null && (c.lanes |= n), hc(f, n, e), f = null;
      } else f = u.child;
      if (f !== null) f.return = u;
      else
        for (f = u; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (u = f.sibling, u !== null) {
            u.return = f.return, f = u;
            break;
          }
          f = f.return;
        }
      u = f;
    }
  }
  function xl(e, t, n, l) {
    e = null;
    for (var u = t, c = !1; u !== null; ) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var f = u.alternate;
        if (f === null) throw Error(r(387));
        if (f = f.memoizedProps, f !== null) {
          var s = u.type;
          bt(u.pendingProps.value, f.value) || (e !== null ? e.push(s) : e = [s]);
        }
      } else if (u === q.current) {
        if (f = u.alternate, f === null) throw Error(r(387));
        f.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(Xa) : e = [Xa]);
      }
      u = u.return;
    }
    e !== null && mc(
      t,
      e,
      n,
      l
    ), t.flags |= 262144;
  }
  function gu(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!bt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Fn(e) {
    Wn = e, Pt = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Je(e) {
    return _f(Wn, e);
  }
  function pu(e, t) {
    return Wn === null && Fn(e), _f(e, t);
  }
  function _f(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Pt === null) {
      if (e === null) throw Error(r(308));
      Pt = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Pt = Pt.next = t;
    return n;
  }
  var N0 = typeof AbortController < "u" ? AbortController : function() {
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
  }, j0 = a.unstable_scheduleCallback, D0 = a.unstable_NormalPriority, Be = {
    $$typeof: de,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function vc() {
    return {
      controller: new N0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function ya(e) {
    e.refCount--, e.refCount === 0 && j0(D0, function() {
      e.controller.abort();
    });
  }
  var ga = null, yc = 0, Ol = 0, Ml = null;
  function U0(e, t) {
    if (ga === null) {
      var n = ga = [];
      yc = 0, Ol = _o(), Ml = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return yc++, t.then(Sf, Sf), t;
  }
  function Sf() {
    if (--yc === 0 && ga !== null) {
      Ml !== null && (Ml.status = "fulfilled");
      var e = ga;
      ga = null, Ol = 0, Ml = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function C0(e, t) {
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
  var zf = O.S;
  O.S = function(e, t) {
    ud = yt(), typeof t == "object" && t !== null && typeof t.then == "function" && U0(e, t), zf !== null && zf(e, t);
  };
  var In = p(null);
  function gc() {
    var e = In.current;
    return e !== null ? e : ze.pooledCache;
  }
  function bu(e, t) {
    t === null ? H(In, In.current) : H(In, t.pool);
  }
  function Ef() {
    var e = gc();
    return e === null ? null : { parent: Be._currentValue, pool: e };
  }
  var Nl = Error(r(460)), pc = Error(r(474)), _u = Error(r(542)), Su = { then: function() {
  } };
  function Tf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Af(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Jt, Jt), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Of(e), e;
      default:
        if (typeof t.status == "string") t.then(Jt, Jt);
        else {
          if (e = ze, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
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
            throw e = t.reason, Of(e), e;
        }
        throw el = t, Nl;
    }
  }
  function Pn(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (el = n, Nl) : n;
    }
  }
  var el = null;
  function xf() {
    if (el === null) throw Error(r(459));
    var e = el;
    return el = null, e;
  }
  function Of(e) {
    if (e === Nl || e === _u)
      throw Error(r(483));
  }
  var jl = null, pa = 0;
  function zu(e) {
    var t = pa;
    return pa += 1, jl === null && (jl = []), Af(jl, e, t);
  }
  function ba(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Eu(e, t) {
    throw t.$$typeof === G ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Mf(e) {
    function t(b, y) {
      if (e) {
        var S = b.deletions;
        S === null ? (b.deletions = [y], b.flags |= 16) : S.push(y);
      }
    }
    function n(b, y) {
      if (!e) return null;
      for (; y !== null; )
        t(b, y), y = y.sibling;
      return null;
    }
    function l(b) {
      for (var y = /* @__PURE__ */ new Map(); b !== null; )
        b.key !== null ? y.set(b.key, b) : y.set(b.index, b), b = b.sibling;
      return y;
    }
    function u(b, y) {
      return b = Ft(b, y), b.index = 0, b.sibling = null, b;
    }
    function c(b, y, S) {
      return b.index = S, e ? (S = b.alternate, S !== null ? (S = S.index, S < y ? (b.flags |= 67108866, y) : S) : (b.flags |= 67108866, y)) : (b.flags |= 1048576, y);
    }
    function f(b) {
      return e && b.alternate === null && (b.flags |= 67108866), b;
    }
    function s(b, y, S, N) {
      return y === null || y.tag !== 6 ? (y = ic(S, b.mode, N), y.return = b, y) : (y = u(y, S), y.return = b, y);
    }
    function v(b, y, S, N) {
      var Q = S.type;
      return Q === Te ? M(
        b,
        y,
        S.props.children,
        N,
        S.key
      ) : y !== null && (y.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Pe && Pn(Q) === y.type) ? (y = u(y, S.props), ba(y, S), y.return = b, y) : (y = vu(
        S.type,
        S.key,
        S.props,
        null,
        b.mode,
        N
      ), ba(y, S), y.return = b, y);
    }
    function z(b, y, S, N) {
      return y === null || y.tag !== 4 || y.stateNode.containerInfo !== S.containerInfo || y.stateNode.implementation !== S.implementation ? (y = cc(S, b.mode, N), y.return = b, y) : (y = u(y, S.children || []), y.return = b, y);
    }
    function M(b, y, S, N, Q) {
      return y === null || y.tag !== 7 ? (y = $n(
        S,
        b.mode,
        N,
        Q
      ), y.return = b, y) : (y = u(y, S), y.return = b, y);
    }
    function D(b, y, S) {
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return y = ic(
          "" + y,
          b.mode,
          S
        ), y.return = b, y;
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case P:
            return S = vu(
              y.type,
              y.key,
              y.props,
              null,
              b.mode,
              S
            ), ba(S, y), S.return = b, S;
          case ee:
            return y = cc(
              y,
              b.mode,
              S
            ), y.return = b, y;
          case Pe:
            return y = Pn(y), D(b, y, S);
        }
        if (ut(y) || je(y))
          return y = $n(
            y,
            b.mode,
            S,
            null
          ), y.return = b, y;
        if (typeof y.then == "function")
          return D(b, zu(y), S);
        if (y.$$typeof === de)
          return D(
            b,
            pu(b, y),
            S
          );
        Eu(b, y);
      }
      return null;
    }
    function T(b, y, S, N) {
      var Q = y !== null ? y.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return Q !== null ? null : s(b, y, "" + S, N);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case P:
            return S.key === Q ? v(b, y, S, N) : null;
          case ee:
            return S.key === Q ? z(b, y, S, N) : null;
          case Pe:
            return S = Pn(S), T(b, y, S, N);
        }
        if (ut(S) || je(S))
          return Q !== null ? null : M(b, y, S, N, null);
        if (typeof S.then == "function")
          return T(
            b,
            y,
            zu(S),
            N
          );
        if (S.$$typeof === de)
          return T(
            b,
            y,
            pu(b, S),
            N
          );
        Eu(b, S);
      }
      return null;
    }
    function x(b, y, S, N, Q) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return b = b.get(S) || null, s(y, b, "" + N, Q);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case P:
            return b = b.get(
              N.key === null ? S : N.key
            ) || null, v(y, b, N, Q);
          case ee:
            return b = b.get(
              N.key === null ? S : N.key
            ) || null, z(y, b, N, Q);
          case Pe:
            return N = Pn(N), x(
              b,
              y,
              S,
              N,
              Q
            );
        }
        if (ut(N) || je(N))
          return b = b.get(S) || null, M(y, b, N, Q, null);
        if (typeof N.then == "function")
          return x(
            b,
            y,
            S,
            zu(N),
            Q
          );
        if (N.$$typeof === de)
          return x(
            b,
            y,
            S,
            pu(y, N),
            Q
          );
        Eu(y, N);
      }
      return null;
    }
    function Y(b, y, S, N) {
      for (var Q = null, fe = null, X = y, I = y = 0, ie = null; X !== null && I < S.length; I++) {
        X.index > I ? (ie = X, X = null) : ie = X.sibling;
        var se = T(
          b,
          X,
          S[I],
          N
        );
        if (se === null) {
          X === null && (X = ie);
          break;
        }
        e && X && se.alternate === null && t(b, X), y = c(se, y, I), fe === null ? Q = se : fe.sibling = se, fe = se, X = ie;
      }
      if (I === S.length)
        return n(b, X), ce && It(b, I), Q;
      if (X === null) {
        for (; I < S.length; I++)
          X = D(b, S[I], N), X !== null && (y = c(
            X,
            y,
            I
          ), fe === null ? Q = X : fe.sibling = X, fe = X);
        return ce && It(b, I), Q;
      }
      for (X = l(X); I < S.length; I++)
        ie = x(
          X,
          b,
          I,
          S[I],
          N
        ), ie !== null && (e && ie.alternate !== null && X.delete(
          ie.key === null ? I : ie.key
        ), y = c(
          ie,
          y,
          I
        ), fe === null ? Q = ie : fe.sibling = ie, fe = ie);
      return e && X.forEach(function(Hn) {
        return t(b, Hn);
      }), ce && It(b, I), Q;
    }
    function $(b, y, S, N) {
      if (S == null) throw Error(r(151));
      for (var Q = null, fe = null, X = y, I = y = 0, ie = null, se = S.next(); X !== null && !se.done; I++, se = S.next()) {
        X.index > I ? (ie = X, X = null) : ie = X.sibling;
        var Hn = T(b, X, se.value, N);
        if (Hn === null) {
          X === null && (X = ie);
          break;
        }
        e && X && Hn.alternate === null && t(b, X), y = c(Hn, y, I), fe === null ? Q = Hn : fe.sibling = Hn, fe = Hn, X = ie;
      }
      if (se.done)
        return n(b, X), ce && It(b, I), Q;
      if (X === null) {
        for (; !se.done; I++, se = S.next())
          se = D(b, se.value, N), se !== null && (y = c(se, y, I), fe === null ? Q = se : fe.sibling = se, fe = se);
        return ce && It(b, I), Q;
      }
      for (X = l(X); !se.done; I++, se = S.next())
        se = x(X, b, I, se.value, N), se !== null && (e && se.alternate !== null && X.delete(se.key === null ? I : se.key), y = c(se, y, I), fe === null ? Q = se : fe.sibling = se, fe = se);
      return e && X.forEach(function(Qv) {
        return t(b, Qv);
      }), ce && It(b, I), Q;
    }
    function Se(b, y, S, N) {
      if (typeof S == "object" && S !== null && S.type === Te && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case P:
            e: {
              for (var Q = S.key; y !== null; ) {
                if (y.key === Q) {
                  if (Q = S.type, Q === Te) {
                    if (y.tag === 7) {
                      n(
                        b,
                        y.sibling
                      ), N = u(
                        y,
                        S.props.children
                      ), N.return = b, b = N;
                      break e;
                    }
                  } else if (y.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Pe && Pn(Q) === y.type) {
                    n(
                      b,
                      y.sibling
                    ), N = u(y, S.props), ba(N, S), N.return = b, b = N;
                    break e;
                  }
                  n(b, y);
                  break;
                } else t(b, y);
                y = y.sibling;
              }
              S.type === Te ? (N = $n(
                S.props.children,
                b.mode,
                N,
                S.key
              ), N.return = b, b = N) : (N = vu(
                S.type,
                S.key,
                S.props,
                null,
                b.mode,
                N
              ), ba(N, S), N.return = b, b = N);
            }
            return f(b);
          case ee:
            e: {
              for (Q = S.key; y !== null; ) {
                if (y.key === Q)
                  if (y.tag === 4 && y.stateNode.containerInfo === S.containerInfo && y.stateNode.implementation === S.implementation) {
                    n(
                      b,
                      y.sibling
                    ), N = u(y, S.children || []), N.return = b, b = N;
                    break e;
                  } else {
                    n(b, y);
                    break;
                  }
                else t(b, y);
                y = y.sibling;
              }
              N = cc(S, b.mode, N), N.return = b, b = N;
            }
            return f(b);
          case Pe:
            return S = Pn(S), Se(
              b,
              y,
              S,
              N
            );
        }
        if (ut(S))
          return Y(
            b,
            y,
            S,
            N
          );
        if (je(S)) {
          if (Q = je(S), typeof Q != "function") throw Error(r(150));
          return S = Q.call(S), $(
            b,
            y,
            S,
            N
          );
        }
        if (typeof S.then == "function")
          return Se(
            b,
            y,
            zu(S),
            N
          );
        if (S.$$typeof === de)
          return Se(
            b,
            y,
            pu(b, S),
            N
          );
        Eu(b, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, y !== null && y.tag === 6 ? (n(b, y.sibling), N = u(y, S), N.return = b, b = N) : (n(b, y), N = ic(S, b.mode, N), N.return = b, b = N), f(b)) : n(b, y);
    }
    return function(b, y, S, N) {
      try {
        pa = 0;
        var Q = Se(
          b,
          y,
          S,
          N
        );
        return jl = null, Q;
      } catch (X) {
        if (X === Nl || X === _u) throw X;
        var fe = _t(29, X, null, b.mode);
        return fe.lanes = N, fe.return = b, fe;
      } finally {
      }
    };
  }
  var tl = Mf(!0), Nf = Mf(!1), _n = !1;
  function bc(e) {
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
  function Sn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function zn(e, t, n) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (me & 2) !== 0) {
      var u = l.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), l.pending = t, t = mu(e), df(e, null, n), t;
    }
    return hu(e, l, t, n), mu(e);
  }
  function _a(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, br(e, n);
    }
  }
  function Sc(e, t) {
    var n = e.updateQueue, l = e.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var u = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? u = c = f : c = c.next = f, n = n.next;
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
  var zc = !1;
  function Sa() {
    if (zc) {
      var e = Ml;
      if (e !== null) throw e;
    }
  }
  function za(e, t, n, l) {
    zc = !1;
    var u = e.updateQueue;
    _n = !1;
    var c = u.firstBaseUpdate, f = u.lastBaseUpdate, s = u.shared.pending;
    if (s !== null) {
      u.shared.pending = null;
      var v = s, z = v.next;
      v.next = null, f === null ? c = z : f.next = z, f = v;
      var M = e.alternate;
      M !== null && (M = M.updateQueue, s = M.lastBaseUpdate, s !== f && (s === null ? M.firstBaseUpdate = z : s.next = z, M.lastBaseUpdate = v));
    }
    if (c !== null) {
      var D = u.baseState;
      f = 0, M = z = v = null, s = c;
      do {
        var T = s.lane & -536870913, x = T !== s.lane;
        if (x ? (ue & T) === T : (l & T) === T) {
          T !== 0 && T === Ol && (zc = !0), M !== null && (M = M.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          e: {
            var Y = e, $ = s;
            T = t;
            var Se = n;
            switch ($.tag) {
              case 1:
                if (Y = $.payload, typeof Y == "function") {
                  D = Y.call(Se, D, T);
                  break e;
                }
                D = Y;
                break e;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = $.payload, T = typeof Y == "function" ? Y.call(Se, D, T) : Y, T == null) break e;
                D = C({}, D, T);
                break e;
              case 2:
                _n = !0;
            }
          }
          T = s.callback, T !== null && (e.flags |= 64, x && (e.flags |= 8192), x = u.callbacks, x === null ? u.callbacks = [T] : x.push(T));
        } else
          x = {
            lane: T,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, M === null ? (z = M = x, v = D) : M = M.next = x, f |= T;
        if (s = s.next, s === null) {
          if (s = u.shared.pending, s === null)
            break;
          x = s, s = x.next, x.next = null, u.lastBaseUpdate = x, u.shared.pending = null;
        }
      } while (!0);
      M === null && (v = D), u.baseState = v, u.firstBaseUpdate = z, u.lastBaseUpdate = M, c === null && (u.shared.lanes = 0), On |= f, e.lanes = f, e.memoizedState = D;
    }
  }
  function jf(e, t) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(t);
  }
  function Df(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        jf(n[e], t);
  }
  var Dl = p(null), Tu = p(0);
  function Uf(e, t) {
    e = fn, H(Tu, e), H(Dl, t), fn = e | t.baseLanes;
  }
  function Ec() {
    H(Tu, fn), H(Dl, Dl.current);
  }
  function Tc() {
    fn = Tu.current, j(Dl), j(Tu);
  }
  var St = p(null), Rt = null;
  function En(e) {
    var t = e.alternate;
    H(Re, Re.current & 1), H(St, e), Rt === null && (t === null || Dl.current !== null || t.memoizedState !== null) && (Rt = e);
  }
  function Ac(e) {
    H(Re, Re.current), H(St, e), Rt === null && (Rt = e);
  }
  function Cf(e) {
    e.tag === 22 ? (H(Re, Re.current), H(St, e), Rt === null && (Rt = e)) : Tn();
  }
  function Tn() {
    H(Re, Re.current), H(St, St.current);
  }
  function zt(e) {
    j(St), Rt === e && (Rt = null), j(Re);
  }
  var Re = p(0);
  function Au(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Uo(n) || Co(n)))
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
  var tn = 0, F = null, be = null, Ye = null, xu = !1, Ul = !1, nl = !1, Ou = 0, Ea = 0, Cl = null, Z0 = 0;
  function Ce() {
    throw Error(r(321));
  }
  function xc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!bt(e[n], t[n])) return !1;
    return !0;
  }
  function Oc(e, t, n, l, u, c) {
    return tn = c, F = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? ys : Xc, nl = !1, c = n(l, u), nl = !1, Ul && (c = Rf(
      t,
      n,
      l,
      u
    )), Zf(e), c;
  }
  function Zf(e) {
    O.H = xa;
    var t = be !== null && be.next !== null;
    if (tn = 0, Ye = be = F = null, xu = !1, Ea = 0, Cl = null, t) throw Error(r(300));
    e === null || Ge || (e = e.dependencies, e !== null && gu(e) && (Ge = !0));
  }
  function Rf(e, t, n, l) {
    F = e;
    var u = 0;
    do {
      if (Ul && (Cl = null), Ea = 0, Ul = !1, 25 <= u) throw Error(r(301));
      if (u += 1, Ye = be = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      O.H = gs, c = t(n, l);
    } while (Ul);
    return c;
  }
  function R0() {
    var e = O.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Ta(t) : t, e = e.useState()[0], (be !== null ? be.memoizedState : null) !== e && (F.flags |= 1024), t;
  }
  function Mc() {
    var e = Ou !== 0;
    return Ou = 0, e;
  }
  function Nc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function jc(e) {
    if (xu) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      xu = !1;
    }
    tn = 0, Ye = be = F = null, Ul = !1, Ea = Ou = 0, Cl = null;
  }
  function lt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Ye === null ? F.memoizedState = Ye = e : Ye = Ye.next = e, Ye;
  }
  function we() {
    if (be === null) {
      var e = F.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = be.next;
    var t = Ye === null ? F.memoizedState : Ye.next;
    if (t !== null)
      Ye = t, be = e;
    else {
      if (e === null)
        throw F.alternate === null ? Error(r(467)) : Error(r(310));
      be = e, e = {
        memoizedState: be.memoizedState,
        baseState: be.baseState,
        baseQueue: be.baseQueue,
        queue: be.queue,
        next: null
      }, Ye === null ? F.memoizedState = Ye = e : Ye = Ye.next = e;
    }
    return Ye;
  }
  function Mu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ta(e) {
    var t = Ea;
    return Ea += 1, Cl === null && (Cl = []), e = Af(Cl, e, t), t = F, (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? ys : Xc), e;
  }
  function Nu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Ta(e);
      if (e.$$typeof === de) return Je(e);
    }
    throw Error(r(438, String(e)));
  }
  function Dc(e) {
    var t = null, n = F.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var l = F.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Mu(), F.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), l = 0; l < e; l++)
        n[l] = Kt;
    return t.index++, n;
  }
  function nn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ju(e) {
    var t = we();
    return Uc(t, be, e);
  }
  function Uc(e, t, n) {
    var l = e.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = n;
    var u = e.baseQueue, c = l.pending;
    if (c !== null) {
      if (u !== null) {
        var f = u.next;
        u.next = c.next, c.next = f;
      }
      t.baseQueue = u = c, l.pending = null;
    }
    if (c = e.baseState, u === null) e.memoizedState = c;
    else {
      t = u.next;
      var s = f = null, v = null, z = t, M = !1;
      do {
        var D = z.lane & -536870913;
        if (D !== z.lane ? (ue & D) === D : (tn & D) === D) {
          var T = z.revertLane;
          if (T === 0)
            v !== null && (v = v.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }), D === Ol && (M = !0);
          else if ((tn & T) === T) {
            z = z.next, T === Ol && (M = !0);
            continue;
          } else
            D = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, v === null ? (s = v = D, f = c) : v = v.next = D, F.lanes |= T, On |= T;
          D = z.action, nl && n(c, D), c = z.hasEagerState ? z.eagerState : n(c, D);
        } else
          T = {
            lane: D,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, v === null ? (s = v = T, f = c) : v = v.next = T, F.lanes |= D, On |= D;
        z = z.next;
      } while (z !== null && z !== t);
      if (v === null ? f = c : v.next = s, !bt(c, e.memoizedState) && (Ge = !0, M && (n = Ml, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = f, e.baseQueue = v, l.lastRenderedState = c;
    }
    return u === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Cc(e) {
    var t = we(), n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var l = n.dispatch, u = n.pending, c = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var f = u = u.next;
      do
        c = e(c, f.action), f = f.next;
      while (f !== u);
      bt(c, t.memoizedState) || (Ge = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, l];
  }
  function wf(e, t, n) {
    var l = F, u = we(), c = ce;
    if (c) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var f = !bt(
      (be || u).memoizedState,
      n
    );
    if (f && (u.memoizedState = n, Ge = !0), u = u.queue, wc(Bf.bind(null, l, u, e), [
      e
    ]), u.getSnapshot !== t || f || Ye !== null && Ye.memoizedState.tag & 1) {
      if (l.flags |= 2048, Zl(
        9,
        { destroy: void 0 },
        qf.bind(
          null,
          l,
          u,
          n,
          t
        ),
        null
      ), ze === null) throw Error(r(349));
      c || (tn & 127) !== 0 || Hf(l, t, n);
    }
    return n;
  }
  function Hf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = F.updateQueue, t === null ? (t = Mu(), F.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function qf(e, t, n, l) {
    t.value = n, t.getSnapshot = l, Yf(t) && Gf(e);
  }
  function Bf(e, t, n) {
    return n(function() {
      Yf(t) && Gf(e);
    });
  }
  function Yf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !bt(e, n);
    } catch {
      return !0;
    }
  }
  function Gf(e) {
    var t = Kn(e, 2);
    t !== null && dt(t, e, 2);
  }
  function Zc(e) {
    var t = lt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), nl) {
        hn(!0);
        try {
          n();
        } finally {
          hn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nn,
      lastRenderedState: e
    }, t;
  }
  function Xf(e, t, n, l) {
    return e.baseState = n, Uc(
      e,
      be,
      typeof l == "function" ? l : nn
    );
  }
  function w0(e, t, n, l, u) {
    if (Cu(e)) throw Error(r(485));
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
        then: function(f) {
          c.listeners.push(f);
        }
      };
      O.T !== null ? n(!0) : c.isTransition = !1, l(c), n = t.pending, n === null ? (c.next = t.pending = c, Lf(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function Lf(e, t) {
    var n = t.action, l = t.payload, u = e.state;
    if (t.isTransition) {
      var c = O.T, f = {};
      O.T = f;
      try {
        var s = n(u, l), v = O.S;
        v !== null && v(f, s), Qf(e, t, s);
      } catch (z) {
        Rc(e, t, z);
      } finally {
        c !== null && f.types !== null && (c.types = f.types), O.T = c;
      }
    } else
      try {
        c = n(u, l), Qf(e, t, c);
      } catch (z) {
        Rc(e, t, z);
      }
  }
  function Qf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Vf(e, t, l);
      },
      function(l) {
        return Rc(e, t, l);
      }
    ) : Vf(e, t, n);
  }
  function Vf(e, t, n) {
    t.status = "fulfilled", t.value = n, kf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Lf(e, n)));
  }
  function Rc(e, t, n) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = n, kf(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function kf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Kf(e, t) {
    return t;
  }
  function $f(e, t) {
    if (ce) {
      var n = ze.formState;
      if (n !== null) {
        e: {
          var l = F;
          if (ce) {
            if (Ae) {
              t: {
                for (var u = Ae, c = Zt; u.nodeType !== 8; ) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (u = wt(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                c = u.data, u = c === "F!" || c === "F" ? u : null;
              }
              if (u) {
                Ae = wt(
                  u.nextSibling
                ), l = u.data === "F!";
                break e;
              }
            }
            pn(l);
          }
          l = !1;
        }
        l && (t = n[0]);
      }
    }
    return n = lt(), n.memoizedState = n.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Kf,
      lastRenderedState: t
    }, n.queue = l, n = hs.bind(
      null,
      F,
      l
    ), l.dispatch = n, l = Zc(!1), c = Gc.bind(
      null,
      F,
      !1,
      l.queue
    ), l = lt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = u, n = w0.bind(
      null,
      F,
      u,
      c,
      n
    ), u.dispatch = n, l.memoizedState = e, [t, n, !1];
  }
  function Jf(e) {
    var t = we();
    return Wf(t, be, e);
  }
  function Wf(e, t, n) {
    if (t = Uc(
      e,
      t,
      Kf
    )[0], e = ju(nn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Ta(t);
      } catch (f) {
        throw f === Nl ? _u : f;
      }
    else l = t;
    t = we();
    var u = t.queue, c = u.dispatch;
    return n !== t.memoizedState && (F.flags |= 2048, Zl(
      9,
      { destroy: void 0 },
      H0.bind(null, u, n),
      null
    )), [l, c, e];
  }
  function H0(e, t) {
    e.action = t;
  }
  function Ff(e) {
    var t = we(), n = be;
    if (n !== null)
      return Wf(t, n, e);
    we(), t = t.memoizedState, n = we();
    var l = n.queue.dispatch;
    return n.memoizedState = e, [t, l, !1];
  }
  function Zl(e, t, n, l) {
    return e = { tag: e, create: n, deps: l, inst: t, next: null }, t = F.updateQueue, t === null && (t = Mu(), F.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (l = n.next, n.next = e, e.next = l, t.lastEffect = e), e;
  }
  function If() {
    return we().memoizedState;
  }
  function Du(e, t, n, l) {
    var u = lt();
    F.flags |= e, u.memoizedState = Zl(
      1 | t,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Uu(e, t, n, l) {
    var u = we();
    l = l === void 0 ? null : l;
    var c = u.memoizedState.inst;
    be !== null && l !== null && xc(l, be.memoizedState.deps) ? u.memoizedState = Zl(t, c, n, l) : (F.flags |= e, u.memoizedState = Zl(
      1 | t,
      c,
      n,
      l
    ));
  }
  function Pf(e, t) {
    Du(8390656, 8, e, t);
  }
  function wc(e, t) {
    Uu(2048, 8, e, t);
  }
  function q0(e) {
    F.flags |= 4;
    var t = F.updateQueue;
    if (t === null)
      t = Mu(), F.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function es(e) {
    var t = we().memoizedState;
    return q0({ ref: t, nextImpl: e }), function() {
      if ((me & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ts(e, t) {
    return Uu(4, 2, e, t);
  }
  function ns(e, t) {
    return Uu(4, 4, e, t);
  }
  function ls(e, t) {
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
  function as(e, t, n) {
    n = n != null ? n.concat([e]) : null, Uu(4, 4, ls.bind(null, t, e), n);
  }
  function Hc() {
  }
  function us(e, t) {
    var n = we();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    return t !== null && xc(t, l[1]) ? l[0] : (n.memoizedState = [e, t], e);
  }
  function is(e, t) {
    var n = we();
    t = t === void 0 ? null : t;
    var l = n.memoizedState;
    if (t !== null && xc(t, l[1]))
      return l[0];
    if (l = e(), nl) {
      hn(!0);
      try {
        e();
      } finally {
        hn(!1);
      }
    }
    return n.memoizedState = [l, t], l;
  }
  function qc(e, t, n) {
    return n === void 0 || (tn & 1073741824) !== 0 && (ue & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = cd(), F.lanes |= e, On |= e, n);
  }
  function cs(e, t, n, l) {
    return bt(n, t) ? n : Dl.current !== null ? (e = qc(e, n, l), bt(e, t) || (Ge = !0), e) : (tn & 42) === 0 || (tn & 1073741824) !== 0 && (ue & 261930) === 0 ? (Ge = !0, e.memoizedState = n) : (e = cd(), F.lanes |= e, On |= e, t);
  }
  function os(e, t, n, l, u) {
    var c = Z.p;
    Z.p = c !== 0 && 8 > c ? c : 8;
    var f = O.T, s = {};
    O.T = s, Gc(e, !1, t, n);
    try {
      var v = u(), z = O.S;
      if (z !== null && z(s, v), v !== null && typeof v == "object" && typeof v.then == "function") {
        var M = C0(
          v,
          l
        );
        Aa(
          e,
          t,
          M,
          At(e)
        );
      } else
        Aa(
          e,
          t,
          l,
          At(e)
        );
    } catch (D) {
      Aa(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: D },
        At()
      );
    } finally {
      Z.p = c, f !== null && s.types !== null && (f.types = s.types), O.T = f;
    }
  }
  function B0() {
  }
  function Bc(e, t, n, l) {
    if (e.tag !== 5) throw Error(r(476));
    var u = rs(e).queue;
    os(
      e,
      u,
      t,
      V,
      n === null ? B0 : function() {
        return fs(e), n(l);
      }
    );
  }
  function rs(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nn,
        lastRenderedState: V
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
        lastRenderedReducer: nn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function fs(e) {
    var t = rs(e);
    t.next === null && (t = e.alternate.memoizedState), Aa(
      e,
      t.next.queue,
      {},
      At()
    );
  }
  function Yc() {
    return Je(Xa);
  }
  function ss() {
    return we().memoizedState;
  }
  function ds() {
    return we().memoizedState;
  }
  function Y0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = At();
          e = Sn(n);
          var l = zn(t, e, n);
          l !== null && (dt(l, t, n), _a(l, t, n)), t = { cache: vc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function G0(e, t, n) {
    var l = At();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cu(e) ? ms(t, n) : (n = ac(e, t, n, l), n !== null && (dt(n, e, l), vs(n, t, l)));
  }
  function hs(e, t, n) {
    var l = At();
    Aa(e, t, n, l);
  }
  function Aa(e, t, n, l) {
    var u = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Cu(e)) ms(t, u);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var f = t.lastRenderedState, s = c(f, n);
          if (u.hasEagerState = !0, u.eagerState = s, bt(s, f))
            return hu(e, t, u, 0), ze === null && du(), !1;
        } catch {
        } finally {
        }
      if (n = ac(e, t, u, l), n !== null)
        return dt(n, e, l), vs(n, t, l), !0;
    }
    return !1;
  }
  function Gc(e, t, n, l) {
    if (l = {
      lane: 2,
      revertLane: _o(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Cu(e)) {
      if (t) throw Error(r(479));
    } else
      t = ac(
        e,
        n,
        l,
        2
      ), t !== null && dt(t, e, 2);
  }
  function Cu(e) {
    var t = e.alternate;
    return e === F || t !== null && t === F;
  }
  function ms(e, t) {
    Ul = xu = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function vs(e, t, n) {
    if ((n & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, n |= l, t.lanes = n, br(e, n);
    }
  }
  var xa = {
    readContext: Je,
    use: Nu,
    useCallback: Ce,
    useContext: Ce,
    useEffect: Ce,
    useImperativeHandle: Ce,
    useLayoutEffect: Ce,
    useInsertionEffect: Ce,
    useMemo: Ce,
    useReducer: Ce,
    useRef: Ce,
    useState: Ce,
    useDebugValue: Ce,
    useDeferredValue: Ce,
    useTransition: Ce,
    useSyncExternalStore: Ce,
    useId: Ce,
    useHostTransitionStatus: Ce,
    useFormState: Ce,
    useActionState: Ce,
    useOptimistic: Ce,
    useMemoCache: Ce,
    useCacheRefresh: Ce
  };
  xa.useEffectEvent = Ce;
  var ys = {
    readContext: Je,
    use: Nu,
    useCallback: function(e, t) {
      return lt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Je,
    useEffect: Pf,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Du(
        4194308,
        4,
        ls.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Du(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Du(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = lt();
      t = t === void 0 ? null : t;
      var l = e();
      if (nl) {
        hn(!0);
        try {
          e();
        } finally {
          hn(!1);
        }
      }
      return n.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, n) {
      var l = lt();
      if (n !== void 0) {
        var u = n(t);
        if (nl) {
          hn(!0);
          try {
            n(t);
          } finally {
            hn(!1);
          }
        }
      } else u = t;
      return l.memoizedState = l.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, l.queue = e, e = e.dispatch = G0.bind(
        null,
        F,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = lt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Zc(e);
      var t = e.queue, n = hs.bind(null, F, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var n = lt();
      return qc(n, e, t);
    },
    useTransition: function() {
      var e = Zc(!1);
      return e = os.bind(
        null,
        F,
        e.queue,
        !0,
        !1
      ), lt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var l = F, u = lt();
      if (ce) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = t(), ze === null)
          throw Error(r(349));
        (ue & 127) !== 0 || Hf(l, t, n);
      }
      u.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return u.queue = c, Pf(Bf.bind(null, l, c, e), [
        e
      ]), l.flags |= 2048, Zl(
        9,
        { destroy: void 0 },
        qf.bind(
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
      var e = lt(), t = ze.identifierPrefix;
      if (ce) {
        var n = Qt, l = Lt;
        n = (l & ~(1 << 32 - pt(l) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ou++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Z0++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Yc,
    useFormState: $f,
    useActionState: $f,
    useOptimistic: function(e) {
      var t = lt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Gc.bind(
        null,
        F,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Dc,
    useCacheRefresh: function() {
      return lt().memoizedState = Y0.bind(
        null,
        F
      );
    },
    useEffectEvent: function(e) {
      var t = lt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((me & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Xc = {
    readContext: Je,
    use: Nu,
    useCallback: us,
    useContext: Je,
    useEffect: wc,
    useImperativeHandle: as,
    useInsertionEffect: ts,
    useLayoutEffect: ns,
    useMemo: is,
    useReducer: ju,
    useRef: If,
    useState: function() {
      return ju(nn);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var n = we();
      return cs(
        n,
        be.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ju(nn)[0], t = we().memoizedState;
      return [
        typeof e == "boolean" ? e : Ta(e),
        t
      ];
    },
    useSyncExternalStore: wf,
    useId: ss,
    useHostTransitionStatus: Yc,
    useFormState: Jf,
    useActionState: Jf,
    useOptimistic: function(e, t) {
      var n = we();
      return Xf(n, be, e, t);
    },
    useMemoCache: Dc,
    useCacheRefresh: ds
  };
  Xc.useEffectEvent = es;
  var gs = {
    readContext: Je,
    use: Nu,
    useCallback: us,
    useContext: Je,
    useEffect: wc,
    useImperativeHandle: as,
    useInsertionEffect: ts,
    useLayoutEffect: ns,
    useMemo: is,
    useReducer: Cc,
    useRef: If,
    useState: function() {
      return Cc(nn);
    },
    useDebugValue: Hc,
    useDeferredValue: function(e, t) {
      var n = we();
      return be === null ? qc(n, e, t) : cs(
        n,
        be.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Cc(nn)[0], t = we().memoizedState;
      return [
        typeof e == "boolean" ? e : Ta(e),
        t
      ];
    },
    useSyncExternalStore: wf,
    useId: ss,
    useHostTransitionStatus: Yc,
    useFormState: Ff,
    useActionState: Ff,
    useOptimistic: function(e, t) {
      var n = we();
      return be !== null ? Xf(n, be, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Dc,
    useCacheRefresh: ds
  };
  gs.useEffectEvent = es;
  function Lc(e, t, n, l) {
    t = e.memoizedState, n = n(l, t), n = n == null ? t : C({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Qc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var l = At(), u = Sn(l);
      u.payload = t, n != null && (u.callback = n), t = zn(e, u, l), t !== null && (dt(t, e, l), _a(t, e, l));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var l = At(), u = Sn(l);
      u.tag = 1, u.payload = t, n != null && (u.callback = n), t = zn(e, u, l), t !== null && (dt(t, e, l), _a(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = At(), l = Sn(n);
      l.tag = 2, t != null && (l.callback = t), t = zn(e, l, n), t !== null && (dt(t, e, n), _a(t, e, n));
    }
  };
  function ps(e, t, n, l, u, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, c, f) : t.prototype && t.prototype.isPureReactComponent ? !da(n, l) || !da(u, c) : !0;
  }
  function bs(e, t, n, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l), t.state !== e && Qc.enqueueReplaceState(t, t.state, null);
  }
  function ll(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var l in t)
        l !== "ref" && (n[l] = t[l]);
    }
    if (e = e.defaultProps) {
      n === t && (n = C({}, n));
      for (var u in e)
        n[u] === void 0 && (n[u] = e[u]);
    }
    return n;
  }
  function _s(e) {
    su(e);
  }
  function Ss(e) {
    console.error(e);
  }
  function zs(e) {
    su(e);
  }
  function Zu(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Es(e, t, n) {
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
  function Vc(e, t, n) {
    return n = Sn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Zu(e, t);
    }, n;
  }
  function Ts(e) {
    return e = Sn(e), e.tag = 3, e;
  }
  function As(e, t, n, l) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = l.value;
      e.payload = function() {
        return u(c);
      }, e.callback = function() {
        Es(t, n, l);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
      Es(t, n, l), typeof u != "function" && (Mn === null ? Mn = /* @__PURE__ */ new Set([this]) : Mn.add(this));
      var s = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function X0(e, t, n, l, u) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = n.alternate, t !== null && xl(
        t,
        n,
        u,
        !0
      ), n = St.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Rt === null ? ku() : n.alternate === null && Ze === 0 && (Ze = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, l === Su ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), go(e, l, u)), !1;
          case 22:
            return n.flags |= 65536, l === Su ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), go(e, l, u)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return go(e, l, u), ku(), !1;
    }
    if (ce)
      return t = St.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, l !== fc && (e = Error(r(422), { cause: l }), va(Dt(e, n)))) : (l !== fc && (t = Error(r(423), {
        cause: l
      }), va(
        Dt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, l = Dt(l, n), u = Vc(
        e.stateNode,
        l,
        u
      ), Sc(e, u), Ze !== 4 && (Ze = 2)), !1;
    var c = Error(r(520), { cause: l });
    if (c = Dt(c, n), Za === null ? Za = [c] : Za.push(c), Ze !== 4 && (Ze = 2), t === null) return !0;
    l = Dt(l, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = u & -u, n.lanes |= e, e = Vc(n.stateNode, l, e), Sc(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Mn === null || !Mn.has(c))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = Ts(u), As(
              u,
              e,
              n,
              l
            ), Sc(n, u), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var kc = Error(r(461)), Ge = !1;
  function We(e, t, n, l) {
    t.child = e === null ? Nf(t, null, n, l) : tl(
      t,
      e.child,
      n,
      l
    );
  }
  function xs(e, t, n, l, u) {
    n = n.render;
    var c = t.ref;
    if ("ref" in l) {
      var f = {};
      for (var s in l)
        s !== "ref" && (f[s] = l[s]);
    } else f = l;
    return Fn(t), l = Oc(
      e,
      t,
      n,
      f,
      c,
      u
    ), s = Mc(), e !== null && !Ge ? (Nc(e, t, u), ln(e, t, u)) : (ce && s && oc(t), t.flags |= 1, We(e, t, l, u), t.child);
  }
  function Os(e, t, n, l, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !uc(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, Ms(
        e,
        t,
        c,
        l,
        u
      )) : (e = vu(
        n.type,
        null,
        l,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !eo(e, u)) {
      var f = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : da, n(f, l) && e.ref === t.ref)
        return ln(e, t, u);
    }
    return t.flags |= 1, e = Ft(c, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Ms(e, t, n, l, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (da(c, l) && e.ref === t.ref)
        if (Ge = !1, t.pendingProps = l = c, eo(e, u))
          (e.flags & 131072) !== 0 && (Ge = !0);
        else
          return t.lanes = e.lanes, ln(e, t, u);
    }
    return Kc(
      e,
      t,
      n,
      l,
      u
    );
  }
  function Ns(e, t, n, l) {
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
        return js(
          e,
          t,
          c,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && bu(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Uf(t, c) : Ec(), Cf(t);
      else
        return l = t.lanes = 536870912, js(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          l
        );
    } else
      c !== null ? (bu(t, c.cachePool), Uf(t, c), Tn(), t.memoizedState = null) : (e !== null && bu(t, null), Ec(), Tn());
    return We(e, t, u, n), t.child;
  }
  function Oa(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function js(e, t, n, l, u) {
    var c = gc();
    return c = c === null ? null : { parent: Be._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && bu(t, null), Ec(), Cf(t), e !== null && xl(e, t, l, !0), t.childLanes = u, null;
  }
  function Ru(e, t) {
    return t = Hu(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ds(e, t, n) {
    return tl(t, e.child, null, n), e = Ru(t, t.pendingProps), e.flags |= 2, zt(t), t.memoizedState = null, e;
  }
  function L0(e, t, n) {
    var l = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ce) {
        if (l.mode === "hidden")
          return e = Ru(t, l), t.lanes = 536870912, Oa(null, e);
        if (Ac(t), (e = Ae) ? (e = Ld(
          e,
          Zt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: yn !== null ? { id: Lt, overflow: Qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = mf(e), n.return = t, t.child = n, $e = t, Ae = null)) : e = null, e === null) throw pn(t);
        return t.lanes = 536870912, null;
      }
      return Ru(t, l);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if (Ac(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Ds(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (Ge || xl(e, t, n, !1), u = (n & e.childLanes) !== 0, Ge || u) {
        if (l = ze, l !== null && (f = _r(l, n), f !== 0 && f !== c.retryLane))
          throw c.retryLane = f, Kn(e, f), dt(l, e, f), kc;
        ku(), t = Ds(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, Ae = wt(f.nextSibling), $e = t, ce = !0, gn = null, Zt = !1, e !== null && gf(t, e), t = Ru(t, l), t.flags |= 4096;
      return t;
    }
    return e = Ft(e.child, {
      mode: l.mode,
      children: l.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function wu(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Kc(e, t, n, l, u) {
    return Fn(t), n = Oc(
      e,
      t,
      n,
      l,
      void 0,
      u
    ), l = Mc(), e !== null && !Ge ? (Nc(e, t, u), ln(e, t, u)) : (ce && l && oc(t), t.flags |= 1, We(e, t, n, u), t.child);
  }
  function Us(e, t, n, l, u, c) {
    return Fn(t), t.updateQueue = null, n = Rf(
      t,
      l,
      n,
      u
    ), Zf(e), l = Mc(), e !== null && !Ge ? (Nc(e, t, c), ln(e, t, c)) : (ce && l && oc(t), t.flags |= 1, We(e, t, n, c), t.child);
  }
  function Cs(e, t, n, l, u) {
    if (Fn(t), t.stateNode === null) {
      var c = zl, f = n.contextType;
      typeof f == "object" && f !== null && (c = Je(f)), c = new n(l, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = Qc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = l, c.state = t.memoizedState, c.refs = {}, bc(t), f = n.contextType, c.context = typeof f == "object" && f !== null ? Je(f) : zl, c.state = t.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (Lc(
        t,
        n,
        f,
        l
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (f = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), f !== c.state && Qc.enqueueReplaceState(c, c.state, null), za(t, l, c, u), Sa(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      c = t.stateNode;
      var s = t.memoizedProps, v = ll(n, s);
      c.props = v;
      var z = c.context, M = n.contextType;
      f = zl, typeof M == "object" && M !== null && (f = Je(M));
      var D = n.getDerivedStateFromProps;
      M = typeof D == "function" || typeof c.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, M || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (s || z !== f) && bs(
        t,
        c,
        l,
        f
      ), _n = !1;
      var T = t.memoizedState;
      c.state = T, za(t, l, c, u), Sa(), z = t.memoizedState, s || T !== z || _n ? (typeof D == "function" && (Lc(
        t,
        n,
        D,
        l
      ), z = t.memoizedState), (v = _n || ps(
        t,
        n,
        v,
        l,
        T,
        z,
        f
      )) ? (M || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = z), c.props = l, c.state = z, c.context = f, l = v) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      c = t.stateNode, _c(e, t), f = t.memoizedProps, M = ll(n, f), c.props = M, D = t.pendingProps, T = c.context, z = n.contextType, v = zl, typeof z == "object" && z !== null && (v = Je(z)), s = n.getDerivedStateFromProps, (z = typeof s == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (f !== D || T !== v) && bs(
        t,
        c,
        l,
        v
      ), _n = !1, T = t.memoizedState, c.state = T, za(t, l, c, u), Sa();
      var x = t.memoizedState;
      f !== D || T !== x || _n || e !== null && e.dependencies !== null && gu(e.dependencies) ? (typeof s == "function" && (Lc(
        t,
        n,
        s,
        l
      ), x = t.memoizedState), (M = _n || ps(
        t,
        n,
        M,
        l,
        T,
        x,
        v
      ) || e !== null && e.dependencies !== null && gu(e.dependencies)) ? (z || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(l, x, v), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        l,
        x,
        v
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = x), c.props = l, c.state = x, c.context = v, l = M) : (typeof c.componentDidUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return c = l, wu(e, t), l = (t.flags & 128) !== 0, c || l ? (c = t.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && l ? (t.child = tl(
      t,
      e.child,
      null,
      u
    ), t.child = tl(
      t,
      null,
      n,
      u
    )) : We(e, t, n, u), t.memoizedState = c.state, e = t.child) : e = ln(
      e,
      t,
      u
    ), e;
  }
  function Zs(e, t, n, l) {
    return Jn(), t.flags |= 256, We(e, t, n, l), t.child;
  }
  var $c = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Jc(e) {
    return { baseLanes: e, cachePool: Ef() };
  }
  function Wc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Tt), e;
  }
  function Rs(e, t, n) {
    var l = t.pendingProps, u = !1, c = (t.flags & 128) !== 0, f;
    if ((f = c) || (f = e !== null && e.memoizedState === null ? !1 : (Re.current & 2) !== 0), f && (u = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ce) {
        if (u ? En(t) : Tn(), (e = Ae) ? (e = Ld(
          e,
          Zt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: yn !== null ? { id: Lt, overflow: Qt } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = mf(e), n.return = t, t.child = n, $e = t, Ae = null)) : e = null, e === null) throw pn(t);
        return Co(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var s = l.children;
      return l = l.fallback, u ? (Tn(), u = t.mode, s = Hu(
        { mode: "hidden", children: s },
        u
      ), l = $n(
        l,
        u,
        n,
        null
      ), s.return = t, l.return = t, s.sibling = l, t.child = s, l = t.child, l.memoizedState = Jc(n), l.childLanes = Wc(
        e,
        f,
        n
      ), t.memoizedState = $c, Oa(null, l)) : (En(t), Fc(t, s));
    }
    var v = e.memoizedState;
    if (v !== null && (s = v.dehydrated, s !== null)) {
      if (c)
        t.flags & 256 ? (En(t), t.flags &= -257, t = Ic(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Tn(), t.child = e.child, t.flags |= 128, t = null) : (Tn(), s = l.fallback, u = t.mode, l = Hu(
          { mode: "visible", children: l.children },
          u
        ), s = $n(
          s,
          u,
          n,
          null
        ), s.flags |= 2, l.return = t, s.return = t, l.sibling = s, t.child = l, tl(
          t,
          e.child,
          null,
          n
        ), l = t.child, l.memoizedState = Jc(n), l.childLanes = Wc(
          e,
          f,
          n
        ), t.memoizedState = $c, t = Oa(null, l));
      else if (En(t), Co(s)) {
        if (f = s.nextSibling && s.nextSibling.dataset, f) var z = f.dgst;
        f = z, l = Error(r(419)), l.stack = "", l.digest = f, va({ value: l, source: null, stack: null }), t = Ic(
          e,
          t,
          n
        );
      } else if (Ge || xl(e, t, n, !1), f = (n & e.childLanes) !== 0, Ge || f) {
        if (f = ze, f !== null && (l = _r(f, n), l !== 0 && l !== v.retryLane))
          throw v.retryLane = l, Kn(e, l), dt(f, e, l), kc;
        Uo(s) || ku(), t = Ic(
          e,
          t,
          n
        );
      } else
        Uo(s) ? (t.flags |= 192, t.child = e.child, t = null) : (e = v.treeContext, Ae = wt(
          s.nextSibling
        ), $e = t, ce = !0, gn = null, Zt = !1, e !== null && gf(t, e), t = Fc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (Tn(), s = l.fallback, u = t.mode, v = e.child, z = v.sibling, l = Ft(v, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = v.subtreeFlags & 65011712, z !== null ? s = Ft(
      z,
      s
    ) : (s = $n(
      s,
      u,
      n,
      null
    ), s.flags |= 2), s.return = t, l.return = t, l.sibling = s, t.child = l, Oa(null, l), l = t.child, s = e.child.memoizedState, s === null ? s = Jc(n) : (u = s.cachePool, u !== null ? (v = Be._currentValue, u = u.parent !== v ? { parent: v, pool: v } : u) : u = Ef(), s = {
      baseLanes: s.baseLanes | n,
      cachePool: u
    }), l.memoizedState = s, l.childLanes = Wc(
      e,
      f,
      n
    ), t.memoizedState = $c, Oa(e.child, l)) : (En(t), n = e.child, e = n.sibling, n = Ft(n, {
      mode: "visible",
      children: l.children
    }), n.return = t, n.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [e], t.flags |= 16) : f.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Fc(e, t) {
    return t = Hu(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Hu(e, t) {
    return e = _t(22, e, null, t), e.lanes = 0, e;
  }
  function Ic(e, t, n) {
    return tl(t, e.child, null, n), e = Fc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function ws(e, t, n) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), hc(e.return, t, n);
  }
  function Pc(e, t, n, l, u, c) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: u,
      treeForkCount: c
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = l, f.tail = n, f.tailMode = u, f.treeForkCount = c);
  }
  function Hs(e, t, n) {
    var l = t.pendingProps, u = l.revealOrder, c = l.tail;
    l = l.children;
    var f = Re.current, s = (f & 2) !== 0;
    if (s ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, H(Re, f), We(e, t, l, n), l = ce ? ma : 0, !s && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && ws(e, n, t);
        else if (e.tag === 19)
          ws(e, n, t);
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
          e = n.alternate, e !== null && Au(e) === null && (u = n), n = n.sibling;
        n = u, n === null ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null), Pc(
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
          if (e = u.alternate, e !== null && Au(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = n, n = u, u = e;
        }
        Pc(
          t,
          !0,
          n,
          null,
          c,
          l
        );
        break;
      case "together":
        Pc(
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
  function ln(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), On |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (xl(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, n = Ft(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Ft(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function eo(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && gu(e)));
  }
  function Q0(e, t, n) {
    switch (t.tag) {
      case 3:
        he(t, t.stateNode.containerInfo), bn(t, Be, e.memoizedState.cache), Jn();
        break;
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        he(t, t.stateNode.containerInfo);
        break;
      case 10:
        bn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ac(t), null;
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (En(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Rs(e, t, n) : (En(t), e = ln(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        En(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (l = (n & t.childLanes) !== 0, l || (xl(
          e,
          t,
          n,
          !1
        ), l = (n & t.childLanes) !== 0), u) {
          if (l)
            return Hs(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), H(Re, Re.current), l) break;
        return null;
      case 22:
        return t.lanes = 0, Ns(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        bn(t, Be, e.memoizedState.cache);
    }
    return ln(e, t, n);
  }
  function qs(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ge = !0;
      else {
        if (!eo(e, n) && (t.flags & 128) === 0)
          return Ge = !1, Q0(
            e,
            t,
            n
          );
        Ge = (e.flags & 131072) !== 0;
      }
    else
      Ge = !1, ce && (t.flags & 1048576) !== 0 && yf(t, ma, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var l = t.pendingProps;
          if (e = Pn(t.elementType), t.type = e, typeof e == "function")
            uc(e) ? (l = ll(e, l), t.tag = 1, t = Cs(
              null,
              t,
              e,
              l,
              n
            )) : (t.tag = 0, t = Kc(
              null,
              t,
              e,
              l,
              n
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === ye) {
                t.tag = 11, t = xs(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              } else if (u === te) {
                t.tag = 14, t = Os(
                  null,
                  t,
                  e,
                  l,
                  n
                );
                break e;
              }
            }
            throw t = mt(e) || e, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return Kc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return l = t.type, u = ll(
          l,
          t.pendingProps
        ), Cs(
          e,
          t,
          l,
          u,
          n
        );
      case 3:
        e: {
          if (he(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          l = t.pendingProps;
          var c = t.memoizedState;
          u = c.element, _c(e, t), za(t, l, null, n);
          var f = t.memoizedState;
          if (l = f.cache, bn(t, Be, l), l !== c.cache && mc(
            t,
            [Be],
            n,
            !0
          ), Sa(), l = f.element, c.isDehydrated)
            if (c = {
              element: l,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Zs(
                e,
                t,
                l,
                n
              );
              break e;
            } else if (l !== u) {
              u = Dt(
                Error(r(424)),
                t
              ), va(u), t = Zs(
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
              for (Ae = wt(e.firstChild), $e = t, ce = !0, gn = null, Zt = !0, n = Nf(
                t,
                null,
                l,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Jn(), l === u) {
              t = ln(
                e,
                t,
                n
              );
              break e;
            }
            We(e, t, l, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return wu(e, t), e === null ? (n = Jd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ce || (n = t.type, e = t.pendingProps, l = Pu(
          K.current
        ).createElement(n), l[Ke] = t, l[it] = e, Fe(l, n, e), Ve(l), t.stateNode = l) : t.memoizedState = Jd(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Oe(t), e === null && ce && (l = t.stateNode = kd(
          t.type,
          t.pendingProps,
          K.current
        ), $e = t, Zt = !0, u = Ae, Un(t.type) ? (Zo = u, Ae = wt(l.firstChild)) : Ae = u), We(
          e,
          t,
          t.pendingProps.children,
          n
        ), wu(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ce && ((u = l = Ae) && (l = _v(
          l,
          t.type,
          t.pendingProps,
          Zt
        ), l !== null ? (t.stateNode = l, $e = t, Ae = wt(l.firstChild), Zt = !1, u = !0) : u = !1), u || pn(t)), Oe(t), u = t.type, c = t.pendingProps, f = e !== null ? e.memoizedProps : null, l = c.children, No(u, c) ? l = null : f !== null && No(u, f) && (t.flags |= 32), t.memoizedState !== null && (u = Oc(
          e,
          t,
          R0,
          null,
          null,
          n
        ), Xa._currentValue = u), wu(e, t), We(e, t, l, n), t.child;
      case 6:
        return e === null && ce && ((e = n = Ae) && (n = Sv(
          n,
          t.pendingProps,
          Zt
        ), n !== null ? (t.stateNode = n, $e = t, Ae = null, e = !0) : e = !1), e || pn(t)), null;
      case 13:
        return Rs(e, t, n);
      case 4:
        return he(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = tl(
          t,
          null,
          l,
          n
        ) : We(e, t, l, n), t.child;
      case 11:
        return xs(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return We(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return We(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return We(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return l = t.pendingProps, bn(t, t.type, l.value), We(e, t, l.children, n), t.child;
      case 9:
        return u = t.type._context, l = t.pendingProps.children, Fn(t), u = Je(u), l = l(u), t.flags |= 1, We(e, t, l, n), t.child;
      case 14:
        return Os(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Ms(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Hs(e, t, n);
      case 31:
        return L0(e, t, n);
      case 22:
        return Ns(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Fn(t), l = Je(Be), e === null ? (u = gc(), u === null && (u = ze, c = vc(), u.pooledCache = c, c.refCount++, c !== null && (u.pooledCacheLanes |= n), u = c), t.memoizedState = { parent: l, cache: u }, bc(t), bn(t, Be, u)) : ((e.lanes & n) !== 0 && (_c(e, t), za(t, null, null, n), Sa()), u = e.memoizedState, c = t.memoizedState, u.parent !== l ? (u = { parent: l, cache: l }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), bn(t, Be, l)) : (l = c.cache, bn(t, Be, l), l !== u.cache && mc(
          t,
          [Be],
          n,
          !0
        ))), We(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function an(e) {
    e.flags |= 4;
  }
  function to(e, t, n, l, u) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (sd()) e.flags |= 8192;
        else
          throw el = Su, pc;
    } else e.flags &= -16777217;
  }
  function Bs(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !eh(t))
      if (sd()) e.flags |= 8192;
      else
        throw el = Su, pc;
  }
  function qu(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? gr() : 536870912, e.lanes |= t, ql |= t);
  }
  function Ma(e, t) {
    if (!ce)
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
  function xe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, l = 0;
    if (t)
      for (var u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= l, e.childLanes = n, t;
  }
  function V0(e, t, n) {
    var l = t.pendingProps;
    switch (rc(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xe(t), null;
      case 1:
        return xe(t), null;
      case 3:
        return n = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), en(Be), L(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Al(t) ? an(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, sc())), xe(t), null;
      case 26:
        var u = t.type, c = t.memoizedState;
        return e === null ? (an(t), c !== null ? (xe(t), Bs(t, c)) : (xe(t), to(
          t,
          u,
          null,
          l,
          n
        ))) : c ? c !== e.memoizedState ? (an(t), xe(t), Bs(t, c)) : (xe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== l && an(t), xe(t), to(
          t,
          u,
          e,
          l,
          n
        )), null;
      case 27:
        if (vt(t), n = K.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(r(166));
            return xe(t), null;
          }
          e = B.current, Al(t) ? pf(t) : (e = kd(u, l, n), t.stateNode = e, an(t));
        }
        return xe(t), null;
      case 5:
        if (vt(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(r(166));
            return xe(t), null;
          }
          if (c = B.current, Al(t))
            pf(t);
          else {
            var f = Pu(
              K.current
            );
            switch (c) {
              case 1:
                c = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                c = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    c = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    c = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    c = f.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof l.is == "string" ? f.createElement("select", {
                      is: l.is
                    }) : f.createElement("select"), l.multiple ? c.multiple = !0 : l.size && (c.size = l.size);
                    break;
                  default:
                    c = typeof l.is == "string" ? f.createElement(u, { is: l.is }) : f.createElement(u);
                }
            }
            c[Ke] = t, c[it] = l;
            e: for (f = t.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6)
                c.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                f.child.return = f, f = f.child;
                continue;
              }
              if (f === t) break e;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === t)
                  break e;
                f = f.return;
              }
              f.sibling.return = f.return, f = f.sibling;
            }
            t.stateNode = c;
            e: switch (Fe(c, u, l), u) {
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
            l && an(t);
          }
        }
        return xe(t), to(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && an(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(r(166));
          if (e = K.current, Al(t)) {
            if (e = t.stateNode, n = t.memoizedProps, l = null, u = $e, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  l = u.memoizedProps;
              }
            e[Ke] = t, e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Rd(e.nodeValue, n)), e || pn(t, !0);
          } else
            e = Pu(e).createTextNode(
              l
            ), e[Ke] = t, t.stateNode = e;
        }
        return xe(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (l = Al(t), n !== null) {
            if (e === null) {
              if (!l) throw Error(r(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[Ke] = t;
            } else
              Jn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            xe(t), e = !1;
          } else
            n = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return xe(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Al(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(r(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(r(317));
              u[Ke] = t;
            } else
              Jn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            xe(t), u = !1;
          } else
            u = sc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (zt(t), t) : (zt(t), null);
        }
        return zt(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = l !== null, e = e !== null && e.memoizedState !== null, n && (l = t.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool), c = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (c = l.memoizedState.cachePool.pool), c !== u && (l.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), qu(t, t.updateQueue), xe(t), null);
      case 4:
        return L(), e === null && To(t.stateNode.containerInfo), xe(t), null;
      case 10:
        return en(t.type), xe(t), null;
      case 19:
        if (j(Re), l = t.memoizedState, l === null) return xe(t), null;
        if (u = (t.flags & 128) !== 0, c = l.rendering, c === null)
          if (u) Ma(l, !1);
          else {
            if (Ze !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Au(e), c !== null) {
                  for (t.flags |= 128, Ma(l, !1), e = c.updateQueue, t.updateQueue = e, qu(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    hf(n, e), n = n.sibling;
                  return H(
                    Re,
                    Re.current & 1 | 2
                  ), ce && It(t, l.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            l.tail !== null && yt() > Lu && (t.flags |= 128, u = !0, Ma(l, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = Au(c), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, qu(t, e), Ma(l, !0), l.tail === null && l.tailMode === "hidden" && !c.alternate && !ce)
                return xe(t), null;
            } else
              2 * yt() - l.renderingStartTime > Lu && n !== 536870912 && (t.flags |= 128, u = !0, Ma(l, !1), t.lanes = 4194304);
          l.isBackwards ? (c.sibling = t.child, t.child = c) : (e = l.last, e !== null ? e.sibling = c : t.child = c, l.last = c);
        }
        return l.tail !== null ? (e = l.tail, l.rendering = e, l.tail = e.sibling, l.renderingStartTime = yt(), e.sibling = null, n = Re.current, H(
          Re,
          u ? n & 1 | 2 : n & 1
        ), ce && It(t, l.treeForkCount), e) : (xe(t), null);
      case 22:
      case 23:
        return zt(t), Tc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (xe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : xe(t), n = t.updateQueue, n !== null && qu(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== n && (t.flags |= 2048), e !== null && j(In), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), en(Be), xe(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function k0(e, t) {
    switch (rc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return en(Be), L(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return vt(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (zt(t), t.alternate === null)
            throw Error(r(340));
          Jn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (zt(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          Jn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return j(Re), null;
      case 4:
        return L(), null;
      case 10:
        return en(t.type), null;
      case 22:
      case 23:
        return zt(t), Tc(), e !== null && j(In), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return en(Be), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ys(e, t) {
    switch (rc(t), t.tag) {
      case 3:
        en(Be), L();
        break;
      case 26:
      case 27:
      case 5:
        vt(t);
        break;
      case 4:
        L();
        break;
      case 31:
        t.memoizedState !== null && zt(t);
        break;
      case 13:
        zt(t);
        break;
      case 19:
        j(Re);
        break;
      case 10:
        en(t.type);
        break;
      case 22:
      case 23:
        zt(t), Tc(), e !== null && j(In);
        break;
      case 24:
        en(Be);
    }
  }
  function Na(e, t) {
    try {
      var n = t.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            l = void 0;
            var c = n.create, f = n.inst;
            l = c(), f.destroy = l;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (s) {
      pe(t, t.return, s);
    }
  }
  function An(e, t, n) {
    try {
      var l = t.updateQueue, u = l !== null ? l.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        l = c;
        do {
          if ((l.tag & e) === e) {
            var f = l.inst, s = f.destroy;
            if (s !== void 0) {
              f.destroy = void 0, u = t;
              var v = n, z = s;
              try {
                z();
              } catch (M) {
                pe(
                  u,
                  v,
                  M
                );
              }
            }
          }
          l = l.next;
        } while (l !== c);
      }
    } catch (M) {
      pe(t, t.return, M);
    }
  }
  function Gs(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Df(t, n);
      } catch (l) {
        pe(e, e.return, l);
      }
    }
  }
  function Xs(e, t, n) {
    n.props = ll(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      pe(e, t, l);
    }
  }
  function ja(e, t) {
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
      pe(e, t, u);
    }
  }
  function Vt(e, t) {
    var n = e.ref, l = e.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (u) {
          pe(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          pe(e, t, u);
        }
      else n.current = null;
  }
  function Ls(e) {
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
      pe(e, e.return, u);
    }
  }
  function no(e, t, n) {
    try {
      var l = e.stateNode;
      mv(l, e.type, n, t), l[it] = t;
    } catch (u) {
      pe(e, e.return, u);
    }
  }
  function Qs(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Un(e.type) || e.tag === 4;
  }
  function lo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Qs(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Un(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function ao(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jt));
    else if (l !== 4 && (l === 27 && Un(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (ao(e, t, n), e = e.sibling; e !== null; )
        ao(e, t, n), e = e.sibling;
  }
  function Bu(e, t, n) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (l !== 4 && (l === 27 && Un(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (Bu(e, t, n), e = e.sibling; e !== null; )
        Bu(e, t, n), e = e.sibling;
  }
  function Vs(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var l = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      Fe(t, l, n), t[Ke] = e, t[it] = n;
    } catch (c) {
      pe(e, e.return, c);
    }
  }
  var un = !1, Xe = !1, uo = !1, ks = typeof WeakSet == "function" ? WeakSet : Set, ke = null;
  function K0(e, t) {
    if (e = e.containerInfo, Oo = ii, e = lf(e), Ii(e)) {
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
            var f = 0, s = -1, v = -1, z = 0, M = 0, D = e, T = null;
            t: for (; ; ) {
              for (var x; D !== n || u !== 0 && D.nodeType !== 3 || (s = f + u), D !== c || l !== 0 && D.nodeType !== 3 || (v = f + l), D.nodeType === 3 && (f += D.nodeValue.length), (x = D.firstChild) !== null; )
                T = D, D = x;
              for (; ; ) {
                if (D === e) break t;
                if (T === n && ++z === u && (s = f), T === c && ++M === l && (v = f), (x = D.nextSibling) !== null) break;
                D = T, T = D.parentNode;
              }
              D = x;
            }
            n = s === -1 || v === -1 ? null : { start: s, end: v };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Mo = { focusedElem: e, selectionRange: n }, ii = !1, ke = t; ke !== null; )
      if (t = ke, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ke = e;
      else
        for (; ke !== null; ) {
          switch (t = ke, c = t.alternate, e = t.flags, t.tag) {
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
                  var Y = ll(
                    n.type,
                    u
                  );
                  e = l.getSnapshotBeforeUpdate(
                    Y,
                    c
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch ($) {
                  pe(
                    n,
                    n.return,
                    $
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Do(e);
                else if (n === 1)
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
              if ((e & 1024) !== 0) throw Error(r(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ke = e;
            break;
          }
          ke = t.return;
        }
  }
  function Ks(e, t, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        on(e, n), l & 4 && Na(5, n);
        break;
      case 1:
        if (on(e, n), l & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (f) {
              pe(n, n.return, f);
            }
          else {
            var u = ll(
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
            } catch (f) {
              pe(
                n,
                n.return,
                f
              );
            }
          }
        l & 64 && Gs(n), l & 512 && ja(n, n.return);
        break;
      case 3:
        if (on(e, n), l & 64 && (e = n.updateQueue, e !== null)) {
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
            Df(e, t);
          } catch (f) {
            pe(n, n.return, f);
          }
        }
        break;
      case 27:
        t === null && l & 4 && Vs(n);
      case 26:
      case 5:
        on(e, n), t === null && l & 4 && Ls(n), l & 512 && ja(n, n.return);
        break;
      case 12:
        on(e, n);
        break;
      case 31:
        on(e, n), l & 4 && Ws(e, n);
        break;
      case 13:
        on(e, n), l & 4 && Fs(e, n), l & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = nv.bind(
          null,
          n
        ), zv(e, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || un, !l) {
          t = t !== null && t.memoizedState !== null || Xe, u = un;
          var c = Xe;
          un = l, (Xe = t) && !c ? rn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : on(e, n), un = u, Xe = c;
        }
        break;
      case 30:
        break;
      default:
        on(e, n);
    }
  }
  function $s(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, $s(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ri(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Me = null, ot = !1;
  function cn(e, t, n) {
    for (n = n.child; n !== null; )
      Js(e, t, n), n = n.sibling;
  }
  function Js(e, t, n) {
    if (gt && typeof gt.onCommitFiberUnmount == "function")
      try {
        gt.onCommitFiberUnmount(ea, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Xe || Vt(n, t), cn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Xe || Vt(n, t);
        var l = Me, u = ot;
        Un(n.type) && (Me = n.stateNode, ot = !1), cn(
          e,
          t,
          n
        ), Ba(n.stateNode), Me = l, ot = u;
        break;
      case 5:
        Xe || Vt(n, t);
      case 6:
        if (l = Me, u = ot, Me = null, cn(
          e,
          t,
          n
        ), Me = l, ot = u, Me !== null)
          if (ot)
            try {
              (Me.nodeType === 9 ? Me.body : Me.nodeName === "HTML" ? Me.ownerDocument.body : Me).removeChild(n.stateNode);
            } catch (c) {
              pe(
                n,
                t,
                c
              );
            }
          else
            try {
              Me.removeChild(n.stateNode);
            } catch (c) {
              pe(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        Me !== null && (ot ? (e = Me, Gd(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), kl(e)) : Gd(Me, n.stateNode));
        break;
      case 4:
        l = Me, u = ot, Me = n.stateNode.containerInfo, ot = !0, cn(
          e,
          t,
          n
        ), Me = l, ot = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        An(2, n, t), Xe || An(4, n, t), cn(
          e,
          t,
          n
        );
        break;
      case 1:
        Xe || (Vt(n, t), l = n.stateNode, typeof l.componentWillUnmount == "function" && Xs(
          n,
          t,
          l
        )), cn(
          e,
          t,
          n
        );
        break;
      case 21:
        cn(
          e,
          t,
          n
        );
        break;
      case 22:
        Xe = (l = Xe) || n.memoizedState !== null, cn(
          e,
          t,
          n
        ), Xe = l;
        break;
      default:
        cn(
          e,
          t,
          n
        );
    }
  }
  function Ws(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        kl(e);
      } catch (n) {
        pe(t, t.return, n);
      }
    }
  }
  function Fs(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        kl(e);
      } catch (n) {
        pe(t, t.return, n);
      }
  }
  function $0(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new ks()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ks()), t;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Yu(e, t) {
    var n = $0(e);
    t.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var u = lv.bind(null, e, l);
        l.then(u, u);
      }
    });
  }
  function rt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var u = n[l], c = e, f = t, s = f;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (Un(s.type)) {
                Me = s.stateNode, ot = !1;
                break e;
              }
              break;
            case 5:
              Me = s.stateNode, ot = !1;
              break e;
            case 3:
            case 4:
              Me = s.stateNode.containerInfo, ot = !0;
              break e;
          }
          s = s.return;
        }
        if (Me === null) throw Error(r(160));
        Js(c, f, u), Me = null, ot = !1, c = u.alternate, c !== null && (c.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Is(t, e), t = t.sibling;
  }
  var Gt = null;
  function Is(e, t) {
    var n = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        rt(t, e), ft(e), l & 4 && (An(3, e, e.return), Na(3, e), An(5, e, e.return));
        break;
      case 1:
        rt(t, e), ft(e), l & 512 && (Xe || n === null || Vt(n, n.return)), l & 64 && un && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var u = Gt;
        if (rt(t, e), ft(e), l & 512 && (Xe || n === null || Vt(n, n.return)), l & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (l = e.memoizedState, n === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, n = e.memoizedProps, u = u.ownerDocument || u;
                  t: switch (l) {
                    case "title":
                      c = u.getElementsByTagName("title")[0], (!c || c[la] || c[Ke] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = u.createElement(l), u.head.insertBefore(
                        c,
                        u.querySelector("head > title")
                      )), Fe(c, l, n), c[Ke] = e, Ve(c), l = c;
                      break e;
                    case "link":
                      var f = Id(
                        "link",
                        "href",
                        u
                      ).get(l + (n.href || ""));
                      if (f) {
                        for (var s = 0; s < f.length; s++)
                          if (c = f[s], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            f.splice(s, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), Fe(c, l, n), u.head.appendChild(c);
                      break;
                    case "meta":
                      if (f = Id(
                        "meta",
                        "content",
                        u
                      ).get(l + (n.content || ""))) {
                        for (s = 0; s < f.length; s++)
                          if (c = f[s], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            f.splice(s, 1);
                            break t;
                          }
                      }
                      c = u.createElement(l), Fe(c, l, n), u.head.appendChild(c);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  c[Ke] = e, Ve(c), l = c;
                }
                e.stateNode = l;
              } else
                Pd(
                  u,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Fd(
                u,
                l,
                e.memoizedProps
              );
          else
            c !== l ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, l === null ? Pd(
              u,
              e.type,
              e.stateNode
            ) : Fd(
              u,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && no(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        rt(t, e), ft(e), l & 512 && (Xe || n === null || Vt(n, n.return)), n !== null && l & 4 && no(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (rt(t, e), ft(e), l & 512 && (Xe || n === null || Vt(n, n.return)), e.flags & 32) {
          u = e.stateNode;
          try {
            vl(u, "");
          } catch (Y) {
            pe(e, e.return, Y);
          }
        }
        l & 4 && e.stateNode != null && (u = e.memoizedProps, no(
          e,
          u,
          n !== null ? n.memoizedProps : u
        )), l & 1024 && (uo = !0);
        break;
      case 6:
        if (rt(t, e), ft(e), l & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          l = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = l;
          } catch (Y) {
            pe(e, e.return, Y);
          }
        }
        break;
      case 3:
        if (ni = null, u = Gt, Gt = ei(t.containerInfo), rt(t, e), Gt = u, ft(e), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            kl(t.containerInfo);
          } catch (Y) {
            pe(e, e.return, Y);
          }
        uo && (uo = !1, Ps(e));
        break;
      case 4:
        l = Gt, Gt = ei(
          e.stateNode.containerInfo
        ), rt(t, e), ft(e), Gt = l;
        break;
      case 12:
        rt(t, e), ft(e);
        break;
      case 31:
        rt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Yu(e, l)));
        break;
      case 13:
        rt(t, e), ft(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Xu = yt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Yu(e, l)));
        break;
      case 22:
        u = e.memoizedState !== null;
        var v = n !== null && n.memoizedState !== null, z = un, M = Xe;
        if (un = z || u, Xe = M || v, rt(t, e), Xe = M, un = z, ft(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (n === null || v || un || Xe || al(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                v = n = t;
                try {
                  if (c = v.stateNode, u)
                    f = c.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    s = v.stateNode;
                    var D = v.memoizedProps.style, T = D != null && D.hasOwnProperty("display") ? D.display : null;
                    s.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (Y) {
                  pe(v, v.return, Y);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                v = t;
                try {
                  v.stateNode.nodeValue = u ? "" : v.memoizedProps;
                } catch (Y) {
                  pe(v, v.return, Y);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                v = t;
                try {
                  var x = v.stateNode;
                  u ? Xd(x, !0) : Xd(v.stateNode, !1);
                } catch (Y) {
                  pe(v, v.return, Y);
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
        l & 4 && (l = e.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, Yu(e, n))));
        break;
      case 19:
        rt(t, e), ft(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Yu(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        rt(t, e), ft(e);
    }
  }
  function ft(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, l = e.return; l !== null; ) {
          if (Qs(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode, c = lo(e);
            Bu(e, c, u);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (vl(f, ""), n.flags &= -33);
            var s = lo(e);
            Bu(e, s, f);
            break;
          case 3:
          case 4:
            var v = n.stateNode.containerInfo, z = lo(e);
            ao(
              e,
              z,
              v
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (M) {
        pe(e, e.return, M);
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
  function on(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Ks(e, t.alternate, t), t = t.sibling;
  }
  function al(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          An(4, t, t.return), al(t);
          break;
        case 1:
          Vt(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Xs(
            t,
            t.return,
            n
          ), al(t);
          break;
        case 27:
          Ba(t.stateNode);
        case 26:
        case 5:
          Vt(t, t.return), al(t);
          break;
        case 22:
          t.memoizedState === null && al(t);
          break;
        case 30:
          al(t);
          break;
        default:
          al(t);
      }
      e = e.sibling;
    }
  }
  function rn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, u = e, c = t, f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          rn(
            u,
            c,
            n
          ), Na(4, c);
          break;
        case 1:
          if (rn(
            u,
            c,
            n
          ), l = c, u = l.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (z) {
              pe(l, l.return, z);
            }
          if (l = c, u = l.updateQueue, u !== null) {
            var s = l.stateNode;
            try {
              var v = u.shared.hiddenCallbacks;
              if (v !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < v.length; u++)
                  jf(v[u], s);
            } catch (z) {
              pe(l, l.return, z);
            }
          }
          n && f & 64 && Gs(c), ja(c, c.return);
          break;
        case 27:
          Vs(c);
        case 26:
        case 5:
          rn(
            u,
            c,
            n
          ), n && l === null && f & 4 && Ls(c), ja(c, c.return);
          break;
        case 12:
          rn(
            u,
            c,
            n
          );
          break;
        case 31:
          rn(
            u,
            c,
            n
          ), n && f & 4 && Ws(u, c);
          break;
        case 13:
          rn(
            u,
            c,
            n
          ), n && f & 4 && Fs(u, c);
          break;
        case 22:
          c.memoizedState === null && rn(
            u,
            c,
            n
          ), ja(c, c.return);
          break;
        case 30:
          break;
        default:
          rn(
            u,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function io(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ya(n));
  }
  function co(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e));
  }
  function Xt(e, t, n, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ed(
          e,
          t,
          n,
          l
        ), t = t.sibling;
  }
  function ed(e, t, n, l) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Xt(
          e,
          t,
          n,
          l
        ), u & 2048 && Na(9, t);
        break;
      case 1:
        Xt(
          e,
          t,
          n,
          l
        );
        break;
      case 3:
        Xt(
          e,
          t,
          n,
          l
        ), u & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ya(e)));
        break;
      case 12:
        if (u & 2048) {
          Xt(
            e,
            t,
            n,
            l
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, f = c.id, s = c.onPostCommit;
            typeof s == "function" && s(
              f,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (v) {
            pe(t, t.return, v);
          }
        } else
          Xt(
            e,
            t,
            n,
            l
          );
        break;
      case 31:
        Xt(
          e,
          t,
          n,
          l
        );
        break;
      case 13:
        Xt(
          e,
          t,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? Xt(
          e,
          t,
          n,
          l
        ) : Da(e, t) : c._visibility & 2 ? Xt(
          e,
          t,
          n,
          l
        ) : (c._visibility |= 2, Rl(
          e,
          t,
          n,
          l,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && io(f, t);
        break;
      case 24:
        Xt(
          e,
          t,
          n,
          l
        ), u & 2048 && co(t.alternate, t);
        break;
      default:
        Xt(
          e,
          t,
          n,
          l
        );
    }
  }
  function Rl(e, t, n, l, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, f = t, s = n, v = l, z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            c,
            f,
            s,
            v,
            u
          ), Na(8, f);
          break;
        case 23:
          break;
        case 22:
          var M = f.stateNode;
          f.memoizedState !== null ? M._visibility & 2 ? Rl(
            c,
            f,
            s,
            v,
            u
          ) : Da(
            c,
            f
          ) : (M._visibility |= 2, Rl(
            c,
            f,
            s,
            v,
            u
          )), u && z & 2048 && io(
            f.alternate,
            f
          );
          break;
        case 24:
          Rl(
            c,
            f,
            s,
            v,
            u
          ), u && z & 2048 && co(f.alternate, f);
          break;
        default:
          Rl(
            c,
            f,
            s,
            v,
            u
          );
      }
      t = t.sibling;
    }
  }
  function Da(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, l = t, u = l.flags;
        switch (l.tag) {
          case 22:
            Da(n, l), u & 2048 && io(
              l.alternate,
              l
            );
            break;
          case 24:
            Da(n, l), u & 2048 && co(l.alternate, l);
            break;
          default:
            Da(n, l);
        }
        t = t.sibling;
      }
  }
  var Ua = 8192;
  function wl(e, t, n) {
    if (e.subtreeFlags & Ua)
      for (e = e.child; e !== null; )
        td(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function td(e, t, n) {
    switch (e.tag) {
      case 26:
        wl(
          e,
          t,
          n
        ), e.flags & Ua && e.memoizedState !== null && Zv(
          n,
          Gt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        wl(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var l = Gt;
        Gt = ei(e.stateNode.containerInfo), wl(
          e,
          t,
          n
        ), Gt = l;
        break;
      case 22:
        e.memoizedState === null && (l = e.alternate, l !== null && l.memoizedState !== null ? (l = Ua, Ua = 16777216, wl(
          e,
          t,
          n
        ), Ua = l) : wl(
          e,
          t,
          n
        ));
        break;
      default:
        wl(
          e,
          t,
          n
        );
    }
  }
  function nd(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Ca(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          ke = l, ad(
            l,
            e
          );
        }
      nd(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ld(e), e = e.sibling;
  }
  function ld(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ca(e), e.flags & 2048 && An(9, e, e.return);
        break;
      case 3:
        Ca(e);
        break;
      case 12:
        Ca(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Gu(e)) : Ca(e);
        break;
      default:
        Ca(e);
    }
  }
  function Gu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var l = t[n];
          ke = l, ad(
            l,
            e
          );
        }
      nd(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          An(8, t, t.return), Gu(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Gu(t));
          break;
        default:
          Gu(t);
      }
      e = e.sibling;
    }
  }
  function ad(e, t) {
    for (; ke !== null; ) {
      var n = ke;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          An(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          ya(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, ke = l;
      else
        e: for (n = e; ke !== null; ) {
          l = ke;
          var u = l.sibling, c = l.return;
          if ($s(l), l === n) {
            ke = null;
            break e;
          }
          if (u !== null) {
            u.return = c, ke = u;
            break e;
          }
          ke = c;
        }
    }
  }
  var J0 = {
    getCacheForType: function(e) {
      var t = Je(Be), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return Je(Be).controller.signal;
    }
  }, W0 = typeof WeakMap == "function" ? WeakMap : Map, me = 0, ze = null, ne = null, ue = 0, ge = 0, Et = null, xn = !1, Hl = !1, oo = !1, fn = 0, Ze = 0, On = 0, ul = 0, ro = 0, Tt = 0, ql = 0, Za = null, st = null, fo = !1, Xu = 0, ud = 0, Lu = 1 / 0, Qu = null, Mn = null, Qe = 0, Nn = null, Bl = null, sn = 0, so = 0, ho = null, id = null, Ra = 0, mo = null;
  function At() {
    return (me & 2) !== 0 && ue !== 0 ? ue & -ue : O.T !== null ? _o() : Sr();
  }
  function cd() {
    if (Tt === 0)
      if ((ue & 536870912) === 0 || ce) {
        var e = Ia;
        Ia <<= 1, (Ia & 3932160) === 0 && (Ia = 262144), Tt = e;
      } else Tt = 536870912;
    return e = St.current, e !== null && (e.flags |= 32), Tt;
  }
  function dt(e, t, n) {
    (e === ze && (ge === 2 || ge === 9) || e.cancelPendingCommit !== null) && (Yl(e, 0), jn(
      e,
      ue,
      Tt,
      !1
    )), na(e, n), ((me & 2) === 0 || e !== ze) && (e === ze && ((me & 2) === 0 && (ul |= n), Ze === 4 && jn(
      e,
      ue,
      Tt,
      !1
    )), kt(e));
  }
  function od(e, t, n) {
    if ((me & 6) !== 0) throw Error(r(327));
    var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || ta(e, t), u = l ? P0(e, t) : yo(e, t, !0), c = l;
    do {
      if (u === 0) {
        Hl && !l && jn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !F0(n)) {
          u = yo(e, t, !1), c = !1;
          continue;
        }
        if (u === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var f = 0;
          else
            f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            e: {
              var s = e;
              u = Za;
              var v = s.current.memoizedState.isDehydrated;
              if (v && (Yl(s, f).flags |= 256), f = yo(
                s,
                f,
                !1
              ), f !== 2) {
                if (oo && !v) {
                  s.errorRecoveryDisabledLanes |= c, ul |= c, u = 4;
                  break e;
                }
                c = st, st = u, c !== null && (st === null ? st = c : st.push.apply(
                  st,
                  c
                ));
              }
              u = f;
            }
            if (c = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Yl(e, 0), jn(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, c = u, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              jn(
                l,
                t,
                Tt,
                !xn
              );
              break e;
            case 2:
              st = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && (u = Xu + 300 - yt(), 10 < u)) {
            if (jn(
              l,
              t,
              Tt,
              !xn
            ), eu(l, 0, !0) !== 0) break e;
            sn = t, l.timeoutHandle = Bd(
              rd.bind(
                null,
                l,
                n,
                st,
                Qu,
                fo,
                t,
                Tt,
                ul,
                ql,
                xn,
                c,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          rd(
            l,
            n,
            st,
            Qu,
            fo,
            t,
            Tt,
            ul,
            ql,
            xn,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    kt(e);
  }
  function rd(e, t, n, l, u, c, f, s, v, z, M, D, T, x) {
    if (e.timeoutHandle = -1, D = t.subtreeFlags, D & 8192 || (D & 16785408) === 16785408) {
      D = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Jt
      }, td(
        t,
        c,
        D
      );
      var Y = (c & 62914560) === c ? Xu - yt() : (c & 4194048) === c ? ud - yt() : 0;
      if (Y = Rv(
        D,
        Y
      ), Y !== null) {
        sn = c, e.cancelPendingCommit = Y(
          gd.bind(
            null,
            e,
            t,
            c,
            n,
            l,
            u,
            f,
            s,
            v,
            M,
            D,
            null,
            T,
            x
          )
        ), jn(e, c, f, !z);
        return;
      }
    }
    gd(
      e,
      t,
      c,
      n,
      l,
      u,
      f,
      s,
      v
    );
  }
  function F0(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var u = n[l], c = u.getSnapshot;
          u = u.value;
          try {
            if (!bt(c(), u)) return !1;
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
  function jn(e, t, n, l) {
    t &= ~ro, t &= ~ul, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var c = 31 - pt(u), f = 1 << c;
      l[c] = -1, u &= ~f;
    }
    n !== 0 && pr(e, n, t);
  }
  function Vu() {
    return (me & 6) === 0 ? (wa(0), !1) : !0;
  }
  function vo() {
    if (ne !== null) {
      if (ge === 0)
        var e = ne.return;
      else
        e = ne, Pt = Wn = null, jc(e), jl = null, pa = 0, e = ne;
      for (; e !== null; )
        Ys(e.alternate, e), e = e.return;
      ne = null;
    }
  }
  function Yl(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, gv(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), sn = 0, vo(), ze = e, ne = n = Ft(e.current, null), ue = t, ge = 0, Et = null, xn = !1, Hl = ta(e, t), oo = !1, ql = Tt = ro = ul = On = Ze = 0, st = Za = null, fo = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var u = 31 - pt(l), c = 1 << u;
        t |= e[u], l &= ~c;
      }
    return fn = t, du(), n;
  }
  function fd(e, t) {
    F = null, O.H = xa, t === Nl || t === _u ? (t = xf(), ge = 3) : t === pc ? (t = xf(), ge = 4) : ge = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Et = t, ne === null && (Ze = 1, Zu(
      e,
      Dt(t, e.current)
    ));
  }
  function sd() {
    var e = St.current;
    return e === null ? !0 : (ue & 4194048) === ue ? Rt === null : (ue & 62914560) === ue || (ue & 536870912) !== 0 ? e === Rt : !1;
  }
  function dd() {
    var e = O.H;
    return O.H = xa, e === null ? xa : e;
  }
  function hd() {
    var e = O.A;
    return O.A = J0, e;
  }
  function ku() {
    Ze = 4, xn || (ue & 4194048) !== ue && St.current !== null || (Hl = !0), (On & 134217727) === 0 && (ul & 134217727) === 0 || ze === null || jn(
      ze,
      ue,
      Tt,
      !1
    );
  }
  function yo(e, t, n) {
    var l = me;
    me |= 2;
    var u = dd(), c = hd();
    (ze !== e || ue !== t) && (Qu = null, Yl(e, t)), t = !1;
    var f = Ze;
    e: do
      try {
        if (ge !== 0 && ne !== null) {
          var s = ne, v = Et;
          switch (ge) {
            case 8:
              vo(), f = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              St.current === null && (t = !0);
              var z = ge;
              if (ge = 0, Et = null, Gl(e, s, v, z), n && Hl) {
                f = 0;
                break e;
              }
              break;
            default:
              z = ge, ge = 0, Et = null, Gl(e, s, v, z);
          }
        }
        I0(), f = Ze;
        break;
      } catch (M) {
        fd(e, M);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Pt = Wn = null, me = l, O.H = u, O.A = c, ne === null && (ze = null, ue = 0, du()), f;
  }
  function I0() {
    for (; ne !== null; ) md(ne);
  }
  function P0(e, t) {
    var n = me;
    me |= 2;
    var l = dd(), u = hd();
    ze !== e || ue !== t ? (Qu = null, Lu = yt() + 500, Yl(e, t)) : Hl = ta(
      e,
      t
    );
    e: do
      try {
        if (ge !== 0 && ne !== null) {
          t = ne;
          var c = Et;
          t: switch (ge) {
            case 1:
              ge = 0, Et = null, Gl(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Tf(c)) {
                ge = 0, Et = null, vd(t);
                break;
              }
              t = function() {
                ge !== 2 && ge !== 9 || ze !== e || (ge = 7), kt(e);
              }, c.then(t, t);
              break e;
            case 3:
              ge = 7;
              break e;
            case 4:
              ge = 5;
              break e;
            case 7:
              Tf(c) ? (ge = 0, Et = null, vd(t)) : (ge = 0, Et = null, Gl(e, t, c, 7));
              break;
            case 5:
              var f = null;
              switch (ne.tag) {
                case 26:
                  f = ne.memoizedState;
                case 5:
                case 27:
                  var s = ne;
                  if (f ? eh(f) : s.stateNode.complete) {
                    ge = 0, Et = null;
                    var v = s.sibling;
                    if (v !== null) ne = v;
                    else {
                      var z = s.return;
                      z !== null ? (ne = z, Ku(z)) : ne = null;
                    }
                    break t;
                  }
              }
              ge = 0, Et = null, Gl(e, t, c, 5);
              break;
            case 6:
              ge = 0, Et = null, Gl(e, t, c, 6);
              break;
            case 8:
              vo(), Ze = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        ev();
        break;
      } catch (M) {
        fd(e, M);
      }
    while (!0);
    return Pt = Wn = null, O.H = l, O.A = u, me = n, ne !== null ? 0 : (ze = null, ue = 0, du(), Ze);
  }
  function ev() {
    for (; ne !== null && !Em(); )
      md(ne);
  }
  function md(e) {
    var t = qs(e.alternate, e, fn);
    e.memoizedProps = e.pendingProps, t === null ? Ku(e) : ne = t;
  }
  function vd(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Us(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ue
        );
        break;
      case 11:
        t = Us(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ue
        );
        break;
      case 5:
        jc(t);
      default:
        Ys(n, t), t = ne = hf(t, fn), t = qs(n, t, fn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ku(e) : ne = t;
  }
  function Gl(e, t, n, l) {
    Pt = Wn = null, jc(t), jl = null, pa = 0;
    var u = t.return;
    try {
      if (X0(
        e,
        u,
        t,
        n,
        ue
      )) {
        Ze = 1, Zu(
          e,
          Dt(n, e.current)
        ), ne = null;
        return;
      }
    } catch (c) {
      if (u !== null) throw ne = u, c;
      Ze = 1, Zu(
        e,
        Dt(n, e.current)
      ), ne = null;
      return;
    }
    t.flags & 32768 ? (ce || l === 1 ? e = !0 : Hl || (ue & 536870912) !== 0 ? e = !1 : (xn = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = St.current, l !== null && l.tag === 13 && (l.flags |= 16384))), yd(t, e)) : Ku(t);
  }
  function Ku(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        yd(
          t,
          xn
        );
        return;
      }
      e = t.return;
      var n = V0(
        t.alternate,
        t,
        fn
      );
      if (n !== null) {
        ne = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ne = t;
        return;
      }
      ne = t = e;
    } while (t !== null);
    Ze === 0 && (Ze = 5);
  }
  function yd(e, t) {
    do {
      var n = k0(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ne = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ne = e;
        return;
      }
      ne = e = n;
    } while (e !== null);
    Ze = 6, ne = null;
  }
  function gd(e, t, n, l, u, c, f, s, v) {
    e.cancelPendingCommit = null;
    do
      $u();
    while (Qe !== 0);
    if ((me & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (c = t.lanes | t.childLanes, c |= lc, Cm(
        e,
        n,
        c,
        f,
        s,
        v
      ), e === ze && (ne = ze = null, ue = 0), Bl = t, Nn = e, sn = n, so = c, ho = u, id = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, av(Wa, function() {
        return zd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = O.T, O.T = null, u = Z.p, Z.p = 2, f = me, me |= 4;
        try {
          K0(e, t, n);
        } finally {
          me = f, Z.p = u, O.T = l;
        }
      }
      Qe = 1, pd(), bd(), _d();
    }
  }
  function pd() {
    if (Qe === 1) {
      Qe = 0;
      var e = Nn, t = Bl, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = O.T, O.T = null;
        var l = Z.p;
        Z.p = 2;
        var u = me;
        me |= 4;
        try {
          Is(t, e);
          var c = Mo, f = lf(e.containerInfo), s = c.focusedElem, v = c.selectionRange;
          if (f !== s && s && s.ownerDocument && nf(
            s.ownerDocument.documentElement,
            s
          )) {
            if (v !== null && Ii(s)) {
              var z = v.start, M = v.end;
              if (M === void 0 && (M = z), "selectionStart" in s)
                s.selectionStart = z, s.selectionEnd = Math.min(
                  M,
                  s.value.length
                );
              else {
                var D = s.ownerDocument || document, T = D && D.defaultView || window;
                if (T.getSelection) {
                  var x = T.getSelection(), Y = s.textContent.length, $ = Math.min(v.start, Y), Se = v.end === void 0 ? $ : Math.min(v.end, Y);
                  !x.extend && $ > Se && (f = Se, Se = $, $ = f);
                  var b = tf(
                    s,
                    $
                  ), y = tf(
                    s,
                    Se
                  );
                  if (b && y && (x.rangeCount !== 1 || x.anchorNode !== b.node || x.anchorOffset !== b.offset || x.focusNode !== y.node || x.focusOffset !== y.offset)) {
                    var S = D.createRange();
                    S.setStart(b.node, b.offset), x.removeAllRanges(), $ > Se ? (x.addRange(S), x.extend(y.node, y.offset)) : (S.setEnd(y.node, y.offset), x.addRange(S));
                  }
                }
              }
            }
            for (D = [], x = s; x = x.parentNode; )
              x.nodeType === 1 && D.push({
                element: x,
                left: x.scrollLeft,
                top: x.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < D.length; s++) {
              var N = D[s];
              N.element.scrollLeft = N.left, N.element.scrollTop = N.top;
            }
          }
          ii = !!Oo, Mo = Oo = null;
        } finally {
          me = u, Z.p = l, O.T = n;
        }
      }
      e.current = t, Qe = 2;
    }
  }
  function bd() {
    if (Qe === 2) {
      Qe = 0;
      var e = Nn, t = Bl, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = O.T, O.T = null;
        var l = Z.p;
        Z.p = 2;
        var u = me;
        me |= 4;
        try {
          Ks(e, t.alternate, t);
        } finally {
          me = u, Z.p = l, O.T = n;
        }
      }
      Qe = 3;
    }
  }
  function _d() {
    if (Qe === 4 || Qe === 3) {
      Qe = 0, Tm();
      var e = Nn, t = Bl, n = sn, l = id;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Qe = 5 : (Qe = 0, Bl = Nn = null, Sd(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (u === 0 && (Mn = null), Ci(n), t = t.stateNode, gt && typeof gt.onCommitFiberRoot == "function")
        try {
          gt.onCommitFiberRoot(
            ea,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = O.T, u = Z.p, Z.p = 2, O.T = null;
        try {
          for (var c = e.onRecoverableError, f = 0; f < l.length; f++) {
            var s = l[f];
            c(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          O.T = t, Z.p = u;
        }
      }
      (sn & 3) !== 0 && $u(), kt(e), u = e.pendingLanes, (n & 261930) !== 0 && (u & 42) !== 0 ? e === mo ? Ra++ : (Ra = 0, mo = e) : Ra = 0, wa(0);
    }
  }
  function Sd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ya(t)));
  }
  function $u() {
    return pd(), bd(), _d(), zd();
  }
  function zd() {
    if (Qe !== 5) return !1;
    var e = Nn, t = so;
    so = 0;
    var n = Ci(sn), l = O.T, u = Z.p;
    try {
      Z.p = 32 > n ? 32 : n, O.T = null, n = ho, ho = null;
      var c = Nn, f = sn;
      if (Qe = 0, Bl = Nn = null, sn = 0, (me & 6) !== 0) throw Error(r(331));
      var s = me;
      if (me |= 4, ld(c.current), ed(
        c,
        c.current,
        f,
        n
      ), me = s, wa(0, !1), gt && typeof gt.onPostCommitFiberRoot == "function")
        try {
          gt.onPostCommitFiberRoot(ea, c);
        } catch {
        }
      return !0;
    } finally {
      Z.p = u, O.T = l, Sd(e, t);
    }
  }
  function Ed(e, t, n) {
    t = Dt(n, t), t = Vc(e.stateNode, t, 2), e = zn(e, t, 2), e !== null && (na(e, 2), kt(e));
  }
  function pe(e, t, n) {
    if (e.tag === 3)
      Ed(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Ed(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Mn === null || !Mn.has(l))) {
            e = Dt(n, e), n = Ts(2), l = zn(t, n, 2), l !== null && (As(
              n,
              l,
              t,
              e
            ), na(l, 2), kt(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function go(e, t, n) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new W0();
      var u = /* @__PURE__ */ new Set();
      l.set(t, u);
    } else
      u = l.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), l.set(t, u));
    u.has(n) || (oo = !0, u.add(n), e = tv.bind(null, e, t, n), t.then(e, e));
  }
  function tv(e, t, n) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ze === e && (ue & n) === n && (Ze === 4 || Ze === 3 && (ue & 62914560) === ue && 300 > yt() - Xu ? (me & 2) === 0 && Yl(e, 0) : ro |= n, ql === ue && (ql = 0)), kt(e);
  }
  function Td(e, t) {
    t === 0 && (t = gr()), e = Kn(e, t), e !== null && (na(e, t), kt(e));
  }
  function nv(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Td(e, n);
  }
  function lv(e, t) {
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
        throw Error(r(314));
    }
    l !== null && l.delete(t), Td(e, n);
  }
  function av(e, t) {
    return Ni(e, t);
  }
  var Ju = null, Xl = null, po = !1, Wu = !1, bo = !1, Dn = 0;
  function kt(e) {
    e !== Xl && e.next === null && (Xl === null ? Ju = Xl = e : Xl = Xl.next = e), Wu = !0, po || (po = !0, iv());
  }
  function wa(e, t) {
    if (!bo && Wu) {
      bo = !0;
      do
        for (var n = !1, l = Ju; l !== null; ) {
          if (e !== 0) {
            var u = l.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var f = l.suspendedLanes, s = l.pingedLanes;
              c = (1 << 31 - pt(42 | e) + 1) - 1, c &= u & ~(f & ~s), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Md(l, c));
          } else
            c = ue, c = eu(
              l,
              l === ze ? c : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (c & 3) === 0 || ta(l, c) || (n = !0, Md(l, c));
          l = l.next;
        }
      while (n);
      bo = !1;
    }
  }
  function uv() {
    Ad();
  }
  function Ad() {
    Wu = po = !1;
    var e = 0;
    Dn !== 0 && yv() && (e = Dn);
    for (var t = yt(), n = null, l = Ju; l !== null; ) {
      var u = l.next, c = xd(l, t);
      c === 0 ? (l.next = null, n === null ? Ju = u : n.next = u, u === null && (Xl = n)) : (n = l, (e !== 0 || (c & 3) !== 0) && (Wu = !0)), l = u;
    }
    Qe !== 0 && Qe !== 5 || wa(e), Dn !== 0 && (Dn = 0);
  }
  function xd(e, t) {
    for (var n = e.suspendedLanes, l = e.pingedLanes, u = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var f = 31 - pt(c), s = 1 << f, v = u[f];
      v === -1 ? ((s & n) === 0 || (s & l) !== 0) && (u[f] = Um(s, t)) : v <= t && (e.expiredLanes |= s), c &= ~s;
    }
    if (t = ze, n = ue, n = eu(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, n === 0 || e === t && (ge === 2 || ge === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && ji(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || ta(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (l !== null && ji(l), Ci(n)) {
        case 2:
        case 8:
          n = vr;
          break;
        case 32:
          n = Wa;
          break;
        case 268435456:
          n = yr;
          break;
        default:
          n = Wa;
      }
      return l = Od.bind(null, e), n = Ni(n, l), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return l !== null && l !== null && ji(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Od(e, t) {
    if (Qe !== 0 && Qe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if ($u() && e.callbackNode !== n)
      return null;
    var l = ue;
    return l = eu(
      e,
      e === ze ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (od(e, l, t), xd(e, yt()), e.callbackNode != null && e.callbackNode === n ? Od.bind(null, e) : null);
  }
  function Md(e, t) {
    if ($u()) return null;
    od(e, t, !0);
  }
  function iv() {
    pv(function() {
      (me & 6) !== 0 ? Ni(
        mr,
        uv
      ) : Ad();
    });
  }
  function _o() {
    if (Dn === 0) {
      var e = Ol;
      e === 0 && (e = Fa, Fa <<= 1, (Fa & 261888) === 0 && (Fa = 256)), Dn = e;
    }
    return Dn;
  }
  function Nd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : au("" + e);
  }
  function jd(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function cv(e, t, n, l, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var c = Nd(
        (u[it] || null).action
      ), f = l.submitter;
      f && (t = (t = f[it] || null) ? Nd(t.formAction) : f.getAttribute("formAction"), t !== null && (c = t, f = null));
      var s = new ou(
        "action",
        "action",
        null,
        l,
        u
      );
      e.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Dn !== 0) {
                  var v = f ? jd(u, f) : new FormData(u);
                  Bc(
                    n,
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
                typeof c == "function" && (s.preventDefault(), v = f ? jd(u, f) : new FormData(u), Bc(
                  n,
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
  for (var So = 0; So < nc.length; So++) {
    var zo = nc[So], ov = zo.toLowerCase(), rv = zo[0].toUpperCase() + zo.slice(1);
    Yt(
      ov,
      "on" + rv
    );
  }
  Yt(cf, "onAnimationEnd"), Yt(of, "onAnimationIteration"), Yt(rf, "onAnimationStart"), Yt("dblclick", "onDoubleClick"), Yt("focusin", "onFocus"), Yt("focusout", "onBlur"), Yt(A0, "onTransitionRun"), Yt(x0, "onTransitionStart"), Yt(O0, "onTransitionCancel"), Yt(ff, "onTransitionEnd"), hl("onMouseEnter", ["mouseout", "mouseover"]), hl("onMouseLeave", ["mouseout", "mouseover"]), hl("onPointerEnter", ["pointerout", "pointerover"]), hl("onPointerLeave", ["pointerout", "pointerover"]), Ln(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ln(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ln("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ln(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ln(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ln(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ha = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), fv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ha)
  );
  function Dd(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var l = e[n], u = l.event;
      l = l.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var f = l.length - 1; 0 <= f; f--) {
            var s = l[f], v = s.instance, z = s.currentTarget;
            if (s = s.listener, v !== c && u.isPropagationStopped())
              break e;
            c = s, u.currentTarget = z;
            try {
              c(u);
            } catch (M) {
              su(M);
            }
            u.currentTarget = null, c = v;
          }
        else
          for (f = 0; f < l.length; f++) {
            if (s = l[f], v = s.instance, z = s.currentTarget, s = s.listener, v !== c && u.isPropagationStopped())
              break e;
            c = s, u.currentTarget = z;
            try {
              c(u);
            } catch (M) {
              su(M);
            }
            u.currentTarget = null, c = v;
          }
      }
    }
  }
  function le(e, t) {
    var n = t[Zi];
    n === void 0 && (n = t[Zi] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    n.has(l) || (Ud(t, e, 2, !1), n.add(l));
  }
  function Eo(e, t, n) {
    var l = 0;
    t && (l |= 4), Ud(
      n,
      e,
      l,
      t
    );
  }
  var Fu = "_reactListening" + Math.random().toString(36).slice(2);
  function To(e) {
    if (!e[Fu]) {
      e[Fu] = !0, Tr.forEach(function(n) {
        n !== "selectionchange" && (fv.has(n) || Eo(n, !1, e), Eo(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Fu] || (t[Fu] = !0, Eo("selectionchange", !1, t));
    }
  }
  function Ud(e, t, n, l) {
    switch (ch(t)) {
      case 2:
        var u = qv;
        break;
      case 8:
        u = Bv;
        break;
      default:
        u = Bo;
    }
    n = u.bind(
      null,
      t,
      n,
      e
    ), u = void 0, !Li || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), l ? u !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, n, !0) : u !== void 0 ? e.addEventListener(t, n, {
      passive: u
    }) : e.addEventListener(t, n, !1);
  }
  function Ao(e, t, n, l, u) {
    var c = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
        if (l === null) return;
        var f = l.tag;
        if (f === 3 || f === 4) {
          var s = l.stateNode.containerInfo;
          if (s === u) break;
          if (f === 4)
            for (f = l.return; f !== null; ) {
              var v = f.tag;
              if ((v === 3 || v === 4) && f.stateNode.containerInfo === u)
                return;
              f = f.return;
            }
          for (; s !== null; ) {
            if (f = fl(s), f === null) return;
            if (v = f.tag, v === 5 || v === 6 || v === 26 || v === 27) {
              l = c = f;
              continue e;
            }
            s = s.parentNode;
          }
        }
        l = l.return;
      }
    wr(function() {
      var z = c, M = Gi(n), D = [];
      e: {
        var T = sf.get(e);
        if (T !== void 0) {
          var x = ou, Y = e;
          switch (e) {
            case "keypress":
              if (iu(n) === 0) break e;
            case "keydown":
            case "keyup":
              x = l0;
              break;
            case "focusin":
              Y = "focus", x = Ki;
              break;
            case "focusout":
              Y = "blur", x = Ki;
              break;
            case "beforeblur":
            case "afterblur":
              x = Ki;
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
              x = Br;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = Vm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = i0;
              break;
            case cf:
            case of:
            case rf:
              x = $m;
              break;
            case ff:
              x = o0;
              break;
            case "scroll":
            case "scrollend":
              x = Lm;
              break;
            case "wheel":
              x = f0;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = Wm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = Gr;
              break;
            case "toggle":
            case "beforetoggle":
              x = d0;
          }
          var $ = (t & 4) !== 0, Se = !$ && (e === "scroll" || e === "scrollend"), b = $ ? T !== null ? T + "Capture" : null : T;
          $ = [];
          for (var y = z, S; y !== null; ) {
            var N = y;
            if (S = N.stateNode, N = N.tag, N !== 5 && N !== 26 && N !== 27 || S === null || b === null || (N = ua(y, b), N != null && $.push(
              qa(y, N, S)
            )), Se) break;
            y = y.return;
          }
          0 < $.length && (T = new x(
            T,
            Y,
            null,
            n,
            M
          ), D.push({ event: T, listeners: $ }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", T && n !== Yi && (Y = n.relatedTarget || n.fromElement) && (fl(Y) || Y[rl]))
            break e;
          if ((x || T) && (T = M.window === M ? M : (T = M.ownerDocument) ? T.defaultView || T.parentWindow : window, x ? (Y = n.relatedTarget || n.toElement, x = z, Y = Y ? fl(Y) : null, Y !== null && (Se = h(Y), $ = Y.tag, Y !== Se || $ !== 5 && $ !== 27 && $ !== 6) && (Y = null)) : (x = null, Y = z), x !== Y)) {
            if ($ = Br, N = "onMouseLeave", b = "onMouseEnter", y = "mouse", (e === "pointerout" || e === "pointerover") && ($ = Gr, N = "onPointerLeave", b = "onPointerEnter", y = "pointer"), Se = x == null ? T : aa(x), S = Y == null ? T : aa(Y), T = new $(
              N,
              y + "leave",
              x,
              n,
              M
            ), T.target = Se, T.relatedTarget = S, N = null, fl(M) === z && ($ = new $(
              b,
              y + "enter",
              Y,
              n,
              M
            ), $.target = S, $.relatedTarget = Se, N = $), Se = N, x && Y)
              t: {
                for ($ = sv, b = x, y = Y, S = 0, N = b; N; N = $(N))
                  S++;
                N = 0;
                for (var Q = y; Q; Q = $(Q))
                  N++;
                for (; 0 < S - N; )
                  b = $(b), S--;
                for (; 0 < N - S; )
                  y = $(y), N--;
                for (; S--; ) {
                  if (b === y || y !== null && b === y.alternate) {
                    $ = b;
                    break t;
                  }
                  b = $(b), y = $(y);
                }
                $ = null;
              }
            else $ = null;
            x !== null && Cd(
              D,
              T,
              x,
              $,
              !1
            ), Y !== null && Se !== null && Cd(
              D,
              Se,
              Y,
              $,
              !0
            );
          }
        }
        e: {
          if (T = z ? aa(z) : window, x = T.nodeName && T.nodeName.toLowerCase(), x === "select" || x === "input" && T.type === "file")
            var fe = Jr;
          else if (Kr(T))
            if (Wr)
              fe = z0;
            else {
              fe = _0;
              var X = b0;
            }
          else
            x = T.nodeName, !x || x.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? z && Bi(z.elementType) && (fe = Jr) : fe = S0;
          if (fe && (fe = fe(e, z))) {
            $r(
              D,
              fe,
              n,
              M
            );
            break e;
          }
          X && X(e, T, z), e === "focusout" && z && T.type === "number" && z.memoizedProps.value != null && qi(T, "number", T.value);
        }
        switch (X = z ? aa(z) : window, e) {
          case "focusin":
            (Kr(X) || X.contentEditable === "true") && (bl = X, Pi = z, ha = null);
            break;
          case "focusout":
            ha = Pi = bl = null;
            break;
          case "mousedown":
            ec = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ec = !1, af(D, n, M);
            break;
          case "selectionchange":
            if (T0) break;
          case "keydown":
          case "keyup":
            af(D, n, M);
        }
        var I;
        if (Ji)
          e: {
            switch (e) {
              case "compositionstart":
                var ie = "onCompositionStart";
                break e;
              case "compositionend":
                ie = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ie = "onCompositionUpdate";
                break e;
            }
            ie = void 0;
          }
        else
          pl ? Vr(e, n) && (ie = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ie = "onCompositionStart");
        ie && (Xr && n.locale !== "ko" && (pl || ie !== "onCompositionStart" ? ie === "onCompositionEnd" && pl && (I = Hr()) : (vn = M, Qi = "value" in vn ? vn.value : vn.textContent, pl = !0)), X = Iu(z, ie), 0 < X.length && (ie = new Yr(
          ie,
          e,
          null,
          n,
          M
        ), D.push({ event: ie, listeners: X }), I ? ie.data = I : (I = kr(n), I !== null && (ie.data = I)))), (I = m0 ? v0(e, n) : y0(e, n)) && (ie = Iu(z, "onBeforeInput"), 0 < ie.length && (X = new Yr(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          M
        ), D.push({
          event: X,
          listeners: ie
        }), X.data = I)), cv(
          D,
          e,
          z,
          n,
          M
        );
      }
      Dd(D, t);
    });
  }
  function qa(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Iu(e, t) {
    for (var n = t + "Capture", l = []; e !== null; ) {
      var u = e, c = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || c === null || (u = ua(e, n), u != null && l.unshift(
        qa(e, u, c)
      ), u = ua(e, t), u != null && l.push(
        qa(e, u, c)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function sv(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Cd(e, t, n, l, u) {
    for (var c = t._reactName, f = []; n !== null && n !== l; ) {
      var s = n, v = s.alternate, z = s.stateNode;
      if (s = s.tag, v !== null && v === l) break;
      s !== 5 && s !== 26 && s !== 27 || z === null || (v = z, u ? (z = ua(n, c), z != null && f.unshift(
        qa(n, z, v)
      )) : u || (z = ua(n, c), z != null && f.push(
        qa(n, z, v)
      ))), n = n.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var dv = /\r\n?/g, hv = /\u0000|\uFFFD/g;
  function Zd(e) {
    return (typeof e == "string" ? e : "" + e).replace(dv, `
`).replace(hv, "");
  }
  function Rd(e, t) {
    return t = Zd(t), Zd(e) === t;
  }
  function _e(e, t, n, l, u, c) {
    switch (n) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || vl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && vl(e, "" + l);
        break;
      case "className":
        nu(e, "class", l);
        break;
      case "tabIndex":
        nu(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        nu(e, n, l);
        break;
      case "style":
        Zr(e, l, c);
        break;
      case "data":
        if (t !== "object") {
          nu(e, "data", l);
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
        l = au("" + l), e.setAttribute(n, l);
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
          typeof c == "function" && (n === "formAction" ? (t !== "input" && _e(e, t, "name", u.name, u, null), _e(
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
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(n);
          break;
        }
        l = au("" + l), e.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (e.onclick = Jt);
        break;
      case "onScroll":
        l != null && le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && le("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(r(60));
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
        n = au("" + l), e.setAttributeNS(
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
        le("beforetoggle", e), le("toggle", e), tu(e, "popover", l);
        break;
      case "xlinkActuate":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        tu(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Gm.get(n) || n, tu(e, n, l));
    }
  }
  function xo(e, t, n, l, u, c) {
    switch (n) {
      case "style":
        Zr(e, l, c);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (u.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? vl(e, l) : (typeof l == "number" || typeof l == "bigint") && vl(e, "" + l);
        break;
      case "onScroll":
        l != null && le("scroll", e);
        break;
      case "onScrollEnd":
        l != null && le("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = Jt);
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
        if (!Ar.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), t = n.slice(2, u ? n.length - 7 : void 0), c = e[it] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, u), typeof l == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, l, u);
              break e;
            }
            n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : tu(e, n, l);
          }
    }
  }
  function Fe(e, t, n) {
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
        le("error", e), le("load", e);
        var l = !1, u = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var f = n[c];
            if (f != null)
              switch (c) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  _e(e, t, c, f, n, null);
              }
          }
        u && _e(e, t, "srcSet", n.srcSet, n, null), l && _e(e, t, "src", n.src, n, null);
        return;
      case "input":
        le("invalid", e);
        var s = c = f = u = null, v = null, z = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var M = n[l];
            if (M != null)
              switch (l) {
                case "name":
                  u = M;
                  break;
                case "type":
                  f = M;
                  break;
                case "checked":
                  v = M;
                  break;
                case "defaultChecked":
                  z = M;
                  break;
                case "value":
                  c = M;
                  break;
                case "defaultValue":
                  s = M;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (M != null)
                    throw Error(r(137, t));
                  break;
                default:
                  _e(e, t, l, M, n, null);
              }
          }
        jr(
          e,
          c,
          s,
          v,
          z,
          f,
          u,
          !1
        );
        return;
      case "select":
        le("invalid", e), l = f = c = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (s = n[u], s != null))
            switch (u) {
              case "value":
                c = s;
                break;
              case "defaultValue":
                f = s;
                break;
              case "multiple":
                l = s;
              default:
                _e(e, t, u, s, n, null);
            }
        t = c, n = f, e.multiple = !!l, t != null ? ml(e, !!l, t, !1) : n != null && ml(e, !!l, n, !0);
        return;
      case "textarea":
        le("invalid", e), c = u = l = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (s = n[f], s != null))
            switch (f) {
              case "value":
                l = s;
                break;
              case "defaultValue":
                u = s;
                break;
              case "children":
                c = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                _e(e, t, f, s, n, null);
            }
        Ur(e, l, u, c);
        return;
      case "option":
        for (v in n)
          if (n.hasOwnProperty(v) && (l = n[v], l != null))
            switch (v) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                _e(e, t, v, l, n, null);
            }
        return;
      case "dialog":
        le("beforetoggle", e), le("toggle", e), le("cancel", e), le("close", e);
        break;
      case "iframe":
      case "object":
        le("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ha.length; l++)
          le(Ha[l], e);
        break;
      case "image":
        le("error", e), le("load", e);
        break;
      case "details":
        le("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        le("error", e), le("load", e);
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
                throw Error(r(137, t));
              default:
                _e(e, t, z, l, n, null);
            }
        return;
      default:
        if (Bi(t)) {
          for (M in n)
            n.hasOwnProperty(M) && (l = n[M], l !== void 0 && xo(
              e,
              t,
              M,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (s in n)
      n.hasOwnProperty(s) && (l = n[s], l != null && _e(e, t, s, l, n, null));
  }
  function mv(e, t, n, l) {
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
        var u = null, c = null, f = null, s = null, v = null, z = null, M = null;
        for (x in n) {
          var D = n[x];
          if (n.hasOwnProperty(x) && D != null)
            switch (x) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                v = D;
              default:
                l.hasOwnProperty(x) || _e(e, t, x, null, l, D);
            }
        }
        for (var T in l) {
          var x = l[T];
          if (D = n[T], l.hasOwnProperty(T) && (x != null || D != null))
            switch (T) {
              case "type":
                c = x;
                break;
              case "name":
                u = x;
                break;
              case "checked":
                z = x;
                break;
              case "defaultChecked":
                M = x;
                break;
              case "value":
                f = x;
                break;
              case "defaultValue":
                s = x;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(r(137, t));
                break;
              default:
                x !== D && _e(
                  e,
                  t,
                  T,
                  x,
                  l,
                  D
                );
            }
        }
        Hi(
          e,
          f,
          s,
          v,
          z,
          M,
          c,
          u
        );
        return;
      case "select":
        x = f = s = T = null;
        for (c in n)
          if (v = n[c], n.hasOwnProperty(c) && v != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                x = v;
              default:
                l.hasOwnProperty(c) || _e(
                  e,
                  t,
                  c,
                  null,
                  l,
                  v
                );
            }
        for (u in l)
          if (c = l[u], v = n[u], l.hasOwnProperty(u) && (c != null || v != null))
            switch (u) {
              case "value":
                T = c;
                break;
              case "defaultValue":
                s = c;
                break;
              case "multiple":
                f = c;
              default:
                c !== v && _e(
                  e,
                  t,
                  u,
                  c,
                  l,
                  v
                );
            }
        t = s, n = f, l = x, T != null ? ml(e, !!n, T, !1) : !!l != !!n && (t != null ? ml(e, !!n, t, !0) : ml(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        x = T = null;
        for (s in n)
          if (u = n[s], n.hasOwnProperty(s) && u != null && !l.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                _e(e, t, s, null, l, u);
            }
        for (f in l)
          if (u = l[f], c = n[f], l.hasOwnProperty(f) && (u != null || c != null))
            switch (f) {
              case "value":
                T = u;
                break;
              case "defaultValue":
                x = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(r(91));
                break;
              default:
                u !== c && _e(e, t, f, u, l, c);
            }
        Dr(e, T, x);
        return;
      case "option":
        for (var Y in n)
          if (T = n[Y], n.hasOwnProperty(Y) && T != null && !l.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                e.selected = !1;
                break;
              default:
                _e(
                  e,
                  t,
                  Y,
                  null,
                  l,
                  T
                );
            }
        for (v in l)
          if (T = l[v], x = n[v], l.hasOwnProperty(v) && T !== x && (T != null || x != null))
            switch (v) {
              case "selected":
                e.selected = T && typeof T != "function" && typeof T != "symbol";
                break;
              default:
                _e(
                  e,
                  t,
                  v,
                  T,
                  l,
                  x
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
        for (var $ in n)
          T = n[$], n.hasOwnProperty($) && T != null && !l.hasOwnProperty($) && _e(e, t, $, null, l, T);
        for (z in l)
          if (T = l[z], x = n[z], l.hasOwnProperty(z) && T !== x && (T != null || x != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(r(137, t));
                break;
              default:
                _e(
                  e,
                  t,
                  z,
                  T,
                  l,
                  x
                );
            }
        return;
      default:
        if (Bi(t)) {
          for (var Se in n)
            T = n[Se], n.hasOwnProperty(Se) && T !== void 0 && !l.hasOwnProperty(Se) && xo(
              e,
              t,
              Se,
              void 0,
              l,
              T
            );
          for (M in l)
            T = l[M], x = n[M], !l.hasOwnProperty(M) || T === x || T === void 0 && x === void 0 || xo(
              e,
              t,
              M,
              T,
              l,
              x
            );
          return;
        }
    }
    for (var b in n)
      T = n[b], n.hasOwnProperty(b) && T != null && !l.hasOwnProperty(b) && _e(e, t, b, null, l, T);
    for (D in l)
      T = l[D], x = n[D], !l.hasOwnProperty(D) || T === x || T == null && x == null || _e(e, t, D, T, l, x);
  }
  function wd(e) {
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
  function vv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var u = n[l], c = u.transferSize, f = u.initiatorType, s = u.duration;
        if (c && s && wd(f)) {
          for (f = 0, s = u.responseEnd, l += 1; l < n.length; l++) {
            var v = n[l], z = v.startTime;
            if (z > s) break;
            var M = v.transferSize, D = v.initiatorType;
            M && wd(D) && (v = v.responseEnd, f += M * (v < s ? 1 : (s - z) / (v - z)));
          }
          if (--l, t += 8 * (c + f) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Oo = null, Mo = null;
  function Pu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Hd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function qd(e, t) {
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
  function No(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var jo = null;
  function yv() {
    var e = window.event;
    return e && e.type === "popstate" ? e === jo ? !1 : (jo = e, !0) : (jo = null, !1);
  }
  var Bd = typeof setTimeout == "function" ? setTimeout : void 0, gv = typeof clearTimeout == "function" ? clearTimeout : void 0, Yd = typeof Promise == "function" ? Promise : void 0, pv = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yd < "u" ? function(e) {
    return Yd.resolve(null).then(e).catch(bv);
  } : Bd;
  function bv(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Un(e) {
    return e === "head";
  }
  function Gd(e, t) {
    var n = t, l = 0;
    do {
      var u = n.nextSibling;
      if (e.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (l === 0) {
            e.removeChild(u), kl(t);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Ba(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Ba(n);
          for (var c = n.firstChild; c; ) {
            var f = c.nextSibling, s = c.nodeName;
            c[la] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = f;
          }
        } else
          n === "body" && Ba(e.ownerDocument.body);
      n = u;
    } while (n);
    kl(t);
  }
  function Xd(e, t) {
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
  function Do(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Do(n), Ri(n);
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
  function _v(e, t, n, l) {
    for (; e.nodeType === 1; ) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[la])
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
      if (e = wt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Sv(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = wt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ld(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = wt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Uo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Co(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function zv(e, t) {
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
  function wt(e) {
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
  var Zo = null;
  function Qd(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return wt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Vd(e) {
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
  function kd(e, t, n) {
    switch (t = Pu(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(r(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(r(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function Ba(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ri(e);
  }
  var Ht = /* @__PURE__ */ new Map(), Kd = /* @__PURE__ */ new Set();
  function ei(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var dn = Z.d;
  Z.d = {
    f: Ev,
    r: Tv,
    D: Av,
    C: xv,
    L: Ov,
    m: Mv,
    X: jv,
    S: Nv,
    M: Dv
  };
  function Ev() {
    var e = dn.f(), t = Vu();
    return e || t;
  }
  function Tv(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? fs(t) : dn.r(e);
  }
  var Ll = typeof document > "u" ? null : document;
  function $d(e, t, n) {
    var l = Ll;
    if (l && typeof t == "string" && t) {
      var u = Nt(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Kd.has(u) || (Kd.add(u), e = { rel: e, crossOrigin: n, href: t }, l.querySelector(u) === null && (t = l.createElement("link"), Fe(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function Av(e) {
    dn.D(e), $d("dns-prefetch", e, null);
  }
  function xv(e, t) {
    dn.C(e, t), $d("preconnect", e, t);
  }
  function Ov(e, t, n) {
    dn.L(e, t, n);
    var l = Ll;
    if (l && e && t) {
      var u = 'link[rel="preload"][as="' + Nt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + Nt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + Nt(
        n.imageSizes
      ) + '"]')) : u += '[href="' + Nt(e) + '"]';
      var c = u;
      switch (t) {
        case "style":
          c = Ql(e);
          break;
        case "script":
          c = Vl(e);
      }
      Ht.has(c) || (e = C(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Ht.set(c, e), l.querySelector(u) !== null || t === "style" && l.querySelector(Ya(c)) || t === "script" && l.querySelector(Ga(c)) || (t = l.createElement("link"), Fe(t, "link", e), Ve(t), l.head.appendChild(t)));
    }
  }
  function Mv(e, t) {
    dn.m(e, t);
    var n = Ll;
    if (n && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + Nt(l) + '"][href="' + Nt(e) + '"]', c = u;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Vl(e);
      }
      if (!Ht.has(c) && (e = C({ rel: "modulepreload", href: e }, t), Ht.set(c, e), n.querySelector(u) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ga(c)))
              return;
        }
        l = n.createElement("link"), Fe(l, "link", e), Ve(l), n.head.appendChild(l);
      }
    }
  }
  function Nv(e, t, n) {
    dn.S(e, t, n);
    var l = Ll;
    if (l && e) {
      var u = dl(l).hoistableStyles, c = Ql(e);
      t = t || "default";
      var f = u.get(c);
      if (!f) {
        var s = { loading: 0, preload: null };
        if (f = l.querySelector(
          Ya(c)
        ))
          s.loading = 5;
        else {
          e = C(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Ht.get(c)) && Ro(e, n);
          var v = f = l.createElement("link");
          Ve(v), Fe(v, "link", e), v._p = new Promise(function(z, M) {
            v.onload = z, v.onerror = M;
          }), v.addEventListener("load", function() {
            s.loading |= 1;
          }), v.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, ti(f, t, l);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: s
        }, u.set(c, f);
      }
    }
  }
  function jv(e, t) {
    dn.X(e, t);
    var n = Ll;
    if (n && e) {
      var l = dl(n).hoistableScripts, u = Vl(e), c = l.get(u);
      c || (c = n.querySelector(Ga(u)), c || (e = C({ src: e, async: !0 }, t), (t = Ht.get(u)) && wo(e, t), c = n.createElement("script"), Ve(c), Fe(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function Dv(e, t) {
    dn.M(e, t);
    var n = Ll;
    if (n && e) {
      var l = dl(n).hoistableScripts, u = Vl(e), c = l.get(u);
      c || (c = n.querySelector(Ga(u)), c || (e = C({ src: e, async: !0, type: "module" }, t), (t = Ht.get(u)) && wo(e, t), c = n.createElement("script"), Ve(c), Fe(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, l.set(u, c));
    }
  }
  function Jd(e, t, n, l) {
    var u = (u = K.current) ? ei(u) : null;
    if (!u) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Ql(n.href), n = dl(
          u
        ).hoistableStyles, l = n.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Ql(n.href);
          var c = dl(
            u
          ).hoistableStyles, f = c.get(e);
          if (f || (u = u.ownerDocument || u, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, f), (c = u.querySelector(
            Ya(e)
          )) && !c._p && (f.instance = c, f.state.loading = 5), Ht.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Ht.set(e, n), c || Uv(
            u,
            e,
            n,
            f.state
          ))), t && l === null)
            throw Error(r(528, ""));
          return f;
        }
        if (t && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Vl(n), n = dl(
          u
        ).hoistableScripts, l = n.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function Ql(e) {
    return 'href="' + Nt(e) + '"';
  }
  function Ya(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Wd(e) {
    return C({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Uv(e, t, n, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Fe(t, "link", n), Ve(t), e.head.appendChild(t));
  }
  function Vl(e) {
    return '[src="' + Nt(e) + '"]';
  }
  function Ga(e) {
    return "script[async]" + e;
  }
  function Fd(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + Nt(n.href) + '"]'
          );
          if (l)
            return t.instance = l, Ve(l), l;
          var u = C({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Ve(l), Fe(l, "style", u), ti(l, n.precedence, e), t.instance = l;
        case "stylesheet":
          u = Ql(n.href);
          var c = e.querySelector(
            Ya(u)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, Ve(c), c;
          l = Wd(n), (u = Ht.get(u)) && Ro(l, u), c = (e.ownerDocument || e).createElement("link"), Ve(c);
          var f = c;
          return f._p = new Promise(function(s, v) {
            f.onload = s, f.onerror = v;
          }), Fe(c, "link", l), t.state.loading |= 4, ti(c, n.precedence, e), t.instance = c;
        case "script":
          return c = Vl(n.src), (u = e.querySelector(
            Ga(c)
          )) ? (t.instance = u, Ve(u), u) : (l = n, (u = Ht.get(c)) && (l = C({}, n), wo(l, u)), e = e.ownerDocument || e, u = e.createElement("script"), Ve(u), Fe(u, "link", l), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, ti(l, n.precedence, e));
    return t.instance;
  }
  function ti(e, t, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = l.length ? l[l.length - 1] : null, c = u, f = 0; f < l.length; f++) {
      var s = l[f];
      if (s.dataset.precedence === t) c = s;
      else if (c !== u) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Ro(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function wo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ni = null;
  function Id(e, t, n) {
    if (ni === null) {
      var l = /* @__PURE__ */ new Map(), u = ni = /* @__PURE__ */ new Map();
      u.set(n, l);
    } else
      u = ni, l = u.get(n), l || (l = /* @__PURE__ */ new Map(), u.set(n, l));
    if (l.has(e)) return l;
    for (l.set(e, null), n = n.getElementsByTagName(e), u = 0; u < n.length; u++) {
      var c = n[u];
      if (!(c[la] || c[Ke] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = c.getAttribute(t) || "";
        f = e + f;
        var s = l.get(f);
        s ? s.push(c) : l.set(f, [c]);
      }
    }
    return l;
  }
  function Pd(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Cv(e, t, n) {
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
  function eh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Zv(e, t, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = Ql(l.href), c = t.querySelector(
          Ya(u)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = li.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, Ve(c);
          return;
        }
        c = t.ownerDocument || t, l = Wd(l), (u = Ht.get(u)) && Ro(l, u), c = c.createElement("link"), Ve(c);
        var f = c;
        f._p = new Promise(function(s, v) {
          f.onload = s, f.onerror = v;
        }), Fe(c, "link", l), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = li.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Ho = 0;
  function Rv(e, t) {
    return e.stylesheets && e.count === 0 && ui(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (e.stylesheets && ui(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ho === 0 && (Ho = 62500 * vv());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ui(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Ho ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(l), clearTimeout(u);
      };
    } : null;
  }
  function li() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ui(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ai = null;
  function ui(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ai = /* @__PURE__ */ new Map(), t.forEach(wv, e), ai = null, li.call(e));
  }
  function wv(e, t) {
    if (!(t.state.loading & 4)) {
      var n = ai.get(e);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), ai.set(e, n);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < u.length; c++) {
          var f = u[c];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), l = f);
        }
        l && n.set(null, l);
      }
      u = t.instance, f = u.getAttribute("data-precedence"), c = n.get(f) || l, c === l && n.set(null, u), n.set(f, u), this.count++, l = li.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), c ? c.parentNode.insertBefore(u, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Xa = {
    $$typeof: de,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0
  };
  function Hv(e, t, n, l, u, c, f, s, v) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Di(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Di(0), this.hiddenUpdates = Di(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = c, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = v, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function th(e, t, n, l, u, c, f, s, v, z, M, D) {
    return e = new Hv(
      e,
      t,
      n,
      f,
      v,
      z,
      M,
      D,
      s
    ), t = 1, c === !0 && (t |= 24), c = _t(3, null, null, t), e.current = c, c.stateNode = e, t = vc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: t
    }, bc(c), e;
  }
  function nh(e) {
    return e ? (e = zl, e) : zl;
  }
  function lh(e, t, n, l, u, c) {
    u = nh(u), l.context === null ? l.context = u : l.pendingContext = u, l = Sn(t), l.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (l.callback = c), n = zn(e, l, t), n !== null && (dt(n, e, t), _a(n, e, t));
  }
  function ah(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function qo(e, t) {
    ah(e, t), (e = e.alternate) && ah(e, t);
  }
  function uh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Kn(e, 67108864);
      t !== null && dt(t, e, 67108864), qo(e, 67108864);
    }
  }
  function ih(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = At();
      t = Ui(t);
      var n = Kn(e, t);
      n !== null && dt(n, e, t), qo(e, t);
    }
  }
  var ii = !0;
  function qv(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = Z.p;
    try {
      Z.p = 2, Bo(e, t, n, l);
    } finally {
      Z.p = c, O.T = u;
    }
  }
  function Bv(e, t, n, l) {
    var u = O.T;
    O.T = null;
    var c = Z.p;
    try {
      Z.p = 8, Bo(e, t, n, l);
    } finally {
      Z.p = c, O.T = u;
    }
  }
  function Bo(e, t, n, l) {
    if (ii) {
      var u = Yo(l);
      if (u === null)
        Ao(
          e,
          t,
          l,
          ci,
          n
        ), oh(e, l);
      else if (Gv(
        u,
        e,
        t,
        n,
        l
      ))
        l.stopPropagation();
      else if (oh(e, l), t & 4 && -1 < Yv.indexOf(e)) {
        for (; u !== null; ) {
          var c = sl(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var f = Xn(c.pendingLanes);
                  if (f !== 0) {
                    var s = c;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; f; ) {
                      var v = 1 << 31 - pt(f);
                      s.entanglements[1] |= v, f &= ~v;
                    }
                    kt(c), (me & 6) === 0 && (Lu = yt() + 500, wa(0));
                  }
                }
                break;
              case 31:
              case 13:
                s = Kn(c, 2), s !== null && dt(s, c, 2), Vu(), qo(c, 2);
            }
          if (c = Yo(l), c === null && Ao(
            e,
            t,
            l,
            ci,
            n
          ), c === u) break;
          u = c;
        }
        u !== null && l.stopPropagation();
      } else
        Ao(
          e,
          t,
          l,
          null,
          n
        );
    }
  }
  function Yo(e) {
    return e = Gi(e), Go(e);
  }
  var ci = null;
  function Go(e) {
    if (ci = null, e = fl(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = A(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ci = e, null;
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
          case mr:
            return 2;
          case vr:
            return 8;
          case Wa:
          case xm:
            return 32;
          case yr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Xo = !1, Cn = null, Zn = null, Rn = null, La = /* @__PURE__ */ new Map(), Qa = /* @__PURE__ */ new Map(), wn = [], Yv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function oh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Cn = null;
        break;
      case "dragenter":
      case "dragleave":
        Zn = null;
        break;
      case "mouseover":
      case "mouseout":
        Rn = null;
        break;
      case "pointerover":
      case "pointerout":
        La.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Qa.delete(t.pointerId);
    }
  }
  function Va(e, t, n, l, u, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: c,
      targetContainers: [u]
    }, t !== null && (t = sl(t), t !== null && uh(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Gv(e, t, n, l, u) {
    switch (t) {
      case "focusin":
        return Cn = Va(
          Cn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "dragenter":
        return Zn = Va(
          Zn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "mouseover":
        return Rn = Va(
          Rn,
          e,
          t,
          n,
          l,
          u
        ), !0;
      case "pointerover":
        var c = u.pointerId;
        return La.set(
          c,
          Va(
            La.get(c) || null,
            e,
            t,
            n,
            l,
            u
          )
        ), !0;
      case "gotpointercapture":
        return c = u.pointerId, Qa.set(
          c,
          Va(
            Qa.get(c) || null,
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
  function rh(e) {
    var t = fl(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, zr(e.priority, function() {
              ih(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = A(n), t !== null) {
            e.blockedOn = t, zr(e.priority, function() {
              ih(n);
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
  function oi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Yo(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        Yi = l, n.target.dispatchEvent(l), Yi = null;
      } else
        return t = sl(n), t !== null && uh(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function fh(e, t, n) {
    oi(e) && n.delete(t);
  }
  function Xv() {
    Xo = !1, Cn !== null && oi(Cn) && (Cn = null), Zn !== null && oi(Zn) && (Zn = null), Rn !== null && oi(Rn) && (Rn = null), La.forEach(fh), Qa.forEach(fh);
  }
  function ri(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Xo || (Xo = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Xv
    )));
  }
  var fi = null;
  function sh(e) {
    fi !== e && (fi = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        fi === e && (fi = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], l = e[t + 1], u = e[t + 2];
          if (typeof l != "function") {
            if (Go(l || n) === null)
              continue;
            break;
          }
          var c = sl(n);
          c !== null && (e.splice(t, 3), t -= 3, Bc(
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
  function kl(e) {
    function t(v) {
      return ri(v, e);
    }
    Cn !== null && ri(Cn, e), Zn !== null && ri(Zn, e), Rn !== null && ri(Rn, e), La.forEach(t), Qa.forEach(t);
    for (var n = 0; n < wn.length; n++) {
      var l = wn[n];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < wn.length && (n = wn[0], n.blockedOn === null); )
      rh(n), n.blockedOn === null && wn.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var u = n[l], c = n[l + 1], f = u[it] || null;
        if (typeof c == "function")
          f || sh(n);
        else if (f) {
          var s = null;
          if (c && c.hasAttribute("formAction")) {
            if (u = c, f = c[it] || null)
              s = f.formAction;
            else if (Go(u) !== null) continue;
          } else s = f.action;
          typeof s == "function" ? n[l + 1] = s : (n.splice(l, 3), l -= 3), sh(n);
        }
      }
  }
  function dh() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(f) {
            return u = f;
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
  function Lo(e) {
    this._internalRoot = e;
  }
  si.prototype.render = Lo.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var n = t.current, l = At();
    lh(n, l, e, t, null, null);
  }, si.prototype.unmount = Lo.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      lh(e.current, 2, null, e, null, null), Vu(), t[rl] = null;
    }
  };
  function si(e) {
    this._internalRoot = e;
  }
  si.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Sr();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < wn.length && t !== 0 && t < wn[n].priority; n++) ;
      wn.splice(n, 0, e), n === 0 && rh(e);
    }
  };
  var hh = i.version;
  if (hh !== "19.2.1")
    throw Error(
      r(
        527,
        hh,
        "19.2.1"
      )
    );
  Z.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = g(t), e = e !== null ? R(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Lv = {
    bundleType: 0,
    version: "19.2.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var di = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!di.isDisabled && di.supportsFiber)
      try {
        ea = di.inject(
          Lv
        ), gt = di;
      } catch {
      }
  }
  return Ka.createRoot = function(e, t) {
    if (!d(e)) throw Error(r(299));
    var n = !1, l = "", u = _s, c = Ss, f = zs;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = th(
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
      f,
      dh
    ), e[rl] = t.current, To(e), new Lo(t);
  }, Ka.hydrateRoot = function(e, t, n) {
    if (!d(e)) throw Error(r(299));
    var l = !1, u = "", c = _s, f = Ss, s = zs, v = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (v = n.formState)), t = th(
      e,
      1,
      !0,
      t,
      n ?? null,
      l,
      u,
      v,
      c,
      f,
      s,
      dh
    ), t.context = nh(null), n = t.current, l = At(), l = Ui(l), u = Sn(l), u.callback = null, zn(n, u, l), n = l, t.current.lanes = n, na(t, n), kt(t), e[rl] = t.current, To(e), new si(t);
  }, Ka.version = "19.2.1", Ka;
}
var Eh;
function Pv() {
  if (Eh) return ko.exports;
  Eh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), ko.exports = Iv(), ko.exports;
}
var ey = Pv();
const ty = /* @__PURE__ */ $h(ey);
function U(a, i, o) {
  function r(A, E) {
    if (A._zod || Object.defineProperty(A, "_zod", {
      value: {
        def: E,
        constr: m,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), A._zod.traits.has(a))
      return;
    A._zod.traits.add(a), i(A, E);
    const g = m.prototype, R = Object.keys(g);
    for (let C = 0; C < R.length; C++) {
      const G = R[C];
      G in A || (A[G] = g[G].bind(A));
    }
  }
  const d = o?.Parent ?? Object;
  class h extends d {
  }
  Object.defineProperty(h, "name", { value: a });
  function m(A) {
    var E;
    const g = o?.Parent ? new h() : this;
    r(g, A), (E = g._zod).deferred ?? (E.deferred = []);
    for (const R of g._zod.deferred)
      R();
    return g;
  }
  return Object.defineProperty(m, "init", { value: r }), Object.defineProperty(m, Symbol.hasInstance, {
    value: (A) => o?.Parent && A instanceof o.Parent ? !0 : A?._zod?.traits?.has(a)
  }), Object.defineProperty(m, "name", { value: a }), m;
}
class Jl extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Jh extends Error {
  constructor(i) {
    super(`Encountered unidirectional transform during encode: ${i}`), this.name = "ZodEncodeError";
  }
}
const Wh = {};
function qn(a) {
  return Wh;
}
function ny(a) {
  const i = Object.values(a).filter((r) => typeof r == "number");
  return Object.entries(a).filter(([r, d]) => i.indexOf(+r) === -1).map(([r, d]) => d);
}
function Io(a, i) {
  return typeof i == "bigint" ? i.toString() : i;
}
function lr(a) {
  return {
    get value() {
      {
        const i = a();
        return Object.defineProperty(this, "value", { value: i }), i;
      }
    }
  };
}
function ar(a) {
  return a == null;
}
function ur(a) {
  const i = a.startsWith("^") ? 1 : 0, o = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(i, o);
}
function ly(a, i) {
  const o = (a.toString().split(".")[1] || "").length, r = i.toString();
  let d = (r.split(".")[1] || "").length;
  if (d === 0 && /\d?e-\d?/.test(r)) {
    const E = r.match(/\d?e-(\d?)/);
    E?.[1] && (d = Number.parseInt(E[1]));
  }
  const h = o > d ? o : d, m = Number.parseInt(a.toFixed(h).replace(".", "")), A = Number.parseInt(i.toFixed(h).replace(".", ""));
  return m % A / 10 ** h;
}
const Th = Symbol("evaluating");
function Ee(a, i, o) {
  let r;
  Object.defineProperty(a, i, {
    get() {
      if (r !== Th)
        return r === void 0 && (r = Th, r = o()), r;
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
function il(a, i, o) {
  Object.defineProperty(a, i, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function cl(...a) {
  const i = {};
  for (const o of a) {
    const r = Object.getOwnPropertyDescriptors(o);
    Object.assign(i, r);
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
function gi(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const uy = lr(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function Wl(a) {
  if (gi(a) === !1)
    return !1;
  const i = a.constructor;
  if (i === void 0 || typeof i != "function")
    return !0;
  const o = i.prototype;
  return !(gi(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function Ih(a) {
  return Wl(a) ? { ...a } : Array.isArray(a) ? [...a] : a;
}
const iy = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function Si(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Yn(a, i, o) {
  const r = new a._zod.constr(i ?? a._zod.def);
  return (!i || o?.parent) && (r._zod.parent = a), r;
}
function k(a) {
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
function ry(a, i) {
  const o = a._zod.def, r = cl(a._zod.def, {
    get shape() {
      const d = {};
      for (const h in i) {
        if (!(h in o.shape))
          throw new Error(`Unrecognized key: "${h}"`);
        i[h] && (d[h] = o.shape[h]);
      }
      return il(this, "shape", d), d;
    },
    checks: []
  });
  return Yn(a, r);
}
function fy(a, i) {
  const o = a._zod.def, r = cl(a._zod.def, {
    get shape() {
      const d = { ...a._zod.def.shape };
      for (const h in i) {
        if (!(h in o.shape))
          throw new Error(`Unrecognized key: "${h}"`);
        i[h] && delete d[h];
      }
      return il(this, "shape", d), d;
    },
    checks: []
  });
  return Yn(a, r);
}
function sy(a, i) {
  if (!Wl(i))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = a._zod.def.checks;
  if (o && o.length > 0)
    throw new Error("Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.");
  const d = cl(a._zod.def, {
    get shape() {
      const h = { ...a._zod.def.shape, ...i };
      return il(this, "shape", h), h;
    },
    checks: []
  });
  return Yn(a, d);
}
function dy(a, i) {
  if (!Wl(i))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = {
    ...a._zod.def,
    get shape() {
      const r = { ...a._zod.def.shape, ...i };
      return il(this, "shape", r), r;
    },
    checks: a._zod.def.checks
  };
  return Yn(a, o);
}
function hy(a, i) {
  const o = cl(a._zod.def, {
    get shape() {
      const r = { ...a._zod.def.shape, ...i._zod.def.shape };
      return il(this, "shape", r), r;
    },
    get catchall() {
      return i._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Yn(a, o);
}
function my(a, i, o) {
  const r = cl(i._zod.def, {
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
      return il(this, "shape", h), h;
    },
    checks: []
  });
  return Yn(i, r);
}
function vy(a, i, o) {
  const r = cl(i._zod.def, {
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
      return il(this, "shape", h), h;
    },
    checks: []
  });
  return Yn(i, r);
}
function Kl(a, i = 0) {
  if (a.aborted === !0)
    return !0;
  for (let o = i; o < a.issues.length; o++)
    if (a.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function $l(a, i) {
  return i.map((o) => {
    var r;
    return (r = o).path ?? (r.path = []), o.path.unshift(a), o;
  });
}
function hi(a) {
  return typeof a == "string" ? a : a?.message;
}
function Bn(a, i, o) {
  const r = { ...a, path: a.path ?? [] };
  if (!a.message) {
    const d = hi(a.inst?._zod.def?.error?.(a)) ?? hi(i?.error?.(a)) ?? hi(o.customError?.(a)) ?? hi(o.localeError?.(a)) ?? "Invalid input";
    r.message = d;
  }
  return delete r.inst, delete r.continue, i?.reportInput || delete r.input, r;
}
function ir(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function $a(...a) {
  const [i, o, r] = a;
  return typeof i == "string" ? {
    message: i,
    code: "custom",
    input: o,
    inst: r
  } : { ...i };
}
const Ph = (a, i) => {
  a.name = "$ZodError", Object.defineProperty(a, "_zod", {
    value: a._zod,
    enumerable: !1
  }), Object.defineProperty(a, "issues", {
    value: i,
    enumerable: !1
  }), a.message = JSON.stringify(i, Io, 2), Object.defineProperty(a, "toString", {
    value: () => a.message,
    enumerable: !1
  });
}, em = U("$ZodError", Ph), tm = U("$ZodError", Ph, { Parent: Error });
function yy(a, i = (o) => o.message) {
  const o = {}, r = [];
  for (const d of a.issues)
    d.path.length > 0 ? (o[d.path[0]] = o[d.path[0]] || [], o[d.path[0]].push(i(d))) : r.push(i(d));
  return { formErrors: r, fieldErrors: o };
}
function gy(a, i = (o) => o.message) {
  const o = { _errors: [] }, r = (d) => {
    for (const h of d.issues)
      if (h.code === "invalid_union" && h.errors.length)
        h.errors.map((m) => r({ issues: m }));
      else if (h.code === "invalid_key")
        r({ issues: h.issues });
      else if (h.code === "invalid_element")
        r({ issues: h.issues });
      else if (h.path.length === 0)
        o._errors.push(i(h));
      else {
        let m = o, A = 0;
        for (; A < h.path.length; ) {
          const E = h.path[A];
          A === h.path.length - 1 ? (m[E] = m[E] || { _errors: [] }, m[E]._errors.push(i(h))) : m[E] = m[E] || { _errors: [] }, m = m[E], A++;
        }
      }
  };
  return r(a), o;
}
const cr = (a) => (i, o, r, d) => {
  const h = r ? Object.assign(r, { async: !1 }) : { async: !1 }, m = i._zod.run({ value: o, issues: [] }, h);
  if (m instanceof Promise)
    throw new Jl();
  if (m.issues.length) {
    const A = new (d?.Err ?? a)(m.issues.map((E) => Bn(E, h, qn())));
    throw Fh(A, d?.callee), A;
  }
  return m.value;
}, or = (a) => async (i, o, r, d) => {
  const h = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let m = i._zod.run({ value: o, issues: [] }, h);
  if (m instanceof Promise && (m = await m), m.issues.length) {
    const A = new (d?.Err ?? a)(m.issues.map((E) => Bn(E, h, qn())));
    throw Fh(A, d?.callee), A;
  }
  return m.value;
}, zi = (a) => (i, o, r) => {
  const d = r ? { ...r, async: !1 } : { async: !1 }, h = i._zod.run({ value: o, issues: [] }, d);
  if (h instanceof Promise)
    throw new Jl();
  return h.issues.length ? {
    success: !1,
    error: new (a ?? em)(h.issues.map((m) => Bn(m, d, qn())))
  } : { success: !0, data: h.value };
}, py = /* @__PURE__ */ zi(tm), Ei = (a) => async (i, o, r) => {
  const d = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let h = i._zod.run({ value: o, issues: [] }, d);
  return h instanceof Promise && (h = await h), h.issues.length ? {
    success: !1,
    error: new a(h.issues.map((m) => Bn(m, d, qn())))
  } : { success: !0, data: h.value };
}, by = /* @__PURE__ */ Ei(tm), _y = (a) => (i, o, r) => {
  const d = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return cr(a)(i, o, d);
}, Sy = (a) => (i, o, r) => cr(a)(i, o, r), zy = (a) => async (i, o, r) => {
  const d = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return or(a)(i, o, d);
}, Ey = (a) => async (i, o, r) => or(a)(i, o, r), Ty = (a) => (i, o, r) => {
  const d = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return zi(a)(i, o, d);
}, Ay = (a) => (i, o, r) => zi(a)(i, o, r), xy = (a) => async (i, o, r) => {
  const d = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Ei(a)(i, o, d);
}, Oy = (a) => async (i, o, r) => Ei(a)(i, o, r), My = /^[cC][^\s-]{8,}$/, Ny = /^[0-9a-z]+$/, jy = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Dy = /^[0-9a-vA-V]{20}$/, Uy = /^[A-Za-z0-9]{27}$/, Cy = /^[a-zA-Z0-9_-]{21}$/, Zy = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ry = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, xh = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, wy = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Hy = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function qy() {
  return new RegExp(Hy, "u");
}
const By = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yy = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Gy = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Xy = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Ly = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, nm = /^[A-Za-z0-9_-]*$/, Qy = /^\+(?:[0-9]){6,14}[0-9]$/, lm = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Vy = /* @__PURE__ */ new RegExp(`^${lm}$`);
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
  const r = `${i}(?:${o.join("|")})`;
  return new RegExp(`^${lm}T(?:${r})$`);
}
const $y = (a) => {
  const i = a ? `[\\s\\S]{${a?.minimum ?? 0},${a?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${i}$`);
}, Jy = /^-?\d+$/, Wy = /^-?\d+(?:\.\d+)?/, Fy = /^[^A-Z]*$/, Iy = /^[^a-z]*$/, ht = /* @__PURE__ */ U("$ZodCheck", (a, i) => {
  var o;
  a._zod ?? (a._zod = {}), a._zod.def = i, (o = a._zod).onattach ?? (o.onattach = []);
}), um = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, im = /* @__PURE__ */ U("$ZodCheckLessThan", (a, i) => {
  ht.init(a, i);
  const o = um[typeof i.value];
  a._zod.onattach.push((r) => {
    const d = r._zod.bag, h = (i.inclusive ? d.maximum : d.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    i.value < h && (i.inclusive ? d.maximum = i.value : d.exclusiveMaximum = i.value);
  }), a._zod.check = (r) => {
    (i.inclusive ? r.value <= i.value : r.value < i.value) || r.issues.push({
      origin: o,
      code: "too_big",
      maximum: i.value,
      input: r.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), cm = /* @__PURE__ */ U("$ZodCheckGreaterThan", (a, i) => {
  ht.init(a, i);
  const o = um[typeof i.value];
  a._zod.onattach.push((r) => {
    const d = r._zod.bag, h = (i.inclusive ? d.minimum : d.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    i.value > h && (i.inclusive ? d.minimum = i.value : d.exclusiveMinimum = i.value);
  }), a._zod.check = (r) => {
    (i.inclusive ? r.value >= i.value : r.value > i.value) || r.issues.push({
      origin: o,
      code: "too_small",
      minimum: i.value,
      input: r.value,
      inclusive: i.inclusive,
      inst: a,
      continue: !i.abort
    });
  };
}), Py = /* @__PURE__ */ U("$ZodCheckMultipleOf", (a, i) => {
  ht.init(a, i), a._zod.onattach.push((o) => {
    var r;
    (r = o._zod.bag).multipleOf ?? (r.multipleOf = i.value);
  }), a._zod.check = (o) => {
    if (typeof o.value != typeof i.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % i.value === BigInt(0) : ly(o.value, i.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: i.value,
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), eg = /* @__PURE__ */ U("$ZodCheckNumberFormat", (a, i) => {
  ht.init(a, i), i.format = i.format || "float64";
  const o = i.format?.includes("int"), r = o ? "int" : "number", [d, h] = oy[i.format];
  a._zod.onattach.push((m) => {
    const A = m._zod.bag;
    A.format = i.format, A.minimum = d, A.maximum = h, o && (A.pattern = Jy);
  }), a._zod.check = (m) => {
    const A = m.value;
    if (o) {
      if (!Number.isInteger(A)) {
        m.issues.push({
          expected: r,
          format: i.format,
          code: "invalid_type",
          continue: !1,
          input: A,
          inst: a
        });
        return;
      }
      if (!Number.isSafeInteger(A)) {
        A > 0 ? m.issues.push({
          input: A,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: r,
          continue: !i.abort
        }) : m.issues.push({
          input: A,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: r,
          continue: !i.abort
        });
        return;
      }
    }
    A < d && m.issues.push({
      origin: "number",
      input: A,
      code: "too_small",
      minimum: d,
      inclusive: !0,
      inst: a,
      continue: !i.abort
    }), A > h && m.issues.push({
      origin: "number",
      input: A,
      code: "too_big",
      maximum: h,
      inst: a
    });
  };
}), tg = /* @__PURE__ */ U("$ZodCheckMaxLength", (a, i) => {
  var o;
  ht.init(a, i), (o = a._zod.def).when ?? (o.when = (r) => {
    const d = r.value;
    return !ar(d) && d.length !== void 0;
  }), a._zod.onattach.push((r) => {
    const d = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    i.maximum < d && (r._zod.bag.maximum = i.maximum);
  }), a._zod.check = (r) => {
    const d = r.value;
    if (d.length <= i.maximum)
      return;
    const m = ir(d);
    r.issues.push({
      origin: m,
      code: "too_big",
      maximum: i.maximum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !i.abort
    });
  };
}), ng = /* @__PURE__ */ U("$ZodCheckMinLength", (a, i) => {
  var o;
  ht.init(a, i), (o = a._zod.def).when ?? (o.when = (r) => {
    const d = r.value;
    return !ar(d) && d.length !== void 0;
  }), a._zod.onattach.push((r) => {
    const d = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    i.minimum > d && (r._zod.bag.minimum = i.minimum);
  }), a._zod.check = (r) => {
    const d = r.value;
    if (d.length >= i.minimum)
      return;
    const m = ir(d);
    r.issues.push({
      origin: m,
      code: "too_small",
      minimum: i.minimum,
      inclusive: !0,
      input: d,
      inst: a,
      continue: !i.abort
    });
  };
}), lg = /* @__PURE__ */ U("$ZodCheckLengthEquals", (a, i) => {
  var o;
  ht.init(a, i), (o = a._zod.def).when ?? (o.when = (r) => {
    const d = r.value;
    return !ar(d) && d.length !== void 0;
  }), a._zod.onattach.push((r) => {
    const d = r._zod.bag;
    d.minimum = i.length, d.maximum = i.length, d.length = i.length;
  }), a._zod.check = (r) => {
    const d = r.value, h = d.length;
    if (h === i.length)
      return;
    const m = ir(d), A = h > i.length;
    r.issues.push({
      origin: m,
      ...A ? { code: "too_big", maximum: i.length } : { code: "too_small", minimum: i.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Ti = /* @__PURE__ */ U("$ZodCheckStringFormat", (a, i) => {
  var o, r;
  ht.init(a, i), a._zod.onattach.push((d) => {
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
  }) : (r = a._zod).check ?? (r.check = () => {
  });
}), ag = /* @__PURE__ */ U("$ZodCheckRegex", (a, i) => {
  Ti.init(a, i), a._zod.check = (o) => {
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
  i.pattern ?? (i.pattern = Fy), Ti.init(a, i);
}), ig = /* @__PURE__ */ U("$ZodCheckUpperCase", (a, i) => {
  i.pattern ?? (i.pattern = Iy), Ti.init(a, i);
}), cg = /* @__PURE__ */ U("$ZodCheckIncludes", (a, i) => {
  ht.init(a, i);
  const o = Si(i.includes), r = new RegExp(typeof i.position == "number" ? `^.{${i.position}}${o}` : o);
  i.pattern = r, a._zod.onattach.push((d) => {
    const h = d._zod.bag;
    h.patterns ?? (h.patterns = /* @__PURE__ */ new Set()), h.patterns.add(r);
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
  ht.init(a, i);
  const o = new RegExp(`^${Si(i.prefix)}.*`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((r) => {
    const d = r._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (r) => {
    r.value.startsWith(i.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: i.prefix,
      input: r.value,
      inst: a,
      continue: !i.abort
    });
  };
}), rg = /* @__PURE__ */ U("$ZodCheckEndsWith", (a, i) => {
  ht.init(a, i);
  const o = new RegExp(`.*${Si(i.suffix)}$`);
  i.pattern ?? (i.pattern = o), a._zod.onattach.push((r) => {
    const d = r._zod.bag;
    d.patterns ?? (d.patterns = /* @__PURE__ */ new Set()), d.patterns.add(o);
  }), a._zod.check = (r) => {
    r.value.endsWith(i.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: i.suffix,
      input: r.value,
      inst: a,
      continue: !i.abort
    });
  };
}), fg = /* @__PURE__ */ U("$ZodCheckOverwrite", (a, i) => {
  ht.init(a, i), a._zod.check = (o) => {
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
    const r = i.split(`
`).filter((m) => m), d = Math.min(...r.map((m) => m.length - m.trimStart().length)), h = r.map((m) => m.slice(d)).map((m) => " ".repeat(this.indent * 2) + m);
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
}, He = /* @__PURE__ */ U("$ZodType", (a, i) => {
  var o;
  a ?? (a = {}), a._zod.def = i, a._zod.bag = a._zod.bag || {}, a._zod.version = dg;
  const r = [...a._zod.def.checks ?? []];
  a._zod.traits.has("$ZodCheck") && r.unshift(a);
  for (const d of r)
    for (const h of d._zod.onattach)
      h(a);
  if (r.length === 0)
    (o = a._zod).deferred ?? (o.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const d = (m, A, E) => {
      let g = Kl(m), R;
      for (const C of A) {
        if (C._zod.def.when) {
          if (!C._zod.def.when(m))
            continue;
        } else if (g)
          continue;
        const G = m.issues.length, P = C._zod.check(m);
        if (P instanceof Promise && E?.async === !1)
          throw new Jl();
        if (R || P instanceof Promise)
          R = (R ?? Promise.resolve()).then(async () => {
            await P, m.issues.length !== G && (g || (g = Kl(m, G)));
          });
        else {
          if (m.issues.length === G)
            continue;
          g || (g = Kl(m, G));
        }
      }
      return R ? R.then(() => m) : m;
    }, h = (m, A, E) => {
      if (Kl(m))
        return m.aborted = !0, m;
      const g = d(A, r, E);
      if (g instanceof Promise) {
        if (E.async === !1)
          throw new Jl();
        return g.then((R) => a._zod.parse(R, E));
      }
      return a._zod.parse(g, E);
    };
    a._zod.run = (m, A) => {
      if (A.skipChecks)
        return a._zod.parse(m, A);
      if (A.direction === "backward") {
        const g = a._zod.parse({ value: m.value, issues: [] }, { ...A, skipChecks: !0 });
        return g instanceof Promise ? g.then((R) => h(R, m, A)) : h(g, m, A);
      }
      const E = a._zod.parse(m, A);
      if (E instanceof Promise) {
        if (A.async === !1)
          throw new Jl();
        return E.then((g) => d(g, r, A));
      }
      return d(E, r, A);
    };
  }
  a["~standard"] = {
    validate: (d) => {
      try {
        const h = py(a, d);
        return h.success ? { value: h.data } : { issues: h.error?.issues };
      } catch {
        return by(a, d).then((m) => m.success ? { value: m.data } : { issues: m.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  };
}), rr = /* @__PURE__ */ U("$ZodString", (a, i) => {
  He.init(a, i), a._zod.pattern = [...a?._zod.bag?.patterns ?? []].pop() ?? $y(a._zod.bag), a._zod.parse = (o, r) => {
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
}), Ne = /* @__PURE__ */ U("$ZodStringFormat", (a, i) => {
  Ti.init(a, i), rr.init(a, i);
}), hg = /* @__PURE__ */ U("$ZodGUID", (a, i) => {
  i.pattern ?? (i.pattern = Ry), Ne.init(a, i);
}), mg = /* @__PURE__ */ U("$ZodUUID", (a, i) => {
  if (i.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[i.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${i.version}"`);
    i.pattern ?? (i.pattern = xh(r));
  } else
    i.pattern ?? (i.pattern = xh());
  Ne.init(a, i);
}), vg = /* @__PURE__ */ U("$ZodEmail", (a, i) => {
  i.pattern ?? (i.pattern = wy), Ne.init(a, i);
}), yg = /* @__PURE__ */ U("$ZodURL", (a, i) => {
  Ne.init(a, i), a._zod.check = (o) => {
    try {
      const r = o.value.trim(), d = new URL(r);
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
      })), i.normalize ? o.value = d.href : o.value = r;
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
  i.pattern ?? (i.pattern = qy()), Ne.init(a, i);
}), pg = /* @__PURE__ */ U("$ZodNanoID", (a, i) => {
  i.pattern ?? (i.pattern = Cy), Ne.init(a, i);
}), bg = /* @__PURE__ */ U("$ZodCUID", (a, i) => {
  i.pattern ?? (i.pattern = My), Ne.init(a, i);
}), _g = /* @__PURE__ */ U("$ZodCUID2", (a, i) => {
  i.pattern ?? (i.pattern = Ny), Ne.init(a, i);
}), Sg = /* @__PURE__ */ U("$ZodULID", (a, i) => {
  i.pattern ?? (i.pattern = jy), Ne.init(a, i);
}), zg = /* @__PURE__ */ U("$ZodXID", (a, i) => {
  i.pattern ?? (i.pattern = Dy), Ne.init(a, i);
}), Eg = /* @__PURE__ */ U("$ZodKSUID", (a, i) => {
  i.pattern ?? (i.pattern = Uy), Ne.init(a, i);
}), Tg = /* @__PURE__ */ U("$ZodISODateTime", (a, i) => {
  i.pattern ?? (i.pattern = Ky(i)), Ne.init(a, i);
}), Ag = /* @__PURE__ */ U("$ZodISODate", (a, i) => {
  i.pattern ?? (i.pattern = Vy), Ne.init(a, i);
}), xg = /* @__PURE__ */ U("$ZodISOTime", (a, i) => {
  i.pattern ?? (i.pattern = ky(i)), Ne.init(a, i);
}), Og = /* @__PURE__ */ U("$ZodISODuration", (a, i) => {
  i.pattern ?? (i.pattern = Zy), Ne.init(a, i);
}), Mg = /* @__PURE__ */ U("$ZodIPv4", (a, i) => {
  i.pattern ?? (i.pattern = By), Ne.init(a, i), a._zod.bag.format = "ipv4";
}), Ng = /* @__PURE__ */ U("$ZodIPv6", (a, i) => {
  i.pattern ?? (i.pattern = Yy), Ne.init(a, i), a._zod.bag.format = "ipv6", a._zod.check = (o) => {
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
}), jg = /* @__PURE__ */ U("$ZodCIDRv4", (a, i) => {
  i.pattern ?? (i.pattern = Gy), Ne.init(a, i);
}), Dg = /* @__PURE__ */ U("$ZodCIDRv6", (a, i) => {
  i.pattern ?? (i.pattern = Xy), Ne.init(a, i), a._zod.check = (o) => {
    const r = o.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [d, h] = r;
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
const Ug = /* @__PURE__ */ U("$ZodBase64", (a, i) => {
  i.pattern ?? (i.pattern = Ly), Ne.init(a, i), a._zod.bag.contentEncoding = "base64", a._zod.check = (o) => {
    om(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
});
function Cg(a) {
  if (!nm.test(a))
    return !1;
  const i = a.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), o = i.padEnd(Math.ceil(i.length / 4) * 4, "=");
  return om(o);
}
const Zg = /* @__PURE__ */ U("$ZodBase64URL", (a, i) => {
  i.pattern ?? (i.pattern = nm), Ne.init(a, i), a._zod.bag.contentEncoding = "base64url", a._zod.check = (o) => {
    Cg(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), Rg = /* @__PURE__ */ U("$ZodE164", (a, i) => {
  i.pattern ?? (i.pattern = Qy), Ne.init(a, i);
});
function wg(a, i = null) {
  try {
    const o = a.split(".");
    if (o.length !== 3)
      return !1;
    const [r] = o;
    if (!r)
      return !1;
    const d = JSON.parse(atob(r));
    return !("typ" in d && d?.typ !== "JWT" || !d.alg || i && (!("alg" in d) || d.alg !== i));
  } catch {
    return !1;
  }
}
const Hg = /* @__PURE__ */ U("$ZodJWT", (a, i) => {
  Ne.init(a, i), a._zod.check = (o) => {
    wg(o.value, i.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: a,
      continue: !i.abort
    });
  };
}), rm = /* @__PURE__ */ U("$ZodNumber", (a, i) => {
  He.init(a, i), a._zod.pattern = a._zod.bag.pattern ?? Wy, a._zod.parse = (o, r) => {
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
}), qg = /* @__PURE__ */ U("$ZodNumberFormat", (a, i) => {
  eg.init(a, i), rm.init(a, i);
}), Bg = /* @__PURE__ */ U("$ZodUnknown", (a, i) => {
  He.init(a, i), a._zod.parse = (o) => o;
}), Yg = /* @__PURE__ */ U("$ZodNever", (a, i) => {
  He.init(a, i), a._zod.parse = (o, r) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: a
  }), o);
});
function Oh(a, i, o) {
  a.issues.length && i.issues.push(...$l(o, a.issues)), i.value[o] = a.value;
}
const Gg = /* @__PURE__ */ U("$ZodArray", (a, i) => {
  He.init(a, i), a._zod.parse = (o, r) => {
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
      const A = d[m], E = i.element._zod.run({
        value: A,
        issues: []
      }, r);
      E instanceof Promise ? h.push(E.then((g) => Oh(g, o, m))) : Oh(E, o, m);
    }
    return h.length ? Promise.all(h).then(() => o) : o;
  };
});
function pi(a, i, o, r) {
  a.issues.length && i.issues.push(...$l(o, a.issues)), a.value === void 0 ? o in r && (i.value[o] = void 0) : i.value[o] = a.value;
}
function fm(a) {
  const i = Object.keys(a.shape);
  for (const r of i)
    if (!a.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const o = cy(a.shape);
  return {
    ...a,
    keys: i,
    keySet: new Set(i),
    numKeys: i.length,
    optionalKeys: new Set(o)
  };
}
function sm(a, i, o, r, d, h) {
  const m = [], A = d.keySet, E = d.catchall._zod, g = E.def.type;
  for (const R in i) {
    if (A.has(R))
      continue;
    if (g === "never") {
      m.push(R);
      continue;
    }
    const C = E.run({ value: i[R], issues: [] }, r);
    C instanceof Promise ? a.push(C.then((G) => pi(G, o, R, i))) : pi(C, o, R, i);
  }
  return m.length && o.issues.push({
    code: "unrecognized_keys",
    keys: m,
    input: i,
    inst: h
  }), a.length ? Promise.all(a).then(() => o) : o;
}
const Xg = /* @__PURE__ */ U("$ZodObject", (a, i) => {
  if (He.init(a, i), !Object.getOwnPropertyDescriptor(i, "shape")?.get) {
    const A = i.shape;
    Object.defineProperty(i, "shape", {
      get: () => {
        const E = { ...A };
        return Object.defineProperty(i, "shape", {
          value: E
        }), E;
      }
    });
  }
  const r = lr(() => fm(i));
  Ee(a._zod, "propValues", () => {
    const A = i.shape, E = {};
    for (const g in A) {
      const R = A[g]._zod;
      if (R.values) {
        E[g] ?? (E[g] = /* @__PURE__ */ new Set());
        for (const C of R.values)
          E[g].add(C);
      }
    }
    return E;
  });
  const d = gi, h = i.catchall;
  let m;
  a._zod.parse = (A, E) => {
    m ?? (m = r.value);
    const g = A.value;
    if (!d(g))
      return A.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: a
      }), A;
    A.value = {};
    const R = [], C = m.shape;
    for (const G of m.keys) {
      const ee = C[G]._zod.run({ value: g[G], issues: [] }, E);
      ee instanceof Promise ? R.push(ee.then((Te) => pi(Te, A, G, g))) : pi(ee, A, G, g);
    }
    return h ? sm(R, g, A, E, r.value, a) : R.length ? Promise.all(R).then(() => A) : A;
  };
}), Lg = /* @__PURE__ */ U("$ZodObjectJIT", (a, i) => {
  Xg.init(a, i);
  const o = a._zod.parse, r = lr(() => fm(i)), d = (G) => {
    const P = new sg(["shape", "payload", "ctx"]), ee = r.value, Te = (de) => {
      const ye = Ah(de);
      return `shape[${ye}]._zod.run({ value: input[${ye}], issues: [] }, ctx)`;
    };
    P.write("const input = payload.value;");
    const ae = /* @__PURE__ */ Object.create(null);
    let re = 0;
    for (const de of ee.keys)
      ae[de] = `key_${re++}`;
    P.write("const newResult = {};");
    for (const de of ee.keys) {
      const ye = ae[de], qe = Ah(de);
      P.write(`const ${ye} = ${Te(de)};`), P.write(`
        if (${ye}.issues.length) {
          payload.issues = payload.issues.concat(${ye}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${qe}, ...iss.path] : [${qe}]
          })));
        }
        
        
        if (${ye}.value === undefined) {
          if (${qe} in input) {
            newResult[${qe}] = undefined;
          }
        } else {
          newResult[${qe}] = ${ye}.value;
        }
        
      `);
    }
    P.write("payload.value = newResult;"), P.write("return payload;");
    const tt = P.compile();
    return (de, ye) => tt(G, de, ye);
  };
  let h;
  const m = gi, A = !Wh.jitless, g = A && uy.value, R = i.catchall;
  let C;
  a._zod.parse = (G, P) => {
    C ?? (C = r.value);
    const ee = G.value;
    return m(ee) ? A && g && P?.async === !1 && P.jitless !== !0 ? (h || (h = d(i.shape)), G = h(G, P), R ? sm([], ee, G, P, C, a) : G) : o(G, P) : (G.issues.push({
      expected: "object",
      code: "invalid_type",
      input: ee,
      inst: a
    }), G);
  };
});
function Mh(a, i, o, r) {
  for (const h of a)
    if (h.issues.length === 0)
      return i.value = h.value, i;
  const d = a.filter((h) => !Kl(h));
  return d.length === 1 ? (i.value = d[0].value, d[0]) : (i.issues.push({
    code: "invalid_union",
    input: i.value,
    inst: o,
    errors: a.map((h) => h.issues.map((m) => Bn(m, r, qn())))
  }), i);
}
const Qg = /* @__PURE__ */ U("$ZodUnion", (a, i) => {
  He.init(a, i), Ee(a._zod, "optin", () => i.options.some((d) => d._zod.optin === "optional") ? "optional" : void 0), Ee(a._zod, "optout", () => i.options.some((d) => d._zod.optout === "optional") ? "optional" : void 0), Ee(a._zod, "values", () => {
    if (i.options.every((d) => d._zod.values))
      return new Set(i.options.flatMap((d) => Array.from(d._zod.values)));
  }), Ee(a._zod, "pattern", () => {
    if (i.options.every((d) => d._zod.pattern)) {
      const d = i.options.map((h) => h._zod.pattern);
      return new RegExp(`^(${d.map((h) => ur(h.source)).join("|")})$`);
    }
  });
  const o = i.options.length === 1, r = i.options[0]._zod.run;
  a._zod.parse = (d, h) => {
    if (o)
      return r(d, h);
    let m = !1;
    const A = [];
    for (const E of i.options) {
      const g = E._zod.run({
        value: d.value,
        issues: []
      }, h);
      if (g instanceof Promise)
        A.push(g), m = !0;
      else {
        if (g.issues.length === 0)
          return g;
        A.push(g);
      }
    }
    return m ? Promise.all(A).then((E) => Mh(E, d, a, h)) : Mh(A, d, a, h);
  };
}), Vg = /* @__PURE__ */ U("$ZodIntersection", (a, i) => {
  He.init(a, i), a._zod.parse = (o, r) => {
    const d = o.value, h = i.left._zod.run({ value: d, issues: [] }, r), m = i.right._zod.run({ value: d, issues: [] }, r);
    return h instanceof Promise || m instanceof Promise ? Promise.all([h, m]).then(([E, g]) => Nh(o, E, g)) : Nh(o, h, m);
  };
});
function Po(a, i) {
  if (a === i)
    return { valid: !0, data: a };
  if (a instanceof Date && i instanceof Date && +a == +i)
    return { valid: !0, data: a };
  if (Wl(a) && Wl(i)) {
    const o = Object.keys(i), r = Object.keys(a).filter((h) => o.indexOf(h) !== -1), d = { ...a, ...i };
    for (const h of r) {
      const m = Po(a[h], i[h]);
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
    for (let r = 0; r < a.length; r++) {
      const d = a[r], h = i[r], m = Po(d, h);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...m.mergeErrorPath]
        };
      o.push(m.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Nh(a, i, o) {
  if (i.issues.length && a.issues.push(...i.issues), o.issues.length && a.issues.push(...o.issues), Kl(a))
    return a;
  const r = Po(i.value, o.value);
  if (!r.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`);
  return a.value = r.data, a;
}
const kg = /* @__PURE__ */ U("$ZodRecord", (a, i) => {
  He.init(a, i), a._zod.parse = (o, r) => {
    const d = o.value;
    if (!Wl(d))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: d,
        inst: a
      }), o;
    const h = [], m = i.keyType._zod.values;
    if (m) {
      o.value = {};
      const A = /* @__PURE__ */ new Set();
      for (const g of m)
        if (typeof g == "string" || typeof g == "number" || typeof g == "symbol") {
          A.add(typeof g == "number" ? g.toString() : g);
          const R = i.valueType._zod.run({ value: d[g], issues: [] }, r);
          R instanceof Promise ? h.push(R.then((C) => {
            C.issues.length && o.issues.push(...$l(g, C.issues)), o.value[g] = C.value;
          })) : (R.issues.length && o.issues.push(...$l(g, R.issues)), o.value[g] = R.value);
        }
      let E;
      for (const g in d)
        A.has(g) || (E = E ?? [], E.push(g));
      E && E.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: d,
        inst: a,
        keys: E
      });
    } else {
      o.value = {};
      for (const A of Reflect.ownKeys(d)) {
        if (A === "__proto__")
          continue;
        const E = i.keyType._zod.run({ value: A, issues: [] }, r);
        if (E instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (E.issues.length) {
          o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: E.issues.map((R) => Bn(R, r, qn())),
            input: A,
            path: [A],
            inst: a
          }), o.value[E.value] = E.value;
          continue;
        }
        const g = i.valueType._zod.run({ value: d[A], issues: [] }, r);
        g instanceof Promise ? h.push(g.then((R) => {
          R.issues.length && o.issues.push(...$l(A, R.issues)), o.value[E.value] = R.value;
        })) : (g.issues.length && o.issues.push(...$l(A, g.issues)), o.value[E.value] = g.value);
      }
    }
    return h.length ? Promise.all(h).then(() => o) : o;
  };
}), Kg = /* @__PURE__ */ U("$ZodEnum", (a, i) => {
  He.init(a, i);
  const o = ny(i.entries), r = new Set(o);
  a._zod.values = r, a._zod.pattern = new RegExp(`^(${o.filter((d) => iy.has(typeof d)).map((d) => typeof d == "string" ? Si(d) : d.toString()).join("|")})$`), a._zod.parse = (d, h) => {
    const m = d.value;
    return r.has(m) || d.issues.push({
      code: "invalid_value",
      values: o,
      input: m,
      inst: a
    }), d;
  };
}), $g = /* @__PURE__ */ U("$ZodTransform", (a, i) => {
  He.init(a, i), a._zod.parse = (o, r) => {
    if (r.direction === "backward")
      throw new Jh(a.constructor.name);
    const d = i.transform(o.value, o);
    if (r.async)
      return (d instanceof Promise ? d : Promise.resolve(d)).then((m) => (o.value = m, o));
    if (d instanceof Promise)
      throw new Jl();
    return o.value = d, o;
  };
});
function jh(a, i) {
  return a.issues.length && i === void 0 ? { issues: [], value: void 0 } : a;
}
const Jg = /* @__PURE__ */ U("$ZodOptional", (a, i) => {
  He.init(a, i), a._zod.optin = "optional", a._zod.optout = "optional", Ee(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, void 0]) : void 0), Ee(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ur(o.source)})?$`) : void 0;
  }), a._zod.parse = (o, r) => {
    if (i.innerType._zod.optin === "optional") {
      const d = i.innerType._zod.run(o, r);
      return d instanceof Promise ? d.then((h) => jh(h, o.value)) : jh(d, o.value);
    }
    return o.value === void 0 ? o : i.innerType._zod.run(o, r);
  };
}), Wg = /* @__PURE__ */ U("$ZodNullable", (a, i) => {
  He.init(a, i), Ee(a._zod, "optin", () => i.innerType._zod.optin), Ee(a._zod, "optout", () => i.innerType._zod.optout), Ee(a._zod, "pattern", () => {
    const o = i.innerType._zod.pattern;
    return o ? new RegExp(`^(${ur(o.source)}|null)$`) : void 0;
  }), Ee(a._zod, "values", () => i.innerType._zod.values ? /* @__PURE__ */ new Set([...i.innerType._zod.values, null]) : void 0), a._zod.parse = (o, r) => o.value === null ? o : i.innerType._zod.run(o, r);
}), Fg = /* @__PURE__ */ U("$ZodDefault", (a, i) => {
  He.init(a, i), a._zod.optin = "optional", Ee(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return i.innerType._zod.run(o, r);
    if (o.value === void 0)
      return o.value = i.defaultValue, o;
    const d = i.innerType._zod.run(o, r);
    return d instanceof Promise ? d.then((h) => Dh(h, i)) : Dh(d, i);
  };
});
function Dh(a, i) {
  return a.value === void 0 && (a.value = i.defaultValue), a;
}
const Ig = /* @__PURE__ */ U("$ZodPrefault", (a, i) => {
  He.init(a, i), a._zod.optin = "optional", Ee(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, r) => (r.direction === "backward" || o.value === void 0 && (o.value = i.defaultValue), i.innerType._zod.run(o, r));
}), Pg = /* @__PURE__ */ U("$ZodNonOptional", (a, i) => {
  He.init(a, i), Ee(a._zod, "values", () => {
    const o = i.innerType._zod.values;
    return o ? new Set([...o].filter((r) => r !== void 0)) : void 0;
  }), a._zod.parse = (o, r) => {
    const d = i.innerType._zod.run(o, r);
    return d instanceof Promise ? d.then((h) => Uh(h, a)) : Uh(d, a);
  };
});
function Uh(a, i) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: i
  }), a;
}
const e1 = /* @__PURE__ */ U("$ZodCatch", (a, i) => {
  He.init(a, i), Ee(a._zod, "optin", () => i.innerType._zod.optin), Ee(a._zod, "optout", () => i.innerType._zod.optout), Ee(a._zod, "values", () => i.innerType._zod.values), a._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return i.innerType._zod.run(o, r);
    const d = i.innerType._zod.run(o, r);
    return d instanceof Promise ? d.then((h) => (o.value = h.value, h.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: h.issues.map((m) => Bn(m, r, qn()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = d.value, d.issues.length && (o.value = i.catchValue({
      ...o,
      error: {
        issues: d.issues.map((h) => Bn(h, r, qn()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), t1 = /* @__PURE__ */ U("$ZodPipe", (a, i) => {
  He.init(a, i), Ee(a._zod, "values", () => i.in._zod.values), Ee(a._zod, "optin", () => i.in._zod.optin), Ee(a._zod, "optout", () => i.out._zod.optout), Ee(a._zod, "propValues", () => i.in._zod.propValues), a._zod.parse = (o, r) => {
    if (r.direction === "backward") {
      const h = i.out._zod.run(o, r);
      return h instanceof Promise ? h.then((m) => mi(m, i.in, r)) : mi(h, i.in, r);
    }
    const d = i.in._zod.run(o, r);
    return d instanceof Promise ? d.then((h) => mi(h, i.out, r)) : mi(d, i.out, r);
  };
});
function mi(a, i, o) {
  return a.issues.length ? (a.aborted = !0, a) : i._zod.run({ value: a.value, issues: a.issues }, o);
}
const n1 = /* @__PURE__ */ U("$ZodReadonly", (a, i) => {
  He.init(a, i), Ee(a._zod, "propValues", () => i.innerType._zod.propValues), Ee(a._zod, "values", () => i.innerType._zod.values), Ee(a._zod, "optin", () => i.innerType?._zod?.optin), Ee(a._zod, "optout", () => i.innerType?._zod?.optout), a._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return i.innerType._zod.run(o, r);
    const d = i.innerType._zod.run(o, r);
    return d instanceof Promise ? d.then(Ch) : Ch(d);
  };
});
function Ch(a) {
  return a.value = Object.freeze(a.value), a;
}
const l1 = /* @__PURE__ */ U("$ZodCustom", (a, i) => {
  ht.init(a, i), He.init(a, i), a._zod.parse = (o, r) => o, a._zod.check = (o) => {
    const r = o.value, d = i.fn(r);
    if (d instanceof Promise)
      return d.then((h) => Zh(h, o, r, a));
    Zh(d, o, r, a);
  };
});
function Zh(a, i, o, r) {
  if (!a) {
    const d = {
      code: "custom",
      input: o,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (d.params = r._zod.def.params), i.issues.push($a(d));
  }
}
var Rh;
class a1 {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(i, ...o) {
    const r = o[0];
    if (this._map.set(i, r), r && typeof r == "object" && "id" in r) {
      if (this._idmap.has(r.id))
        throw new Error(`ID ${r.id} already exists in the registry`);
      this._idmap.set(r.id, i);
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
      const r = { ...this.get(o) ?? {} };
      delete r.id;
      const d = { ...r, ...this._map.get(i) };
      return Object.keys(d).length ? d : void 0;
    }
    return this._map.get(i);
  }
  has(i) {
    return this._map.has(i);
  }
}
function u1() {
  return new a1();
}
(Rh = globalThis).__zod_globalRegistry ?? (Rh.__zod_globalRegistry = u1());
const vi = globalThis.__zod_globalRegistry;
function i1(a, i) {
  return new a({
    type: "string",
    ...k(i)
  });
}
function c1(a, i) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function wh(a, i) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function o1(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function r1(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...k(i)
  });
}
function f1(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...k(i)
  });
}
function s1(a, i) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...k(i)
  });
}
function d1(a, i) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function h1(a, i) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function m1(a, i) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function v1(a, i) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function y1(a, i) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function g1(a, i) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function p1(a, i) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function b1(a, i) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function _1(a, i) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function S1(a, i) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function z1(a, i) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function E1(a, i) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function T1(a, i) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function A1(a, i) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function x1(a, i) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function O1(a, i) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...k(i)
  });
}
function M1(a, i) {
  return new a({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...k(i)
  });
}
function N1(a, i) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...k(i)
  });
}
function j1(a, i) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...k(i)
  });
}
function D1(a, i) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...k(i)
  });
}
function U1(a, i) {
  return new a({
    type: "number",
    checks: [],
    ...k(i)
  });
}
function C1(a, i) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...k(i)
  });
}
function Z1(a) {
  return new a({
    type: "unknown"
  });
}
function R1(a, i) {
  return new a({
    type: "never",
    ...k(i)
  });
}
function Hh(a, i) {
  return new im({
    check: "less_than",
    ...k(i),
    value: a,
    inclusive: !1
  });
}
function Wo(a, i) {
  return new im({
    check: "less_than",
    ...k(i),
    value: a,
    inclusive: !0
  });
}
function qh(a, i) {
  return new cm({
    check: "greater_than",
    ...k(i),
    value: a,
    inclusive: !1
  });
}
function Fo(a, i) {
  return new cm({
    check: "greater_than",
    ...k(i),
    value: a,
    inclusive: !0
  });
}
function Bh(a, i) {
  return new Py({
    check: "multiple_of",
    ...k(i),
    value: a
  });
}
function dm(a, i) {
  return new tg({
    check: "max_length",
    ...k(i),
    maximum: a
  });
}
function bi(a, i) {
  return new ng({
    check: "min_length",
    ...k(i),
    minimum: a
  });
}
function hm(a, i) {
  return new lg({
    check: "length_equals",
    ...k(i),
    length: a
  });
}
function w1(a, i) {
  return new ag({
    check: "string_format",
    format: "regex",
    ...k(i),
    pattern: a
  });
}
function H1(a) {
  return new ug({
    check: "string_format",
    format: "lowercase",
    ...k(a)
  });
}
function q1(a) {
  return new ig({
    check: "string_format",
    format: "uppercase",
    ...k(a)
  });
}
function B1(a, i) {
  return new cg({
    check: "string_format",
    format: "includes",
    ...k(i),
    includes: a
  });
}
function Y1(a, i) {
  return new og({
    check: "string_format",
    format: "starts_with",
    ...k(i),
    prefix: a
  });
}
function G1(a, i) {
  return new rg({
    check: "string_format",
    format: "ends_with",
    ...k(i),
    suffix: a
  });
}
function Il(a) {
  return new fg({
    check: "overwrite",
    tx: a
  });
}
function X1(a) {
  return Il((i) => i.normalize(a));
}
function L1() {
  return Il((a) => a.trim());
}
function Q1() {
  return Il((a) => a.toLowerCase());
}
function V1() {
  return Il((a) => a.toUpperCase());
}
function k1() {
  return Il((a) => ay(a));
}
function K1(a, i, o) {
  return new a({
    type: "array",
    element: i,
    // get element() {
    //   return element;
    // },
    ...k(o)
  });
}
function $1(a, i, o) {
  return new a({
    type: "custom",
    check: "custom",
    fn: i,
    ...k(o)
  });
}
function J1(a) {
  const i = W1((o) => (o.addIssue = (r) => {
    if (typeof r == "string")
      o.issues.push($a(r, o.value, i._zod.def));
    else {
      const d = r;
      d.fatal && (d.continue = !1), d.code ?? (d.code = "custom"), d.input ?? (d.input = o.value), d.inst ?? (d.inst = i), d.continue ?? (d.continue = !i._zod.def.abort), o.issues.push($a(d));
    }
  }, a(o.value, o)));
  return i;
}
function W1(a, i) {
  const o = new ht({
    check: "custom",
    ...k(i)
  });
  return o._zod.check = a, o;
}
const F1 = /* @__PURE__ */ U("ZodISODateTime", (a, i) => {
  Tg.init(a, i), Ue.init(a, i);
});
function I1(a) {
  return M1(F1, a);
}
const P1 = /* @__PURE__ */ U("ZodISODate", (a, i) => {
  Ag.init(a, i), Ue.init(a, i);
});
function ep(a) {
  return N1(P1, a);
}
const tp = /* @__PURE__ */ U("ZodISOTime", (a, i) => {
  xg.init(a, i), Ue.init(a, i);
});
function np(a) {
  return j1(tp, a);
}
const lp = /* @__PURE__ */ U("ZodISODuration", (a, i) => {
  Og.init(a, i), Ue.init(a, i);
});
function ap(a) {
  return D1(lp, a);
}
const up = (a, i) => {
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
        a.issues.push(o), a.message = JSON.stringify(a.issues, Io, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        a.issues.push(...o), a.message = JSON.stringify(a.issues, Io, 2);
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
}, qt = U("ZodError", up, {
  Parent: Error
}), ip = /* @__PURE__ */ cr(qt), cp = /* @__PURE__ */ or(qt), op = /* @__PURE__ */ zi(qt), rp = /* @__PURE__ */ Ei(qt), fp = /* @__PURE__ */ _y(qt), sp = /* @__PURE__ */ Sy(qt), dp = /* @__PURE__ */ zy(qt), hp = /* @__PURE__ */ Ey(qt), mp = /* @__PURE__ */ Ty(qt), vp = /* @__PURE__ */ Ay(qt), yp = /* @__PURE__ */ xy(qt), gp = /* @__PURE__ */ Oy(qt), Le = /* @__PURE__ */ U("ZodType", (a, i) => (He.init(a, i), a.def = i, a.type = i.type, Object.defineProperty(a, "_def", { value: i }), a.check = (...o) => a.clone(cl(i, {
  checks: [
    ...i.checks ?? [],
    ...o.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
})), a.clone = (o, r) => Yn(a, o, r), a.brand = () => a, a.register = ((o, r) => (o.add(a, r), a)), a.parse = (o, r) => ip(a, o, r, { callee: a.parse }), a.safeParse = (o, r) => op(a, o, r), a.parseAsync = async (o, r) => cp(a, o, r, { callee: a.parseAsync }), a.safeParseAsync = async (o, r) => rp(a, o, r), a.spa = a.safeParseAsync, a.encode = (o, r) => fp(a, o, r), a.decode = (o, r) => sp(a, o, r), a.encodeAsync = async (o, r) => dp(a, o, r), a.decodeAsync = async (o, r) => hp(a, o, r), a.safeEncode = (o, r) => mp(a, o, r), a.safeDecode = (o, r) => vp(a, o, r), a.safeEncodeAsync = async (o, r) => yp(a, o, r), a.safeDecodeAsync = async (o, r) => gp(a, o, r), a.refine = (o, r) => a.check(c2(o, r)), a.superRefine = (o) => a.check(o2(o)), a.overwrite = (o) => a.check(Il(o)), a.optional = () => Lh(a), a.nullable = () => Qh(a), a.nullish = () => Lh(Qh(a)), a.nonoptional = (o) => e2(a, o), a.array = () => Ja(a), a.or = (o) => Lp([a, o]), a.and = (o) => Vp(a, o), a.transform = (o) => Vh(a, $p(o)), a.default = (o) => Fp(a, o), a.prefault = (o) => Pp(a, o), a.catch = (o) => n2(a, o), a.pipe = (o) => Vh(a, o), a.readonly = () => u2(a), a.describe = (o) => {
  const r = a.clone();
  return vi.add(r, { description: o }), r;
}, Object.defineProperty(a, "description", {
  get() {
    return vi.get(a)?.description;
  },
  configurable: !0
}), a.meta = (...o) => {
  if (o.length === 0)
    return vi.get(a);
  const r = a.clone();
  return vi.add(r, o[0]), r;
}, a.isOptional = () => a.safeParse(void 0).success, a.isNullable = () => a.safeParse(null).success, a)), mm = /* @__PURE__ */ U("_ZodString", (a, i) => {
  rr.init(a, i), Le.init(a, i);
  const o = a._zod.bag;
  a.format = o.format ?? null, a.minLength = o.minimum ?? null, a.maxLength = o.maximum ?? null, a.regex = (...r) => a.check(w1(...r)), a.includes = (...r) => a.check(B1(...r)), a.startsWith = (...r) => a.check(Y1(...r)), a.endsWith = (...r) => a.check(G1(...r)), a.min = (...r) => a.check(bi(...r)), a.max = (...r) => a.check(dm(...r)), a.length = (...r) => a.check(hm(...r)), a.nonempty = (...r) => a.check(bi(1, ...r)), a.lowercase = (r) => a.check(H1(r)), a.uppercase = (r) => a.check(q1(r)), a.trim = () => a.check(L1()), a.normalize = (...r) => a.check(X1(...r)), a.toLowerCase = () => a.check(Q1()), a.toUpperCase = () => a.check(V1()), a.slugify = () => a.check(k1());
}), pp = /* @__PURE__ */ U("ZodString", (a, i) => {
  rr.init(a, i), mm.init(a, i), a.email = (o) => a.check(c1(bp, o)), a.url = (o) => a.check(d1(_p, o)), a.jwt = (o) => a.check(O1(Rp, o)), a.emoji = (o) => a.check(h1(Sp, o)), a.guid = (o) => a.check(wh(Yh, o)), a.uuid = (o) => a.check(o1(yi, o)), a.uuidv4 = (o) => a.check(r1(yi, o)), a.uuidv6 = (o) => a.check(f1(yi, o)), a.uuidv7 = (o) => a.check(s1(yi, o)), a.nanoid = (o) => a.check(m1(zp, o)), a.guid = (o) => a.check(wh(Yh, o)), a.cuid = (o) => a.check(v1(Ep, o)), a.cuid2 = (o) => a.check(y1(Tp, o)), a.ulid = (o) => a.check(g1(Ap, o)), a.base64 = (o) => a.check(T1(Up, o)), a.base64url = (o) => a.check(A1(Cp, o)), a.xid = (o) => a.check(p1(xp, o)), a.ksuid = (o) => a.check(b1(Op, o)), a.ipv4 = (o) => a.check(_1(Mp, o)), a.ipv6 = (o) => a.check(S1(Np, o)), a.cidrv4 = (o) => a.check(z1(jp, o)), a.cidrv6 = (o) => a.check(E1(Dp, o)), a.e164 = (o) => a.check(x1(Zp, o)), a.datetime = (o) => a.check(I1(o)), a.date = (o) => a.check(ep(o)), a.time = (o) => a.check(np(o)), a.duration = (o) => a.check(ap(o));
});
function De(a) {
  return i1(pp, a);
}
const Ue = /* @__PURE__ */ U("ZodStringFormat", (a, i) => {
  Ne.init(a, i), mm.init(a, i);
}), bp = /* @__PURE__ */ U("ZodEmail", (a, i) => {
  vg.init(a, i), Ue.init(a, i);
}), Yh = /* @__PURE__ */ U("ZodGUID", (a, i) => {
  hg.init(a, i), Ue.init(a, i);
}), yi = /* @__PURE__ */ U("ZodUUID", (a, i) => {
  mg.init(a, i), Ue.init(a, i);
}), _p = /* @__PURE__ */ U("ZodURL", (a, i) => {
  yg.init(a, i), Ue.init(a, i);
}), Sp = /* @__PURE__ */ U("ZodEmoji", (a, i) => {
  gg.init(a, i), Ue.init(a, i);
}), zp = /* @__PURE__ */ U("ZodNanoID", (a, i) => {
  pg.init(a, i), Ue.init(a, i);
}), Ep = /* @__PURE__ */ U("ZodCUID", (a, i) => {
  bg.init(a, i), Ue.init(a, i);
}), Tp = /* @__PURE__ */ U("ZodCUID2", (a, i) => {
  _g.init(a, i), Ue.init(a, i);
}), Ap = /* @__PURE__ */ U("ZodULID", (a, i) => {
  Sg.init(a, i), Ue.init(a, i);
}), xp = /* @__PURE__ */ U("ZodXID", (a, i) => {
  zg.init(a, i), Ue.init(a, i);
}), Op = /* @__PURE__ */ U("ZodKSUID", (a, i) => {
  Eg.init(a, i), Ue.init(a, i);
}), Mp = /* @__PURE__ */ U("ZodIPv4", (a, i) => {
  Mg.init(a, i), Ue.init(a, i);
}), Np = /* @__PURE__ */ U("ZodIPv6", (a, i) => {
  Ng.init(a, i), Ue.init(a, i);
}), jp = /* @__PURE__ */ U("ZodCIDRv4", (a, i) => {
  jg.init(a, i), Ue.init(a, i);
}), Dp = /* @__PURE__ */ U("ZodCIDRv6", (a, i) => {
  Dg.init(a, i), Ue.init(a, i);
}), Up = /* @__PURE__ */ U("ZodBase64", (a, i) => {
  Ug.init(a, i), Ue.init(a, i);
}), Cp = /* @__PURE__ */ U("ZodBase64URL", (a, i) => {
  Zg.init(a, i), Ue.init(a, i);
}), Zp = /* @__PURE__ */ U("ZodE164", (a, i) => {
  Rg.init(a, i), Ue.init(a, i);
}), Rp = /* @__PURE__ */ U("ZodJWT", (a, i) => {
  Hg.init(a, i), Ue.init(a, i);
}), vm = /* @__PURE__ */ U("ZodNumber", (a, i) => {
  rm.init(a, i), Le.init(a, i), a.gt = (r, d) => a.check(qh(r, d)), a.gte = (r, d) => a.check(Fo(r, d)), a.min = (r, d) => a.check(Fo(r, d)), a.lt = (r, d) => a.check(Hh(r, d)), a.lte = (r, d) => a.check(Wo(r, d)), a.max = (r, d) => a.check(Wo(r, d)), a.int = (r) => a.check(Xh(r)), a.safe = (r) => a.check(Xh(r)), a.positive = (r) => a.check(qh(0, r)), a.nonnegative = (r) => a.check(Fo(0, r)), a.negative = (r) => a.check(Hh(0, r)), a.nonpositive = (r) => a.check(Wo(0, r)), a.multipleOf = (r, d) => a.check(Bh(r, d)), a.step = (r, d) => a.check(Bh(r, d)), a.finite = () => a;
  const o = a._zod.bag;
  a.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, a.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, a.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), a.isFinite = !0, a.format = o.format ?? null;
});
function Gh(a) {
  return U1(vm, a);
}
const wp = /* @__PURE__ */ U("ZodNumberFormat", (a, i) => {
  qg.init(a, i), vm.init(a, i);
});
function Xh(a) {
  return C1(wp, a);
}
const Hp = /* @__PURE__ */ U("ZodUnknown", (a, i) => {
  Bg.init(a, i), Le.init(a, i);
});
function _i() {
  return Z1(Hp);
}
const qp = /* @__PURE__ */ U("ZodNever", (a, i) => {
  Yg.init(a, i), Le.init(a, i);
});
function Bp(a) {
  return R1(qp, a);
}
const Yp = /* @__PURE__ */ U("ZodArray", (a, i) => {
  Gg.init(a, i), Le.init(a, i), a.element = i.element, a.min = (o, r) => a.check(bi(o, r)), a.nonempty = (o) => a.check(bi(1, o)), a.max = (o, r) => a.check(dm(o, r)), a.length = (o, r) => a.check(hm(o, r)), a.unwrap = () => a.element;
});
function Ja(a, i) {
  return K1(Yp, a, i);
}
const Gp = /* @__PURE__ */ U("ZodObject", (a, i) => {
  Lg.init(a, i), Le.init(a, i), Ee(a, "shape", () => i.shape), a.keyof = () => Fl(Object.keys(a._zod.def.shape)), a.catchall = (o) => a.clone({ ...a._zod.def, catchall: o }), a.passthrough = () => a.clone({ ...a._zod.def, catchall: _i() }), a.loose = () => a.clone({ ...a._zod.def, catchall: _i() }), a.strict = () => a.clone({ ...a._zod.def, catchall: Bp() }), a.strip = () => a.clone({ ...a._zod.def, catchall: void 0 }), a.extend = (o) => sy(a, o), a.safeExtend = (o) => dy(a, o), a.merge = (o) => hy(a, o), a.pick = (o) => ry(a, o), a.omit = (o) => fy(a, o), a.partial = (...o) => my(gm, a, o[0]), a.required = (...o) => vy(pm, a, o[0]);
});
function Ai(a, i) {
  const o = {
    type: "object",
    shape: a ?? {},
    ...k(i)
  };
  return new Gp(o);
}
const Xp = /* @__PURE__ */ U("ZodUnion", (a, i) => {
  Qg.init(a, i), Le.init(a, i), a.options = i.options;
});
function Lp(a, i) {
  return new Xp({
    type: "union",
    options: a,
    ...k(i)
  });
}
const Qp = /* @__PURE__ */ U("ZodIntersection", (a, i) => {
  Vg.init(a, i), Le.init(a, i);
});
function Vp(a, i) {
  return new Qp({
    type: "intersection",
    left: a,
    right: i
  });
}
const kp = /* @__PURE__ */ U("ZodRecord", (a, i) => {
  kg.init(a, i), Le.init(a, i), a.keyType = i.keyType, a.valueType = i.valueType;
});
function ym(a, i, o) {
  return new kp({
    type: "record",
    keyType: a,
    valueType: i,
    ...k(o)
  });
}
const er = /* @__PURE__ */ U("ZodEnum", (a, i) => {
  Kg.init(a, i), Le.init(a, i), a.enum = i.entries, a.options = Object.values(i.entries);
  const o = new Set(Object.keys(i.entries));
  a.extract = (r, d) => {
    const h = {};
    for (const m of r)
      if (o.has(m))
        h[m] = i.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new er({
      ...i,
      checks: [],
      ...k(d),
      entries: h
    });
  }, a.exclude = (r, d) => {
    const h = { ...i.entries };
    for (const m of r)
      if (o.has(m))
        delete h[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new er({
      ...i,
      checks: [],
      ...k(d),
      entries: h
    });
  };
});
function Fl(a, i) {
  const o = Array.isArray(a) ? Object.fromEntries(a.map((r) => [r, r])) : a;
  return new er({
    type: "enum",
    entries: o,
    ...k(i)
  });
}
const Kp = /* @__PURE__ */ U("ZodTransform", (a, i) => {
  $g.init(a, i), Le.init(a, i), a._zod.parse = (o, r) => {
    if (r.direction === "backward")
      throw new Jh(a.constructor.name);
    o.addIssue = (h) => {
      if (typeof h == "string")
        o.issues.push($a(h, o.value, i));
      else {
        const m = h;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), m.input ?? (m.input = o.value), m.inst ?? (m.inst = a), o.issues.push($a(m));
      }
    };
    const d = i.transform(o.value, o);
    return d instanceof Promise ? d.then((h) => (o.value = h, o)) : (o.value = d, o);
  };
});
function $p(a) {
  return new Kp({
    type: "transform",
    transform: a
  });
}
const gm = /* @__PURE__ */ U("ZodOptional", (a, i) => {
  Jg.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function Lh(a) {
  return new gm({
    type: "optional",
    innerType: a
  });
}
const Jp = /* @__PURE__ */ U("ZodNullable", (a, i) => {
  Wg.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function Qh(a) {
  return new Jp({
    type: "nullable",
    innerType: a
  });
}
const Wp = /* @__PURE__ */ U("ZodDefault", (a, i) => {
  Fg.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function Fp(a, i) {
  return new Wp({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : Ih(i);
    }
  });
}
const Ip = /* @__PURE__ */ U("ZodPrefault", (a, i) => {
  Ig.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function Pp(a, i) {
  return new Ip({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof i == "function" ? i() : Ih(i);
    }
  });
}
const pm = /* @__PURE__ */ U("ZodNonOptional", (a, i) => {
  Pg.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function e2(a, i) {
  return new pm({
    type: "nonoptional",
    innerType: a,
    ...k(i)
  });
}
const t2 = /* @__PURE__ */ U("ZodCatch", (a, i) => {
  e1.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function n2(a, i) {
  return new t2({
    type: "catch",
    innerType: a,
    catchValue: typeof i == "function" ? i : () => i
  });
}
const l2 = /* @__PURE__ */ U("ZodPipe", (a, i) => {
  t1.init(a, i), Le.init(a, i), a.in = i.in, a.out = i.out;
});
function Vh(a, i) {
  return new l2({
    type: "pipe",
    in: a,
    out: i
    // ...util.normalizeParams(params),
  });
}
const a2 = /* @__PURE__ */ U("ZodReadonly", (a, i) => {
  n1.init(a, i), Le.init(a, i), a.unwrap = () => a._zod.def.innerType;
});
function u2(a) {
  return new a2({
    type: "readonly",
    innerType: a
  });
}
const i2 = /* @__PURE__ */ U("ZodCustom", (a, i) => {
  l1.init(a, i), Le.init(a, i);
});
function c2(a, i = {}) {
  return $1(i2, a, i);
}
function o2(a) {
  return J1(a);
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
    const r = Date.now();
    if (this.config.onRequest)
      try {
        this.config.onRequest(i);
      } catch (m) {
        console.warn("onRequest hook error:", m);
      }
    const h = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${i}`;
    try {
      const m = new AbortController(), A = setTimeout(() => m.abort(), this.config.timeout), E = await fetch(h, {
        headers: { ...this.baseHeaders, ...o.headers },
        signal: m.signal,
        ...o
      });
      clearTimeout(A);
      let g;
      const R = E.headers.get("content-type");
      if (R && R.includes("application/json") ? g = await E.json() : g = await E.text(), !E.ok) {
        const C = {
          message: g?.error || `HTTP ${E.status}: ${E.statusText}`,
          statusCode: E.status,
          code: "API_ERROR"
        };
        if (this.config.onError)
          try {
            this.config.onError(C);
          } catch (G) {
            console.warn("onError hook error:", G);
          }
        return { error: C.message };
      }
      if (this.config.onResponse)
        try {
          const C = Date.now() - r;
          this.config.onResponse(i, C);
        } catch (C) {
          console.warn("onResponse hook error:", C);
        }
      return { data: g };
    } catch (m) {
      if (m instanceof Error && m.name === "AbortError") {
        const E = {
          message: "Request timeout",
          code: "TIMEOUT_ERROR",
          statusCode: 408
        };
        if (this.config.onError)
          try {
            this.config.onError(E);
          } catch (g) {
            console.warn("onError hook error:", g);
          }
        return { error: "Request timeout" };
      }
      const A = {
        message: m instanceof Error ? m.message : "Network error",
        code: "NETWORK_ERROR"
      };
      if (this.config.onError)
        try {
          this.config.onError(A);
        } catch (E) {
          console.warn("onError hook error:", E);
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
    const r = o.toString(), d = r ? `/memory?${r}` : "/memory";
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
    const { apiKey: i, authToken: o, ...r } = this.config;
    return r;
  }
}
function f2(a) {
  return new r2(a);
}
const fr = ["context", "project", "knowledge", "reference", "personal", "workflow"], bm = ["active", "archived", "draft", "deleted"];
Ai({
  title: De().min(1).max(500),
  content: De().min(1).max(5e4),
  summary: De().max(1e3).optional(),
  memory_type: Fl(fr).default("context"),
  topic_id: De().uuid().optional(),
  project_ref: De().max(100).optional(),
  tags: Ja(De().min(1).max(50)).max(20).default([]),
  metadata: ym(De(), _i()).optional()
});
Ai({
  title: De().min(1).max(500).optional(),
  content: De().min(1).max(5e4).optional(),
  summary: De().max(1e3).optional(),
  memory_type: Fl(fr).optional(),
  status: Fl(bm).optional(),
  topic_id: De().uuid().nullable().optional(),
  project_ref: De().max(100).nullable().optional(),
  tags: Ja(De().min(1).max(50)).max(20).optional(),
  metadata: ym(De(), _i()).optional()
});
Ai({
  query: De().min(1).max(1e3),
  memory_types: Ja(Fl(fr)).optional(),
  tags: Ja(De()).optional(),
  topic_id: De().uuid().optional(),
  project_ref: De().optional(),
  status: Fl(bm).default("active"),
  limit: Gh().int().min(1).max(100).default(20),
  threshold: Gh().min(0).max(1).default(0.7)
});
Ai({
  name: De().min(1).max(100),
  description: De().max(500).optional(),
  color: De().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: De().max(50).optional(),
  parent_topic_id: De().uuid().optional()
});
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const _m = W.createContext(null);
function s2({ children: a, config: i, apiKey: o, apiUrl: r = "https://api.lanonasis.com", client: d }) {
  const h = W.useMemo(() => d || f2({
    apiUrl: r,
    apiKey: o,
    ...i
  }), [d, r, o, i]);
  return W.createElement(_m.Provider, { value: h }, a);
}
function sr() {
  const a = W.useContext(_m);
  if (!a)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return a;
}
function d2(a) {
  const i = sr(), [o, r] = W.useState([]), [d, h] = W.useState(!0), [m, A] = W.useState(null), E = W.useCallback(async () => {
    h(!0), A(null);
    const g = await i.listMemories(a);
    g.error ? (A({
      message: g.error,
      code: "API_ERROR"
    }), r([])) : g.data && r(g.data.data), h(!1);
  }, [i, JSON.stringify(a)]);
  return W.useEffect(() => {
    E();
  }, [E]), {
    memories: o,
    loading: d,
    error: m,
    refresh: E
  };
}
function h2() {
  const a = sr(), [i, o] = W.useState(!1), [r, d] = W.useState(null);
  return {
    createMemory: W.useCallback(async (m) => {
      o(!0), d(null);
      const A = await a.createMemory(m);
      return A.error ? (d({
        message: A.error,
        code: "API_ERROR"
      }), o(!1), null) : (o(!1), A.data || null);
    }, [a]),
    loading: i,
    error: r
  };
}
function m2(a = 300) {
  const i = sr(), [o, r] = W.useState([]), [d, h] = W.useState(!1), [m, A] = W.useState(null), [E, g] = W.useState(0), [R, C] = W.useState(0), G = W.useRef(null), P = W.useCallback(async (ee, Te) => {
    G.current && clearTimeout(G.current), G.current = setTimeout(async () => {
      h(!0), A(null);
      const ae = await i.searchMemories({
        query: ee,
        ...Te
      });
      ae.error ? (A({
        message: ae.error,
        code: "API_ERROR"
      }), r([]), g(0), C(0)) : ae.data && (r(ae.data.results), g(ae.data.total_results), C(ae.data.search_time_ms)), h(!1);
    }, a);
  }, [i, a]);
  return W.useEffect(() => () => {
    G.current && clearTimeout(G.current);
  }, []), {
    results: o,
    loading: d,
    error: m,
    search: P,
    totalResults: E,
    searchTime: R
  };
}
const Ot = nr.forwardRef(
  ({
    className: a = "",
    variant: i = "default",
    size: o = "default",
    children: r,
    ...d
  }, h) => {
    const m = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", A = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, E = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ _.jsx(
      "button",
      {
        ref: h,
        className: `${m} ${A[i]} ${E[o]} ${a}`,
        ...d,
        children: r
      }
    );
  }
);
Ot.displayName = "Button";
const dr = nr.forwardRef(
  ({ className: a = "", type: i = "text", ...o }, r) => /* @__PURE__ */ _.jsx(
    "input",
    {
      ref: r,
      type: i,
      className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${a}`,
      ...o
    }
  )
);
dr.displayName = "Input";
const Sm = ({
  className: a = "",
  size: i = 24
}) => /* @__PURE__ */ _.jsx(
  "svg",
  {
    width: i,
    height: i,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: a,
    children: /* @__PURE__ */ _.jsx(
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
), xt = {
  search: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ _.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  ),
  plus: /* @__PURE__ */ _.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ _.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  ),
  refresh: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
        /* @__PURE__ */ _.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
      ]
    }
  ),
  settings: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ _.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
      ]
    }
  ),
  logout: /* @__PURE__ */ _.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ _.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
    }
  ),
  chevronRight: /* @__PURE__ */ _.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ _.jsx("polyline", { points: "9,18 15,12 9,6" })
    }
  ),
  globe: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ _.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ _.jsx("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
      ]
    }
  ),
  lightbulb: /* @__PURE__ */ _.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ _.jsx("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
    }
  ),
  file: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
        /* @__PURE__ */ _.jsx("polyline", { points: "14,2 14,8 20,8" })
      ]
    }
  ),
  send: /* @__PURE__ */ _.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ _.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        /* @__PURE__ */ _.jsx("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })
      ]
    }
  ),
  paperclip: /* @__PURE__ */ _.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ _.jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
    }
  )
}, v2 = ({
  onLoginOAuth: a,
  onLoginApiKey: i,
  isLoading: o = !1,
  error: r = null
}) => {
  const [d, h] = W.useState(!1), [m, A] = W.useState(""), E = () => {
    m.trim() && i && i(m.trim());
  };
  return /* @__PURE__ */ _.jsxs("div", { className: "p-4 space-y-6 select-none", children: [
    /* @__PURE__ */ _.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-2 text-[var(--vscode-sideBarTitle-foreground)]", children: [
        /* @__PURE__ */ _.jsx(Sm, { className: "h-5 w-5", size: 20 }),
        /* @__PURE__ */ _.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ _.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Welcome to L0 Memory" }),
      /* @__PURE__ */ _.jsx("p", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "Authenticate to access synchronized context and intelligent memory." }),
      r && /* @__PURE__ */ _.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: r }),
      d ? /* @__PURE__ */ _.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ _.jsx(
          dr,
          {
            type: "password",
            placeholder: "Enter your API key (lano_... or lns_...)",
            value: m,
            onChange: (g) => A(g.target.value),
            className: "h-8 text-[13px]",
            autoFocus: !0,
            onKeyDown: (g) => g.key === "Enter" && E()
          }
        ),
        /* @__PURE__ */ _.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ _.jsx(
            Ot,
            {
              className: "flex-1",
              onClick: E,
              disabled: !m.trim() || o,
              children: o ? "Connecting..." : "Connect"
            }
          ),
          /* @__PURE__ */ _.jsx(
            Ot,
            {
              variant: "secondary",
              onClick: () => {
                h(!1), A("");
              },
              children: "Cancel"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ _.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ _.jsx(
          Ot,
          {
            className: "w-full",
            onClick: a,
            disabled: o,
            children: o ? "Connecting..." : "Connect in Browser"
          }
        ),
        /* @__PURE__ */ _.jsx(
          Ot,
          {
            className: "w-full",
            variant: "secondary",
            onClick: () => h(!0),
            disabled: o,
            children: "Enter API Key"
          }
        ),
        /* @__PURE__ */ _.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] text-center opacity-70", children: 'Or use Command Palette: "LanOnasis: Authenticate"' })
      ] })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "h-px bg-[var(--vscode-panel-border)] w-full" }),
    /* @__PURE__ */ _.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ _.jsx("h3", { className: "text-[11px] font-bold text-[var(--vscode-editor-foreground)] uppercase opacity-80", children: "Features" }),
      /* @__PURE__ */ _.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ _.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ _.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: xt.lightbulb }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ _.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Intelligent Memory" }),
            /* @__PURE__ */ _.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Vector search and semantic understanding for your codebase." })
          ] })
        ] }),
        /* @__PURE__ */ _.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ _.jsx("span", { className: "mt-0.5 text-[var(--vscode-button-background)]", children: xt.globe }),
          /* @__PURE__ */ _.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ _.jsx("h4", { className: "text-[12px] font-medium text-[var(--vscode-editor-foreground)]", children: "Real-time Sync" }),
            /* @__PURE__ */ _.jsx("p", { className: "text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80", children: "Synchronized context across all your devices." })
          ] })
        ] })
      ] })
    ] })
  ] });
}, y2 = ({ memory: a, onClick: i }) => {
  const o = (r) => {
    if (!r) return "—";
    try {
      return new Date(r).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    } catch {
      return "—";
    }
  };
  return /* @__PURE__ */ _.jsxs(
    "div",
    {
      className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
      onClick: i,
      children: [
        /* @__PURE__ */ _.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ _.jsx("span", { className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0", children: xt.file }),
          /* @__PURE__ */ _.jsx("h3", { className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1", children: a.title })
        ] }) }),
        /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5", children: [
          /* @__PURE__ */ _.jsx("span", { className: "opacity-60", children: o(a.created_at) }),
          /* @__PURE__ */ _.jsx("span", { className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60", children: a.memory_type }),
          a.tags?.slice(0, 2).map((r) => /* @__PURE__ */ _.jsxs(
            "span",
            {
              className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
              children: [
                "#",
                r
              ]
            },
            r
          ))
        ] })
      ]
    }
  );
}, kh = ({
  title: a,
  isOpen: i,
  onToggle: o,
  actions: r
}) => /* @__PURE__ */ _.jsxs(
  "div",
  {
    className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
    onClick: o,
    children: [
      /* @__PURE__ */ _.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ _.jsx(
          "span",
          {
            className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${i ? "rotate-90" : ""}`,
            children: xt.chevronRight
          }
        ),
        /* @__PURE__ */ _.jsx("span", { className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase", children: a })
      ] }),
      r && /* @__PURE__ */ _.jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: r })
    ]
  }
), g2 = ({ syncStatus: a, onSync: i }) => a.isOnline && a.pendingCount === 0 ? null : /* @__PURE__ */ _.jsxs("div", { className: `px-3 py-2 text-[11px] flex items-center justify-between ${a.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`, children: [
  /* @__PURE__ */ _.jsx("div", { className: "flex items-center gap-2", children: a.isOnline ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "animate-pulse", children: [
      /* @__PURE__ */ _.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
      /* @__PURE__ */ _.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
    ] }),
    /* @__PURE__ */ _.jsxs("span", { children: [
      a.pendingCount,
      " pending"
    ] })
  ] }) : /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
    /* @__PURE__ */ _.jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ _.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
      /* @__PURE__ */ _.jsx("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
      /* @__PURE__ */ _.jsx("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
      /* @__PURE__ */ _.jsx("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
      /* @__PURE__ */ _.jsx("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
      /* @__PURE__ */ _.jsx("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
      /* @__PURE__ */ _.jsx("line", { x1: "12", y1: "20", x2: "12.01", y2: "20" })
    ] }),
    /* @__PURE__ */ _.jsx("span", { children: "Offline" })
  ] }) }),
  a.pendingCount > 0 && a.isOnline && /* @__PURE__ */ _.jsx(
    "button",
    {
      onClick: i,
      disabled: a.isSyncing,
      className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
      children: a.isSyncing ? "Syncing..." : "Sync now"
    }
  )
] }), p2 = ({ message: a }) => {
  const i = a.role === "user";
  return /* @__PURE__ */ _.jsxs("div", { className: `flex flex-col gap-1 ${i ? "items-end" : "items-start"}`, children: [
    /* @__PURE__ */ _.jsx("div", { className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${i ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`, children: a.content }),
    !i && a.memories && a.memories.length > 0 && /* @__PURE__ */ _.jsxs("div", { className: "w-full mt-2 space-y-1", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1", children: [
        "Related memories (",
        a.memories.length,
        ")"
      ] }),
      a.memories.slice(0, 3).map((o) => /* @__PURE__ */ _.jsxs(
        "div",
        {
          className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px]",
          children: [
            /* @__PURE__ */ _.jsx("div", { className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1", children: o.title }),
            /* @__PURE__ */ _.jsxs("div", { className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5", children: [
              o.content.slice(0, 100),
              o.content.length > 100 ? "..." : ""
            ] }),
            o._pending && /* @__PURE__ */ _.jsx("div", { className: "text-[10px] text-yellow-400 mt-1", children: "⏳ Pending sync" })
          ]
        },
        o.id
      ))
    ] })
  ] });
}, b2 = ({
  initialChatInput: a = "",
  onAttachFromClipboard: i,
  isAuthenticated: o = !1,
  onLoginOAuth: r,
  onLoginApiKey: d,
  onLogout: h,
  authLoading: m = !1,
  authError: A = null,
  userEmail: E = null
}) => {
  const { memories: g, loading: R, refresh: C } = d2(), { createMemory: G, loading: P } = h2(), {
    search: ee,
    results: Te,
    loading: ae
  } = m2(), [re, tt] = W.useState(""), [de, ye] = W.useState(a), [qe, Ie] = W.useState(!0), [te, Pe] = W.useState(!0), [nt, Kt] = W.useState(!1), [at, je] = W.useState([]), [Bt, mt] = W.useState(!1), [ut, O] = W.useState([]), [Z, V] = W.useState({
    isOnline: !0,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: !1
  }), oe = W.useRef(null);
  W.useEffect(() => {
    a !== void 0 && ye(a);
  }, [a]), W.useEffect(() => {
    const w = (K) => {
      const q = K.data;
      if (!(!q || typeof q != "object")) {
        if (q.type === "lanonasis:cache:data" && (O(q.payload?.memories || []), q.payload?.status && V(q.payload.status)), q.type === "lanonasis:sync:start" && V((he) => ({ ...he, isSyncing: !0 })), q.type === "lanonasis:sync:complete" && (O(q.payload?.memories || []), V(q.payload?.status || { ...Z, isSyncing: !1 })), q.type === "lanonasis:sync:error" && V((he) => ({ ...he, isSyncing: !1, isOnline: !1 })), q.type === "lanonasis:ai:search:local") {
          const he = q.payload?.results || [];
          he.length > 0 && je((L) => {
            const Oe = L[L.length - 1];
            return Oe?.role === "assistant" ? [...L.slice(0, -1), { ...Oe, memories: he }] : L;
          });
        }
        if (q.type === "lanonasis:ai:search:api") {
          const he = q.payload?.results || [];
          mt(!1), je((L) => {
            const Oe = L[L.length - 1];
            if (Oe?.role === "assistant") {
              const vt = new Set((Oe.memories || []).map((ol) => ol.id)), Pl = he.filter((ol) => !vt.has(ol.id));
              return [...L.slice(0, -1), {
                ...Oe,
                memories: [...Oe.memories || [], ...Pl].slice(0, 5)
              }];
            }
            return L;
          });
        }
        if (q.type === "lanonasis:cache:added") {
          const he = q.payload?.memory;
          he && (O((L) => [he, ...L]), V((L) => ({ ...L, pendingCount: L.pendingCount + 1 })));
        }
      }
    };
    return window.addEventListener("message", w), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", w);
  }, []), W.useEffect(() => {
    oe.current && (oe.current.scrollTop = oe.current.scrollHeight);
  }, [at]), W.useEffect(() => {
    re.length > 2 && ee(re);
  }, [re, ee]);
  const ve = re.length > 2 ? Te : g.length > 0 ? g : ut, p = async () => {
    const w = de.trim() || re.trim();
    if (!w) {
      const K = document.querySelector("textarea");
      K && (K.focus(), K.placeholder = "Type content to save as a memory...");
      return;
    }
    try {
      const K = {
        title: w.slice(0, 50) + (w.length > 50 ? "..." : ""),
        content: w,
        memory_type: "knowledge",
        tags: []
      };
      await G(K), ye(""), await C();
    } catch (K) {
      console.error("Failed to create memory:", K), window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: {
          memory: {
            title: w.slice(0, 50) + (w.length > 50 ? "..." : ""),
            content: w,
            memory_type: "knowledge",
            tags: []
          }
        }
      }), ye(""));
    }
  }, j = async () => {
    Kt(!0);
    try {
      window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), await C();
    } finally {
      Kt(!1);
    }
  }, H = (w) => {
    const K = w.toLowerCase().trim();
    if (K === "help" || K === "?" || K.includes("how do i"))
      return { action: "help", query: w };
    const q = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i
    ];
    for (const he of q) {
      const L = w.match(he);
      if (L)
        return { action: "create", query: L[1] || w };
    }
    return { action: "search", query: w };
  }, B = async () => {
    const w = de.trim();
    if (!w) return;
    const K = {
      id: `user_${Date.now()}`,
      role: "user",
      content: w,
      timestamp: Date.now()
    };
    je((L) => [...L, K]), ye("");
    const q = H(w);
    if (q.action === "help") {
      const L = {
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
      je((Oe) => [...Oe, L]);
      return;
    }
    if (q.action === "create") {
      try {
        const L = {
          title: q.query.slice(0, 50) + (q.query.length > 50 ? "..." : ""),
          content: q.query,
          memory_type: "knowledge",
          tags: []
        };
        await G(L);
        const Oe = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved: "${q.query.slice(0, 50)}${q.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now()
        };
        je((vt) => [...vt, Oe]), await C();
      } catch {
        window.vscode && window.vscode.postMessage({
          type: "lanonasis:cache:add",
          payload: {
            memory: {
              title: q.query.slice(0, 50) + (q.query.length > 50 ? "..." : ""),
              content: q.query,
              memory_type: "knowledge",
              tags: []
            }
          }
        });
        const Oe = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved locally (will sync when online): "${q.query.slice(0, 50)}${q.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now()
        };
        je((vt) => [...vt, Oe]);
      }
      return;
    }
    mt(!0);
    const he = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${q.query}"`,
      memories: [],
      timestamp: Date.now()
    };
    je((L) => [...L, he]), window.vscode && window.vscode.postMessage({
      type: "lanonasis:ai:search",
      payload: { query: q.query }
    });
    try {
      const L = await ee(q.query);
      L && L.length > 0 && je((Oe) => {
        const vt = Oe[Oe.length - 1];
        return vt?.role === "assistant" ? [...Oe.slice(0, -1), {
          ...vt,
          content: L.length > 0 ? `Found ${L.length} relevant memories:` : `No memories found for "${q.query}"`,
          memories: L
        }] : Oe;
      });
    } catch {
      console.log("API search failed, using local results");
    } finally {
      mt(!1);
    }
  };
  return /* @__PURE__ */ _.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ _.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    /* @__PURE__ */ _.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ _.jsx(
          Sm,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ _.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }),
      /* @__PURE__ */ _.jsx("div", { className: "flex items-center gap-1", children: o ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
        /* @__PURE__ */ _.jsx(
          "div",
          {
            className: `h-1.5 w-1.5 rounded-full mr-1 ${Z.isOnline ? "bg-green-500" : "bg-red-500"}`,
            title: Z.isOnline ? "Online" : "Offline"
          }
        ),
        E && /* @__PURE__ */ _.jsx(
          "span",
          {
            className: "text-[10px] text-[var(--vscode-descriptionForeground)] mr-2 max-w-[100px] truncate",
            title: E,
            children: E
          }
        ),
        /* @__PURE__ */ _.jsx(Ot, { variant: "ghost", size: "icon", title: "Settings", children: xt.settings }),
        /* @__PURE__ */ _.jsx(
          Ot,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: h,
            children: xt.logout
          }
        )
      ] }) : /* @__PURE__ */ _.jsx(
        "div",
        {
          className: "h-1.5 w-1.5 rounded-full bg-yellow-500",
          title: "Not connected"
        }
      ) })
    ] }),
    o && /* @__PURE__ */ _.jsx(g2, { syncStatus: Z, onSync: j }),
    /* @__PURE__ */ _.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ _.jsx(
        kh,
        {
          title: "Memory Assistant",
          isOpen: qe,
          onToggle: () => Ie(!qe)
        }
      ),
      qe && /* @__PURE__ */ _.jsxs(
        "div",
        {
          ref: oe,
          className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3",
          children: [
            at.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "text-[13px] text-[var(--vscode-descriptionForeground)] flex flex-col items-center justify-center text-center py-4", children: o ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
              /* @__PURE__ */ _.jsx("div", { className: "text-[var(--vscode-button-background)] mb-2", children: xt.lightbulb }),
              /* @__PURE__ */ _.jsx("p", { className: "italic opacity-80", children: "Ask me to find or save memories" }),
              /* @__PURE__ */ _.jsx("p", { className: "text-[11px] mt-1 opacity-60", children: 'Try: "find my OAuth notes"' })
            ] }) : /* @__PURE__ */ _.jsx("p", { className: "italic opacity-80", children: "Please connect to enable AI assistance." }) }) : at.map((w) => /* @__PURE__ */ _.jsx(p2, { message: w }, w.id)),
            Bt && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ _.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ _.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                /* @__PURE__ */ _.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              "Searching..."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ _.jsx(
        kh,
        {
          title: `Memories${Z.pendingCount > 0 ? ` (${Z.pendingCount} pending)` : ""}`,
          isOpen: te,
          onToggle: () => Pe(!te),
          actions: o && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
            /* @__PURE__ */ _.jsx(Ot, { variant: "ghost", size: "icon", children: xt.search }),
            /* @__PURE__ */ _.jsx(Ot, { variant: "ghost", size: "icon", onClick: j, children: /* @__PURE__ */ _.jsx("span", { className: nt || Z.isSyncing ? "animate-spin" : "", children: xt.refresh }) })
          ] })
        }
      ),
      te && /* @__PURE__ */ _.jsx("div", { className: "flex-1", children: o ? /* @__PURE__ */ _.jsxs("div", { className: "p-2 space-y-2", children: [
        /* @__PURE__ */ _.jsx(
          dr,
          {
            placeholder: "Search memories...",
            value: re,
            onChange: (w) => tt(w.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ _.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ _.jsxs(
            Ot,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: p,
              disabled: P,
              children: [
                P ? /* @__PURE__ */ _.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ _.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                  /* @__PURE__ */ _.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                ] }) : xt.plus,
                P ? "Creating..." : "Create"
              ]
            }
          ),
          /* @__PURE__ */ _.jsxs(
            Ot,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: j,
              disabled: nt || Z.isSyncing,
              children: [
                /* @__PURE__ */ _.jsx("span", { className: nt || Z.isSyncing ? "animate-spin" : "", children: xt.refresh }),
                nt || Z.isSyncing ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ _.jsx("div", { className: "space-y-0.5", children: R || ae ? /* @__PURE__ */ _.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : ve.length === 0 ? /* @__PURE__ */ _.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: re ? "No memories found" : ut.length > 0 ? "Loading from cache..." : "No memories yet. Create one!" }) : ve.map((w) => /* @__PURE__ */ _.jsx(y2, { memory: w }, w.id)) })
      ] }) : /* @__PURE__ */ _.jsx(
        v2,
        {
          onLoginOAuth: r,
          onLoginApiKey: d,
          isLoading: m,
          error: A
        }
      ) })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ _.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ _.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ _.jsx(
        "textarea",
        {
          value: de,
          onChange: (w) => ye(w.target.value),
          onKeyDown: (w) => {
            w.key === "Enter" && !w.shiftKey && (w.preventDefault(), B());
          },
          placeholder: o ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Connect to chat",
          disabled: !o,
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
        }
      ) }),
      /* @__PURE__ */ _.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ _.jsx(
        Ot,
        {
          size: "icon",
          variant: "ghost",
          className: "h-6 w-6",
          disabled: !o,
          onClick: i,
          title: "Attach from clipboard",
          children: xt.paperclip
        }
      ) }),
      /* @__PURE__ */ _.jsx("div", { className: "absolute right-2 bottom-1.5", children: /* @__PURE__ */ _.jsx(
        Ot,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !o || !de.trim() || Bt,
          onClick: B,
          title: "Send (Enter)",
          children: Bt ? /* @__PURE__ */ _.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ _.jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
            /* @__PURE__ */ _.jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
          ] }) : xt.send
        }
      ) })
    ] }) })
  ] }) });
};
typeof window < "u" && typeof window.acquireVsCodeApi == "function" && (window.vscode = window.acquireVsCodeApi());
const Kh = document.getElementById("root");
function _2() {
  const [a, i] = W.useState(""), [o, r] = W.useState(void 0), [d, h] = W.useState("https://api.lanonasis.com"), [m, A] = W.useState(!1), [E, g] = W.useState(null);
  W.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const ee = (Te) => {
      const ae = Te.data;
      if (!(!ae || typeof ae != "object")) {
        if (ae.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if (ae.type === "lanonasis:config:init" || ae.type === "lanonasis:config:update") {
          const re = ae.payload?.apiUrl, tt = ae.payload?.apiKey;
          re && h(re), tt !== void 0 && (r(tt || void 0), A(!1), g(null), console.log("[Webview] API key received from host"));
          return;
        }
        if (ae.type === "lanonasis:auth:result") {
          A(!1), ae.payload?.success ? g(null) : g(ae.payload?.error || "Authentication failed");
          return;
        }
        if (ae.type === "lanonasis:memory:createFromSelection") {
          const re = ae.payload?.text ?? "";
          re && i(re);
          return;
        }
        if (ae.type === "lanonasis:clipboard:read:result") {
          const re = ae.payload?.text ?? "";
          re && i(re);
          return;
        }
      }
    };
    return window.addEventListener("message", ee), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", ee);
    };
  }, []);
  const R = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, C = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (A(!0), g(null), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, G = (ee) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (A(!0), g(null), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: ee }
    }));
  }, P = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), r(void 0), g(null), A(!1));
  };
  return /* @__PURE__ */ _.jsx(s2, { apiKey: o, apiUrl: d, children: /* @__PURE__ */ _.jsx(
    b2,
    {
      initialChatInput: a,
      onAttachFromClipboard: R,
      isAuthenticated: !!o,
      onLoginOAuth: C,
      onLoginApiKey: G,
      onLogout: P,
      authLoading: m,
      authError: E
    }
  ) });
}
Kh && ty.createRoot(Kh).render(
  /* @__PURE__ */ _.jsx(nr.StrictMode, { children: /* @__PURE__ */ _.jsx(_2, {}) })
);
