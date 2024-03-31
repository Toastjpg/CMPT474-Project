import cx from 'clsx';
import { rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { IconGripVertical } from '@tabler/icons-react';
import '../../styles/dragdroplist.css';
import { Question, questionTypeOptions } from '../../models/question';
import { FC, useEffect } from 'react';
import parse from "html-react-parser"

interface Props {
    questions: Array<Question>
    setQuestions: (questions: Array<Question>) => void
}
export const DragDropList: FC<Props> = ({ questions, setQuestions }) => {
    const [state, handlers] = useListState(questions);

    useEffect(() => {
        questions = state
        setQuestions([...state])
    }, state)

    const items = state.map((item, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided, snapshot) => (
                <div
                    className={cx("item", { "itemDragging": snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div {...provided.dragHandleProps} className="dragHandle">
                        <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </div>
                    <Text className="symbol">{questionTypeOptions.get(item.type)?.icon}</Text>
                    <div className='question'>
                        <Text>{parse(getExtract(item.question))}</Text>
                        <Text c="dimmed" size="sm">Type: {questionTypeOptions.get(item.type)?.label}</Text>
                    </div>
                </div>
            )}
        </Draggable>
    ));

    function getExtract(questionHtml: string): string {
        const regex = /<p>(.*?)<\/p>/;
        const corresp = regex.exec(questionHtml);
        const firstParagraph = (corresp) ? corresp[0] : ""
        // const firstParagraphWithoutHtml = (corresp) ? corresp[1] : ""
        return firstParagraph
    }

    return (
        <div className='drag-drop-list'>
            <DragDropContext
                onDragEnd={({ destination, source }) => {
                    handlers.reorder({ from: source.index, to: destination?.index || 0 })
                    const movedItem = questions.splice(source.index, 1)
                    questions.splice((destination?.index || 0), 0, movedItem[0])
                }}
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            {questions.length === 0 && <Text c="gray" size='sm'>You haven't added any questions yet.</Text>}
        </div>

    );
}