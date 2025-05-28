<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\EnterpriseController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

     // Route::redirect('settings', 'settings/enterprise');
      
      Route::get('settings/enterprise', [EnterpriseController::class, 'show'])->name('enterprice.show');
      Route::patch('settings/enterprise', [EnterpriseController::class, 'edit'])->name('enterprice.update');


   // Route::redirect('settings', 'settings/users');
    Route::get('settings/Users/Index', [ProfileController::class, 'index'])->name('Users.index');
    Route::put('settings/Users/Index/{id}', [ProfileController::class, 'update'])->name('Users.update');
     Route::post('settings/Users/Index', [ProfileController::class, 'store'])->name('Users.store');
   // Route::resource('settings/users', ProfileController::class);
       
  //  Route::post('settings/store', [ProfileController::class, 'store'])->name('Users.store');
  //  Route::put('settings/update', [ProfileController::class, 'update'])->name('Users.update');

});
