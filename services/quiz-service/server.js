/* ------------------------------ dependencies ------------------------------ */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { getAllQuizzes, createQuiz, getQuiz, updateQuiz, deleteQuiz } = require("./routes/quiz");

/* ------------------------------- server setup ------------------------------ */
const app = express();
const PORT = process.env.PORT || 8080;

/* ------------------------------- middleware ------------------------------- */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* -------------------------------- endpoints ------------------------------- */

app.get('/api/quizzes', getAllQuizzes)
app.get('/api/quizzes/:quizId', getQuiz)
app.post('/api/quizzes', createQuiz)
app.put('/api/quizzes/:quizId', updateQuiz)
app.delete('/api/quizzes/:quizId', deleteQuiz)

/* ----------------------------- starting server ---------------------------- */
app.listen(PORT, () => {
    console.log(`QUIZ SERVICE: Server is running on port ${PORT}\n`);
});