<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            Subject::where('school_id', $request->user()->school_id)
                ->orderBy('name')
                ->paginate(50)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|string|max:50|unique:subjects,code',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'coefficient' => 'nullable|integer|min:1',
        ]);

        $subject = Subject::create($data + [
            'school_id' => $request->user()->school_id,
            'coefficient' => $data['coefficient'] ?? 1,
        ]);

        return response()->json(['message' => 'Subject created successfully', 'subject' => $subject], 201);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::where('school_id', $request->user()->school_id)->findOrFail($id);
        $data = $request->validate([
            'code' => 'sometimes|string|max:50|unique:subjects,code,' . $subject->id,
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'coefficient' => 'nullable|integer|min:1',
        ]);

        $subject->update($data);

        return response()->json(['message' => 'Subject updated successfully', 'subject' => $subject]);
    }

    public function destroy(Request $request, $id)
    {
        Subject::where('school_id', $request->user()->school_id)->findOrFail($id)->delete();

        return response()->json(['message' => 'Subject deleted successfully']);
    }
}
