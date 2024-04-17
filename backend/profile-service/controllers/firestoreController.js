const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');
dotenv.config();

// const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;

let firebaseApp;
let firestoreDatabase;

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

    getById: async (id) => {
        const docRef = firestoreDatabase.collection('profiles').doc(id)
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error("Document does not exist!")
        } else {
            return doc.data()
        }
    },

    updateById: async (id, content) => {
        // Will edit or create new document
        const docRef = firestoreDatabase.collection('profiles').doc(id)
        docRef.set(content)

        return docRef.id
    }
}

module.exports = firebaseController