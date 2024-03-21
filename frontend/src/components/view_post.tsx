import { Text, Title, Space, Group, ActionIcon } from "@mantine/core"
import { IconX } from "@tabler/icons-react"


export function ViewPost(props: any) {
    return (
        <>
            <Group grow>
                <Group>
                    <Title order={3}>
                        {props.selectedPost.getTitle()}
                    </Title>
                </Group>

                <Group justify="flex-end">
                    <ActionIcon 
                        variant="default"
                        onClick={props.onClose}
                    >
                        <IconX />
                    </ActionIcon>
                </Group>
            </Group>

            <Space h={"md"} />

            <Group>
                <Text className="textbox">
                    {props.selectedPost.getContent()}
                </Text>
            </Group>
        </>
    );
}