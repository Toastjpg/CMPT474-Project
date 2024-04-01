import { useState, useRef, useMemo, FC, useEffect } from 'react';
import JoditEditor, { IJoditEditorProps } from 'jodit-react';
import { Button, ScrollArea, Select, Text, Title } from '@mantine/core';
import { Form } from './quizzerhub_create';
import { Option, Question, QuestionType, questionTypeOptions } from '../../models/question';
import { useInputState } from '@mantine/hooks';
import { InputMultipleChoice } from './quiz_answer_forms/multiple_choice';
import { InputMultipleSelect } from './quiz_answer_forms/multiple_select';
import { Quiz } from '../../models/quiz';
import { InputShortAnswer } from './quiz_answer_forms/short_answer';

interface Props {
    quiz: Quiz
    setQuiz: (quiz: Quiz) => void
    placeholder?: string;
    title: string
    questionIdx: number
    questions: Array<Question>
    setForm: (form: Form) => void
}

export const QuestionForm: FC<Props> = ({ quiz, setQuiz, placeholder, questionIdx, setForm }) => {
    const editor = useRef(null);

    const [currentIdx, setCurrentIdx] = useState(questionIdx)
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<Array<Option>>([])
    const [type, setType] = useInputState<number>(QuestionType.NO_ANSWER);
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        const updateQuestions = [...quiz.questions]
        updateQuestions.splice(currentIdx, 1, Question.creatInstance(question, type, options, notes))
        setQuiz(Quiz.createInstance(quiz.title, quiz.summary, updateQuestions))
    }, [question, options, notes])

    useEffect(() => {
        const current: Question = quiz.getQuestion(currentIdx)
        if (current instanceof Question) {
            setQuestion(current.question)
            setType(current.type)
            setOptions([...current.options])
            setNotes(current.notes)
        } else {
            alert("Something went wrong. Please refrech browser and try again.")
        }
    }, [currentIdx])

    const changeType = (typeValue: string) => {
        setOptions(new Array<Option>())
        setType(parseInt(typeValue))
    }

    // all options from https://xdsoft.net/jodit/docs/,
    const config:IJoditEditorProps['config' ]= useMemo(() => {
        return {
            readonly: false, 
            useSearch: false,
            toolbarButtonSize: 'middle',
            showCharsCounter: false,
            showXPathInStatusbar: false,
            defaultActionOnPaste: 'insert_as_html',
            toolbarInlineForSelection: true,
            hidePoweredByJodit: true,
            "toolbarAdaptive": false,
            removeButtons: ['lineHeight', 'classSpan', 'video', 'speechRecognize', 'spellcheck', 'cut', 'copy', 'paste', 'selectall', 'copyformat', 'table', 'symbols', 'find', 'source', 'about'],
        }
    }, [placeholder]);

    const answerOptionList = [...questionTypeOptions].map(([key, value]) => {
        return {
            value: key.toString(),
            label: value.label
        }
    })

    return (
        <ScrollArea id="richTextEditor" w={"100%"} h={"100%"} scrollbarSize={8} offsetScrollbars>

            <div className="navigation justify-start">
                <span className="material-symbols-outlined" onClick={() => setForm(Form.CONFIG_FORM)}>arrow_circle_left</span>
                <Text size='sm'>{quiz.title}</Text>
            </div>


            <Title size="h3">Question {(currentIdx + 1)}</Title>
            <div className='pagination'>
                <Button color="gray" mt={12} onClick={() => setCurrentIdx(currentIdx - 1)} disabled={currentIdx < 1}>&lt; Back</Button>
                <Button color="gray" mt={12} onClick={() => setCurrentIdx(currentIdx + 1)} disabled={currentIdx >= quiz.questions.length - 1}>Next &gt;</Button>
            </div>
            <JoditEditor
                ref={editor}
                value={question}
                config={config}
                // tabIndex={1} // tabIndex of textarea
                onChange={newContent => setQuestion(newContent)}
            />
            <Select
                label="Type"
                mb={12}
                value={answerOptionList.at(type) !== undefined ? answerOptionList.at(type)!.value : QuestionType.NO_ANSWER.toString()}
                allowDeselect={false}
                defaultValue={type.toString()}
                onChange={newContent => { if (newContent !== null) { changeType(newContent) } }}
                data={answerOptionList}
            />
            <Title size={"h5"}>Answer</Title>
            {type === QuestionType.MULTIPLE_CHOICE && <InputMultipleChoice options={options} setOptions={setOptions} test={false} />}
            {type === QuestionType.MULTIPLE_SELECT && <InputMultipleSelect options={options} setOptions={setOptions} test={false} />}
            {type === QuestionType.SHORT_ANSWER && <InputShortAnswer options={options} setOptions={setOptions} test={false} />}


            <Title size={"h5"}>Notes</Title>
            <JoditEditor
                ref={editor}
                value={notes}
                config={config}
                // tabIndex={1} // tabIndex of textarea
                onChange={newContent => setNotes(newContent)}
            />

        </ScrollArea>
    );
}