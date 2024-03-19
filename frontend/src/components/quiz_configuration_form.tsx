import { TextInput, Textarea, MultiSelect, Select } from "@mantine/core"
import { useState, FC } from "react";
import { DefaultButton } from "./default_button";
import { useInputState } from "@mantine/hooks";

interface QuizConfigFormProps {
    heading: string
}

export const QuizConfigurationForm: FC<QuizConfigFormProps> = ({ heading }) => {
    const [title, setTitle] = useInputState('')
    const [summary, setSummary] = useInputState('')
    const [buttonIdle, setButtonIdle] = useState(false)

    const createQuiz = () => {
        console.debug('creating ne quiz')
    }

    return (
        <>
            <p className="designHeading">{heading}</p>
            <h2>Quiz Title To be Created</h2>
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
                required
            />
            <Select
                label="Course"
                placeholder="Search..."
                description="Select a course or leave it uncategorized."
                data={[
                    { group: 'Computer Science', items: ['CMPT120', 'CMPT135', 'CMPT213', 'CMPT218', 'CMPT225', 'CMPT272', 'CMPT300', 'CMPT307', 'CMPT372', 'CMPT474'] },
                    { group: 'Interactive Arts', items: ['IAT210', 'IAT218'] },
                ]}
                searchable
            />
            {/* <MultiSelect
                label="Tags"
                placeholder="Type in..."
                data={[
                    { group: 'Computer Science', items: ['CMPT120', 'CMPT135', 'CMPT213', 'CMPT218', 'CMPT225', 'CMPT272', 'CMPT300', 'CMPT307', 'CMPT372', 'CMPT474'] },
                    { group: 'Interactive Arts', items: ['IAT210', 'IAT218'] },
                ]}
                searchable
            /> */}
            </div>
            


            <DefaultButton loading={buttonIdle} label="Create new quiz" action={createQuiz} />
        </>
    )
}