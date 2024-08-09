const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Уберите или измените на true, если хотите видеть запросы в консоли
});

module.exports = sequelize;