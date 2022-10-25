<?php

namespace App\Modules\Users\Events;

class UserEvent
{
    /**
     * {@inheritDoc}
     */
    public function sendUser(array $response): array
    {
        $user = user();

        if (!$user) return $response;

        $accountType = $user->getAccountType();

        if (!array_key_exists($accountType, $response)) {
            $response[$accountType] = repo('users')->wrap($user);
        }

        return $response;
    }
}
