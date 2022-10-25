<?php

namespace App\Modules\Users\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Modules\General\Services\Application;

class ApiAuth
{
    /**
     * {@inheritDoc}
     */
    public function handle(Request $request, Closure $next)
    {
        $agent = $request->header('os');

        $apiKey = Application::getApiKeyFor($agent);

        if (!$apiKey || $request->authorizationValue() !== $apiKey) {
            return response([
                'data' => [
                    'error' => trans('messages.invalid-api-key'),
                ],
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
