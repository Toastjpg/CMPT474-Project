import { TextInput, Button, Title } from "@mantine/core"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount, isUniqueEmail } from "../controllers/account.controller";
import { registerEmailAuthenticatoin, verifyEmailAuthenticatoin } from "../controllers/authentication.controller";
import { useFirebaseAuth } from "../contexts/FirebaseAuthContext";

export function SignupPage() {
    enum Display {
        EMAIL_FORM, AUTH_CODE_FORM, ACCOUNT_SETUP_FORM
    }
    const [display, setDisplay] = useState(Display.EMAIL_FORM)
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [buttonIdle, setButtonIdle] = useState(false)
    const { firebaseSignUp } = useFirebaseAuth();

    let navigate = useNavigate();

    useEffect(() => {
        setButtonIdle(false)
    }, [display])

    async function registerEmail() {
        setButtonIdle(true)
        const isUnique = await isUniqueEmail(email)
        if(!isUnique) {
            setButtonIdle(false)
            alert("This email is used by an existing account. Please enter another email.")
            return
        }
        const response = await registerEmailAuthenticatoin(email)
        const data = await response.json()
        if(response.ok) {
            setDisplay(Display.AUTH_CODE_FORM)
            return
        }
        setButtonIdle(false)
        alert(data)
    }

    async function verifyEmail() {
        setButtonIdle(true)
        const response = await verifyEmailAuthenticatoin(email, authCode)
        const data = await response.json()
        if(response.ok) {
            setDisplay(Display.ACCOUNT_SETUP_FORM)
            return
        }
        setButtonIdle(false)
        alert(data)
    }

    // NOTE: SIGN UP flow here w/ firebase auth
    // TODO: cleanup *LATER*
    async function signup() {
        setButtonIdle(true)

        try {
            const userCredential = await firebaseSignUp(email, password)
            console.log(userCredential)

            // store successful userCredential token in session storage
            const user = userCredential.user

            if(user === null) {
                throw new Error("Failed to create user")
            }

            // TODO get token & make request to create a user in the backend
            // const response = await createAccount(username, email, password)
            // const data = await response.json()
            // if(response.ok) {
            //     navigate("/homepage");
            //     return
            // }
        } catch (e: any) {
            setButtonIdle(false)
            alert(e.message)
        }
    }

    const emailForm = () => {
        return(
            <>
            <TextInput
                label="SFU Email"
                placeholder="example@sfu.ca"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Button color="gray" disabled={buttonIdle} onClick={registerEmail} className={buttonIdle ? "spin" : ''}>
                {buttonIdle && <span className="material-symbols-outlined">progress_activity</span>}
                {!buttonIdle && "Send authentication code"}
            </Button>
            </>
        )
    }
    const authCodeForm = () => {
        return(
            <>
            <div className="navigation">
                <span className="material-symbols-outlined" onClick={() => setDisplay(Display.EMAIL_FORM)}>arrow_circle_left</span>
            </div>
            <TextInput
                label="Authentication Code"
                value={authCode}
                onChange={(event) => setAuthCode(event.currentTarget.value)}
            />
            <Button color="gray" disabled={buttonIdle} onClick={verifyEmail} className={buttonIdle ? "spin" : ''}>
                {buttonIdle && <span className="material-symbols-outlined">progress_activity</span>}
                {!buttonIdle && "Verify email"}
            </Button>
            </>
        )
    }

    const accountSetupForm = () => {
        return (
            <>
            <div className="navigation">
                <span className="material-symbols-outlined" onClick={() => setDisplay(Display.EMAIL_FORM)}>arrow_circle_left</span>
            </div>
            <TextInput
                label="SFU Email"
                disabled
                value={email}
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
                placeholder="eXaMpLePaSsWoRd123!"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />
            
            <Button color="gray" onClick={signup}>Sign up</Button>
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