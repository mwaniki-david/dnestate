import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertBuildingSchema } from "@/db/schema";
import { z } from "zod";
import { UseOpenBuilding } from "../hooks/use-open-building";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetBuilding } from "../api/use-get-building";
import { useEditBuilding } from "../api/use-edit-building ";
import { useDeleteBuilding } from "../api/use-delete-building ";
import { BuildingForm } from "./building-form";
import { Loader2 } from "lucide-react";

const formSchema = insertBuildingSchema.pick({
  name: true,
  floors: true,
  ownersName: true,
  ownersPhoneNo: true,
  location: true,
  buildingUnits: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditBuildingSheet = () => {
  const { isOpen, onClose, id } = UseOpenBuilding();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this building"
  );

  const buildingQuery = useGetBuilding(id);
  const editMutation = useEditBuilding(id);
  const deleteMutation = useDeleteBuilding(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = buildingQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = buildingQuery.data
    ? {
        name: buildingQuery.data.name,
        floors: buildingQuery.data.floors,
        ownersName: buildingQuery.data.ownersName,
        ownersPhoneNo: buildingQuery.data.ownersPhoneNo,
        location: buildingQuery.data.location,
        buildingUnits: buildingQuery.data.buildingUnits,
      }
    : {
        name: "",
        floors: 0,
        ownersName: "",
        ownersPhoneNo: "",
        location: "",
        buildingUnits: 0,
        // name: "",
        // phoneNo: "",
        // buildingName: "",
        // rentalAmount: 0,
        // unitName: "",
        // unitType: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit building</SheetTitle>
            <SheetDescription>
              edit building account to track each transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute insert-0 flex item-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <BuildingForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

