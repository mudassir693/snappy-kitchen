/*
  Warnings:

  - Added the required column `coords` to the `Kitchen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allowedUser` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/

CREATE EXTENSION postgis;
-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "coords" geometry(Point, 4326) NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "allowedUser" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "location_idx" ON "Kitchen" USING GIST ("coords");
