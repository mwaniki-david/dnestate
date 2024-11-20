import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.building[":id"]["$delete"]>;

export const useDeleteBuilding = (id?: string) => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.building[":id"]["$delete"]({
        param: { id },
         });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Building deleted");
      queryClient.invalidateQueries({ queryKey: ["building", { id }] });
      queryClient.invalidateQueries({ queryKey: ["building"] });
    },
    onError: () => {
      toast.error("Failed to delete Building");
    },
  });
  return mutation;
};

