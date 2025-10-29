import { api, HydrateClient } from "~/trpc/server";
import URLShortenerCard from "~/app/components/url-shortener";

export default async function Home() {
  void api.url.getAllUrls.prefetch();

  return (
    <HydrateClient>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-bold">Welcome to URL Shortener</h1>
          <URLShortenerCard />
        </div>
      </main>
    </HydrateClient>
  );
}
