const express = require("express");
const router = express.Router();
const Country = require("../models/country"); // Import the Country model

router.delete("/data/:name", async (req, res) => {
  try {
    const { name } = req.params; // Get the country name from the URL

    // Find the country by name and delete it
    const deletedCountry = await Country.findOneAndDelete({ name: name });

    if (!deletedCountry) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
    // res.json(deletedCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
