<?php

namespace App\Modules\Users\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Modules\General\Services\Application;

class DetectAppType
{
    /**
     * Api OS key
     *
     * @var string|null
     */
    protected ?string $apiOSKey;

    /**
     * {@inheritDoc}
     */
    public function handle(Request $request, Closure $next)
    {
        $agent = $request->header('os');

        if (!$agent) {
            return response([
                'data' => [
                    'error' => trans('messages.os-required'),
                ],
            ], Response::HTTP_UNAUTHORIZED);
        }

        Application::setApplicationType($agent);

        return $next($request);
    }
}
