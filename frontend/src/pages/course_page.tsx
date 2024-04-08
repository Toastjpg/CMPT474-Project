import { FC } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Flex, Tabs, rem } from "@mantine/core"
import { IconBrain, IconDatabase, IconMessages, IconStar } from "@tabler/icons-react";

import { QuizzerHubTab } from "../components/quizzerhub_components/quizzerhub_tab";
import { ChatroomTab } from "../components/chatroom_components/chatroom_tab";
import { ResourcesTab } from "../components/resources_components/resources_tab";

export const Course: FC = () => {
    const navigate = useNavigate();
    const { courseId, tabValue } = useParams();

    const iconStyle = { width: rem(12), height: rem(12) };
    return (
        <Tabs
            defaultValue="resources"
            h="100%"
            color="#ce0030"
            activateTabWithKeyboard={false}
            keepMounted={false}
            value={tabValue}
            onChange={(value) => {
                navigate(`/courses/${courseId}/${value}`)
            }}>
            <Flex direction="column" h="100%">
                <Tabs.List variant="scrollable">
                    <Tabs.Tab
                        value="resources"
                        leftSection={<IconDatabase style={iconStyle} />}>
                        Resources
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="quizzerhub"
                        leftSection={<IconBrain style={iconStyle} />}>
                        QuizzerHub
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="chatroom"
                        leftSection={<IconMessages style={iconStyle} />}>
                        Chatroom
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="resources" pt={12} w="100%" flex={1} mih={0} className="scroll-frame"><ResourcesTab /></Tabs.Panel>
                <Tabs.Panel value="quizzerhub" pt={12} w="100%" flex={1} mih={0} className="scroll-frame"><QuizzerHubTab /></Tabs.Panel>
                <Tabs.Panel value="chatroom" pt={12} w="100%" flex={1} mih={0} className="scroll-frame" ><ChatroomTab /></Tabs.Panel>
            </Flex>
        </Tabs>
    )
}