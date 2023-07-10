import { PrismaClient } from "@prisma/client";
import { Client, envs } from "stytch";
import { STYTCH_ENV, STYTCH_PROJECT_ID, STYTCH_SECRET } from "./env";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";

const prisma = new PrismaClient();

const client = new Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
  env: STYTCH_ENV,
});

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  const user = ctx.user;
  if (user === null) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      user,
    },
  });
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
  } catch (e) {
    console.log(e);

    return { user: null };
  }
};

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export const appRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => ctx.user),
  wishes: router({
    byUserId: protectedProcedure
      .input(z.string())
      .query(async ({ input, ctx }) => {
        return await prisma.wish.findMany({
          where: {
            userId: input,
          },
        });
      }),
    create: protectedProcedure
      .input(z.object({ url: z.string() }))
      .mutation(async ({ input, ctx }) => {
        return await prisma.wish.create({
          data: {
            userId: ctx.user.userId,
            url: input.url,
          },
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
