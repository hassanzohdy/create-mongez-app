<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Admin;

use HZ\Illuminate\Mongez\Testing\ApiTestCase;
use App\Modules\Uploads\Tests\Units\UploadUnit;
use HZ\Illuminate\Mongez\Testing\Units\ArrayOfUnit;
use HZ\Illuminate\Mongez\Testing\Units\NotFoundUnit;
use HZ\Illuminate\Mongez\Testing\StrictResponseSchema;
use App\Modules\Users\Traits\Tests\WithUserAccessToken;

class ShowUploadsTest extends ApiTestCase
{
    use WithUserAccessToken;

    /**
     * {@inheritDoc}
     */
    protected ?bool $isAuthenticated = true;

    /**
     * test success show Upload.
     *
     * @return void
     */
    public function testSuccessShowUpload(): void
    {
        $adminCreatedUploadTest = $this->callTest(CreateUploadsTest::class);

        $createdUploadResponse = $this->callFrom($adminCreatedUploadTest->testSuccessCreateUpload());

        $UploadId = $createdUploadResponse->body()->data->record->id;

        $response = $this->get('admin/uploads/' . $UploadId);

        $response->assertSuccess();

        $responseSchema = new StrictResponseSchema([
            'record' => new UploadUnit(),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed show Upload with invalid authorization.
     *
     * @return void
     */
    public function testFailedShowUploadWithInvalidAuthorization(): void
    {
        $this->isAuthenticated = null;

        $response = $this->get('admin/uploads/'. rand());

        $response->assertUnauthorized();

        $responseSchema = new StrictResponseSchema([
            'error' => 'string',
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * test failed show Upload with not found.
     *
     * @return void
     */
    public function testFailedShowUploadWithNotFound(): void
    {
        $response = $this->get('admin/uploads/' . rand());

        $response->assertNotFound();

        $responseSchema = new StrictResponseSchema([
            'errors' => new ArrayOfUnit(NotFoundUnit::class),
        ]);

        $response->assertResponse($responseSchema);
    }
}
