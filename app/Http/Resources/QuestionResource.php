<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */
 public $preserveKeys = true;
    public function toArray( Request $request ): array {
       return [
            'id' => $this->id,
            'form_id' => $this->form_id,
            'question_text' => $this->question_text,
            'type' => $this->type,
            'required' => $this->required,
            'options' => QuestionOptionResource::collection( $this->whenLoaded( 'options' ) )
        ];
    }
}
