import type { FastifyInstance } from "fastify";

export const rootRoute = async (app: FastifyInstance) => {
  app.get("/", async (request, _reply) => {
    request.log.info("Health check hit!");

    return {
      status: "ok",
      message: "Qulls Porto Server is running! 🚀",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    };
  });
};
