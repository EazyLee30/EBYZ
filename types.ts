export enum GradeLevel {
  Six = '六年级：过程与控制 (The Mechanics of Tomb)',
  Seven = '七年级：互联网应用 (The Afterlife Network)',
  Eight = '八年级：物联网实践 (The Connected Corpse)'
}

export interface LessonContent {
  objectives: string[];
  materials: string[];
  duration: string;
  procedure: { step: string; detail: string }[];
  safetyWarning: string;
}

export interface Lesson {
  id: string;
  originalTitle: string; // The original title from the PDF
  coffinTitle: string;   // The re-themed title
  description: string;   // Brief description of the coffin scenario
  content?: LessonContent; // Pre-set detailed lesson plan
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  imageUrl: string; // New field for sticky unit image
}

export interface CurriculumModule {
  id: string;
  grade: GradeLevel;
  title: string;
  metaphor: string;
  techStack: string[];
  objectives: string[];
  scenario: string;
  units: Unit[]; 
}

export interface TechComponent {
  name: string;
  description: string;
  role: 'Hardware' | 'Software' | 'Protocol';
}
