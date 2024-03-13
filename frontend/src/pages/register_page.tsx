import { Center, Box, Flex } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    function handleSignIn() {
        console.log(`Registering with username: ${username} and password: ${password}`);
        navigate("/homepage");
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">
                    <h1 style={{ textAlign: 'center' }}>Register</h1>

                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />

                    <button 
                        style={{ cursor: 'pointer' }}
                        onClick={handleSignIn}
                    >
                        Sign up!
                    </button>
                </Flex>
            </Box>
        </Center>
    );
}