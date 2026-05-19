<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SchoolPostController extends Controller
{
    public function publicIndex(Request $request, $schoolId)
    {
        $school = School::where('status', 'active')
            ->where(function ($query) use ($schoolId) {
                is_numeric($schoolId)
                    ? $query->where('id', $schoolId)
                    : $query->where('code', $schoolId);
            })
            ->firstOrFail();

        $posts = SchoolPost::with('author:id,name')
            ->where('school_id', $school->id)
            ->where('status', 'published')
            ->latest('published_at')
            ->latest()
            ->paginate((int) $request->get('per_page', 10));

        return response()->json($posts);
    }

    public function index(Request $request)
    {
        $query = SchoolPost::with('author:id,name,email')
            ->where('school_id', $request->user()->school_id);

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        return response()->json(
            $query->latest('published_at')->latest()->paginate((int) $request->get('per_page', 20))
        );
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $status = $data['status'] ?? 'draft';
        $data['slug'] = $this->uniqueSlug($request->user()->school_id, $data['title']);
        $data['published_at'] = $status === 'published' ? now() : null;

        if (($data['is_featured'] ?? false) === true) {
            $this->clearFeatured($request->user()->school_id);
        }

        $post = SchoolPost::create($data + [
            'school_id' => $request->user()->school_id,
            'author_id' => $request->user()->id,
            'status' => $status,
        ]);

        return response()->json([
            'message' => 'School post saved successfully',
            'post' => $post->load('author:id,name,email'),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        return response()->json($this->schoolPost($request, $id)->load('author:id,name,email'));
    }

    public function update(Request $request, $id)
    {
        $post = $this->schoolPost($request, $id);
        $data = $this->validatedData($request, true);

        if (array_key_exists('title', $data) && $data['title'] !== $post->title) {
            $data['slug'] = $this->uniqueSlug($request->user()->school_id, $data['title'], $post->id);
        }

        if (($data['status'] ?? null) === 'published' && !$post->published_at) {
            $data['published_at'] = now();
        }

        if (($data['status'] ?? null) && $data['status'] !== 'published') {
            $data['published_at'] = null;
        }

        if (($data['is_featured'] ?? false) === true) {
            $this->clearFeatured($request->user()->school_id, $post->id);
        }

        $post->update($data);

        return response()->json([
            'message' => 'School post updated successfully',
            'post' => $post->fresh('author:id,name,email'),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $post = $this->schoolPost($request, $id);
        $post->update(['status' => 'archived', 'is_featured' => false]);

        return response()->json(['message' => 'School post archived successfully']);
    }

    private function validatedData(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'title' => [$required, 'string', 'max:255'],
            'excerpt' => ['nullable', 'string', 'max:500'],
            'content' => [$required, 'string'],
            'category' => ['sometimes', Rule::in(['news', 'achievement', 'event', 'admissions', 'community', 'general'])],
            'image_url' => ['nullable', 'string', 'max:500'],
            'status' => ['sometimes', Rule::in(['draft', 'published', 'archived'])],
            'is_featured' => ['sometimes', 'boolean'],
        ]);
    }

    private function schoolPost(Request $request, $id): SchoolPost
    {
        return SchoolPost::where('school_id', $request->user()->school_id)->findOrFail($id);
    }

    private function uniqueSlug(int $schoolId, string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'school-post';
        $slug = $base;
        $counter = 2;

        while (SchoolPost::where('school_id', $schoolId)
            ->where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    private function clearFeatured(int $schoolId, ?int $ignoreId = null): void
    {
        SchoolPost::where('school_id', $schoolId)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->update(['is_featured' => false]);
    }
}
