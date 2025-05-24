<?php

namespace App\Http\Controllers\Settings;


use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEnterpriseRequest;
use App\Http\Requests\UpdateEnterpriseRequest;
use App\Models\Enterprise;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use App\Http\Resources\EnterpriseCollection;

class EnterpriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('settings/Users/Index', [
          //  'filters' => Request::all('search', 'role', 'trashed'),
            'users' => new EnterpriseCollection(
               Auth::user()
                    ->enterprise
                    ->users()
                    ->with('enterprise')
                    ->paginate()
            ),
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
    public function store(StoreEnterpriseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Enterprise $enterprise)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): Response
    {
      
        return Inertia::render('settings/enterprise', [
            'user' => new EnterpriseCollection(
                Auth::user()
                    ->enterprise
                    ->users()
                    ->with('enterprise')
                    ->paginate()
            ),
            'status' => $request->session()->get('status'),

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnterpriseRequest $request, Enterprise $enterprise)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enterprise $enterprise)
    {
        //
    }
}
