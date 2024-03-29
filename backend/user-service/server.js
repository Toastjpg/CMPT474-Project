const express = require("express");
const cors = require("cors");
const mailService = require("nodemailer");
const { pgdb } = require("./models/db");
const app = express();
const dotenv = require('dotenv');
dotenv.config();




/**
 * Middleware Configurations
 */
app.use(cors());
app.use(express.json());




/**
 * Endpoints
 */
app.post("/api/account", async (req, res) => {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    
    if(!email || !username || !password) {
        return res.status(500).json("USER SERVICE ERROR: Missing account setup fields in request body")
    }

    try {
        await pgdb.create_account(username, email, password)
        send_email(email, "SFU Collaborative Learning platform: Account Created!", "Thank you for using our platform! Your account was successfully created.")
        return res.status(200).json("USER SERVICE: Account successfully created.");
    } catch (e) {
        console.warn(e);
        return res.status(500).json(e);
    }
})
app.delete("/api/account", async (req, res) => {
    const username = req.body.username;
    if(!username) {
        return res.status(500).json("USER SERVICE ERROR: Missing username in request body");
    }

    try {
        await pgdb.delete_account(username)
        return res.status(200).json("USER SERVICE: Account successfully deleted.");
    } catch (e) {
        console.warn(e);
        return res.status(500).json(e);
    }
})
app.get("/api/account/email/:email", async (req, res) => {
    const email = req.params.email;
    if(!email) {
        return res.status(500).json("USER SERVICE ERROR: Missing email in request params");
    }

    try {
        const account = await pgdb.get_account_by_email(email);
        return res.status(200).json(account);
    } catch (e) {
        console.warn(e);
        return res.status(500).json("USER SERVICE ERROR: Databse query failed");
    }
})
app.get("/api/accounts", async (req, res) => {
    try {
        const allAccounts = await pgdb.get_accounts();
        return res.status(200).json(allAccounts);
    } catch (e) {
        console.warn(e);
        return res.status(500).json("USER SERVICE ERROR: Databse query failed");
    }
});



const PORT = process.env.PORT || 8080
app.listen(PORT, "0.0.0.0", () => {
    console.log("USER SERVICE: running on port 8080");
})





// Helper functions
function print_debug(content) {
    console.debug(`USER SERVICE DEBUG: ${content}`)
}
function print_error(content) {
    console.debug(`USER SERVICE ERROR: ${content}`)
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