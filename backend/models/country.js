const mongoose = require("mongoose");

// Define a schema for the data
const countrySchema = new mongoose.Schema({
  id: Number,
  name: String,
  rank: String,
});

// Create a model for the schema
const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
