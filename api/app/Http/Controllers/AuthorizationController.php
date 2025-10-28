<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthorizationController extends Controller
{
    public function store(AuthRequest $request): JsonResponse {
        $validated = $request->validated();

        if (Auth::attempt($validated)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            $responseData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'token' => $token,
            ];

            return response()->json($responseData, 200);
        } else {
            return response()->json(['message' => 'Wrong email or password'], 401);
        }
    }

    // private function generateToken(User $user): string {
    //     $payload = [
    //         'sub' => $user->id,
    //         'iat' => time(),
    //         'exp' => time() + 3600,
    //         'email' => $user->email,
    //         'name' => $user->name
    //     ];

    //     $jwtToken = env('JWT_SECRET', 'second_secret');

    //     return JWT::encode($payload, $jwtToken, 'HS256');
    // }

    public function logout(): JsonResponse
    {
        $user = Auth::user();

        if ($user) {
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}
