import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.buildingOwner[":id"]["$delete"]>;

export const useDeletebuildingOwner = (id?: string) => {
    const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.buildingOwner[":id"]["$delete"]({
        param: { id },
         });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("buildingOwner deleted");
      queryClient.invalidateQueries({ queryKey: ["buildingOwner", { id }] });
      queryClient.invalidateQueries({ queryKey: ["buildingOwner"] });
    },
    onError: () => {
      toast.error("Failed to delete buildingOwner");
    },
  });
  return mutation;
};

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { client } from "@/lib/hono";  // Ensure client is typed correctly
// import { InferRequestType, InferResponseType } from "hono";

// // Infer the response and request types from the client
// type ResponseType = InferResponseType<typeof client.api.tenants.$post>;
// type RequestType = InferRequestType<typeof client.api.tenant.$post>["json"];

// export const useCreateTenant = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async (json) => {
//       const response = await client.api.tenant.$post({ json });

//       // Optional: Add response.ok check for additional error handling
//       if (!response.ok) {
//         throw new Error("Failed to create tenant");
//       }

//       return await response.json();
//     },
//     onSuccess: () => {
//       toast.success("Tenant Created");
//       queryClient.invalidateQueries({ queryKey: ["tenant"] });
//     },
//     onError: (error) => {
//       toast.error(`Failed to create tenant: ${error.message}`);
//     },
//   });

//   return mutation;
// };
