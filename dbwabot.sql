-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2025 at 11:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbwabot`
--

-- --------------------------------------------------------

--
-- Table structure for table `message_chats`
--

CREATE TABLE `message_chats` (
  `id` int(11) NOT NULL,
  `menu` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message_chats`
--

INSERT INTO `message_chats` (`id`, `menu`, `data`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'defaultMessage', 'Halo saudara/i \n\nMohon maaf, *SKEMA WhatsApp Center* saat ini belum bisa mengerti permintaan Anda.\n\nUntuk mencari informasi yang tersedia, Kamu bisa ketik *Ping* \n\nTerimakasih telah menggunakan layanan ini 😊', NULL, '2025-02-11 07:34:05', '2025-02-11 07:34:05'),
(2, 'ping', '*Selamat Datang di Layanan Whatsapp Center*\r\n*SMK Negeri Manonjaya* :) \r\n\r\nLayanan ini bertujuan agar memudahkan akses informasi untuk Anda!\r\n\r\nSilahkan pilih salah satu opsi di bawah ini untuk mengakses informasi!\r\n\r\n0. Daftar Menu Informasi\r\n1. Profil Sekolah\r\n2. Program Keahlian\r\n3. Bursa Kerja Khusus\r\n4. Mitra DU/DI \r\n5. PPDB\r\n6. Sosial Media\r\n7. Layanan Interaktif\r\n8. Kritik/Saran & Pengaduan\r\n9. Bantuan dan FAQs\r\n10. Berita Sekolah Terbaru\r\n\r\n\r\n_Contoh : 1  (Untuk melihat detail Profil Sekolah)_', NULL, '2025-02-11 07:43:19', '2025-02-12 02:48:39'),
(4, '0', '*Daftar Menu Informasi*\r\n\r\n*0. Daftar Menu Informasi*\r\n*1. Profil Sekolah*\r\n*2. Program Keahlian*\r\n_2.1 Detail TKR_\r\n_2.2 Detail TSM_\r\n_2.3 Detail TKJ_\r\n_2.4 Detail MP_\r\n_2.5 Detail RPL_\r\n*3. Bursa Kerja Khusus SKEMA*\r\n*4. Mitra DU/DI*\r\n*5. PPDB*\r\n*6. Sosial Media*\r\n*7. Layanan Interaktif*\r\n_7.1 Layanan Interaktif Unit Kerja_\r\n*8. Kritik/Saran & Pengaduan*\r\n_8.1 Format Kritik/Saran_\r\n_8.2 Format Pengaduan_\r\n*9. Bantuan dan FAQs*\r\n*10. Berita Sekolah Terbaru*\r\n\r\n_Contoh : 1  (Untuk melihat detail Profil Sekolah)_', NULL, '2025-02-11 07:57:29', '2025-02-12 02:49:18'),
(5, '1', '*1. Profil Sekolah*\r\n\r\n*Sejarah Singkat*\r\n\r\nSMKN Manonjaya di Jalan Gunung Tanjung Desa Margahayu KM 2,5 Manonjaya Kabupaten Tasikmalaya berdiri tahun 2007. SMK ini merupakan SMK negeri pertama di Kecamatan Manonjaya dan merupakan SMK rujukan dari pemerintah untuk meningkatkan SDM (Sumber Daya Manusia) di wilayah tersebut. Tahun pertama berdiri, SMKN Manonjaya membuka dua jurusan yakni Teknik Komputer dan Jaringan dan Teknik Mesin Otomotif (TMO). Tahun ketiga, ada pemecahan jurusan dari TMO jadi Teknik Kendaraan Ringan (TKR) dan Teknik Sepeda Motor (TSM). Di tahun 2010 dibangun jurusan baru yakni Rekayasa Perangkat Lunak. 2012 ada penambahan jurusan Administrasi Perkantoran.\r\n\r\nPeminat SMKN Manonjaya di tahun pertama hingga sekarang cukup tinggi karena SMKN Manonjaya merupakan SMK Negeri satu-satunya di Manonjaya. Jumlah karyawan yang terdiri dari guru dan tenaga kependidikan yakni 123 orang. SMKN Manonjaya telah menjadi salah satu sekolah yang rutin meraih berbagai prestasi di antaranya di bidang Pramuka, PMR, Paskibra, Polisi Siswa,  KIR Kimia, olahraga dan prestasi di semua kompetensi keahlian.\r\nFasilitas di SMKN Manonjaya memiliki fasilitas yang memadai di antaranya 30 ruang teori, 2 workshop, 8 laboratorium komputer, lab bahasa, perpustakaan, masjid, lapangan upacara dan olahraga serta gedung aula.\r\n\r\n *Visi*\r\n\r\nTerwujudnya sekolah vokasi yang unggul dalam pelayanan pembelajaran dan pendidikan yang berakhlak mulia, kreatif, inovatif, kompeten dan memiliki daya saing istimewa 2025\r\n\r\n*Misi*\r\n\r\nMewujudkan kualitas sekolah vokasi yang unggul dan terpercaya.\r\n\r\n1. Mewujudkan layanan pembelajaran dan pendidikan pada pembentukan karakter akhlaq mulia, kreatif, inovatif dan kompeten di bidangnya.\r\n2. Mewujudkan harmonisasi antara keluarga, sekolah dan lingkungan dalam wahana Sekolah Ramah Anak.\r\n3. Mewujudkan kinerja manajemen sekolah yang efektif, efisien, dan selaras dengan perkembangan zaman.\r\n4. Menguatkan sinergitas kemitraan sekolah dengan orangtua, masyarakat, dan IDUKA (industri, dunia usaha, dan kerja) dalam mengawal proses pendidikan.\r\n5. Meningkatkan dan mengoptimalkan sarana prasarana pembelajaran teori dan praktik maupun sarana lainnya.\r\n7. Mewujudkan kemitraan IDUKA dalam penempatan kerja alumni.', 'image-1739260670701.png', '2025-02-11 07:57:50', '2025-02-12 03:25:54'),
(6, '2', '*2. Program Keahlian*\r\n\r\n2.1 *(TKR)*  - Teknik Kendaraan Ringan\r\n2.2 *(TSM)*  - Teknik Sepeda Motor\r\n2.3 *(TKJ)*   - Teknik Komputer dan Jaringan\r\n2.4 *(MP)*    - Manajemen Perkantoran\r\n2.5 *(RPL)*   - Rekayasa Perangkat Lunak\r\n\r\nJika Anda penasaran dengan detail program keahlian silahkan pilih opsi tambahannya!\r\n\r\n _Contoh : 2.1  (Untuk melihat detail TKR_', 'image-1739261660665.png', '2025-02-11 08:14:20', '2025-02-11 08:14:20'),
(7, '2.1', '*2.1 (TKR) - Teknik Kendaraan Ringan*\r\n\r\n Kompetensi keahlian ini berdiri pada tahun 2008. Adapun kompetensi yang dipelajari ialah tentang teknologi  otomotif yang di dalamnya memuat pembelajaran perawatan dan perbaikan kendaraan ringan sistem pemindah tenaga, chasis, dan suspense, serta sistem kelistrikan otomotif sehingga dapat mempersiapkan peserta didiknya untuk dapat bekerja pada sektor industri otomotif dan perbengkelan.\r\n\r\n Siswa yang ingin mengembangkan keterampilan dan pengetahuannya juga dapat melanjutkan ke jenjang pendidikan yang lebih tinggi yaitu Perguruan Tinggi di bidang Teknik Mesin Konversi Energi ataupun yang lainnya.', 'image-1739261859163.jpg', '2025-02-11 08:17:39', '2025-02-11 08:17:39'),
(8, '2.2', '*2.2 (TSM) - Teknik Sepeda Motor*\r\n\r\n Kompetensi keahlian ini didirikan pada tahun 2010. Adapun beberapa materi yang dipelajari ialah tentang teknologi otomotif bidang sepeda motor yang di dalamnya memuat pembelajaran perawatan dan perbaikan sepeda motor serta sistem kelistrikan otomotif sehingga dapat mempersiapkan peserta didik untuk dapat bekerja pada sektor industri otomotif sepeda motor dan perbengkelan.\r\nPeluang kerja untuk kompetensi ini sangatlah menjamin diantaranya :\r\n* Dibidang Industri Otomotif (Tidak hanya di dealer saja, tetapi bisa menjadi seorang perancang body, transmisi, sasis, hingga engine)\r\n* Menjadi Periset.\r\n* Bekerja di perusahaan Multinasional.\r\n* Teknisi.\r\n* Modifikator.\r\n* dan mampu berwirausaha (Membuka bengkel)', 'image-1739261989604.jpg', '2025-02-11 08:19:49', '2025-02-11 08:19:49'),
(9, '2.3', '*2.3 (TKJ) - Teknik Komputer dan Jaringan*\r\n\r\n Kompetensi keahlian ini berdiri pada tahun 2008. TKJ adalah jurusan yang mempelajari tentang teknik komputer seperti perakitan PC, Laptop, Pengkabelan sekaligus Jaringannya. Pada Jaringan tugas anak TKJ yaitu menkonfigurasi perangkat jaringan seperti halnya router, switch, hub, dll.', 'image-1739262157196.jpg', '2025-02-11 08:22:37', '2025-02-11 08:22:37'),
(10, '2.4', '*2.4 (MP) - Manajemen Perkantoran*\r\n\r\n Kompetensi keahlian ini berdiri tahun 2012. Kompetensi ini mempelajari tentang administrasi perkantoran yang di dalamnya memuat pembelajaran kearsipan surat menyurat, resepsionis, mesin-mesin kantor, dan interior ruangan. Sehingga dapat mempersiapkan peserta didik untuk dapat bekerja pada instansi pemerintahan maupun swasta.', 'image-1739262244541.jpg', '2025-02-11 08:24:04', '2025-02-11 08:24:04'),
(12, '2.5', '*2.5 (RPL) - Rekayasa Perangkat Lunak*\r\n\r\n Kompetensi keahlian ini didirikan pada tahun 2011. Kompetensi ini mempelajari tentang algoritma pemrograman, web desain, database administrator dan desain grafis sehingga dapat mempersiapkan peserta didik untuk dapat bekerja pada sektor industri informasi dan komunikasi, industri komputer serta industri perkantoran.', 'image-1739262967126.png', '2025-02-11 08:36:07', '2025-02-11 08:36:07'),
(13, '3', '*3. Bursa Kerja Khusus SKEMA*\r\n\r\nDibentuk secara resmi di Sekolah Menengah Kejuruan Negeri Manonjaya, sebagai unit pelaksana yang memberikan pelayanan dan informasi lowongan kerja, pelaksana pemasaran, penyaluran dan penempatan tenaga kerja, merupakan mitra Dinas Tenaga Kerja dan mitra Dunia Usaha / Dunia Industri.\r\n\r\n*Pelayanan BKK*\r\nBuka Hari Senin - Jumat\r\nPukul 08:00 - 15:00\r\nJl. Gunungtanjung Km. 2,5 Margahayu, Manonjaya, Kab. Tasikmalaya\r\nUntuk informasi lowongan BKK SKEMA terbaru silahkan akses link berikut!\r\n\r\nWebsite     : https://bkk.smknmanonjaya.sch.id/\r\nInstagram : https://www.instagram.com/bkk_skema/\r\n\r\nLink Group Telegram  : https://t.me/joinchat/HGnTYBOHoCykow2c\r\nLink Group Whatsapp : https://chat.whatsapp.com/CfbsKMi1z2G5J0PUwbh6l4', NULL, '2025-02-11 12:18:01', '2025-02-11 12:18:01'),
(14, '4', '*4. Mitra DU/DI*\r\n\r\n1. PT. Alvaro Satya Nusa\r\n2. PT. Astra Honda Motor\r\n3. PT. Bino Mitra Sejati (Bantex Indonesia)\r\n4. PT. Daihatsu Motor Co., Ltd.\r\n5. Oracle Corporation\r\n6. ID-Networkers (IDN-ID)\r\n7. CV. Access Media\r\n8. Axioo Indonesia ', NULL, '2025-02-11 12:19:40', '2025-02-11 12:19:40'),
(15, '5', '*5. SPMB*\r\n\r\nSPMB SMK Negeri Manonjaya Tahun Pelajaran 2025/2026\r\nKami membuka peluang bagi Calon Peserta Didik terbaik untuk mendaftar di sekolah kami demi mewujudkan Visi SMK Negeri Manonjaya yaitu “TERWUJUDNYA SEKOLAH VOKASI YANG UNGGUL DALAM PELAYANAN PEMBELAJARAN DAN PENDIDIKAN YANG BERAKHLAK MULIA, KREATIF, INOVATIF, KOMPETEN DAN MEMILIKI DAYA SAING ISTIMEWA 2025”.\r\n\r\n- Teknik Kendaraan Ringan\r\n- Teknik Sepeda Motor\r\n- Teknik Komputer dan Jaringan\r\n- Rekayasa Perangkat Lunak\r\n- Manajemen Perkantoran\r\n\r\n*Istimewa Dari Yang Unggul*\r\n\r\nUntuk informasi lebih lanjut klik link berikut ini!\r\n\r\nhttp://ppdb.smknmanonjaya.sch.id/\r\nhttps://www.instagram.com/smkn.manonjaya/\r\nhttps://www.facebook.com/smkn.manonjaya08/', 'image-1739277183674.png', '2025-02-11 12:33:03', '2025-02-11 12:33:03'),
(16, '6', '*6. Sosial Media*\r\n\r\nLink Sosial Media Resmi Sekolah yang akan selalu update mengenai informasi kegiatan-kegiatan serta informasi lainnya ada pada link berikut! Ayo kita follow agar tidak ketinggalan tentang informasi terbaru!\r\n\r\nWebsite : SMK Negeri Manonjaya\r\nhttps://smknmanonjaya.sch.id/\r\n\r\nInstagram : @smkn.manonjaya\r\nhttps://www.instagram.com/smkn.manonjaya/\r\n\r\nFacebook : SMKN Manonjaya / @smkn.manonjaya08\r\nhttps://www.facebook.com/smkn.manonjaya08/\r\n\r\nYoutube : SMK Negeri Manonjaya\r\nhttps://www.youtube.com/c/SMKNEGERIMANONJAYA', NULL, '2025-02-11 12:34:15', '2025-02-11 12:34:15'),
(17, '7', '*7. Layanan Interaktif*\r\n\r\nLayanan ini hanya berlaku pada saat hari & jam kerja!\r\nHari Senin - Jumat\r\nPukul 08:00 - 14:00\r\n\r\nApabila pesan Anda belum ada balasan mohon untuk menunggu.\r\n\r\n_7.1 Untuk tersambung langsung dengan Admin Unit Kerja SMK Negeri Manonjaya_', NULL, '2025-02-11 12:34:54', '2025-02-11 12:34:54'),
(18, '7.1', '*7.1 Layanan Unit Kerja*\r\n\r\n*Pesan Anda hanya akan dibalas pada saat jam kerja. Mohon untuk menunggu!*\r\n\r\nAdmin IT Center SKEMA : https://bit.ly/AdminITSKEMA\r\nAdmin SPMB SKEMA      : https://bit.ly/AdminPPDBSKEMA\r\nAdmin BP/BK SKEMA      : https://bit.ly/AdminBPBK\r\nAdmin BKK SKEMA          : https://bit.ly/AdminBKKSkema', NULL, '2025-02-11 12:37:32', '2025-02-11 12:37:32'),
(19, '8', '*8. Kritik/Saran dan Pengaduan*\r\n\r\nKami siap untuk melayani Anda dengan sepenuh hati :)\r\nSampaikanlah kritik/saran & pengaduan sesuai dengan prosedur!\r\n\r\n_8.1 Untuk menampilkan contoh format Kritik/Saran_\r\n_8.2 Untuk menampilkan contoh format Pengaduan_', NULL, '2025-02-11 12:38:01', '2025-02-11 12:38:01'),
(20, '8.1', '*8.1 Format Kritik/Saran*\r\n\r\nSampaikanlah dengan baik dan benar, agar laporan Anda bisa Kami proses sesuai dengan prosedur yang berlaku. Terima kasih!\r\n\r\nKritik : ...\r\n\r\n\r\nSaran : ...', NULL, '2025-02-11 12:38:25', '2025-02-11 12:38:25'),
(21, '8.2', '*8.2 Format Pengaduan*\r\n\r\nSampaikanlah dengan baik dan benar, agar laporan Anda bisa Kami proses sesuai dengan prosedur yang berlaku. Terima kasih!\r\n\r\nPengaduan : ...\r\n\r\n\r\nFoto Bukti : ...', NULL, '2025-02-11 12:38:37', '2025-02-11 12:38:37'),
(22, '9', '*9. Bantuan & FAQs*\r\n\r\nKami siap untuk melayani dan menjawab pertanyaan Anda.\r\n\r\n*_1. Q : Bagaimana cara menggunakan Layanan Whatsapp Center SKEMA ini?_*\r\nA: Anda bisa menggunakan layanan ini dengan mudah, cukup ketik *ping* maka akan muncul informasi yang sudah tersedia.\r\n\r\n*_2. Q : Siapa Pengelola WhatsApp-Center SKEMA ini?_*\r\nA: WhatsApp-Center SKEMA ini dikelola oleh Tim *IT-Support* SMK Negeri Manonjaya\r\n\r\n*_3. Q : Apakah daftar sekolah di SMKN Manonjaya berbayar?_*\r\nA: Tidak, untuk mendaftar di SMKN Manonjaya tidak dipungut biaya apapun.\r\n\r\n*_4. Q : Apakah SMKN Manonjaya menerima siswa baru?_*\r\nA: Ya, SMKN Manonjaya menerima siswa baru melalui jalur SPMB setiap tahunnya._\r\n\r\n*_5. Q : Bagaimana cara menghubungi admin terkait apabila pertanyaan saya tidak terjawab di sini?_*\r\nA: Anda bisa menggunakan Layanan Interaktif di Menu 7.1 untuk terhubung langsung dengan Admin Unit Kerja SMK Negeri Manonjaya.\r\n\r\n*Terima kasih telah menggunakan layanan ini! 😊*', NULL, '2025-02-11 12:40:49', '2025-02-11 12:40:49'),
(34, '10', 'Prestasi gemilang di awal minggu! 🏆✨ Pagi tadi, upacara paripurna berlangsung dengan khidmat, disertai kabar membanggakan dari salah satu siswa kami yaitu Reina Siti Nuraeni yang telah meraih Juara 1 Lomba Menulis Cerpen se-Jawa Barat dan Jawa Tengah dalam Sayembara Bahasa, Sastra, dan Festival Budaya 2025 di Universitas Galuh. Semoga pencapaian ini menginspirasi lebih banyak karya luar biasa ke depannya! 📖🔥\r\n.\r\n- SMKN MANONJAYA\r\n- SMK PUSAT KEUNGGULAN\r\n#istimewadariyangunggul\r\n.\r\n----------------------------------------------\r\nFollow us on:\r\nIG: @smkn.manonjaya\r\nFB: SMKN Manonjaya\r\nYoutube : SMK NEGERI MANONJAYA\r\nWeb: smknmanonjaya.sch.id\r\n----------------------------------------------', '1739329103970-Screenshot_12-2-2025_9586_www.instagram.com.jpeg', '2025-02-12 02:52:35', '2025-02-12 02:58:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nama`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', 'admin', '$2b$10$Es9n62sugTDF3GI9itfFQuileR6ZDwBS/Mee/bZjn8K4zOVMChbOG', '2025-02-12 06:17:09', '2025-02-12 06:17:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message_chats`
--
ALTER TABLE `message_chats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `menu` (`menu`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message_chats`
--
ALTER TABLE `message_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
