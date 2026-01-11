-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 06:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
(1, 'Algoritma Pemrograman', 'Algoritma Pemrograman membahas konsep dasar logika, algoritma, dan penerapannya dalam pemrograman komputer. Mahasiswa mempelajari cara menyusun langkah-langkah sistematis untuk memecahkan masalah secara efisien serta menerjemahkannya ke dalam bahasa pemrograman seperti C atau Python. Materi meliputi tipe data, variabel, struktur kontrol, fungsi, array, dan dasar struktur data. Melalui mata kuliah ini, mahasiswa diharapkan mampu memahami konsep algoritma, merancang solusi pemrograman yang efektif, serta mengimplementasikannya dalam bentuk program yang benar dan terstruktur.', '/kursus/alprog.png', '2025-05-05 19:59:19', '2025-11-14 05:24:47'),
(2, 'Logika Informatika', 'Logika Informatika membahas dasar-dasar penalaran logis yang menjadi fondasi dalam ilmu komputer dan pemrograman. Mahasiswa mempelajari konsep proposisi, logika predikat, tabel kebenaran, inferensi, serta penerapan logika dalam pemodelan dan pemecahan masalah komputasional. Selain teori, mata kuliah ini juga menekankan pada kemampuan berpikir analitis dan sistematis dalam merancang algoritma maupun menentukan kebenaran suatu pernyataan logis. Melalui pembelajaran ini, mahasiswa diharapkan mampu memahami prinsip logika formal dan menggunakannya sebagai dasar dalam pengembangan sistem dan pemrograman yang rasional serta terstruktur.', '/kursus/logika.jpg', '2025-05-05 19:59:19', '2025-05-05 19:59:19'),
(3, 'Pengantar Teknologi Komputer dan Informatika', 'Pengantar Teknologi Komputer dan Informatika memberikan pemahaman dasar mengenai konsep, komponen, dan perkembangan teknologi komputer serta peranannya dalam bidang informatika. Mahasiswa mempelajari arsitektur perangkat keras dan perangkat lunak, sistem operasi, jaringan komputer, serta dasar-dasar pemrograman dan data. Selain itu, dibahas pula perkembangan teknologi informasi terkini seperti komputasi awan, kecerdasan buatan, dan keamanan siber. Melalui mata kuliah ini, mahasiswa diharapkan mampu memahami cara kerja sistem komputer secara menyeluruh serta peran teknologi informasi dalam mendukung pemecahan masalah dan pengambilan keputusan di berbagai bidang.', '/kursus/komputer.jpg', '2025-05-05 19:59:19', '2025-05-05 19:59:19'),
(31, 'Alprog Buat Tes', 'Lorem Ipsum', NULL, '2025-11-16 05:34:57', '2025-11-16 05:34:57');

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
(1, 1, 1, 'Pendahuluan', 'Pendahuluan Algoritma Pemrograman', 'Link', '', NULL, 'https://youtu.be/No7dBG7jaZ0?si=bPEdhAAtX56V9UQf', 10, '0000-00-00 00:00:00', '[54,48]', '2025-11-16 04:10:39', '2025-11-28 14:51:10'),
(2, 2, 1, 'Buku Logika Informatika', 'Buku yang digunakan untuk Pembelajaran selama Satu Tahun', 'Dokumen', NULL, '/data/2/Digital_Design__5th_Edition_by_M_Morris_Mano_and_Michael_Ciletti.pdf', NULL, 200, NULL, '[]', '2025-11-16 04:14:35', '2025-11-16 04:14:35'),
(3, 3, 1, 'History of Computer', 'Sejarah Komputer', 'Dokumen', NULL, '/data/3/1__history-of-computer-2022.pdf', NULL, 5, NULL, '[]', '2025-11-16 04:21:30', '2025-11-16 04:21:30'),
(4, 3, 2, 'Hardware & Software', 'Pengenalan terkait Perangkat Keras dan Perangkat Lunak', 'Dokumen', NULL, '/data/3/2__pengenalan-hardware-software.pdf', NULL, 12, NULL, '[]', '2025-11-16 04:22:13', '2025-11-16 04:22:13'),
(5, 3, 3, 'Productivity and Activation', 'Pertemuan hari ini melihat membaca buku dan menjawab pertanyaannya', 'Dokumen', NULL, '/data/3/Ringkasan_Bab_3_PLANET_DIGITAL.pdf', NULL, 90, NULL, '[]', '2025-11-16 04:24:05', '2025-11-16 04:24:05'),
(6, 3, 4, 'Grafis dan Multimedia', 'Pengenalan terkait Grafis dan Multimedia', 'Dokumen', NULL, '/data/3/4__pengenalan-grafis-mediadigital-multimedia_-_2022.pdf', NULL, 15, NULL, '[]', '2025-11-16 04:25:18', '2025-11-16 04:25:18'),
(7, 1, 1, 'Algoritma Pemrograman', 'Materi Dasar Algroitma Pemrograman', 'Dokumen', NULL, '/data/1/02_-_Algoritma_Pemrograman.pdf', NULL, 12, NULL, '[]', '2025-11-16 04:26:50', '2025-11-16 04:26:50'),
(8, 1, 3, 'Sistem Bilangan', 'Materi Sistem Bilangan', 'Dokumen', NULL, '/data/1/03_-_Sistem_Bilangan.pdf', NULL, 5, NULL, '[]', '2025-11-16 04:29:36', '2025-11-16 04:29:36'),
(9, 1, 4, 'Pengenalan Cpp', 'Materi Pengenalan C++', 'Dokumen', NULL, '/data/1/04_-_Pengenalan_C__.pdf', NULL, 45, NULL, '[]', '2025-11-16 04:30:32', '2025-11-16 04:30:32'),
(10, 1, 5, 'Conditional Statement', 'Materi Conditional Statement', 'Dokumen', NULL, '/data/1/05_-_Conditional_Statement.pdf', NULL, 10, NULL, '[]', '2025-11-16 04:31:43', '2025-11-16 04:31:43'),
(11, 1, 6, 'Looping Statement', 'Materi Looping', 'Dokumen', NULL, '/data/1/06_-_Looping_Statement.pdf', NULL, 25, NULL, '[]', '2025-11-16 04:32:52', '2025-11-16 04:32:52'),
(12, 3, 5, 'Productivity', 'Menonton Video Pemberlajaran Productivity', 'Video', 'https://youtu.be/xDnQYATAcEM', NULL, NULL, 45, NULL, '[]', '2025-11-16 04:33:35', '2025-11-16 04:33:35'),
(13, 31, 1, 'asdasdasas', 'asasdasd', 'Dokumen', NULL, '/data/31/03_-_Sistem_Bilangan.pdf', NULL, 10, NULL, '[]', '2025-11-16 05:36:12', '2025-11-16 05:36:12'),
(14, 1, 2, 'asdadsasasd', 'aszsdasdasd', 'Dokumen', NULL, '/data/1/04_-_Pengenalan_C__.pdf', NULL, 0, NULL, '[]', '2025-11-16 05:37:30', '2025-11-16 05:37:30'),
(15, 1, 1, 'Jalan Kenangan', 'Apa ya?', 'Video', NULL, NULL, NULL, 25, NULL, '[]', '2025-11-28 15:36:25', '2025-11-28 15:36:25'),
(16, 1, 2, 'fsdfsdfds', 'fsdsfdsdf', 'Link', NULL, NULL, NULL, 3, NULL, '[]', '2025-11-28 16:07:25', '2025-11-28 16:07:25');

