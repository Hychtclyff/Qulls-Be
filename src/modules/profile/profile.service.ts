import { db } from "../../common/configs/db.js";
import { Error400, Error404 } from "../../common/errors/http-error.js";
import type { newProfile, UpdateProfile } from "../../common/db/types/index.js";
import { profiles } from "../../common/db/schema/index.js";
import { eq } from "drizzle-orm";

export const read = async (id?: number) => {
  if (id) {
    return await db.query.profiles.findFirst({
      where: (profiles, { eq }) => eq(profiles.id, id),
      with: { socialLinks: true },
    });
  }

  return await db.query.profiles.findFirst({
    with: { socialLinks: true },
  });
};

export const add = async (payload: newProfile) => {
  const existingProfile = await db.query.profiles.findFirst();

  if (existingProfile) {
    throw new Error400(
      "Profile already exists. You can only have one profile.",
    );
  }

  const [createdProfile] = await db
    .insert(profiles)
    .values(payload)
    .returning();

  return createdProfile;
};

export const update = async (id: number, payload: UpdateProfile) => {
  const existingProfile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, id),
  });

  if (!existingProfile) {
    throw new Error404("Profile Not Found!");
  }
  const [updatedProfile] = await db
    .update(profiles)
    .set(payload)
    .where(eq(profiles.id, id))
    .returning();

  return updatedProfile;
};

export const remove = async (id: number) => {
  const existingProfile = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, id),
  });

  if (!existingProfile) {
    throw new Error404("Profile Not Found!");
  }

  const [deletedProfile] = await db
    .delete(profiles)
    .where(eq(profiles.id, id))
    .returning();

  return deletedProfile;
};
