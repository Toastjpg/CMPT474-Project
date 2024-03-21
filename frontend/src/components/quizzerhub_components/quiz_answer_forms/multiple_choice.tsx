import { Container, Radio, Stack, TextInput, Button } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { AnswerType } from "../../../models/question";
import { useInputState, useListState } from "@mantine/hooks";


interface Props {
    answer: AnswerType
    test: boolean
}
export const InputMultipleChoice: FC<Props> = ({ answer, test }) => {
    // const [currentAnswer, setCurrentAnswer] = useState<Array<string>>(answer.answer)
    const [options, optionsHandler] = useListState(answer.choices!)
    const [newOption, setNewOption] = useInputState('')
    const [value, setValue] = useState('react');
    useEffect(() => {
        answer.choices = options
        console.log(answer)
        console.log(answer.choices)
        console.log(options)
    }, [options])
    return (
        <Container p={0}>
            {!test  && 
            <>
            <TextInput onChange={setNewOption} label="New Option" description="Type here to add to the options list." />
            <Button leftSection={<IconPlus style={{ width: '70%', height: '70%' }} stroke={1.5} onClick={() => optionsHandler.append(newOption)} />}>Add</Button>
            </>}

            <Radio.Group
                label="Select your favorite framework/library"
                value={value}
                onChange={setValue}
                description="This is anonymous"
                withAsterisk
                >
                <Stack mt="xs">
                    {options.map((choice, index) => (
                        <Radio value={index} label={choice} />
                    ))}
                </Stack>
            </Radio.Group>
        </Container>
    )
}