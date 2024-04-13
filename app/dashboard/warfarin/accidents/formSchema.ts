import * as z from "zod";

export const WarfarinAccidentSchema = z.object({
  date: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  type: z.enum(["missed", "incorrect"]),
  note: z.string().optional(),
});
