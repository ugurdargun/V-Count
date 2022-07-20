const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    name: String,
    region: String,
  },
  { _id: false }
);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
