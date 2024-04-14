import { getLastTwoWarfarinSchedules } from "@/app/actions/warfarin";
import { cn } from "@/lib/utils";

function getToday() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getWeek() {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate the offset to Sunday (0) from the current day
  const sundayOffset = (currentDayOfWeek + 7 - 0) % 7;

  // Calculate the start date of the week (Sunday)
  const sundayDate = new Date(today);
  sundayDate.setDate(today.getDate() - sundayOffset);

  // Initialize an array to store the days of the week
  const weekDays = [];

  // Populate the array with the dates of the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(sundayDate);
    date.setDate(sundayDate.getDate() + i);
    weekDays.push(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }
  return weekDays;
}

export default async function WarfarinOverview() {
  const weekDays = getWeek();

  const lastTwoWarfarinSchedules = await getLastTwoWarfarinSchedules();

  console.log(lastTwoWarfarinSchedules);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 text-sky-700">
        Medication Overview
      </h1>
      <div>
        <ul className="flex gap-4">
          {weekDays.map((day, index) => (
            <li
              key={index}
              className={cn("bg-white w-full text-center p-5 rounded-md", {
                "font-bold bg-slate-500 text-white": day == getToday(),
              })}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
