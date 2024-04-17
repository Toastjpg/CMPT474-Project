const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();
// const firebaseConfig = process.env.FIREBASE_CONFIG;
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

const quizFactory = {
    createMultipleChoice: async (data) => {
        console.log("Creating a multiple choice question");
    },

    createMultipleSelect: async (data) => {
        console.log("Creating a multiple select question");
    },

    createTrueFalse: async (data) => {
        console.log("Creating a true/false question");
    },

    createFillInBlank: async (data) => {
        console.log("Creating a fill in the blank question");
    },

    createInputNumber: async (data) => {
        console.log("Creating an input number question");
    },

    createShortAnswer: async (data) => {
        console.log("Creating a short answer question");
    },

    createNoAnswer: async (data) => {
        console.log("Creating a question with no answer");
    },
}

const firebaseController = {
    initialize: () => {
        // initialize the firebase app
        try {
            // NOTE: For connections with local firebaseConfig credentials

            // if (firebaseConfig != "CLOUD") {
            //     const serviceAccount = require(`../${firebaseConfig}`);

            //     firebaseApp = initializeApp({
            //         credential: cert(serviceAccount)
            //     });
            //     console.log("Connected to Firebase Firestore locally with firebase configuration file");
            // }
            // else {
            //     firebaseApp = initializeApp();
            //     console.log("Connected to Firebase Firestore over cloud configuration");
            // }

            firebaseApp = initializeApp();
            console.log("Connected to Firebase Firestore over cloud configuration");
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

    createQuiz: async (data) => {
        switch (data.type) {
            case "MULTIPLE_CHOICE":
                await quizFactory.createMultipleChoice(data);
                break;
            case "MULTIPLE_SELECT":
                await firebaseController.createMultipleSelect(data);
                break;
            case "TRUE_FALSE":
                await firebaseController.createTrueFalse(data);
                break;
            case "FILL_IN_BLANK":
                await firebaseController.createFillInBlank(data);
                break;
            case "INPUT_NUMBER":
                await firebaseController.createInputNumber(data);
                break;
            case "SHORT_ANSWER":
                await firebaseController.createShortAnswer(data);
                break;
            case "NO_ANSWER":
                await firebaseController.createNoAnswer(data);
                break;
            default:
                console.log("ERROR: Invalid question type");
        }
    }
}

module.exports = firebaseController;