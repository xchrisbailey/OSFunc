import fastify from "fastify";

const server = fastify({
  logger: true,
});

const port = process.env.PORT || 4000;

const fatal = (err: Error) => {
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
