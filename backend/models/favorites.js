import pool from '../db.js';

export const addFavorite = async (user_id, product_id) => {
  await pool.query(`
    INSERT INTO favorites (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, product_id) DO NOTHING
  `, [user_id, product_id]);
};

export const removeFavorite = async (user_id, product_id) => {
  await pool.query(`
    DELETE FROM favorites WHERE user_id = $1 AND product_id = $2
  `, [user_id, product_id]);
};

export const getFavoritesByUser = async (user_id) => {
  const result = await pool.query(`
    SELECT p.* FROM favorites f
    JOIN products p ON p.id = f.product_id
    WHERE f.user_id = $1
  `, [user_id]);
  return result.rows;
};
