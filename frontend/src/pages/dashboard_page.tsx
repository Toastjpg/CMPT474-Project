import { useEffect, useState } from 'react';

import { Title, Divider, Space, SimpleGrid, Modal, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

/* ---------------------------------- quiz ---------------------------------- */
import { getAllQuizzes } from '../controllers/quiz.controller';

import { Quiz } from '../models/quiz';

import { QuizCard } from '../components/quizzerhub_components/quiz_card';
import { QuizPlayer } from '../components/quizzerhub_components/quizzerhub_play';

/* -------------------------------- resources ------------------------------- */
import { FileCard, FileInfo } from '../components/resources_components/file_card';
import { getAllFiles } from '../controllers/media-controller';
import { set } from 'jodit/esm/core/helpers';

export function Dashboard() {
    /* ---------------------------------- state --------------------------------- */
    // quiz state
    const [quizzesLoading, setquizzesLoading] = useState<boolean>(true)
    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
    const [quizId, setQuizId] = useState<string>('');
    const [opened, { open, close }] = useDisclosure(false);

    // resources state
    const [filesLoading, setfilesLoading] = useState<boolean>(true)
    const [files, setFiles] = useState<Array<FileInfo>>([])

    /* ---------------------------- lifecycle methods --------------------------- */
    // grab all quizzes from the database at the start
    useEffect(() => {
        fetchQuizzes();
        fetchResources();
    }, [])

    /* --------------------------------- methods -------------------------------- */
    async function fetchQuizzes(): Promise<void> {
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
                    setquizzesLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }

    async function fetchResources(): Promise<void> {
        const fetchFiles = async () => {
            try {
                const response = await getAllFiles()
                if (response.ok) {
                    const data = await response.json()
                    setFiles([...data])
                    setfilesLoading(false)
                } else {
                    alert("Something went wrong. Please refresh browser and try again.")
                }
            } catch (error) {
                console.log(error)
                alert("Fetching files failed.")
            }
        }
        fetchFiles()
    }


    /* ---------------------------- event handlers ---------------------------- */
    const selectQuiz = (id: string) => {
        open()
        console.log("selected quiz: " + id)
        setQuizId(id)
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

                <Space h="lg" />

                <SimpleGrid className='quiz-list' >
                    {quizzes.map(quiz => <QuizCard quiz={quiz} selectQuiz={selectQuiz} key={quiz.id} />)}
                </SimpleGrid>
            </>
        );
    }

    function recentResources(): JSX.Element {
        return (
            <>
                <Title order={2}>
                    Recent Resources
                </Title>

                <Space h="lg" />

                <SimpleGrid className='file-list' >
                    {files.map((file, index) => <FileCard file={file} key={index} />)}
                </SimpleGrid>
            </>
        );
    }

    /* --------------------------------- return --------------------------------- */
    return (
        <>

            {quizPlayer()}

            <Title order={1}>Here's what your fellow students have been up to...</Title>

            <Space h="lg" />

            <Skeleton visible={quizzesLoading}>
                {recentQuizzes()}
            </Skeleton>

            <Space h="lg" />
            <Divider />
            <Space h="lg" />

            <Skeleton visible={filesLoading}>
                {recentResources()}
            </Skeleton>

        </>
    )
}