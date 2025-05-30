<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Form;
use App\Http\Requests\StoreQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use Illuminate\Http\Request;
use DB;


class QuestionController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        //
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request, $formId) {
       // $request = json_encode( $request );
       // dd( $request );
      /*  $validated = $request->validate( [
            'question_text' => 'required|string|max:255',
            'type' => 'required|in:text,radio,checkbox',
            'required' => 'boolean',
        ] );*/

        $question = Question::create( [
            'form_id' => $formId,
            'question_text' => $request[ 'question_text' ],
            'type' => $request[ 'type' ],
            'required' => $request[ 'required' ] ?? false,
            'order' => Question::where( 'form_id', $formId )->max( 'order' ) + 1,
        ] );

        return redirect()->back()->with( 'question', $question );
    }

    public function reorder( Request $request, Form $form ) {
    $validated = $request->validate([
            'ordered_ids' => 'required|array',
            'ordered_ids.*' => 'integer|exists:questions,id',
        ]);

        DB::transaction(function () use ($validated) {
            foreach ($validated['ordered_ids'] as $index => $id) {
                Question::where('id', $id)->update(['order' => $index]);
            }
        });

        return back()->with('success', 'Orden actualizado.');   
    }
    /**
    * Display the specified resource.
    */

    public function show( Question $question ) {
        //
    }

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( Question $question ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */
/*
    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'question_text' => 'required|string|max:255',
            'type' => 'required|string|in:text,radio,checkbox',
            'required' => 'boolean',
        ]);

        $question->update($validated);

        return back()->with('success', 'Pregunta actualizada.');
    }*/


    public function update(Request $request, Question $question)
{
    $data = $request->validate([
        'question_text' => 'required|string|max:255',
        'type' => 'required|string|in:text,textarea,number,date,email,dropdown,radio,checkbox',
        'required' => 'boolean',
        'options' => 'nullable|array',
        'options.*' => 'string|max:255',
    ]);

    $question->update([
        'question_text' => $data['question_text'],
        'type' => $data['type'],
        'required' => $data['required'],
    ]);

    // Actualizar opciones si es un tipo que las requiere
    if (in_array($data['type'], ['radio', 'checkbox', 'dropdown'])) {
        $question->options()->delete(); // eliminar opciones previas

        foreach ($data['options'] ?? [] as $index => $optionText) {
            $question->options()->create([
                'option_text' => $optionText,
                'order' => $index,
            ]);
        }
    } else {
        // Si ya no requiere opciones, eliminarlas
        $question->options()->delete();
    }

    return response()->json($question->load('options'));
}

    /**
    * Remove the specified resource from storage.
    */

    public function destroy(Question $question)
    {
        $question->delete();

        return back()->with('success', 'Pregunta eliminada.');
    }
}
