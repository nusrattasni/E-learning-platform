import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Activity, User, ShieldAlert, BookOpen, Clock } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ActivityLogIndex({ auth, logs }) {
    
    const getActionIcon = (action) => {
        switch(action) {
            case 'created': return <Activity className="w-5 h-5 text-emerald-500" />;
            case 'updated': return <Clock className="w-5 h-5 text-blue-500" />;
            case 'deleted': return <ShieldAlert className="w-5 h-5 text-red-500" />;
            default: return <Activity className="w-5 h-5 text-gray-400" />;
        }
    };

    const getActionColor = (action) => {
        switch(action) {
            case 'created': return 'bg-emerald-100 text-emerald-800';
            case 'updated': return 'bg-blue-100 text-blue-800';
            case 'deleted': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Activity Log" />

            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-600" />
                        Audit Trail & Activity Logs
                    </h1>
                    <p className="mt-2 text-gray-500">
                        {auth.user.role === 'student' 
                            ? "A timeline of all your activities and achievements." 
                            : "A comprehensive audit trail of system activities across the platform."}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                    <div className="p-6">
                        {logs.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Activity className="mx-auto h-12 w-12 text-gray-300" />
                                <h3 className="mt-2 text-sm font-semibold text-gray-900">No activity yet</h3>
                                <p className="mt-1 text-sm text-gray-500">Events will appear here as you interact with the platform.</p>
                            </div>
                        ) : (
                            <div className="flow-root">
                                <ul className="-mb-8">
                                    {logs.data.map((log, logIdx) => (
                                        <li key={log.id}>
                                            <div className="relative pb-8">
                                                {logIdx !== logs.data.length - 1 ? (
                                                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                                ) : null}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActionColor(log.action).split(' ')[0]}`}>
                                                            {getActionIcon(log.action)}
                                                        </span>
                                                    </div>
                                                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                                        <div>
                                                            <p className="text-sm text-gray-500">
                                                                <span className="font-medium text-gray-900 mr-2">
                                                                    {log.user ? log.user.name : 'System'}
                                                                </span> 
                                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getActionColor(log.action)} ring-${getActionColor(log.action).split(' ')[0].replace('bg-', '')}/20 mr-2 uppercase tracking-wider`}>
                                                                    {log.action}
                                                                </span>
                                                                <span className="font-medium text-gray-900">
                                                                    {log.auditable_type ? log.auditable_type.split('\\').pop() : 'Unknown'}
                                                                </span>
                                                                <span className="ml-1 text-gray-400">#{log.auditable_id}</span>
                                                            </p>
                                                            
                                                            {log.changes && (
                                                                <div className="mt-2 text-sm bg-gray-50 rounded border border-gray-100 p-3 overflow-x-auto">
                                                                    <pre className="text-xs text-gray-600 font-mono">
                                                                        {JSON.stringify(log.changes, null, 2)}
                                                                    </pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                                            <div className="font-medium text-gray-900">{dayjs(log.created_at).fromNow()}</div>
                                                            <div className="text-xs text-gray-400 mt-1">{dayjs(log.created_at).format('MMM D, YYYY h:mm A')}</div>
                                                            <div className="text-xs text-gray-300 mt-1 font-mono">{log.ip_address}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
