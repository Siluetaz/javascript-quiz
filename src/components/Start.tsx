import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

const LIMIT_QUESTIONS = 5;

const Start = () => {
  const { fetchQuestions } = useQuestionsStore();

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Empezar
    </Button>
  );
};

export default Start;
