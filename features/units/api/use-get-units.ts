import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetunits = () => {
    const query = useQuery({
        queryKey: ["unit"],
        queryFn: async () => {
            const response = await client.api.unit.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch tenants");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}