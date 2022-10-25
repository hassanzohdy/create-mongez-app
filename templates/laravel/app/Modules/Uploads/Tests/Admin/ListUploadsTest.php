<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Admin;

use HZ\Illuminate\Mongez\Testing\ApiTestCase;
use App\Modules\Uploads\Tests\Units\UploadUnit;
use HZ\Illuminate\Mongez\Testing\Units\ArrayOfUnit;
use HZ\Illuminate\Mongez\Testing\StrictResponseSchema;
use App\Modules\Users\Traits\Tests\WithUserAccessToken;
use HZ\Illuminate\Mongez\Testing\Units\PaginationInfoUnit;

class ListUploadsTest extends ApiTestCase
{
    use WithUserAccessToken;

    /**
     * {@inheritDoc}
     */
    protected ?bool $isAuthenticated = true;

    /**
     * test success list Uploads.
     *
     * @return void
     */
    public function testSuccessListUploads(): void
    {
        $response = $this->get('admin/uploads');

        $response->assertSuccess();

        $responseSchema = new StrictResponseSchema([
            'records' => (new ArrayOfUnit(UploadUnit::class))->canBeEmpty(),
            'paginationInfo' => new PaginationInfoUnit(),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed list Uploads with invalid authorization.
     *
     * @return void
     */
    public function testFailedListUploadsWithInvalidAuthorization(): void
    {
        $this->isAuthenticated = null;

        $response = $this->get('admin/uploads');

        $response->assertUnauthorized();

        $responseSchema = new StrictResponseSchema([
            'error' => 'string',
        ]);

        $response->assertResponse($responseSchema);
    }
}
