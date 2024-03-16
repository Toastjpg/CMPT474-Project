const gatewayURL = `https://cmpt474-414403.ue.r.appspot.com/`;

export const serverController: any = {
    
    getPosts: async function() {
        try {
            const response = await fetch(`${gatewayURL}/posts`)
            const data = response.json()
            return data
        }catch(error) {
            throw error
        }
    },

    savePost: async function(post: any) {
        return fetch(`${gatewayURL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    },

    registerAuthRequest: async function (email: string) {
        return fetch(`${gatewayURL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        })
            .then(response => response.status)
            .catch(error => console.log(error));
    },

    authRequest: async function (email: string, code: string) {
        return fetch(`${gatewayURL}/authorize`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, code: code })
        })
            .then(response => response.status)
            .catch(error => console.log(error));
    },

    createAccount: async function (email: string, username: string, password: string) {
        return fetch(`${gatewayURL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, username: username, password: password })
        })
            .then(response => response.status)
            .catch(error => console.log(error));
    }
    
}