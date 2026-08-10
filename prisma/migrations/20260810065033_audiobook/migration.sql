/*
  Warnings:

  - You are about to drop the column `blogPostId` on the `AudioBook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogSlug]` on the table `AudioBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogSlug` to the `AudioBook` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AudioBook" DROP CONSTRAINT "AudioBook_blogPostId_fkey";

-- DropIndex
DROP INDEX "AudioBook_blogPostId_key";

-- AlterTable
ALTER TABLE "AudioBook" DROP COLUMN "blogPostId",
ADD COLUMN     "blogSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AudioBook_blogSlug_key" ON "AudioBook"("blogSlug");

-- AddForeignKey
ALTER TABLE "AudioBook" ADD CONSTRAINT "AudioBook_blogSlug_fkey" FOREIGN KEY ("blogSlug") REFERENCES "BlogPost"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
