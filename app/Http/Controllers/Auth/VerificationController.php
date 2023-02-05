<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerificationController extends Controller
{
    public function notice()
    {
        if (Auth::user()->email_verified_at !== null) {
            return redirect()->route('connections');
        }

        return Inertia::render('Auth/Email/Verify');
    }

    public function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->route('connections');
    }

    public function send(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();

        return back()->with('flash', [
            'message' => 'Verification link sent',
            'success' => true,
        ]);
    }
}
