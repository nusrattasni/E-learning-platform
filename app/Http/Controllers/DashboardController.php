<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Enrollment;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function myCourses()
    {
        $enrollments = Enrollment::with(['course.instructor', 'course.category', 'course.sections.lessons'])
            ->where('student_id', auth()->id())
            ->orderByDesc('created_at')
            ->get();

        // Calculate progress for each enrollment
        $coursesWithProgress = $enrollments->map(function ($enrollment) {
            $totalLessons = $enrollment->course->sections->sum(function($section) {
                return $section->lessons->count();
            });

            $completedLessons = DB::table('progress')
                ->where('enrollment_id', $enrollment->id)
                ->where('is_completed', true)
                ->count();

            $progressPercentage = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

            return [
                'enrollment_id' => $enrollment->id,
                'course' => $enrollment->course,
                'progress' => $progressPercentage,
                'completed_at' => $enrollment->completed_at,
            ];
        });

        $inProgress = $coursesWithProgress->filter(fn($c) => is_null($c['completed_at']))->values();
        $completed = $coursesWithProgress->filter(fn($c) => !is_null($c['completed_at']))->values();

        return Inertia::render('Courses/MyLearning', [
            'inProgress' => $inProgress,
            'completed' => $completed,
        ]);
    }
}
