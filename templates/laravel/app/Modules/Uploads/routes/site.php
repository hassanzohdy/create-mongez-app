<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Uploads\Controllers\Site\UploadsController;

/*
|--------------------------------------------------------------------------
| Uploads Site Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your main "front office" application.
| Please note that this file is auto imported in the main routes file, so it will inherit the main "prefix"
| and "namespace", so don't edit it to add for example "api" as a prefix.
*/

Route::group([
    'prefix' => 'uploads', 'middleware' => ['auth:user,guest'],
], function () {
    // Sub API routes DO NOT remove this line
    // Upload Files
    Route::post('/', [UploadsController::class, 'upload']);
    // Delete Files
    Route::delete('/{hash}', [UploadsController::class, 'destroy']);
});
