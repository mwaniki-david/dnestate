import { UseNewTenant } from "../hooks/use-new-tenant";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { TenantForm } from "./tenant-form";
import { insertTenantSchema } from "@/db/schema";
import { useCreateTenant } from "../api/use-create-tenant";
import { z } from "zod";

const formSchema = insertTenantSchema.pick({
    name:true,
    phoneNo: true,
    buildingName: true,
    rentalAmount: true,
    unitName: true,
    unitType: true,
    
});

type FormValues = z.input<typeof formSchema>;


export const NewTenantSheet = () => {
    const { isOpen, onClose } = UseNewTenant();
    const mutation = useCreateTenant();
    


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
                        New Tenant
                    </SheetTitle>
                    <SheetDescription>
                        cerate a new tenant account to track each transactions.
                    </SheetDescription>
                </SheetHeader>
                <TenantForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    name: "",
                    phoneNo: "",
                    buildingName: "",
                    rentalAmount: 0,
                    unitName: "",
                    unitType: "",
                }}
                />
            </SheetContent>
        </Sheet>
    )
}