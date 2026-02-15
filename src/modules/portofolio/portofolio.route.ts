import type { FastifyInstance } from "fastify";
import { getSummaryController } from "./portofolio.controller.js";
import { getSummarySchema } from "./portofolio.schema.js";

export async function summaryRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/portofolio/summary",
    {
      schema: getSummarySchema,
    },
    getSummaryController,
  );
}
