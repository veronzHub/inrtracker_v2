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

import { WarfarinScheduleInsertSchema2 } from "@/app/dashboard/warfarin/schedule/formSchema";

const FormDefaultValues = (data: TWarfarinScheduleForm, daysOfWeekData) => {
  const defaultValues = {};

  daysOfWeekData.forEach((day) => {
    data.forEach((item) => {
      const key = `${day.id}-${item.pill_strength}`;
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

export type TdaysOfWeekData = {
  id: number;
  name: string | null;
}[];

export default function WarfarinScheduleInsertForm({
  data,
  daysOfWeekData,
}: {
  data: TWarfarinScheduleForm;
  daysOfWeekData: TdaysOfWeekData;
}) {
  const WarfarinScheduleSchema = WarfarinScheduleInsertSchema2(
    data,
    daysOfWeekData
  );

  const form = useForm<z.infer<typeof WarfarinScheduleSchema>>({
    resolver: zodResolver(WarfarinScheduleSchema),
    defaultValues: {
      ...FormDefaultValues(data, daysOfWeekData),
    },
  });

  const onSubmit = async (values: z.infer<typeof WarfarinScheduleSchema>) => {
    console.log("values", values);
    const dateData = new FormData();

    const formattedDate = new Date(values.start_date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    dateData.append("start_date", formattedDate);

    const dateId = await insertWarfarinSchedule(dateData);
    console.log(dateId);

    const dosagesData = [];

    daysOfWeekData.forEach((day) => {
      data.forEach((item) => {
        dosagesData.push({
          start_date: dateId[0].id,
          day_of_week: day.id,
          dose: values[`${day.id}-${item.pill_strength}`],
          strength: item.warfarin.id,
        });
      });
    });

    await insertWarfarinDosages(dosagesData);

    form.reset();
  };

  return (
    <div className="border border-slate-200 rounded-md p-9  bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-wrap gap-x-5 ">
            <div className="md:w-[300px] sm:w-full mb-8 md:mb-0">
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
            </div>
            <div className="flex-1">
              <p className="bg-green-200 p-5 rounded-md">
                Below you can specify your doses for each day. The values are in
                pill form. For example, 1.5 is equal to 1 &frac12; pills, 2
                equals 2 pills etc. If you are skipping a dose type 0 or leave
                blank.
              </p>
            </div>
          </div>
          <div className="grid xl:grid-cols-7 md:grid-cols-4 sm:grid-cols-1 w-full gap-6 ">
            {daysOfWeekData.map((day) => (
              <DayOfWeek key={day.id} day={day} data={data} form={form} />
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
  day: TdaysOfWeekData;
  data: TWarfarinScheduleForm;
  form: any;
}) {
  const calculateSumForDay = (day) => {
    let sum = 0;
    data.forEach((item) => {
      const inputValue = form.watch(`${day.id}-${item.pill_strength}`);
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
          {day.name.charAt(0).toUpperCase() + day.name.slice(1)}
        </p>
        <div className="grid grid-cols-2 items-baseline text-xs text-slate-400 mb-2">
          <p>Quantity</p>
          <p>Pill Type</p>
        </div>
        {data.map((item) => (
          <div key={`${day.id}-${item.pill_strength}`}>
            <FormField
              control={form.control}
              name={`${day.id}-${item.pill_strength}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 items-baseline">
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      step="0.5"
                      {...field}
                      {...form.register(`${day.id}-${item.pill_strength}`)}
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
