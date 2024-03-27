const firebaseAdmin = require('firebase-admin');
const dotenv  = require('dotenv');
const { cert } = require('firebase-admin/app');

dotenv.config();

let firebaseApp;
const firebaseConfig = process.env.FIREBASE_CONFIG;
const firestoreId = process.env.FIRESTORE_DB_ID;

const firebaseController = {
    initialize: () => {
        try {
            if (firebaseConfig != "CLOUD"){
                const serviceAccount = require(`../${firebaseConfig}`);

                firebaseApp = firebaseAdmin.initializeApp({
                    credential: cert(serviceAccount),
                });
                console.log("Connected to Firebase Firestore locally with firebase configuration file")
            }
            else {
                try {
                    firebaseApp = firebaseAdmin.initializeApp();
                }
                catch (error) {
                    console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance over Google Cloud, are you running your instance locally?");
                    throw error;
                }
                console.log("Connected to Firebase Firestore over cloud configuration")
            }
        }
        catch (error) {
            console.log("\x1b[31m", "ERROR: Unable to connect to Firestore Instance, did you include your Firestore key in the keys folder?");
            throw error;
        }
    }
}

module.exports = firebaseController;