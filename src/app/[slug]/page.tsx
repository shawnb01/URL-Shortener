import type { headers } from "next/headers";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import type { db } from "~/server/db";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  try {
    // Database query to find the URL by slug
    const urlRecord = await db.url.findUnique({
      where: { slug },
      include: { analytics: true },
    });

    if (!urlRecord) {
      notFound();
    }

    // Log analytics
    await db.analytics.create({
      data: {
        urlId: urlRecord.id,
        visitedAt: new Date(),
        userAgent: headers().get("user-agent") || "",
        ip:
          headers().get("x-forwarded-for") || headers().get("x-real-ip") || "",
      },
    });

    // Update click count
    await db.url.update({
      where: { id: urlRecord.id },
      data: { clickCount: { increment: 1 } },
    });

    // Redirect to original URL
    redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error processing redirect:", error);
    notFound();
  }
}
