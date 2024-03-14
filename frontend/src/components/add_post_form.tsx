import { useForm } from "@mantine/form";
import { Box, TextInput, Textarea, Button, Space, Flex } from "@mantine/core";

import { serverController } from "../controllers/server_controller";

export function AddPostForm(props: any) {
    const postForm = useForm({
        initialValues: {
            title: "",
            content: "",
        },
    });

    async function handleSubmit(){
        if (postForm.values.title && postForm.values.content) {
            props.onClose();

            let post = {
                title: postForm.values.title.toLowerCase(),
                content: postForm.values.content.toLowerCase(),
                lastTimeModified: new Date()
            }

            await serverController.savePost(post)
                .then((data: any) => {
                    console.log(data);
                })
                .catch((error: any) => console.log(error));

            window.location.reload();
        }
    }

    return (
        <>
            <Box maw={600} mx={"auto"}>
                <form onSubmit={postForm.onSubmit((values) => console.log(values))}>
                    <TextInput 
                        required
                        label="Title"
                        value={postForm.values.title}
                        onChange={(event) => postForm.setFieldValue("title", event.currentTarget.value)}
                    />

                    <Space h={"md"} />

                    <Textarea 
                        autosize
                        minRows={5}
                        required
                        label="Content"
                        value={postForm.values.content}
                        onChange={(event) => postForm.setFieldValue("content", event.currentTarget.value)}
                    />

                    <Space h={"md"} />

                    <Flex justify={"end"}>
                        <Button 
                            type="button"
                            onClick={props.onClose}
                            bg={"red"}
                        >
                            Cancel
                        </Button>

                        <Space w={5} />

                        <Button 
                            type="submit"
                            onClick={handleSubmit}
                            bg={"green"}
                        >
                            Submit Post
                        </Button>
                    </Flex>
                </form>
            </Box>
        </>
    );
}