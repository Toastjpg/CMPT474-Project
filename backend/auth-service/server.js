const express = require("express");
const bodyParser = require("body-parser");
const mailService = require("nodemailer");
const authCode = require("./utils/authcode");
const db = require("./models/db");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

// setup middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/authcodes", async (req, res) => {
    try {
        const allCodes = await db.helpers.get_all_auth_codes();
        console.log("Auth Codes in DB: ", allCodes);
        res.status(200).json(allCodes);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

app.delete("/api/authcodes", async (req, res) => {
    const email = req.body.email;

    try {
        const deleted_code = await db.helpers.delete_auth_code(email);
        console.log(`Deleted ${deleted_code} rows`);
        res.status(200).json({ num_deleted: deleted_code });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// setup endpoints for authentication
app.post("/api/register", async (req, res) => {
    // generate 2Fa auth code
    const code = authCode.generateAuthCode();
    const email = req.body.email;

    console.log("email: " + email);
    console.log("code: " + code);

    // send auth code to email
    try {
        // NOTE: at this point, the email should be validated by user-service

        // 1. Record email, code
        // NOTE: returns the same code if requested again
        const promise2 = new Promise(async (resolve, reject) => {
            const rows = await db.helpers.create_auth_entry(email, code);
            console.log(rows);
            if (rows < 1) {
                reject();
            }
            resolve(rows);
        });

        await promise2
            .then((rows) => {
                // 3. Send verification code via email
                let transport = mailService.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "sfusynapse@gmail.com",
                        pass: "zsgqshvvsldtfjrn",
                    },
                });

                let mailOptions = {
                    from: "sfusynapse@sfu.ca",
                    to: req.body.email,
                    subject: "Welcome to SFU Connect! Email Verification Code",
                    text: "Your email verification code is: " + code,
                    // html: `Your authentication code is: ${code}`
                };

                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // console.log(error)
                        return res
                            .status(500)
                            .json(
                                "Failed to send email. Please check your email address and try again."
                            );
                    }
                    // console.log('Message sent: %s', info.messageId)
                    return res
                        .status(200)
                        .json("Email verification code sent! Please check your mailbox");
                });
            })
            .catch((e) => {
                return res.status(500).json(e);
                // return res.status(500).json('Failed to create auth code, Please try again')
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post("/api/authorize", async (req, res) => {
    // get auth code, username, email from request
    const authCode = req.body.authCode;
    const email = req.body.email;

    // validate against in db
    try {
        const authorizeAuthCodePromise = new Promise(async (resolve, reject) => {
            const obj = await db.helpers.get_auth_code(email);
            console.log(obj);
            if (obj === undefined || obj.code !== authCode) {
                reject();
            }
            resolve(obj);
        });

        await authorizeAuthCodePromise
            .then(async (rows) => {
                const deleteResult = await db.helpers.delete_auth_code(email);

                console.log("Correct code: Deleted " + deleteResult + " auth code from table");
                return res.status(200).json("Authentication successful");
            })
            .catch((e) => {
                return res.status(400).json("Invalid authentication code");
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

db.helpers
    .init()
    .then(() => {
        db.helpers.setup_tables();
    })
    .then(
        app.listen(PORT, "0.0.0.0", () => {
            console.log("Auth Service is running on port 8080");
        })
    );
