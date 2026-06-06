const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Car = require('./carModel');
const User = require('./userModel');

const Booking = sequelize.define('Booking', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  bookedTimeSlots: {
    type: DataTypes.JSON, // { from: "", to: "" }
  },
  totalHours: {
    type: DataTypes.INTEGER
  },
  totalAmount: {
    type: DataTypes.INTEGER
  },
  transactionId: {
    type: DataTypes.STRING
  },
  driverRequired: {
    type: DataTypes.BOOLEAN
  }
}, {
  tableName: 'bookings',
  timestamps: true
});

// Relationships equivalent to Mongoose's `ref`
Booking.belongsTo(Car, { foreignKey: 'car' });
Booking.belongsTo(User, { foreignKey: 'user' });
Car.hasMany(Booking, { foreignKey: 'car' });
User.hasMany(Booking, { foreignKey: 'user' });

module.exports = Booking;