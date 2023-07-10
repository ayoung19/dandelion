import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";

export const HomePage = () => {
  const utils = trpc.useContext();

  const meQuery = trpc.me.useQuery();
  const wishesQuery = trpc.wishes.byUserId.useQuery(
    meQuery.data?.userId || "",
    {
      enabled: !!meQuery.data?.userId,
    }
  );

  const wishesCreateMutation = trpc.wishes.create.useMutation({
    onSuccess: () => {
      utils.wishes.byUserId.invalidate(meQuery.data?.userId || "");
    },
  });

  const { register, handleSubmit } = useForm<{ url: string }>();

  return (
    <div>
      {wishesQuery.data?.map((wish) => (
        <div>{wish.url}</div>
      ))}
      <form
        onSubmit={handleSubmit((data) =>
          wishesCreateMutation.mutateAsync(data)
        )}
      >
        <input {...register("url")} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
