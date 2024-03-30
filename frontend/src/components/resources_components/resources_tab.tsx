import { Center, Flex, ScrollArea, SegmentedControl, rem, Title, Button, Modal, SimpleGrid, TextInput, Text } from '@mantine/core';
import '@mantine/dropzone/styles.css';
import { UnreleasedFeatureNotification } from '../unreleased_feature';
import { IconSearch, IconSquarePlus } from '@tabler/icons-react';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { FileUploader } from './file_uploader/file_uploader';
import { useEffect, useState } from 'react';
import { FileCard, FileInfo } from './file_card';

export function ResourcesTab() {
    const [opened, { open, close }] = useDisclosure(false);
    const [search, setSearch] = useInputState('');
    const [files, setFiles] = useState<Array<FileInfo>>([])
    const [filteredFiles, setFilteredFiles] = useState<Array<FileInfo>>([])

    useEffect(() => {
        console.log(filteredFiles)
    }, [filteredFiles])

    useEffect(() => {
        const init = async () => {
            // setFiles()
            // setFilteredFiles()
            const dummyFiles: Array<FileInfo> = [
                {
                    name: "welcome-page-bg-bdnOKvlu.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu1.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu2.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "application/pdf"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu3.png",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu4.ppt",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "application/vnd.ms-powerpoint"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu5.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu6.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu7.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
                    {
                    name: "welcome-page-bg-bdnOKvlu8.jpg",
                    url: "https://cmpt474-414403.ue.r.appspot.com/assets/welcome-page-bg-bdnOKvlu.jpg",
                    type: "image/png"
                },
            ]
            setFiles([...files, ...dummyFiles])
            setFilteredFiles([...filteredFiles, ...dummyFiles])
        }
        init()
    }, [])

    useEffect(() => {
        setFilteredFiles(filterFiles)
    }, [search])

    const filterFiles = () => {
        const keywords: Array<string> = search.toLowerCase().trim().split(' ')
        return files.filter(file => {
            return keywords.every(keyword => {
                return file.name.toLowerCase().includes(keyword)
            })
        })
    }
    return (
        <>
            <Modal opened={opened} onClose={close} size="xl" w="100%" title="Upload Course Resources">
                {<FileUploader />}
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