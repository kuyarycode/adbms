<?php

namespace App\Traits;

use mysqli;

trait TestConnection
{
    public static function mysql(
        $hostname,
        $username,
        $password,
        $database,
        $port
    ) {
        try {
            $connection = new mysqli(
                $hostname,
                $username,
                $password,
                $database,
                $port
            );

            if (!$connection->connect_error) {
                return [
                    'message' => 'Database connection stablished',
                    'success' => true,
                ];
            }
        } catch (\Throwable $th) {
            return [
                'message' => $th->getMessage(),
                'success' => false,
            ];
        }
    }
}
