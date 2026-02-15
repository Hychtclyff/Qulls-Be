import { Type, type Static } from "@sinclair/typebox";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { socialLinks } from "../../common/db/schema/index.js";
import {
  errorResponseSchema,
  successResponse,
} from "../../common/utils/successResponse.js";
import { idParamsSchema } from "../../common/schema/shared.js";

export const insertSocialSchema = createInsertSchema(socialLinks, {
  id: Type.Optional(Type.Number()),
  profileId: Type.Number(),
  name: Type.String({ minLength: 2, examples: ["GitHub", "LinkedIn"] }),
  handle: Type.Optional(Type.String()),
  url: Type.String({ format: "uri", examples: ["https://github.com/yudi"] }),
  iconName: Type.String({ minLength: 1 }),
  bgColor: Type.Optional(
    Type.String({ pattern: "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" }),
  ),
});

export const baseSelectSocial = createSelectSchema(socialLinks);

export const updateSocialSchema = Type.Partial(insertSocialSchema);

export const socialParamsSchema = Type.Object({
  id: Type.Number({ description: "Social Link ID" }),
});

export const getSocialsSchema = {
  tags: ["social-links"],
  summary: "Get all social links",
  response: {
    200: successResponse(Type.Array(baseSelectSocial)),
  },
};

export const getSocialDetailSchema = {
  tags: ["social-links"],
  summary: "Get social link by ID",
  params: idParamsSchema,
  response: {
    200: successResponse(baseSelectSocial),
    404: errorResponseSchema,
  },
};

export const postSocialSchema = {
  tags: ["social-links"],
  summary: "Create social link",
  body: insertSocialSchema,
  response: {
    201: successResponse(baseSelectSocial),
  },
};

export const patchSocialSchema = {
  tags: ["social-links"],
  summary: "Update social link",
  params: idParamsSchema,
  body: updateSocialSchema,
  response: {
    200: successResponse(baseSelectSocial),
    404: Type.Object({ success: Type.Boolean(), message: Type.String() }),
  },
};

export const deleteSocialSchema = {
  tags: ["social-links"],
  summary: "Delete social link",
  params: idParamsSchema,
  response: {
    200: successResponse(Type.Optional(baseSelectSocial)),
  },
};

export type SocialInsert = Static<typeof insertSocialSchema>;
export type SocialUpdate = Static<typeof updateSocialSchema>;
export type SocialResponse = Static<typeof baseSelectSocial>;
