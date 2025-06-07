import pool from '../db.js';
import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Order = sequelize.define('orders', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: DataTypes.INTEGER,
  full_name: DataTypes.STRING,
  phone: DataTypes.STRING,
  city: DataTypes.STRING,
  street: DataTypes.STRING,
  house_number: DataTypes.STRING,
  floor: DataTypes.STRING,
  notes: DataTypes.TEXT,
  total_price: DataTypes.NUMERIC,
  delivery_status: DataTypes.STRING,
  payment_status: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
}, {
  timestamps: false,
});

export const createOrder = async (orderData, cartItems) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { user_id, full_name, phone, city, street, house_number, floor, notes, total_price } = orderData;
console.log("Creating order with price:", total_price);

    const orderRes = await client.query(`
  INSERT INTO orders (user_id, full_name, phone, city, street, house_number, floor, notes, total_price)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id
`, [user_id, full_name, phone, city, street, house_number, floor, notes, total_price]);

    const orderId = orderRes.rows[0].id;

    for (const item of cartItems) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
      `, [orderId, item.product_id, item.quantity, item.price]);
    }

    await client.query('COMMIT');
    return orderId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const getOrdersByUser = async (user_id) => {
  const result = await pool.query(`SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`, [user_id]);
  return result.rows;
};

export default Order;
