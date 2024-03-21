import { Center, Container, Flex, ScrollArea, SegmentedControl, Tabs, Title, rem } from "@mantine/core"
import { IconBrain, IconDatabase, IconLayoutGrid, IconListDetails, IconMessages } from "@tabler/icons-react";
import { FC } from "react"
import { QuizzerHubTab } from "../components/quizzerhub_components/quizzerhub_tab";
import { ChatroomTab } from "../components/chatroom_components/chatroom_tab";
import { UnreleasedFeatureNotification } from "../components/unreleased_feature";

interface Props {
    course: string
}
export const Course: FC<Props> = ({ course }) => {

      const iconStyle = { width: rem(12), height: rem(12) };
    return (
            <Tabs defaultValue="resources" h="100%" color="#ce0030" activateTabWithKeyboard={false} keepMounted={false}>
                <Flex direction="column" h="100%">
                <Tabs.List variant="scrollable">
                    <Tabs.Tab value="resources" leftSection={<IconDatabase style={iconStyle} />}>Resources</Tabs.Tab>
                    <Tabs.Tab value="quizzerhub" leftSection={<IconBrain style={iconStyle} />}>QuizzerHub</Tabs.Tab>
                    <Tabs.Tab value="chatroom" leftSection={<IconMessages style={iconStyle} />}>Chatroom</Tabs.Tab>
                </Tabs.List>
                {/* <ScrollArea scrollbarSize={8} scrollbars="y" w={"100%"}> */}
                    <Tabs.Panel value="resources" pt={12} w="100%" flex={1} mih={0} className="scroll-frame">
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
                        <ScrollArea>files listed
                            <UnreleasedFeatureNotification />
                        </ScrollArea>
                    </Tabs.Panel>
                    <Tabs.Panel value="quizzerhub" pt={12} w="100%" flex={1} mih={0} className="scroll-frame"><QuizzerHubTab /></Tabs.Panel>
                    <Tabs.Panel h={"100%"} pt={12}  w="100%" mih={0} value="chatroom"><ChatroomTab /></Tabs.Panel>
                {/* </ScrollArea> */}
            </Flex>
        </Tabs>
    )
}