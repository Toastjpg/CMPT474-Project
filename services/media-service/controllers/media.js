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


/* -------------------------------- CRUD handlers ------------------------------- */

const uploadFiles = async (req, res) => {
    try {
        if(!req.files) {
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
        return res.status(200).json(`Uploaded ${count} files.`)
    }catch(error) {
        console.error(error)
        return res.status(500).json("ERROR: Cloud Storage Access Failed")
    }
};

const getAllFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles()
        const fileInfo = new Array()
        files.forEach(file => {
            fileInfo.push({
                name: file.name,
                url: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
                type: file.metadata.contentType
            })
        })
        return res.status(200).json(fileInfo);
    }catch(error) {
        console.error(error)
        return res.status(500).json("ERROR: Cloud Storage Access Failed")
    }
};


// const deleteFile = async (req, res) => {
// }

module.exports =  { uploadFiles, getAllFiles };