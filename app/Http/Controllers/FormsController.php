<?php

namespace App\Http\Controllers;

use App\Models\Forms;
use App\Http\Requests\StoreFormsRequest;
use App\Http\Requests\UpdateFormsRequest;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;


class FormsController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index()
    {
        // $forms = Forms::all();
        $user = Auth::user();
        /*  if (auth()->check()) {
         $forms = auth()->user()->forms()->withCount('responses')->get();
        //}
        else {

        }*/
        //$user->forms()->withCount('responses')->get(); 
        /* return response()->json(
            auth()->user()->forms()->withCount('responses')->get()*/
            // $forms = auth()->user()->forms()->withCount('responses')->get();
        return response()->json([
            $user->forms()->withCount('responses')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormsRequest $request)
    {
        $user = Auth::user();
        $form =  $user->forms()->create($request->validated());

        return response()->json($form, 201);
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
    public function edit(Forms $forms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFormsRequest $request, Forms $forms)
    {
        //
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
