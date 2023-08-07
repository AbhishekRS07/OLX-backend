const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { adsRoute } = require("./routes/adsRoute");

const app = express();

require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
    res.send("BASE API");
  });

  app.use("/ads",  adsRoute);

  app.listen(8080, async () => {
    try {
      await connection;
      console.log("connected to DB Successfully");
    } catch (err) {
      console.log("Error while connecting to DB");
      console.log(err);
    }
    console.log("listening on port 8080");
  });