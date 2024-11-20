import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertBuildingSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormFields,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = insertBuildingSchema.pick({
  name: true,
  floors: true,
  ownersName: true,
  ownersPhoneNo: true,
  location: true,
  buildingUnits: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const BuildingForm = ({
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
                    placeholder="e.g  cred"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="floors"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floors</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g 17"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ">
          <FormField
            name="ownersName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ownersName</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="David"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="ownersPhoneNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ownersPhoneNo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g ownersPhoneNo"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ">
        <FormField
            name="location"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>location</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g juja"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="buildingUnits"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>buildingUnits</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g 1 bedroom"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" disabled={disabled}>
          {id ? "save changes" : "create building account"}
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
            Delete building
          </Button>
        )}
      </form>
    </Form>
  );
};
