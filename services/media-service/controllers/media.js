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

/* ------------------------------- middleware ------------------------------- */

/* -------------------------------- CRUD handlers ------------------------------- */

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

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            console.log("Received 0 files.")
            return res.status(200).json("Uploaded 0 files.")
        }

        console.log("request headers: " + req.headers);
        console.log("request params: " + req.params);
        console.log("request body: " + req.body);

        const blob = bucket.file(`${uuidv4()}_${req.file.originalname}`);
        const blobStream = blob.createWriteStream();

        blobStream.on("finish", () => {
            console.log("Upload completed: " + req.file.originalname)
            return res.status(200).json({ message: `Uploaded ${req.file.originalname}` })
        });

        blobStream.on("error", () => {
            console.error("Upload failed: " + req.file.originalname)
            return res.status(500).json({ error: "ERROR: Cloud Storage Access Failed" })
        })

        blobStream.end(req.file.buffer);
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

module.exports = { uploadFiles, uploadFile, getAllFiles };