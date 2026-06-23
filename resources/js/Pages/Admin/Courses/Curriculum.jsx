import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, GripVertical, Video, FileText, Settings, Trash2, Edit2, PlayCircle, Save, CheckCircle2 } from 'lucide-react';

export default function Curriculum({ auth, course }) {
    const [activeSection, setActiveSection] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    
    // Modals state
    const [showSectionModal, setShowSectionModal] = useState(false);
    
    const sectionForm = useForm({ title: '', order: course.sections?.length + 1 || 1 });
    const lessonForm = useForm({ 
        title: '', 
        type: 'video', 
        video_url: '', 
        content: '',
        is_free_preview: false,
        order: 1,
        quiz: {
            passing_score: 80,
            questions: []
        }
    });

    const createSection = (e) => {
        e.preventDefault();
        sectionForm.post(route('admin.courses.sections.store', course.id), {
            onSuccess: () => {
                setShowSectionModal(false);
                sectionForm.reset();
            }
        });
    };

    const deleteSection = (id) => {
        if(confirm('Are you sure you want to delete this module and all its lessons?')) {
            router.delete(route('admin.sections.destroy', id), { preserveScroll: true });
        }
    };

    const saveLesson = (e) => {
        e.preventDefault();
        if (activeLesson?.id) {
            // Update
            lessonForm.put(route('admin.lessons.update', activeLesson.id), {
                preserveScroll: true,
                onSuccess: () => {
                    alert('Lesson updated successfully!');
                }
            });
        } else {
            // Create
            lessonForm.post(route('admin.sections.lessons.store', activeSection.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setActiveLesson(null);
                    lessonForm.reset();
                }
            });
        }
    };

    const deleteLesson = (id) => {
        if(confirm('Are you sure you want to delete this lesson?')) {
            router.delete(route('admin.lessons.destroy', id), { preserveScroll: true });
            if (activeLesson?.id === id) setActiveLesson(null);
        }
    };

    const startEditLesson = (lesson, sectionId) => {
        setActiveSection({ id: sectionId });
        setActiveLesson(lesson);
        lessonForm.setData({
            title: lesson.title,
            type: lesson.type,
            video_url: lesson.video_url || '',
            content: lesson.content || '',
            is_free_preview: lesson.is_free_preview ? true : false,
            order: lesson.order,
            quiz: lesson.quiz || { passing_score: 80, questions: [] }
        });
    };

    const startNewLesson = (section) => {
        setActiveSection(section);
        setActiveLesson(null);
        lessonForm.setData({
            title: '',
            type: 'video',
            video_url: '',
            content: '',
            is_free_preview: false,
            order: section.lessons.length + 1,
            quiz: { passing_score: 80, questions: [] }
        });
    };

    return (
        <AdminLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Curriculum Builder: {course.title}</h2>}>
            <Head title="Curriculum Builder" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-6 p-4 sm:p-0">
                
                {/* Left Sidebar: Modules & Lessons */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                            <h3 className="font-bold text-gray-700">Course Content</h3>
                            <button onClick={() => setShowSectionModal(true)} className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 flex items-center gap-1 transition-colors">
                                <Plus className="w-4 h-4" /> Module
                            </button>
                        </div>
                        
                        <div className="p-4 overflow-y-auto space-y-4 flex-1">
                            {course.sections.length === 0 ? (
                                <div className="text-center text-gray-500 text-sm py-8 border-2 border-dashed rounded-lg">
                                    No modules yet. Click "Module" to start building.
                                </div>
                            ) : null}

                            {course.sections.map((section, sIdx) => (
                                <div key={section.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                                    <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center group">
                                        <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                                            <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                                            Module {sIdx + 1}: {section.title}
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => deleteSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {section.lessons.map((lesson) => (
                                            <div 
                                                key={lesson.id} 
                                                onClick={() => startEditLesson(lesson, section.id)}
                                                className={`p-3 flex justify-between items-center group cursor-pointer transition-colors ${activeLesson?.id === lesson.id ? 'bg-indigo-50 border-l-4 border-indigo-500 pl-2' : 'hover:bg-gray-50 border-l-4 border-transparent'}`}
                                            >
                                                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium truncate">
                                                    {lesson.type === 'video' ? <PlayCircle className="w-4 h-4 text-indigo-400 shrink-0" /> : <FileText className="w-4 h-4 text-emerald-400 shrink-0" />}
                                                    <span className="truncate">{lesson.title}</span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); deleteLesson(lesson.id); }} className="p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-2 text-center border-t border-gray-100">
                                        <button onClick={() => startNewLesson(section)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center justify-center w-full gap-1 py-1">
                                            <Plus className="w-3.5 h-3.5" /> Add Lesson
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Area: Editor Workspace */}
                <div className="w-full lg:w-2/3 flex flex-col min-h-[50vh]">
                    {activeSection ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between shrink-0">
                                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                    {activeLesson?.id ? <Edit2 className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5 text-indigo-500" />}
                                    {activeLesson?.id ? 'Edit Lesson' : 'Create New Lesson'}
                                </h3>
                                {activeLesson?.id && (
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-bold">Saved</span>
                                )}
                            </div>

                            <form onSubmit={saveLesson} className="p-6 flex flex-col flex-1 gap-6 overflow-y-auto">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                                        value={lessonForm.data.title}
                                        onChange={e => lessonForm.setData('title', e.target.value)}
                                        placeholder="e.g. Introduction to React Hooks"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                                        <div className="flex gap-4">
                                            <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 border rounded-lg cursor-pointer transition-all ${lessonForm.data.type === 'video' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold shadow-inner' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                                <input type="radio" name="type" className="sr-only" checked={lessonForm.data.type === 'video'} onChange={() => lessonForm.setData('type', 'video')} />
                                                <Video className="w-4 h-4" /> Video
                                            </label>
                                            <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 border rounded-lg cursor-pointer transition-all ${lessonForm.data.type === 'text' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold shadow-inner' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                                <input type="radio" name="type" className="sr-only" checked={lessonForm.data.type === 'text'} onChange={() => lessonForm.setData('type', 'text')} />
                                                <FileText className="w-4 h-4" /> Article
                                            </label>
                                            <label className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 border rounded-lg cursor-pointer transition-all ${lessonForm.data.type === 'quiz' ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold shadow-inner' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                                                <input type="radio" name="type" className="sr-only" checked={lessonForm.data.type === 'quiz'} onChange={() => lessonForm.setData('type', 'quiz')} />
                                                <CheckCircle2 className="w-4 h-4" /> Quiz
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-end pb-2">
                                        <label className="flex items-center cursor-pointer group">
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only" checked={lessonForm.data.is_free_preview} onChange={e => lessonForm.setData('is_free_preview', e.target.checked)} />
                                                <div className={`block w-10 h-6 rounded-full transition-colors ${lessonForm.data.is_free_preview ? 'bg-indigo-500' : 'bg-gray-300'}`}></div>
                                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${lessonForm.data.is_free_preview ? 'transform translate-x-4' : ''}`}></div>
                                            </div>
                                            <div className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Free Preview enabled?</div>
                                        </label>
                                    </div>
                                </div>

                                {lessonForm.data.type === 'video' && (
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Video Source URL (YouTube / Vimeo)</label>
                                        <input 
                                            type="url" 
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                                            value={lessonForm.data.video_url}
                                            onChange={e => lessonForm.setData('video_url', e.target.value)}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                        />
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Automatic embedding supported for YouTube links.</p>
                                    </div>
                                )}

                                {lessonForm.data.type === 'quiz' ? (
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                                            <label className="block text-sm font-bold text-amber-900">Passing Score (%)</label>
                                            <input 
                                                type="number" min="1" max="100"
                                                className="w-24 border-amber-300 rounded-lg shadow-sm focus:ring-amber-500 focus:border-amber-500" 
                                                value={lessonForm.data.quiz.passing_score}
                                                onChange={e => lessonForm.setData('quiz', { ...lessonForm.data.quiz, passing_score: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            {lessonForm.data.quiz.questions.map((q, qIndex) => (
                                                <div key={qIndex} className="bg-white p-4 rounded-xl border border-slate-200 relative shadow-sm">
                                                    <button type="button" onClick={() => {
                                                        const newQ = [...lessonForm.data.quiz.questions];
                                                        newQ.splice(qIndex, 1);
                                                        lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                    }} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                                                    
                                                    <div className="mb-4 pr-8">
                                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Question {qIndex + 1}</label>
                                                        <input type="text" placeholder="What is the capital of..." className="w-full border-gray-300 rounded-md font-medium focus:ring-indigo-500 focus:border-indigo-500" value={q.question} onChange={e => {
                                                            const newQ = [...lessonForm.data.quiz.questions];
                                                            newQ[qIndex].question = e.target.value;
                                                            lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                        }}/>
                                                    </div>
                                                    
                                                    <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Answers (Select Correct)</label>
                                                        {q.options.map((opt, optIndex) => (
                                                            <div key={optIndex} className="flex items-center gap-3">
                                                                <input type="radio" name={`correct-${qIndex}`} checked={q.correct === optIndex} onChange={() => {
                                                                    const newQ = [...lessonForm.data.quiz.questions];
                                                                    newQ[qIndex].correct = optIndex;
                                                                    lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                                }} className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 cursor-pointer border-gray-300" />
                                                                <input type="text" placeholder={`Option ${optIndex + 1}`} className={`flex-1 border-gray-300 rounded-md text-sm py-1.5 focus:ring-indigo-500 focus:border-indigo-500 ${q.correct === optIndex ? 'bg-emerald-50 border-emerald-200' : ''}`} value={opt} onChange={e => {
                                                                    const newQ = [...lessonForm.data.quiz.questions];
                                                                    newQ[qIndex].options[optIndex] = e.target.value;
                                                                    lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                                }} />
                                                                <button type="button" onClick={() => {
                                                                    const newQ = [...lessonForm.data.quiz.questions];
                                                                    newQ[qIndex].options.splice(optIndex, 1);
                                                                    if(newQ[qIndex].correct === optIndex) newQ[qIndex].correct = 0;
                                                                    lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                                }} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-3.5 h-3.5"/></button>
                                                            </div>
                                                        ))}
                                                        <button type="button" onClick={() => {
                                                            const newQ = [...lessonForm.data.quiz.questions];
                                                            newQ[qIndex].options.push('');
                                                            lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                                        }} className="text-sm text-indigo-600 mt-2 font-medium hover:text-indigo-800 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add Option</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" onClick={() => {
                                            const newQ = [...lessonForm.data.quiz.questions, { question: '', options: ['', ''], correct: 0 }];
                                            lessonForm.setData('quiz', { ...lessonForm.data.quiz, questions: newQ });
                                        }} className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 text-indigo-600 rounded-xl p-4 font-bold hover:bg-indigo-50 transition-colors flex justify-center items-center gap-2"><Plus className="w-5 h-5"/> Add Question</button>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col min-h-[200px]">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Content / Notes (Markdown supported)</label>
                                        <textarea 
                                            className="w-full flex-1 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-[150px] p-3" 
                                            value={lessonForm.data.content}
                                            onChange={e => lessonForm.setData('content', e.target.value)}
                                            placeholder="Write your lesson content, provide resources, or add transcript notes here..."
                                        />
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={lessonForm.processing}
                                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" /> {activeLesson?.id ? 'Save Changes' : 'Create Lesson'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-500">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-inner border border-gray-100">
                                <Settings className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Workspace Empty</h3>
                            <p className="max-w-md text-sm">Click an existing lesson from the sidebar to edit it, or click "Add Lesson" under a module to create new content.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Module Modal */}
            {showSectionModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Module</h3>
                            <form onSubmit={createSection}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Title</label>
                                    <input 
                                        type="text" 
                                        required autoFocus
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                                        value={sectionForm.data.title}
                                        onChange={e => sectionForm.setData('title', e.target.value)}
                                        placeholder="e.g. Getting Started"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setShowSectionModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                    <button type="submit" disabled={sectionForm.processing} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors shadow-sm disabled:opacity-50">Create Module</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
