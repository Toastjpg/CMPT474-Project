const gatewayURL = `https://api-gateway-container-zr4kfxliwa-uc.a.run.app`;

// TODO: encod password for security
export const createAccount = async (username: string, email: string, password: string) => {
    return await fetch(`${gatewayURL}/account`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
}
export const isUniqueEmail = async (email: string) => {
    const response = await fetch(`${gatewayURL}/account/check-unique/email/${email}`, {
        method: "GET",
        mode: 'cors',
    })
    const unique = await response.json()
    return unique
}
export const deleteAccount = async (username: string) => {
    return await fetch(`${gatewayURL}/account`, {
        method: "DELETE",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    })
}