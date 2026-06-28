<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;

class AvatarController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048'],
        ]);

        $user = $request->user();

        // Delete old avatar if exists
        if ($user->avatar_path && Storage::disk('public')->exists($user->avatar_path)) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        // Store new securely
        $path = $request->file('avatar')->store('avatars', 'public');

        $user->update([
            'avatar_path' => $path
        ]);

        return Redirect::back()->with('status', 'avatar-updated');
    }
}
