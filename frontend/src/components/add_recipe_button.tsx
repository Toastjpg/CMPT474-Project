import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

import { AddRecipeForm } from "./add_recipe_form";

export function AddRecipeButton() {
    const [opened, {open, close}] = useDisclosure();

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Recipe">
                <AddRecipeForm 
                    onClose={close}
                />
            </Modal>

            <Button onClick={open}>
                Add Recipe
            </Button>
        </>
    );
}