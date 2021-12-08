"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({
    logger: true,
});
const port = process.env.PORT || 4000;
const fatal = (err) => {
    server.log.error(err);
    process.exit(1);
};
server.register(require("./routes"));
server
    .listen(port, "0.0.0.0")
    .then((address) => {
    server.log.info(`server listening on ${address}`);
})
    .catch(fatal);
//# sourceMappingURL=index.js.map