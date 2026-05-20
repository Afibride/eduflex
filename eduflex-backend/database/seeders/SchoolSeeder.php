<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Parente;
use App\Models\School;
use App\Models\SchoolPost;
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
                'about' => 'A landmark public secondary school in Yaounde known for strong general education, science preparation, and civic leadership.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Lerclerc%20Yaound%C3%A9.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Lerclerc%20Yaound%C3%A9.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Lerclerc%20Yaound%C3%A9.jpg',
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
                'about' => 'A respected Catholic secondary school in Mvolye, Yaounde, with a tradition of discipline, academic excellence, and student formation.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Vogt%20Yaound%C3%A9.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Vogt%20Yaound%C3%A9.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/College%20Vogt%20Yaound%C3%A9.jpg',
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
                'about' => 'A leading girls secondary school in Limbe with a strong reputation for leadership, academics, and boarding-school community life.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
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
                'about' => 'A major bilingual public secondary school serving learners in the South West with English and French subsystem programs.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Government%20Bilingual%20High%20School%20Deido.jpg',
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
                'about' => 'A renowned Catholic secondary school in Douala with strong francophone academic programs and a long tradition of excellence.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Lyc%C3%A9e%20Bilingue%20de%20Dschang.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Lyc%C3%A9e%20Bilingue%20de%20Dschang.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Lyc%C3%A9e%20Bilingue%20de%20Dschang.jpg',
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
                'about' => 'A primary school community focused on foundational literacy, numeracy, and inclusive learning in the East Region.',
                'logo' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Primary%20school%20in%20Ngoulmakong%20East%20Region%20Cameroon.jpg',
                'profile_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Primary%20school%20in%20Ngoulmakong%20East%20Region%20Cameroon.jpg',
                'cover_image_url' => 'https://commons.wikimedia.org/wiki/Special:FilePath/Primary%20school%20in%20Ngoulmakong%20East%20Region%20Cameroon.jpg',
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
            $this->seedSchoolPosts($school);
        }
    }

    private function seedSchoolPosts(School $school): void
    {
        $posts = [
            [
                'title' => 'Welcome to our EduFlex public portal',
                'excerpt' => "{$school->name} now shares public school news, admissions notes, and achievements through EduFlex.",
                'content' => "Families can use this page to learn about {$school->name}, follow school highlights, and access the secure portal for students, teachers, and parents.",
                'category' => 'news',
                'image_url' => $school->cover_image_url,
                'is_featured' => true,
            ],
            [
                'title' => 'Academic excellence and school life',
                'excerpt' => 'Our learners continue to grow through classroom work, clubs, discipline, and community support.',
                'content' => 'School administrators can replace this sample post with real stories about examination results, club activities, sports, science fairs, and public achievements.',
                'category' => 'achievement',
                'image_url' => $school->profile_image_url,
                'is_featured' => false,
            ],
        ];

        foreach ($posts as $post) {
            SchoolPost::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'slug' => str($post['title'])->slug()->toString(),
                ],
                array_merge($post, [
                    'school_id' => $school->id,
                    'author_id' => User::where('school_id', $school->id)->where('role', 'admin')->value('id'),
                    'slug' => str($post['title'])->slug()->toString(),
                    'status' => 'published',
                    'published_at' => now(),
                ])
            );
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
