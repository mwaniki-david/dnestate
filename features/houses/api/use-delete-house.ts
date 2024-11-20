import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.houses[":id"]["$delete"]>;

export const useDeleteHouse = (id?: string) => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.houses[":id"]["$delete"]({
        param: { id },
         });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("House deleted");
      queryClient.invalidateQueries({ queryKey: ["house", { id }] });
      queryClient.invalidateQueries({ queryKey: ["house"] });
    },
    onError: () => {
      toast.error("Failed to delete House");
    },
  });
  return mutation;
};

