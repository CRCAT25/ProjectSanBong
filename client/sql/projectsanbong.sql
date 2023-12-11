-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 11, 2023 lúc 03:54 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `projectsanbong`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_passedhoadon_proc` (IN `p_IDHoaDon` INT)   BEGIN
    DELETE FROM hoadon WHERE IDHoaDon = p_IDHoaDon AND TrangThai = 'Pending';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertAndReturnHoaDon` (IN `p_IDTaiKhoan` INT, IN `p_IDSan` INT, IN `p_IDKhungGio` INT, IN `p_Ngay` DATE, IN `p_GiaoHuu` INT, IN `p_TongTien` DECIMAL(10,2))   BEGIN
    DECLARE newHoaDonID INT;

    -- Insert into hoadon table
    INSERT INTO hoadon(IDTaiKhoan, IDSan, IDKhungGio, Ngay, GiaoHuu, TongTien, ThoiGianDat, TrangThai)
    VALUES(p_IDTaiKhoan, p_IDSan, p_IDKhungGio, p_Ngay, p_GiaoHuu, p_TongTien, NOW(), 'Pending');

    -- Get the ID of the last inserted row
    SET newHoaDonID = LAST_INSERT_ID();

    -- Select the newly inserted row
    SELECT *
    FROM hoadon
    WHERE IDHoaDon = newHoaDonID;
SET GLOBAL event_scheduler = 'ON';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `anh`
--

