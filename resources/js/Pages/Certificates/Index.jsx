import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Award, ExternalLink } from 'lucide-react';

export default function Index({ auth, certificates }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Certificates" />

            <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">My Certificates</h1>
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
                        {certificates.length} Earned
                    </span>
                </div>

                {certificates.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 border-dashed">
                        <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">No Certificates Yet</h2>
                        <p className="text-slate-500 mb-6">Complete a course to 100% to earn your first verifiable certificate.</p>
                        <Link href={route('courses.index')} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            Explore Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map(cert => (
                            <div key={cert.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                <div className="aspect-[4/3] bg-gradient-to-br from-indigo-900 to-purple-900 p-6 flex flex-col items-center justify-center relative overflow-hidden text-center">
                                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                    <Award className="w-12 h-12 text-amber-400 mb-3 z-10" />
                                    <h3 className="text-white font-serif text-xl z-10 leading-tight">Certificate of Completion</h3>
                                    <p className="text-indigo-200 text-sm mt-2 z-10 line-clamp-2">{cert.course.title}</p>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Issued On</p>
                                        <p className="text-sm font-bold text-slate-900">{new Date(cert.issued_at).toLocaleDateString()}</p>
                                    </div>
                                    <Link href={route('certificates.show', cert.certificate_id)} className="flex items-center justify-center gap-2 w-full bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-semibold py-2.5 rounded-lg border border-slate-200 transition-colors">
                                        View Certificate <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
