<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Uploads\Controllers\Site\UploadsController;

/*
|--------------------------------------------------------------------------
| Uploads Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your admin "back office/dashboard" application.
| Please note that this file is auto imported in the main routes file, so it will inherit the main "prefix"
| and "namespace", so don't edit it to add for example "admin" as a prefix.
|
| Also, all routes have `admin.` as route name prefix so it prevents the duplicate routes conflict.
|
| If route method is set to restfulApi() then api resource is patchable therefore a PATCH handler
| method is added automatically to RestfulApiController, the additional route will be Route::patch('/module', [ControllerClass::class, 'patch'])
*/

Route::group([
    'prefix' => 'uploads', 'middleware' => ['auth:admin'],
], function () {
    // Sub API routes DO NOT remove this line
    // Upload Files
    Route::post('/', [UploadsController::class, 'upload']);
    // Uploads List
    Route::get('/', [UploadsController::class, 'index']);
    // Delete Files
    Route::delete('/{hash}', [UploadsController::class, 'destroy']);
});
