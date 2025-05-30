<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Form extends Model {
    /** @use HasFactory<\Database\Factories\FormsFactory> */
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'title',
        'description',
        'user_id' ];

        public function user() {
            return $this->belongsTo( User::class );
        }

        public function questions() {
            return $this->hasMany( Question::class )->orderBy( 'order' );
        }

        public function responses() {
            return $this->hasMany( Responses::class );
        }
    }
