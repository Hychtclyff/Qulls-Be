import type { FastifyContextConfig } from "fastify";

export const fastifyConfig = {
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
};
