import { db } from "../../common/configs/db.js";
import { Error404 } from "../../common/errors/http-error.js";

export const getSummaryService = async () => {
  const [profile, skills, projects, experiences, education, certifications] =
    await Promise.all([
      db.query.profiles.findFirst({
        with: {
          socialLinks: true,
        },
      }),

      db.query.skills.findMany({
        orderBy: (skills, { asc }) => [
          asc(skills.categoryId),
          asc(skills.name),
        ],
        with: {
          category: true,
        },
      }),

      db.query.projects.findMany({
        where: (projects, { eq }) => eq(projects.public, true),
        orderBy: (projects, { desc }) => [desc(projects.id)],
        with: {
          method: true,
          skills: {
            with: {
              skill: {
                with: {
                  category: true,
                },
              },
            },
          },
        },
      }),

      db.query.experiences.findMany({
        orderBy: (experiences, { desc }) => [desc(experiences.id)],
      }),

      db.query.education.findMany({
        orderBy: (education, { desc }) => [desc(education.period)],
      }),

      db.query.certifications.findMany({
        orderBy: (certifications, { desc }) => [desc(certifications.year)],
        with: {
          issuer: true,
        },
      }),
    ]);

  if (!profile) {
    throw new Error404("Profile Not Found! Please run seed script.");
  }

  const formattedProjects = projects.map((project) => ({
    ...project,

    techStack: project.skills.map((ps) => ({
      ...ps.skill,
      category: ps.skill.category?.name || "Uncategorized",
    })),

    skills: undefined,
  }));

  const formattedSkills = skills.map((skill) => ({
    ...skill,
    category: skill.category?.name || "Uncategorized",
  }));

  const formattedCertifications = certifications.map((cert) => ({
    ...cert,
    issuer: cert.issuer?.name || "Unknown Issuer",
  }));

  return {
    profile,
    services: [],
    skills: formattedSkills,
    projects: formattedProjects,
    experiences,
    education,
    certifications: formattedCertifications,
  };
};
