import { Type, type Static } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
  PORT: Type.Number({ default: 8080 }),
  NODE_ENV: Type.String({ default: "development" }),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String({ minLength: 10 }),
});

export type EnvType = Static<typeof EnvSchema>;

export const envConfig = {
  schema: EnvSchema,
  dotenv: true,
  data: process.env,
};

declare module "fastify" {
  interface FastifyInstance {
    config: EnvType;
  }
}
