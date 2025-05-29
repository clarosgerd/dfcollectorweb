<?php

namespace App\Http\Controllers;

use App\Models\Forms;
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


    //public function index()
   // {
        // $forms = Forms::all();
        //$form = Forms::paginate();
        /*  if (auth()->check()) {
         $forms = auth()->user()->forms()->withCount('responses')->get();
        //}
        else {

        }*/
        //$user->forms()->withCount('responses')->get(); 
       // return response()->json(
         //   auth()->user()->forms()->withCount('responses')->get()
         //$forms = auth()->user()->forms()->withCount('responses')->get();

        //  $data =   $form->findOrFail();
        ///    dd($form);
       // $formCollection = new FormsCollection($form);
      //  dd($formCollection);
        //return Inertia::render('forms/Index', [
          //  'dataf' => $formCollection,
           // 'flash' => [
            //    'success' => session('success'),
            //    'error' => session('error'),
           // ]
       // ]);
   // }
public function index()
    {
        $forms = Auth()->user()
            ->forms()
            //->withCount('questions')
            ->latest()
            ->get();
        $formCollection = new FormsCollection($forms);
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
   public function edit(Form $form)
    {
        $this->authorize('update', $form);

        return Inertia::render('forms/Edit', [
            'form' => $form->load('questions')
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, Form $form)
    {
        $this->authorize('update', $form);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'array'
        ]);

        $form->update($validated);

        // Actualizar preguntas existentes y añadir nuevas
        if ($request->has('questions')) {
            $existingQuestionIds = [];
            
            foreach ($request->questions as $questionData) {
                if (isset($questionData['id'])) {
                    $form->questions()
                        ->where('id', $questionData['id'])
                        ->update($questionData);
                    $existingQuestionIds[] = $questionData['id'];
                } else {
                    $newQuestion = $form->questions()->create($questionData);
                    $existingQuestionIds[] = $newQuestion->id;
                }
            }
            
            // Eliminar preguntas que ya no están
            $form->questions()
                ->whereNotIn('id', $existingQuestionIds)
                ->delete();
        }

        return redirect()->route('forms.index')->with('success', 'Formulario actualizado correctamente');
    }
public function reorder(Request $request, Form $form)
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
