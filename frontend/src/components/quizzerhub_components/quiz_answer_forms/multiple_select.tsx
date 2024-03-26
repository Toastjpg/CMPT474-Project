import { Container, TextInput, Button, Text, Group, rem, Table, Checkbox } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Option } from "../../../models/question";
import { useInputState } from "@mantine/hooks";


interface Props {
    options: Array<Option>
    test: boolean // true if displaying form for quiz testing
}
export const InputMultipleSelect: FC<Props> = ({ options, test }) => {
    const [currentOptions, setCurrentOptions] = useState<Array<Option>>(options)
    const [label, setLabel] = useInputState('')
    // const [selected, setSelected] = useInputState('')

    useEffect(() => {
        options = [...currentOptions]
        console.log("currentOptions: ", currentOptions)
        console.log("options: ", options)
        // if(currentOptions.length <= 1) {
        //     setSelected('0')
        // }
    }, [currentOptions])

    // useEffect(() => {
    //     console.log("selected changed: " + selected)
    //     options.forEach((option, index) => option.setUserSelect(index === Number(selected)))
    // }, [selected])

    const addOption = () => {
        const option: Option = new Option(label, false)
        setCurrentOptions([...currentOptions, option])
        setLabel('')
    }

    const selectOption = (index: number) => {
        console.log('selectOption')
        if(currentOptions.length > 0 && index >= 0 && index < currentOptions.length ) {
            const selected = currentOptions.at(index)?.answer
            currentOptions.at(index)?.setAnswer(selected !== undefined ? !selected : false)
            setCurrentOptions([...currentOptions])
        }
    }

    const deleteOption = (index: number) => {
        if(currentOptions.length > 0 && index >= 0 && index < currentOptions.length ) {
            currentOptions.splice(index, 1)
            setCurrentOptions([...currentOptions])
        }
    }


    return (
        <Container p={0}>
            {!test  && 
            <>
            <TextInput onChange={setLabel} value={label} mb={12} label="New Option" description="Type here to add to the options list." />
            <Group justify="right">
                <Button variant="light" disabled={label.trim().length == 0} onClick={addOption} leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>Add</Button>
            </Group>
            </>}

            <Table>
                <Table.Thead>
                    <Table.Tr>
                    <Table.Th>Answer</Table.Th>
                    <Table.Th>Option</Table.Th>
                    <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {currentOptions.map((option, index) => (
                        <Table.Tr
                        key={index}
                      >
                        <Table.Td>
                          <Checkbox
                            aria-label="Select row"
                            checked={option.answer}
                            onChange={() => selectOption(index)}
                          />
                        </Table.Td>
                        <Table.Td>{option.label}</Table.Td>
                        <Table.Td><Button variant="light" color="red" onClick={() => deleteOption(index)}><IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} /></Button></Table.Td>
                      </Table.Tr>
                    ))}
                    
                </Table.Tbody>
            </Table>
            {currentOptions.length === 0 && <Text mt={12} c="gray" size='sm'>You haven't added any options yet.</Text>}
        </Container>
    )
}