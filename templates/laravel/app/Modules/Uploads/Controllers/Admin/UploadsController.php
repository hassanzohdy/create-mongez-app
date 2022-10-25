<?php

namespace App\Modules\Uploads\Controllers\Admin;

use HZ\Illuminate\Mongez\Http\RestfulApiController;

class UploadsController extends RestfulApiController
{
    /**
     * Controller info
     *
     * @var array
     */
    protected $controllerInfo = [
        'repository' => 'uploads',
        'request' => [
            'store' => '',
            'update' => '',
            'patch' => '',
        ],
        'listOptions' => [
            'select' => [],
            'paginate' => null, // inherit by default
        ],
        'rules' => [
            'all' => [],
            'store' => [],
            'update' => [],
            'patch' => [],
        ],
    ];
}
