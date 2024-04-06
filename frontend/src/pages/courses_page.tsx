import { UnreleasedFeatureNotification } from "../components/unreleased_feature";
import { useNavigate } from "react-router-dom";

import { Card, Group, Title, Text, Divider } from "@mantine/core";

export function Courses(): JSX.Element {
    /* ---------------------------------- state --------------------------------- */
    const navigate = useNavigate();

    /* ---------------------------------- data ---------------------------------- */
    const placeholderDescription: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const courses = [
        { id: 'CMPT213', label: 'CMPT213', description: placeholderDescription },
        { id: 'CMPT474', label: 'CMPT474', description: placeholderDescription },
        { id: 'IAT210', label: 'IAT210', description: placeholderDescription },
    ];

    /* ----------------------------- event handlers ----------------------------- */
    function onCardClick(courseId: string): void {
        navigate(`/courses/${courseId}/resources`);
    }

    /* ------------------------------- components ------------------------------- */
    function courseCard(courseId: string, courseDescription: string): JSX.Element {
        return (
            <>
                <Card
                    shadow="sm" 
                    padding={"lg"} 
                    radius={"md"} 
                    miw={"32rem"} 
                    maw={"32rem"}
                    mih={"14rem"}
                    mah={"14rem"}
                    style={{ cursor: "pointer" }}
                    onClick={() => onCardClick(courseId)}
                >
                    <Title order={3}>{courseId}</Title>
                    <Divider my={"md"}/>
                    <Text lineClamp={4}>{courseDescription}</Text>
                </Card>
            </>
        );
    }

    /* -------------------------------- methods -------------------------------- */
    function courseCards(): JSX.Element {
        return (
            <>
                <Group justify="flex-start" gap={"md"}>
                    {courses.map((course) => (
                        courseCard(course.id, course.description)
                    ))}
                </Group>
            </>
        );
    }

    return (
        <>
            {courseCards()}
        </>
    )
}