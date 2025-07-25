const requiredKeys = ["AWS_SECRET_ACCESS_KEY"] as const;

export function buildEnv(): Record<string, string> {
  const prefix = "COUNTDOWN_DEVELOPMENT_";

  const env: Record<string, string> = Object.fromEntries([
    ...Object.entries(process.env)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [key.slice(prefix.length), value]),
    ["CF_PAGES_URL", "http://localhost:5173"],
  ]);

  for (const key of requiredKeys) {
    if (!(key in env)) throw new Error(`Missing environment variable ${key}`);
  }

  return env;
}
