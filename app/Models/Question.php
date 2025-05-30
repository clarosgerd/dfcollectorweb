<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Form;

class Question extends Model {
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'form_id',
        'type',
        'question_text',
        'required',
        'options',
        'validation',
        'order'
    ];
    protected $casts = [
        'required' => 'boolean',
    ];

    public function form() {
        return $this->belongsTo( Form::class, 'form_id' );
        // Especifica 'form_id'
    }

    public function options() {
        return $this->hasMany( QuestionOption::class )->orderBy( 'order' );
    }

    
}