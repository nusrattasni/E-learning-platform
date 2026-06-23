<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class LearningController extends Controller
{
    public function enroll(Course $course)
    {
        $user = auth()->user();

        // Check if already enrolled
        $enrollment = Enrollment::firstOrCreate([
            'student_id' => $user->id,
            'course_id' => $course->id,
        ]);

        return redirect()->route('courses.learn', $course->id);
    }

    public function learn(Course $course, Request $request)
    {
        $user = auth()->user();

        // Ensure user is enrolled
        $enrollment = Enrollment::where('student_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            return redirect()->route('courses.show', $course->id)
                ->with('error', 'You must enroll in this course first.');
        }

        // Load course structure
        $course->load(['sections.lessons.quiz']);

        // Fetch completed lesson IDs for this enrollment
        $completedLessonIds = DB::table('progress')
            ->where('enrollment_id', $enrollment->id)
            ->where('is_completed', true)
            ->pluck('lesson_id')
            ->toArray();

        // Determine the current lesson
        $currentLessonId = $request->query('lesson_id') ?? $request->lesson_id;
        $currentLesson = null;
        
        if ($currentLessonId) {
            $currentLesson = Lesson::with(['quiz', 'discussions.user', 'discussions.replies.user'])->find($currentLessonId);
        } else {
            // Find first incomplete lesson, or just the very first lesson
            foreach ($course->sections as $section) {
                foreach ($section->lessons as $lesson) {
                    if (!in_array($lesson->id, $completedLessonIds)) {
                        $currentLesson = $lesson;
                        break 2;
                    }
                }
            }
            // If all completed, just show the first lesson
            if (!$currentLesson && $course->sections->isNotEmpty() && $course->sections->first()->lessons->isNotEmpty()) {
                $currentLesson = $course->sections->first()->lessons->first();
            }
        }

        if ($currentLesson) {
            // Encrypt the video URL and hide the raw URL
            if ($currentLesson->video_url) {
                $currentLesson->encrypted_video_token = \Illuminate\Support\Facades\Crypt::encryptString($currentLesson->video_url);
            }
            $currentLesson->makeHidden('video_url');
        }

        return Inertia::render('Courses/Learn', [
            'course' => $course,
            'currentLesson' => $currentLesson,
            'completedLessonIds' => $completedLessonIds,
            'enrollmentId' => $enrollment->id
        ]);
    }

    public function completeLesson(Lesson $lesson, Request $request)
    {
        $request->validate([
            'enrollment_id' => 'required|exists:enrollments,id'
        ]);

        // Ensure the enrollment belongs to the auth user
        $enrollment = Enrollment::where('id', $request->enrollment_id)
            ->where('student_id', auth()->id())
            ->firstOrFail();

        $existingProgress = DB::table('progress')
            ->where('enrollment_id', $enrollment->id)
            ->where('lesson_id', $lesson->id)
            ->first();

        $wasNewlyCompleted = false;

        if (!$existingProgress || !$existingProgress->is_completed) {
            DB::table('progress')->updateOrInsert(
                [
                    'enrollment_id' => $enrollment->id,
                    'lesson_id' => $lesson->id,
                ],
                [
                    'is_completed' => true,
                    'updated_at' => now(),
                ]
            );
            $wasNewlyCompleted = true;
        }

        if ($wasNewlyCompleted) {
            $xpToAward = $lesson->type === 'quiz' ? 50 : 10;
            app(\App\Services\GamificationService::class)->awardXP(auth()->user(), $xpToAward);
        }

        // Check if all lessons are completed
        $course = Course::with('sections.lessons')->find($enrollment->course_id);
        $totalLessons = $course->sections->sum(function($section) {
            return $section->lessons->count();
        });

        $completedLessons = DB::table('progress')
            ->where('enrollment_id', $enrollment->id)
            ->where('is_completed', true)
            ->count();

        if ($completedLessons >= $totalLessons && is_null($enrollment->completed_at)) {
            // Mark enrollment as completed
            $enrollment->update(['completed_at' => now()]);

            // Generate Certificate
            \App\Models\Certificate::firstOrCreate([
                'user_id' => auth()->id(),
                'course_id' => $course->id,
            ]);
        }

        return redirect()->back();
    }
}
