<?php
use App\Models\Course;
use App\Models\Category;
use App\Models\User;

$user = User::first();
if (!$user) { echo "No user found.\n"; exit; }

$mockCourses = [
    [
        'title' => 'Python for Data Science Bootcamp',
        'cat' => 'Data Science',
        'difficulty' => 'Beginner',
        'price' => 59.99,
        'thumbnail' => '/images/course-2.png'
    ],
    [
        'title' => 'Complete Machine Learning A-Z',
        'cat' => 'AI & Machine Learning',
        'difficulty' => 'Intermediate',
        'price' => 89.99,
        'thumbnail' => '/images/course-3.png'
    ],
    [
        'title' => 'Ethical Hacking: Zero to Mastery',
        'cat' => 'Cyber Security',
        'difficulty' => 'All Levels',
        'price' => 39.99,
        'thumbnail' => '/images/course-4.png'
    ],
    [
        'title' => 'Mastering System Design',
        'cat' => 'Programming',
        'difficulty' => 'Advanced',
        'price' => 99.99,
        'thumbnail' => '/images/course-5.png'
    ],
    [
        'title' => 'UI/UX Design Masterclass',
        'cat' => 'Design',
        'difficulty' => 'Beginner',
        'price' => 29.99,
        'thumbnail' => '/images/course-6.png'
    ]
];

foreach ($mockCourses as $c) {
    $cat = Category::firstOrCreate(['name' => $c['cat'], 'slug' => \Illuminate\Support\Str::slug($c['cat'])]);
    Course::firstOrCreate(
        ['title' => $c['title']],
        [
            'description' => 'A comprehensive course on ' . $c['title'],
            'price' => $c['price'],
            'category_id' => $cat->id,
            'instructor_id' => $user->id,
            'difficulty' => $c['difficulty'],
            'what_you_will_learn' => "Master the basics\nBuild real projects\nGet hired",
            'requirements' => "No prior knowledge required",
            'thumbnail' => $c['thumbnail']
        ]
    );
}

echo "All mock courses seeded!\n";
