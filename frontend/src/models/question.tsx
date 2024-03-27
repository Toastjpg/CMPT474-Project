import { IconAB, IconAlignBoxLeftTop, IconBracketsContain, IconList, IconListCheck, IconNumber123, IconWashDrycleanOff } from "@tabler/icons-react"
import { text } from "stream/consumers"


export enum QuestionType {
    MULTIPLE_CHOICE, 
    MULTIPLE_SELECT, 
    // TRUE_FALSE, 
    // FILLIN_BLANK, 
    // INPUT_NUMBER, 
    SHORT_ANSWER, 
    NO_ANSWER
}
export const questionTypeOptions: Map<QuestionType, {label: string, icon: JSX.Element}> = new Map()
questionTypeOptions.set(QuestionType.MULTIPLE_CHOICE, { 
    label: "Multiple Choice", 
    icon: <IconList />,
})
questionTypeOptions.set(QuestionType.MULTIPLE_SELECT, { 
    label: "Multiple Select", 
    icon: <IconListCheck />,
})
// questionTypeOptions.set(QuestionType.TRUE_FALSE, { 
//     label: "True/False", 
//     icon: <IconAB />,
// })
// questionTypeOptions.set(QuestionType.FILLIN_BLANK, { 
//     label: "Fill in the Blank", 
//     icon: <IconBracketsContain />,
// })
// questionTypeOptions.set(QuestionType.INPUT_NUMBER, { 
//     label: "Input Number", 
//     icon: <IconNumber123 />,
// })
questionTypeOptions.set(QuestionType.SHORT_ANSWER, { 
    label: "Short Answer", 
    icon: <IconAlignBoxLeftTop />,
})
questionTypeOptions.set(QuestionType.NO_ANSWER, { 
    label: "No Answer", 
    icon: <IconWashDrycleanOff />,
})



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
    id: string = "random_question_id"
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
        this.type = type
    }
    setOptions(options: Array<Option>) {
        this.options = [...options]
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

    static creatInstance(question: string, type: QuestionType, options: Array<Option>, notes: string ) {
        const instance = new Question()
        instance.setQuestion(question)
        instance.setType(type)
        instance.setOptions(options)
        instance.setNotes(notes)
        return instance
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