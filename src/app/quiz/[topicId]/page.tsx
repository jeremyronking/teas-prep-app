'use client';

import { useState, useEffect } from 'react';
import { TEAS_DATA, Topic, Question } from '@/lib/teas-data';
import { ArrowLeft, CheckCircle, XCircle, Volume2, Mic } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

import { useVoice } from '@/hooks/useVoice';
import { generators } from '@/lib/generators';
import { saveProgress } from '@/lib/mastery';

export default function QuizPage() {
    const params = useParams();
    const topicId = params.topicId as string;
    const [topic, setTopic] = useState<Topic | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const { speak, isSpeaking, startListening, isListening, transcript, resetTranscript } = useVoice();

    useEffect(() => {
        // Find the topic across all subjects
        let foundTopic: Topic | undefined;
        for (const subject of TEAS_DATA) {
            foundTopic = subject.topics.find(t => t.id === topicId);
            if (foundTopic) break;
        }
        if (foundTopic) {
            setTopic(foundTopic);

            // Initialize questions
            let initialQuestions = [...foundTopic.questions];

            // Add passage questions
            if (foundTopic.passages) {
                foundTopic.passages.forEach(p => {
                    initialQuestions.push(...p.questions);
                });
            }

            if (foundTopic.generatorId && generators[foundTopic.generatorId]) {
                const generated = generators[foundTopic.generatorId].generate(5); // Generate 5 fresh questions
                initialQuestions = [...initialQuestions, ...generated];
            }
            setQuestions(initialQuestions);
        }
    }, [topicId]);

    // Voice Command Handling
    useEffect(() => {
        if (transcript) {
            const lowerTranscript = transcript.toLowerCase();

            // Check for answer selection (A, B, C, D or full text match)
            if (!isSubmitted && questions.length > 0) {
                const currentQ = questions[currentQuestionIndex];

                // Simple heuristic for matching spoken answers to options
                // In a real app, we'd use fuzzy matching
                const matchedOption = currentQ.options?.find(opt =>
                    lowerTranscript.includes(opt.toLowerCase())
                );

                if (matchedOption) {
                    setSelectedAnswer(matchedOption);
                    speak(`Selected ${matchedOption}`);
                }
            }

            // Check for commands
            if (lowerTranscript.includes('check answer') || lowerTranscript.includes('submit')) {
                if (selectedAnswer && !isSubmitted) {
                    handleSubmit();
                }
            } else if (lowerTranscript.includes('next question') || lowerTranscript.includes('continue')) {
                if (isSubmitted) {
                    handleNext();
                }
            }

            resetTranscript();
        }
    }, [transcript, isSubmitted, selectedAnswer, questions, currentQuestionIndex, speak, resetTranscript]);

    if (!topic || questions.length === 0) {
        return <div className="p-8 text-center">Loading quiz...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    // Find passage if applicable
    const currentPassage = topic.passages?.find(p => p.questions.some(q => q.id === currentQuestion.id));

    const handleAnswerSelect = (option: string) => {
        if (!isSubmitted) {
            setSelectedAnswer(option);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Save progress
        if (topic) {
            saveProgress(topic.id, isCorrect);
        }

        if (isCorrect) {
            setScore(s => s + 1);
            speak("Correct!");
        } else {
            speak(`Incorrect. The correct answer is ${currentQuestion.correctAnswer}`);
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResults(true);
        } else {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        }
    };

    if (showResults) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
                    <p className="text-slate-600 mb-6">
                        You scored <span className="font-bold text-slate-900">{score}</span> out of <span className="font-bold text-slate-900">{questions.length}</span>
                    </p>
                    <Link
                        href="/"
                        className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between sticky top-0 z-10">
                <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6 text-slate-600" />
                </Link>
                <div className="flex-1 mx-4">
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-300"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>
                <span className="text-sm font-medium text-slate-600">
                    {currentQuestionIndex + 1}/{questions.length}
                </span>
            </header>

            {/* Question Area */}
            <div className="flex-1 max-w-5xl mx-auto w-full p-4 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Passage Column (if exists) */}
                {currentPassage && (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-fit md:sticky md:top-24 overflow-y-auto max-h-[60vh]">
                        <h3 className="font-bold text-slate-900 mb-4 text-lg">{currentPassage.title || 'Read the passage'}</h3>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                            {currentPassage.text}
                        </p>
                    </div>
                )}

                {/* Question Column */}
                <div className={`${currentPassage ? '' : 'md:col-span-2 max-w-3xl mx-auto'}`}>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                {topic.title}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => speak(currentQuestion.text)}
                                    className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-400 hover:text-blue-600'}`}
                                    title="Read Question"
                                >
                                    <Volume2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 leading-relaxed mb-6">
                            {currentQuestion.text}
                        </h2>

                        <div className="space-y-3">
                            {currentQuestion.options?.map((option) => {
                                const isSelected = selectedAnswer === option;
                                const isCorrect = option === currentQuestion.correctAnswer;

                                let buttonStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50";
                                if (isSelected) {
                                    buttonStyle = "border-blue-600 bg-blue-50 ring-1 ring-blue-600";
                                }
                                if (isSubmitted) {
                                    if (isCorrect) {
                                        buttonStyle = "border-green-500 bg-green-50 ring-1 ring-green-500";
                                    } else if (isSelected && !isCorrect) {
                                        buttonStyle = "border-red-500 bg-red-50 ring-1 ring-red-500";
                                    } else {
                                        buttonStyle = "border-slate-200 opacity-50";
                                    }
                                }

                                return (
                                    <button
                                        key={option}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={isSubmitted}
                                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-slate-700 ${buttonStyle}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {isSubmitted && isCorrect && <CheckCircle className="w-5 h-5 text-green-600" />}
                                            {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Explanation */}
                    {isSubmitted && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6 animate-in fade-in slide-in-from-bottom-4">
                            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                Explanation
                            </h3>
                            <p className="text-blue-800 leading-relaxed">
                                {currentQuestion.explanation}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 safe-area-pb">
                <div className="max-w-3xl mx-auto flex gap-4">
                    <button
                        onClick={isListening ? () => { } : startListening}
                        className={`p-4 rounded-xl transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                        <Mic className="w-6 h-6" />
                    </button>

                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedAnswer}
                            className="flex-1 bg-blue-600 text-white font-bold rounded-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-slate-900 text-white font-bold rounded-xl py-4 hover:bg-slate-800 transition-colors shadow-lg"
                        >
                            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
