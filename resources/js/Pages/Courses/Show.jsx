import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Clock, Star, Users, BarChart, CheckCircle, Video, FileText, PlayCircle } from 'lucide-react';

export default function Show({ auth, course, totalLessons, isEnrolled, hasReviewed, averageRating, reviewCount }) {
    const { post, processing } = useForm();

    const handleEnroll = () => {
        post(route('courses.enroll', course.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={course.title} />

            {/* Premium Hero Section */}
            <div className="bg-slate-900 text-white pt-16 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-slate-900 to-slate-900"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
                                {course.category?.name || 'Category'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-300 mb-8">
                            <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> {averageRating > 0 ? averageRating : 'New'} ({reviewCount} reviews)</div>
                            <div className="flex items-center gap-2"><Users className="w-5 h-5 text-slate-400" /> 3,450 students</div>
                            <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400" /> 14.5 hours</div>
                            <div className="flex items-center gap-2"><BarChart className="w-5 h-5 text-slate-400" /> {course.difficulty}</div>
                        </div>

                        <div className="flex items-center gap-4">
                            {isEnrolled ? (
                                <Link href={route('courses.learn', course.id)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 flex items-center gap-2 text-lg">
                                    <PlayCircle className="w-6 h-6" /> Continue Learning
                                </Link>
                            ) : (
                                <button onClick={handleEnroll} disabled={processing} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 flex items-center gap-2 text-lg disabled:opacity-50">
                                    Enroll for ${course.price > 0 ? course.price : 'Free'}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group">
                            {course.thumbnail ? (
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover aspect-video" />
                            ) : (
                                <div className="w-full aspect-video bg-slate-800 flex items-center justify-center">
                                    <Video className="w-16 h-16 text-slate-600" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-indigo-900/20 group-hover:bg-transparent transition-all duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* What you'll learn */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">What you'll learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {course.what_you_will_learn ? (
                                course.what_you_will_learn.split('\n').map((point, i) => point.trim() && (
                                    <div key={i} className="flex gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700">{point}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Master the core concepts of this subject.</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Requirements */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Requirements</h2>
                        <ul className="list-disc pl-5 space-y-2 text-slate-700">
                            {course.requirements ? (
                                course.requirements.split('\n').map((req, i) => req.trim() && <li key={i}>{req}</li>)
                            ) : (
                                <li>No prior experience required.</li>
                            )}
                        </ul>
                    </section>

                    {/* Curriculum */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Curriculum</h2>
                            <span className="text-slate-500 font-medium">{course.sections.length} sections • {totalLessons} lessons</span>
                        </div>
                        
                        <div className="space-y-4">
                            {course.sections.map((section, index) => (
                                <div key={section.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-900">Module {index + 1}: {section.title}</h3>
                                        <span className="text-sm text-slate-500">{section.lessons.length} lessons</span>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {section.lessons.map(lesson => (
                                            <div key={lesson.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                                {lesson.type === 'video' ? <Video className="w-5 h-5 text-indigo-400" /> : <FileText className="w-5 h-5 text-emerald-400" />}
                                                <span className="font-medium text-slate-700 flex-1">{lesson.title}</span>
                                                <span className="text-sm text-slate-400">03:45</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Student Reviews</h2>
                        
                        {isEnrolled && !hasReviewed && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                                <h3 className="font-bold text-lg mb-4">Leave a Review</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    post(route('reviews.store', course.id), {
                                        data: {
                                            rating: formData.get('rating'),
                                            comment: formData.get('comment')
                                        },
                                        onSuccess: () => e.target.reset()
                                    });
                                }} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <select name="rating" required className="w-full sm:w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                            <option value="5">5 - Excellent</option>
                                            <option value="4">4 - Good</option>
                                            <option value="3">3 - Average</option>
                                            <option value="2">2 - Poor</option>
                                            <option value="1">1 - Terrible</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                        <textarea name="comment" rows="3" className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="What did you think of the course?"></textarea>
                                    </div>
                                    <button type="submit" disabled={processing} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="space-y-6">
                            {course.reviews && course.reviews.length > 0 ? (
                                course.reviews.map(review => (
                                    <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                                                {review.user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{review.user?.name}</h4>
                                                <div className="flex text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {review.comment && <p className="text-slate-700">{review.comment}</p>}
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 italic">No reviews yet. Be the first to review this course!</p>
                            )}
                        </div>
                    </section>

                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Your Instructor</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                                {course.instructor?.name?.charAt(0) || 'I'}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{course.instructor?.name || 'Instructor'}</h4>
                                <p className="text-sm text-slate-500">Senior Developer</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-6">Passionate teacher with 10+ years of industry experience building scalable applications.</p>
                        
                        <div className="border-t border-slate-100 pt-6">
                            <div className="text-2xl font-bold text-slate-900 mb-4">${course.price}</div>
                            {isEnrolled ? (
                                <Link href={route('courses.learn', course.id)} className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md">
                                    Go to Course
                                </Link>
                            ) : (
                                <button onClick={handleEnroll} disabled={processing} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md">
                                    Enroll Now
                                </button>
                            )}
                            <p className="text-center text-xs text-slate-500 mt-4">30-day money-back guarantee</p>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
