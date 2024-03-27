/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firestoreController");

/* -------------------------------- endpoints ------------------------------- */
router.get("/", (req, res) => {
    res.send("Quiz service is running");
});

router.post("/create", async (req, res) => {
    data = {
        type: "shortAnswer",
    }

    await firebaseController.createQuiz(data);
    res.send("Creating a quiz");
});

module.exports = router;