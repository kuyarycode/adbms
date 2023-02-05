<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Ramsey\Uuid\Uuid;

class RegisterController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $payload = $request->validate([
            'first_name' => ['required', 'min:3'],
            'last_name' => ['required', 'min:2'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'same:password']
        ]);

        $user = new User();
        $user->id = Uuid::uuid4();
        $user->email = $payload['email'];
        $user->last_name = $payload['last_name'];
        $user->first_name = $payload['first_name'];
        $user->password = Hash::make($payload['password']);

        if ($user->save()) {
            event(new Registered($user));
            return redirect()->route('login')->with('flash', [
                'message' => 'Your account successfully created.',
                'success' => true
            ]);
        }

        return back()->withErrors([
            'password_confirmation' => 'Unable to create your account.',
        ]);
    }
}
