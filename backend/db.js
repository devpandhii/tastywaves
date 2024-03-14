const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://devpandhii:devpandhii@cluster0.sw021bm.mongodb.net/tastywavesDatabase?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Fetch data from both collections
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");

    const foodItems = await foodItemsCollection.find({}).toArray();
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    // Assign the fetched data to global variables
    global.food_items = foodItems;
    global.foodCategory = foodCategory;
    console.log("dev");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

module.exports = connectToMongoDB;

