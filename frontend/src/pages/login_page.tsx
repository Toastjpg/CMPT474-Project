import { Title, TextInput, Button, PasswordInput, rem } from "@mantine/core"
import { IconLock, IconUser } from '@tabler/icons-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signinUser } from "../controllers/account.controller";
import { useInputState } from "@mantine/hooks";

export function SigninPage() {
    const [username, setUsername] = useInputState('');
    const [password, setPassword] = useInputState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    let navigate = useNavigate();

    async function signin() {

        setButtonIdle(true)
        const response = await signinUser(username, password) // signinUser not implemented yet!!!
        const data = await response.json()
        if (response.ok) {
            navigate("/homepage")
            return
        }
        setButtonIdle(false)
        alert(data)
    }

    const signinForm = () => {
        const iconUser = <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        const iconLock = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        return (
            <>
                <TextInput
                    label="Username"
                    value={username}
                    onChange={setUsername}
                    leftSection={iconUser}
                    required
                />
                <PasswordInput label="Password" id="your-password" leftSection={iconLock} value={password} onChange={setPassword} required />

                <Button color="gray" mt={12} disabled={buttonIdle} onClick={signin} loading={buttonIdle}>Sign in</Button>
            </>
        )
    }

    return (
        <>
            <p className="designHeading">Sign in</p>
            <Title order={1} >SFU Collaborative Learning Platform</Title>
            {signinForm()}
        </>
    )
}