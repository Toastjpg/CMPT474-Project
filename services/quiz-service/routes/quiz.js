/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firestoreController");

/* -------------------------------- endpoints ------------------------------- */
router.get("/", (req, res) => {
    res.send("Quiz service is running");
    firebaseController.initialize();
});

module.exports = router;