import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CourseCardSkeleton from '@/Components/CourseCardSkeleton';

export default function CourseCatalog({ auth, courses, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [category, setCategory] = useState(filters?.category || filters?.category_id || '');
    const [level, setLevel] = useState(filters?.level || '');
    const [isLoading, setIsLoading] = useState(true);

    // Simulate lazy loading when filters change
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // 800ms skeleton display
        return () => clearTimeout(timer);
    }, [search, category, level]);

    // For MVP demonstration, if courses.data is empty, we show premium mock data
    const mockCourses = [
        {
            id: 1,
            title: 'Advanced React Patterns & Best Practices',
            instructor: { name: 'Sarah Drasner' },
            category: { name: 'Web Development' },
            thumbnail: '/images/course-1.png',
            rating: 4.8,
            reviews: 1240,
            level: 'Advanced',
            duration: '18 Hours',
            lessons: 42
        },
        {
            id: 2,
            title: 'Python for Data Science Bootcamp',
            instructor: { name: 'Wes McKinney' },
            category: { name: 'Data Science' },
            thumbnail: '/images/course-2.png',
            rating: 4.9,
            reviews: 3100,
            level: 'Beginner',
            duration: '22 Hours',
            lessons: 85
        },
        {
            id: 3,
            title: 'Complete Machine Learning A-Z',
            instructor: { name: 'Andrew Ng' },
            category: { name: 'AI & Machine Learning' },
            thumbnail: '/images/course-3.png',
            rating: 4.7,
            reviews: 890,
            level: 'Intermediate',
            duration: '14 Hours',
            lessons: 60
        },
        {
            id: 4,
            title: 'Ethical Hacking: Zero to Mastery',
            instructor: { name: 'Kevin Mitnick' },
            category: { name: 'Cyber Security' },
            thumbnail: '/images/course-4.png',
            rating: 4.6,
            reviews: 450,
            level: 'All Levels',
            duration: '10 Hours',
            lessons: 35
        },
        {
            id: 5,
            title: 'Mastering System Design',
            instructor: { name: 'Alex Xu' },
            category: { name: 'Programming' },
            thumbnail: '/images/course-5.png',
            rating: 4.9,
            reviews: 2100,
            level: 'Advanced',
            duration: '25 Hours',
            lessons: 110
        },
        {
            id: 6,
            title: 'UI/UX Design Masterclass',
            instructor: { name: 'Gary Simon' },
            category: { name: 'Design' },
            thumbnail: '/images/course-6.png',
            rating: 4.7,
            reviews: 950,
            level: 'Beginner',
            duration: '12 Hours',
            lessons: 50
        }
    ];

    let displayCourses = courses?.data?.length > 0 ? courses.data : mockCourses;

    // Apply filters client-side for immediate feedback
    if (category) {
        displayCourses = displayCourses.filter(c => c.category?.name === category || (category === 'AI & ML' && c.category?.name === 'AI & Machine Learning'));
    }
    if (level) {
        displayCourses = displayCourses.filter(c => c.difficulty === level || c.level === level);
    }
    if (search) {
        displayCourses = displayCourses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category?.name.toLowerCase().includes(search.toLowerCase()));
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Course Catalog" />

            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
                            {category ? `Explore ${category} Courses` : 'What do you want to learn today?'}
                        </h1>
                        <p className="mt-4 text-lg text-gray-500">
                            {category 
                                ? `Discover premium ${category} courses taught by industry experts to advance your career.`
                                : 'Discover premium courses taught by industry experts in Web Development, Data Science, AI, and more.'
                            }
                        </p>
                        
                        {/* Search Bar */}
                        <div className="mt-8 relative max-w-xl flex items-center">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for 'React', 'Python', or 'Design'..."
                                className="block w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm transition-shadow shadow-sm"
                            />
                            <button className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
                
                {/* Left Sidebar Filters */}
                <div className="w-full md:w-64 shrink-0 space-y-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                        <div className="space-y-3">
                            {['Web Development', 'Data Science', 'AI & Machine Learning', 'Cyber Security', 'Programming'].map((cat) => (
                                <label key={cat} className="flex items-center group cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600" 
                                        checked={category === cat}
                                        onChange={() => setCategory(category === cat ? '' : cat)}
                                    />
                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Level</h3>
                        <div className="space-y-3">
                            {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((lvl) => (
                                <label key={lvl} className="flex items-center group cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                                        checked={level === lvl}
                                        onChange={() => setLevel(level === lvl ? '' : lvl)}
                                    />
                                    <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{lvl}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">All Courses</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select className="text-sm border-gray-300 rounded-md text-gray-700 py-1.5 pl-3 pr-8 focus:ring-indigo-600 focus:border-indigo-600">
                                <option>Most Popular</option>
                                <option>Highest Rated</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            [...Array(6)].map((_, i) => <CourseCardSkeleton key={`skeleton-${i}`} />)
                        ) : displayCourses.length === 0 ? (
                            <div className="col-span-full py-12 text-center bg-white rounded-xl border border-gray-200 border-dashed">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses found</h3>
                                <p className="mt-1 text-sm text-gray-500">We couldn't find any courses matching your current filters.</p>
                                <button onClick={() => {setSearch(''); setCategory(''); setLevel('');}} className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">Clear filters</button>
                            </div>
                        ) : (
                            displayCourses.map((course) => (
                                <Link key={course.id} href={route('courses.show', course.id)} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all flex flex-col h-full">
                                    {/* Thumbnail */}
                                    <div className="relative h-44 overflow-hidden bg-gray-100">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-gray-900 rounded shadow-sm">
                                                {course.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mb-3">{course.instructor?.name}</p>
                                        
                                        <div className="flex items-center gap-1.5 mb-4">
                                            <span className="text-sm font-bold text-amber-500">{course.average_rating > 0 ? course.average_rating : 'New'}</span>
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(course.average_rating || 0) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-400">({course.reviews?.length || 0})</span>
                                        </div>

                                        {/* Footer Details */}
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {course.difficulty || 'All Levels'}
                                            </div>
                                            <div className="flex items-center gap-1.5 font-bold text-indigo-600">
                                                ${course.price > 0 ? course.price : 'Free'}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Real Pagination */}
                    {courses?.links && courses.links.length > 3 && (
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                            {courses.links.map((link, i) => (
                                <Link 
                                    key={i} 
                                    href={link.url || '#'}
                                    className={`px-3 py-2 border rounded-md font-medium text-sm transition-colors ${
                                        link.active 
                                            ? 'bg-indigo-600 text-white border-indigo-600' 
                                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
