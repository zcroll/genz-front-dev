<?php

use App\Http\Controllers\Auth\WorkOSController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;
use WorkOS\WorkOS;

Route::get('/', fn () => Inertia::render('Welcome'));

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::get('card', function (){
    return Inertia::render('DemonSlayer');
})->name('career-orientation');

Route::get('animation-demo', function (){
    return Inertia::render('AnimationDemo');
})->name('animation-demo');

Route::get('card-flip-demo', function (){
    return Inertia::render('CardFlipDemo');
})->name('card-flip-demo');

Route::get('card-flip-advanced', function (){
    return Inertia::render('CardFlipAdvancedDemo');
})->name('card-flip-advanced');



Route::get('careers', function (){
    return Inertia::render('Careers/Index');
})->name('careers');

// Custom login route for debugging
Route::get('/custom-login', function (WorkOS $workos) {
    $clientId = config('services.workos.client_id');
    $redirectUrl = config('services.workos.redirect_url');

    // Generate the authorization URL manually
    $authorizationUrl = $workos->userManagement->getAuthorizationURL(
        $clientId,
        $redirectUrl,
        ['include_debug_info' => true]
    );

    // Log the URL for debugging
    \Log::info('WorkOS Authorization URL', ['url' => $authorizationUrl]);

    // Redirect to the authorization URL
    return redirect($authorizationUrl);
})->middleware(['guest'])->name('custom-login');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
