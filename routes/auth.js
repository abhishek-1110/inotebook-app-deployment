const express = require("express");
const User = require("../models/User");
const router = express.Router();

// for password hashing..
const bcrypt = require("bcrypt");

// used for validation
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");
var jwt = require("jsonwebtoken");

// JWT
// // will give authtoken to user who login jsonwebtoken (JWT) used to verify user

const JWT_SECRET = "hi$hi";
// Route 1. create a user using : POST "/api/auth/createuser". No Login Required..
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name.").isLength({ min: 3 }),
    body("email", "Enter a valid Email.").isEmail(),
    body(
      "password",
      "Enter a valid Password of at least 5 characters."
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // stores in mongodb database under users collection
    // check whether the user (email) exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ success,
          error: "Sorry a user with this email address exists already..",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      console.log("User saved successfully..");

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);

      success = true;
      res.json({ success, authToken });
      //   .then((user) => res.json(user))
      //   .catch((e) => console.log("Error", e.message));
    } catch (error) {
      //console.error(error.message);
      return res.status(500).send({ error: "Internal server error occured.." });
    }
  }
);

//Route 2. Creating a login end point to authenticate a user.....
// api/auth/login <- Name of endpoint

router.post(
  "/login",
  [
    body("email", "Enter a valid Email.").isEmail(),
    body("password", "Password can't be blank.").notEmpty(),
  ],
  async (req, res) => {
    let successfulLogin = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        successfulLogin = false;
        return res
          .status(400)
          .json({ successfulLogin, error: "Please enter valid credentials." });
      }

      // comparing passwd with the encrypted password here password is written password and user.password which is saved on db
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        successfulLogin = false;
        return res
          .status(400)
          .json({ successfulLogin, error: "Please enter valid credentials." });
      }

      // payload of of user data
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      successfulLogin = true;
      res.json({ successfulLogin, authToken });
    } catch (error) {
      return res.status(500).send({ error: "Internal server error occured.." });
    }
  }
);

// Route 3. Get logged in user details /api/auth/getUser. Login Required.

router.post("/getUser", fetchuser, async (req, res) => {
  
  try {
    const userId = res.user;
    const user = await User.findOne({userId}).select("-password");
    res.send(user);
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error while authenticating..");
  }
});
module.exports = router;
