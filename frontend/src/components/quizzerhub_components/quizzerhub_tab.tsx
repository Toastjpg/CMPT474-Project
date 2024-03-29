
import { useState } from 'react';

import '../../styles/table.css';
import { QuizzerHubList } from './quizzerhub_list';
import { QuizzerHubCreate } from './quizzerhub_create';
import { QuizzerHubEdit } from './quizzerhub_edit';
import { QuizzerHubPlay } from './quizzerhub_play';


export const enum Display {
    LIST, CREATE, EDIT, PLAY
}
export function QuizzerHubTab() {
    const [display, setDisplay] = useState(Display.LIST);
    const displays = new Map<Display, JSX.Element>();
    displays.set(Display.LIST, <QuizzerHubList setDisplay={setDisplay} />)
    displays.set(Display.CREATE, <QuizzerHubCreate setDisplay={setDisplay} />)
    displays.set(Display.EDIT, <QuizzerHubEdit />)
    displays.set(Display.PLAY, <QuizzerHubPlay />)

    return (
        <>
            {/* <section id="quizzerHubTab"> */}
            {displays.get(display)}
            {/* </section> */}
        </>
    )
}