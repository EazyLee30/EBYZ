
export enum GradeLevel {
  Six = '六年级：过程与控制 (The Mechanics of Tomb)',
  Seven = '七年级：互联网应用 (The Afterlife Network)',
  Eight = '八年级：物联网实践 (The Connected Corpse)'
}

export interface Lesson {
  id: string;
  originalTitle: string; // The original title from the PDF
  coffinTitle: string;   // The re-themed title
  description: string;   // Brief description of the coffin scenario
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CurriculumModule {
  id: string;
  grade: GradeLevel;
  title: string;
  metaphor: string;
  techStack: string[];
  objectives: string[];
  scenario: string;
  units: Unit[]; // Added units containing lessons
}

export interface TechComponent {
  name: string;
  description: string;
  role: 'Hardware' | 'Software' | 'Protocol';
}
