function _m(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var Sr = { exports: {} }, Tu = {};
var Zh;
function dy() {
  if (Zh) return Tu;
  Zh = 1;
  var l = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.fragment");
  function o(r, s, m) {
    var h = null;
    if (m !== void 0 && (h = "" + m), s.key !== void 0 && (h = "" + s.key), "key" in s) {
      m = {};
      for (var y in s)
        y !== "key" && (m[y] = s[y]);
    } else m = s;
    return s = m.ref, {
      $$typeof: l,
      type: r,
      key: h,
      ref: s !== void 0 ? s : null,
      props: m
    };
  }
  return Tu.Fragment = u, Tu.jsx = o, Tu.jsxs = o, Tu;
}
var zr = { exports: {} }, le = {};
var qh;
function hy() {
  if (qh) return le;
  qh = 1;
  var l = /* @__PURE__ */ Symbol.for("react.transitional.element"), u = /* @__PURE__ */ Symbol.for("react.portal"), o = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), m = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), y = /* @__PURE__ */ Symbol.for("react.forward_ref"), b = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), N = /* @__PURE__ */ Symbol.for("react.lazy"), A = /* @__PURE__ */ Symbol.for("react.activity"), Z = Symbol.iterator;
  function q(_) {
    return _ === null || typeof _ != "object" ? null : (_ = Z && _[Z] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var ne = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ee = Object.assign, ve = {};
  function Ue(_, D, B) {
    this.props = _, this.context = D, this.refs = ve, this.updater = B || ne;
  }
  Ue.prototype.isReactComponent = {}, Ue.prototype.setState = function(_, D) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, D, "setState");
  }, Ue.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function ke() {
  }
  ke.prototype = Ue.prototype;
  function ge(_, D, B) {
    this.props = _, this.context = D, this.refs = ve, this.updater = B || ne;
  }
  var V = ge.prototype = new ke();
  V.constructor = ge, ee(V, Ue.prototype), V.isPureReactComponent = !0;
  var he = Array.isArray;
  function He() {
  }
  var ae = { H: null, A: null, T: null, S: null }, Qe = Object.prototype.hasOwnProperty;
  function Ht(_, D, B) {
    var U = B.ref;
    return {
      $$typeof: l,
      type: _,
      key: D,
      ref: U !== void 0 ? U : null,
      props: B
    };
  }
  function tn(_, D) {
    return Ht(_.type, D, _.props);
  }
  function Bt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === l;
  }
  function Pe(_) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(B) {
      return D[B];
    });
  }
  var nn = /\/+/g;
  function Ot(_, D) {
    return typeof _ == "object" && _ !== null && _.key != null ? Pe("" + _.key) : D.toString(36);
  }
  function et(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(He, He) : (_.status = "pending", _.then(
          function(D) {
            _.status === "pending" && (_.status = "fulfilled", _.value = D);
          },
          function(D) {
            _.status === "pending" && (_.status = "rejected", _.reason = D);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function j(_, D, B, U, W) {
    var ce = typeof _;
    (ce === "undefined" || ce === "boolean") && (_ = null);
    var se = !1;
    if (_ === null) se = !0;
    else
      switch (ce) {
        case "bigint":
        case "string":
        case "number":
          se = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case l:
            case u:
              se = !0;
              break;
            case N:
              return se = _._init, j(
                se(_._payload),
                D,
                B,
                U,
                W
              );
          }
      }
    if (se)
      return W = W(_), se = U === "" ? "." + Ot(_, 0) : U, he(W) ? (B = "", se != null && (B = se.replace(nn, "$&/") + "/"), j(W, D, B, "", function(an) {
        return an;
      })) : W != null && (Bt(W) && (W = tn(
        W,
        B + (W.key == null || _ && _.key === W.key ? "" : ("" + W.key).replace(
          nn,
          "$&/"
        ) + "/") + se
      )), D.push(W)), 1;
    se = 0;
    var Oe = U === "" ? "." : U + ":";
    if (he(_))
      for (var Ae = 0; Ae < _.length; Ae++)
        U = _[Ae], ce = Oe + Ot(U, Ae), se += j(
          U,
          D,
          B,
          ce,
          W
        );
    else if (Ae = q(_), typeof Ae == "function")
      for (_ = Ae.call(_), Ae = 0; !(U = _.next()).done; )
        U = U.value, ce = Oe + Ot(U, Ae++), se += j(
          U,
          D,
          B,
          ce,
          W
        );
    else if (ce === "object") {
      if (typeof _.then == "function")
        return j(
          et(_),
          D,
          B,
          U,
          W
        );
      throw D = String(_), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return se;
  }
  function k(_, D, B) {
    if (_ == null) return _;
    var U = [], W = 0;
    return j(_, U, "", "", function(ce) {
      return D.call(B, ce, W++);
    }), U;
  }
  function Q(_) {
    if (_._status === -1) {
      var D = _._result;
      D = D(), D.then(
        function(B) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = B);
        },
        function(B) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = B);
        }
      ), _._status === -1 && (_._status = 0, _._result = D);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var re = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, I = {
    map: k,
    forEach: function(_, D, B) {
      k(
        _,
        function() {
          D.apply(this, arguments);
        },
        B
      );
    },
    count: function(_) {
      var D = 0;
      return k(_, function() {
        D++;
      }), D;
    },
    toArray: function(_) {
      return k(_, function(D) {
        return D;
      }) || [];
    },
    only: function(_) {
      if (!Bt(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return le.Activity = A, le.Children = I, le.Component = Ue, le.Fragment = o, le.Profiler = s, le.PureComponent = ge, le.StrictMode = r, le.Suspense = b, le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ae, le.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return ae.H.useMemoCache(_);
    }
  }, le.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, le.cacheSignal = function() {
    return null;
  }, le.cloneElement = function(_, D, B) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var U = ee({}, _.props), W = _.key;
    if (D != null)
      for (ce in D.key !== void 0 && (W = "" + D.key), D)
        !Qe.call(D, ce) || ce === "key" || ce === "__self" || ce === "__source" || ce === "ref" && D.ref === void 0 || (U[ce] = D[ce]);
    var ce = arguments.length - 2;
    if (ce === 1) U.children = B;
    else if (1 < ce) {
      for (var se = Array(ce), Oe = 0; Oe < ce; Oe++)
        se[Oe] = arguments[Oe + 2];
      U.children = se;
    }
    return Ht(_.type, W, U);
  }, le.createContext = function(_) {
    return _ = {
      $$typeof: h,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: m,
      _context: _
    }, _;
  }, le.createElement = function(_, D, B) {
    var U, W = {}, ce = null;
    if (D != null)
      for (U in D.key !== void 0 && (ce = "" + D.key), D)
        Qe.call(D, U) && U !== "key" && U !== "__self" && U !== "__source" && (W[U] = D[U]);
    var se = arguments.length - 2;
    if (se === 1) W.children = B;
    else if (1 < se) {
      for (var Oe = Array(se), Ae = 0; Ae < se; Ae++)
        Oe[Ae] = arguments[Ae + 2];
      W.children = Oe;
    }
    if (_ && _.defaultProps)
      for (U in se = _.defaultProps, se)
        W[U] === void 0 && (W[U] = se[U]);
    return Ht(_, ce, W);
  }, le.createRef = function() {
    return { current: null };
  }, le.forwardRef = function(_) {
    return { $$typeof: y, render: _ };
  }, le.isValidElement = Bt, le.lazy = function(_) {
    return {
      $$typeof: N,
      _payload: { _status: -1, _result: _ },
      _init: Q
    };
  }, le.memo = function(_, D) {
    return {
      $$typeof: v,
      type: _,
      compare: D === void 0 ? null : D
    };
  }, le.startTransition = function(_) {
    var D = ae.T, B = {};
    ae.T = B;
    try {
      var U = _(), W = ae.S;
      W !== null && W(B, U), typeof U == "object" && U !== null && typeof U.then == "function" && U.then(He, re);
    } catch (ce) {
      re(ce);
    } finally {
      D !== null && B.types !== null && (D.types = B.types), ae.T = D;
    }
  }, le.unstable_useCacheRefresh = function() {
    return ae.H.useCacheRefresh();
  }, le.use = function(_) {
    return ae.H.use(_);
  }, le.useActionState = function(_, D, B) {
    return ae.H.useActionState(_, D, B);
  }, le.useCallback = function(_, D) {
    return ae.H.useCallback(_, D);
  }, le.useContext = function(_) {
    return ae.H.useContext(_);
  }, le.useDebugValue = function() {
  }, le.useDeferredValue = function(_, D) {
    return ae.H.useDeferredValue(_, D);
  }, le.useEffect = function(_, D) {
    return ae.H.useEffect(_, D);
  }, le.useEffectEvent = function(_) {
    return ae.H.useEffectEvent(_);
  }, le.useId = function() {
    return ae.H.useId();
  }, le.useImperativeHandle = function(_, D, B) {
    return ae.H.useImperativeHandle(_, D, B);
  }, le.useInsertionEffect = function(_, D) {
    return ae.H.useInsertionEffect(_, D);
  }, le.useLayoutEffect = function(_, D) {
    return ae.H.useLayoutEffect(_, D);
  }, le.useMemo = function(_, D) {
    return ae.H.useMemo(_, D);
  }, le.useOptimistic = function(_, D) {
    return ae.H.useOptimistic(_, D);
  }, le.useReducer = function(_, D, B) {
    return ae.H.useReducer(_, D, B);
  }, le.useRef = function(_) {
    return ae.H.useRef(_);
  }, le.useState = function(_) {
    return ae.H.useState(_);
  }, le.useSyncExternalStore = function(_, D, B) {
    return ae.H.useSyncExternalStore(
      _,
      D,
      B
    );
  }, le.useTransition = function() {
    return ae.H.useTransition();
  }, le.version = "19.2.4", le;
}
var Hh;
function Ur() {
  return Hh || (Hh = 1, zr.exports = hy()), zr.exports;
}
var Bh;
function my() {
  return Bh || (Bh = 1, Sr.exports = dy()), Sr.exports;
}
var p = my(), L = Ur();
const Zr = /* @__PURE__ */ _m(L);
var xr = { exports: {} }, Ou = {}, Er = { exports: {} }, Tr = {};
var kh;
function py() {
  return kh || (kh = 1, (function(l) {
    function u(j, k) {
      var Q = j.length;
      j.push(k);
      e: for (; 0 < Q; ) {
        var re = Q - 1 >>> 1, I = j[re];
        if (0 < s(I, k))
          j[re] = k, j[Q] = I, Q = re;
        else break e;
      }
    }
    function o(j) {
      return j.length === 0 ? null : j[0];
    }
    function r(j) {
      if (j.length === 0) return null;
      var k = j[0], Q = j.pop();
      if (Q !== k) {
        j[0] = Q;
        e: for (var re = 0, I = j.length, _ = I >>> 1; re < _; ) {
          var D = 2 * (re + 1) - 1, B = j[D], U = D + 1, W = j[U];
          if (0 > s(B, Q))
            U < I && 0 > s(W, B) ? (j[re] = W, j[U] = Q, re = U) : (j[re] = B, j[D] = Q, re = D);
          else if (U < I && 0 > s(W, Q))
            j[re] = W, j[U] = Q, re = U;
          else break e;
        }
      }
      return k;
    }
    function s(j, k) {
      var Q = j.sortIndex - k.sortIndex;
      return Q !== 0 ? Q : j.id - k.id;
    }
    if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var m = performance;
      l.unstable_now = function() {
        return m.now();
      };
    } else {
      var h = Date, y = h.now();
      l.unstable_now = function() {
        return h.now() - y;
      };
    }
    var b = [], v = [], N = 1, A = null, Z = 3, q = !1, ne = !1, ee = !1, ve = !1, Ue = typeof setTimeout == "function" ? setTimeout : null, ke = typeof clearTimeout == "function" ? clearTimeout : null, ge = typeof setImmediate < "u" ? setImmediate : null;
    function V(j) {
      for (var k = o(v); k !== null; ) {
        if (k.callback === null) r(v);
        else if (k.startTime <= j)
          r(v), k.sortIndex = k.expirationTime, u(b, k);
        else break;
        k = o(v);
      }
    }
    function he(j) {
      if (ee = !1, V(j), !ne)
        if (o(b) !== null)
          ne = !0, He || (He = !0, Pe());
        else {
          var k = o(v);
          k !== null && et(he, k.startTime - j);
        }
    }
    var He = !1, ae = -1, Qe = 5, Ht = -1;
    function tn() {
      return ve ? !0 : !(l.unstable_now() - Ht < Qe);
    }
    function Bt() {
      if (ve = !1, He) {
        var j = l.unstable_now();
        Ht = j;
        var k = !0;
        try {
          e: {
            ne = !1, ee && (ee = !1, ke(ae), ae = -1), q = !0;
            var Q = Z;
            try {
              t: {
                for (V(j), A = o(b); A !== null && !(A.expirationTime > j && tn()); ) {
                  var re = A.callback;
                  if (typeof re == "function") {
                    A.callback = null, Z = A.priorityLevel;
                    var I = re(
                      A.expirationTime <= j
                    );
                    if (j = l.unstable_now(), typeof I == "function") {
                      A.callback = I, V(j), k = !0;
                      break t;
                    }
                    A === o(b) && r(b), V(j);
                  } else r(b);
                  A = o(b);
                }
                if (A !== null) k = !0;
                else {
                  var _ = o(v);
                  _ !== null && et(
                    he,
                    _.startTime - j
                  ), k = !1;
                }
              }
              break e;
            } finally {
              A = null, Z = Q, q = !1;
            }
            k = void 0;
          }
        } finally {
          k ? Pe() : He = !1;
        }
      }
    }
    var Pe;
    if (typeof ge == "function")
      Pe = function() {
        ge(Bt);
      };
    else if (typeof MessageChannel < "u") {
      var nn = new MessageChannel(), Ot = nn.port2;
      nn.port1.onmessage = Bt, Pe = function() {
        Ot.postMessage(null);
      };
    } else
      Pe = function() {
        Ue(Bt, 0);
      };
    function et(j, k) {
      ae = Ue(function() {
        j(l.unstable_now());
      }, k);
    }
    l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(j) {
      j.callback = null;
    }, l.unstable_forceFrameRate = function(j) {
      0 > j || 125 < j ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Qe = 0 < j ? Math.floor(1e3 / j) : 5;
    }, l.unstable_getCurrentPriorityLevel = function() {
      return Z;
    }, l.unstable_next = function(j) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
          var k = 3;
          break;
        default:
          k = Z;
      }
      var Q = Z;
      Z = k;
      try {
        return j();
      } finally {
        Z = Q;
      }
    }, l.unstable_requestPaint = function() {
      ve = !0;
    }, l.unstable_runWithPriority = function(j, k) {
      switch (j) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          j = 3;
      }
      var Q = Z;
      Z = j;
      try {
        return k();
      } finally {
        Z = Q;
      }
    }, l.unstable_scheduleCallback = function(j, k, Q) {
      var re = l.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? re + Q : re) : Q = re, j) {
        case 1:
          var I = -1;
          break;
        case 2:
          I = 250;
          break;
        case 5:
          I = 1073741823;
          break;
        case 4:
          I = 1e4;
          break;
        default:
          I = 5e3;
      }
      return I = Q + I, j = {
        id: N++,
        callback: k,
        priorityLevel: j,
        startTime: Q,
        expirationTime: I,
        sortIndex: -1
      }, Q > re ? (j.sortIndex = Q, u(v, j), o(b) === null && j === o(v) && (ee ? (ke(ae), ae = -1) : ee = !0, et(he, Q - re))) : (j.sortIndex = I, u(b, j), ne || q || (ne = !0, He || (He = !0, Pe()))), j;
    }, l.unstable_shouldYield = tn, l.unstable_wrapCallback = function(j) {
      var k = Z;
      return function() {
        var Q = Z;
        Z = k;
        try {
          return j.apply(this, arguments);
        } finally {
          Z = Q;
        }
      };
    };
  })(Tr)), Tr;
}
var Yh;
function vy() {
  return Yh || (Yh = 1, Er.exports = py()), Er.exports;
}
var Or = { exports: {} }, mt = {};
var Lh;
function yy() {
  if (Lh) return mt;
  Lh = 1;
  var l = Ur();
  function u(b) {
    var v = "https://react.dev/errors/" + b;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var N = 2; N < arguments.length; N++)
        v += "&args[]=" + encodeURIComponent(arguments[N]);
    }
    return "Minified React error #" + b + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(u(522));
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
  }, s = /* @__PURE__ */ Symbol.for("react.portal");
  function m(b, v, N) {
    var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: A == null ? null : "" + A,
      children: b,
      containerInfo: v,
      implementation: N
    };
  }
  var h = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(b, v) {
    if (b === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, mt.createPortal = function(b, v) {
    var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(u(299));
    return m(b, v, null, N);
  }, mt.flushSync = function(b) {
    var v = h.T, N = r.p;
    try {
      if (h.T = null, r.p = 2, b) return b();
    } finally {
      h.T = v, r.p = N, r.d.f();
    }
  }, mt.preconnect = function(b, v) {
    typeof b == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, r.d.C(b, v));
  }, mt.prefetchDNS = function(b) {
    typeof b == "string" && r.d.D(b);
  }, mt.preinit = function(b, v) {
    if (typeof b == "string" && v && typeof v.as == "string") {
      var N = v.as, A = y(N, v.crossOrigin), Z = typeof v.integrity == "string" ? v.integrity : void 0, q = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      N === "style" ? r.d.S(
        b,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: A,
          integrity: Z,
          fetchPriority: q
        }
      ) : N === "script" && r.d.X(b, {
        crossOrigin: A,
        integrity: Z,
        fetchPriority: q,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, mt.preinitModule = function(b, v) {
    if (typeof b == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var N = y(
            v.as,
            v.crossOrigin
          );
          r.d.M(b, {
            crossOrigin: N,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0
          });
        }
      } else v == null && r.d.M(b);
  }, mt.preload = function(b, v) {
    if (typeof b == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var N = v.as, A = y(N, v.crossOrigin);
      r.d.L(b, N, {
        crossOrigin: A,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, mt.preloadModule = function(b, v) {
    if (typeof b == "string")
      if (v) {
        var N = y(v.as, v.crossOrigin);
        r.d.m(b, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: N,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0
        });
      } else r.d.m(b);
  }, mt.requestFormReset = function(b) {
    r.d.r(b);
  }, mt.unstable_batchedUpdates = function(b, v) {
    return b(v);
  }, mt.useFormState = function(b, v, N) {
    return h.H.useFormState(b, v, N);
  }, mt.useFormStatus = function() {
    return h.H.useHostTransitionStatus();
  }, mt.version = "19.2.4", mt;
}
var Gh;
function gy() {
  if (Gh) return Or.exports;
  Gh = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (u) {
        console.error(u);
      }
  }
  return l(), Or.exports = yy(), Or.exports;
}
var Xh;
function by() {
  if (Xh) return Ou;
  Xh = 1;
  var l = vy(), u = Ur(), o = gy();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(e) {
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
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function b(e) {
    if (m(e) !== e)
      throw Error(r(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = m(e), t === null) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var n = e, a = t; ; ) {
      var i = n.return;
      if (i === null) break;
      var c = i.alternate;
      if (c === null) {
        if (a = i.return, a !== null) {
          n = a;
          continue;
        }
        break;
      }
      if (i.child === c.child) {
        for (c = i.child; c; ) {
          if (c === n) return b(i), e;
          if (c === a) return b(i), t;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== a.return) n = i, a = c;
      else {
        for (var f = !1, d = i.child; d; ) {
          if (d === n) {
            f = !0, n = i, a = c;
            break;
          }
          if (d === a) {
            f = !0, a = i, n = c;
            break;
          }
          d = d.sibling;
        }
        if (!f) {
          for (d = c.child; d; ) {
            if (d === n) {
              f = !0, n = c, a = i;
              break;
            }
            if (d === a) {
              f = !0, a = c, n = i;
              break;
            }
            d = d.sibling;
          }
          if (!f) throw Error(r(189));
        }
      }
      if (n.alternate !== a) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? e : t;
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
  var A = Object.assign, Z = /* @__PURE__ */ Symbol.for("react.element"), q = /* @__PURE__ */ Symbol.for("react.transitional.element"), ne = /* @__PURE__ */ Symbol.for("react.portal"), ee = /* @__PURE__ */ Symbol.for("react.fragment"), ve = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ue = /* @__PURE__ */ Symbol.for("react.profiler"), ke = /* @__PURE__ */ Symbol.for("react.consumer"), ge = /* @__PURE__ */ Symbol.for("react.context"), V = /* @__PURE__ */ Symbol.for("react.forward_ref"), he = /* @__PURE__ */ Symbol.for("react.suspense"), He = /* @__PURE__ */ Symbol.for("react.suspense_list"), ae = /* @__PURE__ */ Symbol.for("react.memo"), Qe = /* @__PURE__ */ Symbol.for("react.lazy"), Ht = /* @__PURE__ */ Symbol.for("react.activity"), tn = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), Bt = Symbol.iterator;
  function Pe(e) {
    return e === null || typeof e != "object" ? null : (e = Bt && e[Bt] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var nn = /* @__PURE__ */ Symbol.for("react.client.reference");
  function Ot(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === nn ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ee:
        return "Fragment";
      case Ue:
        return "Profiler";
      case ve:
        return "StrictMode";
      case he:
        return "Suspense";
      case He:
        return "SuspenseList";
      case Ht:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ne:
          return "Portal";
        case ge:
          return e.displayName || "Context";
        case ke:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case ae:
          return t = e.displayName || null, t !== null ? t : Ot(e.type) || "Memo";
        case Qe:
          t = e._payload, e = e._init;
          try {
            return Ot(e(t));
          } catch {
          }
      }
    return null;
  }
  var et = Array.isArray, j = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, re = [], I = -1;
  function _(e) {
    return { current: e };
  }
  function D(e) {
    0 > I || (e.current = re[I], re[I] = null, I--);
  }
  function B(e, t) {
    I++, re[I] = e.current, e.current = t;
  }
  var U = _(null), W = _(null), ce = _(null), se = _(null);
  function Oe(e, t) {
    switch (B(ce, t), B(W, e), B(U, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? uh(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = uh(t), e = ih(t, e);
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
    D(U), B(U, e);
  }
  function Ae() {
    D(U), D(W), D(ce);
  }
  function an(e) {
    e.memoizedState !== null && B(se, e);
    var t = U.current, n = ih(t, e.type);
    t !== n && (B(W, e), B(U, n));
  }
  function fn(e) {
    W.current === e && (D(U), D(W)), se.current === e && (D(se), Su._currentValue = Q);
  }
  var jl, wl;
  function At(e) {
    if (jl === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        jl = t && t[1] || "", wl = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + jl + e + wl;
  }
  var Dn = !1;
  function Ml(e, t) {
    if (!e || Dn) return "";
    Dn = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var R = function() {
                throw Error();
              };
              if (Object.defineProperty(R.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(R, []);
                } catch (O) {
                  var T = O;
                }
                Reflect.construct(e, [], R);
              } else {
                try {
                  R.call();
                } catch (O) {
                  T = O;
                }
                e.call(R.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (O) {
                T = O;
              }
              (R = e()) && typeof R.catch == "function" && R.catch(function() {
              });
            }
          } catch (O) {
            if (O && T && typeof O.stack == "string")
              return [O.stack, T.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      i && i.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = a.DetermineComponentFrameRoot(), f = c[0], d = c[1];
      if (f && d) {
        var g = f.split(`
`), E = d.split(`
`);
        for (i = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; i < E.length && !E[i].includes(
          "DetermineComponentFrameRoot"
        ); )
          i++;
        if (a === g.length || i === E.length)
          for (a = g.length - 1, i = E.length - 1; 1 <= a && 0 <= i && g[a] !== E[i]; )
            i--;
        for (; 1 <= a && 0 <= i; a--, i--)
          if (g[a] !== E[i]) {
            if (a !== 1 || i !== 1)
              do
                if (a--, i--, 0 > i || g[a] !== E[i]) {
                  var w = `
` + g[a].replace(" at new ", " at ");
                  return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), w;
                }
              while (1 <= a && 0 <= i);
            break;
          }
      }
    } finally {
      Dn = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? At(n) : "";
  }
  function Ca(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return At(e.type);
      case 16:
        return At("Lazy");
      case 13:
        return e.child !== t && t !== null ? At("Suspense Fallback") : At("Suspense");
      case 19:
        return At("SuspenseList");
      case 0:
      case 15:
        return Ml(e.type, !1);
      case 11:
        return Ml(e.type.render, !1);
      case 1:
        return Ml(e.type, !0);
      case 31:
        return At("Activity");
      default:
        return "";
    }
  }
  function oa(e) {
    try {
      var t = "", n = null;
      do
        t += Ca(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Da = Object.prototype.hasOwnProperty, dn = l.unstable_scheduleCallback, ra = l.unstable_cancelCallback, Nt = l.unstable_shouldYield, wu = l.unstable_requestPaint, dt = l.unstable_now, Cl = l.unstable_getCurrentPriorityLevel, Dl = l.unstable_ImmediatePriority, Rl = l.unstable_UserBlockingPriority, sa = l.unstable_NormalPriority, Mu = l.unstable_LowPriority, Cu = l.unstable_IdlePriority, Xr = l.log, Du = l.unstable_setDisableYieldValue, fa = null, ht = null;
  function ln(e) {
    if (typeof Xr == "function" && Du(e), ht && typeof ht.setStrictMode == "function")
      try {
        ht.setStrictMode(fa, e);
      } catch {
      }
  }
  var lt = Math.clz32 ? Math.clz32 : Uu, sc = Math.log, Ru = Math.LN2;
  function Uu(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (sc(e) / Ru | 0) | 0;
  }
  var Ra = 256, Ua = 262144, Za = 4194304;
  function hn(e) {
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
  function da(e, t, n) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var i = 0, c = e.suspendedLanes, f = e.pingedLanes;
    e = e.warmLanes;
    var d = a & 134217727;
    return d !== 0 ? (a = d & ~c, a !== 0 ? i = hn(a) : (f &= d, f !== 0 ? i = hn(f) : n || (n = d & ~e, n !== 0 && (i = hn(n))))) : (d = a & ~c, d !== 0 ? i = hn(d) : f !== 0 ? i = hn(f) : n || (n = a & ~e, n !== 0 && (i = hn(n)))), i === 0 ? 0 : t !== 0 && t !== i && (t & c) === 0 && (c = i & -i, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : i;
  }
  function Rn(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Zu(e, t) {
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
  function Ul() {
    var e = Za;
    return Za <<= 1, (Za & 62914560) === 0 && (Za = 4194304), e;
  }
  function H(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function J(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Y(e, t, n, a, i, c) {
    var f = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var d = e.entanglements, g = e.expirationTimes, E = e.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var w = 31 - lt(n), R = 1 << w;
      d[w] = 0, g[w] = -1;
      var T = E[w];
      if (T !== null)
        for (E[w] = null, w = 0; w < T.length; w++) {
          var O = T[w];
          O !== null && (O.lane &= -536870913);
        }
      n &= ~R;
    }
    a !== 0 && te(e, a, 0), c !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(f & ~t));
  }
  function te(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var a = 31 - lt(t);
    e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | n & 261930;
  }
  function P(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var a = 31 - lt(n), i = 1 << a;
      i & t | e[a] & t && (e[a] |= t), n &= ~i;
    }
  }
  function be(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : ut(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function ut(e) {
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
  function mn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function qu() {
    var e = k.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : jh(e.type));
  }
  function qa(e, t) {
    var n = k.p;
    try {
      return k.p = e, t();
    } finally {
      k.p = n;
    }
  }
  var kt = Math.random().toString(36).slice(2), it = "__reactFiber$" + kt, gt = "__reactProps$" + kt, Ha = "__reactContainer$" + kt, fc = "__reactEvents$" + kt, tp = "__reactListeners$" + kt, np = "__reactHandles$" + kt, Qr = "__reactResources$" + kt, Zl = "__reactMarker$" + kt;
  function dc(e) {
    delete e[it], delete e[gt], delete e[fc], delete e[tp], delete e[np];
  }
  function Ba(e) {
    var t = e[it];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Ha] || n[it]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = hh(e); e !== null; ) {
            if (n = e[it]) return n;
            e = hh(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function ka(e) {
    if (e = e[it] || e[Ha]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ql(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function Ya(e) {
    var t = e[Qr];
    return t || (t = e[Qr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function nt(e) {
    e[Zl] = !0;
  }
  var Vr = /* @__PURE__ */ new Set(), $r = {};
  function ha(e, t) {
    La(e, t), La(e + "Capture", t);
  }
  function La(e, t) {
    for ($r[e] = t, e = 0; e < t.length; e++)
      Vr.add(t[e]);
  }
  var ap = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Kr = {}, Jr = {};
  function lp(e) {
    return Da.call(Jr, e) ? !0 : Da.call(Kr, e) ? !1 : ap.test(e) ? Jr[e] = !0 : (Kr[e] = !0, !1);
  }
  function Hu(e, t, n) {
    if (lp(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Bu(e, t, n) {
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
  function pn(e, t, n, a) {
    if (a === null) e.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + a);
    }
  }
  function Yt(e) {
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
  function Wr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function up(e, t, n) {
    var a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var i = a.get, c = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return i.call(this);
        },
        set: function(f) {
          n = "" + f, c.call(this, f);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
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
  function hc(e) {
    if (!e._valueTracker) {
      var t = Wr(e) ? "checked" : "value";
      e._valueTracker = up(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Fr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), a = "";
    return e && (a = Wr(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== n ? (t.setValue(e), !0) : !1;
  }
  function ku(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var ip = /[\n"\\]/g;
  function Lt(e) {
    return e.replace(
      ip,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function mc(e, t, n, a, i, c, f, d) {
    e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Yt(t)) : e.value !== "" + Yt(t) && (e.value = "" + Yt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? pc(e, f, Yt(t)) : n != null ? pc(e, f, Yt(n)) : a != null && e.removeAttribute("value"), i == null && c != null && (e.defaultChecked = !!c), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.name = "" + Yt(d) : e.removeAttribute("name");
  }
  function Ir(e, t, n, a, i, c, f, d) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        hc(e);
        return;
      }
      n = n != null ? "" + Yt(n) : "", t = t != null ? "" + Yt(t) : n, d || t === e.value || (e.value = t), e.defaultValue = t;
    }
    a = a ?? i, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = d ? e.checked : !!a, e.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), hc(e);
  }
  function pc(e, t, n) {
    t === "number" && ku(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Ga(e, t, n, a) {
    if (e = e.options, t) {
      t = {};
      for (var i = 0; i < n.length; i++)
        t["$" + n[i]] = !0;
      for (n = 0; n < e.length; n++)
        i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && a && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Yt(n), t = null, i = 0; i < e.length; i++) {
        if (e[i].value === n) {
          e[i].selected = !0, a && (e[i].defaultSelected = !0);
          return;
        }
        t !== null || e[i].disabled || (t = e[i]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Pr(e, t, n) {
    if (t != null && (t = "" + Yt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Yt(n) : "";
  }
  function es(e, t, n, a) {
    if (t == null) {
      if (a != null) {
        if (n != null) throw Error(r(92));
        if (et(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), t = n;
    }
    n = Yt(t), e.defaultValue = n, a = e.textContent, a === n && a !== "" && a !== null && (e.value = a), hc(e);
  }
  function Xa(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var cp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ts(e, t, n) {
    var a = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, n) : typeof n != "number" || n === 0 || cp.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function ns(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (e = e.style, n != null) {
      for (var a in n)
        !n.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
      for (var i in t)
        a = t[i], t.hasOwnProperty(i) && n[i] !== a && ts(e, i, a);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && ts(e, c, t[c]);
  }
  function vc(e) {
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
  var op = /* @__PURE__ */ new Map([
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
  ]), rp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yu(e) {
    return rp.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function vn() {
  }
  var yc = null;
  function gc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Qa = null, Va = null;
  function as(e) {
    var t = ka(e);
    if (t && (e = t.stateNode)) {
      var n = e[gt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (mc(
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
              'input[name="' + Lt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var a = n[t];
              if (a !== e && a.form === e.form) {
                var i = a[gt] || null;
                if (!i) throw Error(r(90));
                mc(
                  a,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              a = n[t], a.form === e.form && Fr(a);
          }
          break e;
        case "textarea":
          Pr(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Ga(e, !!n.multiple, t, !1);
      }
    }
  }
  var bc = !1;
  function ls(e, t, n) {
    if (bc) return e(t, n);
    bc = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (bc = !1, (Qa !== null || Va !== null) && (Ni(), Qa && (t = Qa, e = Va, Va = Qa = null, as(t), e)))
        for (t = 0; t < e.length; t++) as(e[t]);
    }
  }
  function Hl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var a = n[gt] || null;
    if (a === null) return null;
    n = a[t];
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
        (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
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
  var yn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _c = !1;
  if (yn)
    try {
      var Bl = {};
      Object.defineProperty(Bl, "passive", {
        get: function() {
          _c = !0;
        }
      }), window.addEventListener("test", Bl, Bl), window.removeEventListener("test", Bl, Bl);
    } catch {
      _c = !1;
    }
  var Un = null, Sc = null, Lu = null;
  function us() {
    if (Lu) return Lu;
    var e, t = Sc, n = t.length, a, i = "value" in Un ? Un.value : Un.textContent, c = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++) ;
    var f = n - e;
    for (a = 1; a <= f && t[n - a] === i[c - a]; a++) ;
    return Lu = i.slice(e, 1 < a ? 1 - a : void 0);
  }
  function Gu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Xu() {
    return !0;
  }
  function is() {
    return !1;
  }
  function bt(e) {
    function t(n, a, i, c, f) {
      this._reactName = n, this._targetInst = i, this.type = a, this.nativeEvent = c, this.target = f, this.currentTarget = null;
      for (var d in e)
        e.hasOwnProperty(d) && (n = e[d], this[d] = n ? n(c) : c[d]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Xu : is, this.isPropagationStopped = is, this;
    }
    return A(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Xu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Xu);
      },
      persist: function() {
      },
      isPersistent: Xu
    }), t;
  }
  var ma = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Qu = bt(ma), kl = A({}, ma, { view: 0, detail: 0 }), sp = bt(kl), zc, xc, Yl, Vu = A({}, kl, {
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
    getModifierState: Tc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Yl && (Yl && e.type === "mousemove" ? (zc = e.screenX - Yl.screenX, xc = e.screenY - Yl.screenY) : xc = zc = 0, Yl = e), zc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : xc;
    }
  }), cs = bt(Vu), fp = A({}, Vu, { dataTransfer: 0 }), dp = bt(fp), hp = A({}, kl, { relatedTarget: 0 }), Ec = bt(hp), mp = A({}, ma, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pp = bt(mp), vp = A({}, ma, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), yp = bt(vp), gp = A({}, ma, { data: 0 }), os = bt(gp), bp = {
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
  }, _p = {
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
  }, Sp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function zp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Sp[e]) ? !!t[e] : !1;
  }
  function Tc() {
    return zp;
  }
  var xp = A({}, kl, {
    key: function(e) {
      if (e.key) {
        var t = bp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Gu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _p[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Tc,
    charCode: function(e) {
      return e.type === "keypress" ? Gu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Gu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ep = bt(xp), Tp = A({}, Vu, {
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
  }), rs = bt(Tp), Op = A({}, kl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Tc
  }), Ap = bt(Op), Np = A({}, ma, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jp = bt(Np), wp = A({}, Vu, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Mp = bt(wp), Cp = A({}, ma, {
    newState: 0,
    oldState: 0
  }), Dp = bt(Cp), Rp = [9, 13, 27, 32], Oc = yn && "CompositionEvent" in window, Ll = null;
  yn && "documentMode" in document && (Ll = document.documentMode);
  var Up = yn && "TextEvent" in window && !Ll, ss = yn && (!Oc || Ll && 8 < Ll && 11 >= Ll), fs = " ", ds = !1;
  function hs(e, t) {
    switch (e) {
      case "keyup":
        return Rp.indexOf(t.keyCode) !== -1;
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
  function ms(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $a = !1;
  function Zp(e, t) {
    switch (e) {
      case "compositionend":
        return ms(t);
      case "keypress":
        return t.which !== 32 ? null : (ds = !0, fs);
      case "textInput":
        return e = t.data, e === fs && ds ? null : e;
      default:
        return null;
    }
  }
  function qp(e, t) {
    if ($a)
      return e === "compositionend" || !Oc && hs(e, t) ? (e = us(), Lu = Sc = Un = null, $a = !1, e) : null;
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
        return ss && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Hp = {
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
  function ps(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Hp[e.type] : t === "textarea";
  }
  function vs(e, t, n, a) {
    Qa ? Va ? Va.push(a) : Va = [a] : Qa = a, t = Ui(t, "onChange"), 0 < t.length && (n = new Qu(
      "onChange",
      "change",
      null,
      n,
      a
    ), e.push({ event: n, listeners: t }));
  }
  var Gl = null, Xl = null;
  function Bp(e) {
    Pd(e, 0);
  }
  function $u(e) {
    var t = ql(e);
    if (Fr(t)) return e;
  }
  function ys(e, t) {
    if (e === "change") return t;
  }
  var gs = !1;
  if (yn) {
    var Ac;
    if (yn) {
      var Nc = "oninput" in document;
      if (!Nc) {
        var bs = document.createElement("div");
        bs.setAttribute("oninput", "return;"), Nc = typeof bs.oninput == "function";
      }
      Ac = Nc;
    } else Ac = !1;
    gs = Ac && (!document.documentMode || 9 < document.documentMode);
  }
  function _s() {
    Gl && (Gl.detachEvent("onpropertychange", Ss), Xl = Gl = null);
  }
  function Ss(e) {
    if (e.propertyName === "value" && $u(Xl)) {
      var t = [];
      vs(
        t,
        Xl,
        e,
        gc(e)
      ), ls(Bp, t);
    }
  }
  function kp(e, t, n) {
    e === "focusin" ? (_s(), Gl = t, Xl = n, Gl.attachEvent("onpropertychange", Ss)) : e === "focusout" && _s();
  }
  function Yp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return $u(Xl);
  }
  function Lp(e, t) {
    if (e === "click") return $u(t);
  }
  function Gp(e, t) {
    if (e === "input" || e === "change")
      return $u(t);
  }
  function Xp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var jt = typeof Object.is == "function" ? Object.is : Xp;
  function Ql(e, t) {
    if (jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var i = n[a];
      if (!Da.call(t, i) || !jt(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function zs(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function xs(e, t) {
    var n = zs(e);
    e = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (a = e + n.textContent.length, e <= t && a >= t)
          return { node: n, offset: t - e };
        e = a;
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
      n = zs(n);
    }
  }
  function Es(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Es(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ts(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = ku(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = ku(e.document);
    }
    return t;
  }
  function jc(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Qp = yn && "documentMode" in document && 11 >= document.documentMode, Ka = null, wc = null, Vl = null, Mc = !1;
  function Os(e, t, n) {
    var a = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Mc || Ka == null || Ka !== ku(a) || (a = Ka, "selectionStart" in a && jc(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Vl && Ql(Vl, a) || (Vl = a, a = Ui(wc, "onSelect"), 0 < a.length && (t = new Qu(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: a }), t.target = Ka)));
  }
  function pa(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Ja = {
    animationend: pa("Animation", "AnimationEnd"),
    animationiteration: pa("Animation", "AnimationIteration"),
    animationstart: pa("Animation", "AnimationStart"),
    transitionrun: pa("Transition", "TransitionRun"),
    transitionstart: pa("Transition", "TransitionStart"),
    transitioncancel: pa("Transition", "TransitionCancel"),
    transitionend: pa("Transition", "TransitionEnd")
  }, Cc = {}, As = {};
  yn && (As = document.createElement("div").style, "AnimationEvent" in window || (delete Ja.animationend.animation, delete Ja.animationiteration.animation, delete Ja.animationstart.animation), "TransitionEvent" in window || delete Ja.transitionend.transition);
  function va(e) {
    if (Cc[e]) return Cc[e];
    if (!Ja[e]) return e;
    var t = Ja[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in As)
        return Cc[e] = t[n];
    return e;
  }
  var Ns = va("animationend"), js = va("animationiteration"), ws = va("animationstart"), Vp = va("transitionrun"), $p = va("transitionstart"), Kp = va("transitioncancel"), Ms = va("transitionend"), Cs = /* @__PURE__ */ new Map(), Dc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Dc.push("scrollEnd");
  function It(e, t) {
    Cs.set(e, t), ha(t, [e]);
  }
  var Ku = typeof reportError == "function" ? reportError : function(e) {
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
  }, Gt = [], Wa = 0, Rc = 0;
  function Ju() {
    for (var e = Wa, t = Rc = Wa = 0; t < e; ) {
      var n = Gt[t];
      Gt[t++] = null;
      var a = Gt[t];
      Gt[t++] = null;
      var i = Gt[t];
      Gt[t++] = null;
      var c = Gt[t];
      if (Gt[t++] = null, a !== null && i !== null) {
        var f = a.pending;
        f === null ? i.next = i : (i.next = f.next, f.next = i), a.pending = i;
      }
      c !== 0 && Ds(n, i, c);
    }
  }
  function Wu(e, t, n, a) {
    Gt[Wa++] = e, Gt[Wa++] = t, Gt[Wa++] = n, Gt[Wa++] = a, Rc |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
  }
  function Uc(e, t, n, a) {
    return Wu(e, t, n, a), Fu(e);
  }
  function ya(e, t) {
    return Wu(e, null, null, t), Fu(e);
  }
  function Ds(e, t, n) {
    e.lanes |= n;
    var a = e.alternate;
    a !== null && (a.lanes |= n);
    for (var i = !1, c = e.return; c !== null; )
      c.childLanes |= n, a = c.alternate, a !== null && (a.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (i = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, i && t !== null && (i = 31 - lt(n), e = c.hiddenUpdates, a = e[i], a === null ? e[i] = [t] : a.push(t), t.lane = n | 536870912), c) : null;
  }
  function Fu(e) {
    if (50 < mu)
      throw mu = 0, Qo = null, Error(r(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Fa = {};
  function Jp(e, t, n, a) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function wt(e, t, n, a) {
    return new Jp(e, t, n, a);
  }
  function Zc(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function gn(e, t) {
    var n = e.alternate;
    return n === null ? (n = wt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Rs(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Iu(e, t, n, a, i, c) {
    var f = 0;
    if (a = e, typeof e == "function") Zc(e) && (f = 1);
    else if (typeof e == "string")
      f = ey(
        e,
        n,
        U.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Ht:
          return e = wt(31, n, t, i), e.elementType = Ht, e.lanes = c, e;
        case ee:
          return ga(n.children, i, c, t);
        case ve:
          f = 8, i |= 24;
          break;
        case Ue:
          return e = wt(12, n, t, i | 2), e.elementType = Ue, e.lanes = c, e;
        case he:
          return e = wt(13, n, t, i), e.elementType = he, e.lanes = c, e;
        case He:
          return e = wt(19, n, t, i), e.elementType = He, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ge:
                f = 10;
                break e;
              case ke:
                f = 9;
                break e;
              case V:
                f = 11;
                break e;
              case ae:
                f = 14;
                break e;
              case Qe:
                f = 16, a = null;
                break e;
            }
          f = 29, n = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), a = null;
      }
    return t = wt(f, n, t, i), t.elementType = e, t.type = a, t.lanes = c, t;
  }
  function ga(e, t, n, a) {
    return e = wt(7, e, a, t), e.lanes = n, e;
  }
  function qc(e, t, n) {
    return e = wt(6, e, null, t), e.lanes = n, e;
  }
  function Us(e) {
    var t = wt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Hc(e, t, n) {
    return t = wt(
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
  var Zs = /* @__PURE__ */ new WeakMap();
  function Xt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Zs.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: oa(t)
      }, Zs.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: oa(t)
    };
  }
  var Ia = [], Pa = 0, Pu = null, $l = 0, Qt = [], Vt = 0, Zn = null, un = 1, cn = "";
  function bn(e, t) {
    Ia[Pa++] = $l, Ia[Pa++] = Pu, Pu = e, $l = t;
  }
  function qs(e, t, n) {
    Qt[Vt++] = un, Qt[Vt++] = cn, Qt[Vt++] = Zn, Zn = e;
    var a = un;
    e = cn;
    var i = 32 - lt(a) - 1;
    a &= ~(1 << i), n += 1;
    var c = 32 - lt(t) + i;
    if (30 < c) {
      var f = i - i % 5;
      c = (a & (1 << f) - 1).toString(32), a >>= f, i -= f, un = 1 << 32 - lt(t) + i | n << i | a, cn = c + e;
    } else
      un = 1 << c | n << i | a, cn = e;
  }
  function Bc(e) {
    e.return !== null && (bn(e, 1), qs(e, 1, 0));
  }
  function kc(e) {
    for (; e === Pu; )
      Pu = Ia[--Pa], Ia[Pa] = null, $l = Ia[--Pa], Ia[Pa] = null;
    for (; e === Zn; )
      Zn = Qt[--Vt], Qt[Vt] = null, cn = Qt[--Vt], Qt[Vt] = null, un = Qt[--Vt], Qt[Vt] = null;
  }
  function Hs(e, t) {
    Qt[Vt++] = un, Qt[Vt++] = cn, Qt[Vt++] = Zn, un = t.id, cn = t.overflow, Zn = e;
  }
  var ct = null, De = null, ye = !1, qn = null, $t = !1, Yc = Error(r(519));
  function Hn(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Kl(Xt(t, e)), Yc;
  }
  function Bs(e) {
    var t = e.stateNode, n = e.type, a = e.memoizedProps;
    switch (t[it] = e, t[gt] = a, n) {
      case "dialog":
        de("cancel", t), de("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        de("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < vu.length; n++)
          de(vu[n], t);
        break;
      case "source":
        de("error", t);
        break;
      case "img":
      case "image":
      case "link":
        de("error", t), de("load", t);
        break;
      case "details":
        de("toggle", t);
        break;
      case "input":
        de("invalid", t), Ir(
          t,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        de("invalid", t);
        break;
      case "textarea":
        de("invalid", t), es(t, a.value, a.defaultValue, a.children);
    }
    n = a.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || a.suppressHydrationWarning === !0 || ah(t.textContent, n) ? (a.popover != null && (de("beforetoggle", t), de("toggle", t)), a.onScroll != null && de("scroll", t), a.onScrollEnd != null && de("scrollend", t), a.onClick != null && (t.onclick = vn), t = !0) : t = !1, t || Hn(e, !0);
  }
  function ks(e) {
    for (ct = e.return; ct; )
      switch (ct.tag) {
        case 5:
        case 31:
        case 13:
          $t = !1;
          return;
        case 27:
        case 3:
          $t = !0;
          return;
        default:
          ct = ct.return;
      }
  }
  function el(e) {
    if (e !== ct) return !1;
    if (!ye) return ks(e), ye = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || ir(e.type, e.memoizedProps)), n = !n), n && De && Hn(e), ks(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      De = dh(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      De = dh(e);
    } else
      t === 27 ? (t = De, In(e.type) ? (e = fr, fr = null, De = e) : De = t) : De = ct ? Jt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ba() {
    De = ct = null, ye = !1;
  }
  function Lc() {
    var e = qn;
    return e !== null && (xt === null ? xt = e : xt.push.apply(
      xt,
      e
    ), qn = null), e;
  }
  function Kl(e) {
    qn === null ? qn = [e] : qn.push(e);
  }
  var Gc = _(null), _a = null, _n = null;
  function Bn(e, t, n) {
    B(Gc, t._currentValue), t._currentValue = n;
  }
  function Sn(e) {
    e._currentValue = Gc.current, D(Gc);
  }
  function Xc(e, t, n) {
    for (; e !== null; ) {
      var a = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Qc(e, t, n, a) {
    var i = e.child;
    for (i !== null && (i.return = e); i !== null; ) {
      var c = i.dependencies;
      if (c !== null) {
        var f = i.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var d = c;
          c = i;
          for (var g = 0; g < t.length; g++)
            if (d.context === t[g]) {
              c.lanes |= n, d = c.alternate, d !== null && (d.lanes |= n), Xc(
                c.return,
                n,
                e
              ), a || (f = null);
              break e;
            }
          c = d.next;
        }
      } else if (i.tag === 18) {
        if (f = i.return, f === null) throw Error(r(341));
        f.lanes |= n, c = f.alternate, c !== null && (c.lanes |= n), Xc(f, n, e), f = null;
      } else f = i.child;
      if (f !== null) f.return = i;
      else
        for (f = i; f !== null; ) {
          if (f === e) {
            f = null;
            break;
          }
          if (i = f.sibling, i !== null) {
            i.return = f.return, f = i;
            break;
          }
          f = f.return;
        }
      i = f;
    }
  }
  function tl(e, t, n, a) {
    e = null;
    for (var i = t, c = !1; i !== null; ) {
      if (!c) {
        if ((i.flags & 524288) !== 0) c = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(r(387));
        if (f = f.memoizedProps, f !== null) {
          var d = i.type;
          jt(i.pendingProps.value, f.value) || (e !== null ? e.push(d) : e = [d]);
        }
      } else if (i === se.current) {
        if (f = i.alternate, f === null) throw Error(r(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(Su) : e = [Su]);
      }
      i = i.return;
    }
    e !== null && Qc(
      t,
      e,
      n,
      a
    ), t.flags |= 262144;
  }
  function ei(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!jt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Sa(e) {
    _a = e, _n = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function ot(e) {
    return Ys(_a, e);
  }
  function ti(e, t) {
    return _a === null && Sa(e), Ys(e, t);
  }
  function Ys(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, _n === null) {
      if (e === null) throw Error(r(308));
      _n = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else _n = _n.next = t;
    return n;
  }
  var Wp = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, a) {
        e.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Fp = l.unstable_scheduleCallback, Ip = l.unstable_NormalPriority, Ke = {
    $$typeof: ge,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Vc() {
    return {
      controller: new Wp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Jl(e) {
    e.refCount--, e.refCount === 0 && Fp(Ip, function() {
      e.controller.abort();
    });
  }
  var Wl = null, $c = 0, nl = 0, al = null;
  function Pp(e, t) {
    if (Wl === null) {
      var n = Wl = [];
      $c = 0, nl = Fo(), al = {
        status: "pending",
        value: void 0,
        then: function(a) {
          n.push(a);
        }
      };
    }
    return $c++, t.then(Ls, Ls), t;
  }
  function Ls() {
    if (--$c === 0 && Wl !== null) {
      al !== null && (al.status = "fulfilled");
      var e = Wl;
      Wl = null, nl = 0, al = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function ev(e, t) {
    var n = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(i) {
        n.push(i);
      }
    };
    return e.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var i = 0; i < n.length; i++) (0, n[i])(t);
      },
      function(i) {
        for (a.status = "rejected", a.reason = i, i = 0; i < n.length; i++)
          (0, n[i])(void 0);
      }
    ), a;
  }
  var Gs = j.S;
  j.S = function(e, t) {
    Ad = dt(), typeof t == "object" && t !== null && typeof t.then == "function" && Pp(e, t), Gs !== null && Gs(e, t);
  };
  var za = _(null);
  function Kc() {
    var e = za.current;
    return e !== null ? e : Me.pooledCache;
  }
  function ni(e, t) {
    t === null ? B(za, za.current) : B(za, t.pool);
  }
  function Xs() {
    var e = Kc();
    return e === null ? null : { parent: Ke._currentValue, pool: e };
  }
  var ll = Error(r(460)), Jc = Error(r(474)), ai = Error(r(542)), li = { then: function() {
  } };
  function Qs(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Vs(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(vn, vn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Ks(e), e;
      default:
        if (typeof t.status == "string") t.then(vn, vn);
        else {
          if (e = Me, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
          e = t, e.status = "pending", e.then(
            function(a) {
              if (t.status === "pending") {
                var i = t;
                i.status = "fulfilled", i.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var i = t;
                i.status = "rejected", i.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Ks(e), e;
        }
        throw Ea = t, ll;
    }
  }
  function xa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Ea = n, ll) : n;
    }
  }
  var Ea = null;
  function $s() {
    if (Ea === null) throw Error(r(459));
    var e = Ea;
    return Ea = null, e;
  }
  function Ks(e) {
    if (e === ll || e === ai)
      throw Error(r(483));
  }
  var ul = null, Fl = 0;
  function ui(e) {
    var t = Fl;
    return Fl += 1, ul === null && (ul = []), Vs(ul, e, t);
  }
  function Il(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ii(e, t) {
    throw t.$$typeof === Z ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Js(e) {
    function t(z, S) {
      if (e) {
        var x = z.deletions;
        x === null ? (z.deletions = [S], z.flags |= 16) : x.push(S);
      }
    }
    function n(z, S) {
      if (!e) return null;
      for (; S !== null; )
        t(z, S), S = S.sibling;
      return null;
    }
    function a(z) {
      for (var S = /* @__PURE__ */ new Map(); z !== null; )
        z.key !== null ? S.set(z.key, z) : S.set(z.index, z), z = z.sibling;
      return S;
    }
    function i(z, S) {
      return z = gn(z, S), z.index = 0, z.sibling = null, z;
    }
    function c(z, S, x) {
      return z.index = x, e ? (x = z.alternate, x !== null ? (x = x.index, x < S ? (z.flags |= 67108866, S) : x) : (z.flags |= 67108866, S)) : (z.flags |= 1048576, S);
    }
    function f(z) {
      return e && z.alternate === null && (z.flags |= 67108866), z;
    }
    function d(z, S, x, M) {
      return S === null || S.tag !== 6 ? (S = qc(x, z.mode, M), S.return = z, S) : (S = i(S, x), S.return = z, S);
    }
    function g(z, S, x, M) {
      var $ = x.type;
      return $ === ee ? w(
        z,
        S,
        x.props.children,
        M,
        x.key
      ) : S !== null && (S.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Qe && xa($) === S.type) ? (S = i(S, x.props), Il(S, x), S.return = z, S) : (S = Iu(
        x.type,
        x.key,
        x.props,
        null,
        z.mode,
        M
      ), Il(S, x), S.return = z, S);
    }
    function E(z, S, x, M) {
      return S === null || S.tag !== 4 || S.stateNode.containerInfo !== x.containerInfo || S.stateNode.implementation !== x.implementation ? (S = Hc(x, z.mode, M), S.return = z, S) : (S = i(S, x.children || []), S.return = z, S);
    }
    function w(z, S, x, M, $) {
      return S === null || S.tag !== 7 ? (S = ga(
        x,
        z.mode,
        M,
        $
      ), S.return = z, S) : (S = i(S, x), S.return = z, S);
    }
    function R(z, S, x) {
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return S = qc(
          "" + S,
          z.mode,
          x
        ), S.return = z, S;
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case q:
            return x = Iu(
              S.type,
              S.key,
              S.props,
              null,
              z.mode,
              x
            ), Il(x, S), x.return = z, x;
          case ne:
            return S = Hc(
              S,
              z.mode,
              x
            ), S.return = z, S;
          case Qe:
            return S = xa(S), R(z, S, x);
        }
        if (et(S) || Pe(S))
          return S = ga(
            S,
            z.mode,
            x,
            null
          ), S.return = z, S;
        if (typeof S.then == "function")
          return R(z, ui(S), x);
        if (S.$$typeof === ge)
          return R(
            z,
            ti(z, S),
            x
          );
        ii(z, S);
      }
      return null;
    }
    function T(z, S, x, M) {
      var $ = S !== null ? S.key : null;
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return $ !== null ? null : d(z, S, "" + x, M);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case q:
            return x.key === $ ? g(z, S, x, M) : null;
          case ne:
            return x.key === $ ? E(z, S, x, M) : null;
          case Qe:
            return x = xa(x), T(z, S, x, M);
        }
        if (et(x) || Pe(x))
          return $ !== null ? null : w(z, S, x, M, null);
        if (typeof x.then == "function")
          return T(
            z,
            S,
            ui(x),
            M
          );
        if (x.$$typeof === ge)
          return T(
            z,
            S,
            ti(z, x),
            M
          );
        ii(z, x);
      }
      return null;
    }
    function O(z, S, x, M, $) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return z = z.get(x) || null, d(S, z, "" + M, $);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case q:
            return z = z.get(
              M.key === null ? x : M.key
            ) || null, g(S, z, M, $);
          case ne:
            return z = z.get(
              M.key === null ? x : M.key
            ) || null, E(S, z, M, $);
          case Qe:
            return M = xa(M), O(
              z,
              S,
              x,
              M,
              $
            );
        }
        if (et(M) || Pe(M))
          return z = z.get(x) || null, w(S, z, M, $, null);
        if (typeof M.then == "function")
          return O(
            z,
            S,
            x,
            ui(M),
            $
          );
        if (M.$$typeof === ge)
          return O(
            z,
            S,
            x,
            ti(S, M),
            $
          );
        ii(S, M);
      }
      return null;
    }
    function G(z, S, x, M) {
      for (var $ = null, _e = null, X = S, ie = S = 0, pe = null; X !== null && ie < x.length; ie++) {
        X.index > ie ? (pe = X, X = null) : pe = X.sibling;
        var Se = T(
          z,
          X,
          x[ie],
          M
        );
        if (Se === null) {
          X === null && (X = pe);
          break;
        }
        e && X && Se.alternate === null && t(z, X), S = c(Se, S, ie), _e === null ? $ = Se : _e.sibling = Se, _e = Se, X = pe;
      }
      if (ie === x.length)
        return n(z, X), ye && bn(z, ie), $;
      if (X === null) {
        for (; ie < x.length; ie++)
          X = R(z, x[ie], M), X !== null && (S = c(
            X,
            S,
            ie
          ), _e === null ? $ = X : _e.sibling = X, _e = X);
        return ye && bn(z, ie), $;
      }
      for (X = a(X); ie < x.length; ie++)
        pe = O(
          X,
          z,
          ie,
          x[ie],
          M
        ), pe !== null && (e && pe.alternate !== null && X.delete(
          pe.key === null ? ie : pe.key
        ), S = c(
          pe,
          S,
          ie
        ), _e === null ? $ = pe : _e.sibling = pe, _e = pe);
      return e && X.forEach(function(aa) {
        return t(z, aa);
      }), ye && bn(z, ie), $;
    }
    function F(z, S, x, M) {
      if (x == null) throw Error(r(151));
      for (var $ = null, _e = null, X = S, ie = S = 0, pe = null, Se = x.next(); X !== null && !Se.done; ie++, Se = x.next()) {
        X.index > ie ? (pe = X, X = null) : pe = X.sibling;
        var aa = T(z, X, Se.value, M);
        if (aa === null) {
          X === null && (X = pe);
          break;
        }
        e && X && aa.alternate === null && t(z, X), S = c(aa, S, ie), _e === null ? $ = aa : _e.sibling = aa, _e = aa, X = pe;
      }
      if (Se.done)
        return n(z, X), ye && bn(z, ie), $;
      if (X === null) {
        for (; !Se.done; ie++, Se = x.next())
          Se = R(z, Se.value, M), Se !== null && (S = c(Se, S, ie), _e === null ? $ = Se : _e.sibling = Se, _e = Se);
        return ye && bn(z, ie), $;
      }
      for (X = a(X); !Se.done; ie++, Se = x.next())
        Se = O(X, z, ie, Se.value, M), Se !== null && (e && Se.alternate !== null && X.delete(Se.key === null ? ie : Se.key), S = c(Se, S, ie), _e === null ? $ = Se : _e.sibling = Se, _e = Se);
      return e && X.forEach(function(fy) {
        return t(z, fy);
      }), ye && bn(z, ie), $;
    }
    function we(z, S, x, M) {
      if (typeof x == "object" && x !== null && x.type === ee && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case q:
            e: {
              for (var $ = x.key; S !== null; ) {
                if (S.key === $) {
                  if ($ = x.type, $ === ee) {
                    if (S.tag === 7) {
                      n(
                        z,
                        S.sibling
                      ), M = i(
                        S,
                        x.props.children
                      ), M.return = z, z = M;
                      break e;
                    }
                  } else if (S.elementType === $ || typeof $ == "object" && $ !== null && $.$$typeof === Qe && xa($) === S.type) {
                    n(
                      z,
                      S.sibling
                    ), M = i(S, x.props), Il(M, x), M.return = z, z = M;
                    break e;
                  }
                  n(z, S);
                  break;
                } else t(z, S);
                S = S.sibling;
              }
              x.type === ee ? (M = ga(
                x.props.children,
                z.mode,
                M,
                x.key
              ), M.return = z, z = M) : (M = Iu(
                x.type,
                x.key,
                x.props,
                null,
                z.mode,
                M
              ), Il(M, x), M.return = z, z = M);
            }
            return f(z);
          case ne:
            e: {
              for ($ = x.key; S !== null; ) {
                if (S.key === $)
                  if (S.tag === 4 && S.stateNode.containerInfo === x.containerInfo && S.stateNode.implementation === x.implementation) {
                    n(
                      z,
                      S.sibling
                    ), M = i(S, x.children || []), M.return = z, z = M;
                    break e;
                  } else {
                    n(z, S);
                    break;
                  }
                else t(z, S);
                S = S.sibling;
              }
              M = Hc(x, z.mode, M), M.return = z, z = M;
            }
            return f(z);
          case Qe:
            return x = xa(x), we(
              z,
              S,
              x,
              M
            );
        }
        if (et(x))
          return G(
            z,
            S,
            x,
            M
          );
        if (Pe(x)) {
          if ($ = Pe(x), typeof $ != "function") throw Error(r(150));
          return x = $.call(x), F(
            z,
            S,
            x,
            M
          );
        }
        if (typeof x.then == "function")
          return we(
            z,
            S,
            ui(x),
            M
          );
        if (x.$$typeof === ge)
          return we(
            z,
            S,
            ti(z, x),
            M
          );
        ii(z, x);
      }
      return typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint" ? (x = "" + x, S !== null && S.tag === 6 ? (n(z, S.sibling), M = i(S, x), M.return = z, z = M) : (n(z, S), M = qc(x, z.mode, M), M.return = z, z = M), f(z)) : n(z, S);
    }
    return function(z, S, x, M) {
      try {
        Fl = 0;
        var $ = we(
          z,
          S,
          x,
          M
        );
        return ul = null, $;
      } catch (X) {
        if (X === ll || X === ai) throw X;
        var _e = wt(29, X, null, z.mode);
        return _e.lanes = M, _e.return = z, _e;
      }
    };
  }
  var Ta = Js(!0), Ws = Js(!1), kn = !1;
  function Wc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Yn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ln(e, t, n) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (ze & 2) !== 0) {
      var i = a.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), a.pending = t, t = Fu(e), Ds(e, null, n), t;
    }
    return Wu(e, a, t, n), Fu(e);
  }
  function Pl(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, P(e, n);
    }
  }
  function Ic(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null && (a = a.updateQueue, n === a)) {
      var i = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? i = c = f : c = c.next = f, n = n.next;
        } while (n !== null);
        c === null ? i = c = t : c = c.next = t;
      } else i = c = t;
      n = {
        baseState: a.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: c,
        shared: a.shared,
        callbacks: a.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Pc = !1;
  function eu() {
    if (Pc) {
      var e = al;
      if (e !== null) throw e;
    }
  }
  function tu(e, t, n, a) {
    Pc = !1;
    var i = e.updateQueue;
    kn = !1;
    var c = i.firstBaseUpdate, f = i.lastBaseUpdate, d = i.shared.pending;
    if (d !== null) {
      i.shared.pending = null;
      var g = d, E = g.next;
      g.next = null, f === null ? c = E : f.next = E, f = g;
      var w = e.alternate;
      w !== null && (w = w.updateQueue, d = w.lastBaseUpdate, d !== f && (d === null ? w.firstBaseUpdate = E : d.next = E, w.lastBaseUpdate = g));
    }
    if (c !== null) {
      var R = i.baseState;
      f = 0, w = E = g = null, d = c;
      do {
        var T = d.lane & -536870913, O = T !== d.lane;
        if (O ? (me & T) === T : (a & T) === T) {
          T !== 0 && T === nl && (Pc = !0), w !== null && (w = w.next = {
            lane: 0,
            tag: d.tag,
            payload: d.payload,
            callback: null,
            next: null
          });
          e: {
            var G = e, F = d;
            T = t;
            var we = n;
            switch (F.tag) {
              case 1:
                if (G = F.payload, typeof G == "function") {
                  R = G.call(we, R, T);
                  break e;
                }
                R = G;
                break e;
              case 3:
                G.flags = G.flags & -65537 | 128;
              case 0:
                if (G = F.payload, T = typeof G == "function" ? G.call(we, R, T) : G, T == null) break e;
                R = A({}, R, T);
                break e;
              case 2:
                kn = !0;
            }
          }
          T = d.callback, T !== null && (e.flags |= 64, O && (e.flags |= 8192), O = i.callbacks, O === null ? i.callbacks = [T] : O.push(T));
        } else
          O = {
            lane: T,
            tag: d.tag,
            payload: d.payload,
            callback: d.callback,
            next: null
          }, w === null ? (E = w = O, g = R) : w = w.next = O, f |= T;
        if (d = d.next, d === null) {
          if (d = i.shared.pending, d === null)
            break;
          O = d, d = O.next, O.next = null, i.lastBaseUpdate = O, i.shared.pending = null;
        }
      } while (!0);
      w === null && (g = R), i.baseState = g, i.firstBaseUpdate = E, i.lastBaseUpdate = w, c === null && (i.shared.lanes = 0), $n |= f, e.lanes = f, e.memoizedState = R;
    }
  }
  function Fs(e, t) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(t);
  }
  function Is(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Fs(n[e], t);
  }
  var il = _(null), ci = _(0);
  function Ps(e, t) {
    e = wn, B(ci, e), B(il, t), wn = e | t.baseLanes;
  }
  function eo() {
    B(ci, wn), B(il, il.current);
  }
  function to() {
    wn = ci.current, D(il), D(ci);
  }
  var Mt = _(null), Kt = null;
  function Gn(e) {
    var t = e.alternate;
    B(Ve, Ve.current & 1), B(Mt, e), Kt === null && (t === null || il.current !== null || t.memoizedState !== null) && (Kt = e);
  }
  function no(e) {
    B(Ve, Ve.current), B(Mt, e), Kt === null && (Kt = e);
  }
  function ef(e) {
    e.tag === 22 ? (B(Ve, Ve.current), B(Mt, e), Kt === null && (Kt = e)) : Xn();
  }
  function Xn() {
    B(Ve, Ve.current), B(Mt, Mt.current);
  }
  function Ct(e) {
    D(Mt), Kt === e && (Kt = null), D(Ve);
  }
  var Ve = _(0);
  function oi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || rr(n) || sr(n)))
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
  var zn = 0, ue = null, Ne = null, Je = null, ri = !1, cl = !1, Oa = !1, si = 0, nu = 0, ol = null, tv = 0;
  function Ye() {
    throw Error(r(321));
  }
  function ao(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!jt(e[n], t[n])) return !1;
    return !0;
  }
  function lo(e, t, n, a, i, c) {
    return zn = c, ue = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? Hf : _o, Oa = !1, c = n(a, i), Oa = !1, cl && (c = nf(
      t,
      n,
      a,
      i
    )), tf(e), c;
  }
  function tf(e) {
    j.H = uu;
    var t = Ne !== null && Ne.next !== null;
    if (zn = 0, Je = Ne = ue = null, ri = !1, nu = 0, ol = null, t) throw Error(r(300));
    e === null || We || (e = e.dependencies, e !== null && ei(e) && (We = !0));
  }
  function nf(e, t, n, a) {
    ue = e;
    var i = 0;
    do {
      if (cl && (ol = null), nu = 0, cl = !1, 25 <= i) throw Error(r(301));
      if (i += 1, Je = Ne = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      j.H = Bf, c = t(n, a);
    } while (cl);
    return c;
  }
  function nv() {
    var e = j.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? au(t) : t, e = e.useState()[0], (Ne !== null ? Ne.memoizedState : null) !== e && (ue.flags |= 1024), t;
  }
  function uo() {
    var e = si !== 0;
    return si = 0, e;
  }
  function io(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function co(e) {
    if (ri) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      ri = !1;
    }
    zn = 0, Je = Ne = ue = null, cl = !1, nu = si = 0, ol = null;
  }
  function vt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Je === null ? ue.memoizedState = Je = e : Je = Je.next = e, Je;
  }
  function $e() {
    if (Ne === null) {
      var e = ue.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Je === null ? ue.memoizedState : Je.next;
    if (t !== null)
      Je = t, Ne = e;
    else {
      if (e === null)
        throw ue.alternate === null ? Error(r(467)) : Error(r(310));
      Ne = e, e = {
        memoizedState: Ne.memoizedState,
        baseState: Ne.baseState,
        baseQueue: Ne.baseQueue,
        queue: Ne.queue,
        next: null
      }, Je === null ? ue.memoizedState = Je = e : Je = Je.next = e;
    }
    return Je;
  }
  function fi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function au(e) {
    var t = nu;
    return nu += 1, ol === null && (ol = []), e = Vs(ol, e, t), t = ue, (Je === null ? t.memoizedState : Je.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? Hf : _o), e;
  }
  function di(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return au(e);
      if (e.$$typeof === ge) return ot(e);
    }
    throw Error(r(438, String(e)));
  }
  function oo(e) {
    var t = null, n = ue.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var a = ue.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(i) {
          return i.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = fi(), ue.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), a = 0; a < e; a++)
        n[a] = tn;
    return t.index++, n;
  }
  function xn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function hi(e) {
    var t = $e();
    return ro(t, Ne, e);
  }
  function ro(e, t, n) {
    var a = e.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = n;
    var i = e.baseQueue, c = a.pending;
    if (c !== null) {
      if (i !== null) {
        var f = i.next;
        i.next = c.next, c.next = f;
      }
      t.baseQueue = i = c, a.pending = null;
    }
    if (c = e.baseState, i === null) e.memoizedState = c;
    else {
      t = i.next;
      var d = f = null, g = null, E = t, w = !1;
      do {
        var R = E.lane & -536870913;
        if (R !== E.lane ? (me & R) === R : (zn & R) === R) {
          var T = E.revertLane;
          if (T === 0)
            g !== null && (g = g.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null
            }), R === nl && (w = !0);
          else if ((zn & T) === T) {
            E = E.next, T === nl && (w = !0);
            continue;
          } else
            R = {
              lane: 0,
              revertLane: E.revertLane,
              gesture: null,
              action: E.action,
              hasEagerState: E.hasEagerState,
              eagerState: E.eagerState,
              next: null
            }, g === null ? (d = g = R, f = c) : g = g.next = R, ue.lanes |= T, $n |= T;
          R = E.action, Oa && n(c, R), c = E.hasEagerState ? E.eagerState : n(c, R);
        } else
          T = {
            lane: R,
            revertLane: E.revertLane,
            gesture: E.gesture,
            action: E.action,
            hasEagerState: E.hasEagerState,
            eagerState: E.eagerState,
            next: null
          }, g === null ? (d = g = T, f = c) : g = g.next = T, ue.lanes |= R, $n |= R;
        E = E.next;
      } while (E !== null && E !== t);
      if (g === null ? f = c : g.next = d, !jt(c, e.memoizedState) && (We = !0, w && (n = al, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = f, e.baseQueue = g, a.lastRenderedState = c;
    }
    return i === null && (a.lanes = 0), [e.memoizedState, a.dispatch];
  }
  function so(e) {
    var t = $e(), n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var a = n.dispatch, i = n.pending, c = t.memoizedState;
    if (i !== null) {
      n.pending = null;
      var f = i = i.next;
      do
        c = e(c, f.action), f = f.next;
      while (f !== i);
      jt(c, t.memoizedState) || (We = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, a];
  }
  function af(e, t, n) {
    var a = ue, i = $e(), c = ye;
    if (c) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var f = !jt(
      (Ne || i).memoizedState,
      n
    );
    if (f && (i.memoizedState = n, We = !0), i = i.queue, mo(cf.bind(null, a, i, e), [
      e
    ]), i.getSnapshot !== t || f || Je !== null && Je.memoizedState.tag & 1) {
      if (a.flags |= 2048, rl(
        9,
        { destroy: void 0 },
        uf.bind(
          null,
          a,
          i,
          n,
          t
        ),
        null
      ), Me === null) throw Error(r(349));
      c || (zn & 127) !== 0 || lf(a, t, n);
    }
    return n;
  }
  function lf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ue.updateQueue, t === null ? (t = fi(), ue.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function uf(e, t, n, a) {
    t.value = n, t.getSnapshot = a, of(t) && rf(e);
  }
  function cf(e, t, n) {
    return n(function() {
      of(t) && rf(e);
    });
  }
  function of(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !jt(e, n);
    } catch {
      return !0;
    }
  }
  function rf(e) {
    var t = ya(e, 2);
    t !== null && Et(t, e, 2);
  }
  function fo(e) {
    var t = vt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Oa) {
        ln(!0);
        try {
          n();
        } finally {
          ln(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xn,
      lastRenderedState: e
    }, t;
  }
  function sf(e, t, n, a) {
    return e.baseState = n, ro(
      e,
      Ne,
      typeof a == "function" ? a : xn
    );
  }
  function av(e, t, n, a, i) {
    if (vi(e)) throw Error(r(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: i,
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
      j.T !== null ? n(!0) : c.isTransition = !1, a(c), n = t.pending, n === null ? (c.next = t.pending = c, ff(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function ff(e, t) {
    var n = t.action, a = t.payload, i = e.state;
    if (t.isTransition) {
      var c = j.T, f = {};
      j.T = f;
      try {
        var d = n(i, a), g = j.S;
        g !== null && g(f, d), df(e, t, d);
      } catch (E) {
        ho(e, t, E);
      } finally {
        c !== null && f.types !== null && (c.types = f.types), j.T = c;
      }
    } else
      try {
        c = n(i, a), df(e, t, c);
      } catch (E) {
        ho(e, t, E);
      }
  }
  function df(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(a) {
        hf(e, t, a);
      },
      function(a) {
        return ho(e, t, a);
      }
    ) : hf(e, t, n);
  }
  function hf(e, t, n) {
    t.status = "fulfilled", t.value = n, mf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ff(e, n)));
  }
  function ho(e, t, n) {
    var a = e.pending;
    if (e.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = n, mf(t), t = t.next;
      while (t !== a);
    }
    e.action = null;
  }
  function mf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function pf(e, t) {
    return t;
  }
  function vf(e, t) {
    if (ye) {
      var n = Me.formState;
      if (n !== null) {
        e: {
          var a = ue;
          if (ye) {
            if (De) {
              t: {
                for (var i = De, c = $t; i.nodeType !== 8; ) {
                  if (!c) {
                    i = null;
                    break t;
                  }
                  if (i = Jt(
                    i.nextSibling
                  ), i === null) {
                    i = null;
                    break t;
                  }
                }
                c = i.data, i = c === "F!" || c === "F" ? i : null;
              }
              if (i) {
                De = Jt(
                  i.nextSibling
                ), a = i.data === "F!";
                break e;
              }
            }
            Hn(a);
          }
          a = !1;
        }
        a && (t = n[0]);
      }
    }
    return n = vt(), n.memoizedState = n.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: pf,
      lastRenderedState: t
    }, n.queue = a, n = Uf.bind(
      null,
      ue,
      a
    ), a.dispatch = n, a = fo(!1), c = bo.bind(
      null,
      ue,
      !1,
      a.queue
    ), a = vt(), i = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, a.queue = i, n = av.bind(
      null,
      ue,
      i,
      c,
      n
    ), i.dispatch = n, a.memoizedState = e, [t, n, !1];
  }
  function yf(e) {
    var t = $e();
    return gf(t, Ne, e);
  }
  function gf(e, t, n) {
    if (t = ro(
      e,
      t,
      pf
    )[0], e = hi(xn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = au(t);
      } catch (f) {
        throw f === ll ? ai : f;
      }
    else a = t;
    t = $e();
    var i = t.queue, c = i.dispatch;
    return n !== t.memoizedState && (ue.flags |= 2048, rl(
      9,
      { destroy: void 0 },
      lv.bind(null, i, n),
      null
    )), [a, c, e];
  }
  function lv(e, t) {
    e.action = t;
  }
  function bf(e) {
    var t = $e(), n = Ne;
    if (n !== null)
      return gf(t, n, e);
    $e(), t = t.memoizedState, n = $e();
    var a = n.queue.dispatch;
    return n.memoizedState = e, [t, a, !1];
  }
  function rl(e, t, n, a) {
    return e = { tag: e, create: n, deps: a, inst: t, next: null }, t = ue.updateQueue, t === null && (t = fi(), ue.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (a = n.next, n.next = e, e.next = a, t.lastEffect = e), e;
  }
  function _f() {
    return $e().memoizedState;
  }
  function mi(e, t, n, a) {
    var i = vt();
    ue.flags |= e, i.memoizedState = rl(
      1 | t,
      { destroy: void 0 },
      n,
      a === void 0 ? null : a
    );
  }
  function pi(e, t, n, a) {
    var i = $e();
    a = a === void 0 ? null : a;
    var c = i.memoizedState.inst;
    Ne !== null && a !== null && ao(a, Ne.memoizedState.deps) ? i.memoizedState = rl(t, c, n, a) : (ue.flags |= e, i.memoizedState = rl(
      1 | t,
      c,
      n,
      a
    ));
  }
  function Sf(e, t) {
    mi(8390656, 8, e, t);
  }
  function mo(e, t) {
    pi(2048, 8, e, t);
  }
  function uv(e) {
    ue.flags |= 4;
    var t = ue.updateQueue;
    if (t === null)
      t = fi(), ue.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function zf(e) {
    var t = $e().memoizedState;
    return uv({ ref: t, nextImpl: e }), function() {
      if ((ze & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function xf(e, t) {
    return pi(4, 2, e, t);
  }
  function Ef(e, t) {
    return pi(4, 4, e, t);
  }
  function Tf(e, t) {
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
  function Of(e, t, n) {
    n = n != null ? n.concat([e]) : null, pi(4, 4, Tf.bind(null, t, e), n);
  }
  function po() {
  }
  function Af(e, t) {
    var n = $e();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    return t !== null && ao(t, a[1]) ? a[0] : (n.memoizedState = [e, t], e);
  }
  function Nf(e, t) {
    var n = $e();
    t = t === void 0 ? null : t;
    var a = n.memoizedState;
    if (t !== null && ao(t, a[1]))
      return a[0];
    if (a = e(), Oa) {
      ln(!0);
      try {
        e();
      } finally {
        ln(!1);
      }
    }
    return n.memoizedState = [a, t], a;
  }
  function vo(e, t, n) {
    return n === void 0 || (zn & 1073741824) !== 0 && (me & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = jd(), ue.lanes |= e, $n |= e, n);
  }
  function jf(e, t, n, a) {
    return jt(n, t) ? n : il.current !== null ? (e = vo(e, n, a), jt(e, t) || (We = !0), e) : (zn & 42) === 0 || (zn & 1073741824) !== 0 && (me & 261930) === 0 ? (We = !0, e.memoizedState = n) : (e = jd(), ue.lanes |= e, $n |= e, t);
  }
  function wf(e, t, n, a, i) {
    var c = k.p;
    k.p = c !== 0 && 8 > c ? c : 8;
    var f = j.T, d = {};
    j.T = d, bo(e, !1, t, n);
    try {
      var g = i(), E = j.S;
      if (E !== null && E(d, g), g !== null && typeof g == "object" && typeof g.then == "function") {
        var w = ev(
          g,
          a
        );
        lu(
          e,
          t,
          w,
          Ut(e)
        );
      } else
        lu(
          e,
          t,
          a,
          Ut(e)
        );
    } catch (R) {
      lu(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: R },
        Ut()
      );
    } finally {
      k.p = c, f !== null && d.types !== null && (f.types = d.types), j.T = f;
    }
  }
  function iv() {
  }
  function yo(e, t, n, a) {
    if (e.tag !== 5) throw Error(r(476));
    var i = Mf(e).queue;
    wf(
      e,
      i,
      t,
      Q,
      n === null ? iv : function() {
        return Cf(e), n(a);
      }
    );
  }
  function Mf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: xn,
        lastRenderedState: Q
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
        lastRenderedReducer: xn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Cf(e) {
    var t = Mf(e);
    t.next === null && (t = e.alternate.memoizedState), lu(
      e,
      t.next.queue,
      {},
      Ut()
    );
  }
  function go() {
    return ot(Su);
  }
  function Df() {
    return $e().memoizedState;
  }
  function Rf() {
    return $e().memoizedState;
  }
  function cv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Ut();
          e = Yn(n);
          var a = Ln(t, e, n);
          a !== null && (Et(a, t, n), Pl(a, t, n)), t = { cache: Vc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ov(e, t, n) {
    var a = Ut();
    n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, vi(e) ? Zf(t, n) : (n = Uc(e, t, n, a), n !== null && (Et(n, e, a), qf(n, t, a)));
  }
  function Uf(e, t, n) {
    var a = Ut();
    lu(e, t, n, a);
  }
  function lu(e, t, n, a) {
    var i = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (vi(e)) Zf(t, i);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var f = t.lastRenderedState, d = c(f, n);
          if (i.hasEagerState = !0, i.eagerState = d, jt(d, f))
            return Wu(e, t, i, 0), Me === null && Ju(), !1;
        } catch {
        }
      if (n = Uc(e, t, i, a), n !== null)
        return Et(n, e, a), qf(n, t, a), !0;
    }
    return !1;
  }
  function bo(e, t, n, a) {
    if (a = {
      lane: 2,
      revertLane: Fo(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, vi(e)) {
      if (t) throw Error(r(479));
    } else
      t = Uc(
        e,
        n,
        a,
        2
      ), t !== null && Et(t, e, 2);
  }
  function vi(e) {
    var t = e.alternate;
    return e === ue || t !== null && t === ue;
  }
  function Zf(e, t) {
    cl = ri = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function qf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var a = t.lanes;
      a &= e.pendingLanes, n |= a, t.lanes = n, P(e, n);
    }
  }
  var uu = {
    readContext: ot,
    use: di,
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
  uu.useEffectEvent = Ye;
  var Hf = {
    readContext: ot,
    use: di,
    useCallback: function(e, t) {
      return vt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: ot,
    useEffect: Sf,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, mi(
        4194308,
        4,
        Tf.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return mi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      mi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = vt();
      t = t === void 0 ? null : t;
      var a = e();
      if (Oa) {
        ln(!0);
        try {
          e();
        } finally {
          ln(!1);
        }
      }
      return n.memoizedState = [a, t], a;
    },
    useReducer: function(e, t, n) {
      var a = vt();
      if (n !== void 0) {
        var i = n(t);
        if (Oa) {
          ln(!0);
          try {
            n(t);
          } finally {
            ln(!1);
          }
        }
      } else i = t;
      return a.memoizedState = a.baseState = i, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: i
      }, a.queue = e, e = e.dispatch = ov.bind(
        null,
        ue,
        e
      ), [a.memoizedState, e];
    },
    useRef: function(e) {
      var t = vt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = fo(e);
      var t = e.queue, n = Uf.bind(null, ue, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: po,
    useDeferredValue: function(e, t) {
      var n = vt();
      return vo(n, e, t);
    },
    useTransition: function() {
      var e = fo(!1);
      return e = wf.bind(
        null,
        ue,
        e.queue,
        !0,
        !1
      ), vt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var a = ue, i = vt();
      if (ye) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = t(), Me === null)
          throw Error(r(349));
        (me & 127) !== 0 || lf(a, t, n);
      }
      i.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return i.queue = c, Sf(cf.bind(null, a, c, e), [
        e
      ]), a.flags |= 2048, rl(
        9,
        { destroy: void 0 },
        uf.bind(
          null,
          a,
          c,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = vt(), t = Me.identifierPrefix;
      if (ye) {
        var n = cn, a = un;
        n = (a & ~(1 << 32 - lt(a) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = si++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = tv++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: go,
    useFormState: vf,
    useActionState: vf,
    useOptimistic: function(e) {
      var t = vt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = bo.bind(
        null,
        ue,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: oo,
    useCacheRefresh: function() {
      return vt().memoizedState = cv.bind(
        null,
        ue
      );
    },
    useEffectEvent: function(e) {
      var t = vt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((ze & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, _o = {
    readContext: ot,
    use: di,
    useCallback: Af,
    useContext: ot,
    useEffect: mo,
    useImperativeHandle: Of,
    useInsertionEffect: xf,
    useLayoutEffect: Ef,
    useMemo: Nf,
    useReducer: hi,
    useRef: _f,
    useState: function() {
      return hi(xn);
    },
    useDebugValue: po,
    useDeferredValue: function(e, t) {
      var n = $e();
      return jf(
        n,
        Ne.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = hi(xn)[0], t = $e().memoizedState;
      return [
        typeof e == "boolean" ? e : au(e),
        t
      ];
    },
    useSyncExternalStore: af,
    useId: Df,
    useHostTransitionStatus: go,
    useFormState: yf,
    useActionState: yf,
    useOptimistic: function(e, t) {
      var n = $e();
      return sf(n, Ne, e, t);
    },
    useMemoCache: oo,
    useCacheRefresh: Rf
  };
  _o.useEffectEvent = zf;
  var Bf = {
    readContext: ot,
    use: di,
    useCallback: Af,
    useContext: ot,
    useEffect: mo,
    useImperativeHandle: Of,
    useInsertionEffect: xf,
    useLayoutEffect: Ef,
    useMemo: Nf,
    useReducer: so,
    useRef: _f,
    useState: function() {
      return so(xn);
    },
    useDebugValue: po,
    useDeferredValue: function(e, t) {
      var n = $e();
      return Ne === null ? vo(n, e, t) : jf(
        n,
        Ne.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = so(xn)[0], t = $e().memoizedState;
      return [
        typeof e == "boolean" ? e : au(e),
        t
      ];
    },
    useSyncExternalStore: af,
    useId: Df,
    useHostTransitionStatus: go,
    useFormState: bf,
    useActionState: bf,
    useOptimistic: function(e, t) {
      var n = $e();
      return Ne !== null ? sf(n, Ne, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: oo,
    useCacheRefresh: Rf
  };
  Bf.useEffectEvent = zf;
  function So(e, t, n, a) {
    t = e.memoizedState, n = n(a, t), n = n == null ? t : A({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var zo = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var a = Ut(), i = Yn(a);
      i.payload = t, n != null && (i.callback = n), t = Ln(e, i, a), t !== null && (Et(t, e, a), Pl(t, e, a));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var a = Ut(), i = Yn(a);
      i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ln(e, i, a), t !== null && (Et(t, e, a), Pl(t, e, a));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Ut(), a = Yn(n);
      a.tag = 2, t != null && (a.callback = t), t = Ln(e, a, n), t !== null && (Et(t, e, n), Pl(t, e, n));
    }
  };
  function kf(e, t, n, a, i, c, f) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, c, f) : t.prototype && t.prototype.isPureReactComponent ? !Ql(n, a) || !Ql(i, c) : !0;
  }
  function Yf(e, t, n, a) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== e && zo.enqueueReplaceState(t, t.state, null);
  }
  function Aa(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var a in t)
        a !== "ref" && (n[a] = t[a]);
    }
    if (e = e.defaultProps) {
      n === t && (n = A({}, n));
      for (var i in e)
        n[i] === void 0 && (n[i] = e[i]);
    }
    return n;
  }
  function Lf(e) {
    Ku(e);
  }
  function Gf(e) {
    console.error(e);
  }
  function Xf(e) {
    Ku(e);
  }
  function yi(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Qf(e, t, n) {
    try {
      var a = e.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function xo(e, t, n) {
    return n = Yn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      yi(e, t);
    }, n;
  }
  function Vf(e) {
    return e = Yn(e), e.tag = 3, e;
  }
  function $f(e, t, n, a) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var c = a.value;
      e.payload = function() {
        return i(c);
      }, e.callback = function() {
        Qf(t, n, a);
      };
    }
    var f = n.stateNode;
    f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
      Qf(t, n, a), typeof i != "function" && (Kn === null ? Kn = /* @__PURE__ */ new Set([this]) : Kn.add(this));
      var d = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: d !== null ? d : ""
      });
    });
  }
  function rv(e, t, n, a, i) {
    if (n.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = n.alternate, t !== null && tl(
        t,
        n,
        i,
        !0
      ), n = Mt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Kt === null ? ji() : n.alternate === null && Le === 0 && (Le = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, a === li ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), Ko(e, a, i)), !1;
          case 22:
            return n.flags |= 65536, a === li ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : n.add(a)), Ko(e, a, i)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Ko(e, a, i), ji(), !1;
    }
    if (ye)
      return t = Mt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = i, a !== Yc && (e = Error(r(422), { cause: a }), Kl(Xt(e, n)))) : (a !== Yc && (t = Error(r(423), {
        cause: a
      }), Kl(
        Xt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, a = Xt(a, n), i = xo(
        e.stateNode,
        a,
        i
      ), Ic(e, i), Le !== 4 && (Le = 2)), !1;
    var c = Error(r(520), { cause: a });
    if (c = Xt(c, n), hu === null ? hu = [c] : hu.push(c), Le !== 4 && (Le = 2), t === null) return !0;
    a = Xt(a, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = i & -i, n.lanes |= e, e = xo(n.stateNode, a, e), Ic(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Kn === null || !Kn.has(c))))
            return n.flags |= 65536, i &= -i, n.lanes |= i, i = Vf(i), $f(
              i,
              e,
              n,
              a
            ), Ic(n, i), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Eo = Error(r(461)), We = !1;
  function rt(e, t, n, a) {
    t.child = e === null ? Ws(t, null, n, a) : Ta(
      t,
      e.child,
      n,
      a
    );
  }
  function Kf(e, t, n, a, i) {
    n = n.render;
    var c = t.ref;
    if ("ref" in a) {
      var f = {};
      for (var d in a)
        d !== "ref" && (f[d] = a[d]);
    } else f = a;
    return Sa(t), a = lo(
      e,
      t,
      n,
      f,
      c,
      i
    ), d = uo(), e !== null && !We ? (io(e, t, i), En(e, t, i)) : (ye && d && Bc(t), t.flags |= 1, rt(e, t, a, i), t.child);
  }
  function Jf(e, t, n, a, i) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !Zc(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, Wf(
        e,
        t,
        c,
        a,
        i
      )) : (e = Iu(
        n.type,
        null,
        a,
        t,
        t.mode,
        i
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !Co(e, i)) {
      var f = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Ql, n(f, a) && e.ref === t.ref)
        return En(e, t, i);
    }
    return t.flags |= 1, e = gn(c, a), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Wf(e, t, n, a, i) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ql(c, a) && e.ref === t.ref)
        if (We = !1, t.pendingProps = a = c, Co(e, i))
          (e.flags & 131072) !== 0 && (We = !0);
        else
          return t.lanes = e.lanes, En(e, t, i);
    }
    return To(
      e,
      t,
      n,
      a,
      i
    );
  }
  function Ff(e, t, n, a) {
    var i = a.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (a = t.child = e.child, i = 0; a !== null; )
            i = i | a.lanes | a.childLanes, a = a.sibling;
          a = i & ~c;
        } else a = 0, t.child = null;
        return If(
          e,
          t,
          c,
          n,
          a
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && ni(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Ps(t, c) : eo(), ef(t);
      else
        return a = t.lanes = 536870912, If(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          a
        );
    } else
      c !== null ? (ni(t, c.cachePool), Ps(t, c), Xn(), t.memoizedState = null) : (e !== null && ni(t, null), eo(), Xn());
    return rt(e, t, i, n), t.child;
  }
  function iu(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function If(e, t, n, a, i) {
    var c = Kc();
    return c = c === null ? null : { parent: Ke._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && ni(t, null), eo(), ef(t), e !== null && tl(e, t, a, !0), t.childLanes = i, null;
  }
  function gi(e, t) {
    return t = _i(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Pf(e, t, n) {
    return Ta(t, e.child, null, n), e = gi(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function sv(e, t, n) {
    var a = t.pendingProps, i = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ye) {
        if (a.mode === "hidden")
          return e = gi(t, a), t.lanes = 536870912, iu(null, e);
        if (no(t), (e = De) ? (e = fh(
          e,
          $t
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Zn !== null ? { id: un, overflow: cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Us(e), n.return = t, t.child = n, ct = t, De = null)) : e = null, e === null) throw Hn(t);
        return t.lanes = 536870912, null;
      }
      return gi(t, a);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var f = c.dehydrated;
      if (no(t), i)
        if (t.flags & 256)
          t.flags &= -257, t = Pf(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (We || tl(e, t, n, !1), i = (n & e.childLanes) !== 0, We || i) {
        if (a = Me, a !== null && (f = be(a, n), f !== 0 && f !== c.retryLane))
          throw c.retryLane = f, ya(e, f), Et(a, e, f), Eo;
        ji(), t = Pf(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, De = Jt(f.nextSibling), ct = t, ye = !0, qn = null, $t = !1, e !== null && Hs(t, e), t = gi(t, a), t.flags |= 4096;
      return t;
    }
    return e = gn(e.child, {
      mode: a.mode,
      children: a.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function bi(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function To(e, t, n, a, i) {
    return Sa(t), n = lo(
      e,
      t,
      n,
      a,
      void 0,
      i
    ), a = uo(), e !== null && !We ? (io(e, t, i), En(e, t, i)) : (ye && a && Bc(t), t.flags |= 1, rt(e, t, n, i), t.child);
  }
  function ed(e, t, n, a, i, c) {
    return Sa(t), t.updateQueue = null, n = nf(
      t,
      a,
      n,
      i
    ), tf(e), a = uo(), e !== null && !We ? (io(e, t, c), En(e, t, c)) : (ye && a && Bc(t), t.flags |= 1, rt(e, t, n, c), t.child);
  }
  function td(e, t, n, a, i) {
    if (Sa(t), t.stateNode === null) {
      var c = Fa, f = n.contextType;
      typeof f == "object" && f !== null && (c = ot(f)), c = new n(a, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = zo, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = a, c.state = t.memoizedState, c.refs = {}, Wc(t), f = n.contextType, c.context = typeof f == "object" && f !== null ? ot(f) : Fa, c.state = t.memoizedState, f = n.getDerivedStateFromProps, typeof f == "function" && (So(
        t,
        n,
        f,
        a
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (f = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), f !== c.state && zo.enqueueReplaceState(c, c.state, null), tu(t, a, c, i), eu(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (e === null) {
      c = t.stateNode;
      var d = t.memoizedProps, g = Aa(n, d);
      c.props = g;
      var E = c.context, w = n.contextType;
      f = Fa, typeof w == "object" && w !== null && (f = ot(w));
      var R = n.getDerivedStateFromProps;
      w = typeof R == "function" || typeof c.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, w || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (d || E !== f) && Yf(
        t,
        c,
        a,
        f
      ), kn = !1;
      var T = t.memoizedState;
      c.state = T, tu(t, a, c, i), eu(), E = t.memoizedState, d || T !== E || kn ? (typeof R == "function" && (So(
        t,
        n,
        R,
        a
      ), E = t.memoizedState), (g = kn || kf(
        t,
        n,
        g,
        a,
        T,
        E,
        f
      )) ? (w || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = E), c.props = a, c.state = E, c.context = f, a = g) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      c = t.stateNode, Fc(e, t), f = t.memoizedProps, w = Aa(n, f), c.props = w, R = t.pendingProps, T = c.context, E = n.contextType, g = Fa, typeof E == "object" && E !== null && (g = ot(E)), d = n.getDerivedStateFromProps, (E = typeof d == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (f !== R || T !== g) && Yf(
        t,
        c,
        a,
        g
      ), kn = !1, T = t.memoizedState, c.state = T, tu(t, a, c, i), eu();
      var O = t.memoizedState;
      f !== R || T !== O || kn || e !== null && e.dependencies !== null && ei(e.dependencies) ? (typeof d == "function" && (So(
        t,
        n,
        d,
        a
      ), O = t.memoizedState), (w = kn || kf(
        t,
        n,
        w,
        a,
        T,
        O,
        g
      ) || e !== null && e.dependencies !== null && ei(e.dependencies)) ? (E || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(a, O, g), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        a,
        O,
        g
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = O), c.props = a, c.state = O, c.context = g, a = w) : (typeof c.componentDidUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && T === e.memoizedState || (t.flags |= 1024), a = !1);
    }
    return c = a, bi(e, t), a = (t.flags & 128) !== 0, c || a ? (c = t.stateNode, n = a && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && a ? (t.child = Ta(
      t,
      e.child,
      null,
      i
    ), t.child = Ta(
      t,
      null,
      n,
      i
    )) : rt(e, t, n, i), t.memoizedState = c.state, e = t.child) : e = En(
      e,
      t,
      i
    ), e;
  }
  function nd(e, t, n, a) {
    return ba(), t.flags |= 256, rt(e, t, n, a), t.child;
  }
  var Oo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ao(e) {
    return { baseLanes: e, cachePool: Xs() };
  }
  function No(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Rt), e;
  }
  function ad(e, t, n) {
    var a = t.pendingProps, i = !1, c = (t.flags & 128) !== 0, f;
    if ((f = c) || (f = e !== null && e.memoizedState === null ? !1 : (Ve.current & 2) !== 0), f && (i = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ye) {
        if (i ? Gn(t) : Xn(), (e = De) ? (e = fh(
          e,
          $t
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Zn !== null ? { id: un, overflow: cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Us(e), n.return = t, t.child = n, ct = t, De = null)) : e = null, e === null) throw Hn(t);
        return sr(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var d = a.children;
      return a = a.fallback, i ? (Xn(), i = t.mode, d = _i(
        { mode: "hidden", children: d },
        i
      ), a = ga(
        a,
        i,
        n,
        null
      ), d.return = t, a.return = t, d.sibling = a, t.child = d, a = t.child, a.memoizedState = Ao(n), a.childLanes = No(
        e,
        f,
        n
      ), t.memoizedState = Oo, iu(null, a)) : (Gn(t), jo(t, d));
    }
    var g = e.memoizedState;
    if (g !== null && (d = g.dehydrated, d !== null)) {
      if (c)
        t.flags & 256 ? (Gn(t), t.flags &= -257, t = wo(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (Xn(), t.child = e.child, t.flags |= 128, t = null) : (Xn(), d = a.fallback, i = t.mode, a = _i(
          { mode: "visible", children: a.children },
          i
        ), d = ga(
          d,
          i,
          n,
          null
        ), d.flags |= 2, a.return = t, d.return = t, a.sibling = d, t.child = a, Ta(
          t,
          e.child,
          null,
          n
        ), a = t.child, a.memoizedState = Ao(n), a.childLanes = No(
          e,
          f,
          n
        ), t.memoizedState = Oo, t = iu(null, a));
      else if (Gn(t), sr(d)) {
        if (f = d.nextSibling && d.nextSibling.dataset, f) var E = f.dgst;
        f = E, a = Error(r(419)), a.stack = "", a.digest = f, Kl({ value: a, source: null, stack: null }), t = wo(
          e,
          t,
          n
        );
      } else if (We || tl(e, t, n, !1), f = (n & e.childLanes) !== 0, We || f) {
        if (f = Me, f !== null && (a = be(f, n), a !== 0 && a !== g.retryLane))
          throw g.retryLane = a, ya(e, a), Et(f, e, a), Eo;
        rr(d) || ji(), t = wo(
          e,
          t,
          n
        );
      } else
        rr(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, De = Jt(
          d.nextSibling
        ), ct = t, ye = !0, qn = null, $t = !1, e !== null && Hs(t, e), t = jo(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return i ? (Xn(), d = a.fallback, i = t.mode, g = e.child, E = g.sibling, a = gn(g, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = g.subtreeFlags & 65011712, E !== null ? d = gn(
      E,
      d
    ) : (d = ga(
      d,
      i,
      n,
      null
    ), d.flags |= 2), d.return = t, a.return = t, a.sibling = d, t.child = a, iu(null, a), a = t.child, d = e.child.memoizedState, d === null ? d = Ao(n) : (i = d.cachePool, i !== null ? (g = Ke._currentValue, i = i.parent !== g ? { parent: g, pool: g } : i) : i = Xs(), d = {
      baseLanes: d.baseLanes | n,
      cachePool: i
    }), a.memoizedState = d, a.childLanes = No(
      e,
      f,
      n
    ), t.memoizedState = Oo, iu(e.child, a)) : (Gn(t), n = e.child, e = n.sibling, n = gn(n, {
      mode: "visible",
      children: a.children
    }), n.return = t, n.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [e], t.flags |= 16) : f.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function jo(e, t) {
    return t = _i(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function _i(e, t) {
    return e = wt(22, e, null, t), e.lanes = 0, e;
  }
  function wo(e, t, n) {
    return Ta(t, e.child, null, n), e = jo(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function ld(e, t, n) {
    e.lanes |= t;
    var a = e.alternate;
    a !== null && (a.lanes |= t), Xc(e.return, t, n);
  }
  function Mo(e, t, n, a, i, c) {
    var f = e.memoizedState;
    f === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: i,
      treeForkCount: c
    } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = n, f.tailMode = i, f.treeForkCount = c);
  }
  function ud(e, t, n) {
    var a = t.pendingProps, i = a.revealOrder, c = a.tail;
    a = a.children;
    var f = Ve.current, d = (f & 2) !== 0;
    if (d ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, B(Ve, f), rt(e, t, a, n), a = ye ? $l : 0, !d && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && ld(e, n, t);
        else if (e.tag === 19)
          ld(e, n, t);
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
    switch (i) {
      case "forwards":
        for (n = t.child, i = null; n !== null; )
          e = n.alternate, e !== null && oi(e) === null && (i = n), n = n.sibling;
        n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Mo(
          t,
          !1,
          i,
          n,
          c,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, i = t.child, t.child = null; i !== null; ) {
          if (e = i.alternate, e !== null && oi(e) === null) {
            t.child = i;
            break;
          }
          e = i.sibling, i.sibling = n, n = i, i = e;
        }
        Mo(
          t,
          !0,
          n,
          null,
          c,
          a
        );
        break;
      case "together":
        Mo(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function En(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), $n |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (tl(
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
      for (e = t.child, n = gn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = gn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Co(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && ei(e)));
  }
  function fv(e, t, n) {
    switch (t.tag) {
      case 3:
        Oe(t, t.stateNode.containerInfo), Bn(t, Ke, e.memoizedState.cache), ba();
        break;
      case 27:
      case 5:
        an(t);
        break;
      case 4:
        Oe(t, t.stateNode.containerInfo);
        break;
      case 10:
        Bn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, no(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (Gn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? ad(e, t, n) : (Gn(t), e = En(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Gn(t);
        break;
      case 19:
        var i = (e.flags & 128) !== 0;
        if (a = (n & t.childLanes) !== 0, a || (tl(
          e,
          t,
          n,
          !1
        ), a = (n & t.childLanes) !== 0), i) {
          if (a)
            return ud(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), B(Ve, Ve.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, Ff(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Bn(t, Ke, e.memoizedState.cache);
    }
    return En(e, t, n);
  }
  function id(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        We = !0;
      else {
        if (!Co(e, n) && (t.flags & 128) === 0)
          return We = !1, fv(
            e,
            t,
            n
          );
        We = (e.flags & 131072) !== 0;
      }
    else
      We = !1, ye && (t.flags & 1048576) !== 0 && qs(t, $l, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var a = t.pendingProps;
          if (e = xa(t.elementType), t.type = e, typeof e == "function")
            Zc(e) ? (a = Aa(e, a), t.tag = 1, t = td(
              null,
              t,
              e,
              a,
              n
            )) : (t.tag = 0, t = To(
              null,
              t,
              e,
              a,
              n
            ));
          else {
            if (e != null) {
              var i = e.$$typeof;
              if (i === V) {
                t.tag = 11, t = Kf(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              } else if (i === ae) {
                t.tag = 14, t = Jf(
                  null,
                  t,
                  e,
                  a,
                  n
                );
                break e;
              }
            }
            throw t = Ot(e) || e, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return To(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return a = t.type, i = Aa(
          a,
          t.pendingProps
        ), td(
          e,
          t,
          a,
          i,
          n
        );
      case 3:
        e: {
          if (Oe(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          a = t.pendingProps;
          var c = t.memoizedState;
          i = c.element, Fc(e, t), tu(t, a, null, n);
          var f = t.memoizedState;
          if (a = f.cache, Bn(t, Ke, a), a !== c.cache && Qc(
            t,
            [Ke],
            n,
            !0
          ), eu(), a = f.element, c.isDehydrated)
            if (c = {
              element: a,
              isDehydrated: !1,
              cache: f.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = nd(
                e,
                t,
                a,
                n
              );
              break e;
            } else if (a !== i) {
              i = Xt(
                Error(r(424)),
                t
              ), Kl(i), t = nd(
                e,
                t,
                a,
                n
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, De = Jt(e.firstChild), ct = t, ye = !0, qn = null, $t = !0, n = Ws(
                t,
                null,
                a,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (ba(), a === i) {
              t = En(
                e,
                t,
                n
              );
              break e;
            }
            rt(e, t, a, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return bi(e, t), e === null ? (n = yh(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ye || (n = t.type, e = t.pendingProps, a = Zi(
          ce.current
        ).createElement(n), a[it] = t, a[gt] = e, st(a, n, e), nt(a), t.stateNode = a) : t.memoizedState = yh(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return an(t), e === null && ye && (a = t.stateNode = mh(
          t.type,
          t.pendingProps,
          ce.current
        ), ct = t, $t = !0, i = De, In(t.type) ? (fr = i, De = Jt(a.firstChild)) : De = i), rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), bi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ye && ((i = a = De) && (a = Yv(
          a,
          t.type,
          t.pendingProps,
          $t
        ), a !== null ? (t.stateNode = a, ct = t, De = Jt(a.firstChild), $t = !1, i = !0) : i = !1), i || Hn(t)), an(t), i = t.type, c = t.pendingProps, f = e !== null ? e.memoizedProps : null, a = c.children, ir(i, c) ? a = null : f !== null && ir(i, f) && (t.flags |= 32), t.memoizedState !== null && (i = lo(
          e,
          t,
          nv,
          null,
          null,
          n
        ), Su._currentValue = i), bi(e, t), rt(e, t, a, n), t.child;
      case 6:
        return e === null && ye && ((e = n = De) && (n = Lv(
          n,
          t.pendingProps,
          $t
        ), n !== null ? (t.stateNode = n, ct = t, De = null, e = !0) : e = !1), e || Hn(t)), null;
      case 13:
        return ad(e, t, n);
      case 4:
        return Oe(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, e === null ? t.child = Ta(
          t,
          null,
          a,
          n
        ) : rt(e, t, a, n), t.child;
      case 11:
        return Kf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return rt(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return a = t.pendingProps, Bn(t, t.type, a.value), rt(e, t, a.children, n), t.child;
      case 9:
        return i = t.type._context, a = t.pendingProps.children, Sa(t), i = ot(i), a = a(i), t.flags |= 1, rt(e, t, a, n), t.child;
      case 14:
        return Jf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Wf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return ud(e, t, n);
      case 31:
        return sv(e, t, n);
      case 22:
        return Ff(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Sa(t), a = ot(Ke), e === null ? (i = Kc(), i === null && (i = Me, c = Vc(), i.pooledCache = c, c.refCount++, c !== null && (i.pooledCacheLanes |= n), i = c), t.memoizedState = { parent: a, cache: i }, Wc(t), Bn(t, Ke, i)) : ((e.lanes & n) !== 0 && (Fc(e, t), tu(t, null, null, n), eu()), i = e.memoizedState, c = t.memoizedState, i.parent !== a ? (i = { parent: a, cache: a }, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Bn(t, Ke, a)) : (a = c.cache, Bn(t, Ke, a), a !== i.cache && Qc(
          t,
          [Ke],
          n,
          !0
        ))), rt(
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
  function Tn(e) {
    e.flags |= 4;
  }
  function Do(e, t, n, a, i) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (i & 335544128) === i)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Dd()) e.flags |= 8192;
        else
          throw Ea = li, Jc;
    } else e.flags &= -16777217;
  }
  function cd(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !zh(t))
      if (Dd()) e.flags |= 8192;
      else
        throw Ea = li, Jc;
  }
  function Si(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ul() : 536870912, e.lanes |= t, hl |= t);
  }
  function cu(e, t) {
    if (!ye)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
      }
  }
  function Re(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, a = 0;
    if (t)
      for (var i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, a |= i.subtreeFlags & 65011712, a |= i.flags & 65011712, i.return = e, i = i.sibling;
    else
      for (i = e.child; i !== null; )
        n |= i.lanes | i.childLanes, a |= i.subtreeFlags, a |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= a, e.childLanes = n, t;
  }
  function dv(e, t, n) {
    var a = t.pendingProps;
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
        return Re(t), null;
      case 1:
        return Re(t), null;
      case 3:
        return n = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Sn(Ke), Ae(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (el(t) ? Tn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Lc())), Re(t), null;
      case 26:
        var i = t.type, c = t.memoizedState;
        return e === null ? (Tn(t), c !== null ? (Re(t), cd(t, c)) : (Re(t), Do(
          t,
          i,
          null,
          a,
          n
        ))) : c ? c !== e.memoizedState ? (Tn(t), Re(t), cd(t, c)) : (Re(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && Tn(t), Re(t), Do(
          t,
          i,
          e,
          a,
          n
        )), null;
      case 27:
        if (fn(t), n = ce.current, i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Re(t), null;
          }
          e = U.current, el(t) ? Bs(t) : (e = mh(i, a, n), t.stateNode = e, Tn(t));
        }
        return Re(t), null;
      case 5:
        if (fn(t), i = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(r(166));
            return Re(t), null;
          }
          if (c = U.current, el(t))
            Bs(t);
          else {
            var f = Zi(
              ce.current
            );
            switch (c) {
              case 1:
                c = f.createElementNS(
                  "http://www.w3.org/2000/svg",
                  i
                );
                break;
              case 2:
                c = f.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  i
                );
                break;
              default:
                switch (i) {
                  case "svg":
                    c = f.createElementNS(
                      "http://www.w3.org/2000/svg",
                      i
                    );
                    break;
                  case "math":
                    c = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    c = f.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof a.is == "string" ? f.createElement("select", {
                      is: a.is
                    }) : f.createElement("select"), a.multiple ? c.multiple = !0 : a.size && (c.size = a.size);
                    break;
                  default:
                    c = typeof a.is == "string" ? f.createElement(i, { is: a.is }) : f.createElement(i);
                }
            }
            c[it] = t, c[gt] = a;
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
            e: switch (st(c, i, a), i) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break e;
              case "img":
                a = !0;
                break e;
              default:
                a = !1;
            }
            a && Tn(t);
          }
        }
        return Re(t), Do(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== a && Tn(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(r(166));
          if (e = ce.current, el(t)) {
            if (e = t.stateNode, n = t.memoizedProps, a = null, i = ct, i !== null)
              switch (i.tag) {
                case 27:
                case 5:
                  a = i.memoizedProps;
              }
            e[it] = t, e = !!(e.nodeValue === n || a !== null && a.suppressHydrationWarning === !0 || ah(e.nodeValue, n)), e || Hn(t, !0);
          } else
            e = Zi(e).createTextNode(
              a
            ), e[it] = t, t.stateNode = e;
        }
        return Re(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (a = el(t), n !== null) {
            if (e === null) {
              if (!a) throw Error(r(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[it] = t;
            } else
              ba(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), e = !1;
          } else
            n = Lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Re(t), null;
      case 13:
        if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (i = el(t), a !== null && a.dehydrated !== null) {
            if (e === null) {
              if (!i) throw Error(r(318));
              if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(r(317));
              i[it] = t;
            } else
              ba(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Re(t), i = !1;
          } else
            i = Lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
          if (!i)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = a !== null, e = e !== null && e.memoizedState !== null, n && (a = t.child, i = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (i = a.alternate.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== i && (a.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Si(t, t.updateQueue), Re(t), null);
      case 4:
        return Ae(), e === null && tr(t.stateNode.containerInfo), Re(t), null;
      case 10:
        return Sn(t.type), Re(t), null;
      case 19:
        if (D(Ve), a = t.memoizedState, a === null) return Re(t), null;
        if (i = (t.flags & 128) !== 0, c = a.rendering, c === null)
          if (i) cu(a, !1);
          else {
            if (Le !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = oi(e), c !== null) {
                  for (t.flags |= 128, cu(a, !1), e = c.updateQueue, t.updateQueue = e, Si(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Rs(n, e), n = n.sibling;
                  return B(
                    Ve,
                    Ve.current & 1 | 2
                  ), ye && bn(t, a.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            a.tail !== null && dt() > Oi && (t.flags |= 128, i = !0, cu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!i)
            if (e = oi(c), e !== null) {
              if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Si(t, e), cu(a, !0), a.tail === null && a.tailMode === "hidden" && !c.alternate && !ye)
                return Re(t), null;
            } else
              2 * dt() - a.renderingStartTime > Oi && n !== 536870912 && (t.flags |= 128, i = !0, cu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (c.sibling = t.child, t.child = c) : (e = a.last, e !== null ? e.sibling = c : t.child = c, a.last = c);
        }
        return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = dt(), e.sibling = null, n = Ve.current, B(
          Ve,
          i ? n & 1 | 2 : n & 1
        ), ye && bn(t, a.treeForkCount), e) : (Re(t), null);
      case 22:
      case 23:
        return Ct(t), to(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Re(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Re(t), n = t.updateQueue, n !== null && Si(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== n && (t.flags |= 2048), e !== null && D(za), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Sn(Ke), Re(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, t.tag));
  }
  function hv(e, t) {
    switch (kc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Sn(Ke), Ae(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return fn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(r(340));
          ba();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          ba();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return D(Ve), null;
      case 4:
        return Ae(), null;
      case 10:
        return Sn(t.type), null;
      case 22:
      case 23:
        return Ct(t), to(), e !== null && D(za), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Sn(Ke), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function od(e, t) {
    switch (kc(t), t.tag) {
      case 3:
        Sn(Ke), Ae();
        break;
      case 26:
      case 27:
      case 5:
        fn(t);
        break;
      case 4:
        Ae();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        D(Ve);
        break;
      case 10:
        Sn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), to(), e !== null && D(za);
        break;
      case 24:
        Sn(Ke);
    }
  }
  function ou(e, t) {
    try {
      var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & e) === e) {
            a = void 0;
            var c = n.create, f = n.inst;
            a = c(), f.destroy = a;
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (d) {
      Ee(t, t.return, d);
    }
  }
  function Qn(e, t, n) {
    try {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var c = i.next;
        a = c;
        do {
          if ((a.tag & e) === e) {
            var f = a.inst, d = f.destroy;
            if (d !== void 0) {
              f.destroy = void 0, i = t;
              var g = n, E = d;
              try {
                E();
              } catch (w) {
                Ee(
                  i,
                  g,
                  w
                );
              }
            }
          }
          a = a.next;
        } while (a !== c);
      }
    } catch (w) {
      Ee(t, t.return, w);
    }
  }
  function rd(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Is(t, n);
      } catch (a) {
        Ee(e, e.return, a);
      }
    }
  }
  function sd(e, t, n) {
    n.props = Aa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (a) {
      Ee(e, t, a);
    }
  }
  function ru(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(a) : n.current = a;
      }
    } catch (i) {
      Ee(e, t, i);
    }
  }
  function on(e, t) {
    var n = e.ref, a = e.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (i) {
          Ee(e, t, i);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          Ee(e, t, i);
        }
      else n.current = null;
  }
  function fd(e) {
    var t = e.type, n = e.memoizedProps, a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break e;
        case "img":
          n.src ? a.src = n.src : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (i) {
      Ee(e, e.return, i);
    }
  }
  function Ro(e, t, n) {
    try {
      var a = e.stateNode;
      Uv(a, e.type, n, t), a[gt] = t;
    } catch (i) {
      Ee(e, e.return, i);
    }
  }
  function dd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && In(e.type) || e.tag === 4;
  }
  function Uo(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || dd(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && In(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Zo(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = vn));
    else if (a !== 4 && (a === 27 && In(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Zo(e, t, n), e = e.sibling; e !== null; )
        Zo(e, t, n), e = e.sibling;
  }
  function zi(e, t, n) {
    var a = e.tag;
    if (a === 5 || a === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (a !== 4 && (a === 27 && In(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (zi(e, t, n), e = e.sibling; e !== null; )
        zi(e, t, n), e = e.sibling;
  }
  function hd(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var a = e.type, i = t.attributes; i.length; )
        t.removeAttributeNode(i[0]);
      st(t, a, n), t[it] = e, t[gt] = n;
    } catch (c) {
      Ee(e, e.return, c);
    }
  }
  var On = !1, Fe = !1, qo = !1, md = typeof WeakSet == "function" ? WeakSet : Set, at = null;
  function mv(e, t) {
    if (e = e.containerInfo, lr = Gi, e = Ts(e), jc(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var i = a.anchorOffset, c = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break e;
            }
            var f = 0, d = -1, g = -1, E = 0, w = 0, R = e, T = null;
            t: for (; ; ) {
              for (var O; R !== n || i !== 0 && R.nodeType !== 3 || (d = f + i), R !== c || a !== 0 && R.nodeType !== 3 || (g = f + a), R.nodeType === 3 && (f += R.nodeValue.length), (O = R.firstChild) !== null; )
                T = R, R = O;
              for (; ; ) {
                if (R === e) break t;
                if (T === n && ++E === i && (d = f), T === c && ++w === a && (g = f), (O = R.nextSibling) !== null) break;
                R = T, T = R.parentNode;
              }
              R = O;
            }
            n = d === -1 || g === -1 ? null : { start: d, end: g };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (ur = { focusedElem: e, selectionRange: n }, Gi = !1, at = t; at !== null; )
      if (t = at, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, at = e;
      else
        for (; at !== null; ) {
          switch (t = at, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  i = e[n], i.ref.impl = i.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, n = t, i = c.memoizedProps, c = c.memoizedState, a = n.stateNode;
                try {
                  var G = Aa(
                    n.type,
                    i
                  );
                  e = a.getSnapshotBeforeUpdate(
                    G,
                    c
                  ), a.__reactInternalSnapshotBeforeUpdate = e;
                } catch (F) {
                  Ee(
                    n,
                    n.return,
                    F
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  or(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      or(e);
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
            e.return = t.return, at = e;
            break;
          }
          at = t.return;
        }
  }
  function pd(e, t, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Nn(e, n), a & 4 && ou(5, n);
        break;
      case 1:
        if (Nn(e, n), a & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (f) {
              Ee(n, n.return, f);
            }
          else {
            var i = Aa(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                i,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (f) {
              Ee(
                n,
                n.return,
                f
              );
            }
          }
        a & 64 && rd(n), a & 512 && ru(n, n.return);
        break;
      case 3:
        if (Nn(e, n), a & 64 && (e = n.updateQueue, e !== null)) {
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
            Is(e, t);
          } catch (f) {
            Ee(n, n.return, f);
          }
        }
        break;
      case 27:
        t === null && a & 4 && hd(n);
      case 26:
      case 5:
        Nn(e, n), t === null && a & 4 && fd(n), a & 512 && ru(n, n.return);
        break;
      case 12:
        Nn(e, n);
        break;
      case 31:
        Nn(e, n), a & 4 && gd(e, n);
        break;
      case 13:
        Nn(e, n), a & 4 && bd(e, n), a & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = xv.bind(
          null,
          n
        ), Gv(e, n))));
        break;
      case 22:
        if (a = n.memoizedState !== null || On, !a) {
          t = t !== null && t.memoizedState !== null || Fe, i = On;
          var c = Fe;
          On = a, (Fe = t) && !c ? jn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : Nn(e, n), On = i, Fe = c;
        }
        break;
      case 30:
        break;
      default:
        Nn(e, n);
    }
  }
  function vd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, vd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && dc(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ze = null, _t = !1;
  function An(e, t, n) {
    for (n = n.child; n !== null; )
      yd(e, t, n), n = n.sibling;
  }
  function yd(e, t, n) {
    if (ht && typeof ht.onCommitFiberUnmount == "function")
      try {
        ht.onCommitFiberUnmount(fa, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Fe || on(n, t), An(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Fe || on(n, t);
        var a = Ze, i = _t;
        In(n.type) && (Ze = n.stateNode, _t = !1), An(
          e,
          t,
          n
        ), gu(n.stateNode), Ze = a, _t = i;
        break;
      case 5:
        Fe || on(n, t);
      case 6:
        if (a = Ze, i = _t, Ze = null, An(
          e,
          t,
          n
        ), Ze = a, _t = i, Ze !== null)
          if (_t)
            try {
              (Ze.nodeType === 9 ? Ze.body : Ze.nodeName === "HTML" ? Ze.ownerDocument.body : Ze).removeChild(n.stateNode);
            } catch (c) {
              Ee(
                n,
                t,
                c
              );
            }
          else
            try {
              Ze.removeChild(n.stateNode);
            } catch (c) {
              Ee(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        Ze !== null && (_t ? (e = Ze, rh(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Sl(e)) : rh(Ze, n.stateNode));
        break;
      case 4:
        a = Ze, i = _t, Ze = n.stateNode.containerInfo, _t = !0, An(
          e,
          t,
          n
        ), Ze = a, _t = i;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Qn(2, n, t), Fe || Qn(4, n, t), An(
          e,
          t,
          n
        );
        break;
      case 1:
        Fe || (on(n, t), a = n.stateNode, typeof a.componentWillUnmount == "function" && sd(
          n,
          t,
          a
        )), An(
          e,
          t,
          n
        );
        break;
      case 21:
        An(
          e,
          t,
          n
        );
        break;
      case 22:
        Fe = (a = Fe) || n.memoizedState !== null, An(
          e,
          t,
          n
        ), Fe = a;
        break;
      default:
        An(
          e,
          t,
          n
        );
    }
  }
  function gd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Sl(e);
      } catch (n) {
        Ee(t, t.return, n);
      }
    }
  }
  function bd(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Sl(e);
      } catch (n) {
        Ee(t, t.return, n);
      }
  }
  function pv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new md()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new md()), t;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function xi(e, t) {
    var n = pv(e);
    t.forEach(function(a) {
      if (!n.has(a)) {
        n.add(a);
        var i = Ev.bind(null, e, a);
        a.then(i, i);
      }
    });
  }
  function St(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var i = n[a], c = e, f = t, d = f;
        e: for (; d !== null; ) {
          switch (d.tag) {
            case 27:
              if (In(d.type)) {
                Ze = d.stateNode, _t = !1;
                break e;
              }
              break;
            case 5:
              Ze = d.stateNode, _t = !1;
              break e;
            case 3:
            case 4:
              Ze = d.stateNode.containerInfo, _t = !0;
              break e;
          }
          d = d.return;
        }
        if (Ze === null) throw Error(r(160));
        yd(c, f, i), Ze = null, _t = !1, c = i.alternate, c !== null && (c.return = null), i.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        _d(t, e), t = t.sibling;
  }
  var Pt = null;
  function _d(e, t) {
    var n = e.alternate, a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        St(t, e), zt(e), a & 4 && (Qn(3, e, e.return), ou(3, e), Qn(5, e, e.return));
        break;
      case 1:
        St(t, e), zt(e), a & 512 && (Fe || n === null || on(n, n.return)), a & 64 && On && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? a : n.concat(a))));
        break;
      case 26:
        var i = Pt;
        if (St(t, e), zt(e), a & 512 && (Fe || n === null || on(n, n.return)), a & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (a = e.memoizedState, n === null)
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  a = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
                  t: switch (a) {
                    case "title":
                      c = i.getElementsByTagName("title")[0], (!c || c[Zl] || c[it] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = i.createElement(a), i.head.insertBefore(
                        c,
                        i.querySelector("head > title")
                      )), st(c, a, n), c[it] = e, nt(c), a = c;
                      break e;
                    case "link":
                      var f = _h(
                        "link",
                        "href",
                        i
                      ).get(a + (n.href || ""));
                      if (f) {
                        for (var d = 0; d < f.length; d++)
                          if (c = f[d], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            f.splice(d, 1);
                            break t;
                          }
                      }
                      c = i.createElement(a), st(c, a, n), i.head.appendChild(c);
                      break;
                    case "meta":
                      if (f = _h(
                        "meta",
                        "content",
                        i
                      ).get(a + (n.content || ""))) {
                        for (d = 0; d < f.length; d++)
                          if (c = f[d], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            f.splice(d, 1);
                            break t;
                          }
                      }
                      c = i.createElement(a), st(c, a, n), i.head.appendChild(c);
                      break;
                    default:
                      throw Error(r(468, a));
                  }
                  c[it] = e, nt(c), a = c;
                }
                e.stateNode = a;
              } else
                Sh(
                  i,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = bh(
                i,
                a,
                e.memoizedProps
              );
          else
            c !== a ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, a === null ? Sh(
              i,
              e.type,
              e.stateNode
            ) : bh(
              i,
              a,
              e.memoizedProps
            )) : a === null && e.stateNode !== null && Ro(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        St(t, e), zt(e), a & 512 && (Fe || n === null || on(n, n.return)), n !== null && a & 4 && Ro(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (St(t, e), zt(e), a & 512 && (Fe || n === null || on(n, n.return)), e.flags & 32) {
          i = e.stateNode;
          try {
            Xa(i, "");
          } catch (G) {
            Ee(e, e.return, G);
          }
        }
        a & 4 && e.stateNode != null && (i = e.memoizedProps, Ro(
          e,
          i,
          n !== null ? n.memoizedProps : i
        )), a & 1024 && (qo = !0);
        break;
      case 6:
        if (St(t, e), zt(e), a & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          a = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = a;
          } catch (G) {
            Ee(e, e.return, G);
          }
        }
        break;
      case 3:
        if (Bi = null, i = Pt, Pt = qi(t.containerInfo), St(t, e), Pt = i, zt(e), a & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Sl(t.containerInfo);
          } catch (G) {
            Ee(e, e.return, G);
          }
        qo && (qo = !1, Sd(e));
        break;
      case 4:
        a = Pt, Pt = qi(
          e.stateNode.containerInfo
        ), St(t, e), zt(e), Pt = a;
        break;
      case 12:
        St(t, e), zt(e);
        break;
      case 31:
        St(t, e), zt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, xi(e, a)));
        break;
      case 13:
        St(t, e), zt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Ti = dt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, xi(e, a)));
        break;
      case 22:
        i = e.memoizedState !== null;
        var g = n !== null && n.memoizedState !== null, E = On, w = Fe;
        if (On = E || i, Fe = w || g, St(t, e), Fe = w, On = E, zt(e), a & 8192)
          e: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || g || On || Fe || Na(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                g = n = t;
                try {
                  if (c = g.stateNode, i)
                    f = c.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                  else {
                    d = g.stateNode;
                    var R = g.memoizedProps.style, T = R != null && R.hasOwnProperty("display") ? R.display : null;
                    d.style.display = T == null || typeof T == "boolean" ? "" : ("" + T).trim();
                  }
                } catch (G) {
                  Ee(g, g.return, G);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                g = t;
                try {
                  g.stateNode.nodeValue = i ? "" : g.memoizedProps;
                } catch (G) {
                  Ee(g, g.return, G);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                g = t;
                try {
                  var O = g.stateNode;
                  i ? sh(O, !0) : sh(g.stateNode, !1);
                } catch (G) {
                  Ee(g, g.return, G);
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
        a & 4 && (a = e.updateQueue, a !== null && (n = a.retryQueue, n !== null && (a.retryQueue = null, xi(e, n))));
        break;
      case 19:
        St(t, e), zt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, xi(e, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        St(t, e), zt(e);
    }
  }
  function zt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, a = e.return; a !== null; ) {
          if (dd(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var i = n.stateNode, c = Uo(e);
            zi(e, c, i);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (Xa(f, ""), n.flags &= -33);
            var d = Uo(e);
            zi(e, d, f);
            break;
          case 3:
          case 4:
            var g = n.stateNode.containerInfo, E = Uo(e);
            Zo(
              e,
              E,
              g
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (w) {
        Ee(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Sd(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Sd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Nn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        pd(e, t.alternate, t), t = t.sibling;
  }
  function Na(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Qn(4, t, t.return), Na(t);
          break;
        case 1:
          on(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && sd(
            t,
            t.return,
            n
          ), Na(t);
          break;
        case 27:
          gu(t.stateNode);
        case 26:
        case 5:
          on(t, t.return), Na(t);
          break;
        case 22:
          t.memoizedState === null && Na(t);
          break;
        case 30:
          Na(t);
          break;
        default:
          Na(t);
      }
      e = e.sibling;
    }
  }
  function jn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, i = e, c = t, f = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          jn(
            i,
            c,
            n
          ), ou(4, c);
          break;
        case 1:
          if (jn(
            i,
            c,
            n
          ), a = c, i = a.stateNode, typeof i.componentDidMount == "function")
            try {
              i.componentDidMount();
            } catch (E) {
              Ee(a, a.return, E);
            }
          if (a = c, i = a.updateQueue, i !== null) {
            var d = a.stateNode;
            try {
              var g = i.shared.hiddenCallbacks;
              if (g !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < g.length; i++)
                  Fs(g[i], d);
            } catch (E) {
              Ee(a, a.return, E);
            }
          }
          n && f & 64 && rd(c), ru(c, c.return);
          break;
        case 27:
          hd(c);
        case 26:
        case 5:
          jn(
            i,
            c,
            n
          ), n && a === null && f & 4 && fd(c), ru(c, c.return);
          break;
        case 12:
          jn(
            i,
            c,
            n
          );
          break;
        case 31:
          jn(
            i,
            c,
            n
          ), n && f & 4 && gd(i, c);
          break;
        case 13:
          jn(
            i,
            c,
            n
          ), n && f & 4 && bd(i, c);
          break;
        case 22:
          c.memoizedState === null && jn(
            i,
            c,
            n
          ), ru(c, c.return);
          break;
        case 30:
          break;
        default:
          jn(
            i,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Ho(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Jl(n));
  }
  function Bo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Jl(e));
  }
  function en(e, t, n, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        zd(
          e,
          t,
          n,
          a
        ), t = t.sibling;
  }
  function zd(e, t, n, a) {
    var i = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        en(
          e,
          t,
          n,
          a
        ), i & 2048 && ou(9, t);
        break;
      case 1:
        en(
          e,
          t,
          n,
          a
        );
        break;
      case 3:
        en(
          e,
          t,
          n,
          a
        ), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Jl(e)));
        break;
      case 12:
        if (i & 2048) {
          en(
            e,
            t,
            n,
            a
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, f = c.id, d = c.onPostCommit;
            typeof d == "function" && d(
              f,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (g) {
            Ee(t, t.return, g);
          }
        } else
          en(
            e,
            t,
            n,
            a
          );
        break;
      case 31:
        en(
          e,
          t,
          n,
          a
        );
        break;
      case 13:
        en(
          e,
          t,
          n,
          a
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, f = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? en(
          e,
          t,
          n,
          a
        ) : su(e, t) : c._visibility & 2 ? en(
          e,
          t,
          n,
          a
        ) : (c._visibility |= 2, sl(
          e,
          t,
          n,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), i & 2048 && Ho(f, t);
        break;
      case 24:
        en(
          e,
          t,
          n,
          a
        ), i & 2048 && Bo(t.alternate, t);
        break;
      default:
        en(
          e,
          t,
          n,
          a
        );
    }
  }
  function sl(e, t, n, a, i) {
    for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, f = t, d = n, g = a, E = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          sl(
            c,
            f,
            d,
            g,
            i
          ), ou(8, f);
          break;
        case 23:
          break;
        case 22:
          var w = f.stateNode;
          f.memoizedState !== null ? w._visibility & 2 ? sl(
            c,
            f,
            d,
            g,
            i
          ) : su(
            c,
            f
          ) : (w._visibility |= 2, sl(
            c,
            f,
            d,
            g,
            i
          )), i && E & 2048 && Ho(
            f.alternate,
            f
          );
          break;
        case 24:
          sl(
            c,
            f,
            d,
            g,
            i
          ), i && E & 2048 && Bo(f.alternate, f);
          break;
        default:
          sl(
            c,
            f,
            d,
            g,
            i
          );
      }
      t = t.sibling;
    }
  }
  function su(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, a = t, i = a.flags;
        switch (a.tag) {
          case 22:
            su(n, a), i & 2048 && Ho(
              a.alternate,
              a
            );
            break;
          case 24:
            su(n, a), i & 2048 && Bo(a.alternate, a);
            break;
          default:
            su(n, a);
        }
        t = t.sibling;
      }
  }
  var fu = 8192;
  function fl(e, t, n) {
    if (e.subtreeFlags & fu)
      for (e = e.child; e !== null; )
        xd(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function xd(e, t, n) {
    switch (e.tag) {
      case 26:
        fl(
          e,
          t,
          n
        ), e.flags & fu && e.memoizedState !== null && ty(
          n,
          Pt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        fl(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var a = Pt;
        Pt = qi(e.stateNode.containerInfo), fl(
          e,
          t,
          n
        ), Pt = a;
        break;
      case 22:
        e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = fu, fu = 16777216, fl(
          e,
          t,
          n
        ), fu = a) : fl(
          e,
          t,
          n
        ));
        break;
      default:
        fl(
          e,
          t,
          n
        );
    }
  }
  function Ed(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function du(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          at = a, Od(
            a,
            e
          );
        }
      Ed(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Td(e), e = e.sibling;
  }
  function Td(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        du(e), e.flags & 2048 && Qn(9, e, e.return);
        break;
      case 3:
        du(e);
        break;
      case 12:
        du(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ei(e)) : du(e);
        break;
      default:
        du(e);
    }
  }
  function Ei(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var a = t[n];
          at = a, Od(
            a,
            e
          );
        }
      Ed(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Qn(8, t, t.return), Ei(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ei(t));
          break;
        default:
          Ei(t);
      }
      e = e.sibling;
    }
  }
  function Od(e, t) {
    for (; at !== null; ) {
      var n = at;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Qn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Jl(n.memoizedState.cache);
      }
      if (a = n.child, a !== null) a.return = n, at = a;
      else
        e: for (n = e; at !== null; ) {
          a = at;
          var i = a.sibling, c = a.return;
          if (vd(a), a === n) {
            at = null;
            break e;
          }
          if (i !== null) {
            i.return = c, at = i;
            break e;
          }
          at = c;
        }
    }
  }
  var vv = {
    getCacheForType: function(e) {
      var t = ot(Ke), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return ot(Ke).controller.signal;
    }
  }, yv = typeof WeakMap == "function" ? WeakMap : Map, ze = 0, Me = null, fe = null, me = 0, xe = 0, Dt = null, Vn = !1, dl = !1, ko = !1, wn = 0, Le = 0, $n = 0, ja = 0, Yo = 0, Rt = 0, hl = 0, hu = null, xt = null, Lo = !1, Ti = 0, Ad = 0, Oi = 1 / 0, Ai = null, Kn = null, tt = 0, Jn = null, ml = null, Mn = 0, Go = 0, Xo = null, Nd = null, mu = 0, Qo = null;
  function Ut() {
    return (ze & 2) !== 0 && me !== 0 ? me & -me : j.T !== null ? Fo() : qu();
  }
  function jd() {
    if (Rt === 0)
      if ((me & 536870912) === 0 || ye) {
        var e = Ua;
        Ua <<= 1, (Ua & 3932160) === 0 && (Ua = 262144), Rt = e;
      } else Rt = 536870912;
    return e = Mt.current, e !== null && (e.flags |= 32), Rt;
  }
  function Et(e, t, n) {
    (e === Me && (xe === 2 || xe === 9) || e.cancelPendingCommit !== null) && (pl(e, 0), Wn(
      e,
      me,
      Rt,
      !1
    )), J(e, n), ((ze & 2) === 0 || e !== Me) && (e === Me && ((ze & 2) === 0 && (ja |= n), Le === 4 && Wn(
      e,
      me,
      Rt,
      !1
    )), rn(e));
  }
  function wd(e, t, n) {
    if ((ze & 6) !== 0) throw Error(r(327));
    var a = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Rn(e, t), i = a ? _v(e, t) : $o(e, t, !0), c = a;
    do {
      if (i === 0) {
        dl && !a && Wn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !gv(n)) {
          i = $o(e, t, !1), c = !1;
          continue;
        }
        if (i === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var f = 0;
          else
            f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
          if (f !== 0) {
            t = f;
            e: {
              var d = e;
              i = hu;
              var g = d.current.memoizedState.isDehydrated;
              if (g && (pl(d, f).flags |= 256), f = $o(
                d,
                f,
                !1
              ), f !== 2) {
                if (ko && !g) {
                  d.errorRecoveryDisabledLanes |= c, ja |= c, i = 4;
                  break e;
                }
                c = xt, xt = i, c !== null && (xt === null ? xt = c : xt.push.apply(
                  xt,
                  c
                ));
              }
              i = f;
            }
            if (c = !1, i !== 2) continue;
          }
        }
        if (i === 1) {
          pl(e, 0), Wn(e, t, 0, !0);
          break;
        }
        e: {
          switch (a = e, c = i, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Wn(
                a,
                t,
                Rt,
                !Vn
              );
              break e;
            case 2:
              xt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && (i = Ti + 300 - dt(), 10 < i)) {
            if (Wn(
              a,
              t,
              Rt,
              !Vn
            ), da(a, 0, !0) !== 0) break e;
            Mn = t, a.timeoutHandle = ch(
              Md.bind(
                null,
                a,
                n,
                xt,
                Ai,
                Lo,
                t,
                Rt,
                ja,
                hl,
                Vn,
                c,
                "Throttled",
                -0,
                0
              ),
              i
            );
            break e;
          }
          Md(
            a,
            n,
            xt,
            Ai,
            Lo,
            t,
            Rt,
            ja,
            hl,
            Vn,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    rn(e);
  }
  function Md(e, t, n, a, i, c, f, d, g, E, w, R, T, O) {
    if (e.timeoutHandle = -1, R = t.subtreeFlags, R & 8192 || (R & 16785408) === 16785408) {
      R = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: vn
      }, xd(
        t,
        c,
        R
      );
      var G = (c & 62914560) === c ? Ti - dt() : (c & 4194048) === c ? Ad - dt() : 0;
      if (G = ny(
        R,
        G
      ), G !== null) {
        Mn = c, e.cancelPendingCommit = G(
          Bd.bind(
            null,
            e,
            t,
            c,
            n,
            a,
            i,
            f,
            d,
            g,
            w,
            R,
            null,
            T,
            O
          )
        ), Wn(e, c, f, !E);
        return;
      }
    }
    Bd(
      e,
      t,
      c,
      n,
      a,
      i,
      f,
      d,
      g
    );
  }
  function gv(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var a = 0; a < n.length; a++) {
          var i = n[a], c = i.getSnapshot;
          i = i.value;
          try {
            if (!jt(c(), i)) return !1;
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
  function Wn(e, t, n, a) {
    t &= ~Yo, t &= ~ja, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
    for (var i = t; 0 < i; ) {
      var c = 31 - lt(i), f = 1 << c;
      a[c] = -1, i &= ~f;
    }
    n !== 0 && te(e, n, t);
  }
  function Ni() {
    return (ze & 6) === 0 ? (pu(0), !1) : !0;
  }
  function Vo() {
    if (fe !== null) {
      if (xe === 0)
        var e = fe.return;
      else
        e = fe, _n = _a = null, co(e), ul = null, Fl = 0, e = fe;
      for (; e !== null; )
        od(e.alternate, e), e = e.return;
      fe = null;
    }
  }
  function pl(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Hv(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Mn = 0, Vo(), Me = e, fe = n = gn(e.current, null), me = t, xe = 0, Dt = null, Vn = !1, dl = Rn(e, t), ko = !1, hl = Rt = Yo = ja = $n = Le = 0, xt = hu = null, Lo = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var i = 31 - lt(a), c = 1 << i;
        t |= e[i], a &= ~c;
      }
    return wn = t, Ju(), n;
  }
  function Cd(e, t) {
    ue = null, j.H = uu, t === ll || t === ai ? (t = $s(), xe = 3) : t === Jc ? (t = $s(), xe = 4) : xe = t === Eo ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Dt = t, fe === null && (Le = 1, yi(
      e,
      Xt(t, e.current)
    ));
  }
  function Dd() {
    var e = Mt.current;
    return e === null ? !0 : (me & 4194048) === me ? Kt === null : (me & 62914560) === me || (me & 536870912) !== 0 ? e === Kt : !1;
  }
  function Rd() {
    var e = j.H;
    return j.H = uu, e === null ? uu : e;
  }
  function Ud() {
    var e = j.A;
    return j.A = vv, e;
  }
  function ji() {
    Le = 4, Vn || (me & 4194048) !== me && Mt.current !== null || (dl = !0), ($n & 134217727) === 0 && (ja & 134217727) === 0 || Me === null || Wn(
      Me,
      me,
      Rt,
      !1
    );
  }
  function $o(e, t, n) {
    var a = ze;
    ze |= 2;
    var i = Rd(), c = Ud();
    (Me !== e || me !== t) && (Ai = null, pl(e, t)), t = !1;
    var f = Le;
    e: do
      try {
        if (xe !== 0 && fe !== null) {
          var d = fe, g = Dt;
          switch (xe) {
            case 8:
              Vo(), f = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Mt.current === null && (t = !0);
              var E = xe;
              if (xe = 0, Dt = null, vl(e, d, g, E), n && dl) {
                f = 0;
                break e;
              }
              break;
            default:
              E = xe, xe = 0, Dt = null, vl(e, d, g, E);
          }
        }
        bv(), f = Le;
        break;
      } catch (w) {
        Cd(e, w);
      }
    while (!0);
    return t && e.shellSuspendCounter++, _n = _a = null, ze = a, j.H = i, j.A = c, fe === null && (Me = null, me = 0, Ju()), f;
  }
  function bv() {
    for (; fe !== null; ) Zd(fe);
  }
  function _v(e, t) {
    var n = ze;
    ze |= 2;
    var a = Rd(), i = Ud();
    Me !== e || me !== t ? (Ai = null, Oi = dt() + 500, pl(e, t)) : dl = Rn(
      e,
      t
    );
    e: do
      try {
        if (xe !== 0 && fe !== null) {
          t = fe;
          var c = Dt;
          t: switch (xe) {
            case 1:
              xe = 0, Dt = null, vl(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (Qs(c)) {
                xe = 0, Dt = null, qd(t);
                break;
              }
              t = function() {
                xe !== 2 && xe !== 9 || Me !== e || (xe = 7), rn(e);
              }, c.then(t, t);
              break e;
            case 3:
              xe = 7;
              break e;
            case 4:
              xe = 5;
              break e;
            case 7:
              Qs(c) ? (xe = 0, Dt = null, qd(t)) : (xe = 0, Dt = null, vl(e, t, c, 7));
              break;
            case 5:
              var f = null;
              switch (fe.tag) {
                case 26:
                  f = fe.memoizedState;
                case 5:
                case 27:
                  var d = fe;
                  if (f ? zh(f) : d.stateNode.complete) {
                    xe = 0, Dt = null;
                    var g = d.sibling;
                    if (g !== null) fe = g;
                    else {
                      var E = d.return;
                      E !== null ? (fe = E, wi(E)) : fe = null;
                    }
                    break t;
                  }
              }
              xe = 0, Dt = null, vl(e, t, c, 5);
              break;
            case 6:
              xe = 0, Dt = null, vl(e, t, c, 6);
              break;
            case 8:
              Vo(), Le = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        Sv();
        break;
      } catch (w) {
        Cd(e, w);
      }
    while (!0);
    return _n = _a = null, j.H = a, j.A = i, ze = n, fe !== null ? 0 : (Me = null, me = 0, Ju(), Le);
  }
  function Sv() {
    for (; fe !== null && !Nt(); )
      Zd(fe);
  }
  function Zd(e) {
    var t = id(e.alternate, e, wn);
    e.memoizedProps = e.pendingProps, t === null ? wi(e) : fe = t;
  }
  function qd(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = ed(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          me
        );
        break;
      case 11:
        t = ed(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          me
        );
        break;
      case 5:
        co(t);
      default:
        od(n, t), t = fe = Rs(t, wn), t = id(n, t, wn);
    }
    e.memoizedProps = e.pendingProps, t === null ? wi(e) : fe = t;
  }
  function vl(e, t, n, a) {
    _n = _a = null, co(t), ul = null, Fl = 0;
    var i = t.return;
    try {
      if (rv(
        e,
        i,
        t,
        n,
        me
      )) {
        Le = 1, yi(
          e,
          Xt(n, e.current)
        ), fe = null;
        return;
      }
    } catch (c) {
      if (i !== null) throw fe = i, c;
      Le = 1, yi(
        e,
        Xt(n, e.current)
      ), fe = null;
      return;
    }
    t.flags & 32768 ? (ye || a === 1 ? e = !0 : dl || (me & 536870912) !== 0 ? e = !1 : (Vn = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = Mt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Hd(t, e)) : wi(t);
  }
  function wi(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Hd(
          t,
          Vn
        );
        return;
      }
      e = t.return;
      var n = dv(
        t.alternate,
        t,
        wn
      );
      if (n !== null) {
        fe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        fe = t;
        return;
      }
      fe = t = e;
    } while (t !== null);
    Le === 0 && (Le = 5);
  }
  function Hd(e, t) {
    do {
      var n = hv(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, fe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        fe = e;
        return;
      }
      fe = e = n;
    } while (e !== null);
    Le = 6, fe = null;
  }
  function Bd(e, t, n, a, i, c, f, d, g) {
    e.cancelPendingCommit = null;
    do
      Mi();
    while (tt !== 0);
    if ((ze & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      if (c = t.lanes | t.childLanes, c |= Rc, Y(
        e,
        n,
        c,
        f,
        d,
        g
      ), e === Me && (fe = Me = null, me = 0), ml = t, Jn = e, Mn = n, Go = c, Xo = i, Nd = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Tv(sa, function() {
        return Xd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = j.T, j.T = null, i = k.p, k.p = 2, f = ze, ze |= 4;
        try {
          mv(e, t, n);
        } finally {
          ze = f, k.p = i, j.T = a;
        }
      }
      tt = 1, kd(), Yd(), Ld();
    }
  }
  function kd() {
    if (tt === 1) {
      tt = 0;
      var e = Jn, t = ml, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = j.T, j.T = null;
        var a = k.p;
        k.p = 2;
        var i = ze;
        ze |= 4;
        try {
          _d(t, e);
          var c = ur, f = Ts(e.containerInfo), d = c.focusedElem, g = c.selectionRange;
          if (f !== d && d && d.ownerDocument && Es(
            d.ownerDocument.documentElement,
            d
          )) {
            if (g !== null && jc(d)) {
              var E = g.start, w = g.end;
              if (w === void 0 && (w = E), "selectionStart" in d)
                d.selectionStart = E, d.selectionEnd = Math.min(
                  w,
                  d.value.length
                );
              else {
                var R = d.ownerDocument || document, T = R && R.defaultView || window;
                if (T.getSelection) {
                  var O = T.getSelection(), G = d.textContent.length, F = Math.min(g.start, G), we = g.end === void 0 ? F : Math.min(g.end, G);
                  !O.extend && F > we && (f = we, we = F, F = f);
                  var z = xs(
                    d,
                    F
                  ), S = xs(
                    d,
                    we
                  );
                  if (z && S && (O.rangeCount !== 1 || O.anchorNode !== z.node || O.anchorOffset !== z.offset || O.focusNode !== S.node || O.focusOffset !== S.offset)) {
                    var x = R.createRange();
                    x.setStart(z.node, z.offset), O.removeAllRanges(), F > we ? (O.addRange(x), O.extend(S.node, S.offset)) : (x.setEnd(S.node, S.offset), O.addRange(x));
                  }
                }
              }
            }
            for (R = [], O = d; O = O.parentNode; )
              O.nodeType === 1 && R.push({
                element: O,
                left: O.scrollLeft,
                top: O.scrollTop
              });
            for (typeof d.focus == "function" && d.focus(), d = 0; d < R.length; d++) {
              var M = R[d];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          Gi = !!lr, ur = lr = null;
        } finally {
          ze = i, k.p = a, j.T = n;
        }
      }
      e.current = t, tt = 2;
    }
  }
  function Yd() {
    if (tt === 2) {
      tt = 0;
      var e = Jn, t = ml, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = j.T, j.T = null;
        var a = k.p;
        k.p = 2;
        var i = ze;
        ze |= 4;
        try {
          pd(e, t.alternate, t);
        } finally {
          ze = i, k.p = a, j.T = n;
        }
      }
      tt = 3;
    }
  }
  function Ld() {
    if (tt === 4 || tt === 3) {
      tt = 0, wu();
      var e = Jn, t = ml, n = Mn, a = Nd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? tt = 5 : (tt = 0, ml = Jn = null, Gd(e, e.pendingLanes));
      var i = e.pendingLanes;
      if (i === 0 && (Kn = null), mn(n), t = t.stateNode, ht && typeof ht.onCommitFiberRoot == "function")
        try {
          ht.onCommitFiberRoot(
            fa,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = j.T, i = k.p, k.p = 2, j.T = null;
        try {
          for (var c = e.onRecoverableError, f = 0; f < a.length; f++) {
            var d = a[f];
            c(d.value, {
              componentStack: d.stack
            });
          }
        } finally {
          j.T = t, k.p = i;
        }
      }
      (Mn & 3) !== 0 && Mi(), rn(e), i = e.pendingLanes, (n & 261930) !== 0 && (i & 42) !== 0 ? e === Qo ? mu++ : (mu = 0, Qo = e) : mu = 0, pu(0);
    }
  }
  function Gd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Jl(t)));
  }
  function Mi() {
    return kd(), Yd(), Ld(), Xd();
  }
  function Xd() {
    if (tt !== 5) return !1;
    var e = Jn, t = Go;
    Go = 0;
    var n = mn(Mn), a = j.T, i = k.p;
    try {
      k.p = 32 > n ? 32 : n, j.T = null, n = Xo, Xo = null;
      var c = Jn, f = Mn;
      if (tt = 0, ml = Jn = null, Mn = 0, (ze & 6) !== 0) throw Error(r(331));
      var d = ze;
      if (ze |= 4, Td(c.current), zd(
        c,
        c.current,
        f,
        n
      ), ze = d, pu(0, !1), ht && typeof ht.onPostCommitFiberRoot == "function")
        try {
          ht.onPostCommitFiberRoot(fa, c);
        } catch {
        }
      return !0;
    } finally {
      k.p = i, j.T = a, Gd(e, t);
    }
  }
  function Qd(e, t, n) {
    t = Xt(n, t), t = xo(e.stateNode, t, 2), e = Ln(e, t, 2), e !== null && (J(e, 2), rn(e));
  }
  function Ee(e, t, n) {
    if (e.tag === 3)
      Qd(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Qd(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Kn === null || !Kn.has(a))) {
            e = Xt(n, e), n = Vf(2), a = Ln(t, n, 2), a !== null && ($f(
              n,
              a,
              t,
              e
            ), J(a, 2), rn(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ko(e, t, n) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new yv();
      var i = /* @__PURE__ */ new Set();
      a.set(t, i);
    } else
      i = a.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), a.set(t, i));
    i.has(n) || (ko = !0, i.add(n), e = zv.bind(null, e, t, n), t.then(e, e));
  }
  function zv(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Me === e && (me & n) === n && (Le === 4 || Le === 3 && (me & 62914560) === me && 300 > dt() - Ti ? (ze & 2) === 0 && pl(e, 0) : Yo |= n, hl === me && (hl = 0)), rn(e);
  }
  function Vd(e, t) {
    t === 0 && (t = Ul()), e = ya(e, t), e !== null && (J(e, t), rn(e));
  }
  function xv(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Vd(e, n);
  }
  function Ev(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var a = e.stateNode, i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    a !== null && a.delete(t), Vd(e, n);
  }
  function Tv(e, t) {
    return dn(e, t);
  }
  var Ci = null, yl = null, Jo = !1, Di = !1, Wo = !1, Fn = 0;
  function rn(e) {
    e !== yl && e.next === null && (yl === null ? Ci = yl = e : yl = yl.next = e), Di = !0, Jo || (Jo = !0, Av());
  }
  function pu(e, t) {
    if (!Wo && Di) {
      Wo = !0;
      do
        for (var n = !1, a = Ci; a !== null; ) {
          if (e !== 0) {
            var i = a.pendingLanes;
            if (i === 0) var c = 0;
            else {
              var f = a.suspendedLanes, d = a.pingedLanes;
              c = (1 << 31 - lt(42 | e) + 1) - 1, c &= i & ~(f & ~d), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Wd(a, c));
          } else
            c = me, c = da(
              a,
              a === Me ? c : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (c & 3) === 0 || Rn(a, c) || (n = !0, Wd(a, c));
          a = a.next;
        }
      while (n);
      Wo = !1;
    }
  }
  function Ov() {
    $d();
  }
  function $d() {
    Di = Jo = !1;
    var e = 0;
    Fn !== 0 && qv() && (e = Fn);
    for (var t = dt(), n = null, a = Ci; a !== null; ) {
      var i = a.next, c = Kd(a, t);
      c === 0 ? (a.next = null, n === null ? Ci = i : n.next = i, i === null && (yl = n)) : (n = a, (e !== 0 || (c & 3) !== 0) && (Di = !0)), a = i;
    }
    tt !== 0 && tt !== 5 || pu(e), Fn !== 0 && (Fn = 0);
  }
  function Kd(e, t) {
    for (var n = e.suspendedLanes, a = e.pingedLanes, i = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var f = 31 - lt(c), d = 1 << f, g = i[f];
      g === -1 ? ((d & n) === 0 || (d & a) !== 0) && (i[f] = Zu(d, t)) : g <= t && (e.expiredLanes |= d), c &= ~d;
    }
    if (t = Me, n = me, n = da(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a = e.callbackNode, n === 0 || e === t && (xe === 2 || xe === 9) || e.cancelPendingCommit !== null)
      return a !== null && a !== null && ra(a), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Rn(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (a !== null && ra(a), mn(n)) {
        case 2:
        case 8:
          n = Rl;
          break;
        case 32:
          n = sa;
          break;
        case 268435456:
          n = Cu;
          break;
        default:
          n = sa;
      }
      return a = Jd.bind(null, e), n = dn(n, a), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return a !== null && a !== null && ra(a), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Jd(e, t) {
    if (tt !== 0 && tt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Mi() && e.callbackNode !== n)
      return null;
    var a = me;
    return a = da(
      e,
      e === Me ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), a === 0 ? null : (wd(e, a, t), Kd(e, dt()), e.callbackNode != null && e.callbackNode === n ? Jd.bind(null, e) : null);
  }
  function Wd(e, t) {
    if (Mi()) return null;
    wd(e, t, !0);
  }
  function Av() {
    Bv(function() {
      (ze & 6) !== 0 ? dn(
        Dl,
        Ov
      ) : $d();
    });
  }
  function Fo() {
    if (Fn === 0) {
      var e = nl;
      e === 0 && (e = Ra, Ra <<= 1, (Ra & 261888) === 0 && (Ra = 256)), Fn = e;
    }
    return Fn;
  }
  function Fd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yu("" + e);
  }
  function Id(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Nv(e, t, n, a, i) {
    if (t === "submit" && n && n.stateNode === i) {
      var c = Fd(
        (i[gt] || null).action
      ), f = a.submitter;
      f && (t = (t = f[gt] || null) ? Fd(t.formAction) : f.getAttribute("formAction"), t !== null && (c = t, f = null));
      var d = new Qu(
        "action",
        "action",
        null,
        a,
        i
      );
      e.push({
        event: d,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (Fn !== 0) {
                  var g = f ? Id(i, f) : new FormData(i);
                  yo(
                    n,
                    {
                      pending: !0,
                      data: g,
                      method: i.method,
                      action: c
                    },
                    null,
                    g
                  );
                }
              } else
                typeof c == "function" && (d.preventDefault(), g = f ? Id(i, f) : new FormData(i), yo(
                  n,
                  {
                    pending: !0,
                    data: g,
                    method: i.method,
                    action: c
                  },
                  c,
                  g
                ));
            },
            currentTarget: i
          }
        ]
      });
    }
  }
  for (var Io = 0; Io < Dc.length; Io++) {
    var Po = Dc[Io], jv = Po.toLowerCase(), wv = Po[0].toUpperCase() + Po.slice(1);
    It(
      jv,
      "on" + wv
    );
  }
  It(Ns, "onAnimationEnd"), It(js, "onAnimationIteration"), It(ws, "onAnimationStart"), It("dblclick", "onDoubleClick"), It("focusin", "onFocus"), It("focusout", "onBlur"), It(Vp, "onTransitionRun"), It($p, "onTransitionStart"), It(Kp, "onTransitionCancel"), It(Ms, "onTransitionEnd"), La("onMouseEnter", ["mouseout", "mouseover"]), La("onMouseLeave", ["mouseout", "mouseover"]), La("onPointerEnter", ["pointerout", "pointerover"]), La("onPointerLeave", ["pointerout", "pointerover"]), ha(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ha(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ha("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ha(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ha(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ha(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var vu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Mv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vu)
  );
  function Pd(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var a = e[n], i = a.event;
      a = a.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var f = a.length - 1; 0 <= f; f--) {
            var d = a[f], g = d.instance, E = d.currentTarget;
            if (d = d.listener, g !== c && i.isPropagationStopped())
              break e;
            c = d, i.currentTarget = E;
            try {
              c(i);
            } catch (w) {
              Ku(w);
            }
            i.currentTarget = null, c = g;
          }
        else
          for (f = 0; f < a.length; f++) {
            if (d = a[f], g = d.instance, E = d.currentTarget, d = d.listener, g !== c && i.isPropagationStopped())
              break e;
            c = d, i.currentTarget = E;
            try {
              c(i);
            } catch (w) {
              Ku(w);
            }
            i.currentTarget = null, c = g;
          }
      }
    }
  }
  function de(e, t) {
    var n = t[fc];
    n === void 0 && (n = t[fc] = /* @__PURE__ */ new Set());
    var a = e + "__bubble";
    n.has(a) || (eh(t, e, 2, !1), n.add(a));
  }
  function er(e, t, n) {
    var a = 0;
    t && (a |= 4), eh(
      n,
      e,
      a,
      t
    );
  }
  var Ri = "_reactListening" + Math.random().toString(36).slice(2);
  function tr(e) {
    if (!e[Ri]) {
      e[Ri] = !0, Vr.forEach(function(n) {
        n !== "selectionchange" && (Mv.has(n) || er(n, !1, e), er(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ri] || (t[Ri] = !0, er("selectionchange", !1, t));
    }
  }
  function eh(e, t, n, a) {
    switch (jh(t)) {
      case 2:
        var i = uy;
        break;
      case 8:
        i = iy;
        break;
      default:
        i = vr;
    }
    n = i.bind(
      null,
      t,
      n,
      e
    ), i = void 0, !_c || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), a ? i !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
      passive: i
    }) : e.addEventListener(t, n, !1);
  }
  function nr(e, t, n, a, i) {
    var c = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (; ; ) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var d = a.stateNode.containerInfo;
          if (d === i) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var g = f.tag;
              if ((g === 3 || g === 4) && f.stateNode.containerInfo === i)
                return;
              f = f.return;
            }
          for (; d !== null; ) {
            if (f = Ba(d), f === null) return;
            if (g = f.tag, g === 5 || g === 6 || g === 26 || g === 27) {
              a = c = f;
              continue e;
            }
            d = d.parentNode;
          }
        }
        a = a.return;
      }
    ls(function() {
      var E = c, w = gc(n), R = [];
      e: {
        var T = Cs.get(e);
        if (T !== void 0) {
          var O = Qu, G = e;
          switch (e) {
            case "keypress":
              if (Gu(n) === 0) break e;
            case "keydown":
            case "keyup":
              O = Ep;
              break;
            case "focusin":
              G = "focus", O = Ec;
              break;
            case "focusout":
              G = "blur", O = Ec;
              break;
            case "beforeblur":
            case "afterblur":
              O = Ec;
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
              O = cs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              O = dp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              O = Ap;
              break;
            case Ns:
            case js:
            case ws:
              O = pp;
              break;
            case Ms:
              O = jp;
              break;
            case "scroll":
            case "scrollend":
              O = sp;
              break;
            case "wheel":
              O = Mp;
              break;
            case "copy":
            case "cut":
            case "paste":
              O = yp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              O = rs;
              break;
            case "toggle":
            case "beforetoggle":
              O = Dp;
          }
          var F = (t & 4) !== 0, we = !F && (e === "scroll" || e === "scrollend"), z = F ? T !== null ? T + "Capture" : null : T;
          F = [];
          for (var S = E, x; S !== null; ) {
            var M = S;
            if (x = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || x === null || z === null || (M = Hl(S, z), M != null && F.push(
              yu(S, M, x)
            )), we) break;
            S = S.return;
          }
          0 < F.length && (T = new O(
            T,
            G,
            null,
            n,
            w
          ), R.push({ event: T, listeners: F }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (T = e === "mouseover" || e === "pointerover", O = e === "mouseout" || e === "pointerout", T && n !== yc && (G = n.relatedTarget || n.fromElement) && (Ba(G) || G[Ha]))
            break e;
          if ((O || T) && (T = w.window === w ? w : (T = w.ownerDocument) ? T.defaultView || T.parentWindow : window, O ? (G = n.relatedTarget || n.toElement, O = E, G = G ? Ba(G) : null, G !== null && (we = m(G), F = G.tag, G !== we || F !== 5 && F !== 27 && F !== 6) && (G = null)) : (O = null, G = E), O !== G)) {
            if (F = cs, M = "onMouseLeave", z = "onMouseEnter", S = "mouse", (e === "pointerout" || e === "pointerover") && (F = rs, M = "onPointerLeave", z = "onPointerEnter", S = "pointer"), we = O == null ? T : ql(O), x = G == null ? T : ql(G), T = new F(
              M,
              S + "leave",
              O,
              n,
              w
            ), T.target = we, T.relatedTarget = x, M = null, Ba(w) === E && (F = new F(
              z,
              S + "enter",
              G,
              n,
              w
            ), F.target = x, F.relatedTarget = we, M = F), we = M, O && G)
              t: {
                for (F = Cv, z = O, S = G, x = 0, M = z; M; M = F(M))
                  x++;
                M = 0;
                for (var $ = S; $; $ = F($))
                  M++;
                for (; 0 < x - M; )
                  z = F(z), x--;
                for (; 0 < M - x; )
                  S = F(S), M--;
                for (; x--; ) {
                  if (z === S || S !== null && z === S.alternate) {
                    F = z;
                    break t;
                  }
                  z = F(z), S = F(S);
                }
                F = null;
              }
            else F = null;
            O !== null && th(
              R,
              T,
              O,
              F,
              !1
            ), G !== null && we !== null && th(
              R,
              we,
              G,
              F,
              !0
            );
          }
        }
        e: {
          if (T = E ? ql(E) : window, O = T.nodeName && T.nodeName.toLowerCase(), O === "select" || O === "input" && T.type === "file")
            var _e = ys;
          else if (ps(T))
            if (gs)
              _e = Gp;
            else {
              _e = Yp;
              var X = kp;
            }
          else
            O = T.nodeName, !O || O.toLowerCase() !== "input" || T.type !== "checkbox" && T.type !== "radio" ? E && vc(E.elementType) && (_e = ys) : _e = Lp;
          if (_e && (_e = _e(e, E))) {
            vs(
              R,
              _e,
              n,
              w
            );
            break e;
          }
          X && X(e, T, E), e === "focusout" && E && T.type === "number" && E.memoizedProps.value != null && pc(T, "number", T.value);
        }
        switch (X = E ? ql(E) : window, e) {
          case "focusin":
            (ps(X) || X.contentEditable === "true") && (Ka = X, wc = E, Vl = null);
            break;
          case "focusout":
            Vl = wc = Ka = null;
            break;
          case "mousedown":
            Mc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mc = !1, Os(R, n, w);
            break;
          case "selectionchange":
            if (Qp) break;
          case "keydown":
          case "keyup":
            Os(R, n, w);
        }
        var ie;
        if (Oc)
          e: {
            switch (e) {
              case "compositionstart":
                var pe = "onCompositionStart";
                break e;
              case "compositionend":
                pe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                pe = "onCompositionUpdate";
                break e;
            }
            pe = void 0;
          }
        else
          $a ? hs(e, n) && (pe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (pe = "onCompositionStart");
        pe && (ss && n.locale !== "ko" && ($a || pe !== "onCompositionStart" ? pe === "onCompositionEnd" && $a && (ie = us()) : (Un = w, Sc = "value" in Un ? Un.value : Un.textContent, $a = !0)), X = Ui(E, pe), 0 < X.length && (pe = new os(
          pe,
          e,
          null,
          n,
          w
        ), R.push({ event: pe, listeners: X }), ie ? pe.data = ie : (ie = ms(n), ie !== null && (pe.data = ie)))), (ie = Up ? Zp(e, n) : qp(e, n)) && (pe = Ui(E, "onBeforeInput"), 0 < pe.length && (X = new os(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          w
        ), R.push({
          event: X,
          listeners: pe
        }), X.data = ie)), Nv(
          R,
          e,
          E,
          n,
          w
        );
      }
      Pd(R, t);
    });
  }
  function yu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Ui(e, t) {
    for (var n = t + "Capture", a = []; e !== null; ) {
      var i = e, c = i.stateNode;
      if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || c === null || (i = Hl(e, n), i != null && a.unshift(
        yu(e, i, c)
      ), i = Hl(e, t), i != null && a.push(
        yu(e, i, c)
      )), e.tag === 3) return a;
      e = e.return;
    }
    return [];
  }
  function Cv(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function th(e, t, n, a, i) {
    for (var c = t._reactName, f = []; n !== null && n !== a; ) {
      var d = n, g = d.alternate, E = d.stateNode;
      if (d = d.tag, g !== null && g === a) break;
      d !== 5 && d !== 26 && d !== 27 || E === null || (g = E, i ? (E = Hl(n, c), E != null && f.unshift(
        yu(n, E, g)
      )) : i || (E = Hl(n, c), E != null && f.push(
        yu(n, E, g)
      ))), n = n.return;
    }
    f.length !== 0 && e.push({ event: t, listeners: f });
  }
  var Dv = /\r\n?/g, Rv = /\u0000|\uFFFD/g;
  function nh(e) {
    return (typeof e == "string" ? e : "" + e).replace(Dv, `
`).replace(Rv, "");
  }
  function ah(e, t) {
    return t = nh(t), nh(e) === t;
  }
  function je(e, t, n, a, i, c) {
    switch (n) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || Xa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Xa(e, "" + a);
        break;
      case "className":
        Bu(e, "class", a);
        break;
      case "tabIndex":
        Bu(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Bu(e, n, a);
        break;
      case "style":
        ns(e, a, c);
        break;
      case "data":
        if (t !== "object") {
          Bu(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Yu("" + a), e.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (n === "formAction" ? (t !== "input" && je(e, t, "name", i.name, i, null), je(
            e,
            t,
            "formEncType",
            i.formEncType,
            i,
            null
          ), je(
            e,
            t,
            "formMethod",
            i.formMethod,
            i,
            null
          ), je(
            e,
            t,
            "formTarget",
            i.formTarget,
            i,
            null
          )) : (je(e, t, "encType", i.encType, i, null), je(e, t, "method", i.method, i, null), je(e, t, "target", i.target, i, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(n);
          break;
        }
        a = Yu("" + a), e.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (e.onclick = vn);
        break;
      case "onScroll":
        a != null && de("scroll", e);
        break;
      case "onScrollEnd":
        a != null && de("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (i.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Yu("" + a), e.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "" + a) : e.removeAttribute(n);
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
        a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0 ? e.setAttribute(n, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(n, a) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(n) : e.setAttribute(n, a);
        break;
      case "popover":
        de("beforetoggle", e), de("toggle", e), Hu(e, "popover", a);
        break;
      case "xlinkActuate":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        pn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        pn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        pn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        pn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Hu(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = op.get(n) || n, Hu(e, n, a));
    }
  }
  function ar(e, t, n, a, i, c) {
    switch (n) {
      case "style":
        ns(e, a, c);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(r(61));
          if (n = a.__html, n != null) {
            if (i.children != null) throw Error(r(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string" ? Xa(e, a) : (typeof a == "number" || typeof a == "bigint") && Xa(e, "" + a);
        break;
      case "onScroll":
        a != null && de("scroll", e);
        break;
      case "onScrollEnd":
        a != null && de("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = vn);
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
        if (!$r.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), c = e[gt] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, i), typeof a == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, a, i);
              break e;
            }
            n in e ? e[n] = a : a === !0 ? e.setAttribute(n, "") : Hu(e, n, a);
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
        de("error", e), de("load", e);
        var a = !1, i = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var f = n[c];
            if (f != null)
              switch (c) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  je(e, t, c, f, n, null);
              }
          }
        i && je(e, t, "srcSet", n.srcSet, n, null), a && je(e, t, "src", n.src, n, null);
        return;
      case "input":
        de("invalid", e);
        var d = c = f = i = null, g = null, E = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var w = n[a];
            if (w != null)
              switch (a) {
                case "name":
                  i = w;
                  break;
                case "type":
                  f = w;
                  break;
                case "checked":
                  g = w;
                  break;
                case "defaultChecked":
                  E = w;
                  break;
                case "value":
                  c = w;
                  break;
                case "defaultValue":
                  d = w;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (w != null)
                    throw Error(r(137, t));
                  break;
                default:
                  je(e, t, a, w, n, null);
              }
          }
        Ir(
          e,
          c,
          d,
          g,
          E,
          f,
          i,
          !1
        );
        return;
      case "select":
        de("invalid", e), a = f = c = null;
        for (i in n)
          if (n.hasOwnProperty(i) && (d = n[i], d != null))
            switch (i) {
              case "value":
                c = d;
                break;
              case "defaultValue":
                f = d;
                break;
              case "multiple":
                a = d;
              default:
                je(e, t, i, d, n, null);
            }
        t = c, n = f, e.multiple = !!a, t != null ? Ga(e, !!a, t, !1) : n != null && Ga(e, !!a, n, !0);
        return;
      case "textarea":
        de("invalid", e), c = i = a = null;
        for (f in n)
          if (n.hasOwnProperty(f) && (d = n[f], d != null))
            switch (f) {
              case "value":
                a = d;
                break;
              case "defaultValue":
                i = d;
                break;
              case "children":
                c = d;
                break;
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(r(91));
                break;
              default:
                je(e, t, f, d, n, null);
            }
        es(e, a, i, c);
        return;
      case "option":
        for (g in n)
          n.hasOwnProperty(g) && (a = n[g], a != null) && (g === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : je(e, t, g, a, n, null));
        return;
      case "dialog":
        de("beforetoggle", e), de("toggle", e), de("cancel", e), de("close", e);
        break;
      case "iframe":
      case "object":
        de("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < vu.length; a++)
          de(vu[a], e);
        break;
      case "image":
        de("error", e), de("load", e);
        break;
      case "details":
        de("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        de("error", e), de("load", e);
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
        for (E in n)
          if (n.hasOwnProperty(E) && (a = n[E], a != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                je(e, t, E, a, n, null);
            }
        return;
      default:
        if (vc(t)) {
          for (w in n)
            n.hasOwnProperty(w) && (a = n[w], a !== void 0 && ar(
              e,
              t,
              w,
              a,
              n,
              void 0
            ));
          return;
        }
    }
    for (d in n)
      n.hasOwnProperty(d) && (a = n[d], a != null && je(e, t, d, a, n, null));
  }
  function Uv(e, t, n, a) {
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
        var i = null, c = null, f = null, d = null, g = null, E = null, w = null;
        for (O in n) {
          var R = n[O];
          if (n.hasOwnProperty(O) && R != null)
            switch (O) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                g = R;
              default:
                a.hasOwnProperty(O) || je(e, t, O, null, a, R);
            }
        }
        for (var T in a) {
          var O = a[T];
          if (R = n[T], a.hasOwnProperty(T) && (O != null || R != null))
            switch (T) {
              case "type":
                c = O;
                break;
              case "name":
                i = O;
                break;
              case "checked":
                E = O;
                break;
              case "defaultChecked":
                w = O;
                break;
              case "value":
                f = O;
                break;
              case "defaultValue":
                d = O;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(r(137, t));
                break;
              default:
                O !== R && je(
                  e,
                  t,
                  T,
                  O,
                  a,
                  R
                );
            }
        }
        mc(
          e,
          f,
          d,
          g,
          E,
          w,
          c,
          i
        );
        return;
      case "select":
        O = f = d = T = null;
        for (c in n)
          if (g = n[c], n.hasOwnProperty(c) && g != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                O = g;
              default:
                a.hasOwnProperty(c) || je(
                  e,
                  t,
                  c,
                  null,
                  a,
                  g
                );
            }
        for (i in a)
          if (c = a[i], g = n[i], a.hasOwnProperty(i) && (c != null || g != null))
            switch (i) {
              case "value":
                T = c;
                break;
              case "defaultValue":
                d = c;
                break;
              case "multiple":
                f = c;
              default:
                c !== g && je(
                  e,
                  t,
                  i,
                  c,
                  a,
                  g
                );
            }
        t = d, n = f, a = O, T != null ? Ga(e, !!n, T, !1) : !!a != !!n && (t != null ? Ga(e, !!n, t, !0) : Ga(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        O = T = null;
        for (d in n)
          if (i = n[d], n.hasOwnProperty(d) && i != null && !a.hasOwnProperty(d))
            switch (d) {
              case "value":
                break;
              case "children":
                break;
              default:
                je(e, t, d, null, a, i);
            }
        for (f in a)
          if (i = a[f], c = n[f], a.hasOwnProperty(f) && (i != null || c != null))
            switch (f) {
              case "value":
                T = i;
                break;
              case "defaultValue":
                O = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(r(91));
                break;
              default:
                i !== c && je(e, t, f, i, a, c);
            }
        Pr(e, T, O);
        return;
      case "option":
        for (var G in n)
          T = n[G], n.hasOwnProperty(G) && T != null && !a.hasOwnProperty(G) && (G === "selected" ? e.selected = !1 : je(
            e,
            t,
            G,
            null,
            a,
            T
          ));
        for (g in a)
          T = a[g], O = n[g], a.hasOwnProperty(g) && T !== O && (T != null || O != null) && (g === "selected" ? e.selected = T && typeof T != "function" && typeof T != "symbol" : je(
            e,
            t,
            g,
            T,
            a,
            O
          ));
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
        for (var F in n)
          T = n[F], n.hasOwnProperty(F) && T != null && !a.hasOwnProperty(F) && je(e, t, F, null, a, T);
        for (E in a)
          if (T = a[E], O = n[E], a.hasOwnProperty(E) && T !== O && (T != null || O != null))
            switch (E) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(r(137, t));
                break;
              default:
                je(
                  e,
                  t,
                  E,
                  T,
                  a,
                  O
                );
            }
        return;
      default:
        if (vc(t)) {
          for (var we in n)
            T = n[we], n.hasOwnProperty(we) && T !== void 0 && !a.hasOwnProperty(we) && ar(
              e,
              t,
              we,
              void 0,
              a,
              T
            );
          for (w in a)
            T = a[w], O = n[w], !a.hasOwnProperty(w) || T === O || T === void 0 && O === void 0 || ar(
              e,
              t,
              w,
              T,
              a,
              O
            );
          return;
        }
    }
    for (var z in n)
      T = n[z], n.hasOwnProperty(z) && T != null && !a.hasOwnProperty(z) && je(e, t, z, null, a, T);
    for (R in a)
      T = a[R], O = n[R], !a.hasOwnProperty(R) || T === O || T == null && O == null || je(e, t, R, T, a, O);
  }
  function lh(e) {
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
  function Zv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), a = 0; a < n.length; a++) {
        var i = n[a], c = i.transferSize, f = i.initiatorType, d = i.duration;
        if (c && d && lh(f)) {
          for (f = 0, d = i.responseEnd, a += 1; a < n.length; a++) {
            var g = n[a], E = g.startTime;
            if (E > d) break;
            var w = g.transferSize, R = g.initiatorType;
            w && lh(R) && (g = g.responseEnd, f += w * (g < d ? 1 : (d - E) / (g - E)));
          }
          if (--a, t += 8 * (c + f) / (i.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var lr = null, ur = null;
  function Zi(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function uh(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ih(e, t) {
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
  function ir(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var cr = null;
  function qv() {
    var e = window.event;
    return e && e.type === "popstate" ? e === cr ? !1 : (cr = e, !0) : (cr = null, !1);
  }
  var ch = typeof setTimeout == "function" ? setTimeout : void 0, Hv = typeof clearTimeout == "function" ? clearTimeout : void 0, oh = typeof Promise == "function" ? Promise : void 0, Bv = typeof queueMicrotask == "function" ? queueMicrotask : typeof oh < "u" ? function(e) {
    return oh.resolve(null).then(e).catch(kv);
  } : ch;
  function kv(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function In(e) {
    return e === "head";
  }
  function rh(e, t) {
    var n = t, a = 0;
    do {
      var i = n.nextSibling;
      if (e.removeChild(n), i && i.nodeType === 8)
        if (n = i.data, n === "/$" || n === "/&") {
          if (a === 0) {
            e.removeChild(i), Sl(t);
            return;
          }
          a--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          a++;
        else if (n === "html")
          gu(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, gu(n);
          for (var c = n.firstChild; c; ) {
            var f = c.nextSibling, d = c.nodeName;
            c[Zl] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = f;
          }
        } else
          n === "body" && gu(e.ownerDocument.body);
      n = i;
    } while (n);
    Sl(t);
  }
  function sh(e, t) {
    var n = e;
    e = 0;
    do {
      var a = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), a && a.nodeType === 8)
        if (n = a.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = a;
    } while (n);
  }
  function or(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          or(n), dc(n);
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
  function Yv(e, t, n, a) {
    for (; e.nodeType === 1; ) {
      var i = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (a) {
        if (!e[Zl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Jt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Lv(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function fh(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Jt(e.nextSibling), e === null)) return null;
    return e;
  }
  function rr(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function sr(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Gv(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
    }
  }
  function Jt(e) {
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
  var fr = null;
  function dh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Jt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function hh(e) {
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
  function mh(e, t, n) {
    switch (t = Zi(n), e) {
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
  function gu(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    dc(e);
  }
  var Wt = /* @__PURE__ */ new Map(), ph = /* @__PURE__ */ new Set();
  function qi(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Cn = k.d;
  k.d = {
    f: Xv,
    r: Qv,
    D: Vv,
    C: $v,
    L: Kv,
    m: Jv,
    X: Fv,
    S: Wv,
    M: Iv
  };
  function Xv() {
    var e = Cn.f(), t = Ni();
    return e || t;
  }
  function Qv(e) {
    var t = ka(e);
    t !== null && t.tag === 5 && t.type === "form" ? Cf(t) : Cn.r(e);
  }
  var gl = typeof document > "u" ? null : document;
  function vh(e, t, n) {
    var a = gl;
    if (a && typeof t == "string" && t) {
      var i = Lt(t);
      i = 'link[rel="' + e + '"][href="' + i + '"]', typeof n == "string" && (i += '[crossorigin="' + n + '"]'), ph.has(i) || (ph.add(i), e = { rel: e, crossOrigin: n, href: t }, a.querySelector(i) === null && (t = a.createElement("link"), st(t, "link", e), nt(t), a.head.appendChild(t)));
    }
  }
  function Vv(e) {
    Cn.D(e), vh("dns-prefetch", e, null);
  }
  function $v(e, t) {
    Cn.C(e, t), vh("preconnect", e, t);
  }
  function Kv(e, t, n) {
    Cn.L(e, t, n);
    var a = gl;
    if (a && e && t) {
      var i = 'link[rel="preload"][as="' + Lt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + Lt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (i += '[imagesizes="' + Lt(
        n.imageSizes
      ) + '"]')) : i += '[href="' + Lt(e) + '"]';
      var c = i;
      switch (t) {
        case "style":
          c = bl(e);
          break;
        case "script":
          c = _l(e);
      }
      Wt.has(c) || (e = A(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Wt.set(c, e), a.querySelector(i) !== null || t === "style" && a.querySelector(bu(c)) || t === "script" && a.querySelector(_u(c)) || (t = a.createElement("link"), st(t, "link", e), nt(t), a.head.appendChild(t)));
    }
  }
  function Jv(e, t) {
    Cn.m(e, t);
    var n = gl;
    if (n && e) {
      var a = t && typeof t.as == "string" ? t.as : "script", i = 'link[rel="modulepreload"][as="' + Lt(a) + '"][href="' + Lt(e) + '"]', c = i;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = _l(e);
      }
      if (!Wt.has(c) && (e = A({ rel: "modulepreload", href: e }, t), Wt.set(c, e), n.querySelector(i) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(_u(c)))
              return;
        }
        a = n.createElement("link"), st(a, "link", e), nt(a), n.head.appendChild(a);
      }
    }
  }
  function Wv(e, t, n) {
    Cn.S(e, t, n);
    var a = gl;
    if (a && e) {
      var i = Ya(a).hoistableStyles, c = bl(e);
      t = t || "default";
      var f = i.get(c);
      if (!f) {
        var d = { loading: 0, preload: null };
        if (f = a.querySelector(
          bu(c)
        ))
          d.loading = 5;
        else {
          e = A(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Wt.get(c)) && dr(e, n);
          var g = f = a.createElement("link");
          nt(g), st(g, "link", e), g._p = new Promise(function(E, w) {
            g.onload = E, g.onerror = w;
          }), g.addEventListener("load", function() {
            d.loading |= 1;
          }), g.addEventListener("error", function() {
            d.loading |= 2;
          }), d.loading |= 4, Hi(f, t, a);
        }
        f = {
          type: "stylesheet",
          instance: f,
          count: 1,
          state: d
        }, i.set(c, f);
      }
    }
  }
  function Fv(e, t) {
    Cn.X(e, t);
    var n = gl;
    if (n && e) {
      var a = Ya(n).hoistableScripts, i = _l(e), c = a.get(i);
      c || (c = n.querySelector(_u(i)), c || (e = A({ src: e, async: !0 }, t), (t = Wt.get(i)) && hr(e, t), c = n.createElement("script"), nt(c), st(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(i, c));
    }
  }
  function Iv(e, t) {
    Cn.M(e, t);
    var n = gl;
    if (n && e) {
      var a = Ya(n).hoistableScripts, i = _l(e), c = a.get(i);
      c || (c = n.querySelector(_u(i)), c || (e = A({ src: e, async: !0, type: "module" }, t), (t = Wt.get(i)) && hr(e, t), c = n.createElement("script"), nt(c), st(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, a.set(i, c));
    }
  }
  function yh(e, t, n, a) {
    var i = (i = ce.current) ? qi(i) : null;
    if (!i) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = bl(n.href), n = Ya(
          i
        ).hoistableStyles, a = n.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = bl(n.href);
          var c = Ya(
            i
          ).hoistableStyles, f = c.get(e);
          if (f || (i = i.ownerDocument || i, f = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, f), (c = i.querySelector(
            bu(e)
          )) && !c._p && (f.instance = c, f.state.loading = 5), Wt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Wt.set(e, n), c || Pv(
            i,
            e,
            n,
            f.state
          ))), t && a === null)
            throw Error(r(528, ""));
          return f;
        }
        if (t && a !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = _l(n), n = Ya(
          i
        ).hoistableScripts, a = n.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function bl(e) {
    return 'href="' + Lt(e) + '"';
  }
  function bu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function gh(e) {
    return A({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Pv(e, t, n, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), st(t, "link", n), nt(t), e.head.appendChild(t));
  }
  function _l(e) {
    return '[src="' + Lt(e) + '"]';
  }
  function _u(e) {
    return "script[async]" + e;
  }
  function bh(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = e.querySelector(
            'style[data-href~="' + Lt(n.href) + '"]'
          );
          if (a)
            return t.instance = a, nt(a), a;
          var i = A({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return a = (e.ownerDocument || e).createElement(
            "style"
          ), nt(a), st(a, "style", i), Hi(a, n.precedence, e), t.instance = a;
        case "stylesheet":
          i = bl(n.href);
          var c = e.querySelector(
            bu(i)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, nt(c), c;
          a = gh(n), (i = Wt.get(i)) && dr(a, i), c = (e.ownerDocument || e).createElement("link"), nt(c);
          var f = c;
          return f._p = new Promise(function(d, g) {
            f.onload = d, f.onerror = g;
          }), st(c, "link", a), t.state.loading |= 4, Hi(c, n.precedence, e), t.instance = c;
        case "script":
          return c = _l(n.src), (i = e.querySelector(
            _u(c)
          )) ? (t.instance = i, nt(i), i) : (a = n, (i = Wt.get(c)) && (a = A({}, n), hr(a, i)), e = e.ownerDocument || e, i = e.createElement("script"), nt(i), st(i, "link", a), e.head.appendChild(i), t.instance = i);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Hi(a, n.precedence, e));
    return t.instance;
  }
  function Hi(e, t, n) {
    for (var a = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), i = a.length ? a[a.length - 1] : null, c = i, f = 0; f < a.length; f++) {
      var d = a[f];
      if (d.dataset.precedence === t) c = d;
      else if (c !== i) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function dr(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function hr(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Bi = null;
  function _h(e, t, n) {
    if (Bi === null) {
      var a = /* @__PURE__ */ new Map(), i = Bi = /* @__PURE__ */ new Map();
      i.set(n, a);
    } else
      i = Bi, a = i.get(n), a || (a = /* @__PURE__ */ new Map(), i.set(n, a));
    if (a.has(e)) return a;
    for (a.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
      var c = n[i];
      if (!(c[Zl] || c[it] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var f = c.getAttribute(t) || "";
        f = e + f;
        var d = a.get(f);
        d ? d.push(c) : a.set(f, [c]);
      }
    }
    return a;
  }
  function Sh(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function ey(e, t, n) {
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
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function zh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function ty(e, t, n, a) {
    if (n.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var i = bl(a.href), c = t.querySelector(
          bu(i)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ki.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, nt(c);
          return;
        }
        c = t.ownerDocument || t, a = gh(a), (i = Wt.get(i)) && dr(a, i), c = c.createElement("link"), nt(c);
        var f = c;
        f._p = new Promise(function(d, g) {
          f.onload = d, f.onerror = g;
        }), st(c, "link", a), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = ki.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var mr = 0;
  function ny(e, t) {
    return e.stylesheets && e.count === 0 && Li(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var a = setTimeout(function() {
        if (e.stylesheets && Li(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && mr === 0 && (mr = 62500 * Zv());
      var i = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Li(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > mr ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(a), clearTimeout(i);
      };
    } : null;
  }
  function ki() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Li(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Yi = null;
  function Li(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Yi = /* @__PURE__ */ new Map(), t.forEach(ay, e), Yi = null, ki.call(e));
  }
  function ay(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Yi.get(e);
      if (n) var a = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Yi.set(e, n);
        for (var i = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < i.length; c++) {
          var f = i[c];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (n.set(f.dataset.precedence, f), a = f);
        }
        a && n.set(null, a);
      }
      i = t.instance, f = i.getAttribute("data-precedence"), c = n.get(f) || a, c === a && n.set(null, i), n.set(f, i), this.count++, a = ki.bind(this), i.addEventListener("load", a), i.addEventListener("error", a), c ? c.parentNode.insertBefore(i, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Su = {
    $$typeof: ge,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function ly(e, t, n, a, i, c, f, d, g) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = H(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = H(0), this.hiddenUpdates = H(null), this.identifierPrefix = a, this.onUncaughtError = i, this.onCaughtError = c, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function xh(e, t, n, a, i, c, f, d, g, E, w, R) {
    return e = new ly(
      e,
      t,
      n,
      f,
      g,
      E,
      w,
      R,
      d
    ), t = 1, c === !0 && (t |= 24), c = wt(3, null, null, t), e.current = c, c.stateNode = e, t = Vc(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: a,
      isDehydrated: n,
      cache: t
    }, Wc(c), e;
  }
  function Eh(e) {
    return e ? (e = Fa, e) : Fa;
  }
  function Th(e, t, n, a, i, c) {
    i = Eh(i), a.context === null ? a.context = i : a.pendingContext = i, a = Yn(t), a.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (a.callback = c), n = Ln(e, a, t), n !== null && (Et(n, e, t), Pl(n, e, t));
  }
  function Oh(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function pr(e, t) {
    Oh(e, t), (e = e.alternate) && Oh(e, t);
  }
  function Ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = ya(e, 67108864);
      t !== null && Et(t, e, 67108864), pr(e, 67108864);
    }
  }
  function Nh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ut();
      t = ut(t);
      var n = ya(e, t);
      n !== null && Et(n, e, t), pr(e, t);
    }
  }
  var Gi = !0;
  function uy(e, t, n, a) {
    var i = j.T;
    j.T = null;
    var c = k.p;
    try {
      k.p = 2, vr(e, t, n, a);
    } finally {
      k.p = c, j.T = i;
    }
  }
  function iy(e, t, n, a) {
    var i = j.T;
    j.T = null;
    var c = k.p;
    try {
      k.p = 8, vr(e, t, n, a);
    } finally {
      k.p = c, j.T = i;
    }
  }
  function vr(e, t, n, a) {
    if (Gi) {
      var i = yr(a);
      if (i === null)
        nr(
          e,
          t,
          a,
          Xi,
          n
        ), wh(e, a);
      else if (oy(
        i,
        e,
        t,
        n,
        a
      ))
        a.stopPropagation();
      else if (wh(e, a), t & 4 && -1 < cy.indexOf(e)) {
        for (; i !== null; ) {
          var c = ka(i);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var f = hn(c.pendingLanes);
                  if (f !== 0) {
                    var d = c;
                    for (d.pendingLanes |= 2, d.entangledLanes |= 2; f; ) {
                      var g = 1 << 31 - lt(f);
                      d.entanglements[1] |= g, f &= ~g;
                    }
                    rn(c), (ze & 6) === 0 && (Oi = dt() + 500, pu(0));
                  }
                }
                break;
              case 31:
              case 13:
                d = ya(c, 2), d !== null && Et(d, c, 2), Ni(), pr(c, 2);
            }
          if (c = yr(a), c === null && nr(
            e,
            t,
            a,
            Xi,
            n
          ), c === i) break;
          i = c;
        }
        i !== null && a.stopPropagation();
      } else
        nr(
          e,
          t,
          a,
          null,
          n
        );
    }
  }
  function yr(e) {
    return e = gc(e), gr(e);
  }
  var Xi = null;
  function gr(e) {
    if (Xi = null, e = Ba(e), e !== null) {
      var t = m(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = h(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = y(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Xi = e, null;
  }
  function jh(e) {
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
        switch (Cl()) {
          case Dl:
            return 2;
          case Rl:
            return 8;
          case sa:
          case Mu:
            return 32;
          case Cu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var br = !1, Pn = null, ea = null, ta = null, zu = /* @__PURE__ */ new Map(), xu = /* @__PURE__ */ new Map(), na = [], cy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function wh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pn = null;
        break;
      case "dragenter":
      case "dragleave":
        ea = null;
        break;
      case "mouseover":
      case "mouseout":
        ta = null;
        break;
      case "pointerover":
      case "pointerout":
        zu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        xu.delete(t.pointerId);
    }
  }
  function Eu(e, t, n, a, i, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: a,
      nativeEvent: c,
      targetContainers: [i]
    }, t !== null && (t = ka(t), t !== null && Ah(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
  }
  function oy(e, t, n, a, i) {
    switch (t) {
      case "focusin":
        return Pn = Eu(
          Pn,
          e,
          t,
          n,
          a,
          i
        ), !0;
      case "dragenter":
        return ea = Eu(
          ea,
          e,
          t,
          n,
          a,
          i
        ), !0;
      case "mouseover":
        return ta = Eu(
          ta,
          e,
          t,
          n,
          a,
          i
        ), !0;
      case "pointerover":
        var c = i.pointerId;
        return zu.set(
          c,
          Eu(
            zu.get(c) || null,
            e,
            t,
            n,
            a,
            i
          )
        ), !0;
      case "gotpointercapture":
        return c = i.pointerId, xu.set(
          c,
          Eu(
            xu.get(c) || null,
            e,
            t,
            n,
            a,
            i
          )
        ), !0;
    }
    return !1;
  }
  function Mh(e) {
    var t = Ba(e.target);
    if (t !== null) {
      var n = m(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = h(n), t !== null) {
            e.blockedOn = t, qa(e.priority, function() {
              Nh(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = y(n), t !== null) {
            e.blockedOn = t, qa(e.priority, function() {
              Nh(n);
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
  function Qi(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = yr(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var a = new n.constructor(
          n.type,
          n
        );
        yc = a, n.target.dispatchEvent(a), yc = null;
      } else
        return t = ka(n), t !== null && Ah(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Ch(e, t, n) {
    Qi(e) && n.delete(t);
  }
  function ry() {
    br = !1, Pn !== null && Qi(Pn) && (Pn = null), ea !== null && Qi(ea) && (ea = null), ta !== null && Qi(ta) && (ta = null), zu.forEach(Ch), xu.forEach(Ch);
  }
  function Vi(e, t) {
    e.blockedOn === t && (e.blockedOn = null, br || (br = !0, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      ry
    )));
  }
  var $i = null;
  function Dh(e) {
    $i !== e && ($i = e, l.unstable_scheduleCallback(
      l.unstable_NormalPriority,
      function() {
        $i === e && ($i = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], a = e[t + 1], i = e[t + 2];
          if (typeof a != "function") {
            if (gr(a || n) === null)
              continue;
            break;
          }
          var c = ka(n);
          c !== null && (e.splice(t, 3), t -= 3, yo(
            c,
            {
              pending: !0,
              data: i,
              method: n.method,
              action: a
            },
            a,
            i
          ));
        }
      }
    ));
  }
  function Sl(e) {
    function t(g) {
      return Vi(g, e);
    }
    Pn !== null && Vi(Pn, e), ea !== null && Vi(ea, e), ta !== null && Vi(ta, e), zu.forEach(t), xu.forEach(t);
    for (var n = 0; n < na.length; n++) {
      var a = na[n];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < na.length && (n = na[0], n.blockedOn === null); )
      Mh(n), n.blockedOn === null && na.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (a = 0; a < n.length; a += 3) {
        var i = n[a], c = n[a + 1], f = i[gt] || null;
        if (typeof c == "function")
          f || Dh(n);
        else if (f) {
          var d = null;
          if (c && c.hasAttribute("formAction")) {
            if (i = c, f = c[gt] || null)
              d = f.formAction;
            else if (gr(i) !== null) continue;
          } else d = f.action;
          typeof d == "function" ? n[a + 1] = d : (n.splice(a, 3), a -= 3), Dh(n);
        }
      }
  }
  function Rh() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(f) {
            return i = f;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      i !== null && (i(), i = null), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, i = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
      };
    }
  }
  function _r(e) {
    this._internalRoot = e;
  }
  Ki.prototype.render = _r.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var n = t.current, a = Ut();
    Th(n, a, e, t, null, null);
  }, Ki.prototype.unmount = _r.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Th(e.current, 2, null, e, null, null), Ni(), t[Ha] = null;
    }
  };
  function Ki(e) {
    this._internalRoot = e;
  }
  Ki.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = qu();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < na.length && t !== 0 && t < na[n].priority; n++) ;
      na.splice(n, 0, e), n === 0 && Mh(e);
    }
  };
  var Uh = u.version;
  if (Uh !== "19.2.4")
    throw Error(
      r(
        527,
        Uh,
        "19.2.4"
      )
    );
  k.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = v(t), e = e !== null ? N(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var sy = {
    bundleType: 0,
    version: "19.2.4",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.2.4"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ji = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ji.isDisabled && Ji.supportsFiber)
      try {
        fa = Ji.inject(
          sy
        ), ht = Ji;
      } catch {
      }
  }
  return Ou.createRoot = function(e, t) {
    if (!s(e)) throw Error(r(299));
    var n = !1, a = "", i = Lf, c = Gf, f = Xf;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = xh(
      e,
      1,
      !1,
      null,
      null,
      n,
      a,
      null,
      i,
      c,
      f,
      Rh
    ), e[Ha] = t.current, tr(e), new _r(t);
  }, Ou.hydrateRoot = function(e, t, n) {
    if (!s(e)) throw Error(r(299));
    var a = !1, i = "", c = Lf, f = Gf, d = Xf, g = null;
    return n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (f = n.onCaughtError), n.onRecoverableError !== void 0 && (d = n.onRecoverableError), n.formState !== void 0 && (g = n.formState)), t = xh(
      e,
      1,
      !0,
      t,
      n ?? null,
      a,
      i,
      g,
      c,
      f,
      d,
      Rh
    ), t.context = Eh(null), n = t.current, a = Ut(), a = ut(a), i = Yn(a), i.callback = null, Ln(n, i, a), n = a, t.current.lanes = n, J(t, n), rn(t), e[Ha] = t.current, tr(e), new Ki(t);
  }, Ou.version = "19.2.4", Ou;
}
var Qh;
function _y() {
  if (Qh) return xr.exports;
  Qh = 1;
  function l() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (u) {
        console.error(u);
      }
  }
  return l(), xr.exports = by(), xr.exports;
}
var Sy = _y();
const zy = /* @__PURE__ */ _m(Sy);
function C(l, u, o) {
  function r(y, b) {
    if (y._zod || Object.defineProperty(y, "_zod", {
      value: {
        def: b,
        constr: h,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), y._zod.traits.has(l))
      return;
    y._zod.traits.add(l), u(y, b);
    const v = h.prototype, N = Object.keys(v);
    for (let A = 0; A < N.length; A++) {
      const Z = N[A];
      Z in y || (y[Z] = v[Z].bind(y));
    }
  }
  const s = o?.Parent ?? Object;
  class m extends s {
  }
  Object.defineProperty(m, "name", { value: l });
  function h(y) {
    var b;
    const v = o?.Parent ? new m() : this;
    r(v, y), (b = v._zod).deferred ?? (b.deferred = []);
    for (const N of v._zod.deferred)
      N();
    return v;
  }
  return Object.defineProperty(h, "init", { value: r }), Object.defineProperty(h, Symbol.hasInstance, {
    value: (y) => o?.Parent && y instanceof o.Parent ? !0 : y?._zod?.traits?.has(l)
  }), Object.defineProperty(h, "name", { value: l }), h;
}
class Tl extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Sm extends Error {
  constructor(u) {
    super(`Encountered unidirectional transform during encode: ${u}`), this.name = "ZodEncodeError";
  }
}
const zm = {};
function la(l) {
  return zm;
}
function xm(l) {
  const u = Object.values(l).filter((r) => typeof r == "number");
  return Object.entries(l).filter(([r, s]) => u.indexOf(+r) === -1).map(([r, s]) => s);
}
function Cr(l, u) {
  return typeof u == "bigint" ? u.toString() : u;
}
function qr(l) {
  return {
    get value() {
      {
        const u = l();
        return Object.defineProperty(this, "value", { value: u }), u;
      }
    }
  };
}
function Hr(l) {
  return l == null;
}
function Br(l) {
  const u = l.startsWith("^") ? 1 : 0, o = l.endsWith("$") ? l.length - 1 : l.length;
  return l.slice(u, o);
}
function xy(l, u) {
  const o = (l.toString().split(".")[1] || "").length, r = u.toString();
  let s = (r.split(".")[1] || "").length;
  if (s === 0 && /\d?e-\d?/.test(r)) {
    const b = r.match(/\d?e-(\d?)/);
    b?.[1] && (s = Number.parseInt(b[1]));
  }
  const m = o > s ? o : s, h = Number.parseInt(l.toFixed(m).replace(".", "")), y = Number.parseInt(u.toFixed(m).replace(".", ""));
  return h % y / 10 ** m;
}
const Vh = /* @__PURE__ */ Symbol("evaluating");
function Te(l, u, o) {
  let r;
  Object.defineProperty(l, u, {
    get() {
      if (r !== Vh)
        return r === void 0 && (r = Vh, r = o()), r;
    },
    set(s) {
      Object.defineProperty(l, u, {
        value: s
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Ma(l, u, o) {
  Object.defineProperty(l, u, {
    value: o,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function ia(...l) {
  const u = {};
  for (const o of l) {
    const r = Object.getOwnPropertyDescriptors(o);
    Object.assign(u, r);
  }
  return Object.defineProperties({}, u);
}
function $h(l) {
  return JSON.stringify(l);
}
function Ey(l) {
  return l.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Em = "captureStackTrace" in Error ? Error.captureStackTrace : (...l) => {
};
function Pi(l) {
  return typeof l == "object" && l !== null && !Array.isArray(l);
}
const Ty = qr(() => {
  if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const l = Function;
    return new l(""), !0;
  } catch {
    return !1;
  }
});
function Ol(l) {
  if (Pi(l) === !1)
    return !1;
  const u = l.constructor;
  if (u === void 0 || typeof u != "function")
    return !0;
  const o = u.prototype;
  return !(Pi(o) === !1 || Object.prototype.hasOwnProperty.call(o, "isPrototypeOf") === !1);
}
function Tm(l) {
  return Ol(l) ? { ...l } : Array.isArray(l) ? [...l] : l;
}
const Oy = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function lc(l) {
  return l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ca(l, u, o) {
  const r = new l._zod.constr(u ?? l._zod.def);
  return (!u || o?.parent) && (r._zod.parent = l), r;
}
function K(l) {
  const u = l;
  if (!u)
    return {};
  if (typeof u == "string")
    return { error: () => u };
  if (u?.message !== void 0) {
    if (u?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    u.error = u.message;
  }
  return delete u.message, typeof u.error == "string" ? { ...u, error: () => u.error } : u;
}
function Ay(l) {
  return Object.keys(l).filter((u) => l[u]._zod.optin === "optional" && l[u]._zod.optout === "optional");
}
const Ny = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function jy(l, u) {
  const o = l._zod.def, r = o.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const m = ia(l._zod.def, {
    get shape() {
      const h = {};
      for (const y in u) {
        if (!(y in o.shape))
          throw new Error(`Unrecognized key: "${y}"`);
        u[y] && (h[y] = o.shape[y]);
      }
      return Ma(this, "shape", h), h;
    },
    checks: []
  });
  return ca(l, m);
}
function wy(l, u) {
  const o = l._zod.def, r = o.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const m = ia(l._zod.def, {
    get shape() {
      const h = { ...l._zod.def.shape };
      for (const y in u) {
        if (!(y in o.shape))
          throw new Error(`Unrecognized key: "${y}"`);
        u[y] && delete h[y];
      }
      return Ma(this, "shape", h), h;
    },
    checks: []
  });
  return ca(l, m);
}
function My(l, u) {
  if (!Ol(u))
    throw new Error("Invalid input to extend: expected a plain object");
  const o = l._zod.def.checks;
  if (o && o.length > 0) {
    const m = l._zod.def.shape;
    for (const h in u)
      if (Object.getOwnPropertyDescriptor(m, h) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const s = ia(l._zod.def, {
    get shape() {
      const m = { ...l._zod.def.shape, ...u };
      return Ma(this, "shape", m), m;
    }
  });
  return ca(l, s);
}
function Cy(l, u) {
  if (!Ol(u))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const o = ia(l._zod.def, {
    get shape() {
      const r = { ...l._zod.def.shape, ...u };
      return Ma(this, "shape", r), r;
    }
  });
  return ca(l, o);
}
function Dy(l, u) {
  const o = ia(l._zod.def, {
    get shape() {
      const r = { ...l._zod.def.shape, ...u._zod.def.shape };
      return Ma(this, "shape", r), r;
    },
    get catchall() {
      return u._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return ca(l, o);
}
function Ry(l, u, o) {
  const s = u._zod.def.checks;
  if (s && s.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const h = ia(u._zod.def, {
    get shape() {
      const y = u._zod.def.shape, b = { ...y };
      if (o)
        for (const v in o) {
          if (!(v in y))
            throw new Error(`Unrecognized key: "${v}"`);
          o[v] && (b[v] = l ? new l({
            type: "optional",
            innerType: y[v]
          }) : y[v]);
        }
      else
        for (const v in y)
          b[v] = l ? new l({
            type: "optional",
            innerType: y[v]
          }) : y[v];
      return Ma(this, "shape", b), b;
    },
    checks: []
  });
  return ca(u, h);
}
function Uy(l, u, o) {
  const r = ia(u._zod.def, {
    get shape() {
      const s = u._zod.def.shape, m = { ...s };
      if (o)
        for (const h in o) {
          if (!(h in m))
            throw new Error(`Unrecognized key: "${h}"`);
          o[h] && (m[h] = new l({
            type: "nonoptional",
            innerType: s[h]
          }));
        }
      else
        for (const h in s)
          m[h] = new l({
            type: "nonoptional",
            innerType: s[h]
          });
      return Ma(this, "shape", m), m;
    }
  });
  return ca(u, r);
}
function zl(l, u = 0) {
  if (l.aborted === !0)
    return !0;
  for (let o = u; o < l.issues.length; o++)
    if (l.issues[o]?.continue !== !0)
      return !0;
  return !1;
}
function xl(l, u) {
  return u.map((o) => {
    var r;
    return (r = o).path ?? (r.path = []), o.path.unshift(l), o;
  });
}
function Wi(l) {
  return typeof l == "string" ? l : l?.message;
}
function ua(l, u, o) {
  const r = { ...l, path: l.path ?? [] };
  if (!l.message) {
    const s = Wi(l.inst?._zod.def?.error?.(l)) ?? Wi(u?.error?.(l)) ?? Wi(o.customError?.(l)) ?? Wi(o.localeError?.(l)) ?? "Invalid input";
    r.message = s;
  }
  return delete r.inst, delete r.continue, u?.reportInput || delete r.input, r;
}
function kr(l) {
  return Array.isArray(l) ? "array" : typeof l == "string" ? "string" : "unknown";
}
function ju(...l) {
  const [u, o, r] = l;
  return typeof u == "string" ? {
    message: u,
    code: "custom",
    input: o,
    inst: r
  } : { ...u };
}
const Om = (l, u) => {
  l.name = "$ZodError", Object.defineProperty(l, "_zod", {
    value: l._zod,
    enumerable: !1
  }), Object.defineProperty(l, "issues", {
    value: u,
    enumerable: !1
  }), l.message = JSON.stringify(u, Cr, 2), Object.defineProperty(l, "toString", {
    value: () => l.message,
    enumerable: !1
  });
}, Am = C("$ZodError", Om), Nm = C("$ZodError", Om, { Parent: Error });
function Zy(l, u = (o) => o.message) {
  const o = {}, r = [];
  for (const s of l.issues)
    s.path.length > 0 ? (o[s.path[0]] = o[s.path[0]] || [], o[s.path[0]].push(u(s))) : r.push(u(s));
  return { formErrors: r, fieldErrors: o };
}
function qy(l, u = (o) => o.message) {
  const o = { _errors: [] }, r = (s) => {
    for (const m of s.issues)
      if (m.code === "invalid_union" && m.errors.length)
        m.errors.map((h) => r({ issues: h }));
      else if (m.code === "invalid_key")
        r({ issues: m.issues });
      else if (m.code === "invalid_element")
        r({ issues: m.issues });
      else if (m.path.length === 0)
        o._errors.push(u(m));
      else {
        let h = o, y = 0;
        for (; y < m.path.length; ) {
          const b = m.path[y];
          y === m.path.length - 1 ? (h[b] = h[b] || { _errors: [] }, h[b]._errors.push(u(m))) : h[b] = h[b] || { _errors: [] }, h = h[b], y++;
        }
      }
  };
  return r(l), o;
}
const Yr = (l) => (u, o, r, s) => {
  const m = r ? Object.assign(r, { async: !1 }) : { async: !1 }, h = u._zod.run({ value: o, issues: [] }, m);
  if (h instanceof Promise)
    throw new Tl();
  if (h.issues.length) {
    const y = new (s?.Err ?? l)(h.issues.map((b) => ua(b, m, la())));
    throw Em(y, s?.callee), y;
  }
  return h.value;
}, Lr = (l) => async (u, o, r, s) => {
  const m = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let h = u._zod.run({ value: o, issues: [] }, m);
  if (h instanceof Promise && (h = await h), h.issues.length) {
    const y = new (s?.Err ?? l)(h.issues.map((b) => ua(b, m, la())));
    throw Em(y, s?.callee), y;
  }
  return h.value;
}, uc = (l) => (u, o, r) => {
  const s = r ? { ...r, async: !1 } : { async: !1 }, m = u._zod.run({ value: o, issues: [] }, s);
  if (m instanceof Promise)
    throw new Tl();
  return m.issues.length ? {
    success: !1,
    error: new (l ?? Am)(m.issues.map((h) => ua(h, s, la())))
  } : { success: !0, data: m.value };
}, Hy = /* @__PURE__ */ uc(Nm), ic = (l) => async (u, o, r) => {
  const s = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let m = u._zod.run({ value: o, issues: [] }, s);
  return m instanceof Promise && (m = await m), m.issues.length ? {
    success: !1,
    error: new l(m.issues.map((h) => ua(h, s, la())))
  } : { success: !0, data: m.value };
}, By = /* @__PURE__ */ ic(Nm), ky = (l) => (u, o, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Yr(l)(u, o, s);
}, Yy = (l) => (u, o, r) => Yr(l)(u, o, r), Ly = (l) => async (u, o, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Lr(l)(u, o, s);
}, Gy = (l) => async (u, o, r) => Lr(l)(u, o, r), Xy = (l) => (u, o, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return uc(l)(u, o, s);
}, Qy = (l) => (u, o, r) => uc(l)(u, o, r), Vy = (l) => async (u, o, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ic(l)(u, o, s);
}, $y = (l) => async (u, o, r) => ic(l)(u, o, r), Ky = /^[cC][^\s-]{8,}$/, Jy = /^[0-9a-z]+$/, Wy = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Fy = /^[0-9a-vA-V]{20}$/, Iy = /^[A-Za-z0-9]{27}$/, Py = /^[a-zA-Z0-9_-]{21}$/, e0 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, t0 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Kh = (l) => l ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${l}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, n0 = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, a0 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function l0() {
  return new RegExp(a0, "u");
}
const u0 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, i0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, c0 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, o0 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, r0 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, jm = /^[A-Za-z0-9_-]*$/, s0 = /^\+[1-9]\d{6,14}$/, wm = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", f0 = /* @__PURE__ */ new RegExp(`^${wm}$`);
function Mm(l) {
  const u = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof l.precision == "number" ? l.precision === -1 ? `${u}` : l.precision === 0 ? `${u}:[0-5]\\d` : `${u}:[0-5]\\d\\.\\d{${l.precision}}` : `${u}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function d0(l) {
  return new RegExp(`^${Mm(l)}$`);
}
function h0(l) {
  const u = Mm({ precision: l.precision }), o = ["Z"];
  l.local && o.push(""), l.offset && o.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${u}(?:${o.join("|")})`;
  return new RegExp(`^${wm}T(?:${r})$`);
}
const m0 = (l) => {
  const u = l ? `[\\s\\S]{${l?.minimum ?? 0},${l?.maximum ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${u}$`);
}, p0 = /^-?\d+$/, Cm = /^-?\d+(?:\.\d+)?$/, v0 = /^(?:true|false)$/i, y0 = /^[^A-Z]*$/, g0 = /^[^a-z]*$/, Tt = /* @__PURE__ */ C("$ZodCheck", (l, u) => {
  var o;
  l._zod ?? (l._zod = {}), l._zod.def = u, (o = l._zod).onattach ?? (o.onattach = []);
}), Dm = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Rm = /* @__PURE__ */ C("$ZodCheckLessThan", (l, u) => {
  Tt.init(l, u);
  const o = Dm[typeof u.value];
  l._zod.onattach.push((r) => {
    const s = r._zod.bag, m = (u.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    u.value < m && (u.inclusive ? s.maximum = u.value : s.exclusiveMaximum = u.value);
  }), l._zod.check = (r) => {
    (u.inclusive ? r.value <= u.value : r.value < u.value) || r.issues.push({
      origin: o,
      code: "too_big",
      maximum: typeof u.value == "object" ? u.value.getTime() : u.value,
      input: r.value,
      inclusive: u.inclusive,
      inst: l,
      continue: !u.abort
    });
  };
}), Um = /* @__PURE__ */ C("$ZodCheckGreaterThan", (l, u) => {
  Tt.init(l, u);
  const o = Dm[typeof u.value];
  l._zod.onattach.push((r) => {
    const s = r._zod.bag, m = (u.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    u.value > m && (u.inclusive ? s.minimum = u.value : s.exclusiveMinimum = u.value);
  }), l._zod.check = (r) => {
    (u.inclusive ? r.value >= u.value : r.value > u.value) || r.issues.push({
      origin: o,
      code: "too_small",
      minimum: typeof u.value == "object" ? u.value.getTime() : u.value,
      input: r.value,
      inclusive: u.inclusive,
      inst: l,
      continue: !u.abort
    });
  };
}), b0 = /* @__PURE__ */ C("$ZodCheckMultipleOf", (l, u) => {
  Tt.init(l, u), l._zod.onattach.push((o) => {
    var r;
    (r = o._zod.bag).multipleOf ?? (r.multipleOf = u.value);
  }), l._zod.check = (o) => {
    if (typeof o.value != typeof u.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof o.value == "bigint" ? o.value % u.value === BigInt(0) : xy(o.value, u.value) === 0) || o.issues.push({
      origin: typeof o.value,
      code: "not_multiple_of",
      divisor: u.value,
      input: o.value,
      inst: l,
      continue: !u.abort
    });
  };
}), _0 = /* @__PURE__ */ C("$ZodCheckNumberFormat", (l, u) => {
  Tt.init(l, u), u.format = u.format || "float64";
  const o = u.format?.includes("int"), r = o ? "int" : "number", [s, m] = Ny[u.format];
  l._zod.onattach.push((h) => {
    const y = h._zod.bag;
    y.format = u.format, y.minimum = s, y.maximum = m, o && (y.pattern = p0);
  }), l._zod.check = (h) => {
    const y = h.value;
    if (o) {
      if (!Number.isInteger(y)) {
        h.issues.push({
          expected: r,
          format: u.format,
          code: "invalid_type",
          continue: !1,
          input: y,
          inst: l
        });
        return;
      }
      if (!Number.isSafeInteger(y)) {
        y > 0 ? h.issues.push({
          input: y,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: l,
          origin: r,
          inclusive: !0,
          continue: !u.abort
        }) : h.issues.push({
          input: y,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: l,
          origin: r,
          inclusive: !0,
          continue: !u.abort
        });
        return;
      }
    }
    y < s && h.issues.push({
      origin: "number",
      input: y,
      code: "too_small",
      minimum: s,
      inclusive: !0,
      inst: l,
      continue: !u.abort
    }), y > m && h.issues.push({
      origin: "number",
      input: y,
      code: "too_big",
      maximum: m,
      inclusive: !0,
      inst: l,
      continue: !u.abort
    });
  };
}), S0 = /* @__PURE__ */ C("$ZodCheckMaxLength", (l, u) => {
  var o;
  Tt.init(l, u), (o = l._zod.def).when ?? (o.when = (r) => {
    const s = r.value;
    return !Hr(s) && s.length !== void 0;
  }), l._zod.onattach.push((r) => {
    const s = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    u.maximum < s && (r._zod.bag.maximum = u.maximum);
  }), l._zod.check = (r) => {
    const s = r.value;
    if (s.length <= u.maximum)
      return;
    const h = kr(s);
    r.issues.push({
      origin: h,
      code: "too_big",
      maximum: u.maximum,
      inclusive: !0,
      input: s,
      inst: l,
      continue: !u.abort
    });
  };
}), z0 = /* @__PURE__ */ C("$ZodCheckMinLength", (l, u) => {
  var o;
  Tt.init(l, u), (o = l._zod.def).when ?? (o.when = (r) => {
    const s = r.value;
    return !Hr(s) && s.length !== void 0;
  }), l._zod.onattach.push((r) => {
    const s = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    u.minimum > s && (r._zod.bag.minimum = u.minimum);
  }), l._zod.check = (r) => {
    const s = r.value;
    if (s.length >= u.minimum)
      return;
    const h = kr(s);
    r.issues.push({
      origin: h,
      code: "too_small",
      minimum: u.minimum,
      inclusive: !0,
      input: s,
      inst: l,
      continue: !u.abort
    });
  };
}), x0 = /* @__PURE__ */ C("$ZodCheckLengthEquals", (l, u) => {
  var o;
  Tt.init(l, u), (o = l._zod.def).when ?? (o.when = (r) => {
    const s = r.value;
    return !Hr(s) && s.length !== void 0;
  }), l._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.minimum = u.length, s.maximum = u.length, s.length = u.length;
  }), l._zod.check = (r) => {
    const s = r.value, m = s.length;
    if (m === u.length)
      return;
    const h = kr(s), y = m > u.length;
    r.issues.push({
      origin: h,
      ...y ? { code: "too_big", maximum: u.length } : { code: "too_small", minimum: u.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: l,
      continue: !u.abort
    });
  };
}), cc = /* @__PURE__ */ C("$ZodCheckStringFormat", (l, u) => {
  var o, r;
  Tt.init(l, u), l._zod.onattach.push((s) => {
    const m = s._zod.bag;
    m.format = u.format, u.pattern && (m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(u.pattern));
  }), u.pattern ? (o = l._zod).check ?? (o.check = (s) => {
    u.pattern.lastIndex = 0, !u.pattern.test(s.value) && s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: u.format,
      input: s.value,
      ...u.pattern ? { pattern: u.pattern.toString() } : {},
      inst: l,
      continue: !u.abort
    });
  }) : (r = l._zod).check ?? (r.check = () => {
  });
}), E0 = /* @__PURE__ */ C("$ZodCheckRegex", (l, u) => {
  cc.init(l, u), l._zod.check = (o) => {
    u.pattern.lastIndex = 0, !u.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: o.value,
      pattern: u.pattern.toString(),
      inst: l,
      continue: !u.abort
    });
  };
}), T0 = /* @__PURE__ */ C("$ZodCheckLowerCase", (l, u) => {
  u.pattern ?? (u.pattern = y0), cc.init(l, u);
}), O0 = /* @__PURE__ */ C("$ZodCheckUpperCase", (l, u) => {
  u.pattern ?? (u.pattern = g0), cc.init(l, u);
}), A0 = /* @__PURE__ */ C("$ZodCheckIncludes", (l, u) => {
  Tt.init(l, u);
  const o = lc(u.includes), r = new RegExp(typeof u.position == "number" ? `^.{${u.position}}${o}` : o);
  u.pattern = r, l._zod.onattach.push((s) => {
    const m = s._zod.bag;
    m.patterns ?? (m.patterns = /* @__PURE__ */ new Set()), m.patterns.add(r);
  }), l._zod.check = (s) => {
    s.value.includes(u.includes, u.position) || s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: u.includes,
      input: s.value,
      inst: l,
      continue: !u.abort
    });
  };
}), N0 = /* @__PURE__ */ C("$ZodCheckStartsWith", (l, u) => {
  Tt.init(l, u);
  const o = new RegExp(`^${lc(u.prefix)}.*`);
  u.pattern ?? (u.pattern = o), l._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(o);
  }), l._zod.check = (r) => {
    r.value.startsWith(u.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: u.prefix,
      input: r.value,
      inst: l,
      continue: !u.abort
    });
  };
}), j0 = /* @__PURE__ */ C("$ZodCheckEndsWith", (l, u) => {
  Tt.init(l, u);
  const o = new RegExp(`.*${lc(u.suffix)}$`);
  u.pattern ?? (u.pattern = o), l._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(o);
  }), l._zod.check = (r) => {
    r.value.endsWith(u.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: u.suffix,
      input: r.value,
      inst: l,
      continue: !u.abort
    });
  };
}), w0 = /* @__PURE__ */ C("$ZodCheckOverwrite", (l, u) => {
  Tt.init(l, u), l._zod.check = (o) => {
    o.value = u.tx(o.value);
  };
});
class M0 {
  constructor(u = []) {
    this.content = [], this.indent = 0, this && (this.args = u);
  }
  indented(u) {
    this.indent += 1, u(this), this.indent -= 1;
  }
  write(u) {
    if (typeof u == "function") {
      u(this, { execution: "sync" }), u(this, { execution: "async" });
      return;
    }
    const r = u.split(`
`).filter((h) => h), s = Math.min(...r.map((h) => h.length - h.trimStart().length)), m = r.map((h) => h.slice(s)).map((h) => " ".repeat(this.indent * 2) + h);
    for (const h of m)
      this.content.push(h);
  }
  compile() {
    const u = Function, o = this?.args, s = [...(this?.content ?? [""]).map((m) => `  ${m}`)];
    return new u(...o, s.join(`
`));
  }
}
const C0 = {
  major: 4,
  minor: 3,
  patch: 5
}, Ge = /* @__PURE__ */ C("$ZodType", (l, u) => {
  var o;
  l ?? (l = {}), l._zod.def = u, l._zod.bag = l._zod.bag || {}, l._zod.version = C0;
  const r = [...l._zod.def.checks ?? []];
  l._zod.traits.has("$ZodCheck") && r.unshift(l);
  for (const s of r)
    for (const m of s._zod.onattach)
      m(l);
  if (r.length === 0)
    (o = l._zod).deferred ?? (o.deferred = []), l._zod.deferred?.push(() => {
      l._zod.run = l._zod.parse;
    });
  else {
    const s = (h, y, b) => {
      let v = zl(h), N;
      for (const A of y) {
        if (A._zod.def.when) {
          if (!A._zod.def.when(h))
            continue;
        } else if (v)
          continue;
        const Z = h.issues.length, q = A._zod.check(h);
        if (q instanceof Promise && b?.async === !1)
          throw new Tl();
        if (N || q instanceof Promise)
          N = (N ?? Promise.resolve()).then(async () => {
            await q, h.issues.length !== Z && (v || (v = zl(h, Z)));
          });
        else {
          if (h.issues.length === Z)
            continue;
          v || (v = zl(h, Z));
        }
      }
      return N ? N.then(() => h) : h;
    }, m = (h, y, b) => {
      if (zl(h))
        return h.aborted = !0, h;
      const v = s(y, r, b);
      if (v instanceof Promise) {
        if (b.async === !1)
          throw new Tl();
        return v.then((N) => l._zod.parse(N, b));
      }
      return l._zod.parse(v, b);
    };
    l._zod.run = (h, y) => {
      if (y.skipChecks)
        return l._zod.parse(h, y);
      if (y.direction === "backward") {
        const v = l._zod.parse({ value: h.value, issues: [] }, { ...y, skipChecks: !0 });
        return v instanceof Promise ? v.then((N) => m(N, h, y)) : m(v, h, y);
      }
      const b = l._zod.parse(h, y);
      if (b instanceof Promise) {
        if (y.async === !1)
          throw new Tl();
        return b.then((v) => s(v, r, y));
      }
      return s(b, r, y);
    };
  }
  Te(l, "~standard", () => ({
    validate: (s) => {
      try {
        const m = Hy(l, s);
        return m.success ? { value: m.data } : { issues: m.error?.issues };
      } catch {
        return By(l, s).then((h) => h.success ? { value: h.data } : { issues: h.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Gr = /* @__PURE__ */ C("$ZodString", (l, u) => {
  Ge.init(l, u), l._zod.pattern = [...l?._zod.bag?.patterns ?? []].pop() ?? m0(l._zod.bag), l._zod.parse = (o, r) => {
    if (u.coerce)
      try {
        o.value = String(o.value);
      } catch {
      }
    return typeof o.value == "string" || o.issues.push({
      expected: "string",
      code: "invalid_type",
      input: o.value,
      inst: l
    }), o;
  };
}), qe = /* @__PURE__ */ C("$ZodStringFormat", (l, u) => {
  cc.init(l, u), Gr.init(l, u);
}), D0 = /* @__PURE__ */ C("$ZodGUID", (l, u) => {
  u.pattern ?? (u.pattern = t0), qe.init(l, u);
}), R0 = /* @__PURE__ */ C("$ZodUUID", (l, u) => {
  if (u.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[u.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${u.version}"`);
    u.pattern ?? (u.pattern = Kh(r));
  } else
    u.pattern ?? (u.pattern = Kh());
  qe.init(l, u);
}), U0 = /* @__PURE__ */ C("$ZodEmail", (l, u) => {
  u.pattern ?? (u.pattern = n0), qe.init(l, u);
}), Z0 = /* @__PURE__ */ C("$ZodURL", (l, u) => {
  qe.init(l, u), l._zod.check = (o) => {
    try {
      const r = o.value.trim(), s = new URL(r);
      u.hostname && (u.hostname.lastIndex = 0, u.hostname.test(s.hostname) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: u.hostname.source,
        input: o.value,
        inst: l,
        continue: !u.abort
      })), u.protocol && (u.protocol.lastIndex = 0, u.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) || o.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: u.protocol.source,
        input: o.value,
        inst: l,
        continue: !u.abort
      })), u.normalize ? o.value = s.href : o.value = r;
      return;
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "url",
        input: o.value,
        inst: l,
        continue: !u.abort
      });
    }
  };
}), q0 = /* @__PURE__ */ C("$ZodEmoji", (l, u) => {
  u.pattern ?? (u.pattern = l0()), qe.init(l, u);
}), H0 = /* @__PURE__ */ C("$ZodNanoID", (l, u) => {
  u.pattern ?? (u.pattern = Py), qe.init(l, u);
}), B0 = /* @__PURE__ */ C("$ZodCUID", (l, u) => {
  u.pattern ?? (u.pattern = Ky), qe.init(l, u);
}), k0 = /* @__PURE__ */ C("$ZodCUID2", (l, u) => {
  u.pattern ?? (u.pattern = Jy), qe.init(l, u);
}), Y0 = /* @__PURE__ */ C("$ZodULID", (l, u) => {
  u.pattern ?? (u.pattern = Wy), qe.init(l, u);
}), L0 = /* @__PURE__ */ C("$ZodXID", (l, u) => {
  u.pattern ?? (u.pattern = Fy), qe.init(l, u);
}), G0 = /* @__PURE__ */ C("$ZodKSUID", (l, u) => {
  u.pattern ?? (u.pattern = Iy), qe.init(l, u);
}), X0 = /* @__PURE__ */ C("$ZodISODateTime", (l, u) => {
  u.pattern ?? (u.pattern = h0(u)), qe.init(l, u);
}), Q0 = /* @__PURE__ */ C("$ZodISODate", (l, u) => {
  u.pattern ?? (u.pattern = f0), qe.init(l, u);
}), V0 = /* @__PURE__ */ C("$ZodISOTime", (l, u) => {
  u.pattern ?? (u.pattern = d0(u)), qe.init(l, u);
}), $0 = /* @__PURE__ */ C("$ZodISODuration", (l, u) => {
  u.pattern ?? (u.pattern = e0), qe.init(l, u);
}), K0 = /* @__PURE__ */ C("$ZodIPv4", (l, u) => {
  u.pattern ?? (u.pattern = u0), qe.init(l, u), l._zod.bag.format = "ipv4";
}), J0 = /* @__PURE__ */ C("$ZodIPv6", (l, u) => {
  u.pattern ?? (u.pattern = i0), qe.init(l, u), l._zod.bag.format = "ipv6", l._zod.check = (o) => {
    try {
      new URL(`http://[${o.value}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: o.value,
        inst: l,
        continue: !u.abort
      });
    }
  };
}), W0 = /* @__PURE__ */ C("$ZodCIDRv4", (l, u) => {
  u.pattern ?? (u.pattern = c0), qe.init(l, u);
}), F0 = /* @__PURE__ */ C("$ZodCIDRv6", (l, u) => {
  u.pattern ?? (u.pattern = o0), qe.init(l, u), l._zod.check = (o) => {
    const r = o.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [s, m] = r;
      if (!m)
        throw new Error();
      const h = Number(m);
      if (`${h}` !== m)
        throw new Error();
      if (h < 0 || h > 128)
        throw new Error();
      new URL(`http://[${s}]`);
    } catch {
      o.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: o.value,
        inst: l,
        continue: !u.abort
      });
    }
  };
});
function Zm(l) {
  if (l === "")
    return !0;
  if (l.length % 4 !== 0)
    return !1;
  try {
    return atob(l), !0;
  } catch {
    return !1;
  }
}
const I0 = /* @__PURE__ */ C("$ZodBase64", (l, u) => {
  u.pattern ?? (u.pattern = r0), qe.init(l, u), l._zod.bag.contentEncoding = "base64", l._zod.check = (o) => {
    Zm(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64",
      input: o.value,
      inst: l,
      continue: !u.abort
    });
  };
});
function P0(l) {
  if (!jm.test(l))
    return !1;
  const u = l.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), o = u.padEnd(Math.ceil(u.length / 4) * 4, "=");
  return Zm(o);
}
const eg = /* @__PURE__ */ C("$ZodBase64URL", (l, u) => {
  u.pattern ?? (u.pattern = jm), qe.init(l, u), l._zod.bag.contentEncoding = "base64url", l._zod.check = (o) => {
    P0(o.value) || o.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: o.value,
      inst: l,
      continue: !u.abort
    });
  };
}), tg = /* @__PURE__ */ C("$ZodE164", (l, u) => {
  u.pattern ?? (u.pattern = s0), qe.init(l, u);
});
function ng(l, u = null) {
  try {
    const o = l.split(".");
    if (o.length !== 3)
      return !1;
    const [r] = o;
    if (!r)
      return !1;
    const s = JSON.parse(atob(r));
    return !("typ" in s && s?.typ !== "JWT" || !s.alg || u && (!("alg" in s) || s.alg !== u));
  } catch {
    return !1;
  }
}
const ag = /* @__PURE__ */ C("$ZodJWT", (l, u) => {
  qe.init(l, u), l._zod.check = (o) => {
    ng(o.value, u.alg) || o.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: o.value,
      inst: l,
      continue: !u.abort
    });
  };
}), qm = /* @__PURE__ */ C("$ZodNumber", (l, u) => {
  Ge.init(l, u), l._zod.pattern = l._zod.bag.pattern ?? Cm, l._zod.parse = (o, r) => {
    if (u.coerce)
      try {
        o.value = Number(o.value);
      } catch {
      }
    const s = o.value;
    if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s))
      return o;
    const m = typeof s == "number" ? Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity" : void 0;
    return o.issues.push({
      expected: "number",
      code: "invalid_type",
      input: s,
      inst: l,
      ...m ? { received: m } : {}
    }), o;
  };
}), lg = /* @__PURE__ */ C("$ZodNumberFormat", (l, u) => {
  _0.init(l, u), qm.init(l, u);
}), ug = /* @__PURE__ */ C("$ZodBoolean", (l, u) => {
  Ge.init(l, u), l._zod.pattern = v0, l._zod.parse = (o, r) => {
    if (u.coerce)
      try {
        o.value = !!o.value;
      } catch {
      }
    const s = o.value;
    return typeof s == "boolean" || o.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: s,
      inst: l
    }), o;
  };
}), ig = /* @__PURE__ */ C("$ZodUnknown", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o) => o;
}), cg = /* @__PURE__ */ C("$ZodNever", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o, r) => (o.issues.push({
    expected: "never",
    code: "invalid_type",
    input: o.value,
    inst: l
  }), o);
});
function Jh(l, u, o) {
  l.issues.length && u.issues.push(...xl(o, l.issues)), u.value[o] = l.value;
}
const og = /* @__PURE__ */ C("$ZodArray", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o, r) => {
    const s = o.value;
    if (!Array.isArray(s))
      return o.issues.push({
        expected: "array",
        code: "invalid_type",
        input: s,
        inst: l
      }), o;
    o.value = Array(s.length);
    const m = [];
    for (let h = 0; h < s.length; h++) {
      const y = s[h], b = u.element._zod.run({
        value: y,
        issues: []
      }, r);
      b instanceof Promise ? m.push(b.then((v) => Jh(v, o, h))) : Jh(b, o, h);
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
});
function ec(l, u, o, r, s) {
  if (l.issues.length) {
    if (s && !(o in r))
      return;
    u.issues.push(...xl(o, l.issues));
  }
  l.value === void 0 ? o in r && (u.value[o] = void 0) : u.value[o] = l.value;
}
function Hm(l) {
  const u = Object.keys(l.shape);
  for (const r of u)
    if (!l.shape?.[r]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`);
  const o = Ay(l.shape);
  return {
    ...l,
    keys: u,
    keySet: new Set(u),
    numKeys: u.length,
    optionalKeys: new Set(o)
  };
}
function Bm(l, u, o, r, s, m) {
  const h = [], y = s.keySet, b = s.catchall._zod, v = b.def.type, N = b.optout === "optional";
  for (const A in u) {
    if (y.has(A))
      continue;
    if (v === "never") {
      h.push(A);
      continue;
    }
    const Z = b.run({ value: u[A], issues: [] }, r);
    Z instanceof Promise ? l.push(Z.then((q) => ec(q, o, A, u, N))) : ec(Z, o, A, u, N);
  }
  return h.length && o.issues.push({
    code: "unrecognized_keys",
    keys: h,
    input: u,
    inst: m
  }), l.length ? Promise.all(l).then(() => o) : o;
}
const rg = /* @__PURE__ */ C("$ZodObject", (l, u) => {
  if (Ge.init(l, u), !Object.getOwnPropertyDescriptor(u, "shape")?.get) {
    const y = u.shape;
    Object.defineProperty(u, "shape", {
      get: () => {
        const b = { ...y };
        return Object.defineProperty(u, "shape", {
          value: b
        }), b;
      }
    });
  }
  const r = qr(() => Hm(u));
  Te(l._zod, "propValues", () => {
    const y = u.shape, b = {};
    for (const v in y) {
      const N = y[v]._zod;
      if (N.values) {
        b[v] ?? (b[v] = /* @__PURE__ */ new Set());
        for (const A of N.values)
          b[v].add(A);
      }
    }
    return b;
  });
  const s = Pi, m = u.catchall;
  let h;
  l._zod.parse = (y, b) => {
    h ?? (h = r.value);
    const v = y.value;
    if (!s(v))
      return y.issues.push({
        expected: "object",
        code: "invalid_type",
        input: v,
        inst: l
      }), y;
    y.value = {};
    const N = [], A = h.shape;
    for (const Z of h.keys) {
      const q = A[Z], ne = q._zod.optout === "optional", ee = q._zod.run({ value: v[Z], issues: [] }, b);
      ee instanceof Promise ? N.push(ee.then((ve) => ec(ve, y, Z, v, ne))) : ec(ee, y, Z, v, ne);
    }
    return m ? Bm(N, v, y, b, r.value, l) : N.length ? Promise.all(N).then(() => y) : y;
  };
}), sg = /* @__PURE__ */ C("$ZodObjectJIT", (l, u) => {
  rg.init(l, u);
  const o = l._zod.parse, r = qr(() => Hm(u)), s = (Z) => {
    const q = new M0(["shape", "payload", "ctx"]), ne = r.value, ee = (ge) => {
      const V = $h(ge);
      return `shape[${V}]._zod.run({ value: input[${V}], issues: [] }, ctx)`;
    };
    q.write("const input = payload.value;");
    const ve = /* @__PURE__ */ Object.create(null);
    let Ue = 0;
    for (const ge of ne.keys)
      ve[ge] = `key_${Ue++}`;
    q.write("const newResult = {};");
    for (const ge of ne.keys) {
      const V = ve[ge], he = $h(ge), ae = Z[ge]?._zod?.optout === "optional";
      q.write(`const ${V} = ${ee(ge)};`), ae ? q.write(`
        if (${V}.issues.length) {
          if (${he} in input) {
            payload.issues = payload.issues.concat(${V}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${he}, ...iss.path] : [${he}]
            })));
          }
        }
        
        if (${V}.value === undefined) {
          if (${he} in input) {
            newResult[${he}] = undefined;
          }
        } else {
          newResult[${he}] = ${V}.value;
        }
        
      `) : q.write(`
        if (${V}.issues.length) {
          payload.issues = payload.issues.concat(${V}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${he}, ...iss.path] : [${he}]
          })));
        }
        
        if (${V}.value === undefined) {
          if (${he} in input) {
            newResult[${he}] = undefined;
          }
        } else {
          newResult[${he}] = ${V}.value;
        }
        
      `);
    }
    q.write("payload.value = newResult;"), q.write("return payload;");
    const ke = q.compile();
    return (ge, V) => ke(Z, ge, V);
  };
  let m;
  const h = Pi, y = !zm.jitless, v = y && Ty.value, N = u.catchall;
  let A;
  l._zod.parse = (Z, q) => {
    A ?? (A = r.value);
    const ne = Z.value;
    return h(ne) ? y && v && q?.async === !1 && q.jitless !== !0 ? (m || (m = s(u.shape)), Z = m(Z, q), N ? Bm([], ne, Z, q, A, l) : Z) : o(Z, q) : (Z.issues.push({
      expected: "object",
      code: "invalid_type",
      input: ne,
      inst: l
    }), Z);
  };
});
function Wh(l, u, o, r) {
  for (const m of l)
    if (m.issues.length === 0)
      return u.value = m.value, u;
  const s = l.filter((m) => !zl(m));
  return s.length === 1 ? (u.value = s[0].value, s[0]) : (u.issues.push({
    code: "invalid_union",
    input: u.value,
    inst: o,
    errors: l.map((m) => m.issues.map((h) => ua(h, r, la())))
  }), u);
}
const fg = /* @__PURE__ */ C("$ZodUnion", (l, u) => {
  Ge.init(l, u), Te(l._zod, "optin", () => u.options.some((s) => s._zod.optin === "optional") ? "optional" : void 0), Te(l._zod, "optout", () => u.options.some((s) => s._zod.optout === "optional") ? "optional" : void 0), Te(l._zod, "values", () => {
    if (u.options.every((s) => s._zod.values))
      return new Set(u.options.flatMap((s) => Array.from(s._zod.values)));
  }), Te(l._zod, "pattern", () => {
    if (u.options.every((s) => s._zod.pattern)) {
      const s = u.options.map((m) => m._zod.pattern);
      return new RegExp(`^(${s.map((m) => Br(m.source)).join("|")})$`);
    }
  });
  const o = u.options.length === 1, r = u.options[0]._zod.run;
  l._zod.parse = (s, m) => {
    if (o)
      return r(s, m);
    let h = !1;
    const y = [];
    for (const b of u.options) {
      const v = b._zod.run({
        value: s.value,
        issues: []
      }, m);
      if (v instanceof Promise)
        y.push(v), h = !0;
      else {
        if (v.issues.length === 0)
          return v;
        y.push(v);
      }
    }
    return h ? Promise.all(y).then((b) => Wh(b, s, l, m)) : Wh(y, s, l, m);
  };
}), dg = /* @__PURE__ */ C("$ZodIntersection", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o, r) => {
    const s = o.value, m = u.left._zod.run({ value: s, issues: [] }, r), h = u.right._zod.run({ value: s, issues: [] }, r);
    return m instanceof Promise || h instanceof Promise ? Promise.all([m, h]).then(([b, v]) => Fh(o, b, v)) : Fh(o, m, h);
  };
});
function Dr(l, u) {
  if (l === u)
    return { valid: !0, data: l };
  if (l instanceof Date && u instanceof Date && +l == +u)
    return { valid: !0, data: l };
  if (Ol(l) && Ol(u)) {
    const o = Object.keys(u), r = Object.keys(l).filter((m) => o.indexOf(m) !== -1), s = { ...l, ...u };
    for (const m of r) {
      const h = Dr(l[m], u[m]);
      if (!h.valid)
        return {
          valid: !1,
          mergeErrorPath: [m, ...h.mergeErrorPath]
        };
      s[m] = h.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(l) && Array.isArray(u)) {
    if (l.length !== u.length)
      return { valid: !1, mergeErrorPath: [] };
    const o = [];
    for (let r = 0; r < l.length; r++) {
      const s = l[r], m = u[r], h = Dr(s, m);
      if (!h.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...h.mergeErrorPath]
        };
      o.push(h.data);
    }
    return { valid: !0, data: o };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Fh(l, u, o) {
  const r = /* @__PURE__ */ new Map();
  let s;
  for (const y of u.issues)
    if (y.code === "unrecognized_keys") {
      s ?? (s = y);
      for (const b of y.keys)
        r.has(b) || r.set(b, {}), r.get(b).l = !0;
    } else
      l.issues.push(y);
  for (const y of o.issues)
    if (y.code === "unrecognized_keys")
      for (const b of y.keys)
        r.has(b) || r.set(b, {}), r.get(b).r = !0;
    else
      l.issues.push(y);
  const m = [...r].filter(([, y]) => y.l && y.r).map(([y]) => y);
  if (m.length && s && l.issues.push({ ...s, keys: m }), zl(l))
    return l;
  const h = Dr(u.value, o.value);
  if (!h.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(h.mergeErrorPath)}`);
  return l.value = h.data, l;
}
const hg = /* @__PURE__ */ C("$ZodRecord", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o, r) => {
    const s = o.value;
    if (!Ol(s))
      return o.issues.push({
        expected: "record",
        code: "invalid_type",
        input: s,
        inst: l
      }), o;
    const m = [], h = u.keyType._zod.values;
    if (h) {
      o.value = {};
      const y = /* @__PURE__ */ new Set();
      for (const v of h)
        if (typeof v == "string" || typeof v == "number" || typeof v == "symbol") {
          y.add(typeof v == "number" ? v.toString() : v);
          const N = u.valueType._zod.run({ value: s[v], issues: [] }, r);
          N instanceof Promise ? m.push(N.then((A) => {
            A.issues.length && o.issues.push(...xl(v, A.issues)), o.value[v] = A.value;
          })) : (N.issues.length && o.issues.push(...xl(v, N.issues)), o.value[v] = N.value);
        }
      let b;
      for (const v in s)
        y.has(v) || (b = b ?? [], b.push(v));
      b && b.length > 0 && o.issues.push({
        code: "unrecognized_keys",
        input: s,
        inst: l,
        keys: b
      });
    } else {
      o.value = {};
      for (const y of Reflect.ownKeys(s)) {
        if (y === "__proto__")
          continue;
        let b = u.keyType._zod.run({ value: y, issues: [] }, r);
        if (b instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof y == "string" && Cm.test(y) && b.issues.length && b.issues.some((A) => A.code === "invalid_type" && A.expected === "number")) {
          const A = u.keyType._zod.run({ value: Number(y), issues: [] }, r);
          if (A instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          A.issues.length === 0 && (b = A);
        }
        if (b.issues.length) {
          u.mode === "loose" ? o.value[y] = s[y] : o.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: b.issues.map((A) => ua(A, r, la())),
            input: y,
            path: [y],
            inst: l
          });
          continue;
        }
        const N = u.valueType._zod.run({ value: s[y], issues: [] }, r);
        N instanceof Promise ? m.push(N.then((A) => {
          A.issues.length && o.issues.push(...xl(y, A.issues)), o.value[b.value] = A.value;
        })) : (N.issues.length && o.issues.push(...xl(y, N.issues)), o.value[b.value] = N.value);
      }
    }
    return m.length ? Promise.all(m).then(() => o) : o;
  };
}), mg = /* @__PURE__ */ C("$ZodEnum", (l, u) => {
  Ge.init(l, u);
  const o = xm(u.entries), r = new Set(o);
  l._zod.values = r, l._zod.pattern = new RegExp(`^(${o.filter((s) => Oy.has(typeof s)).map((s) => typeof s == "string" ? lc(s) : s.toString()).join("|")})$`), l._zod.parse = (s, m) => {
    const h = s.value;
    return r.has(h) || s.issues.push({
      code: "invalid_value",
      values: o,
      input: h,
      inst: l
    }), s;
  };
}), pg = /* @__PURE__ */ C("$ZodTransform", (l, u) => {
  Ge.init(l, u), l._zod.parse = (o, r) => {
    if (r.direction === "backward")
      throw new Sm(l.constructor.name);
    const s = u.transform(o.value, o);
    if (r.async)
      return (s instanceof Promise ? s : Promise.resolve(s)).then((h) => (o.value = h, o));
    if (s instanceof Promise)
      throw new Tl();
    return o.value = s, o;
  };
});
function Ih(l, u) {
  return l.issues.length && u === void 0 ? { issues: [], value: void 0 } : l;
}
const km = /* @__PURE__ */ C("$ZodOptional", (l, u) => {
  Ge.init(l, u), l._zod.optin = "optional", l._zod.optout = "optional", Te(l._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, void 0]) : void 0), Te(l._zod, "pattern", () => {
    const o = u.innerType._zod.pattern;
    return o ? new RegExp(`^(${Br(o.source)})?$`) : void 0;
  }), l._zod.parse = (o, r) => {
    if (u.innerType._zod.optin === "optional") {
      const s = u.innerType._zod.run(o, r);
      return s instanceof Promise ? s.then((m) => Ih(m, o.value)) : Ih(s, o.value);
    }
    return o.value === void 0 ? o : u.innerType._zod.run(o, r);
  };
}), vg = /* @__PURE__ */ C("$ZodExactOptional", (l, u) => {
  km.init(l, u), Te(l._zod, "values", () => u.innerType._zod.values), Te(l._zod, "pattern", () => u.innerType._zod.pattern), l._zod.parse = (o, r) => u.innerType._zod.run(o, r);
}), yg = /* @__PURE__ */ C("$ZodNullable", (l, u) => {
  Ge.init(l, u), Te(l._zod, "optin", () => u.innerType._zod.optin), Te(l._zod, "optout", () => u.innerType._zod.optout), Te(l._zod, "pattern", () => {
    const o = u.innerType._zod.pattern;
    return o ? new RegExp(`^(${Br(o.source)}|null)$`) : void 0;
  }), Te(l._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, null]) : void 0), l._zod.parse = (o, r) => o.value === null ? o : u.innerType._zod.run(o, r);
}), gg = /* @__PURE__ */ C("$ZodDefault", (l, u) => {
  Ge.init(l, u), l._zod.optin = "optional", Te(l._zod, "values", () => u.innerType._zod.values), l._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return u.innerType._zod.run(o, r);
    if (o.value === void 0)
      return o.value = u.defaultValue, o;
    const s = u.innerType._zod.run(o, r);
    return s instanceof Promise ? s.then((m) => Ph(m, u)) : Ph(s, u);
  };
});
function Ph(l, u) {
  return l.value === void 0 && (l.value = u.defaultValue), l;
}
const bg = /* @__PURE__ */ C("$ZodPrefault", (l, u) => {
  Ge.init(l, u), l._zod.optin = "optional", Te(l._zod, "values", () => u.innerType._zod.values), l._zod.parse = (o, r) => (r.direction === "backward" || o.value === void 0 && (o.value = u.defaultValue), u.innerType._zod.run(o, r));
}), _g = /* @__PURE__ */ C("$ZodNonOptional", (l, u) => {
  Ge.init(l, u), Te(l._zod, "values", () => {
    const o = u.innerType._zod.values;
    return o ? new Set([...o].filter((r) => r !== void 0)) : void 0;
  }), l._zod.parse = (o, r) => {
    const s = u.innerType._zod.run(o, r);
    return s instanceof Promise ? s.then((m) => em(m, l)) : em(s, l);
  };
});
function em(l, u) {
  return !l.issues.length && l.value === void 0 && l.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: l.value,
    inst: u
  }), l;
}
const Sg = /* @__PURE__ */ C("$ZodCatch", (l, u) => {
  Ge.init(l, u), Te(l._zod, "optin", () => u.innerType._zod.optin), Te(l._zod, "optout", () => u.innerType._zod.optout), Te(l._zod, "values", () => u.innerType._zod.values), l._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return u.innerType._zod.run(o, r);
    const s = u.innerType._zod.run(o, r);
    return s instanceof Promise ? s.then((m) => (o.value = m.value, m.issues.length && (o.value = u.catchValue({
      ...o,
      error: {
        issues: m.issues.map((h) => ua(h, r, la()))
      },
      input: o.value
    }), o.issues = []), o)) : (o.value = s.value, s.issues.length && (o.value = u.catchValue({
      ...o,
      error: {
        issues: s.issues.map((m) => ua(m, r, la()))
      },
      input: o.value
    }), o.issues = []), o);
  };
}), zg = /* @__PURE__ */ C("$ZodPipe", (l, u) => {
  Ge.init(l, u), Te(l._zod, "values", () => u.in._zod.values), Te(l._zod, "optin", () => u.in._zod.optin), Te(l._zod, "optout", () => u.out._zod.optout), Te(l._zod, "propValues", () => u.in._zod.propValues), l._zod.parse = (o, r) => {
    if (r.direction === "backward") {
      const m = u.out._zod.run(o, r);
      return m instanceof Promise ? m.then((h) => Fi(h, u.in, r)) : Fi(m, u.in, r);
    }
    const s = u.in._zod.run(o, r);
    return s instanceof Promise ? s.then((m) => Fi(m, u.out, r)) : Fi(s, u.out, r);
  };
});
function Fi(l, u, o) {
  return l.issues.length ? (l.aborted = !0, l) : u._zod.run({ value: l.value, issues: l.issues }, o);
}
const xg = /* @__PURE__ */ C("$ZodReadonly", (l, u) => {
  Ge.init(l, u), Te(l._zod, "propValues", () => u.innerType._zod.propValues), Te(l._zod, "values", () => u.innerType._zod.values), Te(l._zod, "optin", () => u.innerType?._zod?.optin), Te(l._zod, "optout", () => u.innerType?._zod?.optout), l._zod.parse = (o, r) => {
    if (r.direction === "backward")
      return u.innerType._zod.run(o, r);
    const s = u.innerType._zod.run(o, r);
    return s instanceof Promise ? s.then(tm) : tm(s);
  };
});
function tm(l) {
  return l.value = Object.freeze(l.value), l;
}
const Eg = /* @__PURE__ */ C("$ZodCustom", (l, u) => {
  Tt.init(l, u), Ge.init(l, u), l._zod.parse = (o, r) => o, l._zod.check = (o) => {
    const r = o.value, s = u.fn(r);
    if (s instanceof Promise)
      return s.then((m) => nm(m, o, r, l));
    nm(s, o, r, l);
  };
});
function nm(l, u, o, r) {
  if (!l) {
    const s = {
      code: "custom",
      input: o,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (s.params = r._zod.def.params), u.issues.push(ju(s));
  }
}
var am;
class Tg {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(u, ...o) {
    const r = o[0];
    return this._map.set(u, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, u), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(u) {
    const o = this._map.get(u);
    return o && typeof o == "object" && "id" in o && this._idmap.delete(o.id), this._map.delete(u), this;
  }
  get(u) {
    const o = u._zod.parent;
    if (o) {
      const r = { ...this.get(o) ?? {} };
      delete r.id;
      const s = { ...r, ...this._map.get(u) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(u);
  }
  has(u) {
    return this._map.has(u);
  }
}
function Og() {
  return new Tg();
}
(am = globalThis).__zod_globalRegistry ?? (am.__zod_globalRegistry = Og());
const Au = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Ag(l, u) {
  return new l({
    type: "string",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Ng(l, u) {
  return new l({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function lm(l, u) {
  return new l({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function jg(l, u) {
  return new l({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function wg(l, u) {
  return new l({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Mg(l, u) {
  return new l({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Cg(l, u) {
  return new l({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Dg(l, u) {
  return new l({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Rg(l, u) {
  return new l({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Ug(l, u) {
  return new l({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Zg(l, u) {
  return new l({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function qg(l, u) {
  return new l({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Hg(l, u) {
  return new l({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Bg(l, u) {
  return new l({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function kg(l, u) {
  return new l({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Yg(l, u) {
  return new l({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Lg(l, u) {
  return new l({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Gg(l, u) {
  return new l({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Xg(l, u) {
  return new l({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Qg(l, u) {
  return new l({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Vg(l, u) {
  return new l({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function $g(l, u) {
  return new l({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Kg(l, u) {
  return new l({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Jg(l, u) {
  return new l({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Wg(l, u) {
  return new l({
    type: "string",
    format: "date",
    check: "string_format",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Fg(l, u) {
  return new l({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Ig(l, u) {
  return new l({
    type: "string",
    format: "duration",
    check: "string_format",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Pg(l, u) {
  return new l({
    type: "number",
    checks: [],
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function e1(l, u) {
  return new l({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function t1(l, u) {
  return new l({
    type: "boolean",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function n1(l) {
  return new l({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function a1(l, u) {
  return new l({
    type: "never",
    ...K(u)
  });
}
// @__NO_SIDE_EFFECTS__
function um(l, u) {
  return new Rm({
    check: "less_than",
    ...K(u),
    value: l,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Ar(l, u) {
  return new Rm({
    check: "less_than",
    ...K(u),
    value: l,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function im(l, u) {
  return new Um({
    check: "greater_than",
    ...K(u),
    value: l,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Nr(l, u) {
  return new Um({
    check: "greater_than",
    ...K(u),
    value: l,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function cm(l, u) {
  return new b0({
    check: "multiple_of",
    ...K(u),
    value: l
  });
}
// @__NO_SIDE_EFFECTS__
function Ym(l, u) {
  return new S0({
    check: "max_length",
    ...K(u),
    maximum: l
  });
}
// @__NO_SIDE_EFFECTS__
function tc(l, u) {
  return new z0({
    check: "min_length",
    ...K(u),
    minimum: l
  });
}
// @__NO_SIDE_EFFECTS__
function Lm(l, u) {
  return new x0({
    check: "length_equals",
    ...K(u),
    length: l
  });
}
// @__NO_SIDE_EFFECTS__
function l1(l, u) {
  return new E0({
    check: "string_format",
    format: "regex",
    ...K(u),
    pattern: l
  });
}
// @__NO_SIDE_EFFECTS__
function u1(l) {
  return new T0({
    check: "string_format",
    format: "lowercase",
    ...K(l)
  });
}
// @__NO_SIDE_EFFECTS__
function i1(l) {
  return new O0({
    check: "string_format",
    format: "uppercase",
    ...K(l)
  });
}
// @__NO_SIDE_EFFECTS__
function c1(l, u) {
  return new A0({
    check: "string_format",
    format: "includes",
    ...K(u),
    includes: l
  });
}
// @__NO_SIDE_EFFECTS__
function o1(l, u) {
  return new N0({
    check: "string_format",
    format: "starts_with",
    ...K(u),
    prefix: l
  });
}
// @__NO_SIDE_EFFECTS__
function r1(l, u) {
  return new j0({
    check: "string_format",
    format: "ends_with",
    ...K(u),
    suffix: l
  });
}
// @__NO_SIDE_EFFECTS__
function Nl(l) {
  return new w0({
    check: "overwrite",
    tx: l
  });
}
// @__NO_SIDE_EFFECTS__
function s1(l) {
  return /* @__PURE__ */ Nl((u) => u.normalize(l));
}
// @__NO_SIDE_EFFECTS__
function f1() {
  return /* @__PURE__ */ Nl((l) => l.trim());
}
// @__NO_SIDE_EFFECTS__
function d1() {
  return /* @__PURE__ */ Nl((l) => l.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function h1() {
  return /* @__PURE__ */ Nl((l) => l.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function m1() {
  return /* @__PURE__ */ Nl((l) => Ey(l));
}
// @__NO_SIDE_EFFECTS__
function p1(l, u, o) {
  return new l({
    type: "array",
    element: u,
    // get element() {
    //   return element;
    // },
    ...K(o)
  });
}
// @__NO_SIDE_EFFECTS__
function v1(l, u, o) {
  return new l({
    type: "custom",
    check: "custom",
    fn: u,
    ...K(o)
  });
}
// @__NO_SIDE_EFFECTS__
function y1(l) {
  const u = /* @__PURE__ */ g1((o) => (o.addIssue = (r) => {
    if (typeof r == "string")
      o.issues.push(ju(r, o.value, u._zod.def));
    else {
      const s = r;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = o.value), s.inst ?? (s.inst = u), s.continue ?? (s.continue = !u._zod.def.abort), o.issues.push(ju(s));
    }
  }, l(o.value, o)));
  return u;
}
// @__NO_SIDE_EFFECTS__
function g1(l, u) {
  const o = new Tt({
    check: "custom",
    ...K(u)
  });
  return o._zod.check = l, o;
}
function Gm(l) {
  let u = l?.target ?? "draft-2020-12";
  return u === "draft-4" && (u = "draft-04"), u === "draft-7" && (u = "draft-07"), {
    processors: l.processors ?? {},
    metadataRegistry: l?.metadata ?? Au,
    target: u,
    unrepresentable: l?.unrepresentable ?? "throw",
    override: l?.override ?? (() => {
    }),
    io: l?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: l?.cycles ?? "ref",
    reused: l?.reused ?? "inline",
    external: l?.external ?? void 0
  };
}
function Ie(l, u, o = { path: [], schemaPath: [] }) {
  var r;
  const s = l._zod.def, m = u.seen.get(l);
  if (m)
    return m.count++, o.schemaPath.includes(l) && (m.cycle = o.path), m.schema;
  const h = { schema: {}, count: 1, cycle: void 0, path: o.path };
  u.seen.set(l, h);
  const y = l._zod.toJSONSchema?.();
  if (y)
    h.schema = y;
  else {
    const N = {
      ...o,
      schemaPath: [...o.schemaPath, l],
      path: o.path
    };
    if (l._zod.processJSONSchema)
      l._zod.processJSONSchema(u, h.schema, N);
    else {
      const Z = h.schema, q = u.processors[s.type];
      if (!q)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
      q(l, u, Z, N);
    }
    const A = l._zod.parent;
    A && (h.ref || (h.ref = A), Ie(A, u, N), u.seen.get(A).isParent = !0);
  }
  const b = u.metadataRegistry.get(l);
  return b && Object.assign(h.schema, b), u.io === "input" && yt(l) && (delete h.schema.examples, delete h.schema.default), u.io === "input" && h.schema._prefault && ((r = h.schema).default ?? (r.default = h.schema._prefault)), delete h.schema._prefault, u.seen.get(l).schema;
}
function Xm(l, u) {
  const o = l.seen.get(u);
  if (!o)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = /* @__PURE__ */ new Map();
  for (const h of l.seen.entries()) {
    const y = l.metadataRegistry.get(h[0])?.id;
    if (y) {
      const b = r.get(y);
      if (b && b !== h[0])
        throw new Error(`Duplicate schema id "${y}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(y, h[0]);
    }
  }
  const s = (h) => {
    const y = l.target === "draft-2020-12" ? "$defs" : "definitions";
    if (l.external) {
      const A = l.external.registry.get(h[0])?.id, Z = l.external.uri ?? ((ne) => ne);
      if (A)
        return { ref: Z(A) };
      const q = h[1].defId ?? h[1].schema.id ?? `schema${l.counter++}`;
      return h[1].defId = q, { defId: q, ref: `${Z("__shared")}#/${y}/${q}` };
    }
    if (h[1] === o)
      return { ref: "#" };
    const v = `#/${y}/`, N = h[1].schema.id ?? `__schema${l.counter++}`;
    return { defId: N, ref: v + N };
  }, m = (h) => {
    if (h[1].schema.$ref)
      return;
    const y = h[1], { ref: b, defId: v } = s(h);
    y.def = { ...y.schema }, v && (y.defId = v);
    const N = y.schema;
    for (const A in N)
      delete N[A];
    N.$ref = b;
  };
  if (l.cycles === "throw")
    for (const h of l.seen.entries()) {
      const y = h[1];
      if (y.cycle)
        throw new Error(`Cycle detected: #/${y.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const h of l.seen.entries()) {
    const y = h[1];
    if (u === h[0]) {
      m(h);
      continue;
    }
    if (l.external) {
      const v = l.external.registry.get(h[0])?.id;
      if (u !== h[0] && v) {
        m(h);
        continue;
      }
    }
    if (l.metadataRegistry.get(h[0])?.id) {
      m(h);
      continue;
    }
    if (y.cycle) {
      m(h);
      continue;
    }
    if (y.count > 1 && l.reused === "ref") {
      m(h);
      continue;
    }
  }
}
function Qm(l, u) {
  const o = l.seen.get(u);
  if (!o)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (h) => {
    const y = l.seen.get(h);
    if (y.ref === null)
      return;
    const b = y.def ?? y.schema, v = { ...b }, N = y.ref;
    if (y.ref = null, N) {
      r(N);
      const Z = l.seen.get(N), q = Z.schema;
      if (q.$ref && (l.target === "draft-07" || l.target === "draft-04" || l.target === "openapi-3.0") ? (b.allOf = b.allOf ?? [], b.allOf.push(q)) : Object.assign(b, q), Object.assign(b, v), h._zod.parent === N)
        for (const ee in b)
          ee === "$ref" || ee === "allOf" || ee in v || delete b[ee];
      if (q.$ref)
        for (const ee in b)
          ee === "$ref" || ee === "allOf" || ee in Z.def && JSON.stringify(b[ee]) === JSON.stringify(Z.def[ee]) && delete b[ee];
    }
    const A = h._zod.parent;
    if (A && A !== N) {
      r(A);
      const Z = l.seen.get(A);
      if (Z?.schema.$ref && (b.$ref = Z.schema.$ref, Z.def))
        for (const q in b)
          q === "$ref" || q === "allOf" || q in Z.def && JSON.stringify(b[q]) === JSON.stringify(Z.def[q]) && delete b[q];
    }
    l.override({
      zodSchema: h,
      jsonSchema: b,
      path: y.path ?? []
    });
  };
  for (const h of [...l.seen.entries()].reverse())
    r(h[0]);
  const s = {};
  if (l.target === "draft-2020-12" ? s.$schema = "https://json-schema.org/draft/2020-12/schema" : l.target === "draft-07" ? s.$schema = "http://json-schema.org/draft-07/schema#" : l.target === "draft-04" ? s.$schema = "http://json-schema.org/draft-04/schema#" : l.target, l.external?.uri) {
    const h = l.external.registry.get(u)?.id;
    if (!h)
      throw new Error("Schema is missing an `id` property");
    s.$id = l.external.uri(h);
  }
  Object.assign(s, o.def ?? o.schema);
  const m = l.external?.defs ?? {};
  for (const h of l.seen.entries()) {
    const y = h[1];
    y.def && y.defId && (m[y.defId] = y.def);
  }
  l.external || Object.keys(m).length > 0 && (l.target === "draft-2020-12" ? s.$defs = m : s.definitions = m);
  try {
    const h = JSON.parse(JSON.stringify(s));
    return Object.defineProperty(h, "~standard", {
      value: {
        ...u["~standard"],
        jsonSchema: {
          input: nc(u, "input", l.processors),
          output: nc(u, "output", l.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), h;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function yt(l, u) {
  const o = u ?? { seen: /* @__PURE__ */ new Set() };
  if (o.seen.has(l))
    return !1;
  o.seen.add(l);
  const r = l._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return yt(r.element, o);
  if (r.type === "set")
    return yt(r.valueType, o);
  if (r.type === "lazy")
    return yt(r.getter(), o);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return yt(r.innerType, o);
  if (r.type === "intersection")
    return yt(r.left, o) || yt(r.right, o);
  if (r.type === "record" || r.type === "map")
    return yt(r.keyType, o) || yt(r.valueType, o);
  if (r.type === "pipe")
    return yt(r.in, o) || yt(r.out, o);
  if (r.type === "object") {
    for (const s in r.shape)
      if (yt(r.shape[s], o))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const s of r.options)
      if (yt(s, o))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const s of r.items)
      if (yt(s, o))
        return !0;
    return !!(r.rest && yt(r.rest, o));
  }
  return !1;
}
const b1 = (l, u = {}) => (o) => {
  const r = Gm({ ...o, processors: u });
  return Ie(l, r), Xm(r, l), Qm(r, l);
}, nc = (l, u, o = {}) => (r) => {
  const { libraryOptions: s, target: m } = r ?? {}, h = Gm({ ...s ?? {}, target: m, io: u, processors: o });
  return Ie(l, h), Xm(h, l), Qm(h, l);
}, _1 = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, S1 = (l, u, o, r) => {
  const s = o;
  s.type = "string";
  const { minimum: m, maximum: h, format: y, patterns: b, contentEncoding: v } = l._zod.bag;
  if (typeof m == "number" && (s.minLength = m), typeof h == "number" && (s.maxLength = h), y && (s.format = _1[y] ?? y, s.format === "" && delete s.format, y === "time" && delete s.format), v && (s.contentEncoding = v), b && b.size > 0) {
    const N = [...b];
    N.length === 1 ? s.pattern = N[0].source : N.length > 1 && (s.allOf = [
      ...N.map((A) => ({
        ...u.target === "draft-07" || u.target === "draft-04" || u.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: A.source
      }))
    ]);
  }
}, z1 = (l, u, o, r) => {
  const s = o, { minimum: m, maximum: h, format: y, multipleOf: b, exclusiveMaximum: v, exclusiveMinimum: N } = l._zod.bag;
  typeof y == "string" && y.includes("int") ? s.type = "integer" : s.type = "number", typeof N == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (s.minimum = N, s.exclusiveMinimum = !0) : s.exclusiveMinimum = N), typeof m == "number" && (s.minimum = m, typeof N == "number" && u.target !== "draft-04" && (N >= m ? delete s.minimum : delete s.exclusiveMinimum)), typeof v == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (s.maximum = v, s.exclusiveMaximum = !0) : s.exclusiveMaximum = v), typeof h == "number" && (s.maximum = h, typeof v == "number" && u.target !== "draft-04" && (v <= h ? delete s.maximum : delete s.exclusiveMaximum)), typeof b == "number" && (s.multipleOf = b);
}, x1 = (l, u, o, r) => {
  o.type = "boolean";
}, E1 = (l, u, o, r) => {
  o.not = {};
}, T1 = (l, u, o, r) => {
}, O1 = (l, u, o, r) => {
  const s = l._zod.def, m = xm(s.entries);
  m.every((h) => typeof h == "number") && (o.type = "number"), m.every((h) => typeof h == "string") && (o.type = "string"), o.enum = m;
}, A1 = (l, u, o, r) => {
  if (u.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, N1 = (l, u, o, r) => {
  if (u.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, j1 = (l, u, o, r) => {
  const s = o, m = l._zod.def, { minimum: h, maximum: y } = l._zod.bag;
  typeof h == "number" && (s.minItems = h), typeof y == "number" && (s.maxItems = y), s.type = "array", s.items = Ie(m.element, u, { ...r, path: [...r.path, "items"] });
}, w1 = (l, u, o, r) => {
  const s = o, m = l._zod.def;
  s.type = "object", s.properties = {};
  const h = m.shape;
  for (const v in h)
    s.properties[v] = Ie(h[v], u, {
      ...r,
      path: [...r.path, "properties", v]
    });
  const y = new Set(Object.keys(h)), b = new Set([...y].filter((v) => {
    const N = m.shape[v]._zod;
    return u.io === "input" ? N.optin === void 0 : N.optout === void 0;
  }));
  b.size > 0 && (s.required = Array.from(b)), m.catchall?._zod.def.type === "never" ? s.additionalProperties = !1 : m.catchall ? m.catchall && (s.additionalProperties = Ie(m.catchall, u, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : u.io === "output" && (s.additionalProperties = !1);
}, M1 = (l, u, o, r) => {
  const s = l._zod.def, m = s.inclusive === !1, h = s.options.map((y, b) => Ie(y, u, {
    ...r,
    path: [...r.path, m ? "oneOf" : "anyOf", b]
  }));
  m ? o.oneOf = h : o.anyOf = h;
}, C1 = (l, u, o, r) => {
  const s = l._zod.def, m = Ie(s.left, u, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), h = Ie(s.right, u, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), y = (v) => "allOf" in v && Object.keys(v).length === 1, b = [
    ...y(m) ? m.allOf : [m],
    ...y(h) ? h.allOf : [h]
  ];
  o.allOf = b;
}, D1 = (l, u, o, r) => {
  const s = o, m = l._zod.def;
  s.type = "object";
  const h = m.keyType, b = h._zod.bag?.patterns;
  if (m.mode === "loose" && b && b.size > 0) {
    const N = Ie(m.valueType, u, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    s.patternProperties = {};
    for (const A of b)
      s.patternProperties[A.source] = N;
  } else
    (u.target === "draft-07" || u.target === "draft-2020-12") && (s.propertyNames = Ie(m.keyType, u, {
      ...r,
      path: [...r.path, "propertyNames"]
    })), s.additionalProperties = Ie(m.valueType, u, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  const v = h._zod.values;
  if (v) {
    const N = [...v].filter((A) => typeof A == "string" || typeof A == "number");
    N.length > 0 && (s.required = N);
  }
}, R1 = (l, u, o, r) => {
  const s = l._zod.def, m = Ie(s.innerType, u, r), h = u.seen.get(l);
  u.target === "openapi-3.0" ? (h.ref = s.innerType, o.nullable = !0) : o.anyOf = [m, { type: "null" }];
}, U1 = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType;
}, Z1 = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType, o.default = JSON.parse(JSON.stringify(s.defaultValue));
}, q1 = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType, u.io === "input" && (o._prefault = JSON.parse(JSON.stringify(s.defaultValue)));
}, H1 = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType;
  let h;
  try {
    h = s.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  o.default = h;
}, B1 = (l, u, o, r) => {
  const s = l._zod.def, m = u.io === "input" ? s.in._zod.def.type === "transform" ? s.out : s.in : s.out;
  Ie(m, u, r);
  const h = u.seen.get(l);
  h.ref = m;
}, k1 = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType, o.readOnly = !0;
}, Vm = (l, u, o, r) => {
  const s = l._zod.def;
  Ie(s.innerType, u, r);
  const m = u.seen.get(l);
  m.ref = s.innerType;
}, Y1 = /* @__PURE__ */ C("ZodISODateTime", (l, u) => {
  X0.init(l, u), Be.init(l, u);
});
function L1(l) {
  return /* @__PURE__ */ Jg(Y1, l);
}
const G1 = /* @__PURE__ */ C("ZodISODate", (l, u) => {
  Q0.init(l, u), Be.init(l, u);
});
function X1(l) {
  return /* @__PURE__ */ Wg(G1, l);
}
const Q1 = /* @__PURE__ */ C("ZodISOTime", (l, u) => {
  V0.init(l, u), Be.init(l, u);
});
function V1(l) {
  return /* @__PURE__ */ Fg(Q1, l);
}
const $1 = /* @__PURE__ */ C("ZodISODuration", (l, u) => {
  $0.init(l, u), Be.init(l, u);
});
function K1(l) {
  return /* @__PURE__ */ Ig($1, l);
}
const J1 = (l, u) => {
  Am.init(l, u), l.name = "ZodError", Object.defineProperties(l, {
    format: {
      value: (o) => qy(l, o)
      // enumerable: false,
    },
    flatten: {
      value: (o) => Zy(l, o)
      // enumerable: false,
    },
    addIssue: {
      value: (o) => {
        l.issues.push(o), l.message = JSON.stringify(l.issues, Cr, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (o) => {
        l.issues.push(...o), l.message = JSON.stringify(l.issues, Cr, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return l.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, Ft = C("ZodError", J1, {
  Parent: Error
}), W1 = /* @__PURE__ */ Yr(Ft), F1 = /* @__PURE__ */ Lr(Ft), I1 = /* @__PURE__ */ uc(Ft), P1 = /* @__PURE__ */ ic(Ft), e2 = /* @__PURE__ */ ky(Ft), t2 = /* @__PURE__ */ Yy(Ft), n2 = /* @__PURE__ */ Ly(Ft), a2 = /* @__PURE__ */ Gy(Ft), l2 = /* @__PURE__ */ Xy(Ft), u2 = /* @__PURE__ */ Qy(Ft), i2 = /* @__PURE__ */ Vy(Ft), c2 = /* @__PURE__ */ $y(Ft), Xe = /* @__PURE__ */ C("ZodType", (l, u) => (Ge.init(l, u), Object.assign(l["~standard"], {
  jsonSchema: {
    input: nc(l, "input"),
    output: nc(l, "output")
  }
}), l.toJSONSchema = b1(l, {}), l.def = u, l.type = u.type, Object.defineProperty(l, "_def", { value: u }), l.check = (...o) => l.clone(ia(u, {
  checks: [
    ...u.checks ?? [],
    ...o.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
}), {
  parent: !0
}), l.with = l.check, l.clone = (o, r) => ca(l, o, r), l.brand = () => l, l.register = ((o, r) => (o.add(l, r), l)), l.parse = (o, r) => W1(l, o, r, { callee: l.parse }), l.safeParse = (o, r) => I1(l, o, r), l.parseAsync = async (o, r) => F1(l, o, r, { callee: l.parseAsync }), l.safeParseAsync = async (o, r) => P1(l, o, r), l.spa = l.safeParseAsync, l.encode = (o, r) => e2(l, o, r), l.decode = (o, r) => t2(l, o, r), l.encodeAsync = async (o, r) => n2(l, o, r), l.decodeAsync = async (o, r) => a2(l, o, r), l.safeEncode = (o, r) => l2(l, o, r), l.safeDecode = (o, r) => u2(l, o, r), l.safeEncodeAsync = async (o, r) => i2(l, o, r), l.safeDecodeAsync = async (o, r) => c2(l, o, r), l.refine = (o, r) => l.check(eb(o, r)), l.superRefine = (o) => l.check(tb(o)), l.overwrite = (o) => l.check(/* @__PURE__ */ Nl(o)), l.optional = () => sm(l), l.exactOptional = () => Y2(l), l.nullable = () => fm(l), l.nullish = () => sm(fm(l)), l.nonoptional = (o) => $2(l, o), l.array = () => sn(l), l.or = (o) => R2([l, o]), l.and = (o) => Z2(l, o), l.transform = (o) => dm(l, B2(o)), l.default = (o) => X2(l, o), l.prefault = (o) => V2(l, o), l.catch = (o) => J2(l, o), l.pipe = (o) => dm(l, o), l.readonly = () => I2(l), l.describe = (o) => {
  const r = l.clone();
  return Au.add(r, { description: o }), r;
}, Object.defineProperty(l, "description", {
  get() {
    return Au.get(l)?.description;
  },
  configurable: !0
}), l.meta = (...o) => {
  if (o.length === 0)
    return Au.get(l);
  const r = l.clone();
  return Au.add(r, o[0]), r;
}, l.isOptional = () => l.safeParse(void 0).success, l.isNullable = () => l.safeParse(null).success, l.apply = (o) => o(l), l)), $m = /* @__PURE__ */ C("_ZodString", (l, u) => {
  Gr.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (r, s, m) => S1(l, r, s);
  const o = l._zod.bag;
  l.format = o.format ?? null, l.minLength = o.minimum ?? null, l.maxLength = o.maximum ?? null, l.regex = (...r) => l.check(/* @__PURE__ */ l1(...r)), l.includes = (...r) => l.check(/* @__PURE__ */ c1(...r)), l.startsWith = (...r) => l.check(/* @__PURE__ */ o1(...r)), l.endsWith = (...r) => l.check(/* @__PURE__ */ r1(...r)), l.min = (...r) => l.check(/* @__PURE__ */ tc(...r)), l.max = (...r) => l.check(/* @__PURE__ */ Ym(...r)), l.length = (...r) => l.check(/* @__PURE__ */ Lm(...r)), l.nonempty = (...r) => l.check(/* @__PURE__ */ tc(1, ...r)), l.lowercase = (r) => l.check(/* @__PURE__ */ u1(r)), l.uppercase = (r) => l.check(/* @__PURE__ */ i1(r)), l.trim = () => l.check(/* @__PURE__ */ f1()), l.normalize = (...r) => l.check(/* @__PURE__ */ s1(...r)), l.toLowerCase = () => l.check(/* @__PURE__ */ d1()), l.toUpperCase = () => l.check(/* @__PURE__ */ h1()), l.slugify = () => l.check(/* @__PURE__ */ m1());
}), o2 = /* @__PURE__ */ C("ZodString", (l, u) => {
  Gr.init(l, u), $m.init(l, u), l.email = (o) => l.check(/* @__PURE__ */ Ng(r2, o)), l.url = (o) => l.check(/* @__PURE__ */ Dg(s2, o)), l.jwt = (o) => l.check(/* @__PURE__ */ Kg(T2, o)), l.emoji = (o) => l.check(/* @__PURE__ */ Rg(f2, o)), l.guid = (o) => l.check(/* @__PURE__ */ lm(om, o)), l.uuid = (o) => l.check(/* @__PURE__ */ jg(Ii, o)), l.uuidv4 = (o) => l.check(/* @__PURE__ */ wg(Ii, o)), l.uuidv6 = (o) => l.check(/* @__PURE__ */ Mg(Ii, o)), l.uuidv7 = (o) => l.check(/* @__PURE__ */ Cg(Ii, o)), l.nanoid = (o) => l.check(/* @__PURE__ */ Ug(d2, o)), l.guid = (o) => l.check(/* @__PURE__ */ lm(om, o)), l.cuid = (o) => l.check(/* @__PURE__ */ Zg(h2, o)), l.cuid2 = (o) => l.check(/* @__PURE__ */ qg(m2, o)), l.ulid = (o) => l.check(/* @__PURE__ */ Hg(p2, o)), l.base64 = (o) => l.check(/* @__PURE__ */ Qg(z2, o)), l.base64url = (o) => l.check(/* @__PURE__ */ Vg(x2, o)), l.xid = (o) => l.check(/* @__PURE__ */ Bg(v2, o)), l.ksuid = (o) => l.check(/* @__PURE__ */ kg(y2, o)), l.ipv4 = (o) => l.check(/* @__PURE__ */ Yg(g2, o)), l.ipv6 = (o) => l.check(/* @__PURE__ */ Lg(b2, o)), l.cidrv4 = (o) => l.check(/* @__PURE__ */ Gg(_2, o)), l.cidrv6 = (o) => l.check(/* @__PURE__ */ Xg(S2, o)), l.e164 = (o) => l.check(/* @__PURE__ */ $g(E2, o)), l.datetime = (o) => l.check(L1(o)), l.date = (o) => l.check(X1(o)), l.time = (o) => l.check(V1(o)), l.duration = (o) => l.check(K1(o));
});
function oe(l) {
  return /* @__PURE__ */ Ag(o2, l);
}
const Be = /* @__PURE__ */ C("ZodStringFormat", (l, u) => {
  qe.init(l, u), $m.init(l, u);
}), r2 = /* @__PURE__ */ C("ZodEmail", (l, u) => {
  U0.init(l, u), Be.init(l, u);
}), om = /* @__PURE__ */ C("ZodGUID", (l, u) => {
  D0.init(l, u), Be.init(l, u);
}), Ii = /* @__PURE__ */ C("ZodUUID", (l, u) => {
  R0.init(l, u), Be.init(l, u);
}), s2 = /* @__PURE__ */ C("ZodURL", (l, u) => {
  Z0.init(l, u), Be.init(l, u);
}), f2 = /* @__PURE__ */ C("ZodEmoji", (l, u) => {
  q0.init(l, u), Be.init(l, u);
}), d2 = /* @__PURE__ */ C("ZodNanoID", (l, u) => {
  H0.init(l, u), Be.init(l, u);
}), h2 = /* @__PURE__ */ C("ZodCUID", (l, u) => {
  B0.init(l, u), Be.init(l, u);
}), m2 = /* @__PURE__ */ C("ZodCUID2", (l, u) => {
  k0.init(l, u), Be.init(l, u);
}), p2 = /* @__PURE__ */ C("ZodULID", (l, u) => {
  Y0.init(l, u), Be.init(l, u);
}), v2 = /* @__PURE__ */ C("ZodXID", (l, u) => {
  L0.init(l, u), Be.init(l, u);
}), y2 = /* @__PURE__ */ C("ZodKSUID", (l, u) => {
  G0.init(l, u), Be.init(l, u);
}), g2 = /* @__PURE__ */ C("ZodIPv4", (l, u) => {
  K0.init(l, u), Be.init(l, u);
}), b2 = /* @__PURE__ */ C("ZodIPv6", (l, u) => {
  J0.init(l, u), Be.init(l, u);
}), _2 = /* @__PURE__ */ C("ZodCIDRv4", (l, u) => {
  W0.init(l, u), Be.init(l, u);
}), S2 = /* @__PURE__ */ C("ZodCIDRv6", (l, u) => {
  F0.init(l, u), Be.init(l, u);
}), z2 = /* @__PURE__ */ C("ZodBase64", (l, u) => {
  I0.init(l, u), Be.init(l, u);
}), x2 = /* @__PURE__ */ C("ZodBase64URL", (l, u) => {
  eg.init(l, u), Be.init(l, u);
}), E2 = /* @__PURE__ */ C("ZodE164", (l, u) => {
  tg.init(l, u), Be.init(l, u);
}), T2 = /* @__PURE__ */ C("ZodJWT", (l, u) => {
  ag.init(l, u), Be.init(l, u);
}), Km = /* @__PURE__ */ C("ZodNumber", (l, u) => {
  qm.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (r, s, m) => z1(l, r, s), l.gt = (r, s) => l.check(/* @__PURE__ */ im(r, s)), l.gte = (r, s) => l.check(/* @__PURE__ */ Nr(r, s)), l.min = (r, s) => l.check(/* @__PURE__ */ Nr(r, s)), l.lt = (r, s) => l.check(/* @__PURE__ */ um(r, s)), l.lte = (r, s) => l.check(/* @__PURE__ */ Ar(r, s)), l.max = (r, s) => l.check(/* @__PURE__ */ Ar(r, s)), l.int = (r) => l.check(rm(r)), l.safe = (r) => l.check(rm(r)), l.positive = (r) => l.check(/* @__PURE__ */ im(0, r)), l.nonnegative = (r) => l.check(/* @__PURE__ */ Nr(0, r)), l.negative = (r) => l.check(/* @__PURE__ */ um(0, r)), l.nonpositive = (r) => l.check(/* @__PURE__ */ Ar(0, r)), l.multipleOf = (r, s) => l.check(/* @__PURE__ */ cm(r, s)), l.step = (r, s) => l.check(/* @__PURE__ */ cm(r, s)), l.finite = () => l;
  const o = l._zod.bag;
  l.minValue = Math.max(o.minimum ?? Number.NEGATIVE_INFINITY, o.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, l.maxValue = Math.min(o.maximum ?? Number.POSITIVE_INFINITY, o.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, l.isInt = (o.format ?? "").includes("int") || Number.isSafeInteger(o.multipleOf ?? 0.5), l.isFinite = !0, l.format = o.format ?? null;
});
function Zt(l) {
  return /* @__PURE__ */ Pg(Km, l);
}
const O2 = /* @__PURE__ */ C("ZodNumberFormat", (l, u) => {
  lg.init(l, u), Km.init(l, u);
});
function rm(l) {
  return /* @__PURE__ */ e1(O2, l);
}
const A2 = /* @__PURE__ */ C("ZodBoolean", (l, u) => {
  ug.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => x1(l, o, r);
});
function wa(l) {
  return /* @__PURE__ */ t1(A2, l);
}
const N2 = /* @__PURE__ */ C("ZodUnknown", (l, u) => {
  ig.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => T1();
});
function ac() {
  return /* @__PURE__ */ n1(N2);
}
const j2 = /* @__PURE__ */ C("ZodNever", (l, u) => {
  cg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => E1(l, o, r);
});
function w2(l) {
  return /* @__PURE__ */ a1(j2, l);
}
const M2 = /* @__PURE__ */ C("ZodArray", (l, u) => {
  og.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => j1(l, o, r, s), l.element = u.element, l.min = (o, r) => l.check(/* @__PURE__ */ tc(o, r)), l.nonempty = (o) => l.check(/* @__PURE__ */ tc(1, o)), l.max = (o, r) => l.check(/* @__PURE__ */ Ym(o, r)), l.length = (o, r) => l.check(/* @__PURE__ */ Lm(o, r)), l.unwrap = () => l.element;
});
function sn(l, u) {
  return /* @__PURE__ */ p1(M2, l, u);
}
const C2 = /* @__PURE__ */ C("ZodObject", (l, u) => {
  sg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => w1(l, o, r, s), Te(l, "shape", () => u.shape), l.keyof = () => qt(Object.keys(l._zod.def.shape)), l.catchall = (o) => l.clone({ ...l._zod.def, catchall: o }), l.passthrough = () => l.clone({ ...l._zod.def, catchall: ac() }), l.loose = () => l.clone({ ...l._zod.def, catchall: ac() }), l.strict = () => l.clone({ ...l._zod.def, catchall: w2() }), l.strip = () => l.clone({ ...l._zod.def, catchall: void 0 }), l.extend = (o) => My(l, o), l.safeExtend = (o) => Cy(l, o), l.merge = (o) => Dy(l, o), l.pick = (o) => jy(l, o), l.omit = (o) => wy(l, o), l.partial = (...o) => Ry(Wm, l, o[0]), l.required = (...o) => Uy(Fm, l, o[0]);
});
function pt(l, u) {
  const o = {
    type: "object",
    shape: l ?? {},
    ...K(u)
  };
  return new C2(o);
}
const D2 = /* @__PURE__ */ C("ZodUnion", (l, u) => {
  fg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => M1(l, o, r, s), l.options = u.options;
});
function R2(l, u) {
  return new D2({
    type: "union",
    options: l,
    ...K(u)
  });
}
const U2 = /* @__PURE__ */ C("ZodIntersection", (l, u) => {
  dg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => C1(l, o, r, s);
});
function Z2(l, u) {
  return new U2({
    type: "intersection",
    left: l,
    right: u
  });
}
const q2 = /* @__PURE__ */ C("ZodRecord", (l, u) => {
  hg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => D1(l, o, r, s), l.keyType = u.keyType, l.valueType = u.valueType;
});
function Jm(l, u, o) {
  return new q2({
    type: "record",
    keyType: l,
    valueType: u,
    ...K(o)
  });
}
const Rr = /* @__PURE__ */ C("ZodEnum", (l, u) => {
  mg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (r, s, m) => O1(l, r, s), l.enum = u.entries, l.options = Object.values(u.entries);
  const o = new Set(Object.keys(u.entries));
  l.extract = (r, s) => {
    const m = {};
    for (const h of r)
      if (o.has(h))
        m[h] = u.entries[h];
      else
        throw new Error(`Key ${h} not found in enum`);
    return new Rr({
      ...u,
      checks: [],
      ...K(s),
      entries: m
    });
  }, l.exclude = (r, s) => {
    const m = { ...u.entries };
    for (const h of r)
      if (o.has(h))
        delete m[h];
      else
        throw new Error(`Key ${h} not found in enum`);
    return new Rr({
      ...u,
      checks: [],
      ...K(s),
      entries: m
    });
  };
});
function qt(l, u) {
  const o = Array.isArray(l) ? Object.fromEntries(l.map((r) => [r, r])) : l;
  return new Rr({
    type: "enum",
    entries: o,
    ...K(u)
  });
}
const H2 = /* @__PURE__ */ C("ZodTransform", (l, u) => {
  pg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => N1(l, o), l._zod.parse = (o, r) => {
    if (r.direction === "backward")
      throw new Sm(l.constructor.name);
    o.addIssue = (m) => {
      if (typeof m == "string")
        o.issues.push(ju(m, o.value, u));
      else {
        const h = m;
        h.fatal && (h.continue = !1), h.code ?? (h.code = "custom"), h.input ?? (h.input = o.value), h.inst ?? (h.inst = l), o.issues.push(ju(h));
      }
    };
    const s = u.transform(o.value, o);
    return s instanceof Promise ? s.then((m) => (o.value = m, o)) : (o.value = s, o);
  };
});
function B2(l) {
  return new H2({
    type: "transform",
    transform: l
  });
}
const Wm = /* @__PURE__ */ C("ZodOptional", (l, u) => {
  km.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => Vm(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function sm(l) {
  return new Wm({
    type: "optional",
    innerType: l
  });
}
const k2 = /* @__PURE__ */ C("ZodExactOptional", (l, u) => {
  vg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => Vm(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function Y2(l) {
  return new k2({
    type: "optional",
    innerType: l
  });
}
const L2 = /* @__PURE__ */ C("ZodNullable", (l, u) => {
  yg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => R1(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function fm(l) {
  return new L2({
    type: "nullable",
    innerType: l
  });
}
const G2 = /* @__PURE__ */ C("ZodDefault", (l, u) => {
  gg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => Z1(l, o, r, s), l.unwrap = () => l._zod.def.innerType, l.removeDefault = l.unwrap;
});
function X2(l, u) {
  return new G2({
    type: "default",
    innerType: l,
    get defaultValue() {
      return typeof u == "function" ? u() : Tm(u);
    }
  });
}
const Q2 = /* @__PURE__ */ C("ZodPrefault", (l, u) => {
  bg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => q1(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function V2(l, u) {
  return new Q2({
    type: "prefault",
    innerType: l,
    get defaultValue() {
      return typeof u == "function" ? u() : Tm(u);
    }
  });
}
const Fm = /* @__PURE__ */ C("ZodNonOptional", (l, u) => {
  _g.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => U1(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function $2(l, u) {
  return new Fm({
    type: "nonoptional",
    innerType: l,
    ...K(u)
  });
}
const K2 = /* @__PURE__ */ C("ZodCatch", (l, u) => {
  Sg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => H1(l, o, r, s), l.unwrap = () => l._zod.def.innerType, l.removeCatch = l.unwrap;
});
function J2(l, u) {
  return new K2({
    type: "catch",
    innerType: l,
    catchValue: typeof u == "function" ? u : () => u
  });
}
const W2 = /* @__PURE__ */ C("ZodPipe", (l, u) => {
  zg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => B1(l, o, r, s), l.in = u.in, l.out = u.out;
});
function dm(l, u) {
  return new W2({
    type: "pipe",
    in: l,
    out: u
    // ...util.normalizeParams(params),
  });
}
const F2 = /* @__PURE__ */ C("ZodReadonly", (l, u) => {
  xg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => k1(l, o, r, s), l.unwrap = () => l._zod.def.innerType;
});
function I2(l) {
  return new F2({
    type: "readonly",
    innerType: l
  });
}
const P2 = /* @__PURE__ */ C("ZodCustom", (l, u) => {
  Eg.init(l, u), Xe.init(l, u), l._zod.processJSONSchema = (o, r, s) => A1(l, o);
});
function eb(l, u = {}) {
  return /* @__PURE__ */ v1(P2, l, u);
}
function tb(l) {
  return /* @__PURE__ */ y1(l);
}
const oc = ["context", "project", "knowledge", "reference", "personal", "workflow"], Im = ["active", "archived", "draft", "deleted"], hm = pt({
  title: oe().min(1).max(500),
  content: oe().min(1).max(5e4),
  summary: oe().max(1e3).optional(),
  memory_type: qt(oc).default("context"),
  topic_id: oe().uuid().optional(),
  project_ref: oe().max(100).optional(),
  tags: sn(oe().min(1).max(50)).max(20).default([]),
  metadata: Jm(oe(), ac()).optional()
}), mm = pt({
  title: oe().min(1).max(500).optional(),
  content: oe().min(1).max(5e4).optional(),
  summary: oe().max(1e3).optional(),
  memory_type: qt(oc).optional(),
  status: qt(Im).optional(),
  topic_id: oe().uuid().nullable().optional(),
  project_ref: oe().max(100).nullable().optional(),
  tags: sn(oe().min(1).max(50)).max(20).optional(),
  metadata: Jm(oe(), ac()).optional()
}), nb = pt({
  query: oe().min(1).max(1e3),
  memory_types: sn(qt(oc)).optional(),
  tags: sn(oe()).optional(),
  topic_id: oe().uuid().optional(),
  project_ref: oe().optional(),
  status: qt(Im).default("active"),
  limit: Zt().int().min(1).max(100).default(20),
  threshold: Zt().min(0).max(1).default(0.7)
}), ab = pt({
  name: oe().min(1).max(100),
  description: oe().max(500).optional(),
  color: oe().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  icon: oe().max(50).optional(),
  parent_topic_id: oe().uuid().optional()
});
pt({
  memory_id: oe().uuid().optional(),
  content: oe().min(1).optional(),
  title: oe().optional(),
  existing_tags: sn(oe()).optional(),
  max_suggestions: Zt().int().min(1).max(10).optional()
}).refine((l) => l.memory_id || l.content, {
  message: "Either memory_id or content is required"
});
pt({
  time_range_days: Zt().int().min(1).max(365).optional(),
  include_insights: wa().optional(),
  response_format: qt(["json", "markdown"]).optional()
});
pt({
  include_recommendations: wa().optional(),
  detailed_breakdown: wa().optional()
});
pt({
  memory_id: oe().uuid().optional(),
  query: oe().min(1).optional(),
  limit: Zt().int().min(1).max(20).optional(),
  similarity_threshold: Zt().min(0).max(1).optional(),
  exclude_ids: sn(oe().uuid()).optional()
}).refine((l) => l.memory_id || l.query, {
  message: "Either memory_id or query is required"
});
pt({
  similarity_threshold: Zt().min(0).max(1).optional(),
  include_archived: wa().optional(),
  limit: Zt().int().min(1).max(50).optional()
});
pt({
  memory_ids: sn(oe().uuid()).optional(),
  topic: oe().min(1).optional(),
  time_range_days: Zt().int().min(1).max(365).optional(),
  insight_types: sn(qt(["themes", "connections", "gaps", "actions", "summary"])).optional(),
  detail_level: qt(["brief", "detailed", "comprehensive"]).optional()
});
const lb = ["semantic", "fixed-size", "paragraph", "sentence", "code-block"], ub = ["vector", "text", "hybrid"];
pt({
  chunking: pt({
    strategy: qt(lb).optional(),
    maxChunkSize: Zt().int().min(100).max(1e4).optional(),
    overlap: Zt().int().min(0).max(500).optional()
  }).optional(),
  cleanContent: wa().optional(),
  extractMetadata: wa().optional()
}).optional();
const ib = pt({
  query: oe().min(1).max(1e3),
  type: qt(oc).optional(),
  threshold: Zt().min(0).max(1).default(0.7),
  limit: Zt().int().min(1).max(100).default(20),
  search_mode: qt(ub).default("hybrid"),
  filters: pt({
    tags: sn(oe()).optional(),
    project_id: oe().uuid().optional(),
    topic_id: oe().uuid().optional(),
    date_range: pt({
      from: oe().optional(),
      to: oe().optional()
    }).optional()
  }).optional(),
  include_chunks: wa().default(!1)
}), cb = pt({
  from: oe().optional(),
  to: oe().optional(),
  group_by: qt(["day", "week", "month"]).default("day")
});
function ob(l) {
  switch (l) {
    case 400:
      return "VALIDATION_ERROR";
    case 401:
      return "AUTH_ERROR";
    case 403:
      return "FORBIDDEN";
    case 404:
      return "NOT_FOUND";
    case 408:
      return "TIMEOUT_ERROR";
    case 409:
      return "CONFLICT";
    case 429:
      return "RATE_LIMIT_ERROR";
    case 500:
    case 502:
    case 503:
    case 504:
      return "SERVER_ERROR";
    default:
      return "API_ERROR";
  }
}
function Nu(l, u = "API_ERROR", o, r) {
  return {
    code: u,
    message: l,
    statusCode: o,
    details: r,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function rb(l, u, o) {
  const r = ob(l);
  let s = `HTTP ${l}: ${u}`, m;
  if (o && typeof o == "object") {
    const h = o;
    typeof h.error == "string" ? s = h.error : typeof h.message == "string" && (s = h.message), h.details && (m = h.details);
  }
  return Nu(s, r, l, m);
}
function jr(l) {
  return new Promise((u) => setTimeout(u, l));
}
function wr(l, u = 1e3, o = "exponential", r = 3e4) {
  let s;
  o === "exponential" ? s = u * Math.pow(2, l) : s = u * (l + 1);
  const m = s * 0.2 * (Math.random() * 2 - 1);
  return s = Math.min(s + m, r), Math.round(s);
}
function sb(l) {
  return l ? l >= 500 || l === 429 || l === 408 : !0;
}
class fb {
  constructor(u) {
    this.config = {
      timeout: 3e4,
      ...u
    }, this.baseHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "@lanonasis/memory-client/2.0.0",
      "X-Project-Scope": "lanonasis-maas",
      // Required by backend auth middleware
      ...u.headers
    }, u.authToken ? this.baseHeaders.Authorization = `Bearer ${u.authToken}` : u.apiKey && (this.baseHeaders["X-API-Key"] = u.apiKey), u.organizationId && (this.baseHeaders["X-Organization-ID"] = u.organizationId);
  }
  /**
   * Enrich request body with organization context if configured
   * This ensures the API has the organization_id even if not in auth token
   */
  enrichWithOrgContext(u) {
    return this.config.organizationId && !u.organization_id ? {
      ...u,
      organization_id: this.config.organizationId
    } : !this.config.organizationId && this.config.userId && !u.organization_id ? {
      ...u,
      organization_id: this.config.userId
    } : u;
  }
  /**
   * Make an HTTP request to the API with retry support
   */
  async request(u, o = {}) {
    const r = Date.now(), s = this.config.retry?.maxRetries ?? 3, m = this.config.retry?.retryDelay ?? 1e3, h = this.config.retry?.backoff ?? "exponential";
    if (this.config.onRequest)
      try {
        this.config.onRequest(u);
      } catch (A) {
        console.warn("onRequest hook error:", A);
      }
    const b = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${u}`;
    let v, N = 0;
    for (; N <= s; )
      try {
        const A = new AbortController(), Z = setTimeout(() => A.abort(), this.config.timeout), q = await fetch(b, {
          headers: { ...this.baseHeaders, ...o.headers },
          signal: A.signal,
          ...o
        });
        clearTimeout(Z);
        let ne;
        const ee = q.headers.get("content-type");
        if (ee && ee.includes("application/json") ? ne = await q.json() : ne = await q.text(), !q.ok) {
          const ve = rb(q.status, q.statusText, ne);
          if (sb(q.status) && N < s) {
            v = ve;
            const Ue = wr(N, m, h);
            await jr(Ue), N++;
            continue;
          }
          if (this.config.onError)
            try {
              this.config.onError(ve);
            } catch (Ue) {
              console.warn("onError hook error:", Ue);
            }
          return { error: ve, meta: { duration: Date.now() - r, retries: N } };
        }
        if (this.config.onResponse)
          try {
            const ve = Date.now() - r;
            this.config.onResponse(u, ve);
          } catch (ve) {
            console.warn("onResponse hook error:", ve);
          }
        return { data: ne, meta: { duration: Date.now() - r, retries: N } };
      } catch (A) {
        if (A instanceof Error && A.name === "AbortError") {
          const q = Nu("Request timeout", "TIMEOUT_ERROR", 408);
          if (N < s) {
            v = q;
            const ne = wr(N, m, h);
            await jr(ne), N++;
            continue;
          }
          if (this.config.onError)
            try {
              this.config.onError(q);
            } catch (ne) {
              console.warn("onError hook error:", ne);
            }
          return { error: q, meta: { duration: Date.now() - r, retries: N } };
        }
        const Z = Nu(A instanceof Error ? A.message : "Network error", "NETWORK_ERROR");
        if (N < s) {
          v = Z;
          const q = wr(N, m, h);
          await jr(q), N++;
          continue;
        }
        if (this.config.onError)
          try {
            this.config.onError(Z);
          } catch (q) {
            console.warn("onError hook error:", q);
          }
        return { error: Z, meta: { duration: Date.now() - r, retries: N } };
      }
    return {
      error: v ?? Nu("Max retries exceeded", "API_ERROR"),
      meta: { duration: Date.now() - r, retries: N }
    };
  }
  /**
   * Validate input using Zod schema and return validation error if invalid
   */
  validateInput(u, o) {
    const r = u.safeParse(o);
    if (!r.success) {
      const m = r.error?.issues?.map((h) => ({
        field: h.path.map(String).join("."),
        message: h.message
      })) ?? [];
      return {
        error: Nu("Validation failed", "VALIDATION_ERROR", 400, m)
      };
    }
    return null;
  }
  /**
   * Test the API connection and authentication
   */
  async healthCheck() {
    return this.request("/health");
  }
  // Memory Operations
  /**
   * Create a new memory with validation
   */
  async createMemory(u) {
    const o = this.validateInput(hm, u);
    if (o)
      return { error: o.error };
    const r = this.enrichWithOrgContext(u);
    return this.request("/memory", {
      method: "POST",
      body: JSON.stringify(r)
    });
  }
  /**
   * Get a memory by ID
   */
  async getMemory(u) {
    return this.request(`/memory/${encodeURIComponent(u)}`);
  }
  /**
   * Update an existing memory with validation
   */
  async updateMemory(u, o) {
    const r = this.validateInput(mm, o);
    return r ? { error: r.error } : this.request(`/memory/${encodeURIComponent(u)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a memory
   */
  async deleteMemory(u) {
    return this.request(`/memory/${encodeURIComponent(u)}`, {
      method: "DELETE"
    });
  }
  /**
   * List memories with optional filtering and pagination
   */
  async listMemories(u = {}) {
    const o = new URLSearchParams();
    Object.entries(u).forEach(([m, h]) => {
      h != null && (Array.isArray(h) ? o.append(m, h.join(",")) : o.append(m, String(h)));
    });
    const r = o.toString(), s = r ? `/memory?${r}` : "/memory";
    return this.request(s);
  }
  /**
   * Search memories using semantic search with validation
   */
  async searchMemories(u) {
    const o = this.validateInput(nb, u);
    if (o)
      return { error: o.error };
    const r = this.enrichWithOrgContext(u);
    return this.request("/memory/search", {
      method: "POST",
      body: JSON.stringify(r)
    });
  }
  /**
   * Bulk delete multiple memories
   */
  async bulkDeleteMemories(u) {
    const o = this.enrichWithOrgContext({ memory_ids: u });
    return this.request("/memory/bulk/delete", {
      method: "POST",
      body: JSON.stringify(o)
    });
  }
  // Topic Operations
  /**
   * Create a new topic with validation
   */
  async createTopic(u) {
    const o = this.validateInput(ab, u);
    if (o)
      return { error: o.error };
    const r = this.enrichWithOrgContext(u);
    return this.request("/topics", {
      method: "POST",
      body: JSON.stringify(r)
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
  async getTopic(u) {
    return this.request(`/topics/${encodeURIComponent(u)}`);
  }
  /**
   * Update a topic
   */
  async updateTopic(u, o) {
    return this.request(`/topics/${encodeURIComponent(u)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Delete a topic
   */
  async deleteTopic(u) {
    return this.request(`/topics/${encodeURIComponent(u)}`, {
      method: "DELETE"
    });
  }
  /**
   * Get user memory statistics
   */
  async getMemoryStats() {
    return this.request("/memory/stats");
  }
  // ========================================
  // Intelligence Features (v2.0)
  // ========================================
  /**
   * Create a memory with preprocessing options (chunking, intelligence extraction)
   *
   * @example
   * ```typescript
   * const result = await client.createMemoryWithPreprocessing({
   *   title: 'Auth System Docs',
   *   content: 'Long content...',
   *   memory_type: 'knowledge',
   *   preprocessing: {
   *     chunking: { strategy: 'semantic', maxChunkSize: 1000 },
   *     extractMetadata: true
   *   }
   * });
   * ```
   */
  async createMemoryWithPreprocessing(u) {
    const o = this.validateInput(hm, u);
    if (o)
      return { error: o.error };
    const r = this.enrichWithOrgContext(u);
    return this.request("/memory", {
      method: "POST",
      body: JSON.stringify(r)
    });
  }
  /**
   * Update a memory with re-chunking and embedding regeneration
   *
   * @example
   * ```typescript
   * const result = await client.updateMemoryWithPreprocessing('mem_123', {
   *   content: 'Updated content...',
   *   rechunk: true,
   *   regenerate_embedding: true
   * });
   * ```
   */
  async updateMemoryWithPreprocessing(u, o) {
    const r = this.validateInput(mm, o);
    return r ? { error: r.error } : this.request(`/memory/${encodeURIComponent(u)}`, {
      method: "PUT",
      body: JSON.stringify(o)
    });
  }
  /**
   * Enhanced semantic search with hybrid mode (vector + text)
   *
   * @example
   * ```typescript
   * const result = await client.enhancedSearch({
   *   query: 'authentication flow',
   *   search_mode: 'hybrid',
   *   filters: { tags: ['auth'], project_id: 'proj_123' },
   *   include_chunks: true
   * });
   * ```
   */
  async enhancedSearch(u) {
    const o = this.validateInput(ib, u);
    if (o)
      return { error: o.error };
    const r = this.enrichWithOrgContext(u);
    return this.request("/memory/search", {
      method: "POST",
      body: JSON.stringify(r)
    });
  }
  // ========================================
  // Analytics Operations
  // ========================================
  /**
   * Get search analytics data
   *
   * @example
   * ```typescript
   * const analytics = await client.getSearchAnalytics({
   *   from: '2025-01-01',
   *   to: '2025-12-31',
   *   group_by: 'day'
   * });
   * ```
   */
  async getSearchAnalytics(u = {}) {
    const o = this.validateInput(cb, u);
    if (o)
      return { error: o.error };
    const r = new URLSearchParams();
    u.from && r.append("from", u.from), u.to && r.append("to", u.to), u.group_by && r.append("group_by", u.group_by);
    const s = r.toString(), m = s ? `/analytics/search?${s}` : "/analytics/search";
    return this.request(m);
  }
  /**
   * Get memory access patterns
   *
   * @example
   * ```typescript
   * const patterns = await client.getAccessPatterns({
   *   from: '2025-01-01',
   *   to: '2025-12-31'
   * });
   * console.log(patterns.data?.most_accessed);
   * ```
   */
  async getAccessPatterns(u = {}) {
    const o = new URLSearchParams();
    u.from && o.append("from", u.from), u.to && o.append("to", u.to);
    const r = o.toString(), s = r ? `/analytics/access?${r}` : "/analytics/access";
    return this.request(s);
  }
  /**
   * Get extended memory statistics with storage and activity metrics
   *
   * @example
   * ```typescript
   * const stats = await client.getExtendedStats();
   * console.log(`Total chunks: ${stats.data?.storage.total_chunks}`);
   * console.log(`Created today: ${stats.data?.activity.created_today}`);
   * ```
   */
  async getExtendedStats() {
    return this.request("/analytics/stats");
  }
  /**
   * Get topic with its memories
   *
   * @example
   * ```typescript
   * const topic = await client.getTopicWithMemories('topic_123');
   * console.log(topic.data?.memories);
   * ```
   */
  async getTopicWithMemories(u, o = {}) {
    const r = new URLSearchParams();
    o.limit && r.append("limit", String(o.limit)), o.offset && r.append("offset", String(o.offset));
    const s = r.toString(), m = s ? `/topics/${encodeURIComponent(u)}/memories?${s}` : `/topics/${encodeURIComponent(u)}/memories`;
    return this.request(m);
  }
  /**
   * Get topics in hierarchical structure
   *
   * @example
   * ```typescript
   * const topics = await client.getTopicsHierarchy();
   * // Returns nested topic tree with children
   * ```
   */
  async getTopicsHierarchy() {
    return this.request("/topics?include_hierarchy=true");
  }
  // Utility Methods
  /**
   * Update authentication token
   */
  setAuthToken(u) {
    this.baseHeaders.Authorization = `Bearer ${u}`, delete this.baseHeaders["X-API-Key"];
  }
  /**
   * Update API key
   */
  setApiKey(u) {
    this.baseHeaders["X-API-Key"] = u, delete this.baseHeaders.Authorization;
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
  updateConfig(u) {
    this.config = { ...this.config, ...u }, u.headers && (this.baseHeaders = { ...this.baseHeaders, ...u.headers });
  }
  /**
   * Get current configuration (excluding sensitive data)
   */
  getConfig() {
    const { apiKey: u, authToken: o, ...r } = this.config;
    return r;
  }
}
function db(l) {
  return new fb(l);
}
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
const Pm = L.createContext(null);
function hb({ children: l, config: u, apiKey: o, apiUrl: r = "https://api.lanonasis.com", client: s }) {
  const m = L.useMemo(() => s || db({
    apiUrl: r,
    apiKey: o,
    ...u
  }), [s, r, o, u]);
  return L.createElement(Pm.Provider, { value: m }, l);
}
function rc() {
  const l = L.useContext(Pm);
  if (!l)
    throw new Error("useMemoryClient must be used within a MemoryProvider");
  return l;
}
function mb(l) {
  const u = rc(), [o, r] = L.useState([]), [s, m] = L.useState(!0), [h, y] = L.useState(null), b = L.useCallback(async () => {
    m(!0), y(null);
    const v = await u.listMemories(l);
    v.error ? (y(v.error), r([])) : v.data && r(v.data.data), m(!1);
  }, [u, JSON.stringify(l)]);
  return L.useEffect(() => {
    b();
  }, [b]), {
    memories: o,
    loading: s,
    error: h,
    refresh: b
  };
}
function pb() {
  const l = rc(), [u, o] = L.useState(!1), [r, s] = L.useState(null);
  return {
    createMemory: L.useCallback(async (h) => {
      o(!0), s(null);
      const y = await l.createMemory(h);
      return y.error ? (s(y.error), o(!1), null) : (o(!1), y.data || null);
    }, [l]),
    loading: u,
    error: r
  };
}
function vb(l = 300) {
  const u = rc(), [o, r] = L.useState([]), [s, m] = L.useState(!1), [h, y] = L.useState(null), [b, v] = L.useState(0), [N, A] = L.useState(0), Z = L.useRef(null), q = L.useCallback(async (ne, ee) => {
    Z.current && clearTimeout(Z.current), Z.current = setTimeout(async () => {
      m(!0), y(null);
      const ve = await u.searchMemories({
        query: ne,
        status: ee?.status ?? "active",
        limit: ee?.limit ?? 20,
        threshold: ee?.threshold ?? 0.7,
        ...ee
      });
      ve.error ? (y(ve.error), r([]), v(0), A(0)) : ve.data && (r(ve.data.results), v(ve.data.total_results), A(ve.data.search_time_ms)), m(!1);
    }, l);
  }, [u, l]);
  return L.useEffect(() => () => {
    Z.current && clearTimeout(Z.current);
  }, []), {
    results: o,
    loading: s,
    error: h,
    search: q,
    totalResults: b,
    searchTime: N
  };
}
const Ce = Zr.forwardRef(
  ({
    className: l = "",
    variant: u = "default",
    size: o = "default",
    children: r,
    ...s
  }, m) => {
    const h = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", y = {
      default: "vscode-button",
      secondary: "vscode-button vscode-button-secondary",
      ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
    }, b = {
      default: "h-8 px-4 py-2 text-[13px]",
      sm: "h-7 px-3 text-[12px]",
      icon: "h-6 w-6"
    };
    return /* @__PURE__ */ p.jsx(
      "button",
      {
        ref: m,
        className: `${h} ${y[u]} ${b[o]} ${l}`,
        ...s,
        children: r
      }
    );
  }
);
Ce.displayName = "Button";
const El = Zr.forwardRef(
  ({ className: l = "", type: u = "text", ...o }, r) => /* @__PURE__ */ p.jsx(
    "input",
    {
      ref: r,
      type: u,
      className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${l}`,
      ...o
    }
  )
);
El.displayName = "Input";
const yb = ({
  className: l = "",
  size: u = 24
}) => /* @__PURE__ */ p.jsx(
  "svg",
  {
    width: u,
    height: u,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: l,
    children: /* @__PURE__ */ p.jsx(
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
), ft = {
  search: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ p.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  ),
  plus: /* @__PURE__ */ p.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ p.jsx("path", { d: "M12 5v14M5 12h14" })
    }
  ),
  refresh: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
        /* @__PURE__ */ p.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
      ]
    }
  ),
  settings: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ p.jsx("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })
      ]
    }
  ),
  logout: /* @__PURE__ */ p.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ p.jsx("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
    }
  ),
  chevronRight: /* @__PURE__ */ p.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ p.jsx("polyline", { points: "9,18 15,12 9,6" })
    }
  ),
  globe: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ p.jsx("line", { x1: "2", y1: "12", x2: "22", y2: "12" }),
        /* @__PURE__ */ p.jsx("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
      ]
    }
  ),
  lightbulb: /* @__PURE__ */ p.jsx(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ p.jsx("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
    }
  ),
  file: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
        /* @__PURE__ */ p.jsx("polyline", { points: "14,2 14,8 20,8" })
      ]
    }
  ),
  send: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
        /* @__PURE__ */ p.jsx("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })
      ]
    }
  ),
  paperclip: /* @__PURE__ */ p.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ p.jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
    }
  ),
  edit: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("path", { d: "M12 20h9" }),
        /* @__PURE__ */ p.jsx("path", { d: "M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" })
      ]
    }
  ),
  trash: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("polyline", { points: "3 6 5 6 21 6" }),
        /* @__PURE__ */ p.jsx("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }),
        /* @__PURE__ */ p.jsx("path", { d: "M10 11v6M14 11v6" }),
        /* @__PURE__ */ p.jsx("path", { d: "M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" })
      ]
    }
  ),
  copy: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
        /* @__PURE__ */ p.jsx("path", { d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" })
      ]
    }
  ),
  close: /* @__PURE__ */ p.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: [
        /* @__PURE__ */ p.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ p.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ]
    }
  )
}, gb = [
  "context",
  "project",
  "knowledge",
  "reference",
  "personal",
  "workflow"
], ep = (l) => {
  if (!l) return "—";
  try {
    return new Date(l).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
}, Mr = (l) => {
  if (!l) return "—";
  try {
    return new Date(l).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "—";
  }
}, pm = (l) => l && l.length > 0 ? l.join(", ") : "", bb = (l) => l.split(",").map((u) => u.trim()).filter(Boolean), _b = (l) => {
  if (!l) return "U";
  const u = l.trim();
  if (!u) return "U";
  const o = u.split(/\s+/).filter(Boolean);
  if (o.length === 1) {
    const r = o[0];
    return (r.includes("@") ? r.split("@")[0] : r).slice(0, 2).toUpperCase();
  }
  return (o[0][0] + o[o.length - 1][0]).toUpperCase();
}, vm = (l, u) => {
  const o = u.toLowerCase();
  return l.title.toLowerCase().includes(o) || l.content.toLowerCase().includes(o) || (l.tags || []).some((r) => r.toLowerCase().includes(o));
}, Sb = ({
  onLoginOAuth: l,
  onLoginApiKey: u,
  isLoading: o = !1,
  error: r = null
}) => {
  const [s, m] = L.useState(!1), [h, y] = L.useState(""), b = () => {
    h.trim() && u && u(h.trim());
  };
  return /* @__PURE__ */ p.jsx("div", { className: "space-y-3 select-none", children: /* @__PURE__ */ p.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ p.jsx("h2", { className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]", children: "Connect to sync memories" }),
    /* @__PURE__ */ p.jsx("p", { className: "text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed", children: "You can still work locally, but connecting unlocks sync and full AI search." }),
    r && /* @__PURE__ */ p.jsx("div", { className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20", children: r }),
    s ? /* @__PURE__ */ p.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ p.jsx(
        El,
        {
          type: "password",
          placeholder: "Enter your API key (lano_... or lns_...)",
          value: h,
          onChange: (v) => y(v.target.value),
          className: "h-8 text-[13px]",
          autoFocus: !0,
          onKeyDown: (v) => v.key === "Enter" && b()
        }
      ),
      /* @__PURE__ */ p.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ p.jsx(
          Ce,
          {
            className: "flex-1",
            onClick: b,
            disabled: !h.trim() || o,
            children: o ? "Connecting..." : "Connect"
          }
        ),
        /* @__PURE__ */ p.jsx(
          Ce,
          {
            variant: "secondary",
            onClick: () => {
              m(!1), y("");
            },
            children: "Cancel"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ p.jsxs("div", { className: "space-y-2 pt-1", children: [
      /* @__PURE__ */ p.jsx(
        Ce,
        {
          className: "w-full",
          onClick: l,
          disabled: o,
          children: o ? "Connecting..." : "Connect in Browser"
        }
      ),
      /* @__PURE__ */ p.jsx(
        Ce,
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
}, zb = ({ memory: l, onClick: u }) => /* @__PURE__ */ p.jsxs(
  "div",
  {
    className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
    onClick: u,
    children: [
      /* @__PURE__ */ p.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ p.jsx("span", { className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0", children: ft.file }),
        /* @__PURE__ */ p.jsx("h3", { className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1", children: l.title })
      ] }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5", children: [
        /* @__PURE__ */ p.jsx("span", { className: "opacity-60", children: ep(l.created_at) }),
        /* @__PURE__ */ p.jsx("span", { className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60", children: l.memory_type }),
        l.tags?.slice(0, 2).map((o) => /* @__PURE__ */ p.jsxs(
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
      l._pending && /* @__PURE__ */ p.jsxs("div", { className: "text-[10px] text-yellow-400 pl-5", children: [
        "Pending ",
        l._pending
      ] })
    ]
  }
), ym = ({
  title: l,
  isOpen: u,
  onToggle: o,
  actions: r
}) => /* @__PURE__ */ p.jsxs(
  "div",
  {
    className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
    onClick: o,
    children: [
      /* @__PURE__ */ p.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ p.jsx(
          "span",
          {
            className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${u ? "rotate-90" : ""}`,
            children: ft.chevronRight
          }
        ),
        /* @__PURE__ */ p.jsx("span", { className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase", children: l })
      ] }),
      r && /* @__PURE__ */ p.jsx("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: r })
    ]
  }
), xb = ({
  syncStatus: l,
  onSync: u,
  isAuthenticated: o,
  hasLocalMemories: r,
  onConnect: s
}) => {
  const m = !o;
  return !m && l.isOnline && l.pendingCount === 0 ? null : /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: `px-3 py-2 text-[11px] flex items-center justify-between ${m ? "bg-blue-500/10 text-blue-300 border-b border-blue-500/20" : l.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`,
      children: [
        /* @__PURE__ */ p.jsx("div", { className: "flex items-center gap-2", children: m ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx("span", { className: "opacity-80", children: ft.globe }),
          /* @__PURE__ */ p.jsxs("span", { children: [
            "Local mode",
            r ? "" : " (no cache yet)"
          ] })
        ] }) : l.isOnline ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsxs(
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
                /* @__PURE__ */ p.jsx("path", { d: "M23 4v6h-6M1 20v-6h6" }),
                /* @__PURE__ */ p.jsx("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
              ]
            }
          ),
          /* @__PURE__ */ p.jsxs("span", { children: [
            l.pendingCount,
            " pending"
          ] })
        ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsxs(
            "svg",
            {
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              children: [
                /* @__PURE__ */ p.jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }),
                /* @__PURE__ */ p.jsx("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
                /* @__PURE__ */ p.jsx("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
                /* @__PURE__ */ p.jsx("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
                /* @__PURE__ */ p.jsx("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
                /* @__PURE__ */ p.jsx("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
                /* @__PURE__ */ p.jsx("line", { x1: "12", y1: "20", x2: "12.01", y2: "20" })
              ]
            }
          ),
          /* @__PURE__ */ p.jsx("span", { children: "Offline" })
        ] }) }),
        m ? s && /* @__PURE__ */ p.jsx(
          "button",
          {
            onClick: s,
            className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors",
            children: "Connect"
          }
        ) : l.pendingCount > 0 && l.isOnline && /* @__PURE__ */ p.jsx(
          "button",
          {
            onClick: u,
            disabled: l.isSyncing,
            className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
            children: l.isSyncing ? "Syncing..." : "Sync now"
          }
        )
      ]
    }
  );
}, Eb = ({
  message: l,
  onOpenMemory: u
}) => {
  const o = l.role === "user";
  return /* @__PURE__ */ p.jsxs(
    "div",
    {
      className: `flex flex-col gap-1 ${o ? "items-end" : "items-start"}`,
      children: [
        /* @__PURE__ */ p.jsx(
          "div",
          {
            className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${o ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`,
            children: l.content
          }
        ),
        !o && l.memories && l.memories.length > 0 && /* @__PURE__ */ p.jsxs("div", { className: "w-full mt-2 space-y-1", children: [
          /* @__PURE__ */ p.jsxs("div", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1", children: [
            "Related memories (",
            l.memories.length,
            ")"
          ] }),
          l.memories.slice(0, 3).map((r) => /* @__PURE__ */ p.jsxs(
            "div",
            {
              className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px] cursor-pointer hover:border-[var(--vscode-focusBorder)]",
              onClick: () => u?.(r),
              children: [
                /* @__PURE__ */ p.jsx("div", { className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1", children: r.title }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5", children: [
                  r.content.slice(0, 100),
                  r.content.length > 100 ? "..." : ""
                ] }),
                r._pending && /* @__PURE__ */ p.jsx("div", { className: "text-[10px] text-yellow-400 mt-1", children: "⏳ Pending sync" })
              ]
            },
            r.id
          ))
        ] })
      ]
    }
  );
}, Tb = ({
  initialChatInput: l = "",
  onAttachFromClipboard: u,
  isAuthenticated: o = !1,
  onLoginOAuth: r,
  onLoginApiKey: s,
  onLogout: m,
  authLoading: h = !1,
  authError: y = null,
  userEmail: b = null,
  userName: v = null,
  authMethod: N = "none"
}) => {
  const {
    memories: A,
    loading: Z,
    refresh: q
  } = mb({
    limit: 200,
    order: "desc"
  }), { createMemory: ne, loading: ee } = pb(), {
    search: ve,
    results: Ue,
    loading: ke
  } = vb(), ge = rc(), [V, he] = L.useState(""), [He, ae] = L.useState(l), [Qe, Ht] = L.useState(!0), [tn, Bt] = L.useState(!0), [Pe, nn] = L.useState(!1), [Ot, et] = L.useState([]), [j, k] = L.useState(!1), [Q, re] = L.useState([]), [I, _] = L.useState({
    isOnline: !0,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: !1
  }), [D, B] = L.useState(
    null
  ), [U, W] = L.useState(
    null
  ), [ce, se] = L.useState(!1), [Oe, Ae] = L.useState({
    title: "",
    content: "",
    memory_type: "knowledge",
    tags: ""
  }), [an, fn] = L.useState(!1), [jl, wl] = L.useState(!1), [At, Dn] = L.useState(""), [Ml, Ca] = L.useState(!1), oa = L.useRef(null), Da = L.useRef(null), dn = L.useRef(null), ra = (H, J) => {
    H && et(
      (Y) => Y.map(
        (te) => te.id === H && te.role === "assistant" ? J(te) : te
      )
    );
  };
  L.useEffect(() => {
    if (D) {
      const H = setTimeout(() => B(null), 5e3);
      return () => clearTimeout(H);
    }
  }, [D]), L.useEffect(() => {
    l !== void 0 && ae(l);
  }, [l]);
  const Nt = o && I.isOnline, wu = Q.length > 0, dt = !o || !I.isOnline, Cl = o ? N === "apiKey" ? "API key" : "OAuth" : wu ? "Local cache" : "Not connected", Dl = v || b || null, Rl = v && b ? b : null, sa = Dl || b || null, Mu = !!U && (U.id.startsWith("local_") || U._pending === "create");
  L.useEffect(() => {
    const H = (J) => {
      const Y = J.data;
      if (!(!Y || typeof Y != "object")) {
        if (Y.type === "lanonasis:cache:data" && (re(Y.payload?.memories || []), Y.payload?.status && _(Y.payload.status)), Y.type === "lanonasis:sync:start" && _((te) => ({ ...te, isSyncing: !0 })), Y.type === "lanonasis:sync:complete" && (re(Y.payload?.memories || []), _(
          (te) => Y.payload?.status || {
            ...te,
            isSyncing: !1,
            isOnline: !0
          }
        )), Y.type === "lanonasis:sync:error") {
          const te = Y.payload?.isNetworkError === !0, P = Y.payload?.error || "Sync failed";
          _((be) => ({
            ...be,
            isSyncing: !1,
            isOnline: te ? !1 : be.isOnline
          })), B(
            te ? "Network error - working offline" : P
          );
        }
        if (Y.type === "lanonasis:auth:result" && !Y.payload?.success) {
          const te = Y.payload?.error || "Authentication failed";
          B(te);
        }
        if (Y.type === "lanonasis:ai:search:local") {
          const te = Y.payload?.results || [], P = Y.payload?.query || "", be = Y.payload?.requestId;
          ra(be, (ut) => ({
            ...ut,
            content: te.length > 0 ? `Found ${te.length} local memories:` : `No local matches for "${P}". Try saving more context or connect for full search.`,
            memories: te
          })), be && be === dn.current && k(!1);
        }
        if (Y.type === "lanonasis:ai:search:api") {
          const te = Y.payload?.results || [], P = Y.payload?.query || "", be = Y.payload?.requestId;
          ra(be, (ut) => {
            const mn = new Set(
              (ut.memories || []).map((kt) => kt.id)
            ), qu = te.filter(
              (kt) => !mn.has(kt.id)
            ), qa = [
              ...ut.memories || [],
              ...qu
            ].slice(0, 5);
            return {
              ...ut,
              content: qa.length > 0 ? `Found ${qa.length} relevant memories:` : `No memories found for "${P}"`,
              memories: qa
            };
          }), be && be === dn.current && (dn.current = null, k(!1));
        }
        if (Y.type === "lanonasis:cache:added") {
          const te = Y.payload?.memory;
          te && (re((P) => [te, ...P]), _((P) => ({
            ...P,
            pendingCount: P.pendingCount + 1
          })));
        }
        if (Y.type === "lanonasis:cache:updated") {
          const te = Y.payload?.memory;
          te && (re(
            (P) => P.map(
              (be) => be.id === te.id || be._localId === te._localId ? te : be
            )
          ), W(
            (P) => P && (P.id === te.id || P._localId === te._localId) ? te : P
          )), Y.payload?.status && _(Y.payload.status);
        }
        if (Y.type === "lanonasis:cache:deleted") {
          const te = Y.payload?.id;
          te && (re(
            (P) => P.filter((be) => be.id !== te)
          ), W(
            (P) => P && P.id === te ? null : P
          )), Y.payload?.status && _(Y.payload.status);
        }
        Y.type === "lanonasis:cache:cleared" && (re([]), W(null), Y.payload?.status ? _(Y.payload.status) : _((te) => ({
          ...te,
          lastSyncAt: null,
          pendingCount: 0,
          isSyncing: !1
        })));
      }
    };
    return window.addEventListener("message", H), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", H);
  }, []), L.useEffect(() => {
    oa.current && (oa.current.scrollTop = oa.current.scrollHeight);
  }, [Ot]), L.useEffect(() => {
    V.length > 2 && Nt && ve(V);
  }, [V, ve, Nt]);
  const Cu = L.useMemo(() => V.length <= 2 ? [] : Q.filter((H) => vm(H, V)), [Q, V]), Du = dt || I.pendingCount > 0 ? Q : A, fa = Nt && Ue.length > 0 ? Ue : Cu, ht = V.length > 2 ? fa : Du.length > 0 ? Du : Q, ln = async () => {
    const H = He.trim() || V.trim();
    if (!H) {
      const J = document.querySelector("textarea");
      J && (J.focus(), J.placeholder = "Type content to save as a memory...");
      return;
    }
    try {
      const J = {
        title: H.slice(0, 50) + (H.length > 50 ? "..." : ""),
        content: H,
        memory_type: "knowledge",
        tags: []
      };
      if (Nt)
        await ne(J), ae(""), await q();
      else
        throw new Error("Local-only mode");
    } catch (J) {
      console.error("Failed to create memory:", J), window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: {
          memory: {
            title: H.slice(0, 50) + (H.length > 50 ? "..." : ""),
            content: H,
            memory_type: "knowledge",
            tags: []
          }
        }
      }), ae(""));
    }
  }, lt = async () => {
    nn(!0);
    try {
      window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), o && await q();
    } finally {
      nn(!1);
    }
  }, sc = (H) => {
    const J = H.toLowerCase().trim();
    if (J === "help" || J === "?" || J.includes("how do i"))
      return { action: "help", query: H };
    const Y = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i
    ];
    for (const P of Y) {
      const be = H.match(P);
      if (be)
        return { action: "create", query: be[1] || H };
    }
    return [
      /^list$/i,
      /^list\s+(?:my\s+)?(?:memories|notes)$/i,
      /^show\s+(?:my\s+)?(?:memories|notes)$/i,
      /^recent\s+(?:memories|notes)$/i
    ].some((P) => P.test(H)) ? { action: "list", query: "" } : { action: "search", query: H };
  }, Ru = L.useCallback((H) => {
    W(H), Ae({
      title: H.title || "",
      content: H.content || "",
      memory_type: H.memory_type || "knowledge",
      tags: pm(H.tags)
    }), se(!1);
  }, []), Uu = L.useCallback(() => {
    W(null), se(!1);
  }, []), Ra = L.useCallback((H) => {
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:clipboard:write",
        payload: { text: H }
      });
      return;
    }
    navigator.clipboard?.writeText && navigator.clipboard.writeText(H);
  }, []), Ua = L.useCallback(() => {
    U && (Ae({
      title: U.title || "",
      content: U.content || "",
      memory_type: U.memory_type || "knowledge",
      tags: pm(U.tags)
    }), se(!0));
  }, [U]), Za = L.useCallback(async () => {
    if (!U) return;
    const H = {
      title: Oe.title.trim() || U.title,
      content: Oe.content.trim() || U.content,
      memory_type: Oe.memory_type || U.memory_type,
      tags: bb(Oe.tags)
    };
    fn(!0);
    try {
      if (Nt) {
        const J = await ge.updateMemory(
          U.id,
          H
        );
        if (J?.error)
          throw new Error(J.error);
        const Y = J?.data || U;
        W(Y), re(
          (te) => te.map((P) => P.id === Y.id ? Y : P)
        ), se(!1), await q();
        return;
      }
      window.vscode && (window.vscode.postMessage({
        type: "lanonasis:cache:update",
        payload: { id: U.id, updates: H }
      }), W(
        (J) => J && {
          ...J,
          ...H,
          tags: H.tags || J.tags,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      )), se(!1);
    } catch (J) {
      const Y = J instanceof Error ? J.message : "Update failed";
      B(Y);
    } finally {
      fn(!1);
    }
  }, [
    U,
    Oe.title,
    Oe.content,
    Oe.memory_type,
    Oe.tags,
    Nt,
    ge,
    q
  ]), hn = L.useCallback(async () => {
    if (!(!U || !window.confirm(
      `Delete "${U.title}"? This cannot be undone.`
    ))) {
      fn(!0);
      try {
        if (Mu)
          window.vscode && window.vscode.postMessage({
            type: "lanonasis:cache:delete",
            payload: { id: U.id }
          });
        else if (Nt) {
          const J = await ge.deleteMemory(U.id);
          if (J?.error)
            throw new Error(J.error);
          await q();
        } else window.vscode && window.vscode.postMessage({
          type: "lanonasis:cache:delete",
          payload: { id: U.id }
        });
        re(
          (J) => J.filter((Y) => Y.id !== U.id)
        ), W(null);
      } catch (J) {
        const Y = J instanceof Error ? J.message : "Delete failed";
        B(Y);
      } finally {
        fn(!1);
      }
    }
  }, [U, Nt, ge, q]), da = L.useCallback(() => {
    wl(!0);
  }, []), Rn = L.useCallback(() => {
    wl(!1), Ca(!1), Dn("");
  }, []), Zu = L.useCallback(() => {
    At.trim() && (s && s(At.trim()), Dn(""), Ca(!1));
  }, [At, s]), Ul = async () => {
    const H = He.trim();
    if (!H) return;
    const J = {
      id: `user_${Date.now()}`,
      role: "user",
      content: H,
      timestamp: Date.now()
    };
    et((P) => [...P, J]), ae("");
    const Y = sc(H);
    if (Y.action === "help") {
      const P = {
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
      et((be) => [...be, P]);
      return;
    }
    if (Y.action === "create") {
      const P = {
        title: Y.query.slice(0, 50) + (Y.query.length > 50 ? "..." : ""),
        content: Y.query,
        memory_type: "knowledge",
        tags: []
      };
      if (Nt)
        try {
          await ne(P);
          const ut = {
            id: `assistant_${Date.now()}`,
            role: "assistant",
            content: `✅ Memory saved: "${Y.query.slice(0, 50)}${Y.query.length > 50 ? "..." : ""}"`,
            timestamp: Date.now()
          };
          et((mn) => [...mn, ut]), await q();
          return;
        } catch (ut) {
          console.log("Create failed, saving locally:", ut);
        }
      window.vscode && window.vscode.postMessage({
        type: "lanonasis:cache:add",
        payload: { memory: P }
      });
      const be = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `✅ Memory saved locally (will sync when online): "${Y.query.slice(
          0,
          50
        )}${Y.query.length > 50 ? "..." : ""}"`,
        timestamp: Date.now()
      };
      et((ut) => [...ut, be]);
      return;
    }
    if (Y.action === "list") {
      const be = (Nt && A.length > 0 ? A : Q).slice(0, 5), ut = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: be.length > 0 ? "Here are your recent memories:" : "I don't have any memories yet. Try saving one!",
        memories: be,
        timestamp: Date.now()
      };
      et((mn) => [...mn, ut]);
      return;
    }
    k(!0);
    const te = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${Y.query}"`,
      memories: [],
      timestamp: Date.now()
    };
    if (dn.current = te.id, et((P) => [...P, te]), window.vscode)
      window.vscode.postMessage({
        type: "lanonasis:ai:search",
        payload: { query: Y.query, requestId: te.id }
      });
    else
      try {
        await ve(Y.query);
        const P = Q.filter(
          (be) => vm(be, Y.query)
        );
        ra(te.id, (be) => ({
          ...be,
          content: P && P.length > 0 ? `Found ${P.length} relevant memories:` : `No memories found for "${Y.query}"`,
          memories: P || []
        }));
      } catch (P) {
        console.log("Search failed:", P);
      } finally {
        dn.current = null, k(!1);
      }
  };
  return /* @__PURE__ */ p.jsx("div", { className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none", children: /* @__PURE__ */ p.jsxs("div", { className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative", children: [
    D && /* @__PURE__ */ p.jsxs("div", { className: "absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between", children: [
      /* @__PURE__ */ p.jsx("span", { className: "text-[11px] text-red-200", children: D }),
      /* @__PURE__ */ p.jsx(
        "button",
        {
          onClick: () => B(null),
          className: "text-red-200 hover:text-white text-xs ml-2",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]", children: [
      /* @__PURE__ */ p.jsx("div", { className: "flex items-center gap-2", children: sa ? /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ p.jsx("div", { className: "h-6 w-6 rounded-full bg-[var(--vscode-badge-background)]/30 text-[10px] font-semibold text-[var(--vscode-editor-foreground)] flex items-center justify-center", children: _b(sa) }),
        /* @__PURE__ */ p.jsxs("div", { className: "flex flex-col leading-tight", children: [
          /* @__PURE__ */ p.jsx("span", { className: "text-[11px] font-semibold text-[var(--vscode-sideBarTitle-foreground)] max-w-[150px] truncate", children: Dl }),
          Rl && /* @__PURE__ */ p.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[150px] truncate", children: Rl })
        ] })
      ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
        /* @__PURE__ */ p.jsx(
          yb,
          {
            className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
            size: 16
          }
        ),
        /* @__PURE__ */ p.jsx("span", { className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]", children: "LanOnasis Memory" })
      ] }) }),
      /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]", children: [
          /* @__PURE__ */ p.jsx(
            "div",
            {
              className: `h-1.5 w-1.5 rounded-full ${o ? I.isOnline ? "bg-green-500" : "bg-red-500" : "bg-yellow-500"}`,
              title: o ? I.isOnline ? "Online" : "Offline" : "Local"
            }
          ),
          /* @__PURE__ */ p.jsx("span", { children: o ? I.isOnline ? "Online" : "Offline" : "Local" })
        ] }),
        /* @__PURE__ */ p.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80", children: Cl }),
        dt && /* @__PURE__ */ p.jsx("span", { className: "text-[10px] text-blue-300/90", children: "Local mode" }),
        o && /* @__PURE__ */ p.jsx("span", { className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80", children: I.isSyncing ? "Syncing..." : I.pendingCount > 0 ? `${I.pendingCount} pending` : I.lastSyncAt ? `Synced ${ep(
          new Date(I.lastSyncAt).toISOString()
        )}` : "Not synced" }),
        /* @__PURE__ */ p.jsx(
          Ce,
          {
            variant: "ghost",
            size: "icon",
            title: "Settings",
            onClick: da,
            children: ft.settings
          }
        ),
        o && /* @__PURE__ */ p.jsx(
          Ce,
          {
            variant: "ghost",
            size: "icon",
            title: "Logout",
            onClick: m,
            children: ft.logout
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(
      xb,
      {
        syncStatus: I,
        onSync: lt,
        isAuthenticated: o,
        hasLocalMemories: wu,
        onConnect: da
      }
    ),
    /* @__PURE__ */ p.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ p.jsx(
        ym,
        {
          title: "Memory Assistant",
          isOpen: Qe,
          onToggle: () => Ht(!Qe)
        }
      ),
      Qe && /* @__PURE__ */ p.jsxs(
        "div",
        {
          ref: oa,
          className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3 bg-[var(--vscode-sideBar-background)]",
          children: [
            Ot.length === 0 ? /* @__PURE__ */ p.jsx("div", { className: "text-[13px] text-[var(--vscode-foreground)] flex flex-col items-center justify-center text-center py-4", children: o ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
              /* @__PURE__ */ p.jsx("div", { className: "text-[var(--vscode-button-background)] mb-2", children: ft.lightbulb }),
              /* @__PURE__ */ p.jsx("p", { className: "italic opacity-90", children: "Ask me to find or save memories" }),
              /* @__PURE__ */ p.jsx("p", { className: "text-[11px] mt-1 opacity-70", children: 'Try: "find my OAuth notes"' })
            ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
              /* @__PURE__ */ p.jsx("p", { className: "italic opacity-90", children: "Local mode: search cached memories or save new ones." }),
              /* @__PURE__ */ p.jsx("p", { className: "text-[11px] mt-1 opacity-70", children: "Connect for full AI search and sync." })
            ] }) }) : Ot.map((H) => /* @__PURE__ */ p.jsx(
              Eb,
              {
                message: H,
                onOpenMemory: Ru
              },
              H.id
            )),
            j && /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ p.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ p.jsx(
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
                /* @__PURE__ */ p.jsx(
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
      /* @__PURE__ */ p.jsx(
        ym,
        {
          title: `Memories${I.pendingCount > 0 ? ` (${I.pendingCount} pending)` : ""}`,
          isOpen: tn,
          onToggle: () => Bt(!tn),
          actions: (o || Q.length > 0) && /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(
              Ce,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => Da.current?.focus(),
                children: ft.search
              }
            ),
            /* @__PURE__ */ p.jsx(
              Ce,
              {
                variant: "ghost",
                size: "icon",
                onClick: lt,
                disabled: !o,
                children: /* @__PURE__ */ p.jsx(
                  "span",
                  {
                    className: Pe || I.isSyncing ? "animate-spin" : "",
                    children: ft.refresh
                  }
                )
              }
            )
          ] })
        }
      ),
      tn && /* @__PURE__ */ p.jsx("div", { className: "flex-1", children: /* @__PURE__ */ p.jsxs("div", { className: "p-2 space-y-2", children: [
        !o && /* @__PURE__ */ p.jsx("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3", children: /* @__PURE__ */ p.jsx(
          Sb,
          {
            onLoginOAuth: r,
            onLoginApiKey: s,
            isLoading: h,
            error: y
          }
        ) }),
        /* @__PURE__ */ p.jsx(
          El,
          {
            ref: Da,
            placeholder: "Search memories...",
            value: V,
            onChange: (H) => he(H.target.value),
            className: "h-7 text-[13px]"
          }
        ),
        /* @__PURE__ */ p.jsxs("div", { className: "flex gap-2 mb-4", children: [
          /* @__PURE__ */ p.jsxs(
            Ce,
            {
              className: "flex-1 h-7 gap-1.5",
              onClick: ln,
              disabled: ee,
              children: [
                ee ? /* @__PURE__ */ p.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ p.jsx(
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
                  /* @__PURE__ */ p.jsx(
                    "path",
                    {
                      className: "opacity-75",
                      fill: "currentColor",
                      d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }
                  )
                ] }) : ft.plus,
                ee ? "Creating..." : Nt ? "Create" : "Save Local"
              ]
            }
          ),
          /* @__PURE__ */ p.jsxs(
            Ce,
            {
              className: "flex-1 h-7 gap-1.5",
              variant: "secondary",
              onClick: lt,
              disabled: !o || Pe || I.isSyncing,
              children: [
                /* @__PURE__ */ p.jsx(
                  "span",
                  {
                    className: Pe || I.isSyncing ? "animate-spin" : "",
                    children: ft.refresh
                  }
                ),
                Pe || I.isSyncing ? "Syncing..." : "Sync"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ p.jsx("div", { className: "space-y-0.5", children: Z || ke ? /* @__PURE__ */ p.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: "Loading..." }) : ht.length === 0 ? /* @__PURE__ */ p.jsx("div", { className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]", children: V ? "No memories found" : Q.length > 0 ? "Loading from cache..." : "No memories yet. Create one!" }) : ht.map((H) => /* @__PURE__ */ p.jsx(
          zb,
          {
            memory: H,
            onClick: () => Ru(H)
          },
          H.id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]", children: /* @__PURE__ */ p.jsxs("div", { className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors", children: [
      /* @__PURE__ */ p.jsx("div", { className: "p-2 pb-8", children: /* @__PURE__ */ p.jsx(
        "textarea",
        {
          value: He,
          onChange: (H) => ae(H.target.value),
          onKeyDown: (H) => {
            H.key === "Enter" && !H.shiftKey && (H.preventDefault(), Ul());
          },
          placeholder: o ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Search cached memories or save a note",
          className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
        }
      ) }),
      /* @__PURE__ */ p.jsx("div", { className: "absolute left-2 bottom-1.5 flex gap-1", children: /* @__PURE__ */ p.jsx(
        Ce,
        {
          size: "icon",
          variant: "ghost",
          className: "h-6 w-6",
          onClick: u,
          title: "Attach from clipboard",
          children: ft.paperclip
        }
      ) }),
      /* @__PURE__ */ p.jsx("div", { className: "absolute right-2 bottom-1.5", children: /* @__PURE__ */ p.jsx(
        Ce,
        {
          size: "icon",
          className: "h-6 w-6",
          disabled: !He.trim() || j,
          onClick: Ul,
          title: "Send (Enter)",
          children: j ? /* @__PURE__ */ p.jsxs("svg", { className: "animate-spin h-3 w-3", viewBox: "0 0 24 24", children: [
            /* @__PURE__ */ p.jsx(
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
            /* @__PURE__ */ p.jsx(
              "path",
              {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              }
            )
          ] }) : ft.send
        }
      ) })
    ] }) }),
    U && /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: "absolute inset-0 z-40",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ p.jsx("div", { className: "absolute inset-0", onClick: Uu }),
          /* @__PURE__ */ p.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ p.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ p.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ p.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ p.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Memory Detail" }),
                /* @__PURE__ */ p.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: U.title }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
                  Mr(
                    U.updated_at || U.created_at
                  ),
                  " • ",
                  U.memory_type,
                  " • ",
                  Mu ? "Local" : "Synced",
                  U._pending ? ` (${U._pending})` : ""
                ] })
              ] }),
              /* @__PURE__ */ p.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ p.jsx(
                  Ce,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Copy content",
                    onClick: () => Ra(U.content),
                    children: ft.copy
                  }
                ),
                /* @__PURE__ */ p.jsx(
                  Ce,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Edit memory",
                    onClick: Ua,
                    children: ft.edit
                  }
                ),
                /* @__PURE__ */ p.jsx(
                  Ce,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Delete memory",
                    onClick: hn,
                    disabled: an,
                    children: ft.trash
                  }
                ),
                /* @__PURE__ */ p.jsx(
                  Ce,
                  {
                    variant: "ghost",
                    size: "icon",
                    title: "Close",
                    onClick: Uu,
                    children: ft.close
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ p.jsx("div", { className: "flex-1 overflow-y-auto mt-3", children: ce ? /* @__PURE__ */ p.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ p.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ p.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Title" }),
                /* @__PURE__ */ p.jsx(
                  El,
                  {
                    value: Oe.title,
                    onChange: (H) => Ae((J) => ({
                      ...J,
                      title: H.target.value
                    })),
                    className: "h-8 text-[13px]"
                  }
                )
              ] }),
              /* @__PURE__ */ p.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ p.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Type" }),
                /* @__PURE__ */ p.jsx(
                  "select",
                  {
                    value: Oe.memory_type,
                    onChange: (H) => Ae((J) => ({
                      ...J,
                      memory_type: H.target.value
                    })),
                    className: "vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]",
                    children: gb.map((H) => /* @__PURE__ */ p.jsx("option", { value: H, children: H }, H))
                  }
                )
              ] }),
              /* @__PURE__ */ p.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ p.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Tags (comma separated)" }),
                /* @__PURE__ */ p.jsx(
                  El,
                  {
                    value: Oe.tags,
                    onChange: (H) => Ae((J) => ({
                      ...J,
                      tags: H.target.value
                    })),
                    className: "h-8 text-[13px]"
                  }
                )
              ] }),
              /* @__PURE__ */ p.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ p.jsx("label", { className: "text-[11px] text-[var(--vscode-descriptionForeground)]", children: "Content" }),
                /* @__PURE__ */ p.jsx(
                  "textarea",
                  {
                    value: Oe.content,
                    onChange: (H) => Ae((J) => ({
                      ...J,
                      content: H.target.value
                    })),
                    className: "vscode-input w-full min-h-[140px] rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] p-2 text-[13px] text-[var(--vscode-input-foreground)] resize-none"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ p.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ p.jsx(
                "div",
                {
                  className: "text-[13px] text-[var(--vscode-editor-foreground)]",
                  style: { whiteSpace: "pre-wrap" },
                  children: U.content
                }
              ),
              U.tags?.length > 0 && /* @__PURE__ */ p.jsx(
                "div",
                {
                  className: "flex gap-1",
                  style: { flexWrap: "wrap" },
                  children: U.tags.map((H, J) => /* @__PURE__ */ p.jsxs(
                    "span",
                    {
                      className: "px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]",
                      children: [
                        "#",
                        H
                      ]
                    },
                    `${H}-${J}`
                  ))
                }
              )
            ] }) }),
            /* @__PURE__ */ p.jsx("div", { className: "pt-3 border-t border-[var(--vscode-panel-border)] mt-3", children: ce ? /* @__PURE__ */ p.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ p.jsx(
                Ce,
                {
                  className: "flex-1 h-7",
                  onClick: Za,
                  disabled: an,
                  children: an ? "Saving..." : "Save Changes"
                }
              ),
              /* @__PURE__ */ p.jsx(
                Ce,
                {
                  className: "flex-1 h-7",
                  variant: "secondary",
                  onClick: () => se(!1),
                  disabled: an,
                  children: "Cancel"
                }
              )
            ] }) : /* @__PURE__ */ p.jsxs("div", { className: "flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]", children: [
              /* @__PURE__ */ p.jsxs("span", { children: [
                "Updated ",
                Mr(U.updated_at)
              ] }),
              U._pending && /* @__PURE__ */ p.jsx("span", { className: "text-yellow-400", children: "Pending sync" })
            ] }) })
          ] }) })
        ]
      }
    ),
    jl && /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: "absolute inset-0 z-50",
        style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
        children: [
          /* @__PURE__ */ p.jsx("div", { className: "absolute inset-0", onClick: Rn }),
          /* @__PURE__ */ p.jsx("div", { className: "relative h-full w-full p-3", children: /* @__PURE__ */ p.jsxs("div", { className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3", children: [
            /* @__PURE__ */ p.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ p.jsx("h3", { className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]", children: "Settings" }),
              /* @__PURE__ */ p.jsx(
                Ce,
                {
                  variant: "ghost",
                  size: "icon",
                  title: "Close",
                  onClick: Rn,
                  children: ft.close
                }
              )
            ] }),
            /* @__PURE__ */ p.jsxs("div", { className: "flex-1 overflow-y-auto mt-3 space-y-3", children: [
              /* @__PURE__ */ p.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ p.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Connection" }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Status:",
                  " ",
                  o ? I.isOnline ? "Online" : "Offline" : "Local"
                ] }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Auth: ",
                  Cl
                ] }),
                (v || b) && /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "User: ",
                  v || b
                ] }),
                v && b && /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Email: ",
                  b
                ] }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Last sync:",
                  " ",
                  I.lastSyncAt ? Mr(
                    new Date(I.lastSyncAt).toISOString()
                  ) : "—"
                ] }),
                /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-editor-foreground)]", children: [
                  "Pending changes: ",
                  I.pendingCount
                ] })
              ] }),
              /* @__PURE__ */ p.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ p.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "API Access" }),
                o ? /* @__PURE__ */ p.jsxs("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: [
                  "Connected via ",
                  Cl,
                  "."
                ] }) : /* @__PURE__ */ p.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Connect to sync and search across devices." }),
                Ml ? /* @__PURE__ */ p.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ p.jsx(
                    El,
                    {
                      type: "password",
                      placeholder: "Enter your API key (lano_... or lns_...)",
                      value: At,
                      onChange: (H) => Dn(H.target.value),
                      className: "h-8 text-[13px]",
                      onKeyDown: (H) => H.key === "Enter" && Zu()
                    }
                  ),
                  /* @__PURE__ */ p.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ p.jsx(
                      Ce,
                      {
                        className: "flex-1",
                        onClick: Zu,
                        disabled: !At.trim() || h,
                        children: h ? "Connecting..." : "Save API Key"
                      }
                    ),
                    /* @__PURE__ */ p.jsx(
                      Ce,
                      {
                        className: "flex-1",
                        variant: "secondary",
                        onClick: () => {
                          Ca(!1), Dn("");
                        },
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ p.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ p.jsx(
                    Ce,
                    {
                      className: "flex-1 h-7",
                      onClick: r,
                      disabled: h,
                      children: h ? "Connecting..." : "Connect in Browser"
                    }
                  ),
                  /* @__PURE__ */ p.jsx(
                    Ce,
                    {
                      className: "flex-1 h-7",
                      variant: "secondary",
                      onClick: () => Ca(!0),
                      disabled: h,
                      children: "Enter API Key"
                    }
                  )
                ] }),
                /* @__PURE__ */ p.jsx(
                  Ce,
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
              /* @__PURE__ */ p.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ p.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Cache" }),
                /* @__PURE__ */ p.jsx("div", { className: "text-[12px] text-[var(--vscode-descriptionForeground)]", children: "Clear cached memories and pending changes stored locally." }),
                /* @__PURE__ */ p.jsx(
                  Ce,
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
              /* @__PURE__ */ p.jsxs("div", { className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2", children: [
                /* @__PURE__ */ p.jsx("div", { className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70", children: "Extension Settings" }),
                /* @__PURE__ */ p.jsx(
                  Ce,
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
const gm = document.getElementById("root"), Al = {
  apiUrl: "https://api.lanonasis.com",
  pending: /* @__PURE__ */ new Map()
};
let bm = !1, Ob = 0;
function Ab(l) {
  l && (Al.apiUrl = l);
}
function Nb(l) {
  return typeof l == "string" ? l : l instanceof URL ? l.toString() : l.url;
}
function jb(l) {
  try {
    const u = new URL(l, window.location.href), o = new URL(Al.apiUrl);
    return u.origin === o.origin && u.pathname.startsWith("/api/");
  } catch {
    return !1;
  }
}
function wb(l) {
  const u = new Headers(l || {}), o = {};
  return u.forEach((r, s) => {
    o[s] = r;
  }), delete o.authorization, delete o.Authorization, delete o["x-api-key"], delete o["X-API-Key"], o;
}
async function Mb(l, u, o) {
  const r = o.toUpperCase();
  if (!(r === "GET" || r === "HEAD")) {
    if (typeof u?.body == "string")
      return u.body;
    if (u?.body instanceof URLSearchParams)
      return u.body.toString();
    if (u?.body != null)
      return String(u.body);
    if (l instanceof Request)
      return await l.clone().text() || void 0;
  }
}
function Cb(l) {
  const u = l.data;
  if (!u || u.type !== "lanonasis:api:response")
    return;
  const o = u.payload || {}, r = o.requestId;
  if (!r)
    return;
  const s = Al.pending.get(r);
  if (!s)
    return;
  if (Al.pending.delete(r), window.clearTimeout(s.timeoutId), o.error) {
    s.reject(new Error(o.error));
    return;
  }
  const m = o.status ?? 500, h = o.body && ![204, 205, 304].includes(m) ? o.body : null;
  s.resolve(
    new Response(h, {
      status: m,
      statusText: o.statusText,
      headers: o.headers || []
    })
  );
}
function Db() {
  if (bm || typeof window > "u" || typeof window.fetch != "function")
    return;
  bm = !0;
  const l = window.fetch.bind(window);
  window.addEventListener("message", Cb), window.fetch = async (u, o) => {
    const r = Nb(u);
    if (!jb(r) || !window.vscode || typeof window.vscode.postMessage != "function")
      return u instanceof URL ? l(u.toString(), o) : l(u, o);
    const s = o?.method || (u instanceof Request ? u.method : "GET"), m = wb(
      o?.headers || (u instanceof Request ? u.headers : void 0)
    ), h = await Mb(u, o, s), y = `api_${Date.now()}_${Ob++}`;
    return new Promise((b, v) => {
      const N = window.setTimeout(() => {
        Al.pending.delete(y), v(new Error("API proxy timed out"));
      }, 3e4);
      Al.pending.set(y, {
        resolve: b,
        reject: v,
        timeoutId: N
      }), window.vscode?.postMessage({
        type: "lanonasis:api:request",
        payload: {
          requestId: y,
          url: r,
          init: {
            method: s,
            headers: m,
            body: h
          }
        }
      });
    });
  };
}
Db();
function Rb() {
  const [l, u] = L.useState(""), [o, r] = L.useState("https://api.lanonasis.com"), [s, m] = L.useState(!1), [h, y] = L.useState("none"), [b, v] = L.useState(!1), [N, A] = L.useState(null), [Z, q] = L.useState(null);
  L.useEffect(() => {
    if (!window.vscode || typeof window.vscode.getState != "function") return;
    const ke = window.vscode.getState?.() || {};
    ke.injectedChat && u(ke.injectedChat), ke.authError !== void 0 && A(ke.authError);
  }, []), L.useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage != "function")
      return;
    const ke = (ge) => {
      const V = ge.data;
      if (!(!V || typeof V != "object")) {
        if (V.type === "lanonasis:host-ready") {
          console.log("[Webview] Host ready");
          return;
        }
        if (V.type === "lanonasis:config:init" || V.type === "lanonasis:config:update") {
          const he = V.payload?.apiUrl, He = V.payload?.isAuthenticated, ae = V.payload?.authMethod, Qe = V.payload?.user;
          he && (r(he), Ab(he)), He !== void 0 && (m(He), v(!1), A(null)), ae !== void 0 && y(ae), Qe !== void 0 && q(Qe);
          return;
        }
        if (V.type === "lanonasis:auth:result") {
          v(!1), V.payload?.success ? A(null) : A(V.payload?.error || "Authentication failed");
          return;
        }
        if (V.type === "lanonasis:memory:createFromSelection") {
          const he = V.payload?.text ?? "";
          he && (u(he), window.vscode?.setState?.({
            injectedChat: he,
            authError: N
          }));
          return;
        }
        if (V.type === "lanonasis:clipboard:read:result") {
          const he = V.payload?.text ?? "";
          he && (u(he), window.vscode?.setState?.({
            injectedChat: he,
            authError: N
          }));
          return;
        }
      }
    };
    return window.addEventListener("message", ke), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
      window.removeEventListener("message", ke);
    };
  }, []);
  const ne = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  }, ee = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (v(!0), A(null), window.vscode?.setState?.({
      injectedChat: l,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth"
    }));
  }, ve = (ke) => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (v(!0), A(null), window.vscode?.setState?.({
      injectedChat: l,
      authError: null
    }), window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: ke }
    }));
  }, Ue = () => {
    !window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), m(!1), y("none"), A(null), v(!1), window.vscode?.setState?.({
      injectedChat: l,
      authError: null
    }));
  };
  return /* @__PURE__ */ p.jsx(hb, { apiUrl: o, children: /* @__PURE__ */ p.jsx(
    Tb,
    {
      initialChatInput: l,
      onAttachFromClipboard: ne,
      isAuthenticated: s,
      authMethod: h,
      onLoginOAuth: ee,
      onLoginApiKey: ve,
      onLogout: Ue,
      authLoading: b,
      authError: N,
      userName: Z?.name || null,
      userEmail: Z?.email || null
    }
  ) });
}
gm && zy.createRoot(gm).render(
  /* @__PURE__ */ p.jsx(Zr.StrictMode, { children: /* @__PURE__ */ p.jsx(Rb, {}) })
);
