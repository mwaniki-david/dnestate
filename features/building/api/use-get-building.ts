import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetBuilding = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["building", { id }], 
        queryFn: async () => {
            const response = await client.api.building[":id"].$get({
                param: {  id },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch building");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}