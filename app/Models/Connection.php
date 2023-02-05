<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Connection extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fields = [
        'user_id',
        'name',
        'slug',
        'mysqldb_host',
        'mysqldb_port',
        'mysqldb_user',
        'mysqldb_pass',
        'mysqldb_name',
        'frequency',
        'enabled',
        'notifiable',
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function backups()
    {
        return $this->hasMany(Backup::class, 'connection_id', 'id')->latest();
    }
}
