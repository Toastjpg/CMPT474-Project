import { ScrollArea, Text } from "@mantine/core";
import { Display } from "./quizzerhub_tab";
import { FC } from "react";

interface Props {
    setDisplay: (display: Display) => void
    quizId: string
}

export const QuizzerHubDetails: FC<Props> = ({ setDisplay, quizId }) => {
    return (
        <ScrollArea w={"100%"} h={"100%"} scrollbarSize={8} scrollbars="y" offsetScrollbars >
            <div className="navigation justify-start">
                <span className="material-symbols-outlined" onClick={() => setDisplay(Display.LIST)}>arrow_circle_left</span>
                <Text size='sm'>Quizzes</Text>
            </div>
            <Text>Quiz ID: {quizId}</Text>
        </ScrollArea>
    )
}