CREATE DATABASE PAWS_PET_HOUSE

CREATE TABLE KHACHHANG (
    MaKH VARCHAR(10) PRIMARY KEY,
    TenKH NVARCHAR(50),
    MaTK VARCHAR(10),
    GioiTinh BIT, -- 1 = Nam, 0 = Nữ
    DiaChi NVARCHAR(100),
    SDT VARCHAR(15)
);
 
CREATE TABLE NHANVIENQUANLY (
    MaNVQL VARCHAR(10) PRIMARY KEY,
    MaTK VARCHAR(10),
    TenNVQL NVARCHAR(50),
    GioiTinh BIT,
    SDT VARCHAR(15),
    Email NVARCHAR(100)
);

CREATE TABLE NHANVIENCHAMSOC (
    MaNVCS VARCHAR(10) PRIMARY KEY,
    MaTK VARCHAR(10),
    TenNVCS NVARCHAR(50),
    GioiTinh BIT,
    SDT VARCHAR(15),
    Email NVARCHAR(100)
);

CREATE TABLE DICHVU (
    MaDV VARCHAR(10) PRIMARY KEY,
    TenDV NVARCHAR(100),
    Gia DECIMAL(15,2),
    MoTaDV NVARCHAR(255)
);

CREATE TABLE THUCUNG (
    MaThuCung VARCHAR(10) PRIMARY KEY,
    MaKH VARCHAR(10),
    TenThuCung NVARCHAR(50),
    GioiTinh BIT,  
    Giong NVARCHAR(50),
    CanNang DECIMAL(5,2),
    Loai NVARCHAR(20)
);

CREATE TABLE TAIKHOAN (
    MaTK VARCHAR(10) PRIMARY KEY,
    TenDangNhap NVARCHAR(50) UNIQUE,
    MatKhau NVARCHAR(50),
    VaiTro NVARCHAR(50)  
);

CREATE TABLE LICHHEN (
    MaLichHen VARCHAR(10) PRIMARY KEY,
    NgayHen DATE,
    GioHen TIME
);

CREATE TABLE CHITIETLICHHEN (
    MaCTLH VARCHAR(10) PRIMARY KEY,
    MaThuCung VARCHAR(10),
    MaDV VARCHAR(10),
    MaLichHen VARCHAR(10),
    FOREIGN KEY (MaThuCung) REFERENCES THUCUNG(MaThuCung),
    FOREIGN KEY (MaDV) REFERENCES DICHVU(MaDV),
    FOREIGN KEY (MaLichHen) REFERENCES LICHHEN(MaLichHen)
);

CREATE TABLE PHUONGTHUCTHANHTOAN (
    MaPTTT VARCHAR(10) PRIMARY KEY,
    TenPTTT NVARCHAR(100) NOT NULL
);

CREATE TABLE HOADON (
    MaHD VARCHAR(10) PRIMARY KEY,
    MaKH VARCHAR(10),
    NgayLapHD DATETIME
);

CREATE TABLE CHITIETHOADON (
    MaCTHD VARCHAR(10) PRIMARY KEY,
    MaHD VARCHAR(10),
    MaCTLH VARCHAR(10),
    MaPTTT VARCHAR(10),
    TongTien DECIMAL(15, 2),
    FOREIGN KEY (MaHD) REFERENCES HOADON(MaHD),
    FOREIGN KEY (MaPTTT) REFERENCES PHUONGTHUCTHANHTOAN(MaPTTT)
);

CREATE TABLE BAOCAO (
    MaBC VARCHAR(10) PRIMARY KEY,
    MaNVQL VARCHAR(10),
    NgayLapBC DATETIME,
    LoaiBC NVARCHAR(100)
);

