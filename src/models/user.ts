import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'
import Role from './role';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string; 
  public password_hash!: string; 
  public isVerified!: boolean; 
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
{
  sequelize,
  tableName: 'User',
  timestamps: true,
})

User.belongsTo(Role, { foreignKey: 'role_id', onDelete: 'SET NULL' });

export default User;
