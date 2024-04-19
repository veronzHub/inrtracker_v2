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
import { HalfPill, FullPill } from "./pills";
import { numberToWord } from "@/lib/utils";

export default async function Dashboard() {
  const inrs = await inrGet();

  const warfarinPrescription = await getWarfarinPreferences();

  const warfarinSchedules = await getWarfarinSchedules();

  const lastWarfarinSchedule = await getLastWarfarinSchedule();

  const warfarinAccidentsSinceLastInr =
    await getWarfarinAccidentsSinceLastInr();

  const renderPills = (dose: number, hex: string) => {
    const pills = [];
    const fullPillCount = Math.floor(dose);
    const halfPillCount = dose % 1 === 0.5 ? 1 : 0;

    for (let i = 0; i < fullPillCount; i++) {
      pills.push(<FullPill key={`full-${i}`} color={hex} />);
    }

    for (let i = 0; i < halfPillCount; i++) {
      pills.push(<HalfPill key={`half-${i}`} color={hex} />);
    }

    return pills;
  };

  const numberOfDaysSinceLastInr = () => {
    const givenDate = inrs[0].date ? new Date(inrs[0].date) : null;

    const today = new Date();

    const timeDifference = today.getTime() - (givenDate?.getTime() ?? 0);

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  function formatINRDate() {
    const givenDate = inrs[0].date ? new Date(inrs[0].date) : null;

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = givenDate?.toLocaleDateString("en-US", options);

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
              warfarinPrescription={warfarinPrescription.length}
              inrs={inrs.length}
              warfarinSchedules={warfarinSchedules.length}
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
                  {lastWarfarinSchedule?.every((item) => item.dose === 0) && (
                    <span className="font-bold text-slate-500 text-6xl">
                      skip
                    </span>
                  )}
                  <ul className="mt-5">
                    {lastWarfarinSchedule?.map((item) => {
                      return (
                        <>
                          {item.dose !== null &&
                            item.dose > 0 &&
                            item.warfarin &&
                            item.warfarin.hex && (
                              <li key={item.id}>
                                {renderPills(item.dose, item.warfarin.hex)}
                              </li>
                            )}
                        </>
                      );
                    })}
                    {lastWarfarinSchedule?.map((item) => {
                      return (
                        <>
                          {item.dose !== null &&
                            item.dose > 0 &&
                            item.warfarin && (
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
                      {(lastWarfarinSchedule ?? [])
                        .filter((item) => item.dose != null && item.dose > 0)
                        .reduce(
                          (total, item) =>
                            total +
                            (item.dose ?? 0) *
                              (item.warfarin?.strength
                                ? parseInt(item.warfarin.strength)
                                : 0),
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
