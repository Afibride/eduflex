<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index(Request $request)
    {
        $classes = Classe::with('homeroomTeacher')
            ->withCount('students')
            ->where('school_id', $request->user()->school_id)
            ->orderBy('name')
            ->paginate(50);

        return response()->json($classes);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'section' => 'nullable|string|max:50',
            'education_level' => 'nullable|in:primary,secondary,high_school',
            'stream' => 'nullable|string|max:100',
            'academic_year' => 'required|string|max:20',
            'homeroom_teacher_id' => 'nullable|exists:teachers,id',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $class = Classe::create($data + [
            'school_id' => $request->user()->school_id,
            'capacity' => $data['capacity'] ?? 50,
        ]);

        return response()->json(['message' => 'Class created successfully', 'class' => $class->load('homeroomTeacher')], 201);
    }

    public function show(Request $request, $id)
    {
        $class = Classe::with(['homeroomTeacher', 'students.user'])
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);

        return response()->json($class);
    }

    public function update(Request $request, $id)
    {
        $class = Classe::where('school_id', $request->user()->school_id)->findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'section' => 'nullable|string|max:50',
            'education_level' => 'nullable|in:primary,secondary,high_school',
            'stream' => 'nullable|string|max:100',
            'academic_year' => 'sometimes|string|max:20',
            'homeroom_teacher_id' => 'nullable|exists:teachers,id',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $class->update($data);

        return response()->json(['message' => 'Class updated successfully', 'class' => $class->fresh('homeroomTeacher')]);
    }

    public function destroy(Request $request, $id)
    {
        Classe::where('school_id', $request->user()->school_id)->findOrFail($id)->delete();

        return response()->json(['message' => 'Class deleted successfully']);
    }

    public function getStudents(Request $request, $id)
    {
        $class = Classe::where('school_id', $request->user()->school_id)->findOrFail($id);

        return response()->json($class->students()->with('user')->paginate(50));
    }

    public function setup(Request $request)
    {
        $data = $request->validate([
            'education_level' => 'required|in:primary,secondary,high_school',
            'start_class' => 'required|string|max:100',
            'end_class' => 'required|string|max:100',
            'sections' => 'nullable|array',
            'sections.*' => 'string|max:10',
            'streams' => 'nullable|array',
            'streams.*' => 'string|max:100',
            'academic_year' => 'required|string|max:20',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $levels = $this->levelsFor($data['education_level']);
        $start = array_search($data['start_class'], $levels, true);
        $end = array_search($data['end_class'], $levels, true);

        if ($start === false || $end === false || $start > $end) {
            return response()->json(['error' => 'Invalid class range for selected school level'], 422);
        }

        $sections = $data['sections'] ?? [''];
        $streams = $data['streams'] ?? ['General'];
        $created = [];

        foreach (array_slice($levels, $start, $end - $start + 1) as $levelName) {
            foreach ($sections as $section) {
                foreach ($streams as $stream) {
                    $created[] = Classe::firstOrCreate(
                        [
                            'school_id' => $request->user()->school_id,
                            'name' => $levelName,
                            'section' => $section ?: null,
                            'stream' => $stream ?: 'General',
                            'academic_year' => $data['academic_year'],
                        ],
                        [
                            'education_level' => $data['education_level'],
                            'capacity' => $data['capacity'] ?? 50,
                        ]
                    );
                }
            }
        }

        return response()->json([
            'message' => count($created) . ' classes configured successfully',
            'classes' => $created,
        ], 201);
    }

    public function options()
    {
        return response()->json([
            'primary' => $this->levelsFor('primary'),
            'secondary' => $this->levelsFor('secondary'),
            'high_school' => $this->levelsFor('high_school'),
            'streams' => ['General', 'Science', 'Arts', 'Commercial', 'Technical', 'Industrial'],
            'sections' => range('A', 'E'),
        ]);
    }

    private function levelsFor(string $level): array
    {
        return match ($level) {
            'primary' => ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'],
            'high_school' => ['Lower Sixth', 'Upper Sixth'],
            default => ['Form 1', 'Form 2', 'Form 3', 'Form 4', 'Form 5', 'Lower Sixth', 'Upper Sixth'],
        };
    }
}
