<?php

use App\Modules\Homes\Controllers\Site\HomesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Homes Site Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your main "front office" application.
| Please note that this file is auto imported in the main routes file, so it will inherit the main "prefix"
| and "namespace", so don't edit it to add for example "api" as a prefix. 
*/

Route::group([], function () {
    // Sub API routes DO NOT remove this line
    // list records
    Route::get('homes', [HomesController::class, 'index']);
});
