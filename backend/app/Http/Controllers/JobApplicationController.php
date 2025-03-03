<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobApplication;
use App\Models\Job;
use App\Mail\JobApplicationSubmitted;
use Illuminate\Support\Facades\Mail;


class JobApplicationController extends Controller
{
    public function apply(Request $request, $jobId)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'resume' => 'required|mimes:pdf,doc,docx|max:10000',
        ]);

        $job = Job::findOrFail($jobId);

        // Store the resume file
        $resumePath = $request->file('resume')->store('resumes', 'public');

        $application = JobApplication::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'resume' => $resumePath,
            'job_id' => $job->id,
        ]);

        // Send confirmation email
        Mail::to($application->email)->send(new JobApplicationSubmitted($application));

        return response()->json(['message' => 'Application submitted successfully!'], 201);
    }


    public function index()
    {
        $applications = JobApplication::with('job')->get();

        return response()->json($applications);
    }

    public function delete($id)
    {
        $application = JobApplication::find($id);

        if (!$application) {
            return response()->json(['message' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }
}
