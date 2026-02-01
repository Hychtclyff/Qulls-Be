import type { FastifyReply, FastifyRequest } from "fastify";
import { getSummaryService } from "./portofolio.service.js";
import { res200 } from "../../common/utils/response.js";

export const getSummaryController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const data = await getSummaryService();
  console.log("DATA KE RESPONSE:", data);

  return res200(reply, "Summary fetched successfully", data);
};
