/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const router = express.Router();
const firebaseController = require("../controllers/firestoreController");
const { generateAuthCode, generateEmail } = require("../utilities/authcodeGenerator");

/* -------------------------------- endpoints ------------------------------- */
router.get("/", (req, res) => {
    res.send("Email service is running");
});

router.post("/register", async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(500).json("EMAIL SERVICE ERROR: Missing email in request body");
    }

    const code = generateAuthCode();
    const subject = "Welcome to SFU Connect! Email Verification Code"
    const content = `Your email verification code is: ${code}`

    try {
        await firebaseController.registerEmail(email, code);
        await generateEmail(email, subject, content);
        return res.status(200).json("EMAIL SERVICE: Email sent successfully");
    } catch (e) {
        console.warn(e);
        return res.status(500).json("EMAIL SERVICE ERROR: Databse query failed");
    }
});

router.get("/authorize", async (req, res) => {
    const email = req.body.email;
    const authCode = req.body.authCode;

    try {
        const isAuthorized = await firebaseController.authorizeEmail(email, authCode);
        if (isAuthorized) {
            return res.status(200).json("EMAIL SERVICE: Authorization successful");
            await firebaseController.deleteEmail(email);
        } else {
            return res.status(401).json("EMAIL SERVICE: Authorization failed");
        }
    } catch (e) {
        console.warn(e);
        return res.status(500).json("EMAIL SERVICE ERROR: Authorization failed");
    }
});

module.exports = router;