import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetHouses = () => {
    const query = useQuery({
        queryKey: ["houses"],
        queryFn: async () => {
            const response = await client.api.houses.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch houses");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}