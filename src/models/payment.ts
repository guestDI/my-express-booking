import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'
import { Booking } from './index'

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stripePaymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    tableName: 'Payment',
    timestamps: true,
  }
);

Payment.belongsTo(Booking, { foreignKey: 'booking_id', onDelete: 'CASCADE' });

export default Payment;
