const gatewayURL = `https://cmpt474-414403.ue.r.appspot.com/`;

// IMPORTANT: add implementation to individual controller files and delete this file
// posts operations -> post.controller.ts

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
    }    
}