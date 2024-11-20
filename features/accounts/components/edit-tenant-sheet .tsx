import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TenantForm } from "./tenant-form";
import { insertTenantSchema } from "@/db/schema";
import { z } from "zod";
import { useGetTenant } from "../api/use-get-tenant";
import { UseOpenTenant } from "../hooks/use-open-tenant";
import { Loader2 } from "lucide-react";
import { useEditTenant } from "../api/use-edit-tenant ";
import { useDeleteTenant } from "../api/use-delete-tenant ";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertTenantSchema.pick({
  name: true,
  phoneNo: true,
  buildingName: true,
  rentalAmount: true,
  unitName: true,
  unitType: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTenantSheet = () => {
  const { isOpen, onClose, id } = UseOpenTenant();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this tenant"
  );

  const tenantQuery = useGetTenant(id);
  const editMutation = useEditTenant(id);
  const deleteMutation = useDeleteTenant(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = tenantQuery.isLoading;

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

  const defaultValues = tenantQuery.data
    ? {
        name: tenantQuery.data.name,
        phoneNo: tenantQuery.data.phoneNo,
        buildingName: tenantQuery.data.buildingName,
        rentalAmount: tenantQuery.data.rentalAmount,
        unitType: tenantQuery.data.unitType,
      }
    : {
        name: "",
        phoneNo: "",
        buildingName: "",
        rentalAmount: 0,
        unitName: "",
        unitType: "",
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
            <TenantForm
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
