import { Title, TextInput, Button } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerEmailAuthenticatoin } from "../controllers/authentication.controller";

export function SigninPage() {
    const [email] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [buttonIdle, setButtonIdle] = useState(false)
    let navigate = useNavigate();

    async function signin() {
        console.log(`Signing in with email: ${email}`);
        const response = await registerEmailAuthenticatoin(email)
        const data = await response.json()
        if(response.ok) {
            navigate("/authpage", { state: { data: email } })
            return
        }
        alert(data)
    }

    // function redirectToSignupPage() {
    //     navigate("/registerpage");
    // }

    const signinForm = () => {
        return (
            <>
            <TextInput
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <TextInput
                label="Password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />
            
            <Button color="gray" onClick={signin}>Sign in</Button>
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