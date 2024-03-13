import { useDisclosure } from "@mantine/hooks";
import { Accordion, Text, Title, Space, Button, Group, Modal, Card, Grid } from "@mantine/core"
import { useState, useEffect } from "react";

import { Recipe } from "../models/recipe";
import { serverClient } from "../controllers/server_client"
import "../styles/recipe_list.css";
import "./edit_recipe_form";
import { EditRecipeForm } from "./edit_recipe_form";

export function PostList() {
    const [opened, {open, close}] = useDisclosure();
    const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    useEffect(() => {
        serverClient.getRecipes()
            .then((data: any) => {
                setRecipes(data.map((recipe: any) => Recipe.fromJSON(recipe)));
            })
            .catch((error: any) => console.log(error));
    }, [])

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
    });

    const postList = recipes.map((recipe) => {
        return (
            <Grid.Col span={3}>
                <Card key={recipe.id} shadow="sm" padding="md" radius="md" className="recipe-card">
                    <h3>{recipe.getTitle()}</h3>
                    <p>{recipe.getInstructions()}</p>
                    <Button onClick={() => handleDelete(recipe.id ?? "")}>
                        Delete
                    </Button>
                    <Button onClick={() => {
                        open();
                        console.log("Editing recipeID: ", recipe.id ?? "");
                        setRecipeToEdit(recipe);
                    }}>
                        Edit
                    </Button>
                    <Text>
                        Last Modified: {recipe.getLastTimeModified()}
                    </Text>
                </Card>
            </Grid.Col>
        );
    });

    return (
        <>
            <Title order={3} td={"underline"}>
                Recent Posts
            </Title>

            <Modal opened={opened} onClose={close} title="Edit Recipe">
                <EditRecipeForm 
                    onClose={close}
                    recipe={recipeToEdit}
                />
            </Modal>

            <Space h="md" />

            {/* <Accordion variant="separated" radius={"md"}>
                {recipeList}
            </Accordion> */}

            <Grid>
                {postList}
            </Grid>
        </>
    );
}