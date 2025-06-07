-- 1. Seed payment methods
INSERT INTO "payment_method" ("MaPTTT", "TenPTTT") VALUES
  ('PTTT001', 'Tiền mặt'),
  ('PTTT002', 'Chuyển khoản ngân hàng'),
  ('PTTT003', 'Thẻ tín dụng'),
  ('PTTT004', 'Ví điện tử Momo'),
  ('PTTT005', 'Ví điện tử ZaloPay')
ON CONFLICT ("MaPTTT") DO NOTHING;

-- 2. Seed admin account
INSERT INTO "accounts" ("MaTK", "TenDangNhap", "MatKhau", "VaiTro") VALUES
  ('TK_ADMIN', 'admin', 'admin', 'ADMIN')
ON CONFLICT ("MaTK") DO NOTHING;

-- 3. Seed staff linked to admin account
INSERT INTO "staffs" ("MaNVQL", "MaTK", "TenNVQL", "GioiTinh", "SDT", "Email") VALUES
  ('NVQL_ADMIN', 'TK_ADMIN', 'admin', TRUE, '+8419000000', 'admin@petshop.com')
ON CONFLICT ("MaNVQL") DO NOTHING;
