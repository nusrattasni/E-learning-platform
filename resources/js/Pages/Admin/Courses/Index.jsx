import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Plus, Edit, Trash2, MonitorPlay } from 'lucide-react';

export default function Index({ auth, courses }) {
    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Courses</h2>}
        >
            <Head title="Manage Courses" />

            <div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">Your Courses</h3>
                        <p className="mt-1 text-sm text-gray-500">Manage all the courses you have created.</p>
                    </div>
                    <Link
                        href={route('admin.courses.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150 gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Course
                    </Link>
                </div>

                {courses.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {courses.data.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                    {course.thumbnail ? (
                                                        <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                                    <div className="text-sm text-gray-500">Price: ${course.price}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                {course.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                            <Link href={route('admin.courses.edit', course.id)} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1">
                                                <Edit className="w-4 h-4" /> Curriculum
                                            </Link>
                                            <Link href={route('admin.courses.destroy', course.id)} method="delete" as="button" className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                                                <Trash2 className="w-4 h-4" /> Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MonitorPlay className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-500 max-w-md mb-6">You haven't created any courses yet. Click the button below to start building your first curriculum.</p>
                        <Link
                            href={route('admin.courses.create')}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create New Course
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
