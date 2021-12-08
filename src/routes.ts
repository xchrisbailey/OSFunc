import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from "fastify";
import { getRanks } from "./lib/ranking";

export default (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  next
): void => {
  fastify.get(
    "/rank",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const res = await getRanks();
        reply.send(res);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  next();
};
