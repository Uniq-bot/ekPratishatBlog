-- AlterTable: add description to BlogPost if it doesn't exist
ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "description" TEXT;
