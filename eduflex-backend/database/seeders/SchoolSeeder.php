<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Parente;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password123');

        School::where('name', 'like', '%University%')
            ->orWhere('name', 'like', '%polytechnic%')
            ->orWhere('name', 'like', '%Polytechnic%')
            ->update(['status' => 'inactive']);

        $schools = [
            [
                'name' => 'Lycee General Leclerc Yaounde',
                'code' => 'LGL-001',
                'email' => 'admin@leclerc.cm',
                'phone' => '+237 222 23 45 67',
                'address' => 'Boulevard du 20 Mai',
                'city' => 'Yaounde',
                'region' => 'Centre',
                'principal_name' => 'Dr. Jean Mbarga',
                'website' => 'https://leclerc.cm',
                'curriculum' => ['GCE Ordinary Level', 'GCE Advanced Level', 'Baccalaureat'],
                'color' => 'blue',
            ],
            [
                'name' => 'College Francois-Xavier Vogt',
                'code' => 'VOGT-001',
                'email' => 'admin@collegevogt.cm',
                'phone' => '+237 222 31 54 12',
                'address' => 'Mvolye',
                'city' => 'Yaounde',
                'region' => 'Centre',
                'principal_name' => 'Rev. Fr. Michel Tchoumbou',
                'website' => 'https://collegevogt.cm',
                'curriculum' => ['General Secondary', 'Science', 'Arts'],
                'color' => 'green',
            ],
            [
                'name' => 'Saker Baptist College Limbe',
                'code' => 'SAKER-001',
                'email' => 'admin@sakercollege.cm',
                'phone' => '+237 233 33 20 18',
                'address' => 'Down Beach',
                'city' => 'Limbe',
                'region' => 'South West',
                'principal_name' => 'Mrs. Grace Njoh',
                'website' => 'https://sakercollege.cm',
                'curriculum' => ['GCE Ordinary Level', 'GCE Advanced Level'],
                'color' => 'purple',
            ],
            [
                'name' => 'Government Bilingual High School Buea',
                'code' => 'GBHSB-001',
                'email' => 'admin@gbhsbuea.cm',
                'phone' => '+237 233 32 22 10',
                'address' => 'Molyko',
                'city' => 'Buea',
                'region' => 'South West',
                'principal_name' => 'Mr. Emmanuel Tanyi',
                'website' => 'https://gbhsbuea.cm',
                'curriculum' => ['English Subsystem', 'French Subsystem', 'GCE Advanced Level'],
                'color' => 'teal',
            ],
            [
                'name' => 'College Libermann Douala',
                'code' => 'LIB-001',
                'email' => 'admin@libermann.cm',
                'phone' => '+237 233 42 18 90',
                'address' => 'Akwa',
                'city' => 'Douala',
                'region' => 'Littoral',
                'principal_name' => 'Rev. Fr. Andre Nlend',
                'website' => 'https://libermann.cm',
                'curriculum' => ['Francophone Secondary', 'Science', 'Literature'],
                'color' => 'indigo',
            ],
            [
                'name' => 'Government Primary School Ngoulmakong',
                'code' => 'GPSN-001',
                'email' => 'admin@gpsngoulmakong.cm',
                'phone' => '+237 699 14 33 20',
                'address' => 'Ngoulmakong',
                'city' => 'Abong-Mbang',
                'region' => 'East',
                'principal_name' => 'Mme. Therese Essomba',
                'website' => 'https://gpsngoulmakong.cm',
                'curriculum' => ['Primary', 'First School Leaving Certificate'],
                'color' => 'orange',
            ],
        ];

        foreach ($schools as $index => $schoolData) {
            $school = School::updateOrCreate(
                ['code' => $schoolData['code']],
                array_merge($schoolData, [
                    'status' => 'active',
                    'verified_at' => now(),
                ])
            );

            $this->seedUsersForSchool($school, $index + 1, $password);
        }
    }

    private function seedUsersForSchool(School $school, int $schoolIndex, string $password): void
    {
        $users = [
            [
                'role' => 'admin',
                'name' => $school->principal_name,
                'email' => $school->email,
                'phone' => $school->phone,
                'suffix' => 'ADMIN-001',
            ],
            [
                'role' => 'teacher',
                'name' => 'Teacher ' . $schoolIndex,
                'email' => "teacher{$schoolIndex}@eduflex.test",
                'phone' => '+237 670 10 ' . str_pad((string) $schoolIndex, 4, '0', STR_PAD_LEFT),
                'suffix' => 'TEACHER-001',
            ],
            [
                'role' => 'student',
                'name' => 'Student ' . $schoolIndex,
                'email' => "student{$schoolIndex}@eduflex.test",
                'phone' => '+237 671 20 ' . str_pad((string) $schoolIndex, 4, '0', STR_PAD_LEFT),
                'suffix' => 'STUDENT-001',
            ],
            [
                'role' => 'parent',
                'name' => 'Parent ' . $schoolIndex,
                'email' => "parent{$schoolIndex}@eduflex.test",
                'phone' => '+237 672 30 ' . str_pad((string) $schoolIndex, 4, '0', STR_PAD_LEFT),
                'suffix' => 'PARENT-001',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'school_id' => $school->id,
                    'name' => $userData['name'],
                    'phone' => $userData['phone'],
                    'user_id' => "{$school->code}-{$userData['suffix']}",
                    'role' => $userData['role'],
                    'password' => $password,
                    'is_active' => true,
                    'activated_at' => now(),
                ]
            );

            if ($userData['role'] === 'teacher') {
                $this->seedTeacher($school, $user, $schoolIndex);
            }

            if ($userData['role'] === 'student') {
                $this->seedStudent($school, $user, $schoolIndex);
            }

            if ($userData['role'] === 'parent') {
                $this->seedParent($school, $user, $schoolIndex);
            }
        }
    }

    private function seedTeacher(School $school, User $user, int $index): void
    {
        $teacher = Teacher::updateOrCreate(
            ['teacher_number' => "{$school->code}-TCH-0001"],
            [
                'user_id' => $user->id,
                'school_id' => $school->id,
                'first_name' => 'Teacher',
                'last_name' => (string) $index,
                'date_of_birth' => '1984-09-12',
                'gender' => $index % 2 === 0 ? 'female' : 'male',
                'qualification' => 'Bachelor of Education',
                'subjects' => ['Mathematics', 'English Language'],
                'hire_date' => '2021-09-01',
                'status' => 'active',
            ]
        );

        Classe::updateOrCreate(
            ['school_id' => $school->id, 'name' => 'Form 5', 'section' => 'A'],
            [
                'academic_year' => '2025/2026',
                'homeroom_teacher_id' => $teacher->id,
                'capacity' => 45,
            ]
        );
    }

    private function seedStudent(School $school, User $user, int $index): void
    {
        $class = Classe::where('school_id', $school->id)->first();

        Student::updateOrCreate(
            ['student_number' => "{$school->code}-STD-0001"],
            [
                'user_id' => $user->id,
                'school_id' => $school->id,
                'class_id' => $class?->id,
                'first_name' => 'Student',
                'last_name' => (string) $index,
                'date_of_birth' => '2008-05-14',
                'gender' => $index % 2 === 0 ? 'female' : 'male',
                'address' => $school->city,
                'parent_phone' => '+237 672 30 ' . str_pad((string) $index, 4, '0', STR_PAD_LEFT),
                'parent_email' => "parent{$index}@eduflex.test",
                'enrollment_date' => '2024-09-01',
                'status' => 'active',
            ]
        );
    }

    private function seedParent(School $school, User $user, int $index): void
    {
        Parente::updateOrCreate(
            ['parent_number' => "{$school->code}-PAR-0001"],
            [
                'user_id' => $user->id,
                'school_id' => $school->id,
                'first_name' => 'Parent',
                'last_name' => (string) $index,
                'phone' => $user->phone,
                'email' => $user->email,
                'address' => $school->city,
                'occupation' => 'Civil Servant',
            ]
        );
    }
}
