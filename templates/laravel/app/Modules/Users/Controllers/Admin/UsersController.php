<?php

namespace App\Modules\Users\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\MessageBag;
use Illuminate\Support\Facades\Validator;
use HZ\Illuminate\Mongez\Http\RestfulApiController;
use Illuminate\Support\Facades\Artisan;

class UsersController extends RestfulApiController
{
    /**
     * Controller info
     *
     * @var array
     */
    protected $controllerInfo = [
        'repository' => 'users',
        'listOptions' => [
            'select' => [],
            'paginate' => null, // inherit by default
        ],
        'rules' => [
            'all' => [
                'name' => 'required',
            ],
            'update' => [],
            'patch' => [],
        ],
    ];

    /**
     * Set patient relatives
     * 
     * @param  int $id
     * @param  Request $request
     * @return Response
     */
    public function setPatientRelatives(int $id, Request $request)
    {
        $patient = $this->repository->getModel($id);

        if (!$patient) {
            return $this->notFound();
        }

        $this->repository->setPatientRelatives($patient, $request);

        return $this->success([
            'record' => $this->repository->wrap($patient),
        ]);
    }

    /**
     * validate email && phone to be unique in update with ignore current users.
     *
     * @param $model
     * @param Request $request
     * @return array|MessageBag
     */
    public function beforeUpdating($model, Request $request)
    {
        $validator = Validator::make($request->all(), []);

        if ($request->input('phoneNumber')) {
            if ($this->repository->first([
                'phoneNumber' => $request->input('phoneNumber'),
                'except' => $model->id,
            ])) {
                $validator->errors()->add('phoneNumber', trans('validation.unique', ['attribute' => 'phoneNumber']));
            }
        }

        if ($request->input('email')) {
            if ($this->repository->first([
                'email' => $request->input('email'),
                'except' => $model->id,
            ])) {
                $validator->errors()->add('email', trans('validation.unique', ['attribute' => 'email']));
            }
        }

        return $validator->fails() ? $validator->errors() : [];
    }

    /**
     * {@inheritDoc}
     */
    protected function allValidation($request, $id = null): array
    {
        if ($id) {
            return [
                'name' => 'required',
            ];
        }

        if ($request->input('email')) {
            $uniqueEmail = Rule::unique('users', 'email');
        }

        if ($request->input('phoneNumber')) {
            $uniquePhoneNumber = Rule::unique('users', 'phoneNumber');
        }

        return [
            'name' => 'required',
            'email' => $uniqueEmail ?? ['nullable', 'email'],
            'phoneNumber' => $uniquePhoneNumber ?? 'nullable',
        ];
    }
}
