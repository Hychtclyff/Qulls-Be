import { eq } from "drizzle-orm";
import { db } from "../../common/configs/db.js";
import { experienceTable } from "../../common/db/schema/experiences.js";
import { profileTable } from "../../common/db/schema/profile.js";
import { projectTable } from "../../common/db/schema/projects.js";
import { skillTable } from "../../common/db/schema/skills.js";
import { Error404 } from "../../common/errors/http-error.js";

export const getSummaryService = async () => {
  const [profileData, skillsData, projectData, experienceData] =
    await Promise.all([
      db.select().from(profileTable).limit(1),
      db.select().from(skillTable),
      db.select().from(projectTable).where(eq(projectTable.isFeatured, true)),
      db.select().from(experienceTable),
    ]);

  if (!profileData.length) {
    throw new Error404("Profile Not Found!");
  }

  return {
    profile: profileData[0] ?? [],
    skills: skillsData ?? [],
    featuredProjects: projectData ?? [],
    experiences: experienceData ?? [],
  };
};
