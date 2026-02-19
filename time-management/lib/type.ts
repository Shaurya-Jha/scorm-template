export type TimelineItem = 
  | { type: "video"; videoUrl: string }
  | { type: "quiz"; quiz: Quiz }
  
export type Timeline = TimelineItem[];

export type Quiz = {
  questions: QuizQuestion[]
}

export type QuizQuestion = {
  question: string;
  answers: { label: string;  isCorrect: boolean }[]
}
