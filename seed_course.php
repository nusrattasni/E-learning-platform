<?php
use App\Models\Course;
use App\Models\Category;
use App\Models\User;
use App\Models\Section;
use App\Models\Lesson;

$cat = Category::firstOrCreate(['name' => 'Web Development', 'slug' => 'web-dev']);
$user = User::first();

if (!$user) {
    echo "No user found to assign as instructor.\n";
    exit;
}

$course = Course::firstOrCreate(
    ['title' => 'Advanced React Patterns'],
    [
        'description' => 'Master React hooks, context, and performance optimization.',
        'price' => 49.99,
        'category_id' => $cat->id,
        'instructor_id' => $user->id,
        'difficulty' => 'Advanced',
        'what_you_will_learn' => "Build reusable components\nUnderstand React Context\nImplement Custom Hooks\nOptimize React Performance",
        'requirements' => "Basic understanding of JavaScript\nBasic React knowledge",
        'thumbnail' => '/images/course-1.png'
    ]
);

$section1 = Section::firstOrCreate([
    'course_id' => $course->id,
    'title' => 'Introduction to Patterns',
    'order' => 1
]);

Lesson::firstOrCreate([
    'section_id' => $section1->id,
    'title' => 'Why Patterns Matter',
    'type' => 'video',
    'video_url' => 'https://www.youtube.com/watch?v=123456',
    'content' => 'Patterns help us write clean, scalable code.',
    'order' => 1
]);

Lesson::firstOrCreate([
    'section_id' => $section1->id,
    'title' => 'The Compound Component Pattern',
    'type' => 'video',
    'video_url' => 'https://www.youtube.com/watch?v=7891011',
    'content' => 'Compound components are great for flexible UI.',
    'order' => 2
]);

echo "Database seeded with mock course!\n";
