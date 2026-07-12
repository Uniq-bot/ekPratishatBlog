-- DropIndex
DROP INDEX "BlogPost_status_viewCount_createdAt_idx";

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");
