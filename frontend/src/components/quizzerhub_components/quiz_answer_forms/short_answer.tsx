import { Container, Button, Group, Textarea } from "@mantine/core";
import { FC, useEffect } from "react";
import { Option } from "../../../models/question";
import { useInputState } from "@mantine/hooks";


interface Props {
    options: Array<Option>
    setOptions: (options: Array<Option>) => void
    test: boolean // true if displaying form for quiz testing
}
export const InputShortAnswer: FC<Props> = ({ options, setOptions, test }) => {
    const [shortAnswer, setShortAnswer] = useInputState('')

    useEffect(() => {
        if (options.length !== 1) {
            setOptions([...options, new Option('', true)])
        } else {
            setShortAnswer(options.at(0)!.label)
        }
    }, [options])

    const updateOption = () => {
        console.log("shortAnswer: ", shortAnswer)
        setOptions([new Option(shortAnswer, true)])
    }


    return (
        <Container p={0}>
            {!test &&
                <>
                    <Textarea
                        onChange={setShortAnswer}
                        value={shortAnswer}
                        mb={12}
                        description="Type in the expected answer to the question." />
                    <Group justify="right">
                        <Button variant="light" onClick={updateOption}>Save</Button>
                    </Group>
                </>
            }
        </Container>
    )
}