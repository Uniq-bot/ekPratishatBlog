-- CreateTable
CREATE TABLE "Advertisement" (
    "id" TEXT NOT NULL,
    "AdTitle" TEXT NOT NULL,
    "AdDescription" TEXT NOT NULL,
    "AdPoster" TEXT NOT NULL,
    "AdLink" TEXT NOT NULL,
    "AdSponsorName" TEXT NOT NULL,

    CONSTRAINT "Advertisement_pkey" PRIMARY KEY ("id")
);