------------------INSERT DATA
INSERT INTO KHACHHANG (MaKH, TenKH, MaTK, GioiTinh, DiaChi, SDT) VALUES
('KH001', N'Nguyễn Thị A', 'TK001', 0, N'123 Lê Lợi, Quận 1, TP.HCM', '0901234567'),
('KH002', N'Trần Văn B', 'TK002', 1, N'45 Nguyễn Huệ, Quận 1, TP.HCM', '0902345678'),
('KH003', N'Lê Thị C', 'TK003', 0, N'78 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', '0903456789'),
('KH004', N'Phạm Minh D', 'TK004', 1, N'100 Trần Hưng Đạo, Quận 5, TP.HCM', '0904567890'),
('KH005', N'Hồ Ngọc E', 'TK005', 0, N'200 Cống Quỳnh, Quận Tân Bình, TP.HCM', '0905678901'),
('KH006', N'Bùi Văn F', 'TK006', 1, N'50 Phan Xích Long, Quận Phú Nhuận, TP.HCM', '0906789012'),
('KH007', N'Bùi Thị G', 'TK007', 0, N'30 Nguyễn Trí Phương, Quận 10, TP.HCM', '0907890123'),
('KH008', N'Huỳnh Long H', 'TK008', 1, N'150 Nguyễn Trãi, Quận 1, TP.HCM', '0908901234'),
('KH009', N'Cao Thị I', 'TK009', 0, N'60 Đinh Tiên Hoàng, Quận 1, TP.HCM', '0909012345'),
('KH010', N'Trương Đình K', 'TK010', 1, N'90 Pasteur, Quận 3, TP.HCM', '0910123456'),
('KH011', N'Nguyễn Hữu L', 'TK011', 1, N'112 Vĩnh Lợi, Quận 3, TP.HCM', '0911234567'),
('KH012', N'Phan Thị M', 'TK012', 0, N'234 Lý Tự Trọng, Quận 1, TP.HCM', '0912345678'),
('KH013', N'Vũ Văn N', 'TK013', 1, N'567 Trường Chinh, Tân Bình, TP.HCM', '0913456789'),
('KH014', N'Đoàn Thị O', 'TK014', 0, N'890 Đinh Tiên Hoàng, Phú Nhuận, TP.HCM', '0914567890'),
('KH015', N'Lương Mạnh P', 'TK015', 1, N'12 Nguyễn Du, Quận 1, TP.HCM', '0915678901');

INSERT INTO NHANVIENQUANLY (MaNVQL, MaTK, TenNVQL, GioiTinh, SDT, Email) VALUES
('NVQL001', 'TK016', N'Đinh Văn An', 1, '0987654321', 'an.dinh@petcare.com'),
('NVQL002', 'TK017', N'Nguyễn Thị Bình', 0, '0987123456', 'binh.nguyen@petcare.com'),
('NVQL003', 'TK018', N'Trần Minh Cường', 1, '0987234567', 'cuong.tran@petcare.com'),
('NVQL004', 'TK019', N'Lê Thị Dũng', 0, '0987345678', 'dung.le@petcare.com'),
('NVQL005', 'TK020', N'Phạm Văn Khoa', 1, '0987456789', 'khoa.pham@petcare.com'),
('NVQL006', 'TK021', N'Võ Thị Lan', 0, '0987567890', 'lan.vo@petcare.com'),
('NVQL007', 'TK022', N'Hồ Văn Mẫn', 1, '0987678901', 'man.ho@petcare.com'),
('NVQL008', 'TK023', N'Đỗ Thị Na', 0, '0987789012', 'na.do@petcare.com'),
('NVQL009', 'TK024', N'Nguyễn Văn Oai', 1, '0987890123', 'oai.nguyen@petcare.com'),
('NVQL010', 'TK025', N'Phan Thị Phượng', 0, '0987901234', 'phuong.phan@petcare.com');

