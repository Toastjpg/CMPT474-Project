import { IconAB, IconAlignBoxLeftTop, IconBracketsContain, IconList, IconListCheck, IconNumber123, IconWashDrycleanOff } from "@tabler/icons-react"


export enum QuestionType {
    MULTIPLE_CHOICE, MULTIPLE_SELECT, TRUE_FALSE, FILLIN_BLANK, INPUT_NUMBER, SHORT_ANSWER, NO_ANSWER
}
export const questionTypeOptions: Map<QuestionType, {label: string, icon: JSX.Element, answerFactory: () => AnswerType}> = new Map()
questionTypeOptions.set(QuestionType.MULTIPLE_CHOICE, { 
    label: "Multiple Choice", 
    icon: <IconList />,
    answerFactory: () => {return { choices: new Array<string>(), answer: -1 }}
})
questionTypeOptions.set(QuestionType.MULTIPLE_SELECT, { 
    label: "Multiple Select", 
    icon: <IconListCheck />,
    answerFactory: () => {return { choices: new Array<string>(), answer: new Array<number>() }}
})
questionTypeOptions.set(QuestionType.TRUE_FALSE, { 
    label: "True/False", 
    icon: <IconAB />,
    answerFactory: () => {return { choices: new Array<string>('True', 'False'), answer: 0 }}
})
questionTypeOptions.set(QuestionType.FILLIN_BLANK, { 
    label: "Fill in the Blank", 
    icon: <IconBracketsContain />,
    answerFactory: () => {return { choices: null, answer: '' }}
})
questionTypeOptions.set(QuestionType.INPUT_NUMBER, { 
    label: "Input Number", 
    icon: <IconNumber123 />,
    answerFactory: () => {return { choices: null, answer: undefined }}
})
questionTypeOptions.set(QuestionType.SHORT_ANSWER, { 
    label: "Short Answer", 
    icon: <IconAlignBoxLeftTop />,
    answerFactory: () => {return { choices: null, answer: '' }}
})
questionTypeOptions.set(QuestionType.NO_ANSWER, { 
    label: "No Answer", 
    icon: <IconWashDrycleanOff />,
    answerFactory: () => {return { choices: null, answer: null }}
})

export const getDefaultAnswer = (type: QuestionType):AnswerType => {
    return questionTypeOptions.get(type)?.answerFactory() || { choices: null, answer: null }
}

export type AnswerType = SingleSelect | MultipleSelect | InputText | InputNumber | InputNone
type SingleSelect = {
    choices: Array<string>,
    answer: number
}
type MultipleSelect = {
    choices: Array<string>,
    answer: Array<number>
}
type InputText = {
    choices: null,
    answer: string
}
type InputNumber = {
    choices: null,
    answer: number | undefined
}
type InputNone = {
    choices: null,
    answer: null
}



// export class Answer {
//     choices: AnswerType['choices']
//     answer: AnswerType['answer']
//     constructor(type: QuestionType) {
//         const newAnswer:AnswerType = questionTypeOptions.get(type)?.answerFactory() || { choices: null, answer: null }
//         this.choices = newAnswer.choices
//         this.answer = newAnswer.answer
//     }
//     setChoices(choices: AnswerType['choices']) {
//         this.choices = choices
//     }
//     setAnswer(answer: AnswerType['answer']) {
//         this.answer = answer
//     }
// }

export class Question {

    question: string = ''
    type: QuestionType = QuestionType.NO_ANSWER
    answer: AnswerType = getDefaultAnswer(QuestionType.NO_ANSWER)
    notes: string = ''

    setQuestion(question: string) {
        this.question = question
    }
    setAnswer( answer: AnswerType ) {
        this.answer.choices = answer.choices
        this.answer.answer = answer.answer
    }
    setNotes(notes: string) {
        this.notes = notes
    }
    setType(type: QuestionType) {
        if(this.type !== type) {
            this.answer = getDefaultAnswer(type)
            this.type = type
            console.log(this.answer)
            console.log(this.type)
        }
    }
}