-- --------------------------------------------------------

--
-- Table structure for table `materials1`
--

CREATE TABLE `materials1` (
  `material_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `week` int(11) NOT NULL,
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
-- Dumping data for table `materials1`
--

INSERT INTO `materials1` (`material_id`, `course_id`, `week`, `materials_title`, `materials_desc`, `materials_type`, `materials_video`, `materials_doc`, `materials_link`, `materials_duration`, `deadline`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Respon Melawan/Melarikan Diri/Membeku: Keterampilan Kecemasan #1', 'Respons melawan/melarikan diri/membeku merupakan reaksi otomatis terhadap bahaya yang dirasakan, yang memicu naluri bertahan hidup tubuh. Respons ini dapat dipicu oleh stres, kecemasan, atau ketakutan, yang menyebabkan perubahan fisik seperti jantung berdebar kencang atau napas pendek. Memahami reaksi ini membantu individu mengenali saat mereka berada dalam kondisi cemas dan mempelajari cara mengelolanya, sehingga mereka dapat memperoleh kembali kendali dan mengurangi perasaan takut atau panik yang berlebihan.', 'Tugas', 'https://youtu.be/RPyzPH8sB2A?si=CTs6V_Q_e7yDZ0rR', NULL, '1', NULL, '2025-11-30 23:59:00', '[47,44]', '2025-05-05 20:55:40', '2025-11-03 08:51:13'),
(2, 1, 1, 'Stres, Kecemasan, dan Kekhawatiran: Keterampilan Mengatasi Kecemasan #2', 'Stres, kecemasan, dan kekhawatiran merupakan emosi yang saling terkait yang dapat mengganggu kehidupan sehari-hari jika menjadi berlebihan. Sementara stres sering kali muncul dari tekanan eksternal, kecemasan lebih bersifat internal dan terus-menerus, dan kekhawatiran merupakan pikiran berlebihan yang terus-menerus tentang kemungkinan hasil negatif. Mempelajari perbedaan antara perasaan-perasaan ini dan pemicunya dapat membantu individu mengatasinya dengan lebih baik melalui perhatian penuh, teknik relaksasi, dan strategi lain untuk pengaturan emosi.', 'Video', 'https://youtu.be/aOGP3mltnZE?si=8szNr8D10Aro8Bs2', NULL, NULL, 4, NULL, '[47,44,54]', '2025-05-05 21:03:26', '2025-11-03 09:20:40'),
(3, 1, 1, 'Seberapa Gugup Sistem Saraf Anda? Keterampilan Mengatasi Kecemasan #3Seberapa Gugup Sistem Saraf Anda? Keterampilan Mengatasi Kecemasan #3', 'Sistem saraf berperan penting dalam cara kita mengalami kecemasan. Saat kewalahan, sistem saraf dapat memicu respons tubuh untuk melawan atau lari, yang menyebabkan sensasi fisik yang meningkat seperti berkeringat, pusing, atau detak jantung cepat. Latihan ini membantu individu menilai reaksi sistem saraf mereka terhadap kecemasan dan memahami keseimbangan antara kegembiraan karena gugup dan ketakutan yang luar biasa, serta menawarkan strategi untuk menenangkan sistem tersebut.', 'Video', 'https://youtu.be/uKN5I-Mtgzs?si=CiUAYXhDjt5_HBSQ', NULL, NULL, 3, NULL, '[47]', '2025-05-05 21:03:26', '2025-05-21 08:28:55'),
(4, 1, 2, 'Cara Mematikan Respon Melawan/Melarikan Diri/Membeku: Keterampilan Kecemasan #4', 'Respons melawan/melarikan diri/membeku dimaksudkan untuk bertahan hidup, tetapi dapat merugikan jika sering diaktifkan karena kecemasan. Mempelajari teknik-teknik seperti pernapasan dalam, kesadaran penuh, dan latihan-latihan pentanahan dapat membantu \"mematikan\" respons ini dan mengembalikan tubuh ke keadaan yang lebih tenang. Keterampilan-keterampilan ini memungkinkan individu untuk mendapatkan kembali kendali atas emosi mereka dan mengurangi intensitas kecemasan ketika dipicu oleh stres.', 'Video', 'https://youtu.be/agdpFsKGdOE?si=NxxzdKLukGNDcm_K', NULL, NULL, 7, NULL, '[47]', '2025-05-05 21:03:26', '2025-05-21 08:38:22'),
(5, 1, 3, 'Latihan Grounding: Keterampilan Mengatasi Kecemasan #5', 'Latihan grounding adalah teknik yang membantu individu fokus pada saat ini untuk mengurangi perasaan cemas dan disosiasi. Dengan menggunakan indra—seperti fokus pada apa yang dapat Anda lihat, dengar, atau sentuh—latihan ini membantu Anda untuk tetap fokus pada kenyataan, mengalihkan perhatian dari emosi yang meluap-luap, dan menghadirkan rasa tenang dan kendali di saat-saat cemas.', 'Dokumen', 'https://youtu.be/1ao4xdDK9iE?si=hOhDBzR6IJ82T8RD', '/data/algoritma.pdf', NULL, 3, NULL, '[47,54]', '2025-05-05 21:03:26', '2025-11-14 07:20:04'),
(6, 1, 3, 'Bahaya yang Dirasakan dan Menciptakan Keamanan: Keterampilan Kecemasan #6', 'Bahaya yang dirasakan adalah interpretasi otak terhadap ancaman, yang sering kali memperkuat rasa takut dan kecemasan. Menciptakan rasa aman melibatkan pengakuan bahwa ancaman tersebut tidak langsung terjadi dan belajar untuk mengubah pola pikir negatif. Dengan menggunakan teknik seperti menenangkan diri, restrukturisasi kognitif, dan visualisasi, individu dapat mengurangi bahaya yang dirasakan dan membangun ruang mental yang aman, yang membantu mengelola kecemasan mereka.', 'Dokumen', 'https://youtu.be/W0QAtywrv5c?si=IhoSeb2dH2Qvm8Vp', '/data/Convolutional Neural Network.pptx', NULL, 3, NULL, '[47,54]', '2025-05-05 21:03:26', '2025-11-15 09:50:32'),
(7, 1, 4, 'Latihan Menggambar untuk Mengatasi Kecemasan: Keterampilan Mengatasi Kecemasan #7', 'Latihan menggambar menawarkan jalan keluar yang kreatif untuk mengelola kecemasan. Dengan menyalurkan energi kecemasan ke dalam ekspresi visual, individu dapat mengekspresikan kekhawatiran mereka dan memperoleh rasa kendali atas emosi mereka. Teknik ini mendorong kesadaran dan dapat membantu individu memproses perasaan, memberikan kejelasan dan kelegaan emosional melalui tindakan menciptakan karya seni.', 'Link', 'https://youtu.be/YTHgm8wL_IE?si=DqqWryD3saZg8yu_', NULL, 'https://medium.com/@naufal.adrian904/algoritma-pemrograman-fungsi-dan-prosedur-e395d9488062', 2, NULL, '[47,54]', '2025-05-05 21:03:26', '2025-11-14 07:20:37'),
(8, 1, 4, 'Banjir Emosional: Bagaimana Kecemasan Mempengaruhi Hubungan: Keterampilan Hubungan #8', 'Banjir emosi terjadi saat emosi yang kuat, yang sering dipicu oleh kecemasan, menguasai seseorang, yang menyebabkan kesulitan berkomunikasi atau bereaksi secara impulsif. Hal ini dapat membuat hubungan menjadi tegang, terutama saat salah satu pasangan tidak mampu mengatur respons emosionalnya. Mempelajari cara mengelola banjir emosi melalui kesadaran diri, strategi komunikasi, dan empati dapat membantu menjaga hubungan yang sehat bahkan dalam situasi yang penuh tekanan.', 'Ujian', 'https://youtu.be/7xwOZVRK_B8?si=0zB4yoxyllw7C8fh', NULL, NULL, 6, NULL, '[47]', '2025-05-05 21:03:26', '2025-05-21 10:06:25'),
(9, 2, 1, 'Depresi Anda Berbohong pada Anda: Pilihan Pengobatan Depresi: Keterampilan Depresi #1', 'Depresi sering kali mendistorsi kenyataan, membuat Anda merasa putus asa, tidak berharga, atau seolah-olah keadaan tidak akan pernah membaik. Menyadari bahwa depresi \"berbohong\" kepada Anda adalah langkah pertama dalam pemulihan. Pilihan pengobatan, seperti terapi, pengobatan, dan perubahan gaya hidup, dapat membantu menantang keyakinan negatif ini dan memulihkan rasa kendali. Memahami bahwa depresi adalah kondisi yang dapat diobati memberdayakan individu untuk mencari bantuan dan berusaha untuk sembuh.', '', 'https://youtu.be/TTHOjqIRQ34?si=feq0-v9GisJD3Gfn', NULL, NULL, 8, NULL, '[47]', '2025-05-05 21:03:26', '2025-05-26 07:57:02'),
(10, 2, 1, 'Cara Membantu Seseorang yang Mengalami Depresi: 32 Tips untuk Saat Mereka Tidak Ingin Berbicara: Keterampilan Menghadapi Depresi #2', 'Mendukung seseorang yang mengalami depresi bisa jadi sulit, terutama saat mereka tidak ingin berbicara. Panduan ini menawarkan 32 kiat praktis untuk menawarkan dukungan dengan cara non-verbal—baik melalui kehadiran fisik, gerakan kecil, atau menyediakan sumber daya. Memahami perlunya kesabaran dan dukungan tanpa menghakimi dapat membantu menciptakan ruang aman bagi individu untuk akhirnya membuka diri saat mereka siap.', '', 'https://youtu.be/HQm7xRjl6-I?si=bqQ-RT1vqnaGEkTV', NULL, NULL, 5, NULL, '[47]', '2025-05-05 21:03:26', '2025-05-26 07:57:09'),
(11, 2, 2, 'Apakah Ini Penyebab Anda Depresi? Berhentilah Bersedih pada Diri Sendiri', '\"Harusnya\" adalah distorsi kognitif umum dalam depresi, di mana Anda menaruh harapan yang tidak realistis atau kaku pada diri sendiri. Tekanan yang Anda buat sendiri ini, seperti \"Saya seharusnya bahagia\" atau \"Saya seharusnya menjadi lebih baik,\" berkontribusi pada perasaan tidak mampu dan bersalah. Belajar melepaskan pernyataan \"harusnya\" membantu mengurangi rasa bersalah dan meningkatkan rasa kasih sayang pada diri sendiri, yang memungkinkan respons emosional yang lebih sehat dan kemajuan dalam mengelola depresi.', '', 'https://youtu.be/PeF-mIrYIIU?si=aldHKbL8iE2sToZc', NULL, NULL, 10, NULL, '[]', '2025-05-05 21:03:26', '2025-05-05 21:03:26'),
(12, 2, 2, 'Cara Menghentikan Spiral MALU \"Apakah Saya Orang Jahat?\" - Malu vs. Rasa Bersalah', 'Rasa malu adalah emosi yang kuat yang dapat memperburuk depresi, yang sering kali mengarah pada pola pikir yang merusak seperti \"Apakah saya orang yang jahat?\" Tidak seperti rasa bersalah, yang berkaitan dengan tindakan, rasa malu menargetkan diri sendiri. Memahami perbedaan antara rasa malu dan rasa bersalah sangat penting untuk menghentikan lingkaran setan tersebut. Mempraktikkan memaafkan diri sendiri, berbelas kasih, dan mengubah keyakinan negatif membantu melepaskan diri dari cengkeraman rasa malu, mendorong penyembuhan dan pertumbuhan emosional.', '', 'https://youtu.be/7KepQX1tBvI?si=uma2mhUWRGbjSM4C', NULL, NULL, 9, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(13, 2, 3, 'Apakah Peradangan Menyebabkan Depresi?', 'Penelitian terkini menunjukkan bahwa peradangan mungkin berperan dalam perkembangan depresi. Peradangan kronis, yang disebabkan oleh faktor-faktor seperti pola makan yang buruk, stres, atau gangguan autoimun, dapat mengubah kimia otak dan meningkatkan perasaan sedih atau cemas. Memahami hubungan ini membuka jalan pengobatan baru, seperti terapi antiperadangan atau perubahan gaya hidup, untuk membantu mengelola depresi pada individu tertentu.', '', 'https://youtu.be/-NiCmHKmQWg?si=P35LeeUP5KamLRtI', NULL, NULL, 10, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(14, 2, 3, 'Peradangan sebagai penyebab depresi | Charles Raison', 'Dr. Charles Raison meneliti bagaimana peradangan dapat menyebabkan depresi dalam penelitian yang inovatif. Karyanya menunjukkan bahwa respons peradangan dalam tubuh dapat memengaruhi pengaturan suasana hati dan meningkatkan risiko timbulnya depresi. Dengan mengatasi peradangan melalui perubahan pola makan, pengobatan, atau intervensi lain, individu mungkin dapat mengurangi keparahan gejala depresi dan meningkatkan kesejahteraan mental.', '', 'https://youtu.be/tCnxLqeIZLc?si=iAo79kgUDRqi-_8e', NULL, NULL, 4, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(15, 2, 4, '5 Kebohongan yang Diceritakan Depresi kepada Anda - Motivasi Depresi, semuanya menjadi lebih baik', 'Depresi sering kali memicu kebohongan yang mengabadikan keputusasaan dan keputus-asaan. Ini termasuk pikiran seperti \"Saya tidak akan pernah sembuh\" atau \"Saya tidak layak bahagia.\" Memahami kebohongan ini adalah langkah penting dalam mengatasinya. Dengan perawatan dan waktu yang tepat, keyakinan yang salah ini dapat digantikan dengan perspektif yang lebih akurat dan penuh harapan, yang memberdayakan individu untuk mengambil tindakan menuju pemulihan dan kesejahteraan.', '', 'https://youtu.be/uq2C8us969M?si=4y-HTs4_DBEarXWz', NULL, NULL, 9, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(16, 2, 4, 'Cara pulih dari depresi', 'Pemulihan dari depresi merupakan perjalanan yang melibatkan kombinasi berbagai pilihan pengobatan, praktik perawatan diri, dan dukungan berkelanjutan. Strategi yang dapat dilakukan meliputi terapi (terutama Terapi Perilaku Kognitif), pengobatan, aktivitas fisik, dan perubahan gaya hidup. Membangun jaringan pendukung, menetapkan rutinitas yang sehat, dan terlibat dalam aktivitas yang bermakna juga dapat meningkatkan pemulihan secara signifikan. Kesabaran dan kegigihan adalah kuncinya, karena penyembuhan dari depresi sering kali bertahap tetapi dapat dicapai.', '', 'https://youtu.be/TVgQ_tgWMyU?si=joky_-1LDKFsxO9W', NULL, NULL, 63, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(17, 3, 1, 'Cara Membantu Seseorang yang Mengalami Depresi atau Kecemasan', 'Mendukung seseorang yang mengalami depresi atau kecemasan melibatkan mendengarkan, memvalidasi perasaan mereka, dan membantu mereka mengakses perawatan profesional saat dibutuhkan. Penting untuk bersabar dan tidak menghakimi, karena masalah kesehatan mental sulit diungkapkan. Memberikan bantuan praktis, seperti membantu tugas sehari-hari atau mendorong strategi penanganan yang positif, dapat membuat perbedaan besar dalam pemulihan mereka.', '', 'https://youtu.be/0Yr4hyFSJPk?si=ogQQJLL9wrjtWPaX', NULL, NULL, 3, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(18, 3, 1, 'Perilaku Mencari Perhatian: Ketika \"Abaikan Saja\" Tidak Berhasil', 'Perilaku mencari perhatian dapat menjadi tanda adanya tekanan emosional atau kebutuhan yang tidak terpenuhi. Mengabaikan perilaku tersebut sering kali tidak mengatasi akar penyebabnya, dan secara tidak sengaja dapat memperkuat perasaan kesepian atau frustrasi. Sebaliknya, penting untuk mengakui perasaan orang tersebut, memberikan dukungan, dan membantu mereka mengekspresikan kebutuhan mereka dengan cara yang lebih sehat melalui komunikasi dan validasi emosional.', '', 'https://youtu.be/YpJ3nSLr3Tw?si=6yJ-70CJlwJ_O0vU', NULL, NULL, 7, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(19, 3, 2, 'Mendengarkan Reflektif: Bagaimana Menjadi Pendengar yang Baik', 'Mendengarkan secara reflektif adalah teknik mendengarkan secara aktif di mana pendengar meniru perasaan atau pikiran pembicara untuk memastikan adanya pemahaman dan empati. Dengan memparafrasekan atau meringkas apa yang telah disampaikan pembicara, Anda menunjukkan perhatian dan validasi, yang dapat membantu membangun kepercayaan dan meningkatkan komunikasi. Teknik ini sangat membantu bagi individu yang mengalami kesulitan emosional, yang memungkinkan mereka merasa didengarkan dan didukung.', '', 'https://youtu.be/eUtZk960Q_A?si=78Psoq9BhdU3R-tw', NULL, NULL, 9, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(20, 3, 2, 'Homeostasis: Mengapa Mengubah Keluarga Itu Sulit, dan Bagaimana Anda Dapat Membuat Perubahan Bertahan Lama', 'Dinamika keluarga sering kali berjalan seperti sistem homeostasis, di mana setiap perubahan akan ditanggapi dengan perlawanan untuk menjaga stabilitas. Ketika salah satu anggota keluarga mencari perubahan—baik melalui terapi, perilaku baru, atau transisi kehidupan—hal tersebut dapat menimbulkan ketegangan atau penolakan dari orang lain yang terbiasa dengan dinamika saat ini. Untuk membuat perubahan yang langgeng, diperlukan pemahaman terhadap dinamika ini, komunikasi yang terbuka, dan pelibatan semua anggota dalam proses tersebut untuk mendorong kerja sama dan penerimaan.', '', 'https://youtu.be/fuOK3921W2M?si=LY22SV2JJZbxjF8r', NULL, NULL, 9, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(21, 3, 3, 'Cara Membicarakan Pikiran Bunuh Diri: Strategi Sederhana untuk Orang Tua dan Teman', 'Membicarakan pikiran untuk bunuh diri bisa jadi tidak mengenakkan, tetapi penting untuk memberikan dukungan kepada seseorang yang sedang mengalami krisis. Mendekati pembicaraan dengan penuh perhatian, kasih sayang, dan tanpa menghakimi adalah kuncinya. Mendorong orang tersebut untuk mengungkapkan perasaannya, mendengarkan tanpa langsung menawarkan solusi, dan meyakinkan mereka bahwa mereka tidak sendirian dapat membantu mereka merasa aman dan didukung. Selalu cari bantuan profesional jika diperlukan.', '', 'https://youtu.be/JLX4SqT7H-c?si=u5iRytC_7bvzX8S9', NULL, NULL, 9, NULL, '[]', '2025-05-05 21:04:53', '2025-05-05 21:04:53'),
(22, 3, 3, 'Cutting: Berbicara Tentang Perilaku Menyakiti Diri Sendiri (Dan 4 Cara yang Dapat Anda Lakukan)', 'Menyakiti diri sendiri sering kali merupakan mekanisme mengatasi emosi yang berlebihan atau masalah kesehatan mental. Meskipun ini mungkin tampak seperti masalah pribadi, sangat penting untuk mengatasinya dengan empati dan pengertian. Menawarkan dukungan yang tidak menghakimi, membantu orang tersebut menemukan cara yang lebih sehat untuk mengatasinya, mendorong perawatan profesional, dan menciptakan lingkungan yang aman adalah langkah-langkah penting dalam menawarkan bantuan kepada seseorang yang berjuang melawan perilaku mencelakai diri sendiri.', '', 'https://youtu.be/-5Z4cLwd698?si=YDyBcMBYZZ3Zpf3S', NULL, NULL, 5, NULL, '[]', '2025-05-05 21:05:51', '2025-05-05 21:05:51'),
(23, 3, 4, 'Kesedihan: 4 Sumber Daya untuk Membantu Teman yang Berduka', 'Berduka adalah proses yang sangat pribadi, dan menawarkan dukungan kepada seorang teman yang sedang berduka melibatkan penyediaan sumber daya dan kehadiran yang penuh kasih. Sumber daya yang direkomendasikan termasuk konseling, kelompok pendukung, buku-buku bermanfaat tentang kesedihan, dan platform online. Penting untuk memberikan ruang kepada orang yang berduka untuk mengekspresikan emosi mereka sambil juga memeriksa mereka untuk menawarkan dorongan dan dukungan melalui perjalanan penyembuhan mereka.', '', 'https://youtu.be/Z0IgYTi4aTs?si=cBc4T7GiBXJYMmkx', NULL, NULL, 5, NULL, '[]', '2025-05-05 21:05:51', '2025-05-05 21:05:51'),
(24, 3, 4, 'Cara Berbicara dengan Anak Anda Setelah Teman Sebayanya Bunuh Diri atau Meninggal di Sekolahnya', 'Berbicara dengan remaja setelah kematian teman sebaya bisa jadi sulit, tetapi sangat penting untuk membantu mereka memproses kesedihan dan emosi mereka. Lakukan pendekatan dengan keterbukaan, biarkan anak remaja Anda berbagi perasaan tanpa menghakimi. Bersabarlah, yakinkan mereka bahwa emosi mereka valid, dan tawarkan dukungan atau sumber daya profesional jika diperlukan. Menciptakan ruang untuk komunikasi yang jujur akan membantu mereka menavigasi emosi mereka dan menemukan strategi untuk mengatasinya.', '', 'https://youtu.be/EsFRTYws1L8?si=F8DX5pVrOlWpSwN7', NULL, NULL, 10, NULL, '[48]', '2025-05-05 21:05:51', '2025-05-21 12:28:44'),
(63, 1, 3, 'asdasdsa', 'assadas', 'Dokumen', NULL, '/data/1/skripsi_bab_1_2.pdf', NULL, 3, NULL, '[]', '2025-11-15 11:36:04', '2025-11-15 11:36:04'),
(64, 3, 4, '4dsaadssa', 'asdaasdasd', 'Dokumen', '', '/data/3/Progres_131125.pdf', '', 10, '0000-00-00 00:00:00', '[48]', '2025-11-15 11:36:48', '2025-11-15 11:37:16');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`options`)),
  `correctIndex` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `quizId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `options`, `correctIndex`, `createdAt`, `updatedAt`, `quizId`) VALUES
