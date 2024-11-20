import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.houses[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof   client.api.houses[":id"]["$patch"]>["json"];

export const useEditHouse = (id?: string) => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.houses[":id"]["$patch"]({
        param: { id },
         json
         });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("houses updated");
      queryClient.invalidateQueries({ queryKey: ["houses", { id }] });
      queryClient.invalidateQueries({ queryKey: ["houses"] });
    },
    onError: () => {
      toast.error("Failed to create houses");
    },
  });
  return mutation;
};
