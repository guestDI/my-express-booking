import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'

class Blacklist extends Model {
  public id!: number;
  public token!: string;
  public expiresAt!: Date; 
}

Blacklist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Blacklist',
    timestamps: true,
  }
);

export default Blacklist;
