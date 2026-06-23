import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PlayCircle, CheckCircle, Award, Target } from 'lucide-react';

export default function MyLearning({ auth, inProgress, completed }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Learning" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">My Learning</h1>
                    <p className="text-slate-500 text-lg">Pick up where you left off or review your completed courses.</p>
                </div>

                {/* In Progress */}
                <section className="mb-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-indigo-500" /> In Progress ({inProgress.length})
                    </h2>
                    
                    {inProgress.length === 0 ? (
                        <div className="bg-slate-50 rounded-2xl p-8 text-center border border-slate-200 border-dashed">
                            <p className="text-slate-500 mb-4">You don't have any courses in progress.</p>
                            <Link href={route('courses.index')} className="text-indigo-600 font-medium hover:text-indigo-700">Browse Courses →</Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inProgress.map(item => (
                                <div key={item.enrollment_id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                                    <div className="relative h-40 overflow-hidden bg-slate-100">
                                        <img src={item.course.thumbnail} alt={item.course.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex justify-between text-xs font-bold text-white mb-2">
                                                <span>{item.progress}% Complete</span>
                                            </div>
                                            <div className="w-full bg-white/30 rounded-full h-1.5 overflow-hidden backdrop-blur-sm">
                                                <div className="bg-indigo-400 h-1.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">{item.course.category?.name}</span>
                                        <h3 className="font-bold text-slate-900 leading-tight mb-4">{item.course.title}</h3>
                                        
                                        <div className="mt-auto">
                                            <Link href={route('courses.learn', item.course.id)} className="w-full bg-slate-100 hover:bg-indigo-50 text-indigo-600 font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                                <PlayCircle className="w-5 h-5" /> Resume Course
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Completed */}
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" /> Completed ({completed.length})
                    </h2>
                    
                    {completed.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {completed.map(item => (
                                <div key={item.enrollment_id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="relative h-40 overflow-hidden bg-slate-100">
                                        <img src={item.course.thumbnail} alt={item.course.title} className="w-full h-full object-cover grayscale" />
                                        <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-emerald-700 flex items-center gap-2 shadow-lg">
                                                <CheckCircle className="w-5 h-5" /> 100% Completed
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-bold text-slate-900 leading-tight mb-4">{item.course.title}</h3>
                                        <p className="text-sm text-slate-500 mb-6">Completed on {new Date(item.completed_at).toLocaleDateString()}</p>
                                        
                                        <div className="mt-auto flex gap-3">
                                            <Link href={route('courses.learn', item.course.id)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-center transition-colors text-sm">
                                                Review
                                            </Link>
                                            <Link href={route('certificates')} className="flex-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-sm border border-indigo-100">
                                                <Award className="w-4 h-4" /> Certificate
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
