import { Sequelize } from 'sequelize';

// re-write it with a type
const sequelize = new Sequelize(
  process.env.DB as string, 
  process.env.USERNAME as string,
  process.env.PASSWORD as string,
  {
    host: process.env.HOST,
    port: process.env.DB_PORT as any,
    dialect: 'postgres',
    logging: false,
    schema: 'booking',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

export default sequelize;
