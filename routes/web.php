<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\QuestionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');

        
    })->name('dashboard');

//Route::get('form', [FormsController::class, 'index'])->name('forms.index');
//Route::get('/test', [FormsController::class, 'getByTest']);

    
//--Route::get('form', 'App\Http\Controllers\FormsController@index');
 Route::resource('/forms', FormsController::class);

Route::post('/forms/{form}/questions', [QuestionController::class, 'store']);
Route::post('/forms/{form}/questions/reorder', [QuestionController::class, 'reorder']);


Route::get('/forms/{form}/edit', [FormsController::class, 'edit'])->name('forms.edit');


Route::put('/questions/{question}', [QuestionController::class, 'update'])->name('questions.update');
Route::delete('/questions/{question}', [QuestionController::class, 'destroy'])->name('questions.destroy');
Route::post('/forms/{form}/questions/reorder', [QuestionController::class, 'reorder'])->name('questions.reorder');

//Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');



});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
