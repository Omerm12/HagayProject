import { createOrder, getOrdersByUser } from '../models/ordersModel.js';
import pool from '../db.js';


export const handleCreateOrder = async (req, res) => {
  try {
    const { order, cartItems } = req.body;
    const orderId = await createOrder(order, cartItems);
    res.status(201).json({ order_id: orderId });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'שגיאה ביצירת הזמנה' });
  }
};

export const handleGetUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUser(req.params.user_id);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'שגיאה בשליפת הזמנות' });
  }
};

export const handleGetOrderItems = async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await pool.query(`
      SELECT 
        oi.quantity, 
        p.price_per_unit,
        p.title AS product_name,
        p.image_url
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = $1
    `, [order_id]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching order items:', err);
    res.status(500).json({ error: 'שגיאה בשליפת פריטי הזמנה' });
  }
};

export const getLastOrderItems = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "חסר user_id" });
  }

  try {
    const orderResult = await pool.query(
      `SELECT id FROM orders 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [user_id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(200).json({ items: [] }); 
    }

    const orderId = orderResult.rows[0].id;

    const itemsResult = await pool.query(
      `SELECT product_id, quantity 
       FROM order_items 
       WHERE order_id = $1`,
      [orderId]
    );

    res.json({ items: itemsResult.rows });
  } catch (err) {
    console.error("שגיאה בקבלת ההזמנה האחרונה:", err);
    res.status(500).json({ error: "שגיאת שרת" });
  }
};