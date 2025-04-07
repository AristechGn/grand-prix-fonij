<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }

    

    public function init(): RedirectResponse
    {
        $count_user = User::count();
        if($count_user > 0)
        {
            return redirect(route('home'))->with('error','You can not do this action');
        }
        $super_user = $this->create_super_user();

        
        event(new Registered($super_user));

        Auth::login($super_user);

        return to_route('dashboard');
    }

    /**
     * Create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    
    private function create_super_user($first_name="Aristide", $last_name="GNIMASSOU", $email="aristechdev@gmail.com", $telephone="620407236", String $password="P@ssword2024", $status=1)
    {
        $data = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'phone' => $telephone,
            'password' => Hash::make($password),
            'status' => 1,
            'role' => "super_admin",
        ];
            
        return DB::transaction(function () use ($data) {
            $user = User::create($data);
            return $user;
        });
    }
}
