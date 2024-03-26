import { IconAB, IconAlignBoxLeftTop, IconBracketsContain, IconList, IconListCheck, IconNumber123, IconWashDrycleanOff } from "@tabler/icons-react"
import { text } from "stream/consumers"


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
// questionTypeOptions.set(QuestionType.TRUE_FALSE, { 
//     label: "True/False", 
//     icon: <IconAB />,
//     answerFactory: () => {return { choices: new Array<string>('True', 'False'), answer: 0 }}
// })
// questionTypeOptions.set(QuestionType.FILLIN_BLANK, { 
//     label: "Fill in the Blank", 
//     icon: <IconBracketsContain />,
//     answerFactory: () => {return { choices: null, answer: '' }}
// })
// questionTypeOptions.set(QuestionType.INPUT_NUMBER, { 
//     label: "Input Number", 
//     icon: <IconNumber123 />,
//     answerFactory: () => {return { choices: null, answer: undefined }}
// })
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



export class Option {
    label: string
    answer: boolean
    user_select: boolean = false
    user_input: string = ''
    constructor(label: string, answer: boolean) {
        this.label = label
        this.answer = answer
    }
    setOption(label: string, answer: boolean) {
        this.label = label
        this.answer = answer
    }
    setAnswer(answer: boolean) {
        this.answer = answer
    }
    setUserSelect(user_select: boolean) {
        this.user_select = user_select
    }
    setUserInput(user_input: string) {
        this.user_input = user_input
    }
}

export class Question {
    id: string = "id_usedby_quizzes_to_identify_questions_that_belong_to_the_quiz"
    question: string = ''
    type: QuestionType = QuestionType.NO_ANSWER
    options: Array<Option> = new Array()
    notes: string = ''

    setQuestion(question: string) {
        this.question = question
    }
    setNotes(notes: string) {
        this.notes = notes
    }
    setType(type: QuestionType) {
        if(this.type !== type) {
            this.options.splice(0, this.options.length)
            this.type = type
            if(type == QuestionType.TRUE_FALSE) {
                this.options = Question.createTrueFalseOptions()
            }
        }
    }
    setOptions(options: Array<Option>) {
        this.options = options
    }
    removeOption(idx: number) {
        if(this.options.length > 0 && idx >= 0 && idx < this.options.length) {
            this.options.splice(idx, 1)
        }
    }
    addOptions(option: Option) {
        this.options.push(option)
    }
    isValid() {
        // validate the question state
    }

    static createNoAnswerQuestion() {
        return new Question()
    }
    static createTrueFalseOptions() {
        const trueFalseOptions = new Array()
        const isTrueStatement = true
        trueFalseOptions.push(new Option("True", isTrueStatement))
        trueFalseOptions.push(new Option("False", !isTrueStatement))
        return trueFalseOptions
    }
    
}