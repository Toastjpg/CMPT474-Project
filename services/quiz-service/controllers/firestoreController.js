const firebaseAdmin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

let firebaseApp;
let firestoreDatabase;

const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;

const Collections = {
    SHORT_ANSWER: "shortAnswer",
    MULTIPLE_CHOICE: "multipleChoice",
    MULTIPLE_ANSWER: "multipleAnswer",
    TRUE_FALSE: "trueFalse"
}

const firebaseController = {
    initializeConnection: () => {
        // initialize the firebase app
        try {
            if (firebaseConfig != "CLOUD") {
                const serviceAccount = require(`../${firebaseConfig}`);

                firebaseApp = firebaseAdmin.initializeApp({
                    credential: firebaseAdmin.credential.cert(serviceAccount)
                });
                console.log("Connected to Firebase Firestore locally with firebase configuration file")
            }
            else {
                firebaseApp = firebaseAdmin.initializeApp();
                console.log("Connected to Firebase Firestore over cloud configuration")
            }
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance\nAre you running locally or over the cloud?");
            throw error;
        }

        // https://stackoverflow.com/questions/77061688/how-can-i-connect-to-a-non-default-firestore-database-using-node-using-multiple
        // try connecting to the firestore database defined in the environment variables
        // currently, firestore is connecting to the default database.
        try {
            //firestoreDatabase = firebaseAdmin.firestore(firebaseApp, firestoreId);
            firestoreDatabase = firebaseAdmin.firestore(firebaseApp);
            console.log(`Connected to Firestore Database: ${firestoreId}`);
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Database\nIs the Firestore Database ID correct?");
            throw error;
        }
    },

}

module.exports = firebaseController;