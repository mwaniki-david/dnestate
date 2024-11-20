import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.unit["bulk-delete"] ["$post"]>;
type RequestType = InferRequestType<typeof client.api.unit["bulk-delete"] ["$post"]>["json"];

export const useBulkDeleteunit = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.unit["bulk-delete"] ["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("unit deleted")
            QueryClient.invalidateQueries({ queryKey: ["unit"]  });
        },
        onError: () => {
            toast.error("Failed to delete unit")
        }
    })
    return mutation;
}