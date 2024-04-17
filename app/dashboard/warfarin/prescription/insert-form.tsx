"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WarfarinPreferencesSchema } from "./formSchema";
import { insertWarfarinPreferences } from "@/app/actions/warfarin";
import { useState } from "react";

type TWarfarinPreferencesInsertForm = {
  warfarinData: {
    id: number;
    strength: string | null;
    unit: string | null;
    color: string | null;
  }[];
  getWarfarinPreferencesData: {
    id: number;
    pill_strength: number | null;
    warfarin: {
      id: number;
      strength: string | null;
      unit: string | null;
      color: string | null;
      hex: string | null;
    };
  }[];
};

export default function WarfarinPreferencesInsertForm({
  warfarinData,
  getWarfarinPreferencesData,
}: TWarfarinPreferencesInsertForm) {
  const [errors, setErrors] = useState("");
  const form = useForm<z.infer<typeof WarfarinPreferencesSchema>>({
    resolver: zodResolver(WarfarinPreferencesSchema),
    defaultValues: {
      // dosage: "",
    },
  });

  console.log("warfarinData", warfarinData);

  console.log("getWarfarinPreferencesData", getWarfarinPreferencesData);

  const onSubmit = async (
    values: z.infer<typeof WarfarinPreferencesSchema>
  ) => {
    const formData = new FormData();

    formData.append("pill_strength", String(values.pill_strength));

    const formState = await insertWarfarinPreferences(formData);

    console.log(formState);
    if (formState.errorMessage) {
      setErrors(formState.errorMessage);
      setTimeout(() => setErrors(""), 3000);
    }

    form.reset();
  };

  return (
    <div className="border border-slate-200 rounded-md p-9  bg-white xl:w-96 w-full">
      {errors && (
        <div className=" bg-red-400 text-sm p-4 rounded-md mb-3 transition delay-150 duration-300 ease-in-out">
          {errors}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pill_strength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warfarin Pill Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pill type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warfarinData &&
                      warfarinData.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id.toString()}
                        >
                          {option.strength}
                          {option.unit} ({option.color})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  This is the pill prescribed to you. You maybe have more than
                  one, if needed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
