"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertWarfarinDosages,
  insertWarfarinSchedule,
} from "@/app/actions/warfarin";
import { useForm } from "react-hook-form";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  WarfarinScheduleInsertSchema,
  daysOfWeek,
} from "@/app/dashboard/warfarin/schedule/formSchema";

const FormDefaultValues = (data: TWarfarinScheduleForm) => {
  const defaultValues = {};

  daysOfWeek.forEach((day) => {
    data.forEach((item) => {
      const key = `${day}-${item.pill_strength}`;
      defaultValues[key] = "";
    });
  });
  return defaultValues;
};

export type TWarfarinScheduleForm = {
  id: number;
  pill_strength: number | null;
  warfarin: {
    id: number;
    strength: string | null;
    unit: string | null;
    color: string | null;
    hex: string | null;
  } | null;
}[];

export default function WarfarinScheduleInsertForm({
  data,
}: {
  data: TWarfarinScheduleForm;
}) {
  const WarfarinScheduleSchema = WarfarinScheduleInsertSchema(data);

  const form = useForm<z.infer<typeof WarfarinScheduleSchema>>({
    resolver: zodResolver(WarfarinScheduleSchema),
    defaultValues: {
      ...FormDefaultValues(data),
    },
  });

  const onSubmit = async (values: z.infer<typeof WarfarinScheduleSchema>) => {
    console.log("values", values);
    const dateData = new FormData();
    const formData = new FormData();

    const formattedDate = new Date(values.start_date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    dateData.append("start_date", formattedDate);

    // await insertWarfarinSchedule(dateData);

    daysOfWeek.forEach((day) => {
      data.forEach((item) => {
        const key = `${day}-${item.pill_strength}`;
        const value = values[key];
        formData.append(key, value);
      });
    });

    await insertWarfarinDosages(formData);

    form.reset();
  };

  return (
    <div className="border border-slate-200 rounded-md p-9  bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-x-5">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal w-full",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the date when you start your prescribed dosages.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="bg-green-200 p-5 rounded-md">
                Below you can specify your doses for each day. The values are in
                pill form. For example, 1.5 is equal to 1 &frac12; pills, 2
                equals 2 pills etc.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 w-full gap-6 ">
            {daysOfWeek.map((day) => (
              <DayOfWeek key={day} day={day} data={data} form={form} />
            ))}
          </div>
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

function DayOfWeek({
  day,
  data,
  form,
}: {
  day: string;
  data: TWarfarinScheduleForm;
  form: any;
}) {
  const calculateSumForDay = (day: string) => {
    let sum = 0;
    data.forEach((item) => {
      const inputValue = form.watch(`${day}-${item.pill_strength}`);
      if (inputValue) {
        sum += parseFloat(inputValue) * parseFloat(item.warfarin.strength);
      }
    });
    return sum;
  };
  return (
    <div>
      <div className="border border-slate-200 p-4 rounded-t-md text-center">
        <p className="font-bold text-xl mb-4">
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </p>
        {data.map((item) => (
          <div key={`${day}-${item.pill_strength}`}>
            <FormField
              control={form.control}
              name={`${day}-${item.pill_strength}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 items-baseline">
                  <FormControl>
                    <Input
                      placeholder="#"
                      type="number"
                      step="0.5"
                      {...field}
                      {...form.register(`${day}-${item.pill_strength}`)}
                    />
                  </FormControl>
                  <FormLabel className="mt-0 pt-0">
                    {item.warfarin.strength}
                    {item.warfarin.unit}
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
      <p className="pt-2 text-sm min-h-9 border rounded-b-md bg-slate-100  text-center text-slate-500">
        {calculateSumForDay(day)}mg
      </p>
    </div>
  );
}
