import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.houses.$post>;
type RequestType = InferRequestType<typeof   client.api.houses.$post>["json"];

export const useCreateHouse = () => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.houses.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("building Created");
      queryClient.invalidateQueries({ queryKey: ["houses"] });
    },
    onError: () => {
      toast.error("Failed to create houses");
    },
  });
  return mutation;
};
