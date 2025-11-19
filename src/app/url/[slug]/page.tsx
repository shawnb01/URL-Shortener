import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { api } from "~/trpc/server";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function UrlAnalyticsPage({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.slug || resolvedParams.slug.length === 0) {
    notFound();
  }

  const data = await api.url.getBySlug({
    slug: resolvedParams.slug,
  });
  if (!data) {
    notFound();
  }
  const urlData = {
    ...data,
    shortUrl: `https://url.shawnb.dev/${data.urlSlug}`,
    uniqueVisitors: 892,
    countries: [
      { name: "United States", count: 456 },
      { name: "Canada", count: 234 },
      { name: "United Kingdom", count: 178 },
    ],
    devices: [
      { name: "Desktop", count: 678 },
      { name: "Mobile", count: 432 },
      { name: "Tablet", count: 137 },
    ],
    browsers: [
      { name: "Chrome", count: 712 },
      { name: "Safari", count: 298 },
      { name: "Firefox", count: 237 },
    ],
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">URL Analytics</h1>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground mb-1 text-sm">Short URL</p>
            <Link
              className="mb-3 font-mono hover:underline"
              href={"/" + urlData.urlSlug}
            >
              {urlData.shortUrl}
            </Link>
            <p className="text-muted-foreground mb-1 text-sm">Original URL</p>
            <Link
              className="mb-3 font-mono hover:underline"
              href={urlData.targetUrl}
            >
              {urlData.targetUrl}
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {urlData.clicks.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {urlData.uniqueVisitors.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              {new Date(urlData.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urlData.countries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{country.name}</span>
                  <span className="font-semibold">{country.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urlData.devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{device.name}</span>
                  <span className="font-semibold">{device.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {urlData.browsers.map((browser, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{browser.name}</span>
                  <span className="font-semibold">{browser.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
