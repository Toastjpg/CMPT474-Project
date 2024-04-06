import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Group, Title, Text, Divider, ActionIcon, Button, Flex } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

import { UnreleasedFeatureNotification } from "../components/unreleased_feature";

export function Courses(): JSX.Element {
    /* ---------------------------------- state --------------------------------- */
    const navigate = useNavigate();

    const [courses, setCourses] = useState<any>([]);

    // set courses at the beginning
    useEffect(() => {
        setCourses(tempCourses);
    }, []);

    // each time a course is favourited/unfavourited, re-render the component
    useEffect(() => {
        
    }, [courses]);
    
    /* ---------------------------------- data ---------------------------------- */
    const placeholderDescription: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    let tempCourses = [
        { id: 'CMPT213', label: 'CMPT213', description: placeholderDescription, isFavourite: false },
        { id: 'CMPT474', label: 'CMPT474', description: placeholderDescription, isFavourite: false },
        { id: 'IAT210', label: 'IAT210', description: placeholderDescription, isFavourite: false},
    ];

    /* ----------------------------- event handlers ----------------------------- */
    function onCardNavigateClick(courseId: string): void {
        navigate(`/courses/${courseId}/resources`);
    }

    function onFavouriteClick(courseId: string): void {
        // this is a very inefficient way to update the styling of the bookmarks as it reloads all the courses
        // TODO: find a better way to update the styling of the bookmarks
        
        let courseIndex = courses.findIndex((course: any) => course.id === courseId);
        let newCourses = [...courses];
        newCourses[courseIndex].isFavourite = !newCourses[courseIndex].isFavourite;
        setCourses(newCourses);
    }

    /* ------------------------------- components ------------------------------- */
    function courseCard(courseId: string, courseDescription: string, isFavourite: boolean): JSX.Element {
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
                >
                    <Group justify="space-between">
                        <Title order={1}>{courseId}</Title>

                        <Group>
                            <Button size="md" onClick={() => onCardNavigateClick(courseId)}>
                                Go to course
                            </Button>

                            <ActionIcon 
                                size={"xl"} 
                                variant={isFavourite ? "filled" : "outline"}
                                onClick={() => onFavouriteClick(courseId)}
                            >
                                <IconStar />
                            </ActionIcon>
                        </Group>
                    </Group>
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
                    {courses.map((course: any) => (
                        <Flex key={course.id}>
                            {courseCard(course.id, course.description, course.isFavourite)}
                        </Flex>
                    ))}
                </Group>
            </>
        );
    }

    /* --------------------------------- return --------------------------------- */
    return (
        <>
            {courseCards()}
        </>
    )
}