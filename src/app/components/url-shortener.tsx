"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { RefreshCw, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import {
  Form,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from "~/app/components/ui/form";
import { Input } from "~/app/components/ui/input";
import { Button } from "~/app/components/ui/button";
import { api } from "~/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  slug: z.string().length(6, "Slug must be exactly 6 characters"),
});

export default function URLShortenerCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "", slug: "" },
  });

  const { handleSubmit, watch, setValue } = form;
  const createUrl = api.url.create.useMutation();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createUrl.mutate(
      {
        slug: data.slug,
        targetUrl: data.url,
      },
      {
        onSuccess: (newUrl) => {
          // Handle success here, e.g., show success toast or message
          toast.success("Shortened URL created successfully!", {
            description: `Your shortened URL is https://url.shawnb.dev/${newUrl.urlSlug}`,
          });

          // Optionally reset the form
          form.reset();
        },
        onError: (error) => {
          toast.error("Failed to create shortened URL", {
            description: error.message,
          });

          form.resetField("slug");
        },
      },
    );
  };
  const values = watch();
  const generateSlug = (url: string) => {
    if (!url) return "";
    // Simple slug generation - you can customize this logic
    return Math.random().toString(36).substring(2, 8);
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="url">URL</FormLabel>
                  <FormControl>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com/very/long/url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="slug">Preview</FormLabel>
                  <FormControl>
                    <div className="bg-background/90 flex items-center justify-center space-x-1 rounded-md p-2 text-sm">
                      <span className="text-muted-foreground">
                        https://url.shawnb.dev/
                      </span>
                      <Input
                        id="slug"
                        type="text"
                        placeholder="Click the refresh button to generate"
                        minLength={6}
                        maxLength={6}
                        {...field}
                        disabled
                      />
                      <Button
                        size="sm"
                        type="button"
                        onClick={() =>
                          setValue("slug", generateSlug(values.url))
                        }
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        type="button"
                        onClick={() => setValue("slug", "")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={createUrl.isPending || !values.url || !values.slug}
            >
              Shorten URL
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
