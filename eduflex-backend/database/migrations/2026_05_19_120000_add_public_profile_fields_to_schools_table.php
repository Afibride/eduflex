<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public $withinTransaction = false;

    public function up(): void
    {
        if (!Schema::hasColumn('schools', 'about')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->text('about')->nullable();
            });
        }

        if (!Schema::hasColumn('schools', 'profile_image_url')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->string('profile_image_url')->nullable();
            });
        }

        if (!Schema::hasColumn('schools', 'cover_image_url')) {
            Schema::table('schools', function (Blueprint $table) {
                $table->string('cover_image_url')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach (['about', 'profile_image_url', 'cover_image_url'] as $column) {
            if (Schema::hasColumn('schools', $column)) {
                Schema::table('schools', function (Blueprint $table) use ($column) {
                    $table->dropColumn($column);
                });
            }
        }
    }
};
