/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getAllFiles, uploadFiles } = require("./controllers/media");
dotenv.config();
// const { getAllQuizzes, createQuiz, getQuiz, updateQuiz, deleteQuiz } = require("./routes/quiz");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* -------------------------------- endpoints ------------------------------- */

app.get('/api/files', getAllFiles)
app.post('/api/files', uploadFiles)
// app.delete('/api/files/:fileId', deleteFile)

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`MEDIA SERVICE: Server is running on port ${PORT}\n`);
});