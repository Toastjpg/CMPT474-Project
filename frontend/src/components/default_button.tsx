import { Button } from "@mantine/core"
import { FC } from "react";

interface ButtonProps {
    loading: boolean
    label: string
    action: () => void
}

export const DefaultButton: FC<ButtonProps> = ({ loading, label, action }) => {
    return (
        <Button color="gray" mt={12} justify="end" onClick={action} loading={loading} >{label}</Button>
    )
}