import * as z from "zod";

// export type TInrSchema = z.infer<typeof InrSchema>;

export const WarfarinPreferencesSchema = z.object({
  pill_strength: z.coerce
    .number({
      required_error: "Pill type is required",
      invalid_type_error: "Pill type is required",
    })
    .min(1, { message: "Pill type is required" }),
});
