
import { Flex, Title, Button, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';

import { TextInput, rem } from '@mantine/core';
import { IconSearch, IconSquarePlus } from '@tabler/icons-react';
import { Display } from './quizzerhub_tab';
import { getAllQuizzes } from '../../controllers/quiz.controller';
import { Quiz } from '../../models/quiz';
import { useInputState } from '@mantine/hooks';
import { QuizCard } from './quiz_card';


interface Props {
    setDisplay: (display: Display) => void
    setQuizId: (id: string) => void
}
export const QuizzerHubList: FC<Props> = ({ setDisplay, setQuizId }) => {
    const [search, setSearch] = useInputState('')
    const [quizzes, setQuizzes] = useState<Array<Quiz>>([])
    const [filteredQuizzes, setFilteredQuizzes] = useState<Array<Quiz>>([])

    useEffect(() => {
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
                    setQuizzes([...tmp])
                    setFilteredQuizzes([...tmp])
                }
            } catch (error) {
                console.log(error)
            }
        }
        init()
    }, [])

    useEffect(() => {
        setFilteredQuizzes(filterQuizzes)
    }, [search])

    const filterQuizzes = () => {
        const keywords: Array<string> = search.toLowerCase().trim().split(' ')
        return quizzes.filter(quiz => {
            return keywords.every(keyword => {
                return quiz.title.toLowerCase().includes(keyword) || quiz.summary.toLowerCase().includes(keyword)
            })
        })
    }

    const selectQuiz = (id: string) => {
        console.log("selected quiz: " + id)
        setQuizId(id)
        setDisplay(Display.DETAILS)
    }


    return (
        <Flex id="quizzerHubList" direction={"column"} h={"100%"}>
            <Flex justify={"space-between"} direction={"row"} mb={12} align={"center"}>
                <Title size="h4">Quizzes</Title>
                <Button
                    variant="default"
                    onClick={() => setDisplay(Display.CREATE)}
                    leftSection={<IconSquarePlus
                        style={{
                            width: rem(16),
                            height: rem(16)
                        }}
                        stroke={1.5} />}>
                    Create New Quiz
                </Button>
            </Flex>
            <TextInput
                placeholder="Search by keywords"
                mb="md"
                leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                value={search}
                onChange={setSearch}
            />
            <ScrollArea scrollbarSize={8} w={"100%"} flex={1}>
                <SimpleGrid cols={3} className='quiz-list' >
                    {filteredQuizzes.map(quiz => <QuizCard quiz={quiz} selectQuiz={selectQuiz} key={quiz.id} />)}
                </SimpleGrid>
                {filteredQuizzes.length === 0 && <Text c="gray" size='sm'>No quizzes found.</Text>}
            </ScrollArea>
        </Flex>
    )
}