INSERT INTO NHANVIENCHAMSOC (MaNVCs, MaTK, TenNVCs, GioiTinh, SDT, Email) VALUES
('NVCS001', 'TK026', N'Đào Minh Khang', 1, '0912345678', 'khang.dao@petcare.com'),
('NVCS002', 'TK027', N'Vũ Thị Thu', 0, '0912456789', 'thu.vu@petcare.com'),
('NVCS003', 'TK028', N'Trần Văn Quốc', 1, '0912567890', 'quoc.tran@petcare.com'),
('NVCS004', 'TK029', N'Mai Thị Hồng', 0, '0912678901', 'hong.mai@petcare.com'),
('NVCS005', 'TK030', N'Lê Hữu Nghĩa', 1, '0912789012', 'nghia.le@petcare.com'),
('NVCS006', 'TK031', N'Huỳnh Thị Xuân', 0, '0912890123', 'xuan.huynh@petcare.com'),
('NVCS007', 'TK032', N'Ngô Văn Tùng', 1, '0912901234', 'tung.ngo@petcare.com'),
('NVCS008', 'TK033', N'Trần Thủy Hân', 0, '0913012345', 'han.tran@petcare.com'),
('NVCS009', 'TK034', N'Bùi Văn Kiên', 1, '0913123456', 'kien.bui@petcare.com'),
('NVCS010', 'TK035', N'Lý Thị Mai', 0, '0913234567', 'mai.ly@petcare.com'),
('NVCS011', 'TK036', N'Cao Văn Lực', 1, '0913345678', 'luc.cao@petcare.com'),
('NVCS012', 'TK037', N'Nguyễn Thị Thanh Thảo', 0, '0913456789', 'thao.nguyen@petcare.com'),
('NVCS013', 'TK038', N'Đỗ Minh Quang', 1, '0913567890', 'quang.do@petcare.com'),
('NVCS014', 'TK039', N'Phạm Thị Yến', 0, '0913678901', 'yen.pham@petcare.com'),
('NVCS015', 'TK040', N'Hồ Văn Phát', 1, '0913789012', 'phat.ho@petcare.com');

INSERT INTO DICHVU (MaDV, TenDV, Gia, MoTaDV) VALUES
('DV001', N'Tắm & Sấy cho chó', 150000.00, N'Dịch vụ tắm và sấy khô cho chó, sử dụng sản phẩm chuyên dụng'),
('DV002', N'Cắt tỉa lông mèo', 200000.00, N'Dịch vụ cắt tỉa lông tạo kiểu cho mèo'),
('DV003', N'Khám sức khỏe tổng quát', 300000.00, N'Kiểm tra tổng thể sức khỏe thú cưng, tư vấn chế độ dinh dưỡng'),
('DV004', N'Nhổm lông thú căng', 400000.00, N'Nhổm lông cho thú căng với các mẫu sắc đa dạng');

INSERT INTO THUCUNG (MaThuCung, MaKH, TenThuCung, GioiTinh, Giong, CanNang, Loai) VALUES
('TC001', 'KH001', N'Mực', 1, N'Poodle Toy', 3.50, N'Chó'),
('TC002', 'KH002', N'Bông', 0, N'British Shorthair', 4.20, N'Mèo'),
('TC003', 'KH003', N'Cá Phèn', 1, N'Golden Retriever', 28.00, N'Chó'),
('TC004', 'KH004', N'Mimi', 0, N'Scottish Fold', 3.80, N'Mèo'),
('TC005', 'KH005', N'Lucky', 1, N'Husky', 25.00, N'Chó'),
('TC006', 'KH006', N'Luna', 0, N'ragdoll', 5.50, N'Mèo'),
('TC007', 'KH007', N'Oreo', 1, N'Corgi', 12.00, N'Chó'),
('TC008', 'KH008', N'Kitty', 0, N'Persian', 4.00, N'Mèo'),
('TC009', 'KH009', N'Max', 1, N'Bulldog Pháp', 10.00, N'Chó'),
('TC010', 'KH010', N'Chăm', 0, N'Siamese', 3.00, N'Mèo'),
('TC011', 'KH011', N'Kiki', 1, N'Beagle', 11.50, N'Chó'),
('TC012', 'KH012', N'Gấu', 1, N'Pomeranian', 2.80, N'Chó'),
('TC013', 'KH013', N'Sunny', 0, N'American Shorthair', 4.50, N'Méo'),
('TC014', 'KH014', N'Bon', 1, N'Shiba Inu', 10.50, N'Chó'),
('TC015', 'KH015', N'Meow', 0, N'Maine Coon', 6.00, N'Mèo'),
('TC016', 'KH001', N'Sushi', 0, N'Alaskan Malamute', 35.00, N'Chó'),
('TC017', 'KH002', N'Coco', 1, N'Sphynx', 3.00, N'Mèo'),
('TC018', 'KH003', N'Boo', 1, N'Chihuahua', 1.80, N'Chó'),
('TC019', 'KH004', N'Tom', 1, N'Russian Blue', 4.00, N'Méo'),
('TC020', 'KH005', N'Bolt', 1, N'Dachshund', 7.00, N'Chó');

