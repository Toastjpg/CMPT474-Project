import { ActionIcon, Button, Flex, Group, Text, rem } from "@mantine/core";
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconFiles, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import '@mantine/dropzone/styles.css';

export const FileUploader: FC = (props: Partial<DropzoneProps>) => {
    const [files, setFiles] = useState<Array<File>>([])

    useEffect(() => {
        console.log(files)
    }, [files])

    const removeFile = (index: number) => {
        if(files.length > 0 && index >= 0 && index < files.length) {
            const tmp = [...files]
            tmp.splice(index, 1)
            setFiles(tmp)
        }
    }

    const uploadFiles = async () => {
        console.log("send files to backend")
    }

    const rows = files.map((file, index) => (
        <Flex direction="row" w="100%" justify="space-between" align="center" gap={16} className="row">
            <Text c="dimmed" fz="sm" className="filename" flex={1} miw={0}>{file.name}</Text>
            <Text c="dimmed" fz="sm">{(file.size / (1024*1024)).toFixed(2)}MB</Text>
            <ActionIcon color="red" variant="light">
                <IconTrash style={{ width: rem(14), height: rem(14) }} onClick={() => removeFile(index)} />
            </ActionIcon>
        </Flex>
      ));

    const listFilenames = (uploads: Array<{file: File, errors: []}>) => {
        return uploads.map(item => item.file.name).join('\n')
    }

    return(
        <Flex direction="column" w="100%" id="fileuploader">
            
            <Dropzone
                onDrop={(uploads: any) => setFiles([...files, ...uploads])}
                onReject={(uploads: any) => alert('Error: rejected files:\n' + listFilenames([...uploads]))}
                maxSize={25 * 1024 ** 2}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFiles
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 25MB
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <Text fw={500} mt={20} mb={12}>Files</Text>
            <Flex w="100%" direction="column" className="uploads-list">
                {rows}
            </Flex>
            {files.length === 0 && <Text c="gray" size='sm'>0 files selected.</Text>}
            {files.length !== 0 && <Button variant="light" onClick={uploadFiles}>Upload {files.length} File{files.length > 1 ? 's' : ''}</Button>}
        </Flex>
    )
}