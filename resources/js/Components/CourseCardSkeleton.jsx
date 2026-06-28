import Skeleton from './Skeleton';

export default function CourseCardSkeleton() {
    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden flex flex-col h-full">
            <Skeleton className="w-full h-48 rounded-none" />
            <div className="p-6 flex flex-col flex-1">
                <Skeleton className="w-1/4 h-5 mb-4 rounded-full" />
                <Skeleton className="w-full h-7 mb-2" />
                <Skeleton className="w-3/4 h-7 mb-4" />
                
                <Skeleton className="w-full h-4 mb-2 mt-auto" />
                <Skeleton className="w-2/3 h-4 mb-6" />
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="w-20 h-4" />
                    </div>
                    <Skeleton className="w-16 h-6 rounded-full" />
                </div>
            </div>
        </div>
    );
}
