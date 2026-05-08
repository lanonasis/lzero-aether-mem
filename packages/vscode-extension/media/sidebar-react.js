//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var ee = Array.isArray;
	function te() {}
	var S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ne = Object.prototype.hasOwnProperty;
	function re(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ie(e, t) {
		return re(e.type, t, e.props);
	}
	function C(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ae(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var w = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ae("" + e.key) : t.toString(36);
	}
	function se(e) {
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
	function T(e, r, i, a, o) {
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
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, T(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(w, "$&/") + "/"), T(o, r, i, "", function(e) {
			return e;
		})) : o != null && (C(o) && (o = ie(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(w, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += T(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += T(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return T(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ce(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return T(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function le(e) {
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
	var E = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, D = {
		map: ce,
		forEach: function(e, t, n) {
			ce(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ce(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ce(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = D, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return S.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ne.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return re(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
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
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = C, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: le
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = S.T, n = {};
		S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(te, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), S.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return S.H.useEffectEvent(e);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.2.4";
})), u = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV !== "production" && (function() {
		function n(e, t) {
			Object.defineProperty(a.prototype, e, { get: function() {
				console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", t[0], t[1]);
			} });
		}
		function r(e) {
			return typeof e != "object" || !e ? null : (e = ve && e[ve] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function i(e, t) {
			e = (e = e.constructor) && (e.displayName || e.name) || "ReactClass";
			var n = e + "." + t;
			ye[n] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", t, e), ye[n] = !0);
		}
		function a(e, t, n) {
			this.props = e, this.context = t, this.refs = xe, this.updater = n || be;
		}
		function o() {}
		function s(e, t, n) {
			this.props = e, this.context = t, this.refs = xe, this.updater = n || be;
		}
		function c() {}
		function l(e) {
			return "" + e;
		}
		function u(e) {
			try {
				l(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var n = t.error, r = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return n.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", r), l(e);
			}
		}
		function d(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === we ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case D: return "Fragment";
				case de: return "Profiler";
				case ue: return "StrictMode";
				case me: return "Suspense";
				case he: return "SuspenseList";
				case _e: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case E: return "Portal";
				case fe: return e.displayName || "Context";
				case O: return (e._context.displayName || "Context") + ".Consumer";
				case pe:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case ge: return t = e.displayName || null, t === null ? d(e.type) || "Memo" : t;
				case k:
					t = e._payload, e = e._init;
					try {
						return d(e(t));
					} catch {}
			}
			return null;
		}
		function f(e) {
			if (e === D) return "<>";
			if (typeof e == "object" && e && e.$$typeof === k) return "<...>";
			try {
				var t = d(e);
				return t ? "<" + t + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function p() {
			var e = j.A;
			return e === null ? null : e.getOwner();
		}
		function m() {
			return Error("react-stack-top-frame");
		}
		function h(e) {
			if (Te.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function g(e, t) {
			function n() {
				De || (De = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function _() {
			var e = d(this.type);
			return ke[e] || (ke[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function v(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: le,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: _
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function y(e, t) {
			return t = v(e.type, t, e.props, e._owner, e._debugStack, e._debugTask), e._store && (t._store.validated = e._store.validated), t;
		}
		function b(e) {
			x(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === k && (e._payload.status === "fulfilled" ? x(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function x(e) {
			return typeof e == "object" && !!e && e.$$typeof === le;
		}
		function ee(e) {
			var t = {
				"=": "=0",
				":": "=2"
			};
			return "$" + e.replace(/[=:]/g, function(e) {
				return t[e];
			});
		}
		function te(e, t) {
			return typeof e == "object" && e && e.key != null ? (u(e.key), ee("" + e.key)) : t.toString(36);
		}
		function S(e) {
			switch (e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
				default: switch (typeof e.status == "string" ? e.then(c, c) : (e.status = "pending", e.then(function(t) {
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
		function ne(e, t, n, i, a) {
			var o = typeof e;
			(o === "undefined" || o === "boolean") && (e = null);
			var s = !1;
			if (e === null) s = !0;
			else switch (o) {
				case "bigint":
				case "string":
				case "number":
					s = !0;
					break;
				case "object": switch (e.$$typeof) {
					case le:
					case E:
						s = !0;
						break;
					case k: return s = e._init, ne(s(e._payload), t, n, i, a);
				}
			}
			if (s) {
				s = e, a = a(s);
				var c = i === "" ? "." + te(s, 0) : i;
				return Ce(a) ? (n = "", c != null && (n = c.replace(Ne, "$&/") + "/"), ne(a, t, n, "", function(e) {
					return e;
				})) : a != null && (x(a) && (a.key != null && (s && s.key === a.key || u(a.key)), n = y(a, n + (a.key == null || s && s.key === a.key ? "" : ("" + a.key).replace(Ne, "$&/") + "/") + c), i !== "" && s != null && x(s) && s.key == null && s._store && !s._store.validated && (n._store.validated = 2), a = n), t.push(a)), 1;
			}
			if (s = 0, c = i === "" ? "." : i + ":", Ce(e)) for (var l = 0; l < e.length; l++) i = e[l], o = c + te(i, l), s += ne(i, t, n, o, a);
			else if (l = r(e), typeof l == "function") for (l === e.entries && (Me || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Me = !0), e = l.call(e), l = 0; !(i = e.next()).done;) i = i.value, o = c + te(i, l++), s += ne(i, t, n, o, a);
			else if (o === "object") {
				if (typeof e.then == "function") return ne(S(e), t, n, i, a);
				throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
			}
			return s;
		}
		function re(e, t, n) {
			if (e == null) return e;
			var r = [], i = 0;
			return ne(e, r, "", "", function(e) {
				return t.call(n, e, i++);
			}), r;
		}
		function ie(e) {
			if (e._status === -1) {
				var t = e._ioInfo;
				t != null && (t.start = t.end = performance.now()), t = e._result;
				var n = t();
				if (n.then(function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 1, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "fulfilled", n.value = t);
					}
				}, function(t) {
					if (e._status === 0 || e._status === -1) {
						e._status = 2, e._result = t;
						var r = e._ioInfo;
						r != null && (r.end = performance.now()), n.status === void 0 && (n.status = "rejected", n.reason = t);
					}
				}), t = e._ioInfo, t != null) {
					t.value = n;
					var r = n.displayName;
					typeof r == "string" && (t.name = r);
				}
				e._status === -1 && (e._status = 0, e._result = n);
			}
			if (e._status === 1) return t = e._result, t === void 0 && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", t), "default" in t || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", t), t.default;
			throw e._result;
		}
		function C() {
			var e = j.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		function ae() {
			j.asyncTransitions--;
		}
		function w(e) {
			if (Ie === null) try {
				var n = ("require" + Math.random()).slice(0, 7);
				Ie = (t && t[n]).call(t, "timers").setImmediate;
			} catch {
				Ie = function(e) {
					!1 === Fe && (Fe = !0, typeof MessageChannel > "u" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
					var t = new MessageChannel();
					t.port1.onmessage = e, t.port2.postMessage(void 0);
				};
			}
			return Ie(e);
		}
		function oe(e) {
			return 1 < e.length && typeof AggregateError == "function" ? AggregateError(e) : e[0];
		}
		function se(e, t) {
			t !== Le - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Le = t;
		}
		function T(e, t, n) {
			var r = j.actQueue;
			if (r !== null) if (r.length !== 0) try {
				ce(r), w(function() {
					return T(e, t, n);
				});
				return;
			} catch (e) {
				j.thrownErrors.push(e);
			}
			else j.actQueue = null;
			0 < j.thrownErrors.length ? (r = oe(j.thrownErrors), j.thrownErrors.length = 0, n(r)) : t(e);
		}
		function ce(e) {
			if (!ze) {
				ze = !0;
				var t = 0;
				try {
					for (; t < e.length; t++) {
						var n = e[t];
						do {
							j.didUsePromise = !1;
							var r = n(!1);
							if (r !== null) {
								if (j.didUsePromise) {
									e[t] = n, e.splice(0, t);
									return;
								}
								n = r;
							} else break;
						} while (1);
					}
					e.length = 0;
				} catch (n) {
					e.splice(0, t + 1), j.thrownErrors.push(n);
				} finally {
					ze = !1;
				}
			}
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var le = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), D = Symbol.for("react.fragment"), ue = Symbol.for("react.strict_mode"), de = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), fe = Symbol.for("react.context"), pe = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), ge = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), _e = Symbol.for("react.activity"), ve = Symbol.iterator, ye = {}, be = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function(e) {
				i(e, "forceUpdate");
			},
			enqueueReplaceState: function(e) {
				i(e, "replaceState");
			},
			enqueueSetState: function(e) {
				i(e, "setState");
			}
		}, A = Object.assign, xe = {};
		Object.freeze(xe), a.prototype.isReactComponent = {}, a.prototype.setState = function(e, t) {
			if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, e, t, "setState");
		}, a.prototype.forceUpdate = function(e) {
			this.updater.enqueueForceUpdate(this, e, "forceUpdate");
		};
		var Se = {
			isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
			replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
		};
		for (Ve in Se) Se.hasOwnProperty(Ve) && n(Ve, Se[Ve]);
		o.prototype = a.prototype, Se = s.prototype = new o(), Se.constructor = s, A(Se, a.prototype), Se.isPureReactComponent = !0;
		var Ce = Array.isArray, we = Symbol.for("react.client.reference"), j = {
			H: null,
			A: null,
			T: null,
			S: null,
			actQueue: null,
			asyncTransitions: 0,
			isBatchingLegacy: !1,
			didScheduleLegacyUpdate: !1,
			didUsePromise: !1,
			thrownErrors: [],
			getCurrentStack: null,
			recentlyCreatedOwnerStacks: 0
		}, Te = Object.prototype.hasOwnProperty, Ee = console.createTask ? console.createTask : function() {
			return null;
		};
		Se = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var De, Oe, ke = {}, Ae = Se.react_stack_bottom_frame.bind(Se, m)(), je = Ee(f(m)), Me = !1, Ne = /\/+/g, Pe = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, Fe = !1, Ie = null, Le = 0, Re = !1, ze = !1, Be = typeof queueMicrotask == "function" ? function(e) {
			queueMicrotask(function() {
				return queueMicrotask(e);
			});
		} : w;
		Se = Object.freeze({
			__proto__: null,
			c: function(e) {
				return C().useMemoCache(e);
			}
		});
		var Ve = {
			map: re,
			forEach: function(e, t, n) {
				re(e, function() {
					t.apply(this, arguments);
				}, n);
			},
			count: function(e) {
				var t = 0;
				return re(e, function() {
					t++;
				}), t;
			},
			toArray: function(e) {
				return re(e, function(e) {
					return e;
				}) || [];
			},
			only: function(e) {
				if (!x(e)) throw Error("React.Children.only expected to receive a single React element child.");
				return e;
			}
		};
		e.Activity = _e, e.Children = Ve, e.Component = a, e.Fragment = D, e.Profiler = de, e.PureComponent = s, e.StrictMode = ue, e.Suspense = me, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j, e.__COMPILER_RUNTIME = Se, e.act = function(e) {
			var t = j.actQueue, n = Le;
			Le++;
			var r = j.actQueue = t === null ? [] : t, i = !1;
			try {
				var a = e();
			} catch (e) {
				j.thrownErrors.push(e);
			}
			if (0 < j.thrownErrors.length) throw se(t, n), e = oe(j.thrownErrors), j.thrownErrors.length = 0, e;
			if (typeof a == "object" && a && typeof a.then == "function") {
				var o = a;
				return Be(function() {
					i || Re || (Re = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
				}), { then: function(e, a) {
					i = !0, o.then(function(i) {
						if (se(t, n), n === 0) {
							try {
								ce(r), w(function() {
									return T(i, e, a);
								});
							} catch (e) {
								j.thrownErrors.push(e);
							}
							if (0 < j.thrownErrors.length) {
								var o = oe(j.thrownErrors);
								j.thrownErrors.length = 0, a(o);
							}
						} else e(i);
					}, function(e) {
						se(t, n), 0 < j.thrownErrors.length ? (e = oe(j.thrownErrors), j.thrownErrors.length = 0, a(e)) : a(e);
					});
				} };
			}
			var s = a;
			if (se(t, n), n === 0 && (ce(r), r.length !== 0 && Be(function() {
				i || Re || (Re = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
			}), j.actQueue = null), 0 < j.thrownErrors.length) throw e = oe(j.thrownErrors), j.thrownErrors.length = 0, e;
			return { then: function(e, t) {
				i = !0, n === 0 ? (j.actQueue = r, w(function() {
					return T(s, e, t);
				})) : e(s);
			} };
		}, e.cache = function(e) {
			return function() {
				return e.apply(null, arguments);
			};
		}, e.cacheSignal = function() {
			return null;
		}, e.captureOwnerStack = function() {
			var e = j.getCurrentStack;
			return e === null ? null : e();
		}, e.cloneElement = function(e, t, n) {
			if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
			var r = A({}, e.props), i = e.key, a = e._owner;
			if (t != null) {
				var o;
				a: {
					if (Te.call(t, "ref") && (o = Object.getOwnPropertyDescriptor(t, "ref").get) && o.isReactWarning) {
						o = !1;
						break a;
					}
					o = t.ref !== void 0;
				}
				for (s in o && (a = p()), h(t) && (u(t.key), i = "" + t.key), t) !Te.call(t, s) || s === "key" || s === "__self" || s === "__source" || s === "ref" && t.ref === void 0 || (r[s] = t[s]);
			}
			var s = arguments.length - 2;
			if (s === 1) r.children = n;
			else if (1 < s) {
				o = Array(s);
				for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
				r.children = o;
			}
			for (r = v(e.type, i, r, a, e._debugStack, e._debugTask), i = 2; i < arguments.length; i++) b(arguments[i]);
			return r;
		}, e.createContext = function(e) {
			return e = {
				$$typeof: fe,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			}, e.Provider = e, e.Consumer = {
				$$typeof: O,
				_context: e
			}, e._currentRenderer = null, e._currentRenderer2 = null, e;
		}, e.createElement = function(e, t, n) {
			for (var r = 2; r < arguments.length; r++) b(arguments[r]);
			r = {};
			var i = null;
			if (t != null) for (c in Oe || !("__self" in t) || "key" in t || (Oe = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), h(t) && (u(t.key), i = "" + t.key), t) Te.call(t, c) && c !== "key" && c !== "__self" && c !== "__source" && (r[c] = t[c]);
			var a = arguments.length - 2;
			if (a === 1) r.children = n;
			else if (1 < a) {
				for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
				Object.freeze && Object.freeze(o), r.children = o;
			}
			if (e && e.defaultProps) for (c in a = e.defaultProps, a) r[c] === void 0 && (r[c] = a[c]);
			i && g(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e);
			var c = 1e4 > j.recentlyCreatedOwnerStacks++;
			return v(e, i, r, p(), c ? Error("react-stack-top-frame") : Ae, c ? Ee(f(e)) : je);
		}, e.createRef = function() {
			var e = { current: null };
			return Object.seal(e), e;
		}, e.forwardRef = function(e) {
			e != null && e.$$typeof === ge ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof e == "function" ? e.length !== 0 && e.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", e.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.") : console.error("forwardRef requires a render function but was given %s.", e === null ? "null" : typeof e), e != null && e.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
			var t = {
				$$typeof: pe,
				render: e
			}, n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.isValidElement = x, e.lazy = function(e) {
			e = {
				_status: -1,
				_result: e
			};
			var t = {
				$$typeof: k,
				_payload: e,
				_init: ie
			}, n = {
				name: "lazy",
				start: -1,
				end: -1,
				value: null,
				owner: null,
				debugStack: Error("react-stack-top-frame"),
				debugTask: console.createTask ? console.createTask("lazy()") : null
			};
			return e._ioInfo = n, t._debugInfo = [{ awaited: n }], t;
		}, e.memo = function(e, t) {
			e ?? console.error("memo: The first argument must be a component. Instead received: %s", e === null ? "null" : typeof e), t = {
				$$typeof: ge,
				type: e,
				compare: t === void 0 ? null : t
			};
			var n;
			return Object.defineProperty(t, "displayName", {
				enumerable: !1,
				configurable: !0,
				get: function() {
					return n;
				},
				set: function(t) {
					n = t, e.name || e.displayName || (Object.defineProperty(e, "name", { value: t }), e.displayName = t);
				}
			}), t;
		}, e.startTransition = function(e) {
			var t = j.T, n = {};
			n._updatedFibers = /* @__PURE__ */ new Set(), j.T = n;
			try {
				var r = e(), i = j.S;
				i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && (j.asyncTransitions++, r.then(ae, ae), r.then(c, Pe));
			} catch (e) {
				Pe(e);
			} finally {
				t === null && n._updatedFibers && (e = n._updatedFibers.size, n._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), t !== null && n.types !== null && (t.types !== null && t.types !== n.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), t.types = n.types), j.T = t;
			}
		}, e.unstable_useCacheRefresh = function() {
			return C().useCacheRefresh();
		}, e.use = function(e) {
			return C().use(e);
		}, e.useActionState = function(e, t, n) {
			return C().useActionState(e, t, n);
		}, e.useCallback = function(e, t) {
			return C().useCallback(e, t);
		}, e.useContext = function(e) {
			var t = C();
			return e.$$typeof === O && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"), t.useContext(e);
		}, e.useDebugValue = function(e, t) {
			return C().useDebugValue(e, t);
		}, e.useDeferredValue = function(e, t) {
			return C().useDeferredValue(e, t);
		}, e.useEffect = function(e, t) {
			return e ?? console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useEffect(e, t);
		}, e.useEffectEvent = function(e) {
			return C().useEffectEvent(e);
		}, e.useId = function() {
			return C().useId();
		}, e.useImperativeHandle = function(e, t, n) {
			return C().useImperativeHandle(e, t, n);
		}, e.useInsertionEffect = function(e, t) {
			return e ?? console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useInsertionEffect(e, t);
		}, e.useLayoutEffect = function(e, t) {
			return e ?? console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"), C().useLayoutEffect(e, t);
		}, e.useMemo = function(e, t) {
			return C().useMemo(e, t);
		}, e.useOptimistic = function(e, t) {
			return C().useOptimistic(e, t);
		}, e.useReducer = function(e, t, n) {
			return C().useReducer(e, t, n);
		}, e.useRef = function(e) {
			return C().useRef(e);
		}, e.useState = function(e) {
			return C().useState(e);
		}, e.useSyncExternalStore = function(e, t, n) {
			return C().useSyncExternalStore(e, t, n);
		}, e.useTransition = function() {
			return C().useTransition();
		}, e.version = "19.2.4", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), d = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = l() : t.exports = u();
})), f = /* @__PURE__ */ o(((e) => {
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
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, C());
		else {
			var t = n(l);
			t !== null && oe(x, t.startTime - e);
		}
	}
	var ee = !1, te = -1, S = 5, ne = -1;
	function re() {
		return g ? !0 : !(e.unstable_now() - ne < S);
	}
	function ie() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			ne = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(te), te = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && re());) {
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
				i ? C() : ee = !1;
			}
		}
	}
	var C;
	if (typeof y == "function") C = function() {
		y(ie);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), w = ae.port2;
		ae.port1.onmessage = ie, C = function() {
			w.postMessage(null);
		};
	} else C = function() {
		_(ie, 0);
	};
	function oe(t, n) {
		te = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : S = 0 < e ? Math.floor(1e3 / e) : 5;
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(te), te = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, C()))), r;
	}, e.unstable_shouldYield = re, e.unstable_wrapCallback = function(e) {
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
})), p = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {
			if (x = !1, ne) {
				var t = e.unstable_now();
				C = t;
				var n = !0;
				try {
					a: {
						y = !1, b && (b = !1, te(re), re = -1), v = !0;
						var a = _;
						try {
							b: {
								for (o(t), g = r(p); g !== null && !(g.expirationTime > t && c());) {
									var u = g.callback;
									if (typeof u == "function") {
										g.callback = null, _ = g.priorityLevel;
										var d = u(g.expirationTime <= t);
										if (t = e.unstable_now(), typeof d == "function") {
											g.callback = d, o(t), n = !0;
											break b;
										}
										g === r(p) && i(p), o(t);
									} else i(p);
									g = r(p);
								}
								if (g !== null) n = !0;
								else {
									var f = r(m);
									f !== null && l(s, f.startTime - t), n = !1;
								}
							}
							break a;
						} finally {
							g = null, _ = a, v = !1;
						}
						n = void 0;
					}
				} finally {
					n ? ae() : ne = !1;
				}
			}
		}
		function n(e, t) {
			var n = e.length;
			e.push(t);
			a: for (; 0 < n;) {
				var r = n - 1 >>> 1, i = e[r];
				if (0 < a(i, t)) e[r] = t, e[n] = i, n = r;
				else break a;
			}
		}
		function r(e) {
			return e.length === 0 ? null : e[0];
		}
		function i(e) {
			if (e.length === 0) return null;
			var t = e[0], n = e.pop();
			if (n !== t) {
				e[0] = n;
				a: for (var r = 0, i = e.length, o = i >>> 1; r < o;) {
					var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
					if (0 > a(c, n)) l < i && 0 > a(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
					else if (l < i && 0 > a(u, n)) e[r] = u, e[l] = n, r = l;
					else break a;
				}
			}
			return t;
		}
		function a(e, t) {
			var n = e.sortIndex - t.sortIndex;
			return n === 0 ? e.id - t.id : n;
		}
		function o(e) {
			for (var t = r(m); t !== null;) {
				if (t.callback === null) i(m);
				else if (t.startTime <= e) i(m), t.sortIndex = t.expirationTime, n(p, t);
				else break;
				t = r(m);
			}
		}
		function s(e) {
			if (b = !1, o(e), !y) if (r(p) !== null) y = !0, ne || (ne = !0, ae());
			else {
				var t = r(m);
				t !== null && l(s, t.startTime - e);
			}
		}
		function c() {
			return x ? !0 : !(e.unstable_now() - C < ie);
		}
		function l(t, n) {
			re = ee(function() {
				t(e.unstable_now());
			}, n);
		}
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
			var u = performance;
			e.unstable_now = function() {
				return u.now();
			};
		} else {
			var d = Date, f = d.now();
			e.unstable_now = function() {
				return d.now() - f;
			};
		}
		var p = [], m = [], h = 1, g = null, _ = 3, v = !1, y = !1, b = !1, x = !1, ee = typeof setTimeout == "function" ? setTimeout : null, te = typeof clearTimeout == "function" ? clearTimeout : null, S = typeof setImmediate < "u" ? setImmediate : null, ne = !1, re = -1, ie = 5, C = -1;
		if (typeof S == "function") var ae = function() {
			S(t);
		};
		else if (typeof MessageChannel < "u") {
			var w = new MessageChannel(), oe = w.port2;
			w.port1.onmessage = t, ae = function() {
				oe.postMessage(null);
			};
		} else ae = function() {
			ee(t, 0);
		};
		e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
			e.callback = null;
		}, e.unstable_forceFrameRate = function(e) {
			0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : ie = 0 < e ? Math.floor(1e3 / e) : 5;
		}, e.unstable_getCurrentPriorityLevel = function() {
			return _;
		}, e.unstable_next = function(e) {
			switch (_) {
				case 1:
				case 2:
				case 3:
					var t = 3;
					break;
				default: t = _;
			}
			var n = _;
			_ = t;
			try {
				return e();
			} finally {
				_ = n;
			}
		}, e.unstable_requestPaint = function() {
			x = !0;
		}, e.unstable_runWithPriority = function(e, t) {
			switch (e) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: e = 3;
			}
			var n = _;
			_ = e;
			try {
				return t();
			} finally {
				_ = n;
			}
		}, e.unstable_scheduleCallback = function(t, i, a) {
			var o = e.unstable_now();
			switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, t) {
				case 1:
					var c = -1;
					break;
				case 2:
					c = 250;
					break;
				case 5:
					c = 1073741823;
					break;
				case 4:
					c = 1e4;
					break;
				default: c = 5e3;
			}
			return c = a + c, t = {
				id: h++,
				callback: i,
				priorityLevel: t,
				startTime: a,
				expirationTime: c,
				sortIndex: -1
			}, a > o ? (t.sortIndex = a, n(m, t), r(p) === null && t === r(m) && (b ? (te(re), re = -1) : b = !0, l(s, a - o))) : (t.sortIndex = c, n(p, t), y || v || (y = !0, ne || (ne = !0, ae()))), t;
		}, e.unstable_shouldYield = c, e.unstable_wrapCallback = function(e) {
			var t = _;
			return function() {
				var n = _;
				_ = t;
				try {
					return e.apply(this, arguments);
				} finally {
					_ = n;
				}
			};
		}, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), m = /* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = f() : t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
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
})), g = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t() {}
		function n(e) {
			return "" + e;
		}
		function r(e, t, r) {
			var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
			try {
				n(i);
				var a = !1;
			} catch {
				a = !0;
			}
			return a && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object"), n(i)), {
				$$typeof: u,
				key: i == null ? null : "" + i,
				children: e,
				containerInfo: t,
				implementation: r
			};
		}
		function i(e, t) {
			if (e === "font") return "";
			if (typeof t == "string") return t === "use-credentials" ? t : "";
		}
		function a(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : "something with type \"" + typeof e + "\"";
		}
		function o(e) {
			return e === null ? "`null`" : e === void 0 ? "`undefined`" : e === "" ? "an empty string" : typeof e == "string" ? JSON.stringify(e) : typeof e == "number" ? "`" + e + "`" : "something with type \"" + typeof e + "\"";
		}
		function s() {
			var e = f.H;
			return e === null && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."), e;
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var c = d(), l = {
			d: {
				f: t,
				r: function() {
					throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
				},
				D: t,
				C: t,
				L: t,
				m: t,
				X: t,
				S: t,
				M: t
			},
			p: 0,
			findDOMNode: null
		}, u = Symbol.for("react.portal"), f = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, e.createPortal = function(e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error("Target container is not a DOM element.");
			return r(e, t, null, n);
		}, e.flushSync = function(e) {
			var t = f.T, n = l.p;
			try {
				if (f.T = null, l.p = 2, e) return e();
			} finally {
				f.T = t, l.p = n, l.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
			}
		}, e.preconnect = function(e, t) {
			typeof e == "string" && e ? t != null && typeof t != "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", o(t)) : t != null && typeof t.crossOrigin != "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", a(t.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, l.d.C(e, t));
		}, e.prefetchDNS = function(e) {
			if (typeof e != "string" || !e) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e));
			else if (1 < arguments.length) {
				var t = arguments[1];
				typeof t == "object" && t.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", o(t));
			}
			typeof e == "string" && l.d.D(e);
		}, e.preinit = function(e, t) {
			if (typeof e == "string" && e ? typeof t != "object" || !t ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", o(t)) : t.as !== "style" && t.as !== "script" && console.error("ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are \"style\" and \"script\".", o(t.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", a(e)), typeof e == "string" && t && typeof t.as == "string") {
				var n = t.as, r = i(n, t.crossOrigin), s = typeof t.integrity == "string" ? t.integrity : void 0, c = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
				n === "style" ? l.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c
				}) : n === "script" && l.d.X(e, {
					crossOrigin: r,
					integrity: s,
					fetchPriority: c,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		}, e.preinitModule = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && t.as !== "script" && (n += " The `as` option encountered was " + o(t.as) + "."), n) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", n);
			else switch (n = t && typeof t.as == "string" ? t.as : "script", n) {
				case "script": break;
				default: n = o(n), console.error("ReactDOM.preinitModule(): Currently the only supported \"as\" type for this function is \"script\" but received \"%s\" instead. This warning was generated for `href` \"%s\". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)", n, e);
			}
			typeof e == "string" && (typeof t == "object" && t ? (t.as == null || t.as === "script") && (n = i(t.as, t.crossOrigin), l.d.M(e, {
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			})) : t ?? l.d.M(e));
		}, e.preload = function(e, t) {
			var n = "";
			if (typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), typeof t != "object" || !t ? n += " The `options` argument encountered was " + a(t) + "." : typeof t.as == "string" && t.as || (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel=\"preload\" as=\"...\" />` tag.%s", n), typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
				n = t.as;
				var r = i(n, t.crossOrigin);
				l.d.L(e, n, {
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
			var n = "";
			typeof e == "string" && e || (n += " The `href` argument encountered was " + a(e) + "."), t !== void 0 && typeof t != "object" ? n += " The `options` argument encountered was " + a(t) + "." : t && "as" in t && typeof t.as != "string" && (n += " The `as` option encountered was " + a(t.as) + "."), n && console.error("ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel=\"modulepreload\" as=\"...\" />` tag.%s", n), typeof e == "string" && (t ? (n = i(t.as, t.crossOrigin), l.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			})) : l.d.m(e));
		}, e.requestFormReset = function(e) {
			l.d.r(e);
		}, e.unstable_batchedUpdates = function(e, t) {
			return e(t);
		}, e.useFormState = function(e, t, n) {
			return s().useFormState(e, t, n);
		}, e.useFormStatus = function() {
			return s().useHostTransitionStatus();
		}, e.version = "19.2.4", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), _ = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = h()) : t.exports = g();
})), v = /* @__PURE__ */ o(((e) => {
	var t = m(), n = d(), r = _();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
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
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function f(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = f(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var p = Object.assign, h = Symbol.for("react.element"), g = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), te = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), w = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var T = Symbol.for("react.client.reference");
	function ce(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === T ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case te: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case S:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? ce(e.type) || "Memo" : t;
			case C:
				t = e._payload, e = e._init;
				try {
					return ce(e(t));
				} catch {}
		}
		return null;
	}
	var le = Array.isArray, E = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, de = [], O = -1;
	function fe(e) {
		return { current: e };
	}
	function pe(e) {
		0 > O || (e.current = de[O], de[O] = null, O--);
	}
	function me(e, t) {
		O++, de[O] = e.current, e.current = t;
	}
	var he = fe(null), ge = fe(null), k = fe(null), _e = fe(null);
	function ve(e, t) {
		switch (me(k, t), me(ge, e), me(he, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Qd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Qd(t), e = $d(t, e);
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
		pe(he), me(he, e);
	}
	function ye() {
		pe(he), pe(ge), pe(k);
	}
	function be(e) {
		e.memoizedState !== null && me(_e, e);
		var t = he.current, n = $d(t, e.type);
		t !== n && (me(ge, e), me(he, n));
	}
	function A(e) {
		ge.current === e && (pe(he), pe(ge)), _e.current === e && (pe(_e), sp._currentValue = ue);
	}
	var xe, Se;
	function Ce(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", Se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + Se;
	}
	var we = !1;
	function j(e, t) {
		if (!e || we) return "";
		we = !0;
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
			we = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ce(n) : "";
	}
	function Te(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ce(e.type);
			case 16: return Ce("Lazy");
			case 13: return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
			case 19: return Ce("SuspenseList");
			case 0:
			case 15: return j(e.type, !1);
			case 11: return j(e.type.render, !1);
			case 1: return j(e.type, !0);
			case 31: return Ce("Activity");
			default: return "";
		}
	}
	function Ee(e) {
		try {
			var t = "", n = null;
			do
				t += Te(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var De = Object.prototype.hasOwnProperty, Oe = t.unstable_scheduleCallback, ke = t.unstable_cancelCallback, Ae = t.unstable_shouldYield, je = t.unstable_requestPaint, Me = t.unstable_now, Ne = t.unstable_getCurrentPriorityLevel, Pe = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, Ie = t.unstable_NormalPriority, Le = t.unstable_LowPriority, Re = t.unstable_IdlePriority, ze = t.log, Be = t.unstable_setDisableYieldValue, Ve = null, He = null;
	function Ue(e) {
		if (typeof ze == "function" && Be(e), He && typeof He.setStrictMode == "function") try {
			He.setStrictMode(Ve, e);
		} catch {}
	}
	var We = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
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
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
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
	function tt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - We(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - We(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - We(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function st(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ct(e) {
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
	function lt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ut() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Cp(e.type)) : e;
	}
	function dt(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var ft = Math.random().toString(36).slice(2), pt = "__reactFiber$" + ft, mt = "__reactProps$" + ft, ht = "__reactContainer$" + ft, gt = "__reactEvents$" + ft, _t = "__reactListeners$" + ft, vt = "__reactHandles$" + ft, yt = "__reactResources$" + ft, bt = "__reactMarker$" + ft;
	function xt(e) {
		delete e[pt], delete e[mt], delete e[gt], delete e[_t], delete e[vt];
	}
	function St(e) {
		var t = e[pt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ht] || n[pt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Sf(e); e !== null;) {
					if (n = e[pt]) return n;
					e = Sf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Ct(e) {
		if (e = e[pt] || e[ht]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function wt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Tt(e) {
		var t = e[yt];
		return t ||= e[yt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Et(e) {
		e[bt] = !0;
	}
	var Dt = /* @__PURE__ */ new Set(), Ot = {};
	function kt(e, t) {
		At(e, t), At(e + "Capture", t);
	}
	function At(e, t) {
		for (Ot[e] = t, e = 0; e < t.length; e++) Dt.add(t[e]);
	}
	var jt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Mt = {}, Nt = {};
	function Pt(e) {
		return De.call(Nt, e) ? !0 : De.call(Mt, e) ? !1 : jt.test(e) ? Nt[e] = !0 : (Mt[e] = !0, !1);
	}
	function Ft(e, t, n) {
		if (Pt(t)) if (n === null) e.removeAttribute(t);
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
	function It(e, t, n) {
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
	function Lt(e, t, n, r) {
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
	function Rt(e) {
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
	function zt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Bt(e, t, n) {
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
	function Vt(e) {
		if (!e._valueTracker) {
			var t = zt(e) ? "checked" : "value";
			e._valueTracker = Bt(e, t, "" + e[t]);
		}
	}
	function Ht(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = zt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Ut(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Wt = /[\n"\\]/g;
	function Gt(e) {
		return e.replace(Wt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Kt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Rt(t)) : e.value !== "" + Rt(t) && (e.value = "" + Rt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Jt(e, o, Rt(n)) : Jt(e, o, Rt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Rt(s) : e.removeAttribute("name");
	}
	function qt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Vt(e);
				return;
			}
			n = n == null ? "" : "" + Rt(n), t = t == null ? n : "" + Rt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Vt(e);
	}
	function Jt(e, t, n) {
		t === "number" && Ut(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Yt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Rt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Xt(e, t, n) {
		if (t != null && (t = "" + Rt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Rt(n);
	}
	function Zt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (le(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Rt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Vt(e);
	}
	function Qt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var $t = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function en(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || $t.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function tn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && en(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && en(e, o, t[o]);
	}
	function nn(e) {
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
	var rn = new Map([
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
	]), an = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function on(e) {
		return an.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function sn() {}
	var cn = null;
	function ln(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var un = null, dn = null;
	function fn(e) {
		var t = Ct(e);
		if (t && (e = t.stateNode)) {
			var n = e[mt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Kt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Gt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[mt] || null;
								if (!a) throw Error(i(90));
								Kt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ht(r);
					}
					break a;
				case "textarea":
					Xt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Yt(e, !!n.multiple, t, !1);
			}
		}
	}
	var pn = !1;
	function mn(e, t, n) {
		if (pn) return e(t, n);
		pn = !0;
		try {
			return e(t);
		} finally {
			if (pn = !1, (un !== null || dn !== null) && (ku(), un && (t = un, e = dn, dn = un = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
		}
	}
	function hn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[mt] || null;
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
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var gn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), _n = !1;
	if (gn) try {
		var vn = {};
		Object.defineProperty(vn, "passive", { get: function() {
			_n = !0;
		} }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
	} catch {
		_n = !1;
	}
	var yn = null, bn = null, xn = null;
	function Sn() {
		if (xn) return xn;
		var e, t = bn, n = t.length, r, i = "value" in yn ? yn.value : yn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return xn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Cn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function wn() {
		return !0;
	}
	function Tn() {
		return !1;
	}
	function En(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? wn : Tn, this.isPropagationStopped = Tn, this;
		}
		return p(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = wn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = wn);
			},
			persist: function() {},
			isPersistent: wn
		}), t;
	}
	var Dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, On = En(Dn), kn = p({}, Dn, {
		view: 0,
		detail: 0
	}), An = En(kn), jn, Mn, Nn, Pn = p({}, kn, {
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
		getModifierState: Gn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (jn = e.screenX - Nn.screenX, Mn = e.screenY - Nn.screenY) : Mn = jn = 0, Nn = e), jn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Mn;
		}
	}), Fn = En(Pn), In = En(p({}, Pn, { dataTransfer: 0 })), Ln = En(p({}, kn, { relatedTarget: 0 })), Rn = En(p({}, Dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), zn = En(p({}, Dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Bn = En(p({}, Dn, { data: 0 })), Vn = {
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
	}, Hn = {
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
	}, Un = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Wn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Un[e]) ? !!t[e] : !1;
	}
	function Gn() {
		return Wn;
	}
	var Kn = En(p({}, kn, {
		key: function(e) {
			if (e.key) {
				var t = Vn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Cn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Gn,
		charCode: function(e) {
			return e.type === "keypress" ? Cn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Cn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), qn = En(p({}, Pn, {
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
	})), Jn = En(p({}, kn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Gn
	})), Yn = En(p({}, Dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Xn = En(p({}, Pn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Zn = En(p({}, Dn, {
		newState: 0,
		oldState: 0
	})), Qn = [
		9,
		13,
		27,
		32
	], $n = gn && "CompositionEvent" in window, er = null;
	gn && "documentMode" in document && (er = document.documentMode);
	var tr = gn && "TextEvent" in window && !er, nr = gn && (!$n || er && 8 < er && 11 >= er), rr = " ", ir = !1;
	function ar(e, t) {
		switch (e) {
			case "keyup": return Qn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function or(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var sr = !1;
	function cr(e, t) {
		switch (e) {
			case "compositionend": return or(t);
			case "keypress": return t.which === 32 ? (ir = !0, rr) : null;
			case "textInput": return e = t.data, e === rr && ir ? null : e;
			default: return null;
		}
	}
	function lr(e, t) {
		if (sr) return e === "compositionend" || !$n && ar(e, t) ? (e = Sn(), xn = bn = yn = null, sr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return nr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var ur = {
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
	function dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!ur[e.type] : t === "textarea";
	}
	function fr(e, t, n, r) {
		un ? dn ? dn.push(r) : dn = [r] : un = r, t = Id(t, "onChange"), 0 < t.length && (n = new On("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var pr = null, mr = null;
	function hr(e) {
		kd(e, 0);
	}
	function gr(e) {
		if (Ht(wt(e))) return e;
	}
	function _r(e, t) {
		if (e === "change") return t;
	}
	var vr = !1;
	if (gn) {
		var yr;
		if (gn) {
			var br = "oninput" in document;
			if (!br) {
				var xr = document.createElement("div");
				xr.setAttribute("oninput", "return;"), br = typeof xr.oninput == "function";
			}
			yr = br;
		} else yr = !1;
		vr = yr && (!document.documentMode || 9 < document.documentMode);
	}
	function Sr() {
		pr && (pr.detachEvent("onpropertychange", Cr), mr = pr = null);
	}
	function Cr(e) {
		if (e.propertyName === "value" && gr(mr)) {
			var t = [];
			fr(t, mr, e, ln(e)), mn(hr, t);
		}
	}
	function wr(e, t, n) {
		e === "focusin" ? (Sr(), pr = t, mr = n, pr.attachEvent("onpropertychange", Cr)) : e === "focusout" && Sr();
	}
	function Tr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return gr(mr);
	}
	function Er(e, t) {
		if (e === "click") return gr(t);
	}
	function Dr(e, t) {
		if (e === "input" || e === "change") return gr(t);
	}
	function Or(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var kr = typeof Object.is == "function" ? Object.is : Or;
	function Ar(e, t) {
		if (kr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!De.call(t, i) || !kr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function jr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Mr(e, t) {
		var n = jr(e);
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
			n = jr(n);
		}
	}
	function Nr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Nr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Pr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ut(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ut(e.document);
		}
		return t;
	}
	function Fr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Ir = gn && "documentMode" in document && 11 >= document.documentMode, Lr = null, Rr = null, zr = null, Br = !1;
	function Vr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Br || Lr == null || Lr !== Ut(r) || (r = Lr, "selectionStart" in r && Fr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), zr && Ar(zr, r) || (zr = r, r = Id(Rr, "onSelect"), 0 < r.length && (t = new On("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Lr)));
	}
	function Hr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ur = {
		animationend: Hr("Animation", "AnimationEnd"),
		animationiteration: Hr("Animation", "AnimationIteration"),
		animationstart: Hr("Animation", "AnimationStart"),
		transitionrun: Hr("Transition", "TransitionRun"),
		transitionstart: Hr("Transition", "TransitionStart"),
		transitioncancel: Hr("Transition", "TransitionCancel"),
		transitionend: Hr("Transition", "TransitionEnd")
	}, Wr = {}, Gr = {};
	gn && (Gr = document.createElement("div").style, "AnimationEvent" in window || (delete Ur.animationend.animation, delete Ur.animationiteration.animation, delete Ur.animationstart.animation), "TransitionEvent" in window || delete Ur.transitionend.transition);
	function Kr(e) {
		if (Wr[e]) return Wr[e];
		if (!Ur[e]) return e;
		var t = Ur[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Gr) return Wr[e] = t[n];
		return e;
	}
	var qr = Kr("animationend"), Jr = Kr("animationiteration"), Yr = Kr("animationstart"), Xr = Kr("transitionrun"), Zr = Kr("transitionstart"), Qr = Kr("transitioncancel"), $r = Kr("transitionend"), ei = /* @__PURE__ */ new Map(), ti = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	ti.push("scrollEnd");
	function ni(e, t) {
		ei.set(e, t), kt(t, [e]);
	}
	var ri = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ii = [], ai = 0, oi = 0;
	function si() {
		for (var e = ai, t = oi = ai = 0; t < e;) {
			var n = ii[t];
			ii[t++] = null;
			var r = ii[t];
			ii[t++] = null;
			var i = ii[t];
			ii[t++] = null;
			var a = ii[t];
			if (ii[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && di(n, i, a);
		}
	}
	function ci(e, t, n, r) {
		ii[ai++] = e, ii[ai++] = t, ii[ai++] = n, ii[ai++] = r, oi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function fi(e) {
		if (50 < bu) throw bu = 0, xu = null, Error(i(185));
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
	function yi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") gi(e) && (s = 1);
		else if (typeof e == "string") s = Qf(e, n, he.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = hi(31, n, t, a), e.elementType = ae, e.lanes = o, e;
			case y: return bi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = hi(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ne: return e = hi(13, n, t, a), e.elementType = ne, e.lanes = o, e;
			case re: return e = hi(19, n, t, a), e.elementType = re, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case te:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case S:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case C:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = hi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
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
				stack: Ee(t)
			}, wi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
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
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ni = 1 << 32 - We(t) + i | n << i | r, Pi = a + e;
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
	var Bi = null, Vi = null, M = !1, Hi = null, Ui = !1, Wi = Error(i(519));
	function Gi(e) {
		throw Zi(Ti(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Wi;
	}
	function Ki(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[pt] = e, t[mt] = r, n) {
			case "dialog":
				H("cancel", t), H("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				H("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Dd.length; n++) H(Dd[n], t);
				break;
			case "source":
				H("error", t);
				break;
			case "img":
			case "image":
			case "link":
				H("error", t), H("load", t);
				break;
			case "details":
				H("toggle", t);
				break;
			case "input":
				H("invalid", t), qt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				H("invalid", t);
				break;
			case "textarea": H("invalid", t), Zt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Hd(t.textContent, n) ? (r.popover != null && (H("beforetoggle", t), H("toggle", t)), r.onScroll != null && H("scroll", t), r.onScrollEnd != null && H("scrollend", t), r.onClick != null && (t.onclick = sn), t = !0) : t = !1, t || Gi(e, !0);
	}
	function qi(e) {
		for (Bi = e.return; Bi;) switch (Bi.tag) {
			case 5:
			case 31:
			case 13:
				Ui = !1;
				return;
			case 27:
			case 3:
				Ui = !0;
				return;
			default: Bi = Bi.return;
		}
	}
	function Ji(e) {
		if (e !== Bi) return !1;
		if (!M) return qi(e), M = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || ef(e.type, e.memoizedProps)), n = !n), n && Vi && Gi(e), qi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Vi = xf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Vi = xf(e);
		} else t === 27 ? (t = Vi, lf(e.type) ? (e = bf, bf = null, Vi = e) : Vi = t) : Vi = Bi ? yf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Yi() {
		Vi = Bi = null, M = !1;
	}
	function Xi() {
		var e = Hi;
		return e !== null && (ou === null ? ou = e : ou.push.apply(ou, e), Hi = null), e;
	}
	function Zi(e) {
		Hi === null ? Hi = [e] : Hi.push(e);
	}
	var Qi = fe(null), $i = null, ea = null;
	function ta(e, t, n) {
		me(Qi, t._currentValue), t._currentValue = n;
	}
	function na(e) {
		e._currentValue = Qi.current, pe(Qi);
	}
	function ra(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ia(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), ra(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), ra(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function aa(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					kr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === _e.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sp] : e.push(sp));
			}
			a = a.return;
		}
		e !== null && ia(t, e, n, r), t.flags |= 262144;
	}
	function N(e) {
		for (e = e.firstContext; e !== null;) {
			if (!kr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function oa(e) {
		$i = e, ea = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function sa(e) {
		return la($i, e);
	}
	function ca(e, t) {
		return $i === null && oa(e), la(e, t);
	}
	function la(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, ea === null) {
			if (e === null) throw Error(i(308));
			ea = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else ea = ea.next = t;
		return n;
	}
	var ua = typeof AbortController < "u" ? AbortController : function() {
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
	}, da = t.unstable_scheduleCallback, fa = t.unstable_NormalPriority, pa = {
		$$typeof: te,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ma() {
		return {
			controller: new ua(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ha(e) {
		e.refCount--, e.refCount === 0 && da(fa, function() {
			e.controller.abort();
		});
	}
	var ga = null, P = 0, F = 0, _a = null;
	function va(e, t) {
		if (ga === null) {
			var n = ga = [];
			P = 0, F = xd(), _a = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return P++, t.then(ya, ya), t;
	}
	function ya() {
		if (--P === 0 && ga !== null) {
			_a !== null && (_a.status = "fulfilled");
			var e = ga;
			ga = null, F = 0, _a = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ba(e, t) {
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
	var xa = E.S;
	E.S = function(e, t) {
		lu = Me(), typeof t == "object" && t && typeof t.then == "function" && va(e, t), xa !== null && xa(e, t);
	};
	var Sa = fe(null);
	function Ca() {
		var e = Sa.current;
		return e === null ? Kl.pooledCache : e;
	}
	function wa(e, t) {
		t === null ? me(Sa, Sa.current) : me(Sa, t.pool);
	}
	function Ta() {
		var e = Ca();
		return e === null ? null : {
			parent: pa._currentValue,
			pool: e
		};
	}
	var Ea = Error(i(460)), Da = Error(i(474)), Oa = Error(i(542)), I = { then: function() {} };
	function ka(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Aa(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(sn, sn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Pa(e), e;
			default:
				if (typeof t.status == "string") t.then(sn, sn);
				else {
					if (e = Kl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
				throw Ma = t, Ea;
		}
	}
	function ja(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ma = e, Ea) : e;
		}
	}
	var Ma = null;
	function Na() {
		if (Ma === null) throw Error(i(459));
		var e = Ma;
		return Ma = null, e;
	}
	function Pa(e) {
		if (e === Ea || e === Oa) throw Error(i(483));
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
		throw t.$$typeof === h ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
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
		function a(e, t) {
			return e = _i(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = xi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === C && ja(i) === t.type) ? (t = a(t, n.props), Ra(t, n), t.return = e, t) : (t = yi(n.type, n.key, n.props, null, e.mode, r), Ra(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Ci(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = bi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = xi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case g: return n = yi(t.type, t.key, t.props, null, e.mode, n), Ra(n, t), n.return = e, n;
					case v: return t = Ci(t, e.mode, n), t.return = e, t;
					case C: return t = ja(t), f(e, t, n);
				}
				if (le(t) || se(t)) return t = bi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, La(t), n);
				if (t.$$typeof === te) return f(e, ca(e, t), n);
				za(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case g: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case C: return n = ja(n), p(e, t, n, r);
				}
				if (le(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, La(n), r);
				if (n.$$typeof === te) return p(e, t, ca(e, n), r);
				za(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case g: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case C: return r = ja(r), m(e, t, n, r, i);
				}
				if (le(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, La(r), i);
				if (r.$$typeof === te) return m(e, t, n, ca(t, r), i);
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
			if (h === s.length) return n(i, d), M && Fi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return M && Fi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), M && Fi(i, h), l;
		}
		function _(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), M && Fi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return M && Fi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), M && Fi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case g:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === C && ja(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ra(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = bi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = yi(o.type, o.key, o.props, null, e.mode, c), Ra(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
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
					case C: return o = ja(o), b(e, r, o, c);
				}
				if (le(o)) return h(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), _(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, La(o), c);
				if (o.$$typeof === te) return b(e, r, ca(e, o), c);
				za(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = xi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ia = 0;
				var i = b(e, t, n, r);
				return Fa = null, i;
			} catch (t) {
				if (t === Ea || t === Oa) throw t;
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
		if (r = r.shared, Gl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = fi(e), di(e, null, n), t;
		}
		return ci(e, r, t, n), fi(e);
	}
	function Ja(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
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
			var e = _a;
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
				var f = s.lane & -536870913, m = f !== s.lane;
				if (m ? (ql & f) === f : (r & f) === f) {
					f !== 0 && f === F && (Xa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, f);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, f = typeof h == "function" ? h.call(_, d, f) : h, f == null) break a;
								d = p({}, d, f);
								break a;
							case 2: Ua = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [f] : m.push(f));
				} else m = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), tu |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function $a(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function eo(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) $a(n[e], t);
	}
	var to = fe(null), no = fe(0);
	function ro(e, t) {
		e = $l, me(no, e), me(to, t), $l = e | t.baseLanes;
	}
	function io() {
		me(no, $l), me(to, to.current);
	}
	function ao() {
		$l = no.current, pe(to), pe(no);
	}
	var oo = fe(null), so = null;
	function co(e) {
		var t = e.alternate;
		me(mo, mo.current & 1), me(oo, e), so === null && (t === null || to.current !== null || t.memoizedState !== null) && (so = e);
	}
	function lo(e) {
		me(mo, mo.current), me(oo, e), so === null && (so = e);
	}
	function uo(e) {
		e.tag === 22 ? (me(mo, mo.current), me(oo, e), so === null && (so = e)) : fo(e);
	}
	function fo() {
		me(mo, mo.current), me(oo, oo.current);
	}
	function po(e) {
		pe(oo), so === e && (so = null), pe(mo);
	}
	var mo = fe(0);
	function L(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || gf(n) || _f(n))) return t;
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
	var ho = 0, R = null, go = null, _o = null, vo = !1, yo = !1, bo = !1, xo = 0, So = 0, Co = null, wo = 0;
	function To() {
		throw Error(i(321));
	}
	function Eo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!kr(e[n], t[n])) return !1;
		return !0;
	}
	function Do(e, t, n, r, i, a) {
		return ho = a, R = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? Us : Ws, bo = !1, a = n(r, i), bo = !1, yo && (a = ko(t, n, r, i)), Oo(e), a;
	}
	function Oo(e) {
		E.H = Hs;
		var t = go !== null && go.next !== null;
		if (ho = 0, _o = go = R = null, vo = !1, So = 0, Co = null, t) throw Error(i(300));
		e === null || sc || (e = e.dependencies, e !== null && N(e) && (sc = !0));
	}
	function ko(e, t, n, r) {
		R = e;
		var a = 0;
		do {
			if (yo && (Co = null), So = 0, yo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, _o = go = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			E.H = Gs, o = t(n, r);
		} while (yo);
		return o;
	}
	function Ao() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Lo(t) : t, e = e.useState()[0], (go === null ? null : go.memoizedState) !== e && (R.flags |= 1024), t;
	}
	function jo() {
		var e = xo !== 0;
		return xo = 0, e;
	}
	function Mo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function No(e) {
		if (vo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			vo = !1;
		}
		ho = 0, _o = go = R = null, yo = !1, So = xo = 0, Co = null;
	}
	function Po() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return _o === null ? R.memoizedState = _o = e : _o = _o.next = e, _o;
	}
	function Fo() {
		if (go === null) {
			var e = R.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = go.next;
		var t = _o === null ? R.memoizedState : _o.next;
		if (t !== null) _o = t, go = e;
		else {
			if (e === null) throw R.alternate === null ? Error(i(467)) : Error(i(310));
			go = e, e = {
				memoizedState: go.memoizedState,
				baseState: go.baseState,
				baseQueue: go.baseQueue,
				queue: go.queue,
				next: null
			}, _o === null ? R.memoizedState = _o = e : _o = _o.next = e;
		}
		return _o;
	}
	function Io() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Lo(e) {
		var t = So;
		return So += 1, Co === null && (Co = []), e = Aa(Co, e, t), t = R, (_o === null ? t.memoizedState : _o.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Us : Ws), e;
	}
	function Ro(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Lo(e);
			if (e.$$typeof === te) return sa(e);
		}
		throw Error(i(438, String(e)));
	}
	function zo(e) {
		var t = null, n = R.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = R.alternate;
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
		}, n === null && (n = Io(), R.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = w;
		return t.index++, n;
	}
	function Bo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function z(e) {
		return Vo(Fo(), go, e);
	}
	function Vo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ho & f) === f : (ql & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === F && (d = !0);
					else if ((ho & p) === p) {
						u = u.next, p === F && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, R.lanes |= p, tu |= p;
					f = u.action, bo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, R.lanes |= f, tu |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !kr(o, e.memoizedState) && (sc = !0, d && (n = _a, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ho(e) {
		var t = Fo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			kr(o, t.memoizedState) || (sc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Uo(e, t, n) {
		var r = R, a = Fo(), o = M;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !kr((go || a).memoizedState, n);
		if (s && (a.memoizedState = n, sc = !0), a = a.queue, ms(Ko.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || _o !== null && _o.memoizedState.tag & 1) {
			if (r.flags |= 2048, ls(9, { destroy: void 0 }, Go.bind(null, r, a, n, t), null), Kl === null) throw Error(i(349));
			o || ho & 127 || Wo(r, t, n);
		}
		return n;
	}
	function Wo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = R.updateQueue, t === null ? (t = Io(), R.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Go(e, t, n, r) {
		t.value = n, t.getSnapshot = r, qo(t) && Jo(e);
	}
	function Ko(e, t, n) {
		return n(function() {
			qo(t) && Jo(e);
		});
	}
	function qo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !kr(e, n);
		} catch {
			return !0;
		}
	}
	function Jo(e) {
		var t = ui(e, 2);
		t !== null && wu(t, e, 2);
	}
	function Yo(e) {
		var t = Po();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), bo) {
				Ue(!0);
				try {
					n();
				} finally {
					Ue(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Bo,
			lastRenderedState: e
		}, t;
	}
	function Xo(e, t, n, r) {
		return e.baseState = n, Vo(e, go, typeof r == "function" ? r : Bo);
	}
	function Zo(e, t, n, r, a) {
		if (zs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
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
			E.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Qo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Qo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), $o(e, t, s);
			} catch (n) {
				ts(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), $o(e, t, a);
		} catch (n) {
			ts(e, t, n);
		}
	}
	function $o(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			es(e, t, n);
		}, function(n) {
			return ts(e, t, n);
		}) : es(e, t, n);
	}
	function es(e, t, n) {
		t.status = "fulfilled", t.value = n, ns(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Qo(e, n)));
	}
	function ts(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, ns(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function ns(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function rs(e, t) {
		return t;
	}
	function is(e, t) {
		if (M) {
			var n = Kl.formState;
			if (n !== null) {
				a: {
					var r = R;
					if (M) {
						if (Vi) {
							b: {
								for (var i = Vi, a = Ui; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = yf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Vi = yf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Gi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Po(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: rs,
			lastRenderedState: t
		}, n.queue = r, n = Is.bind(null, R, r), r.dispatch = n, r = Yo(!1), a = Rs.bind(null, R, !1, r.queue), r = Po(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Zo.bind(null, R, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function as(e) {
		return os(Fo(), go, e);
	}
	function os(e, t, n) {
		if (t = Vo(e, t, rs)[0], e = z(Bo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Lo(t);
		} catch (e) {
			throw e === Ea ? Oa : e;
		}
		else r = t;
		t = Fo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (R.flags |= 2048, ls(9, { destroy: void 0 }, ss.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ss(e, t) {
		e.action = t;
	}
	function cs(e) {
		var t = Fo(), n = go;
		if (n !== null) return os(t, n, e);
		Fo(), t = t.memoizedState, n = Fo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ls(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = R.updateQueue, t === null && (t = Io(), R.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function us() {
		return Fo().memoizedState;
	}
	function ds(e, t, n, r) {
		var i = Po();
		R.flags |= e, i.memoizedState = ls(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function fs(e, t, n, r) {
		var i = Fo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		go !== null && r !== null && Eo(r, go.memoizedState.deps) ? i.memoizedState = ls(t, a, n, r) : (R.flags |= e, i.memoizedState = ls(1 | t, a, n, r));
	}
	function ps(e, t) {
		ds(8390656, 8, e, t);
	}
	function ms(e, t) {
		fs(2048, 8, e, t);
	}
	function hs(e) {
		R.flags |= 4;
		var t = R.updateQueue;
		if (t === null) t = Io(), R.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function gs(e) {
		var t = Fo().memoizedState;
		return hs({
			ref: t,
			nextImpl: e
		}), function() {
			if (Gl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function _s(e, t) {
		return fs(4, 2, e, t);
	}
	function vs(e, t) {
		return fs(4, 4, e, t);
	}
	function ys(e, t) {
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
	function bs(e, t, n) {
		n = n == null ? null : n.concat([e]), fs(4, 4, ys.bind(null, t, e), n);
	}
	function xs() {}
	function Ss(e, t) {
		var n = Fo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Eo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Cs(e, t) {
		var n = Fo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Eo(t, r[1])) return r[0];
		if (r = e(), bo) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ws(e, t, n) {
		return n === void 0 || ho & 1073741824 && !(ql & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Cu(), R.lanes |= e, tu |= e, n);
	}
	function Ts(e, t, n, r) {
		return kr(n, t) ? n : to.current === null ? !(ho & 42) || ho & 1073741824 && !(ql & 261930) ? (sc = !0, e.memoizedState = n) : (e = Cu(), R.lanes |= e, tu |= e, t) : (e = ws(e, n, r), kr(e, t) || (sc = !0), e);
	}
	function Es(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, Rs(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ls(e, t, ba(c, r), Su(e)) : Ls(e, t, r, Su(e));
		} catch (n) {
			Ls(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Su());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function Ds() {}
	function Os(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ks(e).queue;
		Es(e, a, t, ue, n === null ? Ds : function() {
			return As(e), n(r);
		});
	}
	function ks(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ue,
			baseState: ue,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Bo,
				lastRenderedState: ue
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
				lastRenderedReducer: Bo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function As(e) {
		var t = ks(e);
		t.next === null && (t = e.alternate.memoizedState), Ls(e, t.next.queue, {}, Su());
	}
	function js() {
		return sa(sp);
	}
	function Ms() {
		return Fo().memoizedState;
	}
	function Ns() {
		return Fo().memoizedState;
	}
	function Ps(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Su();
					e = Ka(n);
					var r = qa(t, e, n);
					r !== null && (wu(r, t, n), Ja(r, t, n)), t = { cache: ma() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Fs(e, t, n) {
		var r = Su();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, zs(e) ? Bs(t, n) : (n = li(e, t, n, r), n !== null && (wu(n, e, r), Vs(n, t, r)));
	}
	function Is(e, t, n) {
		Ls(e, t, n, Su());
	}
	function Ls(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (zs(e)) Bs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, kr(s, o)) return ci(e, t, i, 0), Kl === null && si(), !1;
			} catch {}
			if (n = li(e, t, i, r), n !== null) return wu(n, e, r), Vs(n, t, r), !0;
		}
		return !1;
	}
	function Rs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: xd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, zs(e)) {
			if (t) throw Error(i(479));
		} else t = li(e, n, r, 2), t !== null && wu(t, e, 2);
	}
	function zs(e) {
		var t = e.alternate;
		return e === R || t !== null && t === R;
	}
	function Bs(e, t) {
		yo = vo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Vs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var Hs = {
		readContext: sa,
		use: Ro,
		useCallback: To,
		useContext: To,
		useEffect: To,
		useImperativeHandle: To,
		useLayoutEffect: To,
		useInsertionEffect: To,
		useMemo: To,
		useReducer: To,
		useRef: To,
		useState: To,
		useDebugValue: To,
		useDeferredValue: To,
		useTransition: To,
		useSyncExternalStore: To,
		useId: To,
		useHostTransitionStatus: To,
		useFormState: To,
		useActionState: To,
		useOptimistic: To,
		useMemoCache: To,
		useCacheRefresh: To
	};
	Hs.useEffectEvent = To;
	var Us = {
		readContext: sa,
		use: Ro,
		useCallback: function(e, t) {
			return Po().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: sa,
		useEffect: ps,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ds(4194308, 4, ys.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ds(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ds(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Po();
			t = t === void 0 ? null : t;
			var r = e();
			if (bo) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Po();
			if (n !== void 0) {
				var i = n(t);
				if (bo) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Fs.bind(null, R, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Po();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Yo(e);
			var t = e.queue, n = Is.bind(null, R, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			return ws(Po(), e, t);
		},
		useTransition: function() {
			var e = Yo(!1);
			return e = Es.bind(null, R, e.queue, !0, !1), Po().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = R, a = Po();
			if (M) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Kl === null) throw Error(i(349));
				ql & 127 || Wo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ps(Ko.bind(null, r, o, e), [e]), r.flags |= 2048, ls(9, { destroy: void 0 }, Go.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Po(), t = Kl.identifierPrefix;
			if (M) {
				var n = Pi, r = Ni;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = xo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = wo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: js,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e) {
			var t = Po();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Rs.bind(null, R, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: zo,
		useCacheRefresh: function() {
			return Po().memoizedState = Ps.bind(null, R);
		},
		useEffectEvent: function(e) {
			var t = Po(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Gl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ws = {
		readContext: sa,
		use: Ro,
		useCallback: Ss,
		useContext: sa,
		useEffect: ms,
		useImperativeHandle: bs,
		useInsertionEffect: _s,
		useLayoutEffect: vs,
		useMemo: Cs,
		useReducer: z,
		useRef: us,
		useState: function() {
			return z(Bo);
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			return Ts(Fo(), go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = z(Bo)[0], t = Fo().memoizedState;
			return [typeof e == "boolean" ? e : Lo(e), t];
		},
		useSyncExternalStore: Uo,
		useId: Ms,
		useHostTransitionStatus: js,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e, t) {
			return Xo(Fo(), go, e, t);
		},
		useMemoCache: zo,
		useCacheRefresh: Ns
	};
	Ws.useEffectEvent = gs;
	var Gs = {
		readContext: sa,
		use: Ro,
		useCallback: Ss,
		useContext: sa,
		useEffect: ms,
		useImperativeHandle: bs,
		useInsertionEffect: _s,
		useLayoutEffect: vs,
		useMemo: Cs,
		useReducer: Ho,
		useRef: us,
		useState: function() {
			return Ho(Bo);
		},
		useDebugValue: xs,
		useDeferredValue: function(e, t) {
			var n = Fo();
			return go === null ? ws(n, e, t) : Ts(n, go.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ho(Bo)[0], t = Fo().memoizedState;
			return [typeof e == "boolean" ? e : Lo(e), t];
		},
		useSyncExternalStore: Uo,
		useId: Ms,
		useHostTransitionStatus: js,
		useFormState: cs,
		useActionState: cs,
		useOptimistic: function(e, t) {
			var n = Fo();
			return go === null ? (n.baseState = e, [e, n.queue.dispatch]) : Xo(n, go, e, t);
		},
		useMemoCache: zo,
		useCacheRefresh: Ns
	};
	Gs.useEffectEvent = gs;
	function Ks(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : p({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var qs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Su(), i = Ka(r);
			i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (wu(t, e, r), Ja(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Su(), i = Ka(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = qa(e, i, r), t !== null && (wu(t, e, r), Ja(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Su(), r = Ka(n);
			r.tag = 2, t != null && (r.callback = t), t = qa(e, r, n), t !== null && (wu(t, e, n), Ja(t, e, n));
		}
	};
	function Js(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Ar(n, r) || !Ar(i, a) : !0;
	}
	function Ys(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && qs.enqueueReplaceState(t, t.state, null);
	}
	function Xs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = p({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Zs(e) {
		ri(e);
	}
	function Qs(e) {
		console.error(e);
	}
	function $s(e) {
		ri(e);
	}
	function ec(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function tc(e, t, n) {
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
	function nc(e, t, n) {
		return n = Ka(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			ec(e, t);
		}, n;
	}
	function rc(e) {
		return e = Ka(e), e.tag = 3, e;
	}
	function ic(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				tc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			tc(t, n, r), typeof i != "function" && (fu === null ? fu = new Set([this]) : fu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function ac(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && aa(t, n, a, !0), n = oo.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return so === null ? Iu() : n.alternate === null && eu === 0 && (eu = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === I ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), td(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === I ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), td(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return td(e, r, a), Iu(), !1;
		}
		if (M) return t = oo.current, t === null ? (r !== Wi && (t = Error(i(423), { cause: r }), Zi(Ti(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Ti(r, n), a = nc(e.stateNode, r, a), Ya(e, a), eu !== 4 && (eu = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Wi && (e = Error(i(422), { cause: r }), Zi(Ti(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Ti(o, n), V === null ? V = [o] : V.push(o), eu !== 4 && (eu = 2), t === null) return !0;
		r = Ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = nc(n.stateNode, r, e), Ya(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (fu === null || !fu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = rc(a), ic(a, e, n, r), Ya(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var oc = Error(i(461)), sc = !1;
	function cc(e, t, n, r) {
		t.child = e === null ? Ha(t, null, n, r) : Va(t, e.child, n, r);
	}
	function lc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return oa(t), r = Do(e, t, n, o, a, i), s = jo(), e !== null && !sc ? (Mo(e, t, i), Nc(e, t, i)) : (M && s && Li(t), t.flags |= 1, cc(e, t, r, i), t.child);
	}
	function uc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !gi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, dc(e, t, a, r, i)) : (e = yi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Pc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Ar : n, n(o, r) && e.ref === t.ref) return Nc(e, t, i);
		}
		return t.flags |= 1, e = _i(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function dc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Ar(a, r) && e.ref === t.ref) if (sc = !1, t.pendingProps = r = a, Pc(e, i)) e.flags & 131072 && (sc = !0);
			else return t.lanes = e.lanes, Nc(e, t, i);
		}
		return yc(e, t, n, r, i);
	}
	function fc(e, t, n, r) {
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
				return mc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && wa(t, a === null ? null : a.cachePool), a === null ? io() : ro(t, a), uo(t);
			else return r = t.lanes = 536870912, mc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && wa(t, null), io(), fo(t)) : (wa(t, a.cachePool), ro(t, a), fo(t), t.memoizedState = null);
		return cc(e, t, i, n), t.child;
	}
	function pc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function mc(e, t, n, r, i) {
		var a = Ca();
		return a = a === null ? null : {
			parent: pa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && wa(t, null), io(), uo(t), e !== null && aa(e, t, r, !0), t.childLanes = i, null;
	}
	function hc(e, t) {
		return t = Oc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function gc(e, t, n) {
		return Va(t, e.child, null, n), e = hc(t, t.pendingProps), e.flags |= 2, po(t), t.memoizedState = null, e;
	}
	function _c(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (M) {
				if (r.mode === "hidden") return e = hc(t, r), t.lanes = 536870912, pc(null, e);
				if (lo(t), (e = Vi) ? (e = hf(e, Ui), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, Vi = null)) : e = null, e === null) throw Gi(t);
				return t.lanes = 536870912, null;
			}
			return hc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (lo(t), a) if (t.flags & 256) t.flags &= -257, t = gc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (sc || aa(e, t, n, !1), a = (n & e.childLanes) !== 0, sc || a) {
				if (r = Kl, r !== null && (s = st(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ui(e, s), wu(r, e, s), oc;
				Iu(), t = gc(e, t, n);
			} else e = o.treeContext, Vi = yf(s.nextSibling), Bi = t, M = !0, Hi = null, Ui = !1, e !== null && zi(t, e), t = hc(t, r), t.flags |= 4096;
			return t;
		}
		return e = _i(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function vc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function yc(e, t, n, r, i) {
		return oa(t), n = Do(e, t, n, r, void 0, i), r = jo(), e !== null && !sc ? (Mo(e, t, i), Nc(e, t, i)) : (M && r && Li(t), t.flags |= 1, cc(e, t, n, i), t.child);
	}
	function bc(e, t, n, r, i, a) {
		return oa(t), t.updateQueue = null, n = ko(t, r, n, i), Oo(e), r = jo(), e !== null && !sc ? (Mo(e, t, a), Nc(e, t, a)) : (M && r && Li(t), t.flags |= 1, cc(e, t, n, a), t.child);
	}
	function xc(e, t, n, r, i) {
		if (oa(t), t.stateNode === null) {
			var a = pi, o = n.contextType;
			typeof o == "object" && o && (a = sa(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = qs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Wa(t), o = n.contextType, a.context = typeof o == "object" && o ? sa(o) : pi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Ks(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && qs.enqueueReplaceState(a, a.state, null), Qa(t, r, a, i), Za(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Xs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = pi, typeof u == "object" && u && (o = sa(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ys(t, a, r, o), Ua = !1;
			var f = t.memoizedState;
			a.state = f, Qa(t, r, a, i), Za(), l = t.memoizedState, s || f !== l || Ua ? (typeof d == "function" && (Ks(t, n, d, r), l = t.memoizedState), (c = Ua || Js(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ga(e, t), o = t.memoizedProps, u = Xs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = pi, typeof l == "object" && l && (c = sa(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ys(t, a, r, c), Ua = !1, f = t.memoizedState, a.state = f, Qa(t, r, a, i), Za();
			var p = t.memoizedState;
			o !== d || f !== p || Ua || e !== null && e.dependencies !== null && N(e.dependencies) ? (typeof s == "function" && (Ks(t, n, s, r), p = t.memoizedState), (u = Ua || Js(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && N(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, vc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Va(t, e.child, null, i), t.child = Va(t, null, n, i)) : cc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Nc(e, t, i), e;
	}
	function Sc(e, t, n, r) {
		return Yi(), t.flags |= 256, cc(e, t, n, r), t.child;
	}
	var Cc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function wc(e) {
		return {
			baseLanes: e,
			cachePool: Ta()
		};
	}
	function Tc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= iu), e;
	}
	function Ec(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (mo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (M) {
				if (a ? co(t) : fo(t), (e = Vi) ? (e = hf(e, Ui), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Mi === null ? null : {
						id: Ni,
						overflow: Pi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = Si(e), n.return = t, t.child = n, Bi = t, Vi = null)) : e = null, e === null) throw Gi(t);
				return _f(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (fo(t), a = t.mode, c = Oc({
				mode: "hidden",
				children: c
			}, a), r = bi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = wc(n), r.childLanes = Tc(e, s, n), t.memoizedState = Cc, pc(null, r)) : (co(t), Dc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (co(t), t.flags &= -257, t = kc(e, t, n)) : t.memoizedState === null ? (fo(t), c = r.fallback, a = t.mode, r = Oc({
				mode: "visible",
				children: r.children
			}, a), c = bi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Va(t, e.child, null, n), r = t.child, r.memoizedState = wc(n), r.childLanes = Tc(e, s, n), t.memoizedState = Cc, t = pc(null, r)) : (fo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (co(t), _f(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Zi({
					value: r,
					source: null,
					stack: null
				}), t = kc(e, t, n);
			} else if (sc || aa(e, t, n, !1), s = (n & e.childLanes) !== 0, sc || s) {
				if (s = Kl, s !== null && (r = st(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ui(e, r), wu(s, e, r), oc;
				gf(c) || Iu(), t = kc(e, t, n);
			} else gf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Vi = yf(c.nextSibling), Bi = t, M = !0, Hi = null, Ui = !1, e !== null && zi(t, e), t = Dc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (fo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = _i(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = bi(c, a, n, null), c.flags |= 2) : c = _i(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, pc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = wc(n) : (a = c.cachePool, a === null ? a = Ta() : (l = pa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Tc(e, s, n), t.memoizedState = Cc, pc(e.child, r)) : (co(t), n = e.child, e = n.sibling, n = _i(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Dc(e, t) {
		return t = Oc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Oc(e, t) {
		return e = hi(22, e, null, t), e.lanes = 0, e;
	}
	function kc(e, t, n) {
		return Va(t, e.child, null, n), e = Dc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ac(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), ra(e.return, t, n);
	}
	function jc(e, t, n, r, i, a) {
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
	function Mc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = mo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, me(mo, o), cc(e, t, r, n), r = M ? ki : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ac(e, n, t);
			else if (e.tag === 19) Ac(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && L(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), jc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && L(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				jc(t, !0, n, null, a, r);
				break;
			case "together":
				jc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Nc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), tu |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (aa(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = _i(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = _i(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Pc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && N(e))) : !0;
	}
	function Fc(e, t, n) {
		switch (t.tag) {
			case 3:
				ve(t, t.stateNode.containerInfo), ta(t, pa, e.memoizedState.cache), Yi();
				break;
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve(t, t.stateNode.containerInfo);
				break;
			case 10:
				ta(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, lo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (co(t), e = Nc(e, t, n), e === null ? null : e.sibling) : Ec(e, t, n) : (co(t), t.flags |= 128, null);
				co(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (aa(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Mc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), me(mo, mo.current), r) break;
				return null;
			case 22: return t.lanes = 0, fc(e, t, n, t.pendingProps);
			case 24: ta(t, pa, e.memoizedState.cache);
		}
		return Nc(e, t, n);
	}
	function Ic(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) sc = !0;
		else {
			if (!Pc(e, n) && !(t.flags & 128)) return sc = !1, Fc(e, t, n);
			sc = !!(e.flags & 131072);
		}
		else sc = !1, M && t.flags & 1048576 && Ii(t, ki, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ja(t.elementType), t.type = e, typeof e == "function") gi(e) ? (r = Xs(e, r), t.tag = 1, t = xc(null, t, e, r, n)) : (t.tag = 0, t = yc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === S) {
								t.tag = 11, t = lc(null, t, e, r, n);
								break a;
							} else if (a === ie) {
								t.tag = 14, t = uc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ce(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return yc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Xs(r, t.pendingProps), xc(e, t, r, a, n);
			case 3:
				a: {
					if (ve(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ga(e, t), Qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ta(t, pa, r), r !== o.cache && ia(t, [pa], n, !0), Za(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = Sc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = Ti(Error(i(424)), t), Zi(a), t = Sc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Vi = yf(e.firstChild), Bi = t, M = !0, Hi = null, Ui = !0, n = Ha(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Yi(), r === a) {
							t = Nc(e, t, n);
							break a;
						}
						cc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return vc(e, t), e === null ? (n = zf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : M || (n = t.type, e = t.pendingProps, r = Zd(k.current).createElement(n), r[pt] = t, r[mt] = e, Gd(r, n, e), Et(r), t.stateNode = r) : t.memoizedState = zf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return be(t), e === null && M && (r = t.stateNode = Cf(t.type, t.pendingProps, k.current), Bi = t, Ui = !0, a = Vi, lf(t.type) ? (bf = a, Vi = yf(r.firstChild)) : Vi = a), cc(e, t, t.pendingProps.children, n), vc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && M && ((a = r = Vi) && (r = pf(r, t.type, t.pendingProps, Ui), r === null ? a = !1 : (t.stateNode = r, Bi = t, Vi = yf(r.firstChild), Ui = !1, a = !0)), a || Gi(t)), be(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, ef(a, o) ? r = null : s !== null && ef(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Do(e, t, Ao, null, null, n), sp._currentValue = a), vc(e, t), cc(e, t, r, n), t.child;
			case 6: return e === null && M && ((e = n = Vi) && (n = mf(n, t.pendingProps, Ui), n === null ? e = !1 : (t.stateNode = n, Bi = t, Vi = null, e = !0)), e || Gi(t)), null;
			case 13: return Ec(e, t, n);
			case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Va(t, null, r, n) : cc(e, t, r, n), t.child;
			case 11: return lc(e, t, t.type, t.pendingProps, n);
			case 7: return cc(e, t, t.pendingProps, n), t.child;
			case 8: return cc(e, t, t.pendingProps.children, n), t.child;
			case 12: return cc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, ta(t, t.type, r.value), cc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, oa(t), a = sa(a), r = r(a), t.flags |= 1, cc(e, t, r, n), t.child;
			case 14: return uc(e, t, t.type, t.pendingProps, n);
			case 15: return dc(e, t, t.type, t.pendingProps, n);
			case 19: return Mc(e, t, n);
			case 31: return _c(e, t, n);
			case 22: return fc(e, t, n, t.pendingProps);
			case 24: return oa(t), r = sa(pa), e === null ? (a = Ca(), a === null && (a = Kl, o = ma(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Wa(t), ta(t, pa, a)) : ((e.lanes & n) !== 0 && (Ga(e, t), Qa(t, null, null, n), Za()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ta(t, pa, r), r !== a.cache && ia(t, [pa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ta(t, pa, r))), cc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Lc(e) {
		e.flags |= 4;
	}
	function Rc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Nu()) e.flags |= 8192;
			else throw Ma = I, Da;
		} else e.flags &= -16777217;
	}
	function zc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !$f(t)) if (Nu()) e.flags |= 8192;
		else throw Ma = I, Da;
	}
	function Bc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, au |= t);
	}
	function Vc(e, t) {
		if (!M) switch (e.tailMode) {
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
	function Hc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Uc(e, t, n) {
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
			case 14: return Hc(t), null;
			case 1: return Hc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), na(pa), ye(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ji(t) ? Lc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Xi())), Hc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Lc(t), o === null ? (Hc(t), Rc(t, a, null, r, n)) : (Hc(t), zc(t, o))) : o ? o === e.memoizedState ? (Hc(t), t.flags &= -16777217) : (Lc(t), Hc(t), zc(t, o)) : (e = e.memoizedProps, e !== r && Lc(t), Hc(t), Rc(t, a, e, r, n)), null;
			case 27:
				if (A(t), n = k.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Lc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Hc(t), null;
					}
					e = he.current, Ji(t) ? Ki(t, e) : (e = Cf(a, r, n), t.stateNode = e, Lc(t));
				}
				return Hc(t), null;
			case 5:
				if (A(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Lc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Hc(t), null;
					}
					if (o = he.current, Ji(t)) Ki(t, o);
					else {
						var s = Zd(k.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[pt] = t, o[mt] = r;
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
						a: switch (Gd(o, a, r), a) {
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
						r && Lc(t);
					}
				}
				return Hc(t), Rc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Lc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = k.current, Ji(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Bi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[pt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Hd(e.nodeValue, n)), e || Gi(t, !0);
					} else e = Zd(e).createTextNode(r), e[pt] = t, t.stateNode = e;
				}
				return Hc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Ji(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[pt] = t;
						} else Yi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Hc(t), e = !1;
					} else n = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (po(t), t) : (po(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Hc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Ji(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[pt] = t;
						} else Yi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Hc(t), a = !1;
					} else a = Xi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (po(t), t) : (po(t), null);
				}
				return po(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Bc(t, t.updateQueue), Hc(t), null);
			case 4: return ye(), e === null && Md(t.stateNode.containerInfo), Hc(t), null;
			case 10: return na(t.type), Hc(t), null;
			case 19:
				if (pe(mo), r = t.memoizedState, r === null) return Hc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Vc(r, !1);
				else {
					if (eu !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = L(e), o !== null) {
							for (t.flags |= 128, Vc(r, !1), e = o.updateQueue, t.updateQueue = e, Bc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) vi(n, e), n = n.sibling;
							return me(mo, mo.current & 1 | 2), M && Fi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Me() > uu && (t.flags |= 128, a = !0, Vc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = L(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Bc(t, e), Vc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !M) return Hc(t), null;
					} else 2 * Me() - r.renderingStartTime > uu && n !== 536870912 && (t.flags |= 128, a = !0, Vc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Hc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, n = mo.current, me(mo, a ? n & 1 | 2 : n & 1), M && Fi(t, r.treeForkCount), e);
			case 22:
			case 23: return po(t), ao(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Hc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Hc(t), n = t.updateQueue, n !== null && Bc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && pe(Sa), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), na(pa), Hc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Wc(e, t) {
		switch (Ri(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return na(pa), ye(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return A(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (po(t), t.alternate === null) throw Error(i(340));
					Yi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (po(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Yi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return pe(mo), null;
			case 4: return ye(), null;
			case 10: return na(t.type), null;
			case 22:
			case 23: return po(t), ao(), e !== null && pe(Sa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return na(pa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Gc(e, t) {
		switch (Ri(t), t.tag) {
			case 3:
				na(pa), ye();
				break;
			case 26:
			case 27:
			case 5:
				A(t);
				break;
			case 4:
				ye();
				break;
			case 31:
				t.memoizedState !== null && po(t);
				break;
			case 13:
				po(t);
				break;
			case 19:
				pe(mo);
				break;
			case 10:
				na(t.type);
				break;
			case 22:
			case 23:
				po(t), ao(), e !== null && pe(Sa);
				break;
			case 24: na(pa);
		}
	}
	function Kc(e, t) {
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
			ed(t, t.return, e);
		}
	}
	function qc(e, t, n) {
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
								ed(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			ed(t, t.return, e);
		}
	}
	function Jc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				eo(t, n);
			} catch (t) {
				ed(e, e.return, t);
			}
		}
	}
	function Yc(e, t, n) {
		n.props = Xs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			ed(e, t, n);
		}
	}
	function Xc(e, t) {
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
			ed(e, t, n);
		}
	}
	function Zc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			ed(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			ed(e, t, n);
		}
		else n.current = null;
	}
	function Qc(e) {
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
			ed(e, e.return, t);
		}
	}
	function $c(e, t, n) {
		try {
			var r = e.stateNode;
			Kd(r, e.type, n, t), r[mt] = t;
		} catch (t) {
			ed(e, e.return, t);
		}
	}
	function el(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && lf(e.type) || e.tag === 4;
	}
	function tl(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || el(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && lf(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function nl(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = sn));
		else if (r !== 4 && (r === 27 && lf(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (nl(e, t, n), e = e.sibling; e !== null;) nl(e, t, n), e = e.sibling;
	}
	function rl(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && lf(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (rl(e, t, n), e = e.sibling; e !== null;) rl(e, t, n), e = e.sibling;
	}
	function il(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Gd(t, r, n), t[pt] = e, t[mt] = n;
		} catch (t) {
			ed(e, e.return, t);
		}
	}
	var al = !1, ol = !1, sl = !1, cl = typeof WeakSet == "function" ? WeakSet : Set, ll = null;
	function ul(e, t) {
		if (e = e.containerInfo, Yd = gp, e = Pr(e), Fr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
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
		for (Xd = {
			focusedElem: e,
			selectionRange: n
		}, gp = !1, ll = t; ll !== null;) if (t = ll, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, ll = e;
		else for (; ll !== null;) {
			switch (t = ll, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Xs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							ed(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ff(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ff(e);
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
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, ll = e;
				break;
			}
			ll = t.return;
		}
	}
	function dl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				El(e, n), r & 4 && Kc(5, n);
				break;
			case 1:
				if (El(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					ed(n, n.return, e);
				}
				else {
					var i = Xs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						ed(n, n.return, e);
					}
				}
				r & 64 && Jc(n), r & 512 && Xc(n, n.return);
				break;
			case 3:
				if (El(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
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
						ed(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && il(n);
			case 26:
			case 5:
				El(e, n), t === null && r & 4 && Qc(n), r & 512 && Xc(n, n.return);
				break;
			case 12:
				El(e, n);
				break;
			case 31:
				El(e, n), r & 4 && _l(e, n);
				break;
			case 13:
				El(e, n), r & 4 && vl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = id.bind(null, n), vf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || al, !r) {
					t = t !== null && t.memoizedState !== null || ol, i = al;
					var a = ol;
					al = r, (ol = t) && !a ? Ol(e, n, (n.subtreeFlags & 8772) != 0) : El(e, n), al = i, ol = a;
				}
				break;
			case 30: break;
			default: El(e, n);
		}
	}
	function fl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, fl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && xt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var pl = null, ml = !1;
	function hl(e, t, n) {
		for (n = n.child; n !== null;) gl(e, t, n), n = n.sibling;
	}
	function gl(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				ol || Zc(n, t), hl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				ol || Zc(n, t);
				var r = pl, i = ml;
				lf(n.type) && (pl = n.stateNode, ml = !1), hl(e, t, n), wf(n.stateNode), pl = r, ml = i;
				break;
			case 5: ol || Zc(n, t);
			case 6:
				if (r = pl, i = ml, pl = null, hl(e, t, n), pl = r, ml = i, pl !== null) if (ml) try {
					(pl.nodeType === 9 ? pl.body : pl.nodeName === "HTML" ? pl.ownerDocument.body : pl).removeChild(n.stateNode);
				} catch (e) {
					ed(n, t, e);
				}
				else try {
					pl.removeChild(n.stateNode);
				} catch (e) {
					ed(n, t, e);
				}
				break;
			case 18:
				pl !== null && (ml ? (e = pl, uf(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hp(e)) : uf(pl, n.stateNode));
				break;
			case 4:
				r = pl, i = ml, pl = n.stateNode.containerInfo, ml = !0, hl(e, t, n), pl = r, ml = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				qc(2, n, t), ol || qc(4, n, t), hl(e, t, n);
				break;
			case 1:
				ol || (Zc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Yc(n, t, r)), hl(e, t, n);
				break;
			case 21:
				hl(e, t, n);
				break;
			case 22:
				ol = (r = ol) || n.memoizedState !== null, hl(e, t, n), ol = r;
				break;
			default: hl(e, t, n);
		}
	}
	function _l(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hp(e);
			} catch (e) {
				ed(t, t.return, e);
			}
		}
	}
	function vl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hp(e);
		} catch (e) {
			ed(t, t.return, e);
		}
	}
	function yl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new cl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new cl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function bl(e, t) {
		var n = yl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = ad.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function xl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (lf(c.type)) {
							pl = c.stateNode, ml = !1;
							break a;
						}
						break;
					case 5:
						pl = c.stateNode, ml = !1;
						break a;
					case 3:
					case 4:
						pl = c.stateNode.containerInfo, ml = !0;
						break a;
				}
				c = c.return;
			}
			if (pl === null) throw Error(i(160));
			gl(o, s, a), pl = null, ml = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Cl(t, e), t = t.sibling;
	}
	var Sl = null;
	function Cl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				xl(t, e), wl(e), r & 4 && (qc(3, e, e.return), Kc(3, e), qc(5, e, e.return));
				break;
			case 1:
				xl(t, e), wl(e), r & 512 && (ol || n === null || Zc(n, n.return)), r & 64 && al && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = Sl;
				if (xl(t, e), wl(e), r & 512 && (ol || n === null || Zc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[bt] || o[pt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Gd(o, r, n), o[pt] = e, Et(o), r = o;
									break a;
								case "link":
									var s = Xf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Gd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Xf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Gd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[pt] = e, Et(o), r = o;
						}
						e.stateNode = r;
					} else Zf(a, e.type, e.stateNode);
					else e.stateNode = Gf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && $c(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Zf(a, e.type, e.stateNode) : Gf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				xl(t, e), wl(e), r & 512 && (ol || n === null || Zc(n, n.return)), n !== null && r & 4 && $c(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (xl(t, e), wl(e), r & 512 && (ol || n === null || Zc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Qt(a, "");
					} catch (t) {
						ed(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, $c(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (sl = !0);
				break;
			case 6:
				if (xl(t, e), wl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						ed(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Yf = null, a = Sl, Sl = U(t.containerInfo), xl(t, e), Sl = a, wl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Hp(t.containerInfo);
				} catch (t) {
					ed(e, e.return, t);
				}
				sl && (sl = !1, Tl(e));
				break;
			case 4:
				r = Sl, Sl = U(e.stateNode.containerInfo), xl(t, e), wl(e), Sl = r;
				break;
			case 12:
				xl(t, e), wl(e);
				break;
			case 31:
				xl(t, e), wl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bl(e, r)));
				break;
			case 13:
				xl(t, e), wl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (cu = Me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = al, d = ol;
				if (al = u || a, ol = d || l, xl(t, e), ol = d, al = u, wl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || al || ol || Dl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								ed(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								ed(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? df(m, !0) : df(l.stateNode, !1);
							} catch (e) {
								ed(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, bl(e, n))));
				break;
			case 19:
				xl(t, e), wl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: xl(t, e), wl(e);
		}
	}
	function wl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (el(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						rl(e, tl(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Qt(o, ""), n.flags &= -33), rl(e, tl(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						nl(e, tl(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				ed(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Tl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Tl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function El(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) dl(e, t.alternate, t), t = t.sibling;
	}
	function Dl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					qc(4, t, t.return), Dl(t);
					break;
				case 1:
					Zc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Yc(t, t.return, n), Dl(t);
					break;
				case 27: wf(t.stateNode);
				case 26:
				case 5:
					Zc(t, t.return), Dl(t);
					break;
				case 22:
					t.memoizedState === null && Dl(t);
					break;
				case 30:
					Dl(t);
					break;
				default: Dl(t);
			}
			e = e.sibling;
		}
	}
	function Ol(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Ol(i, a, n), Kc(4, a);
					break;
				case 1:
					if (Ol(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						ed(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) $a(c[i], s);
						} catch (e) {
							ed(r, r.return, e);
						}
					}
					n && o & 64 && Jc(a), Xc(a, a.return);
					break;
				case 27: il(a);
				case 26:
				case 5:
					Ol(i, a, n), n && r === null && o & 4 && Qc(a), Xc(a, a.return);
					break;
				case 12:
					Ol(i, a, n);
					break;
				case 31:
					Ol(i, a, n), n && o & 4 && _l(i, a);
					break;
				case 13:
					Ol(i, a, n), n && o & 4 && vl(i, a);
					break;
				case 22:
					a.memoizedState === null && Ol(i, a, n), Xc(a, a.return);
					break;
				case 30: break;
				default: Ol(i, a, n);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ha(n));
	}
	function Al(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e));
	}
	function jl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Ml(e, t, n, r), t = t.sibling;
	}
	function Ml(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				jl(e, t, n, r), i & 2048 && Kc(9, t);
				break;
			case 1:
				jl(e, t, n, r);
				break;
			case 3:
				jl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ha(e)));
				break;
			case 12:
				if (i & 2048) {
					jl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						ed(t, t.return, e);
					}
				} else jl(e, t, n, r);
				break;
			case 31:
				jl(e, t, n, r);
				break;
			case 13:
				jl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? jl(e, t, n, r) : (a._visibility |= 2, Nl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? jl(e, t, n, r) : Pl(e, t), i & 2048 && kl(o, t);
				break;
			case 24:
				jl(e, t, n, r), i & 2048 && Al(t.alternate, t);
				break;
			default: jl(e, t, n, r);
		}
	}
	function Nl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Nl(a, o, s, c, i), Kc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Nl(a, o, s, c, i)) : u._visibility & 2 ? Nl(a, o, s, c, i) : Pl(a, o), i && l & 2048 && kl(o.alternate, o);
					break;
				case 24:
					Nl(a, o, s, c, i), i && l & 2048 && Al(o.alternate, o);
					break;
				default: Nl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Pl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Pl(n, r), i & 2048 && kl(r.alternate, r);
					break;
				case 24:
					Pl(n, r), i & 2048 && Al(r.alternate, r);
					break;
				default: Pl(n, r);
			}
			t = t.sibling;
		}
	}
	var Fl = 8192;
	function Il(e, t, n) {
		if (e.subtreeFlags & Fl) for (e = e.child; e !== null;) Ll(e, t, n), e = e.sibling;
	}
	function Ll(e, t, n) {
		switch (e.tag) {
			case 26:
				Il(e, t, n), e.flags & Fl && e.memoizedState !== null && ep(n, Sl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Il(e, t, n);
				break;
			case 3:
			case 4:
				var r = Sl;
				Sl = U(e.stateNode.containerInfo), Il(e, t, n), Sl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Fl, Fl = 16777216, Il(e, t, n), Fl = r) : Il(e, t, n));
				break;
			default: Il(e, t, n);
		}
	}
	function Rl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function zl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ll = r, Hl(r, e);
			}
			Rl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Bl(e), e = e.sibling;
	}
	function Bl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				zl(e), e.flags & 2048 && qc(9, e, e.return);
				break;
			case 3:
				zl(e);
				break;
			case 12:
				zl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Vl(e)) : zl(e);
				break;
			default: zl(e);
		}
	}
	function Vl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				ll = r, Hl(r, e);
			}
			Rl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					qc(8, t, t.return), Vl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Vl(t));
					break;
				default: Vl(t);
			}
			e = e.sibling;
		}
	}
	function Hl(e, t) {
		for (; ll !== null;) {
			var n = ll;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					qc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ha(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, ll = r;
			else a: for (n = e; ll !== null;) {
				r = ll;
				var i = r.sibling, a = r.return;
				if (fl(r), r === n) {
					ll = null;
					break a;
				}
				if (i !== null) {
					i.return = a, ll = i;
					break a;
				}
				ll = a;
			}
		}
	}
	var Ul = {
		getCacheForType: function(e) {
			var t = sa(pa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return sa(pa).controller.signal;
		}
	}, Wl = typeof WeakMap == "function" ? WeakMap : Map, Gl = 0, Kl = null, B = null, ql = 0, Jl = 0, Yl = null, Xl = !1, Zl = !1, Ql = !1, $l = 0, eu = 0, tu = 0, nu = 0, ru = 0, iu = 0, au = 0, V = null, ou = null, su = !1, cu = 0, lu = 0, uu = Infinity, du = null, fu = null, pu = 0, mu = null, hu = null, gu = 0, _u = 0, vu = null, yu = null, bu = 0, xu = null;
	function Su() {
		return Gl & 2 && ql !== 0 ? ql & -ql : E.T === null ? ut() : xd();
	}
	function Cu() {
		if (iu === 0) if (!(ql & 536870912) || M) {
			var e = Ye;
			Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), iu = e;
		} else iu = 536870912;
		return e = oo.current, e !== null && (e.flags |= 32), iu;
	}
	function wu(e, t, n) {
		(e === Kl && (Jl === 2 || Jl === 9) || e.cancelPendingCommit !== null) && (ju(e, 0), Ou(e, ql, iu, !1)), rt(e, n), (!(Gl & 2) || e !== Kl) && (e === Kl && (!(Gl & 2) && (nu |= n), eu === 4 && Ou(e, ql, iu, !1)), pd(e));
	}
	function Tu(e, t, n) {
		if (Gl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? zu(e, t) : Lu(e, t, !0), o = r;
		do {
			if (a === 0) {
				Zl && !r && Ou(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !Du(n)) {
					a = Lu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = V;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (ju(c, s).flags |= 256), s = Lu(c, s, !1), s !== 2) {
								if (Ql && !l) {
									c.errorRecoveryDisabledLanes |= o, nu |= o, a = 4;
									break a;
								}
								o = ou, ou = a, o !== null && (ou === null ? ou = o : ou.push.apply(ou, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					ju(e, 0), Ou(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							Ou(r, t, iu, !Xl);
							break a;
						case 2:
							ou = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = cu + 300 - Me(), 10 < a)) {
						if (Ou(r, t, iu, !Xl), Qe(r, 0, !0) !== 0) break a;
						gu = t, r.timeoutHandle = rf(Eu.bind(null, r, n, ou, du, su, t, iu, nu, au, Xl, o, "Throttled", -0, 0), a);
						break a;
					}
					Eu(r, n, ou, du, su, t, iu, nu, au, Xl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		pd(e);
	}
	function Eu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: sn
			}, Ll(t, a, d);
			var m = (a & 62914560) === a ? cu - Me() : (a & 4194048) === a ? lu - Me() : 0;
			if (m = np(d, m), m !== null) {
				gu = a, e.cancelPendingCommit = m(Ku.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), Ou(e, a, o, !l);
				return;
			}
		}
		Ku(e, t, a, n, r, i, o, s, c);
	}
	function Du(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!kr(a(), i)) return !1;
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
	function Ou(e, t, n, r) {
		t &= ~ru, t &= ~nu, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function ku() {
		return Gl & 6 ? !0 : (md(0, !1), !1);
	}
	function Au() {
		if (B !== null) {
			if (Jl === 0) var e = B.return;
			else e = B, ea = $i = null, No(e), Fa = null, Ia = 0, e = B;
			for (; e !== null;) Gc(e.alternate, e), e = e.return;
			B = null;
		}
	}
	function ju(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, af(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), gu = 0, Au(), Kl = e, B = n = _i(e.current, null), ql = t, Jl = 0, Yl = null, Xl = !1, Zl = $e(e, t), Ql = !1, au = iu = ru = nu = tu = eu = 0, ou = V = null, su = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - We(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return $l = t, si(), n;
	}
	function Mu(e, t) {
		R = null, E.H = Hs, t === Ea || t === Oa ? (t = Na(), Jl = 3) : t === Da ? (t = Na(), Jl = 4) : Jl = t === oc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Yl = t, B === null && (eu = 1, ec(e, Ti(t, e.current)));
	}
	function Nu() {
		var e = oo.current;
		return e === null ? !0 : (ql & 4194048) === ql ? so === null : (ql & 62914560) === ql || ql & 536870912 ? e === so : !1;
	}
	function Pu() {
		var e = E.H;
		return E.H = Hs, e === null ? Hs : e;
	}
	function Fu() {
		var e = E.A;
		return E.A = Ul, e;
	}
	function Iu() {
		eu = 4, Xl || (ql & 4194048) !== ql && oo.current !== null || (Zl = !0), !(tu & 134217727) && !(nu & 134217727) || Kl === null || Ou(Kl, ql, iu, !1);
	}
	function Lu(e, t, n) {
		var r = Gl;
		Gl |= 2;
		var i = Pu(), a = Fu();
		(Kl !== e || ql !== t) && (du = null, ju(e, t)), t = !1;
		var o = eu;
		a: do
			try {
				if (Jl !== 0 && B !== null) {
					var s = B, c = Yl;
					switch (Jl) {
						case 8:
							Au(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							oo.current === null && (t = !0);
							var l = Jl;
							if (Jl = 0, Yl = null, Uu(e, s, c, l), n && Zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Jl, Jl = 0, Yl = null, Uu(e, s, c, l);
					}
				}
				Ru(), o = eu;
				break;
			} catch (t) {
				Mu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, ea = $i = null, Gl = r, E.H = i, E.A = a, B === null && (Kl = null, ql = 0, si()), o;
	}
	function Ru() {
		for (; B !== null;) Vu(B);
	}
	function zu(e, t) {
		var n = Gl;
		Gl |= 2;
		var r = Pu(), a = Fu();
		Kl !== e || ql !== t ? (du = null, uu = Me() + 500, ju(e, t)) : Zl = $e(e, t);
		a: do
			try {
				if (Jl !== 0 && B !== null) {
					t = B;
					var o = Yl;
					b: switch (Jl) {
						case 1:
							Jl = 0, Yl = null, Uu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ka(o)) {
								Jl = 0, Yl = null, Hu(t);
								break;
							}
							t = function() {
								Jl !== 2 && Jl !== 9 || Kl !== e || (Jl = 7), pd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Jl = 7;
							break a;
						case 4:
							Jl = 5;
							break a;
						case 7:
							ka(o) ? (Jl = 0, Yl = null, Hu(t)) : (Jl = 0, Yl = null, Uu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (B.tag) {
								case 26: s = B.memoizedState;
								case 5:
								case 27:
									var c = B;
									if (s ? $f(s) : c.stateNode.complete) {
										Jl = 0, Yl = null;
										var l = c.sibling;
										if (l !== null) B = l;
										else {
											var u = c.return;
											u === null ? B = null : (B = u, Wu(u));
										}
										break b;
									}
							}
							Jl = 0, Yl = null, Uu(e, t, o, 5);
							break;
						case 6:
							Jl = 0, Yl = null, Uu(e, t, o, 6);
							break;
						case 8:
							Au(), eu = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Bu();
				break;
			} catch (t) {
				Mu(e, t);
			}
		while (1);
		return ea = $i = null, E.H = r, E.A = a, Gl = n, B === null ? (Kl = null, ql = 0, si(), eu) : 0;
	}
	function Bu() {
		for (; B !== null && !Ae();) Vu(B);
	}
	function Vu(e) {
		var t = Ic(e.alternate, e, $l);
		e.memoizedProps = e.pendingProps, t === null ? Wu(e) : B = t;
	}
	function Hu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = bc(n, t, t.pendingProps, t.type, void 0, ql);
				break;
			case 11:
				t = bc(n, t, t.pendingProps, t.type.render, t.ref, ql);
				break;
			case 5: No(t);
			default: Gc(n, t), t = B = vi(t, $l), t = Ic(n, t, $l);
		}
		e.memoizedProps = e.pendingProps, t === null ? Wu(e) : B = t;
	}
	function Uu(e, t, n, r) {
		ea = $i = null, No(t), Fa = null, Ia = 0;
		var i = t.return;
		try {
			if (ac(e, i, t, n, ql)) {
				eu = 1, ec(e, Ti(n, e.current)), B = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw B = i, t;
			eu = 1, ec(e, Ti(n, e.current)), B = null;
			return;
		}
		t.flags & 32768 ? (M || r === 1 ? e = !0 : Zl || ql & 536870912 ? e = !1 : (Xl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = oo.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Gu(t, e)) : Wu(t);
	}
	function Wu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Gu(t, Xl);
				return;
			}
			e = t.return;
			var n = Uc(t.alternate, t, $l);
			if (n !== null) {
				B = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				B = t;
				return;
			}
			B = t = e;
		} while (t !== null);
		eu === 0 && (eu = 5);
	}
	function Gu(e, t) {
		do {
			var n = Wc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, B = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				B = e;
				return;
			}
			B = e = n;
		} while (e !== null);
		eu = 6, B = null;
	}
	function Ku(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Zu();
		while (pu !== 0);
		if (Gl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= oi, it(e, n, o, s, c, l), e === Kl && (B = Kl = null, ql = 0), hu = t, mu = e, gu = n, _u = o, vu = a, yu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, od(Ie, function() {
				return Qu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, a = D.p, D.p = 2, s = Gl, Gl |= 4;
				try {
					ul(e, t, n);
				} finally {
					Gl = s, D.p = a, E.T = r;
				}
			}
			pu = 1, qu(), Ju(), Yu();
		}
	}
	function qu() {
		if (pu === 1) {
			pu = 0;
			var e = mu, t = hu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Gl;
				Gl |= 4;
				try {
					Cl(t, e);
					var a = Xd, o = Pr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Nr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Fr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Mr(s, h), v = Mr(s, g);
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
					gp = !!Yd, Xd = Yd = null;
				} finally {
					Gl = i, D.p = r, E.T = n;
				}
			}
			e.current = t, pu = 2;
		}
	}
	function Ju() {
		if (pu === 2) {
			pu = 0;
			var e = mu, t = hu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Gl;
				Gl |= 4;
				try {
					dl(e, t.alternate, t);
				} finally {
					Gl = i, D.p = r, E.T = n;
				}
			}
			pu = 3;
		}
	}
	function Yu() {
		if (pu === 4 || pu === 3) {
			pu = 0, je();
			var e = mu, t = hu, n = gu, r = yu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? pu = 5 : (pu = 0, hu = mu = null, Xu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (fu = null), lt(n), t = t.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, t, void 0, (t.current.flags & 128) == 128);
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
			gu & 3 && Zu(), pd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === xu ? bu++ : (bu = 0, xu = e) : bu = 0, md(0, !1);
		}
	}
	function Xu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ha(t)));
	}
	function Zu() {
		return qu(), Ju(), Yu(), Qu();
	}
	function Qu() {
		if (pu !== 5) return !1;
		var e = mu, t = _u;
		_u = 0;
		var n = lt(gu), r = E.T, a = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = vu, vu = null;
			var o = mu, s = gu;
			if (pu = 0, hu = mu = null, gu = 0, Gl & 6) throw Error(i(331));
			var c = Gl;
			if (Gl |= 4, Bl(o.current), Ml(o, o.current, s, n), Gl = c, md(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			D.p = a, E.T = r, Xu(e, t);
		}
	}
	function $u(e, t, n) {
		t = Ti(n, t), t = nc(e.stateNode, t, 2), e = qa(e, t, 2), e !== null && (rt(e, 2), pd(e));
	}
	function ed(e, t, n) {
		if (e.tag === 3) $u(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				$u(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (fu === null || !fu.has(r))) {
					e = Ti(n, e), n = rc(2), r = qa(t, n, 2), r !== null && (ic(n, r, t, e), rt(r, 2), pd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function td(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Wl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ql = !0, i.add(n), e = nd.bind(null, e, t, n), t.then(e, e));
	}
	function nd(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Kl === e && (ql & n) === n && (eu === 4 || eu === 3 && (ql & 62914560) === ql && 300 > Me() - cu ? !(Gl & 2) && ju(e, 0) : ru |= n, au === ql && (au = 0)), pd(e);
	}
	function rd(e, t) {
		t === 0 && (t = tt()), e = ui(e, t), e !== null && (rt(e, t), pd(e));
	}
	function id(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), rd(e, n);
	}
	function ad(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), rd(e, n);
	}
	function od(e, t) {
		return Oe(e, t);
	}
	var sd = null, cd = null, ld = !1, ud = !1, dd = !1, fd = 0;
	function pd(e) {
		e !== cd && e.next === null && (cd === null ? sd = cd = e : cd = cd.next = e), ud = !0, ld || (ld = !0, bd());
	}
	function md(e, t) {
		if (!dd && ud) {
			dd = !0;
			do
				for (var n = !1, r = sd; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, yd(r, a));
					} else a = ql, a = Qe(r, r === Kl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, yd(r, a));
					r = r.next;
				}
			while (n);
			dd = !1;
		}
	}
	function hd() {
		gd();
	}
	function gd() {
		ud = ld = !1;
		var e = 0;
		fd !== 0 && nf() && (e = fd);
		for (var t = Me(), n = null, r = sd; r !== null;) {
			var i = r.next, a = _d(r, t);
			a === 0 ? (r.next = null, n === null ? sd = i : n.next = i, i === null && (cd = n)) : (n = r, (e !== 0 || a & 3) && (ud = !0)), r = i;
		}
		pu !== 0 && pu !== 5 || md(e, !1), fd !== 0 && (fd = 0);
	}
	function _d(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Kl, n = ql, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Jl === 2 || Jl === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ke(r), lt(n)) {
				case 2:
				case 8:
					n = Fe;
					break;
				case 32:
					n = Ie;
					break;
				case 268435456:
					n = Re;
					break;
				default: n = Ie;
			}
			return r = vd.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function vd(e, t) {
		if (pu !== 0 && pu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Zu() && e.callbackNode !== n) return null;
		var r = ql;
		return r = Qe(e, e === Kl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Tu(e, r, t), _d(e, Me()), e.callbackNode != null && e.callbackNode === n ? vd.bind(null, e) : null);
	}
	function yd(e, t) {
		if (Zu()) return null;
		Tu(e, t, !0);
	}
	function bd() {
		sf(function() {
			Gl & 6 ? Oe(Pe, hd) : gd();
		});
	}
	function xd() {
		if (fd === 0) {
			var e = F;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), fd = e;
		}
		return fd;
	}
	function Sd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : on("" + e);
	}
	function Cd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function wd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Sd((i[mt] || null).action), o = r.submitter;
			o && (t = (t = o[mt] || null) ? Sd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new On("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (fd !== 0) {
								var e = o ? Cd(i, o) : new FormData(i);
								Os(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Cd(i, o) : new FormData(i), Os(n, {
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
	for (var Td = 0; Td < ti.length; Td++) {
		var Ed = ti[Td];
		ni(Ed.toLowerCase(), "on" + (Ed[0].toUpperCase() + Ed.slice(1)));
	}
	ni(qr, "onAnimationEnd"), ni(Jr, "onAnimationIteration"), ni(Yr, "onAnimationStart"), ni("dblclick", "onDoubleClick"), ni("focusin", "onFocus"), ni("focusout", "onBlur"), ni(Xr, "onTransitionRun"), ni(Zr, "onTransitionStart"), ni(Qr, "onTransitionCancel"), ni($r, "onTransitionEnd"), At("onMouseEnter", ["mouseout", "mouseover"]), At("onMouseLeave", ["mouseout", "mouseover"]), At("onPointerEnter", ["pointerout", "pointerover"]), At("onPointerLeave", ["pointerout", "pointerover"]), kt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), kt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), kt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), kt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), kt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Dd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Od = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dd));
	function kd(e, t) {
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
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ri(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function H(e, t) {
		var n = t[gt];
		n === void 0 && (n = t[gt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Nd(t, e, 2, !1), n.add(r));
	}
	function Ad(e, t, n) {
		var r = 0;
		t && (r |= 4), Nd(n, e, r, t);
	}
	var jd = "_reactListening" + Math.random().toString(36).slice(2);
	function Md(e) {
		if (!e[jd]) {
			e[jd] = !0, Dt.forEach(function(t) {
				t !== "selectionchange" && (Od.has(t) || Ad(t, !1, e), Ad(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[jd] || (t[jd] = !0, Ad("selectionchange", !1, t));
		}
	}
	function Nd(e, t, n, r) {
		switch (Cp(t)) {
			case 2:
				var i = _p;
				break;
			case 8:
				i = vp;
				break;
			default: i = yp;
		}
		n = i.bind(null, t, n, e), i = void 0, !_n || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Pd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = St(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		mn(function() {
			var r = a, i = ln(n), s = [];
			a: {
				var c = ei.get(e);
				if (c !== void 0) {
					var l = On, u = e;
					switch (e) {
						case "keypress": if (Cn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Kn;
							break;
						case "focusin":
							u = "focus", l = Ln;
							break;
						case "focusout":
							u = "blur", l = Ln;
							break;
						case "beforeblur":
						case "afterblur":
							l = Ln;
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
							l = Fn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = In;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Jn;
							break;
						case qr:
						case Jr:
						case Yr:
							l = Rn;
							break;
						case $r:
							l = Yn;
							break;
						case "scroll":
						case "scrollend":
							l = An;
							break;
						case "wheel":
							l = Xn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = zn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = qn;
							break;
						case "toggle":
						case "beforetoggle": l = Zn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = hn(m, p), g != null && d.push(Fd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== cn && (u = n.relatedTarget || n.fromElement) && (St(u) || u[ht])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? St(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Fn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = qn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : wt(l), h = u == null ? c : wt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, St(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ld, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Rd(s, c, l, d, !1), u !== null && f !== null && Rd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? wt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = _r;
					else if (dr(c)) if (vr) v = Dr;
					else {
						v = Tr;
						var y = wr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && nn(r.elementType) && (v = _r) : v = Er;
					if (v &&= v(e, r)) {
						fr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Jt(c, "number", c.value);
				}
				switch (y = r ? wt(r) : window, e) {
					case "focusin":
						(dr(y) || y.contentEditable === "true") && (Lr = y, Rr = r, zr = null);
						break;
					case "focusout":
						zr = Rr = Lr = null;
						break;
					case "mousedown":
						Br = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Br = !1, Vr(s, n, i);
						break;
					case "selectionchange": if (Ir) break;
					case "keydown":
					case "keyup": Vr(s, n, i);
				}
				var b;
				if ($n) b: {
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
				else sr ? ar(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (nr && n.locale !== "ko" && (sr || x !== "onCompositionStart" ? x === "onCompositionEnd" && sr && (b = Sn()) : (yn = i, bn = "value" in yn ? yn.value : yn.textContent, sr = !0)), y = Id(r, x), 0 < y.length && (x = new Bn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = or(n), b !== null && (x.data = b)))), (b = tr ? cr(e, n) : lr(e, n)) && (x = Id(r, "onBeforeInput"), 0 < x.length && (y = new Bn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), wd(s, e, r, n, i);
			}
			kd(s, t);
		});
	}
	function Fd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Id(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = hn(e, n), i != null && r.unshift(Fd(e, i, a)), i = hn(e, t), i != null && r.push(Fd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ld(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Rd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = hn(n, a), l != null && o.unshift(Fd(n, l, c))) : i || (l = hn(n, a), l != null && o.push(Fd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var zd = /\r\n?/g, Bd = /\u0000|\uFFFD/g;
	function Vd(e) {
		return (typeof e == "string" ? e : "" + e).replace(zd, "\n").replace(Bd, "");
	}
	function Hd(e, t) {
		return t = Vd(t), Vd(e) === t;
	}
	function Ud(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Qt(e, "" + r);
				break;
			case "className":
				It(e, "class", r);
				break;
			case "tabIndex":
				It(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				It(e, n, r);
				break;
			case "style":
				tn(e, r, o);
				break;
			case "data": if (t !== "object") {
				It(e, "data", r);
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
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Ud(e, t, "name", a.name, a, null), Ud(e, t, "formEncType", a.formEncType, a, null), Ud(e, t, "formMethod", a.formMethod, a, null), Ud(e, t, "formTarget", a.formTarget, a, null)) : (Ud(e, t, "encType", a.encType, a, null), Ud(e, t, "method", a.method, a, null), Ud(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "onScroll":
				r != null && H("scroll", e);
				break;
			case "onScrollEnd":
				r != null && H("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
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
				n = on("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				H("beforetoggle", e), H("toggle", e), Ft(e, "popover", r);
				break;
			case "xlinkActuate":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Lt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Lt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Ft(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = rn.get(n) || n, Ft(e, n, r));
		}
	}
	function Wd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				tn(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Qt(e, r) : (typeof r == "number" || typeof r == "bigint") && Qt(e, "" + r);
				break;
			case "onScroll":
				r != null && H("scroll", e);
				break;
			case "onScrollEnd":
				r != null && H("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Ot.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[mt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Ft(e, n, r);
			}
		}
	}
	function Gd(e, t, n) {
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
				H("error", e), H("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Ud(e, t, o, s, n, null);
					}
				}
				a && Ud(e, t, "srcSet", n.srcSet, n, null), r && Ud(e, t, "src", n.src, n, null);
				return;
			case "input":
				H("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
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
							if (d != null) throw Error(i(137, t));
							break;
						default: Ud(e, t, r, d, n, null);
					}
				}
				qt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in H("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Ud(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Yt(e, !!r, n, !0) : Yt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in H("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Ud(e, t, s, c, n, null);
				}
				Zt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Ud(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				H("beforetoggle", e), H("toggle", e), H("cancel", e), H("close", e);
				break;
			case "iframe":
			case "object":
				H("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Dd.length; r++) H(Dd[r], e);
				break;
			case "image":
				H("error", e), H("load", e);
				break;
			case "details":
				H("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": H("error", e), H("load", e);
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
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Ud(e, t, u, r, n, null);
				}
				return;
			default: if (nn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Wd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Ud(e, t, c, r, n, null));
	}
	function Kd(e, t, n, r) {
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
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Ud(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
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
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Ud(e, t, p, m, r, f);
					}
				}
				Kt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Ud(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Ud(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Yt(e, !!n, n ? [] : "", !1) : Yt(e, !!n, t, !0)) : Yt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Ud(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Ud(e, t, s, a, r, o);
				}
				Xt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Ud(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Ud(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Ud(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Ud(e, t, u, p, r, m);
				}
				return;
			default: if (nn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Wd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Wd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Ud(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Ud(e, t, f, p, r, m);
	}
	function qd(e) {
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
	function Jd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && qd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && qd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Yd = null, Xd = null;
	function Zd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Qd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function $d(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function ef(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var tf = null;
	function nf() {
		var e = window.event;
		return e && e.type === "popstate" ? e === tf ? !1 : (tf = e, !0) : (tf = null, !1);
	}
	var rf = typeof setTimeout == "function" ? setTimeout : void 0, af = typeof clearTimeout == "function" ? clearTimeout : void 0, of = typeof Promise == "function" ? Promise : void 0, sf = typeof queueMicrotask == "function" ? queueMicrotask : of === void 0 ? rf : function(e) {
		return of.resolve(null).then(e).catch(cf);
	};
	function cf(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function lf(e) {
		return e === "head";
	}
	function uf(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Hp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") wf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, wf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[bt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && wf(e.ownerDocument.body);
			n = i;
		} while (n);
		Hp(t);
	}
	function df(e, t) {
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
	function ff(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ff(n), xt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function pf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[bt]) switch (t) {
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
			if (e = yf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function mf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = yf(e.nextSibling), e === null)) return null;
		return e;
	}
	function hf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = yf(e.nextSibling), e === null)) return null;
		return e;
	}
	function gf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function _f(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function vf(e, t) {
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
	function yf(e) {
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
	var bf = null;
	function xf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return yf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function Sf(e) {
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
	function Cf(e, t, n) {
		switch (t = Zd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function wf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		xt(e);
	}
	var Tf = /* @__PURE__ */ new Map(), Ef = /* @__PURE__ */ new Set();
	function U(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var Df = D.d;
	D.d = {
		f: Of,
		r: kf,
		D: Mf,
		C: Nf,
		L: Pf,
		m: Ff,
		X: Lf,
		S: If,
		M: Rf
	};
	function Of() {
		var e = Df.f(), t = ku();
		return e || t;
	}
	function kf(e) {
		var t = Ct(e);
		t !== null && t.tag === 5 && t.type === "form" ? As(t) : Df.r(e);
	}
	var Af = typeof document > "u" ? null : document;
	function jf(e, t, n) {
		var r = Af;
		if (r && typeof t == "string" && t) {
			var i = Gt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), Ef.has(i) || (Ef.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Gd(t, "link", e), Et(t), r.head.appendChild(t)));
		}
	}
	function Mf(e) {
		Df.D(e), jf("dns-prefetch", e, null);
	}
	function Nf(e, t) {
		Df.C(e, t), jf("preconnect", e, t);
	}
	function Pf(e, t, n) {
		Df.L(e, t, n);
		var r = Af;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Gt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Gt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Gt(n.imageSizes) + "\"]")) : i += "[href=\"" + Gt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Bf(e);
					break;
				case "script": a = Wf(e);
			}
			Tf.has(a) || (e = p({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Tf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Vf(a)) || t === "script" && r.querySelector(W(a)) || (t = r.createElement("link"), Gd(t, "link", e), Et(t), r.head.appendChild(t)));
		}
	}
	function Ff(e, t) {
		Df.m(e, t);
		var n = Af;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Gt(r) + "\"][href=\"" + Gt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Wf(e);
			}
			if (!Tf.has(a) && (e = p({
				rel: "modulepreload",
				href: e
			}, t), Tf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(W(a))) return;
				}
				r = n.createElement("link"), Gd(r, "link", e), Et(r), n.head.appendChild(r);
			}
		}
	}
	function If(e, t, n) {
		Df.S(e, t, n);
		var r = Af;
		if (r && e) {
			var i = Tt(r).hoistableStyles, a = Bf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Vf(a))) s.loading = 5;
				else {
					e = p({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Tf.get(a)) && qf(e, n);
					var c = o = r.createElement("link");
					Et(c), Gd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Kf(o, t, r);
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
	function Lf(e, t) {
		Df.X(e, t);
		var n = Af;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Wf(e), a = r.get(i);
			a || (a = n.querySelector(W(i)), a || (e = p({
				src: e,
				async: !0
			}, t), (t = Tf.get(i)) && Jf(e, t), a = n.createElement("script"), Et(a), Gd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Rf(e, t) {
		Df.M(e, t);
		var n = Af;
		if (n && e) {
			var r = Tt(n).hoistableScripts, i = Wf(e), a = r.get(i);
			a || (a = n.querySelector(W(i)), a || (e = p({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Tf.get(i)) && Jf(e, t), a = n.createElement("script"), Et(a), Gd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function zf(e, t, n, r) {
		var a = (a = k.current) ? U(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Bf(n.href), n = Tt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					e = Bf(n.href);
					var o = Tt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Vf(e))) && !o._p && (s.instance = o, s.state.loading = 5), Tf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Tf.set(e, n), o || Uf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Wf(n), n = Tt(a).hoistableScripts, r = n.get(t), r || (r = {
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
			default: throw Error(i(444, e));
		}
	}
	function Bf(e) {
		return "href=\"" + Gt(e) + "\"";
	}
	function Vf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Hf(e) {
		return p({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Uf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Gd(t, "link", n), Et(t), e.head.appendChild(t));
	}
	function Wf(e) {
		return "[src=\"" + Gt(e) + "\"]";
	}
	function W(e) {
		return "script[async]" + e;
	}
	function Gf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Gt(n.href) + "\"]");
				if (r) return t.instance = r, Et(r), r;
				var a = p({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Et(r), Gd(r, "style", a), Kf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Bf(n.href);
				var o = e.querySelector(Vf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Et(o), o;
				r = Hf(n), (a = Tf.get(a)) && qf(r, a), o = (e.ownerDocument || e).createElement("link"), Et(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Gd(o, "link", r), t.state.loading |= 4, Kf(o, n.precedence, e), t.instance = o;
			case "script": return o = Wf(n.src), (a = e.querySelector(W(o))) ? (t.instance = a, Et(a), a) : (r = n, (a = Tf.get(o)) && (r = p({}, n), Jf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Et(a), Gd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Kf(r, n.precedence, e));
		return t.instance;
	}
	function Kf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function qf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Jf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Yf = null;
	function Xf(e, t, n) {
		if (Yf === null) {
			var r = /* @__PURE__ */ new Map(), i = Yf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Yf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[bt] || a[pt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Zf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Qf(e, t, n) {
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
	function $f(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function ep(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Bf(r.href), a = t.querySelector(Vf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = rp.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Et(a);
					return;
				}
				a = t.ownerDocument || t, r = Hf(r), (i = Tf.get(i)) && qf(r, i), a = a.createElement("link"), Et(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Gd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = rp.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var tp = 0;
	function np(e, t) {
		return e.stylesheets && e.count === 0 && ap(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ap(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && tp === 0 && (tp = 62500 * Jd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ap(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > tp ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function rp() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) ap(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var ip = null;
	function ap(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ip = /* @__PURE__ */ new Map(), t.forEach(op, e), ip = null, rp.call(e));
	}
	function op(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ip.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ip.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = rp.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sp = {
		$$typeof: te,
		Provider: null,
		Consumer: null,
		_currentValue: ue,
		_currentValue2: ue,
		_threadCount: 0
	};
	function cp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lp(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new cp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = hi(3, null, null, t), e.current = a, a.stateNode = e, t = ma(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Wa(a), e;
	}
	function up(e) {
		return e ? (e = pi, e) : pi;
	}
	function dp(e, t, n, r, i, a) {
		i = up(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ka(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = qa(e, r, t), n !== null && (wu(n, e, t), Ja(n, e, t));
	}
	function fp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function pp(e, t) {
		fp(e, t), (e = e.alternate) && fp(e, t);
	}
	function mp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ui(e, 67108864);
			t !== null && wu(t, e, 67108864), pp(e, 67108864);
		}
	}
	function hp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Su();
			t = ct(t);
			var n = ui(e, t);
			n !== null && wu(n, e, t), pp(e, t);
		}
	}
	var gp = !0;
	function _p(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, yp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function vp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, yp(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function yp(e, t, n, r) {
		if (gp) {
			var i = bp(r);
			if (i === null) Pd(e, t, r, xp, n), Mp(e, r);
			else if (Pp(i, e, t, n, r)) r.stopPropagation();
			else if (Mp(e, r), t & 4 && -1 < jp.indexOf(e)) {
				for (; i !== null;) {
					var a = Ct(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - We(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									pd(a), !(Gl & 6) && (uu = Me() + 500, md(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ui(a, 2), s !== null && wu(s, a, 2), ku(), pp(a, 2);
					}
					if (a = bp(r), a === null && Pd(e, t, r, xp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Pd(e, t, r, null, n);
		}
	}
	function bp(e) {
		return e = ln(e), Sp(e);
	}
	var xp = null;
	function Sp(e) {
		if (xp = null, e = St(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xp = e, null;
	}
	function Cp(e) {
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
			case "message": switch (Ne()) {
				case Pe: return 2;
				case Fe: return 8;
				case Ie:
				case Le: return 32;
				case Re: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wp = !1, Tp = null, Ep = null, Dp = null, Op = /* @__PURE__ */ new Map(), kp = /* @__PURE__ */ new Map(), Ap = [], jp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Tp = null;
				break;
			case "dragenter":
			case "dragleave":
				Ep = null;
				break;
			case "mouseover":
			case "mouseout":
				Dp = null;
				break;
			case "pointerover":
			case "pointerout":
				Op.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kp.delete(t.pointerId);
		}
	}
	function Np(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Ct(t), t !== null && mp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Pp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Tp = Np(Tp, e, t, n, r, i), !0;
			case "dragenter": return Ep = Np(Ep, e, t, n, r, i), !0;
			case "mouseover": return Dp = Np(Dp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Op.set(a, Np(Op.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kp.set(a, Np(kp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fp(e) {
		var t = St(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							hp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, dt(e.priority, function() {
							hp(n);
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
	function Ip(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				cn = r, n.target.dispatchEvent(r), cn = null;
			} else return t = Ct(n), t !== null && mp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lp(e, t, n) {
		Ip(e) && n.delete(t);
	}
	function Rp() {
		wp = !1, Tp !== null && Ip(Tp) && (Tp = null), Ep !== null && Ip(Ep) && (Ep = null), Dp !== null && Ip(Dp) && (Dp = null), Op.forEach(Lp), kp.forEach(Lp);
	}
	function zp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wp || (wp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rp)));
	}
	var Bp = null;
	function Vp(e) {
		Bp !== e && (Bp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bp === e && (Bp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sp(r || n) === null) continue;
					break;
				}
				var a = Ct(n);
				a !== null && (e.splice(t, 3), t -= 3, Os(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hp(e) {
		function t(t) {
			return zp(t, e);
		}
		Tp !== null && zp(Tp, e), Ep !== null && zp(Ep, e), Dp !== null && zp(Dp, e), Op.forEach(t), kp.forEach(t);
		for (var n = 0; n < Ap.length; n++) {
			var r = Ap[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ap.length && (n = Ap[0], n.blockedOn === null);) Fp(n), n.blockedOn === null && Ap.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[mt] || null;
			if (typeof a == "function") o || Vp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[mt] || null) s = o.formAction;
					else if (Sp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vp(n);
			}
		}
	}
	function Up() {
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
	function Wp(e) {
		this._internalRoot = e;
	}
	Gp.prototype.render = Wp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dp(n, Su(), e, t, null, null);
	}, Gp.prototype.unmount = Wp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dp(e.current, 2, null, e, null, null), ku(), t[ht] = null;
		}
	};
	function Gp(e) {
		this._internalRoot = e;
	}
	Gp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ut();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ap.length && t !== 0 && t < Ap[n].priority; n++);
			Ap.splice(n, 0, e), n === 0 && Fp(e);
		}
	};
	var Kp = n.version;
	if (Kp !== "19.2.4") throw Error(i(527, Kp, "19.2.4"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : f(e), e = e === null ? null : e.stateNode, e;
	};
	var qp = {
		bundleType: 0,
		version: "19.2.4",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.4"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jp.isDisabled && Jp.supportsFiber) try {
			Ve = Jp.inject(qp), He = Jp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Zs, s = Qs, c = $s;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lp(e, 1, !1, null, null, n, r, null, o, s, c, Up), e[ht] = t.current, Md(e), new Wp(t);
	}, e.hydrateRoot = function(e, t, n) {
		if (!a(e)) throw Error(i(299));
		var r = !1, o = "", s = Zs, c = Qs, l = $s, u = null;
		return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (c = n.onCaughtError), n.onRecoverableError !== void 0 && (l = n.onRecoverableError), n.formState !== void 0 && (u = n.formState)), t = lp(e, 1, !0, t, n ?? null, r, o, u, s, c, l, Up), t.context = up(null), n = t.current, r = Su(), r = ct(r), o = Ka(r), o.callback = null, qa(n, o, r), n = r, t.current.lanes = n, rt(t, n), pd(t), e[ht] = t.current, Md(e), new Gp(t);
	}, e.version = "19.2.4";
})), y = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			for (e = e.memoizedState; e !== null && 0 < t;) e = e.next, t--;
			return e;
		}
		function n(e, t, r, i) {
			if (r >= t.length) return i;
			var a = t[r], o = Wf(e) ? e.slice() : U({}, e);
			return o[a] = n(e[a], t, r + 1, i), o;
		}
		function r(e, t, n) {
			if (t.length !== n.length) console.warn("copyWithRename() expects paths of the same length");
			else {
				for (var r = 0; r < n.length - 1; r++) if (t[r] !== n[r]) {
					console.warn("copyWithRename() expects paths to be the same except for the deepest key");
					return;
				}
				return i(e, t, n, 0);
			}
		}
		function i(e, t, n, r) {
			var a = t[r], o = Wf(e) ? e.slice() : U({}, e);
			return r + 1 === t.length ? (o[n[r]] = o[a], Wf(o) ? o.splice(a, 1) : delete o[a]) : o[a] = i(e[a], t, n, r + 1), o;
		}
		function a(e, t, n) {
			var r = t[n], i = Wf(e) ? e.slice() : U({}, e);
			return n + 1 === t.length ? (Wf(i) ? i.splice(r, 1) : delete i[r], i) : (i[r] = a(e[r], t, n + 1), i);
		}
		function o() {
			return !1;
		}
		function s() {
			return null;
		}
		function c() {
			console.error("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks");
		}
		function l() {
			console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
		}
		function u() {}
		function f() {}
		function p(e) {
			var t = [];
			return e.forEach(function(e) {
				t.push(e);
			}), t.sort().join(", ");
		}
		function h(e, t, n, r) {
			return new br(e, t, n, r);
		}
		function g(e, t) {
			e.context === Ng && (Zd(e.current, 2, t, e, null, null), il());
		}
		function v(e, t) {
			if (Pg !== null) {
				var n = t.staleFamilies;
				t = t.updatedFamilies, Al(), yr(e.current, t, n), il();
			}
		}
		function y(e) {
			Pg = e;
		}
		function b(e) {
			return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
		}
		function x(e) {
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
		function ee(e) {
			if (e.tag === 13) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function te(e) {
			if (e.tag === 31) {
				var t = e.memoizedState;
				if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
			}
			return null;
		}
		function S(e) {
			if (x(e) !== e) throw Error("Unable to find node on an unmounted component.");
		}
		function ne(e) {
			var t = e.alternate;
			if (!t) {
				if (t = x(e), t === null) throw Error("Unable to find node on an unmounted component.");
				return t === e ? e : null;
			}
			for (var n = e, r = t;;) {
				var i = n.return;
				if (i === null) break;
				var a = i.alternate;
				if (a === null) {
					if (r = i.return, r !== null) {
						n = r;
						continue;
					}
					break;
				}
				if (i.child === a.child) {
					for (a = i.child; a;) {
						if (a === n) return S(i), e;
						if (a === r) return S(i), t;
						a = a.sibling;
					}
					throw Error("Unable to find node on an unmounted component.");
				}
				if (n.return !== r.return) n = i, r = a;
				else {
					for (var o = !1, s = i.child; s;) {
						if (s === n) {
							o = !0, n = i, r = a;
							break;
						}
						if (s === r) {
							o = !0, r = i, n = a;
							break;
						}
						s = s.sibling;
					}
					if (!o) {
						for (s = a.child; s;) {
							if (s === n) {
								o = !0, n = a, r = i;
								break;
							}
							if (s === r) {
								o = !0, r = a, n = i;
								break;
							}
							s = s.sibling;
						}
						if (!o) throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
					}
				}
				if (n.alternate !== r) throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
			}
			if (n.tag !== 3) throw Error("Unable to find node on an unmounted component.");
			return n.stateNode.current === n ? e : t;
		}
		function re(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e;
			for (e = e.child; e !== null;) {
				if (t = re(e), t !== null) return t;
				e = e.sibling;
			}
			return null;
		}
		function ie(e) {
			return typeof e != "object" || !e ? null : (e = Hf && e[Hf] || e["@@iterator"], typeof e == "function" ? e : null);
		}
		function C(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === Uf ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case Af: return "Fragment";
				case Mf: return "Profiler";
				case jf: return "StrictMode";
				case If: return "Suspense";
				case Lf: return "SuspenseList";
				case Bf: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case kf: return "Portal";
				case Pf: return e.displayName || "Context";
				case Nf: return (e._context.displayName || "Context") + ".Consumer";
				case Ff:
					var t = e.render;
					return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case Rf: return t = e.displayName || null, t === null ? C(e.type) || "Memo" : t;
				case zf:
					t = e._payload, e = e._init;
					try {
						return C(e(t));
					} catch {}
			}
			return null;
		}
		function ae(e) {
			return typeof e.tag == "number" ? w(e) : typeof e.name == "string" ? e.name : null;
		}
		function w(e) {
			var t = e.type;
			switch (e.tag) {
				case 31: return "Activity";
				case 24: return "Cache";
				case 9: return (t._context.displayName || "Context") + ".Consumer";
				case 10: return t.displayName || "Context";
				case 18: return "DehydratedFragment";
				case 11: return e = t.render, e = e.displayName || e.name || "", t.displayName || (e === "" ? "ForwardRef" : "ForwardRef(" + e + ")");
				case 7: return "Fragment";
				case 26:
				case 27:
				case 5: return t;
				case 4: return "Portal";
				case 3: return "Root";
				case 6: return "Text";
				case 16: return C(t);
				case 8: return t === jf ? "StrictMode" : "Mode";
				case 22: return "Offscreen";
				case 12: return "Profiler";
				case 21: return "Scope";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 25: return "TracingMarker";
				case 1:
				case 0:
				case 14:
				case 15:
					if (typeof t == "function") return t.displayName || t.name || null;
					if (typeof t == "string") return t;
					break;
				case 29:
					if (t = e._debugInfo, t != null) {
						for (var n = t.length - 1; 0 <= n; n--) if (typeof t[n].name == "string") return t[n].name;
					}
					if (e.return !== null) return w(e.return);
			}
			return null;
		}
		function oe(e) {
			return { current: e };
		}
		function se(e, t) {
			0 > Yf ? console.error("Unexpected pop.") : (t !== Jf[Yf] && console.error("Unexpected Fiber popped."), e.current = qf[Yf], qf[Yf] = null, Jf[Yf] = null, Yf--);
		}
		function T(e, t, n) {
			Yf++, qf[Yf] = e.current, Jf[Yf] = n, e.current = t;
		}
		function ce(e) {
			return e === null && console.error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), e;
		}
		function le(e, t) {
			T(Qf, t, e), T(Zf, e, e), T(Xf, null, e);
			var n = t.nodeType;
			switch (n) {
				case 9:
				case 11:
					n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? Ru(t) : WS;
					break;
				default: if (n = t.tagName, t = t.namespaceURI) t = Ru(t), t = zu(t, n);
				else switch (n) {
					case "svg":
						t = GS;
						break;
					case "math":
						t = KS;
						break;
					default: t = WS;
				}
			}
			n = n.toLowerCase(), n = Ht(null, n), n = {
				context: t,
				ancestorInfo: n
			}, se(Xf, e), T(Xf, n, e);
		}
		function E(e) {
			se(Xf, e), se(Zf, e), se(Qf, e);
		}
		function D() {
			return ce(Xf.current);
		}
		function ue(e) {
			e.memoizedState !== null && T($f, e, e);
			var t = ce(Xf.current), n = e.type, r = zu(t.context, n);
			n = Ht(t.ancestorInfo, n), r = {
				context: r,
				ancestorInfo: n
			}, t !== r && (T(Zf, e, e), T(Xf, r, e));
		}
		function de(e) {
			Zf.current === e && (se(Xf, e), se(Zf, e)), $f.current === e && (se($f, e), xC._currentValue = bC);
		}
		function O() {}
		function fe() {
			if (ep === 0) {
				tp = console.log, np = console.info, rp = console.warn, ip = console.error, ap = console.group, op = console.groupCollapsed, sp = console.groupEnd;
				var e = {
					configurable: !0,
					enumerable: !0,
					value: O,
					writable: !0
				};
				Object.defineProperties(console, {
					info: e,
					log: e,
					warn: e,
					error: e,
					group: e,
					groupCollapsed: e,
					groupEnd: e
				});
			}
			ep++;
		}
		function pe() {
			if (ep--, ep === 0) {
				var e = {
					configurable: !0,
					enumerable: !0,
					writable: !0
				};
				Object.defineProperties(console, {
					log: U({}, e, { value: tp }),
					info: U({}, e, { value: np }),
					warn: U({}, e, { value: rp }),
					error: U({}, e, { value: ip }),
					group: U({}, e, { value: ap }),
					groupCollapsed: U({}, e, { value: op }),
					groupEnd: U({}, e, { value: sp })
				});
			}
			0 > ep && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		function me(e) {
			var t = Error.prepareStackTrace;
			if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith("Error: react-stack-top-frame\n") && (e = e.slice(29)), t = e.indexOf("\n"), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react_stack_bottom_frame"), t !== -1 && (t = e.lastIndexOf("\n", t)), t !== -1) e = e.slice(0, t);
			else return "";
			return e;
		}
		function he(e) {
			if (cp === void 0) try {
				throw Error();
			} catch (e) {
				var t = e.stack.trim().match(/\n( *(at )?)/);
				cp = t && t[1] || "", lp = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + cp + e + lp;
		}
		function ge(e, t) {
			if (!e || up) return "";
			var n = dp.get(e);
			if (n !== void 0) return n;
			up = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
			var r = null;
			r = W.H, W.H = null, fe();
			try {
				var i = { DetermineComponentFrameRoot: function() {
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
				i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var a = Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot, "name");
				a && a.configurable && Object.defineProperty(i.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var o = i.DetermineComponentFrameRoot(), s = o[0], c = o[1];
				if (s && c) {
					var l = s.split("\n"), u = c.split("\n");
					for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot");) a++;
					for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot");) o++;
					if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o];) o--;
					for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
						if (a !== 1 || o !== 1) do
							if (a--, o--, 0 > o || l[a] !== u[o]) {
								var d = "\n" + l[a].replace(" at new ", " at ");
								return e.displayName && d.includes("<anonymous>") && (d = d.replace("<anonymous>", e.displayName)), typeof e == "function" && dp.set(e, d), d;
							}
						while (1 <= a && 0 <= o);
						break;
					}
				}
			} finally {
				up = !1, W.H = r, pe(), Error.prepareStackTrace = n;
			}
			return l = (l = e ? e.displayName || e.name : "") ? he(l) : "", typeof e == "function" && dp.set(e, l), l;
		}
		function k(e, t) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return he(e.type);
				case 16: return he("Lazy");
				case 13: return e.child !== t && t !== null ? he("Suspense Fallback") : he("Suspense");
				case 19: return he("SuspenseList");
				case 0:
				case 15: return ge(e.type, !1);
				case 11: return ge(e.type.render, !1);
				case 1: return ge(e.type, !0);
				case 31: return he("Activity");
				default: return "";
			}
		}
		function _e(e) {
			try {
				var t = "", n = null;
				do {
					t += k(e, n);
					var r = e._debugInfo;
					if (r) for (var i = r.length - 1; 0 <= i; i--) {
						var a = r[i];
						if (typeof a.name == "string") {
							var o = t;
							a: {
								var s = a.name, c = a.env, l = a.debugLocation;
								if (l != null) {
									var u = me(l), d = u.lastIndexOf("\n"), f = d === -1 ? u : u.slice(d + 1);
									if (f.indexOf(s) !== -1) {
										var p = "\n" + f;
										break a;
									}
								}
								p = he(s + (c ? " [" + c + "]" : ""));
							}
							t = o + p;
						}
					}
					n = e, e = e.return;
				} while (e);
				return t;
			} catch (e) {
				return "\nError generating stack: " + e.message + "\n" + e.stack;
			}
		}
		function ve(e) {
			return (e = e ? e.displayName || e.name : "") ? he(e) : "";
		}
		function ye() {
			if (fp === null) return null;
			var e = fp._debugOwner;
			return e == null ? null : ae(e);
		}
		function be() {
			if (fp === null) return "";
			var e = fp;
			try {
				var t = "";
				switch (e.tag === 6 && (e = e.return), e.tag) {
					case 26:
					case 27:
					case 5:
						t += he(e.type);
						break;
					case 13:
						t += he("Suspense");
						break;
					case 19:
						t += he("SuspenseList");
						break;
					case 31:
						t += he("Activity");
						break;
					case 30:
					case 0:
					case 15:
					case 1:
						e._debugOwner || t !== "" || (t += ve(e.type));
						break;
					case 11: e._debugOwner || t !== "" || (t += ve(e.type.render));
				}
				for (; e;) if (typeof e.tag == "number") {
					var n = e;
					e = n._debugOwner;
					var r = n._debugStack;
					if (e && r) {
						var i = me(r);
						i !== "" && (t += "\n" + i);
					}
				} else if (e.debugStack != null) {
					var a = e.debugStack;
					(e = e.owner) && a && (t += "\n" + me(a));
				} else break;
				var o = t;
			} catch (e) {
				o = "\nError generating stack: " + e.message + "\n" + e.stack;
			}
			return o;
		}
		function A(e, t, n, r, i, a, o) {
			var s = fp;
			xe(e);
			try {
				return e !== null && e._debugTask ? e._debugTask.run(t.bind(null, n, r, i, a, o)) : t(n, r, i, a, o);
			} finally {
				xe(s);
			}
			throw Error("runWithFiberInDEV should never be called in production. This is a bug in React.");
		}
		function xe(e) {
			W.getCurrentStack = e === null ? null : be, pp = !1, fp = e;
		}
		function Se(e) {
			return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
		}
		function Ce(e) {
			try {
				return we(e), !1;
			} catch {
				return !0;
			}
		}
		function we(e) {
			return "" + e;
		}
		function j(e, t) {
			if (Ce(e)) return console.error("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.", t, Se(e)), we(e);
		}
		function Te(e, t) {
			if (Ce(e)) return console.error("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.", t, Se(e)), we(e);
		}
		function Ee(e) {
			if (Ce(e)) return console.error("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.", Se(e)), we(e);
		}
		function De(e) {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
			var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (t.isDisabled) return !0;
			if (!t.supportsFiber) return console.error("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"), !0;
			try {
				Op = t.inject(e), kp = t;
			} catch (e) {
				console.error("React instrumentation encountered an error: %o.", e);
			}
			return !!t.checkDCE;
		}
		function Oe(e) {
			if (typeof Ep == "function" && Dp(e), kp && typeof kp.setStrictMode == "function") try {
				kp.setStrictMode(Op, e);
			} catch (e) {
				Ap || (Ap = !0, console.error("React instrumentation encountered an error: %o", e));
			}
		}
		function ke(e) {
			return e >>>= 0, e === 0 ? 32 : 31 - (Np(e) / Pp | 0) | 0;
		}
		function Ae(e) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), e;
			}
		}
		function je(e, t, n) {
			var r = e.pendingLanes;
			if (r === 0) return 0;
			var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
			e = e.warmLanes;
			var s = r & 134217727;
			return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ae(n))) : i = Ae(o) : i = Ae(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ae(n))) : i = Ae(o)) : i = Ae(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
		}
		function Me(e, t) {
			return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
		}
		function Ne(e, t) {
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
				default: return console.error("Should have found matching lanes. This is a bug in React."), -1;
			}
		}
		function Pe() {
			var e = Lp;
			return Lp <<= 1, !(Lp & 62914560) && (Lp = 4194304), e;
		}
		function Fe(e) {
			for (var t = [], n = 0; 31 > n; n++) t.push(e);
			return t;
		}
		function Ie(e, t) {
			e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
		}
		function Le(e, t, n, r, i, a) {
			var o = e.pendingLanes;
			e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
			var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
			for (n = o & ~n; 0 < n;) {
				var u = 31 - Mp(n), d = 1 << u;
				s[u] = 0, c[u] = -1;
				var f = l[u];
				if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
					var p = f[u];
					p !== null && (p.lane &= -536870913);
				}
				n &= ~d;
			}
			r !== 0 && Re(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
		}
		function Re(e, t, n) {
			e.pendingLanes |= t, e.suspendedLanes &= ~t;
			var r = 31 - Mp(t);
			e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
		}
		function ze(e, t) {
			var n = e.entangledLanes |= t;
			for (e = e.entanglements; n;) {
				var r = 31 - Mp(n), i = 1 << r;
				i & t | e[r] & t && (e[r] |= t), n &= ~i;
			}
		}
		function Be(e, t) {
			var n = t & -t;
			return n = n & 42 ? 1 : Ve(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
		}
		function Ve(e) {
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
		function He(e, t, n) {
			if (jp) for (e = e.pendingUpdatersLaneMap; 0 < n;) {
				var r = 31 - Mp(n), i = 1 << r;
				e[r].add(t), n &= ~i;
			}
		}
		function Ue(e, t) {
			if (jp) for (var n = e.pendingUpdatersLaneMap, r = e.memoizedUpdaters; 0 < t;) {
				var i = 31 - Mp(t);
				e = 1 << i, i = n[i], 0 < i.size && (i.forEach(function(e) {
					var t = e.alternate;
					t !== null && r.has(t) || r.add(e);
				}), i.clear()), t &= ~e;
			}
		}
		function We(e) {
			return e &= -e, Rp !== 0 && Rp < e ? zp !== 0 && zp < e ? e & 134217727 ? Bp : Vp : zp : Rp;
		}
		function Ge() {
			var e = Gf.p;
			return e === 0 ? (e = window.event, e === void 0 ? Bp : lf(e.type)) : e;
		}
		function Ke(e, t) {
			var n = Gf.p;
			try {
				return Gf.p = e, t();
			} finally {
				Gf.p = n;
			}
		}
		function qe(e) {
			delete e[Up], delete e[Wp], delete e[Kp], delete e[qp], delete e[Jp];
		}
		function Je(e) {
			var t = e[Up];
			if (t) return t;
			for (var n = e.parentNode; n;) {
				if (t = n[Gp] || n[Up]) {
					if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = yd(e); e !== null;) {
						if (n = e[Up]) return n;
						e = yd(e);
					}
					return t;
				}
				e = n, n = e.parentNode;
			}
			return null;
		}
		function Ye(e) {
			if (e = e[Up] || e[Gp]) {
				var t = e.tag;
				if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
			}
			return null;
		}
		function Xe(e) {
			var t = e.tag;
			if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
			throw Error("getNodeFromInstance: Invalid argument.");
		}
		function Ze(e) {
			var t = e[Yp];
			return t ||= e[Yp] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			}, t;
		}
		function Qe(e) {
			e[Xp] = !0;
		}
		function $e(e, t) {
			et(e, t), et(e + "Capture", t);
		}
		function et(e, t) {
			Qp[e] && console.error("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Qp[e] = t;
			var n = e.toLowerCase();
			for ($p[n] = e, e === "onDoubleClick" && ($p.ondblclick = e), e = 0; e < t.length; e++) Zp.add(t[e]);
		}
		function tt(e, t) {
			em[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
		}
		function nt(e) {
			return mp.call(rm, e) ? !0 : mp.call(nm, e) ? !1 : tm.test(e) ? rm[e] = !0 : (nm[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
		}
		function rt(e, t, n) {
			if (nt(t)) {
				if (!e.hasAttribute(t)) {
					switch (typeof n) {
						case "symbol":
						case "object": return n;
						case "function": return n;
						case "boolean": if (!1 === n) return n;
					}
					return n === void 0 ? void 0 : null;
				}
				return e = e.getAttribute(t), e === "" && !0 === n ? !0 : (j(n, t), e === "" + n ? n : e);
			}
		}
		function it(e, t, n) {
			if (nt(t)) if (n === null) e.removeAttribute(t);
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
				j(n, t), e.setAttribute(t, "" + n);
			}
		}
		function at(e, t, n) {
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
				j(n, t), e.setAttribute(t, "" + n);
			}
		}
		function ot(e, t, n, r) {
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
				j(r, n), e.setAttributeNS(t, n, "" + r);
			}
		}
		function st(e) {
			switch (typeof e) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return e;
				case "object": return Ee(e), e;
				default: return "";
			}
		}
		function ct(e) {
			var t = e.type;
			return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
		}
		function lt(e, t, n) {
			var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
			if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
				var i = r.get, a = r.set;
				return Object.defineProperty(e, t, {
					configurable: !0,
					get: function() {
						return i.call(this);
					},
					set: function(e) {
						Ee(e), n = "" + e, a.call(this, e);
					}
				}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
					getValue: function() {
						return n;
					},
					setValue: function(e) {
						Ee(e), n = "" + e;
					},
					stopTracking: function() {
						e._valueTracker = null, delete e[t];
					}
				};
			}
		}
		function ut(e) {
			if (!e._valueTracker) {
				var t = ct(e) ? "checked" : "value";
				e._valueTracker = lt(e, t, "" + e[t]);
			}
		}
		function dt(e) {
			if (!e) return !1;
			var t = e._valueTracker;
			if (!t) return !0;
			var n = t.getValue(), r = "";
			return e && (r = ct(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
		}
		function ft(e) {
			if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
			try {
				return e.activeElement || e.body;
			} catch {
				return e.body;
			}
		}
		function pt(e) {
			return e.replace(im, function(e) {
				return "\\" + e.charCodeAt(0).toString(16) + " ";
			});
		}
		function mt(e, t) {
			t.checked === void 0 || t.defaultChecked === void 0 || om || (console.error("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component", t.type), om = !0), t.value === void 0 || t.defaultValue === void 0 || am || (console.error("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component", t.type), am = !0);
		}
		function ht(e, t, n, r, i, a, o, s) {
			e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? (j(o, "type"), e.type = o) : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + st(t)) : e.value !== "" + st(t) && (e.value = "" + st(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : _t(e, o, st(n)) : _t(e, o, st(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? (j(s, "name"), e.name = "" + st(s)) : e.removeAttribute("name");
		}
		function gt(e, t, n, r, i, a, o, s) {
			if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (j(a, "type"), e.type = a), t != null || n != null) {
				if (!(a !== "submit" && a !== "reset" || t != null)) {
					ut(e);
					return;
				}
				n = n == null ? "" : "" + st(n), t = t == null ? n : "" + st(t), s || t === e.value || (e.value = t), e.defaultValue = t;
			}
			r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (j(o, "name"), e.name = o), ut(e);
		}
		function _t(e, t, n) {
			t === "number" && ft(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
		}
		function vt(e, t) {
			t.value ?? (typeof t.children == "object" && t.children !== null ? Tf.Children.forEach(t.children, function(e) {
				e == null || typeof e == "string" || typeof e == "number" || typeof e == "bigint" || cm || (cm = !0, console.error("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."));
			}) : t.dangerouslySetInnerHTML == null || lm || (lm = !0, console.error("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))), t.selected == null || sm || (console.error("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), sm = !0);
		}
		function yt() {
			var e = ye();
			return e ? "\n\nCheck the render method of `" + e + "`." : "";
		}
		function bt(e, t, n, r) {
			if (e = e.options, t) {
				t = {};
				for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
				for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
			} else {
				for (n = "" + st(n), t = null, i = 0; i < e.length; i++) {
					if (e[i].value === n) {
						e[i].selected = !0, r && (e[i].defaultSelected = !0);
						return;
					}
					t !== null || e[i].disabled || (t = e[i]);
				}
				t !== null && (t.selected = !0);
			}
		}
		function xt(e, t) {
			for (e = 0; e < dm.length; e++) {
				var n = dm[e];
				if (t[n] != null) {
					var r = Wf(t[n]);
					t.multiple && !r ? console.error("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, yt()) : !t.multiple && r && console.error("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, yt());
				}
			}
			t.value === void 0 || t.defaultValue === void 0 || um || (console.error("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"), um = !0);
		}
		function St(e, t) {
			t.value === void 0 || t.defaultValue === void 0 || fm || (console.error("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components", ye() || "A component"), fm = !0), t.children != null && t.value == null && console.error("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
		}
		function Ct(e, t, n) {
			if (t != null && (t = "" + st(t), t !== e.value && (e.value = t), n == null)) {
				e.defaultValue !== t && (e.defaultValue = t);
				return;
			}
			e.defaultValue = n == null ? "" : "" + st(n);
		}
		function wt(e, t, n, r) {
			if (t == null) {
				if (r != null) {
					if (n != null) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
					if (Wf(r)) {
						if (1 < r.length) throw Error("<textarea> can only have at most one child.");
						r = r[0];
					}
					n = r;
				}
				n ??= "", t = n;
			}
			n = st(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), ut(e);
		}
		function Tt(e, t) {
			return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? Tt(e.children[0], t) : e;
		}
		function Et(e) {
			return "  " + "  ".repeat(e);
		}
		function Dt(e) {
			return "+ " + "  ".repeat(e);
		}
		function Ot(e) {
			return "- " + "  ".repeat(e);
		}
		function kt(e) {
			switch (e.tag) {
				case 26:
				case 27:
				case 5: return e.type;
				case 16: return "Lazy";
				case 31: return "Activity";
				case 13: return "Suspense";
				case 19: return "SuspenseList";
				case 0:
				case 15: return e = e.type, e.displayName || e.name || null;
				case 11: return e = e.type.render, e.displayName || e.name || null;
				case 1: return e = e.type, e.displayName || e.name || null;
				default: return null;
			}
		}
		function At(e, t) {
			return pm.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? "{\"...\"}" : "{" + e.slice(0, t - 7) + "...\"}" : "{" + e + "}") : e.length > t ? 5 > t ? "{\"...\"}" : e.slice(0, t - 3) + "..." : e;
		}
		function jt(e, t, n) {
			var r = 120 - 2 * n;
			if (t === null) return Dt(n) + At(e, r) + "\n";
			if (typeof t == "string") {
				for (var i = 0; i < t.length && i < e.length && t.charCodeAt(i) === e.charCodeAt(i); i++);
				return i > r - 8 && 10 < i && (e = "..." + e.slice(i - 8), t = "..." + t.slice(i - 8)), Dt(n) + At(e, r) + "\n" + Ot(n) + At(t, r) + "\n";
			}
			return Et(n) + At(e, r) + "\n";
		}
		function Mt(e) {
			return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(e, t) {
				return t;
			});
		}
		function Nt(e, t) {
			switch (typeof e) {
				case "string": return e = JSON.stringify(e), e.length > t ? 5 > t ? "\"...\"" : e.slice(0, t - 4) + "...\"" : e;
				case "object":
					if (e === null) return "null";
					if (Wf(e)) return "[...]";
					if (e.$$typeof === Of) return (t = C(e.type)) ? "<" + t + ">" : "<...>";
					var n = Mt(e);
					if (n === "Object") {
						for (var r in n = "", t -= 2, e) if (e.hasOwnProperty(r)) {
							var i = JSON.stringify(r);
							if (i !== "\"" + r + "\"" && (r = i), t -= r.length - 2, i = Nt(e[r], 15 > t ? t : 15), t -= i.length, 0 > t) {
								n += n === "" ? "..." : ", ...";
								break;
							}
							n += (n === "" ? "" : ",") + r + ":" + i;
						}
						return "{" + n + "}";
					}
					return n;
				case "function": return (t = e.displayName || e.name) ? "function " + t : "function";
				default: return String(e);
			}
		}
		function Pt(e, t) {
			return typeof e != "string" || pm.test(e) ? "{" + Nt(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? "\"...\"" : "\"" + e.slice(0, t - 5) + "...\"" : "\"" + e + "\"";
		}
		function Ft(e, t, n) {
			var r = 120 - n.length - e.length, i = [], a;
			for (a in t) if (t.hasOwnProperty(a) && a !== "children") {
				var o = Pt(t[a], 120 - n.length - a.length - 1);
				r -= a.length + o.length + 2, i.push(a + "=" + o);
			}
			return i.length === 0 ? n + "<" + e + ">\n" : 0 < r ? n + "<" + e + " " + i.join(" ") + ">\n" : n + "<" + e + "\n" + n + "  " + i.join("\n" + n + "  ") + "\n" + n + ">\n";
		}
		function It(e, t, n) {
			var r = "", i = U({}, t), a;
			for (a in e) if (e.hasOwnProperty(a)) {
				delete i[a];
				var o = 120 - 2 * n - a.length - 2, s = Nt(e[a], o);
				t.hasOwnProperty(a) ? (o = Nt(t[a], o), r += Dt(n) + a + ": " + s + "\n", r += Ot(n) + a + ": " + o + "\n") : r += Dt(n) + a + ": " + s + "\n";
			}
			for (var c in i) i.hasOwnProperty(c) && (e = Nt(i[c], 120 - 2 * n - c.length - 2), r += Ot(n) + c + ": " + e + "\n");
			return r;
		}
		function Lt(e, t, n, r) {
			var i = "", a = /* @__PURE__ */ new Map();
			for (l in n) n.hasOwnProperty(l) && a.set(l.toLowerCase(), l);
			if (a.size === 1 && a.has("children")) i += Ft(e, t, Et(r));
			else {
				for (var o in t) if (t.hasOwnProperty(o) && o !== "children") {
					var s = 120 - 2 * (r + 1) - o.length - 1, c = a.get(o.toLowerCase());
					if (c !== void 0) {
						a.delete(o.toLowerCase());
						var l = t[o];
						c = n[c];
						var u = Pt(l, s);
						s = Pt(c, s), typeof l == "object" && l && typeof c == "object" && c && Mt(l) === "Object" && Mt(c) === "Object" && (2 < Object.keys(l).length || 2 < Object.keys(c).length || -1 < u.indexOf("...") || -1 < s.indexOf("...")) ? i += Et(r + 1) + o + "={{\n" + It(l, c, r + 2) + Et(r + 1) + "}}\n" : (i += Dt(r + 1) + o + "=" + u + "\n", i += Ot(r + 1) + o + "=" + s + "\n");
					} else i += Et(r + 1) + o + "=" + Pt(t[o], s) + "\n";
				}
				a.forEach(function(e) {
					if (e !== "children") {
						var t = 120 - 2 * (r + 1) - e.length - 1;
						i += Ot(r + 1) + e + "=" + Pt(n[e], t) + "\n";
					}
				}), i = i === "" ? Et(r) + "<" + e + ">\n" : Et(r) + "<" + e + "\n" + i + Et(r) + ">\n";
			}
			return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (a = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (a = "" + t), i += jt(a, "" + e, r + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (i = e == null ? i + jt("" + t, null, r + 1) : i + jt("" + t, void 0, r + 1)), i;
		}
		function Rt(e, t) {
			var n = kt(e);
			if (n === null) {
				for (n = "", e = e.child; e;) n += Rt(e, t), e = e.sibling;
				return n;
			}
			return Et(t) + "<" + n + ">\n";
		}
		function zt(e, t) {
			var n = Tt(e, t);
			if (n !== e && (e.children.length !== 1 || e.children[0] !== n)) return Et(t) + "...\n" + zt(n, t + 1);
			n = "";
			var r = e.fiber._debugInfo;
			if (r) for (var i = 0; i < r.length; i++) {
				var a = r[i].name;
				typeof a == "string" && (n += Et(t) + "<" + a + ">\n", t++);
			}
			if (r = "", i = e.fiber.pendingProps, e.fiber.tag === 6) r = jt(i, e.serverProps, t), t++;
			else if (a = kt(e.fiber), a !== null) if (e.serverProps === void 0) {
				r = t;
				var o = 120 - 2 * r - a.length - 2, s = "";
				for (l in i) if (i.hasOwnProperty(l) && l !== "children") {
					var c = Pt(i[l], 15);
					if (o -= l.length + c.length + 2, 0 > o) {
						s += " ...";
						break;
					}
					s += " " + l + "=" + c;
				}
				r = Et(r) + "<" + a + s + ">\n", t++;
			} else e.serverProps === null ? (r = Ft(a, i, Dt(t)), t++) : typeof e.serverProps == "string" ? console.error("Should not have matched a non HostText fiber to a Text node. This is a bug in React.") : (r = Lt(a, i, e.serverProps, t), t++);
			var l = "";
			for (i = e.fiber.child, a = 0; i && a < e.children.length;) o = e.children[a], o.fiber === i ? (l += zt(o, t), a++) : l += Rt(i, t), i = i.sibling;
			for (i && 0 < e.children.length && (l += Et(t) + "...\n"), i = e.serverTail, e.serverProps === null && t--, e = 0; e < i.length; e++) a = i[e], l = typeof a == "string" ? l + (Ot(t) + At(a, 120 - 2 * t) + "\n") : l + Ft(a.type, a.props, Ot(t));
			return n + r + l;
		}
		function Bt(e) {
			try {
				return "\n\n" + zt(e, 0);
			} catch {
				return "";
			}
		}
		function Vt(e, t, n) {
			for (var r = t, i = null, a = 0; r;) r === e && (a = 0), i = {
				fiber: r,
				children: i === null ? [] : [i],
				serverProps: r === t ? n : r === e ? null : void 0,
				serverTail: [],
				distanceFromLeaf: a
			}, a++, r = r.return;
			return i === null ? "" : Bt(i).replaceAll(/^[+-]/gm, ">");
		}
		function Ht(e, t) {
			var n = U({}, e || vm), r = { tag: t };
			return hm.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), gm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), mm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = r, t === "form" && (n.formTag = r), t === "a" && (n.aTagInScope = r), t === "button" && (n.buttonTagInScope = r), t === "nobr" && (n.nobrTagInScope = r), t === "p" && (n.pTagInButtonScope = r), t === "li" && (n.listItemTagAutoclosing = r), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = r), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope ||= r, e !== null || t !== "#document" && t !== "html" && t !== "body" ? !0 === n.implicitRootScope && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
		}
		function Ut(e, t, n) {
			switch (t) {
				case "select": return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
				case "optgroup": return e === "option" || e === "#text";
				case "option": return e === "#text";
				case "tr": return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
				case "tbody":
				case "thead":
				case "tfoot": return e === "tr" || e === "style" || e === "script" || e === "template";
				case "colgroup": return e === "col" || e === "template";
				case "table": return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
				case "head": return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
				case "html":
					if (n) break;
					return e === "head" || e === "body" || e === "frameset";
				case "frameset": return e === "frame";
				case "#document": if (!n) return e === "html";
			}
			switch (e) {
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
				case "rp":
				case "rt": return _m.indexOf(t) === -1;
				case "caption":
				case "col":
				case "colgroup":
				case "frameset":
				case "frame":
				case "tbody":
				case "td":
				case "tfoot":
				case "th":
				case "thead":
				case "tr": return t == null;
				case "head": return n || t === null;
				case "html": return n && t === "#document" || t === null;
				case "body": return n && (t === "#document" || t === "html") || t === null;
			}
			return !0;
		}
		function Wt(e, t) {
			switch (e) {
				case "address":
				case "article":
				case "aside":
				case "blockquote":
				case "center":
				case "details":
				case "dialog":
				case "dir":
				case "div":
				case "dl":
				case "fieldset":
				case "figcaption":
				case "figure":
				case "footer":
				case "header":
				case "hgroup":
				case "main":
				case "menu":
				case "nav":
				case "ol":
				case "p":
				case "section":
				case "summary":
				case "ul":
				case "pre":
				case "listing":
				case "table":
				case "hr":
				case "xmp":
				case "h1":
				case "h2":
				case "h3":
				case "h4":
				case "h5":
				case "h6": return t.pTagInButtonScope;
				case "form": return t.formTag || t.pTagInButtonScope;
				case "li": return t.listItemTagAutoclosing;
				case "dd":
				case "dt": return t.dlItemTagAutoclosing;
				case "button": return t.buttonTagInScope;
				case "a": return t.aTagInScope;
				case "nobr": return t.nobrTagInScope;
			}
			return null;
		}
		function Gt(e, t) {
			for (; e;) {
				switch (e.tag) {
					case 5:
					case 26:
					case 27: if (e.type === t) return e;
				}
				e = e.return;
			}
			return null;
		}
		function Kt(e, t) {
			t ||= vm;
			var n = t.current;
			if (t = (n = Ut(e, n && n.tag, t.implicitRootScope) ? null : n) ? null : Wt(e, t), t = n || t, !t) return !0;
			var r = t.tag;
			if (t = String(!!n) + "|" + e + "|" + r, ym[t]) return !1;
			ym[t] = !0;
			var i = (t = fp) ? Gt(t.return, r) : null, a = t !== null && i !== null ? Vt(i, t, null) : "", o = "<" + e + ">";
			return n ? (n = "", r === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error("In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s", o, r, n, a)) : console.error("In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s", o, r, a), t && (e = t.return, i === null || e === null || i === e && e._debugOwner === t._debugOwner || A(i, function() {
				console.error("<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.", r, o);
			})), !1;
		}
		function qt(e, t, n) {
			if (n || Ut("#text", t, !1)) return !0;
			if (n = "#text|" + t, ym[n]) return !1;
			ym[n] = !0;
			var r = (n = fp) ? Gt(n, t) : null;
			return n = n !== null && r !== null ? Vt(r, n, n.tag === 6 ? null : { children: null }) : "", /\S/.test(e) ? console.error("In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s", t, n) : console.error("In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s", t, n), !1;
		}
		function Jt(e, t) {
			if (t) {
				var n = e.firstChild;
				if (n && n === e.lastChild && n.nodeType === 3) {
					n.nodeValue = t;
					return;
				}
			}
			e.textContent = t;
		}
		function Yt(e) {
			return e.replace(Tm, function(e, t) {
				return t.toUpperCase();
			});
		}
		function Xt(e, t, n) {
			var r = t.indexOf("--") === 0;
			r || (-1 < t.indexOf("-") ? Dm.hasOwnProperty(t) && Dm[t] || (Dm[t] = !0, console.error("Unsupported style property %s. Did you mean %s?", t, Yt(t.replace(wm, "ms-")))) : Cm.test(t) ? Dm.hasOwnProperty(t) && Dm[t] || (Dm[t] = !0, console.error("Unsupported vendor-prefixed style property %s. Did you mean %s?", t, t.charAt(0).toUpperCase() + t.slice(1))) : !Em.test(n) || Om.hasOwnProperty(n) && Om[n] || (Om[n] = !0, console.error("Style property values shouldn't contain a semicolon. Try \"%s: %s\" instead.", t, n.replace(Em, ""))), typeof n == "number" && (isNaN(n) ? km || (km = !0, console.error("`NaN` is an invalid value for the `%s` css style property.", t)) : isFinite(n) || Am || (Am = !0, console.error("`Infinity` is an invalid value for the `%s` css style property.", t)))), n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || jm.has(t) ? t === "float" ? e.cssFloat = n : (Te(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
		}
		function Zt(e, t, n) {
			if (t != null && typeof t != "object") throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			if (t && Object.freeze(t), e = e.style, n != null) {
				if (t) {
					var r = {};
					if (n) {
						for (var i in n) if (n.hasOwnProperty(i) && !t.hasOwnProperty(i)) for (var a = bm[i] || [i], o = 0; o < a.length; o++) r[a[o]] = i;
					}
					for (var s in t) if (t.hasOwnProperty(s) && (!n || n[s] !== t[s])) for (i = bm[s] || [s], a = 0; a < i.length; a++) r[i[a]] = s;
					for (var c in s = {}, t) for (i = bm[c] || [c], a = 0; a < i.length; a++) s[i[a]] = c;
					for (var l in c = {}, r) if (i = r[l], (a = s[l]) && i !== a && (o = i + "," + a, !c[o])) {
						c[o] = !0, o = console;
						var u = t[i];
						o.error.call(o, "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", u == null || typeof u == "boolean" || u === "" ? "Removing" : "Updating", i, a);
					}
				}
				for (var d in n) !n.hasOwnProperty(d) || t != null && t.hasOwnProperty(d) || (d.indexOf("--") === 0 ? e.setProperty(d, "") : d === "float" ? e.cssFloat = "" : e[d] = "");
				for (var f in t) l = t[f], t.hasOwnProperty(f) && n[f] !== l && Xt(e, f, l);
			} else for (r in t) t.hasOwnProperty(r) && Xt(e, r, t[r]);
		}
		function Qt(e) {
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
		function $t(e) {
			return Pm.get(e) || e;
		}
		function en(e, t) {
			if (mp.call(Lm, t) && Lm[t]) return !0;
			if (zm.test(t)) {
				if (e = "aria-" + t.slice(4).toLowerCase(), e = Im.hasOwnProperty(e) ? e : null, e == null) return console.error("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Lm[t] = !0;
				if (t !== e) return console.error("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, e), Lm[t] = !0;
			}
			if (Rm.test(t)) {
				if (e = t.toLowerCase(), e = Im.hasOwnProperty(e) ? e : null, e == null) return Lm[t] = !0, !1;
				t !== e && (console.error("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, e), Lm[t] = !0);
			}
			return !0;
		}
		function tn(e, t) {
			var n = [], r;
			for (r in t) en(e, r) || n.push(r);
			t = n.map(function(e) {
				return "`" + e + "`";
			}).join(", "), n.length === 1 ? console.error("Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e) : 1 < n.length && console.error("Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props", t, e);
		}
		function nn(e, t, n, r) {
			if (mp.call(Vm, t) && Vm[t]) return !0;
			var i = t.toLowerCase();
			if (i === "onfocusin" || i === "onfocusout") return console.error("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Vm[t] = !0;
			if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction")) return !0;
			if (r != null) {
				if (e = r.possibleRegistrationNames, r.registrationNameDependencies.hasOwnProperty(t)) return !0;
				if (r = e.hasOwnProperty(i) ? e[i] : null, r != null) return console.error("Invalid event handler property `%s`. Did you mean `%s`?", t, r), Vm[t] = !0;
				if (Hm.test(t)) return console.error("Unknown event handler property `%s`. It will be ignored.", t), Vm[t] = !0;
			} else if (Hm.test(t)) return Um.test(t) && console.error("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Vm[t] = !0;
			if (Wm.test(t) || Gm.test(t)) return !0;
			if (i === "innerhtml") return console.error("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Vm[t] = !0;
			if (i === "aria") return console.error("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Vm[t] = !0;
			if (i === "is" && n != null && typeof n != "string") return console.error("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Vm[t] = !0;
			if (typeof n == "number" && isNaN(n)) return console.error("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Vm[t] = !0;
			if (Fm.hasOwnProperty(i)) {
				if (i = Fm[i], i !== t) return console.error("Invalid DOM property `%s`. Did you mean `%s`?", t, i), Vm[t] = !0;
			} else if (t !== i) return console.error("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, i), Vm[t] = !0;
			switch (t) {
				case "dangerouslySetInnerHTML":
				case "children":
				case "style":
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": return !0;
				case "innerText":
				case "textContent": return !0;
			}
			switch (typeof n) {
				case "boolean": switch (t) {
					case "autoFocus":
					case "checked":
					case "multiple":
					case "muted":
					case "selected":
					case "contentEditable":
					case "spellCheck":
					case "draggable":
					case "value":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
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
					case "capture":
					case "download":
					case "inert": return !0;
					default: return i = t.toLowerCase().slice(0, 5), i === "data-" || i === "aria-" ? !0 : (n ? console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.", n, t, t, n, t) : console.error("Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s=\"%s\" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", n, t, t, n, t, t, t), Vm[t] = !0);
				}
				case "function":
				case "symbol": return Vm[t] = !0, !1;
				case "string": if (n === "false" || n === "true") {
					switch (t) {
						case "checked":
						case "selected":
						case "multiple":
						case "muted":
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
						case "inert": break;
						default: return !0;
					}
					console.error("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : "Although this works, it will not work as expected if you pass the string \"false\".", t, n), Vm[t] = !0;
				}
			}
			return !0;
		}
		function rn(e, t, n) {
			var r = [], i;
			for (i in t) nn(e, i, t[i], n) || r.push(i);
			t = r.map(function(e) {
				return "`" + e + "`";
			}).join(", "), r.length === 1 ? console.error("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e) : 1 < r.length && console.error("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ", t, e);
		}
		function an(e) {
			return Km.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
		}
		function on() {}
		function sn(e) {
			return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
		}
		function cn(e) {
			var t = Ye(e);
			if (t && (e = t.stateNode)) {
				var n = e[Wp] || null;
				a: switch (e = t.stateNode, t.type) {
					case "input":
						if (ht(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
							for (n = e; n.parentNode;) n = n.parentNode;
							for (j(t, "name"), n = n.querySelectorAll("input[name=\"" + pt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
								var r = n[t];
								if (r !== e && r.form === e.form) {
									var i = r[Wp] || null;
									if (!i) throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
									ht(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
								}
							}
							for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && dt(r);
						}
						break a;
					case "textarea":
						Ct(e, n.value, n.defaultValue);
						break a;
					case "select": t = n.value, t != null && bt(e, !!n.multiple, t, !1);
				}
			}
		}
		function ln(e, t, n) {
			if (Xm) return e(t, n);
			Xm = !0;
			try {
				return e(t);
			} finally {
				if (Xm = !1, (Jm !== null || Ym !== null) && (il(), Jm && (t = Jm, e = Ym, Ym = Jm = null, cn(t), e))) for (t = 0; t < e.length; t++) cn(e[t]);
			}
		}
		function un(e, t) {
			var n = e.stateNode;
			if (n === null) return null;
			var r = n[Wp] || null;
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
			if (n && typeof n != "function") throw Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type.");
			return n;
		}
		function dn() {
			if (nh) return nh;
			var e, t = th, n = t.length, r, i = "value" in eh ? eh.value : eh.textContent, a = i.length;
			for (e = 0; e < n && t[e] === i[e]; e++);
			var o = n - e;
			for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
			return nh = i.slice(e, 1 < r ? 1 - r : void 0);
		}
		function fn(e) {
			var t = e.keyCode;
			return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
		}
		function pn() {
			return !0;
		}
		function mn() {
			return !1;
		}
		function hn(e) {
			function t(t, n, r, i, a) {
				for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
				return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? pn : mn, this.isPropagationStopped = mn, this;
			}
			return U(t.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var e = this.nativeEvent;
					e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = pn);
				},
				stopPropagation: function() {
					var e = this.nativeEvent;
					e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = pn);
				},
				persist: function() {},
				isPersistent: pn
			}), t;
		}
		function gn(e) {
			var t = this.nativeEvent;
			return t.getModifierState ? t.getModifierState(e) : (e = bh[e]) ? !!t[e] : !1;
		}
		function _n() {
			return gn;
		}
		function vn(e, t) {
			switch (e) {
				case "keyup": return Dh.indexOf(t.keyCode) !== -1;
				case "keydown": return t.keyCode !== Oh;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function yn(e) {
			return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
		}
		function bn(e, t) {
			switch (e) {
				case "compositionend": return yn(t);
				case "keypress": return t.which === Nh ? (Fh = !0, Ph) : null;
				case "textInput": return e = t.data, e === Ph && Fh ? null : e;
				default: return null;
			}
		}
		function xn(e, t) {
			if (Ih) return e === "compositionend" || !kh && vn(e, t) ? (e = dn(), nh = th = eh = null, Ih = !1, e) : null;
			switch (e) {
				case "paste": return null;
				case "keypress":
					if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
						if (t.char && 1 < t.char.length) return t.char;
						if (t.which) return String.fromCharCode(t.which);
					}
					return null;
				case "compositionend": return Mh && t.locale !== "ko" ? null : t.data;
				default: return null;
			}
		}
		function Sn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t === "input" ? !!Lh[e.type] : t === "textarea";
		}
		function Cn(e) {
			if (!Zm) return !1;
			e = "on" + e;
			var t = e in document;
			return t ||= (t = document.createElement("div"), t.setAttribute(e, "return;"), typeof t[e] == "function"), t;
		}
		function wn(e, t, n, r) {
			Jm ? Ym ? Ym.push(r) : Ym = [r] : Jm = r, t = du(t, "onChange"), 0 < t.length && (n = new ih("onChange", "change", null, n, r), e.push({
				event: n,
				listeners: t
			}));
		}
		function Tn(e) {
			au(e, 0);
		}
		function En(e) {
			if (dt(Xe(e))) return e;
		}
		function Dn(e, t) {
			if (e === "change") return t;
		}
		function On() {
			Rh && (Rh.detachEvent("onpropertychange", kn), zh = Rh = null);
		}
		function kn(e) {
			if (e.propertyName === "value" && En(zh)) {
				var t = [];
				wn(t, zh, e, sn(e)), ln(Tn, t);
			}
		}
		function An(e, t, n) {
			e === "focusin" ? (On(), Rh = t, zh = n, Rh.attachEvent("onpropertychange", kn)) : e === "focusout" && On();
		}
		function jn(e) {
			if (e === "selectionchange" || e === "keyup" || e === "keydown") return En(zh);
		}
		function Mn(e, t) {
			if (e === "click") return En(t);
		}
		function Nn(e, t) {
			if (e === "input" || e === "change") return En(t);
		}
		function Pn(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function Fn(e, t) {
			if (Vh(e, t)) return !0;
			if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
			var n = Object.keys(e), r = Object.keys(t);
			if (n.length !== r.length) return !1;
			for (r = 0; r < n.length; r++) {
				var i = n[r];
				if (!mp.call(t, i) || !Vh(e[i], t[i])) return !1;
			}
			return !0;
		}
		function In(e) {
			for (; e && e.firstChild;) e = e.firstChild;
			return e;
		}
		function Ln(e, t) {
			var n = In(e);
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
				n = In(n);
			}
		}
		function Rn(e, t) {
			return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rn(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
		}
		function zn(e) {
			e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
			for (var t = ft(e.document); t instanceof e.HTMLIFrameElement;) {
				try {
					var n = typeof t.contentWindow.location.href == "string";
				} catch {
					n = !1;
				}
				if (n) e = t.contentWindow;
				else break;
				t = ft(e.document);
			}
			return t;
		}
		function Bn(e) {
			var t = e && e.nodeName && e.nodeName.toLowerCase();
			return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
		}
		function Vn(e, t, n) {
			var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
			Kh || Uh == null || Uh !== ft(r) || (r = Uh, "selectionStart" in r && Bn(r) ? r = {
				start: r.selectionStart,
				end: r.selectionEnd
			} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
				anchorNode: r.anchorNode,
				anchorOffset: r.anchorOffset,
				focusNode: r.focusNode,
				focusOffset: r.focusOffset
			}), Gh && Fn(Gh, r) || (Gh = r, r = du(Wh, "onSelect"), 0 < r.length && (t = new ih("onSelect", "select", null, t, n), e.push({
				event: t,
				listeners: r
			}), t.target = Uh)));
		}
		function Hn(e, t) {
			var n = {};
			return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
		}
		function Un(e) {
			if (Jh[e]) return Jh[e];
			if (!qh[e]) return e;
			var t = qh[e], n;
			for (n in t) if (t.hasOwnProperty(n) && n in Yh) return Jh[e] = t[n];
			return e;
		}
		function Wn(e, t) {
			rg.set(e, t), $e(t, [e]);
		}
		function Gn(e) {
			for (var t = dg, n = 0; n < e.length; n++) {
				var r = e[n];
				if (typeof r == "object" && r) if (Wf(r) && r.length === 2 && typeof r[0] == "string") {
					if (t !== dg && t !== mg) return fg;
					t = mg;
				} else return fg;
				else {
					if (typeof r == "function" || typeof r == "string" && 50 < r.length || t !== dg && t !== pg) return fg;
					t = pg;
				}
			}
			return t;
		}
		function Kn(e, t, n, r) {
			for (var i in e) mp.call(e, i) && i[0] !== "_" && qn(i, e[i], t, n, r);
		}
		function qn(e, t, n, r, i) {
			switch (typeof t) {
				case "object": if (t === null) {
					t = "null";
					break;
				} else {
					if (t.$$typeof === Of) {
						var a = C(t.type) || "…", o = t.key;
						t = t.props;
						var s = Object.keys(t), c = s.length;
						if (o == null && c === 0) {
							t = "<" + a + " />";
							break;
						}
						if (3 > r || c === 1 && s[0] === "children" && o == null) {
							t = "<" + a + " … />";
							break;
						}
						for (var l in n.push([i + "\xA0\xA0".repeat(r) + e, "<" + a]), o !== null && qn("key", o, n, r + 1, i), e = !1, t) l === "children" ? t.children != null && (!Wf(t.children) || 0 < t.children.length) && (e = !0) : mp.call(t, l) && l[0] !== "_" && qn(l, t[l], n, r + 1, i);
						n.push(["", e ? ">…</" + a + ">" : "/>"]);
						return;
					}
					if (a = Object.prototype.toString.call(t), a = a.slice(8, a.length - 1), a === "Array") {
						if (l = Gn(t), l === pg || l === dg) {
							t = JSON.stringify(t);
							break;
						} else if (l === mg) {
							for (n.push([i + "\xA0\xA0".repeat(r) + e, ""]), e = 0; e < t.length; e++) a = t[e], qn(a[0], a[1], n, r + 1, i);
							return;
						}
					}
					if (a === "Promise") {
						if (t.status === "fulfilled") {
							if (a = n.length, qn(e, t.value, n, r, i), n.length > a) {
								n = n[a], n[1] = "Promise<" + (n[1] || "Object") + ">";
								return;
							}
						} else if (t.status === "rejected" && (a = n.length, qn(e, t.reason, n, r, i), n.length > a)) {
							n = n[a], n[1] = "Rejected Promise<" + n[1] + ">";
							return;
						}
						n.push(["\xA0\xA0".repeat(r) + e, "Promise"]);
						return;
					}
					a === "Object" && (l = Object.getPrototypeOf(t)) && typeof l.constructor == "function" && (a = l.constructor.name), n.push([i + "\xA0\xA0".repeat(r) + e, a === "Object" ? 3 > r ? "" : "…" : a]), 3 > r && Kn(t, n, r + 1, i);
					return;
				}
				case "function":
					t = t.name === "" ? "() => {}" : t.name + "() {}";
					break;
				case "string":
					t = t === ug ? "…" : JSON.stringify(t);
					break;
				case "undefined":
					t = "undefined";
					break;
				case "boolean":
					t = t ? "true" : "false";
					break;
				default: t = String(t);
			}
			n.push([i + "\xA0\xA0".repeat(r) + e, t]);
		}
		function Jn(e, t, n, r) {
			var i = !0;
			for (o in e) o in t || (n.push([hg + "\xA0\xA0".repeat(r) + o, "…"]), i = !1);
			for (var a in t) if (a in e) {
				var o = e[a], s = t[a];
				if (o !== s) {
					if (r === 0 && a === "children") i = "\xA0\xA0".repeat(r) + a, n.push([hg + i, "…"], [gg + i, "…"]);
					else {
						if (!(3 <= r)) {
							if (typeof o == "object" && typeof s == "object" && o !== null && s !== null && o.$$typeof === s.$$typeof) if (s.$$typeof === Of) {
								if (o.type === s.type && o.key === s.key) {
									o = C(s.type) || "…", i = "\xA0\xA0".repeat(r) + a, o = "<" + o + " … />", n.push([hg + i, o], [gg + i, o]), i = !1;
									continue;
								}
							} else {
								var c = Object.prototype.toString.call(o), l = Object.prototype.toString.call(s);
								if (c === l && (l === "[object Object]" || l === "[object Array]")) {
									c = [_g + "\xA0\xA0".repeat(r) + a, l === "[object Array]" ? "Array" : ""], n.push(c), l = n.length, Jn(o, s, n, r + 1) ? l === n.length && (c[1] = "Referentially unequal but deeply equal objects. Consider memoization.") : i = !1;
									continue;
								}
							}
							else if (typeof o == "function" && typeof s == "function" && o.name === s.name && o.length === s.length && (c = Function.prototype.toString.call(o), l = Function.prototype.toString.call(s), c === l)) {
								o = s.name === "" ? "() => {}" : s.name + "() {}", n.push([_g + "\xA0\xA0".repeat(r) + a, o + " Referentially unequal function closure. Consider memoization."]);
								continue;
							}
						}
						qn(a, o, n, r, hg), qn(a, s, n, r, gg);
					}
					i = !1;
				}
			} else n.push([gg + "\xA0\xA0".repeat(r) + a, "…"]), i = !1;
			return i;
		}
		function Yn(e) {
			xg = e & 63 ? "Blocking" : e & 64 ? "Gesture" : e & 4194176 ? "Transition" : e & 62914560 ? "Suspense" : e & 2080374784 ? "Idle" : "Other";
		}
		function Xn(e, t, n, r) {
			vg && (wg.start = t, wg.end = n, Cg.color = "warning", Cg.tooltipText = r, Cg.properties = null, (e = e._debugTask) ? e.run(performance.measure.bind(performance, r, wg)) : performance.measure(r, wg));
		}
		function Zn(e, t, n) {
			Xn(e, t, n, "Reconnect");
		}
		function Qn(e, t, n, r, i) {
			var a = w(e);
			if (a !== null && vg) {
				var o = e.alternate, s = e.actualDuration;
				if (o === null || o.child !== e.child) for (var c = e.child; c !== null; c = c.sibling) s -= c.actualDuration;
				r = .5 > s ? r ? "tertiary-light" : "primary-light" : 10 > s ? r ? "tertiary" : "primary" : 100 > s ? r ? "tertiary-dark" : "primary-dark" : "error";
				var l = e.memoizedProps;
				s = e._debugTask, l !== null && o !== null && o.memoizedProps !== l ? (c = [Tg], l = Jn(o.memoizedProps, l, c, 0), 1 < c.length && (l && !Sg && (o.lanes & i) === 0 && 100 < e.actualDuration ? (Sg = !0, c[0] = Dg, Cg.color = "warning", Cg.tooltipText = Eg) : (Cg.color = r, Cg.tooltipText = a), Cg.properties = c, wg.start = t, wg.end = n, s == null ? performance.measure("​" + a, wg) : s.run(performance.measure.bind(performance, "​" + a, wg)))) : s == null ? console.timeStamp(a, t, n, yg, void 0, r) : s.run(console.timeStamp.bind(console, a, t, n, yg, void 0, r));
			}
		}
		function $n(e, t, n, r) {
			if (vg) {
				var i = w(e);
				if (i !== null) {
					for (var a = null, o = [], s = 0; s < r.length; s++) {
						var c = r[s];
						a == null && c.source !== null && (a = c.source._debugTask), c = c.value, o.push(["Error", typeof c == "object" && c && typeof c.message == "string" ? String(c.message) : String(c)]);
					}
					e.key !== null && qn("key", e.key, o, 0, ""), e.memoizedProps !== null && Kn(e.memoizedProps, o, 0, ""), a ??= e._debugTask, e = {
						start: t,
						end: n,
						detail: { devtools: {
							color: "error",
							track: yg,
							tooltipText: e.tag === 13 ? "Hydration failed" : "Error boundary caught an error",
							properties: o
						} }
					}, a ? a.run(performance.measure.bind(performance, "​" + i, e)) : performance.measure("​" + i, e);
				}
			}
		}
		function er(e, t, n, r, i) {
			if (i !== null) {
				if (vg) {
					var a = w(e);
					if (a !== null) {
						r = [];
						for (var o = 0; o < i.length; o++) {
							var s = i[o].value;
							r.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
						}
						e.key !== null && qn("key", e.key, r, 0, ""), e.memoizedProps !== null && Kn(e.memoizedProps, r, 0, ""), t = {
							start: t,
							end: n,
							detail: { devtools: {
								color: "error",
								track: yg,
								tooltipText: "A lifecycle or effect errored",
								properties: r
							} }
						}, (e = e._debugTask) ? e.run(performance.measure.bind(performance, "​" + a, t)) : performance.measure("​" + a, t);
					}
				}
			} else a = w(e), a !== null && vg && (i = 1 > r ? "secondary-light" : 100 > r ? "secondary" : 500 > r ? "secondary-dark" : "error", (e = e._debugTask) ? e.run(console.timeStamp.bind(console, a, t, n, yg, void 0, i)) : console.timeStamp(a, t, n, yg, void 0, i));
		}
		function tr(e, t, n, r) {
			if (vg && !(t <= e)) {
				var i = (n & 738197653) === n ? "tertiary-dark" : "primary-dark";
				n = (n & 536870912) === n ? "Prepared" : (n & 201326741) === n ? "Hydrated" : "Render", r ? r.run(console.timeStamp.bind(console, n, e, t, xg, bg, i)) : console.timeStamp(n, e, t, xg, bg, i);
			}
		}
		function nr(e, t, n, r) {
			!vg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Prewarm", e, t, xg, bg, n)) : console.timeStamp("Prewarm", e, t, xg, bg, n));
		}
		function rr(e, t, n, r) {
			!vg || t <= e || (n = (n & 738197653) === n ? "tertiary-dark" : "primary-dark", r ? r.run(console.timeStamp.bind(console, "Suspended", e, t, xg, bg, n)) : console.timeStamp("Suspended", e, t, xg, bg, n));
		}
		function ir(e, t, n, r, i, a) {
			if (vg && !(t <= e)) {
				n = [];
				for (var o = 0; o < r.length; o++) {
					var s = r[o].value;
					n.push(["Recoverable Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "primary-dark",
						track: xg,
						trackGroup: bg,
						tooltipText: i ? "Hydration Failed" : "Recovered after Error",
						properties: n
					} }
				}, a ? a.run(performance.measure.bind(performance, "Recovered", e)) : performance.measure("Recovered", e);
			}
		}
		function ar(e, t, n, r) {
			!vg || t <= e || (r ? r.run(console.timeStamp.bind(console, "Errored", e, t, xg, bg, "error")) : console.timeStamp("Errored", e, t, xg, bg, "error"));
		}
		function or(e, t, n, r) {
			!vg || t <= e || (r ? r.run(console.timeStamp.bind(console, n, e, t, xg, bg, "secondary-light")) : console.timeStamp(n, e, t, xg, bg, "secondary-light"));
		}
		function sr(e, t, n, r, i) {
			if (vg && !(t <= e)) {
				for (var a = [], o = 0; o < n.length; o++) {
					var s = n[o].value;
					a.push(["Error", typeof s == "object" && s && typeof s.message == "string" ? String(s.message) : String(s)]);
				}
				e = {
					start: e,
					end: t,
					detail: { devtools: {
						color: "error",
						track: xg,
						trackGroup: bg,
						tooltipText: r ? "Remaining Effects Errored" : "Commit Errored",
						properties: a
					} }
				}, i ? i.run(performance.measure.bind(performance, "Errored", e)) : performance.measure("Errored", e);
			}
		}
		function cr(e, t, n) {
			!vg || t <= e || (n ? n.run(console.timeStamp.bind(console, "Animating", e, t, xg, bg, "secondary-dark")) : console.timeStamp("Animating", e, t, xg, bg, "secondary-dark"));
		}
		function lr() {
			for (var e = jg, t = Mg = jg = 0; t < e;) {
				var n = Ag[t];
				Ag[t++] = null;
				var r = Ag[t];
				Ag[t++] = null;
				var i = Ag[t];
				Ag[t++] = null;
				var a = Ag[t];
				if (Ag[t++] = null, r !== null && i !== null) {
					var o = r.pending;
					o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
				}
				a !== 0 && pr(n, i, a);
			}
		}
		function ur(e, t, n, r) {
			Ag[jg++] = e, Ag[jg++] = t, Ag[jg++] = n, Ag[jg++] = r, Mg |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
		}
		function dr(e, t, n, r) {
			return ur(e, t, n, r), mr(e);
		}
		function fr(e, t) {
			return ur(e, null, null, t), mr(e);
		}
		function pr(e, t, n) {
			e.lanes |= n;
			var r = e.alternate;
			r !== null && (r.lanes |= n);
			for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & Og || (i = !0)), e = a, a = a.return;
			return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Mp(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
		}
		function mr(e) {
			if (qx > Kx) throw Qx = qx = 0, $x = Jx = null, Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
			Qx > Zx && (Qx = 0, $x = null, console.error("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.")), e.alternate === null && e.flags & 4098 && Hl(e);
			for (var t = e, n = t.return; n !== null;) t.alternate === null && t.flags & 4098 && Hl(e), t = n, n = t.return;
			return t.tag === 3 ? t.stateNode : null;
		}
		function hr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e : t.current;
		}
		function gr(e) {
			if (Pg === null) return e;
			var t = Pg(e);
			return t === void 0 ? e != null && typeof e.render == "function" && (t = hr(e.render), e.render !== t) ? (t = {
				$$typeof: Ff,
				render: t
			}, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
		}
		function _r(e, t) {
			if (Pg === null) return !1;
			var n = e.elementType;
			t = t.type;
			var r = !1, i = typeof t == "object" && t ? t.$$typeof : null;
			switch (e.tag) {
				case 1:
					typeof t == "function" && (r = !0);
					break;
				case 0:
					(typeof t == "function" || i === zf) && (r = !0);
					break;
				case 11:
					(i === Ff || i === zf) && (r = !0);
					break;
				case 14:
				case 15:
					(i === Rf || i === zf) && (r = !0);
					break;
				default: return !1;
			}
			return !!(r && (e = Pg(n), e !== void 0 && e === Pg(t)));
		}
		function vr(e) {
			Pg !== null && typeof WeakSet == "function" && (Fg === null && (Fg = /* @__PURE__ */ new WeakSet()), Fg.add(e));
		}
		function yr(e, t, n) {
			do {
				var r = e, i = r.alternate, a = r.child, o = r.sibling, s = r.tag;
				r = r.type;
				var c = null;
				switch (s) {
					case 0:
					case 15:
					case 1:
						c = r;
						break;
					case 11: c = r.render;
				}
				if (Pg === null) throw Error("Expected resolveFamily to be set during hot reload.");
				var l = !1;
				if (r = !1, c !== null && (c = Pg(c), c !== void 0 && (n.has(c) ? r = !0 : t.has(c) && (s === 1 ? r = !0 : l = !0))), Fg !== null && (Fg.has(e) || i !== null && Fg.has(i)) && (r = !0), r && (e._debugNeedsRemount = !0), (r || l) && (i = fr(e, 2), i !== null && $c(i, e, 2)), a === null || r || yr(a, t, n), o === null) break;
				e = o;
			} while (1);
		}
		function br(e, t, n, r) {
			this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, Bg || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
		}
		function xr(e) {
			return e = e.prototype, !(!e || !e.isReactComponent);
		}
		function Sr(e, t) {
			var n = e.alternate;
			switch (n === null ? (n = h(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
				case 0:
				case 15:
					n.type = hr(e.type);
					break;
				case 1:
					n.type = hr(e.type);
					break;
				case 11: n.type = gr(e.type);
			}
			return n;
		}
		function Cr(e, t) {
			e.flags &= 65011714;
			var n = e.alternate;
			return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
				lanes: t.lanes,
				firstContext: t.firstContext,
				_debugThenableState: t._debugThenableState
			}, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
		}
		function wr(e, t, n, r, i, a) {
			var o = 0, s = e;
			if (typeof e == "function") xr(e) && (o = 1), s = hr(s);
			else if (typeof e == "string") o = D(), o = Vd(e, n, o) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
			else a: switch (e) {
				case Bf: return t = h(31, n, t, i), t.elementType = Bf, t.lanes = a, t;
				case Af: return Er(n.children, i, a, t);
				case jf:
					o = 8, i |= Lg, i |= Rg;
					break;
				case Mf: return e = n, r = i, typeof e.id != "string" && console.error("Profiler must specify an \"id\" of type `string` as a prop. Received the type `%s` instead.", typeof e.id), t = h(12, e, t, r | K), t.elementType = Mf, t.lanes = a, t.stateNode = {
					effectDuration: 0,
					passiveEffectDuration: 0
				}, t;
				case If: return t = h(13, n, t, i), t.elementType = If, t.lanes = a, t;
				case Lf: return t = h(19, n, t, i), t.elementType = Lf, t.lanes = a, t;
				default:
					if (typeof e == "object" && e) switch (e.$$typeof) {
						case Pf:
							o = 10;
							break a;
						case Nf:
							o = 9;
							break a;
						case Ff:
							o = 11, s = gr(s);
							break a;
						case Rf:
							o = 14;
							break a;
						case zf:
							o = 16, s = null;
							break a;
					}
					s = "", (e === void 0 || typeof e == "object" && e && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Wf(e) ? n = "array" : e !== void 0 && e.$$typeof === Of ? (n = "<" + (C(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (o = r ? ae(r) : null) && (s += "\n\nCheck the render method of `" + o + "`."), o = 29, n = Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + s)), s = null;
			}
			return t = h(o, n, t, i), t.elementType = e, t.type = s, t.lanes = a, t._debugOwner = r, t;
		}
		function Tr(e, t, n) {
			return t = wr(e.type, e.key, e.props, e._owner, t, n), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
		}
		function Er(e, t, n, r) {
			return e = h(7, e, r, t), e.lanes = n, e;
		}
		function Dr(e, t, n) {
			return e = h(6, e, null, t), e.lanes = n, e;
		}
		function Or(e) {
			var t = h(18, null, null, G);
			return t.stateNode = e, t;
		}
		function kr(e, t, n) {
			return t = h(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation
			}, t;
		}
		function Ar(e, t) {
			if (typeof e == "object" && e) {
				var n = Hg.get(e);
				return n === void 0 ? (t = {
					value: e,
					source: t,
					stack: _e(t)
				}, Hg.set(e, t), t) : n;
			}
			return {
				value: e,
				source: t,
				stack: _e(t)
			};
		}
		function jr(e, t) {
			Lr(), Ug[Wg++] = Kg, Ug[Wg++] = Gg, Gg = e, Kg = t;
		}
		function Mr(e, t, n) {
			Lr(), qg[Jg++] = Xg, qg[Jg++] = Zg, qg[Jg++] = Yg, Yg = e;
			var r = Xg;
			e = Zg;
			var i = 32 - Mp(r) - 1;
			r &= ~(1 << i), n += 1;
			var a = 32 - Mp(t) + i;
			if (30 < a) {
				var o = i - i % 5;
				a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Xg = 1 << 32 - Mp(t) + i | n << i | r, Zg = a + e;
			} else Xg = 1 << a | n << i | r, Zg = e;
		}
		function Nr(e) {
			Lr(), e.return !== null && (jr(e, 1), Mr(e, 1, 0));
		}
		function Pr(e) {
			for (; e === Gg;) Gg = Ug[--Wg], Ug[Wg] = null, Kg = Ug[--Wg], Ug[Wg] = null;
			for (; e === Yg;) Yg = qg[--Jg], qg[Jg] = null, Zg = qg[--Jg], qg[Jg] = null, Xg = qg[--Jg], qg[Jg] = null;
		}
		function Fr() {
			return Lr(), Yg === null ? null : {
				id: Xg,
				overflow: Zg
			};
		}
		function Ir(e, t) {
			Lr(), qg[Jg++] = Xg, qg[Jg++] = Zg, qg[Jg++] = Yg, Xg = t.id, Zg = t.overflow, Yg = e;
		}
		function Lr() {
			e_ || console.error("Expected to be hydrating. This is a bug in React. Please file an issue.");
		}
		function Rr(e, t) {
			if (e.return === null) {
				if (n_ === null) n_ = {
					fiber: e,
					children: [],
					serverProps: void 0,
					serverTail: [],
					distanceFromLeaf: t
				};
				else {
					if (n_.fiber !== e) throw Error("Saw multiple hydration diff roots in a pass. This is a bug in React.");
					n_.distanceFromLeaf > t && (n_.distanceFromLeaf = t);
				}
				return n_;
			}
			var n = Rr(e.return, t + 1).children;
			return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
				fiber: e,
				children: [],
				serverProps: void 0,
				serverTail: [],
				distanceFromLeaf: t
			}, n.push(t), t);
		}
		function zr() {
			e_ && console.error("We should not be hydrating here. This is a bug in React. Please file a bug.");
		}
		function Br(e, t) {
			t_ || (e = Rr(e, 0), e.serverProps = null, t !== null && (t = gd(t), e.serverTail.push(t)));
		}
		function Vr(e) {
			var t = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : !1, n = "", r = n_;
			throw r !== null && (n_ = null, n = Bt(r)), qr(Ar(Error("Hydration failed because the server rendered " + (t ? "text" : "HTML") + " didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + n), e)), a_;
		}
		function Hr(e) {
			var t = e.stateNode, n = e.type, r = e.memoizedProps;
			switch (t[Up] = e, t[Wp] = r, mu(n, r), n) {
				case "dialog":
					V("cancel", t), V("close", t);
					break;
				case "iframe":
				case "object":
				case "embed":
					V("load", t);
					break;
				case "video":
				case "audio":
					for (n = 0; n < pS.length; n++) V(pS[n], t);
					break;
				case "source":
					V("error", t);
					break;
				case "img":
				case "image":
				case "link":
					V("error", t), V("load", t);
					break;
				case "details":
					V("toggle", t);
					break;
				case "input":
					tt("input", r), V("invalid", t), mt(t, r), gt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
					break;
				case "option":
					vt(t, r);
					break;
				case "select":
					tt("select", r), V("invalid", t), xt(t, r);
					break;
				case "textarea": tt("textarea", r), V("invalid", t), St(t, r), wt(t, r.value, r.defaultValue, r.children);
			}
			n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || bu(t.textContent, n) ? (r.popover != null && (V("beforetoggle", t), V("toggle", t)), r.onScroll != null && V("scroll", t), r.onScrollEnd != null && V("scrollend", t), r.onClick != null && (t.onclick = on), t = !0) : t = !1, t || Vr(e, !0);
		}
		function Ur(e) {
			for (Qg = e.return; Qg;) switch (Qg.tag) {
				case 5:
				case 31:
				case 13:
					i_ = !1;
					return;
				case 27:
				case 3:
					i_ = !0;
					return;
				default: Qg = Qg.return;
			}
		}
		function Wr(e) {
			if (e !== Qg) return !1;
			if (!e_) return Ur(e), e_ = !0, !1;
			var t = e.tag, n;
			if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Bu(e.type, e.memoizedProps)), n = !n), n && $g) {
				for (n = $g; n;) {
					var r = Rr(e, 0), i = gd(n);
					r.serverTail.push(i), n = i.type === "Suspense" ? vd(n) : hd(n.nextSibling);
				}
				Vr(e);
			}
			if (Ur(e), t === 13) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				$g = vd(e);
			} else if (t === 31) {
				if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
				$g = vd(e);
			} else t === 27 ? (t = $g, Zu(e.type) ? (e = rC, rC = null, $g = e) : $g = t) : $g = Qg ? hd(e.stateNode.nextSibling) : null;
			return !0;
		}
		function Gr() {
			$g = Qg = null, t_ = e_ = !1;
		}
		function Kr() {
			var e = r_;
			return e !== null && (hx === null ? hx = e : hx.push.apply(hx, e), r_ = null), e;
		}
		function qr(e) {
			r_ === null ? r_ = [e] : r_.push(e);
		}
		function Jr() {
			var e = n_;
			if (e !== null) {
				n_ = null;
				for (var t = Bt(e); 0 < e.children.length;) e = e.children[0];
				A(e.fiber, function() {
					console.error("A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s", "https://react.dev/link/hydration-mismatch", t);
				});
			}
		}
		function Yr() {
			u_ = l_ = null, d_ = !1;
		}
		function Xr(e, t, n) {
			T(o_, t._currentValue, e), t._currentValue = n, T(s_, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== c_ && console.error("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = c_;
		}
		function Zr(e, t) {
			e._currentValue = o_.current;
			var n = s_.current;
			se(s_, t), e._currentRenderer = n, se(o_, t);
		}
		function Qr(e, t, n) {
			for (; e !== null;) {
				var r = e.alternate;
				if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
				e = e.return;
			}
			e !== n && console.error("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
		}
		function $r(e, t, n, r) {
			var i = e.child;
			for (i !== null && (i.return = e); i !== null;) {
				var a = i.dependencies;
				if (a !== null) {
					var o = i.child;
					a = a.firstContext;
					a: for (; a !== null;) {
						var s = a;
						a = i;
						for (var c = 0; c < t.length; c++) if (s.context === t[c]) {
							a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Qr(a.return, n, e), r || (o = null);
							break a;
						}
						a = s.next;
					}
				} else if (i.tag === 18) {
					if (o = i.return, o === null) throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");
					o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Qr(o, n, e), o = null;
				} else o = i.child;
				if (o !== null) o.return = i;
				else for (o = i; o !== null;) {
					if (o === e) {
						o = null;
						break;
					}
					if (i = o.sibling, i !== null) {
						i.return = o.return, o = i;
						break;
					}
					o = o.return;
				}
				i = o;
			}
		}
		function ei(e, t, n, r) {
			e = null;
			for (var i = t, a = !1; i !== null;) {
				if (!a) {
					if (i.flags & 524288) a = !0;
					else if (i.flags & 262144) break;
				}
				if (i.tag === 10) {
					var o = i.alternate;
					if (o === null) throw Error("Should have a current fiber. This is a bug in React.");
					if (o = o.memoizedProps, o !== null) {
						var s = i.type;
						Vh(i.pendingProps.value, o.value) || (e === null ? e = [s] : e.push(s));
					}
				} else if (i === $f.current) {
					if (o = i.alternate, o === null) throw Error("Should have a current fiber. This is a bug in React.");
					o.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [xC] : e.push(xC));
				}
				i = i.return;
			}
			e !== null && $r(t, e, n, r), t.flags |= 262144;
		}
		function ti(e) {
			for (e = e.firstContext; e !== null;) {
				if (!Vh(e.context._currentValue, e.memoizedValue)) return !0;
				e = e.next;
			}
			return !1;
		}
		function ni(e) {
			l_ = e, u_ = null, e = e.dependencies, e !== null && (e.firstContext = null);
		}
		function ri(e) {
			return d_ && console.error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."), ai(l_, e);
		}
		function ii(e, t) {
			return l_ === null && ni(e), ai(e, t);
		}
		function ai(e, t) {
			var n = t._currentValue;
			if (t = {
				context: t,
				memoizedValue: n,
				next: null
			}, u_ === null) {
				if (e === null) throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
				u_ = t, e.dependencies = {
					lanes: 0,
					firstContext: t,
					_debugThenableState: null
				}, e.flags |= 524288;
			} else u_ = u_.next = t;
			return n;
		}
		function oi() {
			return {
				controller: new f_(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function si(e) {
			e.controller.signal.aborted && console.warn("A cache instance was retained after it was already freed. This likely indicates a bug in React."), e.refCount++;
		}
		function ci(e) {
			e.refCount--, 0 > e.refCount && console.warn("A cache instance was released after it was already freed. This likely indicates a bug in React."), e.refCount === 0 && p_(m_, function() {
				e.controller.abort();
			});
		}
		function li(e, t, n) {
			e & 127 ? 0 > A_ && (A_ = g_(), j_ = __(t), N_ = t, n != null && (P_ = w(n)), (Wb & (Fb | Ib)) !== Pb && (O_ = !0, M_ = v_), e = Uu(), t = Hu(), e !== L_ || t !== I_ ? L_ = -1.1 : t !== null && (M_ = v_), F_ = e, I_ = t) : e & 4194048 && 0 > V_ && (V_ = g_(), U_ = __(t), W_ = t, n != null && (G_ = w(n)), 0 > B_) && (e = Uu(), t = Hu(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function ui(e) {
			if (0 > A_) {
				A_ = g_(), j_ = e._debugTask == null ? null : e._debugTask, (Wb & (Fb | Ib)) !== Pb && (M_ = v_);
				var t = Uu(), n = Hu();
				t !== L_ || n !== I_ ? L_ = -1.1 : n !== null && (M_ = v_), F_ = t, I_ = n;
			}
			0 > V_ && (V_ = g_(), U_ = e._debugTask == null ? null : e._debugTask, 0 > B_) && (e = Uu(), t = Hu(), (e !== J_ || t !== q_) && (J_ = -1.1), K_ = e, q_ = t);
		}
		function di() {
			var e = T_;
			return T_ = 0, e;
		}
		function fi(e) {
			var t = T_;
			return T_ = e, t;
		}
		function pi(e) {
			var t = T_;
			return T_ += e, t;
		}
		function mi() {
			J = q = -1.1;
		}
		function hi() {
			var e = q;
			return q = -1.1, e;
		}
		function gi(e) {
			0 <= e && (q = e);
		}
		function _i() {
			var e = E_;
			return E_ = -0, e;
		}
		function vi(e) {
			0 <= e && (E_ = e);
		}
		function yi() {
			var e = D_;
			return D_ = null, e;
		}
		function bi() {
			var e = O_;
			return O_ = !1, e;
		}
		function xi(e) {
			w_ = g_(), 0 > e.actualStartTime && (e.actualStartTime = w_);
		}
		function Si(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, e.selfBaseDuration = t, w_ = -1;
			}
		}
		function Ci(e) {
			if (0 <= w_) {
				var t = g_() - w_;
				e.actualDuration += t, w_ = -1;
			}
		}
		function wi() {
			if (0 <= w_) {
				var e = g_(), t = e - w_;
				w_ = -1, T_ += t, E_ += t, J = e;
			}
		}
		function Ti(e) {
			D_ === null && (D_ = []), D_.push(e), C_ === null && (C_ = []), C_.push(e);
		}
		function Ei() {
			w_ = g_(), 0 > q && (q = w_);
		}
		function Di(e) {
			for (var t = e.child; t;) e.actualDuration += t.actualDuration, t = t.sibling;
		}
		function Oi(e, t) {
			if (iv === null) {
				var n = iv = [];
				av = 0, ov = eu(), sv = {
					status: "pending",
					value: void 0,
					then: function(e) {
						n.push(e);
					}
				};
			}
			return av++, t.then(ki, ki), t;
		}
		function ki() {
			if (--av === 0 && (-1 < V_ || (B_ = -1.1), iv !== null)) {
				sv !== null && (sv.status = "fulfilled");
				var e = iv;
				iv = null, ov = 0, sv = null;
				for (var t = 0; t < e.length; t++) (0, e[t])();
			}
		}
		function Ai(e, t) {
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
		function ji() {
			var e = lv.current;
			return e === null ? Gb.pooledCache : e;
		}
		function Mi(e, t) {
			t === null ? T(lv, lv.current, e) : T(lv, t.pool, e);
		}
		function Ni() {
			var e = ji();
			return e === null ? null : {
				parent: h_._currentValue,
				pool: e
			};
		}
		function Pi() {
			return {
				didWarnAboutUncachedPromise: !1,
				thenables: []
			};
		}
		function Fi(e) {
			return e = e.status, e === "fulfilled" || e === "rejected";
		}
		function Ii(e, t, n) {
			W.actQueue !== null && (W.didUsePromise = !0);
			var r = e.thenables;
			if (n = r[n], n === void 0 ? r.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error("A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.")), t.then(on, on), t = n), t._debugInfo === void 0) {
				e = performance.now(), r = t.displayName;
				var i = {
					name: typeof r == "string" ? r : "Promise",
					start: e,
					end: e,
					value: t
				};
				t._debugInfo = [{ awaited: i }], t.status !== "fulfilled" && t.status !== "rejected" && (e = function() {
					i.end = performance.now();
				}, t.then(e, e));
			}
			switch (t.status) {
				case "fulfilled": return t.value;
				case "rejected": throw e = t.reason, zi(e), e;
				default:
					if (typeof t.status == "string") t.then(on, on);
					else {
						if (e = Gb, e !== null && 100 < e.shellSuspendCounter) throw Error("An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
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
						case "rejected": throw e = t.reason, zi(e), e;
					}
					throw Hv = t, Uv = !0, Rv;
			}
		}
		function Li(e) {
			try {
				return Lv(e);
			} catch (e) {
				throw typeof e == "object" && e && typeof e.then == "function" ? (Hv = e, Uv = !0, Rv) : e;
			}
		}
		function Ri() {
			if (Hv === null) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
			var e = Hv;
			return Hv = null, Uv = !1, e;
		}
		function zi(e) {
			if (e === Rv || e === Bv) throw Error("Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.");
		}
		function Bi(e) {
			var t = Y;
			return e != null && (Y = t === null ? e : t.concat(e)), t;
		}
		function Vi() {
			var e = Y;
			if (e != null) {
				for (var t = e.length - 1; 0 <= t; t--) if (e[t].name != null) {
					var n = e[t].debugTask;
					if (n != null) return n;
				}
			}
			return null;
		}
		function M(e, t, n) {
			for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
				var a = r[i];
				if (a !== "children" && a !== "key") {
					t === null && (t = Tr(e, n.mode, 0), t._debugInfo = Y, t.return = n), A(t, function(e) {
						console.error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", e);
					}, a);
					break;
				}
			}
		}
		function Hi(e) {
			var t = Gv;
			return Gv += 1, Wv === null && (Wv = Pi()), Ii(Wv, e, t);
		}
		function Ui(e, t) {
			t = t.props.ref, e.ref = t === void 0 ? null : t;
		}
		function Wi(e, t) {
			throw t.$$typeof === Df ? Error("A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the \"react\" package is used.\n- A library pre-bundled an old copy of \"react\" or \"react/jsx-runtime\".\n- A compiler tries to \"inline\" JSX instead of using the runtime.") : (e = Object.prototype.toString.call(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."));
		}
		function Gi(e, t) {
			var n = Vi();
			n === null ? Wi(e, t) : n.run(Wi.bind(null, e, t));
		}
		function Ki(e, t) {
			var n = w(e) || "Component";
			Yv[n] || (Yv[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)", t, t, t) : console.error("Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>", t, t, n, t, n));
		}
		function qi(e, t) {
			var n = Vi();
			n === null ? Ki(e, t) : n.run(Ki.bind(null, e, t));
		}
		function Ji(e, t) {
			var n = w(e) || "Component";
			Xv[n] || (Xv[n] = !0, t = String(t), e.tag === 3 ? console.error("Symbols are not valid as a React child.\n  root.render(%s)", t) : console.error("Symbols are not valid as a React child.\n  <%s>%s</%s>", n, t, n));
		}
		function Yi(e, t) {
			var n = Vi();
			n === null ? Ji(e, t) : n.run(Ji.bind(null, e, t));
		}
		function Xi(e) {
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
				return e = Sr(e, t), e.index = 0, e.sibling = null, e;
			}
			function a(t, n, r) {
				return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
			}
			function o(t) {
				return e && t.alternate === null && (t.flags |= 67108866), t;
			}
			function s(e, t, n, r) {
				return t === null || t.tag !== 6 ? (t = Dr(n, e.mode, r), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function c(e, t, n, r) {
				var a = n.type;
				return a === Af ? (t = u(e, t, n.props.children, r, n.key), M(n, t, e), t) : t !== null && (t.elementType === a || _r(t, n) || typeof a == "object" && a && a.$$typeof === zf && Li(a) === t.type) ? (t = i(t, n.props), Ui(t, n), t.return = e, t._debugOwner = n._owner, t._debugInfo = Y, t) : (t = Tr(n, e.mode, r), Ui(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function l(e, t, n, r) {
				return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = kr(n, e.mode, r), t.return = e, t._debugInfo = Y, t) : (t = i(t, n.children || []), t.return = e, t._debugInfo = Y, t);
			}
			function u(e, t, n, r, a) {
				return t === null || t.tag !== 7 ? (t = Er(n, e.mode, r, a), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t) : (t = i(t, n), t.return = e, t._debugInfo = Y, t);
			}
			function d(e, t, n) {
				if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Dr("" + t, e.mode, n), t.return = e, t._debugOwner = e, t._debugTask = e._debugTask, t._debugInfo = Y, t;
				if (typeof t == "object" && t) {
					switch (t.$$typeof) {
						case Of: return n = Tr(t, e.mode, n), Ui(n, t), n.return = e, e = Bi(t._debugInfo), n._debugInfo = Y, Y = e, n;
						case kf: return t = kr(t, e.mode, n), t.return = e, t._debugInfo = Y, t;
						case zf:
							var r = Bi(t._debugInfo);
							return t = Li(t), e = d(e, t, n), Y = r, e;
					}
					if (Wf(t) || ie(t)) return n = Er(t, e.mode, n, null), n.return = e, n._debugOwner = e, n._debugTask = e._debugTask, e = Bi(t._debugInfo), n._debugInfo = Y, Y = e, n;
					if (typeof t.then == "function") return r = Bi(t._debugInfo), e = d(e, Hi(t), n), Y = r, e;
					if (t.$$typeof === Pf) return d(e, ii(e, t), n);
					Gi(e, t);
				}
				return typeof t == "function" && qi(e, t), typeof t == "symbol" && Yi(e, t), null;
			}
			function p(e, t, n, r) {
				var i = t === null ? null : t.key;
				if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? s(e, t, "" + n, r) : null;
				if (typeof n == "object" && n) {
					switch (n.$$typeof) {
						case Of: return n.key === i ? (i = Bi(n._debugInfo), e = c(e, t, n, r), Y = i, e) : null;
						case kf: return n.key === i ? l(e, t, n, r) : null;
						case zf: return i = Bi(n._debugInfo), n = Li(n), e = p(e, t, n, r), Y = i, e;
					}
					if (Wf(n) || ie(n)) return i === null ? (i = Bi(n._debugInfo), e = u(e, t, n, r, null), Y = i, e) : null;
					if (typeof n.then == "function") return i = Bi(n._debugInfo), e = p(e, t, Hi(n), r), Y = i, e;
					if (n.$$typeof === Pf) return p(e, t, ii(e, n), r);
					Gi(e, n);
				}
				return typeof n == "function" && qi(e, n), typeof n == "symbol" && Yi(e, n), null;
			}
			function m(e, t, n, r, i) {
				if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, s(t, e, "" + r, i);
				if (typeof r == "object" && r) {
					switch (r.$$typeof) {
						case Of: return n = e.get(r.key === null ? n : r.key) || null, e = Bi(r._debugInfo), t = c(t, n, r, i), Y = e, t;
						case kf: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
						case zf:
							var a = Bi(r._debugInfo);
							return r = Li(r), t = m(e, t, n, r, i), Y = a, t;
					}
					if (Wf(r) || ie(r)) return n = e.get(n) || null, e = Bi(r._debugInfo), t = u(t, n, r, i, null), Y = e, t;
					if (typeof r.then == "function") return a = Bi(r._debugInfo), t = m(e, t, n, Hi(r), i), Y = a, t;
					if (r.$$typeof === Pf) return m(e, t, n, ii(t, r), i);
					Gi(t, r);
				}
				return typeof r == "function" && qi(t, r), typeof r == "symbol" && Yi(t, r), null;
			}
			function g(e, t, n, r) {
				if (typeof n != "object" || !n) return r;
				switch (n.$$typeof) {
					case Of:
					case kf:
						f(e, t, n);
						var i = n.key;
						if (typeof i != "string") break;
						if (r === null) {
							r = /* @__PURE__ */ new Set(), r.add(i);
							break;
						}
						if (!r.has(i)) {
							r.add(i);
							break;
						}
						A(t, function() {
							console.error("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", i);
						});
						break;
					case zf: n = Li(n), g(e, t, n, r);
				}
				return r;
			}
			function _(i, o, s, c) {
				for (var l = null, u = null, f = null, h = o, _ = o = 0, v = null; h !== null && _ < s.length; _++) {
					h.index > _ ? (v = h, h = null) : v = h.sibling;
					var y = p(i, h, s[_], c);
					if (y === null) {
						h === null && (h = v);
						break;
					}
					l = g(i, y, s[_], l), e && h && y.alternate === null && t(i, h), o = a(y, o, _), f === null ? u = y : f.sibling = y, f = y, h = v;
				}
				if (_ === s.length) return n(i, h), e_ && jr(i, _), u;
				if (h === null) {
					for (; _ < s.length; _++) h = d(i, s[_], c), h !== null && (l = g(i, h, s[_], l), o = a(h, o, _), f === null ? u = h : f.sibling = h, f = h);
					return e_ && jr(i, _), u;
				}
				for (h = r(h); _ < s.length; _++) v = m(h, i, _, s[_], c), v !== null && (l = g(i, v, s[_], l), e && v.alternate !== null && h.delete(v.key === null ? _ : v.key), o = a(v, o, _), f === null ? u = v : f.sibling = v, f = v);
				return e && h.forEach(function(e) {
					return t(i, e);
				}), e_ && jr(i, _), u;
			}
			function v(i, o, s, c) {
				if (s == null) throw Error("An iterable object provided no iterator.");
				for (var l = null, u = null, f = o, h = o = 0, _ = null, v = null, y = s.next(); f !== null && !y.done; h++, y = s.next()) {
					f.index > h ? (_ = f, f = null) : _ = f.sibling;
					var b = p(i, f, y.value, c);
					if (b === null) {
						f === null && (f = _);
						break;
					}
					v = g(i, b, y.value, v), e && f && b.alternate === null && t(i, f), o = a(b, o, h), u === null ? l = b : u.sibling = b, u = b, f = _;
				}
				if (y.done) return n(i, f), e_ && jr(i, h), l;
				if (f === null) {
					for (; !y.done; h++, y = s.next()) f = d(i, y.value, c), f !== null && (v = g(i, f, y.value, v), o = a(f, o, h), u === null ? l = f : u.sibling = f, u = f);
					return e_ && jr(i, h), l;
				}
				for (f = r(f); !y.done; h++, y = s.next()) _ = m(f, i, h, y.value, c), _ !== null && (v = g(i, _, y.value, v), e && _.alternate !== null && f.delete(_.key === null ? h : _.key), o = a(_, o, h), u === null ? l = _ : u.sibling = _, u = _);
				return e && f.forEach(function(e) {
					return t(i, e);
				}), e_ && jr(i, h), l;
			}
			function y(e, r, a, s) {
				if (typeof a == "object" && a && a.type === Af && a.key === null && (M(a, null, e), a = a.props.children), typeof a == "object" && a) {
					switch (a.$$typeof) {
						case Of:
							var c = Bi(a._debugInfo);
							a: {
								for (var l = a.key; r !== null;) {
									if (r.key === l) {
										if (l = a.type, l === Af) {
											if (r.tag === 7) {
												n(e, r.sibling), s = i(r, a.props.children), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, M(a, s, e), e = s;
												break a;
											}
										} else if (r.elementType === l || _r(r, a) || typeof l == "object" && l && l.$$typeof === zf && Li(l) === r.type) {
											n(e, r.sibling), s = i(r, a.props), Ui(s, a), s.return = e, s._debugOwner = a._owner, s._debugInfo = Y, e = s;
											break a;
										}
										n(e, r);
										break;
									} else t(e, r);
									r = r.sibling;
								}
								a.type === Af ? (s = Er(a.props.children, e.mode, s, a.key), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, M(a, s, e), e = s) : (s = Tr(a, e.mode, s), Ui(s, a), s.return = e, s._debugInfo = Y, e = s);
							}
							return e = o(e), Y = c, e;
						case kf:
							a: {
								for (c = a, a = c.key; r !== null;) {
									if (r.key === a) if (r.tag === 4 && r.stateNode.containerInfo === c.containerInfo && r.stateNode.implementation === c.implementation) {
										n(e, r.sibling), s = i(r, c.children || []), s.return = e, e = s;
										break a;
									} else {
										n(e, r);
										break;
									}
									else t(e, r);
									r = r.sibling;
								}
								s = kr(c, e.mode, s), s.return = e, e = s;
							}
							return o(e);
						case zf: return c = Bi(a._debugInfo), a = Li(a), e = y(e, r, a, s), Y = c, e;
					}
					if (Wf(a)) return c = Bi(a._debugInfo), e = _(e, r, a, s), Y = c, e;
					if (ie(a)) {
						if (c = Bi(a._debugInfo), l = ie(a), typeof l != "function") throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
						var u = l.call(a);
						return u === a ? (e.tag !== 0 || Object.prototype.toString.call(e.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(u) !== "[object Generator]") && (qv || console.error("Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."), qv = !0) : a.entries !== l || Kv || (console.error("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Kv = !0), e = v(e, r, u, s), Y = c, e;
					}
					if (typeof a.then == "function") return c = Bi(a._debugInfo), e = y(e, r, Hi(a), s), Y = c, e;
					if (a.$$typeof === Pf) return y(e, r, ii(e, a), s);
					Gi(e, a);
				}
				return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (c = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), s = i(r, c), s.return = e, e = s) : (n(e, r), s = Dr(c, e.mode, s), s.return = e, s._debugOwner = e, s._debugTask = e._debugTask, s._debugInfo = Y, e = s), o(e)) : (typeof a == "function" && qi(e, a), typeof a == "symbol" && Yi(e, a), n(e, r));
			}
			return function(e, t, n, r) {
				var i = Y;
				Y = null;
				try {
					Gv = 0;
					var a = y(e, t, n, r);
					return Wv = null, a;
				} catch (t) {
					if (t === Rv || t === Bv) throw t;
					var o = h(29, t, null, e.mode);
					o.lanes = r, o.return = e;
					var s = o._debugInfo = Y;
					if (o._debugOwner = e._debugOwner, o._debugTask = e._debugTask, s != null) {
						for (var c = s.length - 1; 0 <= c; c--) if (typeof s[c].stack == "string") {
							o._debugOwner = s[c], o._debugTask = s[c].debugTask;
							break;
						}
					}
					return o;
				} finally {
					Y = i;
				}
			};
		}
		function Zi(e, t) {
			var n = Wf(e);
			return e = !n && typeof ie(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", n, t, n), !1) : !0;
		}
		function Qi(e) {
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
		function $i(e, t) {
			e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				callbacks: null
			});
		}
		function ea(e) {
			return {
				lane: e,
				tag: $v,
				payload: null,
				callback: null,
				next: null
			};
		}
		function ta(e, t, n) {
			var r = e.updateQueue;
			if (r === null) return null;
			if (r = r.shared, ay === r && !iy) {
				var i = w(e);
				console.error("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s", i), iy = !0;
			}
			return (Wb & Fb) === Pb ? (ur(e, r, t, n), mr(e)) : (i = r.pending, i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = mr(e), pr(e, null, n), t);
		}
		function na(e, t, n) {
			if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, ze(e, n);
			}
		}
		function ra(e, t) {
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
		function ia() {
			if (oy) {
				var e = sv;
				if (e !== null) throw e;
			}
		}
		function aa(e, t, n, r) {
			oy = !1;
			var i = e.updateQueue;
			ry = !1, ay = i.shared;
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
					if (p ? ($ & f) === f : (r & f) === f) {
						f !== 0 && f === ov && (oy = !0), u !== null && (u = u.next = {
							lane: 0,
							tag: s.tag,
							payload: s.payload,
							callback: null,
							next: null
						});
						a: {
							f = e;
							var m = s, h = t, g = n;
							switch (m.tag) {
								case ey:
									if (m = m.payload, typeof m == "function") {
										d_ = !0;
										var _ = m.call(g, d, h);
										if (f.mode & Lg) {
											Oe(!0);
											try {
												m.call(g, d, h);
											} finally {
												Oe(!1);
											}
										}
										d_ = !1, d = _;
										break a;
									}
									d = m;
									break a;
								case ny: f.flags = f.flags & -65537 | 128;
								case $v:
									if (_ = m.payload, typeof _ == "function") {
										if (d_ = !0, m = _.call(g, d, h), f.mode & Lg) {
											Oe(!0);
											try {
												_.call(g, d, h);
											} finally {
												Oe(!1);
											}
										}
										d_ = !1;
									} else m = _;
									if (m == null) break a;
									d = U({}, d, m);
									break a;
								case ty: ry = !0;
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
				u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), lx |= o, e.lanes = o, e.memoizedState = d;
			}
			ay = null;
		}
		function N(e, t) {
			if (typeof e != "function") throw Error("Invalid argument passed as callback. Expected a function. Instead received: " + e);
			e.call(t);
		}
		function oa(e, t) {
			var n = e.shared.hiddenCallbacks;
			if (n !== null) for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++) N(n[e], t);
		}
		function sa(e, t) {
			var n = e.callbacks;
			if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) N(n[e], t);
		}
		function ca(e, t) {
			var n = sx;
			T(cy, n, e), T(sy, t, e), sx = n | t.baseLanes;
		}
		function la(e) {
			T(cy, sx, e), T(sy, sy.current, e);
		}
		function ua(e) {
			sx = cy.current, se(sy, e), se(cy, e);
		}
		function da(e) {
			var t = e.alternate;
			T(py, py.current & dy, e), T(ly, e, e), uy === null && (t === null || sy.current !== null || t.memoizedState !== null) && (uy = e);
		}
		function fa(e) {
			T(py, py.current, e), T(ly, e, e), uy === null && (uy = e);
		}
		function pa(e) {
			e.tag === 22 ? (T(py, py.current, e), T(ly, e, e), uy === null && (uy = e)) : ma(e);
		}
		function ma(e) {
			T(py, py.current, e), T(ly, ly.current, e);
		}
		function ha(e) {
			se(ly, e), uy === e && (uy = null), se(py, e);
		}
		function ga(e) {
			for (var t = e; t !== null;) {
				if (t.tag === 13) {
					var n = t.memoizedState;
					if (n !== null && (n = n.dehydrated, n === null || fd(n) || pd(n))) return t;
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
		function P() {
			var e = Z;
			Fy === null ? Fy = [e] : Fy.push(e);
		}
		function F() {
			var e = Z;
			if (Fy !== null && (Iy++, Fy[Iy] !== e)) {
				var t = w(X);
				if (!by.has(t) && (by.add(t), Fy !== null)) {
					for (var n = "", r = 0; r <= Iy; r++) {
						var i = Fy[r], a = r === Iy ? e : i;
						for (i = r + 1 + ". " + i; 30 > i.length;) i += " ";
						i += a + "\n", n += i;
					}
					console.error("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n", t, n);
				}
			}
		}
		function _a(e) {
			e == null || Wf(e) || console.error("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", Z, typeof e);
		}
		function va() {
			var e = w(X);
			Cy.has(e) || (Cy.add(e), console.error("ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.", e));
		}
		function ya() {
			throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
		}
		function ba(e, t) {
			if (Ly) return !1;
			if (t === null) return console.error("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", Z), !1;
			e.length !== t.length && console.error("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s", Z, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
			for (var n = 0; n < t.length && n < e.length; n++) if (!Vh(e[n], t[n])) return !1;
			return !0;
		}
		function xa(e, t, n, r, i, a) {
			wy = a, X = t, Fy = e === null ? null : e._debugHookTypes, Iy = -1, Ly = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (a = w(X), Sy.has(a) || (Sy.add(a), console.error("%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.", a === null ? "An unknown Component" : "<" + a + ">"))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, W.H = e !== null && e.memoizedState !== null ? Vy : Fy === null ? zy : By, ky = a = (t.mode & Lg) !== G;
			var o = xv(n, r, i);
			if (ky = !1, Oy && (o = Ca(t, n, r, i)), a) {
				Oe(!0);
				try {
					o = Ca(t, n, r, i);
				} finally {
					Oe(!1);
				}
			}
			return Sa(e, t), o;
		}
		function Sa(e, t) {
			t._debugHookTypes = Fy, t.dependencies === null ? My !== null && (t.dependencies = {
				lanes: 0,
				firstContext: null,
				_debugThenableState: My
			}) : t.dependencies._debugThenableState = My, W.H = Ry;
			var n = Ty !== null && Ty.next !== null;
			if (wy = 0, Fy = Z = Ey = Ty = X = null, Iy = -1, e !== null && (e.flags & 65011712) != (t.flags & 65011712) && console.error("Internal React error: Expected static flag was missing. Please notify the React team."), Dy = !1, jy = 0, My = null, n) throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
			e === null || sb || (e = e.dependencies, e !== null && ti(e) && (sb = !0)), Uv ? (Uv = !1, e = !0) : e = !1, e && (t = w(t) || "Unknown", xy.has(t) || Sy.has(t) || (xy.add(t), console.error("`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary.")));
		}
		function Ca(e, t, n, r) {
			X = e;
			var i = 0;
			do {
				if (Oy && (My = null), jy = 0, Oy = !1, i >= Py) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
				if (i += 1, Ly = !1, Ey = Ty = null, e.updateQueue != null) {
					var a = e.updateQueue;
					a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
				}
				Iy = -1, W.H = Hy, a = xv(t, n, r);
			} while (Oy);
			return a;
		}
		function wa() {
			var e = W.H, t = e.useState()[0];
			return t = typeof t.then == "function" ? Aa(t) : t, e = e.useState()[0], (Ty === null ? null : Ty.memoizedState) !== e && (X.flags |= 1024), t;
		}
		function Ta() {
			var e = Ay !== 0;
			return Ay = 0, e;
		}
		function Ea(e, t, n) {
			t.updateQueue = e.updateQueue, t.flags = (t.mode & Rg) === G ? t.flags & -2053 : t.flags & -402655237, e.lanes &= ~n;
		}
		function Da(e) {
			if (Dy) {
				for (e = e.memoizedState; e !== null;) {
					var t = e.queue;
					t !== null && (t.pending = null), e = e.next;
				}
				Dy = !1;
			}
			wy = 0, Fy = Ey = Ty = X = null, Iy = -1, Z = null, Oy = !1, jy = Ay = 0, My = null;
		}
		function Oa() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return Ey === null ? X.memoizedState = Ey = e : Ey = Ey.next = e, Ey;
		}
		function I() {
			if (Ty === null) {
				var e = X.alternate;
				e = e === null ? null : e.memoizedState;
			} else e = Ty.next;
			var t = Ey === null ? X.memoizedState : Ey.next;
			if (t !== null) Ey = t, Ty = e;
			else {
				if (e === null) throw X.alternate === null ? Error("Update hook called on initial render. This is likely a bug in React. Please file an issue.") : Error("Rendered more hooks than during the previous render.");
				Ty = e, e = {
					memoizedState: Ty.memoizedState,
					baseState: Ty.baseState,
					baseQueue: Ty.baseQueue,
					queue: Ty.queue,
					next: null
				}, Ey === null ? X.memoizedState = Ey = e : Ey = Ey.next = e;
			}
			return Ey;
		}
		function ka() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function Aa(e) {
			var t = jy;
			return jy += 1, My === null && (My = Pi()), e = Ii(My, e, t), t = X, (Ey === null ? t.memoizedState : Ey.next) === null && (t = t.alternate, W.H = t !== null && t.memoizedState !== null ? Vy : zy), e;
		}
		function ja(e) {
			if (typeof e == "object" && e) {
				if (typeof e.then == "function") return Aa(e);
				if (e.$$typeof === Pf) return ri(e);
			}
			throw Error("An unsupported type was passed to use(): " + String(e));
		}
		function Ma(e) {
			var t = null, n = X.updateQueue;
			if (n !== null && (t = n.memoCache), t == null) {
				var r = X.alternate;
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
			}, n === null && (n = ka(), X.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Ly) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = Vf;
			else n.length !== e && console.error("Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.", n.length, e);
			return t.index++, n;
		}
		function Na(e, t) {
			return typeof t == "function" ? t(e) : t;
		}
		function Pa(e, t, n) {
			var r = Oa();
			if (n !== void 0) {
				var i = n(t);
				if (ky) {
					Oe(!0);
					try {
						n(t);
					} finally {
						Oe(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = z.bind(null, X, e), [r.memoizedState, e];
		}
		function Fa(e) {
			return Ia(I(), Ty, e);
		}
		function Ia(e, t, n) {
			var r = e.queue;
			if (r === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			r.lastRenderedReducer = n;
			var i = e.baseQueue, a = r.pending;
			if (a !== null) {
				if (i !== null) {
					var o = i.next;
					i.next = a.next, a.next = o;
				}
				t.baseQueue !== i && console.error("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), t.baseQueue = i = a, r.pending = null;
			}
			if (a = e.baseState, i === null) e.memoizedState = a;
			else {
				t = i.next;
				var s = o = null, c = null, l = t, u = !1;
				do {
					var d = l.lane & -536870913;
					if (d === l.lane ? (wy & d) === d : ($ & d) === d) {
						var f = l.revertLane;
						if (f === 0) c !== null && (c = c.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}), d === ov && (u = !0);
						else if ((wy & f) === f) {
							l = l.next, f === ov && (u = !0);
							continue;
						} else d = {
							lane: 0,
							revertLane: l.revertLane,
							gesture: null,
							action: l.action,
							hasEagerState: l.hasEagerState,
							eagerState: l.eagerState,
							next: null
						}, c === null ? (s = c = d, o = a) : c = c.next = d, X.lanes |= f, lx |= f;
						d = l.action, ky && n(a, d), a = l.hasEagerState ? l.eagerState : n(a, d);
					} else f = {
						lane: d,
						revertLane: l.revertLane,
						gesture: l.gesture,
						action: l.action,
						hasEagerState: l.hasEagerState,
						eagerState: l.eagerState,
						next: null
					}, c === null ? (s = c = f, o = a) : c = c.next = f, X.lanes |= d, lx |= d;
					l = l.next;
				} while (l !== null && l !== t);
				if (c === null ? o = a : c.next = s, !Vh(a, e.memoizedState) && (sb = !0, u && (n = sv, n !== null))) throw n;
				e.memoizedState = a, e.baseState = o, e.baseQueue = c, r.lastRenderedState = a;
			}
			return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
		}
		function La(e) {
			var t = I(), n = t.queue;
			if (n === null) throw Error("Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)");
			n.lastRenderedReducer = e;
			var r = n.dispatch, i = n.pending, a = t.memoizedState;
			if (i !== null) {
				n.pending = null;
				var o = i = i.next;
				do
					a = e(a, o.action), o = o.next;
				while (o !== i);
				Vh(a, t.memoizedState) || (sb = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
			}
			return [a, r];
		}
		function Ra(e, t, n) {
			var r = X, i = Oa();
			if (e_) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				var a = n();
				yy || a === n() || (console.error("The result of getServerSnapshot should be cached to avoid an infinite loop"), yy = !0);
			} else {
				if (a = t(), yy || (n = t(), Vh(a, n) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0)), Gb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				$ & 127 || Ba(r, t, a);
			}
			return i.memoizedState = a, n = {
				value: a,
				getSnapshot: t
			}, i.queue = n, mo(Ha.bind(null, r, n, e), [e]), r.flags |= 2048, lo(hy | vy, { destroy: void 0 }, Va.bind(null, r, n, a, t), null), a;
		}
		function za(e, t, n) {
			var r = X, i = I(), a = e_;
			if (a) {
				if (n === void 0) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
				n = n();
			} else if (n = t(), !yy) {
				var o = t();
				Vh(n, o) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), yy = !0);
			}
			if ((o = !Vh((Ty || i).memoizedState, n)) && (i.memoizedState = n, sb = !0), i = i.queue, po(2048, vy, Ha.bind(null, r, i, e), [e]), i.getSnapshot !== t || o || Ey !== null && Ey.memoizedState.tag & hy) {
				if (r.flags |= 2048, lo(hy | vy, { destroy: void 0 }, Va.bind(null, r, i, n, t), null), Gb === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
				a || wy & 127 || Ba(r, t, n);
			}
			return n;
		}
		function Ba(e, t, n) {
			e.flags |= 16384, e = {
				getSnapshot: t,
				value: n
			}, t = X.updateQueue, t === null ? (t = ka(), X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
		}
		function Va(e, t, n, r) {
			t.value = n, t.getSnapshot = r, Ua(t) && Wa(e);
		}
		function Ha(e, t, n) {
			return n(function() {
				Ua(t) && (li(2, "updateSyncExternalStore()", e), Wa(e));
			});
		}
		function Ua(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !Vh(e, n);
			} catch {
				return !0;
			}
		}
		function Wa(e) {
			var t = fr(e, 2);
			t !== null && $c(t, e, 2);
		}
		function Ga(e) {
			var t = Oa();
			if (typeof e == "function") {
				var n = e;
				if (e = n(), ky) {
					Oe(!0);
					try {
						n();
					} finally {
						Oe(!1);
					}
				}
			}
			return t.memoizedState = t.baseState = e, t.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Na,
				lastRenderedState: e
			}, t;
		}
		function Ka(e) {
			e = Ga(e);
			var t = e.queue, n = Vo.bind(null, X, t);
			return t.dispatch = n, [e.memoizedState, n];
		}
		function qa(e) {
			var t = Oa();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Uo.bind(null, X, !0, n), n.dispatch = t, [e, t];
		}
		function Ja(e, t) {
			return Ya(I(), Ty, e, t);
		}
		function Ya(e, t, n, r) {
			return e.baseState = n, Ia(e, Ty, typeof r == "function" ? r : Na);
		}
		function Xa(e, t) {
			var n = I();
			return Ty === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ya(n, Ty, e, t);
		}
		function Za(e, t, n, r, i) {
			if (Wo(e)) throw Error("Cannot update form state while rendering.");
			if (e = t.action, e !== null) {
				var a = {
					payload: i,
					action: e,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(e) {
						a.listeners.push(e);
					}
				};
				W.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, Qa(t, a)) : (a.next = n.next, t.pending = n.next = a);
			}
		}
		function Qa(e, t) {
			var n = t.action, r = t.payload, i = e.state;
			if (t.isTransition) {
				var a = W.T, o = {};
				o._updatedFibers = /* @__PURE__ */ new Set(), W.T = o;
				try {
					var s = n(i, r), c = W.S;
					c !== null && c(o, s), $a(e, t, s);
				} catch (n) {
					to(e, t, n);
				} finally {
					a !== null && o.types !== null && (a.types !== null && a.types !== o.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), a.types = o.types), W.T = a, a === null && o._updatedFibers && (e = o._updatedFibers.size, o._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
				}
			} else try {
				o = n(i, r), $a(e, t, o);
			} catch (n) {
				to(e, t, n);
			}
		}
		function $a(e, t, n) {
			typeof n == "object" && n && typeof n.then == "function" ? (W.asyncTransitions++, n.then(ko, ko), n.then(function(n) {
				eo(e, t, n);
			}, function(n) {
				return to(e, t, n);
			}), t.isTransition || console.error("An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop.")) : eo(e, t, n);
		}
		function eo(e, t, n) {
			t.status = "fulfilled", t.value = n, no(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Qa(e, n)));
		}
		function to(e, t, n) {
			var r = e.pending;
			if (e.pending = null, r !== null) {
				r = r.next;
				do
					t.status = "rejected", t.reason = n, no(t), t = t.next;
				while (t !== r);
			}
			e.action = null;
		}
		function no(e) {
			e = e.listeners;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
		function ro(e, t) {
			return t;
		}
		function io(e, t) {
			if (e_) {
				var n = Gb.formState;
				if (n !== null) {
					a: {
						var r = X;
						if (e_) {
							if ($g) {
								b: {
									for (var i = $g, a = i_; i.nodeType !== 8;) {
										if (!a) {
											i = null;
											break b;
										}
										if (i = hd(i.nextSibling), i === null) {
											i = null;
											break b;
										}
									}
									a = i.data, i = a === BS || a === VS ? i : null;
								}
								if (i) {
									$g = hd(i.nextSibling), r = i.data === BS;
									break a;
								}
							}
							Vr(r);
						}
						r = !1;
					}
					r && (t = n[0]);
				}
			}
			return n = Oa(), n.memoizedState = n.baseState = t, r = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ro,
				lastRenderedState: t
			}, n.queue = r, n = Vo.bind(null, X, r), r.dispatch = n, r = Ga(!1), a = Uo.bind(null, X, !1, r.queue), r = Oa(), i = {
				state: t,
				dispatch: null,
				action: e,
				pending: null
			}, r.queue = i, n = Za.bind(null, X, i, a, n), i.dispatch = n, r.memoizedState = e, [
				t,
				n,
				!1
			];
		}
		function ao(e) {
			return oo(I(), Ty, e);
		}
		function oo(e, t, n) {
			if (t = Ia(e, t, ro)[0], e = Fa(Na)[0], typeof t == "object" && t && typeof t.then == "function") try {
				var r = Aa(t);
			} catch (e) {
				throw e === Rv ? Bv : e;
			}
			else r = t;
			t = I();
			var i = t.queue, a = i.dispatch;
			return n !== t.memoizedState && (X.flags |= 2048, lo(hy | vy, { destroy: void 0 }, so.bind(null, i, n), null)), [
				r,
				a,
				e
			];
		}
		function so(e, t) {
			e.action = t;
		}
		function co(e) {
			var t = I(), n = Ty;
			if (n !== null) return oo(t, n, e);
			I(), t = t.memoizedState, n = I();
			var r = n.queue.dispatch;
			return n.memoizedState = e, [
				t,
				r,
				!1
			];
		}
		function lo(e, t, n, r) {
			return e = {
				tag: e,
				create: n,
				deps: r,
				inst: t,
				next: null
			}, t = X.updateQueue, t === null && (t = ka(), X.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
		}
		function uo(e) {
			var t = Oa();
			return e = { current: e }, t.memoizedState = e;
		}
		function fo(e, t, n, r) {
			var i = Oa();
			X.flags |= e, i.memoizedState = lo(hy | t, { destroy: void 0 }, n, r === void 0 ? null : r);
		}
		function po(e, t, n, r) {
			var i = I();
			r = r === void 0 ? null : r;
			var a = i.memoizedState.inst;
			Ty !== null && r !== null && ba(r, Ty.memoizedState.deps) ? i.memoizedState = lo(t, a, n, r) : (X.flags |= e, i.memoizedState = lo(hy | t, a, n, r));
		}
		function mo(e, t) {
			(X.mode & Rg) === G ? fo(8390656, vy, e, t) : fo(276826112, vy, e, t);
		}
		function L(e) {
			X.flags |= 4;
			var t = X.updateQueue;
			if (t === null) t = ka(), X.updateQueue = t, t.events = [e];
			else {
				var n = t.events;
				n === null ? t.events = [e] : n.push(e);
			}
		}
		function ho(e) {
			var t = Oa(), n = { impl: e };
			return t.memoizedState = n, function() {
				if ((Wb & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return n.impl.apply(void 0, arguments);
			};
		}
		function R(e) {
			var t = I().memoizedState;
			return L({
				ref: t,
				nextImpl: e
			}), function() {
				if ((Wb & Fb) !== Pb) throw Error("A function wrapped in useEffectEvent can't be called during rendering.");
				return t.impl.apply(void 0, arguments);
			};
		}
		function go(e, t) {
			var n = 4194308;
			return (X.mode & Rg) !== G && (n |= 134217728), fo(n, _y, e, t);
		}
		function _o(e, t) {
			if (typeof t == "function") {
				e = e();
				var n = t(e);
				return function() {
					typeof n == "function" ? n() : t(null);
				};
			}
			if (t != null) return t.hasOwnProperty("current") || console.error("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(t).join(", ") + "}"), e = e(), t.current = e, function() {
				t.current = null;
			};
		}
		function vo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]);
			var r = 4194308;
			(X.mode & Rg) !== G && (r |= 134217728), fo(r, _y, _o.bind(null, t, e), n);
		}
		function yo(e, t, n) {
			typeof t != "function" && console.error("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t === null ? "null" : typeof t), n = n == null ? null : n.concat([e]), po(4, _y, _o.bind(null, t, e), n);
		}
		function bo(e, t) {
			return Oa().memoizedState = [e, t === void 0 ? null : t], e;
		}
		function xo(e, t) {
			var n = I();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			return t !== null && ba(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
		}
		function So(e, t) {
			var n = Oa();
			t = t === void 0 ? null : t;
			var r = e();
			if (ky) {
				Oe(!0);
				try {
					e();
				} finally {
					Oe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function Co(e, t) {
			var n = I();
			t = t === void 0 ? null : t;
			var r = n.memoizedState;
			if (t !== null && ba(t, r[1])) return r[0];
			if (r = e(), ky) {
				Oe(!0);
				try {
					e();
				} finally {
					Oe(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		}
		function wo(e, t) {
			return Do(Oa(), e, t);
		}
		function To(e, t) {
			return Oo(I(), Ty.memoizedState, e, t);
		}
		function Eo(e, t) {
			var n = I();
			return Ty === null ? Do(n, e, t) : Oo(n, Ty.memoizedState, e, t);
		}
		function Do(e, t, n) {
			return n === void 0 || wy & 1073741824 && !($ & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Qc(), X.lanes |= e, lx |= e, n);
		}
		function Oo(e, t, n, r) {
			return Vh(n, t) ? n : sy.current === null ? !(wy & 42) || wy & 1073741824 && !($ & 261930) ? (sb = !0, e.memoizedState = n) : (e = Qc(), X.lanes |= e, lx |= e, t) : (e = Do(e, n, r), Vh(e, t) || (sb = !0), e);
		}
		function ko() {
			W.asyncTransitions--;
		}
		function Ao(e, t, n, r, i) {
			var a = Gf.p;
			Gf.p = a !== 0 && a < zp ? a : zp;
			var o = W.T, s = {};
			s._updatedFibers = /* @__PURE__ */ new Set(), W.T = s, Uo(e, !1, t, n);
			try {
				var c = i(), l = W.S;
				if (l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function") {
					W.asyncTransitions++, c.then(ko, ko);
					var u = Ai(c, r);
					Ho(e, t, u, Zc(e));
				} else Ho(e, t, r, Zc(e));
			} catch (n) {
				Ho(e, t, {
					then: function() {},
					status: "rejected",
					reason: n
				}, Zc(e));
			} finally {
				Gf.p = a, o !== null && s.types !== null && (o.types !== null && o.types !== s.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), o.types = s.types), W.T = o, o === null && s._updatedFibers && (e = s._updatedFibers.size, s._updatedFibers.clear(), 10 < e && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."));
			}
		}
		function jo(e, t, n, r) {
			if (e.tag !== 5) throw Error("Expected the form instance to be a HostComponent. This is a bug in React.");
			var i = Mo(e).queue;
			ui(e), Ao(e, i, t, bC, n === null ? u : function() {
				return No(e), n(r);
			});
		}
		function Mo(e) {
			var t = e.memoizedState;
			if (t !== null) return t;
			t = {
				memoizedState: bC,
				baseState: bC,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: Na,
					lastRenderedState: bC
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
					lastRenderedReducer: Na,
					lastRenderedState: n
				},
				next: null
			}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
		}
		function No(e) {
			W.T === null && console.error("requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition.");
			var t = Mo(e);
			t.next === null && (t = e.alternate.memoizedState), Ho(e, t.next.queue, {}, Zc(e));
		}
		function Po() {
			var e = Ga(!1);
			return e = Ao.bind(null, X, e.queue, !0, !1), Oa().memoizedState = e, [!1, e];
		}
		function Fo() {
			var e = Fa(Na)[0], t = I().memoizedState;
			return [typeof e == "boolean" ? e : Aa(e), t];
		}
		function Io() {
			var e = La(Na)[0], t = I().memoizedState;
			return [typeof e == "boolean" ? e : Aa(e), t];
		}
		function Lo() {
			return ri(xC);
		}
		function Ro() {
			var e = Oa(), t = Gb.identifierPrefix;
			if (e_) {
				var n = Zg, r = Xg;
				n = (r & ~(1 << 32 - Mp(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ay++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Ny++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		}
		function zo() {
			return Oa().memoizedState = Bo.bind(null, X);
		}
		function Bo(e, t) {
			for (var n = e.return; n !== null;) {
				switch (n.tag) {
					case 24:
					case 3:
						var r = Zc(n), i = ea(r), a = ta(n, i, r);
						a !== null && (li(r, "refresh()", e), $c(a, n, r), na(a, n, r)), e = oi(), t != null && a !== null && console.error("The seed argument is not enabled outside experimental channels."), i.payload = { cache: e };
						return;
				}
				n = n.return;
			}
		}
		function z(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Zc(e);
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			Wo(e) ? Go(t, i) : (i = dr(e, t, i, r), i !== null && (li(r, "dispatch()", e), $c(i, e, r), Ko(i, t, r)));
		}
		function Vo(e, t, n) {
			var r = arguments;
			typeof r[3] == "function" && console.error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."), r = Zc(e), Ho(e, t, n, r) && li(r, "setState()", e);
		}
		function Ho(e, t, n, r) {
			var i = {
				lane: r,
				revertLane: 0,
				gesture: null,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (Wo(e)) Go(t, i);
			else {
				var a = e.alternate;
				if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) {
					var o = W.H;
					W.H = Wy;
					try {
						var s = t.lastRenderedState, c = a(s, n);
						if (i.hasEagerState = !0, i.eagerState = c, Vh(c, s)) return ur(e, t, i, 0), Gb === null && lr(), !1;
					} catch {} finally {
						W.H = o;
					}
				}
				if (n = dr(e, t, i, r), n !== null) return $c(n, e, r), Ko(n, t, r), !0;
			}
			return !1;
		}
		function Uo(e, t, n, r) {
			if (W.T === null && ov === 0 && console.error("An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."), r = {
				lane: 2,
				revertLane: eu(),
				gesture: null,
				action: r,
				hasEagerState: !1,
				eagerState: null,
				next: null
			}, Wo(e)) {
				if (t) throw Error("Cannot update optimistic state while rendering.");
				console.error("Cannot call startTransition while rendering.");
			} else t = dr(e, n, r, 2), t !== null && (li(2, "setOptimistic()", e), $c(t, e, 2));
		}
		function Wo(e) {
			var t = e.alternate;
			return e === X || t !== null && t === X;
		}
		function Go(e, t) {
			Oy = Dy = !0;
			var n = e.pending;
			n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
		}
		function Ko(e, t, n) {
			if (n & 4194048) {
				var r = t.lanes;
				r &= e.pendingLanes, n |= r, t.lanes = n, ze(e, n);
			}
		}
		function qo(e) {
			if (e !== null && typeof e != "function") {
				var t = String(e);
				nb.has(t) || (nb.add(t), console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", e));
			}
		}
		function Jo(e, t, n, r) {
			var i = e.memoizedState, a = n(r, i);
			if (e.mode & Lg) {
				Oe(!0);
				try {
					a = n(r, i);
				} finally {
					Oe(!1);
				}
			}
			a === void 0 && (t = C(t) || "Component", Qy.has(t) || (Qy.add(t), console.error("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", t))), i = a == null ? i : U({}, i, a), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
		}
		function Yo(e, t, n, r, i, a, o) {
			var s = e.stateNode;
			if (typeof s.shouldComponentUpdate == "function") {
				if (n = s.shouldComponentUpdate(r, a, o), e.mode & Lg) {
					Oe(!0);
					try {
						n = s.shouldComponentUpdate(r, a, o);
					} finally {
						Oe(!1);
					}
				}
				return n === void 0 && console.error("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", C(t) || "Component"), n;
			}
			return t.prototype && t.prototype.isPureReactComponent ? !Fn(n, r) || !Fn(i, a) : !0;
		}
		function Xo(e, t, n, r) {
			var i = t.state;
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== i && (e = w(e) || "Component", qy.has(e) || (qy.add(e), console.error("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", e)), rb.enqueueReplaceState(t, t.state, null));
		}
		function Zo(e, t) {
			var n = t;
			if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
			if (e = e.defaultProps) for (var i in n === t && (n = U({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
			return n;
		}
		function Qo(e) {
			lg(e), console.warn("%s\n\n%s\n", ib ? "An error occurred in the <" + ib + "> component." : "An error occurred in one of your React components.", "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries.");
		}
		function $o(e) {
			var t = ib ? "The above error occurred in the <" + ib + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((ab || "Anonymous") + ".");
			if (typeof e == "object" && e && typeof e.environmentName == "string") {
				var r = e.environmentName;
				e = [
					"%o\n\n%s\n\n%s\n",
					e,
					t,
					n
				].slice(0), typeof e[0] == "string" ? e.splice(0, 1, SC + " " + e[0], CC, TC + r + TC, wC) : e.splice(0, 0, SC, CC, TC + r + TC, wC), e.unshift(console), r = EC.apply(console.error, e), r();
			} else console.error("%o\n\n%s\n\n%s\n", e, t, n);
		}
		function es(e) {
			lg(e);
		}
		function ts(e, t) {
			try {
				ib = t.source ? w(t.source) : null, ab = null;
				var n = t.value;
				if (W.actQueue !== null) W.thrownErrors.push(n);
				else {
					var r = e.onUncaughtError;
					r(n, { componentStack: t.stack });
				}
			} catch (e) {
				setTimeout(function() {
					throw e;
				});
			}
		}
		function ns(e, t, n) {
			try {
				ib = n.source ? w(n.source) : null, ab = w(t);
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
		function rs(e, t, n) {
			return n = ea(n), n.tag = ny, n.payload = { element: null }, n.callback = function() {
				A(t.source, ts, e, t);
			}, n;
		}
		function is(e) {
			return e = ea(e), e.tag = ny, e;
		}
		function as(e, t, n, r) {
			var i = n.type.getDerivedStateFromError;
			if (typeof i == "function") {
				var a = r.value;
				e.payload = function() {
					return i(a);
				}, e.callback = function() {
					vr(n), A(r.source, ns, t, n, r);
				};
			}
			var o = n.stateNode;
			o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
				vr(n), A(r.source, ns, t, n, r), typeof i != "function" && (wx === null ? wx = new Set([this]) : wx.add(this)), kv(this, r), typeof i == "function" || !(n.lanes & 2) && console.error("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", w(n) || "Unknown");
			});
		}
		function os(e, t, n, r, i) {
			if (n.flags |= 32768, jp && Ul(e, i), typeof r == "object" && r && typeof r.then == "function") {
				if (t = n.alternate, t !== null && ei(t, n, i, !0), e_ && (t_ = !0), n = ly.current, n !== null) {
					switch (n.tag) {
						case 31:
						case 13: return uy === null ? pl() : n.alternate === null && cx === Lb && (cx = Bb), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Pl(e, r, i)), !1;
						case 22: return n.flags |= 65536, r === Vv ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
							transitions: null,
							markerInstances: null,
							retryQueue: new Set([r])
						}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Pl(e, r, i)), !1;
					}
					throw Error("Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React.");
				}
				return Pl(e, r, i), pl(), !1;
			}
			if (e_) return t_ = !0, t = ly.current, t === null ? (r !== a_ && qr(Ar(Error("There was an error while hydrating but React was able to recover by instead client rendering the entire root.", { cause: r }), n)), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = Ar(r, n), i = rs(e.stateNode, r, i), ra(e, i), cx !== Vb && (cx = zb)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== a_ && qr(Ar(Error("There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.", { cause: r }), n))), !1;
			var a = Ar(Error("There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.", { cause: r }), n);
			if (mx === null ? mx = [a] : mx.push(a), cx !== Vb && (cx = zb), t === null) return !0;
			r = Ar(r, n), n = t;
			do {
				switch (n.tag) {
					case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = rs(n.stateNode, r, e), ra(n, e), !1;
					case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (wx === null || !wx.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = is(i), as(i, e, n, r), ra(n, i), !1;
				}
				n = n.return;
			} while (n !== null);
			return !1;
		}
		function ss(e, t, n, r) {
			t.child = e === null ? Qv(t, null, n, r) : Zv(t, e.child, n, r);
		}
		function cs(e, t, n, r, i) {
			n = n.render;
			var a = t.ref;
			if ("ref" in r) {
				var o = {};
				for (var s in r) s !== "ref" && (o[s] = r[s]);
			} else o = r;
			return ni(t), r = xa(e, t, n, o, a, i), s = Ta(), e !== null && !sb ? (Ea(e, t, i), Ms(e, t, i)) : (e_ && s && Nr(t), t.flags |= 1, ss(e, t, r, i), t.child);
		}
		function ls(e, t, n, r, i) {
			if (e === null) {
				var a = n.type;
				return typeof a == "function" && !xr(a) && a.defaultProps === void 0 && n.compare === null ? (n = hr(a), t.tag = 15, t.type = n, Ss(t, a), us(e, t, n, r, i)) : (e = wr(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
			}
			if (a = e.child, !Ns(e, i)) {
				var o = a.memoizedProps;
				if (n = n.compare, n = n === null ? Fn : n, n(o, r) && e.ref === t.ref) return Ms(e, t, i);
			}
			return t.flags |= 1, e = Sr(a, r), e.ref = t.ref, e.return = t, t.child = e;
		}
		function us(e, t, n, r, i) {
			if (e !== null) {
				var a = e.memoizedProps;
				if (Fn(a, r) && e.ref === t.ref && t.type === e.type) if (sb = !1, t.pendingProps = r = a, Ns(e, i)) e.flags & 131072 && (sb = !0);
				else return t.lanes = e.lanes, Ms(e, t, i);
			}
			return vs(e, t, n, r, i);
		}
		function ds(e, t, n, r) {
			var i = r.children, a = e === null ? null : e.memoizedState;
			if (e === null && t.stateNode === null && (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), r.mode === "hidden") {
				if (t.flags & 128) {
					if (a = a === null ? n : a.baseLanes | n, e !== null) {
						for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
						r = i & ~a;
					} else r = 0, t.child = null;
					return ps(e, t, a, n, r);
				}
				if (n & 536870912) t.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, e !== null && Mi(t, a === null ? null : a.cachePool), a === null ? la(t) : ca(t, a), pa(t);
				else return r = t.lanes = 536870912, ps(e, t, a === null ? n : a.baseLanes | n, n, r);
			} else a === null ? (e !== null && Mi(t, null), la(t), ma(t)) : (Mi(t, a.cachePool), ca(t, a), ma(t), t.memoizedState = null);
			return ss(e, t, i, n), t.child;
		}
		function fs(e, t) {
			return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
				_visibility: Og,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			}), t.sibling;
		}
		function ps(e, t, n, r, i) {
			var a = ji();
			return a = a === null ? null : {
				parent: h_._currentValue,
				pool: a
			}, t.memoizedState = {
				baseLanes: n,
				cachePool: a
			}, e !== null && Mi(t, null), la(t), pa(t), e !== null && ei(e, t, r, !0), t.childLanes = i, null;
		}
		function ms(e, t) {
			var n = t.hidden;
			return n !== void 0 && console.error("<Activity> doesn't accept a hidden prop. Use mode=\"hidden\" instead.\n- <Activity %s>\n+ <Activity %s>", !0 === n ? "hidden" : !1 === n ? "hidden={false}" : "hidden={...}", n ? "mode=\"hidden\"" : "mode=\"visible\""), t = Ds({
				mode: t.mode,
				children: t.children
			}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
		}
		function hs(e, t, n) {
			return Zv(t, e.child, null, n), e = ms(t, t.pendingProps), e.flags |= 2, ha(t), t.memoizedState = null, e;
		}
		function gs(e, t, n) {
			var r = t.pendingProps, i = (t.flags & 128) != 0;
			if (t.flags &= -129, e === null) {
				if (e_) {
					if (r.mode === "hidden") return e = ms(t, r), t.lanes = 536870912, fs(null, e);
					if (fa(t), (e = $g) ? (n = dd(e, i_), n = n !== null && n.data === AS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Fr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Or(n), r.return = t, t.child = r, Qg = t, $g = null)) : n = null, n === null) throw Br(t, e), Vr(t);
					return t.lanes = 536870912, null;
				}
				return ms(t, r);
			}
			var a = e.memoizedState;
			if (a !== null) {
				var o = a.dehydrated;
				if (fa(t), i) if (t.flags & 256) t.flags &= -257, t = hs(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
				else if (zr(), n & 536870912 && fl(t), sb || ei(e, t, n, !1), i = (n & e.childLanes) !== 0, sb || i) {
					if (r = Gb, r !== null && (o = Be(r, n), o !== 0 && o !== a.retryLane)) throw a.retryLane = o, fr(e, o), $c(r, e, o), ob;
					pl(), t = hs(e, t, n);
				} else e = a.treeContext, $g = hd(o.nextSibling), Qg = t, e_ = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Ir(t, e), t = ms(t, r), t.flags |= 4096;
				return t;
			}
			return a = e.child, r = {
				mode: r.mode,
				children: r.children
			}, n & 536870912 && (n & e.lanes) !== 0 && fl(t), e = Sr(a, r), e.ref = t.ref, t.child = e, e.return = t, e;
		}
		function _s(e, t) {
			var n = t.ref;
			if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
			else {
				if (typeof n != "function" && typeof n != "object") throw Error("Expected ref to be a function, an object returned by React.createRef(), or undefined/null.");
				(e === null || e.ref !== n) && (t.flags |= 4194816);
			}
		}
		function vs(e, t, n, r, i) {
			if (n.prototype && typeof n.prototype.render == "function") {
				var a = C(n) || "Unknown";
				cb[a] || (console.error("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", a, a), cb[a] = !0);
			}
			return t.mode & Lg && uv.recordLegacyContextWarning(t, null), e === null && (Ss(t, t.type), n.contextTypes && (a = C(n) || "Unknown", ub[a] || (ub[a] = !0, console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)", a)))), ni(t), n = xa(e, t, n, r, void 0, i), r = Ta(), e !== null && !sb ? (Ea(e, t, i), Ms(e, t, i)) : (e_ && r && Nr(t), t.flags |= 1, ss(e, t, n, i), t.child);
		}
		function ys(e, t, n, r, i, a) {
			return ni(t), Iy = -1, Ly = e !== null && e.type !== t.type, t.updateQueue = null, n = Ca(t, r, n, i), Sa(e, t), r = Ta(), e !== null && !sb ? (Ea(e, t, a), Ms(e, t, a)) : (e_ && r && Nr(t), t.flags |= 1, ss(e, t, n, a), t.child);
		}
		function bs(e, t, n, r, i) {
			switch (s(t)) {
				case !1:
					var a = t.stateNode, o = new t.type(t.memoizedProps, a.context).state;
					a.updater.enqueueSetState(a, o, null);
					break;
				case !0:
					t.flags |= 128, t.flags |= 65536, a = Error("Simulated error coming from DevTools");
					var c = i & -i;
					if (t.lanes |= c, o = Gb, o === null) throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
					c = is(c), as(c, o, t, Ar(a, t)), ra(t, c);
			}
			if (ni(t), t.stateNode === null) {
				if (o = Ng, a = n.contextType, "contextType" in n && a !== null && (a === void 0 || a.$$typeof !== Pf) && !tb.has(n) && (tb.add(n), c = a === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof a == "object" ? a.$$typeof === Nf ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(a).join(", ") + "}." : " However, it is set to a " + typeof a + ".", console.error("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", C(n) || "Component", c)), typeof a == "object" && a && (o = ri(a)), a = new n(r, o), t.mode & Lg) {
					Oe(!0);
					try {
						a = new n(r, o);
					} finally {
						Oe(!1);
					}
				}
				if (o = t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = rb, t.stateNode = a, a._reactInternals = t, a._reactInternalInstance = Ky, typeof n.getDerivedStateFromProps == "function" && o === null && (o = C(n) || "Component", Jy.has(o) || (Jy.add(o), console.error("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", o, a.state === null ? "null" : "undefined", o))), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function") {
					var l = c = o = null;
					if (typeof a.componentWillMount == "function" && !0 !== a.componentWillMount.__suppressDeprecationWarning ? o = "componentWillMount" : typeof a.UNSAFE_componentWillMount == "function" && (o = "UNSAFE_componentWillMount"), typeof a.componentWillReceiveProps == "function" && !0 !== a.componentWillReceiveProps.__suppressDeprecationWarning ? c = "componentWillReceiveProps" : typeof a.UNSAFE_componentWillReceiveProps == "function" && (c = "UNSAFE_componentWillReceiveProps"), typeof a.componentWillUpdate == "function" && !0 !== a.componentWillUpdate.__suppressDeprecationWarning ? l = "componentWillUpdate" : typeof a.UNSAFE_componentWillUpdate == "function" && (l = "UNSAFE_componentWillUpdate"), o !== null || c !== null || l !== null) {
						a = C(n) || "Component";
						var u = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
						Xy.has(a) || (Xy.add(a), console.error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles", a, u, o === null ? "" : "\n  " + o, c === null ? "" : "\n  " + c, l === null ? "" : "\n  " + l));
					}
				}
				a = t.stateNode, o = C(n) || "Component", a.render || (n.prototype && typeof n.prototype.render == "function" ? console.error("No `render` method found on the %s instance: did you accidentally return an object from the constructor?", o) : console.error("No `render` method found on the %s instance: you may have forgotten to define `render`.", o)), !a.getInitialState || a.getInitialState.isReactClassApproved || a.state || console.error("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && console.error("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), a.contextType && console.error("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), n.childContextTypes && !eb.has(n) && (eb.add(n), console.error("%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)", o)), n.contextTypes && !$y.has(n) && ($y.add(n), console.error("%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)", o)), typeof a.componentShouldUpdate == "function" && console.error("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), n.prototype && n.prototype.isPureReactComponent && a.shouldComponentUpdate !== void 0 && console.error("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", C(n) || "A pure component"), typeof a.componentDidUnmount == "function" && console.error("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof a.componentDidReceiveProps == "function" && console.error("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof a.componentWillRecieveProps == "function" && console.error("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof a.UNSAFE_componentWillRecieveProps == "function" && console.error("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o), c = a.props !== r, a.props !== void 0 && c && console.error("When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o), a.defaultProps && console.error("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof a.getSnapshotBeforeUpdate != "function" || typeof a.componentDidUpdate == "function" || Yy.has(n) || (Yy.add(n), console.error("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", C(n))), typeof a.getDerivedStateFromProps == "function" && console.error("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof a.getDerivedStateFromError == "function" && console.error("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof n.getSnapshotBeforeUpdate == "function" && console.error("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o), (c = a.state) && (typeof c != "object" || Wf(c)) && console.error("%s.state: must be set to an object or null", o), typeof a.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o), a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Qi(t), o = n.contextType, a.context = typeof o == "object" && o ? ri(o) : Ng, a.state === r && (o = C(n) || "Component", Zy.has(o) || (Zy.add(o), console.error("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o))), t.mode & Lg && uv.recordLegacyContextWarning(t, a), uv.recordUnsafeLifecycleWarnings(t, a), a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Jo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && (console.error("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", w(t) || "Component"), rb.enqueueReplaceState(a, a.state, null)), aa(t, r, a, i), ia(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !0;
			} else if (e === null) {
				a = t.stateNode;
				var d = t.memoizedProps;
				c = Zo(n, d), a.props = c;
				var f = a.context;
				l = n.contextType, o = Ng, typeof l == "object" && l && (o = ri(l)), u = n.getDerivedStateFromProps, l = typeof u == "function" || typeof a.getSnapshotBeforeUpdate == "function", d = t.pendingProps !== d, l || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (d || f !== o) && Xo(t, a, r, o), ry = !1;
				var p = t.memoizedState;
				a.state = p, aa(t, r, a, i), ia(), f = t.memoizedState, d || p !== f || ry ? (typeof u == "function" && (Jo(t, n, u, r), f = t.memoizedState), (c = ry || Yo(t, n, c, r, p, f, o)) ? (l || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), t.memoizedProps = r, t.memoizedState = f), a.props = r, a.state = f, a.context = o, a = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Rg) !== G && (t.flags |= 134217728), a = !1);
			} else {
				a = t.stateNode, $i(e, t), o = t.memoizedProps, l = Zo(n, o), a.props = l, u = t.pendingProps, p = a.context, f = n.contextType, c = Ng, typeof f == "object" && f && (c = ri(f)), d = n.getDerivedStateFromProps, (f = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== u || p !== c) && Xo(t, a, r, c), ry = !1, p = t.memoizedState, a.state = p, aa(t, r, a, i), ia();
				var m = t.memoizedState;
				o !== u || p !== m || ry || e !== null && e.dependencies !== null && ti(e.dependencies) ? (typeof d == "function" && (Jo(t, n, d, r), m = t.memoizedState), (l = ry || Yo(t, n, l, r, p, m, c) || e !== null && e.dependencies !== null && ti(e.dependencies)) ? (f || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, m, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, m, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = m), a.props = r, a.state = m, a.context = c, a = l) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), a = !1);
			}
			if (c = a, _s(e, t), o = (t.flags & 128) != 0, c || o) {
				if (c = t.stateNode, xe(t), o && typeof n.getDerivedStateFromError != "function") n = null, w_ = -1;
				else if (n = Cv(c), t.mode & Lg) {
					Oe(!0);
					try {
						Cv(c);
					} finally {
						Oe(!1);
					}
				}
				t.flags |= 1, e !== null && o ? (t.child = Zv(t, e.child, null, i), t.child = Zv(t, null, n, i)) : ss(e, t, n, i), t.memoizedState = c.state, e = t.child;
			} else e = Ms(e, t, i);
			return i = t.stateNode, a && i.props !== r && (fb || console.error("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", w(t) || "a component"), fb = !0), e;
		}
		function xs(e, t, n, r) {
			return Gr(), t.flags |= 256, ss(e, t, n, r), t.child;
		}
		function Ss(e, t) {
			t && t.childContextTypes && console.error("childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...", t.displayName || t.name || "Component"), typeof t.getDerivedStateFromProps == "function" && (e = C(t) || "Unknown", db[e] || (console.error("%s: Function components do not support getDerivedStateFromProps.", e), db[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = C(t) || "Unknown", lb[t] || (console.error("%s: Function components do not support contextType.", t), lb[t] = !0));
		}
		function Cs(e) {
			return {
				baseLanes: e,
				cachePool: Ni()
			};
		}
		function ws(e, t, n) {
			return e = e === null ? 0 : e.childLanes & ~n, t && (e |= fx), e;
		}
		function Ts(e, t, n) {
			var r, i = t.pendingProps;
			o(t) && (t.flags |= 128);
			var a = !1, s = (t.flags & 128) != 0;
			if ((r = s) || (r = e !== null && e.memoizedState === null ? !1 : (py.current & fy) !== 0), r && (a = !0, t.flags &= -129), r = (t.flags & 32) != 0, t.flags &= -33, e === null) {
				if (e_) {
					if (a ? da(t) : ma(t), (e = $g) ? (n = dd(e, i_), n = n !== null && n.data !== AS ? n : null, n !== null && (r = {
						dehydrated: n,
						treeContext: Fr(),
						retryLane: 536870912,
						hydrationErrors: null
					}, t.memoizedState = r, r = Or(n), r.return = t, t.child = r, Qg = t, $g = null)) : n = null, n === null) throw Br(t, e), Vr(t);
					return pd(n) ? t.lanes = 32 : t.lanes = 536870912, null;
				}
				var c = i.children;
				if (i = i.fallback, a) {
					ma(t);
					var l = t.mode;
					return c = Ds({
						mode: "hidden",
						children: c
					}, l), i = Er(i, l, n, null), c.return = t, i.return = t, c.sibling = i, t.child = c, i = t.child, i.memoizedState = Cs(n), i.childLanes = ws(e, r, n), t.memoizedState = hb, fs(null, i);
				}
				return da(t), Es(t, c);
			}
			var u = e.memoizedState;
			if (u !== null) {
				var d = u.dehydrated;
				if (d !== null) {
					if (s) t.flags & 256 ? (da(t), t.flags &= -257, t = Os(e, t, n)) : t.memoizedState === null ? (ma(t), c = i.fallback, l = t.mode, i = Ds({
						mode: "visible",
						children: i.children
					}, l), c = Er(c, l, n, null), c.flags |= 2, i.return = t, c.return = t, i.sibling = c, t.child = i, Zv(t, e.child, null, n), i = t.child, i.memoizedState = Cs(n), i.childLanes = ws(e, r, n), t.memoizedState = hb, t = fs(null, i)) : (ma(t), t.child = e.child, t.flags |= 128, t = null);
					else if (da(t), zr(), n & 536870912 && fl(t), pd(d)) {
						if (r = d.nextSibling && d.nextSibling.dataset, r) {
							c = r.dgst;
							var f = r.msg;
							l = r.stck;
							var p = r.cstck;
						}
						a = f, r = c, i = l, d = p, c = a, l = d, c = Error(c || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), c.stack = i || "", c.digest = r, r = l === void 0 ? null : l, i = {
							value: c,
							source: null,
							stack: r
						}, typeof r == "string" && Hg.set(c, i), qr(i), t = Os(e, t, n);
					} else if (sb || ei(e, t, n, !1), r = (n & e.childLanes) !== 0, sb || r) {
						if (r = Gb, r !== null && (i = Be(r, n), i !== 0 && i !== u.retryLane)) throw u.retryLane = i, fr(e, i), $c(r, e, i), ob;
						fd(d) || pl(), t = Os(e, t, n);
					} else fd(d) ? (t.flags |= 192, t.child = e.child, t = null) : (e = u.treeContext, $g = hd(d.nextSibling), Qg = t, e_ = !0, r_ = null, t_ = !1, n_ = null, i_ = !1, e !== null && Ir(t, e), t = Es(t, i.children), t.flags |= 4096);
					return t;
				}
			}
			return a ? (ma(t), c = i.fallback, l = t.mode, p = e.child, d = p.sibling, i = Sr(p, {
				mode: "hidden",
				children: i.children
			}), i.subtreeFlags = p.subtreeFlags & 65011712, d === null ? (c = Er(c, l, n, null), c.flags |= 2) : c = Sr(d, c), c.return = t, i.return = t, i.sibling = c, t.child = i, fs(null, i), i = t.child, c = e.child.memoizedState, c === null ? c = Cs(n) : (l = c.cachePool, l === null ? l = Ni() : (p = h_._currentValue, l = l.parent === p ? l : {
				parent: p,
				pool: p
			}), c = {
				baseLanes: c.baseLanes | n,
				cachePool: l
			}), i.memoizedState = c, i.childLanes = ws(e, r, n), t.memoizedState = hb, fs(e.child, i)) : (u !== null && (n & 62914560) === n && (n & e.lanes) !== 0 && fl(t), da(t), n = e.child, e = n.sibling, n = Sr(n, {
				mode: "visible",
				children: i.children
			}), n.return = t, n.sibling = null, e !== null && (r = t.deletions, r === null ? (t.deletions = [e], t.flags |= 16) : r.push(e)), t.child = n, t.memoizedState = null, n);
		}
		function Es(e, t) {
			return t = Ds({
				mode: "visible",
				children: t
			}, e.mode), t.return = e, e.child = t;
		}
		function Ds(e, t) {
			return e = h(22, e, null, t), e.lanes = 0, e;
		}
		function Os(e, t, n) {
			return Zv(t, e.child, null, n), e = Es(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
		}
		function ks(e, t, n) {
			e.lanes |= t;
			var r = e.alternate;
			r !== null && (r.lanes |= t), Qr(e.return, t, n);
		}
		function As(e, t, n, r, i, a) {
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
		function js(e, t, n) {
			var r = t.pendingProps, i = r.revealOrder, a = r.tail, o = r.children, s = py.current;
			if ((r = (s & fy) !== 0) ? (s = s & dy | fy, t.flags |= 128) : s &= dy, T(py, s, t), s = i ?? "null", i !== "forwards" && i !== "unstable_legacy-backwards" && i !== "together" && i !== "independent" && !pb[s]) if (pb[s] = !0, i == null) console.error("The default for the <SuspenseList revealOrder=\"...\"> prop is changing. To be future compatible you must explictly specify either \"independent\" (the current default), \"together\", \"forwards\" or \"legacy_unstable-backwards\".");
			else if (i === "backwards") console.error("The rendering order of <SuspenseList revealOrder=\"backwards\"> is changing. To be future compatible you must specify revealOrder=\"legacy_unstable-backwards\" instead.");
			else if (typeof i == "string") switch (i.toLowerCase()) {
				case "together":
				case "forwards":
				case "backwards":
				case "independent":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. Use lowercase \"%s\" instead.", i, i.toLowerCase());
					break;
				case "forward":
				case "backward":
					console.error("\"%s\" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use \"%ss\" instead.", i, i.toLowerCase());
					break;
				default: console.error("\"%s\" is not a supported revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			}
			else console.error("%s is not a supported value for revealOrder on <SuspenseList />. Did you mean \"independent\", \"together\", \"forwards\" or \"backwards\"?", i);
			s = a ?? "null", mb[s] || (a == null ? (i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && (mb[s] = !0, console.error("The default for the <SuspenseList tail=\"...\"> prop is changing. To be future compatible you must explictly specify either \"visible\" (the current default), \"collapsed\" or \"hidden\".")) : a !== "visible" && a !== "collapsed" && a !== "hidden" ? (mb[s] = !0, console.error("\"%s\" is not a supported value for tail on <SuspenseList />. Did you mean \"visible\", \"collapsed\" or \"hidden\"?", a)) : i !== "forwards" && i !== "backwards" && i !== "unstable_legacy-backwards" && (mb[s] = !0, console.error("<SuspenseList tail=\"%s\" /> is only valid if revealOrder is \"forwards\" or \"backwards\". Did you mean to specify revealOrder=\"forwards\"?", a)));
			a: if ((i === "forwards" || i === "backwards" || i === "unstable_legacy-backwards") && o != null && !1 !== o) if (Wf(o)) {
				for (s = 0; s < o.length; s++) if (!Zi(o[s], s)) break a;
			} else if (s = ie(o), typeof s == "function") {
				if (s = s.call(o)) for (var c = s.next(), l = 0; !c.done; c = s.next()) {
					if (!Zi(c.value, l)) break a;
					l++;
				}
			} else console.error("A single row was passed to a <SuspenseList revealOrder=\"%s\" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?", i);
			if (ss(e, t, o, n), e_ ? (Lr(), o = Kg) : o = 0, !r && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && ks(e, n, t);
				else if (e.tag === 19) ks(e, n, t);
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
					for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ga(e) === null && (i = n), n = n.sibling;
					n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), As(t, !1, i, n, a, o);
					break;
				case "backwards":
				case "unstable_legacy-backwards":
					for (n = null, i = t.child, t.child = null; i !== null;) {
						if (e = i.alternate, e !== null && ga(e) === null) {
							t.child = i;
							break;
						}
						e = i.sibling, i.sibling = n, n = i, i = e;
					}
					As(t, !0, n, null, a, o);
					break;
				case "together":
					As(t, !1, null, null, void 0, o);
					break;
				default: t.memoizedState = null;
			}
			return t.child;
		}
		function Ms(e, t, n) {
			if (e !== null && (t.dependencies = e.dependencies), w_ = -1, lx |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
				if (ei(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
			if (e !== null && t.child !== e.child) throw Error("Resuming work not yet implemented.");
			if (t.child !== null) {
				for (e = t.child, n = Sr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Sr(e, e.pendingProps), n.return = t;
				n.sibling = null;
			}
			return t.child;
		}
		function Ns(e, t) {
			return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && ti(e))) : !0;
		}
		function Ps(e, t, n) {
			switch (t.tag) {
				case 3:
					le(t, t.stateNode.containerInfo), Xr(t, h_, e.memoizedState.cache), Gr();
					break;
				case 27:
				case 5:
					ue(t);
					break;
				case 4:
					le(t, t.stateNode.containerInfo);
					break;
				case 10:
					Xr(t, t.type, t.memoizedProps.value);
					break;
				case 12:
					(n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
					var r = t.stateNode;
					r.effectDuration = -0, r.passiveEffectDuration = -0;
					break;
				case 31:
					if (t.memoizedState !== null) return t.flags |= 128, fa(t), null;
					break;
				case 13:
					if (r = t.memoizedState, r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (da(t), e = Ms(e, t, n), e === null ? null : e.sibling) : Ts(e, t, n) : (da(t), t.flags |= 128, null);
					da(t);
					break;
				case 19:
					var i = (e.flags & 128) != 0;
					if (r = (n & t.childLanes) !== 0, r ||= (ei(e, t, n, !1), (n & t.childLanes) !== 0), i) {
						if (r) return js(e, t, n);
						t.flags |= 128;
					}
					if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), T(py, py.current, t), r) break;
					return null;
				case 22: return t.lanes = 0, ds(e, t, n, t.pendingProps);
				case 24: Xr(t, h_, e.memoizedState.cache);
			}
			return Ms(e, t, n);
		}
		function Fs(e, t, n) {
			if (t._debugNeedsRemount && e !== null) {
				n = wr(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
				var r = t.return;
				if (r === null) throw Error("Cannot swap the root fiber.");
				if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === r.child) r.child = n;
				else {
					var i = r.child;
					if (i === null) throw Error("Expected parent to have a child.");
					for (; i.sibling !== t;) if (i = i.sibling, i === null) throw Error("Expected to find the previous sibling.");
					i.sibling = n;
				}
				return t = r.deletions, t === null ? (r.deletions = [e], r.flags |= 16) : t.push(e), n.flags |= 2, n;
			}
			if (e !== null) if (e.memoizedProps !== t.pendingProps || t.type !== e.type) sb = !0;
			else {
				if (!Ns(e, n) && !(t.flags & 128)) return sb = !1, Ps(e, t, n);
				sb = !!(e.flags & 131072);
			}
			else sb = !1, (r = e_) && (Lr(), r = (t.flags & 1048576) != 0), r && (r = t.index, Lr(), Mr(t, Kg, r));
			switch (t.lanes = 0, t.tag) {
				case 16:
					a: if (r = t.pendingProps, e = Li(t.elementType), t.type = e, typeof e == "function") xr(e) ? (r = Zo(e, r), t.tag = 1, t.type = e = hr(e), t = bs(null, t, e, r, n)) : (t.tag = 0, Ss(t, e), t.type = e = hr(e), t = vs(null, t, e, r, n));
					else {
						if (e != null) {
							if (i = e.$$typeof, i === Ff) {
								t.tag = 11, t.type = e = gr(e), t = cs(null, t, e, r, n);
								break a;
							} else if (i === Rf) {
								t.tag = 14, t = ls(null, t, e, r, n);
								break a;
							}
						}
						throw t = "", typeof e == "object" && e && e.$$typeof === zf && (t = " Did you wrap a component in React.lazy() more than once?"), n = C(e) || e, Error("Element type is invalid. Received a promise that resolves to: " + n + ". Lazy element type must resolve to a class or function." + t);
					}
					return t;
				case 0: return vs(e, t, t.type, t.pendingProps, n);
				case 1: return r = t.type, i = Zo(r, t.pendingProps), bs(e, t, r, i, n);
				case 3:
					a: {
						if (le(t, t.stateNode.containerInfo), e === null) throw Error("Should have a current fiber. This is a bug in React.");
						r = t.pendingProps;
						var a = t.memoizedState;
						i = a.element, $i(e, t), aa(t, r, null, n);
						var o = t.memoizedState;
						if (r = o.cache, Xr(t, h_, r), r !== a.cache && $r(t, [h_], n, !0), ia(), r = o.element, a.isDehydrated) if (a = {
							element: r,
							isDehydrated: !1,
							cache: o.cache
						}, t.updateQueue.baseState = a, t.memoizedState = a, t.flags & 256) {
							t = xs(e, t, r, n);
							break a;
						} else if (r !== i) {
							i = Ar(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t), qr(i), t = xs(e, t, r, n);
							break a;
						} else {
							switch (e = t.stateNode.containerInfo, e.nodeType) {
								case 9:
									e = e.body;
									break;
								default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
							}
							for ($g = hd(e.firstChild), Qg = t, e_ = !0, r_ = null, t_ = !1, n_ = null, i_ = !0, n = Qv(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
						}
						else {
							if (Gr(), r === i) {
								t = Ms(e, t, n);
								break a;
							}
							ss(e, t, r, n);
						}
						t = t.child;
					}
					return t;
				case 26: return _s(e, t), e === null ? (n = Od(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : e_ || (n = t.type, e = t.pendingProps, r = ce(Qf.current), r = Lu(r).createElement(n), r[Up] = t, r[Wp] = e, Cu(r, n, e), Qe(r), t.stateNode = r) : t.memoizedState = Od(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
				case 27: return ue(t), e === null && e_ && (r = ce(Qf.current), i = D(), r = t.stateNode = Cd(t.type, t.pendingProps, r, i, !1), t_ || (i = Nu(r, t.type, t.pendingProps, i), i !== null && (Rr(t, 0).serverProps = i)), Qg = t, i_ = !0, i = $g, Zu(t.type) ? (rC = i, $g = hd(r.firstChild)) : $g = i), ss(e, t, t.pendingProps.children, n), _s(e, t), e === null && (t.flags |= 4194304), t.child;
				case 5: return e === null && e_ && (a = D(), r = Kt(t.type, a.ancestorInfo), i = $g, (o = !i) || (o = ld(i, t.type, t.pendingProps, i_), o === null ? a = !1 : (t.stateNode = o, t_ || (a = Nu(o, t.type, t.pendingProps, a), a !== null && (Rr(t, 0).serverProps = a)), Qg = t, $g = hd(o.firstChild), i_ = !1, a = !0), o = !a), o && (r && Br(t, i), Vr(t))), ue(t), i = t.type, a = t.pendingProps, o = e === null ? null : e.memoizedProps, r = a.children, Bu(i, a) ? r = null : o !== null && Bu(i, o) && (t.flags |= 32), t.memoizedState !== null && (i = xa(e, t, wa, null, null, n), xC._currentValue = i), _s(e, t), ss(e, t, r, n), t.child;
				case 6: return e === null && e_ && (n = t.pendingProps, e = D(), r = e.ancestorInfo.current, n = r == null ? !0 : qt(n, r.tag, e.ancestorInfo.implicitRootScope), e = $g, (r = !e) || (r = ud(e, t.pendingProps, i_), r === null ? r = !1 : (t.stateNode = r, Qg = t, $g = null, r = !0), r = !r), r && (n && Br(t, e), Vr(t))), null;
				case 13: return Ts(e, t, n);
				case 4: return le(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Zv(t, null, r, n) : ss(e, t, r, n), t.child;
				case 11: return cs(e, t, t.type, t.pendingProps, n);
				case 7: return ss(e, t, t.pendingProps, n), t.child;
				case 8: return ss(e, t, t.pendingProps.children, n), t.child;
				case 12: return t.flags |= 4, t.flags |= 2048, r = t.stateNode, r.effectDuration = -0, r.passiveEffectDuration = -0, ss(e, t, t.pendingProps.children, n), t.child;
				case 10: return r = t.type, i = t.pendingProps, a = i.value, "value" in i || gb || (gb = !0, console.error("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?")), Xr(t, r, a), ss(e, t, i.children, n), t.child;
				case 9: return i = t.type._context, r = t.pendingProps.children, typeof r != "function" && console.error("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ni(t), i = ri(i), r = xv(r, i, void 0), t.flags |= 1, ss(e, t, r, n), t.child;
				case 14: return ls(e, t, t.type, t.pendingProps, n);
				case 15: return us(e, t, t.type, t.pendingProps, n);
				case 19: return js(e, t, n);
				case 31: return gs(e, t, n);
				case 22: return ds(e, t, n, t.pendingProps);
				case 24: return ni(t), r = ri(h_), e === null ? (i = ji(), i === null && (i = Gb, a = oi(), i.pooledCache = a, si(a), a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
					parent: r,
					cache: i
				}, Qi(t), Xr(t, h_, i)) : ((e.lanes & n) !== 0 && ($i(e, t), aa(t, null, null, n), ia()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, Xr(t, h_, r), r !== i.cache && $r(t, [h_], n, !0)) : (i = {
					parent: r,
					cache: r
				}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Xr(t, h_, r))), ss(e, t, t.pendingProps.children, n), t.child;
				case 29: throw t.pendingProps;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Is(e) {
			e.flags |= 4;
		}
		function Ls(e, t, n, r, i) {
			if ((t = (e.mode & zg) !== G) && (t = !1), t) {
				if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
				else if (ll()) e.flags |= 8192;
				else throw Hv = Vv, zv;
			} else e.flags &= -16777217;
		}
		function Rs(e, t) {
			if (t.type !== "stylesheet" || (t.state.loading & cC) !== iC) e.flags &= -16777217;
			else if (e.flags |= 16777216, !Hd(t)) if (ll()) e.flags |= 8192;
			else throw Hv = Vv, zv;
		}
		function zs(e, t) {
			t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Pe(), e.lanes |= t, px |= t);
		}
		function Bs(e, t) {
			if (!e_) switch (e.tailMode) {
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
		function Vs(e) {
			var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
			if (t) if ((e.mode & K) !== G) {
				for (var i = e.selfBaseDuration, a = e.child; a !== null;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 65011712, r |= a.flags & 65011712, i += a.treeBaseDuration, a = a.sibling;
				e.treeBaseDuration = i;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
			else if ((e.mode & K) !== G) {
				i = e.actualDuration, a = e.selfBaseDuration;
				for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, i += o.actualDuration, a += o.treeBaseDuration, o = o.sibling;
				e.actualDuration = i, e.treeBaseDuration = a;
			} else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
			return e.subtreeFlags |= r, e.childLanes = n, t;
		}
		function Hs(e, t, n) {
			var r = t.pendingProps;
			switch (Pr(t), t.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return Vs(t), null;
				case 1: return Vs(t), null;
				case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Zr(h_, t), E(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Wr(t) ? (Jr(), Is(t)) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Kr())), Vs(t), null;
				case 26:
					var i = t.type, a = t.memoizedState;
					return e === null ? (Is(t), a === null ? (Vs(t), Ls(t, i, null, r, n)) : (Vs(t), Rs(t, a))) : a ? a === e.memoizedState ? (Vs(t), t.flags &= -16777217) : (Is(t), Vs(t), Rs(t, a)) : (e = e.memoizedProps, e !== r && Is(t), Vs(t), Ls(t, i, e, r, n)), null;
				case 27:
					if (de(t), n = ce(Qf.current), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Is(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Vs(t), null;
						}
						e = D(), Wr(t) ? Hr(t, e) : (e = Cd(i, r, n, e, !0), t.stateNode = e, Is(t));
					}
					return Vs(t), null;
				case 5:
					if (de(t), i = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Is(t);
					else {
						if (!r) {
							if (t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
							return Vs(t), null;
						}
						var o = D();
						if (Wr(t)) Hr(t, o);
						else {
							switch (a = ce(Qf.current), Kt(i, o.ancestorInfo), o = o.context, a = Lu(a), o) {
								case GS:
									a = a.createElementNS(Nm, i);
									break;
								case KS:
									a = a.createElementNS(Mm, i);
									break;
								default: switch (i) {
									case "svg":
										a = a.createElementNS(Nm, i);
										break;
									case "math":
										a = a.createElementNS(Mm, i);
										break;
									case "script":
										a = a.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild);
										break;
									case "select":
										a = typeof r.is == "string" ? a.createElement("select", { is: r.is }) : a.createElement("select"), r.multiple ? a.multiple = !0 : r.size && (a.size = r.size);
										break;
									default: a = typeof r.is == "string" ? a.createElement(i, { is: r.is }) : a.createElement(i), i.indexOf("-") === -1 && (i !== i.toLowerCase() && console.error("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", i), Object.prototype.toString.call(a) !== "[object HTMLUnknownElement]" || mp.call(YS, i) || (YS[i] = !0, console.error("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", i)));
								}
							}
							a[Up] = t, a[Wp] = r;
							a: for (o = t.child; o !== null;) {
								if (o.tag === 5 || o.tag === 6) a.appendChild(o.stateNode);
								else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
									o.child.return = o, o = o.child;
									continue;
								}
								if (o === t) break a;
								for (; o.sibling === null;) {
									if (o.return === null || o.return === t) break a;
									o = o.return;
								}
								o.sibling.return = o.return, o = o.sibling;
							}
							t.stateNode = a;
							a: switch (Cu(a, i, r), i) {
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
							r && Is(t);
						}
					}
					return Vs(t), Ls(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
				case 6:
					if (e && t.stateNode != null) e.memoizedProps !== r && Is(t);
					else {
						if (typeof r != "string" && t.stateNode === null) throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
						if (e = ce(Qf.current), n = D(), Wr(t)) {
							if (e = t.stateNode, n = t.memoizedProps, i = !t_, r = null, a = Qg, a !== null) switch (a.tag) {
								case 3:
									i && (i = _d(e, n, r), i !== null && (Rr(t, 0).serverProps = i));
									break;
								case 27:
								case 5: r = a.memoizedProps, i && (i = _d(e, n, r), i !== null && (Rr(t, 0).serverProps = i));
							}
							e[Up] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || bu(e.nodeValue, n)), e || Vr(t, !0);
						} else i = n.ancestorInfo.current, i != null && qt(r, i.tag, n.ancestorInfo.implicitRootScope), e = Lu(e).createTextNode(r), e[Up] = t, t.stateNode = e;
					}
					return Vs(t), null;
				case 31:
					if (n = t.memoizedState, e === null || e.memoizedState !== null) {
						if (r = Wr(t), n !== null) {
							if (e === null) {
								if (!r) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error("Expected to have a hydrated activity instance. This error is likely caused by a bug in React. Please file an issue.");
								e[Up] = t, Vs(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							} else Jr(), Gr(), !(t.flags & 128) && (n = t.memoizedState = null), t.flags |= 4, Vs(t), (t.mode & K) !== G && n !== null && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration));
							e = !1;
						} else n = Kr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
						if (!e) return t.flags & 256 ? (ha(t), t) : (ha(t), null);
						if (t.flags & 128) throw Error("Client rendering an Activity suspended it again. This is a bug in React.");
					}
					return Vs(t), null;
				case 13:
					if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
						if (i = r, a = Wr(t), i !== null && i.dehydrated !== null) {
							if (e === null) {
								if (!a) throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
								if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
								a[Up] = t, Vs(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							} else Jr(), Gr(), !(t.flags & 128) && (i = t.memoizedState = null), t.flags |= 4, Vs(t), (t.mode & K) !== G && i !== null && (i = t.child, i !== null && (t.treeBaseDuration -= i.treeBaseDuration));
							i = !1;
						} else i = Kr(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), i = !0;
						if (!i) return t.flags & 256 ? (ha(t), t) : (ha(t), null);
					}
					return ha(t), t.flags & 128 ? (t.lanes = n, (t.mode & K) !== G && Di(t), t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool), a = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), zs(t, t.updateQueue), Vs(t), (t.mode & K) !== G && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
				case 4: return E(t), e === null && su(t.stateNode.containerInfo), Vs(t), null;
				case 10: return Zr(t.type, t), Vs(t), null;
				case 19:
					if (se(py, t), r = t.memoizedState, r === null) return Vs(t), null;
					if (i = (t.flags & 128) != 0, a = r.rendering, a === null) if (i) Bs(r, !1);
					else {
						if (cx !== Lb || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (a = ga(e), a !== null) {
								for (t.flags |= 128, Bs(r, !1), e = a.updateQueue, t.updateQueue = e, zs(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Cr(n, e), n = n.sibling;
								return T(py, py.current & dy | fy, t), e_ && jr(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && yp() > bx && (t.flags |= 128, i = !0, Bs(r, !1), t.lanes = 4194304);
					}
					else {
						if (!i) if (e = ga(a), e !== null) {
							if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, zs(t, e), Bs(r, !0), r.tail === null && r.tailMode === "hidden" && !a.alternate && !e_) return Vs(t), null;
						} else 2 * yp() - r.renderingStartTime > bx && n !== 536870912 && (t.flags |= 128, i = !0, Bs(r, !1), t.lanes = 4194304);
						r.isBackwards ? (a.sibling = t.child, t.child = a) : (e = r.last, e === null ? t.child = a : e.sibling = a, r.last = a);
					}
					return r.tail === null ? (Vs(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = yp(), e.sibling = null, n = py.current, n = i ? n & dy | fy : n & dy, T(py, n, t), e_ && jr(t, r.treeForkCount), e);
				case 22:
				case 23: return ha(t), ua(t), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Vs(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Vs(t), n = t.updateQueue, n !== null && zs(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && se(lv, t), null;
				case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Zr(h_, t), Vs(t), null;
				case 25: return null;
				case 30: return null;
			}
			throw Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
		}
		function Us(e, t) {
			switch (Pr(t), t.tag) {
				case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Di(t), t) : null;
				case 3: return Zr(h_, t), E(t), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
				case 26:
				case 27:
				case 5: return de(t), null;
				case 31:
					if (t.memoizedState !== null) {
						if (ha(t), t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Gr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Di(t), t) : null;
				case 13:
					if (ha(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
						if (t.alternate === null) throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
						Gr();
					}
					return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Di(t), t) : null;
				case 19: return se(py, t), null;
				case 4: return E(t), null;
				case 10: return Zr(t.type, t), null;
				case 22:
				case 23: return ha(t), ua(t), e !== null && se(lv, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & K) !== G && Di(t), t) : null;
				case 24: return Zr(h_, t), null;
				case 25: return null;
				default: return null;
			}
		}
		function Ws(e, t) {
			switch (Pr(t), t.tag) {
				case 3:
					Zr(h_, t), E(t);
					break;
				case 26:
				case 27:
				case 5:
					de(t);
					break;
				case 4:
					E(t);
					break;
				case 31:
					t.memoizedState !== null && ha(t);
					break;
				case 13:
					ha(t);
					break;
				case 19:
					se(py, t);
					break;
				case 10:
					Zr(t.type, t);
					break;
				case 22:
				case 23:
					ha(t), ua(t), e !== null && se(lv, t);
					break;
				case 24: Zr(h_, t);
			}
		}
		function Gs(e) {
			return (e.mode & K) !== G;
		}
		function Ks(e, t) {
			Gs(e) ? (Ei(), Js(t, e), wi()) : Js(t, e);
		}
		function qs(e, t, n) {
			Gs(e) ? (Ei(), Ys(n, e, t), wi()) : Ys(n, e, t);
		}
		function Js(e, t) {
			try {
				var n = t.updateQueue, r = n === null ? null : n.lastEffect;
				if (r !== null) {
					var i = r.next;
					n = i;
					do {
						if ((n.tag & e) === e && (r = void 0, (e & gy) !== my && (eS = !0), r = A(t, Nv, n), (e & gy) !== my && (eS = !1), r !== void 0 && typeof r != "function")) {
							var a = void 0;
							a = (n.tag & _y) === 0 ? (n.tag & gy) === 0 ? "useEffect" : "useInsertionEffect" : "useLayoutEffect";
							var o = void 0;
							o = r === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof r.then == "function" ? "\n\nIt looks like you wrote " + a + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + a + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + r, A(t, function(e, t) {
								console.error("%s must not return anything besides a function, which is used for clean-up.%s", e, t);
							}, a, o);
						}
						n = n.next;
					} while (n !== i);
				}
			} catch (e) {
				Nl(t, t.return, e);
			}
		}
		function Ys(e, t, n) {
			try {
				var r = t.updateQueue, i = r === null ? null : r.lastEffect;
				if (i !== null) {
					var a = i.next;
					r = a;
					do {
						if ((r.tag & e) === e) {
							var o = r.inst, s = o.destroy;
							s !== void 0 && (o.destroy = void 0, (e & gy) !== my && (eS = !0), i = t, A(i, Fv, i, n, s), (e & gy) !== my && (eS = !1));
						}
						r = r.next;
					} while (r !== a);
				}
			} catch (e) {
				Nl(t, t.return, e);
			}
		}
		function Xs(e, t) {
			Gs(e) ? (Ei(), Js(t, e), wi()) : Js(t, e);
		}
		function Zs(e, t, n) {
			Gs(e) ? (Ei(), Ys(n, e, t), wi()) : Ys(n, e, t);
		}
		function Qs(e) {
			var t = e.updateQueue;
			if (t !== null) {
				var n = e.stateNode;
				e.type.defaultProps || "ref" in e.memoizedProps || fb || (n.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), n.state !== e.memoizedState && console.error("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
				try {
					A(e, sa, t, n);
				} catch (t) {
					Nl(e, e.return, t);
				}
			}
		}
		function $s(e, t, n) {
			return e.getSnapshotBeforeUpdate(t, n);
		}
		function ec(e, t) {
			var n = t.memoizedProps, r = t.memoizedState;
			t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || fb || (t.props !== e.memoizedProps && console.error("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(e) || "instance"), t.state !== e.memoizedState && console.error("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(e) || "instance"));
			try {
				var i = Zo(e.type, n), a = A(e, $s, t, i, r);
				n = _b, a !== void 0 || n.has(e.type) || (n.add(e.type), A(e, function() {
					console.error("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", w(e));
				})), t.__reactInternalSnapshotBeforeUpdate = a;
			} catch (t) {
				Nl(e, e.return, t);
			}
		}
		function tc(e, t, n) {
			n.props = Zo(e.type, e.memoizedProps), n.state = e.memoizedState, Gs(e) ? (Ei(), A(e, jv, e, t, n), wi()) : A(e, jv, e, t, n);
		}
		function nc(e) {
			var t = e.ref;
			if (t !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var n = e.stateNode;
						break;
					case 30:
						n = e.stateNode;
						break;
					default: n = e.stateNode;
				}
				if (typeof t == "function") if (Gs(e)) try {
					Ei(), e.refCleanup = t(n);
				} finally {
					wi();
				}
				else e.refCleanup = t(n);
				else typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", w(e)), t.current = n;
			}
		}
		function rc(e, t) {
			try {
				A(e, nc, e);
			} catch (n) {
				Nl(e, t, n);
			}
		}
		function ic(e, t) {
			var n = e.ref, r = e.refCleanup;
			if (n !== null) if (typeof r == "function") try {
				if (Gs(e)) try {
					Ei(), A(e, r);
				} finally {
					wi(e);
				}
				else A(e, r);
			} catch (n) {
				Nl(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				if (Gs(e)) try {
					Ei(), A(e, n, null);
				} finally {
					wi(e);
				}
				else A(e, n, null);
			} catch (n) {
				Nl(e, t, n);
			}
			else n.current = null;
		}
		function ac(e, t, n, r) {
			var i = e.memoizedProps, a = i.id, o = i.onCommit;
			i = i.onRender, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(a, t, e.actualDuration, e.treeBaseDuration, e.actualStartTime, n), typeof o == "function" && o(a, t, r, n);
		}
		function oc(e, t, n, r) {
			var i = e.memoizedProps;
			e = i.id, i = i.onPostCommit, t = t === null ? "mount" : "update", nv && (t = "nested-update"), typeof i == "function" && i(e, t, r, n);
		}
		function sc(e) {
			var t = e.type, n = e.memoizedProps, r = e.stateNode;
			try {
				A(e, Gu, r, t, n, e);
			} catch (t) {
				Nl(e, e.return, t);
			}
		}
		function cc(e, t, n) {
			try {
				A(e, qu, e.stateNode, e.type, n, t, e);
			} catch (t) {
				Nl(e, e.return, t);
			}
		}
		function lc(e) {
			return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zu(e.type) || e.tag === 4;
		}
		function uc(e) {
			a: for (;;) {
				for (; e.sibling === null;) {
					if (e.return === null || lc(e.return)) return null;
					e = e.return;
				}
				for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
					if (e.tag === 27 && Zu(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
					e.child.return = e, e = e.child;
				}
				if (!(e.flags & 2)) return e.stateNode;
			}
		}
		function dc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? (Xu(n), (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t)) : (Xu(n), t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = on));
			else if (r !== 4 && (r === 27 && Zu(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (dc(e, t, n), e = e.sibling; e !== null;) dc(e, t, n), e = e.sibling;
		}
		function fc(e, t, n) {
			var r = e.tag;
			if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
			else if (r !== 4 && (r === 27 && Zu(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (fc(e, t, n), e = e.sibling; e !== null;) fc(e, t, n), e = e.sibling;
		}
		function pc(e) {
			for (var t, n = e.return; n !== null;) {
				if (lc(n)) {
					t = n;
					break;
				}
				n = n.return;
			}
			if (t == null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
			switch (t.tag) {
				case 27:
					t = t.stateNode, n = uc(e), fc(e, n, t);
					break;
				case 5:
					n = t.stateNode, t.flags & 32 && (Ju(n), t.flags &= -33), t = uc(e), fc(e, t, n);
					break;
				case 3:
				case 4:
					t = t.stateNode.containerInfo, n = uc(e), dc(e, n, t);
					break;
				default: throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
			}
		}
		function mc(e) {
			var t = e.stateNode, n = e.memoizedProps;
			try {
				A(e, wd, e.type, n, t, e);
			} catch (t) {
				Nl(e, e.return, t);
			}
		}
		function hc(e, t) {
			return t.tag === 31 ? (t = t.memoizedState, e.memoizedState !== null && t === null) : t.tag === 13 ? (e = e.memoizedState, t = t.memoizedState, e !== null && e.dehydrated !== null && (t === null || t.dehydrated === null)) : t.tag === 3 ? e.memoizedState.isDehydrated && (t.flags & 256) == 0 : !1;
		}
		function gc(e, t) {
			if (e = e.containerInfo, qS = RC, e = zn(e), Bn(e)) {
				if ("selectionStart" in e) var n = {
					start: e.selectionStart,
					end: e.selectionEnd
				};
				else a: {
					n = (n = e.ownerDocument) && n.defaultView || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var i = r.anchorOffset, a = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, a.nodeType;
						} catch {
							n = null;
							break a;
						}
						var o = 0, s = -1, c = -1, l = 0, u = 0, d = e, f = null;
						b: for (;;) {
							for (var p; d !== n || i !== 0 && d.nodeType !== 3 || (s = o + i), d !== a || r !== 0 && d.nodeType !== 3 || (c = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null;) f = d, d = p;
							for (;;) {
								if (d === e) break b;
								if (f === n && ++l === i && (s = o), f === a && ++u === r && (c = o), (p = d.nextSibling) !== null) break;
								d = f, f = d.parentNode;
							}
							d = p;
						}
						n = s === -1 || c === -1 ? null : {
							start: s,
							end: c
						};
					} else n = null;
				}
				n ||= {
					start: 0,
					end: 0
				};
			} else n = null;
			for (JS = {
				focusedElem: e,
				selectionRange: n
			}, RC = !1, Sb = t; Sb !== null;) if (t = Sb, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Sb = e;
			else for (; Sb !== null;) {
				switch (e = t = Sb, n = e.alternate, i = e.flags, e.tag) {
					case 0:
						if (i & 4 && (e = e.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) i = e[n], i.ref.impl = i.nextImpl;
						break;
					case 11:
					case 15: break;
					case 1:
						i & 1024 && n !== null && ec(e, n);
						break;
					case 3:
						if (i & 1024) {
							if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9) cd(e);
							else if (n === 1) switch (e.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									cd(e);
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
					default: if (i & 1024) throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
				}
				if (e = t.sibling, e !== null) {
					e.return = t.return, Sb = e;
					break;
				}
				Sb = t.return;
			}
		}
		function _c(e, t, n) {
			var r = hi(), i = _i(), a = yi(), o = bi(), s = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					kc(e, n), s & 4 && Ks(n, _y | hy);
					break;
				case 1:
					if (kc(e, n), s & 4) if (e = n.stateNode, t === null) n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Gs(n) ? (Ei(), A(n, Tv, n, e), wi()) : A(n, Tv, n, e);
					else {
						var c = Zo(n.type, t.memoizedProps);
						t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || fb || (e.props !== n.memoizedProps && console.error("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", w(n) || "instance"), e.state !== n.memoizedState && console.error("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", w(n) || "instance")), Gs(n) ? (Ei(), A(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate), wi()) : A(n, Dv, n, e, c, t, e.__reactInternalSnapshotBeforeUpdate);
					}
					s & 64 && Qs(n), s & 512 && rc(n, n.return);
					break;
				case 3:
					if (t = di(), kc(e, n), s & 64 && (s = n.updateQueue, s !== null)) {
						if (c = null, n.child !== null) switch (n.child.tag) {
							case 27:
							case 5:
								c = n.child.stateNode;
								break;
							case 1: c = n.child.stateNode;
						}
						try {
							A(n, sa, s, c);
						} catch (e) {
							Nl(n, n.return, e);
						}
					}
					e.effectDuration += fi(t);
					break;
				case 27: t === null && s & 4 && mc(n);
				case 26:
				case 5:
					if (kc(e, n), t === null) {
						if (s & 4) sc(n);
						else if (s & 64) {
							e = n.type, t = n.memoizedProps, c = n.stateNode;
							try {
								A(n, Ku, c, e, t, n);
							} catch (e) {
								Nl(n, n.return, e);
							}
						}
					}
					s & 512 && rc(n, n.return);
					break;
				case 12:
					if (s & 4) {
						s = di(), kc(e, n), e = n.stateNode, e.effectDuration += pi(s);
						try {
							A(n, ac, n, t, x_, e.effectDuration);
						} catch (e) {
							Nl(n, n.return, e);
						}
					} else kc(e, n);
					break;
				case 31:
					kc(e, n), s & 4 && xc(e, n);
					break;
				case 13:
					kc(e, n), s & 4 && Sc(e, n), s & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = Ll.bind(null, n), md(e, s))));
					break;
				case 22:
					if (s = n.memoizedState !== null || vb, !s) {
						t = t !== null && t.memoizedState !== null || yb, c = vb;
						var l = yb;
						vb = s, (yb = t) && !l ? (Nc(e, n, (n.subtreeFlags & 8772) != 0), (n.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Zn(n, q, J)) : kc(e, n), vb = c, yb = l;
					}
					break;
				case 30: break;
				default: kc(e, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && ((O_ || .05 < E_) && er(n, q, J, E_, D_), n.alternate === null && n.return !== null && n.return.alternate !== null && .05 < J - q && (hc(n.return.alternate, n.return) || Xn(n, q, J, "Mount"))), gi(r), vi(i), D_ = a, O_ = o;
		}
		function vc(e) {
			var t = e.alternate;
			t !== null && (e.alternate = null, vc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && qe(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
		}
		function yc(e, t, n) {
			for (n = n.child; n !== null;) bc(e, t, n), n = n.sibling;
		}
		function bc(e, t, n) {
			if (kp && typeof kp.onCommitFiberUnmount == "function") try {
				kp.onCommitFiberUnmount(Op, n);
			} catch (e) {
				Ap || (Ap = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			var r = hi(), i = _i(), a = yi(), o = bi();
			switch (n.tag) {
				case 26:
					yb || ic(n, t), yc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (e = n.stateNode, e.parentNode.removeChild(e));
					break;
				case 27:
					yb || ic(n, t);
					var s = Tb, c = Eb;
					Zu(n.type) && (Tb = n.stateNode, Eb = !1), yc(e, t, n), A(n, Td, n.stateNode), Tb = s, Eb = c;
					break;
				case 5: yb || ic(n, t);
				case 6:
					if (s = Tb, c = Eb, Tb = null, yc(e, t, n), Tb = s, Eb = c, Tb !== null) if (Eb) try {
						A(n, $u, Tb, n.stateNode);
					} catch (e) {
						Nl(n, t, e);
					}
					else try {
						A(n, Qu, Tb, n.stateNode);
					} catch (e) {
						Nl(n, t, e);
					}
					break;
				case 18:
					Tb !== null && (Eb ? (e = Tb, ed(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), yf(e)) : ed(Tb, n.stateNode));
					break;
				case 4:
					s = Tb, c = Eb, Tb = n.stateNode.containerInfo, Eb = !0, yc(e, t, n), Tb = s, Eb = c;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					Ys(gy, n, t), yb || qs(n, t, _y), yc(e, t, n);
					break;
				case 1:
					yb || (ic(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function" && tc(n, t, s)), yc(e, t, n);
					break;
				case 21:
					yc(e, t, n);
					break;
				case 22:
					yb = (s = yb) || n.memoizedState !== null, yc(e, t, n), yb = s;
					break;
				default: yc(e, t, n);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(n, q, J, E_, D_), gi(r), vi(i), D_ = a, O_ = o;
		}
		function xc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
				e = e.dehydrated;
				try {
					A(t, xd, e);
				} catch (e) {
					Nl(t, t.return, e);
				}
			}
		}
		function Sc(e, t) {
			if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
				A(t, Sd, e);
			} catch (e) {
				Nl(t, t.return, e);
			}
		}
		function Cc(e) {
			switch (e.tag) {
				case 31:
				case 13:
				case 19:
					var t = e.stateNode;
					return t === null && (t = e.stateNode = new xb()), t;
				case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new xb()), t;
				default: throw Error("Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React.");
			}
		}
		function wc(e, t) {
			var n = Cc(e);
			t.forEach(function(t) {
				if (!n.has(t)) {
					if (n.add(t), jp) if (Cb !== null && wb !== null) Ul(wb, Cb);
					else throw Error("Expected finished root and lanes to be set. This is a bug in React.");
					var r = Rl.bind(null, e, t);
					t.then(r, r);
				}
			});
		}
		function Tc(e, t) {
			var n = t.deletions;
			if (n !== null) for (var r = 0; r < n.length; r++) {
				var i = e, a = t, o = n[r], s = hi(), c = a;
				a: for (; c !== null;) {
					switch (c.tag) {
						case 27:
							if (Zu(c.type)) {
								Tb = c.stateNode, Eb = !1;
								break a;
							}
							break;
						case 5:
							Tb = c.stateNode, Eb = !1;
							break a;
						case 3:
						case 4:
							Tb = c.stateNode.containerInfo, Eb = !0;
							break a;
					}
					c = c.return;
				}
				if (Tb === null) throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
				bc(i, a, o), Tb = null, Eb = !1, (o.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Xn(o, q, J, "Unmount"), gi(s), i = o, a = i.alternate, a !== null && (a.return = null), i.return = null;
			}
			if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Ec(t, e), t = t.sibling;
		}
		function Ec(e, t) {
			var n = hi(), r = _i(), i = yi(), a = bi(), o = e.alternate, s = e.flags;
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Tc(t, e), Dc(e), s & 4 && (Ys(gy | hy, e, e.return), Js(gy | hy, e), qs(e, e.return, _y | hy));
					break;
				case 1:
					if (Tc(t, e), Dc(e), s & 512 && (yb || o === null || ic(o, o.return)), s & 64 && vb && (s = e.updateQueue, s !== null && (o = s.callbacks, o !== null))) {
						var c = s.shared.hiddenCallbacks;
						s.shared.hiddenCallbacks = c === null ? o : c.concat(o);
					}
					break;
				case 26:
					if (c = Db, Tc(t, e), Dc(e), s & 512 && (yb || o === null || ic(o, o.return)), s & 4) {
						var l = o === null ? null : o.memoizedState;
						if (s = e.memoizedState, o === null) if (s === null) if (e.stateNode === null) {
							a: {
								s = e.type, o = e.memoizedProps, c = c.ownerDocument || c;
								b: switch (s) {
									case "title":
										l = c.getElementsByTagName("title")[0], (!l || l[Xp] || l[Up] || l.namespaceURI === Nm || l.hasAttribute("itemprop")) && (l = c.createElement(s), c.head.insertBefore(l, c.querySelector("head > title"))), Cu(l, s, o), l[Up] = e, Qe(l), s = l;
										break a;
									case "link":
										var u = zd("link", "href", c).get(s + (o.href || ""));
										if (u) {
											for (var d = 0; d < u.length; d++) if (l = u[d], l.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && l.getAttribute("rel") === (o.rel == null ? null : o.rel) && l.getAttribute("title") === (o.title == null ? null : o.title) && l.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Cu(l, s, o), c.head.appendChild(l);
										break;
									case "meta":
										if (u = zd("meta", "content", c).get(s + (o.content || ""))) {
											for (d = 0; d < u.length; d++) if (l = u[d], j(o.content, "content"), l.getAttribute("content") === (o.content == null ? null : "" + o.content) && l.getAttribute("name") === (o.name == null ? null : o.name) && l.getAttribute("property") === (o.property == null ? null : o.property) && l.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && l.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
												u.splice(d, 1);
												break b;
											}
										}
										l = c.createElement(s), Cu(l, s, o), c.head.appendChild(l);
										break;
									default: throw Error("getNodesForType encountered a type it did not expect: \"" + s + "\". This is a bug in React.");
								}
								l[Up] = e, Qe(l), s = l;
							}
							e.stateNode = s;
						} else Bd(c, e.type, e.stateNode);
						else e.stateNode = Fd(c, s, e.memoizedProps);
						else l === s ? s === null && e.stateNode !== null && cc(e, e.memoizedProps, o.memoizedProps) : (l === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : l.count--, s === null ? Bd(c, e.type, e.stateNode) : Fd(c, s, e.memoizedProps));
					}
					break;
				case 27:
					Tc(t, e), Dc(e), s & 512 && (yb || o === null || ic(o, o.return)), o !== null && s & 4 && cc(e, e.memoizedProps, o.memoizedProps);
					break;
				case 5:
					if (Tc(t, e), Dc(e), s & 512 && (yb || o === null || ic(o, o.return)), e.flags & 32) {
						c = e.stateNode;
						try {
							A(e, Ju, c);
						} catch (t) {
							Nl(e, e.return, t);
						}
					}
					s & 4 && e.stateNode != null && (c = e.memoizedProps, cc(e, c, o === null ? c : o.memoizedProps)), s & 1024 && (bb = !0, e.type !== "form" && console.error("Unexpected host component type. Expected a form. This is a bug in React."));
					break;
				case 6:
					if (Tc(t, e), Dc(e), s & 4) {
						if (e.stateNode === null) throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
						s = e.memoizedProps, o = o === null ? s : o.memoizedProps, c = e.stateNode;
						try {
							A(e, Yu, c, o, s);
						} catch (t) {
							Nl(e, e.return, t);
						}
					}
					break;
				case 3:
					if (c = di(), pC = null, l = Db, Db = Ed(t.containerInfo), Tc(t, e), Db = l, Dc(e), s & 4 && o !== null && o.memoizedState.isDehydrated) try {
						A(e, bd, t.containerInfo);
					} catch (t) {
						Nl(e, e.return, t);
					}
					bb && (bb = !1, Oc(e)), t.effectDuration += fi(c);
					break;
				case 4:
					s = Db, Db = Ed(e.stateNode.containerInfo), Tc(t, e), Dc(e), Db = s;
					break;
				case 12:
					s = di(), Tc(t, e), Dc(e), e.stateNode.effectDuration += pi(s);
					break;
				case 31:
					Tc(t, e), Dc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, wc(e, s)));
					break;
				case 13:
					Tc(t, e), Dc(e), e.child.flags & 8192 && e.memoizedState !== null != (o !== null && o.memoizedState !== null) && (_x = yp()), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, wc(e, s)));
					break;
				case 22:
					c = e.memoizedState !== null;
					var f = o !== null && o.memoizedState !== null, p = vb, m = yb;
					if (vb = p || c, yb = m || f, Tc(t, e), yb = m, vb = p, f && !c && !p && !m && (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Zn(e, q, J), Dc(e), s & 8192) a: for (t = e.stateNode, t._visibility = c ? t._visibility & ~Og : t._visibility | Og, !c || o === null || f || vb || yb || (jc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Xn(e, q, J, "Disconnect")), o = null, t = e;;) {
						if (t.tag === 5 || t.tag === 26) {
							if (o === null) {
								f = o = t;
								try {
									l = f.stateNode, c ? A(f, rd, l) : A(f, od, f.stateNode, f.memoizedProps);
								} catch (e) {
									Nl(f, f.return, e);
								}
							}
						} else if (t.tag === 6) {
							if (o === null) {
								f = t;
								try {
									u = f.stateNode, c ? A(f, id, u) : A(f, sd, u, f.memoizedProps);
								} catch (e) {
									Nl(f, f.return, e);
								}
							}
						} else if (t.tag === 18) {
							if (o === null) {
								f = t;
								try {
									d = f.stateNode, c ? A(f, nd, d) : A(f, ad, f.stateNode);
								} catch (e) {
									Nl(f, f.return, e);
								}
							}
						} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
							t.child.return = t, t = t.child;
							continue;
						}
						if (t === e) break a;
						for (; t.sibling === null;) {
							if (t.return === null || t.return === e) break a;
							o === t && (o = null), t = t.return;
						}
						o === t && (o = null), t.sibling.return = t.return, t = t.sibling;
					}
					s & 4 && (s = e.updateQueue, s !== null && (o = s.retryQueue, o !== null && (s.retryQueue = null, wc(e, o))));
					break;
				case 19:
					Tc(t, e), Dc(e), s & 4 && (s = e.updateQueue, s !== null && (e.updateQueue = null, wc(e, s)));
					break;
				case 30: break;
				case 21: break;
				default: Tc(t, e), Dc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && ((O_ || .05 < E_) && er(e, q, J, E_, D_), e.alternate === null && e.return !== null && e.return.alternate !== null && .05 < J - q && (hc(e.return.alternate, e.return) || Xn(e, q, J, "Mount"))), gi(n), vi(r), D_ = i, O_ = a;
		}
		function Dc(e) {
			var t = e.flags;
			if (t & 2) {
				try {
					A(e, pc, e);
				} catch (t) {
					Nl(e, e.return, t);
				}
				e.flags &= -3;
			}
			t & 4096 && (e.flags &= -4097);
		}
		function Oc(e) {
			if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
				var t = e;
				Oc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
			}
		}
		function kc(e, t) {
			if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) _c(e, t.alternate, t), t = t.sibling;
		}
		function Ac(e) {
			var t = hi(), n = _i(), r = yi(), i = bi();
			switch (e.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					qs(e, e.return, _y), jc(e);
					break;
				case 1:
					ic(e, e.return);
					var a = e.stateNode;
					typeof a.componentWillUnmount == "function" && tc(e, e.return, a), jc(e);
					break;
				case 27: A(e, Td, e.stateNode);
				case 26:
				case 5:
					ic(e, e.return), jc(e);
					break;
				case 22:
					e.memoizedState === null && jc(e);
					break;
				case 30:
					jc(e);
					break;
				default: jc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(e, q, J, E_, D_), gi(t), vi(n), D_ = r, O_ = i;
		}
		function jc(e) {
			for (e = e.child; e !== null;) Ac(e), e = e.sibling;
		}
		function Mc(e, t, n, r) {
			var i = hi(), a = _i(), o = yi(), s = bi(), c = n.flags;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Nc(e, n, r), Ks(n, _y);
					break;
				case 1:
					if (Nc(e, n, r), t = n.stateNode, typeof t.componentDidMount == "function" && A(n, Tv, n, t), t = n.updateQueue, t !== null) {
						e = n.stateNode;
						try {
							A(n, oa, t, e);
						} catch (e) {
							Nl(n, n.return, e);
						}
					}
					r && c & 64 && Qs(n), rc(n, n.return);
					break;
				case 27: mc(n);
				case 26:
				case 5:
					Nc(e, n, r), r && t === null && c & 4 && sc(n), rc(n, n.return);
					break;
				case 12:
					if (r && c & 4) {
						c = di(), Nc(e, n, r), r = n.stateNode, r.effectDuration += pi(c);
						try {
							A(n, ac, n, t, x_, r.effectDuration);
						} catch (e) {
							Nl(n, n.return, e);
						}
					} else Nc(e, n, r);
					break;
				case 31:
					Nc(e, n, r), r && c & 4 && xc(e, n);
					break;
				case 13:
					Nc(e, n, r), r && c & 4 && Sc(e, n);
					break;
				case 22:
					n.memoizedState === null && Nc(e, n, r), rc(n, n.return);
					break;
				case 30: break;
				default: Nc(e, n, r);
			}
			(n.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(n, q, J, E_, D_), gi(i), vi(a), D_ = o, O_ = s;
		}
		function Nc(e, t, n) {
			for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) Mc(e, t.alternate, t, n), t = t.sibling;
		}
		function Pc(e, t) {
			var n = null;
			e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && si(e), n != null && ci(n));
		}
		function Fc(e, t) {
			e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (si(t), e != null && ci(e));
		}
		function Ic(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (t = t.child; t !== null;) {
				var a = t.sibling;
				Lc(e, t, n, r, a === null ? i : a.actualStartTime), t = a;
			}
		}
		function Lc(e, t, n, r, i) {
			var a = hi(), o = _i(), s = yi(), c = bi(), l = Sg, u = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					(t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Qn(t, t.actualStartTime, i, Ob, n), Ic(e, t, n, r, i), u & 2048 && Xs(t, vy | hy);
					break;
				case 1:
					(t.mode & K) !== G && 0 < t.actualStartTime && (t.flags & 128 ? $n(t, t.actualStartTime, i, []) : t.flags & 1 && Qn(t, t.actualStartTime, i, Ob, n)), Ic(e, t, n, r, i);
					break;
				case 3:
					var d = di(), f = Ob;
					Ob = t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) == 0, Ic(e, t, n, r, i), Ob = f, u & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), r = t.memoizedState.cache, r !== n && (si(r), n != null && ci(n))), e.passiveEffectDuration += fi(d);
					break;
				case 12:
					if (u & 2048) {
						u = di(), Ic(e, t, n, r, i), e = t.stateNode, e.passiveEffectDuration += pi(u);
						try {
							A(t, oc, t, t.alternate, x_, e.passiveEffectDuration);
						} catch (e) {
							Nl(t, t.return, e);
						}
					} else Ic(e, t, n, r, i);
					break;
				case 31:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d !== null && f === null ? (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && $n(t, t.actualStartTime, i, d)) : Ob = !0) : Ob = !1, Ic(e, t, n, r, i), Ob = u;
					break;
				case 13:
					u = Ob, d = t.alternate === null ? null : t.alternate.memoizedState, f = t.memoizedState, d === null || d.dehydrated === null || f !== null && f.dehydrated !== null ? Ob = !1 : (f = t.deletions, f !== null && 0 < f.length && f[0].tag === 18 ? (Ob = !1, d = d.hydrationErrors, d !== null && $n(t, t.actualStartTime, i, d)) : Ob = !0), Ic(e, t, n, r, i), Ob = u;
					break;
				case 23: break;
				case 22:
					f = t.stateNode, d = t.alternate, t.memoizedState === null ? f._visibility & kg ? Ic(e, t, n, r, i) : (f._visibility |= kg, Rc(e, t, n, r, (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), i), (t.mode & K) === G || Ob || (e = t.actualStartTime, 0 <= e && .05 < i - e && Zn(t, e, i), 0 <= q && 0 <= J && .05 < J - q && Zn(t, q, J))) : f._visibility & kg ? Ic(e, t, n, r, i) : Bc(e, t, n, r, i), u & 2048 && Pc(d, t);
					break;
				case 24:
					Ic(e, t, n, r, i), u & 2048 && Fc(t.alternate, t);
					break;
				default: Ic(e, t, n, r, i);
			}
			(t.mode & K) !== G && ((e = !Ob && t.alternate === null && t.return !== null && t.return.alternate !== null) && (n = t.actualStartTime, 0 <= n && .05 < i - n && Xn(t, n, i, "Mount")), 0 <= q && 0 <= J && ((O_ || .05 < E_) && er(t, q, J, E_, D_), e && .05 < J - q && Xn(t, q, J, "Mount"))), gi(a), vi(o), D_ = s, O_ = c, Sg = l;
		}
		function Rc(e, t, n, r, i, a) {
			for (i &&= (t.subtreeFlags & 10256) != 0 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child), t = t.child; t !== null;) {
				var o = t.sibling;
				zc(e, t, n, r, i, o === null ? a : o.actualStartTime), t = o;
			}
		}
		function zc(e, t, n, r, i, a) {
			var o = hi(), s = _i(), c = yi(), l = bi(), u = Sg;
			i && (t.mode & K) !== G && 0 < t.actualStartTime && t.flags & 1 && Qn(t, t.actualStartTime, a, Ob, n);
			var d = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					Rc(e, t, n, r, i, a), Xs(t, vy);
					break;
				case 23: break;
				case 22:
					var f = t.stateNode;
					t.memoizedState === null ? (f._visibility |= kg, Rc(e, t, n, r, i, a)) : f._visibility & kg ? Rc(e, t, n, r, i, a) : Bc(e, t, n, r, a), i && d & 2048 && Pc(t.alternate, t);
					break;
				case 24:
					Rc(e, t, n, r, i, a), i && d & 2048 && Fc(t.alternate, t);
					break;
				default: Rc(e, t, n, r, i, a);
			}
			(t.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(t, q, J, E_, D_), gi(o), vi(s), D_ = c, O_ = l, Sg = u;
		}
		function Bc(e, t, n, r, i) {
			if (t.subtreeFlags & 10256 || t.actualDuration !== 0 && (t.alternate === null || t.alternate.child !== t.child)) for (var a = t.child; a !== null;) {
				t = a.sibling;
				var o = e, s = n, c = r, l = t === null ? i : t.actualStartTime, u = Sg;
				(a.mode & K) !== G && 0 < a.actualStartTime && a.flags & 1 && Qn(a, a.actualStartTime, l, Ob, s);
				var d = a.flags;
				switch (a.tag) {
					case 22:
						Bc(o, a, s, c, l), d & 2048 && Pc(a.alternate, a);
						break;
					case 24:
						Bc(o, a, s, c, l), d & 2048 && Fc(a.alternate, a);
						break;
					default: Bc(o, a, s, c, l);
				}
				Sg = u, a = t;
			}
		}
		function Vc(e, t, n) {
			if (e.subtreeFlags & kb) for (e = e.child; e !== null;) Hc(e, t, n), e = e.sibling;
		}
		function Hc(e, t, n) {
			switch (e.tag) {
				case 26:
					Vc(e, t, n), e.flags & kb && e.memoizedState !== null && Ud(n, Db, e.memoizedState, e.memoizedProps);
					break;
				case 5:
					Vc(e, t, n);
					break;
				case 3:
				case 4:
					var r = Db;
					Db = Ed(e.stateNode.containerInfo), Vc(e, t, n), Db = r;
					break;
				case 22:
					e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kb, kb = 16777216, Vc(e, t, n), kb = r) : Vc(e, t, n));
					break;
				default: Vc(e, t, n);
			}
		}
		function Uc(e) {
			var t = e.alternate;
			if (t !== null && (e = t.child, e !== null)) {
				t.child = null;
				do
					t = e.sibling, e.sibling = null, e = t;
				while (e !== null);
			}
		}
		function Wc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = hi();
					Sb = r, Jc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Xn(r, q, J, "Unmount"), gi(i);
				}
				Uc(e);
			}
			if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Gc(e), e = e.sibling;
		}
		function Gc(e) {
			var t = hi(), n = _i(), r = yi(), i = bi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Wc(e), e.flags & 2048 && Zs(e, e.return, vy | hy);
					break;
				case 3:
					var a = di();
					Wc(e), e.stateNode.passiveEffectDuration += fi(a);
					break;
				case 12:
					a = di(), Wc(e), e.stateNode.passiveEffectDuration += pi(a);
					break;
				case 22:
					a = e.stateNode, e.memoizedState !== null && a._visibility & kg && (e.return === null || e.return.tag !== 13) ? (a._visibility &= ~kg, Kc(e), (e.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Xn(e, q, J, "Disconnect")) : Wc(e);
					break;
				default: Wc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(e, q, J, E_, D_), gi(t), vi(n), O_ = i, D_ = r;
		}
		function Kc(e) {
			var t = e.deletions;
			if (e.flags & 16) {
				if (t !== null) for (var n = 0; n < t.length; n++) {
					var r = t[n], i = hi();
					Sb = r, Jc(r, e), (r.mode & K) !== G && 0 <= q && 0 <= J && .05 < J - q && Xn(r, q, J, "Unmount"), gi(i);
				}
				Uc(e);
			}
			for (e = e.child; e !== null;) qc(e), e = e.sibling;
		}
		function qc(e) {
			var t = hi(), n = _i(), r = yi(), i = bi();
			switch (e.tag) {
				case 0:
				case 11:
				case 15:
					Zs(e, e.return, vy), Kc(e);
					break;
				case 22:
					var a = e.stateNode;
					a._visibility & kg && (a._visibility &= ~kg, Kc(e));
					break;
				default: Kc(e);
			}
			(e.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(e, q, J, E_, D_), gi(t), vi(n), O_ = i, D_ = r;
		}
		function Jc(e, t) {
			for (; Sb !== null;) {
				var n = Sb, r = n, i = t, a = hi(), o = _i(), s = yi(), c = bi();
				switch (r.tag) {
					case 0:
					case 11:
					case 15:
						Zs(r, i, vy);
						break;
					case 23:
					case 22:
						r.memoizedState !== null && r.memoizedState.cachePool !== null && (i = r.memoizedState.cachePool.pool, i != null && si(i));
						break;
					case 24: ci(r.memoizedState.cache);
				}
				if ((r.mode & K) !== G && 0 <= q && 0 <= J && (O_ || .05 < E_) && er(r, q, J, E_, D_), gi(a), vi(o), O_ = c, D_ = s, r = n.child, r !== null) r.return = n, Sb = r;
				else a: for (n = e; Sb !== null;) {
					if (r = Sb, a = r.sibling, o = r.return, vc(r), r === n) {
						Sb = null;
						break a;
					}
					if (a !== null) {
						a.return = o, Sb = a;
						break a;
					}
					Sb = o;
				}
			}
		}
		function Yc() {
			Mb.forEach(function(e) {
				return e();
			});
		}
		function Xc() {
			var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
			return e || W.actQueue === null || console.error("The current testing environment is not configured to support act(...)"), e;
		}
		function Zc(e) {
			if ((Wb & Fb) !== Pb && $ !== 0) return $ & -$;
			var t = W.T;
			return t === null ? Ge() : (t._updatedFibers ||= /* @__PURE__ */ new Set(), t._updatedFibers.add(e), eu());
		}
		function Qc() {
			if (fx === 0) if (!($ & 536870912) || e_) {
				var e = Ip;
				Ip <<= 1, !(Ip & 3932160) && (Ip = 262144), fx = e;
			} else fx = 536870912;
			return e = ly.current, e !== null && (e.flags |= 32), fx;
		}
		function $c(e, t, n) {
			if (eS && console.error("useInsertionEffect must not schedule updates."), Yx && (Xx = !0), (e === Gb && (nx === Jb || nx === tx) || e.cancelPendingCommit !== null) && (sl(e, 0), rl(e, $, fx, !1)), Ie(e, n), (Wb & Fb) !== Pb && e === Gb) {
				if (pp) switch (t.tag) {
					case 0:
					case 11:
					case 15:
						e = Q && w(Q) || "Unknown", rS.has(e) || (rS.add(e), t = w(t) || "Unknown", console.error("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render", t, e, e));
						break;
					case 1: nS ||= (console.error("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), !0);
				}
			} else jp && He(e, t, n), Gl(t), e === Gb && ((Wb & Fb) === Pb && (ux |= n), cx === Vb && rl(e, $, fx, !1)), Kl(e);
		}
		function el(e, t, n) {
			if ((Wb & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if ($ !== 0 && Q !== null) {
				var r = Q, i = yp();
				switch (ev) {
					case Yb:
					case Jb:
						var a = tv;
						vg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Suspended", a, i, yg, void 0, "primary-light")) : console.timeStamp("Suspended", a, i, yg, void 0, "primary-light"));
						break;
					case tx:
						a = tv, vg && ((r = r._debugTask) ? r.run(console.timeStamp.bind(console, "Action", a, i, yg, void 0, "primary-light")) : console.timeStamp("Action", a, i, yg, void 0, "primary-light"));
						break;
					default: vg && (r = i - tv, 3 > r || console.timeStamp("Blocked", tv, i, yg, void 0, 5 > r ? "primary-light" : 10 > r ? "primary" : 100 > r ? "primary-dark" : "error"));
				}
			}
			a = (n = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Me(e, t)) ? gl(e, t) : ml(e, t, !0);
			var o = n;
			do {
				if (a === Lb) {
					ax && !n && rl(e, t, 0, !1), t = nx, tv = g_(), ev = t;
					break;
				} else {
					if (r = yp(), i = e.current.alternate, o && !nl(i)) {
						Yn(t), i = b_, a = r, !vg || a <= i || (Cx ? Cx.run(console.timeStamp.bind(console, "Teared Render", i, a, xg, bg, "error")) : console.timeStamp("Teared Render", i, a, xg, bg, "error")), ol(t, r), a = ml(e, t, !1), o = !1;
						continue;
					}
					if (a === zb) {
						if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
						else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
						if (s !== 0) {
							Yn(t), ar(b_, r, t, Cx), ol(t, r), t = s;
							a: {
								r = e, a = o, o = mx;
								var c = r.current.memoizedState.isDehydrated;
								if (c && (sl(r, s).flags |= 256), s = ml(r, s, !1), s !== zb) {
									if (ox && !c) {
										r.errorRecoveryDisabledLanes |= a, ux |= a, a = Vb;
										break a;
									}
									r = hx, hx = o, r !== null && (hx === null ? hx = r : hx.push.apply(hx, r));
								}
								a = s;
							}
							if (o = !1, a !== zb) continue;
							r = yp();
						}
					}
					if (a === Rb) {
						Yn(t), ar(b_, r, t, Cx), ol(t, r), sl(e, 0), rl(e, t, 0, !0);
						break;
					}
					a: {
						switch (n = e, a) {
							case Lb:
							case Rb: throw Error("Root did not complete. This is a bug in React.");
							case Vb: if ((t & 4194048) !== t) break;
							case Hb:
								Yn(t), nr(b_, r, t, Cx), ol(t, r), i = t, i & 127 ? R_ = r : i & 4194048 && (Y_ = r), rl(n, t, fx, !ix);
								break a;
							case zb:
								hx = null;
								break;
							case Bb:
							case Ub: break;
							default: throw Error("Unknown root exit status.");
						}
						if (W.actQueue !== null) wl(n, i, t, hx, Sx, gx, fx, ux, px, a, null, null, b_, r);
						else {
							if ((t & 62914560) === t && (o = _x + yx - yp(), 10 < o)) {
								if (rl(n, t, fx, !ix), je(n, 0, !0) !== 0) break a;
								Rx = t, n.timeoutHandle = QS(tl.bind(null, n, i, hx, Sx, gx, t, fx, ux, px, ix, a, "Throttled", b_, r), o);
								break a;
							}
							tl(n, i, hx, Sx, gx, t, fx, ux, px, ix, a, null, b_, r);
						}
					}
				}
				break;
			} while (1);
			Kl(e);
		}
		function tl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.timeoutHandle = eC;
			var m = t.subtreeFlags, h = null;
			if ((m & 8192 || (m & 16785408) == 16785408) && (h = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: on
			}, Hc(t, a, h), m = (a & 62914560) === a ? _x - yp() : (a & 4194048) === a ? vx - yp() : 0, m = Wd(h, m), m !== null)) {
				Rx = a, e.cancelPendingCommit = m(wl.bind(null, e, t, a, n, r, i, o, s, c, u, h, h.waitingForViewTransition ? "Waiting for the previous Animation" : 0 < h.count ? 0 < h.imgCount ? "Suspended on CSS and Images" : "Suspended on CSS" : h.imgCount === 1 ? "Suspended on an Image" : 0 < h.imgCount ? "Suspended on Images" : null, f, p)), rl(e, a, o, !l);
				return;
			}
			wl(e, t, a, n, r, i, o, s, c, u, h, d, f, p);
		}
		function nl(e) {
			for (var t = e;;) {
				var n = t.tag;
				if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
					var i = n[r], a = i.getSnapshot;
					i = i.value;
					try {
						if (!Vh(a(), i)) return !1;
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
		function rl(e, t, n, r) {
			t &= ~dx, t &= ~ux, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
			for (var i = t; 0 < i;) {
				var a = 31 - Mp(i), o = 1 << a;
				r[a] = -1, i &= ~o;
			}
			n !== 0 && Re(e, n, t);
		}
		function il() {
			return (Wb & (Fb | Ib)) === Pb ? (B(0, !1), !1) : !0;
		}
		function al() {
			if (Q !== null) {
				if (nx === Kb) var e = Q.return;
				else e = Q, Yr(), Da(e), Wv = null, Gv = 0, e = Q;
				for (; e !== null;) Ws(e.alternate, e), e = e.return;
				Q = null;
			}
		}
		function ol(e, t) {
			e & 127 && (k_ = t), e & 4194048 && (z_ = t), e & 62914560 && (X_ = t), e & 2080374784 && (Z_ = t);
		}
		function sl(e, t) {
			vg && (console.timeStamp("Blocking Track", .003, .003, "Blocking", bg, "primary-light"), console.timeStamp("Transition Track", .003, .003, "Transition", bg, "primary-light"), console.timeStamp("Suspense Track", .003, .003, "Suspense", bg, "primary-light"), console.timeStamp("Idle Track", .003, .003, "Idle", bg, "primary-light"));
			var n = b_;
			if (b_ = g_(), $ !== 0 && 0 < n) {
				if (Yn($), cx === Bb || cx === Vb) nr(n, b_, t, Cx);
				else {
					var r = b_, i = Cx;
					if (vg && !(r <= n)) {
						var a = (t & 738197653) === t ? "tertiary-dark" : "primary-dark", o = (t & 536870912) === t ? "Prewarm" : (t & 201326741) === t ? "Interrupted Hydration" : "Interrupted Render";
						i ? i.run(console.timeStamp.bind(console, o, n, r, xg, bg, a)) : console.timeStamp(o, n, r, xg, bg, a);
					}
				}
				ol($, b_);
			}
			if (n = Cx, Cx = null, t & 127) {
				Cx = j_, i = 0 <= A_ && A_ < k_ ? k_ : A_, r = 0 <= F_ && F_ < k_ ? k_ : F_, a = 0 <= r ? r : 0 <= i ? i : b_, 0 <= R_ ? (Yn(2), rr(R_, a, t, n)) : Q_ & 127 && (Yn(2), cr(k_, a, $_)), n = i;
				var s = r, c = I_, l = 0 < L_, u = M_ === v_, d = M_ === y_;
				if (i = b_, r = j_, a = N_, o = P_, vg) {
					if (xg = "Blocking", 0 < n ? n > i && (n = i) : n = i, 0 < s ? s > n && (s = n) : s = n, c !== null && n > s) {
						var f = l ? "secondary-light" : "warning";
						r ? r.run(console.timeStamp.bind(console, l ? "Consecutive" : "Event: " + c, s, n, xg, bg, f)) : console.timeStamp(l ? "Consecutive" : "Event: " + c, s, n, xg, bg, f);
					}
					i > n && (s = u ? "error" : (t & 738197653) === t ? "tertiary-light" : "primary-light", u = d ? "Promise Resolved" : u ? "Cascading Update" : 5 < i - n ? "Update Blocked" : "Update", d = [], o != null && d.push(["Component name", o]), a != null && d.push(["Method name", a]), n = {
						start: n,
						end: i,
						detail: { devtools: {
							properties: d,
							track: xg,
							trackGroup: bg,
							color: s
						} }
					}, r ? r.run(performance.measure.bind(performance, u, n)) : performance.measure(u, n));
				}
				A_ = -1.1, M_ = 0, P_ = N_ = null, R_ = -1.1, L_ = F_, F_ = -1.1, k_ = g_();
			}
			if (t & 4194048 && (Cx = U_, i = 0 <= B_ && B_ < z_ ? z_ : B_, n = 0 <= V_ && V_ < z_ ? z_ : V_, r = 0 <= K_ && K_ < z_ ? z_ : K_, a = 0 <= r ? r : 0 <= n ? n : b_, 0 <= Y_ ? (Yn(256), rr(Y_, a, t, Cx)) : Q_ & 4194048 && (Yn(256), cr(z_, a, $_)), d = r, s = q_, c = 0 < J_, l = H_ === y_, a = b_, r = U_, o = W_, u = G_, vg && (xg = "Transition", 0 < n ? n > a && (n = a) : n = a, 0 < i ? i > n && (i = n) : i = n, 0 < d ? d > i && (d = i) : d = i, i > d && s !== null && (f = c ? "secondary-light" : "warning", r ? r.run(console.timeStamp.bind(console, c ? "Consecutive" : "Event: " + s, d, i, xg, bg, f)) : console.timeStamp(c ? "Consecutive" : "Event: " + s, d, i, xg, bg, f)), n > i && (r ? r.run(console.timeStamp.bind(console, "Action", i, n, xg, bg, "primary-dark")) : console.timeStamp("Action", i, n, xg, bg, "primary-dark")), a > n && (i = l ? "Promise Resolved" : 5 < a - n ? "Update Blocked" : "Update", d = [], u != null && d.push(["Component name", u]), o != null && d.push(["Method name", o]), n = {
				start: n,
				end: a,
				detail: { devtools: {
					properties: d,
					track: xg,
					trackGroup: bg,
					color: "primary-light"
				} }
			}, r ? r.run(performance.measure.bind(performance, i, n)) : performance.measure(i, n))), V_ = B_ = -1.1, H_ = 0, Y_ = -1.1, J_ = K_, K_ = -1.1, z_ = g_()), t & 62914560 && Q_ & 62914560 && (Yn(4194304), cr(X_, b_, $_)), t & 2080374784 && Q_ & 2080374784 && (Yn(268435456), cr(Z_, b_, $_)), n = e.timeoutHandle, n !== eC && (e.timeoutHandle = eC, $S(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Rx = 0, al(), Gb = e, Q = n = Sr(e.current, null), $ = t, nx = Kb, rx = null, ix = !1, ax = Me(e, t), ox = !1, cx = Lb, px = fx = dx = ux = lx = 0, hx = mx = null, gx = !1, t & 8 && (t |= t & 32), r = e.entangledLanes, r !== 0) for (e = e.entanglements, r &= t; 0 < r;) i = 31 - Mp(r), a = 1 << i, t |= e[i], r &= ~a;
			return sx = t, lr(), e = sg(), 1e3 < e - ag && (W.recentlyCreatedOwnerStacks = 0, ag = e), uv.discardPendingWarnings(), n;
		}
		function cl(e, t) {
			X = null, W.H = Ry, W.getCurrentStack = null, pp = !1, fp = null, t === Rv || t === Bv ? (t = Ri(), nx = Yb) : t === zv ? (t = Ri(), nx = Xb) : nx = t === ob ? ex : typeof t == "object" && t && typeof t.then == "function" ? Qb : qb, rx = t;
			var n = Q;
			n === null ? (cx = Rb, ts(e, Ar(t, e.current))) : n.mode & K && Si(n);
		}
		function ll() {
			var e = ly.current;
			return e === null ? !0 : ($ & 4194048) === $ ? uy === null : ($ & 62914560) === $ || $ & 536870912 ? e === uy : !1;
		}
		function ul() {
			var e = W.H;
			return W.H = Ry, e === null ? Ry : e;
		}
		function dl() {
			var e = W.A;
			return W.A = Ab, e;
		}
		function fl(e) {
			Cx === null && (Cx = e._debugTask == null ? null : e._debugTask);
		}
		function pl() {
			cx = Vb, ix || ($ & 4194048) !== $ && ly.current !== null || (ax = !0), !(lx & 134217727) && !(ux & 134217727) || Gb === null || rl(Gb, $, fx, !1);
		}
		function ml(e, t, n) {
			var r = Wb;
			Wb |= Fb;
			var i = ul(), a = dl();
			if (Gb !== e || $ !== t) {
				if (jp) {
					var o = e.memoizedUpdaters;
					0 < o.size && (Ul(e, $), o.clear()), Ue(e, t);
				}
				Sx = null, sl(e, t);
			}
			t = !1, o = cx;
			a: do
				try {
					if (nx !== Kb && Q !== null) {
						var s = Q, c = rx;
						switch (nx) {
							case ex:
								al(), o = Hb;
								break a;
							case Yb:
							case Jb:
							case tx:
							case Qb:
								ly.current === null && (t = !0);
								var l = nx;
								if (nx = Kb, rx = null, xl(e, s, c, l), n && ax) {
									o = Lb;
									break a;
								}
								break;
							default: l = nx, nx = Kb, rx = null, xl(e, s, c, l);
						}
					}
					hl(), o = cx;
					break;
				} catch (t) {
					cl(e, t);
				}
			while (1);
			return t && e.shellSuspendCounter++, Yr(), Wb = r, W.H = i, W.A = a, Q === null && (Gb = null, $ = 0, lr()), o;
		}
		function hl() {
			for (; Q !== null;) vl(Q);
		}
		function gl(e, t) {
			var n = Wb;
			Wb |= Fb;
			var r = ul(), i = dl();
			if (Gb !== e || $ !== t) {
				if (jp) {
					var a = e.memoizedUpdaters;
					0 < a.size && (Ul(e, $), a.clear()), Ue(e, t);
				}
				Sx = null, bx = yp() + xx, sl(e, t);
			} else ax = Me(e, t);
			a: do
				try {
					if (nx !== Kb && Q !== null) b: switch (t = Q, a = rx, nx) {
						case qb:
							nx = Kb, rx = null, xl(e, t, a, qb);
							break;
						case Jb:
						case tx:
							if (Fi(a)) {
								nx = Kb, rx = null, yl(t);
								break;
							}
							t = function() {
								nx !== Jb && nx !== tx || Gb !== e || (nx = $b), Kl(e);
							}, a.then(t, t);
							break a;
						case Yb:
							nx = $b;
							break a;
						case Xb:
							nx = Zb;
							break a;
						case $b:
							Fi(a) ? (nx = Kb, rx = null, yl(t)) : (nx = Kb, rx = null, xl(e, t, a, $b));
							break;
						case Zb:
							var o = null;
							switch (Q.tag) {
								case 26: o = Q.memoizedState;
								case 5:
								case 27:
									var s = Q;
									if (o ? Hd(o) : s.stateNode.complete) {
										nx = Kb, rx = null;
										var c = s.sibling;
										if (c !== null) Q = c;
										else {
											var l = s.return;
											l === null ? Q = null : (Q = l, Sl(l));
										}
										break b;
									}
									break;
								default: console.error("Unexpected type of fiber triggered a suspensey commit. This is a bug in React.");
							}
							nx = Kb, rx = null, xl(e, t, a, Zb);
							break;
						case Qb:
							nx = Kb, rx = null, xl(e, t, a, Qb);
							break;
						case ex:
							al(), cx = Hb;
							break a;
						default: throw Error("Unexpected SuspendedReason. This is a bug in React.");
					}
					W.actQueue === null ? _l() : hl();
					break;
				} catch (t) {
					cl(e, t);
				}
			while (1);
			return Yr(), W.H = r, W.A = i, Wb = n, Q === null ? (Gb = null, $ = 0, lr(), cx) : Lb;
		}
		function _l() {
			for (; Q !== null && !_p();) vl(Q);
		}
		function vl(e) {
			var t = e.alternate;
			(e.mode & K) === G ? t = A(e, Fs, t, e, sx) : (xi(e), t = A(e, Fs, t, e, sx), Si(e)), e.memoizedProps = e.pendingProps, t === null ? Sl(e) : Q = t;
		}
		function yl(e) {
			var t = A(e, bl, e);
			e.memoizedProps = e.pendingProps, t === null ? Sl(e) : Q = t;
		}
		function bl(e) {
			var t = e.alternate, n = (e.mode & K) !== G;
			switch (n && xi(e), e.tag) {
				case 15:
				case 0:
					t = ys(t, e, e.pendingProps, e.type, void 0, $);
					break;
				case 11:
					t = ys(t, e, e.pendingProps, e.type.render, e.ref, $);
					break;
				case 5: Da(e);
				default: Ws(t, e), e = Q = Cr(e, sx), t = Fs(t, e, sx);
			}
			return n && Si(e), t;
		}
		function xl(e, t, n, r) {
			Yr(), Da(t), Wv = null, Gv = 0;
			var i = t.return;
			try {
				if (os(e, i, t, n, $)) {
					cx = Rb, ts(e, Ar(n, e.current)), Q = null;
					return;
				}
			} catch (t) {
				if (i !== null) throw Q = i, t;
				cx = Rb, ts(e, Ar(n, e.current)), Q = null;
				return;
			}
			t.flags & 32768 ? (e_ || r === qb ? e = !0 : ax || $ & 536870912 ? e = !1 : (ix = e = !0, (r === Jb || r === tx || r === Yb || r === Qb) && (r = ly.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Cl(t, e)) : Sl(t);
		}
		function Sl(e) {
			var t = e;
			do {
				if (t.flags & 32768) {
					Cl(t, ix);
					return;
				}
				var n = t.alternate;
				if (e = t.return, xi(t), n = A(t, Hs, n, t, sx), (t.mode & K) !== G && Ci(t), n !== null) {
					Q = n;
					return;
				}
				if (t = t.sibling, t !== null) {
					Q = t;
					return;
				}
				Q = t = e;
			} while (t !== null);
			cx === Lb && (cx = Ub);
		}
		function Cl(e, t) {
			do {
				var n = Us(e.alternate, e);
				if (n !== null) {
					n.flags &= 32767, Q = n;
					return;
				}
				if ((e.mode & K) !== G) {
					Ci(e), n = e.actualDuration;
					for (var r = e.child; r !== null;) n += r.actualDuration, r = r.sibling;
					e.actualDuration = n;
				}
				if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
					Q = e;
					return;
				}
				Q = e = n;
			} while (e !== null);
			cx = Hb, Q = null;
		}
		function wl(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
			e.cancelPendingCommit = null;
			do
				Al();
			while (Fx !== kx);
			if (uv.flushLegacyContextWarning(), uv.flushPendingUnsafeLifecycleWarnings(), (Wb & (Fb | Ib)) !== Pb) throw Error("Should not already be working.");
			if (Yn(n), l === zb ? ar(f, p, n, Cx) : r === null ? tr(f, p, n, Cx) : ir(f, p, n, r, t !== null && t.alternate !== null && t.alternate.memoizedState.isDehydrated && (t.flags & 256) != 0, Cx), t !== null) {
				if (n === 0 && console.error("finishedLanes should not be empty during a commit. This is a bug in React."), t === e.current) throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
				if (a = t.lanes | t.childLanes, a |= Mg, Le(e, n, a, o, s, c), e === Gb && (Q = Gb = null, $ = 0), Lx = t, Ix = e, Rx = n, zx = a, Vx = i, Hx = r, Bx = p, Ux = d, Wx = Tx, Gx = null, t.actualDuration !== 0 || t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Wl(Cp, function() {
					return ZS = window.event, Wx === Tx && (Wx = Dx), jl(), null;
				})) : (e.callbackNode = null, e.callbackPriority = 0), C_ = null, x_ = g_(), d !== null && or(p, x_, d, Cx), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
					r = W.T, W.T = null, i = Gf.p, Gf.p = Rp, o = Wb, Wb |= Ib;
					try {
						gc(e, t, n);
					} finally {
						Wb = o, Gf.p = i, W.T = r;
					}
				}
				Fx = Ax, Tl(), El(), Dl();
			}
		}
		function Tl() {
			if (Fx === Ax) {
				Fx = kx;
				var e = Ix, t = Lx, n = Rx, r = (t.flags & 13878) != 0;
				if (t.subtreeFlags & 13878 || r) {
					r = W.T, W.T = null;
					var i = Gf.p;
					Gf.p = Rp;
					var a = Wb;
					Wb |= Ib;
					try {
						Cb = n, wb = e, mi(), Ec(t, e), wb = Cb = null, n = JS;
						var o = zn(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
						if (o !== s && s && s.ownerDocument && Rn(s.ownerDocument.documentElement, s)) {
							if (c !== null && Bn(s)) {
								var l = c.start, u = c.end;
								if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
								else {
									var d = s.ownerDocument || document, f = d && d.defaultView || window;
									if (f.getSelection) {
										var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
										!p.extend && h > g && (o = g, g = h, h = o);
										var _ = Ln(s, h), v = Ln(s, g);
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
						RC = !!qS, JS = qS = null;
					} finally {
						Wb = a, Gf.p = i, W.T = r;
					}
				}
				e.current = t, Fx = jx;
			}
		}
		function El() {
			if (Fx === jx) {
				Fx = kx;
				var e = Gx;
				if (e !== null) {
					x_ = g_();
					var t = S_, n = x_;
					!vg || n <= t || ($_ ? $_.run(console.timeStamp.bind(console, e, t, n, xg, bg, "secondary-light")) : console.timeStamp(e, t, n, xg, bg, "secondary-light"));
				}
				e = Ix, t = Lx, n = Rx;
				var r = (t.flags & 8772) != 0;
				if (t.subtreeFlags & 8772 || r) {
					r = W.T, W.T = null;
					var i = Gf.p;
					Gf.p = Rp;
					var a = Wb;
					Wb |= Ib;
					try {
						Cb = n, wb = e, mi(), _c(e, t.alternate, t), wb = Cb = null;
					} finally {
						Wb = a, Gf.p = i, W.T = r;
					}
				}
				e = Bx, t = Ux, S_ = g_(), e = t === null ? e : x_, t = S_, n = Wx === Ex, r = Cx, C_ === null ? !vg || t <= e || (r ? r.run(console.timeStamp.bind(console, n ? "Commit Interrupted View Transition" : "Commit", e, t, xg, bg, n ? "error" : "secondary-dark")) : console.timeStamp(n ? "Commit Interrupted View Transition" : "Commit", e, t, xg, bg, n ? "error" : "secondary-dark")) : sr(e, t, C_, !1, r), Fx = Mx;
			}
		}
		function Dl() {
			if (Fx === Nx || Fx === Mx) {
				if (Fx === Nx) {
					var e = S_;
					S_ = g_();
					var t = S_, n = Wx === Ex;
					!vg || t <= e || ($_ ? $_.run(console.timeStamp.bind(console, n ? "Interrupted View Transition" : "Starting Animation", e, t, xg, bg, n ? "error" : "secondary-light")) : console.timeStamp(n ? "Interrupted View Transition" : "Starting Animation", e, t, xg, bg, n ? " error" : "secondary-light")), Wx !== Ex && (Wx = Ox);
				}
				Fx = kx, vp(), e = Ix;
				var r = Lx;
				t = Rx, n = Hx;
				var i = r.actualDuration !== 0 || (r.subtreeFlags & 10256) != 0 || (r.flags & 10256) != 0;
				i ? Fx = Px : (Fx = kx, Lx = Ix = null, kl(e, e.pendingLanes), Qx = 0, $x = null);
				var a = e.pendingLanes;
				if (a === 0 && (wx = null), i || Vl(e), a = We(t), r = r.stateNode, kp && typeof kp.onCommitFiberRoot == "function") try {
					var o = (r.current.flags & 128) == 128;
					switch (a) {
						case Rp:
							var s = xp;
							break;
						case zp:
							s = Sp;
							break;
						case Bp:
							s = Cp;
							break;
						case Vp:
							s = Tp;
							break;
						default: s = Cp;
					}
					kp.onCommitFiberRoot(Op, r, s, o);
				} catch (e) {
					Ap || (Ap = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				if (jp && e.memoizedUpdaters.clear(), Yc(), n !== null) {
					o = W.T, s = Gf.p, Gf.p = Rp, W.T = null;
					try {
						var c = e.onRecoverableError;
						for (r = 0; r < n.length; r++) {
							var l = n[r], u = Ol(l.stack);
							A(l.source, c, l.value, u);
						}
					} finally {
						W.T = o, Gf.p = s;
					}
				}
				Rx & 3 && Al(), Kl(e), a = e.pendingLanes, t & 261930 && a & 42 ? (rv = !0, e === Jx ? qx++ : (qx = 0, Jx = e)) : qx = 0, i || ol(t, S_), B(0, !1);
			}
		}
		function Ol(e) {
			return e = { componentStack: e }, Object.defineProperty(e, "digest", { get: function() {
				console.error("You are accessing \"digest\" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.");
			} }), e;
		}
		function kl(e, t) {
			(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ci(t)));
		}
		function Al() {
			return Tl(), El(), Dl(), jl();
		}
		function jl() {
			if (Fx !== Px) return !1;
			var e = Ix, t = zx;
			zx = 0;
			var n = We(Rx), r = Bp === 0 || Bp > n ? Bp : n;
			n = W.T;
			var i = Gf.p;
			try {
				Gf.p = r, W.T = null;
				var a = Vx;
				Vx = null, r = Ix;
				var o = Rx;
				if (Fx = kx, Lx = Ix = null, Rx = 0, (Wb & (Fb | Ib)) !== Pb) throw Error("Cannot flush passive effects while already rendering.");
				Yn(o), Yx = !0, Xx = !1;
				var s = 0;
				if (C_ = null, s = yp(), Wx === Ox) cr(S_, s, $_);
				else {
					var c = S_, l = s, u = Wx === Dx;
					!vg || l <= c || (Cx ? Cx.run(console.timeStamp.bind(console, u ? "Waiting for Paint" : "Waiting", c, l, xg, bg, "secondary-light")) : console.timeStamp(u ? "Waiting for Paint" : "Waiting", c, l, xg, bg, "secondary-light"));
				}
				c = Wb, Wb |= Ib;
				var d = r.current;
				mi(), Gc(d);
				var f = r.current;
				d = Bx, mi(), Lc(r, f, o, a, d), Vl(r), Wb = c;
				var p = yp();
				if (f = s, d = Cx, C_ === null ? !vg || p <= f || (d ? d.run(console.timeStamp.bind(console, "Remaining Effects", f, p, xg, bg, "secondary-dark")) : console.timeStamp("Remaining Effects", f, p, xg, bg, "secondary-dark")) : sr(f, p, C_, !0, d), ol(o, p), B(0, !1), Xx ? r === $x ? Qx++ : (Qx = 0, $x = r) : Qx = 0, Xx = Yx = !1, kp && typeof kp.onPostCommitFiberRoot == "function") try {
					kp.onPostCommitFiberRoot(Op, r);
				} catch (e) {
					Ap || (Ap = !0, console.error("React instrumentation encountered an error: %o", e));
				}
				var m = r.current.stateNode;
				return m.effectDuration = 0, m.passiveEffectDuration = 0, !0;
			} finally {
				Gf.p = i, W.T = n, kl(e, t);
			}
		}
		function Ml(e, t, n) {
			t = Ar(n, t), Ti(t), t = rs(e.stateNode, t, 2), e = ta(e, t, 2), e !== null && (Ie(e, 2), Kl(e));
		}
		function Nl(e, t, n) {
			if (eS = !1, e.tag === 3) Ml(e, e, n);
			else {
				for (; t !== null;) {
					if (t.tag === 3) {
						Ml(t, e, n);
						return;
					}
					if (t.tag === 1) {
						var r = t.stateNode;
						if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (wx === null || !wx.has(r))) {
							e = Ar(n, e), Ti(e), n = is(2), r = ta(t, n, 2), r !== null && (as(n, r, t, e), Ie(r, 2), Kl(r));
							return;
						}
					}
					t = t.return;
				}
				console.error("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s", n);
			}
		}
		function Pl(e, t, n) {
			var r = e.pingCache;
			if (r === null) {
				r = e.pingCache = new Nb();
				var i = /* @__PURE__ */ new Set();
				r.set(t, i);
			} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
			i.has(n) || (ox = !0, i.add(n), r = Fl.bind(null, e, t, n), jp && Ul(e, n), t.then(r, r));
		}
		function Fl(e, t, n) {
			var r = e.pingCache;
			r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, n & 127 ? 0 > A_ && (k_ = A_ = g_(), j_ = __("Promise Resolved"), M_ = y_) : n & 4194048 && 0 > V_ && (z_ = V_ = g_(), U_ = __("Promise Resolved"), H_ = y_), Xc() && W.actQueue === null && console.error("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"), Gb === e && ($ & n) === n && (cx === Vb || cx === Bb && ($ & 62914560) === $ && yp() - _x < yx ? (Wb & Fb) === Pb && sl(e, 0) : dx |= n, px === $ && (px = 0)), Kl(e);
		}
		function Il(e, t) {
			t === 0 && (t = Pe()), e = fr(e, t), e !== null && (Ie(e, t), Kl(e));
		}
		function Ll(e) {
			var t = e.memoizedState, n = 0;
			t !== null && (n = t.retryLane), Il(e, n);
		}
		function Rl(e, t) {
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
				default: throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
			}
			r !== null && r.delete(t), Il(e, n);
		}
		function zl(e, t, n) {
			if (t.subtreeFlags & 67117056) for (t = t.child; t !== null;) {
				var r = e, i = t, a = i.type === jf;
				a = n || a, i.tag === 22 ? i.memoizedState === null && (a && i.flags & 8192 ? A(i, Bl, r, i) : i.subtreeFlags & 67108864 && A(i, zl, r, i, a)) : i.flags & 67108864 ? a && A(i, Bl, r, i) : zl(r, i, a), t = t.sibling;
			}
		}
		function Bl(e, t) {
			Oe(!0);
			try {
				Ac(t), qc(t), Mc(e, t.alternate, t, !1), zc(e, t, 0, null, !1, 0);
			} finally {
				Oe(!1);
			}
		}
		function Vl(e) {
			var t = !0;
			e.current.mode & (Lg | Rg) || (t = !1), zl(e, e.current, t);
		}
		function Hl(e) {
			if ((Wb & Fb) === Pb) {
				var t = e.tag;
				if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
					if (t = w(e) || "ReactComponent", tS !== null) {
						if (tS.has(t)) return;
						tS.add(t);
					} else tS = new Set([t]);
					A(e, function() {
						console.error("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously tries to update the component. Move this work to useEffect instead.");
					});
				}
			}
		}
		function Ul(e, t) {
			jp && e.memoizedUpdaters.forEach(function(n) {
				He(e, n, t);
			});
		}
		function Wl(e, t) {
			var n = W.actQueue;
			return n === null ? hp(e, t) : (n.push(t), iS);
		}
		function Gl(e) {
			Xc() && W.actQueue === null && A(e, function() {
				console.error("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act", w(e));
			});
		}
		function Kl(e) {
			e !== oS && e.next === null && (oS === null ? aS = oS = e : oS = oS.next = e), lS = !0, W.actQueue === null ? sS || (sS = !0, $l()) : cS || (cS = !0, $l());
		}
		function B(e, t) {
			if (!uS && lS) {
				uS = !0;
				do
					for (var n = !1, r = aS; r !== null;) {
						if (!t) if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - Mp(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, Zl(r, a));
						} else a = $, a = je(r, r === Gb ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== eC), !(a & 3) || Me(r, a) || (n = !0, Zl(r, a));
						r = r.next;
					}
				while (n);
				uS = !1;
			}
		}
		function ql() {
			ZS = window.event, Jl();
		}
		function Jl() {
			lS = cS = sS = !1;
			var e = 0;
			dS !== 0 && Vu() && (e = dS);
			for (var t = yp(), n = null, r = aS; r !== null;) {
				var i = r.next, a = Yl(r, t);
				a === 0 ? (r.next = null, n === null ? aS = i : n.next = i, i === null && (oS = n)) : (n = r, (e !== 0 || a & 3) && (lS = !0)), r = i;
			}
			Fx !== kx && Fx !== Px || B(e, !1), dS !== 0 && (dS = 0);
		}
		function Yl(e, t) {
			for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
				var o = 31 - Mp(a), s = 1 << o, c = i[o];
				c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ne(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
			}
			if (t = Gb, n = $, n = je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== eC), r = e.callbackNode, n === 0 || e === t && (nx === Jb || nx === tx) || e.cancelPendingCommit !== null) return r !== null && Ql(r), e.callbackNode = null, e.callbackPriority = 0;
			if (!(n & 3) || Me(e, n)) {
				if (t = n & -n, t !== e.callbackPriority || W.actQueue !== null && r !== fS) Ql(r);
				else return t;
				switch (We(n)) {
					case Rp:
					case zp:
						n = Sp;
						break;
					case Bp:
						n = Cp;
						break;
					case Vp:
						n = Tp;
						break;
					default: n = Cp;
				}
				return r = Xl.bind(null, e), W.actQueue === null ? n = hp(n, r) : (W.actQueue.push(r), n = fS), e.callbackPriority = t, e.callbackNode = n, t;
			}
			return r !== null && Ql(r), e.callbackPriority = 2, e.callbackNode = null, 2;
		}
		function Xl(e, t) {
			if (rv = nv = !1, ZS = window.event, Fx !== kx && Fx !== Px) return e.callbackNode = null, e.callbackPriority = 0, null;
			var n = e.callbackNode;
			if (Wx === Tx && (Wx = Dx), Al() && e.callbackNode !== n) return null;
			var r = $;
			return r = je(e, e === Gb ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== eC), r === 0 ? null : (el(e, r, t), Yl(e, yp()), e.callbackNode != null && e.callbackNode === n ? Xl.bind(null, e) : null);
		}
		function Zl(e, t) {
			if (Al()) return null;
			nv = rv, rv = !1, el(e, t, !0);
		}
		function Ql(e) {
			e !== fS && e !== null && gp(e);
		}
		function $l() {
			W.actQueue !== null && W.actQueue.push(function() {
				return Jl(), null;
			}), nC(function() {
				(Wb & (Fb | Ib)) === Pb ? Jl() : hp(xp, ql);
			});
		}
		function eu() {
			if (dS === 0) {
				var e = ov;
				e === 0 && (e = Fp, Fp <<= 1, !(Fp & 261888) && (Fp = 256)), dS = e;
			}
			return dS;
		}
		function tu(e) {
			return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (j(e, "action"), an("" + e));
		}
		function nu(e, t) {
			var n = t.ownerDocument.createElement("input");
			return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
		}
		function ru(e, t, n, r, i) {
			if (t === "submit" && n && n.stateNode === i) {
				var a = tu((i[Wp] || null).action), o = r.submitter;
				o && (t = (t = o[Wp] || null) ? tu(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
				var s = new ih("action", "action", null, r, i);
				e.push({
					event: s,
					listeners: [{
						instance: null,
						listener: function() {
							if (r.defaultPrevented) {
								if (dS !== 0) {
									var e = o ? nu(i, o) : new FormData(i), t = {
										pending: !0,
										data: e,
										method: i.method,
										action: a
									};
									Object.freeze(t), jo(n, t, null, e);
								}
							} else typeof a == "function" && (s.preventDefault(), e = o ? nu(i, o) : new FormData(i), t = {
								pending: !0,
								data: e,
								method: i.method,
								action: a
							}, Object.freeze(t), jo(n, t, a, e));
						},
						currentTarget: i
					}]
				});
			}
		}
		function iu(e, t, n) {
			e.currentTarget = n;
			try {
				t(e);
			} catch (e) {
				lg(e);
			}
			e.currentTarget = null;
		}
		function au(e, t) {
			t = (t & 4) != 0;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				a: {
					var i = void 0, a = r.event;
					if (r = r.listeners, t) for (var o = r.length - 1; 0 <= o; o--) {
						var s = r[o], c = s.instance, l = s.currentTarget;
						if (s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? iu(a, s, l) : A(c, iu, a, s, l), i = c;
					}
					else for (o = 0; o < r.length; o++) {
						if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== i && a.isPropagationStopped()) break a;
						c === null ? iu(a, s, l) : A(c, iu, a, s, l), i = c;
					}
				}
			}
		}
		function V(e, t) {
			mS.has(e) || console.error("Did not expect a listenToNonDelegatedEvent() call for \"%s\". This is a bug in React. Please file an issue.", e);
			var n = t[Kp];
			n === void 0 && (n = t[Kp] = /* @__PURE__ */ new Set());
			var r = e + "__bubble";
			n.has(r) || (cu(t, e, 2, !1), n.add(r));
		}
		function ou(e, t, n) {
			mS.has(e) && !t && console.error("Did not expect a listenToNativeEvent() call for \"%s\" in the bubble phase. This is a bug in React. Please file an issue.", e);
			var r = 0;
			t && (r |= 4), cu(n, e, r, t);
		}
		function su(e) {
			if (!e[hS]) {
				e[hS] = !0, Zp.forEach(function(t) {
					t !== "selectionchange" && (mS.has(t) || ou(t, !1, e), ou(t, !0, e));
				});
				var t = e.nodeType === 9 ? e : e.ownerDocument;
				t === null || t[hS] || (t[hS] = !0, ou("selectionchange", !1, t));
			}
		}
		function cu(e, t, n, r) {
			switch (lf(t)) {
				case Rp:
					var i = rf;
					break;
				case zp:
					i = af;
					break;
				default: i = of;
			}
			n = i.bind(null, t, n, e), i = void 0, !Qm || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
				capture: !0,
				passive: i
			}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
		}
		function lu(e, t, n, r, i) {
			var a = r;
			if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
				if (r === null) return;
				var o = r.tag;
				if (o === 3 || o === 4) {
					var s = r.stateNode.containerInfo;
					if (s === i) break;
					if (o === 4) for (o = r.return; o !== null;) {
						var c = o.tag;
						if ((c === 3 || c === 4) && o.stateNode.containerInfo === i) return;
						o = o.return;
					}
					for (; s !== null;) {
						if (o = Je(s), o === null) return;
						if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
							r = a = o;
							continue a;
						}
						s = s.parentNode;
					}
				}
				r = r.return;
			}
			ln(function() {
				var r = a, i = sn(n), o = [];
				a: {
					var s = rg.get(e);
					if (s !== void 0) {
						var c = ih, l = e;
						switch (e) {
							case "keypress": if (fn(n) === 0) break a;
							case "keydown":
							case "keyup":
								c = xh;
								break;
							case "focusin":
								l = "focus", c = ph;
								break;
							case "focusout":
								l = "blur", c = ph;
								break;
							case "beforeblur":
							case "afterblur":
								c = ph;
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
								c = dh;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								c = fh;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								c = Ch;
								break;
							case Xh:
							case Zh:
							case Qh:
								c = mh;
								break;
							case ng:
								c = wh;
								break;
							case "scroll":
							case "scrollend":
								c = oh;
								break;
							case "wheel":
								c = Th;
								break;
							case "copy":
							case "cut":
							case "paste":
								c = hh;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								c = Sh;
								break;
							case "toggle":
							case "beforetoggle": c = Eh;
						}
						var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
						u = [];
						for (var p = r, m; p !== null;) {
							var h = p;
							if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = un(p, f), h != null && u.push(uu(p, h, m))), d) break;
							p = p.return;
						}
						0 < u.length && (s = new c(s, l, null, n, i), o.push({
							event: s,
							listeners: u
						}));
					}
				}
				if (!(t & 7)) {
					a: {
						if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== qm && (l = n.relatedTarget || n.fromElement) && (Je(l) || l[Gp])) break a;
						if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Je(l) : null, l !== null && (d = x(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
							if (u = dh, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Sh, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : Xe(c), m = l == null ? s : Xe(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, Je(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
								for (u = fu, f = c, p = l, m = 0, h = f; h; h = u(h)) m++;
								h = 0;
								for (var g = p; g; g = u(g)) h++;
								for (; 0 < m - h;) f = u(f), m--;
								for (; 0 < h - m;) p = u(p), h--;
								for (; m--;) {
									if (f === p || p !== null && f === p.alternate) {
										u = f;
										break b;
									}
									f = u(f), p = u(p);
								}
								u = null;
							}
							else u = null;
							c !== null && pu(o, s, c, u, !1), l !== null && d !== null && pu(o, d, l, u, !0);
						}
					}
					a: {
						if (s = r ? Xe(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var _ = Dn;
						else if (Sn(s)) if (Bh) _ = Nn;
						else {
							_ = jn;
							var v = An;
						}
						else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && Qt(r.elementType) && (_ = Dn) : _ = Mn;
						if (_ &&= _(e, r)) {
							wn(o, _, n, i);
							break a;
						}
						v && v(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && _t(s, "number", s.value);
					}
					switch (v = r ? Xe(r) : window, e) {
						case "focusin":
							(Sn(v) || v.contentEditable === "true") && (Uh = v, Wh = r, Gh = null);
							break;
						case "focusout":
							Gh = Wh = Uh = null;
							break;
						case "mousedown":
							Kh = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							Kh = !1, Vn(o, n, i);
							break;
						case "selectionchange": if (Hh) break;
						case "keydown":
						case "keyup": Vn(o, n, i);
					}
					var y;
					if (kh) b: {
						switch (e) {
							case "compositionstart":
								var b = "onCompositionStart";
								break b;
							case "compositionend":
								b = "onCompositionEnd";
								break b;
							case "compositionupdate":
								b = "onCompositionUpdate";
								break b;
						}
						b = void 0;
					}
					else Ih ? vn(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === Oh && (b = "onCompositionStart");
					b && (Mh && n.locale !== "ko" && (Ih || b !== "onCompositionStart" ? b === "onCompositionEnd" && Ih && (y = dn()) : (eh = i, th = "value" in eh ? eh.value : eh.textContent, Ih = !0)), v = du(r, b), 0 < v.length && (b = new gh(b, e, null, n, i), o.push({
						event: b,
						listeners: v
					}), y ? b.data = y : (y = yn(n), y !== null && (b.data = y)))), (y = jh ? bn(e, n) : xn(e, n)) && (b = du(r, "onBeforeInput"), 0 < b.length && (v = new _h("onBeforeInput", "beforeinput", null, n, i), o.push({
						event: v,
						listeners: b
					}), v.data = y)), ru(o, e, r, n, i);
				}
				au(o, t);
			});
		}
		function uu(e, t, n) {
			return {
				instance: e,
				listener: t,
				currentTarget: n
			};
		}
		function du(e, t) {
			for (var n = t + "Capture", r = []; e !== null;) {
				var i = e, a = i.stateNode;
				if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = un(e, n), i != null && r.unshift(uu(e, i, a)), i = un(e, t), i != null && r.push(uu(e, i, a))), e.tag === 3) return r;
				e = e.return;
			}
			return [];
		}
		function fu(e) {
			if (e === null) return null;
			do
				e = e.return;
			while (e && e.tag !== 5 && e.tag !== 27);
			return e || null;
		}
		function pu(e, t, n, r, i) {
			for (var a = t._reactName, o = []; n !== null && n !== r;) {
				var s = n, c = s.alternate, l = s.stateNode;
				if (s = s.tag, c !== null && c === r) break;
				s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = un(n, a), l != null && o.unshift(uu(n, l, c))) : i || (l = un(n, a), l != null && o.push(uu(n, l, c)))), n = n.return;
			}
			o.length !== 0 && e.push({
				event: t,
				listeners: o
			});
		}
		function mu(e, t) {
			tn(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Bm || (Bm = !0, e === "select" && t.multiple ? console.error("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : console.error("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
			var n = {
				registrationNameDependencies: Qp,
				possibleRegistrationNames: $p
			};
			Qt(e) || typeof t.is == "string" || rn(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.");
		}
		function hu(e, t, n, r) {
			t !== n && (n = yu(n), yu(t) !== n && (r[e] = t));
		}
		function gu(e, t, n) {
			t.forEach(function(t) {
				n[Tu(t)] = t === "style" ? Eu(e) : e.getAttribute(t);
			});
		}
		function _u(e, t) {
			!1 === t ? console.error("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : console.error("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
		}
		function vu(e, t) {
			return e = e.namespaceURI === Mm || e.namespaceURI === Nm ? e.ownerDocument.createElementNS(e.namespaceURI, e.tagName) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
		}
		function yu(e) {
			return Ce(e) && (console.error("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.", Se(e)), we(e)), (typeof e == "string" ? e : "" + e).replace(wS, "\n").replace(TS, "");
		}
		function bu(e, t) {
			return t = yu(t), yu(e) === t;
		}
		function xu(e, t, n, r, i, a) {
			switch (n) {
				case "children":
					typeof r == "string" ? (qt(r, t, !1), t === "body" || t === "textarea" && r === "" || Jt(e, r)) : (typeof r == "number" || typeof r == "bigint") && (qt("" + r, t, !1), t !== "body" && Jt(e, "" + r));
					break;
				case "className":
					at(e, "class", r);
					break;
				case "tabIndex":
					at(e, "tabindex", r);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					at(e, n, r);
					break;
				case "style":
					Zt(e, r, a);
					break;
				case "data": if (t !== "object") {
					at(e, "data", r);
					break;
				}
				case "src":
				case "href":
					if (r === "" && (t !== "a" || n !== "href")) {
						console.error(n === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", n, n), e.removeAttribute(n);
						break;
					}
					if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					j(r, n), r = an("" + r), e.setAttribute(n, r);
					break;
				case "action":
				case "formAction":
					if (r != null && (t === "form" ? n === "formAction" ? console.error("You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>.") : typeof r == "function" && (i.encType == null && i.method == null || xS || (xS = !0, console.error("Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden.")), i.target == null || bS || (bS = !0, console.error("Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."))) : t === "input" || t === "button" ? n === "action" ? console.error("You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>.") : t !== "input" || i.type === "submit" || i.type === "image" || vS ? t !== "button" || i.type == null || i.type === "submit" || vS ? typeof r == "function" && (i.name == null || yS || (yS = !0, console.error("Cannot specify a \"name\" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.")), i.formEncType == null && i.formMethod == null || xS || (xS = !0, console.error("Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden.")), i.formTarget == null || bS || (bS = !0, console.error("Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."))) : (vS = !0, console.error("A button can only specify a formAction along with type=\"submit\" or no type.")) : (vS = !0, console.error("An input can only specify a formAction along with type=\"submit\" or type=\"image\".")) : console.error(n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>.")), typeof r == "function") {
						e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else typeof a == "function" && (n === "formAction" ? (t !== "input" && xu(e, t, "name", i.name, i, null), xu(e, t, "formEncType", i.formEncType, i, null), xu(e, t, "formMethod", i.formMethod, i, null), xu(e, t, "formTarget", i.formTarget, i, null)) : (xu(e, t, "encType", i.encType, i, null), xu(e, t, "method", i.method, i, null), xu(e, t, "target", i.target, i, null)));
					if (r == null || typeof r == "symbol" || typeof r == "boolean") {
						e.removeAttribute(n);
						break;
					}
					j(r, n), r = an("" + r), e.setAttribute(n, r);
					break;
				case "onClick":
					r != null && (typeof r != "function" && _u(n, r), e.onclick = on);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && _u(n, r), V("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && _u(n, r), V("scrollend", e));
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
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
					j(r, n), n = an("" + r), e.setAttributeNS(ES, "xlink:href", n);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					r != null && typeof r != "function" && typeof r != "symbol" ? (j(r, n), e.setAttribute(n, "" + r)) : e.removeAttribute(n);
					break;
				case "inert": r !== "" || CS[n] || (CS[n] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", n));
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
					!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? (j(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? (j(r, n), e.setAttribute(n, r)) : e.removeAttribute(n);
					break;
				case "rowSpan":
				case "start":
					r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : (j(r, n), e.setAttribute(n, r));
					break;
				case "popover":
					V("beforetoggle", e), V("toggle", e), it(e, "popover", r);
					break;
				case "xlinkActuate":
					ot(e, ES, "xlink:actuate", r);
					break;
				case "xlinkArcrole":
					ot(e, ES, "xlink:arcrole", r);
					break;
				case "xlinkRole":
					ot(e, ES, "xlink:role", r);
					break;
				case "xlinkShow":
					ot(e, ES, "xlink:show", r);
					break;
				case "xlinkTitle":
					ot(e, ES, "xlink:title", r);
					break;
				case "xlinkType":
					ot(e, ES, "xlink:type", r);
					break;
				case "xmlBase":
					ot(e, DS, "xml:base", r);
					break;
				case "xmlLang":
					ot(e, DS, "xml:lang", r);
					break;
				case "xmlSpace":
					ot(e, DS, "xml:space", r);
					break;
				case "is":
					a != null && console.error("Cannot update the \"is\" prop after it has been initialized."), it(e, "is", r);
					break;
				case "innerText":
				case "textContent": break;
				case "popoverTarget": SS || typeof r != "object" || !r || (SS = !0, console.error("The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.", r));
				default: !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = $t(n), it(e, n, r)) : Qp.hasOwnProperty(n) && r != null && typeof r != "function" && _u(n, r);
			}
		}
		function Su(e, t, n, r, i, a) {
			switch (n) {
				case "style":
					Zt(e, r, a);
					break;
				case "dangerouslySetInnerHTML":
					if (r != null) {
						if (typeof r != "object" || !("__html" in r)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
						if (n = r.__html, n != null) {
							if (i.children != null) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
							e.innerHTML = n;
						}
					}
					break;
				case "children":
					typeof r == "string" ? Jt(e, r) : (typeof r == "number" || typeof r == "bigint") && Jt(e, "" + r);
					break;
				case "onScroll":
					r != null && (typeof r != "function" && _u(n, r), V("scroll", e));
					break;
				case "onScrollEnd":
					r != null && (typeof r != "function" && _u(n, r), V("scrollend", e));
					break;
				case "onClick":
					r != null && (typeof r != "function" && _u(n, r), e.onclick = on);
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": break;
				case "innerText":
				case "textContent": break;
				default: if (Qp.hasOwnProperty(n)) r != null && typeof r != "function" && _u(n, r);
				else a: {
					if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[Wp] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
						typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
						break a;
					}
					n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : it(e, n, r);
				}
			}
		}
		function Cu(e, t, n) {
			switch (mu(t, n), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					V("error", e), V("load", e);
					var r = !1, i = !1, a;
					for (a in n) if (n.hasOwnProperty(a)) {
						var o = n[a];
						if (o != null) switch (a) {
							case "src":
								r = !0;
								break;
							case "srcSet":
								i = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							default: xu(e, t, a, o, n, null);
						}
					}
					i && xu(e, t, "srcSet", n.srcSet, n, null), r && xu(e, t, "src", n.src, n, null);
					return;
				case "input":
					tt("input", n), V("invalid", e);
					var s = a = o = i = null, c = null, l = null;
					for (r in n) if (n.hasOwnProperty(r)) {
						var u = n[r];
						if (u != null) switch (r) {
							case "name":
								i = u;
								break;
							case "type":
								o = u;
								break;
							case "checked":
								c = u;
								break;
							case "defaultChecked":
								l = u;
								break;
							case "value":
								a = u;
								break;
							case "defaultValue":
								s = u;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (u != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: xu(e, t, r, u, n, null);
						}
					}
					mt(e, n), gt(e, a, s, c, l, o, i, !1);
					return;
				case "select":
					for (i in tt("select", n), V("invalid", e), r = o = a = null, n) if (n.hasOwnProperty(i) && (s = n[i], s != null)) switch (i) {
						case "value":
							a = s;
							break;
						case "defaultValue":
							o = s;
							break;
						case "multiple": r = s;
						default: xu(e, t, i, s, n, null);
					}
					xt(e, n), t = a, n = o, e.multiple = !!r, t == null ? n != null && bt(e, !!r, n, !0) : bt(e, !!r, t, !1);
					return;
				case "textarea":
					for (o in tt("textarea", n), V("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(o) && (s = n[o], s != null)) switch (o) {
						case "value":
							r = s;
							break;
						case "defaultValue":
							i = s;
							break;
						case "children":
							a = s;
							break;
						case "dangerouslySetInnerHTML":
							if (s != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: xu(e, t, o, s, n, null);
					}
					St(e, n), wt(e, r, i, a);
					return;
				case "option":
					for (c in vt(e, n), n) if (n.hasOwnProperty(c) && (r = n[c], r != null)) switch (c) {
						case "selected":
							e.selected = r && typeof r != "function" && typeof r != "symbol";
							break;
						default: xu(e, t, c, r, n, null);
					}
					return;
				case "dialog":
					V("beforetoggle", e), V("toggle", e), V("cancel", e), V("close", e);
					break;
				case "iframe":
				case "object":
					V("load", e);
					break;
				case "video":
				case "audio":
					for (r = 0; r < pS.length; r++) V(pS[r], e);
					break;
				case "image":
					V("error", e), V("load", e);
					break;
				case "details":
					V("toggle", e);
					break;
				case "embed":
				case "source":
				case "link": V("error", e), V("load", e);
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
					for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
						default: xu(e, t, l, r, n, null);
					}
					return;
				default: if (Qt(t)) {
					for (u in n) n.hasOwnProperty(u) && (r = n[u], r !== void 0 && Su(e, t, u, r, n, void 0));
					return;
				}
			}
			for (s in n) n.hasOwnProperty(s) && (r = n[s], r != null && xu(e, t, s, r, n, null));
		}
		function wu(e, t, n, r) {
			switch (mu(t, r), t) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var i = null, a = null, o = null, s = null, c = null, l = null, u = null;
					for (p in n) {
						var d = n[p];
						if (n.hasOwnProperty(p) && d != null) switch (p) {
							case "checked": break;
							case "value": break;
							case "defaultValue": c = d;
							default: r.hasOwnProperty(p) || xu(e, t, p, null, r, d);
						}
					}
					for (var f in r) {
						var p = r[f];
						if (d = n[f], r.hasOwnProperty(f) && (p != null || d != null)) switch (f) {
							case "type":
								a = p;
								break;
							case "name":
								i = p;
								break;
							case "checked":
								l = p;
								break;
							case "defaultChecked":
								u = p;
								break;
							case "value":
								o = p;
								break;
							case "defaultValue":
								s = p;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (p != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
								break;
							default: p !== d && xu(e, t, f, p, r, d);
						}
					}
					t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, r = r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null, t || !r || _S || (console.error("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), _S = !0), !t || r || gS || (console.error("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"), gS = !0), ht(e, o, s, c, l, u, a, i);
					return;
				case "select":
					for (a in p = o = s = f = null, n) if (c = n[a], n.hasOwnProperty(a) && c != null) switch (a) {
						case "value": break;
						case "multiple": p = c;
						default: r.hasOwnProperty(a) || xu(e, t, a, null, r, c);
					}
					for (i in r) if (a = r[i], c = n[i], r.hasOwnProperty(i) && (a != null || c != null)) switch (i) {
						case "value":
							f = a;
							break;
						case "defaultValue":
							s = a;
							break;
						case "multiple": o = a;
						default: a !== c && xu(e, t, i, a, r, c);
					}
					r = s, t = o, n = p, f == null ? !!n != !!t && (r == null ? bt(e, !!t, t ? [] : "", !1) : bt(e, !!t, r, !0)) : bt(e, !!t, f, !1);
					return;
				case "textarea":
					for (s in p = f = null, n) if (i = n[s], n.hasOwnProperty(s) && i != null && !r.hasOwnProperty(s)) switch (s) {
						case "value": break;
						case "children": break;
						default: xu(e, t, s, null, r, i);
					}
					for (o in r) if (i = r[o], a = n[o], r.hasOwnProperty(o) && (i != null || a != null)) switch (o) {
						case "value":
							f = i;
							break;
						case "defaultValue":
							p = i;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (i != null) throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
							break;
						default: i !== a && xu(e, t, o, i, r, a);
					}
					Ct(e, f, p);
					return;
				case "option":
					for (var m in n) if (f = n[m], n.hasOwnProperty(m) && f != null && !r.hasOwnProperty(m)) switch (m) {
						case "selected":
							e.selected = !1;
							break;
						default: xu(e, t, m, null, r, f);
					}
					for (c in r) if (f = r[c], p = n[c], r.hasOwnProperty(c) && f !== p && (f != null || p != null)) switch (c) {
						case "selected":
							e.selected = f && typeof f != "function" && typeof f != "symbol";
							break;
						default: xu(e, t, c, f, r, p);
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
					for (var h in n) f = n[h], n.hasOwnProperty(h) && f != null && !r.hasOwnProperty(h) && xu(e, t, h, null, r, f);
					for (l in r) if (f = r[l], p = n[l], r.hasOwnProperty(l) && f !== p && (f != null || p != null)) switch (l) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (f != null) throw Error(t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
							break;
						default: xu(e, t, l, f, r, p);
					}
					return;
				default: if (Qt(t)) {
					for (var g in n) f = n[g], n.hasOwnProperty(g) && f !== void 0 && !r.hasOwnProperty(g) && Su(e, t, g, void 0, r, f);
					for (u in r) f = r[u], p = n[u], !r.hasOwnProperty(u) || f === p || f === void 0 && p === void 0 || Su(e, t, u, f, r, p);
					return;
				}
			}
			for (var _ in n) f = n[_], n.hasOwnProperty(_) && f != null && !r.hasOwnProperty(_) && xu(e, t, _, null, r, f);
			for (d in r) f = r[d], p = n[d], !r.hasOwnProperty(d) || f === p || f == null && p == null || xu(e, t, d, f, r, p);
		}
		function Tu(e) {
			switch (e) {
				case "class": return "className";
				case "for": return "htmlFor";
				default: return e;
			}
		}
		function Eu(e) {
			var t = {};
			e = e.style;
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				t[r] = e.getPropertyValue(r);
			}
			return t;
		}
		function Du(e, t, n) {
			if (t != null && typeof t != "object") console.error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
			else {
				var r, i = r = "", a;
				for (a in t) if (t.hasOwnProperty(a)) {
					var o = t[a];
					o != null && typeof o != "boolean" && o !== "" && (a.indexOf("--") === 0 ? (Te(o, a), r += i + a + ":" + ("" + o).trim()) : typeof o != "number" || o === 0 || jm.has(a) ? (Te(o, a), r += i + a.replace(xm, "-$1").toLowerCase().replace(Sm, "-ms-") + ":" + ("" + o).trim()) : r += i + a.replace(xm, "-$1").toLowerCase().replace(Sm, "-ms-") + ":" + o + "px", i = ";");
				}
				r ||= null, t = e.getAttribute("style"), t !== r && (r = yu(r), yu(t) !== r && (n.style = Eu(e)));
			}
		}
		function Ou(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (j(r, t), e === "" + r) return;
			}
			hu(t, e, r, a);
		}
		function ku(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) {
				switch (typeof r) {
					case "function":
					case "symbol": return;
				}
				if (!r) return;
			} else switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (r) return;
			}
			hu(t, e, r, a);
		}
		function Au(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol": break;
				default: if (j(r, n), e === "" + r) return;
			}
			hu(t, e, r, a);
		}
		function ju(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
				default: if (isNaN(r)) return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (!isNaN(r) && (j(r, t), e === "" + r)) return;
			}
			hu(t, e, r, a);
		}
		function Mu(e, t, n, r, i, a) {
			if (i.delete(n), e = e.getAttribute(n), e === null) switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean": return;
			}
			else if (r != null) switch (typeof r) {
				case "function":
				case "symbol":
				case "boolean": break;
				default: if (j(r, t), n = an("" + r), e === n) return;
			}
			hu(t, e, r, a);
		}
		function Nu(e, t, n, r) {
			for (var i = {}, a = /* @__PURE__ */ new Set(), o = e.attributes, s = 0; s < o.length; s++) switch (o[s].name.toLowerCase()) {
				case "value": break;
				case "checked": break;
				case "selected": break;
				default: a.add(o[s].name);
			}
			if (Qt(t)) {
				for (var c in n) if (n.hasOwnProperty(c)) {
					var l = n[c];
					if (l != null) {
						if (Qp.hasOwnProperty(c)) typeof l != "function" && _u(c, l);
						else if (!0 !== n.suppressHydrationWarning) switch (c) {
							case "children":
								typeof l != "string" && typeof l != "number" || hu("children", e.textContent, l, i);
								continue;
							case "suppressContentEditableWarning":
							case "suppressHydrationWarning":
							case "defaultValue":
							case "defaultChecked":
							case "innerHTML":
							case "ref": continue;
							case "dangerouslySetInnerHTML":
								o = e.innerHTML, l = l ? l.__html : void 0, l != null && (l = vu(e, l), hu(c, o, l, i));
								continue;
							case "style":
								a.delete(c), Du(e, l, i);
								continue;
							case "offsetParent":
							case "offsetTop":
							case "offsetLeft":
							case "offsetWidth":
							case "offsetHeight":
							case "isContentEditable":
							case "outerText":
							case "outerHTML":
								a.delete(c.toLowerCase()), console.error("Assignment to read-only property will result in a no-op: `%s`", c);
								continue;
							case "className":
								a.delete("class"), o = rt(e, "class", l), hu("className", o, l, i);
								continue;
							default: r.context === WS && t !== "svg" && t !== "math" ? a.delete(c.toLowerCase()) : a.delete(c), o = rt(e, c, l), hu(c, o, l, i);
						}
					}
				}
			} else for (l in n) if (n.hasOwnProperty(l) && (c = n[l], c != null)) {
				if (Qp.hasOwnProperty(l)) typeof c != "function" && _u(l, c);
				else if (!0 !== n.suppressHydrationWarning) switch (l) {
					case "children":
						typeof c != "string" && typeof c != "number" || hu("children", e.textContent, c, i);
						continue;
					case "suppressContentEditableWarning":
					case "suppressHydrationWarning":
					case "value":
					case "checked":
					case "selected":
					case "defaultValue":
					case "defaultChecked":
					case "innerHTML":
					case "ref": continue;
					case "dangerouslySetInnerHTML":
						o = e.innerHTML, c = c ? c.__html : void 0, c != null && (c = vu(e, c), o !== c && (i[l] = { __html: o }));
						continue;
					case "className":
						Ou(e, l, "class", c, a, i);
						continue;
					case "tabIndex":
						Ou(e, l, "tabindex", c, a, i);
						continue;
					case "style":
						a.delete(l), Du(e, c, i);
						continue;
					case "multiple":
						a.delete(l), hu(l, e.multiple, c, i);
						continue;
					case "muted":
						a.delete(l), hu(l, e.muted, c, i);
						continue;
					case "autoFocus":
						a.delete("autofocus"), hu(l, e.autofocus, c, i);
						continue;
					case "data": if (t !== "object") {
						a.delete(l), o = e.getAttribute("data"), hu(l, o, c, i);
						continue;
					}
					case "src":
					case "href":
						if (!(c !== "" || t === "a" && l === "href" || t === "object" && l === "data")) {
							console.error(l === "src" ? "An empty string (\"\") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string." : "An empty string (\"\") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.", l, l);
							continue;
						}
						Mu(e, l, l, c, a, i);
						continue;
					case "action":
					case "formAction":
						if (o = e.getAttribute(l), typeof c == "function") {
							a.delete(l.toLowerCase()), l === "formAction" ? (a.delete("name"), a.delete("formenctype"), a.delete("formmethod"), a.delete("formtarget")) : (a.delete("enctype"), a.delete("method"), a.delete("target"));
							continue;
						} else if (o === OS) {
							a.delete(l.toLowerCase()), hu(l, "function", c, i);
							continue;
						}
						Mu(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "xlinkHref":
						Mu(e, l, "xlink:href", c, a, i);
						continue;
					case "contentEditable":
						Au(e, l, "contenteditable", c, a, i);
						continue;
					case "spellCheck":
						Au(e, l, "spellcheck", c, a, i);
						continue;
					case "draggable":
					case "autoReverse":
					case "externalResourcesRequired":
					case "focusable":
					case "preserveAlpha":
						Au(e, l, l, c, a, i);
						continue;
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
						ku(e, l, l.toLowerCase(), c, a, i);
						continue;
					case "capture":
					case "download":
						a: {
							s = e;
							var u = o = l, d = i;
							if (a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol": break a;
								default: if (!1 === c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol": break;
								case "boolean":
									if (!0 === c && s === "") break a;
									break;
								default: if (j(c, o), s === "" + c) break a;
							}
							hu(o, s, c, d);
						}
						continue;
					case "cols":
					case "rows":
					case "size":
					case "span":
						a: {
							if (s = e, u = o = l, d = i, a.delete(u), s = s.getAttribute(u), s === null) switch (typeof c) {
								case "undefined":
								case "function":
								case "symbol":
								case "boolean": break a;
								default: if (isNaN(c) || 1 > c) break a;
							}
							else if (c != null) switch (typeof c) {
								case "function":
								case "symbol":
								case "boolean": break;
								default: if (!(isNaN(c) || 1 > c) && (j(c, o), s === "" + c)) break a;
							}
							hu(o, s, c, d);
						}
						continue;
					case "rowSpan":
						ju(e, l, "rowspan", c, a, i);
						continue;
					case "start":
						ju(e, l, l, c, a, i);
						continue;
					case "xHeight":
						Ou(e, l, "x-height", c, a, i);
						continue;
					case "xlinkActuate":
						Ou(e, l, "xlink:actuate", c, a, i);
						continue;
					case "xlinkArcrole":
						Ou(e, l, "xlink:arcrole", c, a, i);
						continue;
					case "xlinkRole":
						Ou(e, l, "xlink:role", c, a, i);
						continue;
					case "xlinkShow":
						Ou(e, l, "xlink:show", c, a, i);
						continue;
					case "xlinkTitle":
						Ou(e, l, "xlink:title", c, a, i);
						continue;
					case "xlinkType":
						Ou(e, l, "xlink:type", c, a, i);
						continue;
					case "xmlBase":
						Ou(e, l, "xml:base", c, a, i);
						continue;
					case "xmlLang":
						Ou(e, l, "xml:lang", c, a, i);
						continue;
					case "xmlSpace":
						Ou(e, l, "xml:space", c, a, i);
						continue;
					case "inert":
						c !== "" || CS[l] || (CS[l] = !0, console.error("Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.", l)), ku(e, l, l, c, a, i);
						continue;
					default: if (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
						s = $t(l), o = !1, r.context === WS && t !== "svg" && t !== "math" ? a.delete(s.toLowerCase()) : (u = l.toLowerCase(), u = Fm.hasOwnProperty(u) && Fm[u] || null, u !== null && u !== l && (o = !0, a.delete(u)), a.delete(s));
						a: if (u = e, d = s, s = c, nt(d)) if (u.hasAttribute(d)) u = u.getAttribute(d), j(s, d), s = u === "" + s ? s : u;
						else {
							switch (typeof s) {
								case "function":
								case "symbol": break a;
								case "boolean": if (u = d.toLowerCase().slice(0, 5), u !== "data-" && u !== "aria-") break a;
							}
							s = s === void 0 ? void 0 : null;
						}
						else s = void 0;
						o || hu(l, s, c, i);
					}
				}
			}
			return 0 < a.size && !0 !== n.suppressHydrationWarning && gu(e, a, i), Object.keys(i).length === 0 ? null : i;
		}
		function Pu(e, t) {
			switch (e.length) {
				case 0: return "";
				case 1: return e[0];
				case 2: return e[0] + " " + t + " " + e[1];
				default: return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
			}
		}
		function Fu(e) {
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
		function Iu() {
			if (typeof performance.getEntriesByType == "function") {
				for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
					var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
					if (a && s && Fu(o)) {
						for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
							var c = n[r], l = c.startTime;
							if (l > s) break;
							var u = c.transferSize, d = c.initiatorType;
							u && Fu(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
						}
						if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
					}
				}
				if (0 < e) return t / e / 1e6;
			}
			return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
		}
		function Lu(e) {
			return e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Ru(e) {
			switch (e) {
				case Nm: return GS;
				case Mm: return KS;
				default: return WS;
			}
		}
		function zu(e, t) {
			if (e === WS) switch (t) {
				case "svg": return GS;
				case "math": return KS;
				default: return WS;
			}
			return e === GS && t === "foreignObject" ? WS : e;
		}
		function Bu(e, t) {
			return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
		}
		function Vu() {
			var e = window.event;
			return e && e.type === "popstate" ? e === XS ? !1 : (XS = e, !0) : (XS = null, !1);
		}
		function Hu() {
			var e = window.event;
			return e && e !== ZS ? e.type : null;
		}
		function Uu() {
			var e = window.event;
			return e && e !== ZS ? e.timeStamp : -1.1;
		}
		function Wu(e) {
			setTimeout(function() {
				throw e;
			});
		}
		function Gu(e, t, n) {
			switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && e.focus();
					break;
				case "img": n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
			}
		}
		function Ku() {}
		function qu(e, t, n, r) {
			wu(e, t, n, r), e[Wp] = r;
		}
		function Ju(e) {
			Jt(e, "");
		}
		function Yu(e, t, n) {
			e.nodeValue = n;
		}
		function Xu(e) {
			if (!e.__reactWarnedAboutChildrenConflict) {
				var t = e[Wp] || null;
				if (t !== null) {
					var n = Ye(e);
					n !== null && (typeof t.children == "string" || typeof t.children == "number" ? (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"children\" text content using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})) : t.dangerouslySetInnerHTML != null && (e.__reactWarnedAboutChildrenConflict = !0, A(n, function() {
						console.error("Cannot use a ref on a React element as a container to `createRoot` or `createPortal` if that element also sets \"dangerouslySetInnerHTML\" using React. It should be a leaf with no children. Otherwise it's ambiguous which children should be used.");
					})));
				}
			}
		}
		function Zu(e) {
			return e === "head";
		}
		function Qu(e, t) {
			e.removeChild(t);
		}
		function $u(e, t) {
			(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
		}
		function ed(e, t) {
			var n = t, r = 0;
			do {
				var i = n.nextSibling;
				if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === NS || n === jS) {
					if (r === 0) {
						e.removeChild(i), yf(t);
						return;
					}
					r--;
				} else if (n === MS || n === PS || n === FS || n === IS || n === AS) r++;
				else if (n === LS) Td(e.ownerDocument.documentElement);
				else if (n === zS) {
					n = e.ownerDocument.head, Td(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[Xp] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === RS && Td(e.ownerDocument.body);
				n = i;
			} while (n);
			yf(t);
		}
		function td(e, t) {
			var n = e;
			e = 0;
			do {
				var r = n.nextSibling;
				if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === NS) {
					if (e === 0) break;
					e--;
				} else n !== MS && n !== PS && n !== FS && n !== IS || e++;
				n = r;
			} while (n);
		}
		function nd(e) {
			td(e, !0);
		}
		function rd(e) {
			e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
		}
		function id(e) {
			e.nodeValue = "";
		}
		function ad(e) {
			td(e, !1);
		}
		function od(e, t) {
			t = t[US], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
		}
		function sd(e, t) {
			e.nodeValue = t;
		}
		function cd(e) {
			var t = e.firstChild;
			for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
				var n = t;
				switch (t = t.nextSibling, n.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						cd(n), qe(n);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
				}
				e.removeChild(n);
			}
		}
		function ld(e, t, n, r) {
			for (; e.nodeType === 1;) {
				var i = n;
				if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
					if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
				} else if (!r) if (t === "input" && e.type === "hidden") {
					j(i.name, "name");
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
				else if (!e[Xp]) switch (t) {
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
				if (e = hd(e.nextSibling), e === null) break;
			}
			return null;
		}
		function ud(e, t, n) {
			if (t === "") return null;
			for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = hd(e.nextSibling), e === null)) return null;
			return e;
		}
		function dd(e, t) {
			for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = hd(e.nextSibling), e === null)) return null;
			return e;
		}
		function fd(e) {
			return e.data === PS || e.data === FS;
		}
		function pd(e) {
			return e.data === IS || e.data === PS && e.ownerDocument.readyState !== HS;
		}
		function md(e, t) {
			var n = e.ownerDocument;
			if (e.data === FS) e._reactRetry = t;
			else if (e.data !== PS || n.readyState !== HS) t();
			else {
				var r = function() {
					t(), n.removeEventListener("DOMContentLoaded", r);
				};
				n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
			}
		}
		function hd(e) {
			for (; e != null; e = e.nextSibling) {
				var t = e.nodeType;
				if (t === 1 || t === 3) break;
				if (t === 8) {
					if (t = e.data, t === MS || t === IS || t === PS || t === FS || t === AS || t === BS || t === VS) break;
					if (t === NS || t === jS) return null;
				}
			}
			return e;
		}
		function gd(e) {
			if (e.nodeType === 1) {
				for (var t = e.nodeName.toLowerCase(), n = {}, r = e.attributes, i = 0; i < r.length; i++) {
					var a = r[i];
					n[Tu(a.name)] = a.name.toLowerCase() === "style" ? Eu(e) : a.value;
				}
				return {
					type: t,
					props: n
				};
			}
			return e.nodeType === 8 ? e.data === AS ? {
				type: "Activity",
				props: {}
			} : {
				type: "Suspense",
				props: {}
			} : e.nodeValue;
		}
		function _d(e, t, n) {
			return n === null || !0 !== n[kS] ? (e.nodeValue === t ? e = null : (t = yu(t), e = yu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
		}
		function vd(e) {
			e = e.nextSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === NS || n === jS) {
						if (t === 0) return hd(e.nextSibling);
						t--;
					} else n !== MS && n !== IS && n !== PS && n !== FS && n !== AS || t++;
				}
				e = e.nextSibling;
			}
			return null;
		}
		function yd(e) {
			e = e.previousSibling;
			for (var t = 0; e;) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === MS || n === IS || n === PS || n === FS || n === AS) {
						if (t === 0) return e;
						t--;
					} else n !== NS && n !== jS || t++;
				}
				e = e.previousSibling;
			}
			return null;
		}
		function bd(e) {
			yf(e);
		}
		function xd(e) {
			yf(e);
		}
		function Sd(e) {
			yf(e);
		}
		function Cd(e, t, n, r, i) {
			switch (i && Kt(e, r.ancestorInfo), t = Lu(n), e) {
				case "html":
					if (e = t.documentElement, !e) throw Error("React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "head":
					if (e = t.head, !e) throw Error("React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				case "body":
					if (e = t.body, !e) throw Error("React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page.");
					return e;
				default: throw Error("resolveSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
		}
		function wd(e, t, n, r) {
			if (!n[Gp] && Ye(n)) {
				var i = n.tagName.toLowerCase();
				console.error("You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.", i, i, i);
			}
			switch (e) {
				case "html":
				case "head":
				case "body": break;
				default: console.error("acquireSingletonInstance was called with an element type that is not supported. This is a bug in React.");
			}
			for (i = n.attributes; i.length;) n.removeAttributeNode(i[0]);
			Cu(n, e, t), n[Up] = r, n[Wp] = t;
		}
		function Td(e) {
			for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
			qe(e);
		}
		function Ed(e) {
			return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
		}
		function Dd(e, t, n) {
			var r = fC;
			if (r && typeof t == "string" && t) {
				var i = pt(t);
				i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), uC.has(i) || (uC.add(i), e = {
					rel: e,
					crossOrigin: n,
					href: t
				}, r.querySelector(i) === null && (t = r.createElement("link"), Cu(t, "link", e), Qe(t), r.head.appendChild(t)));
			}
		}
		function Od(e, t, n, r) {
			var i = (i = Qf.current) ? Ed(i) : null;
			if (!i) throw Error("\"resourceRoot\" was expected to exist. This is a bug in React.");
			switch (e) {
				case "meta":
				case "title": return null;
				case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = H(n.href), t = Ze(i).hoistableStyles, r = t.get(n), r || (r = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
						e = H(n.href);
						var a = Ze(i).hoistableStyles, o = a.get(e);
						if (!o && (i = i.ownerDocument || i, o = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: iC,
								preload: null
							}
						}, a.set(e, o), (a = i.querySelector(Ad(e))) && !a._p && (o.instance = a, o.state.loading = aC | cC), !lC.has(e))) {
							var s = {
								rel: "preload",
								as: "style",
								href: n.href,
								crossOrigin: n.crossOrigin,
								integrity: n.integrity,
								media: n.media,
								hrefLang: n.hrefLang,
								referrerPolicy: n.referrerPolicy
							};
							lC.set(e, s), a || Md(i, e, s, o.state);
						}
						if (t && r === null) throw n = "\n\n  - " + kd(t) + "\n  + " + kd(n), Error("Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
						return o;
					}
					if (t && r !== null) throw n = "\n\n  - " + kd(t) + "\n  + " + kd(n), Error("Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n);
					return null;
				case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Nd(n), t = Ze(i).hoistableScripts, r = t.get(n), r || (r = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, t.set(n, r)), r) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error("getResource encountered a type it did not expect: \"" + e + "\". this is a bug in React.");
			}
		}
		function kd(e) {
			var t = 0, n = "<link";
			return typeof e.rel == "string" ? (t++, n += " rel=\"" + e.rel + "\"") : mp.call(e, "rel") && (t++, n += " rel=\"" + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + "\""), typeof e.href == "string" ? (t++, n += " href=\"" + e.href + "\"") : mp.call(e, "href") && (t++, n += " href=\"" + (e.href === null ? "null" : "invalid type " + typeof e.href) + "\""), typeof e.precedence == "string" ? (t++, n += " precedence=\"" + e.precedence + "\"") : mp.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
		}
		function H(e) {
			return "href=\"" + pt(e) + "\"";
		}
		function Ad(e) {
			return "link[rel=\"stylesheet\"][" + e + "]";
		}
		function jd(e) {
			return U({}, e, {
				"data-precedence": e.precedence,
				precedence: null
			});
		}
		function Md(e, t, n, r) {
			e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = aC : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
				return r.loading |= aC;
			}), t.addEventListener("error", function() {
				return r.loading |= oC;
			}), Cu(t, "link", n), Qe(t), e.head.appendChild(t));
		}
		function Nd(e) {
			return "[src=\"" + pt(e) + "\"]";
		}
		function Pd(e) {
			return "script[async]" + e;
		}
		function Fd(e, t, n) {
			if (t.count++, t.instance === null) switch (t.type) {
				case "style":
					var r = e.querySelector("style[data-href~=\"" + pt(n.href) + "\"]");
					if (r) return t.instance = r, Qe(r), r;
					var i = U({}, n, {
						"data-href": n.href,
						"data-precedence": n.precedence,
						href: null,
						precedence: null
					});
					return r = (e.ownerDocument || e).createElement("style"), Qe(r), Cu(r, "style", i), Id(r, n.precedence, e), t.instance = r;
				case "stylesheet":
					i = H(n.href);
					var a = e.querySelector(Ad(i));
					if (a) return t.state.loading |= cC, t.instance = a, Qe(a), a;
					r = jd(n), (i = lC.get(i)) && Ld(r, i), a = (e.ownerDocument || e).createElement("link"), Qe(a);
					var o = a;
					return o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Cu(a, "link", r), t.state.loading |= cC, Id(a, n.precedence, e), t.instance = a;
				case "script": return a = Nd(n.src), (i = e.querySelector(Pd(a))) ? (t.instance = i, Qe(i), i) : (r = n, (i = lC.get(a)) && (r = U({}, n), Rd(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), Qe(i), Cu(i, "link", r), e.head.appendChild(i), t.instance = i);
				case "void": return null;
				default: throw Error("acquireResource encountered a resource type it did not expect: \"" + t.type + "\". this is a bug in React.");
			}
			else t.type === "stylesheet" && (t.state.loading & cC) === iC && (r = t.instance, t.state.loading |= cC, Id(r, n.precedence, e));
			return t.instance;
		}
		function Id(e, t, n) {
			for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
				var s = r[o];
				if (s.dataset.precedence === t) a = s;
				else if (a !== i) break;
			}
			a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
		}
		function Ld(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
		}
		function Rd(e, t) {
			e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
		}
		function zd(e, t, n) {
			if (pC === null) {
				var r = /* @__PURE__ */ new Map(), i = pC = /* @__PURE__ */ new Map();
				i.set(n, r);
			} else i = pC, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
			if (r.has(e)) return r;
			for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
				var a = n[i];
				if (!(a[Xp] || a[Up] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== Nm) {
					var o = a.getAttribute(t) || "";
					o = e + o;
					var s = r.get(o);
					s ? s.push(a) : r.set(o, [a]);
				}
			}
			return r;
		}
		function Bd(e, t, n) {
			e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
		}
		function Vd(e, t, n) {
			var r = !n.ancestorInfo.containerTagInScope;
			if (n.context === GS || t.itemProp != null) return !r || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error("Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.", e, e), !1;
			switch (e) {
				case "meta":
				case "title": return !0;
				case "style":
					if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
						r && console.error("Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel=\"stylesheet\" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence=\"default\"` and `href=\"some unique resource identifier\"`.");
						break;
					}
					return !0;
				case "link":
					if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
						if (t.rel === "stylesheet" && typeof t.precedence == "string") {
							e = t.href;
							var i = t.onError, a = t.disabled;
							n = [], t.onLoad && n.push("`onLoad`"), i && n.push("`onError`"), a != null && n.push("`disabled`"), i = Pu(n, "and"), i += n.length === 1 ? " prop" : " props", a = n.length === 1 ? "an " + i : "the " + i, n.length && console.error("React encountered a <link rel=\"stylesheet\" href=\"%s\" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.", e, a, i);
						}
						r && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error("Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag") : (t.onError || t.onLoad) && console.error("Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."));
						break;
					}
					switch (t.rel) {
						case "stylesheet": return e = t.precedence, t = t.disabled, typeof e != "string" && r && console.error("Cannot render a <link rel=\"stylesheet\" /> outside the main document without knowing its precedence. Consider adding precedence=\"default\" or moving it into the root <head> tag."), typeof e == "string" && t == null;
						default: return !0;
					}
				case "script":
					if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
						r && (e ? t.onLoad || t.onError ? console.error("Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>.") : console.error("Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async=\"\" or moving it into the root <head> tag."));
						break;
					}
					return !0;
				case "noscript":
				case "template": r && console.error("Cannot render <%s> outside the main document. Try moving it into the root <head> tag.", e);
			}
			return !1;
		}
		function Hd(e) {
			return !(e.type === "stylesheet" && (e.state.loading & sC) === iC);
		}
		function Ud(e, t, n, r) {
			if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && (n.state.loading & cC) === iC) {
				if (n.instance === null) {
					var i = H(r.href), a = t.querySelector(Ad(i));
					if (a) {
						t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Gd.bind(e), t.then(e, e)), n.state.loading |= cC, n.instance = a, Qe(a);
						return;
					}
					a = t.ownerDocument || t, r = jd(r), (i = lC.get(i)) && Ld(r, i), a = a.createElement("link"), Qe(a);
					var o = a;
					o._p = new Promise(function(e, t) {
						o.onload = e, o.onerror = t;
					}), Cu(a, "link", r), n.instance = a;
				}
				e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & sC) === iC && (e.count++, n = Gd.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
			}
		}
		function Wd(e, t) {
			return e.stylesheets && e.count === 0 && Kd(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
				var r = setTimeout(function() {
					if (e.stylesheets && Kd(e, e.stylesheets), e.unsuspend) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, mC + t);
				0 < e.imgBytes && _C === 0 && (_C = 125 * Iu() * gC);
				var i = setTimeout(function() {
					if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Kd(e, e.stylesheets), e.unsuspend)) {
						var t = e.unsuspend;
						e.unsuspend = null, t();
					}
				}, (e.imgBytes > _C ? 50 : hC) + t);
				return e.unsuspend = n, function() {
					e.unsuspend = null, clearTimeout(r), clearTimeout(i);
				};
			} : null;
		}
		function Gd() {
			if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
				if (this.stylesheets) Kd(this, this.stylesheets);
				else if (this.unsuspend) {
					var e = this.unsuspend;
					this.unsuspend = null, e();
				}
			}
		}
		function Kd(e, t) {
			e.stylesheets = null, e.unsuspend !== null && (e.count++, yC = /* @__PURE__ */ new Map(), t.forEach(qd, e), yC = null, Gd.call(e));
		}
		function qd(e, t) {
			if (!(t.state.loading & cC)) {
				var n = yC.get(e);
				if (n) var r = n.get(vC);
				else {
					n = /* @__PURE__ */ new Map(), yC.set(e, n);
					for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
						var o = i[a];
						(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
					}
					r && n.set(vC, r);
				}
				i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(vC, i), n.set(o, i), this.count++, r = Gd.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= cC;
			}
		}
		function Jd(e, t, n, r, i, a, o, s, c) {
			for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = eC, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Fe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fe(0), this.hiddenUpdates = Fe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
			this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
		}
		function Yd(e, t, n, r, i, a, o, s, c, l, u, d) {
			return e = new Jd(e, t, n, o, c, l, u, d, s), t = Ig, !0 === a && (t |= Lg | Rg), t |= K, a = h(3, null, null, t), e.current = a, a.stateNode = e, t = oi(), si(t), e.pooledCache = t, si(t), a.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: t
			}, Qi(a), e;
		}
		function Xd(e) {
			return e ? (e = Ng, e) : Ng;
		}
		function Zd(e, t, n, r, i, a) {
			if (kp && typeof kp.onScheduleFiberRoot == "function") try {
				kp.onScheduleFiberRoot(Op, r, n);
			} catch (e) {
				Ap || (Ap = !0, console.error("React instrumentation encountered an error: %o", e));
			}
			i = Xd(i), r.context === null ? r.context = i : r.pendingContext = i, pp && fp !== null && !DC && (DC = !0, console.error("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", w(fp) || "Unknown")), r = ea(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && console.error("Expected the last optional `callback` argument to be a function. Instead received: %s.", a), r.callback = a), n = ta(e, r, t), n !== null && (li(t, "root.render()", null), $c(n, e, t), na(n, e, t));
		}
		function Qd(e, t) {
			if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
				var n = e.retryLane;
				e.retryLane = n !== 0 && n < t ? n : t;
			}
		}
		function $d(e, t) {
			Qd(e, t), (e = e.alternate) && Qd(e, t);
		}
		function ef(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = fr(e, 67108864);
				t !== null && $c(t, e, 67108864), $d(e, 67108864);
			}
		}
		function tf(e) {
			if (e.tag === 13 || e.tag === 31) {
				var t = Zc(e);
				t = Ve(t);
				var n = fr(e, t);
				n !== null && $c(n, e, t), $d(e, t);
			}
		}
		function nf() {
			return fp;
		}
		function rf(e, t, n, r) {
			var i = W.T;
			W.T = null;
			var a = Gf.p;
			try {
				Gf.p = Rp, of(e, t, n, r);
			} finally {
				Gf.p = a, W.T = i;
			}
		}
		function af(e, t, n, r) {
			var i = W.T;
			W.T = null;
			var a = Gf.p;
			try {
				Gf.p = zp, of(e, t, n, r);
			} finally {
				Gf.p = a, W.T = i;
			}
		}
		function of(e, t, n, r) {
			if (RC) {
				var i = sf(r);
				if (i === null) lu(e, t, r, zC, n), uf(e, r);
				else if (ff(i, e, t, n, r)) r.stopPropagation();
				else if (uf(e, r), t & 4 && -1 < qC.indexOf(e)) {
					for (; i !== null;) {
						var a = Ye(i);
						if (a !== null) switch (a.tag) {
							case 3:
								if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
									var o = Ae(a.pendingLanes);
									if (o !== 0) {
										var s = a;
										for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
											var c = 1 << 31 - Mp(o);
											s.entanglements[1] |= c, o &= ~c;
										}
										Kl(a), (Wb & (Fb | Ib)) === Pb && (bx = yp() + xx, B(0, !1));
									}
								}
								break;
							case 31:
							case 13: s = fr(a, 2), s !== null && $c(s, a, 2), il(), $d(a, 2);
						}
						if (a = sf(r), a === null && lu(e, t, r, zC, n), a === i) break;
						i = a;
					}
					i !== null && r.stopPropagation();
				} else lu(e, t, r, null, n);
			}
		}
		function sf(e) {
			return e = sn(e), cf(e);
		}
		function cf(e) {
			if (zC = null, e = Je(e), e !== null) {
				var t = x(e);
				if (t === null) e = null;
				else {
					var n = t.tag;
					if (n === 13) {
						if (e = ee(t), e !== null) return e;
						e = null;
					} else if (n === 31) {
						if (e = te(t), e !== null) return e;
						e = null;
					} else if (n === 3) {
						if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
						e = null;
					} else t !== e && (e = null);
				}
			}
			return zC = e, null;
		}
		function lf(e) {
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
				case "selectstart": return Rp;
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
				case "pointerleave": return zp;
				case "message": switch (bp()) {
					case xp: return Rp;
					case Sp: return zp;
					case Cp:
					case wp: return Bp;
					case Tp: return Vp;
					default: return Bp;
				}
				default: return Bp;
			}
		}
		function uf(e, t) {
			switch (e) {
				case "focusin":
				case "focusout":
					VC = null;
					break;
				case "dragenter":
				case "dragleave":
					HC = null;
					break;
				case "mouseover":
				case "mouseout":
					UC = null;
					break;
				case "pointerover":
				case "pointerout":
					WC.delete(t.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": GC.delete(t.pointerId);
			}
		}
		function df(e, t, n, r, i, a) {
			return e === null || e.nativeEvent !== a ? (e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: a,
				targetContainers: [i]
			}, t !== null && (t = Ye(t), t !== null && ef(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
		}
		function ff(e, t, n, r, i) {
			switch (t) {
				case "focusin": return VC = df(VC, e, t, n, r, i), !0;
				case "dragenter": return HC = df(HC, e, t, n, r, i), !0;
				case "mouseover": return UC = df(UC, e, t, n, r, i), !0;
				case "pointerover":
					var a = i.pointerId;
					return WC.set(a, df(WC.get(a) || null, e, t, n, r, i)), !0;
				case "gotpointercapture": return a = i.pointerId, GC.set(a, df(GC.get(a) || null, e, t, n, r, i)), !0;
			}
			return !1;
		}
		function pf(e) {
			var t = Je(e.target);
			if (t !== null) {
				var n = x(t);
				if (n !== null) {
					if (t = n.tag, t === 13) {
						if (t = ee(n), t !== null) {
							e.blockedOn = t, Ke(e.priority, function() {
								tf(n);
							});
							return;
						}
					} else if (t === 31) {
						if (t = te(n), t !== null) {
							e.blockedOn = t, Ke(e.priority, function() {
								tf(n);
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
		function mf(e) {
			if (e.blockedOn !== null) return !1;
			for (var t = e.targetContainers; 0 < t.length;) {
				var n = sf(e.nativeEvent);
				if (n === null) {
					n = e.nativeEvent;
					var r = new n.constructor(n.type, n), i = r;
					qm !== null && console.error("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), qm = i, n.target.dispatchEvent(r), qm === null && console.error("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), qm = null;
				} else return t = Ye(n), t !== null && ef(t), e.blockedOn = n, !1;
				t.shift();
			}
			return !0;
		}
		function hf(e, t, n) {
			mf(e) && n.delete(t);
		}
		function gf() {
			BC = !1, VC !== null && mf(VC) && (VC = null), HC !== null && mf(HC) && (HC = null), UC !== null && mf(UC) && (UC = null), WC.forEach(hf), GC.forEach(hf);
		}
		function _f(e, t) {
			e.blockedOn === t && (e.blockedOn = null, BC || (BC = !0, wf.unstable_scheduleCallback(wf.unstable_NormalPriority, gf)));
		}
		function vf(e) {
			JC !== e && (JC = e, wf.unstable_scheduleCallback(wf.unstable_NormalPriority, function() {
				JC === e && (JC = null);
				for (var t = 0; t < e.length; t += 3) {
					var n = e[t], r = e[t + 1], i = e[t + 2];
					if (typeof r != "function") {
						if (cf(r || n) === null) continue;
						break;
					}
					var a = Ye(n);
					a !== null && (e.splice(t, 3), t -= 3, n = {
						pending: !0,
						data: i,
						method: n.method,
						action: r
					}, Object.freeze(n), jo(a, n, r, i));
				}
			}));
		}
		function yf(e) {
			function t(t) {
				return _f(t, e);
			}
			VC !== null && _f(VC, e), HC !== null && _f(HC, e), UC !== null && _f(UC, e), WC.forEach(t), GC.forEach(t);
			for (var n = 0; n < KC.length; n++) {
				var r = KC[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
			for (; 0 < KC.length && (n = KC[0], n.blockedOn === null);) pf(n), n.blockedOn === null && KC.shift();
			if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
				var i = n[r], a = n[r + 1], o = i[Wp] || null;
				if (typeof a == "function") o || vf(n);
				else if (o) {
					var s = null;
					if (a && a.hasAttribute("formAction")) {
						if (i = a, o = a[Wp] || null) s = o.formAction;
						else if (cf(i) !== null) continue;
					} else s = o.action;
					typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), vf(n);
				}
			}
		}
		function bf() {
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
		function xf(e) {
			this._internalRoot = e;
		}
		function Sf(e) {
			this._internalRoot = e;
		}
		function Cf(e) {
			e[Gp] && (e._reactRootContainer ? console.error("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : console.error("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var wf = m(), Tf = d(), Ef = _(), U = Object.assign, Df = Symbol.for("react.element"), Of = Symbol.for("react.transitional.element"), kf = Symbol.for("react.portal"), Af = Symbol.for("react.fragment"), jf = Symbol.for("react.strict_mode"), Mf = Symbol.for("react.profiler"), Nf = Symbol.for("react.consumer"), Pf = Symbol.for("react.context"), Ff = Symbol.for("react.forward_ref"), If = Symbol.for("react.suspense"), Lf = Symbol.for("react.suspense_list"), Rf = Symbol.for("react.memo"), zf = Symbol.for("react.lazy"), Bf = Symbol.for("react.activity"), Vf = Symbol.for("react.memo_cache_sentinel"), Hf = Symbol.iterator, Uf = Symbol.for("react.client.reference"), Wf = Array.isArray, W = Tf.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Gf = Ef.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Kf = Object.freeze({
			pending: !1,
			data: null,
			method: null,
			action: null
		}), qf = [], Jf = [], Yf = -1, Xf = oe(null), Zf = oe(null), Qf = oe(null), $f = oe(null), ep = 0, tp, np, rp, ip, ap, op, sp;
		O.__reactDisabledLog = !0;
		var cp, lp, up = !1, dp = new (typeof WeakMap == "function" ? WeakMap : Map)(), fp = null, pp = !1, mp = Object.prototype.hasOwnProperty, hp = wf.unstable_scheduleCallback, gp = wf.unstable_cancelCallback, _p = wf.unstable_shouldYield, vp = wf.unstable_requestPaint, yp = wf.unstable_now, bp = wf.unstable_getCurrentPriorityLevel, xp = wf.unstable_ImmediatePriority, Sp = wf.unstable_UserBlockingPriority, Cp = wf.unstable_NormalPriority, wp = wf.unstable_LowPriority, Tp = wf.unstable_IdlePriority, Ep = wf.log, Dp = wf.unstable_setDisableYieldValue, Op = null, kp = null, Ap = !1, jp = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Mp = Math.clz32 ? Math.clz32 : ke, Np = Math.log, Pp = Math.LN2, Fp = 256, Ip = 262144, Lp = 4194304, Rp = 2, zp = 8, Bp = 32, Vp = 268435456, Hp = Math.random().toString(36).slice(2), Up = "__reactFiber$" + Hp, Wp = "__reactProps$" + Hp, Gp = "__reactContainer$" + Hp, Kp = "__reactEvents$" + Hp, qp = "__reactListeners$" + Hp, Jp = "__reactHandles$" + Hp, Yp = "__reactResources$" + Hp, Xp = "__reactMarker$" + Hp, Zp = /* @__PURE__ */ new Set(), Qp = {}, $p = {}, em = {
			button: !0,
			checkbox: !0,
			image: !0,
			hidden: !0,
			radio: !0,
			reset: !0,
			submit: !0
		}, tm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), nm = {}, rm = {}, im = /[\n"\\]/g, am = !1, om = !1, sm = !1, cm = !1, lm = !1, um = !1, dm = ["value", "defaultValue"], fm = !1, pm = /["'&<>\n\t]|^\s|\s$/, mm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(" "), hm = "applet caption html table td th marquee object template foreignObject desc title".split(" "), gm = hm.concat(["button"]), _m = "dd dt li option optgroup p rp rt".split(" "), vm = {
			current: null,
			formTag: null,
			aTagInScope: null,
			buttonTagInScope: null,
			nobrTagInScope: null,
			pTagInButtonScope: null,
			listItemTagAutoclosing: null,
			dlItemTagAutoclosing: null,
			containerTagInScope: null,
			implicitRootScope: !1
		}, ym = {}, bm = {
			animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(" "),
			background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(" "),
			backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
			border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(" "),
			borderBlockEnd: [
				"borderBlockEndColor",
				"borderBlockEndStyle",
				"borderBlockEndWidth"
			],
			borderBlockStart: [
				"borderBlockStartColor",
				"borderBlockStartStyle",
				"borderBlockStartWidth"
			],
			borderBottom: [
				"borderBottomColor",
				"borderBottomStyle",
				"borderBottomWidth"
			],
			borderColor: [
				"borderBottomColor",
				"borderLeftColor",
				"borderRightColor",
				"borderTopColor"
			],
			borderImage: [
				"borderImageOutset",
				"borderImageRepeat",
				"borderImageSlice",
				"borderImageSource",
				"borderImageWidth"
			],
			borderInlineEnd: [
				"borderInlineEndColor",
				"borderInlineEndStyle",
				"borderInlineEndWidth"
			],
			borderInlineStart: [
				"borderInlineStartColor",
				"borderInlineStartStyle",
				"borderInlineStartWidth"
			],
			borderLeft: [
				"borderLeftColor",
				"borderLeftStyle",
				"borderLeftWidth"
			],
			borderRadius: [
				"borderBottomLeftRadius",
				"borderBottomRightRadius",
				"borderTopLeftRadius",
				"borderTopRightRadius"
			],
			borderRight: [
				"borderRightColor",
				"borderRightStyle",
				"borderRightWidth"
			],
			borderStyle: [
				"borderBottomStyle",
				"borderLeftStyle",
				"borderRightStyle",
				"borderTopStyle"
			],
			borderTop: [
				"borderTopColor",
				"borderTopStyle",
				"borderTopWidth"
			],
			borderWidth: [
				"borderBottomWidth",
				"borderLeftWidth",
				"borderRightWidth",
				"borderTopWidth"
			],
			columnRule: [
				"columnRuleColor",
				"columnRuleStyle",
				"columnRuleWidth"
			],
			columns: ["columnCount", "columnWidth"],
			flex: [
				"flexBasis",
				"flexGrow",
				"flexShrink"
			],
			flexFlow: ["flexDirection", "flexWrap"],
			font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(" "),
			fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(" "),
			gap: ["columnGap", "rowGap"],
			grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(" "),
			gridArea: [
				"gridColumnEnd",
				"gridColumnStart",
				"gridRowEnd",
				"gridRowStart"
			],
			gridColumn: ["gridColumnEnd", "gridColumnStart"],
			gridColumnGap: ["columnGap"],
			gridGap: ["columnGap", "rowGap"],
			gridRow: ["gridRowEnd", "gridRowStart"],
			gridRowGap: ["rowGap"],
			gridTemplate: [
				"gridTemplateAreas",
				"gridTemplateColumns",
				"gridTemplateRows"
			],
			listStyle: [
				"listStyleImage",
				"listStylePosition",
				"listStyleType"
			],
			margin: [
				"marginBottom",
				"marginLeft",
				"marginRight",
				"marginTop"
			],
			marker: [
				"markerEnd",
				"markerMid",
				"markerStart"
			],
			mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(" "),
			maskPosition: ["maskPositionX", "maskPositionY"],
			outline: [
				"outlineColor",
				"outlineStyle",
				"outlineWidth"
			],
			overflow: ["overflowX", "overflowY"],
			padding: [
				"paddingBottom",
				"paddingLeft",
				"paddingRight",
				"paddingTop"
			],
			placeContent: ["alignContent", "justifyContent"],
			placeItems: ["alignItems", "justifyItems"],
			placeSelf: ["alignSelf", "justifySelf"],
			textDecoration: [
				"textDecorationColor",
				"textDecorationLine",
				"textDecorationStyle"
			],
			textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
			transition: [
				"transitionDelay",
				"transitionDuration",
				"transitionProperty",
				"transitionTimingFunction"
			],
			wordWrap: ["overflowWrap"]
		}, xm = /([A-Z])/g, Sm = /^ms-/, Cm = /^(?:webkit|moz|o)[A-Z]/, wm = /^-ms-/, Tm = /-(.)/g, Em = /;\s*$/, Dm = {}, Om = {}, km = !1, Am = !1, jm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Mm = "http://www.w3.org/1998/Math/MathML", Nm = "http://www.w3.org/2000/svg", Pm = new Map([
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
		]), Fm = {
			accept: "accept",
			acceptcharset: "acceptCharset",
			"accept-charset": "acceptCharset",
			accesskey: "accessKey",
			action: "action",
			allowfullscreen: "allowFullScreen",
			alt: "alt",
			as: "as",
			async: "async",
			autocapitalize: "autoCapitalize",
			autocomplete: "autoComplete",
			autocorrect: "autoCorrect",
			autofocus: "autoFocus",
			autoplay: "autoPlay",
			autosave: "autoSave",
			capture: "capture",
			cellpadding: "cellPadding",
			cellspacing: "cellSpacing",
			challenge: "challenge",
			charset: "charSet",
			checked: "checked",
			children: "children",
			cite: "cite",
			class: "className",
			classid: "classID",
			classname: "className",
			cols: "cols",
			colspan: "colSpan",
			content: "content",
			contenteditable: "contentEditable",
			contextmenu: "contextMenu",
			controls: "controls",
			controlslist: "controlsList",
			coords: "coords",
			crossorigin: "crossOrigin",
			dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
			data: "data",
			datetime: "dateTime",
			default: "default",
			defaultchecked: "defaultChecked",
			defaultvalue: "defaultValue",
			defer: "defer",
			dir: "dir",
			disabled: "disabled",
			disablepictureinpicture: "disablePictureInPicture",
			disableremoteplayback: "disableRemotePlayback",
			download: "download",
			draggable: "draggable",
			enctype: "encType",
			enterkeyhint: "enterKeyHint",
			fetchpriority: "fetchPriority",
			for: "htmlFor",
			form: "form",
			formmethod: "formMethod",
			formaction: "formAction",
			formenctype: "formEncType",
			formnovalidate: "formNoValidate",
			formtarget: "formTarget",
			frameborder: "frameBorder",
			headers: "headers",
			height: "height",
			hidden: "hidden",
			high: "high",
			href: "href",
			hreflang: "hrefLang",
			htmlfor: "htmlFor",
			httpequiv: "httpEquiv",
			"http-equiv": "httpEquiv",
			icon: "icon",
			id: "id",
			imagesizes: "imageSizes",
			imagesrcset: "imageSrcSet",
			inert: "inert",
			innerhtml: "innerHTML",
			inputmode: "inputMode",
			integrity: "integrity",
			is: "is",
			itemid: "itemID",
			itemprop: "itemProp",
			itemref: "itemRef",
			itemscope: "itemScope",
			itemtype: "itemType",
			keyparams: "keyParams",
			keytype: "keyType",
			kind: "kind",
			label: "label",
			lang: "lang",
			list: "list",
			loop: "loop",
			low: "low",
			manifest: "manifest",
			marginwidth: "marginWidth",
			marginheight: "marginHeight",
			max: "max",
			maxlength: "maxLength",
			media: "media",
			mediagroup: "mediaGroup",
			method: "method",
			min: "min",
			minlength: "minLength",
			multiple: "multiple",
			muted: "muted",
			name: "name",
			nomodule: "noModule",
			nonce: "nonce",
			novalidate: "noValidate",
			open: "open",
			optimum: "optimum",
			pattern: "pattern",
			placeholder: "placeholder",
			playsinline: "playsInline",
			poster: "poster",
			preload: "preload",
			profile: "profile",
			radiogroup: "radioGroup",
			readonly: "readOnly",
			referrerpolicy: "referrerPolicy",
			rel: "rel",
			required: "required",
			reversed: "reversed",
			role: "role",
			rows: "rows",
			rowspan: "rowSpan",
			sandbox: "sandbox",
			scope: "scope",
			scoped: "scoped",
			scrolling: "scrolling",
			seamless: "seamless",
			selected: "selected",
			shape: "shape",
			size: "size",
			sizes: "sizes",
			span: "span",
			spellcheck: "spellCheck",
			src: "src",
			srcdoc: "srcDoc",
			srclang: "srcLang",
			srcset: "srcSet",
			start: "start",
			step: "step",
			style: "style",
			summary: "summary",
			tabindex: "tabIndex",
			target: "target",
			title: "title",
			type: "type",
			usemap: "useMap",
			value: "value",
			width: "width",
			wmode: "wmode",
			wrap: "wrap",
			about: "about",
			accentheight: "accentHeight",
			"accent-height": "accentHeight",
			accumulate: "accumulate",
			additive: "additive",
			alignmentbaseline: "alignmentBaseline",
			"alignment-baseline": "alignmentBaseline",
			allowreorder: "allowReorder",
			alphabetic: "alphabetic",
			amplitude: "amplitude",
			arabicform: "arabicForm",
			"arabic-form": "arabicForm",
			ascent: "ascent",
			attributename: "attributeName",
			attributetype: "attributeType",
			autoreverse: "autoReverse",
			azimuth: "azimuth",
			basefrequency: "baseFrequency",
			baselineshift: "baselineShift",
			"baseline-shift": "baselineShift",
			baseprofile: "baseProfile",
			bbox: "bbox",
			begin: "begin",
			bias: "bias",
			by: "by",
			calcmode: "calcMode",
			capheight: "capHeight",
			"cap-height": "capHeight",
			clip: "clip",
			clippath: "clipPath",
			"clip-path": "clipPath",
			clippathunits: "clipPathUnits",
			cliprule: "clipRule",
			"clip-rule": "clipRule",
			color: "color",
			colorinterpolation: "colorInterpolation",
			"color-interpolation": "colorInterpolation",
			colorinterpolationfilters: "colorInterpolationFilters",
			"color-interpolation-filters": "colorInterpolationFilters",
			colorprofile: "colorProfile",
			"color-profile": "colorProfile",
			colorrendering: "colorRendering",
			"color-rendering": "colorRendering",
			contentscripttype: "contentScriptType",
			contentstyletype: "contentStyleType",
			cursor: "cursor",
			cx: "cx",
			cy: "cy",
			d: "d",
			datatype: "datatype",
			decelerate: "decelerate",
			descent: "descent",
			diffuseconstant: "diffuseConstant",
			direction: "direction",
			display: "display",
			divisor: "divisor",
			dominantbaseline: "dominantBaseline",
			"dominant-baseline": "dominantBaseline",
			dur: "dur",
			dx: "dx",
			dy: "dy",
			edgemode: "edgeMode",
			elevation: "elevation",
			enablebackground: "enableBackground",
			"enable-background": "enableBackground",
			end: "end",
			exponent: "exponent",
			externalresourcesrequired: "externalResourcesRequired",
			fill: "fill",
			fillopacity: "fillOpacity",
			"fill-opacity": "fillOpacity",
			fillrule: "fillRule",
			"fill-rule": "fillRule",
			filter: "filter",
			filterres: "filterRes",
			filterunits: "filterUnits",
			floodopacity: "floodOpacity",
			"flood-opacity": "floodOpacity",
			floodcolor: "floodColor",
			"flood-color": "floodColor",
			focusable: "focusable",
			fontfamily: "fontFamily",
			"font-family": "fontFamily",
			fontsize: "fontSize",
			"font-size": "fontSize",
			fontsizeadjust: "fontSizeAdjust",
			"font-size-adjust": "fontSizeAdjust",
			fontstretch: "fontStretch",
			"font-stretch": "fontStretch",
			fontstyle: "fontStyle",
			"font-style": "fontStyle",
			fontvariant: "fontVariant",
			"font-variant": "fontVariant",
			fontweight: "fontWeight",
			"font-weight": "fontWeight",
			format: "format",
			from: "from",
			fx: "fx",
			fy: "fy",
			g1: "g1",
			g2: "g2",
			glyphname: "glyphName",
			"glyph-name": "glyphName",
			glyphorientationhorizontal: "glyphOrientationHorizontal",
			"glyph-orientation-horizontal": "glyphOrientationHorizontal",
			glyphorientationvertical: "glyphOrientationVertical",
			"glyph-orientation-vertical": "glyphOrientationVertical",
			glyphref: "glyphRef",
			gradienttransform: "gradientTransform",
			gradientunits: "gradientUnits",
			hanging: "hanging",
			horizadvx: "horizAdvX",
			"horiz-adv-x": "horizAdvX",
			horizoriginx: "horizOriginX",
			"horiz-origin-x": "horizOriginX",
			ideographic: "ideographic",
			imagerendering: "imageRendering",
			"image-rendering": "imageRendering",
			in2: "in2",
			in: "in",
			inlist: "inlist",
			intercept: "intercept",
			k1: "k1",
			k2: "k2",
			k3: "k3",
			k4: "k4",
			k: "k",
			kernelmatrix: "kernelMatrix",
			kernelunitlength: "kernelUnitLength",
			kerning: "kerning",
			keypoints: "keyPoints",
			keysplines: "keySplines",
			keytimes: "keyTimes",
			lengthadjust: "lengthAdjust",
			letterspacing: "letterSpacing",
			"letter-spacing": "letterSpacing",
			lightingcolor: "lightingColor",
			"lighting-color": "lightingColor",
			limitingconeangle: "limitingConeAngle",
			local: "local",
			markerend: "markerEnd",
			"marker-end": "markerEnd",
			markerheight: "markerHeight",
			markermid: "markerMid",
			"marker-mid": "markerMid",
			markerstart: "markerStart",
			"marker-start": "markerStart",
			markerunits: "markerUnits",
			markerwidth: "markerWidth",
			mask: "mask",
			maskcontentunits: "maskContentUnits",
			maskunits: "maskUnits",
			mathematical: "mathematical",
			mode: "mode",
			numoctaves: "numOctaves",
			offset: "offset",
			opacity: "opacity",
			operator: "operator",
			order: "order",
			orient: "orient",
			orientation: "orientation",
			origin: "origin",
			overflow: "overflow",
			overlineposition: "overlinePosition",
			"overline-position": "overlinePosition",
			overlinethickness: "overlineThickness",
			"overline-thickness": "overlineThickness",
			paintorder: "paintOrder",
			"paint-order": "paintOrder",
			panose1: "panose1",
			"panose-1": "panose1",
			pathlength: "pathLength",
			patterncontentunits: "patternContentUnits",
			patterntransform: "patternTransform",
			patternunits: "patternUnits",
			pointerevents: "pointerEvents",
			"pointer-events": "pointerEvents",
			points: "points",
			pointsatx: "pointsAtX",
			pointsaty: "pointsAtY",
			pointsatz: "pointsAtZ",
			popover: "popover",
			popovertarget: "popoverTarget",
			popovertargetaction: "popoverTargetAction",
			prefix: "prefix",
			preservealpha: "preserveAlpha",
			preserveaspectratio: "preserveAspectRatio",
			primitiveunits: "primitiveUnits",
			property: "property",
			r: "r",
			radius: "radius",
			refx: "refX",
			refy: "refY",
			renderingintent: "renderingIntent",
			"rendering-intent": "renderingIntent",
			repeatcount: "repeatCount",
			repeatdur: "repeatDur",
			requiredextensions: "requiredExtensions",
			requiredfeatures: "requiredFeatures",
			resource: "resource",
			restart: "restart",
			result: "result",
			results: "results",
			rotate: "rotate",
			rx: "rx",
			ry: "ry",
			scale: "scale",
			security: "security",
			seed: "seed",
			shaperendering: "shapeRendering",
			"shape-rendering": "shapeRendering",
			slope: "slope",
			spacing: "spacing",
			specularconstant: "specularConstant",
			specularexponent: "specularExponent",
			speed: "speed",
			spreadmethod: "spreadMethod",
			startoffset: "startOffset",
			stddeviation: "stdDeviation",
			stemh: "stemh",
			stemv: "stemv",
			stitchtiles: "stitchTiles",
			stopcolor: "stopColor",
			"stop-color": "stopColor",
			stopopacity: "stopOpacity",
			"stop-opacity": "stopOpacity",
			strikethroughposition: "strikethroughPosition",
			"strikethrough-position": "strikethroughPosition",
			strikethroughthickness: "strikethroughThickness",
			"strikethrough-thickness": "strikethroughThickness",
			string: "string",
			stroke: "stroke",
			strokedasharray: "strokeDasharray",
			"stroke-dasharray": "strokeDasharray",
			strokedashoffset: "strokeDashoffset",
			"stroke-dashoffset": "strokeDashoffset",
			strokelinecap: "strokeLinecap",
			"stroke-linecap": "strokeLinecap",
			strokelinejoin: "strokeLinejoin",
			"stroke-linejoin": "strokeLinejoin",
			strokemiterlimit: "strokeMiterlimit",
			"stroke-miterlimit": "strokeMiterlimit",
			strokewidth: "strokeWidth",
			"stroke-width": "strokeWidth",
			strokeopacity: "strokeOpacity",
			"stroke-opacity": "strokeOpacity",
			suppresscontenteditablewarning: "suppressContentEditableWarning",
			suppresshydrationwarning: "suppressHydrationWarning",
			surfacescale: "surfaceScale",
			systemlanguage: "systemLanguage",
			tablevalues: "tableValues",
			targetx: "targetX",
			targety: "targetY",
			textanchor: "textAnchor",
			"text-anchor": "textAnchor",
			textdecoration: "textDecoration",
			"text-decoration": "textDecoration",
			textlength: "textLength",
			textrendering: "textRendering",
			"text-rendering": "textRendering",
			to: "to",
			transform: "transform",
			transformorigin: "transformOrigin",
			"transform-origin": "transformOrigin",
			typeof: "typeof",
			u1: "u1",
			u2: "u2",
			underlineposition: "underlinePosition",
			"underline-position": "underlinePosition",
			underlinethickness: "underlineThickness",
			"underline-thickness": "underlineThickness",
			unicode: "unicode",
			unicodebidi: "unicodeBidi",
			"unicode-bidi": "unicodeBidi",
			unicoderange: "unicodeRange",
			"unicode-range": "unicodeRange",
			unitsperem: "unitsPerEm",
			"units-per-em": "unitsPerEm",
			unselectable: "unselectable",
			valphabetic: "vAlphabetic",
			"v-alphabetic": "vAlphabetic",
			values: "values",
			vectoreffect: "vectorEffect",
			"vector-effect": "vectorEffect",
			version: "version",
			vertadvy: "vertAdvY",
			"vert-adv-y": "vertAdvY",
			vertoriginx: "vertOriginX",
			"vert-origin-x": "vertOriginX",
			vertoriginy: "vertOriginY",
			"vert-origin-y": "vertOriginY",
			vhanging: "vHanging",
			"v-hanging": "vHanging",
			videographic: "vIdeographic",
			"v-ideographic": "vIdeographic",
			viewbox: "viewBox",
			viewtarget: "viewTarget",
			visibility: "visibility",
			vmathematical: "vMathematical",
			"v-mathematical": "vMathematical",
			vocab: "vocab",
			widths: "widths",
			wordspacing: "wordSpacing",
			"word-spacing": "wordSpacing",
			writingmode: "writingMode",
			"writing-mode": "writingMode",
			x1: "x1",
			x2: "x2",
			x: "x",
			xchannelselector: "xChannelSelector",
			xheight: "xHeight",
			"x-height": "xHeight",
			xlinkactuate: "xlinkActuate",
			"xlink:actuate": "xlinkActuate",
			xlinkarcrole: "xlinkArcrole",
			"xlink:arcrole": "xlinkArcrole",
			xlinkhref: "xlinkHref",
			"xlink:href": "xlinkHref",
			xlinkrole: "xlinkRole",
			"xlink:role": "xlinkRole",
			xlinkshow: "xlinkShow",
			"xlink:show": "xlinkShow",
			xlinktitle: "xlinkTitle",
			"xlink:title": "xlinkTitle",
			xlinktype: "xlinkType",
			"xlink:type": "xlinkType",
			xmlbase: "xmlBase",
			"xml:base": "xmlBase",
			xmllang: "xmlLang",
			"xml:lang": "xmlLang",
			xmlns: "xmlns",
			"xml:space": "xmlSpace",
			xmlnsxlink: "xmlnsXlink",
			"xmlns:xlink": "xmlnsXlink",
			xmlspace: "xmlSpace",
			y1: "y1",
			y2: "y2",
			y: "y",
			ychannelselector: "yChannelSelector",
			z: "z",
			zoomandpan: "zoomAndPan"
		}, Im = {
			"aria-current": 0,
			"aria-description": 0,
			"aria-details": 0,
			"aria-disabled": 0,
			"aria-hidden": 0,
			"aria-invalid": 0,
			"aria-keyshortcuts": 0,
			"aria-label": 0,
			"aria-roledescription": 0,
			"aria-autocomplete": 0,
			"aria-checked": 0,
			"aria-expanded": 0,
			"aria-haspopup": 0,
			"aria-level": 0,
			"aria-modal": 0,
			"aria-multiline": 0,
			"aria-multiselectable": 0,
			"aria-orientation": 0,
			"aria-placeholder": 0,
			"aria-pressed": 0,
			"aria-readonly": 0,
			"aria-required": 0,
			"aria-selected": 0,
			"aria-sort": 0,
			"aria-valuemax": 0,
			"aria-valuemin": 0,
			"aria-valuenow": 0,
			"aria-valuetext": 0,
			"aria-atomic": 0,
			"aria-busy": 0,
			"aria-live": 0,
			"aria-relevant": 0,
			"aria-dropeffect": 0,
			"aria-grabbed": 0,
			"aria-activedescendant": 0,
			"aria-colcount": 0,
			"aria-colindex": 0,
			"aria-colspan": 0,
			"aria-controls": 0,
			"aria-describedby": 0,
			"aria-errormessage": 0,
			"aria-flowto": 0,
			"aria-labelledby": 0,
			"aria-owns": 0,
			"aria-posinset": 0,
			"aria-rowcount": 0,
			"aria-rowindex": 0,
			"aria-rowspan": 0,
			"aria-setsize": 0,
			"aria-braillelabel": 0,
			"aria-brailleroledescription": 0,
			"aria-colindextext": 0,
			"aria-rowindextext": 0
		}, Lm = {}, Rm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), zm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Bm = !1, Vm = {}, Hm = /^on./, Um = /^on[^A-Z]/, Wm = RegExp("^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Gm = RegExp("^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Km = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, qm = null, Jm = null, Ym = null, Xm = !1, Zm = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), Qm = !1;
		if (Zm) try {
			var $m = {};
			Object.defineProperty($m, "passive", { get: function() {
				Qm = !0;
			} }), window.addEventListener("test", $m, $m), window.removeEventListener("test", $m, $m);
		} catch {
			Qm = !1;
		}
		var eh = null, th = null, nh = null, rh = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		}, ih = hn(rh), ah = U({}, rh, {
			view: 0,
			detail: 0
		}), oh = hn(ah), sh, ch, lh, uh = U({}, ah, {
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
			getModifierState: _n,
			button: 0,
			buttons: 0,
			relatedTarget: function(e) {
				return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
			},
			movementX: function(e) {
				return "movementX" in e ? e.movementX : (e !== lh && (lh && e.type === "mousemove" ? (sh = e.screenX - lh.screenX, ch = e.screenY - lh.screenY) : ch = sh = 0, lh = e), sh);
			},
			movementY: function(e) {
				return "movementY" in e ? e.movementY : ch;
			}
		}), dh = hn(uh), fh = hn(U({}, uh, { dataTransfer: 0 })), ph = hn(U({}, ah, { relatedTarget: 0 })), mh = hn(U({}, rh, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), hh = hn(U({}, rh, { clipboardData: function(e) {
			return "clipboardData" in e ? e.clipboardData : window.clipboardData;
		} })), gh = hn(U({}, rh, { data: 0 })), _h = gh, vh = {
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
		}, yh = {
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
		}, bh = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		}, xh = hn(U({}, ah, {
			key: function(e) {
				if (e.key) {
					var t = vh[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? (e = fn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? yh[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: _n,
			charCode: function(e) {
				return e.type === "keypress" ? fn(e) : 0;
			},
			keyCode: function(e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function(e) {
				return e.type === "keypress" ? fn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			}
		})), Sh = hn(U({}, uh, {
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
		})), Ch = hn(U({}, ah, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: _n
		})), wh = hn(U({}, rh, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		})), Th = hn(U({}, uh, {
			deltaX: function(e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function(e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		})), Eh = hn(U({}, rh, {
			newState: 0,
			oldState: 0
		})), Dh = [
			9,
			13,
			27,
			32
		], Oh = 229, kh = Zm && "CompositionEvent" in window, Ah = null;
		Zm && "documentMode" in document && (Ah = document.documentMode);
		var jh = Zm && "TextEvent" in window && !Ah, Mh = Zm && (!kh || Ah && 8 < Ah && 11 >= Ah), Nh = 32, Ph = String.fromCharCode(Nh), Fh = !1, Ih = !1, Lh = {
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
		}, Rh = null, zh = null, Bh = !1;
		Zm && (Bh = Cn("input") && (!document.documentMode || 9 < document.documentMode));
		var Vh = typeof Object.is == "function" ? Object.is : Pn, Hh = Zm && "documentMode" in document && 11 >= document.documentMode, Uh = null, Wh = null, Gh = null, Kh = !1, qh = {
			animationend: Hn("Animation", "AnimationEnd"),
			animationiteration: Hn("Animation", "AnimationIteration"),
			animationstart: Hn("Animation", "AnimationStart"),
			transitionrun: Hn("Transition", "TransitionRun"),
			transitionstart: Hn("Transition", "TransitionStart"),
			transitioncancel: Hn("Transition", "TransitionCancel"),
			transitionend: Hn("Transition", "TransitionEnd")
		}, Jh = {}, Yh = {};
		Zm && (Yh = document.createElement("div").style, "AnimationEvent" in window || (delete qh.animationend.animation, delete qh.animationiteration.animation, delete qh.animationstart.animation), "TransitionEvent" in window || delete qh.transitionend.transition);
		var Xh = Un("animationend"), Zh = Un("animationiteration"), Qh = Un("animationstart"), $h = Un("transitionrun"), eg = Un("transitionstart"), tg = Un("transitioncancel"), ng = Un("transitionend"), rg = /* @__PURE__ */ new Map(), ig = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		ig.push("scrollEnd");
		var ag = 0;
		if (typeof performance == "object" && typeof performance.now == "function") var og = performance, sg = function() {
			return og.now();
		};
		else {
			var cg = Date;
			sg = function() {
				return cg.now();
			};
		}
		var lg = typeof reportError == "function" ? reportError : function(e) {
			if (typeof window == "object" && typeof window.ErrorEvent == "function") {
				var t = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
					error: e
				});
				if (!window.dispatchEvent(t)) return;
			} else if (typeof process == "object" && typeof process.emit == "function") {
				process.emit("uncaughtException", e);
				return;
			}
			console.error(e);
		}, ug = "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.", dg = 0, fg = 1, pg = 2, mg = 3, hg = "–\xA0", gg = "+\xA0", _g = " \xA0", vg = typeof console < "u" && typeof console.timeStamp == "function" && typeof performance < "u" && typeof performance.measure == "function", yg = "Components ⚛", bg = "Scheduler ⚛", xg = "Blocking", Sg = !1, Cg = {
			color: "primary",
			properties: null,
			tooltipText: "",
			track: yg
		}, wg = {
			start: -0,
			end: -0,
			detail: { devtools: Cg }
		}, Tg = ["Changed Props", ""], Eg = "This component received deeply equal props. It might benefit from useMemo or the React Compiler in its owner.", Dg = ["Changed Props", Eg], Og = 1, kg = 2, Ag = [], jg = 0, Mg = 0, Ng = {};
		Object.freeze(Ng);
		var Pg = null, Fg = null, G = 0, Ig = 1, K = 2, Lg = 8, Rg = 16, zg = 32, Bg = !1;
		try {
			var Vg = Object.preventExtensions({});
			new Map([[Vg, null]]), new Set([Vg]);
		} catch {
			Bg = !0;
		}
		var Hg = /* @__PURE__ */ new WeakMap(), Ug = [], Wg = 0, Gg = null, Kg = 0, qg = [], Jg = 0, Yg = null, Xg = 1, Zg = "", Qg = null, $g = null, e_ = !1, t_ = !1, n_ = null, r_ = null, i_ = !1, a_ = Error("Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), o_ = oe(null), s_ = oe(null), c_ = {}, l_ = null, u_ = null, d_ = !1, f_ = typeof AbortController < "u" ? AbortController : function() {
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
		}, p_ = wf.unstable_scheduleCallback, m_ = wf.unstable_NormalPriority, h_ = {
			$$typeof: Pf,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0,
			_currentRenderer: null,
			_currentRenderer2: null
		}, g_ = wf.unstable_now, __ = console.createTask ? console.createTask : function() {
			return null;
		}, v_ = 1, y_ = 2, b_ = -0, x_ = -0, S_ = -0, C_ = null, w_ = -1.1, T_ = -0, E_ = -0, q = -1.1, J = -1.1, D_ = null, O_ = !1, k_ = -0, A_ = -1.1, j_ = null, M_ = 0, N_ = null, P_ = null, F_ = -1.1, I_ = null, L_ = -1.1, R_ = -1.1, z_ = -0, B_ = -1.1, V_ = -1.1, H_ = 0, U_ = null, W_ = null, G_ = null, K_ = -1.1, q_ = null, J_ = -1.1, Y_ = -1.1, X_ = -0, Z_ = -0, Q_ = 0, $_ = null, ev = 0, tv = -1.1, nv = !1, rv = !1, iv = null, av = 0, ov = 0, sv = null, cv = W.S;
		W.S = function(e, t) {
			if (vx = yp(), typeof t == "object" && t && typeof t.then == "function") {
				if (0 > B_ && 0 > V_) {
					B_ = g_();
					var n = Uu(), r = Hu();
					(n !== J_ || r !== q_) && (J_ = -1.1), K_ = n, q_ = r;
				}
				Oi(e, t);
			}
			cv !== null && cv(e, t);
		};
		var lv = oe(null), uv = {
			recordUnsafeLifecycleWarnings: function() {},
			flushPendingUnsafeLifecycleWarnings: function() {},
			recordLegacyContextWarning: function() {},
			flushLegacyContextWarning: function() {},
			discardPendingWarnings: function() {}
		}, dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], _v = /* @__PURE__ */ new Set();
		uv.recordUnsafeLifecycleWarnings = function(e, t) {
			_v.has(e.type) || (typeof t.componentWillMount == "function" && !0 !== t.componentWillMount.__suppressDeprecationWarning && dv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillMount == "function" && fv.push(e), typeof t.componentWillReceiveProps == "function" && !0 !== t.componentWillReceiveProps.__suppressDeprecationWarning && pv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillReceiveProps == "function" && mv.push(e), typeof t.componentWillUpdate == "function" && !0 !== t.componentWillUpdate.__suppressDeprecationWarning && hv.push(e), e.mode & Lg && typeof t.UNSAFE_componentWillUpdate == "function" && gv.push(e));
		}, uv.flushPendingUnsafeLifecycleWarnings = function() {
			var e = /* @__PURE__ */ new Set();
			0 < dv.length && (dv.forEach(function(t) {
				e.add(w(t) || "Component"), _v.add(t.type);
			}), dv = []);
			var t = /* @__PURE__ */ new Set();
			0 < fv.length && (fv.forEach(function(e) {
				t.add(w(e) || "Component"), _v.add(e.type);
			}), fv = []);
			var n = /* @__PURE__ */ new Set();
			0 < pv.length && (pv.forEach(function(e) {
				n.add(w(e) || "Component"), _v.add(e.type);
			}), pv = []);
			var r = /* @__PURE__ */ new Set();
			0 < mv.length && (mv.forEach(function(e) {
				r.add(w(e) || "Component"), _v.add(e.type);
			}), mv = []);
			var i = /* @__PURE__ */ new Set();
			0 < hv.length && (hv.forEach(function(e) {
				i.add(w(e) || "Component"), _v.add(e.type);
			}), hv = []);
			var a = /* @__PURE__ */ new Set();
			if (0 < gv.length && (gv.forEach(function(e) {
				a.add(w(e) || "Component"), _v.add(e.type);
			}), gv = []), 0 < t.size) {
				var o = p(t);
				console.error("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s", o);
			}
			0 < r.size && (o = p(r), console.error("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s", o)), 0 < a.size && (o = p(a), console.error("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s", o)), 0 < e.size && (o = p(e), console.warn("componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < n.size && (o = p(n), console.warn("componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o)), 0 < i.size && (o = p(i), console.warn("componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s", o));
		};
		var vv = /* @__PURE__ */ new Map(), yv = /* @__PURE__ */ new Set();
		uv.recordLegacyContextWarning = function(e, t) {
			for (var n = null, r = e; r !== null;) r.mode & Lg && (n = r), r = r.return;
			n === null ? console.error("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.") : !yv.has(e.type) && (r = vv.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (r === void 0 && (r = [], vv.set(n, r)), r.push(e));
		}, uv.flushLegacyContextWarning = function() {
			vv.forEach(function(e) {
				if (e.length !== 0) {
					var t = e[0], n = /* @__PURE__ */ new Set();
					e.forEach(function(e) {
						n.add(w(e) || "Component"), yv.add(e.type);
					});
					var r = p(n);
					A(t, function() {
						console.error("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context", r);
					});
				}
			});
		}, uv.discardPendingWarnings = function() {
			dv = [], fv = [], pv = [], mv = [], hv = [], gv = [], vv = /* @__PURE__ */ new Map();
		};
		var bv = { react_stack_bottom_frame: function(e, t, n) {
			var r = pp;
			pp = !0;
			try {
				return e(t, n);
			} finally {
				pp = r;
			}
		} }, xv = bv.react_stack_bottom_frame.bind(bv), Sv = { react_stack_bottom_frame: function(e) {
			var t = pp;
			pp = !0;
			try {
				return e.render();
			} finally {
				pp = t;
			}
		} }, Cv = Sv.react_stack_bottom_frame.bind(Sv), wv = { react_stack_bottom_frame: function(e, t) {
			try {
				t.componentDidMount();
			} catch (t) {
				Nl(e, e.return, t);
			}
		} }, Tv = wv.react_stack_bottom_frame.bind(wv), Ev = { react_stack_bottom_frame: function(e, t, n, r, i) {
			try {
				t.componentDidUpdate(n, r, i);
			} catch (t) {
				Nl(e, e.return, t);
			}
		} }, Dv = Ev.react_stack_bottom_frame.bind(Ev), Ov = { react_stack_bottom_frame: function(e, t) {
			var n = t.stack;
			e.componentDidCatch(t.value, { componentStack: n === null ? "" : n });
		} }, kv = Ov.react_stack_bottom_frame.bind(Ov), Av = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n.componentWillUnmount();
			} catch (n) {
				Nl(e, t, n);
			}
		} }, jv = Av.react_stack_bottom_frame.bind(Av), Mv = { react_stack_bottom_frame: function(e) {
			var t = e.create;
			return e = e.inst, t = t(), e.destroy = t;
		} }, Nv = Mv.react_stack_bottom_frame.bind(Mv), Pv = { react_stack_bottom_frame: function(e, t, n) {
			try {
				n();
			} catch (n) {
				Nl(e, t, n);
			}
		} }, Fv = Pv.react_stack_bottom_frame.bind(Pv), Iv = { react_stack_bottom_frame: function(e) {
			var t = e._init;
			return t(e._payload);
		} }, Lv = Iv.react_stack_bottom_frame.bind(Iv), Rv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."), zv = Error("Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."), Bv = Error("Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."), Vv = { then: function() {
			console.error("Internal React error: A listener was unexpectedly attached to a \"noop\" thenable. This is a bug in React. Please file an issue.");
		} }, Hv = null, Uv = !1, Wv = null, Gv = 0, Y = null, Kv, qv = Kv = !1, Jv = {}, Yv = {}, Xv = {};
		f = function(e, t, n) {
			if (typeof n == "object" && n && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
				if (typeof n._store != "object") throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
				n._store.validated = 1;
				var r = w(e), i = r || "null";
				if (!Jv[i]) {
					Jv[i] = !0, n = n._owner, e = e._debugOwner;
					var a = "";
					e && typeof e.tag == "number" && (i = w(e)) && (a = "\n\nCheck the render method of `" + i + "`."), a || r && (a = "\n\nCheck the top-level render call using <" + r + ">.");
					var o = "";
					n != null && e !== n && (r = null, typeof n.tag == "number" ? r = w(n) : typeof n.name == "string" && (r = n.name), r && (o = " It was passed a child from " + r + ".")), A(t, function() {
						console.error("Each child in a list should have a unique \"key\" prop.%s%s See https://react.dev/link/warning-keys for more information.", a, o);
					});
				}
			}
		};
		var Zv = Xi(!0), Qv = Xi(!1), $v = 0, ey = 1, ty = 2, ny = 3, ry = !1, iy = !1, ay = null, oy = !1, sy = oe(null), cy = oe(0), ly = oe(null), uy = null, dy = 1, fy = 2, py = oe(0), my = 0, hy = 1, gy = 2, _y = 4, vy = 8, yy, by = /* @__PURE__ */ new Set(), xy = /* @__PURE__ */ new Set(), Sy = /* @__PURE__ */ new Set(), Cy = /* @__PURE__ */ new Set(), wy = 0, X = null, Ty = null, Ey = null, Dy = !1, Oy = !1, ky = !1, Ay = 0, jy = 0, My = null, Ny = 0, Py = 25, Z = null, Fy = null, Iy = -1, Ly = !1, Ry = {
			readContext: ri,
			use: ja,
			useCallback: ya,
			useContext: ya,
			useEffect: ya,
			useImperativeHandle: ya,
			useLayoutEffect: ya,
			useInsertionEffect: ya,
			useMemo: ya,
			useReducer: ya,
			useRef: ya,
			useState: ya,
			useDebugValue: ya,
			useDeferredValue: ya,
			useTransition: ya,
			useSyncExternalStore: ya,
			useId: ya,
			useHostTransitionStatus: ya,
			useFormState: ya,
			useActionState: ya,
			useOptimistic: ya,
			useMemoCache: ya,
			useCacheRefresh: ya
		};
		Ry.useEffectEvent = ya;
		var zy = null, By = null, Vy = null, Hy = null, Uy = null, Wy = null, Gy = null;
		zy = {
			readContext: function(e) {
				return ri(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", P(), _a(t), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", P(), ri(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", P(), _a(t), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", P(), _a(n), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", P(), _a(t), fo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", P(), _a(t), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", P(), _a(t);
				var n = W.H;
				W.H = Uy;
				try {
					return So(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", P();
				var r = W.H;
				W.H = Uy;
				try {
					return Pa(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", P(), uo(e);
			},
			useState: function(e) {
				Z = "useState", P();
				var t = W.H;
				W.H = Uy;
				try {
					return Ka(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", P();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", P(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", P(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", P(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", P(), Ro();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", P(), va(), io(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", P(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", P(), qa(e);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", P(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", P(), ho(e);
			}
		}, By = {
			readContext: function(e) {
				return ri(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ri(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", F(), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", F(), fo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = W.H;
				W.H = Uy;
				try {
					return So(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = W.H;
				W.H = Uy;
				try {
					return Pa(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", F(), uo(e);
			},
			useState: function(e) {
				Z = "useState", F();
				var t = W.H;
				W.H = Uy;
				try {
					return Ka(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), Ro();
			},
			useActionState: function(e, t) {
				return Z = "useActionState", F(), io(e, t);
			},
			useFormState: function(e, t) {
				return Z = "useFormState", F(), va(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", F(), qa(e);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), ho(e);
			}
		}, Vy = {
			readContext: function(e) {
				return ri(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ri(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", F(), po(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", F(), po(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), po(4, _y, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = W.H;
				W.H = Wy;
				try {
					return Co(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = W.H;
				W.H = Wy;
				try {
					return Fa(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", F(), I().memoizedState;
			},
			useState: function() {
				Z = "useState", F();
				var e = W.H;
				W.H = Wy;
				try {
					return Fa(Na);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), I().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", F(), va(), ao(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", F(), ao(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", F(), Ja(e, t);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), I().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), R(e);
			}
		}, Hy = {
			readContext: function(e) {
				return ri(e);
			},
			use: ja,
			useCallback: function(e, t) {
				return Z = "useCallback", F(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", F(), ri(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", F(), po(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", F(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", F(), po(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", F(), po(4, _y, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", F();
				var n = W.H;
				W.H = Gy;
				try {
					return Co(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", F();
				var r = W.H;
				W.H = Gy;
				try {
					return La(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", F(), I().memoizedState;
			},
			useState: function() {
				Z = "useState", F();
				var e = W.H;
				W.H = Gy;
				try {
					return La(Na);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", F(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", F(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", F(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", F(), I().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", F(), va(), co(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", F(), co(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", F(), Xa(e, t);
			},
			useHostTransitionStatus: Lo,
			useMemoCache: Ma,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), I().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", F(), R(e);
			}
		}, Uy = {
			readContext: function(e) {
				return l(), ri(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), P(), bo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), P(), ri(e);
			},
			useEffect: function(e, t) {
				return Z = "useEffect", c(), P(), mo(e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), P(), vo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				Z = "useInsertionEffect", c(), P(), fo(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), P(), go(e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), P();
				var n = W.H;
				W.H = Uy;
				try {
					return So(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), P();
				var r = W.H;
				W.H = Uy;
				try {
					return Pa(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function(e) {
				return Z = "useRef", c(), P(), uo(e);
			},
			useState: function(e) {
				Z = "useState", c(), P();
				var t = W.H;
				W.H = Uy;
				try {
					return Ka(e);
				} finally {
					W.H = t;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), P();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), P(), wo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), P(), Po();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), P(), Ra(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), P(), Ro();
			},
			useFormState: function(e, t) {
				return Z = "useFormState", c(), P(), io(e, t);
			},
			useActionState: function(e, t) {
				return Z = "useActionState", c(), P(), io(e, t);
			},
			useOptimistic: function(e) {
				return Z = "useOptimistic", c(), P(), qa(e);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", P(), zo();
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), P(), ho(e);
			}
		}, Wy = {
			readContext: function(e) {
				return l(), ri(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), F(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), F(), ri(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), F(), po(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), F(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), F(), po(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), F(), po(4, _y, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), F();
				var n = W.H;
				W.H = Wy;
				try {
					return Co(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), F();
				var r = W.H;
				W.H = Wy;
				try {
					return Fa(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), F(), I().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), F();
				var e = W.H;
				W.H = Wy;
				try {
					return Fa(Na);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), F(), To(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), F(), Fo();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), F(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), F(), I().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), F(), ao(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), F(), ao(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), F(), Ja(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), I().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), F(), R(e);
			}
		}, Gy = {
			readContext: function(e) {
				return l(), ri(e);
			},
			use: function(e) {
				return c(), ja(e);
			},
			useCallback: function(e, t) {
				return Z = "useCallback", c(), F(), xo(e, t);
			},
			useContext: function(e) {
				return Z = "useContext", c(), F(), ri(e);
			},
			useEffect: function(e, t) {
				Z = "useEffect", c(), F(), po(2048, vy, e, t);
			},
			useImperativeHandle: function(e, t, n) {
				return Z = "useImperativeHandle", c(), F(), yo(e, t, n);
			},
			useInsertionEffect: function(e, t) {
				return Z = "useInsertionEffect", c(), F(), po(4, gy, e, t);
			},
			useLayoutEffect: function(e, t) {
				return Z = "useLayoutEffect", c(), F(), po(4, _y, e, t);
			},
			useMemo: function(e, t) {
				Z = "useMemo", c(), F();
				var n = W.H;
				W.H = Wy;
				try {
					return Co(e, t);
				} finally {
					W.H = n;
				}
			},
			useReducer: function(e, t, n) {
				Z = "useReducer", c(), F();
				var r = W.H;
				W.H = Wy;
				try {
					return La(e, t, n);
				} finally {
					W.H = r;
				}
			},
			useRef: function() {
				return Z = "useRef", c(), F(), I().memoizedState;
			},
			useState: function() {
				Z = "useState", c(), F();
				var e = W.H;
				W.H = Wy;
				try {
					return La(Na);
				} finally {
					W.H = e;
				}
			},
			useDebugValue: function() {
				Z = "useDebugValue", c(), F();
			},
			useDeferredValue: function(e, t) {
				return Z = "useDeferredValue", c(), F(), Eo(e, t);
			},
			useTransition: function() {
				return Z = "useTransition", c(), F(), Io();
			},
			useSyncExternalStore: function(e, t, n) {
				return Z = "useSyncExternalStore", c(), F(), za(e, t, n);
			},
			useId: function() {
				return Z = "useId", c(), F(), I().memoizedState;
			},
			useFormState: function(e) {
				return Z = "useFormState", c(), F(), co(e);
			},
			useActionState: function(e) {
				return Z = "useActionState", c(), F(), co(e);
			},
			useOptimistic: function(e, t) {
				return Z = "useOptimistic", c(), F(), Xa(e, t);
			},
			useMemoCache: function(e) {
				return c(), Ma(e);
			},
			useHostTransitionStatus: Lo,
			useCacheRefresh: function() {
				return Z = "useCacheRefresh", F(), I().memoizedState;
			},
			useEffectEvent: function(e) {
				return Z = "useEffectEvent", c(), F(), R(e);
			}
		};
		var Ky = {}, qy = /* @__PURE__ */ new Set(), Jy = /* @__PURE__ */ new Set(), Yy = /* @__PURE__ */ new Set(), Xy = /* @__PURE__ */ new Set(), Zy = /* @__PURE__ */ new Set(), Qy = /* @__PURE__ */ new Set(), $y = /* @__PURE__ */ new Set(), eb = /* @__PURE__ */ new Set(), tb = /* @__PURE__ */ new Set(), nb = /* @__PURE__ */ new Set();
		Object.freeze(Ky);
		var rb = {
			enqueueSetState: function(e, t, n) {
				e = e._reactInternals;
				var r = Zc(e), i = ea(r);
				i.payload = t, n != null && (qo(n), i.callback = n), t = ta(e, i, r), t !== null && (li(r, "this.setState()", e), $c(t, e, r), na(t, e, r));
			},
			enqueueReplaceState: function(e, t, n) {
				e = e._reactInternals;
				var r = Zc(e), i = ea(r);
				i.tag = ey, i.payload = t, n != null && (qo(n), i.callback = n), t = ta(e, i, r), t !== null && (li(r, "this.replaceState()", e), $c(t, e, r), na(t, e, r));
			},
			enqueueForceUpdate: function(e, t) {
				e = e._reactInternals;
				var n = Zc(e), r = ea(n);
				r.tag = ty, t != null && (qo(t), r.callback = t), t = ta(e, r, n), t !== null && (li(n, "this.forceUpdate()", e), $c(t, e, n), na(t, e, n));
			}
		}, ib = null, ab = null, ob = Error("This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."), sb = !1, cb = {}, lb = {}, ub = {}, db = {}, fb = !1, pb = {}, mb = {}, hb = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		}, gb = !1, _b = null;
		_b = /* @__PURE__ */ new Set();
		var vb = !1, yb = !1, bb = !1, xb = typeof WeakSet == "function" ? WeakSet : Set, Sb = null, Cb = null, wb = null, Tb = null, Eb = !1, Db = null, Ob = !1, kb = 8192, Ab = {
			getCacheForType: function(e) {
				var t = ri(h_), n = t.data.get(e);
				return n === void 0 && (n = e(), t.data.set(e, n)), n;
			},
			cacheSignal: function() {
				return ri(h_).controller.signal;
			},
			getOwner: function() {
				return fp;
			}
		};
		if (typeof Symbol == "function" && Symbol.for) {
			var jb = Symbol.for;
			jb("selector.component"), jb("selector.has_pseudo_class"), jb("selector.role"), jb("selector.test_id"), jb("selector.text");
		}
		var Mb = [], Nb = typeof WeakMap == "function" ? WeakMap : Map, Pb = 0, Fb = 2, Ib = 4, Lb = 0, Rb = 1, zb = 2, Bb = 3, Vb = 4, Hb = 6, Ub = 5, Wb = Pb, Gb = null, Q = null, $ = 0, Kb = 0, qb = 1, Jb = 2, Yb = 3, Xb = 4, Zb = 5, Qb = 6, $b = 7, ex = 8, tx = 9, nx = Kb, rx = null, ix = !1, ax = !1, ox = !1, sx = 0, cx = Lb, lx = 0, ux = 0, dx = 0, fx = 0, px = 0, mx = null, hx = null, gx = !1, _x = 0, vx = 0, yx = 300, bx = Infinity, xx = 500, Sx = null, Cx = null, wx = null, Tx = 0, Ex = 1, Dx = 2, Ox = 3, kx = 0, Ax = 1, jx = 2, Mx = 3, Nx = 4, Px = 5, Fx = 0, Ix = null, Lx = null, Rx = 0, zx = 0, Bx = -0, Vx = null, Hx = null, Ux = null, Wx = Tx, Gx = null, Kx = 50, qx = 0, Jx = null, Yx = !1, Xx = !1, Zx = 50, Qx = 0, $x = null, eS = !1, tS = null, nS = !1, rS = /* @__PURE__ */ new Set(), iS = {}, aS = null, oS = null, sS = !1, cS = !1, lS = !1, uS = !1, dS = 0, fS = {};
		(function() {
			for (var e = 0; e < ig.length; e++) {
				var t = ig[e], n = t.toLowerCase();
				t = t[0].toUpperCase() + t.slice(1), Wn(n, "on" + t);
			}
			Wn(Xh, "onAnimationEnd"), Wn(Zh, "onAnimationIteration"), Wn(Qh, "onAnimationStart"), Wn("dblclick", "onDoubleClick"), Wn("focusin", "onFocus"), Wn("focusout", "onBlur"), Wn($h, "onTransitionRun"), Wn(eg, "onTransitionStart"), Wn(tg, "onTransitionCancel"), Wn(ng, "onTransitionEnd");
		})(), et("onMouseEnter", ["mouseout", "mouseover"]), et("onMouseLeave", ["mouseout", "mouseover"]), et("onPointerEnter", ["pointerout", "pointerover"]), et("onPointerLeave", ["pointerout", "pointerover"]), $e("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), $e("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), $e("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]), $e("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), $e("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), $e("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var pS = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mS = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pS)), hS = "_reactListening" + Math.random().toString(36).slice(2), gS = !1, _S = !1, vS = !1, yS = !1, bS = !1, xS = !1, SS = !1, CS = {}, wS = /\r\n?/g, TS = /\u0000|\uFFFD/g, ES = "http://www.w3.org/1999/xlink", DS = "http://www.w3.org/XML/1998/namespace", OS = "javascript:throw new Error('React form unexpectedly submitted.')", kS = "suppressHydrationWarning", AS = "&", jS = "/&", MS = "$", NS = "/$", PS = "$?", FS = "$~", IS = "$!", LS = "html", RS = "body", zS = "head", BS = "F!", VS = "F", HS = "loading", US = "style", WS = 0, GS = 1, KS = 2, qS = null, JS = null, YS = {
			dialog: !0,
			webview: !0
		}, XS = null, ZS = void 0, QS = typeof setTimeout == "function" ? setTimeout : void 0, $S = typeof clearTimeout == "function" ? clearTimeout : void 0, eC = -1, tC = typeof Promise == "function" ? Promise : void 0, nC = typeof queueMicrotask == "function" ? queueMicrotask : tC === void 0 ? QS : function(e) {
			return tC.resolve(null).then(e).catch(Wu);
		}, rC = null, iC = 0, aC = 1, oC = 2, sC = 3, cC = 4, lC = /* @__PURE__ */ new Map(), uC = /* @__PURE__ */ new Set(), dC = Gf.d;
		Gf.d = {
			f: function() {
				var e = dC.f(), t = il();
				return e || t;
			},
			r: function(e) {
				var t = Ye(e);
				t !== null && t.tag === 5 && t.type === "form" ? No(t) : dC.r(e);
			},
			D: function(e) {
				dC.D(e), Dd("dns-prefetch", e, null);
			},
			C: function(e, t) {
				dC.C(e, t), Dd("preconnect", e, t);
			},
			L: function(e, t, n) {
				dC.L(e, t, n);
				var r = fC;
				if (r && e && t) {
					var i = "link[rel=\"preload\"][as=\"" + pt(t) + "\"]";
					t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + pt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + pt(n.imageSizes) + "\"]")) : i += "[href=\"" + pt(e) + "\"]";
					var a = i;
					switch (t) {
						case "style":
							a = H(e);
							break;
						case "script": a = Nd(e);
					}
					lC.has(a) || (e = U({
						rel: "preload",
						href: t === "image" && n && n.imageSrcSet ? void 0 : e,
						as: t
					}, n), lC.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Ad(a)) || t === "script" && r.querySelector(Pd(a)) || (t = r.createElement("link"), Cu(t, "link", e), Qe(t), r.head.appendChild(t)));
				}
			},
			m: function(e, t) {
				dC.m(e, t);
				var n = fC;
				if (n && e) {
					var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + pt(r) + "\"][href=\"" + pt(e) + "\"]", a = i;
					switch (r) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": a = Nd(e);
					}
					if (!lC.has(a) && (e = U({
						rel: "modulepreload",
						href: e
					}, t), lC.set(a, e), n.querySelector(i) === null)) {
						switch (r) {
							case "audioworklet":
							case "paintworklet":
							case "serviceworker":
							case "sharedworker":
							case "worker":
							case "script": if (n.querySelector(Pd(a))) return;
						}
						r = n.createElement("link"), Cu(r, "link", e), Qe(r), n.head.appendChild(r);
					}
				}
			},
			X: function(e, t) {
				dC.X(e, t);
				var n = fC;
				if (n && e) {
					var r = Ze(n).hoistableScripts, i = Nd(e), a = r.get(i);
					a || (a = n.querySelector(Pd(i)), a || (e = U({
						src: e,
						async: !0
					}, t), (t = lC.get(i)) && Rd(e, t), a = n.createElement("script"), Qe(a), Cu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			},
			S: function(e, t, n) {
				dC.S(e, t, n);
				var r = fC;
				if (r && e) {
					var i = Ze(r).hoistableStyles, a = H(e);
					t ||= "default";
					var o = i.get(a);
					if (!o) {
						var s = {
							loading: iC,
							preload: null
						};
						if (o = r.querySelector(Ad(a))) s.loading = aC | cC;
						else {
							e = U({
								rel: "stylesheet",
								href: e,
								"data-precedence": t
							}, n), (n = lC.get(a)) && Ld(e, n);
							var c = o = r.createElement("link");
							Qe(c), Cu(c, "link", e), c._p = new Promise(function(e, t) {
								c.onload = e, c.onerror = t;
							}), c.addEventListener("load", function() {
								s.loading |= aC;
							}), c.addEventListener("error", function() {
								s.loading |= oC;
							}), s.loading |= cC, Id(o, t, r);
						}
						o = {
							type: "stylesheet",
							instance: o,
							count: 1,
							state: s
						}, i.set(a, o);
					}
				}
			},
			M: function(e, t) {
				dC.M(e, t);
				var n = fC;
				if (n && e) {
					var r = Ze(n).hoistableScripts, i = Nd(e), a = r.get(i);
					a || (a = n.querySelector(Pd(i)), a || (e = U({
						src: e,
						async: !0,
						type: "module"
					}, t), (t = lC.get(i)) && Rd(e, t), a = n.createElement("script"), Qe(a), Cu(a, "link", e), n.head.appendChild(a)), a = {
						type: "script",
						instance: a,
						count: 1,
						state: null
					}, r.set(i, a));
				}
			}
		};
		var fC = typeof document > "u" ? null : document, pC = null, mC = 6e4, hC = 800, gC = 500, _C = 0, vC = null, yC = null, bC = Kf, xC = {
			$$typeof: Pf,
			Provider: null,
			Consumer: null,
			_currentValue: bC,
			_currentValue2: bC,
			_threadCount: 0
		}, SC = "%c%s%c", CC = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", wC = "", TC = " ", EC = Function.prototype.bind, DC = !1, OC = null, kC = null, AC = null, jC = null, MC = null, NC = null, PC = null, FC = null, IC = null, LC = null;
		OC = function(e, r, i, a) {
			r = t(e, r), r !== null && (i = n(r.memoizedState, i, 0, a), r.memoizedState = i, r.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = fr(e, 2), i !== null && $c(i, e, 2));
		}, kC = function(e, n, r) {
			n = t(e, n), n !== null && (r = a(n.memoizedState, r, 0), n.memoizedState = r, n.baseState = r, e.memoizedProps = U({}, e.memoizedProps), r = fr(e, 2), r !== null && $c(r, e, 2));
		}, AC = function(e, n, i, a) {
			n = t(e, n), n !== null && (i = r(n.memoizedState, i, a), n.memoizedState = i, n.baseState = i, e.memoizedProps = U({}, e.memoizedProps), i = fr(e, 2), i !== null && $c(i, e, 2));
		}, jC = function(e, t, r) {
			e.pendingProps = n(e.memoizedProps, t, 0, r), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = fr(e, 2), t !== null && $c(t, e, 2);
		}, MC = function(e, t) {
			e.pendingProps = a(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = fr(e, 2), t !== null && $c(t, e, 2);
		}, NC = function(e, t, n) {
			e.pendingProps = r(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = fr(e, 2), t !== null && $c(t, e, 2);
		}, PC = function(e) {
			var t = fr(e, 2);
			t !== null && $c(t, e, 2);
		}, FC = function(e) {
			var t = Pe(), n = fr(e, t);
			n !== null && $c(n, e, t);
		}, IC = function(e) {
			s = e;
		}, LC = function(e) {
			o = e;
		};
		var RC = !0, zC = null, BC = !1, VC = null, HC = null, UC = null, WC = /* @__PURE__ */ new Map(), GC = /* @__PURE__ */ new Map(), KC = [], qC = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" "), JC = null;
		if (Sf.prototype.render = xf.prototype.render = function(e) {
			var t = this._internalRoot;
			if (t === null) throw Error("Cannot update an unmounted root.");
			var n = arguments;
			typeof n[1] == "function" ? console.error("does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : b(n[1]) ? console.error("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : n[1] !== void 0 && console.error("You passed a second argument to root.render(...) but it only accepts one argument."), n = e;
			var r = t.current;
			Zd(r, Zc(r), n, t, null, null);
		}, Sf.prototype.unmount = xf.prototype.unmount = function() {
			var e = arguments;
			if (typeof e[0] == "function" && console.error("does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."), e = this._internalRoot, e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				(Wb & (Fb | Ib)) !== Pb && console.error("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Zd(e.current, 2, null, e, null, null), il(), t[Gp] = null;
			}
		}, Sf.prototype.unstable_scheduleHydration = function(e) {
			if (e) {
				var t = Ge();
				e = {
					blockedOn: null,
					target: e,
					priority: t
				};
				for (var n = 0; n < KC.length && t !== 0 && t < KC[n].priority; n++);
				KC.splice(n, 0, e), n === 0 && pf(e);
			}
		}, (function() {
			var e = Tf.version;
			if (e !== "19.2.4") throw Error("Incompatible React versions: The \"react\" and \"react-dom\" packages must have the exact same version. Instead got:\n  - react:      " + (e + "\n  - react-dom:  19.2.4\nLearn more: https://react.dev/warnings/version-mismatch"));
		})(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"), Gf.findDOMNode = function(e) {
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error("Argument appears to not be a ReactComponent. Keys: " + e));
			return e = ne(t), e = e === null ? null : re(e), e = e === null ? null : e.stateNode, e;
		}, !(function() {
			var e = {
				bundleType: 1,
				version: "19.2.4",
				rendererPackageName: "react-dom",
				currentDispatcherRef: W,
				reconcilerVersion: "19.2.4"
			};
			return e.overrideHookState = OC, e.overrideHookStateDeletePath = kC, e.overrideHookStateRenamePath = AC, e.overrideProps = jC, e.overridePropsDeletePath = MC, e.overridePropsRenamePath = NC, e.scheduleUpdate = PC, e.scheduleRetry = FC, e.setErrorHandler = IC, e.setSuspenseHandler = LC, e.scheduleRefresh = v, e.scheduleRoot = g, e.setRefreshHandler = y, e.getCurrentFiber = nf, De(e);
		})() && Zm && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
			var YC = window.location.protocol;
			/^(https?|file):$/.test(YC) && console.info("%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (YC === "file:" ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""), "font-weight:bold");
		}
		e.createRoot = function(e, t) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Cf(e);
			var n = !1, r = "", i = Qo, a = $o, o = es;
			return t != null && (t.hydrate ? console.warn("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t && t.$$typeof === Of && console.error("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"), !0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Yd(e, 1, !1, null, null, n, r, null, i, a, o, bf), e[Gp] = t.current, su(e), new xf(t);
		}, e.hydrateRoot = function(e, t, n) {
			if (!b(e)) throw Error("Target container is not a DOM element.");
			Cf(e), t === void 0 && console.error("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
			var r = !1, i = "", a = Qo, o = $o, s = es, c = null;
			return n != null && (!0 === n.unstable_strictMode && (r = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onUncaughtError !== void 0 && (a = n.onUncaughtError), n.onCaughtError !== void 0 && (o = n.onCaughtError), n.onRecoverableError !== void 0 && (s = n.onRecoverableError), n.formState !== void 0 && (c = n.formState)), t = Yd(e, 1, !0, t, n ?? null, r, i, c, a, o, s, bf), t.context = Xd(null), n = t.current, r = Zc(n), r = Ve(r), i = ea(r), i.callback = null, ta(n, i, r), li(r, "hydrateRoot()", null), n = r, t.current.lanes = n, Ie(t, n), Kl(t), e[Gp] = t.current, su(e), new Sf(t);
		}, e.version = "19.2.4", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), b = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
			if (process.env.NODE_ENV !== "production") throw Error("^_^");
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
			} catch (e) {
				console.error(e);
			}
		}
	}
	process.env.NODE_ENV === "production" ? (n(), t.exports = v()) : t.exports = y();
}));
Object.freeze({ status: "aborted" });
function x(e, t, n) {
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
var ee = class extends Error {
	constructor() {
		super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
	}
}, te = class extends Error {
	constructor(e) {
		super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
	}
}, S = {};
function ne(e) {
	return e && Object.assign(S, e), S;
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/util.js
function re(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function ie(e, t) {
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
function ae(e) {
	return e == null;
}
function w(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function oe(e, t) {
	let n = (e.toString().split(".")[1] || "").length, r = t.toString(), i = (r.split(".")[1] || "").length;
	if (i === 0 && /\d?e-\d?/.test(r)) {
		let e = r.match(/\d?e-(\d?)/);
		e?.[1] && (i = Number.parseInt(e[1]));
	}
	let a = n > i ? n : i;
	return Number.parseInt(e.toFixed(a).replace(".", "")) % Number.parseInt(t.toFixed(a).replace(".", "")) / 10 ** a;
}
var se = Symbol("evaluating");
function T(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== se) return r === void 0 && (r = se, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function ce(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function le(...e) {
	let t = {};
	for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
	return Object.defineProperties({}, t);
}
function E(e) {
	return JSON.stringify(e);
}
function D(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
var ue = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {};
function de(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
var O = C(() => {
	if (typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
	try {
		return Function(""), !0;
	} catch {
		return !1;
	}
});
function fe(e) {
	if (de(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return !(de(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function pe(e) {
	return fe(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
var me = new Set([
	"string",
	"number",
	"symbol"
]);
function he(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ge(e, t, n) {
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
function _e(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
var ve = {
	safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
	int32: [-2147483648, 2147483647],
	uint32: [0, 4294967295],
	float32: [-34028234663852886e22, 34028234663852886e22],
	float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function ye(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return ge(e, le(e._zod.def, {
		get shape() {
			let e = {};
			for (let r in t) {
				if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
				t[r] && (e[r] = n.shape[r]);
			}
			return ce(this, "shape", e), e;
		},
		checks: []
	}));
}
function be(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return ge(e, le(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e in t) {
				if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
				t[e] && delete r[e];
			}
			return ce(this, "shape", r), r;
		},
		checks: []
	}));
}
function A(e, t) {
	if (!fe(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e in t) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return ge(e, le(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ce(this, "shape", n), n;
	} }));
}
function xe(e, t) {
	if (!fe(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return ge(e, le(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return ce(this, "shape", n), n;
	} }));
}
function Se(e, t) {
	return ge(e, le(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return ce(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: []
	}));
}
function Ce(e, t, n) {
	let r = t._zod.def.checks;
	if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
	return ge(t, le(t._zod.def, {
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
			return ce(this, "shape", i), i;
		},
		checks: []
	}));
}
function we(e, t, n) {
	return ge(t, le(t._zod.def, { get shape() {
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
		return ce(this, "shape", i), i;
	} }));
}
function j(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function Te(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Ee(e) {
	return typeof e == "string" ? e : e?.message;
}
function De(e, t, n) {
	let r = {
		...e,
		path: e.path ?? []
	};
	return e.message || (r.message = Ee(e.inst?._zod.def?.error?.(e)) ?? Ee(t?.error?.(e)) ?? Ee(n.customError?.(e)) ?? Ee(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
function Oe(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function ke(...e) {
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
var Ae = (e, t) => {
	e.name = "$ZodError", Object.defineProperty(e, "_zod", {
		value: e._zod,
		enumerable: !1
	}), Object.defineProperty(e, "issues", {
		value: t,
		enumerable: !1
	}), e.message = JSON.stringify(t, ie, 2), Object.defineProperty(e, "toString", {
		value: () => e.message,
		enumerable: !1
	});
}, je = x("$ZodError", Ae), Me = x("$ZodError", Ae, { Parent: Error });
function Ne(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? (n[i.path[0]] = n[i.path[0]] || [], n[i.path[0]].push(t(i))) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function Pe(e, t = (e) => e.message) {
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
var Fe = (e) => (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !1 }) : { async: !1 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise) throw new ee();
	if (o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => De(e, a, ne())));
		throw ue(t, i?.callee), t;
	}
	return o.value;
}, Ie = (e) => async (t, n, r, i) => {
	let a = r ? Object.assign(r, { async: !0 }) : { async: !0 }, o = t._zod.run({
		value: n,
		issues: []
	}, a);
	if (o instanceof Promise && (o = await o), o.issues.length) {
		let t = new (i?.Err ?? e)(o.issues.map((e) => De(e, a, ne())));
		throw ue(t, i?.callee), t;
	}
	return o.value;
}, Le = (e) => (t, n, r) => {
	let i = r ? {
		...r,
		async: !1
	} : { async: !1 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	if (a instanceof Promise) throw new ee();
	return a.issues.length ? {
		success: !1,
		error: new (e ?? je)(a.issues.map((e) => De(e, i, ne())))
	} : {
		success: !0,
		data: a.value
	};
}, Re = /* @__PURE__ */ Le(Me), ze = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { async: !0 }) : { async: !0 }, a = t._zod.run({
		value: n,
		issues: []
	}, i);
	return a instanceof Promise && (a = await a), a.issues.length ? {
		success: !1,
		error: new e(a.issues.map((e) => De(e, i, ne())))
	} : {
		success: !0,
		data: a.value
	};
}, Be = /* @__PURE__ */ ze(Me), Ve = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Fe(e)(t, n, i);
}, He = (e) => (t, n, r) => Fe(e)(t, n, r), Ue = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Ie(e)(t, n, i);
}, We = (e) => async (t, n, r) => Ie(e)(t, n, r), Ge = (e) => (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return Le(e)(t, n, i);
}, Ke = (e) => (t, n, r) => Le(e)(t, n, r), qe = (e) => async (t, n, r) => {
	let i = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
	return ze(e)(t, n, i);
}, Je = (e) => async (t, n, r) => ze(e)(t, n, r), Ye = /^[cC][^\s-]{8,}$/, Xe = /^[0-9a-z]+$/, Ze = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Qe = /^[0-9a-vA-V]{20}$/, $e = /^[A-Za-z0-9]{27}$/, et = /^[a-zA-Z0-9_-]{21}$/, tt = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, nt = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, rt = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, it = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, at = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function ot() {
	return new RegExp(at, "u");
}
var st = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, ct = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, lt = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ut = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, dt = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ft = /^[A-Za-z0-9_-]*$/, pt = /^\+[1-9]\d{6,14}$/, mt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ht = /* @__PURE__ */ RegExp(`^${mt}$`);
function gt(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function _t(e) {
	return RegExp(`^${gt(e)}$`);
}
function vt(e) {
	let t = gt({ precision: e.precision }), n = ["Z"];
	e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let r = `${t}(?:${n.join("|")})`;
	return RegExp(`^${mt}T(?:${r})$`);
}
var yt = (e) => {
	let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
	return RegExp(`^${t}$`);
}, bt = /^-?\d+$/, xt = /^-?\d+(?:\.\d+)?$/, St = /^(?:true|false)$/i, Ct = /^[^A-Z]*$/, wt = /^[^a-z]*$/, Tt = /* @__PURE__ */ x("$ZodCheck", (e, t) => {
	var n;
	e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Et = {
	number: "number",
	bigint: "bigint",
	object: "date"
}, Dt = /* @__PURE__ */ x("$ZodCheckLessThan", (e, t) => {
	Tt.init(e, t);
	let n = Et[typeof t.value];
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
}), Ot = /* @__PURE__ */ x("$ZodCheckGreaterThan", (e, t) => {
	Tt.init(e, t);
	let n = Et[typeof t.value];
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
}), kt = /* @__PURE__ */ x("$ZodCheckMultipleOf", (e, t) => {
	Tt.init(e, t), e._zod.onattach.push((e) => {
		var n;
		(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
	}), e._zod.check = (n) => {
		if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
		(typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : oe(n.value, t.value) === 0) || n.issues.push({
			origin: typeof n.value,
			code: "not_multiple_of",
			divisor: t.value,
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), At = /* @__PURE__ */ x("$ZodCheckNumberFormat", (e, t) => {
	Tt.init(e, t), t.format = t.format || "float64";
	let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = ve[t.format];
	e._zod.onattach.push((e) => {
		let r = e._zod.bag;
		r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = bt);
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
}), jt = /* @__PURE__ */ x("$ZodCheckMaxLength", (e, t) => {
	var n;
	Tt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ae(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.maximum ?? Infinity;
		t.maximum < n && (e._zod.bag.maximum = t.maximum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length <= t.maximum) return;
		let i = Oe(r);
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
}), Mt = /* @__PURE__ */ x("$ZodCheckMinLength", (e, t) => {
	var n;
	Tt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ae(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag.minimum ?? -Infinity;
		t.minimum > n && (e._zod.bag.minimum = t.minimum);
	}), e._zod.check = (n) => {
		let r = n.value;
		if (r.length >= t.minimum) return;
		let i = Oe(r);
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
}), Nt = /* @__PURE__ */ x("$ZodCheckLengthEquals", (e, t) => {
	var n;
	Tt.init(e, t), (n = e._zod.def).when ?? (n.when = (e) => {
		let t = e.value;
		return !ae(t) && t.length !== void 0;
	}), e._zod.onattach.push((e) => {
		let n = e._zod.bag;
		n.minimum = t.length, n.maximum = t.length, n.length = t.length;
	}), e._zod.check = (n) => {
		let r = n.value, i = r.length;
		if (i === t.length) return;
		let a = Oe(r), o = i > t.length;
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
}), Pt = /* @__PURE__ */ x("$ZodCheckStringFormat", (e, t) => {
	var n, r;
	Tt.init(e, t), e._zod.onattach.push((e) => {
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
}), Ft = /* @__PURE__ */ x("$ZodCheckRegex", (e, t) => {
	Pt.init(e, t), e._zod.check = (n) => {
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
}), It = /* @__PURE__ */ x("$ZodCheckLowerCase", (e, t) => {
	t.pattern ??= Ct, Pt.init(e, t);
}), Lt = /* @__PURE__ */ x("$ZodCheckUpperCase", (e, t) => {
	t.pattern ??= wt, Pt.init(e, t);
}), Rt = /* @__PURE__ */ x("$ZodCheckIncludes", (e, t) => {
	Tt.init(e, t);
	let n = he(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
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
}), zt = /* @__PURE__ */ x("$ZodCheckStartsWith", (e, t) => {
	Tt.init(e, t);
	let n = RegExp(`^${he(t.prefix)}.*`);
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
}), Bt = /* @__PURE__ */ x("$ZodCheckEndsWith", (e, t) => {
	Tt.init(e, t);
	let n = RegExp(`.*${he(t.suffix)}$`);
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
}), Vt = /* @__PURE__ */ x("$ZodCheckOverwrite", (e, t) => {
	Tt.init(e, t), e._zod.check = (e) => {
		e.value = t.tx(e.value);
	};
}), Ht = class {
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
}, Ut = {
	major: 4,
	minor: 3,
	patch: 5
}, Wt = /* @__PURE__ */ x("$ZodType", (e, t) => {
	var n;
	e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Ut;
	let r = [...e._zod.def.checks ?? []];
	e._zod.traits.has("$ZodCheck") && r.unshift(e);
	for (let t of r) for (let n of t._zod.onattach) n(e);
	if (r.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
		e._zod.run = e._zod.parse;
	});
	else {
		let t = (e, t, n) => {
			let r = j(e), i;
			for (let a of t) {
				if (a._zod.def.when) {
					if (!a._zod.def.when(e)) continue;
				} else if (r) continue;
				let t = e.issues.length, o = a._zod.check(e);
				if (o instanceof Promise && n?.async === !1) throw new ee();
				if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async () => {
					await o, e.issues.length !== t && (r ||= j(e, t));
				});
				else {
					if (e.issues.length === t) continue;
					r ||= j(e, t);
				}
			}
			return i ? i.then(() => e) : e;
		}, n = (n, i, a) => {
			if (j(n)) return n.aborted = !0, n;
			let o = t(i, r, a);
			if (o instanceof Promise) {
				if (a.async === !1) throw new ee();
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
				if (a.async === !1) throw new ee();
				return o.then((e) => t(e, r, a));
			}
			return t(o, r, a);
		};
	}
	T(e, "~standard", () => ({
		validate: (t) => {
			try {
				let n = Re(e, t);
				return n.success ? { value: n.data } : { issues: n.error?.issues };
			} catch {
				return Be(e, t).then((e) => e.success ? { value: e.data } : { issues: e.error?.issues });
			}
		},
		vendor: "zod",
		version: 1
	}));
}), Gt = /* @__PURE__ */ x("$ZodString", (e, t) => {
	Wt.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? yt(e._zod.bag), e._zod.parse = (n, r) => {
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
}), Kt = /* @__PURE__ */ x("$ZodStringFormat", (e, t) => {
	Pt.init(e, t), Gt.init(e, t);
}), qt = /* @__PURE__ */ x("$ZodGUID", (e, t) => {
	t.pattern ??= nt, Kt.init(e, t);
}), Jt = /* @__PURE__ */ x("$ZodUUID", (e, t) => {
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
		t.pattern ??= rt(e);
	} else t.pattern ??= rt();
	Kt.init(e, t);
}), Yt = /* @__PURE__ */ x("$ZodEmail", (e, t) => {
	t.pattern ??= it, Kt.init(e, t);
}), Xt = /* @__PURE__ */ x("$ZodURL", (e, t) => {
	Kt.init(e, t), e._zod.check = (n) => {
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
}), Zt = /* @__PURE__ */ x("$ZodEmoji", (e, t) => {
	t.pattern ??= ot(), Kt.init(e, t);
}), Qt = /* @__PURE__ */ x("$ZodNanoID", (e, t) => {
	t.pattern ??= et, Kt.init(e, t);
}), $t = /* @__PURE__ */ x("$ZodCUID", (e, t) => {
	t.pattern ??= Ye, Kt.init(e, t);
}), en = /* @__PURE__ */ x("$ZodCUID2", (e, t) => {
	t.pattern ??= Xe, Kt.init(e, t);
}), tn = /* @__PURE__ */ x("$ZodULID", (e, t) => {
	t.pattern ??= Ze, Kt.init(e, t);
}), nn = /* @__PURE__ */ x("$ZodXID", (e, t) => {
	t.pattern ??= Qe, Kt.init(e, t);
}), rn = /* @__PURE__ */ x("$ZodKSUID", (e, t) => {
	t.pattern ??= $e, Kt.init(e, t);
}), an = /* @__PURE__ */ x("$ZodISODateTime", (e, t) => {
	t.pattern ??= vt(t), Kt.init(e, t);
}), on = /* @__PURE__ */ x("$ZodISODate", (e, t) => {
	t.pattern ??= ht, Kt.init(e, t);
}), sn = /* @__PURE__ */ x("$ZodISOTime", (e, t) => {
	t.pattern ??= _t(t), Kt.init(e, t);
}), cn = /* @__PURE__ */ x("$ZodISODuration", (e, t) => {
	t.pattern ??= tt, Kt.init(e, t);
}), ln = /* @__PURE__ */ x("$ZodIPv4", (e, t) => {
	t.pattern ??= st, Kt.init(e, t), e._zod.bag.format = "ipv4";
}), un = /* @__PURE__ */ x("$ZodIPv6", (e, t) => {
	t.pattern ??= ct, Kt.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
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
}), dn = /* @__PURE__ */ x("$ZodCIDRv4", (e, t) => {
	t.pattern ??= lt, Kt.init(e, t);
}), fn = /* @__PURE__ */ x("$ZodCIDRv6", (e, t) => {
	t.pattern ??= ut, Kt.init(e, t), e._zod.check = (n) => {
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
function pn(e) {
	if (e === "") return !0;
	if (e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
var mn = /* @__PURE__ */ x("$ZodBase64", (e, t) => {
	t.pattern ??= dt, Kt.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
		pn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
});
function hn(e) {
	if (!ft.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return pn(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
var gn = /* @__PURE__ */ x("$ZodBase64URL", (e, t) => {
	t.pattern ??= ft, Kt.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
		hn(n.value) || n.issues.push({
			code: "invalid_format",
			format: "base64url",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), _n = /* @__PURE__ */ x("$ZodE164", (e, t) => {
	t.pattern ??= pt, Kt.init(e, t);
});
function vn(e, t = null) {
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
var yn = /* @__PURE__ */ x("$ZodJWT", (e, t) => {
	Kt.init(e, t), e._zod.check = (n) => {
		vn(n.value, t.alg) || n.issues.push({
			code: "invalid_format",
			format: "jwt",
			input: n.value,
			inst: e,
			continue: !t.abort
		});
	};
}), bn = /* @__PURE__ */ x("$ZodNumber", (e, t) => {
	Wt.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? xt, e._zod.parse = (n, r) => {
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
}), xn = /* @__PURE__ */ x("$ZodNumberFormat", (e, t) => {
	At.init(e, t), bn.init(e, t);
}), Sn = /* @__PURE__ */ x("$ZodBoolean", (e, t) => {
	Wt.init(e, t), e._zod.pattern = St, e._zod.parse = (n, r) => {
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
}), Cn = /* @__PURE__ */ x("$ZodUnknown", (e, t) => {
	Wt.init(e, t), e._zod.parse = (e) => e;
}), wn = /* @__PURE__ */ x("$ZodNever", (e, t) => {
	Wt.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
		expected: "never",
		code: "invalid_type",
		input: t.value,
		inst: e
	}), t);
});
function Tn(e, t, n) {
	e.issues.length && t.issues.push(...Te(n, e.issues)), t.value[n] = e.value;
}
var En = /* @__PURE__ */ x("$ZodArray", (e, t) => {
	Wt.init(e, t), e._zod.parse = (n, r) => {
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
			s instanceof Promise ? a.push(s.then((t) => Tn(t, n, e))) : Tn(s, n, e);
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
});
function Dn(e, t, n, r, i) {
	if (e.issues.length) {
		if (i && !(n in r)) return;
		t.issues.push(...Te(n, e.issues));
	}
	e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function On(e) {
	let t = Object.keys(e.shape);
	for (let n of t) if (!e.shape?.[n]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${n}": expected a Zod schema`);
	let n = _e(e.shape);
	return {
		...e,
		keys: t,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(n)
	};
}
function kn(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => Dn(e, n, i, t, u))) : Dn(a, n, i, t, u);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a
	}), e.length ? Promise.all(e).then(() => n) : n;
}
var An = /* @__PURE__ */ x("$ZodObject", (e, t) => {
	if (Wt.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
		let e = t.shape;
		Object.defineProperty(t, "shape", { get: () => {
			let n = { ...e };
			return Object.defineProperty(t, "shape", { value: n }), n;
		} });
	}
	let n = C(() => On(t));
	T(e._zod, "propValues", () => {
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
	let r = de, i = t.catchall, a;
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
			i instanceof Promise ? c.push(i.then((n) => Dn(n, t, e, s, r))) : Dn(i, t, e, s, r);
		}
		return i ? kn(c, s, t, o, n.value, e) : c.length ? Promise.all(c).then(() => t) : t;
	};
}), jn = /* @__PURE__ */ x("$ZodObjectJIT", (e, t) => {
	An.init(e, t);
	let n = e._zod.parse, r = C(() => On(t)), i = (e) => {
		let t = new Ht([
			"shape",
			"payload",
			"ctx"
		]), n = r.value, i = (e) => {
			let t = E(e);
			return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
		};
		t.write("const input = payload.value;");
		let a = Object.create(null), o = 0;
		for (let e of n.keys) a[e] = `key_${o++}`;
		t.write("const newResult = {};");
		for (let r of n.keys) {
			let n = a[r], o = E(r), s = e[r]?._zod?.optout === "optional";
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
	}, a, o = de, s = !S.jitless, c = s && O.value, l = t.catchall, u;
	e._zod.parse = (d, f) => {
		u ??= r.value;
		let p = d.value;
		return o(p) ? s && c && f?.async === !1 && f.jitless !== !0 ? (a ||= i(t.shape), d = a(d, f), l ? kn([], p, d, f, u, e) : d) : n(d, f) : (d.issues.push({
			expected: "object",
			code: "invalid_type",
			input: p,
			inst: e
		}), d);
	};
});
function Mn(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !j(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => De(e, r, ne())))
	}), t);
}
var Nn = /* @__PURE__ */ x("$ZodUnion", (e, t) => {
	Wt.init(e, t), T(e._zod, "optin", () => t.options.some((e) => e._zod.optin === "optional") ? "optional" : void 0), T(e._zod, "optout", () => t.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), T(e._zod, "values", () => {
		if (t.options.every((e) => e._zod.values)) return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
	}), T(e._zod, "pattern", () => {
		if (t.options.every((e) => e._zod.pattern)) {
			let e = t.options.map((e) => e._zod.pattern);
			return RegExp(`^(${e.map((e) => w(e.source)).join("|")})$`);
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
		return o ? Promise.all(s).then((t) => Mn(t, i, e, a)) : Mn(s, i, e, a);
	};
}), Pn = /* @__PURE__ */ x("$ZodIntersection", (e, t) => {
	Wt.init(e, t), e._zod.parse = (e, n) => {
		let r = e.value, i = t.left._zod.run({
			value: r,
			issues: []
		}, n), a = t.right._zod.run({
			value: r,
			issues: []
		}, n);
		return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => In(e, t, n)) : In(e, i, a);
	};
});
function Fn(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (fe(e) && fe(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		for (let n of r) {
			let r = Fn(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Fn(i, a);
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
function In(e, t, n) {
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
	}), j(e)) return e;
	let o = Fn(t.value, n.value);
	if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
	return e.value = o.data, e;
}
var Ln = /* @__PURE__ */ x("$ZodRecord", (e, t) => {
	Wt.init(e, t), e._zod.parse = (n, r) => {
		let i = n.value;
		if (!fe(i)) return n.issues.push({
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
					t.issues.length && n.issues.push(...Te(e, t.issues)), n.value[e] = t.value;
				})) : (o.issues.length && n.issues.push(...Te(e, o.issues)), n.value[e] = o.value);
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
				if (typeof o == "string" && xt.test(o) && s.issues.length && s.issues.some((e) => e.code === "invalid_type" && e.expected === "number")) {
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
						issues: s.issues.map((e) => De(e, r, ne())),
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
					e.issues.length && n.issues.push(...Te(o, e.issues)), n.value[s.value] = e.value;
				})) : (c.issues.length && n.issues.push(...Te(o, c.issues)), n.value[s.value] = c.value);
			}
		}
		return a.length ? Promise.all(a).then(() => n) : n;
	};
}), Rn = /* @__PURE__ */ x("$ZodEnum", (e, t) => {
	Wt.init(e, t);
	let n = re(t.entries), r = new Set(n);
	e._zod.values = r, e._zod.pattern = RegExp(`^(${n.filter((e) => me.has(typeof e)).map((e) => typeof e == "string" ? he(e) : e.toString()).join("|")})$`), e._zod.parse = (t, i) => {
		let a = t.value;
		return r.has(a) || t.issues.push({
			code: "invalid_value",
			values: n,
			input: a,
			inst: e
		}), t;
	};
}), zn = /* @__PURE__ */ x("$ZodTransform", (e, t) => {
	Wt.init(e, t), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new te(e.constructor.name);
		let i = t.transform(n.value, n);
		if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
		if (i instanceof Promise) throw new ee();
		return n.value = i, n;
	};
});
function Bn(e, t) {
	return e.issues.length && t === void 0 ? {
		issues: [],
		value: void 0
	} : e;
}
var Vn = /* @__PURE__ */ x("$ZodOptional", (e, t) => {
	Wt.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", T(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0), T(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${w(e.source)})?$`) : void 0;
	}), e._zod.parse = (e, n) => {
		if (t.innerType._zod.optin === "optional") {
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((t) => Bn(t, e.value)) : Bn(r, e.value);
		}
		return e.value === void 0 ? e : t.innerType._zod.run(e, n);
	};
}), Hn = /* @__PURE__ */ x("$ZodExactOptional", (e, t) => {
	Vn.init(e, t), T(e._zod, "values", () => t.innerType._zod.values), T(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
}), Un = /* @__PURE__ */ x("$ZodNullable", (e, t) => {
	Wt.init(e, t), T(e._zod, "optin", () => t.innerType._zod.optin), T(e._zod, "optout", () => t.innerType._zod.optout), T(e._zod, "pattern", () => {
		let e = t.innerType._zod.pattern;
		return e ? RegExp(`^(${w(e.source)}|null)$`) : void 0;
	}), T(e._zod, "values", () => t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
}), Wn = /* @__PURE__ */ x("$ZodDefault", (e, t) => {
	Wt.init(e, t), e._zod.optin = "optional", T(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		if (e.value === void 0) return e.value = t.defaultValue, e;
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Gn(e, t)) : Gn(r, t);
	};
});
function Gn(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
var Kn = /* @__PURE__ */ x("$ZodPrefault", (e, t) => {
	Wt.init(e, t), e._zod.optin = "optional", T(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
}), qn = /* @__PURE__ */ x("$ZodNonOptional", (e, t) => {
	Wt.init(e, t), T(e._zod, "values", () => {
		let e = t.innerType._zod.values;
		return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
	}), e._zod.parse = (n, r) => {
		let i = t.innerType._zod.run(n, r);
		return i instanceof Promise ? i.then((t) => Jn(t, e)) : Jn(i, e);
	};
});
function Jn(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
var Yn = /* @__PURE__ */ x("$ZodCatch", (e, t) => {
	Wt.init(e, t), T(e._zod, "optin", () => t.innerType._zod.optin), T(e._zod, "optout", () => t.innerType._zod.optout), T(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then((r) => (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => De(e, n, ne())) },
			input: e.value
		}), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
			...e,
			error: { issues: r.issues.map((e) => De(e, n, ne())) },
			input: e.value
		}), e.issues = []), e);
	};
}), Xn = /* @__PURE__ */ x("$ZodPipe", (e, t) => {
	Wt.init(e, t), T(e._zod, "values", () => t.in._zod.values), T(e._zod, "optin", () => t.in._zod.optin), T(e._zod, "optout", () => t.out._zod.optout), T(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (e, n) => {
		if (n.direction === "backward") {
			let r = t.out._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => Zn(e, t.in, n)) : Zn(r, t.in, n);
		}
		let r = t.in._zod.run(e, n);
		return r instanceof Promise ? r.then((e) => Zn(e, t.out, n)) : Zn(r, t.out, n);
	};
});
function Zn(e, t, n) {
	return e.issues.length ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
var Qn = /* @__PURE__ */ x("$ZodReadonly", (e, t) => {
	Wt.init(e, t), T(e._zod, "propValues", () => t.innerType._zod.propValues), T(e._zod, "values", () => t.innerType._zod.values), T(e._zod, "optin", () => t.innerType?._zod?.optin), T(e._zod, "optout", () => t.innerType?._zod?.optout), e._zod.parse = (e, n) => {
		if (n.direction === "backward") return t.innerType._zod.run(e, n);
		let r = t.innerType._zod.run(e, n);
		return r instanceof Promise ? r.then($n) : $n(r);
	};
});
function $n(e) {
	return e.value = Object.freeze(e.value), e;
}
var er = /* @__PURE__ */ x("$ZodCustom", (e, t) => {
	Tt.init(e, t), Wt.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
		let r = n.value, i = t.fn(r);
		if (i instanceof Promise) return i.then((t) => tr(t, n, r, e));
		tr(i, n, r, e);
	};
});
function tr(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(ke(e));
	}
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/registries.js
var nr, rr = class {
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
function ir() {
	return new rr();
}
(nr = globalThis).__zod_globalRegistry ?? (nr.__zod_globalRegistry = ir());
var ar = globalThis.__zod_globalRegistry;
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/api.js
/* @__NO_SIDE_EFFECTS__ */
function or(e, t) {
	return new e({
		type: "string",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function sr(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function cr(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
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
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ur(e, t) {
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
function dr(e, t) {
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
function fr(e, t) {
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
function pr(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function mr(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function hr(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function gr(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function _r(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function vr(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function yr(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function br(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function xr(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Sr(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Cr(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function wr(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Tr(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Er(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Dr(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Or(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function kr(e, t) {
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
function Ar(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function jr(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Mr(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Nr(e, t) {
	return new e({
		type: "number",
		checks: [],
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Pr(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Fr(e, t) {
	return new e({
		type: "boolean",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ir(e) {
	return new e({ type: "unknown" });
}
/* @__NO_SIDE_EFFECTS__ */
function Lr(e, t) {
	return new e({
		type: "never",
		...k(t)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Rr(e, t) {
	return new Dt({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function zr(e, t) {
	return new Dt({
		check: "less_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Br(e, t) {
	return new Ot({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !1
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Vr(e, t) {
	return new Ot({
		check: "greater_than",
		...k(t),
		value: e,
		inclusive: !0
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Hr(e, t) {
	return new kt({
		check: "multiple_of",
		...k(t),
		value: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Ur(e, t) {
	return new jt({
		check: "max_length",
		...k(t),
		maximum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Wr(e, t) {
	return new Mt({
		check: "min_length",
		...k(t),
		minimum: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Gr(e, t) {
	return new Nt({
		check: "length_equals",
		...k(t),
		length: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Kr(e, t) {
	return new Ft({
		check: "string_format",
		format: "regex",
		...k(t),
		pattern: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function qr(e) {
	return new It({
		check: "string_format",
		format: "lowercase",
		...k(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Jr(e) {
	return new Lt({
		check: "string_format",
		format: "uppercase",
		...k(e)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Yr(e, t) {
	return new Rt({
		check: "string_format",
		format: "includes",
		...k(t),
		includes: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Xr(e, t) {
	return new zt({
		check: "string_format",
		format: "starts_with",
		...k(t),
		prefix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Zr(e, t) {
	return new Bt({
		check: "string_format",
		format: "ends_with",
		...k(t),
		suffix: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function Qr(e) {
	return new Vt({
		check: "overwrite",
		tx: e
	});
}
/* @__NO_SIDE_EFFECTS__ */
function $r(e) {
	return /* @__PURE__ */ Qr((t) => t.normalize(e));
}
/* @__NO_SIDE_EFFECTS__ */
function ei() {
	return /* @__PURE__ */ Qr((e) => e.trim());
}
/* @__NO_SIDE_EFFECTS__ */
function ti() {
	return /* @__PURE__ */ Qr((e) => e.toLowerCase());
}
/* @__NO_SIDE_EFFECTS__ */
function ni() {
	return /* @__PURE__ */ Qr((e) => e.toUpperCase());
}
/* @__NO_SIDE_EFFECTS__ */
function ri() {
	return /* @__PURE__ */ Qr((e) => D(e));
}
/* @__NO_SIDE_EFFECTS__ */
function ii(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...k(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function ai(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...k(n)
	});
}
/* @__NO_SIDE_EFFECTS__ */
function oi(e) {
	let t = /* @__PURE__ */ si((n) => (n.addIssue = (e) => {
		if (typeof e == "string") n.issues.push(ke(e, n.value, t._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", r.input ??= n.value, r.inst ??= t, r.continue ??= !t._zod.def.abort, n.issues.push(ke(r));
		}
	}, e(n.value, n)));
	return t;
}
/* @__NO_SIDE_EFFECTS__ */
function si(e, t) {
	let n = new Tt({
		check: "custom",
		...k(t)
	});
	return n._zod.check = e, n;
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/core/to-json-schema.js
function ci(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? ar,
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
function li(e, t, n = {
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
		a && (o.ref ||= a, li(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Object.assign(o.schema, c), t.io === "input" && fi(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && o.schema._prefault && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function ui(e, t) {
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
function di(e, t) {
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
					input: mi(t, "input", e.processors),
					output: mi(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function fi(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return fi(r.element, n);
	if (r.type === "set") return fi(r.valueType, n);
	if (r.type === "lazy") return fi(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault") return fi(r.innerType, n);
	if (r.type === "intersection") return fi(r.left, n) || fi(r.right, n);
	if (r.type === "record" || r.type === "map") return fi(r.keyType, n) || fi(r.valueType, n);
	if (r.type === "pipe") return fi(r.in, n) || fi(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (fi(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (fi(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (fi(e, n)) return !0;
		return !!(r.rest && fi(r.rest, n));
	}
	return !1;
}
var pi = (e, t = {}) => (n) => {
	let r = ci({
		...n,
		processors: t
	});
	return li(e, r), ui(r, e), di(r, e);
}, mi = (e, t, n = {}) => (r) => {
	let { libraryOptions: i, target: a } = r ?? {}, o = ci({
		...i ?? {},
		target: a,
		io: t,
		processors: n
	});
	return li(e, o), ui(o, e), di(o, e);
}, hi = {
	guid: "uuid",
	url: "uri",
	datetime: "date-time",
	json_string: "json-string",
	regex: ""
}, gi = (e, t, n, r) => {
	let i = n;
	i.type = "string";
	let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
	if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = hi[s] ?? s, i.format === "" && delete i.format, s === "time" && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
		let e = [...c];
		e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
			...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
			pattern: e.source
		}))]);
	}
}, _i = (e, t, n, r) => {
	let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
	typeof s == "string" && s.includes("int") ? i.type = "integer" : i.type = "number", typeof u == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u), typeof a == "number" && (i.minimum = a, typeof u == "number" && t.target !== "draft-04" && (u >= a ? delete i.minimum : delete i.exclusiveMinimum)), typeof l == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l), typeof o == "number" && (i.maximum = o, typeof l == "number" && t.target !== "draft-04" && (l <= o ? delete i.maximum : delete i.exclusiveMaximum)), typeof c == "number" && (i.multipleOf = c);
}, vi = (e, t, n, r) => {
	n.type = "boolean";
}, yi = (e, t, n, r) => {
	n.not = {};
}, bi = (e, t, n, r) => {
	let i = e._zod.def, a = re(i.entries);
	a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
}, xi = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Custom types cannot be represented in JSON Schema");
}, Si = (e, t, n, r) => {
	if (t.unrepresentable === "throw") throw Error("Transforms cannot be represented in JSON Schema");
}, Ci = (e, t, n, r) => {
	let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
	typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = li(a.element, t, {
		...r,
		path: [...r.path, "items"]
	});
}, wi = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object", i.properties = {};
	let o = a.shape;
	for (let e in o) i.properties[e] = li(o[e], t, {
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
	c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = li(a.catchall, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	})) : t.io === "output" && (i.additionalProperties = !1);
}, Ti = (e, t, n, r) => {
	let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => li(e, t, {
		...r,
		path: [
			...r.path,
			a ? "oneOf" : "anyOf",
			n
		]
	}));
	a ? n.oneOf = o : n.anyOf = o;
}, Ei = (e, t, n, r) => {
	let i = e._zod.def, a = li(i.left, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			0
		]
	}), o = li(i.right, t, {
		...r,
		path: [
			...r.path,
			"allOf",
			1
		]
	}), s = (e) => "allOf" in e && Object.keys(e).length === 1;
	n.allOf = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
}, Di = (e, t, n, r) => {
	let i = n, a = e._zod.def;
	i.type = "object";
	let o = a.keyType, s = o._zod.bag?.patterns;
	if (a.mode === "loose" && s && s.size > 0) {
		let e = li(a.valueType, t, {
			...r,
			path: [
				...r.path,
				"patternProperties",
				"*"
			]
		});
		i.patternProperties = {};
		for (let t of s) i.patternProperties[t.source] = e;
	} else (t.target === "draft-07" || t.target === "draft-2020-12") && (i.propertyNames = li(a.keyType, t, {
		...r,
		path: [...r.path, "propertyNames"]
	})), i.additionalProperties = li(a.valueType, t, {
		...r,
		path: [...r.path, "additionalProperties"]
	});
	let c = o._zod.values;
	if (c) {
		let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
		e.length > 0 && (i.required = e);
	}
}, Oi = (e, t, n, r) => {
	let i = e._zod.def, a = li(i.innerType, t, r), o = t.seen.get(e);
	t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
}, ki = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ai = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.default = JSON.parse(JSON.stringify(i.defaultValue));
}, ji = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(i.defaultValue)));
}, Mi = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
	let o;
	try {
		o = i.catchValue(void 0);
	} catch {
		throw Error("Dynamic catch values are not supported in JSON Schema");
	}
	n.default = o;
}, Ni = (e, t, n, r) => {
	let i = e._zod.def, a = t.io === "input" ? i.in._zod.def.type === "transform" ? i.out : i.in : i.out;
	li(a, t, r);
	let o = t.seen.get(e);
	o.ref = a;
}, Pi = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType, n.readOnly = !0;
}, Fi = (e, t, n, r) => {
	let i = e._zod.def;
	li(i.innerType, t, r);
	let a = t.seen.get(e);
	a.ref = i.innerType;
}, Ii = /* @__PURE__ */ x("ZodISODateTime", (e, t) => {
	an.init(e, t), oa.init(e, t);
});
function Li(e) {
	return /* @__PURE__ */ kr(Ii, e);
}
var Ri = /* @__PURE__ */ x("ZodISODate", (e, t) => {
	on.init(e, t), oa.init(e, t);
});
function zi(e) {
	return /* @__PURE__ */ Ar(Ri, e);
}
var Bi = /* @__PURE__ */ x("ZodISOTime", (e, t) => {
	sn.init(e, t), oa.init(e, t);
});
function Vi(e) {
	return /* @__PURE__ */ jr(Bi, e);
}
var M = /* @__PURE__ */ x("ZodISODuration", (e, t) => {
	cn.init(e, t), oa.init(e, t);
});
function Hi(e) {
	return /* @__PURE__ */ Mr(M, e);
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/node_modules/zod/v4/classic/errors.js
var Ui = (e, t) => {
	je.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
		format: { value: (t) => Pe(e, t) },
		flatten: { value: (t) => Ne(e, t) },
		addIssue: { value: (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, ie, 2);
		} },
		addIssues: { value: (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, ie, 2);
		} },
		isEmpty: { get() {
			return e.issues.length === 0;
		} }
	});
};
x("ZodError", Ui);
var Wi = x("ZodError", Ui, { Parent: Error }), Gi = /* @__PURE__ */ Fe(Wi), Ki = /* @__PURE__ */ Ie(Wi), qi = /* @__PURE__ */ Le(Wi), Ji = /* @__PURE__ */ ze(Wi), Yi = /* @__PURE__ */ Ve(Wi), Xi = /* @__PURE__ */ He(Wi), Zi = /* @__PURE__ */ Ue(Wi), Qi = /* @__PURE__ */ We(Wi), $i = /* @__PURE__ */ Ge(Wi), ea = /* @__PURE__ */ Ke(Wi), ta = /* @__PURE__ */ qe(Wi), na = /* @__PURE__ */ Je(Wi), ra = /* @__PURE__ */ x("ZodType", (e, t) => (Wt.init(e, t), Object.assign(e["~standard"], { jsonSchema: {
	input: mi(e, "input"),
	output: mi(e, "output")
} }), e.toJSONSchema = pi(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(le(t, { checks: [...t.checks ?? [], ...n.map((e) => typeof e == "function" ? { _zod: {
	check: e,
	def: { check: "custom" },
	onattach: []
} } : e)] }), { parent: !0 }), e.with = e.check, e.clone = (t, n) => ge(e, t, n), e.brand = () => e, e.register = ((t, n) => (t.add(e, n), e)), e.parse = (t, n) => Gi(e, t, n, { callee: e.parse }), e.safeParse = (t, n) => qi(e, t, n), e.parseAsync = async (t, n) => Ki(e, t, n, { callee: e.parseAsync }), e.safeParseAsync = async (t, n) => Ji(e, t, n), e.spa = e.safeParseAsync, e.encode = (t, n) => Yi(e, t, n), e.decode = (t, n) => Xi(e, t, n), e.encodeAsync = async (t, n) => Zi(e, t, n), e.decodeAsync = async (t, n) => Qi(e, t, n), e.safeEncode = (t, n) => $i(e, t, n), e.safeDecode = (t, n) => ea(e, t, n), e.safeEncodeAsync = async (t, n) => ta(e, t, n), e.safeDecodeAsync = async (t, n) => na(e, t, n), e.refine = (t, n) => e.check(po(t, n)), e.superRefine = (t) => e.check(mo(t)), e.overwrite = (t) => e.check(/* @__PURE__ */ Qr(t)), e.optional = () => Ja(e), e.exactOptional = () => Xa(e), e.nullable = () => Qa(e), e.nullish = () => Ja(Qa(e)), e.nonoptional = (t) => io(e, t), e.array = () => Pa(e), e.or = (t) => Ra([e, t]), e.and = (t) => Ba(e, t), e.transform = (t) => co(e, Ka(t)), e.default = (t) => eo(e, t), e.prefault = (t) => no(e, t), e.catch = (t) => oo(e, t), e.pipe = (t) => co(e, t), e.readonly = () => uo(e), e.describe = (t) => {
	let n = e.clone();
	return ar.add(n, { description: t }), n;
}, Object.defineProperty(e, "description", {
	get() {
		return ar.get(e)?.description;
	},
	configurable: !0
}), e.meta = (...t) => {
	if (t.length === 0) return ar.get(e);
	let n = e.clone();
	return ar.add(n, t[0]), n;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (t) => t(e), e)), ia = /* @__PURE__ */ x("_ZodString", (e, t) => {
	Gt.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => gi(e, t, n, r);
	let n = e._zod.bag;
	e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...t) => e.check(/* @__PURE__ */ Kr(...t)), e.includes = (...t) => e.check(/* @__PURE__ */ Yr(...t)), e.startsWith = (...t) => e.check(/* @__PURE__ */ Xr(...t)), e.endsWith = (...t) => e.check(/* @__PURE__ */ Zr(...t)), e.min = (...t) => e.check(/* @__PURE__ */ Wr(...t)), e.max = (...t) => e.check(/* @__PURE__ */ Ur(...t)), e.length = (...t) => e.check(/* @__PURE__ */ Gr(...t)), e.nonempty = (...t) => e.check(/* @__PURE__ */ Wr(1, ...t)), e.lowercase = (t) => e.check(/* @__PURE__ */ qr(t)), e.uppercase = (t) => e.check(/* @__PURE__ */ Jr(t)), e.trim = () => e.check(/* @__PURE__ */ ei()), e.normalize = (...t) => e.check(/* @__PURE__ */ $r(...t)), e.toLowerCase = () => e.check(/* @__PURE__ */ ti()), e.toUpperCase = () => e.check(/* @__PURE__ */ ni()), e.slugify = () => e.check(/* @__PURE__ */ ri());
}), aa = /* @__PURE__ */ x("ZodString", (e, t) => {
	Gt.init(e, t), ia.init(e, t), e.email = (t) => e.check(/* @__PURE__ */ sr(sa, t)), e.url = (t) => e.check(/* @__PURE__ */ pr(ua, t)), e.jwt = (t) => e.check(/* @__PURE__ */ Or(Ca, t)), e.emoji = (t) => e.check(/* @__PURE__ */ mr(da, t)), e.guid = (t) => e.check(/* @__PURE__ */ cr(ca, t)), e.uuid = (t) => e.check(/* @__PURE__ */ lr(la, t)), e.uuidv4 = (t) => e.check(/* @__PURE__ */ ur(la, t)), e.uuidv6 = (t) => e.check(/* @__PURE__ */ dr(la, t)), e.uuidv7 = (t) => e.check(/* @__PURE__ */ fr(la, t)), e.nanoid = (t) => e.check(/* @__PURE__ */ hr(fa, t)), e.guid = (t) => e.check(/* @__PURE__ */ cr(ca, t)), e.cuid = (t) => e.check(/* @__PURE__ */ gr(pa, t)), e.cuid2 = (t) => e.check(/* @__PURE__ */ _r(ma, t)), e.ulid = (t) => e.check(/* @__PURE__ */ vr(ha, t)), e.base64 = (t) => e.check(/* @__PURE__ */ Tr(ba, t)), e.base64url = (t) => e.check(/* @__PURE__ */ Er(xa, t)), e.xid = (t) => e.check(/* @__PURE__ */ yr(ga, t)), e.ksuid = (t) => e.check(/* @__PURE__ */ br(P, t)), e.ipv4 = (t) => e.check(/* @__PURE__ */ xr(F, t)), e.ipv6 = (t) => e.check(/* @__PURE__ */ Sr(_a, t)), e.cidrv4 = (t) => e.check(/* @__PURE__ */ Cr(va, t)), e.cidrv6 = (t) => e.check(/* @__PURE__ */ wr(ya, t)), e.e164 = (t) => e.check(/* @__PURE__ */ Dr(Sa, t)), e.datetime = (t) => e.check(Li(t)), e.date = (t) => e.check(zi(t)), e.time = (t) => e.check(Vi(t)), e.duration = (t) => e.check(Hi(t));
});
function N(e) {
	return /* @__PURE__ */ or(aa, e);
}
var oa = /* @__PURE__ */ x("ZodStringFormat", (e, t) => {
	Kt.init(e, t), ia.init(e, t);
}), sa = /* @__PURE__ */ x("ZodEmail", (e, t) => {
	Yt.init(e, t), oa.init(e, t);
}), ca = /* @__PURE__ */ x("ZodGUID", (e, t) => {
	qt.init(e, t), oa.init(e, t);
}), la = /* @__PURE__ */ x("ZodUUID", (e, t) => {
	Jt.init(e, t), oa.init(e, t);
}), ua = /* @__PURE__ */ x("ZodURL", (e, t) => {
	Xt.init(e, t), oa.init(e, t);
}), da = /* @__PURE__ */ x("ZodEmoji", (e, t) => {
	Zt.init(e, t), oa.init(e, t);
}), fa = /* @__PURE__ */ x("ZodNanoID", (e, t) => {
	Qt.init(e, t), oa.init(e, t);
}), pa = /* @__PURE__ */ x("ZodCUID", (e, t) => {
	$t.init(e, t), oa.init(e, t);
}), ma = /* @__PURE__ */ x("ZodCUID2", (e, t) => {
	en.init(e, t), oa.init(e, t);
}), ha = /* @__PURE__ */ x("ZodULID", (e, t) => {
	tn.init(e, t), oa.init(e, t);
}), ga = /* @__PURE__ */ x("ZodXID", (e, t) => {
	nn.init(e, t), oa.init(e, t);
}), P = /* @__PURE__ */ x("ZodKSUID", (e, t) => {
	rn.init(e, t), oa.init(e, t);
}), F = /* @__PURE__ */ x("ZodIPv4", (e, t) => {
	ln.init(e, t), oa.init(e, t);
}), _a = /* @__PURE__ */ x("ZodIPv6", (e, t) => {
	un.init(e, t), oa.init(e, t);
}), va = /* @__PURE__ */ x("ZodCIDRv4", (e, t) => {
	dn.init(e, t), oa.init(e, t);
}), ya = /* @__PURE__ */ x("ZodCIDRv6", (e, t) => {
	fn.init(e, t), oa.init(e, t);
}), ba = /* @__PURE__ */ x("ZodBase64", (e, t) => {
	mn.init(e, t), oa.init(e, t);
}), xa = /* @__PURE__ */ x("ZodBase64URL", (e, t) => {
	gn.init(e, t), oa.init(e, t);
}), Sa = /* @__PURE__ */ x("ZodE164", (e, t) => {
	_n.init(e, t), oa.init(e, t);
}), Ca = /* @__PURE__ */ x("ZodJWT", (e, t) => {
	yn.init(e, t), oa.init(e, t);
}), wa = /* @__PURE__ */ x("ZodNumber", (e, t) => {
	bn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => _i(e, t, n, r), e.gt = (t, n) => e.check(/* @__PURE__ */ Br(t, n)), e.gte = (t, n) => e.check(/* @__PURE__ */ Vr(t, n)), e.min = (t, n) => e.check(/* @__PURE__ */ Vr(t, n)), e.lt = (t, n) => e.check(/* @__PURE__ */ Rr(t, n)), e.lte = (t, n) => e.check(/* @__PURE__ */ zr(t, n)), e.max = (t, n) => e.check(/* @__PURE__ */ zr(t, n)), e.int = (t) => e.check(Da(t)), e.safe = (t) => e.check(Da(t)), e.positive = (t) => e.check(/* @__PURE__ */ Br(0, t)), e.nonnegative = (t) => e.check(/* @__PURE__ */ Vr(0, t)), e.negative = (t) => e.check(/* @__PURE__ */ Rr(0, t)), e.nonpositive = (t) => e.check(/* @__PURE__ */ zr(0, t)), e.multipleOf = (t, n) => e.check(/* @__PURE__ */ Hr(t, n)), e.step = (t, n) => e.check(/* @__PURE__ */ Hr(t, n)), e.finite = () => e;
	let n = e._zod.bag;
	e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
});
function Ta(e) {
	return /* @__PURE__ */ Nr(wa, e);
}
var Ea = /* @__PURE__ */ x("ZodNumberFormat", (e, t) => {
	xn.init(e, t), wa.init(e, t);
});
function Da(e) {
	return /* @__PURE__ */ Pr(Ea, e);
}
var Oa = /* @__PURE__ */ x("ZodBoolean", (e, t) => {
	Sn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => vi(e, t, n, r);
});
function I(e) {
	return /* @__PURE__ */ Fr(Oa, e);
}
var ka = /* @__PURE__ */ x("ZodUnknown", (e, t) => {
	Cn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (e, t, n) => void 0;
});
function Aa() {
	return /* @__PURE__ */ Ir(ka);
}
var ja = /* @__PURE__ */ x("ZodNever", (e, t) => {
	wn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => yi(e, t, n, r);
});
function Ma(e) {
	return /* @__PURE__ */ Lr(ja, e);
}
var Na = /* @__PURE__ */ x("ZodArray", (e, t) => {
	En.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ci(e, t, n, r), e.element = t.element, e.min = (t, n) => e.check(/* @__PURE__ */ Wr(t, n)), e.nonempty = (t) => e.check(/* @__PURE__ */ Wr(1, t)), e.max = (t, n) => e.check(/* @__PURE__ */ Ur(t, n)), e.length = (t, n) => e.check(/* @__PURE__ */ Gr(t, n)), e.unwrap = () => e.element;
});
function Pa(e, t) {
	return /* @__PURE__ */ ii(Na, e, t);
}
var Fa = /* @__PURE__ */ x("ZodObject", (e, t) => {
	jn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => wi(e, t, n, r), T(e, "shape", () => t.shape), e.keyof = () => Wa(Object.keys(e._zod.def.shape)), e.catchall = (t) => e.clone({
		...e._zod.def,
		catchall: t
	}), e.passthrough = () => e.clone({
		...e._zod.def,
		catchall: Aa()
	}), e.loose = () => e.clone({
		...e._zod.def,
		catchall: Aa()
	}), e.strict = () => e.clone({
		...e._zod.def,
		catchall: Ma()
	}), e.strip = () => e.clone({
		...e._zod.def,
		catchall: void 0
	}), e.extend = (t) => A(e, t), e.safeExtend = (t) => xe(e, t), e.merge = (t) => Se(e, t), e.pick = (t) => ye(e, t), e.omit = (t) => be(e, t), e.partial = (...t) => Ce(qa, e, t[0]), e.required = (...t) => we(ro, e, t[0]);
});
function Ia(e, t) {
	return new Fa({
		type: "object",
		shape: e ?? {},
		...k(t)
	});
}
var La = /* @__PURE__ */ x("ZodUnion", (e, t) => {
	Nn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ti(e, t, n, r), e.options = t.options;
});
function Ra(e, t) {
	return new La({
		type: "union",
		options: e,
		...k(t)
	});
}
var za = /* @__PURE__ */ x("ZodIntersection", (e, t) => {
	Pn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ei(e, t, n, r);
});
function Ba(e, t) {
	return new za({
		type: "intersection",
		left: e,
		right: t
	});
}
var Va = /* @__PURE__ */ x("ZodRecord", (e, t) => {
	Ln.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Di(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
});
function Ha(e, t, n) {
	return new Va({
		type: "record",
		keyType: e,
		valueType: t,
		...k(n)
	});
}
var Ua = /* @__PURE__ */ x("ZodEnum", (e, t) => {
	Rn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => bi(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
	let n = new Set(Object.keys(t.entries));
	e.extract = (e, r) => {
		let i = {};
		for (let r of e) if (n.has(r)) i[r] = t.entries[r];
		else throw Error(`Key ${r} not found in enum`);
		return new Ua({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	}, e.exclude = (e, r) => {
		let i = { ...t.entries };
		for (let t of e) if (n.has(t)) delete i[t];
		else throw Error(`Key ${t} not found in enum`);
		return new Ua({
			...t,
			checks: [],
			...k(r),
			entries: i
		});
	};
});
function Wa(e, t) {
	return new Ua({
		type: "enum",
		entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
		...k(t)
	});
}
var Ga = /* @__PURE__ */ x("ZodTransform", (e, t) => {
	zn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Si(e, t, n, r), e._zod.parse = (n, r) => {
		if (r.direction === "backward") throw new te(e.constructor.name);
		n.addIssue = (r) => {
			if (typeof r == "string") n.issues.push(ke(r, n.value, t));
			else {
				let t = r;
				t.fatal && (t.continue = !1), t.code ??= "custom", t.input ??= n.value, t.inst ??= e, n.issues.push(ke(t));
			}
		};
		let i = t.transform(n.value, n);
		return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
	};
});
function Ka(e) {
	return new Ga({
		type: "transform",
		transform: e
	});
}
var qa = /* @__PURE__ */ x("ZodOptional", (e, t) => {
	Vn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Ja(e) {
	return new qa({
		type: "optional",
		innerType: e
	});
}
var Ya = /* @__PURE__ */ x("ZodExactOptional", (e, t) => {
	Hn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Xa(e) {
	return new Ya({
		type: "optional",
		innerType: e
	});
}
var Za = /* @__PURE__ */ x("ZodNullable", (e, t) => {
	Un.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Oi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function Qa(e) {
	return new Za({
		type: "nullable",
		innerType: e
	});
}
var $a = /* @__PURE__ */ x("ZodDefault", (e, t) => {
	Wn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ai(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function eo(e, t) {
	return new $a({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : pe(t);
		}
	});
}
var to = /* @__PURE__ */ x("ZodPrefault", (e, t) => {
	Kn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => ji(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function no(e, t) {
	return new to({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : pe(t);
		}
	});
}
var ro = /* @__PURE__ */ x("ZodNonOptional", (e, t) => {
	qn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => ki(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function io(e, t) {
	return new ro({
		type: "nonoptional",
		innerType: e,
		...k(t)
	});
}
var ao = /* @__PURE__ */ x("ZodCatch", (e, t) => {
	Yn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Mi(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function oo(e, t) {
	return new ao({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : () => t
	});
}
var so = /* @__PURE__ */ x("ZodPipe", (e, t) => {
	Xn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ni(e, t, n, r), e.in = t.in, e.out = t.out;
});
function co(e, t) {
	return new so({
		type: "pipe",
		in: e,
		out: t
	});
}
var lo = /* @__PURE__ */ x("ZodReadonly", (e, t) => {
	Qn.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pi(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
});
function uo(e) {
	return new lo({
		type: "readonly",
		innerType: e
	});
}
var fo = /* @__PURE__ */ x("ZodCustom", (e, t) => {
	er.init(e, t), ra.init(e, t), e._zod.processJSONSchema = (t, n, r) => xi(e, t, n, r);
});
function po(e, t = {}) {
	return /* @__PURE__ */ ai(fo, e, t);
}
function mo(e) {
	return /* @__PURE__ */ oi(e);
}
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/dist/core/index.js
var L = /* @__PURE__ */ c(d(), 1), ho = /* @__PURE__ */ c(b()), R = [
	"context",
	"project",
	"knowledge",
	"reference",
	"personal",
	"workflow"
], go = [
	"active",
	"archived",
	"draft",
	"deleted"
], _o = Ia({
	title: N().min(1).max(500),
	content: N().min(1).max(5e4),
	summary: N().max(1e3).optional(),
	memory_type: Wa(R).default("context"),
	topic_id: N().uuid().optional(),
	project_ref: N().max(100).optional(),
	tags: Pa(N().min(1).max(50)).max(20).default([]),
	metadata: Ha(N(), Aa()).optional()
}), vo = Ia({
	title: N().min(1).max(500).optional(),
	content: N().min(1).max(5e4).optional(),
	summary: N().max(1e3).optional(),
	memory_type: Wa(R).optional(),
	status: Wa(go).optional(),
	topic_id: N().uuid().nullable().optional(),
	project_ref: N().max(100).nullable().optional(),
	tags: Pa(N().min(1).max(50)).max(20).optional(),
	metadata: Ha(N(), Aa()).optional()
}), yo = Ia({
	query: N().min(1).max(1e3),
	memory_types: Pa(Wa(R)).optional(),
	tags: Pa(N()).optional(),
	topic_id: N().uuid().optional(),
	project_ref: N().optional(),
	status: Wa(go).default("active"),
	limit: Ta().int().min(1).max(100).default(20),
	threshold: Ta().min(0).max(1).default(.7)
}), bo = Ia({
	name: N().min(1).max(100),
	description: N().max(500).optional(),
	color: N().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
	icon: N().max(50).optional(),
	parent_topic_id: N().uuid().optional()
});
Ia({
	memory_id: N().uuid().optional(),
	content: N().min(1).optional(),
	title: N().optional(),
	existing_tags: Pa(N()).optional(),
	max_suggestions: Ta().int().min(1).max(10).optional()
}).refine((e) => e.memory_id || e.content, { message: "Either memory_id or content is required" }), Ia({
	time_range_days: Ta().int().min(1).max(365).optional(),
	include_insights: I().optional(),
	response_format: Wa(["json", "markdown"]).optional()
}), Ia({
	include_recommendations: I().optional(),
	detailed_breakdown: I().optional()
}), Ia({
	memory_id: N().uuid().optional(),
	query: N().min(1).optional(),
	limit: Ta().int().min(1).max(20).optional(),
	similarity_threshold: Ta().min(0).max(1).optional(),
	exclude_ids: Pa(N().uuid()).optional()
}).refine((e) => e.memory_id || e.query, { message: "Either memory_id or query is required" }), Ia({
	similarity_threshold: Ta().min(0).max(1).optional(),
	include_archived: I().optional(),
	limit: Ta().int().min(1).max(50).optional()
}), Ia({
	memory_ids: Pa(N().uuid()).optional(),
	topic: N().min(1).optional(),
	time_range_days: Ta().int().min(1).max(365).optional(),
	insight_types: Pa(Wa([
		"themes",
		"connections",
		"gaps",
		"actions",
		"summary"
	])).optional(),
	detail_level: Wa([
		"brief",
		"detailed",
		"comprehensive"
	]).optional()
});
var xo = [
	"semantic",
	"fixed-size",
	"paragraph",
	"sentence",
	"code-block"
], So = [
	"vector",
	"text",
	"hybrid"
];
Ia({
	chunking: Ia({
		strategy: Wa(xo).optional(),
		maxChunkSize: Ta().int().min(100).max(1e4).optional(),
		overlap: Ta().int().min(0).max(500).optional()
	}).optional(),
	cleanContent: I().optional(),
	extractMetadata: I().optional()
}).optional();
var Co = Ia({
	query: N().min(1).max(1e3),
	type: Wa(R).optional(),
	threshold: Ta().min(0).max(1).default(.7),
	limit: Ta().int().min(1).max(100).default(20),
	search_mode: Wa(So).default("hybrid"),
	filters: Ia({
		tags: Pa(N()).optional(),
		project_id: N().uuid().optional(),
		topic_id: N().uuid().optional(),
		date_range: Ia({
			from: N().optional(),
			to: N().optional()
		}).optional()
	}).optional(),
	include_chunks: I().default(!1)
}), wo = Ia({
	from: N().optional(),
	to: N().optional(),
	group_by: Wa([
		"day",
		"week",
		"month"
	]).default("day")
});
function To(e) {
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
function Eo(e, t = "API_ERROR", n, r) {
	return {
		code: t,
		message: e,
		statusCode: n,
		details: r,
		timestamp: (/* @__PURE__ */ new Date()).toISOString()
	};
}
function Do(e, t, n) {
	let r = To(e), i = `HTTP ${e}: ${t}`, a;
	if (n && typeof n == "object") {
		let e = n;
		typeof e.error == "string" ? i = e.error : typeof e.message == "string" && (i = e.message), e.details && (a = e.details);
	}
	return Eo(i, r, e, a);
}
function Oo(e) {
	return new Promise((t) => setTimeout(t, e));
}
function ko(e, t = 1e3, n = "exponential", r = 3e4) {
	let i;
	i = n === "exponential" ? t * 2 ** e : t * (e + 1);
	let a = i * .2 * (Math.random() * 2 - 1);
	return i = Math.min(i + a, r), Math.round(i);
}
function Ao(e) {
	return e ? e >= 500 || e === 429 || e === 408 : !0;
}
var jo = class {
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
				let e = Do(d.status, d.statusText, f);
				if (Ao(d.status) && c < r) {
					s = e, await Oo(ko(c, i, a)), c++;
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
				let e = Eo("Request timeout", "TIMEOUT_ERROR", 408);
				if (c < r) {
					s = e, await Oo(ko(c, i, a)), c++;
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
			let t = Eo(e instanceof Error ? e.message : "Network error", "NETWORK_ERROR");
			if (c < r) {
				s = t, await Oo(ko(c, i, a)), c++;
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
			error: s ?? Eo("Max retries exceeded", "API_ERROR"),
			meta: {
				duration: Date.now() - n,
				retries: c
			}
		};
	}
	validateInput(e, t) {
		let n = e.safeParse(t);
		return n.success ? null : { error: Eo("Validation failed", "VALIDATION_ERROR", 400, n.error?.issues?.map((e) => ({
			field: e.path.map(String).join("."),
			message: e.message
		})) ?? []) };
	}
	async healthCheck() {
		return this.request("/health");
	}
	async createMemory(e) {
		let t = this.validateInput(_o, e);
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
		let n = this.validateInput(vo, t);
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
		let t = this.validateInput(yo, e);
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
		let t = this.validateInput(bo, e);
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
		let t = this.validateInput(_o, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async updateMemoryWithPreprocessing(e, t) {
		let n = this.validateInput(vo, t);
		return n ? { error: n.error } : this.request(`/memory/${encodeURIComponent(e)}`, {
			method: "PUT",
			body: JSON.stringify(t)
		});
	}
	async enhancedSearch(e) {
		let t = this.validateInput(Co, e);
		if (t) return { error: t.error };
		let n = this.enrichWithOrgContext(e);
		return this.request("/memory/search", {
			method: "POST",
			body: JSON.stringify(n)
		});
	}
	async getSearchAnalytics(e = {}) {
		let t = this.validateInput(wo, e);
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
function Mo(e) {
	return new jo(e);
}
typeof globalThis < "u" && "process" in globalThis && globalThis.process?.versions?.node;
//#endregion
//#region ../../node_modules/@lanonasis/memory-client/dist/react/index.js
var No = (0, L.createContext)(null);
function Po({ children: e, config: t, apiKey: n, apiUrl: r = "https://api.lanonasis.com", client: i }) {
	let a = (0, L.useMemo)(() => i || Mo({
		apiUrl: r,
		apiKey: n,
		...t
	}), [
		i,
		r,
		n,
		t
	]);
	return (0, L.createElement)(No.Provider, { value: a }, e);
}
function Fo() {
	let e = (0, L.useContext)(No);
	if (!e) throw Error("useMemoryClient must be used within a MemoryProvider");
	return e;
}
function Io(e) {
	let t = Fo(), [n, r] = (0, L.useState)([]), [i, a] = (0, L.useState)(!0), [o, s] = (0, L.useState)(null), c = (0, L.useCallback)(async () => {
		a(!0), s(null);
		let n = await t.listMemories(e);
		n.error ? (s(n.error), r([])) : n.data && r(n.data.data), a(!1);
	}, [t, JSON.stringify(e)]);
	return (0, L.useEffect)(() => {
		c();
	}, [c]), {
		memories: n,
		loading: i,
		error: o,
		refresh: c
	};
}
function Lo() {
	let e = Fo(), [t, n] = (0, L.useState)(!1), [r, i] = (0, L.useState)(null);
	return {
		createMemory: (0, L.useCallback)(async (t) => {
			n(!0), i(null);
			let r = await e.createMemory(t);
			return r.error ? (i(r.error), n(!1), null) : (n(!1), r.data || null);
		}, [e]),
		loading: t,
		error: r
	};
}
function Ro(e = 300) {
	let t = Fo(), [n, r] = (0, L.useState)([]), [i, a] = (0, L.useState)(!1), [o, s] = (0, L.useState)(null), [c, l] = (0, L.useState)(0), [u, d] = (0, L.useState)(0), f = (0, L.useRef)(null), p = (0, L.useCallback)(async (n, i) => {
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
	return (0, L.useEffect)(() => () => {
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
var zo = /* @__PURE__ */ o(((e) => {
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
})), Bo = /* @__PURE__ */ o(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case S: return "Suspense";
				case ne: return "SuspenseList";
				case C: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case ee: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case te:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case re: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case ie:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === ie) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function a() {
			var e = w.A;
			return e === null ? null : e.getOwner();
		}
		function o() {
			return Error("react-stack-top-frame");
		}
		function s(e) {
			if (oe.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function c(e, t) {
			function n() {
				ce || (ce = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function l() {
			var e = t(this.type);
			return le[e] || (le[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function u(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: l
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, o, l, d) {
			var f = n.children;
			if (f !== void 0) if (o) if (se(f)) {
				for (o = 0; o < f.length; o++) p(f[o]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (oe.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				o = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", ue[f + o] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", o, f, m, f), ue[f + o] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), s(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && c(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), u(e, f, i, a(), l, d);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === ie && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = d(), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), ae = Symbol.for("react.client.reference"), w = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = Object.prototype.hasOwnProperty, se = Array.isArray, T = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var ce, le = {}, E = h.react_stack_bottom_frame.bind(h, o)(), D = T(i(o)), ue = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > w.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : E, r ? T(i(e)) : D);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > w.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : E, r ? T(i(e)) : D);
		};
	})();
})), z = (/* @__PURE__ */ o(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = zo() : t.exports = Bo();
})))(), Vo = L.forwardRef(({ className: e = "", variant: t = "default", size: n = "default", children: r, ...i }, a) => /* @__PURE__ */ (0, z.jsx)("button", {
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
Vo.displayName = "Button";
//#endregion
//#region src/webview/components/ui/Input.tsx
var Ho = L.forwardRef(({ className: e = "", type: t = "text", ...n }, r) => /* @__PURE__ */ (0, z.jsx)("input", {
	ref: r,
	type: t,
	className: `vscode-input flex h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-3 py-1 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none focus:border-[var(--vscode-focusBorder)] disabled:cursor-not-allowed disabled:opacity-50 ${e}`,
	...n
}));
Ho.displayName = "Input";
//#endregion
//#region src/webview/components/L0Logo.tsx
var Uo = ({ className: e = "", size: t = 24 }) => /* @__PURE__ */ (0, z.jsx)("svg", {
	width: t,
	height: t,
	viewBox: "0 0 24 24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className: e,
	children: /* @__PURE__ */ (0, z.jsx)("path", {
		d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})
}), Wo = {
	search: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("circle", {
			cx: "11",
			cy: "11",
			r: "8"
		}), /* @__PURE__ */ (0, z.jsx)("path", { d: "m21 21-4.35-4.35" })]
	}),
	plus: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M12 5v14M5 12h14" })
	}),
	refresh: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("path", { d: "M23 4v6h-6M1 20v-6h6" }), /* @__PURE__ */ (0, z.jsx)("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })]
	}),
	settings: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "3"
		}), /* @__PURE__ */ (0, z.jsx)("path", { d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" })]
	}),
	logout: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" })
	}),
	chevronRight: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, z.jsx)("polyline", { points: "9,18 15,12 9,6" })
	}),
	globe: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, z.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}),
			/* @__PURE__ */ (0, z.jsx)("line", {
				x1: "2",
				y1: "12",
				x2: "22",
				y2: "12"
			}),
			/* @__PURE__ */ (0, z.jsx)("path", { d: "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" })
		]
	}),
	lightbulb: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" })
	}),
	file: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }), /* @__PURE__ */ (0, z.jsx)("polyline", { points: "14,2 14,8 20,8" })]
	}),
	send: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("line", {
			x1: "22",
			y1: "2",
			x2: "11",
			y2: "13"
		}), /* @__PURE__ */ (0, z.jsx)("polygon", { points: "22,2 15,22 11,13 2,9 22,2" })]
	}),
	paperclip: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" })
	}),
	edit: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("path", { d: "M12 20h9" }), /* @__PURE__ */ (0, z.jsx)("path", { d: "M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" })]
	}),
	trash: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [
			/* @__PURE__ */ (0, z.jsx)("polyline", { points: "3 6 5 6 21 6" }),
			/* @__PURE__ */ (0, z.jsx)("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }),
			/* @__PURE__ */ (0, z.jsx)("path", { d: "M10 11v6M14 11v6" }),
			/* @__PURE__ */ (0, z.jsx)("path", { d: "M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" })
		]
	}),
	copy: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("rect", {
			x: "9",
			y: "9",
			width: "13",
			height: "13",
			rx: "2",
			ry: "2"
		}), /* @__PURE__ */ (0, z.jsx)("path", { d: "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" })]
	}),
	close: /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		children: [/* @__PURE__ */ (0, z.jsx)("line", {
			x1: "18",
			y1: "6",
			x2: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, z.jsx)("line", {
			x1: "6",
			y1: "6",
			x2: "18",
			y2: "18"
		})]
	})
}, Go = [
	"context",
	"project",
	"knowledge",
	"reference",
	"personal",
	"workflow"
], Ko = (e) => {
	if (!e) return "—";
	try {
		return new Date(e).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		});
	} catch {
		return "—";
	}
}, qo = (e) => {
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
}, Jo = (e) => e && e.length > 0 ? e.join(", ") : "", Yo = (e) => e.split(",").map((e) => e.trim()).filter(Boolean), Xo = (e) => {
	if (!e) return "U";
	let t = e.trim();
	if (!t) return "U";
	let n = t.split(/\s+/).filter(Boolean);
	if (n.length === 1) {
		let e = n[0];
		return (e.includes("@") ? e.split("@")[0] : e).slice(0, 2).toUpperCase();
	}
	return (n[0][0] + n[n.length - 1][0]).toUpperCase();
}, Zo = (e, t) => {
	let n = t.toLowerCase();
	return e.title.toLowerCase().includes(n) || e.content.toLowerCase().includes(n) || (e.tags || []).some((e) => e.toLowerCase().includes(n));
}, Qo = ({ onLoginOAuth: e, onLoginApiKey: t, isLoading: n = !1, error: r = null }) => {
	let [i, a] = (0, L.useState)(!1), [o, s] = (0, L.useState)(""), c = () => {
		o.trim() && t && t(o.trim());
	};
	return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "space-y-3 select-none",
		children: /* @__PURE__ */ (0, z.jsxs)("div", {
			className: "space-y-2",
			children: [
				/* @__PURE__ */ (0, z.jsx)("h2", {
					className: "text-sm font-semibold text-[var(--vscode-editor-foreground)]",
					children: "Connect to sync memories"
				}),
				/* @__PURE__ */ (0, z.jsx)("p", {
					className: "text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed",
					children: "You can still work locally, but connecting unlocks sync and full AI search."
				}),
				r && /* @__PURE__ */ (0, z.jsx)("div", {
					className: "p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20",
					children: r
				}),
				i ? /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "space-y-2 pt-1",
					children: [/* @__PURE__ */ (0, z.jsx)(Ho, {
						type: "password",
						placeholder: "Enter your API key (lano_... or lns_...)",
						value: o,
						onChange: (e) => s(e.target.value),
						className: "h-8 text-[13px]",
						autoFocus: !0,
						onKeyDown: (e) => e.key === "Enter" && c()
					}), /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
							className: "flex-1",
							onClick: c,
							disabled: !o.trim() || n,
							children: n ? "Connecting..." : "Connect"
						}), /* @__PURE__ */ (0, z.jsx)(Vo, {
							variant: "secondary",
							onClick: () => {
								a(!1), s("");
							},
							children: "Cancel"
						})]
					})]
				}) : /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "space-y-2 pt-1",
					children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
						className: "w-full",
						onClick: e,
						disabled: n,
						children: n ? "Connecting..." : "Connect in Browser"
					}), /* @__PURE__ */ (0, z.jsx)(Vo, {
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
}, $o = ({ memory: e, onClick: t }) => /* @__PURE__ */ (0, z.jsxs)("div", {
	className: "group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]",
	onClick: t,
	children: [
		/* @__PURE__ */ (0, z.jsx)("div", {
			className: "flex items-start justify-between gap-2",
			children: /* @__PURE__ */ (0, z.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, z.jsx)("span", {
					className: "text-[var(--vscode-editor-foreground)] opacity-70 shrink-0",
					children: Wo.file
				}), /* @__PURE__ */ (0, z.jsx)("h3", {
					className: "text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1",
					children: e.title
				})]
			})
		}),
		/* @__PURE__ */ (0, z.jsxs)("div", {
			className: "flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5",
			children: [
				/* @__PURE__ */ (0, z.jsx)("span", {
					className: "opacity-60",
					children: Ko(e.created_at)
				}),
				/* @__PURE__ */ (0, z.jsx)("span", {
					className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
					children: e.memory_type
				}),
				e.tags?.slice(0, 2).map((e) => /* @__PURE__ */ (0, z.jsxs)("span", {
					className: "px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60",
					children: ["#", e]
				}, e))
			]
		}),
		e._pending && /* @__PURE__ */ (0, z.jsxs)("div", {
			className: "text-[10px] text-yellow-400 pl-5",
			children: ["Pending ", e._pending]
		})
	]
}), es = ({ title: e, isOpen: t, onToggle: n, actions: r }) => /* @__PURE__ */ (0, z.jsxs)("div", {
	className: "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group",
	onClick: n,
	children: [/* @__PURE__ */ (0, z.jsxs)("div", {
		className: "flex items-center",
		children: [/* @__PURE__ */ (0, z.jsx)("span", {
			className: `text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${t ? "rotate-90" : ""}`,
			children: Wo.chevronRight
		}), /* @__PURE__ */ (0, z.jsx)("span", {
			className: "text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase",
			children: e
		})]
	}), r && /* @__PURE__ */ (0, z.jsx)("div", {
		className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
		children: r
	})]
}), ts = ({ syncStatus: e, onSync: t, isAuthenticated: n, hasLocalMemories: r, onConnect: i }) => {
	let a = !n;
	return !a && e.isOnline && e.pendingCount === 0 ? null : /* @__PURE__ */ (0, z.jsxs)("div", {
		className: `px-3 py-2 text-[11px] flex items-center justify-between ${a ? "bg-blue-500/10 text-blue-300 border-b border-blue-500/20" : e.isOnline ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20" : "bg-red-500/10 text-red-400 border-b border-red-500/20"}`,
		children: [/* @__PURE__ */ (0, z.jsx)("div", {
			className: "flex items-center gap-2",
			children: a ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("span", {
				className: "opacity-80",
				children: Wo.globe
			}), /* @__PURE__ */ (0, z.jsxs)("span", { children: ["Local mode", r ? "" : " (no cache yet)"] })] }) : e.isOnline ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsxs)("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				className: "animate-pulse",
				children: [/* @__PURE__ */ (0, z.jsx)("path", { d: "M23 4v6h-6M1 20v-6h6" }), /* @__PURE__ */ (0, z.jsx)("path", { d: "M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })]
			}), /* @__PURE__ */ (0, z.jsxs)("span", { children: [e.pendingCount, " pending"] })] }) : /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsxs)("svg", {
				width: "12",
				height: "12",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				children: [
					/* @__PURE__ */ (0, z.jsx)("line", {
						x1: "1",
						y1: "1",
						x2: "23",
						y2: "23"
					}),
					/* @__PURE__ */ (0, z.jsx)("path", { d: "M16.72 11.06A10.94 10.94 0 0119 12.55" }),
					/* @__PURE__ */ (0, z.jsx)("path", { d: "M5 12.55a10.94 10.94 0 015.17-2.39" }),
					/* @__PURE__ */ (0, z.jsx)("path", { d: "M10.71 5.05A16 16 0 0122.58 9" }),
					/* @__PURE__ */ (0, z.jsx)("path", { d: "M1.42 9a15.91 15.91 0 014.7-2.88" }),
					/* @__PURE__ */ (0, z.jsx)("path", { d: "M8.53 16.11a6 6 0 016.95 0" }),
					/* @__PURE__ */ (0, z.jsx)("line", {
						x1: "12",
						y1: "20",
						x2: "12.01",
						y2: "20"
					})
				]
			}), /* @__PURE__ */ (0, z.jsx)("span", { children: "Offline" })] })
		}), a ? i && /* @__PURE__ */ (0, z.jsx)("button", {
			onClick: i,
			className: "text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors",
			children: "Connect"
		}) : e.pendingCount > 0 && e.isOnline && /* @__PURE__ */ (0, z.jsx)("button", {
			onClick: t,
			disabled: e.isSyncing,
			className: "text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50",
			children: e.isSyncing ? "Syncing..." : "Sync now"
		})]
	});
}, ns = ({ message: e, onOpenMemory: t }) => {
	let n = e.role === "user";
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: `flex flex-col gap-1 ${n ? "items-end" : "items-start"}`,
		children: [/* @__PURE__ */ (0, z.jsx)("div", {
			className: `max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${n ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]" : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"}`,
			children: e.content
		}), !n && e.memories && e.memories.length > 0 && /* @__PURE__ */ (0, z.jsxs)("div", {
			className: "w-full mt-2 space-y-1",
			children: [/* @__PURE__ */ (0, z.jsxs)("div", {
				className: "text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1",
				children: [
					"Related memories (",
					e.memories.length,
					")"
				]
			}), e.memories.slice(0, 3).map((e) => /* @__PURE__ */ (0, z.jsxs)("div", {
				className: "p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px] cursor-pointer hover:border-[var(--vscode-focusBorder)]",
				onClick: () => t?.(e),
				children: [
					/* @__PURE__ */ (0, z.jsx)("div", {
						className: "font-medium text-[var(--vscode-editor-foreground)] line-clamp-1",
						children: e.title
					}),
					/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5",
						children: [e.content.slice(0, 100), e.content.length > 100 ? "..." : ""]
					}),
					e._pending && /* @__PURE__ */ (0, z.jsx)("div", {
						className: "text-[10px] text-yellow-400 mt-1",
						children: "⏳ Pending sync"
					})
				]
			}, e.id))]
		})]
	});
}, rs = ({ initialChatInput: e = "", onAttachFromClipboard: t, isAuthenticated: n = !1, onLoginOAuth: r, onLoginApiKey: i, onLogout: a, authLoading: o = !1, authError: s = null, userEmail: c = null, userName: l = null, authMethod: u = "none" }) => {
	let { memories: d, loading: f, refresh: p } = Io({
		limit: 200,
		order: "desc"
	}), { createMemory: m, loading: h } = Lo(), { search: g, results: _, loading: v } = Ro(), y = Fo(), [b, x] = (0, L.useState)(""), [ee, te] = (0, L.useState)(e), [S, ne] = (0, L.useState)(!0), [re, ie] = (0, L.useState)(!0), [C, ae] = (0, L.useState)(!1), [w, oe] = (0, L.useState)([]), [se, T] = (0, L.useState)(!1), [ce, le] = (0, L.useState)([]), [E, D] = (0, L.useState)({
		isOnline: !0,
		lastSyncAt: null,
		pendingCount: 0,
		isSyncing: !1
	}), [ue, de] = (0, L.useState)(null), [O, fe] = (0, L.useState)(null), [pe, me] = (0, L.useState)(!1), [he, ge] = (0, L.useState)({
		title: "",
		content: "",
		memory_type: "knowledge",
		tags: ""
	}), [k, _e] = (0, L.useState)(!1), [ve, ye] = (0, L.useState)(!1), [be, A] = (0, L.useState)(""), [xe, Se] = (0, L.useState)(!1), Ce = (0, L.useRef)(null), we = (0, L.useRef)(null), j = (0, L.useRef)(null), Te = (e, t) => {
		e && oe((n) => n.map((n) => n.id === e && n.role === "assistant" ? t(n) : n));
	};
	(0, L.useEffect)(() => {
		if (ue) {
			let e = setTimeout(() => de(null), 5e3);
			return () => clearTimeout(e);
		}
	}, [ue]), (0, L.useEffect)(() => {
		e !== void 0 && te(e);
	}, [e]);
	let Ee = n && E.isOnline, De = ce.length > 0, Oe = !n || !E.isOnline, ke = n ? u === "apiKey" ? "API key" : "OAuth" : De ? "Local cache" : "Not connected", Ae = l || c || null, je = l && c ? c : null, Me = Ae || c || null, Ne = !!O && (O.id.startsWith("local_") || O._pending === "create");
	(0, L.useEffect)(() => {
		let e = (e) => {
			let t = e.data;
			if (!(!t || typeof t != "object")) {
				if (t.type === "lanonasis:cache:data" && (le(t.payload?.memories || []), t.payload?.status && D(t.payload.status)), t.type === "lanonasis:sync:start" && D((e) => ({
					...e,
					isSyncing: !0
				})), t.type === "lanonasis:sync:complete" && (le(t.payload?.memories || []), D((e) => t.payload?.status || {
					...e,
					isSyncing: !1,
					isOnline: !0
				})), t.type === "lanonasis:sync:error") {
					let e = t.payload?.isNetworkError === !0, n = t.payload?.error || "Sync failed";
					D((t) => ({
						...t,
						isSyncing: !1,
						isOnline: e ? !1 : t.isOnline
					})), de(e ? "Network error - working offline" : n);
				}
				if (t.type === "lanonasis:auth:result" && !t.payload?.success && de(t.payload?.error || "Authentication failed"), t.type === "lanonasis:ai:search:local") {
					let e = t.payload?.results || [], n = t.payload?.query || "", r = t.payload?.requestId;
					Te(r, (t) => ({
						...t,
						content: e.length > 0 ? `Found ${e.length} local memories:` : `No local matches for "${n}". Try saving more context or connect for full search.`,
						memories: e
					})), r && r === j.current && T(!1);
				}
				if (t.type === "lanonasis:ai:search:api") {
					let e = t.payload?.results || [], n = t.payload?.query || "", r = t.payload?.requestId;
					Te(r, (t) => {
						let r = new Set((t.memories || []).map((e) => e.id)), i = e.filter((e) => !r.has(e.id)), a = [...t.memories || [], ...i].slice(0, 5);
						return {
							...t,
							content: a.length > 0 ? `Found ${a.length} relevant memories:` : `No memories found for "${n}"`,
							memories: a
						};
					}), r && r === j.current && (j.current = null, T(!1));
				}
				if (t.type === "lanonasis:cache:added") {
					let e = t.payload?.memory;
					e && (le((t) => [e, ...t]), D((e) => ({
						...e,
						pendingCount: e.pendingCount + 1
					})));
				}
				if (t.type === "lanonasis:cache:updated") {
					let e = t.payload?.memory;
					e && (le((t) => t.map((t) => t.id === e.id || t._localId === e._localId ? e : t)), fe((t) => t && (t.id === e.id || t._localId === e._localId) ? e : t)), t.payload?.status && D(t.payload.status);
				}
				if (t.type === "lanonasis:cache:deleted") {
					let e = t.payload?.id;
					e && (le((t) => t.filter((t) => t.id !== e)), fe((t) => t && t.id === e ? null : t)), t.payload?.status && D(t.payload.status);
				}
				t.type === "lanonasis:cache:cleared" && (le([]), fe(null), t.payload?.status ? D(t.payload.status) : D((e) => ({
					...e,
					lastSyncAt: null,
					pendingCount: 0,
					isSyncing: !1
				})));
			}
		};
		return window.addEventListener("message", e), window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:get" }), () => window.removeEventListener("message", e);
	}, []), (0, L.useEffect)(() => {
		Ce.current && (Ce.current.scrollTop = Ce.current.scrollHeight);
	}, [w]), (0, L.useEffect)(() => {
		b.length > 2 && Ee && g(b);
	}, [
		b,
		g,
		Ee
	]);
	let Pe = (0, L.useMemo)(() => b.length <= 2 ? [] : ce.filter((e) => Zo(e, b)), [ce, b]), Fe = Oe || E.pendingCount > 0 ? ce : d, Ie = Ee && _.length > 0 ? _ : Pe, Le = b.length > 2 ? Ie : Fe.length > 0 ? Fe : ce, Re = async () => {
		let e = ee.trim() || b.trim();
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
			if (Ee) await m(t), te(""), await p();
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
			}), te(""));
		}
	}, ze = async () => {
		ae(!0);
		try {
			window.vscode && window.vscode.postMessage({ type: "lanonasis:cache:sync" }), n && await p();
		} finally {
			ae(!1);
		}
	}, Be = (e) => {
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
	}, Ve = (0, L.useCallback)((e) => {
		fe(e), ge({
			title: e.title || "",
			content: e.content || "",
			memory_type: e.memory_type || "knowledge",
			tags: Jo(e.tags)
		}), me(!1);
	}, []), He = (0, L.useCallback)(() => {
		fe(null), me(!1);
	}, []), Ue = (0, L.useCallback)((e) => {
		if (window.vscode) {
			window.vscode.postMessage({
				type: "lanonasis:clipboard:write",
				payload: { text: e }
			});
			return;
		}
		navigator.clipboard?.writeText && navigator.clipboard.writeText(e);
	}, []), We = (0, L.useCallback)(() => {
		O && (ge({
			title: O.title || "",
			content: O.content || "",
			memory_type: O.memory_type || "knowledge",
			tags: Jo(O.tags)
		}), me(!0));
	}, [O]), Ge = (0, L.useCallback)(async () => {
		if (!O) return;
		let e = {
			title: he.title.trim() || O.title,
			content: he.content.trim() || O.content,
			memory_type: he.memory_type || O.memory_type,
			tags: Yo(he.tags)
		};
		_e(!0);
		try {
			if (Ee) {
				let t = await y.updateMemory(O.id, e);
				if (t?.error) throw Error(t.error);
				let n = t?.data || O;
				fe(n), le((e) => e.map((e) => e.id === n.id ? n : e)), me(!1), await p();
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
			})), me(!1);
		} catch (e) {
			de(e instanceof Error ? e.message : "Update failed");
		} finally {
			_e(!1);
		}
	}, [
		O,
		he.title,
		he.content,
		he.memory_type,
		he.tags,
		Ee,
		y,
		p
	]), Ke = (0, L.useCallback)(async () => {
		if (O && window.confirm(`Delete "${O.title}"? This cannot be undone.`)) {
			_e(!0);
			try {
				if (Ne) window.vscode && window.vscode.postMessage({
					type: "lanonasis:cache:delete",
					payload: { id: O.id }
				});
				else if (Ee) {
					let e = await y.deleteMemory(O.id);
					if (e?.error) throw Error(e.error);
					await p();
				} else window.vscode && window.vscode.postMessage({
					type: "lanonasis:cache:delete",
					payload: { id: O.id }
				});
				le((e) => e.filter((e) => e.id !== O.id)), fe(null);
			} catch (e) {
				de(e instanceof Error ? e.message : "Delete failed");
			} finally {
				_e(!1);
			}
		}
	}, [
		O,
		Ee,
		y,
		p
	]), qe = (0, L.useCallback)(() => {
		ye(!0);
	}, []), Je = (0, L.useCallback)(() => {
		ye(!1), Se(!1), A("");
	}, []), Ye = (0, L.useCallback)(() => {
		be.trim() && (i && i(be.trim()), A(""), Se(!1));
	}, [be, i]), Xe = async () => {
		let e = ee.trim();
		if (!e) return;
		let t = {
			id: `user_${Date.now()}`,
			role: "user",
			content: e,
			timestamp: Date.now()
		};
		oe((e) => [...e, t]), te("");
		let n = Be(e);
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
			if (Ee) try {
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
			let e = (Ee && d.length > 0 ? d : ce).slice(0, 5), t = {
				id: `assistant_${Date.now()}`,
				role: "assistant",
				content: e.length > 0 ? "Here are your recent memories:" : "I don't have any memories yet. Try saving one!",
				memories: e,
				timestamp: Date.now()
			};
			oe((e) => [...e, t]);
			return;
		}
		T(!0);
		let r = {
			id: `assistant_${Date.now()}`,
			role: "assistant",
			content: `🔍 Searching for: "${n.query}"`,
			memories: [],
			timestamp: Date.now()
		};
		if (j.current = r.id, oe((e) => [...e, r]), window.vscode) window.vscode.postMessage({
			type: "lanonasis:ai:search",
			payload: {
				query: n.query,
				requestId: r.id
			}
		});
		else try {
			await g(n.query);
			let e = ce.filter((e) => Zo(e, n.query));
			Te(r.id, (t) => ({
				...t,
				content: e && e.length > 0 ? `Found ${e.length} relevant memories:` : `No memories found for "${n.query}"`,
				memories: e || []
			}));
		} catch (e) {
			console.log("Search failed:", e);
		} finally {
			j.current = null, T(!1);
		}
	};
	return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none",
		children: /* @__PURE__ */ (0, z.jsxs)("div", {
			className: "w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative",
			children: [
				ue && /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, z.jsx)("span", {
						className: "text-[11px] text-red-200",
						children: ue
					}), /* @__PURE__ */ (0, z.jsx)("button", {
						onClick: () => de(null),
						className: "text-red-200 hover:text-white text-xs ml-2",
						children: "✕"
					})]
				}),
				/* @__PURE__ */ (0, z.jsxs)("div", {
					className: "flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]",
					children: [/* @__PURE__ */ (0, z.jsx)("div", {
						className: "flex items-center gap-2",
						children: Me ? /* @__PURE__ */ (0, z.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, z.jsx)("div", {
								className: "h-6 w-6 rounded-full bg-[var(--vscode-badge-background)]/30 text-[10px] font-semibold text-[var(--vscode-editor-foreground)] flex items-center justify-center",
								children: Xo(Me)
							}), /* @__PURE__ */ (0, z.jsxs)("div", {
								className: "flex flex-col leading-tight",
								children: [/* @__PURE__ */ (0, z.jsx)("span", {
									className: "text-[11px] font-semibold text-[var(--vscode-sideBarTitle-foreground)] max-w-[150px] truncate",
									children: Ae
								}), je && /* @__PURE__ */ (0, z.jsx)("span", {
									className: "text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[150px] truncate",
									children: je
								})]
							})]
						}) : /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Uo, {
							className: "h-4 w-4 text-[var(--vscode-icon-foreground)]",
							size: 16
						}), /* @__PURE__ */ (0, z.jsx)("span", {
							className: "text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]",
							children: "LanOnasis Memory"
						})] })
					}), /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, z.jsxs)("div", {
								className: "flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]",
								children: [/* @__PURE__ */ (0, z.jsx)("div", {
									className: `h-1.5 w-1.5 rounded-full ${n ? E.isOnline ? "bg-green-500" : "bg-red-500" : "bg-yellow-500"}`,
									title: n ? E.isOnline ? "Online" : "Offline" : "Local"
								}), /* @__PURE__ */ (0, z.jsx)("span", { children: n ? E.isOnline ? "Online" : "Offline" : "Local" })]
							}),
							/* @__PURE__ */ (0, z.jsx)("span", {
								className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80",
								children: ke
							}),
							Oe && /* @__PURE__ */ (0, z.jsx)("span", {
								className: "text-[10px] text-blue-300/90",
								children: "Local mode"
							}),
							n && /* @__PURE__ */ (0, z.jsx)("span", {
								className: "text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80",
								children: E.isSyncing ? "Syncing..." : E.pendingCount > 0 ? `${E.pendingCount} pending` : E.lastSyncAt ? `Synced ${Ko(new Date(E.lastSyncAt).toISOString())}` : "Not synced"
							}),
							/* @__PURE__ */ (0, z.jsx)(Vo, {
								variant: "ghost",
								size: "icon",
								title: "Settings",
								onClick: qe,
								children: Wo.settings
							}),
							n && /* @__PURE__ */ (0, z.jsx)(Vo, {
								variant: "ghost",
								size: "icon",
								title: "Logout",
								onClick: a,
								children: Wo.logout
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, z.jsx)(ts, {
					syncStatus: E,
					onSync: ze,
					isAuthenticated: n,
					hasLocalMemories: De,
					onConnect: qe
				}),
				/* @__PURE__ */ (0, z.jsxs)("div", {
					className: "flex-1 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, z.jsx)(es, {
							title: "Memory Assistant",
							isOpen: S,
							onToggle: () => ne(!S)
						}),
						S && /* @__PURE__ */ (0, z.jsxs)("div", {
							ref: Ce,
							className: "min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3 bg-[var(--vscode-sideBar-background)]",
							children: [w.length === 0 ? /* @__PURE__ */ (0, z.jsx)("div", {
								className: "text-[13px] text-[var(--vscode-foreground)] flex flex-col items-center justify-center text-center py-4",
								children: n ? /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
									/* @__PURE__ */ (0, z.jsx)("div", {
										className: "text-[var(--vscode-button-background)] mb-2",
										children: Wo.lightbulb
									}),
									/* @__PURE__ */ (0, z.jsx)("p", {
										className: "italic opacity-90",
										children: "Ask me to find or save memories"
									}),
									/* @__PURE__ */ (0, z.jsx)("p", {
										className: "text-[11px] mt-1 opacity-70",
										children: "Try: \"find my OAuth notes\""
									})
								] }) : /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("p", {
									className: "italic opacity-90",
									children: "Local mode: search cached memories or save new ones."
								}), /* @__PURE__ */ (0, z.jsx)("p", {
									className: "text-[11px] mt-1 opacity-70",
									children: "Connect for full AI search and sync."
								})] })
							}) : w.map((e) => /* @__PURE__ */ (0, z.jsx)(ns, {
								message: e,
								onOpenMemory: Ve
							}, e.id)), se && /* @__PURE__ */ (0, z.jsxs)("div", {
								className: "flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]",
								children: [/* @__PURE__ */ (0, z.jsxs)("svg", {
									className: "animate-spin h-3 w-3",
									viewBox: "0 0 24 24",
									children: [/* @__PURE__ */ (0, z.jsx)("circle", {
										className: "opacity-25",
										cx: "12",
										cy: "12",
										r: "10",
										stroke: "currentColor",
										strokeWidth: "4",
										fill: "none"
									}), /* @__PURE__ */ (0, z.jsx)("path", {
										className: "opacity-75",
										fill: "currentColor",
										d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									})]
								}), "Searching..."]
							})]
						}),
						/* @__PURE__ */ (0, z.jsx)(es, {
							title: `Memories${E.pendingCount > 0 ? ` (${E.pendingCount} pending)` : ""}`,
							isOpen: re,
							onToggle: () => ie(!re),
							actions: (n || ce.length > 0) && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
								variant: "ghost",
								size: "icon",
								onClick: () => we.current?.focus(),
								children: Wo.search
							}), /* @__PURE__ */ (0, z.jsx)(Vo, {
								variant: "ghost",
								size: "icon",
								onClick: ze,
								disabled: !n,
								children: /* @__PURE__ */ (0, z.jsx)("span", {
									className: C || E.isSyncing ? "animate-spin" : "",
									children: Wo.refresh
								})
							})] })
						}),
						re && /* @__PURE__ */ (0, z.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, z.jsxs)("div", {
								className: "p-2 space-y-2",
								children: [
									!n && /* @__PURE__ */ (0, z.jsx)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3",
										children: /* @__PURE__ */ (0, z.jsx)(Qo, {
											onLoginOAuth: r,
											onLoginApiKey: i,
											isLoading: o,
											error: s
										})
									}),
									/* @__PURE__ */ (0, z.jsx)(Ho, {
										ref: we,
										placeholder: "Search memories...",
										value: b,
										onChange: (e) => x(e.target.value),
										className: "h-7 text-[13px]"
									}),
									/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex gap-2 mb-4",
										children: [/* @__PURE__ */ (0, z.jsxs)(Vo, {
											className: "flex-1 h-7 gap-1.5",
											onClick: Re,
											disabled: h,
											children: [h ? /* @__PURE__ */ (0, z.jsxs)("svg", {
												className: "animate-spin h-3 w-3",
												viewBox: "0 0 24 24",
												children: [/* @__PURE__ */ (0, z.jsx)("circle", {
													className: "opacity-25",
													cx: "12",
													cy: "12",
													r: "10",
													stroke: "currentColor",
													strokeWidth: "4",
													fill: "none"
												}), /* @__PURE__ */ (0, z.jsx)("path", {
													className: "opacity-75",
													fill: "currentColor",
													d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												})]
											}) : Wo.plus, h ? "Creating..." : Ee ? "Create" : "Save Local"]
										}), /* @__PURE__ */ (0, z.jsxs)(Vo, {
											className: "flex-1 h-7 gap-1.5",
											variant: "secondary",
											onClick: ze,
											disabled: !n || C || E.isSyncing,
											children: [/* @__PURE__ */ (0, z.jsx)("span", {
												className: C || E.isSyncing ? "animate-spin" : "",
												children: Wo.refresh
											}), C || E.isSyncing ? "Syncing..." : "Sync"]
										})]
									}),
									/* @__PURE__ */ (0, z.jsx)("div", {
										className: "space-y-0.5",
										children: f || v ? /* @__PURE__ */ (0, z.jsx)("div", {
											className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]",
											children: "Loading..."
										}) : Le.length === 0 ? /* @__PURE__ */ (0, z.jsx)("div", {
											className: "p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]",
											children: b ? "No memories found" : ce.length > 0 ? "Loading from cache..." : "No memories yet. Create one!"
										}) : Le.map((e) => /* @__PURE__ */ (0, z.jsx)($o, {
											memory: e,
											onClick: () => Ve(e)
										}, e.id))
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, z.jsx)("div", {
					className: "p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]",
					children: /* @__PURE__ */ (0, z.jsxs)("div", {
						className: "relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors",
						children: [
							/* @__PURE__ */ (0, z.jsx)("div", {
								className: "p-2 pb-8",
								children: /* @__PURE__ */ (0, z.jsx)("textarea", {
									value: ee,
									onChange: (e) => te(e.target.value),
									onKeyDown: (e) => {
										e.key === "Enter" && !e.shiftKey && (e.preventDefault(), Xe());
									},
									placeholder: n ? "Ask me anything... (e.g., 'find my OAuth notes')" : "Search cached memories or save a note",
									className: "w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
								})
							}),
							/* @__PURE__ */ (0, z.jsx)("div", {
								className: "absolute left-2 bottom-1.5 flex gap-1",
								children: /* @__PURE__ */ (0, z.jsx)(Vo, {
									size: "icon",
									variant: "ghost",
									className: "h-6 w-6",
									onClick: t,
									title: "Attach from clipboard",
									children: Wo.paperclip
								})
							}),
							/* @__PURE__ */ (0, z.jsx)("div", {
								className: "absolute right-2 bottom-1.5",
								children: /* @__PURE__ */ (0, z.jsx)(Vo, {
									size: "icon",
									className: "h-6 w-6",
									disabled: !ee.trim() || se,
									onClick: Xe,
									title: "Send (Enter)",
									children: se ? /* @__PURE__ */ (0, z.jsxs)("svg", {
										className: "animate-spin h-3 w-3",
										viewBox: "0 0 24 24",
										children: [/* @__PURE__ */ (0, z.jsx)("circle", {
											className: "opacity-25",
											cx: "12",
											cy: "12",
											r: "10",
											stroke: "currentColor",
											strokeWidth: "4",
											fill: "none"
										}), /* @__PURE__ */ (0, z.jsx)("path", {
											className: "opacity-75",
											fill: "currentColor",
											d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										})]
									}) : Wo.send
								})
							})
						]
					})
				}),
				O && /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "absolute inset-0 z-40",
					style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
					children: [/* @__PURE__ */ (0, z.jsx)("div", {
						className: "absolute inset-0",
						onClick: He
					}), /* @__PURE__ */ (0, z.jsx)("div", {
						className: "relative h-full w-full p-3",
						children: /* @__PURE__ */ (0, z.jsxs)("div", {
							className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3",
							children: [
								/* @__PURE__ */ (0, z.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Memory Detail"
											}),
											/* @__PURE__ */ (0, z.jsx)("h3", {
												className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]",
												children: O.title
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
												children: [
													qo(O.updated_at || O.created_at),
													" • ",
													O.memory_type,
													" • ",
													Ne ? "Local" : "Synced",
													O._pending ? ` (${O._pending})` : ""
												]
											})
										]
									}), /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, z.jsx)(Vo, {
												variant: "ghost",
												size: "icon",
												title: "Copy content",
												onClick: () => Ue(O.content),
												children: Wo.copy
											}),
											/* @__PURE__ */ (0, z.jsx)(Vo, {
												variant: "ghost",
												size: "icon",
												title: "Edit memory",
												onClick: We,
												children: Wo.edit
											}),
											/* @__PURE__ */ (0, z.jsx)(Vo, {
												variant: "ghost",
												size: "icon",
												title: "Delete memory",
												onClick: Ke,
												disabled: k,
												children: Wo.trash
											}),
											/* @__PURE__ */ (0, z.jsx)(Vo, {
												variant: "ghost",
												size: "icon",
												title: "Close",
												onClick: He,
												children: Wo.close
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, z.jsx)("div", {
									className: "flex-1 overflow-y-auto mt-3",
									children: pe ? /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex flex-col gap-3",
										children: [
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, z.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Title"
												}), /* @__PURE__ */ (0, z.jsx)(Ho, {
													value: he.title,
													onChange: (e) => ge((t) => ({
														...t,
														title: e.target.value
													})),
													className: "h-8 text-[13px]"
												})]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, z.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Type"
												}), /* @__PURE__ */ (0, z.jsx)("select", {
													value: he.memory_type,
													onChange: (e) => ge((t) => ({
														...t,
														memory_type: e.target.value
													})),
													className: "vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]",
													children: Go.map((e) => /* @__PURE__ */ (0, z.jsx)("option", {
														value: e,
														children: e
													}, e))
												})]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, z.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Tags (comma separated)"
												}), /* @__PURE__ */ (0, z.jsx)(Ho, {
													value: he.tags,
													onChange: (e) => ge((t) => ({
														...t,
														tags: e.target.value
													})),
													className: "h-8 text-[13px]"
												})]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, z.jsx)("label", {
													className: "text-[11px] text-[var(--vscode-descriptionForeground)]",
													children: "Content"
												}), /* @__PURE__ */ (0, z.jsx)("textarea", {
													value: he.content,
													onChange: (e) => ge((t) => ({
														...t,
														content: e.target.value
													})),
													className: "vscode-input w-full min-h-[140px] rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] p-2 text-[13px] text-[var(--vscode-input-foreground)] resize-none"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex flex-col gap-3",
										children: [/* @__PURE__ */ (0, z.jsx)("div", {
											className: "text-[13px] text-[var(--vscode-editor-foreground)]",
											style: { whiteSpace: "pre-wrap" },
											children: O.content
										}), O.tags?.length > 0 && /* @__PURE__ */ (0, z.jsx)("div", {
											className: "flex gap-1",
											style: { flexWrap: "wrap" },
											children: O.tags.map((e, t) => /* @__PURE__ */ (0, z.jsxs)("span", {
												className: "px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]",
												children: ["#", e]
											}, `${e}-${t}`))
										})]
									})
								}),
								/* @__PURE__ */ (0, z.jsx)("div", {
									className: "pt-3 border-t border-[var(--vscode-panel-border)] mt-3",
									children: pe ? /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
											className: "flex-1 h-7",
											onClick: Ge,
											disabled: k,
											children: k ? "Saving..." : "Save Changes"
										}), /* @__PURE__ */ (0, z.jsx)(Vo, {
											className: "flex-1 h-7",
											variant: "secondary",
											onClick: () => me(!1),
											disabled: k,
											children: "Cancel"
										})]
									}) : /* @__PURE__ */ (0, z.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]",
										children: [/* @__PURE__ */ (0, z.jsxs)("span", { children: ["Updated ", qo(O.updated_at)] }), O._pending && /* @__PURE__ */ (0, z.jsx)("span", {
											className: "text-yellow-400",
											children: "Pending sync"
										})]
									})
								})
							]
						})
					})]
				}),
				ve && /* @__PURE__ */ (0, z.jsxs)("div", {
					className: "absolute inset-0 z-50",
					style: { backgroundColor: "rgba(0, 0, 0, 0.35)" },
					children: [/* @__PURE__ */ (0, z.jsx)("div", {
						className: "absolute inset-0",
						onClick: Je
					}), /* @__PURE__ */ (0, z.jsx)("div", {
						className: "relative h-full w-full p-3",
						children: /* @__PURE__ */ (0, z.jsxs)("div", {
							className: "flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3",
							children: [/* @__PURE__ */ (0, z.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, z.jsx)("h3", {
									className: "text-[14px] font-semibold text-[var(--vscode-editor-foreground)]",
									children: "Settings"
								}), /* @__PURE__ */ (0, z.jsx)(Vo, {
									variant: "ghost",
									size: "icon",
									title: "Close",
									onClick: Je,
									children: Wo.close
								})]
							}), /* @__PURE__ */ (0, z.jsxs)("div", {
								className: "flex-1 overflow-y-auto mt-3 space-y-3",
								children: [
									/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Connection"
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: [
													"Status:",
													" ",
													n ? E.isOnline ? "Online" : "Offline" : "Local"
												]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["Auth: ", ke]
											}),
											(l || c) && /* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["User: ", l || c]
											}),
											l && c && /* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: ["Email: ", c]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: [
													"Last sync:",
													" ",
													E.lastSyncAt ? qo(new Date(E.lastSyncAt).toISOString()) : "—"
												]
											}),
											/* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-editor-foreground)]",
												children: ["Pending changes: ", E.pendingCount]
											})
										]
									}),
									/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "API Access"
											}),
											n ? /* @__PURE__ */ (0, z.jsxs)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: [
													"Connected via ",
													ke,
													"."
												]
											}) : /* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: "Connect to sync and search across devices."
											}),
											xe ? /* @__PURE__ */ (0, z.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, z.jsx)(Ho, {
													type: "password",
													placeholder: "Enter your API key (lano_... or lns_...)",
													value: be,
													onChange: (e) => A(e.target.value),
													className: "h-8 text-[13px]",
													onKeyDown: (e) => e.key === "Enter" && Ye()
												}), /* @__PURE__ */ (0, z.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
														className: "flex-1",
														onClick: Ye,
														disabled: !be.trim() || o,
														children: o ? "Connecting..." : "Save API Key"
													}), /* @__PURE__ */ (0, z.jsx)(Vo, {
														className: "flex-1",
														variant: "secondary",
														onClick: () => {
															Se(!1), A("");
														},
														children: "Cancel"
													})]
												})]
											}) : /* @__PURE__ */ (0, z.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, z.jsx)(Vo, {
													className: "flex-1 h-7",
													onClick: r,
													disabled: o,
													children: o ? "Connecting..." : "Connect in Browser"
												}), /* @__PURE__ */ (0, z.jsx)(Vo, {
													className: "flex-1 h-7",
													variant: "secondary",
													onClick: () => Se(!0),
													disabled: o,
													children: "Enter API Key"
												})]
											}),
											/* @__PURE__ */ (0, z.jsx)(Vo, {
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
									/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [
											/* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
												children: "Cache"
											}),
											/* @__PURE__ */ (0, z.jsx)("div", {
												className: "text-[12px] text-[var(--vscode-descriptionForeground)]",
												children: "Clear cached memories and pending changes stored locally."
											}),
											/* @__PURE__ */ (0, z.jsx)(Vo, {
												className: "w-full h-7",
												variant: "secondary",
												onClick: () => {
													window.confirm("Clear cached memories and pending changes? This cannot be undone.") && window.vscode?.postMessage({ type: "lanonasis:cache:clear" });
												},
												children: "Clear Local Cache"
											})
										]
									}),
									/* @__PURE__ */ (0, z.jsxs)("div", {
										className: "rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2",
										children: [/* @__PURE__ */ (0, z.jsx)("div", {
											className: "text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70",
											children: "Extension Settings"
										}), /* @__PURE__ */ (0, z.jsx)(Vo, {
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
var is = document.getElementById("root"), as = {
	apiUrl: "https://api.lanonasis.com",
	pending: /* @__PURE__ */ new Map()
}, os = !1, ss = 0;
function cs(e) {
	e && (as.apiUrl = e);
}
function ls(e) {
	return typeof e == "string" ? e : e instanceof URL ? e.toString() : e.url;
}
function us(e) {
	try {
		let t = new URL(e, window.location.href), n = new URL(as.apiUrl);
		return t.origin === n.origin && t.pathname.startsWith("/api/");
	} catch {
		return !1;
	}
}
function ds(e) {
	let t = new Headers(e || {}), n = {};
	return t.forEach((e, t) => {
		n[t] = e;
	}), delete n.authorization, delete n.Authorization, delete n["x-api-key"], delete n["X-API-Key"], n;
}
async function fs(e, t, n) {
	let r = n.toUpperCase();
	if (!(r === "GET" || r === "HEAD")) {
		if (typeof t?.body == "string") return t.body;
		if (t?.body instanceof URLSearchParams) return t.body.toString();
		if (t?.body != null) return String(t.body);
		if (e instanceof Request) return await e.clone().text() || void 0;
	}
}
function ps(e) {
	let t = e.data;
	if (!t || t.type !== "lanonasis:api:response") return;
	let n = t.payload || {}, r = n.requestId;
	if (!r) return;
	let i = as.pending.get(r);
	if (!i) return;
	if (as.pending.delete(r), window.clearTimeout(i.timeoutId), n.error) {
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
function ms() {
	if (os || typeof window > "u" || typeof window.fetch != "function") return;
	os = !0;
	let e = window.fetch.bind(window);
	window.addEventListener("message", ps), window.fetch = async (t, n) => {
		let r = ls(t);
		if (!us(r) || !window.vscode || typeof window.vscode.postMessage != "function") return t instanceof URL ? e(t.toString(), n) : e(t, n);
		let i = n?.method || (t instanceof Request ? t.method : "GET"), a = ds(n?.headers || (t instanceof Request ? t.headers : void 0)), o = await fs(t, n, i), s = `api_${Date.now()}_${ss++}`;
		return new Promise((e, t) => {
			let n = window.setTimeout(() => {
				as.pending.delete(s), t(/* @__PURE__ */ Error("API proxy timed out"));
			}, 3e4);
			as.pending.set(s, {
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
ms();
function hs() {
	let [e, t] = (0, L.useState)(""), [n, r] = (0, L.useState)("https://api.lanonasis.com"), [i, a] = (0, L.useState)(!1), [o, s] = (0, L.useState)("none"), [c, l] = (0, L.useState)(!1), [u, d] = (0, L.useState)(null), [f, p] = (0, L.useState)(null);
	return (0, L.useEffect)(() => {
		if (!window.vscode || typeof window.vscode.getState != "function") return;
		let e = window.vscode.getState?.() || {};
		e.injectedChat && t(e.injectedChat), e.authError !== void 0 && d(e.authError);
	}, []), (0, L.useEffect)(() => {
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
					e && (r(e), cs(e)), t !== void 0 && (a(t), l(!1), d(null)), i !== void 0 && s(i), o !== void 0 && p(o);
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
	}, []), /* @__PURE__ */ (0, z.jsx)(Po, {
		apiUrl: n,
		children: /* @__PURE__ */ (0, z.jsx)(rs, {
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
is && ho.createRoot(is).render(/* @__PURE__ */ (0, z.jsx)(L.StrictMode, { children: /* @__PURE__ */ (0, z.jsx)(hs, {}) }));
//#endregion
