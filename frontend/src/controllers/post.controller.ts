const gatewayURL = import.meta.env.VITE_GATEWAY_URL;

export const getPosts = async (email: string) => {
    // try {
    //     const response = await fetch(`${gatewayURL}/posts`)
    //     const data = response.json()
    //     return data
    // }catch(error) {
    //     throw error
    // }
    return await fetch(`${gatewayURL}/register`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({
            email: email
        })
    })
}
export const savePost = async (email: string, code: string) => {
//     return fetch(`${gatewayURL}/posts`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(post)
//     })
//         .then(response => response.json())
//         .then(data => data)
//         .catch(error => console.log(error));
// }   
    return await fetch(`${gatewayURL}/authorize`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify({ email: email, authCode: code })
    })
}