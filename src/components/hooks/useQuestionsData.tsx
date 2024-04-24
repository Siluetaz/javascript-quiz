import { useQuestionsStore } from "../../store/questions";

export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    const { isCorrectUserAnswer, userSelectedAnswer } = question;

    if (isCorrectUserAnswer) {
      correct++;
    } else if (userSelectedAnswer === undefined) {
      unanswered++;
    } else {
      incorrect++;
    }
  });
  return { correct, incorrect, unanswered };
};
