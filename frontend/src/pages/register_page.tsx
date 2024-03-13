import { Center, Box, Flex, Title, TextInput, Button } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate();

    function handleSignIn() {
        console.log(`Registering with username: ${username} and password: ${password}`);
        navigate("/homepage");
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">

                    <Center>
                        <Title order={1} >Sign Up</Title>
                    </Center>
                    
                    <TextInput 
                        label="Email Address"
                        placeholder="example@email.ca" 
                        value={username}
                        onChange={(event) => setUsername(event.currentTarget.value)}
                    />

                    <TextInput 
                        label="Password"
                        placeholder="eXaMpLePaSsWoRd123!" 
                        value={password}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />

                    <TextInput
                        label="Confirm Password"
                        placeholder="eXaMpLe"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                    />

                    <Button color="gray" onClick={handleSignIn}>
                        Register your account
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}