import { Container, TextInput, Button, Text, Group, rem, Table, Checkbox } from "@mantine/core";
import { FC, useEffect } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Option } from "../../../models/question";
import { useInputState } from "@mantine/hooks";


interface Props {
    options: Array<Option>
    setOptions: (options: Array<Option>) => void
    test: boolean // true if displaying form for quiz testing
}
export const InputMultipleChoice: FC<Props> = ({ options, setOptions, test }) => {
    const [label, setLabel] = useInputState('')
    const [selected, setSelected] = useInputState('-1')

    useEffect(() => {
        console.log("options: ", options)
        if(options.length < 1) {
            setSelected('-1')
        }else {
            const trueOption:number = options.findIndex(option => option.answer)
            if(trueOption === -1) {
                selectOption(0)
            }else {
                setSelected(trueOption.toString())
            }
        }
        
    }, [options])


    useEffect(() => {
        console.log("selected changed: " + selected)
    }, [selected])

    const addOption = () => {
        const option: Option = new Option(label, (options.length === 0))
        setOptions([...options, option])
        setLabel('')
    }

    const selectOption = (trueOptionIdx: number) => {
        
        if(options.length > 0 && trueOptionIdx >= 0 && trueOptionIdx < options.length) {
            const updatedoptions: Array<Option> = options.map((option, index) => {
                return new Option(option.label, index === trueOptionIdx)
            })
            console.log("updated options: ", updatedoptions)
            setOptions([...updatedoptions])
        }
    }

    const deleteOption = (deleteOptionIdx: number) => {
        if(options.length > 0 && deleteOptionIdx >= 0 && deleteOptionIdx < options.length ) {
            const tmp = [...options]
            tmp.splice(deleteOptionIdx, 1)
            setOptions([...tmp])
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
                    {options.map((option, index) => (
                        <Table.Tr
                        key={index}
                      >
                        <Table.Td>
                          <Checkbox
                            aria-label="Select row"
                            checked={index.toString() === selected}
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