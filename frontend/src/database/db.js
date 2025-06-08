import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,  // dpg-d128j5re5dus73f2dlg0-a.frankfurt-postgres.render.com
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,  // veggie_shop_user
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // veggie_shop
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
