import { HydrateClient } from "~/trpc/server";
import URLShortenerCard from "~/app/components/url-shortener";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <HydrateClient>
      <SignedIn>
        <div className="container mx-auto flex max-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-4xl font-bold">Welcome to URL Shortener</h1>
          <URLShortenerCard />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto flex max-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-4 py-8">
          <h1 className="text-4xl font-bold">Welcome to URL Shortener</h1>
          <p className="text-center text-lg">
            Please sign in to start shortening your URLs.
          </p>
          <SignInButton>Sign In</SignInButton>
        </div>
      </SignedOut>
    </HydrateClient>
  );
}
