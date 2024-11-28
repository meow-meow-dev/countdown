import { type InferOutput, strictObject, string } from "valibot";

export const envSchemaFields = {
  AWS_ACCESS_KEY_ID: string(),
  AWS_REGION: string(),
  AWS_SECRET_ACCESS_KEY: string(),
  SEND_INVITATION_FROM: string(),
  WEBSITE_NAME: string(),
  WEBSITE_URL: string(),
};

export const envSchema = strictObject(envSchemaFields);

export type Env = InferOutput<typeof envSchema>;
