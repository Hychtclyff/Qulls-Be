import type { SwaggerOptions } from "@fastify/swagger";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

// Hanya berisi objek konfigurasi statis
export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: "Qulls Porto API",
      description: "API Documentation for Qulls Porto Website",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8080", description: "Local Dev" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
  staticCSP: true,
};
