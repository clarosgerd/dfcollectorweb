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
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
class EnterpriseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = User::getRoleOptions();
       // dd($roles);
        return Inertia::render('settings/Users/Index', [
            'roles' => $roles,
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
    public function show(Request $request)
    {
        //
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
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request) //: Response
    {
    //dd($request);
        $enterprice = Enterprise::find($request->id);
        $enterprice->name = $request->name;
        $enterprice->update();
        // return to_route('enterprice.show');

          return Redirect::route('enterprice.show')->with('success', 'E created.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnterpriseRequest $request, Enterprise $enterprise)
    {
        //
        $enterprise->update($request->all());

        return Redirect::route('enterprice.update')->with('success', 'Contact created.');

       // return to_route('enterprice.update');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enterprise $enterprise)
    {
        //
    }
}
