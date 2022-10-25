<?php

namespace App\Modules\Uploads\Services;

use App\Modules\Uploads\Repositories\UploadsRepository;
use HZ\Illuminate\Mongez\Repository\Concerns\RepositoryTrait;

class UploadsService
{
    use RepositoryTrait;

    /**
     * Main Repository
     *
     * @var UploadsRepository
     */
    protected ?UploadsRepository $repository;

    /**
     * Constructor
     *
     * @param UploadsRepository $repository
     */
    public function __construct(UploadsRepository $repository)
    {
        $this->repository = $repository;
    }
}
