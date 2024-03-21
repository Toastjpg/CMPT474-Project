import { FC } from "react"
import { Display } from "./quizzerhub_tab"
import { Container } from "@mantine/core"
import { QuizForm } from "./quiz_creation_form"

interface Props {
    setDisplay: (display: Display) => void
}
export const QuizzerHubCreate: FC<Props> = ({ setDisplay }) => {
    return (
        <Container p={0} w={"100%"} h={"100%"}>
            <QuizForm setDisplay={setDisplay} />
        </Container>
    )
}