import { Title, TextInput, Button, Center, Box, Flex } from "@mantine/core"
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

                    <Center>
                        <Title order={1} >Sign In</Title>
                    </Center>
                    
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

                    <Button color="gray" onClick={handleSignIn}>
                        Sign In
                    </Button>

                    <hr />

                    <Button color="gray" onClick={handleRegister}>
                        Don't have an account? Sign up
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}