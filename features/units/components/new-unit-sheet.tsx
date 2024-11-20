import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { z } from "zod";
import { UseNewUnit } from "../hooks/use-new-unit";
import { useCreatUnit } from "../api/use-create-unit";
import { inserUnitrSchema } from "@/db/schema";
import { UnitForm } from "./unit-form";

const formSchema = inserUnitrSchema.pick({
    name:true,
    phoneNo: true,
    buildingName: true,
});

type FormValues = z.input<typeof formSchema>;


export const NewunitSheet = () => {
    const { isOpen, onClose } = UseNewUnit();
    const mutation = useCreatUnit();
    


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
                        New unit
                    </SheetTitle>
                    <SheetDescription>
                        cerate a unit account to track each transactions.
                    </SheetDescription>
                </SheetHeader>
                <UnitForm 
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