(1, 'Apa itu respon melawan/melarikan diri/membeku?', '[\"Reaksi terhadap bahaya yang dirasakan\", \"Reaksi terhadap kebahagiaan\", \"Cara untuk bersantai\", \"Latihan fisik\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(2, 'Apa yang dapat mengaktifkan respon melawan/lari/membeku?', '[\"Kegembiraan\", \"Stres\", \"Tidur\", \"Ketenangan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(3, 'Bagaimana stres dan kecemasan dapat memengaruhi kehidupan sehari-hari?', '[\"Dengan meningkatkan fokus\", \"Dengan mengganggu tugas sehari-hari\", \"Dengan membuat Anda merasa berenergi\", \"Dengan meningkatkan relaksasi\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(4, 'Manakah dari berikut ini yang merupakan emosi internal?', '[\"Stres\", \"Kekhawatiran\", \"Ketakutan\", \"Kegembiraan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(5, 'Apa yang dilakukan sistem saraf sebagai respons terhadap kecemasan?', '[\"Menenangkan Anda\", \"Memicu respons melawan/lari\", \"Membuat Anda tidur\", \"Membantu pernapasan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(6, 'Teknik berikut manakah yang membantu mematikan respons melawan/lari/membeku?', '[\"Melompat\", \"Bernapas yang dalam\", \"Berteriak\", \"Melarikan diri\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(7, 'Apa tujuan latihan grounding?', '[\"Untuk merilekskan tubuh Anda\", \"Untuk fokus pada saat ini\", \"Untuk tidur lebih baik\", \"Untuk melatih otot-otot Anda\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(8, 'Menciptakan rasa aman dalam pikiran Anda dapat membantu dalam hal apa?', '[\"Meningkatkan kecemasan\", \"Mengurangi bahaya yang dirasakan\", \"Membuat Anda lebih khawatir\", \"Membuat Anda cemas\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(9, 'Latihan menggambar dapat membantu Anda dalam hal apa?', '[\"Proses perasaan\", \"Latih otot Anda\", \"Lupakan kekhawatiran Anda\", \"Tidur lebih baik\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(10, 'Apa itu banjir emosi dalam hubungan?', '[\"Terlalu rileks\", \"Kesulitan berkomunikasi karena emosi yang meluap\", \"Terlalu banyak tertawa\", \"Berkomunikasi lebih baik saat stres\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 1),
(11, 'Apa langkah pertama untuk pulih dari depresi?', '[\"Mengenali bahwa depresi sedang merasuki Anda\", \"Menerima kesedihan\", \"Membicarakannya\", \"Mengabaikan pikiran negatif\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(12, 'Apa salah satu cara untuk membantu seseorang yang depresi saat mereka tidak ingin bicara?', '[\"Berikan mereka nasihat\", \"Berikan mereka ruang namun tunjukkan dukungan\", \"Paksa mereka untuk terbuka\", \"Berteriak pada mereka agar berbicara\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(13, 'Apa akibat dari \'seharusnya\' pada diri sendiri saat depresi?', '[\"Meningkatkan rasa kasih sayang pada diri sendiri\", \"Perasaan tidak mampu dan bersalah\", \"Pemahaman yang lebih baik terhadap diri sendiri\", \"Relaksasi yang lebih baik\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(14, 'Apa perbedaan antara rasa malu dan rasa bersalah dalam depresi?', '[\"Malu itu tentang tindakan, rasa bersalah itu tentang diri sendiri\", \"Malu itu menargetkan diri sendiri, rasa bersalah itu tentang tindakan\", \"Malu dan rasa bersalah itu sama\", \"Malu membantu menyembuhkan depresi\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(15, 'Apa peran peradangan dalam depresi?', '[\"Mengurangi perasaan sedih\", \"Mungkin berkontribusi terhadap perkembangan depresi\", \"Tidak berdampak\", \"Mengurangi efektivitas pengobatan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(16, 'Menurut Dr. Charles Raison, apa hubungan antara peradangan dan depresi?', '[\"Peradangan memperburuk pengaturan suasana hati dan meningkatkan risiko depresi\", \"Peradangan mengurangi depresi\", \"Peradangan tidak berpengaruh\", \"Peradangan membuat orang lebih bahagia\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(17, 'Apa saja kebohongan yang diceritakan depresi kepada Anda?', '[\"Saya tidak akan pernah menjadi lebih baik\",\"Saya layak untuk bahagia\",\"Saya bisa mengatasinya\",\"Semuanya akan segera membaik\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(18, 'Apa langkah penting dalam pemulihan dari depresi?', '[\"Hanya obat-obatan\", \"Terapi Perilaku Kognitif (CBT) dan praktik perawatan diri\", \"Menghindari interaksi sosial\", \"Tetap sendiri\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(19, 'Apa yang dapat membantu mengurangi keparahan gejala depresi, menurut penelitian terkini?', '[\"Terapi anti-inflamasi dan perubahan gaya hidup\", \"Mengabaikan gejala\", \"Lebih banyak stres\", \"Meningkatnya isolasi\"]', 0, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(20, 'Apa kunci untuk mengatasi kebohongan yang disampaikan depresi kepada Anda?', '[\"Menerimanya sebagai kebenaran\", \"Perawatan dan waktu yang tepat\", \"Mengabaikan perawatan\", \"Tidak mencari bantuan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 2),
(21, 'Apa aspek penting dalam mendukung seseorang yang mengalami depresi atau kecemasan?', '[\"Memberikan saran dengan segera\", \"Mendengarkan dan memvalidasi perasaan mereka\", \"Mengabaikan perilaku mereka\", \"Menyuruh mereka untuk melupakannya\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(22, 'Apa yang harus Anda lakukan ketika seseorang menunjukkan perilaku mencari perhatian?', '[\"Abaikan mereka\", \"Akui perasaan mereka dan berikan dukungan\", \"Beri tahu mereka untuk berhenti mencari perhatian\", \"Tegur mereka atas perilaku mereka\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(23, 'Apa itu mendengarkan reflektif?', '[\"Mendengarkan tanpa menanggapi\", \"Mengulangi apa yang dikatakan pembicara\", \"Mencerminkan perasaan atau pikiran pembicara untuk memastikan pemahaman\", \"Memberikan solusi dengan segera\"]', 2, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(24, 'Mengapa keluarga sering kali menolak perubahan?', '[\"Karena mereka tidak peduli\", \"Karena homeostasis dan kebutuhan untuk menjaga stabilitas\", \"Karena perubahan selalu buruk\", \"Karena mereka tidak menyadari perlunya perubahan\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(25, 'Apa strategi penting saat berbicara tentang pikiran bunuh diri?', '[\"Menawarkan solusi dengan segera\", \"Mendekati pembicaraan dengan penuh perhatian, kasih sayang, dan tanpa menghakimi\", \"Mengabaikan masalah\", \"Menyuruh orang tersebut untuk melupakan masalah\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(26, 'Bagaimana sebaiknya Anda mengatasi perilaku menyakiti diri sendiri?', '[\"Abaikan perasaan orang tersebut\", \"Berikan dukungan tanpa menghakimi dan dorong perawatan profesional\", \"Berikan hukuman\", \"Beri tahu mereka untuk segera berhenti\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(27, 'Apa sumber daya penting untuk membantu teman yang sedang berduka?', '[\"Memberi mereka ruang untuk berduka tanpa dukungan\", \"Memberikan konseling, kelompok pendukung, dan buku-buku bermanfaat\", \"Menyuruh mereka untuk terus maju\", \"Mengabaikan kesedihan mereka\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(28, 'Bagaimana seharusnya Anda berbicara kepada seorang remaja setelah kematian teman sebayanya di sekolah?', '[\"Hindari membahasnya\", \"Bersabarlah, yakinkan mereka, dan tawarkan dukungan profesional jika diperlukan\", \"Katakan pada mereka untuk melupakannya\", \"Abaikan emosi mereka\"]', 1, '2025-05-05 16:25:14', '2025-05-05 16:25:14', 3),
(59, 'Apa aspek penting dalam mendukung seseorang yang mengalami depresi atau kecemasan?', '[\"Memberikan saran segera\", \"Mendengarkan dan memvalidasi perasaan mereka\", \"Mengabaikan perilaku mereka\", \"Menyuruh mereka untuk melupakannya\"]', 1, '2025-05-05 18:30:19', '2025-05-05 18:30:19', 3),
(60, 'Apa yang harus Anda lakukan ketika seseorang menunjukkan perilaku mencari perhatian?', '[\"Abaikan mereka\", \"Akui perasaan mereka dan berikan dukungan\", \"Beri tahu mereka untuk berhenti mencari perhatian\", \"Tegur mereka atas perilaku mereka\"]', 1, '2025-05-05 18:31:50', '2025-05-05 18:31:50', 3);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `courseId`, `duration`, `createdAt`, `updatedAt`) VALUES
(1, 1, 300, '2025-05-05 23:24:59', '2025-05-05 23:24:59'),
(2, 2, 300, '2025-05-05 23:24:59', '2025-05-05 23:24:59'),
(3, 3, 300, '2025-05-05 23:24:59', '2025-05-05 23:24:59');

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
(1, 1, 1, 'General', '2025-11-18', '2025-11-28'),
(2, 1, 4, 'Pertemuan 2', '2025-11-28', '2025-11-28'),
(3, 1, 2, 'Pertemuan 1', '2025-11-28', '2025-11-28'),
(4, 1, 3, 'Pertemuan Tambahan', '2025-11-28', '2025-11-28'),
(5, 2, 1, 'Buku', '2025-11-28', '2025-11-28'),
(6, 3, 1, 'General', '2025-11-28', '2025-11-28');

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
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `id` int(11) NOT NULL,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`answers`)),
  `score` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `quizId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`id`, `answers`, `score`, `createdAt`, `updatedAt`, `userId`, `quizId`) VALUES
(21, '[0,0,0,0,0,0,0,0,0,0]', 10, '2025-05-17 08:23:53', '2025-05-17 08:23:53', 47, 1),
(22, '[0,0,0,0,0,0,0,0,0,0]', 2, '2025-05-17 08:28:43', '2025-05-17 08:28:43', 47, 1),
(23, '[3,3,3,3,3,3,3,3,3,3]', 0, '2025-05-18 09:44:29', '2025-05-18 09:44:29', 47, 1),
(24, '[0,0,0,0,1,0,0,0,0,0]', 3, '2025-05-20 11:33:42', '2025-05-20 11:33:42', 47, 1),
(25, '[0,0,3,3,0,0,3,3,0,0]', 2, '2025-05-21 10:26:00', '2025-05-21 10:26:00', 47, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `course_id` int(11) NOT NULL,
  `tutor_status` tinyint(1) NOT NULL,
  `last_update` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`course_id`, `tutor_status`, `last_update`) VALUES
(1, 1, '2025-11-07');

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
(47, 'Dyy', 'lynnnurch@gmail.com', '$2b$10$mDT2ViYNQ/78qMRbCfLtYOHKbwB/SMNq.OFQi7.X.1LPDAkWzB37K', 'student', '2025-05-06 06:42:26', '2025-05-06 06:42:46', 1),
(48, 'Dylan', 'dylan22001@mail.unpad.ac.id', '$2b$10$gaWOSAmp1t5XVTlaDTx4BuWfS4t6GjSZ7s/sXdwsKAjbg3RjaVY.O', 'teacher', '2025-05-19 08:34:39', '2025-05-19 10:22:01', 1),
(51, 'tes1', 'tes1@gmail.com', '$2b$10$yIqHIOdDtCM2VGHwEdgH0enjjUGhhBTlVs.sMhuHhZJBBL5UHSDaa', 'student', '2025-05-21 07:03:07', '2025-05-21 07:03:30', 1),
(52, 'tes2', 'tes2@gmail.com', '$2b$10$yIqHIOdDtCM2VGHwEdgH0enjjUGhhBTlVs.sMhuHhZJBBL5UHSDaa', 'student', '2025-05-21 07:03:07', '2025-05-21 07:03:30', 1),
(54, 'Dylan', 'dylanamadeus05@gmail.com', '$2b$10$DHQ/fHqLYrxoG1M41kdyPuEkqDH6E0T0L08/C3xKjNYXflV8TfKse', 'student', '2025-05-21 11:36:59', '2025-05-21 11:37:33', 1);

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
-- Indexes for table `materials1`
--
ALTER TABLE `materials1`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Questions_quizId_foreign_idx` (`quizId`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseId` (`courseId`);

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
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Submissions_userId_foreign_idx` (`userId`),
  ADD KEY `Submissions_quizId_foreign_idx` (`quizId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `materials1`
--
ALTER TABLE `materials1`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=517;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `Questions_quizId_foreign_idx` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `Submissions_quizId_foreign_idx` FOREIGN KEY (`quizId`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Submissions_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
