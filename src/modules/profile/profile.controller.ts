import type { FastifyReply, FastifyRequest } from "fastify";
import * as profileService from "./profile.service.js";
import { res200 } from "../../common/utils/response.js";
import type { CreateProfileBody, UpdateProfileBody } from "./profile.schema.js";
import type { idParams } from "../../common/schema/shared.js";

export const profileController = {
  index: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await profileService.read();

    if (!data) {
      return res200(reply, "No profile data yet", null);
    }
    return res200(reply, "Main profile fetched", data);
  },

  show: async (
    request: FastifyRequest<{ Params: idParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const data = await profileService.read(id);

    if (!data) {
      return reply
        .code(404)
        .send({ success: false, message: "Profile not found" });
    }
    return res200(reply, "Profile fetched", data);
  },

  add: async (
    request: FastifyRequest<{ Body: CreateProfileBody }>,
    reply: FastifyReply,
  ) => {
    const data = await profileService.add(request.body);
    return reply.code(201).send({
      success: true,
      message: "Profile created",
      data,
    });
  },

  update: async (
    request: FastifyRequest<{ Params: idParams; Body: UpdateProfileBody }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const existing = await profileService.read(id);
    if (!existing) {
      return reply
        .code(404)
        .send({ success: false, message: "Profile not found" });
    }

    const data = await profileService.update(id, request.body);
    return res200(reply, "Profile updated successfully", data);
  },

  destroy: async (
    request: FastifyRequest<{ Params: idParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const data = await profileService.remove(id);

    return res200(reply, "Profile deleted successfully", data);
  },
};
