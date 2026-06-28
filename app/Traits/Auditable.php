<?php

namespace App\Traits;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;

trait Auditable
{
    public static function bootAuditable()
    {
        static::created(function ($model) {
            $model->logActivity('created', $model->getAttributes());
        });

        static::updated(function ($model) {
            // Only log what actually changed
            $changes = $model->getDirty();
            if (!empty($changes)) {
                $model->logActivity('updated', [
                    'before' => array_intersect_key($model->getOriginal(), $changes),
                    'after' => $changes
                ]);
            }
        });

        static::deleted(function ($model) {
            $model->logActivity('deleted', $model->getAttributes());
        });
    }

    protected function logActivity($action, $changes = null)
    {
        ActivityLog::create([
            'user_id' => Auth::id(), // null if system or guest
            'action' => $action,
            'auditable_type' => get_class($this),
            'auditable_id' => $this->id,
            'changes' => $changes,
            'ip_address' => request()->ip()
        ]);
    }
}
