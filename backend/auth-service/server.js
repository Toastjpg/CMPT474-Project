const express = require("express");
const mailService = require("nodemailer");
const authCode = require("./utils/authcode");
// const db = require("./models/db"); // BEFORE REFACTORING
const { pgdb } = require("./models/db");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;



// setup middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/authcodes", async (req, res) => {
    try {
        const allCodes = await pgdb.get_all_auth_codes();
        print_debug("auth codes in DB:")
        console.debug(allCodes)
        return res.status(200).json(allCodes);
    } catch (e) {
        console.warn(e);
        return res.status(500).json("AUTH SERVICE ERROR: Databse query failed");
    }
});

app.delete("/api/authcodes", async (req, res) => {
    const email = req.body.email;
    if(!email) {
        return res.status(500).json("AUTH SERVICE ERROR: Missing email in request body");
    }

    try {
        print_debug(`email=${email}`)
        const deleteCount = await pgdb.delete_auth_entry(email)
        print_debug(`deleted ${deleteCount} authcode entries matching email=${email}`);
        return res.status(200).json(`AUTH SERVICE: Deleted ${deleteCount} authcode entries matching email=${email}`);
    } catch (e) {
        console.warn(e);
        return res.status(500).json("AUTH SERVICE ERROR: Databse query failed");
    }
});

// setup endpoints for authentication
app.post("/api/register", async (req, res) => {
    const email = req.body.email;
    if(!email) {
        return res.status(500).json("AUTH SERVICE ERROR: Missing email in request body");
    }

    const code = authCode.generateAuthCode();
    const subject = "Welcome to SFU Connect! Email Verification Code"
    const content = `Your email verification code is: ${code}`
    print_debug("email=" + email);
    print_debug("code=" + code);

    try {
        await pgdb.create_auth_entry(email, code)
        print_debug("email-code pair successfully inserted into database")
        await send_email(email, subject, content)
        return res.status(200).json("AUTH SERVICE: Verification email successfully sent.");
    } catch (e) {
        print_error("sending email failed.")
        console.warn(e);
        return res.status(500).json("AUTH SERVICE ERROR: Registration failed");
    }
});

app.post("/api/authorize", async (req, res) => {
    const email = req.body.email;
    const authCode = req.body.authCode;
    if(!email || !authCode) {
        return res.status(500).json("AUTH SERVICE ERROR: Missing email or authCode in request body");
    }

    try {
        const count = await pgdb.count_code_email_match(email, authCode)
        if(count > 0) {
            print_debug(`${email} is authizaed by code=${authCode}!`)
            await pgdb.delete_auth_entry(email)
            print_debug('Authentication successful!')
            return res.status(200).json("AUTH SERVICE: Authentication successful");
        }else {
            return res.status(401).json("AUTH SERVICE: Invalid authentication code");
        }
    }catch(e) {
        print_error('database query failed for searching code-email pair')
        console.error(e)
        return res.status(500).send("AUTH SERVICE ERROR: Database query failed.")
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






// BEFORE REFACTORING **************************************
// app.get("/api/authcodes", async (req, res) => {
//     try {
//         const allCodes = await db.helpers.get_all_auth_codes();
//         console.log("Auth Codes in DB: ", allCodes);
//         res.status(200).json(allCodes);
//     } catch (e) {
//         console.log(e);
//         res.status(500).json(e);
//     }
// });

// app.delete("/api/authcodes", async (req, res) => {
//     const email = req.body.email;

//     try {
//         console.log('Email passed: ', email)
//         const deleted_code = await db.helpers.delete_auth_code(email);
//         console.log(`Deleted ${deleted_code} rows`);
//         res.status(200).json({ num_deleted: deleted_code });
//     } catch (e) {
//         console.log(e);
//         res.status(500).json(e);
//     }
// });

// // setup endpoints for authentication
// app.post("/api/register", async (req, res) => {
//     // generate 2Fa auth code
//     const code = authCode.generateAuthCode();
//     const email = req.body.email;

//     console.log("email: " + email);
//     console.log("code: " + code);

//     // send auth code to email
//     try {
//         // NOTE: at this point, the email should be validated by user-service

//         // 1. Record email, code
//         // NOTE: returns the same code if requested again
//         const promise2 = new Promise(async (resolve, reject) => {
//             const rows = await db.helpers.create_auth_entry(email, code);
//             console.log(rows);
//             if (rows < 1) {
//                 reject();
//             }
//             resolve(rows);
//         });

//         await promise2
//             .then((rows) => {
//                 // 3. Send verification code via email
//                 let transport = mailService.createTransport({
//                     service: "Gmail",
//                     auth: {
//                         user: "sfusynapse@gmail.com",
//                         pass: "zsgqshvvsldtfjrn",
//                     },
//                 });

//                 let mailOptions = {
//                     from: "sfusynapse@sfu.ca",
//                     to: req.body.email,
//                     subject: "Welcome to SFU Connect! Email Verification Code",
//                     text: "Your email verification code is: " + code,
//                     // html: `Your authentication code is: ${code}`
//                 };

//                 transport.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         // console.log(error)
//                         return res
//                             .status(500)
//                             .json(
//                                 "Failed to send email. Please check your email address and try again."
//                             );
//                     }
//                     // console.log('Message sent: %s', info.messageId)
//                     return res
//                         .status(200)
//                         .json("Email verification code sent! Please check your mailbox");
//                 });
//             })
//             .catch((e) => {
//                 return res.status(500).json(e);
//                 // return res.status(500).json('Failed to create auth code, Please try again')
//             });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// app.post("/api/authorize", async (req, res) => {
//     // get auth code, username, email from request
//     const authCode = req.body.authCode;
//     const email = req.body.email;

//     // validate against in db
//     try {
//         const authorizeAuthCodePromise = new Promise(async (resolve, reject) => {
//             const obj = await db.helpers.get_auth_code(email);
//             console.log(obj);
//             if (obj === undefined || obj.code !== authCode) {
//                 reject();
//             }
//             resolve(obj);
//         });

//         await authorizeAuthCodePromise
//             .then(async (rows) => {
//                 const deleteResult = await db.helpers.delete_auth_code(email);

//                 console.log("Correct code: Deleted " + deleteResult + " auth code from table");
//                 return res.status(200).json("Authentication successful");
//             })
//             .catch((e) => {
//                 return res.status(400).json("Invalid authentication code");
//             });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// db.helpers
//     .init()
//     .then(() => {
//         db.helpers.setup_tables();
//     })
//     .then(
//         app.listen(PORT, "0.0.0.0", () => {
//             console.log("Auth Service is running on port 8080");
//         })
//     );
