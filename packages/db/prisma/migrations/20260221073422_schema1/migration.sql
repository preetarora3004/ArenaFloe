/*
  Warnings:

  - You are about to drop the column `Stock` on the `Merchandise` table. All the data in the column will be lost.
  - Added the required column `stock` to the `Merchandise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchandise" DROP COLUMN "Stock",
ADD COLUMN     "stock" INTEGER NOT NULL;
