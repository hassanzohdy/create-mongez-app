<?php

namespace App\Modules\Uploads\Filters;

use HZ\Illuminate\Mongez\Database\Filters\MongoDBFilter;

class UploadsFilter extends MongoDBFilter
{
    /**
     * List with all filter.
     *
     * filterName => functionName
     * @const array
     */
    const FILTER_MAP = [];
}
