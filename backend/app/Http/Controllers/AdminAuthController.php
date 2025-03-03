<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminAuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|max:255",
            "email" => "required|email|unique:admins,email|max:255",
            "password" => "required|string|min:6|max:255",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = JWTAuth::fromUser($admin);

        return response()->json([
            "message" => "Admin registered successfully",
            'token' => $token,
            'admin' => $admin,
        ], 201);
    }

   public function login(Request $request)
{
    $request->validate([
        "email" => "required|email|max:255",
        "password" => "required|string|min:6|max:255",
    ]);

    $admin = Admin::where('email', $request->email)->first();

    if (!$admin || !Hash::check($request->password, $admin->password)) {
        return response()->json(["error" => "Invalid credentials"], 401);
    }

    try {
        $token = JWTAuth::fromUser($admin);
    } catch (JWTException $e) {
        return response()->json(['error' => 'Could not create token'], 500);
    }

    return response()->json([
        "message" => "Admin logged in successfully",
        "token" => $token, // ✅ FIXED: Now returning the actual token!
        "admin" => [
            "id" => $admin->id,
            "name" => $admin->name,
            "email" => $admin->email,
            "role" => "admin",
        ],
    ]);
}

    public function dashboard(Request $request)
    {
        try {
            // Authenticate using the 'admin' guard
            $admin = auth('admin')->user();

            if (!$admin) {
                return response()->json(["error" => "Unauthorized: Admin not found"], 403);
            }

            return response()->json([
                "message" => "Admin authenticated successfully",
                "role" => "admin",
                "user" => $admin,
            ], 200);
        } catch (TokenInvalidException $e) {
            return response()->json(["error" => "Token invalid"], 401);
        } catch (TokenExpiredException $e) {
            return response()->json(["error" => "Token expired"], 401);
        } catch (JWTException $e) {
            return response()->json(["error" => "Token not provided"], 400);
        }
    }
    public function logout(Request $request)
    {
        try {
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
