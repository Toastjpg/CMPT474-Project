import { useDisclosure } from "@mantine/hooks";
import { Text, Title, Space, Group, Modal, Card, Grid, rem } from "@mantine/core"
import { useState, useEffect } from "react";

import { serverClient } from "../controllers/server_client"
import { EditPostForm } from "./edit_post_form";

import "../styles/recipe_list.css";
import "./edit_post_form";

import { Post } from "../models/post";
import { temp_posts } from "../models/temp_posts";

export function PostList() {
    const [opened, {open, close}] = useDisclosure();
/*     const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);

    async function handleDelete(id: string){
        if (confirm("Are you sure you want to delete this recipe?")){
            await serverClient.deleteRecipe(id)
                .then(() => {
                    window.location.reload();
                })
                .catch((error: any) => console.log(error));

            alert("Recipe was deleted.");
            console.log(`Recipe with ID ${id} was deleted.`);
        }
        else {
            alert("Recipe was not deleted.");
        }
    }

    const recipeList = recipes.map((recipe) => {
        return (
            <Accordion.Item key={recipe.id} value={recipe.getTitle()}>
                <Accordion.Control>{recipe.getTitle()}</Accordion.Control>
                <Accordion.Panel>
                    <h3>Ingredients:</h3>
                    <Text className="textbox"      >
                        {recipe.getIngredients()}
                    </Text>

                    <h3>Instructions:</h3>
                    <Text className="textbox">
                        {recipe.getInstructions()}
                    </Text>

                    <Space h="md" />

                    <Group>
                        <Button bg={"red"} onClick={() => handleDelete(recipe.id ?? "")}>
                            Delete
                        </Button>

                        <Button bg={"blue"} onClick={() => {
                            open();
                            console.log("Editing recipeID: ", recipe.id ?? "");
                            setRecipeToEdit(recipe);
                        }}>
                            Edit
                        </Button>

                        <Text>
                            Last Modified: {recipe.getLastTimeModified()}
                        </Text>
                    </Group>
                </Accordion.Panel>
            </Accordion.Item>
        );
    }); */

    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        // serverClient.getPosts()
        //     .then((data: any) => {
        //         setPosts(data.map((post: any) => Post.fromJSON(post)));
        //     })
        //     .catch((error: any) => console.log(error));
        setPosts(temp_posts.map((post) => Post.fromJSON(post)));
    });

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
                    style={{ minHeight: rem(200) }}
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
                Recent Posts
            </Title>

            <Modal opened={opened} onClose={close} title="Edit Post">
                <EditPostForm 
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