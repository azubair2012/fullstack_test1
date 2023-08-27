const express = require("express");
const dotenv = require("dotenv").config(); // to use.env file for environment variables.
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");

let data = require("./data/data.js"); //data import
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json()); //body parser

app.use(cors());
//sending data
app.get("/data", (req, res) => {
  res.json(data);
});
//receiving data
app.post("/data", (req, res) => {
  let newData = req.body;
  data["country"] = newData.country; //data got added here
  let newJsonString = JSON.stringify(data); // this is just for viewing purpose
  console.log(newJsonString);
  res.json({ message: "Data received and processed successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
