const express = require("express");
const db = require('./models/db')
const userController = require("./controller/user-account.controller");
const PORT = process.env.PORT || 8080;
const app = express();

let cors = require("cors");
const corsOps = {
    origin: "*",
    optionSuccessStatus: 200,
    credentials: true,
};

// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOps));

app.use("/api", userController)

// server
db.helpers
    .init()
    .then(() => {
        db.helpers.setup_tables()
    })
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log("User Service is running on port 8080");
        })
    })


