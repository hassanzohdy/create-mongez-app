<?php

namespace App\Modules\Uploads\Traits;

use HZ\Illuminate\Mongez\Database\Eloquent\MongoDB\Model;

trait Attachable
{
    /**
     * {@inheritDoc}
     */
    protected function boot()
    {
        parent::boot();

        $this->registerAttachmentsEvents();
    }

    /**
     * Register attachments to operate on saving or on model deleting.
     *
     * @return void
     */
    protected function registerAttachmentsEvents()
    {
        if (!defined('static::ATTACHMENTS_DATA')) {
            return;
        }

        // Add images to the model on create or update
        $this->events->subscribe("{$this->eventName}.saving", function (Model $model) {
            foreach (static::ATTACHMENTS_DATA as $key => $column) {
                if (is_numeric($key)) {
                    $type = 'single';
                } else {
                    $type = $column;
                    $column = $key;
                }

                if ($type === 'multiple') {
                    $this->setAttachments($model, $column);
                } else {
                    $this->setAttachment($model, $column);
                }
            }
        });

        // Remove old attachments if they are no longer sent in the request.
        $this->events->subscribe("{$this->eventName}.save", function (Model $model, $request, $oldModel = null) {
            foreach (static::ATTACHMENTS_DATA as $key => $column) {
                if (is_numeric($key)) {
                    $type = 'single';
                } else {
                    $type = $column;
                    $column = $key;
                }

                $this->shakeOldAttachments($model, $oldModel, [$column]);
            }
        });

        // Remove attachments on deleting.
        $this->events->subscribe("{$this->eventName}.delete", function (Model $model) {
            foreach (static::ATTACHMENTS_DATA as $key => $column) {
                if (is_numeric($key)) {
                    $type = 'single';
                } else {
                    $type = $column;
                    $column = $key;
                }

                $this->removeAttachmentsFrom($model, $column);
            }
        });
    }

    /**
     * Load attachments into the given model
     *
     * @param Model $model
     * @param string ...$columns
     * @return void
     */
    public function setAttachments(Model $model, string ...$columns)
    {
        foreach ($columns as $column) {
            if (!$this->request->has($column)) {
                continue;
            }

            $model->{$column} = $this->request->{$column} ? $this->uploadsRepository->listAttachmentsInfo($this->request->{$column}) : [];
        }
    }

    /**
     * Load localized attachments into the given model
     *
     * @param Model $model
     * @param string $column
     * @return void
     */
    public function setLocalizedAttachment(Model $model, string $column = 'attachment')
    {
        $attachmentsInputs = $this->request->input($column, []);

        $attachmentList = [];

        foreach ($attachmentsInputs as $attachment) {
            $attachmentList[] = [
                'localeCode' => $attachment['localeCode'],
                'file' => $this->uploadsRepository->getAttachmentInfo($attachment['file']),
            ];
        }

        $model->{$column} = $attachmentList;
    }

    /**
     * Load single attachment
     *
     * @param  Model $model
     * @param  ...string[] $columns
     * @return void
     */
    public function setAttachment(Model $model, ...$columns)
    {
        foreach ($columns as $column) {
            if (!$this->request->has($column)) {
                continue;
            }

            $model->{$column} = $this->request->{$column} ? $this->uploadsRepository->getAttachmentInfo($this->request->{$column}) : null;
        }
    }

    /**
     * Remove the given attachments
     *
     * @param array $attachments
     * @return void
     */
    public function removeAttachments(array $attachments)
    {
        $this->uploadsRepository->deleteAttachments($attachments);
    }

    /**
     * Delete old attachments that will be given from the model and the old model
     *
     * @param  Model $model
     * @param  Model|null $oldModel
     * @param  array $attachmentsColumns
     * @return void
     */
    protected function shakeOldAttachments(Model $model, ?Model $oldModel, array $attachmentsColumns = ['image']): void
    {
        if (!$oldModel) {
            return;
        }

        foreach ($attachmentsColumns as $column) {
            $this->removeAttachments($this->getOldAttachments($model, $oldModel, $column));
        }
    }

    /**
     * Remove attachments from the given model
     *
     * @param Model $model
     * @param string[] $columns
     * @return void
     */
    public function removeAttachmentsFrom(Model $model, ...$columns)
    {
        if (!$columns) {
            $columns = ['attachments'];
        }

        $hashes = [];

        foreach ($columns as $column) {
            $attachment = $model->{$column};
            if (!$attachment) {
                continue;
            }

            if (!empty($attachment[0])) {
                $hashes = array_merge($hashes, collect($attachment)->pluck('hash')->toArray());
            } else {
                $hashes[] = $attachment['hash'];
            }
        }

        $this->removeAttachments($hashes);
    }

    /**
     * Get old attachments from the given two models
     *
     * @param Model $newModel
     * @param Model $oldModel
     * @param string $column
     * @return array
     */
    public function getOldAttachments(Model $newModel, Model $oldModel, string $column = 'attachments'): array
    {
        $newAttachments = collect($newModel->{$column} ?? []);

        $oldAttachments = [];

        if (!$oldModel->{$column}) {
            return [];
        }

        foreach ((array) ($oldModel->{$column} ?? []) as $attachment) {
            if (!isset($attachment['hash']) || $newAttachments->where('hash', $attachment['hash'])->first()) {
                continue;
            }

            $oldAttachments[] = $attachment['hash'];
        }

        return $oldAttachments;
    }
}
