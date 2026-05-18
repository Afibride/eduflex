<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('grades', function (Blueprint $table) {
            $table->foreignId('submitted_by')->nullable()->after('remarks')->constrained('users')->nullOnDelete();
            $table->string('verification_status')->default('pending')->after('submitted_by');
            $table->foreignId('verified_by')->nullable()->after('verification_status')->constrained('users')->nullOnDelete();
            $table->timestamp('verified_at')->nullable()->after('verified_by');
            $table->text('rejection_reason')->nullable()->after('verified_at');
        });
    }

    public function down(): void
    {
        Schema::table('grades', function (Blueprint $table) {
            $table->dropConstrainedForeignId('submitted_by');
            $table->dropConstrainedForeignId('verified_by');
            $table->dropColumn(['verification_status', 'verified_at', 'rejection_reason']);
        });
    }
};
