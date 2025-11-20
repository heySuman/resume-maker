import { z } from "zod";

export const resumeSchema = z.object({
  personal: z.object({
    jobTitle: z.string().min(2, "Too short"),
    firstName: z.string().min(1, "First name required"),
    lastName: z.string().min(1, "Last name required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "Valid phone required"),
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().min(2, "Country required"),
  }),
  employment: z
    .array(
      z.object({
        jobTitle: z.string().min(1),
        employer: z.string().min(1),
        startDate: z.string(),
        endDate: z.string().optional(),
        city: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(1),
        degree: z.string().min(1),
        startDate: z.string(),
        endDate: z.string().optional(),
        city: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  skill: z
    .array(
      z.object({
        skill: z.string().min(1),
        level: z.enum([
          "novice",
          "beginner",
          "skillful",
          "experienced",
          "expert",
        ]),
      })
    )
    .optional(),
  project: z
    .array(
      z.object({
        projectName: z.string().min(1),
        startDate: z.string(),
        endDate: z.string().optional(),
        description: z.string().optional(),
        link: z.string().url().optional().or(z.literal("")),
      })
    )
    .optional(),
  language: z
    .array(
      z.object({
        language: z.string().min(1),
        level: z.enum([
          "native speaker",
          "highly proficient",
          "very good command",
        ]),
      })
    )
    .optional(),
});
