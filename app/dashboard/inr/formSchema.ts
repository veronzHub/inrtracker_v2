import * as z from "zod";

// export type TInrSchema = z.infer<typeof InrSchema>;

export const InrSchema = z.object({
  date: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  inr: z.coerce
    .number({
      required_error: "INR is required",
      invalid_type_error: "INR must be a number",
    })
    .min(1, { message: "Value is required" }),
  note: z.string().optional(),
});
