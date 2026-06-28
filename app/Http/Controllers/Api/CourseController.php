<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::with(['instructor', 'category'])
            ->withCount('reviews')
            ->get();

        return response()->json([
            'data' => $courses
        ]);
    }

    public function show($id)
    {
        $course = Course::with(['instructor', 'category', 'sections.lessons'])->findOrFail($id);

        return response()->json([
            'data' => $course
        ]);
    }
}
