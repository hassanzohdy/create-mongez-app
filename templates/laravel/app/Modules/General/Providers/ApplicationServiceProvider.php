<?php

namespace App\Modules\General\Providers;

use Illuminate\Support\ServiceProvider;
use App\Modules\General\Services\Mailer;
use App\Modules\General\Services\Application;
use App\Modules\Users\Contracts\UsersRepositoryInterface;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Date;

class ApplicationServiceProvider extends ServiceProvider
{
    /**
     * {@inheritDoc}
     */
    public function boot()
    {
        $this->app->singleton(Mailer::class);

        if ($localeCode = $this->app->request->header('translation-localeCode')) {
            $this->app->setLocale($localeCode);
        }

        $this->app->singleton(UsersRepositoryInterface::class, function () {
            return Application::getCurrentUserRepository();
        });
    }
}
