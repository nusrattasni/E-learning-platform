import { Link, Head } from '@inertiajs/react';

export default function Home({ canLogin, canRegister }) {
    return (
        <>
            <Head title="Welcome to the Ultimate LMS" />
            
            {/* Main Wrapper with Dark Premium Gradient Background */}
            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
                
                {/* Navigation */}
                <nav className="fixed w-full z-50 top-0 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                                    L
                                </div>
                                <span className="font-bold text-xl tracking-tight">CodeAcademy</span>
                            </div>

                            {/* Auth Links */}
                            <div className="flex items-center space-x-4">
                                {canLogin ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="font-semibold text-slate-300 hover:text-white transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="font-medium text-slate-300 hover:text-white transition-colors"
                                        >
                                            Log in
                                        </Link>

                                        {canRegister && (
                                            <Link
                                                href={route('register')}
                                                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:scale-105"
                                            >
                                                Start for free
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-indigo-400 mb-8 animate-fade-in-up">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                            New Interactive Coding Courses Available
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                            Master Coding <br className="hidden md:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Right in Your Browser
                            </span>
                        </h1>
                        
                        <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-400 mx-auto mb-10">
                            Learn by doing. Our DataCamp-style interactive environment lets you write, run, and test real code immediately. No setup required.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Start Learning Now
                                </Link>
                            )}
                            <a
                                href="#features"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-slate-700 text-lg font-medium rounded-full text-slate-300 bg-slate-900/50 hover:bg-slate-800 backdrop-blur-sm transition-all duration-300"
                            >
                                Explore Curriculum
                            </a>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section id="features" className="py-20 bg-slate-950/50 border-t border-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Why learn with us?</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">We bridge the gap between theory and practice using state-of-the-art interactive technology.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Interactive Editor</h3>
                                <p className="text-slate-400">Write code in our VS Code-powered browser editor. Get instant feedback and automated grading on every keystroke.</p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Project-Based</h3>
                                <p className="text-slate-400">Don't just watch videos. Build real-world projects from scratch to build a portfolio that stands out to employers.</p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">Expert Support</h3>
                                <p className="text-slate-400">Stuck on a bug? Get hints and step-by-step guidance. Our system tells you exactly what went wrong and how to fix it.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Footer */}
                <footer className="py-8 border-t border-slate-900 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} CodeAcademy LMS. All rights reserved.</p>
                </footer>
            </div>
            
            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </>
    );
}
