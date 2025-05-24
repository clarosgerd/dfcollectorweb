<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormsController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');

        
    })->name('dashboard');

Route::get('form', [FormsController::class, 'index'])->name('form');
//Route::get('/test', [FormsController::class, 'getByTest']);

    
//--Route::get('form', 'App\Http\Controllers\FormsController@index');

});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
