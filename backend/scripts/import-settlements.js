import fs from 'fs';
import csv from 'csv-parser';
import iconv from 'iconv-lite';
import pool from '../db.js'; // עדכן לפי המיקום האמיתי

fs.createReadStream('./data/settlements.csv')
  .pipe(iconv.decodeStream('win1255')) // תמיכה בעברית
  .pipe(csv())
  .on('data', async (row) => {
    const name = row['שם_ישוב']?.trim();
    const district = row['לשכה'];
    const municipality = row['שם מועצה'];

    if (name && name !== 'לא רשום') {
      await pool.query(`
        INSERT INTO settlements (name, district, municipality_name)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO UPDATE SET
          district = EXCLUDED.district,
          municipality_name = EXCLUDED.municipality_name
      `, [name, district, municipality]);
    }
  })
  .on('end', () => console.log('✅ ייבוא הושלם בהצלחה'));
