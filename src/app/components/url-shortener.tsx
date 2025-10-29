"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { Input } from "~/app/components/ui/input";
import { Button } from "~/app/components/ui/button";
import { Label } from "~/app/components/ui/label";

export default function URLShortenerCard() {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [validatedUrl, setValidatedUrl] = useState("");

  const validUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const generateSlug = (url: string) => {
    if (!url) return "";
    // Simple slug generation - you can customize this logic
    return Math.random().toString(36).substring(2, 8);
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (validUrl(value)) {
      setValidatedUrl(value);
    }
  };

  const handleShortenUrl = () => {
    if (!url) return;
    // Add your URL shortening logic here
    console.log("Shortening URL:", url, "with slug:", slug);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Shorten URL</CardTitle>
        <CardDescription>
          Enter a long URL to create a shortened version
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </div>

        {validatedUrl && (
          <div className="space-y-2" hidden={!url}>
            <Label>Preview</Label>
            <div className="bg-background/90 flex items-center justify-center space-x-1 rounded-md p-2 text-sm">
              <span className="text-muted-foreground">
                https://url.shawnb.dev/
              </span>
              <Input value={slug} disabled className="focus:ring-0" />
              <Button
                size="sm"
                onClick={() => setSlug(generateSlug(url))}
                disabled={!url}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <Button onClick={handleShortenUrl} className="w-full" disabled={!url}>
          Shorten URL
        </Button>
      </CardContent>
    </Card>
  );
}
