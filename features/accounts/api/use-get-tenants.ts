import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetTenants = () => {
    const query = useQuery({
        queryKey: ["tenant"],
        queryFn: async () => {
            const response = await client.api.tenants.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch tenants");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}