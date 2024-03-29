const gatewayURL = `https://api-gateway-container-zr4kfxliwa-uc.a.run.app`;

export const registerEmailAuthenticatoin = async (email: string) => {
    return await fetch(`${gatewayURL}/register`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    })
}

export const verifyEmailAuthenticatoin = async (email: string, code: string) => {
    return await fetch(`${gatewayURL}/authorize`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, authCode: code })
    })
}