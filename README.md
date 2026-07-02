# Production Optimization Notes

This repository now includes a focused production pass aimed at reducing slow Supabase/Prisma reads and trimming unnecessary payloads on the hottest blog routes.

## What changed

The main blog listing queries now fetch only the fields used by the UI. Heavy `content` payloads were removed from list views, and the latest/popular/curated/ad queries were narrowed to reduce transfer size and row hydration work.

The blog detail page now loads the article separately from the comment thread and limits comment hydration to the most recent 25 rows instead of pulling the entire thread eagerly.

The Prisma schema now includes indexes for the most common production filters and sort paths: published feeds, curated content, popular content, category filtering, and comment lookup by blog post.

The view-recording route was cleaned up by removing a stray log statement.

## Likely cause of the slow database call

The main slowdown was query shape, not Prisma client creation. The app already memoizes the Prisma client, so the problem was mostly from fetching too many fields and rows, especially on blog list and detail routes. On Supabase, those larger queries become more noticeable because each request pays network and query-planning cost.

## Production follow-up

Run a Prisma migration or equivalent SQL migration to apply the new indexes in `prisma/schema.prisma`.

If your Supabase `DATABASE_URL` points at a direct connection string, keep using the pooled Supabase endpoint for runtime traffic in production. That is an environment-level setting rather than a code change.
