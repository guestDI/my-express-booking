import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'

class Room extends Model {
  public id!: number;
  public name!: string;
  public description!: string; 
  public maxGuests!: number; 
  public amenities!: string[]; 
  public price_per_night!: number; 
  public status!: string;
  public requiresPayment!: boolean 
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    price_per_night: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'unavailable'),
      defaultValue: 'available',
    },
    requiresPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Room',
    timestamps: true,
  }
);

export default Room;
