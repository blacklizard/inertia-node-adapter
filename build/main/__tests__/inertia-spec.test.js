"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const koaAdapter_1 = require("../lib/koaAdapter");
const koa_folio_1 = require("./koa.folio");
function skip(skip = true) {
    return (test) => test.skip(skip, 'Skip');
}
const cookies = {
    koa: 'koa.sess',
    express: 'connect.sid',
};
(0, koa_folio_1.describe)('Inertia adapter', () => {
    (0, koa_folio_1.afterEach)(async ({ koa }) => {
        koa.sandbox.reset();
    });
    (0, koa_folio_1.it)('responds with the html page provided in initialization if no inertia header is there', async ({ port, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/home`, {
            headers: {},
        });
        const html = await result.text();
        (0, koa_folio_1.expect)(html).toMatchSnapshot();
    });
    (0, koa_folio_1.it)('responds with a json response with encoded page object when inertia header is present and version is the same', async ({ port, koa, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/home`, {
            headers: { 'X-Inertia': 'true', 'X-Inertia-Version': '1' },
        });
        (0, koa_folio_1.expect)(await result.json()).toMatchObject(koa.metadata.pages.home);
    });
    (0, koa_folio_1.it)('includes partial data headers on partial request', async ({ port, koa, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/partial-optimized`, {
            headers: {
                'X-Inertia': 'true',
                'X-Inertia-Version': '1',
                'X-Inertia-Partial-Data': 'numbers',
                'X-Inertia-Partial-Component': 'partial-component',
            },
        });
        (0, koa_folio_1.expect)(result.status).toBe(200);
        (0, koa_folio_1.expect)(await result.json()).toMatchObject(Object.assign(Object.assign({}, koa.metadata.pages.partial), { props: { numbers: [1, 2, 3] } }));
        // we are not resetting fake function calls. Might fail
        (0, koa_folio_1.expect)(koa.metadata.fakes.bigNumbers.callCount).toBe(0);
        (0, koa_folio_1.expect)(koa.metadata.fakes.numbers.callCount).toBe(1);
    });
    (0, koa_folio_1.it)('partial requests without the name of the component return a full request', async ({ port, koa, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/partial-optimized`, {
            headers: {
                'X-Inertia': 'true',
                'X-Inertia-Version': '1',
                'X-Inertia-Partial-Data': 'numbers',
            },
        });
        (0, koa_folio_1.expect)(result.status).toBe(200);
        (0, koa_folio_1.expect)(await result.json()).toMatchObject(Object.assign(Object.assign({}, koa.metadata.pages.partial), { props: { numbers: [1, 2, 3] } }));
        (0, koa_folio_1.expect)(koa.metadata.fakes.bigNumbers.callCount).toBe(1);
        (0, koa_folio_1.expect)(koa.metadata.fakes.numbers.callCount).toBe(1);
    });
    (0, koa_folio_1.it)('includes all data headers on none partial request', skip(false), async ({ port, koa }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/partial-optimized`, {
            headers: {
                'X-Inertia': 'true',
                'X-Inertia-Version': '1',
            },
        });
        (0, koa_folio_1.expect)(result.status).toBe(200);
        (0, koa_folio_1.expect)(await result.json()).toMatchObject(Object.assign(Object.assign({}, koa.metadata.pages.partial), { props: { numbers: [1, 2, 3], bigNumbers: [44, 33, 1123] } }));
        (0, koa_folio_1.expect)(koa.metadata.fakes.bigNumbers.callCount).toBe(1);
        (0, koa_folio_1.expect)(koa.metadata.fakes.numbers.callCount).toBe(1);
    });
    (0, koa_folio_1.it)('flash messages are shared as props', async ({ port, koa, type }) => {
        var _a;
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/flash`, {
            headers: { 'X-Inertia': 'true', 'X-Inertia-Version': '1' },
        });
        // flash messages are stored in a cookie
        (0, koa_folio_1.expect)((_a = result.headers.get('set-cookie')) === null || _a === void 0 ? void 0 : _a.startsWith(cookies[type])).toBe(true);
        const jsonResult = await result.json();
        (0, koa_folio_1.expect)(jsonResult).toMatchObject(Object.assign(Object.assign({}, koa.metadata.pages.home), { url: '/flash', props: Object.assign(Object.assign({}, koa.metadata.pages.home.props), { success: ['User created successfully'] }) }));
    });
    (0, koa_folio_1.it)('re-flashes data when flash session data exists when a 409 Conflict', async ({ port, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/flash`, {
            headers: { 'X-Inertia': 'true', 'X-Inertia-Version': '2' },
        });
        (0, koa_folio_1.expect)(result.status).toBe(409);
        (0, koa_folio_1.expect)(result.statusText).toBe('Conflict');
        (0, koa_folio_1.expect)(result.headers.get(koaAdapter_1.headers.xInertiaLocation)).toBe(`/flash`);
        (0, koa_folio_1.expect)(result.headers.get('set-cookie')).toBe(null);
        // no flash messages
    });
    (0, koa_folio_1.it)('responds with 409 conflict when inertia header is present and version is different', skip(false), async ({ port }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/home`, {
            headers: { 'X-Inertia': 'true', 'X-Inertia-Version': '2' },
        });
        (0, koa_folio_1.expect)(result.status).toBe(409);
        (0, koa_folio_1.expect)(result.statusText).toBe('Conflict');
        (0, koa_folio_1.expect)(result.headers.get(koaAdapter_1.headers.xInertiaLocation)).toBe(`/home`);
    });
    (0, koa_folio_1.it)('Note, `409 Conflict` responses are only sent for `GET` requests, and not for POST/PUT/PATCH/DELETE requests', async ({ port, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/home`, {
            body: '12',
            method: 'POST',
            headers: { 'X-Inertia': 'true', 'X-Inertia-Version': '2' },
        });
        (0, koa_folio_1.expect)(result.status).toBe(200);
    });
    (0, koa_folio_1.it)('Partial Reload If the final destination is different for whatever reason, no partial reload occurs', async ({ koa, port, }) => {
        const result = await (0, node_fetch_1.default)(`http://localhost:${port}/partial-optimized?redirect=home`, {
            headers: {
                'X-Inertia': 'true',
                'X-Inertia-Version': '1',
                'X-Inertia-Partial-Data': 'numbers',
            },
        });
        (0, koa_folio_1.expect)(result.status).toBe(200);
        (0, koa_folio_1.expect)(await result.json()).toMatchObject(Object.assign(Object.assign({}, koa.metadata.pages.home), { url: '/partial-optimized?redirect=home' }));
        (0, koa_folio_1.expect)(koa.metadata.fakes.bigNumbers.callCount).toBe(0);
        (0, koa_folio_1.expect)(koa.metadata.fakes.numbers.callCount).toBe(0);
    });
});
//# sourceMappingURL=inertia-spec.test.js.map