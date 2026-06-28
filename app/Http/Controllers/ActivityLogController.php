<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ActivityLog;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        
        // If admin, show all logs. If student/instructor, show only their logs.
        // Or for portfolio simplicity: admin/instructor sees all, student sees own.
        $query = ActivityLog::with('user', 'auditable')->latest();

        if ($user->role === 'student') {
            $query->where('user_id', $user->id);
        }

        $logs = $query->paginate(20);

        return Inertia::render('ActivityLog/Index', [
            'logs' => $logs
        ]);
    }
}
