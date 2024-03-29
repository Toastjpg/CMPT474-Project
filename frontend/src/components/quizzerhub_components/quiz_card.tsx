import { Card, Text, Group, RingProgress, Button, ActionIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { Quiz } from '../../models/quiz';

interface Props {
    quiz: Quiz
}
export const QuizCard: FC<Props> = ({ quiz }) => {
    const [stats, setStats] = useState<Array<{ title: string, value: number }>>([])
    useEffect(() => {
        const tmp = new Array()
        tmp.push({ title: 'Questions', value: quiz.questions.length })
        tmp.push({ title: 'Avg. time', value: quiz.stats.avgTime })
        tmp.push({ title: 'Likes', value: quiz.likes })
        setStats([...tmp])
    }, [quiz])

    const items = stats.map((stat) => (
        <div key={stat.title}>
            <Text size="xs" c="dimmed" >
                {stat.title}
            </Text>
            <Text fw={500} size="sm">
                {stat.value}
            </Text>
        </div>
    ));

    return (
        <Card withBorder padding="lg" className="card">
            <Group justify="space-between" mt="sm">
                <Text fz="sm" fw={700} className="title" lh={1.4}>{quiz.title}</Text>
                <Group gap={5}>
                    <Text fz="xs" c="dimmed">{quiz.stats.avgScore}% average</Text>
                    <RingProgress size={18} thickness={2} sections={[{ value: 80, color: 'blue' }]} />
                </Group>
            </Group>
            <Text mt="sm" mb="md" c="dimmed" fz="xs">{quiz.summary}</Text>
            <Card.Section className="stats">{items}</Card.Section>
            <Group className='footer'>
                <Button variant="light" style={{ flex: 1 }}>
                    Start Quiz
                </Button>
                <ActionIcon variant='default' size={36}>
                    <IconHeart className="like" stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
}