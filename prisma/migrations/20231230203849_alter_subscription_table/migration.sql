/*
  Warnings:

  - Added the required column `description` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_type` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "plan_type" INTEGER NOT NULL;
