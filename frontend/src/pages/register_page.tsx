import { Center, Box, Flex, Title, Text, TextInput, Button, Anchor } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverController } from "../controllers/server_controller";

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate();

    async function handleSignUp() {
        console.log(`Registering with username: ${username} and password: ${password}`);

        serverController.createAccount(email, username, password)
            .then((response: any) => {
                if (response.status === 200) {
                    console.log("Account created");
                    navigate("/homepage");
                }
                else {
                    alert("Account creation failed");
                    console.log("Account creation failed");
                    // TODO: handle error in form
                }
            })
            .catch((error: any) => { 
                console.log(error) 
                alert("Account creation request failed due to internal server error.");
            });
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">

                    <Center>
                        <Title order={1} >Sign Up</Title>
                    </Center>

                    <TextInput
                        label="SFU Email"
                        placeholder="example@sfu.ca"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />

                    <TextInput
                        label="Username"
                        placeholder="edampleusername"
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

                    <Text size="xs">
                        <Flex gap={"xs"}>
                            <Text>Already have an account? </Text>
                            <Anchor href="/loginpage">Sign In</Anchor>
                        </Flex>
                    </Text>

                    <Button color="gray" onClick={handleSignUp}>
                        Register your account
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}