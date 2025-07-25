import type { Context } from "hono";

import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation";
import { env } from "hono/adapter";
import * as v from "valibot";

const configurationSchema = v.strictObject({
  awsAccessKeyId: nonEmptyStringSchema,
  awsRegion: nonEmptyStringSchema,
  awsSecretAccessKey: nonEmptyStringSchema,
  sendInvitationFrom: nonEmptyStringSchema,
  websiteName: nonEmptyStringSchema,
  websiteUrl: nonEmptyStringSchema,
});

export type Configuration = v.InferOutput<typeof configurationSchema>;

const configurationFieldToEnvKey: Record<keyof Configuration, string> = {
  awsAccessKeyId: "AWS_ACCESS_KEY_ID",
  awsRegion: "AWS_REGION",
  awsSecretAccessKey: "AWS_SECRET_ACCESS_KEY",
  sendInvitationFrom: "SEND_INVITATION_FROM",
  websiteName: "SITE_NAME",
  websiteUrl: "CF_PAGES_URL",
};

export function buildConfiguration(c: Context): Configuration {
  const configuration = Object.fromEntries(
    Object.entries(configurationFieldToEnvKey).map(([field, envKey]) => [
      field,
      env(c)[envKey],
    ])
  );

  console.error({ configuration });

  return v.parse(configurationSchema, configuration);
}
