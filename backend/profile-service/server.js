const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const firebaseController = require("./controllers/firestoreController")

const app = express();
const PORT = process.env.PORT || 8080

/**
 * Middleware Configurations
 */
app.use(cors());
app.use(express.json());

/**
 * Endpoints
 */

// Patch to fix CORS error from API gateway
// Middleware to handle the preflight requests
// See: https://stackoverflow.com/questions/64281334/cors-errors-when-trying-to-fetch-from-new-google-cloud-api-gateway
app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.send(200);
});


// Get profile information
// Get document fields given profile ID
app.get("/api/profile/:id", async (req, res) => {
    const id = req.params.id

    try {
        const data = await firebaseController.getById(id)
        return res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ error: "ERROR: DB query to get document failed." })
    }
})

// Add or edit profile data
// Overwrites or creates document with fields from the body.content JSON object
app.put("/api/profile/", async (req, res) => {
    const id = req.body.id
    const content = req.body.content

    try {
        const docId = await firebaseController.updateById(id, content)

        res.status(200).json({ message: `Modified document: ${docId}` })
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ error: "ERROR: DB query to create/update failed." })
    }
})

app.listen(PORT, "0.0.0.0", () => {
    console.log("PROFILE SERVICE: running on port 8080")
    firebaseController.initialize()
})
