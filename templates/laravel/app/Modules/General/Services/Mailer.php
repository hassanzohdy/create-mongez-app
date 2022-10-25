<?php

namespace App\Modules\General\Services;

use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Mail;

class Mailer
{
    /**
     * A flag to determine if mail configurations are updated
     *
     * @var bool
     */
    protected bool $mailConfigurationsUpdated = false;

    /**
     * Mail to the given email address the given mailer
     *
     * @param  string $to
     * @param  Mailable $email
     * @param  bool $queue
     * @return mixed
     */
    public function send(string $to, Mailable $email, bool $queue = true)
    {
        $this->updateMailConfigurations();

        $mailer = Mail::to($to)->locale(app()->getLocale());

        // Can be logged

        return $queue ? $mailer->queue($email) : $mailer->send($email);
    }

    /**
     * Update mail configurations
     *
     * @return void
     */
    public function updateMailConfigurations(): void
    {
        if ($this->mailConfigurationsUpdated) {
            return;
        }

        /** @var \App\Modules\Settings\Repositories\SettingsRepository */
        $settingsRepository = repo('settings');
        $settings = $settingsRepository->getEmailConfigurations();

        config([
            'mail.mailers.smtp.host' => $settings['host'] ?? '',
            'mail.mailers.smtp.username' => $settings['username'] ?? '',
            'mail.mailers.smtp.password' => $settings['password'] ?? '',
            'mail.mailers.smtp.port' => $settings['port'] ?? 587,
        ]);

        $this->mailConfigurationsUpdated = true;
    }
}
