<?php

namespace App\Http\Controllers;

use App\Models\Discussion;
use App\Models\Lesson;
use Illuminate\Http\Request;

class DiscussionController extends Controller
{
    public function store(Lesson $lesson, Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        $lesson->discussions()->create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return back()->with('success', 'Your question has been posted successfully!');
    }

    public function reply(Discussion $discussion, Request $request)
    {
        $request->validate([
            'body' => 'required|string',
        ]);

        $user = auth()->user();
        $isInstructor = in_array($user->role, ['instructor', 'admin']);

        $discussion->replies()->create([
            'user_id' => $user->id,
            'body' => $request->body,
            'is_instructor_reply' => $isInstructor,
        ]);

        return back()->with('success', 'Reply posted successfully!');
    }
}
