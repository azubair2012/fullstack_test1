const express = require("express");
const router = express.Router();
const Country = require("../models/country"); // Import the Country model

router.put("/data/:name", async (req, res) => {
  try {
    const { name } = req.params; // Get the country name from the URL
    const updatedData = req.body; // Updated data for the country

    // Find the country by name and update it
    const updatedCountry = await Country.findOneAndUpdate(
      { name: name }, // Search criteria
      updatedData, // Updated data
      { new: true } // Return the updated document
    );

    if (!updatedCountry) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
