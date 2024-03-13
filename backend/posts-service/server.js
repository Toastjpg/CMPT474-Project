const express = require("express");
const db = require("./models/db");
const PORT = process.env.PORT || 8080;

let cors = require("cors");
const corsOps = {
  origin: "*",
  optionSuccessStatus: 200,
  credentials: true,
};

let postsController = require("./routes/posts.controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOps));

app.use("/api", postsController);

// Inits cloud sql connection then starts server
// Throws an error for some reason?? but end points seem to work??
db.helpers
  .init()
  .then(() => {
    db.helpers.setup_tables()
  })
  .then(
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(process.env.DB_CONN_NAME);
    })
  );
