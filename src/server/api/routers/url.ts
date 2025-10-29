import { z } from "zod";

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
    return await ctx.db.url.findMany({});
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
});
