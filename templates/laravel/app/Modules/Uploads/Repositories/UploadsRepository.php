<?php

namespace App\Modules\Uploads\Repositories;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use App\Modules\Uploads\Models\Upload;
use Illuminate\Support\Facades\Storage;
use App\Modules\Uploads\Filters\UploadsFilter;
use App\Modules\Uploads\Resources\UploadResource;
use HZ\Illuminate\Mongez\Repository\RepositoryInterface;
use HZ\Illuminate\Mongez\Repository\MongoDBRepositoryManager;
use Illuminate\Http\UploadedFile;

class UploadsRepository extends MongoDBRepositoryManager implements RepositoryInterface
{
    /**
     * Repository Name
     *
     * @const string
     */
    const NAME = 'uploads';

    /**
     * Model class name
     *
     * @const string
     */
    const MODEL = Upload::class;

    /**
     * Resource class name
     *
     * @const string
     */
    const RESOURCE = UploadResource::class;

    /**
     * Set the columns of the data that will be auto filled in the model
     * Please use the following data types for more convenient data types
     *
     * @const array
     */
    const DATA = [];

    /**
     * Set columns list of string values.
     *
     * @cont array
     */
    const STRING_DATA = [];

    /**
     * Set columns list of integers values.
     *
     * @cont array
     */
    const INTEGER_DATA = [];

    /**
     * Set columns list of float values.
     *
     * @cont array
     */
    const FLOAT_DATA = [];

    /**
     * Set columns of booleans data type.
     *
     * @cont array
     */
    const BOOLEAN_DATA = ['private'];

    /**
     * Localized data
     *
     * @const array
     */
    const LOCALIZED_DATA = [];

    /**
     * Auto save uploads in this list
     *
     * If it's an indexed array, in that case the request input will be as database column name
     * If it's associated array, the input will be request input and the value will be the database column name
     *
     * It can be passed as well as an array of options, current options schema:
     * [
     *    'input' => 'string', // the input that will be read from the request files, if not present, it will be same as $column key
     *    'column' => 'string', // if not present, it will be same as $input input
     *    'clearable' => 'bool', // if set to true, the column value will be set to empty if there is no file to be uploaded
     *    'arrayable' => 'bool', // if set to true, it will be stored as an array, if set to null it auto determined
     * ]
     *
     * @const array
     */
    const UPLOADS = [];

    /**
     * Geo Location data
     *
     * @const array
     */
    const LOCATION_DATA = [];

    /**
     * Set columns list of date values.
     *
     * @cont array
     */
    const DATE_DATA = [];

    /**
     * Set the columns will be filled with single record of collection data
     * i.e [country => CountryModel::class]
     *
     * @const array
     */
    const DOCUMENT_DATA = [];

    /**
     * Set the columns will be filled with array of records.
     * i.e [tags => TagModel::class]
     *
     * @const array
     */
    const MULTI_DOCUMENTS_DATA = [];

    /**
     * Auto fill the following columns as arrays directly from the request
     * It will encoded and stored as `JSON` format,
     * it will be also auto decoded on any database retrieval either from `list` or `get` methods
     *
     * @const array
     */
    const ARRAYBLE_DATA = [];

    /**
     * Update the column if and only if its value is passed in the request, if set to true,
     * then all columns that is not in the request data will be not updated in the model and kept untouched.
     *
     * @const array
     */
    const WHEN_AVAILABLE_DATA = [];

    /**
     * Only the columns added in this array will be affected by PATCH request if they were sent.
     * Note: patch handler should be activated in config/mongez.php admin.patchable
     *
     * @const array
     */
    const PATCHABLE_DATA = [];

    /**
     * Determine wether to use pagination in the `list` method
     * if set null, it will depend on pagination configurations
     *
     * @const bool
     */
    const PAGINATE = null;

    /**
     * Number of items per page in pagination
     * If set to null, then it will taken from pagination configurations
     *
     * @const int|null
     */
    const ITEMS_PER_PAGE = null;

    /**
     * Set all filter class you will use in this module
     *
     * @const array
     */
    const FILTERS = [
        UploadsFilter::class,
    ];

    /**
     * Filter by columns used with `list` method only
     *
     * @const array
     */
    const FILTER_BY = [
        // in search
        'in' => ['hash'],
        '=' => ['fileHash'],
        // bool search
        'bool' => ['private'],
    ];

