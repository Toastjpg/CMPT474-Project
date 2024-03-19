
import { Accordion, Title } from '@mantine/core';

export function QuizzerHubTab() {
    const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

    return (
        <section id="quizzerHubTab">
            <Title size="h4">Quizzes</Title>
            <Accordion>
                <Accordion.Item className="item" value="reset-password">
                <Accordion.Control>Microservices Architecture</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="item" value="another-account">
                <Accordion.Control>Serverless technology</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item className="item" value="newsletter">
                <Accordion.Control>Network Architecture</Accordion.Control>
                <Accordion.Panel>{placeholder}</Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </section>
    )
}