import { Center, Box, Flex } from "@mantine/core"

export function LoginPage() {
    return (
        <Center style={{ height: '100vh' }}>
            <Box style={{ width: 400 }}>
                <Flex direction="column" gap="md">
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button style={{ cursor: 'pointer' }}>Sign In</button>

                    <hr />
                    
                    <button style={{ cursor: 'pointer' }}>Don't have an account? Sign Up</button>
                </Flex>
            </Box>
        </Center>
    );
}