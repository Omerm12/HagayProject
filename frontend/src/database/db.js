import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL + '?ssl=true';

const pool = new Pool({
  connectionString,
  // לא מוסיפים כאן אובייקט ssl — הסטרינג כבר מורה ל־SSL
});

// או, אם אתה משתמש באובייקט הגדרות מלא ושומר גם על ssl config:
const pool2 = new Pool({
  connectionString: process.env.DATABASE_URL + '?ssl=true',
  ssl: {
    rejectUnauthorized: false // למפתחים, אם המסמך your SSL cert לא מאומת
  },
});

export default pool;
