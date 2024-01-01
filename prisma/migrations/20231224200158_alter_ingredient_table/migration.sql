/*
  Warnings:

  - You are about to drop the column `descroiption` on the `Ingredient` table. All the data in the column will be lost.
  - Added the required column `description` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "descroiption",
ADD COLUMN     "description" TEXT NOT NULL;
