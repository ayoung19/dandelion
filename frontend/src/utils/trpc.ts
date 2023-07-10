import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../backend/src/app";

export const trpc = createTRPCReact<AppRouter>();
