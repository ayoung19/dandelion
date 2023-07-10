import { PrismaClient } from "@prisma/client";
import { Client, envs } from "stytch";
import { STYTCH_PROJECT_ID, STYTCH_SECRET } from "./env";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

const prisma = new PrismaClient();

const client = new Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
  env: envs.test,
});

export const createContext = async ({
  req,
  res,
}: CreateExpressContextOptions) => {
  try {
    if (typeof req.headers.authorization !== "string") {
      throw new Error("no jwt found");
    }

    const { session } = await client.sessions.authenticateJwt(
      req.headers.authorization
    );

    const { emails } = await client.users.get(session.user_id);

    const email = emails.find(() => true)?.email;

    if (email === undefined) {
      throw new Error("no email found");
    }

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email,
        },
      });

      return { user };
    } catch {
      return {
        user: await prisma.user.create({ data: { email } }),
      };
    }
  } catch {
    return { user: null };
  }
};
