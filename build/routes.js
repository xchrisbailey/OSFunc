"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ranking_1 = require("./lib/ranking");
exports.default = (fastify, _options, next) => {
    fastify.get("/rank", async (_request, reply) => {
        try {
            const res = await (0, ranking_1.getRanks)();
            reply.send(res);
        }
        catch (error) {
            reply.code(500).send(error);
        }
    });
    next();
};
//# sourceMappingURL=routes.js.map