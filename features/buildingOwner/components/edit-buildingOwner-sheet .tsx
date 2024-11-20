import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BuildingOwnerForm } from "./buildingOwner-form";
import { insertbuildingOwnerSchema } from "@/db/schema";
import { z } from "zod";
import { useGetbuildingOwner } from "../api/use-get-buildingOwner";
import { Loader2 } from "lucide-react";
import { useDeletebuildingOwner } from "../api/use-delete-buildingOwner ";
import { useConfirm } from "@/hooks/use-confirm";
import { UseOpenBuildingOwner } from "../hooks/use-open-buildingOwner";
import { useEdibuildingOwner } from "../api/use-edit-buildingOwner ";

const buildingOwnerSchema = insertbuildingOwnerSchema.pick({
  name: true,
  phoneNo: true,
  buildingName: true,
});

type FormValues = z.input<typeof buildingOwnerSchema>;

export const EditbuildingOwnerSheet = () => {
  const { isOpen, onClose, id } = UseOpenBuildingOwner();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this tenant"
  );

  const buildingOwnerQuery = useGetbuildingOwner(id);
  const editMutation = useEdibuildingOwner(id);
  const deleteMutation = useDeletebuildingOwner(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = buildingOwnerQuery.isLoading;

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
            }
        })
    }
  };

  const defaultValues = buildingOwnerQuery.data
    ? {
        name: buildingOwnerQuery.data.name,
        phoneNo: buildingOwnerQuery.data.phoneNo,
        buildingName: buildingOwnerQuery.data. buildingName,
      }
    : {
        name: "",
        phoneNo: "",
        buildingName: "",
      };

  return (
    <>
    <ConfirmDialog/>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Tenant</SheetTitle>
            <SheetDescription>
              edit tenant account to track each transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute insert-0 flex item-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <BuildingOwnerForm
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

// function UseOpenTenant(): { isOpen: any; onClose: any; id: any; } {
//     throw new Error("Function not implemented.");
// }
// function UseOpenTenant(): { isOpen: any; onClose: any; } {
//     throw new Error("Function not implemented.");
// }
