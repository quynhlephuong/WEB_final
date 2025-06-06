/*
  Warnings:

  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[MaTK]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `MaKH` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "billing" DROP CONSTRAINT "billing_MaKH_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_MaKH_fkey";

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
ADD COLUMN     "MaKH" VARCHAR(10) NOT NULL,
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("MaKH");

-- CreateIndex
CREATE UNIQUE INDEX "clients_MaTK_key" ON "clients"("MaTK");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_MaKH_fkey" FOREIGN KEY ("MaKH") REFERENCES "clients"("MaKH") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_MaKH_fkey" FOREIGN KEY ("MaKH") REFERENCES "clients"("MaKH") ON DELETE RESTRICT ON UPDATE CASCADE;
