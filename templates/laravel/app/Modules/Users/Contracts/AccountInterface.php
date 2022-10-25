<?php

namespace App\Modules\Users\Contracts;

interface AccountInterface
{
    /**
     * Get user account type
     *
     * @return string
     */
    public function getAccountType(): string;

    /**
     * Get shared info data of user
     *
     * @return array
     */
    public function sharedWithAccountType(): array;

    /**
     * Get customer id.
     *
     * @return int
     */
    public function getAccountId(): int;
}
