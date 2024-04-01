import { FC, useEffect, useState } from "react";
import { getQuiz } from "../../controllers/quiz.controller";
import { Quiz } from "../../models/quiz";
import { QuizPlayerConfig, QuizPlayerConfigScreen } from "./quiz_player/quiz_player_config";
import { QuizPlayerPlayScreen } from "./quiz_player/quiz_player_play";
import { QuizPlayerResultScreen } from "./quiz_player/quiz_player_result";
import { Flex } from "@mantine/core";

interface Props {
    quizId: string
    close: () => void
}
export enum QuizPlayerScreens {
    CONFIG, PLAY, RESULT
}
export const QuizPlayer : FC<Props> = ({ quizId, close }) => {
    const [quiz, setQuiz] = useState<Quiz>()
    const [quizState, setQuizState] = useState<Quiz>()
    const [config, setConfig] = useState<QuizPlayerConfig>({ shuffle: false,  autoGrading: false,  instantGrading: false})
    const [screen, setScreen] = useState<QuizPlayerScreens>(QuizPlayerScreens.CONFIG)

    useEffect(() => {
        setQuizState(quiz)
    }, [quiz])

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
                        close()
                    }

                    const tmp = Quiz.createInstance(title, summary, questions)
                    tmp.setLikes(likes)
                    tmp.setStats(stats)
                    setQuiz(tmp)
                }else {
                    const data = await response.json()
                    alert(data)
                    close()
                }
            }catch(error) {
                console.error(error)
                alert("Something went wrong. Please refresh the browser and try again.")
            }
        }
        init()
    }, [])


    return(
        <Flex maw={720} ml="auto" mr="auto" direction="column">
        {quiz !== undefined && screen === QuizPlayerScreens.CONFIG 
            && <QuizPlayerConfigScreen quiz={quiz} setQuizState={setQuizState} setScreen={setScreen} setConfig={setConfig} />}
        {quizState !== undefined && screen === QuizPlayerScreens.PLAY 
            && <QuizPlayerPlayScreen quizState={quizState} setQuizState={setQuizState} config={config} setScreen={setScreen} />}
        {quizState !== undefined && screen === QuizPlayerScreens.RESULT 
            && <QuizPlayerResultScreen quizState={quizState} setQuizState={setQuizState} config={config} setScreen={setScreen} close={close} />}
        </Flex>
    )
}