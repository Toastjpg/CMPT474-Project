const express = require('express');
const db = require("./models/db")
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

let cors = require("cors")
const corsOps = {
  origin: "*",
  optionSuccessStatus: 200,
  credentials: true,
}

let postsController = require('./routes/posts.controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOps));

app.use('/api', postsController);

// start up the server to listen for requests
db.helpers.setup_tables()
  .then(
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )

