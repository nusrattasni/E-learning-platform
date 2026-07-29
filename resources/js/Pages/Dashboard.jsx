import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Trophy, Flame, Target, BookOpen, Clock, Award, 
    CalendarDays, Star, TrendingUp, PlayCircle
} from 'lucide-react';

export default function Dashboard({ 
    auth, userBadges = [], allBadges = [], leaderboardPosition, 
    activeCourses = [], recentCertificates = [], weeklyProgress = [] 
}) {
    const user = auth.user;

    // Helper for calendar dots (mocking active days)
    const calendarDays = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        active: Math.random() > 0.6 // Randomly mock active days
    }));

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-3xl text-slate-900 tracking-tight">Welcome back, {user.name}! 👋</h2>
                        <p className="text-slate-500 mt-1">Let's continue your learning journey.</p>
                    </div>
                    <Link href={route('courses.index')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                        Browse Courses
                    </Link>
                </div>
            }
        >
            <Head title="Student Dashboard" />

            <div className="py-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Top Hero Stats (Streak, Leaderboard, Goal) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Daily Streak */}
                        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden group hover:-translate-y-1 transition-all">
                            <Flame className="absolute -right-6 -top-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <p className="text-orange-100 font-bold uppercase tracking-wider text-xs mb-1">Daily Streak</p>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-5xl font-black">{user.streak_count || 0}</h3>
                                    <span className="text-orange-100 font-medium mb-1">Days</span>
                                </div>
                                <p className="text-sm text-orange-50 mt-4">Keep it up! Log in tomorrow to maintain your streak.</p>
                            </div>
                        </div>

                        {/* Leaderboard Position */}
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-600/20 relative overflow-hidden group hover:-translate-y-1 transition-all">
                            <Trophy className="absolute -right-6 -top-6 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <p className="text-indigo-100 font-bold uppercase tracking-wider text-xs mb-1">Leaderboard Rank</p>
                                <div className="flex items-end gap-2">
                                    <h3 className="text-5xl font-black">#{leaderboardPosition || 1}</h3>
                                </div>
                                <p className="text-sm text-indigo-50 mt-4">Top 10% of learners this week. Excellent work!</p>
                            </div>
                        </div>

                        {/* Today's Goal */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-emerald-500" /> Today's Goal
                                    </p>
                                    <h3 className="text-xl font-bold text-slate-900 mt-2">Complete 1 Lesson</h3>
                                </div>
                                <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                        <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                        <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={26 * 2 * Math.PI} strokeDashoffset={26 * 2 * Math.PI * (1 - 0.5)} className="text-emerald-500" />
                                    </svg>
                                    <span className="font-bold text-slate-700 text-sm">50%</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4">You are halfway there! Watch one more video.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Weekly Progress */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-500" /> Weekly Progress (XP)
                                </h3>
                                <div className="flex items-end justify-between h-40 gap-2">
                                    {weeklyProgress.map((day, i) => (
                                        <div key={i} className="flex flex-col items-center flex-1 group">
                                            <div className="w-full relative flex justify-center h-32 items-end">
                                                <div 
                                                    className="w-full max-w-[40px] bg-indigo-100 rounded-t-lg group-hover:bg-indigo-500 transition-colors duration-300 relative"
                                                    style={{ height: `${Math.max(10, (day.xp / 200) * 100)}%` }}
                                                >
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {day.xp}XP
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 mt-2 uppercase">{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>



                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-8">
                            
                            {/* Learning Calendar */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <CalendarDays className="w-4 h-4 text-indigo-500" /> Learning Calendar
                                </h3>
                                <div className="grid grid-cols-7 gap-2">
                                    {['S','M','T','W','T','F','S'].map((d, i) => (
                                        <div key={i} className="text-center text-xs font-bold text-slate-400">{d}</div>
                                    ))}
                                    {calendarDays.map((day, i) => (
                                        <div 
                                            key={i} 
                                            className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium cursor-pointer transition-colors ${
                                                day.active ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                            }`}
                                        >
                                            {day.day}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Deadlines */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Clock className="w-4 h-4 text-orange-500" /> Upcoming Deadlines
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start p-3 rounded-xl bg-orange-50 border border-orange-100">
                                        <div className="bg-orange-100 text-orange-600 rounded-lg p-2 flex flex-col items-center justify-center min-w-[50px]">
                                            <span className="text-xs font-bold">OCT</span>
                                            <span className="text-lg font-black">24</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">React Final Project</h4>
                                            <p className="text-xs text-slate-500 mt-1">Submit your final code repository for grading.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="bg-slate-100 text-slate-600 rounded-lg p-2 flex flex-col items-center justify-center min-w-[50px]">
                                            <span className="text-xs font-bold">OCT</span>
                                            <span className="text-lg font-black">28</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">Python Quiz</h4>
                                            <p className="text-xs text-slate-500 mt-1">Module 4 assessment.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Certificates */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Award className="w-4 h-4 text-yellow-500" /> Recent Certificates
                                </h3>
                                {recentCertificates.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentCertificates.map(cert => (
                                            <Link key={cert.id} href={route('certificates.show', cert.certificate_id)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                                                    <Award className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{cert.course.title}</h4>
                                                    <p className="text-xs text-slate-500">Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                        <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">No certificates yet. Keep learning!</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
