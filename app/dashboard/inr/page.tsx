import INRInsertForm from "./insert-form";
import { inrGet } from "@/app/actions/inr";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import InrChart from "./chart";
import H1 from "@/components/ui/dashboard/h1";
import H2 from "@/components/ui/dashboard/h2";

export default async function Inr() {
  const data = await inrGet();

  return (
    <div>
      <H1>INR</H1>

      <div className="flex gap-10 flex-col xl:flex-row">
        <div className="xl:w-96 w-full">
          <H2>Add New INR</H2>
          <INRInsertForm />
        </div>

        {data !== null && data.length > 0 ? (
          <div className="flex-grow">
            <H2>Trends</H2>
            <InrChart data={data} />
            <H2>INR History</H2>
            <DataTable columns={columns} data={data} />
          </div>
        ) : (
          <div className="flex text-center items-center justify-center flex-1">
            <div>
              <H2>No INR's Found</H2>{" "}
              <p>Use the form on the left to log your first INR.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
