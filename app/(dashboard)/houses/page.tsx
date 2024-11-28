"use client";
import { Button } from "@/components/ui/button";
;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { UseNewHouse } from "@/features/houses/hooks/use-new-house";
import { useGetHouses } from "@/features/houses/api/use-get-houses";

const HousesPage = () => {
  const newHouse = UseNewHouse();
  
  const houseQuery = useGetHouses();
  

  

  if (houseQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Houses list</CardTitle>
          <Button onClick={newHouse.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default HousesPage;
