// @ts-nocheck
import * as z from "zod";
import { TWarfarinScheduleForm } from "./insert-form";

type TdaysOfWeekData = {
  id: number;
  name: string | null;
}[];

export function WarfarinScheduleInsertSchema(
  data: TWarfarinScheduleForm,
  daysOfWeekData: TdaysOfWeekData
) {
  const schemaObject = {
    start_date: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
  };
  daysOfWeekData.forEach((day) => {
    data.forEach((item) => {
      const key = `${day.id}-${item.pill_strength}`;

      schemaObject[key] = z.coerce
        .number({
          required_error: "Quantity is required",
          invalid_type_error: "Quantity must be a number",
        })
        .refine((value) => value !== undefined && value !== null, {
          message: "Value is required",
        })
        .refine((value) => Number.isInteger(value * 2) || value % 0.5 === 0, {
          message:
            "Value must be either whole or half (e.g., 1, 1.5, 2, 2.5, etc.)",
        })
        .refine((value) => value >= 0, {
          message: "Value has to be positive",
        });
    });
  });

  return z.object(schemaObject);
}
