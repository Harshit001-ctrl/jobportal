<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class ClientController extends Controller
{
    //  Client Registration
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|email|unique:users,email|max:255",
            "password" => "required|string|min:6|max:255",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user'  // ✅ Assign 'user' role for clients
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "message" => "Client registered successfully",
            'token' => $token,
            'user' => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role
            ]
        ], 201);
    }

    // Client Login
    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email|max:255",
            "password" => "required|string|min:6|max:255",
        ]);

        $user = User::where('email', $request->email)->where('role', 'user')->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "status" => "error",
                "message" => "Invalid credentials"
            ], 401);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "status" => "success",
            "message" => "Client logged in successfully",
            "token" => $token,
            "user" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,
                "role" => $user->role
            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        try {
            $token = JWTAuth::getToken();

            if (!$token) {
                return response()->json(['error' => 'Token not found'], 404);
            }

            JWTAuth::invalidate($token, true); // ✅ Blacklist the token

            return response()->json(['message' => 'Logout successful'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to logout. Please try again.'], 500);
        }
    }
}
