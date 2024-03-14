// const express = require("express");
// const router = express.Router();

// router.post(
//     "/displaydata", (req, res)=>{
//         try{
//             res.send(global.food_items, global.food_category)
//         }
//         catch(error){
//             console.error(error)
//             res.send("Server Error")
//         }
//     }
// )

// module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/displaydata", (req, res) => {
  try {
    // Send an object containing both food_items and food_category
    res.send({ food_items: global.food_items, food_category: global.foodCategory });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Set status code to 500 for server errors
  }
});

module.exports = router;
