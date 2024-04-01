import { FC, useState } from "react"
import { Quiz } from "../../../models/quiz"
import { Button, Card, Center, Group, Switch, Text, Title } from "@mantine/core"
import { StatsRing } from "../stats_ring"
import { QuizPlayerScreens } from "../quizzerhub_play"


export interface QuizPlayerConfig {
    shuffle: boolean
    autoGrading: boolean
    instantGrading:boolean
}
interface Props {
    quiz: Quiz
    setQuizState: (quiz: Quiz) => void
    setConfig: (config: QuizPlayerConfig) => void
    setScreen: (screen: QuizPlayerScreens) => void
}
export const QuizPlayerConfigScreen: FC<Props> = ({ quiz, setQuizState, setConfig, setScreen }) => {
    const [shuffle, setShuffle] = useState(false)
    const [autoGrading, setAutoGrading] = useState(false)
    const [instantGrading, setInstantGrading] = useState(false)

    const controls = [
        { 
            title: 'Shuffle', 
            description: 'Questions will be presented in randomised order',
            state: shuffle,
            action: (state:boolean) => setShuffle(state)
        },
        { 
            title: 'Auto Grading', 
            description: 'Short answer questions will be graded based on the similarity scores caculated by Natural Language Processing models **Note that it is not an accurate measure and that we strongly recommend refering to the answer key or notes',
            state: autoGrading,
            action: (state: boolean) => setAutoGrading(state)
        },
        { 
            title: 'Instant Grading', 
            description: 'Each questions will be graded instantly before you move on to the next question.',
            state: instantGrading,
            action: (state: boolean) => setInstantGrading(state)
        },
    ];

    const controlSection = controls.map(control => (
        <Group justify="space-between" className="control" wrap="nowrap" gap="xl" key={control.title}>
            <div>
            <Text>{control.title}</Text>
            <Text size="xs" c="dimmed">
                {control.description}
            </Text>
            </div>
            <Switch 
                onLabel="ON" 
                offLabel="OFF" 
                className="switch" 
                size="lg" 
                checked={control.state} 
                onChange={(event) => control.action(event.currentTarget.checked)} />
        </Group>
    ))

    const finishSetup = () => {
        setConfig({ shuffle: shuffle, autoGrading: autoGrading, instantGrading: instantGrading })
        setQuizState(quiz)
        setScreen(QuizPlayerScreens.PLAY)
    }


    return(
        <>
            <section>
            <Title size="lg" fw={500} mb={12}>{quiz.title}</Title>
            <Text c="dimmed">{quiz.summary}</Text>
            <Group gap={8} mb={-8}>
            <StatsRing questionCount={quiz.questions.length} likes={quiz.likes} avgScore={quiz.stats.avgScore} avgTime={quiz.stats.avgTime} />
            </Group>
            </section>
            <Card withBorder radius="md" p="xl" mt={20} className="quiz-controls">
                <Text fz="lg" className="title" fw={500}>
                    Quiz Configuration
                </Text>
                <Text fz="xs" c="dimmed" mt={3} mb="xl">
                    Choose what notifications you want to receive
                </Text>
                {controlSection}
            </Card>
            <Center>
                <Button onClick={finishSetup} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }} radius="xl" size="md" mt={32} mb={20}>START</Button>
            </Center>
        </>
    )
}