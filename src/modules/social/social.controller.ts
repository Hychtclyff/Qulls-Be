import type { FastifyReply, FastifyRequest } from "fastify";
import { socialService } from "./social.service.js";
import { res200 } from "../../common/utils/response.js";
import type { SocialInsert, SocialUpdate } from "./social.schema.js";
import type { idParams } from "../../common/schema/shared.js";

export const socialController = {
  index: async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await socialService.read();

    if (!data) {
      return res200(reply, "No social links data yet", []);
    }
    return res200(reply, "Social links fetched", data);
  },

  show: async (
    request: FastifyRequest<{ Params: idParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    const data = await socialService.read(id);
    return res200(reply, "Social link fetched", data);
  },

  add: async (
    request: FastifyRequest<{ Body: SocialInsert }>,
    reply: FastifyReply,
  ) => {
    const data = await socialService.create(request.body);
    return reply.code(201).send({
      success: true,
      message: "Social link created",
      data,
    });
  },

  update: async (
    request: FastifyRequest<{ Params: idParams; Body: SocialUpdate }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;

    await socialService.read(id);

    const data = await socialService.update(id, request.body);
    return res200(reply, "Social link updated successfully", data);
  },

  destroy: async (
    request: FastifyRequest<{ Params: idParams }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const data = await socialService.remove(id);

    return res200(reply, "Social link deleted successfully", data);
  },
};
