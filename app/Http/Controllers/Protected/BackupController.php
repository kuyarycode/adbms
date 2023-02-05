<?php

namespace App\Http\Controllers\Protected;

use App\Http\Controllers\Controller;
use App\Models\Backup;
use App\Models\Connection;
use App\Traits\TestConnection;
use Inertia\Inertia;

class BackupController extends Controller
{
    use TestConnection;

    public function drop_backup($backupId)
    {
        $backup = Backup::find($backupId);
        $backup->connection;

        return Inertia::render('Protected/Backups/Drop', compact('backup'));
    }

    public function backups($connectionId)
    {
        $connection = Connection::find($connectionId);

        if(!$connection){
            return redirect()->route('connections')->with('flash', [
                'message' => 'Connection not exists',
                'success' => false
            ]);
        }

        $connection->connected = TestConnection::mysql(
            $connection->mysqldb_host,
            $connection->mysqldb_user,
            $connection->mysqldb_pass,
            $connection->mysqldb_name,
            $connection->mysqldb_port
        );

        $backups = $connection->backups()->paginate(10);

        foreach ($backups as $backup) {
            $backup->connection;
        }

        return Inertia::render('Protected/Backups', compact('backups', 'connection'));
    }

    public function delete_backup($backupId)
    {
        $backup = Backup::find($backupId);

        if(!$backup){
            return redirect()->route('connections')->with('flash', [
                'message' => 'Backup not exists',
                'success' => false
            ]);
        }

        $deleted = $backup;
        $backup->delete();

        return redirect()->route('connection.backups', ['id' => $deleted->connection->id])
            ->with('flash', [
                'message' => 'Backup ' . $deleted->storage_path . ' successfully deleted',
                'success' => true
            ]);
    }
}
