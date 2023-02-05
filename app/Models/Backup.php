<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Backup extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fields = ['connection_id', 'storage_path', 'status', 'message'];

    protected $casts = [
        'id' => 'string',
    ];

    public function connection()
    {
        return $this->belongsTo(Connection::class, 'connection_id', 'id');
    }
}
