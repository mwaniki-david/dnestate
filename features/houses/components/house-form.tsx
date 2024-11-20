import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormFields,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertHousesSchema } from "@/db/schema";

const formSchema = insertHousesSchema.pick({
  houseName: true,
  buildingName: true,
  phoneNo: true,
  rentalAmount: true,
  unitType: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const HouseForm = ({
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
            name="houseName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>houseName</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g cred"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="buildingName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>buildingName</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g Hajoja app"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ">
          <FormField
            name="phoneNo"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>phoneNo</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="079453521"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="rentalAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>rentalAmount</FormLabel>
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
            name="unitType"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>unitType</FormLabel>
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
          {/* <FormField
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
          /> */}
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
