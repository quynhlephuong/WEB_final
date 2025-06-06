/*
  Warnings:

  - A unique constraint covering the columns `[TenDangNhap]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_TenDangNhap_key" ON "accounts"("TenDangNhap");
