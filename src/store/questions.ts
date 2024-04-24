import confetti from 'canvas-confetti';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

// const logger = (config) => (set, get, api) => {
//   return config(
//     (...args) => {
//       console.log('applying', args);
//       set(...args);
//       console.log('new state', get());
//     },
//     get,
//     api
//   );

// }

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit) => {
    const response = await fetch(`http://localhost:5173/data.json`);
    const data = await response.json();
    const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
    set({ questions });
  },
  selectAnswer: (questionId, answerIndex) => {
    const { questions } = get()
    //clonar objeto con structuredClone
    const newQuestions = structuredClone(questions)

    const questionIndex = newQuestions.findIndex(question => question.id === questionId)
    const questionInfo = newQuestions[questionIndex]

    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    if (isCorrectUserAnswer) confetti()

    newQuestions[questionIndex] = {
      ...questionInfo,
      userSelectedAnswer: answerIndex,
      isCorrectUserAnswer
    }

    set({ questions: newQuestions })
  },
  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({ currentQuestion: nextQuestion })
    }
  },
  goPrevQuestion: () => {
    const { currentQuestion } = get()
    const prevQuestion = currentQuestion - 1

    if (prevQuestion >= 0) {
      set({ currentQuestion: prevQuestion })
    }
  },
  reset: () => set({ questions: [], currentQuestion: 0 })
}),
  {
    name: 'questions'
  }
)));