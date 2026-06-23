<?php
use App\Models\Course;
use App\Models\Category;
use App\Models\User;

$user = User::first();
if (!$user) { echo "No user found.\n"; exit; }

$cat = Category::firstOrCreate([
    'name' => 'Mobile Dev', 
    'slug' => \Illuminate\Support\Str::slug('Mobile Dev')
]);

Course::firstOrCreate(
    ['title' => 'Flutter & Dart: The Complete Guide'],
    [
        'description' => 'A comprehensive course on building iOS and Android apps from a single codebase using Flutter.',
        'price' => 79.99,
        'category_id' => $cat->id,
        'instructor_id' => $user->id,
        'difficulty' => 'Beginner',
        'what_you_will_learn' => "Build beautiful native apps\nMaster Dart programming\nPublish to App Store & Google Play",
        'requirements' => "Basic programming knowledge is helpful but not required",
        'thumbnail' => '/images/course-1.png'
    ]
);

echo "Mobile Dev course seeded successfully!\n";
