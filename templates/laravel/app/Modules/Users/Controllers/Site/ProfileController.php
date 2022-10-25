<?php

namespace App\Modules\Users\Controllers\Site;

use HZ\Illuminate\Mongez\Http\ApiController;
use Illuminate\Http\Request;

class ProfileController extends ApiController
{
    /**
     * Repository name
     *
     * @var string
     */
    public const REPOSITORY_NAME = 'users';

    /**
     * Get profile info.
     *
     * @return string
     */
    public function index()
    {
        return $this->success([
            'record' => $this->repository->wrap(user()),
        ]);
    }

    /**
     * Update user profile data.
     *
     * @param Request $request
     * @return string
     */
    public function update(Request $request)
    {
        $user = $this->repository->update(user(), $request->all());

        return $this->success([
            'record' => $this->repository->wrap($user),
        ]);
    }
}
