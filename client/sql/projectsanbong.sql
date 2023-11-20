-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2023 at 05:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectsanbong`
--

-- --------------------------------------------------------

--
-- Table structure for table `anh`
--

CREATE TABLE `anh` (
  `IDAnh` int(11) NOT NULL,
  `IDSan` int(11) NOT NULL,
  `Anh` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `anh`
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
-- Table structure for table `hoadon`
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
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`IDHoaDon`, `IDTaiKhoan`, `IDSan`, `IDKhungGio`, `Ngay`, `GiaoHuu`, `IDDoiThu`, `TongTien`, `ThoiGianDat`, `TrangThai`) VALUES
(2, 3, 3, 4, '2023-11-30', 1, NULL, 180000, '2023-11-17 11:51:42', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `khunggio`
--

CREATE TABLE `khunggio` (
  `IDKhungGio` int(11) NOT NULL,
  `ThoiGian` varchar(15) NOT NULL,
  `GiaTien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khunggio`
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
-- Table structure for table `loaiphanquyen`
--

CREATE TABLE `loaiphanquyen` (
  `IDPhanQuyen` int(11) NOT NULL,
  `TenPhanQuyen` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaiphanquyen`
--

INSERT INTO `loaiphanquyen` (`IDPhanQuyen`, `TenPhanQuyen`) VALUES
(1, 'Player'),
(2, 'Center'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `loaisan`
--

CREATE TABLE `loaisan` (
  `IDLoaiSan` int(11) NOT NULL,
  `TenLoaiSan` varchar(20) NOT NULL,
  `GiaTien` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loaisan`
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
-- Table structure for table `sanbong`
--

CREATE TABLE `sanbong` (
  `IDSan` int(11) NOT NULL,
  `IDTaiKhoan` int(11) NOT NULL,
  `IDLoaiSan` int(11) NOT NULL,
  `TenSan` varchar(30) NOT NULL,
  `TrangThai` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanbong`
--

INSERT INTO `sanbong` (`IDSan`, `IDTaiKhoan`, `IDLoaiSan`, `TenSan`, `TrangThai`) VALUES
(1, 1, 3, 'Sân 1', '0'),
(2, 1, 5, 'Sân 2', '0'),
(3, 1, 4, 'Sân 3', '0'),
(4, 7, 6, 'Sân 1', '0'),
(5, 7, 8, 'Sân 2', '0');

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
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
  `Anh` varchar(200) NOT NULL,
  `MatKhau` varchar(30) NOT NULL,
  `XacThuc` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`IDTaiKhoan`, `IDPhanQuyen`, `Ten`, `Email`, `SoDienThoai`, `DiaChiCoSo`, `NganHang`, `STK`, `Anh`, `MatKhau`, `XacThuc`) VALUES
(1, 2, 'Huy Hoàng', 'huyhoangct@gmail.com', '0913126754', '68 đường Lê Lợi, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh 700000', 'BIDV', '53458023523', 'coso1.jpg', '123123', '2023-11-16'),
(2, 1, 'Đỗ Quốc Trí Tâm', 'TriTamtc30@gmail.com', '01256414127', NULL, NULL, NULL, '', '123123', '2023-11-15'),
(3, 3, 'Lê Hữu Minh', 'lehuuminhtc30@gmail.com', '0855280747', NULL, NULL, NULL, '', '123123', '0000-00-00'),
(7, 2, 'Đông Hùng', 'donghungct@gmail.com', '0284635732', '68 đường Lê Lợi, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh 700000', 'MBBank', '436326322', 'coso2.jpg', '123123', '2023-11-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anh`
--
ALTER TABLE `anh`
  ADD PRIMARY KEY (`IDAnh`),
  ADD KEY `Anh_SanBong` (`IDSan`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`IDHoaDon`),
  ADD KEY `HoaDon_TaiKhoan` (`IDTaiKhoan`),
  ADD KEY `HoaDon_San` (`IDSan`),
  ADD KEY `HoaDon_KhungGio` (`IDKhungGio`),
  ADD KEY `HoaDon_DoiThu` (`IDDoiThu`);

--
-- Indexes for table `khunggio`
--
ALTER TABLE `khunggio`
  ADD PRIMARY KEY (`IDKhungGio`);

--
-- Indexes for table `loaiphanquyen`
--
ALTER TABLE `loaiphanquyen`
  ADD PRIMARY KEY (`IDPhanQuyen`);

--
-- Indexes for table `loaisan`
--
ALTER TABLE `loaisan`
  ADD PRIMARY KEY (`IDLoaiSan`);

--
-- Indexes for table `sanbong`
--
ALTER TABLE `sanbong`
  ADD PRIMARY KEY (`IDSan`),
  ADD KEY `SanBong_LoaiSan` (`IDLoaiSan`),
  ADD KEY `SanBong_TaiKhoan` (`IDTaiKhoan`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`IDTaiKhoan`),
  ADD KEY `TaiKhoan_PhanQuyen` (`IDPhanQuyen`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anh`
--
ALTER TABLE `anh`
  MODIFY `IDAnh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `IDHoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `khunggio`
--
ALTER TABLE `khunggio`
  MODIFY `IDKhungGio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `loaiphanquyen`
--
ALTER TABLE `loaiphanquyen`
  MODIFY `IDPhanQuyen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `loaisan`
--
ALTER TABLE `loaisan`
  MODIFY `IDLoaiSan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sanbong`
--
ALTER TABLE `sanbong`
  MODIFY `IDSan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `IDTaiKhoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `anh`
--
ALTER TABLE `anh`
  ADD CONSTRAINT `Anh_SanBong` FOREIGN KEY (`IDSan`) REFERENCES `sanbong` (`IDSan`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `HoaDon_DoiThu` FOREIGN KEY (`IDDoiThu`) REFERENCES `taikhoan` (`IDTaiKhoan`),
  ADD CONSTRAINT `HoaDon_KhungGio` FOREIGN KEY (`IDKhungGio`) REFERENCES `khunggio` (`IDKhungGio`),
  ADD CONSTRAINT `HoaDon_San` FOREIGN KEY (`IDSan`) REFERENCES `sanbong` (`IDSan`),
  ADD CONSTRAINT `HoaDon_TaiKhoan` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`IDTaiKhoan`);

--
-- Constraints for table `sanbong`
--
ALTER TABLE `sanbong`
  ADD CONSTRAINT `SanBong_LoaiSan` FOREIGN KEY (`IDLoaiSan`) REFERENCES `loaisan` (`IDLoaiSan`),
  ADD CONSTRAINT `SanBong_TaiKhoan` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`IDTaiKhoan`);

--
-- Constraints for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `TaiKhoan_PhanQuyen` FOREIGN KEY (`IDPhanQuyen`) REFERENCES `loaiphanquyen` (`IDPhanQuyen`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
