<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class TeamRegistrationMail extends Mailable
{
    public array $data;

    public function __construct(array $data)
    {
        $this->data = array_map(fn ($v) => e($v), $data);
    }

    public function build()
    {
        return $this->from('digitskills@moriczref.hu', 'DigitSkills')
            ->subject('Sikeres regisztráció - #DigitSkills 2026')
            ->html("
                <h2>Kedves {$this->data['team_name']} csapat!</h2>
                <p>Köszönjük a jelentkezéseteket a <strong>#DigitSkills 2026 Csapatversenyre</strong>!</p>
                <p>Sikeresen rögzítettük a regisztrációtokat az alábbi adatokkal:</p>
                <ul>
                    <li><strong>Intézmény:</strong> {$this->data['school_name']}</li>
                    <li><strong>Felkészítő tanár:</strong> {$this->data['teacher_name']}</li>
                    <li><strong>Tagok:</strong> {$this->data['member1_name']}, {$this->data['member2_name']}, {$this->data['member3_name']}</li>
                </ul>
                <p>Három napon belül kapni fogtok egy csapathozzáférési azonosítót és jelszót a {$this->data['team_email']} emailcímre a Moodle felülethez, amit a főoldalról a 'Belépés a Moodle felületre' gombbal vagy közvetlenül az alábbi hivatkozásra kattintva tudtok elérni:</p>
                <p><a href=\"https://moricz.arrabonus.hu/moodle2/course/view.php?id=81\" target=\"_blank\" style=\"color: #0284c7; font-weight: bold;\">Belépés a Moodle felületre</a></p>
                <br>
                <p>Üdvözlettel,<br><strong>#DigitSkills szervezők</strong><br>digitskills@moriczref.hu</p>
            ");
    }
}
