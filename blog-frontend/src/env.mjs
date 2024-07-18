// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    NEXT_PUBLIC_DEPLOYMENT_ENV: z.string().default("production"),
  },
  server: {
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default(""),
    NEXT_PUBLIC_BACKEND_URL: z.string().default(""),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
});
