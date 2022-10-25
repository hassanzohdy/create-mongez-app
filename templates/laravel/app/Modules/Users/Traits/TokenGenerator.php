<?php

namespace App\Modules\Users\Traits;

trait TokenGenerator
{
    /**
     * Generate access token and response with the plain text token and user type.
     *
     * @param string|null $name
     * @param array $permissions
     * @return array
     */
    public function generateToken(array $permissions = []): array
    {
        return [
            'type' => $this->getAccountType(),
            'accessToken' => $this->createToken($this->email ?: ($this->phoneNumber ?: $this->deviceId), $permissions)->plainTextToken,
        ];
    }
}
