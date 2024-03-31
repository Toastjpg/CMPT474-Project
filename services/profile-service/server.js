const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

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

// Get profile information
app.get("/api/profile/:id", async (req, res) => {
    const id = req.params.id

    if (id === undefined || id === null) {
        return res.status(400).json({ error: "ERROR: Invalid ID" })
    }

    try {
        // TODO Make db query here
        // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document

        return res.status(200).json({ message: `Getting profile data for user with id: ${id}` })
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ error: "ERROR: DB query to get failed." })
    }
})

// Add or edit profile data
app.put("/api/profile/", async (req, res) => {
    const id = req.body.id
    const content = req.body.content

    try {
        // TODO make DB query here
        //https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document

        res.status(200).json({ message: `Creating/Updating profile data for user with id: ${id}` })
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({ error: "ERROR: DB query to create/update failed." })
    }
})

app.listen(PORT, "0.0.0.0", () => {
    console.log("PROFILE SERVICE: running on port 8080");
})
