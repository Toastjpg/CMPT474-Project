import { Center, Title, Flex, Avatar, Group, rem } from '@mantine/core';

import { AddPostButton } from './add_post_button';

export function Header() {
    return (
        <>
            <Group h={60} pr={15} grow>
                <Group pl={15}>
                    <Title>
                        SFU Connect
                    </Title>

                    <AddPostButton />
                </Group>
                    
                <Group justify='flex-end'>
                    <Avatar size={40} radius="xl" />
                </Group>
            </Group>
        </>
    );
}