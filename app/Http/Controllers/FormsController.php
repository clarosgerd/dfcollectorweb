<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\User;
use App\Http\Requests\StoreFormsRequest;
use App\Http\Requests\UpdateFormsRequest;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Resources\FormsCollection;

class FormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
/*
public function index(Form $form)
    {
       // dd($form);
        $form->loadMissing(['questions' => fn($query) => $query->where('form_id', $form->id)->orderBy('order')]);
//dd($form);
        return Inertia::render('forms/FormBuilder', [
            'form' => [
                'id' => $form->id,
                'title' => $form->title,
            ],
            'questions' => $form->questions->map(fn ($q) => [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'type' => $q->type,
                'required' => $q->required,
            ]),
        ]);
    }
*/
    
public function index()
    {
        $forms = Auth()->user()
            ->forms()
            //->withCount('questions')
            ->latest()
            ->get();
        $formCollection = new FormsCollection($forms);
        // dd($forms);
        return Inertia::render('forms/Index', [
            'forms' => $formCollection,
             'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    public function getByTest()
    {

        $form = Forms::paginate();
        $formCollection = new FormsCollection($form);
        return Inertia::render('test/Index', [
            'dataf' => $formCollection,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
     public function create()
    {
        return Inertia::render('forms/Create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'array'
        ]);

        $form = auth()->user()->forms()->create($validated);

        if ($request->has('questions')) {
            $form->questions()->createMany($request->questions);
        }

        return redirect()->route('forms.index')->with('success', 'Formulario creado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Forms $form)
    {
        //
        $form->load('questions');
        return response()->json($form);
    }

    /**
     * Show the form for editing the specified resource.
     */
    /*
   public function edit(Form $form)
    {
        $this->authorize('update', $form);

        return Inertia::render('forms/Edit', [
            'form' => $form->load('questions')
        ]);
    }*/

 public function edit(Form $form)
    {
       // dd($form);
        $form->load(['questions' => fn ($query) => $query->orderBy('order')]);

        return Inertia::render('forms/FormBuilder', [
            'form' => [
                'id' => $form->id,
                'title' => $form->title,
            ],
            'questions' => $form->questions->map(fn ($q) => [
                'id' => $q->id,
                'question_text' => $q->question_text,
                'type' => $q->type,
                'required' => $q->required,
            ]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Forms $form)
    {
 $this->authorize('update', $form);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*.id' => 'sometimes|exists:questions,id',
            'questions.*.question_text' => 'required|string|max:500',
            'questions.*.type' => 'required|in:text,textarea,radio,checkbox,select,range,date,time,datetime',
            'questions.*.required' => 'boolean',
            'questions.*.options' => 'nullable|array',
        ]);

        $form->update($validated);

        return back()->with('success', 'Formulario actualizado');
    }
public function reorder(Request $request, Forms $form)
    {
        $this->authorize('update', $form);

        $request->validate([
            'questions' => 'required|array',
            'questions.*' => 'exists:questions,id,form_id,'.$form->id
        ]);

        Question::updateOrder($request->questions);

        return response()->json(['message' => 'Orden actualizado correctamente']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $forms = Forms::find($id);

        $forms->delete();

        //$this->authorize('delete', $forms);
        //$forms->delete();

        //return response()->noContent();
        return response()->json([
            'message' => 'Forms deleted successfully'
        ]);
    }
}
