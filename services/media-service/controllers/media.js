/* ----------------------------------- setup ----------------------------------- */
const dotenv = require("dotenv");
dotenv.config();
// const { Storage } = require('@google-cloud/storage')


// const storage = new Storage({ 
//     projectId: PROJECT_ID,
//     keyFilename: GCS_KEY_FILENAME,
// })
// const bucket = storage.bucket(BUCKET_NAME)


/* -------------------------------- CRUD handlers ------------------------------- */

const uploadFiles = async (req, res) => {
    try {
        if(!req.files) {
            console.log("Missing file data.")
            return res.status(400).json("Could not perform upload due to missing file data.")
        }
        console.log(req.files)
        req.files.forEach(file => {
            console.log(file)
        })

        // const blob = bucket.file()
    // const quiz = req.body;
    // if(quiz === undefined || quiz === null || Object.keys(quiz).length === 0) {
    //     return res.status(400).json("Could not save quiz due to missing quiz data in request.")
    // }

        // const docRef = await db.collection('quizzes').add(quiz);
        return res.status(200).json("uploadFiles: to be implemented");
    }catch(error) {
        console.error(error)
        return res.status(500).json("ERROR: Cloud Storage Access Failed")
    }
};

const getAllFiles = async (req, res) => {
    const [files] = await bucket.getFiles()
    files.forEach(file => {
        fileInfo.push({
            name: file.name,
            url: file.metadata.mediaLink,
            type: file.metadata.contentType
        })
    })
    console.log(fileInfo)
    // const snapshot = await db.collection('quizzes').get();
    // const quizzes = new Array();
    // snapshot.forEach(doc => {
    //     quizzes.push({ id: doc.id, data: doc.data() });
    // });
    // console.log(quizzes)
    return res.status(200).json("getAllFiles: to be implemented");
};


// const deleteFile = async (req, res) => {
//     const docId = req.params.quizId
//     if(docId === undefined || docId === null) {
//         return res.status(400).json("Could not delete quiz data due to missing quiz ID in request.")
//     }

//     try {
//         const snapshot = await db.collection('quizzes').doc(docId).get();
//         if(snapshot.exists) {
//             await db.collection('quizzes').doc(docId).delete();
//             return res.status(200).json(`Successfully deleted quiz with id ${docId}`)
//         }else {
//             return res.status(404).json(`Could not delete quiz data due to invalid id.`)
//         }
//     }catch(error) {
//         console.error(error)
//         return res.status(500).json("ERROR: Cloud Storage Access Failed")
//     }
// }

module.exports =  { uploadFiles, getAllFiles };