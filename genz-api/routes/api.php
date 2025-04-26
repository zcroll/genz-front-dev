<?php

use App\Http\Controllers\Api\V1\CareerController;
use App\Http\Controllers\Api\V1\DegreeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// V1 API Routes
Route::prefix('v1')->name('api.v1.')->group(function () {
    // Career routes
    Route::prefix('careers')->name('careers.')->group(function () {
        Route::get('/', [CareerController::class, 'index'])->name('index');
        Route::get('/filter-options', [CareerController::class, 'filterOptions'])->name('filter-options');
    });
    
    // Degree routes
    Route::prefix('degrees')->name('degrees.')->group(function () {
        Route::get('/', [DegreeController::class, 'index'])->name('index');
        Route::get('/filter-options', [DegreeController::class, 'filterOptions'])->name('filter-options');
    });
}); 