import dotenv from "dotenv";

dotenv.config();

const env = (name: string) => {
  const value = process.env[name];

  if (value === undefined) {
    process.exit(1);
  }

  return value;
};

const PORT = env("PORT");
const STYTCH_PROJECT_ID = env("STYTCH_PROJECT_ID");
const STYTCH_SECRET = env("STYTCH_SECRET");

export { PORT, STYTCH_PROJECT_ID, STYTCH_SECRET };
