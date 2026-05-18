<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Lycée Général Leclerc',
                'code' => 'LECLERC-001',
                'email' => 'contact@leclerc.edu.cm',
                'phone' => '+237 222 123 456',
                'address' => 'Boulevard du 20 Mai',
                'city' => 'Yaoundé',
                'region' => 'Centre',
                'principal_name' => 'Dr. Jean Mbarga',
                'status' => 'active',
            ],
            [
                'name' => 'Collège Vogt',
                'code' => 'VOGT-001',
                'email' => 'info@vogt.edu.cm',
                'phone' => '+237 233 456 789',
                'address' => 'Rue College Vogt',
                'city' => 'Douala',
                'region' => 'Littoral',
                'principal_name' => 'Mme Claire Ngoa',
                'status' => 'active',
            ],
            [
                'name' => 'Lycée de Biyem-Assi',
                'code' => 'BIYEM-001',
                'email' => 'contact@biyemassi.edu.cm',
                'phone' => '+237 222 987 654',
                'address' => 'Biyem-Assi',
                'city' => 'Yaoundé',
                'region' => 'Centre',
                'principal_name' => 'M. Paul Atangana',
                'status' => 'active',
            ],
        ];

        foreach ($schools as $schoolData) {
            School::create($schoolData);
        }
    }
    
}
