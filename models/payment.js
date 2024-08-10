const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Booking = require('./booking');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer'),
    allowNull: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

Payment.belongsTo(Booking, { foreignKey: 'booking_id', onDelete: 'CASCADE' });

module.exports = Payment;
