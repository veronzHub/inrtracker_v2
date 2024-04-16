import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { inrGet } from "../actions/inr";
import InrChart from "./inr/chart";
import {
  getLastWarfarinSchedule,
  getWarfarinAccidentsSinceLastInr,
  getWarfarinPreferences,
  getWarfarinSchedules,
} from "../actions/warfarin";
import Tasks from "./tasks";
import H1 from "@/components/ui/dashboard/h1";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const inrs = await inrGet();

  const warfarinPrescription = await getWarfarinPreferences();

  const warfarinSchedules = await getWarfarinSchedules();

  const lastWarfarinSchedule = await getLastWarfarinSchedule();

  const warfarinAccidentsSinceLastInr =
    await getWarfarinAccidentsSinceLastInr();

  const renderPills = (item) => {
    const pills = [];
    const fullPillCount = Math.floor(item.dose);
    const halfPillCount = item.dose % 1 === 0.5 ? 1 : 0;

    for (let i = 0; i < fullPillCount; i++) {
      pills.push(<FullPill key={`full-${i}`} color={item.warfarin.hex} />);
    }

    for (let i = 0; i < halfPillCount; i++) {
      pills.push(<HalfPill key={`half-${i}`} color={item.warfarin.hex} />);
    }

    return pills;
  };

  const numberOfDaysSinceLastInr = () => {
    const givenDate = new Date(inrs[0].date);
    const today = new Date();

    const timeDifference = today.getTime() - givenDate.getTime();

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  function formatINRDate(date) {
    const givenDate = new Date(inrs[0].date);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = givenDate.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <div>
      <H1>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
        })}{" "}
        <span className="text-slate-700">{getToday()}</span>
      </H1>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-10">
        {inrs.length === 0 ||
        warfarinPrescription.length === 0 ||
        warfarinSchedules.length === 0 ? (
          <>
            <div className="bg-primary text-white  rounded-md  flex flex-col items-center justify-center h-full">
              <p className="text-4xl mb-3">Welcome!</p>
              <p>Complete the tasks on the right to finish setup</p>
            </div>
            <Tasks
              warfarinPrescription={warfarinPrescription}
              inrs={inrs}
              warfarinSchedules={warfarinSchedules}
            />
          </>
        ) : (
          <>
            <div className="border border-slate-200 rounded-md p-9 text-center bg-white flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-semibold mb-2">
                Today's Warfarin Dose
              </p>

              {warfarinSchedules.length > 0 ? (
                <div>
                  {lastWarfarinSchedule.every((item) => item.dose === 0) && (
                    <span className="font-bold text-slate-500 text-6xl">
                      skip
                    </span>
                  )}
                  <ul className="mt-5">
                    {lastWarfarinSchedule.map((item) => {
                      return (
                        <>
                          {item.dose > 0 && (
                            <li key={item.id}>{renderPills(item)}</li>
                          )}
                        </>
                      );
                    })}
                    {lastWarfarinSchedule.map((item) => {
                      return (
                        <>
                          {item.dose > 0 && (
                            <li
                              className="text-xs text-slate-500 mb-2"
                              key={item.id}
                            >
                              {numberToWord(item.dose)} (
                              {item.warfarin.strength}mg){" "}
                              {item.dose <= 1 ? "pill" : "pills"}
                            </li>
                          )}
                        </>
                      );
                    })}
                    <div className="text-xs text-slate-500 mb-2">
                      {" "}
                      Total Dosage:{" "}
                      {lastWarfarinSchedule
                        .filter((item) => item.dose > 0)
                        .reduce(
                          (total, item) =>
                            total + item.dose * item.warfarin.strength,
                          0
                        )}{" "}
                      mg
                    </div>
                  </ul>
                </div>
              ) : (
                <p className="italic">No doses</p>
              )}
            </div>
            <div className="border border-slate-200 rounded-md p-9 text-center bg-white flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-semibold mb-4">Days Since Last INR</p>
              <h2>
                <span className="font-bold text-primary text-6xl">
                  {numberOfDaysSinceLastInr()}
                </span>
              </h2>

              <p className="mt-4 text-xs text-slate-500">{formatINRDate()}</p>
            </div>
            <div className="border border-slate-200 rounded-md p-9 text-center bg-white text-4xl flex flex-col items-center justify-center h-full">
              <p className="text-2xl font-semibold mb-4">Accidents</p>
              <h2>
                <span className="font-bold text-primary text-6xl">
                  {warfarinAccidentsSinceLastInr}
                </span>
              </h2>
              <p className="mt-4 text-xs text-slate-500">Since your last INR</p>
            </div>
          </>
        )}
      </div>

      {inrs.length > 0 && (
        <div className="flex-grow md:shrink-0">
          <h2 className="text-2xl font-bold mb-3">INR History</h2>
          <InrChart data={inrs} />
        </div>
      )}
    </div>
  );
}

function getToday() {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function FullPill({ color }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-full h-6 w-10 rotate-45 mb-4"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

function HalfPill({ color }) {
  return (
    <span
      className="inline-block bg-blue-500 rounded-r-full h-6 w-7 rotate-45 mb-4 ml-1"
      style={{ backgroundColor: `#${color}` }}
    ></span>
  );
}

const numberToWord = (num: number) => {
  const words = {
    0.5: "Half",
    1: "One",
    1.5: "One and a half",
    2: "Two",
    2.5: "Two and a half",
    3: "Three",
    3.5: "Three and a half",
    4: "Four",
    4.5: "Four and a half",
    5: "Five",
    5.5: "Five and a half",
    6: "Six",
    6.5: "Six and a half",
    7: "Seven",
    7.5: "Seven and a half",
    8: "Eight",
    8.5: "Eight and a half",
    9: "Nine",
    9.5: "Nine and a half",
  };

  return words[num] || num;
};
