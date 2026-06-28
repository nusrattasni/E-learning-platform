<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Enrollment;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if (in_array($user->role, ['admin', 'instructor'])) {
            // INSTRUCTOR DASHBOARD LOGIC
            $instructorCourses = \App\Models\Course::where('instructor_id', $user->id)->pluck('id');
            
            $totalStudents = Enrollment::whereIn('course_id', $instructorCourses)->distinct('student_id')->count('student_id');
            $monthlyEnrollments = Enrollment::whereIn('course_id', $instructorCourses)
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count();
            
            // Top courses
            $topCourses = \App\Models\Course::withCount('enrollments')
                ->where('instructor_id', $user->id)
                ->orderByDesc('enrollments_count')
                ->take(4)
                ->get();
                
            $recentReviews = \App\Models\Review::with(['user', 'course'])
                ->whereIn('course_id', $instructorCourses)
                ->orderByDesc('created_at')
                ->take(5)
                ->get();

            // Mocked Data
            $mockedRevenue = 4590.50;
            $mockedRating = 4.8;
            $mockedSales = [
                ['id' => 1, 'course' => 'Advanced React Patterns', 'buyer' => 'John Doe', 'amount' => 49.99, 'date' => now()->subHours(2)->diffForHumans()],
                ['id' => 2, 'course' => 'Python Bootcamp', 'buyer' => 'Sarah Smith', 'amount' => 59.99, 'date' => now()->subHours(5)->diffForHumans()],
                ['id' => 3, 'course' => 'UI/UX Masterclass', 'buyer' => 'Mike Johnson', 'amount' => 29.99, 'date' => now()->subDays(1)->diffForHumans()],
            ];

            return Inertia::render('InstructorDashboard', [
                'stats' => [
                    'revenue' => $mockedRevenue,
                    'students' => $totalStudents,
                    'rating' => $mockedRating,
                    'monthlyEnrollments' => $monthlyEnrollments
                ],
                'topCourses' => $topCourses,
                'recentReviews' => $recentReviews,
                'recentSales' => $mockedSales
            ]);
        }

        // STUDENT DASHBOARD LOGIC
        $user->load('badges');
        $allBadges = \App\Models\Badge::all();
        
        $leaderboardPosition = \App\Models\User::where('xp', '>', $user->xp)->count() + 1;
        
        $enrolledCourseIds = Enrollment::where('student_id', $user->id)->pluck('course_id');
        $recommendedCourses = \App\Models\Course::with('instructor')
            ->whereNotIn('id', $enrolledCourseIds)
            ->inRandomOrder()
            ->take(3)
            ->get();
            
        $recentCertificates = \App\Models\Certificate::with('course')
            ->where('user_id', $user->id)
            ->orderByDesc('issued_at')
            ->take(3)
            ->get();

        // Mocked Weekly Progress
        $weeklyProgress = [
            ['day' => 'Mon', 'xp' => 40],
            ['day' => 'Tue', 'xp' => 120],
            ['day' => 'Wed', 'xp' => 80],
            ['day' => 'Thu', 'xp' => 0],
            ['day' => 'Fri', 'xp' => 200],
            ['day' => 'Sat', 'xp' => 50],
            ['day' => 'Sun', 'xp' => 0],
        ];

        return Inertia::render('Dashboard', [
            'user' => $user,
            'userBadges' => $user->badges,
            'allBadges' => $allBadges,
            'leaderboardPosition' => $leaderboardPosition,
            'recommendedCourses' => $recommendedCourses,
            'recentCertificates' => $recentCertificates,
            'weeklyProgress' => $weeklyProgress,
        ]);
    }

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
