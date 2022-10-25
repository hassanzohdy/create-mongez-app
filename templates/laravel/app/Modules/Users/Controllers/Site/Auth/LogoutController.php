<?php

namespace App\Modules\Users\Controllers\Site\Auth;

use function user;
use Illuminate\Http\Request;
use HZ\Illuminate\Mongez\Http\ApiController;
use Illuminate\Support\Facades\Auth;

class LogoutController extends ApiController
{
    /**
     * Repository name
     *
     * @var string
     */
    public const REPOSITORY_NAME = 'users';

    /**
     * User logout.
     *
     * @return string
     */
    public function index(Request $request)
    {
        $user = user();

        $user->currentAccessToken()->delete();

        if ($request->has('device')) {
            $user->removeDeviceToken($request->input('device'));
        }

        return $this->success([
            $user->getAccountType() => null
        ]);
    }
}
