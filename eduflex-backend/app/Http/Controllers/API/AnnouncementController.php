<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $query = Announcement::with('author:id,name,email')
            ->where('school_id', $request->user()->school_id);

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('audience') && $request->audience !== 'all') {
            $query->whereIn('audience', ['all', $request->audience]);
        }

        return response()->json($query
            ->orderByDesc('is_pinned')
            ->latest('published_at')
            ->latest()
            ->paginate((int) $request->get('per_page', 20)));
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $status = $data['status'] ?? ($request->boolean('publish_now') ? 'active' : 'draft');

        if (!empty($data['scheduled_at']) && $status !== 'active') {
            $status = 'scheduled';
        }

        $announcement = Announcement::create($data + [
            'school_id' => $request->user()->school_id,
            'author_id' => $request->user()->id,
            'status' => $status,
            'published_at' => $status === 'active' ? now() : null,
        ]);

        return response()->json([
            'message' => 'Announcement saved successfully',
            'announcement' => $announcement->load('author:id,name,email'),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $announcement = $this->schoolAnnouncement($request, $id);
        $announcement->increment('views');

        return response()->json($announcement->fresh('author:id,name,email'));
    }

    public function update(Request $request, $id)
    {
        $announcement = $this->schoolAnnouncement($request, $id);
        $data = $this->validatedData($request, true);

        if (($data['status'] ?? null) === 'active' && !$announcement->published_at) {
            $data['published_at'] = now();
        }

        $announcement->update($data);

        return response()->json([
            'message' => 'Announcement updated successfully',
            'announcement' => $announcement->fresh('author:id,name,email'),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $this->schoolAnnouncement($request, $id)->delete();

        return response()->json(['message' => 'Announcement deleted successfully']);
    }

    public function publish(Request $request, $id)
    {
        $announcement = $this->schoolAnnouncement($request, $id);
        $announcement->update([
            'status' => 'active',
            'published_at' => $announcement->published_at ?? now(),
            'scheduled_at' => null,
        ]);

        return response()->json(['message' => 'Announcement published', 'announcement' => $announcement->fresh()]);
    }

    public function archive(Request $request, $id)
    {
        $announcement = $this->schoolAnnouncement($request, $id);
        $announcement->update(['status' => 'archived']);

        return response()->json(['message' => 'Announcement archived', 'announcement' => $announcement->fresh()]);
    }

    public function pin(Request $request, $id)
    {
        $announcement = $this->schoolAnnouncement($request, $id);
        $announcement->update(['is_pinned' => !$announcement->is_pinned]);

        return response()->json(['message' => 'Announcement pin status updated', 'announcement' => $announcement->fresh()]);
    }

    public function stats(Request $request)
    {
        $query = Announcement::where('school_id', $request->user()->school_id);
        $total = (clone $query)->count();
        $views = (clone $query)->sum('views');

        return response()->json([
            'total_announcements' => $total,
            'active' => (clone $query)->where('status', 'active')->count(),
            'scheduled' => (clone $query)->where('status', 'scheduled')->count(),
            'drafts' => (clone $query)->where('status', 'draft')->count(),
            'archived' => (clone $query)->where('status', 'archived')->count(),
            'total_views' => $views,
            'read_rate' => $total > 0 ? round(min(100, ($views / max(1, $total * 10)) * 100), 1) : 0,
        ]);
    }

    private function validatedData(Request $request, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';

        return $request->validate([
            'title' => [$required, 'string', 'max:255'],
            'content' => [$required, 'string'],
            'audience' => ['sometimes', 'in:all,students,teachers,parents,staff'],
            'priority' => ['sometimes', 'in:low,medium,high'],
            'status' => ['sometimes', 'in:draft,scheduled,active,archived'],
            'scheduled_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date'],
            'is_pinned' => ['sometimes', 'boolean'],
        ]);
    }

    private function schoolAnnouncement(Request $request, $id): Announcement
    {
        return Announcement::where('school_id', $request->user()->school_id)->findOrFail($id);
    }
}
