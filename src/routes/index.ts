import type { FastifyInstance } from "fastify";
import { rootRoute } from "../modules/root/root.route.js";

export const apiRouter = async (app: FastifyInstance) => {
  app.register(rootRoute);
};
