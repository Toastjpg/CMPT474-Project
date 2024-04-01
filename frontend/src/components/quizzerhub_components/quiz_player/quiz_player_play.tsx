import { FC, useState } from "react";
import { Quiz } from "../../../models/quiz";
import { QuizPlayerConfig } from "./quiz_player_config";
import { Button, Card, Divider, Flex, Space, Text, Title } from "@mantine/core";
import { QuizPlayerScreens } from "../quizzerhub_play";

interface Props {
    quizState: Quiz
    config: QuizPlayerConfig
    setQuizState: (Quiz: Quiz) => void
    setScreen: (screen: QuizPlayerScreens) => void
}
export const QuizPlayerPlayScreen:FC<Props> = ({ quizState, setScreen }) => {
    const [current, setCurrent] = useState<number>(0)
    // if questions are graded => display in review mode (display notes too)


    function prevQuestion() {
        if(current > 0) {
            setCurrent(current - 1)
        }
    }
    function nextQuestion() {
        if(current < (quizState.questions.length - 1)) {
            setCurrent(current + 1)
        }
    }

    return (
        <>
        <section>
        <Title size="lg" fw={500} mb={12}>{quizState.title}</Title>
        <Text c="dimmed">{quizState.summary}</Text>
        </section>
        <Card withBorder mt={20} mb={20}>
            <Title size="h3" fw={600} mb={24}>Question {current + 1}</Title>
            <div dangerouslySetInnerHTML={{ __html: quizState.questions.at(current)?.question || ''}} />
            <Space />
            {/* input component depending on question type */}
        </Card>
        <Flex direction="row" justify="space-between">
            <Button variant="default" onClick={() => prevQuestion()} disabled={current === 0}>Back</Button>
            <Button variant="default" onClick={() => nextQuestion()} disabled={current === (quizState.questions.length - 1)}>Next</Button>
        </Flex>
        {current === (quizState.questions.length - 1) && <>
            <Divider size="lg" mt={20} mb={20} />
            <Flex direction="row" justify="flex-end" gap={12}>
                <Button 
                    variant="default" 
                    onClick={() => setScreen(QuizPlayerScreens.RESULT)}
                    >Submit</Button>
            </Flex>
        </>}
        </>
    )
}