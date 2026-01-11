-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 09:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tutor`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `course_img` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `course_img`, `createdAt`, `updatedAt`) VALUES
(1, 'Algoritma dan Pemrograman', 'Kuliah Algoritma dan Pemrograman dilakukan secara Hybrid. Mahasiswa ada yang luring dan ada yang daring (terutama jika sedang kurang sehat atau memberi kabar sebelumnya). Namun jika semua bisa ke kampus, berarti akan dilakukan secara luring, kecuali ada pemberitahuan sebelumnya bahwa perkuliahan akan dilakukan secara daring.', '/kursus/alprog.png', '2025-12-05 06:16:38', '2025-12-05 06:16:38'),
(2, 'Logika Informatika', 'Materi kuliah ini merupakan dasar logika dalam pemrograman komputer/teknik Informatika.', '/kursus/logika.jpg', '2025-12-05 07:19:30', '2025-12-05 07:19:30'),
(3, 'Pengantar Teknologi Komputer dan Informatika', 'Fondasi untuk memahami bagaimana sistem komputer bekerja dan peran teknologi dalam dunia digital, meliputi topik seperti pemrograman dasar, sistem operasi, arsitektur komputer, hingga internet.', '/kursus/komputer.jpg', '2025-12-05 07:54:30', '2025-12-05 07:54:30');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `material_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `section` int(11) NOT NULL,
  `materials_title` varchar(255) NOT NULL,
  `materials_desc` text DEFAULT NULL,
  `materials_type` text NOT NULL,
  `materials_video` varchar(255) DEFAULT NULL,
  `materials_doc` text DEFAULT NULL,
  `materials_link` text DEFAULT NULL,
  `materials_duration` int(11) DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '[]' CHECK (json_valid(`status`)),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`material_id`, `course_id`, `section`, `materials_title`, `materials_desc`, `materials_type`, `materials_video`, `materials_doc`, `materials_link`, `materials_duration`, `deadline`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Pendahuluan', 'Pendahuluan', 'Dokumen', NULL, '/data/1/01_-_Pendahuluan.pdf', NULL, 15, NULL, '[48]', '2025-12-05 06:16:38', '2025-12-05 06:31:04'),
