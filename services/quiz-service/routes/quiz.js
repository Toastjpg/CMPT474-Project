/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firestoreController");

/* -------------------------------- endpoints ------------------------------- */
router.get("/", (req, res) => {
    res.send("Quiz service is running");
});

router.get("/create", async (req, res) => {
    await firebaseController.createQuiz();
    res.send("Creating a quiz");
});

module.exports = router;