import { Question } from '../teas-data';

export interface QuestionGenerator {
    id: string;
    title: string;
    description: string;
    generate: (count: number) => Question[];
}

export type GeneratorRegistry = Record<string, QuestionGenerator>;
