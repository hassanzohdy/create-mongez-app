<?php

namespace App\Modules\Homes\Controllers\Site;

use Illuminate\Http\Request;
use HZ\Illuminate\Mongez\Http\ApiController;

class HomeController extends ApiController
{
    /**
     * {@inheritDoc}
     */
    public function index(Request $request)
    {
        $options = [];

        $response = [
            'records' => $this->repository->listPublished($options),
        ];

        if ($this->repository->getPaginateInfo()) {
            $response['paginationInfo'] = $this->repository->getPaginateInfo();
        }

        return $this->success($response);
    }

    /**
     * {@inheritDoc}
     */
    public function show($id, Request $request)
    {
        $record = $this->repository->getPublished($id);

        if (!$record) {
            return $this->notFound('notFoundRecord');
        }

        return $this->success([
            'record' => $record,
        ]);
    }
}
