"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterEach = exports.beforeEach = exports.expect = exports.describe = exports.it = void 0;
// koa.folio.ts
const http_1 = require("http");
const folio_1 = require("folio");
const sinon_1 = __importDefault(require("sinon"));
const testServers_1 = __importDefault(require("./testServers"));
const fixtures = folio_1.folio.extend();
// |port| fixture has a unique value value of the worker process index.
fixtures.port.init(async ({ testWorkerIndex }, run) => {
    await run(3005 + testWorkerIndex);
}, { scope: 'worker' });
fixtures.type.initParameter('API version', 'koa');
// |koa| fixture starts automatically for every worker.
fixtures.koa.init(async ({ port, type }, run) => {
    const newSandbox = sinon_1.default.createSandbox();
    const { app, metadata, sandbox } = (0, testServers_1.default)(type, { sandbox: newSandbox });
    let server = new http_1.Server(); // hack to fix typescript complaining about use before assigned
    console.log('Starting server...');
    await new Promise((f) => {
        server = app.listen(port, () => f(1));
    });
    console.log('Server ready');
    await run({ server, metadata, sandbox });
    console.log('Stopping server...');
    await new Promise((f) => server.close(f));
    console.log('Server stopped');
}, { scope: 'worker', auto: true });
const { it, describe, expect, beforeEach, afterEach } = fixtures.build();
exports.it = it;
exports.describe = describe;
exports.expect = expect;
exports.beforeEach = beforeEach;
exports.afterEach = afterEach;
//# sourceMappingURL=koa.folio.js.map