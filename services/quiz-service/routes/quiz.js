/* ----------------------------------- setup ----------------------------------- */
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();
const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;

let firebaseApp;
let db;

try {
    if (firebaseConfig != "CLOUD") {
        const serviceAccount = require(`../${firebaseConfig}`);

        firebaseApp = initializeApp({
            credential: cert(serviceAccount)
        });
        console.log("Connected to Firebase Firestore locally with firebase configuration file");
    }
    else {
        firebaseApp = initializeApp();
        console.log("Connected to Firebase Firestore over cloud configuration");
    }
}
catch (error) {
    console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance\nAre you running locally or over the cloud?");
    throw error;
}

// https://stackoverflow.com/questions/77061688/how-can-i-connect-to-a-non-default-firestore-database-using-node-using-multiple
// try connecting to the firestore database defined in the environment variables
try {
    db = getFirestore(firebaseApp, firestoreId);
    console.log(`Connected to Firestore Database: ${firestoreId}`);
}
catch (error) {
    console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Database\nIs the Firestore Database ID correct?");
    throw error;
}

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