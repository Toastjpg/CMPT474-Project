import { Center, Box, Flex } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    function handleSignIn() {
        console.log(`Signing in with username: ${username} and password: ${password}`);
        navigate("/homepage");
    }

    function handleRegister() {
        navigate("/registerpage");
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button 
                        style={{ cursor: 'pointer' }}
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>

                    <hr />

                    <button 
                        style={{ cursor: 'pointer' }}
                        onClick={handleRegister}
                    >
                        Don't have an account? Sign Up
                    </button>
                </Flex>
            </Box>
        </Center>
    );
}