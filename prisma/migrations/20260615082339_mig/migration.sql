-- CreateTable
CREATE TABLE "BlogViews" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogViews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BlogViews_blogPostId_idx" ON "BlogViews"("blogPostId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogViews_blogPostId_sessionId_key" ON "BlogViews"("blogPostId", "sessionId");

-- AddForeignKey
ALTER TABLE "BlogViews" ADD CONSTRAINT "BlogViews_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
