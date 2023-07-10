/**
 * Required External Modules
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { PORT, STYTCH_PROJECT_ID, STYTCH_SECRET } from "./env";
import { Client, envs } from "stytch";

const PORT_NUMBER = parseInt(PORT, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * tRPC + Stytch
 */

const client = new Client({
  project_id: STYTCH_PROJECT_ID,
  secret: STYTCH_SECRET,
  env: envs.test,
});

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  if (typeof req.headers.authorization === "string") {
    return client.sessions
      .authenticateJwt(req.headers.authorization)
      .then(() => {
        console.log("success!");

        return {
          user: "hi",
        };
      })
      .catch(() => ({ user: null }));
  } else {
    return {
      user: null,
    };
  }
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof appRouter;

/**
 * Server Activation
 */

app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});
