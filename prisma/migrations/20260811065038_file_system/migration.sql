/*
  Warnings:

  - You are about to drop the `AudioBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AudioBook" DROP CONSTRAINT "AudioBook_blogSlug_fkey";

-- DropTable
DROP TABLE "AudioBook";

-- CreateTable
CREATE TABLE "FileSystem" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT,
    "url" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "blogPostId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileSystem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileSystem" ADD CONSTRAINT "FileSystem_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
