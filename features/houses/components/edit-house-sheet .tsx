import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";

import { Loader2 } from "lucide-react";
import { insertHousesSchema } from "@/db/schema";
import { UseOpenHouse } from "../hooks/use-open-house";
import { useGetHouse } from "../api/use-get-house";
import { useEditHouse } from "../api/use-edit-house ";
import { useDeleteHouse } from "../api/use-delete-house";
import { HouseForm } from "./house-form";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertHousesSchema.pick({

  houseName: true,
  buildingName: true,
  phoneNo: true,
  rentalAmount: true,
  unitType: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditBuildingSheet = () => {
  const { isOpen, onClose, id } = UseOpenHouse();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this building"
  );

  const houseQuery = useGetHouse(id);
  const editMutation = useEditHouse(id);
  const deleteMutation = useDeleteHouse(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = houseQuery.isLoading;

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

  const defaultValues = houseQuery.data
    ? {
        houseName: houseQuery.data.houseName,
        buildingName: houseQuery.data.buildingName,
        phoneNo: houseQuery.data.PhoneNo,
        rentalAmount: houseQuery.data.rentalAmount,
        unitType: houseQuery.data.unitType,
      }
    : {

        houseName: "",
        phoneNo: "",
        buildingName: "",
        rentalAmount: 0,
        unitType: "",
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
            <HouseForm
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

