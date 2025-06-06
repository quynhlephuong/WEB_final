/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `billing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `billing_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `payment_method` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `pets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reports` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schedules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `schedules_detail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `staffs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `workers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "billing" DROP CONSTRAINT "billing_MaKH_fkey";

-- DropForeignKey
ALTER TABLE "billing_detail" DROP CONSTRAINT "billing_detail_MaCTLH_fkey";

-- DropForeignKey
ALTER TABLE "billing_detail" DROP CONSTRAINT "billing_detail_MaHD_fkey";

-- DropForeignKey
ALTER TABLE "billing_detail" DROP CONSTRAINT "billing_detail_MaPTTT_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_MaTK_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_MaKH_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_MaNVQL_fkey";

-- DropForeignKey
ALTER TABLE "schedules_detail" DROP CONSTRAINT "schedules_detail_MaDV_fkey";

-- DropForeignKey
ALTER TABLE "schedules_detail" DROP CONSTRAINT "schedules_detail_MaLichHen_fkey";

-- DropForeignKey
ALTER TABLE "schedules_detail" DROP CONSTRAINT "schedules_detail_MaThuCung_fkey";

-- DropForeignKey
ALTER TABLE "staffs" DROP CONSTRAINT "staffs_MaTK_fkey";

-- DropForeignKey
ALTER TABLE "workers" DROP CONSTRAINT "workers_MaTK_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
ALTER COLUMN "MaTK" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("MaTK");

-- AlterTable
ALTER TABLE "billing" DROP CONSTRAINT "billing_pkey",
ALTER COLUMN "MaHD" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaKH" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "billing_pkey" PRIMARY KEY ("MaHD");

-- AlterTable
ALTER TABLE "billing_detail" DROP CONSTRAINT "billing_detail_pkey",
ALTER COLUMN "MaCTHD" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaHD" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaCTLH" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaPTTT" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "billing_detail_pkey" PRIMARY KEY ("MaCTHD");

-- AlterTable
ALTER TABLE "clients" DROP CONSTRAINT "clients_pkey",
ALTER COLUMN "MaTK" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaKH" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "clients_pkey" PRIMARY KEY ("MaKH");

-- AlterTable
ALTER TABLE "payment_method" DROP CONSTRAINT "payment_method_pkey",
ALTER COLUMN "MaPTTT" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "payment_method_pkey" PRIMARY KEY ("MaPTTT");

-- AlterTable
ALTER TABLE "pets" DROP CONSTRAINT "pets_pkey",
ALTER COLUMN "MaThuCung" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaKH" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "pets_pkey" PRIMARY KEY ("MaThuCung");

-- AlterTable
ALTER TABLE "reports" DROP CONSTRAINT "reports_pkey",
ALTER COLUMN "MaBC" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaNVQL" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "reports_pkey" PRIMARY KEY ("MaBC");

-- AlterTable
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_pkey",
ALTER COLUMN "MaLichHen" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "schedules_pkey" PRIMARY KEY ("MaLichHen");

-- AlterTable
ALTER TABLE "schedules_detail" DROP CONSTRAINT "schedules_detail_pkey",
ALTER COLUMN "MaCTLH" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaThuCung" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaDV" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaLichHen" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "schedules_detail_pkey" PRIMARY KEY ("MaCTLH");

-- AlterTable
ALTER TABLE "services" DROP CONSTRAINT "services_pkey",
ALTER COLUMN "MaDV" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "services_pkey" PRIMARY KEY ("MaDV");

-- AlterTable
ALTER TABLE "staffs" DROP CONSTRAINT "staffs_pkey",
ALTER COLUMN "MaNVQL" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaTK" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "staffs_pkey" PRIMARY KEY ("MaNVQL");

-- AlterTable
ALTER TABLE "workers" DROP CONSTRAINT "workers_pkey",
ALTER COLUMN "MaNVCS" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "MaTK" SET DATA TYPE VARCHAR(50),
ADD CONSTRAINT "workers_pkey" PRIMARY KEY ("MaNVCS");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "accounts"("MaTK") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "accounts"("MaTK") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workers" ADD CONSTRAINT "workers_MaTK_fkey" FOREIGN KEY ("MaTK") REFERENCES "accounts"("MaTK") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_MaKH_fkey" FOREIGN KEY ("MaKH") REFERENCES "clients"("MaKH") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules_detail" ADD CONSTRAINT "schedules_detail_MaThuCung_fkey" FOREIGN KEY ("MaThuCung") REFERENCES "pets"("MaThuCung") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules_detail" ADD CONSTRAINT "schedules_detail_MaDV_fkey" FOREIGN KEY ("MaDV") REFERENCES "services"("MaDV") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules_detail" ADD CONSTRAINT "schedules_detail_MaLichHen_fkey" FOREIGN KEY ("MaLichHen") REFERENCES "schedules"("MaLichHen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing" ADD CONSTRAINT "billing_MaKH_fkey" FOREIGN KEY ("MaKH") REFERENCES "clients"("MaKH") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_detail" ADD CONSTRAINT "billing_detail_MaHD_fkey" FOREIGN KEY ("MaHD") REFERENCES "billing"("MaHD") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_detail" ADD CONSTRAINT "billing_detail_MaCTLH_fkey" FOREIGN KEY ("MaCTLH") REFERENCES "schedules_detail"("MaCTLH") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billing_detail" ADD CONSTRAINT "billing_detail_MaPTTT_fkey" FOREIGN KEY ("MaPTTT") REFERENCES "payment_method"("MaPTTT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_MaNVQL_fkey" FOREIGN KEY ("MaNVQL") REFERENCES "staffs"("MaNVQL") ON DELETE RESTRICT ON UPDATE CASCADE;
