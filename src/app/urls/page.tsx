import { columns } from "./columns";
import { DataTable } from "./data-table";
import { api } from "~/trpc/server";

export default async function DemoPage() {
  const data = await api.url.getAllUrls();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
