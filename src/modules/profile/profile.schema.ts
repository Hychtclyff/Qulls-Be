import { Type, type Static } from "@sinclair/typebox";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {
  profiles,
  socialLinks as socialLinksTable,
} from "../../common/db/schema/index.js";

const baseSelectProfile = createSelectSchema(profiles, {
  createdAt: Type.String(),
});
const baseSelectSocial = createSelectSchema(socialLinksTable);
const baseInsertProfile = createInsertSchema(profiles, {
  id: Type.Optional(Type.Number()),
  createdAt: Type.Optional(Type.String()),
  email: Type.String({ format: "email" }),
});

export const profileParamsSchema = Type.Object({
  id: Type.Number(),
});

export const createProfilePayloadSchema = Type.Omit(baseInsertProfile, [
  "id",
  "createdAt",
]);
export const updateProfilePayloadSchema = Type.Partial(
  createProfilePayloadSchema,
);

export type ProfileParams = Static<typeof profileParamsSchema>;
export type CreateProfileBody = Static<typeof createProfilePayloadSchema>;
export type UpdateProfileBody = Static<typeof updateProfilePayloadSchema>;

const successResponse = (dataSchema: any) =>
  Type.Object({
    success: Type.Boolean({ default: true }),
    message: Type.String(),
    data: dataSchema,
  });

export const getProfileSchema = {
  tags: ["profile"],
  summary: "Get profile detail",
  response: {
    200: successResponse(
      Type.Optional(
        Type.Intersect([
          baseSelectProfile,
          Type.Object({ socialLinks: Type.Array(baseSelectSocial) }),
        ]),
      ),
    ),
    404: Type.Object({
      success: Type.Boolean({ default: false }),
      message: Type.String(),
    }),
  },
};

export const postProfileSchema = {
  tags: ["profile"],
  summary: "Create Profile",
  body: createProfilePayloadSchema,
  response: {
    201: successResponse(baseSelectProfile),
  },
};

export const patchProfileSchema = {
  tags: ["profile"],
  summary: "Update Profile",
  params: profileParamsSchema,
  body: updateProfilePayloadSchema,
  response: {
    200: successResponse(baseSelectProfile),
    404: Type.Object({ success: Type.Boolean(), message: Type.String() }),
  },
};

export const deleteProfileSchema = {
  tags: ["profile"],
  summary: "Delete Profile",
  params: profileParamsSchema,
  response: {
    200: successResponse(Type.Optional(baseSelectProfile)),
  },
};
export const getProfileDetailSchema = {
  tags: ["profile"],
  summary: "Get profile by ID",
  params: profileParamsSchema,
  response: {
    200: successResponse(
      Type.Optional(
        Type.Intersect([
          baseSelectProfile,
          Type.Object({ socialLinks: Type.Array(baseSelectSocial) }),
        ]),
      ),
    ),
  },
};
