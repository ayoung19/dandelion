import { useParams } from "react-router-dom";
import { trpc } from "../utils/trpc";

export const WishesPage = () => {
  const { userId } = useParams<{ userId: string }>();

  const wishesByUserIdQuery = trpc.wishes.byUserId.useQuery(userId);

  return (
    <div>
      {wishesByUserIdQuery.data?.map((wish) => (
        <div>{wish.url}</div>
      ))}
    </div>
  );
};
