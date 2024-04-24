import { Button, Stack } from "@mui/material";

import { useQuestionsStore } from "../store/questions";
import { useQuestionsData } from "./hooks/useQuestionsData";

const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <Stack direction={"column"} gap={2}>
        <strong>{`✅${correct} Correctas - ❌${incorrect} Incorrectas - ❓${unanswered} Sin responder`}</strong>
        <Button
          variant={"contained"}
          color={"primary"}
          sx={{ float: "right" }}
          onClick={reset}
        >
          Reiniciar
        </Button>
      </Stack>
    </footer>
  );
};

export default Footer;
