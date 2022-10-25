<?php

namespace App\Modules\Uploads\Resources;

use HZ\Illuminate\Mongez\Resources\JsonResourceManager;

class UploadResource extends JsonResourceManager
{
    /**
     * Data that must be returned
     *
     * @const array
     */
    const DATA = ['hash', 'fileName', 'mimeType', 'extension', 'file' => 'relativePath', 'private'];

    /**
     * String Data
     *
     * @const array
     */
    const STRING_DATA = [];

    /**
     * Boolean Data
     *
     * @const array
     */
    const BOOLEAN_DATA = [];

    /**
     * Integer Data
     *
     * @const array
     */
    const INTEGER_DATA = ['size'];

    /**
     * Float Data
     *
     * @const array
     */
    const FLOAT_DATA = [];

    /**
     * Object Data
     *
     * @const array
     */
    const OBJECT_DATA = [];

    /**
     * Data that should be returned if exists
     *
     * @const array
     */
    const WHEN_AVAILABLE = ['private'];

    /**
     * Set that columns that will be formatted as dates
     * it could be numeric array or associated array to set the date format for certain columns
     *
     * @const array
     */
    const DATES = [];

    /**
     * Data that has multiple values based on locale codes
     * Mostly this is used with mongodb driver
     *
     * @const array
     */
    const LOCALIZED = [];

    /**
     * List of assets that will have a full url if available
     */
    const ASSETS = ['file' => 'url'];

    /**
     * Data that will be returned as a resources
     *
     * i.e [city => CityResource::class],
     * @const array
     */
    const RESOURCES = [];

    /**
     * Data that will be returned as a collection of resources
     *
     * i.e [cities => CityResource::class],
     * @const array
     */
    const COLLECTABLE = [];

    /**
     * List of keys that will be unset before sending
     *
     * @var array
     */
    protected static $disabledKeys = [];

    /**
     * List of keys that will be taken only
     *
     * @var array
     */
    protected static $allowedKeys = [];

    /**
     * Determine whether to stringify the image or not
     * i.e return the image url instead of the image object
     *
     * @var boolean
     */
    protected static $stringifyImage = false;

    /**
     * Determine whether to stringify the image or not
     * i.e return the image url instead of the image object
     *
     * @param  boolean $stringifyImage
     * @return void
     */
    public static function stringifyImage($stringifyImage)
    {
        static::$stringifyImage = $stringifyImage;
    }

    /**
     * {@inheritdoc}
     */
    public function toArray($request)
    {
        if (static::$stringifyImage) {
            return call_user_func(static::assetsFunction(), $this->file);
        }

        return parent::toArray($request);
    }
}
