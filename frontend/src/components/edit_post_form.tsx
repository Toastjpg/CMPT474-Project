import { useForm } from "@mantine/form";
import { Box, TextInput, Textarea, Button, Space, Flex } from "@mantine/core";

import { serverClient } from "../controllers/server_client";

export function EditPostForm(props: any) {
    const postForm = useForm({
        initialValues: {
            title: props.recipe.getTitle(),
            content: props.recipe.getcontent(),
        },
    });

    async function handleSubmitEdit(){
        if (postForm.values.title && postForm.values.content) {
            props.onClose();

            let recipe = {
                id: props.recipe.id,
                title: postForm.values.title.toLowerCase(),
                content: postForm.values.content.toLowerCase(),
                lastTimeModified: new Date()
            }

            await serverClient.updateRecipe(recipe)
                .then((data: any) => console.log(data))
                .catch((error: any) => console.log(error));

            alert("Recipe was updated.");
            window.location.reload();
        }
    }

    return (
        <>
            <Box maw={600} mx={"auto"}>
                <form onSubmit={postForm.onSubmit((values) => console.log(values))}>
                    <TextInput 
                        required
                        label="title"
                        value={postForm.values.title}
                        onChange={(event) => postForm.setFieldValue("title", event.currentTarget.value)}
                    />

                    <Textarea 
                        autosize
                        minRows={5}
                        required
                        label="content"
                        value={postForm.values.content}
                        onChange={(event) => postForm.setFieldValue("content", event.currentTarget.value)}
                    />

                    <Space h={"md"} />

                    <Flex justify={"end"}>
                        <Button 
                            type="button"
                            onClick={postForm.reset}
                            bg={"red"}
                        >
                            Reset
                        </Button>

                        <Space w={5} />

                        <Button 
                            type="submit"
                            onClick={handleSubmitEdit}
                            bg={"green"}
                        >
                            Update Recipe
                        </Button>
                    </Flex>
                </form>
            </Box>
        </>
    );
}