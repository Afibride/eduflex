<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('name'); // Form 1, Form 2, etc.
            $table->string('section')->nullable(); // A, B, C
            $table->string('academic_year');
            $table->foreignId('homeroom_teacher_id')->nullable()->constrained('teachers');
            $table->integer('capacity')->default(50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};