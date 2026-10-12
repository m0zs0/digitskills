<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('school_name');      // Intézmény neve
            $table->string('teacher_name');     // Felkészítő tanár neve
            $table->string('teacher_email');    // Tanár email
            $table->string('teacher_phone');    // Tanár telefon
            $table->string('team_name');        // Csapatnév
            $table->string('member1_name');     // 1. tag
            $table->string('member2_name');     // 2. tag
            $table->string('member3_name');     // 3. tag
            $table->string('team_email')->unique(); // Csapat Moodle email
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
