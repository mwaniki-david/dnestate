import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetbuildingOwners = () => {
    const query = useQuery({
        queryKey: ["buildingOwner"],
        queryFn: async () => {
            const response = await client.api.buildingOwner.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch tenants");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}