/*
  Warnings:

  - You are about to drop the column `active` on the `Kitchen` table. All the data in the column will be lost.
  - Added the required column `address` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kitchen" DROP COLUMN "active",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SnappyAccount" ALTER COLUMN "status" SET DEFAULT 4;
