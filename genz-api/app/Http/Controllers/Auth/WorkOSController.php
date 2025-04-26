<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use WorkOS\WorkOS;

class WorkOSController extends Controller
{
    protected $workos;

    public function __construct(WorkOS $workos)
    {
        $this->workos = $workos;
    }

    /**
     * Redirect to WorkOS login page
     */
    public function redirectToWorkOS()
    {
        $redirectUrl = config('services.workos.redirect_url');
        $clientId = config('services.workos.client_id');

        $authorizationUrl = $this->workos->sso->getAuthorizationURL(
            null,
            $redirectUrl,
            ['client_id' => $clientId]
        );

        return redirect($authorizationUrl);
    }

    /**
     * Handle WorkOS callback
     */
    public function handleWorkOSCallback(Request $request)
    {
        // Get the authorization code from the request
        $code = $request->code;

        if (!$code) {
            return redirect()->route('login')->withErrors(['error' => 'Authorization code not found']);
        }

        try {
            // Exchange the code for a profile and connection
            $profile = $this->workos->sso->getProfileAndToken($code);
            $profileData = $profile->profile;

            // Find or create the user
            $user = User::firstOrCreate(
                ['workos_id' => $profileData->id],
                [
                    'name' => $profileData->first_name . ' ' . $profileData->last_name,
                    'email' => $profileData->email,
                    'password' => Hash::make(Str::random(24)),
                    'avatar' => $profileData->raw['picture'] ?? null,
                ]
            );

            // Log the user in
            Auth::login($user);

            return redirect()->intended('/dashboard');
        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors(['error' => 'Authentication failed: ' . $e->getMessage()]);
        }
    }

    /**
     * Register a new user with WorkOS
     */
    public function register(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Log the user in
        Auth::login($user);

        return redirect('/dashboard');
    }
}
