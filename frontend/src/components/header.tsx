import { Center, Title, Flex } from '@mantine/core';

import { AddPostButton } from './add_post_button';

export function Header() {
    return (
        <>
            <Center inline maw={600} h={60}>
                <Flex pl={15} gap={"lg"}>
                    <Title>
                        SFU Connect
                    </Title>

                    <AddPostButton />
                </Flex>
            </Center>
        </>
    );
}