<?php

namespace App\Modules\Uploads\Controllers\Site;

use Illuminate\Http\Request;
use HZ\Illuminate\Mongez\Http\ApiController;
use App\Modules\Uploads\Services\UploadsService;

class UploadsController extends ApiController
{
    /**
     * Repository name
     *
     * @var string
     */
    public const REPOSITORY_NAME = 'uploads';

    /**
     * Service Class
     *
     * @const string
     */
    public const SERVICE_CLASS = UploadsService::class;

    /**
     * {@inheritDoc}
     */
    public function index(Request $request)
    {
        $options = $request->all();

        $response = [
            'records' => $this->repository->list($options),
        ];

        if ($this->repository->getPaginateInfo()) {
            $response['paginationInfo'] = $this->repository->getPaginateInfo();
        }

        return $this->success($response);
    }

    /**
     * {@inheritDoc}
     */
    public function upload(Request $request)
    {
        $uploads = [];

        foreach ((array) $request->uploads as $file) {
            if (is_array($file)) {
                // it should contain
                // file: which contains the base64 encoded file
                // fileName: which contains the file name
                // extension: which contains the file extension
                // mimeType: which contains the file mime type
                $uploads[] = $this->repository->createFromBase64($file);
            } else {
                $uploads[] = $this->repository->createFile([
                    'file' => $file,
                    'private' => $request->private,
                ]);
            }
        }

        return $this->success([
            'uploads' => $this->repository->wrapMany($uploads),
        ]);
    }

    /**
     * {@inheritDoc}
     */
    public function destroy(string $hash)
    {
        $this->repository->deleteFileByHash($hash);

        return $this->success();
    }
}