INSERT INTO TAIKHOAN (MaTK, TenDangNhap, MatKhau, VaiTro) VALUES
('TK001', 'nguyen.a', 'abc1', 'Khách hàng'),
('TK002', 'tran.b', 'abc2', 'Khách hàng'),
('TK003', 'le.c', 'abc3', 'Khách hàng'),
('TK004', 'pham.d', 'abc4', 'Khách hàng'),
('TK005', 'ho.e', 'abc5', 'Khách hàng'),
('TK006', 'dang.f', 'abc6', 'Khách hàng'),
('TK007', 'bui.g', 'abc7', 'Khách hàng'),
('TK008', 'hoang.h', 'abc8', 'Khách hàng'),
('TK009', 'cao.i', 'abc9', 'Khách hàng'),
('TK010', 'truong.k', 'abc10', 'Khách hàng'),
('TK011', 'nguyen.l', 'abc11', 'Khách hàng'),
('TK012', 'phan.m', 'abc12', 'Khách hàng'),
('TK013', 'vu.n', 'abc13', 'Khách hàng'),
('TK014', 'doan.o', 'abc14', 'Khách hàng'),
('TK015', 'luong.p', 'abc15', 'Khách hàng'),
('TK016', 'admin.an', 'abc16', 'Nhân viên quản lý'),
('TK017', 'admin.binh', 'abc17', 'Nhân viên quản lý'),
('TK018', 'admin.cuong', 'abc18', 'Nhân viên quản lý'),
('TK019', 'admin.dung', 'abc19', 'Nhân viên quản lý'),
('TK020', 'admin.khoa', 'abc20', 'Nhân viên quản lý'),
('TK021', 'admin.lan', 'abc21', 'Nhân viên quản lý'),
('TK022', 'admin.man', 'abc22', 'Nhân viên quản lý'),
('TK023', 'admin.na', 'abc23', 'Nhân viên quản lý'),
('TK024', 'admin.oai', 'abc24', 'Nhân viên quản lý'),
('TK025', 'admin.phuong', 'abc25', 'Nhân viên quản lý'),
('TK026', 'staff.khang', 'abc26', 'Nhân viên chăm sóc'),
('TK027', 'staff.thu', 'abc27', 'Nhân viên chăm sóc'),
('TK028', 'staff.quy', 'abc28', 'Nhân viên chăm sóc'),
('TK029', 'staff.hong', 'abc29', 'Nhân viên chăm sóc'),
('TK030', 'staff.nghia', 'abc30', 'Nhân viên chăm sóc'),
('TK031', 'staff.xuan', 'abc31', 'Nhân viên chăm sóc'),
('TK032', 'staff.tung', 'abc32', 'Nhân viên chăm sóc'),
('TK033', 'staff.hanh', 'abc33', 'Nhân viên chăm sóc'),
('TK034', 'staff.kien', 'abc34', 'Nhân viên chăm sóc'),
('TK035', 'staff.mai', 'abc35', 'Nhân viên chăm sóc'),
('TK036', 'staff.luc', 'abc36', 'Nhân viên chăm sóc'),
('TK037', 'staff.thao', 'abc37', 'Nhân viên chăm sóc'),
('TK038', 'staff.quang', 'abc38', 'Nhân viên chăm sóc'),
('TK039', 'staff.yen', 'abc39', 'Nhân viên chăm sóc'),
('TK040', 'staff.phat', 'abc40', 'Nhân viên chăm sóc');

