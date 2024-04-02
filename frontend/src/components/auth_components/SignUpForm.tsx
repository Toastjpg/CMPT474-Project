import { TextInput, Button, Title, PasswordInput, rem } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUniqueEmail } from "../../controllers/account.controller";
// import { createAccount } from "../../controllers/account.controller";
import { registerEmailAuthenticatoin, verifyEmailAuthenticatoin } from "../../controllers/authentication.controller";
import { useFirebaseAuth } from "../../contexts/FirebaseAuthContext";
import { UserCredential } from "firebase/auth";
// import { useInputState } from "@mantine/hooks";
import { IconLock, IconUser, IconMail } from '@tabler/icons-react';

export function SignUpForm() {
    enum Display {
        EMAIL_FORM, AUTH_CODE_FORM, ACCOUNT_SETUP_FORM
    }
    const [display, setDisplay] = useState(Display.EMAIL_FORM)
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setloading] = useState(false)
    const { firebaseSignUp } = useFirebaseAuth();
    let navigate = useNavigate();

    useEffect(() => {
        setloading(false)
    }, [display])

    async function registerEmail() {
        setloading(true)
        const isUnique = await isUniqueEmail(email)
        if (!isUnique) {
            setloading(false)
            alert("This email is used by an existing account. Please enter another email.")
            return
        }
        const response = await registerEmailAuthenticatoin(email)
        const data = await response.json()
        if (response.ok) {
            setDisplay(Display.AUTH_CODE_FORM)
            return
        }
        setloading(false)
        alert(data)
    }

    async function verifyEmail() {
        setloading(true)
        const response = await verifyEmailAuthenticatoin(email, authCode)
        const data = await response.json()
        if (response.ok) {
            setDisplay(Display.ACCOUNT_SETUP_FORM)
            return
        }
        setloading(false)
        alert(data)
    }

    async function signup() {
        setloading(true)

        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match")
            }

            const userCredential: UserCredential = await firebaseSignUp(email, password)

            // NOTE: make call to backend to create account (for unique email logging) (or use firebase)
            // const response = await createAccount(username, email, password)

            const user = userCredential.user
            const jwt = await user.getIdToken()
            sessionStorage.setItem("token", jwt)
            setloading(false)
            navigate("/")
        } catch (e: any) {
            setloading(false)
            alert(e.message)
        }
    }

    const emailForm = () => {
        return (
            <>
                <TextInput
                    label="SFU Email"
                    placeholder="example@sfu.ca"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button color="gray" mt={12} onClick={registerEmail} loading={loading}>Send authentication code</Button>
            </>
        )
    }

    const authCodeForm = () => {
        return (
            <>
                <div className="navigation">
                    <span className="material-symbols-outlined" onClick={() => setDisplay(Display.EMAIL_FORM)}>arrow_circle_left</span>
                </div>
                <TextInput
                    label="Authentication Code"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    required
                />
                <Button color="gray" mt={12} onClick={verifyEmail} loading={loading}>Verify email</Button>
            </>
        )
    }

    const accountSetupForm = () => {
        const iconUser = <IconUser style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        const iconLock = <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        const iconMail = <IconMail style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        return (
            <>
                <div className="navigation">
                    <span className="material-symbols-outlined" onClick={() => setDisplay(Display.EMAIL_FORM)}>arrow_circle_left</span>
                </div>
                <TextInput
                    label="SFU Email"
                    disabled
                    value={email}
                    leftSection={iconMail}
                    required
                />
                <TextInput
                    label="Username"
                    value={username}
                    required
                    leftSection={iconUser}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordInput label="Password" leftSection={iconLock} value={password} onChange={(e) => setPassword(e.target.value)} required />
                <PasswordInput label="Confirm Password" leftSection={iconLock} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

                <Button color="gray" mt={12} onClick={signup} loading={loading}>Sign up</Button>
            </>
        )
    }

    return (
        <>
            <p className="designHeading">Sign up</p>
            <Title order={1} >SFU Collaborative Learning Platform</Title>
            {display === Display.EMAIL_FORM && emailForm()}
            {display === Display.AUTH_CODE_FORM && authCodeForm()}
            {display === Display.ACCOUNT_SETUP_FORM && accountSetupForm()}
        </>
    )
}