<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class UsersController extends Controller
{

    // public function Register(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         "name" => "required|string|max:255",
    //         "email" => "required|email|unique:users,email|max:255",
    //         "password" => "required|string|min:6|max:255",
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json($validator->errors(), 400);
    //     }

    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'role' => 'user',
    //     ]);
    //     $token = JWTAuth::fromUser($user);
    //     return response()->json([
    //         "message" => "user registered successfully",
    //         'token' => $token,
    //         'user' => $user
    //     ], 201);
    // }

    // public function login(Request $request)
    // {

    //     $request->validate([
    //         "email" => "required|email|max:255",
    //         "password" => "required|string|min:6|max:255",
    //     ]);

    //     $user = User::where('email', $request->email)->first();

    //     if (!$user || !Hash::check($request->password, $user->password)) {
    //         return response()->json([
    //             "status" => "error",
    //             "message" => "Either email or password is incorrect"
    //         ], 401);
    //     }

    //     $token = JWTAuth::fromUser($user);

    //     return response()->json([
    //         "status" => "success",
    //         "message" => "User logged in successfully",
    //         "token" => $token,
    //         "user" => [
    //             "id" => $user->id,
    //             "name" => $user->name,
    //             "email" => $user->email,
    //             "role" => $user->role,
    //         ]
    //     ], 200);
    // }

    // public function dashboard(Request $request)
    // {
    //     try {
    //         $user = JWTAuth::parseToken()->authenticate();

    //         if (!$user) {
    //             return response()->json(['error' => 'User not found'], 404);
    //         }
    //         if ($user->role === 'admin') {
    //             return response()->json([
    //                 "message" => "Admin authenticated successfully",
    //                 "role" => "admin",
    //                 'user' => $user
    //             ], 200);
    //         } else {
    //             return response()->json([
    //                 "message" => "User authenticated successfully",
    //                 "role" => "user",
    //                 'user' => $user
    //             ], 200);
    //         }
    //     } catch (TokenInvalidException $e) {
    //         return response()->json(['error' => 'Token is invalid'], 401);
    //     } catch (TokenExpiredException $e) {
    //         return response()->json(['error' => 'Token is expired'], 401);
    //     } catch (JWTException $e) {
    //         return response()->json(['error' => 'Token not provided or blacklisted'], 400);
    //     }
    // }

    // public function logout(Request $request)
    // {
    //     try {
    //         $token = JWTAuth::getToken();

    //         if (!$token) {
    //             return response()->json(['error' => 'Token not found'], 404);
    //         }

    //         JWTAuth::invalidate($token, true);

    //         return response()->json(['message' => 'Logout successful'], 200);
    //     } catch (JWTException $e) {
    //         return response()->json(['error' => 'Failed to logout. Please try again.'], 500);
    //     }
    // }
}
