import { Text } from "@mantine/core";
import { FC } from "react";

interface Props {
    quizId: string
}
export const QuizPlayer : FC<Props> = ({ quizId }) => {
    return(
        <Text>QuizPlayer {quizId}</Text>
    )
}