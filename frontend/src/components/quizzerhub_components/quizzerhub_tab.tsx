
import { useEffect, useState } from 'react';

import { QuizzerHubList } from './quizzerhub_list';
import { QuizzerHubCreate } from './quizzerhub_create';
import { QuizzerHubEdit } from './quizzerhub_edit';
import { QuizzerHubDetails } from './quizzerhub_details';


export const enum Display {
    LIST, CREATE, EDIT, DETAILS
}
export function QuizzerHubTab() {
    const [display, setDisplay] = useState(Display.LIST);
    const [quizId, setQuizId] = useState('')

    useEffect(() => {
        console.log("QUIZ ID: " + quizId)
    }, [quizId])

    const displays = new Map<Display, JSX.Element>();
    displays.set(Display.LIST, <QuizzerHubList setDisplay={setDisplay} setQuizId={setQuizId} />)
    displays.set(Display.CREATE, <QuizzerHubCreate setDisplay={setDisplay} setQuizId={setQuizId} />)
    displays.set(Display.EDIT, <QuizzerHubEdit />)
    displays.set(Display.DETAILS, <QuizzerHubDetails setDisplay={setDisplay} quizId={quizId} />)

    return (
        <>
            {displays.get(display)}
        </>
    )
}