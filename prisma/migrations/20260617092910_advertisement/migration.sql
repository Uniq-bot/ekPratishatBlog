-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('BANNER', 'ASIDE', 'POPUP');

-- AlterTable
ALTER TABLE "Advertisement" ADD COLUMN     "AdType" "AdType" NOT NULL DEFAULT 'BANNER',
ADD COLUMN     "isAdRunning" BOOLEAN NOT NULL DEFAULT true;
