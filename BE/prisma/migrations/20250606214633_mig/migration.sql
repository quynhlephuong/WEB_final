-- CreateTable
CREATE TABLE "accounts" (
    "MaTK" VARCHAR(50) NOT NULL,
    "TenDangNhap" VARCHAR(50) NOT NULL,
    "MatKhau" VARCHAR(255) NOT NULL,
    "VaiTro" VARCHAR(50) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("MaTK")
);

-- CreateTable
CREATE TABLE "clients" (
    "MaKH" VARCHAR(50) NOT NULL,
    "MaTK" VARCHAR(50) NOT NULL,
    "TenKH" VARCHAR(100) NOT NULL,
    "GioiTinh" BOOLEAN NOT NULL,
    "DiaChi" VARCHAR(255) NOT NULL,
    "SDT" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("MaKH")
);

-- CreateTable
CREATE TABLE "staffs" (
    "MaNVQL" VARCHAR(50) NOT NULL,
    "MaTK" VARCHAR(50) NOT NULL,
    "TenNVQL" VARCHAR(100) NOT NULL,
    "GioiTinh" BOOLEAN NOT NULL,
    "SDT" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("MaNVQL")
);

-- CreateTable
CREATE TABLE "workers" (
    "MaNVCS" VARCHAR(50) NOT NULL,
    "MaTK" VARCHAR(50) NOT NULL,
    "TenNVCS" VARCHAR(100) NOT NULL,
    "GioiTinh" BOOLEAN NOT NULL,
    "SDT" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(100) NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("MaNVCS")
);

-- CreateTable
CREATE TABLE "services" (
    "MaDV" VARCHAR(50) NOT NULL,
    "TenDV" VARCHAR(100) NOT NULL,
    "Gia" DOUBLE PRECISION NOT NULL,
    "MoTaDV" TEXT NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("MaDV")
);

-- CreateTable
CREATE TABLE "pets" (
    "MaThuCung" VARCHAR(50) NOT NULL,
    "MaKH" VARCHAR(50) NOT NULL,
    "TenThuCung" VARCHAR(100) NOT NULL,
    "GioiTinh" BOOLEAN NOT NULL,
    "Giong" VARCHAR(100) NOT NULL,
    "CanNang" DOUBLE PRECISION NOT NULL,
    "Loai" VARCHAR(50) NOT NULL,
    "TrangThai" VARCHAR(50) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("MaThuCung")
);

-- CreateTable
CREATE TABLE "schedules" (
    "MaLichHen" VARCHAR(50) NOT NULL,
    "NgayHen" TIMESTAMP(3) NOT NULL,
    "GioHen" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("MaLichHen")
);

-- CreateTable
CREATE TABLE "schedules_detail" (
    "MaCTLH" VARCHAR(50) NOT NULL,
    "MaThuCung" VARCHAR(50) NOT NULL,
    "MaDV" VARCHAR(50) NOT NULL,
    "MaLichHen" VARCHAR(50) NOT NULL,

    CONSTRAINT "schedules_detail_pkey" PRIMARY KEY ("MaCTLH")
);

-- CreateTable
CREATE TABLE "payment_method" (
    "MaPTTT" VARCHAR(50) NOT NULL,
    "TenPTTT" VARCHAR(100) NOT NULL,

    CONSTRAINT "payment_method_pkey" PRIMARY KEY ("MaPTTT")
);

-- CreateTable
CREATE TABLE "billing" (
    "MaHD" VARCHAR(50) NOT NULL,
    "MaKH" VARCHAR(50) NOT NULL,
    "NgayLapHD" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("MaHD")
);

-- CreateTable
CREATE TABLE "billing_detail" (
    "MaCTHD" VARCHAR(50) NOT NULL,
    "MaHD" VARCHAR(50) NOT NULL,
    "MaCTLH" VARCHAR(50) NOT NULL,
    "MaPTTT" VARCHAR(50) NOT NULL,
    "TongTien" INTEGER NOT NULL,

    CONSTRAINT "billing_detail_pkey" PRIMARY KEY ("MaCTHD")
);

-- CreateTable
CREATE TABLE "reports" (
    "MaBC" VARCHAR(50) NOT NULL,
    "MaNVQL" VARCHAR(50) NOT NULL,
    "NgaylapBC" TIMESTAMP(3) NOT NULL,
    "LoaiBC" VARCHAR(100) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("MaBC")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_TenDangNhap_key" ON "accounts"("TenDangNhap");

-- CreateIndex
CREATE UNIQUE INDEX "clients_MaTK_key" ON "clients"("MaTK");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_MaTK_key" ON "staffs"("MaTK");

-- CreateIndex
CREATE UNIQUE INDEX "workers_MaTK_key" ON "workers"("MaTK");

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
