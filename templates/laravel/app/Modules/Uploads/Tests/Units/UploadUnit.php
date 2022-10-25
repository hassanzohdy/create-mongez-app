<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Units;

use HZ\Illuminate\Mongez\Testing\Units\ObjectUnit;

class UploadUnit extends ObjectUnit
{
    /**
     * {@inheritdoc}
     */
    public function beforeValidation(): void
    {
        $this->setUnits([
            'id' => 'id',
            'hash' => 'string',
            'fileName' => 'string',
            'mimeType' => 'string',
            'extension' => 'string',
            'relativePath' => 'string',
            'private' => 'bool',
            'url' => 'string',
        ]);
    }
}
