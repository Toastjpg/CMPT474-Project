/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const router = express.Router();

/* -------------------------------- endpoints ------------------------------- */
router.get("/quiz/:id", (req, res) => {
    res.send("QUIZ SERVICE: This is the quiz endpoint");
});


module.exports = router;