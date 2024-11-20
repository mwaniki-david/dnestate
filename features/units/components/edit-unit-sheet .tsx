import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { inserUnitrSchema } from "@/db/schema";
import { z } from "zod";
import { UseOpenUnit } from "../hooks/use-open-unit";
import { useGetunit } from "../api/use-get-unit";
import { useEdiunit } from "../api/use-edit-unit ";
import { useDeleteunit } from "../api/use-delete-unit";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { UnitForm } from "./unit-form";

const UnitSchema = inserUnitrSchema.pick({
  name: true,
  phoneNo: true,
  buildingName: true,
});

type FormValues = z.input<typeof UnitSchema>;

export const EditbuildingOwnerSheet = () => {
  const { isOpen, onClose, id } = UseOpenUnit();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this tenant"
  );

  const unitQuery = useGetunit(id);
  const editMutation = useEdiunit(id);
  const deleteMutation = useDeleteunit(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = unitQuery.isLoading;

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

  const defaultValues = unitQuery.data
    ? {
        name: unitQuery.data.name,
        phoneNo: unitQuery.data.phoneNo,
        buildingName: unitQuery.data. buildingName,
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
            <UnitForm
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
