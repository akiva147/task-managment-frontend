import { Env, EnvSchema } from "../models/env.model";

export const validateEnvs = (): Env => {
  const env = import.meta.env;

  const parsed = EnvSchema.safeParse(env);

  if (parsed.error) throw new Error("Error validating environment variables");

  return parsed.data;
};
