import { Center, Title, Flex } from '@mantine/core';

import { AddRecipeButton } from './add_recipe_button';

export function Header() {
    return (
        <>
            <Center inline maw={600} h={60}>
                <Flex pl={15} gap={"lg"}>
                    <Title>
                        Recipe Tracker
                    </Title>

                    <AddRecipeButton />
                </Flex>
            </Center>
        </>
    );
}