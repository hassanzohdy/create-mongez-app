<?php

namespace App\Modules\Users\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ActiveUser
{
    /**
     * Api OS key
     *
     * @var string
     */
    protected string $apiOSKey;

    /**
     * {@inheritDoc}
     */
    public function handle(Request $request, Closure $next)
    {
        $user = user();

        if ($user && $user->getAccountType() !== 'guest' && $user->status !== 'active') {
            return response([
                'data' => [
                    'error' => 'User is not active.',
                ],
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
