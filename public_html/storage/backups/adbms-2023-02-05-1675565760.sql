-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: adbms
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `backups`
--

DROP TABLE IF EXISTS `backups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `backups` (
  `id` char(36) NOT NULL,
  `connection_id` char(36) NOT NULL,
  `storage_path` varchar(191) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `message` varchar(191) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `backups_connection_id_foreign` (`connection_id`),
  CONSTRAINT `backups_connection_id_foreign` FOREIGN KEY (`connection_id`) REFERENCES `connections` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backups`
--

LOCK TABLES `backups` WRITE;
/*!40000 ALTER TABLE `backups` DISABLE KEYS */;
INSERT INTO `backups` VALUES ('5998c4ca-0161-43c4-94de-f36a52a241c6','4452577b-67e1-4336-b53d-b61974bbd55f','No file generated',0,'Unknown database \'adbsss\'','2023-02-03 22:40:48','2023-02-03 22:38:00','2023-02-03 22:40:48'),('e0896521-b714-4e45-b4e0-4a096b79c300','4452577b-67e1-4336-b53d-b61974bbd55f','No file generated',0,'Unknown database \'adbsss\'','2023-02-03 22:40:52','2023-02-03 22:39:01','2023-02-03 22:40:52'),('80427c5a-da02-48fc-bf1c-eec377276939','4452577b-67e1-4336-b53d-b61974bbd55f','No file generated',0,'Unknown database \'adbsss\'','2023-02-03 22:40:55','2023-02-03 22:40:00','2023-02-03 22:40:55');
/*!40000 ALTER TABLE `backups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `mysqldb_host` varchar(191) NOT NULL,
  `mysqldb_port` varchar(191) NOT NULL DEFAULT '3306',
  `mysqldb_user` varchar(191) NOT NULL,
  `mysqldb_pass` varchar(191) DEFAULT NULL,
  `mysqldb_name` varchar(191) NOT NULL,
  `frequency` enum('everyMinute','everyTwoMinutes','everyThreeMinutes','everyFourMinutes','everyFiveMinutes','everyTenMinutes','everyFifteenMinutes','everyThirtyMinutes','everyTwoHours','everyThreeHours','everyFourHours','everySixHours','hourly','daily','weekly','monthly','quarterly','yearly') NOT NULL DEFAULT 'everyMinute',
  `notifiable` tinyint(4) NOT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `connections_user_id_foreign` (`user_id`),
  CONSTRAINT `connections_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES ('196cd3a3-a3e7-11ed-9568-f8e4e39836df','b2d316b5-4080-437f-9963-6e3322dccbca','Database Connection 1','DC1','localhost','3306','root',NULL,'tasker','everyMinute',0,1,'2023-02-03 21:43:28','2023-02-14 17:20:43','2023-02-03 21:43:28'),('1c033897-d8be-4095-bf72-e53095a664a5','b2d316b5-4080-437f-9963-6e3322dccbca','Haha Test Lang 1','haha-test-lang-1','127.0.0.1','3306','root',NULL,'mysql','everyMinute',0,0,'2023-02-03 21:35:09','2023-02-03 21:34:36','2023-02-03 21:35:09'),('27a2821e-3fe3-4ec4-b813-626c54f9ae8b','b2d316b5-4080-437f-9963-6e3322dccbca','Test Connection 2','test-connection-2','127.0.0.1','3306','root',NULL,'tasker','everyMinute',0,0,'2023-02-03 21:34:09','2023-02-03 21:32:47','2023-02-03 21:34:09'),('35f5ab67-c9ab-4573-967e-9f6a40283184','b2d316b5-4080-437f-9963-6e3322dccbca','Test Connection 2','test-connection-2','127.0.0.1','3306','root',NULL,'tasker','everyMinute',0,0,'2023-02-03 21:43:45','2023-02-03 21:32:48','2023-02-03 21:43:45'),('418f9198-cc30-4f51-9310-a0e673feb845','b2d316b5-4080-437f-9963-6e3322dccbca','Connection 10','connection-10','127.0.0.1','3306','root',NULL,'mysql','everySixHours',1,1,'2023-02-03 21:43:41','2023-02-03 21:37:19','2023-02-03 21:43:41'),('433d425f-a3ef-11ed-9568-f8e4e39836df','b2d316b5-4080-437f-9963-6e3322dccbca','Database Connection 2','DC2','127.0.0.1','3306','root',NULL,'adbs','everyTwoMinutes',1,1,'2023-02-03 21:43:37',NULL,'2023-02-03 21:43:37'),('4340ae69-a3ef-11ed-9568-f8e4e39836df','b2d316b5-4080-437f-9963-6e3322dccbca','Database Connection 3','DC3','127.0.0.1','3306','root',NULL,'mysql','everyFiveMinutes',0,1,'2023-02-03 19:22:51',NULL,'2023-02-03 19:22:51'),('4452577b-67e1-4336-b53d-b61974bbd55f','b2d316b5-4080-437f-9963-6e3322dccbca','Connection 10','connection-10','127.0.0.1','3306','root',NULL,'adbms','everyMinute',0,1,NULL,'2023-02-03 21:44:07','2023-02-05 02:54:18'),('5c4b3bae-9a36-4d98-aab3-ca4de8256304','b2d316b5-4080-437f-9963-6e3322dccbca','Test Connection 1','test-connection-1','127.0.0.1','3306','root',NULL,'tasker','everyMinute',0,0,'2023-02-03 21:35:14','2023-02-03 21:27:45','2023-02-03 21:35:14'),('6fbd42ae-88dc-4ae6-9792-3cc4cbf87b40','b2d316b5-4080-437f-9963-6e3322dccbca','Connection 200034','connection-200034','127.0.0.1','3306','root',NULL,'mysql','everyMinute',0,1,NULL,'2023-02-03 21:44:36','2023-02-05 02:50:37'),('e7904c59-dd8f-4a1b-bad9-31a8a5ab7b9e','b2d316b5-4080-437f-9963-6e3322dccbca','Connection 4','connection-4','127.0.0.1','3306','root',NULL,'adbs','everyMinute',0,0,'2023-02-03 21:43:33','2023-02-03 21:35:39','2023-02-03 21:43:33');
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (25,'2014_10_12_000000_create_users_table',1),(26,'2014_10_12_100000_create_password_resets_table',1),(27,'2019_08_19_000000_create_failed_jobs_table',1),(28,'2019_12_14_000001_create_personal_access_tokens_table',1),(29,'2023_02_02_065606_create_connections_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES ('dev@reynaldorayan.app','$2y$10$4UvmQG0Zo9y6aiZtYGdHpuXOcNnd4sz8X0xYYCnYJgK.tkaQGPqQe','2023-02-03 22:53:59');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `avatar_path` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('b2d316b5-4080-437f-9963-6e3322dccbca','Rayan','Reynaldo',NULL,'dev@reynaldorayan.app','2023-02-07 17:19:05','$2y$10$ItITbbZfbMYi0P2gWGQ9rebPqw/h5eGM1fMDBI0qmsMZsRLzzKIXG','iiz5wbLHoCMNcQcyPzBYOyYoV8QAs8P8Y4LnfQne6HTh1bwNQ5U2UIv5AD4s',NULL,'2023-02-03 17:18:19','2023-02-03 17:18:19'),('c1ddb828-1142-484d-9089-40dde6b6c819','Rayan','Reynaldo',NULL,'reynaldorayan.fsd@gmail.com',NULL,'$2y$10$xogwhgwKMF0CsYd7MZaiBOokwJsHQCJgOKiOV8gZ7w9NO/S3zQ6dW',NULL,NULL,'2023-02-03 22:47:27','2023-02-03 22:47:27');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-05 10:56:00
