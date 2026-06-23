import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';

export default function MyCourses({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Courses</h2>}
        >
            <Head title="My Courses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">You haven't enrolled in any courses yet</h3>
                            <p className="text-gray-500 text-center max-w-md mb-6">Explore the catalog to find the perfect course to jumpstart your career.</p>
                            <a href="/courses" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">Browse Catalog</a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
