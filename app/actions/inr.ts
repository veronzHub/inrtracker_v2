"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { InrSchema } from "../dashboard/inr/formSchema";

export type FormState = {
  message: string;
};

export const inrGet = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inrs")
    .select("id, inr, date, note")
    .order("date", { ascending: false });

  if (error) {
    throw new Error("Error fetching data");
  }
  return data;
};

export const inrDelete = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase.from("inrs").delete().eq("id", id);

  if (error) {
    return error;
  }

  return revalidatePath(`/dashboard/inr/records`);
};

export const inrPut = async (formData: FormData, id: number) => {
  const data = Object.fromEntries(formData);
  const parsed = InrSchema.safeParse({
    date: formData.get("date") as string,
    inr: formData.get("inr") as number | null,
    note: formData.get("note") as string,
  });

  console.log(formData);

  if (!parsed.success) {
    console.log("error?");
    return {
      message: "invalid form data",
    };
  }
  const date = formData.get("date") as string;
  const inr = formData.get("inr") as number | null;
  const note = formData.get("note") as string;

  const supabase = createClient();

  const { error } = await supabase
    .from("inrs")
    .update({ date, inr, note })
    .eq("id", id);

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/inr/records`);
};

export const inrInsert = async (formData: FormData): Promise<FormState> => {
  console.log(formData);
  const data = Object.fromEntries(formData);
  const parsed = InrSchema.safeParse({
    date: formData.get("date") as string,
    inr: formData.get("inr") as number | null,
    note: formData.get("note") as string,
  });

  if (!parsed.success) {
    console.log("error?");
    return {
      message: "invalid form data",
    };
  }

  const date = formData.get("date") as string;
  const inr = formData.get("inr") as number | null;
  const note = formData.get("note") as string;

  const supabase = createClient();

  const { error } = await supabase.from("inrs").insert({ inr, note, date });

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/inr/records`);

  return { message: "success" };
};
