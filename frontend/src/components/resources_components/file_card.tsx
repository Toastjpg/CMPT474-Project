import { Card, Text, Flex, rem } from '@mantine/core';
import { IconFile, IconFileSpreadsheet, IconFileTypePpt, IconPdf, IconPhoto } from '@tabler/icons-react';
import { FC } from 'react';
import { IMAGE_MIME_TYPE, MS_EXCEL_MIME_TYPE, MS_POWERPOINT_MIME_TYPE, PDF_MIME_TYPE } from '@mantine/dropzone';


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
        }else if(MS_POWERPOINT_MIME_TYPE.some(name => name === type)) {
            return <IconFileTypePpt style={styles} stroke={1.4} />
        }else if(MS_EXCEL_MIME_TYPE.some(name => name === type)) {
            return <IconFileSpreadsheet style={styles} stroke={1.4} />
        } {// add more as needed
            return <IconFile style={styles} stroke={1.4} />
        }
    }

    const openResource = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <Card radius={12} className='file-card' miw={110} flex={1} onClick={() => openResource(file.url)}>
            <Flex direction={"column"} h={"100%"} align="center" gap={8}>
                {getIconByType(file.type)}
                <Text w="100%" className='filename' c="var(--mantine-color-gray-6)" size='xs'>{file.name}</Text>
            </Flex>
        </Card>
    );
}