import { Center, Container, Flex, SegmentedControl, Tabs, Title, rem } from "@mantine/core"
import { IconBrain, IconDatabase, IconLayoutGrid, IconListDetails, IconMessages } from "@tabler/icons-react";
import { FC } from "react"
import { QuizzerHubTab } from "../components/quizzerhub_tab";
import { ChatroomTab } from "../components/chatroom_tab";

interface Props {
    course: string
}
export const Course: FC<Props> = ({ course }) => {

      const iconStyle = { width: rem(12), height: rem(12) };
    return (
        <section>
            {/* <p className="designHeading">{course}</p> */}
            <Tabs defaultValue="resources">
                <Tabs.List>
                    <Tabs.Tab value="resources" leftSection={<IconDatabase style={iconStyle} />}>Resources</Tabs.Tab>
                    <Tabs.Tab value="quizzerhub" leftSection={<IconBrain style={iconStyle} />}>QuizzerHub</Tabs.Tab>
                    <Tabs.Tab value="chatroom" leftSection={<IconMessages style={iconStyle} />}>Chatroom</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="resources" pt={12}>
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
                </Tabs.Panel>
                <Tabs.Panel value="quizzerhub" pt={12}><QuizzerHubTab /></Tabs.Panel>
                <Tabs.Panel value="chatroom" pt={12}><ChatroomTab /></Tabs.Panel>   
            </Tabs>
        </section>
    )
}