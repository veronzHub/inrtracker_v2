import { getWarfarinPreferences } from "@/app/actions/warfarin";
import * as z from "zod";
import { TWarfarinScheduleForm } from "./insert-form";

export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function WarfarinScheduleInsertSchema2(
  data: TWarfarinScheduleForm,
  daysOfWeekData
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

export function WarfarinScheduleInsertSchema(data: TWarfarinScheduleForm) {
  const schemaObject = {
    start_date: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
    }),
  };
  daysOfWeek.forEach((day) => {
    data.forEach((item) => {
      const key = `${day}-${item.pill_strength}`;

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
