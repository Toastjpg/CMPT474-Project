import { Group, Text, Center, Flex, ScrollArea, SegmentedControl, rem } from '@mantine/core';
import '@mantine/dropzone/styles.css';
import { UnreleasedFeatureNotification } from '../unreleased_feature';
import { IconLayoutGrid, IconListDetails } from '@tabler/icons-react';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function ResourcesTab(props: Partial<DropzoneProps>) {
    return (
        <>
            <Dropzone
                onDrop={(files: any) => console.log('accepted files', files)}
                onReject={(files: any) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
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
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <ScrollArea mt={20}>
                <Flex justify="end">
                    <SegmentedControl
                        data={[
                            {
                                value: 'grid',
                                label: (
                                    <Center style={{ gap: 10 }}>
                                        <IconLayoutGrid style={{ width: rem(16), height: rem(16) }} />
                                        <span>Grid</span>
                                    </Center>
                                ),
                            },
                            {
                                value: 'list',
                                label: (
                                    <Center style={{ gap: 10 }}>
                                        <IconListDetails style={{ width: rem(16), height: rem(16) }} />
                                        <span>List</span>
                                    </Center>
                                ),
                            },
                        ]}
                    />
                </Flex>
                <UnreleasedFeatureNotification />
            </ScrollArea>
        </>
    )
}