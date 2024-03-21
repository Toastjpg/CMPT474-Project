import { Title, TextInput, Button } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signinUser } from "../controllers/account.controller";

export function SigninPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    let navigate = useNavigate();

    async function signin() {
        setButtonIdle(true)
        const response = await signinUser(username, password) // signinUser not implemented yet!!!
        const data = await response.json()
        if(response.ok) {
            navigate("/homepage" )
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

    return (
        <>
        <p className="designHeading">Sign in</p>
        <Title order={1} >SFU Collaborative Learning Platform</Title>
        {signinForm()}
        </>
    )
}