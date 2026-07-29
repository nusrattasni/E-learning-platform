import { Head, Link } from '@inertiajs/react';
import { Award, Share2, Download, ArrowLeft, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function Show({ certificate }) {
    // Add custom fonts
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans relative print:p-0 print:m-0 print:bg-white print:block">
            <Head title={`Certificate - ${certificate.course.title}`} />
            
            {/* Top Toolbar */}
            <div className="w-full max-w-5xl mb-6 flex items-center justify-between print:hidden">
                <Link href={route('certificates')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                    <ArrowLeft className="w-5 h-5" /> Back to My Certificates
                </Link>
                <div className="flex gap-3">
                    <button onClick={handlePrint} className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 shadow-sm transition-all hover:shadow-md">
                        <Download className="w-4 h-4" /> Save as PDF
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <Share2 className="w-4 h-4" /> Share Link
                    </button>
                </div>
            </div>

            {/* The Certificate Container */}
            <div className="w-full max-w-5xl bg-white aspect-[1.414/1] shadow-2xl relative flex flex-col items-center justify-center p-8 md:p-16 text-center print:shadow-none print:w-[100%] print:h-[100%] print:max-w-none print:aspect-auto print:p-12 print:overflow-visible overflow-hidden">
                
                {/* Background Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                ></div>

                {/* Elegant Borders */}
                <div className="absolute inset-4 border-[12px] border-indigo-950/90 pointer-events-none z-0 print:inset-6">
                    <div className="absolute inset-1 border-[3px] border-amber-500/80"></div>
                    <div className="absolute inset-3 border border-amber-500/40"></div>
                </div>

                {/* Decorative Corner Ornaments */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-amber-500 z-10"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-amber-500 z-10"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-amber-500 z-10"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-amber-500 z-10"></div>

                <div className="relative z-20 w-full h-full flex flex-col items-center justify-between p-6">
                    
                    {/* Header */}
                    <div className="flex flex-col items-center mt-4">
                        <div className="w-24 h-24 mb-6 rounded-full border-2 border-amber-500 p-2 shadow-lg bg-white flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-indigo-50 transform rotate-45 scale-150"></div>
                            <Award className="w-12 h-12 text-amber-500 relative z-10" strokeWidth={1.5} />
                        </div>
                        <h1 className="text-4xl md:text-6xl text-indigo-950 tracking-wide mb-2 uppercase" style={{ fontFamily: "'Cinzel', serif", fontWeight: 700 }}>
                            Certificate of Completion
                        </h1>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="h-px w-24 bg-amber-500/50"></div>
                            <p className="text-lg md:text-xl text-amber-600 tracking-[0.3em] uppercase font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                                Excellence in Learning
                            </p>
                            <div className="h-px w-24 bg-amber-500/50"></div>
                        </div>
                    </div>
                    
                    {/* Body */}
                    <div className="flex flex-col items-center max-w-3xl my-8">
                        <p className="text-slate-600 text-lg md:text-xl mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                            This is to proudly certify that
                        </p>
                        
                        <h2 className="text-4xl md:text-5xl font-bold text-indigo-950 mb-8 border-b border-slate-300 pb-4 px-16 inline-block text-center" style={{ fontFamily: "'Cinzel', serif" }}>
                            {certificate.user.name}
                        </h2>
                        
                        <p className="text-slate-600 text-lg md:text-xl mb-6 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                            has successfully completed all requirements for the course
                        </p>
                        
                        <h3 className="text-2xl md:text-4xl text-indigo-900 max-w-4xl leading-relaxed text-center font-bold px-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {certificate.course.title}
                        </h3>
                    </div>
                    
                    {/* Footer / Signatures */}
                    <div className="w-full flex justify-between items-end mt-auto px-16 mb-4">
                        {/* Date */}
                        <div className="text-center w-56 flex flex-col items-center">
                            <p className="text-lg text-slate-800 mb-2 font-medium border-b border-slate-400 w-full pb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {new Date(certificate.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Date Issued</p>
                        </div>
                        
                        {/* Seal */}
                        <div className="flex flex-col items-center relative group">
                            <div className="w-28 h-28 rounded-full border-4 border-double border-amber-500 bg-amber-50 flex flex-col items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                                <Award className="w-8 h-8 text-amber-500 mb-1" />
                                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider text-center leading-tight">Official<br/>Certificate</span>
                            </div>
                        </div>
                        
                        {/* Signature */}
                        <div className="text-center w-56 flex flex-col items-center">
                            <div className="h-16 flex items-end justify-center w-full border-b border-slate-400 pb-2 overflow-visible">
                                <span className="text-5xl text-indigo-900 transform -rotate-3 -translate-y-2" style={{ fontFamily: "'Great Vibes', cursive" }}>
                                    {certificate.course.instructor?.name || 'CodeAcademy'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-2">Lead Instructor</p>
                        </div>
                    </div>

                    {/* Verification Footer */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                        <span>ID: {certificate.certificate_id}</span>
                        <span>•</span>
                        <a href={`${window.location.origin}/certificates/${certificate.certificate_id}`} className="hover:text-indigo-500 transition-colors">
                            Verify at {window.location.origin}/certificates/{certificate.certificate_id}
                        </a>
                    </div>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @media print {
                    @page { size: landscape; margin: 0; }
                    body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}} />
        </div>
    );
}
