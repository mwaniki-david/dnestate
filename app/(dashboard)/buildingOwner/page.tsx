// "use client";
// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/data-table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader2, Plus } from "lucide-react";
// import { columns } from "./columns";
// import { Skeleton } from "@/components/ui/skeleton";
// import { UseNewBuildingOwner } from "@/features/buildingOwner/hooks/use-new-buildingOwner";
// import { useBulkDeletebuildingOwner } from "@/features/buildingOwner/api/use-bulk-delete-buildingOwner";
// import { useGetbuildingOwners } from "@/features/buildingOwner/api/use-get-buildingOwners";

// const BuildingOwnerPage = () => {
//   const newBuildingOwner = UseNewBuildingOwner();
//   const deleteBuildingOwner = useBulkDeletebuildingOwner();
//   const buildingOwnerQuery = useGetbuildingOwners();
//   const buildingOwner = buildingOwnerQuery.data || [];

//   const isDisabled = buildingOwnerQuery.isLoading || deleteBuildingOwner.isPending;

//   if (buildingOwnerQuery.isLoading) {
//     return (
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardHeader>
//             <Skeleton className="h-8 w-48" />
//           </CardHeader>
//           <CardContent>
//             <div className="h-[500px] w-full flex items-center justify-center">
//               <Loader2 className="size-6 text-slate-300 animate-spin" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//       <Card className="border-none drop-shadow-sm">
//         <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
//           <CardTitle className="text-xl line-clamp-1">BuildingOwner list</CardTitle>
//           <Button onClick={newBuildingOwner.onOpen} size="sm">
//             <Plus className="size-4 mr-2" />
//             Add new
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             filterKey="name"
//             onDelete={(row) => {
//               const ids = row.map((r) =>r.original.id);
//               deleteBuildingOwner.mutate({ ids });
//             }}
//             columns={columns}
//             data={buildingOwner}
//             disabled={isDisabled}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default BuildingOwnerPage;
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { UseNewBuildingOwner } from "@/features/buildingOwner/hooks/use-new-buildingOwner";
import { useBulkDeletebuildingOwner } from "@/features/buildingOwner/api/use-bulk-delete-buildingOwner";
import { useGetbuildingOwners } from "@/features/buildingOwner/api/use-get-buildingOwners";

const BuildingOwnerPage = () => {
  const newBuildingOwner = UseNewBuildingOwner();
  const deleteBuildingOwner = useBulkDeletebuildingOwner();
  const buildingOwnerQuery = useGetbuildingOwners();
  const buildingOwner = buildingOwnerQuery.data || [];

  const isDisabled =
    buildingOwnerQuery.isLoading || deleteBuildingOwner.isPending;

  if (buildingOwnerQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">BuildingOwners list</CardTitle>
          <Button onClick={newBuildingOwner.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteBuildingOwner.mutate({ ids });
            }}
            columns={columns}
            data={buildingOwner}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildingOwnerPage;
