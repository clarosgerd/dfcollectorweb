<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Laravel\Sanctum\HasApiTokens;

class UserController extends Controller
{
    public function login(Request $request)
    {
        //
        $request->validate([
            'email'  => 'required|max:255',
            'password' => 'required|max:255'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'message' => ['The provider credentils are incorrect']
            ]);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        return response([
            'message' => 'Login Sucessfully',
            'token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }
    public function logout(Request $request)
    {
        //
        $request->user()->tokens()->delete();
        return response([
            'message' => 'user logged out succesfully'
        ], 201);
    }
}
