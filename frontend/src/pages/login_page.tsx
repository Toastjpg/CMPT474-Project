import { Title, TextInput, Button } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signinUser } from "../controllers/account.controller";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    const { firebaseSignIn } = useFirebaseAuth();
    
    let navigate = useNavigate();

    // NOTE: SIGN IN flow for firebase auth
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
        return (
            <>
            {/* NOTE: Changed Username to Email */}
            <TextInput
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <TextInput
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Button color="gray" disabled={buttonIdle} onClick={signin} className={buttonIdle ? "spin" : ''}>Sign in</Button>
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