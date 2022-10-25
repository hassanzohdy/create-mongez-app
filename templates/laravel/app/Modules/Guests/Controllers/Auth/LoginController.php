<?php

namespace App\Modules\Guests\Controllers\Auth;

use App\Modules\General\Services\Application;
use Illuminate\Http\Request;
use HZ\Illuminate\Mongez\Http\ApiController;

class LoginController extends ApiController
{
    /**
     * Repository name
     *
     * @var string
     */
    public const REPOSITORY_NAME = 'guests';

    /**
     * Login guest into system.
     *
     * @param Request $request
     * @return string
     */
    public function login(Request $request)
    {
        $guest = $this->repository->firstOrCreate($request);

        if ($request->has('device')) {
            $guest->addNewDeviceToken([
                'token' => $request->input('device'),
                'type' => Application::getApplicationType()
            ]);
        }

        return $this->success($guest);
    }
}
