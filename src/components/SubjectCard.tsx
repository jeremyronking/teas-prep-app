import React from 'react';
import { BookOpen, Calculator, FlaskConical, PenTool, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Subject } from '@/lib/teas-data';

const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    Calculator,
    FlaskConical,
    PenTool,
};

interface SubjectCardProps {
    subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
    const Icon = iconMap[subject.icon] || BookOpen;

    return (
        <Link href={`/study/${subject.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md hover:border-blue-300 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${subject.color}`} />

                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${subject.color} bg-opacity-10 text-${subject.color.replace('bg-', '')}`}>
                        <Icon className={`w-6 h-6 text-${subject.color.replace('bg-', '')}-600`} />
                    </div>
                    <div className="bg-slate-100 text-slate-600 text-xs font-medium px-2 py-1 rounded-full">
                        {subject.topics.length} Topics
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {subject.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {subject.description}
                </p>

                <div className="flex items-center text-blue-600 text-sm font-medium">
                    Start Studying <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}
