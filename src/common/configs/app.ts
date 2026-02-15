import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { envConfig } from "./env.config.js";
import { swaggerConfig, swaggerUiConfig } from "./swagger.js";
import fastifySensible from "@fastify/sensible";
import { globalErrorHandler } from "../errors/error-handler.js";
import { apiRouter } from "../../routes/index.js";
import { fastifyConfig } from "./fastify.config.js";
import cors from "@fastify/cors";

export const buildUp = async () => {
  const app = Fastify(fastifyConfig).withTypeProvider<TypeBoxTypeProvider>();

  await app.register(fastifyEnv, envConfig);

  app.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.register(swagger, swaggerConfig);

  app.register(swaggerUi, swaggerUiConfig);

  app.register(fastifySensible);

  app.register(apiRouter, { prefix: "/api/v1" });

  app.setErrorHandler(globalErrorHandler);

  return app;
};
