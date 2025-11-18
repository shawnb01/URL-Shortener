import { z } from "zod";
import { type URLDataObject } from "~/lib/types";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const urlRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ slug: z.string().min(1), targetUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.url.create({
        data: {
          authorId: "user1",
          clicks: 0,
          status: "active",
          targetUrl: input.targetUrl,
          urlSlug: input.slug,
        },
      });
    }),

  getAllUrls: publicProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.url.findMany({
      orderBy: { id: "asc" },
    });

    if (!res) {
      return [] as URLDataObject[];
    } else {
      return res as URLDataObject[];
    }
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const urlEntry = await ctx.db.url.findUnique({
        where: { urlSlug: input.slug },
      });
      return urlEntry;
    }),
  getByAuthor: publicProcedure
    .input(z.object({ authorId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const urlEntries = await ctx.db.url.findMany({
        where: { authorId: input.authorId },
      });
      return urlEntries;
    }),

  incrementClickCount: publicProcedure
    .input(z.object({ slug: z.string().length(6) }))
    .mutation(async ({ ctx, input }) => {
      const updatedUrl = await ctx.db.url.update({
        where: { urlSlug: input.slug },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
      return updatedUrl;
    }),
});
