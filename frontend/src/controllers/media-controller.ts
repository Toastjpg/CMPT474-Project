const gatewayURL = `http://localhost:8080/api`;

export const uploadFiles = async (files: Array<File>) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append(file.name, file);
    })
    return await fetch(`${gatewayURL}/files`, {
        method: "POST",
        mode: 'cors',
        body: formData
    })
}

export const getAllFiles = async () => {
    return await fetch(`${gatewayURL}/files`, {
        method: "GET",
        mode: 'cors',
    })
}