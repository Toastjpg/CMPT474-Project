import { ActionIcon, Button, Flex, Group, Text, rem, FileButton } from "@mantine/core";
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconFiles, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { FC, useState } from "react";
import '@mantine/dropzone/styles.css';
import { uploadFiles } from "../../../controllers/media-controller";


interface Props {
    props: Partial<DropzoneProps>
    updateFilesList: () => void
}
export const FileUploader: FC<Props> = ({ props, updateFilesList }) => {
    const [files, setFiles] = useState<Array<File>>([])
    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState<File | null>(null)
    const [fileUploaded, setFileUploaded] = useState(false)


    const removeFile = (index: number) => {
        if (files.length > 0 && index >= 0 && index < files.length) {
            const tmp = [...files]
            tmp.splice(index, 1)
            setFiles(tmp)
        }
    }

    const upload = async () => {
        try {
            setLoading(true)
            const response = await uploadFiles(files)
            setLoading(false)
            const data = await response.json()
            if (response.ok) {
                updateFilesList()
            } else {
                console.log(data.error)
                alert(data.error)
            }
        } catch (error) {
            console.error(error)
            alert("File upload failed. Please refresh the browser and try again.")
        }
    }

    const rows = files.map((file, index) => (
        <Flex key={index} direction="row" w="100%" justify="space-between" align="center" gap={16} className="row">
            <Text c="dimmed" fz="sm" className="filename" flex={1} miw={0}>{file.name}</Text>
            <Text c="dimmed" fz="sm">{(file.size / (1024 * 1024)).toFixed(2)}MB</Text>
            <ActionIcon color="red" variant="light">
                <IconTrash style={{ width: rem(14), height: rem(14) }} onClick={() => removeFile(index)} />
            </ActionIcon>
        </Flex>
    ));

    const listFilenames = (uploads: Array<{ file: File, errors: [] }>) => {
        return uploads.map(item => item.file.name).join('\n')
    }

    function customDropzone(): JSX.Element {
        return (
            <>
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
                                Drag file here or click to browse
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                File should not exceed 25MB
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            </>
        );
    }

    function customFileButton(): JSX.Element {
        return (
            <>
                <FileButton onChange={setFile}>
                    {(props) => <Button {...props} miw={"12rem"}>Choose File</Button>}
                </FileButton>
            </>
        );
    }

    return (
        <Flex direction="column" w="100%" id="fileuploader">

            {/* {customDropzone()} */}
            <Flex align={"center"} justify={"center"}>
                {customFileButton()}
            </Flex>

            <Text fw={500} mt={20} mb={12}>File Name</Text>
            {file && (
                <Text size="sm" ta="center" mt="sm">
                    {file.name}
                </Text>
            )}

            {/* <Flex w="100%" direction="column" className="uploads-list">
                {rows}
            </Flex>
            {files.length === 0 && <Text c="gray" size='sm'>0 files selected.</Text>}
            {files.length !== 0 && <Button loading={loading} variant="light" onClick={upload}>Upload {files.length} File{files.length > 1 ? 's' : ''}</Button>} */}
        </Flex>
    )
}