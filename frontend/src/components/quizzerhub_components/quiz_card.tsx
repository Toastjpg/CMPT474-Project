import { Card, Text, Group, RingProgress, Button, ActionIcon, Flex } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { Quiz } from '../../models/quiz';

interface Props {
    quiz: Quiz
    selectQuiz: (id: string) => void
}
export const QuizCard: FC<Props> = ({ quiz, selectQuiz }) => {
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
      <Text size="xs"c="dimmed" >
        {stat.title}
      </Text>
      <Text fw={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ));

  const getColorByAvgScore = (score: number) => {
    if(score > 85) {
        return 'green'
    }else if(score > 70) {
        return 'blue'
    }else if(score > 50) {
        return 'yellow'
    }else if(score > 30) {
        return 'orange'
    }else {
        return 'red'
    }
  }

  return (
    <Card withBorder padding="lg" className="card" key={quiz.id}>
        <Flex direction={"column"} h={"100%"}>
        <Group justify="space-between" mt="sm">
            <Text fz="sm" fw={700} className="title" lh={1.4}>{quiz.title}</Text>
            <Group gap={5}>
                <Text fz="xs" c="dimmed">{quiz.stats.avgScore}% average</Text>
                <RingProgress 
                    size={18} 
                    thickness={2} 
                    sections={[{ 
                        value: quiz.stats.avgScore, 
                        color: getColorByAvgScore(quiz.stats.avgScore) 
                    }]} />
            </Group>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs" flex={1}>{quiz.summary}</Text>
        <Card.Section className="stats">{items}</Card.Section>
        <Group className='footer'>
            <Button variant="light" style={{ flex: 1 }} onClick={() => selectQuiz(quiz.id)}>
                See Details
            </Button>
            <ActionIcon variant='default' size={36}>
                <IconHeart className="like" stroke={1.5} />
            </ActionIcon>
        </Group>
        </Flex>
    </Card>
  );
}