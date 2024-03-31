import { Flex, ScrollArea, rem, Title, Button, Modal, SimpleGrid, TextInput, Text } from '@mantine/core';
import '@mantine/dropzone/styles.css';
import { IconSearch, IconSquarePlus } from '@tabler/icons-react';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { FileUploader } from './file_uploader/file_uploader';
import { useEffect, useState } from 'react';
import { FileCard, FileInfo } from './file_card';
import { getAllFiles } from '../../controllers/media-controller';


export function ResourcesTab() {
    const [opened, { open, close }] = useDisclosure(false);
    const [search, setSearch] = useInputState('');
    const [files, setFiles] = useState<Array<FileInfo>>([])
    const [filteredFiles, setFilteredFiles] = useState<Array<FileInfo>>([])

    useEffect(() => {
        fetchFiles()
    }, [])

    useEffect(() => {
        setFilteredFiles(filterFiles())
    }, [search, files])

    const fetchFiles = async () => {
        try {
            const response = await getAllFiles()
            if(response.ok) {
                const data = await response.json()
                setFiles([...data])
                setFilteredFiles([...data])
            }else {
                alert("Something went wrong. Please refresh browser and try again.")
            }
        }catch(error) {
            console.log(error)
            alert("Fetching files failed.")
        }
    }

    const filterFiles = () => {
        const keywords: Array<string> = search.toLowerCase().trim().split(' ')
        return files.filter(file => {
            return keywords.every(keyword => {
                return file.name.toLowerCase().includes(keyword)
            })
        })
    }

    const updateFilesList = async () => {
        close()
        await fetchFiles()
    }
    return (
        <>
            <Modal opened={opened} onClose={close} size="xl" w="100%" title="Upload Course Resources">
                {<FileUploader updateFilesList={updateFilesList} props={{ multiple: true }} />}
            </Modal>
            <Flex direction={"column"} h={"100%"}>
                <Flex justify={"space-between"} direction={"row"} mb={12} align={"center"}>
                    <Title size="h4">Resources</Title>
                    <Button
                        variant="default"
                        onClick={open}
                        leftSection={<IconSquarePlus
                            style={{
                                width: rem(16),
                                height: rem(16)
                            }}
                            stroke={1.5} />}>
                        Upload Course Resources
                    </Button>
                </Flex>
                <TextInput
                    placeholder="Search by keywords"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={search}
                    onChange={setSearch}
                />
                <ScrollArea scrollbarSize={8} w={"100%"} flex={1}>
                    <SimpleGrid className='file-list' >
                        {filteredFiles.map((file, index) => <FileCard file={file} key={index} />)}
                    </SimpleGrid>
                    {filteredFiles.length === 0 && <Text c="gray" size='sm'>No files found.</Text>}
                </ScrollArea>
            </Flex>
        </>
    )
}