import { Question } from "./question";

export class Quiz {
    // author: // add when user login and session/cookie stuff is implemented
    // course: { value: string, label: string }
    id: string = "random_id"
    title: string = ''
    summary: string = ''
    // tags: Array<string> = new Array<string>()
    questions: Array<Question> = new Array<Question>()
    likes: number = 0
    stats: { avgTime: number, avgScore: number } = { avgTime: 0, avgScore: 0 }
    setId(id: string) {
        this.id = id
    }
    setTitle(title: string) {
        this.title = title
    }
    setSummary(summary: string) {
        this.summary = summary
    }
    setQuestions(questions: Array<Question>) {
        this.questions = [...questions]
    }
    getQuestion(index: number):Question {
        if(index < 0 || index >= this.questions.length) {
            if(this.questions.length === 0) {
                throw new Error("Attempting access to empty array.")
            }
            return this.questions.at(0)!
        }
        return this.questions.at(index)!
    }
    // setCourse(course: { value: string, label: string }) {
    //     this.course = course
    // }
    static createInstance(title: string, summary: string, questions: Array<Question>) {
        const quiz = new Quiz()
        quiz.setTitle(title)
        quiz.setSummary(summary)
        quiz.setQuestions(questions)
        return quiz
    }
    static clone(quiz: Quiz) {
        const clone = new Quiz()
        clone.setTitle(quiz.title)
        clone.setSummary(quiz.summary)
        clone.questions = [...quiz.questions]
        clone.likes = quiz.likes
        clone.stats = quiz.stats
        return clone
    }
    incLikes() {
        this.likes++
    }
    decLikes() {
        this.likes--
    }
    setLikes(count: number) {
        this.likes = count
    }
    setStats(stats: { avgTime: number, avgScore: number }) {
        this.stats = stats
    }
    shuffleQuestions() {
        const tmp = [...this.questions]
        let m = tmp.length;
        while(m) {
            const i = Math.floor(Math.random() * m--);
            [tmp[m], tmp[i]] = [tmp[i], tmp[m]];
        }
        this.questions = [...tmp]
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