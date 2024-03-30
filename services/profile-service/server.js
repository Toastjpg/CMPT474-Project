const express = require("express");
const cors = require("cors");
const mailService = require("nodemailer");
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
    res.status(200).json({ message: `Getting profile data for user with id: ${id}` })
})

// Add or edit profile data
app.put("/api/profile/", async (req, res) => {
    const id = req.body.id

    // The profile content to store
    // Probably just an object with some strings
    // Maybe just one string called bio
    // Maybe we wont even use this feature..
    const content = req.body.content

    res.status(200).json({ message: `Creating/Updating profile data for user with id: ${id}` })
})

// app.post("/api/account", async (req, res) => {
//     const email = req.body.email
//     const username = req.body.username
//     const password = req.body.password

//     if (!email || !username || !password) {
//         return res.status(500).json("USER SERVICE ERROR: Missing account setup fields in request body")
//     }

//     try {
//         await pgdb.create_account(username, email, password)
//         send_email(email, "SFU Collaborative Learning platform: Account Created!", "Thank you for using our platform! Your account was successfully created.")
//         return res.status(200).json("USER SERVICE: Account successfully created.");
//     } catch (e) {
//         console.warn(e);
//         return res.status(500).json(e);
//     }
// })

// app.delete("/api/account", async (req, res) => {
//     const username = req.body.username;
//     if (!username) {
//         return res.status(500).json("USER SERVICE ERROR: Missing username in request body");
//     }

//     try {
//         await pgdb.delete_account(username)
//         return res.status(200).json("USER SERVICE: Account successfully deleted.");
//     } catch (e) {
//         console.warn(e);
//         return res.status(500).json(e);
//     }
// })

// app.get("/api/account/email/:email", async (req, res) => {
//     const email = req.params.email;
//     if (!email) {
//         return res.status(500).json("USER SERVICE ERROR: Missing email in request params");
//     }

//     try {
//         const account = await pgdb.get_account_by_email(email);
//         return res.status(200).json(account);
//     } catch (e) {
//         console.warn(e);
//         return res.status(500).json("USER SERVICE ERROR: Databse query failed");
//     }
// })

// app.get("/api/accounts", async (req, res) => {
//     try {
//         const allAccounts = await pgdb.get_accounts();
//         return res.status(200).json(allAccounts);
//     } catch (e) {
//         console.warn(e);
//         return res.status(500).json("USER SERVICE ERROR: Databse query failed");
//     }
// });

app.listen(PORT, "0.0.0.0", () => {
    console.log("PROFILE SERVICE: running on port 8080");
})
