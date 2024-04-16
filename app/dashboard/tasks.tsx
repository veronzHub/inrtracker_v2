import Link from "next/link";

export default function Tasks({
  inrs,
  warfarinPrescription,
  warfarinSchedules,
}) {
  return (
    <div className="col-span-2 border border-slate-200 rounded-md p-10  bg-white  h-full">
      <h2 className=" text-primary text-2xl font-bold mb-3">Your Tasks</h2>
      <ul className="list-[number]">
        <>
          {warfarinPrescription.length === 0 ? (
            <li className="ml-10">
              <Link
                href="/dashboard/warfarin/prescription"
                className="text-emerald-500 font-bold"
              >
                Define your Warfarin prescription
              </Link>
            </li>
          ) : (
            <li className="ml-10 line-through">
              Define your Warfarin prescription
            </li>
          )}

          {inrs.length === 0 ? (
            <li className="ml-10">
              <Link
                href="/dashboard/inr"
                className="text-emerald-500 font-bold"
              >
                Log an INR
              </Link>
            </li>
          ) : (
            <li className="ml-10 line-through text-slate-400">Log an INR</li>
          )}

          {warfarinSchedules.length === 0 ? (
            <li className="ml-10">
              <Link
                href="/dashboard/warfarin/schedule"
                className="text-emerald-500 font-bold"
              >
                Input your dosage schedule
              </Link>
            </li>
          ) : (
            <li className="ml-10 line-through">Input your dosage schedule</li>
          )}
        </>
      </ul>
    </div>
  );
}
