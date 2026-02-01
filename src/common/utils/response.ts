import type { FastifyReply } from "fastify";

type Meta = Record<string, any>;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
}

/* =======================
   SUCCESS RESPONSES
======================= */

export const res200 = <T>(
  reply: FastifyReply,
  message = "Success",
  data?: T,
  meta?: Meta,
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
  };

  return reply.status(200).send(response);
};

export const res201 = <T>(
  reply: FastifyReply,
  message = "Created",
  data?: T,
) => {
  return reply.status(201).send({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

export const res204 = (reply: FastifyReply) => {
  return reply.status(204).send();
};
