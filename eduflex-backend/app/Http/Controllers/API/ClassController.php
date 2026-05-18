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
}
