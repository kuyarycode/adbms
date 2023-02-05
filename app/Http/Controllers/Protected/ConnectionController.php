<?php

namespace App\Http\Controllers\Protected;

use App\Http\Controllers\Controller;
use App\Models\Connection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;
use App\Traits\TestConnection;

class ConnectionController extends Controller
{
    use TestConnection;

    public function index()
    {
        $connections = Connection::all();

        foreach ($connections as $connection) {
            $connection->backups;

            $connection->connected = TestConnection::mysql(
                $connection->mysqldb_host,
                $connection->mysqldb_user,
                $connection->mysqldb_pass,
                $connection->mysqldb_name,
                $connection->mysqldb_port
            );
        }

        return Inertia::render('Protected/Connections', compact('connections'));
    }

    public function create()
    {
        return Inertia::render('Protected/Connections/Add');
    }

    public function drop_connection($connectionId)
    {
        $connection = Connection::find($connectionId);
        $connection->backups;

        $connection->connected = TestConnection::mysql(
            $connection->mysqldb_host,
            $connection->mysqldb_user,
            $connection->mysqldb_pass,
            $connection->mysqldb_name,
            $connection->mysqldb_port
        );

        return Inertia::render('Protected/Connections/Drop', compact('connection'));
    }

    public function edit($connectionId)
    {
        $connection = Connection::find($connectionId);

        $connection->connected = TestConnection::mysql(
            $connection->mysqldb_host,
            $connection->mysqldb_user,
            $connection->mysqldb_pass,
            $connection->mysqldb_name,
            $connection->mysqldb_port
        );

        return Inertia::render('Protected/Connections/Edit', compact('connection'));
    }

    public function store(Request $request)
    {
        $input = $request->validate([
            'connection_name' => 'required|string',
            'slug' => 'required|string',
            'mysqldb_name' => 'required|string',
            'mysqldb_host' => 'required|string',
            'mysqldb_port' => 'required|string',
            'mysqldb_user' => 'required|string',
            'mysqldb_pass' => 'nullable',
            'frequency' => 'required|string',
            'enabled' => 'required',
            'notifiable' => 'required',
        ]);

        $connect = TestConnection::mysql(
            $request->get('mysqldb_host'),
            $request->get('mysqldb_user'),
            $request->get('mysqldb_pass'),
            $request->get('mysqldb_name'),
            $request->get('port'),
        );

        if ($request->has('prevalidate') && $request->get('prevalidate')) {
            return back()->with('flash', $connect);
        }

        $connection = new Connection();
        $connection->id = Uuid::uuid4();
        $connection->user_id = Auth::id();
        $connection->name = $input['connection_name'];
        $connection->slug = $input['slug'];
        $connection->mysqldb_host = $input['mysqldb_host'];
        $connection->mysqldb_port = $input['mysqldb_port'];
        $connection->mysqldb_user = $input['mysqldb_user'];
        $connection->mysqldb_pass = $input['mysqldb_pass'];
        $connection->mysqldb_name = $input['mysqldb_name'];
        $connection->frequency = $input['frequency'];
        $connection->enabled = $input['enabled'];
        $connection->notifiable = $input['notifiable'];
        $connection->save();

        return redirect()->route('connections')->with('flash', [
            'message' => 'New backup connection successfully added',
            'success' => true
        ]);
    }

    public function update(Request $request, $connectionId)
    {
        $input = $request->validate([
            'connection_name' => 'required|string',
            'slug' => 'required|string',
            'mysqldb_name' => 'required|string',
            'mysqldb_host' => 'required|string',
            'mysqldb_port' => 'required|string',
            'mysqldb_user' => 'required|string',
            'mysqldb_pass' => 'nullable',
            'frequency' => 'required|string',
            'enabled' => 'required',
            'notifiable' => 'required',
        ]);

        $connect = TestConnection::mysql(
            $request->get('mysqldb_host'),
            $request->get('mysqldb_user'),
            $request->get('mysqldb_pass'),
            $request->get('mysqldb_name'),
            $request->get('port'),
        );

        if ($request->has('prevalidate') && $request->get('prevalidate')) {
            return back()->with('flash', $connect);
        }

        $connection = Connection::find($connectionId);

        $connection->name = $input['connection_name'];
        $connection->slug = $input['slug'];
        $connection->mysqldb_host = $input['mysqldb_host'];
        $connection->mysqldb_port = $input['mysqldb_port'];
        $connection->mysqldb_user = $input['mysqldb_user'];
        $connection->mysqldb_pass = $input['mysqldb_pass'];
        $connection->mysqldb_name = $input['mysqldb_name'];
        $connection->frequency = $input['frequency'];
        $connection->enabled = $input['enabled'];
        $connection->notifiable = $input['notifiable'];
        $connection->save();

        return redirect()->route('connection.backups',['id' => $connection->id])
        ->with('flash', [
            'message' => 'Backup connection successfully updated',
            'success' => true
        ]);
    }

    public function delete_connection($connectionId)
    {
        $connection = Connection::find($connectionId);
        $deleted = $connection;
        $connection->delete();

        return redirect()->route('connections')
            ->with('flash', [
                'message' => 'Connection ' . $deleted->name . ' successfully deleted',
                'success' => true
            ]);
    }
}
