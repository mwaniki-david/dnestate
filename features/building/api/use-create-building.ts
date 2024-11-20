import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.building.$post>;
type RequestType = InferRequestType<typeof   client.api.building.$post>["json"];

export const useCreateBuilding = () => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.building.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("building Created");
      queryClient.invalidateQueries({ queryKey: ["building"] });
    },
    onError: () => {
      toast.error("Failed to create building");
    },
  });
  return mutation;
};
