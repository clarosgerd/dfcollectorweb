<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enterprise extends Model
{
    /** @use HasFactory<\Database\Factories\EnterpriseFactory> */
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'created_by'
    ];
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
