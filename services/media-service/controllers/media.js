/* ----------------------------------- setup ----------------------------------- */
const dotenv = require("dotenv");
dotenv.config();


/* -------------------------------- CRUD handlers ------------------------------- */

const uploadFiles = async (req, res) => {
    // const quiz = req.body;
    // if(quiz === undefined || quiz === null || Object.keys(quiz).length === 0) {
    //     return res.status(400).json("Could not save quiz due to missing quiz data in request.")
    // }

    try {
        // const docRef = await db.collection('quizzes').add(quiz);
        return res.status(200).json("uploadFiles: to be implemented");
    }catch(error) {
        console.error(error)
        return res.status(500).json("ERROR: Cloud Storage Access Failed")
    }
};

const getAllFiles = async (req, res) => {
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