INSERT INTO LICHHEN (MaLichHen, NgayHen, GioHen) VALUES
('LH001', '2025-05-24', '09:00:00'),
('LH002', '2025-05-25', '10:30:00'),
('LH003', '2025-05-26', '14:00:00'),
('LH004', '2025-05-27', '16:00:00'),
('LH005', '2025-05-28', '08:30:00'),
('LH006', '2025-05-29', '11:00:00'),
('LH007', '2025-05-30', '13:30:00'),
('LH008', '2025-05-31', '15:00:00'),
('LH009', '2025-06-01', '09:15:00'),
('LH010', '2025-06-02', '10:45:00'),
('LH011', '2025-06-03', '14:30:00'),
('LH012', '2025-06-04', '16:30:00'),
('LH013', '2025-06-05', '09:00:00'),
('LH014', '2025-06-06', '10:00:00'),
('LH015', '2025-06-07', '11:30:00'),
('LH016', '2025-06-08', '14:00:00'),
('LH017', '2025-06-09', '09:30:00'),
('LH018', '2025-06-10', '13:00:00'),
('LH019', '2025-06-11', '10:00:00'),
('LH020', '2025-06-12', '15:00:00');

INSERT INTO CHITIETLICHHEN (MaCTLH, MaThuCung, MaDV, MaLichHen) VALUES
('CTLH001', 'TC001', 'DV001', 'LH001'),
('CTLH002', 'TC002', 'DV002', 'LH002'),
('CTLH003', 'TC003', 'DV003', 'LH003'),
('CTLH004', 'TC004', 'DV004', 'LH004'),
('CTLH005', 'TC005', 'DV001', 'LH005'),
('CTLH006', 'TC006', 'DV002', 'LH006'),
('CTLH007', 'TC007', 'DV003', 'LH007'),
('CTLH008', 'TC008', 'DV004', 'LH008'),
('CTLH009', 'TC009', 'DV001', 'LH009'),
('CTLH010', 'TC010', 'DV002', 'LH010'),
('CTLH011', 'TC011', 'DV003', 'LH011'),
('CTLH012', 'TC012', 'DV004', 'LH012'),
('CTLH013', 'TC013', 'DV001', 'LH013'),
('CTLH014', 'TC014', 'DV002', 'LH014'),
('CTLH015', 'TC015', 'DV003', 'LH015'),
('CTLH016', 'TC016', 'DV004', 'LH016'),
('CTLH017', 'TC017', 'DV001', 'LH017'),
('CTLH018', 'TC018', 'DV002', 'LH018'),
('CTLH019', 'TC019', 'DV003', 'LH019'),
('CTLH020', 'TC020', 'DV004', 'LH020');

INSERT INTO PHUONGTHUCTHANHTOAN (MaPTTT, TenPTTT) VALUES
('PTTT001', 'Tiền mặt'),
('PTTT002', 'Chuyển khoản ngân hàng'),
('PTTT003', 'Thẻ tín dụng'),
('PTTT004', 'Ví điện tử Momo'),
('PTTT005', 'Ví điện tử ZaloPay');

