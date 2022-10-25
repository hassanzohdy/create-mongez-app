<?php

namespace App\Modules\General\Services;

use Exception;
use Illuminate\Support\Arr;
use App\Modules\Users\Models\User;
use Illuminate\Support\Facades\File;
use HZ\Illuminate\Mongez\Repository\RepositoryInterface;
use HZ\Illuminate\Mongez\Repository\MongoDBRepositoryManager;
use HZ\Illuminate\Mongez\Repository\NotFoundRepositoryException;

class Application
{
    const APPS = '';
    /**
     * Current application type
     *
     * @var string
     */
    public static string $currentApplicationType = '';

    /**
     * Project settings list
     *
     * @const array
     */
    protected static array $projectSettings = [];

    /**
     * Set the current application type
     *
     * @param string $applicationType
     * @return void
     */
    public static function setApplicationType(string $applicationType): void
    {
        static::$currentApplicationType = $applicationType;
    }

    /**
     * Determine if current application is the given one
     *
     * @param  string $appName
     * @return bool
     */
    public static function is(string $appName): bool
    {
        return static::$currentApplicationType === $appName;
    }

    /**
     * Determine if current application is not the given one
     *
     * @param  string $appName
     * @return bool
     */
    public static function isNot(string $appName): bool
    {
        return static::$currentApplicationType !== $appName;
    }

    /**
     * Get api key for the given application os
     *
     * @param  string $os
     * @return string
     */
    public static function getApiKeyFor(string $os): string
    {
        return config("auth.apps.{$os}.apiKey", '');
    }

    /**
     * Get current application user account type
     *
     * @return string
     */
    public static function accountType(): string
    {
        $currentApplicationType = static::getApplicationType();

        return config("auth.apps.{$currentApplicationType}.accountType", '');
    }

    /**
     * Determine if current application is multi lingual project
     *
     * @return bool
     */
    public static function isMultiLingual(): bool
    {
        return count(config('mongez.localeCodes', [])) > 1;
    }

    /**
     * Get current application type
     *
     * @return string
     */
    public static function getApplicationType(): string
    {
        return static::$currentApplicationType;
    }

    /**
     * Get current user repository name.
     *
     * @return string
     */
    public static function getCurrentUserRepositoryName(): string
    {
        $applicationType = static::getApplicationType();

        return config("auth.apps.{$applicationType}.repository");
    }

    /**
     * Get current application users repository.
     *
     * @return RepositoryInterface
     * @throws NotFoundRepositoryException
     */
    public static function getCurrentUserRepository(): RepositoryInterface
    {
        return repo(static::getCurrentUserRepositoryName());
    }

    /**
     * Get application by the given account type.
     *
     * @param string $accountType
     * @return array
     */
    public static function getApplicationByAccountType(string $accountType): array
    {
        $apps = config('auth.apps');

        foreach ($apps as $app) {
            if ($app['accountType'] === $accountType) {
                return $app;
            }
        }

        return [];
    }

    /**
     * Get repository name by account type.
     *
     * @param  string $accountType
     * @return string
     * @throws Exception
     */
    public static function getRepositoryNameByAccountType(string $accountType): string
    {
        return Arr::get(static::getApplicationByAccountType($accountType), 'repository');
    }

    /**
     * Get repository by account type.
     *
     * @param  string $accountType
     * @return MongoDBRepositoryManager
     * @throws Exception
     */
    public static function getRepositoryByAccountType(string $accountType): MongoDBRepositoryManager
    {
        $repositoryName = static::getRepositoryNameByAccountType($accountType);

        return repo($repositoryName);
    }

    /**
     * Get the resource class for the given account type
     *
     * @param  string $accountType
     * @return string
     */
    public static function getUserResource(string $accountType): string
    {
        return Arr::get(static::getApplicationByAccountType($accountType), 'resource', '');
    }

    /**
     * Get project setting value
     *
     * @param  string $key
     * @param  mixed $default
     * @return mixed
     */
    public static function getProjectSetting(string $key, $default = null)
    {
        if (!static::$projectSettings) {
            static::loadProjectSettings();
        }

        return Arr::get(static::$projectSettings, $key, $default);
    }

    /**
     * Load project settings
     *
     * @return void
     */
    protected static function loadProjectSettings()
    {
        static::$projectSettings = File::getJson(base_path('project-settings.json'));
    }

    /**
     * Determine if user'name will be split into first and last name
     *
     * @return bool
     */
    public static function isUserNameSplit(): bool
    {
        return static::getProjectSetting('customers.splitName', false);
    }

    /**
     * Get user by account type and id
     *
     * @param string $accountType
     * @param string|int $id
     * @return User|null
     * @throws Exception
     */
    public static function getUserByAccountTypeAndId(string $accountType, $id): ?User
    {
        $repository = static::getRepositoryByAccountType($accountType);

        return $repository->getModel($id);
    }

    /**
     * Get user from request data.
     *
     * @return User|null
     * @throws Exception
     */
    public static function getUserFromRequest(): ?User
    {
        $request = request();

        $accountType = (string) $request->get('userType');

        $id = (int) $request->get('user');

        return static::getUserByAccountTypeAndId($accountType, $id);
    }

    /**
     * Check if the ui application in development node
     *
     * @return bool
     */
    public static function isUiInDevelopmentMode(): bool
    {
        return request()->header('app-env') === 'development';
    }
}
