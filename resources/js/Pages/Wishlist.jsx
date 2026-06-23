import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Heart } from 'lucide-react';

export default function Wishlist({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Wishlist</h2>}
        >
            <Head title="Wishlist" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                            <p className="text-gray-500 text-center max-w-md mb-6">Found a course you like but not ready to enroll? Save it here for later.</p>
                            <a href="/courses" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors">Explore Courses</a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
