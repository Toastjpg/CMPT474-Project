import { Box, Button, Center, Flex, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import { serverController } from "../controllers/server_controller";
import { verifyEmailAuthenticatoin } from "../controllers/authentication.controller";

export function AuthPage() {
    const [authCode, setAuthCode] = useState('')
    let navigate = useNavigate();
    let location = useLocation();

    async function verify() {
        console.log(`Verifying authorization code: ${authCode} for ${location.state.data}`);
        const response = await verifyEmailAuthenticatoin(location.state.data, authCode)
        const data = await response.json()
        if(response.ok) {
            navigate("/homepage")
            return
        }
        alert(data)
    }

    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">

                    <Center>
                        <Title order={1}>Authorize</Title>
                    </Center>

                    <TextInput 
                        label="Authorization Code"
                        value={authCode}
                        onChange={(event) => setAuthCode(event.currentTarget.value)}
                    />

                    <Button color="gray" onClick={verify}>
                        Authorize sign in
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}