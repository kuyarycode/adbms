<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function request()
    {
        return Inertia::render('Auth/Password/Forget');
    }

    public function email(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with('flash', [
                'message' => 'Password reset link sent',
                'success' => true
            ]) : back()->with('flash', [
                'message' => 'Unable to send link on your email',
                'success' => false
            ]);
    }

    public function reset($token)
    {
        $email = request()->get('email');
        return Inertia::render('Auth/Password/Reset', compact('token', 'email'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'same:password']
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('flash', [
                'message' => 'Your password has been changed',
                'success' => true
            ])
            : back()->with('flash', [
                'message' => 'Unable to update your password',
                'success' => false
            ]);
    }
}
