<?php

namespace App\Modules\Uploads\Database\Seeders;

use HZ\Illuminate\Mongez\Database\Seeders\SeederManager;

class UploadSeeder extends SeederManager
{
    /**
     * Repository name
     *
     * @var string
     */
    protected const REPOSITORY_NAME = 'uploads';

    /**
     * name of seeds you need to generated with DOCUMENT_DATA from repository
     * [columnName => demoSeeder::class]
     * column Name must be the same name in the DOCUMENT_DATA
     *
     * @var array
     */
    protected const DOCUMENT_SEEDER = [];

    /**
     * name of seeds you need to generated with MULTI_DOCUMENT_DATA from repository
     * [columnName => demoSeeder::class]
     * column Name must be the same name in the MULTI_DOCUMENT_DATA
     *
     * @var array
     */
    protected const MULTI_DOCUMENT_SEEDER = [];

    /**
     * localization keys
     *
     * @var array
     */
    protected const LOCALIZED_DATA = [];

    /**
     * {@inheritDoc}
     */
    public function setData()
    {
    }
}
