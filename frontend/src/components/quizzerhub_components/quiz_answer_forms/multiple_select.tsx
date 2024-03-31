import { Container, TextInput, Button, Text, Group, rem, Table, Checkbox } from "@mantine/core";
import { FC } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Option } from "../../../models/question";
import { useInputState } from "@mantine/hooks";


interface Props {
    options: Array<Option>
    setOptions: (options: Array<Option>) => void
    test: boolean // true if displaying form for quiz testing
}
export const InputMultipleSelect: FC<Props> = ({ options, setOptions, test }) => {
    const [label, setLabel] = useInputState('')


    const addOption = () => {
        const option: Option = new Option(label, false)
        setOptions([...options, option])
        setLabel('')
    }

    const selectOption = (optionIdx: number) => {
        if (options.length > 0 && optionIdx >= 0 && optionIdx < options.length) {
            const tmp = [...options]
            const option: Option = options.at(optionIdx)!
            tmp.splice(optionIdx, 1, new Option(option.label, !option.answer))
            setOptions([...tmp])
        }
    }

    const deleteOption = (deleteOptionIdx: number) => {
        if (options.length > 0 && deleteOptionIdx >= 0 && deleteOptionIdx < options.length) {
            const tmp = [...options]
            tmp.splice(deleteOptionIdx, 1)
            setOptions([...tmp])
        }
    }


    return (
        <Container p={0}>
            {!test &&
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
                    {options.map((option, index) => (
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
            {options.length === 0 && <Text mt={12} c="gray" size='sm'>You haven't added any options yet.</Text>}
        </Container>
    )
}