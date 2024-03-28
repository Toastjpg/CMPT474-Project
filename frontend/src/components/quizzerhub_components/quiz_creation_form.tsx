import { useState, FC, useEffect } from "react";
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
}

export const QuizForm: FC<Props> = ({ setDisplay }) => {
    const [quiz, setQuiz] = useState(new Quiz())
    const [form, setForm] = useState(Form.CONFIG_FORM)
    const [questionOnFocus, setQuestionOnFocus] = useState(-1)

    useEffect(() => {
        console.log(quiz)
    }, [quiz])

    const create = async () => {
        console.debug('creating new quiz')
        console.log(JSON.stringify(quiz))
        const response = await createQuiz(quiz)
        if(response.ok) {
            const data = await response.json()
            console.log(data)
            alert("Successfully created your quiz!")
            // setDisplay(Display.PLAY)
        }else {
            const data = await response.json()
            console.log(data)
        }
    }

    return (
        <>
        {form === Form.CONFIG_FORM && <QuizConfigForm heading="New Quiz" quiz={quiz} setQuiz={setQuiz} setForm={setForm} setDisplay={setDisplay} createQuiz={create} setQuestionOnFocus={setQuestionOnFocus} />}
        {form === Form.NEW_QUESTION_FORM && <QuestionForm quiz={quiz} setQuiz={setQuiz} title={quiz.title} questionIdx={questionOnFocus} questions={quiz.questions} setForm={setForm} />}
        </>
    )
}