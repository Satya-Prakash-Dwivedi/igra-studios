/*
  Warnings:

  - You are about to drop the column `channel_link` on the `profiles` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Pace" AS ENUM ('Slow', 'Normal', 'Fast', 'Super');

-- CreateEnum
CREATE TYPE "Tone" AS ENUM ('Funny', 'Elegant', 'Serious', 'Casual', 'Professional', 'Informational');

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "channel_link";

-- CreateTable
CREATE TABLE "channels" (
    "id" TEXT NOT NULL,
    "logo" TEXT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "pace" "Pace" NOT NULL,
    "tone" "Tone" NOT NULL,
    "description" TEXT,
    "profileId" UUID NOT NULL,

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
