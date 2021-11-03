-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2021 at 02:40 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `students_tbl`
--

CREATE TABLE `students_tbl` (
  `recno_fld` int(11) NOT NULL,
  `studnum_fld` int(11) DEFAULT 1000,
  `fname_fld` text DEFAULT NULL,
  `lname_fld` text DEFAULT NULL,
  `email_fld` text DEFAULT NULL,
  `role_fld` tinyint(1) NOT NULL DEFAULT 0,
  `pword_fld` text DEFAULT NULL,
  `token_fld` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students_tbl`
--

INSERT INTO `students_tbl` (`recno_fld`, `studnum_fld`, `fname_fld`, `lname_fld`, `email_fld`, `role_fld`, `pword_fld`, `token_fld`) VALUES
(2013, 9122, 'Sean Kyle', 'Pasco', 'seankylepasco@gmail.com', 0, '$2y$10$YmI1NTI1NjE2ODBkMjIxYONq2SZ/bXj5iKoTrGv2offZY1pp/K5Bm', NULL),
(2014, 9123, 'Kenneth', 'Mobo', 'kenneth@gmail.com', 0, '$2y$10$MjM0Y2MxNDkwMTc1ZDc3N.luBoYn6ajvZvCHIYvrlIku7l033Ejfm', NULL),
(2015, 9124, 'Dylan Brandi', 'Saliba', 'dylan@gmail.com', 0, '$2y$10$NWE4MTI3YmU3NzViMGI0ZOpP6numJ3xJxNIqPatxjnlz1j/R6Jjna', NULL),
(2016, 9125, 'Taylor Brooke', 'Saliba', 'summer@gmail.com', 0, '$2y$10$NDI4OTMyNGU2MGNjMTI3MOFiXOlWPxZ0uHRuL9ztGZuc3uL8C3jFG', NULL),
(2017, 9126, 'Zyra Nicole', 'Bautista', 'zyra@gmail.com', 0, '$2y$10$MzA1NjQ4OTEyMzBiZWQ2Nu7xMGn93u3Hwz9wf.oZ3w9XkYlvfXbRy', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teachers_tbl`
--

CREATE TABLE `teachers_tbl` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers_tbl`
--

INSERT INTO `teachers_tbl` (`id`, `name`) VALUES
(1, 123),
(2, 456);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students_tbl`
--
ALTER TABLE `students_tbl`
  ADD PRIMARY KEY (`recno_fld`);

--
-- Indexes for table `teachers_tbl`
--
ALTER TABLE `teachers_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students_tbl`
--
ALTER TABLE `students_tbl`
  MODIFY `recno_fld` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2025;

--
-- AUTO_INCREMENT for table `teachers_tbl`
--
ALTER TABLE `teachers_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
