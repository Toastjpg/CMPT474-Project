import { Post } from "../models/post";

const portNumber: number = 3000;
const serverUrl: string = `http://localhost:${portNumber}`;

export const serverController: any = {

    getPosts: async function () {
        return fetch("https://post-service-cqiosuewjq-uc.a.run.app/api/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return data;
            })
            .catch(error => console.log(error));
    },

    savePost: async function (post: any) {
        return fetch(`https://post-service-cqiosuewjq-uc.a.run.app/api/posts`, {
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

    authRequest: async function (email: string, code: string) {
        return fetch(`${serverUrl}/auth_request/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, code: code })
        })
            .then(response => response.status)
            .catch(error => console.log(error));
    },

    createAccount: async function (email: string, username: string, password: string) {
        return fetch(`${serverUrl}/create_account/`, {
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