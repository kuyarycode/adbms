<?php

namespace App\Http\Controllers;

// use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return redirect()->route('login');

        // return Inertia::render('Home');
    }
}
