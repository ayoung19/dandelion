import { trpc } from "../utils/trpc";

export const Test = () => {
  const helloQuery = trpc.hello.useQuery();

  return <div>{helloQuery.data}</div>;
};
