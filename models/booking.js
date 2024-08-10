const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./user');
const Room = require('./room');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Booking.belongsTo(Room, { foreignKey: 'room_id', onDelete: 'CASCADE' });

module.exports = Booking;
