/*
  Warnings:

  - You are about to alter the column `coords` on the `Kitchen` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("geometry")` to `Text`.
  - Added the required column `account_id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "location_idx";

-- AlterTable
ALTER TABLE "Kitchen" ALTER COLUMN "coords" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "account_id" INTEGER NOT NULL;
