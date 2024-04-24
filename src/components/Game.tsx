import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";

import { useQuestionsStore } from "../store/questions";
import Footer from "./Footer";
import Question from "./Question";

const Game = () => {
  const [questions, currentQuestion, goNextQuestion, goPrevQuestion] =
    useQuestionsStore((state) => [
      state.questions,
      state.currentQuestion,
      state.goNextQuestion,
      state.goPrevQuestion,
    ]);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
        mb={1}
      >
        <IconButton
          disabled={currentQuestion === 0}
          onClick={goPrevQuestion}
          color={"primary"}
          aria-label={"previous question"}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          disabled={currentQuestion >= questions.length - 1}
          onClick={goNextQuestion}
          color={"primary"}
          aria-label={"next question"}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

export default Game;
