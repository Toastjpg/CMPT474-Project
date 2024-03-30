import { Title, TextInput, Button } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signinUser } from "../controllers/account.controller";

import { useAuth0 } from "@auth0/auth0-react";

export function SigninPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    let navigate = useNavigate();

    // NOTE: SIGN IN flow for firebase auth
    async function signin() {
        setButtonIdle(true)

        // TODO: update the controller call to use firebase auth instead
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

            <Button color="gray" disabled={buttonIdle} onClick={signin} className={buttonIdle ? "spin" : ''}>Sign in</Button>
            </>
        )
    }

    // NOTE: testing
    const auth0Signin = () => {
        const { loginWithRedirect } = useAuth0();

        return (
            <Button color="gray" onClick={() => loginWithRedirect()}>Sign in with Auth0</Button>
        )
    }

    return (
        <>
        <p className="designHeading">Sign in</p>
        <Title order={1} >SFU Collaborative Learning Platform</Title>
        {signinForm()}
        {/* {auth0Signin()} */}
        </>
    )
}