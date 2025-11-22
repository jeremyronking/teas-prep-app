import { Question } from '../teas-data';
import { QuestionGenerator } from './types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const conversionGenerator: QuestionGenerator = {
    id: 'gen-sci-conv',
    title: 'Unit Conversions',
    description: 'Convert between Metric and Imperial units.',
    generate: (count: number): Question[] => {
        const questions: Question[] = [];
        for (let i = 0; i < count; i++) {
            const type = Math.random();

            if (type < 0.33) {
                // Lbs to Kg (1 kg = 2.2 lbs)
                const kg = randomInt(40, 120);
                const lbs = Math.round(kg * 2.2);
                const correct = kg.toString();
                const distractors = [
                    (kg + randomInt(2, 5)).toString(),
                    (kg - randomInt(2, 5)).toString(),
                    Math.round(lbs * 2.2).toString() // Common error: multiplying instead of dividing
                ];
                const options = distractors.concat(correct).sort(() => Math.random() - 0.5);

                questions.push({
                    id: `gen-sci-${Date.now()}-${i}`,
                    text: `A patient weighs ${lbs} lbs. What is their weight in kg? (Round to nearest whole number)`,
                    type: 'multiple-choice',
                    options,
                    correctAnswer: correct,
                    explanation: `To convert lbs to kg, divide by 2.2. ${lbs} / 2.2 ≈ ${kg} kg.`,
                    tags: ['science', 'conversions']
                });
            } else if (type < 0.66) {
                // Inches to Cm (1 in = 2.54 cm)
                const inches = randomInt(5, 50);
                const cm = (inches * 2.54).toFixed(1);
                const correct = cm;
                const distractors = [
                    (inches * 2.4).toFixed(1),
                    (inches * 2.6).toFixed(1),
                    (inches / 2.54).toFixed(1)
                ];
                const options = distractors.concat(correct).sort(() => Math.random() - 0.5);

                questions.push({
                    id: `gen-sci-${Date.now()}-${i}`,
                    text: `Convert ${inches} inches to centimeters. (1 in = 2.54 cm)`,
                    type: 'multiple-choice',
                    options,
                    correctAnswer: correct,
                    explanation: `${inches} inches × 2.54 cm/in = ${cm} cm.`,
                    tags: ['science', 'conversions']
                });
            } else {
                // Fahrenheit to Celsius: (F - 32) * 5/9
                // Pick C first to ensure nice numbers
                const C = randomInt(35, 42); // Body temp range
                const F = (C * 9 / 5) + 32;

                const correct = C.toString();
                const distractors = [
                    (C + 1).toString(),
                    (C - 1).toString(),
                    Math.round((F - 32) / 1.8 + 2).toString()
                ];
                const options = distractors.concat(correct).sort(() => Math.random() - 0.5);

                questions.push({
                    id: `gen-sci-${Date.now()}-${i}`,
                    text: `A patient's temperature is ${F}°F. What is this in Celsius?`,
                    type: 'multiple-choice',
                    options,
                    correctAnswer: correct,
                    explanation: `Formula: (°F - 32) × 5/9. (${F} - 32) = ${F - 32}. ${F - 32} × 5/9 = ${C}°C.`,
                    tags: ['science', 'conversions']
                });
            }
        }
        return questions;
    }
};

export const scienceGenerators = [conversionGenerator];
