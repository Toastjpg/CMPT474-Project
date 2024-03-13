import { Title, Avatar, Group } from '@mantine/core';

import { AddPostButton } from './add_post_button';
import { AccountMenu } from './account_menu';

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
                    <AccountMenu />
                </Group>
            </Group>
        </>
    );
}