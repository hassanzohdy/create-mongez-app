<?php

use App\Modules\Users\Controllers\Site\Auth\ForgetPasswordController;
use App\Modules\Users\Controllers\Site\Auth\LoginController;
use App\Modules\Users\Controllers\Site\Auth\LogoutController;
use App\Modules\Users\Controllers\Site\Auth\ResetPasswordController;
use App\Modules\Users\Controllers\Site\Auth\VerifyResetPasswordCodeController;
use App\Modules\Users\Controllers\Site\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Modules\Users\Controllers\Site\UsersController;

/*
|--------------------------------------------------------------------------
| Users Site Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your main "front office" application.
| Please note that this file is auto imported in the main routes file, so it will inherit the main "prefix"
| and "namespace", so don't edit it to add for example "api" as a prefix.
*/

Route::group([
    'middleware' => ['auth:user'],
], function () {
    // Sub API routes DO NOT remove this line
    Route::get('/me', [ProfileController::class, 'index']);
    Route::put('/me', [ProfileController::class, 'update']);
    Route::post('/logout', [LogoutController::class, 'index']);
});

Route::group([
    'middleware' => ['auth:guest'],
], function () {
    // db seed default admin
    Route::post('/seed-user', [UsersController::class, 'seedDefaultAdmin']);
    // user login
    Route::post('/login', [LoginController::class, 'login']);
    // user forget password
    Route::post('/forget-password', [ForgetPasswordController::class, 'forgetPassword']);
    // user verify account
    Route::post('/verify-code', [VerifyResetPasswordCodeController::class, 'verifyCode']);
    // user reset password
    Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);
});
