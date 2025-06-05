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

    public function store( StoreQuestionRequest $request, Form $form): RedirectResponse
    {
       $question = $form->questions()->create($request->validated());
        $question->syncOptions($request->input('options', []));
        return redirect()->back()->with('success', 'Pregunta guardada');
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


    public function update(UpdateQuestionRequest $request, Question $question): RedirectResponse
{
    $question->update($request->validated());
        $question->syncOptions($request->input('options', []));
        return redirect()->back()->with('success', 'Pregunta actualizada');
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
