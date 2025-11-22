import { Subject } from './teas-data';

export interface TopicProgress {
    topicId: string;
    totalAttempts: number;
    correctAttempts: number;
    lastAttemptTimestamp: number;
    masteryScore: number; // 0 to 100
}

const STORAGE_KEY = 'teas_prep_progress';

export function getProgress(): Record<string, TopicProgress> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

export function saveProgress(topicId: string, isCorrect: boolean) {
    const currentProgress = getProgress();
    const topicData = currentProgress[topicId] || {
        topicId,
        totalAttempts: 0,
        correctAttempts: 0,
        lastAttemptTimestamp: 0,
        masteryScore: 0
    };

    topicData.totalAttempts += 1;
    if (isCorrect) {
        topicData.correctAttempts += 1;
    }
    topicData.lastAttemptTimestamp = Date.now();

    // Simple mastery calculation: Percentage correct
    // In a real app, this could be more complex (weighted recent attempts)
    topicData.masteryScore = Math.round((topicData.correctAttempts / topicData.totalAttempts) * 100);

    const newProgress = {
        ...currentProgress,
        [topicId]: topicData
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    return topicData;
}

export function getOverallMastery(subjects: Subject[]): number {
    const progress = getProgress();
    const topicIds = subjects.flatMap(s => s.topics.map(t => t.id));

    if (topicIds.length === 0) return 0;

    let totalMastery = 0;
    let attemptedTopics = 0;

    topicIds.forEach(id => {
        if (progress[id]) {
            totalMastery += progress[id].masteryScore;
            attemptedTopics += 1;
        }
    });

    if (attemptedTopics === 0) return 0;
    return Math.round(totalMastery / topicIds.length); // Average across ALL topics, not just attempted ones? 
    // For "Overall Mastery", it's better to average across all topics to show true completion.
}

export function getWeakestTopics(subjects: Subject[], limit: number = 3): string[] {
    const progress = getProgress();
    const allTopics = subjects.flatMap(s => s.topics);

    // Filter topics that have been attempted but have low scores
    const attemptedTopics = allTopics.filter(t => progress[t.id] && progress[t.id].totalAttempts > 0);

    return attemptedTopics
        .sort((a, b) => {
            const scoreA = progress[a.id].masteryScore;
            const scoreB = progress[b.id].masteryScore;
            return scoreA - scoreB;
        })
        .slice(0, limit)
        .map(t => t.title);
}
