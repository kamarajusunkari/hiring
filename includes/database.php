<?php
/**
 * Arora Tech Solutions - Database PDO Connection
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

/**
 * Returns singleton PDO instance or null if connection fails
 */
function db_connect(): ?PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $dbConfig = config('database');
    if (empty($dbConfig['name'])) {
        return null;
    }

    $dsn = sprintf(
        'mysql:host=%s;port=%d;dbname=%s;charset=%s',
        $dbConfig['host'],
        $dbConfig['port'] ?? 3306,
        $dbConfig['name'],
        $dbConfig['charset'] ?? 'utf8mb4'
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_TIMEOUT            => 5,
    ];

    try {
        $pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['pass'], $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log('Database connection failure: ' . $e->getMessage());
        return null;
    }
}
