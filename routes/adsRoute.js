const { Router } = require("express");
const { AdsModel } = require("../models/AdsModel");

const adsRoute = Router();

adsRoute.get("/", async (req, res) => {
    try {
      const { category,name, q, sortBy, page, limit } = req.query;
      const filter = {};
  
      if (category) filter.category = { $regex: category, $options: "i" };
      if (name) filter.name = { $regex: name, $options: "i" };
      
  
      const query = AdsModel.find(filter);
  
      if (q) {
        query.or([{ name: { $regex: q, $options: "i" } }]);
        
      }
  
      if (sortBy) {
        const sortOrder = sortBy === "asc" ? 1 : -1;
        query.sort({ date: sortOrder });
      }
  
      const total = await AdsModel.countDocuments(filter);
      const ads= await query.skip((page - 1) * limit).limit(limit);
  
      res.status(200).json({
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
        ads,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Something went wrong" });
    }
  });
  



adsRoute.post("/create", async (req, res) => {
  const { name, description, category, imageURL, location, date, price } =
    req.body;

  const new_ads = new AdsModel({
    name,
    description,
    category,
    imageURL,
    location,
    date,
    price,
  });
  await new_ads.save();
  res.status(200).send({ msg: "ad created" });
});


adsRoute.delete("/delete/:id", async (req, res) => {
    const adId = req.params.id;
  
    try {
      const deletedAd = await AdsModel.findByIdAndDelete(adId);
      if (!deletedAd) {
        return res.status(404).json({ msg: "Ad not found" });
      }
      res.status(200).json({ msg: "Ad deleted successfully" });
    } catch (error) {
      console.log("Error while deleting ad:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  

module.exports = {
    adsRoute ,
  };