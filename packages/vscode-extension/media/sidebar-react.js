var e = e === void 0 ? {
	env: {
		NODE_ENV: "production",
		VSCODE_WEBVIEW: "true"
	},
	platform: "browser",
	version: "",
	versions: {},
	browser: !0,
	nextTick: function(e) {
		return setTimeout(e, 0);
	}
} : e, t = Object.create, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.getPrototypeOf, o = Object.prototype.hasOwnProperty, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), c = (e, t, a, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = i(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o.call(e, d) && d !== a && n(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r(t, d)) || s.enumerable
	});
	return e;
}, l = (e, r, i) => (i = e == null ? {} : t(a(e)), c(r || !e || !e.__esModule ? n(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), u = /* @__PURE__ */ s(((t) => {
	var n = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), c = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var ee = Array.isArray;
	function te() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function re(e, t, r) {
		var i = r.ref;
		return {
			$$typeof: n,
			type: e,
			key: t,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ie(e, t) {
		return re(e.type, t, e.props);
	}
	function ae(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}
	function w(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var oe = /\/+/g;
	function se(e, t) {
		return typeof e == "object" && e && e.key != null ? w("" + e.key) : t.toString(36);
	}
	function ce(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(te, te) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function le(e, t, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case n:
				case r:
					c = !0;
					break;
				case f: return c = e._init, le(c(e._payload), t, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + se(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(oe, "$&/") + "/"), le(o, t, i, "", function(e) {
			return e;
		})) : o != null && (ae(o) && (o = ie(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(oe, "$&/") + "/") + c)), t.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + se(a, u), c += le(a, t, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + se(a, u++), c += le(a, t, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return le(ce(e), t, i, a, o);
			throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ue(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return le(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function T(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var E = typeof reportError == "function" ? reportError : function(t) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var n = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof t == "object" && t && typeof t.message == "string" ? String(t.message) : String(t),
				error: t
			});
			if (!window.dispatchEvent(n)) return;
		} else if (typeof e == "object" && typeof e.emit == "function") {
			e.emit("uncaughtException", t);
			return;
		}
		console.error(t);
	}, D = {
		map: ue,
		forEach: function(e, t, n) {
			ue(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ue(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ue(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ae(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	t.Activity = p, t.Children = D, t.Component = y, t.Fragment = i, t.Profiler = o, t.PureComponent = x, t.StrictMode = a, t.Suspense = u, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, t.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return C.H.useMemoCache(e);
		}
	}, t.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, t.cacheSignal = function() {
		return null;
	}, t.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return re(e.type, i, r);
	}, t.createContext = function(e) {
		return e = {
			$$typeof: c,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: s,
			_context: e
		}, e;
	}, t.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ne.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return re(e, a, i);
	}, t.createRef = function() {
		return { current: null };
	}, t.forwardRef = function(e) {
		return {
			$$typeof: l,
			render: e
		};
	}, t.isValidElement = ae, t.lazy = function(e) {
		return {
			$$typeof: f,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: T
		};
	}, t.memo = function(e, t) {
		return {
			$$typeof: d,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, t.startTransition = function(e) {
		var t = C.T, n = {};
		C.T = n;
		try {
			var r = e(), i = C.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(te, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), C.T = t;
		}
	}, t.unstable_useCacheRefresh = function() {
		return C.H.useCacheRefresh();
	}, t.use = function(e) {
		return C.H.use(e);
	}, t.useActionState = function(e, t, n) {
		return C.H.useActionState(e, t, n);
	}, t.useCallback = function(e, t) {
		return C.H.useCallback(e, t);
	}, t.useContext = function(e) {
		return C.H.useContext(e);
	}, t.useDebugValue = function() {}, t.useDeferredValue = function(e, t) {
		return C.H.useDeferredValue(e, t);
	}, t.useEffect = function(e, t) {
		return C.H.useEffect(e, t);
	}, t.useEffectEvent = function(e) {
		return C.H.useEffectEvent(e);
	}, t.useId = function() {
		return C.H.useId();
	}, t.useImperativeHandle = function(e, t, n) {
		return C.H.useImperativeHandle(e, t, n);
	}, t.useInsertionEffect = function(e, t) {
		return C.H.useInsertionEffect(e, t);
	}, t.useLayoutEffect = function(e, t) {
		return C.H.useLayoutEffect(e, t);
	}, t.useMemo = function(e, t) {
		return C.H.useMemo(e, t);
	}, t.useOptimistic = function(e, t) {
		return C.H.useOptimistic(e, t);
	}, t.useReducer = function(e, t, n) {
		return C.H.useReducer(e, t, n);
	}, t.useRef = function(e) {
		return C.H.useRef(e);
	}, t.useState = function(e) {
		return C.H.useState(e);
	}, t.useSyncExternalStore = function(e, t, n) {
		return C.H.useSyncExternalStore(e, t, n);
	}, t.useTransition = function() {
		return C.H.useTransition();
	}, t.version = "19.2.4";
})), d = /* @__PURE__ */ s(((e, t) => {
	t.exports = u();
})), f = /* @__PURE__ */ s(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, ie());
		else {
			var t = n(l);
			t !== null && oe(x, t.startTime - e);
		}
	}
	var S = !1, ee = -1, te = 5, C = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - C < te);
	}
	function re() {
		if (g = !1, S) {
			var t = e.unstable_now();
			C = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ee), ee = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ne());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && oe(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ie() : S = !1;
			}
		}
	}
	var ie;
	if (typeof y == "function") ie = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), w = ae.port2;
		ae.port1.onmessage = re, ie = function() {
			w.postMessage(null);
		};
	} else ie = function() {
		_(re, 0);
	};
	function oe(t, n) {
		ee = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : te = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ee), ee = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, ie()))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), p = /* @__PURE__ */ s(((e, t) => {
	t.exports = f();
})), m = /* @__PURE__ */ s(((e) => {
	var t = d();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.4";
})), h = /* @__PURE__ */ s(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = m();
})), g = /* @__PURE__ */ s(((t) => {
	var n = p(), r = d(), i = h();
	function a(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function o(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function s(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function c(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function u(e) {
		if (s(e) !== e) throw Error(a(188));
	}
	function f(e) {
		var t = e.alternate;
		if (!t) {
			if (t = s(e), t === null) throw Error(a(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var o = i.alternate;
			if (o === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === o.child) {
				for (o = i.child; o;) {
					if (o === n) return u(i), e;
					if (o === r) return u(i), t;
					o = o.sibling;
				}
				throw Error(a(188));
			}
			if (n.return !== r.return) n = i, r = o;
			else {
				for (var c = !1, l = i.child; l;) {
					if (l === n) {
						c = !0, n = i, r = o;
						break;
					}
					if (l === r) {
						c = !0, r = i, n = o;
						break;
					}
					l = l.sibling;
				}
				if (!c) {
					for (l = o.child; l;) {
						if (l === n) {
							c = !0, n = o, r = i;
							break;
						}
						if (l === r) {
							c = !0, r = o, n = i;
							break;
						}
						l = l.sibling;
					}
					if (!c) throw Error(a(189));
				}
			}
			if (n.alternate !== r) throw Error(a(190));
		}
		if (n.tag !== 3) throw Error(a(188));
		return n.stateNode.current === n ? e : t;
	}
	function m(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = m(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var g = Object.assign, _ = Symbol.for("react.element"), v = Symbol.for("react.transitional.element"), y = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), ae = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), oe = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function ce(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var le = Symbol.for("react.client.reference");
	function ue(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === le ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case b: return "Fragment";
			case S: return "Profiler";
			case x: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case w: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case y: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? ue(e.type) || "Memo" : t;
			case ae:
				t = e._payload, e = e._init;
				try {
					return ue(e(t));
				} catch {}
		}
		return null;
	}
	var T = Array.isArray, E = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, O = [], fe = -1;
	function pe(e) {
		return { current: e };
	}
	function k(e) {
		0 > fe || (e.current = O[fe], O[fe] = null, fe--);
	}
	function A(e, t) {
		fe++, O[fe] = e.current, e.current = t;
	}
	var me = pe(null), he = pe(null), ge = pe(null), _e = pe(null);
	function ve(e, t) {
		switch (A(ge, t), A(he, e), A(me, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Hd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Hd(t), e = Ud(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		k(me), A(me, e);
	}
	function ye() {
		k(me), k(he), k(ge);
	}
	function be(e) {
		e.memoizedState !== null && A(_e, e);
		var t = me.current, n = Ud(t, e.type);
		t !== n && (A(he, e), A(me, n));
	}
	function xe(e) {
		he.current === e && (k(me), k(he)), _e.current === e && (k(_e), $f._currentValue = de);
	}
	var Se, Ce;
	function we(e) {
		if (Se === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Se = t && t[1] || "", Ce = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Se + e + Ce;
	}
	var Te = !1;
	function Ee(e, t) {
		if (!e || Te) return "";
		Te = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Te = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? we(n) : "";
	}
	function De(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return we(e.type);
			case 16: return we("Lazy");
			case 13: return e.child !== t && t !== null ? we("Suspense Fallback") : we("Suspense");
			case 19: return we("SuspenseList");
			case 0:
			case 15: return Ee(e.type, !1);
			case 11: return Ee(e.type.render, !1);
			case 1: return Ee(e.type, !0);
			case 31: return we("Activity");
			default: return "";
		}
	}
	function Oe(e) {
		try {
			var t = "", n = null;
			do
				t += De(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var ke = Object.prototype.hasOwnProperty, Ae = n.unstable_scheduleCallback, je = n.unstable_cancelCallback, Me = n.unstable_shouldYield, Ne = n.unstable_requestPaint, Pe = n.unstable_now, Fe = n.unstable_getCurrentPriorityLevel, Ie = n.unstable_ImmediatePriority, Le = n.unstable_UserBlockingPriority, Re = n.unstable_NormalPriority, ze = n.unstable_LowPriority, Be = n.unstable_IdlePriority, Ve = n.log, He = n.unstable_setDisableYieldValue, Ue = null, We = null;
	function Ge(e) {
		if (typeof Ve == "function" && He(e), We && typeof We.setStrictMode == "function") try {
			We.setStrictMode(Ue, e);
		} catch {}
	}
	var Ke = Math.clz32 ? Math.clz32 : Ye, qe = Math.log, Je = Math.LN2;
	function Ye(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (qe(e) / Je | 0) | 0;
	}
	var Xe = 256, Ze = 262144, Qe = 4194304;
	function $e(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function et(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = $e(n))) : i = $e(o) : i = $e(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = $e(n))) : i = $e(o)) : i = $e(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function tt(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function nt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function rt() {
		var e = Qe;
		return Qe <<= 1, !(Qe & 62914560) && (Qe = 4194304), e;
	}
	function it(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function at(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function ot(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ke(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && st(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function st(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ke(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ct(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ke(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function lt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ut(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
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
			default: e = 0;
		}
		return e;
	}
	function dt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ft() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e;
	}
	function pt(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var mt = Math.random().toString(36).slice(2), ht = "__reactFiber$" + mt, gt = "__reactProps$" + mt, _t = "__reactContainer$" + mt, vt = "__reactEvents$" + mt, yt = "__reactListeners$" + mt, bt = "__reactHandles$" + mt, xt = "__reactResources$" + mt, St = "__reactMarker$" + mt;
	function Ct(e) {
		delete e[ht], delete e[gt], delete e[vt], delete e[yt], delete e[bt];
	}
	function wt(e) {
		var t = e[ht];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[_t] || n[ht]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ff(e); e !== null;) {
					if (n = e[ht]) return n;
					e = ff(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Tt(e) {
		if (e = e[ht] || e[_t]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Et(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(a(33));
	}
	function Dt(e) {
		var t = e[xt];
		return t ||= e[xt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ot(e) {
		e[St] = !0;
	}
	var kt = /* @__PURE__ */ new Set(), At = {};
	function jt(e, t) {
		Mt(e, t), Mt(e + "Capture", t);
	}
	function Mt(e, t) {
		for (At[e] = t, e = 0; e < t.length; e++) kt.add(t[e]);
	}
	var Nt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Pt = {}, Ft = {};
	function It(e) {
		return ke.call(Ft, e) ? !0 : ke.call(Pt, e) ? !1 : Nt.test(e) ? Ft[e] = !0 : (Pt[e] = !0, !1);
	}
	function Lt(e, t, n) {
		if (It(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Rt(e, t, n) {
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
	function zt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Bt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Vt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ht(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ut(e) {
		if (!e._valueTracker) {
			var t = Vt(e) ? "checked" : "value";
			e._valueTracker = Ht(e, t, "" + e[t]);
		}
	}
	function j(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Vt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Wt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Gt = /[\n"\\]/g;
	function Kt(e) {
		return e.replace(Gt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function qt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Bt(t)) : e.value !== "" + Bt(t) && (e.value = "" + Bt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Yt(e, o, Bt(n)) : Yt(e, o, Bt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Bt(s) : e.removeAttribute("name");
	}
	function Jt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ut(e);
				return;
			}
			n = n == null ? "" : "" + Bt(n), t = t == null ? n : "" + Bt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ut(e);
	}
	function Yt(e, t, n) {
		t === "number" && Wt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Xt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Bt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Zt(e, t, n) {
		if (t != null && (t = "" + Bt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Bt(n);
	}
	function Qt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(a(92));
				if (T(r)) {
					if (1 < r.length) throw Error(a(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Bt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ut(e);
	}
	function $t(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var en = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function tn(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || en.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function nn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(a(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && tn(e, i, r);
		} else for (var o in t) t.hasOwnProperty(o) && tn(e, o, t[o]);
	}
	function rn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var an = new Map([
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
	]), on = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function sn(e) {
		return on.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function cn() {}
	var ln = null;
	function un(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var dn = null, fn = null;
	function pn(e) {
		var t = Tt(e);
		if (t && (e = t.stateNode)) {
			var n = e[gt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (qt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Kt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[gt] || null;
								if (!i) throw Error(a(90));
								qt(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && j(r);
					}
					break a;
				case "textarea":
					Zt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
			}
		}
	}
	var mn = !1;
	function hn(e, t, n) {
		if (mn) return e(t, n);
		mn = !0;
		try {
			return e(t);
		} finally {
			if (mn = !1, (dn !== null || fn !== null) && (xu(), dn && (t = dn, e = fn, fn = dn = null, pn(t), e))) for (t = 0; t < e.length; t++) pn(e[t]);
		}
	}
	function gn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[gt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
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
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(a(231, t, typeof n));
		return n;
	}
	var _n = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), vn = !1;
	if (_n) try {
		var yn = {};
		Object.defineProperty(yn, "passive", { get: function() {
			vn = !0;
		} }), window.addEventListener("test", yn, yn), window.removeEventListener("test", yn, yn);
	} catch {
		vn = !1;
	}
	var bn = null, xn = null, Sn = null;
	function Cn() {
		if (Sn) return Sn;
		var e, t = xn, n = t.length, r, i = "value" in bn ? bn.value : bn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return Sn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function wn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Tn() {
		return !0;
	}
	function En() {
		return !1;
	}
	function Dn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Tn : En, this.isPropagationStopped = En, this;
		}
		return g(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Tn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Tn);
			},
			persist: function() {},
			isPersistent: Tn
		}), t;
	}
	var On = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, kn = Dn(On), An = g({}, On, {
		view: 0,
		detail: 0
	}), jn = Dn(An), Mn, Nn, Pn, Fn = g({}, An, {
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
		getModifierState: Kn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Pn && (Pn && e.type === "mousemove" ? (Mn = e.screenX - Pn.screenX, Nn = e.screenY - Pn.screenY) : Nn = Mn = 0, Pn = e), Mn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Nn;
		}
	}), In = Dn(Fn), Ln = Dn(g({}, Fn, { dataTransfer: 0 })), Rn = Dn(g({}, An, { relatedTarget: 0 })), zn = Dn(g({}, On, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Bn = Dn(g({}, On, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Vn = Dn(g({}, On, { data: 0 })), Hn = {
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
	}, Un = {
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
	}, Wn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Gn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Wn[e]) ? !!t[e] : !1;
	}
	function Kn() {
		return Gn;
	}
	var qn = Dn(g({}, An, {
		key: function(e) {
			if (e.key) {
				var t = Hn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = wn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Un[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Kn,
		charCode: function(e) {
			return e.type === "keypress" ? wn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? wn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Jn = Dn(g({}, Fn, {
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
	})), Yn = Dn(g({}, An, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Kn
	})), Xn = Dn(g({}, On, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Zn = Dn(g({}, Fn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Qn = Dn(g({}, On, {
		newState: 0,
		oldState: 0
	})), $n = [
		9,
		13,
		27,
		32
	], er = _n && "CompositionEvent" in window, tr = null;
	_n && "documentMode" in document && (tr = document.documentMode);
	var nr = _n && "TextEvent" in window && !tr, rr = _n && (!er || tr && 8 < tr && 11 >= tr), ir = " ", ar = !1;
	function or(e, t) {
		switch (e) {
			case "keyup": return $n.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function sr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var cr = !1;
	function lr(e, t) {
		switch (e) {
			case "compositionend": return sr(t);
			case "keypress": return t.which === 32 ? (ar = !0, ir) : null;
			case "textInput": return e = t.data, e === ir && ar ? null : e;
			default: return null;
		}
	}
	function ur(e, t) {
		if (cr) return e === "compositionend" || !er && or(e, t) ? (e = Cn(), Sn = xn = bn = null, cr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return rr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var dr = {
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
	function fr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!dr[e.type] : t === "textarea";
	}
	function pr(e, t, n, r) {
		dn ? fn ? fn.push(r) : fn = [r] : dn = r, t = Dd(t, "onChange"), 0 < t.length && (n = new kn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var mr = null, hr = null;
	function gr(e) {
		bd(e, 0);
	}
	function _r(e) {
		if (j(Et(e))) return e;
	}
	function vr(e, t) {
		if (e === "change") return t;
	}
	var yr = !1;
	if (_n) {
		var br;
		if (_n) {
			var xr = "oninput" in document;
			if (!xr) {
				var Sr = document.createElement("div");
				Sr.setAttribute("oninput", "return;"), xr = typeof Sr.oninput == "function";
			}
			br = xr;
		} else br = !1;
		yr = br && (!document.documentMode || 9 < document.documentMode);
	}
	function Cr() {
		mr && (mr.detachEvent("onpropertychange", wr), hr = mr = null);
	}
	function wr(e) {
		if (e.propertyName === "value" && _r(hr)) {
			var t = [];
			pr(t, hr, e, un(e)), hn(gr, t);
		}
	}
	function Tr(e, t, n) {
		e === "focusin" ? (Cr(), mr = t, hr = n, mr.attachEvent("onpropertychange", wr)) : e === "focusout" && Cr();
	}
	function Er(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return _r(hr);
	}
	function Dr(e, t) {
		if (e === "click") return _r(t);
	}
	function Or(e, t) {
		if (e === "input" || e === "change") return _r(t);
	}
	function kr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Ar = typeof Object.is == "function" ? Object.is : kr;
	function jr(e, t) {
		if (Ar(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!ke.call(t, i) || !Ar(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Mr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Nr(e, t) {
		var n = Mr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Mr(n);
		}
	}
	function Pr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Fr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Wt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Wt(e.document);
		}
		return t;
	}
	function Ir(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Lr = _n && "documentMode" in document && 11 >= document.documentMode, Rr = null, zr = null, Br = null, Vr = !1;
	function Hr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Vr || Rr == null || Rr !== Wt(r) || (r = Rr, "selectionStart" in r && Ir(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Br && jr(Br, r) || (Br = r, r = Dd(zr, "onSelect"), 0 < r.length && (t = new kn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Rr)));
	}
	function Ur(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Wr = {
		animationend: Ur("Animation", "AnimationEnd"),
		animationiteration: Ur("Animation", "AnimationIteration"),
		animationstart: Ur("Animation", "AnimationStart"),
		transitionrun: Ur("Transition", "TransitionRun"),
		transitionstart: Ur("Transition", "TransitionStart"),
		transitioncancel: Ur("Transition", "TransitionCancel"),
		transitionend: Ur("Transition", "TransitionEnd")
	}, Gr = {}, Kr = {};
	_n && (Kr = document.createElement("div").style, "AnimationEvent" in window || (delete Wr.animationend.animation, delete Wr.animationiteration.animation, delete Wr.animationstart.animation), "TransitionEvent" in window || delete Wr.transitionend.transition);
	function qr(e) {
		if (Gr[e]) return Gr[e];
		if (!Wr[e]) return e;
		var t = Wr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Kr) return Gr[e] = t[n];
		return e;
	}
	var Jr = qr("animationend"), Yr = qr("animationiteration"), Xr = qr("animationstart"), Zr = qr("transitionrun"), Qr = qr("transitionstart"), $r = qr("transitioncancel"), ei = qr("transitionend"), ti = /* @__PURE__ */ new Map(), ni = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ni.push("scrollEnd");
	function ri(e, t) {
		ti.set(e, t), jt(t, [e]);
	}
	var ii = typeof reportError == "function" ? reportError : function(t) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var n = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof t == "object" && t && typeof t.message == "string" ? String(t.message) : String(t),
				error: t
			});
			if (!window.dispatchEvent(n)) return;
		} else if (typeof e == "object" && typeof e.emit == "function") {
			e.emit("uncaughtException", t);
			return;
		}
		console.error(t);
	}, ai = [], M = 0, oi = 0;
	function si() {
		for (var e = M, t = oi = M = 0; t < e;) {
			var n = ai[t];
			ai[t++] = null;
			var r = ai[t];
			ai[t++] = null;
			var i = ai[t];
			ai[t++] = null;
			var a = ai[t];
			if (ai[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && di(n, i, a);
		}
	}
	function ci(e, t, n, r) {
		ai[M++] = e, ai[M++] = t, ai[M++] = n, ai[M++] = r, oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function li(e, t, n, r) {
		return ci(e, t, n, r), fi(e);
	}
	function ui(e, t) {
		return ci(e, null, null, t), fi(e);
	}
	function di(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ke(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function fi(e) {
		if (50 < fu) throw fu = 0, pu = null, Error(a(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var pi = {};
	function mi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function hi(e, t, n, r) {
		return new mi(e, t, n, r);
	}
	function gi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function _i(e, t) {
		var n = e.alternate;
		return n === null ? (n = hi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function vi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function yi(e, t, n, r, i, o) {
		var s = 0;
		if (r = e, typeof e == "function") gi(e) && (s = 1);
		else if (typeof e == "string") s = Wf(e, n, me.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case w: return e = hi(31, n, t, i), e.elementType = w, e.lanes = o, e;
			case b: return bi(n.children, i, o, t);
			case x:
				s = 8, i |= 24;
				break;
			case S: return e = hi(12, n, t, i | 2), e.elementType = S, e.lanes = o, e;
			case ne: return e = hi(13, n, t, i), e.elementType = ne, e.lanes = o, e;
			case re: return e = hi(19, n, t, i), e.elementType = re, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case C:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case ae:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(a(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = hi(s, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function bi(e, t, n, r) {
		return e = hi(7, e, r, t), e.lanes = n, e;
	}
	function xi(e, t, n) {
		return e = hi(6, e, null, t), e.lanes = n, e;
	}
	function Si(e) {
		var t = hi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Ci(e, t, n) {
		return t = hi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var wi = /* @__PURE__ */ new WeakMap();
	function Ti(e, t) {
		if (typeof e == "object" && e) {
			var n = wi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Oe(t)
			}, wi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Oe(t)
		};
	}
	var Ei = [], Di = 0, Oi = null, ki = 0, Ai = [], ji = 0, Mi = null, Ni = 1, Pi = "";
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Oi, Oi = e, ki = t;
	}
	function Ii(e, t, n) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Mi = e;
		var r = Ni;
		e = Pi;
		var i = 32 - Ke(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ke(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ni = 1 << 32 - Ke(t) + i | n << i | r, Pi = a + e;
		} else Ni = 1 << a | n << i | r, Pi = e;
	}
	function Li(e) {
		e.return !== null && (Fi(e, 1), Ii(e, 1, 0));
	}
	function Ri(e) {
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
		for (; e === Mi;) Mi = Ai[--ji], Ai[ji] = null, Pi = Ai[--ji], Ai[ji] = null, Ni = Ai[--ji], Ai[ji] = null;
	}
	function zi(e, t) {
		Ai[ji++] = Ni, Ai[ji++] = Pi, Ai[ji++] = Mi, Ni = t.id, Pi = t.overflow, Mi = e;
	}
	var Bi = null, N = null, P = !1, Vi = null, Hi = !1, Ui = Error(a(519));
	function Wi(e) {
		throw Xi(Ti(Error(a(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ui;
	}
	function Gi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ht] = e, t[gt] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < vd.length; n++) Q(vd[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Jt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Qt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Nd(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = cn), t = !0) : t = !1, t || Wi(e, !0);
	}
	function Ki(e) {
		for (Bi = e.return; Bi;) switch (Bi.tag) {
			case 5:
			case 31:
			case 13:
				Hi = !1;
				return;
			case 27:
			case 3:
				Hi = !0;
				return;
			default: Bi = Bi.return;
		}
	}
	function qi(e) {
		if (e !== Bi) return !1;
		if (!P) return Ki(e), P = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Wd(e.type, e.memoizedProps)), n = !n), n && N && Wi(e), Ki(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			N = df(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(317));
			N = df(e);
		} else t === 27 ? (t = N, Qd(e.type) ? (e = uf, uf = null, N = e) : N = t) : N = Bi ? lf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ji() {
		N = Bi = null, P = !1;
	}
	function Yi() {
		var e = Vi;
		return e !== null && (Ql === null ? Ql = e : Ql.push.apply(Ql, e), Vi = null), e;
	}
	function Xi(e) {
		Vi === null ? Vi = [e] : Vi.push(e);
	}
	var Zi = pe(null), F = null, Qi = null;
	function $i(e, t, n) {
		A(Zi, t._currentValue), t._currentValue = n;
	}
	function I(e) {
		e._currentValue = Zi.current, k(Zi);
	}
	function L(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ea(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var o = i.dependencies;
			if (o !== null) {
				var s = i.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), L(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (i.tag === 18) {
				if (s = i.return, s === null) throw Error(a(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), L(s, n, e), s = null;
			} else s = i.child;
			if (s !== null) s.return = i;
			else for (s = i; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (i = s.sibling, i !== null) {
					i.return = s.return, s = i;
					break;
				}
				s = s.return;
			}
			i = s;
		}
	}
	function ta(e, t, n, r) {
		e = null;
		for (var i = t, o = !1; i !== null;) {
			if (!o) {
				if (i.flags & 524288) o = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var s = i.alternate;
				if (s === null) throw Error(a(387));
				if (s = s.memoizedProps, s !== null) {
					var c = i.type;
					Ar(i.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === _e.current) {
				if (s = i.alternate, s === null) throw Error(a(387));
				s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [$f] : e.push($f));
			}
			i = i.return;
		}
		e !== null && ea(t, e, n, r), t.flags |= 262144;
	}
	function na(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Ar(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ra(e) {
		F = e, Qi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ia(e) {
		return oa(F, e);
	}
	function aa(e, t) {
		return F === null && ra(e), oa(e, t);
	}
	function oa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Qi === null) {
			if (e === null) throw Error(a(308));
			Qi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Qi = Qi.next = t;
		return n;
	}
	var sa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ca = n.unstable_scheduleCallback, la = n.unstable_NormalPriority, ua = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function da() {
		return {
			controller: new sa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function fa(e) {
		e.refCount--, e.refCount === 0 && ca(la, function() {
			e.controller.abort();
		});
	}
	var pa = null, ma = 0, ha = 0, ga = null;
	function _a(e, t) {
		if (pa === null) {
			var n = pa = [];
			ma = 0, ha = fd(), ga = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ma++, t.then(va, va), t;
	}
	function va() {
		if (--ma === 0 && pa !== null) {
			ga !== null && (ga.status = "fulfilled");
			var e = pa;
			pa = null, ha = 0, ga = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ya(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ba = E.S;
	E.S = function(e, t) {
		tu = Pe(), typeof t == "object" && t && typeof t.then == "function" && _a(e, t), ba !== null && ba(e, t);
	};
	var xa = pe(null);
	function Sa() {
		var e = xa.current;
		return e === null ? q.pooledCache : e;
	}
	function Ca(e, t) {
		t === null ? A(xa, xa.current) : A(xa, t.pool);
	}
	function wa() {
		var e = Sa();
		return e === null ? null : {
			parent: ua._currentValue,
			pool: e
		};
	}
	var Ta = Error(a(460)), Ea = Error(a(474)), Da = Error(a(542)), Oa = { then: function() {} };
	function ka(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Aa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(cn, cn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Pa(e), e;
			default:
				if (typeof t.status == "string") t.then(cn, cn);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(a(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Pa(e), e;
				}
				throw Ma = t, Ta;
		}
	}
	function ja(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ma = e, Ta) : e;
		}
	}
	var Ma = null;
	function Na() {
		if (Ma === null) throw Error(a(459));
		var e = Ma;
		return Ma = null, e;
	}
	function Pa(e) {
		if (e === Ta || e === Da) throw Error(a(483));
	}
	var Fa = null, Ia = 0;
	function La(e) {
		var t = Ia;
		return Ia += 1, Fa === null && (Fa = []), Aa(Fa, e, t);
	}
	function Ra(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function za(e, t) {
		throw t.$$typeof === _ ? Error(a(525)) : (e = Object.prototype.toString.call(t), Error(a(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ba(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = _i(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = xi(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === b ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === ae && ja(a) === t.type) ? (t = i(t, n.props), Ra(t, n), t.return = e, t) : (t = yi(n.type, n.key, n.props, null, e.mode, r), Ra(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Ci(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = bi(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = xi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case v: return n = yi(t.type, t.key, t.props, null, e.mode, n), Ra(n, t), n.return = e, n;
					case y: return t = Ci(t, e.mode, n), t.return = e, t;
					case ae: return t = ja(t), f(e, t, n);
				}
				if (T(t) || ce(t)) return t = bi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, La(t), n);
				if (t.$$typeof === te) return f(e, aa(e, t), n);
				za(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case v: return n.key === i ? l(e, t, n, r) : null;
					case y: return n.key === i ? u(e, t, n, r) : null;
					case ae: return n = ja(n), p(e, t, n, r);
				}
				if (T(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, La(n), r);
				if (n.$$typeof === te) return p(e, t, aa(e, n), r);
				za(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case v: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case y: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ae: return r = ja(r), m(e, t, n, r, i);
				}
				if (T(r) || ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, La(r), i);
				if (r.$$typeof === te) return m(e, t, n, aa(t, r), i);
				za(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), P && Fi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return P && Fi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), P && Fi(i, h), l;
		}
		function g(i, s, c, l) {
			if (c == null) throw Error(a(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(i, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(i, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(i, h), P && Fi(i, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(i, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return P && Fi(i, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, i, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(i, e);
			}), P && Fi(i, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === b && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case v:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === b) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ae && ja(l) === r.type) {
										n(e, r.sibling), c = i(r, o.props), Ra(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === b ? (c = bi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = yi(o.type, o.key, o.props, null, e.mode, c), Ra(c, o), c.return = e, e = c);
						}
						return s(e);
					case y:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = i(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = Ci(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ae: return o = ja(o), _(e, r, o, c);
				}
				if (T(o)) return h(e, r, o, c);
				if (ce(o)) {
					if (l = ce(o), typeof l != "function") throw Error(a(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, La(o), c);
				if (o.$$typeof === te) return _(e, r, aa(e, o), c);
				za(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, o), c.return = e, e = c) : (n(e, r), c = xi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ia = 0;
				var i = _(e, t, n, r);
				return Fa = null, i;
			} catch (t) {
				if (t === Ta || t === Da) throw t;
				var a = hi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Va = Ba(!0), Ha = Ba(!1), Ua = !1;
	function Wa(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ga(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ka(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function qa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = fi(e), di(e, null, n), t;
		}
		return ci(e, r, t, n), fi(e);
	}
	function Ja(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
		}
	}
	function Ya(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Xa = !1;
	function Za() {
		if (Xa) {
			var e = ga;
			if (e !== null) throw e;
		}
	}
	function Qa(e, t, n, r) {
		Xa = !1;
		var i = e.updateQueue;
		Ua = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === ha && (Xa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var _ = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = g({}, d, f);
								break a;
							case 2: Ua = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Kl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function $a(e, t) {
		if (typeof e != "function") throw Error(a(191, e));
		e.call(t);
	}
	function eo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) $a(n[e], t);
	}
	var to = pe(null), no = pe(0);
	function ro(e, t) {
		e = Wl, A(no, e), A(to, t), Wl = e | t.baseLanes;
	}
	function io() {
		A(no, Wl), A(to, to.current);
	}
	function ao() {
		Wl = no.current, k(to), k(no);
	}
	var oo = pe(null), so = null;
	function co(e) {
		var t = e.alternate;
		A(po, po.current & 1), A(oo, e), so === null && (t === null || to.current !== null || t.memoizedState !== null) && (so = e);
	}
	function lo(e) {
		A(po, po.current), A(oo, e), so === null && (so = e);
	}
	function R(e) {
		e.tag === 22 ? (A(po, po.current), A(oo, e), so === null && (so = e)) : uo(e);
	}
	function uo() {
		A(po, po.current), A(oo, oo.current);
	}
	function fo(e) {
		k(oo), so === e && (so = null), k(po);
	}
	var po = pe(0);
	function mo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || of(n) || sf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var ho = 0, z = null, B = null, go = null, _o = !1, vo = !1, yo = !1, bo = 0, xo = 0, So = null, Co = 0;
	function V() {
		throw Error(a(321));
	}
	function wo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Ar(e[n], t[n])) return !1;
		return !0;
	}
	function To(e, t, n, r, i, a) {
		return ho = a, z = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? zs : Bs, yo = !1, a = n(r, i), yo = !1, vo && (a = Do(t, n, r, i)), Eo(e), a;
	}
	function Eo(e) {
		E.H = Rs;
		var t = B !== null && B.next !== null;
		if (ho = 0, go = B = z = null, _o = !1, xo = 0, So = null, t) throw Error(a(300));
		e === null || rc || (e = e.dependencies, e !== null && na(e) && (rc = !0));
	}
	function Do(e, t, n, r) {
		z = e;
		var i = 0;
		do {
			if (vo && (So = null), xo = 0, vo = !1, 25 <= i) throw Error(a(301));
			if (i += 1, go = B = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			E.H = Vs, o = t(n, r);
		} while (vo);
		return o;
	}
	function Oo() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? U(t) : t, e = e.useState()[0], (B === null ? null : B.memoizedState) !== e && (z.flags |= 1024), t;
	}
	function ko() {
		var e = bo !== 0;
		return bo = 0, e;
	}
	function Ao(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function jo(e) {
		if (_o) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			_o = !1;
		}
		ho = 0, go = B = z = null, vo = !1, xo = bo = 0, So = null;
	}
	function Mo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return go === null ? z.memoizedState = go = e : go = go.next = e, go;
	}
	function No() {
		if (B === null) {
			var e = z.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = B.next;
		var t = go === null ? z.memoizedState : go.next;
		if (t !== null) go = t, B = e;
		else {
			if (e === null) throw z.alternate === null ? Error(a(467)) : Error(a(310));
			B = e, e = {
				memoizedState: B.memoizedState,
				baseState: B.baseState,
				baseQueue: B.baseQueue,
				queue: B.queue,
				next: null
			}, go === null ? z.memoizedState = go = e : go = go.next = e;
		}
		return go;
	}
	function H() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function U(e) {
		var t = xo;
		return xo += 1, So === null && (So = []), e = Aa(So, e, t), t = z, (go === null ? t.memoizedState : go.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? zs : Bs), e;
	}
	function Po(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return U(e);
			if (e.$$typeof === te) return ia(e);
		}
		throw Error(a(438, String(e)));
	}
	function Fo(e) {
		var t = null, n = z.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = z.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = H(), z.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = oe;
		return t.index++, n;
	}
	function W(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Io(e) {
		return Lo(No(), B, e);
	}
	function Lo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(a(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (i !== null) {
				var s = i.next;
				i.next = o.next, o.next = s;
			}
			t.baseQueue = i = o, r.pending = null;
		}
		if (o = e.baseState, i === null) e.memoizedState = o;
		else {
			t = i.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ho & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ha && (d = !0);
					else if ((ho & p) === p) {
						u = u.next, p === ha && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, z.lanes |= p, Kl |= p;
					f = u.action, yo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, z.lanes |= f, Kl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Ar(o, e.memoizedState) && (rc = !0, d && (n = ga, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ro(e) {
		var t = No(), n = t.queue;
		if (n === null) throw Error(a(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, o = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== i);
			Ar(o, t.memoizedState) || (rc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function zo(e, t, n) {
		var r = z, i = No(), o = P;
		if (o) {
			if (n === void 0) throw Error(a(407));
			n = n();
		} else n = t();
		var s = !Ar((B || i).memoizedState, n);
		if (s && (i.memoizedState = n, rc = !0), i = i.queue, us(Ho.bind(null, r, i, e), [e]), i.getSnapshot !== t || s || go !== null && go.memoizedState.tag & 1) {
			if (r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, i, n, t), null), q === null) throw Error(a(349));
			o || ho & 127 || Bo(r, t, n);
		}
		return n;
	}
	function Bo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = z.updateQueue, t === null ? (t = H(), z.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Vo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Uo(t) && Wo(e);
	}
	function Ho(e, t, n) {
		return n(function() {
			Uo(t) && Wo(e);
		});
	}
	function Uo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Ar(e, n);
		} catch {
			return !0;
		}
	}
	function Wo(e) {
		var t = ui(e, 2);
		t !== null && gu(t, e, 2);
	}
	function Go(e) {
		var t = Mo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), yo) {
				Ge(!0);
				try {
					n();
				} finally {
					Ge(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: W,
			lastRenderedState: e
		}, t;
	}
	function Ko(e, t, n, r) {
		return e.baseState = n, Lo(e, B, typeof r == "function" ? r : W);
	}
	function qo(e, t, n, r, i) {
		if (Fs(e)) throw Error(a(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			E.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Jo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Jo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), Yo(e, t, s);
			} catch (n) {
				Zo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), Yo(e, t, a);
		} catch (n) {
			Zo(e, t, n);
		}
	}
	function Yo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Xo(e, t, n);
		}, function(n) {
			return Zo(e, t, n);
		}) : Xo(e, t, n);
	}
	function Xo(e, t, n) {
		t.status = "fulfilled", t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Jo(e, n)));
	}
	function Zo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function $o(e, t) {
		return t;
	}
	function es(e, t) {
		if (P) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = z;
					if (P) {
						if (N) {
							b: {
								for (var i = N, a = Hi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = lf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								N = lf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Wi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Mo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: $o,
			lastRenderedState: t
		}, n.queue = r, n = Ms.bind(null, z, r), r.dispatch = n, r = Go(!1), a = Ps.bind(null, z, !1, r.queue), r = Mo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = qo.bind(null, z, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ts(e) {
		return ns(No(), B, e);
	}
	function ns(e, t, n) {
		if (t = Lo(e, t, $o)[0], e = Io(W)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = U(t);
		} catch (e) {
			throw e === Ta ? Da : e;
		}
		else r = t;
		t = No();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (z.flags |= 2048, as(9, { destroy: void 0 }, rs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function rs(e, t) {
		e.action = t;
	}
	function is(e) {
		var t = No(), n = B;
		if (n !== null) return ns(t, n, e);
		No(), t = t.memoizedState, n = No();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function as(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = z.updateQueue, t === null && (t = H(), z.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function os() {
		return No().memoizedState;
	}
	function ss(e, t, n, r) {
		var i = Mo();
		z.flags |= e, i.memoizedState = as(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function cs(e, t, n, r) {
		var i = No();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		B !== null && r !== null && wo(r, B.memoizedState.deps) ? i.memoizedState = as(t, a, n, r) : (z.flags |= e, i.memoizedState = as(1 | t, a, n, r));
	}
	function ls(e, t) {
		ss(8390656, 8, e, t);
	}
	function us(e, t) {
		cs(2048, 8, e, t);
	}
	function ds(e) {
		z.flags |= 4;
		var t = z.updateQueue;
		if (t === null) t = H(), z.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function fs(e) {
		var t = No().memoizedState;
		return ds({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(a(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ps(e, t) {
		return cs(4, 2, e, t);
	}
	function ms(e, t) {
		return cs(4, 4, e, t);
	}
	function hs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function gs(e, t, n) {
		n = n == null ? null : n.concat([e]), cs(4, 4, hs.bind(null, t, e), n);
	}
	function _s() {}
	function vs(e, t) {
		var n = No();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && wo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ys(e, t) {
		var n = No();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && wo(t, r[1])) return r[0];
		if (r = e(), yo) {
			Ge(!0);
			try {
				e();
			} finally {
				Ge(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function bs(e, t, n) {
		return n === void 0 || ho & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = hu(), z.lanes |= e, Kl |= e, n);
	}
	function xs(e, t, n, r) {
		return Ar(n, t) ? n : to.current === null ? !(ho & 42) || ho & 1073741824 && !(Y & 261930) ? (rc = !0, e.memoizedState = n) : (e = hu(), z.lanes |= e, Kl |= e, t) : (e = bs(e, n, r), Ar(e, t) || (rc = !0), e);
	}
	function Ss(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, Ps(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ns(e, t, ya(c, r), mu(e)) : Ns(e, t, r, mu(e));
		} catch (n) {
			Ns(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, mu());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function Cs() {}
	function ws(e, t, n, r) {
		if (e.tag !== 5) throw Error(a(476));
		var i = Ts(e).queue;
		Ss(e, i, t, de, n === null ? Cs : function() {
			return Es(e), n(r);
		});
	}
	function Ts(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: W,
				lastRenderedState: de
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
				lastRenderedReducer: W,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Es(e) {
		var t = Ts(e);
		t.next === null && (t = e.alternate.memoizedState), Ns(e, t.next.queue, {}, mu());
	}
	function Ds() {
		return ia($f);
	}
	function Os() {
		return No().memoizedState;
	}
	function ks() {
		return No().memoizedState;
	}
	function As(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = mu();
					e = Ka(n);
					var r = qa(t, e, n);
					r !== null && (gu(r, t, n), Ja(r, t, n)), t = { cache: da() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function js(e, t, n) {
		var r = mu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e) ? Is(t, n) : (n = li(e, t, n, r), n !== null && (gu(n, e, r), Ls(n, t, r)));
	}
	function Ms(e, t, n) {
		Ns(e, t, n, mu());
	}
	function Ns(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Fs(e)) Is(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Ar(s, o)) return ci(e, t, i, 0), q === null && si(), !1;
			} catch {}
			if (n = li(e, t, i, r), n !== null) return gu(n, e, r), Ls(n, t, r), !0;
		}
		return !1;
	}
	function Ps(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: fd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e)) {
			if (t) throw Error(a(479));
		} else t = li(e, n, r, 2), t !== null && gu(t, e, 2);
	}
	function Fs(e) {
		var t = e.alternate;
		return e === z || t !== null && t === z;
	}
	function Is(e, t) {
		vo = _o = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ls(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ct(e, n);
		}
	}
	var Rs = {
		readContext: ia,
		use: Po,
		useCallback: V,
		useContext: V,
		useEffect: V,
		useImperativeHandle: V,
		useLayoutEffect: V,
		useInsertionEffect: V,
		useMemo: V,
		useReducer: V,
		useRef: V,
		useState: V,
		useDebugValue: V,
		useDeferredValue: V,
		useTransition: V,
		useSyncExternalStore: V,
		useId: V,
		useHostTransitionStatus: V,
		useFormState: V,
		useActionState: V,
		useOptimistic: V,
		useMemoCache: V,
		useCacheRefresh: V
	};
	Rs.useEffectEvent = V;
	var zs = {
		readContext: ia,
		use: Po,
		useCallback: function(e, t) {
			return Mo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ia,
		useEffect: ls,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ss(4194308, 4, hs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ss(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ss(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Mo();
			t = t === void 0 ? null : t;
			var r = e();
			if (yo) {
				Ge(!0);
				try {
					e();
				} finally {
					Ge(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Mo();
			if (n !== void 0) {
				var i = n(t);
				if (yo) {
					Ge(!0);
					try {
						n(t);
					} finally {
						Ge(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = js.bind(null, z, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Mo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Go(e);
			var t = e.queue, n = Ms.bind(null, z, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return bs(Mo(), e, t);
		},
		useTransition: function() {
			var e = Go(!1);
			return e = Ss.bind(null, z, e.queue, !0, !1), Mo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = z, i = Mo();
			if (P) {
				if (n === void 0) throw Error(a(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(a(349));
				Y & 127 || Bo(r, t, n);
			}
			i.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return i.queue = o, ls(Ho.bind(null, r, o, e), [e]), r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Mo(), t = q.identifierPrefix;
			if (P) {
				var n = Pi, r = Ni;
				n = (r & ~(1 << 32 - Ke(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = bo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Co++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ds,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e) {
			var t = Mo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ps.bind(null, z, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Fo,
		useCacheRefresh: function() {
			return Mo().memoizedState = As.bind(null, z);
		},
		useEffectEvent: function(e) {
			var t = Mo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(a(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Bs = {
		readContext: ia,
		use: Po,
		useCallback: vs,
		useContext: ia,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Io,
		useRef: os,
		useState: function() {
			return Io(W);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return xs(No(), B.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(W)[0], t = No().memoizedState;
			return [typeof e == "boolean" ? e : U(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			return Ko(No(), B, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: ks
	};
	Bs.useEffectEvent = fs;
	var Vs = {
		readContext: ia,
		use: Po,
		useCallback: vs,
		useContext: ia,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Ro,
		useRef: os,
		useState: function() {
			return Ro(W);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			var n = No();
			return B === null ? bs(n, e, t) : xs(n, B.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(W)[0], t = No().memoizedState;
			return [typeof e == "boolean" ? e : U(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			var n = No();
			return B === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ko(n, B, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: ks
	};
	Vs.useEffectEvent = fs;
	function Hs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : g({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Us = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ka(r);
			i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (gu(t, e, r), Ja(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ka(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (gu(t, e, r), Ja(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = mu(), r = Ka(n);
			r.tag = 2, t != null && (r.callback = t), t = qa(e, r, n), t !== null && (gu(t, e, n), Ja(t, e, n));
		}
	};
	function Ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !jr(n, r) || !jr(i, a) : !0;
	}
	function Gs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Us.enqueueReplaceState(t, t.state, null);
	}
	function Ks(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = g({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function qs(e) {
		ii(e);
	}
	function Js(e) {
		console.error(e);
	}
	function Ys(e) {
		ii(e);
	}
	function Xs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Zs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
		return n = Ka(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Xs(e, t);
		}, n;
	}
	function $s(e) {
		return e = Ka(e), e.tag = 3, e;
	}
	function ec(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Zs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Zs(t, n, r), typeof i != "function" && (iu === null ? iu = new Set([this]) : iu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function tc(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ta(t, n, i, !0), n = oo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return so === null ? Ou() : n.alternate === null && Gl === 0 && (Gl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Oa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Ku(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Oa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Ku(e, r, i)), !1;
				}
				throw Error(a(435, n.tag));
			}
			return Ku(e, r, i), Ou(), !1;
		}
		if (P) return t = oo.current, t === null ? (r !== Ui && (t = Error(a(423), { cause: r }), Xi(Ti(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Ti(r, n), i = Qs(e.stateNode, r, i), Ya(e, i), Gl !== 4 && (Gl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== Ui && (e = Error(a(422), { cause: r }), Xi(Ti(e, n)))), !1;
		var o = Error(a(520), { cause: r });
		if (o = Ti(o, n), Zl === null ? Zl = [o] : Zl.push(o), Gl !== 4 && (Gl = 2), t === null) return !0;
		r = Ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = Qs(n.stateNode, r, e), Ya(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (iu === null || !iu.has(o)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = $s(i), ec(i, e, n, r), Ya(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var nc = Error(a(461)), rc = !1;
	function ic(e, t, n, r) {
		t.child = e === null ? Ha(t, null, n, r) : Va(t, e.child, n, r);
	}
	function ac(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ra(t), r = To(e, t, n, o, a, i), s = ko(), e !== null && !rc ? (Ao(e, t, i), kc(e, t, i)) : (P && s && Li(t), t.flags |= 1, ic(e, t, r, i), t.child);
	}
	function oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !gi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = yi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ac(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? jr : n, n(o, r) && e.ref === t.ref) return kc(e, t, i);
		}
		return t.flags |= 1, e = _i(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function sc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (jr(a, r) && e.ref === t.ref) if (rc = !1, t.pendingProps = r = a, Ac(e, i)) e.flags & 131072 && (rc = !0);
			else return t.lanes = e.lanes, kc(e, t, i);
		}
		return hc(e, t, n, r, i);
	}
	function cc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && Ca(t, a === null ? null : a.cachePool), a === null ? io() : ro(t, a), R(t);
			else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && Ca(t, null), io(), uo(t)) : (Ca(t, a.cachePool), ro(t, a), uo(t), t.memoizedState = null);
		return ic(e, t, i, n), t.child;
	}
	function lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function uc(e, t, n, r, i) {
		var a = Sa();
		return a = a === null ? null : {
			parent: ua._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && Ca(t, null), io(), R(t), e !== null && ta(e, t, r, !0), t.childLanes = i, null;
	}
	function dc(e, t) {
		return t = wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function fc(e, t, n) {
		return Va(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, fo(t), t.memoizedState = null, e;
	}
	function pc(e, t, n) {
		var r = t.pendingProps, i = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (P) {
				if (r.mode === "hidden") return e = dc(t, r), t.lanes = 536870912, lc(null, e);
				if (lo(t), (e = N) ? (e = af(e, Hi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, N = null)) : e = null, e === null) throw Wi(t);
				return t.lanes = 536870912, null;
			}
			return dc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (lo(t), i) if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(a(558));
			else if (rc || ta(e, t, n, !1), i = (n & e.childLanes) !== 0, rc || i) {
				if (r = q, r !== null && (s = lt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ui(e, s), gu(r, e, s), nc;
				Ou(), t = fc(e, t, n);
			} else e = o.treeContext, N = lf(s.nextSibling), Bi = t, P = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = dc(t, r), t.flags |= 4096;
			return t;
		}
		return e = _i(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function mc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(a(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function hc(e, t, n, r, i) {
		return ra(t), n = To(e, t, n, r, void 0, i), r = ko(), e !== null && !rc ? (Ao(e, t, i), kc(e, t, i)) : (P && r && Li(t), t.flags |= 1, ic(e, t, n, i), t.child);
	}
	function gc(e, t, n, r, i, a) {
		return ra(t), t.updateQueue = null, n = Do(t, r, n, i), Eo(e), r = ko(), e !== null && !rc ? (Ao(e, t, a), kc(e, t, a)) : (P && r && Li(t), t.flags |= 1, ic(e, t, n, a), t.child);
	}
	function _c(e, t, n, r, i) {
		if (ra(t), t.stateNode === null) {
			var a = pi, o = n.contextType;
			typeof o == "object" && o && (a = ia(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Us, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Wa(t), o = n.contextType, a.context = typeof o == "object" && o ? ia(o) : pi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Us.enqueueReplaceState(a, a.state, null), Qa(t, r, a, i), Za(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ks(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = pi, typeof u == "object" && u && (o = ia(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Gs(t, a, r, o), Ua = !1;
			var f = t.memoizedState;
			a.state = f, Qa(t, r, a, i), Za(), l = t.memoizedState, s || f !== l || Ua ? (typeof d == "function" && (Hs(t, n, d, r), l = t.memoizedState), (c = Ua || Ws(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ga(e, t), o = t.memoizedProps, u = Ks(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = pi, typeof l == "object" && l && (c = ia(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Gs(t, a, r, c), Ua = !1, f = t.memoizedState, a.state = f, Qa(t, r, a, i), Za();
			var p = t.memoizedState;
			o !== d || f !== p || Ua || e !== null && e.dependencies !== null && na(e.dependencies) ? (typeof s == "function" && (Hs(t, n, s, r), p = t.memoizedState), (u = Ua || Ws(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && na(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, mc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Va(t, e.child, null, i), t.child = Va(t, null, n, i)) : ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = kc(e, t, i), e;
	}
	function vc(e, t, n, r) {
		return Ji(), t.flags |= 256, ic(e, t, n, r), t.child;
	}
	var yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function bc(e) {
		return {
			baseLanes: e,
			cachePool: wa()
		};
	}
	function xc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Yl), e;
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, i = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (po.current & 2) != 0), s && (i = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (P) {
				if (i ? co(t) : uo(t), (e = N) ? (e = af(e, Hi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, N = null)) : e = null, e === null) throw Wi(t);
				return sf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, i ? (uo(t), i = t.mode, c = wc({
				mode: "hidden",
				children: c
			}, i), r = bi(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(null, r)) : (co(t), Cc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (co(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (uo(t), c = r.fallback, i = t.mode, r = wc({
				mode: "visible",
				children: r.children
			}, i), c = bi(c, i, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Va(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, t = lc(null, r)) : (uo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (co(t), sf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(a(419)), r.stack = "", r.digest = s, Xi({
					value: r,
					source: null,
					stack: null
				}), t = Tc(e, t, n);
			} else if (rc || ta(e, t, n, !1), s = (n & e.childLanes) !== 0, rc || s) {
				if (s = q, s !== null && (r = lt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ui(e, r), gu(s, e, r), nc;
				of(c) || Ou(), t = Tc(e, t, n);
			} else of(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, N = lf(c.nextSibling), Bi = t, P = !0, Vi = null, Hi = !1, e !== null && zi(t, e), t = Cc(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (uo(t), c = r.fallback, i = t.mode, l = e.child, u = l.sibling, r = _i(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = bi(c, i, n, null), c.flags |= 2) : c = _i(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (i = c.cachePool, i === null ? i = wa() : (l = ua._currentValue, i = i.parent === l ? i : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: i
		}), r.memoizedState = c, r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(e.child, r)) : (co(t), n = e.child, e = n.sibling, n = _i(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Cc(e, t) {
		return t = wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function wc(e, t) {
		return e = hi(22, e, null, t), e.lanes = 0, e;
	}
	function Tc(e, t, n) {
		return Va(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ec(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), L(e.return, t, n);
	}
	function Dc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = po.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, A(po, o), ic(e, t, r, n), r = P ? ki : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ec(e, n, t);
			else if (e.tag === 19) Ec(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && mo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Dc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && mo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Dc(t, !0, n, null, a, r);
				break;
			case "together":
				Dc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function kc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Kl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ta(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(a(153));
		if (t.child !== null) {
			for (e = t.child, n = _i(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = _i(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ac(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && na(e))) : !0;
	}
	function jc(e, t, n) {
		switch (t.tag) {
			case 3:
				ve(t, t.stateNode.containerInfo), $i(t, ua, e.memoizedState.cache), Ji();
				break;
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve(t, t.stateNode.containerInfo);
				break;
			case 10:
				$i(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, lo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (co(t), e = kc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (co(t), t.flags |= 128, null);
				co(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ta(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Oc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), A(po, po.current), r) break;
				return null;
			case 22: return t.lanes = 0, cc(e, t, n, t.pendingProps);
			case 24: $i(t, ua, e.memoizedState.cache);
		}
		return kc(e, t, n);
	}
	function Mc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) rc = !0;
		else {
			if (!Ac(e, n) && !(t.flags & 128)) return rc = !1, jc(e, t, n);
			rc = !!(e.flags & 131072);
		}
		else rc = !1, P && t.flags & 1048576 && Ii(t, ki, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ja(t.elementType), t.type = e, typeof e == "function") gi(e) ? (r = Ks(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
					else {
						if (e != null) {
							var i = e.$$typeof;
							if (i === C) {
								t.tag = 11, t = ac(null, t, e, r, n);
								break a;
							} else if (i === ie) {
								t.tag = 14, t = oc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ue(e) || e, Error(a(306, t, ""));
					}
				}
				return t;
			case 0: return hc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = Ks(r, t.pendingProps), _c(e, t, r, i, n);
			case 3:
				a: {
					if (ve(t, t.stateNode.containerInfo), e === null) throw Error(a(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					i = o.element, Ga(e, t), Qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, $i(t, ua, r), r !== o.cache && ea(t, [ua], n, !0), Za(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = vc(e, t, r, n);
						break a;
					} else if (r !== i) {
						i = Ti(Error(a(424)), t), Xi(i), t = vc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (N = lf(e.firstChild), Bi = t, P = !0, Vi = null, Hi = !0, n = Ha(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ji(), r === i) {
							t = kc(e, t, n);
							break a;
						}
						ic(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return mc(e, t), e === null ? (n = Af(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : P || (n = t.type, e = t.pendingProps, r = Vd(ge.current).createElement(n), r[ht] = t, r[gt] = e, Fd(r, n, e), Ot(r), t.stateNode = r) : t.memoizedState = Af(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return be(t), e === null && P && (r = t.stateNode = pf(t.type, t.pendingProps, ge.current), Bi = t, Hi = !0, i = N, Qd(t.type) ? (uf = i, N = lf(r.firstChild)) : N = i), ic(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && P && ((i = r = N) && (r = nf(r, t.type, t.pendingProps, Hi), r === null ? i = !1 : (t.stateNode = r, Bi = t, N = lf(r.firstChild), Hi = !1, i = !0)), i || Wi(t)), be(t), i = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Wd(i, o) ? r = null : s !== null && Wd(i, s) && (t.flags |= 32), t.memoizedState !== null && (i = To(e, t, Oo, null, null, n), $f._currentValue = i), mc(e, t), ic(e, t, r, n), t.child;
			case 6: return e === null && P && ((e = n = N) && (n = rf(n, t.pendingProps, Hi), n === null ? e = !1 : (t.stateNode = n, Bi = t, N = null, e = !0)), e || Wi(t)), null;
			case 13: return Sc(e, t, n);
			case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Va(t, null, r, n) : ic(e, t, r, n), t.child;
			case 11: return ac(e, t, t.type, t.pendingProps, n);
			case 7: return ic(e, t, t.pendingProps, n), t.child;
			case 8: return ic(e, t, t.pendingProps.children, n), t.child;
			case 12: return ic(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, $i(t, t.type, r.value), ic(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, ra(t), i = ia(i), r = r(i), t.flags |= 1, ic(e, t, r, n), t.child;
			case 14: return oc(e, t, t.type, t.pendingProps, n);
			case 15: return sc(e, t, t.type, t.pendingProps, n);
			case 19: return Oc(e, t, n);
			case 31: return pc(e, t, n);
			case 22: return cc(e, t, n, t.pendingProps);
			case 24: return ra(t), r = ia(ua), e === null ? (i = Sa(), i === null && (i = q, o = da(), i.pooledCache = o, o.refCount++, o !== null && (i.pooledCacheLanes |= n), i = o), t.memoizedState = {
				parent: r,
				cache: i
			}, Wa(t), $i(t, ua, i)) : ((e.lanes & n) !== 0 && (Ga(e, t), Qa(t, null, null, n), Za()), i = e.memoizedState, o = t.memoizedState, i.parent === r ? (r = o.cache, $i(t, ua, r), r !== i.cache && ea(t, [ua], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), $i(t, ua, r))), ic(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(a(156, t.tag));
	}
	function Nc(e) {
		e.flags |= 4;
	}
	function Pc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Tu()) e.flags |= 8192;
			else throw Ma = Oa, Ea;
		} else e.flags &= -16777217;
	}
	function Fc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Gf(t)) if (Tu()) e.flags |= 8192;
		else throw Ma = Oa, Ea;
	}
	function Ic(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : rt(), e.lanes |= t, Xl |= t);
	}
	function Lc(e, t) {
		if (!P) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function G(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Ri(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return G(t), null;
			case 1: return G(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), I(ua), ye(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? Nc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Yi())), G(t), null;
			case 26:
				var i = t.type, o = t.memoizedState;
				return e === null ? (Nc(t), o === null ? (G(t), Pc(t, i, null, r, n)) : (G(t), Fc(t, o))) : o ? o === e.memoizedState ? (G(t), t.flags &= -16777217) : (Nc(t), G(t), Fc(t, o)) : (e = e.memoizedProps, e !== r && Nc(t), G(t), Pc(t, i, e, r, n)), null;
			case 27:
				if (xe(t), n = ge.current, i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return G(t), null;
					}
					e = me.current, qi(t) ? Gi(t, e) : (e = pf(i, r, n), t.stateNode = e, Nc(t));
				}
				return G(t), null;
			case 5:
				if (xe(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(a(166));
						return G(t), null;
					}
					if (o = me.current, qi(t)) Gi(t, o);
					else {
						var s = Vd(ge.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", i);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
								break;
							default: switch (i) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", i);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", i);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(i, { is: r.is }) : s.createElement(i);
							}
						}
						o[ht] = t, o[gt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Fd(o, i, r), i) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Nc(t);
					}
				}
				return G(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(a(166));
					if (e = ge.current, qi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = Bi, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[ht] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Nd(e.nodeValue, n)), e || Wi(t, !0);
					} else e = Vd(e).createTextNode(r), e[ht] = t, t.stateNode = e;
				}
				return G(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = qi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(a(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(a(557));
							e[ht] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						G(t), e = !1;
					} else n = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (fo(t), t) : (fo(t), null);
					if (t.flags & 128) throw Error(a(558));
				}
				return G(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = qi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(a(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(a(317));
							i[ht] = t;
						} else Ji(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						G(t), i = !1;
					} else i = Yi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
					if (!i) return t.flags & 256 ? (fo(t), t) : (fo(t), null);
				}
				return fo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ic(t, t.updateQueue), G(t), null);
			case 4: return ye(), e === null && Cd(t.stateNode.containerInfo), G(t), null;
			case 10: return I(t.type), G(t), null;
			case 19:
				if (k(po), r = t.memoizedState, r === null) return G(t), null;
				if (i = (t.flags & 128) != 0, o = r.rendering, o === null) if (i) Lc(r, !1);
				else {
					if (Gl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = mo(e), o !== null) {
							for (t.flags |= 128, Lc(r, !1), e = o.updateQueue, t.updateQueue = e, Ic(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) vi(n, e), n = n.sibling;
							return A(po, po.current & 1 | 2), P && Fi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Pe() > nu && (t.flags |= 128, i = !0, Lc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!i) if (e = mo(o), e !== null) {
						if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Ic(t, e), Lc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !P) return G(t), null;
					} else 2 * Pe() - r.renderingStartTime > nu && n !== 536870912 && (t.flags |= 128, i = !0, Lc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (G(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Pe(), e.sibling = null, n = po.current, A(po, i ? n & 1 | 2 : n & 1), P && Fi(t, r.treeForkCount), e);
			case 22:
			case 23: return fo(t), ao(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (G(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : G(t), n = t.updateQueue, n !== null && Ic(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && k(xa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), I(ua), G(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(a(156, t.tag));
	}
	function zc(e, t) {
		switch (Ri(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return I(ua), ye(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return xe(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (fo(t), t.alternate === null) throw Error(a(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (fo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(a(340));
					Ji();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return k(po), null;
			case 4: return ye(), null;
			case 10: return I(t.type), null;
			case 22:
			case 23: return fo(t), ao(), e !== null && k(xa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return I(ua), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Ri(t), t.tag) {
			case 3:
				I(ua), ye();
				break;
			case 26:
			case 27:
			case 5:
				xe(t);
				break;
			case 4:
				ye();
				break;
			case 31:
				t.memoizedState !== null && fo(t);
				break;
			case 13:
				fo(t);
				break;
			case 19:
				k(po);
				break;
			case 10:
				I(t.type);
				break;
			case 22:
			case 23:
				fo(t), ao(), e !== null && k(xa);
				break;
			case 24: I(ua);
		}
	}
	function Vc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				eo(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Ks(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function qc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			Id(r, e.type, n, t), r[gt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Qd(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Qd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = cn));
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Qd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Fd(t, r, n), t[ht] = e, t[gt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, zd = cp, e = Fr(e), Ir(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = s + i), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Bd = {
			focusedElem: e,
			selectionRange: n
		}, cp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, i = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ks(n.type, i);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) tf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								tf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(a(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ks(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						eo(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Yu.bind(null, n), cf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Cl(e, n, (n.subtreeFlags & 8772) != 0) : xl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ct(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var cl = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (We && typeof We.onCommitFiberUnmount == "function") try {
			We.onCommitFiberUnmount(Ue, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = cl, i = ll;
				Qd(n.type) && (cl = n.stateNode, ll = !1), ul(e, t, n), mf(n.stateNode), cl = r, ll = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = cl, i = ll, cl = null, ul(e, t, n), cl = r, ll = i, cl !== null) if (ll) try {
					(cl.nodeType === 9 ? cl.body : cl.nodeName === "HTML" ? cl.ownerDocument.body : cl).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					cl.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				cl !== null && (ll ? (e = cl, $d(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Pp(e)) : $d(cl, n.stateNode));
				break;
			case 4:
				r = cl, i = ll, cl = n.stateNode.containerInfo, ll = !0, ul(e, t, n), cl = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), ul(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, ul(e, t, n), tl = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Pp(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Pp(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
			default: throw Error(a(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Xu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Qd(c.type)) {
							cl = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						cl = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						cl = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (cl === null) throw Error(a(160));
			dl(o, s, i), cl = null, ll = !1, o = i.alternate, o !== null && (o.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = _l;
				if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									o = i.getElementsByTagName("title")[0], (!o || o[St] || o[ht] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = i.createElement(r), i.head.insertBefore(o, i.querySelector("head > title"))), Fd(o, r, n), o[ht] = e, Ot(o), r = o;
									break a;
								case "link":
									var s = Hf("link", "href", i).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = i.createElement(r), Fd(o, r, n), i.head.appendChild(o);
									break;
								case "meta":
									if (s = Hf("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = i.createElement(r), Fd(o, r, n), i.head.appendChild(o);
									break;
								default: throw Error(a(468, r));
							}
							o[ht] = e, Ot(o), r = o;
						}
						e.stateNode = r;
					} else Uf(i, e.type, e.stateNode);
					else e.stateNode = Lf(i, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Uf(i, e.type, e.stateNode) : Lf(i, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						$t(i, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, Jc(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (nl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(a(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Vf = null, i = _l, _l = _f(t.containerInfo), gl(t, e), _l = i, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Pp(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				nl && (nl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = _f(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (eu = Pe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				i = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || i, tl = d || l, gl(t, e), tl = d, el = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = i ? t._visibility & -2 : t._visibility | 1, i && (n === null || l || el || tl || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, i) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = i ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								i ? ef(m, !0) : ef(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(a(160));
				switch (n.tag) {
					case 27:
						var i = n.stateNode;
						Qc(e, Xc(e), i);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && ($t(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
						break;
					default: throw Error(a(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), Sl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), Sl(t);
					break;
				case 27: mf(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Vc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) $a(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && fa(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && fa(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && fa(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Vc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Kf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = _f(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Hc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: fa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = ia(ua), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ia(ua).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = null, Ql = null, $l = !1, eu = 0, tu = 0, nu = Infinity, ru = null, iu = null, au = 0, ou = null, su = null, cu = 0, lu = 0, uu = null, du = null, fu = 0, pu = null;
	function mu() {
		return K & 2 && Y !== 0 ? Y & -Y : E.T === null ? ft() : fd();
	}
	function hu() {
		if (Yl === 0) if (!(Y & 536870912) || P) {
			var e = Ze;
			Ze <<= 1, !(Ze & 3932160) && (Ze = 262144), Yl = e;
		} else Yl = 536870912;
		return e = oo.current, e !== null && (e.flags |= 32), Yl;
	}
	function gu(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Cu(e, 0), bu(e, Y, Yl, !1)), at(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (ql |= n), Gl === 4 && bu(e, Y, Yl, !1)), id(e));
	}
	function _u(e, t, n) {
		if (K & 6) throw Error(a(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || tt(e, t), i = r ? ju(e, t) : ku(e, t, !0), o = r;
		do {
			if (i === 0) {
				Hl && !r && bu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !yu(n)) {
					i = ku(e, t, !1), o = !1;
					continue;
				}
				if (i === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							i = Zl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Cu(c, s).flags |= 256), s = ku(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, ql |= o, i = 4;
									break a;
								}
								o = Ql, Ql = i, o !== null && (Ql === null ? Ql = o : Ql.push.apply(Ql, o));
							}
							i = s;
						}
						if (o = !1, i !== 2) continue;
					}
				}
				if (i === 1) {
					Cu(e, 0), bu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = i, o) {
						case 0:
						case 1: throw Error(a(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							bu(r, t, Yl, !Vl);
							break a;
						case 2:
							Ql = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(a(329));
					}
					if ((t & 62914560) === t && (i = eu + 300 - Pe(), 10 < i)) {
						if (bu(r, t, Yl, !Vl), et(r, 0, !0) !== 0) break a;
						cu = t, r.timeoutHandle = qd(vu.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, "Throttled", -0, 0), i);
						break a;
					}
					vu(r, n, Ql, ru, $l, t, Yl, ql, Xl, Vl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		id(e);
	}
	function vu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: cn
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? eu - Pe() : (a & 4194048) === a ? tu - Pe() : 0;
			if (m = Jf(d, m), m !== null) {
				cu = a, e.cancelPendingCommit = m(Ru.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), bu(e, a, o, !l);
				return;
			}
		}
		Ru(e, t, a, n, r, i, o, s, c);
	}
	function yu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Ar(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function bu(e, t, n, r) {
		t &= ~Jl, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ke(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && st(e, n, t);
	}
	function xu() {
		return K & 6 ? !0 : (ad(0, !1), !1);
	}
	function Su() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Qi = F = null, jo(e), Fa = null, Ia = 0, e = J;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Cu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Jd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cu = 0, Su(), q = e, J = n = _i(e.current, null), Y = t, X = 0, Bl = null, Vl = !1, Hl = tt(e, t), Ul = !1, Xl = Yl = Jl = ql = Kl = Gl = 0, Ql = Zl = null, $l = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ke(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, si(), n;
	}
	function wu(e, t) {
		z = null, E.H = Rs, t === Ta || t === Da ? (t = Na(), X = 3) : t === Ea ? (t = Na(), X = 4) : X = t === nc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, J === null && (Gl = 1, Xs(e, Ti(t, e.current)));
	}
	function Tu() {
		var e = oo.current;
		return e === null ? !0 : (Y & 4194048) === Y ? so === null : (Y & 62914560) === Y || Y & 536870912 ? e === so : !1;
	}
	function Eu() {
		var e = E.H;
		return E.H = Rs, e === null ? Rs : e;
	}
	function Du() {
		var e = E.A;
		return E.A = Rl, e;
	}
	function Ou() {
		Gl = 4, Vl || (Y & 4194048) !== Y && oo.current !== null || (Hl = !0), !(Kl & 134217727) && !(ql & 134217727) || q === null || bu(q, Y, Yl, !1);
	}
	function ku(e, t, n) {
		var r = K;
		K |= 2;
		var i = Eu(), a = Du();
		(q !== e || Y !== t) && (ru = null, Cu(e, t)), t = !1;
		var o = Gl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = Bl;
					switch (X) {
						case 8:
							Su(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							oo.current === null && (t = !0);
							var l = X;
							if (X = 0, Bl = null, Fu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, Bl = null, Fu(e, s, c, l);
					}
				}
				Au(), o = Gl;
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Qi = F = null, K = r, E.H = i, E.A = a, J === null && (q = null, Y = 0, si()), o;
	}
	function Au() {
		for (; J !== null;) Nu(J);
	}
	function ju(e, t) {
		var n = K;
		K |= 2;
		var r = Eu(), i = Du();
		q !== e || Y !== t ? (ru = null, nu = Pe() + 500, Cu(e, t)) : Hl = tt(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = Bl;
					b: switch (X) {
						case 1:
							X = 0, Bl = null, Fu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ka(o)) {
								X = 0, Bl = null, Pu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), id(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							ka(o) ? (X = 0, Bl = null, Pu(t)) : (X = 0, Bl = null, Fu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Gf(s) : c.stateNode.complete) {
										X = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Iu(u));
										}
										break b;
									}
							}
							X = 0, Bl = null, Fu(e, t, o, 5);
							break;
						case 6:
							X = 0, Bl = null, Fu(e, t, o, 6);
							break;
						case 8:
							Su(), Gl = 6;
							break a;
						default: throw Error(a(462));
					}
				}
				Mu();
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return Qi = F = null, E.H = r, E.A = i, K = n, J === null ? (q = null, Y = 0, si(), Gl) : 0;
	}
	function Mu() {
		for (; J !== null && !Me();) Nu(J);
	}
	function Nu(e) {
		var t = Mc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Pu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = gc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = gc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: jo(t);
			default: Bc(n, t), t = J = vi(t, Wl), t = Mc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : J = t;
	}
	function Fu(e, t, n, r) {
		Qi = F = null, jo(t), Fa = null, Ia = 0;
		var i = t.return;
		try {
			if (tc(e, i, t, n, Y)) {
				Gl = 1, Xs(e, Ti(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Gl = 1, Xs(e, Ti(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (P || r === 1 ? e = !0 : Hl || Y & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = oo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Lu(t, e)) : Iu(t);
	}
	function Iu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Lu(t, Vl);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Wl);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Gl === 0 && (Gl = 5);
	}
	function Lu(e, t) {
		do {
			var n = zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Gl = 6, J = null;
	}
	function Ru(e, t, n, r, i, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Uu();
		while (au !== 0);
		if (K & 6) throw Error(a(327));
		if (t !== null) {
			if (t === e.current) throw Error(a(177));
			if (o = t.lanes | t.childLanes, o |= oi, ot(e, n, o, s, c, l), e === q && (J = q = null, Y = 0), su = t, ou = e, cu = n, lu = o, uu = i, du = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Zu(Re, function() {
				return Wu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, i = D.p, D.p = 2, s = K, K |= 4;
				try {
					al(e, t, n);
				} finally {
					K = s, D.p = i, E.T = r;
				}
			}
			au = 1, zu(), Bu(), Vu();
		}
	}
	function zu() {
		if (au === 1) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = K;
				K |= 4;
				try {
					vl(t, e);
					var a = Bd, o = Fr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Pr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Ir(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Nr(s, h), v = Nr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					cp = !!zd, Bd = zd = null;
				} finally {
					K = i, D.p = r, E.T = n;
				}
			}
			e.current = t, au = 2;
		}
	}
	function Bu() {
		if (au === 2) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = K;
				K |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					K = i, D.p = r, E.T = n;
				}
			}
			au = 3;
		}
	}
	function Vu() {
		if (au === 4 || au === 3) {
			au = 0, Ne();
			var e = ou, t = su, n = cu, r = du;
			t.subtreeFlags & 10256 || t.flags & 10256 ? au = 5 : (au = 0, su = ou = null, Hu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (iu = null), dt(n), t = t.stateNode, We && typeof We.onCommitFiberRoot == "function") try {
				We.onCommitFiberRoot(Ue, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = E.T, i = D.p, D.p = 2, E.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					E.T = t, D.p = i;
				}
			}
			cu & 3 && Uu(), id(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === pu ? fu++ : (fu = 0, pu = e) : fu = 0, ad(0, !1);
		}
	}
	function Hu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, fa(t)));
	}
	function Uu() {
		return zu(), Bu(), Vu(), Wu();
	}
	function Wu() {
		if (au !== 5) return !1;
		var e = ou, t = lu;
		lu = 0;
		var n = dt(cu), r = E.T, i = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = uu, uu = null;
			var o = ou, s = cu;
			if (au = 0, su = ou = null, cu = 0, K & 6) throw Error(a(331));
			var c = K;
			if (K |= 4, Fl(o.current), Dl(o, o.current, s, n), K = c, ad(0, !1), We && typeof We.onPostCommitFiberRoot == "function") try {
				We.onPostCommitFiberRoot(Ue, o);
			} catch {}
			return !0;
		} finally {
			D.p = i, E.T = r, Hu(e, t);
		}
	}
	function Gu(e, t, n) {
		t = Ti(n, t), t = Qs(e.stateNode, t, 2), e = qa(e, t, 2), e !== null && (at(e, 2), id(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Gu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Gu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (iu === null || !iu.has(r))) {
					e = Ti(n, e), n = $s(2), r = qa(t, n, 2), r !== null && (ec(n, r, t, e), at(r, 2), id(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = qu.bind(null, e, t, n), t.then(e, e));
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Gl === 4 || Gl === 3 && (Y & 62914560) === Y && 300 > Pe() - eu ? !(K & 2) && Cu(e, 0) : Jl |= n, Xl === Y && (Xl = 0)), id(e);
	}
	function Ju(e, t) {
		t === 0 && (t = rt()), e = ui(e, t), e !== null && (at(e, t), id(e));
	}
	function Yu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ju(e, n);
	}
	function Xu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(a(314));
		}
		r !== null && r.delete(t), Ju(e, n);
	}
	function Zu(e, t) {
		return Ae(e, t);
	}
	var Qu = null, $u = null, ed = !1, td = !1, nd = !1, rd = 0;
	function id(e) {
		e !== $u && e.next === null && ($u === null ? Qu = $u = e : $u = $u.next = e), td = !0, ed || (ed = !0, dd());
	}
	function ad(e, t) {
		if (!nd && td) {
			nd = !0;
			do
				for (var n = !1, r = Qu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ke(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ud(r, a));
					} else a = Y, a = et(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || tt(r, a) || (n = !0, ud(r, a));
					r = r.next;
				}
			while (n);
			nd = !1;
		}
	}
	function od() {
		sd();
	}
	function sd() {
		td = ed = !1;
		var e = 0;
		rd !== 0 && Kd() && (e = rd);
		for (var t = Pe(), n = null, r = Qu; r !== null;) {
			var i = r.next, a = cd(r, t);
			a === 0 ? (r.next = null, n === null ? Qu = i : n.next = i, i === null && ($u = n)) : (n = r, (e !== 0 || a & 3) && (td = !0)), r = i;
		}
		au !== 0 && au !== 5 || ad(e, !1), rd !== 0 && (rd = 0);
	}
	function cd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ke(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = nt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = et(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && je(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || tt(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && je(r), dt(n)) {
				case 2:
				case 8:
					n = Le;
					break;
				case 32:
					n = Re;
					break;
				case 268435456:
					n = Be;
					break;
				default: n = Re;
			}
			return r = ld.bind(null, e), n = Ae(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && je(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ld(e, t) {
		if (au !== 0 && au !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Uu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = et(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (_u(e, r, t), cd(e, Pe()), e.callbackNode != null && e.callbackNode === n ? ld.bind(null, e) : null);
	}
	function ud(e, t) {
		if (Uu()) return null;
		_u(e, t, !0);
	}
	function dd() {
		Xd(function() {
			K & 6 ? Ae(Ie, od) : sd();
		});
	}
	function fd() {
		if (rd === 0) {
			var e = ha;
			e === 0 && (e = Xe, Xe <<= 1, !(Xe & 261888) && (Xe = 256)), rd = e;
		}
		return rd;
	}
	function pd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : sn("" + e);
	}
	function md(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function hd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = pd((i[gt] || null).action), o = r.submitter;
			o && (t = (t = o[gt] || null) ? pd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new kn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (rd !== 0) {
								var e = o ? md(i, o) : new FormData(i);
								ws(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? md(i, o) : new FormData(i), ws(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var gd = 0; gd < ni.length; gd++) {
		var _d = ni[gd];
		ri(_d.toLowerCase(), "on" + (_d[0].toUpperCase() + _d.slice(1)));
	}
	ri(Jr, "onAnimationEnd"), ri(Yr, "onAnimationIteration"), ri(Xr, "onAnimationStart"), ri("dblclick", "onDoubleClick"), ri("focusin", "onFocus"), ri("focusout", "onBlur"), ri(Zr, "onTransitionRun"), ri(Qr, "onTransitionStart"), ri($r, "onTransitionCancel"), ri(ei, "onTransitionEnd"), Mt("onMouseEnter", ["mouseout", "mouseover"]), Mt("onMouseLeave", ["mouseout", "mouseover"]), Mt("onPointerEnter", ["pointerout", "pointerover"]), Mt("onPointerLeave", ["pointerout", "pointerover"]), jt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), jt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), jt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), jt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), jt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), jt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var vd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vd));
	function bd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ii(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ii(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[vt];
		n === void 0 && (n = t[vt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (wd(t, e, 2, !1), n.add(r));
	}
	function xd(e, t, n) {
		var r = 0;
		t && (r |= 4), wd(n, e, r, t);
	}
	var Sd = "_reactListening" + Math.random().toString(36).slice(2);
	function Cd(e) {
		if (!e[Sd]) {
			e[Sd] = !0, kt.forEach(function(t) {
				t !== "selectionchange" && (yd.has(t) || xd(t, !1, e), xd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Sd] || (t[Sd] = !0, xd("selectionchange", !1, t));
		}
	}
	function wd(e, t, n, r) {
		switch (hp(t)) {
			case 2:
				var i = lp;
				break;
			case 8:
				i = up;
				break;
			default: i = dp;
		}
		n = i.bind(null, t, n, e), i = void 0, !vn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Td(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var l = o.tag;
					if ((l === 3 || l === 4) && o.stateNode.containerInfo === i) return;
					o = o.return;
				}
				for (; c !== null;) {
					if (o = wt(c), o === null) return;
					if (l = o.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = o;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		hn(function() {
			var r = a, i = un(n), o = [];
			a: {
				var c = ti.get(e);
				if (c !== void 0) {
					var l = kn, u = e;
					switch (e) {
						case "keypress": if (wn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = qn;
							break;
						case "focusin":
							u = "focus", l = Rn;
							break;
						case "focusout":
							u = "blur", l = Rn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Rn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = In;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Ln;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Yn;
							break;
						case Jr:
						case Yr:
						case Xr:
							l = zn;
							break;
						case ei:
							l = Xn;
							break;
						case "scroll":
						case "scrollend":
							l = jn;
							break;
						case "wheel":
							l = Zn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Bn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Jn;
							break;
						case "toggle":
						case "beforetoggle": l = Qn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = gn(m, p), g != null && d.push(Ed(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), o.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== ln && (u = n.relatedTarget || n.fromElement) && (wt(u) || u[_t])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? wt(u) : null, u !== null && (f = s(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = In, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Jn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Et(l), h = u == null ? c : Et(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, wt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Od, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && kd(o, c, l, d, !1), u !== null && f !== null && kd(o, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? Et(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = vr;
					else if (fr(c)) if (yr) v = Or;
					else {
						v = Er;
						var y = Tr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && rn(r.elementType) && (v = vr) : v = Dr;
					if (v &&= v(e, r)) {
						pr(o, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Yt(c, "number", c.value);
				}
				switch (y = r ? Et(r) : window, e) {
					case "focusin":
						(fr(y) || y.contentEditable === "true") && (Rr = y, zr = r, Br = null);
						break;
					case "focusout":
						Br = zr = Rr = null;
						break;
					case "mousedown":
						Vr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Vr = !1, Hr(o, n, i);
						break;
					case "selectionchange": if (Lr) break;
					case "keydown":
					case "keyup": Hr(o, n, i);
				}
				var b;
				if (er) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else cr ? or(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (rr && n.locale !== "ko" && (cr || x !== "onCompositionStart" ? x === "onCompositionEnd" && cr && (b = Cn()) : (bn = i, xn = "value" in bn ? bn.value : bn.textContent, cr = !0)), y = Dd(r, x), 0 < y.length && (x = new Vn(x, e, null, n, i), o.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = sr(n), b !== null && (x.data = b)))), (b = nr ? lr(e, n) : ur(e, n)) && (x = Dd(r, "onBeforeInput"), 0 < x.length && (y = new Vn("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: y,
					listeners: x
				}), y.data = b)), hd(o, e, r, n, i);
			}
			bd(o, t);
		});
	}
	function Ed(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Dd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = gn(e, n), i != null && r.unshift(Ed(e, i, a)), i = gn(e, t), i != null && r.push(Ed(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Od(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function kd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = gn(n, a), l != null && o.unshift(Ed(n, l, c))) : i || (l = gn(n, a), l != null && o.push(Ed(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Ad = /\r\n?/g, jd = /\u0000|\uFFFD/g;
	function Md(e) {
		return (typeof e == "string" ? e : "" + e).replace(Ad, "\n").replace(jd, "");
	}
	function Nd(e, t) {
		return t = Md(t), Md(e) === t;
	}
	function $(e, t, n, r, i, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || $t(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && $t(e, "" + r);
				break;
			case "className":
				Rt(e, "class", r);
				break;
			case "tabIndex":
				Rt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Rt(e, n, r);
				break;
			case "style":
				nn(e, r, o);
				break;
			case "data": if (t !== "object") {
				Rt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = sn("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", i.name, i, null), $(e, t, "formEncType", i.formEncType, i, null), $(e, t, "formMethod", i.formMethod, i, null), $(e, t, "formTarget", i.formTarget, i, null)) : ($(e, t, "encType", i.encType, i, null), $(e, t, "method", i.method, i, null), $(e, t, "target", i.target, i, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = sn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = cn);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(a(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(a(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = sn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
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
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), Lt(e, "popover", r);
				break;
			case "xlinkActuate":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				zt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				zt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				zt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				zt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Lt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = an.get(n) || n, Lt(e, n, r));
		}
	}
	function Pd(e, t, n, r, i, o) {
		switch (n) {
			case "style":
				nn(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(a(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(a(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? $t(e, r) : (typeof r == "number" || typeof r == "bigint") && $t(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = cn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!At.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), o = e[gt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, i), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Lt(e, n, r);
			}
		}
	}
	function Fd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, i = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(a(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				i && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(a(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Jt(e, o, c, l, u, s, i, !1);
				return;
			case "select":
				for (i in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, i, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Xt(e, !!r, n, !0) : Xt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = i = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(a(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Qt(e, r, i, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < vd.length; r++) Q(vd[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
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
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(a(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (rn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Pd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Id(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(a(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				qt(e, s, c, l, u, d, o, i);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (i in r) if (o = r[i], l = n[i], r.hasOwnProperty(i) && (o != null || l != null)) switch (i) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, i, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Xt(e, !!n, n ? [] : "", !1) : Xt(e, !!n, t, !0)) : Xt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, i);
				}
				for (s in r) if (i = r[s], o = n[s], r.hasOwnProperty(s) && (i != null || o != null)) switch (s) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(a(91));
						break;
					default: i !== o && $(e, t, s, i, r, o);
				}
				Zt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(a(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (rn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Pd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Pd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Ld(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Rd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Ld(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Ld(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var zd = null, Bd = null;
	function Vd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Hd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Ud(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Wd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Gd = null;
	function Kd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Gd ? !1 : (Gd = e, !0) : (Gd = null, !1);
	}
	var qd = typeof setTimeout == "function" ? setTimeout : void 0, Jd = typeof clearTimeout == "function" ? clearTimeout : void 0, Yd = typeof Promise == "function" ? Promise : void 0, Xd = typeof queueMicrotask == "function" ? queueMicrotask : Yd === void 0 ? qd : function(e) {
		return Yd.resolve(null).then(e).catch(Zd);
	};
	function Zd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Qd(e) {
		return e === "head";
	}
	function $d(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Pp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") mf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, mf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[St] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && mf(e.ownerDocument.body);
			n = i;
		} while (n);
		Pp(t);
	}
	function ef(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function tf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					tf(n), Ct(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function nf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[St]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function rf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lf(e.nextSibling), e === null)) return null;
		return e;
	}
	function of(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var uf = null;
	function df(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function ff(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
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
	function pf(e, t, n) {
		switch (t = Vd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(a(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(a(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(a(454));
				return e;
			default: throw Error(a(451));
		}
	}
	function mf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		Ct(e);
	}
	var hf = /* @__PURE__ */ new Map(), gf = /* @__PURE__ */ new Set();
	function _f(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var vf = D.d;
	D.d = {
		f: yf,
		r: bf,
		D: Cf,
		C: wf,
		L: Tf,
		m: Ef,
		X: Of,
		S: Df,
		M: kf
	};
	function yf() {
		var e = vf.f(), t = xu();
		return e || t;
	}
	function bf(e) {
		var t = Tt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Es(t) : vf.r(e);
	}
	var xf = typeof document > "u" ? null : document;
	function Sf(e, t, n) {
		var r = xf;
		if (r && typeof t == "string" && t) {
			var i = Kt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), gf.has(i) || (gf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Fd(t, "link", e), Ot(t), r.head.appendChild(t)));
		}
	}
	function Cf(e) {
		vf.D(e), Sf("dns-prefetch", e, null);
	}
	function wf(e, t) {
		vf.C(e, t), Sf("preconnect", e, t);
	}
	function Tf(e, t, n) {
		vf.L(e, t, n);
		var r = xf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Kt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Kt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Kt(n.imageSizes) + "\"]")) : i += "[href=\"" + Kt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = jf(e);
					break;
				case "script": a = Ff(e);
			}
			hf.has(a) || (e = g({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), hf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Mf(a)) || t === "script" && r.querySelector(If(a)) || (t = r.createElement("link"), Fd(t, "link", e), Ot(t), r.head.appendChild(t)));
		}
	}
	function Ef(e, t) {
		vf.m(e, t);
		var n = xf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Kt(r) + "\"][href=\"" + Kt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Ff(e);
			}
			if (!hf.has(a) && (e = g({
				rel: "modulepreload",
				href: e
			}, t), hf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(If(a))) return;
				}
				r = n.createElement("link"), Fd(r, "link", e), Ot(r), n.head.appendChild(r);
			}
		}
	}
	function Df(e, t, n) {
		vf.S(e, t, n);
		var r = xf;
		if (r && e) {
			var i = Dt(r).hoistableStyles, a = jf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Mf(a))) s.loading = 5;
				else {
					e = g({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = hf.get(a)) && zf(e, n);
					var c = o = r.createElement("link");
					Ot(c), Fd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Rf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Of(e, t) {
		vf.X(e, t);
		var n = xf;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = g({
				src: e,
				async: !0
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), Ot(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t) {
		vf.M(e, t);
		var n = xf;
		if (n && e) {
			var r = Dt(n).hoistableScripts, i = Ff(e), a = r.get(i);
			a || (a = n.querySelector(If(i)), a || (e = g({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = hf.get(i)) && Bf(e, t), a = n.createElement("script"), Ot(a), Fd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Af(e, t, n, r) {
		var i = (i = ge.current) ? _f(i) : null;
		if (!i) throw Error(a(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = jf(n.href), n = Dt(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = jf(n.href);
					var o = Dt(i).hoistableStyles, s = o.get(e);
					if (s || (i = i.ownerDocument || i, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = i.querySelector(Mf(e))) && !o._p && (s.instance = o, s.state.loading = 5), hf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, hf.set(e, n), o || Pf(i, e, n, s.state))), t && r === null) throw Error(a(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(a(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ff(n), n = Dt(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(a(444, e));
		}
	}
	function jf(e) {
		return "href=\"" + Kt(e) + "\"";
	}
	function Mf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Nf(e) {
		return g({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Pf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Fd(t, "link", n), Ot(t), e.head.appendChild(t));
	}
	function Ff(e) {
		return "[src=\"" + Kt(e) + "\"]";
	}
	function If(e) {
		return "script[async]" + e;
	}
	function Lf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Kt(n.href) + "\"]");
				if (r) return t.instance = r, Ot(r), r;
				var i = g({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ot(r), Fd(r, "style", i), Rf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = jf(n.href);
				var o = e.querySelector(Mf(i));
				if (o) return t.state.loading |= 4, t.instance = o, Ot(o), o;
				r = Nf(n), (i = hf.get(i)) && zf(r, i), o = (e.ownerDocument || e).createElement("link"), Ot(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Fd(o, "link", r), t.state.loading |= 4, Rf(o, n.precedence, e), t.instance = o;
			case "script": return o = Ff(n.src), (i = e.querySelector(If(o))) ? (t.instance = i, Ot(i), i) : (r = n, (i = hf.get(o)) && (r = g({}, n), Bf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Ot(i), Fd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(a(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Rf(r, n.precedence, e));
		return t.instance;
	}
	function Rf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Bf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Vf = null;
	function Hf(e, t, n) {
		if (Vf === null) {
			var r = /* @__PURE__ */ new Map(), i = Vf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Vf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[St] || a[ht] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Uf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Wf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Gf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Kf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = jf(r.href), a = t.querySelector(Mf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Yf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ot(a);
					return;
				}
				a = t.ownerDocument || t, r = Nf(r), (i = hf.get(i)) && zf(r, i), a = a.createElement("link"), Ot(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Fd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Yf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var qf = 0;
	function Jf(e, t) {
		return e.stylesheets && e.count === 0 && Zf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && qf === 0 && (qf = 62500 * Rd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Zf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > qf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Yf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Zf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Xf = null;
	function Zf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Xf = /* @__PURE__ */ new Map(), t.forEach(Qf, e), Xf = null, Yf.call(e));
	}
	function Qf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Xf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Xf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Yf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var $f = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function ep(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = it(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = it(0), this.hiddenUpdates = it(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function tp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ep(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = hi(3, null, null, t), e.current = a, a.stateNode = e, t = da(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Wa(a), e;
	}
	function np(e) {
		return e ? (e = pi, e) : pi;
	}
	function rp(e, t, n, r, i, a) {
		i = np(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ka(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = qa(e, r, t), n !== null && (gu(n, e, t), Ja(n, e, t));
	}
	function ip(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ap(e, t) {
		ip(e, t), (e = e.alternate) && ip(e, t);
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ui(e, 67108864);
			t !== null && gu(t, e, 67108864), ap(e, 67108864);
		}
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mu();
			t = ut(t);
			var n = ui(e, t);
			n !== null && gu(n, e, t), ap(e, t);
		}
	}
	var cp = !0;
	function lp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, dp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function up(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, dp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function dp(e, t, n, r) {
		if (cp) {
			var i = fp(r);
			if (i === null) Td(e, t, r, pp, n), wp(e, r);
			else if (Ep(i, e, t, n, r)) r.stopPropagation();
			else if (wp(e, r), t & 4 && -1 < Cp.indexOf(e)) {
				for (; i !== null;) {
					var a = Tt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = $e(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ke(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									id(a), !(K & 6) && (nu = Pe() + 500, ad(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ui(a, 2), s !== null && gu(s, a, 2), xu(), ap(a, 2);
					}
					if (a = fp(r), a === null && Td(e, t, r, pp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Td(e, t, r, null, n);
		}
	}
	function fp(e) {
		return e = un(e), mp(e);
	}
	var pp = null;
	function mp(e) {
		if (pp = null, e = wt(e), e !== null) {
			var t = s(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = l(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return pp = e, null;
	}
	function hp(e) {
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
			case "selectstart": return 2;
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
			case "pointerleave": return 8;
			case "message": switch (Fe()) {
				case Ie: return 2;
				case Le: return 8;
				case Re:
				case ze: return 32;
				case Be: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var gp = !1, _p = null, vp = null, yp = null, bp = /* @__PURE__ */ new Map(), xp = /* @__PURE__ */ new Map(), Sp = [], Cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function wp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				_p = null;
				break;
			case "dragenter":
			case "dragleave":
				vp = null;
				break;
			case "mouseover":
			case "mouseout":
				yp = null;
				break;
			case "pointerover":
			case "pointerout":
				bp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": xp.delete(t.pointerId);
		}
	}
	function Tp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Tt(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ep(e, t, n, r, i) {
		switch (t) {
			case "focusin": return _p = Tp(_p, e, t, n, r, i), !0;
			case "dragenter": return vp = Tp(vp, e, t, n, r, i), !0;
			case "mouseover": return yp = Tp(yp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return bp.set(a, Tp(bp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, xp.set(a, Tp(xp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Dp(e) {
		var t = wt(e.target);
		if (t !== null) {
			var n = s(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, pt(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = l(n), t !== null) {
						e.blockedOn = t, pt(e.priority, function() {
							sp(n);
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
	function Op(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = fp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				ln = r, n.target.dispatchEvent(r), ln = null;
			} else return t = Tt(n), t !== null && op(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function kp(e, t, n) {
		Op(e) && n.delete(t);
	}
	function Ap() {
		gp = !1, _p !== null && Op(_p) && (_p = null), vp !== null && Op(vp) && (vp = null), yp !== null && Op(yp) && (yp = null), bp.forEach(kp), xp.forEach(kp);
	}
	function jp(e, t) {
		e.blockedOn === t && (e.blockedOn = null, gp || (gp = !0, n.unstable_scheduleCallback(n.unstable_NormalPriority, Ap)));
	}
	var Mp = null;
	function Np(e) {
		Mp !== e && (Mp = e, n.unstable_scheduleCallback(n.unstable_NormalPriority, function() {
			Mp === e && (Mp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (mp(r || n) === null) continue;
					break;
				}
				var a = Tt(n);
				a !== null && (e.splice(t, 3), t -= 3, ws(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Pp(e) {
		function t(t) {
			return jp(t, e);
		}
		_p !== null && jp(_p, e), vp !== null && jp(vp, e), yp !== null && jp(yp, e), bp.forEach(t), xp.forEach(t);
		for (var n = 0; n < Sp.length; n++) {
			var r = Sp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Sp.length && (n = Sp[0], n.blockedOn === null);) Dp(n), n.blockedOn === null && Sp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[gt] || null;
			if (typeof a == "function") o || Np(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[gt] || null) s = o.formAction;
					else if (mp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Np(n);
			}
		}
	}
	function Fp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Ip(e) {
		this._internalRoot = e;
	}
	Lp.prototype.render = Ip.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(a(409));
		var n = t.current;
		rp(n, mu(), e, t, null, null);
	}, Lp.prototype.unmount = Ip.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			rp(e.current, 2, null, e, null, null), xu(), t[_t] = null;
		}
	};
	function Lp(e) {
		this._internalRoot = e;
	}
	Lp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ft();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Sp.length && t !== 0 && t < Sp[n].priority; n++);
			Sp.splice(n, 0, e), n === 0 && Dp(e);
		}
	};
	var Rp = r.version;
	if (Rp !== "19.2.4") throw Error(a(527, Rp, "19.2.4"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(a(188)) : (e = Object.keys(e).join(","), Error(a(268, e)));
		return e = f(t), e = e === null ? null : m(e), e = e === null ? null : e.stateNode, e;
	};
	var zp = {
		bundleType: 0,
		version: "19.2.4",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.4"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Bp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Bp.isDisabled && Bp.supportsFiber) try {
			Ue = Bp.inject(zp), We = Bp;
		} catch {}
	}
	t.createRoot = function(e, t) {
		if (!o(e)) throw Error(a(299));
		var n = !1, r = "", i = qs, s = Js, c = Ys;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = tp(e, 1, !1, null, null, n, r, null, i, s, c, Fp), e[_t] = t.current, Cd(e), new Ip(t);
	};
})), _ = /* @__PURE__ */ s(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = g();
}));
Object.freeze({ status: "aborted" });
function v(e, t, n) {
	function r(n, r) {
		if (n._zod || Object.defineProperty(n, "_zod", {
			value: {
				def: r,
				constr: o,
				traits: /* @__PURE__ */ new Set()
			},
			enumerable: !1
		}), n._zod.traits.has(e)) return;
		n._zod.traits.add(e), t(n, r);
		let i = o.prototype, a = Object.keys(i);
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			t in n || (n[t] = i[t].bind(n));
		}
	}
	let i = n?.Parent ?? Object;
	class a extends i {}
	Object.defineProperty(a, "name", { value: e });
	function o(e) {
		var t;
		let i = n?.Parent ? new a() : this;
		r(i, e), (t = i._zod).deferred ?? (t.deferred = []);
		for (let e of i._zod.deferred) e();
		return i;
	}
	return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, { value: (t) => n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(o, "name", { value: e }), o;
}
var y = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, b = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
}, x = {};
function S(e) {
	return e && Object.assign(x, e), x;
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/util.js
function ee(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function te(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function C(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
		throw Error("cached value already set");
	} };
}
function ne(e) {
	return e == null;
}
function re(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function ie(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = t.toString(), i = (r.split(".")[1] || "").length;
	if (i === 0 && /\d?e-\d?/.test(r)) {
		let e = r.match(/\d?e-(\d?)/);
		e?.[1] && (i = Number.parseInt(e[1]));
	}
	let a = n > i ? n : i;
	return Number.parseInt(e.toFixed(a).replace(".", "")) % Number.parseInt(t.toFixed(a).replace(".", "")) / 10 ** a;
}
var ae = Symbol("evaluating");
function w(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== ae) return r === void 0 && (r = ae, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function oe(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function se(...e) {
	let t = {};
	for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
	return Object.defineProperties({}, t);
}
function ce(e) {
	return JSON.stringify(e);
}
function le(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ue = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function T(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var E = C(() => {
	if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function D(e) {
	if (T(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(T(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function de(e) {
	return D(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
var O = new Set([
	"string",
	"number",
	"symbol"
]);
function fe(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function pe(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function k(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function A(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var me = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function he(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return pe(e, se(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return oe(this, "shape", e), e;
		},
		checks: []
	}));
}
function ge(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return pe(e, se(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return oe(this, "shape", r), r;
		},
		checks: []
	}));
}
function _e(e, t) {
	if (!D(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return pe(e, se(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return oe(this, "shape", n), n;
	} }));
}
function ve(e, t) {
	if (!D(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return pe(e, se(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return oe(this, "shape", n), n;
	} }));
}
function ye(e, t) {
	return pe(e, se(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return oe(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: []
	}));
}
function be(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return pe(t, se(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t in n) {
				if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t in r) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return oe(this, "shape", i), i;
		},
		checks: []
	}));
}
function xe(e, t, n) {
	return pe(t, se(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t in n) {
			if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t in r) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return oe(this, "shape", i), i;
	} }));
}
function Se(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Ce(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function we(e) {
	return typeof e == "string" ? e : e?.message;
}
function Te(e, t, n) {
	let r = {
		...e,
		path: e.path ?? []
	};
	return e.message || (r.message = we(e.inst?._zod.def?.error?.(e)) ?? we(t?.error?.(e)) ?? we(n.customError?.(e)) ?? we(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function Ee(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function De(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/errors.js
var Oe = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, te, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, ke = v("$ZodError", Oe), Ae = v("$ZodError", Oe, { Parent: Error });
function je(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Me(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e) => {
		for (let i of e.issues) if (i.code === "invalid_union" && i.errors.length) i.errors.map((e) => r({ issues: e }));
		else if (i.code === "invalid_key") r({ issues: i.issues });
		else if (i.code === "invalid_element") r({ issues: i.issues });
		else if (i.path.length === 0) n._errors.push(t(i));
		else {
			let e = n, r = 0;
			for (; r < i.path.length;) {
				let n = i.path[r];
				r === i.path.length - 1 ? (e[n] = e[n] || { _errors: [] }, e[n]._errors.push(t(i))) : e[n] = e[n] || { _errors: [] }, e = e[n], r++;
			}
		}
	};
	return r(e), n;
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/parse.js
var Ne = (e) => (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !1 }) : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new y();
	if (o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => Te(e, a, S())));
		throw ue(t, i?.callee), t;
	}
	return o.value;
}, Pe = (e) => async (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !0 }) : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => Te(e, a, S())));
		throw ue(t, i?.callee), t;
	}
	return o.value;
}, Fe = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new y();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? ke)(a.issues.map((e) => Te(e, i, S())))
	} : {
		success: !0,
		data: a.value
	};
}, Ie = /* @__PURE__ */ Fe(Ae), Le = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { async: !0 }) : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => Te(e, i, S())))
	} : {
		success: !0,
		data: a.value
	};
}, Re = /* @__PURE__ */ Le(Ae), ze = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Ne(e)(t, n, i);
}, Be = (e) => (t, n, r) => Ne(e)(t, n, r), Ve = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Pe(e)(t, n, i);
}, He = (e) => async (t, n, r) => Pe(e)(t, n, r), Ue = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Fe(e)(t, n, i);
}, We = (e) => (t, n, r) => Fe(e)(t, n, r), Ge = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Le(e)(t, n, i);
}, Ke = (e) => async (t, n, r) => Le(e)(t, n, r), qe = /^[cC][^\s-]{8,}$/, Je = /^[0-9a-z]+$/, Ye = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Xe = /^[0-9a-vA-V]{20}$/, Ze = /^[A-Za-z0-9]{27}$/, Qe = /^[a-zA-Z0-9_-]{21}$/, $e = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, et = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, tt = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, nt = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, rt = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function it() {
	return new RegExp(rt, "u");
}
var at = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ot = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, st = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ct = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, lt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ut = /^[A-Za-z0-9_-]*$/, dt = /^\+[1-9]\d{6,14}$/, ft = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", pt = /* @__PURE__ */ RegExp(`^${ft}$`);
function mt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ht(e) {
	return RegExp(`^${mt(e)}$`);
}
function gt(e) {
	let t = mt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${ft}T(?:${r})$`);
}
var _t = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, vt = /^-?\d+$/, yt = /^-?\d+(?:\.\d+)?$/, bt = /^(?:true|false)$/i, xt = /^[^A-Z]*$/, St = /^[^a-z]*$/, Ct = /* @__PURE__ */ v("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), wt = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, Tt = /* @__PURE__ */ v("$ZodCheckLessThan", (e, t) => {
	Ct.init(e, t);
	let n = wt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
		t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
			origin: n,
			code: "too_big",
			maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Et = /* @__PURE__ */ v("$ZodCheckGreaterThan", (e, t) => {
	Ct.init(e, t);
	let n = wt[typeof t.value];
	e._zod.onattach.push((e) => {
		let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
		t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
	}), e._zod.check = (r) => {
		(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
			origin: n,
			code: "too_small",
			minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
			input: r.value,
			inclusive: t.inclusive,
			inst: e,
			continue: !t.abort
		});
	};
}), Dt = /* @__PURE__ */ v("$ZodCheckMultipleOf", (e, t) => {
	Ct.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : ie(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Ot = /* @__PURE__ */ v("$ZodCheckNumberFormat", (e, t) => {
	Ct.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = me[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = vt);
	}), e._zod.check = (o) => {
		let s = o.value;
		if (n) {
			if (!Number.isInteger(s)) {
				o.issues.push({
					expected: r,
					format: t.format,
					code: "invalid_type",
					continue: !1,
					input: s,
					inst: e
				});
				return;
			}
			if (!Number.isSafeInteger(s)) {
				s > 0 ? o.issues.push({
					input: s,
					code: "too_big",
					maximum: 2 ** 53 - 1,
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				}) : o.issues.push({
					input: s,
					code: "too_small",
					minimum: -(2 ** 53 - 1),
					note: "Integers must be within the safe integer range.",
					inst: e,
					origin: r,
					inclusive: !0,
					continue: !t.abort
				});
				return;
			}
		}
		s < i && o.issues.push({
			origin: "number",
			input: s,
			code: "too_small",
			minimum: i,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		}), s > a && o.issues.push({
			origin: "number",
			input: s,
			code: "too_big",
			maximum: a,
			inclusive: !0,
			inst: e,
			continue: !t.abort
		});
	};
}), kt = /* @__PURE__ */ v("$ZodCheckMaxLength", (e, t) => {
	var n;
	Ct.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ne(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Ee(r);
		n.issues.push({
			origin: i,
			code: "too_big",
			maximum: t.maximum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), At = /* @__PURE__ */ v("$ZodCheckMinLength", (e, t) => {
	var n;
	Ct.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ne(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Ee(r);
		n.issues.push({
			origin: i,
			code: "too_small",
			minimum: t.minimum,
			inclusive: !0,
			input: r,
			inst: e,
			continue: !t.abort
		});
	};
}), jt = /* @__PURE__ */ v("$ZodCheckLengthEquals", (e, t) => {
	var n;
	Ct.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ne(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Ee(r), o = i > t.length;
		n.issues.push({
			origin: a,
			...o ? {
				code: "too_big",
				maximum: t.length
			} : {
				code: "too_small",
				minimum: t.length
			},
			inclusive: !0,
			exact: !0,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Mt = /* @__PURE__ */ v("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	Ct.init(e, t), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
	}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: t.format,
			input: n.value,
			...t.pattern ? { pattern: t.pattern.toString() } : {},
			inst: e,
			continue: !t.abort
		});
	}) : (r = e._zod).check ?? (r.check = () => {});
}), Nt = /* @__PURE__ */ v("$ZodCheckRegex", (e, t) => {
	Mt.init(e, t), e._zod.check = (n) => {
		t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "regex",
			input: n.value,
			pattern: t.pattern.toString(),
			inst: e,
			continue: !t.abort
		});
	};
}), Pt = /* @__PURE__ */ v("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= xt, Mt.init(e, t);
}), Ft = /* @__PURE__ */ v("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= St, Mt.init(e, t);
}), It = /* @__PURE__ */ v("$ZodCheckIncludes", (e, t) => {
	Ct.init(e, t);
	let n = fe(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
	t.pattern = r, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
	}), e._zod.check = (n) => {
		n.value.includes(t.includes, t.position) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "includes",
			includes: t.includes,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Lt = /* @__PURE__ */ v("$ZodCheckStartsWith", (e, t) => {
	Ct.init(e, t);
	let n = RegExp(`^${fe(t.prefix)}.*`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.startsWith(t.prefix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "starts_with",
			prefix: t.prefix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), Rt = /* @__PURE__ */ v("$ZodCheckEndsWith", (e, t) => {
	Ct.init(e, t);
	let n = RegExp(`.*${fe(t.suffix)}$`);
	t.pattern ??= n, e._zod.onattach.push((e) => {
		let t = e._zod.bag;
		t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
	}), e._zod.check = (n) => {
		n.value.endsWith(t.suffix) || n.issues.push({
			origin: "string",
			code: "invalid_format",
			format: "ends_with",
			suffix: t.suffix,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), zt = /* @__PURE__ */ v("$ZodCheckOverwrite", (e, t) => {
	Ct.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Bt = class {
	constructor(e = []) {
		this.content = [], this.indent = 0, this && (this.args = e);
	}
	indented(e) {
		this.indent += 1, e(this), --this.indent;
	}
	write(e) {
		if (typeof e == "function") {
			e(this, { execution: "sync" }), e(this, { execution: "async" });
			return;
		}
		let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
		for (let e of r) this.content.push(e);
	}
	compile() {
		let e = Function, t = this?.args, n = [...(this?.content ?? [""]).map((e) => `  ${e}`)];
		return new e(...t, n.join("\n"));
	}
}, Vt = {
	major: 4,
	minor: 3,
	patch: 5
}, Ht = /* @__PURE__ */ v("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Vt;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = Se(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (!a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new y();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= Se(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= Se(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (Se(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new y();
				return o.then((t) => e._zod.parse(t, a));
			}
			return e._zod.parse(o, a);
		};
		e._zod.run = (i, a) => {
			if (a.skipChecks) return e._zod.parse(i, a);
			if (a.direction === "backward") {
				let t = e._zod.parse({
					value: i.value,
					issues: []
				}, {
					...a,
					skipChecks: !0
				});
				return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
			}
			let o = e._zod.parse(i, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new y();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	w(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Ie(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Re(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Ut = /* @__PURE__ */ v("$ZodString", (e, t) => {
	Ht.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? _t(e._zod.bag), e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = String(n.value);
		} catch {}
		return typeof n.value == "string" || n.issues.push({
			expected: "string",
			code: "invalid_type",
			input: n.value,
			inst: e
		}), n;
	};
}), j = /* @__PURE__ */ v("$ZodStringFormat", (e, t) => {
	Mt.init(e, t), Ut.init(e, t);
}), Wt = /* @__PURE__ */ v("$ZodGUID", (e, t) => {
	t.pattern ??= et, j.init(e, t);
}), Gt = /* @__PURE__ */ v("$ZodUUID", (e, t) => {
	if (t.version) {
		let e = {
			v1: 1,
			v2: 2,
			v3: 3,
			v4: 4,
			v5: 5,
			v6: 6,
			v7: 7,
			v8: 8
		}[t.version];
		if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
		t.pattern ??= tt(e);
	} else t.pattern ??= tt();
	j.init(e, t);
}), Kt = /* @__PURE__ */ v("$ZodEmail", (e, t) => {
	t.pattern ??= nt, j.init(e, t);
}), qt = /* @__PURE__ */ v("$ZodURL", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		try {
			let r = n.value.trim(), i = new URL(r);
			t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(i.hostname) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid hostname",
				pattern: t.hostname.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(i.protocol.endsWith(":") ? i.protocol.slice(0, -1) : i.protocol) || n.issues.push({
				code: "invalid_format",
				format: "url",
				note: "Invalid protocol",
				pattern: t.protocol.source,
				input: n.value,
				inst: e,
				continue: !t.abort
			})), t.normalize ? n.value = i.href : n.value = r;
			return;
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), Jt = /* @__PURE__ */ v("$ZodEmoji", (e, t) => {
	t.pattern ??= it(), j.init(e, t);
}), Yt = /* @__PURE__ */ v("$ZodNanoID", (e, t) => {
	t.pattern ??= Qe, j.init(e, t);
}), Xt = /* @__PURE__ */ v("$ZodCUID", (e, t) => {
	t.pattern ??= qe, j.init(e, t);
}), Zt = /* @__PURE__ */ v("$ZodCUID2", (e, t) => {
	t.pattern ??= Je, j.init(e, t);
}), Qt = /* @__PURE__ */ v("$ZodULID", (e, t) => {
	t.pattern ??= Ye, j.init(e, t);
}), $t = /* @__PURE__ */ v("$ZodXID", (e, t) => {
	t.pattern ??= Xe, j.init(e, t);
}), en = /* @__PURE__ */ v("$ZodKSUID", (e, t) => {
	t.pattern ??= Ze, j.init(e, t);
}), tn = /* @__PURE__ */ v("$ZodISODateTime", (e, t) => {
	t.pattern ??= gt(t), j.init(e, t);
}), nn = /* @__PURE__ */ v("$ZodISODate", (e, t) => {
	t.pattern ??= pt, j.init(e, t);
}), rn = /* @__PURE__ */ v("$ZodISOTime", (e, t) => {
	t.pattern ??= ht(t), j.init(e, t);
}), an = /* @__PURE__ */ v("$ZodISODuration", (e, t) => {
	t.pattern ??= $e, j.init(e, t);
}), on = /* @__PURE__ */ v("$ZodIPv4", (e, t) => {
	t.pattern ??= at, j.init(e, t), e._zod.bag.format = "ipv4";
}), sn = /* @__PURE__ */ v("$ZodIPv6", (e, t) => {
	t.pattern ??= ot, j.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
		try {
			new URL(`http://[${n.value}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
}), cn = /* @__PURE__ */ v("$ZodCIDRv4", (e, t) => {
	t.pattern ??= st, j.init(e, t);
}), ln = /* @__PURE__ */ v("$ZodCIDRv6", (e, t) => {
	t.pattern ??= ct, j.init(e, t), e._zod.check = (n) => {
		let r = n.value.split("/");
		try {
			if (r.length !== 2) throw Error();
			let [e, t] = r;
			if (!t) throw Error();
			let n = Number(t);
			if (`${n}` !== t || n < 0 || n > 128) throw Error();
			new URL(`http://[${e}]`);
		} catch {
			n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		}
	};
});
function un(e) {
	if (e === "") return !0;
	if (e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var dn = /* @__PURE__ */ v("$ZodBase64", (e, t) => {
	t.pattern ??= lt, j.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		un(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function fn(e) {
	if (!ut.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return un(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var pn = /* @__PURE__ */ v("$ZodBase64URL", (e, t) => {
	t.pattern ??= ut, j.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		fn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), mn = /* @__PURE__ */ v("$ZodE164", (e, t) => {
	t.pattern ??= dt, j.init(e, t);
});
function hn(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
var gn = /* @__PURE__ */ v("$ZodJWT", (e, t) => {
	j.init(e, t), e._zod.check = (n) => {
		hn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _n = /* @__PURE__ */ v("$ZodNumber", (e, t) => {
	Ht.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? yt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = Number(n.value);
		} catch {}
		let i = n.value;
		if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
		let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
		return n.issues.push({
			expected: "number",
			code: "invalid_type",
			input: i,
			inst: e,
			...a ? { received: a } : {}
		}), n;
	};
}), vn = /* @__PURE__ */ v("$ZodNumberFormat", (e, t) => {
	Ot.init(e, t), _n.init(e, t);
}), yn = /* @__PURE__ */ v("$ZodBoolean", (e, t) => {
	Ht.init(e, t), e._zod.pattern = bt, e._zod.parse = (n, r) => {
		if (t.coerce) try {
			n.value = !!n.value;
		} catch {}
		let i = n.value;
		return typeof i == "boolean" || n.issues.push({
			expected: "boolean",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
	};
}), bn = /* @__PURE__ */ v("$ZodUnknown", (e, t) => {
	Ht.init(e, t), e._zod.parse = (e) => e;
}), xn = /* @__PURE__ */ v("$ZodNever", (e, t) => {
	Ht.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function Sn(e, t, n) {
	e.issues.length && t.issues.push(...Ce(n, e.issues)), t.value[n] = e.value;
}
var Cn = /* @__PURE__ */ v("$ZodArray", (e, t) => {
	Ht.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!Array.isArray(i)) return n.issues.push({
			expected: "array",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		n.value = Array(i.length);
		let a = [];
		for (let e = 0; e < i.length; e++) {
			let o = i[e], s = t.element._zod.run({
				value: o,
				issues: []
			}, r);
			s instanceof Promise ? a.push(s.then((t) => Sn(t, n, e))) : Sn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function wn(e, t, n, r, i) {
	if (e.issues.length) {
		if (i && !(n in r)) return;
		t.issues.push(...Ce(n, e.issues));
	}
	e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function Tn(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = A(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function En(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optout === "optional";
	for (let i in t) {
		if (s.has(i)) continue;
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => wn(e, n, i, t, u))) : wn(a, n, i, t, u);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var Dn = /* @__PURE__ */ v("$ZodObject", (e, t) => {
	if (Ht.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = C(() => Tn(t));
	w(e._zod, "propValues", () => {
		let e = t.shape, n = {};
		for (let t in e) {
			let r = e[t]._zod;
			if (r.values) {
				n[t] ?? (n[t] = /* @__PURE__ */ new Set());
				for (let e of r.values) n[t].add(e);
			}
		}
		return n;
	});
	let r = T, i = t.catchall, a;
	e._zod.parse = (t, o) => {
		a ??= n.value;
		let s = t.value;
		if (!r(s)) return t.issues.push({
			expected: "object",
			code: "invalid_type",
			input: s,
			inst: e
		}), t;
		t.value = {};
		let c = [], l = a.shape;
		for (let e of a.keys) {
			let n = l[e], r = n._zod.optout === "optional", i = n._zod.run({
				value: s[e],
				issues: []
			}, o);
			i instanceof Promise ? c.push(i.then((n) => wn(n, t, e, s, r))) : wn(i, t, e, s, r);
		}
		return i ? En(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), On = /* @__PURE__ */ v("$ZodObjectJIT", (e, t) => {
	Dn.init(e, t);
	let n = e._zod.parse, r = C(() => Tn(t)), i = (e) => {
		let t = new Bt([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = ce(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = ce(r), s = e[r]?._zod?.optout === "optional";
			t.write(`const ${n} = ${i(r)};`), s ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `) : t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `);
		}
		t.write("payload.value = newResult;"), t.write("return payload;");
		let s = t.compile();
		return (t, n) => s(e, t, n);
	}, a, o = T, s = !x.jitless, c = s && E.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let p = d.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? En([], p, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), d);
	};
});
function kn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Se(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Te(e, r, S())))
	}), t);
}
var An = /* @__PURE__ */ v("$ZodUnion", (e, t) => {
	Ht.init(e, t), w(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), w(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), w(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), w(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => re(e.source)).join("|")})$`);
		}
	});
	let n = t.options.length === 1, r = t.options[0]._zod.run;
	e._zod.parse = (i, a) => {
		if (n) return r(i, a);
		let o = !1, s = [];
		for (let e of t.options) {
			let t = e._zod.run({
				value: i.value,
				issues: []
			}, a);
			if (t instanceof Promise) s.push(t), o = !0;
			else {
				if (t.issues.length === 0) return t;
				s.push(t);
			}
		}
		return o ? Promise.all(s).then((t) => kn(t, i, e, a)) : kn(s, i, e, a);
	};
}), jn = /* @__PURE__ */ v("$ZodIntersection", (e, t) => {
	Ht.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Nn(e, t, n)) : Nn(e, i, a);
	};
});
function Mn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (D(e) && D(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Mn(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Mn(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Nn(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i;
	for (let n of t.issues) if (n.code === "unrecognized_keys") {
		i ??= n;
		for (let e of n.keys) r.has(e) || r.set(e, {}), r.get(e).l = !0;
	} else e.issues.push(n);
	for (let t of n.issues) if (t.code === "unrecognized_keys") for (let e of t.keys) r.has(e) || r.set(e, {}), r.get(e).r = !0;
	else e.issues.push(t);
	let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (a.length && i && e.issues.push({
		...i,
		keys: a
	}), Se(e)) return e;
	let o = Mn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Pn = /* @__PURE__ */ v("$ZodRecord", (e, t) => {
	Ht.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!D(i)) return n.issues.push({
			expected: "record",
			code: "invalid_type",
			input: i,
			inst: e
		}), n;
		let a = [], o = t.keyType._zod.values;
		if (o) {
			n.value = {};
			let s = /* @__PURE__ */ new Set();
			for (let e of o) if (typeof e == "string" || typeof e == "number" || typeof e == "symbol") {
				s.add(typeof e == "number" ? e.toString() : e);
				let o = t.valueType._zod.run({
					value: i[e],
					issues: []
				}, r);
				o instanceof Promise ? a.push(o.then((t) => {
					t.issues.length && n.issues.push(...Ce(e, t.issues)), n.value[e] = t.value;
				})) : (o.issues.length && n.issues.push(...Ce(e, o.issues)), n.value[e] = o.value);
			}
			let c;
			for (let e in i) s.has(e) || (c ??= [], c.push(e));
			c && c.length > 0 && n.issues.push({
				code: "unrecognized_keys",
				input: i,
				inst: e,
				keys: c
			});
		} else {
			n.value = {};
			for (let o of Reflect.ownKeys(i)) {
				if (o === "__proto__") continue;
				let s = t.keyType._zod.run({
					value: o,
					issues: []
				}, r);
				if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
				if (typeof o == "string" && yt.test(o) && s.issues.length && s.issues.some((e) => e.code === "invalid_type" && e.expected === "number")) {
					let e = t.keyType._zod.run({
						value: Number(o),
						issues: []
					}, r);
					if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					e.issues.length === 0 && (s = e);
				}
				if (s.issues.length) {
					t.mode === "loose" ? n.value[o] = i[o] : n.issues.push({
						code: "invalid_key",
						origin: "record",
						issues: s.issues.map((e) => Te(e, r, S())),
						input: o,
						path: [o],
						inst: e
					});
					continue;
				}
				let c = t.valueType._zod.run({
					value: i[o],
					issues: []
				}, r);
				c instanceof Promise ? a.push(c.then((e) => {
					e.issues.length && n.issues.push(...Ce(o, e.issues)), n.value[s.value] = e.value;
				})) : (c.issues.length && n.issues.push(...Ce(o, c.issues)), n.value[s.value] = c.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), Fn = /* @__PURE__ */ v("$ZodEnum", (e, t) => {
	Ht.init(e, t);
	let n = ee(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => O.has(typeof e)).map((e) => typeof e == "string" ? fe(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), In = /* @__PURE__ */ v("$ZodTransform", (e, t) => {
	Ht.init(e, t), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new b(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new y();
		return n.value = i, n;
	};
});
function Ln(e, t) {
	return e.issues.length && t === void 0 ? {
		issues: [],
		value: void 0
	} : e;
}
var Rn = /* @__PURE__ */ v("$ZodOptional", (e, t) => {
	Ht.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", w(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0), w(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${re(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((t) => Ln(t, e.value)) : Ln(r, e.value);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), zn = /* @__PURE__ */ v("$ZodExactOptional", (e, t) => {
	Rn.init(e, t), w(e._zod, "values", () => t.innerType._zod.values), w(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Bn = /* @__PURE__ */ v("$ZodNullable", (e, t) => {
	Ht.init(e, t), w(e._zod, "optin", () => t.innerType._zod.optin), w(e._zod, "optout", () => t.innerType._zod.optout), w(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${re(e.source)}|null)$`) : void 0;
	}), w(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Vn = /* @__PURE__ */ v("$ZodDefault", (e, t) => {
	Ht.init(e, t), e._zod.optin = "optional", w(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Hn(e, t)) : Hn(r, t);
	};
});
function Hn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Un = /* @__PURE__ */ v("$ZodPrefault", (e, t) => {
	Ht.init(e, t), e._zod.optin = "optional", w(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), Wn = /* @__PURE__ */ v("$ZodNonOptional", (e, t) => {
	Ht.init(e, t), w(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Gn(t, e)) : Gn(i, e);
	};
});
function Gn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Kn = /* @__PURE__ */ v("$ZodCatch", (e, t) => {
	Ht.init(e, t), w(e._zod, "optin", () => t.innerType._zod.optin), w(e._zod, "optout", () => t.innerType._zod.optout), w(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Te(e, n, S())) },
			input: e.value
		}), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => Te(e, n, S())) },
			input: e.value
		}), e.issues = []), e);
	};
}), qn = /* @__PURE__ */ v("$ZodPipe", (e, t) => {
	Ht.init(e, t), w(e._zod, "values", () => t.in._zod.values), w(e._zod, "optin", () => t.in._zod.optin), w(e._zod, "optout", () => t.out._zod.optout), w(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Jn(e, t.in, n)) : Jn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Jn(e, t.out, n)) : Jn(r, t.out, n);
	};
});
function Jn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var Yn = /* @__PURE__ */ v("$ZodReadonly", (e, t) => {
	Ht.init(e, t), w(e._zod, "propValues", () => t.innerType._zod.propValues), w(e._zod, "values", () => t.innerType._zod.values), w(e._zod, "optin", () => t.innerType?._zod?.optin), w(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then(Xn) : Xn(r);
	};
});
function Xn(e) {
	return e.value = Object.freeze(e.value), e;
}
var Zn = /* @__PURE__ */ v("$ZodCustom", (e, t) => {
	Ct.init(e, t), Ht.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => Qn(t, n, r, e));
		Qn(i, n, r, e);
	};
});
function Qn(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(De(e));
	}
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/registries.js
var $n, er = class {
	constructor() {
		this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
	}
	add(e, ...t) {
		let n = t[0];
		return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
	}
	clear() {
		return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
	}
	remove(e) {
		let t = this._map.get(e);
		return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
	}
	get(e) {
		let t = e._zod.parent;
		if (t) {
			let n = { ...this.get(t) ?? {} };
			delete n.id;
			let r = {
				...n,
				...this._map.get(e)
			};
			return Object.keys(r).length ? r : void 0;
		}
		return this._map.get(e);
	}
	has(e) {
		return this._map.has(e);
	}
};
function tr() {
	return new er();
}
($n = globalThis).__zod_globalRegistry ?? ($n.__zod_globalRegistry = tr());
var nr = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/api.js
/* @__NO_SIDE_EFFECTS__ */
function rr(e, t) {
	return new e({
		type: "string",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ir(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ar(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function or(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function sr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function cr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function lr(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ur(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function dr(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function fr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function pr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function mr(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function hr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function gr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _r(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function vr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function yr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function br(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function xr(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Sr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Cr(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function wr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Tr(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Er(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Dr(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Or(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function kr(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ar(e, t) {
	return new e({
		type: "number",
		checks: [],
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function jr(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Mr(e, t) {
	return new e({
		type: "boolean",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Nr(e) {
	return new e({ type: "unknown" });
}
/* @__NO_SIDE_EFFECTS__ */
function Pr(e, t) {
	return new e({
		type: "never",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Fr(e, t) {
	return new Tt({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ir(e, t) {
	return new Tt({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Lr(e, t) {
	return new Et({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Rr(e, t) {
	return new Et({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function zr(e, t) {
	return new Dt({
		check: "multiple_of",
		...k(t),
		value: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Br(e, t) {
	return new kt({
		check: "max_length",
		...k(t),
		maximum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Vr(e, t) {
	return new At({
		check: "min_length",
		...k(t),
		minimum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Hr(e, t) {
	return new jt({
		check: "length_equals",
		...k(t),
		length: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ur(e, t) {
	return new Nt({
		check: "string_format",
		format: "regex",
		...k(t),
		pattern: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Wr(e) {
	return new Pt({
		check: "string_format",
		format: "lowercase",
		...k(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Gr(e) {
	return new Ft({
		check: "string_format",
		format: "uppercase",
		...k(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Kr(e, t) {
	return new It({
		check: "string_format",
		format: "includes",
		...k(t),
		includes: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function qr(e, t) {
	return new Lt({
		check: "string_format",
		format: "starts_with",
		...k(t),
		prefix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Jr(e, t) {
	return new Rt({
		check: "string_format",
		format: "ends_with",
		...k(t),
		suffix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Yr(e) {
	return new zt({
		check: "overwrite",
		tx: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Xr(e) {
	return /* @__PURE__ */ Yr((t) => t.normalize(e));
}
/* @__NO_SIDE_EFFECTS__ */
function Zr() {
	return /* @__PURE__ */ Yr((e) => e.trim());
}
/* @__NO_SIDE_EFFECTS__ */
function Qr() {
	return /* @__PURE__ */ Yr((e) => e.toLowerCase());
}
/* @__NO_SIDE_EFFECTS__ */
function $r() {
	return /* @__PURE__ */ Yr((e) => e.toUpperCase());
}
/* @__NO_SIDE_EFFECTS__ */
function ei() {
	return /* @__PURE__ */ Yr((e) => le(e));
}
/* @__NO_SIDE_EFFECTS__ */
function ti(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...k(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ni(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...k(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ri(e) {
	let t = /* @__PURE__ */ ii((n) => (n.addIssue = (e) => {
		if (typeof e == "string") n.issues.push(De(e, n.value, t._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= n.value, r.inst ??= t, r.continue ??= !t._zod.def.abort, n.issues.push(De(r));
		}
	}, e(n.value, n)));
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function ii(e, t) {
	let n = new Ct({
		check: "custom",
		...k(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/to-json-schema.js
function ai(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? nr,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		external: e?.external ?? void 0
	};
}
function M(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o);
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, M(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && ci(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && o.schema._prefault && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function oi(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${a}`
			};
		}
		if (t[1] === n) return { ref: "#" };
		let i = `#/${r}/`, a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + a
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
}
function si(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Object.assign(i, s), Object.assign(i, a), t._zod.parent === o) for (let e in i) e === "$ref" || e === "allOf" || e in a || delete i[e];
			if (s.$ref) for (let e in i) e === "$ref" || e === "allOf" || e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e === "$ref" || e === "allOf" || e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	for (let t of [...e.seen.entries()].reverse()) r(t[0]);
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Object.assign(i, n.def ?? n.schema);
	let a = e.external?.defs ?? {};
	for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (a[e.defId] = e.def);
	}
	e.external || Object.keys(a).length > 0 && (e.target === "draft-2020-12" ? i.$defs = a : i.definitions = a);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: ui(t, "input", e.processors),
					output: ui(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function ci(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return ci(r.element, n);
	if (r.type === "set") return ci(r.valueType, n);
	if (r.type === "lazy") return ci(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return ci(r.innerType, n);
	if (r.type === "intersection") return ci(r.left, n) || ci(r.right, n);
	if (r.type === "record" || r.type === "map") return ci(r.keyType, n) || ci(r.valueType, n);
	if (r.type === "pipe") return ci(r.in, n) || ci(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (ci(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (ci(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (ci(e, n)) return !0;
		return !!(r.rest && ci(r.rest, n));
	}
	return !1;
}
var li = (e, t = {}) => (n) => {
	let r = ai({
		...n,
		processors: t
	});
	return M(e, r), oi(r, e), si(r, e);
}, ui = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = ai({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return M(e, o), oi(o, e), si(o, e);
}, di = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, fi = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = di[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, pi = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number", typeof u == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u), typeof a == "number" && (i.minimum = a, typeof u == "number" && t.target !== "draft-04" && (u >= a ? delete i.minimum : delete i.exclusiveMinimum)), typeof l == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l), typeof o == "number" && (i.maximum = o, typeof l == "number" && t.target !== "draft-04" && (l <= o ? delete i.maximum : delete i.exclusiveMaximum)), typeof c == "number" && (i.multipleOf = c);
}, mi = (e, t, n, r) => {
	n.type = "boolean";
}, hi = (e, t, n, r) => {
	n.not = {};
}, gi = (e, t, n, r) => {
	let i = e._zod.def, a = ee(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, _i = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, vi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, yi = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = M(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, bi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = M(o[e], t, {
		...r,
		path: [
			...r.path,
			"properties",
			e
		]
	});
	let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
		let n = a.shape[e]._zod;
		return t.io === "input" ? n.optin === void 0 : n.optout === void 0;
	}));
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = M(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, xi = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => M(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Si = (e, t, n, r) => {
	let i = e._zod.def, a = M(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = M(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Ci = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = M(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = M(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = M(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, wi = (e, t, n, r) => {
	let i = e._zod.def, a = M(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, Ti = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ei = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, Di = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Oi = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, ki = (e, t, n, r) => {
	let i = e._zod.def, a = t.io === "input" ? i.in._zod.def.type === "transform" ? i.out : i.in : i.out;
	M(a, t, r);
	let o = t.seen.get(e);
	o.ref = a;
}, Ai = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, ji = (e, t, n, r) => {
	let i = e._zod.def;
	M(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Mi = /* @__PURE__ */ v("ZodISODateTime", (e, t) => {
	tn.init(e, t), L.init(e, t);
});
function Ni(e) {
	return /* @__PURE__ */ Er(Mi, e);
}
var Pi = /* @__PURE__ */ v("ZodISODate", (e, t) => {
	nn.init(e, t), L.init(e, t);
});
function Fi(e) {
	return /* @__PURE__ */ Dr(Pi, e);
}
var Ii = /* @__PURE__ */ v("ZodISOTime", (e, t) => {
	rn.init(e, t), L.init(e, t);
});
function Li(e) {
	return /* @__PURE__ */ Or(Ii, e);
}
var Ri = /* @__PURE__ */ v("ZodISODuration", (e, t) => {
	an.init(e, t), L.init(e, t);
});
function zi(e) {
	return /* @__PURE__ */ kr(Ri, e);
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/classic/errors.js
var Bi = (e, t) => {
	ke.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Me(e, t) },
		flatten: { value: (t) => je(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, te, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, te, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
};
v("ZodError", Bi);
var N = v("ZodError", Bi, { Parent: Error }), P = /* @__PURE__ */ Ne(N), Vi = /* @__PURE__ */ Pe(N), Hi = /* @__PURE__ */ Fe(N), Ui = /* @__PURE__ */ Le(N), Wi = /* @__PURE__ */ ze(N), Gi = /* @__PURE__ */ Be(N), Ki = /* @__PURE__ */ Ve(N), qi = /* @__PURE__ */ He(N), Ji = /* @__PURE__ */ Ue(N), Yi = /* @__PURE__ */ We(N), Xi = /* @__PURE__ */ Ge(N), Zi = /* @__PURE__ */ Ke(N), F = /* @__PURE__ */ v("ZodType", (e, t) => (Ht.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: ui(e, "input"),
	output: ui(e, "output")
} }), e.toJSONSchema = li(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(se(t, { checks: [...t.checks ?? [], ...n.map((e) => typeof e == "function" ? { _zod: {
	check: e,
	def: { check: "custom" },
	onattach: []
} } : e)] }), { parent: !0 }), e.with = e.check, e.clone = (t, n) => pe(e, t, n), e.brand = () => e, e.register = ((t, n) => (t.add(e, n), e)), e.parse = (t, n) => P(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => Hi(e, t, n), e.parseAsync = async (t, n) => Vi(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Ui(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Wi(e, t, n), e.decode = (t, n) => Gi(e, t, n), e.encodeAsync = async (t, n) => Ki(e, t, n), e.decodeAsync = async (t, n) => qi(e, t, n), e.safeEncode = (t, n) => Ji(e, t, n), e.safeDecode = (t, n) => Yi(e, t, n), e.safeEncodeAsync = async (t, n) => Xi(e, t, n), e.safeDecodeAsync = async (t, n) => Zi(e, t, n), e.refine = (t, n) => e.check(co(t, n)), e.superRefine = (t) => e.check(lo(t)), e.overwrite = (t) => e.check(/* @__PURE__ */ Yr(t)), e.optional = () => Wa(e), e.exactOptional = () => Ka(e), e.nullable = () => Ja(e), e.nullish = () => Wa(Ja(e)), e.nonoptional = (t) => eo(e, t), e.array = () => Aa(e), e.or = (t) => Pa([e, t]), e.and = (t) => Ia(e, t), e.transform = (t) => io(e, Ha(t)), e.default = (t) => Xa(e, t), e.prefault = (t) => Qa(e, t), e.catch = (t) => no(e, t), e.pipe = (t) => io(e, t), e.readonly = () => oo(e), e.describe = (t) => {
	let n = e.clone();
	return nr.add(n, { description: t }), n;
}, Object.defineProperty(e, "description", {
	get() {
		return nr.get(e)?.description;
	},
	configurable: !0
}), e.meta = (...t) => {
	if (t.length === 0) return nr.get(e);
	let n = e.clone();
	return nr.add(n, t[0]), n;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (t) => t(e), e)), Qi = /* @__PURE__ */ v("_ZodString", (e, t) => {
	Ut.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => fi(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...t) => e.check(/* @__PURE__ */ Ur(...t)), e.includes = (...t) => e.check(/* @__PURE__ */ Kr(...t)), e.startsWith = (...t) => e.check(/* @__PURE__ */ qr(...t)), e.endsWith = (...t) => e.check(/* @__PURE__ */ Jr(...t)), e.min = (...t) => e.check(/* @__PURE__ */ Vr(...t)), e.max = (...t) => e.check(/* @__PURE__ */ Br(...t)), e.length = (...t) => e.check(/* @__PURE__ */ Hr(...t)), e.nonempty = (...t) => e.check(/* @__PURE__ */ Vr(1, ...t)), e.lowercase = (t) => e.check(/* @__PURE__ */ Wr(t)), e.uppercase = (t) => e.check(/* @__PURE__ */ Gr(t)), e.trim = () => e.check(/* @__PURE__ */ Zr()), e.normalize = (...t) => e.check(/* @__PURE__ */ Xr(...t)), e.toLowerCase = () => e.check(/* @__PURE__ */ Qr()), e.toUpperCase = () => e.check(/* @__PURE__ */ $r()), e.slugify = () => e.check(/* @__PURE__ */ ei());
}), $i = /* @__PURE__ */ v("ZodString", (e, t) => {
	Ut.init(e, t), Qi.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ ir(ea, t)), e.url = (t) => e.check(/* @__PURE__ */ ur(ra, t)), e.jwt = (t) => e.check(/* @__PURE__ */ Tr(va, t)), e.emoji = (t) => e.check(/* @__PURE__ */ dr(ia, t)), e.guid = (t) => e.check(/* @__PURE__ */ ar(ta, t)), e.uuid = (t) => e.check(/* @__PURE__ */ or(na, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ sr(na, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ cr(na, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ lr(na, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ fr(aa, t)), e.guid = (t) => e.check(/* @__PURE__ */ ar(ta, t)), e.cuid = (t) => e.check(/* @__PURE__ */ pr(oa, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ mr(sa, t)), e.ulid = (t) => e.check(/* @__PURE__ */ hr(ca, t)), e.base64 = (t) => e.check(/* @__PURE__ */ Sr(ha, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Cr(ga, t)), e.xid = (t) => e.check(/* @__PURE__ */ gr(la, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ _r(ua, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ vr(da, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ yr(fa, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ br(pa, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ xr(ma, t)), e.e164 = (t) => e.check(/* @__PURE__ */ wr(_a, t)), e.datetime = (t) => e.check(Ni(t)), e.date = (t) => e.check(Fi(t)), e.time = (t) => e.check(Li(t)), e.duration = (t) => e.check(zi(t));
});
function I(e) {
	return /* @__PURE__ */ rr($i, e);
}
var L = /* @__PURE__ */ v("ZodStringFormat", (e, t) => {
	j.init(e, t), Qi.init(e, t);
}), ea = /* @__PURE__ */ v("ZodEmail", (e, t) => {
	Kt.init(e, t), L.init(e, t);
}), ta = /* @__PURE__ */ v("ZodGUID", (e, t) => {
	Wt.init(e, t), L.init(e, t);
}), na = /* @__PURE__ */ v("ZodUUID", (e, t) => {
	Gt.init(e, t), L.init(e, t);
}), ra = /* @__PURE__ */ v("ZodURL", (e, t) => {
	qt.init(e, t), L.init(e, t);
}), ia = /* @__PURE__ */ v("ZodEmoji", (e, t) => {
	Jt.init(e, t), L.init(e, t);
}), aa = /* @__PURE__ */ v("ZodNanoID", (e, t) => {
	Yt.init(e, t), L.init(e, t);
}), oa = /* @__PURE__ */ v("ZodCUID", (e, t) => {
	Xt.init(e, t), L.init(e, t);
}), sa = /* @__PURE__ */ v("ZodCUID2", (e, t) => {
	Zt.init(e, t), L.init(e, t);
}), ca = /* @__PURE__ */ v("ZodULID", (e, t) => {
	Qt.init(e, t), L.init(e, t);
}), la = /* @__PURE__ */ v("ZodXID", (e, t) => {
	$t.init(e, t), L.init(e, t);
}), ua = /* @__PURE__ */ v("ZodKSUID", (e, t) => {
	en.init(e, t), L.init(e, t);
}), da = /* @__PURE__ */ v("ZodIPv4", (e, t) => {
	on.init(e, t), L.init(e, t);
}), fa = /* @__PURE__ */ v("ZodIPv6", (e, t) => {
	sn.init(e, t), L.init(e, t);
}), pa = /* @__PURE__ */ v("ZodCIDRv4", (e, t) => {
	cn.init(e, t), L.init(e, t);
}), ma = /* @__PURE__ */ v("ZodCIDRv6", (e, t) => {
	ln.init(e, t), L.init(e, t);
}), ha = /* @__PURE__ */ v("ZodBase64", (e, t) => {
	dn.init(e, t), L.init(e, t);
}), ga = /* @__PURE__ */ v("ZodBase64URL", (e, t) => {
	pn.init(e, t), L.init(e, t);
}), _a = /* @__PURE__ */ v("ZodE164", (e, t) => {
	mn.init(e, t), L.init(e, t);
}), va = /* @__PURE__ */ v("ZodJWT", (e, t) => {
	gn.init(e, t), L.init(e, t);
}), ya = /* @__PURE__ */ v("ZodNumber", (e, t) => {
	_n.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => pi(e, t, n, r), e.gt = (t, n) => e.check(/* @__PURE__ */ Lr(t, n)), e.gte = (t, n) => e.check(/* @__PURE__ */ Rr(t, n)), e.min = (t, n) => e.check(/* @__PURE__ */ Rr(t, n)), e.lt = (t, n) => e.check(/* @__PURE__ */ Fr(t, n)), e.lte = (t, n) => e.check(/* @__PURE__ */ Ir(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ Ir(t, n)), e.int = (t) => e.check(Sa(t)), e.safe = (t) => e.check(Sa(t)), e.positive = (t) => e.check(/* @__PURE__ */ Lr(0, t)), e.nonnegative = (t) => e.check(/* @__PURE__ */ Rr(0, t)), e.negative = (t) => e.check(/* @__PURE__ */ Fr(0, t)), e.nonpositive = (t) => e.check(/* @__PURE__ */ Ir(0, t)), e.multipleOf = (t, n) => e.check(/* @__PURE__ */ zr(t, n)), e.step = (t, n) => e.check(/* @__PURE__ */ zr(t, n)), e.finite = () => e;
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function ba(e) {
	return /* @__PURE__ */ Ar(ya, e);
}
var xa = /* @__PURE__ */ v("ZodNumberFormat", (e, t) => {
	vn.init(e, t), ya.init(e, t);
});
function Sa(e) {
	return /* @__PURE__ */ jr(xa, e);
}
var Ca = /* @__PURE__ */ v("ZodBoolean", (e, t) => {
	yn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => mi(e, t, n, r);
});
function wa(e) {
	return /* @__PURE__ */ Mr(Ca, e);
}
var Ta = /* @__PURE__ */ v("ZodUnknown", (e, t) => {
	bn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Ea() {
	return /* @__PURE__ */ Nr(Ta);
}
var Da = /* @__PURE__ */ v("ZodNever", (e, t) => {
	xn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => hi(e, t, n, r);
});
function Oa(e) {
	return /* @__PURE__ */ Pr(Da, e);
}
var ka = /* @__PURE__ */ v("ZodArray", (e, t) => {
	Cn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r), e.element = t.element, e.min = (t, n) => e.check(/* @__PURE__ */ Vr(t, n)), e.nonempty = (t) => e.check(/* @__PURE__ */ Vr(1, t)), e.max = (t, n) => e.check(/* @__PURE__ */ Br(t, n)), e.length = (t, n) => e.check(/* @__PURE__ */ Hr(t, n)), e.unwrap = () => e.element;
});
function Aa(e, t) {
	return /* @__PURE__ */ ti(ka, e, t);
}
var ja = /* @__PURE__ */ v("ZodObject", (e, t) => {
	On.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => bi(e, t, n, r), w(e, "shape", () => t.shape), e.keyof = () => Ba(Object.keys(e._zod.def.shape)), e.catchall = (t) => e.clone({
		...e._zod.def,
		catchall: t
	}), e.passthrough = () => e.clone({
		...e._zod.def,
		catchall: Ea()
	}), e.loose = () => e.clone({
		...e._zod.def,
		catchall: Ea()
	}), e.strict = () => e.clone({
		...e._zod.def,
		catchall: Oa()
	}), e.strip = () => e.clone({
		...e._zod.def,
		catchall: void 0
	}), e.extend = (t) => _e(e, t), e.safeExtend = (t) => ve(e, t), e.merge = (t) => ye(e, t), e.pick = (t) => he(e, t), e.omit = (t) => ge(e, t), e.partial = (...t) => be(Ua, e, t[0]), e.required = (...t) => xe($a, e, t[0]);
});
function Ma(e, t) {
	return new ja({
		type: "object",
		shape: e ?? {},
		...k(t)
	});
}
var Na = /* @__PURE__ */ v("ZodUnion", (e, t) => {
	An.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => xi(e, t, n, r), e.options = t.options;
});
function Pa(e, t) {
	return new Na({
		type: "union",
		options: e,
		...k(t)
	});
}
var Fa = /* @__PURE__ */ v("ZodIntersection", (e, t) => {
	jn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r);
});
function Ia(e, t) {
	return new Fa({
		type: "intersection",
		left: e,
		right: t
	});
}
var La = /* @__PURE__ */ v("ZodRecord", (e, t) => {
	Pn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ra(e, t, n) {
	return new La({
		type: "record",
		keyType: e,
		valueType: t,
		...k(n)
	});
}
var za = /* @__PURE__ */ v("ZodEnum", (e, t) => {
	Fn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => gi(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new za({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new za({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	};
});
function Ba(e, t) {
	return new za({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...k(t)
	});
}
var Va = /* @__PURE__ */ v("ZodTransform", (e, t) => {
	In.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => vi(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new b(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(De(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(De(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function Ha(e) {
	return new Va({
		type: "transform",
		transform: e
	});
}
var Ua = /* @__PURE__ */ v("ZodOptional", (e, t) => {
	Rn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Wa(e) {
	return new Ua({
		type: "optional",
		innerType: e
	});
}
var Ga = /* @__PURE__ */ v("ZodExactOptional", (e, t) => {
	zn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ka(e) {
	return new Ga({
		type: "optional",
		innerType: e
	});
}
var qa = /* @__PURE__ */ v("ZodNullable", (e, t) => {
	Bn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ja(e) {
	return new qa({
		type: "nullable",
		innerType: e
	});
}
var Ya = /* @__PURE__ */ v("ZodDefault", (e, t) => {
	Vn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Xa(e, t) {
	return new Ya({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : de(t);
		}
	});
}
var Za = /* @__PURE__ */ v("ZodPrefault", (e, t) => {
	Un.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Qa(e, t) {
	return new Za({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : de(t);
		}
	});
}
var $a = /* @__PURE__ */ v("ZodNonOptional", (e, t) => {
	Wn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function eo(e, t) {
	return new $a({
		type: "nonoptional",
		innerType: e,
		...k(t)
	});
}
var to = /* @__PURE__ */ v("ZodCatch", (e, t) => {
	Kn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function no(e, t) {
	return new to({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var ro = /* @__PURE__ */ v("ZodPipe", (e, t) => {
	qn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r), e.in = t.in, e.out = t.out;
});
function io(e, t) {
	return new ro({
		type: "pipe",
		in: e,
		out: t
	});
}
var ao = /* @__PURE__ */ v("ZodReadonly", (e, t) => {
	Yn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function oo(e) {
	return new ao({
		type: "readonly",
		innerType: e
	});
}
var so = /* @__PURE__ */ v("ZodCustom", (e, t) => {
	Zn.init(e, t), F.init(e, t), e._zod.processJSONSchema = (t, n, r) => _i(e, t, n, r);
});
function co(e, t = {}) {
	return /* @__PURE__ */ ni(so, e, t);
}
function lo(e) {
	return /* @__PURE__ */ ri(e);
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/dist/core/index.js
var R = /* @__PURE__ */ l(d(), 1), uo = /* @__PURE__ */ l(_()), fo = [
	"context",
	"project",
	"knowledge",
	"reference",
	"personal",
	"workflow"
], po = [
	"active",
	"archived",
	"draft",
	"deleted"
], mo = Ma({
	title: I().min(1).max(500),
	content: I().min(1).max(5e4),
	summary: I().max(1e3).optional(),
	memory_type: Ba(fo).default("context"),
	topic_id: I().uuid().optional(),
	project_ref: I().max(100).optional(),
	tags: Aa(I().min(1).max(50)).max(20).default([]),
	metadata: Ra(I(), Ea()).optional()
}), ho = Ma({
	title: I().min(1).max(500).optional(),
	content: I().min(1).max(5e4).optional(),
	summary: I().max(1e3).optional(),
	memory_type: Ba(fo).optional(),
	status: Ba(po).optional(),
	topic_id: I().uuid().nullable().optional(),
	project_ref: I().max(100).nullable().optional(),
	tags: Aa(I().min(1).max(50)).max(20).optional(),
	metadata: Ra(I(), Ea()).optional()
}), z = Ma({
	query: I().min(1).max(1e3),
	memory_types: Aa(Ba(fo)).optional(),
	tags: Aa(I()).optional(),
	topic_id: I().uuid().optional(),
	project_ref: I().optional(),
	status: Ba(po).default("active"),
	limit: ba().int().min(1).max(100).default(20),
	threshold: ba().min(0).max(1).default(.7)
}), B = Ma({
	name: I().min(1).max(100),
	description: I().max(500).optional(),
	color: I().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
	icon: I().max(50).optional(),
	parent_topic_id: I().uuid().optional()
});
Ma({
	memory_id: I().uuid().optional(),
	content: I().min(1).optional(),
	title: I().optional(),
	existing_tags: Aa(I()).optional(),
	max_suggestions: ba().int().min(1).max(10).optional()
}).refine((e) => e.memory_id || e.content, { message: "Either memory_id or content is required" }), Ma({
	time_range_days: ba().int().min(1).max(365).optional(),
	include_insights: wa().optional(),
	response_format: Ba(["json", "markdown"]).optional()
}), Ma({
	include_recommendations: wa().optional(),
	detailed_breakdown: wa().optional()
}), Ma({
	memory_id: I().uuid().optional(),
	query: I().min(1).optional(),
	limit: ba().int().min(1).max(20).optional(),
	similarity_threshold: ba().min(0).max(1).optional(),
	exclude_ids: Aa(I().uuid()).optional()
}).refine((e) => e.memory_id || e.query, { message: "Either memory_id or query is required" }), Ma({
	similarity_threshold: ba().min(0).max(1).optional(),
	include_archived: wa().optional(),
	limit: ba().int().min(1).max(50).optional()
}), Ma({
	memory_ids: Aa(I().uuid()).optional(),
	topic: I().min(1).optional(),
	time_range_days: ba().int().min(1).max(365).optional(),
	insight_types: Aa(Ba([
		"themes",
		"connections",
		"gaps",
		"actions",
		"summary"
	])).optional(),
	detail_level: Ba([
		"brief",
		"detailed",
		"comprehensive"
	]).optional()
});
var go = [
	"semantic",
	"fixed-size",
	"paragraph",
	"sentence",
	"code-block"
], _o = [
	"vector",
	"text",
	"hybrid"
];
Ma({
	chunking: Ma({
		strategy: Ba(go).optional(),
		maxChunkSize: ba().int().min(100).max(1e4).optional(),
		overlap: ba().int().min(0).max(500).optional()
	}).optional(),
	cleanContent: wa().optional(),
	extractMetadata: wa().optional()
}).optional();
var vo = Ma({
	query: I().min(1).max(1e3),
	type: Ba(fo).optional(),
	threshold: ba().min(0).max(1).default(.7),
	limit: ba().int().min(1).max(100).default(20),
	search_mode: Ba(_o).default("hybrid"),
	filters: Ma({
		tags: Aa(I()).optional(),
		project_id: I().uuid().optional(),
		topic_id: I().uuid().optional(),
		date_range: Ma({
			from: I().optional(),
			to: I().optional()
		}).optional()
	}).optional(),
	include_chunks: wa().default(!1)
}), yo = Ma({
	from: I().optional(),
	to: I().optional(),
	group_by: Ba([
		"day",
		"week",
		"month"
	]).default("day")
});
function bo(e) {
	switch (e) {
		case 400: return "VALIDATION_ERROR";
		case 401: return "AUTH_ERROR";
		case 403: return "FORBIDDEN";
		case 404: return "NOT_FOUND";
		case 408: return "TIMEOUT_ERROR";
		case 409: return "CONFLICT";
		case 429: return "RATE_LIMIT_ERROR";
		case 500:
		case 502:
		case 503:
		case 504: return "SERVER_ERROR";
		default: return "API_ERROR";
	}
}
function xo(e, t = "API_ERROR", n, r) {
	return {
		code: t,
		message: e,
		statusCode: n,
		details: r,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function So(e, t, n) {
	let r = bo(e), i = `HTTP ${e}: ${t}`, a;
	if (n && typeof n == "object") {
		let e = n;
		typeof e.error == "string" ? i = e.error : typeof e.message == "string" && (i = e.message), e.details && (a = e.details);
	}
	return xo(i, r, e, a);
}
function Co(e) {
	return new Promise((t) => setTimeout(t, e));
}
function V(e, t = 1e3, n = "exponential", r = 3e4) {
	let i;
	i = n === "exponential" ? t * 2 ** e : t * (e + 1);
	let a = i * .2 * (Math.random() * 2 - 1);
	return i = Math.min(i + a, r), Math.round(i);
}
function wo(e) {
	return e ? e >= 500 || e === 429 || e === 408 : !0;
}
var To = class {
	constructor(e) {
		this.config = {
			timeout: 3e4,
			...e
		}, this.baseHeaders = {
			"Content-Type": "application/json",
			"User-Agent": "@lanonasis/memory-client/2.0.0",
			"X-Project-Scope": "lanonasis-maas",
			...e.headers
		}, e.authToken ? this.baseHeaders.Authorization = `Bearer ${e.authToken}` : e.apiKey && (this.baseHeaders["X-API-Key"] = e.apiKey), e.organizationId && (this.baseHeaders["X-Organization-ID"] = e.organizationId);
	}
	enrichWithOrgContext(e) {
		return this.config.organizationId && !e.organization_id ? {
			...e,
			organization_id: this.config.organizationId
		} : !this.config.organizationId && this.config.userId && !e.organization_id ? {
			...e,
			organization_id: this.config.userId
		} : e;
	}
	async request(e, t = {}) {
		let n = Date.now(), r = this.config.retry?.maxRetries ?? 3, i = this.config.retry?.retryDelay ?? 1e3, a = this.config.retry?.backoff ?? "exponential";
		if (this.config.onRequest) try {
			this.config.onRequest(e);
		} catch (e) {
			console.warn("onRequest hook error:", e);
		}
		let o = `${this.config.apiUrl.includes("/api") ? this.config.apiUrl.replace("/api", "") : this.config.apiUrl}/api/v1${e}`, s, c = 0;
		for (; c <= r;) try {
			let l = new AbortController(), u = setTimeout(() => l.abort(), this.config.timeout), d = await fetch(o, {
				headers: {
					...this.baseHeaders,
					...t.headers
				},
				signal: l.signal,
				...t
			});
			clearTimeout(u);
			let f, p = d.headers.get("content-type");
			if (f = p && p.includes("application/json") ? await d.json() : await d.text(), !d.ok) {
				let e = So(d.status, d.statusText, f);
				if (wo(d.status) && c < r) {
					s = e, await Co(V(c, i, a)), c++;
					continue;
				}
				if (this.config.onError) try {
					this.config.onError(e);
				} catch (e) {
					console.warn("onError hook error:", e);
				}
				return {
					error: e,
					meta: {
						duration: Date.now() - n,
						retries: c
					}
				};
			}
			if (this.config.onResponse) try {
				let t = Date.now() - n;
				this.config.onResponse(e, t);
			} catch (e) {
				console.warn("onResponse hook error:", e);
			}
			return {
				data: f,
				meta: {
					duration: Date.now() - n,
					retries: c
				}
			};
		} catch (e) {
			if (e instanceof Error && e.name === "AbortError") {
				let e = xo("Request timeout", "TIMEOUT_ERROR", 408);
				if (c < r) {
					s = e, await Co(V(c, i, a)), c++;
					continue;
				}
				if (this.config.onError) try {
					this.config.onError(e);
				} catch (e) {
					console.warn("onError hook error:", e);
				}
				return {
					error: e,
					meta: {
						duration: Date.now() - n,
						retries: c
					}
				};
			}
			let t = xo(e instanceof Error ? e.message : "Network error", "NETWORK_ERROR");
			if (c < r) {
				s = t, await Co(V(c, i, a)), c++;
				continue;
			}
			if (this.config.onError) try {
				this.config.onError(t);
			} catch (e) {
				console.warn("onError hook error:", e);
			}
			return {
				error: t,
				meta: {
					duration: Date.now() - n,
					retries: c
				}
			};
		}
		return {
			error: s ?? xo("Max retries exceeded", "API_ERROR"),
			meta: {
				duration: Date.now() - n,
				retries: c
			}
		};
	}
	validateInput(e, t) {
		let n = e.safeParse(t);
		return n.success ? null : { error: xo("Validation failed", "VALIDATION_ERROR", 400, n.error?.issues?.map((e) => ({
			field: e.path.map(String).join("."),
			message: e.message
		})) ?? []) };
	}
	async healthCheck() {
		return this.request("/health");
	}
	async createMemory(e) {
		let t = this.validateInput(mo, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async getMemory(e) {
		return this.request(`/memory/${encodeURIComponent(e)}`);
	}
	async updateMemory(e, t) {
		let n = this.validateInput(ho, t);
		return n ? { error: n.error } : this.request(`/memory/${encodeURIComponent(e)}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async deleteMemory(e) {
		return this.request(`/memory/${encodeURIComponent(e)}`, { method: "DELETE" });
	}
	async listMemories(e = {}) {
		let t = new URLSearchParams();
		Object.entries(e).forEach(([e, n]) => {
			n != null && (Array.isArray(n) ? t.append(e, n.join(",")) : t.append(e, String(n)));
		});
		let n = t.toString(), r = n ? `/memory?${n}` : "/memory";
		return this.request(r);
	}
	async searchMemories(e) {
		let t = this.validateInput(z, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory/search", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async bulkDeleteMemories(e) {
		let t = this.enrichWithOrgContext({ memory_ids: e });
		return this.request("/memory/bulk/delete", {
			method: "POST",
			body: JSON.stringify(t)
		});
	}
	async createTopic(e) {
		let t = this.validateInput(B, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/topics", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async getTopics() {
		return this.request("/topics");
	}
	async getTopic(e) {
		return this.request(`/topics/${encodeURIComponent(e)}`);
	}
	async updateTopic(e, t) {
		return this.request(`/topics/${encodeURIComponent(e)}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async deleteTopic(e) {
		return this.request(`/topics/${encodeURIComponent(e)}`, { method: "DELETE" });
	}
	async getMemoryStats() {
		return this.request("/memory/stats");
	}
	async createMemoryWithPreprocessing(e) {
		let t = this.validateInput(mo, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async updateMemoryWithPreprocessing(e, t) {
		let n = this.validateInput(ho, t);
		return n ? { error: n.error } : this.request(`/memory/${encodeURIComponent(e)}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async enhancedSearch(e) {
		let t = this.validateInput(vo, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory/search", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async getSearchAnalytics(e = {}) {
		let t = this.validateInput(yo, e);
		if (t) return { error: t.error };
		let n = new URLSearchParams();
		e.from && n.append("from", e.from), e.to && n.append("to", e.to), e.group_by && n.append("group_by", e.group_by);
		let r = n.toString(), i = r ? `/analytics/search?${r}` : "/analytics/search";
		return this.request(i);
	}
	async getAccessPatterns(e = {}) {
		let t = new URLSearchParams();
		e.from && t.append("from", e.from), e.to && t.append("to", e.to);
		let n = t.toString(), r = n ? `/analytics/access?${n}` : "/analytics/access";
		return this.request(r);
	}
	async getExtendedStats() {
		return this.request("/analytics/stats");
	}
	async getTopicWithMemories(e, t = {}) {
		let n = new URLSearchParams();
		t.limit && n.append("limit", String(t.limit)), t.offset && n.append("offset", String(t.offset));
		let r = n.toString(), i = r ? `/topics/${encodeURIComponent(e)}/memories?${r}` : `/topics/${encodeURIComponent(e)}/memories`;
		return this.request(i);
	}
	async getTopicsHierarchy() {
		return this.request("/topics?include_hierarchy=true");
	}
	setAuthToken(e) {
		this.baseHeaders.Authorization = `Bearer ${e}`, delete this.baseHeaders["X-API-Key"];
	}
	setApiKey(e) {
		this.baseHeaders["X-API-Key"] = e, delete this.baseHeaders.Authorization;
	}
	clearAuth() {
		delete this.baseHeaders.Authorization, delete this.baseHeaders["X-API-Key"];
	}
	updateConfig(e) {
		this.config = {
			...this.config,
			...e
		}, e.headers && (this.baseHeaders = {
			...this.baseHeaders,
			...e.headers
		});
	}
	getConfig() {
		let { apiKey: e, authToken: t, ...n } = this.config;
		return n;
	}
};
function Eo(e) {
	return new To(e);
}
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/dist/react/index.js
var Do = (0, R.createContext)(null);
function Oo({ children: e, config: t, apiKey: n, apiUrl: r = "https://api.lanonasis.com", client: i }) {
	let a = (0, R.useMemo)(() => i || Eo({
		apiUrl: r,
		apiKey: n,
		...t
	}), [
		i,
		r,
		n,
		t
	]);
	return (0, R.createElement)(Do.Provider, { value: a }, e);
}
function ko() {
	let e = (0, R.useContext)(Do);
	if (!e) throw Error("useMemoryClient must be used within a MemoryProvider");
	return e;
}
function Ao(e) {
	let t = ko(), [n, r] = (0, R.useState)([]), [i, a] = (0, R.useState)(!0), [o, s] = (0, R.useState)(null), c = (0, R.useCallback)(async () => {
		a(!0), s(null);
		let n = await t.listMemories(e);
		n.error ? (s(n.error), r([])) : n.data && r(n.data.data), a(!1);
	}, [t, JSON.stringify(e)]);
	return (0, R.useEffect)(() => {
		c();
	}, [c]), {
		memories: n,
		loading: i,
		error: o,
		refresh: c
	};
}
function jo() {
	let e = ko(), [t, n] = (0, R.useState)(!1), [r, i] = (0, R.useState)(null);
	return {
		createMemory: (0, R.useCallback)(async (t) => {
			n(!0), i(null);
			let r = await e.createMemory(t);
			return r.error ? (i(r.error), n(!1), null) : (n(!1), r.data || null);
		}, [e]),
		loading: t,
		error: r
	};
}
function Mo(e = 300) {
	let t = ko(), [n, r] = (0, R.useState)([]), [i, a] = (0, R.useState)(!1), [o, s] = (0, R.useState)(null), [c, l] = (0, R.useState)(0), [u, d] = (0, R.useState)(0), f = (0, R.useRef)(null), p = (0, R.useCallback)(async (n, i) => {
		f.current && clearTimeout(f.current), f.current = setTimeout(async () => {
			a(!0), s(null);
			let e = await t.searchMemories({
				query: n,
				status: i?.status ?? "active",
				limit: i?.limit ?? 20,
				threshold: i?.threshold ?? .7,
				...i
			});
			e.error ? (s(e.error), r([]), l(0), d(0)) : e.data && (r(e.data.results), l(e.data.total_results), d(e.data.search_time_ms)), a(!1);
		}, e);
	}, [t, e]);
	return (0, R.useEffect)(() => () => {
		f.current && clearTimeout(f.current);
	}, []), {
		results: n,
		loading: i,
		error: o,
		search: p,
		totalResults: c,
		searchTime: u
	};
}
//#endregion
//#region ../../node_modules/react/cjs/react-jsx-runtime.production.js
var No = /* @__PURE__ */ s(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), H = (/* @__PURE__ */ s(((e, t) => {
	t.exports = No();
})))(), U = R.forwardRef(({ className: e = "", variant: t = "default", size: n = "default", children: r, ...i }, a) => /* @__PURE__ */ (0, H.jsx)("button", {
	ref: a,
	className: `inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${{
		default: "vscode-button",
		secondary: "vscode-button vscode-button-secondary",
		ghost: "hover:bg-[var(--vscode-list-hoverBackground)] text-[var(--vscode-foreground)]"
	}[t]} ${{
		default: "h-8 px-4 py-2 text-[13px]",
		sm: "h-7 px-3 text-[12px]",
		icon: "h-6 w-6"
	}[n]} ${e}`,
	...i,
	children: r
}));
U.displayName = "Button";
//#endregion
//#region src/webview/components/ui/Input.tsx
var Po = R.forwardRef(({ className: e = "", type: t = "text", ...n }, r) => /* @__PURE__ */ (0, H.jsx)("input", {
	ref: r,
	type: t,
	className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${e}`,
	...n
}));
Po.displayName = "Input";
//#endregion
//#region src/webview/components/L0Logo.tsx
var Fo = ({ className: e = "", size: t = 24 }) => /* @__PURE__ */ (0, H.jsx)("svg", {
	width: t,
	height: t,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className: e,
	children: /* @__PURE__ */ (0, H.jsx)("path", {
		d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
}), W = {
	search: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /* @__PURE__ */ (0, H.jsx)("path", { d: "m21 21-4.35-4.35" })]
	}),
	plus: /* @__PURE__ */ (0, H.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, H.jsx)("path", { d: "M12 5v14M5 12h14" })
	}),
	refresh: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("path", { d: "M23 4v6h-6M1 20v-6h6" }), /* @__PURE__ */ (0, H.jsx)("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })]
	}),
	settings: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ (0, H.jsx)("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })]
	}),
	logout: /* @__PURE__ */ (0, H.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, H.jsx)("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
	}),
	chevronRight: /* @__PURE__ */ (0, H.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, H.jsx)("polyline", { points: "9,18 15,12 9,6" })
	}),
	globe: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, H.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, H.jsx)("line", {
				x1: "2",
				y1: "12",
				x2: "22",
				y2: "12"
			}),
			/* @__PURE__ */ (0, H.jsx)("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
		]
	}),
	lightbulb: /* @__PURE__ */ (0, H.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, H.jsx)("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
	}),
	file: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }), /* @__PURE__ */ (0, H.jsx)("polyline", { points: "14,2 14,8 20,8" })]
	}),
	send: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("line", {
			x1: "22",
			y1: "2",
			x2: "11",
			y2: "13"
		}), /* @__PURE__ */ (0, H.jsx)("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })]
	}),
	paperclip: /* @__PURE__ */ (0, H.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, H.jsx)("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
	}),
	edit: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, H.jsx)("path", { d: "M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" })]
	}),
	trash: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, H.jsx)("polyline", { points: "3 6 5 6 21 6" }),
			/* @__PURE__ */ (0, H.jsx)("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }),
			/* @__PURE__ */ (0, H.jsx)("path", { d: "M10 11v6M14 11v6" }),
			/* @__PURE__ */ (0, H.jsx)("path", { d: "M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" })
		]
	}),
	copy: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("rect", {
			x: "9",
			y: "9",
			width: "13",
			height: "13",
			rx: "2",
			ry: "2"
		}), /* @__PURE__ */ (0, H.jsx)("path", { d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" })]
	}),
	close: /* @__PURE__ */ (0, H.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, H.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, H.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	})
}, Io = [
	"context",
	"project",
	"knowledge",
	"reference",
	"personal",
	"workflow"
], Lo = (e) => {
	if (!e) return "—";
	try {
		return new Date(e).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		});
	} catch {
		return "—";
	}
}, Ro = (e) => {
	if (!e) return "—";
	try {
		return new Date(e).toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	} catch {
		return "—";
	}
}, zo = (e) => e && e.length > 0 ? e.join(", ") : "", Bo = (e) => e.split(",").map((e) => e.trim()).filter(Boolean), Vo = (e) => {
	if (!e) return "U";
	let t = e.trim();
	if (!t) return "U";
	let n = t.split(/\s+/).filter(Boolean);
	if (n.length === 1) {
		let e = n[0];
		return (e.includes("@") ? e.split("@")[0] : e).slice(0, 2).toUpperCase();
	}
	return (n[0][0] + n[n.length - 1][0]).toUpperCase();
}, Ho = (e, t) => {
	let n = t.toLowerCase();
	return e.title.toLowerCase().includes(n) || e.content.toLowerCase().includes(n) || (e.tags || []).some((e) => e.toLowerCase().includes(n));
}, Uo = ({ onLoginOAuth: e, onLoginApiKey: t, isLoading: n = !1, error: r = null }) => {
	let [i, a] = (0, R.useState)(!1), [o, s] = (0, R.useState)(""), c = () => {
		o.trim() && t && t(o.trim());
	};
	return /* @__PURE__ */ (0, H.jsx)("div", {
		className: "space-y-3 select-none",
		children: /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, H.jsx)("h2", {
					className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]",
					children: "Connect to sync memories"
				}),
				/* @__PURE__ */ (0, H.jsx)("p", {
					className: "text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed",
					children: "You can still work locally, but connecting unlocks sync and full AI search."
				}),
				r && /* @__PURE__ */ (0, H.jsx)("div", {
					className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20",
					children: r
				}),
				i ? /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "space-y-2 pt-1",
					children: [/* @__PURE__ */ (0, H.jsx)(Po, {
						type: "password",
						placeholder: "Enter your API key (lano_... or lns_...)",
						value: o,
						onChange: (e) => s(e.target.value),
						className: "h-8 text-[13px]",
						autoFocus: !0,
						onKeyDown: (e) => e.key === "Enter" && c()
					}), /* @__PURE__ */ (0, H.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, H.jsx)(U, {
							className: "flex-1",
							onClick: c,
							disabled: !o.trim() || n,
							children: n ? "Connecting..." : "Connect"
						}), /* @__PURE__ */ (0, H.jsx)(U, {
							variant: "secondary",
							onClick: () => {
								a(!1), s("");
							},
							children: "Cancel"
						})]
					})]
				}) : /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "space-y-2 pt-1",
					children: [/* @__PURE__ */ (0, H.jsx)(U, {
						className: "w-full",
						onClick: e,
						disabled: n,
						children: n ? "Connecting..." : "Connect in Browser"
					}), /* @__PURE__ */ (0, H.jsx)(U, {
						className: "w-full",
						variant: "secondary",
						onClick: () => a(!0),
						disabled: n,
						children: "Enter API Key"
					})]
				})
			]
		})
	});
}, Wo = ({ memory: e, onClick: t }) => /* @__PURE__ */ (0, H.jsxs)("div", {
	className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
	onClick: t,
	children: [
		/* @__PURE__ */ (0, H.jsx)("div", {
			className: "flex items-start justify-between gap-2",
			children: /* @__PURE__ */ (0, H.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, H.jsx)("span", {
					className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0",
					children: W.file
				}), /* @__PURE__ */ (0, H.jsx)("h3", {
					className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1",
					children: e.title
				})]
			})
		}),
		/* @__PURE__ */ (0, H.jsxs)("div", {
			className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5",
			children: [
				/* @__PURE__ */ (0, H.jsx)("span", {
					className: "opacity-60",
					children: Lo(e.created_at)
				}),
				/* @__PURE__ */ (0, H.jsx)("span", {
					className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
					children: e.memory_type
				}),
				e.tags?.slice(0, 2).map((e) => /* @__PURE__ */ (0, H.jsxs)("span", {
					className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
					children: ["#", e]
				}, e))
			]
		}),
		e._pending && /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "text-[10px] text-yellow-400 pl-5",
			children: ["Pending ", e._pending]
		})
	]
}), Go = ({ title: e, isOpen: t, onToggle: n, actions: r }) => /* @__PURE__ */ (0, H.jsxs)("div", {
	className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
	onClick: n,
	children: [/* @__PURE__ */ (0, H.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, H.jsx)("span", {
			className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${t ? "rotate-90" : ""}`,
			children: W.chevronRight
		}), /* @__PURE__ */ (0, H.jsx)("span", {
			className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase",
			children: e
		})]
	}), r && /* @__PURE__ */ (0, H.jsx)("div", {
		className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
		children: r
	})]
}), Ko = ({ syncStatus: e, onSync: t, isAuthenticated: n, hasLocalMemories: r, onConnect: i }) => {
	let a = !n;
	return !a && e.isOnline && e.pendingCount === 0 ? null : /* @__PURE__ */ (0, H.jsxs)("div", {
		className: `px-3 py-2 text-[11px] flex items-center justify-between ${a ? "bg-blue-500/10 text-blue-300 border-b border-blue-500/20" : e.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`,
		children: [/* @__PURE__ */ (0, H.jsx)("div", {
			className: "flex items-center gap-2",
			children: a ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)("span", {
				className: "opacity-80",
				children: W.globe
			}), /* @__PURE__ */ (0, H.jsxs)("span", { children: ["Local mode", r ? "" : " (no cache yet)"] })] }) : e.isOnline ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsxs)("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				className: "animate-pulse",
				children: [/* @__PURE__ */ (0, H.jsx)("path", { d: "M23 4v6h-6M1 20v-6h6" }), /* @__PURE__ */ (0, H.jsx)("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })]
			}), /* @__PURE__ */ (0, H.jsxs)("span", { children: [e.pendingCount, " pending"] })] }) : /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsxs)("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				children: [
					/* @__PURE__ */ (0, H.jsx)("line", {
						x1: "1",
						y1: "1",
						x2: "23",
						y2: "23"
					}),
					/* @__PURE__ */ (0, H.jsx)("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
					/* @__PURE__ */ (0, H.jsx)("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
					/* @__PURE__ */ (0, H.jsx)("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
					/* @__PURE__ */ (0, H.jsx)("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
					/* @__PURE__ */ (0, H.jsx)("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
					/* @__PURE__ */ (0, H.jsx)("line", {
						x1: "12",
						y1: "20",
						x2: "12.01",
						y2: "20"
					})
				]
			}), /* @__PURE__ */ (0, H.jsx)("span", { children: "Offline" })] })
		}), a ? i && /* @__PURE__ */ (0, H.jsx)("button", {
			onClick: i,
			className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors",
			children: "Connect"
		}) : e.pendingCount > 0 && e.isOnline && /* @__PURE__ */ (0, H.jsx)("button", {
			onClick: t,
			disabled: e.isSyncing,
			className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
			children: e.isSyncing ? "Syncing..." : "Sync now"
		})]
	});
}, qo = ({ message: e, onOpenMemory: t }) => {
	let n = e.role === "user";
	return /* @__PURE__ */ (0, H.jsxs)("div", {
		className: `flex flex-col gap-1 ${n ? "items-end" : "items-start"}`,
		children: [/* @__PURE__ */ (0, H.jsx)("div", {
			className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${n ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`,
			children: e.content
		}), !n && e.memories && e.memories.length > 0 && /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "w-full mt-2 space-y-1",
			children: [/* @__PURE__ */ (0, H.jsxs)("div", {
				className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1",
				children: [
					"Related memories (",
					e.memories.length,
					")"
				]
			}), e.memories.slice(0, 3).map((e) => /* @__PURE__ */ (0, H.jsxs)("div", {
				className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px] cursor-pointer hover:border-[var(--vscode-focusBorder)]",
				onClick: () => t?.(e),
				children: [
					/* @__PURE__ */ (0, H.jsx)("div", {
						className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1",
						children: e.title
					}),
					/* @__PURE__ */ (0, H.jsxs)("div", {
						className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5",
						children: [e.content.slice(0, 100), e.content.length > 100 ? "..." : ""]
					}),
					e._pending && /* @__PURE__ */ (0, H.jsx)("div", {
						className: "text-[10px] text-yellow-400 mt-1",
						children: "⏳ Pending sync"
					})
				]
			}, e.id))]
		})]
	});
}, Jo = ({ initialChatInput: e = "", onAttachFromClipboard: t, isAuthenticated: n = !1, onLoginOAuth: r, onLoginApiKey: i, onLogout: a, authLoading: o = !1, authError: s = null, userEmail: c = null, userName: l = null, authMethod: u = "none" }) => {
	let { memories: d, loading: f, refresh: p } = Ao({
		limit: 200,
		order: "desc"
	}), { createMemory: m, loading: h } = jo(), { search: g, results: _, loading: v } = Mo(), y = ko(), [b, x] = (0, R.useState)(""), [S, ee] = (0, R.useState)(e), [te, C] = (0, R.useState)(!0), [ne, re] = (0, R.useState)(!0), [ie, ae] = (0, R.useState)(!1), [w, oe] = (0, R.useState)([]), [se, ce] = (0, R.useState)(!1), [le, ue] = (0, R.useState)([]), [T, E] = (0, R.useState)({
		isOnline: !0,
		lastSyncAt: null,
		pendingCount: 0,
		isSyncing: !1
	}), [D, de] = (0, R.useState)(null), [O, fe] = (0, R.useState)(null), [pe, k] = (0, R.useState)(!1), [A, me] = (0, R.useState)({
		title: "",
		content: "",
		memory_type: "knowledge",
		tags: ""
	}), [he, ge] = (0, R.useState)(!1), [_e, ve] = (0, R.useState)(!1), [ye, be] = (0, R.useState)(""), [xe, Se] = (0, R.useState)(!1), Ce = (0, R.useRef)(null), we = (0, R.useRef)(null), Te = (0, R.useRef)(null), Ee = (e, t) => {
		e && oe((n) => n.map((n) => n.id === e && n.role === "assistant" ? t(n) : n));
	};
	(0, R.useEffect)(() => {
		if (D) {
			let e = setTimeout(() => de(null), 5e3);
			return () => clearTimeout(e);
		}
	}, [D]), (0, R.useEffect)(() => {
		e !== void 0 && ee(e);
	}, [e]);
	let De = n && T.isOnline, Oe = le.length > 0, ke = !n || !T.isOnline, Ae = n ? u === "apiKey" ? "API key" : "OAuth" : Oe ? "Local cache" : "Not connected", je = l || c || null, Me = l && c ? c : null, Ne = je || c || null, Pe = !!O && (O.id.startsWith("local_") || O._pending === "create");
	(0, R.useEffect)(() => {
		let e = (e) => {
			let t = e.data;
			if (!(!t || typeof t != "object")) {
				if (t.type === "lanonasis:cache:data" && (ue(t.payload?.memories || []), t.payload?.status && E(t.payload.status)), t.type === "lanonasis:sync:start" && E((e) => ({
					...e,
					isSyncing: !0
				})), t.type === "lanonasis:sync:complete" && (ue(t.payload?.memories || []), E((e) => t.payload?.status || {
					...e,
					isSyncing: !1,
					isOnline: !0
				})), t.type === "lanonasis:sync:error") {
					let e = t.payload?.isNetworkError === !0, n = t.payload?.error || "Sync failed";
					E((t) => ({
						...t,
						isSyncing: !1,
						isOnline: e ? !1 : t.isOnline
					})), de(e ? "Network error - working offline" : n);
				}
				if (t.type === "lanonasis:auth:result" && !t.payload?.success && de(t.payload?.error || "Authentication failed"), t.type === "lanonasis:ai:search:local") {
					let e = t.payload?.results || [], n = t.payload?.query || "", r = t.payload?.requestId;
					Ee(r, (t) => ({
						...t,
						content: e.length > 0 ? `Found ${e.length} local memories:` : `No local matches for "${n}". Try saving more context or connect for full search.`,
						memories: e
					})), r && r === Te.current && ce(!1);
				}
				if (t.type === "lanonasis:ai:search:api") {
					let e = t.payload?.results || [], n = t.payload?.query || "", r = t.payload?.requestId;
					Ee(r, (t) => {
						let r = new Set((t.memories || []).map((e) => e.id)), i = e.filter((e) => !r.has(e.id)), a = [...t.memories || [], ...i].slice(0, 5);
						return {
							...t,
							content: a.length > 0 ? `Found ${a.length} relevant memories:` : `No memories found for "${n}"`,
							memories: a
						};
					}), r && r === Te.current && (Te.current = null, ce(!1));
				}
				if (t.type === "lanonasis:cache:added") {
					let e = t.payload?.memory;
					e && (ue((t) => [e, ...t]), E((e) => ({
						...e,
						pendingCount: e.pendingCount + 1
					})));
				}
				if (t.type === "lanonasis:cache:updated") {
					let e = t.payload?.memory;
					e && (ue((t) => t.map((t) => t.id === e.id || t._localId === e._localId ? e : t)), fe((t) => t && (t.id === e.id || t._localId === e._localId) ? e : t)), t.payload?.status && E(t.payload.status);
				}
				if (t.type === "lanonasis:cache:deleted") {
					let e = t.payload?.id;
					e && (ue((t) => t.filter((t) => t.id !== e)), fe((t) => t && t.id === e ? null : t)), t.payload?.status && E(t.payload.status);
				}
				t.type === "lanonasis:cache:cleared" && (ue([]), fe(null), t.payload?.status ? E(t.payload.status) : E((e) => ({
					...e,
					lastSyncAt: null,
					pendingCount: 0,
					isSyncing: !1
				})));
			}
		};
		return window.addEventListener("message", e), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", e);
	}, []), (0, R.useEffect)(() => {
		Ce.current && (Ce.current.scrollTop = Ce.current.scrollHeight);
	}, [w]), (0, R.useEffect)(() => {
		b.length > 2 && De && g(b);
	}, [
		b,
		g,
		De
	]);
	let Fe = (0, R.useMemo)(() => b.length <= 2 ? [] : le.filter((e) => Ho(e, b)), [le, b]), Ie = ke || T.pendingCount > 0 ? le : d, Le = De && _.length > 0 ? _ : Fe, Re = b.length > 2 ? Le : Ie.length > 0 ? Ie : le, ze = async () => {
		let e = S.trim() || b.trim();
		if (!e) {
			let e = document.querySelector("textarea");
			e && (e.focus(), e.placeholder = "Type content to save as a memory...");
			return;
		}
		try {
			let t = {
				title: e.slice(0, 50) + (e.length > 50 ? "..." : ""),
				content: e,
				memory_type: "knowledge",
				tags: []
			};
			if (De) await m(t), ee(""), await p();
			else throw Error("Local-only mode");
		} catch (t) {
			console.error("Failed to create memory:", t), window.vscode && (window.vscode.postMessage({
				type: "lanonasis:cache:add",
				payload: { memory: {
					title: e.slice(0, 50) + (e.length > 50 ? "..." : ""),
					content: e,
					memory_type: "knowledge",
					tags: []
				} }
			}), ee(""));
		}
	}, Be = async () => {
		ae(!0);
		try {
			window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), n && await p();
		} finally {
			ae(!1);
		}
	}, Ve = (e) => {
		let t = e.toLowerCase().trim();
		if (t === "help" || t === "?" || t.includes("how do i")) return {
			action: "help",
			query: e
		};
		for (let t of [
			/^save\s+(.+)/i,
			/^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
			/^remember\s+(.+)/i,
			/^store\s+(.+)/i
		]) {
			let n = e.match(t);
			if (n) return {
				action: "create",
				query: n[1] || e
			};
		}
		return [
			/^list$/i,
			/^list\s+(?:my\s+)?(?:memories|notes)$/i,
			/^show\s+(?:my\s+)?(?:memories|notes)$/i,
			/^recent\s+(?:memories|notes)$/i
		].some((t) => t.test(e)) ? {
			action: "list",
			query: ""
		} : {
			action: "search",
			query: e
		};
	}, He = (0, R.useCallback)((e) => {
		fe(e), me({
			title: e.title || "",
			content: e.content || "",
			memory_type: e.memory_type || "knowledge",
			tags: zo(e.tags)
		}), k(!1);
	}, []), Ue = (0, R.useCallback)(() => {
		fe(null), k(!1);
	}, []), We = (0, R.useCallback)((e) => {
		if (window.vscode) {
			window.vscode.postMessage({
				type: "lanonasis:clipboard:write",
				payload: { text: e }
			});
			return;
		}
		navigator.clipboard?.writeText && navigator.clipboard.writeText(e);
	}, []), Ge = (0, R.useCallback)(() => {
		O && (me({
			title: O.title || "",
			content: O.content || "",
			memory_type: O.memory_type || "knowledge",
			tags: zo(O.tags)
		}), k(!0));
	}, [O]), Ke = (0, R.useCallback)(async () => {
		if (!O) return;
		let e = {
			title: A.title.trim() || O.title,
			content: A.content.trim() || O.content,
			memory_type: A.memory_type || O.memory_type,
			tags: Bo(A.tags)
		};
		ge(!0);
		try {
			if (De) {
				let t = await y.updateMemory(O.id, e);
				if (t?.error) throw Error(t.error);
				let n = t?.data || O;
				fe(n), ue((e) => e.map((e) => e.id === n.id ? n : e)), k(!1), await p();
				return;
			}
			window.vscode && (window.vscode.postMessage({
				type: "lanonasis:cache:update",
				payload: {
					id: O.id,
					updates: e
				}
			}), fe((t) => t && {
				...t,
				...e,
				tags: e.tags || t.tags,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			})), k(!1);
		} catch (e) {
			de(e instanceof Error ? e.message : "Update failed");
		} finally {
			ge(!1);
		}
	}, [
		O,
		A.title,
		A.content,
		A.memory_type,
		A.tags,
		De,
		y,
		p
	]), qe = (0, R.useCallback)(async () => {
		if (O && window.confirm(`Delete "${O.title}"? This cannot be undone.`)) {
			ge(!0);
			try {
				if (Pe) window.vscode && window.vscode.postMessage({
					type: "lanonasis:cache:delete",
					payload: { id: O.id }
				});
				else if (De) {
					let e = await y.deleteMemory(O.id);
					if (e?.error) throw Error(e.error);
					await p();
				} else window.vscode && window.vscode.postMessage({
					type: "lanonasis:cache:delete",
					payload: { id: O.id }
				});
				ue((e) => e.filter((e) => e.id !== O.id)), fe(null);
			} catch (e) {
				de(e instanceof Error ? e.message : "Delete failed");
			} finally {
				ge(!1);
			}
		}
	}, [
		O,
		De,
		y,
		p
	]), Je = (0, R.useCallback)(() => {
		ve(!0);
	}, []), Ye = (0, R.useCallback)(() => {
		ve(!1), Se(!1), be("");
	}, []), Xe = (0, R.useCallback)(() => {
		ye.trim() && (i && i(ye.trim()), be(""), Se(!1));
	}, [ye, i]), Ze = async () => {
		let e = S.trim();
		if (!e) return;
		let t = {
			id: `user_${Date.now()}`,
			role: "user",
			content: e,
			timestamp: Date.now()
		};
		oe((e) => [...e, t]), ee("");
		let n = Ve(e);
		if (n.action === "help") {
			let e = {
				id: `assistant_${Date.now()}`,
				role: "assistant",
				content: "🧠 **L0 Memory Assistant**\n\nI can help you:\n• **Search**: \"find my OAuth notes\" or \"what was that regex?\"\n• **Save**: \"save Use PKCE for mobile OAuth\"\n• **List**: \"show my memories\"\n\nTry asking me something!",
				timestamp: Date.now()
			};
			oe((t) => [...t, e]);
			return;
		}
		if (n.action === "create") {
			let e = {
				title: n.query.slice(0, 50) + (n.query.length > 50 ? "..." : ""),
				content: n.query,
				memory_type: "knowledge",
				tags: []
			};
			if (De) try {
				await m(e);
				let t = {
					id: `assistant_${Date.now()}`,
					role: "assistant",
					content: `✅ Memory saved: "${n.query.slice(0, 50)}${n.query.length > 50 ? "..." : ""}"`,
					timestamp: Date.now()
				};
				oe((e) => [...e, t]), await p();
				return;
			} catch (e) {
				console.log("Create failed, saving locally:", e);
			}
			window.vscode && window.vscode.postMessage({
				type: "lanonasis:cache:add",
				payload: { memory: e }
			});
			let t = {
				id: `assistant_${Date.now()}`,
				role: "assistant",
				content: `✅ Memory saved locally (will sync when online): "${n.query.slice(0, 50)}${n.query.length > 50 ? "..." : ""}"`,
				timestamp: Date.now()
			};
			oe((e) => [...e, t]);
			return;
		}
		if (n.action === "list") {
			let e = (De && d.length > 0 ? d : le).slice(0, 5), t = {
				id: `assistant_${Date.now()}`,
				role: "assistant",
				content: e.length > 0 ? "Here are your recent memories:" : "I don't have any memories yet. Try saving one!",
				memories: e,
				timestamp: Date.now()
			};
			oe((e) => [...e, t]);
			return;
		}
		ce(!0);
		let r = {
			id: `assistant_${Date.now()}`,
			role: "assistant",
			content: `🔍 Searching for: "${n.query}"`,
			memories: [],
			timestamp: Date.now()
		};
		if (Te.current = r.id, oe((e) => [...e, r]), window.vscode) window.vscode.postMessage({
			type: "lanonasis:ai:search",
			payload: {
				query: n.query,
				requestId: r.id
			}
		});
		else try {
			await g(n.query);
			let e = le.filter((e) => Ho(e, n.query));
			Ee(r.id, (t) => ({
				...t,
				content: e && e.length > 0 ? `Found ${e.length} relevant memories:` : `No memories found for "${n.query}"`,
				memories: e || []
			}));
		} catch (e) {
			console.log("Search failed:", e);
		} finally {
			Te.current = null, ce(!1);
		}
	};
	return /* @__PURE__ */ (0, H.jsx)("div", {
		className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none",
		children: /* @__PURE__ */ (0, H.jsxs)("div", {
			className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative",
			children: [
				D && /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, H.jsx)("span", {
						className: "text-[11px] text-red-200",
						children: D
					}), /* @__PURE__ */ (0, H.jsx)("button", {
						onClick: () => de(null),
						className: "text-red-200 hover:text-white text-xs ml-2",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]",
					children: [/* @__PURE__ */ (0, H.jsx)("div", {
						className: "flex items-center gap-2",
						children: Ne ? /* @__PURE__ */ (0, H.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, H.jsx)("div", {
								className: "h-6 w-6 rounded-full bg-[var(--vscode-badge-background)]/30 text-[10px] font-semibold text-[var(--vscode-editor-foreground)] flex items-center justify-center",
								children: Vo(Ne)
							}), /* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex flex-col leading-tight",
								children: [/* @__PURE__ */ (0, H.jsx)("span", {
									className: "text-[11px] font-semibold text-[var(--vscode-sideBarTitle-foreground)] max-w-[150px] truncate",
									children: je
								}), Me && /* @__PURE__ */ (0, H.jsx)("span", {
									className: "text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[150px] truncate",
									children: Me
								})]
							})]
						}) : /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)(Fo, {
							className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
							size: 16
						}), /* @__PURE__ */ (0, H.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]",
							children: "LanOnasis Memory"
						})] })
					}), /* @__PURE__ */ (0, H.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]",
								children: [/* @__PURE__ */ (0, H.jsx)("div", {
									className: `h-1.5 w-1.5 rounded-full ${n ? T.isOnline ? "bg-green-500" : "bg-red-500" : "bg-yellow-500"}`,
									title: n ? T.isOnline ? "Online" : "Offline" : "Local"
								}), /* @__PURE__ */ (0, H.jsx)("span", { children: n ? T.isOnline ? "Online" : "Offline" : "Local" })]
							}),
							/* @__PURE__ */ (0, H.jsx)("span", {
								className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80",
								children: Ae
							}),
							ke && /* @__PURE__ */ (0, H.jsx)("span", {
								className: "text-[10px] text-blue-300/90",
								children: "Local mode"
							}),
							n && /* @__PURE__ */ (0, H.jsx)("span", {
								className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80",
								children: T.isSyncing ? "Syncing..." : T.pendingCount > 0 ? `${T.pendingCount} pending` : T.lastSyncAt ? `Synced ${Lo(new Date(T.lastSyncAt).toISOString())}` : "Not synced"
							}),
							/* @__PURE__ */ (0, H.jsx)(U, {
								variant: "ghost",
								size: "icon",
								title: "Settings",
								onClick: Je,
								children: W.settings
							}),
							n && /* @__PURE__ */ (0, H.jsx)(U, {
								variant: "ghost",
								size: "icon",
								title: "Logout",
								onClick: a,
								children: W.logout
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, H.jsx)(Ko, {
					syncStatus: T,
					onSync: Be,
					isAuthenticated: n,
					hasLocalMemories: Oe,
					onConnect: Je
				}),
				/* @__PURE__ */ (0, H.jsxs)("div", {
					className: "flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, H.jsx)(Go, {
							title: "Memory Assistant",
							isOpen: te,
							onToggle: () => C(!te)
						}),
						te && /* @__PURE__ */ (0, H.jsxs)("div", {
							ref: Ce,
							className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3 bg-[var(--vscode-sideBar-background)]",
							children: [w.length === 0 ? /* @__PURE__ */ (0, H.jsx)("div", {
								className: "text-[13px] text-[var(--vscode-foreground)] flex flex-col items-center justify-center text-center py-4",
								children: n ? /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [
									/* @__PURE__ */ (0, H.jsx)("div", {
										className: "text-[var(--vscode-button-background)] mb-2",
										children: W.lightbulb
									}),
									/* @__PURE__ */ (0, H.jsx)("p", {
										className: "italic opacity-90",
										children: "Ask me to find or save memories"
									}),
									/* @__PURE__ */ (0, H.jsx)("p", {
										className: "text-[11px] mt-1 opacity-70",
										children: "Try: \"find my OAuth notes\""
									})
								] }) : /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)("p", {
									className: "italic opacity-90",
									children: "Local mode: search cached memories or save new ones."
								}), /* @__PURE__ */ (0, H.jsx)("p", {
									className: "text-[11px] mt-1 opacity-70",
									children: "Connect for full AI search and sync."
								})] })
							}) : w.map((e) => /* @__PURE__ */ (0, H.jsx)(qo, {
								message: e,
								onOpenMemory: He
							}, e.id)), se && /* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]",
								children: [/* @__PURE__ */ (0, H.jsxs)("svg", {
									className: "animate-spin h-3 w-3",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ (0, H.jsx)("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4",
										fill: "none"
									}), /* @__PURE__ */ (0, H.jsx)("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), "Searching..."]
							})]
						}),
						/* @__PURE__ */ (0, H.jsx)(Go, {
							title: `Memories${T.pendingCount > 0 ? ` (${T.pendingCount} pending)` : ""}`,
							isOpen: ne,
							onToggle: () => re(!ne),
							actions: (n || le.length > 0) && /* @__PURE__ */ (0, H.jsxs)(H.Fragment, { children: [/* @__PURE__ */ (0, H.jsx)(U, {
								variant: "ghost",
								size: "icon",
								onClick: () => we.current?.focus(),
								children: W.search
							}), /* @__PURE__ */ (0, H.jsx)(U, {
								variant: "ghost",
								size: "icon",
								onClick: Be,
								disabled: !n,
								children: /* @__PURE__ */ (0, H.jsx)("span", {
									className: ie || T.isSyncing ? "animate-spin" : "",
									children: W.refresh
								})
							})] })
						}),
						ne && /* @__PURE__ */ (0, H.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, H.jsxs)("div", {
								className: "p-2 space-y-2",
								children: [
									!n && /* @__PURE__ */ (0, H.jsx)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3",
										children: /* @__PURE__ */ (0, H.jsx)(Uo, {
											onLoginOAuth: r,
											onLoginApiKey: i,
											isLoading: o,
											error: s
										})
									}),
									/* @__PURE__ */ (0, H.jsx)(Po, {
										ref: we,
										placeholder: "Search memories...",
										value: b,
										onChange: (e) => x(e.target.value),
										className: "h-7 text-[13px]"
									}),
									/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex gap-2 mb-4",
										children: [/* @__PURE__ */ (0, H.jsxs)(U, {
											className: "flex-1 h-7 gap-1.5",
											onClick: ze,
											disabled: h,
											children: [h ? /* @__PURE__ */ (0, H.jsxs)("svg", {
												className: "animate-spin h-3 w-3",
												viewBox: "0 0 24 24",
												children: [/* @__PURE__ */ (0, H.jsx)("circle", {
													className: "opacity-25",
													cx: "12",
													cy: "12",
													r: "10",
													stroke: "currentColor",
													strokeWidth: "4",
													fill: "none"
												}), /* @__PURE__ */ (0, H.jsx)("path", {
													className: "opacity-75",
													fill: "currentColor",
													d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												})]
											}) : W.plus, h ? "Creating..." : De ? "Create" : "Save Local"]
										}), /* @__PURE__ */ (0, H.jsxs)(U, {
											className: "flex-1 h-7 gap-1.5",
											variant: "secondary",
											onClick: Be,
											disabled: !n || ie || T.isSyncing,
											children: [/* @__PURE__ */ (0, H.jsx)("span", {
												className: ie || T.isSyncing ? "animate-spin" : "",
												children: W.refresh
											}), ie || T.isSyncing ? "Syncing..." : "Sync"]
										})]
									}),
									/* @__PURE__ */ (0, H.jsx)("div", {
										className: "space-y-0.5",
										children: f || v ? /* @__PURE__ */ (0, H.jsx)("div", {
											className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]",
											children: "Loading..."
										}) : Re.length === 0 ? /* @__PURE__ */ (0, H.jsx)("div", {
											className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]",
											children: b ? "No memories found" : le.length > 0 ? "Loading from cache..." : "No memories yet. Create one!"
										}) : Re.map((e) => /* @__PURE__ */ (0, H.jsx)(Wo, {
											memory: e,
											onClick: () => He(e)
										}, e.id))
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, H.jsx)("div", {
					className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]",
					children: /* @__PURE__ */ (0, H.jsxs)("div", {
						className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors",
						children: [
							/* @__PURE__ */ (0, H.jsx)("div", {
								className: "p-2 pb-8",
								children: /* @__PURE__ */ (0, H.jsx)("textarea", {
									value: S,
									onChange: (e) => ee(e.target.value),
									onKeyDown: (e) => {
										e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Ze());
									},
									placeholder: n ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Search cached memories or save a note",
									className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
								})
							}),
							/* @__PURE__ */ (0, H.jsx)("div", {
								className: "absolute left-2 bottom-1.5 flex gap-1",
								children: /* @__PURE__ */ (0, H.jsx)(U, {
									size: "icon",
									variant: "ghost",
									className: "h-6 w-6",
									onClick: t,
									title: "Attach from clipboard",
									children: W.paperclip
								})
							}),
							/* @__PURE__ */ (0, H.jsx)("div", {
								className: "absolute right-2 bottom-1.5",
								children: /* @__PURE__ */ (0, H.jsx)(U, {
									size: "icon",
									className: "h-6 w-6",
									disabled: !S.trim() || se,
									onClick: Ze,
									title: "Send (Enter)",
									children: se ? /* @__PURE__ */ (0, H.jsxs)("svg", {
										className: "animate-spin h-3 w-3",
										viewBox: "0 0 24 24",
										children: [/* @__PURE__ */ (0, H.jsx)("circle", {
											className: "opacity-25",
											cx: "12",
											cy: "12",
											r: "10",
											stroke: "currentColor",
											strokeWidth: "4",
											fill: "none"
										}), /* @__PURE__ */ (0, H.jsx)("path", {
											className: "opacity-75",
											fill: "currentColor",
											d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										})]
									}) : W.send
								})
							})
						]
					})
				}),
				O && /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "absolute inset-0 z-40",
					style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
					children: [/* @__PURE__ */ (0, H.jsx)("div", {
						className: "absolute inset-0",
						onClick: Ue
					}), /* @__PURE__ */ (0, H.jsx)("div", {
						className: "relative h-full w-full p-3",
						children: /* @__PURE__ */ (0, H.jsxs)("div", {
							className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3",
							children: [
								/* @__PURE__ */ (0, H.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Memory Detail"
											}),
											/* @__PURE__ */ (0, H.jsx)("h3", {
												className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]",
												children: O.title
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
												children: [
													Ro(O.updated_at || O.created_at),
													" • ",
													O.memory_type,
													" • ",
													Pe ? "Local" : "Synced",
													O._pending ? ` (${O._pending})` : ""
												]
											})
										]
									}), /* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, H.jsx)(U, {
												variant: "ghost",
												size: "icon",
												title: "Copy content",
												onClick: () => We(O.content),
												children: W.copy
											}),
											/* @__PURE__ */ (0, H.jsx)(U, {
												variant: "ghost",
												size: "icon",
												title: "Edit memory",
												onClick: Ge,
												children: W.edit
											}),
											/* @__PURE__ */ (0, H.jsx)(U, {
												variant: "ghost",
												size: "icon",
												title: "Delete memory",
												onClick: qe,
												disabled: he,
												children: W.trash
											}),
											/* @__PURE__ */ (0, H.jsx)(U, {
												variant: "ghost",
												size: "icon",
												title: "Close",
												onClick: Ue,
												children: W.close
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, H.jsx)("div", {
									className: "flex-1 overflow-y-auto mt-3",
									children: pe ? /* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex flex-col gap-3",
										children: [
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, H.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Title"
												}), /* @__PURE__ */ (0, H.jsx)(Po, {
													value: A.title,
													onChange: (e) => me((t) => ({
														...t,
														title: e.target.value
													})),
													className: "h-8 text-[13px]"
												})]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, H.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Type"
												}), /* @__PURE__ */ (0, H.jsx)("select", {
													value: A.memory_type,
													onChange: (e) => me((t) => ({
														...t,
														memory_type: e.target.value
													})),
													className: "vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]",
													children: Io.map((e) => /* @__PURE__ */ (0, H.jsx)("option", {
														value: e,
														children: e
													}, e))
												})]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, H.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Tags (comma separated)"
												}), /* @__PURE__ */ (0, H.jsx)(Po, {
													value: A.tags,
													onChange: (e) => me((t) => ({
														...t,
														tags: e.target.value
													})),
													className: "h-8 text-[13px]"
												})]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, H.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Content"
												}), /* @__PURE__ */ (0, H.jsx)("textarea", {
													value: A.content,
													onChange: (e) => me((t) => ({
														...t,
														content: e.target.value
													})),
													className: "vscode-input w-full min-h-[140px] rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] p-2 text-[13px] text-[var(--vscode-input-foreground)] resize-none"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex flex-col gap-3",
										children: [/* @__PURE__ */ (0, H.jsx)("div", {
											className: "text-[13px] text-[var(--vscode-editor-foreground)]",
											style: { whiteSpace: "pre-wrap" },
											children: O.content
										}), O.tags?.length > 0 && /* @__PURE__ */ (0, H.jsx)("div", {
											className: "flex gap-1",
											style: { flexWrap: "wrap" },
											children: O.tags.map((e, t) => /* @__PURE__ */ (0, H.jsxs)("span", {
												className: "px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]",
												children: ["#", e]
											}, `${e}-${t}`))
										})]
									})
								}),
								/* @__PURE__ */ (0, H.jsx)("div", {
									className: "pt-3 border-t border-[var(--vscode-panel-border)] mt-3",
									children: pe ? /* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, H.jsx)(U, {
											className: "flex-1 h-7",
											onClick: Ke,
											disabled: he,
											children: he ? "Saving..." : "Save Changes"
										}), /* @__PURE__ */ (0, H.jsx)(U, {
											className: "flex-1 h-7",
											variant: "secondary",
											onClick: () => k(!1),
											disabled: he,
											children: "Cancel"
										})]
									}) : /* @__PURE__ */ (0, H.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]",
										children: [/* @__PURE__ */ (0, H.jsxs)("span", { children: ["Updated ", Ro(O.updated_at)] }), O._pending && /* @__PURE__ */ (0, H.jsx)("span", {
											className: "text-yellow-400",
											children: "Pending sync"
										})]
									})
								})
							]
						})
					})]
				}),
				_e && /* @__PURE__ */ (0, H.jsxs)("div", {
					className: "absolute inset-0 z-50",
					style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
					children: [/* @__PURE__ */ (0, H.jsx)("div", {
						className: "absolute inset-0",
						onClick: Ye
					}), /* @__PURE__ */ (0, H.jsx)("div", {
						className: "relative h-full w-full p-3",
						children: /* @__PURE__ */ (0, H.jsxs)("div", {
							className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3",
							children: [/* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, H.jsx)("h3", {
									className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]",
									children: "Settings"
								}), /* @__PURE__ */ (0, H.jsx)(U, {
									variant: "ghost",
									size: "icon",
									title: "Close",
									onClick: Ye,
									children: W.close
								})]
							}), /* @__PURE__ */ (0, H.jsxs)("div", {
								className: "flex-1 overflow-y-auto mt-3 space-y-3",
								children: [
									/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Connection"
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: [
													"Status:",
													" ",
													n ? T.isOnline ? "Online" : "Offline" : "Local"
												]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["Auth: ", Ae]
											}),
											(l || c) && /* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["User: ", l || c]
											}),
											l && c && /* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: ["Email: ", c]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: [
													"Last sync:",
													" ",
													T.lastSyncAt ? Ro(new Date(T.lastSyncAt).toISOString()) : "—"
												]
											}),
											/* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["Pending changes: ", T.pendingCount]
											})
										]
									}),
									/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "API Access"
											}),
											n ? /* @__PURE__ */ (0, H.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: [
													"Connected via ",
													Ae,
													"."
												]
											}) : /* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: "Connect to sync and search across devices."
											}),
											xe ? /* @__PURE__ */ (0, H.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, H.jsx)(Po, {
													type: "password",
													placeholder: "Enter your API key (lano_... or lns_...)",
													value: ye,
													onChange: (e) => be(e.target.value),
													className: "h-8 text-[13px]",
													onKeyDown: (e) => e.key === "Enter" && Xe()
												}), /* @__PURE__ */ (0, H.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, H.jsx)(U, {
														className: "flex-1",
														onClick: Xe,
														disabled: !ye.trim() || o,
														children: o ? "Connecting..." : "Save API Key"
													}), /* @__PURE__ */ (0, H.jsx)(U, {
														className: "flex-1",
														variant: "secondary",
														onClick: () => {
															Se(!1), be("");
														},
														children: "Cancel"
													})]
												})]
											}) : /* @__PURE__ */ (0, H.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, H.jsx)(U, {
													className: "flex-1 h-7",
													onClick: r,
													disabled: o,
													children: o ? "Connecting..." : "Connect in Browser"
												}), /* @__PURE__ */ (0, H.jsx)(U, {
													className: "flex-1 h-7",
													variant: "secondary",
													onClick: () => Se(!0),
													disabled: o,
													children: "Enter API Key"
												})]
											}),
											/* @__PURE__ */ (0, H.jsx)(U, {
												className: "w-full h-7",
												variant: "secondary",
												onClick: () => window.vscode?.postMessage({
													type: "lanonasis:open-dashboard",
													payload: { section: "api-keys" }
												}),
												children: "Manage API Keys in Dashboard"
											})
										]
									}),
									/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Cache"
											}),
											/* @__PURE__ */ (0, H.jsx)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: "Clear cached memories and pending changes stored locally."
											}),
											/* @__PURE__ */ (0, H.jsx)(U, {
												className: "w-full h-7",
												variant: "secondary",
												onClick: () => {
													window.confirm("Clear cached memories and pending changes? This cannot be undone.") && window.vscode?.postMessage({ type: "lanonasis:cache:clear" });
												},
												children: "Clear Local Cache"
											})
										]
									}),
									/* @__PURE__ */ (0, H.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [/* @__PURE__ */ (0, H.jsx)("div", {
											className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
											children: "Extension Settings"
										}), /* @__PURE__ */ (0, H.jsx)(U, {
											className: "w-full h-7",
											variant: "secondary",
											onClick: () => window.vscode?.postMessage({ type: "lanonasis:open-settings" }),
											children: "Open VS Code Settings"
										})]
									})
								]
							})]
						})
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/webview/main.tsx
typeof window < "u" && typeof window.acquireVsCodeApi == "function" && (window.vscode = window.acquireVsCodeApi());
var Yo = document.getElementById("root"), Xo = {
	apiUrl: "https://api.lanonasis.com",
	pending: /* @__PURE__ */ new Map()
}, Zo = !1, Qo = 0;
function $o(e) {
	e && (Xo.apiUrl = e);
}
function es(e) {
	return typeof e == "string" ? e : e instanceof URL ? e.toString() : e.url;
}
function ts(e) {
	try {
		let t = new URL(e, window.location.href), n = new URL(Xo.apiUrl);
		return t.origin === n.origin && t.pathname.startsWith("/api/");
	} catch {
		return !1;
	}
}
function ns(e) {
	let t = new Headers(e || {}), n = {};
	return t.forEach((e, t) => {
		n[t] = e;
	}), delete n.authorization, delete n.Authorization, delete n["x-api-key"], delete n["X-API-Key"], n;
}
async function rs(e, t, n) {
	let r = n.toUpperCase();
	if (!(r === "GET" || r === "HEAD")) {
		if (typeof t?.body == "string") return t.body;
		if (t?.body instanceof URLSearchParams) return t.body.toString();
		if (t?.body != null) return String(t.body);
		if (e instanceof Request) return await e.clone().text() || void 0;
	}
}
function is(e) {
	let t = e.data;
	if (!t || t.type !== "lanonasis:api:response") return;
	let n = t.payload || {}, r = n.requestId;
	if (!r) return;
	let i = Xo.pending.get(r);
	if (!i) return;
	if (Xo.pending.delete(r), window.clearTimeout(i.timeoutId), n.error) {
		i.reject(Error(n.error));
		return;
	}
	let a = n.status ?? 500, o = n.body && ![
		204,
		205,
		304
	].includes(a) ? n.body : null;
	i.resolve(new Response(o, {
		status: a,
		statusText: n.statusText,
		headers: n.headers || []
	}));
}
function as() {
	if (Zo || typeof window > "u" || typeof window.fetch != "function") return;
	Zo = !0;
	let e = window.fetch.bind(window);
	window.addEventListener("message", is), window.fetch = async (t, n) => {
		let r = es(t);
		if (!ts(r) || !window.vscode || typeof window.vscode.postMessage != "function") return t instanceof URL ? e(t.toString(), n) : e(t, n);
		let i = n?.method || (t instanceof Request ? t.method : "GET"), a = ns(n?.headers || (t instanceof Request ? t.headers : void 0)), o = await rs(t, n, i), s = `api_${Date.now()}_${Qo++}`;
		return new Promise((e, t) => {
			let n = window.setTimeout(() => {
				Xo.pending.delete(s), t(/* @__PURE__ */ Error("API proxy timed out"));
			}, 3e4);
			Xo.pending.set(s, {
				resolve: e,
				reject: t,
				timeoutId: n
			}), window.vscode?.postMessage({
				type: "lanonasis:api:request",
				payload: {
					requestId: s,
					url: r,
					init: {
						method: i,
						headers: a,
						body: o
					}
				}
			});
		});
	};
}
as();
function os() {
	let [e, t] = (0, R.useState)(""), [n, r] = (0, R.useState)("https://api.lanonasis.com"), [i, a] = (0, R.useState)(!1), [o, s] = (0, R.useState)("none"), [c, l] = (0, R.useState)(!1), [u, d] = (0, R.useState)(null), [f, p] = (0, R.useState)(null);
	return (0, R.useEffect)(() => {
		if (!window.vscode || typeof window.vscode.getState != "function") return;
		let e = window.vscode.getState?.() || {};
		e.injectedChat && t(e.injectedChat), e.authError !== void 0 && d(e.authError);
	}, []), (0, R.useEffect)(() => {
		if (!window.vscode || typeof window.vscode.postMessage != "function") return;
		let e = (e) => {
			let n = e.data;
			if (!(!n || typeof n != "object")) {
				if (n.type === "lanonasis:host-ready") {
					console.log("[Webview] Host ready");
					return;
				}
				if (n.type === "lanonasis:config:init" || n.type === "lanonasis:config:update") {
					let e = n.payload?.apiUrl, t = n.payload?.isAuthenticated, i = n.payload?.authMethod, o = n.payload?.user;
					e && (r(e), $o(e)), t !== void 0 && (a(t), l(!1), d(null)), i !== void 0 && s(i), o !== void 0 && p(o);
					return;
				}
				if (n.type === "lanonasis:auth:result") {
					l(!1), n.payload?.success ? d(null) : d(n.payload?.error || "Authentication failed");
					return;
				}
				if (n.type === "lanonasis:memory:createFromSelection") {
					let e = n.payload?.text ?? "";
					e && (t(e), window.vscode?.setState?.({
						injectedChat: e,
						authError: u
					}));
					return;
				}
				if (n.type === "lanonasis:clipboard:read:result") {
					let e = n.payload?.text ?? "";
					e && (t(e), window.vscode?.setState?.({
						injectedChat: e,
						authError: u
					}));
					return;
				}
			}
		};
		return window.addEventListener("message", e), window.vscode.postMessage({ type: "lanonasis:webview-ready" }), () => {
			window.removeEventListener("message", e);
		};
	}, []), /* @__PURE__ */ (0, H.jsx)(Oo, {
		apiUrl: n,
		children: /* @__PURE__ */ (0, H.jsx)(Jo, {
			initialChatInput: e,
			onAttachFromClipboard: () => {
				!window.vscode || typeof window.vscode.postMessage != "function" || window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
			},
			isAuthenticated: i,
			authMethod: o,
			onLoginOAuth: () => {
				!window.vscode || typeof window.vscode.postMessage != "function" || (l(!0), d(null), window.vscode?.setState?.({
					injectedChat: e,
					authError: null
				}), window.vscode.postMessage({
					type: "lanonasis:request-auth",
					method: "oauth"
				}));
			},
			onLoginApiKey: (t) => {
				!window.vscode || typeof window.vscode.postMessage != "function" || (l(!0), d(null), window.vscode?.setState?.({
					injectedChat: e,
					authError: null
				}), window.vscode.postMessage({
					type: "lanonasis:submit-api-key",
					payload: { apiKey: t }
				}));
			},
			onLogout: () => {
				!window.vscode || typeof window.vscode.postMessage != "function" || (window.vscode.postMessage({ type: "lanonasis:logout" }), a(!1), s("none"), d(null), l(!1), window.vscode?.setState?.({
					injectedChat: e,
					authError: null
				}));
			},
			authLoading: c,
			authError: u,
			userName: f?.name || null,
			userEmail: f?.email || null
		})
	});
}
Yo && uo.createRoot(Yo).render(/* @__PURE__ */ (0, H.jsx)(R.StrictMode, { children: /* @__PURE__ */ (0, H.jsx)(os, {}) }));
//#endregion
