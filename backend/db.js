const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://devpandhii:devpandhii@cluster0.sw021bm.mongodb.net/tastywavesDatabase?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    console.log("dev");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

module.exports = mongoDB;
