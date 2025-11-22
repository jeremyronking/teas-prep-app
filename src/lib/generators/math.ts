import { Question } from '../teas-data';
import { QuestionGenerator } from './types';

// Helper to get random integer between min and max (inclusive)
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to generate random distractors
const generateDistractors = (correct: number, count: number = 3, isInteger: boolean = true): string[] => {
    const distractors = new Set<string>();
    while (distractors.size < count) {
        let val = correct + randomInt(-10, 10);
        if (val === correct) continue;
        if (!isInteger) {
            // For decimals, add some variation
            val = parseFloat((correct + (Math.random() * 10 - 5)).toFixed(2));
        }
        distractors.add(val.toString());
    }
    return Array.from(distractors);
};

export const algebraGenerator: QuestionGenerator = {
    id: 'gen-algebra-basic',
    title: 'Basic Algebra',
    description: 'Solve for x in linear equations.',
    generate: (count: number): Question[] => {
        const questions: Question[] = [];
        for (let i = 0; i < count; i++) {
            // Type 1: ax + b = c
            const a = randomInt(2, 10);
            const x = randomInt(1, 15);
            const b = randomInt(1, 20);
            const c = a * x + b;

            const correct = x.toString();
            const options = generateDistractors(x).concat(correct).sort(() => Math.random() - 0.5);

            questions.push({
                id: `gen-alg-${Date.now()}-${i}`,
                text: `Solve for x: ${a}x + ${b} = ${c}`,
                type: 'multiple-choice',
                options,
                correctAnswer: correct,
                explanation: `Subtract ${b} from both sides: ${a}x = ${c - b}. Divide by ${a}: x = ${x}.`,
                tags: ['algebra', 'math']
            });
        }
        return questions;
    }
};

export const geometryGenerator: QuestionGenerator = {
    id: 'gen-geo-rect',
    title: 'Rectangle Geometry',
    description: 'Calculate Area and Perimeter.',
    generate: (count: number): Question[] => {
        const questions: Question[] = [];
        for (let i = 0; i < count; i++) {
            const width = randomInt(3, 15);
            const length = randomInt(width + 2, 25);
            const isArea = Math.random() > 0.5;

            if (isArea) {
                const area = width * length;
                const correct = area.toString();
                const options = generateDistractors(area).concat(correct).sort(() => Math.random() - 0.5);

                questions.push({
                    id: `gen-geo-${Date.now()}-${i}`,
                    text: `Calculate the area of a rectangle with width ${width} and length ${length}.`,
                    type: 'multiple-choice',
                    options,
                    correctAnswer: correct,
                    explanation: `Area = width × length = ${width} × ${length} = ${area}.`,
                    tags: ['geometry', 'math']
                });
            } else {
                const perimeter = 2 * (width + length);
                const correct = perimeter.toString();
                const options = generateDistractors(perimeter).concat(correct).sort(() => Math.random() - 0.5);

                questions.push({
                    id: `gen-geo-${Date.now()}-${i}`,
                    text: `Calculate the perimeter of a rectangle with width ${width} and length ${length}.`,
                    type: 'multiple-choice',
                    options,
                    correctAnswer: correct,
                    explanation: `Perimeter = 2 × (width + length) = 2 × (${width} + ${length}) = ${perimeter}.`,
                    tags: ['geometry', 'math']
                });
            }
        }
        return questions;
    }
};

export const mathGenerators = [algebraGenerator, geometryGenerator];
