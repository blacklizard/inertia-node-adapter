import { expressServer } from './express';
import { koaServer } from './koa';
export default function getServer(type, options) {
    if (type === 'koa') {
        return koaServer(options);
    }
    else if (type === 'express') {
        return expressServer(options);
    }
    throw new Error('not supported server type');
}
//# sourceMappingURL=index.js.map