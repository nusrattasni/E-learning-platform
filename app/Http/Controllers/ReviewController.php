<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Course;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(Request $request, Course $course)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000'
        ]);

        // Check if enrolled
        $isEnrolled = $request->user()->enrollments()->where('course_id', $course->id)->exists();
        if (!$isEnrolled) {
            return back()->withErrors(['message' => 'You must be enrolled to leave a review.']);
        }

        // Check if already reviewed
        if ($course->reviews()->where('user_id', $request->user()->id)->exists()) {
            return back()->withErrors(['message' => 'You have already reviewed this course.']);
        }

        $course->reviews()->create([
            'user_id' => $request->user()->id,
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return back()->with('success', 'Review submitted successfully!');
    }
}
