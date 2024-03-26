/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------- endpoints ------------------------------- */

const quizRouter = require("./routes/quiz.js");
app.use("/api", quizRouter);

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`QUIZ SERVICE: Server is running on port ${PORT}`);
});