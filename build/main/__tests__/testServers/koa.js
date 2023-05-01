"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.koaServer = exports.getHtml = void 0;
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("@koa/router"));
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const koa_1 = __importDefault(require("koa"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_static_1 = __importDefault(require("koa-static"));
const koaAdapter_1 = __importDefault(require("../../lib/koaAdapter"));
const koaFlash_1 = __importDefault(require("../../lib/koaFlash"));
function getHtml(page) {
    return `<!DOCTYPE html><html dir="ltr" lang="en">
<head><meta charset="utf-8"><title>Inertia adapter</title></head>
<body><div data-page='${(0, json_stable_stringify_1.default)(page)}'></div>
</body></html>`;
}
exports.getHtml = getHtml;
const version = '1';
function koaServer({ sandbox }) {
    const app = new koa_1.default();
    app.keys = ['some secret'];
    app.use((0, koa_session_1.default)({
        maxAge: 86400000,
    }, app));
    const fakes = {
        numbers: sandbox.fake.resolves([1, 2, 3]),
        bigNumbers: sandbox.fake.resolves([44, 33, 1123]),
    };
    const pages = {
        index: { component: 'index', props: { name: 'SERVER' }, url: '/', version },
        home: { component: 'app-home', props: { name: 1 }, url: '/home', version },
        partial: {
            component: 'partial-component',
            version,
            url: '/partial-optimized',
            props: {
                numbers: fakes.numbers,
                bigNumbers: fakes.bigNumbers,
            },
        },
    };
    const metadata = { fakes, pages };
    const router = new router_1.default();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this fixes a bug with session trying to access app.keys using this.keys
    router.keys = app.keys;
    router.get('/flash', async (ctx, next) => {
        // set session data
        ctx.flash.setFlashMessage('success', 'User created successfully');
        ctx.Inertia.render(pages.home);
        return next();
    });
    router.get('/home', async (ctx, next) => {
        ctx.Inertia.render(pages.home);
        return next();
    });
    router.post('/home', async (ctx, next) => {
        ctx.Inertia.render(pages.home);
        return next();
    });
    router.get('/partial-optimized', async (ctx, next) => {
        var _a;
        if ((_a = ctx.query) === null || _a === void 0 ? void 0 : _a.redirect) {
            await ctx.Inertia.render(pages.home);
        }
        else {
            await ctx.Inertia.render(pages.partial);
        }
        return next();
    });
    app.use((0, koaFlash_1.default)());
    app.use((0, koa_static_1.default)(path_1.default.join(__dirname, '..', '..', 'www'), { brotli: true, gzip: true }));
    app.use((0, koaAdapter_1.default)({
        version,
        html: getHtml,
        flashMessages: (ctx) => ctx.flash.flashAll(),
    }));
    app.use(router.routes());
    app.use(router.allowedMethods());
    return { app, metadata, sandbox };
}
exports.koaServer = koaServer;
//# sourceMappingURL=koa.js.map