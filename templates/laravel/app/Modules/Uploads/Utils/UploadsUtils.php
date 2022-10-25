<?php

namespace App\Modules\Uploads\Utils;

use App\Modules\Uploads\Providers\UploadsServiceProvider;

class UploadsUtils
{
    /**
     * Translate the given message.
     *
     * @param  string|null  $key
     * @param  array  $replace
     * @param  string|null  $locale
     * @return \Illuminate\Contracts\Translation\Translator|string|array|null
     */
    public static function trans($key = null, $replace = [], $locale = null)
    {
        static $baseTranslationName;

        if (! $baseTranslationName) {
            $baseTranslationName = UploadsServiceProvider::TRANSLATION_PREFIX;
        }

        return trans($baseTranslationName . '::' . $key, $replace, $locale);
    }
}
