import { Profile } from "../models/profile";

const gatewayURL = import.meta.env.VITE_GATEWAY_URL;

export const getProfileData = async (id: string) => {
    return await fetch(`${gatewayURL}/profile/${id}`, {
        method: "GET",
        mode: 'cors',
    })
}

export const updateProfileData = async (id: string, profile: Profile) => {
    return await fetch(`${gatewayURL}/profile`, {
        method: "GET",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            content: profile
        })
    })
}