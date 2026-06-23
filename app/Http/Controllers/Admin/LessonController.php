<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Section;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function store(Request $request, Section $section)
    {
        $course = $section->course;
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:video,text,interactive_code,quiz',
            'video_url' => 'nullable|string',
            'content' => 'nullable|string',
            'is_free_preview' => 'boolean',
            'order' => 'integer',
            'quiz' => 'nullable|array'
        ]);

        $lessonData = \Illuminate\Support\Arr::except($validated, ['quiz']);
        $lesson = $section->lessons()->create($lessonData);

        if ($validated['type'] === 'quiz' && !empty($validated['quiz'])) {
            $quiz = \App\Models\Quiz::create([
                'course_id' => $course->id,
                'title' => $lesson->title,
                'questions' => $validated['quiz']['questions'] ?? [],
                'passing_score' => $validated['quiz']['passing_score'] ?? 80,
            ]);
            $lesson->update(['quiz_id' => $quiz->id]);
        }

        return back()->with('success', 'Lesson added successfully.');
    }

    public function update(Request $request, Lesson $lesson)
    {
        $course = $lesson->section->course;
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:video,text,interactive_code,quiz',
            'video_url' => 'nullable|string',
            'content' => 'nullable|string',
            'is_free_preview' => 'boolean',
            'order' => 'integer',
            'quiz' => 'nullable|array'
        ]);

        $lessonData = \Illuminate\Support\Arr::except($validated, ['quiz']);
        $lesson->update($lessonData);

        if ($validated['type'] === 'quiz' && !empty($validated['quiz'])) {
            if ($lesson->quiz_id) {
                $lesson->quiz->update([
                    'title' => $lesson->title,
                    'questions' => $validated['quiz']['questions'] ?? [],
                    'passing_score' => $validated['quiz']['passing_score'] ?? 80,
                ]);
            } else {
                $quiz = \App\Models\Quiz::create([
                    'course_id' => $course->id,
                    'title' => $lesson->title,
                    'questions' => $validated['quiz']['questions'] ?? [],
                    'passing_score' => $validated['quiz']['passing_score'] ?? 80,
                ]);
                $lesson->update(['quiz_id' => $quiz->id]);
            }
        }

        return back()->with('success', 'Lesson updated successfully.');
    }

    public function destroy(Lesson $lesson)
    {
        $course = $lesson->section->course;
        if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
            abort(403);
        }

        if ($lesson->quiz_id) {
            $lesson->quiz()->delete();
        }
        $lesson->delete();

        return back()->with('success', 'Lesson deleted.');
    }
}
