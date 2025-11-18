"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Loader, TriangleAlertIcon } from "lucide-react";

export default function RedirectPage() {
  const urlMutation = api.url.incrementClickCount.useMutation();
  const utils = api.useUtils();
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  console.log("Slug from params:", slug);

  const {
    data: urlData,
    isLoading,
    isError,
  } = api.url.getBySlug.useQuery({ slug: slug });

  console.log("Fetched URL data:", urlData);

  useEffect(() => {
    if (urlData?.targetUrl) {
      urlMutation.mutate({ slug: slug });
      router.push(urlData.targetUrl);
    }
  }, [urlData, router, slug, utils, urlMutation]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-4">
          <CardTitle>
            <h1>Redirecting...</h1>
          </CardTitle>
          <CardContent>
            <Loader className="animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="p-4">
          <CardTitle>
            <h1>Error</h1>
          </CardTitle>
          <CardContent>
            <TriangleAlertIcon className="mb-2 text-red-500" />
            <p>Failed to redirect to {urlData?.targetUrl}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="p-4">
        <CardTitle>
          <h1>Redirecting...</h1>
        </CardTitle>
        <CardContent>
          <p>Redirecting to {urlData?.targetUrl}</p>
        </CardContent>
      </Card>
    </div>
  );
}
