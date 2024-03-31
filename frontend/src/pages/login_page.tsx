import { Title, TextInput, Button, PasswordInput, rem } from "@mantine/core"
import { IconLock, IconUser } from '@tabler/icons-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useInputState } from "@mantine/hooks";
import { signinUser } from "../controllers/account.controller";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useInputState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    const { firebaseSignIn } = useFirebaseAuth();

    let navigate = useNavigate();

    async function signin() {

        setButtonIdle(true)

        try {
            const userCredential = await firebaseSignIn(email, password)
            console.log(userCredential.user)

            const user = userCredential.user
            const jwt = await user.getIdToken()
            sessionStorage.setItem("token", jwt)

            navigate("/homepage")
        } catch (e: any) {
            setButtonIdle(false)
            alert(e.message)
        }
    }

    const signinForm = () => {
        const iconUser = <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        const iconLock = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />

        return (
            <>
                {/* NOTE: Changed Username to Email */}
                <TextInput
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    leftSection={iconUser}
                    required
                />
                <PasswordInput label="Password" id="your-password" leftSection={iconLock} value={password} 
                    onChange={(event) => setPassword(event.currentTarget.value)} required />
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