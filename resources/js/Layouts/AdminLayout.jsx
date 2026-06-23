import { Link } from '@inertiajs/react';
import { BookOpen, MonitorPlay, Users, Settings, LogOut, ArrowLeft } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';

export default function AdminLayout({ user, header, children }) {
    const sidebarLinks = [
        { name: 'Back to Student View', icon: <ArrowLeft className="w-5 h-5" />, route: 'dashboard', active: false },
        { name: 'Manage Courses', icon: <MonitorPlay className="w-5 h-5" />, route: 'admin.courses.index', active: route().current('admin.courses.*') },
        // { name: 'Analytics', icon: <Users className="w-5 h-5" />, route: '#', active: false },
        // { name: 'Settings', icon: <Settings className="w-5 h-5" />, route: '#', active: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 glass-dark text-white flex-shrink-0 hidden md:flex md:flex-col fixed h-full z-10">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <MonitorPlay className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">Instructor<span className="text-gradient-dark">Hub</span></span>
                </div>

                <nav className="mt-6 flex-1 px-4 space-y-2">
                    {sidebarLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.route === '#' ? '#' : route(link.route)}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                link.active
                                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                                    : 'text-gray-400 hover:bg-slate-800/50 hover:text-white border border-transparent hover:border-slate-700/50'
                            }`}
                        >
                            <span className={`transition-all duration-300 group-hover:scale-110 ${link.active ? 'text-indigo-400' : 'text-gray-400 group-hover:text-indigo-400'}`}>{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                            <p className="text-xs text-indigo-300 truncate capitalize font-medium">{user.role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                <header className="glass sticky top-0 z-30 border-b border-gray-200/50 shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        {header}
                        <div className="flex items-center gap-4">
                            <Link href={route('logout')} method="post" as="button" className="text-sm font-medium text-gray-500 hover:text-gray-700 transition flex items-center gap-2">
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
