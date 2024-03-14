const postURL: string = `https://post-service-container-2nmgx5zaoa-uw.a.run.app/api`;
const authURL: string = `https://auth-service-container-2nmgx5zaoa-uw.a.run.app`;
const userURL: string = `https://user-service-container-2nmgx5zaoa-uw.a.run.app/api`;

export const serverController: any = {
    
    getPosts: async function() {
        return fetch(`${postURL}/posts`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => console.log(error));
    },

    savePost: async function(post: any) {
        return fetch(`${postURL}/posts`, {
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
        return fetch(`${authURL}/register_auth_request`, {
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
        return fetch(`${authURL}/auth_request`, {
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
        return fetch(`${userURL}/account`, {
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