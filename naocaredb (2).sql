-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2016 at 03:39 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naocaredb`
--

-- --------------------------------------------------------

--
-- Table structure for table `naocare_za_sunce`
--

CREATE TABLE `naocare_za_sunce` (
  `id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `naocare_za_sunce`
--

INSERT INTO `naocare_za_sunce` (`id`, `ime`, `proizvodjac_id`) VALUES
(2225, 'JovanovicRuczbmkkmmkmkmk', 1),
(2226, 'milenasuuknovic', 3),
(2227, 'silmpfr', 3);

-- --------------------------------------------------------

--
-- Table structure for table `naocare_za_vid`
--

CREATE TABLE `naocare_za_vid` (
  `id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL,
  `proizvodjac_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `naocare_za_vid`
--

INSERT INTO `naocare_za_vid` (`id`, `ime`, `proizvodjac_id`) VALUES
(3, 'Prada', 3),
(5, 'Prada', 2),
(6, 'Armani', 1);

-- --------------------------------------------------------

--
-- Table structure for table `proizvodjac`
--

CREATE TABLE `proizvodjac` (
  `proizvodjac_id` int(11) NOT NULL,
  `ime` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvodjac`
--

INSERT INTO `proizvodjac` (`proizvodjac_id`, `ime`) VALUES
(1, 'Ray Ban'),
(2, 'Dior'),
(3, 'Vogue');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`) USING BTREE;

--
-- Indexes for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`) USING BTREE;

--
-- Indexes for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  ADD PRIMARY KEY (`proizvodjac_id`),
  ADD KEY `proizvodjac_id` (`proizvodjac_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2228;
--
-- AUTO_INCREMENT for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  MODIFY `proizvodjac_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `naocare_za_sunce`
--
ALTER TABLE `naocare_za_sunce`
  ADD CONSTRAINT `naocare_za_sunce_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`proizvodjac_id`);

--
-- Constraints for table `naocare_za_vid`
--
ALTER TABLE `naocare_za_vid`
  ADD CONSTRAINT `naocare_za_vid_ibfk_1` FOREIGN KEY (`proizvodjac_id`) REFERENCES `proizvodjac` (`proizvodjac_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
