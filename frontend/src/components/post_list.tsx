import React from "react";
import { useState, useEffect } from "react";

import { useDisclosure } from "@mantine/hooks";
import { Text, Title, Space, Group, Modal, Card, Grid, rem } from "@mantine/core"

import { serverController } from "../controllers/server_controller"
import { Post } from "../models/post";
import { ViewPost } from "./view_post";
import "../styles/recipe_list.css";


export function PostList() {
    const [opened, {open, close}] = useDisclosure();

    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    let reloadList = React.useCallback(async () => {
        serverController.getPosts()
            .then((data: any) => {
                setPosts(data.map(
                    (post: any) => {
                        console.log(
                            
                        );
                        return new Post(post.id, post.title, post.content, new Date(post.last_modified));
                    }
                ));
            })
            .catch((error: any) => console.log(error));
    }, []);
    useEffect(() => {
        reloadList();
    }, [reloadList]);

    const postList = posts.map((post) => {
        return (
            <Grid.Col key={post.getId()} span={3}>
                <Card
                    key={post.getId()}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="post-card"
                    style={{ minHeight: rem(200), cursor: "pointer"}}
                    onClick={() => {
                        console.log("Editing postID: ", post.getId());
                        setSelectedPost(post);
                        open();
                    }}
                >
                    <Title order={3} lineClamp={1}>
                        {post.getTitle()}
                    </Title>

                    <Group justify="space-between" mt={"md"} mb={"xs"}>
                        <Text className="textbox" lineClamp={4}>
                            {post.getContent()}
                        </Text>
                    </Group>
                </Card>
            </Grid.Col>
        );
    });

    return (
        <>
            <Title order={3} td={"underline"}>
                Posts
            </Title>

            <Modal opened={opened} onClose={close} centered withCloseButton={false}>
                <ViewPost 
                    selectedPost={selectedPost}
                    onClose={close}
                />
            </Modal>

            <Space h="md" />

            <Grid justify="center" align="stretch">
                {postList}
            </Grid>
        </>
    );
}