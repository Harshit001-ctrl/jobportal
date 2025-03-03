<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class JobApplicationSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public $application; // Pass application data

    public function __construct($application)
    {
        $this->application = $application;
    }

    public function build()
    {
        return $this->subject('Your Job Application is Received')
                    ->view('email.application_received')
                    ->with(['application' => $this->application]);
    }
}
