<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public $withinTransaction = false;

    public function up(): void
    {
        if (Schema::hasColumn('teachers', 'qualification')) {
            Schema::table('teachers', function (Blueprint $table) {
                $table->dropColumn('qualification');
            });
        }
    }

    public function down(): void
    {
        if (!Schema::hasColumn('teachers', 'qualification')) {
            Schema::table('teachers', function (Blueprint $table) {
                $table->string('qualification')->nullable();
            });
        }
    }
};
