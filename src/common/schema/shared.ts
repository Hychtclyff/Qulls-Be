import { Type, type Static } from "@sinclair/typebox";

export const idParamsSchema = Type.Object({
  id: Type.Number(),
});
export type idParams = Static<typeof idParamsSchema>;
