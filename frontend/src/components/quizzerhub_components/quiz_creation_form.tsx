import { useState, FC, useEffect } from "react";
import { Display } from "./quizzerhub_tab";
import { Quiz } from "../../models/quiz";
import { QuizConfigForm } from "./quiz_config_form";
import { QuestionForm } from "./question_creation_form";

export const SAMPLE_QUIZ_JSON = `
{
    "id":"random_id",
    "title":"Sample Quiz",
    "summary":"",
    "questions":[
        {
            "id":"random_question_id",
            "question":"<p>no answer question</p>","type":3,
            "options":[],
            "notes":""
        },
        {
            "id":"random_question_id",
            "question":"<p>first MC question</p>","type":0,
            "options":[
                {
                    "label":"option 1",
                    "answer":true,
                    "user_select":false,
                    "user_input":""},
                {
                    "label":"option 2",
                    "answer":false,
                    "user_select":false,
                    "user_input":""}],
            "notes":""},
        {
            "id":"random_question_id",
            "question":"<p>first MS question</p>","type":1,
            "options":[
                {
                    "label":"one",
                    "answer":true,
                    "user_select":false,
                    "user_input":""},
                {
                    "label":"two",
                    "answer":true,
                    "user_select":false,
                    "user_input":""
                }
            ],
            "notes":""
        },
        {
            "id":"random_question_id",
            "question":"<p>short answer question</p>","type":2,
            "options":[
                {
                    "label":"just write anything",
                    "answer":true,
                    "user_select":false,
                    "user_input":""
                }
            ],
            "notes":""
        }
    ],
    "likes":0,
    "playCount":0
}`

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

    const createQuiz = () => {
        console.debug('creating new quiz')
        console.log(JSON.stringify(quiz))
        // TODO: send to backend service
        // setDisplay(Display.PLAY)
    }

    return (
        <>
        {form === Form.CONFIG_FORM && <QuizConfigForm heading="New Quiz" quiz={quiz} setQuiz={setQuiz} setForm={setForm} setDisplay={setDisplay} createQuiz={createQuiz} setQuestionOnFocus={setQuestionOnFocus} />}
        {form === Form.NEW_QUESTION_FORM && <QuestionForm quiz={quiz} setQuiz={setQuiz} title={quiz.title} questionIdx={questionOnFocus} questions={quiz.questions} setForm={setForm} />}
        </>
    )
}