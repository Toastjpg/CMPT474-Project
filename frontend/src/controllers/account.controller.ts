const gatewayURL = import.meta.env.VITE_GATEWAY_URL;

// NOTE: following controllers are deprecated via introduction of firebase auth
export const createAccount = async (username: string, email: string, password: string) => {
    return await fetch(`${gatewayURL}/account`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
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
export const signinUser = async (username: string, password: string) => {
    // attache session info with login credentials
    // expect server to return true if signin success else false
    // DO NOT add info in paramter or url! use SESSIONS
    const response = await fetch(`${gatewayURL}/account/signin`, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    const signinStatus = await response.json()
    return signinStatus
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