import type { FastifyInstance } from "fastify";
import { rootRoute } from "../modules/root/root.route.js";
import { summaryRoutes } from "../modules/portfolio/portofolio.route.js";
import { profileRoutes } from "../modules/profile/profile.route.js";

export const apiRouter = async (app: FastifyInstance) => {
  app.register(rootRoute);

  app.register(summaryRoutes);
  app.register(profileRoutes);
};
