import { UseNewBuilding } from "../hooks/use-new-building";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCreateBuilding} from "../api/use-create-building";
import { z } from "zod";
import { BuildingForm } from "./building-form";
import { insertBuildingSchema } from "@/db/schema";

const formSchema = insertBuildingSchema.pick({
    name: true,
    floors: true,
    ownersName: true,
    ownersPhoneNo: true,
    location: true,
    buildingUnits: true,
    
});

type FormValues = z.input<typeof formSchema>;


export const NewBuildingSheet = () => {
    const { isOpen, onClose } = UseNewBuilding();
    const mutation = useCreateBuilding();
    


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
                        New Building
                    </SheetTitle>
                    <SheetDescription>
                        cerate a new building account to track each transactions.
                    </SheetDescription>
                </SheetHeader>
                <BuildingForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: "",
                    floors: 0,
                    ownersName: "",
                    ownersPhoneNo: "",
                    location: "",
                    buildingUnits: 0,
                }}
                />
            </SheetContent>
        </Sheet>
    )
}