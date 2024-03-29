
import { Flex, ScrollArea, Textarea } from '@mantine/core';
import { Comment } from './comment';

export function ChatroomTab() {
    return (
        <Flex w={"100%"} h={"100%"} id='chatroomTab' direction={"column"}>
            <ScrollArea scrollbarSize={8} flex={1} offsetScrollbars>
                {Array(15)
                    .fill(0)
                    .map((item, index) => (
                        <Comment key={index} />
            ))}
            </ScrollArea>
            <Textarea placeholder='Type in here...' />
        </Flex>
    )
}