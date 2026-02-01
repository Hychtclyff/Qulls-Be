import type { FastifyInstance } from "fastify";
import { rootRoute } from "../modules/root/root.route.js";
import { summaryRoutes } from "../modules/portfolio/portofolio.route.js";

export const apiRouter = async (app: FastifyInstance) => {
  app.register(rootRoute);

  app.register(summaryRoutes);
};
