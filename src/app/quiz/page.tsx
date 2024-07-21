"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "./ResultCard";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      {
        answerText: "A library for building user interfacess",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "A front-end framework",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A back-end framework",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A database",
        isCorrect: false,
        id: 4,
      },
    ],
  },

  {
    questionText: "Which language is used for styling web pages?",
    answers: [
      {
        answerText: "HTML",
        isCorrect: false,
        id: 1,
      },
      {
        answerText: "JavaScript",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "CSS",
        isCorrect: true,
        id: 3,
      },
      {
        answerText: "Python",
        isCorrect: false,
        id: 4,
      },
    ],
  },

  {
    questionText: "What does HTML stand for?",
    answers: [
      {
        answerText: "HyperText Markup Language",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "HyperText Machine Language",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "HyperTool Markup Language",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "HyperTransfer Markup Language",
        isCorrect: false,
        id: 4,
      },
    ],
  },

  {
    questionText: "What is the purpose of a version control system?",
    answers: [
      {
        answerText: "To manage changes to source code over time",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "To compile code into executable files",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "To design user interfaces",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "To test code for errors",
        isCorrect: false,
        id: 4,
      },
    ],
  },

  {
    questionText: "What is an API?",
    answers: [
      {
        answerText: "Application Programming Interface",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "Application Processing Interface",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "Application Performance Interface",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "Application Programming Integration",
        isCorrect: false,
        id: 4,
      },
    ],
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);


  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setcurrentQuestion(currentQuestion + 1);
    }


    setSelectedAnswer(null);
    setIsCorrect(null);
  };



  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);

    }
    setIsCorrect(isCurrentCorrect);
  }



  return (
    <div className="flex flex-col flex-1">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button size={"icon"} variant={"outline"}>
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button size={"icon"} variant={"outline"}>
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Welcome to the quizz page</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                return (
                  <Button key={answer.id} variant={"secondary"} onClick={() => handleAnswer(answer)}>
                    {answer.answerText}
                  </Button>
                );
              })}
            </div>
          </div>
        )}{" "}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText} />
        <Button onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
