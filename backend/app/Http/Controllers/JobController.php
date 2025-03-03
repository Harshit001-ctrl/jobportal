<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{

    public function store(Request $request)
    {
        try {
            $admin = JWTAuth::parseToken()->authenticate();

            if (!$admin) {
                return response()->json(['error' => 'Unauthorized access'], 403);
            }
        } catch (\Exception $e) {
            Log::error('JWT Authentication Error:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Invalid token'], 401);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'experience' => 'required|string|max:255',
            'salary' => 'nullable|numeric|min:0',
            'company_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $job = Job::create([
                'title' => $request->title,
                'description' => $request->description,
                'experience' => $request->experience,
                'salary' => $request->salary ?? null, // Ensure salary can be null
                'company_name' => $request->company_name,
                'location' => $request->location,
            ]);
        } catch (\Exception $e) {
            Log::error('Job Creation Error:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to post job'], 500);
        }

        return response()->json([
            'message' => 'Job posted successfully!',
            'job' => $job
        ], 201);
    }


    public function index()
    {
        try {
            $jobs = Job::all();

            return response()->json([
                'message' => 'Jobs retrieved successfully!',
                'jobs' => $jobs
            ], 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
            ]);
        } catch (\Exception $e) {
            Log::error('Fetch Jobs Error:', ['message' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to fetch jobs'], 500);
        }
    }
    // JobController.php
    public function show($id)
    {
        $job = Job::find($id);

        if (!$job) {
            return response()->json(['error' => 'Job not found'], 404);
        }

        return response()->json($job);
    }


public function update(Request $request, $id)
{
    $job = Job::find($id);

    if (!$job) {
        return response()->json(['message' => 'Job not found'], 404);
    }

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'company_name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'description' => 'nullable|string',
        'salary' => 'nullable|string',
        'experience' => 'nullable|string',
    ]);

    $job->update($validatedData);

    return response()->json(['message' => 'Job updated successfully!', 'job' => $job], 200);
}


public function delete($id)
{
    // Find job by ID
    $job = Job::find($id);

    // If job is not found, return a 404 response
    if (!$job) {
        return response()->json(['message' => 'Job not found'], 404);
    }

    // Delete the job
    $job->delete();

    // Return a success response
    return response()->json(['message' => 'Job deleted successfully'], 200);
}


}
