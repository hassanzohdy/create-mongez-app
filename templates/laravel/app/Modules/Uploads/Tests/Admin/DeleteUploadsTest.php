<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Admin;

use HZ\Illuminate\Mongez\Testing\ApiTestCase;
use HZ\Illuminate\Mongez\Testing\Units\ArrayOfUnit;
use HZ\Illuminate\Mongez\Testing\Units\BooleanUnit;
use HZ\Illuminate\Mongez\Testing\Units\NotFoundUnit;
use HZ\Illuminate\Mongez\Testing\StrictResponseSchema;
use App\Modules\Users\Traits\Tests\WithUserAccessToken;

class DeleteUploadsTest extends ApiTestCase
{
    use WithUserAccessToken;

    /**
     * {@inheritDoc}
     */
    protected ?bool $isAuthenticated = true;

    /**
     * test success delete Upload.
     *
     * @return void
     */
    public function testSuccessDeleteUpload(): void
    {
        $adminCreatedUploadTest = $this->callTest(CreateUploadsTest::class);

        $createdUploadResponse = $this->callFrom($adminCreatedUploadTest->testSuccessCreateUpload());

        $UploadId = $createdUploadResponse->body()->data->record->id;

        $response = $this->delete('admin/uploads/' . $UploadId);

        $response->assertSuccess();

        $responseSchema = new StrictResponseSchema([
            'success' => (new BooleanUnit())->equal(true),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed delete Upload with invalid authorization.
     *
     * @return void
     */
    public function testFailedDeleteUploadWithInvalidAuthorization(): void
    {
        $this->isAuthenticated = null;

        $adminCreatedUploadTest = $this->callTest(CreateUploadsTest::class);

        $createdUploadResponse = $this->callFrom($adminCreatedUploadTest->testSuccessCreateUpload());

        $UploadId = $createdUploadResponse->body()->data->record->id;

        $response = $this->delete('admin/uploads/' . $UploadId);

        $response->assertUnauthorized();

        $responseSchema = new StrictResponseSchema([
            'error' => 'string',
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * test failed delete {{model}} with not found.
     *
     * @return void
     */
    public function testFailedDeleteUploadWithNotFound(): void
    {
        $response = $this->delete('admin/uploads/' . rand());

        $response->assertNotFound();

        $responseSchema = new StrictResponseSchema([
            'errors' => new ArrayOfUnit(NotFoundUnit::class),
        ]);

        $response->assertResponse($responseSchema);
    }
}
