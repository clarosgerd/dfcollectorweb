<?php
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->post('/login',[UserController::class,'login']);



Route::middleware('auth:sanctum')->post('/logout',[UserController::class,'logout']);


