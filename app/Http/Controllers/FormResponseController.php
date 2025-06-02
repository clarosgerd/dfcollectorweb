<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormResponseController extends Controller
{
    public function show(Form $form)
    {
        $form->load('questions.options');

        return Inertia::render('Forms/FormPreview', [
            'form' => $form,
        ]);
    }
}
