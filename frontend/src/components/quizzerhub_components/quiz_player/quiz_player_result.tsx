import { FC } from "react";
import { Quiz } from "../../../models/quiz";
import { QuizPlayerConfig } from "./quiz_player_config";
import { Button, Card, Divider, Flex, rem, Text, Title } from "@mantine/core";
import { QuizPlayerScreens } from "../quizzerhub_play";
import { IconLogout, IconPencilCheck, IconRotateClockwise } from "@tabler/icons-react";
import { UnreleasedFeatureNotification } from "../../unreleased_feature";

interface Props {
    quizState: Quiz
    setQuizState: (Quiz: Quiz) => void
    config: QuizPlayerConfig
    setScreen: (screen: QuizPlayerScreens) => void
    close: () => void
}
export const QuizPlayerResultScreen:FC<Props> = ({ quizState, setScreen, close }) => {
    return (
        <>
        <section>
        <Title size="lg" fw={500} mb={12}>{quizState.title}</Title>
        <Text c="dimmed">{quizState.summary}</Text>
        </section>
        <Card withBorder mt={20} mb={20}>
            <Title size="h3" fw={600} mb={24}>Results</Title>
            <UnreleasedFeatureNotification />
        </Card>
        <Divider size="lg" mt={20} mb={20} />
        <Flex direction="row" justify="flex-end" mt={20} gap={12}>
            <Button 
                variant="default" 
                onClick={() => setScreen(QuizPlayerScreens.PLAY)}
                rightSection={<IconPencilCheck style={{width: rem(16), height: rem(16)}} stroke={1.5} />}
                >REVIEW</Button>
            <Button 
                variant="default"
                onClick={() => setScreen(QuizPlayerScreens.CONFIG)} 
                rightSection={<IconRotateClockwise style={{width: rem(16), height: rem(16)}} stroke={1.5} />}
                >RESTART</Button>
            <Button 
                variant="default" 
                onClick={close}
                rightSection={<IconLogout style={{width: rem(16), height: rem(16)}} stroke={1.5} />}
                >FINISH</Button>
        </Flex>
        </>
    )
}
