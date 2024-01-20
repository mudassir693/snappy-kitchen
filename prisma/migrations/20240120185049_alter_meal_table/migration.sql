/*
  Warnings:

  - Added the required column `kitchen_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "kitchen_id" INTEGER NOT NULL;
