import { Card, Text, Flex, rem } from '@mantine/core';
import { IconFile, IconPdf, IconPhoto } from '@tabler/icons-react';
import { FC } from 'react';
import { IMAGE_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';


export interface FileInfo {
    name: string
    url: string
    type: string
}

interface Props {
    file: FileInfo
}
const styles = { width: rem(40), height: rem(40), color: "var(--mantine-color-gray-6)" }
export const FileCard: FC<Props> = ({ file }) => {
    const getIconByType = (type: string) => {
        if(IMAGE_MIME_TYPE.some(name => name === type)) {
            return <IconPhoto style={styles} stroke={1.4} />
        }else if(PDF_MIME_TYPE.some(name => name === type)) {
            return <IconPdf style={styles} stroke={1.4} />
        }else {// add more as needed
            return <IconFile style={styles} stroke={1.4} />
        }
    }

    return (
        <Card bg="var(--mantine-color-gray-2)" radius={12} className='file-card' miw={110} flex={1}>
            <Flex direction={"column"} h={"100%"} align="center" gap={8}>
                {getIconByType(file.type)}
                <Text w="100%" className='filename' c="var(--mantine-color-gray-6)" size='xs'>{file.name}</Text>
            </Flex>
        </Card>
    );
}