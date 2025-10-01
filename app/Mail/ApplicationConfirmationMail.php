<?php

namespace App\Mail;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicationConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * La candidature pour laquelle envoyer la confirmation.
     */
    public Application $application;

    /**
     * Create a new message instance.
     */
    public function __construct(Application $application)
    {
        $this->application = $application;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirmation de candidature - Grand Prix FONIJ ' . $this->application->edition->year,
            to: (config('app.env') !== 'production') ? 'aristechdev@gmail.com' : $this->application->email,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.application-confirmation',
            with: [
                'application' => $this->application,
                'candidateName' => $this->application->first_name . ' ' . $this->application->last_name,
                'applicationNumber' => $this->application->application_number,
                'projectName' => $this->application->project_name,
                'editionYear' => $this->application->edition->year,
                'submissionDate' => $this->application->submitted_at->format('d/m/Y à H:i'),
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
