<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $query = Course::with('category')->latest();
        
        if (auth()->user()->role !== 'admin') {
            $query->where('instructor_id', auth()->id());
        }
        
        $courses = $query->paginate(10);
            
        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Create', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'numeric|min:0',
            'thumbnail' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'difficulty' => 'required|in:Beginner,Intermediate,Advanced,All Levels',
            'requirements' => 'nullable|string',
            'what_you_will_learn' => 'nullable|string'
        ]);

        $validated['instructor_id'] = auth()->id();

        $course = Course::create($validated);

        return redirect()->route('admin.courses.edit', $course->id)->with('success', 'Course created! Now build your curriculum.');
    }

    public function edit(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $course->load('sections.lessons');

        return Inertia::render('Admin/Courses/Curriculum', [
            'course' => $course,
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Course $course)
    {
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'price' => 'numeric|min:0',
            'thumbnail' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'difficulty' => 'required|in:Beginner,Intermediate,Advanced,All Levels',
            'requirements' => 'nullable|string',
            'what_you_will_learn' => 'nullable|string'
        ]);

        $course->update($validated);

        return back()->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $course->delete();

        return redirect()->route('admin.courses.index')->with('success', 'Course deleted.');
    }
}
