const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();
const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;

let firebaseApp;
let firestoreDatabase;

const Collections = {
    MULTIPLE_CHOICE: "multipleChoice",
    MULTIPLE_SELECT: "multipleSelect",
    TRUE_FALSE: "trueFalse",
    FILLIN_BLANK: "fillInBlank",
    INPUT_NUMBER: "inputNumber",
    SHORT_ANSWER: "shortAnswer",
    NO_ANSWER: "noAnswer"
}

const firebaseController = {
    initialize: () => {
        // initialize the firebase app
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
            firestoreDatabase = getFirestore(firebaseApp, firestoreId);
            console.log(`Connected to Firestore Database: ${firestoreId}`);
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Database\nIs the Firestore Database ID correct?");
            throw error;
        }
    },

    createQuiz: async (quizData) => {
        const quizRef = firestoreDatabase.collection("shortAnswer").doc();
        const quizId = quizRef.id;
        await quizRef.set({
            id: quizId,
            question: "is this working?",
            answer: "yes, this is working"
        });
        console.log(`Quiz created with ID: ${quizId}`);
    }
}

module.exports = firebaseController;