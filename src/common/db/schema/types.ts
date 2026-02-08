import type { InferSelectModel } from "drizzle-orm";
import * as schema from "./index.js";

export type Profile = InferSelectModel<typeof schema.profiles>;
export type Project = InferSelectModel<typeof schema.projects>;
export type Skill = InferSelectModel<typeof schema.skills>;
export type Experience = InferSelectModel<typeof schema.experiences>;
export type Education = InferSelectModel<typeof schema.education>;
export type Certification = InferSelectModel<typeof schema.certifications>;
export type Service = InferSelectModel<typeof schema.services>;
export type SocialLink = InferSelectModel<typeof schema.socialLinks>;
