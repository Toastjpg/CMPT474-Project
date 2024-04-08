/* ----------------------------------- setup ----------------------------------- */
const dotenv = require("dotenv");
dotenv.config();
const { Storage } = require('@google-cloud/storage')
const { v4: uuidv4 } = require('uuid');

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: `keys/${process.env.GCS_KEY_FILENAME}`,
})
const bucket = storage.bucket(process.env.BUCKET_NAME)
const MEDIA_BASE_URL = `http://${process.env.LOADBALANCER_IP}` || `https://storage.googleapis.com/${bucket.name}`


/* -------------------------------- CRUD handlers ------------------------------- */

const uploadFilesBase64 = async (req, res) => {
    try {
        if (!req.body || !req.body.files) { // Check for images in request body
            console.log("No images found in request.");
            return res.status(400).json({ error: "Missing images data" });
        }

        const uploadPromises = new Array();
        let count = 0;

        req.body.files.forEach(async (base64String) => {
            console.log(base64String)
            try {
                // Extract image details from Base64 string
                const parts = base64String.split(',');
                const contentType = parts[0].split(':')[1].trim(); // Extract content type (e.g., "image/png")
                const base64Data = parts[1];

                // Generate a unique filename with extension based on content type
                const filename = `${uuidv4()}.${contentType.split('/')[1]}`;
                const blob = bucket.file(filename);
                const blobStream = blob.createWriteStream();

                uploadPromises.push(new Promise((resolve, reject) => {
                    blobStream.on("finish", () => {
                        console.log("Uploaded image:", filename);
                        count++;
                        resolve();
                    });
                    blobStream.on("error", () => reject());
                }));

                // Write Base64 data to the stream
                blobStream.write(base64Data, 'base64'); // Specify base64 encoding
                blobStream.end();
            } catch (error) {
                console.error("Error uploading image:", error);
                // Handle individual upload errors (optional)
            }
        });

        await Promise.all(uploadPromises);
        console.log(`Uploaded ${count} images.`);
        return res.status(200).json({ message: `Uploaded ${count} images.` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "ERROR: Cloud Storage Access Failed" });
    }
}

const uploadFiles = async (req, res) => {
    try {
        if (!req.files) {
            console.log("Received 0 files.")
            return res.status(200).json("Uploaded 0 files.")
        }

        const uploadPromises = new Array()
        let count = 0

        req.files.forEach(file => {
            console.log(file)
            const blob = bucket.file(`${uuidv4()}_${file.originalname}`);
            const blobStream = blob.createWriteStream();

            uploadPromises.push(new Promise((resolve, reject) => {
                blobStream.on("finish", () => {
                    console.log("Upload completed: " + file.originalname)
                    count++
                    resolve()
                });
                blobStream.on("error", () => reject())
            }))

            blobStream.end(file.buffer);
        })

        await Promise.all(uploadPromises)
        console.log(`Uploaded ${count} files.`)
        return res.status(200).json({ message: `Uploaded ${count} files.` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "ERROR: Cloud Storage Access Failed" })
    }
};

const getAllFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles()
        const fileInfo = new Array()
        files.forEach(file => {
            fileInfo.push({
                name: file.name,
                url: `${MEDIA_BASE_URL}/${file.name}`,
                type: file.metadata.contentType
            })
        })
        return res.status(200).json(fileInfo);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "ERROR: Cloud Storage Access Failed" })
    }
};


// const deleteFile = async (req, res) => {
// }

module.exports = { uploadFiles, getAllFiles, uploadFilesBase64 };