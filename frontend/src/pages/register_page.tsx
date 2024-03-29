import { Flex, Text, Anchor } from "@mantine/core"
import { useState } from "react";
import { SignupPage } from "./signup_page";
import { SigninPage } from "./login_page";

export function RegisterPage() {
    const [hasAccount, setHasAccount] = useState(true)
    return (
        <div id="signupPage">
            <section className="cover">
            </section>
            <section>
                <div className="form-container">
                    {hasAccount && <SigninPage />}
                    {!hasAccount && <SignupPage />}
                    <Flex direction={"row"} gap={"xs"}>
                        <Text size="xs">{hasAccount ? "Don't have an account?" : "Already have an account?"}</Text>
                        <Anchor onClick={() => setHasAccount(!hasAccount)} size="xs">{hasAccount ? "Sign Up" : "Sign In"}</Anchor>
                    </Flex>
                </div>
            </section>
        </div>
    );
}