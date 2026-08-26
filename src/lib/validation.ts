import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please share a bit more detail (at least 20 characters).")
    .max(5000, "Message is too long."),
  /** Honeypot — bots fill this; humans leave empty */
  website: z.string().max(200).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
