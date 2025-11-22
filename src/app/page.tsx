'use client';

import { TEAS_DATA } from '@/lib/teas-data';
import { SubjectCard } from '@/components/SubjectCard';
import { Brain, Trophy, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getOverallMastery, getProgress } from '@/lib/mastery';

export default function Home() {
  const [mastery, setMastery] = useState(0);
  const [quizzesPassed, setQuizzesPassed] = useState(0);

  useEffect(() => {
    setMastery(getOverallMastery(TEAS_DATA));

    const progress = getProgress();
    const passed = Object.values(progress).filter(p => p.masteryScore >= 80).length;
    setQuizzesPassed(passed);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">TEAS Prep</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium">Daily Goal</span>
              <span className="text-sm font-bold text-slate-900">0 / 30 min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back!</h2>
          <p className="text-slate-600">Ready to master your nursing entrance exam?</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-yellow-100 rounded-full mb-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{quizzesPassed}</span>
              <span className="text-xs text-slate-500">Quizzes Passed</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="p-2 bg-green-100 rounded-full mb-2">
                <Target className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-slate-900">{mastery}%</span>
              <span className="text-xs text-slate-500">Mastery Level</span>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Study Subjects</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEAS_DATA.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