INSERT INTO HOADON (MaHD, MaKH, NgayLapHD) VALUES
('HD001', 'KH001', '2025-05-24 10:00:00'),
('HD002', 'KH002', '2025-05-25 12:00:00'),
('HD003', 'KH003', '2025-05-26 12:00:00'),
('HD004', 'KH004', '2025-05-27 12:00:00'),
('HD005', 'KH005', '2025-05-28 12:00:00'),
('HD006', 'KH006', '2025-05-29 15:00:00'),
('HD007', 'KH007', '2025-05-30 12:00:00'),
('HD008', 'KH008', '2025-05-31 12:00:00'),
('HD009', 'KH009', '2025-06-01 12:00:00'),
('HD010', 'KH010', '2025-06-02 17:00:00'),
('HD011', 'KH011', '2025-06-03 12:00:00'),
('HD012', 'KH012', '2025-06-04 12:00:00'),
('HD013', 'KH013', '2025-06-05 12:00:00'),
('HD014', 'KH014', '2025-06-06 12:00:00'),
('HD015', 'KH015', '2025-06-07 21:00:00'),
('HD016', 'KH001', '2025-06-08 12:00:00'),
('HD017', 'KH002', '2025-06-09 12:00:00'),
('HD018', 'KH003', '2025-06-10 12:00:00'),
('HD019', 'KH004', '2025-06-11 12:00:00'),
('HD020', 'KH005', '2025-06-12 12:00:00');

INSERT INTO CHITIETHOADON (MaCTHD, MaHD, MaCTLH, MaPTTT, TongTien) VALUES
('CTHD001', 'HD001', 'CTLH001', 'PTTT001', 150000),
('CTHD002', 'HD002', 'CTLH002', 'PTTT002', 200000),
('CTHD003', 'HD003', 'CTLH003', 'PTTT003', 300000),
('CTHD004', 'HD004', 'CTLH004', 'PTTT004', 250000),
('CTHD005', 'HD005', 'CTLH005', 'PTTT005', 80000),
('CTHD006', 'HD006', 'CTLH006', 'PTTT001', 150000),
('CTHD007', 'HD007', 'CTLH007', 'PTTT002', 300000),
('CTHD008', 'HD008', 'CTLH008', 'PTTT003', 200000),
('CTHD009', 'HD009', 'CTLH009', 'PTTT004', 250000),
('CTHD010', 'HD010', 'CTLH010', 'PTTT005', 80000),
('CTHD011', 'HD011', 'CTLH011', 'PTTT001', 120000),
('CTHD012', 'HD012', 'CTLH012', 'PTTT002', 100000),
('CTHD013', 'HD013', 'CTLH013', 'PTTT003', 250000),
('CTHD014', 'HD014', 'CTLH014', 'PTTT004', 300000),
('CTHD015', 'HD015', 'CTLH015', 'PTTT005', 150000),
('CTHD016', 'HD016', 'CTLH016', 'PTTT001', 500000),
('CTHD017', 'HD017', 'CTLH017', 'PTTT002', 400000),
('CTHD018', 'HD018', 'CTLH018', 'PTTT003', 180000),
('CTHD019', 'HD019', 'CTLH019', 'PTTT004', 80000),
('CTHD020', 'HD020', 'CTLH020', 'PTTT005', 250000);

INSERT INTO BAOCAO (MaBC, MaNVQL, NgayLapBC, LoaiBC) VALUES
('BC001', 'NVQL001', '2025-06-20', 'Báo cáo doanh thu'),
('BC002', 'NVQL002', '2025-06-20', 'Báo cáo dịch vụ'),
('BC003', 'NVQL001', '2025-06-21', 'Báo cáo khách hàng'),
('BC004', 'NVQL003', '2025-06-21', 'Báo cáo lịch hẹn'),
('BC005', 'NVQL002', '2025-06-22', 'Báo cáo thú cưng'),
('BC006', 'NVQL004', '2025-06-22', 'Báo cáo khách hàng'),
('BC007', 'NVQL003', '2025-06-23', 'Báo cáo hiệu suất nhân viên'),
('BC008', 'NVQL001', '2025-06-23', 'Báo cáo thú cưng'),
('BC009', 'NVQL005', '2025-06-24', 'Báo cáo hiệu suất nhân viên'),
('BC010', 'NVQL004', '2025-06-24', 'Báo cáo hiệu suất nhân viên');