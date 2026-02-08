import { db } from "../../common/configs/db.js";
import { Error404 } from "../../common/errors/http-error.js";

export const getSummaryService = async () => {
  const [
    profileData,
    socialLinksData,
    servicesData,
    skillsData,
    projectData,
    experienceData,
    educationData,
    certificationData,
  ] = await Promise.all([
    db.query.profiles.findFirst(),
    db.query.socialLinks.findMany(),
    db.query.services.findMany(),
    db.query.skills.findMany(),

    // PERBAIKAN 1: Gunakan nama relasi 'projectSkills' (bukan 'skills')
    db.query.projects.findMany({
      orderBy: (projects, { asc }) => [asc(projects.id)], // Gunakan sortOrder jika ada
      with: {
        skills: {
          with: {
            skill: true,
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
    db.query.certifications.findMany(),
  ]);

  if (!profileData) {
    throw new Error404("Profile Not Found! Please run seed script.");
  }

  // PERBAIKAN 2: Mapping array techStack dari 'projectSkills'
  const formattedProjects = projectData.map((project) => ({
    ...project,
    techStack: project.skills.map((ps) => ps.skill), // Mapping dari pivot
    projectSkills: undefined, // Bersihkan pivot asli
  }));

  const profileWithSocials = {
    ...profileData,
    socialLinks: socialLinksData ?? [],
  };

  // Return data mentah (Controller yang akan membungkusnya dengan 'data')
  return {
    profile: profileWithSocials,
    services: servicesData ?? [],
    skills: skillsData ?? [],
    projects: formattedProjects ?? [],
    experiences: experienceData ?? [],
    education: educationData ?? [],
    certifications: certificationData ?? [],
  };
};
