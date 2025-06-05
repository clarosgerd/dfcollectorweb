<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
      $rules = [
            'form_id' => 'required|exists:forms,id',
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:text,textarea,radio,checkbox,dropdown,number,date,email',
            'required' => 'boolean',
        ];

        if (in_array($this->type, ['radio', 'checkbox', 'dropdown'])) {
            $rules['options'] = 'required|array|min:2';
            $rules['options.*'] = 'required|string|max:255';
        }

        return $rules;
    }
}
