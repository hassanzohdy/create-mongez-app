<?php

namespace App\Modules\Users\Models;

use HZ\Illuminate\Mongez\Database\Eloquent\MongoDB\Model;

class UserRelative extends Model
{
    /**
     * Shared info of the model
     * This is used for storing only important fields into another model
     *
     * @const array
     */
    const SHARED_INFO = ['id', 'user', 'baseUser', 'relationshipType'];

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
    const ON_MODEL_UPDATE_ARRAY = [
        User::class => 'relatives',
    ];

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
     * Shared to base user of the relation
     * 
     * @var array
     */
    public function sharedToBase()
    {
        return $this->only(['id', 'user', 'relationshipType']);
    }


    /**
     * Shared to relative user of the relation
     * 
     * @var array
     */
    public function sharedToRelative()
    {
        $data = [
            'id' => $this->id,
            'user' => $this->baseUser,
            'relationshipType' => $this->relationshipType,
        ];

        $baseUserGender = $this->baseUser['gender'] ?? '';

        // reverse the relationship for the patient, if relationship is parent then the patient is the child
        switch ($this->relationshipType) {
            case 'parent':
            case 'father':
            case 'mother':
                $data['relationshipType'] = 'child';
                break;
            case 'child':
            case 'son':
            case 'daughter':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'father';
                } elseif ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'mother';
                } else {
                    $data['relationshipType'] = 'parent';
                }
                break;
            case 'brother':
                if ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'sister';
                }
                break;
            case 'sister':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'border';
                }
                break;
            case 'grandfather':
            case 'grandmother':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'grandson';
                } elseif ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'granddaughter';
                } else {
                    $data['relationshipType'] = 'grandchild';
                }
            case 'grandson':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'grandfather';
                } elseif ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'grandmother';
                } else {
                    $data['relationshipType'] = 'grandparent';
                }
                break;
            case 'stepfather':
            case 'stepmother':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'stepson';
                } elseif ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'stepdaughter';
                } else {
                    $data['relationshipType'] = 'stepchild';
                }
                break;
            case 'stepson':
            case 'stepdaughter':
                if ($baseUserGender === 'male') {
                    $data['relationshipType'] = 'grandfather';
                } elseif ($baseUserGender === 'female') {
                    $data['relationshipType'] = 'grandmother';
                } else {
                    $data['relationshipType'] = 'grandparent';
                }
                break;
            case 'wife':
                $data['relationshipType'] = 'husband';
                break;
        }

        return $data;
    }
}
