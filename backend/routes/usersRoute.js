const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

router.post("/login", async(req, res) => {
      const {email , password} = req.body
      try {
          const user = await User.findOne({ where: { email, password } })
          if(user) {
              res.send(user)
          }
          else{
              return res.status(400).json({ message: 'Invalid credentials' });
          }
      } catch (error) {
        return res.status(400).json(error);
      }
});

router.post("/register", async(req, res) => {
    try {
        const newuser = await User.create(req.body)
        res.send('User registered successfully')
    } catch (error) {
      return res.status(400).json(error);
    }
});

module.exports = router