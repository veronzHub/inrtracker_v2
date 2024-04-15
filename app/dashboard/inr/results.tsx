import { inrGet } from "@/app/actions/inr";
import InrChart from "./chart";
import Table from "./records/table";

export default async function InrResults() {
  const data = await inrGet();

  return (
    <>
      {data !== null && data.length > 0 ? (
        <>
          {/* <InrChart data={data} /> */}

          <Table data={data} />
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">No INR's Found</h2> Use the
          form on the left to submit your first INR.
        </div>
      )}
    </>
  );
}
