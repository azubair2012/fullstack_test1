const express = require("express");
const dotenv = require("dotenv").config(); // to use.env file for environment variables.
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
