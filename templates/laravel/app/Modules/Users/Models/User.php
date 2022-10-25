<?php

namespace App\Modules\Users\Models;

use Laravel\Sanctum\HasApiTokens;
use App\Modules\Users\Traits\TokenGenerator;
use App\Modules\Users\Contracts\AccountInterface;
use App\Modules\Users\Traits\Auth\UpdatePassword;
use App\Modules\Users\Traits\Deviceable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use HZ\Illuminate\Mongez\Database\Eloquent\MongoDB\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class User extends Model implements AccountInterface, Authenticatable
{
    /**
     * use Sanctum Tokens
     */
    use HasApiTokens, TokenGenerator, HasFactory, Deviceable;

    use AuthenticatableTrait;

    /**
     * Device token model
     *
     * @const string
     */
    public const DEVICE_TOKEN_MODEL = DeviceToken::class;

    /**
     * Update Password Trait
     */
    use UpdatePassword;

    /**
     * @const string
     */
    public const ACCOUNT_TYPE = 'user';

    /**
     * Define list of other models that will be affected
     * as the current model is sub-document to it when it gets updated
     *
     * @example ModelClass::class => columnName will be converted to ['columnName.id', 'columnName', 'sharedInfo']
     * @example ModelClass::class => [searchingColumn, updatingColumn]
     * @example ModelClass::class => [searchingColumn, updatingColumn, sharedInfoMethod]
     *
     * @const array
     */
    const ON_MODEL_UPDATE = [];

    /**
     * Define list of other models that will be affected as the current object is part of array
     * as the current model is sub-document to it when it gets updated
     *
     * @example ModelClass::class => columnName will be converted to ['columnName.id', 'columnName', 'sharedInfo']
     * @example ModelClass::class => [searchingColumn, updatingColumn]
     * @example ModelClass::class => [searchingColumn, updatingColumn, sharedInfoMethod]
     *
     * @const array
     */
    const ON_MODEL_UPDATE_ARRAY = [];

    /**
     * Define list of other models that will clear the column from its records
     * A 1-1 relation
     *
     * Do not add the id, it will be appended automatically
     *
     * @example ModelClass::class => searchingColumn: string
     *
     * @const array
     */
    const ON_MODEL_DELETE_UNSET = [];

    /**
     * Define list of the models that have the current model as embedded document and pull it from the array
     *  A 1-n relation
     * Do not add the id, it will be appended automatically
     *
     * @example ModelClass::class => searchingColumn: string
     *
     * @const array
     */
    const ON_MODEL_DELETE_PULL = [];

    /**
     * Define list of other models that will be deleted
     * when this model is deleted
     * For example when a city is deleted, all related regions shall be deleted as well
     *
     * Do not add the id, it will be appended automatically
     *
     * @example Region::class => 'city'
     * @example ModelClass::class => searchingColumn: string
     *
     * @const array
     */
    const ON_MODEL_DELETE = [];

    /**
     * {@inheritDoc}
     */
    protected $casts = [];

    /**
     * Get user account type
     *
     * @return string
     */
    public function getAccountType(): string
    {
        return $this->getAttribute('accountType') ?: 'staff';
    }

    /**
     * Get customer id.
     *
     * @return int
     */
    public function getAccountId(): int
    {
        return $this->id;
    }

    /**
     * Get shared info for the user that will be stored as a sub document of another collection
     *
     * @return array
     */
    public function sharedInfo(): array
    {
        return $this->sharedWithAccountType();
    }

    /**
     * {@inheritDoc}
     */
    public function sharedWithAccountType(): array
    {
        $data = $this->only(['id', 'name', 'email', 'phoneNumber', 'image']);

        $data['accountType'] = $this->getAccountType();

        return $data;
    }
}
