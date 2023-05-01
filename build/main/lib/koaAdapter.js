"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
// @ts-ignore
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('inertia-node-adapter:koa');
exports.headers = {
    xInertia: 'x-inertia',
    xInertiaVersion: 'x-inertia-version',
    xInertiaLocation: 'x-inertia-location',
    xInertiaPartialData: 'x-inertia-partial-data',
    xInertiaPartialComponent: 'x-inertia-partial-component',
};
const inertia = function ({ version, html, flashMessages }) {
    return (ctx, next) => {
        if (ctx.method === 'GET' &&
            ctx.headers[exports.headers.xInertia] &&
            ctx.headers[exports.headers.xInertiaVersion] !== version) {
            ctx.status = 409;
            ctx.append(exports.headers.xInertiaLocation, ctx.url);
            return;
        }
        let _viewData = {};
        let _sharedProps = {};
        let _statusCode = 200;
        let _headers = {};
        const Inertia = {
            setViewData(viewData) {
                _viewData = viewData;
                return this;
            },
            shareProps(sharedProps) {
                _sharedProps = Object.assign(Object.assign({}, _sharedProps), sharedProps);
                return this;
            },
            setStatusCode(statusCode) {
                _statusCode = statusCode;
                return this;
            },
            setHeaders(headers) {
                _headers = Object.assign(Object.assign({}, _headers), headers);
                return this;
            },
            async render(_a) {
                var _b, e_1, _c, _d;
                var { props } = _a, pageRest = __rest(_a, ["props"]);
                const _page = Object.assign(Object.assign({}, pageRest), { url: ctx.originalUrl || ctx.url, version,
                    props });
                log('rendering', _page);
                if (flashMessages) {
                    this.shareProps(flashMessages(ctx));
                }
                const allProps = Object.assign(Object.assign({}, _sharedProps), props);
                let dataKeys;
                if (ctx.headers[exports.headers.xInertiaPartialData] &&
                    ctx.headers[exports.headers.xInertiaPartialComponent] === _page.component) {
                    // @ts-ignore
                    dataKeys = ctx.headers[exports.headers.xInertiaPartialData].split(',');
                }
                else {
                    log('partial requests without the name of the component return a full request', _page.component);
                    log('header component', ctx.headers[exports.headers.xInertiaPartialComponent]);
                    dataKeys = Object.keys(allProps);
                }
                // we need to clear the props object on each call
                const propsRecord = {};
                try {
                    for (var _e = true, dataKeys_1 = __asyncValues(dataKeys), dataKeys_1_1; dataKeys_1_1 = await dataKeys_1.next(), _b = dataKeys_1_1.done, !_b;) {
                        _d = dataKeys_1_1.value;
                        _e = false;
                        try {
                            const key = _d;
                            log('parsing props keys', dataKeys);
                            let value;
                            if (typeof allProps[key] === 'function') {
                                value = await allProps[key]();
                                log('prop promise resolved', key);
                            }
                            else {
                                value = allProps[key];
                            }
                            propsRecord[key] = value;
                        }
                        finally {
                            _e = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_e && !_b && (_c = dataKeys_1.return)) await _c.call(dataKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                _page.props = propsRecord;
                log('Page props built', _page.props);
                if (ctx.headers[exports.headers.xInertia]) {
                    ctx.status = _statusCode;
                    ctx.set(Object.assign(Object.assign({}, _headers), { 'Content-Type': 'application/json', [exports.headers.xInertia]: 'true', Vary: 'Accept' }));
                    ctx.body = JSON.stringify(_page);
                }
                else {
                    ctx.status = _statusCode;
                    ctx.set(Object.assign(Object.assign({}, _headers), { 'Content-Type': 'text/html' }));
                    ctx.body = html(_page, _viewData);
                }
                return this;
            },
            redirect(url) {
                const statusCode = ['PUT', 'PATCH', 'DELETE'].includes(ctx.method)
                    ? 303
                    : 302;
                ctx.status = statusCode;
                ctx.set(Object.assign(Object.assign({}, _headers), { Location: url }));
                return ctx;
            },
        };
        ctx.Inertia = Inertia;
        return next();
    };
};
exports.default = inertia;
//# sourceMappingURL=koaAdapter.js.map