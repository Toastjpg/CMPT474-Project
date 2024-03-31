import { Card, Text, Flex, rem } from '@mantine/core';
import { 
    IconFile, 
    IconFileMusic, 
    IconFileSettings, 
    IconFileSpreadsheet, 
    IconFileTypeCsv, 
    IconFileTypeDocx, 
    IconFileTypePpt, 
    IconFileTypeTxt, 
    IconFileZip, 
    IconPdf, 
    IconPhoto, 
    IconVideo } from '@tabler/icons-react';
import { FC } from 'react';
import { 
    MIME_TYPES, 
    IMAGE_MIME_TYPE, 
    MS_EXCEL_MIME_TYPE, 
    MS_POWERPOINT_MIME_TYPE, 
    PDF_MIME_TYPE, 
    MS_WORD_MIME_TYPE } from '@mantine/dropzone';


export interface FileInfo {
    name: string
    url: string
    type: string
}


interface Props {
    file: FileInfo
}

const styles = { width: rem(40), height: rem(40), color: "var(--mantine-color-gray-6)" }
const MimeTypeIcons: Array<{ types: string[], icon: JSX.Element}> = new Array()
MimeTypeIcons.push({ types: ["text/plain"], icon: <IconFileTypeTxt style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: ["audio/mpeg"], icon: <IconFileMusic style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: [MIME_TYPES.mp4], icon: <IconVideo style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: [MIME_TYPES.zip], icon: <IconFileZip style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: [MIME_TYPES.csv], icon: <IconFileTypeCsv style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: [MIME_TYPES.exe], icon: <IconFileSettings style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: IMAGE_MIME_TYPE, icon: <IconPhoto style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: PDF_MIME_TYPE, icon: <IconPdf style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: MS_WORD_MIME_TYPE, icon: <IconFileTypeDocx style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: MS_POWERPOINT_MIME_TYPE, icon: <IconFileTypePpt style={styles} stroke={1.4} /> })
MimeTypeIcons.push({ types: MS_EXCEL_MIME_TYPE, icon: <IconFileSpreadsheet style={styles} stroke={1.4} /> })


export const FileCard: FC<Props> = ({ file }) => {
    const getIconByType = (type: string) => {
        for(let item of MimeTypeIcons) {
            if(item.types.some(option => option === type)) {
                return item.icon
            }
        }
        return <IconFile style={styles} stroke={1.4} />
    }

    const openResource = (url: string) => {
        window.open(url, '_blank')
    }

    return (
        <Card radius={12} className='file-card' miw={110} flex={1} onClick={() => openResource(file.url)}>
            <Flex direction={"column"} h={"100%"} align="center" gap={8}>
                {getIconByType(file.type)}
                <Text w="100%" className='filename' c="var(--mantine-color-gray-6)" size='xs' ta="center">{file.name}</Text>
            </Flex>
        </Card>
    );
}