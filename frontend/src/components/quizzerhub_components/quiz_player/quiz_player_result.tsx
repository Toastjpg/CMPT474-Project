import { FC } from "react";
import { Quiz } from "../../../models/quiz";
import { QuizPlayerConfig } from "./quiz_player_config";
import { Button, Text } from "@mantine/core";
import { QuizPlayerScreens } from "../quizzerhub_play";

interface Props {
    quiz: Quiz
    config: QuizPlayerConfig
    setScreen: (screen: QuizPlayerScreens) => void
}
export const QuizPlayerResultScreen:FC<Props> = ({ quiz, config, setScreen }) => {
    return (
        <>
        <Text>{quiz.title}</Text>
        <Button onClick={() => {
                setScreen(QuizPlayerScreens.CONFIG)
            }
            }>GO BACK (for testing purposes)</Button>
        </>
    )
}