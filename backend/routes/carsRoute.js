const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcar", async (req, res) => {
  try {
    await Car.create(req.body);
    res.send("Car added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editcar", async (req, res) => {
  try {
    const car = await Car.findOne({ where: { _id: req.body._id } });
    if(car) {
        car.name = req.body.name;
        car.image = req.body.image;
        car.fuelType = req.body.fuelType;
        car.rentPerHour = req.body.rentPerHour;
        car.capacity = req.body.capacity;

        await car.save();
        res.send("Car details updated successfully");
    } else {
        res.status(404).send("Car not found");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecar", async (req, res) => {
  try {
    await Car.destroy({ where: { _id: req.body.carid } });
    res.send("Car deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;