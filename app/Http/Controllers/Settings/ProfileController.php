<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\UserCollection;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */

    public function index(): Response
    {
        $roles = User::getRoleOptions();
        $enterprise = Auth::user()->enterprise_id;
        //  dd($roles);
        return Inertia::render('settings/Users/Index', [
            //  'filters' => Request::all('search', 'role', 'trashed'),
            'organization' => $enterprise,
            'roles' => $roles,
            'users' => new UserCollection(
                Auth::user()
                    ->enterprise
                    ->users()
                    ->with('enterprise')
                    ->paginate()
            ),
            // 'create_url' => route('Users.update'),
        ]);
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }
    public function create()
    {
        //
    }
    /**
     * Update the user's profile settings.
     */
    public function update(Request $request, User $user): RedirectResponse
    {

        //dd($request);
        //$request->user()->fill($request->validated());


        $roles = User::getRoleOptions();
        $validated = $request->validate([
            'name' => 'required|string',
         //   'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            // 'password' => ['required'],
            'role' => ['required', Rule::in($roles)],
            'photo' => 'required|string',
            'enterprise_id' => 'required',
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

 
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        //  $user->password = Hash::make('password');
        $user->role = $request->role;
        $user->photo = $request->photo;
        // $user->enterprise_id = $request->input('enterprise_id');
        $user->save();



        return to_route('Users.index');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /*
    public function store(Request $request)
    {
        $roles = User::getRoleOptions();
        
        //dd($request);
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required'],
            'role' => ['required', Rule::in($roles)],
            'photo' => 'required|string',
            'enterprise_id' => 'required',
        ]);
       // dd($validated);
        User::create([
           // $validated,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' =>$request->role,
            'photo' => $request->photo,
            'enterprise_id' => $request->enterprise_id,
        ]);

        return redirect()->route('Users.index');
    }*/

    public function store(Request $request)

    {
        $roles = User::getRoleOptions();
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            // 'password' => ['required'],
            'role' => ['required', Rule::in($roles)],
            'photo' => 'required|string',
            'enterprise_id' => 'required',
        ]);
        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = Hash::make('password');
        $user->role = $request->input('role');
        $user->photo = $request->input('photo');
        $user->enterprise_id = $request->input('enterprise_id');
        $user->save();

        if ($request->hasFile('photo')) {
            $user->update([
                'photo' => $request->file('photo')->store('users'),
            ]);
        }
        return redirect()->route('Users.index');
    }
}
