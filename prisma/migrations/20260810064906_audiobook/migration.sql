-- CreateTable
CREATE TABLE "AudioBook" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "audioFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AudioBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AudioBook_blogPostId_key" ON "AudioBook"("blogPostId");

-- AddForeignKey
ALTER TABLE "AudioBook" ADD CONSTRAINT "AudioBook_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
