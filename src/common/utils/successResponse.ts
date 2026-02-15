import { Type } from "@sinclair/typebox";

export const successResponse = (dataSchema: any) =>
  Type.Object({
    success: Type.Boolean({ default: true }),
    message: Type.String(),
    data: dataSchema,
  });

export const errorResponseSchema = Type.Object({
  success: Type.Boolean({ default: false }),
  message: Type.String(),
});
