const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Role = require('./role');

const User = sequelize.define('User', {
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
}, {
  timestamps: true, 
});

User.hasMany(Role, { onDelete: "CASCADE" });
Role.belongsTo(User, { constraints: true });

module.exports = User;
