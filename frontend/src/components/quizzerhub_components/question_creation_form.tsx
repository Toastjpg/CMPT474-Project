import { useState, useRef, useMemo, FC, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { placeholder } from 'jodit/esm/plugins/placeholder/placeholder';
import { Button, ScrollArea, Select, Text, Title } from '@mantine/core';
import { Form } from './quiz_creation_form';
import { Question, QuestionType, getDefaultAnswer, questionTypeOptions } from '../../models/question';
import { useInputState } from '@mantine/hooks';
// import { InputMultipleChoice } from './quiz_answer_forms/multiple_choice';

interface Props {
    placeholder?: string;
    title: string
    questionIdx: number
    questions: Array<Question>
    setForm: (form: Form) => void
}

export const QuestionForm: FC<Props> = ({ placeholder, title, questionIdx, questions, setForm }) => {
    const editor:any = useRef<placeholder | null>(null);
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState(getDefaultAnswer(QuestionType.NO_ANSWER))
    const [notes, setNotes] = useState<string>('');
    const [type, setType] = useInputState<number>(QuestionType.NO_ANSWER);
    const [currentIdx, setCurrentIdx] = useState(questionIdx)

    useEffect(() => {
        questions.at(currentIdx)?.setQuestion(question)
    }, [question])
    useEffect(() => {
        questions.at(currentIdx)?.setAnswer(answer)
    }, [answer])
    useEffect(() => {
        questions.at(currentIdx)?.setNotes(notes)
    }, [notes])
    useEffect(() => {
        questions.at(currentIdx)?.setType(type)
    }, [type])
    useEffect(() => {
        const current = questions.at(currentIdx)
        if(current instanceof Question) {
            setQuestion(current.question)
            setNotes(current.notes)
            setType(current.type)
            setAnswer(current.answer)
        }
    }, [currentIdx])


    const config:any = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || 'Start typings...',
        useSearch: false,
        uploader: {
            insertImageAsBase64URI: true
        },
        toolbarButtonSize: 'middle',
        showCharsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        defaultActionOnPaste: 'insert_only_text',
        toolbarInlineForSelection: true,
        showPlaceholder: false,
    }), []);

    const answerOptionList = [...questionTypeOptions].map(([key, value ]) => {
        return {
            value: key.toString(),
            label: value.label
        }
    })

    return (
        <ScrollArea id="richTextEditor" w={"100%"} h={"100%"} scrollbarSize={8} offsetScrollbars>
            
            <div className="navigation justify-start">
                <span className="material-symbols-outlined" onClick={() => setForm(Form.CONFIG_FORM)}>arrow_circle_left</span>
                <Text size='sm'>{title}</Text>
            </div>
            
            
            <Title size="h3">Question {(currentIdx + 1)}</Title>
            <div className='pagination'>
                <Button color="gray" mt={12} onClick={() => setCurrentIdx(currentIdx - 1)} disabled={currentIdx < 1}>&lt; Back</Button>
                <Button color="gray" mt={12} onClick={() => setCurrentIdx(currentIdx + 1)} disabled={currentIdx >= questions.length - 1}>Next &gt;</Button>
            </div>
            <JoditEditor
            ref={editor}
            value={question}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setQuestion(newContent)}
            />
            <Title size={"h5"}>Answer</Title>
            <Select
                label="Type"
                mb={12}
                value={type ? answerOptionList.at(type)?.value : '0'}
                allowDeselect={false}
                defaultValue={type.toString()}
                onChange={newContent => {
                    if(newContent !== null && !isNaN(parseInt(newContent))) {
                        setType(parseInt(newContent))
                    }
                }}
                data={answerOptionList}
            />
            {/* {type === QuestionType.MULTIPLE_CHOICE 
                    && <InputMultipleChoice answer={answer} test={false} />} // causes error*/} 
            {/* <JoditEditor
            ref={editor}
            value={answer}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setAnswer(newContent)}
            /> */}
            <h3>Notes</h3>
            <JoditEditor
            ref={editor}
            value={notes}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={newContent => setNotes(newContent)}
            />
            
        </ScrollArea>
    );
}