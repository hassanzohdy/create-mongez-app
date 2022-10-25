<?php

declare(strict_types=1);

namespace App\Modules\Uploads\Tests\Admin;

use HZ\Illuminate\Mongez\Testing\ApiTestCase;
use App\Modules\Uploads\Tests\Units\UploadUnit;
use HZ\Illuminate\Mongez\Testing\StrictResponseSchema;
use HZ\Illuminate\Mongez\Testing\Units\ErrorsListUnit;
use App\Modules\Users\Traits\Tests\WithUserAccessToken;

class CreateUploadsTest extends ApiTestCase
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
     * test success create Upload.
     *
     * @return void
     */
    public function testSuccessCreateUpload(): void
    {
        $response = $this->post('admin/uploads', $this->setRequestData());

        $response->assertSuccessCreate();

        $responseSchema = new StrictResponseSchema([
            'record' => new UploadUnit(),
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed create Upload with invalid authorization.
     *
     * @return void
     */
    public function testFailedCreateUploadWithInvalidAuthorization(): void
    {
        $this->isAuthenticated = null;

        $response = $this->post('admin/uploads');

        $response->assertUnauthorized();

        $responseSchema = new StrictResponseSchema([
            'error' => 'string',
        ]);

        $response->assertResponse($responseSchema);
    }

    /**
     * failed create Upload without sending any data.
     *
     * @return void
     */
    public function testFailedCreateUploadWithoutSendingAnyData(): void
    {
        $response = $this->post('admin/uploads');

        $response->assertBadRequest();

        $responseSchema = new StrictResponseSchema([
            'errors' => new ErrorsListUnit($this->requestValidationErrors),
        ]);

        $response->assertResponse($responseSchema);
    }
}
