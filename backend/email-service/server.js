/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const firebaseController = require("./controllers/firestoreController");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Patch to fix CORS error from API gateway
// Middleware to handle the preflight requests
// See: https://stackoverflow.com/questions/64281334/cors-errors-when-trying-to-fetch-from-new-google-cloud-api-gateway
app.options("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.send(200);
});

/* -------------------------------- endpoints ------------------------------- */

const emailRouter = require("./routes/email.js");
app.use("/api/", emailRouter);

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`QUIZ SERVICE: Server is running on port ${PORT}\n`);

    firebaseController.initialize();
});