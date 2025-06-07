import pool from '../db.js';

export async function getCartItems(userId) {
  const result = await pool.query(`
    SELECT ci.*, p.title, p.image_url, p.price_per_unit, p.unit_type
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = $1
  `, [userId]);
  return result.rows;
}

export async function addToCart(userId, productId, quantity = 1) {
  const existing = await pool.query(
    'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );

  if (existing.rows.length > 0) {
    await pool.query(
      'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3',
      [quantity, userId, productId]
    );
  } else {
    await pool.query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, productId, quantity]
    );
  }
}

export async function updateCartItem(userId, productId, quantity) {
  if (quantity <= 0) {
    await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
  } else {
    await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3',
      [quantity, userId, productId]
    );
  }
}

export async function clearCart(userId) {
  await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
}

export async function removeFromCart(user_id, product_id) {
  await pool.query(
    `DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`,
    [user_id, product_id]
  );
}
