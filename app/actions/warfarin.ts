// @ts-nocheck
"use server";

import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { WarfarinPreferencesSchema } from "../dashboard/warfarin/prescription/formSchema";
import { idText } from "typescript";
import { TinsertWarfarinDosages } from "@/types/warfarin";
import { WarfarinAccidentSchema } from "../dashboard/warfarin/accidents/formSchema";

export type FormState = {
  message?: string;
  errorMessage?: string;
  error?: string | PostgrestError;
};

export const getDaysOfWeek = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("days_of_week")
    .select("id, name")
    .order("id", { ascending: true });

  if (error) {
    console.log(error);

    throw new Error("Error fetching data");
  }

  return data;
};

export const getWarfarin = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin")
    .select("id, strength, unit, color")
    .order("id", { ascending: true });

  if (error) {
    console.log(error);

    throw new Error("Error fetching data");
  }

  const { data: userdata, error: usererror } = await supabase
    .from("warfarin_preferences")
    .select("pill_strength");

  if (usererror) {
    console.log(usererror);

    throw new Error("Error fetching data");
  }

  const filterData = data.filter(
    (item) => !userdata.some((newItem) => newItem.pill_strength === item.id)
  );

  return filterData;
};

export const getWarfarinPreferences = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin_preferences")
    .select("id, pill_strength, warfarin(id, strength, unit, color, hex)");

  if (error) {
    throw new Error("Error fetching data");
  }
  return data;
};

export const insertWarfarinPreferences = async (
  formData: FormData
): Promise<FormState> => {
  const data = Object.fromEntries(formData);
  const parsed = WarfarinPreferencesSchema.safeParse({
    pill_strength: formData.get("pill_strength") as number | null,
  });

  if (!parsed.success) {
    return {
      message: "invalid form data",
    };
  }
  const pill_strength = formData.get("pill_strength") as number | null;

  if (pill_strength !== null) {
    const supabase = createClient();

    const { data: existingRecords, error: queryError } = await supabase
      .from("warfarin_preferences")
      .select("*")
      .eq("pill_strength", pill_strength);

    if (queryError) {
      return {
        errorMessage: "Error occurred while checking existing records.",
        error: queryError,
      };
    }
    if (existingRecords && existingRecords.length > 0) {
      return {
        errorMessage: "A record with the same pill strength already exists.",
      };
    }

    const { error } = await supabase
      .from("warfarin_preferences")
      .insert({ pill_strength });

    if (error) {
      return error;
    }
    revalidatePath(`/dashboard/warfarin/settings`);
    return { message: "success" };
  }

  return { message: "invalid form data" };
};

export const deleteWarfarinPreferences = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("warfarin_preferences")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return error;
  }

  return revalidatePath(`/dashboard/warfarin/settings`);
};

export const insertWarfarinSchedule = async (formData: FormData) => {
  // const data = Object.fromEntries(formData);
  console.log("insertWarfarinSchedule");
  console.log(formData);

  const start_date = formData.get("start_date") as string;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin_schedules")
    .insert({ start_date })
    .select("id");

  if (error) {
    console.log(error);
    return error;
  }

  console.log("whas", data);
  revalidatePath(`/dashboard/warfarin/schedule`);
  console.log(data);
  return data;
};

export const deleteWarfarinScheduleAndDosages = async (id: number) => {
  const supabase = createClient();

  const { error: dosageError } = await supabase
    .from("warfarin_dosages")
    .delete()
    .eq("start_date", id);

  if (dosageError) {
    console.log(dosageError);
    return dosageError;
  }

  const { error } = await supabase
    .from("warfarin_schedules")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/warfarin/schedule`);
  return { message: "success" };
};

export const insertWarfarinDosages = async (
  dosagesData: TinsertWarfarinDosages
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin_dosages")
    .insert(dosagesData);

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/warfarin/schedule`);

  return { message: "success" };
};

export const getWarfarinSchedules = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin_schedules")
    .select("id, start_date")
    .order("start_date", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
  // console.log(data);
  return data;
};

export const getWarfarinDosages = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("query_warfarin_schedules_and_doses")
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }
  console.log(data);
  return data;
};

export const getWarfarinAccidentsSinceLastInr = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("inrs")
    .select("date")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }

  if (data.length > 0) {
    const {
      data: accidentData,
      error: accidentError,
      status,
      count,
    } = await supabase
      .from("warfarin_accidents")
      .select("*", { count: "exact" })
      .gte("date", data[0].date);

    if (accidentError) {
      console.log(accidentError);
      throw new Error("Error fetching data");
    }

    console.log(count);
    return count;
  }
  return;
};

export const insertWarfarinAccidents = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const supabase = createClient();

  const parsed = WarfarinAccidentSchema.safeParse({
    date: formData.get("date") as string,
    type: formData.get("type") as string,
    note: formData.get("date") as string,
  });

  if (!parsed.success) {
    console.log(parsed.error);
    return {
      message: "invalid form data",
    };
  }

  const date = formData.get("date") as string;
  const missed = formData.get("missed");
  const incorrect = formData.get("incorrect");
  const note = formData.get("note") as string;

  const { error } = await supabase
    .from("warfarin_accidents")
    .insert({ date, missed, incorrect, note });

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/warfarin/accidents`);
  return { message: "success" };
};

export const getWarfarinAccidents = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("warfarin_accidents").select();

  if (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }

  return data;
};

export const deleteWarfarinAccidents = async (id: number) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("warfarin_accidents")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return error;
  }

  return revalidatePath(`/dashboard/warfarin/accidents`);
};

export const updateWarfarinAccidents = async (
  formData: FormData,
  id: number
) => {
  const data = Object.fromEntries(formData);
  const supabase = createClient();

  const { error } = await supabase
    .from("warfarin_accidents")
    .update(data)
    .eq("id", id);

  if (error) {
    console.log(error);
    return error;
  }

  revalidatePath(`/dashboard/warfarin/accidents`);
  return { message: "success" };
};

export const getLastWarfarinSchedule = async () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const dowFix = currentDayOfWeek + 1;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("warfarin_schedules")
    .select("id")
    .order("start_date", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    throw new Error("Error fetching data");
  }

  if (data.length > 0) {
    const dateId = data[0].id;

    const { data: dosageData, error: dosageError } = await supabase
      .from("warfarin_dosages")
      .select(
        "id, dose, warfarin(id, strength, hex), warfarin_schedules(id), days_of_week(id, name)"
      )
      .eq("day_of_week", dowFix)
      .eq("start_date", dateId);

    if (dosageError) {
      console.log(dosageError);
      throw new Error("Error fetching data");
    }

    // console.log(dosageData);
    return dosageData;
  }

  return;
};
