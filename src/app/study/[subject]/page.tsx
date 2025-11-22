import { TEAS_DATA } from '@/lib/teas-data';
import Link from 'next/link';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: PageProps) {
    const { subject: subjectId } = await params;
    const subject = TEAS_DATA.find((s) => s.id === subjectId);

    if (!subject) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-[#121212] pb-20 transition-colors duration-300">
            <header className="bg-white dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">{subject.title}</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{subject.description}</p>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-6">
                <div className="grid gap-4">
                    {subject.topics.map((topic) => (
                        <Link
                            key={topic.id}
                            href={`/quiz/${topic.id}`}
                            className="block bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                        {topic.description}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                            {topic.questions.length} Questions
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                    <PlayCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
