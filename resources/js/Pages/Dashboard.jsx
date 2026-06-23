import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, userBadges = [], allBadges = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-2xl text-gray-900 tracking-tight">Welcome back, {auth.user.name}</h2>
                        <p className="text-gray-500 text-sm mt-1">Ready to continue your learning journey?</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={route('courses.index')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                            Browse All Courses
                        </Link>
                        <div className="relative hidden md:block">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </span>
                            <input type="text" placeholder="Search your courses..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all w-full md:w-64 shadow-sm" />
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Top Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Courses in Progress', value: '2', route: 'my-courses' },
                            { label: 'Completed Courses', value: '0', route: 'my-courses' },
                            { label: 'Learning Hours', value: '14.5', route: 'dashboard' },
                            { label: 'Certificates', value: '0', route: 'certificates' },
                        ].map((stat, i) => (
                            <Link key={i} href={route(stat.route)} className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer">
                                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1 group-hover:text-indigo-600 transition-colors">{stat.label}</p>
                                <p className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">{stat.value}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Continue Learning Section */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Continue Learning</h3>
                                </div>
                                
                                <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:border-indigo-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row group cursor-pointer">
                                    <div className="sm:w-1/3 relative h-48 sm:h-auto bg-gray-100">
                                        <img src="/images/course-1.png" alt="React Course" className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6 sm:w-2/3 flex flex-col justify-center relative">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">Web Development</span>
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors pr-16">Advanced React Patterns</h4>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 pr-16">Master compound components, render props, and custom hooks to build scalable applications.</p>
                                        
                                        <div className="text-xs text-gray-500">
                                            <span className="font-medium text-indigo-600">Up next:</span> Lesson 4: Custom Hooks
                                        </div>
                                        
                                        {/* Circular Progress Ring */}
                                        <div className="absolute top-6 right-6 w-14 h-14">
                                            <svg className="w-14 h-14 transform -rotate-90">
                                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100" />
                                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={24 * 2 * Math.PI} strokeDashoffset={24 * 2 * Math.PI * (1 - 0.65)} className="text-indigo-600 drop-shadow-sm transition-all duration-1000 ease-out" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <span className="text-xs font-bold text-gray-900 leading-none">65%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Recent Activity Feed */}
                            <section>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
                                    <div className="relative border-l border-gray-200 ml-3 space-y-6">
                                        
                                        <div className="relative pl-6">
                                            <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white"></span>
                                            <p className="text-sm font-medium text-gray-900">Completed "Variables in JavaScript"</p>
                                            <p className="text-xs text-gray-500 mt-0.5">2 hours ago in <span className="text-indigo-600 cursor-pointer hover:underline">Modern JavaScript From The Beginning</span></p>
                                        </div>

                                        <div className="relative pl-6">
                                            <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-yellow-400 ring-4 ring-white"></span>
                                            <p className="text-sm font-medium text-gray-900">Earned 50 XP</p>
                                            <p className="text-xs text-gray-500 mt-0.5">3 hours ago for a 3-day coding streak.</p>
                                        </div>

                                        <div className="relative pl-6">
                                            <span className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white"></span>
                                            <p className="text-sm font-medium text-gray-900">Started React Course</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Yesterday</p>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            {/* Achievements & Badges */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-gray-900">Achievements & Badges</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {allBadges.map((badge) => {
                                        const isEarned = userBadges.some(ub => ub.id === badge.id);
                                        return (
                                            <div key={badge.id} className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${isEarned ? 'bg-white border-emerald-200 shadow-sm shadow-emerald-100 hover:-translate-y-1' : 'bg-gray-50 border-gray-200 opacity-60 grayscale'}`}>
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner ${isEarned ? 'bg-gradient-to-br from-emerald-100 to-emerald-200' : 'bg-gray-200'}`}>
                                                    {badge.icon || '🏅'}
                                                </div>
                                                <h4 className={`text-sm font-bold ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>{badge.name}</h4>
                                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{badge.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <section>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended for you</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Fullstack Next.js Bootcamp', author: 'Sarah Drasner', img: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', students: '1.2k' },
                                        { title: 'Python for Data Science', author: 'Wes McKinney', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', students: '3.4k' }
                                    ].map((course, i) => (
                                        <div key={i} className="flex gap-4 group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-xl p-3 hover:border-gray-300 transition-colors">
                                            <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                                <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{course.title}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{course.author}</p>
                                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 font-medium">
                                                    <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                                                    {course.students} students
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg className="w-24 h-24 text-indigo-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-2">Pro Access</h3>
                                    <p className="text-indigo-900 font-medium mb-5">Upgrade to Pro to unlock 500+ interactive labs and live expert Q&A.</p>
                                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm">
                                        Upgrade Now
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
