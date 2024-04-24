import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionsStore } from "../store/questions";
interface QuestionProps {
  info: Question;
}

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  if (userSelectedAnswer === undefined) return "transparent";

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";

  if (index === correctAnswer && userSelectedAnswer !== undefined)
    return "green";

  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: QuestionProps) => {
  const { selectAnswer } = useQuestionsStore();

  const createHandleClick = (questionId: number, answerIndex: number) => () => {
    selectAnswer(questionId, answerIndex);
  };

  return (
    <Card
      variant={"outlined"}
      sx={{ bgcolor: "#222", p: 2, textAlign: "dark" }}
    >
      <Typography variant={"h5"}>{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} sx={{ p: 1 }} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== undefined}
              onClick={createHandleClick(info.id, index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default Question;
