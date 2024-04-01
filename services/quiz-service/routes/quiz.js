/* ----------------------------------- setup ----------------------------------- */
const dotenv = require("dotenv");
dotenv.config();
const admin = require('firebase-admin');
const credentials = require(`../${process.env.FIRESTORE_CONFIG}`)
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})
const db = admin.firestore();

/* -------------------------------- CRUD handlers ------------------------------- */

const createQuiz = async (req, res) => {
    const quiz = req.body;
    if (quiz === undefined || quiz === null || Object.keys(quiz).length === 0) {
        return res.status(400).json({ error: "Could not save quiz due to missing quiz data in request." })
    }

    try {
        const docRef = await db.collection('quizzes').add(quiz);
        return res.status(200).json({ id: docRef.id, data: quiz });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "ERROR: Database query failed." })
    }
};

const getAllQuizzes = async (req, res) => {
    const snapshot = await db.collection('quizzes').get();
    const quizzes = new Array();
    snapshot.forEach(doc => {
        quizzes.push({ id: doc.id, data: doc.data() });
    });
    console.log(quizzes)
    return res.status(200).json(quizzes);
};

const getQuiz = async (req, res) => {
    const docId = req.params.quizId
    if (docId === undefined || docId === null) {
        return res.status(400).json({ error: "Could not get quiz data due to missing quiz ID in request." })
    }

    try {
        const snapshot = await db.collection('quizzes').doc(docId).get();
        if (snapshot.exists) {
            return res.status(200).json({ id: snapshot.id, data: snapshot.data() })
        } else {
            return res.status(404).json({ error: `Quiz with id ${docId} does not exist.` })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "ERROR: Database query failed." })
    }
}

const updateQuiz = async (req, res) => {
    const docId = req.params.quizId
    const quiz = req.body
    if (docId === undefined || docId === null || quiz === undefined || Object.keys(quiz).length === 0) {
        return res.status(400).json({ error: "Could not update quiz data due to missing quiz ID or quiz data in request." })
    }

    try {
        await db.collection('quizzes').doc(docId).update(quiz);
        res.status(200).json({ message: `Successfully updated quiz with id ${docId}` })
    } catch (error) {
        console.error(error)
        if (error.code === 5) {
            console.log(`Document with id ${docId} not found.`)
            return res.status(400).json({ error: "Could not update quiz data due to invalid id." })
        }
        return res.status(500).json({ error: "ERROR: Database query failed." })
    }
}


const deleteQuiz = async (req, res) => {
    const docId = req.params.quizId
    if (docId === undefined || docId === null) {
        return res.status(400).json({ error: "Could not delete quiz data due to missing quiz ID in request." })
    }

    try {
        const snapshot = await db.collection('quizzes').doc(docId).get();
        if (snapshot.exists) {
            await db.collection('quizzes').doc(docId).delete();
            return res.status(200).json({ message: `Successfully deleted quiz with id ${docId}` })
        } else {
            return res.status(404).json({ error: "Could not delete quiz data due to invalid id." })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "ERROR: Database query failed." })
    }
}

module.exports = { createQuiz, getAllQuizzes, getQuiz, updateQuiz, deleteQuiz };