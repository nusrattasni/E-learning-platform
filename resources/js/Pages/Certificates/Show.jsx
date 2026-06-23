import { Head, Link } from '@inertiajs/react';
import { Award, Share2, Download, ArrowLeft } from 'lucide-react';

export default function Show({ certificate }) {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
            <Head title={`Certificate - ${certificate.course.title}`} />
            
            <div className="w-full max-w-5xl mb-6 flex items-center justify-between">
                <Link href={route('certificates')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" /> Back to My Certificates
                </Link>
                <div className="flex gap-3">
                    <button onClick={() => window.print()} className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 shadow-sm">
                        <Download className="w-4 h-4" /> Save as PDF
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm">
                        <Share2 className="w-4 h-4" /> Share Link
                    </button>
                </div>
            </div>

            {/* The Certificate itself */}
            <div className="w-full max-w-5xl bg-white aspect-[1.414/1] shadow-2xl relative overflow-hidden border-[16px] border-slate-900 flex flex-col items-center justify-center p-12 md:p-24 text-center print:border-8 print:shadow-none print:w-full print:h-screen print:max-w-none print:aspect-auto">
                <div className="absolute inset-0 border-[4px] border-amber-500/30 m-2"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-br-full mix-blend-multiply blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-tl-full mix-blend-multiply blur-3xl"></div>
                
                <div className="relative z-10 w-full flex flex-col items-center">
                    <div className="mb-8">
                        <Award className="w-20 h-20 text-amber-500 mx-auto" />
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 tracking-tight mb-2 uppercase">Certificate of Completion</h1>
                    <p className="text-lg md:text-xl text-slate-500 tracking-widest uppercase mb-12">CodeAcademy Platform</p>
                    
                    <p className="text-slate-500 text-lg mb-4">This is to certify that</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-12 border-b-2 border-indigo-100 pb-4 px-12 inline-block">
                        {certificate.user.name}
                    </h2>
                    
                    <p className="text-slate-500 text-lg mb-4">has successfully completed the course</p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 max-w-3xl leading-snug mb-16">
                        {certificate.course.title}
                    </h3>
                    
                    <div className="w-full flex justify-between items-end mt-auto px-12">
                        <div className="text-left border-t-2 border-slate-200 pt-4 w-48">
                            <p className="font-bold text-slate-900 mb-1">{new Date(certificate.issued_at).toLocaleDateString()}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Date Issued</p>
                        </div>
                        
                        <div className="flex flex-col items-center opacity-30">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-3xl mb-2">C</div>
                            <span className="font-bold tracking-widest text-slate-900 uppercase">Verifiable</span>
                        </div>
                        
                        <div className="text-right border-t-2 border-slate-200 pt-4 w-48">
                            <p className="font-bold text-slate-900 mb-1 font-serif italic text-xl">{certificate.course.instructor?.name || 'CodeAcademy'}</p>
                            <p className="text-xs text-slate-400 uppercase tracking-wider">Lead Instructor</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono">
                    ID: {certificate.certificate_id} • Verify at {window.location.origin}/certificates/{certificate.certificate_id}
                </div>
            </div>
        </div>
    );
}
