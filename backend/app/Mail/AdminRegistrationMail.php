<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class AdminRegistrationMail extends Mailable
{
    public array $data;

    public function __construct(array $data)
    {
        $this->data = array_map(fn ($v) => e($v), $data);
    }

    public function build()
    {
        return $this->subject('Új #DigitSkills regisztráció: ' . $this->data['team_name'])
            ->html("
                <h2>Új csapat regisztrált a #DigitSkills 2026 versenyre!</h2>
                <p><strong>Intézmény:</strong> {$this->data['school_name']}</p>
                <p><strong>Felkészítő tanár:</strong> {$this->data['teacher_name']} ({$this->data['teacher_email']}, {$this->data['teacher_phone']})</p>
                <p><strong>Csapatnév:</strong> {$this->data['team_name']}</p>
                <p><strong>Csapattagok:</strong></p>
                <ul>
                    <li>{$this->data['member1_name']}</li>
                    <li>{$this->data['member2_name']}</li>
                    <li>{$this->data['member3_name']}</li>
                </ul>
                <p><strong>Csapat e-mail:</strong> {$this->data['team_email']}</p>
            ");
    }
}
