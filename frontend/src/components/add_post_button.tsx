import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

import { AddPostForm } from "./add_post_form";

export function AddPostButton() {
    const [opened, {open, close}] = useDisclosure();

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Forum Post">
                <AddPostForm 
                    onClose={close}
                />
            </Modal>

            <Button onClick={open}>
                Add Forum Post
            </Button>
        </>
    );
}