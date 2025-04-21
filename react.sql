-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 01:12 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react`
--

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE `connections` (
  `id` int(11) NOT NULL,
  `userone_id` int(11) NOT NULL,
  `usertwo_id` int(11) NOT NULL,
  `accepted` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`id`, `userone_id`, `usertwo_id`, `accepted`) VALUES
(1, 1, 2, 1),
(2, 1, 3, 1),
(3, 1, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `text` text NOT NULL,
  `date` date NOT NULL DEFAULT curdate(),
  `time` time DEFAULT curtime(),
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `text`, `date`, `time`, `date_time`) VALUES
(1, 1, 'Prvi post! :) :(', '2025-03-18', '11:51:18', '2025-03-23 11:26:19'),
(2, 1, 'Drugi post! :) :(', '2025-03-20', '00:00:00', '2025-03-23 11:26:19'),
(3, 1, 'Treci pooooost!', '2025-03-20', '08:09:00', '2025-03-23 11:26:19'),
(5, 1, 'Cetvrti post! :) :(', '2025-03-18', '11:51:18', '2025-03-23 11:26:19'),
(6, 1, 'Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( Cetvrti post! :) :( ', '2025-03-18', '11:51:18', '2025-03-23 11:26:19'),
(10, 2, 'Drugi profil post frienddd', '2025-03-23', '00:00:00', '2025-03-23 11:26:19'),
(11, 3, 'rprpptorfjg', '2025-03-23', '00:00:00', '2025-03-23 11:26:19'),
(12, 2, 'date_time test 123', '2025-03-23', '11:27:24', '2025-03-23 11:27:24'),
(13, 4, 'Ovo ne treba da se ucita', '2025-03-23', '12:08:53', '2025-03-23 12:08:53'),
(14, 2, 'Drugi profil copy tri', '2025-03-27', '12:29:08', '2025-03-23 11:26:19'),
(15, 2, 'Drugi profil copy', '2025-03-27', '12:29:29', '2025-03-23 11:26:19'),
(123, 2, '1231241231234124123124124124131231231241241212312412312341241231241241241312312312412412123124123123412412312412412413123123124124121231241231234124123124124124131231231241241212312412312341241231241241241312312312412412', '2025-03-27', '12:31:06', '2025-03-27 12:31:06'),
(124, 2, 'Drugi profil copy dvaaaaa', '2025-03-27', '12:31:42', '2025-03-23 11:26:19'),
(125, 2, '123123', '0000-00-00', '13:10:25', '2025-03-27 13:10:25');

--
-- Triggers `posts`
--
DELIMITER $$
CREATE TRIGGER `before_insert_posts` BEFORE INSERT ON `posts` FOR EACH ROW SET NEW.time = CURTIME()
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `posts_comments`
--

CREATE TABLE `posts_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(15) NOT NULL,
  `user_id` int(15) NOT NULL,
  `comment` text NOT NULL,
  `date` date DEFAULT curdate(),
  `time` time DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_comments`
--

INSERT INTO `posts_comments` (`id`, `post_id`, `user_id`, `comment`, `date`, `time`) VALUES
(4, 1, 2, 'Drugi komentar', '2025-03-27', '13:19:53'),
(5, 1, 3, 'Popravni prvi', '2025-03-26', '17:33:24'),
(6, 123, 2, '[value-3]', '2025-03-28', '13:31:27'),
(7, 1, 2, 'comcomcom', '2025-03-28', '17:31:14'),
(8, 1, 2, 'comcomcom', '2025-03-28', '17:31:18'),
(9, 124, 1, '123 123', '2025-03-28', '18:14:22'),
(10, 124, 1, 'Bravo bre', '2025-03-28', '18:14:32'),
(11, 123, 1, 'Komentarrrr', '2025-03-30', '17:49:42'),
(12, 14, 1, 'Komentarrr', '2025-03-30', '19:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(80) NOT NULL,
  `city` varchar(60) NOT NULL,
  `dob` date NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `city`, `dob`, `phone`) VALUES
(1, 'Nikola Bojovic', 'nikola.bojovic9@gmail.com', '$2a$12$w9GRJtc1I8BAgZyTUYq7AOoYVCQ3hC6ereQfd3k0YQd2LXkq.Cake', 'Smederevo', '2000-12-19', '0649799555'),
(2, 'Drugi profil', 'drugi@gmail.com', '$2a$12$w9GRJtc1I8BAgZyTUYq7AOoYVCQ3hC6ereQfd3k0YQd2LXkq.Cake', 'Smederevo', '2000-12-03', '0655151515'),
(3, 'Treci profil', 'treci@gmail.com', '$2a$12$w9GRJtc1I8BAgZyTUYq7AOoYVCQ3hC6ereQfd3k0YQd2LXkq.Cake', 'Beograd', '1982-11-10', '060060606'),
(4, 'Cetvrti profil', 'cetvrti@gmail.com', '$2a$12$w9GRJtc1I8BAgZyTUYq7AOoYVCQ3hC6ereQfd3k0YQd2LXkq.Cake', 'Novi Sad', '2006-09-13', '064100100');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connections`
--
ALTER TABLE `connections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userone_id` (`userone_id`),
  ADD KEY `usertwo_id` (`usertwo_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts_comments`
--
ALTER TABLE `posts_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `connections`
--
ALTER TABLE `connections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `posts_comments`
--
ALTER TABLE `posts_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `connections`
--
ALTER TABLE `connections`
  ADD CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`userone_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`usertwo_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts_comments`
--
ALTER TABLE `posts_comments`
  ADD CONSTRAINT `posts_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
