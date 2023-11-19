-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2023 at 05:22 AM
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

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `IDHoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `HoaDon_DoiThu` FOREIGN KEY (`IDDoiThu`) REFERENCES `taikhoan` (`IDTaiKhoan`),
  ADD CONSTRAINT `HoaDon_KhungGio` FOREIGN KEY (`IDKhungGio`) REFERENCES `khunggio` (`IDKhungGio`),
  ADD CONSTRAINT `HoaDon_San` FOREIGN KEY (`IDSan`) REFERENCES `sanbong` (`IDSan`),
  ADD CONSTRAINT `HoaDon_TaiKhoan` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`IDTaiKhoan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
