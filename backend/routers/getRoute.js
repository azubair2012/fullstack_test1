const express = require("express");
const router = express.Router();
const Country = require("../models/country"); // Import the Country model

// Create a GET route to retrieve all countries from the database
router.get("/", async (req, res) => {
  try {
    // Find all countries in the database
    const countries = await Country.find();

    res.json(countries); // Respond with the list of countries
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
