const portNumber: number = 3000;
const serverUrl: string = `http://localhost:${portNumber}`;

export const serverController: any = {
    
    getPosts: async function() {
        return fetch(`${serverUrl}/posts`)
            .then(response => response)
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => console.log(error));
    },

    savePost: async function(post: any) {
        return fetch(`${}/posts`, {
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


    // auth
    registerAuthRequest: async function(email: string) {
        return fetch(`${serverUrl}/auth_request`, {
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

    authRequest: async function(email: string, code: string) {
        return fetch(`${serverUrl}/auth_request/`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, code: code })
        })
        .then(response => response.status)
        .catch(error => console.log(error));
    }



    
}