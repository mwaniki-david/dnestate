import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetBuildings = () => {
    const query = useQuery({
        queryKey: ["building"],
        queryFn: async () => {
            const response = await client.api.building.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch building");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}