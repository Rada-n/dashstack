<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {        
        $users = User::all(); 
        return UserResource::collection($users);     
    }

    public function show()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return new UserResource($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:20|min:3',
            'email' => 'required|email|max:30|min:5',
            'password' => 'nullable|string|min:6',
            'image' => 'nullable|string|max:1024',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }
        $user->image = $validated['image'] ?? $user->image;

        $user->save();

        return new UserResource($user);
    }
}

