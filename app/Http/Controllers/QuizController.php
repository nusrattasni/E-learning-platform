<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Lesson;
use App\Models\Enrollment;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function submit(Lesson $lesson, Request $request)
    {
        $request->validate([
            'answers' => 'required|array',
            'enrollment_id' => 'required|exists:enrollments,id'
        ]);

        $quiz = $lesson->quiz;
        if (!$quiz) {
            return response()->json(['error' => 'This lesson does not have a quiz.'], 400);
        }

        $questions = $quiz->questions;
        $score = 0;
        $total = count($questions);
        $results = [];

        foreach ($questions as $index => $q) {
            $userAnswer = isset($request->answers[$index]) ? (int)$request->answers[$index] : -1;
            $correctAnswer = (int)$q['correct'];
            $isCorrect = $userAnswer === $correctAnswer;

            if ($isCorrect) {
                $score++;
            }

            $results[$index] = [
                'correct' => $isCorrect,
                'correct_option' => $correctAnswer,
                'user_answer' => $userAnswer,
            ];
        }

        $percentage = ($score / $total) * 100;
        $passed = $percentage >= $quiz->passing_score;

        if ($passed) {
            // Mark lesson complete
            $enrollment = Enrollment::where('id', $request->enrollment_id)->where('student_id', auth()->id())->firstOrFail();
            
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

            // Re-use completeLesson logic to generate certificate if all done
            $response = app(\App\Http\Controllers\LearningController::class)->completeLesson($lesson, $request);
            
            return back()->with('success', "You passed the quiz with $percentage%!")->with('quiz_passed', true)->with('quiz_results', $results);
        }

        return back()->with('error', "You scored $percentage%. You need {$quiz->passing_score}% to pass. Please try again.")->with('quiz_failed', true)->with('quiz_score', $percentage)->with('quiz_results', $results);
    }
}
