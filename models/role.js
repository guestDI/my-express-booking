const { DataTypes } = require('sequelize')
const sequelize = require('../database/database')

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Role
