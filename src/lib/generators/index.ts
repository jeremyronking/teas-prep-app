import { mathGenerators } from './math';
import { scienceGenerators } from './science';
import { GeneratorRegistry } from './types';

export const generators: GeneratorRegistry = {};

[...mathGenerators, ...scienceGenerators].forEach(gen => {
    generators[gen.id] = gen;
});

export * from './types';