    /**
     * Set any extra data or columns that need more customizations
     * Please note this method is triggered on create or update call
     *
     * @param   mixed $model
     * @param   Request $request
     * @return  void
     */
    protected function setData($model, $request)
    {
        /*@var \Illuminate\Http\UploadedFile */
        $file = $request->file;
        $model->hash = sha1(mt_rand() . '-' . $file->getClientOriginalName() . time());

        $storageDirectory = $this->getUploadsStorageDirectoryName() . '/' . date('d-m-Y') . '/' . $model->hash;
        $model->directory = $storageDirectory;

        // Save the file
        $filePath = $file->storeAs($storageDirectory, $this->getFileName($file));

        $model->mimeType = $file->getMimeType();
        $model->fileName = $file->getClientOriginalName();
        $model->guessedExtension = $file->guessExtension();
        $model->extension = $file->guessClientExtension();
        $model->file = $filePath;
        $model->fullPath = $fullFilePath = Storage::path($filePath);
        $model->size = filesize($model->fullPath);
        $model->fileHash = sha1_file($fullFilePath);
    }

    /**
     * Check if the given file has been uploaded, if not, then upload it
     *
     * @param  array<file:\Illuminate\Http\UploadedFile, private: bool> $fileOptions
     * @return Upload
     */
    public function createFile(array $fileOptions): Upload
    {
        return $this->create($fileOptions);
        $file = $fileOptions['file'];

        $hash = sha1_file($file->getRealPath());

        return $this->first([
            'fileHash', $hash
        ]) ?: $this->create($fileOptions);
    }

    /**
     * Create from base64 encoded string
     * 
     * @param  array $fileOptions
     * @return Upload
     */
    public function createFromBase64(array $fileOptions): Upload
    {
        return $this->createFromUrl($fileOptions);
    }

    /**
     * Create image from url
     * 
     * @param  array $fileOptions
     * @return Upload
     */
    public function createFromUrl(array $fileOptions): Upload
    {
        $image = $fileOptions['file'] ?? $fileOptions['url'];
        $fileName = $fileOptions['fileName'];

        $imagePath = 'temp/' . $fileName;

        $fullPath = Storage::path($imagePath);

        Storage::put($imagePath, file_get_contents($image));
        $finfo = new \Finfo(FILEINFO_MIME_TYPE);

        $image = new UploadedFile(
            $fullPath,
            $fileName,
            $finfo->file($fullPath),
            filesize($fullPath),
            0,
            false
        );

        $fileOptions['file'] = $image;

        $upload = $this->createFile($fileOptions);

        Storage::delete($imagePath);

        return $upload;
    }

    /**
     * Get attachment list for the given keys
     *
     * @param array $attachmentsHash
     * @return Collection
     */
    public function listAttachments(array $attachmentsHash): Collection
    {
        return $this->list([
            'as-model' => true,
            'hash' => $attachmentsHash,
        ]);
    }

    /**
     * Get attachment list for the given keys
     *
     * @param array $attachmentsHash
     * @return array
     */
    public function listAttachmentsInfo(array $attachmentsHash): array
    {
        return $this->listAttachments($attachmentsHash)->map(function ($attachment) {
            return $attachment->sharedInfo();
        })->toArray();
    }

    /**
     * Get single attachment by hash
     *
     * @param  string $hash
     * @return array|null
     */
    public function getAttachmentInfo(string $hash): ?array
    {
        $upload = $this->getByModel('hash', $hash);

        return $upload ? $upload->sharedInfo() : null;
    }

    /**
     * Get attachment
     *
     * @param  string $hash
     * @return Upload|null
     */
    public function getAttachment(string $hash): ?Upload
    {
        return $this->getByModel('hash', $hash);
    }

    /**
     * Delete the file by the given hash
     *
     * @param  string $hash
     * @return void
     */
    public function deleteFileByHash(string $hash): void
    {
        $model = $this->getByModel('hash', $hash);

        if (!$model) {
            return;
        }

        $this->deleteAttachment($model);
    }

    /**
     * Delete the given attachment
     *
     * @param  $attachment
     * @return void
     */
    public function deleteAttachment($attachment): void
    {
        File::deleteDirectory(Storage::path($attachment->directory));

        $attachment->delete();
    }

    /**
     * Delete the given attachments
     *
     * @param  array $attachments
     * @return void
     */
    public function deleteAttachments(array $attachments): void
    {
        $attachments = $this->listAttachments($attachments);

        foreach ($attachments as $attachment) {
            $this->deleteAttachment($attachment);
        }
    }

    /**
     * Do any extra filtration here
     *
     * @return  void
     */
    protected function filter()
    {
    }
}
