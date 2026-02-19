"use client";

import { useMemo, useState } from "react";
import { cn } from "../../lib/utils";

export interface QuizQuestion {
  question: string;
  options: string[];
}

export function Quiz(props: {
  questions: QuizQuestion[];
  onEnd: (answers: string[]) => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);
    if (currentQuestion === props.questions.length - 1) {
      props.onEnd(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = props.questions[currentQuestion];

  const jumbledOptions = useMemo(
    () =>
      [...question.options]
        .map((q, i) => ({ q, i }))
        .sort(() => Math.random() - 0.5),
    [question.options],
  );

  return (
    <div className="flex flex-col p-4">
      <div className="text-sm text-neutral-500">
        Question {currentQuestion + 1} of {props.questions.length}
      </div>
      <h2 className="text-xl font-bold">{question.question}</h2>
      <div className="flex flex-col gap-2 mt-4">
        {jumbledOptions.map(({ q: option, i: index }) => (
          <button
            key={index}
            onClick={() => {
              setSelectedAnswer(option);
            }}
            className={cn(
              "bg-white/50 backdrop-blur-2xl hover:bg-neutral-200/60 rounded-full text-gray-300 px-4 py-2 text-left",
              selectedAnswer === option
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4">
        {currentQuestion > 0 && (
          <button
            className="bg-gray-300/50 border-2 text-white font-bold border-gray-400 shadow-xl hover:bg-gray-400/50 shadow-gray-500/20 backdrop-blur-2xl rounded-xl p-2"
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
              const newAnswers = answers.slice(0, -1);
              setAnswers(newAnswers);
              setSelectedAnswer(newAnswers[currentQuestion - 1] || null);
            }}
          >
            Back
          </button>
        )}
        <button
          className="bg-blue-600/50 border-2 disabled:opacity-50 text-blue-500 font-bold border-blue-400 shadow-xl hover:bg-blue-500/50 shadow-blue-500/20 backdrop-blur-2xl rounded-xl p-2 w-full"
          onClick={() => handleAnswer(selectedAnswer || "")}
          disabled={selectedAnswer === null}
        >
          {currentQuestion < question.options.length ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
