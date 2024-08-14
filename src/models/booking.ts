import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'
import { User, Room } from './index'

class Booking extends Model {
  public id!: number;
  public start_date!: Date;
  public end_date!: Date; 
  public total_price!: number; 
  public status!: string; 
}

Booking.init(
  {
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
  },
  {
    sequelize, 
    tableName: 'Booking',
    timestamps: true,
  }
);

Booking.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Booking.belongsTo(Room, { foreignKey: 'room_id', onDelete: 'CASCADE' });

export default Booking;
