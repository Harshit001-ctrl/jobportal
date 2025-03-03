<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class ClientAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|email|unique:clients,email|max:255",
            "password" => "required|string|min:6|max:255",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed!',
                'errors' => $validator->errors()
            ],400);
        }

        $client = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = JWTAuth::fromUser($client);

        return response()->json([
            "message" => "Client registered successfully",
            'token' => $token,
            'client' => $client,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            "email" => "required|email|max:255",
            "password" => "required|string|min:6|max:255",
        ]);

        $client = Client::where('email', $request->email)->first();

        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json(["error" => "Invalid credentials"], 401);
        }

        try {
            $token = JWTAuth::fromUser($client);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            "message" => "Client logged in successfully",
            "token" => $token,
            "user" => [
                "id" => $client->id,
                "name" => $client->name,
                "email" => $client->email,
                "role" => $client->role,
            ],
        ]);
    }

    public function dashboard(Request $request)
    {
        try {
            $token = $request->bearerToken();

            if (!$token) {
                return response()->json(['error' => 'Token not provided'], 400);
            }

            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            return response()->json([
                "message" => "Client authenticated successfully",
                "role" => $user->role,
                'user' => $user,
            ], 200);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token is expired'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token not provided or blacklisted'], 400);
        }
    }

    public function logout(Request $request)
    {
        try {
            // Extract token from Authorization header
            $token = $request->bearerToken();

            if (!$token) {
                return response()->json(['error' => 'Token not found'], 404);
            }

            // Invalidate the token
            JWTAuth::invalidate(JWTAuth::parseToken());

            return response()->json(['message' => 'Logout successful'], 200);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token has already expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Invalid token'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout. Please try again.'], 500);
        }
    }
}
