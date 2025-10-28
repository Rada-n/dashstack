<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->cookie('token');

        if (!$token) {
            return response()->json(['message' => 'Token not provided!'], 401);
        }

        try {
            $credentials = JWT::decode($token, new Key(env('JWT_SECRET', 'second_secret'), 'HS256'));
        } catch (Exception $e) {
            return response()->json(['message' => 'Invalid Token: ' . $e->getMessage()], 401);
        }

        $user = User::findOrFail($credentials->sub);

        Auth::login($user);

        return $next($request);
    }
}
