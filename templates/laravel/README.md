# Happiness

cd /home/apps/public_html/happiness/base/
git pull origin main && chown apps:apps -R ./

unlink composer.lock && composer install && chown apps:apps -R ./

## TODO

- Emails
  - Reset Password
- OTP
  - Reset Password
