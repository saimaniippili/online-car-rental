const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(process.env.BACK_END_STRIPE_KEY);

router.post("/bookcar", async (req, res) => {
  // const { token } = req.body;
  try {
    /*
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    */

    // Simulate successful payment
    const payment = true;

    if (payment) {
      req.body.transactionId = 'mock_transaction_' + Date.now();
      
      // Prevent Foreign Key crash if frontend has stale MongoDB user ID in localStorage
      const User = require('../models/userModel');
      let dbUser = null;
      try {
        dbUser = await User.findOne({ where: { _id: req.body.user } });
      } catch (e) {
        // Ignore UUID format errors
      }
      
      if (!dbUser) {
        dbUser = await User.findOne(); // Grab first valid user
        if (!dbUser) {
          // Create dummy user if database is completely empty
          dbUser = await User.create({ username: 'demouser', password: 'password', email: 'demo@example.com' });
        }
        if (dbUser) req.body.user = dbUser._id;
      }

      await Booking.create(req.body);
      
      const car = await Car.findOne({ where: { _id: req.body.car } });
      if(car) {
        // Handle Sequelize JSON array updates
        const currentSlots = car.bookedTimeSlots || [];
        currentSlots.push(req.body.bookedTimeSlots);
        car.bookedTimeSlots = currentSlots;
        car.changed('bookedTimeSlots', true);
        
        await car.save();
      }
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get("/getallbookings", async(req, res) => {
    try {
        const bookings = await Booking.findAll({ include: [Car] });
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;