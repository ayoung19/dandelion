import { useStytchUser } from "@stytch/react";
import { Login } from "./auth/Login";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Test } from "./components/Test";
import Cookies from "ts-cookies";

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3010/trpc",
          async headers() {
            return {
              authorization: Cookies.get("stytch_session_jwt"),
            };
          },
        }),
      ],
    })
  );

  const { user } = useStytchUser();

  if (!user) {
    return <Login />;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Test />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
