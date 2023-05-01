"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const koa_1 = require("./koa");
function getServer(type, options) {
    if (type === 'koa') {
        return (0, koa_1.koaServer)(options);
    }
    else if (type === 'express') {
        return (0, express_1.expressServer)(options);
    }
    throw new Error('not supported server type');
}
exports.default = getServer;
//# sourceMappingURL=index.js.map