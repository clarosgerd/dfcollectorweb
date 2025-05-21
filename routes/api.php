<?php
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->post('/login',[UserController::class,'login']);



Route::middleware('auth:sanctum')->post('/logout',[UserController::class,'logout']);

http://127.0.0.1:8000/v1/for/1

//Route::get('/for/{id}',[UserController::class,'index']);

