import { Box, Button, Center, Flex, TextInput, Title, Notification } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { serverController } from "../controllers/server_controller";

export function AuthPage() {
    const [authCode, setAuthCode] = useState('');
    let navigate = useNavigate();
    let location = useLocation();

    function handleAuthorize() {
        console.log(`Authorizing with code: ${authCode}`);

        let email = location.state.data;
        let responseCode: number;
        serverController.authRequest(email, authCode)
            .then((status: any) => {
                console.log("Request status: ", status);
                responseCode = status;

                if (responseCode === 200) {
                    navigate("/homepage");
                }
                else {
                    console.log("Invalid code");
                    alert("Invalid authorization code!");
                }
            })
            .catch((error: any) => {
                console.log("Error: ", error);
            })
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

                    <Button color="gray" onClick={handleAuthorize}>
                        Authorize sign in
                    </Button>
                </Flex>
            </Box>
        </Center>
    );
}