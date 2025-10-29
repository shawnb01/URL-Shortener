import { columns, type URL } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<URL[]> {
  // Fetch data from your API here.
  return [
    // Example data - replace with your actual data fetching logic
    // generating mock data for demonstration
    {
      id: "1",
      authorId: "user1",
      clicks: 0,
      status: "active",
      urlSlug: "a234nc",
      targetUrl: "https://www.google.com",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "2",
      authorId: "user2",
      clicks: 2,
      status: "inactive",
      urlSlug: "nsdjjj4",
      targetUrl: "https://bing.com/",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: "3",
      authorId: "user3",
      clicks: 5,
      status: "deleted",
      urlSlug: "rickroll",
      targetUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
