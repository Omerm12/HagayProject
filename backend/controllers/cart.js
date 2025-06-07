import * as model from '../models/cart.js';

export async function getCart(req, res) {
  const userId = parseInt(req.query.user_id); 

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'Missing or invalid user_id' });
  }

  try {
    const items = await model.getCartItems(userId);
    res.json(items);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function addItem(req, res) {
  const { user_id, product_id, quantity } = req.body;
  await model.addToCart(user_id, product_id, quantity || 1);
  res.status(200).json({ message: 'Item added/updated' });
}

export async function updateItem(req, res) {
  const { user_id, product_id, quantity } = req.body;
  await model.updateCartItem(user_id, product_id, quantity);
  res.status(200).json({ message: 'Item updated' });
}

export async function clearCart(req, res) {
  const { user_id } = req.body;
  await model.clearCart(user_id);
  res.status(200).json({ message: 'Cart cleared' });
}

export async function removeItem(req, res) {
  const { user_id, product_id } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ error: 'Missing user_id or product_id' });
  }

  try {
    await model.removeFromCart(user_id, product_id);
    res.status(200).json({ message: 'Item removed' });
  } catch (err) {
    console.error("Failed to remove item from cart:", err);
    res.status(500).json({ error: 'Server error' });
  }
}