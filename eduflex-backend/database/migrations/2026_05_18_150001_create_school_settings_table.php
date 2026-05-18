<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->string('group');
            $table->json('values');
            $table->timestamps();

            $table->unique(['school_id', 'group']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_settings');
    }
};
