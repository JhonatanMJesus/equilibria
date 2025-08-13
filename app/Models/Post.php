<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'usuario_id',
        'title',
        'description',
        'video_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
