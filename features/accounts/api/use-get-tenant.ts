import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetTenant = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["tenant", { id }], 
        queryFn: async () => {
            const response = await client.api.tenants[":id"].$get({
                param: {  id },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch tenants");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}