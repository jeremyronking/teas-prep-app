'use client';

import { TEAS_DATA } from '@/lib/teas-data';
import { SubjectCard } from '@/components/SubjectCard';
import { Brain, Trophy, Target } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getOverallMastery, getProgress } from '@/lib/mastery';

import { ThemeToggle } from '@/components/ThemeToggle';

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
    <main className="min-h-screen bg-slate-50 dark:bg-[#121212] pb-20 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-none">TEAS Prep</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Mastery Dashboard</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back!</h2>
          <p className="text-slate-600 dark:text-slate-400">Ready to master your nursing entrance exam?</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{quizzesPassed}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Quizzes Passed</span>
            </div>
            <div className="bg-white dark:bg-[#1e1e1e] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center transition-colors duration-300">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{mastery}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Mastery Level</span>
            </div>
          </div>
        </section>

        {/* Subjects Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Study Subjects</h3>
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
