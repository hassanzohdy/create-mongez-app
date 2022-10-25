<?php

namespace App\Modules\Users\Controllers\Site\Auth;

use function trans;

use App\Modules\General\Services\Application;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Validator;
use HZ\Illuminate\Mongez\Http\ApiController;

class LoginController extends ApiController
{
    /**
     * Repository name
     *
     * @var string
     */
    public const REPOSITORY_NAME = 'users';

    /**
     * Admin login.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response|string
     */
    public function login(Request $request)
    {
        // make the validation
        $validator = $this->scan($request);

        if ($validator->fails()) {
            return $this->badRequest($validator->errors());
        }

        $user = $this->repository->findForLogin($request->only(['email', 'phoneNumber', 'password', 'accountType']));

        if (!$user) {
            return $this->badRequest((new MessageBag())->add('phoneNumber', trans('auth.failed')));
        }

        if ($request->has('device')) {
            $user->addNewDeviceToken([
                'token' => $request->input('device'),
                'type' => Application::getApplicationType()
            ]);
        }

        return $this->success([
            'authorization' => $user->generateToken(),
            'record' => $this->repository->wrap($user),
        ]);
    }

    /**
     * Determine whether the passed values are valid
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function scan(Request $request)
    {
        $validationRules = [
            'password' => 'required|min:8',
        ];

        if (Application::isNot(Application::ADMIN_APP)) {
            // $validationRules['accountType'] = 'required|in:patient,relative,therapist';
            $validationRules['phoneNumber'] = 'required';
        } else {
            $validationRules['email'] = 'required';
        }

        return Validator::make($request->all(), $validationRules);
    }
}
