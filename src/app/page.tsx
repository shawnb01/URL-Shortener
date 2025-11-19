import { HydrateClient } from "~/trpc/server";
import URLShortenerCard from "~/app/components/url-shortener";

export default function Home() {
  return (
    <HydrateClient>
      <div className="container mx-auto flex max-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-4xl font-bold">Welcome to URL Shortener</h1>
        <URLShortenerCard />
      </div>
    </HydrateClient>
  );
}
