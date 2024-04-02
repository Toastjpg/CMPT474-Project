const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config();
const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;
const collectionName = 'authCodes';

let firebaseApp;
let firestoreDatabase;

const firebaseController = {
    initialize: () => {
        // initialize the firebase app
        try {
            if (firebaseConfig !== "CLOUD") {
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

    registerEmail: async (email, code) => {
        try {
            const docRef = collection(firestoreDatabase, collectionName, email);
            await setDoc(docRef, { code: code });
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to register email in Firestore Database");
            throw error;
        }
    },

    authorizeEmail: async (email, authCode) => {
        try {
            const docRef = collection(firestoreDatabase, collectionName, email);
            const doc = await getDoc(docRef);

            if (doc.exists()) {
                const data = doc.data();
                if (data.code === authCode) {
                    return true;
                } else {
                    throw new Error("Authorization code does not match");
                }
            } else {
                throw new Error("Email not found in Firestore Database");
            }
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to authorize email in Firestore Database");
            throw error;
        }
    },

    deleteEmail: async (email) => {
        try {
            const docRef = collection(firestoreDatabase, collectionName, email);
            await deleteDoc(docRef);
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to delete email in Firestore Database");
            throw error;
        }
    }
}

module.exports = firebaseController;