import { Title, TextInput, Button, Center, Box, Flex } from "@mantine/core"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { serverController } from "../controllers/server_controller";

export function LoginPage() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    async function handleSignIn() {
        console.log(`Signing in with username: ${email}`);

        let responseCode: number;
        await serverController.registerAuthRequest(email)
            .then((status: any) => {
                console.log("Request status: ", status);
                responseCode = status;
            });
        
        navigate("/authpage", { state: { data: email } });
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
                        label="SFU Email"
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />

                    <Button color="gray" onClick={handleSignIn}>
                        Request sign in code
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