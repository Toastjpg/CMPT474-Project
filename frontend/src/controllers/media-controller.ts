const gatewayURL = import.meta.env.VITE_GATEWAY_URL;

export const uploadFiles = async (files: Array<File>) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append(file.name, file);
  });
  return await fetch(`${gatewayURL}/files`, {
    method: "POST",
    mode: "cors",
    body: formData,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
};

export const getAllFiles = async () => {
  return await fetch(`${gatewayURL}/files`, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
};
