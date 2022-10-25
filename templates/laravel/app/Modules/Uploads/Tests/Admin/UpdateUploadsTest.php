<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Admin;

use HZ\Illuminate\Mongez\Testing\ApiTestCase;
use App\Modules\Uploads\Tests\Units\UploadUnit;
use HZ\Illuminate\Mongez\Testing\Units\ArrayOfUnit;
use HZ\Illuminate\Mongez\Testing\Units\NotFoundUnit;
use HZ\Illuminate\Mongez\Testing\StrictResponseSchema;
use HZ\Illuminate\Mongez\Testing\Units\ErrorsListUnit;
use App\Modules\Users\Traits\Tests\WithUserAccessToken;

class UpdateUploadsTest extends ApiTestCase
{
    use WithUserAccessToken;

    /**
     * {@inheritDoc}
     */
    protected ?bool $isAuthenticated = true;

    /**
     * define all probably validation error message
     *
     * @example $requestValidationErrors = ['title']
     *
     * @var array
     */
    protected array $requestValidationErrors = [];

    /**
     * define all request data.
     *
     * @example return [
     *  'title' => $this->faker->title,
     *  'description' => $this->faker->text,
     *  'published' => $this->faker->boolean,
     * ]
     *
     * @return array
     */
    public function setRequestData(): array
    {
        return [
            
        ];
    }

    /**
     * test success update Upload.
     *
     * @return void
     */
    public function testSuccessUpdateUpload(): void
    {
        $adminCreatedUploadTest = $this->callTest(CreateUploadsTest::class);

        $createdUploadResponse = $this->callFrom($adminCreatedUploadTest->testSuccessCreateUpload());

        $UploadId = $createdUploadResponse->body()->data->record->id;

        $response = $this->put('admin/uploads/' . $UploadId, $this->setRequestData());

        $response->assertSuccess();

        $responseSchema = new StrictResponseSchema([
            'record' => new UploadUnit(),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed update Upload with invalid authorization.
     *
     * @return void
     */
    public function testFailedUpdateUploadWithInvalidAuthorization(): void
    {
        $this->isAuthenticated = null;

        $response = $this->put('admin/uploads/'. rand());

        $response->assertUnauthorized();

        $responseSchema = new StrictResponseSchema([
            'error' => 'string',
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed update Upload without sending any data.
     *
     * @return void
     */
    public function testFailedUpdateUploadWithoutSendingAnyData(): void
    {
        $adminCreatedUploadTest = $this->callTest(CreateUploadsTest::class);

        $createdUploadResponse = $this->callFrom($adminCreatedUploadTest->testSuccessCreateUpload());

        $UploadId = $createdUploadResponse->body()->data->record->id;

        $response = $this->put('admin/uploads/' . $UploadId);

        $response->assertBadRequest();

        $responseSchema = new StrictResponseSchema([
            'errors' => new ErrorsListUnit($this->requestValidationErrors),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed update Upload with not found document.
     *
     * @return void
     */
    public function testFailedUpdateUploadWithNotFound(): void
    {
        $response = $this->put('admin/uploads/'. rand());

        $response->assertNotFound();

        $responseSchema = new StrictResponseSchema([
            'errors' => new ArrayOfUnit(NotFoundUnit::class),
        ]);

        $response->assertResponse($responseSchema);
    }
}
