// import { InferRequestType, InferResponseType } from "hono";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { client } from "@/lib/hono";
// import { toast } from "sonner";

// type ResponseType = InferResponseType<typeof client.api.tenants["bulk-delete"] ["$post"]>;
// type RequestType = InferRequestType<typeof client.api.tenants["bulk-delete"] ["$post"]>["json"];

// export const useBulkDeleteTenants = () => {
//     const QueryClient = useQueryClient();
//     const mutation = useMutation<
//     ResponseType,
//     Error,
//     RequestType
//     >({
//         mutationFn: async (json) => {
//             const response = await client.api.tenants["bulk-delete"] ["$post"]({ json });
//             return await response.json();
//         },
//         onSuccess: () => {
//             toast.success("Tenatnts deleted")
//             QueryClient.invalidateQueries({ queryKey: ["tenants"]  });
//         },
//         onError: () => {
//             toast.error("Failed to delete tenants")
//         }
//     })
//     return mutation;
// }

import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

// Infer the response and request types from your Hono API
type ResponseType = InferResponseType<typeof client.api.tenants["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.tenants["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteTenants = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<
    ResponseType,    // Expected response type
    Error,           // Error type
    RequestType      // Request body type
  >({
    mutationFn: async (json: RequestType): Promise<ResponseType> => {
      // Explicitly typing the response as Response
      const response: Response = await client.api.tenants["bulk-delete"]["$post"]({ json });

      // Ensure that the response is a Response object and we can call .json() on it
      const responseData: ResponseType = await response.json();
      return responseData;
    },
    onSuccess: () => {
      toast.success("Tenants deleted");
      QueryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
    onError: () => {
      toast.error("Failed to delete tenants");
    }
  });

  return mutation;
};
