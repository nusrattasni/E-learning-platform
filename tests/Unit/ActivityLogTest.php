<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use App\Models\ActivityLog;

class ActivityLogTest extends TestCase
{
    use RefreshDatabase;

    public function test_creating_a_course_logs_activity(): void
    {
        $instructor = User::factory()->create(['role' => 'instructor']);
        $this->actingAs($instructor); // Set Auth::id()

        $category = Category::create(['name' => 'Web Dev', 'slug' => 'web-dev-1']);

        $course = Course::create([
            'title' => 'Audit Test Course',
            'description' => 'Testing logs',
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'price' => 10.00,
            'status' => 'draft',
        ]);

        $this->assertDatabaseHas('activity_logs', [
            'user_id' => $instructor->id,
            'action' => 'created',
            'auditable_type' => Course::class,
            'auditable_id' => $course->id,
        ]);
    }

    public function test_updating_a_course_logs_changes(): void
    {
        $instructor = User::factory()->create(['role' => 'instructor']);
        $this->actingAs($instructor);

        $category = Category::create(['name' => 'Web Dev 2', 'slug' => 'web-dev-2']);

        $course = Course::create([
            'title' => 'Original Title',
            'description' => 'Testing logs',
            'instructor_id' => $instructor->id,
            'category_id' => $category->id,
            'price' => 10.00,
            'status' => 'draft',
        ]);

        $course->update(['title' => 'Updated Title']);

        // Check if an 'updated' log was created
        $log = ActivityLog::where('action', 'updated')->where('auditable_id', $course->id)->first();
        
        $this->assertNotNull($log);
        $this->assertEquals('Original Title', $log->changes['before']['title']);
        $this->assertEquals('Updated Title', $log->changes['after']['title']);
    }
}
