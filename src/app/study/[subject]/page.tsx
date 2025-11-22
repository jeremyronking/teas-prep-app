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
        <main className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-slate-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900">{subject.title}</h1>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">Select a Topic</h2>
                    <p className="text-slate-600 text-sm">Choose a specific area to focus your study session.</p>
                </div>

                <div className="space-y-4">
                    {subject.topics.map((topic) => (
                        <Link key={topic.id} href={`/quiz/${topic.id}`} className="block group">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {topic.description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-3">
                                        <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                            {topic.questions.length} Questions
                                        </span>
                                    </div>
                                </div>

                                <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                                    <PlayCircle className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
