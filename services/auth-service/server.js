const express = require("express");
const cors = require("cors");
const mailService = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const authCode = require("./utils/authcode");
const { pgdb } = require("./models/db"); //TODO replace with firestore controller functions

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * Middleware Configurations
 */
app.use(cors());
app.use(express.json());

/**
 * Endpoints
 */
app.get("/api/authcodes", async (req, res) => {
    try {
        const allCodes = await pgdb.get_all_auth_codes();
        return res.status(200).json(allCodes);
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Databse query failed" });
    }
})

app.delete("/api/authcodes", async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Missing email in request body" });
    }

    try {
        // print_debug(`email=${email}`)
        const deleteCount = await pgdb.delete_auth_entry(email)
        // print_debug(`deleted ${deleteCount} authcode entries matching email=${email}`);
        return res.status(200).json(`AUTH SERVICE: Deleted ${deleteCount} authcode entries matching email=${email}`);
    } catch (e) {
        console.warn(e);
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Databse query failed" });
    }
})

app.post("/api/register", async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Missing email in request body" });
    }

    const code = authCode.generateAuthCode();
    const subject = "Welcome to SFU Connect! Email Verification Code"
    const content = `Your email verification code is: ${code}`

    try {
        await pgdb.create_auth_entry(email, code)
        // print_debug("email-code pair successfully inserted into database")
        await send_email(email, subject, content)
        return res.status(200).json({ message: "AUTH SERVICE: Verification email successfully sent." });
    } catch (e) {
        print_error("sending email failed.")
        console.warn(e);
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Registration failed" });
    }
})

app.post("/api/authorize", async (req, res) => {
    const email = req.body.email;
    const authCode = req.body.authCode;
    if (!email || !authCode) {
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Missing email or authCode in request body" });
    }

    try {
        const count = await pgdb.count_code_email_match(email, authCode)
        if (count > 0) {
            // print_debug(`${email} is authizaed by code=${authCode}!`)
            await pgdb.delete_auth_entry(email)
            // print_debug('Authentication successful!')
            return res.status(200).json({ message: "AUTH SERVICE: Authentication successful" });
        } else {
            return res.status(401).json({ error: "AUTH SERVICE: Invalid authentication code" });
        }
    } catch (e) {
        print_error('database query failed for searching code-email pair')
        console.error(e)
        return res.status(500).json({ error: "AUTH SERVICE ERROR: Database query failed." })
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log("AUTH SERVICE: running on port 8080");
})

// Helper functions
function print_debug(content) {
    console.debug(`AUTH SERVICE DEBUG: ${content}`)
}
function print_error(content) {
    console.debug(`AUTH SERVICE ERROR: ${content}`)
}

// expect this to be motification service
async function send_email(email, subject, content) {
    let transport = mailService.createTransport({
        service: "Gmail",
        auth: {
            user: "sfusynapse@gmail.com",
            pass: "zsgqshvvsldtfjrn",
        },
    });

    let mailOptions = {
        from: "sfusynapse@sfu.ca",
        to: email,
        subject: subject,
        text: content,
    };

    await transport.sendMail(mailOptions)
}