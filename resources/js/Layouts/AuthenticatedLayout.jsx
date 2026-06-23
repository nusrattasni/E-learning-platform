import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Home, BookOpen, Target, Award, Heart, Settings, Flame, Star, Trophy, Bell } from 'lucide-react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const sidebarLinks = [
        { name: 'Dashboard', icon: <Home className="w-5 h-5" />, route: 'dashboard', active: route().current('dashboard') },
        { name: 'Course Catalog', icon: <BookOpen className="w-5 h-5" />, route: 'courses.index', active: route().current('courses.index') },
        { name: 'My Learning', icon: <Target className="w-5 h-5" />, route: 'my-courses', active: route().current('my-courses') },
        { name: 'Certificates', icon: <Award className="w-5 h-5" />, route: 'certificates', active: route().current('certificates') },
        { name: 'Wishlist', icon: <Heart className="w-5 h-5" />, route: 'wishlist', active: route().current('wishlist') },
        { name: 'Settings', icon: <Settings className="w-5 h-5" />, route: 'profile.edit', active: route().current('profile.edit') },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex-col fixed inset-y-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="h-16 flex items-center px-6 border-b border-gray-200/50">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            C
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gradient">CodeAcademy</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
                    <div className="space-y-1">
                        {sidebarLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={route(link.route)}
                                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    link.active 
                                        ? 'bg-indigo-50/80 text-indigo-700 shadow-sm' 
                                        : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'
                                }`}
                            >
                                <span className={`transition-all duration-300 group-hover:scale-110 ${link.active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`}>
                                    {link.icon}
                                </span>
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div>
                        <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Categories</h3>
                        <div className="space-y-1">
                            {['Web Development', 'Data Science', 'AI & ML', 'Cyber Security', 'Mobile Dev'].map((cat, i) => (
                                <Link
                                    key={i}
                                    href={route('courses.index', { category: cat })}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Bottom Profile Area in Sidebar */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-w-0">
                
                {/* Top Navbar (Mobile menu toggle + Right Side Actions) */}
                <nav className="glass sticky top-0 z-30 border-b-0 border-gray-200/50">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            
                            {/* Left side: Mobile Hamburger & Logo */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <Link href="/" className="ml-3 flex items-center">
                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
                                        L
                                    </div>
                                </Link>
                            </div>

                            {/* Center/Spacer and Gamification Header */}
                            <div className="hidden md:flex flex-1 items-center justify-end px-4">
                                <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 shadow-sm">
                                    <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" title={`${user?.streak_count || 0} Day Streak`}>
                                        <Flame className={`w-4 h-4 ${user?.streak_count > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-400'}`} />
                                        <span className="text-sm font-bold text-gray-700">{user?.streak_count || 0}</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" title={`${user?.xp || 0} XP`}>
                                        <Star className={`w-4 h-4 ${user?.xp > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
                                        <span className="text-sm font-bold text-gray-700">{user?.xp || 0}</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-300"></div>
                                    <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" title={`Level ${Math.floor((user?.xp || 0) / 100) + 1}`}>
                                        <Trophy className="w-4 h-4 text-amber-600 fill-amber-600" />
                                        <span className="text-sm font-bold text-gray-700">Lvl {Math.floor((user?.xp || 0) / 100) + 1}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right side: Notifications & Profile */}
                            <div className="hidden sm:flex sm:items-center sm:ms-2">
                                {/* Notifications Bell */}
                                <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors mr-2">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                                    </span>
                                </button>
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user?.name}
                                                    <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {user?.role === 'admin' || user?.role === 'instructor' ? (
                                                <Dropdown.Link href={route('admin.courses.index')}>
                                                    Instructor Dashboard
                                                </Dropdown.Link>
                                            ) : null}
                                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-white border-t border-gray-200 absolute w-full'}>
                        <div className="pt-2 pb-3 space-y-1">
                            {sidebarLinks.map((link, idx) => (
                                <ResponsiveNavLink key={idx} href={route(link.route)} active={link.active}>
                                    <span className="mr-2">{link.icon}</span> {link.name}
                                </ResponsiveNavLink>
                            ))}
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{user?.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user?.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('logout')} method="post" as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow-sm border-b border-gray-200">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
