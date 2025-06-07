// backend/sequelize.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: Number(process.env.DB_MAX_CONNECTIONS) || 5,
      min: 0,
      acquire: Number(process.env.DB_CONNECTION_TIMEOUT) || 30000,
      idle: Number(process.env.DB_IDLE_TIMEOUT) || 10000,
    },
  }
);

export default sequelize;
