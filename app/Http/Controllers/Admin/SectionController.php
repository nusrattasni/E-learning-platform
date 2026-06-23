<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Section;
use App\Models\Course;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function store(Request $request, Course $course)
    {
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'integer'
        ]);

        $course->sections()->create($validated);

        return back()->with('success', 'Section created successfully.');
    }

    public function update(Request $request, Section $section)
    {
        $course = $section->course;
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'integer'
        ]);

        $section->update($validated);

        return back()->with('success', 'Section updated successfully.');
    }

    public function destroy(Section $section)
    {
        $course = $section->course;
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $section->delete();

        return back()->with('success', 'Section deleted.');
    }
}
