// const gatewayURL = import.meta.env.VITE_GATEWAY_URL;
const gatewayURL = "http://localhost:8080/api";

export const uploadFiles = async (files: Array<File>) => {

  const base64Strings = await Promise.all(
    files.map(async (file) => {
      const reader = new FileReader();
      const result: string = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      return result.split(',')[1]; // Extract Base64 data from Data URL
    })
  );
  const jsonBody = JSON.stringify({ files: base64Strings });

  console.log(jsonBody);

  // const formData = new FormData();
  // files.forEach((file) => {
  //   formData.append(file.name, file);
  // });
  return await fetch(`${gatewayURL}/files`, {
    method: "POST",
    mode: "cors",
    body: jsonBody,
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
