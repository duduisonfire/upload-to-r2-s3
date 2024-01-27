import { z } from 'zod';

const envSchema = z.object({
  R2_TOKEN: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  R2_ENDPOINT: z.string().url(),
});

export const env = envSchema.parse(process.env);
