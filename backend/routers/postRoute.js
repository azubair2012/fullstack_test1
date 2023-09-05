const express = require("express");
const router = express.Router();
const Country = require("./models/country"); // Import the Country model

// Create a POST route to add a new country to the database
router.post("/data", async (req, res) => {
  try {
    // Create a new country instance based on the request body
    const newCountry = new Country(req.body);

    // Save the new country to the database
    const savedCountry = await newCountry.save();

    res.status(201).json(savedCountry); // Respond with the saved country data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
