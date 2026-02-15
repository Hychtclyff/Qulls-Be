import { eq } from "drizzle-orm";
import { db } from "../../common/configs/db.js";
import { socialLinks } from "../../common/db/schema/index.js";
import { Error404 } from "../../common/errors/http-error.js";

export const socialService = {
  read: async (id?: number) => {
    if (id) {
      const data = await db.query.socialLinks.findFirst({
        where: (social, { eq }) => eq(social.id, id),
      });

      if (!data) throw new Error404("Social link not found");

      return data;
    }

    return await db.query.socialLinks.findMany();
  },

  create: async (payload: any) => {
    const [inserted] = await db.insert(socialLinks).values(payload).returning();
    return inserted;
  },

  update: async (id: number, payload: any) => {
    const [updated] = await db
      .update(socialLinks)
      .set(payload)
      .where(eq(socialLinks.id, id))
      .returning();

    if (!updated) throw new Error404("Social link not found for update");
    return updated;
  },

  remove: async (id: number) => {
    const [deleted] = await db
      .delete(socialLinks)
      .where(eq(socialLinks.id, id))
      .returning();

    if (!deleted) throw new Error404("Social link not found for deletion");
    return deleted;
  },
};
