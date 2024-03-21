import { FC, useEffect, useState } from "react"
import { Button,Divider,Flex, ScrollArea, Select, Space, Text, TextInput, Textarea, Title, rem } from "@mantine/core"
import { Quiz } from "../../models/quiz"
import { Form } from "./quiz_creation_form"
import { DragDropList } from "./draggable_questions_list"
import { Question } from "../../models/question"
import { Display } from "./quizzerhub_tab"
import { IconSquarePlus } from "@tabler/icons-react"
import { useInputState } from "@mantine/hooks"

interface Props {
    heading: string
    quiz: Quiz
    setForm: (form: Form) => void
    setDisplay: (display: Display) => void
    setQuestionOnFocus: (questionIdx: number) => void
    createQuiz: () => void
}
export const QuizConfigForm: FC<Props> = ({ heading, quiz, setForm, setDisplay, createQuiz, setQuestionOnFocus }) => {
    const [title, setTitle] = useInputState(quiz.title)
    const [summary, setSummary] = useInputState(quiz.summary)
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        quiz.setTitle(title)
        quiz.setSummary(summary)
        setValid(quiz.isValid())
    }, [title, summary])
    function addQuestion() {
        const newQuestionIdx = quiz.questions.length
        const newQuestion = new Question()
        quiz.addQuestion(newQuestion)
        setQuestionOnFocus(newQuestionIdx)
        setForm(Form.NEW_QUESTION_FORM)
    }
    return (
        <ScrollArea w={"100%"} h={"100%"} scrollbarSize={8} scrollbars="y" offsetScrollbars >
            <div className="navigation justify-start">
                <span className="material-symbols-outlined" onClick={() => setDisplay(Display.LIST)}>arrow_circle_left</span>
                <Text size='sm'>Quizzes</Text>
            </div>

            <Title size={"h4"} mb={12} mt={12}>{heading}</Title>
            <div className="form-container">
            <TextInput
                label="Title"
                value={title}
                placeholder="Please provide a descriptive title for this quiz."
                onChange={setTitle}
                required
                />
            <Textarea
                label="Summary"
                placeholder="Please provide a brief description of this quiz."
                autosize
                value={summary}
                onChange={setSummary}
                minRows={3}
                maxRows={4}
            />
            {/* <Select
                label="Course"
                placeholder="Search..."
                description="Select a course or leave it uncategorized."
                data={[
                    { group: 'Computer Science', items: ['CMPT120', 'CMPT135', 'CMPT213', 'CMPT218', 'CMPT225', 'CMPT272', 'CMPT300', 'CMPT307', 'CMPT372', 'CMPT474'] },
                    { group: 'Interactive Arts', items: ['IAT210', 'IAT218'] },
                ]}
                searchable
            /> */}
            </div>
            <Space mb={24} />
            <Flex justify={"space-between"} direction={"row"} mb={12} align={"center"}>
                <Title size="h5">Questions</Title>
                <Button variant="default" onClick={addQuestion}  leftSection={<IconSquarePlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Create New Question</Button>
            </Flex>
            <DragDropList questions={quiz.questions} />
            <Divider size={"lg"} />
            <Flex direction={"row"} justify={"end"}>
                <Button color="#ce0030" variant="outline" onClick={createQuiz} mt={12} disabled={!valid} loading={loading} >Create</Button>
            </Flex>
        </ScrollArea>
    )
}