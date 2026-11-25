-- ========================================================
-- Arora Tech Solutions - Database Schema
-- Database: MySQL 8.x / MariaDB (utf8mb4)
-- Application: hire.aroratechsolutions.com
-- ========================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- --------------------------------------------------------
-- Table: hiring_enquiries
-- Primary lead-generation table storing role-specific developer requests
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hiring_enquiries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `developer_role` VARCHAR(100) NOT NULL,
  `technologies` TEXT DEFAULT NULL COMMENT 'Comma or JSON-separated technology tags',
  `experience_level` VARCHAR(50) DEFAULT NULL COMMENT 'Junior, Mid, Senior, Not sure',
  `engagement_model` ENUM('hourly', 'weekly', 'monthly') NOT NULL,
  `duration_hours` VARCHAR(50) DEFAULT NULL COMMENT 'Estimated commitment or hours',
  `budget` VARCHAR(100) DEFAULT NULL,
  `project_details` TEXT NOT NULL,
  `status` ENUM('new', 'contacted', 'qualified', 'proposal_sent', 'closed') NOT NULL DEFAULT 'new',
  `source_page` VARCHAR(255) NOT NULL,
  `ip_hash` CHAR(64) NOT NULL COMMENT 'SHA-256 hash of submitter IP for rate limiting and privacy',
  `user_agent` VARCHAR(500) DEFAULT NULL,
  `admin_notes` TEXT DEFAULT NULL,
  `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_developer_role` (`developer_role`),
  INDEX `idx_ip_hash_created_at` (`ip_hash`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lead generation enquiries for developer talent';

-- --------------------------------------------------------
-- Table: contact_messages
-- General inquiries from /contact/ page
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'read', 'replied', 'archived') NOT NULL DEFAULT 'new',
  `ip_hash` CHAR(64) NOT NULL,
  `user_agent` VARCHAR(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_contact_status` (`status`),
  INDEX `idx_contact_created_at` (`created_at`),
  INDEX `idx_contact_ip_hash_created_at` (`ip_hash`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='General inquiries from contact page';

-- --------------------------------------------------------
-- Table: rate_limit_logs (optional DB-driven rate limiting)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rate_limit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip_hash` CHAR(64) NOT NULL,
  `action` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_rate_limit_lookup` (`ip_hash`, `action`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tracks request frequency for IP rate limiting';
