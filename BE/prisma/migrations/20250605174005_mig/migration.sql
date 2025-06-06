/*
  Warnings:

  - Added the required column `Email` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "Email" VARCHAR(100) NOT NULL;
