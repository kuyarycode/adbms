<?php

namespace App\Console;

use App\Models\Backup;
use App\Models\Connection;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;
use mysqli;

class Kernel extends ConsoleKernel
{
    protected $commands = [];

    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        foreach (Connection::all() as $connection) {
            $frequency = $connection->frequency;

            $schedule
                ->call(function () use ($connection) {
                    if ($connection->enabled) {
                        $date = date('Y-m-d');
                        $time = time();
                        $name = str_replace(
                            ' ',
                            '-',
                            strtolower($connection->mysqldb_name)
                        );
                        $filename = "{$name}-{$date}-{$time}.sql";
                        $path = 'app\\public\\backups\\' . $filename;

                        $stored = storage_path($path);
                        $command = "mysqldump --user={$connection->mysqldb_user} --host={$connection->mysqldb_host} --port={$connection->mysqldb_port} --password={$connection->mysqldb_pass} {$connection->mysqldb_name} > {$stored}";

                        if ($connection->notifiable) {
                            // Send backup on user email
                            $user = $connection->user();
                        }

                        $backup = new Backup();
                        $backup->id = Uuid::uuid4();
                        $backup->connection_id = $connection->id;

                        $message = '';
                        $output = null;
                        $retval = 0;

                        exec($command, $output, $retval);

                        if ($retval != 0) {
                            try {
                                $connection = new mysqli(
                                    $connection->mysqldb_host,
                                    $connection->mysqldb_user,
                                    $connection->mysqldb_pass,
                                    $connection->mysqldb_name,
                                    $connection->mysqldb_port
                                );
                            } catch (\Throwable $th) {
                                $message = $th->getMessage();
                            }
                        } else {
                            $message = 'Backup successfully created';
                        }

                        $backup->storage_path =
                            $retval == 0 ? $filename : 'No file generated';

                        $backup->message = $message;
                        $backup->frequency = $connection->frequency;
                        $backup->status = $retval == 0;
                        $backup->save();

                        Log::debug(
                            "{$connection->name}-{$connection->frequency}-{$connection->mysqldb_name}"
                        );
                    }
                })
                ->$frequency();
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}
