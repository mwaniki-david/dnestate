import { UseNewHouse } from "../hooks/use-new-house";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateHouse } from "../api/use-create-house";
import { z } from "zod";
import { insertHousesSchema } from "@/db/schema";
import { HouseForm } from "./house-form";

const formSchema = insertHousesSchema.pick({
  houseName: true,
  rentalAmount: true,
  phoneNo: true,
  unitType: true,
  buildingName: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewHouseSheet = () => {
  const { isOpen, onClose } = UseNewHouse();
  const mutation = useCreateHouse();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Building</SheetTitle>
          <SheetDescription>
            cerate a new building account to track each transactions.
          </SheetDescription>
        </SheetHeader>
        <HouseForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            houseName: "",
            rentalAmount: 12,
            phoneNo: "",
            unitType: "",
            buildingName: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
