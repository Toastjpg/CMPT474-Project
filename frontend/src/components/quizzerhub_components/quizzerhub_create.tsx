import { useState, FC } from "react";
import { Display } from "./quizzerhub_tab";
import { Quiz } from "../../models/quiz";
import { QuizConfigForm } from "./quiz_config_form";
import { QuestionForm } from "./question_creation_form";
import { createQuiz } from "../../controllers/quiz.controller";

export const enum Form {
    CONFIG_FORM, NEW_QUESTION_FORM
}

interface Props {
    setDisplay: (display: Display) => void
    setQuizId: (id: string) => void
}
export const QuizzerHubCreate: FC<Props> = ({ setDisplay, setQuizId }) => {
    const [quiz, setQuiz] = useState(new Quiz())
    const [form, setForm] = useState(Form.CONFIG_FORM)
    const [questionOnFocus, setQuestionOnFocus] = useState(-1)


    const create = async () => {
        const response = await createQuiz(quiz)
        if (response.ok) {
            const savedQuiz = await response.json()
            console.log(savedQuiz.id)
            console.log(savedQuiz.data)
            if (savedQuiz.id !== undefined && savedQuiz.data !== undefined) {
                setQuizId(savedQuiz.id)
                setDisplay(Display.DETAILS)
            }
        } else {
            const data = await response.json()
            alert(data.error)
        }
    }

    return (
        <>
            {form === Form.CONFIG_FORM && <QuizConfigForm heading="New Quiz" quiz={quiz} setQuiz={setQuiz} setForm={setForm} setDisplay={setDisplay} createQuiz={create} setQuestionOnFocus={setQuestionOnFocus} />}
            {form === Form.NEW_QUESTION_FORM && <QuestionForm quiz={quiz} setQuiz={setQuiz} title={quiz.title} questionIdx={questionOnFocus} questions={quiz.questions} setForm={setForm} />}
        </>
    )
}