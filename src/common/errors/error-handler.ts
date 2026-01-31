import type { FastifyError, FastifyReply } from "fastify";
import type { FastifyRequest } from "fastify/types/request.js";

export const globalErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!error.statusCode || error.statusCode >= 500) {
    request.log.error(error);
  }

  if (error.validation) {
    return reply.status(400).send({
      status: "fail",
      type: "VALIDATION_ERROR",
      message: "Input Data Tidak Valid!",
      error: error.validation.map((err) => ({
        field: err.instancePath.replace("/", ""),
        message: err.message,
      })),
    });
  }

  if (error.statusCode && error.statusCode < 500) {
    return reply.status(error.statusCode).send({
      status: "fail",
      type: error.name || "HTTP_ERROR",
      message: error.message,
    });
  }

  return reply.status(500).send({
    status: "fail",
    type: "INTERNA;_SERVER_ERROR",
    message: "Terjadi Kesalahan Pada Server. Silahkan Coba Lagi Nanti! ",
    debug: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
