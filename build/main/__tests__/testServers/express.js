"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressServer = exports.getHtml = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const expressAdapter_1 = __importDefault(require("../../lib/expressAdapter"));
const expressFlash_1 = __importDefault(require("../../lib/expressFlash"));
function getHtml(page) {
    return `<!DOCTYPE html><html dir="ltr" lang="en">
<head><meta charset="utf-8"><title>Inertia adapter</title></head>
<body><div data-page='${(0, json_stable_stringify_1.default)(page)}'></div>
</body></html>`;
}
exports.getHtml = getHtml;
const version = '1';
function expressServer({ sandbox }) {
    const app = (0, express_1.default)();
    app.use((0, express_session_1.default)({ secret: 'secret' }));
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
    const router = express_1.default.Router();
    router.get('/flash', async (req, _res, next) => {
        // set session data
        //@ts-ignore
        req.flash.setFlashMessage('success', 'User created successfully');
        //@ts-ignore
        req.Inertia.render(pages.home);
        return next();
    });
    router.get('/home', async (req, _res, next) => {
        //@ts-ignore
        req.Inertia.render(pages.home);
        return next();
    });
    router.post('/home', async (req, _res, next) => {
        //@ts-ignore
        req.Inertia.render(pages.home);
        return next();
    });
    router.get('/partial-optimized', async (req, _res, next) => {
        var _a;
        if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.redirect) {
            //@ts-ignore
            await req.Inertia.render(pages.home);
        }
        else {
            //@ts-ignore
            await req.Inertia.render(pages.partial);
        }
        return next();
    });
    app.use((0, expressFlash_1.default)());
    app.use((0, expressAdapter_1.default)({
        version,
        html: getHtml,
        flashMessages: (req) => {
            //@ts-ignore
            const messages = req.flash.flashAll();
            return messages;
        },
    }));
    app.use(router);
    return { app, metadata, sandbox };
}
exports.expressServer = expressServer;
//# sourceMappingURL=express.js.map