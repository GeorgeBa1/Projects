-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2025 at 06:32 PM
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
-- Database: `web2025`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigned_theses`
--

CREATE TABLE `assigned_theses` (
  `id` int(11) NOT NULL,
  `student_AM` int(11) NOT NULL,
  `thesis_id` int(11) NOT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `supervisor2_id` int(11) DEFAULT NULL,
  `supervisor3_id` int(11) DEFAULT NULL,
  `supervisor_accepted` tinyint(1) DEFAULT 0,
  `supervisor2_accepted` tinyint(1) DEFAULT 0,
  `supervisor3_accepted` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assigned_theses`
--

INSERT INTO `assigned_theses` (`id`, `student_AM`, `thesis_id`, `supervisor_id`, `supervisor2_id`, `supervisor3_id`, `supervisor_accepted`, `supervisor2_accepted`, `supervisor3_accepted`, `created_at`, `updated_at`) VALUES
(32, 1001, 17, 2, 7, 8, 1, 1, 1, '2025-03-22 16:04:24', '2025-03-22 17:09:02');

-- --------------------------------------------------------

--
-- Table structure for table `cancelled_theses`
--

CREATE TABLE `cancelled_theses` (
  `thesis_id` int(11) NOT NULL,
  `cancel_date` year(4) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `cancelled_by` int(11) NOT NULL,
  `assembly_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `thesis_id` int(11) NOT NULL,
  `supervisor_grade` decimal(10,2) NOT NULL,
  `supervisor2_grade` decimal(10,2) NOT NULL,
  `supervisor3_grade` decimal(10,2) NOT NULL,
  `library_link` text DEFAULT NULL,
  `detailed_grade1` varchar(20) DEFAULT NULL,
  `detailed_grade2` varchar(20) DEFAULT NULL,
  `detailed_grade3` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `thesis_id` int(11) NOT NULL,
  `prof_id` int(11) NOT NULL,
  `content` varchar(300) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `presentations`
--

CREATE TABLE `presentations` (
  `presentation_id` int(11) NOT NULL,
  `thesis_id` int(11) NOT NULL,
  `presentation_date` datetime DEFAULT NULL,
  `announcement_text` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `presentations`
--

INSERT INTO `presentations` (`presentation_id`, `thesis_id`, `presentation_date`, `announcement_text`, `created_at`, `updated_at`) VALUES
(26, 3, '2025-03-26 15:20:36', 'aaa', '2025-03-22 13:18:56', '2025-03-22 13:20:38');

-- --------------------------------------------------------

--
-- Table structure for table `profs`
--

CREATE TABLE `profs` (
  `prof_id` int(11) NOT NULL,
  `department` enum('Department of Fisheries & Aquaculture','Department of Food Science & Technology','Department of Agriculture','Department of Sustainable Agriculture','Department of Business Administration','Department of Economics','Department of Management Science and Technology','Department of Tourism Management','Department of Architecture','Department of Chemical Engineering','Department of Civil Engineering','Department of Computer Engineering and Informatics','Department of Electrical Engineering and Computer Technology','Department of Mechanical Engineering and Aeronautics','Department of Nursing','Department of Physiotherapy','Department of Speech & Language Therapy','Department of Medicine','Department of Pharmacy','Department of Educational Sciences and Early Childhood Education','Department of Education and Social Work','Department of History and Archaeology','Department of Philology','Department of Philosophy','Department of Theatre Studies','Department of Biology','Department of Chemistry','Department of Geology','Department of Materials Science','Department of Mathematics','Department of Physics') DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profs`
--

INSERT INTO `profs` (`prof_id`, `department`, `specialization`) VALUES
(2, 'Department of Computer Engineering and Informatics', 'AI'),
(7, 'Department of Computer Engineering and Informatics', 'Networks and optimization'),
(8, 'Department of Computer Engineering and Informatics', 'Neural networks and pattern recognition'),
(17, 'Department of Computer Engineering and Informatics', 'network centric systems'),
(18, 'Department of Computer Engineering and Informatics', 'network centric systems'),
(19, 'Department of Management Science and Technology', 'Business Informatics');

-- --------------------------------------------------------

--
-- Table structure for table `sec`
--

CREATE TABLE `sec` (
  `action_id` int(11) NOT NULL,
  `thesis_id` int(11) NOT NULL,
  `sec_id` int(11) NOT NULL,
  `action_type` enum('assign','cancel','complete') NOT NULL,
  `action_description` text DEFAULT NULL,
  `action_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `AM` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `department` enum('Department of Fisheries & Aquaculture','Department of Food Science & Technology','Department of Agriculture','Department of Sustainable Agriculture','Department of Business Administration','Department of Economics','Department of Management Science and Technology','Department of Tourism Management','Department of Architecture','Department of Chemical Engineering','Department of Civil Engineering','Department of Computer Engineering and Informatics','Department of Electrical Engineering and Computer Technology','Department of Mechanical Engineering and Aeronautics','Department of Nursing','Department of Physiotherapy','Department of Speech & Language Therapy','Department of Medicine','Department of Pharmacy','Department of Educational Sciences and Early Childhood Education','Department of Education and Social Work','Department of History and Archaeology','Department of Philology','Department of Philosophy','Department of Theatre Studies','Department of Biology','Department of Chemistry','Department of Geology','Department of Materials Science','Department of Mathematics','Department of Physics') NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`AM`, `user_id`, `department`, `name`, `surname`) VALUES
(1001, 3, 'Department of Computer Engineering and Informatics', 'Liam', 'Brown'),
(1002, 4, 'Department of Economics', 'Maria', 'Nikolaou'),
(1003, 5, 'Department of Architecture', 'Dimitris ', 'Kotsis'),
(1004, 6, 'Department of Medicine', 'Eleni', 'Papageorgiou'),
(1005, 12, 'Department of Computer Engineering and Informatics', 'Alex', 'Georgiou'),
(1006, 13, 'Department of Computer Engineering and Informatics', 'Georgia', 'Poluzou'),
(1007, 14, 'Department of Computer Engineering and Informatics', 'Konstantinos', 'Stamatiou');

-- --------------------------------------------------------

--
-- Table structure for table `theses`
--

CREATE TABLE `theses` (
  `thesis_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `abstract` varchar(255) DEFAULT NULL,
  `pdf_attachment` varchar(255) DEFAULT NULL,
  `evaluation_report` varchar(255) DEFAULT NULL,
  `status` enum('active','under_review','under_assignment','completed') DEFAULT 'active',
  `student_id` int(11) DEFAULT NULL,
  `supervisor_id` int(11) DEFAULT NULL,
  `supervisor2_id` int(11) DEFAULT NULL,
  `supervisor3_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `assigned_at` datetime DEFAULT NULL,
  `link` text DEFAULT NULL,
  `venue` varchar(50) DEFAULT NULL,
  `draft_file` varchar(255) DEFAULT NULL,
  `external_link` text DEFAULT NULL,
  `notes` varchar(300) DEFAULT NULL,
  `presentation_date` datetime DEFAULT NULL,
  `protocol_number` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theses`
--

INSERT INTO `theses` (`thesis_id`, `title`, `abstract`, `pdf_attachment`, `evaluation_report`, `status`, `student_id`, `supervisor_id`, `supervisor2_id`, `supervisor3_id`, `created_at`, `updated_at`, `assigned_at`, `link`, `venue`, `draft_file`, `external_link`, `notes`, `presentation_date`, `protocol_number`) VALUES
(3, 'Exploring Neural Networks for Image Classification', 'An in-depth study on the use of neural networks in classifying images across various datasets, focusing on accuracy and computational efficiency.', 'attachments/neural_networks.pdf', NULL, 'under_assignment', NULL, 2, NULL, NULL, '2024-03-31 21:29:35', '2025-03-22 16:00:43', '2024-04-02 00:29:35', 'https://zoom.gr/wx923', 'E2', 'drafts/Ergastiriaki_Askisi_24-25-1.0.pdf', 'https://workspace.google.com/', NULL, NULL, 'AP2024CEID'),
(4, 'Implementing Reinforcement Learning in Game Theory', 'This thesis explores reinforcement learning algorithms applied to game environments to create adaptive, intelligent behaviors in game agents.', 'attachments/reinforcement_learning_game_ai.pdf', NULL, 'under_assignment', NULL, 2, NULL, NULL, '2024-11-07 22:29:35', '2024-11-20 14:11:12', '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Natural Language Processing for Sentiment Analysis', 'A comprehensive exploration of NLP techniques to perform sentiment analysis on social media data, examining user sentiment trends.', 'attachments/nlp_sentiment_analysis.pdf', NULL, 'under_assignment', NULL, NULL, NULL, NULL, '2024-11-07 22:29:35', '2024-11-20 00:15:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Building a Scalable Web Application with Docker and K8s', 'This thesis investigates best practices for deploying scalable web applications using Docker containers and cloud infrastructure.', 'attachments/docker_cloud_scalability.pdf', NULL, 'under_assignment', NULL, 8, NULL, NULL, '2024-11-16 22:29:35', '2024-11-19 22:46:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Advancements in Large Language Models (LLMs) and Their Applications', 'An analysis of recent advancements in large language models, focusing on their applications in text generation, translation, and summarization.', 'attachments/llms_applications.pdf', NULL, 'under_assignment', NULL, NULL, NULL, NULL, '2024-11-07 22:29:35', '2024-11-20 00:15:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'An explainable AI framework for evaluating malicious acts in 5G networks', '....', '', NULL, 'active', 1001, 2, 7, 8, '2024-11-10 11:27:10', '2025-03-22 17:27:16', '2025-03-22 19:20:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'test thesis', 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum', 'attachments/diplomatiki_ergasia_tmiyp_0.pdf', NULL, 'under_assignment', NULL, 17, NULL, NULL, '2024-11-20 00:47:01', '2025-03-22 16:02:00', NULL, NULL, NULL, NULL, 'httops://google.gr', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','prof','sec') NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `address` varchar(100) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `role`, `name`, `surname`, `email`, `phone`, `created_at`, `address`, `mobile`) VALUES
(1, 'secure_pass1', 'prof', 'Michael', 'Johnson', 'michael.johnson@example.com', '2101234567', '2024-11-07 12:30:00', 'New York, USA', NULL),
(2, 'teacher_passA', 'prof', 'Sophia', 'Anderson', 'sophia.anderson@university.edu', '9876543210', '2024-11-08 14:45:27', 'Boston, USA', NULL),
(3, 'student_passX', 'student', 'Liam', 'Brown', 'liam.brown@student.edu', '2654321098', '2024-11-09 16:20:48', 'Los Angeles, USA', 1234567890),
(4, 'student_passY', 'student', 'Olivia', 'Martinez', 'olivia.martinez@student.edu', '2654321000', '2024-11-10 17:55:33', 'Chicago, USA', 987654321),
(5, 'staff_secure1', 'student', 'William', 'Taylor', 'william.taylor@company.com', '2123456789', '2024-11-11 19:10:50', 'Seattle, USA', NULL),
(6, 'admin_ultimate', 'sec', 'Emma', 'White', 'emma.white@secure.com', '2209876543', '2024-11-12 21:30:10', 'San Francisco, USA', NULL),
(7, 'faculty1234', 'prof', 'James', 'Hall', 'james.hall@university.edu', '3105671234', '2024-11-13 08:45:00', 'Austin, USA', NULL),
(8, 'grad_pass77', 'prof', 'Isabella', 'Lewis', 'isabella.lewis@grad.edu', '2654321888', '2024-11-14 10:15:30', 'Denver, USA', 111222333),
(9, 'manager01!', 'sec', 'Ethan', 'Walker', 'ethan.walker@business.com', '4056789123', '2024-11-15 13:30:45', 'Miami, USA', NULL),
(10, 'student_sky99', 'student', 'Charlotte', 'King', 'charlotte.king@students.edu', '6067894321', '2024-11-16 15:40:20', 'San Diego, USA', 555666777);

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `on_prof_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    IF NEW.role = 'prof' THEN INSERT INTO profs
        VALUES (NEW.user_id,NULL, NULL);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_students_on_user_change` BEFORE UPDATE ON `users` FOR EACH ROW BEGIN
    IF NEW.name != OLD.name OR NEW.surname != OLD.surname THEN
        UPDATE students
        SET name = NEW.name, surname = NEW.surname
        WHERE user_id = NEW.user_id;
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigned_theses`
--
ALTER TABLE `assigned_theses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_AM` (`student_AM`,`thesis_id`);

--
-- Indexes for table `cancelled_theses`
--
ALTER TABLE `cancelled_theses`
  ADD KEY `thesis_id` (`thesis_id`),
  ADD KEY `cancelled_by` (`cancelled_by`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`thesis_id`),
  ADD KEY `thesis_id` (`thesis_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `thesis_id` (`thesis_id`),
  ADD KEY `prof_id` (`prof_id`);

--
-- Indexes for table `presentations`
--
ALTER TABLE `presentations`
  ADD PRIMARY KEY (`presentation_id`),
  ADD UNIQUE KEY `thesis_id_2` (`thesis_id`),
  ADD KEY `thesis_id` (`thesis_id`);

--
-- Indexes for table `profs`
--
ALTER TABLE `profs`
  ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `sec`
--
ALTER TABLE `sec`
  ADD PRIMARY KEY (`action_id`),
  ADD KEY `thesis_id` (`thesis_id`),
  ADD KEY `sec_id` (`sec_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`AM`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `theses`
--
ALTER TABLE `theses`
  ADD PRIMARY KEY (`thesis_id`),
  ADD KEY `supervisor3_id` (`supervisor3_id`),
  ADD KEY `theses_ibfk_1` (`student_id`),
  ADD KEY `theses_ibfk_3` (`supervisor2_id`),
  ADD KEY `theses_ibfk_2` (`supervisor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigned_theses`
--
ALTER TABLE `assigned_theses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presentations`
--
ALTER TABLE `presentations`
  MODIFY `presentation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `sec`
--
ALTER TABLE `sec`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theses`
--
ALTER TABLE `theses`
  MODIFY `thesis_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cancelled_theses`
--
ALTER TABLE `cancelled_theses`
  ADD CONSTRAINT `cancelled_theses_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cancelled_theses_ibfk_2` FOREIGN KEY (`cancelled_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON DELETE CASCADE;

--
-- Constraints for table `presentations`
--
ALTER TABLE `presentations`
  ADD CONSTRAINT `presentations_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON DELETE CASCADE;

--
-- Constraints for table `sec`
--
ALTER TABLE `sec`
  ADD CONSTRAINT `sec_ibfk_1` FOREIGN KEY (`thesis_id`) REFERENCES `theses` (`thesis_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sec_ibfk_2` FOREIGN KEY (`sec_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `theses`
--
ALTER TABLE `theses`
  ADD CONSTRAINT `theses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`AM`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
