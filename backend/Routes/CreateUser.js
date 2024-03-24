const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "NameDevPandhiMyFirstMERNProject#"

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    // password must be at least 8 chars long
    body("password", "Password length should be atleast 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      const newUser = await User.create({
        name: req.body.name,
        // password: req.body.password,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });


      // Log the user data to the console
      console.log("User created:", newUser);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password length should be at least 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      const comparePassword = bcrypt.compare(req.body.password, userData.password);

      if (!comparePassword) {
        return res.status(400).json({ errors: "Try logging in with correct credentials" });
      }

      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret )

      return res.json({ success: true, authToken:authToken });
    } catch (err) {
      console.error(err);
      res.json({ success: false });
    }
  }
);


module.exports = router;
