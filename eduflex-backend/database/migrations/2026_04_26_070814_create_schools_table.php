<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('address');
            $table->string('city');
            $table->string('region');
            $table->string('principal_name');
            $table->string('website')->nullable();
            $table->json('curriculum')->nullable();
            $table->string('logo')->nullable();
            $table->string('color')->default('blue');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('pending');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};