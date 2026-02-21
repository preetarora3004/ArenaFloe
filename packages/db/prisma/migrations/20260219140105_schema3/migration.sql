/*
  Warnings:

  - You are about to drop the column `location` on the `Stadium` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Stadium" DROP COLUMN "location",
ADD COLUMN     "capacity" INTEGER NOT NULL;
