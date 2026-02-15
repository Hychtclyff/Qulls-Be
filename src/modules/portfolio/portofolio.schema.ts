export const getSummarySchema = {
  tags: ["Summary"],
  summary: "Get portfolio summary",
  description:
    "Get full portfolio data including profile, projects, and experiences",
  response: {
    200: {
      type: "object",
      required: ["success", "message", "data"],
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        data: {
          type: "object",
          required: [
            "profile",
            "services",
            "skills",
            "projects",
            "experiences",
            "education",
            "certifications",
          ],
          properties: {
            /* ================= PROFILE ================= */
            profile: {
              type: "object",
              required: ["id", "fullName", "roleId", "email", "locationId"],
              properties: {
                id: { type: "number" },
                fullName: { type: "string" },
                roleId: { type: "string" },
                roleEn: { type: "string" },
                level: { type: "string" },
                imageUrl: { type: "string" },
                email: { type: "string" },
                locationId: { type: "string" },
                locationEn: { type: "string", nullable: true },
                aboutId: { type: "string", nullable: true },
                aboutEn: { type: "string", nullable: true },
                createdAt: { type: "string" }, // format: date-time optional
                updatedAt: { type: "string" },

                // Nested Social Links
                socialLinks: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      profileId: { type: "number" },
                      name: { type: "string" },
                      handle: { type: "string" },
                      url: { type: "string" },
                      iconName: { type: "string" },
                      bgColor: { type: "string" },
                      textColor: { type: "string" },
                    },
                  },
                },
              },
            },

            /* ================= SERVICES ================= */
            services: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  profileId: { type: "number" },
                  serviceKey: { type: "string" },
                  iconName: { type: "string" },
                  colorClass: { type: "string" },
                  bgClass: { type: "string" },
                  descId: { type: "string" },
                  descEn: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },

            /* ================= SKILLS (Global List) ================= */
            skills: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  category: { type: "string" },
                },
              },
            },

            /* ================= PROJECTS ================= */
            projects: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  profileId: { type: "number" },
                  titleId: { type: "string" },
                  titleEn: { type: "string" },
                  descId: { type: "string" },
                  descEn: { type: "string" },
                  imageUrl: { type: "string" },
                  statLabelId: { type: "string" },
                  statLabelEn: { type: "string" },
                  statValue: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },

                  // Array 1: Raw Pivot (Dari JSON kamu terlihat masih ada)
                  skills: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        projectId: { type: "number" },
                        skillId: { type: "number" },
                        skill: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            name: { type: "string" },
                            category: { type: "string" },
                          },
                        },
                      },
                    },
                  },

                  // Array 2: Flattened Tech Stack (Yang lebih rapi)
                  techStack: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        name: { type: "string" },
                        category: { type: "string" },
                      },
                    },
                  },
                },
              },
            },

            /* ================= EXPERIENCES ================= */
            experiences: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  profileId: { type: "number" },
                  company: { type: "string" },
                  roleId: { type: "string" },
                  roleEn: { type: "string" },
                  period: { type: "string" },
                  jobType: { type: "string" },
                  descId: { type: "string" },
                  descEn: { type: "string" },
                  certificationId: { type: "number", nullable: true },
                  projectId: { type: "number", nullable: true },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },

            /* ================= EDUCATION ================= */
            education: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  profileId: { type: "number" },
                  degreeId: { type: "string" },
                  degreeEn: { type: "string" },
                  school: { type: "string" },
                  period: { type: "string" },
                  descId: { type: "string" },
                  descEn: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },

            /* ================= CERTIFICATIONS ================= */
            certifications: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  profileId: { type: "number" },
                  name: { type: "string" },
                  issuer: { type: "string" },
                  year: { type: "string" },
                  imageUrl: { type: "string" },
                  credentialId: { type: "string" },
                  descId: { type: "string" },
                  descEn: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
};
