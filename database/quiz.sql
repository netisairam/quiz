-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2021 at 03:46 PM
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
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text NOT NULL,
  `option_d` text NOT NULL,
  `topic` int(11) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `topic`, `answer`) VALUES
(1, 'After how many Year’s FIFA World Cup is held?', '2 years', '3 years', '4 years', 'every year', 1, '4 years'),
(2, 'Which of these is a paint made from pigments and plastic?', 'acrylic', 'gesso', 'acetone', 'tempera', 2, 'acrylic'),
(3, 'Early photographers made their images on which of these materials?', 'stone', 'glass', 'paper', 'plastic', 2, 'glass'),
(4, 'To which artistic movement does Paul Gauguin’s The Yellow Christ belong?\n', 'impressionism', 'bauhaus', 'cloisonnism', 'fauvism', 2, 'cloisonnism'),
(5, 'Which Country won the first FIFA World Cup?', 'argentina', 'uruguay', 'italy', 'brazil', 1, 'uruguay'),
(6, 'Who won the first ICC World Cup?', 'india', 'west indies', 'england', 'australia', 1, 'west indies'),
(7, 'Who won the first T20 World Cup?', 'india', 'west indies', 'england', 'australia', 1, 'india'),
(10, 'Who is known as the Flying Sikh?', 'michael johnson', 'usain bolt', 'milkha sing', 'carl lewis', 1, 'milkha sing'),
(11, 'Who has the Highest Number of Gold Medals in Olympic History?', 'larisa latynina', 'mark spitz', 'michael phelps', 'saina nehwal', 1, 'michael phelps'),
(12, 'What is the 100m World Record of Usain Bolt?', '14.35 sec', '9.58 sec', '9.05 sec', '10.12 sec', 1, '9.58 sec'),
(13, 'What is the Women’s World Record of the 100-Meter Dash?', '12.35 sec', '10.45 sec', '9.55 sec', '10.49 sec', 1, '10.49 sec'),
(14, 'Where is the Famous Boxer Mary Kom from?', 'manipur', 'mizoram', 'nagaland', 'tripura', 1, 'manipur'),
(15, 'How many FIFA World Cup has been played till 2018?', '29', '52', '21', '14', 1, '21'),
(16, 'How many times has India won the Men’s Hockey World Cup in the Olympics?', '3', '2', '1', '0', 1, '1'),
(17, 'Which Female has the Most Olympic Gold Medals in Olympic History?', 'birgit fischer', 'marit bjørgen', 'larisa latynina', 'jenny thompson', 1, 'larisa latynina'),
(18, 'Who is known as “The Baltimore Bullet”?', 'roger federer', 'usain bolt', 'michael phelps', 'michael jordan', 1, 'michael phelps');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `topic` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `topic`) VALUES
(1, 'sports'),
(2, 'arts');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
