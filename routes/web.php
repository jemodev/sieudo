<?php

declare(strict_types=1);

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\RecoverPasswordController;
use App\Http\Controllers\Auth\ValidateRegistrationController;
use App\Http\Controllers\Auth\VerifyAnswersController;
use App\Http\Controllers\Auth\VerifyDniController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::middleware('guest')->group(function () {
    Route::post('/register/verify-dni', VerifyDniController::class)->name('register.verify-dni');
    Route::post('/register/validate', ValidateRegistrationController::class)->name('register.validate');

    Route::post('/forgot-password/verify-dni', RecoverPasswordController::class)->name('password.verify-dni');
    Route::post('/forgot-password/verify-answers', VerifyAnswersController::class)->name('password.verify-answers');
});

Route::inertia('/', 'auth/login', [
    'canRegister' => Features::enabled(Features::registration()),
    'canResetPassword' => Features::resetPasswords(),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('applications/without-support/{speciality}', [ApplicationController::class, 'create'])
        ->name('applications.without-support.create');

    Route::post('applications/without-support/{speciality}', [ApplicationController::class, 'store'])
        ->name('applications.without-support.store');

    Route::get('applications/with-support/{speciality}', [ApplicationController::class, 'createWithSupport'])
        ->name('applications.with-support.create');

    Route::post('applications/with-support/{speciality}', [ApplicationController::class, 'storeWithSupport'])
        ->name('applications.with-support.store');
});

require __DIR__.'/settings.php';