CREATE TABLE `anh` (
  `IDAnh` int(11) NOT NULL,
  `IDSan` int(11) NOT NULL,
  `Anh` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `anh`
--

INSERT INTO `anh` (`IDAnh`, `IDSan`, `Anh`) VALUES
(1, 1, 'san1.jpg'),
(2, 1, 'san2.jpg'),
(3, 2, 'san3.jpg'),
(4, 3, 'san4.jpg'),
(5, 4, 'san5.jpg'),
(6, 4, 'san6.jpg'),
(7, 3, 'san7.jpg'),
(8, 5, 'san1.jpg'),
(9, 5, 'san3.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `IDHoaDon` int(11) NOT NULL,
  `IDTaiKhoan` int(11) DEFAULT NULL,
  `IDSan` int(11) DEFAULT NULL,
  `IDKhungGio` int(11) DEFAULT NULL,
  `Ngay` date DEFAULT NULL,
  `GiaoHuu` int(11) DEFAULT 0,
  `IDDoiThu` int(11) DEFAULT NULL,
  `TongTien` int(11) DEFAULT NULL,
  `ThoiGianDat` datetime DEFAULT NULL,
  `TrangThai` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`IDHoaDon`, `IDTaiKhoan`, `IDSan`, `IDKhungGio`, `Ngay`, `GiaoHuu`, `IDDoiThu`, `TongTien`, `ThoiGianDat`, `TrangThai`) VALUES
(2, 3, 3, 4, '2023-09-30', 1, NULL, 180000, '2023-11-17 11:51:42', 'Completed'),
(4, 2, 3, 3, '2023-10-09', 0, NULL, 180000, '2023-11-18 13:39:35', 'Canceled'),
(5, 3, 2, 5, '2023-11-17', 0, NULL, 180000, '2023-11-14 13:53:07', 'Completed'),
(6, 3, 5, 5, '2023-11-17', 1, NULL, 180000, '2023-11-14 13:53:07', 'Completed'),
(7, 3, 5, 4, '2023-11-30', 1, NULL, 180000, '2023-11-24 11:10:38', 'Completed'),
(12, 18, 3, 5, '2023-12-01', 1, NULL, 180000, '2023-11-24 11:10:38', 'Completed'),
(13, 2, 4, 2, '2023-12-27', 1, NULL, 180000, '2023-11-24 11:10:38', 'Cancelled'),
(14, 3, 2, 5, '2022-05-24', 0, 7, 180000, '2023-11-14 13:53:07', 'Completed'),
(15, 2, 3, 3, '2023-11-17', 0, NULL, 180000, '2023-11-18 13:39:35', 'Canceled'),
(24, 18, 5, 4, '2022-01-10', 1, NULL, 180000, '2023-11-17 11:51:42', 'Completed'),
(25, 18, 2, 4, '2022-01-10', 1, NULL, 180000, '2023-11-17 11:51:42', 'Completed');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khunggio`
--

CREATE TABLE `khunggio` (
  `IDKhungGio` int(11) NOT NULL,
  `ThoiGian` varchar(15) NOT NULL,
  `GiaTien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khunggio`
--

INSERT INTO `khunggio` (`IDKhungGio`, `ThoiGian`, `GiaTien`) VALUES
(1, '5:00 - 7:00', 100),
(2, '7:30 - 9:30', 100),
(3, '10:00 - 12:00', 100),
(4, '13:00 - 15:00', 100),
(5, '15:30 - 17:30', 100),
(6, '19:00 - 21:00', 120);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaiphanquyen`
--

CREATE TABLE `loaiphanquyen` (
  `IDPhanQuyen` int(11) NOT NULL,
  `TenPhanQuyen` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaiphanquyen`
--

INSERT INTO `loaiphanquyen` (`IDPhanQuyen`, `TenPhanQuyen`) VALUES
(1, 'Player'),
(2, 'Center'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisan`
--

CREATE TABLE `loaisan` (
  `IDLoaiSan` int(11) NOT NULL,
  `TenLoaiSan` varchar(20) NOT NULL,
  `GiaTien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisan`
--

INSERT INTO `loaisan` (`IDLoaiSan`, `TenLoaiSan`, `GiaTien`) VALUES
(3, 'Nhỏ - Nhân tạo', 80),
(4, 'Vừa - Nhân tạo', 100),
(5, 'Lớn - Nhân tạo', 120),
(6, 'Nhỏ - Tự nhiên', 110),
(7, 'Vừa - Tự nhiên', 130),
(8, 'Lớn - Tự nhiên', 150);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanbong`
--

CREATE TABLE `sanbong` (
  `IDSan` int(11) NOT NULL,
  `IDTaiKhoan` int(11) NOT NULL,
  `IDLoaiSan` int(11) NOT NULL,
  `TenSan` varchar(30) NOT NULL,
  `TrangThai` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanbong`
--

INSERT INTO `sanbong` (`IDSan`, `IDTaiKhoan`, `IDLoaiSan`, `TenSan`, `TrangThai`) VALUES
(1, 1, 3, 'Sân 1', '0'),
(2, 1, 5, 'Sân 2', '0'),
(3, 1, 4, 'Sân 3', '0'),
(4, 7, 6, 'Sân 1', '0'),
(5, 7, 8, 'Sân 2', '0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `IDTaiKhoan` int(11) NOT NULL,
  `IDPhanQuyen` int(11) NOT NULL,
  `Ten` varchar(30) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `SoDienThoai` varchar(16) NOT NULL,
  `DiaChiCoSo` varchar(500) DEFAULT NULL,
  `NganHang` varchar(20) DEFAULT NULL,
  `STK` varchar(20) DEFAULT NULL,
  `Anh` varchar(200) DEFAULT NULL,
  `MatKhau` varchar(30) NOT NULL,
  `TrangThai` varchar(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`IDTaiKhoan`, `IDPhanQuyen`, `Ten`, `Email`, `SoDienThoai`, `DiaChiCoSo`, `NganHang`, `STK`, `Anh`, `MatKhau`, `TrangThai`) VALUES
(1, 2, 'Huy Hoàng', 'huyhoangct@gmail.com', '0913126754', '68/ Lê Lợi, Phường 04, Quận Gò Vấp, Thành phố Hồ Chí Minh', 'BIDV', '53458023523', 'coso1.jpg', '123123', '0'),
(2, 1, 'Đỗ Quốc Trí Tâm', 'TriTamtc30@gmail.com', '01256414127', '', 'ABBANK', '512784202454644', 'unknow.jpg', '123123', '1'),
(3, 3, 'Lê Hữu Minh', 'lehuuminhtc30@gmail.com', '0855280747', NULL, NULL, NULL, '', '123123', '0'),
(7, 2, 'Đông Hùng', 'donghungct@gmail.com', '0284635732', '123 đường Võ Tòng, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh', 'MBBank', '436326322', 'coso2.jpg', '123123', '1'),
(10, 2, 'Đông Trùng', 'lehuuminhtc3@gmail.com', '08552807475', '265 / Nguyen Tri Phuong, Phường Long Thạnh, Thị xã Tân Châu, Tỉnh An Giang', 'IBKHCM', '54123123123', 'coso1.jpg', '123123', '0'),
(11, 2, 'AAA', 'lehuumintc30@gmail.com', '0125415487', '285/Trần Văn Tông, Xã Vĩnh Mỹ A, Huyện Hoà Bình, Tỉnh Bạc Liêu', 'IBKHCM', '05485121', 'coso2.jpg', '123123', '0'),
(18, 2, 'Tam Thien Mew', 'tamthienmew@gmail.com', '012556882712', '265/Nguyen Tri Phuong, Xã Lương Bằng, Huyện Chợ Đồn, Tỉnh Bắc Kạn', 'HDBank', '12312331132', 'coso2.jpg', '123123', '0'),
(21, 1, 'Đỗ Quốc Trí Tâm', 'TriTamtc0@gmail.com', '012564141271', NULL, NULL, NULL, 'unknow.jpg', '123123', '1'),
(25, 1, 'HuynhTan', 'sdfsdf', '091312675', '', '', '', 'unknow.jpg', '1312312', '1'),
(26, 1, 'HuynhTan', 'fdwer', '0913126751', '', '', '', 'unknow.jpg', '132132', '0'),
(27, 3, 'AAAA', 'lehuuminh@gmail.com', '08552807', '', '', '', NULL, '12331233', '1'),
(49, 2, 'Hoàng Văn Thụ', 'hoangvanthutc@gmail.com', '091312674', '27/11/ Mai Văn Thụ, Xã Tân Thành, Thành phố Đồng Xoài, Tỉnh Bình Phước', 'BIDV', '0124346482', 'coso1.jpg', '123123123', '1'),
(50, 1, 'LeeMinHo', 'leeminho@gmail.com', '01256578421', NULL, NULL, NULL, 'unknow.jpg', '123123', '0');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `anh`
--
ALTER TABLE `anh`
  ADD PRIMARY KEY (`IDAnh`),
  ADD KEY `Anh_SanBong` (`IDSan`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`IDHoaDon`),
  ADD KEY `HoaDon_TaiKhoan` (`IDTaiKhoan`),
  ADD KEY `HoaDon_San` (`IDSan`),
  ADD KEY `HoaDon_KhungGio` (`IDKhungGio`),
  ADD KEY `HoaDon_DoiThu` (`IDDoiThu`);

--
-- Chỉ mục cho bảng `khunggio`
--
ALTER TABLE `khunggio`
  ADD PRIMARY KEY (`IDKhungGio`);

--
-- Chỉ mục cho bảng `loaiphanquyen`
--
ALTER TABLE `loaiphanquyen`
  ADD PRIMARY KEY (`IDPhanQuyen`);

--
-- Chỉ mục cho bảng `loaisan`
--
ALTER TABLE `loaisan`
  ADD PRIMARY KEY (`IDLoaiSan`);

--
-- Chỉ mục cho bảng `sanbong`
--
ALTER TABLE `sanbong`
  ADD PRIMARY KEY (`IDSan`),
  ADD KEY `SanBong_LoaiSan` (`IDLoaiSan`),
  ADD KEY `SanBong_TaiKhoan` (`IDTaiKhoan`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`IDTaiKhoan`),
  ADD KEY `TaiKhoan_PhanQuyen` (`IDPhanQuyen`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `anh`
--
ALTER TABLE `anh`
  MODIFY `IDAnh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `IDHoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `khunggio`
--
ALTER TABLE `khunggio`
  MODIFY `IDKhungGio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `loaiphanquyen`
--
ALTER TABLE `loaiphanquyen`
  MODIFY `IDPhanQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `loaisan`
--
ALTER TABLE `loaisan`
  MODIFY `IDLoaiSan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `sanbong`
--
ALTER TABLE `sanbong`
  MODIFY `IDSan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `IDTaiKhoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `anh`
--
ALTER TABLE `anh`
  ADD CONSTRAINT `Anh_SanBong` FOREIGN KEY (`IDSan`) REFERENCES `sanbong` (`IDSan`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `HoaDon_DoiThu` FOREIGN KEY (`IDDoiThu`) REFERENCES `taikhoan` (`IDTaiKhoan`),
  ADD CONSTRAINT `HoaDon_KhungGio` FOREIGN KEY (`IDKhungGio`) REFERENCES `khunggio` (`IDKhungGio`),
  ADD CONSTRAINT `HoaDon_San` FOREIGN KEY (`IDSan`) REFERENCES `sanbong` (`IDSan`),
  ADD CONSTRAINT `HoaDon_TaiKhoan` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`IDTaiKhoan`);

--
-- Các ràng buộc cho bảng `sanbong`
--
ALTER TABLE `sanbong`
  ADD CONSTRAINT `SanBong_LoaiSan` FOREIGN KEY (`IDLoaiSan`) REFERENCES `loaisan` (`IDLoaiSan`),
  ADD CONSTRAINT `SanBong_TaiKhoan` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`IDTaiKhoan`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `TaiKhoan_PhanQuyen` FOREIGN KEY (`IDPhanQuyen`) REFERENCES `loaiphanquyen` (`IDPhanQuyen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
