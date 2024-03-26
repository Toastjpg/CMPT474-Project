import { Container, TextInput, Button, Text, Group, rem, Table, Checkbox, RadioGroup, Radio } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Option, Question } from "../../../models/question";
import { useInputState } from "@mantine/hooks";


interface Props {
    options: Array<Option>
    test: boolean // true if displaying form for quiz testing
}
export const InputTrueFalse: FC<Props> = ({ options, test }) => {
    console.log(options)
    const [currentOptions, setCurrentOptions] = useState<Array<Option>>(() => {
        return options.length <= 0 ? Question.createTrueFalseOptions() : options
    })
    const [selected, setSelected] = useState(() => {
        if(options.length <= 0) {
            return "true"
        }
        console.log("loaded answer: " , options.at(0)?.answer)
        return options.at(0)?.answer ? "true" : "false"
    })

    useEffect(() => {
        options = [...currentOptions]
    }, [currentOptions])

    useEffect(() => {
        console.log(selected)
        const isTrueStatement:boolean = selected === "true" ? true : false
        currentOptions.at(0)?.setAnswer(isTrueStatement)
        currentOptions.at(1)?.setAnswer(!isTrueStatement)
        setCurrentOptions([...currentOptions])
    }, [selected])



    // const selectOption = (index: number) => {
    //     setSelected(index.toString())
    //     if(currentOptions.length > 0 && index >= 0 && index < currentOptions.length ) {
    //         const updatedoptions: Array<Option> = currentOptions.map((option, index) => {
    //             option.setAnswer(index.toString() === selected)
    //             return option
    //         })
    //         setCurrentOptions(updatedoptions)
    //     }
    // }


    return (
        <Container p={0}>
            <Radio.Group
                label="Options"
                value={selected}
                onChange={setSelected}
                description="Select the correct answer."
            >
            <Group mt="xs">
                <Radio value="true" label="True" />
                <Radio value="false" label="False" />
                {/* {currentOptions.map((option, index) => (
                    <Radio value={index.toString()} label={option.label} />
                ))} */}
            </Group>
            </Radio.Group>
        </Container>
    )
}