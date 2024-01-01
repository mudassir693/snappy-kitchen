/*
  Warnings:

  - Added the required column `account_id` to the `Kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kitchen" ADD COLUMN     "account_id" INTEGER NOT NULL;