(2, 1, 1, 'Link Perkuliahan', 'Link Zoom untuk Pertemuan Perkuliahan', 'Link', NULL, NULL, 'https://zoom.us/j/2876261440?pwd=TGVLM1Q0bFFBNEZlTCtDMURnT0ttQT09', 1, NULL, '[]', '2025-12-05 06:31:36', '2025-12-05 06:31:36'),
(3, 1, 2, 'Materi Algoritma dan Pemrograman', 'Materi Pengantar tentang Algoritma dan Pemrograman pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/02_-_Algoritma_Pemrograman.pdf', NULL, 45, NULL, '[]', '2025-12-05 06:32:51', '2025-12-05 06:32:51'),
(4, 1, 3, 'Materi Sistem Bilangan', 'Materi Pengantar tentang Sistem Bilangan pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/03_-_Sistem_Bilangan.pdf', NULL, 60, NULL, '[]', '2025-12-05 06:34:30', '2025-12-05 06:34:30'),
(5, 1, 3, 'Video Sistem Bilangan', 'Menonton Video Pembelajaran Sistem Bilangan', 'Video', 'https://youtu.be/tACgNm9bYH8?si=eWI4nscCeX7b5TbZ', NULL, NULL, 9, NULL, '[]', '2025-12-05 06:36:18', '2025-12-05 06:36:18'),
(6, 1, 4, 'Materi Pengenalan C++', 'Materi Pengantar tentang Pengenalan C++ pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/04_-_Pengenalan_C__.pdf', NULL, 90, NULL, '[]', '2025-12-05 06:40:22', '2025-12-05 06:40:22'),
(7, 1, 5, 'Materi Conditional Statement', 'Materi Pengantar tentang Conditional Statement pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/05_-_Conditional_Statement.pdf', NULL, 90, NULL, '[]', '2025-12-05 06:41:21', '2025-12-05 06:41:21'),
(8, 1, 6, 'Materi Looping Statement', 'Materi Pengantar tentang Looping Statement pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/06_-_Looping_Statement.pdf', NULL, 90, NULL, '[]', '2025-12-05 06:42:18', '2025-12-05 06:42:18'),
(9, 1, 7, 'Function', 'Materi Pengantar tentang Function pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/09_-_Function.pdf', NULL, 60, NULL, '[]', '2025-12-05 06:43:44', '2025-12-05 06:43:44'),
(10, 1, 8, 'Materi Array 1 Dimensi', 'Materi Pengantar tentang Array 1 Dimensi pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/10_-_Array.pdf', NULL, 120, NULL, '[]', '2025-12-05 06:44:59', '2025-12-05 06:44:59'),
(11, 1, 9, 'Materi Array 2 Dimensi (Array Lanjutan)', 'Materi Pengantar tentang Array 2 Dimensi pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/11_-_Array__Lanjutan_.pdf', NULL, 120, NULL, '[]', '2025-12-05 06:49:08', '2025-12-05 06:49:08'),
(12, 1, 10, 'Materi Array of Record', 'Materi Pengantar tentang Array of Record pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/12_-_Array_of_Record.pdf', NULL, 120, NULL, '[]', '2025-12-05 06:50:34', '2025-12-05 06:50:34'),
(13, 1, 11, 'Materi Pointer', 'Materi Pengantar tentang Pointer pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/13_-_Pointer.pdf', NULL, 120, NULL, '[]', '2025-12-05 06:53:09', '2025-12-05 06:53:09'),
(14, 1, 11, 'Video Pointer', 'Menonton Video Pembelajaran Pointer', 'Video', 'https://youtu.be/TIG0z7Xn_bs?si=JulKhroZZbFGMrEb', NULL, NULL, 23, NULL, '[]', '2025-12-05 06:53:54', '2025-12-05 06:53:54'),
(15, 1, 12, 'Materi Operasi File', 'Materi Pengantar tentang Operasi File pada Mata Kuliah Algoritma dan Pemrograman', 'Dokumen', NULL, '/data/1/14_-_Operasi_File.pdf', NULL, 90, NULL, '[]', '2025-12-05 06:54:47', '2025-12-05 06:54:47'),
(16, 1, 12, 'Video Operasi File', 'Menonton Video Pembelajaran Operasi File', 'Video', 'https://youtu.be/RTgNdInIRZg?si=LRCS24BvXy_KY7Od', NULL, NULL, 12, NULL, '[]', '2025-12-05 06:55:30', '2025-12-05 06:55:30'),
(17, 1, 5, 'Video Conditional Statement', 'Menonton Video Pembelajaran Conditional Statement', 'Video', 'https://youtu.be/ZJ0eo9m3kKM?si=8edORA9Wp_KAJ8bv', NULL, NULL, 11, NULL, '[]', '2025-12-05 06:56:29', '2025-12-05 06:56:29'),
(18, 1, 6, 'Video Looping Statement', 'Menonton Video Pembelajaran Looping Statement', 'Video', 'https://youtu.be/uXsxPCrAF0g?si=tSvXJbaE9XXG3jjY', NULL, NULL, 11, NULL, '[]', '2025-12-05 06:57:04', '2025-12-05 06:57:04'),
(19, 1, 7, 'Video Function', 'Menonton Video Pembelajaran Function', 'Video', 'https://youtu.be/oxjlDc-pJLg?si=icTQD8MMtIMZmWkR', NULL, NULL, 16, NULL, '[]', '2025-12-05 06:57:37', '2025-12-05 06:57:37'),
(20, 1, 8, 'Video Array 1 Dimensi', 'Menonton Video Pembelajaran Array 1 Dimensi', 'Video', 'https://youtu.be/jXjQD8NpliA?si=VXjL25geB6po0uSU', NULL, NULL, 14, NULL, '[54]', '2025-12-05 07:02:26', '2025-12-05 07:03:37'),
(21, 1, 9, 'Video Array (Lanjutan)', 'Menonton Video Pembelajaran Array 2 Dimensi', 'Video', 'https://youtu.be/w-EZteQU_d4?si=AuW-BXO0EF_96dLW', NULL, NULL, 18, NULL, '[]', '2025-12-05 07:03:19', '2025-12-05 07:03:19'),
(22, 1, 10, 'Video Array of Record', 'Menonton Video Pembelajaran Array of Record', 'Video', 'https://youtu.be/9WP0AluO988?si=q65sOmTMJ7S7pKNK', NULL, NULL, 10, NULL, '[]', '2025-12-05 07:05:03', '2025-12-05 07:05:03'),
(24, 2, 3, 'Materi Kuliah 1', 'Pengantar materi kuliah dan aturan-aturan dalam perkuliahan.', 'Dokumen', NULL, '/data/2/Log_PROPOSISI_Kuliah_0_Pend_217.pdf', NULL, 30, NULL, '[]', '2025-12-05 07:27:03', '2025-12-05 07:34:21'),
(25, 2, 3, 'Video-P1', 'Penjelasan perkuliahan pendahuluan dan pengantar Logika Informatika.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1_VJuBkxuRkKy3mDz1gCuQDaCHdGQ9SAv/view', 20, NULL, '[]', '2025-12-05 07:27:40', '2025-12-05 07:34:21'),
(26, 2, 4, 'Logika Proposisi 1', 'Menjelaskan Pengertian, Nilai Kebenaran, dan Operator Logika dalam logika proposisi.', 'Dokumen', NULL, '/data/2/Log_PROPOSISI_Kuliah_1_Share_217.pdf', NULL, 45, NULL, '[]', '2025-12-05 07:28:39', '2025-12-05 07:34:21'),
(27, 2, 4, 'Logika Proposisi 2 (lanjutan)', 'Menjelaskan Operator Logika dan Membuat ekspresi logika dengan disertai dengan contohnya.', 'Dokumen', NULL, '/data/2/Log_PROPOSISI_Kuliah_2_Share217.pdf', NULL, 15, NULL, '[]', '2025-12-05 07:29:05', '2025-12-05 07:34:21'),
(28, 2, 4, 'Video-P2', 'Penjelasan mengenai kalimat proposisi dan nilai kebenaran dari kalimat proposisi tsb.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1oHQneCw3pA7Pz0CparYzfVU0QEWCDwr1/view', 20, NULL, '[]', '2025-12-05 07:29:51', '2025-12-05 07:34:21'),
(29, 2, 5, 'Materi Proposisi Implikasi', 'Materi Pengantar tentang Proposisi Implikasi pada Mata Kuliah Logika Informatika', 'Dokumen', NULL, '/data/2/Log_PROPOSISI_Kuliah_3_Share217-rev.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:31:55', '2025-12-05 07:34:21'),
(30, 2, 1, 'Buku Logika Informatika', 'Buku yang digunakan untuk mendukung pembelajaran Mata Kuliah Logika Informatika', 'Dokumen', NULL, '/data/2/Digital_Design__5th_Edition_by_M_Morris_Mano_and_Michael_Ciletti.pdf', NULL, 200, NULL, '[]', '2025-12-05 07:34:15', '2025-12-05 07:34:15'),
(31, 2, 2, 'Naskah RPS', 'Susunan Naskah RPS', 'Dokumen', NULL, '/data/2/RPS-OBE_Log_Informatika_Rev2023.pdf', NULL, 10, NULL, '[]', '2025-12-05 07:34:43', '2025-12-05 07:34:43'),
(32, 2, 6, 'Materi Bi-Implikasi', 'Menjelaskan Bi-Implikasi beserta ekivalensinya, dan Validitas untuk suatu poligraf berikut pembuktiannya.', 'Dokumen', NULL, '/data/2/Log_PROPOSISI_Kuliah_4_Share217.pdf', NULL, 30, NULL, '[]', '2025-12-05 07:36:09', '2025-12-05 07:36:09'),
(33, 2, 6, 'Validitas (Contoh Soal)', 'Contoh pembuktian validitas pernyataan.', 'Dokumen', NULL, '/data/2/Kuliah-5.pdf', NULL, 25, NULL, '[]', '2025-12-05 07:36:54', '2025-12-05 07:36:54'),
(34, 2, 5, 'Video-P3', 'Penjelasan tentang operator dan properti dalam logika proposisi.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1fQuK_15_oDlM6MsU4JDD_2xk8WyJGeA5/view', 40, NULL, '[]', '2025-12-05 07:37:22', '2025-12-05 07:37:22'),
(35, 2, 6, 'Video-P4', 'Logika proposisi bersyarat.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/11Wh03nl_ywZtikQ5N55VGwmEjqWerp0e/view', 29, NULL, '[]', '2025-12-05 07:37:55', '2025-12-05 07:37:55'),
(36, 2, 7, 'Video-P5', 'Penjelasan tentang pernyataan bersyarat bi-implikasi.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1I4UkU1BAGlcJ8_QCuj9dZpmhj2sOE9I_/view', 26, NULL, '[]', '2025-12-05 07:39:02', '2025-12-05 07:39:02'),
(37, 2, 8, 'Video-P6', 'Penjelasan tentang pembuktian validitas pernyataan proposisi.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1-wC4yqXcJv6WmNpTm6M2hUJPgYe5RYpy/view', 37, NULL, '[]', '2025-12-05 07:40:11', '2025-12-05 07:40:11'),
(38, 2, 9, 'Materi Logika Predikat', 'Materi Kuliah yang menjelaskan tentang pengertian, penerapan, dan format dalam logika predikat.', 'Dokumen', NULL, '/data/2/KUL_Logika_Predikat_1.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:41:43', '2025-12-05 07:41:43'),
(39, 2, 9, 'Video-P7', 'Penjelasan pengantar tentang logika predikat.', 'Link', NULL, NULL, 'https://drive.google.com/file/d/1VrxweQulZMPWiWZ1qHK_dxACHZZEjNcC/view', 25, NULL, '[54]', '2025-12-05 07:42:18', '2025-12-05 07:48:56'),
(40, 2, 10, 'Materi Log. Predikat (Lanjutan)', 'Materi kuliah logika predikat lanjut mempelajari tentang kuantor bersusun, negasi, dan sifat-sifat yang di dalamnya.', 'Dokumen', NULL, '/data/2/Kuliah_LOG_KOMB_02.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:43:57', '2025-12-05 07:43:57'),
(41, 2, 11, 'Materi Log Kombinasional-1', 'Mempelajari sistem bilangan, dan konversi antara sistem bilangan.', 'Dokumen', NULL, '/data/2/Kuliah_LOG_KOMB_01.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:45:07', '2025-12-05 07:45:07'),
(42, 2, 12, 'Materi Log Komb-2', 'Materi Fixed point, konversi antara sistem bilangan, dan operasi komplemen bilangan.', 'Dokumen', NULL, '/data/2/Kuliah_LOG_KOMB_02.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:45:51', '2025-12-05 07:45:51'),
(43, 2, 13, 'Materi Kuliah Log-Inf 3', 'Mempelajari Logika Biner, dan Gerbang Logika, serta Aljabar Boole (Boolean Algebra).', 'Dokumen', NULL, '/data/2/Kuliah_LOG_KOMB_02_1-digital.pdf', NULL, 60, NULL, '[]', '2025-12-05 07:46:45', '2025-12-05 07:46:45'),
(44, 2, 14, 'Materi Kuliah F. Boole', 'Mempelajari Gerbang Logika (logic gates), dan teknik penyederhanaan Fungsi Boole cara K-map.', 'Dokumen', NULL, '/data/2/Kuliah_LOG_KOMB_02_2-digital.pdf', NULL, 60, NULL, '[54]', '2025-12-05 07:47:56', '2025-12-05 07:49:14'),
(45, 3, 1, 'History of Computer', 'History of Computer', 'Dokumen', '', '/data/3/1__history-of-computer-2022.pdf', '', 45, '0000-00-00 00:00:00', '[48]', '2025-12-05 07:54:30', '2025-12-05 07:57:41'),
(46, 3, 2, 'Pengenalan Hardware dan Software', 'Materi Pengantar tentang Pengenalan Hardware dan Software pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/2__pengenalan-hardware-software.pdf', NULL, 45, NULL, '[]', '2025-12-05 07:58:55', '2025-12-05 07:58:55'),
(47, 3, 2, 'Hardware Komputer', 'Materi Pengantar tentang Hardware Komputer pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/kuliah-2-_HW.pdf', NULL, 45, NULL, '[]', '2025-12-05 07:59:19', '2025-12-05 07:59:19'),
(48, 3, 3, 'File Presentasi (PDF)', 'Materi Pengantar tentang Productivity and Application pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/Ringkasan_Bab_3_PLANET_DIGITAL.pdf', NULL, 30, NULL, '[]', '2025-12-05 08:00:55', '2025-12-05 08:00:55'),
(49, 3, 3, 'VIDEO : BAB-3 PRODUCTIVITY', 'Pertemuan hari ini melihat video kemudian membaca bukunya', 'Video', 'https://youtu.be/xDnQYATAcEM?si=6OonlJvOJyZyIG3q', NULL, NULL, 47, NULL, '[]', '2025-12-05 08:01:56', '2025-12-05 08:01:56'),
(50, 3, 4, 'Grafis dan Multimedia', 'Materi Pengantar tentang Grafis dan Multimedia pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/4__pengenalan-grafis-mediadigital-multimedia_-_2022.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:03:10', '2025-12-05 08:03:10'),
(51, 3, 5, 'RPL', 'Materi Pengantar tentang RPL pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/5_Pengenalan_Rekayasa_Perangkat_Lunak-2022.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:04:11', '2025-12-05 08:04:11'),
(52, 3, 6, 'Arsitektur Komputer', 'Materi Pengantar tentang Arsitektur Komputer pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/6_Sistem___Arsitektur_Komputer.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:05:04', '2025-12-05 08:05:04'),
(53, 3, 7, 'Sistem Bilangan dan Komputasi', 'Materi Pengantar tentang Sistem Bilangan dan Komputasi pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/7_Sistem_Bilangan_dan_Komputasi.pdf', NULL, 90, NULL, '[]', '2025-12-05 08:05:59', '2025-12-05 08:05:59'),
(54, 3, 8, 'Materi 9', 'Materi Pengantar tentang Jaringan dan Sistem Komunikasi Digital pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/8_Jaringan_dan_Sistem_Komunikasi_Digital.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:08:39', '2025-12-05 08:08:39'),
(55, 3, 9, 'Materi 10', 'Materi Pengantar tentang Algortima dan Pemrograman pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/9_Pengenalan_Algoritma_dan_Pemrograman.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:09:13', '2025-12-05 08:09:13'),
(56, 3, 10, 'Materi 11', 'Materi Pengantar tentang Sistem Informasi dalam Bisnis pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/11_Sistem_Informasi_dalam_Bisnis.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:09:54', '2025-12-05 08:09:54'),
(57, 3, 11, 'Materi 12', 'Materi Pengantar tentang UML pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/10_Pengenalan_Unified_Modelling_Language.pdf', NULL, 90, NULL, '[]', '2025-12-05 08:10:37', '2025-12-05 08:10:37'),
(58, 3, 10, 'Sistem Informasi dalam Bisnis', 'Menonton Video Pembelajaran Sistem Informasi dalam Bisnis', 'Video', 'https://youtu.be/waj4ljVnKN4?si=MKXD1yqo0SMU_gmt', NULL, NULL, 54, NULL, '[]', '2025-12-05 08:11:39', '2025-12-05 08:11:39'),
(59, 3, 12, 'Materi 13', 'Materi Pengantar tentang Pengenalan E-Commerce, E-Business, dan Fintech pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/14_Pengenalan_E-Commerce__E-Business__dan_Fintech.pdf', NULL, 30, NULL, '[]', '2025-12-05 08:13:21', '2025-12-05 08:13:21'),
(60, 3, 12, 'Pengenalan E-commerce, E-Business, dan Fintech', 'Menonton Video Pembelajaran Pengenalan E-commerce, E-Business, dan Fintech', 'Video', 'https://youtu.be/DanWw3o6F_0?si=i7WQgt_KNXBDyYZo', NULL, NULL, 7, NULL, '[]', '2025-12-05 08:13:59', '2025-12-05 08:13:59'),
(61, 3, 13, 'Materi 14', 'Materi Pengantar tentang Database dan Big Data pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/12_Pengenalan_Database_dan_Big_Data.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:15:07', '2025-12-05 08:15:07'),
(62, 3, 14, 'Materi 15', 'Materi Pengantar tentang Artificial Intelligence pada Mata Kuliah Pengantar Teknologi Komputer dan Informatika', 'Dokumen', NULL, '/data/3/13_Pengenalan_Artificial_Intelligence.pdf', NULL, 60, NULL, '[]', '2025-12-05 08:15:53', '2025-12-05 08:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `section` int(11) NOT NULL,
  `section_name` text NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `course_id`, `section`, `section_name`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Pendahuluan', '2025-12-05', '2025-12-05'),
(2, 1, 2, 'Algoritma dan Pemrograman', '2025-12-05', '2025-12-05'),
(3, 1, 3, 'Sistem Bilangan', '2025-12-05', '2025-12-05'),
(4, 1, 4, 'Pengenalan C++', '2025-12-05', '2025-12-05'),
(5, 1, 5, 'Conditional Statement', '2025-12-05', '2025-12-05'),
(6, 1, 6, 'Looping Statement', '2025-12-05', '2025-12-05'),
(7, 1, 7, 'Function', '2025-12-05', '2025-12-05'),
(8, 1, 8, 'Array 1 Dimensi', '2025-12-05', '2025-12-05'),
(9, 1, 9, 'Array 2 Dimensi', '2025-12-05', '2025-12-05'),
(10, 1, 10, 'Array of Record', '2025-12-05', '2025-12-05'),
(11, 1, 11, 'Pointer', '2025-12-05', '2025-12-05'),
(12, 1, 12, 'Operasi File', '2025-12-05', '2025-12-05'),
(13, 2, 1, 'General', '2025-12-05', '2025-12-05'),
(14, 2, 3, 'Pertemuan 1: Pengenalan Kuliah dan Aturan Perkuliahan', '2025-12-05', '2025-12-05'),
(15, 2, 4, 'Pertemuan 2: Logika Proposisi', '2025-12-05', '2025-12-05'),
(16, 2, 5, 'Pertemuan 3: Logika Proposisi (Lanjutan)', '2025-12-05', '2025-12-05'),
(17, 2, 2, 'RPS', '2025-12-05', '2025-12-05'),
(18, 2, 6, 'Pertemuan 4: Logika Proposisi bi-Implikasi', '2025-12-05', '2025-12-05'),
(19, 2, 7, 'Pertemuan 5', '2025-12-05', '2025-12-05'),
(20, 2, 8, 'Pertemuan 6: Validitas dan Poligraf', '2025-12-05', '2025-12-05'),
(21, 2, 9, 'Pertemuan 7: Logika Predikat', '2025-12-05', '2025-12-05'),
(22, 2, 10, 'Pertemuan 9: Logika Predikat (Lanjutan)', '2025-12-05', '2025-12-05'),
(23, 2, 11, 'Pertemuan 10: Logika Kombinasional-1', '2025-12-05', '2025-12-05'),
(24, 2, 12, 'Pertemuan 11: Logika Kombinasional-2', '2025-12-05', '2025-12-05'),
(25, 2, 13, 'Pertemuan 12: Logika Kombinasional-3', '2025-12-05', '2025-12-05'),
(26, 2, 14, 'Pertemuan 13: Aljabar Boole', '2025-12-05', '2025-12-05'),
(27, 3, 1, 'Pertemuan 1', '2025-12-05', '2025-12-05'),
(28, 3, 2, 'Pertemuan 2: Pengenalan Hardware dan Software', '2025-12-05', '2025-12-05'),
(29, 3, 3, 'Pertemuan 3: Productivity and Application', '2025-12-05', '2025-12-05'),
(30, 3, 4, 'Pertemuan 4: Grafis dan Multimedia', '2025-12-05', '2025-12-05'),
(31, 3, 5, 'Pertemuan 5: Rekayasa Perangkat Lunak', '2025-12-05', '2025-12-05'),
(32, 3, 6, 'Pertemuan 6: Sistem Arsitektur Komputer', '2025-12-05', '2025-12-05'),
(33, 3, 7, 'Pertemuan 7: Sistem Bilangan dan Komputasi', '2025-12-05', '2025-12-05'),
(34, 3, 8, 'Materi 9 - Jaringan dan Sistem Komunikasi Digital', '2025-12-05', '2025-12-05'),
(35, 3, 9, 'Materi 10 - Algoritma dan Pemrograman', '2025-12-05', '2025-12-05'),
(36, 3, 10, 'Materi 11 - Sistem Informasi dalam Bisnis', '2025-12-05', '2025-12-05'),
(37, 3, 11, 'Materi 12 - Pengenalan Unified Modeling Language', '2025-12-05', '2025-12-05'),
(38, 3, 12, 'Materi 13 - Pengenalan E-Commerce, E-Business, dan Fintech', '2025-12-05', '2025-12-05'),
(39, 3, 13, 'Materi 14 - Pengenalan Database dan Big Data', '2025-12-05', '2025-12-05'),
(40, 3, 14, 'Materi 15 - Pengenalan Artificial Intelligence', '2025-12-05', '2025-12-05');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250407160842-create-user.js'),
('20250407160847-create-course.js'),
('20250407160852-create-enrollment.js'),
('20250409184901-add-isVerified-to-users.js'),
('20250420103458-add-time-slot-to-consultations.js'),
('20250421154835-create-materials.js'),
('20250421163002-create-question.js'),
('20250421163016-create-submission.js'),
('20250421165438-add-foreign-key-userId-to-submissions.js'),
('20250428181756-create-quiz.js'),
('20250428190131-add-quizId-to-questions.js'),
('20250428190651-update-submission-with-quizId.js'),
('add-user-fk-to-consultations.js');

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `course_id` int(11) NOT NULL,
  `tutor_status` tinyint(1) NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`course_id`, `tutor_status`, `last_update`) VALUES
