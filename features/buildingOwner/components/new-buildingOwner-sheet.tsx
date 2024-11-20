import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { BuildingOwnerForm,} from "./buildingOwner-form";
import { insertbuildingOwnerSchema } from "@/db/schema";

import { z } from "zod";
import { UseNewBuildingOwner } from "../hooks/use-new-buildingOwner";
import { useCreatbuildingOwner } from "../api/use-create-buildingOwner";

const formSchema = insertbuildingOwnerSchema.pick({
    name:true,
    phoneNo: true,
    buildingName: true,
});

type FormValues = z.input<typeof formSchema>;


export const NewBuildingOwnerSheet = () => {
    const { isOpen, onClose } = UseNewBuildingOwner();
    const mutation = useCreatbuildingOwner();
    


    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        
        });
    };


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent  className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New buildingOwner
                    </SheetTitle>
                    <SheetDescription>
                        cerate a buildingOwner account to track each transactions.
                    </SheetDescription>
                </SheetHeader>
                <BuildingOwnerForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: "",
                    phoneNo: "",
                    buildingName: "",
                }}
                />
            </SheetContent>
        </Sheet>
    )
}