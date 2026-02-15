import type { FastifyInstance } from "fastify";
import { profileController } from "./profile.controller.js";
import {
  deleteProfileSchema,
  getProfileDetailSchema,
  getProfileSchema,
  patchProfileSchema,
  postProfileSchema,
  profileParamsSchema,
  updateProfilePayloadSchema,
} from "./profile.schema.js";

export async function profileRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/profile",
    { schema: getProfileSchema },
    profileController.index,
  );

  fastify.get(
    "/profile/:id",
    { schema: getProfileDetailSchema },
    profileController.show,
  );

  fastify.post(
    "/profile",
    {
      schema: postProfileSchema,
    },
    profileController.add,
  );

  fastify.patch(
    "/profile/:id",
    {
      schema: patchProfileSchema,
    },
    profileController.update,
  );
  fastify.delete(
    "/profile/:id",
    {
      schema: deleteProfileSchema,
    },
    profileController.destroy,
  );
}
