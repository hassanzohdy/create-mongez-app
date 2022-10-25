<?php

namespace App\Modules\Users\Repositories;

use App\Modules\Uploads\Traits\Attachable;
use App\Modules\Users\Models\User;
use App\Modules\Users\Models\UsersGroup;
use App\Modules\Users\Filters\UsersFilter;
use App\Modules\Users\Resources\UserResource;
use HZ\Illuminate\Mongez\Repository\RepositoryInterface;
use HZ\Illuminate\Mongez\Repository\MongoDBRepositoryManager;

class UsersRepository extends MongoDBRepositoryManager implements RepositoryInterface
{
    use Attachable;

    /**
     * {@inheritDoc}
     */
    const NAME = 'users';

    /**
     * {@inheritDoc}
     */
    const MODEL = User::class;

    /**
     * {@inheritDoc}
     */
    const RESOURCE = UserResource::class;

    /**
     * {@inheritDoc}
     */
    const DATA = [];

    /**
     * Set columns list of string values.
     *
     * @const array
     */
    const STRING_DATA = [
        'name', 'email',
        'phoneNumber',
        'password',
    ];

    /**
     * {@inheritDoc}
     */
    const ATTACHMENTS_DATA = [
        'image'
    ];

    /**
     * Set columns of booleans data type.
     *
     * @const array
     */
    const BOOLEAN_DATA = [];

    /**
     * Localized data
     *
     * @const array
     */
    const LOCALIZED_DATA = [];

    /**
     * Auto save uploads in this list
     *
     * If it's an indexed array, in that case the request key will be as database column name
     * If it's associated array, the key will be request key and the value will be the database column name
     *
     * It can be passed as well as an array of options, current options schema:
     * [
     *    'key' => 'string', // the key that will be read from the request files, if not present, it will be same as $column key
     *    'column' => 'string', // if not present, it will be same as $key key
     *    'clearable' => 'bool', // if set to true, the column value will be set to empty if there is no file to be uploaded
     *    'arrayable' => 'bool', // if set to true, it will be stored as an array, if set to null it auto determined
     * ]
     *
     * @const array
     */
    const UPLOADS = [];

    /**
     * Set columns list of integers values.
     *
     * @cont array
     */
    const INTEGER_DATA = [];

    /**
     * Geo Location data
     *
     * @const array
     */
    const LOCATION_DATA = [];

    /**
     * Add the column if and only if the value is passed in the request.
     *
     * @cont array
     */
    const WHEN_AVAILABLE_DATA = [];

    /**
     * Store the list here as array
     *
     * @const array
     */
    const ARRAYBLE_DATA = [];

    /**
     * Set all filter class you will use in this module
     *
     * @const array
     */
    const FILTERS = [
        UsersFilter::class,
    ];

    /**
     * {@inheritDoc}
     */
    const FILTER_BY = [
        'int' => ['id', 'group' => 'group.id'],
        'in' => [
            'accountType',
        ],
        'like' => [
            'name', 'email', 'phoneNumber',
        ],
        'date' => ['createdAt']
    ];

    /**
     * {@inheritDoc}
     */
    public $deleteDependenceTables = [];

    /**
     * Set columns list of date values.
     * 
     * @cont array  
     */
    const DATE_DATA = [];

    /**
     * Set the columns will be filled with single record of collection data
     * i.e [country => CountryModel::class]
     *
     * @const array
     */
    const DOCUMENT_DATA = [
        'group' => UsersGroup::class,
    ];

    /**
     * Set the columns will be filled with array of records.
     * i.e [tags => TagModel::class]
     * 
     * @const array
     */
    const MULTI_DOCUMENTS_DATA = [];

    /**
     * {@inheritDoc}
     */
    protected function setData($model, $request)
    {
        //
    }

    /**
     * {@inheritDoc}
     */
    protected function filter()
    {
        //
    }
}
