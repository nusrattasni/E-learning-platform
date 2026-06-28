<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    public function test_students_cannot_create_courses(): void
    {
        $student = User::factory()->create(['role' => 'student']);

        $response = $this->actingAs($student)->post('/admin/courses', [
            'title' => 'Test Course',
            'description' => 'Test Description',
            'price' => 10.99,
            'difficulty' => 'Beginner',
            'status' => 'draft',
        ]);

        $response->assertStatus(403);
    }

    public function test_instructors_can_create_courses(): void
    {
        $instructor = User::factory()->create(['role' => 'instructor']);
        $category = Category::create(['name' => 'Web Dev', 'slug' => 'web-dev']);

        $response = $this->actingAs($instructor)->post('/admin/courses', [
            'title' => 'My New React Course',
            'description' => 'A comprehensive guide to React.',
            'category_id' => $category->id,
            'price' => 49.99,
            'difficulty' => 'Beginner',
            'status' => 'published',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('courses', [
            'title' => 'My New React Course',
            'instructor_id' => $instructor->id,
            'price' => 49.99
        ]);
    }
}
