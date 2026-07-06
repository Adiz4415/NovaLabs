/**
 * Reads an environment variable by key.
 * In development, throws if a required variable is missing.
 * In production, logs a warning instead to avoid crashing the build.
 *
 * @param key - The environment variable name (e.g. 'NEXT_PUBLIC_API_URL')
 * @param required - Whether the variable is required (defaults to true)
 * @returns The env variable value, or an empty string if absent and not required
 */
function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];

  if (!value && required) {
    if (process.env.NODE_ENV !== "production") {
      throw new Error(` Missing required environment variable: ${key}`);
    } else {
      console.warn(`Environment variable ${key} is not set`);
    }
  }

  return value ?? "";
}

export const env = {
  NEXT_PUBLIC_API_URL: getEnvVar("NEXT_PUBLIC_API_URL"),
  NEXT_PUBLIC_APP_NAME: getEnvVar("NEXT_PUBLIC_APP_NAME"),
  // Add more here as needed
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;
