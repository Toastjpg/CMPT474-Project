import { Question } from "./question";

export class Quiz {
    // id: string // when required in order to uniquely identify quiz when storing in database
    // author: // add when user login and session/cookie stuff is implemented
    // course: { value: string, label: string }
    title: string = ''
    summary: string = ''
    tags: Array<string> = new Array<string>()
    questions: Array<Question> = new Array<Question>()
    likes: number = 0
    playCount: number = 0

    setTitle(title: string) {
        this.title = title
    }
    setSummary(summary: string) {
        this.summary = summary
    }
    // setCourse(course: { value: string, label: string }) {
    //     this.course = course
    // }
    incLikes() {
        this.likes++
    }
    decLikes() {
        this.likes--
    }
    incPlayCount() {
        this.playCount++
    }
    addQuestion(question: Question) {
        this.questions.push(question)
    }
    removeQuestion(idx: number) {
        if(this.questions.length === 0) return
        if(idx < 0 || idx >= this.questions.length) return
        this.questions.splice(idx, 1)
    }
    isValid() {
        const isValidTitle = this.title.trim().length > 0
        const containsQuestions = this.questions.length > 0
        return isValidTitle && containsQuestions
    }
}