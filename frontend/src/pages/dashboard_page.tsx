import { useEffect, useState } from 'react';

import { Title, Divider, Space, SimpleGrid, Modal, ScrollArea } from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';

import { getAllQuizzes } from '../controllers/quiz.controller';

import { Quiz } from '../models/quiz';

import { QuizCard } from '../components/quizzerhub_components/quiz_card';
import { QuizPlayer } from '../components/quizzerhub_components/quizzerhub_play';

export function Dashboard() {
    /* ---------------------------------- state --------------------------------- */
    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
    const [quizId, setQuizId] = useState<string>('');
    const [opened, { open, close }] = useDisclosure(false);

    /* ---------------------------- lifecycle methods --------------------------- */
    // grab all quizzes from the database at the start
    useEffect(() => {
        fetchQuizzes();
    }, [])

    /* --------------------------------- methods -------------------------------- */
    function fetchQuizzes(): void {
        const init = async () => {
            try {
                const response = await getAllQuizzes()
                if (response.ok) {
                    const list = await response.json()
                    const tmp: Array<Quiz> = new Array()
                    for (const item of list) {
                        const quiz = Quiz.createInstance(item.data.title, item.data.summary, item.data.questions)
                        quiz.setId(item.id)
                        quiz.setLikes(item.data.likes)
                        quiz.setStats(item.data.stats)
                        tmp.push(quiz)
                    }

                    // set only the first 4 quizzes
                    setQuizzes([...tmp.slice(0, 4)])
                }
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }

    /* ---------------------------- event handlers ---------------------------- */
    const selectQuiz = (id: string) => {
        open()
        console.log("selected quiz: " + id)
        setQuizId(id)
        // setDisplay(Display.DETAILS)
    }

    /* ------------------------------- components ------------------------------- */
    function quizPlayer(): JSX.Element {
        return (
            <Modal
                opened={opened}
                onClose={close}
                title="Quiz Player"
                fullScreen
                radius={0}
                scrollAreaComponent={ScrollArea.Autosize}
                transitionProps={{ transition: 'fade', duration: 200 }}
            >
                <QuizPlayer quizId={quizId} close={close} />
            </Modal>
        );
    }

    function recentQuizzes(): JSX.Element {
        return (
            <>
                <Title order={2}>
                    Recent Quizzes
                </Title>

                <SimpleGrid className='quiz-list' >
                    {quizzes.map(quiz => <QuizCard quiz={quiz} selectQuiz={selectQuiz} key={quiz.id} />)}
                </SimpleGrid>
            </>
        );
    }

    function recentFiles(): JSX.Element {
        return (
            <>
                <Title order={2}>
                    Recent Files
                </Title>
            </>
        );
    }

    /* --------------------------------- return --------------------------------- */
    return (
        <>
            {quizPlayer()}

            <Title order={1}>Here's what your fellow students have been up to...</Title>

            <Space h="lg" />

            {recentQuizzes()}

            <Space h="lg" />
            <Divider />
            <Space h="lg" />

            {recentFiles()}

        </>
    )
}