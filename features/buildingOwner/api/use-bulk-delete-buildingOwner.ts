import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.buildingOwner["bulk-delete"] ["$post"]>;
type RequestType = InferRequestType<typeof client.api.buildingOwner["bulk-delete"] ["$post"]>["json"];

export const useBulkDeletebuildingOwner = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.buildingOwner["bulk-delete"] ["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("buildingOwner deleted")
            QueryClient.invalidateQueries({ queryKey: ["buildingOwner"]  });
        },
        onError: () => {
            toast.error("Failed to delete buildingOwner")
        }
    })
    return mutation;
}