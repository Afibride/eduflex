<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SchoolSeeder::class);

        User::create([
            'school_id' => 1,
            'name' => 'Test Admin',
            'email' => 'test@example.com',
            'phone' => '+237 222 000 000',
            'user_id' => 'LECLERC-001-ADMIN-001',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'is_active' => true,
            'activated_at' => now(),
        ]);
    }
}
