<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show');
    
    // Learning & Enrollment
    Route::post('/courses/{course}/enroll', [\App\Http\Controllers\LearningController::class, 'enroll'])->name('courses.enroll');
    Route::get('/courses/{course}/learn', [\App\Http\Controllers\LearningController::class, 'learn'])->name('courses.learn');
    Route::get('/secure-player/{token}', [\App\Http\Controllers\PlayerController::class, 'show'])->name('secure-player');
    
    Route::post('/lessons/{lesson}/complete', [\App\Http\Controllers\LearningController::class, 'completeLesson'])->name('lessons.complete');
    Route::post('/lessons/{lesson}/quiz', [\App\Http\Controllers\QuizController::class, 'submit'])->name('lessons.quiz.submit');
    Route::post('/lessons/{lesson}/discussions', [\App\Http\Controllers\DiscussionController::class, 'store'])->name('lessons.discussions.store');
    Route::post('/discussions/{discussion}/replies', [\App\Http\Controllers\DiscussionController::class, 'reply'])->name('discussions.replies.store');
    
    // Reviews
    Route::post('/courses/{course}/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');

    // My Learning & Certificates
    Route::get('/my-courses', [\App\Http\Controllers\DashboardController::class, 'myCourses'])->name('my-courses');
    Route::get('/certificates', [\App\Http\Controllers\CertificateController::class, 'index'])->name('certificates');
    Route::get('/certificates/{uuid}', [\App\Http\Controllers\CertificateController::class, 'show'])->name('certificates.show');

    // Sidebar Placeholder Routes
    Route::get('/challenges', function () { return Inertia::render('Challenges'); })->name('challenges');
    Route::get('/wishlist', function () { return Inertia::render('Wishlist'); })->name('wishlist');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/avatar', [\App\Http\Controllers\AvatarController::class, 'update'])->name('profile.avatar');
    
    Route::get('/activity-logs', [\App\Http\Controllers\ActivityLogController::class, 'index'])->name('activity-logs');
});

// Admin & Instructor Routes
Route::middleware(['auth', 'role:admin,instructor'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('courses', App\Http\Controllers\Admin\CourseController::class);
    Route::resource('courses.sections', App\Http\Controllers\Admin\SectionController::class)->shallow();
    Route::resource('sections.lessons', App\Http\Controllers\Admin\LessonController::class)->shallow();
});

require __DIR__.'/auth.php';
