<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        // Fetch courses with their category, instructor, and reviews
        $query = Course::with(['category', 'instructor', 'reviews']);

        // Search filter
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category filter (by ID)
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Category filter (by name for mock data)
        if ($request->has('category')) {
            $query->whereHas('category', function($q) use ($request) {
                $q->where('name', $request->category);
            });
        }

        // Level filter (if we add a level column later, mock it for now)

        $courses = $query->paginate(12);

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'filters' => $request->only(['search', 'category_id', 'level', 'category'])
        ]);
    }

    public function show(Course $course)
    {
        $course->load(['instructor', 'category', 'sections.lessons', 'reviews.user']);
        
        // Count total lessons
        $totalLessons = $course->sections->sum(function($section) {
            return $section->lessons->count();
        });

        // Check enrollment
        $isEnrolled = false;
        $hasReviewed = false;
        if (auth()->check()) {
            $isEnrolled = auth()->user()->enrollments()->where('course_id', $course->id)->exists();
            $hasReviewed = $course->reviews()->where('user_id', auth()->id())->exists();
        }

        return Inertia::render('Courses/Show', [
            'course' => $course,
            'totalLessons' => $totalLessons,
            'isEnrolled' => $isEnrolled,
            'hasReviewed' => $hasReviewed,
            'averageRating' => $course->average_rating,
            'reviewCount' => $course->reviews->count(),
        ]);
    }
}
