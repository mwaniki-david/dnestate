import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.houses["bulk-delete"] ["$post"]>;
type RequestType = InferRequestType<typeof client.api.houses["bulk-delete"] ["$post"]>["json"];

export const useBulkDeleteHouse = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.houses["bulk-delete"] ["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Building deleted")
            QueryClient.invalidateQueries({ queryKey: ["Building"]  });
        },
        onError: () => {
            toast.error("Failed to delete Building")
        }
    })
    return mutation;
}