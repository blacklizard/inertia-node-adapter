// koa.folio.ts
import { Server } from 'http';
import { folio as base } from 'folio';
import sinon from 'sinon';
import getServer from './testServers';
const fixtures = base.extend();
// |port| fixture has a unique value value of the worker process index.
fixtures.port.init(async ({ testWorkerIndex }, run) => {
    await run(3005 + testWorkerIndex);
}, { scope: 'worker' });
fixtures.type.initParameter('API version', 'koa');
// |koa| fixture starts automatically for every worker.
fixtures.koa.init(async ({ port, type }, run) => {
    const newSandbox = sinon.createSandbox();
    const { app, metadata, sandbox } = getServer(type, { sandbox: newSandbox });
    let server = new Server(); // hack to fix typescript complaining about use before assigned
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
export { it, describe, expect, beforeEach, afterEach };
//# sourceMappingURL=koa.folio.js.map