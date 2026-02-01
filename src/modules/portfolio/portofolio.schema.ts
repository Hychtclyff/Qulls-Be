export const getSummarySchema = {
  tags: ["Summary"],
  summary: "Get portfolio summary",
  description: "Get profile, skills, featured projects, and experiences",
  response: {
    200: {
      type: "object",
      required: ["success", "data"],
      properties: {
        success: { type: "boolean" },

        data: {
          type: "object",
          required: ["profile", "skills", "featuredProjects", "experiences"],
          properties: {
            /* ================= PROFILE ================= */
            profile: {
              type: "object",
              required: ["id", "fullName", "professionalTitle"],
              properties: {
                id: { type: "number" },
                fullName: { type: "string" },
                professionalTitle: { type: "string" },
                bioShort: { type: "string", nullable: true },
                avatarUrl: { type: "string", nullable: true },
                resumeUrl: { type: "string", nullable: true },
                statusLabel: { type: "string", nullable: true },
                statusColor: { type: "string", nullable: true },
              },
            },

            /* ================= SKILLS ================= */
            skills: {
              type: "array",
              items: {
                type: "object",
                required: ["category", "items"],
                properties: {
                  category: { type: "string" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["name", "iconKey", "proficiency"],
                      properties: {
                        name: { type: "string" },
                        iconKey: { type: "string" },
                        proficiency: {
                          type: "number",
                          minimum: 0,
                          maximum: 100,
                        },
                      },
                    },
                  },
                },
              },
            },

            /* ================= FEATURED PROJECTS ================= */
            featuredProjects: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "title", "slug"],
                properties: {
                  id: { type: "number" },
                  title: { type: "string" },
                  slug: { type: "string" },
                  summary: { type: "string", nullable: true },
                  thumbnailUrl: { type: "string", nullable: true },

                  metrics: {
                    type: "object",
                    additionalProperties: { type: "string" },
                  },

                  tags: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },

            /* ================= EXPERIENCES ================= */
            experiences: {
              type: "array",
              items: {
                type: "object",
                required: [
                  "id",
                  "companyName",
                  "roleTitle",
                  "employmentType",
                  "startDate",
                  //   "isCurrent",
                ],
                properties: {
                  id: { type: "number" },
                  companyName: { type: "string" },
                  roleTitle: { type: "string" },
                  employmentType: { type: "string" },
                  startDate: {
                    type: "string",
                    format: "date-time",
                  },
                  endDate: {
                    type: "string",
                    format: "date-time",
                    nullable: true,
                  },
                  description: {
                    type: "string",
                    nullable: true,
                  },
                  isCurrent: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
  },
};
