import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.building[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof   client.api.building[":id"]["$patch"]>["json"];

export const useEditBuilding = (id?: string) => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.building[":id"]["$patch"]({
        param: { id },
         json
         });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Building updated");
      queryClient.invalidateQueries({ queryKey: ["building", { id }] });
      queryClient.invalidateQueries({ queryKey: ["building"] });
    },
    onError: () => {
      toast.error("Failed to create Building");
    },
  });
  return mutation;
};
