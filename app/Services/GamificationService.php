<?php

namespace App\Services;

use App\Models\User;
use App\Models\Badge;
use Illuminate\Support\Carbon;

class GamificationService
{
    public function awardXP(User $user, int $amount)
    {
        $user->increment('xp', $amount);
        $this->updateStreak($user);
        $this->checkBadges($user);
    }

    public function updateStreak(User $user)
    {
        $today = Carbon::today();
        $lastActivity = $user->last_activity_date ? Carbon::parse($user->last_activity_date)->startOfDay() : null;

        if (!$lastActivity) {
            $user->streak_count = 1;
        } elseif ($lastActivity->eq($today->copy()->subDay())) {
            // Activity was yesterday, increment streak
            $user->streak_count += 1;
        } elseif ($lastActivity->lt($today->copy()->subDay())) {
            // Activity was older than yesterday, reset streak
            $user->streak_count = 1;
        }
        // If lastActivity is today, do nothing (streak already counted)

        $user->last_activity_date = $today;
        $user->save();
    }

    public function checkBadges(User $user)
    {
        $earnedBadgeIds = $user->badges()->pluck('badges.id')->toArray();
        $availableBadges = Badge::whereNotIn('id', $earnedBadgeIds)->get();

        foreach ($availableBadges as $badge) {
            $shouldAward = false;

            switch ($badge->trigger_type) {
                case 'streak_days':
                    if ($user->streak_count >= $badge->required_count) {
                        $shouldAward = true;
                    }
                    break;
                case 'xp_earned':
                    if ($user->xp >= $badge->required_count) {
                        $shouldAward = true;
                    }
                    break;
                case 'lessons_completed':
                    // Count completed lessons for the user
                    $completedLessons = \Illuminate\Support\Facades\DB::table('progress')
                        ->join('enrollments', 'progress.enrollment_id', '=', 'enrollments.id')
                        ->where('enrollments.student_id', $user->id)
                        ->where('progress.is_completed', true)
                        ->count();
                        
                    if ($completedLessons >= $badge->required_count) {
                        $shouldAward = true;
                    }
                    break;
            }

            if ($shouldAward) {
                $user->badges()->attach($badge->id, ['earned_at' => now()]);
            }
        }
    }
}
