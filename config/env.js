import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  SERVER_URL,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  EMAIL_PASSWORD,
  USER_EMAIL
} = process.env;
