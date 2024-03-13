const portNumber: number = 3000;
const serverUrl: string = `http://localhost:${portNumber}`;

export const serverController: any = {
    
    /* getRecipes: async function() {
        return fetch(serverUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(error => console.log(error));
    },
    
    saveRecipe: async function(recipe: any) {
        return fetch(`${serverUrl}add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    },

    deleteRecipe: async function(id: string) {
        return fetch(`${serverUrl}delete/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    },

    updateRecipe: async function(recipe: any) {

        console.log("Updating recipe: ", recipe);

        return fetch(`${serverUrl}update/${recipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipe)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    } */

    registerAuthRequest: async function(email: string) {
        return fetch(`${serverUrl}/auth_request/`, {
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