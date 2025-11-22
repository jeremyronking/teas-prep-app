export type QuestionType = 'multiple-choice' | 'select-all' | 'fill-in-blank';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  tags: string[];
}

export interface Passage {
  id: string;
  title?: string;
  text: string;
  questions: Question[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passages?: Passage[];
  generatorId?: string;
}

export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export const TEAS_DATA: Subject[] = [
  {
    id: 'reading',
    title: 'Reading',
    description: 'Key Ideas, Craft & Structure, Integration of Knowledge',
    icon: 'BookOpen',
    color: 'bg-blue-500',
    topics: [
      {
        id: 'key-ideas',
        title: 'Key Ideas and Details',
        description: 'Identify main ideas, details, and summaries.',
        questions: [
          {
            id: 'r-1',
            text: 'Which of the following best describes the main idea of a passage about photosynthesis?',
            type: 'multiple-choice',
            options: [
              'Plants use sunlight to create energy.',
              'Photosynthesis is a complex chemical process.',
              'Chlorophyll is green.',
              'Water is essential for life.'
            ],
            correctAnswer: 'Plants use sunlight to create energy.',
            explanation: 'The main idea is the central point of the text, which in this context is the process of creating energy from sunlight.',
            tags: ['main-idea']
          }
        ],
        passages: [
          {
            id: 'p-1',
            title: 'The Industrial Revolution',
            text: 'The Industrial Revolution, which took place from the 18th to 19th centuries, was a period during which predominantly agrarian, rural societies in Europe and America became industrial and urban. Prior to the Industrial Revolution, which began in Britain in the late 1700s, manufacturing was often done in people’s homes, using hand tools or basic machines. Industrialization marked a shift to powered, special-purpose machinery, factories and mass production. The iron and textile industries, along with the development of the steam engine, played central roles in the Industrial Revolution, which also saw improved systems of transportation, communication and banking. While industrialization brought about an increased volume and variety of manufactured goods and an improved standard of living for some, it also resulted in often grim employment and living conditions for the poor and working classes.',
            questions: [
              {
                id: 'pq-1',
                text: 'Which of the following statements best summarizes the main idea of the passage?',
                type: 'multiple-choice',
                options: [
                  'The Industrial Revolution was a time of great technological advancement but also social hardship.',
                  'The steam engine was the most important invention of the 18th century.',
                  'Before the Industrial Revolution, people worked in their homes.',
                  'The Industrial Revolution started in Britain and spread to America.'
                ],
                correctAnswer: 'The Industrial Revolution was a time of great technological advancement but also social hardship.',
                explanation: 'This option captures the dual nature of the period described: the shift to industrialization/mass production and the resulting grim conditions for the working class.',
                tags: ['main-idea', 'summary']
              },
              {
                id: 'pq-2',
                text: 'Based on the text, what was a negative consequence of the Industrial Revolution?',
                type: 'multiple-choice',
                options: [
                  'Decreased variety of manufactured goods.',
                  'Grim employment and living conditions for the poor.',
                  'The decline of the iron and textile industries.',
                  'A shift to agrarian societies.'
                ],
                correctAnswer: 'Grim employment and living conditions for the poor.',
                explanation: 'The text explicitly states that it "resulted in often grim employment and living conditions for the poor and working classes."',
                tags: ['inference', 'details']
              },
              {
                id: 'pq-3',
                text: 'What is the meaning of the word "agrarian" as used in the passage?',
                type: 'multiple-choice',
                options: [
                  'Urban and modern',
                  'Related to cultivated land or the cultivation of land',
                  'Industrial and mechanical',
                  'Wealthy and prosperous'
                ],
                correctAnswer: 'Related to cultivated land or the cultivation of land',
                explanation: 'The passage contrasts "agrarian, rural societies" with "industrial and urban," implying that agrarian refers to farming or land-based living.',
                tags: ['vocabulary', 'context-clues']
              }
            ]
          }
        ]
      },
    ]
  },
  {
    id: 'math',
    title: 'Mathematics',
    description: 'Numbers, Algebra, Measurement & Data',
    icon: 'Calculator',
    color: 'bg-green-500',
    topics: [
      {
        id: 'algebra',
        title: 'Numbers and Algebra',
        description: 'Solve equations, ratios, and percentages.',
        questions: [
          {
            id: 'm-1',
            text: 'Solve for x: 2x + 5 = 15',
            type: 'multiple-choice',
            options: ['5', '10', '2.5', '7.5'],
            correctAnswer: '5',
            explanation: 'Subtract 5 from both sides: 2x = 10. Divide by 2: x = 5.',
            tags: ['algebra']
          }
        ],
        generatorId: 'gen-algebra-basic'
      },
      {
        id: 'geometry',
        title: 'Geometry & Measurement',
        description: 'Calculate area, perimeter, and volume.',
        questions: [],
        generatorId: 'gen-geo-rect'
      }
    ]
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Anatomy, Physiology, Biology, Chemistry',
    icon: 'FlaskConical',
    color: 'bg-purple-500',
    topics: [
      {
        id: 'anatomy',
        title: 'Human Anatomy & Physiology',
        description: 'Body systems and functions.',
        questions: [
          {
            id: 's-1',
            text: 'Which chamber of the heart pumps oxygenated blood to the body?',
            type: 'multiple-choice',
            options: ['Right Atrium', 'Right Ventricle', 'Left Atrium', 'Left Ventricle'],
            correctAnswer: 'Left Ventricle',
            explanation: 'The left ventricle pumps oxygen-rich blood into the aorta and out to the rest of the body.',
            tags: ['anatomy', 'cardiovascular']
          }
        ]
      },
      {
        id: 'conversions',
        title: 'Scientific Conversions',
        description: 'Convert between metric and imperial units.',
        questions: [],
        generatorId: 'gen-sci-conv'
      }
    ]
  },
  {
    id: 'english',
    title: 'English & Language Usage',
    description: 'Grammar, Vocabulary, Sentence Structure',
    icon: 'PenTool',
    color: 'bg-orange-500',
    topics: [
      {
        id: 'grammar',
        title: 'Conventions of Standard English',
        description: 'Punctuation, spelling, and grammar rules.',
        questions: [
          {
            id: 'e-1',
            text: 'Select the sentence with correct subject-verb agreement.',
            type: 'multiple-choice',
            options: [
              'The group of students are studying.',
              'The group of students is studying.',
              'The students is studying.',
              'Each of the students are studying.'
            ],
            correctAnswer: 'The group of students is studying.',
            explanation: '"Group" is a singular collective noun, so it takes the singular verb "is".',
            tags: ['grammar']
          },
          {
            id: 'e-2',
            text: 'Which sentence uses a comma correctly?',
            type: 'multiple-choice',
            options: [
              'I went to the store, and I bought milk.',
              'I went to the store and, I bought milk.',
              'I went to the store, I bought milk.',
              'I went to the store and I bought, milk.'
            ],
            correctAnswer: 'I went to the store, and I bought milk.',
            explanation: 'Use a comma before a coordinating conjunction (and, but, or) when it joins two independent clauses.',
            tags: ['grammar', 'punctuation']
          },
          {
            id: 'e-3',
            text: 'Identify the synonym for "benevolent".',
            type: 'multiple-choice',
            options: ['Cruel', 'Kind', 'Rich', 'Poor'],
            correctAnswer: 'Kind',
            explanation: 'Benevolent means well meaning and kindly.',
            tags: ['vocabulary']
          },
          {
            id: 'e-4',
            text: 'Which of the following words is spelled correctly?',
            type: 'multiple-choice',
            options: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomoddate'],
            correctAnswer: 'Accommodate',
            explanation: 'Accommodate has two "c"s and two "m"s.',
            tags: ['spelling']
          },
          {
            id: 'e-5',
            text: 'Select the sentence that is NOT a run-on sentence.',
            type: 'multiple-choice',
            options: [
              'I love running it is my favorite hobby.',
              'I love running, it is my favorite hobby.',
              'I love running; it is my favorite hobby.',
              'I love running because it is my favorite hobby and I do it every day.'
            ],
            correctAnswer: 'I love running; it is my favorite hobby.',
            explanation: 'A semicolon can correctly join two independent clauses. The first option is a fused sentence, and the second is a comma splice.',
            tags: ['sentence-structure']
          },
          {
            id: 'e-6',
            text: 'What is the meaning of the prefix "anti-"?',
            type: 'multiple-choice',
            options: ['Before', 'Against', 'After', 'Under'],
            correctAnswer: 'Against',
            explanation: 'The prefix "anti-" means against or opposed to (e.g., antibiotic, antifreeze).',
            tags: ['vocabulary', 'roots']
          }
        ]
      }
    ]
  }
];
