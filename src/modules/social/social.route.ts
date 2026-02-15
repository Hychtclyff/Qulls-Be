import type { FastifyInstance } from "fastify";
import { socialController } from "./social.controller.js";
import * as schema from "./social.schema.js";

const prefix = "/social";

export async function socialRoutes(fastify: FastifyInstance) {
  fastify.get(
    prefix,
    { schema: schema.getSocialsSchema },
    socialController.index,
  );

  fastify.get(
    prefix + "/:id",
    { schema: schema.getSocialDetailSchema },
    socialController.show,
  );

  fastify.post(
    prefix,
    { schema: schema.postSocialSchema },
    socialController.add,
  );

  fastify.patch(
    prefix + "/:id",
    { schema: schema.patchSocialSchema },
    socialController.update,
  );

  fastify.delete(
    prefix + "/:id",
    { schema: schema.deleteSocialSchema },
    socialController.destroy,
  );
}
