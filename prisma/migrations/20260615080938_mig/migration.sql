/*
  Warnings:

  - You are about to drop the `BlogViews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlogViews" DROP CONSTRAINT "BlogViews_blogPostId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "BlogViews";
