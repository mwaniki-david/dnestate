"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { UseNewUnit } from "@/features/units/hooks/use-new-unit";
import { useBulkDeleteunit } from "@/features/units/api/use-bulk-delete-unit";
import { useGetunits } from "@/features/units/api/use-get-units";

const UnitPage = () => {
  const newUnit = UseNewUnit();
  const deleteUnit = useBulkDeleteunit();
  const unitQuery = useGetunits();
  const unit = unitQuery.data || [];

  const isDisabled = unitQuery.isLoading || deleteUnit.isPending;

  if (unitQuery.isLoading) {
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
          <CardTitle className="text-xl line-clamp-1">Unit list</CardTitle>
          <Button onClick={newUnit.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) =>r.original.id);
              deleteUnit.mutate({ ids });
            }}
            columns={columns}
            data={unit}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitPage;
