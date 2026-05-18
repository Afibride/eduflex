<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->onDelete('cascade');
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->text('content');
            $table->string('audience')->default('all');
            $table->string('priority')->default('medium');
            $table->string('status')->default('draft');
            $table->timestamp('scheduled_at')->nullable();
            $table->date('expires_at')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_pinned')->default(false);
            $table->unsignedInteger('views')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }
};
