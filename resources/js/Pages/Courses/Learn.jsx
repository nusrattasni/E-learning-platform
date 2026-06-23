import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Menu, X, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Learn({ course, currentLesson, completedLessonIds, enrollmentId }) {
    const { flash = {} } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [quizAnswers, setQuizAnswers] = useState({});
    
    const { post, processing } = useForm({
        enrollment_id: enrollmentId,
        answers: []
    });

    // Q&A State
    const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'qa'
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [expandedDiscussion, setExpandedDiscussion] = useState(null);

    const { data: qaData, setData: setQaData, post: postQa, processing: qaProcessing, reset: resetQa } = useForm({
        title: '',
        body: ''
    });

    const submitQuestion = (e) => {
        e.preventDefault();
        postQa(route('lessons.discussions.store', currentLesson.id), {
            onSuccess: () => {
                resetQa();
                setShowQuestionForm(false);
            },
            preserveScroll: true
        });
    };

    const submitReply = (e, discussionId) => {
        e.preventDefault();
        postQa(route('discussions.replies.store', discussionId), {
            onSuccess: () => {
                resetQa();
                setReplyingTo(null);
            },
            preserveScroll: true
        });
    };

    const markComplete = () => {
        post(route('lessons.complete', currentLesson.id), {
            preserveScroll: true
        });
    };

    const submitQuiz = () => {
        if (!currentLesson.quiz) return;
        
        // Convert map of answers to array matching question indices
        const answersArray = currentLesson.quiz.questions.map((_, index) => quizAnswers[index] !== undefined ? quizAnswers[index] : -1);

        router.post(route('lessons.quiz.submit', currentLesson.id), {
            enrollment_id: enrollmentId,
            answers: answersArray
        }, {
            preserveScroll: true
        });
    };

    const isCompleted = (lessonId) => completedLessonIds.includes(lessonId);
    const isCurrent = (lessonId) => currentLesson?.id === lessonId;



    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col font-sans">
            <Head title={`${currentLesson?.title || 'Learning'} - ${course.title}`} />

            {/* Top Navbar */}
            <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white lg:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link href={route('courses.show', course.id)} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Course
                    </Link>
                </div>
                <div className="font-semibold text-slate-100 hidden sm:block">{course.title}</div>
                <div className="text-sm font-medium text-slate-400">
                    <span className="text-emerald-400">{completedLessonIds.length}</span> completed
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`w-80 bg-slate-900 border-r border-slate-800 flex-col shrink-0 overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'flex' : 'hidden'} absolute lg:relative z-20 h-full`}>
                    <div className="p-4 flex items-center justify-between lg:hidden border-b border-slate-800">
                        <span className="font-bold text-white">Course Content</span>
                        <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="p-4 space-y-6">
                        {course.sections.map((section, sIdx) => (
                            <div key={section.id}>
                                <h3 className="font-bold text-slate-100 mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="text-indigo-400">Module {sIdx + 1}</span>
                                    <span className="truncate">{section.title}</span>
                                </h3>
                                <div className="space-y-1">
                                    {section.lessons.map((lesson, lIdx) => (
                                        <Link 
                                            key={lesson.id} 
                                            href={route('courses.learn', { course: course.id, lesson_id: lesson.id })}
                                            className={`flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group ${isCurrent(lesson.id) ? 'bg-indigo-600/20 text-white shadow-[0_0_15px_rgba(79,70,229,0.15)] border border-indigo-500/30' : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'}`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {isCompleted(lesson.id) ? (
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                ) : isCurrent(lesson.id) ? (
                                                    <PlayCircle className="w-5 h-5 text-indigo-400" />
                                                ) : (
                                                    <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium leading-snug ${isCurrent(lesson.id) ? 'text-indigo-100' : ''}`}>
                                                    {lIdx + 1}. {lesson.title}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                                    {lesson.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                                    <span>04:20</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content (Video & Details) */}
                <main className="flex-1 overflow-y-auto bg-slate-950 relative">
                    {currentLesson ? (
                        <div className="max-w-5xl mx-auto p-4 sm:p-8">
                            
                            {/* Main Display Area */}
                            {currentLesson.type === 'quiz' && currentLesson.quiz ? (
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
                                    <div className="bg-indigo-900/50 p-8 border-b border-indigo-500/20 text-center">
                                        <h2 className="text-3xl font-bold text-white mb-2">{currentLesson.quiz.title}</h2>
                                        <p className="text-indigo-200">Passing Score: {currentLesson.quiz.passing_score}% • {currentLesson.quiz.questions.length} Questions</p>
                                    </div>
                                    
                                    {flash.quiz_failed && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 text-center">
                                            <h3 className="font-bold text-xl mb-1">Quiz Failed!</h3>
                                            <p>{flash.error}</p>
                                        </div>
                                    )}

                                    {!isCompleted(currentLesson.id) ? (
                                        <div className="p-8 space-y-8">
                                            {currentLesson.quiz.questions.map((q, qIndex) => (
                                                <div key={qIndex} className="space-y-4">
                                                    <h3 className="text-lg font-bold text-white">
                                                        <span className="text-indigo-400 mr-2">{qIndex + 1}.</span> {q.question}
                                                    </h3>
                                                    <div className="space-y-2 pl-6">
                                                        {q.options.map((opt, optIndex) => {
                                                            const result = flash.quiz_results ? flash.quiz_results[qIndex] : null;
                                                            const isCorrectOption = result && result.correct_option === optIndex;
                                                            const isWrongSelection = result && result.user_answer === optIndex && !result.correct;
                                                            
                                                            let labelClass = "flex items-center gap-3 p-4 rounded-xl border transition-colors ";
                                                            if (result) {
                                                                if (isCorrectOption) {
                                                                    labelClass += "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold";
                                                                } else if (isWrongSelection) {
                                                                    labelClass += "border-red-500 bg-red-500/10 text-red-400";
                                                                } else {
                                                                    labelClass += "border-slate-800 bg-slate-800/20 opacity-50";
                                                                }
                                                            } else {
                                                                labelClass += quizAnswers[qIndex] === optIndex ? 'border-indigo-500 bg-indigo-500/10 cursor-pointer text-white' : 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-700 cursor-pointer text-slate-300';
                                                            }

                                                            return (
                                                                <label key={optIndex} className={labelClass}>
                                                                    <input 
                                                                        type="radio" 
                                                                        name={`question-${qIndex}`} 
                                                                        className="w-5 h-5 text-indigo-500 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-slate-900" 
                                                                        checked={result ? (result.user_answer === optIndex) : quizAnswers[qIndex] === optIndex}
                                                                        onChange={() => !result && setQuizAnswers({...quizAnswers, [qIndex]: optIndex})}
                                                                        disabled={!!result}
                                                                    />
                                                                    <span>{opt}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
                                                {flash.quiz_failed ? (
                                                    <button onClick={() => router.reload()} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-all">
                                                        Try Again
                                                    </button>
                                                ) : (
                                                    <button onClick={submitQuiz} disabled={processing} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-50">
                                                        Submit Answers
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-12 text-center">
                                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Quiz Passed!</h2>
                                            <p className="text-slate-400 text-lg">{flash.success || 'You have successfully completed this quiz.'}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-800 mb-8 relative">
                                    {currentLesson.encrypted_video_token ? (
                                        <iframe 
                                            src={`/secure-player/${currentLesson.encrypted_video_token}`} 
                                            title={currentLesson.title}
                                            className="w-full h-full absolute inset-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-500">
                                            <FileText className="w-16 h-16 mb-4 opacity-50" />
                                            <p>This is a text lesson. Read the content below.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Lesson Details & Actions */}
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{currentLesson.title}</h1>
                                    <p className="text-slate-400">Lesson in {course.title}</p>
                                </div>
                                <div className="shrink-0">
                                    {isCompleted(currentLesson.id) ? (
                                        <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-3 px-6 rounded-xl flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" /> Completed
                                        </div>
                                    ) : currentLesson.type !== 'quiz' && (
                                        <button 
                                            onClick={markComplete} 
                                            disabled={processing}
                                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-50 flex items-center gap-2"
                                        >
                                            <CheckCircle2 className="w-5 h-5" /> Mark as Complete
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Tabs Header */}
                            <div className="flex border-b border-slate-800 mb-6">
                                <button
                                    onClick={() => setActiveTab('notes')}
                                    className={`pb-4 px-4 font-bold transition-colors border-b-2 ${activeTab === 'notes' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" /> Lesson Notes
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('qa')}
                                    className={`pb-4 px-4 font-bold transition-colors border-b-2 ${activeTab === 'qa' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                                        Q&A Discussions
                                    </div>
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === 'notes' ? (
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                                    <div className="prose prose-invert prose-indigo max-w-none">
                                        {currentLesson.content ? (
                                            <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                                        ) : (
                                            <p className="text-slate-400 italic">No additional notes provided for this lesson.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">Community Q&A</h3>
                                            <p className="text-slate-400 text-sm">Ask questions and learn together with {course.title} students.</p>
                                        </div>
                                        {!showQuestionForm && (
                                            <button 
                                                onClick={() => { setShowQuestionForm(true); resetQa(); }}
                                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all"
                                            >
                                                Ask a Question
                                            </button>
                                        )}
                                    </div>

                                    {showQuestionForm && (
                                        <form onSubmit={submitQuestion} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">Question Title</label>
                                                <input 
                                                    type="text" 
                                                    value={qaData.title}
                                                    onChange={e => setQaData('title', e.target.value)}
                                                    required
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="e.g. How does useEffect actually work?"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">Details</label>
                                                <textarea 
                                                    value={qaData.body}
                                                    onChange={e => setQaData('body', e.target.value)}
                                                    required
                                                    rows="4"
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg text-white p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Explain what you are trying to understand..."
                                                ></textarea>
                                            </div>
                                            <div className="flex justify-end gap-3">
                                                <button type="button" onClick={() => setShowQuestionForm(false)} className="text-slate-400 hover:text-white px-4 py-2 font-medium">Cancel</button>
                                                <button type="submit" disabled={qaProcessing} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50">Post Question</button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="space-y-4">
                                        {currentLesson.discussions && currentLesson.discussions.length > 0 ? (
                                            currentLesson.discussions.map(discussion => (
                                                <div key={discussion.id} className="border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                                                    <div 
                                                        className="p-5 cursor-pointer hover:bg-slate-800/50 transition-colors"
                                                        onClick={() => setExpandedDiscussion(expandedDiscussion === discussion.id ? null : discussion.id)}
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                                                                {discussion.user?.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-lg font-bold text-white mb-1">{discussion.title}</h4>
                                                                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{discussion.body}</p>
                                                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                                    <span>{discussion.user?.name || 'Student'}</span>
                                                                    <span>•</span>
                                                                    <span>{new Date(discussion.created_at).toLocaleDateString()}</span>
                                                                    <span>•</span>
                                                                    <span className="text-indigo-400">{discussion.replies?.length || 0} Replies</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {expandedDiscussion === discussion.id && (
                                                        <div className="border-t border-slate-800 bg-slate-950 p-5 space-y-6">
                                                            {/* Original Post Body (Full) */}
                                                            <div className="text-slate-300 pb-6 border-b border-slate-800">
                                                                {discussion.body}
                                                            </div>

                                                            {/* Replies */}
                                                            {discussion.replies && discussion.replies.map(reply => (
                                                                <div key={reply.id} className="flex gap-4">
                                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 text-sm ${reply.is_instructor_reply ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-800 text-slate-400'}`}>
                                                                        {reply.user?.name?.charAt(0) || 'U'}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <span className={`text-sm font-bold ${reply.is_instructor_reply ? 'text-amber-400' : 'text-slate-300'}`}>
                                                                                {reply.user?.name || 'User'}
                                                                            </span>
                                                                            {reply.is_instructor_reply && (
                                                                                <span className="bg-amber-500/20 text-amber-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold border border-amber-500/30">Instructor</span>
                                                                            )}
                                                                            <span className="text-xs text-slate-500">• {new Date(reply.created_at).toLocaleDateString()}</span>
                                                                        </div>
                                                                        <p className="text-slate-300 text-sm">{reply.body}</p>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            {/* Reply Form */}
                                                            {replyingTo === discussion.id ? (
                                                                <form onSubmit={(e) => submitReply(e, discussion.id)} className="mt-4 flex gap-3">
                                                                    <input 
                                                                        type="text" 
                                                                        value={qaData.body}
                                                                        onChange={e => setQaData('body', e.target.value)}
                                                                        placeholder="Write a reply..."
                                                                        required
                                                                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg text-white p-2.5 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                                    />
                                                                    <button type="submit" disabled={qaProcessing} className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-4 rounded-lg transition-all disabled:opacity-50">Reply</button>
                                                                    <button type="button" onClick={() => setReplyingTo(null)} className="text-slate-400 hover:text-white px-2">Cancel</button>
                                                                </form>
                                                            ) : (
                                                                <button 
                                                                    onClick={() => { setReplyingTo(discussion.id); resetQa(); }}
                                                                    className="text-indigo-400 hover:text-indigo-300 text-sm font-bold flex items-center gap-1 mt-4 transition-colors"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                                                                    Reply to this discussion
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 border border-slate-800 border-dashed rounded-xl">
                                                <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                <p className="text-slate-400 font-medium">No questions yet. Be the first to ask!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">You're all caught up!</h2>
                            <p className="max-w-md">You have completed all lessons in this course. Check back later for new updates or browse other courses.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
