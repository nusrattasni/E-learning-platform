import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    DollarSign, Users, Star, TrendingUp, 
    ShoppingCart, MessageSquare, BarChart3, Package, Trophy
} from 'lucide-react';

export default function InstructorDashboard({ 
    auth, stats, topCourses, recentReviews, recentSales 
}) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-3xl text-slate-900 tracking-tight">Instructor Overview</h2>
                        <p className="text-slate-500 mt-1">Here's what's happening with your courses today.</p>
                    </div>
                    <Link href={route('admin.courses.index')} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                        Manage Courses
                    </Link>
                </div>
            }
        >
            <Head title="Instructor Dashboard" />

            <div className="py-8 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Top KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Total Revenue</p>
                                    <h3 className="text-3xl font-black text-slate-900">${stats.revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 relative z-10">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+12.5%</span>
                                <span className="text-slate-400 ml-2">from last month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Total Students</p>
                                    <h3 className="text-3xl font-black text-slate-900">{stats.students}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 relative z-10">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>+8.2%</span>
                                <span className="text-slate-400 ml-2">from last month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Average Rating</p>
                                    <h3 className="text-3xl font-black text-slate-900">{stats.rating}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                    <Star className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm font-medium text-amber-600 relative z-10">
                                <Star className="w-4 h-4 mr-1 fill-current" />
                                <span>Top Rated</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Monthly Enrollments</p>
                                    <h3 className="text-3xl font-black text-slate-900">{stats.monthlyEnrollments}</h3>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                                    <Package className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 relative z-10">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                <span>Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Revenue Chart (Mocked UI) */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-indigo-500" /> Revenue Overview
                                    </h3>
                                    <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500">
                                        <option>This Month</option>
                                        <option>Last Month</option>
                                        <option>This Year</option>
                                    </select>
                                </div>
                                
                                <div className="h-64 flex items-end justify-between gap-2 px-2">
                                    {/* Mocking bars */}
                                    {[30, 45, 25, 60, 75, 40, 90, 55, 80, 65, 100, 85].map((val, i) => (
                                        <div key={i} className="flex flex-col items-center flex-1 group">
                                            <div className="w-full relative flex justify-center h-56 items-end">
                                                <div 
                                                    className="w-full max-w-[30px] bg-indigo-100 rounded-t-sm group-hover:bg-indigo-500 transition-colors duration-300 relative"
                                                    style={{ height: `${val}%` }}
                                                >
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        ${val * 10}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 mt-2">W{i+1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Sales Table */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-emerald-500" /> Recent Sales
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                                            <tr>
                                                <th className="py-3 px-4 rounded-l-lg">Course</th>
                                                <th className="py-3 px-4">Student</th>
                                                <th className="py-3 px-4">Date</th>
                                                <th className="py-3 px-4 text-right rounded-r-lg">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {recentSales.map((sale) => (
                                                <tr key={sale.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 px-4 font-medium text-slate-900">{sale.course}</td>
                                                    <td className="py-3 px-4 text-slate-600">{sale.buyer}</td>
                                                    <td className="py-3 px-4 text-slate-500 text-xs">{sale.date}</td>
                                                    <td className="py-3 px-4 text-right font-bold text-emerald-600">${sale.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar Column */}
                        <div className="space-y-8">
                            
                            {/* Top Courses */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <Trophy className="w-4 h-4 text-yellow-500" /> Top Courses
                                </h3>
                                {topCourses.length > 0 ? (
                                    <div className="space-y-4">
                                        {topCourses.map((course, i) => (
                                            <div key={course.id} className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center shrink-0 text-xs">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-slate-900 truncate">{course.title}</h4>
                                                    <p className="text-xs text-slate-500">{course.enrollments_count} Enrollments</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm">No courses yet.</p>
                                )}
                            </div>

                            {/* Recent Reviews */}
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wider">
                                    <MessageSquare className="w-4 h-4 text-blue-500" /> Recent Reviews
                                </h3>
                                {recentReviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentReviews.map(review => (
                                            <div key={review.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-sm text-slate-900">{review.user?.name}</span>
                                                    <div className="flex text-amber-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-indigo-600 font-medium mb-1 truncate">{review.course?.title}</p>
                                                <p className="text-sm text-slate-600 italic line-clamp-3">"{review.comment}"</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 text-sm">No reviews yet.</p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
