<?php

namespace App\Modules\Users\Models;

use HZ\Illuminate\Mongez\Database\Eloquent\MongoDB\Model;

class DeviceToken extends Model
{
    /**
     * {@Inheritdoc}
     */
    public const SHARED_INFO = ['id', 'type', 'token'];

    /**
     * @const string
     */
    public const ANDROID_TYPE = 'android';

    /**
     * @const string
     */
    public const IOS_TYPE = 'ios';
}
