const express = require("express");
const dotenv = require("dotenv").config(); // to use.env file for environment variables.
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs/promises"); // Import the promises version of the 'fs' module

let data = "./data/data.json"; //data path

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json()); //body parser

app.use(cors());
//sending data
app.get("/data", async (req, res) => {
  // Read the content of the data.json file
  const fileContent = await fs.readFile(data, "utf-8");
  const jsonData = JSON.parse(fileContent);
  //Extract names from user data
  const countryNames = Object.values(jsonData.name).map(
    (country) => country.name
  );

  //Send the JSON data as the response
  res.json(countryNames);
});

//receiving data
app.post("/data", async (req, res) => {
  let newData = req.body;
  // Read the existing data from the file
  const existingData = await fs.readFile(data, "utf-8");
  const parsedData = JSON.parse(existingData);

  // Generate a new user ID.
  let userIdCounter = Date.now();

  const newCountry = {
    id: userIdCounter,
    name: req.body.name,
    rank: req.body.rank,
  };

  parsedData.name.push(newCountry); //data got added here
  // Write the updated data back to the file
  await fs.writeFile(data, JSON.stringify(parsedData, null, 2), "utf-8");

  res.status(200).json({ message: "Data received and processed successfully" });
});

//deleting data
app.delete("/data/:id", async (req, res) => {
  const deleteId = parseInt(req.params.id); // Convert the id to an integer

  try {
    // Read the existing data from the file
    const existingData = await fs.readFile(data, "utf-8");
    const parsedData = JSON.parse(existingData);

    // Find the index of the country to delete
    const countryIndex = parsedData.name.findIndex(
      (country) => country.id === deleteId
    );

    if (countryIndex === -1) {
      return res.status(404).json({ message: "Country not found" });
    }
    // Remove the country from the array
    parsedData.name.splice(countryIndex, 1);

    // Write the updated data back to the file
    await fs.writeFile(data, JSON.stringify(parsedData, null, 2), "utf-8");

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the country" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
