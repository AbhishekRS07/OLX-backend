const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageURL: { type: String, required: true }, 
    location: { type: String, required: true },
    date: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const AdsModel = mongoose.model("ads", adsSchema);

module.exports = {
  AdsModel,
};
