const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://itty42:3h5ppTWm2P-VuGJ@cluster0.kpxlou5.mongodb.net/trip-and-trip"

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    )
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err)
  })
