import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertbuildingOwnerSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormFields,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

const formSchema = insertbuildingOwnerSchema.pick({
  name: true,
  phoneNo: true,
  buildingName: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const BuildingOwnerForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="pt-4 space-y-4"
      >
        <div className="flex gap-4 ">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g  credit card mwangi"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="phoneNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone no:</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g 07********"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ">
          <FormField
            name="buildingName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>building Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Hajoja App"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        
        </div>
        <Button className="w-full" disabled={disabled}>
          {id ? "save changes" : "create tenant account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete tenant
          </Button>
        )}
      </form>
    </Form>
  );
};
