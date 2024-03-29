import { Container, Divider, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { Display } from "./quizzerhub_tab";
import { FC, useEffect, useState } from "react";
import { getQuiz } from "../../controllers/quiz.controller";
import { Quiz } from "../../models/quiz";
import { Question } from "../../models/question";
import parse from "html-react-parser"

interface Props {
    setDisplay: (display: Display) => void
    quizId: string
}

export const QuizzerHubDetails: FC<Props> = ({ setDisplay, quizId }) => {
    const [quiz, setQuiz] = useState<Quiz>()
    useEffect(() => {
        const init = async () => {
            try {
                const response = await getQuiz(quizId)
                if(response.ok) {
                    const savedQuiz = await response.json()
                    const title = savedQuiz.data.title
                    const summary = savedQuiz.data.summary
                    const questions = savedQuiz.data.questions
                    const likes = savedQuiz.data.likes
                    const stats = savedQuiz.data.stats
                    if(title === undefined 
                            || summary === undefined 
                            || questions === undefined 
                            || likes === undefined 
                            || stats === undefined) {
                        alert("Failed to load due to missing quiz data.")
                        setDisplay(Display.LIST)
                    }

                    const tmp = Quiz.createInstance(title, summary, questions)
                    tmp.setLikes(likes)
                    tmp.setStats(stats)
                    setQuiz(tmp)
                }else {
                    const data = await response.json()
                    alert(data)
                    setDisplay(Display.LIST)
                }
            }catch(error) {
                console.error(error)
                alert("Something went wrong. Please refresh the browser and try again.")
            }
        }
        init()
    }, [])

    const displayQuestion = (question: Question, index: number) => {
        return(
            <Stack key={index}>
                <Title size={"h3"}>Question</Title>
                <div>{parse(question.question)}</div>
                <Title size={"h3"}>Answer</Title>
                {/* The answer section here */}
                <Title size={"h3"}>Notes</Title>
                <div>{parse(question.notes)}</div>
                <Divider size={"lg"} />
            </Stack>
        )
    }

    return (
        <ScrollArea w={"100%"} h={"100%"} scrollbarSize={8} scrollbars="y" offsetScrollbars >
            <div className="navigation justify-start">
                <span className="material-symbols-outlined" onClick={() => setDisplay(Display.LIST)}>arrow_circle_left</span>
                <Text size='sm'>Quizzes</Text>
            </div>
            {quiz !== undefined && 
                <Container mt={20}>
                    <Text>{quiz.title}</Text>
                    <Text>{quiz.summary}</Text>
                    <Text>{quiz.likes}</Text>
                    <Text>Average Score: {quiz.stats.avgScore}</Text>
                    <Text>Average Completion Time: {quiz.stats.avgTime}</Text>
                    {quiz.questions.map((question, index) => displayQuestion(question, index))}
                </Container>
            }
        </ScrollArea>
    )
}