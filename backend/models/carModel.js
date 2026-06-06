const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Car = sequelize.define('Car', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fuelType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookedTimeSlots: {
    type: DataTypes.JSON, // Stores an array of {from, to} objects
    defaultValue: []
  },
  rentPerHour: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'cars',
  timestamps: true
});

module.exports = Car;