(1, 0, NULL),
(2, 0, NULL),
(3, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isVerified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `isVerified`) VALUES
(35, 'Alice Doe', 'alice@example.com', '$2b$10$1Rm2XA.8FJNTK2whyr3w3uuWFD5XyYOKIMteADx2bhbyNO2fuhyOK', 'teacher', '2025-04-28 19:20:45', '2025-05-21 07:13:19', 0),
(37, 'Jonny', 'louis.sung29@gmail.com', '$2b$10$0HdfzMTjB5tODV32RjURI.NfAn5myMM5CIIMhvY1RUGXbJ0yi7o7q', 'student', '2025-04-29 05:26:34', '2025-11-05 10:16:59', 1),
(40, 'Umar', 'louis22002@mail.unpad.ac.id', '$2b$10$IFNW5vOg.w79ZTv3fltDOeDurbNdPEmYi3TkgwOmZ2LuONMEKKKT2', 'student', '2025-05-05 17:19:08', '2025-05-05 17:19:40', 1),
(44, 'Umaru', 'umar22002@mail.unpad.ac.id', '$2b$10$PRb1rgdxJ0VtLREHsyN.2ut4ynlefRVV16IIquBpr7M.ZEjG0dgse', 'admin', '2025-05-05 17:30:21', '2025-05-18 17:35:26', 1),
(48, 'Dylan', 'dylan22001@mail.unpad.ac.id', '$2b$10$gaWOSAmp1t5XVTlaDTx4BuWfS4t6GjSZ7s/sXdwsKAjbg3RjaVY.O', 'teacher', '2025-05-19 08:34:39', '2025-05-19 10:22:01', 1),
(51, 'tes1', 'tes1@gmail.com', '$2b$10$yIqHIOdDtCM2VGHwEdgH0enjjUGhhBTlVs.sMhuHhZJBBL5UHSDaa', 'student', '2025-05-21 07:03:07', '2025-05-21 07:03:30', 1),
(52, 'tes2', 'tes2@gmail.com', '$2b$10$yIqHIOdDtCM2VGHwEdgH0enjjUGhhBTlVs.sMhuHhZJBBL5UHSDaa', 'student', '2025-05-21 07:03:07', '2025-05-21 07:03:30', 1),
(54, 'Dylan', 'dylanamadeus05@gmail.com', '$2b$10$DHQ/fHqLYrxoG1M41kdyPuEkqDH6E0T0L08/C3xKjNYXflV8TfKse', 'student', '2025-05-21 11:36:59', '2025-05-21 11:37:33', 1),
(58, 'dyy', 'lynnnurch@gmail.com', '$2b$10$qdWLv8EI3MdqiCt6WLvatuFrKdhd0.6b7w07G/It5SCCdC8/HzWQG', 'student', '2025-12-02 03:49:35', '2025-12-02 03:49:35', 0),
(60, 'pipp', 'pipptutorai@gmail.com', '$2b$10$IdugWdvv1565Ba0Vqg8LxOQarDmV60EyKaaFlWX1GS13pTYMzFW4m', 'student', '2025-12-02 04:37:38', '2025-12-02 04:37:57', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
