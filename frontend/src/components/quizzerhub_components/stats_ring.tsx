import { Text, Card, RingProgress, Group } from '@mantine/core';
import { FC } from 'react';
import { getColorByAvgScore } from './quiz_card';

interface Props {
    questionCount: number
    likes: number
    avgScore: number
    avgTime: number
}
export const StatsRing: FC<Props> = ({ questionCount, likes, avgScore, avgTime }) => {

  return (
    <Card withBorder p="lg" radius="md" mt={20} className="quiz-stats-ring">
      <div className="inner">
        <div className='mainStats'>
          <div>
            <Text className="lead">{questionCount}</Text>
            <Text fz="xs" c="dimmed">Questions</Text>
          </div>
            <Group>
                <div>
                    <Text className="label">{likes}</Text>
                    <Text size="xs" c="dimmed">Likes</Text>
                </div>
                <div>
                    <Text className="label">{avgTime} minutes</Text>
                    <Text size="xs" c="dimmed">Avg Completion Time</Text>
                </div>
            </Group>
        </div>

        <div className="ring">
          <RingProgress
            roundCaps
            thickness={4}
            size={120}
            sections={[{ value: avgScore, color: getColorByAvgScore(avgScore) }]}
            label={
              <div>
                <Text ta="center" fz="md" className="label">
                  {avgScore.toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">Avg Score</Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}